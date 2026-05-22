# Arquitectura de trazabilidad y pruebas V18 a V28

Este documento define la arquitectura lógica de las variables V18 a V28 del bloque de diagnóstico del cáncer en el Validador CAC.

El objetivo es que las pruebas se hagan con trazabilidad: cuando se pruebe una variable, las demás variables relacionadas deben quedar coherentes para evitar errores cruzados innecesarios.

---

## 1. Variables cubiertas

| Variable | Nombre funcional | Rol en la trazabilidad |
|---|---|---|
| V17 | Código CIE-10 de la neoplasia maligna reportada | Define el tipo de cáncer. Afecta V27 cuando V27=21 y, más adelante, V28=95 |
| V18 | Fecha de diagnóstico del cáncer reportado | Fecha clínica principal del diagnóstico. Se compara con V24 y V26 |
| V21 | Tipo de estudio con el que se diagnosticó el cáncer | Variable eje. Define si hubo histopatología o diagnóstico clínico exclusivamente |
| V22 | Motivo por el cual no tuvo diagnóstico por histopatología | Depende de V21 |
| V24 | Fecha del primer informe histopatológico válido | Depende de si hubo o no histopatología según V21 |
| V25 | Código de habilitación de la IPS confirmadora | Identifica la IPS donde se confirmó el diagnóstico. Por ahora no cruza con REPS completo |
| V26 | Fecha de primera consulta con médico tratante | Se compara con V18 |
| V27 | Histología del tumor | Depende de V21 y, para V27=21, de V17 |
| V28 | Grado de diferenciación del tumor sólido maligno | Depende de V21 y del tipo de tumor |

---

## 2. Variables eje de la arquitectura

### V17 — Tipo de cáncer

V17 define el diagnóstico CIE-10 del cáncer.

Se usa en trazabilidad principalmente para V27 cuando se registra célula pequeña.

Regla:

```txt
Si V27 = 21, entonces V17 debe ser cáncer de pulmón.
```

Valores correctos de V17 para permitir V27=21:

```txt
C34
C340
C341
C342
C343
C348
C349
```

Ejemplo correcto:

```txt
V17 = C349
V27 = 21
```

Ejemplo incorrecto:

```txt
V17 = C509
V27 = 21
```

---

### V18 — Fecha clínica del diagnóstico

V18 es la fecha clínica del diagnóstico del cáncer.

No es la fecha en que se reporta a la CAC.

Formato correcto:

```txt
AAAA-MM-DD
```

Valor especial:

```txt
1800-01-01 = desconocido, el dato no está descrito en soportes clínicos
```

V18 se relaciona con:

```txt
V24 = fecha del primer informe histopatológico válido
V26 = primera consulta con médico tratante
```

Reglas de trazabilidad:

```txt
V18 puede coincidir con V24 cuando el diagnóstico se basa directamente en histopatología.
V18 puede ser diferente de V24 si existe justificación clínica o administrativa.
V26 normalmente debe ser igual o posterior a V18.
Si V26 está antes de V18, debe generar advertencia, no error.
```

Ejemplo correcto con histopatología:

```txt
V18 = 2024-01-15
V21 = 5
V22 = 98
V24 = 2024-01-15
V26 = 2024-01-20
V27 = 1
V28 = 2
```

Ejemplo con advertencia V18/V24:

```txt
V18 = 2024-01-15
V24 = 2024-01-10
```

Ejemplo con advertencia V26 antes de V18:

```txt
V18 = 2024-01-15
V26 = 2024-01-10
```

---

### V21 — Tipo de estudio diagnóstico

V21 es la variable más importante de este bloque porque define si hubo histopatología o si el diagnóstico fue clínico exclusivamente.

Cuando:

```txt
V21 = 7
```

significa:

```txt
Diagnóstico clínico exclusivamente.
No se realizó estudio histopatológico.
```

Por eso afecta directamente a:

```txt
V22
V24
V27
V28
```

Combinación correcta cuando V21=7:

```txt
V21 = 7
V22 = 1, 2, 3, 4, 5, 6 o 99
V24 = 1845-01-01
V27 = 98
V28 = 98
```

Ejemplo correcto:

```txt
V17 = C509
V18 = 2024-01-15
V21 = 7
V22 = 1
V24 = 1845-01-01
V25 = 123456789012
V26 = 2024-01-20
V27 = 98
V28 = 98
```

---

## 3. Arquitectura general de dependencias

```txt
V17 define el tipo de cáncer
   ├── afecta V27 cuando V27=21
   └── más adelante puede afectar V28=95 cuando se cierre catálogo hematolinfático

V18 define la fecha clínica del diagnóstico
   ├── se compara con V24
   └── se compara con V26

V21 define si hubo histopatología o no
   ├── si V21=7 → V22 debe ser 1, 2, 3, 4, 5, 6 o 99
   ├── si V21=7 → V24 debe ser 1845-01-01
   ├── si V21=7 → V27 debe ser 98
   └── si V21=7 → V28 debe ser 98

V22 explica el motivo por el cual no hubo histopatología
   └── solo debe tomar motivo real cuando V21=7

V24 registra la fecha del primer informe histopatológico válido
   ├── si hubo histopatología → fecha real
   └── si V21=7 → 1845-01-01

V25 identifica la IPS confirmadora
   └── por ahora solo valida vacío, formato, longitud, 96 y 99

V26 registra la primera consulta con médico tratante
   └── se compara con V18

V27 registra la histología del tumor
   ├── V27=21 → V17 debe ser C34, C340, C341, C342, C343, C348 o C349
   ├── V27=98 → V21 debe ser 7
   └── si V21=7 → V27 debe ser 98

V28 registra el grado de diferenciación
   ├── V28=98 → V21 debe ser 7
   ├── si V21=7 → V28 debe ser 98
   └── V28=95 se reserva para cáncer no sólido / hematolinfático
```

---

## 4. Combinaciones correctas principales

Estas combinaciones sirven como base para construir archivos Excel de prueba.

La idea es modificar solo la variable que se quiere probar y dejar el resto coherente.

---

### Escenario A — Con histopatología normal

Usar cuando sí hubo biopsia, patología o estudio histopatológico.

```txt
V17 = C509
V18 = 2024-01-15
V21 = 5
V22 = 98
V24 = 2024-01-15
V25 = 123456789012
V26 = 2024-01-20
V27 = 1
V28 = 2
```

Valores correctos esperados:

```txt
V21 = diferente de 7
V22 = 98
V24 = fecha real
V27 = código histológico válido
V28 = código válido de grado
```

V27 permitido en este escenario:

```txt
1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
21, 23, 24, 99
```

Aclaración:

```txt
V27=21 solo si V17 es C34, C340, C341, C342, C343, C348 o C349.
```

V28 permitido en este escenario:

```txt
1, 2, 3, 4, 94, 95, 99
```

---

### Escenario B — Sin histopatología / diagnóstico clínico exclusivamente

Usar cuando no se realizó estudio histopatológico.

```txt
V17 = C509
V18 = 2024-01-15
V21 = 7
V22 = 1
V24 = 1845-01-01
V25 = 123456789012
V26 = 2024-01-20
V27 = 98
V28 = 98
```

Opciones correctas para V22 cuando V21=7:

```txt
1, 2, 3, 4, 5, 6 o 99
```

No usar:

```txt
V22 = 98
```

Reglas obligatorias:

```txt
Si V21=7, entonces V24=1845-01-01.
Si V21=7, entonces V27=98.
Si V21=7, entonces V28=98.
```

---

### Escenario C — Célula pequeña de pulmón

Usar cuando V27=21.

```txt
V17 = C349
V18 = 2024-01-15
V21 = 5
V22 = 98
V24 = 2024-01-15
V25 = 123456789012
V26 = 2024-01-20
V27 = 21
V28 = 3
```

Valores correctos de V17 para este escenario:

```txt
C34
C340
C341
C342
C343
C348
C349
```

Ejemplo incorrecto:

```txt
V17 = C509
V27 = 21
```

---

### Escenario D — Histología desconocida

Usar cuando el subtipo histológico no está descrito en los soportes clínicos.

```txt
V17 = C509
V18 = 2024-01-15
V21 = 5
V22 = 98
V24 = 2024-01-15
V25 = 123456789012
V26 = 2024-01-20
V27 = 99
V28 = 99
```

Regla:

```txt
V27=99 significa: desconocido, el dato no está descrito en soportes clínicos.
```

---

### Escenario E — Tumor sólido sin grado descrito

Usar cuando sí es tumor sólido, pero el reporte de patología no describe grado de diferenciación.

```txt
V17 = C509
V18 = 2024-01-15
V21 = 5
V22 = 98
V24 = 2024-01-15
V25 = 123456789012
V26 = 2024-01-20
V27 = 1
V28 = 94
```

Regla:

```txt
V28=94 significa que es tumor sólido, pero el reporte no describe diferenciación celular.
```

Puede aplicar en casos como:

```txt
Cáncer de tiroides
Carcinoma basocelular
Tumores in situ
Melanoma
Próstata sin descripción de grado de diferenciación
```

Aclaración:

```txt
En cáncer de próstata no se debe homologar Gleason a V28.
Si la patología no describe grado de diferenciación, usar V28=94.
```

---

### Escenario F — Cáncer no sólido / hematolinfático

Usar cuando el cáncer no es sólido.

```txt
V17 = código hematolinfático válido
V18 = 2024-01-15
V21 = 5
V22 = 98
V24 = 2024-01-15
V25 = 123456789012
V26 = 2024-01-20
V27 = 20
V28 = 95
```

Regla:

```txt
V28=95 significa que no es un tumor sólido.
```

Pendiente:

```txt
Cerrar catálogo de V17 hematolinfático antes de generar errores automáticos por cruce V17/V28=95.
```

---

### Escenario G — V26 antes de V18

Usar para probar advertencia de fechas.

```txt
V17 = C509
V18 = 2024-01-15
V21 = 5
V22 = 98
V24 = 2024-01-15
V25 = 123456789012
V26 = 2024-01-10
V27 = 1
V28 = 2
```

Resultado esperado:

```txt
Advertencia: V26 aparece antes de V18.
No debe ser error automático.
```

---

### Escenario H — V18 diferente de V24

Usar para probar advertencia entre diagnóstico y patología.

```txt
V17 = C509
V18 = 2024-01-15
V21 = 5
V22 = 98
V24 = 2024-01-10
V25 = 123456789012
V26 = 2024-01-20
V27 = 1
V28 = 2
```

Resultado esperado:

```txt
Advertencia: V18 y V24 son diferentes.
No debe ser error automático.
```

---

## 5. Tabla rápida de combinaciones válidas

| Escenario | V17 | V18 | V21 | V22 | V24 | V25 | V26 | V27 | V28 |
|---|---|---|---:|---:|---|---|---|---:|---:|
| Con histopatología | C509 | 2024-01-15 | 5 | 98 | 2024-01-15 | 123456789012 | 2024-01-20 | 1 | 2 |
| Sin histopatología | C509 | 2024-01-15 | 7 | 1-6 o 99 | 1845-01-01 | 123456789012 | 2024-01-20 | 98 | 98 |
| Célula pequeña pulmón | C349 | 2024-01-15 | 5 | 98 | 2024-01-15 | 123456789012 | 2024-01-20 | 21 | 3 |
| Histología desconocida | C509 | 2024-01-15 | 5 | 98 | 2024-01-15 | 123456789012 | 2024-01-20 | 99 | 99 |
| Tumor sólido sin grado | C509 | 2024-01-15 | 5 | 98 | 2024-01-15 | 123456789012 | 2024-01-20 | 1 | 94 |
| Cáncer no sólido | Pendiente catálogo | 2024-01-15 | 5 | 98 | 2024-01-15 | 123456789012 | 2024-01-20 | 20 | 95 |
| V26 antes de V18 | C509 | 2024-01-15 | 5 | 98 | 2024-01-15 | 123456789012 | 2024-01-10 | 1 | 2 |
| V18 diferente de V24 | C509 | 2024-01-15 | 5 | 98 | 2024-01-10 | 123456789012 | 2024-01-20 | 1 | 2 |

---

## 6. Reglas por variable para construir pruebas

### V18

Para probar V18, dejar coherente:

```txt
V21 = 5
V22 = 98
V24 = fecha real
V26 = igual o posterior a V18
V27 = código válido
V28 = código válido
```

Casos principales:

```txt
V18 vacía → error
V18 con formato incorrecto → error
V18 = 1800-01-01 → permitido como desconocido
V18 diferente de V24 → advertencia
```

---

### V21

Para probar V21, revisar impacto en:

```txt
V22
V24
V27
V28
```

Si V21=7:

```txt
V22 = 1, 2, 3, 4, 5, 6 o 99
V24 = 1845-01-01
V27 = 98
V28 = 98
```

Si V21 diferente de 7 y hubo histopatología:

```txt
V22 = 98
V24 = fecha real
V27 = código histológico válido
V28 = grado válido
```

---

### V22

Para probar V22:

```txt
Si V21=7 → V22 debe ser 1, 2, 3, 4, 5, 6 o 99.
Si V21 diferente de 7 → V22 puede ser 98 cuando no aplica motivo sin histopatología.
```

Caso incorrecto:

```txt
V21 = 7
V22 = 98
```

---

### V24

Para probar V24:

Con histopatología:

```txt
V21 = 5
V22 = 98
V24 = fecha real
V27 = código histológico válido
V28 = grado válido
```

Sin histopatología:

```txt
V21 = 7
V22 = 1, 2, 3, 4, 5, 6 o 99
V24 = 1845-01-01
V27 = 98
V28 = 98
```

---

### V25

Para probar V25, usar base coherente con histopatología:

```txt
V17 = C509
V18 = 2024-01-15
V21 = 5
V22 = 98
V24 = 2024-01-15
V26 = 2024-01-20
V27 = 1
V28 = 2
```

Valores correctos:

```txt
12 dígitos
96
99
```

Casos a probar:

```txt
V25 vacío → error
V25 con letras/símbolos/puntos/guiones/espacios → error
V25 con 12 dígitos → correcto
V25 con menos de 12 dígitos → advertencia
V25 con más de 12 dígitos → advertencia
V25=96 → permitido
V25=99 → permitido
```

---

### V26

Para probar V26:

```txt
V18 = fecha válida
V26 = fecha válida
```

Caso correcto:

```txt
V18 = 2024-01-15
V26 = 2024-01-20
```

Caso con advertencia:

```txt
V18 = 2024-01-15
V26 = 2024-01-10
```

---

### V27

Valores permitidos:

```txt
1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
21, 23, 24, 98, 99
```

Cruces:

```txt
V27=21 → V17 debe ser C34, C340, C341, C342, C343, C348 o C349
V27=98 → V21 debe ser 7
V21=7 → V27 debe ser 98
```

---

### V28

Valores permitidos:

```txt
1, 2, 3, 4, 94, 95, 98, 99
```

Cruces:

```txt
V28=98 → V21 debe ser 7
V21=7 → V28 debe ser 98
V28=95 → cáncer no sólido / hematolinfático
```

Decisión operativa actual:

```txt
No se aplica error automático por V28=99 con diagnóstico posterior a 2015-01-01.
```

---

## 7. Reglas pendientes por catálogo

Estas reglas no deben cerrarse como error fuerte hasta tener catálogo completo o decisión operativa confirmada.

| Regla pendiente | Estado |
|---|---|
| Validar V25 contra REPS completo | Pendiente catálogo REPS |
| Validar V28=95 contra V17 hematolinfático | Pendiente catálogo hematolinfático |
| Aplicar restricción V28=99 por fecha 2015 | No activa por decisión operativa actual |
| Validar catálogos externos ATC, CUPS, CIUO, EAPB | Pendientes de catálogo completo |

---

## 8. Uso para pruebas

Para probar una variable específica:

1. Seleccionar una combinación base correcta.
2. Cambiar solo la variable que se quiere probar.
3. Verificar que los hallazgos generados correspondan a esa variable.
4. Si aparecen errores de otras variables, revisar la combinación base antes de asumir que la regla está mal.

Ejemplo para probar V25:

```txt
Usar base con histopatología normal.
Cambiar solo V25.
No modificar V21, V22, V24, V27 ni V28.
```

Esto evita errores cruzados y permite validar variable por variable con trazabilidad.
