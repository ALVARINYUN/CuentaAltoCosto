# Matriz de Variables CAC

**Documento técnico fundamental del sistema.**

Este documento organiza la matriz funcional del **Validador CAC — Cáncer**. Cada validación, regla, campo reconocido y trazabilidad del sistema debe derivarse del instructivo oficial CAC y de esta matriz. Si cambia el instructivo CAC, este debe ser uno de los primeros documentos en actualizarse.

**Fuente base:** Instructivo CAC-IEP1-I01, Resolución 0247/2014, medición enero 2025.  
**Total de variables oficiales:** 134.  
**Campos expandidos en archivo plano:** 168, incluyendo subvariables.  
**Estado del documento:** Actualización funcional en curso según avance del proyecto.  
**Variables documentadas:** Matriz base organizada de V1 a V134.  
**Avance funcional validado:** V1 a V80.  
**Siguiente variable de trabajo:** V81.  
**Módulo funcional actual:** Módulo 4 — Cirugía.  
**Módulo técnico actual para nuevas variables:** `src/validaciones/reglas/modulo16.js`.

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
| V74-V80 | Cerrado funcional | Inicio del bloque de cirugía. |
| V81 | Siguiente | Motivo de haber realizado la última cirugía del periodo. |
| V82-V85 | Pendiente | Continuación del bloque de cirugía. |
| V86-V105 | Pendiente | Radioterapia. |
| V106-V110 | Pendiente | Trasplante de células progenitoras hematopoyéticas. |
| V111-V124 | Pendiente | Tratamiento complementario. |
| V125-V134 | Pendiente | Situación actual y resultado. |

---

## Variables quirúrgicas cerradas recientemente

### V78 — Código CUPS de la primera cirugía del periodo

**Módulo:** Cirugía  
**Estado:** Cerrada funcional.  
**Encabezado real:** `v78cdigodeprimeraciruga`  
**Tipo de dato:** Código CUPS.  
**Catálogo aplicable:** `CACCatalogoCUPS.grupos.cirugia.codigos`.  
**Trazabilidad:** `V74 → V75 → V76 → V77 → V78`.

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

**Nota técnica:** V78 no valida contra el catálogo CUPS general, sino exclusivamente contra el grupo **CUPS CIRUGÍA**. Ejemplo: `922201` puede existir en radioterapia, pero debe ser error en V78 porque no pertenece al grupo cirugía.

---

### V79 — Ubicación temporal de esta primera cirugía en relación al manejo oncológico

**Módulo:** Cirugía  
**Estado:** Cerrada funcional.  
**Encabezado real:** `v79ubicacintemporaldeestaprimera`  
**Tipo de dato:** Catálogo cerrado.  
**Trazabilidad:** `V74 → V75 → V76 → V77 → V78 → V79`.

**Valores permitidos:**

| Código | Descripción |
|---|---|
| `1` | Parte del manejo inicial para el cáncer. |
| `5` | Manejo de recaída. |
| `6` | Manejo de enfermedad metastásica. |
| `98` | No aplica, si V74=2. |

**Reglas cerradas:**

| Código | Tipo | Regla |
|---|---|---|
| `V79-ERROR-001` | Error | V79 vacía. |
| `V79-ERROR-002` | Error | Valor fuera de catálogo. |
| `V79-ERROR-003` | Error | V74=1, pero V79=98. |
| `V79-ERROR-004` | Error | V74=2, pero V79 es diferente de 98. |
| `V79-ADVERTENCIA-001` | Advertencia | V79=5 o V79=6; verificar soporte clínico. |

---

### V80 — Fecha de realización de la última cirugía o cirugía de reintervención del periodo

**Módulo:** Cirugía  
**Estado:** Cerrada funcional.  
**Encabezado real:** `v80fechaderealizacindelltimoproc`  
**Tipo de dato:** Fecha.  
**Formato:** `AAAA-MM-DD`.  
**Trazabilidad:** `V74 → V75 → V76 → V77 → V78 → V79 → V80`.

**Comodín permitido:**

| Código | Cuándo aplica |
|---|---|
| `1845-01-01` | No aplica: sólo hubo una intervención en este periodo o no hubo cirugías. |

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

**Resultado de cierre:** 12 pacientes procesados, 7 con errores, 10 con advertencias, 1 sin problemas. Los errores confirmados fueron únicamente de V80.

---

## Siguiente variable

### V81 — Motivo de haber realizado la última cirugía de este periodo de reporte

**Módulo:** Cirugía  
**Estado:** Siguiente variable de trabajo.  
**Encabezado real:** Pendiente de confirmar antes de implementar.  
**Trazabilidad principal esperada:** `V74 → V75 → V76 → V80 → V81`.  
**Trazabilidad ampliada:** `V74 → V75 → V76 → V77 → V78 → V79 → V80 → V81`.

**Valores permitidos según instructivo recibido:**

| Código | Descripción |
|---|---|
| `1` | Complementar tratamiento quirúrgico del cáncer no asociado a complicaciones de la primera cirugía. |
| `2` | Complicaciones debidas a la primera cirugía o siguientes. |
| `3` | Complicaciones por otras condiciones médicas no relacionadas a la cirugía, por ejemplo comorbilidad. |
| `5` | Opciones 1 y 3. |
| `6` | Opciones 2 y 3. |
| `98` | No aplica: sólo hubo una intervención en este periodo o no hubo cirugías. |

**Antes de implementar:** confirmar encabezado real de V81 en el Excel.

---

## Reglas operativas de actualización

- No tocar variables cerradas salvo bug real.
- No reemplazar `src/validaciones/reglas/modulo15.js`; está cerrado hasta V77.
- Desde V78 en adelante, continuar en `src/validaciones/reglas/modulo16.js`.
- Confirmar encabezado real antes de codificar o generar Excel.
- No inventar reglas no soportadas por el instructivo.
- Si la validación depende de variables futuras, no bloquear todavía.
- En Excel de prueba, evitar errores de variables anteriores para aislar la variable nueva.
