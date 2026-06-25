# Backlog del Proyecto — Validador CAC — Cáncer

**Proyecto:** Validador CAC — Cáncer
**Objetivo:** revisar archivos Excel de la Cuenta de Alto Costo antes del reporte final, identificando errores, advertencias e inconsistencias.
**Metodología:** desarrollo progresivo por sprints y cierre funcional por variable.
**Estado actual:** avance funcional cerrado hasta **V134**.
**Siguiente variable:** ninguna.
**Fase actual:** ajuste de advertencias en APP, documentación y auditoría global.
**Módulo final cerrado:** **Módulo 20 — Resultado final, estado vital, novedades, fechas y cierre del reporte**.
**Regla principal de trabajo:** los errores cerrados no se tocan; la fase actual trabaja sólo advertencias.

---

## 1. Flujo de trabajo por variable

1. Revisión del instructivo oficial.
2. Confirmación de encabezado real/cortado.
3. Identificación de reglas de negocio.
4. Definición de trazabilidad con otras variables.
5. Implementación en el módulo correspondiente.
6. Generación de Excel de prueba limpio.
7. Validación en pantalla y consola.
8. Revisión del exportador.
9. Auditoría con base real cuando aplique.
10. Cierre funcional.
11. Actualización de documentación.
12. Commit y push controlado a Git.

---

## 2. Reglas de trabajo

* No implementar reglas no soportadas por el instructivo.
* No inventar reglas.
* Antes de iniciar una variable nueva, confirmar encabezado real/cortado.
* Mantener trazabilidad clara en cada regla cruzada.
* Mantener avance acumulativo.
* Las variables cerradas no se modifican salvo bug real confirmado.
* Los errores cerrados no se modifican, no se eliminan, no se reclasifican y no se suavizan.
* La fase actual trabaja sólo advertencias.
* Un comodín permitido por instructivo no debe generar advertencia por sí solo.
* Si un valor permitido exige soporte, catálogo, trazabilidad o revisión clínica, puede mantenerse como advertencia justificada.
* No generar Excel de prueba que active errores de variables anteriores.
* No entregar Excel limpio si aparecen errores externos o advertencias no esperadas.
* No mezclar versiones en `index.html`.
* Mantener sincronizados estructura, lector, motor, reglas, exportador, UI y documentación.
* No duplicar la matriz funcional en JavaScript si ya existe como documento `.md`.
* La matriz funcional debe mantenerse como fuente documental central.
* Los archivos de distribución como `dist/` no se suben a Git.

---

## 3. Backlog por sprints actualizado

| Sprint / Módulo |    Variables | Descripción                                                           | Estado            |
| --------------- | -----------: | --------------------------------------------------------------------- | ----------------- |
| Sprint 1        |       V1-V16 | Identificación del usuario                                            | Cerrado funcional |
| Sprint 2A       |      V17-V24 | Diagnóstico inicial                                                   | Cerrado funcional |
| Sprint 2B       |      V25-V28 | Confirmación, histología y diferenciación                             | Cerrado funcional |
| Sprint 2C       |          V29 | Primera estadificación                                                | Cerrado funcional |
| Sprint 2D       |      V30-V33 | Fechas y variables complementarias de estadificación                  | Cerrado funcional |
| Sprint 2E       |      V34-V35 | Dukes colorrectal                                                     | Cerrado funcional |
| Sprint 3A       |      V36-V40 | Estadificación, riesgo y objetivo de tratamiento                      | Cerrado funcional |
| Sprint 3B       |      V41-V44 | Intervención médica y antecedentes                                    | Cerrado funcional |
| Sprint 3C       |      V45-V47 | Inicio de terapia sistémica                                           | Cerrado funcional |
| Sprint 3D       |      V48-V52 | Primer o único esquema: ubicación, inicio e IPS                       | Cerrado funcional |
| Sprint 3E       |    V53-V53.9 | Medicamentos base del primer o único esquema                          | Cerrado funcional |
| Sprint 3F       |      V54-V60 | Cierre y complementos del primer o único esquema                      | Cerrado funcional |
| Sprint 3G       |      V61-V65 | IPS del último esquema de terapia sistémica                           | Cerrado funcional |
| Sprint 3H       |    V66-V66.9 | Medicamentos del último esquema                                       | Cerrado funcional |
| Sprint 3I       |      V67-V69 | Medicamentos adicionales del último esquema                           | Cerrado funcional |
| Sprint 3J       |      V70-V77 | Cierre del último esquema y transición a cirugía                      | Cerrado funcional |
| Sprint 3K       |      V78-V85 | Bloque cirugía                                                        | Cerrado funcional |
| Sprint 3L       |     V86-V105 | Radioterapia                                                          | Cerrado funcional |
| Sprint 3M       |    V106-V110 | Trasplante                                                            | Cerrado funcional |
| Sprint 3N       |    V111-V125 | Tratamiento complementario y tipo de tratamiento a corte              | Cerrado funcional |
| Sprint 3O       |    V126-V134 | Resultado final, estado vital, novedades, fechas y cierre del reporte | Cerrado funcional |
| Fase actual     | Advertencias | Ajuste de falsos positivos en APP                                     | En curso          |
| Documentación   |         Docs | Matriz, casos de uso, historias y backlog                             | En actualización  |

---

## 4. Estado funcional reciente

| Variable | Descripción                                                            | Estado            |
| -------- | ---------------------------------------------------------------------- | ----------------- |
| V125     | Tipo de tratamiento que está recibiendo el usuario a la fecha de corte | Cerrado funcional |
| V126     | Resultado final del manejo oncológico                                  | Cerrado funcional |
| V127     | Estado vital al finalizar el periodo                                   | Cerrado funcional |
| V128     | Novedad administrativa                                                 | Cerrado funcional |
| V129     | Novedad clínica a la fecha de corte                                    | Cerrado funcional |
| V130     | Fecha de desafiliación de la EAPB                                      | Cerrado funcional |
| V131     | Fecha de muerte                                                        | Cerrado funcional |
| V132     | Causa de muerte                                                        | Cerrado funcional |
| V133     | Código único de identificación BDUA-BDEX-PVS                           | Cerrado funcional |
| V134     | Fecha de corte                                                         | Cerrado funcional |

---

## 5. Cierre global V1-V134

El validador quedó cerrado funcionalmente hasta **V134**.

Estado final confirmado:

```text
Última variable cerrada: V134
Modo actual: ACUMULATIVO_V1_V134
Total reconocidas: 166
Estructura OK: true
Variables faltantes: []
Módulo 19 intacto: sprint-3n-v125-tipo-tratamiento-corte-01
Módulo 20 cerrado: sprint-3o-v134-fecha-corte-01
```

Auditoría de base real confirmada:

```text
Hoja: 2025
Filas procesadas: 275
Modo: ACUMULATIVO_V1_V134
Estructura OK: true
Variables faltantes: []
V126-V134 reconocidas correctamente
```

Observación:

```text
Las variables V1-V134 quedan cerradas funcionalmente.
La fase siguiente no es implementar más variables.
La fase actual es depurar advertencias, actualizar documentación y revisar experiencia de usuario.
```

---

## 6. Backlog técnico actual

| Tarea                           | Descripción                                         | Estado              |
| ------------------------------- | --------------------------------------------------- | ------------------- |
| Cerrar V125                     | Tipo de tratamiento a la fecha de corte             | Cerrado funcional   |
| Cerrar V126                     | Resultado final del manejo oncológico               | Cerrado funcional   |
| Cerrar V127                     | Estado vital al finalizar el periodo                | Cerrado funcional   |
| Cerrar V128                     | Novedad administrativa                              | Cerrado funcional   |
| Cerrar V129                     | Novedad clínica                                     | Cerrado funcional   |
| Cerrar V130                     | Fecha de desafiliación                              | Cerrado funcional   |
| Cerrar V131                     | Fecha de muerte                                     | Cerrado funcional   |
| Cerrar V132                     | Causa de muerte                                     | Cerrado funcional   |
| Cerrar V133                     | Código único BDUA-BDEX-PVS                          | Cerrado funcional   |
| Cerrar V134                     | Fecha de corte                                      | Cerrado funcional   |
| Actualizar matriz funcional     | Matriz por variable V1-V134                         | En actualización    |
| Actualizar historias de usuario | Documento `USER_STORIES.md`                         | Actualizado a V134  |
| Actualizar casos de uso         | Documento `USE_CASES.md`                            | Actualizado a V134  |
| Actualizar backlog              | Documento actual                                    | En actualización    |
| Auditar advertencias            | Revisar falsos positivos permitidos por instructivo | Fase actual         |
| Mostrar matriz en APP           | Enlazar o visualizar `.md` desde la interfaz        | Pendiente operativo |
| Revisar UI                      | Mejorar claridad de mensajes y navegación           | Pendiente operativo |

---

## 7. Estado resumido por bloque

| Bloque        | Estado            | Observación                                                        |
| ------------- | ----------------- | ------------------------------------------------------------------ |
| V1-V16        | Cerrado funcional | Identificación.                                                    |
| V17-V44       | Cerrado funcional | Diagnóstico, estadificación y antecedentes.                        |
| V45-V60       | Cerrado funcional | Primer o único esquema sistémico.                                  |
| V61-V73       | Cerrado funcional | Último esquema de terapia sistémica.                               |
| V74-V85       | Cerrado funcional | Cirugía.                                                           |
| V86-V105      | Cerrado funcional | Radioterapia.                                                      |
| V106-V110     | Cerrado funcional | Trasplante de progenitores hematopoyéticos.                        |
| V111-V124     | Cerrado funcional | Tratamiento complementario.                                        |
| V125          | Cerrado funcional | Tipo de tratamiento a la fecha de corte.                           |
| V126-V134     | Cerrado funcional | Resultado final, estado vital, novedades, fechas finales y cierre. |
| Advertencias  | En curso          | Ajuste de falsos positivos sin tocar errores.                      |
| Documentación | En actualización  | Matriz, casos de uso, historias y backlog.                         |

---

## 8. Próxima acción

Continuar con:

```text
Fase actual — Ajuste de advertencias en APP
```

Objetivo:

```text
Limpiar advertencias falsas generadas por valores permitidos en el instructivo,
sin tocar errores cerrados ni romper reglas ya aprobadas.
```

Restricción obligatoria:

```text
Los errores NO se tocan.
No se eliminan.
No se reclasifican.
No se suavizan.
No se modifican durante esta fase.
```

Trabajo permitido:

```text
Revisar advertencias.
Eliminar falsos positivos.
Ajustar redacción de advertencias.
Mantener advertencias justificadas por soporte, trazabilidad, catálogo o revisión clínica.
Actualizar documentación.
Mejorar visualización en APP.
```

---

## 9. Reglas actuales para advertencias

Reglas de ajuste:

```text
1. Si el instructivo permite el valor sin condición adicional, no debe generar advertencia.
2. Si el valor permitido requiere soporte documental, puede mantenerse advertencia.
3. Si el valor permitido requiere coherencia con otra variable, puede mantenerse advertencia de trazabilidad.
4. Si el valor depende de catálogo operativo, puede mantenerse advertencia de revisión de catálogo.
5. Si el valor representa una situación clínica sensible, puede mantenerse advertencia de revisión clínica.
6. Ninguna advertencia debe convertirse en error sin instrucción formal.
7. Ningún error debe convertirse en advertencia durante esta fase.
```

Ejemplos de valores que no deben advertirse por sí solos:

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

Condición:

```text
Estos valores sólo deben advertirse si contradicen una variable dependiente,
una fecha, un catálogo o una regla explícita del instructivo.
```

---

## 10. Archivos técnicos principales

Archivos base del proyecto:

```text
index.html
src/lector/estructura.js
src/lector/excel.js
src/validaciones/engine.js
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
src/exportador/excel-reporte.js
src/catalogos/cie10.js
src/catalogos/cups.js
src/catalogos/atc.js
src/catalogos/cargador.js
```

Documentación principal:

```text
docs/USER_STORIES.md
docs/USE_CASES.md
docs/BACKLOG.md
docs/AUDITORIA_PROYECTO.md
docs/matriz_variables_cac_actualizada_v86.md
```

Observación sobre matriz:

```text
El archivo de matriz conserva el nombre histórico con V86,
pero su contenido debe quedar actualizado a V134.
Si se decide renombrarlo a V134, actualizar enlaces de la APP y documentación.
```

---

## 11. Errores recientes a evitar

### Error de versiones mezcladas

No dejar archivos con versiones visuales antiguas.

Revisar especialmente:

```text
index.html
engine.js
modulo19.js
modulo20.js
```

### Error de Excel sucio

No generar Excel de prueba que active errores de variables anteriores.

El Excel de prueba debe activar únicamente lo que se quiere probar.

### Error de módulos cerrados

No tocar módulos cerrados salvo bug real confirmado.

Durante ajuste de advertencias:

```text
Se permite revisar advertencias.
No se permite alterar errores cerrados.
```

### Error de valores permitidos

No marcar como advertencia un valor permitido por instructivo si no existe condición adicional.

Ejemplo:

```text
98 como No Aplica
1845-01-01 como No Aplica
1800-01-01 como no finalizado
97 como ya registrado / no aplicable según contexto
96 como fuera del país
```

### Error de Git

No subir archivos de distribución ni carpetas de compilación.

Deben estar ignorados:

```text
dist/
node_modules/
*.exe
*.msi
*.blockmap
latest.yml
builder-debug.yml
builder-effective-config.yaml
```

---

## 12. Pendientes inmediatos

| Prioridad | Pendiente                                                               | Estado             |
| --------- | ----------------------------------------------------------------------- | ------------------ |
| Alta      | Revisar advertencias falsas en APP                                      | En curso           |
| Alta      | Mantener errores cerrados intactos                                      | Obligatorio        |
| Alta      | Confirmar que documentación ya no diga V66, V86, V124 ni V125 pendiente | En curso           |
| Media     | Mostrar o enlazar matriz funcional desde APP                            | Pendiente          |
| Media     | Revisar redacción de hallazgos para usuario final                       | Pendiente          |
| Media     | Auditar exportador con V1-V134                                          | Pendiente          |
| Baja      | Renombrar matriz histórica de V86 a V134 si se decide                   | Pendiente opcional |

---

## 13. Estado final del backlog

| Concepto                  | Estado                                       |
| ------------------------- | -------------------------------------------- |
| Avance funcional actual   | V1-V134                                      |
| Variables cerradas        | V1-V134                                      |
| Siguiente variable        | Ninguna                                      |
| Sprint final de variables | Sprint 3O                                    |
| Módulo final              | Módulo 20                                    |
| Catálogo CIE-10           | Disponible                                   |
| Catálogo CUPS             | Disponible                                   |
| Catálogo ATC              | Disponible                                   |
| Fase actual               | Ajuste de advertencias                       |
| Restricción principal     | No tocar errores cerrados                    |
| Matriz funcional          | Actualizada por variable V1-V134             |
| Casos de uso              | Actualizados a V134                          |
| Historias de usuario      | Actualizadas a V134                          |
| Backlog                   | Actualizado a V134                           |
| Pendiente operativo       | Mostrar matriz en APP y auditar advertencias |
