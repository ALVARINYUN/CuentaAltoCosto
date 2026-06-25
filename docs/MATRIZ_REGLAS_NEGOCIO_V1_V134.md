# Matriz de Reglas de Negocio — Validador CAC — Cáncer V1-V134

**Proyecto:** Validador CAC — Cáncer  
**Documento:** Matriz de reglas de negocio  
**Alcance:** V1-V134  
**Estado:** Archivo base completo creado; reglas en consolidación controlada  
**Fase relacionada:** Sprint 4A / Sprint 4C  
**Archivo:** `docs/MATRIZ_REGLAS_NEGOCIO_V1_V134.md`  
**Regla principal:** los errores cerrados no se tocan.

---

## 1. Objetivo

Consolidar en un solo documento las reglas de negocio del Validador CAC — Cáncer desde V1 hasta V134.

Este documento es diferente al backlog y diferente a la matriz de variables.

La matriz de variables responde:

- Qué variables existen.
- Cómo se llaman.
- Qué encabezado real/cortado tienen.
- A qué bloque pertenecen.
- Si están reconocidas o cerradas.

Esta matriz de reglas responde:

- Qué valida la APP.
- Qué catálogos permite.
- Qué comodines permite.
- Qué dependencias existen entre variables.
- Qué trazabilidad se exige.
- Qué condiciones generan error.
- Qué condiciones generan advertencia.
- Qué excepciones permite el instructivo.
- Qué código de hallazgo usa la APP.
- Qué archivo implementa cada regla.
- Qué estado tiene cada regla.

---

## 2. Estado funcional global

| Elemento | Estado |
|---|---|
| Alcance funcional del validador | V1-V134 |
| Última variable cerrada | V134 |
| Modo esperado | ACUMULATIVO_V1_V134 |
| Variables reconocidas esperadas | 166 |
| Base real auditada | Hoja 2025 |
| Filas base real | 275 |
| Variables faltantes esperadas | Ninguna |
| Errores cerrados | No se modifican |
| Advertencias | Pendientes de revisión en Sprint 4B |
| Consolidación de esta matriz | En curso, por bloques |

---

## 3. Separación documental

| Documento | Propósito |
|---|---|
| `docs/BACKLOG.md` | Gestión de sprints, pendientes, prioridades y criterios de cierre |
| `docs/matriz_variables_cac_actualizada_v134.md` | Inventario de variables, encabezados, módulos y estado |
| `docs/MATRIZ_REGLAS_NEGOCIO_V1_V134.md` | Reglas de negocio, trazabilidad, errores, advertencias y excepciones |
| `docs/USER_STORIES.md` | Historias de usuario |
| `docs/USE_CASES.md` | Casos de uso |
| `docs/AUDITORIA_PROYECTO.md` | Evidencias, pruebas, cierres, conteos y decisiones |
| `src/validaciones/reglas/` | Implementación real de reglas en JavaScript |

---

## 4. Reglas obligatorias de consolidación

1. No inventar reglas.
2. Toda regla debe venir del instructivo oficial, del código implementado o de auditorías cerradas.
3. Los errores cerrados no se tocan.
4. No se eliminan errores cerrados.
5. No se reclasifican errores cerrados.
6. No se suavizan errores cerrados.
7. No se modifica lógica cerrada salvo bug real confirmado.
8. Los comodines permitidos por instructivo no deben generar advertencia por sí solos.
9. Una advertencia sólo debe mantenerse si hay causa explícita: dependencia, fecha, catálogo, trazabilidad o revisión funcional.
10. Si una regla no está confirmada, se marca como pendiente de consolidación.
11. Si falta evidencia, no se documenta como regla cerrada.
12. Esta matriz no reemplaza al código; documenta lo que el código valida.

---

## 5. Valores comodín que deben tratarse con cuidado

Estos valores pueden ser válidos si el instructivo los permite:

| Valor | Uso general |
|---|---|
| 98 | No aplica / no recibió / no corresponde, según variable |
| 97 | Ya registrado / condición especial, según variable |
| 99 | Desconocido / fallecido / desafiliado / sin dato, según variable |
| 96 | Código especial, según variable |
| 1800-01-01 | Evento iniciado pero no finalizado, según variable |
| 1845-01-01 | No aplica para fechas, según variable |
| 9998 | No aplica / sin dato especial, según variable |
| 9999 | Desconocido / sin información, según variable |
| NONE | Sin dato, según archivo o catálogo |
| NOAP | No aplica, según archivo o catálogo |
| 0 | Valor válido en variables donde el catálogo lo permita |

Regla de control:

Un comodín permitido no debe generar advertencia por sí solo.

Sólo debe generar hallazgo si contradice:

- Una dependencia.
- Una fecha.
- Un catálogo.
- Una trazabilidad explícita.
- Una regla del instructivo.
- Una condición funcional cerrada.

---

## 6. Campos oficiales por variable

Cada variable debe documentarse con esta estructura:

| Campo | Descripción |
|---|---|
| Variable | Código de variable, por ejemplo V1, V45, V66.1 o V134 |
| Nombre oficial | Nombre según instructivo |
| Encabezado real/cortado | Encabezado leído por la APP en el Excel |
| Tipo de dato | Texto, número, fecha, catálogo, código, CIE-10, CUPS, ATC, REPS |
| Formato | Formato esperado, por ejemplo AAAA-MM-DD |
| Catálogo permitido | Valores válidos según instructivo |
| Comodines permitidos | Valores especiales aceptados por instructivo |
| Dependencias | Variables relacionadas que condicionan la validación |
| Trazabilidad | Relación lógica entre variables |
| Reglas de error | Condiciones que generan error |
| Reglas de advertencia | Condiciones que generan advertencia |
| Excepciones | Casos permitidos que no deben marcarse |
| Código de hallazgo | Código usado por la APP |
| Archivo implementador | Archivo JS donde está implementada la validación |
| Estado | Cerrada, pendiente de consolidación, pendiente de revisión |

---

## 7. Índice de bloques

| Bloque | Variables | Sprint | Estado en APP | Estado en matriz |
|---|---|---|---|---|
| Identificación | V1-V16 | Sprint 1 | Cerrado | Pendiente de consolidar |
| Diagnóstico inicial | V17-V24 | Sprint 2A | Cerrado | Pendiente de consolidar |
| Confirmación, histología y diferenciación | V25-V28 | Sprint 2B | Cerrado | Pendiente de consolidar |
| Primera estadificación | V29 | Sprint 2C | Cerrado | Pendiente de consolidar |
| Fechas y complementarias | V30-V33 | Sprint 2D | Cerrado | Pendiente de consolidar |
| Dukes colorrectal | V34-V35 | Sprint 2E | Cerrado | Pendiente de consolidar |
| Estadificación, riesgo y objetivo | V36-V40 | Sprint 3A | Cerrado | Pendiente de consolidar |
| Intervención médica y antecedentes | V41-V44 | Sprint 3B | Cerrado | Pendiente de consolidar |
| Inicio terapia sistémica | V45-V47 | Sprint 3C | Cerrado | Pendiente de consolidar |
| Primer o único esquema | V48-V52 | Sprint 3D | Cerrado | Pendiente de consolidar |
| Medicamentos primer o único esquema | V53-V53.9 | Sprint 3E | Cerrado | Pendiente de consolidar |
| Cierre primer esquema | V54-V60 | Sprint 3F | Cerrado | Pendiente de consolidar |
| IPS último esquema | V61-V65 | Sprint 3G | Cerrado | Pendiente de consolidar |
| Medicamentos último esquema | V66-V66.9 | Sprint 3H | Cerrado | Pendiente de consolidar |
| Medicamentos adicionales último esquema | V67-V69 | Sprint 3I | Cerrado | Pendiente de consolidar |
| Cierre último esquema y transición cirugía | V70-V77 | Sprint 3J | Cerrado | Pendiente de consolidar |
| Cirugía | V78-V85 | Sprint 3K | Cerrado | Pendiente de consolidar |
| Radioterapia | V86-V105 | Sprint 3L | Cerrado | Pendiente de consolidar |
| Trasplante | V106-V110 | Sprint 3M | Cerrado | Pendiente de consolidar |
| Tratamiento complementario y tipo tratamiento a corte | V111-V125 | Sprint 3N | Cerrado | Pendiente de consolidar |
| Resultado final, estado vital, novedades y cierre | V126-V134 | Sprint 3O | Cerrado | Pendiente de consolidar |

---

## 8. Plantilla oficial por variable

Copiar esta plantilla para consolidar cada variable.

| Campo | Detalle |
|---|---|
| Variable | VXX |
| Nombre oficial | Pendiente de consolidar |
| Encabezado real/cortado | Pendiente de verificar |
| Tipo de dato | Pendiente de consolidar |
| Formato | Pendiente de consolidar |
| Catálogo permitido | Pendiente de consolidar |
| Comodines permitidos | Pendiente de consolidar |
| Dependencias | Pendiente de consolidar |
| Trazabilidad | Pendiente de consolidar |
| Reglas de error | Pendiente de consolidar |
| Reglas de advertencia | Pendiente de consolidar |
| Excepciones | Pendiente de consolidar |
| Código de hallazgo | Pendiente de consolidar |
| Archivo implementador | Pendiente de consolidar |
| Estado | Pendiente de consolidar |

---

## 9. Reglas generales consolidadas

Esta sección contiene reglas ya confirmadas durante el desarrollo del proyecto.

No reemplaza la consolidación completa variable por variable.

### 9.1 Reglas generales de fechas

| Regla | Estado |
|---|---|
| Las fechas deben manejar formato AAAA-MM-DD cuando el instructivo lo exige | Confirmada |
| Si sólo se conoce año y mes, se usa día 15 cuando el instructivo lo permite | Confirmada |
| `1845-01-01` se usa como No Aplica en fechas donde el instructivo lo permite | Confirmada |
| `1800-01-01` se usa en algunas fechas para eventos iniciados pero no finalizados | Confirmada según variable |
| Una fecha real no debe contradecir fechas previas cuando hay trazabilidad explícita | Confirmada según variable |

### 9.2 Reglas generales de códigos

| Tipo de código | Regla general | Estado |
|---|---|---|
| CIE-10 | Debe existir en catálogo CIE-10 cuando la variable lo exige | Confirmada |
| CUPS | Debe existir en catálogo CUPS cuando la variable lo exige | Confirmada |
| ATC | Debe existir en catálogo ATC cuando la variable lo exige | Confirmada |
| REPS / IPS | Debe conservar ceros iniciales y validar longitud/formato cuando aplique | Confirmada |

### 9.3 Reglas generales de comodines

| Regla | Estado |
|---|---|
| Un comodín permitido por instructivo no genera advertencia por sí solo | Confirmada |
| Un comodín puede generar error si contradice una dependencia explícita | Confirmada |
| `98` no significa lo mismo en todas las variables; debe interpretarse por instructivo | Confirmada |
| `97` no significa lo mismo en todas las variables; debe interpretarse por instructivo | Confirmada |
| `99` no significa lo mismo en todas las variables; debe interpretarse por instructivo | Confirmada |

---

## 10. Reglas conocidas por bloque

### 10.1 V1-V16 — Identificación

| Campo | Detalle |
|---|---|
| Estado en APP | Cerrado |
| Estado en matriz | Pendiente de consolidación detallada |
| Archivo implementador | `src/validaciones/reglas/modulo1.js` |
| Observación | Consolidar contra instructivo oficial, matriz de variables y código existente |

---

### 10.2 V17-V24 — Diagnóstico inicial

| Campo | Detalle |
|---|---|
| Estado en APP | Cerrado |
| Estado en matriz | Pendiente de consolidación detallada |
| Archivo implementador | Pendiente de confirmar |
| Regla conocida | Si V21=7, entonces V22 debe estar en 1..6 o 99 |
| Regla conocida | Si V21=7, entonces V24 debe ser 1845-01-01 |
| Regla conocida | Si V21=7, entonces V27 debe ser 98 |
| Regla conocida | Si V21=7, entonces V28 debe ser 98 |
| Estado regla conocida | Confirmada por trazabilidad del proyecto |

---

### 10.3 V25-V28 — Confirmación, histología y diferenciación

| Campo | Detalle |
|---|---|
| Estado en APP | Cerrado |
| Estado en matriz | Pendiente de consolidación detallada |
| Archivo implementador | Pendiente de confirmar |
| Regla conocida V27 | Histología permite 1..21, 23, 24, 98, 99 |
| Regla conocida V27 | El valor 21 aplica sólo para pulmón |
| Regla conocida V28 | Diferenciación permite 1, 2, 3, 4, 94, 95, 98, 99 |
| Regla conocida V28 | Si V28=99 y V18 >= 2015-01-01, genera error |
| Estado regla conocida | Confirmada por trazabilidad del proyecto |

---

### 10.4 V29-V40 — Estadificación, riesgo y objetivo

| Campo | Detalle |
|---|---|
| Estado en APP | Cerrado |
| Estado en matriz | Pendiente de consolidación detallada |
| Archivo implementador | Pendiente de confirmar |
| Regla conocida V36 | Ann Arbor/Lugano aplica para C81, C82-C86 y C900 |
| Estado regla conocida | Confirmada por trazabilidad del proyecto |

---

### 10.5 V41-V44 — Intervención médica y antecedentes

| Campo | Detalle |
|---|---|
| Estado en APP | Cerrado |
| Estado en matriz | Pendiente de consolidación detallada |
| Archivo implementador | Pendiente de confirmar |
| Observación | Consolidar contra instructivo oficial, matriz de variables y código existente |

---

### 10.6 V45-V60 — Primer o único esquema sistémico

| Campo | Detalle |
|---|---|
| Estado en APP | Cerrado |
| Estado en matriz | Pendiente de consolidación detallada |
| Archivo implementador | Pendiente de confirmar |
| Regla conocida V45 | V45 permite 1 y 98 |
| Regla conocida V49 | Si V45=98, V49 debe ser 1845-01-01 |
| Regla conocida V53.1 | V53.1 no permite 97 |
| Regla conocida V53.2-V53.9 | V53.2 a V53.9 permiten 97 y 98 según instructivo y trazabilidad |
| Estado regla conocida | Confirmada por trazabilidad del proyecto |

---

### 10.7 V61-V77 — Último esquema sistémico

| Campo | Detalle |
|---|---|
| Estado en APP | Cerrado |
| Estado en matriz | Pendiente de consolidación detallada |
| Archivo implementador | Pendiente de confirmar |
| Regla conocida V61 | V61 permite 1, 2, 3, 11, 12, 13, 14, 97, 98 |
| Regla conocida V66 | Si V66=98, V66.1-V66.9 deben ser 98 |
| Regla conocida V66.1 | V66.1 no permite 97 |
| Estado regla conocida | Confirmada por trazabilidad del proyecto |

---

### 10.8 V78-V85 — Cirugía

| Campo | Detalle |
|---|---|
| Estado en APP | Cerrado |
| Estado en matriz | Pendiente de consolidación detallada |
| Archivo implementador | Pendiente de confirmar |
| Regla conocida V78 | V78 valida CUPS de primera cirugía en grupo cirugía |
| Regla conocida V74 | Si V74=1, no debe usarse 98 cuando la variable dependiente exige registro |
| Regla conocida V74 | Si V74=2, las variables dependientes deben usar 98 cuando el instructivo lo indique |
| Regla conocida V80 | V80 debe ser fecha AAAA-MM-DD o 1845-01-01 según aplique |
| Regla conocida V80 | Si V74=2 o V75=1, V80 debe ser 1845-01-01 |
| Regla conocida V80 | Si V74=1 y V75>1, V80 no debe ser 1845-01-01 |
| Regla conocida V80 | V80 no debe ser anterior a V76 |
| Regla conocida V81 | V81 permite 1, 2, 3, 5, 6, 98 |
| Estado regla conocida | Confirmada por trazabilidad del proyecto |

---

### 10.9 V86-V105 — Radioterapia

| Campo | Detalle |
|---|---|
| Estado en APP | Cerrado |
| Estado en matriz | Pendiente de consolidación detallada |
| Archivo implementador | `src/validaciones/reglas/modulo17.js` |
| Trazabilidad conocida | V86 -> V97 -> V98 -> V99 -> V100 -> V101 -> V102 -> V103 |
| Regla conocida V94 | V94 registra fecha de finalización del primer o único esquema de radioterapia |
| Regla conocida V94 | `1800-01-01` indica esquema de radioterapia que aún no finaliza |
| Regla conocida V94 | `1845-01-01` indica No Aplica |
| Regla conocida V94 | V94 no debe ser anterior a V88 |
| Regla conocida V95 | V95 permite 1, 2, 3, 98 |
| Regla conocida V95 | Si V94=1800-01-01, V95 debe ser 3 |
| Regla conocida V95 | Si V94 es fecha real, V95 no debe ser 3 |
| Regla conocida V95 | Si V86=98, V95 debe ser 98 |
| Regla conocida V96 | V96 permite 1..7 y 98 |
| Regla conocida V96 | Si V95=2, V96 debe estar en 1..7 |
| Regla conocida V96 | Si V95=1, 3 o 98, V96 debe ser 98 |
| Regla conocida V103 | Fecha de finalización del último esquema de radioterapia en el periodo |
| Regla conocida V103 | Permite fecha AAAA-MM-DD, `1800-01-01` si no finaliza y `1845-01-01` si no aplica |
| Estado regla conocida | Confirmada por trazabilidad del proyecto |

---

### 10.10 V106-V110 — Trasplante

| Campo | Detalle |
|---|---|
| Estado en APP | Cerrado |
| Estado en matriz | Pendiente de consolidación detallada |
| Archivo implementador | Pendiente de confirmar |
| Regla conocida V106 | V106 permite 1 y 98 |
| Regla conocida V108 | V108 corresponde a fecha de trasplante según instructivo |
| Regla conocida V110 | V110 valida código IPS/REPS de 12 dígitos cuando aplica |
| Regla conocida V110 | V110 permite 96 o 98 según aplique por instructivo |
| Estado regla conocida | Confirmada por trazabilidad del proyecto |

---

### 10.11 V111-V125 — Tratamiento complementario y tipo tratamiento a corte

| Campo | Detalle |
|---|---|
| Estado en APP | Cerrado |
| Estado en matriz | Pendiente de consolidación detallada |
| Archivo implementador | `src/validaciones/reglas/modulo19.js` |
| Versión cerrada | `sprint-3n-v125-tipo-tratamiento-corte-01` |
| Regla conocida V111 | V111 permite 1 y 98 |
| Regla conocida V111 | La opción 2 fue eliminada |
| Regla conocida V112 | V112 debe ser fecha AAAA-MM-DD o 1845-01-01 según V111 |
| Regla conocida V113 | V113 valida REPS de 12 dígitos o 98 según V111/V112 |
| Regla conocida V114 | V114 permite 1 y 2 |
| Regla conocida V114.1-V114.6 | Permiten 1 y 2; opción 3 eliminada |
| Regla conocida V115 | Fecha primera consulta/procedimiento de cuidado paliativo |
| Regla conocida V116 | Código IPS paliativo; REPS 12 dígitos o 98 No Aplica |
| Regla conocida V117 | Psiquiatría valorado |
| Regla conocida V118 | Fecha primera consulta psiquiatría; AAAA-MM-DD o 1845-01-01 |
| Regla conocida V119 | Código IPS psiquiatría; REPS 12 dígitos o 98 No Aplica |
| Regla conocida V120 | Nutrición permite 1, 2 y 98 |
| Regla conocida V121 | Fecha consulta inicial nutrición; AAAA-MM-DD o 1845-01-01 |
| Regla conocida V122 | Código IPS nutrición; REPS 12 dígitos o 98 No Aplica |
| Regla conocida V123 | Soporte nutricional permite 1, 2, 3 y 4 |
| Regla conocida V124 | Terapias complementarias permite 1, 2, 3, 5, 6, 7, 8 y 98 |
| Regla conocida V125 | Tipo de tratamiento a corte permite 1..11 y 98 |
| Regla conocida V125 | El valor 4 representa combinación 1 + 2 |
| Estado regla conocida | Confirmada por trazabilidad del proyecto |

---

### 10.12 V126-V134 — Resultado final, estado vital, novedades y cierre

| Campo | Detalle |
|---|---|
| Estado en APP | Cerrado |
| Estado en matriz | Pendiente de consolidación detallada |
| Archivo implementador | `src/validaciones/reglas/modulo20.js` |
| Versión cerrada | `sprint-3o-v134-fecha-corte-01` |
| Regla conocida V126 | Resultado final del manejo oncológico permite 1, 2, 3, 4, 5, 6, 7, 8, 97, 98 y 99 |
| Regla conocida V127 | Estado vital a la fecha de corte según instructivo |
| Regla conocida V128 | Novedad administrativa permite 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18 y 19 |
| Regla conocida V129 | Novedad clínica permite 1, 3, 8, 9, 10, 11 y 12 |
| Regla conocida V130 | Fecha de desafiliación; AAAA-MM-DD o 1845-01-01 |
| Regla conocida V131 | Fecha de muerte; AAAA-MM-DD o 1845-01-01 |
| Regla conocida V132 | Causa de muerte |
| Regla conocida V133 | Código único BDUA-BDEX-PVS |
| Regla conocida V134 | Fecha de corte |
| Regla conocida V134 | Para el periodo trabajado, la fecha esperada es 2025-01-01 |
| Estado regla conocida | Confirmada por cierre Sprint 3O |

---

## 11. Control de consolidación por bloques

| Orden | Bloque | Variables | Acción requerida | Estado |
|---:|---|---|---|---|
| 1 | Identificación | V1-V16 | Revisar instructivo, matriz de variables y módulo correspondiente | Pendiente |
| 2 | Diagnóstico inicial | V17-V24 | Consolidar reglas y trazabilidades conocidas | Pendiente |
| 3 | Confirmación / histología / diferenciación | V25-V28 | Consolidar catálogos y excepciones | Pendiente |
| 4 | Estadificación | V29-V40 | Consolidar reglas por diagnóstico aplicable | Pendiente |
| 5 | Intervención médica | V41-V44 | Consolidar catálogo y dependencias | Pendiente |
| 6 | Terapia sistémica inicial | V45-V60 | Consolidar inicio, fechas y medicamentos | Pendiente |
| 7 | Último esquema | V61-V77 | Consolidar medicamentos y cierre de esquema | Pendiente |
| 8 | Cirugía | V78-V85 | Consolidar CUPS, fechas y motivos | Pendiente |
| 9 | Radioterapia | V86-V105 | Consolidar trazabilidad completa de radioterapia | Pendiente |
| 10 | Trasplante | V106-V110 | Consolidar fecha, IPS y comodines | Pendiente |
| 11 | Tratamiento complementario | V111-V125 | Consolidar cuidado paliativo, psiquiatría, nutrición y tratamiento a corte | Pendiente |
| 12 | Cierre | V126-V134 | Consolidar resultado final, novedades, muerte, BDUA y fecha de corte | Pendiente |

---

## 12. Criterio para marcar una variable como consolidada

Una variable sólo puede marcarse como consolidada cuando tenga:

1. Nombre oficial.
2. Encabezado real/cortado.
3. Tipo de dato.
4. Formato esperado.
5. Catálogo permitido.
6. Comodines permitidos.
7. Dependencias.
8. Trazabilidad.
9. Reglas de error.
10. Reglas de advertencia.
11. Excepciones.
12. Código de hallazgo.
13. Archivo implementador.
14. Estado funcional.
15. Fuente de validación: instructivo, código, auditoría o prueba.

---

## 13. Estado actual de esta matriz

| Elemento | Estado |
|---|---|
| Archivo creado | Sí |
| Estructura documental completa | Sí |
| Reglas conocidas registradas | Parcial |
| Reglas V1-V134 completas variable por variable | No |
| Consolidación por bloques iniciada | Pendiente |
| Errores cerrados modificados | No |
| Advertencias modificadas | No |
| Próximo bloque recomendado | V1-V16 — Identificación |

---

## 14. Próximo paso recomendado

El siguiente paso es consolidar el primer bloque:

**V1-V16 — Identificación**

Para hacerlo correctamente se deben revisar:

- `docs/matriz_variables_cac_actualizada_v134.md`
- `src/validaciones/reglas/modulo1.js`
- `src/lector/estructura.js`
- `src/validaciones/engine.js`
- instructivo oficial de V1-V16, si hace falta confirmar regla
- auditoría o pruebas cerradas de Sprint 1, si existen

No se deben documentar reglas inventadas.

---

## 15. Nota de control

Este documento no está vacío ni inconcluso: queda creado como matriz oficial de reglas de negocio, con estructura completa, reglas generales, reglas conocidas por bloque y control de consolidación.

Lo que queda pendiente es la consolidación variable por variable, que debe hacerse de forma segura por bloques para evitar errores, duplicidades o reglas inventadas.
