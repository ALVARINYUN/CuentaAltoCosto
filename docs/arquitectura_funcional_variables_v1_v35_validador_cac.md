# Arquitectura Funcional de Variables V1-V35 — Validador CAC Cohorte Cáncer

**Proyecto:** Validador CAC — Cohorte Cáncer  
**Documento:** Arquitectura funcional de variables y trazabilidad  
**Alcance actual:** Variables V1 a V35  
**Estado:** Base arquitectónica para auditoría de reglas de negocio  
**Tecnología del validador:** HTML, CSS y JavaScript local  
**Propósito:** Documentar cómo se organizan las variables, qué módulos las validan y qué dependencias existen entre ellas.

---

## 1. Objetivo del documento

Este documento define la arquitectura funcional de las variables implementadas hasta la V35 en el Validador CAC.

Su objetivo no es reemplazar el instructivo oficial de la Cuenta de Alto Costo, sino servir como mapa técnico-funcional para:

- Mantener trazabilidad entre variables.
- Evitar reglas duplicadas o contradictorias.
- Identificar qué módulo valida cada bloque.
- Separar reglas directas, reglas cruzadas y reglas dependientes de catálogos externos.
- Facilitar auditorías futuras antes de modificar código.
- Evitar romper variables ya cerradas al agregar nuevas reglas.

---

## 2. Principio arquitectónico del validador

El validador se construye de forma acumulativa.

Cada sprint o módulo agrega nuevas variables, pero las variables anteriores deben permanecer activas y no deben deshabilitarse ni alterarse salvo que exista un bug real o una decisión funcional aprobada.

La arquitectura se basa en tres niveles:

| Nivel | Descripción |
|---|---|
| Validación directa | Revisa formato, vacío, catálogo básico o tipo de dato de una variable individual. |
| Trazabilidad interna | Revisa coherencia entre variables del mismo módulo. |
| Trazabilidad transversal | Revisa dependencias hacia variables anteriores o posteriores. |

---

## 3. Módulos funcionales implementados

| Módulo | Variables | Archivo principal | Propósito |
|---|---:|---|---|
| Módulo 1 | V1-V16 | `src/validaciones/reglas/modulo1.js` | Identificación, datos demográficos, afiliación y contacto. |
| Módulo 2 | V17-V24 | `src/validaciones/reglas/modulo2.js` | Diagnóstico del cáncer, fechas diagnósticas, tipo de estudio e histopatología. |
| Módulo 3 | V25-V28 | `src/validaciones/reglas/modulo3.js` | IPS diagnóstica, primera consulta, histología y grado tumoral. |
| Módulo 4 | V29 | `src/validaciones/reglas/modulo4.js` | Primera estadificación TNM, FIGO u otras compatibles. |
| Módulo 5 | V30-V33 | `src/validaciones/reglas/modulo5.js` | Fecha de estadificación y bloque HER2. |
| Módulo 6 | V34-V35 | `src/validaciones/reglas/modulo6.js` | Estadificación de Dukes y fecha de Dukes para cáncer colorrectal. |

---

## 4. Arquitectura general de trazabilidad

```text
V1-V16   → Identificación, sexo, edad, afiliación y datos base.
V17-V24  → Diagnóstico del cáncer y soporte diagnóstico.
V25-V28  → Institución diagnóstica, consulta, histología y grado.
V29      → Estadificación inicial según diagnóstico.
V30      → Fecha de la estadificación inicial.
V31-V33  → HER2 según diagnóstico de cáncer de mama.
V34-V35  → Dukes según diagnóstico de cáncer colorrectal.
```

Las variables no deben validarse de forma aislada cuando el instructivo define relaciones clínicas o administrativas entre ellas.

---

# 5. Módulo 1 — Identificación del usuario: V1-V16

## 5.1 Propósito

Este módulo valida datos básicos de identificación, afiliación, contacto y residencia del usuario reportado.

## 5.2 Variables

| Variable | Nombre funcional | Tipo | Regla principal |
|---|---|---|---|
| V1 | Primer nombre | Texto | Obligatorio, mayúscula, sin caracteres no permitidos. |
| V2 | Segundo nombre | Texto | Permite `NONE` cuando no aplica. |
| V3 | Primer apellido | Texto | Obligatorio, mayúscula, sin caracteres no permitidos. |
| V4 | Segundo apellido | Texto | Permite `NOAP` cuando no aplica. |
| V5 | Tipo de identificación | Catálogo | Debe estar en catálogo permitido. |
| V6 | Número de identificación | Texto/numérico | Depende de V5. |
| V7 | Fecha de nacimiento | Fecha | Formato `AAAA-MM-DD`, fecha real. |
| V8 | Sexo | Catálogo | `M` o `F`. |
| V9 | Ocupación | Código | 4 dígitos o comodines operativos. |
| V10 | Régimen de afiliación | Catálogo | `C`, `S`, `P`, `E`, `N`, `I`. |
| V11 | Código EAPB / entidad territorial | Código | Obligatorio; catálogo externo pendiente. |
| V12 | Pertenencia étnica | Catálogo | Códigos 1 a 6. |
| V13 | Grupo poblacional | Catálogo | Catálogo interno definido por instructivo. |
| V14 | Municipio de residencia | Código DIVIPOLA | 5 dígitos; existencia depende de catálogo externo. |
| V15 | Teléfono | Texto | Máximo dos teléfonos separados por guion o `0`. |
| V16 | Fecha de afiliación | Fecha | Formato `AAAA-MM-DD`, fecha real. |

## 5.3 Cruces internos del Módulo 1

| Cruce | Regla funcional | Severidad sugerida |
|---|---|---|
| V5 ↔ V6 | El formato de V6 depende del tipo de identificación registrado en V5. | Error |
| V5 ↔ V10 | `AS` y `MS` solo aplican para régimen subsidiado `S`. | Error |
| V5 ↔ V7 | Tipo documental revisable según edad: CN, RC, TI. | Advertencia |
| V7 ↔ V16 | La afiliación no puede ser anterior al nacimiento. | Error |
| V7 ↔ V9 | Menor de edad con ocupación distinta de `9998`. | Advertencia |
| V16 ↔ V10 | Fecha de afiliación antigua frente al régimen reportado. | Advertencia |

## 5.4 Decisiones funcionales aprobadas

| Tema | Decisión |
|---|---|
| V7 contra fecha de corte 2025-05-05 | Excluida por decisión del cliente. No implementar ni sugerir nuevamente. |
| Letra Ñ en V1 | Mantener como advertencia, no como error. |
| V16 anterior a 1995-01-01 | Mantener como advertencia. |
| V9 contra CIUO completo | No implementar hasta tener catálogo externo. |
| V11 contra EAPB/DANE | No implementar hasta tener catálogo externo. |
| V14 contra DIVIPOLA real | No implementar hasta tener catálogo externo. |

---

# 6. Módulo 2 — Diagnóstico del cáncer: V17-V24

## 6.1 Propósito

Este módulo valida el diagnóstico primario del cáncer, fechas diagnósticas, tipo de estudio confirmatorio y soporte histopatológico.

## 6.2 Variables

| Variable | Nombre funcional | Tipo | Regla principal |
|---|---|---|---|
| V17 | Código CIE-10 de neoplasia maligna reportada | Código CIE-10 | Debe existir en catálogo operativo CAC y representar tumor primario válido. |
| V18 | Fecha de diagnóstico del cáncer reportado | Fecha | Fecha real o `1800-01-01`. |
| V19 | Fecha de remisión o interconsulta | Fecha | Fecha real o `1800-01-01`. |
| V20 | Fecha de ingreso a institución diagnóstica | Fecha | Fecha real o `1800-01-01`. |
| V21 | Tipo de estudio diagnóstico | Catálogo | `5`, `6`, `7`, `8`, `9`, `10`, `99`; históricos `1`-`4` como advertencia. |
| V22 | Motivo sin histopatología | Catálogo | Depende de V21. |
| V23 | Fecha de recolección de muestra histopatológica | Fecha | Fecha real, `1800-01-01` o `1845-01-01` si V21=7. |
| V24 | Fecha del informe histopatológico válido | Fecha | Fecha real, `1800-01-01` o `1845-01-01` si V21=7. |

## 6.3 Cruces hacia variables anteriores

| Cruce | Regla funcional | Severidad |
|---|---|---|
| V17 ↔ V8 | CIE-10 debe ser coherente con sexo cuando el catálogo indique restricción. | Error |
| V17 ↔ V7/V18 | Si el CIE-10 tiene restricción de edad, calcular edad al diagnóstico. | Advertencia |

## 6.4 Cruces internos del Módulo 2

| Cruce | Regla funcional | Severidad |
|---|---|---|
| V19 ↔ V20 | V19 debe ser menor o igual a V20. | Error |
| V19 ↔ V18 | V19 debe ser menor o igual a V18. | Error |
| V20 ↔ V18 | V20 debe ser menor o igual a V18. | Error |
| V21 ↔ V22 | Si V21=7, V22 debe explicar motivo sin histopatología. | Error |
| V21 ↔ V23 | Si V21=7, V23 debe ser `1845-01-01`. | Error |
| V21 ↔ V24 | Si V21=7, V24 debe ser `1845-01-01`. | Error |
| V23 ↔ V24 | La muestra no puede ser posterior al informe. | Error |
| V23 ↔ V18 | La muestra no debería ser posterior al diagnóstico cuando hizo parte de la confirmación. | Error |
| V18 ↔ V24 | Si el diagnóstico fue histopatológico, normalmente V18 debe coincidir con V24. | Advertencia |

## 6.5 Cruces hacia variables posteriores

| Variable origen | Variables posteriores | Uso |
|---|---|---|
| V17 | V29 | Define catálogo de estadificación compatible. |
| V17 | V31-V33 | Define si HER2 aplica por cáncer de mama. |
| V17 | V34-V35 | Define si Dukes aplica por cáncer colorrectal. |
| V18 | V26 | Sirve como fecha base frente a primera consulta. |
| V18 | V30 | V30 no debe ser anterior al diagnóstico. |
| V18 | V35 | V35 no debería ser anterior al diagnóstico cuando Dukes es real. |
| V21 | V27-V28 | Define si debe usarse 98 por ausencia de histopatología. |

---

# 7. Módulo 3 — Confirmación diagnóstica, consulta, histología y grado: V25-V28

## 7.1 Propósito

Este módulo valida la institución donde se confirmó el diagnóstico, la primera consulta con médico tratante, la histología tumoral y el grado de diferenciación.

## 7.2 Variables

| Variable | Nombre funcional | Tipo | Regla principal |
|---|---|---|---|
| V25 | Código de IPS de confirmación diagnóstica | Código REPS / comodín | 12 dígitos, `96` o `99`. |
| V26 | Fecha de primera consulta con médico tratante | Fecha | Fecha real o `1800-01-01`. |
| V27 | Histología del tumor | Catálogo | Catálogo V27; depende de V21 y V17 en casos específicos. |
| V28 | Grado de diferenciación | Catálogo | Catálogo V28; depende de V21 y tipo tumoral. |

## 7.3 Cruces hacia variables anteriores

| Cruce | Regla funcional | Severidad |
|---|---|---|
| V26 ↔ V18 | V26 anterior a V18 es clínicamente revisable. | Advertencia |
| V27 ↔ V21 | Si V21=7, V27 debe ser 98. | Error |
| V28 ↔ V21 | Si V21=7, V28 debe ser 98. | Error |
| V27 ↔ V17 | Algunas histologías solo aplican para ciertos diagnósticos, por ejemplo célula pequeña en pulmón. | Error/Advertencia según caso |
| V28 ↔ V27/V17 | El grado depende del tipo histológico y del tumor. | Error/Advertencia según caso |

## 7.4 Dependencias por catálogos externos

| Variable | Catálogo externo | Estado |
|---|---|---|
| V25 | REPS | Validación completa depende de base externa. |
| V27 | Catálogo de histología CAC | Catálogo operativo interno cargado parcialmente en módulo. |
| V28 | Catálogo de grado CAC | Catálogo operativo interno cargado parcialmente en módulo. |

---

# 8. Módulo 4 — Primera estadificación: V29

## 8.1 Propósito

Este módulo valida la primera estadificación del tumor sólido, usando el diagnóstico CIE-10 reportado en V17 como variable principal de trazabilidad.

## 8.2 Variable

| Variable | Nombre funcional | Tipo | Regla principal |
|---|---|---|---|
| V29 | Primera estadificación basada en TNM, FIGO u otras compatibles | Catálogo numérico | Debe pertenecer al catálogo general y ser compatible con V17. |

## 8.3 Cruces principales

| Cruce | Regla funcional | Severidad |
|---|---|---|
| V17 ↔ V29 | Si V17 inicia con D, V29 debe ser 0. | Error |
| V17 ↔ V29 | El catálogo específico de V29 depende del tipo de cáncer. | Error |
| V29=99 | Estadificación desconocida permitida, pero requiere revisión. | Advertencia |
| V29 opciones especiales | Algunas opciones solo aplican a tipos específicos de cáncer. | Advertencia/Error según agrupador |

## 8.4 Agrupadores ya contemplados

El módulo maneja compatibilidad de V29 con agrupadores como:

- Mama.
- Gástrico.
- Próstata.
- Pulmón.
- Melanoma.
- Colon y recto.
- Anal.
- Cérvix.
- Carcinomas in situ por CIE-10 iniciado en D.

---

# 9. Módulo 5 — Fecha de estadificación y HER2: V30-V33

## 9.1 Propósito

Este módulo valida la fecha de estadificación inicial y las variables HER2, dependientes principalmente de V17, V18, V29 y V31.

## 9.2 Variables

| Variable | Nombre funcional | Tipo | Regla principal |
|---|---|---|---|
| V30 | Fecha de estadificación | Fecha | Fecha real, `1800-01-01` o `1845-01-01` según aplicabilidad. |
| V31 | HER2 realizado antes del inicio del tratamiento | Catálogo | Depende de si V17 corresponde a cáncer de mama. |
| V32 | Fecha de prueba HER2 | Fecha | Depende de V17 y V31. |
| V33 | Resultado HER2 | Catálogo | Depende de V17, V31 y V32. |

## 9.3 Cruces V30

| Cruce | Regla funcional | Severidad |
|---|---|---|
| V30 ↔ V18 | V30 no debe ser anterior a V18 si ambas son fechas reales. | Error |
| V30 ↔ V29 | Si V29 tiene estadificación real, V30 debe tener fecha real o desconocida. | Advertencia |
| V30=1845-01-01 | Solo debe usarse cuando la estadificación no aplica. | Advertencia |

## 9.4 Cruces HER2

| Cruce | Regla funcional | Severidad |
|---|---|---|
| V17 ↔ V31 | Si no es cáncer de mama, V31 debe ser 98. | Error |
| V17 ↔ V31 | Si es cáncer de mama invasivo, V31 no debe ser 98 ni 97. | Error |
| V17 ↔ V31 | Si es cáncer de mama in situ, V31 puede ser 97 cuando HER2 no aplica. | Error/Advertencia según caso |
| V31 ↔ V32 | Si HER2 se realizó, V32 debe tener fecha real o `1800-01-01`. | Error |
| V31 ↔ V33 | Si HER2 se realizó, V33 debe tener resultado real o 99. | Error |
| V17 ↔ V32 | Si no es cáncer de mama, V32 debe ser `1845-01-01`. | Error |
| V17 ↔ V33 | Si no es cáncer de mama, V33 debe ser 98. | Error |

## 9.5 Comodines HER2

| Variable | Comodín | Significado |
|---|---|---|
| V32 | `1800-01-01` | Fecha desconocida. |
| V32 | `1840-01-01` | No aplica por cáncer de mama in situ. |
| V32 | `1845-01-01` | No aplica porque no es cáncer de mama o porque HER2 no se realizó antes del tratamiento. |
| V31 | `97` | No aplica por cáncer de mama in situ. |
| V31 | `98` | No aplica porque no es cáncer de mama. |
| V31 | `99` | Desconocido. |
| V33 | `97` | No aplica por cáncer de mama in situ. |
| V33 | `98` | No aplica porque no es cáncer de mama o no se realizó HER2. |
| V33 | `99` | Desconocido. |

---

# 10. Módulo 6 — Dukes para cáncer colorrectal: V34-V35

## 10.1 Propósito

Este módulo valida la estadificación de Dukes y la fecha asociada cuando el diagnóstico corresponde a cáncer colorrectal.

## 10.2 Variables

| Variable | Nombre funcional | Tipo | Regla principal |
|---|---|---|---|
| V34 | Estadificación de Dukes para cáncer colorrectal | Catálogo | Depende de V17. |
| V35 | Fecha de Dukes | Fecha | Depende de V34 y se cruza con V18. |

## 10.3 Catálogo V34

| Código | Significado |
|---|---|
| 1 | A |
| 2 | B |
| 3 | C |
| 4 | D |
| 98 | No aplica: no es cáncer colorrectal |
| 99 | Es cáncer colorrectal, pero no hay información de Dukes en historia clínica |

## 10.4 Cruces

| Cruce | Regla funcional | Severidad |
|---|---|---|
| V17 ↔ V34 | Si V17 es colorrectal, V34 no debe ser 98. | Error |
| V17 ↔ V34 | Si V17 no es colorrectal, V34 debe ser 98. | Error |
| V17 ↔ V34 | Si V17 no es colorrectal, V34 no debe ser 99. | Error |
| V34 ↔ V35 | Si V34 es 1,2,3,4, V35 debe ser fecha real. | Error |
| V34 ↔ V35 | Si V34 es 98 o 99, V35 debe ser `1845-01-01`. | Error |
| V18 ↔ V35 | Si Dukes es real, V35 anterior a V18 requiere revisión. | Advertencia |

## 10.5 Alcance operativo actual

El módulo maneja como colorrectal operativo:

- C180-C189.
- C19X.
- C20X.

Por decisión funcional registrada en el módulo, no se incluye C21 anal dentro de Dukes hasta que el instructivo lo indique expresamente.

---

# 11. Variables núcleo de trazabilidad

## 11.1 V17 como variable pivote

V17 es una variable pivote del sistema porque define:

| Variable dependiente | Relación |
|---|---|
| V29 | Catálogo de estadificación compatible. |
| V31-V33 | Aplicabilidad de HER2 para cáncer de mama. |
| V34-V35 | Aplicabilidad de Dukes para cáncer colorrectal. |
| V8 | Coherencia por sexo cuando el catálogo CIE-10 lo exige. |
| V7/V18 | Coherencia por edad cuando el catálogo CIE-10 lo exige. |

## 11.2 V18 como fecha clínica base

V18 es la fecha clínica principal del diagnóstico y sirve para revisar:

| Variable dependiente | Relación |
|---|---|
| V19 | Remisión no debería ser posterior al diagnóstico. |
| V20 | Ingreso diagnóstico no debería ser posterior al diagnóstico. |
| V23 | Muestra no debería ser posterior al diagnóstico cuando confirma el caso. |
| V24 | En diagnóstico histopatológico, normalmente coincide con V18. |
| V26 | Primera consulta previa al diagnóstico requiere revisión. |
| V30 | Fecha de estadificación no debe ser anterior a V18. |
| V35 | Fecha de Dukes no debería ser anterior a V18 cuando Dukes es real. |

## 11.3 V21 como variable pivote histopatológica

V21 define si hubo histopatología o si el diagnóstico fue clínico exclusivamente.

| Variable dependiente | Relación |
|---|---|
| V22 | Motivo sin histopatología. |
| V23 | Si V21=7, debe ser `1845-01-01`. |
| V24 | Si V21=7, debe ser `1845-01-01`. |
| V27 | Si V21=7, debe ser 98. |
| V28 | Si V21=7, debe ser 98. |

## 11.4 V29 como variable pivote de estadificación

V29 define la primera estadificación y alimenta:

| Variable dependiente | Relación |
|---|---|
| V30 | Fecha en que se realizó o documentó la estadificación. |

---

# 12. Catálogos externos y validaciones pendientes

Algunas variables no deben bloquearse completamente hasta tener catálogos oficiales cargados.

| Variable | Catálogo requerido | Validación actual recomendada |
|---|---|---|
| V9 | CIUO | Formato de 4 dígitos y comodines. |
| V11 | EAPB / DANE | Obligatorio; existencia pendiente. |
| V14 | DIVIPOLA | Numérico de 5 dígitos; existencia pendiente. |
| V25 | REPS | Formato y longitud; existencia/habilitación pendiente. |
| V17 | CIE-10 CAC | Validar contra catálogo operativo local cuando esté cargado. |

---

# 13. Reglas excluidas por decisión funcional

| Regla | Estado |
|---|---|
| V7 contra fecha de corte 2025-05-05 | Excluida por decisión del cliente. No implementar. |
| Validación completa de CIUO, EAPB, DIVIPOLA y REPS sin bases oficiales | No implementar como error fuerte. |

---

# 14. Uso recomendado de esta arquitectura

Este documento debe usarse antes de modificar reglas en cualquier módulo.

Flujo recomendado:

```text
1. Revisar la variable en esta arquitectura.
2. Confirmar sus dependencias hacia atrás y hacia adelante.
3. Revisar el instructivo oficial.
4. Revisar el archivo JavaScript del módulo.
5. Clasificar la regla:
   - Mantener
   - Ajustar descripción
   - Cambiar severidad
   - Agregar
   - No implementar todavía
   - Excluida por decisión funcional
6. Generar Excel de prueba.
7. Solo después actualizar código.
```

---

# 15. Estado actual de arquitectura V1-V35

| Bloque | Estado |
|---|---|
| V1-V16 | Arquitectura definida y módulo auditado funcionalmente. |
| V17-V24 | Arquitectura definida; pendiente auditoría completa de reglas faltantes. |
| V25-V28 | Arquitectura definida; pendiente auditoría completa de reglas faltantes. |
| V29 | Arquitectura definida; pendiente revisión de compatibilidad completa por agrupadores. |
| V30-V33 | Arquitectura definida; pendiente auditoría completa de reglas faltantes. |
| V34-V35 | Arquitectura definida; reglas principales ya trabajadas. |

---

## 16. Nota final

Esta arquitectura no significa que todas las reglas de negocio faltantes ya estén identificadas.

La arquitectura es el mapa base.  
La auditoría de reglas faltantes debe hacerse módulo por módulo comparando:

```text
Instructivo oficial ↔ Matriz funcional ↔ Código real ↔ Excel de pruebas
```

Solo después de esa comparación se debe modificar el código.
