# Backlog del Proyecto — Validador CAC — Cáncer

**Proyecto:** Validador CAC — Cáncer
**Objetivo:** revisar archivos Excel de la Cuenta de Alto Costo antes del reporte final, identificando errores, advertencias e inconsistencias.
**Metodología:** desarrollo progresivo por sprints y cierre funcional por variable.
**Estado actual:** avance funcional cerrado hasta **V124**.
**Siguiente variable:** **V125**.
**Sprint actual:** **Sprint 3N — V125-V134**.
**Módulo actual:** **Módulo 20 — Situación actual del usuario, resultado final, novedades y cierre del reporte**.
**Regla de trabajo:** las variables cerradas no se modifican, salvo bug real confirmado.

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

---

## 2. Reglas de trabajo

* No implementar reglas no soportadas por el instructivo.
* Antes de iniciar variable nueva, confirmar encabezado real/cortado.
* No adelantar validaciones de variables futuras.
* No modificar variables cerradas, salvo bug real confirmado.
* Mantener trazabilidad clara en cada regla cruzada.
* Crear Excel limpio por variable.
* Validar pantalla, consola y exportador antes del cierre.
* Mantener avance acumulativo.
* No generar Excel de prueba que active errores de variables anteriores.
* No entregar Excel limpio si aparecen errores externos o advertencias no esperadas.
* No mezclar versiones en `index.html`.
* Cada variable nueva debe quedar visible en estructura, lector, motor, reglas, exportador y consola de prueba.
* Las variables cerradas de módulos anteriores quedan protegidas.
* El trabajo nuevo desde V125 continúa en un módulo nuevo: `modulo20.js`.

---

## 3. Backlog por sprints actualizado

| Sprint    | Variables | Descripción                                                       | Estado            |
| --------- | --------- | ----------------------------------------------------------------- | ----------------- |
| Sprint 1  | V1-V16    | Identificación del usuario                                        | Cerrado funcional |
| Sprint 2A | V17-V24   | Diagnóstico inicial                                               | Cerrado funcional |
| Sprint 2B | V25-V28   | Confirmación, histología y diferenciación                         | Cerrado funcional |
| Sprint 2C | V29       | Primera estadificación                                            | Cerrado funcional |
| Sprint 2D | V30-V33   | Fechas y variables complementarias de estadificación              | Cerrado funcional |
| Sprint 2E | V34-V35   | Dukes colorrectal                                                 | Cerrado funcional |
| Sprint 3A | V36-V40   | Estadificación, riesgo y objetivo de tratamiento                  | Cerrado funcional |
| Sprint 3B | V41-V44   | Intervención médica y antecedentes                                | Cerrado funcional |
| Sprint 3C | V45-V47   | Inicio de terapia sistémica                                       | Cerrado funcional |
| Sprint 3D | V48-V52   | Primer o único esquema: ubicación, inicio e IPS                   | Cerrado funcional |
| Sprint 3E | V53-V53.9 | Medicamentos base del primer o único esquema                      | Cerrado funcional |
| Sprint 3F | V54-V60   | Cierre y complementos del primer o único esquema                  | Cerrado funcional |
| Sprint 3G | V61-V65   | IPS del último esquema de terapia sistémica                       | Cerrado funcional |
| Sprint 3H | V66-V66.9 | Medicamentos del último esquema                                   | Cerrado funcional |
| Sprint 3I | V67-V69   | Medicamentos adicionales del último esquema                       | Cerrado funcional |
| Sprint 3J | V70-V77   | Cierre del último esquema y transición a cirugía                  | Cerrado funcional |
| Sprint 3K | V78-V85   | Bloque cirugía                                                    | Cerrado funcional |
| Sprint 3L | V86-V105  | Radioterapia                                                      | Cerrado funcional |
| Sprint 3M | V106-V124 | Trasplante y tratamiento complementario                           | Cerrado funcional |
| Sprint 3N | V125-V134 | Situación actual, resultado final, novedades y cierre del reporte | Siguiente         |

---

## 4. Estado funcional reciente

| Variable | Descripción                                  | Estado            |
| -------- | -------------------------------------------- | ----------------- |
| V120     | Valoración por nutrición                     | Cerrado funcional |
| V121     | Fecha de consulta inicial con nutrición      | Cerrado funcional |
| V122     | IPS donde recibió valoración por nutrición   | Cerrado funcional |
| V123     | Soporte nutricional                          | Cerrado funcional |
| V124     | Terapias complementarias para rehabilitación | Cerrado funcional |

---

## 5. Cierre Sprint 3M / V106-V124

El bloque anterior quedó cerrado hasta V124.

Estado final confirmado:

```text
Última variable cerrada: V124
Modo actual: ACUMULATIVO_V1_V124
Total reconocidas: 156
Versión módulo 19: sprint-3n-v124-terapias-rehabilitacion-01
Estructura OK: true
cierreV124OK: true
```

Auditoría de base real confirmada:

```text
Estructura y versión OK hasta V124.
V124 sin errores.
V124 sin advertencias.
Base real reconocida correctamente.
```

Observación:

```text
Las advertencias globales detectadas pertenecen a variables anteriores.
No son contaminación de V124.
```

---

## 6. Backlog técnico actual

| Tarea                  | Descripción                                     | Estado            |
| ---------------------- | ----------------------------------------------- | ----------------- |
| Cerrar V124            | Terapias complementarias para rehabilitación    | Cerrado funcional |
| Auditar base real V124 | Verificar estructura y hallazgos reales de V124 | Cerrado           |
| Crear Sprint 3N        | Nuevo bloque V125-V134                          | Siguiente         |
| Implementar V125       | Tipo de tratamiento a la fecha de corte         | Siguiente         |
| Implementar V126       | Resultado final del manejo oncológico           | Pendiente         |
| Implementar V127       | Estado vital al finalizar el periodo            | Pendiente         |
| Implementar V128       | Novedad administrativa                          | Pendiente         |
| Implementar V129       | Novedad clínica a la fecha de corte             | Pendiente         |
| Implementar V130       | Fecha de desafiliación de la EAPB               | Pendiente         |
| Implementar V131       | Fecha de muerte                                 | Pendiente         |
| Implementar V132       | Causa de muerte                                 | Pendiente         |
| Implementar V133       | Código único de identificación BDUA-BDEX-PVS    | Pendiente         |
| Implementar V134       | Fecha de corte                                  | Pendiente         |

---

## 7. Estado resumido

| Bloque    | Estado            | Observación                                                        |
| --------- | ----------------- | ------------------------------------------------------------------ |
| V1-V60    | Cerrado funcional | Base diagnóstica y primer esquema sistémico.                       |
| V61-V73   | Cerrado funcional | Último esquema de terapia sistémica.                               |
| V74-V85   | Cerrado funcional | Cirugía.                                                           |
| V86-V105  | Cerrado funcional | Radioterapia.                                                      |
| V106-V110 | Cerrado funcional | Trasplante de progenitores hematopoyéticos.                        |
| V111-V124 | Cerrado funcional | Tratamiento complementario.                                        |
| V125      | Siguiente         | Tipo de tratamiento a la fecha de corte.                           |
| V126-V134 | Pendiente         | Resultado final, estado vital, novedades, fechas finales y cierre. |

---

## 8. Próxima acción

Continuar con:

```text
V125 — Tipo de tratamiento que está recibiendo el usuario a la fecha de corte 2025-01-01
```

Instructivo recibido:

```text
1: Radioterapia
2: Terapia sistémica
3: Cirugía
4: 1 y 2
5: 1 y 3
6: 2 y 3
7: Manejo expectante pretratamiento
8: En seguimiento, luego de tratamiento durante el periodo
9: Antecedente de cáncer
10: 1, 2 y 3
11: Manejo de cuidado paliativo o terapia complementaria
98: No Aplica
```

Aclaraciones recibidas:

```text
No aplican terapias propuestas, pero no realizadas.
Para cirugía, reportar sólo cuando el procedimiento se haya realizado a partir del 1 de noviembre de 2024.
```

Punto crítico:

```text
En V125 el valor 4 sí es válido.
No confundir con V124, donde el valor 4 fue eliminado.
```

Antes de implementar V125 falta confirmar:

```text
Encabezado real/cortado de V125 en el Excel.
```

---

## 9. Reglas preliminares V125

Reglas iniciales esperadas:

```text
V125-ERROR-001:
V125 está vacía.

V125-ERROR-002:
V125 tiene valor fuera de catálogo.
```

Catálogo permitido:

```text
1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 98
```

No agregar por ahora:

```text
No validar contra V126.
No validar contra V127.
No validar contra V128.
No validar fechas de muerte o desafiliación todavía.
No validar contra variables futuras.
No crear advertencias si no están justificadas por instructivo.
```

---

## 10. Archivos esperados para V125

Al iniciar V125, revisar y actualizar únicamente lo necesario:

```text
index.html
src/lector/estructura.js
src/lector/excel.js
src/validaciones/engine.js
src/validaciones/reglas/modulo20.js
src/exportador/excel-reporte.js
pruebas/consola_prueba_v125.js
LEAME_V125.txt
```

Configuración esperada al cerrar V125:

```text
Modo esperado: ACUMULATIVO_V1_V125
Total reconocidas esperado: 157
Versión módulo 20 sugerida: sprint-3n-v125-tipo-tratamiento-corte-01
```

---

## 11. Errores recientes a evitar

### Error de index.html

No dejar archivos con versiones mezcladas.

Antes de probar, revisar que `index.html` tenga todos los archivos de la variable actual:

```text
estructura.js
excel.js
engine.js
modulo20.js
excel-reporte.js
```

### Error de Excel sucio

No generar Excel de prueba que active errores de variables anteriores.

El Excel de prueba debe activar errores de la variable nueva, no errores de variables ya cerradas.

### Error de módulo cerrado

No tocar módulos cerrados salvo bug real confirmado.

No tocar innecesariamente:

```text
modulo15.js
modulo16.js
modulo17.js
modulo18.js
modulo19.js
```

El trabajo nuevo continúa en:

```text
src\validaciones\reglas\modulo20.js
```

### Error de catálogo V125

No marcar `4` como eliminado en V125.

En V125:

```text
4 = 1 y 2
```

El valor `4` fue eliminado en V124, no en V125.

---

## 12. Próximo pendiente inmediato

Pedir y confirmar el encabezado real/cortado de V125.

Ejemplo esperado:

```text
v125...
```

Con ese encabezado se puede generar el paquete técnico de V125.
