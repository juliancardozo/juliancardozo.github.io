# Kit editorial — Floci

Artículo: `/blog/floci-emulacion-cloud-local-platform-engineering/` · Markdown: `docs/articulos/floci-emulacion-cloud-local-platform-engineering.md`
Categoría: Arquitectura y plataforma · Pilar: Platform Engineering · Fecha: 2026-11-15
Relacionados: DevEx y fricción de plataforma, Harness engineering, Quarkus para equipos Java

## A. Investigación técnica

Fuentes consultadas el 2026-11-15 (API de GitHub, READMEs, documentación en `docs/` del repo, Maven Central):

| Hallazgo | Fuente | Tipo |
|---|---|---|
| Familia de emuladores MIT: AWS (:4566), Azure (:4577), GCP (:4588), OCI (:4599), más CLI, UI y Testcontainers (Java, Node, Python, .NET, Go) | READMEs de cada repo | Declarado |
| Emulador AWS en Quarkus 3.40.1.1, `maven.compiler.release` 25, imagen nativa GraalVM y binario independiente | `floci/pom.xml`, README | Verificado en código |
| Enrutador JAX-RS/Vert.x; servicios en proceso, con estado (S3, DynamoDB) y respaldados por Docker (Lambda, RDS, MSK, EKS…) | README (diagrama) | Declarado |
| Storage: `memory` (default), `persistent`, `hybrid` (flush cada 5 s), `wal` | README, `docs/configuration/storage.md` | Declarado |
| Firmas SigV4 no verificadas por defecto; IAM enforcement con `FLOCI_SERVICES_IAM_ENFORCEMENT_ENABLED` (default `false`) | `docs/configuration/multi-account.md`, `docs/services/iam.md`, `environment-variables.md` | Documentado |
| Stubs: Bedrock Runtime, Textract, Transcribe; FIS simula solo el plano de control; Service Quotas con valores estáticos | README, tabla de servicios | Documentado |
| 2.576 pruebas de compatibilidad (Java 1.326, Node 449, Python 311, Go 157, CLI 205, Terraform 67, OpenTofu 41, CDK 20) | README, `compatibility-tests/` | Declarado (no ejecutado) |
| Arranque ~24 ms y ~13 MiB en reposo vs. 3,3 s y 143 MiB de LocalStack Community | README | **Benchmark del proyecto, no independiente** |
| Repo creado 2026-02-18; >31.700 estrellas, 169 contribuidores, 5.323 PRs fusionados, 2.406 issues cerrados, ~170 abiertos, 63 releases; tren los días 15 y último de cada mes | API de GitHub | Verificado |
| `testcontainers-floci` 1.16.0 (línea 1.x): Testcontainers 1.21.4, Java 17, Spring Boot 3.5.16 | POM padre en Maven Central | Verificado |
| Línea 2.x (`testcontainers-floci-aws`) para Testcontainers 2 / Spring Boot 4; integración Spring vía `spring-cloud-aws-testcontainers` 4.1.0 | README de testcontainers-floci | Declarado |
| `FlociContainer` monta el socket de Docker solo si algún servicio habilitado lo necesita; `withDockerSocket(false)` lo desactiva | README de testcontainers-floci | Declarado |
| CLI con `start --detach`, `wait`, `env`, `stop --remove` para CI; skill para agentes (Claude Code, Codex, Cursor, Kiro, Gemini CLI) | README de floci-cli | Declarado |
| LocalStack: imagen unificada con token desde marzo de 2026; sin compromiso de actualizar Community | [Blog oficial de LocalStack](https://blog.localstack.cloud/the-road-ahead-for-localstack/) | Fuente primaria |

**Límites de verificación**
- El ejemplo **compila** (Maven, Java 25 con `release` 21) con Spring Boot 3.5.16, AWS SDK 2.59.1, Testcontainers 1.21.4 y `testcontainers-floci` 1.16.0. **La prueba de integración no se ejecutó**: el entorno no tenía Docker. Conviene correr `./mvnw verify` antes de publicar.
- `compose.yaml` no se ejecutó. La imagen `amazon/aws-cli:2.17.0` y la sintaxis de `service_completed_successfully` son estándar, pero no se probaron con Floci 2.5.0.
- No se leyó cada página de floci.io; la información técnica proviene de los READMEs y de `docs/` del repo.
- Las afirmaciones sobre Moto, Azurite y los emuladores de gcloud son conocimiento general verificable en sus repositorios; no se revisaron versiones actuales.

## B. Artículo

Publicado en el sitio desde `src/data/articles.js`; export en `docs/articulos/floci-emulacion-cloud-local-platform-engineering.md`.
Extensión: unas 3.100 palabras sin código ni tablas (algo por encima del objetivo de 2.000–2.800). Las secciones más fáciles de recortar son "Floci como componente de una IDP" y el párrafo de madurez.

## C. SEO

**Cinco títulos alternativos**
1. Floci: llevar la nube al entorno local sin perder el control arquitectónico (publicado)
2. Emulación cloud local en Platform Engineering: qué aporta Floci y qué no reemplaza
3. Feedback rápido como decisión de plataforma: el caso Floci
4. De LocalStack a Floci: cómo evaluar un emulador cloud para tu plataforma interna
5. S3, SQS y Testcontainers sin cuenta de AWS: una lectura técnica de Floci

- **Slug:** `floci-emulacion-cloud-local-platform-engineering`
- **Meta description (152):** Qué es Floci, cómo funciona por dentro, un ejemplo con Spring Boot, S3, SQS y Testcontainers, y los límites de emular la nube en una plataforma interna.
- **Meta title (54):** Floci: emulación cloud local para Platform Engineering
- **Extracto (~250):** La velocidad del feedback es una propiedad del diseño de la plataforma. Un análisis de Floci, emulador open source de AWS, Azure, GCP y OCI: arquitectura, un ejemplo con Spring Boot y Testcontainers, y por qué no reemplaza las pruebas en la nube real.
- **Tags:** Platform Engineering, Cloud, Java (en el sitio). Para redes: Developer Experience, Testcontainers, AWS, LocalStack, Internal Developer Platform.

## D. Recursos visuales

1. **Imagen hero conceptual:** una laptop sobre la que flota una nube compuesta por pequeños módulos (S3, SQS, colas, bases), conectada por un único cable a un puerto `:4566`; al fondo, una nube real desenfocada unida por una línea punteada que dice "staging". Paleta sobria, estilo isométrico.
2. **Diagrama de arquitectura (Mermaid, incluido en el artículo):** enrutador → servicios en proceso, con estado y con contenedores → backend de storage y Docker.
3. **Diagrama de capas de prueba (propuesta):** pirámide con cinco niveles (unit, integración con Floci, contrato, smoke en nube, resiliencia y performance), marcando con color dónde corre cada uno (local/CI vs. ambiente real) y una línea que separa "lo que la emulación cubre" de "lo que solo la nube cubre".

## E. Publicación en LinkedIn (≈ 190 palabras)

> **La velocidad del feedback es una decisión de plataforma**
>
> Un servicio que guarda archivos en S3 y publica eventos en SQS puede levantar en local y, aun así, no poder probarse sin credenciales, permisos de otro equipo y un ambiente compartido. Cada dependencia agrega espera a un ciclo que debería durar segundos.
>
> Analicé Floci, un ecosistema open source (MIT) que emula AWS, Azure, GCP y OCI en local. Combina emulación de protocolos en proceso con contenedores reales para motores como Postgres o Kafka, y se integra con Testcontainers, Terraform y los SDK estándar.
>
> En el artículo incluyo un ejemplo con Spring Boot, S3, SQS y Testcontainers, su lugar en un golden path y una comparación con LocalStack, Moto, Azurite y los emuladores de gcloud. También dedico una sección a lo que la emulación no resuelve: IAM, networking, cuotas y fallas siguen necesitando pruebas en la nube real.
>
> ¿Qué pruebas de integración de su equipo dependen hoy de un ambiente compartido, y cuáles podrían correr en la máquina de cada persona?
>
> El artículo completo está en el primer comentario.
>
> #PlatformEngineering #DeveloperExperience #CloudNative

Primer comentario: `https://juliancardozo.github.io/blog/floci-emulacion-cloud-local-platform-engineering/?utm_source=linkedin&utm_medium=social&utm_campaign=floci&utm_content=post-principal`

## F. Checklist editorial

- [x] Diferencia entre capacidades declaradas, verificadas y conclusiones propias (nota "Qué se verificó", tabla A).
- [x] Benchmarks del proyecto señalados como tales.
- [x] Versiones verificadas en Maven Central y en el POM del proyecto.
- [x] El código compila con las versiones indicadas.
- [ ] **Pendiente:** ejecutar `./mvnw verify` y `docker compose up` con Docker disponible.
- [x] Sección obligatoria sobre límites de la emulación y estrategia por capas.
- [x] Integraciones existentes separadas de propuestas (sección IDP).
- [x] Sin mejoras numéricas atribuidas sin evidencia; métricas propuestas como hipótesis.
- [x] Sin experiencias personales ni uso en producción inventados.
- [x] Comparación sin ganador universal; la tabla de Floci vs. LocalStack Community se aclara como propia del proyecto.
- [x] Al menos un diagrama Mermaid (dos) y tablas comparativas.
- [x] Enlaces a fuentes primarias; `npm run check` sin problemas.
- [ ] Revisar si conviene recortar unas 300 palabras para quedar dentro del objetivo.
