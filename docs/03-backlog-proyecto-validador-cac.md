# Backlog del Proyecto — Validador CAC — Cáncer

**Proyecto:** Validador CAC — Cáncer  
**Objetivo:** revisar archivos Excel de la Cuenta de Alto Costo antes del reporte final, identificando errores, advertencias e inconsistencias.  
**Metodología:** desarrollo progresivo por sprints y cierre funcional por variable.  
**Estado actual:** avance funcional cerrado hasta **V80**.  
**Siguiente variable:** **V81**.  
**Regla de trabajo:** las variables cerradas no se modifican, salvo bug real confirmado.

---

## 1. Flujo de trabajo por variable

1. Revisión del instructivo.
2. Confirmación de encabezado real/cortado.
3. Identificación de reglas de negocio.
4. Definición de trazabilidad con otras variables.
5. Implementación en el módulo correspondiente.
6. Generación de Excel de prueba limpio.
7. Validación en pantalla y consola.
8. Revisión del exportador.
9. Cierre funcional.

---

## 2. Reglas de trabajo

- No implementar reglas no soportadas por el instructivo.
- Antes de iniciar variable nueva, confirmar encabezado real/cortado.
- No adelantar validaciones de variables futuras.
- No modificar variables cerradas, salvo bug real.
- Mantener trazabilidad clara en cada regla cruzada.
- Crear Excel limpio por variable.
- Validar pantalla, consola y exportador antes del cierre.
- Mantener avance acumulativo.
- No reemplazar `modulo15.js`; está cerrado hasta V77.
- Desde V78 en adelante continuar en `modulo16.js`.

---

## 3. Backlog por sprints actualizado

| Sprint | Variables | Descripción | Estado |
|---|---|---|---|
| Sprint 1 | V1-V16 | Identificación del usuario | Cerrado funcional |
| Sprint 2A | V17-V24 | Diagnóstico inicial | Cerrado funcional |
| Sprint 2B | V25-V28 | Confirmación, histología y diferenciación | Cerrado funcional |
| Sprint 2C | V29 | Primera estadificación | Cerrado funcional |
| Sprint 2D | V30-V33 | Fechas y variables complementarias de estadificación | Cerrado funcional |
| Sprint 2E | V34-V35 | Dukes colorrectal | Cerrado funcional |
| Sprint 3A | V36-V40 | Estadificación, riesgo y objetivo de tratamiento | Cerrado funcional |
| Sprint 3B | V41-V44 | Intervención médica y antecedentes | Cerrado funcional |
| Sprint 3C | V45-V47 | Inicio de terapia sistémica | Cerrado funcional |
| Sprint 3D | V48-V52 | Primer o único esquema: ubicación, inicio e IPS | Cerrado funcional |
| Sprint 3E | V53-V53.9 | Medicamentos base del primer o único esquema | Cerrado funcional |
| Sprint 3F | V54-V56 | Medicamentos adicionales del primer o único esquema | Cerrado funcional |
| Sprint 3G | V57-V60 | Cierre del primer o único esquema | Cerrado funcional |
| Sprint 3H | V61-V73 | Último esquema de terapia sistémica | Cerrado funcional |
| Sprint 3H | V66-V66.9 | Medicamentos del último esquema | Cerrado funcional |
| Sprint 3I | V67-V69 | Medicamentos adicionales último esquema | Cerrado funcional |
| Sprint 3J | V70-V73 | Cierre del último esquema | Cerrado funcional |
| Sprint 3K | V74-V80 | Inicio del bloque cirugía | Cerrado funcional |
| Sprint 3K | V81 | Motivo de la última cirugía | Siguiente |
| Sprint 3K | V82-V85 | Cierre del bloque cirugía | Pendiente |
| Sprint 3L | V86-V105 | Radioterapia | Pendiente |
| Sprint 3M | V106-V110 | Trasplante de progenitores hematopoyéticos | Pendiente |
| Sprint 3N | V111-V124 | Tratamiento complementario | Pendiente |
| Sprint 3O | V125-V134 | Situación actual y resultado | Pendiente |

---

## 4. Backlog técnico actual

| Tarea | Descripción | Estado |
|---|---|---|
| Cerrar V78 | Código CUPS de la primera cirugía, validado contra CUPS CIRUGÍA | Cerrado funcional |
| Cerrar V79 | Ubicación temporal de la primera cirugía | Cerrado funcional |
| Cerrar V80 | Fecha de última cirugía o reintervención | Cerrado funcional |
| Implementar V81 | Motivo de haber realizado la última cirugía del periodo | Siguiente |
| Implementar V82 | Código de IPS que realizó la última cirugía | Pendiente |
| Implementar V83 | CUPS de la última cirugía | Pendiente |
| Implementar V84 | Ubicación temporal de la última cirugía | Pendiente |
| Implementar V85 | Estado vital al finalizar la única o última cirugía | Pendiente |

---

## 5. Estado resumido

| Bloque | Estado | Observación |
|---|---|---|
| V1-V60 | Cerrado funcional | Base diagnóstica y primer esquema sistémico. |
| V61-V73 | Cerrado funcional | Último esquema de terapia sistémica. |
| V74-V80 | Cerrado funcional | Cirugía: primera cirugía y fecha de última cirugía/reintervención. |
| V81 | Siguiente | Motivo de última cirugía. |
| V82-V85 | Pendiente | Resto del bloque quirúrgico. |
| V86-V105 | Pendiente | Radioterapia. |
| V106-V110 | Pendiente | Trasplante de células progenitoras hematopoyéticas. |
| V111-V124 | Pendiente | Tratamiento complementario. |
| V125-V134 | Pendiente | Situación actual y resultado. |

---

## 6. Próxima acción

Continuar con:

```text
V81 — Motivo de haber realizado la última cirugía de este periodo de reporte
```

Instructivo recibido:

```text
1: Complementar tratamiento quirúrgico del cáncer no asociado a complicaciones de la primera cirugía
2: Complicaciones debidas a la primera cirugía o siguientes
3: Complicaciones por otras condiciones médicas no relacionadas a la cirugía
5: 1 y 3
6: 2 y 3
98: No aplica, sólo hubo una intervención en este periodo o no hubo cirugías
```

Trazabilidad esperada:

```text
V74 → V75 → V76 → V80 → V81
```

Trazabilidad ampliada:

```text
V74 → V75 → V76 → V77 → V78 → V79 → V80 → V81
```

Antes de implementar V81 falta confirmar:

```text
Encabezado real de V81 en el Excel
```

---

## 7. Errores recientes a evitar

### Error de index.html

No dejar archivos con versiones mezcladas.

Ejemplo del error ocurrido:

```text
modulo16.js en V80
estructura.js y excel.js todavía en V79
```

Antes de probar, revisar que `index.html` tenga todos los archivos de la variable actual:

```text
estructura.js
excel.js
modulo16.js
engine.js
excel-reporte.js
```

### Error de Excel sucio

No generar Excel de prueba que active errores de variables anteriores.

El Excel de prueba debe activar errores de la variable nueva, no errores de V17, V23 u otras variables ya cerradas.

### Error de módulo cerrado

No tocar:

```text
src\validaciones\reglas\modulo15.js
```

El trabajo nuevo continúa en:

```text
src\validaciones\reglas\modulo16.js
```
