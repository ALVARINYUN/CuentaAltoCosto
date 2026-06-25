# Backlog del Proyecto — Validador CAC — Cáncer

**Proyecto:** Validador CAC — Cáncer
**Tipo de producto:** aplicación local HTML/CSS/JavaScript para validar archivos Excel del reporte CAC.
**Metodología:** trabajo híbrido por sprints, con cierre funcional por variable o bloque.
**Herramientas:** Markdown en `docs/`, Git/GitHub y pruebas locales en navegador.
**Estado funcional actual:** cerrado hasta **V134**.
**Fase actual:** Sprint 4A — Limpieza documental V134.
**Siguiente variable:** ninguna.
**Regla principal:** los errores cerrados no se tocan.

---

## 1. Resumen ejecutivo

El Validador CAC — Cáncer ya cuenta con validación acumulativa funcional desde **V1 hasta V134**.

La etapa de construcción progresiva de variables está cerrada.

A partir de este punto, el trabajo se organiza en sprints de estabilización, documentación, ajuste de advertencias, auditoría global y mejora de experiencia de usuario.

El backlog ya no debe usarse para listar reglas completas variable por variable.

Las reglas detalladas deben vivir en una matriz funcional o matriz de reglas de negocio.

El backlog debe servir para gestionar:

* Qué está cerrado.
* Qué está en curso.
* Qué falta.
* Qué sprint se está trabajando.
* Qué prioridad tiene cada pendiente.
* Qué criterio permite cerrar cada tarea.

---

## 2. Estado actual del proyecto

| Concepto                        | Estado                                    |
| ------------------------------- | ----------------------------------------- |
| Avance funcional                | V1-V134                                   |
| Última variable cerrada         | V134                                      |
| Modo esperado                   | ACUMULATIVO_V1_V134                       |
| Variables reconocidas esperadas | 166                                       |
| Base real auditada              | Hoja 2025                                 |
| Filas base real                 | 275                                       |
| Variables faltantes             | Ninguna                                   |
| Fase activa                     | Sprint 4A — Limpieza documental V134      |
| Siguiente sprint                | Sprint 4B — Ajuste de advertencias en APP |
| Restricción principal           | No tocar errores cerrados                 |

Ya no debe tratarse el proyecto como cerrado en V66, V86, V124 o V125.

Tampoco debe aparecer V125 como siguiente variable ni V126-V134 como pendientes de implementación.

---

## 3. Jerarquía del backlog

La estructura de trabajo del proyecto queda organizada así:

```text
Visión del producto
└── Fases del producto
    └── Sprints
        └── Historias / entregables
            └── Tareas técnicas
                └── Subtareas / verificaciones
```

### 3.1 Visión del producto

Crear una aplicación local que permita validar archivos Excel del reporte CAC de cáncer antes del envío, mostrando errores, advertencias y evidencia exportable.

**Responsable:** Product Owner / usuario principal.

---

### 3.2 Fases del producto

| Fase   | Descripción                      | Estado           |
| ------ | -------------------------------- | ---------------- |
| Fase 1 | Construcción progresiva V1-V134  | Cerrada          |
| Fase 2 | Limpieza documental              | En curso         |
| Fase 3 | Ajuste de advertencias           | Pendiente activo |
| Fase 4 | Auditoría global V1-V134         | Pendiente        |
| Fase 5 | Mejora de experiencia de usuario | Pendiente        |
| Fase 6 | Empaquetado / distribución local | Opcional         |

---

### 3.3 Sprints

Los sprints son la unidad principal de trabajo del proyecto.

Hasta V134 se trabajó por sprints de implementación de variables.

Desde V134 en adelante se trabajará por sprints de estabilización, documentación, ajuste de advertencias, auditoría y mejora.

---

### 3.4 Historias / entregables

Las historias o entregables describen una necesidad funcional o documental concreta.

Ejemplo:

```text
HU-041 — Como analista, quiero que la APP no muestre advertencias falsas por valores permitidos, para revisar sólo hallazgos útiles.
```

---

### 3.5 Tareas técnicas

Las tareas técnicas indican lo que se debe modificar, revisar o probar.

Ejemplo:

```text
Revisar advertencias de V1-V44.
Probar base real hoja 2025.
Confirmar que los errores cerrados no cambian.
```

---

### 3.6 Subtareas / verificaciones

Las subtareas son pasos pequeños de validación.

Ejemplo:

```text
Verificar consola.
Validar exportador.
Comparar conteos antes/después.
Actualizar documentación.
Hacer commit y push.
```

---

## 4. Campos por item del backlog

Cada item del backlog debe tener campos mínimos para evitar ambigüedad.

### 4.1 Campos obligatorios

| Campo                  | Uso                                                   |
| ---------------------- | ----------------------------------------------------- |
| ID                     | Identificador único del item                          |
| Sprint                 | Sprint al que pertenece                               |
| Título                 | Nombre corto de la tarea                              |
| Descripción            | Qué se necesita hacer                                 |
| Prioridad              | Alta, Media, Baja u Opcional                          |
| Estado                 | Situación actual del item                             |
| Tipo                   | Documentación, ajuste, auditoría, UX, exportador, Git |
| Criterio de aceptación | Condición para cerrar el item                         |
| Archivos relacionados  | Archivos que podrían tocarse                          |
| Evidencia esperada     | Cómo se demuestra que quedó listo                     |

### 4.2 Campos opcionales

| Campo              | Uso                            |
| ------------------ | ------------------------------ |
| Responsable        | Quién ejecuta o valida         |
| Estimación         | Tamaño aproximado del esfuerzo |
| Dependencias       | Qué debe estar listo antes     |
| Riesgo             | Posible impacto si se hace mal |
| Fecha de cierre    | Cuándo se cerró                |
| Commit relacionado | Commit donde quedó aplicado    |
| Nota de auditoría  | Evidencia adicional            |

---

## 5. Estados del backlog

Los estados válidos son:

| Estado              | Significado                                                 |
| ------------------- | ----------------------------------------------------------- |
| Pendiente           | Existe, pero no se ha trabajado                             |
| En refinamiento     | Se está aclarando alcance o criterio                        |
| Listo para trabajar | Ya tiene definición suficiente                              |
| En progreso         | Se está ejecutando                                          |
| En prueba           | Está implementado o actualizado y falta validar             |
| Cerrado             | Cumplió criterio de aceptación                              |
| Bloqueado           | No puede avanzar por falta de archivo, decisión o evidencia |
| Opcional            | No bloquea la fase actual                                   |

---

## 6. Priorización

Para este proyecto se usará una priorización simple tipo MoSCoW adaptada.

| Prioridad | Equivalente | Uso                                      |
| --------- | ----------- | ---------------------------------------- |
| Alta      | Must Have   | Obligatorio para cerrar fase             |
| Media     | Should Have | Importante, pero no bloquea de inmediato |
| Baja      | Could Have  | Deseable                                 |
| Opcional  | Won't Now   | No se trabaja todavía                    |

### 6.1 Criterios de prioridad

Prioridad alta:

* Corregir documentación desactualizada.
* Eliminar contradicciones de estado.
* Evitar tocar errores cerrados.
* Revisar advertencias falsas.
* Probar base real.
* Confirmar que Git no sube archivos innecesarios.

Prioridad media:

* Mejorar redacción de hallazgos.
* Mostrar o enlazar matriz funcional en la APP.
* Auditar exportador completo.
* Crear índice documental.

Prioridad baja u opcional:

* Renombrar archivos históricos.
* Crear guía rápida para analistas.
* Preparar empaquetado final.
* Mejoras visuales no críticas.

---

## 7. Dónde vive cada cosa

### 7.1 `docs/BACKLOG.md`

Debe contener:

* Estado actual del trabajo.
* Sprints históricos y actuales.
* Pendientes activos.
* Prioridad.
* Estado.
* Criterios de aceptación.
* Archivos relacionados.
* Próximo paso.

No debe contener:

* Reglas completas variable por variable.
* Bitácora extensa.
* Código.
* Instructivo completo.
* Evidencia larga de pruebas.

---

### 7.2 `docs/USER_STORIES.md`

Debe contener:

* Historias de usuario.
* Necesidad funcional.
* Valor para el usuario.
* Criterios de aceptación generales.

---

### 7.3 `docs/USE_CASES.md`

Debe contener:

* Actores.
* Precondiciones.
* Flujo principal.
* Flujo alterno.
* Resultado esperado.
* Excepciones.

---

### 7.4 `docs/matriz_variables_cac_actualizada_v86.md`

Este archivo puede existir como documento histórico de matriz.

Aunque conserva nombre con V86, debe revisarse antes de asumir que está completo hasta V134.

Debe verificarse si contiene:

* Variables V1-V134.
* Tipo de dato.
* Catálogo.
* Comodines permitidos.
* Dependencias.
* Reglas de validación.
* Errores.
* Advertencias.
* Trazabilidad.

Renombrarlo es opcional y sólo debe hacerse si no rompe referencias existentes.

---

### 7.5 `docs/MATRIZ_REGLAS_NEGOCIO_V1_V134.md`

Este documento es recomendado para consolidar reglas de negocio V1-V134.

No debe asumirse que ya existe.

Antes de crearlo o consolidarlo, se debe verificar el contenido real de `docs/`.

Comandos recomendados:

```powershell
Get-ChildItem docs

Test-Path docs\matriz_variables_cac_actualizada_v86.md
Test-Path docs\MATRIZ_REGLAS_NEGOCIO_V1_V134.md
```

---

### 7.6 `docs/AUDITORIA_PROYECTO.md`

Debe contener:

* Evidencias de prueba.
* Resultados de base real.
* Conteos.
* Versiones cerradas.
* Hallazgos confirmados.
* Decisiones técnicas importantes.

---

### 7.7 Código fuente

Debe contener la implementación real:

```text
index.html
src/lector/estructura.js
src/lector/excel.js
src/validaciones/engine.js
src/validaciones/reglas/
src/exportador/excel-reporte.js
src/catalogos/
```

---

## 8. Roles y responsabilidades

| Rol                               | Responsabilidad                                       |
| --------------------------------- | ----------------------------------------------------- |
| Product Owner / usuario principal | Priorizar, validar reglas, aprobar cierres            |
| Asistente técnico / desarrollador | Proponer estructura, implementar, documentar y probar |
| Auditor funcional                 | Revisar Excel real, pantalla, consola y exportador    |
| Usuario final / analista          | Usar la APP y corregir el Excel con base en hallazgos |

En este proyecto, el Product Owner y auditor funcional pueden ser la misma persona.

---

## 9. Reglas de trabajo obligatorias

1. No inventar reglas.
2. Toda regla debe estar soportada por instructivo oficial o trazabilidad confirmada.
3. Las variables cerradas no se modifican salvo bug real confirmado.
4. Los errores cerrados no se tocan.
5. No se eliminan errores cerrados.
6. No se reclasifican errores cerrados.
7. No se suavizan errores cerrados.
8. La fase de advertencias trabaja sólo advertencias; los errores cerrados no se tocan.
9. Un valor permitido por instructivo no debe generar advertencia por sí solo.
10. Una advertencia puede mantenerse si exige soporte, catálogo, trazabilidad o revisión clínica.
11. No se debe duplicar la matriz funcional completa en JavaScript.
12. No se deben subir archivos de distribución a Git.
13. Cada sprint debe tener criterio de cierre.

---

## 10. Sprints históricos cerrados

| Sprint / Módulo | Variables | Objetivo                                              | Estado  |
| --------------- | --------: | ----------------------------------------------------- | ------- |
| Sprint 1        |    V1-V16 | Identificación                                        | Cerrado |
| Sprint 2A       |   V17-V24 | Diagnóstico inicial                                   | Cerrado |
| Sprint 2B       |   V25-V28 | Confirmación, histología y diferenciación             | Cerrado |
| Sprint 2C       |       V29 | Primera estadificación                                | Cerrado |
| Sprint 2D       |   V30-V33 | Fechas y variables complementarias                    | Cerrado |
| Sprint 2E       |   V34-V35 | Dukes colorrectal                                     | Cerrado |
| Sprint 3A       |   V36-V40 | Estadificación, riesgo y objetivo de tratamiento      | Cerrado |
| Sprint 3B       |   V41-V44 | Intervención médica y antecedentes                    | Cerrado |
| Sprint 3C       |   V45-V47 | Inicio de terapia sistémica                           | Cerrado |
| Sprint 3D       |   V48-V52 | Primer o único esquema                                | Cerrado |
| Sprint 3E       | V53-V53.9 | Medicamentos primer o único esquema                   | Cerrado |
| Sprint 3F       |   V54-V60 | Cierre y complementos primer esquema                  | Cerrado |
| Sprint 3G       |   V61-V65 | IPS último esquema sistémico                          | Cerrado |
| Sprint 3H       | V66-V66.9 | Medicamentos último esquema                           | Cerrado |
| Sprint 3I       |   V67-V69 | Medicamentos adicionales último esquema               | Cerrado |
| Sprint 3J       |   V70-V77 | Cierre último esquema y transición a cirugía          | Cerrado |
| Sprint 3K       |   V78-V85 | Cirugía                                               | Cerrado |
| Sprint 3L       |  V86-V105 | Radioterapia                                          | Cerrado |
| Sprint 3M       | V106-V110 | Trasplante                                            | Cerrado |
| Sprint 3N       | V111-V125 | Tratamiento complementario y tipo tratamiento a corte | Cerrado |
| Sprint 3O       | V126-V134 | Resultado final, estado vital, novedades y cierre     | Cerrado |

---

## 11. Sprints actuales de trabajo

A partir del cierre de V134, los sprints ya no son de implementación de variables.

Ahora son sprints de estabilización, documentación, auditoría y mejora.

| Sprint                                       | Objetivo                                            | Estado           |
| -------------------------------------------- | --------------------------------------------------- | ---------------- |
| Sprint 4A — Limpieza documental V134         | Alinear documentación al cierre V1-V134             | En curso         |
| Sprint 4B — Ajuste de advertencias en APP    | Eliminar falsos positivos sin tocar errores         | Pendiente activo |
| Sprint 4C — Matriz funcional visible en APP  | Mostrar o enlazar matriz desde la interfaz          | Pendiente        |
| Sprint 4D — Auditoría global V1-V134         | Revisar estructura, conteos, exportador y base real | Pendiente        |
| Sprint 4E — Mejora de experiencia de usuario | Mejorar mensajes, navegación y claridad visual      | Pendiente        |
| Sprint 4F — Empaquetado / distribución local | Revisar build local e instalador si aplica          | Opcional         |

---

## 12. Sprint 4A — Limpieza documental V134

**Objetivo:** asegurar que toda la documentación refleje el estado real V1-V134.

| ID       | Item                                                                                 | Prioridad | Estado    | Criterio de aceptación                                                                                 |
| -------- | ------------------------------------------------------------------------------------ | --------- | --------- | ------------------------------------------------------------------------------------------------------ |
| SP4A-001 | Actualizar `USER_STORIES.md` a V134                                                  | Alta      | Cerrado   | El documento no indica variables pendientes                                                            |
| SP4A-002 | Actualizar `USE_CASES.md` a V134                                                     | Alta      | Cerrado   | Los casos cubren V1-V134                                                                               |
| SP4A-003 | Actualizar `BACKLOG.md` a V134                                                       | Alta      | Cerrado   | El backlog muestra el estado V1-V134 y los sprints actuales 4A-4F                                      |
| SP4A-004 | Crear o consolidar matriz de reglas de negocio V1-V134                               | Alta      | Pendiente | Se verifica primero qué matriz existe en `docs/` y luego se consolida sin asumir archivos inexistentes |
| SP4A-005 | Revisar referencias antiguas a V66, V86, V124 o V125 pendiente                       | Alta      | Pendiente | No quedan documentos principales con estado desactualizado                                             |
| SP4A-006 | Confirmar que documentación diferencia backlog, matriz, casos, historias y auditoría | Media     | Pendiente | Cada documento tiene propósito claro                                                                   |
| SP4A-007 | Subir cambios documentales a GitHub                                                  | Alta      | Pendiente | Push realizado sin `dist/` ni archivos innecesarios                                                    |

### Criterio de cierre del Sprint 4A

El Sprint 4A se cierra cuando:

* `BACKLOG.md` está alineado a V134.
* `USER_STORIES.md` está alineado a V134.
* `USE_CASES.md` está alineado a V134.
* `AUDITORIA_PROYECTO.md` es coherente con el cierre V134.
* La matriz funcional queda verificada o queda como pendiente claro de consolidación.
* No hay documentos principales diciendo que V125 o V126-V134 están pendientes.
* El repositorio queda limpio después del push.

---

## 13. Sprint 4B — Ajuste de advertencias en APP

**Objetivo:** eliminar falsos positivos de advertencias sin tocar errores cerrados.

| ID       | Item                                               | Prioridad | Estado    | Criterio de aceptación                              |
| -------- | -------------------------------------------------- | --------- | --------- | --------------------------------------------------- |
| SP4B-001 | Levantar listado de advertencias actuales          | Alta      | Pendiente | Existe listado por código, variable y mensaje       |
| SP4B-002 | Clasificar advertencias válidas y falsos positivos | Alta      | Pendiente | Cada advertencia queda clasificada                  |
| SP4B-003 | Revisar advertencias V1-V44                        | Alta      | Pendiente | No quedan falsos positivos por comodines permitidos |
| SP4B-004 | Revisar advertencias V45-V73                       | Alta      | Pendiente | Advertencias justificadas o eliminadas              |
| SP4B-005 | Revisar advertencias V74-V85                       | Alta      | Pendiente | Errores de cirugía permanecen intactos              |
| SP4B-006 | Revisar advertencias V86-V105                      | Alta      | Pendiente | Advertencias de radioterapia quedan justificadas    |
| SP4B-007 | Revisar advertencias V106-V134                     | Alta      | Pendiente | Advertencias finales quedan justificadas            |
| SP4B-008 | Probar base real hoja 2025                         | Alta      | Pendiente | Conteos comparados antes/después                    |
| SP4B-009 | Confirmar que errores cerrados no cambiaron        | Alta      | Pendiente | Misma lógica de errores antes/después               |
| SP4B-010 | Documentar ajustes aplicados                       | Media     | Pendiente | Cada ajuste queda registrado en auditoría           |

### Regla obligatoria del Sprint 4B

```text
Los errores NO se tocan.
No se eliminan.
No se reclasifican.
No se suavizan.
No se modifican durante esta fase.
```

### Valores que no deben advertirse por sí solos

```text
98
97
99
96
1800-01-01
1845-01-01
9998
9999
NONE
NOAP
0
```

Estos valores sólo deben generar advertencia si contradicen una dependencia, una fecha, un catálogo o una regla explícita del instructivo.

---

## 14. Sprint 4C — Matriz funcional visible en APP

**Objetivo:** facilitar la consulta de la matriz funcional desde la interfaz, sin duplicar innecesariamente reglas completas dentro del código JavaScript.

| ID       | Item                                                           | Prioridad | Estado    | Criterio de aceptación                              |
| -------- | -------------------------------------------------------------- | --------- | --------- | --------------------------------------------------- |
| SP4C-001 | Verificar si existe matriz funcional o matriz de reglas        | Alta      | Pendiente | Se confirma qué archivos existen en `docs/`         |
| SP4C-002 | Crear o consolidar documento de matriz V1-V134                 | Alta      | Pendiente | Matriz consolidada sin asumir archivos inexistentes |
| SP4C-003 | Decidir si la matriz se enlaza o se visualiza dentro de la APP | Media     | Pendiente | Decisión documentada                                |
| SP4C-004 | Agregar acceso visual a matriz funcional                       | Media     | Pendiente | El usuario puede abrir la matriz desde la APP       |
| SP4C-005 | Evitar duplicar matriz completa en JS                          | Alta      | Pendiente | La matriz sigue como documento fuente               |
| SP4C-006 | Revisar nombre del archivo de matriz                           | Baja      | Opcional  | Se mantiene aclaración o se renombra a V134         |
| SP4C-007 | Probar acceso local a documentación                            | Media     | Pendiente | El enlace funciona en servidor local                |

Campos recomendados para la matriz:

```text
Variable
Nombre oficial
Encabezado real/cortado
Tipo de dato
Formato
Catálogo permitido
Comodines permitidos
Dependencias
Trazabilidad
Reglas de error
Reglas de advertencia
Excepciones
Severidad
Código de hallazgo
Archivo donde se implementa
Estado
```

---

## 15. Sprint 4D — Auditoría global V1-V134

**Objetivo:** confirmar que el validador funciona de punta a punta con estructura completa.

| ID       | Item                             | Prioridad | Estado    | Criterio de aceptación                                 |
| -------- | -------------------------------- | --------- | --------- | ------------------------------------------------------ |
| SP4D-001 | Auditar estructura V1-V134       | Alta      | Pendiente | Total reconocidas esperado: 166                        |
| SP4D-002 | Auditar base real hoja 2025      | Alta      | Pendiente | Estructura OK y variables faltantes vacías             |
| SP4D-003 | Auditar exportador Excel         | Alta      | Pendiente | Errores y advertencias se marcan en columnas correctas |
| SP4D-004 | Revisar conteos de resumen       | Media     | Pendiente | Conteos coinciden con hallazgos                        |
| SP4D-005 | Revisar búsqueda por documento   | Media     | Pendiente | El buscador filtra correctamente                       |
| SP4D-006 | Registrar evidencia en auditoría | Alta      | Pendiente | Evidencia queda en `AUDITORIA_PROYECTO.md`             |

---

## 16. Sprint 4E — Mejora de experiencia de usuario

**Objetivo:** mejorar claridad, navegación y utilidad operativa de la APP.

| ID       | Item                                | Prioridad | Estado    | Criterio de aceptación                                        |
| -------- | ----------------------------------- | --------- | --------- | ------------------------------------------------------------- |
| SP4E-001 | Mejorar redacción de hallazgos      | Media     | Pendiente | Mensajes claros para usuario no técnico                       |
| SP4E-002 | Revisar resumen visual              | Media     | Pendiente | El usuario entiende errores, advertencias y registros limpios |
| SP4E-003 | Mejorar navegación entre resultados | Media     | Pendiente | Se reduce esfuerzo para revisar pacientes                     |
| SP4E-004 | Mantener aviso de privacidad        | Alta      | Cerrado   | La APP conserva enfoque local                                 |
| SP4E-005 | Evitar saturación visual            | Media     | Pendiente | La interfaz no abruma al usuario                              |

---

## 17. Sprint 4F — Empaquetado / distribución local

**Objetivo:** preparar una versión distribuible si se decide usar instalación local.

| ID       | Item                                   | Prioridad | Estado   | Criterio de aceptación                     |
| -------- | -------------------------------------- | --------- | -------- | ------------------------------------------ |
| SP4F-001 | Revisar necesidad real de empaquetado  | Baja      | Opcional | Decisión documentada                       |
| SP4F-002 | Confirmar que `dist/` no se sube a Git | Alta      | Cerrado  | `.gitignore` ignora `dist/`                |
| SP4F-003 | Revisar instalador local               | Baja      | Opcional | Instalador probado si se decide distribuir |
| SP4F-004 | Documentar pasos de instalación        | Baja      | Opcional | Guía clara para usuario final              |

---

## 18. Pendientes activos consolidados

| Prioridad | Pendiente                                                 | Sprint | Estado    |
| --------- | --------------------------------------------------------- | ------ | --------- |
| Alta      | Crear o consolidar matriz de reglas de negocio V1-V134    | 4A/4C  | Pendiente |
| Alta      | Buscar referencias antiguas a V66/V86/V124/V125 pendiente | 4A     | Pendiente |
| Alta      | Confirmar separación documental                           | 4A     | Pendiente |
| Alta      | Subir cambios documentales a GitHub                       | 4A     | Pendiente |
| Alta      | Levantar advertencias actuales                            | 4B     | Pendiente |
| Alta      | Eliminar falsos positivos de advertencias                 | 4B     | Pendiente |
| Alta      | Confirmar que errores no cambian                          | 4B     | Pendiente |
| Media     | Mostrar o enlazar matriz desde APP                        | 4C     | Pendiente |
| Alta      | Auditar exportador V1-V134                                | 4D     | Pendiente |
| Media     | Mejorar redacción de hallazgos                            | 4E     | Pendiente |
| Baja      | Renombrar matriz histórica de V86 a V134                  | 4C     | Opcional  |

---

## 19. Deuda técnica controlada

| Deuda                                          | Riesgo                          | Acción recomendada                   |
| ---------------------------------------------- | ------------------------------- | ------------------------------------ |
| Archivo de matriz puede conservar nombre V86   | Puede confundir                 | Revisar, aclarar o renombrar         |
| Advertencias heredadas de variables anteriores | Puede saturar al usuario        | Revisar en Sprint 4B                 |
| Exportador requiere auditoría global           | Puede marcar celdas incorrectas | Auditar en Sprint 4D                 |
| Documentación dispersa                         | Puede generar incoherencias     | Crear índice documental si se decide |
| Mensajes muy técnicos                          | Puede dificultar uso operativo  | Mejorar en Sprint 4E                 |

---

## 20. Reglas de Git y repositorio

No subir archivos de compilación, dependencias ni instaladores.

Deben permanecer ignorados:

```text
dist/
dist/**
node_modules/
*.exe
*.msi
*.dmg
*.AppImage
*.blockmap
latest.yml
builder-debug.yml
builder-effective-config.yaml
```

Antes de hacer commit:

```powershell
git status --short
```

Sólo deben aparecer archivos útiles del proyecto.

Comandos recomendados para cerrar esta actualización documental:

```powershell
git add docs/BACKLOG.md
git status
git commit -m "Actualizar backlog operativo del validador a V134"
git push
```

---

## 21. Criterios para cerrar la fase actual

La fase actual es:

```text
Sprint 4A — Limpieza documental V134
```

El Sprint 4A puede cerrarse cuando:

1. `BACKLOG.md` esté alineado a V134.
2. `USER_STORIES.md` esté alineado a V134.
3. `USE_CASES.md` esté alineado a V134.
4. `AUDITORIA_PROYECTO.md` sea coherente con el cierre V134.
5. La matriz funcional esté verificada o quede registrada como pendiente claro de consolidación.
6. El backlog no indique variables pendientes.
7. No haya documentos principales diciendo que V125 o V126-V134 están pendientes.
8. Esté confirmada la separación entre backlog, matriz, casos de uso, historias y auditoría.
9. Los cambios documentales estén subidos a GitHub.
10. El repositorio quede limpio después del push.

No hacen parte del cierre de Sprint 4A:

* Ajustar advertencias.
* Cambiar código de validación.
* Auditar exportador completo.
* Modificar reglas de errores.
* Cambiar lógica de variables cerradas.

Esos puntos corresponden a sprints posteriores.

---

## 22. Próximo paso recomendado

Continuar en este orden:

```text
1. Guardar este BACKLOG.md corregido.
2. Ejecutar git status.
3. Confirmar que sólo aparecen cambios documentales esperados.
4. Hacer commit y push.
5. Verificar qué matrices existen realmente en docs/.
6. Definir si se crea o consolida MATRIZ_REGLAS_NEGOCIO_V1_V134.md.
7. Cerrar Sprint 4A cuando la documentación principal quede coherente.
8. Iniciar Sprint 4B — Ajuste de advertencias en APP.
```

Comandos para verificar matriz:

```powershell
Get-ChildItem docs

Test-Path docs\matriz_variables_cac_actualizada_v86.md
Test-Path docs\MATRIZ_REGLAS_NEGOCIO_V1_V134.md
```

---

## 23. Estado final del backlog

| Concepto                | Estado                                          |
| ----------------------- | ----------------------------------------------- |
| Avance funcional actual | V1-V134                                         |
| Variables pendientes    | Ninguna                                         |
| Fase activa             | Sprint 4A — Limpieza documental V134            |
| Siguiente sprint        | Sprint 4B — Ajuste de advertencias en APP       |
| Restricción principal   | No tocar errores cerrados                       |
| Matriz funcional        | Pendiente de verificación/consolidación V1-V134 |
| Documentación           | En actualización documental                     |
| Exportador              | Cerrado, pendiente auditoría global             |
| Repositorio             | Limpio, con `dist/` ignorado                    |

Este backlog reemplaza versiones anteriores que mezclaban bitácora, reglas técnicas, pendientes viejos y estado de variables.
