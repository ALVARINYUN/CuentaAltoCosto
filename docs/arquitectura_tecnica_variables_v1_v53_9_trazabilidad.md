# Arquitectura técnica por variable — Validador CAC Cohorte Cáncer

**Proyecto:** Validador CAC — Cohorte Cáncer  
**Documento:** Arquitectura técnica por variable con trazabilidad  
**Alcance:** V1 a V53.9  
**Estado:** Cerrado funcionalmente hasta V53.9  
**Siguiente variable:** V54  
**Regla operativa:** El validador es acumulativo. Las variables cerradas no se desactivan ni se modifican salvo bug real o decisión funcional aprobada.

---

## 1. Propósito

Este documento no reemplaza el instructivo CAC ni la matriz funcional.  
Su objetivo es dejar clara la **arquitectura técnica de validación por variable**, indicando:

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
→ modulo1.js ... modulo11.js generan hallazgos
→ UI muestra resultados por paciente
→ exportador/excel-reporte.js marca celdas en Excel
```

---

## 3. Mapa de módulos técnicos cerrados

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

---

## 4. Arquitectura y trazabilidad por variable

## Módulo 1 — Identificación del usuario · V1-V16

### V1 — Primer nombre

**Función técnica:** Validar campo obligatorio de texto.  
**Trazabilidad:** Se relaciona con la identificación del paciente junto con V3, V5 y V6.  
**Datos involucrados en hallazgos:** V1, documento del paciente.  
**Estado:** Cerrada.

### V2 — Segundo nombre

**Función técnica:** Validar texto o comodín `NONE`.  
**Trazabilidad:** Complementa identificación nominal con V1, V3 y V4.  
**Datos involucrados:** V2.  
**Estado:** Cerrada.

### V3 — Primer apellido

**Función técnica:** Validar campo obligatorio de texto.  
**Trazabilidad:** Identificación nominal con V1, V2 y V4.  
**Datos involucrados:** V3.  
**Estado:** Cerrada.

### V4 — Segundo apellido

**Función técnica:** Validar texto o comodín `NOAP`.  
**Trazabilidad:** Completa identificación nominal.  
**Datos involucrados:** V4.  
**Estado:** Cerrada.

### V5 — Tipo de identificación

**Función técnica:** Validar catálogo de tipo documental.  
**Trazabilidad:** Controla formato esperado de V6 y coherencia con V10 cuando aplica AS/MS.  
**Datos involucrados:** V5, V6, V10.  
**Estado:** Cerrada.

### V6 — Número de identificación

**Función técnica:** Validar formato según V5.  
**Trazabilidad:** Depende directamente de V5. Identifica el paciente en UI y reportes.  
**Datos involucrados:** V5, V6.  
**Estado:** Cerrada.

### V7 — Fecha de nacimiento

**Función técnica:** Validar fecha y coherencias de edad.  
**Trazabilidad:** Se usa para edad y cruces con V13; no se aplica regla de corte 2025-05-05 por decisión del cliente.  
**Datos involucrados:** V7, V13 cuando aplique.  
**Estado:** Cerrada.

### V8 — Sexo

**Función técnica:** Validar catálogo M/F.  
**Trazabilidad:** Se cruza con diagnósticos y variables dependientes: V17, V31, V37.  
**Datos involucrados:** V8, V17, V37 si aplica.  
**Estado:** Cerrada.

### V9 — Ocupación

**Función técnica:** Validar código CIUO o comodines.  
**Trazabilidad:** Se cruza de forma contextual con edad cuando corresponde.  
**Datos involucrados:** V9, V7 si aplica.  
**Estado:** Cerrada.

### V10 — Régimen de afiliación

**Función técnica:** Validar catálogo de régimen.  
**Trazabilidad:** Cruza con V5 para AS/MS y con V11 para código EPS/EAPB o territorial.  
**Datos involucrados:** V5, V10, V11.  
**Estado:** Cerrada.

### V11 — Código EPS/EAPB o entidad territorial

**Función técnica:** Validar código de aseguramiento o entidad territorial.  
**Trazabilidad:** Se conecta con V10 y eventualmente V14.  
**Datos involucrados:** V10, V11, V14 cuando aplique.  
**Estado:** Cerrada.

### V12 — Pertenencia étnica

**Función técnica:** Validar catálogo étnico.  
**Trazabilidad:** Se cruza con V13 para coherencias poblacionales.  
**Datos involucrados:** V12, V13.  
**Estado:** Cerrada.

### V13 — Grupo poblacional

**Función técnica:** Validar catálogo/rangos poblacionales.  
**Trazabilidad:** Cruza con V7, V8 y V12 según el grupo.  
**Datos involucrados:** V13, V7, V8, V12.  
**Estado:** Cerrada.

### V14 — Municipio de residencia

**Función técnica:** Validar código DIVIPOLA de 5 dígitos.  
**Trazabilidad:** Puede cruzarse con V11 cuando V11 corresponde a entidad territorial.  
**Datos involucrados:** V14, V11.  
**Estado:** Cerrada.

### V15 — Teléfono

**Función técnica:** Validar máximo dos números o comodín `0`.  
**Trazabilidad:** No tiene dependencia fuerte con variables clínicas.  
**Datos involucrados:** V15.  
**Estado:** Cerrada.

### V16 — Fecha de afiliación

**Función técnica:** Validar fecha de afiliación.  
**Trazabilidad:** Se cruza con V7 y contexto de régimen V10.  
**Datos involucrados:** V16, V7, V10.  
**Estado:** Cerrada.

---

## Módulo 2 — Diagnóstico base · V17-V24

### V17 — Código CIE-10 de la neoplasia reportada

**Función técnica:** Identificar diagnóstico primario y habilitar reglas por tipo de cáncer.  
**Trazabilidad:** Variable pivote para V21-V44, V36-V39, V45 en adelante cuando aplique tratamiento.  
**Datos involucrados:** V17 y variables dependientes según regla.  
**Estado:** Cerrada.

### V18 — Fecha de diagnóstico

**Función técnica:** Validar fecha diagnóstica.  
**Trazabilidad:** Se cruza con V19, V20, V23, V24, V26, V30, V35, V39 y variables futuras como V128 cuando aplique.  
**Datos involucrados:** V18 y fecha relacionada.  
**Estado:** Cerrada.

### V19 — Fecha de remisión o interconsulta

**Función técnica:** Validar fecha previa al proceso diagnóstico.  
**Trazabilidad:** Debe ser coherente con V20 y V18.  
**Datos involucrados:** V19, V20, V18.  
**Estado:** Cerrada.

### V20 — Fecha de ingreso a institución diagnóstica

**Función técnica:** Validar fecha de ingreso.  
**Trazabilidad:** Se ubica entre V19 y V18.  
**Datos involucrados:** V20, V19, V18.  
**Estado:** Cerrada.

### V21 — Tipo de estudio diagnóstico

**Función técnica:** Validar catálogo diagnóstico.  
**Trazabilidad:** Controla V22, V23, V24, V27 y V28 cuando el diagnóstico es clínico.  
**Datos involucrados:** V21, V22, V23, V24, V27, V28.  
**Estado:** Cerrada.

### V22 — Motivo sin histopatología

**Función técnica:** Validar motivo cuando V21=7.  
**Trazabilidad:** Depende directamente de V21.  
**Datos involucrados:** V21, V22.  
**Estado:** Cerrada.

### V23 — Fecha de recolección de muestra

**Función técnica:** Validar fecha o comodín por diagnóstico clínico.  
**Trazabilidad:** Se cruza con V21, V24 y V18.  
**Datos involucrados:** V21, V23, V24, V18.  
**Estado:** Cerrada.

### V24 — Fecha de informe histopatológico válido

**Función técnica:** Validar fecha de informe o comodín por diagnóstico clínico.  
**Trazabilidad:** Se cruza con V21, V23 y V18.  
**Datos involucrados:** V21, V24, V23, V18.  
**Estado:** Cerrada.

---

## Módulo 3 — Confirmación diagnóstica · V25-V28

### V25 — Código IPS de confirmación diagnóstica

**Función técnica:** Validar código REPS/comodines.  
**Trazabilidad:** Se relaciona con V21 y tipo de confirmación.  
**Datos involucrados:** V25, V21.  
**Estado:** Cerrada.

### V26 — Fecha de primera consulta con médico tratante

**Función técnica:** Validar fecha de primera conducta terapéutica.  
**Trazabilidad:** Se cruza con V18 y V128 futura sin bloquear prematuramente.  
**Datos involucrados:** V26, V18.  
**Estado:** Cerrada.

### V27 — Histología del tumor

**Función técnica:** Validar catálogo histológico.  
**Trazabilidad:** Se cruza con V17 y V21. Ejemplo: V27=21 solo para pulmón.  
**Datos involucrados:** V27, V17, V21.  
**Estado:** Cerrada.

### V28 — Grado de diferenciación

**Función técnica:** Validar catálogo y coherencias según tipo de cáncer.  
**Trazabilidad:** Se cruza con V17, V18, V21 y V27.  
**Datos involucrados:** V28, V17, V18, V21.  
**Estado:** Cerrada.

---

## Módulo 4 — Estadificación principal · V29

### V29 — Primera estadificación

**Función técnica:** Validar estadificación según diagnóstico.  
**Trazabilidad:** Depende de V17 y del agrupador oncológico.  
**Datos involucrados:** V29, V17.  
**Estado:** Cerrada.

**Trazabilidad específica:**

- Si V17 corresponde a cáncer de pulmón, V29 se valida contra catálogo de pulmón.
- Si V17 corresponde a melanoma, se valida contra catálogo de melanoma.
- Si V17 corresponde a colon/recto/canal anal, se valida contra catálogo específico.
- Si V17 corresponde a cérvix, se valida contra FIGO.
- Si V17 es in situ, V29 debe ser coherente con estadio 0 cuando aplique.
- V128 futura no se usa para bloquear todavía.

---

## Módulo 5 — Fechas/resultados relacionados · V30-V33

### V30 — Fecha de estadificación

**Función técnica:** Validar fecha asociada a V29.  
**Trazabilidad:** Depende de V18 y V29.  
**Datos involucrados:** V30, V18, V29.  
**Estado:** Cerrada.

### V31 — Prueba/variable de bloque HER2 según estructura activa

**Función técnica:** Validar aplicabilidad por diagnóstico.  
**Trazabilidad:** Depende de V17, principalmente cáncer de mama.  
**Datos involucrados:** V31, V17.  
**Estado:** Cerrada.

### V32 — Fecha relacionada HER2/estadificación

**Función técnica:** Validar fecha/comodín asociado.  
**Trazabilidad:** Depende de V31 y V17.  
**Datos involucrados:** V32, V31, V17.  
**Estado:** Cerrada.

### V33 — Resultado relacionado HER2/estadificación

**Función técnica:** Validar resultado de catálogo.  
**Trazabilidad:** Depende de V31, V32 y V17.  
**Datos involucrados:** V33, V31, V17.  
**Estado:** Cerrada.

---

## Módulo 6 — Dukes · V34-V35

### V34 — Estadificación Dukes

**Función técnica:** Validar aplicabilidad por cáncer colorrectal.  
**Trazabilidad:** Depende de V17.  
**Datos involucrados:** V34, V17.  
**Estado:** Cerrada.

### V35 — Fecha de Dukes

**Función técnica:** Validar fecha o no aplica.  
**Trazabilidad:** Depende de V34 y V18.  
**Datos involucrados:** V35, V34, V18.  
**Estado:** Cerrada.

---

## Módulo 7 — Linfomas, mieloma, próstata y riesgo · V36-V40

### V36 — Ann Arbor/Lugano

**Función técnica:** Validar estadificación de linfomas y mieloma múltiple.  
**Trazabilidad:** Depende de V17.  
**Datos involucrados:** V36, V17.  
**Estado:** Cerrada.

**Regla de trazabilidad aprobada:**  
Si V17=C900, corresponde a mieloma múltiple y V36 sí aplica. Por tanto, V36=98 es error; debe usarse un código 1-16 si está documentado o 99 si no está descrito.

### V37 — Gleason

**Función técnica:** Validar clasificación de próstata.  
**Trazabilidad:** Depende de V17, V8 y V21.  
**Datos involucrados:** V37, V17, V8, V21.  
**Estado:** Cerrada.

### V38 — Clasificación del riesgo

**Función técnica:** Validar riesgo según subcatálogo por diagnóstico.  
**Trazabilidad:** Depende de V17 y puede usar V36 como contexto.  
**Datos involucrados:** V38, V17, V36 cuando aplique.  
**Estado:** Cerrada.

### V39 — Fecha de clasificación de riesgo

**Función técnica:** Validar fecha o comodín.  
**Trazabilidad:** Depende de V38, V18 y V128 futura.  
**Datos involucrados:** V39, V38, V18.  
**Estado:** Cerrada.

### V40 — Objetivo del tratamiento inicial

**Función técnica:** Validar catálogo de intención terapéutica.  
**Trazabilidad:** Se contextualiza con V17, V18 y manejo inicial.  
**Datos involucrados:** V40, V17, V18.  
**Estado:** Cerrada.

---

## Módulo 8 — Intervención y antecedente · V41-V44

### V41 — Intervención médica durante el periodo

**Función técnica:** Validar intervención documentada.  
**Trazabilidad:** Debe mostrar V17, V18 y V41 cuando haya hallazgo.  
**Datos involucrados:** V41, V17, V18.  
**Estado:** Cerrada.

### V42 — Antecedente de otro cáncer primario

**Función técnica:** Validar catálogo de antecedente.  
**Trazabilidad:** Controla V43 y V44.  
**Datos involucrados:** V42, V43, V44.  
**Estado:** Cerrada.

### V43 — Fecha de otro cáncer primario

**Función técnica:** Validar fecha/comodín.  
**Trazabilidad:** Depende de V42.  
**Datos involucrados:** V43, V42.  
**Estado:** Cerrada.

### V44 — CIE-10 de otro cáncer primario

**Función técnica:** Validar código CIE-10 o comodín.  
**Trazabilidad:** Depende de V42 y se compara con V17 cuando aplica.  
**Datos involucrados:** V44, V42, V17.  
**Estado:** Cerrada.

---

## Módulo 9 — Terapia sistémica general · V45-V47

### V45 — Recibió quimioterapia u otra terapia sistémica

**Función técnica:** Variable pivote del bloque V46-V73.  
**Trazabilidad:** Controla aplicabilidad de V46-V53.9 y variables posteriores de terapia sistémica.  
**Datos involucrados:** V45 y variable dependiente.  
**Estado:** Cerrada.

### V46 — Número de fases de quimioterapia

**Función técnica:** Validar número/comodín para CIE-10 hematológicos específicos.  
**Trazabilidad:** Depende de V17 y V45; controla coherencia con V46.1-V46.8.  
**Datos involucrados:** V46, V17, V45.  
**Estado:** Cerrada.

### V46.1 — Prefase o citorreducción inicial

**Función técnica:** Validar fase específica.  
**Trazabilidad:** Depende de V17, V45 y V46.  
**Datos involucrados:** V46.1, V17, V45, V46.  
**Estado:** Cerrada.

### V46.2 — Inducción

**Función técnica:** Validar fase específica.  
**Trazabilidad:** Depende de V17, V45 y V46.  
**Datos involucrados:** V46.2, V17, V45, V46.  
**Estado:** Cerrada.

### V46.3 — Intensificación

**Función técnica:** Validar fase específica.  
**Trazabilidad:** Depende de V17, V45 y V46.  
**Datos involucrados:** V46.3, V17, V45, V46.  
**Estado:** Cerrada.

### V46.4 — Consolidación

**Función técnica:** Validar fase específica.  
**Trazabilidad:** Depende de V17, V45 y V46.  
**Datos involucrados:** V46.4, V17, V45, V46.  
**Estado:** Cerrada.

### V46.5 — Reinducción

**Función técnica:** Validar fase específica.  
**Trazabilidad:** Depende de V17, V45 y V46.  
**Datos involucrados:** V46.5, V17, V45, V46.  
**Estado:** Cerrada.

### V46.6 — Mantenimiento

**Función técnica:** Validar fase específica.  
**Trazabilidad:** Depende de V17, V45 y V46.  
**Datos involucrados:** V46.6, V17, V45, V46.  
**Estado:** Cerrada.

### V46.7 — Mantenimiento largo o final

**Función técnica:** Validar fase específica.  
**Trazabilidad:** Depende de V17, V45 y V46.  
**Datos involucrados:** V46.7, V17, V45, V46.  
**Estado:** Cerrada.

### V46.8 — Otra fase

**Función técnica:** Validar fase diferente a las anteriores.  
**Trazabilidad:** Depende de V17, V45 y V46.  
**Datos involucrados:** V46.8, V17, V45, V46.  
**Estado:** Cerrada.

### V47 — Número de ciclos iniciados y administrados

**Función técnica:** Validar número de ciclos o no aplica.  
**Trazabilidad:** Depende de V45 y contexto de terapia.  
**Datos involucrados:** V47, V45.  
**Estado:** Cerrada.

---

## Módulo 10 — Primer o único esquema · V48-V52

### V48 — Ubicación temporal del primer o único esquema

**Función técnica:** Validar catálogo de ubicación temporal.  
**Trazabilidad:** Depende de V45.  
**Datos involucrados:** V48, V45.  
**Estado:** Cerrada.

### V49 — Fecha de inicio del primer o único esquema

**Función técnica:** Validar fecha de inicio o no aplica.  
**Trazabilidad:** Depende de V45 y puede contextualizarse con V18.  
**Datos involucrados:** V49, V45, V18.  
**Estado:** Cerrada.

### V50 — Número de IPS que suministran el esquema

**Función técnica:** Validar cantidad de IPS.  
**Trazabilidad:** Controla uso de V51 y V52.  
**Datos involucrados:** V50, V45, V51, V52.  
**Estado:** Cerrada.

### V51 — Código IPS1 del primer o único esquema

**Función técnica:** Validar IPS1 o comodín.  
**Trazabilidad:** Depende de V45 y V50.  
**Datos involucrados:** V51, V45, V50.  
**Estado:** Cerrada.

### V52 — Código IPS2 del primer o único esquema

**Función técnica:** Validar IPS2 o no aplica.  
**Trazabilidad:** Depende de V50 y V51.  
**Datos involucrados:** V52, V50, V51.  
**Estado:** Cerrada.

---

## Módulo 11 — Medicamentos ATC del primer o único esquema · V53-V53.9

### V53 — Número de medicamentos antineoplásicos propuestos

**Función técnica:** Validar cantidad propuesta de medicamentos.  
**Trazabilidad:** Depende de V45 y se compara con medicamentos administrados en V53.1-V53.9.  
**Datos involucrados:** V53, V45, V53.1-V53.9.  
**Estado:** Cerrada.

### V53.1 — Medicamento administrado 1

**Función técnica:** Validar primer ATC administrado o 98 según V45.  
**Trazabilidad:** Depende de V45 y catálogo ATC.  
**Datos involucrados:** V53.1, V45, catálogo ATC.  
**Estado:** Cerrada.

### V53.2 — Medicamento administrado 2

**Función técnica:** Validar ATC, 97 o 98.  
**Trazabilidad:** Depende de V45, V53.1 y catálogo ATC.  
**Datos involucrados:** V53.2, V45, V53.1.  
**Estado:** Cerrada.

### V53.3 — Medicamento administrado 3

**Función técnica:** Validar ATC, 97 o 98.  
**Trazabilidad:** Depende de V45, medicamentos anteriores y catálogo ATC.  
**Datos involucrados:** V53.3, V45, V53.1-V53.2.  
**Estado:** Cerrada.

### V53.4 — Medicamento administrado 4

**Función técnica:** Validar ATC, 97 o 98.  
**Trazabilidad:** Depende de V45, medicamentos anteriores y catálogo ATC.  
**Datos involucrados:** V53.4, V45, V53.1-V53.3.  
**Estado:** Cerrada.

### V53.5 — Medicamento administrado 5

**Función técnica:** Validar ATC, 97 o 98.  
**Trazabilidad:** Depende de V45, medicamentos anteriores y catálogo ATC.  
**Datos involucrados:** V53.5, V45, V53.1-V53.4.  
**Estado:** Cerrada.

### V53.6 — Medicamento administrado 6

**Función técnica:** Validar ATC, 97 o 98.  
**Trazabilidad:** Depende de V45, medicamentos anteriores y catálogo ATC.  
**Datos involucrados:** V53.6, V45, V53.1-V53.5.  
**Estado:** Cerrada.

### V53.7 — Medicamento administrado 7

**Función técnica:** Validar ATC, 97 o 98.  
**Trazabilidad:** Depende de V45, medicamentos anteriores y catálogo ATC.  
**Datos involucrados:** V53.7, V45, V53.1-V53.6.  
**Estado:** Cerrada.

### V53.8 — Medicamento administrado 8

**Función técnica:** Validar ATC, 97 o 98.  
**Trazabilidad:** Depende de V45, medicamentos anteriores y catálogo ATC.  
**Datos involucrados:** V53.8, V45, V53.1-V53.7.  
**Estado:** Cerrada.

### V53.9 — Medicamento administrado 9

**Función técnica:** Validar ATC, 97 o 98.  
**Trazabilidad:** Depende de V45, medicamentos anteriores y catálogo ATC.  
**Datos involucrados:** V53.9, V45, V53.1-V53.8.  
**Estado:** Cerrada.

**Reglas técnicas transversales del módulo 11:**

- Si V45=98, V53 y V53.1-V53.9 deben responder como no aplica según su regla.
- Si V45=1, V53.1 debe traer ATC real; V53.2-V53.9 pueden traer ATC o 97.
- Si V45=1, V53.2-V53.9 con 98 es error.
- Si una variable V53.x tiene ATC, debe existir en catálogo ATC cargado.
- Saltos de ATC/97/ATC se manejan como advertencia cuando corresponde, no como error fuerte.
- No se automatiza soporte documental ni clasificación clínica fina sin datos estructurados.

---

## 5. Catálogos técnicos activos

| Catálogo | Registros validados | Uso |
|---|---:|---|
| CIE-10 | 556 | V17, V44 y reglas por diagnóstico |
| ATC | 304 | V53.1-V53.9 y futuro V54-V56 |
| CUPS | 1482 | Buscador de apoyo y variables futuras |
| REPS | Pendiente de catálogo completo | V25, V51, V52 y futuras IPS |
| CIUO | Pendiente de catálogo completo | V9 |

---

## 6. Exportador y reporte

**Archivo:** `src/exportador/excel-reporte.js`

Estado reciente:

- Se corrigió bug visual donde variables de catálogo como V36=98 podían verse como fecha `7/04/1900` en el reporte exportado.
- La corrección debe mantener variables de catálogo como texto/general.
- Las variables de fecha deben conservar tratamiento de fecha.
- El marcado rojo/amarillo debe permanecer funcional.

Versión de corrección recomendada:

```text
fix-export-formato-catalogos-v36-v54-01
```

---

## 7. Estado final de cierre hasta V53.9

| Bloque | Estado | Observación |
|---|---|---|
| V1-V16 | Cerrado | Identificación. |
| V17-V24 | Cerrado | Diagnóstico base. |
| V25-V28 | Cerrado | Confirmación, histología y diferenciación. |
| V29 | Cerrado | Estadificación principal. |
| V30-V33 | Cerrado | Fechas/resultados relacionados. |
| V34-V35 | Cerrado | Dukes. |
| V36-V40 | Cerrado | Ann Arbor, Gleason, riesgo, fecha riesgo y objetivo. |
| V41-V44 | Cerrado | Intervención y antecedente de otro cáncer. |
| V45-V47 | Cerrado | Terapia sistémica general. |
| V48-V52 | Cerrado | Primer o único esquema: ubicación, fecha e IPS. |
| V53-V53.9 | Cerrado | Medicamentos ATC 1 a 9. |

---

## 8. Siguiente paso fuera de este documento

La siguiente variable técnica será:

```text
Sprint 3F · Módulo 12A · V54
```

V54 no debe mezclarse con esta arquitectura cerrada hasta V53.9.  
Debe abrirse como nuevo bloque técnico con sus propias reglas, pruebas y versionado.

