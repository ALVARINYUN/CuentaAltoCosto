# Arquitectura del sistema — Validador CAC

**Proyecto:** Validador CAC — Cáncer  
**Normativa base:** Resolución 0247/2014 · Instructivo CAC-IEP1-I01 · Medición enero 2025  
**Versión del documento:** 2.2  
**Estado actual:** aplicación local con avance funcional validado hasta **V66**  
**Siguiente bloque técnico:** V66.1  
**Fecha de actualización:** Junio 2026  

---

## 1. Resumen general

El Validador CAC es una aplicación local desarrollada para revisar archivos Excel de la Cuenta de Alto Costo antes del reporte final de cáncer.

La herramienta permite cargar una matriz de pacientes, reconocer encabezados del instructivo, aplicar reglas de validación por variable, presentar hallazgos en pantalla y exportar un reporte Excel con las celdas marcadas para revisión.

El proyecto se desarrolla por bloques de variables. Cada bloque se analiza, se implementa, se prueba y se cierra funcionalmente antes de avanzar al siguiente. El avance actual está cerrado hasta V66.

---

## 2. Flujo general

```text
Archivo Excel
    ↓
Lector de Excel
    ↓
Reconocimiento de estructura y encabezados
    ↓
Motor de validación
    ↓
Módulos de reglas por variable
    ↓
Resultados en pantalla
    ↓
Exportador Excel
```

---

## 3. Estructura de carpetas

```text
validador-cac/
├── index.html
├── css/
├── libs/
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
│   │       ├── modulo13.js
│   │       ├── modulo14.js
│   │       └── modulo15.js
│   ├── catalogos/
│   └── exportador/
└── docs/
```

---

## 4. Módulos de validación

| Módulo | Variables | Archivo | Estado |
|---|---|---|---|
| Módulo 1 | V1-V16 | `src/validaciones/reglas/modulo1.js` | Cerrado |
| Módulo 2 | V17-V24 | `src/validaciones/reglas/modulo2.js` | Cerrado |
| Módulo 3 | V25-V28 | `src/validaciones/reglas/modulo3.js` | Cerrado |
| Módulo 4 | V29 | `src/validaciones/reglas/modulo4.js` | Cerrado |
| Módulo 5 | V30-V33 | `src/validaciones/reglas/modulo5.js` | Cerrado |
| Módulo 6 | V34-V35 | `src/validaciones/reglas/modulo6.js` | Cerrado |
| Módulo 7 | V36-V40 | `src/validaciones/reglas/modulo7.js` | Cerrado |
| Módulo 8 | V41-V44 | `src/validaciones/reglas/modulo8.js` | Cerrado |
| Módulo 9 | V45-V47 | `src/validaciones/reglas/modulo9.js` | Cerrado |
| Módulo 10 | V48-V52 | `src/validaciones/reglas/modulo10.js` | Cerrado |
| Módulo 11 | V53-V53.9 | `src/validaciones/reglas/modulo11.js` | Cerrado |
| Módulo 12 | V54-V56 | `src/validaciones/reglas/modulo12.js` | Cerrado |
| Módulo 13 | V57-V60 | `src/validaciones/reglas/modulo13.js` | Cerrado |
| Módulo 14 | V61-V65 | `src/validaciones/reglas/modulo14.js` | Cerrado funcional |
| Módulo 15 | V66-V66.9 | `src/validaciones/reglas/modulo15.js` | En progreso: V66 cerrada, sigue V66.1 |
| Módulo 16 | V67-V73 | `src/validaciones/reglas/modulo16.js` | Pendiente |
| Módulo 17 | V74-V85 | `src/validaciones/reglas/modulo17.js` | Pendiente |
| Módulo 18 | V86-V105 | `src/validaciones/reglas/modulo18.js` | Pendiente |
| Módulo 19 | V106-V110 | `src/validaciones/reglas/modulo19.js` | Pendiente |
| Módulo 20 | V111-V124 | `src/validaciones/reglas/modulo20.js` | Pendiente |
| Módulo 21 | V125-V134 | `src/validaciones/reglas/modulo21.js` | Pendiente |

---

## 5. Ruta técnica desde V66.1

### Módulo 15 — V66-V66.9

| Variable | Tema | Estado |
|---|---|---|
| V66 | Número de medicamentos propuestos en el último esquema. | Cerrado funcional |
| V66.1 | Medicamento administrado 1 del último esquema. | Siguiente |
| V66.2-V66.9 | Medicamentos administrados 2 a 9 del último esquema. | Pendiente |

Reglas base:

- V66.1 permite ATC o 98.
- V66.1 no permite 97.
- V66.2 a V66.9 permiten ATC, 97 o 98.
- Los códigos ATC deben validarse contra catálogo cargado.

### Módulo 16 — V67-V73

| Variables | Tema | Estado |
|---|---|---|
| V67-V69 | Medicamentos adicionales del último esquema. | Pendiente |
| V70 | Quimioterapia intratecal en último esquema. | Pendiente |
| V71 | Fecha de finalización del último esquema. | Pendiente |
| V72 | Características actuales del último esquema. | Pendiente |
| V73 | Motivo de finalización prematura del último esquema. | Pendiente |

---

## 6. Catálogos

| Catálogo | Uso |
|---|---|
| CIE-10 | Diagnóstico y reglas por tipo de cáncer. |
| ATC | Medicamentos antineoplásicos. |
| CUPS | Procedimientos de cirugía y radioterapia. |
| REPS | IPS de confirmación y suministro de tratamientos. |
| DIVIPOLA | Municipio de residencia. |
| EAPB | Entidades de afiliación o territoriales. |
| CIUO | Ocupación. |

---

## 7. Criterios de cierre técnico

Una variable se considera cerrada cuando:

1. `estructura.js` reconoce el encabezado.
2. `excel.js` lee correctamente la variable.
3. `engine.js` ejecuta el módulo correspondiente.
4. El módulo de reglas genera los hallazgos esperados.
5. El Excel de prueba contiene errores controlados y casos correctos.
6. La consola confirma conteos esperados.
7. La pantalla muestra los resultados correctamente.
8. El exportador marca la celda correcta.
9. No se generan errores ajenos a la variable probada.
10. La documentación queda actualizada.

---

## 8. Estado actual

| Bloque | Estado |
|---|---|
| V1-V60 | Cerrado funcional |
| V61-V65 | Cerrado funcional |
| V66 | Cerrado funcional |
| V66.1 | Siguiente |
| V66.2-V134 | Pendiente |
