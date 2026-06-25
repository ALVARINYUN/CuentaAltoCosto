# Matriz de Reglas de Negocio — Validador CAC — Cáncer

**Proyecto:** Validador CAC — Cáncer  
**Documento:** Matriz de reglas de negocio  
**Archivo sugerido:** `docs/MATRIZ_REGLAS_NEGOCIO_V1_V134.md`  
**Alcance consolidado en esta entrega:** V1-V16  
**Fuente técnica usada:** `src/validaciones/reglas/modulo1.js`  
**Estado:** V1-V16 consolidado variable por variable desde código implementado  
**Regla principal:** los errores cerrados no se tocan.

---

## 1. Control de esta entrega

Este documento reemplaza el borrador general anterior.  
La matriz ya no queda organizada sólo por bloques generales; queda documentada variable por variable para el bloque V1-V16.

| Elemento | Estado |
|---|---|
| Validador funcional | Cerrado hasta V134 |
| Matriz consolidada en esta entrega | V1-V16 |
| Fuente usada | `src/validaciones/reglas/modulo1.js` |
| Código modificado | No |
| Errores modificados | No |
| Advertencias modificadas | No |
| Siguiente módulo a consolidar | `modulo2.js` |

---

# Sprint 1 — Identificación — V1-V16

---

## V1 — Primer nombre

| Campo | Regla |
|---|---|
| Variable | V1 |
| Nombre | Primer nombre |
| Tipo de dato | Texto |
| Formato esperado | Mayúscula sostenida |
| Catálogo permitido | No aplica |
| Comodines permitidos | No aplica |
| Dependencias | Ninguna |
| Trazabilidad | Identificación básica del usuario |
| Archivo implementador | `src/validaciones/reglas/modulo1.js` |
| Estado | Cerrada funcional |

### Reglas de error

| Código | Regla |
|---|---|
| V1-ERROR-001 | V1 no puede estar vacío. |
| V1-ERROR-002 | V1 no debe contener letras minúsculas. Debe ir en mayúscula sostenida. |
| V1-ERROR-003 | V1 no debe contener números. |
| V1-ERROR-004 | V1 no debe contener símbolos o caracteres especiales no permitidos. |
| V1-ERROR-005 | V1 no debe contener puntos. |
| V1-ERROR-006 | V1 no debe contener tildes. |
| V1-ERROR-008 | V1 no debe contener diéresis. |
| V1-ERROR-009 | V1 no debe contener apóstrofes. |

### Reglas de advertencia

| Código | Regla |
|---|---|
| V1-ERROR-007 | Si V1 contiene Ñ, se genera advertencia de revisión contra BDUA o soporte oficial. Aunque el código conserva nombre ERROR, la severidad implementada es advertencia. |
| V1-ADVERTENCIA-010 | V1 tiene espacios dobles entre palabras. |
| V1-ADVERTENCIA-011 | V1 tiene espacios al inicio o al final. |

### Excepciones

- La letra Ñ puede existir en nombres reales. Por eso no se bloquea como error; se deja como advertencia de revisión.
- No se permite comodín para V1.

---

## V2 — Segundo nombre

| Campo | Regla |
|---|---|
| Variable | V2 |
| Nombre | Segundo nombre |
| Tipo de dato | Texto |
| Formato esperado | Mayúscula sostenida |
| Catálogo permitido | No aplica |
| Comodines permitidos | `NONE` |
| Dependencias | Ninguna |
| Trazabilidad | Identificación básica del usuario |
| Archivo implementador | `src/validaciones/reglas/modulo1.js` |
| Estado | Cerrada funcional |

### Reglas de error

| Código | Regla |
|---|---|
| V2-ERROR-001 | V2 no puede estar vacío. Debe diligenciarse o usarse `NONE` cuando no aplique. |
| V2-ERROR-002 | El comodín `NONE` debe estar escrito exactamente en mayúscula. |
| V2-ERROR-003 | V2 no debe contener letras minúsculas. |
| V2-ERROR-004 | V2 no debe contener números. |
| V2-ERROR-005 | V2 no debe contener símbolos o caracteres especiales no permitidos. |
| V2-ERROR-006 | V2 no debe contener puntos. |
| V2-ERROR-007 | V2 no debe contener tildes. |
| V2-ERROR-008 | V2 no debe contener guion. |
| V2-ERROR-009 | V2 no debe contener numeral `#`. |

### Reglas de advertencia

| Código | Regla |
|---|---|
| V2-ADVERTENCIA-010 | V2 tiene espacios dobles entre palabras. |
| V2-ADVERTENCIA-011 | V2 tiene espacios al inicio o al final. |

### Excepciones

- `NONE` es válido sólo si está escrito exactamente así.
- Si V2 es `NONE`, no se aplican las demás validaciones de nombre, salvo espacios sobrantes.

---

## V3 — Primer apellido

| Campo | Regla |
|---|---|
| Variable | V3 |
| Nombre | Primer apellido |
| Tipo de dato | Texto |
| Formato esperado | Mayúscula sostenida |
| Catálogo permitido | No aplica |
| Comodines permitidos | No aplica |
| Dependencias | Ninguna |
| Trazabilidad | Identificación básica del usuario |
| Archivo implementador | `src/validaciones/reglas/modulo1.js` |
| Estado | Cerrada funcional |

### Reglas de error

| Código | Regla |
|---|---|
| V3-ERROR-001 | V3 no puede estar vacío. |
| V3-ERROR-002 | V3 no debe contener letras minúsculas. |
| V3-ERROR-003 | V3 no debe contener números. |
| V3-ERROR-004 | V3 no debe contener símbolos o caracteres especiales no permitidos. |
| V3-ERROR-005 | V3 no debe contener puntos. |
| V3-ERROR-006 | V3 no debe contener tildes. |
| V3-ERROR-007 | V3 no debe contener guion. |
| V3-ERROR-008 | V3 no debe contener numeral `#`. |

### Reglas de advertencia

| Código | Regla |
|---|---|
| V3-ADVERTENCIA-009 | V3 tiene espacios dobles entre palabras. |
| V3-ADVERTENCIA-010 | V3 tiene espacios al inicio o al final. |

### Excepciones

- No se permite comodín para V3.

---

## V4 — Segundo apellido

| Campo | Regla |
|---|---|
| Variable | V4 |
| Nombre | Segundo apellido |
| Tipo de dato | Texto |
| Formato esperado | Mayúscula sostenida |
| Catálogo permitido | No aplica |
| Comodines permitidos | `NOAP` |
| Dependencias | Ninguna |
| Trazabilidad | Identificación básica del usuario |
| Archivo implementador | `src/validaciones/reglas/modulo1.js` |
| Estado | Cerrada funcional |

### Reglas de error

| Código | Regla |
|---|---|
| V4-ERROR-001 | V4 no puede estar vacío. Debe diligenciarse o usarse `NOAP` cuando no aplique. |
| V4-ERROR-002 | El comodín `NOAP` debe estar escrito exactamente en mayúscula. |
| V4-ERROR-003 | V4 no debe contener letras minúsculas. |
| V4-ERROR-004 | V4 no debe contener números. |
| V4-ERROR-005 | V4 no debe contener símbolos o caracteres especiales no permitidos. |
| V4-ERROR-006 | V4 no debe contener puntos. |
| V4-ERROR-007 | V4 no debe contener tildes. |
| V4-ERROR-008 | V4 no debe contener guion. |
| V4-ERROR-009 | V4 no debe contener numeral `#`. |

### Reglas de advertencia

| Código | Regla |
|---|---|
| V4-ADVERTENCIA-010 | V4 tiene espacios dobles entre palabras. |
| V4-ADVERTENCIA-011 | V4 tiene espacios al inicio o al final. |

### Excepciones

- `NOAP` es válido sólo si está escrito exactamente así.
- Si V4 es `NOAP`, no se aplican las demás validaciones de apellido, salvo espacios sobrantes.

---

## V5 — Tipo de identificación

| Campo | Regla |
|---|---|
| Variable | V5 |
| Nombre | Tipo de identificación |
| Tipo de dato | Catálogo |
| Formato esperado | Código en mayúscula |
| Catálogo permitido | `CC`, `CE`, `CD`, `PA`, `SC`, `PT`, `PE`, `RC`, `TI`, `CN`, `AS`, `MS`, `DE`, `SI` |
| Comodines permitidos | No aplica |
| Dependencias | V6, V7, V10 |
| Trazabilidad | V5 condiciona el formato de V6 y se cruza con edad calculada desde V7 y régimen V10 |
| Archivo implementador | `src/validaciones/reglas/modulo1.js` |
| Estado | Cerrada funcional |

### Reglas de error

| Código | Regla |
|---|---|
| V5-ERROR-001 | V5 no puede estar vacío. |
| V5-ERROR-002 | V5 debe pertenecer al catálogo permitido. |
| V5-ERROR-003 | V5 debe estar en mayúscula. |
| V5-ERROR-004 | Si V5 es `AS`, V10 debe ser `S`. |
| V5-ERROR-005 | Si V5 es `MS`, V10 debe ser `S`. |

### Reglas de advertencia

| Código | Regla |
|---|---|
| V5-ADVERTENCIA-006 | Si V5 es `CN` y por V7 el paciente tiene más de 28 días, se genera advertencia. |
| V5-ADVERTENCIA-007 | Si V5 es `RC` y por V7 el paciente parece adulto, se genera advertencia. |
| V5-ADVERTENCIA-008 | Si V5 es `TI` y por V7 el paciente parece adulto, se genera advertencia. |

### Excepciones

- `SI` está permitido como tipo de identificación, pero genera advertencia relacionada en V6 por calidad del dato.
- `AS` y `MS` requieren coherencia con régimen subsidiado `S`.

---

## V6 — Número de identificación

| Campo | Regla |
|---|---|
| Variable | V6 |
| Nombre | Número de identificación |
| Tipo de dato | Texto / numérico según V5 |
| Formato esperado | Depende del tipo documental registrado en V5 |
| Catálogo permitido | No aplica |
| Comodines permitidos | No aplica |
| Dependencias | V5 |
| Trazabilidad | V6 se valida según el tipo de identificación V5 |
| Archivo implementador | `src/validaciones/reglas/modulo1.js` |
| Estado | Cerrada funcional |

### Reglas de error

| Código | Regla |
|---|---|
| V6-ERROR-001 | V6 no puede estar vacío. |
| V6-ERROR-002 | V6 contiene caracteres no permitidos. Para tipos alfanuméricos sólo se permiten letras, números o guion cuando aplique. |
| V6-ERROR-003 | Si V5 es `CC`, V6 debe contener sólo números. |
| V6-ERROR-004 | Si V5 es `TI`, V6 debe contener sólo números. |
| V6-ERROR-005 | Si V5 es `RC`, V6 debe contener sólo números. |
| V6-ERROR-006 | Si V5 es `CE`, V6 debe contener sólo números. |
| V6-ERROR-AS-001 | Si V5 es `AS`, V6 no puede estar vacío y debe contener consecutivo interno. |
| V6-ERROR-AS-002 | Si V5 es `AS`, V6 debe contener sólo números. |
| V6-ERROR-AS-003 | Si V5 es `AS`, V6 no debe superar 17 caracteres numéricos. |
| V6-ERROR-MS-001 | Si V5 es `MS`, V6 no puede estar vacío y debe contener consecutivo interno. |
| V6-ERROR-MS-002 | Si V5 es `MS`, V6 debe contener sólo números. |
| V6-ERROR-MS-003 | Si V5 es `MS`, V6 no debe superar 17 caracteres numéricos. |

### Reglas de advertencia

| Código | Regla |
|---|---|
| V6-ADVERTENCIA-AS-004 | Si V5 es `AS` y V6 tiene menos de 10 dígitos, se advierte que puede estar incompleto. |
| V6-ADVERTENCIA-MS-004 | Si V5 es `MS` y V6 tiene menos de 10 dígitos, se advierte que puede estar incompleto. |
| V6-ADVERTENCIA-008 | Si V5 es `CC` y V6 tiene menos de 6 o más de 10 dígitos, se advierte longitud atípica. |
| V6-ADVERTENCIA-009 | Si V5 es `TI` y V6 tiene menos de 6 o más de 11 dígitos, se advierte longitud atípica. |
| V6-ADVERTENCIA-010 | Si V5 es `RC` y V6 tiene menos de 8 dígitos, se advierte longitud atípica. |
| V6-ADVERTENCIA-011 | Si V5 es `SI`, se genera advertencia por calidad del dato. |

### Excepciones

- Para `AS` y `MS`, V6 no corresponde a documento normal sino a consecutivo interno.
- Para tipos alfanuméricos se permiten letras, números o guion cuando aplique.
- Para `CC`, `CE`, `TI` y `RC`, V6 debe ser exclusivamente numérico.

---

## V7 — Fecha de nacimiento

| Campo | Regla |
|---|---|
| Variable | V7 |
| Nombre | Fecha de nacimiento |
| Tipo de dato | Fecha |
| Formato esperado | `AAAA-MM-DD` |
| Catálogo permitido | No aplica |
| Comodines permitidos | No aplica |
| Dependencias | V5, V9, V16 |
| Trazabilidad | V7 permite calcular edad para revisar V5, V9 y V16 |
| Archivo implementador | `src/validaciones/reglas/modulo1.js` |
| Estado | Cerrada funcional |

### Reglas de error

| Código | Regla |
|---|---|
| V7-ERROR-001 | V7 no puede estar vacía. |
| V7-ERROR-002 | V7 debe tener formato `AAAA-MM-DD`. |
| V7-ERROR-003 | V7 debe corresponder a una fecha real del calendario. |

### Reglas de advertencia

| Código | Regla |
|---|---|
| V7-ADVERTENCIA-006 | Si la edad calculada supera 120 años, se genera advertencia de revisión. |

### Excepciones

- No se permite `1845-01-01` ni otros comodines en V7 según implementación actual del módulo 1.

---

## V8 — Sexo

| Campo | Regla |
|---|---|
| Variable | V8 |
| Nombre | Sexo |
| Tipo de dato | Catálogo |
| Formato esperado | Código en mayúscula |
| Catálogo permitido | `M`, `F` |
| Comodines permitidos | No aplica |
| Dependencias | Ninguna |
| Trazabilidad | Identificación básica del usuario |
| Archivo implementador | `src/validaciones/reglas/modulo1.js` |
| Estado | Cerrada funcional |

### Reglas de error

| Código | Regla |
|---|---|
| V8-ERROR-001 | V8 no puede estar vacío. |
| V8-ERROR-002 | V8 debe pertenecer al catálogo permitido: `M` o `F`. |
| V8-ERROR-003 | V8 debe estar en mayúscula. |

### Reglas de advertencia

| Código | Regla |
|---|---|
| No aplica | El módulo 1 no implementa advertencias para V8. |

### Excepciones

- No se permiten comodines en V8 según implementación actual del módulo 1.

---

## V9 — Ocupación

| Campo | Regla |
|---|---|
| Variable | V9 |
| Nombre | Ocupación |
| Tipo de dato | Código numérico |
| Formato esperado | 4 dígitos |
| Catálogo permitido | Código CIUO de 4 dígitos o comodín permitido |
| Comodines permitidos | `9999`, `9998` |
| Dependencias | V7 |
| Trazabilidad | V9 se revisa contra la edad calculada desde V7 |
| Archivo implementador | `src/validaciones/reglas/modulo1.js` |
| Estado | Cerrada funcional |

### Reglas de error

| Código | Regla |
|---|---|
| V9-ERROR-001 | V9 no puede estar vacía. |
| V9-ERROR-002 | V9 debe tener exactamente 4 dígitos. |
| V9-ERROR-003 | V9 debe ser numérica; no debe contener letras ni símbolos. |

### Reglas de advertencia

| Código | Regla |
|---|---|
| V9-ADVERTENCIA-006 | Si el paciente es menor de edad según V7 y V9 es diferente de `9998`, se genera advertencia. |

### Excepciones

- `9998` aplica cuando no corresponde ocupación.
- `9999` está permitido como comodín según la regla implementada.

---

## V10 — Régimen de afiliación

| Campo | Regla |
|---|---|
| Variable | V10 |
| Nombre | Régimen de afiliación |
| Tipo de dato | Catálogo |
| Formato esperado | Código en mayúscula |
| Catálogo permitido | `C`, `S`, `P`, `E`, `N`, `I` |
| Comodines permitidos | No aplica |
| Dependencias | V5, V16 |
| Trazabilidad | V10 se cruza con V5 para AS/MS y con V16 en advertencia de fecha antigua |
| Archivo implementador | `src/validaciones/reglas/modulo1.js` |
| Estado | Cerrada funcional |

### Reglas de error

| Código | Regla |
|---|---|
| V10-ERROR-001 | V10 no puede estar vacío. |
| V10-ERROR-002 | V10 debe pertenecer al catálogo permitido. |
| V10-ERROR-003 | V10 debe estar en mayúscula. |

### Reglas de advertencia

| Código | Regla |
|---|---|
| V16-ADVERTENCIA-007 | V10 participa como dato relacionado cuando V16 es anterior a `1995-01-01`. |

### Excepciones

- Si V5 es `AS` o `MS`, V10 debe ser `S`.
- No se permiten comodines en V10 según implementación actual del módulo 1.

---

## V11 — Código de la EPS

| Campo | Regla |
|---|---|
| Variable | V11 |
| Nombre | Código de la EPS |
| Tipo de dato | Texto / código |
| Formato esperado | Código de EPS, EAPB o entidad territorial |
| Catálogo permitido | No validado por catálogo en módulo 1 |
| Comodines permitidos | No documentado en módulo 1 |
| Dependencias | Ninguna |
| Trazabilidad | Identificación administrativa del usuario |
| Archivo implementador | `src/validaciones/reglas/modulo1.js` |
| Estado | Cerrada funcional |

### Reglas de error

| Código | Regla |
|---|---|
| V11-ERROR-001 | V11 no puede estar vacío. |

### Reglas de advertencia

| Código | Regla |
|---|---|
| No aplica | El módulo 1 no implementa advertencias para V11. |

### Excepciones

- El módulo 1 sólo valida obligatoriedad.
- No valida catálogo de EPS/EAPB en esta implementación.

---

## V12 — Pertenencia étnica

| Campo | Regla |
|---|---|
| Variable | V12 |
| Nombre | Pertenencia étnica |
| Tipo de dato | Catálogo numérico |
| Formato esperado | Número |
| Catálogo permitido | `1`, `2`, `3`, `4`, `5`, `6` |
| Comodines permitidos | No aplica |
| Dependencias | Ninguna |
| Trazabilidad | Identificación poblacional del usuario |
| Archivo implementador | `src/validaciones/reglas/modulo1.js` |
| Estado | Cerrada funcional |

### Catálogo

| Código | Descripción |
|---|---|
| 1 | Indígena |
| 2 | ROM / gitano |
| 3 | Raizal del archipiélago de San Andrés y Providencia |
| 4 | Palenquero de San Basilio |
| 5 | Negro(a), mulato(a), afrocolombiano(a) o afrodescendiente |
| 6 | Ninguna de las anteriores |

### Reglas de error

| Código | Regla |
|---|---|
| V12-ERROR-001 | V12 no puede estar vacía. |
| V12-ERROR-002 | V12 debe pertenecer al catálogo permitido del 1 al 6. |
| V12-ERROR-003 | V12 debe ser numérica; no debe contener letras ni símbolos. |

### Reglas de advertencia

| Código | Regla |
|---|---|
| No aplica | El módulo 1 no implementa advertencias para V12. |

### Excepciones

- No se permiten comodines en V12 según implementación actual del módulo 1.

---

## V13 — Grupo poblacional

| Campo | Regla |
|---|---|
| Variable | V13 |
| Nombre | Grupo poblacional |
| Tipo de dato | Catálogo numérico |
| Formato esperado | Número |
| Catálogo permitido | `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `31`, `32`, `33`, `34`, `35`, `36`, `37`, `38`, `39`, `50`, `51`, `52`, `53`, `54`, `55`, `56`, `57`, `58`, `59`, `60`, `61`, `62`, `63` |
| Comodines permitidos | No aplica |
| Dependencias | Ninguna |
| Trazabilidad | Identificación poblacional del usuario |
| Archivo implementador | `src/validaciones/reglas/modulo1.js` |
| Estado | Cerrada funcional |

### Reglas de error

| Código | Regla |
|---|---|
| V13-ERROR-001 | V13 no puede estar vacío. |
| V13-ERROR-002 | V13 debe pertenecer al catálogo permitido. |
| V13-ERROR-003 | V13 debe ser numérico; no debe contener letras ni símbolos. |

### Reglas de advertencia

| Código | Regla |
|---|---|
| No aplica | El módulo 1 no implementa advertencias para V13. |

### Excepciones

- No se permiten comodines en V13 según implementación actual del módulo 1.

---

## V14 — Municipio de residencia

| Campo | Regla |
|---|---|
| Variable | V14 |
| Nombre | Municipio de residencia |
| Tipo de dato | Código DIVIPOLA |
| Formato esperado | 5 dígitos numéricos |
| Catálogo permitido | Código DIVIPOLA municipal |
| Comodines permitidos | No aplica |
| Dependencias | Ninguna |
| Trazabilidad | Identificación territorial del usuario |
| Archivo implementador | `src/validaciones/reglas/modulo1.js` |
| Estado | Cerrada funcional |

### Reglas de error

| Código | Regla |
|---|---|
| V14-ERROR-001 | V14 no puede estar vacío. |
| V14-ERROR-002 | V14 debe tener exactamente 5 dígitos. |
| V14-ERROR-003 | V14 debe ser numérico; no debe contener letras, espacios ni símbolos. |

### Reglas de advertencia

| Código | Regla |
|---|---|
| No aplica | El módulo 1 no implementa advertencias para V14. |

### Excepciones

- No se permiten comodines en V14 según implementación actual del módulo 1.

---

## V15 — Número telefónico

| Campo | Regla |
|---|---|
| Variable | V15 |
| Nombre | Número telefónico |
| Tipo de dato | Texto numérico |
| Formato esperado | Uno o dos teléfonos; si hay dos, separados por guion medio |
| Catálogo permitido | No aplica |
| Comodines permitidos | `0` |
| Dependencias | Ninguna |
| Trazabilidad | Dato de contacto del usuario |
| Archivo implementador | `src/validaciones/reglas/modulo1.js` |
| Estado | Cerrada funcional |

### Reglas de error

| Código | Regla |
|---|---|
| V15-ERROR-001 | V15 no puede estar vacío si no se usa el comodín `0`. |
| V15-ERROR-002 | V15 permite máximo dos teléfonos. |
| V15-ERROR-003 | V15 sólo debe contener números y guion medio. |
| V15-ERROR-004 | Si hay dos teléfonos, deben separarse con guion medio; no se aceptan coma, punto y coma, slash o barra vertical como separador. |

### Reglas de advertencia

| Código | Regla |
|---|---|
| V15-ADVERTENCIA-005 | Uno o más teléfonos parecen incompletos por longitud corta. |
| V15-ADVERTENCIA-006 | Uno o más teléfonos tienen longitud inusual mayor a 10 dígitos. |
| V15-ADVERTENCIA-007 | Se usó `0`, indicando ausencia de teléfono disponible. |

### Excepciones

- `0` es válido como comodín para ausencia de teléfono.
- El módulo elimina espacios internos antes de validar para evitar falsos positivos cuando la BD entrega formatos como `3154247281 - 3104879168`.

---

## V16 — Fecha de afiliación

| Campo | Regla |
|---|---|
| Variable | V16 |
| Nombre | Fecha de afiliación |
| Tipo de dato | Fecha |
| Formato esperado | `AAAA-MM-DD` |
| Catálogo permitido | No aplica |
| Comodines permitidos | No aplica |
| Dependencias | V7, V10 |
| Trazabilidad | V16 no puede ser anterior a V7 |
| Archivo implementador | `src/validaciones/reglas/modulo1.js` |
| Estado | Cerrada funcional |

### Reglas de error

| Código | Regla |
|---|---|
| V16-ERROR-001 | V16 no puede estar vacía. |
| V16-ERROR-002 | V16 debe tener formato `AAAA-MM-DD`. |
| V16-ERROR-003 | V16 debe corresponder a una fecha real del calendario. |
| V16-ERROR-004 | V16 no puede ser anterior a V7, fecha de nacimiento. |

### Reglas de advertencia

| Código | Regla |
|---|---|
| V16-ADVERTENCIA-007 | Si V16 es anterior a `1995-01-01`, se genera advertencia de revisión contra BDUA o soporte de afiliación. |

### Excepciones

- Una fecha anterior a `1995-01-01` no se bloquea automáticamente; queda como advertencia.
- No se permite `1845-01-01` ni otros comodines en V16 según implementación actual del módulo 1.

---

# Resumen del bloque V1-V16

| Variable | Nombre | Estado matriz |
|---|---|---|
| V1 | Primer nombre | Consolidada |
| V2 | Segundo nombre | Consolidada |
| V3 | Primer apellido | Consolidada |
| V4 | Segundo apellido | Consolidada |
| V5 | Tipo de identificación | Consolidada |
| V6 | Número de identificación | Consolidada |
| V7 | Fecha de nacimiento | Consolidada |
| V8 | Sexo | Consolidada |
| V9 | Ocupación | Consolidada |
| V10 | Régimen de afiliación | Consolidada |
| V11 | Código de la EPS | Consolidada |
| V12 | Pertenencia étnica | Consolidada |
| V13 | Grupo poblacional | Consolidada |
| V14 | Municipio de residencia | Consolidada |
| V15 | Número telefónico | Consolidada |
| V16 | Fecha de afiliación | Consolidada |

---

# Próximo bloque

Para continuar la matriz variable por variable, el siguiente archivo fuente debe ser:

`src/validaciones/reglas/modulo2.js`

Ese módulo debe usarse para consolidar el siguiente bloque sin inventar reglas.
