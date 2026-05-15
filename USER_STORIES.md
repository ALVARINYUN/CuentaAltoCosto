# Historias de Usuario — Validador CAC

**Proyecto:** Validador CAC para reporte de cohorte cáncer  
**Normativa base:** Resolución 0247/2014 · Instructivo CAC-IEP1-I01 · Medición enero 2025  
**Versión del backlog:** 2.0  
**Fecha:** Mayo 2026  

---

## Reglas del backlog

1. No se reutilizan IDs de historias.
2. Las historias descartadas se marcan como `[DESCARTADA]` con justificación.
3. Cada historia debe tener valor funcional claro.
4. Cada sprint debe entregar algo usable.
5. Las validaciones se implementan por bloques de variables, no todas al mismo tiempo.
6. Los datos sensibles deben mantenerse en entorno autorizado.

---

## Perfiles

| Perfil | Descripción |
|---|---|
| Digitador | Registra o carga datos de pacientes. |
| Analista de calidad | Revisa errores, advertencias y soportes. |
| Auditor CAC | Verifica cumplimiento frente al instructivo. |
| Coordinador del programa | Consulta indicadores y resultados. |
| Administrador | Configura usuarios, matriz y catálogos. |
| Encargado de seguridad | Controla privacidad y protección de datos. |
| Desarrollador / mantenedor | Actualiza reglas, catálogos y exportaciones. |

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
**Sprint sugerido:** Sprint 0

---

## HU-002 — Mantener matriz técnica de variables

**Como** administrador,  
**quiero** crear y actualizar fichas técnicas de variables CAC,  
**para** mantener el sistema alineado con el instructivo vigente.

**Criterios de aceptación:**
- Permite registrar número de variable.
- Permite asociar módulo.
- Permite definir tipo de dato y formato esperado.
- Permite registrar catálogo, comodines, dependencias, reglas y severidad.
- Permite indicar soporte documental requerido.

**Prioridad:** Alta  
**Sprint sugerido:** Sprint 0

---

## HU-003 — Versionar matriz CAC

**Como** administrador,  
**quiero** versionar la matriz de variables,  
**para** conservar trazabilidad cuando cambie el instructivo CAC.

**Criterios de aceptación:**
- Cada cambio queda asociado a una versión.
- Se registra fecha, usuario responsable y descripción del cambio.
- Se puede consultar historial.
- Se puede marcar una versión como activa.

**Prioridad:** Media  
**Sprint sugerido:** Sprint 2

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
- Muestra mensaje claro si el archivo no se puede leer.
- No procesa datos hasta validar estructura mínima.

**Prioridad:** Alta  
**Sprint sugerido:** Sprint 1

---

## HU-005 — Validar estructura del archivo cargado

**Como** analista de calidad,  
**quiero** que el sistema valide si el Excel corresponde a la matriz CAC esperada,  
**para** evitar resultados equivocados por cargar un archivo incorrecto.

**Criterios de aceptación:**
- Detecta columnas obligatorias faltantes.
- Detecta nombres de columnas incompatibles.
- Informa qué columnas faltan.
- Permite ignorar columnas adicionales no requeridas.
- Bloquea validación si la estructura mínima no es válida.

**Prioridad:** Alta  
**Sprint sugerido:** Sprint 1

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
**Sprint sugerido:** Sprint 2

---

# Épica C — Captura manual y celular

## HU-007 — Crear registro CAC manualmente

**Como** digitador,  
**quiero** crear un registro CAC desde un formulario,  
**para** ingresar información sin depender solo de Excel.

**Criterios de aceptación:**
- Permite crear un registro nuevo.
- Muestra variables por módulo.
- Guarda avance parcial.
- El registro queda en estado `Borrador` hasta validarse.
- Permite continuar luego.

**Prioridad:** Alta para versión web  
**Sprint sugerido:** Sprint 3

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

**Prioridad:** Alta para uso hospitalario  
**Sprint sugerido:** Sprint 4

---

## HU-009 — Consultar registros centralizados

**Como** analista de calidad,  
**quiero** ver registros creados por diferentes usuarios,  
**para** revisar información consolidada del hospital.

**Criterios de aceptación:**
- Lista registros creados desde PC y celular.
- Permite buscar por documento.
- Permite filtrar por estado.
- Permite ver registros incompletos.
- Los datos no dependen del localStorage del dispositivo.

**Prioridad:** Alta para versión web  
**Sprint sugerido:** Sprint 4

---

# Épica D — Validaciones núcleo del negocio

## HU-010 — Validar identificación V1-V16

**Como** analista de calidad,  
**quiero** validar identificación del usuario,  
**para** detectar errores en nombres, documento, afiliación, régimen, municipio y teléfono.

**Criterios de aceptación:**
- V1, V2, V3 y V4 validan mayúsculas y caracteres prohibidos.
- V2 permite `NONE`.
- V4 permite `NOAP`.
- V5 valida catálogo de tipo de identificación.
- V6 valida formato según V5.
- V7 valida fecha de nacimiento.
- V8 solo permite `M` o `F`.
- V10 valida régimen.
- Si V5 = `AS` o `MS`, V10 debe ser `S`.
- V14 valida estructura DIVIPOLA.
- V15 permite máximo dos teléfonos separados por guion o `0`.
- V16 valida fecha de afiliación.

**Prioridad:** Alta  
**Sprint sugerido:** Sprint 1

---

## HU-011 — Validar diagnóstico V17-V44

**Como** analista de calidad,  
**quiero** validar diagnóstico del cáncer,  
**para** revisar CIE-10, fechas, estudio diagnóstico, histología, estadificación y antecedentes.

**Criterios de aceptación:**
- V17 valida CIE-10 contra catálogo operativo.
- V17 bloquea `C80X`.
- V18 valida fecha de diagnóstico.
- V19 y V20 validan secuencia remisión-ingreso-diagnóstico.
- V21 valida tipo de estudio.
- Si V21 = `7`, V22 es obligatorio.
- Si V21 = `7`, V23 y V24 deben ser `1845-01-01`.
- Si V17 inicia con `D`, V29 debe ser `0`.
- V31-V33 aplican según cáncer de mama.
- V37 aplica según cáncer de próstata.

**Prioridad:** Alta  
**Sprint sugerido:** Sprint 2

---

## HU-012 — Validar tratamiento sistémico V45-V73

**Como** analista de calidad,  
**quiero** validar terapia sistémica e intratecal,  
**para** revisar esquemas, ciclos, medicamentos, IPS, fechas y finalización.

**Criterios de aceptación:**
- V45 controla V46-V73.
- Si V45 = `98`, las dependientes usan comodines de no aplica.
- V47 valida ciclos.
- V49 valida inicio del esquema.
- V51 y V52 validan IPS contra REPS.
- V53.1-V53.9 validan ATC.
- No permite duplicar medicamentos dentro del mismo esquema.
- Valida coherencia entre primer y último esquema.

**Prioridad:** Media  
**Sprint sugerido:** Sprint 5

---

## HU-013 — Validar cirugía V74-V85

**Como** analista de calidad,  
**quiero** validar procedimientos quirúrgicos,  
**para** revisar fechas, CUPS, IPS, número de cirugías y estado vital postquirúrgico.

**Criterios de aceptación:**
- V74 controla V75-V85.
- Si V74 = `2`, el resto del bloque registra no aplica.
- V75 valida tiempos quirúrgicos.
- V76 valida primera cirugía en periodo.
- V77 valida IPS contra REPS.
- V78 valida CUPS.
- V80 solo aplica si hubo más de una cirugía.
- V85 es coherente con V127.

**Prioridad:** Media  
**Sprint sugerido:** Sprint 6

---

## HU-014 — Validar radioterapia V86-V105

**Como** analista de calidad,  
**quiero** validar radioterapia,  
**para** revisar sesiones, fechas, IPS, CUPS y finalización.

**Criterios de aceptación:**
- V86 controla V87-V105.
- Si V86 = `98`, el resto registra no aplica.
- V87 valida número de sesiones.
- V88 valida fecha de inicio.
- V90 valida CUPS.
- V92 y V93 validan IPS contra REPS.
- V94 valida finalización.
- V96 solo aplica si V95 = `2`.

**Prioridad:** Media  
**Sprint sugerido:** Sprint 6

---

## HU-015 — Validar resultado final V125-V134

**Como** analista de calidad,  
**quiero** validar situación actual, resultado, estado vital y novedades,  
**para** cerrar correctamente el reporte.

**Criterios de aceptación:**
- V125 valida tratamiento a la fecha de corte.
- V126 valida resultado final.
- Si V127 = `2`, V126 debe ser `99`.
- Si V127 = `2`, V131 debe tener fecha válida.
- Si V127 = `1`, V131 debe ser `1845-01-01`.
- V128 valida novedad administrativa.
- V129 valida novedad clínica.
- V134 siempre debe ser `2025-01-01`.

**Prioridad:** Media  
**Sprint sugerido:** Sprint 7

---

## HU-016 — Clasificar validaciones por severidad

**Como** auditor CAC,  
**quiero** que cada validación se clasifique por severidad,  
**para** priorizar correcciones antes del envío.

**Criterios de aceptación:**
- Errores críticos en rojo.
- Advertencias en amarillo.
- Información en azul o gris.
- Errores críticos bloquean exportación final oficial.
- Advertencias permiten exportar dejando constancia.
- Cada alerta indica variable, regla y recomendación.

**Prioridad:** Alta  
**Sprint sugerido:** Sprint 1

---

# Épica E — Catálogos externos

## HU-017 — Cargar catálogo CIE-10 operativo

**Como** administrador,  
**quiero** cargar catálogo CIE-10,  
**para** validar diagnósticos y reglas clínicas asociadas.

**Criterios de aceptación:**
- Permite importar Excel, CSV o JSON.
- Permite buscar código y descripción.
- Permite marcar códigos no permitidos.
- Bloquea `C80X`.
- Se actualiza sin tocar lógica.

**Prioridad:** Alta  
**Sprint sugerido:** Sprint 2

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
**Sprint sugerido:** Sprint 2

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
**Sprint sugerido:** Sprint 3

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
**Sprint sugerido:** Sprint 4

---

## HU-021 — Cargar catálogo ATC

**Como** administrador,  
**quiero** cargar catálogo ATC,  
**para** validar medicamentos antineoplásicos administrados.

**Criterios de aceptación:**
- Importa códigos ATC.
- Valida medicamentos de primer y último esquema.
- Advierte duplicados.
- Se actualiza sin tocar reglas.

**Prioridad:** Media  
**Sprint sugerido:** Sprint 5

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
**Sprint sugerido:** Sprint 1

---

## HU-023 — Buscar paciente por documento

**Como** analista de calidad,  
**quiero** buscar por documento,  
**para** revisar un caso puntual.

**Criterios de aceptación:**
- Busca por tipo y número de identificación.
- Muestra resumen del paciente.
- Muestra errores y advertencias asociados.
- Permite limpiar búsqueda.

**Prioridad:** Alta  
**Sprint sugerido:** Sprint 1

---

## HU-024 — Filtrar errores por tipo

**Como** analista de calidad,  
**quiero** filtrar errores por tipo,  
**para** revisar formato, catálogo, coherencia o soporte por separado.

**Criterios de aceptación:**
- Filtra por formato.
- Filtra por catálogo.
- Filtra por coherencia.
- Filtra por soporte documental.
- Permite ver todos nuevamente.

**Prioridad:** Media  
**Sprint sugerido:** Sprint 2

---

## HU-025 — Ordenar pacientes por criticidad

**Como** analista de calidad,  
**quiero** ordenar pacientes por cantidad de errores críticos,  
**para** priorizar casos urgentes.

**Criterios de aceptación:**
- Ordena por errores.
- Ordena por advertencias.
- Permite ascendente y descendente.
- Conserva filtros activos.

**Prioridad:** Media  
**Sprint sugerido:** Sprint 2

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
**Sprint sugerido:** Sprint 2

---

# Épica G — Dashboard e indicadores

## HU-027 — Ver cumplimiento general

**Como** coordinador,  
**quiero** ver porcentaje general de cumplimiento,  
**para** saber qué tan lista está la base.

**Criterios de aceptación:**
- Muestra porcentaje sin errores críticos.
- Muestra porcentaje con advertencias.
- Muestra porcentaje incompleto.
- Muestra total de pacientes procesados.

**Prioridad:** Media  
**Sprint sugerido:** Sprint 2

---

## HU-028 — Ver cumplimiento por bloque

**Como** coordinador,  
**quiero** ver cumplimiento por bloque,  
**para** identificar dónde están las debilidades.

**Criterios de aceptación:**
- Muestra cumplimiento V1-V16.
- Muestra cumplimiento V17-V44.
- Muestra cumplimiento V45-V73.
- Muestra cumplimiento V74-V105.
- Muestra cumplimiento V106-V134.

**Prioridad:** Media  
**Sprint sugerido:** Sprint 3

---

## HU-029 — Ver errores más frecuentes

**Como** coordinador,  
**quiero** ver reglas que más se incumplen,  
**para** capacitar al equipo.

**Criterios de aceptación:**
- Muestra top 10 reglas incumplidas.
- Muestra número de ocurrencias.
- Muestra variable asociada.
- Permite filtrar por bloque.

**Prioridad:** Media  
**Sprint sugerido:** Sprint 3

---

# Épica H — Exportaciones y reportes

## HU-030 — Exportar Excel de validación

**Como** analista de calidad,  
**quiero** exportar Excel de validación,  
**para** compartir errores, advertencias y pendientes.

**Criterios de aceptación:**
- Hoja de resumen ejecutivo.
- Hoja de detalle de registros.
- Hoja de errores y advertencias.
- Hoja de soportes requeridos.
- Columnas legibles.
- Encabezados claros.
- Hojas con filtros.

**Prioridad:** Alta  
**Sprint sugerido:** Sprint 2

---

## HU-031 — Exportar PDF ejecutivo

**Como** coordinador,  
**quiero** exportar PDF ejecutivo,  
**para** presentarlo en comité o reunión de calidad.

**Criterios de aceptación:**
- Incluye resumen ejecutivo.
- Incluye indicadores principales.
- Incluye principales hallazgos de calidad del dato.
- Incluye pendientes prioritarios.
- No incluye información innecesaria.
- Tiene diseño legible y profesional.

**Prioridad:** Media  
**Sprint sugerido:** Sprint 3

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
**Sprint sugerido:** Sprint 3

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
- Registra fecha y usuario que exporta.

**Prioridad:** Alta final  
**Sprint sugerido:** Sprint 8

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
**Sprint sugerido:** Sprint 2

---

## HU-035 — Mensajes de error claros

**Como** digitador,  
**quiero** recibir mensajes de error claros,  
**para** corregir sin depender de una persona técnica.

**Criterios de aceptación:**
- Indica qué está mal.
- Indica cómo corregirlo.
- Menciona variable afectada.
- Evita lenguaje excesivamente técnico.

**Prioridad:** Alta  
**Sprint sugerido:** Sprint 1

---

# Épica J — Seguridad, privacidad y auditoría

## HU-036 — Mantener datos en entorno autorizado

**Como** encargado de seguridad,  
**quiero** garantizar que los datos no salgan del entorno autorizado,  
**para** cumplir protección de datos personales y confidencialidad institucional.

**Criterios de aceptación:**
- Informa dónde se procesan los datos.
- En modo local, no se envían a servidores externos.
- En modo institucional, se guardan en servidor autorizado.
- No usa servicios externos sin autorización.
- Muestra advertencia sobre datos sensibles.

**Prioridad:** Alta  
**Sprint sugerido:** Sprint 1 / Sprint 4

---

## HU-037 — Controlar acceso por usuario

**Como** administrador,  
**quiero** controlar acceso mediante usuarios y roles,  
**para** proteger información sensible.

**Criterios de aceptación:**
- Permite iniciar sesión.
- Permite cerrar sesión.
- Permite asignar rol.
- Permite activar o desactivar usuario.
- Limita acciones según rol.

**Prioridad:** Alta web  
**Sprint sugerido:** Sprint 4

---

## HU-038 — Registrar auditoría de cambios

**Como** auditor CAC,  
**quiero** ver quién modificó un dato, cuándo y qué cambió,  
**para** garantizar trazabilidad.

**Criterios de aceptación:**
- Registra usuario responsable.
- Registra fecha y hora.
- Registra valor anterior.
- Registra valor nuevo.
- Registra variable afectada.
- Registra módulo afectado.

**Prioridad:** Alta web  
**Sprint sugerido:** Sprint 5

---

# Épica K — Compatibilidad y rendimiento

## HU-039 — Usar aplicación sin instalación compleja

**Como** digitador,  
**quiero** usar la aplicación desde navegador,  
**para** no depender de instalación en cada equipo.

**Criterios de aceptación:**
- Abre desde navegador moderno.
- No requiere instalar software adicional para usuario final.
- Funciona en PC institucional.
- Permite acceso desde celular en versión web.

**Prioridad:** Alta  
**Sprint sugerido:** Sprint 1

---

## HU-040 — Procesar archivos grandes

**Como** analista de calidad,  
**quiero** procesar archivos grandes,  
**para** validar bases completas sin bloqueo.

**Criterios de aceptación:**
- Maneja al menos 10.000 filas en pruebas.
- Muestra avance.
- No congela interfaz.
- Muestra error si supera capacidad recomendada.

**Prioridad:** Media  
**Sprint sugerido:** Sprint 7

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
**Sprint sugerido:** Sprint 6

---

## HU-042 — Mantener catálogos separados de la lógica

**Como** desarrollador,  
**quiero** tener catálogos en archivos o tablas independientes,  
**para** actualizarlos sin modificar reglas.

**Criterios de aceptación:**
- CIE-10 separado de la lógica.
- DIVIPOLA separado de la lógica.
- EAPB separado de la lógica.
- REPS separado de la lógica.
- ATC separado de la lógica.
- Identifica versión de catálogo cargado.

**Prioridad:** Alta  
**Sprint sugerido:** Sprint 2

---

## HU-043 — Mostrar versión de la aplicación

**Como** administrador o desarrollador,  
**quiero** ver la versión de la aplicación,  
**para** saber qué versión usa cada persona.

**Criterios de aceptación:**
- Muestra versión visible.
- Muestra fecha de actualización.
- Muestra versión de matriz CAC.
- Muestra versión de catálogos.

**Prioridad:** Media  
**Sprint sugerido:** Sprint 2

---

# Mapeo a sprints

## Sprint 0 — Base del producto y matriz

**Objetivo:** preparar base conceptual y técnica.

**Historias:** HU-001, HU-002

**Entregable:** matriz navegable y lista para alimentar reglas.

---

## Sprint 1 — MVP local de carga y validación inicial

**Objetivo:** cargar Excel, validar estructura y validar V1-V16.

**Historias:** HU-004, HU-005, HU-010, HU-016, HU-022, HU-023, HU-035, HU-036, HU-039

**Entregable:** primer validador funcional de identificación.

---

## Sprint 2 — Diagnóstico y catálogos mínimos

**Objetivo:** validar V17-V44 y cargar catálogos base.

**Historias:** HU-011, HU-017, HU-018, HU-024, HU-025, HU-026, HU-030, HU-034, HU-042, HU-043

**Entregable:** validador de identificación y diagnóstico con Excel de validación.

---

## Sprint 3 — Reportes ejecutivos y dashboard

**Objetivo:** mejorar salidas para coordinación y comité.

**Historias:** HU-003, HU-019, HU-027, HU-028, HU-029, HU-031, HU-032

**Entregable:** reportes Excel, PDF y Word con indicadores.

---

## Sprint 4 — Web institucional y celular

**Objetivo:** permitir uso real desde varios dispositivos con datos centralizados.

**Historias:** HU-007, HU-008, HU-009, HU-020, HU-037

**Entregable:** versión web inicial con usuarios y registros compartidos.

---

## Sprint 5 — Tratamiento sistémico y auditoría

**Objetivo:** validar terapia sistémica y activar trazabilidad.

**Historias:** HU-012, HU-021, HU-038

**Entregable:** tratamiento inicial y auditoría de cambios.

---

## Sprint 6 — Cirugía, radioterapia y configuración

**Objetivo:** validar bloques terapéuticos restantes.

**Historias:** HU-013, HU-014, HU-041

**Entregable:** validaciones terapéuticas ampliadas.

---

## Sprint 7 — Resultado final y rendimiento

**Objetivo:** cerrar variables finales y probar bases grandes.

**Historias:** HU-015, HU-006, HU-040

**Entregable:** validador completo con pruebas de rendimiento.

---

## Sprint 8 — Archivo plano final CAC

**Objetivo:** generar archivo final oficial.

**Historias:** HU-033

**Entregable:** archivo plano CAC final, bloqueado por errores críticos.

---

# Resumen

| Concepto | Cantidad |
|---|---:|
| Épicas | 12 |
| Historias | 43 |
| Sprints sugeridos | 9 |
| Primera entrega útil | Sprint 1 |
| Primera entrega clínica fuerte | Sprint 2 |
| Primera entrega institucional web | Sprint 4 |
