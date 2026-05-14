# Arquitectura Técnica - Validador CAC

**Proyecto:** Validador de matriz CAC para reporte de cohorte cáncer
**Versión:** 1.0
**Fecha:** Mayo 2026

---

## Índice

1. [Principios arquitectónicos](#1-principios-arquitectónicos)
2. [Stack tecnológico](#2-stack-tecnológico)
3. [Estructura de carpetas](#3-estructura-de-carpetas)
4. [Diagrama de componentes](#4-diagrama-de-componentes)
5. [Flujo de datos](#5-flujo-de-datos)
6. [Especificación de archivos](#6-especificación-de-archivos)
7. [Estructuras de datos](#7-estructuras-de-datos)
8. [Decisiones arquitectónicas (ADR)](#8-decisiones-arquitectónicas-adr)
9. [Estándares de código](#9-estándares-de-código)
10. [Roadmap técnico](#10-roadmap-técnico)

---

## 1. Principios arquitectónicos

Las "leyes" que rigen todo el proyecto. Si una decisión viola alguno de estos principios, se rechaza.

### Principio 1 — Privacidad por diseño
Los datos del paciente nunca salen del navegador. No hay backend, no hay localStorage para datos sensibles, no hay analytics, no hay telemetría.

### Principio 2 — Cero instalación
El usuario abre un archivo `.html` con doble clic. No instala Python, no habilita macros, no pide permisos de admin.

### Principio 3 — Separación de responsabilidades
Cada archivo tiene UNA responsabilidad clara. Si tocas un tema, modificas un solo archivo.

### Principio 4 — Sin frameworks pesados
HTML, CSS y JavaScript puro. Una sola librería externa: SheetJS para leer Excel.

### Principio 5 — Auditable
Cualquier persona puede abrir los archivos con un editor de texto y entender qué hacen.

### Principio 6 — Trazabilidad normativa
Cada validación referencia el número de variable y la regla del instructivo CAC que aplica.

### Principio 7 — Funcionamiento offline
La aplicación funciona sin conexión a internet una vez descargada.

---

## 2. Stack tecnológico

| Capa | Tecnología | Versión | Licencia | Justificación |
|---|---|---|---|---|
| Estructura | HTML | 5 | Estándar W3C | Universal, sin instalación |
| Estilos | CSS | 3 | Estándar W3C | Personalización completa |
| Lógica | JavaScript | ES6+ | Estándar ECMA | Soportado en navegadores modernos |
| Excel | SheetJS (xlsx) | 0.18.5 | Apache 2.0 | Lee/escribe Excel sin backend |
| Editor | VS Code | Cualquiera | MIT | Estándar de la industria |
| Control versiones | Git | Cualquiera | GPL | Estándar profesional |

### Lo que NO usamos y por qué

| Tecnología | Por qué NO |
|---|---|
| React, Vue, Angular | Requieren build, complican distribución, agregan complejidad innecesaria |
| Node.js (servidor) | Implicaría backend, viola Principio 1 |
| Bases de datos | Datos no se persisten por privacidad |
| TypeScript | Requiere compilación, complica auditoría |
| jQuery | JavaScript moderno ya lo cubre |
| Bootstrap | Genera dependencias innecesarias, CSS propio es suficiente |

---

## 3. Estructura de carpetas

```
validador-cac/
│
├── index.html                   ← Página principal (dashboard)
├── sprint1.html                 ← Validador del Sprint 1
│
├── css/
│   └── styles.css               ← Estilos compartidos
│
├── js/
│   ├── core.js                  ← Utilidades base
│   ├── catalogos.js             ← Tablas de valores permitidos
│   ├── ui.js                    ← Componentes visuales
│   ├── validaciones-s1.js       ← Reglas del Sprint 1
│   └── exportar.js              ← Generación de reportes
│
├── libs/
│   └── xlsx.full.min.js         ← SheetJS (única librería externa)
│
├── docs/
│   ├── instructivo-CAC.pdf      ← Referencia normativa
│   └── ejemplos/                ← Excel de prueba
│
├── README.md                    ← Instrucciones de uso
├── USER_STORIES.md              ← Backlog
├── USE_CASES_SPRINT_1.md        ← Casos de uso
└── ARCHITECTURE.md              ← Este documento
```

### Reglas de la estructura

- **Una sola página por sprint** (sprint1.html, sprint2.html). No usamos SPA.
- **Archivos JS pequeños y enfocados.** Si un archivo supera 500 líneas, se parte.
- **Sin subcarpetas en js/** para Sprint 1. Si crece, evaluamos en Sprint 2.
- **libs/ contiene solo dependencias externas** descargadas, nunca código propio.

---

## 4. Diagrama de componentes

```
                    ┌─────────────────┐
                    │   index.html    │
                    │   (dashboard)   │
                    └────────┬────────┘
                             │ link a
                             ▼
                    ┌─────────────────┐
                    │  sprint1.html   │
                    │  (validador)    │
                    └────────┬────────┘
                             │ carga
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
       ┌──────────┐   ┌──────────┐   ┌──────────┐
       │ styles.  │   │  xlsx.   │   │   js/    │
       │   css    │   │ full.min │   │ (módulos)│
       └──────────┘   └──────────┘   └─────┬────┘
                                            │
                          ┌─────────────────┼─────────────────┐
                          ▼                 ▼                 ▼
                   ┌──────────┐      ┌──────────┐      ┌──────────┐
                   │ core.js  │◀─────│validac.- │─────▶│catalogos.│
                   │          │      │  s1.js   │      │   js     │
                   └──────────┘      └────┬─────┘      └──────────┘
                          ▲               │
                          │               ▼
                          │         ┌──────────┐
                          └─────────│  ui.js   │
                                    └────┬─────┘
                                         │
                                         ▼
                                    ┌──────────┐
                                    │exportar. │
                                    │   js     │
                                    └──────────┘
```

### Reglas de dependencias

- `core.js` y `catalogos.js` no dependen de nadie (raíz)
- `validaciones-s1.js` depende de `core.js` y `catalogos.js`
- `ui.js` depende de `core.js`
- `exportar.js` depende de `core.js`
- `sprint1.html` orquesta todo (entry point)

### Regla de oro

**La flecha apunta hacia el que es usado.** Nadie puede tener flecha en círculo (dependencia circular).

---

## 5. Flujo de datos

```
┌─────────────────┐
│ Usuario arrastra│
│ archivo Excel   │
└────────┬────────┘
         │
         ▼ (FileReader API)
┌─────────────────┐
│  xlsx parsea    │
│   el binario    │
└────────┬────────┘
         │
         ▼ (array de objetos)
┌─────────────────────────────────────────┐
│  core.js: normaliza datos               │
│  [{v1:"MARIA", v2:"PEREZ", ...}, ...]   │
└────────┬────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  validaciones-s1.js                     │
│  Para cada paciente:                    │
│    - Aplica reglas de identificación    │
│    - Aplica reglas de diagnóstico       │
│    - Genera lista de errores            │
└────────┬────────────────────────────────┘
         │
         ▼ (array de resultados)
┌─────────────────────────────────────────┐
│  ui.js: dibuja tabla y stats            │
└────────┬────────────────────────────────┘
         │
         ▼ (acción del usuario)
┌─────────────────────────────────────────┐
│  exportar.js: genera reporte Excel      │
│  Descarga al navegador del usuario      │
└─────────────────────────────────────────┘
```

---

## 6. Especificación de archivos

### 6.1 core.js

**Responsabilidad:** Utilidades base usadas por todos los demás archivos.

**Funciones expuestas:**

```javascript
/**
 * Lee un archivo Excel y retorna array de objetos.
 * @param {File} file - Archivo cargado desde input
 * @returns {Promise<Array<Object>>} - Pacientes parseados
 */
async function leerExcel(file)

/**
 * Convierte fecha serial de Excel a string AAAA-MM-DD.
 * @param {number|string} valor - Serial Excel o string
 * @returns {string} - Fecha formato AAAA-MM-DD
 */
function parsearFecha(valor)

/**
 * Valida que un string cumpla formato AAAA-MM-DD.
 * @param {string} fecha
 * @returns {boolean}
 */
function esFechaValida(fecha)

/**
 * Normaliza texto: quita tildes, mayúsculas, espacios extras.
 * @param {string} texto
 * @returns {string}
 */
function normalizarTexto(texto)

/**
 * Compara dos fechas. Retorna negativo si a<b, 0 si igual, positivo si a>b.
 * @param {string} fechaA
 * @param {string} fechaB
 * @returns {number}
 */
function compararFechas(fechaA, fechaB)
```

**No expone:** lógica de validación, lógica de UI, lógica de exportación.

---

### 6.2 catalogos.js

**Responsabilidad:** Tablas de valores permitidos según el instructivo CAC.

**Constantes expuestas:**

```javascript
const CATALOGO_TIPO_ID = {
  "CC": "Cédula de Ciudadanía",
  "TI": "Tarjeta de Identidad",
  "RC": "Registro Civil",
  "PA": "Pasaporte",
  "CE": "Cédula de Extranjería",
  "AS": "Adulto sin Identificar",
  "MS": "Menor sin Identificar",
  "PE": "Permiso Especial",
  "PT": "Permiso de Protección Temporal"
};

const CATALOGO_REGIMEN = {
  "1": "Contributivo",
  "2": "Subsidiado",
  "3": "Especial/Excepción"
};

const CATALOGO_SEXO = {
  "M": "Masculino",
  "F": "Femenino"
};

const CODIGOS_SIN_INFO = ["98", "99"];
const COMODIN_FECHA_HISTORICA = "1845-01-01";
const FECHA_CORTE = "2025-01-01";

const CIE10_MAMA = ["C50"];
const CIE10_PROSTATA = ["C61"];
const CIE10_ELIMINADOS = ["C80X"];
```

**Regla:** Si el instructivo CAC cambia, SOLO se modifica este archivo.

---

### 6.3 ui.js

**Responsabilidad:** Componentes visuales reutilizables.

**Funciones expuestas:**

```javascript
/**
 * Renderiza la tabla de resultados de validación.
 * @param {Array<ResultadoPaciente>} resultados
 * @param {HTMLElement} contenedor
 */
function renderizarTabla(resultados, contenedor)

/**
 * Muestra notificación temporal en pantalla.
 * @param {string} mensaje
 * @param {string} tipo - "exito" | "error" | "advertencia"
 */
function mostrarToast(mensaje, tipo)

/**
 * Actualiza la barra de progreso.
 * @param {number} porcentaje - 0 a 100
 * @param {string} texto - Texto descriptivo opcional
 */
function actualizarProgreso(porcentaje, texto)

/**
 * Dibuja el panel de estadísticas.
 * @param {EstadisticasValidacion} stats
 * @param {HTMLElement} contenedor
 */
function renderizarStats(stats, contenedor)

/**
 * Filtra la tabla por documento de identidad.
 * @param {string} texto - Texto de búsqueda
 */
function filtrarTabla(texto)
```

---

### 6.4 validaciones-s1.js

**Responsabilidad:** Aplicar las reglas del Sprint 1 (variables 1-44).

**Funciones expuestas:**

```javascript
/**
 * Valida todos los pacientes y retorna resultados.
 * @param {Array<Paciente>} pacientes
 * @returns {Array<ResultadoPaciente>}
 */
function validarPacientes(pacientes)

/**
 * Valida un paciente individual.
 * @param {Paciente} paciente
 * @returns {ResultadoPaciente}
 */
function validarPaciente(paciente)
```

**Funciones internas (no expuestas):**

```javascript
function _validarIdentificacion(paciente)  // V1-V16
function _validarDiagnostico(paciente)     // V17-V44
function _crearError(variable, mensaje, severidad, valor, sugerencia)
```

**Cada validación debe documentarse así:**

```javascript
/**
 * V18 - Fecha de diagnóstico
 * Regla CAC: Debe estar en formato AAAA-MM-DD.
 *            Debe ser anterior o igual a V24 (fecha histopatología).
 */
function validarV18(paciente, errores) {
  // ...
}
```

---

### 6.5 exportar.js

**Responsabilidad:** Generar archivos descargables con los resultados.

**Funciones expuestas:**

```javascript
/**
 * Genera Excel con reporte de errores y descarga al usuario.
 * @param {Array<ResultadoPaciente>} resultados
 */
function exportarReporteExcel(resultados)

/**
 * Genera resumen ejecutivo en formato simple.
 * @param {Array<ResultadoPaciente>} resultados
 * @returns {Object} - Objeto con estadísticas
 */
function generarResumen(resultados)
```

---

### 6.6 sprint1.html

**Responsabilidad:** Página HTML principal del Sprint 1, orquesta todo.

**Estructura:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Validador CAC - Sprint 1</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header>...</header>
  <main>
    <section id="zona-carga">...</section>
    <section id="zona-progreso" hidden>...</section>
    <section id="zona-resultados" hidden>...</section>
    <section id="zona-stats" hidden>...</section>
  </main>

  <script src="libs/xlsx.full.min.js"></script>
  <script src="js/catalogos.js"></script>
  <script src="js/core.js"></script>
  <script src="js/ui.js"></script>
  <script src="js/validaciones-s1.js"></script>
  <script src="js/exportar.js"></script>
  <script>
    // Orquestación: eventos, flujo principal
  </script>
</body>
</html>
```

**Reglas:**
- El orden de los `<script>` respeta las dependencias
- La lógica al final del HTML es solo orquestación, no validaciones
- No hay JavaScript inline en elementos HTML (sin onclick="...")

---

## 7. Estructuras de datos

### 7.1 Paciente

Objeto que representa una fila del Excel.

```javascript
{
  v1: "MARIA",
  v2: "PEREZ",
  v3: "DEL CARMEN",
  v4: "GOMEZ",
  v5: "CC",
  v6: "12345678",
  v7: "1985-03-15",
  v8: "F",
  v9: "11001",
  v10: "1",
  // ... v11 a v134
  _fila: 5  // número de fila original en el Excel (para reportar)
}
```

### 7.2 Error de validación

```javascript
{
  variable: "V18",
  severidad: "error",            // "error" | "advertencia"
  mensaje: "Formato de fecha inválido",
  regla: "V18 debe tener formato AAAA-MM-DD según instructivo CAC-IEP1-I01",
  valorActual: "15/03/1985",
  sugerencia: "Cambiar a 1985-03-15"
}
```

### 7.3 ResultadoPaciente

```javascript
{
  documento: "12345678",
  fila: 5,
  errores: [/* objetos Error */],
  advertencias: [/* objetos Error con severidad=advertencia */],
  estado: "con_errores"  // "ok" | "con_advertencias" | "con_errores"
}
```

### 7.4 EstadisticasValidacion

```javascript
{
  totalPacientes: 276,
  pacientesOk: 120,
  pacientesConAdvertencias: 80,
  pacientesConErrores: 76,
  totalErrores: 245,
  totalAdvertencias: 156,
  porcentajeCumplimiento: 43.5,
  erroresFrecuentes: [
    { variable: "V18", cantidad: 45, descripcion: "Fecha mal formateada" },
    // ...
  ]
}
```

---

## 8. Decisiones arquitectónicas (ADR)

Los ADR son registros de **decisiones importantes** con su justificación. Sirven para que en el futuro alguien (incluso tú mismo) entienda por qué se tomó cierto camino.

### ADR-001 — HTML/JS puro sin framework

**Estado:** Aceptado
**Contexto:** Se evaluó React, Vue y Vanilla JS para el frontend.
**Decisión:** Vanilla JavaScript con HTML5 y CSS3.
**Justificación:**
- Sin paso de build (no Webpack, no npm run build)
- Distribución como archivo plano
- Auditoría más simple para áreas de seguridad
- Cero dependencias de actualización de frameworks
**Consecuencias:**
- (+) Portabilidad total
- (+) Auditable por cualquier persona
- (-) Más código manual para componentes
- (-) Sin reactividad automática

### ADR-002 — SheetJS como única dependencia externa

**Estado:** Aceptado
**Contexto:** Se necesita leer y escribir archivos Excel desde el navegador.
**Decisión:** Usar SheetJS (xlsx.full.min.js) versión 0.18.5.
**Justificación:**
- Licencia Apache 2.0 (libre para uso comercial)
- Estándar de facto para Excel en JavaScript
- Funciona 100% en navegador sin backend
- Soporta .xlsx y .xls

### ADR-003 — Sin backend ni servidor

**Estado:** Aceptado
**Contexto:** Los datos clínicos son sensibles (Ley 1581).
**Decisión:** Aplicación 100% cliente, todo en navegador.
**Justificación:**
- Garantiza que los datos nunca salen del PC del usuario
- Reduce costos de infraestructura a cero
- Simplifica el despliegue (compartir un archivo)
**Consecuencias:**
- (+) Privacidad absoluta
- (+) Cero costo de operación
- (-) Sin sincronización entre usuarios
- (-) Sin reporte centralizado de cumplimiento

### ADR-004 — Sin localStorage para datos sensibles

**Estado:** Aceptado
**Contexto:** localStorage persiste datos entre sesiones del navegador.
**Decisión:** No usar localStorage ni sessionStorage para datos del paciente.
**Justificación:**
- Si el PC es compartido, otro usuario podría ver los datos
- Cumple principio de "datos efímeros"
- Solo se permite localStorage para preferencias de UI (tema oscuro/claro)

### ADR-005 — Catálogos en archivo JS separado

**Estado:** Aceptado
**Contexto:** Los catálogos del instructivo CAC cambian anualmente.
**Decisión:** Tener un archivo `catalogos.js` con constantes exportables.
**Justificación:**
- Actualizar catálogos no requiere tocar lógica
- Reduce riesgo de bug por modificación
**Consecuencias futuras:** En Sprint 2 se evalúa migrar a JSON externo.

### ADR-006 — Una página HTML por sprint

**Estado:** Aceptado
**Contexto:** Se evaluó SPA vs multi-page.
**Decisión:** Cada sprint tiene su archivo HTML (sprint1.html, sprint2.html).
**Justificación:**
- Más simple de mantener
- Permite que el usuario use solo el sprint que necesita
- Reduce tamaño del archivo cargado por página

---

## 9. Estándares de código

### 9.1 Nomenclatura

| Elemento | Convención | Ejemplo |
|---|---|---|
| Variables | camelCase | `pacienteActual`, `totalErrores` |
| Funciones | camelCase | `validarFecha()`, `mostrarToast()` |
| Funciones privadas | `_camelCase` | `_validarIdentificacion()` |
| Constantes | UPPER_SNAKE_CASE | `CATALOGO_REGIMEN`, `FECHA_CORTE` |
| Clases CSS | kebab-case | `.zona-carga`, `.btn-primario` |
| IDs HTML | kebab-case | `id="zona-resultados"` |
| Archivos | kebab-case | `validaciones-s1.js` |

### 9.2 Indentación y formato

- **Indentación:** 2 espacios (no tabs)
- **Punto y coma:** obligatorio al final de cada sentencia
- **Comillas:** preferir comillas dobles `"texto"`, simples para JSX no aplica
- **Líneas largas:** máximo 100 caracteres
- **Líneas en blanco:** una entre funciones, dos entre secciones lógicas

### 9.3 Comentarios

**Funciones públicas:** usar JSDoc

```javascript
/**
 * Valida que una fecha cumpla formato AAAA-MM-DD.
 * @param {string} fecha - Fecha a validar
 * @returns {boolean} - true si es válida
 * @example
 *   esFechaValida("2025-01-15") // true
 *   esFechaValida("15/01/2025") // false
 */
function esFechaValida(fecha) { ... }
```

**Validaciones:** referenciar variable del instructivo

```javascript
// V18 - Fecha de diagnóstico (Instructivo CAC-IEP1-I01)
// Regla: formato AAAA-MM-DD, anterior o igual a V24
```

**No hacer:**
- Comentarios obvios (`i++; // incrementa i`)
- Código comentado (usar Git para historial)
- Comentarios en idioma mixto (todo en español)

### 9.4 Manejo de errores

```javascript
// CORRECTO: lanzar error con mensaje claro
if (!archivo) {
  throw new Error("No se proporcionó archivo Excel");
}

// CORRECTO: capturar y mostrar al usuario
try {
  const datos = await leerExcel(file);
} catch (error) {
  mostrarToast("Error al leer archivo: " + error.message, "error");
}

// EVITAR: silenciar errores
try { ... } catch (e) {} // ❌ malo
```

### 9.5 Git — Convención de commits

Formato: `tipo: descripción corta`

| Tipo | Cuándo usar |
|---|---|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Cambios en documentación |
| `style` | Formato, sin cambio de lógica |
| `refactor` | Reorganización de código |
| `test` | Agregar/modificar pruebas |
| `chore` | Tareas de mantenimiento |

**Ejemplos:**
- `feat: validar formato de fecha en V18`
- `fix: corregir parseo de fechas con comodín 1845-01-01`
- `docs: agregar casos de uso del Sprint 1`
- `refactor: separar catálogos a archivo independiente`

---

## 10. Roadmap técnico

### Sprint 1 — MVP funcional (Fase 1)

**Archivos a crear:**
1. `css/styles.css` (base visual)
2. `js/core.js` (utilidades base)
3. `js/catalogos.js` (catálogos CAC)
4. `js/ui.js` (componentes visuales)
5. `js/validaciones-s1.js` (reglas V1-V44)
6. `js/exportar.js` (reporte Excel)
7. `libs/xlsx.full.min.js` (descargar)
8. `index.html` (dashboard)
9. `sprint1.html` (validador)
10. `README.md` (instrucciones)

**Orden de construcción:**
1. styles.css (sin dependencias)
2. catalogos.js (sin dependencias)
3. core.js (sin dependencias)
4. ui.js (depende de core)
5. validaciones-s1.js (depende de core + catalogos)
6. exportar.js (depende de core)
7. sprint1.html (orquesta todo)
8. index.html (link a sprint1)

### Sprint 2 — UX y estadísticas (Fase 2)

- `js/validaciones-s2.js` (V45-V105)
- `sprint2.html`
- Mejoras en `ui.js` (filtros, ordenamiento)
- `js/dashboard.js` (estadísticas avanzadas)

### Sprint 3 — Avanzado (Fase 3)

- `js/validaciones-s3.js` (V106-V134)
- `sprint3.html`
- Exportación PDF en `exportar.js`
- Configuración de año de medición

---

## Apéndice — Glosario técnico

| Término | Definición |
|---|---|
| ADR | Architecture Decision Record |
| API | Application Programming Interface |
| CIE-10 | Clasificación Internacional de Enfermedades, 10ª revisión |
| DIVIPOLA | División Político-Administrativa de Colombia |
| MVP | Minimum Viable Product (Producto mínimo viable) |
| SISCAC | Sistema de Información de la Cuenta de Alto Costo |
| SPA | Single Page Application |
| UI | User Interface (Interfaz de usuario) |
| JSDoc | Sistema de documentación para JavaScript |

---

**Próximo paso:** Comenzar la implementación según el orden de construcción del Sprint 1.