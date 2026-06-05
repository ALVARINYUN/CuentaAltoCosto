# Backlog del Proyecto — Validador CAC

**Proyecto:** Validador CAC — Cohorte Cáncer  
**Objetivo:** desarrollar una herramienta local que permita revisar archivos Excel de la Cuenta de Alto Costo antes del reporte final, identificando errores, advertencias y posibles inconsistencias en la información.  
**Metodología de trabajo:** Scrum, con desarrollo progresivo por sprints y cierre funcional por bloques de variables.  
**Estado actual:** avance funcional cerrado hasta V60. La siguiente variable de trabajo es V61.  
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

### Sprint 2 — Diagnóstico y confirmación

| Variables | Descripción | Estado |
|---|---|---|
| V17-V24 | Diagnóstico del cáncer, fechas, tipo de estudio e información histopatológica. | Cerrado funcional |
| V25-V28 | IPS de confirmación, primera consulta, histología y grado de diferenciación. | Cerrado funcional |
| V29-V35 | Estadificación inicial y variables complementarias del diagnóstico. | Cerrado funcional |

---

### Sprint 3A / 3B — Estadificación, riesgo, intervención y antecedentes

| Variables | Descripción | Estado |
|---|---|---|
| V36 | Estadificación Ann Arbor/Lugano. | Cerrado funcional |
| V37 | Escala Gleason. | Cerrado funcional |
| V38 | Clasificación de riesgo. | Cerrado funcional |
| V39 | Fecha de clasificación de riesgo. | Cerrado funcional |
| V40 | Objetivo del tratamiento inicial. | Cerrado funcional |
| V41 | Intervención médica durante el periodo. | Cerrado funcional |
| V42-V44 | Antecedente de otro cáncer primario. | Cerrado funcional |

---

### Sprint 3E — Terapia sistémica inicial

| Variables | Descripción | Estado |
|---|---|---|
| V45 | Indica si el usuario recibió quimioterapia u otra terapia sistémica. | Cerrado funcional |
| V46-V46.8 | Número de fases y fases de quimioterapia recibidas. | Cerrado funcional |
| V47-V52 | Ciclos, ubicación temporal, fecha de inicio e IPS del primer o único esquema. | Cerrado funcional |
| V53-V53.9 | Número y medicamentos antineoplásicos administrados en el primer o único esquema. | Cerrado funcional |

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
| V61 | Ubicación temporal del último esquema de quimioterapia o terapia sistémica. | V45, V61 | En revisión |
| V62 | Fecha de inicio del último esquema. | V61, V62 | Pendiente |
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

### Sprints pendientes

| Bloque | Variables | Descripción | Estado |
|---|---|---|---|
| Cirugía | V74-V85 | Cirugía curativa o paliativa, fechas, IPS, CUPS, ubicación temporal y estado vital postquirúrgico. | Pendiente |
| Radioterapia | V86-V105 | Radioterapia, sesiones, fechas, CUPS, IPS, características y motivo de finalización. | Pendiente |
| Trasplante | V106-V110 | Trasplante de células progenitoras hematopoyéticas. | Pendiente |
| Tratamiento complementario | V111-V124 | Cirugía reconstructiva, cuidado paliativo, psiquiatría, nutrición, soporte nutricional y rehabilitación. | Pendiente |
| Situación actual y resultado | V125-V134 | Tratamiento a la fecha de corte, resultado final, estado vital, novedades, muerte, causa, identificador BDUA y fecha de corte. | Pendiente |

---

## 6. Backlog técnico actual

| Tarea | Descripción | Estado |
|---|---|---|
| Revisar V61 | Analizar el instructivo y definir reglas estrictas sin adelantar V62-V73. | En revisión |
| Activar módulo 14 | Mantener preparado el módulo correspondiente al bloque de último esquema. | En revisión |
| Reconocer V61 en estructura | Confirmar que la aplicación reconozca encabezados reales de V61. | En revisión |
| Validar V61 en lector | Confirmar que V61 esté incluida como variable validable. | En revisión |
| Ejecutar V61 desde el motor | Confirmar que el motor ejecute el módulo correspondiente cuando el archivo incluya V61. | En revisión |
| Crear Excel limpio V61 | Preparar casos de error y casos correctos para validar V61. | Pendiente |
| Revisar exportador V61 | Confirmar que la matriz marcada señale únicamente las filas con error en V61. | Pendiente |
| Cerrar V61 | Cerrar funcionalmente después de validar estructura, reglas, pantalla, consola y exportador. | Pendiente |

---

## 7. Criterios de cierre por variable

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

## 8. Estado resumido del proyecto

| Bloque | Estado | Observación |
|---|---|---|
| V1-V53.9 | Cerrado funcional | Base acumulativa validada. |
| V54-V56 | Cerrado funcional | Medicamentos adicionales del primer o único esquema. |
| V57-V60 | Cerrado funcional | Cierre del primer o único esquema. |
| V61 | En revisión | Inicio del bloque de último esquema. |
| V62-V73 | Pendiente | Último esquema de terapia sistémica. |
| V74-V134 | Pendiente | Bloques posteriores del instructivo. |

---

## 9. Próxima acción

Continuar con V61, manteniendo cerrado el avance hasta V60.

Pasos inmediatos:

1. Revisar nuevamente el instructivo de V61.
2. Confirmar reglas permitidas sin usar todavía V62-V73.
3. Generar Excel limpio de prueba para V61.
4. Validar estructura, conteos y trazabilidad por fila.
5. Revisar el exportador.
6. Cerrar V61 funcionalmente antes de avanzar a V62.
