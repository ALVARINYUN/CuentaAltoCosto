# Backlog del Proyecto — Validador CAC

**Proyecto:** Validador CAC — Cáncer  
**Objetivo:** revisar archivos Excel de la Cuenta de Alto Costo antes del reporte final, identificando errores, advertencias e inconsistencias.  
**Metodología:** desarrollo progresivo por sprints y cierre funcional por bloques de variables.  
**Estado actual:** avance funcional cerrado hasta **V66**.  
**Siguiente variable:** **V66.1**.  
**Regla de trabajo:** las variables cerradas no se modifican, salvo bug real o mejora puntual de redacción que no cambie la lógica.

---

## 1. Flujo de trabajo por variable

1. Revisión del instructivo.
2. Confirmación de encabezados reales/cortados.
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
- Antes de iniciar variable nueva, confirmar encabezados reales/cortados.
- No adelantar validaciones de variables futuras.
- No modificar variables cerradas, salvo bug real o mejora de texto sin cambio lógico.
- Mantener trazabilidad clara en cada regla cruzada.
- Crear Excel limpio por variable o bloque.
- Validar pantalla, consola y exportador antes del cierre.
- Mantener el avance acumulativo.

---

## 3. Backlog por sprints

| Sprint | Variables | Descripción | Estado |
|---|---|---|---|
| Sprint 1 | V1-V16 | Identificación del usuario. | Cerrado funcional |
| Sprint 2A | V17-V24 | Diagnóstico inicial. | Cerrado funcional |
| Sprint 2B | V25-V28 | Confirmación, histología y diferenciación. | Cerrado funcional |
| Sprint 2C | V29 | Primera estadificación. | Cerrado funcional |
| Sprint 2D | V30-V33 | Fechas y variables complementarias de estadificación. | Cerrado funcional |
| Sprint 2E | V34-V35 | Dukes colorrectal. | Cerrado funcional |
| Sprint 3A | V36-V40 | Estadificación, riesgo y objetivo de tratamiento. | Cerrado funcional |
| Sprint 3B | V41-V44 | Intervención médica y antecedentes. | Cerrado funcional |
| Sprint 3C | V45-V47 | Inicio de terapia sistémica. | Cerrado funcional |
| Sprint 3D | V48-V52 | Primer o único esquema: ubicación, inicio e IPS. | Cerrado funcional |
| Sprint 3E | V53-V53.9 | Medicamentos base del primer o único esquema. | Cerrado funcional |
| Sprint 3F | V54-V56 | Medicamentos adicionales del primer o único esquema. | Cerrado funcional |
| Sprint 3G | V57-V60 | Cierre del primer o único esquema. | Cerrado funcional |
| Sprint 3H | V61-V65 | Ubicación, fecha e IPS del último esquema. | Cerrado funcional |
| Sprint 3H | V66 | Número de medicamentos propuestos en el último esquema. | Cerrado funcional |
| Sprint 3H | V66.1 | Medicamento administrado 1 del último esquema. | Siguiente |
| Sprint 3H | V66.2-V66.9 | Medicamentos administrados 2 a 9 del último esquema. | Pendiente |

---

## 4. Backlog técnico actual

| Tarea | Descripción | Estado |
|---|---|---|
| Cerrar V61 | Ubicación temporal del último esquema, trazabilidad con V45 y uso de 97/98. | Cerrado funcional |
| Cerrar V62 | Fecha de inicio del último esquema, trazabilidad con V45/V61 y 1845-01-01. | Cerrado funcional |
| Cerrar V63 | Número de IPS que suministran el último esquema. Permite entero positivo o 98. | Cerrado funcional |
| Cerrar V64 | Código IPS1 del último esquema. | Cerrado funcional |
| Cerrar V65 | Código IPS2 del último esquema. | Cerrado funcional |
| Cerrar V66 | Número de medicamentos propuestos en el último esquema. | Cerrado funcional |
| Implementar V66.1 | Primer medicamento administrado del último esquema. Validar ATC o 98. No permite 97. | Siguiente |
| Implementar V66.2-V66.9 | Medicamentos administrados 2 a 9. Permiten ATC, 97 o 98. | Pendiente |

---

## 5. Estado resumido

| Bloque | Estado | Observación |
|---|---|---|
| V1-V53.9 | Cerrado funcional | Base acumulativa validada. |
| V54-V56 | Cerrado funcional | Medicamentos adicionales del primer o único esquema. |
| V57-V60 | Cerrado funcional | Cierre del primer o único esquema. |
| V61-V65 | Cerrado funcional | Ubicación, fecha e IPS del último esquema. |
| V66 | Cerrado funcional | Número de medicamentos propuestos en el último esquema. |
| V66.1-V66.9 | En progreso | Sigue V66.1. |
| V67-V73 | Pendiente | Continuación del último esquema. |
| V74-V134 | Pendiente | Bloques posteriores del instructivo. |

---

## 6. Próxima acción

Continuar con **V66.1 — Medicamento antineoplásico administrado 1 del último esquema**.

Encabezado real confirmado:

```text
v661medicamentoadm1
```

Pasos inmediatos:

1. Revisar reglas específicas de V66.1.
2. Definir trazabilidad con V45, V61, V66 y catálogo ATC.
3. Confirmar que V66.1 no permite 97.
4. Actualizar estructura, lector, motor, módulo de reglas, exportador e index.
5. Generar Excel limpio de prueba.
6. Validar estructura, conteos y trazabilidad por fila.
7. Revisar exportador.
8. Cerrar V66.1 antes de avanzar a V66.2.
