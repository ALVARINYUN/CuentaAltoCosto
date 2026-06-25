# Matriz funcional por variable — V1 a V24

## Bloque V1-V16 — Identificación general de la EAPB y del usuario reportado

### V1 — Primer nombre del usuario

**Módulo:** Identificación del usuario
**Tipo de dato:** Texto
**Formato:** Mayúscula sostenida, sin tildes ni caracteres especiales
**Longitud:** Según estructura oficial
**Catálogo de referencia:** No aplica
**Comodines permitidos:** No aplica
**Dependencias:** Ninguna
**Reglas de validación:**

* Debe estar diligenciada.
* Debe registrar el primer nombre del usuario según BDUA.
* No debe contener símbolos, puntos, tildes, numeral ni caracteres especiales.
* No debe corresponder al apellido del usuario.
  **Reglas de excepción:** Ninguna documentada.
  **Soporte documental:** BDUA / identificación del usuario
  **Severidad esperada:** Error para vacío, caracteres inválidos o dato ubicado en campo incorrecto. Advertencia sólo para revisión de calidad de texto, sin bloquear valor permitido.

---

### V2 — Segundo nombre del usuario

**Módulo:** Identificación del usuario
**Tipo de dato:** Texto
**Formato:** Mayúscula sostenida, sin tildes ni caracteres especiales
**Longitud:** Según estructura oficial
**Catálogo de referencia:** No aplica
**Comodines permitidos:** `NONE` cuando el usuario no tiene segundo nombre
**Dependencias:** Ninguna
**Reglas de validación:**

* Debe estar diligenciada.
* Si tiene segundo nombre, debe registrarse según BDUA.
* Si tiene tercer nombre, debe escribirse separado por espacio.
* Si no tiene segundo nombre, debe registrar `NONE`.
* No debe contener símbolos, puntos, tildes, guion, numeral ni caracteres especiales.
* No debe contener el primer nombre del usuario en este campo.
  **Reglas de excepción:** `NONE` es válido y no debe generar advertencia por sí solo.
  **Soporte documental:** BDUA / identificación del usuario
  **Severidad esperada:** Error para vacío, caracteres inválidos o uso incorrecto. Sin advertencia para `NONE`.

---

### V3 — Primer apellido del usuario

**Módulo:** Identificación del usuario
**Tipo de dato:** Texto
**Formato:** Mayúscula sostenida, sin tildes ni caracteres especiales
**Longitud:** Según estructura oficial
**Catálogo de referencia:** No aplica
**Comodines permitidos:** No aplica
**Dependencias:** Ninguna
**Reglas de validación:**

* Debe estar diligenciada.
* Debe registrar el primer apellido según BDUA.
* No debe contener símbolos, puntos, tildes, guion, numeral ni caracteres especiales.
* No debe registrar el primer nombre en lugar del primer apellido.
  **Reglas de excepción:** Ninguna documentada.
  **Soporte documental:** BDUA / identificación del usuario
  **Severidad esperada:** Error para vacío, caracteres inválidos o dato ubicado en campo incorrecto.

---

### V4 — Segundo apellido del usuario

**Módulo:** Identificación del usuario
**Tipo de dato:** Texto
**Formato:** Mayúscula sostenida, sin tildes ni caracteres especiales
**Longitud:** Según estructura oficial
**Catálogo de referencia:** No aplica
**Comodines permitidos:** `NOAP` cuando el usuario no tiene segundo apellido
**Dependencias:** Ninguna
**Reglas de validación:**

* Debe estar diligenciada.
* Debe registrar el segundo apellido según BDUA.
* Si no tiene segundo apellido, debe registrar `NOAP`.
* No debe contener caracteres especiales.
  **Reglas de excepción:** `NOAP` es válido y no debe generar advertencia por sí solo.
  **Soporte documental:** BDUA / identificación del usuario
  **Severidad esperada:** Error para vacío o caracteres inválidos. Sin advertencia para `NOAP`.

---

### V5 — Tipo de identificación del usuario

**Módulo:** Identificación del usuario
**Tipo de dato:** Catálogo cerrado
**Formato:** Código alfabético en mayúscula
**Longitud:** 2 caracteres, según catálogo
**Catálogo de referencia:** Tipos de documento oficiales
**Comodines permitidos:** No aplica
**Dependencias:** V6 y V7 para coherencia documental/edad
**Valores permitidos:**

* `CC`: Cédula de ciudadanía
* `CE`: Cédula de extranjería
* `CD`: Carné diplomático
* `PA`: Pasaporte
* `SC`: Salvoconducto de permanencia
* `PT`: Permiso temporal de permanencia
* `PE`: Permiso Especial de Permanencia
* `RC`: Registro civil
* `TI`: Tarjeta de identidad
* `CN`: Certificado de nacido vivo
* `AS`: Adulto sin identificar, sólo régimen subsidiado
* `MS`: Menor sin identificar, sólo régimen subsidiado
* `DE`: Documento extranjero
* `SI`: Sin identificación
  **Reglas de validación:**
* Debe estar diligenciada.
* Debe pertenecer al catálogo permitido.
* Debe registrarse en mayúscula.
* Debe tener coherencia con edad y número de identificación cuando aplique.
  **Reglas de excepción:** AS y MS sólo aplican para régimen subsidiado.
  **Soporte documental:** Documento de identidad / BDUA
  **Severidad esperada:** Error para vacío o valor fuera de catálogo. Advertencia sólo para revisión documental cuando el tipo requiera coherencia especial.

---

### V6 — Número de identificación del usuario

**Módulo:** Identificación del usuario
**Tipo de dato:** Texto / identificador
**Formato:** Según tipo de documento
**Longitud:** Según tipo de documento
**Catálogo de referencia:** No aplica
**Comodines permitidos:** No aplica
**Dependencias:** V5
**Reglas de validación:**

* Debe estar diligenciada.
* Debe corresponder al número de identificación según el tipo registrado en V5.
* Para MS y AS debe registrar el consecutivo interno según la norma aplicable.
* Debe conservar ceros iniciales si existen.
  **Reglas de excepción:** Los tipos AS, MS y SI requieren revisión de calidad/documental.
  **Soporte documental:** Documento / BDUA / consecutivo interno
  **Severidad esperada:** Error para vacío o formato inválido. Advertencia para longitudes atípicas o revisión de calidad en documentos especiales.

---

### V7 — Fecha de nacimiento

**Módulo:** Identificación del usuario
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:** No aplica
**Dependencias:** V5, V16 y fecha de corte
**Reglas de validación:**

* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Debe ser una fecha real.
* No puede ser posterior a la fecha de afiliación.
* Debe ser anterior a la fecha de corte del reporte.
* Debe ser coherente con el tipo de identificación.
  **Reglas de excepción:** Ningún comodín permitido.
  **Soporte documental:** BDUA / documento de identidad
  **Severidad esperada:** Error para vacío, formato inválido, fecha inexistente o fecha posterior a corte/afiliación. Advertencia sólo para edad extrema que requiera revisión.

---

### V8 — Sexo

**Módulo:** Identificación del usuario
**Tipo de dato:** Catálogo cerrado
**Formato:** Letra en mayúscula
**Longitud:** 1 carácter
**Catálogo de referencia:** Sexo del usuario
**Comodines permitidos:** No aplica
**Dependencias:** Variables clínicas con restricción por sexo, cuando aplique
**Valores permitidos:**

* `M`: Masculino
* `F`: Femenino
  **Reglas de validación:**
* Debe estar diligenciada.
* Sólo permite `M` o `F`.
* Debe registrarse en mayúscula.
  **Reglas de excepción:** Ninguna documentada.
  **Soporte documental:** BDUA / documento / historia clínica
  **Severidad esperada:** Error para vacío o valor fuera de catálogo.

---

### V9 — Ocupación

**Módulo:** Identificación del usuario
**Tipo de dato:** Código
**Formato:** Código de ocupación
**Longitud:** Según clasificación ocupacional
**Catálogo de referencia:** Clasificación Internacional Uniforme de Ocupaciones
**Comodines permitidos:**

* `9999`: No existe información
* `9998`: No aplica
  **Dependencias:** V7 para revisión de edad cuando aplique
  **Reglas de validación:**
* Debe estar diligenciada.
* Debe registrar código válido de ocupación o comodín permitido.
* `9999` significa no existe información.
* `9998` significa no aplica.
  **Reglas de excepción:** `9998` y `9999` son valores permitidos; no deben generar advertencia por sí solos.
  **Soporte documental:** Historia clínica / datos administrativos
  **Severidad esperada:** Error para vacío o código inválido. Advertencia sólo si hay incoherencia operativa, por ejemplo menor de edad con ocupación no aplicable según criterio implementado.

---

### V10 — Régimen de afiliación al SGSSS

**Módulo:** Identificación del usuario
**Tipo de dato:** Catálogo cerrado
**Formato:** Letra en mayúscula
**Longitud:** 1 carácter
**Catálogo de referencia:** Régimen de afiliación
**Comodines permitidos:** No aplica
**Dependencias:** V11 y V16
**Valores permitidos:**

* `C`: Régimen contributivo
* `S`: Régimen subsidiado
* `P`: Regímenes de excepción
* `E`: Régimen especial
* `N`: No asegurado
* `I`: Fondo Atención en Salud para PPL
  **Reglas de validación:**
* Debe estar diligenciada.
* Debe pertenecer al catálogo permitido.
* Debe registrarse en mayúscula.
  **Reglas de excepción:** Ninguna documentada.
  **Soporte documental:** Afiliación / BDUA / entidad territorial
  **Severidad esperada:** Error para vacío, minúscula o valor fuera de catálogo.

---

### V11 — Código de la EAPB o entidad territorial

**Módulo:** Identificación del usuario
**Tipo de dato:** Código
**Formato:** Código EAPB o código de departamento seguido de tres ceros para entidad territorial
**Longitud:** Según estructura oficial
**Catálogo de referencia:** Código EAPB / DIVIPOLA para entidades territoriales
**Comodines permitidos:** No aplica
**Dependencias:** V10
**Reglas de validación:**

* Debe estar diligenciada.
* Si el usuario tiene EAPB, registrar código de la empresa que reporta.
* Si reporta entidad territorial, registrar código de departamento seguido de tres ceros.
  **Reglas de excepción:** Para ente territorial, ejemplo operativo: `01000`.
  **Soporte documental:** Afiliación / entidad reportante
  **Severidad esperada:** Error para vacío o formato inválido.

---

### V12 — Código pertenencia étnica

**Módulo:** Identificación del usuario
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** 1 dígito
**Catálogo de referencia:** Pertenencia étnica
**Comodines permitidos:** No aplica
**Dependencias:** Ninguna
**Valores permitidos:**

* `1`: Indígena
* `2`: ROM
* `3`: Raizal
* `4`: Palenquero de San Basilio
* `5`: Negro, mulato, afrocolombiano o afrodescendiente
* `6`: Ninguna de las anteriores
  **Reglas de validación:**
* Debe estar diligenciada.
* Debe pertenecer al catálogo permitido.
  **Reglas de excepción:** Ninguna documentada.
  **Soporte documental:** Datos administrativos / afiliación
  **Severidad esperada:** Error para vacío o valor fuera de catálogo.

---

### V13 — Grupo poblacional

**Módulo:** Identificación del usuario
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Grupo poblacional oficial
**Comodines permitidos:** No aplica
**Dependencias:** Ninguna
**Valores permitidos:**
`1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,31,32,33,34,35,36,37,38,39,50,51,52,53,54,55,56,57,58,59,60,61,62,63`
**Reglas de validación:**

* Debe estar diligenciada.
* Debe pertenecer al catálogo permitido.
* No debe confundirse grupo poblacional con pertenencia étnica.
  **Reglas de excepción:** Ninguna documentada.
  **Soporte documental:** Datos administrativos / afiliación
  **Severidad esperada:** Error para vacío o valor fuera de catálogo.

---

### V14 — Municipio de residencia

**Módulo:** Identificación del usuario
**Tipo de dato:** Código DIVIPOLA
**Formato:** Numérico de 5 dígitos
**Longitud:** 5 dígitos
**Catálogo de referencia:** DIVIPOLA-DANE
**Comodines permitidos:** No aplica
**Dependencias:** Ninguna
**Reglas de validación:**

* Debe estar diligenciada.
* Debe registrar el municipio de residencia del usuario.
* Debe tener 5 dígitos.
* Los dos primeros dígitos deben corresponder al departamento.
* No debe registrarse el municipio donde recibe atención si no corresponde a residencia.
  **Reglas de excepción:** Ninguna documentada.
  **Soporte documental:** BDUA / datos administrativos
  **Severidad esperada:** Error para vacío, longitud inválida o código no reconocido.

---

### V15 — Número telefónico del paciente

**Módulo:** Identificación del usuario
**Tipo de dato:** Texto / contacto
**Formato:** Uno o dos teléfonos completos separados por guion medio
**Longitud:** Según teléfonos registrados
**Catálogo de referencia:** No aplica
**Comodines permitidos:** `0` si no se tiene teléfono
**Dependencias:** Ninguna
**Reglas de validación:**

* Debe estar diligenciada.
* Debe registrar sólo dos números de teléfono fijos o móviles completos como máximo.
* Si hay dos teléfonos, deben separarse por guion medio.
* Si no se tiene teléfono, registrar `0`.
  **Reglas de excepción:** `0` es valor permitido y no debe generar advertencia por sí solo.
  **Soporte documental:** Datos de contacto / historia clínica
  **Severidad esperada:** Error para vacío o formato imposible. Advertencia para teléfono corto, largo o de calidad dudosa.

---

### V16 — Fecha de afiliación a la EAPB que reporta

**Módulo:** Identificación del usuario
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:** No aplica
**Dependencias:** V7 y V10
**Reglas de validación:**

* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Debe ser una fecha real.
* Para EPS del régimen contributivo o subsidiado debe ser superior a `1995-01-01`.
* Para ente territorial, corresponde a la fecha en que se identificó a la persona pobre no asegurada o se prestó servicio no incluido en plan de beneficios.
* Si la entidad cambió de razón social, se reporta la fecha de creación de la nueva razón social.
  **Reglas de excepción:** La interpretación puede variar para régimen especial, excepción y ente territorial según soporte.
  **Soporte documental:** BDUA / certificado de afiliación / soporte territorial
  **Severidad esperada:** Error para vacío, formato inválido o fecha inexistente. Advertencia para fecha anterior a 1995 cuando aplique revisión según régimen.

---

## Bloque V17-V24 — Diagnóstico inicial del cáncer

### V17 — Código CIE-10 de la neoplasia maligna reportada, primario

**Módulo:** Diagnóstico inicial
**Tipo de dato:** Código CIE-10
**Formato:** Código alfanumérico CIE-10 según archivo operativo CAC
**Longitud:** Según código CIE-10 normalizado
**Catálogo de referencia:** Archivo operativo CIE-10 CAC
**Comodines permitidos:** No aplica
**Dependencias:** V18, V21, V24, V27, V28, V29 y variables de diagnóstico relacionadas
**Reglas de validación:**

* Debe estar diligenciada.
* Debe registrar el código de la enfermedad maligna inicialmente diagnosticada.
* Si hubo diagnóstico clínico inicial y luego confirmación histopatológica, debe registrar el CIE-10 de la confirmación histopatológica.
* Debe corresponder al tumor primario o a tumor secundario con primario desconocido dispuesto en el archivo operativo.
* No se deben reportar metástasis como segundo primario en filas independientes.
* `C80X` no se considera válido porque fue eliminado del archivo operativo.
* Debe revisarse el archivo operativo CIE-10 y sus observaciones, especialmente para códigos inactivados o no permitidos en pacientes nuevos.
* Tumores in situ deben registrarse con CIE-10 correspondiente que inicia con `D`, y su estadio debe coincidir con V29.
  **Reglas de excepción:**
* Tumores secundarios sólo aplican cuando el primario es desconocido y existen en el agrupador correspondiente.
* Pacientes históricos con códigos eliminados requieren verificación y ajuste.
* Algunos diagnósticos tienen reglas clínicas específicas por órgano, histología, edad, soporte o agrupador.
  **Soporte documental:** Historia clínica, patología, archivo operativo CIE-10 CAC
  **Severidad esperada:** Error para vacío, código inexistente o código no válido. Advertencia sólo para códigos con observación clínica/catálogo o revisión de soporte.

---

### V18 — Fecha de diagnóstico del cáncer reportado

**Módulo:** Diagnóstico inicial
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:** `1800-01-01` para desconocido
**Dependencias:** V17, V20, V21 y V24
**Reglas de validación:**

* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Si sólo se conoce año y mes, registrar día 15.
* Si el diagnóstico fue histopatológico, la fecha de V18 debe ser igual a V24.
* Si el diagnóstico fue clínico, registrar la fecha de la primera consulta del especialista que concluye diagnóstico de cáncer.
* Si hubo diagnóstico clínico inicial y luego confirmación histopatológica, V24 puede ser posterior a V18.
* En cánceres que sólo pueden confirmarse por patología, V18 debe ser igual a V24.
  **Reglas de excepción:** `1800-01-01` está permitido como desconocido, pero su uso en casos nuevos puede requerir revisión según reglas generales del instructivo.
  **Soporte documental:** Historia clínica, reporte histopatológico, nota del especialista
  **Severidad esperada:** Error para vacío, formato inválido o fecha inexistente. Advertencia para uso de comodín cuando el instructivo exige revisión.

---

### V19 — Fecha de la nota de remisión o interconsulta

**Módulo:** Diagnóstico inicial
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:** `1800-01-01` para desconocido
**Dependencias:** V20
**Reglas de validación:**

* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Si sólo se conoce año y mes, registrar día 15.
* Debe corresponder a la remisión más antigua disponible previa al diagnóstico y asociada a la enfermedad maligna actual.
* Debe ser menor o igual a la fecha de ingreso a la institución que realizó el diagnóstico, registrada en V20.
* Si la sospecha se basó en imágenes o tamización, puede tomarse la fecha del reporte del estudio.
* Si no hay fecha exacta, puede registrarse la fecha en que se ordenó el estudio para confirmar sospecha.
  **Reglas de excepción:** `1800-01-01` está permitido si el dato no está descrito en soportes clínicos.
  **Soporte documental:** Remisión, interconsulta, reporte imagenológico, tamización, orden médica
  **Severidad esperada:** Error para vacío, formato inválido, fecha inexistente o fecha posterior a V20. Advertencia para comodín o soporte incompleto.

---

### V20 — Fecha de ingreso a la institución que realizó el diagnóstico

**Módulo:** Diagnóstico inicial
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:** `1800-01-01` para desconocido
**Dependencias:** V18, V19, V21
**Reglas de validación:**

* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Si sólo se conoce año y mes, registrar día 15.
* Si el diagnóstico fue clínico, registrar la fecha de atención en la que se hizo el diagnóstico clínico; en este caso V18 debe ser igual a V20.
* Si el diagnóstico fue histopatológico, registrar la fecha de ingreso de la muestra al laboratorio.
* Si el reporte de patología no registra fecha de ingreso, puede registrarse la fecha de orden del estudio que pretende confirmar la sospecha.
  **Reglas de excepción:** `1800-01-01` está permitido si el dato no está descrito en soportes clínicos.
  **Soporte documental:** Historia clínica, laboratorio de patología, orden médica, nota médica
  **Severidad esperada:** Error para vacío, formato inválido o fecha inexistente. Advertencia para uso de comodín o trazabilidad clínica incompleta.

---

### V21 — Tipo de estudio con el que se realizó el diagnóstico de cáncer

**Módulo:** Diagnóstico inicial
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Tipo de estudio diagnóstico
**Comodines permitidos:** `99` desconocido
**Dependencias:** V22, V23, V24, V27, V28
**Valores permitidos actuales:**

* `5`: Inmunohistoquímica
* `6`: Citometría de flujo
* `7`: Clínica exclusivamente
* `8`: Otro
* `9`: Genética
* `10`: Patología básica
* `99`: Desconocido
  **Valores históricos:**
* `1`, `2`, `3`, `4` son válidos sólo para pacientes antiguos/prevalentes reportados antes de 2020.
  **Reglas de validación:**
* Debe estar diligenciada.
* Para pacientes nuevos, sólo deben usarse `5,6,7,8,9,10,99`.
* Las opciones `1,2,3,4` no son válidas para pacientes reportados por primera vez a la CAC.
* Debe registrarse el primer estudio que permitió confirmar el cáncer.
* Si V21=7, se habilita V22 como motivo de no histopatología.
* Si V21 indica estudio histopatológico, V22 debe ser 98.
  **Reglas de excepción:** Opciones `1,2,3,4` sólo son válidas como dato histórico en usuarios prevalentes reportados antes de 2020.
  **Soporte documental:** Reporte de patología, inmunohistoquímica, citometría, genética, historia clínica
  **Severidad esperada:** Error para vacío o valor fuera de catálogo. Advertencia para valores históricos o `99` cuando requieren revisión de soporte, no por estar permitidos.

---

### V22 — Motivo por el cual el usuario no tuvo diagnóstico por histopatología

**Módulo:** Diagnóstico inicial
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Motivo de no histopatología
**Comodines permitidos:** `98`, `99`
**Dependencias:** V21
**Valores permitidos:**

* `1`: Clínica, usuario con coagulopatía
* `2`: Clínica, debido a localización del tumor
* `3`: Clínica, debido al estado funcional del usuario
* `4`: Negativa del usuario o acudiente para realizar estudio histopatológico, con soporte
* `5`: Administrativa
* `6`: Clínica por reporte de imágenes o laboratorios
* `98`: Tiene confirmación por histopatología
* `99`: Desconocido
  **Reglas de validación:**
* Debe estar diligenciada.
* Aplica cuando V21=7.
* Si V21=7, V22 debe registrar motivo `1,2,3,4,5,6` o `99`.
* Si V21 corresponde a confirmación histopatológica, V22 debe ser `98`.
* `98` no debe generar advertencia si V21 tiene confirmación histopatológica.
  **Reglas de excepción:** `99` está permitido, pero puede requerir revisión de soporte si el dato se desconoce.
  **Soporte documental:** Historia clínica, soporte de contraindicación, negativa, imagenología o laboratorio
  **Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con V21. Advertencia sólo para `99` o soporte dudoso, no para `98` permitido.

---

### V23 — Fecha de recolección de muestra para estudio histopatológico de diagnóstico

**Módulo:** Diagnóstico inicial
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `1800-01-01`: Desconocido
* `1845-01-01`: No se realizó estudio histopatológico cuando V21=7
  **Dependencias:** V21, V22, V24
  **Reglas de validación:**
* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Si sólo se conoce año y mes, registrar día 15.
* Si la muestra confirmatoria fue producto de cirugía, registrar la fecha de la cirugía.
* Si V21=7, debe registrar `1845-01-01`.
* Si hubo estudio histopatológico, debe registrar fecha real o `1800-01-01` si se desconoce.
* La fecha de recolección no debe ser posterior al informe histopatológico cuando ambas fechas son reales.
  **Reglas de excepción:** `1800-01-01` y `1845-01-01` son valores permitidos según condición; no deben generar advertencia por sí solos.
  **Soporte documental:** Nota quirúrgica, nota de procedimiento, reporte de patología con fecha de recolección
  **Severidad esperada:** Error para vacío, formato inválido, fecha inexistente o comodín incoherente con V21. Advertencia sólo si el comodín requiere revisión de gestión según contexto.

---

### V24 — Fecha de primer o único informe histopatológico válido de diagnóstico

**Módulo:** Diagnóstico inicial
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `1800-01-01`: Desconocido
* `1845-01-01`: No se realizó estudio histopatológico cuando V21=7
  **Dependencias:** V18, V21, V23
  **Reglas de validación:**
* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Si sólo se conoce año y mes, registrar día 15.
* Debe registrar la fecha de la primera prueba que confirmó diagnóstico de cáncer y dio inicio al manejo.
* Si V21=7, debe registrar `1845-01-01`.
* Si el diagnóstico fue histopatológico, V24 debe corresponder al informe histopatológico válido.
* Cuando el diagnóstico fue histopatológico, V18 debe ser igual a V24.
* Si hubo diagnóstico clínico inicial y luego confirmación histopatológica, V24 puede ser posterior a V18.
  **Reglas de excepción:** `1800-01-01` y `1845-01-01` son valores permitidos según condición; no deben generar advertencia por sí solos.
  **Soporte documental:** Reporte de patología obligatorio cuando aplica
  **Severidad esperada:** Error para vacío, formato inválido, fecha inexistente o contradicción con V21/V18. Advertencia sólo para revisión de soporte o uso de comodín cuando aplique.
# Matriz funcional por variable — V25 a V44

## Bloque V25-V28 — Confirmación diagnóstica, histología y diferenciación

### V25 — Código válido de habilitación de la IPS donde se realiza la confirmación diagnóstica

**Módulo:** Confirmación diagnóstica
**Tipo de dato:** Código de habilitación IPS
**Formato:** 12 dígitos, incluido cero inicial
**Longitud:** 12 caracteres cuando es código IPS
**Catálogo de referencia:** REPS / código de habilitación IPS
**Comodines permitidos:**

* `96`: Diagnóstico fuera del país
* `99`: Desconocido, dato no descrito en soportes clínicos

**Dependencias:** V21, V23, V24
**Reglas de validación:**

* Debe estar diligenciada.
* Si el diagnóstico fue histopatológico, debe registrar la IPS que procesó la muestra de patología.
* Si el diagnóstico fue clínico, debe registrar la IPS donde se hizo el diagnóstico clínico.
* El código debe conservar ceros iniciales.
* En diagnósticos histopatológicos del periodo, la IPS debe estar habilitada en REPS para procesamiento de muestra o servicio correspondiente.
* No es válido usar la IPS de seguimiento o tratamiento en esta variable.
* Si el diagnóstico fue fuera del país, permite `96`.
* Si el dato no está en soportes, permite `99`.

**Reglas de excepción:**

* `96` y `99` son valores permitidos por instructivo; no deben generar advertencia por sí solos.
* `99` puede mantenerse como advertencia de revisión si el contexto exige soporte o gestión del dato.

**Soporte documental:** Reporte de patología original, historia clínica, REPS
**Severidad esperada:** Error para vacío, formato inválido o contradicción con diagnóstico. Advertencia sólo para revisión de soporte/habilitación, no por comodín permitido.

---

### V26 — Fecha de primera consulta con médico tratante de la enfermedad maligna

**Módulo:** Confirmación diagnóstica / primera conducta terapéutica
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `1800-01-01`: Desconocido, dato no descrito en soportes clínicos

**Dependencias:** V18, V24, V40, V128
**Reglas de validación:**

* Debe estar diligenciada.
* Debe registrar la fecha de la primera consulta con médico especialista tratante que define la primera conducta terapéutica.
* La conducta puede ser terapia sistémica, cirugía, radioterapia, cuidados paliativos o manejo expectante.
* Debe tener formato `AAAA-MM-DD`.
* Si sólo se conoce año y mes, registrar día 15.
* Para diagnóstico histopatológico desde el 1 de noviembre de 2024 sin consulta de definición terapéutica antes del corte, permite `1800-01-01` y debe trazarse con novedad V128 según corresponda.

**Reglas de excepción:**

* `1800-01-01` es permitido por instructivo; no debe generar advertencia por sí solo si la condición aplica.
* Cuando se usa `1800-01-01` por diagnóstico reciente, debe revisarse trazabilidad con V128.

**Soporte documental:** Historia clínica, consulta de especialista, plan terapéutico
**Severidad esperada:** Error para vacío, formato inválido o fecha inexistente. Advertencia sólo para revisión de comodín/trazabilidad cuando aplique.

---

### V27 — Histología del tumor en muestra de biopsia o quirúrgica

**Módulo:** Histología
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Subtipo histológico CAC
**Comodines permitidos:**

* `98`: No se realizó estudio histopatológico, cuando V21=7
* `99`: Desconocido, dato no descrito en soportes clínicos

**Dependencias:** V17, V21, V23, V24, V28
**Valores permitidos:**

* `1`: Adenocarcinoma
* `2`: Carcinoma escamocelular
* `3`: Carcinoma de células basales
* `4`: Carcinoma diferente a anteriores
* `5`: Oligodendroglioma
* `6`: Astrocitoma
* `7`: Ependimoma
* `8`: Neuroblastoma
* `9`: Meduloblastoma
* `10`: Hepatoblastoma
* `11`: Rabdomiosarcoma
* `12`: Leiomiosarcoma
* `13`: Osteosarcoma
* `14`: Fibrosarcoma
* `15`: Angiosarcoma
* `16`: Condrosarcoma
* `17`: Otros sarcomas
* `18`: Pancreatoblastoma
* `19`: Blastoma pleuropulmonar
* `20`: Otros tipos histológicos no mencionados
* `21`: Célula pequeña, únicamente válida para cáncer de pulmón
* `23`: Melanoma
* `24`: Carcinoma papilar de tiroides
* `98`: No se realizó histopatología
* `99`: Desconocido

**Reglas de validación:**

* Debe estar diligenciada.
* Debe pertenecer al catálogo permitido.
* Si V21=7, debe registrar `98`.
* Si hubo histopatología, debe registrar subtipo histológico válido.
* La opción `21` sólo aplica para cáncer de pulmón.
* En pacientes incidentes, `99` corresponde a dato no gestionado.
* La opción `2` no está reservada sólo para piel; puede aplicar a cérvix, pulmón, canal anal u otros tumores con histología escamocelular.

**Reglas de excepción:**

* `98` es permitido cuando V21=7.
* `99` es permitido como valor de instructivo, pero puede generar revisión de gestión del dato en incidentes.

**Soporte documental:** Reporte de biopsia, patología quirúrgica, historia clínica
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con V21/CIE-10. Advertencia para `99` en incidentes o para restricciones clínicas como célula pequeña fuera de pulmón.

---

### V28 — Grado de diferenciación del tumor sólido maligno

**Módulo:** Diferenciación tumoral
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Grado de diferenciación tumoral
**Comodines permitidos:**

* `94`: Cáncer sólido cuyo reporte de patología no incluye diferenciación celular
* `95`: No es sólido, cáncer hematolinfático
* `98`: No se realizó estudio histopatológico, cuando V21=7
* `99`: No hay información en historia clínica

**Dependencias:** V17, V21, V27
**Valores permitidos:**

* `1`: Bien diferenciado, grado 1
* `2`: Moderadamente diferenciado, grado 2
* `3`: Mal diferenciado, grado 3
* `4`: Anaplásico o indiferenciado, grado 4
* `94`: Sólido sin descripción de diferenciación
* `95`: No sólido
* `98`: No se realizó histopatología
* `99`: Sin información

**Reglas de validación:**

* Debe estar diligenciada.
* Debe pertenecer al catálogo permitido.
* Para cánceres hematolinfáticos debe registrar `95`.
* Si V21=7, debe registrar `98`.
* En tumores sólidos sin diferenciación descrita, debe usar `94`.
* En próstata con patología que no describa diferenciación, debe usar `94`; no homologar desde Gleason.
* La opción `99` sólo es válida para diagnóstico antes de `2015-01-01` cuando no existe información.

**Reglas de excepción:**

* `94`, `95`, `98` y `99` son valores permitidos según contexto; no deben generar advertencia por sí solos.
* `99` requiere condición temporal/documental; si no cumple, debe marcarse inconsistencia.

**Soporte documental:** Biopsia, informe quirúrgico, patología, historia clínica
**Severidad esperada:** Error para vacío, valor fuera de catálogo o comodín incoherente. Advertencia sólo para revisión documental cuando el comodín exige soporte.

---

## Bloque V29-V35 — Estadificación inicial, HER2 y Dukes

### V29 — Primera estadificación basada en TNM, FIGO u otras compatibles

**Módulo:** Estadificación inicial
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Estadificación clínica compatible por agrupador tumoral
**Comodines permitidos:**

* `98`: No aplica para cáncer de piel basocelular, cáncer hematológico o cáncer en SNC, excepto neuroblastoma
* `99`: Desconocido, dato no descrito en soportes clínicos

**Dependencias:** V17, V18, V26, V30
**Valores permitidos principales:**

* `0`: Tumor in situ
* `1`: Estadio I
* `2`: IA
* `3`: IA1
* `4`: IA2
* `5`: IB
* `6`: IB1
* `7`: IB2
* `8`: IC
* `9`: IS
* `10`: II
* `11`: IIA
* `12`: IIA1
* `13`: IIA2
* `14`: IIB
* `15`: IIC
* `16`: III
* `17`: IIIA
* `18`: IIIB
* `19`: IIIC
* `20`: IV
* `21`: IVA
* `22`: IVB
* `23`: IVC
* `24`: 4S para neuroblastoma
* `25`: V
* `27`: IIIC1
* `28`: IIIC2
* `29`: IIID
* `30`: IB3
* `31`: IC1
* `32`: IC2
* `33`: IC3
* `34`: IIIA1
* `35`: IIIA2
* `36`: IA3
* `98`: No aplica
* `99`: Desconocido

**Reglas de validación:**

* Debe estar diligenciada.
* Debe pertenecer al catálogo permitido.
* Debe ser coherente con el CIE-10 y el agrupador tumoral.
* Si existe más de una estadificación, registrar la usada para iniciar tratamiento o la primera registrada al completar exámenes de extensión.
* Para tumores in situ con CIE-10 que inicia en `D`, debe registrar opción `0`.
* Para diagnóstico desde el 1 de noviembre de 2024 sin estadificación antes del corte, permite `99` con novedad V128 correspondiente.
* En incidentes, `99` se considera gestión deficiente del dato.
* Las opciones `34` y `35` son FIGO para ovario, no válidas para cérvix.

**Reglas de excepción:**

* `98` y `99` son permitidos por instructivo según contexto; no deben generar advertencia por sí solos.
* `99` puede generar advertencia si requiere gestión o trazabilidad con novedad.

**Soporte documental:** Historia clínica, estadificación clínica/patológica, exámenes de extensión
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con CIE-10/agrupador. Advertencia para `99` o estadificación que requiere soporte.

---

### V30 — Fecha en que se realizó la estadificación

**Módulo:** Estadificación inicial
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `1800-01-01`: Desconocido
* `1845-01-01`: No aplica para cáncer de piel basocelular, cáncer hematológico o cáncer en SNC, excepto neuroblastoma

**Dependencias:** V29, V128
**Reglas de validación:**

* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Si sólo se conoce año y mes, registrar día 15.
* Si V29=98, debe registrar `1845-01-01`.
* Si V29 tiene estadificación real, debe registrar fecha real o `1800-01-01` si se desconoce.
* Para diagnóstico desde el 1 de noviembre de 2024 sin consulta de estadificación antes del corte, permite `1800-01-01` con novedad V128 correspondiente.

**Reglas de excepción:**

* `1800-01-01` y `1845-01-01` son permitidos según contexto; no deben generar advertencia por sí solos.

**Soporte documental:** Historia clínica, consulta de estadificación, exámenes de extensión
**Severidad esperada:** Error para vacío, formato inválido, fecha inexistente o comodín incoherente. Advertencia sólo para trazabilidad de comodín si aplica.

---

### V31 — Para cáncer de mama, prueba HER2 antes del inicio del tratamiento

**Módulo:** Marcadores / cáncer de mama
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** HER2
**Comodines permitidos:**

* `97`: No aplica porque es cáncer de mama in situ
* `98`: No aplica porque no es cáncer de mama
* `99`: Desconocido, dato no descrito en soportes clínicos

**Dependencias:** V17, V29, V32, V33
**Valores permitidos:**

* `1`: Sí se realizó
* `2`: No se realizó
* `97`: No aplica por cáncer de mama in situ
* `98`: No aplica, no es cáncer de mama
* `99`: Desconocido

**Reglas de validación:**

* Debe estar diligenciada.
* Si no es cáncer de mama, debe ser `98`.
* Si es cáncer de mama in situ y no aplica, puede ser `97`.
* Si HER2 fue realizado antes del inicio del tratamiento, registrar `1`.
* Si HER2 fue posterior al inicio del tratamiento, en V31 debe registrarse `2`, pero V32 y V33 deben contener fecha y resultado de la prueba.
* Si se realizó HER2 en cáncer de mama in situ, capturar la información.

**Reglas de excepción:**

* `97`, `98` y `99` son valores permitidos según contexto; no deben generar advertencia por sí solos.
* `99` puede requerir revisión de soporte.

**Soporte documental:** Resultado HER2/IHQ, historia clínica, patología
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con CIE-10 mama/no mama. Advertencia para `99` o trazabilidad HER2 posterior.

---

### V32 — Para cáncer de mama, fecha de realización de la única o última prueba HER2

**Módulo:** Marcadores / cáncer de mama
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `1800-01-01`: Desconocido
* `1840-01-01`: No aplica porque es cáncer de mama in situ
* `1845-01-01`: No aplica porque no es cáncer de mama o V31=2

**Dependencias:** V17, V31, V33
**Reglas de validación:**

* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Si sólo se conoce año y mes, registrar día 15.
* Si V31=1, debe registrar fecha real o `1800-01-01` si se desconoce.
* Si no es cáncer de mama, debe registrar `1845-01-01`.
* Si es cáncer de mama in situ y no aplica, puede registrar `1840-01-01`.
* Si V31=2, puede registrar `1845-01-01`, salvo que el HER2 se haya hecho después del inicio del tratamiento; en ese caso debe reportar fecha y resultado.

**Reglas de excepción:**

* `1800-01-01`, `1840-01-01` y `1845-01-01` son permitidos según contexto; no deben generar advertencia por sí solos.

**Soporte documental:** Resultado HER2/IHQ, historia clínica
**Severidad esperada:** Error para vacío, formato inválido, fecha inexistente o comodín incoherente con V31/V17. Advertencia sólo para revisión de trazabilidad.

---

### V33 — Para cáncer de mama, resultado de la única o última prueba HER2

**Módulo:** Marcadores / cáncer de mama
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Resultado HER2
**Comodines permitidos:**

* `97`: No aplica porque es cáncer de mama in situ
* `98`: No aplica porque no es cáncer de mama o V31=2
* `99`: Desconocido, dato no descrito en soportes clínicos

**Dependencias:** V17, V31, V32
**Valores permitidos:**

* `1`: +++ positivo
* `2`: ++ equívoco o indeterminado
* `3`: + negativo
* `4`: cero o negativo
* `97`: No aplica por cáncer de mama in situ
* `98`: No aplica
* `99`: Desconocido

**Reglas de validación:**

* Debe estar diligenciada.
* Si no es cáncer de mama, debe ser `98`.
* Si es cáncer de mama in situ y no aplica, puede ser `97`.
* Si HER2 fue realizado, debe registrar resultado válido.
* En pacientes prevalentes, si una nueva IHQ arroja resultado diferente, especialmente positivo, el dato debe ajustarse.

**Reglas de excepción:**

* `97`, `98` y `99` son permitidos según contexto; no deben generar advertencia por sí solos.
* `99` puede requerir advertencia de revisión de soporte.

**Soporte documental:** Resultado HER2/IHQ
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con V17/V31/V32. Advertencia para `99` o ajuste en prevalentes.

---

### V34 — Para cáncer colorrectal, estadificación de Dukes

**Módulo:** Estadificación Dukes
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Dukes
**Comodines permitidos:**

* `98`: No aplica, no es cáncer colorrectal
* `99`: Es cáncer colorrectal pero no hay información en historia clínica

**Dependencias:** V17, V35
**Valores permitidos:**

* `1`: A
* `2`: B
* `3`: C
* `4`: D
* `98`: No aplica
* `99`: Sin información en cáncer colorrectal

**Reglas de validación:**

* Debe estar diligenciada.
* Si no es cáncer colorrectal, debe registrar `98`.
* Si es cáncer colorrectal, debe registrar `1,2,3,4` o `99`.
* `99` sólo aplica si es cáncer colorrectal y no hay información en historia clínica.

**Reglas de excepción:**

* `98` y `99` son valores permitidos según contexto; no deben generar advertencia por sí solos.

**Soporte documental:** Historia clínica, estadificación Dukes
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con CIE-10. Advertencia para `99` si requiere revisión de soporte.

---

### V35 — Fecha en que se realizó la estadificación de Dukes

**Módulo:** Estadificación Dukes
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `1845-01-01`: No aplica porque no es cáncer colorrectal o V34=99

**Dependencias:** V34
**Reglas de validación:**

* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Si sólo se conoce año y mes, registrar día 15.
* Si no es cáncer colorrectal, debe registrar `1845-01-01`.
* Si V34=99, debe registrar `1845-01-01`.
* Si V34 tiene estadificación real, debe registrar fecha real.

**Reglas de excepción:**

* `1845-01-01` es permitido según contexto; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, estadificación Dukes
**Severidad esperada:** Error para vacío, formato inválido, fecha inexistente o contradicción con V34.

---

## Bloque V36-V44 — Linfomas, mieloma, riesgo, objetivo, intervención y antecedentes

### V36 — Estadificación clínica en linfoma no Hodgkin, linfoma Hodgkin y mieloma múltiple

**Módulo:** Linfomas, mieloma y estadificación hematológica
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Ann Arbor / Lugano / mieloma múltiple
**Comodines permitidos:**

* `98`: No aplica, tumor diferente a los enunciados
* `99`: Desconocido, dato no descrito en soportes clínicos

**Dependencias:** V17, V38, V39
**Valores permitidos:**

* `1`: Estadio I
* `2`: Estadio II
* `3`: Estadio III
* `4`: Estadio IV
* `5`: IA
* `6`: IB
* `7`: IIA
* `8`: IIB
* `9`: IIIA
* `10`: IIIB
* `11`: IVA
* `12`: IVB
* `13`: Extranodal cualquier estadio
* `14`: Primario SNC
* `15`: Primario mediastinal
* `16`: Primario de otros órganos
* `98`: No aplica
* `99`: Desconocido

**Reglas de validación:**

* Debe estar diligenciada.
* Debe aplicar a linfoma no Hodgkin, linfoma Hodgkin adulto/pediátrico o mieloma múltiple.
* Si no corresponde a esos tumores, debe registrar `98`.
* Si sólo se cuenta con estadio sin sufijo A/B, registrar opción 1 a 4 según corresponda.
* Si el estadiaje incluye sufijo X por masa bulky, elegir el estadio ignorando el sufijo X.
* Para diagnóstico desde el 1 de noviembre de 2024 sin consulta de estadificación, permite `99` con novedad V128 correspondiente.

**Reglas de excepción:**

* `98` y `99` son permitidos según contexto; no deben generar advertencia por sí solos.
* `99` puede mantenerse como advertencia de revisión de soporte.

**Soporte documental:** Historia clínica, estadificación Ann Arbor/Lugano, soporte de mieloma
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con CIE-10. Advertencia para `99` o soporte incompleto.

---

### V37 — Para cáncer de próstata, clasificación Gleason al diagnóstico

**Módulo:** Cáncer de próstata / Gleason
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Escala Gleason
**Comodines permitidos:**

* `97`: Cáncer de próstata con diagnóstico clínico sin información de Gleason
* `98`: No es cáncer de próstata
* `99`: Cáncer de próstata con diagnóstico histopatológico, pero sin información en historia clínica

**Dependencias:** V17, V21, V27, V28
**Valores permitidos actuales:**

* `11`: Gleason menor o igual a 6, menor o igual a 3+3
* `12`: Gleason 7, 3+4
* `13`: Gleason 7, 4+3
* `14`: Gleason 8, 4+4 o 3+5 o 5+3
* `15`: Gleason 9 o 10, 4+5 o 5+4 o 5+5
* `97`: Clínico sin información
* `98`: No próstata
* `99`: Próstata histopatológico sin información

**Reglas de validación:**

* Debe estar diligenciada.
* Si no es cáncer de próstata, debe registrar `98`.
* Si es cáncer de próstata, debe registrar código Gleason válido o comodín permitido.
* En casos nuevos, `99` se considera dato no gestionado.
* Las opciones `1` a `10` no son válidas para pacientes reportados por primera vez a la CAC.
* Las opciones `1` a `10` sólo se validan como histórico para pacientes reportados antes de 2021.

**Reglas de excepción:**

* `97`, `98` y `99` son permitidos según contexto; no deben generar advertencia por sí solos.
* `99` puede requerir advertencia de revisión en casos incidentes.

**Soporte documental:** Patología, historia clínica, reporte Gleason
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con CIE-10 próstata/no próstata. Advertencia para históricos o `99` según contexto.

---

### V38 — Clasificación del riesgo en leucemias, linfomas, mieloma múltiple y sólidos pediátricos

**Módulo:** Clasificación de riesgo
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Riesgo por tipo de cáncer
**Comodines permitidos:**

* `98`: No aplica, no es leucemia ni linfoma según instructivo/base del riesgo
* `99`: Desconocido, dato no descrito en soportes clínicos

**Dependencias:** V17, V36, V39
**Valores permitidos principales:**

* `1`: Bajo / estándar / favorable
* `2`: Riesgo intermedio bajo, usado en clasificación de linfoma no Hodgkin según soporte
* `3`: Intermedio
* `4`: Riesgo intermedio alto
* `5`: Alto / desfavorable
* `98`: No aplica
* `99`: Desconocido

**Reglas de validación:**

* Debe estar diligenciada.
* Debe ser coherente con el tipo de cáncer reportado.
* Para linfoma no Hodgkin se usan opciones de riesgo 1 a 5.
* Para linfoma de Hodgkin se usan bajo o alto.
* Para adultos con LLA, LMA o mieloma múltiple se usan estándar/bajo, intermedio o alto.
* Para pediatría con LLA y LMA se usan estándar/favorable/bajo, intermedio o alto/desfavorable.
* Si no aplica clasificación de riesgo, debe registrar `98`.
* Las opciones `6` a `13` sólo son válidas para pacientes reportados antes de 2021 como dato histórico.
* Para diagnóstico desde el 1 de noviembre de 2024 sin clasificación de riesgo antes del corte, permite `99` con novedad V128 correspondiente.

**Reglas de excepción:**

* `98` y `99` son permitidos según contexto; no deben generar advertencia por sí solos.
* Opciones históricas pueden mantenerse sólo para prevalentes anteriores a 2021.

**Soporte documental:** Historia clínica, clasificación de riesgo, hematología/oncología
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con CIE-10. Advertencia para `99`, históricos o trazabilidad con V128.

---

### V39 — Fecha de clasificación de riesgo

**Módulo:** Clasificación de riesgo
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `1800-01-01`: Desconocido
* `1845-01-01`: No aplica, no es leucemia ni linfoma

**Dependencias:** V38, V128
**Reglas de validación:**

* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Si sólo se conoce año y mes, registrar día 15.
* Si V38=98, debe registrar `1845-01-01`.
* Si V38 tiene clasificación real, debe registrar fecha real o `1800-01-01` si se desconoce.
* Para diagnóstico desde el 1 de noviembre de 2024 sin clasificación de riesgo antes del corte, permite `1800-01-01` con novedad V128 correspondiente.

**Reglas de excepción:**

* `1800-01-01` y `1845-01-01` son permitidos según contexto; no deben generar advertencia por sí solos.

**Soporte documental:** Historia clínica, clasificación de riesgo
**Severidad esperada:** Error para vacío, formato inválido, fecha inexistente o comodín incoherente. Advertencia sólo para revisión de trazabilidad.

---

### V40 — Objetivo o intención del tratamiento médico inicial al diagnóstico

**Módulo:** Objetivo del tratamiento inicial
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Objetivo terapéutico inicial
**Comodines permitidos:**

* `99`: Desconocido, dato no descrito en soportes clínicos

**Dependencias:** V26, V41
**Valores permitidos:**

* `1`: Curación
* `2`: Paliación exclusivamente
* `3`: Manejo expectante una vez realizado el diagnóstico
* `99`: Desconocido

**Reglas de validación:**

* Debe estar diligenciada.
* Debe pertenecer al catálogo permitido.
* Debe corresponder a la decisión al momento del diagnóstico.
* Esta información no es modificable en el tiempo.

**Reglas de excepción:**

* `99` es permitido por instructivo; no debe generar advertencia por sí solo, salvo revisión de gestión del dato.

**Soporte documental:** Historia clínica, consulta del especialista, plan terapéutico inicial
**Severidad esperada:** Error para vacío o valor fuera de catálogo. Advertencia para `99` o soporte insuficiente.

---

### V41 — Intervención médica durante el periodo de reporte

**Módulo:** Intervención médica
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Intervención médica durante el periodo
**Comodines permitidos:**

* `99`: No hay intervención en el periodo

**Dependencias:** V40, variables de tratamiento V45 en adelante
**Valores permitidos:**

* `1`: Observación previa a tratamiento
* `2`: Ofrecer tratamiento curativo o paliativo dirigido al cáncer inicial o por recaída
* `3`: Observación o seguimiento oncológico luego de tratamiento inicial
* `4`: 1 y 2 únicamente
* `5`: 2 y 3 únicamente
* `6`: 1, 2 y 3
* `99`: No hay intervención en el periodo

**Reglas de validación:**

* Debe estar diligenciada.
* Debe pertenecer al catálogo permitido.
* Debe reflejar la intervención médica realizada o indicada durante el periodo de reporte.
* Debe ser coherente con tratamientos reportados en variables posteriores.
* `99` aplica para abandono de terapia, alta oncológica o alta voluntaria sin intervención en el periodo.

**Reglas de excepción:**

* `99` es valor permitido; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, órdenes médicas, seguimiento oncológico
**Severidad esperada:** Error para vacío o valor fuera de catálogo. Advertencia sólo para incoherencia con tratamientos posteriores.

---

### V42 — Tiene antecedente o padece de otro cáncer primario

**Módulo:** Antecedentes de otro cáncer primario
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Antecedente/concurrencia de otro cáncer primario
**Comodines permitidos:**

* `99`: Desconocido, dato no descrito o insuficiente en historia clínica

**Dependencias:** V43, V44
**Valores permitidos:**

* `1`: Sí
* `2`: No
* `99`: Desconocido

**Reglas de validación:**

* Debe estar diligenciada.
* Debe indicar si el usuario tiene o tuvo otro tumor maligno diferente al reportado.
* Si tiene dos cánceres primarios del mismo agrupador, la información del segundo primario se captura en V42-V44.
* El segundo primario debe estar soportado en historia clínica.
* Si el caso nuevo tiene dos cánceres primarios, debe reportarse en dos líneas, cada una con el primario correspondiente en V17.
* Si tiene tres cánceres primarios, en antecedente debe reportarse el más cercano a la fecha de corte.
* `99` aplica cuando la historia clínica no permite descartar o confirmar segundo cáncer, o lo menciona con datos insuficientes.

**Reglas de excepción:**

* `99` es permitido; no debe generar advertencia por sí solo si la historia clínica realmente es insuficiente.

**Soporte documental:** Historia clínica, patología/diagnóstico del segundo primario
**Severidad esperada:** Error para vacío o valor fuera de catálogo. Advertencia para `99` o trazabilidad insuficiente.

---

### V43 — Fecha de diagnóstico del otro cáncer primario

**Módulo:** Antecedentes de otro cáncer primario
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `1800-01-01`: Desconocido
* `1845-01-01`: No aplica, no ha tenido otro cáncer primario

**Dependencias:** V42, V44
**Reglas de validación:**

* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Si sólo se conoce año y mes, registrar día 15.
* Si V42=1, debe registrar fecha real o `1800-01-01` si se desconoce.
* Si V42=2, debe registrar `1845-01-01`.
* Si V42=99, puede requerir fecha desconocida o no aplica según soporte disponible y regla implementada.

**Reglas de excepción:**

* `1800-01-01` y `1845-01-01` son permitidos según contexto; no deben generar advertencia por sí solos.

**Soporte documental:** Historia clínica, diagnóstico del otro cáncer primario
**Severidad esperada:** Error para vacío, formato inválido, fecha inexistente o contradicción con V42.

---

### V44 — Tipo CIE-10 del cáncer antecedente o concurrente

**Módulo:** Antecedentes de otro cáncer primario
**Tipo de dato:** Código CIE-10 / comodín
**Formato:** Código CIE-10 según archivo operativo CAC
**Longitud:** Según código CIE-10 normalizado
**Catálogo de referencia:** Archivo operativo CIE-10 CAC
**Comodines permitidos:**

* `99`: No aplica, no hay antecedente o concurrencia de otro cáncer primario

**Dependencias:** V42, V43, V17
**Reglas de validación:**

* Debe estar diligenciada.
* Si V42=1, debe registrar CIE-10 válido del otro cáncer primario antecedente o concurrente.
* Si V42=2, debe registrar `99`.
* El código debe corresponder a enfermedad maligna diagnosticada según CIE-10 operativo CAC.
* Antes de definir, por ejemplo, un linfoma, debe tenerse en cuenta que el usuario pudo tener diagnóstico previo de cáncer a estudio o tumor de células pequeñas, redondas y azules; debe notificarse el linfoma cuando corresponda.
* Debe ser diferente o trazablemente justificable frente al cáncer reportado en V17.

**Reglas de excepción:**

* `99` es permitido si no hay antecedente o concurrencia de otro cáncer primario; no debe generar advertencia por sí solo.
* Si hay dos primarios del mismo agrupador, debe soportarse adecuadamente y registrarse según reglas de V42.

**Soporte documental:** Historia clínica, patología, CIE-10 operativo CAC
**Severidad esperada:** Error para vacío, CIE-10 inválido o contradicción con V42. Advertencia para revisión de soporte o posible duplicidad/agrupador.
# Matriz funcional por variable — V45 a V60

## Bloque V45-V60 — Primer o único esquema de terapia sistémica e intratecal en el periodo de reporte actual

### V45 — ¿Recibió el usuario quimioterapia u otra terapia sistémica dentro del periodo de reporte?

**Módulo:** Terapia sistémica e intratecal
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Terapia sistémica recibida
**Comodines permitidos:**

* `98`: No aplica, no está indicada esta terapia

**Dependencias:** V46-V60, V61-V73
**Valores permitidos:**

* `1`: Sí recibió
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Sólo permite `1` o `98`.
* Si V45=1, se habilitan las variables del primer/único esquema y, según corresponda, último esquema.
* Si V45=98, las variables V46 a V73 deben registrar No Aplica según la regla específica de cada variable.
* Sólo aplican tratamientos suministrados dentro del periodo de reporte.
* No aplican tratamientos propuestos pero no administrados.
* Si el paciente tiene más de un cáncer primario, se debe reportar la terapia correspondiente al cáncer registrado en V17.

**Reglas de excepción:**

* `98` es valor permitido y no debe generar advertencia por sí solo.
* La revisión debe hacerse contra las variables dependientes, no contra V45 si el valor es válido.

**Soporte documental:** Historia clínica, registros de administración, órdenes y soporte oncológico
**Severidad esperada:** Error para vacío o valor fuera de catálogo. Advertencia sólo para incoherencia con tratamientos posteriores.

---

### V46 — ¿Cuántas fases de quimioterapia recibió el usuario en este periodo?

**Módulo:** Terapia sistémica / fases hematolinfáticas
**Tipo de dato:** Numérico / catálogo operativo
**Formato:** Número de fases o comodín
**Longitud:** Según valor
**Catálogo de referencia:** Fases de quimioterapia para C835, C910, C920, C924 y C925
**Comodines permitidos:**

* `0`: Es cáncer hematolinfático de los códigos definidos y V45=98
* `98`: No aplica, es sólido o cáncer diferente a los enunciados en las fases

**Dependencias:** V17, V45, V46.1-V46.8
**Reglas de validación:**

* Debe estar diligenciada.
* Aplica para hematolinfáticos con CIE-10 `C835`, `C910`, `C920`, `C924`, `C925`.
* Si aplica, debe registrar número de fases de quimioterapia propuestas para el periodo.
* Si es sólido o cáncer diferente a los enunciados, debe registrar `98`.
* Si es hematolinfático de los códigos definidos y V45=98, puede registrar `0`.

**Reglas de excepción:**

* `0` y `98` son valores permitidos según contexto; no deben generar advertencia por sí solos.
* La coherencia depende de V17 y V45.

**Soporte documental:** Historia clínica, protocolo de quimioterapia, esquema hematológico
**Severidad esperada:** Error para vacío, valor no numérico/inválido o contradicción con V17/V45. Advertencia sólo para revisión de coherencia de fases.

---

### V46.1 — Prefase o citorreducción inicial

**Módulo:** Terapia sistémica / fases hematolinfáticas
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Fase de quimioterapia
**Comodines permitidos:**

* `97`: No aplica, no es leucemia linfoide o mieloide aguda ni linfoma linfoblástico

**Dependencias:** V17, V45, V46
**Valores permitidos:**

* `1`: Sí recibió
* `2`: No recibió
* `97`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Aplica para leucemia linfoide aguda y linfoma linfoblástico.
* Si recibió prefase o citorreducción inicial, registrar `1`.
* Si aplica el diagnóstico, pero no recibió esta fase, registrar `2`.
* Si no aplica por diagnóstico, registrar `97`.

**Reglas de excepción:**

* `97` es valor permitido y no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, protocolo de quimioterapia, registro de administración
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con diagnóstico. Advertencia sólo para revisión clínica de fase.

---

### V46.2 — Fase de inducción

**Módulo:** Terapia sistémica / fases hematolinfáticas
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Fase de quimioterapia
**Comodines permitidos:**

* `97`: No aplica, no es leucemia linfoide o mieloide aguda ni linfoma linfoblástico

**Dependencias:** V17, V45, V46
**Valores permitidos:**

* `1`: Sí recibió
* `2`: No recibió
* `97`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Aplica para leucemia linfoide o mieloide aguda y linfoma linfoblástico.
* Si recibió inducción, registrar `1`.
* Si aplica el diagnóstico, pero no recibió inducción, registrar `2`.
* Si no aplica por diagnóstico, registrar `97`.

**Reglas de excepción:**

* `97` es valor permitido y no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, protocolo de quimioterapia, registro de administración
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con diagnóstico. Advertencia sólo para revisión clínica de fase.

---

### V46.3 — Fase de intensificación

**Módulo:** Terapia sistémica / fases hematolinfáticas
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Fase de quimioterapia
**Comodines permitidos:**

* `97`: No aplica, no es leucemia linfoide o mieloide aguda ni linfoma linfoblástico

**Dependencias:** V17, V45, V46
**Valores permitidos:**

* `1`: Sí recibió
* `2`: No recibió
* `97`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Aplica para leucemia linfoide o mieloide aguda y linfoma linfoblástico.
* Si recibió intensificación, registrar `1`.
* Si aplica el diagnóstico, pero no recibió esta fase, registrar `2`.
* Si no aplica por diagnóstico, registrar `97`.

**Reglas de excepción:**

* `97` es valor permitido y no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, protocolo de quimioterapia, registro de administración
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con diagnóstico. Advertencia sólo para revisión clínica de fase.

---

### V46.4 — Fase de consolidación

**Módulo:** Terapia sistémica / fases hematolinfáticas
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Fase de quimioterapia
**Comodines permitidos:**

* `97`: No aplica, no es leucemia linfoide o mieloide aguda ni linfoma linfoblástico

**Dependencias:** V17, V45, V46
**Valores permitidos:**

* `1`: Sí recibió
* `2`: No recibió
* `97`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Aplica para leucemia linfoide o mieloide aguda y linfoma linfoblástico.
* Si recibió consolidación, registrar `1`.
* Si aplica el diagnóstico, pero no recibió esta fase, registrar `2`.
* Si no aplica por diagnóstico, registrar `97`.

**Reglas de excepción:**

* `97` es valor permitido y no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, protocolo de quimioterapia, registro de administración
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con diagnóstico. Advertencia sólo para revisión clínica de fase.

---

### V46.5 — Fase de reinducción

**Módulo:** Terapia sistémica / fases hematolinfáticas
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Fase de quimioterapia
**Comodines permitidos:**

* `97`: No aplica, no es leucemia linfoide aguda ni linfoma linfoblástico

**Dependencias:** V17, V45, V46
**Valores permitidos:**

* `1`: Sí recibió
* `2`: No recibió
* `97`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Aplica para leucemia linfoide aguda y linfoma linfoblástico.
* Si recibió reinducción, registrar `1`.
* Si aplica el diagnóstico, pero no recibió reinducción, registrar `2`.
* Si no aplica por diagnóstico, registrar `97`.

**Reglas de excepción:**

* `97` es valor permitido y no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, protocolo de quimioterapia, registro de administración
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con diagnóstico. Advertencia sólo para revisión clínica de fase.

---

### V46.6 — Fase de mantenimiento

**Módulo:** Terapia sistémica / fases hematolinfáticas
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Fase de quimioterapia
**Comodines permitidos:**

* `97`: No aplica, no es leucemia linfoide o mieloide aguda ni linfoma linfoblástico

**Dependencias:** V17, V45, V46
**Valores permitidos:**

* `1`: Sí recibió
* `2`: No recibió
* `97`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Aplica para leucemia linfoide o mieloide aguda y linfoma linfoblástico.
* Si recibió mantenimiento, registrar `1`.
* Si aplica el diagnóstico, pero no recibió mantenimiento, registrar `2`.
* Si no aplica por diagnóstico, registrar `97`.

**Reglas de excepción:**

* `97` es valor permitido y no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, protocolo de quimioterapia, registro de administración
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con diagnóstico. Advertencia sólo para revisión clínica de fase.

---

### V46.7 — Fase de mantenimiento largo o final

**Módulo:** Terapia sistémica / fases hematolinfáticas
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Fase de quimioterapia
**Comodines permitidos:**

* `97`: No aplica, no es leucemia linfoide o mieloide aguda ni linfoma linfoblástico

**Dependencias:** V17, V45, V46
**Valores permitidos:**

* `1`: Sí recibió
* `2`: No recibió
* `97`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Aplica para leucemia linfoide o mieloide aguda y linfoma linfoblástico.
* Si recibió mantenimiento largo o final, registrar `1`.
* Si aplica el diagnóstico, pero no recibió esta fase, registrar `2`.
* Si no aplica por diagnóstico, registrar `97`.

**Reglas de excepción:**

* `97` es valor permitido y no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, protocolo de quimioterapia, registro de administración
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con diagnóstico. Advertencia sólo para revisión clínica de fase.

---

### V46.8 — Otra fase de quimioterapia diferente a las anteriores

**Módulo:** Terapia sistémica / fases hematolinfáticas
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Fase de quimioterapia
**Comodines permitidos:**

* `97`: No aplica, no es leucemia linfoide o mieloide aguda ni linfoma linfoblástico

**Dependencias:** V17, V45, V46
**Valores permitidos:**

* `1`: Sí recibió
* `2`: No recibió
* `97`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Aplica para leucemia linfoide o mieloide aguda y linfoma linfoblástico.
* Si recibió otra fase diferente a las anteriores, registrar `1`.
* Si aplica el diagnóstico, pero no recibió otra fase, registrar `2`.
* Si no aplica por diagnóstico, registrar `97`.

**Reglas de excepción:**

* `97` es valor permitido y no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, protocolo de quimioterapia, registro de administración
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con diagnóstico. Advertencia sólo para revisión clínica de fase.

---

### V47 — Número de ciclos iniciados y administrados en el periodo de reporte

**Módulo:** Terapia sistémica / ciclos
**Tipo de dato:** Numérico
**Formato:** Entero o comodín
**Longitud:** Según valor
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `98`: No aplica o no recibió terapia aunque fue formulada, cuando V45=98

**Dependencias:** V45, V48-V60
**Reglas de validación:**

* Debe estar diligenciada.
* Si V45=1, debe registrar número de ciclos iniciados en el periodo.
* Puede incluir ciclos de diferentes esquemas de manejo.
* En tumores sólidos, registrar ciclos según plan terapéutico y periodos de descanso.
* En hematolinfáticos, registrar según descripción en historia clínica y protocolo.
* En hormonoterapia oral sin periodos de descanso, el dato es `1`.
* En terapias hormonales intramusculares o subcutáneas, cada aplicación cuenta como ciclo.
* Cada administración intratecal cuenta como un ciclo.
* Si V45=98, debe registrar `98`.

**Reglas de excepción:**

* `98` es permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, registros de administración, esquema terapéutico
**Severidad esperada:** Error para vacío, valor no numérico o contradicción con V45. Advertencia para revisión de coherencia de ciclos.

---

### V48 — Ubicación temporal del primer o único esquema de quimioterapia o terapia sistémica

**Módulo:** Primer o único esquema de terapia sistémica
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Ubicación temporal del esquema
**Comodines permitidos:**

* `98`: No aplica, cuando V45=98

**Dependencias:** V45, V49-V60
**Valores permitidos:**

* `1`: Neoadyuvancia, manejo inicial prequirúrgico
* `2`: Tratamiento inicial curativo sin cirugía sugerida
* `3`: Adyuvancia, manejo inicial postquirúrgico
* `11`: Manejo de recaída
* `12`: Manejo de enfermedad metastásica
* `13`: Manejo paliativo, sin manejo de recaída ni enfermedad metastásica
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Si V45=98, debe registrar `98`.
* Si V45=1, debe registrar ubicación temporal válida del primer o único esquema.
* Debe reflejar el plan terapéutico definido por el profesional tratante.
* En hormonoterapia de cáncer de mama iniciada posterior a cirugía, usualmente corresponde a adyuvancia.

**Reglas de excepción:**

* `98` es valor permitido cuando V45=98; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, plan terapéutico, protocolo oncológico
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con V45. Advertencia sólo para revisión de coherencia clínica.

---

### V49 — Fecha de inicio del primer o único esquema de quimioterapia o terapia sistémica

**Módulo:** Primer o único esquema de terapia sistémica
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `1845-01-01`: No aplica, cuando V45=98

**Dependencias:** V45, V48
**Reglas de validación:**

* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Si sólo se conoce año y mes, registrar día 15.
* Si V45=1, debe registrar la fecha de inicio del primer o único esquema recibido en este periodo.
* La fecha puede anteceder al periodo de reporte si el esquema es prolongado y continúa en el periodo actual.
* Si V45=98, debe registrar `1845-01-01`.

**Reglas de excepción:**

* `1845-01-01` es permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, órdenes, registros de administración
**Severidad esperada:** Error para vacío, formato inválido, fecha inexistente o contradicción con V45. Advertencia sólo para revisión de fecha fuera de periodo cuando amerite.

---

### V50 — Número de IPS que suministran el primer o único esquema

**Módulo:** Primer o único esquema de terapia sistémica
**Tipo de dato:** Numérico
**Formato:** Entero o comodín
**Longitud:** Según valor
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `98`: No aplica, cuando V45=98

**Dependencias:** V45, V51, V52
**Reglas de validación:**

* Debe estar diligenciada.
* Si V45=1, debe registrar el número de IPS que suministran el primer esquema de quimioterapia o terapia sistémica.
* Si V45=98, debe registrar `98`.
* Si registra una IPS, V51 aplica y V52 debe ser `98` salvo que haya segunda IPS.
* Si registra dos IPS, V51 y V52 aplican.

**Reglas de excepción:**

* `98` es permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, registros de administración, IPS tratantes
**Severidad esperada:** Error para vacío, valor inválido o contradicción con V45/V51/V52.

---

### V51 — Código de la IPS1 que suministra el primer o único esquema

**Módulo:** Primer o único esquema de terapia sistémica
**Tipo de dato:** Código de habilitación IPS
**Formato:** 12 dígitos, incluido cero inicial
**Longitud:** 12 caracteres cuando es IPS
**Catálogo de referencia:** REPS
**Comodines permitidos:**

* `96`: Terapia sistémica suministrada fuera del país
* `98`: No aplica, cuando V45=98

**Dependencias:** V45, V50, V52
**Reglas de validación:**

* Debe estar diligenciada.
* Si V45=1 y V50 indica al menos una IPS, debe registrar código de habilitación de IPS.
* Para tratamientos orales, debe registrar la IPS que prescribió el tratamiento, no el operador logístico que entrega.
* Si el tratamiento fue suministrado fuera del país, permite `96`.
* Si V45=98, debe registrar `98`.
* Debe conservar ceros iniciales.

**Reglas de excepción:**

* `96` y `98` son valores permitidos según contexto; no deben generar advertencia por sí solos.
* Puede requerir revisión de habilitación REPS o soporte cuando aplica.

**Soporte documental:** Historia clínica, REPS, registros de administración, prescripción
**Severidad esperada:** Error para vacío, formato inválido, contradicción con V45/V50 o IPS no válida cuando se exige. Advertencia para revisión REPS/soporte.

---

### V52 — Código de la IPS2 que suministra el primer o único esquema

**Módulo:** Primer o único esquema de terapia sistémica
**Tipo de dato:** Código de habilitación IPS
**Formato:** 12 dígitos, incluido cero inicial
**Longitud:** 12 caracteres cuando aplica
**Catálogo de referencia:** REPS
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V45, V50, V51
**Reglas de validación:**

* Debe estar diligenciada.
* Si sólo interviene una IPS, debe registrar `98`.
* Si V50 indica dos IPS, debe registrar código de habilitación válido.
* Para tratamientos orales, debe registrar IPS que prescribió tratamiento, no operador logístico.
* Debe conservar ceros iniciales.
* Verificar que la IPS cuente con servicio de quimioterapia habilitado cuando aplique.

**Reglas de excepción:**

* `98` es valor permitido cuando no hay segunda IPS; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, REPS, registros de administración, prescripción
**Severidad esperada:** Error para vacío, formato inválido, contradicción con V50 o IPS no válida. Advertencia para revisión REPS/soporte.

---

### V53 — Número de medicamentos antineoplásicos o terapia hormonal propuestos en el primer o único esquema

**Módulo:** Primer o único esquema de terapia sistémica
**Tipo de dato:** Numérico
**Formato:** Entero o comodín
**Longitud:** Según valor
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `98`: No aplica, cuando V45=98

**Dependencias:** V45, V53.1-V53.9, V54-V56
**Reglas de validación:**

* Debe estar diligenciada.
* Si V45=1, debe registrar el número de medicamentos antineoplásicos propuestos en el primer esquema.
* Deben descontarse medicamentos adyuvantes o de premedicación que no son antineoplásicos.
* Se reporta el número total de medicamentos propuestos, no necesariamente administrados.
* En V53.1-V53.9 y V54-V56 se registran sólo ATC de fármacos administrados en el periodo.
* Esteroides como dexametasona, prednisolona, prednisona y metilprednisolona no deben reportarse en sólidos, linfoma de Hodgkin ni LMA si su uso es para reducir efectos adversos.
* Pegfilgastrim debe reportarse cuando hace parte del esquema, pero no cuantificarse ni ser monoterapia.
* Antirresortivos sólo son válidos si la indicación corresponde a metástasis ósea o hipercalcemia maligna; se reportan pero no se cuantifican.
* Si V45=98, debe registrar `98`.

**Reglas de excepción:**

* `98` es permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, prescripción, esquema terapéutico, registros de administración
**Severidad esperada:** Error para vacío, valor inválido o contradicción con V45/medicamentos. Advertencia para revisión de medicamentos no cuantificables o soporte.

---

### V53.1 — Medicamento antineoplásico administrado 1 en primer o único esquema

**Módulo:** Medicamentos primer o único esquema
**Tipo de dato:** Código ATC / comodín
**Formato:** Código ATC válido o `98`
**Longitud:** Según ATC
**Catálogo de referencia:** ATC operativo CAC
**Comodines permitidos:**

* `98`: No aplica, cuando V45=98

**Dependencias:** V45, V53
**Reglas de validación:**

* Debe estar diligenciada.
* Si V45=1 y V53 habilita medicamento, debe registrar ATC válido administrado.
* Si V45=98, debe registrar `98`.
* No permite `97` en la primera posición.
* El ATC debe estar soportado y administrado entre el 2 de enero de 2024 y el 1 de enero de 2025.

**Reglas de excepción:**

* `98` es permitido si no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, registro de administración, prescripción
**Severidad esperada:** Error para vacío, ATC inválido, uso de `97` o contradicción con V45/V53. Advertencia para revisión de soporte ATC.

---

### V53.2-V53.9 — Medicamentos antineoplásicos administrados 2 a 9 en primer o único esquema

**Módulo:** Medicamentos primer o único esquema
**Tipo de dato:** Código ATC / comodín
**Formato:** Código ATC válido, `97` o `98`
**Longitud:** Según ATC
**Catálogo de referencia:** ATC operativo CAC
**Comodines permitidos:**

* `97`: Sí recibió quimioterapia ya registrada en variables anteriores, cuando V45=1
* `98`: No aplica, cuando V45=98

**Dependencias:** V45, V53, V53.1
**Reglas de validación:**

* Deben estar diligenciadas.
* Si la posición está habilitada por V53, debe registrar ATC válido.
* Si la posición no está habilitada y V45=1, puede registrar `97` según secuencia.
* Si V45=98, debe registrar `98`.
* Los ATC registrados deben estar soportados y administrados dentro del periodo.
* No debe capturarse el mismo esquema de tratamiento en primer y segundo esquema.
* No deben repetirse medicamentos dentro del bloque cuando la regla de duplicidad aplique.

**Reglas de excepción:**

* `97` y `98` son permitidos según contexto; no deben generar advertencia por sí solos.
* La advertencia sólo debe aparecer si hay incoherencia de secuencia, duplicidad o soporte.

**Soporte documental:** Historia clínica, registro de administración, prescripción
**Severidad esperada:** Error para vacío, ATC inválido o comodín incoherente. Advertencia para revisión de soporte o duplicidad.

---

### V54 — Medicamento adicional 1 al primer o único esquema

**Módulo:** Medicamentos adicionales primer o único esquema
**Tipo de dato:** Código ATC / comodín
**Formato:** Código ATC válido, `97` o `98`
**Longitud:** Según ATC
**Catálogo de referencia:** ATC operativo CAC
**Comodines permitidos:**

* `97`: No recibió medicamentos diferentes a V53.1-V53.9 y V45=1
* `98`: No tuvo este esquema y V45=98

**Dependencias:** V45, V53.1-V53.9, V55, V56
**Reglas de validación:**

* Debe estar diligenciada.
* Si recibió medicamento adicional diferente a V53.1-V53.9, debe registrar ATC válido.
* Si no recibió medicamento adicional y V45=1, debe registrar `97`.
* Si V45=98, debe registrar `98`.
* El medicamento no debe estar en V53.1-V53.9.
* Reportar únicamente medicamentos antineoplásicos.
* No debe repetirse con V55 o V56.

**Reglas de excepción:**

* `97` y `98` son permitidos según contexto; no deben generar advertencia por sí solos.

**Soporte documental:** Historia clínica, registro de administración, prescripción
**Severidad esperada:** Error para vacío, ATC inválido, duplicidad o comodín incoherente. Advertencia para revisión de soporte.

---

### V55 — Medicamento adicional 2 al primer o único esquema

**Módulo:** Medicamentos adicionales primer o único esquema
**Tipo de dato:** Código ATC / comodín
**Formato:** Código ATC válido, `97` o `98`
**Longitud:** Según ATC
**Catálogo de referencia:** ATC operativo CAC
**Comodines permitidos:**

* `97`: No recibió medicamento diferente a V53.1-V53.9 y V45=1
* `98`: No tuvo este esquema y V45=98

**Dependencias:** V45, V53.1-V53.9, V54, V56
**Reglas de validación:**

* Debe estar diligenciada.
* Si recibió segundo medicamento adicional diferente a V53.1-V53.9, debe registrar ATC válido.
* Si no recibió medicamento adicional y V45=1, debe registrar `97`.
* Si V45=98, debe registrar `98`.
* El medicamento no debe estar en V53.1-V53.9.
* Reportar únicamente medicamentos antineoplásicos.
* No debe repetirse con V54 o V56.

**Reglas de excepción:**

* `97` y `98` son permitidos según contexto; no deben generar advertencia por sí solos.

**Soporte documental:** Historia clínica, registro de administración, prescripción
**Severidad esperada:** Error para vacío, ATC inválido, duplicidad o comodín incoherente. Advertencia para revisión de soporte.

---

### V56 — Medicamento adicional 3 al primer o único esquema

**Módulo:** Medicamentos adicionales primer o único esquema
**Tipo de dato:** Código ATC / comodín
**Formato:** Código ATC válido, `97` o `98`
**Longitud:** Según ATC
**Catálogo de referencia:** ATC operativo CAC
**Comodines permitidos:**

* `97`: No recibió medicamento diferente a V53.1-V53.9 y V45=1
* `98`: No tuvo este esquema y V45=98

**Dependencias:** V45, V53.1-V53.9, V54, V55
**Reglas de validación:**

* Debe estar diligenciada.
* Si recibió tercer medicamento adicional diferente a V53.1-V53.9, debe registrar ATC válido.
* Si no recibió medicamento adicional y V45=1, debe registrar `97`.
* Si V45=98, debe registrar `98`.
* El medicamento no debe estar en V53.1-V53.9.
* Reportar únicamente medicamentos antineoplásicos.
* No debe repetirse con V54 o V55.

**Reglas de excepción:**

* `97` y `98` son permitidos según contexto; no deben generar advertencia por sí solos.

**Soporte documental:** Historia clínica, registro de administración, prescripción
**Severidad esperada:** Error para vacío, ATC inválido, duplicidad o comodín incoherente. Advertencia para revisión de soporte.

---

### V57 — ¿Recibió quimioterapia intratecal en el primer o único esquema?

**Módulo:** Quimioterapia intratecal
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Quimioterapia intratecal
**Comodines permitidos:**

* `98`: No aplica, no tuvo ningún esquema de quimioterapia y V45=98

**Dependencias:** V45, V47
**Valores permitidos:**

* `1`: Sí recibió
* `2`: No recibió
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Si V45=98, debe registrar `98`.
* Si V45=1 y no recibió intratecal, debe registrar `2`.
* Si recibió intratecal, debe registrar `1`.
* Si el cáncer no aplica para intratecal, pero recibió terapia sistémica, debe registrar `2`.

**Reglas de excepción:**

* `98` es permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, administración intratecal, protocolo terapéutico
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con V45. Advertencia sólo para revisión clínica si aplica.

---

### V58 — Fecha de finalización del primer o único esquema

**Módulo:** Finalización primer o único esquema
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `1800-01-01`: Hormonoterapia o esquema que aún no finaliza
* `1845-01-01`: No aplica, cuando V45=98

**Dependencias:** V45, V49, V59
**Reglas de validación:**

* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Si sólo se conoce año y mes, registrar día 15.
* Si el esquema terminó en el periodo, debe registrar fecha real de finalización.
* Si es hormonoterapia o esquema que aún no finaliza, debe registrar `1800-01-01`.
* Si V45=98, debe registrar `1845-01-01`.
* Si registra fecha real, no debería ser anterior a la fecha de inicio V49.

**Reglas de excepción:**

* `1800-01-01` y `1845-01-01` son permitidos según contexto; no deben generar advertencia por sí solos.

**Soporte documental:** Historia clínica, registros de administración, cierre de esquema
**Severidad esperada:** Error para vacío, formato inválido, fecha inexistente o contradicción con V45/V49/V59. Advertencia sólo para revisión temporal.

---

### V59 — Características actuales del primer o único esquema

**Módulo:** Estado del primer o único esquema
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Características del esquema
**Comodines permitidos:**

* `98`: No aplica, no tuvo esquema de terapia sistémica y V45=98

**Dependencias:** V45, V58, V60
**Valores permitidos:**

* `1`: Finalizado, esquema completo según medicamentos programados
* `2`: Finalizado, esquema incompleto pero finalizado por algún motivo
* `3`: No finalizado, esquema incompleto, pero aún bajo tratamiento
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Si V45=98, debe registrar `98`.
* Si V58 tiene fecha real de finalización completa, V59 debe ser coherente con `1` o `2`.
* Si V58=`1800-01-01`, V59 debe ser coherente con esquema no finalizado, usualmente `3`.
* Si V59=2, se habilita V60 con motivo de finalización prematura.
* Si V59 es diferente de 2, V60 debe ser `98`.

**Reglas de excepción:**

* `98` es permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, cierre o continuidad del esquema
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con V45/V58/V60.

---

### V60 — Motivo de finalización prematura del primer o único esquema

**Módulo:** Finalización prematura primer o único esquema
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Motivo de finalización prematura
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V59
**Valores permitidos:**

* `1`: Toxicidad de uno o más medicamentos
* `2`: Otros motivos médicos
* `3`: Muerte
* `4`: Cambio de EAPB
* `5`: Decisión del usuario, abandonó la terapia
* `6`: No hay disponibilidad de medicamentos
* `7`: Otros motivos administrativos
* `8`: Otras causas no contempladas
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Sólo aplica si V59=2.
* Si V59=2, debe registrar un motivo entre `1` y `8`.
* Si V59 es diferente de `2`, debe registrar `98`.
* Debe seleccionarse un solo motivo, el que primero ocurrió.

**Reglas de excepción:**

* `98` es permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, nota de suspensión/finalización, soporte administrativo o clínico
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con V59. Advertencia sólo para revisión documental del motivo.
# Matriz funcional por variable — V61 a V73

## Bloque V61-V73 — Último esquema de quimioterapia o terapia sistémica en el periodo de reporte actual

### V61 — Ubicación temporal del último esquema de quimioterapia o terapia sistémica

**Módulo:** Último esquema de terapia sistémica
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Ubicación temporal del último esquema
**Comodines permitidos:**

* `97`: Sólo recibió un esquema de quimioterapia en este periodo y en V45 seleccionó `1`
* `98`: No aplica, cuando V45=98

**Dependencias:** V45, V62-V73
**Valores permitidos:**

* `1`: Neoadyuvancia, manejo inicial prequirúrgico
* `2`: Tratamiento inicial curativo sin cirugía sugerida
* `3`: Adyuvancia, manejo inicial postquirúrgico
* `11`: Manejo de progresión o recaída
* `12`: Manejo de enfermedad metastásica
* `13`: Cambio por toxicidad
* `14`: Manejo paliativo, sin manejo de recaída ni enfermedad metastásica
* `97`: Sólo recibió un esquema de quimioterapia en este periodo
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Si V45=98, debe registrar `98`.
* Si V45=1 y el paciente sólo recibió un esquema en el periodo, debe registrar `97`.
* Si V61=97, las variables V62 a V73 deben registrar No Aplica según regla propia de cada variable.
* Si V45=1 y recibió un último esquema diferente al primero/único, debe registrar una ubicación temporal válida entre `1,2,3,11,12,13,14`.
* No debe capturar nuevamente el mismo esquema registrado en V45-V60.
* Para pacientes que recibieron un solo esquema dentro del periodo y aún no finalizan, debe registrar `97`.

**Reglas de excepción:**

* `97` y `98` son valores permitidos por instructivo y no deben generar advertencia por sí solos.
* La revisión debe hacerse contra las variables dependientes V62-V73 si contradicen V61.

**Soporte documental:** Historia clínica, protocolo terapéutico, registros de administración
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con V45. Advertencia sólo para revisión de trazabilidad del bloque dependiente.

---

### V62 — Fecha de inicio del último esquema de quimioterapia o terapia sistémica

**Módulo:** Último esquema de terapia sistémica
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `1845-01-01`: No aplica

**Dependencias:** V45, V61
**Reglas de validación:**

* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Si sólo se conoce año y mes, registrar día 15.
* Si V61=97 o V61=98, debe registrar `1845-01-01`.
* Si V61 corresponde a un último esquema real, debe registrar fecha real de inicio.
* Si se trata de hormonoterapia, debe reportar la fecha de inicio del tratamiento actual, aunque haya iniciado antes del periodo de reporte.

**Reglas de excepción:**

* `1845-01-01` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.
* Una fecha anterior al periodo puede ser válida si el tratamiento continúa durante el periodo actual.

**Soporte documental:** Historia clínica, prescripción, registro de administración
**Severidad esperada:** Error para vacío, formato inválido, fecha inexistente o contradicción con V61. Advertencia sólo para revisión temporal cuando amerite.

---

### V63 — Número de IPS que suministran el último esquema

**Módulo:** Último esquema de terapia sistémica
**Tipo de dato:** Numérico
**Formato:** Entero o comodín
**Longitud:** Según valor
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V45, V61, V64, V65
**Reglas de validación:**

* Debe estar diligenciada.
* Si V61=97 o V61=98, debe registrar `98`.
* Si V61 corresponde a un último esquema real, debe registrar el número de IPS que suministraron el último esquema.
* Si V63=1, V64 debe aplicar y V65 debe ser `98`.
* Si V63=2, V64 y V65 deben aplicar.
* Debe ser coherente con los códigos IPS reportados en V64 y V65.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, registros de administración, IPS tratantes
**Severidad esperada:** Error para vacío, valor inválido o contradicción con V61/V64/V65.

---

### V64 — Código de la IPS1 que suministra el último esquema

**Módulo:** Último esquema de terapia sistémica
**Tipo de dato:** Código de habilitación IPS
**Formato:** 12 dígitos, incluido cero inicial
**Longitud:** 12 caracteres cuando aplica
**Catálogo de referencia:** REPS
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V45, V61, V63, V65
**Reglas de validación:**

* Debe estar diligenciada.
* Si V61=97 o V61=98, debe registrar `98`.
* Si V63=98, debe registrar `98`.
* Si V63 indica al menos una IPS, debe registrar código de habilitación válido de 12 dígitos.
* Para tratamientos orales, debe registrar la IPS que prescribió el tratamiento, no el operador logístico que entrega.
* Debe conservar ceros iniciales.
* Debe ser coherente con V63.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.
* Puede requerir revisión de habilitación REPS o soporte documental cuando aplica.

**Soporte documental:** Historia clínica, REPS, prescripción, registros de administración
**Severidad esperada:** Error para vacío, formato inválido, IPS no válida o contradicción con V61/V63. Advertencia para revisión REPS/soporte.

---

### V65 — Código de la IPS2 que suministra el último esquema

**Módulo:** Último esquema de terapia sistémica
**Tipo de dato:** Código de habilitación IPS
**Formato:** 12 dígitos, incluido cero inicial
**Longitud:** 12 caracteres cuando aplica
**Catálogo de referencia:** REPS
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V45, V61, V63, V64
**Reglas de validación:**

* Debe estar diligenciada.
* Si V61=97 o V61=98, debe registrar `98`.
* Si V63=1 o V63=98, debe registrar `98`.
* Si V63=2, debe registrar código de habilitación válido para la segunda IPS.
* Para tratamientos orales, debe registrar la IPS que prescribió el tratamiento, no el operador logístico.
* Debe conservar ceros iniciales.
* Debe ser coherente con V63 y V64.

**Reglas de excepción:**

* `98` es valor permitido cuando no hay segunda IPS o no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, REPS, prescripción, registros de administración
**Severidad esperada:** Error para vacío, formato inválido, IPS no válida o contradicción con V61/V63/V64. Advertencia para revisión REPS/soporte.

---

### V66 — Número de medicamentos antineoplásicos o terapia hormonal propuestos en el último esquema

**Módulo:** Último esquema de terapia sistémica
**Tipo de dato:** Numérico
**Formato:** Entero o comodín
**Longitud:** Según valor
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `98`: No aplica, no recibió segundo/último esquema o V45=98

**Dependencias:** V45, V61, V66.1-V66.9, V67-V69
**Reglas de validación:**

* Debe estar diligenciada.
* Si V45=98, debe registrar `98`.
* Si V61=97 o V61=98, debe registrar `98`.
* Si existe último esquema real, debe registrar número de medicamentos antineoplásicos propuestos.
* Deben descontarse medicamentos adyuvantes o de premedicación que no son antineoplásicos.
* Se registra el número total de medicamentos propuestos, no necesariamente administrados.
* En V66.1-V66.9 y V67-V69 se registran sólo ATC de fármacos administrados en el periodo.
* No debe interpretarse `98` como 98 medicamentos.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, prescripción, esquema terapéutico, registros de administración
**Severidad esperada:** Error para vacío, valor inválido o contradicción con V45/V61/medicamentos. Advertencia para revisión de medicamentos no cuantificables o soporte.

---

### V66.1 — Medicamento antineoplásico administrado 1 en último esquema

**Módulo:** Medicamentos último esquema
**Tipo de dato:** Código ATC / comodín
**Formato:** Código ATC válido o `98`
**Longitud:** Según ATC
**Catálogo de referencia:** ATC operativo CAC
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V45, V61, V66
**Reglas de validación:**

* Debe estar diligenciada.
* Si V45=98, V61=97 o V61=98, debe registrar `98`.
* Si V66 habilita medicamento real, debe registrar ATC válido administrado.
* No permite `97` en la primera posición del último esquema.
* El ATC debe estar descrito en soportes clínicos y administrado dentro del periodo de reporte.

**Reglas de excepción:**

* `98` es valor permitido si no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, registro de administración, prescripción
**Severidad esperada:** Error para vacío, ATC inválido, uso de `97` o contradicción con V45/V61/V66. Advertencia para revisión de soporte ATC.

---

### V66.2-V66.9 — Medicamentos antineoplásicos administrados 2 a 9 en último esquema

**Módulo:** Medicamentos último esquema
**Tipo de dato:** Código ATC / comodín
**Formato:** Código ATC válido, `97` o `98`
**Longitud:** Según ATC
**Catálogo de referencia:** ATC operativo CAC
**Comodines permitidos:**

* `97`: Sí recibió quimioterapia, ya registrada en variables anteriores, cuando V45=1
* `98`: No aplica

**Dependencias:** V45, V61, V66, V66.1
**Reglas de validación:**

* Deben estar diligenciadas.
* Si V45=98, debe registrar `98`.
* Si V61=97 o V61=98, debe registrar `98`.
* Si la posición está habilitada por V66, debe registrar ATC válido.
* Si la posición no está habilitada y V45=1, puede registrar `97` según secuencia y aplicación.
* Los ATC deben estar soportados y administrados dentro del periodo.
* No debe repetirse medicamento dentro del bloque cuando la regla de duplicidad aplique.
* No debe capturarse nuevamente el mismo esquema registrado en el primer o único esquema.

**Reglas de excepción:**

* `97` y `98` son valores permitidos según contexto; no deben generar advertencia por sí solos.
* La advertencia sólo debe aparecer si hay incoherencia de secuencia, duplicidad o soporte.

**Soporte documental:** Historia clínica, registro de administración, prescripción
**Severidad esperada:** Error para vacío, ATC inválido, comodín incoherente o duplicidad no permitida. Advertencia para revisión de soporte.

---

### V67 — Medicamento adicional 1 al último esquema

**Módulo:** Medicamentos adicionales último esquema
**Tipo de dato:** Código ATC / comodín
**Formato:** Código ATC válido, `97` o `98`
**Longitud:** Según ATC
**Catálogo de referencia:** ATC operativo CAC
**Comodines permitidos:**

* `97`: No recibió medicamento diferente a V66.1-V66.9 y V61 seleccionó una opción menor a 14
* `98`: No tuvo último esquema o V61=97/98

**Dependencias:** V61, V66.1-V66.9, V68, V69
**Reglas de validación:**

* Debe estar diligenciada.
* Si recibió medicamento adicional diferente a V66.1-V66.9, debe registrar ATC válido.
* Si no recibió adicional y V61 es una opción aplicable menor a 14, debe registrar `97`.
* Si no tuvo último esquema o V61=97/98, debe registrar `98`.
* El medicamento no debe estar en V66.1-V66.9.
* Debe reportar únicamente medicamentos antineoplásicos.
* No debe repetirse con V68 o V69.

**Reglas de excepción:**

* `97` y `98` son valores permitidos según contexto; no deben generar advertencia por sí solos.

**Soporte documental:** Historia clínica, registro de administración, prescripción
**Severidad esperada:** Error para vacío, ATC inválido, duplicidad o comodín incoherente. Advertencia para revisión de soporte.

---

### V68 — Medicamento adicional 2 al último esquema

**Módulo:** Medicamentos adicionales último esquema
**Tipo de dato:** Código ATC / comodín
**Formato:** Código ATC válido, `97` o `98`
**Longitud:** Según ATC
**Catálogo de referencia:** ATC operativo CAC
**Comodines permitidos:**

* `97`: No recibió medicamento diferente a V66.1-V66.9 y V61 seleccionó una opción menor a 14
* `98`: No tuvo último esquema o V61=97/98

**Dependencias:** V61, V66.1-V66.9, V67, V69
**Reglas de validación:**

* Debe estar diligenciada.
* Si recibió segundo medicamento adicional diferente a V66.1-V66.9, debe registrar ATC válido.
* Si no recibió adicional y V61 es una opción aplicable menor a 14, debe registrar `97`.
* Si no tuvo último esquema o V61=97/98, debe registrar `98`.
* El medicamento no debe estar en V66.1-V66.9.
* Debe reportar únicamente medicamentos antineoplásicos.
* No debe repetirse con V67 o V69.

**Reglas de excepción:**

* `97` y `98` son valores permitidos según contexto; no deben generar advertencia por sí solos.

**Soporte documental:** Historia clínica, registro de administración, prescripción
**Severidad esperada:** Error para vacío, ATC inválido, duplicidad o comodín incoherente. Advertencia para revisión de soporte.

---

### V69 — Medicamento adicional 3 al último esquema

**Módulo:** Medicamentos adicionales último esquema
**Tipo de dato:** Código ATC / comodín
**Formato:** Código ATC válido, `97` o `98`
**Longitud:** Según ATC
**Catálogo de referencia:** ATC operativo CAC
**Comodines permitidos:**

* `97`: No recibió medicamento diferente a V66.1-V66.9 y V61 seleccionó una opción menor a 14
* `98`: No tuvo último esquema o V61=97/98

**Dependencias:** V61, V66.1-V66.9, V67, V68
**Reglas de validación:**

* Debe estar diligenciada.
* Si recibió tercer medicamento adicional diferente a V66.1-V66.9, debe registrar ATC válido.
* Si no recibió adicional y V61 es una opción aplicable menor a 14, debe registrar `97`.
* Si no tuvo último esquema o V61=97/98, debe registrar `98`.
* El medicamento no debe estar en V66.1-V66.9.
* Debe reportar únicamente medicamentos antineoplásicos.
* No debe repetirse con V67 o V68.

**Reglas de excepción:**

* `97` y `98` son valores permitidos según contexto; no deben generar advertencia por sí solos.

**Soporte documental:** Historia clínica, registro de administración, prescripción
**Severidad esperada:** Error para vacío, ATC inválido, duplicidad o comodín incoherente. Advertencia para revisión de soporte.

---

### V70 — ¿Recibió quimioterapia intratecal en el último esquema?

**Módulo:** Quimioterapia intratecal último esquema
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Quimioterapia intratecal
**Comodines permitidos:**

* `98`: No aplica, no tuvo ningún esquema de quimioterapia o V45=98

**Dependencias:** V45, V61
**Valores permitidos:**

* `1`: Sí recibió
* `2`: No recibió
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Si V45=98 o no tuvo último esquema aplicable, debe registrar `98`.
* Si tuvo último esquema y recibió intratecal, debe registrar `1`.
* Si tuvo último esquema y no recibió intratecal, debe registrar `2`.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, administración intratecal, protocolo terapéutico
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con V45/V61. Advertencia sólo para revisión clínica si aplica.

---

### V71 — Fecha de finalización del último esquema de quimioterapia o terapia sistémica

**Módulo:** Finalización último esquema
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `1800-01-01`: Hormonoterapia o esquema que aún no finaliza
* `1845-01-01`: No aplica

**Dependencias:** V61, V62, V72
**Reglas de validación:**

* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Si sólo se conoce año y mes, registrar día 15.
* Si el último esquema terminó en el periodo, debe registrar fecha real de finalización.
* Si es hormonoterapia o esquema que aún no finaliza, debe registrar `1800-01-01`.
* Si V61=97 o V61=98, debe registrar `1845-01-01`.
* Si registra fecha real, no debería ser anterior a la fecha de inicio V62.

**Reglas de excepción:**

* `1800-01-01` y `1845-01-01` son valores permitidos según contexto; no deben generar advertencia por sí solos.

**Soporte documental:** Historia clínica, registros de administración, cierre o continuidad del esquema
**Severidad esperada:** Error para vacío, formato inválido, fecha inexistente o contradicción con V61/V62/V72. Advertencia sólo para revisión temporal.

---

### V72 — Características actuales del último esquema

**Módulo:** Estado del último esquema
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Características del esquema
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V61, V71, V73
**Valores permitidos:**

* `1`: Finalizado, esquema completo según medicamentos programados
* `2`: Finalizado, esquema incompleto pero finalizado por algún motivo
* `3`: No finalizado, esquema incompleto, pero aún bajo tratamiento
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Si V61=97 o V61=98, debe registrar `98`.
* Si V71 tiene fecha real de finalización completa, V72 debe ser coherente con `1` o `2`.
* Si V71=`1800-01-01`, V72 debe ser coherente con esquema no finalizado, usualmente `3`.
* Si V72=2, se habilita V73 con motivo de finalización prematura.
* Si V72 es diferente de `2`, V73 debe registrar `98`.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, cierre o continuidad del esquema
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con V61/V71/V73.

---

### V73 — Motivo de finalización prematura del último esquema

**Módulo:** Finalización prematura último esquema
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Motivo de finalización prematura
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V72
**Valores permitidos:**

* `1`: Toxicidad de uno o más medicamentos
* `2`: Otros motivos médicos
* `3`: Muerte
* `4`: Cambio de EPS
* `5`: Decisión del usuario, abandonó la terapia
* `6`: No hay disponibilidad de medicamentos
* `7`: Otros motivos administrativos
* `8`: Otras causas no contempladas
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Sólo aplica si V72=2.
* Si V72=2, debe registrar un motivo entre `1` y `8`.
* Si V72 es diferente de `2`, debe registrar `98`.
* Debe seleccionarse un solo motivo, el que primero ocurrió.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, nota de suspensión/finalización, soporte administrativo o clínico
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con V72. Advertencia sólo para revisión documental del motivo.
# Matriz funcional por variable — V74 a V85

## Bloque V74-V85 — Cirugía en el periodo de reporte actual

### V74 — ¿Fue sometido el usuario a una o más cirugías curativas o paliativas como parte del manejo del cáncer?

**Módulo:** Cirugía en el periodo de reporte actual
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Cirugía durante el periodo
**Comodines permitidos:** No aplica

**Dependencias:** V75-V85
**Valores permitidos:**

* `1`: Sí fue sometido al menos a una cirugía durante este periodo
* `2`: No recibió cirugía

**Reglas de validación:**

* Debe estar diligenciada.
* Sólo permite `1` o `2`.
* Si V74=1, se habilitan las variables quirúrgicas V75-V85 según corresponda.
* Si V74=2, las variables V75-V85 deben registrar No Aplica según regla propia de cada variable.
* Sólo deben reportarse cirugías curativas o paliativas realizadas como parte del manejo del cáncer.
* No aplican cirugías propuestas pero no realizadas.
* La opción 3 fue eliminada.
* Si el procedimiento quirúrgico es diagnóstico y terapéutico, por ejemplo tiroidectomía o resección de tumor de piel, debe reportarse en este bloque.
* Los procedimientos deben venir del listado CUPS operativo y su objetivo debe ser el manejo del cáncer.
* No son objeto de reporte implante de catéter, punción lumbar, biopsias ni cierre de ostomías.
* Si en el mismo tiempo quirúrgico recibió varias intervenciones reportables, seleccionar la más representativa frente al cáncer.

**Reglas de excepción:**

* V74=2 es valor válido y no debe generar advertencia por sí solo.
* La revisión debe hacerse contra las variables dependientes si contradicen V74.

**Soporte documental:** Nota quirúrgica, historia clínica, CUPS operativo, soporte de procedimiento
**Severidad esperada:** Error para vacío o valor fuera de catálogo. Advertencia sólo para revisión de pertinencia quirúrgica frente al manejo del cáncer.

---

### V75 — Número de cirugías a las que fue sometido el usuario durante el periodo

**Módulo:** Cirugía en el periodo de reporte actual
**Tipo de dato:** Numérico
**Formato:** Entero o comodín
**Longitud:** Según valor
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `98`: No aplica, si V74=2

**Dependencias:** V74, V76-V85
**Reglas de validación:**

* Debe estar diligenciada.
* Si V74=2, debe registrar `98`.
* Si V74=1, debe registrar el número de cirugías o tiempos quirúrgicos realizados durante el periodo.
* Debe incluir cirugías por complicaciones relacionadas con la cirugía inicial.
* Debe reportarse cantidad de cirugías o tiempos quirúrgicos, no cantidad de procedimientos CUPS realizados dentro de una o varias cirugías.
* Si V75=1, las variables de última cirugía/reintervención deben registrar No Aplica según regla propia.
* Si V75>1, se habilitan las variables de última cirugía/reintervención.

**Reglas de excepción:**

* `98` es valor permitido cuando V74=2; no debe generar advertencia por sí solo.

**Soporte documental:** Nota quirúrgica, historia clínica, registro de procedimientos
**Severidad esperada:** Error para vacío, valor inválido o contradicción con V74. Advertencia sólo para revisión de conteo quirúrgico si parece confundirse CUPS con tiempo quirúrgico.

---

### V76 — Fecha de realización de la primera cirugía en este periodo de reporte

**Módulo:** Primera cirugía
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `1845-01-01`: No aplica

**Dependencias:** V74, V75, V23
**Reglas de validación:**

* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Si sólo se conoce año y mes, registrar día 15.
* Si V74=2, debe registrar `1845-01-01`.
* Si V74=1, debe registrar fecha real de la primera cirugía.
* Si el procedimiento quirúrgico fue diagnóstico y terapéutico, debe tener coherencia con la fecha de recolección de muestra en V23 cuando aplique.
* Debe corresponder a cirugía realizada durante el periodo de reporte actual.

**Reglas de excepción:**

* `1845-01-01` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Nota quirúrgica, historia clínica, registro de cirugía
**Severidad esperada:** Error para vacío, formato inválido, fecha inexistente o contradicción con V74. Advertencia sólo para revisión temporal o trazabilidad con V23.

---

### V77 — Código de la IPS que realizó la primera cirugía

**Módulo:** Primera cirugía
**Tipo de dato:** Código de habilitación IPS
**Formato:** 12 dígitos, incluido cero inicial
**Longitud:** 12 caracteres cuando aplica
**Catálogo de referencia:** REPS
**Comodines permitidos:**

* `96`: Cirugía fuera del país
* `98`: No aplica

**Dependencias:** V74, V75, V76
**Reglas de validación:**

* Debe estar diligenciada.
* Si V74=2, debe registrar `98`.
* Si V74=1, debe registrar código de habilitación de la IPS que realizó la primera cirugía.
* Si la cirugía fue realizada fuera del país, permite `96`.
* El código IPS debe conservar ceros iniciales.
* Debe ser coherente con la fecha y cirugía reportada en V76 y V78.

**Reglas de excepción:**

* `96` y `98` son valores permitidos según contexto; no deben generar advertencia por sí solos.

**Soporte documental:** Nota quirúrgica, historia clínica, REPS, soporte de cirugía fuera del país
**Severidad esperada:** Error para vacío, formato inválido o contradicción con V74. Advertencia sólo para revisión de habilitación/soporte.

---

### V78 — Código de primera cirugía en este periodo de reporte

**Módulo:** Primera cirugía
**Tipo de dato:** Código CUPS / comodín
**Formato:** Código CUPS del archivo operativo o `98`
**Longitud:** Según CUPS
**Catálogo de referencia:** Archivo operativo CUPS de SISCAC
**Comodines permitidos:**

* `98`: No aplica, si V74=2

**Dependencias:** V74, V75, V76, V77
**Reglas de validación:**

* Debe estar diligenciada.
* Si V74=2, debe registrar `98`.
* Si V74=1, debe registrar código CUPS de la primera cirugía.
* Debe utilizarse el CUPS con mayor relación con el manejo del cáncer o el que represente mayor complejidad dentro de la cirugía.
* Los procedimientos como fotoféresis, fototerapia, crioterapia y radiofrecuencia se reportan en esta variable con el CUPS correspondiente, deben tenerse en cuenta en V74 y cuantificarse en V75.
* No deben reportarse procedimientos que el instructivo excluye, como implante de catéter, punción lumbar, biopsias o cierre de ostomías.

**Reglas de excepción:**

* `98` es valor permitido cuando V74=2; no debe generar advertencia por sí solo.
* Procedimientos especiales reportables pueden requerir advertencia de revisión, no error automático, si el CUPS existe y pertenece al grupo permitido.

**Soporte documental:** Nota quirúrgica, CUPS operativo, historia clínica
**Severidad esperada:** Error para vacío, CUPS inválido o contradicción con V74. Advertencia para revisión de pertinencia frente al manejo del cáncer.

---

### V79 — Ubicación temporal de la primera cirugía en relación al manejo oncológico

**Módulo:** Primera cirugía
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Ubicación temporal de cirugía
**Comodines permitidos:**

* `98`: No aplica, si V74=2

**Dependencias:** V74, V76, V78
**Valores permitidos:**

* `1`: Parte del manejo inicial para el cáncer, tratamiento inicial curativo
* `5`: Manejo de recaída
* `6`: Manejo de enfermedad metastásica
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Si V74=2, debe registrar `98`.
* Si V74=1, debe registrar `1`, `5` o `6`.
* Debe ser coherente con la intención del procedimiento quirúrgico y el contexto clínico del cáncer.

**Reglas de excepción:**

* `98` es valor permitido cuando V74=2; no debe generar advertencia por sí solo.
* `5` y `6` son valores permitidos, pero pueden ameritar advertencia de revisión clínica/soporte si el sistema la contempla.

**Soporte documental:** Historia clínica, nota quirúrgica, contexto de recaída o enfermedad metastásica
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con V74. Advertencia para revisión de soporte en recaída/metástasis.

---

### V80 — Fecha de realización de la última cirugía o cirugía de reintervención

**Módulo:** Última cirugía o reintervención
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `1845-01-01`: No aplica, si sólo hubo una intervención o no hubo cirugías

**Dependencias:** V74, V75, V76
**Reglas de validación:**

* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Si sólo se conoce año y mes, registrar día 15.
* Si V74=2, debe registrar `1845-01-01`.
* Si V75=1, debe registrar `1845-01-01`.
* Si V75>1, debe registrar fecha real de la última cirugía o reintervención.
* Debe validarse que no se estén reportando datos del evento quirúrgico denominado primera cirugía.
* Si registra fecha real, no debe ser anterior a V76.

**Reglas de excepción:**

* `1845-01-01` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.
* Si V75>1 y V80 coincide con V76, puede ameritar advertencia de revisión para confirmar que no se repitió el mismo evento.

**Soporte documental:** Nota quirúrgica, historia clínica, registro de reintervención
**Severidad esperada:** Error para vacío, formato inválido, fecha inexistente o contradicción con V74/V75/V76. Advertencia para revisión si V80=V76 con más de una cirugía.

---

### V81 — Motivo de haber realizado la última cirugía de este periodo de reporte

**Módulo:** Última cirugía o reintervención
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Motivo de última cirugía
**Comodines permitidos:**

* `98`: No aplica, si sólo hubo una intervención o no hubo cirugías

**Dependencias:** V74, V75, V80
**Valores permitidos:**

* `1`: Complementar tratamiento quirúrgico del cáncer no asociado a complicaciones de la primera cirugía
* `2`: Complicaciones debidas a la primera cirugía o siguientes
* `3`: Complicaciones por otras condiciones médicas no relacionadas con la cirugía, por ejemplo comorbilidad
* `5`: Opciones 1 y 3
* `6`: Opciones 2 y 3
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Si V74=2 o V75=1, debe registrar `98`.
* Si V75>1 y V80 tiene fecha real, debe registrar motivo válido entre `1`, `2`, `3`, `5` o `6`.
* Debe ser coherente con la causa documentada de la última cirugía o reintervención.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Nota quirúrgica, historia clínica, evolución médica
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con V74/V75/V80. Advertencia sólo para revisión documental del motivo.

---

### V82 — Código de la IPS que realiza la última cirugía

**Módulo:** Última cirugía o reintervención
**Tipo de dato:** Código de habilitación IPS
**Formato:** 12 dígitos, incluido cero inicial
**Longitud:** 12 caracteres cuando aplica
**Catálogo de referencia:** REPS
**Comodines permitidos:**

* `98`: No aplica, si sólo hubo una intervención o no hubo cirugías

**Dependencias:** V74, V75, V80, V81
**Reglas de validación:**

* Debe estar diligenciada.
* Si V74=2 o V75=1, debe registrar `98`.
* Si V75>1 y hubo última cirugía/reintervención real, debe registrar código de habilitación IPS.
* Debe conservar ceros iniciales.
* Debe ser coherente con V80 y V81.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Nota quirúrgica, historia clínica, REPS
**Severidad esperada:** Error para vacío, formato inválido o contradicción con V74/V75/V80. Advertencia para revisión REPS/soporte.

---

### V83 — Código de última cirugía en este periodo de reporte

**Módulo:** Última cirugía o reintervención
**Tipo de dato:** Código CUPS / comodín
**Formato:** Código CUPS del archivo operativo o `98`
**Longitud:** Según CUPS
**Catálogo de referencia:** Archivo operativo CUPS SISCAC
**Comodines permitidos:**

* `98`: No aplica, si sólo hubo una intervención o no hubo cirugías

**Dependencias:** V74, V75, V80, V82
**Reglas de validación:**

* Debe estar diligenciada.
* Si V74=2 o V75=1, debe registrar `98`.
* Si V75>1 y hubo última cirugía/reintervención real, debe registrar CUPS quirúrgico válido.
* Debe utilizarse el CUPS con mayor relación con el manejo del cáncer o el de mayor complejidad dentro de la cirugía.
* Debe ser coherente con la última cirugía descrita en V80-V82.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Nota quirúrgica, CUPS operativo, historia clínica
**Severidad esperada:** Error para vacío, CUPS inválido o contradicción con V74/V75/V80. Advertencia para revisión de pertinencia.

---

### V84 — Ubicación temporal de la última cirugía en relación al manejo oncológico

**Módulo:** Última cirugía o reintervención
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Ubicación temporal de cirugía
**Comodines permitidos:**

* `98`: No aplica, si sólo hubo una intervención o V74=2

**Dependencias:** V74, V75, V80, V83
**Valores permitidos:**

* `1`: Parte del manejo inicial para el cáncer, manejo inicial curativo
* `5`: Manejo de recaída
* `6`: Manejo de enfermedad metastásica
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Si V74=2 o V75=1, debe registrar `98`.
* Si V75>1 y hubo última cirugía real, debe registrar `1`, `5` o `6`.
* Debe ser coherente con el contexto clínico de la última cirugía/reintervención.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.
* `5` y `6` son valores permitidos, pero pueden ameritar revisión de soporte si la app conserva advertencia clínica.

**Soporte documental:** Historia clínica, nota quirúrgica, soporte de recaída o enfermedad metastásica
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con V74/V75. Advertencia para revisión de soporte en recaída/metástasis.

---

### V85 — Estado vital al finalizar la única o última cirugía de este periodo de reporte

**Módulo:** Cirugía / estado vital quirúrgico
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Estado vital al finalizar cirugía
**Comodines permitidos:**

* `98`: No aplica, si V74=2

**Dependencias:** V74, V76, V80
**Valores permitidos:**

* `1`: Vivo
* `2`: Fallecido
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Si V74=2, debe registrar `98`.
* Si V74=1, debe registrar `1` o `2` según estado vital al finalizar la única o última cirugía.
* Debe ser coherente con la información clínica de cierre quirúrgico.
* Si V85=2, debe revisarse trazabilidad posterior con variables de muerte/estado vital cuando corresponda.

**Reglas de excepción:**

* `98` es valor permitido cuando no hubo cirugía; no debe generar advertencia por sí solo.

**Soporte documental:** Nota quirúrgica, historia clínica, evolución médica, soporte de fallecimiento si aplica
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con V74. Advertencia para revisión de trazabilidad con fallecimiento si aplica.
# Matriz funcional por variable — V86 a V105

## Bloque V86-V105 — Radioterapia en el periodo de reporte actual

### V86 — ¿Recibió el usuario algún tipo de radioterapia en el periodo de reporte actual?

**Módulo:** Radioterapia
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Radioterapia recibida
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V87-V105
**Valores permitidos:**

* `1`: Sí recibió algún tipo de radioterapia
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Sólo permite `1` o `98`.
* Si V86=1, se habilitan las variables V87-V105 según corresponda.
* Si V86=98, las variables V87-V105 deben registrar No Aplica según la regla propia de cada variable.
* No aplica radioterapia propuesta pero no suministrada.
* La opción `2` fue eliminada.

**Reglas de excepción:**

* `98` es valor permitido y no debe generar advertencia por sí solo.
* La revisión debe hacerse contra las variables dependientes cuando contradicen V86.

**Soporte documental:** Historia clínica, plan de radioterapia, registros de administración
**Severidad esperada:** Error para vacío, valor fuera de catálogo o uso de opción eliminada. Advertencia sólo para revisión de trazabilidad del bloque dependiente.

---

### V87 — Número de sesiones de radioterapia recibidas en el periodo

**Módulo:** Radioterapia / sesiones
**Tipo de dato:** Numérico
**Formato:** Entero o comodín
**Longitud:** Según valor
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V86
**Reglas de validación:**

* Debe estar diligenciada.
* Si V86=98, debe registrar `98`.
* Si V86=1, debe registrar el número total de sesiones de radioterapia suministradas durante el periodo.
* Debe incluir sesiones de radioterapia interna o externa suministradas en el periodo.
* El valor debe ser numérico cuando aplica.
* La cantidad debe estar soportada para auditoría.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, registros de radioterapia, plan de sesiones
**Severidad esperada:** Error para vacío, valor no numérico o contradicción con V86. Advertencia sólo para revisión de soporte de cantidad de sesiones.

---

### V88 — Fecha de inicio de primer o único esquema de radioterapia

**Módulo:** Primer o único esquema de radioterapia
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `1845-01-01`: No aplica

**Dependencias:** V86, V87
**Reglas de validación:**

* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Si sólo se conoce año y mes, registrar día 15.
* Si V86=98, debe registrar `1845-01-01`.
* Si V86=1, debe registrar la fecha de inicio del tratamiento actual de radioterapia.
* La fecha puede ser anterior al periodo de reporte si el tratamiento continuó durante el periodo actual.

**Reglas de excepción:**

* `1845-01-01` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.
* Una fecha previa al periodo puede ser válida si corresponde a esquema activo suministrado en el periodo.

**Soporte documental:** Historia clínica, plan de radioterapia, registros de inicio
**Severidad esperada:** Error para vacío, formato inválido, fecha inexistente o contradicción con V86. Advertencia sólo para revisión temporal cuando amerite.

---

### V89 — Ubicación temporal del primer o único esquema de radioterapia

**Módulo:** Primer o único esquema de radioterapia
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Ubicación temporal/intención terapéutica
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V86, V88
**Valores permitidos:**

* `1`: Neoadyuvancia, manejo inicial prequirúrgico
* `2`: Tratamiento inicial curativo sin cirugía sugerida
* `3`: Adyuvancia, manejo inicial postquirúrgico
* `11`: Manejo de recaída
* `12`: Manejo de enfermedad metastásica
* `13`: Manejo paliativo, sin manejo de recaída ni enfermedad metastásica
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Si V86=98, debe registrar `98`.
* Si V86=1, debe registrar una ubicación temporal válida entre `1`, `2`, `3`, `11`, `12` o `13`.
* Debe ser coherente con el objetivo del esquema de radioterapia y el contexto clínico.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.
* Los valores `11`, `12` y `13` son permitidos; sólo ameritan advertencia si se requiere revisión clínica o soporte.

**Soporte documental:** Historia clínica, plan oncológico, indicación de radioterapia
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con V86. Advertencia sólo para revisión de soporte clínico.

---

### V90 — Tipo de radioterapia aplicada en el primer o único esquema

**Módulo:** Primer o único esquema de radioterapia
**Tipo de dato:** Código CUPS / comodín
**Formato:** Código CUPS o `98`
**Longitud:** Según CUPS
**Catálogo de referencia:** Archivo operativo CUPS de radioterapia CAC
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V86, V88, V89
**Reglas de validación:**

* Debe estar diligenciada.
* Si V86=98, debe registrar `98`.
* Si V86=1, debe registrar código CUPS de radioterapia aplicado en el primer o único esquema.
* El CUPS debe existir en el archivo operativo CAC y corresponder a radioterapia.
* Debe ser coherente con el tipo de radioterapia suministrada.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, plan de radioterapia, CUPS operativo, registro de procedimiento
**Severidad esperada:** Error para vacío, CUPS inválido, CUPS no radioterapia o contradicción con V86. Advertencia sólo para revisión de pertinencia CUPS.

---

### V91 — Número de IPS que suministran el primer o único esquema de radioterapia

**Módulo:** Primer o único esquema de radioterapia
**Tipo de dato:** Numérico
**Formato:** Entero o comodín
**Longitud:** Según valor
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V86, V92, V93
**Reglas de validación:**

* Debe estar diligenciada.
* Si V86=98, debe registrar `98`.
* Si V86=1, debe registrar el número de IPS que intervinieron en la administración de la dosis de radioterapia.
* Si V91=1, V92 aplica y V93 debe registrar `98`.
* Si V91=2, V92 y V93 aplican.
* Debe ser coherente con los códigos IPS reportados.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, registros de radioterapia, IPS tratantes
**Severidad esperada:** Error para vacío, valor inválido o contradicción con V86/V92/V93.

---

### V92 — Código de la IPS1 que suministra la radioterapia del primer o único esquema

**Módulo:** Primer o único esquema de radioterapia
**Tipo de dato:** Código de habilitación IPS
**Formato:** 12 dígitos, incluido cero inicial
**Longitud:** 12 caracteres cuando aplica
**Catálogo de referencia:** REPS
**Comodines permitidos:**

* `96`: Radioterapia fuera del país
* `98`: No aplica

**Dependencias:** V86, V91, V93
**Reglas de validación:**

* Debe estar diligenciada.
* Si V86=98 o V91=98, debe registrar `98`.
* Si V91 indica al menos una IPS, debe registrar código de habilitación de la IPS1.
* Si la radioterapia fue suministrada fuera del país, permite `96`.
* El código debe conservar ceros iniciales.
* Debe ser coherente con V91.

**Reglas de excepción:**

* `96` y `98` son valores permitidos según contexto; no deben generar advertencia por sí solos.

**Soporte documental:** Historia clínica, REPS, soporte de radioterapia fuera del país si aplica
**Severidad esperada:** Error para vacío, formato inválido o contradicción con V86/V91. Advertencia sólo para revisión REPS/soporte.

---

### V93 — Código de la IPS2 que suministra la radioterapia del primer o único esquema

**Módulo:** Primer o único esquema de radioterapia
**Tipo de dato:** Código de habilitación IPS
**Formato:** 12 dígitos, incluido cero inicial
**Longitud:** 12 caracteres cuando aplica
**Catálogo de referencia:** REPS
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V86, V91, V92
**Reglas de validación:**

* Debe estar diligenciada.
* Si V86=98, V91=98 o V91=1, debe registrar `98`.
* Si V91=2, debe registrar código de habilitación válido de la IPS2.
* El código debe conservar ceros iniciales.
* Debe ser coherente con V91 y V92.

**Reglas de excepción:**

* `98` es valor permitido cuando no hay segunda IPS o no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, REPS, registros de administración de radioterapia
**Severidad esperada:** Error para vacío, formato inválido o contradicción con V86/V91/V92. Advertencia sólo para revisión REPS/soporte.

---

### V94 — Fecha de finalización del primer o único esquema de radioterapia

**Módulo:** Finalización primer o único esquema de radioterapia
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `1800-01-01`: Esquema de radioterapia que aún no finaliza
* `1845-01-01`: No aplica

**Dependencias:** V86, V88, V95
**Reglas de validación:**

* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Si sólo se conoce año y mes, registrar día 15.
* Si V86=98, debe registrar `1845-01-01`.
* Si el esquema aún no finaliza, debe registrar `1800-01-01`.
* Si el esquema finalizó, debe registrar fecha real.
* Si registra fecha real, no debe ser anterior a V88.
* Debe ser coherente con V95.

**Reglas de excepción:**

* `1800-01-01` y `1845-01-01` son valores permitidos según contexto; no deben generar advertencia por sí solos.

**Soporte documental:** Historia clínica, plan de radioterapia, cierre del esquema
**Severidad esperada:** Error para vacío, formato inválido, fecha inexistente o contradicción con V86/V88/V95. Advertencia sólo para revisión temporal.

---

### V95 — Características actuales del primer o único esquema de radioterapia

**Módulo:** Estado del primer o único esquema de radioterapia
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Características del esquema
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V86, V94, V96
**Valores permitidos:**

* `1`: Finalizado, dosis completa de radioterapia prescrita
* `2`: Finalizado, dosis incompleta pero finalizada por algún motivo
* `3`: No finalizado, esquema incompleto, pero aún bajo tratamiento
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Si V86=98, debe registrar `98`.
* Si V94=`1845-01-01`, debe ser `98`.
* Si V94=`1800-01-01`, debe ser coherente con esquema no finalizado, usualmente `3`.
* Si V94 tiene fecha real, debe ser coherente con `1` o `2`.
* Si V95=2, se habilita V96.
* Si V95 es diferente de `2`, V96 debe registrar `98`.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, cierre o continuidad del esquema
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con V86/V94/V96.

---

### V96 — Motivo de finalización del primer o único esquema de radioterapia

**Módulo:** Finalización prematura primer o único esquema de radioterapia
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Motivo de finalización
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V95
**Valores permitidos:**

* `1`: Toxicidad
* `2`: Otros motivos médicos
* `3`: Muerte
* `4`: Cambio de EPS
* `5`: Decisión del usuario, abandono la terapia
* `6`: Otros motivos administrativos
* `7`: Otras causas no contempladas
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Sólo aplica si V95=2.
* Si V95=2, debe registrar un motivo entre `1` y `7`.
* Si V95 es diferente de `2`, debe registrar `98`.
* Debe seleccionarse un solo motivo, el que primero ocurrió.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, nota de suspensión/finalización, soporte administrativo o clínico
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con V95. Advertencia sólo para revisión documental del motivo.

---

### V97 — Fecha de inicio del último esquema de radioterapia

**Módulo:** Último esquema de radioterapia
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `1845-01-01`: No aplica

**Dependencias:** V86, V88, V98-V105
**Reglas de validación:**

* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Si sólo se conoce año y mes, registrar día 15.
* Si V86=98 o no aplica último esquema, debe registrar `1845-01-01`.
* Si hubo último esquema real, debe registrar fecha real de inicio.
* La fecha puede corresponder a un esquema iniciado antes del periodo si fue suministrado durante el periodo actual.
* Debe diferenciarse del primer o único esquema cuando realmente exista un último esquema distinto.

**Reglas de excepción:**

* `1845-01-01` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, plan de radioterapia, registro de inicio del último esquema
**Severidad esperada:** Error para vacío, formato inválido, fecha inexistente o contradicción con V86. Advertencia sólo para revisión temporal o duplicidad de esquema.

---

### V98 — Ubicación temporal/intención del último esquema de radioterapia

**Módulo:** Último esquema de radioterapia
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Ubicación temporal/intención terapéutica
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V86, V97
**Valores permitidos:**

* `1`: Neoadyuvancia, manejo inicial prequirúrgico
* `2`: Tratamiento inicial curativo sin cirugía sugerida
* `3`: Adyuvancia, manejo inicial postquirúrgico
* `11`: Manejo de recaída
* `12`: Manejo de enfermedad metastásica
* `13`: Manejo paliativo, sin manejo de recaída ni enfermedad metastásica
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Si V86=98 o V97=`1845-01-01`, debe registrar `98`.
* Si V97 tiene fecha real de último esquema, debe registrar una ubicación válida entre `1`, `2`, `3`, `11`, `12` o `13`.
* Debe ser coherente con la intención clínica del último esquema.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.
* `11`, `12` y `13` son valores permitidos; sólo deben generar advertencia si la app conserva revisión de soporte clínico.

**Soporte documental:** Historia clínica, plan oncológico, indicación de radioterapia
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con V86/V97. Advertencia sólo para revisión clínica.

---

### V99 — Tipo de radioterapia aplicada en el último esquema

**Módulo:** Último esquema de radioterapia
**Tipo de dato:** Código CUPS / comodín
**Formato:** Código CUPS o `98`
**Longitud:** Según CUPS
**Catálogo de referencia:** Archivo operativo CUPS de radioterapia CAC
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V86, V97, V98
**Reglas de validación:**

* Debe estar diligenciada.
* Si V86=98 o V97=`1845-01-01`, debe registrar `98`.
* Si hubo último esquema real, debe registrar CUPS de radioterapia aplicado en el último esquema.
* El CUPS debe existir en el archivo operativo CAC y corresponder a radioterapia.
* Debe ser coherente con la radioterapia suministrada.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, CUPS operativo, registros de radioterapia
**Severidad esperada:** Error para vacío, CUPS inválido, CUPS no radioterapia o contradicción con V86/V97. Advertencia sólo para revisión de pertinencia CUPS.

---

### V100 — Número de IPS que suministran el último esquema de radioterapia

**Módulo:** Último esquema de radioterapia
**Tipo de dato:** Numérico
**Formato:** Entero o comodín
**Longitud:** Según valor
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V86, V97, V101, V102
**Reglas de validación:**

* Debe estar diligenciada.
* Si V86=98 o V97=`1845-01-01`, debe registrar `98`.
* Si hubo último esquema real, debe registrar el número de IPS que intervinieron en la administración de la dosis de radioterapia.
* Si V100=1, V101 aplica y V102 debe registrar `98`.
* Si V100=2, V101 y V102 aplican.
* Debe ser coherente con los códigos IPS reportados.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, registros de radioterapia, IPS tratantes
**Severidad esperada:** Error para vacío, valor inválido o contradicción con V86/V97/V101/V102.

---

### V101 — Código de la IPS1 que suministra el último esquema de radioterapia

**Módulo:** Último esquema de radioterapia
**Tipo de dato:** Código de habilitación IPS
**Formato:** 12 dígitos, incluido cero inicial
**Longitud:** 12 caracteres cuando aplica
**Catálogo de referencia:** REPS
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V86, V97, V100, V102
**Reglas de validación:**

* Debe estar diligenciada.
* Si V86=98, V97=`1845-01-01` o V100=98, debe registrar `98`.
* Si V100 indica al menos una IPS, debe registrar código de habilitación de la IPS1.
* El código debe conservar ceros iniciales.
* Debe ser coherente con V100.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, REPS, registros de radioterapia
**Severidad esperada:** Error para vacío, formato inválido o contradicción con V86/V97/V100. Advertencia sólo para revisión REPS/soporte.

---

### V102 — Código de la IPS2 que suministra el último esquema de radioterapia

**Módulo:** Último esquema de radioterapia
**Tipo de dato:** Código de habilitación IPS
**Formato:** 12 dígitos, incluido cero inicial
**Longitud:** 12 caracteres cuando aplica
**Catálogo de referencia:** REPS
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V86, V97, V100, V101
**Reglas de validación:**

* Debe estar diligenciada.
* Si V86=98, V97=`1845-01-01`, V100=98 o V100=1, debe registrar `98`.
* Si V100=2, debe registrar código de habilitación válido de la IPS2.
* El código debe conservar ceros iniciales.
* Debe ser coherente con V100 y V101.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica o no hay segunda IPS; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, REPS, registros de radioterapia
**Severidad esperada:** Error para vacío, formato inválido o contradicción con V86/V97/V100/V101. Advertencia sólo para revisión REPS/soporte.

---

### V103 — Fecha de finalización del último esquema de radioterapia

**Módulo:** Finalización último esquema de radioterapia
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `1800-01-01`: Esquema de radioterapia que aún no finaliza
* `1845-01-01`: No aplica

**Dependencias:** V86, V97, V104
**Reglas de validación:**

* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Si sólo se conoce año y mes, registrar día 15.
* Si V86=98 o V97=`1845-01-01`, debe registrar `1845-01-01`.
* Si el último esquema aún no finaliza, debe registrar `1800-01-01`.
* Si el último esquema finalizó, debe registrar fecha real.
* Si registra fecha real, no debe ser anterior a V97.
* Debe ser coherente con V104.

**Reglas de excepción:**

* `1800-01-01` y `1845-01-01` son valores permitidos según contexto; no deben generar advertencia por sí solos.

**Soporte documental:** Historia clínica, cierre o continuidad del último esquema de radioterapia
**Severidad esperada:** Error para vacío, formato inválido, fecha inexistente o contradicción con V86/V97/V104. Advertencia sólo para revisión temporal.

---

### V104 — Características actuales del último esquema de radioterapia

**Módulo:** Estado del último esquema de radioterapia
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Características del esquema
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V86, V97, V103, V105
**Valores permitidos:**

* `1`: Finalizado, dosis completa de radioterapia prescrita
* `2`: Finalizado, dosis incompleta pero finalizada por algún motivo
* `3`: No finalizado, esquema incompleto, pero aún bajo tratamiento
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Si V86=98 o V97=`1845-01-01`, debe registrar `98`.
* Si V103=`1845-01-01`, debe registrar `98`.
* Si V103=`1800-01-01`, debe ser coherente con esquema no finalizado, usualmente `3`.
* Si V103 tiene fecha real, debe ser coherente con `1` o `2`.
* Si V104=2, se habilita V105.
* Si V104 es diferente de `2`, V105 debe registrar `98`.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, cierre o continuidad del esquema
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con V86/V97/V103/V105.

---

### V105 — Motivo de finalización del último esquema de radioterapia

**Módulo:** Finalización prematura último esquema de radioterapia
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Motivo de finalización
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V104
**Valores permitidos:**

* `1`: Toxicidad
* `2`: Otros motivos médicos
* `3`: Muerte
* `4`: Cambio de EPS
* `5`: Decisión del usuario, abandono la terapia
* `6`: Otros motivos administrativos
* `7`: Otras causas no contempladas
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Sólo aplica si V104=2.
* Si V104=2, debe registrar un motivo entre `1` y `7`.
* Si V104 es diferente de `2`, debe registrar `98`.
* Debe seleccionarse un solo motivo, el que primero ocurrió.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, nota de suspensión/finalización, soporte administrativo o clínico
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con V104. Advertencia sólo para revisión documental del motivo.
# Matriz funcional por variable — V106 a V110

## Bloque V106-V110 — Trasplante de células progenitoras hematopoyéticas en el periodo de reporte actual

### V106 — ¿Recibió el usuario trasplante de células progenitoras hematopoyéticas dentro del periodo de reporte actual?

**Módulo:** Trasplante de células progenitoras hematopoyéticas
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Trasplante recibido
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V107, V108, V109, V110
**Valores permitidos:**

* `1`: Sí recibió
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Sólo permite `1` o `98`.
* Si V106=1, se habilitan V107-V110.
* Si V106=98, V107-V110 deben registrar No Aplica según regla propia de cada variable.
* No aplica trasplante propuesto pero no realizado.
* La opción `2` fue eliminada.
* No aplican trasplantes de órganos sólidos u otros no relacionados con progenitores hematopoyéticos.

**Reglas de excepción:**

* `98` es valor permitido y no debe generar advertencia por sí solo.
* La revisión debe hacerse contra las variables dependientes si contradicen V106.

**Soporte documental:** Historia clínica, registro de trasplante, soporte institucional
**Severidad esperada:** Error para vacío, valor fuera de catálogo o uso de opción eliminada. Advertencia sólo para revisión de trazabilidad del bloque dependiente.

---

### V107 — Tipo de trasplante recibido

**Módulo:** Trasplante de células progenitoras hematopoyéticas
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Tipo de trasplante
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V106
**Valores permitidos:**

* `1`: Autólogo
* `2`: Alogénico de donante idéntico relacionado
* `3`: Alogénico de donante no idéntico relacionado
* `4`: Alogénico de donante idéntico no relacionado
* `5`: Alogénico de donante no idéntico no relacionado
* `6`: Alogénico de cordón umbilical idéntico familiar
* `7`: Alogénico de cordón umbilical idéntico no familiar
* `8`: Alogénico de cordón no idéntico no familiar
* `9`: Alogénico de dos unidades de cordón
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Si V106=98, debe registrar `98`.
* Si V106=1, debe registrar tipo de trasplante entre `1` y `9`.
* Debe corresponder al tipo de trasplante documentado en la historia clínica.
* No debe registrar tipo de trasplante si V106=98.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, soporte de trasplante, resumen de procedimiento
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con V106. Advertencia sólo para revisión documental del tipo.

---

### V108 — Ubicación temporal de este trasplante en relación al manejo oncológico

**Módulo:** Trasplante de células progenitoras hematopoyéticas
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Ubicación temporal del trasplante
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V106, V107
**Valores permitidos:**

* `95`: Recaída
* `96`: Refractariedad
* `97`: Esquema de consolidación
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Si V106=98, debe registrar `98`.
* Si V106=1, debe registrar `95`, `96` o `97`.
* `95` aplica para recaída: paciente con criterios de remisión al que nuevamente se le demuestra enfermedad activa.
* `96` aplica para refractariedad: paciente sin criterios de remisión a pesar del manejo.
* `97` aplica para esquema de consolidación.
* Debe ser coherente con el contexto clínico documentado.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.
* `95`, `96` y `97` son valores permitidos; pueden requerir revisión de soporte clínico, pero no son falsos positivos por sí mismos.

**Soporte documental:** Historia clínica, concepto de hemato-oncología, resumen clínico del trasplante
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con V106. Advertencia sólo para revisión clínica/documental.

---

### V109 — Fecha del trasplante

**Módulo:** Trasplante de células progenitoras hematopoyéticas
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `1845-01-01`: No aplica

**Dependencias:** V106, V107, V108
**Reglas de validación:**

* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Si V106=98, debe registrar `1845-01-01`.
* Si V106=1, debe registrar la fecha real de realización del trasplante.
* La fecha debe corresponder al periodo de reporte actual.
* Debe ser una fecha real.

**Reglas de excepción:**

* `1845-01-01` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, registro de procedimiento, resumen de trasplante
**Severidad esperada:** Error para vacío, formato inválido, fecha inexistente o contradicción con V106. Advertencia sólo para revisión temporal si amerita.

---

### V110 — Código de la IPS que realizó este trasplante

**Módulo:** Trasplante de células progenitoras hematopoyéticas
**Tipo de dato:** Código de habilitación IPS
**Formato:** 12 dígitos, incluido cero inicial
**Longitud:** 12 caracteres cuando aplica
**Catálogo de referencia:** REPS
**Comodines permitidos:**

* `96`: Trasplante fuera del país
* `98`: No aplica

**Dependencias:** V106, V109
**Reglas de validación:**

* Debe estar diligenciada.
* Si V106=98, debe registrar `98`.
* Si V106=1, debe registrar código de habilitación IPS de 12 dígitos o `96` si el trasplante fue realizado fuera del país.
* El código debe conservar ceros iniciales.
* Debe ser coherente con la fecha y el trasplante reportado.
* No debe registrar IPS si no hubo trasplante.

**Reglas de excepción:**

* `96` y `98` son valores permitidos según contexto; no deben generar advertencia por sí solos.

**Soporte documental:** Historia clínica, REPS, soporte de trasplante fuera del país si aplica
**Severidad esperada:** Error para vacío, formato inválido o contradicción con V106/V109. Advertencia sólo para revisión REPS/soporte.
# Matriz funcional por variable — V111 a V124

## Bloque V111-V124 — Tratamiento complementario en el periodo de reporte actual

### V111 — ¿Recibió cirugía reconstructiva en el periodo de reporte actual?

**Módulo:** Tratamiento complementario / cirugía reconstructiva
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Cirugía reconstructiva recibida
**Comodines permitidos:**

* `98`: No aplica, no recibió cirugía reconstructiva

**Dependencias:** V112, V113
**Valores permitidos:**

* `1`: Sí recibió cirugía reconstructiva
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Sólo permite `1` o `98`.
* Si V111=1, se habilitan V112 y V113.
* Si V111=98, V112 debe registrar `1845-01-01` y V113 debe registrar `98`.
* No aplica cirugía reconstructiva propuesta pero no realizada.
* La opción `2` fue eliminada.
* Si se realiza cirugía curativa y reconstructiva en el mismo tiempo quirúrgico, no se deben reportar las variables de cirugía reconstructiva; sólo debe quedar registro en las variables quirúrgicas correspondientes, V76 o V80 según el caso.

**Reglas de excepción:**

* `98` es valor permitido y no debe generar advertencia por sí solo.
* La revisión debe hacerse contra V112 y V113 si contradicen V111.

**Soporte documental:** Nota quirúrgica, historia clínica, soporte del procedimiento reconstructivo
**Severidad esperada:** Error para vacío, valor fuera de catálogo o uso de opción eliminada. Advertencia sólo para revisión de soporte si se reporta cirugía reconstructiva.

---

### V112 — Fecha de la cirugía reconstructiva

**Módulo:** Tratamiento complementario / cirugía reconstructiva
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `1845-01-01`: No aplica

**Dependencias:** V111, V113
**Reglas de validación:**

* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Si sólo se conoce año y mes, registrar día 15.
* Si V111=98, debe registrar `1845-01-01`.
* Si V111=1, debe registrar fecha real de realización de la cirugía reconstructiva.
* La fecha debe corresponder al periodo de reporte actual.
* Debe ser coherente con el soporte quirúrgico.

**Reglas de excepción:**

* `1845-01-01` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Nota quirúrgica, historia clínica, registro de procedimiento
**Severidad esperada:** Error para vacío, formato inválido, fecha inexistente o contradicción con V111. Advertencia sólo para revisión temporal/soporte.

---

### V113 — Código de la IPS que realizó cirugía reconstructiva

**Módulo:** Tratamiento complementario / cirugía reconstructiva
**Tipo de dato:** Código de habilitación IPS
**Formato:** 12 dígitos, incluido cero inicial, o comodín
**Longitud:** 12 caracteres cuando aplica
**Catálogo de referencia:** REPS
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V111, V112
**Reglas de validación:**

* Debe estar diligenciada.
* Si V111=98, debe registrar `98`.
* Si V111=1, debe registrar código de habilitación IPS de 12 dígitos.
* Debe conservar ceros iniciales.
* Debe ser coherente con la fecha y el procedimiento reportado en V112.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Nota quirúrgica, historia clínica, REPS
**Severidad esperada:** Error para vacío, formato inválido o contradicción con V111/V112. Advertencia sólo para revisión REPS/soporte.

---

### V114 — ¿Fue valorado en consulta o procedimiento de cuidado paliativo en el periodo?

**Módulo:** Tratamiento complementario / cuidado paliativo
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Valoración en cuidado paliativo
**Comodines permitidos:** No aplica

**Dependencias:** V114.1-V114.6, V115, V116
**Valores permitidos:**

* `1`: Sí fue valorado
* `2`: No recibió

**Reglas de validación:**

* Debe estar diligenciada.
* Sólo permite `1` o `2`.
* Si V114=1, debe existir coherencia con al menos una de las variables V114.1-V114.6 marcada como `1`.
* Si V114=2, las variables V114.1-V114.6 deben registrar `2`, V115 debe registrar `1845-01-01` y V116 debe registrar `98`.
* La atención paliativa aplica para todo tipo de cáncer y en cualquier estadio; no es exclusiva de estadios avanzados.
* No aplican consultas o procedimientos propuestos pero no realizados.

**Reglas de excepción:**

* V114=2 es valor permitido y no debe generar advertencia por sí solo.
* La revisión debe hacerse contra las variables dependientes si contradicen V114.

**Soporte documental:** Historia clínica, interconsulta, procedimiento o valoración de cuidado paliativo
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con variables dependientes. Advertencia sólo para revisión de trazabilidad del bloque.

---

### V114.1 — Consulta o procedimiento de cuidado paliativo por médico especialista en cuidado paliativo

**Módulo:** Tratamiento complementario / cuidado paliativo
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Profesional de cuidado paliativo
**Comodines permitidos:** No aplica

**Dependencias:** V114, V115, V116
**Valores permitidos:**

* `1`: Sí fue valorado
* `2`: No recibió

**Reglas de validación:**

* Debe estar diligenciada.
* Sólo permite `1` o `2`.
* Si recibió consulta o procedimiento por médico especialista en cuidado paliativo, debe registrar `1`.
* Si no recibió esta valoración específica, debe registrar `2`.
* La opción `3` fue eliminada.
* Debe ser coherente con V114.

**Reglas de excepción:**

* `2` es valor permitido y no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, interconsulta, registro de atención por especialista
**Severidad esperada:** Error para vacío, valor fuera de catálogo o uso de opción eliminada. Advertencia sólo para revisión de coherencia con V114.

---

### V114.2 — Consulta o procedimiento de cuidado paliativo por profesional de salud no médico especialista en cuidado paliativo

**Módulo:** Tratamiento complementario / cuidado paliativo
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Profesional de cuidado paliativo
**Comodines permitidos:** No aplica

**Dependencias:** V114, V115, V116
**Valores permitidos:**

* `1`: Sí fue valorado
* `2`: No recibió

**Reglas de validación:**

* Debe estar diligenciada.
* Sólo permite `1` o `2`.
* Incluye profesional de salud no médico especialista en cuidado paliativo, incluyendo psicólogo.
* Si recibió esta valoración específica, debe registrar `1`.
* Si no recibió esta valoración específica, debe registrar `2`.
* La opción `3` fue eliminada.
* Debe ser coherente con V114.

**Reglas de excepción:**

* `2` es valor permitido y no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, interconsulta, registro de atención por profesional especializado
**Severidad esperada:** Error para vacío, valor fuera de catálogo o uso de opción eliminada. Advertencia sólo para revisión de coherencia con V114.

---

### V114.3 — Consulta o procedimiento de cuidado paliativo por médico especialista de otra especialidad

**Módulo:** Tratamiento complementario / cuidado paliativo
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Profesional de cuidado paliativo
**Comodines permitidos:** No aplica

**Dependencias:** V114, V115, V116
**Valores permitidos:**

* `1`: Sí fue valorado
* `2`: No recibió

**Reglas de validación:**

* Debe estar diligenciada.
* Sólo permite `1` o `2`.
* Aplica cuando la consulta o procedimiento de cuidado paliativo fue realizado por médico especialista de otra especialidad.
* Si recibió esta valoración específica, debe registrar `1`.
* Si no recibió esta valoración específica, debe registrar `2`.
* La opción `3` fue eliminada.
* Debe ser coherente con V114.

**Reglas de excepción:**

* `2` es valor permitido y no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, interconsulta, registro de atención especializada
**Severidad esperada:** Error para vacío, valor fuera de catálogo o uso de opción eliminada. Advertencia sólo para revisión de coherencia con V114.

---

### V114.4 — Consulta o procedimiento de cuidado paliativo por médico general

**Módulo:** Tratamiento complementario / cuidado paliativo
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Profesional de cuidado paliativo
**Comodines permitidos:** No aplica

**Dependencias:** V114, V115, V116
**Valores permitidos:**

* `1`: Sí fue valorado
* `2`: No recibió

**Reglas de validación:**

* Debe estar diligenciada.
* Sólo permite `1` o `2`.
* Aplica cuando la consulta o procedimiento de cuidado paliativo fue realizado por médico general.
* Si recibió esta valoración específica, debe registrar `1`.
* Si no recibió esta valoración específica, debe registrar `2`.
* La opción `3` fue eliminada.
* Debe ser coherente con V114.

**Reglas de excepción:**

* `2` es valor permitido y no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, interconsulta, registro de atención médica general
**Severidad esperada:** Error para vacío, valor fuera de catálogo o uso de opción eliminada. Advertencia sólo para revisión de coherencia con V114.

---

### V114.5 — Consulta o procedimiento de cuidado paliativo por trabajo social

**Módulo:** Tratamiento complementario / cuidado paliativo
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Profesional de cuidado paliativo
**Comodines permitidos:** No aplica

**Dependencias:** V114, V115, V116
**Valores permitidos:**

* `1`: Sí fue valorado
* `2`: No recibió

**Reglas de validación:**

* Debe estar diligenciada.
* Sólo permite `1` o `2`.
* Aplica cuando recibió consulta o procedimiento de cuidado paliativo por trabajo social.
* Si recibió esta valoración específica, debe registrar `1`.
* Si no recibió esta valoración específica, debe registrar `2`.
* La opción `3` fue eliminada.
* Debe ser coherente con V114.

**Reglas de excepción:**

* `2` es valor permitido y no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, registro de atención por trabajo social
**Severidad esperada:** Error para vacío, valor fuera de catálogo o uso de opción eliminada. Advertencia sólo para revisión de coherencia con V114.

---

### V114.6 — Consulta o procedimiento de cuidado paliativo por otro profesional de salud no especializado

**Módulo:** Tratamiento complementario / cuidado paliativo
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Profesional de cuidado paliativo
**Comodines permitidos:** No aplica

**Dependencias:** V114, V115, V116
**Valores permitidos:**

* `1`: Sí fue valorado
* `2`: No recibió

**Reglas de validación:**

* Debe estar diligenciada.
* Sólo permite `1` o `2`.
* Incluye otro profesional de salud no médico, incluyendo psicólogo no especializado.
* Si recibió esta valoración específica, debe registrar `1`.
* Si no recibió esta valoración específica, debe registrar `2`.
* La opción `3` fue eliminada.
* Debe ser coherente con V114.

**Reglas de excepción:**

* `2` es valor permitido y no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, registro de atención por profesional no especializado
**Severidad esperada:** Error para vacío, valor fuera de catálogo o uso de opción eliminada. Advertencia sólo para revisión de coherencia con V114.

---

### V115 — Fecha de primera consulta o procedimiento de cuidado paliativo en el periodo

**Módulo:** Tratamiento complementario / cuidado paliativo
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `1845-01-01`: No aplica

**Dependencias:** V114, V114.1-V114.6, V116
**Reglas de validación:**

* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Si sólo se conoce año y mes, registrar día 15.
* Si V114=2 y no hubo atención paliativa, debe registrar `1845-01-01`.
* Si alguna variable V114.1-V114.6 está en `1`, debe registrar fecha real de primera interconsulta o procedimiento de cuidado paliativo.
* La fecha debe corresponder al periodo de reporte actual.
* Debe ser coherente con el soporte clínico.

**Reglas de excepción:**

* `1845-01-01` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, interconsulta, procedimiento o registro de atención paliativa
**Severidad esperada:** Error para vacío, formato inválido, fecha inexistente o contradicción con V114/V114.1-V114.6. Advertencia sólo para revisión temporal/soporte.

---

### V116 — Código de la IPS donde recibe atención de cuidado paliativo

**Módulo:** Tratamiento complementario / cuidado paliativo
**Tipo de dato:** Código de habilitación IPS
**Formato:** 12 dígitos, incluido cero inicial, o comodín
**Longitud:** 12 caracteres cuando aplica
**Catálogo de referencia:** REPS
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V114, V114.1-V114.6, V115
**Reglas de validación:**

* Debe estar diligenciada.
* Si V114=2 y no hubo atención paliativa, debe registrar `98`.
* Si hubo atención paliativa, debe registrar código de habilitación IPS de 12 dígitos.
* El código debe conservar ceros iniciales.
* Debe ser coherente con la fecha registrada en V115.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, REPS, registro de atención paliativa
**Severidad esperada:** Error para vacío, formato inválido o contradicción con V114/V115. Advertencia sólo para revisión REPS/soporte.

---

### V117 — ¿Ha sido valorado por el servicio de psiquiatría en el periodo?

**Módulo:** Tratamiento complementario / psiquiatría
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Valoración por psiquiatría
**Comodines permitidos:**

* `98`: No aplica, no se ha ordenado valoración por psiquiatría

**Dependencias:** V118, V119
**Valores permitidos:**

* `1`: Sí fue valorado
* `2`: No, se ordenó, pero está pendiente
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Sólo permite `1`, `2` o `98`.
* Si V117=1, V118 debe registrar fecha real y V119 debe registrar IPS válida.
* Si V117=2 o V117=98, V118 debe registrar `1845-01-01` y V119 debe registrar `98`.
* V117=2 indica orden pendiente, no valoración realizada.
* V117=98 indica que no se ha ordenado valoración por psiquiatría.

**Reglas de excepción:**

* `2` y `98` son valores permitidos y no deben generar advertencia por sí solos.
* La revisión debe hacerse contra V118 y V119 si contradicen V117.

**Soporte documental:** Historia clínica, orden/interconsulta de psiquiatría, registro de valoración
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con V118/V119. Advertencia sólo para revisión de trazabilidad.

---

### V118 — Fecha de primera consulta con psiquiatría en el periodo

**Módulo:** Tratamiento complementario / psiquiatría
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `1845-01-01`: No aplica

**Dependencias:** V117, V119
**Reglas de validación:**

* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Si sólo se conoce año y mes, registrar día 15.
* Si V117=1, debe registrar fecha real de primera consulta con psiquiatría en el periodo.
* Si V117=2 o V117=98, debe registrar `1845-01-01`.
* La fecha debe corresponder al periodo de reporte actual.

**Reglas de excepción:**

* `1845-01-01` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, interconsulta o valoración de psiquiatría
**Severidad esperada:** Error para vacío, formato inválido, fecha inexistente o contradicción con V117. Advertencia sólo para revisión temporal/soporte.

---

### V119 — Código de la IPS donde recibió la primera valoración de psiquiatría

**Módulo:** Tratamiento complementario / psiquiatría
**Tipo de dato:** Código de habilitación IPS
**Formato:** 12 dígitos, incluido cero inicial, o comodín
**Longitud:** 12 caracteres cuando aplica
**Catálogo de referencia:** REPS
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V117, V118
**Reglas de validación:**

* Debe estar diligenciada.
* Si V117=1, debe registrar código de habilitación IPS de 12 dígitos.
* Si V117=2 o V117=98, debe registrar `98`.
* Debe conservar ceros iniciales.
* Debe ser coherente con la fecha registrada en V118.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, REPS, registro de valoración psiquiátrica
**Severidad esperada:** Error para vacío, formato inválido o contradicción con V117/V118. Advertencia sólo para revisión REPS/soporte.

---

### V120 — ¿Fue valorado por profesional en nutrición en el periodo?

**Módulo:** Tratamiento complementario / nutrición
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Valoración por nutrición
**Comodines permitidos:**

* `98`: No aplica, no se ha ordenado valoración por nutrición

**Dependencias:** V121, V122
**Valores permitidos:**

* `1`: Sí fue valorado
* `2`: No, se ordenó, pero está pendiente
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Sólo permite `1`, `2` o `98`.
* Si V120=1, V121 debe registrar fecha real y V122 debe registrar IPS válida.
* Si V120=2 o V120=98, V121 debe registrar `1845-01-01` y V122 debe registrar `98`.
* V120=2 indica orden pendiente, no valoración realizada.
* V120=98 indica que no se ha ordenado valoración por nutrición.

**Reglas de excepción:**

* `2` y `98` son valores permitidos y no deben generar advertencia por sí solos.

**Soporte documental:** Historia clínica, orden/interconsulta de nutrición, registro de valoración
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con V121/V122. Advertencia sólo para revisión de trazabilidad.

---

### V121 — Fecha de consulta inicial con nutrición en el periodo

**Módulo:** Tratamiento complementario / nutrición
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `1845-01-01`: No aplica

**Dependencias:** V120, V122
**Reglas de validación:**

* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Si sólo se conoce año y mes, registrar día 15.
* Si V120=1, debe registrar fecha real de inicio de la atención por nutrición en el periodo.
* Si V120=2 o V120=98, debe registrar `1845-01-01`.
* La fecha debe corresponder al periodo de reporte actual.

**Reglas de excepción:**

* `1845-01-01` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, interconsulta o valoración de nutrición
**Severidad esperada:** Error para vacío, formato inválido, fecha inexistente o contradicción con V120. Advertencia sólo para revisión temporal/soporte.

---

### V122 — Código de la IPS donde recibió valoración por nutrición

**Módulo:** Tratamiento complementario / nutrición
**Tipo de dato:** Código de habilitación IPS
**Formato:** 12 dígitos, incluido cero inicial, o comodín
**Longitud:** 12 caracteres cuando aplica
**Catálogo de referencia:** REPS
**Comodines permitidos:**

* `98`: No aplica

**Dependencias:** V120, V121
**Reglas de validación:**

* Debe estar diligenciada.
* Si V120=1, debe registrar código de habilitación IPS de 12 dígitos.
* Si V120=2 o V120=98, debe registrar `98`.
* Debe conservar ceros iniciales.
* Debe ser coherente con la fecha registrada en V121.

**Reglas de excepción:**

* `98` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, REPS, registro de valoración por nutrición
**Severidad esperada:** Error para vacío, formato inválido o contradicción con V120/V121. Advertencia sólo para revisión REPS/soporte.

---

### V123 — ¿El usuario recibió soporte nutricional?

**Módulo:** Tratamiento complementario / soporte nutricional
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Soporte nutricional
**Comodines permitidos:** No aplica

**Dependencias:** Ninguna directa, pero puede relacionarse con V120-V122
**Valores permitidos:**

* `1`: Recibió soporte nutricional enteral
* `2`: Recibió soporte nutricional parenteral
* `3`: Recibió soporte nutricional enteral y parenteral
* `4`: No recibió soporte nutricional

**Reglas de validación:**

* Debe estar diligenciada.
* Sólo permite `1`, `2`, `3` o `4`.
* Soporte enteral corresponde a nutrición administrada mediante sonda directamente al sistema gastrointestinal.
* Soporte parenteral corresponde a nutrición administrada por vía venosa.
* No es válido el reporte de fórmulas nutricionales de administración oral como soporte nutricional.
* Si registra `1`, `2` o `3`, debe existir soporte clínico de la vía utilizada.
* Si no recibió soporte nutricional, debe registrar `4`.

**Reglas de excepción:**

* `4` es valor permitido y no debe generar advertencia por sí solo.

**Soporte documental:** Historia clínica, orden de soporte nutricional, registros de administración enteral/parenteral
**Severidad esperada:** Error para vacío o valor fuera de catálogo. Advertencia para revisión de soporte o uso inadecuado de fórmulas orales.

---

### V124 — ¿Recibió terapias complementarias para rehabilitación?

**Módulo:** Tratamiento complementario / terapias complementarias
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Terapias complementarias de rehabilitación
**Comodines permitidos:**

* `98`: No aplica, no se han ordenado terapias

**Dependencias:** Ninguna directa
**Valores permitidos:**

* `1`: Terapia física
* `2`: Terapia de lenguaje
* `3`: Terapia ocupacional
* `5`: Terapia física y terapia de lenguaje
* `6`: Terapia física y terapia ocupacional
* `7`: Terapia de lenguaje y terapia ocupacional
* `8`: Terapia física, terapia de lenguaje y terapia ocupacional
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Debe pertenecer al catálogo permitido.
* Si recibió una o varias terapias complementarias, debe registrar la combinación correspondiente.
* Si no se han ordenado terapias, debe registrar `98`.
* No aplican terapias propuestas pero no realizadas.
* La opción `4` fue eliminada.

**Reglas de excepción:**

* `98` es valor permitido cuando no se han ordenado terapias; no debe generar advertencia por sí solo.
* Las combinaciones `5`, `6`, `7` y `8` son valores válidos y no deben marcarse como inconsistentes por estar combinadas.

**Soporte documental:** Historia clínica, órdenes de rehabilitación, registros de terapia física/lenguaje/ocupacional
**Severidad esperada:** Error para vacío, valor fuera de catálogo o uso de opción eliminada. Advertencia sólo para revisión de soporte si se reporta terapia.
# Matriz funcional por variable — V125 a V134

## Bloque V125-V134 — Situación actual, resultado final, estado vital, novedades y fecha de corte

### V125 — Tipo de tratamiento que está recibiendo el usuario a la fecha de corte

**Módulo:** Situación actual del usuario a la fecha de corte
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Tipo de tratamiento a la fecha de corte
**Comodines permitidos:**

* `98`: No aplica, paciente fallecido, abandonó tratamiento, alta voluntaria o se encuentra desafiliado

**Dependencias:** V45-V124, V126, V127, V128, V129
**Valores permitidos:**

* `1`: Radioterapia
* `2`: Terapia sistémica, incluye quimioterapia, anticuerpos monoclonales, terapia biológica y terapia hormonal
* `3`: Cirugía, sólo cuando el procedimiento se realizó a partir del 1 de noviembre de 2024
* `4`: Radioterapia y terapia sistémica
* `5`: Radioterapia y cirugía
* `6`: Terapia sistémica y cirugía
* `7`: Manejo expectante pretratamiento
* `8`: En seguimiento luego de tratamiento durante el periodo
* `9`: Antecedente de cáncer, sin tratamiento, pero con mínimo una consulta de seguimiento relacionada con cáncer dentro del periodo
* `10`: Radioterapia, terapia sistémica y cirugía
* `11`: Manejo de cuidado paliativo o terapia complementaria
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Debe registrar el tipo de tratamiento que el usuario está recibiendo el día `2025-01-01`.
* Debe pertenecer al catálogo permitido.
* Debe ser coherente con tratamientos reportados en terapia sistémica, cirugía, radioterapia, trasplante y tratamiento complementario.
* La opción `3` sólo debe usarse para cirugía realizada a partir del 1 de noviembre de 2024.
* La opción `9` exige como mínimo una consulta de seguimiento relacionada con cáncer dentro del periodo.
* Si el paciente falleció, abandonó tratamiento, firmó alta voluntaria o se encuentra desafiliado, debe registrar `98` cuando corresponda.
* No aplican terapias propuestas pero no realizadas.
* La opción `4` eliminada del instructivo de terapias complementarias no debe confundirse con V125=4, que sí es válida como combinación de radioterapia y terapia sistémica.

**Reglas de excepción:**

* `98` es valor permitido por instructivo y no debe generar advertencia por sí solo.
* Las combinaciones `4`, `5`, `6` y `10` son válidas y no deben marcarse como inconsistentes por ser combinadas.

**Soporte documental:** Historia clínica, registros de tratamiento, seguimiento oncológico, soporte de estado administrativo
**Severidad esperada:** Error para vacío o valor fuera de catálogo. Advertencia sólo para revisión de coherencia con tratamientos reportados o soporte clínico/administrativo.

---

### V126 — Resultado final del manejo oncológico en este periodo de reporte

**Módulo:** Resultado final del manejo oncológico
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Resultado final del manejo oncológico
**Comodines permitidos:**

* `97`: No aplicable en este periodo, aún bajo tratamiento inicial
* `98`: No aplicable en este periodo, aún bajo tratamiento de recaída
* `99`: No aplica, paciente fallecido o desafiliado

**Dependencias:** V125, V127, V128, V129, V130, V131
**Valores permitidos:**

* `1`: Pseudoprogresión, aplica sólo para inmunoterapia
* `2`: Progresión o recaída
* `3`: Respuesta parcial
* `4`: Respuesta completa
* `5`: Enfermedad estable
* `6`: Abandono del tratamiento o alta voluntaria
* `7`: Paciente en seguimiento por antecedente de cáncer
* `8`: Pendiente iniciar tratamiento luego del diagnóstico
* `97`: Aún bajo tratamiento inicial
* `98`: Aún bajo tratamiento de recaída
* `99`: Fallecido o desafiliado

**Reglas de validación:**

* Debe estar diligenciada.
* Debe pertenecer al catálogo permitido.
* `1` sólo aplica para inmunoterapia.
* `2` aplica para progresión o recaída.
* `3` corresponde a respuesta parcial.
* `4` corresponde a respuesta completa.
* `5` corresponde a enfermedad estable.
* `6` corresponde a abandono del tratamiento o alta voluntaria.
* `7` requiere que el paciente esté en seguimiento por antecedente de cáncer y tenga al menos una atención relacionada con cáncer dentro del periodo.
* `8` aplica si está pendiente iniciar tratamiento luego del diagnóstico o pendiente valoración oncológica inicial.
* `97` aplica cuando aún está bajo tratamiento inicial.
* `98` aplica cuando aún está bajo tratamiento de recaída.
* `99` aplica cuando se encuentra fallecido o desafiliado.
* Debe ser coherente con V125, V127, V128, V129, V130 y V131.

**Reglas de excepción:**

* `97`, `98` y `99` son valores permitidos y no deben generar advertencia por sí solos.
* `1` puede requerir revisión porque pseudoprogresión aplica sólo para inmunoterapia.

**Soporte documental:** Historia clínica, evaluación de respuesta, imágenes, seguimiento oncológico, soporte administrativo
**Severidad esperada:** Error para vacío o valor fuera de catálogo. Advertencia para revisión de coherencia clínica o administrativa.

---

### V127 — Estado vital al finalizar este periodo de reporte

**Módulo:** Estado vital
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Estado vital al cierre del periodo
**Comodines permitidos:**

* `99`: Desconocido

**Dependencias:** V128, V129, V130, V131, V132
**Valores permitidos:**

* `1`: Vivo
* `2`: Fallecido
* `99`: Desconocido

**Reglas de validación:**

* Debe estar diligenciada.
* Debe pertenecer al catálogo permitido.
* Si V127=1, V131 debe registrar `1845-01-01` y V132 debe registrar `98`.
* Si V127=2, V131 debe registrar fecha real de muerte y V132 debe registrar causa de muerte válida entre `1`, `2`, `3` o `4`.
* Si V127=99, V131 debe registrar `1845-01-01` y V132 debe registrar `98`.
* Debe ser coherente con la novedad administrativa V128 y la novedad clínica V129.
* Si el usuario está fallecido, la novedad de fallecimiento prima sobre las demás cuando el diagnóstico de cáncer está confirmado.

**Reglas de excepción:**

* `99` es valor permitido y no debe generar advertencia por sí solo; puede requerir revisión de gestión si el contexto lo exige.
* En casos donde BDUA reporta fallecido pero la entidad verifica vivo, deben existir soportes de atención y afiliación.

**Soporte documental:** Historia clínica, BDUA, certificado de defunción si aplica, soportes de afiliación
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con fechas/causa de muerte. Advertencia para estado desconocido o discrepancia documental.

---

### V128 — Novedad administrativa del usuario respecto al reporte anterior

**Módulo:** Novedad administrativa
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Novedad administrativa CAC
**Comodines permitidos:** No aplica

**Dependencias:** V127, V129, V130, V131, V132, V133
**Valores permitidos:**

* `0`: No presenta novedad respecto al reporte anterior
* `1`: Ingresó a la EAPB en el periodo y ya tenía diagnóstico de cáncer
* `2`: Nuevo diagnóstico de cáncer entre el 2 de enero de 2024 y el 1 de enero de 2025
* `3`: Diagnóstico antiguo no incluido en reporte anterior
* `4`: Usuario que falleció
* `5`: Usuario que se desafilió
* `6`: Usuario para eliminar de la base por corrección luego de auditoría interna o CAC
* `7`: Usuario que firmó alta voluntaria del tratamiento
* `8`: Usuario con cambio de tipo o número de identificación
* `9`: Usuario abandonó tratamiento y es imposible de ubicar
* `10`: Usuario no incluido en reporte anterior y está fallecido al reporte actual
* `11`: Trasladado de IPS
* `12`: Usuario notificado con dos o más cánceres en este periodo
* `13`: Usuario no incluido en reporte anterior y está desafiliado al reporte actual
* `15`: Comunidad migrante de la República de Venezuela
* `16`: Usuario con cambio de CIE-10
* `17`: Usuario identificado por cruce con fuentes externas, con diagnóstico de cáncer no gestionado por la EAPB
* `18`: Usuario identificado por cruce con fuentes externas, con diagnóstico descartado por la EAPB o fallecido/desafiliado no gestionado sin diagnóstico confirmado
* `19`: Paciente trasladado que fue glosado en periodo anterior y no fue gestionado por la entidad en el periodo actual

**Reglas de validación:**

* Debe estar diligenciada.
* Debe pertenecer al catálogo permitido.
* Si V127=2, debe ser coherente con novedad de fallecimiento cuando corresponda.
* Si el usuario se desafilió, debe ser coherente con V130.
* Si falleció, debe ser coherente con V131 y V132.
* La novedad `6` prima sobre las demás, incluso desafiliación y fallecimiento, según contexto de eliminación.
* En pacientes con cáncer confirmado, si su estado vital es fallecido, la novedad de fallecimiento prima sobre las demás, excepto reglas especiales de eliminación.
* Las novedades `17` y `18` aplican exclusivamente a requeridos por fuentes externas.
* La novedad `19` aplica exclusivamente para casos trasladados con inconsistencia en periodo anterior no gestionados por la entidad receptora.
* Para cambios de tipo/número de identificación, se deben reportar dos registros según regla del instructivo.
* Para cambio de CIE-10, se debe reportar línea con novedad `16` y línea actualizada con la novedad correspondiente.
* Para dos o más cánceres, se debe usar novedad `12` en las líneas que correspondan cuando aplica.

**Reglas de excepción:**

* No hay comodín de No Aplica.
* Algunos códigos son válidos sólo en contextos específicos; no deben eliminarse por ser poco frecuentes, pero sí deben revisarse contra soporte y trazabilidad.

**Soporte documental:** BDUA, historia clínica, soportes administrativos, auditoría interna, fuentes externas, certificado de defunción, soporte de desafiliación
**Severidad esperada:** Error para vacío o valor fuera de catálogo. Advertencia para revisión de contexto administrativo, duplicidad, fuente externa o trazabilidad con estado vital/fechas.

---

### V129 — Novedad clínica del usuario a la fecha de corte

**Módulo:** Novedad clínica
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Novedad clínica a fecha de corte
**Comodines permitidos:** No aplica

**Dependencias:** V125, V126, V127, V128, V130, V131
**Valores permitidos:**

* `1`: Usuario que está en manejo inicial curativo
* `3`: Usuario que finalizó tratamiento inicial y está en seguimiento
* `8`: Abandono de tratamiento
* `9`: Usuario firmó alta voluntaria
* `10`: Usuario en manejo expectante antes de tratamiento
* `11`: Usuario que está en manejo paliativo, incluye manejo de metástasis o de recaída
* `12`: Usuario fallecido o desafiliado

**Reglas de validación:**

* Debe estar diligenciada.
* Debe pertenecer al catálogo permitido.
* Debe ser coherente con V125 y V126.
* Si el usuario falleció o está desafiliado, debe registrar `12` cuando corresponda.
* La opción `11` agrupa pacientes con cualquier tipo de cáncer que reciben terapia con intención paliativa a la fecha de corte.
* Si hay abandono o alta voluntaria, debe ser coherente con V126 y V128.
* Si está en seguimiento luego de tratamiento inicial, debe ser coherente con V126=7 o estado clínico documentado.
* Si está en manejo expectante antes de tratamiento, debe ser coherente con V125=7 y V126=8 cuando aplique.

**Reglas de excepción:**

* No hay comodín de No Aplica.
* Los valores `8`, `9`, `11` y `12` son válidos y no deben generar advertencia por sí solos; sólo por incoherencia con otras variables.

**Soporte documental:** Historia clínica, plan oncológico, seguimiento, soporte administrativo
**Severidad esperada:** Error para vacío o valor fuera de catálogo. Advertencia para incoherencia clínica/administrativa.

---

### V130 — Fecha de desafiliación de la EAPB

**Módulo:** Fechas administrativas
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `1845-01-01`: No aplica, el usuario no se desafilió

**Dependencias:** V127, V128, V129, V131
**Reglas de validación:**

* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Si el usuario se desafilió, debe registrar fecha real de desafiliación.
* Si el usuario no se desafilió, debe registrar `1845-01-01`.
* Si V128 indica desafiliación, V130 debe registrar fecha real.
* Si el paciente está fallecido y desafiliado, prima la novedad de fallecimiento; en ese caso se reporta la fecha de muerte en V131 y V130 debe registrar `1845-01-01`.

**Reglas de excepción:**

* `1845-01-01` es valor permitido cuando no aplica; no debe generar advertencia por sí solo.
* Si falleció y también se desafilió, se prioriza muerte y V130 queda en `1845-01-01`.

**Soporte documental:** BDUA, soporte de afiliación/desafiliación, historia administrativa
**Severidad esperada:** Error para vacío, formato inválido, fecha inexistente o contradicción con V128/V131. Advertencia para revisión administrativa.

---

### V131 — Fecha de muerte

**Módulo:** Fechas administrativas / estado vital
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** No aplica
**Comodines permitidos:**

* `1845-01-01`: No aplica, usuario no falleció o estado vital no se conoce

**Dependencias:** V127, V128, V129, V130, V132
**Reglas de validación:**

* Debe estar diligenciada.
* Debe tener formato `AAAA-MM-DD`.
* Si V127=2, debe registrar fecha real de muerte.
* Si V127=1 o V127=99, debe registrar `1845-01-01`.
* Si el paciente está fallecido y desafiliado, sólo debe reportarse la fecha de muerte en V131 y V130 debe registrar `1845-01-01`.
* Si BDUA reporta fallecido, pero la entidad verifica que está vivo, debe existir soporte de atenciones en salud y afiliación.

**Reglas de excepción:**

* `1845-01-01` es valor permitido cuando no falleció o el estado vital no se conoce; no debe generar advertencia por sí solo.
* En discrepancias BDUA-vivo, se requiere soporte.

**Soporte documental:** Certificado de defunción, historia clínica, BDUA, soporte de afiliación y atención
**Severidad esperada:** Error para vacío, formato inválido, fecha inexistente o contradicción con V127/V128/V132. Advertencia para discrepancia documental.

---

### V132 — Causa de muerte

**Módulo:** Estado vital / causa de muerte
**Tipo de dato:** Catálogo cerrado
**Formato:** Numérico
**Longitud:** Según código
**Catálogo de referencia:** Causa de muerte
**Comodines permitidos:**

* `98`: No aplica, usuario vivo o se desconoce estado vital

**Dependencias:** V127, V131
**Valores permitidos:**

* `1`: Muerte asociada al cáncer
* `2`: Muerte por patología clínica no relacionada al cáncer
* `3`: Muerte por causa externa
* `4`: Muerte por causa no conocida
* `98`: No aplica

**Reglas de validación:**

* Debe estar diligenciada.
* Si V127=2 y V131 tiene fecha real de muerte, debe registrar causa entre `1`, `2`, `3` o `4`.
* Si V127=1 o V127=99, debe registrar `98`.
* Debe ser coherente con la fecha de muerte y soporte clínico/administrativo.
* `4` es causa no conocida y puede requerir revisión de soporte, pero es valor permitido.

**Reglas de excepción:**

* `98` es valor permitido cuando el usuario está vivo o se desconoce estado vital; no debe generar advertencia por sí solo.
* `4` es valor permitido; no debe convertirse en error por desconocimiento de causa.

**Soporte documental:** Certificado de defunción, historia clínica, soporte de fallecimiento
**Severidad esperada:** Error para vacío, valor fuera de catálogo o contradicción con V127/V131. Advertencia para revisión de causa no conocida o soporte insuficiente.

---

### V133 — Código único de identificación BDUA-BDEX-PVS

**Módulo:** Identificación administrativa final
**Tipo de dato:** Código único serial
**Formato:** Código único asignado por el Ministerio de Salud y Protección Social
**Longitud:** Según estructura oficial BDUA-BDEX-PVS
**Catálogo de referencia:** BDUA-BDEX-PVS
**Comodines permitidos:** Según estructura/cargue oficial si aplica

**Dependencias:** V5, V6, V127, V128
**Reglas de validación:**

* Debe estar diligenciada según la estructura oficial del archivo.
* Debe registrar el código único serial de identificación BDUA-BDEX-PVS asignado al paciente por el Ministerio de Salud y Protección Social.
* Debe conservar ceros iniciales o caracteres significativos si existen.
* Debe ser coherente con identificación del usuario y registros administrativos.
* No debe alterarse por formato numérico de Excel.

**Reglas de excepción:**

* Si el instructivo operativo o estructura oficial permite un comodín específico, debe respetarse; no inventar reglas adicionales.
* En ausencia de comodín explícito en el instructivo, se debe validar como dato requerido de estructura.

**Soporte documental:** BDUA, BDEX, PVS, información administrativa oficial
**Severidad esperada:** Error para vacío o formato claramente inválido según estructura implementada. Advertencia sólo para revisión administrativa si el dato parece atípico.

---

### V134 — Fecha de corte

**Módulo:** Fecha de corte
**Tipo de dato:** Fecha fija
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Catálogo de referencia:** Fecha oficial de corte de la medición
**Comodines permitidos:** No aplica

**Dependencias:** Todo el reporte
**Valor permitido:**

* `2025-01-01`

**Reglas de validación:**

* Debe estar diligenciada.
* Debe registrar exactamente `2025-01-01`.
* No permite otra fecha.
* No permite comodines.
* Debe tener formato `AAAA-MM-DD`.
* Debe conservarse como texto o fecha normalizada sin alteración de Excel.

**Reglas de excepción:**

* Ninguna. La fecha de corte es fija para la medición 2025.

**Soporte documental:** Instructivo CAC 2025 / fecha oficial de corte
**Severidad esperada:** Error para vacío, formato inválido o fecha diferente de `2025-01-01`.
