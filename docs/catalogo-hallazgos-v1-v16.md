# Catálogo de hallazgos — Sprint 1

**Proyecto:** Validador CAC — Cohorte Cáncer  
**Bloque:** Identificación del usuario  
**Variables:** V1 a V16  
**Sprint:** Sprint 1  
**Estado:** En construcción funcional  
**Fecha de documentación:** Mayo 2026  

---

## 1. Objetivo del documento

Este documento registra los hallazgos funcionales posibles definidos hasta el momento para el bloque de identificación del usuario, correspondiente a las variables V1 a V16 del reporte CAC.

El propósito es dejar una base clara para:

- implementar reglas de validación;
- clasificar errores y advertencias;
- probar el motor de validación;
- mostrar mensajes comprensibles al usuario;
- documentar el cierre técnico del Sprint 1.

---

## 2. Alcance actual

Hasta este punto, el aplicativo ya cuenta con una interfaz inicial que permite:

- cargar archivo Excel;
- leer archivo `.xlsx` usando SheetJS;
- validar estructura mínima del Sprint 1;
- reconocer columnas V1 a V16;
- habilitar el botón de validación;
- procesar registros en memoria;
- mostrar resultados por paciente;
- clasificar hallazgos por errores y advertencias.

El alcance actual **no incluye todavía**:

- validación completa contra catálogos oficiales externos;
- DIVIPOLA real completo;
- EAPB oficial;
- CIUO oficial;
- persistencia en base de datos;
- usuarios y roles;
- backend institucional;
- exportación final oficial CAC.

---

## 3. Variables cubiertas

| Variable | Nombre funcional |
|---|---|
| V1 | Primer nombre |
| V2 | Segundo nombre |
| V3 | Primer apellido |
| V4 | Segundo apellido |
| V5 | Tipo de identificación |
| V6 | Número de identificación |
| V7 | Fecha de nacimiento |
| V8 | Sexo |
| V9 | Ocupación |
| V10 | Régimen de afiliación |
| V11 | Código EAPB o entidad territorial |
| V12 | Pertenencia étnica |
| V13 | Grupo poblacional |
| V14 | Municipio de residencia |
| V15 | Número telefónico |
| V16 | Fecha de afiliación |

---

# 4. Catálogo de hallazgos posibles

## V1 — Primer nombre

| Código | Severidad | Hallazgo |
|---|---|---|
| V1-ERROR-001 | Error | Primer nombre vacío. |
| V1-ERROR-002 | Error | Primer nombre en minúscula o mezcla de mayúscula/minúscula. |
| V1-ERROR-003 | Error | Primer nombre contiene números. |
| V1-ERROR-004 | Error | Primer nombre contiene símbolos o caracteres especiales. |
| V1-ERROR-005 | Error | Primer nombre contiene puntos. |
| V1-ERROR-006 | Error | Primer nombre contiene tildes. |
| V1-ERROR-007 | Error | Primer nombre contiene letra ñ. |
| V1-ERROR-008 | Error | Primer nombre contiene diéresis. |
| V1-ERROR-009 | Error | Primer nombre contiene apóstrofe. |
| V1-ADVERTENCIA-010 | Advertencia | Primer nombre contiene espacios dobles. |
| V1-ADVERTENCIA-011 | Advertencia | Primer nombre tiene espacios al inicio o al final. |
| V1-ADVERTENCIA-012 | Advertencia | Primer nombre parece contener un apellido. |

**Total V1:** 12 hallazgos.

---

## V2 — Segundo nombre

| Código | Severidad | Hallazgo |
|---|---|---|
| V2-ERROR-001 | Error | Segundo nombre vacío sin usar `NONE`. |
| V2-ERROR-002 | Error | `NONE` escrito en minúscula o con formato incorrecto. |
| V2-ERROR-003 | Error | Segundo nombre en minúscula o mezcla de mayúscula/minúscula. |
| V2-ERROR-004 | Error | Segundo nombre contiene números. |
| V2-ERROR-005 | Error | Segundo nombre contiene símbolos o caracteres especiales. |
| V2-ERROR-006 | Error | Segundo nombre contiene puntos. |
| V2-ERROR-007 | Error | Segundo nombre contiene tildes. |
| V2-ERROR-008 | Error | Segundo nombre contiene guion. |
| V2-ERROR-009 | Error | Segundo nombre contiene carácter numeral `#`. |
| V2-ADVERTENCIA-010 | Advertencia | Segundo nombre contiene espacios dobles. |
| V2-ADVERTENCIA-011 | Advertencia | Segundo nombre tiene espacios al inicio o al final. |
| V2-ADVERTENCIA-012 | Advertencia | Segundo nombre parece contener un apellido. |
| V2-ADVERTENCIA-013 | Advertencia | Segundo nombre parece repetir el primer nombre. |

**Total V2:** 13 hallazgos.

---

## V3 — Primer apellido

| Código | Severidad | Hallazgo |
|---|---|---|
| V3-ERROR-001 | Error | Primer apellido vacío. |
| V3-ERROR-002 | Error | Primer apellido en minúscula o mezcla de mayúscula/minúscula. |
| V3-ERROR-003 | Error | Primer apellido contiene números. |
| V3-ERROR-004 | Error | Primer apellido contiene símbolos o caracteres especiales. |
| V3-ERROR-005 | Error | Primer apellido contiene puntos. |
| V3-ERROR-006 | Error | Primer apellido contiene tildes. |
| V3-ERROR-007 | Error | Primer apellido contiene guion. |
| V3-ERROR-008 | Error | Primer apellido contiene carácter numeral `#`. |
| V3-ADVERTENCIA-009 | Advertencia | Primer apellido contiene espacios dobles. |
| V3-ADVERTENCIA-010 | Advertencia | Primer apellido tiene espacios al inicio o al final. |
| V3-ADVERTENCIA-011 | Advertencia | Primer apellido parece estar registrado como nombre. |

**Total V3:** 11 hallazgos.

---

## V4 — Segundo apellido

| Código | Severidad | Hallazgo |
|---|---|---|
| V4-ERROR-001 | Error | Segundo apellido vacío sin usar `NOAP`. |
| V4-ERROR-002 | Error | `NOAP` escrito en minúscula o con formato incorrecto. |
| V4-ERROR-003 | Error | Segundo apellido en minúscula o mezcla de mayúscula/minúscula. |
| V4-ERROR-004 | Error | Segundo apellido contiene números. |
| V4-ERROR-005 | Error | Segundo apellido contiene símbolos o caracteres especiales. |
| V4-ERROR-006 | Error | Segundo apellido contiene puntos. |
| V4-ERROR-007 | Error | Segundo apellido contiene tildes. |
| V4-ERROR-008 | Error | Segundo apellido contiene guion. |
| V4-ERROR-009 | Error | Segundo apellido contiene carácter numeral `#`. |
| V4-ADVERTENCIA-010 | Advertencia | Segundo apellido contiene espacios dobles. |
| V4-ADVERTENCIA-011 | Advertencia | Segundo apellido tiene espacios al inicio o al final. |

**Total V4:** 11 hallazgos.

---

## V5 — Tipo de identificación

| Código | Severidad | Hallazgo |
|---|---|---|
| V5-ERROR-001 | Error | Tipo de identificación vacío. |
| V5-ERROR-002 | Error | Tipo de identificación no pertenece al catálogo permitido. |
| V5-ERROR-003 | Error | Tipo de identificación en minúscula. |
| V5-ERROR-004 | Error | V5 = `AS` y V10 diferente de `S`. |
| V5-ERROR-005 | Error | V5 = `MS` y V10 diferente de `S`. |
| V5-ADVERTENCIA-006 | Advertencia | Tipo `CN` usado en paciente que no parece recién nacido. |
| V5-ADVERTENCIA-007 | Advertencia | Tipo `RC` usado en paciente con edad no coherente. |
| V5-ADVERTENCIA-008 | Advertencia | Tipo `TI` usado en paciente adulto. |

**Total V5:** 8 hallazgos.

---

## V6 — Número de identificación

| Código | Severidad | Hallazgo |
|---|---|---|
| V6-ERROR-001 | Error | Número de identificación vacío. |
| V6-ERROR-002 | Error | Número contiene caracteres no permitidos. |
| V6-ERROR-003 | Error | V5 = `CC` y V6 no es numérico. |
| V6-ERROR-004 | Error | V5 = `TI` y V6 no es numérico. |
| V6-ERROR-005 | Error | V5 = `RC` y V6 no es numérico. |
| V6-ERROR-006 | Error | V5 = `AS` y V6 no es numérico/consecutivo válido. |
| V6-ERROR-007 | Error | V5 = `MS` y V6 no es numérico/consecutivo válido. |
| V6-ADVERTENCIA-008 | Advertencia | Longitud atípica para `CC`. |
| V6-ADVERTENCIA-009 | Advertencia | Longitud atípica para `TI`. |
| V6-ADVERTENCIA-010 | Advertencia | Longitud atípica para `RC`. |
| V6-ADVERTENCIA-011 | Advertencia | V5 = `SI` requiere justificación documental. |

**Total V6:** 11 hallazgos.

---

## V7 — Fecha de nacimiento

| Código | Severidad | Hallazgo |
|---|---|---|
| V7-ERROR-001 | Error | Fecha de nacimiento vacía. |
| V7-ERROR-002 | Error | Fecha de nacimiento no tiene formato `AAAA-MM-DD`. |
| V7-ERROR-003 | Error | Fecha de nacimiento imposible. |
| V7-ERROR-004 | Error | Fecha de nacimiento posterior a V16. |
| V7-ERROR-005 | Error | Fecha de nacimiento posterior a la fecha de corte `2025-05-05`. |
| V7-ADVERTENCIA-006 | Advertencia | Edad calculada mayor a 120 años. |
| V7-ADVERTENCIA-007 | Advertencia | Fecha de nacimiento muy reciente para grupo poblacional no coherente. |

**Total V7:** 7 hallazgos.

---

## V8 — Sexo

| Código | Severidad | Hallazgo |
|---|---|---|
| V8-ERROR-001 | Error | Sexo vacío. |
| V8-ERROR-002 | Error | Sexo diferente de `M` o `F`. |
| V8-ERROR-003 | Error | Sexo en minúscula. |
| V8-ADVERTENCIA-004 | Advertencia | Sexo `F` con grupo poblacional incompatible si aplica. |
| V8-ADVERTENCIA-005 | Advertencia | Sexo `M` con grupo poblacional embarazo/lactancia. |

**Total V8:** 5 hallazgos.

---

## V9 — Ocupación

| Código | Severidad | Hallazgo |
|---|---|---|
| V9-ERROR-001 | Error | Ocupación vacía. |
| V9-ERROR-002 | Error | Ocupación no tiene 4 dígitos. |
| V9-ERROR-003 | Error | Ocupación contiene letras o símbolos. |
| V9-ERROR-004 | Error | Código no existe en catálogo CIUO y no es comodín. |
| V9-ADVERTENCIA-005 | Advertencia | Uso de `9999`, dato no informado. |
| V9-ADVERTENCIA-006 | Advertencia | Menor de edad con ocupación diferente de `9998`. |
| V9-ADVERTENCIA-007 | Advertencia | Uso excesivo de `9999` en la base. |

**Total V9:** 7 hallazgos.

---

## V10 — Régimen de afiliación

| Código | Severidad | Hallazgo |
|---|---|---|
| V10-ERROR-001 | Error | Régimen vacío. |
| V10-ERROR-002 | Error | Régimen no pertenece al catálogo permitido. |
| V10-ERROR-003 | Error | Régimen en minúscula. |
| V10-ERROR-004 | Error | V5 = `AS` y V10 diferente de `S`. |
| V10-ERROR-005 | Error | V5 = `MS` y V10 diferente de `S`. |
| V10-ADVERTENCIA-006 | Advertencia | Régimen no coherente con tipo de entidad reportada en V11. |

**Total V10:** 6 hallazgos.

---

## V11 — Código EAPB o entidad territorial

| Código | Severidad | Hallazgo |
|---|---|---|
| V11-ERROR-001 | Error | Código EAPB / entidad territorial vacío. |
| V11-ERROR-002 | Error | Código no existe en catálogo EAPB. |
| V11-ERROR-003 | Error | Código no cumple formato territorial `DD000`. |
| V11-ERROR-004 | Error | Código territorial tiene departamento inválido. |
| V11-ERROR-005 | Error | Código territorial no termina en `000`. |
| V11-ADVERTENCIA-006 | Advertencia | EAPB no corresponde al régimen reportado en V10. |
| V11-ADVERTENCIA-007 | Advertencia | Entidad territorial no coincide con departamento de residencia V14. |

**Total V11:** 7 hallazgos.

---

## V12 — Pertenencia étnica

| Código | Severidad | Hallazgo |
|---|---|---|
| V12-ERROR-001 | Error | Pertenencia étnica vacía. |
| V12-ERROR-002 | Error | Código de pertenencia étnica no pertenece al catálogo. |
| V12-ERROR-003 | Error | Código contiene letras o símbolos. |
| V12-ADVERTENCIA-004 | Advertencia | Incoherencia con grupo poblacional V13. |

**Total V12:** 4 hallazgos.

---

## V13 — Grupo poblacional

| Código | Severidad | Hallazgo |
|---|---|---|
| V13-ERROR-001 | Error | Grupo poblacional vacío. |
| V13-ERROR-002 | Error | Grupo poblacional no pertenece al catálogo. |
| V13-ERROR-003 | Error | Grupo poblacional contiene letras o símbolos. |
| V13-ADVERTENCIA-004 | Advertencia | V13 = `62` comunidad indígena, pero V12 diferente de `1`. |
| V13-ADVERTENCIA-005 | Advertencia | V13 = `10` población ROM, pero V12 diferente de `2`. |
| V13-ADVERTENCIA-006 | Advertencia | V13 = `11` población raizal, pero V12 diferente de `3`. |
| V13-ADVERTENCIA-007 | Advertencia | V13 = `16` afrocolombiano, pero V12 diferente de `5`. |
| V13-ADVERTENCIA-008 | Advertencia | V13 = `33` mujer embarazada, pero V8 diferente de `F`. |
| V13-ADVERTENCIA-009 | Advertencia | V13 = `34` mujer lactante, pero V8 diferente de `F`. |
| V13-ADVERTENCIA-010 | Advertencia | V13 = `31` adulto mayor, pero edad calculada menor de 60 años. |
| V13-ADVERTENCIA-011 | Advertencia | V13 = `6` recién nacido, pero edad calculada mayor a 28 días. |
| V13-ADVERTENCIA-012 | Advertencia | V13 = `7` discapacidad general; revisar si debe especificarse código 50-60. |

**Total V13:** 12 hallazgos.

---

## V14 — Municipio de residencia

| Código | Severidad | Hallazgo |
|---|---|---|
| V14-ERROR-001 | Error | Municipio de residencia vacío. |
| V14-ERROR-002 | Error | DIVIPOLA no tiene exactamente 5 dígitos. |
| V14-ERROR-003 | Error | DIVIPOLA contiene letras o símbolos. |
| V14-ERROR-004 | Error | Código de departamento DANE inválido. |
| V14-ERROR-005 | Error | Código de municipio inexistente dentro del departamento. |
| V14-ERROR-006 | Error | Combinación departamento/municipio inexistente. |
| V14-ADVERTENCIA-007 | Advertencia | V14 no coincide con departamento territorial reportado en V11. |
| V14-ADVERTENCIA-008 | Advertencia | Posible confusión entre municipio de residencia y sede de atención. |

**Total V14:** 8 hallazgos.

---

## V15 — Número telefónico

| Código | Severidad | Hallazgo |
|---|---|---|
| V15-ERROR-001 | Error | Teléfono vacío sin usar comodín `0`. |
| V15-ERROR-002 | Error | Más de dos teléfonos registrados. |
| V15-ERROR-003 | Error | Teléfono contiene caracteres no permitidos. |
| V15-ERROR-004 | Error | Teléfonos separados con un carácter diferente al guion medio. |
| V15-ADVERTENCIA-005 | Advertencia | Número incompleto. |
| V15-ADVERTENCIA-006 | Advertencia | Número con longitud inusual. |
| V15-ADVERTENCIA-007 | Advertencia | Comodín `0` usado; no hay dato de contacto. |
| V15-ADVERTENCIA-008 | Advertencia | Teléfono repetido dos veces. |

**Total V15:** 8 hallazgos.

---

## V16 — Fecha de afiliación

| Código | Severidad | Hallazgo |
|---|---|---|
| V16-ERROR-001 | Error | Fecha de afiliación vacía. |
| V16-ERROR-002 | Error | Fecha de afiliación no tiene formato `AAAA-MM-DD`. |
| V16-ERROR-003 | Error | Fecha de afiliación imposible. |
| V16-ERROR-004 | Error | Fecha de afiliación anterior a fecha de nacimiento V7. |
| V16-ERROR-005 | Error | Fecha de afiliación posterior a fecha de corte `2025-05-05`. |
| V16-ERROR-006 | Error | V10 = `C` o `S` y V16 anterior a `1995-01-01`. |
| V16-ADVERTENCIA-007 | Advertencia | Fecha de afiliación muy antigua o sospechosa según régimen. |
| V16-ADVERTENCIA-008 | Advertencia | Fecha de afiliación inconsistente con entidad reportada en V11. |

**Total V16:** 8 hallazgos.

---

# 5. Resumen cuantitativo

| Variable | Total de hallazgos posibles |
|---|---:|
| V1 | 12 |
| V2 | 13 |
| V3 | 11 |
| V4 | 11 |
| V5 | 8 |
| V6 | 11 |
| V7 | 7 |
| V8 | 5 |
| V9 | 7 |
| V10 | 6 |
| V11 | 7 |
| V12 | 4 |
| V13 | 12 |
| V14 | 8 |
| V15 | 8 |
| V16 | 8 |
| **Total general** | **138** |

---

# 6. Clasificación por nivel de implementación

## Nivel 1 — MVP obligatorio Sprint 1

Debe cubrir aproximadamente entre 50 y 60 hallazgos esenciales:

- campos vacíos;
- formatos básicos;
- mayúsculas;
- catálogos cerrados simples;
- fechas válidas;
- coherencia V5/V10;
- coherencia V7/V16;
- formato DIVIPOLA básico;
- formato teléfono básico.

## Nivel 2 — Validador robusto

Debe cubrir aproximadamente entre 90 y 100 hallazgos:

- advertencias por calidad del dato;
- edades atípicas;
- longitud atípica de documentos;
- coherencias V12/V13;
- coherencias V8/V13;
- reglas de fecha de corte;
- validaciones más detalladas por tipo de documento.

## Nivel 3 — Auditoría fina completa

Debe cubrir 130 o más hallazgos:

- catálogos externos reales;
- DIVIPOLA oficial;
- EAPB oficial;
- CIUO oficial;
- reglas cruzadas avanzadas;
- soporte documental;
- alertas por patrones de mala calidad de datos;
- trazabilidad completa por regla.

---

# 7. Estado actual del motor

El motor implementado actualmente corresponde a una primera base funcional de Sprint 1.

Cubre principalmente:

- validación de estructura V1-V16;
- lectura de Excel;
- campos obligatorios;
- mayúsculas básicas;
- catálogos básicos;
- fechas en formato ISO;
- teléfono básico;
- DIVIPOLA básico de 5 dígitos;
- coherencia entre V5 y V10;
- coherencia entre V16 y V7;
- visualización de resultados por paciente.

Pendiente por completar:

- códigos únicos de hallazgo;
- mayor separación entre error y advertencia;
- reglas específicas de tildes, ñ, diéresis y apóstrofes;
- advertencias por espacios dobles;
- fecha de corte;
- validación 1995-01-01 para EPS;
- coherencias V12/V13;
- coherencias V8/V13;
- longitudes atípicas de documento;
- catálogos externos reales.

---

# 8. Decisión técnica

Por ahora se documentan los 138 hallazgos posibles, pero no se implementan todos inmediatamente.

La decisión técnica es avanzar así:

1. cerrar el Nivel 1 obligatorio del Sprint 1;
2. probarlo con Excel controlado;
3. corregir errores de visualización y conteo;
4. documentar evidencia;
5. después avanzar al Nivel 2;
6. dejar Nivel 3 para cuando existan catálogos externos oficiales cargados.

---

# 9. Criterio de cierre Sprint 1

El Sprint 1 podrá considerarse cerrado cuando el aplicativo permita:

- cargar un Excel válido;
- validar estructura V1-V16;
- procesar pacientes;
- mostrar errores y advertencias por paciente;
- buscar por documento;
- mostrar resumen de pacientes procesados;
- diferenciar errores de advertencias;
- documentar qué reglas están implementadas y cuáles quedan pendientes;
- ejecutar una batería de pruebas controladas con resultados esperados.