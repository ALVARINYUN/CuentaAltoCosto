# Backlog del Proyecto — Validador CAC — Cáncer

**Proyecto:** Validador CAC — Cáncer
**Objetivo:** revisar archivos Excel del reporte CAC antes del envío, identificando errores, advertencias e inconsistencias.
**Tipo de proyecto:** aplicación local HTML/CSS/JavaScript.
**Estado funcional actual:** cerrado hasta **V134**.
**Fase actual:** documentación, ajuste de advertencias, auditoría global y mejora de experiencia de usuario.
**Siguiente variable:** ninguna.
**Regla principal:** los errores cerrados no se tocan.

---

## 1. Resumen ejecutivo

El Validador CAC — Cáncer ya cuenta con validación acumulativa funcional desde **V1 hasta V134**.

La etapa de construcción progresiva de variables está cerrada.
La fase actual no consiste en implementar nuevas variables, sino en estabilizar y mejorar el sistema:

* Limpiar documentación.
* Ajustar advertencias falsas.
* Mantener errores cerrados intactos.
* Revisar experiencia de usuario.
* Auditar exportador y resultados acumulativos.
* Preparar la APP para consulta de matriz funcional.

---

## 2. Estado actual del proyecto

| Concepto                        | Estado                                 |
| ------------------------------- | -------------------------------------- |
| Avance funcional                | V1-V134                                |
| Modo esperado                   | ACUMULATIVO_V1_V134                    |
| Variables reconocidas esperadas | 166                                    |
| Última variable cerrada         | V134                                   |
| Bloque de variables pendiente   | Ninguno                                |
| Fase activa                     | Ajuste de advertencias y documentación |
| Base real auditada              | Hoja 2025                              |
| Restricción principal           | No tocar errores cerrados              |

---

## 3. Reglas de trabajo

1. No inventar reglas.
2. Toda regla debe salir del instructivo oficial o de una trazabilidad confirmada.
3. Las variables cerradas no se modifican salvo bug real confirmado.
4. Los errores cerrados no se eliminan.
5. Los errores cerrados no se reclasifican.
6. Los errores cerrados no se suavizan.
7. La fase actual trabaja sólo advertencias.
8. Un valor permitido por instructivo no debe generar advertencia por sí solo.
9. Una advertencia puede mantenerse si exige soporte, catálogo, trazabilidad o revisión clínica.
10. La matriz funcional debe mantenerse como fuente documental central.
11. No duplicar la matriz completa en JavaScript.
12. No subir archivos de distribución, instaladores o compilación a Git.
13. Mantener documentación clara, práctica y alineada al estado real V134.

---

## 4. Backlog por épicas

### Épica 1 — Carga y lectura del Excel

**Objetivo:** permitir que el usuario cargue un archivo Excel CAC y seleccione la hoja de trabajo.

| Tarea                        | Estado  |
| ---------------------------- | ------- |
| Cargar archivo Excel         | Cerrado |
| Seleccionar hoja             | Cerrado |
| Leer encabezados             | Cerrado |
| Detectar registros           | Cerrado |
| Mantener procesamiento local | Cerrado |

---

### Épica 2 — Reconocimiento de estructura

**Objetivo:** reconocer variables simples, subvariables y encabezados reales/cortados.

| Tarea                          | Estado  |
| ------------------------------ | ------- |
| Reconocer V1-V134              | Cerrado |
| Reconocer subvariables         | Cerrado |
| Validar estructura acumulativa | Cerrado |
| Informar variables faltantes   | Cerrado |
| Ignorar columnas no necesarias | Cerrado |

---

### Épica 3 — Motor acumulativo de validación

**Objetivo:** ejecutar validaciones por módulos sin romper variables cerradas.

| Tarea                                   | Estado  |
| --------------------------------------- | ------- |
| Motor acumulativo                       | Cerrado |
| Integración de módulos V1-V134          | Cerrado |
| Consolidación de hallazgos por paciente | Cerrado |
| Conteo de errores y advertencias        | Cerrado |
| Compatibilidad con exportador           | Cerrado |

---

### Épica 4 — Validaciones clínicas V1-V134

**Objetivo:** validar todas las variables del reporte CAC según instructivo y trazabilidad.

| Bloque                       | Variables | Estado            |
| ---------------------------- | --------: | ----------------- |
| Identificación               |    V1-V16 | Cerrado funcional |
| Diagnóstico y estadificación |   V17-V44 | Cerrado funcional |
| Terapia sistémica            |   V45-V73 | Cerrado funcional |
| Cirugía                      |   V74-V85 | Cerrado funcional |
| Radioterapia                 |  V86-V105 | Cerrado funcional |
| Trasplante                   | V106-V110 | Cerrado funcional |
| Tratamiento complementario   | V111-V124 | Cerrado funcional |
| Situación final y cierre     | V125-V134 | Cerrado funcional |

---

### Épica 5 — Visualización de resultados

**Objetivo:** mostrar hallazgos de forma clara y útil para el analista.

| Tarea                      | Estado                    |
| -------------------------- | ------------------------- |
| Resumen general            | Cerrado                   |
| Pacientes procesados       | Cerrado                   |
| Pacientes con errores      | Cerrado                   |
| Pacientes con advertencias | Cerrado                   |
| Pacientes sin problemas    | Cerrado                   |
| Detalle por paciente       | Cerrado / mejora continua |
| Buscador por documento     | Cerrado / mejora continua |
| Redacción de mensajes      | Mejora continua           |

---

### Épica 6 — Exportador Excel

**Objetivo:** generar evidencia exportable con celdas marcadas.

| Tarea                           | Estado           |
| ------------------------------- | ---------------- |
| Exportar Excel                  | Cerrado          |
| Marcar errores en rojo          | Cerrado          |
| Marcar advertencias en amarillo | Cerrado          |
| Reconocer variables simples     | Cerrado          |
| Reconocer subvariables          | Cerrado          |
| Mantener estructura original    | Cerrado          |
| Auditar exportador con V1-V134  | Pendiente activo |

---

### Épica 7 — Documentación funcional

**Objetivo:** mantener documentos alineados al cierre V134.

| Documento                                      | Estado                                               |
| ---------------------------------------------- | ---------------------------------------------------- |
| `docs/USER_STORIES.md`                         | Actualizado a V134                                   |
| `docs/USE_CASES.md`                            | Actualizado a V134                                   |
| `docs/BACKLOG.md`                              | En actualización                                     |
| `docs/AUDITORIA_PROYECTO.md`                   | Creado / en actualización                            |
| `docs/matriz_variables_cac_actualizada_v86.md` | Actualizado a V134, aunque conserva nombre histórico |

---

### Épica 8 — Ajuste de advertencias

**Objetivo:** eliminar falsos positivos sin tocar errores.

| Tarea                                        | Estado           |
| -------------------------------------------- | ---------------- |
| Revisar advertencias actuales                | En curso         |
| Identificar falsos positivos                 | En curso         |
| Validar contra instructivo                   | En curso         |
| Eliminar advertencias por valores permitidos | Pendiente activo |
| Mantener advertencias justificadas           | Pendiente activo |
| Probar con base real                         | Pendiente activo |
| Confirmar que no se alteran errores          | Obligatorio      |

---

### Épica 9 — Experiencia de usuario

**Objetivo:** hacer la APP más clara para el usuario final.

| Tarea                              | Estado    |
| ---------------------------------- | --------- |
| Mejorar mensajes de hallazgos      | Pendiente |
| Mejorar navegación de resultados   | Pendiente |
| Mostrar o enlazar matriz funcional | Pendiente |
| Mejorar claridad del resumen       | Pendiente |
| Mantener aviso de privacidad       | Cerrado   |
| Evitar saturación visual           | Pendiente |

---

### Épica 10 — Control de versiones y limpieza del repositorio

**Objetivo:** mantener Git limpio y sin archivos innecesarios.

| Tarea                                  | Estado     |
| -------------------------------------- | ---------- |
| Actualizar `.gitignore`                | Cerrado    |
| Excluir `dist/`                        | Cerrado    |
| Excluir instaladores y compilados      | Cerrado    |
| Evitar archivos vacíos                 | Cerrado    |
| Subir sólo documentación y código útil | En control |

---

## 5. Sprints históricos cerrados

| Sprint / Módulo | Variables | Objetivo                                              | Estado  |
| --------------- | --------: | ----------------------------------------------------- | ------- |
| Sprint 1        |    V1-V16 | Identificación                                        | Cerrado |
| Sprint 2A       |   V17-V24 | Diagnóstico inicial                                   | Cerrado |
| Sprint 2B       |   V25-V28 | Confirmación, histología y diferenciación             | Cerrado |
| Sprint 2C       |       V29 | Primera estadificación                                | Cerrado |
| Sprint 2D       |   V30-V33 | Fechas y marcadores                                   | Cerrado |
| Sprint 2E       |   V34-V35 | Dukes                                                 | Cerrado |
| Sprint 3A       |   V36-V40 | Linfomas, mieloma y riesgo                            | Cerrado |
| Sprint 3B       |   V41-V44 | Intervención médica y antecedentes                    | Cerrado |
| Sprint 3C       |   V45-V47 | Inicio terapia sistémica                              | Cerrado |
| Sprint 3D       |   V48-V52 | Primer o único esquema                                | Cerrado |
| Sprint 3E       | V53-V53.9 | Medicamentos primer esquema                           | Cerrado |
| Sprint 3F       |   V54-V60 | Cierre primer esquema                                 | Cerrado |
| Sprint 3G       |   V61-V65 | Último esquema IPS                                    | Cerrado |
| Sprint 3H       | V66-V66.9 | Medicamentos último esquema                           | Cerrado |
| Sprint 3I       |   V67-V69 | Medicamentos adicionales último esquema               | Cerrado |
| Sprint 3J       |   V70-V77 | Cierre último esquema y transición cirugía            | Cerrado |
| Sprint 3K       |   V78-V85 | Cirugía                                               | Cerrado |
| Sprint 3L       |  V86-V105 | Radioterapia                                          | Cerrado |
| Sprint 3M       | V106-V110 | Trasplante                                            | Cerrado |
| Sprint 3N       | V111-V125 | Tratamiento complementario y tipo tratamiento a corte | Cerrado |
| Sprint 3O       | V126-V134 | Resultado final, estado vital, novedades y cierre     | Cerrado |

---

## 6. Sprints actuales de trabajo

A partir del cierre V134, los sprints ya no son de implementación de variables.
Los nuevos sprints son de estabilización, documentación y mejora.

| Sprint actual                       | Objetivo                                                     | Estado           |
| ----------------------------------- | ------------------------------------------------------------ | ---------------- |
| Sprint A — Limpieza documental V134 | Alinear backlog, historias, casos de uso, matriz y auditoría | En curso         |
| Sprint B — Ajuste de advertencias   | Eliminar falsos positivos sin tocar errores                  | Pendiente activo |
| Sprint C — Matriz funcional en APP  | Mostrar o enlazar la matriz V1-V134 desde la interfaz        | Pendiente        |
| Sprint D — Auditoría global V1-V134 | Revisar estructura, exportador, conteos y base real          | Pendiente        |
| Sprint E — Experiencia de usuario   | Mejorar mensajes, navegación y claridad visual               | Pendiente        |

---

## 7. Fase actual — Sprint A: Limpieza documental V134

**Objetivo:** que toda la documentación refleje el estado real del proyecto.

### Tareas

| Tarea                                                                 | Estado                             |
| --------------------------------------------------------------------- | ---------------------------------- |
| Actualizar historias de usuario a V134                                | Cerrado                            |
| Actualizar casos de uso a V134                                        | Cerrado                            |
| Actualizar matriz funcional a V134                                    | En curso / revisar contenido final |
| Actualizar backlog a V134                                             | En curso                           |
| Revisar documentos que digan V66, V86, V124 o V125 pendiente          | Pendiente activo                   |
| Confirmar que la documentación no diga que V126-V134 están pendientes | Pendiente activo                   |

### Criterio de cierre

El Sprint A se cierra cuando ningún documento principal contradiga el estado funcional real V1-V134.

---

## 8. Fase siguiente — Sprint B: Ajuste de advertencias

**Objetivo:** limpiar advertencias falsas en la APP.

### Regla obligatoria

Los errores no se tocan.

```text
No se eliminan errores.
No se reclasifican errores como advertencias.
No se suavizan errores.
No se modifica lógica de errores cerrados.
```

### Trabajo permitido

```text
Revisar advertencias.
Eliminar falsos positivos.
Ajustar redacción de advertencias.
Mantener advertencias justificadas.
Probar con base real o archivo controlado.
Documentar cada ajuste.
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

Estos valores sólo deben generar advertencia si contradicen una dependencia, fecha, catálogo o regla explícita del instructivo.

---

## 9. Pendientes activos

| Prioridad | Pendiente                                    | Estado           |
| --------- | -------------------------------------------- | ---------------- |
| Alta      | Terminar limpieza documental a V134          | En curso         |
| Alta      | Revisar advertencias falsas en APP           | Pendiente activo |
| Alta      | Mantener errores cerrados intactos           | Obligatorio      |
| Alta      | Confirmar que `dist/` no sube a Git          | Cerrado          |
| Media     | Mostrar o enlazar matriz funcional desde APP | Pendiente        |
| Media     | Auditar exportador con V1-V134               | Pendiente        |
| Media     | Revisar redacción de hallazgos               | Pendiente        |
| Media     | Auditar conteos de resumen                   | Pendiente        |
| Baja      | Renombrar matriz histórica de V86 a V134     | Opcional         |
| Baja      | Crear guía rápida para analistas             | Opcional         |

---

## 10. Pendientes opcionales

Estos puntos no bloquean la fase actual, pero pueden mejorar el proyecto:

1. Renombrar `matriz_variables_cac_actualizada_v86.md` a un nombre alineado con V134.
2. Crear una pantalla o sección de documentación dentro de la APP.
3. Crear una guía rápida para usuarios no técnicos.
4. Separar bitácora histórica del backlog operativo.
5. Crear un índice documental en `docs/README.md`.
6. Preparar checklist de auditoría final.

---

## 11. Deuda técnica controlada

| Deuda                                | Riesgo                          | Acción recomendada                   |
| ------------------------------------ | ------------------------------- | ------------------------------------ |
| Nombre histórico de matriz con V86   | Puede confundir                 | Renombrar o aclarar en documentación |
| Advertencias globales heredadas      | Puede saturar al usuario        | Revisar en Sprint B                  |
| Documentación dispersa               | Puede generar incoherencias     | Consolidar índice documental         |
| Exportador requiere auditoría global | Puede marcar celdas incorrectas | Probar con V1-V134                   |
| Mensajes técnicos largos             | Puede dificultar uso operativo  | Mejorar redacción                    |

---

## 12. Archivos principales del proyecto

### Código principal

```text
index.html
src/lector/estructura.js
src/lector/excel.js
src/validaciones/engine.js
src/exportador/excel-reporte.js
```

### Módulos de reglas

```text
src/validaciones/reglas/modulo1.js
src/validaciones/reglas/modulo2.js
src/validaciones/reglas/modulo3.js
src/validaciones/reglas/modulo4.js
src/validaciones/reglas/modulo5.js
src/validaciones/reglas/modulo6.js
src/validaciones/reglas/modulo7.js
src/validaciones/reglas/modulo8.js
src/validaciones/reglas/modulo9.js
src/validaciones/reglas/modulo10.js
src/validaciones/reglas/modulo11.js
src/validaciones/reglas/modulo12.js
src/validaciones/reglas/modulo13.js
src/validaciones/reglas/modulo14.js
src/validaciones/reglas/modulo15.js
src/validaciones/reglas/modulo16.js
src/validaciones/reglas/modulo17.js
src/validaciones/reglas/modulo18.js
src/validaciones/reglas/modulo19.js
src/validaciones/reglas/modulo20.js
```

### Catálogos

```text
src/catalogos/cie10.js
src/catalogos/cups.js
src/catalogos/atc.js
src/catalogos/cargador.js
```

### Documentación

```text
docs/BACKLOG.md
docs/USER_STORIES.md
docs/USE_CASES.md
docs/AUDITORIA_PROYECTO.md
docs/matriz_variables_cac_actualizada_v86.md
```

---

## 13. Reglas de Git y limpieza del repositorio

No se deben subir archivos de compilación, instaladores ni dependencias.

Deben quedar ignorados:

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

---

## 14. Criterios para cerrar la fase actual

La fase actual se puede cerrar cuando:

1. La documentación principal esté alineada a V134.
2. El backlog no diga que hay variables pendientes.
3. Las historias de usuario estén alineadas a V134.
4. Los casos de uso estén alineados a V134.
5. La matriz funcional esté completa V1-V134.
6. La APP no genere advertencias falsas por comodines permitidos.
7. Los errores cerrados sigan intactos.
8. El exportador haya sido auditado con V1-V134.
9. `dist/` y archivos de distribución estén fuera de Git.
10. El estado del repositorio quede limpio después del push.

---

## 15. Próximo paso recomendado

Continuar con el siguiente orden:

```text
1. Terminar Sprint A — Limpieza documental V134.
2. Revisar que todos los documentos queden alineados.
3. Iniciar Sprint B — Ajuste de advertencias.
4. Auditar advertencias contra instructivo oficial.
5. Probar base real V1-V134.
6. Revisar exportador.
7. Implementar visualización o enlace de matriz funcional en APP.
```

---

## 16. Estado final del backlog

| Concepto                | Estado                              |
| ----------------------- | ----------------------------------- |
| Avance funcional actual | V1-V134                             |
| Variables pendientes    | Ninguna                             |
| Fase activa             | Sprint A — Limpieza documental V134 |
| Siguiente sprint        | Sprint B — Ajuste de advertencias   |
| Restricción principal   | No tocar errores cerrados           |
| Matriz funcional        | V1-V134                             |
| Documentación           | En actualización                    |
| Exportador              | Cerrado, pendiente auditoría global |
| Repositorio             | Limpio, con `dist/` ignorado        |
