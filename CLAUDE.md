## Documentación del proyecto

Antes de implementar cualquier funcionalidad, consulta los casos de uso
en `docs/casos-de-uso.md`. Cada caso de uso (CU-01 a CU-10) define el
flujo, las reglas de negocio y las notas técnicas de la capa que lo
implementa. Respeta siempre el aislamiento por `jardinId`.

## Skills del proyecto

Consulta la skill correspondiente al trabajar en cada capa:
`seguridad-jardin` (DAL/`lib/dal/**`, aislamiento por `jardinId`),
`resultado-actions` (Server Actions/`lib/actions/*.actions.ts`, contrato
`Result<T>`) y `convenciones-ui` (componentes y páginas/`app/**`, paleta,
tipografía y tema por jardín).