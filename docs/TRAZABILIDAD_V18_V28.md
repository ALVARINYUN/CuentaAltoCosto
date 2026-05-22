# Arquitectura completa de trazabilidad V18 a V28

Este documento describe la trazabilidad completa de las variables V18 a V28 del bloque de diagnóstico del cáncer en el Validador CAC.

No es una arquitectura general. Es una guía práctica para saber qué variable depende de cuál, qué valores son correctos, qué combinaciones deben usarse y qué errores o advertencias se esperan en las pruebas.

El objetivo es construir archivos Excel de prueba sin generar errores cruzados innecesarios.

---

## 1. Idea principal

Cuando se prueba una variable, no se debe llenar el resto de columnas al azar.

Ejemplo:

Si se quiere probar V25, no basta con cambiar V25. Las demás variables del bloque diagnóstico deben quedar coherentes:

```txt
V21 = 5
V22 = 98
V24 = 2024-01-15
V27 = 1
V28 = 2
```

Así, si aparece un hallazgo, se sabe que pertenece realmente a V25 y no a una incoherencia creada por otras columnas.

---

## 2. Variables eje

Las variables más importantes para la trazabilidad son:

| Variable | Por qué es importante |
|---|---|
| V17 | Define el tipo de cáncer. Afecta V27 cuando V27=21 y más adelante puede afectar V28=95 |
| V18 | Define la fecha clínica del diagnóstico. Se compara con V24 y V26 |
| V21 | Define si hubo histopatología o diagnóstico clínico exclusivamente. Afecta V22, V24, V27 y V28 |
| V24 | Define la fecha del primer informe histopatológico válido |
| V27 | Define la histología del tumor. Cruza con V17 y V21 |
| V28 | Define el grado de diferenciación. Cruza con V21 y, más adelante, con V17 para hematolinfáticos |

---

# 3. Arquitectura completa por variable

---

## V17 — Código CIE-10 del cáncer reportado

V17 define el tipo de cáncer.

Aunque V17 no pertenece directamente al bloque V18-V28, se necesita para validar reglas de V27 y, más adelante, V28.

### Relación de V17

```txt
V17 define el tipo de cáncer
   ├── afecta V27 cuando V27=21
   │      └── V27=21 solo aplica si V17 es cáncer de pulmón
   └── puede afectar V28 cuando V28=95
          └── V28=95 se reserva para cáncer no sólido / hematolinfático
```

### Cruce con V27

Si V27 es 21, entonces V17 debe ser cáncer de pulmón.

Valores permitidos de V17 para V27=21:

```txt
C34
C340
C341
C342
C343
C348
C349
```

### Combinación correcta

```txt
V17 = C349
V27 = 21
```

### Combinación incorrecta

```txt
V17 = C509
V27 = 21
```

Resultado esperado:

```txt
Error: V27=21 solo aplica para cáncer de pulmón.
```

---

## V18 — Fecha de diagnóstico del cáncer reportado

V18 es la fecha clínica del diagnóstico del cáncer.

No es la fecha en que se reporta a la Cuenta de Alto Costo.

### Valores válidos

```txt
AAAA-MM-DD
1800-01-01 = desconocido, el dato no está descrito en soportes clínicos
```

### Relación de V18

```txt
V18 define la fecha clínica de diagnóstico
   ├── se compara con V24
   │      ├── si V24 es igual a V18 → coherente
   │      └── si V24 es diferente de V18 → advertencia, no error
   └── se compara con V26
          ├── si V26 es igual o posterior a V18 → coherente
          └── si V26 es anterior a V18 → advertencia, no error
```

### V18 con histopatología

Cuando sí hubo histopatología, la combinación base correcta es:

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

### V18 diferente de V24

Ejemplo:

```txt
V18 = 2024-01-15
V24 = 2024-01-10
```

Resultado esperado:

```txt
Advertencia: la fecha de diagnóstico no coincide con la fecha del resultado de patología.
No debe ser error automático.
```

Explicación:

```txt
Puede ocurrir que el resultado de patología tenga una fecha y que el médico lo revise, confirme o registre después.
```

### V26 antes de V18

Ejemplo:

```txt
V18 = 2024-01-15
V26 = 2024-01-10
```

Resultado esperado:

```txt
Advertencia: la consulta con médico tratante aparece antes del diagnóstico.
No debe ser error automático.
```

Explicación:

```txt
Puede existir diferencia por registros administrativos, soportes cargados en fechas distintas o interpretación clínica.
```

---

## V21 — Tipo de estudio con el que se diagnosticó el cáncer

V21 es la variable central del bloque.

Define si hubo estudio histopatológico o si el diagnóstico fue clínico exclusivamente.

### Regla principal

```txt
V21 = 7 significa:
Diagnóstico clínico exclusivamente.
No se realizó estudio histopatológico.
```

### Relación de V21

```txt
V21 define si hubo histopatología o no
   ├── si V21=7 → V22 debe ser 1, 2, 3, 4, 5, 6 o 99
   ├── si V21=7 → V24 debe ser 1845-01-01
   ├── si V21=7 → V27 debe ser 98
   └── si V21=7 → V28 debe ser 98
```

### Combinación correcta cuando V21=7

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

Valores correctos para V22 cuando V21=7:

```txt
1, 2, 3, 4, 5, 6 o 99
```

### Combinación incorrecta cuando V21=7

```txt
V21 = 7
V22 = 98
V24 = 2024-01-15
V27 = 1
V28 = 2
```

Errores esperados:

```txt
V22 incorrecta porque debe explicar el motivo por el cual no hubo histopatología.
V24 incorrecta porque si V21=7 debe ser 1845-01-01.
V27 incorrecta porque si V21=7 debe ser 98.
V28 incorrecta porque si V21=7 debe ser 98.
```

---

## V22 — Motivo por el cual no tuvo diagnóstico por histopatología

V22 depende directamente de V21.

Sirve para explicar por qué no hubo diagnóstico por histopatología cuando V21=7.

### Relación de V22

```txt
V22 explica el motivo por el cual no hubo histopatología
   ├── si V21=7:
   │      └── V22 debe ser 1, 2, 3, 4, 5, 6 o 99
   └── si V21 es diferente de 7:
          └── V22 puede ser 98 porque no aplica motivo sin histopatología
```

### Combinación correcta sin histopatología

```txt
V21 = 7
V22 = 1
V24 = 1845-01-01
V27 = 98
V28 = 98
```

También son válidos:

```txt
V21 = 7
V22 = 2
V21 = 7
V22 = 3
V21 = 7
V22 = 4
V21 = 7
V22 = 5
V21 = 7
V22 = 6
V21 = 7
V22 = 99
```

### Combinación incorrecta

```txt
V21 = 7
V22 = 98
```

Resultado esperado:

```txt
Error: V22 no puede ser 98 cuando V21=7.
```

Explicación:

```txt
Si V21=7, no hubo histopatología.
Entonces V22 debe decir el motivo real por el cual no hubo histopatología.
V22=98 indica que no aplica, por eso no es coherente.
```

### Combinación correcta con histopatología

```txt
V21 = 5
V22 = 98
V24 = 2024-01-15
V27 = 1
V28 = 2
```

---

## V24 — Fecha del primer informe histopatológico válido

V24 es la fecha del primer resultado de biopsia o patología que confirmó el cáncer.

No es cualquier prueba posterior.

### Relación de V24

```txt
V24 registra la fecha del primer informe histopatológico válido
   ├── si hubo histopatología:
   │      ├── V21 debe ser diferente de 7
   │      ├── V22 debe ser 98
   │      ├── V24 debe ser fecha real
   │      ├── V27 debe ser código histológico válido
   │      └── V28 debe ser código válido de diferenciación
   └── si no hubo histopatología:
          ├── V21 debe ser 7
          ├── V22 debe ser 1, 2, 3, 4, 5, 6 o 99
          ├── V24 debe ser 1845-01-01
          ├── V27 debe ser 98
          └── V28 debe ser 98
```

### Combinación correcta con histopatología

```txt
V21 = 5
V22 = 98
V24 = 2024-01-15
V27 = 1
V28 = 2
```

### Combinación correcta sin histopatología

```txt
V21 = 7
V22 = 1
V24 = 1845-01-01
V27 = 98
V28 = 98
```

### V24 frente a V18

Combinación completamente coherente:

```txt
V18 = 2024-01-15
V24 = 2024-01-15
```

Resultado esperado:

```txt
Correcto.
```

Combinación con diferencia de fechas:

```txt
V18 = 2024-01-15
V24 = 2024-01-10
```

Resultado esperado:

```txt
Advertencia, no error.
```

Explicación:

```txt
Puede existir diferencia entre la fecha del resultado de patología y la fecha en que el médico registra o confirma el diagnóstico.
```

---

## V25 — Código válido de habilitación de la IPS confirmadora

V25 identifica la IPS donde se realizó la confirmación diagnóstica.

Por ahora no tiene cruce fuerte con otras variables porque no se cuenta con catálogo REPS completo.

### Relación de V25

```txt
V25 identifica la IPS confirmadora
   ├── no cruza todavía con REPS completo
   ├── no depende de V21
   ├── no depende de V24
   ├── no depende de V27
   └── se valida por vacío, formato, longitud, 96 y 99
```

### Valores correctos

```txt
96
99
Código numérico de 12 dígitos
```

Ejemplos correctos:

```txt
96
99
123456789012
000123456789
```

### Errores

```txt
V25 vacío → error
V25 con letras → error
V25 con símbolos → error
V25 con puntos → error
V25 con guiones → error
V25 con espacios internos → error
```

### Advertencias

```txt
V25 con menos de 12 dígitos → advertencia
V25 con más de 12 dígitos → advertencia
```

### Base recomendada para probar V25

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

En esa base se cambia solo V25.

Ejemplo de prueba V25 correcta:

```txt
V25 = 123456789012
```

Ejemplo de prueba V25 con advertencia:

```txt
V25 = 12345
```

Ejemplo de prueba V25 con error:

```txt
V25 = ABCD
```

---

## V26 — Fecha de primera consulta con médico tratante

V26 es la fecha de primera consulta con el médico tratante de la enfermedad maligna.

### Relación de V26

```txt
V26 registra la primera consulta con médico tratante
   └── se compara con V18
          ├── si V26 es igual o posterior a V18 → coherente
          └── si V26 es anterior a V18 → advertencia, no error
```

### Combinación correcta

```txt
V18 = 2024-01-15
V26 = 2024-01-20
```

Resultado esperado:

```txt
Correcto.
```

### Combinación con advertencia

```txt
V18 = 2024-01-15
V26 = 2024-01-10
```

Resultado esperado:

```txt
Advertencia: la consulta aparece antes del diagnóstico.
```

Explicación:

```txt
No debe ser error automático porque puede haber diferencias administrativas o registros en fechas distintas.
```

---

## V27 — Histología del tumor

V27 registra el subtipo histológico del tumor.

Debe ser un código numérico.

### Valores permitidos

```txt
1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
21, 23, 24, 98, 99
```

No existe:

```txt
22
```

### Relación de V27

```txt
V27 registra la histología del tumor
   ├── V27=21:
   │      └── V17 debe ser C34, C340, C341, C342, C343, C348 o C349
   ├── V27=98:
   │      └── V21 debe ser 7
   ├── si V21=7:
   │      └── V27 debe ser 98
   └── V27=99:
          └── desconocido, el dato no está descrito en soportes clínicos
```

### V27=21

```txt
V27=21 significa célula pequeña.
Solo aplica para cáncer de pulmón.
```

Combinación correcta:

```txt
V17 = C349
V27 = 21
```

Combinación incorrecta:

```txt
V17 = C509
V27 = 21
```

Resultado esperado:

```txt
Error: célula pequeña solo es válida para cáncer de pulmón.
```

### V27=98

```txt
V27=98 significa que no se realizó estudio histopatológico.
```

Combinación correcta:

```txt
V21 = 7
V27 = 98
```

Combinación incorrecta:

```txt
V21 = 5
V27 = 98
```

Resultado esperado:

```txt
Error: V27=98 solo aplica cuando V21=7.
```

### V21=7 obliga V27=98

Correcto:

```txt
V21 = 7
V27 = 98
```

Incorrecto:

```txt
V21 = 7
V27 = 1
```

Resultado esperado:

```txt
Error: si V21=7, V27 debe ser 98.
```

### V27=99

```txt
V27=99 significa:
Desconocido, el dato no está descrito en soportes clínicos.
```

Combinación correcta:

```txt
V21 = 5
V22 = 98
V24 = 2024-01-15
V27 = 99
```

Resultado esperado:

```txt
Advertencia: histología desconocida.
```

---

## V28 — Grado de diferenciación del tumor sólido maligno

V28 registra el grado de diferenciación del tumor según la biopsia diagnóstica o el informe de primera cirugía.

### Valores permitidos

```txt
1 = Bien diferenciado
2 = Moderadamente diferenciado
3 = Mal diferenciado
4 = Anaplásico o indiferenciado
94 = Tumor sólido cuyo reporte no describe diferenciación
95 = No es sólido / cáncer hematolinfático
98 = No se realizó estudio histopatológico
99 = No hay información en historia clínica
```

### Relación de V28

```txt
V28 registra el grado de diferenciación
   ├── V28=1,2,3,4:
   │      └── se usa cuando el reporte trae grado de diferenciación
   ├── V28=94:
   │      └── tumor sólido, pero el reporte no describe diferenciación
   ├── V28=95:
   │      └── cáncer no sólido / hematolinfático
   ├── V28=98:
   │      └── V21 debe ser 7
   ├── si V21=7:
   │      └── V28 debe ser 98
   └── V28=99:
          └── no hay información en historia clínica
```

### V28=1, 2, 3 o 4

Se usa cuando el reporte describe grado de diferenciación.

```txt
V28 = 1 → bien diferenciado
V28 = 2 → moderadamente diferenciado
V28 = 3 → mal diferenciado
V28 = 4 → anaplásico o indiferenciado
```

Ejemplo correcto:

```txt
V21 = 5
V22 = 98
V24 = 2024-01-15
V28 = 2
```

### V28=94

```txt
V28=94 significa:
Es tumor sólido, pero el reporte de patología no describe grado de diferenciación.
```

Puede aplicar en:

```txt
Cáncer de tiroides
Carcinoma basocelular
Tumores in situ
Melanoma
Próstata sin descripción de grado
```

Aclaración:

```txt
En cáncer de próstata no se debe convertir Gleason a V28.
Si la patología no describe grado de diferenciación, usar V28=94.
```

### V28=95

```txt
V28=95 significa:
No es tumor sólido, por ejemplo cáncer hematolinfático.
```

Pendiente:

```txt
El cruce automático V28=95 contra V17 queda pendiente hasta cerrar catálogo hematolinfático.
```

### V28=98

```txt
V28=98 significa que no se realizó estudio histopatológico.
```

Combinación correcta:

```txt
V21 = 7
V28 = 98
```

Combinación incorrecta:

```txt
V21 = 5
V28 = 98
```

Resultado esperado:

```txt
Error: V28=98 solo aplica cuando V21=7.
```

### V21=7 obliga V28=98

Correcto:

```txt
V21 = 7
V28 = 98
```

Incorrecto:

```txt
V21 = 7
V28 = 2
```

Resultado esperado:

```txt
Error: si V21=7, V28 debe ser 98.
```

### V28=99

```txt
V28=99 significa:
No hay información en la historia clínica.
```

Decisión operativa actual:

```txt
No se aplica por ahora error automático por V28=99 con diagnóstico posterior a 2015-01-01.
```

---

# 4. Combinaciones base para pruebas

## Base 1 — Con histopatología normal

Usar para probar variables que no dependen de ausencia de histopatología.

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

## Base 2 — Sin histopatología

Usar para probar reglas cuando V21=7.

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

## Base 3 — Célula pequeña de pulmón

Usar para probar V27=21 correcto.

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

## Base 4 — Histología desconocida

Usar para probar V27=99.

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

## Base 5 — Tumor sólido sin grado descrito

Usar para probar V28=94.

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

## Base 6 — Consulta antes del diagnóstico

Usar para probar advertencia V26 frente a V18.

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

## Base 7 — Diagnóstico diferente de patología

Usar para probar advertencia V18 frente a V24.

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

---

# 5. Tabla rápida de combinaciones correctas

| Escenario | V17 | V18 | V21 | V22 | V24 | V25 | V26 | V27 | V28 |
|---|---|---|---:|---:|---|---|---|---:|---:|
| Con histopatología | C509 | 2024-01-15 | 5 | 98 | 2024-01-15 | 123456789012 | 2024-01-20 | 1 | 2 |
| Sin histopatología | C509 | 2024-01-15 | 7 | 1,2,3,4,5,6 o 99 | 1845-01-01 | 123456789012 | 2024-01-20 | 98 | 98 |
| Célula pequeña pulmón | C349 | 2024-01-15 | 5 | 98 | 2024-01-15 | 123456789012 | 2024-01-20 | 21 | 3 |
| Histología desconocida | C509 | 2024-01-15 | 5 | 98 | 2024-01-15 | 123456789012 | 2024-01-20 | 99 | 99 |
| Tumor sólido sin grado | C509 | 2024-01-15 | 5 | 98 | 2024-01-15 | 123456789012 | 2024-01-20 | 1 | 94 |
| Consulta antes de diagnóstico | C509 | 2024-01-15 | 5 | 98 | 2024-01-15 | 123456789012 | 2024-01-10 | 1 | 2 |
| Diagnóstico diferente de patología | C509 | 2024-01-15 | 5 | 98 | 2024-01-10 | 123456789012 | 2024-01-20 | 1 | 2 |

---

# 6. Uso del documento para pruebas

Para probar una variable específica:

1. Elegir una combinación base correcta.
2. Cambiar solo la variable que se quiere probar.
3. Ejecutar el validador.
4. Revisar que los hallazgos generados correspondan a esa variable.
5. Si salen errores de otras variables, revisar primero la combinación base.

Ejemplo para probar V25:

```txt
Usar Base 1 — Con histopatología normal.
Cambiar solo V25.
No tocar V21, V22, V24, V27 ni V28.
```

Ejemplo para probar V27=21:

```txt
Usar Base 3 — Célula pequeña de pulmón.
Cambiar V17 a C509 para provocar el error esperado.
```

Ejemplo para probar V28=98:

```txt
Usar Base 1.
Cambiar V28 a 98.
Debe salir error porque V21 no es 7.
```

---

# 7. Reglas pendientes

Estas reglas quedan documentadas, pero no deben cerrarse como error fuerte hasta tener catálogo completo o decisión confirmada.

| Regla pendiente | Estado |
|---|---|
| Validar V25 contra REPS completo | Pendiente catálogo REPS |
| Validar V28=95 contra V17 hematolinfático | Pendiente catálogo hematolinfático |
| Aplicar restricción V28=99 por fecha 2015 | No activa por decisión operativa actual |
| Validar catálogos externos ATC, CUPS, CIUO, EAPB | Pendientes de catálogo completo |

---

# 8. Estado actual

Este documento aplica para las pruebas acumulativas del Validador CAC desde V18 hasta V28.

Las reglas cerradas no deben desactivarse ni modificarse salvo bug real.

Cada nuevo archivo Excel de prueba debe basarse en estas combinaciones para evitar hallazgos cruzados innecesarios.