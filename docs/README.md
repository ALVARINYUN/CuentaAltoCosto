# Validador CAC — Cohorte Cáncer

**Normativa base:** Resolución 0247/2014 · Instructivo CAC-IEP1-I01 · Medición enero 2025  
**Estado del proyecto:** Desarrollo local en avance progresivo  
**Avance funcional validado:** V1 a V60  
**Siguiente bloque de trabajo:** V61 en adelante, correspondiente al último esquema de terapia sistémica  

---

## ¿Qué es el Validador CAC?

El Validador CAC es una herramienta local para revisar archivos Excel de la Cuenta de Alto Costo antes del reporte final.

Permite cargar una matriz de pacientes, reconocer los encabezados del instructivo, aplicar reglas de validación por variable y mostrar los hallazgos encontrados en cada registro. El objetivo es detectar errores, advertencias e inconsistencias antes de entregar la información definitiva.

El desarrollo se realiza por sprints, de forma acumulativa. Cada variable se analiza, se implementa, se prueba y se cierra funcionalmente antes de avanzar a la siguiente.

---

## ¿Qué hace actualmente?

La aplicación permite:

1. Cargar archivos Excel.
2. Seleccionar la hoja de trabajo.
3. Reconocer encabezados reales del instructivo, incluyendo variables y subvariables.
4. Procesar registros por paciente.
5. Ejecutar reglas de negocio por módulos.
6. Mostrar errores y advertencias en pantalla.
7. Revisar hallazgos por fila, documento y variable.
8. Exportar un reporte Excel con celdas marcadas para revisión.

---

## Avance funcional

| Bloque | Estado | Descripción |
|---|---|---|
| V1-V16 | Cerrado | Identificación del usuario y datos básicos. |
| V17-V28 | Cerrado | Diagnóstico, confirmación, histología y diferenciación. |
| V29-V35 | Cerrado | Estadificación inicial y variables complementarias. |
| V36-V44 | Cerrado | Linfomas, riesgo, intervención médica y antecedentes. |
| V45-V53.9 | Cerrado | Inicio de terapia sistémica, ciclos, IPS y medicamentos base. |
| V54-V56 | Cerrado | Medicamentos adicionales del primer o único esquema. |
| V57-V60 | Cerrado | Cierre del primer o único esquema de terapia sistémica. |
| V61 | En revisión | Inicio del bloque de último esquema de terapia sistémica. |
| V62-V73 | Pendiente | Variables restantes del último esquema. |
| V74-V134 | Pendiente | Cirugía, radioterapia, trasplante, tratamiento complementario y cierre del reporte. |

---

## Cómo ejecutar el proyecto localmente

Desde la carpeta del proyecto, abrir una terminal y ejecutar:

```bash
python -m http.server 8000
```

Luego abrir en el navegador:

```text
http://localhost:8000
```

También puede abrirse `index.html` directamente, pero se recomienda usar el servidor local para evitar problemas con carga de archivos, catálogos o scripts.

---

## Flujo básico de uso

1. Abrir la aplicación en el navegador.
2. Cargar el archivo Excel.
3. Seleccionar la hoja que contiene los datos.
4. Validar la hoja.
5. Revisar el resumen de pacientes procesados, errores y advertencias.
6. Revisar el detalle de hallazgos.
7. Exportar el reporte Excel marcado.
8. Corregir la matriz original según los hallazgos.

---

## Privacidad y manejo de datos

La aplicación trabaja de forma local.

- Los datos no se envían a servidores externos.
- El procesamiento se realiza en el navegador del equipo.
- No se usan cookies ni almacenamiento permanente para datos de pacientes.
- Al cerrar o recargar la pestaña, la información cargada se pierde.
- Los archivos exportados quedan únicamente en el equipo del usuario.

---

## Estructura principal del proyecto

```text
validador-cac/
├── index.html
├── css/
│   └── estilos.css
├── libs/
│   ├── xlsx.full.min.js
│   └── xlsx-js-style.bundle.js
├── src/
│   ├── main.js
│   ├── ui/
│   ├── lector/
│   │   ├── estructura.js
│   │   └── excel.js
│   ├── validaciones/
│   │   ├── tipos.js
│   │   ├── engine.js
│   │   └── reglas/
│   │       ├── modulo1.js
│   │       ├── modulo2.js
│   │       ├── modulo3.js
│   │       ├── modulo4.js
│   │       ├── modulo5.js
│   │       ├── modulo6.js
│   │       ├── modulo7.js
│   │       ├── modulo8.js
│   │       ├── modulo9.js
│   │       ├── modulo10.js
│   │       ├── modulo11.js
│   │       ├── modulo12.js
│   │       └── modulo13.js
│   ├── catalogos/
│   └── exportador/
│       └── excel-reporte.js
└── docs/
```

---

## Módulos de validación

| Módulo | Variables | Estado |
|---|---|---|
| `modulo1.js` | V1-V16 | Cerrado |
| `modulo2.js` | V17-V24 | Cerrado |
| `modulo3.js` | V25-V28 | Cerrado |
| `modulo4.js` | V29 | Cerrado |
| `modulo5.js` | V30-V33 | Cerrado |
| `modulo6.js` | V34-V35 | Cerrado |
| `modulo7.js` | V36-V40 | Cerrado |
| `modulo8.js` | V41-V44 | Cerrado |
| `modulo9.js` | V45-V47 | Cerrado |
| `modulo10.js` | V48-V52 | Cerrado |
| `modulo11.js` | V53-V53.9 | Cerrado |
| `modulo12.js` | V54-V56 | Cerrado |
| `modulo13.js` | V57-V60 | Cerrado |
| `modulo14.js` | V61-V73 | En revisión / pendiente según avance |

---

## Reglas de trabajo

- No modificar variables cerradas salvo bug real.
- No inventar reglas que no estén soportadas por el instructivo.
- No adelantar validaciones de variables futuras.
- Mantener trazabilidad clara entre variables relacionadas.
- Explicar las reglas cruzadas indicando de dónde sale la coherencia.
- Probar cada variable con un Excel limpio antes de cerrarla.
- Revisar pantalla, consola y exportador antes de marcar cierre funcional.
- Mantener el desarrollo acumulativo: las variables anteriores siguen activas mientras se agregan nuevas.

---

## Documentación relacionada

La carpeta `docs/` reúne la documentación técnica y funcional del proyecto. Entre los documentos principales están:

```text
MATRIZ_VARIABLES.md
BACKLOG_VALIDADOR_CAC.md
catalogo-hallazgos
arquitectura_tecnica_variables.md
USER_STORIES.md
ARCHITECTURE.md
```

Estos documentos deben mantenerse actualizados a medida que se cierran nuevos bloques de variables.

---

## Estado actual

El proyecto tiene cierre funcional hasta **V60**.  
El siguiente trabajo es continuar con **V61**, que abre el bloque del último esquema de terapia sistémica.

Antes de avanzar con nuevas variables se debe conservar el avance cerrado hasta V60 y evitar cambios innecesarios sobre módulos ya validados.
