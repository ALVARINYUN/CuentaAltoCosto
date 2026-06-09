# Informe de pruebas funcionales — Validador CAC V1-V66

**Proyecto:** Validador CAC  
**Documento:** Informe de pruebas funcionales  
**Alcance revisado:** Variables V1 a V66  
**Ruta del proyecto:** `D:\cuentaALTOcosto\PROYECTO\validador-cac`  
**Entorno:** `http://localhost:8000/`  
**Estado del corte:** avance funcional validado hasta V66  
**Siguiente variable:** V66.1  

---

## 1. Objetivo

Consolidar las pruebas funcionales realizadas sobre el avance actual del Validador CAC, con corte en V66.

---

## 2. Alcance

| Bloque | Variables | Estado |
|---|---|---|
| Identificación | V1-V16 | Cerrado funcional |
| Diagnóstico, confirmación e histología | V17-V28 | Cerrado funcional |
| Estadificación y complementarias | V29-V35 | Cerrado funcional |
| Riesgo, intervención y antecedentes | V36-V44 | Cerrado funcional |
| Terapia sistémica inicial | V45-V53.9 | Cerrado funcional |
| Medicamentos adicionales | V54-V56 | Cerrado funcional |
| Cierre del primer o único esquema | V57-V60 | Cerrado funcional |
| Último esquema: ubicación, fecha e IPS | V61-V65 | Cerrado funcional |
| Último esquema: medicamentos propuestos | V66 | Cerrado funcional |

---

## 3. Módulos revisados

| Módulo | Archivo | Variables | Estado |
|---|---|---|---|
| Módulo 1 | `modulo1.js` | V1-V16 | Cerrado |
| Módulo 2 | `modulo2.js` | V17-V24 | Cerrado |
| Módulo 3 | `modulo3.js` | V25-V28 | Cerrado |
| Módulo 4 | `modulo4.js` | V29 | Cerrado |
| Módulo 5 | `modulo5.js` | V30-V33 | Cerrado |
| Módulo 6 | `modulo6.js` | V34-V35 | Cerrado |
| Módulo 7 | `modulo7.js` | V36-V40 | Cerrado |
| Módulo 8 | `modulo8.js` | V41-V44 | Cerrado |
| Módulo 9 | `modulo9.js` | V45-V47 | Cerrado |
| Módulo 10 | `modulo10.js` | V48-V52 | Cerrado |
| Módulo 11 | `modulo11.js` | V53-V53.9 | Cerrado |
| Módulo 12 | `modulo12.js` | V54-V56 | Cerrado |
| Módulo 13 | `modulo13.js` | V57-V60 | Cerrado |
| Módulo 14 | `modulo14.js` | V61-V65 | Cerrado |
| Módulo 15 | `modulo15.js` | V66-V66.9 | En progreso: V66 cerrada |

---

## 4. V61-V65 — Último esquema: ubicación, fecha e IPS

**Estado:** Cerrado funcional.

Validaciones revisadas:

- Trazabilidad con V45.
- Uso de 97 y 98 según instructivo.
- V62 como fecha o 1845-01-01.
- V63 como número entero positivo o 98.
- V64 y V65 como código IPS de 12 dígitos o 98.
- Coherencia entre V63, V64 y V65.
- Exportador para V61-V65.

---

## 5. V66 — Número de medicamentos propuestos

**Estado:** Cerrado funcional.

Encabezado real confirmado:

```text
v66cuantosmedicamentosantineopls
```

Resultado validado con Excel de prueba V66:

| Indicador | Resultado |
|---|---:|
| Pacientes procesados | 11 |
| Con errores | 7 |
| Con advertencias | 2 |
| Sin problemas | 3 |
| Total de errores | 8 |
| Total de advertencias | 2 |

Códigos validados:

```text
V66-ERROR-001
V66-ERROR-002
V66-ERROR-003
V66-ERROR-004
V66-ERROR-005
V66-ERROR-006
V66-ERROR-007
```

Trazabilidad esperada validada:

```text
V61-ERROR-004
V61-ADVERTENCIA-001
```

---

## 6. Prueba con archivo amplio

Hoja validada: **ABRIL**  
Modo detectado: **ACUMULATIVO_V1_V66**

Resultado observado:

```text
hoja: ABRIL
filasLeidas: 146
estructuraValida: true
modo: ACUMULATIVO_V1_V66
faltantesEstructura: []
totalEsperadasHastaV66: 75
totalPresentes: 75
```

Versiones observadas:

```text
estructura: sprint-3h-v66-estructura-02-encabezado-real
engine: sprint-3h-v66-engine-modulo15-03-resumen-advertencias
modulo14: sprint-3h-v65-ips2-ultimo-esquema-01
modulo15: sprint-3h-v66-modulo15-medicamentos-ultimo-esquema-02-encabezado-real
```

Conclusión: la hoja ABRIL fue reconocida correctamente hasta V66, sin variables faltantes.

---

## 7. Incidencias corregidas

| Incidencia | Estado |
|---|---|
| Reconocimiento de encabezados largos y subvariables | Corregido |
| Marcado de subvariables en el exportador | Corregido |
| Visualización de advertencias en resumen | Corregido |
| Conteo de pacientes con advertencias aunque también tengan errores | Corregido |
| Ajustes de textos visibles | En mejora continua |

---

## 8. Pendientes

| Pendiente | Estado |
|---|---|
| Implementar V66.1 | Siguiente |
| Continuar V66.2-V66.9 | Pendiente |
| Implementar V67-V73 | Pendiente |
| Implementar V74-V134 | Pendiente |
| Preparar documentación final | Al cierre del proyecto |

---

## 9. Conclusión

El Validador CAC cuenta con avance funcional cerrado hasta V66.

El siguiente paso es continuar con **V66.1**, medicamento antineoplásico administrado 1 del último esquema.
