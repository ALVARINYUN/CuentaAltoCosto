# Backlog del Proyecto — Validador CAC

**Proyecto:** Validador CAC — Cáncer  
**Objetivo:** desarrollar una herramienta local que permita revisar archivos Excel de la Cuenta de Alto Costo antes del reporte final, identificando errores, advertencias y posibles inconsistencias en la información.  
**Metodología de trabajo:** desarrollo progresivo por sprints y cierre funcional por bloques de variables.  
**Estado actual:** avance funcional cerrado hasta **V62**. La siguiente variable de trabajo es **V63**.  
**Regla de trabajo:** las variables cerradas no se modifican, salvo que se identifique un bug real o una mejora puntual de redacción que no cambie la lógica.

---

## 1. Descripción general

El Validador CAC permite cargar un archivo Excel, seleccionar una hoja, reconocer los encabezados del instructivo, procesar los registros por paciente, aplicar reglas de validación y mostrar los hallazgos encontrados.

Además, el sistema permite exportar una matriz marcada, de forma que sea más fácil identificar qué filas y columnas deben revisarse antes de realizar el reporte definitivo.

El proyecto se trabaja por etapas. Cada variable se analiza, se implementa, se prueba y se cierra antes de pasar a la siguiente, para evitar afectar el avance que ya fue validado.

---

## 2. Flujo de trabajo por variable

Cada variable pasa por este proceso:

1. Revisión del instructivo.
2. Identificación de reglas de negocio.
3. Definición de trazabilidad con otras variables.
4. Implementación en el módulo correspondiente.
5. Generación de archivo Excel de prueba.
6. Validación de resultados en pantalla y consola.
7. Revisión del exportador.
8. Cierre funcional de la variable.

Este flujo se mantiene durante todo el proyecto para conservar orden, trazabilidad y control de calidad.

---

## 3. Reglas de trabajo del proyecto

- No implementar reglas que no estén soportadas por el instructivo.
- No adelantar validaciones de variables futuras.
- No modificar variables cerradas, salvo bug real.
- Mantener trazabilidad clara en cada regla que relacione dos o más variables.
- Explicar las reglas de trazabilidad indicando de dónde salen: qué dice una variable, qué dice la otra y por qué juntas generan la validación.
- Crear un Excel limpio de prueba para cada variable o bloque trabajado.
- Validar en pantalla, consola y exportador antes de cerrar una variable.
- Evitar errores basura de variables anteriores en los archivos de prueba.
- Mantener textos visibles claros, cortos y entendibles para el usuario final.
- Si una regla depende de una variable que aún no se ha implementado, se deja pendiente hasta llegar a esa variable.
- El desarrollo es acumulativo: las variables cerradas permanecen activas mientras se agregan nuevas variables.

---

## 4. Product Backlog general

| Épica | Descripción | Estado |
|---|---|---|
| Carga de Excel | Permitir cargar archivos Excel y seleccionar la hoja de trabajo. | Cerrado funcional |
| Reconocimiento de encabezados | Reconocer encabezados cortos, encabezados largos y subvariables del instructivo. | Cerrado funcional |
| Motor de validación | Ejecutar reglas por módulos y mantener el avance acumulativo. | En progreso |
| Resultados en pantalla | Mostrar pacientes procesados, errores, advertencias y detalle de hallazgos. | Cerrado funcional |
| Exportador | Generar matriz marcada con errores y advertencias. | En progreso acumulativo |
| Catálogos | Integrar catálogos como CIE-10, ATC, CUPS y otros según avance. | En progreso |
| Documentación | Mantener matriz de variables, backlog, reglas, trazabilidad y evidencias. | En progreso |
| Validación por variables | Implementar progresivamente las variables del instructivo CAC. | En progreso |

---

## 5. Backlog por sprints

### Sprint 1 — Identificación del usuario

| Variables | Descripción | Estado |
|---|---|---|
| V1-V16 | Datos de identificación del usuario, documento, nacimiento, sexo, régimen, EAPB, municipio y datos básicos. | Cerrado funcional |

---

### Sprint 2A — Diagnóstico inicial

| Variables | Descripción | Estado |
|---|---|---|
| V17-V24 | Diagnóstico del cáncer, fechas, tipo de estudio e información histopatológica. | Cerrado funcional |

---

### Sprint 2B — Confirmación, histología y diferenciación

| Variables | Descripción | Estado |
|---|---|---|
| V25-V28 | IPS de confirmación, primera consulta, histología y grado de diferenciación. | Cerrado funcional |

---

### Sprint 2C — Primera estadificación

| Variables | Descripción | Estado |
|---|---|---|
| V29 | Primera estadificación clínica o patológica según diagnóstico. | Cerrado funcional |

---

### Sprint 2D — Fechas y variables complementarias de estadificación

| Variables | Descripción | Estado |
|---|---|---|
| V30-V33 | Fechas y variables complementarias de estadificación. | Cerrado funcional |

---

### Sprint 2E — Dukes colorrectal

| Variables | Descripción | Estado |
|---|---|---|
| V34-V35 | Estadificación Dukes y fecha de estadificación Dukes para cáncer colorrectal. | Cerrado funcional |

---

### Sprint 3A — Estadificación, riesgo y objetivo de tratamiento

| Variables | Descripción | Estado |
|---|---|---|
| V36-V40 | Ann Arbor/Lugano, Gleason, clasificación de riesgo, fecha de riesgo y objetivo del tratamiento inicial. | Cerrado funcional |

---

### Sprint 3B — Intervención médica y antecedentes

| Variables | Descripción | Estado |
|---|---|---|
| V41-V44 | Intervención médica durante el periodo y antecedente de otro cáncer primario. | Cerrado funcional |

---

### Sprint 3C — Inicio de terapia sistémica

| Variables | Descripción | Estado |
|---|---|---|
| V45-V47 | Indica si recibió quimioterapia u otra terapia sistémica, número de fases, subfases V46.1-V46.8 y número de ciclos. | Cerrado funcional |

---

### Sprint 3D — Primer o único esquema: ubicación, inicio e IPS

| Variables | Descripción | Estado |
|---|---|---|
| V48-V52 | Ubicación temporal, fecha de inicio, número de IPS e IPS1/IPS2 que suministran el primer o único esquema. | Cerrado funcional |

---

### Sprint 3E — Primer o único esquema: medicamentos base

| Variables | Descripción | Estado |
|---|---|---|
| V53-V53.9 | Número de medicamentos propuestos y medicamentos antineoplásicos o terapia hormonal administrados en el primer o único esquema. | Cerrado funcional |

---

### Sprint 3F — Medicamentos adicionales del primer o único esquema

| Variable | Descripción | Trazabilidad principal | Estado |
|---|---|---|---|
| V54 | Medicamento antineoplásico adicional 1. | V45, bloque V53, catálogo ATC | Cerrado funcional |
| V55 | Medicamento antineoplásico adicional 2. | V45, bloque V53, V54, catálogo ATC | Cerrado funcional |
| V56 | Medicamento antineoplásico adicional 3. | V45, bloque V53, V54, V55, catálogo ATC | Cerrado funcional |

---

### Sprint 3G — Cierre del primer o único esquema

| Variable | Descripción | Trazabilidad principal | Estado |
|---|---|---|---|
| V57 | Quimioterapia intratecal en el primer o único esquema. | V45, V57 | Cerrado funcional |
| V58 | Fecha de finalización del primer o único esquema. | V45, V49, V58 | Cerrado funcional |
| V59 | Características actuales del primer o único esquema. | V45, V59 | Cerrado funcional |
| V60 | Motivo de finalización prematura del primer o único esquema. | V59, V60 | Cerrado funcional |

---

### Sprint 3H — Último esquema de terapia sistémica

| Variable | Descripción | Trazabilidad principal | Estado |
|---|---|---|---|
| V61 | Ubicación temporal del último esquema de quimioterapia o terapia sistémica. | V45, V61 | Cerrado funcional |
| V62 | Fecha de inicio del último esquema de quimioterapia o terapia sistémica. | V45, V61, V62 | Cerrado funcional |
| V63 | Número de IPS que suministran el último esquema. | V61, V63 | Pendiente |
| V64 | Código IPS1 del último esquema. | V61, V63, V64 | Pendiente |
| V65 | Código IPS2 del último esquema. | V61, V63, V65 | Pendiente |
| V66 | Número de medicamentos propuestos en el último esquema. | V61, V66 | Pendiente |
| V66.1-V66.9 | Medicamentos administrados del último esquema. | V61, V66, subvariables V66, catálogo ATC | Pendiente |
| V67-V69 | Medicamentos adicionales del último esquema. | V61, bloque V66, V67-V69, catálogo ATC | Pendiente |
| V70 | Quimioterapia intratecal en el último esquema. | V61, V70 | Pendiente |
| V71 | Fecha de finalización del último esquema. | V61, V62, V71 | Pendiente |
| V72 | Características actuales del último esquema. | V61, V72 | Pendiente |
| V73 | Motivo de finalización prematura del último esquema. | V72, V73 | Pendiente |

---

## 6. Sprints pendientes

| Bloque | Variables | Descripción | Estado |
|---|---|---|
| Cirugía | V74-V85 | Cirugía curativa o paliativa, fechas, IPS, CUPS, ubicación temporal y estado vital postquirúrgico. | Pendiente |
| Radioterapia | V86-V105 | Radioterapia, sesiones, fechas, CUPS, IPS, características y motivo de finalización. | Pendiente |
| Trasplante | V106-V110 | Trasplante de células progenitoras hematopoyéticas. | Pendiente |
| Tratamiento complementario | V111-V124 | Cirugía reconstructiva, cuidado paliativo, psiquiatría, nutrición, soporte nutricional y rehabilitación. | Pendiente |
| Situación actual y resultado | V125-V134 | Tratamiento a la fecha de corte, resultado final, estado vital, novedades, muerte, causa, identificador BDUA y fecha de corte. | Pendiente |

---

## 7. Backlog técnico actual

| Tarea | Descripción | Estado |
|---|---|---|
| Cerrar V61 | Validar ubicación temporal del último esquema, catálogo visible, trazabilidad con V45 y exportador. | Cerrado funcional |
| Cerrar V62 | Validar fecha de inicio del último esquema, trazabilidad con V45/V61, lectura como fecha y exportador. | Cerrado funcional |
| Revisar V63 | Analizar instructivo y definir reglas estrictas para número de IPS que suministran el último esquema. | Siguiente |
| Reconocer V63 en estructura | Confirmar encabezados reales/cortados de V63 antes de validar reglas. | Pendiente |
| Validar V63 en lector | Confirmar que V63 esté incluida como variable validable. | Pendiente |
| Ejecutar V63 desde el motor | Confirmar que el motor ejecute el módulo correspondiente cuando el archivo incluya V63. | Pendiente |
| Crear Excel limpio V63 | Preparar casos de error y casos correctos para validar V63 sin contaminar V1-V62. | Pendiente |
| Revisar exportador V63 | Confirmar que la matriz marcada señale únicamente las filas con error/advertencia en V63. | Pendiente |
| Cerrar V63 | Cerrar funcionalmente después de validar estructura, reglas, pantalla, consola y exportador. | Pendiente |

---

## 8. Criterios de cierre por variable

Una variable se considera cerrada cuando:

- La estructura reconoce correctamente el encabezado.
- El lector la incluye como variable validable.
- El motor ejecuta el módulo correspondiente.
- Las reglas generan los errores esperados.
- El Excel de prueba incluye errores controlados y casos sin hallazgo.
- La validación en pantalla coincide con lo esperado.
- La revisión en consola confirma los conteos.
- El exportador marca correctamente la matriz.
- No se generan errores ajenos a la variable que se está probando.
- La variable queda documentada en matriz, backlog o trazabilidad según corresponda.

---

## 9. Estado resumido del proyecto

| Bloque | Estado | Observación |
|---|---|---|
| V1-V53.9 | Cerrado funcional | Base acumulativa validada. |
| V54-V56 | Cerrado funcional | Medicamentos adicionales del primer o único esquema. |
| V57-V60 | Cerrado funcional | Cierre del primer o único esquema. |
| V61-V62 | Cerrado funcional | Inicio del bloque de último esquema. |
| V63-V73 | Pendiente | Continuación del último esquema de terapia sistémica. |
| V74-V134 | Pendiente | Bloques posteriores del instructivo. |

---

## 10. Próxima acción

Continuar con **V63 — Número de IPS que suministran el último esquema de este periodo de reporte**.

Pasos inmediatos:

1. Revisar el instructivo exacto de V63.
2. Confirmar si el número permitido será entero positivo o limitado por V64/V65.
3. Definir trazabilidad con V61, V62 y V63 sin adelantar reglas de V64-V65 más allá de lo soportado.
4. Actualizar estructura, lector, motor, módulo de reglas, exportador e index si aplica.
5. Generar Excel limpio de prueba para V63.
6. Validar estructura, conteos y trazabilidad por fila.
7. Revisar exportador.
8. Cerrar V63 funcionalmente antes de avanzar a V64.
