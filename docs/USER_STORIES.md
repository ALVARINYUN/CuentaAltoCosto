# Historias de Usuario — Validador CAC

**Proyecto:** Validador CAC para reporte de cohorte cáncer  
**Normativa base:** Resolución 0247/2014 · Instructivo CAC-IEP1-I01 · Medición enero 2025  
**Versión del backlog de historias:** 3.0  
**Estado actual:** avance funcional validado hasta V60  
**Siguiente bloque de trabajo:** V61 — inicio del último esquema de terapia sistémica  
**Fecha de actualización:** Junio 2026  

---

## 1. Propósito del documento

Este documento reúne las historias de usuario del Validador CAC.  
Su función es orientar el desarrollo del proyecto desde la perspectiva de las personas que van a usar, revisar, mantener o auditar la herramienta.

Las historias no reemplazan el instructivo CAC ni la matriz de variables. Sirven para organizar el trabajo por necesidades reales del proceso: cargar archivos, validar información, revisar hallazgos, exportar reportes y mantener trazabilidad.

El proyecto se trabaja por sprints, con avance acumulativo. Las variables cerradas se conservan activas y no se modifican salvo que se identifique un bug real.

---

## 2. Reglas del backlog

1. No se reutilizan IDs de historias.
2. Las historias descartadas se conservan marcadas como `[DESCARTADA]`, con justificación.
3. Cada historia debe tener valor funcional claro.
4. Cada sprint debe entregar algo usable.
5. Las validaciones se implementan por bloques de variables, no todas al mismo tiempo.
6. Los datos sensibles deben mantenerse en entorno autorizado.
7. Las reglas de negocio deben salir del instructivo o de una trazabilidad clara entre variables.
8. Si una regla depende de una variable futura, se deja pendiente hasta llegar a esa variable.

---

## 3. Perfiles

| Perfil | Descripción |
|---|---|
| Digitador | Registra, corrige o carga datos de pacientes. |
| Analista de calidad | Revisa errores, advertencias y soportes antes del reporte. |
| Auditor CAC | Verifica cumplimiento frente al instructivo y soportes. |
| Coordinador del programa | Consulta indicadores, avance y calidad del dato. |
| Administrador | Mantiene catálogos, documentación y configuración del sistema. |
| Encargado de seguridad | Revisa privacidad, acceso y manejo de datos sensibles. |
| Desarrollador / mantenedor | Actualiza reglas, módulos, catálogos y exportaciones. |

---

# Épica A — Matriz maestra CAC

## HU-001 — Consultar matriz de variables

**Como** analista de calidad,  
**quiero** consultar las variables CAC por módulo,  
**para** entender reglas, dependencias, severidades y soportes.

**Criterios de aceptación:**
- Se muestran variables agrupadas por módulo.
- Se puede buscar por número de variable, por ejemplo `V17`.
- Se puede buscar por nombre de variable.
- Cada variable muestra tipo de dato, formato, catálogo, comodines, dependencias, reglas, soporte documental y severidad.

**Prioridad:** Alta  
**Estado:** En uso como documentación base  
**Sprint sugerido:** Sprint 0

---

## HU-002 — Mantener matriz técnica de variables

**Como** administrador,  
**quiero** actualizar la matriz técnica de variables,  
**para** mantener el sistema alineado con el instructivo y con el avance real del desarrollo.

**Criterios de aceptación:**
- Permite registrar número de variable.
- Permite asociar módulo.
- Permite definir tipo de dato y formato esperado.
- Permite registrar catálogo, comodines, dependencias, reglas y severidad.
- Permite indicar soporte documental requerido.
- Refleja el avance funcional cerrado hasta la variable correspondiente.

**Prioridad:** Alta  
**Estado:** En actualización continua  
**Sprint sugerido:** Sprint 0

---

## HU-003 — Versionar matriz CAC

**Como** administrador,  
**quiero** versionar la matriz de variables,  
**para** conservar trazabilidad cuando cambie el instructivo o se cierre un nuevo bloque.

**Criterios de aceptación:**
- Cada cambio queda asociado a una versión.
- Se registra fecha, responsable y descripción del cambio.
- Se puede consultar historial.
- Se puede marcar una versión como activa.
- Se diferencia entre documentación base y avance funcional implementado.

**Prioridad:** Media  
**Estado:** Pendiente de formalización completa  
**Sprint sugerido:** Sprint transversal

---

# Épica B — Carga de archivos

## HU-004 — Cargar archivo Excel CAC

**Como** analista de calidad,  
**quiero** cargar un archivo Excel con datos CAC,  
**para** validar la información antes de enviarla o consolidarla.

**Criterios de aceptación:**
- Permite cargar archivo `.xlsx`.
- Rechaza archivos no compatibles.
- Muestra nombre del archivo cargado.
- Permite seleccionar la hoja de trabajo.
- Muestra mensaje claro si el archivo no se puede leer.
- No procesa datos hasta validar estructura mínima.

**Prioridad:** Alta  
**Estado:** Cerrado funcional  
**Sprint:** Sprint 1

---

## HU-005 — Validar estructura del archivo cargado

**Como** analista de calidad,  
**quiero** que el sistema valide si el Excel corresponde a la matriz CAC esperada,  
**para** evitar resultados equivocados por cargar un archivo incorrecto.

**Criterios de aceptación:**
- Detecta encabezados reales del instructivo.
- Reconoce variables simples y subvariables.
- Detecta columnas obligatorias faltantes según el avance cargado.
- Permite trabajar con archivos parciales de prueba.
- Bloquea validación si la estructura mínima no es válida.

**Prioridad:** Alta  
**Estado:** Cerrado funcional hasta V60  
**Sprint:** Sprint 1 en adelante

---

## HU-006 — Mostrar avance de carga y validación

**Como** analista de calidad,  
**quiero** ver el avance al cargar archivos grandes,  
**para** saber que la aplicación sigue funcionando.

**Criterios de aceptación:**
- Muestra estado de carga.
- Muestra estado de lectura.
- Muestra estado de validación.
- Informa si el proceso terminó correctamente.
- Muestra error claro si el proceso falla.

**Prioridad:** Media  
**Estado:** Implementado parcialmente  
**Sprint sugerido:** Transversal

---

# Épica C — Captura manual y uso web futuro

## HU-007 — Crear registro CAC manualmente

**Como** digitador,  
**quiero** crear un registro CAC desde un formulario,  
**para** ingresar información sin depender solo de Excel.

**Criterios de aceptación:**
- Permite crear un registro nuevo.
- Muestra variables por módulo.
- Guarda avance parcial.
- El registro queda en estado de revisión antes de validarse.
- Permite continuar luego.

**Prioridad:** Alta para versión web  
**Estado:** Pendiente  
**Sprint sugerido:** Futuro

---

## HU-008 — Registrar datos desde celular

**Como** digitador,  
**quiero** ingresar al sistema desde celular,  
**para** registrar datos desde el punto de atención o área responsable.

**Criterios de aceptación:**
- El formulario es responsive.
- Los campos son legibles en celular.
- Los botones son cómodos para uso táctil.
- La información se guarda en una base central.
- El usuario puede continuar un registro desde otro dispositivo.

**Prioridad:** Alta para uso institucional  
**Estado:** Pendiente  
**Sprint sugerido:** Futuro web

---

## HU-009 — Consultar registros centralizados

**Como** analista de calidad,  
**quiero** ver registros creados por diferentes usuarios,  
**para** revisar información consolidada de la institución.

**Criterios de aceptación:**
- Lista registros creados desde PC y celular.
- Permite buscar por documento.
- Permite filtrar por estado.
- Permite ver registros incompletos.
- Los datos no dependen del almacenamiento local del dispositivo.

**Prioridad:** Alta para versión web  
**Estado:** Pendiente  
**Sprint sugerido:** Futuro web

---

# Épica D — Validaciones núcleo del negocio

## HU-010 — Validar identificación V1-V16

**Como** analista de calidad,  
**quiero** validar identificación del usuario,  
**para** detectar errores en nombres, documento, afiliación, régimen, municipio y teléfono.

**Criterios de aceptación:**
- V1-V4 validan nombres y apellidos según reglas de texto.
- V5 valida catálogo de tipo de identificación.
- V6 valida formato según V5.
- V7 valida fecha de nacimiento sin aplicar regla de corte excluida por decisión del cliente.
- V8 solo permite `M` o `F`.
- V10 valida régimen.
- Si V5=`AS` o `MS`, V10 debe ser `S`.
- V14 valida estructura de municipio.
- V15 permite máximo dos teléfonos separados por guion o `0`.
- V16 valida fecha de afiliación.

**Prioridad:** Alta  
**Estado:** Cerrado funcional  
**Sprint:** Sprint 1

---

## HU-011 — Validar diagnóstico V17-V44

**Como** analista de calidad,  
**quiero** validar diagnóstico del cáncer,  
**para** revisar CIE-10, fechas, estudio diagnóstico, histología, estadificación, riesgo, intervención y antecedentes.

**Criterios de aceptación:**
- V17 valida CIE-10 contra catálogo operativo.
- V18 valida fecha de diagnóstico.
- V19 y V20 validan secuencia remisión-ingreso-diagnóstico.
- V21 valida tipo de estudio.
- Si V21=7, se activan coherencias con V22, V23, V24, V27 y V28.
- V29 valida estadificación según el diagnóstico.
- V36-V39 validan linfomas, mieloma, Gleason y riesgo según corresponda.
- V41-V44 validan intervención y antecedente de otro cáncer primario.

**Prioridad:** Alta  
**Estado:** Cerrado funcional  
**Sprint:** Sprint 2 y Sprint 3A/3B

---

## HU-012 — Validar tratamiento sistémico V45-V73

**Como** analista de calidad,  
**quiero** validar terapia sistémica e intratecal,  
**para** revisar esquemas, ciclos, medicamentos, IPS, fechas y finalización.

**Criterios de aceptación:**
- V45 controla el bloque de terapia sistémica.
- V46-V46.8 validan fases cuando aplican según diagnóstico.
- V47 valida ciclos.
- V48-V52 validan ubicación, fecha de inicio e IPS del primer o único esquema.
- V53-V53.9 validan medicamentos base con catálogo ATC.
- V54-V56 validan medicamentos adicionales sin duplicar el bloque V53.
- V57 valida quimioterapia intratecal.
- V58 valida fecha de finalización.
- V59 valida características actuales del esquema.
- V60 valida motivo de finalización prematura cuando V59=2.
- V61-V73 quedan para el bloque del último esquema.

**Prioridad:** Alta  
**Estado:** Cerrado funcional hasta V60; V61 en revisión  
**Sprint:** Sprint 3E, 3F, 3G y 3H

---

## HU-013 — Validar cirugía V74-V85

**Como** analista de calidad,  
**quiero** validar procedimientos quirúrgicos,  
**para** revisar fechas, CUPS, IPS, número de cirugías y estado vital postquirúrgico.

**Criterios de aceptación:**
- V74 controla V75-V85.
- Si V74=2, el resto del bloque registra no aplica.
- V75 valida tiempos quirúrgicos.
- V76 valida primera cirugía en periodo.
- V77 valida IPS.
- V78 valida CUPS.
- V80 solo aplica si hubo más de una cirugía.
- V85 se revisa con estado vital cuando corresponda.

**Prioridad:** Media  
**Estado:** Pendiente  
**Sprint sugerido:** Futuro

---

## HU-014 — Validar radioterapia V86-V105

**Como** analista de calidad,  
**quiero** validar radioterapia,  
**para** revisar sesiones, fechas, IPS, CUPS y finalización.

**Criterios de aceptación:**
- V86 controla V87-V105.
- Si V86=98, el resto registra no aplica.
- V87 valida número de sesiones.
- V88 valida fecha de inicio.
- V90 y V99 validan CUPS.
- V92 y V93 validan IPS.
- V94 valida finalización.
- V96 solo aplica si V95=2.

**Prioridad:** Media  
**Estado:** Pendiente  
**Sprint sugerido:** Futuro

---

## HU-015 — Validar resultado final V125-V134

**Como** analista de calidad,  
**quiero** validar situación actual, resultado, estado vital y novedades,  
**para** cerrar correctamente el reporte.

**Criterios de aceptación:**
- V125 valida tratamiento a la fecha de corte.
- V126 valida resultado final.
- Si V127=2, V126 debe ser 99.
- Si V127=2, V131 debe tener fecha válida.
- Si V127=1, V131 debe ser 1845-01-01.
- V128 valida novedad administrativa.
- V129 valida novedad clínica.
- V134 siempre debe ser 2025-01-01.

**Prioridad:** Media  
**Estado:** Pendiente  
**Sprint sugerido:** Futuro

---

## HU-016 — Clasificar validaciones por severidad

**Como** auditor CAC,  
**quiero** que cada validación se clasifique por severidad,  
**para** priorizar correcciones antes del envío.

**Criterios de aceptación:**
- Errores en rojo.
- Advertencias en amarillo.
- Cada alerta indica variable, regla y recomendación.
- Las reglas de trazabilidad muestran datos involucrados.
- Los textos visibles son claros y operativos.

**Prioridad:** Alta  
**Estado:** Cerrado funcional, con mejoras de redacción en curso  
**Sprint:** Transversal

---

# Épica E — Catálogos externos

## HU-017 — Cargar catálogo CIE-10 operativo

**Como** administrador,  
**quiero** cargar catálogo CIE-10,  
**para** validar diagnósticos y reglas asociadas.

**Criterios de aceptación:**
- Permite consultar código y descripción.
- Permite validar V17 y V44.
- Permite reglas por agrupador diagnóstico.
- Se actualiza sin tocar lógica cuando sea posible.

**Prioridad:** Alta  
**Estado:** Implementado para uso actual  
**Sprint:** Sprint 2

---

## HU-018 — Cargar catálogo DIVIPOLA

**Como** administrador,  
**quiero** cargar catálogo DIVIPOLA,  
**para** validar municipios de residencia.

**Criterios de aceptación:**
- V14 tiene exactamente 5 dígitos.
- Valida departamento y municipio.
- Valida combinación existente.
- Se actualiza sin modificar código fuente.

**Prioridad:** Alta  
**Estado:** Pendiente / parcial según catálogo disponible  
**Sprint sugerido:** Transversal

---

## HU-019 — Cargar catálogo EAPB

**Como** administrador,  
**quiero** cargar catálogo EAPB,  
**para** validar entidad reportante o territorial.

**Criterios de aceptación:**
- Permite importar códigos EAPB.
- Diferencia EAPB de entidad territorial.
- Valida V11 contra catálogo.
- Valida formato territorial cuando aplique.

**Prioridad:** Media  
**Estado:** Pendiente / parcial según catálogo disponible  
**Sprint sugerido:** Transversal

---

## HU-020 — Cargar catálogo REPS / IPS

**Como** administrador,  
**quiero** cargar catálogo de IPS habilitadas,  
**para** validar códigos de IPS.

**Criterios de aceptación:**
- Importa códigos de habilitación.
- Valida longitud de 12 dígitos.
- Permite consultar por código o nombre.
- Valida servicio habilitado cuando exista esa información.

**Prioridad:** Media  
**Estado:** Pendiente de catálogo completo  
**Sprint sugerido:** Transversal

---

## HU-021 — Cargar catálogo ATC

**Como** administrador,  
**quiero** cargar catálogo ATC,  
**para** validar medicamentos antineoplásicos administrados.

**Criterios de aceptación:**
- Permite validar códigos ATC cargados.
- Aplica a V53.1-V53.9 y V54-V56.
- Permite consultar medicamentos.
- Informa cuando el código no existe en el catálogo cargado.

**Prioridad:** Alta para terapia sistémica  
**Estado:** Implementado para el bloque trabajado  
**Sprint:** Sprint 3E / 3F

---

## HU-044 — Cargar catálogo CUPS

**Como** administrador,  
**quiero** cargar el catálogo CUPS,  
**para** validar códigos de cirugía y radioterapia cuando se implementen esos bloques.

**Criterios de aceptación:**
- Permite consultar códigos CUPS.
- Valida V78, V83, V90 y V99 cuando esos bloques estén implementados.
- Informa si el código ingresado no existe.
- Se actualiza sin modificar reglas de negocio.

**Prioridad:** Media  
**Estado:** Catálogo de apoyo disponible / validaciones futuras pendientes  
**Sprint sugerido:** Futuro

---

# Épica F — Visualización de resultados

## HU-022 — Ver errores por paciente

**Como** analista de calidad,  
**quiero** ver errores por paciente,  
**para** saber qué corregir.

**Criterios de aceptación:**
- Muestra documento.
- Muestra variable afectada.
- Muestra valor ingresado.
- Muestra regla incumplida.
- Muestra severidad.
- Muestra recomendación.

**Prioridad:** Alta  
**Estado:** Cerrado funcional  
**Sprint:** Sprint 1

---

## HU-023 — Buscar paciente por documento

**Como** analista de calidad,  
**quiero** buscar por documento,  
**para** revisar un caso puntual.

**Criterios de aceptación:**
- Busca por documento.
- Muestra resumen del paciente.
- Muestra errores y advertencias asociados.
- Permite limpiar búsqueda.

**Prioridad:** Alta  
**Estado:** Implementado / sujeto a mejoras de UI  
**Sprint:** Sprint 1

---

## HU-024 — Filtrar errores por tipo

**Como** analista de calidad,  
**quiero** filtrar errores por tipo,  
**para** revisar formato, catálogo o coherencia por separado.

**Criterios de aceptación:**
- Filtra por formato.
- Filtra por catálogo.
- Filtra por coherencia.
- Permite ver todos nuevamente.

**Prioridad:** Media  
**Estado:** Pendiente / mejora futura  
**Sprint sugerido:** Futuro

---

## HU-025 — Ordenar pacientes por criticidad

**Como** analista de calidad,  
**quiero** ordenar pacientes por cantidad de errores,  
**para** priorizar casos urgentes.

**Criterios de aceptación:**
- Ordena por errores.
- Ordena por advertencias.
- Permite ascendente y descendente.
- Conserva filtros activos.

**Prioridad:** Media  
**Estado:** Pendiente / mejora futura  
**Sprint sugerido:** Futuro

---

## HU-026 — Paginar resultados

**Como** analista de calidad,  
**quiero** paginar resultados,  
**para** trabajar bases grandes sin lentitud.

**Criterios de aceptación:**
- Define registros por página.
- Muestra página actual.
- Permite siguiente y anterior.
- Conserva filtros.

**Prioridad:** Media  
**Estado:** Implementado o en mejora según pantalla actual  
**Sprint sugerido:** Transversal

---

# Épica G — Dashboard e indicadores

## HU-027 — Ver cumplimiento general

**Como** coordinador,  
**quiero** ver porcentaje general de cumplimiento,  
**para** saber qué tan lista está la base.

**Criterios de aceptación:**
- Muestra total de pacientes procesados.
- Muestra pacientes con errores.
- Muestra pacientes con advertencias.
- Muestra pacientes sin problemas.

**Prioridad:** Media  
**Estado:** Implementado como resumen principal  
**Sprint:** Transversal

---

## HU-028 — Ver cumplimiento por bloque

**Como** coordinador,  
**quiero** ver cumplimiento por bloque,  
**para** identificar dónde están las debilidades.

**Criterios de aceptación:**
- Muestra cumplimiento por grupos de variables.
- Permite identificar bloques con mayor número de hallazgos.
- Se actualiza según avance funcional.

**Prioridad:** Media  
**Estado:** Pendiente / mejora futura  
**Sprint sugerido:** Futuro

---

## HU-029 — Ver errores más frecuentes

**Como** coordinador,  
**quiero** ver reglas que más se incumplen,  
**para** orientar correcciones y capacitación.

**Criterios de aceptación:**
- Muestra reglas más frecuentes.
- Muestra número de ocurrencias.
- Muestra variable asociada.
- Permite filtrar por bloque.

**Prioridad:** Media  
**Estado:** Pendiente / mejora futura  
**Sprint sugerido:** Futuro

---

# Épica H — Exportaciones y reportes

## HU-030 — Exportar Excel de validación

**Como** analista de calidad,  
**quiero** exportar un Excel con las celdas marcadas,  
**para** revisar y corregir la matriz original con mayor facilidad.

**Criterios de aceptación:**
- Conserva la estructura principal de la matriz.
- Marca errores en rojo.
- Marca advertencias en amarillo.
- Marca solo las variables afectadas por hallazgos reales.
- Reconoce variables simples y subvariables.
- Mantiene formato adecuado para fechas y catálogos.

**Prioridad:** Alta  
**Estado:** Cerrado funcional hasta V60, con revisión acumulativa  
**Sprint:** Transversal

---

## HU-031 — Exportar PDF ejecutivo

**Como** coordinador,  
**quiero** exportar PDF ejecutivo,  
**para** presentarlo en comité o reunión de calidad.

**Criterios de aceptación:**
- Incluye resumen ejecutivo.
- Incluye indicadores principales.
- Incluye principales hallazgos de calidad del dato.
- No incluye información innecesaria.
- Tiene diseño legible y profesional.

**Prioridad:** Media  
**Estado:** Pendiente  
**Sprint sugerido:** Futuro

---

## HU-032 — Exportar Word editable

**Como** analista de calidad,  
**quiero** exportar informe Word editable,  
**para** ajustar observaciones antes de compartirlo formalmente.

**Criterios de aceptación:**
- Incluye resumen ejecutivo.
- Incluye detalle tabular.
- Incluye pendientes prioritarios.
- La tabla es legible.
- Abre en Microsoft Word.

**Prioridad:** Media  
**Estado:** Pendiente  
**Sprint sugerido:** Futuro

---

## HU-033 — Exportar archivo plano CAC

**Como** auditor CAC,  
**quiero** exportar archivo plano final,  
**para** cargarlo en el sistema correspondiente.

**Criterios de aceptación:**
- Exporta campos en orden oficial.
- Respeta formato definido.
- Bloquea exportación si hay errores críticos.
- Permite exportar con advertencias dejando constancia.
- Registra fecha y responsable cuando exista versión con usuarios.

**Prioridad:** Alta final  
**Estado:** Pendiente  
**Sprint sugerido:** Cierre del proyecto

---

# Épica I — Usabilidad y ayuda

## HU-034 — Mostrar ayuda por variable

**Como** digitador,  
**quiero** ver ayuda contextual,  
**para** entender cada campo sin abrir el instructivo.

**Criterios de aceptación:**
- Muestra descripción breve.
- Muestra formato esperado.
- Muestra comodines.
- Muestra soporte documental.
- Muestra ejemplo cuando aplique.

**Prioridad:** Media  
**Estado:** Pendiente / mejora futura  
**Sprint sugerido:** Futuro

---

## HU-035 — Mensajes de error claros

**Como** digitador,  
**quiero** recibir mensajes de error claros,  
**para** corregir sin depender de una persona técnica.

**Criterios de aceptación:**
- Indica qué está mal.
- Indica cómo corregirlo.
- Menciona variable afectada.
- Incluye datos involucrados cuando hay trazabilidad.
- Evita lenguaje excesivamente técnico.

**Prioridad:** Alta  
**Estado:** En mejora continua  
**Sprint:** Transversal

---

# Épica J — Seguridad, privacidad y auditoría

## HU-036 — Mantener datos en entorno autorizado

**Como** encargado de seguridad,  
**quiero** garantizar que los datos no salgan del entorno autorizado,  
**para** proteger la información clínica y personal de los pacientes.

**Criterios de aceptación:**
- En modo local, los datos no se envían a servidores externos.
- No usa servicios externos sin autorización.
- No guarda datos de pacientes en cookies ni almacenamiento permanente.
- Muestra advertencia sobre manejo de datos sensibles cuando corresponda.

**Prioridad:** Alta  
**Estado:** Cerrado para versión local  
**Sprint:** Sprint 1

---

## HU-037 — Controlar acceso por usuario

**Como** administrador,  
**quiero** controlar acceso mediante usuarios y roles,  
**para** proteger información sensible en una futura versión institucional.

**Criterios de aceptación:**
- Permite iniciar sesión.
- Permite cerrar sesión.
- Permite asignar rol.
- Permite activar o desactivar usuario.
- Limita acciones según rol.

**Prioridad:** Alta web  
**Estado:** Pendiente  
**Sprint sugerido:** Futuro web

---

## HU-038 — Registrar auditoría de cambios

**Como** auditor CAC,  
**quiero** ver quién modificó un dato, cuándo y qué cambió,  
**para** garantizar trazabilidad en una versión centralizada.

**Criterios de aceptación:**
- Registra usuario responsable.
- Registra fecha y hora.
- Registra valor anterior.
- Registra valor nuevo.
- Registra variable afectada.
- Registra módulo afectado.

**Prioridad:** Alta web  
**Estado:** Pendiente  
**Sprint sugerido:** Futuro web

---

# Épica K — Compatibilidad y rendimiento

## HU-039 — Usar aplicación sin instalación compleja

**Como** digitador,  
**quiero** usar la aplicación desde navegador,  
**para** no depender de instalación compleja en cada equipo.

**Criterios de aceptación:**
- Abre desde navegador moderno.
- Puede ejecutarse localmente.
- Funciona en PC institucional.
- No requiere instalar software adicional para el usuario final, aparte de abrir el proyecto o usar servidor local.

**Prioridad:** Alta  
**Estado:** Cerrado funcional local  
**Sprint:** Sprint 1

---

## HU-040 — Procesar archivos grandes

**Como** analista de calidad,  
**quiero** procesar archivos grandes,  
**para** validar bases completas sin bloqueo.

**Criterios de aceptación:**
- Maneja bases grandes en pruebas.
- Muestra avance.
- No congela la interfaz.
- Muestra error si supera capacidad recomendada.

**Prioridad:** Media  
**Estado:** Pendiente de prueba formal de rendimiento  
**Sprint sugerido:** Futuro

---

# Épica L — Configuración y mantenimiento

## HU-041 — Configurar año de medición

**Como** administrador,  
**quiero** configurar año de medición CAC,  
**para** aplicar fecha de corte e instructivo correcto.

**Criterios de aceptación:**
- Permite seleccionar año.
- Ajusta fecha de corte.
- Ajusta reglas dependientes de periodo.
- Muestra versión activa del instructivo.

**Prioridad:** Media  
**Estado:** Pendiente  
**Sprint sugerido:** Futuro

---

## HU-042 — Mantener catálogos separados de la lógica

**Como** desarrollador,  
**quiero** tener catálogos en archivos independientes,  
**para** actualizarlos sin modificar reglas.

**Criterios de aceptación:**
- CIE-10 separado de la lógica.
- ATC separado de la lógica.
- CUPS separado de la lógica.
- Otros catálogos se integran según avance.
- Identifica versión de catálogo cargado cuando sea posible.

**Prioridad:** Alta  
**Estado:** En progreso  
**Sprint:** Transversal

---

## HU-043 — Mostrar versión de la aplicación

**Como** administrador o desarrollador,  
**quiero** ver la versión de la aplicación,  
**para** saber qué versión usa cada persona.

**Criterios de aceptación:**
- Muestra versión visible.
- Muestra fecha de actualización.
- Muestra versión de módulos activos.
- Muestra versión de catálogos cuando aplique.

**Prioridad:** Media  
**Estado:** En progreso  
**Sprint:** Transversal

---

# Mapeo de avance por sprints

## Sprint 0 — Base del producto y matriz

**Objetivo:** preparar base conceptual y técnica.

**Historias relacionadas:** HU-001, HU-002, HU-003

**Estado:** En uso y actualización continua.

---

## Sprint 1 — MVP local de carga y validación inicial

**Objetivo:** cargar Excel, validar estructura y validar V1-V16.

**Historias relacionadas:** HU-004, HU-005, HU-010, HU-016, HU-022, HU-023, HU-035, HU-036, HU-039

**Estado:** Cerrado funcional.

---

## Sprint 2 — Diagnóstico y catálogos mínimos

**Objetivo:** validar diagnóstico, confirmación e histología.

**Historias relacionadas:** HU-011, HU-017, HU-018, HU-024, HU-025, HU-026, HU-030, HU-034, HU-042, HU-043

**Estado:** Cerrado funcional para los bloques trabajados.

---

## Sprint 3 — Tratamiento y avance acumulativo

**Objetivo:** avanzar por bloques de tratamiento sistémico y mantener exportador funcional.

**Historias relacionadas:** HU-012, HU-021, HU-030, HU-035

**Estado:** Cerrado funcional hasta V60. V61 queda como siguiente variable.

---

## Sprints futuros — Bloques restantes

**Objetivo:** completar el resto del instructivo CAC.

**Historias relacionadas:** HU-013, HU-014, HU-015, HU-031, HU-032, HU-033, HU-037, HU-038, HU-040, HU-041, HU-044

**Estado:** Pendiente.

---

# Resumen

| Concepto | Cantidad |
|---|---:|
| Épicas | 12 |
| Historias | 44 |
| Avance funcional actual | V1-V60 |
| Siguiente variable | V61 |
| Primera entrega útil | V1-V16 |
| Bloque clínico cerrado actual | Primer o único esquema de terapia sistémica hasta V60 |
