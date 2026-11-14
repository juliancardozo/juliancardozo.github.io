# Uber H3: buscando soluciones óptimas en ingeniería y arquitectura. Caso práctico

_2026-11-13 · 13 min de lectura_

Cada viaje solicitado, cada inicio de recorrido y cada pedido de comida deja en el marketplace de Uber un evento con latitud y longitud. Según el artículo con el que la empresa presentó H3 en 2018, esos eventos se cuentan por millones cada día. Ante un volumen así, la reacción habitual de un equipo de ingeniería es buscar la solución óptima en términos de velocidad: qué base de datos escala mejor, cuántos nodos agregar, cómo acelerar una consulta. El caso H3 muestra que la búsqueda de una solución óptima empieza antes, al decidir en qué unidad se piensa el problema, y que lo óptimo solo existe respecto de criterios explícitos. Este artículo es un análisis independiente basado en fuentes públicas; no se apoya en información interna de Uber y señala como inferencia todo razonamiento que las fuentes no documentan.

## Qué significa óptimo en arquitectura

En matemática, una solución óptima es la mejor según una función objetivo y dentro de un conjunto de restricciones. En arquitectura de software rara vez hay una sola función objetivo: rendimiento, costo, simplicidad, precisión, facilidad de operación y capacidad de cambio tiran en direcciones distintas. Por eso una solución óptima no es la más rápida ni la más elegante, sino la que mejor satisface los criterios que importan para una decisión concreta, con costos conocidos y aceptados.

Esa definición tiene una consecuencia práctica. Optimizar sin criterios escritos suele llevar a mejorar lo que es fácil de medir, normalmente la velocidad, aunque el problema esté en otro lado. Buscar una solución óptima exige, en orden, formular la decisión que se quiere habilitar, explicitar los criterios, comparar alternativas contra ellos y registrar lo que se sacrifica. El caso H3 permite recorrer esos pasos con fuentes públicas.

## El límite de las opciones convencionales

El artículo de Isaac Brodsky, ingeniero de Uber, parte de una observación sencilla: analizar cada evento en su ubicación exacta es difícil y costoso, mientras que analizarlo por áreas, como barrios, resulta mucho más práctico. Con eso el problema cambia de forma. La pregunta deja de ser cómo procesar puntos y pasa a ser qué áreas usar.

Las alternativas que el texto menciona tienen costos concretos. Las zonas dibujadas a mano por equipos de operaciones capturan conocimiento local, pero requieren actualizaciones frecuentes a medida que la ciudad cambia y tienen bordes arbitrarios. Los códigos postales presentan formas y tamaños poco útiles para el análisis y cambian por motivos ajenos a él. La combinación de la proyección de Mercator con una grilla cuadrada funciona, pero Mercator distorsiona significativamente los tamaños: celdas nominalmente iguales terminan cubriendo áreas muy distintas.

Los cuadrados tienen además un problema menos visible. Tienen dos tipos de vecinos, los que comparten un lado y los que comparten solo un vértice, y según Uber eso obliga a manejar varios conjuntos de coeficientes en el análisis.

Ninguna de estas dificultades es de rendimiento. Son problemas de representación: la unidad de análisis introduce sesgo, inestabilidad o complejidad antes de que se escriba la primera consulta. Una optimización de consultas sobre cualquiera de esas unidades habría producido una solución más rápida, pero no mejor.

## La decisión de representación

La idea central de H3 es convertir cada coordenada en el identificador de una celda. Un evento deja de ser un par de números decimales y pasa a ser «la celda X en la resolución 9». Ese identificador es un entero de 64 bits. Lo que antes era un problema geométrico, qué puntos están cerca de cuáles, se convierte en aritmética sobre identificadores: agrupar por celda, obtener las celdas vecinas, pasar a una resolución más gruesa.

Un ejemplo ayuda a fijar la idea. En un barrio a la hora de mayor demanda hay pedidos de viaje y conductores disponibles. Con H3, cada punto cae en un hexágono, y contar pedidos y conductores por hexágono produce un mapa de oferta y demanda por zona. Uber documenta este uso de forma explícita: el precio dinámico se calcula midiendo oferta y demanda en hexágonos.

Conviene hacer una distinción. Ese cálculo es análisis del mercado. Decidir qué conductor toma qué viaje es asignación (matching o dispatch), y el artículo no describe ese algoritmo. Menciona que H3 se usa para optimizar precios y despacho, y que los eventos pueden revelar, por ejemplo, dos pedidos cercanos a un conductor de uberPOOL. Pero H3 es la capa de indexación sobre la que se construyen esos análisis, no el sistema que asigna viajes.

_Patrón básico de agregación por celdas (pseudocódigo ilustrativo, no un diseño de producción)_

```text
PARA cada evento e en el lote:
    celda ← coordenada_a_celda(e.lat, e.lng, resolución = r)
    conteo[celda][e.tipo] += 1

PARA cada celda c con datos:
    zona ← vecinas_hasta_distancia(c, k = 1)   # c y sus vecinas
    demanda ← SUMA conteo[z]["pedido"]    para z en zona
    oferta  ← SUMA conteo[z]["conductor"] para z en zona
    indicador[c] ← demanda / max(oferta, 1)

SI hace falta una vista más gruesa:
    padre ← celda_padre(c, r - 1)   # contención lógica, no geométrica exacta
```

En la API actual de la librería (versión 4), esas operaciones corresponden a `latLngToCell`, `gridDisk` y `cellToParent`. El artículo de 2018 usa los nombres de la versión 3, como `geoToH3` y `kRing`.

## Hexágonos, icosaedro y jerarquía

El argumento a favor del hexágono es geométrico. Un hexágono tiene una sola distancia entre su centro y el de cada vecino; un cuadrado tiene dos y un triángulo, tres. Uber explica que esto simplifica el análisis y el suavizado de gradientes, y que minimiza el error de cuantización cuando las personas se desplazan por la ciudad. Los anillos de vecinos, además, aproximan círculos.

Para llevar la grilla a la esfera, H3 usa proyecciones gnomónicas centradas en las 20 caras de un icosaedro. Una esfera no puede cubrirse solo con hexágonos, de modo que cada resolución tiene exactamente 12 pentágonos, uno en cada vértice del icosaedro. La orientación elegida, basada en el mapa Dymaxion de Buckminster Fuller, ubica todos esos vértices en el agua, lejos de donde Uber opera.

La jerarquía comienza en 122 celdas base (110 hexágonos y 12 pentágonos) y ofrece 16 resoluciones, de 0 a 15. En cada nivel más fino, las celdas tienen aproximadamente un séptimo del área de las del nivel anterior. La documentación llama a esta subdivisión apertura 7.

### Los costos del diseño

- **Las celdas no son uniformes.** El área de una celda varía según su posición respecto de los vértices del icosaedro.
- **Los hijos no quedan perfectamente contenidos en el padre.** Un hexágono no se subdivide limpiamente en siete hexágonos; H3 aproxima esa subdivisión rotando la grilla entre niveles. La contención lógica en el índice es exacta, pero la geográfica es aproximada: un punto dentro de una celda hija puede quedar fuera del polígono de la celda padre.
- **Los pentágonos tienen cinco vecinos.** El código que asume seis puede fallar en esos casos.

La aproximación solo afecta cuando se cambia de resolución. Indexar puntos en una resolución fija y buscar vecinos no se ve afectado. Cuando se necesitan bordes exactos, la documentación del proyecto sugiere usar la grilla como optimización, combinada con un chequeo preciso de punto en polígono.

_Sistemas de indexación espacial comparados: ninguno es óptimo en todos los criterios_

| Criterio | Grilla cuadrada | Geohash | S2 (Google) | H3 |
|---|---|---|---|---|
| Forma de celda | Rectángulo | Rectángulo (curva Z) | Cuadrilátero sobre un cubo proyectado (curva de Hilbert) | Hexágono, más 12 pentágonos por resolución |
| Vecinos | Dos tipos (lado y vértice) | Dos tipos; un prefijo común no garantiza cercanía | Dos tipos | Un tipo, equidistante |
| Jerarquía | Depende de la implementación | Por prefijo de la cadena | 31 niveles (0 a 30), subdivisión exacta en cuatro | 16 resoluciones, contención geográfica aproximada |
| Distorsión | Alta lejos del ecuador | Alta en polos y en el meridiano 180 | Moderada | Moderada; varía cerca de los vértices |
| Encaja mejor en | Análisis local simple | Claves legibles, búsquedas por prefijo | Agregación y subdivisión exactas, cobertura de regiones | Vecindad, recorrido de grilla, movimiento, suavizado |

Fuentes de la comparación: la [jerarquía de celdas de S2](https://s2geometry.io/devguide/s2cell_hierarchy), la [entrada de Geohash](https://en.wikipedia.org/wiki/Geohash), las [comparaciones del propio proyecto H3](https://h3geo.org/docs/) y un [resumen de Foursquare](https://foursquare.com/resources/reports-and-insights/ebook/all-about-h3-your-questions-answered/), que concluye que S2 rinde mejor cuando se necesitan agregación y subdivisión exactas, y H3 cuando importan los vecinos. Foursquare usa H3 comercialmente y la comparación de H3 la escribe el propio proyecto, por lo que ambas pueden tener sesgo.

## Cómo se llegó a la solución: criterios, opciones y decisión

Con lo publicado puede reconstruirse la estructura de una búsqueda de solución óptima, no una historia: una necesidad, criterios, opciones, un diseño y sus propiedades.

- **Necesidad.** Analizar millones de eventos a escala de ciudad, con granularidad fina, para fijar precios dinámicos y tomar otras decisiones del marketplace.
- **Criterios.** Las críticas del artículo los dejan ver: formas y tamaños comparables entre ciudades, unidades que no cambien por motivos arbitrarios, vecindad simple y capacidad de cambiar de nivel de detalle. Que estos fueran los criterios formales del equipo es una inferencia.
- **Opciones.** Zonas manuales, códigos postales y proyección con grilla cuadrada, cada una con los costos descritos.
- **Diseño.** Una grilla global hexagonal con indexación jerárquica, sobre un icosaedro orientado para dejar los pentágonos en el océano.
- **Propiedades.** Identificadores de 64 bits, anillos de vecinos y compactación. El ejemplo del artículo: California ocupa 10.633 hexágonos en la resolución 6 y 901 en su representación compacta con resoluciones mixtas. Uber liberó H3 como código abierto en 2018, bajo licencia Apache 2.0.

### Lo que las fuentes no permiten afirmar

Las fuentes no indican quién propuso la idea, cuánto tiempo llevó ni qué prototipos se descartaron. Tampoco documentan una evaluación formal de S2 o de geohash. El README del repositorio describe H3 como una combinación de los beneficios de una grilla hexagonal con las subdivisiones jerárquicas de S2, lo que muestra que el equipo conocía S2, no que exista una evaluación publicada. No hay en estas fuentes cifras de mejora en latencia, ingresos o precisión, ni una descripción de cómo H3 se integra con el sistema de despacho.

## Otros casos con el mismo patrón

Algunos sistemas conocidos comparten un rasgo con H3: cuestionaron un supuesto en lugar de acelerar la solución vigente. No son equivalentes; cada uno resolvió un problema distinto.

- **Amazon Dynamo (2007).** Servicios como el carrito de compras debían poder leer y escribir siempre, aun con fallas de discos, redes o centros de datos. El [paper](https://www.amazon.science/publications/dynamo-amazons-highly-available-key-value-store) observa que muchos servicios solo accedían por clave primaria y que la replicación de las bases relacionales tendía a elegir consistencia sobre disponibilidad. La respuesta fue un almacén clave-valor que particiona y replica con consistent hashing, versiona objetos y coordina réplicas con una técnica tipo quorum, a cambio de sacrificar consistencia en ciertos escenarios de falla.
- **Google MapReduce (2004).** Cientos de cómputos sobre grandes volúmenes en los que paralelizar, distribuir datos y manejar fallas [oscurecía una lógica simple](https://research.google/pubs/pub62/). En lugar de que cada equipo escribiera su propio código distribuido, una abstracción de dos funciones, map y reduce, delegó el resto a un runtime común. El costo, como inferencia, es expresividad: no todo cómputo encaja cómodamente en ese modelo.
- **LinkedIn y el log (2013).** Jay Kreps propuso dejar de tratar la integración de datos como una red de conexiones punto a punto y adoptar un [log central](https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying), ordenado y de solo escritura al final, al que cada sistema escribe y del que cada sistema se suscribe. Es un ensayo de autor, no un paper con evaluación, y debe leerse como testimonio.

> **Una distinción necesaria:** Consistent hashing y H3 no son la misma idea. El primero reparte claves entre nodos de modo que agregar o quitar un nodo mueva pocas claves, sin preservar ninguna noción de cercanía. H3 asigna puntos del espacio a celdas precisamente para preservar la vecindad.

## Un método para buscar la solución óptima

Aplicar la lección no requiere inventar una grilla global. El marco que sigue es una propuesta propia en seis etapas para buscar una solución óptima de forma explícita, inspirada en el caso pero no derivada de un proceso documentado por Uber.

1. **Formular el problema sin nombrar una herramienta.** Qué decisión tiene que poder tomar alguien al final y qué ocurre hoy cuando no la toma. Una técnica útil es escribir el problema en una sola frase, sin nombres de productos, bases de datos ni frameworks.
2. **Identificar invariantes y restricciones.** Qué tiene que seguir siendo cierto aunque cambie todo lo demás, y qué restricción es física y cuál es heredada. Una tabla con dos columnas, «no negociable» y «asumido», permite discutir cada fila de la segunda.
3. **Cuestionar la representación y la unidad de análisis.** Punto, zona, ticket, servicio o equipo: cada unidad introduce un sesgo. Ver el mismo dato en tres granularidades muestra qué decisiones cambian.
4. **Explorar otros dominios.** Quién resolvió un problema con la misma forma en otro campo y qué estándar existente ya lo cubre. H3 se apoya en cartografía, geometría y la proyección de Fuller.
5. **Prototipar alternativas y medir.** Dos o tres prototipos descartables sobre el mismo conjunto de datos, evaluados contra los criterios definidos al principio y con el criterio de abandono escrito antes de ejecutarlos. Es la etapa en la que «óptimo» deja de ser una opinión.
6. **Registrar los trade-offs, introducir el cambio y revisar.** Un [ADR](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions) con contexto, decisión y consecuencias, y una fecha de revisión.

_La búsqueda de la solución óptima como ciclo: un prototipo que no supera el criterio vuelve a la representación_

```mermaid
flowchart LR
    A[Problema sin herramienta] --> B[Invariantes y restricciones]
    B --> C[Cuestionar la representación]
    C --> D[Explorar otros dominios]
    D --> E[Prototipar y medir]
    E -->|no supera el criterio| C
    E -->|supera el criterio| F[ADR y despliegue gradual]
    F --> G[Revisión con métricas]
    G -->|supuestos cambiaron| A
```

El ciclo importa más que la secuencia. Un prototipo que falla vuelve a la representación, no al principio. Descartar una idea, o elegir un estándar existente, también es un resultado válido: a menudo la solución óptima es la que ya existe.

_El caso H3 leído como una serie de reencuadres (las tres primeras filas provienen del artículo de Uber; la última es un ejemplo propio)_

| Supuesto tradicional | Reencuadre | Alternativa | Costo aceptado |
|---|---|---|---|
| Hay que analizar cada punto | La decisión se toma por zona | Agregar en celdas | Se pierde precisión individual |
| Las zonas las define el negocio | Las zonas pueden ser una grilla estable | Grilla global | No coincide con calles ni barrios |
| La grilla natural es cuadrada | La vecindad importa más que la subdivisión | Hexágonos | Contención jerárquica aproximada y 12 pentágonos |
| El equipo de plataforma resuelve tickets | El cuello de botella es la espera, no la ejecución | Autoservicio | Construir y mantener un producto interno |

## Caso práctico en Platform Engineering

Un ejemplo hipotético muestra cómo se traslada la pregunta. Un equipo de plataforma recibe tickets para crear bases de datos, colas y pipelines. La cola crece y la primera reacción es acelerar: más personas, mejores plantillas de ticket, acuerdos de servicio más cortos.

Con el método, la unidad de análisis cambia. El ticket no es el problema; el problema es que un equipo de producto espera a otro para una tarea repetible. Ese reencuadre conduce a golden paths: caminos estandarizados y autoservicio para los casos más comunes, con el equipo de plataforma como responsable de un producto interno.

El costo es real: ese producto hay que construirlo, documentarlo y mantenerlo, y los casos poco frecuentes siguen requiriendo atención humana. Para saber si el cambio funcionó, conviene medir antes y después el tiempo de entrega de cambios y la frecuencia de despliegue (métricas de [DORA](https://dora.dev/)), el tiempo de incorporación hasta el primer despliegue, la proporción de servicios nuevos creados por el camino estándar, la satisfacción de los desarrolladores mediante una encuesta breve y recurrente, la tasa de fallas de cambio y el costo de infraestructura por servicio. Ninguna cifra de este ejemplo corresponde a una empresa real.

## Preguntas para una revisión de arquitectura

El método puede condensarse en cinco preguntas para la próxima revisión de diseño, o para un taller breve con el equipo.

1. Qué problema se estaría resolviendo si esta tecnología no existiera.
2. En qué unidad se está midiendo, y qué decisión empeora por esa elección.
3. Qué estándar o librería existente se descartó, y por qué.
4. Qué resultado de un prototipo llevaría a abandonar la propuesta.
5. Quién paga el trade-off aceptado, y cuándo se va a revisar.

Un ejercicio práctico consiste en pedir a cada integrante que escriba el problema actual del equipo en una oración, sin nombres de tecnología, y comparar las respuestas. Es habitual que aparezcan dos o tres formulaciones distintas que habilitan decisiones diferentes, y esa diferencia suele ser el punto de partida de la discusión.

## Referencias

- Brodsky, I. (2018). [H3: Uber’s Hexagonal Hierarchical Spatial Index](https://www.uber.com/us/en/blog/h3/). Uber Engineering.
- Proyecto H3: [Overview](https://h3geo.org/docs/core-library/overview/), [Indexing](https://h3geo.org/docs/highlights/indexing/), [Introducción y comparaciones](https://h3geo.org/docs/), [Tablas por resolución](https://h3geo.org/docs/core-library/restable/) y [API de indexación](https://h3geo.org/docs/api/indexing/).
- Uber. [uber/h3](https://github.com/uber/h3), repositorio en GitHub (Apache 2.0; última versión publicada: 4.5.0).
- DeCandia, G. et al. (2007). [Dynamo: Amazon’s Highly Available Key-value Store](https://www.amazon.science/publications/dynamo-amazons-highly-available-key-value-store). SOSP.
- Dean, J. y Ghemawat, S. (2004). [MapReduce: Simplified Data Processing on Large Clusters](https://research.google/pubs/pub62/). OSDI.
- Kreps, J. (2013). [The Log: What every software engineer should know about real-time data’s unifying abstraction](https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying). LinkedIn Engineering.
- Proyecto S2. [S2 Cell Hierarchy](https://s2geometry.io/devguide/s2cell_hierarchy).
- Rabinowitz, N. (2021). [All about H3: your questions answered](https://foursquare.com/resources/reports-and-insights/ebook/all-about-h3-your-questions-answered/). Foursquare.
- Nygard, M. (2011). [Documenting Architecture Decisions](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions).
- DORA. [dora.dev](https://dora.dev/).

---

**En síntesis: una solución óptima en arquitectura es la que mejor satisface criterios explícitos, con costos conocidos y aceptados. H3 lo muestra: no resolvió un problema de velocidad sino de representación, y su grilla estable, comparable y con vecindad uniforme tiene costos declarados, como celdas no uniformes, pentágonos y una jerarquía exacta en lo lógico pero no en lo geométrico. La lección transferible no es adoptar hexágonos, sino definir qué significa óptimo y revisar la representación del problema antes de optimizar la solución.**

