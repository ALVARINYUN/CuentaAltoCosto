# Informe de pruebas funcionales — Validador CAC V1-V60

**Proyecto:** Validador CAC  
**Documento:** Informe de pruebas funcionales  
**Alcance revisado:** Variables V1 a V60  
**Ruta del proyecto:** `D:\cuentaALTOcosto\PROYECTO\validador-cac`  
**Entorno de ejecución:** `http://localhost:8000/`  
**Navegador usado:** Google Chrome  
**Estado del corte:** avance funcional validado hasta V60  
**Siguiente bloque pendiente:** V61 en adelante  

---

## 1. Objetivo

Este informe consolida las pruebas funcionales realizadas sobre el avance actual del Validador CAC, con corte en la variable V60.

El objetivo es dejar evidencia organizada de los bloques trabajados, las variables cerradas, los resultados obtenidos y los criterios usados para considerar funcional el avance hasta este punto.

Este documento no corresponde al cierre final del sistema completo. El proyecto continúa en desarrollo progresivo desde V61 hasta V134.

---

## 2. Alcance de la revisión

La revisión cubre el funcionamiento acumulativo de las variables implementadas desde V1 hasta V60.

| Bloque | Variables | Estado |
|---|---|---|
| Identificación del usuario | V1-V16 | Cerrado funcional |
| Diagnóstico, confirmación e histología | V17-V28 | Cerrado funcional |
| Estadificación inicial y complementarias | V29-V35 | Cerrado funcional |
| Linfomas, riesgo, intervención y antecedentes | V36-V44 | Cerrado funcional |
| Terapia sistémica inicial | V45-V53.9 | Cerrado funcional |
| Medicamentos adicionales | V54-V56 | Cerrado funcional |
| Cierre del primer o único esquema | V57-V60 | Cerrado funcional |

Quedan por fuera de este corte las variables V61-V134, que se trabajarán en bloques posteriores.

---

## 3. Entorno de prueba

| Elemento | Detalle |
|---|---|
| Equipo de ejecución | Equipo local de desarrollo |
| Ruta del proyecto | `D:\cuentaALTOcosto\PROYECTO\validador-cac` |
| Servidor local | `python -m http.server 8000` |
| URL de prueba | `http://localhost:8000/` |
| Navegador | Google Chrome |
| Tipo de aplicación | Aplicación local HTML, CSS y JavaScript |
| Fuente de datos | Archivos Excel de prueba controlados |

---

## 4. Criterios generales de prueba

Para considerar funcional una variable o bloque, se revisó que:

1. La estructura reconociera el encabezado de la variable.
2. El lector cargara correctamente los datos desde Excel.
3. El motor ejecutara el módulo correspondiente.
4. Las reglas generaran los errores esperados.
5. Los casos correctos no generaran hallazgos.
6. El resumen en pantalla coincidiera con los conteos esperados.
7. La consola permitiera verificar trazabilidad por fila.
8. El exportador marcara correctamente las celdas con error o advertencia.
9. No se generaran errores ajenos al bloque probado.
10. Las variables cerradas se mantuvieran activas en el avance acumulativo.

---

## 5. Módulos revisados

| Módulo | Archivo | Variables | Estado |
|---|---|---|---|
| Módulo 1 | `src/validaciones/reglas/modulo1.js` | V1-V16 | Cerrado |
| Módulo 2 | `src/validaciones/reglas/modulo2.js` | V17-V24 | Cerrado |
| Módulo 3 | `src/validaciones/reglas/modulo3.js` | V25-V28 | Cerrado |
| Módulo 4 | `src/validaciones/reglas/modulo4.js` | V29 | Cerrado |
| Módulo 5 | `src/validaciones/reglas/modulo5.js` | V30-V33 | Cerrado |
| Módulo 6 | `src/validaciones/reglas/modulo6.js` | V34-V35 | Cerrado |
| Módulo 7 | `src/validaciones/reglas/modulo7.js` | V36-V40 | Cerrado |
| Módulo 8 | `src/validaciones/reglas/modulo8.js` | V41-V44 | Cerrado |
| Módulo 9 | `src/validaciones/reglas/modulo9.js` | V45-V47 | Cerrado |
| Módulo 10 | `src/validaciones/reglas/modulo10.js` | V48-V52 | Cerrado |
| Módulo 11 | `src/validaciones/reglas/modulo11.js` | V53-V53.9 | Cerrado |
| Módulo 12 | `src/validaciones/reglas/modulo12.js` | V54-V56 | Cerrado |
| Módulo 13 | `src/validaciones/reglas/modulo13.js` | V57-V60 | Cerrado |

---

## 6. Pruebas funcionales por bloque

### 6.1 V1-V16 — Identificación del usuario

**Estado:** Cerrado funcional.

Se revisaron reglas de identificación, nombres, apellidos, tipo y número de documento, fecha de nacimiento, sexo, ocupación, régimen, EAPB, municipio, teléfono y fecha de afiliación.

**Validaciones revisadas:**

- Campos obligatorios.
- Formato de texto en nombres y apellidos.
- Catálogos cerrados.
- Fechas en formato `AAAA-MM-DD`.
- Coherencias entre tipo de documento, número de documento y régimen.
- Reglas de calidad del dato.

**Resultado:** bloque cerrado funcionalmente.

---

### 6.2 V17-V28 — Diagnóstico, confirmación e histología

**Estado:** Cerrado funcional.

Se revisaron reglas asociadas al diagnóstico del cáncer reportado, fechas de diagnóstico, remisión, ingreso, estudio diagnóstico, histopatología, IPS confirmadora, histología y grado de diferenciación.

**Validaciones revisadas:**

- CIE-10 contra catálogo.
- Fechas diagnósticas.
- Relación entre estudio diagnóstico e histopatología.
- Coherencias entre V21, V22, V23, V24, V27 y V28.
- Uso correcto de comodines.

**Resultado:** bloque cerrado funcionalmente.

---

### 6.3 V29-V35 — Estadificación inicial y variables complementarias

**Estado:** Cerrado funcional.

Se revisaron reglas de estadificación inicial, fechas relacionadas y variables complementarias según diagnóstico.

**Validaciones revisadas:**

- Estadificación según agrupador diagnóstico.
- Fechas relacionadas.
- Aplicabilidad por tipo de cáncer.
- Uso correcto de códigos de no aplica o sin información.

**Resultado:** bloque cerrado funcionalmente.

---

### 6.4 V36-V44 — Riesgo, intervención y antecedentes

**Estado:** Cerrado funcional.

Se revisaron reglas de Ann Arbor/Lugano, Gleason, clasificación de riesgo, fecha de riesgo, objetivo del tratamiento, intervención médica y antecedente de otro cáncer primario.

**Validaciones revisadas:**

- Aplicabilidad por diagnóstico.
- Catálogos específicos.
- Fechas asociadas.
- Trazabilidad con V17, V18 y variables relacionadas.
- Manejo de advertencias cuando la información requiere revisión.

**Resultado:** bloque cerrado funcionalmente.

---

### 6.5 V45-V53.9 — Terapia sistémica inicial y medicamentos base

**Estado:** Cerrado funcional.

Se revisaron reglas del primer o único esquema de terapia sistémica, incluyendo fases, ciclos, ubicación temporal, fecha de inicio, IPS y medicamentos antineoplásicos administrados.

**Validaciones revisadas:**

- V45 como variable de control del bloque.
- Aplicabilidad de variables dependientes.
- Fechas del primer o único esquema.
- IPS de suministro.
- Códigos ATC.
- Secuencia de medicamentos.
- Uso de 97 y 98 según instructivo.

**Resultado:** bloque cerrado funcionalmente.

---

### 6.6 V54-V56 — Medicamentos adicionales

**Estado:** Cerrado funcional.

Se revisaron los medicamentos antineoplásicos adicionales del primer o único esquema.

**Validaciones revisadas:**

- V54, V55 y V56 obligatorias dentro del bloque cuando están presentes.
- ATC válido o comodines permitidos.
- Coherencia con V45.
- No repetición de medicamentos ya registrados en V53.1-V53.9.
- No repetición entre medicamentos adicionales.
- Secuencia lógica entre V54, V55 y V56.

**Resultado:** bloque cerrado funcionalmente.

---

### 6.7 V57-V60 — Cierre del primer o único esquema

**Estado:** Cerrado funcional.

Se revisaron las variables de cierre del primer o único esquema: quimioterapia intratecal, fecha de finalización, características actuales y motivo de finalización prematura.

**Validaciones revisadas:**

- V57 contra V45.
- V58 contra V45 y V49.
- V59 contra V45.
- V60 contra V59.
- Formato de fechas.
- Catálogos cerrados.
- Uso de comodines según instructivo.
- Trazabilidad clara entre variables relacionadas.

**Resultado:** bloque cerrado funcionalmente.

---

## 7. Resultados de pruebas recientes documentadas

### V58 — Fecha de finalización del primer o único esquema

**Resultado validado:**

| Indicador | Resultado |
|---|---:|
| Pacientes procesados | 8 |
| Con errores | 5 |
| Con advertencias | 0 |
| Sin problemas | 3 |

**Códigos validados:**

```text
V58-ERROR-001
V58-ERROR-002
V58-ERROR-003
V58-ERROR-004
V58-ERROR-005
```

---

### V59 — Características actuales del primer o único esquema

**Resultado validado:**

| Indicador | Resultado |
|---|---:|
| Pacientes procesados | 8 |
| Con errores | 4 |
| Con advertencias | 0 |
| Sin problemas | 4 |

**Códigos validados:**

```text
V59-ERROR-001
V59-ERROR-002
V59-ERROR-003
V59-ERROR-004
```

---

### V60 — Motivo de finalización prematura

**Resultado validado:**

| Indicador | Resultado |
|---|---:|
| Pacientes procesados | 8 |
| Con errores | 4 |
| Con advertencias | 0 |
| Sin problemas | 4 |

**Códigos validados:**

```text
V60-ERROR-001
V60-ERROR-002
V60-ERROR-003
V60-ERROR-004
```

---

## 8. Validación del exportador

Durante el avance hasta V60 se revisó que el exportador:

- Reconozca variables simples y subvariables.
- Marque en rojo las celdas con error.
- Marque en amarillo las celdas con advertencia.
- No marque celdas sin hallazgo.
- Mantenga la estructura general del archivo.
- No confunda variables de catálogo con fechas.
- Identifique correctamente subvariables como `V53_2`, `V53_7` y similares.

**Estado:** funcional hasta el corte revisado.

---

## 9. Incidencias relevantes corregidas

Durante el desarrollo se corrigieron incidencias funcionales y visuales, entre ellas:

| Incidencia | Estado |
|---|---|
| Reconocimiento de encabezados largos y subvariables | Corregido |
| Marcado de subvariables en el exportador | Corregido |
| Visualización de advertencias en resumen | Corregido |
| Corrección del exportador para variables como V53_2 | Corregido |
| Ajustes de textos visibles para que sean más claros | En mejora continua |

---

## 10. Pendientes

| Pendiente | Estado |
|---|---|
| Implementar V61 | Siguiente paso |
| Continuar V62-V73 | Pendiente |
| Implementar cirugía V74-V85 | Pendiente |
| Implementar radioterapia V86-V105 | Pendiente |
| Implementar trasplante V106-V110 | Pendiente |
| Implementar tratamiento complementario V111-V124 | Pendiente |
| Implementar cierre del reporte V125-V134 | Pendiente |
| Consolidar catálogo de hallazgos continuo V1-V60 | Pendiente de integrar V29-V53.9 |
| Preparar documentación final para cliente | Al cierre del proyecto |

---

## 11. Riesgos y controles

| Riesgo | Control aplicado |
|---|---|
| Crear reglas no soportadas por instructivo | Revisar cada variable antes de implementar |
| Tocar variables cerradas sin necesidad | Mantener regla de no modificar salvo bug real |
| Generar errores basura en pruebas nuevas | Usar Excel limpio por variable |
| Marcar celdas incorrectas en exportador | Revisar exportación por variable |
| Adelantar cruces con variables futuras | Dejar trazabilidad pendiente hasta implementar la variable relacionada |

---


---

## 13. Prueba funcional con archivo amplio de prueba

**Nombre de la prueba:** Validación funcional V1-V60 con archivo amplio de prueba  
**Hoja validada:** ABRIL  
**Tipo de archivo:** archivo de prueba con estructura similar a la matriz operativa CAC  
**Uso del archivo:** validación funcional del sistema. No corresponde a información real de pacientes.  
**Versión de estructura usada:** `sprint-3g-v60-estructura-03-progresivo`  
**Modo detectado:** `ACUMULATIVO_V1_V60`  

### 13.1 Objetivo de la prueba

Validar que el sistema pueda cargar, reconocer, procesar y exportar un archivo amplio de prueba con encabezados equivalentes al formato CAC, incluyendo encabezados largos o cortados hasta V60.

Esta prueba se realizó después del ajuste progresivo en `estructura.js`, necesario para reconocer encabezados reales de plantilla como:

```text
v58fechadefinalizacindelprimerci
v59caractersticasactualesdelprim
v60motivofinalizacinprematuradep
```

### 13.2 Resultado general

| Indicador | Resultado |
|---|---:|
| Hoja validada | ABRIL |
| Registros leídos | 146 |
| Registros procesados | 146 |
| Modo de validación | ACUMULATIVO_V1_V60 |
| Estructura válida | Sí |
| Variables faltantes | 0 |
| Registros con errores | 49 |
| Registros con advertencias | 90 |
| Registros sin hallazgos | 7 |
| Hallazgos de tipo error | 81 |
| Tipos de hallazgo distintos | 65 |

### 13.3 Validación de estructura

La prueba confirmó que el sistema reconoció correctamente la estructura acumulativa V1-V60, sin variables faltantes.

Resultado observado en consola:

```text
versionEstructura: sprint-3g-v60-estructura-03-progresivo
hoja: ABRIL
filas: 146
modo: ACUMULATIVO_V1_V60
estructuraValida: true
faltantes: []
procesados: 146
conErrores: 49
conAdvertencias: 90
sinProblemas: 7
```

### 13.4 Resumen de principales hallazgos

Los hallazgos con mayor frecuencia fueron principalmente advertencias asociadas a información desconocida o pendiente de soporte documental.

| Código | Total | Tipo general |
|---|---:|---|
| V40-ADVERTENCIA-001 | 107 | Advertencia |
| V21-ADVERTENCIA-005 | 99 | Advertencia |
| V29-ADV-001 | 94 | Advertencia |
| V27-ADV-001 | 82 | Advertencia |
| V28-ERROR-006 | 19 | Error |
| V34-ADVERTENCIA-001 | 12 | Advertencia |
| V42-ADVERTENCIA-001 | 10 | Advertencia |
| V30-ADVERTENCIA-001 | 9 | Advertencia |
| V37-ADVERTENCIA-001 | 8 | Advertencia |
| V38-ADVERTENCIA-002 | 6 | Advertencia |
| V19-ERROR-007 | 5 | Error |
| V57-ERROR-002 | 3 | Error |
| V19-ERROR-008 | 3 | Error |
| V28-ERROR-004 | 3 | Error |

### 13.5 Errores detectados por bloque

La prueba generó 81 hallazgos de tipo error distribuidos en variables de identificación, diagnóstico, estadificación, antecedentes y terapia sistémica.

Variables con errores detectados:

```text
V13, V17, V19, V23, V24, V27, V28, V29, V30, V31, V34,
V36, V37, V38, V43, V44, V46.1-V46.7, V47, V49, V50,
V52, V53, V53.2, V56, V57, V58 y V59.
```

Esto indica que el sistema no falló por estructura ni por lectura del archivo. Los hallazgos corresponden a reglas de validación aplicadas sobre los datos del archivo de prueba.

### 13.6 Validación del exportador

Después de ejecutar la validación, se generó el reporte exportado. La prueba confirmó que el flujo de exportación funciona con un archivo de mayor volumen y con estructura acumulativa V1-V60.

Resultado:

```text
Carga del archivo: aprobada
Reconocimiento de encabezados: aprobado
Activación del botón validar: aprobada
Validación acumulativa V1-V60: aprobada
Exportación del reporte: aprobada
```

### 13.7 Observaciones

- El archivo usado en esta prueba corresponde a información de prueba.
- No debe documentarse como base real ni como información real de pacientes.
- La prueba permitió confirmar el reconocimiento de encabezados cortados o abreviados de la plantilla.
- Las advertencias más frecuentes se relacionan con datos desconocidos o no informados.
- Los errores deben interpretarse como inconsistencias detectadas en la información de prueba, no como fallas técnicas del validador.
- No se identificaron variables faltantes después del ajuste progresivo de estructura.

### 13.8 Conclusión de la prueba amplia

La prueba funcional con archivo amplio de prueba queda aprobada para el corte V1-V60.

El sistema cargó correctamente la hoja ABRIL, reconoció la estructura acumulativa V1-V60, permitió ejecutar la validación, procesó 146 registros y generó reporte exportado. Esta prueba confirma que el validador funciona correctamente sobre un archivo de mayor volumen con estructura similar a una matriz operativa CAC.

---

## 14. Conclusión del corte V1-V60

Con base en las pruebas realizadas, el Validador CAC cuenta con avance funcional cerrado hasta V60.

El sistema carga archivos Excel, reconoce encabezados, ejecuta reglas acumulativas, muestra resultados en pantalla y exporta reportes marcados. Las variables V1 a V60 permanecen como avance funcional validado, salvo ajustes futuros por bug real o mejoras de redacción que no cambien la lógica.

El siguiente paso del proyecto es continuar con V61, iniciando el bloque del último esquema de terapia sistémica.

---

## 15. Registro de actualización

| Fecha | Cambio documentado |
|---|---|
| Junio 2026 | Se agregó evidencia de prueba funcional con archivo amplio de prueba, hoja ABRIL, 146 registros, modo ACUMULATIVO_V1_V60. |
