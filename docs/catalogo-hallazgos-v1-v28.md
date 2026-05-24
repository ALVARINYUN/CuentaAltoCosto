# Catálogo maestro de hallazgos validados — V1 a V28

## Cobertura actual

**80 hallazgos extraídos del código actual y organizados para revisión manual hasta V28.**

- Errores documentados: **58**
- Advertencias documentadas: **22**
- Variables cubiertas en estructura: **V1 a V28**
- Total general del validador completo: **pendiente de cerrar** hasta documentar las 134 variables.

> Nota: este catálogo se construyó con la extracción actual de `src/validaciones/reglas/*.js`. Si una variable aparece sin hallazgos, significa que en el corte extraído no se encontraron códigos `Vx-ERROR` o `Vx-ADVERTENCIA` para esa variable. No se inventan reglas.

---

## Resumen por variable

| Variable | Nombre funcional | Hallazgos extraídos | Errores | Advertencias |
|---|---|---:|---:|---:|
| V1 | Primer nombre | 0 | 0 | 0 |
| V2 | Segundo nombre | 0 | 0 | 0 |
| V3 | Primer apellido | 0 | 0 | 0 |
| V4 | Segundo apellido | 0 | 0 | 0 |
| V5 | Tipo de identificación | 5 | 2 | 3 |
| V6 | Número de identificación | 5 | 1 | 4 |
| V7 | Fecha de nacimiento | 1 | 0 | 1 |
| V8 | Sexo | 0 | 0 | 0 |
| V9 | Ocupación | 4 | 3 | 1 |
| V10 | Régimen de afiliación | 0 | 0 | 0 |
| V11 | Código de EPS/EAPB | 1 | 1 | 0 |
| V12 | Pertenencia étnica | 3 | 3 | 0 |
| V13 | Grupo poblacional | 3 | 3 | 0 |
| V14 | Municipio de residencia | 3 | 3 | 0 |
| V15 | Teléfono | 7 | 4 | 3 |
| V16 | Fecha de afiliación | 2 | 1 | 1 |
| V17 | Código CIE-10 de la neoplasia maligna reportada | 7 | 5 | 2 |
| V18 | Fecha de diagnóstico del cáncer reportado | 1 | 0 | 1 |
| V19 | Fecha de remisión o interconsulta | 2 | 2 | 0 |
| V20 | Fecha de ingreso a la institución diagnóstica | 1 | 1 | 0 |
| V21 | Tipo de estudio diagnóstico | 4 | 3 | 1 |
| V22 | Motivo por el cual no tuvo diagnóstico por histopatología | 6 | 5 | 1 |
| V23 | Fecha de recolección de muestra | 4 | 4 | 0 |
| V24 | Fecha del primer informe histopatológico válido | 2 | 2 | 0 |
| V25 | Código de habilitación de la IPS confirmadora | 4 | 2 | 2 |
| V26 | Fecha de primera consulta con médico tratante | 4 | 3 | 1 |
| V27 | Histología del tumor | 6 | 5 | 1 |
| V28 | Grado de diferenciación del tumor sólido maligno | 5 | 5 | 0 |

---

# Catálogo detallado por variable


## V1 — Primer nombre

**Estado:** sin hallazgos extraídos en este corte del código.

Esto no significa que la variable no tenga validación; solo indica que en la extracción actual no apareció un código de hallazgo documentable para esta variable.


## V2 — Segundo nombre

**Estado:** sin hallazgos extraídos en este corte del código.

Esto no significa que la variable no tenga validación; solo indica que en la extracción actual no apareció un código de hallazgo documentable para esta variable.


## V3 — Primer apellido

**Estado:** sin hallazgos extraídos en este corte del código.

Esto no significa que la variable no tenga validación; solo indica que en la extracción actual no apareció un código de hallazgo documentable para esta variable.


## V4 — Segundo apellido

**Estado:** sin hallazgos extraídos en este corte del código.

Esto no significa que la variable no tenga validación; solo indica que en la extracción actual no apareció un código de hallazgo documentable para esta variable.


## V5 — Tipo de identificación

### 1. V5-ERROR-004 — Tipo AS no coincide con régimen

**Tipo:** Error.

**Qué pasa:**

El paciente está registrado como Adulto sin identificar (AS), pero su régimen 
no es subsidiado.

**Por qué importa / regla:**

AS solo es válido cuando V10 es S. En este caso V6 debe corresponder al 
consecutivo interno del afiliado.

**Qué hacer:**

Revise V10 y V16 contra BDUA o soporte de afiliación si aplica.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 2. V5-ERROR-005 — Tipo MS no coincide con régimen

**Tipo:** Error.

**Qué pasa:**

El paciente está registrado como Menor sin identificar (MS), pero su régimen 
no es subsidiado.

**Por qué importa / regla:**

MS solo es válido cuando V10 es S. En este caso V6 debe corresponder al 
consecutivo interno del afiliado.

**Qué hacer:**

Revise V5, V6 y V10. Corrija el régimen a S si corresponde, diligencie 
el consecutivo interno en V6 o cambie el tipo de identificación si AS no aplica.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 3. V5-ADVERTENCIA-006 — CN usado en paciente que no parece recién nacido

**Tipo:** Advertencia.

**Qué pasa:**

El tipo de identificación CN se usa, pero por la fecha de nacimiento el 
paciente no parece recién nacido.

**Por qué importa / regla:**

CN debería ser coherente con edad de recién nacido.

**Qué hacer:**

Revise V5, V6 y V10. Corrija el régimen a S si corresponde, diligencie 
el consecutivo interno en V6 o cambie el tipo de identificación si MS no aplica.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 4. V5-ADVERTENCIA-007 — RC usado en paciente adulto

**Tipo:** Advertencia.

**Qué pasa:**

El tipo de identificación RC se usa, pero el paciente parece adulto según la 
fecha de nacimiento.

**Por qué importa / regla:**

RC puede ser válido, pero en un adulto debe revisarse cuidadosamente.

**Qué hacer:**

Revise V5 y V7. Confirme si el tipo de identificación o la fecha de 
nacimiento están mal registrados.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 5. V5-ADVERTENCIA-008 — TI usada en paciente adulto

**Tipo:** Advertencia.

**Qué pasa:**

El tipo de identificación TI se usa, pero el paciente parece adulto según la 
fecha de nacimiento.

**Por qué importa / regla:**

RC puede ser válido, pero en un adulto debe revisarse cuidadosamente.

**Qué hacer:**

Revise V5 y V7. Confirme si corresponde CC u otro tipo documental.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---


## V6 — Número de identificación

### 1. V6-ERROR-002 — Número de identificación con caracteres no permitidos

**Tipo:** Error.

**Qué pasa:**

El número de identificación contiene caracteres no permitidos.

**Por qué importa / regla:**

Para tipos documentales alfanuméricos, V6 debe usar solo letras, números o guion 
cuando aplique. Para CC, CE, TI y RC debe ser exclusivamente numérico.

**Qué hacer:**

Retire espacios, símbolos o caracteres no permitidos.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 2. V6-ADVERTENCIA-008 — Longitud atípica para cédula de ciudadanía

**Tipo:** Advertencia.

**Qué pasa:**

La longitud del número de identificación parece atípica para CC.

**Por qué importa / regla:**

La cédula normalmente tiene una longitud esperada. Este valor debe revisarse.

**Qué hacer:**

Verifique V6 contra documento de identidad o BDUA.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 3. V6-ADVERTENCIA-009 — Longitud atípica para tarjeta de identidad

**Tipo:** Advertencia.

**Qué pasa:**

La longitud del número de identificación parece atípica para TI.

**Por qué importa / regla:**

La tarjeta de identidad debe tener una longitud razonable según el soporte.

**Qué hacer:**

Verifique V6 contra documento de identidad o BDUA.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 4. V6-ADVERTENCIA-010 — Longitud atípica para registro civil

**Tipo:** Advertencia.

**Qué pasa:**

La longitud del número de identificación parece atípica para RC.

**Por qué importa / regla:**

La tarjeta de identidad debe tener una longitud razonable según el soporte.

**Qué hacer:**

Verifique V6 contra documento de identidad o BDUA.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 5. V6-ADVERTENCIA-011 — Tipo SI requiere revisión de calidad del dato

**Tipo:** Advertencia.

**Qué pasa:**

El tipo SI indica que el paciente fue reportado sin identificación.

**Por qué importa / regla:**

El registro civil debe revisarse contra el soporte documental.

**Qué hacer:**

Verifique V6 contra registro civil o BDUA.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---


## V7 — Fecha de nacimiento

### 1. V7-ADVERTENCIA-006 — Edad calculada mayor a 120 años

**Tipo:** Advertencia.

**Qué pasa:**

La edad calculada del paciente es mayor a 120 años.

**Por qué importa / regla:**

Una edad mayor a 120 años puede ser posible, pero es inusual y debe revisarse.

**Qué hacer:**

Verifique contra BDUA o soporte institucional disponible. Si realmente 
aplica SI, conserve la evidencia o justificación interna del caso.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---


## V8 — Sexo

**Estado:** sin hallazgos extraídos en este corte del código.

Esto no significa que la variable no tenga validación; solo indica que en la extracción actual no apareció un código de hallazgo documentable para esta variable.


## V9 — Ocupación

### 1. V9-ERROR-001 — Ocupación vacía

**Tipo:** Error.

**Qué pasa:**

La ocupación está vacía.

**Por qué importa / regla:**

Una edad mayor a 120 años puede ser posible, pero es inusual y debe revisarse.

**Qué hacer:**

Verifique V7 contra BDUA o documento soporte.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 2. V9-ERROR-003 — Ocupación contiene letras o símbolos

**Tipo:** Error.

**Qué pasa:**

La ocupación contiene letras o símbolos.

**Por qué importa / regla:**

V9 debe ser numérica.

**Qué hacer:**

Use un código numérico de 4 dígitos.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 3. V9-ERROR-002 — Ocupación no tiene 4 dígitos

**Tipo:** Error.

**Qué pasa:**

La ocupación no tiene exactamente 4 dígitos.

**Por qué importa / regla:**

V9 debe tener 4 dígitos.

**Qué hacer:**

Use un código CIUO de 4 dígitos o comodines 9999 / 9998.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 4. V9-ADVERTENCIA-006 — Menor de edad con ocupación revisable

**Tipo:** Advertencia.

**Qué pasa:**

El paciente es menor de edad y tiene una ocupación diferente de 9998.

**Por qué importa / regla:**

Para menores de edad, normalmente aplica 9998 cuando la ocupación no 
corresponde.

**Qué hacer:**

Revise V7 y V9. Si el paciente es menor y no aplica ocupación, use 9998.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---


## V10 — Régimen de afiliación

**Estado:** sin hallazgos extraídos en este corte del código.

Esto no significa que la variable no tenga validación; solo indica que en la extracción actual no apareció un código de hallazgo documentable para esta variable.


## V11 — Código de EPS/EAPB

### 1. V11-ERROR-001 — Código de la EPS vacío

**Tipo:** Error.

**Qué pasa:**

El código de la EPS está vacío.

**Por qué importa / regla:**

V11 es obligatorio.

**Qué hacer:**

Revise V7 y V9. Si el paciente es menor y no aplica ocupación, use 9998.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---


## V12 — Pertenencia étnica

### 1. V12-ERROR-001 — Pertenencia étnica vacía

**Tipo:** Error.

**Qué pasa:**

La pertenencia étnica está vacía.

**Por qué importa / regla:**

V12 es obligatoria y solo acepta códigos del 1 al 6.

**Qué hacer:**

Diligencie V12 con un código válido: 1 Indígena, 2 ROM, 3 Raizal, 4 
Palenquero, 5 Afrodescendiente o 6 Ninguna.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 2. V12-ERROR-003 — Pertenencia étnica no numérica

**Tipo:** Error.

**Qué pasa:**

La pertenencia étnica contiene letras o símbolos.

**Por qué importa / regla:**

V12 debe ser numérica y solo acepta códigos del 1 al 6.

**Qué hacer:**

Reemplace el valor por un código válido: 1 Indígena, 2 ROM, 3 Raizal, 4 
Palenquero, 5 Afrodescendiente o 6 Ninguna.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 3. V12-ERROR-002 — Pertenencia étnica fuera de catálogo

**Tipo:** Error.

**Qué pasa:**

La pertenencia étnica no pertenece al catálogo permitido.

**Por qué importa / regla:**

V12 solo acepta códigos del 1 al 6.

**Qué hacer:**

Corrija V12 con un código válido: 1 Indígena, 2 ROM, 3 Raizal, 4 
Palenquero, 5 Afrodescendiente o 6 Ninguna.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---


## V13 — Grupo poblacional

### 1. V13-ERROR-001 — Grupo poblacional vacío

**Tipo:** Error.

**Qué pasa:**

El grupo poblacional está vacío.

**Qué hacer:**

Diligencie V13 con uno de los códigos permitidos.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 2. V13-ERROR-003 — Grupo poblacional no numérico

**Tipo:** Error.

**Qué pasa:**

El grupo poblacional contiene letras o símbolos.

**Qué hacer:**

Reemplace el valor por uno de los códigos permitidos.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 3. V13-ERROR-002 — Grupo poblacional fuera de catálogo

**Tipo:** Error.

**Qué pasa:**

El grupo poblacional no pertenece al catálogo permitido.

**Qué hacer:**

Corrija V13 con uno de los códigos permitidos.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---


## V14 — Municipio de residencia

### 1. V14-ERROR-001 — Municipio de residencia vacío

**Tipo:** Error.

**Qué pasa:**

El municipio de residencia está vacío.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 2. V14-ERROR-003 — Municipio de residencia con formato inválido

**Tipo:** Error.

**Qué pasa:**

El municipio de residencia contiene letras, espacios o símbolos.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 3. V14-ERROR-002 — Municipio de residencia no tiene 5 dígitos

**Tipo:** Error.

**Qué pasa:**

El código del municipio de residencia no tiene exactamente 5 dígitos.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---


## V15 — Teléfono

### 1. V15-ERROR-001 — Teléfono vacío

**Tipo:** Error.

**Qué pasa:**

El teléfono está vacío y no se usó el comodín 0.

**Por qué importa / regla:**

V15 debe tener máximo dos teléfonos o el comodín 0.

**Qué hacer:**

Diligencie un teléfono o use 0 si realmente no existe número disponible.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 2. V15-ADVERTENCIA-007 — Sin teléfono reportado

**Tipo:** Advertencia.

**Qué pasa:**

Se usó 0, que significa que no hay teléfono disponible.

**Por qué importa / regla:**

El comodín 0 puede usarse, pero indica ausencia de dato de contacto.

**Qué hacer:**

Verifique si realmente no existe número del paciente, familiar o 
cuidador.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 3. V15-ERROR-004 — Teléfonos separados con carácter incorrecto

**Tipo:** Error.

**Qué pasa:**

Los teléfonos están separados con un carácter diferente al guion medio.

**Por qué importa / regla:**

Si hay dos teléfonos, deben separarse con guion medio.

**Qué hacer:**

Verifique si realmente no existe número del paciente, familiar o 
cuidador.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 4. V15-ERROR-003 — Teléfono con caracteres no permitidos

**Tipo:** Error.

**Qué pasa:**

El teléfono contiene caracteres no permitidos.

**Por qué importa / regla:**

V15 solo debe contener números y guion medio.

**Qué hacer:**

Retire letras, espacios, paréntesis u otros símbolos.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 5. V15-ERROR-002 — Más de dos teléfonos registrados

**Tipo:** Error.

**Qué pasa:**

Se registraron más de dos teléfonos.

**Por qué importa / regla:**

V15 permite máximo dos teléfonos.

**Qué hacer:**

Deje máximo dos números separados por guion.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 6. V15-ADVERTENCIA-005 — Teléfono posiblemente incompleto

**Tipo:** Advertencia.

**Qué pasa:**

Uno o más teléfonos parecen incompletos.

**Por qué importa / regla:**

Un teléfono muy corto puede indicar mala captura del dato.

**Qué hacer:**

Verifique que el número esté completo.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 7. V15-ADVERTENCIA-006 — Teléfono con longitud inusual

**Tipo:** Advertencia.

**Qué pasa:**

Uno o más teléfonos superan la longitud usual de 10 dígitos.

**Por qué importa / regla:**

Un teléfono muy corto puede indicar mala captura del dato.

**Qué hacer:**

Verifique que el número esté completo.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---


## V16 — Fecha de afiliación

### 1. V16-ERROR-004 — Fecha de afiliación anterior al nacimiento

**Tipo:** Error.

**Qué pasa:**

La fecha de afiliación está registrada antes de la fecha de nacimiento del 
paciente.

**Por qué importa / regla:**

Una persona no puede estar afiliada antes de nacer.

**Qué hacer:**

Verifique si el número corresponde a un teléfono válido.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 2. V16-ADVERTENCIA-007 — Fecha de afiliación antigua

**Tipo:** Advertencia.

**Qué pasa:**

La fecha de afiliación es anterior a 1995-01-01.

**Por qué importa / regla:**

Como la fecha proviene de la BD, no se bloquea automáticamente; se deja como 
advertencia de revisión.

**Qué hacer:**

Revise V7 y V16. Normalmente se debe corregir V16, salvo que la fecha de 
nacimiento también esté mal.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---


## V17 — Código CIE-10 de la neoplasia maligna reportada

### 1. V17-ERROR-001 — Código CIE-10 vacío

**Tipo:** Error.

**Qué pasa:**

El código CIE-10 de la neoplasia maligna reportada está vacío.

**Por qué importa / regla:**

TI normalmente no debería mantenerse en paciente adulto sin revisión.

**Qué hacer:**

Revise V5 y V7. Confirme si corresponde CC u otro tipo documental.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 2. V17-ERROR-002 — Código CIE-10 con formato inválido

**Tipo:** Error.

**Qué pasa:**

El código CIE-10 no cumple el formato esperado para la variable V17.

**Por qué importa / regla:**

El código debe venir limpio, sin puntos, espacios, guiones ni sufijos internos. 
Ejemplos válidos de estructura: C509, C61X, D050.

**Qué hacer:**

Revise el código contra el catálogo operativo CAC y retire puntos, 
guiones, espacios o sufijos no permitidos.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 3. V17-ERROR-004 — Código CIE-10 no existe en el catálogo CAC 2025

**Tipo:** Error.

**Por qué importa / regla:**

V17 debe corresponder a un código incluido en el archivo operativo CIE-10 CAC 
vigente.

**Qué hacer:**

Verifique el diagnóstico y reemplace el valor por un código CIE-10 
existente en el catálogo operativo CAC.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 4. V17-ERROR-003 — C80X no es válido

**Tipo:** Error.

**Qué pasa:**

El código C80X Tumor maligno de sitios no especificados no es válido para el 
reporte.

**Por qué importa / regla:**

El instructivo indica que C80X fue eliminado del archivo operativo y debe 
ajustarse al CIE-10 correcto.

**Qué hacer:**

Verifique el diagnóstico y reemplace C80X por el código CIE-10 
específico.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 5. V17-ERROR-006 — Código CIE-10 no corresponde al sexo del paciente

**Tipo:** Error.

**Por qué importa / regla:**

El catálogo operativo CIE-10 CAC indica que este código requiere revisión por 
género.

**Qué hacer:**

Revise V8 y V17 contra el soporte clínico. Corrija el sexo o el código 
CIE-10 según corresponda.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 6. V17-ADVERTENCIA-007 — Código CIE-10 con restricción de edad mayor de edad

**Tipo:** Advertencia.

**Por qué importa / regla:**

El catálogo operativo CIE-10 CAC indica que este código requiere revisión por 
edad.

**Qué hacer:**

Revise V8 y V17 contra el soporte clínico. Corrija el sexo o el código 
CIE-10 según corresponda.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 7. V17-ADVERTENCIA-008 — C960 requiere revisión diagnóstica específica

**Tipo:** Advertencia.

**Qué pasa:**

C960 es exclusivo para Enfermedad de Letterer-Siwe según la observación del 
catálogo CAC.

**Por qué importa / regla:**

El catálogo operativo CIE-10 CAC marca C960 como exclusivo para Enfermedad de 
Letterer-Siwe.

**Qué hacer:**

Revise V7, V18 y V17 contra el soporte clínico. Si el caso es 
correcto, conserve el soporte; si no, corrija el dato correspondiente.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---


## V18 — Fecha de diagnóstico del cáncer reportado

### 1. V18-ADVERTENCIA-007 — La fecha del diagnóstico no coincide con la fecha del resultado de patología

**Tipo:** Advertencia.

**Qué pasa:**

V18 y V24 tienen fechas diferentes. En palabras simples: la fecha reportada 
como diagnóstico del cáncer no es la misma fecha en que salió el resultado de biopsia o patología.

**Por qué importa / regla:**

Cuando el diagnóstico se basa en biopsia o patología, normalmente la fecha del 
diagnóstico reportado debe coincidir con la fecha del resultado de patología.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---


## V19 — Fecha de remisión o interconsulta

### 1. V19-ERROR-007 — La remisión o interconsulta aparece después del ingreso diagnóstico

**Tipo:** Error.

**Por qué importa / regla:**

Primero debe existir la remisión, interconsulta o sospecha documentada; después 
ocurre el ingreso a la institución o servicio que realiza el diagnóstico. Por eso V19 debe ser menor o igual a V20 cuando ambas fechas son 
reales.

**Qué hacer:**

Revise en la historia clínica cuál fue primero: la remisión/interconsulta 
o el ingreso a la institución diagnóstica. Corrija V19 si la remisión está mal digitada, o corrija V20 si el ingreso está mal digitado. 
Use 1800-01-01 solo si esa fecha no aparece en los soportes clínicos.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 2. V19-ERROR-008 — La remisión o interconsulta aparece después del diagnóstico

**Tipo:** Error.

**Por qué importa / regla:**

La remisión, interconsulta o sospecha que llevó al diagnóstico debe ocurrir antes 
o el mismo día del diagnóstico. Por eso V19 debe ser menor o igual a V18 cuando ambas fechas son reales.

**Qué hacer:**

Revise el soporte de remisión/interconsulta y la fecha de diagnóstico. 
Corrija V19 si la remisión está mal digitada, o corrija V18 si la fecha de diagnóstico correcta es otra. Use 1800-01-01 solo si la fecha 
no aparece en los soportes clínicos.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---


## V20 — Fecha de ingreso a la institución diagnóstica

### 1. V20-ERROR-007 — El ingreso a la institución diagnóstica aparece después del diagnóstico

**Tipo:** Error.

**Por qué importa / regla:**

El ingreso a la institución, servicio o laboratorio que realizó el diagnóstico 
debe ser anterior o igual a la fecha en que se confirma el diagnóstico. En diagnóstico clínico V20 y V18 pueden ser iguales; en 
diagnóstico histopatológico, V20 normalmente ocurre antes o el mismo día del diagnóstico.

**Qué hacer:**

Revise la fecha de ingreso, atención diagnóstica o ingreso de la muestra 
al laboratorio, según aplique, y compárela con la fecha de diagnóstico. Corrija V20 si el ingreso está mal digitado, o V18 si la fecha de 
diagnóstico correcta es otra. Use 1800-01-01 solo si la fecha no aparece en los soportes clínicos.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---


## V21 — Tipo de estudio diagnóstico

### 1. V21-ERROR-001 — Tipo de estudio diagnóstico vacío

**Tipo:** Error.

**Qué pasa:**

El tipo de estudio con el que se realizó el diagnóstico está vacío.

**Por qué importa / regla:**

V21 es obligatorio y para pacientes nuevos acepta 5, 6, 7, 8, 9, 10 o 99.

**Qué hacer:**

Verifique que el soporte clínico corresponda a Enfermedad de 
Letterer-Siwe.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 2. V21-ERROR-002 — Tipo de estudio diagnóstico no numérico

**Tipo:** Error.

**Qué pasa:**

V21 contiene letras, espacios o símbolos.

**Por qué importa / regla:**

V21 debe ser numérica.

**Qué hacer:**

Use uno de estos códigos: 5, 6, 7, 8, 9, 10, 99.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 3. V21-ADVERTENCIA-003 — Código histórico en tipo de estudio diagnóstico

**Tipo:** Advertencia.

**Por qué importa / regla:**

Las opciones 1, 2, 3 y 4 pertenecen al histórico de pacientes antiguos reportados 
antes del 2020. En el instructivo actual para pacientes reportados por primera vez se usan las opciones 5, 6, 7, 8, 9, 10 y 99.

**Qué hacer:**

Revise si el paciente corresponde a un caso histórico o prevalente. Si es 
un paciente reportado por primera vez a la CAC, registre la opción actual que corresponda; si aplica patología básica, use 10.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 4. V21-ERROR-004 — Tipo de estudio diagnóstico fuera de catálogo

**Tipo:** Error.

**Qué pasa:**

V21 registra un código que no corresponde a ninguna opción permitida para el 
tipo de estudio diagnóstico.

**Por qué importa / regla:**

V21 debe indicar el primer estudio que permitió confirmar el cáncer. Las opciones 
vigentes son: 5 Inmunohistoquímica, 6 Citometría de flujo, 7 Clínica exclusivamente, 8 Otro, 9 Genética, 10 Patología básica y 99 
Desconocido. Las opciones 1, 2, 3 y 4 solo se consideran históricas.

**Qué hacer:**

Revise el soporte clínico que confirmó el diagnóstico y reemplace V21 por 
una opción válida: 5, 6, 7, 8, 9, 10 o 99. Si el valor corresponde a un histórico 1, 2, 3 o 4, debe quedar como observación de revisión, 
no como código fuera de catálogo.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---


## V22 — Motivo por el cual no tuvo diagnóstico por histopatología

### 1. V22-ERROR-001 — Motivo sin histopatología vacío

**Tipo:** Error.

**Qué pasa:**

V22 está vacío aunque V21 indica diagnóstico clínico exclusivamente.

**Por qué importa / regla:**

Si V21 = 7, V22 es obligatorio y debe explicar por qué no hubo diagnóstico por 
histopatología.

**Qué hacer:**

Diligencie V22 con uno de estos códigos: 1, 2, 3, 4, 5, 6 o 99.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 2. V22-ERROR-002 — Motivo sin histopatología vacío

**Tipo:** Error.

**Qué pasa:**

V22 está vacío.

**Por qué importa / regla:**

V22 debe diligenciarse según el catálogo. Si sí hubo histopatología, use 98.

**Qué hacer:**

Use 98 cuando el diagnóstico tuvo confirmación por histopatología, o el 
motivo correspondiente si V21 = 7.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 3. V22-ERROR-003 — Motivo sin histopatología no numérico

**Tipo:** Error.

**Qué pasa:**

V22 contiene letras, espacios o símbolos.

**Por qué importa / regla:**

V22 debe ser numérica.

**Qué hacer:**

Use un código válido del catálogo: 1, 2, 3, 4, 5, 6, 98 o 99.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 4. V22-ERROR-004 — Motivo sin histopatología fuera de catálogo

**Tipo:** Error.

**Qué pasa:**

V22 no pertenece al catálogo permitido.

**Por qué importa / regla:**

V22 solo acepta 1, 2, 3, 4, 5, 6, 98 o 99.

**Qué hacer:**

Corrija V22 con un código válido.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 5. V22-ERROR-005 — Motivo incoherente con diagnóstico clínico

**Tipo:** Error.

**Qué pasa:**

V22 indica confirmación por histopatología, pero V21 está marcado como 
diagnóstico clínico exclusivamente.

**Por qué importa / regla:**

Si V21 = 7, V22 debe ser 1, 2, 3, 4, 5, 6 o 99. No debe ser 98.

**Qué hacer:**

Revise V21 y V22. Si no hubo histopatología, registre el motivo real; si 
sí hubo histopatología, V21 no debería ser 7.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 6. V22-ADVERTENCIA-006 — Revise V22: puede no corresponder al tipo de diagnóstico registrado

**Tipo:** Advertencia.

**Qué pasa:**

V21 indica que el diagnóstico no fue clínico exclusivamente, pero V22 no está 
registrado como 98.

**Por qué importa / regla:**

V22 explica por qué no hubo diagnóstico por histopatología. Cuando V21 es 
diferente de 7, normalmente se entiende que sí hubo un estudio de confirmación; por eso V22 debería ser 98: Tiene confirmación por 
histopatología.

**Qué hacer:**

Revise primero V21. Si el cáncer se confirmó por patología básica, 
inmunohistoquímica, citometría, genética u otro estudio, normalmente V22 debe ser 98. Si realmente no se hizo histopatología y el 
diagnóstico fue clínico, revise si V21 debería ser 7 y registre en V22 el motivo correspondiente.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---


## V23 — Fecha de recolección de muestra

### 1. V23-ERROR-007 — V23 debe indicar que no hubo muestra histopatológica

**Tipo:** Error.

**Qué pasa:**

V21 está registrado como 7, es decir, diagnóstico clínico exclusivamente. En 
ese caso no hubo estudio histopatológico, por eso V23 debe ser 1845-01-01.

**Por qué importa / regla:**

1845-01-01 significa: No se realizó estudio histopatológico. Este comodín 
aplica en V23 cuando V21 = 7.

**Qué hacer:**

Si el diagnóstico fue clínico exclusivamente y no se tomó muestra para 
histopatología, registre V23 como 1845-01-01. Si sí se tomó muestra, registre la fecha real de recolección; si esa fecha no aparece en los 
soportes, use 1800-01-01. Si sí hubo patología, revise V21 porque probablemente no debe ser 7.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 2. V23-ERROR-008 — V23 usa 1845-01-01 sin diagnóstico clínico exclusivo

**Tipo:** Error.

**Qué pasa:**

V23 dice que no se realizó estudio histopatológico, pero V21 indica que el 
diagnóstico sí se hizo por un estudio diferente a clínica exclusiva.

**Por qué importa / regla:**

1845-01-01 en V23 solo aplica cuando V21 = 7, porque ese valor significa que no 
se realizó estudio histopatológico.

**Qué hacer:**

Revise V21 y V23. Si sí se tomó muestra, registre en V23 la fecha real 
de recolección. Si esa fecha no aparece en los soportes clínicos, use 1800-01-01. Use 1845-01-01 solo cuando V21 = 7, es decir, cuando no 
se realizó histopatología y el diagnóstico fue clínico exclusivamente.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 3. V23-ERROR-009 — La muestra aparece tomada después del informe histopatológico

**Tipo:** Error.

**Por qué importa / regla:**

Primero se toma la muestra, biopsia o pieza quirúrgica; después se emite el 
informe histopatológico. Por eso V23 debe ser menor o igual a V24 cuando ambas fechas son reales.

**Qué hacer:**

Revise el reporte de patología y la nota de procedimiento o cirugía. 
Primero debe estar la fecha en que se tomó la muestra, biopsia o pieza quirúrgica (V23), y después la fecha del informe de patología 
(V24). Corrija V23 o V24 según el soporte. Si alguna de esas fechas no aparece en los soportes, use 1800-01-01 en la variable 
correspondiente.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 4. V23-ERROR-010 — La muestra aparece después de la fecha de diagnóstico

**Tipo:** Error.

**Por qué importa / regla:**

Cuando la muestra hizo parte de la confirmación diagnóstica, la recolección debe 
ocurrir antes o el mismo día de la fecha de diagnóstico reportada. Esta comparación solo se hace cuando ambas fechas son reales.

**Qué hacer:**

Revise V18 y V23 contra el soporte clínico. Si la muestra fue tomada 
antes del diagnóstico, corrija V23. Si la fecha de diagnóstico correcta es posterior, corrija V18. Use 1800-01-01 solo si la fecha no está 
descrita en los soportes clínicos.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---


## V24 — Fecha del primer informe histopatológico válido

### 1. V24-ERROR-007 — V24 debe indicar que no hubo informe histopatológico

**Tipo:** Error.

**Qué pasa:**

V21 está registrado como 7, es decir, diagnóstico clínico exclusivamente. En 
ese caso no hubo informe histopatológico, por eso V24 debe ser 1845-01-01.

**Por qué importa / regla:**

1845-01-01 significa: No se realizó estudio histopatológico. Este comodín 
aplica en V24 cuando V21 = 7.

**Qué hacer:**

Si el diagnóstico fue clínico exclusivamente y no existe informe 
histopatológico, registre V24 como 1845-01-01. Si sí existe informe de patología, registre la fecha real del primer informe válido; si esa 
fecha no aparece en los soportes, use 1800-01-01. Si sí hubo patología, revise V21 porque probablemente no debe ser 7.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 2. V24-ERROR-008 — V24 usa 1845-01-01 sin diagnóstico clínico exclusivo

**Tipo:** Error.

**Qué pasa:**

V24 dice que no hubo informe histopatológico, pero V21 indica que el 
diagnóstico sí se hizo por un estudio diferente a clínica exclusiva.

**Por qué importa / regla:**

1845-01-01 en V24 solo aplica cuando V21 = 7, porque ese valor significa que no 
se realizó estudio histopatológico.

**Qué hacer:**

Revise V21 y V24. Si sí existe informe de patología, registre en V24 la 
fecha real del primer informe válido. Si esa fecha no aparece en los soportes clínicos, use 1800-01-01. Use 1845-01-01 solo cuando V21 = 
7, es decir, cuando no se realizó histopatología y el diagnóstico fue clínico exclusivamente.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---


## V25 — Código de habilitación de la IPS confirmadora

### 1. V25-ERROR-001 — Código de IPS de confirmación diagnóstica obligatorio

**Tipo:** Error.

**Qué pasa:**

V25 está vacío. Debe registrar el código de habilitación de la IPS donde se 
confirmó el diagnóstico, 96 si el diagnóstico fue fuera del país o 99 si el dato es desconocido en los soportes.

**Por qué importa / regla:**

Cuando el diagnóstico se basa en biopsia o patología, normalmente la fecha del 
diagnóstico reportado debe coincidir con la fecha del resultado de patología.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 2. V25-ERROR-002 — Código de IPS con caracteres no permitidos

**Tipo:** Error.

**Qué pasa:**

V25 solo permite un código REPS numérico de 12 dígitos, 96 o 99.

**Por qué importa / regla:**

V25 debe contener un código REPS de 12 dígitos, 96 o 99.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 3. V25-ADVERTENCIA-003 — ALTA PRIORIDAD: CÓDIGO DE IPS MENOR A 12 DÍGITOS

**Tipo:** Advertencia.

**Qué pasa:**

V25 tiene menos de 12 dígitos. No se bloquea como error, pero requiere revisión 
porque puede faltar un cero inicial, código de sede o actualización REPS.

**Por qué importa / regla:**

El código de habilitación REPS debe ser numérico y conservar 12 dígitos, incluido 
el cero inicial cuando aplique.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 4. V25-ADVERTENCIA-004 — ALTA PRIORIDAD: CÓDIGO DE IPS MAYOR A 12 DÍGITOS

**Tipo:** Advertencia.

**Qué pasa:**

V25 tiene más de 12 dígitos. No se bloquea como error, pero requiere revisión 
porque puede ser un código concatenado, un error de pegado o un dato mal digitado.

**Por qué importa / regla:**

V25 debería tener 12 dígitos cuando corresponde a código REPS, pero por operación 
los códigos de menor longitud quedan como advertencia.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---


## V26 — Fecha de primera consulta con médico tratante

### 1. V26-ERROR-001 — Fecha de primera consulta con médico tratante obligatoria

**Tipo:** Error.

**Qué pasa:**

V26 está vacío. Debe registrar la fecha de la primera consulta con el médico 
especialista que define la primera conducta terapéutica, o 1800-01-01 si el dato no está descrito en los soportes.

**Por qué importa / regla:**

V25 debería tener 12 dígitos cuando corresponde a código REPS, pero por operación 
los códigos de mayor longitud quedan como advertencia.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 2. V26-ERROR-002 — Formato de fecha incorrecto en V26

**Tipo:** Error.

**Qué pasa:**

V26 debe tener formato AAAA-MM-DD. No se aceptan fechas con barras, texto, 
día/mes/año ni valores incompletos.

**Por qué importa / regla:**

V26 debe estar en formato AAAA-MM-DD o usar 1800-01-01 como desconocido.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 3. V26-ERROR-003 — Fecha inexistente en V26

**Tipo:** Error.

**Qué pasa:**

V26 tiene formato AAAA-MM-DD, pero no corresponde a una fecha real del 
calendario.

**Por qué importa / regla:**

El instructivo exige formato AAAA-MM-DD. Si solo conoce año y mes, debe registrar 
el día 15.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 4. V26-ADV-001 — Primera consulta con médico tratante anterior al diagnóstico

**Tipo:** Advertencia.

**Qué pasa:**

V26 es anterior a V18. Puede tratarse de una fecha mal digitada o de una 
situación clínica que debe revisarse contra soportes.

**Por qué importa / regla:**

La fecha debe ser válida. Ejemplo: no existe 2025-02-30 ni 2025-20-10.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---


## V27 — Histología del tumor

### 1. V27-ERROR-001 — Histología del tumor obligatoria

**Tipo:** Error.

**Qué pasa:**

V27 está vacío. Debe registrar el subtipo histológico de la biopsia diagnóstica 
o quirúrgica, 98 si no se realizó estudio histopatológico por diagnóstico clínico exclusivamente, o 99 si el dato es desconocido en 
soportes.

**Por qué importa / regla:**

La consulta donde se define la primera conducta terapéutica normalmente ocurre 
después o en relación con la confirmación diagnóstica.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 2. V27-ERROR-002 — Histología debe ser un número válido

**Tipo:** Error.

**Qué pasa:**

V27 tiene texto o un valor no numérico. Esta variable debe diligenciarse solo 
con el número que corresponde al tipo de histología del tumor.

**Por qué importa / regla:**

V27 debe usar un código válido del catálogo de histología.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 3. V27-ERROR-003 — Código de histología no permitido

**Tipo:** Error.

**Qué pasa:**

V27 tiene un número que no está permitido para la histología del tumor.

**Por qué importa / regla:**

V27 solo permite los códigos: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 
16, 17, 18, 19, 20, 21, 23, 24, 98 y 99. La opción 22 no está definida en el instructivo recibido.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 4. V27-ERROR-004 — V27 debe ser 98 cuando el diagnóstico fue clínico exclusivamente

**Tipo:** Error.

**Qué pasa:**

V21=7 indica diagnóstico clínico exclusivamente. En ese caso V27 debe reportar 
98 porque no se realizó estudio histopatológico.

**Por qué importa / regla:**

V27 solo permite los códigos: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 
16, 17, 18, 19, 20, 21, 23, 24, 98 y 99. La opción 22 no está definida en el instructivo recibido.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 5. V27-ERROR-006 — Célula pequeña solo es válida para cáncer de pulmón

**Tipo:** Error.

**Qué pasa:**

V27=21 corresponde a célula pequeña y el instructivo la define únicamente para 
cáncer de pulmón. El CIE-10 reportado en V17 no parece corresponder a pulmón.

**Por qué importa / regla:**

La opción 98 de V27 aplica cuando no se realizó estudio histopatológico y en V21 
se registró 7.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 6. V27-ADV-001 — Histología desconocida

**Tipo:** Advertencia.

**Qué pasa:**

V27=99 indica que el subtipo histológico no se encuentra descrito en los 
soportes. En pacientes incidentes esta opción puede ser calificada como dato no gestionado.

**Por qué importa / regla:**

La opción 21 de V27 es únicamente válida para cáncer de pulmón.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---


## V28 — Grado de diferenciación del tumor sólido maligno

### 1. V28-ERROR-001 — Falta registrar el grado de diferenciación del tumor

**Tipo:** Error.

**Qué pasa:**

V28 está vacío. Debe registrar el código que corresponde al grado de 
diferenciación del tumor según la biopsia diagnóstica. Si ese dato no está en la biopsia, revise el informe de primera cirugía.

**Por qué importa / regla:**

El instructivo advierte que para pacientes incidentes la opción 99 será 
calificada como dato no gestionado.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 2. V28-ERROR-002 — Grado de diferenciación con formato inválido

**Tipo:** Error.

**Qué pasa:**

V28 debe ser numérica. No se aceptan textos, letras, puntos, guiones ni 
descripciones escritas.

**Por qué importa / regla:**

V28 debe usar un código válido del catálogo de grado de diferenciación: 1, 2, 3, 
4, 94, 95, 98 o 99.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 3. V28-ERROR-003 — Código de grado de diferenciación fuera de catálogo

**Tipo:** Error.

**Qué pasa:**

V28 tiene un código que no existe en el catálogo definido por el instructivo.

**Por qué importa / regla:**

El instructivo define un catálogo cerrado numérico para V28.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 4. V28-ERROR-004 — V28 debe ser 98 cuando el diagnóstico fue clínico exclusivamente

**Tipo:** Error.

**Qué pasa:**

V28 tiene un código que no existe en el catálogo definido por el instructivo.

**Por qué importa / regla:**

V28 solo permite: 1, 2, 3, 4, 94, 95, 98 y 99.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---

### 5. V28-ERROR-005 — V28 usa 98 pero V21 no indica diagnóstico clínico exclusivamente

**Tipo:** Error.

**Qué pasa:**

V28=98 significa que no se realizó estudio histopatológico. Ese valor solo 
corresponde cuando V21=7.

**Por qué importa / regla:**

La opción 98 de V28 aplica cuando no se realizó estudio histopatológico y en V21 
se registró 7.

**Estado:** extraído del código actual; pendiente o sujeto a validación manual final si aún no fue probado en Excel.

---


# Reglas pendientes generales

| Regla | Estado |
|---|---|

| Validar V25 contra catálogo REPS completo | Pendiente catálogo REPS |
| Validar V28=95 contra catálogo hematolinfático de V17 | Pendiente catálogo hematolinfático |
| Aplicar restricción V28=99 por fecha 2015 | No activa por decisión operativa actual |
| Validar catálogos externos ATC, CUPS, CIUO, EAPB | Pendiente de catálogos completos |

---

# Uso recomendado

1. Usar este catálogo como referencia para pruebas V1 a V28.

2. Cuando se confirme manualmente un hallazgo en Excel, mantenerlo como validado.

3. Cuando se agreguen nuevas reglas, actualizar el total de hallazgos y la tabla resumen.

4. No inventar reglas para variables que todavía no aparezcan en la extracción del código.
