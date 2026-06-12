# Arquitectura técnica por variable — Validador CAC — Cáncer

---

## 1. Propósito

Este documento no reemplaza el instructivo CAC ni la matriz funcional. Su objetivo es dejar clara la arquitectura técnica de validación por variable, indicando:

- Qué variable valida cada bloque.
- Qué módulo técnico la controla.
- Qué dependencias usa.
- Qué trazabilidad debe mostrarse en hallazgos.
- Qué no debe modificarse sin confirmar bug real.
- Cómo se conecta cada variable con las anteriores y siguientes.

---

## 2. Flujo técnico general

```text
Archivo Excel
→ lector/estructura.js reconoce encabezados reales
→ lector/excel.js normaliza filas y variables
→ engine.js ejecuta módulos activos
→ modulo1.js ... modulo16.js generan hallazgos
→ UI muestra resultados por paciente
→ exportador/excel-reporte.js marca celdas en Excel
```

---

## 3. Mapa de módulos técnicos actualizado

| Módulo técnico | Variables | Archivo principal | Estado |
|---|---:|---|---|
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
| Módulo 14 | V61-V65 | `src/validaciones/reglas/modulo14.js` | Cerrado |
| Módulo 15 | V66-V77 | `src/validaciones/reglas/modulo15.js` | Cerrado |
| Módulo 16 | V78-V80 | `src/validaciones/reglas/modulo16.js` | Cerrado hasta V80 |
| Módulo 16 | V81 | `src/validaciones/reglas/modulo16.js` | Siguiente |

---

## 4. Regla técnica actual

No modificar ni reemplazar:

```text
src\validaciones\reglas\modulo15.js
```

Módulo 15 está cerrado hasta V77.

Desde V78 en adelante se trabaja en:

```text
src\validaciones\reglas\modulo16.js
```

Actualmente `modulo16.js` contiene:

```text
V78
V79
V80
```

La siguiente función a agregar será:

```text
validarV81
```

---

## 5. Versiones activas esperadas

```text
modulo15: sprint-3k-v77-ips-primera-cirugia-01
modulo16: sprint-3k-v80-fecha-ultima-cirugia-reintervencion-01
estructura: sprint-3k-v80-estructura-01
engine: sprint-3k-v80-engine-modulo16-01
exportador: sprint-3k-v80-exportador-01
```

En `index.html`, las líneas críticas deben estar en versión V80 antes de iniciar V81:

```html
<script src="src/lector/estructura.js?v=sprint-3k-v80-estructura-01"></script>
<script src="src/lector/excel.js?v=sprint-3k-v80-lector-01"></script>
<script src="src/validaciones/reglas/modulo16.js?v=sprint-3k-v80-fecha-ultima-cirugia-reintervencion-01"></script>
<script src="src/validaciones/engine.js?v=sprint-3k-v80-engine-modulo16-01"></script>
<script src="src/exportador/excel-reporte.js?v=sprint-3k-v80-exportador-01"></script>
```

---

## 6. Trazabilidad técnica del bloque quirúrgico

### V74 — Control del bloque cirugía

**Función técnica:** Define si hubo cirugía curativa o paliativa en el periodo.  
**Trazabilidad:** Controla V75-V85.  
**Estado:** Cerrada.

---

### V75 — Número de cirugías

**Función técnica:** Define si hubo una o más intervenciones.  
**Trazabilidad:** Depende de V74 y condiciona V76-V85.  
**Estado:** Cerrada.

---

### V76 — Fecha de primera cirugía

**Función técnica:** Fecha base del primer evento quirúrgico.  
**Trazabilidad:** Depende de V74 y se compara con V80.  
**Estado:** Cerrada.

---

### V77 — IPS de primera cirugía

**Función técnica:** Identifica la IPS que realizó la primera cirugía.  
**Trazabilidad:** Depende de V74 y V76.  
**Estado:** Cerrada en Módulo 15.

---

### V78 — CUPS de primera cirugía

**Función técnica:** Valida el CUPS de la primera cirugía contra CUPS CIRUGÍA.  
**Trazabilidad:** `V74 → V75 → V76 → V77 → V78`.  
**Estado:** Cerrada en Módulo 16.

**Regla técnica crítica:** V78 valida contra `CACCatalogoCUPS.grupos.cirugia.codigos`, no contra CUPS general ni radioterapia.

---

### V79 — Ubicación temporal de primera cirugía

**Función técnica:** Clasifica la primera cirugía como manejo inicial, recaída o enfermedad metastásica.  
**Trazabilidad:** `V74 → V75 → V76 → V77 → V78 → V79`.  
**Estado:** Cerrada en Módulo 16.

---

### V80 — Fecha de última cirugía o reintervención

**Función técnica:** Valida la fecha de última cirugía o reintervención cuando hubo más de una intervención.  
**Trazabilidad:** `V74 → V75 → V76 → V77 → V78 → V79 → V80`.  
**Estado:** Cerrada en Módulo 16.

---

### V81 — Motivo de última cirugía

**Función técnica esperada:** Validar el motivo de la última cirugía o reintervención.  
**Trazabilidad principal:** `V74 → V75 → V76 → V80 → V81`.  
**Trazabilidad ampliada:** `V74 → V75 → V76 → V77 → V78 → V79 → V80 → V81`.  
**Estado:** Siguiente variable.

**Reglas técnicas esperadas:**

- Si V74=2, V81 debe ser 98.
- Si V75=1, V81 debe ser 98.
- Si V75>1 y V80 tiene fecha real, V81 debe registrar 1, 2, 3, 5 o 6.
- Si V80=1845-01-01, V81 debe ser 98.
- V81=2 o 6 puede generar advertencia por complicación quirúrgica.
- V81=3, 5 o 6 puede generar advertencia por comorbilidad u otra condición médica.

---

## 7. Regla obligatoria de comentarios en código

Cada variable nueva debe tener comentario visible antes de la función:

```javascript
// ============================================================
// V81. Motivo de haber realizado la última cirugía de este periodo de reporte
// ============================================================
function validarV81(registro) {
  // lógica V81
}
```

Y en el flujo:

```javascript
// V81. Motivo de haber realizado la última cirugía de este periodo de reporte
hallazgos = hallazgos.concat(validarV81(registro));
```

No crear funciones nuevas sin comentario por variable.

---

## 8. Error técnico recurrente que debe evitarse

No repetir el error ocurrido en V80:

```text
modulo16.js estaba en V80, pero estructura.js y excel.js seguían cargando V79 desde index.html.
```

Antes de probar, ejecutar:

```javascript
[...document.querySelectorAll('script[src]')]
  .map(s => s.getAttribute('src'))
  .filter(src =>
    src.includes('estructura') ||
    src.includes('excel.js') ||
    src.includes('modulo16') ||
    src.includes('engine') ||
    src.includes('excel-reporte')
  );
```

Todo debe estar en la versión nueva de la variable actual.

---

## 9. Estado actual de cierre técnico

| Bloque | Estado |
|---|---|
| V1-V77 | Cerrado |
| V78 | Cerrado |
| V79 | Cerrado |
| V80 | Cerrado |
| V81 | Siguiente |

---

## 10. Siguiente paso técnico

Continuar con:

```text
Sprint 3K · Módulo 16 · V81
```

Antes de implementar V81 se debe confirmar el encabezado real del Excel.
