# Kit editorial — Quarkus para equipos Java

Artículo: `/blog/quarkus-java-cloud-native-equipos-spring/` · Markdown: `docs/articulos/quarkus-java-cloud-native-equipos-spring.md`
Categoría: Arquitectura y plataforma · Pilar: Platform Engineering · Publicación: 2026-11-13
Artículos relacionados: `/blog/saas-multitenant-iac-resiliencia/`, `/blog/developer-experience-ia-friccion-plataforma/`

## 1. Cinco alternativas de título

1. **Quarkus para equipos Java: qué cambia cuando el framework arranca en el build** (publicado)
2. **De Spring Boot a Quarkus: qué cambia en la forma de construir, probar y operar un servicio**
3. **JVM, caché AOT o nativo: cómo leer los datos oficiales de Quarkus**
4. **Compile time boot: la idea central de Quarkus explicada para equipos Spring**
5. **Evaluar Quarkus sin reescribir un sistema: un plan en seis pasos**

## 2. Resumen SEO (≤ 160 caracteres)

- **Meta description** (139 car.): Qué cambia con Quarkus: arranque en el build, JVM vs. nativo con datos oficiales, Dev Services, compatibilidad con Spring y cómo evaluarlo.
- **Meta title** (60 car.): Quarkus para equipos Java y Spring: guía técnica de adopción
- **Slug**: `quarkus-java-cloud-native-equipos-spring`

## 3. Post de LinkedIn (≈ 200 palabras)

> **Quarkus para equipos Java: qué cambia cuando el framework arranca en el build**
>
> Para un equipo que trabaja con Spring Boot, la pregunta útil sobre Quarkus no es si es más rápido, sino qué cambia en la forma de construir, probar y operar un servicio, y qué cuesta ese cambio.
>
> La idea central es mover al build el trabajo que un framework tradicional repite en cada arranque: escaneo de clases, reflexión, construcción del grafo de dependencias. El proyecto lo llama compile time boot.
>
> La guía oficial de compilación nativa publica un benchmark que conviene leer completo. En esa medición (Quarkus 3.34.3, JDK 25), el ejecutable nativo usa 95 MiB de memoria residente frente a 304 MiB en la JVM, pero su throughput máximo cae de 13.265 a 5.411 transacciones por segundo. La opción intermedia, la JVM con la caché AOT de Leyden, reduce arranque y memoria con una pérdida pequeña de throughput. Son datos del proyecto, no una medición propia.
>
> En el artículo recorro las guías de la versión 3.40 con esa perspectiva: Dev Services y testing continuo, la capa de compatibilidad con Spring y sus límites documentados, la gobernanza del proyecto y un plan para evaluarlo con un piloto y criterios medibles.
>
> El artículo completo está en el primer comentario.
>
> #Java #Quarkus #SpringBoot #CloudNative

Primer comentario: `https://juliancardozo.github.io/blog/quarkus-java-cloud-native-equipos-spring/?utm_source=linkedin&utm_medium=social&utm_campaign=quarkus&utm_content=post-principal`

## 4. Tres preguntas para la comunidad

1. ¿Qué pesa más al evaluar un framework Java hoy: tiempo de arranque, memoria, throughput o el ciclo de desarrollo local?
2. ¿En qué tipo de servicio justifican un ejecutable nativo, dado su costo en tiempo de build y throughput?
3. ¿Qué criterio usarían para decidir si un piloto con Quarkus fue exitoso?

## 5. Fuentes verificadas (2026-11-13)

- [Quarkus: guías oficiales](https://quarkus.io/guides/) — índice de guías de la versión 3.40.
- [Building a native executable](https://quarkus.io/guides/building-native-image) — benchmark JVM / Leyden AOT / nativo (Quarkus 3.34.3, JDK 25). La guía dice que los ejecutables nativos pesan «menos de 50 MB», pero su propia tabla muestra 244 MB; el artículo no usa ese dato.
- [Dev Services](https://quarkus.io/guides/dev-services) y [Continuous testing](https://quarkus.io/guides/continuous-testing).
- [Spring DI compatibility](https://quarkus.io/guides/spring-di) — alcance y limitaciones de la capa de compatibilidad.
- Blog de Quarkus — versión 3.40.1.2 (2026-11-09) con correcciones de CVE; línea LTS 3.40; proyecto bajo la Commonhaus Foundation.

Notas de rigor:
- Las cifras de rendimiento son del benchmark del proyecto y corresponden a la versión 3.34.3, no a la actual.
- El plan de evaluación en seis pasos es una propuesta propia.

---
