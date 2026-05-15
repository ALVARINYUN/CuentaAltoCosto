# Arquitectura del sistema — Validador CAC

**Proyecto:** Validador CAC para reporte de cohorte cáncer
**Normativa base:** Resolución 0247/2014 · Instructivo CAC-IEP1-I01 · Medición enero 2025
**Versión:** 1.0
**Fecha:** Mayo 2026

---

## Índice

1. [Resumen ejecutivo](#1-resumen-ejecutivo)
2. [Contexto y restricciones](#2-contexto-y-restricciones)
3. [Evolución del sistema por fases](#3-evolución-del-sistema-por-fases)
4. [Arquitectura Fase 1 — MVP local](#4-arquitectura-fase-1--mvp-local-sprint-1-y-2)
5. [Arquitectura Fase 2 — Web institucional](#5-arquitectura-fase-2--web-institucional-sprint-4-en-adelante)
6. [Estructura de carpetas](#6-estructura-de-carpetas)
7. [Módulo de validaciones](#7-módulo-de-validaciones)
8. [Módulo de catálogos](#8-módulo-de-catálogos)
9. [Módulo de exportaciones](#9-módulo-de-exportaciones)
10. [Modelo de datos](#10-modelo-de-datos)
11. [Seguridad y privacidad](#11-seguridad-y-privacidad)
12. [Decisiones de diseño](#12-decisiones-de-diseño)
13. [Mapeo HU → componentes](#13-mapeo-hu--componentes)

---

## 1. Resumen ejecutivo

El validador CAC es una herramienta que permite a equipos de salud detectar errores en bases de datos de pacientes con cáncer antes de enviarlas a la CAC (Cuenta de Alto Costo). Trabaja sobre 134 variables definidas por el instructivo oficial, agrupadas en 8 módulos.

El sistema tiene dos fases de vida claramente distintas:

**Fase 1 (Sprint 1–3):** Aplicación local que corre en el navegador sin servidor. No guarda datos. Toda la información vive en memoria RAM mientras la pestaña está abierta. Está pensada para equipos que no tienen infraestructura web disponible.

**Fase 2 (Sprint 4+):** Versión web institucional con servidor, base de datos central, autenticación por roles y acceso desde celular. Para hospitales que quieren un sistema compartido entre varios usuarios.

La arquitectura está diseñada para que la transición entre fases sea posible sin reescribir la lógica de negocio (validaciones, catálogos, exportaciones).

---

## 2. Contexto y restricciones

### 2.1 Datos sensibles

Los datos que procesa este sistema son información de salud de pacientes con cáncer. Esto impone restricciones estrictas:

- **Nunca** enviar datos a servidores externos no autorizados.
- En Fase 1: procesar todo localmente, sin red.
- En Fase 2: almacenar solo en servidor institucional autorizado.
- No usar `localStorage` ni `sessionStorage` para datos de pacientes.
- Al cerrar la pestaña en Fase 1, todos los datos desaparecen.

### 2.2 Restricciones de la Fase 1

- Funciona abriendo `index.html` directamente en el navegador (protocolo `file://`).
- No requiere internet. Todas las librerías van en `libs/` local.
- No requiere permisos de administrador ni instalación.
- Solo usa memoria RAM del proceso del navegador.
- No deja rastro en disco.

### 2.3 Escala esperada

- Archivos de hasta 10.000 filas (HU-040).
- Archivos habituales: 500–2.000 pacientes por IPS.
- Procesamiento debe ser fluido sin congelar la interfaz.

### 2.4 Catálogos externos requeridos

| Catálogo | Variables | Fuente oficial |
|---|---|---|
| CIE-10 archivo operativo | V17, V44 | SISCAC |
| DIVIPOLA | V14 | DANE |
| EAPB | V11 | MinSalud |
| REPS / IPS | V25, V51, V52, V64, V65, V77, V82, V92, V93, V101, V102, V110, V113, V116, V119, V122 | MinSalud |
| ATC medicamentos | V53.1-V53.9, V54-V56, V66.1-V66.9, V67-V69 | SISCAC |
| CIUO ocupaciones | V9 | OIT |
| BDUA | V1-V4, V7, V16 | ADRES |

Cada catálogo se carga como archivo independiente (`JSON` o `CSV`) y no está embebido en la lógica de validación (HU-042).

---

## 3. Evolución del sistema por fases

```
Sprint 0-1      Sprint 2-3      Sprint 4        Sprint 5-8
───────────     ───────────     ──────────      ──────────
MVP Local   →   + Catálogos →   Web Inst.   →   Completo
                + Dashboard     + Auth          + Archivo
                + Excel         + Celular        plano CAC
                  export        + BD central
```

La capa de validaciones y la capa de catálogos son **compartidas entre ambas fases**. Se escriben una sola vez y funcionan tanto en el navegador (Fase 1) como en el servidor (Fase 2).

---

## 4. Arquitectura Fase 1 — MVP local (Sprint 1 y 2)

### 4.1 Visión general

```
┌─────────────────────────────────────────────────────────┐
│                    NAVEGADOR (RAM)                       │
│                                                         │
│  ┌──────────┐   ┌──────────────┐   ┌────────────────┐  │
│  │   UI     │   │   Motor de   │   │   Catálogos    │  │
│  │ (HTML +  │──▶│  Validación  │──▶│   (JSON/CSV    │  │
│  │  JS)     │   │              │   │   en memoria)  │  │
│  └──────────┘   └──────────────┘   └────────────────┘  │
│       │                │                                │
│       ▼                ▼                                │
│  ┌──────────┐   ┌──────────────┐                        │
│  │  Lector  │   │  Exportador  │                        │
│  │  Excel   │   │  (Excel)     │                        │
│  │ (SheetJS)│   │ (SheetJS)    │                        │
│  └──────────┘   └──────────────┘                        │
│                                                         │
│  ━━━━━━━━━━ TODO VIVE EN MEMORIA RAM ━━━━━━━━━━━━━━━━  │
└─────────────────────────────────────────────────────────┘
         ▲                              │
         │ .xlsx                        │ .xlsx (reporte)
    [Archivo local                [Descarga al
     del usuario]                  navegador]
```

### 4.2 Capas de la Fase 1

#### Capa UI
Responsabilidad: presentar información, recibir archivos, mostrar resultados.

- `index.html` — punto de entrada único
- Zona de carga por drag-and-drop o clic
- Tabla de pacientes con errores expandibles
- Barra de progreso durante validación
- Buscador en tiempo real por documento
- Botón de exportar reporte

Tecnología: HTML5 + CSS3 + JavaScript vanilla o React (sin servidor). Si se usa React, compilar previamente a archivos estáticos en `dist/`.

#### Capa de Lectura
Responsabilidad: leer el archivo Excel y convertirlo a estructura interna.

- Usa **SheetJS** (`xlsx`) como librería local en `libs/`
- Lee solo la primera hoja
- Normaliza encabezados (mayúsculas/minúsculas indiferente)
- Valida estructura mínima antes de procesar
- Produce array de objetos `{ V1, V2, ..., V134 }`

#### Capa de Validación
Responsabilidad: aplicar todas las reglas de la matriz CAC sobre cada registro.

- Arquitectura de reglas independientes por variable
- Cada regla retorna `{ variable, tipo, severidad, mensaje, recomendacion }`
- Tipos: `formato` | `catalogo` | `coherencia` | `dependencia`
- Severidades: `error` | `advertencia`
- El motor recorre las reglas en orden y acumula resultados
- Procesa de forma asíncrona con `setTimeout` o `Web Workers` para no congelar UI

#### Capa de Catálogos
Responsabilidad: proveer listas de valores válidos para validación.

- Cada catálogo es un archivo JSON o CSV en `catalogos/`
- Se carga en memoria al inicio o bajo demanda
- La lógica de validación nunca tiene valores hardcodeados
- El administrador puede actualizar los archivos sin tocar el código

#### Capa de Exportación
Responsabilidad: generar el reporte Excel de validación.

- Usa **SheetJS** para escribir el archivo
- Genera 3 hojas: Resumen, Errores por paciente, Errores frecuentes
- El archivo se descarga directamente en el navegador
- Nombre con timestamp: `Reporte_CAC_YYYYMMDD_HHMM.xlsx`
- No incluye nombres de pacientes, solo número de documento

### 4.3 Flujo de datos Fase 1

```
Usuario carga .xlsx
      │
      ▼
SheetJS lee archivo → Array de filas crudas
      │
      ▼
Validador de estructura → ¿Columnas mínimas presentes?
      │ Sí
      ▼
Motor de validación (asíncrono, por lotes de 100 filas)
  ├── Reglas V1-V16 (identificación)
  ├── Reglas V17-V44 (diagnóstico)
  ├── Reglas V45-V73 (terapia sistémica)     [Sprint 5]
  ├── Reglas V74-V85 (cirugía)               [Sprint 6]
  ├── Reglas V86-V105 (radioterapia)         [Sprint 6]
  ├── Reglas V106-V110 (trasplante)          [Sprint 6]
  ├── Reglas V111-V124 (complementario)      [Sprint 6]
  └── Reglas V125-V134 (resultado final)     [Sprint 7]
      │
      ▼
ResultadoValidacion[] en memoria RAM
      │
      ├──▶ UI: tabla de pacientes con errores
      └──▶ Exportador: archivo Excel de reporte
```

---

## 5. Arquitectura Fase 2 — Web institucional (Sprint 4 en adelante)

### 5.1 Visión general

```
┌──────────────┐     HTTPS      ┌─────────────────────────┐
│   CLIENTE    │◀──────────────▶│        SERVIDOR         │
│              │                │                         │
│  Navegador   │                │  ┌─────────────────┐   │
│  (React SPA) │                │  │   API REST      │   │
│              │                │  │   (Node.js /    │   │
│  Celular     │                │  │    Python)      │   │
│  (responsive)│                │  └────────┬────────┘   │
└──────────────┘                │           │             │
                                │  ┌────────▼────────┐   │
                                │  │   Motor de      │   │
                                │  │   Validación    │   │
                                │  │  (mismo código  │   │
                                │  │   que Fase 1)   │   │
                                │  └────────┬────────┘   │
                                │           │             │
                                │  ┌────────▼────────┐   │
                                │  │   Base de datos │   │
                                │  │  (PostgreSQL /  │   │
                                │  │   MongoDB)      │   │
                                │  └─────────────────┘   │
                                └─────────────────────────┘
                                         │
                                   Servidor institucional
                                   autorizado (no nube pública
                                   sin acuerdo de datos)
```

### 5.2 Nuevos módulos en Fase 2

#### Autenticación y roles (HU-037)
- Login con usuario y contraseña
- Roles: Digitador, Analista, Auditor, Coordinador, Administrador
- JWT para sesiones
- Cada acción queda asociada a un usuario

#### Base de datos central
- Registros CAC persistentes (no solo en RAM)
- Un registro puede ser creado desde PC o celular y continuado desde otro dispositivo
- Estado del registro: `Borrador` | `Validado` | `Exportado`

#### Auditoría de cambios (HU-038)
- Tabla de log: usuario, fecha/hora, variable, valor anterior, valor nuevo, módulo
- Inmutable: no se pueden eliminar registros del log

#### API REST
- `POST /validar` — recibe array de registros, retorna errores
- `GET /registros` — lista registros con filtros
- `POST /registros` — crea o actualiza un registro
- `GET /exportar/excel` — genera reporte Excel
- `GET /exportar/plano` — genera archivo plano CAC (Sprint 8)
- `GET /catalogos/:nombre` — retorna catálogo actualizado

### 5.3 Reutilización del motor de validación

El motor de validación de la Fase 1 se escribe en JavaScript puro (sin dependencias de navegador). En la Fase 2 se ejecuta en Node.js en el servidor sin modificaciones. Esto garantiza que las reglas sean idénticas en ambas fases.

```
validaciones/
├── engine.js          ← Motor principal (compartido Fase 1 y 2)
├── reglas/
│   ├── modulo1.js     ← V1-V16
│   ├── modulo2.js     ← V17-V44
│   ├── modulo3.js     ← V45-V73
│   ├── modulo4.js     ← V74-V85
│   ├── modulo5.js     ← V86-V105
│   ├── modulo6.js     ← V106-V110
│   ├── modulo7.js     ← V111-V124
│   └── modulo8.js     ← V125-V134
└── tipos.js           ← Constantes y tipos compartidos
```

---

## 6. Estructura de carpetas

### Fase 1 — Aplicación local

```
validador-cac/
│
├── index.html                  ← Punto de entrada único
├── README.md
│
├── src/
│   ├── main.js                 ← Arranque de la app
│   ├── ui/
│   │   ├── carga.js            ← Zona drag-and-drop, CU-01
│   │   ├── progreso.js         ← Barra de progreso, CU-03
│   │   ├── tabla-resultados.js ← Vista de errores, CU-06
│   │   ├── buscador.js         ← Búsqueda por documento, CU-07
│   │   └── exportar.js         ← Botón exportar, CU-08
│   │
│   ├── validaciones/
│   │   ├── engine.js           ← Motor principal
│   │   ├── tipos.js            ← Constantes, severidades, tipos
│   │   └── reglas/
│   │       ├── modulo1.js      ← V1-V16 identificación
│   │       ├── modulo2.js      ← V17-V44 diagnóstico
│   │       ├── modulo3.js      ← V45-V73 terapia sistémica
│   │       ├── modulo4.js      ← V74-V85 cirugía
│   │       ├── modulo5.js      ← V86-V105 radioterapia
│   │       ├── modulo6.js      ← V106-V110 trasplante
│   │       ├── modulo7.js      ← V111-V124 complementario
│   │       └── modulo8.js      ← V125-V134 resultado final
│   │
│   ├── catalogos/
│   │   ├── cargador.js         ← Lee y cachea catálogos
│   │   └── validador-catalogo.js ← Busca en catálogo
│   │
│   ├── lector/
│   │   ├── excel.js            ← Lee .xlsx con SheetJS
│   │   └── estructura.js       ← Valida columnas mínimas, CU-02
│   │
│   └── exportador/
│       └── excel-reporte.js    ← Genera reporte .xlsx, CU-08
│
├── catalogos/                  ← Archivos de datos externos
│   ├── cie10.json              ← Códigos CIE-10 operativos
│   ├── divipola.json           ← Municipios DANE
│   ├── eapb.json               ← Entidades aseguradoras
│   ├── reps.json               ← IPS habilitadas
│   ├── atc.json                ← Medicamentos antineoplásicos
│   └── ciuo.json               ← Ocupaciones
│
├── libs/                       ← Librerías descargadas (sin internet)
│   ├── xlsx.full.min.js        ← SheetJS para leer/escribir Excel
│   └── [otras librerías UI]
│
└── docs/
    ├── MATRIZ_VARIABLES.md
    ├── USER_STORIES.md
    ├── USE_CASES_SPRINT_1.md
    └── ARCHITECTURE.md         ← Este archivo
```

### Fase 2 — Web institucional (estructura adicional)

```
validador-cac/
├── client/                     ← Frontend React (mismo src/ de Fase 1 adaptado)
├── server/
│   ├── app.js                  ← Servidor Express/FastAPI
│   ├── routes/
│   │   ├── registros.js
│   │   ├── validacion.js
│   │   ├── exportacion.js
│   │   ├── catalogos.js
│   │   └── auth.js
│   ├── middleware/
│   │   ├── auth.js             ← Verificación JWT
│   │   └── auditoria.js        ← Log de cambios automático
│   ├── db/
│   │   ├── conexion.js
│   │   ├── modelos/
│   │   │   ├── Registro.js
│   │   │   ├── Usuario.js
│   │   │   └── LogAuditoria.js
│   │   └── migraciones/
│   └── validaciones/           ← Mismo código que src/validaciones/
└── docker-compose.yml          ← Despliegue institucional
```

---

## 7. Módulo de validaciones

### 7.1 Estructura de una regla

Cada regla es una función pura que recibe el registro completo y retorna un resultado o null:

```javascript
// Ejemplo: validación de V5 (tipo de identificación)
function validarV5(registro) {
  const CODIGOS_VALIDOS = ['CC','CE','CD','PA','SC','PT','PE','RC','TI','CN','AS','MS','DE','SI'];
  const valor = registro.V5;

  if (!valor || valor.trim() === '') {
    return {
      variable: 'V5',
      tipo: 'formato',
      severidad: 'error',
      valorEncontrado: valor,
      mensaje: 'El tipo de identificación es obligatorio.',
      recomendacion: 'Registre uno de los códigos válidos: CC, TI, RC, PA, CE, CD, SC, PT, PE, CN, AS, MS, DE, SI.'
    };
  }

  if (!CODIGOS_VALIDOS.includes(valor.toUpperCase())) {
    return {
      variable: 'V5',
      tipo: 'catalogo',
      severidad: 'error',
      valorEncontrado: valor,
      mensaje: `El código "${valor}" no existe en el catálogo de tipos de identificación.`,
      recomendacion: 'Verifique que el código corresponda al catálogo oficial CAC.'
    };
  }

  return null; // sin error
}

// Ejemplo: validación cruzada V5 → V10
function validarCoherenciaV5V10(registro) {
  const tiposRestringidos = ['AS', 'MS'];
  if (tiposRestringidos.includes(registro.V5) && registro.V10 !== 'S') {
    return {
      variable: 'V10',
      tipo: 'coherencia',
      severidad: 'error',
      valorEncontrado: registro.V10,
      mensaje: `El tipo de ID "${registro.V5}" solo es válido en Régimen Subsidiado, pero V10 = "${registro.V10}".`,
      recomendacion: 'Si el tipo de identificación es AS o MS, el régimen (V10) debe ser S (Subsidiado).'
    };
  }
  return null;
}
```

### 7.2 Motor principal

```javascript
// engine.js
async function validarRegistro(registro, catalogos) {
  const errores = [];

  // Módulo 1: Identificación
  errores.push(...await modulo1.validar(registro, catalogos));

  // Módulo 2: Diagnóstico
  errores.push(...await modulo2.validar(registro, catalogos));

  // Módulos siguientes según sprint...

  return errores.filter(e => e !== null);
}

async function validarBase(registros, catalogos, onProgreso) {
  const resultados = [];

  // Procesar en lotes de 100 para no bloquear UI
  const LOTE = 100;
  for (let i = 0; i < registros.length; i += LOTE) {
    const lote = registros.slice(i, i + LOTE);
    for (const registro of lote) {
      const errores = await validarRegistro(registro, catalogos);
      resultados.push({ registro, errores });
    }
    onProgreso(Math.min(i + LOTE, registros.length), registros.length);
    await pausar(0); // ceder control al navegador entre lotes
  }

  return resultados;
}
```

### 7.3 Tipos de validación implementados

| Tipo | Descripción | Ejemplo |
|---|---|---|
| `formato` | El valor no cumple el formato esperado | V7 con separador `/` en lugar de `-` |
| `catalogo` | El valor no existe en el catálogo cerrado | V5 = `XX` |
| `coherencia` | Dos variables son inconsistentes entre sí | V5 = `AS` y V10 = `C` |
| `dependencia` | Una variable obligatoria está vacía según condición | V21 = `7` y V22 vacío |
| `comodin` | Uso incorrecto de un comodín | `1845-01-01` en campo que no lo permite |
| `rango_fecha` | Fecha fuera del rango permitido | V7 posterior a fecha de corte |

### 7.4 Catálogo de comodines de fecha

| Comodín | Significado | Variables que lo aceptan |
|---|---|---|
| `1800-01-01` | Desconocido | V18, V19, V20, V23, V24, V26, V30, V39, V43, V49, V62, V88, V97, V103, V109, V115, V118, V121 |
| `1840-01-01` | No aplica (mama in situ) | V32 |
| `1845-01-01` | No aplica (contexto general) | V23, V24, V30, V32, V35, V39, V43, V49, V58, V62, V71, V76, V80, V88, V97, V103, V109, V112, V115, V118, V121, V130, V131 |

### 7.5 Reglas de variables de control

Las variables de control activan o desactivan bloques completos:

| Variable de control | Valor que desactiva | Bloque afectado |
|---|---|---|
| V21 | `7` | V22 obligatorio; V23, V24 = `1845-01-01` |
| V45 | `98` | V46-V73 → No Aplica |
| V74 | `2` | V75-V85 → No Aplica |
| V86 | `98` | V87-V105 → No Aplica |
| V106 | `98` | V107-V110 → No Aplica |
| V111 | `98` | V112, V113 → No Aplica |
| V114 | `2` | V115, V116 → No Aplica |
| V117 | `98` o `2` | V118, V119 → No Aplica |
| V120 | `98` o `2` | V121, V122 → No Aplica |
| V127 | `2` (fallecido) | V126 = `99`, V131 con fecha, V132 con causa |

---

## 8. Módulo de catálogos

### 8.1 Formato de catálogos JSON

```javascript
// catalogos/cie10.json
{
  "version": "2025-01",
  "fuente": "SISCAC",
  "datos": [
    { "codigo": "C50", "descripcion": "Tumor maligno de la mama", "valido": true },
    { "codigo": "C80X", "descripcion": "Tumor maligno de sitio no especificado", "valido": false }
  ]
}

// catalogos/divipola.json
{
  "version": "2024",
  "fuente": "DANE",
  "datos": [
    { "codigo": "11001", "departamento": "11", "municipio": "001", "nombre": "Bogotá D.C." },
    { "codigo": "05001", "departamento": "05", "municipio": "001", "nombre": "Medellín" }
  ]
}
```

### 8.2 Cargador de catálogos

```javascript
// catalogos/cargador.js
class CargadorCatalogos {
  constructor() {
    this.cache = {};
  }

  async cargar(nombre) {
    if (this.cache[nombre]) return this.cache[nombre];
    const respuesta = await fetch(`catalogos/${nombre}.json`);
    const datos = await respuesta.json();
    this.cache[nombre] = datos;
    return datos;
  }

  async cargarTodos() {
    const nombres = ['cie10', 'divipola', 'eapb', 'reps', 'atc', 'ciuo'];
    await Promise.all(nombres.map(n => this.cargar(n)));
  }

  buscar(nombre, codigo) {
    const catalogo = this.cache[nombre];
    if (!catalogo) throw new Error(`Catálogo "${nombre}" no cargado`);
    return catalogo.datos.find(d => d.codigo === codigo) || null;
  }

  esValido(nombre, codigo) {
    const entrada = this.buscar(nombre, codigo);
    return entrada !== null && entrada.valido !== false;
  }
}
```

### 8.3 Actualización de catálogos

Para actualizar un catálogo, el administrador reemplaza el archivo JSON en `catalogos/`. No se modifica ningún archivo de código. El sistema detecta la versión del catálogo en tiempo de ejecución (HU-043).

---

## 9. Módulo de exportaciones

### 9.1 Reporte Excel de validación (Sprint 2)

**Hoja 1 — Resumen:**

| Campo | Descripción |
|---|---|
| Total pacientes | Número de filas procesadas |
| Sin errores | Pacientes sin ningún error |
| Con errores críticos | Pacientes con al menos un error |
| Solo advertencias | Pacientes sin errores pero con advertencias |
| % cumplimiento | `(sin errores / total) × 100` |
| Variables más fallidas | Top 5 variables con más errores |

**Hoja 2 — Errores por paciente:**

| Columna | Descripción |
|---|---|
| Documento | V6 del paciente (no nombre) |
| Variable | Ej: V18 |
| Tipo | formato / catalogo / coherencia / dependencia |
| Severidad | error / advertencia |
| Valor encontrado | Lo que tiene el registro |
| Descripción | Qué está mal |
| Recomendación | Cómo corregirlo |

**Hoja 3 — Errores frecuentes:**

| Columna | Descripción |
|---|---|
| Variable | Ej: V17 |
| Regla | Descripción corta de la regla |
| Cantidad | Número de pacientes con ese error |
| % sobre total | Proporción del error |

### 9.2 Reporte PDF ejecutivo (Sprint 3)

Generado con **jsPDF** (librería local). Incluye:
- Encabezado con nombre de la entidad, fecha y periodo
- Indicadores visuales (semáforos de cumplimiento por módulo)
- Top 10 errores más frecuentes
- Recomendaciones prioritarias
- Sin datos individuales de pacientes

### 9.3 Reporte Word editable (Sprint 3)

Generado con **docx** (librería local). Incluye:
- Mismo contenido que PDF pero editable
- Tabla de errores detallada
- Secciones con marcadores para facilitar edición

### 9.4 Archivo plano CAC (Sprint 8)

- Exporta los 168 campos en el orden oficial del instructivo
- Validación previa obligatoria: si hay errores críticos, se bloquea la exportación
- Si hay solo advertencias, exporta con constancia registrada
- Se registra: fecha, usuario (Fase 2), versión de la aplicación

---

## 10. Modelo de datos

### 10.1 Registro CAC (en memoria Fase 1 / en BD Fase 2)

```javascript
{
  // Identificación interna
  id: "uuid",
  estado: "borrador" | "validado" | "exportado",
  fechaCreacion: "ISO-8601",
  fechaUltimaModificacion: "ISO-8601",

  // Variables CAC (V1 a V134 + subfases)
  V1: "MARIA",
  V2: "NONE",
  V3: "GARCIA",
  V4: "NOAP",
  V5: "CC",
  V6: "12345678",
  V7: "1975-03-15",
  // ... hasta V134

  // Subfases de variables compuestas
  "V46.1": "1",
  "V46.2": "2",
  // ...
  "V53.1": "L01XA01",
  // ...
  "V66.1": "97",
  // ...
}
```

### 10.2 Resultado de validación (en memoria)

```javascript
{
  registroId: "uuid",
  documento: "12345678",    // Solo V6, sin nombre
  totalErrores: 3,
  totalAdvertencias: 1,
  errores: [
    {
      variable: "V18",
      tipo: "formato",
      severidad: "error",
      valorEncontrado: "15/03/2024",
      mensaje: "La fecha de diagnóstico tiene formato incorrecto.",
      recomendacion: "Use el formato AAAA-MM-DD. Ejemplo: 2024-03-15"
    }
  ]
}
```

### 10.3 Esquema de base de datos (Fase 2)

```sql
-- Registros CAC
CREATE TABLE registros_cac (
  id UUID PRIMARY KEY,
  estado VARCHAR(20) NOT NULL DEFAULT 'borrador',
  datos JSONB NOT NULL,           -- Variables V1-V134
  creado_por UUID REFERENCES usuarios(id),
  fecha_creacion TIMESTAMPTZ DEFAULT NOW(),
  fecha_modificacion TIMESTAMPTZ DEFAULT NOW()
);

-- Log de auditoría (inmutable)
CREATE TABLE log_auditoria (
  id UUID PRIMARY KEY,
  registro_id UUID REFERENCES registros_cac(id),
  usuario_id UUID REFERENCES usuarios(id),
  fecha TIMESTAMPTZ DEFAULT NOW(),
  variable VARCHAR(10),
  modulo VARCHAR(50),
  valor_anterior TEXT,
  valor_nuevo TEXT
);

-- Usuarios y roles
CREATE TABLE usuarios (
  id UUID PRIMARY KEY,
  nombre VARCHAR(200) NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  rol VARCHAR(50) NOT NULL,       -- digitador, analista, auditor, coordinador, admin
  activo BOOLEAN DEFAULT true
);

-- Versiones de catálogos
CREATE TABLE versiones_catalogo (
  nombre VARCHAR(50) PRIMARY KEY,
  version VARCHAR(20) NOT NULL,
  fecha_carga TIMESTAMPTZ DEFAULT NOW(),
  cargado_por UUID REFERENCES usuarios(id)
);
```

---

## 11. Seguridad y privacidad

### 11.1 Principios

1. **Minimización de datos:** el reporte de validación solo incluye el número de documento, nunca nombres, fechas de nacimiento ni diagnósticos.
2. **Procesamiento local en Fase 1:** cero llamadas a servidores externos.
3. **Sin persistencia en Fase 1:** al cerrar la pestaña, todo desaparece.
4. **Servidor autorizado en Fase 2:** no se admiten proveedores de nube pública sin acuerdo de procesamiento de datos.

### 11.2 Checklist Fase 1

- [ ] No usar `localStorage` para datos de pacientes
- [ ] No usar `sessionStorage` para datos de pacientes
- [ ] No usar `IndexedDB` para datos de pacientes
- [ ] No hacer `fetch` ni `XMLHttpRequest` con datos de pacientes
- [ ] No incluir datos en URLs (query strings)
- [ ] Todas las librerías en `libs/` local (sin CDN externo)
- [ ] Mostrar advertencia al cargar sobre la naturaleza de los datos

### 11.3 Checklist Fase 2

- [ ] HTTPS obligatorio
- [ ] JWT con expiración (máximo 8 horas)
- [ ] Contraseñas hasheadas con bcrypt
- [ ] Log de auditoría inmutable
- [ ] Backup cifrado de la base de datos
- [ ] Acceso restringido por IP institucional (opcional)
- [ ] No exponer datos de pacientes en logs del servidor

---

## 12. Decisiones de diseño

### 12.1 ¿Por qué HTML local y no una app instalada?

Los equipos de salud en Colombia frecuentemente trabajan en PCs institucionales donde no tienen permisos de administrador para instalar software. Un archivo HTML que se abre en el navegador supera esta restricción sin requerir aprobación del área de TI (HU-039).

### 12.2 ¿Por qué catálogos en JSON externos y no en el código?

Los catálogos (CIE-10, DIVIPOLA, REPS, etc.) se actualizan periódicamente por entidades externas. Si están en el código, cada actualización requiere un desarrollador. Con archivos JSON independientes, el administrador puede actualizarlos sin tocar el código (HU-042). Además, esto permite que diferentes instituciones tengan versiones diferentes del mismo catálogo.

### 12.3 ¿Por qué procesar en lotes y no todo de una vez?

JavaScript es de un solo hilo. Procesar 10.000 filas de una sola vez congela el navegador completamente. Procesar en lotes de 100 con `await pausar(0)` entre lotes permite que el navegador actualice la barra de progreso y responda a eventos del usuario (HU-040).

### 12.4 ¿Por qué el motor de validación es JavaScript puro sin frameworks?

Para garantizar que el mismo código funcione en el navegador (Fase 1) y en Node.js en el servidor (Fase 2) sin modificaciones. Si se usara, por ejemplo, una librería que depende de APIs del navegador, no funcionaría en el servidor.

### 12.5 ¿Por qué no incluir nombres en los reportes?

Los reportes de validación se comparten por correo o chat dentro de los equipos. Si incluyeran nombres y diagnósticos de pacientes, estarían circulando datos sensibles de salud fuera de sistemas controlados. El número de documento es suficiente para que el equipo identifique el caso internamente.

### 12.6 ¿Por qué separar modulo1.js hasta modulo8.js?

Cada módulo de variables tiene entre 5 y 40 reglas. Un solo archivo de validación tendría miles de líneas, sería inmanejable y los conflictos de Git al trabajar en equipo serían frecuentes. La separación por módulo permite que diferentes desarrolladores trabajen en paralelo en el Sprint 5 (tratamiento) y Sprint 6 (cirugía) sin pisarse.

---

## 13. Mapeo HU → componentes

| Historia | Componente principal | Sprint |
|---|---|---|
| HU-001 | `docs/MATRIZ_VARIABLES.md` (consulta externa) | 0 |
| HU-002 | `docs/MATRIZ_VARIABLES.md` (edición en repo) | 0 |
| HU-003 | Git + historial de commits en MATRIZ_VARIABLES.md | 2 |
| HU-004 | `src/ui/carga.js` + `src/lector/excel.js` | 1 |
| HU-005 | `src/lector/estructura.js` | 1 |
| HU-006 | `src/ui/progreso.js` | 2 |
| HU-007 | Formulario manual (Fase 2 web) | 3 |
| HU-008 | CSS responsive (Fase 2 web) | 4 |
| HU-009 | BD central + API (Fase 2) | 4 |
| HU-010 | `src/validaciones/reglas/modulo1.js` | 1 |
| HU-011 | `src/validaciones/reglas/modulo2.js` | 2 |
| HU-012 | `src/validaciones/reglas/modulo3.js` | 5 |
| HU-013 | `src/validaciones/reglas/modulo4.js` | 6 |
| HU-014 | `src/validaciones/reglas/modulo5.js` | 6 |
| HU-015 | `src/validaciones/reglas/modulo8.js` | 7 |
| HU-016 | `src/validaciones/tipos.js` (constantes de severidad) | 1 |
| HU-017 | `catalogos/cie10.json` + `src/catalogos/cargador.js` | 2 |
| HU-018 | `catalogos/divipola.json` + `src/catalogos/cargador.js` | 2 |
| HU-019 | `catalogos/eapb.json` | 3 |
| HU-020 | `catalogos/reps.json` | 4 |
| HU-021 | `catalogos/atc.json` | 5 |
| HU-022 | `src/ui/tabla-resultados.js` | 1 |
| HU-023 | `src/ui/buscador.js` | 1 |
| HU-024 | `src/ui/tabla-resultados.js` (filtros) | 2 |
| HU-025 | `src/ui/tabla-resultados.js` (ordenamiento) | 2 |
| HU-026 | `src/ui/tabla-resultados.js` (paginación) | 2 |
| HU-027 | `src/ui/dashboard.js` | 2 |
| HU-028 | `src/ui/dashboard.js` (por bloque) | 3 |
| HU-029 | `src/ui/dashboard.js` (errores frecuentes) | 3 |
| HU-030 | `src/exportador/excel-reporte.js` | 2 |
| HU-031 | `src/exportador/pdf-reporte.js` | 3 |
| HU-032 | `src/exportador/word-reporte.js` | 3 |
| HU-033 | `src/exportador/archivo-plano.js` | 8 |
| HU-034 | Tooltips en UI (datos de MATRIZ_VARIABLES) | 2 |
| HU-035 | Mensajes en `src/validaciones/tipos.js` | 1 |
| HU-036 | Sin localStorage + aviso en UI + `libs/` local | 1 |
| HU-037 | `server/routes/auth.js` + middleware JWT | 4 |
| HU-038 | `server/middleware/auditoria.js` + tabla log | 5 |
| HU-039 | Estructura `index.html` + `libs/` sin CDN | 1 |
| HU-040 | Procesamiento por lotes en `engine.js` | 7 |
| HU-041 | Variable de configuración `FECHA_CORTE` en `tipos.js` | 6 |
| HU-042 | Carpeta `catalogos/` con JSON independientes | 2 |
| HU-043 | `version.json` con versión de app y catálogos | 2 |

---

## Notas finales

Este documento es la fuente de verdad arquitectónica del proyecto. Cualquier cambio de tecnología, estructura de carpetas o decisión de diseño debe actualizarse aquí antes de implementarse.

La matriz de variables (`MATRIZ_VARIABLES.md`) es la fuente de verdad de las reglas de negocio. Cuando el instructivo CAC cambie, ese documento se actualiza primero, y los archivos de reglas en `src/validaciones/reglas/` se actualizan en consecuencia.
