# Kit editorial — SaaS multitenant, IaC y resiliencia

Artículo: `/blog/saas-multitenant-iac-resiliencia/` · Markdown: `docs/articulos/saas-multitenant-iac-resiliencia.md`
Pilar: Platform Engineering y arquitectura · Fecha de publicación prevista: 2026-11-10

## 1. Propuestas de título

1. **SaaS multitenant: diseñar para escalar, automatizar para operar y replicar para sobrevivir** (el que está publicado)
2. **Tu RTO es una hipótesis hasta que el Identity Provider vuelve: aislamiento, IaC y DR en SaaS multitenant**
3. **Compartir infraestructura sin compartir riesgos: decisiones de arquitectura para un SaaS que se recupera**

## 2. Subtítulo (≤ 25 palabras)

La resiliencia de un SaaS multitenant no se compra duplicando recursos: se diseña en el aislamiento, se automatiza con código y se valida recuperando.

## 3–6. Artículo, tabla, diagrama e IaC

Están dentro del artículo publicado (y en el export Markdown):
- Tabla pool / bridge / silo (sección 1) y tabla de conceptos HA/DR (sección 3).
- Diagrama Mermaid de la arquitectura de referencia (sección 4).
- Ejemplo HCL de Terraform/OpenTofu con catálogo de tenants (sección 2).

## 7. Cinco aprendizajes para Engineering Managers

1. **El aislamiento se decide por componente y por riesgo, no por modelo.** Casi todos los casos reales terminan en bridge; la pregunta útil es dónde está la frontera y por qué.
2. **Un tenant que no se puede observar no se puede operar.** El onboarding tiene que crear también métricas, alertas y costo por tenant.
3. **IaC sin detección de drift reconstruye una plataforma que ya no existe.** Medí el porcentaje de recursos gestionados por código y la edad del drift.
4. **El RTO lo fija la dependencia más lenta, y suele ser de otro equipo.** Pedí compromisos de recuperación por escrito, empezando por el Identity Provider.
5. **Un objetivo que no se probó es una aspiración.** Mostrá siempre RTO/RPO objetivo junto al observado en el último ejercicio, y escalá de ejercicio de mesa a simulacro sin aviso.

## 8. Referencias (verificadas el 2026-11-10)

| Fuente | Autor(es) | Fecha |
|---|---|---|
| [Three business decisions that define your DR success](https://aws.amazon.com/blogs/architecture/three-business-decisions-that-define-your-dr-success/) | Peter Garnepudi, Jay Desai (AWS) | 2026-11-02 |
| [Validating your DR commitment: From controlled test to real-world readiness](https://aws.amazon.com/blogs/architecture/validating-your-dr-commitment-from-controlled-test-to-real-world-readiness/) | Peter Garnepudi, Jay Desai (AWS) | 2026-11-02 |
| [How to Automate Multi-Cloud Provisioning and Governance Without Hand-Syncing Four Copies of the Same Environment](https://www.qovery.com/blog/automate-multi-cloud-provisioning-governance-without-hand-syncing) | Alessandro Carrano (Qovery, contenido de proveedor) | 2026-11-02 |
| [How OrderServ achieved up to 64% cost savings with multi-tenant ECS](https://aws.amazon.com/blogs/architecture/how-orderserv-achieved-up-to-64-cost-savings-with-multi-tenant-ecs/) | Chetan Yewale, Ashwini Kumar, Asit Singh, Rama Krishna Sanjeeva, Suddhasattwa Mukherjee, Urvashi Sharma (AWS / Cognizant) | 2026-11-05 |
| [AWS Nitro Sandboxes: Hardware-enforced workload isolation on Amazon EKS](https://aws.amazon.com/blogs/containers/aws-nitro-sandboxes-hardware-enforced-workload-isolation-on-amazon-eks/) | Carlos Santana, Trishi Mehta (AWS) | 2026-11-09 |
| [Building hybrid multi-tenant architecture for stateful services on AWS](https://aws.amazon.com/blogs/architecture/building-hybrid-multi-tenant-architecture-for-stateful-services-on-aws/) | Vasu Raj (AWS) | 2026-05-12 |
| [AWS Well-Architected SaaS Lens](https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/saas-lens.html) | AWS | — |
| [Disaster Recovery of Workloads on AWS](https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-workloads-on-aws.html) | AWS | — |
| [Kubernetes: Multi-tenancy](https://kubernetes.io/docs/concepts/security/multi-tenancy/) | Kubernetes | — |
| [OCI Full Stack Disaster Recovery](https://docs.oracle.com/en-us/iaas/disaster-recovery/index.html) | Oracle | — |

Notas de verificación:
- Las secciones finales del post de OrderServ (passkeys, observabilidad, conclusiones) y del post de arquitectura híbrida no se pudieron leer completas; el artículo solo cita datos de las partes leídas.
- Los números de Qovery (precios de egress, fechas regulatorias) no se usan en el artículo: son citas de terceros dentro de contenido de proveedor.

## 9. Resumen ejecutivo (120 palabras)

Un SaaS multitenant puede tener infraestructura replicada y aun así no recuperarse: alcanza con que el Identity Provider, un secreto o una dependencia de otro equipo quede fuera del plan. Este artículo trata aislamiento, Infrastructure as Code y recuperación ante desastres como un único problema de diseño. Compara los modelos pool, silo y bridge con casos documentados por AWS en 2026, propone separar la IaC en capas global, regional y de tenant con policy as code y detección de drift, y distingue alta disponibilidad, replicación y backup. Incluye una arquitectura de referencia cloud-agnostic con servicios posibles en AWS y OCI, los indicadores que conectan técnica y negocio, y una conclusión central: un RTO solo vale si un ejercicio lo confirmó.

## 10. Publicación de LinkedIn (≈ 185 palabras)

> Son las 03:17. Una región cloud deja de responder.
>
> La base de datos está replicada. El cluster tiene su copia en otra región. Pero nadie probó si el Identity Provider también puede recuperarse.
>
> No es un incidente real: es un experimento mental. Pero AWS publicó hace unos días un caso muy parecido: una plataforma de autenticación compartida quedó fuera del alcance de recuperación y los logins fallaron. En otro ejemplo, un objetivo de 1 hora quedaba en 4 por un servicio de identidad de otro equipo.
>
> Escribí sobre cómo diseñar un SaaS multitenant que se recupere de verdad:
>
> → Pool, silo y bridge: elegir la frontera de aislamiento por riesgo, no solo por costo.
> → Infrastructure as Code sin detección de drift reconstruye una plataforma que ya no existe.
> → Replicación no es backup: una réplica copia también el error.
> → Un RTO que nunca se probó es una aspiración.
>
> Incluye una tabla comparativa, un ejemplo de Terraform/OpenTofu, una arquitectura de referencia y las métricas que conectan todo esto con el negocio.
>
> Pregunta para quienes operan plataformas: ¿cuál es la dependencia más lenta de recuperar en su sistema, y quién es su dueño?
>
> 🔗 Artículo completo en el primer comentario.
>
> #PlatformEngineering #SaaS #DisasterRecovery #CloudArchitecture #SRE

Primer comentario: `https://juliancardozo.github.io/blog/saas-multitenant-iac-resiliencia/?utm_source=linkedin&utm_medium=social&utm_campaign=saas-multitenant-resiliencia&utm_content=post-principal`

## 11. SEO

- **Meta title** (54 car.): SaaS multitenant: aislamiento, IaC y disaster recovery
- **Meta description** (149 car.): Cómo diseñar un SaaS multitenant resiliente: modelos pool, silo y bridge, Infrastructure as Code sin drift y RTO/RPO validados con ejercicios reales.
- **Slug**: `saas-multitenant-iac-resiliencia`
- Ya aplicados en `src/data/articles.js` (`seoTitle`, `seoDescription`).

---

## Estrategia de distribución en LinkedIn (2 semanas)

Sigue la regla de `docs/editorial-calendar.md`: una pieza principal + tres derivados con idea propia, sin replicar el artículo.

| Día | Formato | Idea | Objetivo | UTM `utm_content` |
|---|---|---|---|---|
| D0 (mar/mié, 8–9 h UY) | Post de texto (el de arriba) | El escenario de las 03:17 y las 4 ideas | Clics al artículo y conversación | `post-principal` |
| D+2 | Documento PDF (carrusel) de 6–8 láminas | Pool vs. bridge vs. silo: la tabla + "dónde pone la frontera cada caso real" (OrderServ y ad-serving) | Guardados y compartidos | `carrusel-aislamiento` |
| D+5 | Post corto | "Replicación no es backup": un `DELETE` sin `WHERE` llega a la réplica en segundos | Alcance entre SRE/DBA | `replicacion-backup` |
| D+8 | Encuesta | "¿Su último ejercicio de DR incluyó al Identity Provider?" Sí / No / No hacemos ejercicios / No sé | Dato propio para un post de seguimiento | `encuesta-idp` |
| D+12 | Post de cierre | Resultados de la encuesta + los 4 niveles de validación (mesa → planificado → sin aviso → game day) | Reabrir la conversación con datos | `cierre-encuesta` |

Prácticas para cada pieza:
- **Responder todo en las primeras horas.** La conversación es el objetivo; el clic es la consecuencia.
- **Comentar con aporte en los posts originales** (AWS, Qovery) en lugar de etiquetar a los autores en tu post: etiquetar notifica a personas que no pidieron participar.
- **Enlace**: probá enlace en el cuerpo en una pieza y en el primer comentario en otra, y compará clics con las UTM. No hay que asumir cuál funciona mejor: hay que medirlo.
- **Newsletter**: incluir el artículo en la próxima edición con la pregunta del cierre.
- **Medición** (GA4/GTM ya configurado en el sitio): sesiones por `utm_content`, tiempo en página, clics en el CTA de conversación y altas a la newsletter. Revisar a los 7 y 14 días.

### Para convertir esto en una serie

El formato de las Field Notes de AWS (artículo + PDF descargable) ya tiene evento `notes_download` en GTM. Se puede repetir acá:
1. **Plantilla de ejercicio de mesa de DR** (1 página, PDF): las preguntas de quién declara el failover, primer paso, dueño de cada paso y duración esperada. Es el material más compartible y no requiere inventar nada.
2. **Siguiente artículo**: observabilidad tenant-aware y costo por tenant (conecta con el pilar de plataforma y con Patio/RLS).
3. **Versión en inglés** del artículo (falta la traducción en `src/data/en/`; el build hoy publica el español en `/en/`), para compartirla en comunidades de Platform Engineering fuera de LATAM.
