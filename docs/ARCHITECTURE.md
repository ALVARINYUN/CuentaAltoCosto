# Arquitectura del sistema — Validador CAC

**Proyecto:** Validador CAC — Cohorte Cáncer  
**Normativa base:** Resolución 0247/2014 · Instructivo CAC-IEP1-I01 · Medición enero 2025  
**Versión del documento:** 2.1  
**Estado actual:** aplicación local con avance funcional validado hasta V60  
**Siguiente bloque técnico:** V61 — inicio del último esquema de terapia sistémica  
**Fecha de actualización:** Junio 2026  

---

## Índice

1. [Resumen general](#1-resumen-general)
2. [Alcance actual](#2-alcance-actual)
3. [Principios técnicos del proyecto](#3-principios-técnicos-del-proyecto)
4. [Arquitectura actual de la aplicación](#4-arquitectura-actual-de-la-aplicación)
5. [Flujo general de funcionamiento](#5-flujo-general-de-funcionamiento)
6. [Estructura de carpetas](#6-estructura-de-carpetas)
7. [Módulo de lectura y estructura](#7-módulo-de-lectura-y-estructura)
8. [Módulo de validaciones](#8-módulo-de-validaciones)
9. [Ruta técnica desde V61 hasta V134](#9-ruta-técnica-desde-v61-hasta-v134)
10. [Módulo de catálogos](#10-módulo-de-catálogos)
11. [Resultados y exportación](#11-resultados-y-exportación)
12. [Seguridad y privacidad](#12-seguridad-y-privacidad)
13. [Criterios de cierre técnico](#13-criterios-de-cierre-técnico)
14. [Estado actual del desarrollo](#14-estado-actual-del-desarrollo)
15. [Próximo paso](#15-próximo-paso)

---

## 1. Resumen general

El Validador CAC es una aplicación local desarrollada para revisar archivos Excel de la Cuenta de Alto Costo antes del reporte final de la cohorte cáncer.

La herramienta permite cargar una matriz de pacientes, reconocer encabezados del instructivo, aplicar reglas de validación por variable, presentar hallazgos en pantalla y exportar un reporte Excel con las celdas marcadas para revisión.

El proyecto se desarrolla por bloques de variables. Cada bloque se analiza, se implementa, se prueba y se cierra funcionalmente antes de avanzar al siguiente. El avance actual está cerrado hasta V60. La siguiente variable de trabajo es V61, que inicia el bloque del último esquema de terapia sistémica.

---

## 2. Alcance actual

La versión actual corresponde a una aplicación local en HTML, CSS y JavaScript. No requiere servidor para procesar la información y trabaja directamente en el navegador.

El alcance funcional validado incluye:

| Bloque | Estado |
|---|---|
| V1-V16 | Cerrado |
| V17-V28 | Cerrado |
| V29-V35 | Cerrado |
| V36-V44 | Cerrado |
| V45-V53.9 | Cerrado |
| V54-V56 | Cerrado |
| V57-V60 | Cerrado |
| V61 | Siguiente variable de trabajo |
| V62-V134 | Pendiente de implementación progresiva |

La arquitectura se mantiene como guía técnica para continuar el desarrollo sin afectar las variables ya cerradas.

---

## 3. Principios técnicos del proyecto

El desarrollo del Validador CAC se guía por los siguientes principios:

1. **Avance acumulativo:** las variables cerradas permanecen activas mientras se agregan nuevas variables.
2. **No tocar variables cerradas:** solo se modifican si aparece un bug real o una mejora de texto que no cambie la lógica.
3. **Reglas desde el instructivo:** no se implementan reglas clínicas o administrativas que no estén soportadas por el instructivo.
4. **Trazabilidad clara:** cuando una regla depende de dos o más variables, el hallazgo debe explicar de dónde sale la coherencia.
5. **No adelantar variables futuras:** si una validación depende de variables que aún no están implementadas, se deja pendiente hasta llegar a ellas.
6. **Pruebas limpias:** cada variable debe probarse con un Excel controlado, sin errores basura de bloques anteriores.
7. **Exportador como evidencia:** el reporte Excel debe marcar solo las celdas con hallazgo real.
8. **Documentación viva:** matriz, backlog, arquitectura, casos de uso y catálogo de hallazgos se actualizan según avance.

---

## 4. Arquitectura actual de la aplicación

La arquitectura actual se organiza en capas sencillas:

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

| Capa | Responsabilidad |
|---|---|
| Interfaz | Permite cargar archivo, seleccionar hoja, validar, revisar resultados y exportar. |
| Lector | Lee el Excel y convierte las filas en registros procesables. |
| Estructura | Reconoce encabezados reales, variables y subvariables. |
| Motor | Ejecuta los módulos de reglas activos. |
| Reglas | Contiene la lógica de validación por bloque de variables. |
| Catálogos | Provee datos de apoyo como CIE-10, ATC, CUPS y otros catálogos. |
| Exportador | Genera el archivo Excel marcado con errores y advertencias. |

---

## 5. Flujo general de funcionamiento

1. El usuario abre la aplicación en el navegador.
2. Carga un archivo Excel.
3. Selecciona la hoja de trabajo.
4. El sistema reconoce encabezados y variables.
5. El sistema define el modo acumulativo de validación, por ejemplo `ACUMULATIVO_V1_V60`.
6. El usuario ejecuta la validación.
7. El motor procesa cada fila.
8. Cada módulo genera hallazgos cuando corresponde.
9. La interfaz muestra el resumen y el detalle por paciente.
10. El usuario exporta el Excel marcado para revisión.

---

## 6. Estructura de carpetas

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
│   │   ├── cie10.js
│   │   ├── cups.js
│   │   ├── atc.js
│   │   └── cargador.js
│   └── exportador/
│       └── excel-reporte.js
└── docs/
```

Cuando se implemente V61, debe incorporarse `modulo14.js` para el bloque del último esquema de terapia sistémica.

---

## 7. Módulo de lectura y estructura

El lector está dividido principalmente en:

| Archivo | Función |
|---|---|
| `src/lector/excel.js` | Lee el archivo Excel, identifica hojas y transforma filas en registros. |
| `src/lector/estructura.js` | Reconoce encabezados, variables, subvariables y modo acumulativo. |

La estructura debe reconocer encabezados cortos y encabezados largos del instructivo. También debe permitir archivos de prueba parciales, siempre que correspondan al avance funcional esperado.

Ejemplo:

```text
V58
v58fechadefinalizaciondelprimerounicoesquema
```

Ambos encabezados deben reconocerse como V58 si están incluidos en la estructura.

---

## 8. Módulo de validaciones

Las reglas están separadas por módulos para facilitar mantenimiento y evitar afectar bloques cerrados.

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
| Módulo 14 | V61-V73 | `src/validaciones/reglas/modulo14.js` | Siguiente bloque |
| Módulo 15 | V74-V85 | `src/validaciones/reglas/modulo15.js` | Pendiente |
| Módulo 16 | V86-V105 | `src/validaciones/reglas/modulo16.js` | Pendiente |
| Módulo 17 | V106-V110 | `src/validaciones/reglas/modulo17.js` | Pendiente |
| Módulo 18 | V111-V124 | `src/validaciones/reglas/modulo18.js` | Pendiente |
| Módulo 19 | V125-V134 | `src/validaciones/reglas/modulo19.js` | Pendiente |

### 8.1 Estructura esperada de un hallazgo

Cada hallazgo debe entregar información suficiente para corregir el dato:

```text
Código
Variable
Severidad
Título
Qué pasa
Regla
Qué hacer
Valor encontrado
Datos involucrados
Columnas a revisar
```

Cuando hay trazabilidad entre variables, el mensaje debe ser explícito:

```text
Variable A indica X.
Variable B define Y.
Por eso, el valor esperado es Z.
```

Esto evita que una validación derivada parezca una regla inventada.

---

## 9. Ruta técnica desde V61 hasta V134

Esta sección guía el trabajo pendiente. No reemplaza el instructivo ni define reglas clínicas completas. Su función es ordenar la implementación.

### 9.1 Módulo 14 — V61-V73 · Último esquema de terapia sistémica

Este bloque continúa la terapia sistémica y corresponde al último esquema del periodo.

| Variables | Tema | Estado |
|---|---|---|
| V61 | Ubicación temporal del último esquema | Siguiente variable |
| V62 | Fecha de inicio del último esquema | Pendiente |
| V63-V65 | Número de IPS e IPS que suministran el último esquema | Pendiente |
| V66-V66.9 | Medicamentos base del último esquema | Pendiente |
| V67-V69 | Medicamentos adicionales del último esquema | Pendiente |
| V70 | Quimioterapia intratecal en último esquema | Pendiente |
| V71 | Fecha de finalización del último esquema | Pendiente |
| V72 | Características actuales del último esquema | Pendiente |
| V73 | Motivo de finalización prematura del último esquema | Pendiente |

**Regla de implementación:**  
V61 se trabaja primero como entrada del bloque. Las validaciones contra V62-V73 se documentan como trazabilidad pendiente hasta que esas variables existan en código.

### 9.2 Módulo 15 — V74-V85 · Cirugía

| Variables | Tema | Estado |
|---|---|---|
| V74 | Indica si recibió cirugía curativa o paliativa | Pendiente |
| V75 | Número de cirugías | Pendiente |
| V76-V79 | Primera cirugía del periodo | Pendiente |
| V80-V84 | Última cirugía o reintervención | Pendiente |
| V85 | Estado vital al finalizar cirugía | Pendiente |

Este bloque debe apoyarse en el instructivo, CUPS y REPS cuando estén disponibles.

### 9.3 Módulo 16 — V86-V105 · Radioterapia

| Variables | Tema | Estado |
|---|---|---|
| V86 | Indica si recibió radioterapia | Pendiente |
| V87-V96 | Primer o único esquema de radioterapia | Pendiente |
| V97-V105 | Último esquema de radioterapia | Pendiente |

Este bloque debe validar fechas, CUPS, IPS y características de finalización según el instructivo.

### 9.4 Módulo 17 — V106-V110 · Trasplante

| Variables | Tema | Estado |
|---|---|---|
| V106 | Indica si recibió trasplante | Pendiente |
| V107 | Tipo de trasplante | Pendiente |
| V108 | Ubicación temporal del trasplante | Pendiente |
| V109 | Fecha del trasplante | Pendiente |
| V110 | IPS que realizó el trasplante | Pendiente |

### 9.5 Módulo 18 — V111-V124 · Tratamiento complementario

| Variables | Tema | Estado |
|---|---|---|
| V111-V113 | Cirugía reconstructiva | Pendiente |
| V114-V116 | Cuidado paliativo | Pendiente |
| V117-V119 | Psiquiatría | Pendiente |
| V120-V122 | Nutrición | Pendiente |
| V123 | Soporte nutricional | Pendiente |
| V124 | Rehabilitación | Pendiente |

Este módulo debe trabajarse por subbloques para evitar mezclar reglas.

### 9.6 Módulo 19 — V125-V134 · Situación actual y cierre del reporte

| Variables | Tema | Estado |
|---|---|---|
| V125 | Tratamiento recibido a la fecha de corte | Pendiente |
| V126 | Resultado final del manejo oncológico | Pendiente |
| V127 | Estado vital | Pendiente |
| V128 | Novedad administrativa | Pendiente |
| V129 | Novedad clínica | Pendiente |
| V130 | Fecha de desafiliación | Pendiente |
| V131 | Fecha de muerte | Pendiente |
| V132 | Causa de muerte | Pendiente |
| V133 | Código único BDUA-BDEX-PVS | Pendiente |
| V134 | Fecha de corte | Pendiente |

Este bloque cierra el reporte y debe manejarse con cuidado porque contiene reglas administrativas y clínicas que pueden cruzarse entre sí.

---

## 10. Módulo de catálogos

Los catálogos permiten validar códigos cerrados o apoyar reglas específicas.

| Catálogo | Uso principal |
|---|---|
| CIE-10 | Diagnóstico principal, otro cáncer primario y reglas por tipo de cáncer. |
| ATC | Medicamentos antineoplásicos del primer esquema, último esquema y adicionales. |
| CUPS | Procedimientos de cirugía y radioterapia. |
| REPS | IPS de confirmación y suministro de tratamientos. |
| DIVIPOLA | Municipio de residencia. |
| EAPB | Entidades de afiliación o territoriales. |
| CIUO | Ocupación. |

Los catálogos deben mantenerse separados de la lógica para facilitar actualización y mantenimiento.

---

## 11. Resultados y exportación

La aplicación muestra:

- Pacientes procesados.
- Pacientes con errores.
- Pacientes con advertencias.
- Pacientes sin problemas.
- Detalle de hallazgos por paciente.

El exportador genera un Excel de revisión. Debe marcar únicamente las celdas relacionadas con hallazgos reales:

| Color | Uso |
|---|---|
| Rojo | Error |
| Amarillo | Advertencia |

El exportador debe reconocer variables simples y subvariables, por ejemplo:

```text
V53_2
V46_8
V60
```

---

## 12. Seguridad y privacidad

La versión actual trabaja localmente. Esto reduce el riesgo de exposición porque la información no sale del equipo donde se carga el archivo.

Reglas principales:

- No enviar datos de pacientes a servidores externos.
- No usar cookies para información clínica.
- No usar almacenamiento persistente del navegador para datos de pacientes.
- No dejar información sensible guardada automáticamente.
- El usuario conserva únicamente los archivos que decida descargar.

---

## 13. Criterios de cierre técnico

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

## 14. Estado actual del desarrollo

| Bloque | Estado | Observación |
|---|---|---|
| V1-V16 | Cerrado | Identificación del usuario. |
| V17-V28 | Cerrado | Diagnóstico, confirmación, histología y diferenciación. |
| V29-V35 | Cerrado | Estadificación inicial y variables complementarias. |
| V36-V44 | Cerrado | Linfomas, riesgo, intervención y antecedentes. |
| V45-V53.9 | Cerrado | Terapia sistémica inicial y medicamentos base. |
| V54-V56 | Cerrado | Medicamentos adicionales del primer o único esquema. |
| V57-V60 | Cerrado | Cierre del primer o único esquema. |
| V61 | Siguiente variable | Inicio del último esquema de terapia sistémica. |
| V62-V73 | Pendiente | Último esquema de terapia sistémica. |
| V74-V85 | Pendiente | Cirugía. |
| V86-V105 | Pendiente | Radioterapia. |
| V106-V110 | Pendiente | Trasplante. |
| V111-V124 | Pendiente | Tratamiento complementario. |
| V125-V134 | Pendiente | Situación actual y cierre del reporte. |

---

## 15. Próximo paso

El siguiente paso técnico es implementar y validar V61.

Antes de cerrar V61 se debe confirmar:

1. Reconocimiento del encabezado.
2. Lectura correcta en `excel.js`.
3. Ejecución del módulo correspondiente en `engine.js`.
4. Reglas estrictamente soportadas por el instructivo.
5. Excel limpio de prueba.
6. Conteos esperados en pantalla y consola.
7. Marcado correcto en el exportador.
8. Documentación actualizada.

Las validaciones que dependan de V62 a V73 deben dejarse para cuando esas variables estén implementadas.
