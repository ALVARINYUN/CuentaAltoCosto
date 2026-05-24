# Catálogo de hallazgos encontrados — V1 a V28

## Total de hallazgos encontrados hasta V28

Este documento consolida la cantidad total de errores y advertencias encontrados en la app hasta la variable V28.

| Concepto | Total |
|---|---:|
| Hallazgos encontrados | 171 |
| Errores | 137 |
| Advertencias | 34 |
| Variables cubiertas | V1 a V28 |

> Este total corresponde al corte actual extraído de las reglas trabajadas en `src/validaciones/reglas/`. El total global definitivo del validador completo queda pendiente hasta cerrar las 134 variables.

---

## Resumen por variable

| Variable | Nombre funcional | Hallazgos | Errores | Advertencias |
|---|---|---:|---:|---:|
| V1 | Primer nombre | 11 | 9 | 2 |
| V2 | Segundo nombre | 11 | 9 | 2 |
| V3 | Primer apellido | 10 | 8 | 2 |
| V4 | Segundo apellido | 11 | 9 | 2 |
| V5 | Tipo de identificación | 8 | 5 | 3 |
| V6 | Número de identificación | 18 | 12 | 6 |
| V7 | Fecha de nacimiento | 4 | 3 | 1 |
| V8 | Sexo | 3 | 3 | 0 |
| V9 | Ocupación | 4 | 3 | 1 |
| V10 | Régimen de afiliación | 3 | 3 | 0 |
| V11 | Código de EPS/EAPB | 1 | 1 | 0 |
| V12 | Pertenencia étnica | 3 | 3 | 0 |
| V13 | Grupo poblacional | 3 | 3 | 0 |
| V14 | Municipio de residencia | 3 | 3 | 0 |
| V15 | Teléfono | 7 | 4 | 3 |
| V16 | Fecha de afiliación | 5 | 4 | 1 |
| V17 | Código CIE-10 de la neoplasia maligna reportada | 9 | 5 | 4 |
| V18 | Fecha de diagnóstico del cáncer reportado | 5 | 4 | 1 |
| V19 | Fecha de remisión o interconsulta | 6 | 6 | 0 |
| V20 | Fecha de ingreso a la institución diagnóstica | 5 | 5 | 0 |
| V21 | Tipo de estudio diagnóstico | 4 | 3 | 1 |
| V22 | Motivo por el cual no tuvo diagnóstico por histopatología | 6 | 5 | 1 |
| V23 | Fecha de recolección de muestra | 7 | 7 | 0 |
| V24 | Fecha del primer informe histopatológico válido | 5 | 5 | 0 |
| V25 | Código de habilitación de la IPS confirmadora | 4 | 2 | 2 |
| V26 | Fecha de primera consulta con médico tratante | 4 | 3 | 1 |
| V27 | Histología del tumor | 6 | 5 | 1 |
| V28 | Grado de diferenciación del tumor sólido maligno | 5 | 5 | 0 |

---

# Detalle de hallazgos por variable


## V1 — Primer nombre

**Total en V1: 11 hallazgos**  
**Errores:** 9  
**Advertencias:** 2

| Código | Tipo | Hallazgo |
|---|---|---|
| `V1-ERROR-001` | Error | Primer nombre vacío |
| `V1-ERROR-002` | Error | Primer nombre no está en mayúscula |
| `V1-ERROR-003` | Error | Primer nombre contiene números |
| `V1-ERROR-004` | Error | Primer nombre contiene símbolos |
| `V1-ERROR-005` | Error | Primer nombre contiene puntos |
| `V1-ERROR-006` | Error | Primer nombre contiene tildes |
| `V1-ERROR-007` | Error | Primer nombre contiene letra Ñ |
| `V1-ERROR-008` | Error | Primer nombre contiene diéresis |
| `V1-ERROR-009` | Error | Primer nombre contiene apóstrofe |
| `V1-ADVERTENCIA-010` | Advertencia | Primer nombre contiene espacios dobles |
| `V1-ADVERTENCIA-011` | Advertencia | Primer nombre tiene espacios sobrantes |

## V2 — Segundo nombre

**Total en V2: 11 hallazgos**  
**Errores:** 9  
**Advertencias:** 2

| Código | Tipo | Hallazgo |
|---|---|---|
| `V2-ERROR-001` | Error | Segundo nombre vacío |
| `V2-ERROR-002` | Error | Comodín NONE escrito incorrectamente |
| `V2-ERROR-003` | Error | Segundo nombre no está en mayúscula |
| `V2-ERROR-004` | Error | Segundo nombre contiene números |
| `V2-ERROR-005` | Error | Segundo nombre contiene símbolos |
| `V2-ERROR-006` | Error | Segundo nombre contiene puntos |
| `V2-ERROR-007` | Error | Segundo nombre contiene tildes |
| `V2-ERROR-008` | Error | Segundo nombre contiene guion |
| `V2-ERROR-009` | Error | Segundo nombre contiene numeral |
| `V2-ADVERTENCIA-010` | Advertencia | Segundo nombre contiene espacios dobles |
| `V2-ADVERTENCIA-011` | Advertencia | Segundo nombre tiene espacios sobrantes |

## V3 — Primer apellido

**Total en V3: 10 hallazgos**  
**Errores:** 8  
**Advertencias:** 2

| Código | Tipo | Hallazgo |
|---|---|---|
| `V3-ERROR-001` | Error | Primer apellido vacío |
| `V3-ERROR-002` | Error | Primer apellido no está en mayúscula |
| `V3-ERROR-003` | Error | Primer apellido contiene números |
| `V3-ERROR-004` | Error | Primer apellido contiene símbolos |
| `V3-ERROR-005` | Error | Primer apellido contiene puntos |
| `V3-ERROR-006` | Error | Primer apellido contiene tildes |
| `V3-ERROR-007` | Error | Primer apellido contiene guion |
| `V3-ERROR-008` | Error | Primer apellido contiene numeral |
| `V3-ADVERTENCIA-009` | Advertencia | Primer apellido contiene espacios dobles |
| `V3-ADVERTENCIA-010` | Advertencia | Primer apellido tiene espacios sobrantes |

## V4 — Segundo apellido

**Total en V4: 11 hallazgos**  
**Errores:** 9  
**Advertencias:** 2

| Código | Tipo | Hallazgo |
|---|---|---|
| `V4-ERROR-001` | Error | Segundo apellido vacío |
| `V4-ERROR-002` | Error | Comodín NOAP escrito incorrectamente |
| `V4-ERROR-003` | Error | Segundo apellido no está en mayúscula |
| `V4-ERROR-004` | Error | Segundo apellido contiene números |
| `V4-ERROR-005` | Error | Segundo apellido contiene símbolos |
| `V4-ERROR-006` | Error | Segundo apellido contiene puntos |
| `V4-ERROR-007` | Error | Segundo apellido contiene tildes |
| `V4-ERROR-008` | Error | Segundo apellido contiene guion |
| `V4-ERROR-009` | Error | Segundo apellido contiene numeral |
| `V4-ADVERTENCIA-010` | Advertencia | Segundo apellido contiene espacios dobles |
| `V4-ADVERTENCIA-011` | Advertencia | Segundo apellido tiene espacios sobrantes |

## V5 — Tipo de identificación

**Total en V5: 8 hallazgos**  
**Errores:** 5  
**Advertencias:** 3

| Código | Tipo | Hallazgo |
|---|---|---|
| `V5-ERROR-001` | Error | Tipo de identificación vacío |
| `V5-ERROR-002` | Error | Tipo de identificación no permitido |
| `V5-ERROR-003` | Error | Tipo de identificación en minúscula |
| `V5-ERROR-004` | Error | Tipo AS no coincide con régimen |
| `V5-ERROR-005` | Error | Tipo MS no coincide con régimen |
| `V5-ADVERTENCIA-006` | Advertencia | CN usado en paciente que no parece recién nacido |
| `V5-ADVERTENCIA-007` | Advertencia | RC usado en paciente adulto |
| `V5-ADVERTENCIA-008` | Advertencia | TI usada en paciente adulto |

## V6 — Número de identificación

**Total en V6: 18 hallazgos**  
**Errores:** 12  
**Advertencias:** 6

| Código | Tipo | Hallazgo |
|---|---|---|
| `V6-ERROR-001` | Error | Número de identificación vacío |
| `V6-ERROR-AS-001` | Error | Consecutivo interno vacío para AS |
| `V6-ERROR-MS-001` | Error | Consecutivo interno vacío para MS |
| `V6-ERROR-AS-002` | Error | Consecutivo interno de AS con formato inválido |
| `V6-ERROR-MS-002` | Error | Consecutivo interno de MS con formato inválido |
| `V6-ERROR-AS-003` | Error | Consecutivo interno de AS supera 17 caracteres |
| `V6-ERROR-MS-003` | Error | Consecutivo interno de MS supera 17 caracteres |
| `V6-ERROR-002` | Error | Número de identificación con caracteres no permitidos |
| `V6-ERROR-003` | Error | Número de identificación de CC con formato inválido |
| `V6-ERROR-004` | Error | Número de identificación de TI con formato inválido |
| `V6-ERROR-005` | Error | Número de identificación de RC con formato inválido |
| `V6-ERROR-006` | Error | Número de identificación de CE con formato inválido |
| `V6-ADVERTENCIA-AS-004` | Advertencia | Consecutivo interno de AS posiblemente incompleto |
| `V6-ADVERTENCIA-MS-004` | Advertencia | Consecutivo interno de MS posiblemente incompleto |
| `V6-ADVERTENCIA-008` | Advertencia | Longitud atípica para cédula de ciudadanía |
| `V6-ADVERTENCIA-009` | Advertencia | Longitud atípica para tarjeta de identidad |
| `V6-ADVERTENCIA-010` | Advertencia | Longitud atípica para registro civil |
| `V6-ADVERTENCIA-011` | Advertencia | Tipo SI requiere revisión de calidad del dato |

## V7 — Fecha de nacimiento

**Total en V7: 4 hallazgos**  
**Errores:** 3  
**Advertencias:** 1

| Código | Tipo | Hallazgo |
|---|---|---|
| `V7-ERROR-001` | Error | Fecha de nacimiento vacía |
| `V7-ERROR-002` | Error | Fecha de nacimiento con formato incorrecto |
| `V7-ERROR-003` | Error | Fecha de nacimiento imposible |
| `V7-ADVERTENCIA-006` | Advertencia | Edad calculada mayor a 120 años |

## V8 — Sexo

**Total en V8: 3 hallazgos**  
**Errores:** 3  
**Advertencias:** 0

| Código | Tipo | Hallazgo |
|---|---|---|
| `V8-ERROR-001` | Error | Sexo vacío |
| `V8-ERROR-002` | Error | Sexo no permitido |
| `V8-ERROR-003` | Error | Sexo en minúscula |

## V9 — Ocupación

**Total en V9: 4 hallazgos**  
**Errores:** 3  
**Advertencias:** 1

| Código | Tipo | Hallazgo |
|---|---|---|
| `V9-ERROR-001` | Error | Ocupación vacía |
| `V9-ERROR-002` | Error | Ocupación no tiene 4 dígitos |
| `V9-ERROR-003` | Error | Ocupación contiene letras o símbolos |
| `V9-ADVERTENCIA-006` | Advertencia | Menor de edad con ocupación revisable |

## V10 — Régimen de afiliación

**Total en V10: 3 hallazgos**  
**Errores:** 3  
**Advertencias:** 0

| Código | Tipo | Hallazgo |
|---|---|---|
| `V10-ERROR-001` | Error | Régimen de afiliación vacío |
| `V10-ERROR-002` | Error | Régimen de afiliación no permitido |
| `V10-ERROR-003` | Error | Régimen de afiliación en minúscula |

## V11 — Código de EPS/EAPB

**Total en V11: 1 hallazgos**  
**Errores:** 1  
**Advertencias:** 0

| Código | Tipo | Hallazgo |
|---|---|---|
| `V11-ERROR-001` | Error | Código de la EPS vacío |

## V12 — Pertenencia étnica

**Total en V12: 3 hallazgos**  
**Errores:** 3  
**Advertencias:** 0

| Código | Tipo | Hallazgo |
|---|---|---|
| `V12-ERROR-001` | Error | Pertenencia étnica vacía |
| `V12-ERROR-002` | Error | Pertenencia étnica fuera de catálogo |
| `V12-ERROR-003` | Error | Pertenencia étnica no numérica |

## V13 — Grupo poblacional

**Total en V13: 3 hallazgos**  
**Errores:** 3  
**Advertencias:** 0

| Código | Tipo | Hallazgo |
|---|---|---|
| `V13-ERROR-001` | Error | Grupo poblacional vacío |
| `V13-ERROR-002` | Error | Grupo poblacional fuera de catálogo |
| `V13-ERROR-003` | Error | Grupo poblacional no numérico |

## V14 — Municipio de residencia

**Total en V14: 3 hallazgos**  
**Errores:** 3  
**Advertencias:** 0

| Código | Tipo | Hallazgo |
|---|---|---|
| `V14-ERROR-001` | Error | Municipio de residencia vacío |
| `V14-ERROR-002` | Error | Municipio de residencia no tiene 5 dígitos |
| `V14-ERROR-003` | Error | Municipio de residencia con formato inválido |

## V15 — Teléfono

**Total en V15: 7 hallazgos**  
**Errores:** 4  
**Advertencias:** 3

| Código | Tipo | Hallazgo |
|---|---|---|
| `V15-ERROR-001` | Error | Teléfono vacío |
| `V15-ERROR-002` | Error | Más de dos teléfonos registrados |
| `V15-ERROR-003` | Error | Teléfono con caracteres no permitidos |
| `V15-ERROR-004` | Error | Teléfonos separados con carácter incorrecto |
| `V15-ADVERTENCIA-005` | Advertencia | Teléfono posiblemente incompleto |
| `V15-ADVERTENCIA-006` | Advertencia | Teléfono con longitud inusual |
| `V15-ADVERTENCIA-007` | Advertencia | Sin teléfono reportado |

## V16 — Fecha de afiliación

**Total en V16: 5 hallazgos**  
**Errores:** 4  
**Advertencias:** 1

| Código | Tipo | Hallazgo |
|---|---|---|
| `V16-ERROR-001` | Error | Fecha de afiliación vacía |
| `V16-ERROR-002` | Error | Fecha de afiliación con formato incorrecto |
| `V16-ERROR-003` | Error | Fecha de afiliación imposible |
| `V16-ERROR-004` | Error | Fecha de afiliación anterior al nacimiento |
| `V16-ADVERTENCIA-007` | Advertencia | Fecha de afiliación antigua |

## V17 — Código CIE-10 de la neoplasia maligna reportada

**Total en V17: 9 hallazgos**  
**Errores:** 5  
**Advertencias:** 4

| Código | Tipo | Hallazgo |
|---|---|---|
| `V17-ERROR-001` | Error | Código CIE-10 vacío |
| `V17-ERROR-002` | Error | Código CIE-10 con formato inválido |
| `V17-ERROR-003` | Error | C80X no es válido |
| `V17-ERROR-004` | Error | Código CIE-10 no existe en el catálogo CAC 2025 |
| `V17-ADVERTENCIA-003` | Advertencia | C80X tiene observación CAC |
| `V17-ADVERTENCIA-005` | Advertencia | Código CIE-10 con observación CAC |
| `V17-ERROR-006` | Error | Código CIE-10 no corresponde al sexo del paciente |
| `V17-ADVERTENCIA-007` | Advertencia | Código CIE-10 con restricción de edad mayor de edad |
| `V17-ADVERTENCIA-008` | Advertencia | C960 requiere revisión diagnóstica específica |

## V18 — Fecha de diagnóstico del cáncer reportado

**Total en V18: 5 hallazgos**  
**Errores:** 4  
**Advertencias:** 1

| Código | Tipo | Hallazgo |
|---|---|---|
| `V18-ERROR-001` | Error | Fecha de diagnóstico vacía |
| `V18-ERROR-002` | Error | Fecha de diagnóstico con formato incorrecto |
| `V18-ERROR-003` | Error | Fecha de diagnóstico imposible |
| `V18-ERROR-004` | Error | Fecha de diagnóstico usa comodín no permitido |
| `V18-ADVERTENCIA-007` | Advertencia | Fecha del diagnóstico no coincide con fecha de patología |

## V19 — Fecha de remisión o interconsulta

**Total en V19: 6 hallazgos**  
**Errores:** 6  
**Advertencias:** 0

| Código | Tipo | Hallazgo |
|---|---|---|
| `V19-ERROR-001` | Error | Fecha de remisión o interconsulta vacía |
| `V19-ERROR-002` | Error | Fecha de remisión o interconsulta con formato incorrecto |
| `V19-ERROR-003` | Error | Fecha de remisión o interconsulta imposible |
| `V19-ERROR-004` | Error | Fecha de remisión o interconsulta usa comodín no permitido |
| `V19-ERROR-007` | Error | Remisión o interconsulta aparece después del ingreso diagnóstico |
| `V19-ERROR-008` | Error | Remisión o interconsulta aparece después del diagnóstico |

## V20 — Fecha de ingreso a la institución diagnóstica

**Total en V20: 5 hallazgos**  
**Errores:** 5  
**Advertencias:** 0

| Código | Tipo | Hallazgo |
|---|---|---|
| `V20-ERROR-001` | Error | Fecha de ingreso diagnóstica vacía |
| `V20-ERROR-002` | Error | Fecha de ingreso diagnóstica con formato incorrecto |
| `V20-ERROR-003` | Error | Fecha de ingreso diagnóstica imposible |
| `V20-ERROR-004` | Error | Fecha de ingreso diagnóstica usa comodín no permitido |
| `V20-ERROR-007` | Error | Ingreso a la institución diagnóstica aparece después del diagnóstico |

## V21 — Tipo de estudio diagnóstico

**Total en V21: 4 hallazgos**  
**Errores:** 3  
**Advertencias:** 1

| Código | Tipo | Hallazgo |
|---|---|---|
| `V21-ERROR-001` | Error | Tipo de estudio diagnóstico vacío |
| `V21-ERROR-002` | Error | Tipo de estudio diagnóstico no numérico |
| `V21-ADVERTENCIA-003` | Advertencia | Código histórico en tipo de estudio diagnóstico |
| `V21-ERROR-004` | Error | Tipo de estudio diagnóstico fuera de catálogo |

## V22 — Motivo por el cual no tuvo diagnóstico por histopatología

**Total en V22: 6 hallazgos**  
**Errores:** 5  
**Advertencias:** 1

| Código | Tipo | Hallazgo |
|---|---|---|
| `V22-ERROR-001` | Error | Motivo sin histopatología vacío cuando V21=7 |
| `V22-ERROR-002` | Error | Motivo sin histopatología vacío |
| `V22-ERROR-003` | Error | Motivo sin histopatología no numérico |
| `V22-ERROR-004` | Error | Motivo sin histopatología fuera de catálogo |
| `V22-ERROR-005` | Error | Motivo incoherente con diagnóstico clínico |
| `V22-ADVERTENCIA-006` | Advertencia | V22 puede no corresponder al tipo de diagnóstico registrado |

## V23 — Fecha de recolección de muestra

**Total en V23: 7 hallazgos**  
**Errores:** 7  
**Advertencias:** 0

| Código | Tipo | Hallazgo |
|---|---|---|
| `V23-ERROR-001` | Error | Fecha de recolección de muestra vacía |
| `V23-ERROR-002` | Error | Fecha de recolección de muestra con formato incorrecto |
| `V23-ERROR-003` | Error | Fecha de recolección de muestra imposible |
| `V23-ERROR-007` | Error | V23 debe indicar que no hubo muestra histopatológica |
| `V23-ERROR-008` | Error | V23 usa 1845-01-01 sin diagnóstico clínico exclusivo |
| `V23-ERROR-009` | Error | La muestra aparece tomada después del informe histopatológico |
| `V23-ERROR-010` | Error | La muestra aparece después de la fecha de diagnóstico |

## V24 — Fecha del primer informe histopatológico válido

**Total en V24: 5 hallazgos**  
**Errores:** 5  
**Advertencias:** 0

| Código | Tipo | Hallazgo |
|---|---|---|
| `V24-ERROR-001` | Error | Fecha del informe histopatológico vacía |
| `V24-ERROR-002` | Error | Fecha del informe histopatológico con formato incorrecto |
| `V24-ERROR-003` | Error | Fecha del informe histopatológico imposible |
| `V24-ERROR-007` | Error | V24 debe indicar que no hubo informe histopatológico |
| `V24-ERROR-008` | Error | V24 usa 1845-01-01 sin diagnóstico clínico exclusivo |

## V25 — Código de habilitación de la IPS confirmadora

**Total en V25: 4 hallazgos**  
**Errores:** 2  
**Advertencias:** 2

| Código | Tipo | Hallazgo |
|---|---|---|
| `V25-ERROR-001` | Error | Código de IPS de confirmación diagnóstica obligatorio |
| `V25-ERROR-002` | Error | Código de IPS con caracteres no permitidos |
| `V25-ADVERTENCIA-003` | Advertencia | Código de IPS menor a 12 dígitos |
| `V25-ADVERTENCIA-004` | Advertencia | Código de IPS mayor a 12 dígitos |

## V26 — Fecha de primera consulta con médico tratante

**Total en V26: 4 hallazgos**  
**Errores:** 3  
**Advertencias:** 1

| Código | Tipo | Hallazgo |
|---|---|---|
| `V26-ERROR-001` | Error | Fecha de primera consulta con médico tratante obligatoria |
| `V26-ERROR-002` | Error | Formato de fecha incorrecto en V26 |
| `V26-ERROR-003` | Error | Fecha inexistente en V26 |
| `V26-ADV-001` | Advertencia | Primera consulta con médico tratante anterior al diagnóstico |

## V27 — Histología del tumor

**Total en V27: 6 hallazgos**  
**Errores:** 5  
**Advertencias:** 1

| Código | Tipo | Hallazgo |
|---|---|---|
| `V27-ERROR-001` | Error | Histología del tumor obligatoria |
| `V27-ERROR-002` | Error | Histología debe ser un número válido |
| `V27-ERROR-003` | Error | Código de histología no permitido |
| `V27-ERROR-004` | Error | V27 debe ser 98 cuando el diagnóstico fue clínico exclusivamente |
| `V27-ERROR-006` | Error | Célula pequeña solo es válida para cáncer de pulmón |
| `V27-ADV-001` | Advertencia | Histología desconocida |

## V28 — Grado de diferenciación del tumor sólido maligno

**Total en V28: 5 hallazgos**  
**Errores:** 5  
**Advertencias:** 0

| Código | Tipo | Hallazgo |
|---|---|---|
| `V28-ERROR-001` | Error | Falta registrar el grado de diferenciación del tumor |
| `V28-ERROR-002` | Error | Grado de diferenciación con formato inválido |
| `V28-ERROR-003` | Error | Código de grado de diferenciación fuera de catálogo |
| `V28-ERROR-004` | Error | V28 debe ser 98 cuando el diagnóstico fue clínico exclusivamente |
| `V28-ERROR-005` | Error | V28 usa 98 pero V21 no indica diagnóstico clínico exclusivamente |

---

# Total final

 **171 hallazgos encontrados hasta V28**: **137 errores** y **34 advertencias**.
