# Arquitectura Funcional de Variables V1-V52 — Validador CAC Cohorte Cáncer

**Proyecto:** Validador CAC — Cohorte Cáncer  
**Documento:** Arquitectura funcional de variables y trazabilidad  
**Alcance actual:** Variables V1 a V52  
**Estado:** Base arquitectónica para auditoría de reglas de negocio  
**Tecnología del validador:** HTML, CSS y JavaScript local  
**Propósito:** Documentar cómo se organizan las variables, qué módulos las validan y qué dependencias existen entre ellas.

---

## 1. Objetivo del documento

Este documento define la arquitectura funcional de las variables implementadas hasta la V47 y la arquitectura funcional inicial del bloque V48-V52 en el Validador CAC.

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

El avance también debe ser progresivo en las pruebas: cada nueva variable debe agregarse sin impedir que se carguen y validen los archivos de prueba de variables anteriores. Los archivos acumulativos antiguos deben seguir funcionando con el alcance que traen; por ejemplo, un Excel hasta V47 no debe exigir V48-V52, y un Excel hasta V52 debe incluir V1-V52 limpias y coherentes.

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
| Módulo 7 | V36-V40 | `src/validaciones/reglas/modulo7.js` | Ann Arbor/Lugano, Gleason, clasificación de riesgo, fecha de riesgo y objetivo del tratamiento inicial. |
| Módulo 8 | V41-V44 | `src/validaciones/reglas/modulo8.js` | Intervención médica durante el periodo y antecedentes de otro cáncer primario. |
| Módulo 9 | V45-V47 | `src/validaciones/reglas/modulo9.js` | Terapia sistémica e intratecal en el periodo de reporte; variable de control V45, fases de quimioterapia V46 y ciclos V47. |
| Módulo 10 | V48-V52 | `src/validaciones/reglas/modulo10.js` | Primer o único esquema de quimioterapia o terapia sistémica: ubicación temporal, fecha de inicio, número de IPS e IPS que suministran el esquema. |

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
V36-V40  → Ann Arbor/Lugano, Gleason, riesgo, fecha de riesgo y objetivo inicial.
V41-V44  → Intervención médica y antecedente/concurrencia de otro cáncer primario.
V45-V47  → Terapia sistémica e intratecal en el periodo de reporte: control de terapia, fases de quimioterapia y ciclos administrados.
V48-V52  → Primer o único esquema de terapia sistémica: ubicación temporal, fecha de inicio, número de IPS e IPS suministradoras.
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



---

# 11. Módulo 7 — Estadificación especial, riesgo y objetivo inicial: V36-V40

## 11.1 Propósito

Este módulo valida variables clínicas posteriores a la estadificación general: Ann Arbor/Lugano, Gleason, clasificación de riesgo, fecha de clasificación de riesgo y objetivo o intención del tratamiento médico inicial.

## 11.2 Variables

| Variable | Nombre funcional | Tipo | Regla principal |
|---|---|---|---|
| V36 | Estadificación clínica Ann Arbor/Lugano | Catálogo | Aplica para Linfoma Hodgkin, Linfoma No Hodgkin y Mieloma múltiple. |
| V37 | Clasificación Gleason | Catálogo | Aplica para cáncer de próstata. |
| V38 | Clasificación del riesgo | Catálogo | Depende del diagnóstico en V17 y tiene subcatálogos por tipo de cáncer. |
| V39 | Fecha de clasificación de riesgo | Fecha | Depende de V38 y se cruza con V18. |
| V40 | Objetivo o intención del tratamiento médico inicial | Catálogo | Catálogo cerrado 1, 2, 3, 99. |

## 11.3 Cruces principales

| Cruce | Regla funcional | Severidad |
|---|---|---|
| V17 ↔ V36 | Si V17 corresponde a linfoma o mieloma múltiple, V36 debe tener estadio real o 99. | Error/Advertencia |
| V17 ↔ V37 | Si V17 corresponde a próstata, V37 debe tener Gleason, diagnóstico clínico o 99 según soporte. | Error/Advertencia |
| V21 ↔ V37 | Si V21=7 diagnóstico clínico exclusivamente, V37 debe ser 97. | Error |
| V17 ↔ V38 | El catálogo de riesgo depende del diagnóstico. | Error |
| V7/V18 ↔ V38 | La edad al diagnóstico permite identificar advertencias pediátricas pendientes de catálogo operativo. | Advertencia |
| V38 ↔ V39 | Si V38=98, V39 debe ser 1845-01-01. Si V38 aplica, V39 no debe ser 1845-01-01. | Error |
| V18 ↔ V39 | La fecha de clasificación de riesgo no debe ser anterior a la fecha de diagnóstico cuando ambas son reales. | Error |

## 11.4 Estado funcional cerrado

| Variable | Estado | Versión validada |
|---|---|---|
| V36 | Cerrada | Sprint 3A Módulo 7 |
| V37 | Cerrada | Sprint 3A Módulo 7 |
| V38 | Cerrada | `sprint-3a-v38-riesgo-subcatalogos-03` |
| V39 | Probada/cerrada | `sprint-3a-v39-fecha-riesgo-01` |
| V40 | Cerrada | `sprint-3a-v40-objetivo-tratamiento-01` |

## 11.5 Decisiones funcionales aprobadas

| Tema | Decisión |
|---|---|
| V38 pediátrica | No convertir en error fuerte cuando el catálogo pediátrico no está parametrizado; manejar como advertencia profesional. |
| V39 y V128 futura | Si V39=1800-01-01 con V18 desde 2024-11-01, dejar advertencia porque la validación completa depende de V128, aún no implementada. |
| Variables futuras | Si una regla depende de una variable futura no implementada, no forzar error prematuro. Usar advertencia o trazabilidad pendiente. |

---

# 12. Módulo 8 — Intervención médica y antecedentes de otro cáncer primario: V41-V44

## 12.1 Propósito

Este módulo valida la intervención médica durante el periodo de reporte y la existencia de antecedente o concurrencia de otro cáncer primario.

## 12.2 Variables

| Variable | Nombre funcional | Tipo | Regla principal |
|---|---|---|---|
| V41 | Intervención médica durante el periodo de reporte | Catálogo cerrado | Debe estar en catálogo 1,2,3,4,5,6,99. |
| V42 | Antecedente de otro cáncer primario | Catálogo cerrado | 1=sí, 2=no, 99=desconocido. |
| V43 | Fecha de diagnóstico del otro cáncer primario | Fecha | Depende de V42. |
| V44 | Tipo CIE-10 del cáncer antecedente o concurrente | Código CIE-10 / 99 | Depende de V42 y se cruza con V17. |

## 12.3 V41 — Intervención médica durante el periodo de reporte

Catálogo:

| Código | Significado |
|---|---|
| 1 | Observación previa a tratamiento. |
| 2 | Tratamiento curativo o paliativo dirigido al cáncer inicial o por recaída. |
| 3 | Observación o seguimiento oncológico luego de tratamiento inicial. |
| 4 | Opciones 1 y 2 únicamente. |
| 5 | Opciones 2 y 3 únicamente. |
| 6 | Opciones 1, 2 y 3. |
| 99 | Sin intervención en el periodo. |

Reglas base:

| Código sugerido | Regla | Severidad |
|---|---|---|
| V41-ERROR-001 | V41 vacía. | Error |
| V41-ERROR-002 | V41 fuera del catálogo permitido. | Error |
| V41-ADVERTENCIA-001 | V41=99 en paciente con evidencia de atención/intervención en el periodo, si esa evidencia existe en variables posteriores. | Advertencia pendiente |

Nota: V41=99 no significa desconocido. Significa sin intervención en el periodo. No debe tratarse como advertencia por defecto.

## 12.4 V42 — Antecedente de otro cáncer primario

Catálogo:

| Código | Significado |
|---|---|
| 1 | Sí tiene o tuvo otro cáncer primario diferente al reportado. |
| 2 | No. |
| 99 | Desconocido. |

Reglas base:

| Código sugerido | Regla | Severidad |
|---|---|---|
| V42-ERROR-001 | V42 vacía. | Error |
| V42-ERROR-002 | V42 fuera del catálogo permitido. | Error |
| V42-ADVERTENCIA-001 | V42=99, antecedente desconocido. | Advertencia |

## 12.5 V43 — Fecha de diagnóstico del otro cáncer primario

Comodines:

| Valor | Significado |
|---|---|
| 1800-01-01 | Desconocido. |
| 1845-01-01 | No aplica: no ha tenido otro cáncer primario. |

Cruces:

| Cruce | Regla funcional | Severidad |
|---|---|---|
| V42=1 ↔ V43 | Si hay otro cáncer primario, V43 debe ser fecha real o 1800-01-01. | Error/Advertencia |
| V42=2 ↔ V43 | Si no hay otro cáncer primario, V43 debe ser 1845-01-01. | Error |
| V42=99 ↔ V43 | Si el antecedente es desconocido, V43 no debe forzarse como error fuerte salvo vacío o formato inválido. | Advertencia/pendiente |
| V43 | No debe ser fecha futura. | Error |
| V43 ↔ V18 | V43 puede ser anterior, igual o posterior a V18 porque puede ser antecedente o concurrente. | No error |

## 12.6 V44 — Tipo CIE-10 del cáncer antecedente o concurrente

Comodín:

| Valor | Significado |
|---|---|
| 99 | No aplica: no hay antecedente ni concurrencia de otro cáncer primario. |

Cruces:

| Cruce | Regla funcional | Severidad |
|---|---|---|
| V42=1 ↔ V44 | Si hay otro cáncer primario, V44 debe contener un CIE-10 válido. | Error |
| V42=2 ↔ V44 | Si no hay otro cáncer primario, V44 debe ser 99. | Error |
| V42=99 ↔ V44 | Si el antecedente es desconocido, V44 debería ser 99 o generar advertencia si trae dato inconsistente. | Advertencia |
| V44 ↔ Catálogo CIE-10 | V44 debe existir en el catálogo operativo CIE-10 SISCAC cuando no sea 99. | Error |
| V44 ↔ V17 | Si V44 es igual a V17, puede requerir revisión por posible segundo primario del mismo agrupador, pero no debe ser error automático si el instructivo permite casos como mama bilateral. | Advertencia |

## 12.7 Decisiones funcionales preliminares para V41-V44

| Tema | Decisión recomendada |
|---|---|
| V41=99 | No es desconocido; es sin intervención. No marcar como advertencia salvo que variables posteriores evidencien tratamiento. |
| V42=99 | Advertencia, no error, porque el instructivo permite desconocido. |
| V43 con V42=99 | No forzar error fuerte mientras no se defina criterio más específico; priorizar advertencia si hay inconsistencia. |
| V44 igual a V17 | No error automático. Puede ser advertencia si se requiere revisar soporte de segundo primario del mismo agrupador. |
| CIE-10 completo | Validar contra catálogo operativo local si está cargado. Si el catálogo no está completo, no convertir ausencias en error fuerte sin confirmación. |



---

# 13. Módulo 9 — Terapia sistémica e intratecal en el periodo de reporte: V45-V47

## 13.1 Propósito

Este módulo inicia el bloque de información específica de terapia sistémica e intratecal en el periodo de reporte actual.

Su propósito es validar si el usuario recibió quimioterapia u otra terapia sistémica, cuántas fases de quimioterapia aplican en cánceres hematolinfáticos específicos y cuántos ciclos fueron iniciados y administrados durante el periodo.

Este bloque se cierra funcionalmente hasta V47. V45 actúa como variable de control para las variables posteriores de terapia sistémica. Si V45 es `98`, las variables posteriores del bloque deben registrar No Aplica según el comodín definido para cada variable. Sin embargo, las reglas contra variables futuras deben activarse progresivamente solo cuando esas variables estén implementadas.

## 13.2 Variables

| Variable | Nombre funcional | Tipo | Regla principal |
|---|---|---|---|
| V45 | Recibió quimioterapia u otra terapia sistémica en el periodo | Catálogo cerrado | Debe ser `1` o `98`. Controla el bloque V46-V73. |
| V46 | Número de fases de quimioterapia recibidas en el periodo | Numérico / comodín | Aplica solo para CIE-10 hematolinfáticos específicos: C835, C910, C920, C924, C925. |
| V46.1 | Prefase o citorreducción inicial | Catálogo cerrado | Aplica solo para C910 y C835. |
| V46.2 | Inducción | Catálogo cerrado | Aplica para C835, C910, C920, C924 y C925. |
| V46.3 | Intensificación | Catálogo cerrado | Aplica para C835, C910, C920, C924 y C925. |
| V46.4 | Consolidación | Catálogo cerrado | Aplica para C835, C910, C920, C924 y C925. |
| V46.5 | Reinducción | Catálogo cerrado | Aplica solo para C910 y C835. |
| V46.6 | Mantenimiento | Catálogo cerrado | Aplica para C835, C910, C920, C924 y C925. |
| V46.7 | Mantenimiento largo o final | Catálogo cerrado | Aplica para C835, C910, C920, C924 y C925. |
| V46.8 | Otra fase de quimioterapia diferente | Catálogo cerrado | Aplica para C835, C910, C920, C924 y C925. |
| V47 | Número de ciclos iniciados y administrados en el periodo | Numérico / comodín | Aplica para todos los cánceres cuando V45=1. |

## 13.3 V45 — Recibió quimioterapia u otra terapia sistémica

Catálogo:

| Código | Significado |
|---|---|
| 1 | Sí recibió quimioterapia u otra terapia sistémica dentro del periodo de reporte. |
| 98 | No aplica: no está indicada esta terapia. |

Alcance funcional:

- La terapia sistémica incluye quimioterapia, hormonoterapia, inmunoterapia y terapia dirigida.
- Solo aplican tratamientos suministrados dentro del periodo de reporte.
- No aplican tratamientos propuestos pero no administrados.
- Si el paciente tiene dos o más cánceres primarios, se debe registrar la terapia correspondiente al cáncer reportado en V17 o a sus metástasis.
- Si V45=`98`, se debe verificar que las variables V46 a V73 registren No Aplica según corresponda.

Reglas base:

| Código sugerido | Regla | Severidad |
|---|---|---|
| V45-ERROR-001 | V45 vacía. | Error |
| V45-ERROR-002 | V45 fuera del catálogo permitido `1`, `98`. | Error |
| V45-ADVERTENCIA-001 | V45=98, pero variables posteriores o soportes del periodo evidencian administración de terapia sistémica. | Advertencia pendiente hasta implementar variables posteriores del bloque. |

Cruces:

| Cruce | Regla funcional | Severidad |
|---|---|---|
| V45 ↔ V17 | La terapia registrada debe corresponder al cáncer reportado en V17 o a sus metástasis. | Trazabilidad / advertencia cuando exista evidencia posterior. |
| V45=98 ↔ V46-V73 | Las variables posteriores del bloque deben registrar No Aplica según el comodín de cada variable. | Error cuando la variable posterior esté implementada. |

Decisión operativa:

Mientras solo esté implementada V45 o parte del bloque, no se deben generar errores contra variables futuras no implementadas. La coherencia V45 ↔ V46-V73 debe activarse progresivamente a medida que existan esas variables en el validador.

## 13.4 V46 — Número de fases de quimioterapia recibidas

Aplica únicamente para cánceres hematolinfáticos con los siguientes CIE-10:

| CIE-10 | Diagnóstico |
|---|---|
| C835 | Linfoma no Hodgkin linfoblástico difuso. |
| C910 | Leucemia linfoblástica aguda. |
| C920 | Leucemia mieloide aguda. |
| C924 | Leucemia promielocítica aguda. |
| C925 | Leucemia mielomonocítica aguda. |

Comodines:

| Valor | Cuándo aplica |
|---|---|
| 0 | Es uno de los cánceres hematolinfáticos enunciados y en V45 se respondió `98`. |
| 98 | No aplica: es tumor sólido o cáncer diferente a los CIE-10 enunciados. |

Reglas base:

| Código sugerido | Regla | Severidad |
|---|---|---|
| V46-ERROR-001 | V46 vacía. | Error |
| V46-ERROR-002 | V46 no es numérica ni corresponde a comodín permitido. | Error |
| V46-ERROR-003 | V46=98 en CIE-10 hematolinfático enunciado con V45=1. | Error |
| V46-ERROR-004 | V46 diferente de 98 cuando V17 no pertenece a C835, C910, C920, C924 o C925. | Error |
| V46-ERROR-005 | V45=98 y V46 no corresponde a `0` para hematolinfático aplicable o `98` para no aplicable. | Error |

Cruces:

| Cruce | Regla funcional | Severidad |
|---|---|---|
| V17 ↔ V46 | V17 define si V46 aplica como número de fases o debe ser 98. | Error |
| V45 ↔ V46 | Si V45=98, V46 debe usar el comodín correspondiente. | Error |
| V46 ↔ V46.1-V46.8 | El número de fases debe ser coherente con las fases específicas registradas. | Pendiente / progresivo. |

## 13.5 V46.1 a V46.8 — Fases específicas de quimioterapia

Catálogo común:

| Código | Significado |
|---|---|
| 1 | Sí recibió esta fase. |
| 2 | No recibió esta fase; aplica solo para los CIE-10 enunciados. |
| 97 | No aplica: no es leucemia linfoide o mieloide aguda ni linfoma linfoblástico. |

Subfases:

| Variable | Fase | Restricción adicional |
|---|---|---|
| V46.1 | Prefase o citorreducción inicial | Solo C910 y C835. |
| V46.2 | Inducción | C835, C910, C920, C924 y C925. |
| V46.3 | Intensificación | C835, C910, C920, C924 y C925. |
| V46.4 | Consolidación | C835, C910, C920, C924 y C925. |
| V46.5 | Reinducción | Solo C910 y C835. |
| V46.6 | Mantenimiento | C835, C910, C920, C924 y C925. |
| V46.7 | Mantenimiento largo o final | C835, C910, C920, C924 y C925. |
| V46.8 | Otra fase diferente a las anteriores | C835, C910, C920, C924 y C925. |

Reglas base:

| Código sugerido | Regla | Severidad |
|---|---|---|
| V46X-ERROR-001 | Subfase vacía. | Error |
| V46X-ERROR-002 | Subfase fuera del catálogo `1`, `2`, `97`. | Error |
| V46X-ERROR-003 | Subfase con `1` o `2` cuando V17 no pertenece a los CIE-10 aplicables. | Error |
| V46X-ERROR-004 | V46.1 o V46.5 usadas como `1` en C920, C924 o C925, donde no aplican por restricción adicional. | Error |
| V46X-ADVERTENCIA-001 | Todas las fases están en `2` cuando V45=1. | Advertencia |

Decisión funcional:

El paciente puede haber recibido más de una fase durante el mismo periodo, por lo tanto no debe imponerse exclusividad entre V46.1 a V46.8.

## 13.6 V47 — Número de ciclos iniciados y administrados en el periodo

Aplica para todos los cánceres cuando V45=`1`.

Comodín:

| Valor | Cuándo aplica |
|---|---|
| 98 | No aplica o no recibió terapia, aunque fue formulada; en V45 se seleccionó `98`. |

Reglas funcionales:

- Registrar el número de ciclos iniciados en el periodo de reporte actual.
- Pueden ser ciclos en diferentes esquemas de manejo.
- Para tumores sólidos, el ciclo corresponde a administraciones del esquema con periodo de descanso según historia clínica.
- Para cánceres hematolinfáticos, el ciclo se define por el protocolo que recibe el paciente.
- Para hormonoterapias orales sin periodos de descanso, registrar `1`.
- Para terapias hormonales intramusculares o subcutáneas, cada aplicación cuenta como un ciclo.
- Cada administración de medicamento vía intratecal cuenta como un ciclo.

Reglas base:

| Código sugerido | Regla | Severidad |
|---|---|---|
| V47-ERROR-001 | V47 vacía. | Error |
| V47-ERROR-002 | V47 no es numérica ni corresponde al comodín `98`. | Error |
| V47-ERROR-003 | V47=98 cuando V45=1. | Error |
| V47-ERROR-004 | V47 registra cero o un número negativo. | Error |
| V47-ERROR-005 | V45=98, pero V47 registra un número de ciclos diferente de 98. | Error |
| V47-ADVERTENCIA-001 | Número de ciclos inusualmente alto o bajo para el tipo de cáncer y esquema, cuando existan criterios clínicos parametrizados. | No implementada; pendiente de umbrales confiables. |

Cruces:

| Cruce | Regla funcional | Severidad |
|---|---|---|
| V45 ↔ V47 | Si V45=1, V47 debe registrar número de ciclos. Si V45=98, V47 debe ser 98. | Error |
| V17 ↔ V47 | La interpretación de ciclo puede cambiar por tumor sólido, hematolinfático o tipo de terapia. | Trazabilidad. |

## 13.7 Dependencias del Módulo 9

| Variable pivote | Variables dependientes | Uso |
|---|---|---|
| V17 | V46, V46.1-V46.8, V47 | Define aplicabilidad hematolinfática y contexto clínico. |
| V45 | V46-V73 | Controla si el bloque debe registrar terapia real o No Aplica. |
| V46 | V46.1-V46.8 | Resume número de fases y debe ser coherente con fases específicas. |

## 13.8 Estado funcional del Módulo 9

| Bloque | Estado recomendado |
|---|---|
| V45 | Cerrada funcionalmente en Sprint 3C · Módulo 9. |
| V46-V46.8 | Cerradas funcionalmente en Sprint 3C · Módulo 9. |
| V47 | Cerrada funcionalmente en Sprint 3C · Módulo 9. |
| V48-V52 | Pasa a Sprint 3D · Módulo 10. |
| V53-V53.9 | Pendiente de lectura y arquitectura específica en un módulo posterior. |

## 13.9 Decisiones funcionales preliminares para V45-V47

| Tema | Decisión recomendada |
|---|---|
| V45=98 contra variables posteriores | No forzar contra variables futuras aún no implementadas. Activar progresivamente por módulo. |
| V46 hematolinfáticos | Usar CIE-10 C835, C910, C920, C924 y C925 como catálogo operativo cerrado para aplicabilidad. |
| V46.1 y V46.5 | Solo aplican para C910 y C835; no para C920, C924 ni C925. |
| Todas las fases en 2 con V45=1 | Advertencia, no error, porque puede requerir revisión clínica y soporte. |
| V47 ciclos altos/bajos | No parametrizar todavía sin umbrales clínicos confiables. Dejar como advertencia pendiente. |


# 14. Módulo 10 — Primer o único esquema de quimioterapia o terapia sistémica: V48-V52

## 14.1 Propósito

Este módulo continúa el bloque de terapia sistémica después de V47 y documenta la información del primer o único esquema de quimioterapia o terapia sistémica recibido en el periodo de reporte.

El bloque cubre:

- La ubicación temporal del esquema dentro del manejo oncológico.
- La fecha de inicio del esquema.
- El número de IPS que suministran el esquema.
- El código de la IPS1 y de la IPS2 que suministran el esquema.

La variable de control principal sigue siendo V45.

Si V45=`1`, el paciente recibió quimioterapia u otra terapia sistémica en el periodo y las variables V48-V52 deben diligenciarse con datos reales según corresponda.

Si V45=`98`, las variables V48-V52 deben usar el comodín No Aplica definido por el instructivo.

## 14.2 Variables

| Variable | Nombre funcional | Tipo | Regla principal |
|---|---|---|---|
| V48 | Ubicación temporal del primer o único esquema en relación con el manejo oncológico | Catálogo cerrado / comodín | Depende de V45. Si V45=1, debe registrar una ubicación temporal válida. Si V45=98, debe ser 98. |
| V49 | Fecha de inicio del primer o único esquema | Fecha / comodín | Formato `AAAA-MM-DD`. Si solo se conoce año y mes, usar día 15. Si V45=98, debe ser `1845-01-01`. |
| V50 | Número de IPS que suministran el primer o único esquema | Numérico / comodín | Si V45=1, debe registrar el número de IPS que suministran el esquema. Si V45=98, debe ser 98. |
| V51 | Código de la IPS1 que suministra el primer o único esquema | Código REPS / comodín | Código de habilitación de IPS de 12 dígitos, `96` si fue suministrada fuera del país o `98` si no aplica por V45=98. |
| V52 | Código de la IPS2 que suministra el primer o único esquema | Código REPS / comodín | Código de habilitación de IPS de 12 dígitos o `98` si no aplica. |

## 14.3 V48 — Ubicación temporal del primer o único esquema

Catálogo:

| Código | Significado |
|---|---|
| 1 | Neoadyuvancia: manejo inicial prequirúrgico. |
| 2 | Tratamiento inicial curativo sin cirugía sugerida. |
| 3 | Adyuvancia: manejo inicial postquirúrgico. |
| 11 | Manejo de recaída. |
| 12 | Manejo de enfermedad metastásica. |
| 13 | Manejo paliativo, sin manejo de recaída ni enfermedad metastásica. |
| 98 | No aplica: en V45 se seleccionó 98. |

Reglas base:

| Código sugerido | Regla | Severidad |
|---|---|---|
| V48-ERROR-001 | V48 vacía. | Error |
| V48-ERROR-002 | V48 fuera del catálogo permitido. | Error |
| V48-ERROR-003 | V45=1, pero V48=98. | Error |
| V48-ERROR-004 | V45=98, pero V48 registra una ubicación temporal diferente de 98. | Error |

Cruces:

| Cruce | Regla funcional | Severidad |
|---|---|---|
| V45 ↔ V48 | Si V45=1, V48 debe registrar una ubicación temporal real del esquema. Si V45=98, V48 debe ser 98. | Error |
| V48 ↔ soporte clínico | La opción seleccionada debe corresponder al contexto del manejo oncológico descrito en historia clínica. | Trazabilidad. |

Decisión funcional:

No se deben inferir errores por V17 sin reglas explícitas adicionales. Por ejemplo, V48=2 puede ser frecuente en leucemias o linfomas, pero el instructivo lo presenta como ejemplo, no como restricción exclusiva.

## 14.4 V49 — Fecha de inicio del primer o único esquema

Comodines:

| Valor | Significado |
|---|---|
| `1845-01-01` | No aplica: en V45 se seleccionó 98. |

Reglas funcionales:

- Registrar la fecha de inicio del primer o único esquema de quimioterapia o terapia sistémica.
- El esquema pudo haber iniciado antes del periodo de reporte.
- Si solo se conoce el año y el mes, registrar el día 15.
- No se debe marcar como error que V49 sea anterior al periodo de reporte, porque el instructivo lo permite.

Reglas base:

| Código sugerido | Regla | Severidad |
|---|---|---|
| V49-ERROR-001 | V49 vacía. | Error |
| V49-ERROR-002 | V49 no tiene formato válido `AAAA-MM-DD` o no corresponde a una fecha real. | Error |
| V49-ERROR-003 | V45=1, pero V49=`1845-01-01`. | Error |
| V49-ERROR-004 | V45=98, pero V49 es diferente de `1845-01-01`. | Error |
| V49-ADVERTENCIA-001 | V49 es anterior a V18. | Advertencia pendiente; puede ser clínicamente posible solo si hay soporte, no convertir en error sin criterio oficial. |

Cruces:

| Cruce | Regla funcional | Severidad |
|---|---|---|
| V45 ↔ V49 | Si recibió terapia sistémica, V49 debe registrar fecha real. Si V45=98, V49 debe ser `1845-01-01`. | Error |
| V49 ↔ periodo de reporte | Puede ser anterior al periodo si el esquema inició antes y continúa en el periodo actual. | No error. |
| V18 ↔ V49 | La fecha de inicio del esquema normalmente debe ser posterior o igual al diagnóstico; revisar como advertencia solo si se define criterio operativo. | Pendiente. |

Decisión funcional:

No usar `1800-01-01` para V49 salvo que el instructivo oficial lo indique en una versión posterior. En el texto disponible solo se define `1845-01-01` como No Aplica.

## 14.5 V50 — Número de IPS que suministran el primer o único esquema

Comodines:

| Valor | Significado |
|---|---|
| 98 | No aplica: en V45 se seleccionó 98. |

Reglas base:

| Código sugerido | Regla | Severidad |
|---|---|---|
| V50-ERROR-001 | V50 vacía. | Error |
| V50-ERROR-002 | V50 no es numérica ni corresponde al comodín 98. | Error |
| V50-ERROR-003 | V45=1, pero V50=98. | Error |
| V50-ERROR-004 | V50 registra cero o un número negativo. | Error |
| V50-ERROR-005 | V45=98, pero V50 registra un número de IPS diferente de 98. | Error |

Cruces:

| Cruce | Regla funcional | Severidad |
|---|---|---|
| V45 ↔ V50 | Si recibió terapia sistémica, V50 debe registrar el número de IPS que suministran el esquema. Si V45=98, debe ser 98. | Error |
| V50 ↔ V51/V52 | El número de IPS debe orientar si se diligencia IPS1 e IPS2 o si IPS2 queda como 98. | Error progresivo cuando V51 y V52 estén implementadas. |

Decisión funcional:

No definir un máximo de IPS sin confirmación del instructivo completo o de la estructura posterior. Si operativamente solo existen V51 e V52 para este esquema, puede validarse la coherencia con IPS1 e IPS2, pero no se debe inventar un límite clínico no soportado.

## 14.6 V51 — Código de la IPS1 que suministra el primer o único esquema

Valores permitidos:

| Valor | Significado |
|---|---|
| Código REPS de 12 dígitos | IPS que suministra el primer o único esquema. |
| 96 | Terapia sistémica suministrada fuera del país. |
| 98 | No aplica: en V45 se seleccionó 98. |

Aclaración operativa:

Para tratamientos orales, se debe consignar el código de habilitación de la IPS que prescribió el tratamiento, no el código del operador logístico que realiza la entrega.

Reglas base:

| Código sugerido | Regla | Severidad |
|---|---|---|
| V51-ERROR-001 | V51 vacía. | Error |
| V51-ERROR-002 | V51 no es código REPS de 12 dígitos ni corresponde a 96 o 98. | Error |
| V51-ERROR-003 | V45=1, pero V51=98. | Error |
| V51-ERROR-004 | V45=98, pero V51 es diferente de 98. | Error |
| V51-ADVERTENCIA-001 | Código REPS con formato válido pero pendiente de verificación contra base REPS oficial. | Advertencia o pendiente según disponibilidad del catálogo. |

Cruces:

| Cruce | Regla funcional | Severidad |
|---|---|---|
| V45 ↔ V51 | Si recibió terapia sistémica, V51 debe registrar IPS real o 96 si fue fuera del país. Si V45=98, V51 debe ser 98. | Error |
| V50 ↔ V51 | Si V50 registra una o más IPS, V51 debe estar diligenciada con código válido o 96. | Error |
| V51 ↔ REPS | La validación de existencia y habilitación depende del catálogo externo REPS. | Pendiente / advertencia. |

## 14.7 V52 — Código de la IPS2 que suministra el primer o único esquema

Valores permitidos:

| Valor | Significado |
|---|---|
| Código REPS de 12 dígitos | Segunda IPS que suministra el esquema. |
| 98 | No aplica. |

Aclaración operativa:

Para tratamientos orales, se debe consignar el código de habilitación de la IPS que prescribió el tratamiento, no el código del operador logístico que realiza la entrega.

Reglas base:

| Código sugerido | Regla | Severidad |
|---|---|---|
| V52-ERROR-001 | V52 vacía. | Error |
| V52-ERROR-002 | V52 no es código REPS de 12 dígitos ni corresponde a 98. | Error |
| V52-ERROR-003 | V50=1, pero V52 es diferente de 98. | Error |
| V52-ERROR-004 | V50 indica dos IPS o más, pero V52=98. | Error pendiente de confirmar según catálogo/estructura completa. |
| V52-ERROR-005 | V45=98, pero V52 es diferente de 98. | Error |
| V52-ADVERTENCIA-001 | Código REPS con formato válido pero pendiente de verificación contra base REPS oficial. | Advertencia o pendiente según disponibilidad del catálogo. |

Cruces:

| Cruce | Regla funcional | Severidad |
|---|---|---|
| V45 ↔ V52 | Si V45=98, V52 debe ser 98. | Error |
| V50 ↔ V52 | Si solo una IPS suministra el esquema, V52 debe ser 98. Si hay segunda IPS, V52 debe tener código válido. | Error / pendiente según confirmación funcional. |
| V52 ↔ REPS | La validación de existencia y habilitación depende del catálogo externo REPS. | Pendiente / advertencia. |

Decisión funcional:

No permitir 96 en V52 hasta que el instructivo lo indique expresamente. El valor 96 está descrito para V51.

## 14.8 Dependencias del Módulo 10

| Variable pivote | Variables dependientes | Uso |
|---|---|---|
| V45 | V48-V52 | Controla si el bloque debe registrar datos reales del esquema o No Aplica. |
| V48 | V49 | Contextualiza la ubicación temporal del esquema cuya fecha se reporta. |
| V50 | V51-V52 | Define cuántas IPS suministradoras deben estar documentadas. |
| V51/V52 | REPS | Requieren validación de formato y, cuando exista catálogo oficial, verificación contra habilitación REPS. |

## 14.9 Estado funcional del Módulo 10

| Bloque | Estado recomendado |
|---|---|
| V48 | Implementar primero como Sprint 3D · Módulo 10A. |
| V49 | Implementar después de V48 como Sprint 3D · Módulo 10B. |
| V50-V52 | Implementar como Sprint 3D · Módulo 10C, por su relación interna con IPS suministradoras. |
| V53-V53.9 | Separar en Sprint 3E · Módulo 11, porque corresponde a un bloque diferente y más amplio. |

## 14.10 Decisiones funcionales preliminares para V48-V52

| Tema | Decisión recomendada |
|---|---|
| V45 como control | Mantener V45 como cruce principal de No Aplica para V48-V52. |
| V48 con V17 | No usar V17 como error fuerte. El instructivo da ejemplos, no restricciones exclusivas. |
| V49 anterior al periodo | No generar error. El instructivo permite que el esquema haya iniciado antes del periodo y continúe durante el reporte. |
| V49 con 1800-01-01 | No permitir como regla activa salvo que el instructivo oficial lo indique. |
| V50 máximo de IPS | No inventar máximo sin revisar estructura completa. Validar solo coherencia básica con V51/V52. |
| V51/V52 contra REPS | Validar formato. La existencia/habilitación queda pendiente de catálogo oficial. |
| V52 con 96 | No permitir 96 en V52 por ahora; el instructivo solo menciona 96 en V51. |


# 15. Variables núcleo de trazabilidad

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

## 13.4 V29 como variable pivote de estadificación

V29 define la primera estadificación y alimenta:

| Variable dependiente | Relación |
|---|---|
| V30 | Fecha en que se realizó o documentó la estadificación. |

## 13.5 V38 como variable pivote de clasificación de riesgo

V38 define si V39 debe registrar una fecha real, fecha desconocida o no aplica.

| Variable dependiente | Relación |
|---|---|
| V39 | Si V38=98, V39 debe ser 1845-01-01; si V38 aplica, V39 no debe ser 1845-01-01. |

## 13.6 V42 como variable pivote de antecedente de otro cáncer primario

V42 define cómo deben diligenciarse V43 y V44.

| Variable dependiente | Relación |
|---|---|
| V43 | Si V42=2, V43 debe ser 1845-01-01; si V42=1, debe ser fecha real o 1800-01-01. |
| V44 | Si V42=2, V44 debe ser 99; si V42=1, debe ser CIE-10 válido. |

---

# 16. Catálogos externos y validaciones pendientes

Algunas variables no deben bloquearse completamente hasta tener catálogos oficiales cargados.

| Variable | Catálogo requerido | Validación actual recomendada |
|---|---|---|
| V9 | CIUO | Formato de 4 dígitos y comodines. |
| V11 | EAPB / DANE | Obligatorio; existencia pendiente. |
| V14 | DIVIPOLA | Numérico de 5 dígitos; existencia pendiente. |
| V25 | REPS | Formato y longitud; existencia/habilitación pendiente. |
| V51 | REPS | Formato de 12 dígitos, 96 o 98; existencia/habilitación pendiente. |
| V52 | REPS | Formato de 12 dígitos o 98; existencia/habilitación pendiente. |
| V17 | CIE-10 CAC | Validar contra catálogo operativo local cuando esté cargado. |

---

# 17. Reglas excluidas por decisión funcional

| Regla | Estado |
|---|---|
| V7 contra fecha de corte 2025-05-05 | Excluida por decisión del cliente. No implementar. |
| Validación completa de CIUO, EAPB, DIVIPOLA y REPS sin bases oficiales | No implementar como error fuerte. |

---

# 18. Uso recomendado de esta arquitectura

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

# 19. Estado actual de arquitectura V1-V52

| Bloque | Estado |
|---|---|
| V1-V16 | Arquitectura definida y módulo auditado funcionalmente. |
| V17-V24 | Arquitectura definida; pendiente auditoría completa de reglas faltantes. |
| V25-V28 | Arquitectura definida; pendiente auditoría completa de reglas faltantes. |
| V29 | Arquitectura definida; pendiente revisión de compatibilidad completa por agrupadores. |
| V30-V33 | Arquitectura definida; pendiente auditoría completa de reglas faltantes. |
| V34-V35 | Arquitectura definida; reglas principales ya trabajadas. |
| V36-V40 | Arquitectura definida; variables cerradas/probadas en Sprint 3A Módulo 7. |
| V41-V44 | Implementadas y validadas en Módulo 8. |
| V45-V47 | Módulo 9 cerrado funcionalmente en Sprint 3C. |
| V48-V52 | Arquitectura inicial definida para Sprint 3D · Módulo 10; pendiente implementación progresiva. |

---

## 20. Nota final

Esta arquitectura no significa que todas las reglas de negocio faltantes ya estén identificadas.

La arquitectura es el mapa base.  
La auditoría de reglas faltantes debe hacerse módulo por módulo comparando:

```text
Instructivo oficial ↔ Matriz funcional ↔ Código real ↔ Excel de pruebas
```

Solo después de esa comparación se debe modificar el código.
