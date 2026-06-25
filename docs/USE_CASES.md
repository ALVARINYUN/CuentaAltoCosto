# Casos de Uso — Validador CAC

**Proyecto:** Validador CAC — Cáncer
**Documento:** Casos de uso funcionales del sistema
**Estado actual:** avance funcional validado hasta **V134**
**Siguiente fase de trabajo:** ajuste de advertencias en APP, revisión documental y auditoría global
**Versión:** 3.0
**Fecha de actualización:** Junio 2026

---

## 1. Propósito

Este documento describe los principales casos de uso del **Validador CAC — Cáncer**.

Cada caso explica cómo interactúa el usuario con la aplicación y qué debe hacer el sistema en cada paso.

Esta actualización deja el documento alineado con el estado actual del proyecto: carga de Excel, validación acumulativa V1-V134, revisión de hallazgos, exportación del reporte, funcionamiento local, consulta documental de matriz y fase actual de ajuste de advertencias.

---

## 2. Cómo leer este documento

Cada caso de uso contiene:

```text
ID y nombre del caso de uso
Historias cubiertas
Actor principal
Precondiciones
Flujo principal
Flujos alternos
Postcondición
Reglas de negocio
Estado
```

Los casos cerrados describen funcionalidades ya implementadas.

Los casos en mejora continua sirven como guía para ajustes de interfaz, documentación, claridad de mensajes o depuración de advertencias.

---

## 3. Índice

* [Flujo 1 — Cargar y preparar archivo](#flujo-1--cargar-y-preparar-archivo)

  * CU-01 — Cargar archivo Excel
  * CU-02 — Seleccionar hoja de trabajo
  * CU-03 — Validar estructura del archivo
* [Flujo 2 — Ejecutar validación](#flujo-2--ejecutar-validación)

  * CU-04 — Validar archivo acumulativo V1-V134
  * CU-05 — Validar bloque de identificación V1-V16
  * CU-06 — Validar bloque diagnóstico V17-V44
  * CU-07 — Validar terapia sistémica V45-V73
  * CU-08 — Validar cirugía V74-V85
  * CU-09 — Validar radioterapia V86-V105
  * CU-10 — Validar trasplante V106-V110
  * CU-11 — Validar tratamiento complementario V111-V124
  * CU-12 — Validar situación final V125-V134
* [Flujo 3 — Revisar resultados](#flujo-3--revisar-resultados)

  * CU-13 — Visualizar resumen de resultados
  * CU-14 — Revisar hallazgos por paciente
  * CU-15 — Buscar paciente por documento
  * CU-16 — Diferenciar errores y advertencias
* [Flujo 4 — Exportar evidencias](#flujo-4--exportar-evidencias)

  * CU-17 — Exportar reporte Excel marcado
* [Flujo 5 — Privacidad y funcionamiento local](#flujo-5--privacidad-y-funcionamiento-local)

  * CU-18 — Funcionamiento local
  * CU-19 — Borrado de datos al cerrar
* [Flujo 6 — Consulta documental y continuidad](#flujo-6--consulta-documental-y-continuidad)

  * CU-20 — Consultar matriz funcional V1-V134
  * CU-21 — Ajustar advertencias sin tocar errores
  * CU-22 — Mantener documentación del proyecto actualizada

---

# Flujo 1 — Cargar y preparar archivo

## CU-01 — Cargar archivo Excel

**Historias cubiertas:** HU-004, HU-039
**Actor principal:** Analista de calidad

**Precondiciones:**

* El analista tiene un archivo Excel con datos CAC.
* La aplicación está abierta en el navegador.

**Flujo principal:**

1. El analista abre la aplicación.
2. Selecciona o arrastra el archivo Excel.
3. El sistema valida que el archivo tenga formato compatible.
4. El sistema lee el archivo en el navegador.
5. El sistema muestra el nombre del archivo cargado.
6. El sistema habilita la selección de hoja.

**Flujos alternos:**

*FA-01.1 — Archivo no compatible*

* Si el archivo no es Excel, el sistema muestra un mensaje claro.
* El usuario debe cargar un archivo válido.

*FA-01.2 — Archivo dañado o ilegible*

* Si el archivo no se puede leer, el sistema informa el problema.
* El usuario debe revisar el archivo original y volver a cargarlo.

**Postcondición:** El archivo queda cargado en memoria del navegador.

**Reglas de negocio:**

* El archivo no se sube a servidores externos.
* El procesamiento se realiza localmente.
* No se debe guardar información clínica en almacenamiento persistente del navegador.

**Estado:** Cerrado funcional.

---

## CU-02 — Seleccionar hoja de trabajo

**Historias cubiertas:** HU-004, HU-005
**Actor principal:** Analista de calidad

**Precondiciones:**

* El archivo Excel ya fue cargado correctamente.
* El archivo contiene una o más hojas.

**Flujo principal:**

1. El sistema muestra las hojas disponibles.
2. El analista selecciona la hoja que contiene los datos.
3. El sistema lee los encabezados de la hoja.
4. El sistema identifica desde qué fila empiezan los datos.
5. El sistema muestra cantidad de pacientes leídos.
6. El sistema deja lista la hoja para validación.

**Flujos alternos:**

*FA-02.1 — Hoja sin datos*

* Si la hoja no contiene registros, el sistema informa que no hay pacientes para validar.
* El usuario puede seleccionar otra hoja.

*FA-02.2 — Hoja equivocada*

* Si la hoja no tiene estructura reconocible, el sistema muestra que no cumple la estructura mínima.
* El usuario puede cargar otra hoja o revisar el archivo.

**Postcondición:** La hoja queda seleccionada y lista para validar.

**Reglas de negocio:**

* La aplicación puede trabajar con hojas de prueba parciales.
* Para base real final, debe reconocer la estructura acumulativa V1-V134.
* No debe exigir variables futuras porque el proyecto ya cerró hasta V134.
* Las hojas auxiliares del Excel, si existen, no deben confundirse con la hoja principal de datos.

**Estado:** Cerrado funcional.

---

## CU-03 — Validar estructura del archivo

**Historias cubiertas:** HU-005
**Actor principal:** Sistema

**Precondiciones:**

* Una hoja de trabajo fue seleccionada.

**Flujo principal:**

1. El sistema analiza los encabezados.
2. Reconoce variables simples y subvariables.
3. Acepta encabezados reales, largos o cortados del instructivo.
4. Identifica el modo acumulativo de validación, por ejemplo `ACUMULATIVO_V1_V134`.
5. Informa si la estructura es válida.
6. Habilita el botón de validación.

**Flujos alternos:**

*FA-03.1 — Faltan variables esperadas*

* El sistema muestra qué variables faltan.
* El botón de validación queda deshabilitado si la estructura mínima no se cumple.

*FA-03.2 — Columnas adicionales*

* El sistema ignora columnas no necesarias para la validación.
* Continúa con las columnas reconocidas.

**Postcondición:** La estructura queda validada y lista para ejecutar reglas.

**Reglas de negocio:**

* El reconocimiento de encabezados debe respetar el avance funcional cerrado V1-V134.
* Las variables anteriores cerradas deben seguir activas.
* No se debe romper la compatibilidad con subvariables.
* El sistema debe conservar ceros iniciales cuando los campos corresponden a códigos IPS, códigos administrativos o identificadores.

**Estado:** Cerrado funcional hasta V134.

---

# Flujo 2 — Ejecutar validación

## CU-04 — Validar archivo acumulativo V1-V134

**Historias cubiertas:** HU-010, HU-011, HU-012, HU-016
**Actor principal:** Sistema

**Precondiciones:**

* La hoja tiene estructura válida.
* El usuario hace clic en validar.

**Flujo principal:**

1. El sistema recorre los registros de pacientes.
2. Ejecuta el motor de validación.
3. El motor llama los módulos activos según las variables presentes.
4. Cada módulo genera hallazgos cuando detecta errores o advertencias.
5. El sistema conserva los resultados por paciente.
6. Al finalizar, muestra resumen general.

**Flujos alternos:**

*FA-04.1 — Error técnico durante validación*

* El sistema muestra mensaje de error.
* No debe borrar el archivo cargado hasta que el usuario decida cargar otro.

**Postcondición:** Se generan resultados de validación.

**Reglas de negocio:**

* Las variables cerradas no se desactivan.
* No se deben generar errores basura de bloques anteriores en archivos limpios de prueba.
* No se deben aplicar reglas no soportadas por instructivo.
* Los errores cerrados no se deben tocar durante la fase de ajuste de advertencias.
* Las advertencias deben revisarse para eliminar falsos positivos por valores permitidos.

**Estado:** Cerrado funcional hasta V134.

---

## CU-05 — Validar bloque de identificación V1-V16

**Historias cubiertas:** HU-010, HU-016
**Actor principal:** Sistema

**Precondiciones:**

* La validación está en curso.

**Flujo principal:**

1. El sistema valida datos de identificación.
2. Revisa nombres, apellidos, tipo y número de documento.
3. Valida sexo, régimen, municipio, teléfono y fecha de afiliación.
4. Aplica coherencias entre variables cuando corresponda.
5. Registra errores y advertencias.

**Postcondición:** Se generan hallazgos del bloque de identificación.

**Reglas de negocio:**

* Las reglas con trazabilidad deben explicar de dónde sale la coherencia.
* Los comodines permitidos por instructivo no deben generar advertencia por sí solos.
* El sistema debe evitar advertencias innecesarias en campos válidos como `NONE`, `NOAP`, `9998`, `9999` y `0`, cuando apliquen según instructivo.

**Estado:** Cerrado funcional.

---

## CU-06 — Validar bloque diagnóstico V17-V44

**Historias cubiertas:** HU-011, HU-016
**Actor principal:** Sistema

**Precondiciones:**

* La validación está en curso.

**Flujo principal:**

1. El sistema valida diagnóstico, fechas, estudio diagnóstico e histopatología.
2. Valida CIE-10 contra catálogo.
3. Aplica reglas por diagnóstico cuando corresponde.
4. Valida estadificación, riesgo, intervención médica y antecedentes.
5. Registra errores y advertencias con datos involucrados.

**Postcondición:** Se generan hallazgos del bloque diagnóstico.

**Reglas de negocio:**

* Las reglas por diagnóstico deben usar catálogo e instructivo.
* Las variables con comodines permitidos deben validarse por contexto, no por el comodín aislado.
* Los códigos CIE-10 deben revisarse contra catálogo operativo.
* Las reglas de soporte clínico pueden generar advertencia, pero no deben convertirse en error sin instrucción clara.

**Estado:** Cerrado funcional.

---

## CU-07 — Validar terapia sistémica V45-V73

**Historias cubiertas:** HU-012, HU-016, HU-021
**Actor principal:** Sistema

**Precondiciones:**

* La validación está en curso.
* El archivo contiene variables de terapia sistémica hasta V73.

**Flujo principal:**

1. El sistema valida V45 como variable de control del bloque.
2. Valida fases, ciclos, ubicación, fecha de inicio e IPS del primer o único esquema.
3. Valida medicamentos base V53.1-V53.9 contra catálogo ATC.
4. Valida medicamentos adicionales V54-V56.
5. Valida quimioterapia intratecal V57.
6. Valida fecha de finalización V58.
7. Valida características actuales V59.
8. Valida motivo de finalización prematura V60.
9. Valida ubicación, fecha e IPS del último esquema en V61-V65.
10. Valida número de medicamentos propuestos del último esquema en V66.
11. Valida medicamentos del último esquema V66.1-V66.9.
12. Valida medicamentos adicionales V67-V69.
13. Valida intratecal, finalización, características y motivo del último esquema V70-V73.
14. Registra hallazgos con trazabilidad clara.

**Postcondición:** Se generan hallazgos del bloque de terapia sistémica hasta V73.

**Reglas de negocio:**

* V45 controla la aplicabilidad general del bloque.
* V53.1 no permite `97`.
* V53.2-V53.9 permiten `97` según instructivo.
* V66.1 no permite `97`.
* V66.2-V66.9 permiten `97` según instructivo.
* V54-V56 no deben repetir medicamentos del bloque V53.
* V67-V69 no deben repetir medicamentos del bloque V66.
* V58 se cruza con V45 y V49 cuando corresponde.
* V60 se controla principalmente desde V59.
* V61 controla si existe último esquema real o si sólo hubo un esquema.
* V71 se cruza con V61, V62 y V72.
* V73 se controla principalmente desde V72.

**Estado:** Cerrado funcional.

---

## CU-08 — Validar cirugía V74-V85

**Historias cubiertas:** HU-016, HU-021
**Actor principal:** Sistema

**Precondiciones:**

* La validación está en curso.
* El archivo contiene variables de cirugía V74-V85.

**Flujo principal:**

1. El sistema valida V74 como variable de control del bloque.
2. Valida número de cirugías V75.
3. Valida fecha, IPS, CUPS y ubicación temporal de primera cirugía V76-V79.
4. Valida fecha, motivo, IPS, CUPS y ubicación temporal de última cirugía V80-V84.
5. Valida estado vital al finalizar la única o última cirugía V85.
6. Registra hallazgos con trazabilidad.

**Postcondición:** Se generan hallazgos del bloque de cirugía.

**Reglas de negocio:**

* V74=2 controla No Aplica en V75-V85.
* V75=1 controla No Aplica para variables de última cirugía o reintervención.
* V80 no debe reportar nuevamente el evento quirúrgico de primera cirugía.
* V78 y V83 deben corresponder a CUPS quirúrgicos pertinentes al manejo del cáncer.
* No se reportan cirugías propuestas no realizadas.
* No se reportan procedimientos excluidos por instructivo como implante de catéter, punción lumbar, biopsias o cierre de ostomías.
* Los comodines `98`, `96` y `1845-01-01` no deben generar advertencia por sí solos cuando aplican.

**Estado:** Cerrado funcional.

---

## CU-09 — Validar radioterapia V86-V105

**Historias cubiertas:** HU-016, HU-021
**Actor principal:** Sistema

**Precondiciones:**

* La validación está en curso.
* El archivo contiene variables de radioterapia V86-V105.

**Flujo principal:**

1. El sistema valida V86 como variable de control del bloque.
2. Valida número de sesiones V87.
3. Valida primer o único esquema de radioterapia V88-V96.
4. Valida último esquema de radioterapia V97-V105.
5. Valida fechas de inicio y finalización.
6. Valida IPS, CUPS, características actuales y motivos de finalización.
7. Registra hallazgos con trazabilidad clara.

**Postcondición:** Se generan hallazgos del bloque de radioterapia.

**Reglas de negocio:**

* V86=98 controla No Aplica en V87-V105.
* No aplica radioterapia propuesta pero no suministrada.
* V94 permite `1800-01-01` si el esquema aún no finaliza.
* V103 permite `1800-01-01` si el último esquema aún no finaliza.
* V94 y V103 permiten `1845-01-01` cuando no aplica.
* V95 se controla con V94.
* V96 se controla con V95.
* V104 se controla con V103.
* V105 se controla con V104.
* Los comodines permitidos no deben generar advertencia por sí solos.

**Estado:** Cerrado funcional.

---

## CU-10 — Validar trasplante V106-V110

**Historias cubiertas:** HU-016, HU-021
**Actor principal:** Sistema

**Precondiciones:**

* La validación está en curso.
* El archivo contiene variables de trasplante V106-V110.

**Flujo principal:**

1. El sistema valida V106 como variable de control.
2. Valida tipo de trasplante V107.
3. Valida ubicación temporal V108.
4. Valida fecha de trasplante V109.
5. Valida IPS que realizó el trasplante V110.
6. Registra hallazgos.

**Postcondición:** Se generan hallazgos del bloque de trasplante.

**Reglas de negocio:**

* V106 sólo permite `1` o `98`.
* Si V106=98, V107-V110 deben registrar No Aplica.
* No aplica trasplante propuesto no realizado.
* No aplican trasplantes de órganos sólidos u otros no relacionados con progenitores hematopoyéticos.
* V110 permite `96` para trasplante fuera del país.
* Los comodines permitidos no deben generar advertencia por sí solos.

**Estado:** Cerrado funcional.

---

## CU-11 — Validar tratamiento complementario V111-V124

**Historias cubiertas:** HU-016, HU-021
**Actor principal:** Sistema

**Precondiciones:**

* La validación está en curso.
* El archivo contiene variables de tratamiento complementario V111-V124.

**Flujo principal:**

1. Valida cirugía reconstructiva V111-V113.
2. Valida cuidado paliativo V114-V116.
3. Valida valoración por psiquiatría V117-V119.
4. Valida valoración por nutrición V120-V122.
5. Valida soporte nutricional V123.
6. Valida terapias complementarias V124.
7. Registra hallazgos con trazabilidad.

**Postcondición:** Se generan hallazgos del bloque de tratamiento complementario.

**Reglas de negocio:**

* V111 controla V112 y V113.
* Si cirugía reconstructiva fue en el mismo tiempo quirúrgico de cirugía curativa, no se reporta como reconstructiva independiente.
* V114 controla V114.1-V114.6, V115 y V116.
* Las opciones eliminadas no deben aceptarse.
* V117 controla V118 y V119.
* V120 controla V121 y V122.
* V123 no debe aceptar fórmulas orales como soporte nutricional enteral/parenteral.
* V124 permite combinaciones válidas de terapias.
* Los valores `2`, `98` y `1845-01-01` permitidos no deben generar advertencia por sí solos.

**Estado:** Cerrado funcional.

---

## CU-12 — Validar situación final V125-V134

**Historias cubiertas:** HU-016, HU-021, HU-027
**Actor principal:** Sistema

**Precondiciones:**

* La validación está en curso.
* El archivo contiene variables finales V125-V134.

**Flujo principal:**

1. Valida tipo de tratamiento a la fecha de corte V125.
2. Valida resultado final del manejo oncológico V126.
3. Valida estado vital V127.
4. Valida novedad administrativa V128.
5. Valida novedad clínica V129.
6. Valida fecha de desafiliación V130.
7. Valida fecha de muerte V131.
8. Valida causa de muerte V132.
9. Valida código único BDUA-BDEX-PVS V133.
10. Valida fecha de corte V134.
11. Registra hallazgos con trazabilidad clínica y administrativa.

**Postcondición:** Se generan hallazgos del bloque final V125-V134.

**Reglas de negocio:**

* V125 debe reflejar situación del usuario a `2025-01-01`.
* V126 debe ser coherente con tratamiento, estado vital y novedad.
* V127 controla V131 y V132.
* V128 debe ser coherente con fallecimiento, desafiliación, abandono, alta voluntaria, cambio de identificación, cambio de CIE-10, fuentes externas y múltiples cánceres.
* V129 debe ser coherente con V125, V126, V127 y V128.
* Si el paciente falleció y también se desafilió, prima muerte: V131 registra fecha de muerte y V130 queda en `1845-01-01`.
* V132=98 aplica si usuario está vivo o se desconoce estado vital.
* V134 debe ser exactamente `2025-01-01`.

**Estado:** Cerrado funcional.

---

# Flujo 3 — Revisar resultados

## CU-13 — Visualizar resumen de resultados

**Historias cubiertas:** HU-022, HU-027
**Actor principal:** Analista de calidad

**Precondiciones:**

* La validación terminó.

**Flujo principal:**

1. El sistema muestra pacientes procesados.
2. Muestra pacientes con errores.
3. Muestra pacientes con advertencias.
4. Muestra pacientes sin problemas.
5. Permite pasar al detalle de hallazgos.

**Postcondición:** El analista conoce el estado general del archivo.

**Reglas de negocio:**

* El indicador de pacientes con advertencias debe contar pacientes que tengan advertencias, incluso si también tienen errores.
* El indicador de pacientes sin problemas sólo cuenta registros sin errores ni advertencias.
* Los conteos deben corresponder al resultado real del motor, no a cálculos duplicados de pantalla.

**Estado:** Cerrado funcional.

---

## CU-14 — Revisar hallazgos por paciente

**Historias cubiertas:** HU-022, HU-035
**Actor principal:** Analista de calidad

**Precondiciones:**

* Existen resultados de validación.

**Flujo principal:**

1. El sistema muestra una lista de pacientes o registros.
2. El analista selecciona un paciente.
3. El sistema muestra los hallazgos asociados.
4. Cada hallazgo muestra variable, título, explicación, datos involucrados y recomendación.
5. El analista identifica qué debe corregir en la matriz.

**Flujos alternos:**

*FA-14.1 — Paciente sin hallazgos*

* El sistema indica que el registro no tiene errores ni advertencias.

**Postcondición:** El analista puede corregir la matriz con base en los hallazgos.

**Reglas de negocio:**

* Los mensajes deben ser claros y operativos.
* Las reglas cruzadas deben explicar la relación entre variables.
* Los hallazgos deben indicar la variable afectada.
* No se deben mostrar advertencias para valores que el instructivo permite sin condición adicional.

**Estado:** Cerrado funcional, con mejoras continuas de redacción.

---

## CU-15 — Buscar paciente por documento

**Historias cubiertas:** HU-023
**Actor principal:** Analista de calidad

**Precondiciones:**

* Existen resultados de validación.

**Flujo principal:**

1. El analista escribe el documento o parte del documento.
2. El sistema filtra los resultados.
3. Se muestran los pacientes coincidentes.
4. El analista abre el detalle del paciente.

**Flujos alternos:**

*FA-15.1 — Sin resultados*

* El sistema informa que no encontró coincidencias.
* El usuario puede limpiar la búsqueda.

**Postcondición:** El analista localiza un registro específico.

**Estado:** Implementado o sujeto a mejora de interfaz.

---

## CU-16 — Diferenciar errores y advertencias

**Historias cubiertas:** HU-022, HU-027, HU-035
**Actor principal:** Analista de calidad

**Precondiciones:**

* La validación terminó.
* Existen hallazgos de error o advertencia.

**Flujo principal:**

1. El sistema clasifica los hallazgos como error o advertencia.
2. El analista revisa primero los errores.
3. El analista revisa después las advertencias.
4. El sistema permite identificar variable, paciente y mensaje.
5. El analista decide si debe corregir el Excel o revisar soporte.

**Postcondición:** El analista diferencia hallazgos bloqueantes de hallazgos de revisión.

**Reglas de negocio:**

* Los errores son inconsistencias cerradas y no se modifican en la fase actual.
* Las advertencias son señales de revisión.
* Las advertencias no deben castigar valores permitidos por instructivo.
* Si un valor permitido requiere soporte clínico, puede mantenerse como advertencia justificada.
* Si un valor permitido no tiene condición adicional, no debe generar advertencia.

**Estado:** En mejora continua por fase de ajuste de advertencias.

---

# Flujo 4 — Exportar evidencias

## CU-17 — Exportar reporte Excel marcado

**Historias cubiertas:** HU-030
**Actor principal:** Analista de calidad

**Precondiciones:**

* La validación terminó.
* Existen resultados en memoria.

**Flujo principal:**

1. El analista selecciona exportar reporte.
2. El sistema genera un archivo Excel.
3. El exportador marca en rojo las celdas con error.
4. El exportador marca en amarillo las celdas con advertencia.
5. El archivo mantiene la estructura de la matriz.
6. El navegador descarga el reporte.

**Flujos alternos:**

*FA-17.1 — Sin errores*

* El sistema puede generar reporte sin celdas marcadas.
* El archivo queda como evidencia de validación.

**Postcondición:** El analista tiene un Excel de evidencia para revisar o compartir.

**Reglas de negocio:**

* El exportador debe marcar sólo la celda afectada.
* Debe reconocer variables simples y subvariables.
* No debe marcar variables que no tengan hallazgo real.
* Debe soportar acumulado V1-V134.
* Debe conservar estructura y datos originales del archivo cargado.
* No debe eliminar ceros iniciales en códigos IPS o identificadores.

**Estado:** Cerrado funcional hasta V134, con revisión acumulativa.

---

# Flujo 5 — Privacidad y funcionamiento local

## CU-18 — Funcionamiento local

**Historias cubiertas:** HU-036, HU-039
**Actor principal:** Analista de calidad

**Precondiciones:**

* El proyecto está en el equipo local.
* El usuario abre la aplicación en navegador o servidor local.

**Flujo principal:**

1. El usuario abre la aplicación.
2. Carga el archivo Excel.
3. La validación se ejecuta localmente.
4. No se envían datos a servidores externos.
5. El usuario exporta el reporte en su equipo.

**Postcondición:** La validación se realiza en entorno local.

**Reglas de negocio:**

* Los datos de pacientes no salen del equipo.
* No se usan cookies ni almacenamiento permanente para datos clínicos.
* El funcionamiento debe ser compatible con servidor local tipo `python -m http.server`.

**Estado:** Cerrado funcional local.

---

## CU-19 — Borrado de datos al cerrar

**Historias cubiertas:** HU-036
**Actor principal:** Sistema

**Precondiciones:**

* Hay un archivo cargado o resultados en memoria.

**Flujo principal:**

1. El usuario cierra o recarga la pestaña.
2. El navegador libera la información cargada en memoria.
3. Para volver a validar, el usuario debe cargar de nuevo el archivo.

**Postcondición:** La información cargada deja de estar disponible en la aplicación.

**Reglas de negocio:**

* No se guardan datos de pacientes en localStorage ni cookies.
* La evidencia persistente sólo existe si el usuario descarga un archivo exportado.
* Si se recarga la página, el usuario debe cargar nuevamente el Excel.

**Estado:** Cerrado funcional local.

---

# Flujo 6 — Consulta documental y continuidad

## CU-20 — Consultar matriz funcional V1-V134

**Historias cubiertas:** HU-040
**Actor principal:** Analista de calidad / desarrollador / auditor interno

**Precondiciones:**

* Existe documento de matriz funcional actualizado hasta V134.
* La aplicación puede enlazar o mostrar el documento sin duplicar la matriz en JavaScript.

**Flujo principal:**

1. El usuario abre la aplicación.
2. Selecciona la opción para consultar la matriz de variables.
3. El sistema muestra o enlaza la matriz funcional V1-V134.
4. El usuario consulta reglas, dependencias, comodines y severidades.
5. El usuario vuelve a la validación cuando lo necesite.

**Postcondición:** El usuario puede consultar la matriz funcional sin salir del flujo operativo.

**Reglas de negocio:**

* La matriz documental debe ser fuente única.
* No se debe duplicar la matriz completa en archivos JS si ya existe en `.md`.
* El documento debe estar alineado con el instructivo oficial y el estado funcional V1-V134.
* La app puede mostrar el `.md` como texto o enlazarlo desde la interfaz.

**Estado:** Pendiente de implementación visual en APP.

---

## CU-21 — Ajustar advertencias sin tocar errores

**Historias cubiertas:** HU-041
**Actor principal:** Desarrollador / mantenedor

**Precondiciones:**

* El sistema está cerrado funcionalmente hasta V134.
* Existen resultados de validación con advertencias.
* Los errores están cerrados y no deben modificarse en esta fase.

**Flujo principal:**

1. Se toma un bloque o módulo para revisión.
2. Se revisan advertencias generadas.
3. Se compara cada advertencia contra instructivo oficial.
4. Se identifica si la advertencia es justificada o falso positivo.
5. Si es falso positivo por valor permitido, se ajusta sólo la advertencia.
6. Se prueba con Excel real o controlado.
7. Se confirma que no aparezcan errores nuevos ni cambios en errores cerrados.
8. Se documenta el ajuste.

**Postcondición:** Las advertencias quedan más limpias y útiles para el usuario.

**Reglas de negocio:**

* Los errores no se tocan.
* No se eliminan errores.
* No se reclasifican errores como advertencias.
* No se suavizan errores cerrados.
* Sólo se ajustan advertencias.
* Un comodín permitido por instructivo no debe generar advertencia por sí solo.
* Una advertencia puede mantenerse si exige soporte, trazabilidad, catálogo operativo o revisión clínica.
* Todo ajuste debe probarse contra base real o archivo controlado.

**Estado:** Fase actual.

---

## CU-22 — Mantener documentación del proyecto actualizada

**Historias cubiertas:** HU-042
**Actor principal:** Desarrollador / mantenedor

**Precondiciones:**

* Existe documentación en carpeta `docs`.
* El proyecto tuvo cierre funcional hasta V134.

**Flujo principal:**

1. Se revisan documentos `.md` existentes.
2. Se detectan textos desactualizados como V66, V86 o variables pendientes.
3. Se actualiza el estado funcional a V134.
4. Se ajustan casos de uso, backlog, matriz, arquitectura o auditoría según corresponda.
5. Se evita duplicar información innecesaria.
6. Se mantiene documentación legible, práctica y operativa.

**Postcondición:** La documentación refleja el estado real del proyecto.

**Reglas de negocio:**

* La documentación no debe decir que V67-V134 están pendientes si ya están cerradas.
* La documentación debe indicar que la fase actual es ajuste de advertencias y auditoría.
* No se deben inventar reglas nuevas en documentación.
* La matriz por variable debe derivarse del instructivo oficial.
* Los documentos deben ser claros y útiles para continuar el proyecto sin incoherencias.

**Estado:** En actualización.

---

# Resumen de cobertura

| Caso de uso | Historias cubiertas            | Estado                              |
| ----------- | ------------------------------ | ----------------------------------- |
| CU-01       | HU-004, HU-039                 | Cerrado funcional                   |
| CU-02       | HU-004, HU-005                 | Cerrado funcional                   |
| CU-03       | HU-005                         | Cerrado funcional hasta V134        |
| CU-04       | HU-010, HU-011, HU-012, HU-016 | Cerrado funcional hasta V134        |
| CU-05       | HU-010, HU-016                 | Cerrado funcional                   |
| CU-06       | HU-011, HU-016                 | Cerrado funcional                   |
| CU-07       | HU-012, HU-016, HU-021         | Cerrado funcional                   |
| CU-08       | HU-016, HU-021                 | Cerrado funcional                   |
| CU-09       | HU-016, HU-021                 | Cerrado funcional                   |
| CU-10       | HU-016, HU-021                 | Cerrado funcional                   |
| CU-11       | HU-016, HU-021                 | Cerrado funcional                   |
| CU-12       | HU-016, HU-021, HU-027         | Cerrado funcional                   |
| CU-13       | HU-022, HU-027                 | Cerrado funcional                   |
| CU-14       | HU-022, HU-035                 | Cerrado funcional / mejora continua |
| CU-15       | HU-023                         | Implementado / mejora futura        |
| CU-16       | HU-022, HU-027, HU-035         | Mejora continua                     |
| CU-17       | HU-030                         | Cerrado funcional hasta V134        |
| CU-18       | HU-036, HU-039                 | Cerrado funcional local             |
| CU-19       | HU-036                         | Cerrado funcional local             |
| CU-20       | HU-040                         | Pendiente visual en APP             |
| CU-21       | HU-041                         | Fase actual                         |
| CU-22       | HU-042                         | En actualización                    |

---

# Estado general

| Concepto                        | Estado                                              |
| ------------------------------- | --------------------------------------------------- |
| Casos de uso base               | Actualizados                                        |
| Avance funcional reflejado      | V1-V134                                             |
| Variables cerradas              | V1-V134                                             |
| Fase actual                     | Ajuste de advertencias en APP                       |
| Restricción principal           | No tocar errores cerrados                           |
| Matriz funcional                | Actualizada por variable V1-V134                    |
| Bloques pendientes de variables | Ninguno                                             |
| Pendiente operativo             | Mostrar matriz global en APP y auditar advertencias |
