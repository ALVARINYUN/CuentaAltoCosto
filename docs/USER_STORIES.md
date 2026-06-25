# Historias de Usuario — Validador CAC

**Proyecto:** Validador CAC — Cáncer
**Versión:** 4.0
**Estado actual:** avance funcional validado hasta **V134**
**Siguiente fase:** ajuste de advertencias en APP, documentación y auditoría global
**Fecha de actualización:** Junio 2026

---

## 1. Propósito

Este documento reúne las historias de usuario del **Validador CAC — Cáncer**.

Su función es orientar el desarrollo desde las necesidades reales del proceso: cargar archivos, validar información, revisar hallazgos, exportar reportes, consultar la matriz funcional y mantener trazabilidad técnica y documental.

Esta versión deja el backlog alineado con el estado actual del proyecto: validación acumulativa cerrada de **V1 a V134** y fase actual enfocada en depurar advertencias sin modificar errores cerrados.

---

## 2. Reglas del backlog

1. No se reutilizan IDs.
2. Cada historia debe tener valor funcional claro.
3. Cada sprint debe entregar algo usable.
4. Las validaciones se implementan por bloques funcionales.
5. Las reglas deben salir del instructivo oficial o de trazabilidad clara.
6. No se inventan reglas.
7. Las variables cerradas no se rompen al agregar o ajustar otras.
8. Los errores cerrados no se modifican en la fase actual.
9. La fase actual se enfoca sólo en advertencias, especialmente falsos positivos por comodines permitidos.
10. Si un valor está permitido por instructivo y no tiene condición adicional, no debe generar advertencia.
11. Si un valor permitido exige soporte, catálogo, trazabilidad o revisión clínica, puede mantenerse como advertencia justificada.
12. La documentación debe reflejar el estado real del sistema: **V1-V134 cerrado funcionalmente**.
13. La matriz funcional debe mantenerse como fuente documental central.
14. No se debe duplicar la matriz en JavaScript si ya existe como documento `.md`.

---

## 3. Perfiles

| Perfil                     | Descripción                                                          |
| -------------------------- | -------------------------------------------------------------------- |
| Digitador                  | Registra, corrige o carga datos de pacientes.                        |
| Analista de calidad        | Revisa errores, advertencias y soportes antes del reporte.           |
| Auditor CAC                | Verifica cumplimiento frente al instructivo y soportes.              |
| Coordinador del programa   | Consulta indicadores, avance y calidad del dato.                     |
| Administrador              | Mantiene catálogos, documentación y configuración.                   |
| Desarrollador / mantenedor | Actualiza reglas, módulos, catálogos, documentación y exportaciones. |

---

# Historias de usuario funcionales

## HU-004 — Cargar archivo Excel CAC

**Como** analista de calidad,
**quiero** cargar un archivo Excel del reporte CAC,
**para** validarlo localmente antes del envío.

**Criterios de aceptación:**

* Permite seleccionar o arrastrar un archivo Excel.
* Valida que el formato sea compatible.
* Lee el archivo en el navegador.
* Muestra el nombre del archivo cargado.
* Habilita la selección de hoja.
* No sube información a servidores externos.

**Estado:** Cerrado funcional.

---

## HU-005 — Validar estructura del archivo cargado

**Como** analista de calidad,
**quiero** que el sistema reconozca la estructura del Excel,
**para** saber si la hoja puede validarse correctamente.

**Criterios de aceptación:**

* Reconoce encabezados reales, largos o cortados.
* Reconoce variables simples y subvariables.
* Identifica estructura acumulativa hasta **V134**.
* Informa variables faltantes si existen.
* Ignora columnas adicionales no necesarias.
* Habilita validación sólo si la estructura mínima está correcta.
* Conserva compatibilidad con archivos de prueba parciales cuando aplique.

**Estado:** Cerrado funcional hasta V134.

---

## HU-010 — Validar identificación V1-V16

**Como** analista de calidad,
**quiero** validar los datos de identificación del usuario,
**para** detectar inconsistencias básicas antes de revisar los módulos clínicos.

**Criterios de aceptación:**

* Valida nombres y apellidos.
* Valida tipo y número de identificación.
* Valida fecha de nacimiento.
* Valida sexo, ocupación, régimen, EAPB, pertenencia étnica, grupo poblacional, municipio, teléfono y fecha de afiliación.
* Respeta comodines permitidos como `NONE`, `NOAP`, `9998`, `9999` y `0` cuando apliquen.
* Genera mensajes claros por variable.

**Estado:** Cerrado funcional.

---

## HU-011 — Validar diagnóstico V17-V44

**Como** analista de calidad,
**quiero** validar diagnóstico, estadificación y antecedentes,
**para** revisar coherencia clínica inicial del cáncer reportado.

**Criterios de aceptación:**

* Valida CIE-10 de la neoplasia.
* Valida fechas diagnósticas.
* Valida tipo de estudio diagnóstico.
* Valida histopatología, histología y diferenciación.
* Valida estadificación inicial.
* Valida HER2, Dukes, Ann Arbor/Lugano, Gleason y riesgo cuando aplique.
* Valida objetivo, intervención médica y antecedentes de otro cáncer primario.
* Usa instructivo y catálogos oficiales.
* No genera advertencias por comodines permitidos sin condición adicional.

**Estado:** Cerrado funcional.

---

## HU-012 — Validar terapia sistémica V45-V73

**Como** analista de calidad,
**quiero** validar terapia sistémica e intratecal,
**para** revisar esquemas, ciclos, medicamentos, IPS, fechas y finalización.

**Criterios de aceptación:**

* V45 controla el bloque de terapia sistémica.
* V46-V46.8 validan fases de quimioterapia cuando aplican.
* V47 valida ciclos.
* V48-V52 validan ubicación, fecha de inicio e IPS del primer o único esquema.
* V53-V53.9 validan medicamentos base con catálogo ATC.
* V54-V56 validan medicamentos adicionales.
* V57-V60 validan intratecal y cierre del primer o único esquema.
* V61-V65 validan ubicación, fecha e IPS del último esquema.
* V66 valida número de medicamentos propuestos en el último esquema.
* V66.1-V66.9 validan medicamentos administrados del último esquema.
* V67-V69 validan medicamentos adicionales del último esquema.
* V70-V73 validan intratecal, finalización, características y motivo del último esquema.
* V53.1 y V66.1 no permiten `97`.
* V53.2-V53.9 y V66.2-V66.9 sí permiten `97` según instructivo.
* Los comodines `97`, `98`, `1800-01-01` y `1845-01-01` se validan por contexto.

**Estado:** Cerrado funcional.

---

## HU-013 — Validar cirugía V74-V85

**Como** analista de calidad,
**quiero** validar las cirugías realizadas durante el periodo,
**para** revisar procedimientos quirúrgicos, IPS, fechas y estado vital quirúrgico.

**Criterios de aceptación:**

* V74 controla si hubo cirugía.
* V75 valida número de cirugías o tiempos quirúrgicos.
* V76-V79 validan primera cirugía.
* V80-V84 validan última cirugía o reintervención.
* V85 valida estado vital al finalizar la única o última cirugía.
* No se reportan cirugías propuestas no realizadas.
* No se reportan procedimientos excluidos por instructivo, como implante de catéter, punción lumbar, biopsias o cierre de ostomías.
* Los CUPS deben estar relacionados con manejo del cáncer.
* Los valores `96`, `98` y `1845-01-01` se aceptan cuando aplican.

**Estado:** Cerrado funcional.

---

## HU-014 — Validar radioterapia V86-V105

**Como** analista de calidad,
**quiero** validar radioterapia del periodo,
**para** revisar sesiones, esquemas, IPS, CUPS, fechas y finalización.

**Criterios de aceptación:**

* V86 controla el bloque de radioterapia.
* V87 valida número de sesiones.
* V88-V96 validan primer o único esquema.
* V97-V105 validan último esquema.
* V94 y V103 permiten `1800-01-01` cuando el esquema aún no finaliza.
* V88, V97, V94 y V103 permiten `1845-01-01` cuando no aplica.
* V95 controla V96.
* V104 controla V105.
* Los CUPS deben corresponder a radioterapia.
* Los comodines permitidos no generan advertencia por sí solos.

**Estado:** Cerrado funcional.

---

## HU-015 — Validar trasplante V106-V110

**Como** analista de calidad,
**quiero** validar trasplante de células progenitoras hematopoyéticas,
**para** revisar si fue realizado, su tipo, ubicación, fecha e IPS.

**Criterios de aceptación:**

* V106 controla el bloque.
* V107 valida tipo de trasplante.
* V108 valida ubicación temporal.
* V109 valida fecha del trasplante.
* V110 valida IPS del trasplante.
* No aplica trasplante propuesto pero no realizado.
* No aplican trasplantes de órganos sólidos u otros no relacionados con progenitores hematopoyéticos.
* V110 permite `96` para trasplante fuera del país.
* `98` y `1845-01-01` se aceptan cuando no aplica.

**Estado:** Cerrado funcional.

---

## HU-016 — Validar tratamiento complementario V111-V124

**Como** analista de calidad,
**quiero** validar tratamiento complementario,
**para** revisar cirugía reconstructiva, cuidado paliativo, psiquiatría, nutrición, soporte nutricional y terapias complementarias.

**Criterios de aceptación:**

* V111 controla cirugía reconstructiva.
* V112 y V113 dependen de V111.
* Si cirugía reconstructiva ocurre en el mismo tiempo quirúrgico de cirugía curativa, no se reporta como reconstructiva independiente.
* V114 controla cuidado paliativo.
* V114.1-V114.6 validan tipo de profesional que prestó cuidado paliativo.
* V115 y V116 dependen de atención paliativa.
* V117 controla psiquiatría.
* V118 y V119 dependen de V117.
* V120 controla nutrición.
* V121 y V122 dependen de V120.
* V123 valida soporte nutricional.
* V124 valida terapias complementarias.
* Se respetan opciones eliminadas y comodines permitidos.
* Valores como `2`, `98` y `1845-01-01` no generan advertencia por sí solos cuando aplican.

**Estado:** Cerrado funcional.

---

## HU-017 — Validar situación final V125-V134

**Como** analista de calidad,
**quiero** validar la situación final del usuario a la fecha de corte,
**para** revisar tratamiento actual, resultado, estado vital, novedades, fechas administrativas y cierre del reporte.

**Criterios de aceptación:**

* V125 valida tipo de tratamiento a `2025-01-01`.
* V126 valida resultado final del manejo oncológico.
* V127 valida estado vital.
* V128 valida novedad administrativa.
* V129 valida novedad clínica.
* V130 valida fecha de desafiliación.
* V131 valida fecha de muerte.
* V132 valida causa de muerte.
* V133 valida código único BDUA-BDEX-PVS.
* V134 valida fecha de corte.
* V134 debe ser exactamente `2025-01-01`.
* Si el paciente falleció y también se desafilió, prima muerte: V131 registra fecha de muerte y V130 queda en `1845-01-01`.
* V132=98 aplica si el usuario está vivo o se desconoce estado vital.

**Estado:** Cerrado funcional.

---

## HU-021 — Cargar catálogo ATC

**Como** desarrollador o mantenedor,
**quiero** cargar y usar el catálogo ATC,
**para** validar medicamentos antineoplásicos y terapias hormonales reportadas.

**Criterios de aceptación:**

* El catálogo ATC está disponible para validaciones de medicamentos.
* Se usa en V53.1-V53.9.
* Se usa en V54-V56.
* Se usa en V66.1-V66.9.
* Se usa en V67-V69.
* Permite diferenciar código válido, comodín permitido y medicamento duplicado o incoherente.

**Estado:** Implementado.

---

## HU-022 — Cargar catálogo CUPS

**Como** desarrollador o mantenedor,
**quiero** usar catálogo CUPS,
**para** validar procedimientos quirúrgicos y radioterapia.

**Criterios de aceptación:**

* El catálogo CUPS está disponible.
* Se usa para cirugía V78 y V83.
* Se usa para radioterapia V90 y V99.
* Permite validar si el código existe.
* Permite advertir si el CUPS requiere revisión de pertinencia frente al manejo del cáncer.

**Estado:** Implementado.

---

## HU-023 — Cargar catálogo CIE-10

**Como** desarrollador o mantenedor,
**quiero** usar catálogo CIE-10,
**para** validar diagnóstico principal y antecedentes.

**Criterios de aceptación:**

* El catálogo CIE-10 está disponible.
* Se usa para V17.
* Se usa para V44.
* Permite reglas por agrupador cuando aplica.
* Permite advertencias de revisión clínica/catálogo cuando el código tiene observaciones.

**Estado:** Implementado.

---

## HU-027 — Ver cumplimiento general

**Como** coordinador o analista de calidad,
**quiero** ver un resumen general de la validación,
**para** conocer rápidamente el estado del archivo.

**Criterios de aceptación:**

* Muestra pacientes procesados.
* Muestra pacientes con errores.
* Muestra pacientes con advertencias, incluso si también tienen errores.
* Muestra pacientes sin problemas.
* Muestra total de errores y advertencias.
* Permite pasar al detalle.
* Los conteos deben ser consistentes con el motor de validación.

**Estado:** Implementado.

---

## HU-030 — Exportar Excel de validación

**Como** analista de calidad,
**quiero** exportar el Excel validado con marcas,
**para** revisar o compartir evidencia de errores y advertencias.

**Criterios de aceptación:**

* Exporta archivo Excel.
* Marca errores en rojo.
* Marca advertencias en amarillo.
* Marca sólo la celda afectada.
* Reconoce variables simples y subvariables.
* Mantiene estructura del archivo original.
* No elimina ceros iniciales.
* Soporta hallazgos acumulativos V1-V134.

**Estado:** Cerrado funcional hasta V134, con revisión acumulativa.

---

## HU-035 — Mensajes de error claros

**Como** analista de calidad,
**quiero** recibir mensajes claros y operativos,
**para** entender qué corregir y en qué variable.

**Criterios de aceptación:**

* Cada hallazgo indica variable afectada.
* Cada hallazgo indica código.
* Cada hallazgo diferencia error y advertencia.
* Cada hallazgo explica la relación entre variables cuando hay trazabilidad.
* Las recomendaciones deben ser claras.
* No debe haber mensajes genéricos que no indiquen acción.

**Estado:** En mejora continua.

---

## HU-036 — Funcionamiento local y privacidad

**Como** responsable del proceso,
**quiero** que la validación funcione localmente,
**para** proteger la información de pacientes.

**Criterios de aceptación:**

* El Excel se procesa en el navegador.
* No se envían datos a servidores externos.
* No se guardan datos clínicos en cookies ni localStorage.
* Al cerrar o recargar la pestaña, la información cargada se pierde.
* La evidencia sólo queda si el usuario exporta el reporte.

**Estado:** Cerrado funcional.

---

## HU-039 — Ejecutar aplicación localmente

**Como** usuario del proyecto,
**quiero** abrir la aplicación en servidor local,
**para** validar archivos sin depender de infraestructura externa.

**Criterios de aceptación:**

* Funciona con servidor local.
* Puede abrirse desde `http://127.0.0.1:8000/`.
* Permite cargar, validar y exportar.
* No requiere base de datos.
* No requiere backend.

**Estado:** Cerrado funcional.

---

## HU-040 — Consultar matriz funcional V1-V134

**Como** analista, auditor o desarrollador,
**quiero** consultar la matriz funcional completa desde la documentación o desde la app,
**para** revisar reglas, dependencias, comodines y severidades.

**Criterios de aceptación:**

* Existe matriz funcional actualizada por variable V1-V134.
* La matriz indica módulo, tipo de dato, formato, comodines, dependencias, reglas, soporte y severidad.
* La app puede enlazar o mostrar el documento `.md`.
* No se duplica la matriz completa en JavaScript.
* El documento `.md` es la fuente documental central.

**Estado:** Documentación actualizada; visualización en APP pendiente o en mejora.

---

## HU-041 — Ajustar advertencias sin tocar errores

**Como** desarrollador o mantenedor,
**quiero** depurar advertencias falsas,
**para** que la APP no alerte sobre valores permitidos por el instructivo.

**Criterios de aceptación:**

* Los errores no se modifican.
* No se eliminan errores.
* No se reclasifican errores como advertencias.
* No se suavizan errores cerrados.
* Sólo se ajustan advertencias.
* Se revisa cada advertencia contra instructivo.
* Si el valor es permitido y no tiene condición adicional, no genera advertencia.
* Si el valor requiere soporte, catálogo, trazabilidad o revisión clínica, puede mantenerse como advertencia.
* Cada ajuste se prueba con base real o archivo controlado.
* No aparecen errores nuevos por el ajuste.

**Estado:** Fase actual.

---

## HU-042 — Mantener documentación del proyecto actualizada

**Como** desarrollador o mantenedor,
**quiero** actualizar la documentación del proyecto,
**para** que no existan incoherencias entre avance real, reglas y archivos técnicos.

**Criterios de aceptación:**

* Los documentos no deben decir V66, V86 o variable pendiente si ya está cerrado hasta V134.
* El estado funcional debe indicar V1-V134.
* La fase actual debe indicar ajuste de advertencias y auditoría global.
* La matriz funcional debe contener variables V1-V134.
* Los casos de uso deben reflejar todos los bloques funcionales.
* Las historias de usuario deben reflejar los módulos cerrados.
* La documentación debe ser clara, práctica y útil para continuar sin perder trazabilidad.

**Estado:** En actualización.

---

# Mapeo de avance

| Sprint / Bloque                   | Objetivo                                          | Estado           |
| --------------------------------- | ------------------------------------------------- | ---------------- |
| Sprint 1                          | Carga, estructura y V1-V16                        | Cerrado          |
| Sprint 2A                         | Diagnóstico V17-V24                               | Cerrado          |
| Sprint 2B                         | Confirmación, histología y diferenciación V25-V28 | Cerrado          |
| Sprint 2C                         | Estadificación inicial V29                        | Cerrado          |
| Sprint 2D                         | Fechas y marcadores V30-V33                       | Cerrado          |
| Sprint 2E                         | Dukes V34-V35                                     | Cerrado          |
| Sprint 3A                         | Linfomas, mieloma y riesgo V36-V40                | Cerrado          |
| Sprint 3B                         | Intervención y antecedentes V41-V44               | Cerrado          |
| Sprint 3C-3H                      | Terapia sistémica V45-V73                         | Cerrado          |
| Módulo cirugía                    | Cirugía V74-V85                                   | Cerrado          |
| Módulo radioterapia               | Radioterapia V86-V105                             | Cerrado          |
| Módulo trasplante                 | Trasplante V106-V110                              | Cerrado          |
| Módulo tratamiento complementario | V111-V124                                         | Cerrado          |
| Módulo situación final            | V125-V134                                         | Cerrado          |
| Fase actual                       | Ajuste de advertencias en APP                     | En curso         |
| Documentación                     | Matriz, casos de uso e historias                  | En actualización |

---

# Resumen

| Concepto                | Estado                                       |
| ----------------------- | -------------------------------------------- |
| Avance funcional actual | V1-V134                                      |
| Variables cerradas      | V1-V134                                      |
| Siguiente variable      | Ninguna                                      |
| Catálogo CIE-10         | Disponible                                   |
| Catálogo CUPS           | Disponible                                   |
| Catálogo ATC            | Disponible                                   |
| Bloque actual           | Ajuste de advertencias                       |
| Restricción principal   | No tocar errores cerrados                    |
| Matriz funcional        | Actualizada por variable V1-V134             |
| Pendiente operativo     | Mostrar matriz en APP y auditar advertencias |
