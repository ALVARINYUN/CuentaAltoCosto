# Casos de Uso - Sprint 1

**Proyecto:** Validador de matriz CAC
**Sprint:** 1 (MVP funcional)
**Versión:** 1.1
**Fecha:** Mayo 2026

---

## ¿Cómo leer este documento?

Cada caso de uso describe **paso a paso** una interacción entre el usuario y la aplicación. Los pasos numerados son el **flujo principal** (lo que ocurre cuando todo va bien). Los **flujos alternos** describen qué pasa si algo falla.

### Formato estándar

```
ID y nombre del caso de uso
Historias cubiertas: HU-XX, HU-YY
Actor principal: quién hace la acción
Precondiciones: qué debe ser cierto antes
Flujo principal: pasos numerados del éxito
Flujos alternos: qué pasa si algo falla
Postcondición: estado final del sistema
Reglas de negocio: políticas aplicables
```

---

## Índice

- [Flujo 1: Cargar y procesar archivo](#flujo-1--cargar-y-procesar-archivo)
  - [CU-01: Cargar archivo Excel](#cu-01--cargar-archivo-excel)
  - [CU-02: Validar estructura del archivo](#cu-02--validar-estructura-del-archivo)
  - [CU-03: Procesar carga con progreso](#cu-03--procesar-carga-con-progreso)
- [Flujo 2: Ver y revisar errores](#flujo-2--ver-y-revisar-errores)
  - [CU-04: Validar bloque de identificación](#cu-04--validar-bloque-de-identificación-v1-v16)
  - [CU-05: Validar bloque de diagnóstico](#cu-05--validar-bloque-de-diagnóstico-v17-v44)
  - [CU-06: Visualizar errores por paciente](#cu-06--visualizar-errores-por-paciente)
  - [CU-07: Buscar paciente específico](#cu-07--buscar-paciente-específico)
- [Flujo 3: Exportar reporte](#flujo-3--exportar-reporte)
  - [CU-08: Exportar reporte Excel](#cu-08--exportar-reporte-excel)
- [Flujo 4: Garantías técnicas y privacidad](#flujo-4--garantías-técnicas-y-privacidad)
  - [CU-09: Funcionamiento sin internet](#cu-09--funcionamiento-sin-internet)
  - [CU-10: Borrado de datos al cerrar](#cu-10--borrado-de-datos-al-cerrar)

---

# Flujo 1 — Cargar y procesar archivo

## CU-01 — Cargar archivo Excel

**Historias cubiertas:** HU-004

**Actor principal:** Analista de calidad

**Precondiciones:**
- El analista tiene el archivo `BASE_MATRIZ_SOS_2026.xlsx` en su PC
- La aplicación está abierta en el navegador

**Flujo principal:**
1. El analista visualiza una zona destacada en la pantalla que dice "Arrastra tu archivo Excel aquí o haz clic para seleccionar"
2. El analista arrastra el archivo Excel desde su explorador hacia esa zona
3. La aplicación detecta el archivo y muestra su nombre y tamaño
4. El sistema verifica que la extensión sea `.xlsx` o `.xls`
5. El sistema confirma la carga mostrando "Archivo cargado correctamente"
6. El sistema procede automáticamente al CU-02

**Flujos alternos:**

*FA-01.1 — Selección manual del archivo*
- En el paso 2, en lugar de arrastrar, el analista hace clic en la zona
- Se abre el explorador de archivos del sistema operativo
- El analista selecciona el archivo y da Aceptar
- Continúa en el paso 3

*FA-01.2 — Archivo de extensión incorrecta*
- En el paso 4, la extensión no es `.xlsx` ni `.xls`
- El sistema muestra mensaje: "Formato no válido. Solo se aceptan archivos Excel (.xlsx o .xls)"
- El sistema vuelve al paso 1

*FA-01.3 — Archivo corrupto o ilegible*
- En el paso 4, el archivo no se puede leer
- El sistema muestra mensaje: "El archivo está dañado o no se puede abrir. Verifica que no esté abierto en Excel."
- El sistema vuelve al paso 1

**Postcondición:** El archivo está cargado en memoria del navegador, listo para validar estructura.

**Reglas de negocio:**
- Solo se procesa la primera hoja del Excel
- El archivo no se sube a ningún servidor, todo se procesa local

---

## CU-02 — Validar estructura del archivo

**Historias cubiertas:** HU-004, HU-005

**Actor principal:** Sistema (automático)

**Precondiciones:**
- CU-01 completado exitosamente
- Archivo cargado en memoria

**Flujo principal:**
1. El sistema lee la primera fila del Excel (encabezados)
2. El sistema compara los encabezados con la lista esperada del instructivo CAC
3. El sistema verifica que existan al menos las 134 variables obligatorias
4. El sistema cuenta el número de filas con datos (excluyendo la fila de encabezados)
5. El sistema muestra resumen: "Archivo válido. X pacientes detectados. Y columnas reconocidas."
6. Habilita el botón "Iniciar validación"

**Flujos alternos:**

*FA-02.1 — Faltan columnas obligatorias*
- En el paso 3, faltan una o más variables
- El sistema muestra lista de columnas faltantes con su número de variable (ej: "Falta V18, V24, V31")
- El sistema deshabilita el botón "Iniciar validación"
- Sugiere: "Verifica que estés usando la matriz CAC oficial"

*FA-02.2 — Archivo vacío*
- En el paso 4, hay 0 filas de datos
- El sistema muestra: "El archivo no contiene registros para validar"
- Vuelve al CU-01

*FA-02.3 — Columnas adicionales no esperadas*
- Se encuentran columnas que no están en el instructivo
- El sistema las ignora silenciosamente y muestra solo las reconocidas
- Continúa el flujo normalmente

**Postcondición:** Estructura validada y datos listos para procesamiento.

**Reglas de negocio:**
- Los encabezados pueden estar en mayúsculas o minúsculas
- Se permite que el orden de las columnas varíe
- Las celdas vacías son válidas en variables opcionales

---

## CU-03 — Procesar carga con progreso

**Historias cubiertas:** HU-006

**Actor principal:** Sistema

**Precondiciones:**
- CU-02 completado exitosamente
- El analista hace clic en "Iniciar validación"

**Flujo principal:**
1. El sistema muestra una barra de progreso visible
2. El sistema procesa los pacientes uno a uno
3. La barra se actualiza mostrando porcentaje y "Procesando paciente X de Y"
4. Al terminar, la barra llega al 100%
5. El sistema muestra resumen: "Validación completa. Z errores y W advertencias encontrados."
6. Se habilita la vista de resultados (CU-06)

**Flujos alternos:**

*FA-03.1 — Archivo muy grande*
- Si el archivo tiene más de 5000 filas, el sistema muestra advertencia previa: "Este archivo es grande, puede tomar más de 10 segundos. ¿Continuar?"
- Si confirma, continúa normal

*FA-03.2 — Usuario cierra la pestaña*
- Si el usuario cierra el navegador a la mitad, el procesamiento se cancela
- Al volver a abrir, debe cargar el archivo de nuevo
- No queda nada guardado (privacidad)

**Postcondición:** Todos los pacientes evaluados, resultados en memoria.

---

# Flujo 2 — Ver y revisar errores

## CU-04 — Validar bloque de identificación (V1-V16)

**Historias cubiertas:** HU-010, HU-016

**Actor principal:** Sistema (automático durante CU-03)

**Precondiciones:**
- Procesamiento de validación en curso

**Flujo principal:**
1. Para cada paciente, el sistema toma las variables V1 a V16
2. Aplica las validaciones de formato:
   - V1, V2, V3, V4: nombres sin caracteres especiales, solo mayúsculas
   - V2 permite comodín `NONE` cuando no existe segundo nombre
   - V4 permite comodín `NOAP` cuando no existe segundo apellido
   - V5: tipo de identificación contra catálogo (CC, TI, RC, PA, CE, CD, SC, PT, PE, CN, AS, MS, DE, SI)
   - V6: número de identificación según formato del tipo en V5
   - V7: fecha de nacimiento en formato `AAAA-MM-DD`
   - V8: sexo — solo `M` o `F`
   - V9: código ocupación CIUO o comodines `9999`/`9998`
   - V10: régimen de afiliación (C, S, P, E, N, I)
   - V11: código EAPB o entidad territorial
   - V12: pertenencia étnica (1-6)
   - V13: grupo poblacional según rangos válidos del catálogo
   - V14: municipio DIVIPOLA exactamente 5 dígitos
   - V15: máximo dos teléfonos separados por guion o comodín `0`
   - V16: fecha de afiliación en formato `AAAA-MM-DD`
3. Aplica las validaciones de coherencia:
   - Si V5 = `AS` o `MS` → V10 debe ser `S`
   - V16 (fecha afiliación) debe ser posterior a V7 (fecha nacimiento)
   - Para EPS: V16 debe ser posterior a `1995-01-01`
   - V7 debe ser anterior a la fecha de corte del reporte
4. Cada error encontrado se registra con: paciente, variable, regla, severidad
5. La severidad es **error** (rojo) si bloquea el cargue, **advertencia** (amarillo) si es revisable

**Postcondición:** Lista de errores del bloque identificación creada.

**Reglas de negocio:**
- Los comodines `NONE` y `NOAP` deben ir en mayúscula sostenida
- `AS` y `MS` solo son válidos en régimen subsidiado (V10 = `S`)
- V14 debe tener exactamente 5 dígitos; los primeros 2 corresponden al departamento DANE

---

## CU-05 — Validar bloque de diagnóstico (V17-V44)

**Historias cubiertas:** HU-011, HU-016

**Actor principal:** Sistema (automático durante CU-03)

**Flujo principal:**
1. Para cada paciente, el sistema toma las variables V17 a V44
2. Valida formato:
   - V17: código CIE-10 con formato correcto (letra + 2-4 dígitos), contra catálogo operativo SISCAC
   - V17 bloquea el código `C80X` (eliminado del archivo operativo)
   - V18, V19, V20, V23, V24, V26: fechas en `AAAA-MM-DD` o comodines válidos
   - V21: tipo de estudio diagnóstico (catálogo: 5, 6, 7, 8, 9, 10, 99)
   - V22: motivo sin histopatología — obligatorio si V21 = `7`
   - V27: histología del tumor (catálogo 1-24, 98, 99)
   - V28: grado de diferenciación (catálogo 1-4, 94, 95, 98, 99)
   - V29: estadificación según tabla por tipo de cáncer
   - V42: antecedente otro cáncer primario (1, 2, 99)
3. Aplica validaciones de coherencia:
   - V19 (fecha remisión) ≤ V20 (fecha ingreso) ≤ V18 (fecha diagnóstico)
   - V23 (fecha recolección muestra) ≤ V24 (fecha informe histopatológico)
   - Si V21 = `7` → V22 obligatorio; V23 y V24 deben ser `1845-01-01`
   - Si V17 inicia con `D` (in situ) → V29 debe ser `0`
4. Valida variables dependientes del tipo de cáncer:
   - V31, V32, V33 (HER2) — solo si V17 corresponde a cáncer de mama
   - V34, V35 (Dukes) — solo si V17 corresponde a cáncer colorrectal
   - V36 (Ann Arbor/Lugano) — solo si V17 corresponde a linfoma o mieloma múltiple
   - V37 (Gleason) — solo si V17 corresponde a cáncer de próstata; coherencia con V8 = `M`
   - V38, V39 (clasificación de riesgo) — solo si V17 corresponde a leucemia o linfoma
5. Registra errores y advertencias con detalle de variable, regla y recomendación

**Postcondición:** Lista de errores del bloque diagnóstico creada.

**Reglas de negocio:**
- Comodines de fecha `1800-01-01` = desconocido; `1845-01-01` = no aplica
- El código `C80X` nunca es válido, independiente del contexto
- La opción `99` en pacientes incidentes se considera dato no gestionado (advertencia)

---

## CU-06 — Visualizar errores por paciente

**Historias cubiertas:** HU-022, HU-016

**Actor principal:** Analista de calidad

**Precondiciones:**
- CU-03 completado, errores cargados en memoria

**Flujo principal:**
1. El sistema muestra una tabla con columnas: Documento, Paciente, # Errores, # Advertencias, Estado
2. Cada fila representa un paciente
3. Los pacientes con errores aparecen primero (ordenados por cantidad descendente)
4. El analista hace clic en una fila
5. Se despliega el detalle con todos los errores de ese paciente
6. Cada error muestra: Variable (ej: V18), Descripción del error, Regla del instructivo violada, Sugerencia de corrección
7. Los errores críticos se ven en rojo, las advertencias en amarillo

**Flujos alternos:**

*FA-06.1 — No hay errores*
- Si todos los pacientes están limpios, se muestra: "¡Felicitaciones! No se encontraron errores en los X pacientes procesados."
- Se habilita el botón de exportar reporte de cumplimiento

*FA-06.2 — Cerrar detalle*
- El analista vuelve a hacer clic en la fila expandida
- El detalle se colapsa

**Postcondición:** El analista tiene visión completa de los errores.

---

## CU-07 — Buscar paciente específico

**Historias cubiertas:** HU-023

**Actor principal:** Analista de calidad

**Precondiciones:**
- Resultados de validación visibles (CU-06)

**Flujo principal:**
1. En la parte superior de la tabla hay un campo de búsqueda con placeholder "Buscar por documento de identidad"
2. El analista escribe el número (parcial o completo)
3. La tabla se filtra en tiempo real (con cada tecla)
4. Solo se muestran los pacientes cuyo documento contiene lo escrito
5. Si encuentra coincidencias, se muestran resaltadas
6. El analista puede hacer clic para ver detalle (CU-06)

**Flujos alternos:**

*FA-07.1 — Sin resultados*
- Si ningún documento coincide, muestra: "No se encontró paciente con ese documento"
- Botón "Limpiar búsqueda" para volver a ver todos

**Postcondición:** El analista localiza al paciente buscado.

---

# Flujo 3 — Exportar reporte

## CU-08 — Exportar reporte Excel

**Historias cubiertas:** HU-030

**Actor principal:** Analista de calidad

**Precondiciones:**
- Validación completada con errores o advertencias

**Flujo principal:**
1. En la parte superior de los resultados hay un botón "Exportar reporte"
2. El analista hace clic en el botón
3. El sistema genera un archivo Excel con las siguientes hojas:
   - **Resumen:** estadísticas generales (total pacientes, errores, advertencias, % cumplimiento)
   - **Errores por paciente:** lista detallada con paciente, variable, descripción, regla, sugerencia
   - **Errores frecuentes:** top de errores agrupados con conteo
4. El navegador descarga automáticamente el archivo con nombre `Reporte_CAC_YYYYMMDD_HHMM.xlsx`
5. El sistema muestra confirmación: "Reporte generado exitosamente"

**Flujos alternos:**

*FA-08.1 — Sin errores que reportar*
- Si no hay errores, genera un reporte de cumplimiento con solo la hoja Resumen
- Nombre: `Reporte_Cumplimiento_CAC_YYYYMMDD.xlsx`

*FA-08.2 — Navegador bloquea descarga*
- Si el navegador bloquea, muestra instrucciones: "Permite las descargas para este sitio y vuelve a intentar"

**Postcondición:** El analista tiene un archivo Excel para enviar al equipo.

**Reglas de negocio:**
- El reporte NO contiene nombres de pacientes (solo documento) para reducir riesgo de filtración de datos
- El nombre del archivo incluye fecha y hora para no sobrescribir versiones

---

# Flujo 4 — Garantías técnicas y privacidad

## CU-09 — Funcionamiento sin internet

**Historias cubiertas:** HU-039

**Actor principal:** Digitador

**Precondiciones:**
- El analista tiene el archivo de la aplicación (`index.html` y carpetas asociadas) en su PC

**Flujo principal:**
1. El analista hace doble clic en `index.html`
2. El navegador abre la aplicación
3. Todo funciona normalmente sin necesidad de conexión a internet
4. Validaciones, carga de archivos, exportación funcionan localmente

**Reglas de negocio:**
- Todas las librerías están descargadas en `libs/` localmente
- No se realizan llamadas a servidores externos
- No se requieren permisos de administrador

---

## CU-10 — Borrado de datos al cerrar

**Historias cubiertas:** HU-036

**Actor principal:** Sistema

**Precondiciones:**
- El analista cierra el navegador o la pestaña

**Flujo principal:**
1. El analista cierra la pestaña/navegador
2. El sistema operativo libera la memoria asignada al navegador
3. Todos los datos del paciente desaparecen
4. No queda ningún archivo temporal en disco
5. No queda ningún registro en historial del navegador con datos clínicos

**Reglas de negocio:**
- Los datos solo viven en memoria RAM mientras la pestaña está abierta
- No se usa localStorage ni sessionStorage para datos sensibles
- No se almacenan cookies con información del paciente

---

# Resumen de cobertura

| Caso de Uso | Historias cubiertas |
|---|---|
| CU-01 | HU-004 |
| CU-02 | HU-004, HU-005 |
| CU-03 | HU-006 |
| CU-04 | HU-010, HU-016 |
| CU-05 | HU-011, HU-016 |
| CU-06 | HU-022, HU-016 |
| CU-07 | HU-023 |
| CU-08 | HU-030 |
| CU-09 | HU-039 |
| CU-10 | HU-036 |

**Historias del Sprint 1 cubiertas:** 9 de 9 explícitas

**Historias cubiertas transversalmente sin caso de uso propio:**
- HU-016 (clasificar por severidad) → cubierta en CU-04, CU-05 y CU-06
- HU-035 (mensajes de error claros) → cubierta en flujos alternos de todos los CU
