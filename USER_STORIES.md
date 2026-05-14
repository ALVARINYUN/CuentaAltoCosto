# Historias de Usuario - Validador CAC

**Proyecto:** Validador de matriz CAC para reporte de cohorte cáncer
**Normativa:** Resolución 0247/2014 - Instructivo CAC-IEP1-I01 (medición enero 2025)
**Versión del backlog:** 1.0
**Fecha:** Mayo 2026

---

## Índice

- [Reglas del backlog](#reglas-del-backlog)
- [Perfiles de usuario](#perfiles-de-usuario)
- [Épicas e historias](#épicas-e-historias)
  - [Épica A - Carga de archivos](#épica-a--carga-de-archivos)
  - [Épica B - Validaciones](#épica-b--validaciones-núcleo-del-negocio)
  - [Épica C - Visualización de resultados](#épica-c--visualización-de-resultados)
  - [Épica D - Exportación de reportes](#épica-d--exportación-de-reportes)
  - [Épica E - Dashboard y estadísticas](#épica-e--dashboard-y-estadísticas)
  - [Épica F - Usabilidad y ayuda](#épica-f--usabilidad-y-ayuda)
  - [Épica G - Compatibilidad y portabilidad](#épica-g--compatibilidad-y-portabilidad)
  - [Épica H - Seguridad y privacidad](#épica-h--seguridad-y-privacidad)
  - [Épica I - Configuración](#épica-i--configuración)
  - [Épica J - Mantenibilidad técnica](#épica-j--mantenibilidad-técnica)
  - [Épica K - Casos especiales](#épica-k--casos-especiales)
- [Mapeo a Sprints](#mapeo-a-sprints)

---

## Reglas del backlog

1. **Nunca se borran historias.** Si se descartan, se marcan como `[DESCARTADA]` con justificación.
2. **Cada historia tiene un ID único** que nunca se reutiliza.
3. **Las épicas agrupan** historias del mismo tema funcional.
4. **Los sprints son tiempos de trabajo**, no temas. Una épica puede repartirse en varios sprints.
5. **Toda nueva historia debe responder SÍ a:**
   - ¿Está alineada con la visión inicial (validar matriz CAC sin instalar nada)?
   - ¿Encaja en una épica existente o requiere una nueva?
   - ¿Aporta valor real al usuario?

---

## Perfiles de usuario

| Perfil | Descripción |
|---|---|
| Analista de calidad | Persona que revisa y valida los datos del Excel antes de cargar a SISCAC |
| Coordinador del programa | Responsable del programa de cáncer en la EPS/IPS, ve indicadores |
| Digitador | Personal administrativo que diligencia historias clínicas |
| Encargado de seguridad | Responsable de protección de datos y cumplimiento normativo |
| Desarrollador / Mantenedor | Persona técnica que mantiene y actualiza la aplicación |
| Administrador | Configura parámetros generales de la aplicación |

---

## Épicas e historias

### Épica A — Carga de archivos

| ID | Historia | Sprint |
|---|---|---|
| HU-01 | Como analista, quiero cargar el Excel arrastrándolo a la app, para validar sin configurar nada. | 1 |
| HU-12 | Como analista, quiero que la app valide que el archivo sea realmente la matriz CAC y no otro Excel, para evitar resultados equivocados. | 1 |
| HU-13 | Como analista, quiero ver una barra de progreso al cargar archivos grandes, para saber que la app no se congeló. | 1 |
| HU-14 | Como analista, quiero que la app detecte si faltan columnas obligatorias, para avisarme antes de procesar. | 1 |

---

### Épica B — Validaciones (núcleo del negocio)

| ID | Historia | Sprint |
|---|---|---|
| HU-15 | Como analista, quiero validar el bloque de identificación (V1-V16), para verificar datos demográficos del paciente. | 1 |
| HU-16 | Como analista, quiero validar el bloque de diagnóstico (V17-V44), para verificar la información oncológica inicial. | 1 |
| HU-17 | Como analista, quiero validar el bloque de tratamiento (V45-V105), para verificar terapia, cirugía y radioterapia. | 2 |
| HU-18 | Como analista, quiero validar el bloque de situación actual (V106-V134), para verificar estado y desenlace del paciente. | 3 |
| HU-19 | Como analista, quiero ver junto a cada error el número de variable y la regla del instructivo que se incumple, para saber exactamente qué dice la norma. | 1 |
| HU-20 | Como analista, quiero distinguir visualmente errores críticos (rojo) de advertencias (amarillo), para priorizar correcciones. | 1 |

---

### Épica C — Visualización de resultados

| ID | Historia | Sprint |
|---|---|---|
| HU-02 | Como analista, quiero ver una lista clara de errores por paciente, para saber qué corregir. | 1 |
| HU-21 | Como analista, quiero buscar un paciente por documento de identidad, para revisar su caso puntual. | 1 |
| HU-22 | Como analista, quiero filtrar errores por tipo (formato, catálogo, coherencia), para enfocarme en uno a la vez. | 2 |
| HU-23 | Como analista, quiero ordenar la tabla por número de errores, para atender primero los pacientes más críticos. | 2 |
| HU-24 | Como analista, quiero paginar la tabla cuando hay muchos pacientes, para que la app no se vuelva lenta. | 2 |

---

### Épica D — Exportación de reportes

| ID | Historia | Sprint |
|---|---|---|
| HU-03 | Como analista, quiero exportar el reporte de errores a Excel, para enviárselo al equipo. | 1 |
| HU-25 | Como analista, quiero exportar solo errores críticos sin advertencias, para enfocar al equipo en lo urgente. | 2 |
| HU-26 | Como coordinador, quiero exportar un PDF resumen ejecutivo, para llevarlo a reuniones de comité. | 3 |
| HU-27 | Como analista, quiero exportar la tabla filtrada actual (no todo), para enviar solo lo relevante. | 3 |

---

### Épica E — Dashboard y estadísticas

| ID | Historia | Sprint |
|---|---|---|
| HU-04 | Como coordinador, quiero ver porcentaje de cumplimiento, para saber qué tan limpia está la base. | 2 |
| HU-05 | Como coordinador, quiero ver errores más frecuentes, para capacitar al personal. | 2 |
| HU-28 | Como coordinador, quiero ver porcentaje de cumplimiento por bloque (identificación, diagnóstico, etc.), para localizar dónde están las debilidades. | 2 |
| HU-29 | Como coordinador, quiero ver gráfica de errores por tipo, para presentar visualmente al comité. | 2 |
| HU-30 | Como coordinador, quiero ver top 10 pacientes con más errores, para priorizar revisión clínica. | 3 |

---

### Épica F — Usabilidad y ayuda

| ID | Historia | Sprint |
|---|---|---|
| HU-31 | Como digitador, quiero ver un tooltip con la descripción de cada variable, para entender qué se valida sin abrir el instructivo. | 2 |
| HU-32 | Como digitador, quiero acceder a una guía rápida embebida en la app, para no depender del manual externo. | 2 |
| HU-33 | Como digitador, quiero que los mensajes de error sean en lenguaje claro, para entenderlos sin ser técnico. | 2 |

---

### Épica G — Compatibilidad y portabilidad

| ID | Historia | Sprint |
|---|---|---|
| HU-06 | Como digitador, quiero usar la app sin instalar programas, para no depender del área de sistemas. | 1 |
| HU-07 | Como digitador, quiero que funcione en Windows antiguo, para poder validar desde mi puesto de trabajo. | 2 |
| HU-34 | Como digitador, quiero que la app funcione sin internet, para usarla en zonas con mala conexión. | 1 |

---

### Épica H — Seguridad y privacidad

| ID | Historia | Sprint |
|---|---|---|
| HU-08 | Como encargado de seguridad, quiero garantía de que los datos no salen del computador, para cumplir con la Ley 1581 de habeas data. | 3 |
| HU-09 | Como encargado de seguridad, quiero revisar el código fuente, para auditar que la app no tiene puertas traseras. | 3 |
| HU-35 | Como encargado de seguridad, quiero que los datos se borren al cerrar la app, para no dejar rastros en memoria del navegador. | 1 |
| HU-36 | Como analista, quiero un aviso antes de cerrar si hay datos sin exportar, para no perder el trabajo. | 2 |

---

### Épica I — Configuración

| ID | Historia | Sprint |
|---|---|---|
| HU-37 | Como administrador, quiero configurar el año de medición CAC (2025, 2026), para usar el instructivo correcto. | 3 |
| HU-38 | Como digitador, quiero alternar entre modo claro y oscuro, para reducir cansancio visual. | 3 |

---

### Épica J — Mantenibilidad técnica

| ID | Historia | Sprint |
|---|---|---|
| HU-10 | Como desarrollador, quiero código separado por archivos con responsabilidad clara, para actualizar las reglas del instructivo CAC sin romper otras funciones. | 1 |
| HU-11 | Como desarrollador, quiero cada validación documentada con número de variable, para encontrarla rápido cuando cambie la normativa. | 1 |
| HU-39 | Como desarrollador, quiero los catálogos en archivos JSON separados, para actualizarlos sin tocar la lógica. | 2 |
| HU-40 | Como desarrollador, quiero un número de versión visible en la app, para saber qué versión está usando cada persona. | 2 |

---

### Épica K — Casos especiales

| ID | Historia | Sprint |
|---|---|---|
| HU-41 | Como analista, quiero que archivos con columnas adicionales se procesen igual ignorando lo extra, para no romperse con cambios menores. | 3 |
| HU-42 | Como analista, quiero que la app maneje archivos de hasta 10.000 filas sin colgarse, para procesar bases grandes. | 3 |

---

## Mapeo a Sprints

### Sprint 1 — MVP funcional (Fase 1 del código)

**Objetivo:** Aplicación funcional end-to-end con validaciones críticas del bloque de identificación y diagnóstico.

**Historias incluidas (16):**
HU-01, HU-02, HU-03, HU-06, HU-10, HU-11, HU-12, HU-13, HU-14, HU-15, HU-16, HU-19, HU-20, HU-21, HU-34, HU-35

**Entregable:** Validador funcional que procesa Excel, valida V1-V44, muestra errores y exporta reporte.

---

### Sprint 2 — UX y estadísticas (Fase 2 del código)

**Objetivo:** Mejorar experiencia de usuario, agregar validaciones de tratamiento y dashboard.

**Historias incluidas (16):**
HU-04, HU-05, HU-07, HU-17, HU-22, HU-23, HU-24, HU-25, HU-28, HU-29, HU-31, HU-32, HU-33, HU-36, HU-39, HU-40

**Entregable:** Aplicación con dashboard, validaciones V45-V105, ayuda contextual.

---

### Sprint 3 — Avanzado (Fase 3 del código)

**Objetivo:** Funciones avanzadas, validaciones finales y reforzamiento de seguridad.

**Historias incluidas (10):**
HU-08, HU-09, HU-18, HU-26, HU-27, HU-30, HU-37, HU-38, HU-41, HU-42

**Entregable:** Aplicación completa con todas las validaciones (V106-V134), reportes ejecutivos, configuración.

---

## Total: 42 historias en 11 épicas distribuidas en 3 sprints

---

**Próximos pasos del proyecto:**

1. Crear rama `sprint-1` en Git
2. Documentar casos de uso del Sprint 1
3. Definir arquitectura técnica detallada
4. Comenzar implementación

