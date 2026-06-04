# Backlog del Proyecto — Validador CAC

**Proyecto:** Validador CAC —  Cáncer  
**Objetivo:** construir una herramienta local para validar archivos Excel de la Cuenta de Alto Costo antes del reporte final.  
**Metodología:** Scrum / desarrollo incremental por sprints.   
**Regla principal:** no modificar variables cerradas salvo bug real.

---

## 1. Descripción general

El Validador CAC permite cargar archivos Excel, reconocer encabezados, procesar registros por paciente, aplicar reglas de negocio por variable, mostrar hallazgos en pantalla y exportar una matriz marcada con errores o advertencias.

Cada variable sigue este flujo:

1. Lectura del instructivo.
2. Análisis de regla de negocio.
3. Definición de trazabilidad.
4. Implementación en código.
5. Generación de Excel limpio de prueba.
6. Validación en pantalla y consola.
7. Revisión del exportador.
8. Cierre funcional.

---

## 2. Reglas de trabajo

- No inventar reglas no soportadas por el instructivo.
- No adelantar validaciones de variables futuras.
- No tocar variables cerradas salvo bug real.
- Cada variable debe tener trazabilidad clara.
- Cada sprint debe tener Excel limpio de prueba.
- El exportador debe marcar solo la columna y fila con error real.
- Los textos visibles deben ser claros, cortos y operativos.
- Si una variable depende de otra futura, se deja pendiente hasta llegar a ella.

---

## 3. Product Backlog general

| Épica | Descripción | Estado |
|---|---|---|
| Carga de Excel | Cargar archivos Excel y seleccionar hoja. | Cerrado funcional |
| Reconocimiento de encabezados | Detectar encabezados V1, V2, nombres largos y subvariables. | Cerrado funcional |
| Motor de validación | Ejecutar módulos de reglas por variable. | En progreso acumulativo |
| Resultados en pantalla | Mostrar pacientes procesados, errores, advertencias y detalle. | Cerrado funcional |
| Exportador | Generar matriz marcada con errores y advertencias. | En progreso acumulativo |
| Catálogos | Cargar CIE-10, ATC, CUPS y otros según necesidad. | En progreso |
| Documentación | Mantener backlog, matriz de variables y reglas por sprint. | En progreso |
| Validación por variables | Implementar reglas desde V1 hasta V134. | En progreso |

---

## 4. Backlog por sprints

### Sprint 1 — Identificación del usuario

| Variables | Descripción | Estado |
|---|---|---|
| V1-V16 | Identificación del usuario, documento, nacimiento, sexo, régimen, EAPB, municipio y datos básicos. | Cerrado funcional |

### Sprint 2 — Diagnóstico y confirmación

| Variables | Descripción | Estado |
|---|---|---|
| V17-V24 | Diagnóstico, fechas, tipo de estudio e histopatología. | Cerrado funcional |
| V25-V28 | IPS de confirmación, primera consulta, histología y grado de diferenciación. | Cerrado funcional |
| V29-V35 | Estadificación inicial, HER2 y Dukes. | Cerrado funcional |

### Sprint 3A / 3B — Estadificación, riesgo e intervención

| Variables | Descripción | Estado |
|---|---|---|
| V36 | Ann Arbor/Lugano. | Cerrado funcional |
| V37 | Gleason. | Cerrado funcional |
| V38 | Clasificación de riesgo. | Cerrado funcional |
| V39 | Fecha de clasificación de riesgo. | Cerrado funcional |
| V40 | Objetivo del tratamiento inicial. | Cerrado funcional |
| V41 | Intervención médica durante el periodo. | Cerrado funcional |
| V42-V44 | Antecedente de otro cáncer primario. | Cerrado funcional |

### Sprint 3E — Terapia sistémica inicial

| Variables | Descripción | Estado |
|---|---|---|
| V45 | Recibió quimioterapia u otra terapia sistémica. | Cerrado funcional |
| V46-V46.8 | Número y fases de quimioterapia recibidas. | Cerrado funcional |
| V47-V52 | Ciclos, ubicación temporal, fecha de inicio e IPS del primer o único esquema. | Cerrado funcional |
| V53-V53.9 | Número y medicamentos antineoplásicos administrados. | Cerrado funcional |

### Sprint 3F — Medicamentos adicionales del primer o único esquema

| Variable | Descripción | Trazabilidad | Estado |
|---|---|---|---|
| V54 | Medicamento antineoplásico adicional 1. | V45, V53.1-V53.9, ATC | Cerrado funcional |
| V55 | Medicamento antineoplásico adicional 2. | V45, V53.1-V53.9, V54, ATC | Cerrado funcional |
| V56 | Medicamento antineoplásico adicional 3. | V45, V53.1-V53.9, V54, V55, ATC | Cerrado funcional |

### Sprint 3G — Cierre del primer o único esquema

| Variable | Descripción | Trazabilidad | Estado |
|---|---|---|---|
| V57 | Quimioterapia intratecal en el primer o único esquema. | V45, V57 | Cerrado funcional |
| V58 | Fecha de finalización del primer o único esquema. | V45, V49, V58 | Cerrado funcional |
| V59 | Características actuales del primer o único esquema. | V45, V59 | Cerrado funcional |
| V60 | Motivo de finalización prematura del primer o único esquema. | V59, V60 | Cerrado funcional |

### Sprint 3H — Último esquema de terapia sistémica

| Variable | Descripción | Trazabilidad | Estado |
|---|---|---|---|
| V61 | Ubicación temporal del último esquema de quimioterapia o terapia sistémica. | V45, V61 | En implementación |
| V62 | Fecha de inicio del último esquema. | V61, V62 | Pendiente |
| V63 | Número de IPS que suministran el último esquema. | V61, V63 | Pendiente |
| V64 | Código IPS1 del último esquema. | V61, V63, V64 | Pendiente |
| V65 | Código IPS2 del último esquema. | V61, V63, V65 | Pendiente |
| V66 | Número de medicamentos propuestos en el último esquema. | V61, V66 | Pendiente |
| V66.1-V66.9 | Medicamentos administrados del último esquema. | V61, V66, V66.1-V66.9, ATC | Pendiente |
| V67-V69 | Medicamentos adicionales del último esquema. | V61, V66.1-V66.9, V67-V69, ATC | Pendiente |
| V70 | Quimioterapia intratecal en el último esquema. | V61, V70 | Pendiente |
| V71 | Fecha de finalización del último esquema. | V61, V62, V71 | Pendiente |
| V72 | Características actuales del último esquema. | V61, V72 | Pendiente |
| V73 | Motivo de finalización prematura del último esquema. | V72, V73 | Pendiente |

### Sprint futuro — Cirugía

| Variables | Descripción | Estado |
|---|---|---|
| V74-V85 | Cirugía curativa o paliativa, fechas, IPS, CUPS, ubicación temporal y estado vital postquirúrgico. | Pendiente |

### Sprint futuro — Radioterapia

| Variables | Descripción | Estado |
|---|---|---|
| V86-V105 | Radioterapia, sesiones, fechas, CUPS, IPS, características y motivo de finalización. | Pendiente |

### Sprint futuro — Trasplante

| Variables | Descripción | Estado |
|---|---|---|
| V106-V110 | Trasplante de células progenitoras hematopoyéticas. | Pendiente |

### Sprint futuro — Tratamiento complementario

| Variables | Descripción | Estado |
|---|---|---|
| V111-V124 | Cirugía reconstructiva, cuidado paliativo, psiquiatría, nutrición, soporte nutricional y rehabilitación. | Pendiente |

### Sprint futuro — Situación actual y resultado

| Variables | Descripción | Estado |
|---|---|---|
| V125-V134 | Tratamiento a la fecha de corte, resultado final, estado vital, novedades, muerte, causa, identificador BDUA y fecha de corte. | Pendiente |

---

## 5. Backlog técnico actual

| Tarea | Descripción | Estado |
|---|---|---|
| Crear módulo 14 | Crear `modulo14.js` para V61 y bloque de último esquema. | En curso |
| Activar V61 en estructura | Reconocer encabezados V61 y modo `ACUMULATIVO_V1_V61`. | En curso |
| Activar V61 en lector | Incluir V61 en variables validables. | En curso |
| Activar V61 en engine | Ejecutar `CACModulo14` cuando el archivo traiga V61. | En curso |
| Crear Excel limpio V61 | Probar errores y casos correctos de V61. | Pendiente |
| Validar exportador V61 | Confirmar que V61 se marque solo en filas con error. | Pendiente |
| Cerrar V61 | Cierre funcional después de validar pantalla, consola y exportador. | Pendiente |

---

## 6. Criterios de cierre por variable

Una variable se considera cerrada cuando:

- La estructura reconoce la variable.
- El lector la incluye como validable.
- El motor ejecuta el módulo correcto.
- Las reglas devuelven los errores esperados.
- El Excel limpio tiene casos de error y casos sin hallazgo.
- La validación en consola coincide con lo esperado.
- El exportador marca correctamente la matriz.
- No genera errores basura en variables anteriores.

---

## 7. Estado resumido

| Bloque | Estado |
|---|---|
| V1-V53.9 | Cerrado funcional acumulativo |
| V54 | Cerrado funcional |
| V55 | Cerrado funcional |
| V56 | Cerrado funcional |
| V57 | Cerrado funcional |
| V58 | Cerrado funcional |
| V59 | Cerrado funcional |
| V60 | Cerrado funcional |
| V61 | En implementación |
| V62-V73 | Pendiente |
| V74-V134 | Pendiente |

---

## 8. Próxima acción

Continuar con V61:

1. Validar que V61 cargue correctamente.
2. Generar prompt de Excel limpio V61.
3. Generar Excel de prueba.
4. Validar conteos.
5. Revisar trazabilidad por fila.
6. Revisar exportador.
7. Cerrar V61 funcionalmente.
