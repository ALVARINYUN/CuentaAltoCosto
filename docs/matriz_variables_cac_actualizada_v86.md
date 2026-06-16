# Matriz de Variables CAC — actualización funcional a V86

**Documento técnico fundamental del sistema.**

Este documento organiza la matriz funcional del **Validador CAC — Cáncer**. Cada validación, regla, campo reconocido y trazabilidad del sistema debe derivarse del instructivo oficial CAC y de esta matriz. Si cambia el instructivo CAC, este debe ser uno de los primeros documentos en actualizarse.

**Fuente base:** Instructivo CAC-IEP1-I01, Resolución 0247/2014, medición enero 2025.  
**Total de variables oficiales:** 134.  
**Campos expandidos en archivo plano:** 168, incluyendo subvariables.  
**Estado del documento:** Actualización funcional en curso según avance del proyecto.  
**Variables documentadas:** Matriz base organizada de V1 a V134.  
**Avance funcional validado:** V1 a V86.  
**Siguiente variable de trabajo:** V87.  
**Módulo funcional actual:** Módulo de radioterapia.  
**Módulo técnico actual para nuevas variables:** `src/validaciones/reglas/modulo17.js`.

---

## Reglas operativas de actualización

- El desarrollo es progresivo y acumulativo.
- No tocar variables cerradas salvo bug real confirmado.
- No reemplazar `src/validaciones/reglas/modulo15.js`; cerrado para el bloque de terapia sistémica y medicamentos hasta V77.
- No reemplazar `src/validaciones/reglas/modulo16.js`; cerrado para cirugía hasta V85.
- Desde V86 en adelante continuar en `src/validaciones/reglas/modulo17.js`.
- Confirmar encabezado real antes de codificar o generar Excel de prueba.
- No inventar reglas no soportadas por el instructivo oficial.
- Si la validación depende de variables futuras, no bloquear todavía; documentar trazabilidad pendiente.
- En Excel de prueba, usar una fila base limpia real de la variable inmediatamente anterior.
- No generar Excel “al ojo”.
- No entregar Excel de prueba si aparecen hallazgos de variables anteriores.

---

## Formato de documentación por variable

```text
### V[número] — [Nombre]

**Módulo:** [Módulo al que pertenece]
**Tipo de dato:** [Texto / Fecha / Numérico / Código / Catálogo]
**Formato:** [Formato esperado]
**Longitud:** [Si aplica]
**Catálogo de referencia:** [Si aplica]
**Comodines permitidos:** [Si aplica]
**Dependencias:** [Variables relacionadas]
**Reglas de validación:** [Específicas]
**Reglas de excepción:** [Casos especiales]
**Soporte documental:** [Sí/No]
**Severidad:** [Error / Advertencia / Información]
```

---

## Estado funcional actualizado

| Bloque | Estado | Observaciones |
|---|---|---|
| V1-V16 | Cerrado funcional | Identificación del usuario. |
| V17-V24 | Cerrado funcional | Diagnóstico inicial. |
| V25-V28 | Cerrado funcional | Confirmación diagnóstica, histología y diferenciación. |
| V29-V35 | Cerrado funcional | Estadificación inicial y Dukes. |
| V36-V44 | Cerrado funcional | Linfomas, mieloma, riesgo, intervención médica y antecedentes. |
| V45-V60 | Cerrado funcional | Primer o único esquema de terapia sistémica. |
| V61-V73 | Cerrado funcional | Último esquema de terapia sistémica. |
| V74-V85 | Cerrado funcional | Cirugía en el periodo de reporte actual. |
| V86 | Cerrado funcional | Inicio del bloque de radioterapia. |
| V87-V105 | Pendiente | Continuación del bloque de radioterapia. |
| V106-V110 | Pendiente | Trasplante de células progenitoras hematopoyéticas. |
| V111-V124 | Pendiente | Tratamiento complementario. |
| V125-V134 | Pendiente | Situación actual y resultado. |

---

# Bloque V61-V73 — Último esquema de quimioterapia o terapia sistémica

## Trazabilidad general del bloque

| Variable | Depende de | Regla funcional principal |
|---|---|---|
| V61 | V45 | Si V45=98, V61=98. Si V45=1, V61 debe registrar ubicación temporal válida o 97 si sólo recibió un esquema. |
| V62 | V61 | Fecha de inicio del último esquema. Si V61=97 o 98, V62=1845-01-01. |
| V63 | V61 | Número de IPS que suministran último esquema. Si V61=97 o 98, V63=98. |
| V64 | V63/V61 | IPS1 del último esquema. Si no aplica, V64=98. Si aplica, código de habilitación de 12 dígitos o regla permitida. |
| V65 | V63/V61 | IPS2 del último esquema. Si no aplica segunda IPS, V65=98. |
| V66 | V61/V45 | Número de medicamentos propuestos en último esquema. Si no recibió segundo/último esquema o V45=98, V66=98. |
| V66.1-V66.9 | V66/V61/V45 | Medicamentos ATC administrados en último esquema. V66.1 permite ATC o 98; V66.2-V66.9 permiten ATC, 97 o 98 según secuencia. |
| V67-V69 | V61/V66.1-V66.9 | Medicamentos adicionales no deben repetir los reportados en V66.1-V66.9. |
| V70 | V45/V61 | Quimioterapia intratecal en último esquema: 1, 2 o 98 según aplicación. |
| V71 | V62/V61 | Fecha de finalización del último esquema: fecha real, 1800-01-01 si no finaliza, 1845-01-01 si no aplica. |
| V72 | V61/V71 | Características actuales del último esquema: 1, 2, 3 o 98. |
| V73 | V72 | Motivo de finalización prematura. Sólo aplica si V72=2; si no, V73=98. |

---

## V61 — Ubicación temporal del último esquema de quimioterapia o terapia sistémica

**Módulo:** Último esquema de terapia sistémica  
**Estado:** Cerrada funcional.  
**Tipo de dato:** Catálogo cerrado.  
**Dependencias:** V45.  
**Trazabilidad:** V45 → V61 → V62-V73.

**Valores permitidos:**

| Código | Descripción |
|---:|---|
| 1 | Neoadyuvancia, manejo inicial prequirúrgico. |
| 2 | Tratamiento inicial curativo sin cirugía sugerida. |
| 3 | Adyuvancia, manejo inicial postquirúrgico. |
| 11 | Manejo de progresión o recaída. |
| 12 | Manejo de enfermedad metastásica. |
| 13 | Cambio por toxicidad. |
| 14 | Manejo paliativo, sin manejo de recaída ni enfermedad metastásica. |
| 97 | Sólo recibió un esquema de quimioterapia en este periodo y en V45 seleccionó 1. V62-V73 deben registrar No Aplica. |
| 98 | No aplica, si V45=98. |

**Reglas de validación:**

| Código | Tipo | Regla |
|---|---|---|
| `V61-ERROR-001` | Error | V61 vacía. |
| `V61-ERROR-002` | Error | Valor fuera del catálogo permitido. |
| `V61-ERROR-003` | Error | V45=98, pero V61 no está en 98. |
| `V61-ERROR-004` | Error | V45=1, pero V61 está en 98. |
| `V61-ADVERTENCIA-001` | Advertencia | V61=97 requiere que V62-V73 queden en No Aplica. |

---

## V62 — Fecha de inicio del último esquema de quimioterapia o terapia sistémica

**Módulo:** Último esquema de terapia sistémica  
**Estado:** Cerrada funcional; detalle de códigos pendiente de integrar al catálogo.  
**Tipo de dato:** Fecha.  
**Formato:** AAAA-MM-DD.  
**Comodines permitidos:** 1845-01-01 para No Aplica.  
**Dependencias:** V61.  
**Trazabilidad:** V45 → V61 → V62.

**Reglas funcionales esperadas según instructivo:**

| Condición | Regla |
|---|---|
| V61=97 o V61=98 | V62 debe ser 1845-01-01. |
| V61 en 1,2,3,11,12,13,14 | V62 debe ser fecha real en formato AAAA-MM-DD. |
| Fecha parcial conocida sólo por año y mes | Registrar día 15. |

---

## V63 — Número de IPS que suministran el último esquema

**Módulo:** Último esquema de terapia sistémica  
**Estado:** Cerrada funcional; detalle de códigos pendiente de integrar al catálogo.  
**Tipo de dato:** Numérico.  
**Comodines permitidos:** 98 No Aplica.  
**Dependencias:** V61.  
**Trazabilidad:** V61 → V63 → V64/V65.

**Reglas funcionales esperadas según instructivo:**

| Condición | Regla |
|---|---|
| V61=97 o V61=98 | V63 debe ser 98. |
| V61 indica último esquema real | V63 debe registrar número de IPS que suministran el esquema. |
| V63=1 | V64 aplica y V65 debe ser 98. |
| V63=2 | V64 y V65 aplican. |

---

## V64 — Código de la IPS1 que suministra el último esquema

**Módulo:** Último esquema de terapia sistémica  
**Estado:** Cerrada funcional; detalle de códigos pendiente de integrar al catálogo.  
**Encabezado real confirmado:** `v64cdigodelaips1quesuministraell`  
**Tipo de dato:** Código de habilitación IPS.  
**Formato:** 12 dígitos, incluido cero inicial.  
**Comodines permitidos:** 98 No Aplica.  
**Dependencias:** V61, V63.  
**Trazabilidad:** V61 → V63 → V64.

**Reglas funcionales esperadas según instructivo:**

| Condición | Regla |
|---|---|
| Tratamiento oral | Registrar IPS que prescribió el tratamiento, no operador logístico de entrega. |
| V61=97 o 98 / V63=98 | V64 debe ser 98. |
| V63 indica al menos una IPS | V64 debe registrar código de habilitación válido. |

---

## V65 — Código de la IPS2 que suministra el último esquema

**Módulo:** Último esquema de terapia sistémica  
**Estado:** Cerrada funcional; detalle de códigos pendiente de integrar al catálogo.  
**Encabezado real confirmado:** `v65cdigodelaips2quesuministraell`  
**Tipo de dato:** Código de habilitación IPS.  
**Formato:** 12 dígitos, incluido cero inicial.  
**Comodines permitidos:** 98 No Aplica.  
**Dependencias:** V61, V63, V64.  
**Trazabilidad:** V61 → V63 → V64 → V65.

**Reglas funcionales esperadas según instructivo:**

| Condición | Regla |
|---|---|
| V63=1 o V63=98 | V65 debe ser 98. |
| V63=2 | V65 debe registrar código de habilitación válido. |
| Tratamiento oral | Registrar IPS que prescribió el tratamiento, no operador logístico. |

---

## V66 — Número de medicamentos propuestos en último esquema

**Módulo:** Último esquema de terapia sistémica  
**Estado:** Cerrada funcional.  
**Encabezado real confirmado:** `v66cuantosmedicamentosantineopls`  
**Tipo de dato:** Numérico.  
**Comodines permitidos:** 98 No Aplica.  
**Dependencias:** V45, V61.  
**Trazabilidad:** V45 → V61 → V66 → V66.1-V66.9.

**Reglas funcionales:**

| Condición | Regla |
|---|---|
| No recibió segundo/último esquema o V45=98 | V66 debe ser 98. |
| Hay último esquema real | V66 debe registrar número de medicamentos propuestos. |
| V66=98 | No debe interpretarse como 98 medicamentos. Es comodín No Aplica. |
| V66 numérico real | Habilita las posiciones V66.1 a V66.9 según cantidad reportada. |

---

## V66.1-V66.9 — Medicamentos administrados en último esquema

**Módulo:** Último esquema de terapia sistémica  
**Estado:** Cerradas funcionalmente.  
**Tipo de dato:** Código ATC / comodín.  
**Catálogo:** ATC cargado en `src/catalogos/atc.js`.  
**Dependencias:** V45, V61, V66.  
**Trazabilidad:** V45 → V61 → V66 → V66.1-V66.9.

**Encabezados reales confirmados:**

| Variable | Encabezado real |
|---|---|
| V66.1 | `v661medicamentoadm1` |
| V66.2 | `v662medicamentoadm2` |
| V66.3 | `v663medicamentoadm3` |
| V66.4 | `v664medicamentoadm4` |
| V66.5 | `v665medicamentoadm5` |
| V66.6 | `v666medicamentoadm6` |
| V66.7 | `v667medicamentoadm7` |
| V66.8 | `v668medicamentoadm8` |
| V66.9 | `v669medicamentoadm9` |

**Reglas funcionales:**

| Condición | Regla |
|---|---|
| V61=97 o V61=98 | V66.1-V66.9 deben ser 98. |
| V66=98 | V66.1-V66.9 deben ser 98. |
| V66.1 | Permite ATC o 98. No permite 97. |
| V66.2-V66.9 | Permiten ATC, 97 o 98 según secuencia y aplicación. |
| Posición habilitada por V66 | Debe registrar ATC válido cuando corresponde. |
| Posición no habilitada por V66 | Debe registrar 98 o 97 según regla aplicable. |
| ATC repetido dentro del bloque | Debe marcarse como inconsistencia si el módulo lo contempla. |

---

## V67-V69 — Medicamentos adicionales al último esquema

**Módulo:** Último esquema de terapia sistémica  
**Estado:** Cerradas funcionalmente; detalle de códigos pendiente de integrar al catálogo.  
**Tipo de dato:** Código ATC / comodín.  
**Comodines permitidos:** 97 y 98.  
**Dependencias:** V61, V66.1-V66.9.  
**Trazabilidad:** V61 → V66.1-V66.9 → V67-V69.

**Reglas funcionales según instructivo:**

| Condición | Regla |
|---|---|
| No recibió medicamento diferente a V66.1-V66.9 y V61 seleccionó opción menor a 14 | Registrar 97. |
| No tuvo este último esquema o V61=97/98 | Registrar 98. |
| Hay adicional real | Registrar ATC válido. |
| ATC adicional | No debe repetirse con V66.1-V66.9 ni entre V67-V69. |

---

## V70 — Quimioterapia intratecal en el último esquema

**Módulo:** Último esquema de terapia sistémica  
**Estado:** Cerrada funcional; detalle de códigos pendiente de integrar al catálogo.  
**Tipo de dato:** Catálogo cerrado.  
**Valores permitidos:** 1, 2, 98.  
**Dependencias:** V45, V61.

**Reglas funcionales según instructivo:**

| Código | Descripción |
|---:|---|
| 1 | Sí recibió. |
| 2 | No recibió. |
| 98 | No aplica, no tuvo ningún esquema de quimioterapia o V45=98. |

---

## V71 — Fecha de finalización del último esquema

**Módulo:** Último esquema de terapia sistémica  
**Estado:** Cerrada funcional; detalle de códigos pendiente de integrar al catálogo.  
**Tipo de dato:** Fecha.  
**Formato:** AAAA-MM-DD.  
**Comodines permitidos:** 1800-01-01 y 1845-01-01.  
**Dependencias:** V61, V62, V72.

**Reglas funcionales según instructivo:**

| Valor | Cuándo aplica |
|---|---|
| Fecha real | Esquema finalizado en el periodo. |
| 1800-01-01 | Hormonoterapia o esquema que aún no finaliza. |
| 1845-01-01 | No aplica. |

---

## V72 — Características actuales del último esquema

**Módulo:** Último esquema de terapia sistémica  
**Estado:** Cerrada funcional; detalle de códigos pendiente de integrar al catálogo.  
**Tipo de dato:** Catálogo cerrado.  
**Dependencias:** V61, V71, V73.

**Valores permitidos:**

| Código | Descripción |
|---:|---|
| 1 | Finalizado, esquema completo según medicamentos programados. |
| 2 | Finalizado, esquema incompleto pero finalizado por algún motivo. |
| 3 | No finalizado, esquema incompleto, pero aún bajo tratamiento. |
| 98 | No aplica. |

---

## V73 — Motivo de finalización prematura del último esquema

**Módulo:** Último esquema de terapia sistémica  
**Estado:** Cerrada funcional; detalle de códigos pendiente de integrar al catálogo.  
**Tipo de dato:** Catálogo cerrado.  
**Dependencias:** V72.

**Valores permitidos:**

| Código | Descripción |
|---:|---|
| 1 | Toxicidad de uno o más medicamentos. |
| 2 | Otros motivos médicos. |
| 3 | Muerte. |
| 4 | Cambio de EPS. |
| 5 | Decisión del usuario, abandonó la terapia. |
| 6 | No hay disponibilidad de medicamentos. |
| 7 | Otros motivos administrativos. |
| 8 | Otras causas no contempladas. |
| 98 | No aplica. |

**Regla central:** Si V72=2, V73 debe registrar un motivo 1-8. Si V72 es diferente de 2, V73 debe ser 98.

---

# Bloque V74-V85 — Cirugía en el periodo de reporte actual

## Trazabilidad general del bloque

| Variable | Depende de | Regla funcional principal |
|---|---|---|
| V74 | — | Define si el usuario recibió cirugía curativa o paliativa como parte del manejo del cáncer. |
| V75 | V74 | Si V74=2, V75=98. Si V74=1, debe registrar número de cirugías. |
| V76 | V74/V75 | Si no hubo cirugía, V76=1845-01-01. Si hubo cirugía, fecha real. |
| V77 | V74 | Si no hubo cirugía, V77=98. Si hubo cirugía, IPS real o 96 fuera del país. |
| V78 | V74 | Si hubo cirugía, CUPS de cirugía. Si no hubo cirugía, 98. |
| V79 | V74 | Si hubo cirugía, ubicación 1, 5 o 6. Si no hubo cirugía, 98. |
| V80 | V74/V75/V76 | Si no hubo cirugía o sólo una intervención, 1845-01-01. Si hubo más de una, fecha real no anterior a V76. |
| V81 | V74/V75/V80 | Si no hubo cirugía o sólo una intervención, 98. Si hubo última cirugía real, motivo 1,2,3,5,6. |
| V82 | V74/V75 | Si sólo hubo una o ninguna, 98. Si hubo última cirugía, IPS real. |
| V83 | V74/V75 | Si sólo hubo una o ninguna, 98. Si hubo última cirugía, CUPS de cirugía. |
| V84 | V74/V75 | Si sólo hubo una o ninguna, 98. Si hubo última cirugía, ubicación 1,5,6. |
| V85 | V74 | Si no hubo cirugía, 98. Si hubo cirugía, 1 vivo o 2 fallecido. |

---

## V74 — Cirugía curativa o paliativa durante el periodo

**Módulo:** Cirugía  
**Estado:** Cerrada funcional.  
**Tipo de dato:** Catálogo cerrado.  
**Valores permitidos:** 1, 2.  
**Dependencias:** Inicio de bloque quirúrgico.

**Valores:**

| Código | Descripción |
|---:|---|
| 1 | Sí fue sometido al menos a una cirugía durante el periodo. |
| 2 | No recibió cirugía. |

**Aclaraciones operativas:**

- No aplican cirugías propuestas pero no realizadas.
- La opción 3 fue eliminada.
- No son objeto de reporte implante de catéter, punción lumbar, biopsias ni cierre de ostomías.
- Si durante el mismo tiempo quirúrgico recibió varias intervenciones reportables, seleccionar la más representativa frente al cáncer.

---

## V75 — Número de cirugías durante el periodo

**Módulo:** Cirugía  
**Estado:** Cerrada funcional.  
**Tipo de dato:** Numérico.  
**Comodines permitidos:** 98 No Aplica.  
**Dependencias:** V74.

**Regla central:** V75 debe registrar cantidad de cirugías o tiempos quirúrgicos, no cantidad de procedimientos CUPS.

---

## V76 — Fecha de realización de la primera cirugía

**Módulo:** Cirugía  
**Estado:** Cerrada funcional.  
**Tipo de dato:** Fecha.  
**Formato:** AAAA-MM-DD.  
**Comodines permitidos:** 1845-01-01 No Aplica.  
**Dependencias:** V74, V75.

---

## V77 — Código de IPS de la primera cirugía

**Módulo:** Cirugía  
**Estado:** Cerrada funcional.  
**Tipo de dato:** Código de habilitación IPS.  
**Formato:** 12 dígitos.  
**Comodines permitidos:** 96 cirugía fuera del país, 98 No Aplica.  
**Dependencias:** V74.

---

## V78 — Código CUPS de la primera cirugía del periodo

**Módulo:** Cirugía  
**Estado:** Cerrada funcional.  
**Encabezado real:** `v78cdigodeprimeraciruga`  
**Tipo de dato:** Código CUPS.  
**Catálogo aplicable:** `CACCatalogoCUPS.grupos.cirugia.codigos`.  
**Comodines permitidos:** 98 No Aplica.  
**Trazabilidad:** V74 → V75 → V76 → V77 → V78.

**Reglas cerradas:**

| Código | Tipo | Regla |
|---|---|---|
| `V78-ERROR-001` | Error | V78 vacía. |
| `V78-ERROR-002` | Error | Formato inválido. |
| `V78-ERROR-003` | Error | V74=1, pero V78=98. |
| `V78-ERROR-004` | Error | V74=2, pero V78 es diferente de 98. |
| `V78-ERROR-005` | Error | CUPS no existe en el grupo CUPS CIRUGÍA o pertenece a otro grupo, por ejemplo radioterapia. |
| `V78-ADVERTENCIA-001` | Advertencia | CUPS válido de cirugía; verificar pertinencia frente al manejo del cáncer. |
| `V78-ADVERTENCIA-002` | Advertencia | Procedimiento especial reportable como fotoféresis, fototerapia, crioterapia o radiofrecuencia. |

**Nota técnica:** V78 no valida contra el catálogo CUPS general, sino exclusivamente contra el grupo CUPS CIRUGÍA.

---

## V79 — Ubicación temporal de la primera cirugía en relación al manejo oncológico

**Módulo:** Cirugía  
**Estado:** Cerrada funcional.  
**Encabezado real:** `v79ubicacintemporaldeestaprimera`  
**Tipo de dato:** Catálogo cerrado.  
**Comodines permitidos:** 98 No Aplica.  
**Trazabilidad:** V74 → V75 → V76 → V77 → V78 → V79.

**Valores permitidos:**

| Código | Descripción |
|---:|---|
| 1 | Parte del manejo inicial para el cáncer, tratamiento inicial curativo. |
| 5 | Manejo de recaída. |
| 6 | Manejo de enfermedad metastásica. |
| 98 | No aplica, si V74=2. |

**Reglas cerradas:**

| Código | Tipo | Regla |
|---|---|---|
| `V79-ERROR-001` | Error | V79 vacía. |
| `V79-ERROR-002` | Error | Valor fuera de catálogo. |
| `V79-ERROR-003` | Error | V74=1, pero V79=98. |
| `V79-ERROR-004` | Error | V74=2, pero V79 es diferente de 98. |
| `V79-ADVERTENCIA-001` | Advertencia | V79=5 o V79=6; verificar soporte clínico. |

---

## V80 — Fecha de realización de la última cirugía o reintervención

**Módulo:** Cirugía  
**Estado:** Cerrada funcional.  
**Encabezado real:** `v80fechaderealizacindelltimoproc`  
**Tipo de dato:** Fecha.  
**Formato:** AAAA-MM-DD.  
**Comodines permitidos:** 1845-01-01 No Aplica.  
**Trazabilidad:** V74 → V75 → V76 → V77 → V78 → V79 → V80.

**Reglas cerradas:**

| Código | Tipo | Regla |
|---|---|---|
| `V80-ERROR-001` | Error | V80 vacía. |
| `V80-ERROR-002` | Error | Formato inválido. |
| `V80-ERROR-003` | Error | Fecha inexistente. |
| `V80-ERROR-004` | Error | V74=2, pero V80 es diferente de 1845-01-01. |
| `V80-ERROR-005` | Error | V75=1, pero V80 es diferente de 1845-01-01. |
| `V80-ERROR-006` | Error | V74=1 y V75>1, pero V80=1845-01-01. |
| `V80-ERROR-007` | Error | V80 anterior a V76. |
| `V80-ADVERTENCIA-001` | Advertencia | V80 igual a V76 cuando V75>1; verificar que no se repita el evento quirúrgico denominado primera cirugía. |

---

## V81 — Motivo de haber realizado la última cirugía del periodo

**Módulo:** Cirugía  
**Estado:** Cerrada funcional.  
**Tipo de dato:** Catálogo cerrado.  
**Comodines permitidos:** 98 No Aplica.  
**Dependencias:** V74, V75, V76, V80.  
**Trazabilidad principal:** V74 → V75 → V76 → V80 → V81.

**Valores permitidos:**

| Código | Descripción |
|---:|---|
| 1 | Complementar tratamiento quirúrgico del cáncer no asociado a complicaciones de la primera cirugía. |
| 2 | Complicaciones debidas a la primera cirugía o siguientes. |
| 3 | Complicaciones por otras condiciones médicas no relacionadas a la cirugía, por ejemplo comorbilidad. |
| 5 | Opciones 1 y 3. |
| 6 | Opciones 2 y 3. |
| 98 | No aplica: sólo hubo una intervención en este periodo o no hubo cirugías. |

**Regla funcional central:** Si V74=2 o V75=1, V81 debe ser 98. Si V75>1 y V80 tiene fecha real, V81 debe ser 1, 2, 3, 5 o 6.

---

## V82 — Código de IPS que realiza la última cirugía

**Módulo:** Cirugía  
**Estado:** Cerrada funcional.  
**Tipo de dato:** Código de habilitación IPS.  
**Formato:** 12 dígitos.  
**Comodines permitidos:** 98 No Aplica.  
**Dependencias:** V74, V75, V80.

**Regla funcional central:** Si sólo hubo una intervención o no hubo cirugías, V82 debe ser 98. Si hubo última cirugía o reintervención real, V82 debe registrar código de habilitación IPS.

---

## V83 — Código de última cirugía del periodo

**Módulo:** Cirugía  
**Estado:** Cerrada funcional.  
**Tipo de dato:** Código CUPS.  
**Catálogo aplicable:** CUPS cirugía.  
**Comodines permitidos:** 98 No Aplica.  
**Dependencias:** V74, V75, V80.

**Regla funcional central:** Si sólo hubo una intervención o no hubo cirugías, V83 debe ser 98. Si hubo última cirugía o reintervención real, V83 debe registrar CUPS quirúrgico válido.

---

## V84 — Ubicación temporal de la última cirugía

**Módulo:** Cirugía  
**Estado:** Cerrada funcional.  
**Tipo de dato:** Catálogo cerrado.  
**Comodines permitidos:** 98 No Aplica.  
**Dependencias:** V74, V75, V80.

**Valores permitidos:**

| Código | Descripción |
|---:|---|
| 1 | Parte del manejo inicial para el cáncer. |
| 5 | Manejo de recaída. |
| 6 | Manejo de enfermedad metastásica. |
| 98 | No aplica, si sólo hubo una intervención o V74=2. |

---

## V85 — Estado vital al finalizar la única o última cirugía

**Módulo:** Cirugía  
**Estado:** Cerrada funcional.  
**Tipo de dato:** Catálogo cerrado.  
**Comodines permitidos:** 98 No Aplica.  
**Dependencias:** V74.

**Valores permitidos:**

| Código | Descripción |
|---:|---|
| 1 | Vivo. |
| 2 | Fallecido. |
| 98 | No aplica, si V74=2. |

---

# Bloque V86-V105 — Radioterapia en el periodo de reporte actual

## Trazabilidad general del bloque

| Variable | Depende de | Regla funcional principal |
|---|---|---|
| V86 | — | Define si recibió radioterapia. Sólo permite 1 o 98. La opción 2 fue eliminada. |
| V87 | V86 | Si V86=98, V87=98. Si V86=1, debe registrar número de sesiones recibidas. |
| V88 | V86 | Si V86=98, V88=1845-01-01. Si V86=1, fecha real de inicio. |
| V89 | V86 | Ubicación temporal del primer o único esquema: 1,2,3,11,12,13 o 98. |
| V90 | V86 | Tipo de radioterapia aplicada: CUPS de radioterapia o 98. |
| V91 | V86 | Número de IPS que suministran primer/único esquema o 98. |
| V92 | V91/V86 | IPS1 del primer/único esquema o 96 fuera del país o 98. |
| V93 | V91/V86 | IPS2 del primer/único esquema o 98. |
| V94 | V88/V95/V86 | Fecha de finalización: fecha real, 1800 si no finaliza, 1845 si no aplica. |
| V95 | V86/V94 | Características actuales: 1, 2, 3 o 98. |
| V96 | V95 | Motivo de finalización si V95=2; si no, 98. |
| V97 | V86/V88 | Inicio del último esquema; 1845 si no aplica. |
| V98 | V86/V97 | Ubicación temporal del último esquema: 1,2,3,11,12,13 o 98. |
| V99 | V86/V97 | CUPS de radioterapia del último esquema o 98. |
| V100 | V86/V97 | Número de IPS del último esquema o 98. |
| V101 | V100/V86 | IPS1 del último esquema o 98. |
| V102 | V100/V86 | IPS2 del último esquema o 98. |
| V103 | V97/V104 | Fecha de finalización del último esquema: fecha real, 1800 o 1845. |
| V104 | V86/V97/V103 | Características actuales del último esquema: 1, 2, 3 o 98. |
| V105 | V104 | Motivo de finalización si V104=2; si no, 98. |

---

## V86 — ¿Recibió el usuario algún tipo de radioterapia en el periodo de reporte actual?

**Módulo:** Radioterapia  
**Estado:** Cerrada funcional.  
**Encabezado real:** `v86recibielusuarioalgntipoderadi`  
**Tipo de dato:** Catálogo cerrado.  
**Valores permitidos:** 1, 98.  
**Dependencias:** Inicio de bloque radioterapia.  
**Trazabilidad:** V86 → V87-V105.

**Valores permitidos:**

| Código | Descripción |
|---:|---|
| 1 | Sí recibió algún tipo de radioterapia. |
| 98 | No aplica. Verificar que V87 a V105 registren No Aplica. |

**Aclaración oficial:**

- No aplica radioterapia propuesta pero no suministrada.
- La opción 2 fue eliminada.

**Reglas cerradas:**

| Código | Tipo | Regla |
|---|---|---|
| `V86-ERROR-001` | Error | V86 vacía. |
| `V86-ERROR-002` | Error | Valor fuera del catálogo permitido. |
| `V86-ERROR-003` | Error | V86=2; opción eliminada del instructivo. |

**Reglas descartadas:**

| Regla | Decisión |
|---|---|
| Advertencia para V86=98 | No existe. V86=98 es válido y no genera hallazgo. |
| Error inmediato por V87-V105 | No se fuerza desde V86. Se validará variable por variable al implementar V87-V105. |

**Versiones de cierre:**

| Archivo | Versión |
|---|---|
| `modulo17.js` | `sprint-3l-v86-radioterapia-recibida-02` |
| `estructura.js` | `sprint-3l-v86-estructura-01` |
| `engine.js` | `sprint-3l-v86-engine-modulo17-01` |
| `excel-reporte.js` | `sprint-3l-v86-exportador-01` |

---

## V87 — Número de sesiones de radioterapia recibidas en el periodo

**Módulo:** Radioterapia  
**Estado:** Siguiente variable de trabajo.  
**Encabezado real:** Pendiente de confirmar antes de implementar.  
**Tipo de dato:** Numérico.  
**Comodines permitidos:** 98 No Aplica.  
**Dependencias:** V86.  
**Trazabilidad:** V86 → V87.

**Instructivo:** Registre el número de sesiones de radioterapia suministradas durante el periodo. Debe ser un valor numérico.

**Reglas esperadas antes de codificar:**

| Condición | Regla |
|---|---|
| V86=98 | V87 debe ser 98. |
| V86=1 | V87 debe ser número real de sesiones recibidas. |
| V87 vacío | Error esperado. |
| V87 no numérico | Error esperado. |
| V87=0 | Revisar si se trata como error, porque el instructivo exige sesiones suministradas. Confirmar antes de codificar. |

---

## V88 — Fecha de inicio de primer o único esquema de radioterapia

**Módulo:** Radioterapia  
**Estado:** Pendiente.  
**Tipo de dato:** Fecha.  
**Formato:** AAAA-MM-DD.  
**Comodines permitidos:** 1845-01-01 No Aplica.  
**Dependencias:** V86, V87.

**Regla funcional:** Si V86=98, V88=1845-01-01. Si V86=1, V88 debe ser fecha real de inicio del tratamiento actual, así haya iniciado antes del periodo de reporte.

---

## V89 — Ubicación temporal del primer o único esquema de radioterapia

**Módulo:** Radioterapia  
**Estado:** Pendiente.  
**Tipo de dato:** Catálogo cerrado.  
**Comodines permitidos:** 98 No Aplica.  
**Dependencias:** V86.

**Valores permitidos:**

| Código | Descripción |
|---:|---|
| 1 | Neoadyuvancia, manejo inicial prequirúrgico. |
| 2 | Tratamiento inicial curativo sin cirugía sugerida. |
| 3 | Adyuvancia, manejo inicial postquirúrgico. |
| 11 | Manejo de recaída. |
| 12 | Manejo de enfermedad metastásica. |
| 13 | Manejo paliativo, sin manejo de recaída ni enfermedad metastásica. |
| 98 | No aplica. |

---

## V90 — Tipo de radioterapia aplicada en primer o único esquema

**Módulo:** Radioterapia  
**Estado:** Pendiente.  
**Tipo de dato:** Código CUPS.  
**Catálogo aplicable:** CUPS de radioterapia del archivo operativo CAC.  
**Comodines permitidos:** 98 No Aplica.  
**Dependencias:** V86.

**Regla funcional:** Si V86=1, V90 debe registrar CUPS de radioterapia. Si V86=98, V90=98.

---

## V91 — Número de IPS que suministran primer o único esquema de radioterapia

**Módulo:** Radioterapia  
**Estado:** Pendiente.  
**Tipo de dato:** Numérico.  
**Comodines permitidos:** 98 No Aplica.  
**Dependencias:** V86.

**Regla funcional:** Si V86=1, V91 debe registrar número de IPS que intervinieron en la administración de la dosis de radioterapia. Si V86=98, V91=98.

---

## V92 — Código IPS1 que suministra primer o único esquema de radioterapia

**Módulo:** Radioterapia  
**Estado:** Pendiente.  
**Tipo de dato:** Código de habilitación IPS.  
**Formato:** 12 dígitos.  
**Comodines permitidos:** 96 Radioterapia fuera del país; 98 No Aplica.  
**Dependencias:** V86, V91.

---

## V93 — Código IPS2 que suministra primer o único esquema de radioterapia

**Módulo:** Radioterapia  
**Estado:** Pendiente.  
**Tipo de dato:** Código de habilitación IPS.  
**Formato:** 12 dígitos.  
**Comodines permitidos:** 98 No Aplica.  
**Dependencias:** V86, V91, V92.

---

## V94 — Fecha de finalización de primer o único esquema de radioterapia

**Módulo:** Radioterapia  
**Estado:** Pendiente.  
**Tipo de dato:** Fecha.  
**Formato:** AAAA-MM-DD.  
**Comodines permitidos:** 1800-01-01 y 1845-01-01.  
**Dependencias:** V86, V88, V95.

**Valores especiales:**

| Valor | Uso |
|---|---|
| 1800-01-01 | Esquema de radioterapia que aún no finaliza. |
| 1845-01-01 | No aplica. |

---

## V95 — Características actuales del primer o único esquema de radioterapia

**Módulo:** Radioterapia  
**Estado:** Pendiente.  
**Tipo de dato:** Catálogo cerrado.  
**Comodines permitidos:** 98 No Aplica.  
**Dependencias:** V86, V94, V96.

**Valores permitidos:**

| Código | Descripción |
|---:|---|
| 1 | Finalizado, dosis completa de radioterapia prescrita. |
| 2 | Finalizado, dosis incompleta pero finalizada por algún motivo. |
| 3 | No finalizado, esquema incompleto, pero aún bajo tratamiento. |
| 98 | No aplica. |

---

## V96 — Motivo de finalización del primer o único esquema de radioterapia

**Módulo:** Radioterapia  
**Estado:** Pendiente.  
**Tipo de dato:** Catálogo cerrado.  
**Comodines permitidos:** 98 No Aplica.  
**Dependencias:** V95.

**Valores permitidos:**

| Código | Descripción |
|---:|---|
| 1 | Toxicidad. |
| 2 | Otros motivos médicos. |
| 3 | Muerte. |
| 4 | Cambio de EPS. |
| 5 | Decisión del usuario, abandono la terapia. |
| 6 | Otros motivos administrativos. |
| 7 | Otras causas no contempladas. |
| 98 | No aplica. |

**Regla central:** Si V95=2, V96 debe registrar motivo 1-7. Si V95 es diferente de 2, V96=98.

---

## V97 — Fecha de inicio del último esquema de radioterapia

**Módulo:** Radioterapia  
**Estado:** Pendiente.  
**Tipo de dato:** Fecha.  
**Formato:** AAAA-MM-DD.  
**Comodines permitidos:** 1845-01-01 No Aplica.  
**Dependencias:** V86, V88.

**Regla funcional:** Si no aplica último esquema o no recibió radioterapia, V97=1845-01-01. Si hubo último esquema real diferente, V97 debe registrar fecha real.

---

## V98 — Ubicación temporal/intención del último esquema de radioterapia

**Módulo:** Radioterapia  
**Estado:** Pendiente.  
**Tipo de dato:** Catálogo cerrado.  
**Comodines permitidos:** 98 No Aplica.  
**Dependencias:** V86, V97.

**Valores permitidos:**

| Código | Descripción |
|---:|---|
| 1 | Neoadyuvancia, manejo inicial prequirúrgico. |
| 2 | Tratamiento inicial curativo sin cirugía sugerida. |
| 3 | Adyuvancia, manejo inicial postquirúrgico. |
| 11 | Manejo de recaída. |
| 12 | Manejo de enfermedad metastásica. |
| 13 | Manejo paliativo, sin manejo de recaída ni enfermedad metastásica. |
| 98 | No aplica. |

---

## V99 — Tipo de radioterapia aplicada en el último esquema

**Módulo:** Radioterapia  
**Estado:** Pendiente.  
**Tipo de dato:** Código CUPS.  
**Catálogo aplicable:** CUPS de radioterapia del archivo operativo CAC.  
**Comodines permitidos:** 98 No Aplica.  
**Dependencias:** V86, V97.

---

## V100 — Número de IPS que suministran último esquema de radioterapia

**Módulo:** Radioterapia  
**Estado:** Pendiente.  
**Tipo de dato:** Numérico.  
**Comodines permitidos:** 98 No Aplica.  
**Dependencias:** V86, V97.

---

## V101 — Código IPS1 que suministra último esquema de radioterapia

**Módulo:** Radioterapia  
**Estado:** Pendiente.  
**Tipo de dato:** Código de habilitación IPS.  
**Formato:** 12 dígitos.  
**Comodines permitidos:** 98 No Aplica.  
**Dependencias:** V86, V100.

---

## V102 — Código IPS2 que suministra último esquema de radioterapia

**Módulo:** Radioterapia  
**Estado:** Pendiente.  
**Tipo de dato:** Código de habilitación IPS.  
**Formato:** 12 dígitos.  
**Comodines permitidos:** 98 No Aplica.  
**Dependencias:** V86, V100, V101.

---

## V103 — Fecha de finalización del último esquema de radioterapia

**Módulo:** Radioterapia  
**Estado:** Pendiente.  
**Tipo de dato:** Fecha.  
**Formato:** AAAA-MM-DD.  
**Comodines permitidos:** 1800-01-01 y 1845-01-01.  
**Dependencias:** V86, V97, V104.

**Valores especiales:**

| Valor | Uso |
|---|---|
| 1800-01-01 | Esquema de radioterapia que aún no finaliza. |
| 1845-01-01 | No aplica. |

---

## V104 — Características actuales del último esquema de radioterapia

**Módulo:** Radioterapia  
**Estado:** Pendiente.  
**Tipo de dato:** Catálogo cerrado.  
**Comodines permitidos:** 98 No Aplica.  
**Dependencias:** V86, V97, V103, V105.

**Valores permitidos:**

| Código | Descripción |
|---:|---|
| 1 | Finalizado, dosis completa de radioterapia prescrita. |
| 2 | Finalizado, dosis incompleta pero finalizada por algún motivo. |
| 3 | No finalizado, esquema incompleto, pero aún bajo tratamiento. |
| 98 | No aplica. |

---

## V105 — Motivo de finalización del último esquema de radioterapia

**Módulo:** Radioterapia  
**Estado:** Pendiente.  
**Tipo de dato:** Catálogo cerrado.  
**Comodines permitidos:** 98 No Aplica.  
**Dependencias:** V104.

**Valores permitidos:**

| Código | Descripción |
|---:|---|
| 1 | Toxicidad. |
| 2 | Otros motivos médicos. |
| 3 | Muerte. |
| 4 | Cambio de EPS. |
| 5 | Decisión del usuario, abandono la terapia. |
| 6 | Otros motivos administrativos. |
| 7 | Otras causas no contempladas. |
| 98 | No aplica. |

**Regla central:** Si V104=2, V105 debe registrar motivo 1-7. Si V104 es diferente de 2, V105=98.

---

# Siguiente variable

## V87 — Número de sesiones de radioterapia recibidas en el periodo

Antes de implementar V87 se debe confirmar:

- Encabezado real de V87 en el Excel.
- Si el sistema aceptará únicamente enteros positivos cuando V86=1.
- Si V87=0 debe tratarse como error. Por instructivo, al decir “sesiones recibidas/suministradas”, lo más consistente es error, pero debe cerrarse contra el criterio del proyecto antes de codificar.
- Base Excel limpia real desde V86 sin hallazgos de V1-V86.
- Reglas esperadas y trazabilidad V86 → V87.

