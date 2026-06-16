# Catálogo de hallazgos encontrados — avance parcial actualizado a V86

## Total de hallazgos encontrados documentados

Este documento consolida el catálogo de hallazgos del **Validador CAC — Cáncer**. Conserva el bloque histórico documentado de **V1-V28** y **V54-V61**, e integra el bloque confirmado disponible para **V78-V80** y **V86**.

El sistema está cerrado funcionalmente hasta **V86**, pero este catálogo todavía no debe considerarse continuo porque faltan por integrar, con código exacto desde los módulos correspondientes, los hallazgos de **V29-V53.9**, **V62-V77** y **V81-V85**.

| Concepto | Total |
|---|---:|
| Hallazgos documentados en este archivo | 240 |
| Errores documentados | 201 |
| Advertencias documentadas | 39 |
| Variables con detalle de hallazgos en este documento | V1-V28, V54-V61, V78-V80 y V86 |
| Variables cerradas funcionalmente pero pendientes de integrar con detalle exacto | V29-V53.9, V62-V77 y V81-V85 |
| Avance funcional del sistema | V1-V86 |
| Siguiente variable de trabajo | V87 |

> Este total corresponde sólo a los bloques detallados en este documento. No debe usarse como total definitivo del sistema hasta integrar los códigos exactos de V29-V53.9, V62-V77 y V81-V85.

> Actualización V86: se integró el bloque `V86` cerrado funcionalmente en Sprint 3L · Módulo 17 · Radioterapia. V86 queda con 3 errores, 0 advertencias. `V86=98` es válido y no debe generar advertencia.

---

## Resumen por variable

| Variable | Nombre funcional | Hallazgos | Errores | Advertencias | Estado documental |
|---|---|---:|---:|---:|---|
| V1 | Primer nombre | 11 | 9 | 2 | Detallado |
| V2 | Segundo nombre | 11 | 9 | 2 | Detallado |
| V3 | Primer apellido | 10 | 8 | 2 | Detallado |
| V4 | Segundo apellido | 11 | 9 | 2 | Detallado |
| V5 | Tipo de identificación | 8 | 5 | 3 | Detallado |
| V6 | Número de identificación | 18 | 12 | 6 | Detallado |
| V7 | Fecha de nacimiento | 4 | 3 | 1 | Detallado |
| V8 | Sexo | 3 | 3 | 0 | Detallado |
| V9 | Ocupación | 4 | 3 | 1 | Detallado |
| V10 | Régimen de afiliación | 3 | 3 | 0 | Detallado |
| V11 | Código de EPS/EAPB | 1 | 1 | 0 | Detallado |
| V12 | Pertenencia étnica | 3 | 3 | 0 | Detallado |
| V13 | Grupo poblacional | 3 | 3 | 0 | Detallado |
| V14 | Municipio de residencia | 3 | 3 | 0 | Detallado |
| V15 | Teléfono | 7 | 4 | 3 | Detallado |
| V16 | Fecha de afiliación | 5 | 4 | 1 | Detallado |
| V17 | Código CIE-10 de la neoplasia maligna reportada | 9 | 5 | 4 | Detallado |
| V18 | Fecha de diagnóstico del cáncer reportado | 5 | 4 | 1 | Detallado |
| V19 | Fecha de remisión o interconsulta | 6 | 6 | 0 | Detallado |
| V20 | Fecha de ingreso a la institución diagnóstica | 5 | 5 | 0 | Detallado |
| V21 | Tipo de estudio diagnóstico | 4 | 3 | 1 | Detallado |
| V22 | Motivo por el cual no tuvo diagnóstico por histopatología | 6 | 5 | 1 | Detallado |
| V23 | Fecha de recolección de muestra | 7 | 7 | 0 | Detallado |
| V24 | Fecha del primer informe histopatológico válido | 5 | 5 | 0 | Detallado |
| V25 | Código de habilitación de la IPS confirmadora | 4 | 2 | 2 | Detallado |
| V26 | Fecha de primera consulta con médico tratante | 4 | 3 | 1 | Detallado |
| V27 | Histología del tumor | 7 | 6 | 1 | Detallado |
| V28 | Grado de diferenciación del tumor sólido maligno | 5 | 5 | 0 | Detallado |
| V29-V53.9 | Estadificación y primer/único esquema | Pendiente | Pendiente | Pendiente | Cerrado funcional; detalle pendiente de integrar |
| V54 | Medicamento antineoplásico adicional 1 | 6 | 6 | 0 | Detallado |
| V55 | Medicamento antineoplásico adicional 2 | 8 | 8 | 0 | Detallado |
| V56 | Medicamento antineoplásico adicional 3 | 9 | 9 | 0 | Detallado |
| V57 | Quimioterapia intratecal en el primer o único esquema | 4 | 4 | 0 | Detallado |
| V58 | Fecha de finalización del primer o único esquema | 5 | 5 | 0 | Detallado |
| V59 | Características actuales del primer o único esquema | 4 | 4 | 0 | Detallado |
| V60 | Motivo de finalización prematura del primer o único esquema | 4 | 4 | 0 | Detallado |
| V61 | Ubicación temporal del último esquema de terapia sistémica | 5 | 4 | 1 | Detallado |
| V62-V77 | Último esquema de terapia sistémica | Pendiente | Pendiente | Pendiente | Cerrado funcional; detalle pendiente de integrar |
| V78 | Código CUPS de la primera cirugía | 7 | 5 | 2 | Detallado |
| V79 | Ubicación temporal de la primera cirugía | 5 | 4 | 1 | Detallado |
| V80 | Fecha de última cirugía o reintervención | 8 | 7 | 1 | Detallado |
| V81-V85 | Cirugía final | Pendiente | Pendiente | Pendiente | Cerrado funcional; detalle pendiente de integrar |
| V86 | Radioterapia recibida en el periodo | 3 | 3 | 0 | Detallado |

---

# Detalle de hallazgos integrados desde V54 en adelante

> El detalle histórico V1-V28 se conserva igual en el documento base. Esta actualización no cambia esos códigos.

## V54 — Medicamento antineoplásico adicional 1

**Total en V54: 6 hallazgos**  
**Errores:** 6  
**Advertencias:** 0

| Código | Tipo | Hallazgo |
|---|---|---|
| `V54-ERROR-001` | Error | V54 está vacía. |
| `V54-ERROR-002` | Error | V54 tiene un valor diferente de código ATC, 97 o 98. |
| `V54-ERROR-003` | Error | V45 indica terapia sistémica recibida, pero V54 está marcada como no tuvo esquema. |
| `V54-ERROR-004` | Error | V54 no corresponde con V45: si no tuvo esquema, debe registrarse 98. |
| `V54-ERROR-005` | Error | V54 tiene formato ATC, pero no existe en el catálogo ATC cargado. |
| `V54-ERROR-006` | Error | V54 repite un medicamento ya registrado en el bloque V53. |

## V55 — Medicamento antineoplásico adicional 2

**Total en V55: 8 hallazgos**  
**Errores:** 8  
**Advertencias:** 0

| Código | Tipo | Hallazgo |
|---|---|---|
| `V55-ERROR-001` | Error | V55 está vacía. |
| `V55-ERROR-002` | Error | V55 tiene un valor diferente de código ATC, 97 o 98. |
| `V55-ERROR-003` | Error | V45 indica terapia sistémica recibida, pero V55 está marcada como no tuvo esquema. |
| `V55-ERROR-004` | Error | V55 no corresponde con V45: si no tuvo esquema, debe registrarse 98. |
| `V55-ERROR-005` | Error | V55 tiene formato ATC, pero no existe en el catálogo ATC cargado. |
| `V55-ERROR-006` | Error | V55 repite un medicamento ya registrado en el bloque V53. |
| `V55-ERROR-007` | Error | V55 repite el medicamento registrado en V54. |
| `V55-ERROR-008` | Error | V55 tiene medicamento adicional, pero V54 indica que no hubo medicamentos adicionales. |

## V56 — Medicamento antineoplásico adicional 3

**Total en V56: 9 hallazgos**  
**Errores:** 9  
**Advertencias:** 0

| Código | Tipo | Hallazgo |
|---|---|---|
| `V56-ERROR-001` | Error | V56 está vacía. |
| `V56-ERROR-002` | Error | V56 tiene un valor diferente de código ATC, 97 o 98. |
| `V56-ERROR-003` | Error | V45 indica terapia sistémica recibida, pero V56 está marcada como no tuvo esquema. |
| `V56-ERROR-004` | Error | V56 no corresponde con V45: si no tuvo esquema, debe registrarse 98. |
| `V56-ERROR-005` | Error | V56 tiene formato ATC, pero no existe en el catálogo ATC cargado. |
| `V56-ERROR-006` | Error | V56 repite un medicamento ya registrado en el bloque V53. |
| `V56-ERROR-007` | Error | V56 repite el medicamento registrado en V54. |
| `V56-ERROR-008` | Error | V56 repite el medicamento registrado en V55. |
| `V56-ERROR-009` | Error | V56 tiene medicamento adicional, pero la secuencia anterior indica que no había más adicionales. |

## V57 — Quimioterapia intratecal en el primer o único esquema

**Total en V57: 4 hallazgos**  
**Errores:** 4  
**Advertencias:** 0

| Código | Tipo | Hallazgo |
|---|---|---|
| `V57-ERROR-001` | Error | V57 está vacía. |
| `V57-ERROR-002` | Error | V57 tiene un valor diferente de 1, 2 o 98. |
| `V57-ERROR-003` | Error | V45 indica que tuvo terapia sistémica, pero V57 está en 98. |
| `V57-ERROR-004` | Error | V57 no corresponde con V45: si no tuvo esquema, debe registrarse 98. |

## V58 — Fecha de finalización del primer o único esquema

**Total en V58: 5 hallazgos**  
**Errores:** 5  
**Advertencias:** 0

| Código | Tipo | Hallazgo |
|---|---|---|
| `V58-ERROR-001` | Error | V58 está vacía. |
| `V58-ERROR-002` | Error | V58 no tiene formato de fecha válido. |
| `V58-ERROR-003` | Error | V45 indica que no tuvo esquema, pero V58 no está en 1845-01-01. |
| `V58-ERROR-004` | Error | V45 indica que sí tuvo terapia sistémica, pero V58 está en no aplica. |
| `V58-ERROR-005` | Error | V58 es anterior a la fecha de inicio del esquema. |

## V59 — Características actuales del primer o único esquema

**Total en V59: 4 hallazgos**  
**Errores:** 4  
**Advertencias:** 0

| Código | Tipo | Hallazgo |
|---|---|---|
| `V59-ERROR-001` | Error | V59 está vacía. |
| `V59-ERROR-002` | Error | V59 tiene un valor diferente de 1, 2, 3 o 98. |
| `V59-ERROR-003` | Error | V45 indica que no tuvo esquema, pero V59 no está en 98. |
| `V59-ERROR-004` | Error | V45 indica que tuvo terapia sistémica, pero V59 está en 98. |

## V60 — Motivo de finalización prematura del primer o único esquema

**Total en V60: 4 hallazgos**  
**Errores:** 4  
**Advertencias:** 0

| Código | Tipo | Hallazgo |
|---|---|---|
| `V60-ERROR-001` | Error | V60 está vacía. |
| `V60-ERROR-002` | Error | V60 tiene un valor fuera del catálogo permitido. |
| `V60-ERROR-003` | Error | V59=2 indica finalización incompleta, pero V60 está en 98. |
| `V60-ERROR-004` | Error | V60 registra un motivo, pero V59 no está en 2. |

## V61 — Ubicación temporal del último esquema de terapia sistémica del periodo

**Total en V61: 5 hallazgos**  
**Errores:** 4  
**Advertencias:** 1

| Código | Tipo | Hallazgo |
|---|---|---|
| `V61-ERROR-001` | Error | V61 está vacía. |
| `V61-ERROR-002` | Error | V61 tiene un valor fuera del catálogo permitido. |
| `V61-ERROR-003` | Error | V45 indica que no tuvo terapia sistémica, pero V61 no está en 98. |
| `V61-ERROR-004` | Error | V45 indica que tuvo terapia sistémica, pero V61 está en 98. |
| `V61-ADVERTENCIA-001` | Advertencia | V61=97 requiere trazabilidad posterior con V62 a V73. |

**Catálogo permitido para V61:**

| Código | Descripción |
|---:|---|
| 1 | Neoadyuvancia, manejo inicial prequirúrgico. |
| 2 | Tratamiento inicial curativo sin cirugía sugerida. |
| 3 | Adyuvancia, manejo inicial postquirúrgico. |
| 11 | Manejo de progresión o recaída. |
| 12 | Manejo de enfermedad metastásica. |
| 13 | Cambio por toxicidad. |
| 14 | Manejo paliativo, sin manejo de recaída ni enfermedad metastásica. |
| 97 | Sólo recibió un esquema de quimioterapia o terapia sistémica en el periodo y en V45 seleccionó 1. V62 a V73 deben registrar No Aplica. |
| 98 | No aplica, cuando V45=98. |

---

# Bloque integrado: cirugía V78-V80

## V78 — Código CUPS de la primera cirugía del periodo

**Total en V78: 7 hallazgos**  
**Errores:** 5  
**Advertencias:** 2

| Código | Tipo | Hallazgo |
|---|---|---|
| `V78-ERROR-001` | Error | V78 está vacía. |
| `V78-ERROR-002` | Error | V78 tiene formato inválido. |
| `V78-ERROR-003` | Error | V74=1 indica cirugía, pero V78 está en 98. |
| `V78-ERROR-004` | Error | V74=2 indica que no recibió cirugía, pero V78 es diferente de 98. |
| `V78-ERROR-005` | Error | El código CUPS no pertenece al grupo CUPS CIRUGÍA o pertenece a otro grupo, por ejemplo radioterapia. |
| `V78-ADVERTENCIA-001` | Advertencia | CUPS válido de cirugía; verificar pertinencia frente al manejo del cáncer. |
| `V78-ADVERTENCIA-002` | Advertencia | Procedimiento especial reportable: fotoféresis, fototerapia, crioterapia o radiofrecuencia. |

## V79 — Ubicación temporal de la primera cirugía

**Total en V79: 5 hallazgos**  
**Errores:** 4  
**Advertencias:** 1

| Código | Tipo | Hallazgo |
|---|---|---|
| `V79-ERROR-001` | Error | V79 está vacía. |
| `V79-ERROR-002` | Error | V79 tiene un valor fuera del catálogo permitido. |
| `V79-ERROR-003` | Error | V74=1 indica cirugía, pero V79 está en 98. |
| `V79-ERROR-004` | Error | V74=2 indica que no recibió cirugía, pero V79 es diferente de 98. |
| `V79-ADVERTENCIA-001` | Advertencia | V79=5 o V79=6; verificar soporte clínico de recaída o enfermedad metastásica. |

## V80 — Fecha de realización de la última cirugía o reintervención

**Total en V80: 8 hallazgos**  
**Errores:** 7  
**Advertencias:** 1

| Código | Tipo | Hallazgo |
|---|---|---|
| `V80-ERROR-001` | Error | V80 está vacía. |
| `V80-ERROR-002` | Error | V80 no tiene formato de fecha válido. |
| `V80-ERROR-003` | Error | V80 contiene una fecha inexistente. |
| `V80-ERROR-004` | Error | V74=2 indica que no recibió cirugía, pero V80 es diferente de 1845-01-01. |
| `V80-ERROR-005` | Error | V75=1 indica una sola cirugía, pero V80 es diferente de 1845-01-01. |
| `V80-ERROR-006` | Error | V74=1 y V75>1 indican más de una cirugía, pero V80 está en 1845-01-01. |
| `V80-ERROR-007` | Error | V80 es anterior a V76, la fecha de la primera cirugía. |
| `V80-ADVERTENCIA-001` | Advertencia | V80 es igual a V76 con V75>1; verificar que no se esté repitiendo el evento quirúrgico denominado primera cirugía. |

---

# Bloque integrado: radioterapia V86

## V86 — ¿Recibió el usuario algún tipo de radioterapia en el periodo de reporte actual?

**Total en V86: 3 hallazgos**  
**Errores:** 3  
**Advertencias:** 0

| Código | Tipo | Hallazgo |
|---|---|---|
| `V86-ERROR-001` | Error | V86 está vacía. |
| `V86-ERROR-002` | Error | V86 tiene un valor fuera del catálogo permitido. |
| `V86-ERROR-003` | Error | V86 registra la opción 2, pero esa opción fue eliminada del instructivo. |

**Catálogo permitido para V86:**

| Código | Descripción |
|---:|---|
| 1 | Sí recibió algún tipo de radioterapia. |
| 98 | No aplica. Verificar que V87 a V105 registren No Aplica cuando esas variables se implementen. |

**Reglas expresamente descartadas para V86:**

| Regla descartada | Motivo |
|---|---|
| `V86-ADVERTENCIA-001` | No debe existir. V86=98 es válido y no genera advertencia. |
| Forzar error contra V87-V105 desde V86 | La trazabilidad V86 → V87-V105 se validará después, variable por variable. |

---

# Hallazgos con trazabilidad entre variables

Estos hallazgos no validan una sola celda aislada, sino la coherencia entre dos o más variables.

## Trazabilidad histórica V1-V28

| Código | Cruce | Qué valida |
|---|---|---|
| `V5-ERROR-004` | V5 ↔ V10 | AS solo es válido si V10=S. |
| `V5-ERROR-005` | V5 ↔ V10 | MS solo es válido si V10=S. |
| `V16-ERROR-004` | V16 ↔ V7 | La fecha de afiliación no puede ser anterior al nacimiento. |
| `V17-ERROR-006` | V17 ↔ V8 | El CIE-10 debe corresponder al sexo del paciente cuando el catálogo lo restringe. |
| `V17-ADVERTENCIA-007` | V17 ↔ V7/V18 | Código CIE-10 con restricción de edad. |
| `V18-ADVERTENCIA-007` | V18 ↔ V24 | La fecha de diagnóstico puede no coincidir con la fecha del informe histopatológico. |
| `V19-ERROR-007` | V19 ↔ V20 | La remisión/interconsulta no debe ser posterior al ingreso diagnóstico. |
| `V19-ERROR-008` | V19 ↔ V18 | La remisión/interconsulta no debe ser posterior al diagnóstico. |
| `V20-ERROR-007` | V20 ↔ V18 | El ingreso diagnóstico no debe ser posterior al diagnóstico. |
| `V22-ERROR-005` | V22 ↔ V21 | Si V21=7, V22 no puede ser 98. |
| `V22-ADVERTENCIA-006` | V22 ↔ V21 | Si V21 es diferente de 7, normalmente V22 debería ser 98. |
| `V23-ERROR-007` | V23 ↔ V21 | Si V21=7, V23 debe ser 1845-01-01. |
| `V24-ERROR-007` | V24 ↔ V21 | Si V21=7, V24 debe ser 1845-01-01. |
| `V23-ERROR-008` | V23 ↔ V21 | V23 no puede usar 1845-01-01 si V21 no es 7. |
| `V24-ERROR-008` | V24 ↔ V21 | V24 no puede usar 1845-01-01 si V21 no es 7. |
| `V23-ERROR-009` | V23 ↔ V24 | La muestra no puede estar tomada después del informe histopatológico. |
| `V23-ERROR-010` | V23 ↔ V18 | La muestra no puede aparecer después de la fecha de diagnóstico. |
| `V26-ADV-001` | V26 ↔ V18 | La primera consulta con médico tratante aparece antes del diagnóstico. |
| `V27-ERROR-004` | V27 ↔ V21 | Si V21=7, V27 debe ser 98. |
| `V27-ERROR-005` | V27 ↔ V21 | Si V27=98, V21 debe ser 7. |
| `V27-ERROR-006` | V27 ↔ V17 | V27=21 solo aplica para cáncer de pulmón C34. |
| `V28-ERROR-004` | V28 ↔ V21 | Si V21=7, V28 debe ser 98. |
| `V28-ERROR-005` | V28 ↔ V21 | Si V28=98, V21 debe ser 7. |

## Trazabilidad terapia sistémica V54-V61

| Código | Cruce | Qué valida |
|---|---|---|
| `V54-ERROR-003` | V54 ↔ V45 | Si V45=1, V54 no debe registrar 98. |
| `V54-ERROR-004` | V54 ↔ V45 | Si V45=98, V54 debe registrar 98. |
| `V54-ERROR-006` | V54 ↔ V53 | V54 no debe repetir medicamentos ya reportados en el bloque V53. |
| `V55-ERROR-003` | V55 ↔ V45 | Si V45=1, V55 no debe registrar 98. |
| `V55-ERROR-004` | V55 ↔ V45 | Si V45=98, V55 debe registrar 98. |
| `V55-ERROR-006` | V55 ↔ V53 | V55 no debe repetir medicamentos ya reportados en el bloque V53. |
| `V55-ERROR-007` | V55 ↔ V54 | V55 no debe repetir el medicamento registrado en V54. |
| `V55-ERROR-008` | V55 ↔ V54 | Si V54=97, no debe aparecer un segundo medicamento adicional en V55. |
| `V56-ERROR-003` | V56 ↔ V45 | Si V45=1, V56 no debe registrar 98. |
| `V56-ERROR-004` | V56 ↔ V45 | Si V45=98, V56 debe registrar 98. |
| `V56-ERROR-006` | V56 ↔ V53 | V56 no debe repetir medicamentos ya reportados en el bloque V53. |
| `V56-ERROR-007` | V56 ↔ V54 | V56 no debe repetir el medicamento registrado en V54. |
| `V56-ERROR-008` | V56 ↔ V55 | V56 no debe repetir el medicamento registrado en V55. |
| `V56-ERROR-009` | V56 ↔ V54/V55 | V56 solo se usa si existe secuencia previa válida en V54 y V55. |
| `V57-ERROR-003` | V57 ↔ V45 | Si V45=1, V57 debe responder 1 o 2, no 98. |
| `V57-ERROR-004` | V57 ↔ V45 | Si V45=98, V57 debe registrar 98. |
| `V58-ERROR-003` | V58 ↔ V45 | Si V45=98, V58 debe registrar 1845-01-01. |
| `V58-ERROR-004` | V58 ↔ V45 | Si V45=1, V58 no debe registrar 1845-01-01. |
| `V58-ERROR-005` | V58 ↔ V49 | La fecha de finalización no debe ser anterior a la fecha de inicio. |
| `V59-ERROR-003` | V59 ↔ V45 | Si V45=98, V59 debe registrar 98. |
| `V59-ERROR-004` | V59 ↔ V45 | Si V45=1, V59 debe registrar 1, 2 o 3. |
| `V60-ERROR-003` | V60 ↔ V59 | Si V59=2, V60 debe registrar un motivo entre 1 y 8. |
| `V60-ERROR-004` | V60 ↔ V59 | Si V59 es diferente de 2, V60 debe registrar 98. |
| `V61-ERROR-003` | V61 ↔ V45 | Si V45=98, V61 debe registrar 98 porque no aplica reportar ubicación temporal del último esquema. |
| `V61-ERROR-004` | V61 ↔ V45 | Si V45=1, V61 no debe registrar 98; debe registrar una ubicación temporal válida o 97 cuando sólo recibió un esquema. |
| `V61-ADVERTENCIA-001` | V61 ↔ V62-V73 | Si V61=97, queda pendiente verificar que V62 a V73 registren No Aplica cuando esas variables estén implementadas. |

## Trazabilidad de cirugía V78-V80

| Código | Cruce | Qué valida |
|---|---|---|
| `V78-ERROR-003` | V78 ↔ V74 | Si V74=1, debe existir un CUPS de cirugía válido en V78. |
| `V78-ERROR-004` | V78 ↔ V74 | Si V74=2, V78 debe registrar 98. |
| `V78-ERROR-005` | V78 ↔ CUPS cirugía | V78 sólo acepta códigos del grupo CUPS CIRUGÍA. |
| `V78-ADVERTENCIA-001` | V78 ↔ soporte quirúrgico | CUPS válido de cirugía requiere verificar pertinencia frente al manejo del cáncer. |
| `V78-ADVERTENCIA-002` | V78 ↔ aclaración del instructivo | Procedimientos especiales deben reportarse con CUPS y cuantificarse en V74/V75. |
| `V79-ERROR-003` | V79 ↔ V74 | Si V74=1, V79 no debe ser 98. |
| `V79-ERROR-004` | V79 ↔ V74 | Si V74=2, V79 debe ser 98. |
| `V79-ADVERTENCIA-001` | V79 ↔ soporte oncológico | V79=5 o 6 exige revisar soporte de recaída o enfermedad metastásica. |
| `V80-ERROR-004` | V80 ↔ V74 | Si V74=2, V80 debe ser 1845-01-01. |
| `V80-ERROR-005` | V80 ↔ V75 | Si V75=1, V80 debe ser 1845-01-01. |
| `V80-ERROR-006` | V80 ↔ V74/V75 | Si V74=1 y V75>1, debe registrarse fecha real de última cirugía. |
| `V80-ERROR-007` | V80 ↔ V76 | La última cirugía no puede ser anterior a la primera cirugía. |
| `V80-ADVERTENCIA-001` | V80 ↔ V76/V75 | Si V80=V76 con V75>1, revisar que no se repita la primera cirugía. |

## Trazabilidad de radioterapia V86-V105

| Código / estado | Cruce | Qué valida |
|---|---|---|
| `V86-ERROR-003` | V86 ↔ instructivo vigente | La opción 2 fue eliminada; radioterapia propuesta pero no suministrada no aplica. |
| Pendiente V87-V105 | V86 ↔ V87-V105 | Si V86=98, V87 a V105 deberán registrar No Aplica, pero esa trazabilidad se valida variable por variable, no desde V86. |
| Pendiente V87-V105 | V86 ↔ V87-V105 | Si V86=1, las variables V87-V105 deberán guardar coherencia con sesiones, fechas, ubicación temporal, CUPS, IPS, finalización y motivo. |

---

# Mapa de trazabilidad operativa V61-V105

## Último esquema de terapia sistémica V61-V73

| Variable origen | Variable destino | Relación funcional |
|---|---|---|
| V45 | V61 | Define si aplica reportar último esquema. V45=98 obliga V61=98. |
| V61 | V62 | Si V61=97 o 98, V62 debe ser 1845-01-01. Si V61 indica último esquema real, V62 debe ser fecha real. |
| V61 | V63 | Si V61=97 o 98, V63 debe ser 98. Si hay último esquema real, V63 debe indicar número de IPS. |
| V63 | V64/V65 | El número de IPS define si se diligencia IPS1 e IPS2 o si aplica 98. |
| V61 | V66-V66.9 | Si V61=97 o 98, V66 y medicamentos del último esquema deben ir en 98. Si hay último esquema real, V66 habilita posiciones de medicamentos. |
| V66 | V66.1-V66.9 | V66 define cuántas posiciones de medicamentos deberían tener ATC administrados y cuáles deben ir en 98/97 según regla. |
| V66.1-V66.9 | V67-V69 | Los adicionales no deben repetir medicamentos ya reportados en V66.1 a V66.9. |
| V61 | V67-V69 | Si V61=97 o 98, V67-V69 deben ser 98. Si V61<14 y no hay adicionales, aplica 97. |
| V45/V61 | V70 | Si no tuvo terapia sistémica, V70 debe ser 98. Si tuvo último esquema, debe responder 1 o 2. |
| V61/V62 | V71 | La fecha de finalización debe ser coherente con la existencia del último esquema y con la fecha de inicio. |
| V61 | V72 | Si no aplica último esquema, V72=98. Si aplica, V72 debe ser 1, 2 o 3. |
| V72 | V73 | Si V72=2, V73 debe registrar motivo. Si V72 diferente de 2, V73 debe ser 98. |

## Cirugía V74-V85

| Variable origen | Variable destino | Relación funcional |
|---|---|---|
| V74 | V75 | Si V74=2, V75=98. Si V74=1, V75 debe ser número real de cirugías. |
| V74/V75 | V76 | Si no hubo cirugía, V76=1845-01-01. Si hubo cirugía, V76 debe ser fecha real. |
| V74 | V77 | Si no hubo cirugía, V77=98. Si hubo cirugía, V77 debe ser IPS real o 96 si fue fuera del país. |
| V74 | V78 | Si no hubo cirugía, V78=98. Si hubo cirugía, V78 debe ser CUPS de cirugía. |
| V74 | V79 | Si no hubo cirugía, V79=98. Si hubo cirugía, V79 debe ser 1, 5 o 6. |
| V74/V75/V76 | V80 | Si no hubo cirugía o sólo hubo una, V80=1845-01-01. Si hubo más de una, V80 debe ser fecha real y no anterior a V76. |
| V74/V75/V80 | V81 | Si no hubo cirugía o sólo hubo una, V81=98. Si hubo más de una cirugía y V80 real, V81 debe registrar motivo 1, 2, 3, 5 o 6. |
| V74/V75 | V82 | Si no hubo cirugía o sólo hubo una, V82=98. Si hubo última cirugía, V82 debe registrar IPS. |
| V74/V75 | V83 | Si no hubo cirugía o sólo hubo una, V83=98. Si hubo última cirugía, V83 debe registrar CUPS de cirugía. |
| V74/V75 | V84 | Si no hubo cirugía o sólo hubo una, V84=98. Si hubo última cirugía, V84 debe ser 1, 5 o 6. |
| V74 | V85 | Si no hubo cirugía, V85=98. Si hubo cirugía, V85 debe ser 1 o 2. |

## Radioterapia V86-V105

| Variable origen | Variable destino | Relación funcional |
|---|---|---|
| V86 | V87 | Si V86=98, V87=98. Si V86=1, V87 debe ser número de sesiones real. |
| V86 | V88 | Si V86=98, V88=1845-01-01. Si V86=1, V88 debe ser fecha real de inicio. |
| V86 | V89 | Si V86=98, V89=98. Si V86=1, V89 debe estar en catálogo 1, 2, 3, 11, 12 o 13. |
| V86 | V90 | Si V86=98, V90=98. Si V86=1, V90 debe ser CUPS de radioterapia. |
| V86 | V91 | Si V86=98, V91=98. Si V86=1, V91 debe indicar número de IPS que suministran radioterapia. |
| V91 | V92/V93 | El número de IPS define si IPS1 e IPS2 aplican o deben ir en 98. |
| V86/V88 | V94 | La fecha de finalización debe ser 1845 si no aplica, 1800 si no finaliza o fecha real si finaliza. No debe ser anterior al inicio real. |
| V86 | V95 | Si V86=98, V95=98. Si V86=1, V95 debe ser 1, 2 o 3. |
| V95 | V96 | Si V95=2, V96 debe registrar motivo. Si V95 diferente de 2, V96=98. |
| V86/V95 | V97 | Si sólo hubo un esquema o no aplica, V97=1845-01-01. Si hubo último esquema diferente, V97 debe ser fecha real. |
| V86/V97 | V98 | Si no aplica último esquema, V98=98. Si aplica, debe estar en catálogo 1, 2, 3, 11, 12 o 13. |
| V86/V97 | V99 | Si no aplica último esquema, V99=98. Si aplica, debe ser CUPS de radioterapia. |
| V86/V97 | V100 | Si no aplica último esquema, V100=98. Si aplica, debe indicar número de IPS. |
| V100 | V101/V102 | El número de IPS del último esquema define si IPS1 e IPS2 aplican o deben ir en 98. |
| V97/V103 | V103 | La finalización del último esquema debe ser coherente con su inicio: fecha real, 1800 si no finalizó o 1845 si no aplica. |
| V86/V97 | V104 | Si no aplica último esquema, V104=98. Si aplica, debe ser 1, 2 o 3. |
| V104 | V105 | Si V104=2, V105 debe registrar motivo. Si V104 diferente de 2, V105=98. |

---

# Total documentado en este archivo

**240 hallazgos documentados:** **201 errores** y **39 advertencias**.

Este corte incluye detalle de V1-V28, V54-V61, V78-V80 y V86. Para dejar el catálogo continuo hasta V86 falta integrar los hallazgos exactos de V29-V53.9, V62-V77 y V81-V85 desde los módulos correspondientes.
