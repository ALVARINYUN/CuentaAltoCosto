# Casos de Uso — Validador CAC

**Proyecto:** Validador CAC — Cohorte Cáncer  
**Documento:** Casos de uso funcionales del sistema  
**Estado actual:** avance funcional validado hasta V60  
**Siguiente bloque de trabajo:** V61 — último esquema de terapia sistémica  
**Versión:** 2.0  
**Fecha de actualización:** Junio 2026  

---

## 1. Propósito

Este documento describe los principales casos de uso del Validador CAC.  
Cada caso explica cómo interactúa el usuario con la aplicación y qué debe hacer el sistema en cada paso.

La versión inicial estaba enfocada en el Sprint 1. Esta actualización deja el documento alineado con el avance actual del proyecto: carga de Excel, validación acumulativa, revisión de hallazgos, exportación del reporte y avance funcional cerrado hasta V60.

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
Los casos en revisión o pendientes sirven como guía para continuar el desarrollo.

---

## 3. Índice

- [Flujo 1 — Cargar y preparar archivo](#flujo-1--cargar-y-preparar-archivo)
  - CU-01 — Cargar archivo Excel
  - CU-02 — Seleccionar hoja de trabajo
  - CU-03 — Validar estructura del archivo
- [Flujo 2 — Ejecutar validación](#flujo-2--ejecutar-validación)
  - CU-04 — Validar archivo acumulativo
  - CU-05 — Validar bloque de identificación V1-V16
  - CU-06 — Validar bloque diagnóstico V17-V44
  - CU-07 — Validar terapia sistémica V45-V60
- [Flujo 3 — Revisar resultados](#flujo-3--revisar-resultados)
  - CU-08 — Visualizar resumen de resultados
  - CU-09 — Revisar hallazgos por paciente
  - CU-10 — Buscar paciente por documento
- [Flujo 4 — Exportar evidencias](#flujo-4--exportar-evidencias)
  - CU-11 — Exportar reporte Excel marcado
- [Flujo 5 — Privacidad y funcionamiento local](#flujo-5--privacidad-y-funcionamiento-local)
  - CU-12 — Funcionamiento local
  - CU-13 — Borrado de datos al cerrar
- [Flujo 6 — Continuidad del desarrollo](#flujo-6--continuidad-del-desarrollo)
  - CU-14 — Continuar con V61

---

# Flujo 1 — Cargar y preparar archivo

## CU-01 — Cargar archivo Excel

**Historias cubiertas:** HU-004, HU-039  
**Actor principal:** Analista de calidad

**Precondiciones:**
- El analista tiene un archivo Excel con datos CAC.
- La aplicación está abierta en el navegador.

**Flujo principal:**
1. El analista abre la aplicación.
2. Selecciona o arrastra el archivo Excel.
3. El sistema valida que el archivo tenga formato compatible.
4. El sistema lee el archivo en el navegador.
5. El sistema muestra el nombre del archivo cargado.
6. El sistema habilita la selección de hoja.

**Flujos alternos:**

*FA-01.1 — Archivo no compatible*
- Si el archivo no es Excel, el sistema muestra un mensaje claro.
- El usuario debe cargar un archivo válido.

*FA-01.2 — Archivo dañado o ilegible*
- Si el archivo no se puede leer, el sistema informa el problema.
- El usuario debe revisar el archivo original y volver a cargarlo.

**Postcondición:** El archivo queda cargado en memoria del navegador.

**Reglas de negocio:**
- El archivo no se sube a servidores externos.
- El procesamiento se realiza localmente.

**Estado:** Cerrado funcional.

---

## CU-02 — Seleccionar hoja de trabajo

**Historias cubiertas:** HU-004, HU-005  
**Actor principal:** Analista de calidad

**Precondiciones:**
- El archivo Excel ya fue cargado correctamente.
- El archivo contiene una o más hojas.

**Flujo principal:**
1. El sistema muestra las hojas disponibles.
2. El analista selecciona la hoja que contiene los datos.
3. El sistema lee los encabezados de la hoja.
4. El sistema identifica desde qué fila empiezan los datos.
5. El sistema muestra cantidad de pacientes leídos.
6. El sistema deja lista la hoja para validación.

**Flujos alternos:**

*FA-02.1 — Hoja sin datos*
- Si la hoja no contiene registros, el sistema informa que no hay pacientes para validar.
- El usuario puede seleccionar otra hoja.

*FA-02.2 — Hoja equivocada*
- Si la hoja no tiene estructura reconocible, el sistema muestra que no cumple la estructura mínima.
- El usuario puede cargar otra hoja o revisar el archivo.

**Postcondición:** La hoja queda seleccionada y lista para validar.

**Reglas de negocio:**
- La aplicación puede trabajar con hojas de prueba parciales.
- No debe exigir variables futuras si el archivo de prueba solo trae variables hasta el avance actual.

**Estado:** Cerrado funcional.

---

## CU-03 — Validar estructura del archivo

**Historias cubiertas:** HU-005  
**Actor principal:** Sistema

**Precondiciones:**
- Una hoja de trabajo fue seleccionada.

**Flujo principal:**
1. El sistema analiza los encabezados.
2. Reconoce variables simples y subvariables.
3. Acepta encabezados cortos como `V57` y encabezados largos del instructivo.
4. Identifica el modo acumulativo de validación, por ejemplo `ACUMULATIVO_V1_V60`.
5. Informa si la estructura es válida.
6. Habilita el botón de validación.

**Flujos alternos:**

*FA-03.1 — Faltan variables esperadas*
- El sistema muestra qué variables faltan.
- El botón de validación queda deshabilitado si la estructura mínima no se cumple.

*FA-03.2 — Columnas adicionales*
- El sistema ignora columnas no necesarias para la validación actual.
- Continúa con las columnas reconocidas.

**Postcondición:** La estructura queda validada y lista para ejecutar reglas.

**Reglas de negocio:**
- El reconocimiento de encabezados debe respetar el avance funcional del proyecto.
- Las variables anteriores cerradas deben seguir activas.

**Estado:** Cerrado funcional hasta V60.

---

# Flujo 2 — Ejecutar validación

## CU-04 — Validar archivo acumulativo

**Historias cubiertas:** HU-010, HU-011, HU-012, HU-016  
**Actor principal:** Sistema

**Precondiciones:**
- La hoja tiene estructura válida.
- El usuario hace clic en validar.

**Flujo principal:**
1. El sistema recorre los registros de pacientes.
2. Ejecuta el motor de validación.
3. El motor llama los módulos activos según las variables presentes.
4. Cada módulo genera hallazgos cuando detecta errores o advertencias.
5. El sistema conserva los resultados por paciente.
6. Al finalizar, muestra resumen general.

**Flujos alternos:**

*FA-04.1 — Error técnico durante validación*
- El sistema muestra mensaje de error.
- No debe borrar el archivo cargado hasta que el usuario decida cargar otro.

**Postcondición:** Se generan resultados de validación.

**Reglas de negocio:**
- Las variables cerradas no se desactivan al agregar nuevas variables.
- No se deben generar errores basura de bloques anteriores en archivos limpios de prueba.
- No se deben aplicar reglas de variables futuras antes de implementarlas.

**Estado:** Cerrado funcional hasta V60.

---

## CU-05 — Validar bloque de identificación V1-V16

**Historias cubiertas:** HU-010, HU-016  
**Actor principal:** Sistema

**Precondiciones:**
- La validación está en curso.

**Flujo principal:**
1. El sistema valida datos de identificación.
2. Revisa nombres, apellidos, tipo y número de documento.
3. Valida sexo, régimen, municipio, teléfono y fecha de afiliación.
4. Aplica coherencias entre variables cuando corresponda.
5. Registra errores y advertencias.

**Postcondición:** Se generan hallazgos del bloque de identificación.

**Reglas de negocio:**
- No se aplica la regla de fecha de corte para V7, porque fue excluida por decisión del cliente.
- Las reglas con trazabilidad deben explicar de dónde sale la coherencia.

**Estado:** Cerrado funcional.

---

## CU-06 — Validar bloque diagnóstico V17-V44

**Historias cubiertas:** HU-011, HU-016  
**Actor principal:** Sistema

**Precondiciones:**
- La validación está en curso.

**Flujo principal:**
1. El sistema valida diagnóstico, fechas, estudio diagnóstico e histopatología.
2. Valida CIE-10 contra catálogo.
3. Aplica reglas por diagnóstico cuando corresponde.
4. Valida estadificación, riesgo, intervención médica y antecedentes.
5. Registra errores y advertencias con datos involucrados.

**Postcondición:** Se generan hallazgos del bloque diagnóstico.

**Reglas de negocio:**
- Las reglas por diagnóstico deben usar el catálogo y el instructivo.
- Si una regla depende de una variable futura, no debe bloquear prematuramente.

**Estado:** Cerrado funcional.

---

## CU-07 — Validar terapia sistémica V45-V60

**Historias cubiertas:** HU-012, HU-016, HU-021  
**Actor principal:** Sistema

**Precondiciones:**
- La validación está en curso.
- El archivo contiene variables de terapia sistémica hasta V60.

**Flujo principal:**
1. El sistema valida V45 como variable de control del bloque.
2. Valida fases, ciclos, ubicación, fecha de inicio e IPS del primer o único esquema.
3. Valida medicamentos base V53.1-V53.9 contra catálogo ATC.
4. Valida medicamentos adicionales V54-V56.
5. Valida quimioterapia intratecal V57.
6. Valida fecha de finalización V58.
7. Valida características actuales V59.
8. Valida motivo de finalización prematura V60.
9. Registra hallazgos con trazabilidad clara.

**Postcondición:** Se generan hallazgos del bloque de terapia sistémica hasta V60.

**Reglas de negocio:**
- V45 controla la aplicabilidad general del bloque.
- V54-V56 no deben repetir medicamentos del bloque V53.
- V58 se cruza con V45 y V49 cuando corresponde.
- V60 se controla principalmente desde V59.
- Las reglas de último esquema, V61-V73, se trabajan después.

**Estado:** Cerrado funcional hasta V60.

---

# Flujo 3 — Revisar resultados

## CU-08 — Visualizar resumen de resultados

**Historias cubiertas:** HU-022, HU-027  
**Actor principal:** Analista de calidad

**Precondiciones:**
- La validación terminó.

**Flujo principal:**
1. El sistema muestra pacientes procesados.
2. Muestra pacientes con errores.
3. Muestra pacientes con advertencias.
4. Muestra pacientes sin problemas.
5. Permite pasar al detalle de hallazgos.

**Postcondición:** El analista conoce el estado general del archivo.

**Estado:** Cerrado funcional.

---

## CU-09 — Revisar hallazgos por paciente

**Historias cubiertas:** HU-022, HU-035  
**Actor principal:** Analista de calidad

**Precondiciones:**
- Existen resultados de validación.

**Flujo principal:**
1. El sistema muestra una lista de pacientes o registros.
2. El analista selecciona un paciente.
3. El sistema muestra los hallazgos asociados.
4. Cada hallazgo muestra variable, título, explicación, datos involucrados y recomendación.
5. El analista identifica qué debe corregir en la matriz.

**Flujos alternos:**

*FA-09.1 — Paciente sin hallazgos*
- El sistema indica que el registro no tiene errores ni advertencias.

**Postcondición:** El analista puede corregir la matriz con base en los hallazgos.

**Reglas de negocio:**
- Los mensajes deben ser claros y operativos.
- Las reglas cruzadas deben explicar la relación entre variables.

**Estado:** Cerrado funcional, con mejoras continuas de redacción.

---

## CU-10 — Buscar paciente por documento

**Historias cubiertas:** HU-023  
**Actor principal:** Analista de calidad

**Precondiciones:**
- Existen resultados de validación.

**Flujo principal:**
1. El analista escribe el documento o parte del documento.
2. El sistema filtra los resultados.
3. Se muestran los pacientes coincidentes.
4. El analista abre el detalle del paciente.

**Flujos alternos:**

*FA-10.1 — Sin resultados*
- El sistema informa que no encontró coincidencias.
- El usuario puede limpiar la búsqueda.

**Postcondición:** El analista localiza un registro específico.

**Estado:** Implementado o sujeto a mejora de interfaz.

---

# Flujo 4 — Exportar evidencias

## CU-11 — Exportar reporte Excel marcado

**Historias cubiertas:** HU-030  
**Actor principal:** Analista de calidad

**Precondiciones:**
- La validación terminó.
- Existen resultados en memoria.

**Flujo principal:**
1. El analista selecciona exportar reporte.
2. El sistema genera un archivo Excel.
3. El exportador marca en rojo las celdas con error.
4. El exportador marca en amarillo las celdas con advertencia.
5. El archivo mantiene la estructura de la matriz.
6. El navegador descarga el reporte.

**Flujos alternos:**

*FA-11.1 — Sin errores*
- El sistema puede generar reporte sin celdas marcadas.
- El archivo queda como evidencia de validación.

**Postcondición:** El analista tiene un Excel de evidencia para revisar o compartir.

**Reglas de negocio:**
- El exportador debe marcar solo la celda afectada.
- Debe reconocer variables simples y subvariables.
- No debe marcar variables que no tengan hallazgo real.

**Estado:** Cerrado funcional hasta V60, con revisión acumulativa.

---

# Flujo 5 — Privacidad y funcionamiento local

## CU-12 — Funcionamiento local

**Historias cubiertas:** HU-036, HU-039  
**Actor principal:** Analista de calidad

**Precondiciones:**
- El proyecto está en el equipo local.
- El usuario abre la aplicación en navegador o servidor local.

**Flujo principal:**
1. El usuario abre la aplicación.
2. Carga el archivo Excel.
3. La validación se ejecuta localmente.
4. No se envían datos a servidores externos.
5. El usuario exporta el reporte en su equipo.

**Postcondición:** La validación se realiza en entorno local.

**Reglas de negocio:**
- Los datos de pacientes no salen del equipo.
- No se usan cookies ni almacenamiento permanente para datos clínicos.

**Estado:** Cerrado funcional local.

---

## CU-13 — Borrado de datos al cerrar

**Historias cubiertas:** HU-036  
**Actor principal:** Sistema

**Precondiciones:**
- Hay un archivo cargado o resultados en memoria.

**Flujo principal:**
1. El usuario cierra o recarga la pestaña.
2. El navegador libera la información cargada en memoria.
3. Para volver a validar, el usuario debe cargar de nuevo el archivo.

**Postcondición:** La información cargada deja de estar disponible en la aplicación.

**Reglas de negocio:**
- No se guardan datos de pacientes en localStorage ni cookies.
- La evidencia persistente solo existe si el usuario descarga un archivo exportado.

**Estado:** Cerrado funcional local.

---

# Flujo 6 — Continuidad del desarrollo

## CU-14 — Continuar con V61

**Historias cubiertas:** HU-012  
**Actor principal:** Desarrollador / mantenedor

**Precondiciones:**
- El avance V1-V60 está cerrado funcionalmente.
- Se cuenta con el instructivo de V61.
- No se deben modificar variables cerradas salvo bug real.

**Flujo principal:**
1. Se revisa el instructivo de V61.
2. Se definen reglas sin adelantar validaciones de V62-V73.
3. Se actualizan los archivos técnicos necesarios.
4. Se genera Excel limpio de prueba.
5. Se valida estructura, pantalla, consola y exportador.
6. Si los resultados coinciden, V61 queda cerrada funcionalmente.

**Postcondición:** V61 queda validada o se documentan los pendientes encontrados.

**Reglas de negocio:**
- Si una validación depende de V62-V73, se deja para cuando esas variables estén implementadas.
- La trazabilidad debe explicar claramente de dónde sale cada coherencia.
- No se deben tocar variables anteriores salvo bug real.

**Estado:** En revisión.

---

# Resumen de cobertura

| Caso de uso | Historias cubiertas | Estado |
|---|---|---|
| CU-01 | HU-004, HU-039 | Cerrado funcional |
| CU-02 | HU-004, HU-005 | Cerrado funcional |
| CU-03 | HU-005 | Cerrado funcional hasta V60 |
| CU-04 | HU-010, HU-011, HU-012, HU-016 | Cerrado funcional hasta V60 |
| CU-05 | HU-010, HU-016 | Cerrado funcional |
| CU-06 | HU-011, HU-016 | Cerrado funcional |
| CU-07 | HU-012, HU-016, HU-021 | Cerrado funcional hasta V60 |
| CU-08 | HU-022, HU-027 | Cerrado funcional |
| CU-09 | HU-022, HU-035 | Cerrado funcional / mejora continua |
| CU-10 | HU-023 | Implementado / mejora futura |
| CU-11 | HU-030 | Cerrado funcional hasta V60 |
| CU-12 | HU-036, HU-039 | Cerrado funcional local |
| CU-13 | HU-036 | Cerrado funcional local |
| CU-14 | HU-012 | En revisión |

---

# Estado general

| Concepto | Estado |
|---|---|
| Casos de uso base | Actualizados |
| Avance funcional reflejado | V1-V60 |
| Siguiente variable | V61 |
| Bloque pendiente inmediato | V61-V73 |
| Bloques futuros | V74-V134 |
