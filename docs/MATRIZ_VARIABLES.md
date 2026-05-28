# Matriz de Variables CAC

**Documento técnico fundamental del sistema.**

Este es el corazón del validador. Cada validación, cada regla, cada campo del formulario se deriva de esta matriz. Si cambia el instructivo CAC, este es el primer documento que se actualiza.

**Fuente:** Instructivo CAC-IEP1-I01, Resolución 0247/2014, medición enero 2025.

**Total de variables:** 134 (que se expanden a 168 campos en el archivo plano)

**Estado del documento:** En construcción
**Variables documentadas:** V1-V14, V17-V19
**Próxima variable a documentar:** V15

---

## Formato de cada variable

```
### V[número] — [Nombre]

**Módulo:** [Módulo al que pertenece]
**Tipo de dato:** [Texto / Fecha / Numérico / Código / Catálogo]
**Formato:** [Formato esperado]
**Longitud:** [Si aplica]
**Catálogo de referencia:** [Si aplica]
**Comodines permitidos:** [Si aplica]
**Dependencias:** [Variables relacionadas]
**Reglas de validación:** [Específicas]
**Reglas de excepción:** [Casos especiales]
**Soporte documental:** [Sí/No]
**Severidad:** [Error / Advertencia / Información]
```

---

# MÓDULO 1 — IDENTIFICACIÓN DEL USUARIO (V1–V16)

---

### V1 — Primer nombre del usuario

**Módulo:** Identificación
**Tipo de dato:** Texto
**Formato:** Letras mayúsculas únicamente
**Fuente:** BDUA (Base de Datos Única de Afiliados)

**Caracteres prohibidos:**
- Símbolos
- Puntos
- Tildes (á, é, í, ó, ú)
- Carácter numeral (`#`)
- Cualquier otro carácter especial
- Letra `ñ`
- Diéresis
- Apóstrofes

**Reglas de validación:**
1. Debe coincidir con el registrado en BDUA
2. Todo en mayúsculas sostenidas
3. NO debe contener el primer apellido (error frecuente en auditorías)
4. NO debe estar vacío

**Soporte documental:** Sí — certificado de afiliación BDUA

**Severidad:**
- **Error** si: campo vacío, contiene caracteres prohibidos, está en minúsculas
- **Advertencia** si: contiene espacios dobles o al final

---

### V2 — Segundo nombre del usuario

**Módulo:** Identificación
**Tipo de dato:** Texto
**Formato:** Letras mayúsculas únicamente
**Fuente:** BDUA

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `NONE` | Cuando el usuario NO tiene segundo nombre (significa "Ningún Otro Nombre Escrito") |

**Caracteres prohibidos:**
- Símbolos, puntos, tildes
- Guión (`-`)
- Carácter numeral (`#`)
- Cualquier otro carácter especial

**Reglas de validación:**
1. En caso de tercer nombre, escribirlo separado por un espacio del segundo
2. `NONE` debe ir en mayúscula sostenida
3. NO debe contener el primer nombre (error frecuente)

**Soporte documental:** Sí — certificado de afiliación BDUA

**Severidad:**
- **Error** si: vacío sin `NONE`, contiene caracteres prohibidos
- **Advertencia** si: contiene posiblemente un apellido

---

### V3 — Primer apellido del usuario

**Módulo:** Identificación
**Tipo de dato:** Texto
**Formato:** Letras mayúsculas únicamente
**Fuente:** BDUA

**Caracteres prohibidos:**
- Símbolos, puntos, tildes
- Guión (`-`)
- Carácter numeral
- Cualquier otro carácter especial

**Reglas de validación:**
1. Debe coincidir con el registrado en BDUA
2. NO debe estar registrado en lugar del primer nombre (error frecuente)
3. NO debe estar vacío

**Soporte documental:** Sí — certificado de afiliación BDUA

**Severidad:**
- **Error** si: vacío, contiene caracteres prohibidos, está en minúsculas

---

### V4 — Segundo apellido del usuario

**Módulo:** Identificación
**Tipo de dato:** Texto
**Formato:** Letras mayúsculas únicamente
**Fuente:** BDUA

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `NOAP` | Cuando el usuario NO tiene segundo apellido (significa "Ningún Otro Apellido") |

**Reglas de validación:**
1. `NOAP` debe ir en mayúscula sostenida
2. Debe coincidir con el registrado en BDUA

**Soporte documental:** Sí — certificado de afiliación BDUA

**Severidad:**
- **Error** si: vacío sin `NOAP`, contiene caracteres prohibidos

---

### V5 — Tipo de Identificación del usuario

**Módulo:** Identificación
**Tipo de dato:** Catálogo cerrado
**Formato:** Código de 2 letras mayúsculas

**Catálogo de referencia:**

| Código | Descripción | Restricciones |
|---|---|---|
| `CC` | Cédula de ciudadanía | — |
| `CE` | Cédula de extranjería | — |
| `CD` | Carné diplomático | — |
| `PA` | Pasaporte | — |
| `SC` | Salvoconducto de permanencia | — |
| `PT` | Permiso temporal de permanencia | — |
| `PE` | Permiso Especial de Permanencia | — |
| `RC` | Registro civil | — |
| `TI` | Tarjeta de identidad | — |
| `CN` | Certificado de nacido vivo | — |
| `AS` | Adulto sin identificar | **Solo Régimen Subsidiado** |
| `MS` | Menor sin identificar | **Solo Régimen Subsidiado** |
| `DE` | Documento extranjero | — |
| `SI` | Sin identificación | — |

**Dependencias:**
- `AS` y `MS` solo válidos si V10 = `S` (Régimen Subsidiado)
- Relacionada con V6 (formato del número depende del tipo)

**Severidad:**
- **Error** si: código no está en el catálogo, AS/MS usado fuera de régimen subsidiado
- **Advertencia** si: combinaciones inusuales (ej: CN en adulto)

---

### V6 — Número de Identificación del usuario

**Módulo:** Identificación
**Tipo de dato:** Alfanumérico
**Formato:** Depende del tipo de identificación (V5)

**Dependencias:**
- Depende de V5 para validación de formato

**Reglas de validación:**
1. Para `MS` y `AS`: registrar el **consecutivo interno** del afiliado según Resolución 4622/2016
2. Para `CC`, `TI`, `RC`: solo dígitos numéricos
3. Para `PA`, `CE`, `CD`, `DE`: alfanumérico
4. Para `SI`: documentar la justificación

**Soporte documental:** Sí — documento de identidad escaneado o certificado BDUA

**Severidad:**
- **Error** si: vacío, formato inconsistente con V5
- **Advertencia** si: longitud atípica para el tipo

---

### V7 — Fecha de nacimiento

**Módulo:** Identificación
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD` (con guion "-" como separador)
**Longitud:** 10 caracteres
**Fuente:** BDUA

**Dependencias:**
- V7 debe ser **anterior** a V11 (fecha de afiliación)
- V7 debe ser **anterior** a la fecha de corte del reporte (`2025-05-05`)

**Reglas de validación:**
1. Orden exacto: AÑO-MES-DÍA (`AAAA-MM-DD`)
2. Separador: guion (`-`)
3. La fecha de nacimiento **NO puede ser posterior** a la fecha de afiliación
4. Debe ser **anterior** a la fecha de corte del reporte (2025-05-05)

**Soporte documental:** Sí — certificado BDUA, registro civil

**Severidad:**
- **Error** si: formato incorrecto, V7 > V11, V7 > fecha de corte, fecha imposible
- **Advertencia** si: edad calculada > 120 años

---

### V8 — Sexo

**Módulo:** Identificación
**Tipo de dato:** Catálogo cerrado
**Formato:** Letra única en mayúscula

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `M` | Masculino |
| `F` | Femenino |

**Dependencias:**
- Relacionada con V17 (algunos cánceres dependen del sexo):
  - Cáncer de mama (mayoría en F)
  - Cáncer de cérvix (solo F)
  - Cáncer de próstata (solo M)
- Relacionada con V31 (HER2: principalmente en F)
- Relacionada con V37 (Gleason: solo en M)

**Severidad:**
- **Error** si: no es `M` ni `F`, vacío
- **Advertencia** si: hay incoherencia con CIE-10 (ej: cáncer de próstata en F)

---

### V9 — Ocupación

**Módulo:** Identificación
**Tipo de dato:** Código numérico
**Formato:** 4 dígitos
**Catálogo de referencia:** Clasificación Internacional Uniforme de Ocupaciones (CIUO)

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `9999` | No existe información |
| `9998` | No Aplica |

**Reglas de validación:**
1. Debe estar en el catálogo CIUO oficial O usar comodines permitidos
2. Para menores de edad típicamente aplica `9998`

**Severidad:**
- **Error** si: código no está en CIUO ni es comodín válido
- **Advertencia** si: uso excesivo de `9999` (sugiere mala calidad del dato)

---

### V10 — Régimen de afiliación al SGSSS

**Módulo:** Identificación
**Tipo de dato:** Catálogo cerrado
**Formato:** Letra única en mayúscula

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `C` | Régimen Contributivo |
| `S` | Régimen Subsidiado |
| `P` | Regímenes de excepción |
| `E` | Régimen especial |
| `N` | No asegurado |
| `I` | Fondo Atención en Salud para PPL (Personas Privadas de la Libertad) |

**Dependencias:**
- Si V5 = `AS` o `MS` → V10 debe ser `S` (Subsidiado)
- Relacionada con V11 (código EAPB depende del régimen)

**Severidad:**
- **Error** si: código no está en el catálogo, vacío, incoherencia con V5

---

### V11 — Código de la EAPB o de la entidad territorial

**Módulo:** Identificación
**Tipo de dato:** Código alfanumérico
**Formato:** Depende del tipo de entidad

**Reglas de validación:**

1. **Si es EAPB (Empresa Administradora de Planes de Beneficios):**
   - Registrar código de la empresa que registra al usuario
   - Validar contra catálogo de EAPB oficial

2. **Si es entidad territorial:**
   - Formato: `[código departamento DANE 2 dígitos] + 000`
   - Ejemplo: `01000` donde `01` = código departamento DANE
   - Los últimos 3 dígitos siempre son `000`

**Dependencias:**
- Relacionada con V10 (régimen): EAPB depende del régimen
- Relacionada con V14 (municipio): coherencia geográfica

**Soporte documental:** Sí — certificado de afiliación

**Severidad:**
- **Error** si: código no existe en catálogo EAPB ni cumple formato territorial
- **Advertencia** si: la EAPB no corresponde al departamento de residencia

---

### V12 — Código de pertenencia étnica

**Módulo:** Identificación
**Tipo de dato:** Catálogo cerrado
**Formato:** Dígito único

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Indígena |
| `2` | ROM (gitano) |
| `3` | Raizal del archipiélago de San Andrés y Providencia |
| `4` | Palenquero de San Basilio |
| `5` | Negro(a), mulato(a), afrocolombiano(a) o afrodescendiente |
| `6` | Ninguna de las anteriores |

**Severidad:**
- **Error** si: código no está en el catálogo, vacío

---

### V13 — Grupo poblacional

**Módulo:** Identificación
**Tipo de dato:** Catálogo cerrado
**Formato:** Número de 1 a 2 dígitos

**ATENCIÓN:** Este catálogo tiene **agrupaciones temáticas** con rangos numéricos. La validación debe respetar esa lógica.

**Catálogo de referencia (agrupado):**

#### Grupo general (códigos 1-16)
| Código | Descripción |
|---|---|
| `1` | Indigentes |
| `2` | Población infantil a cargo del ICBF |
| `3` | Madres comunitarias |
| `4` | Artistas, autores, compositores |
| `5` | Otro grupo poblacional |
| `6` | Recién Nacidos |
| `7` | Persona en situación de discapacidad (general) |
| `8` | Desmovilizados |
| `9` | Desplazados |
| `10` | Población ROM |
| `11` | Población raizal |
| `12` | Población en centros psiquiátricos |
| `13` | Migratorio |
| `14` | Población en centros carcelarios |
| `15` | Población rural no migratoria |
| `16` | Afrocolombiano |

#### Grupo etario, laboral y de vulnerabilidad (códigos 31-39)
| Código | Descripción |
|---|---|
| `31` | Adulto mayor |
| `32` | Cabeza de familia |
| `33` | Mujer embarazada |
| `34` | Mujer lactante |
| `35` | Trabajador urbano |
| `36` | Trabajador rural |
| `37` | Víctima de violencia armada |
| `38` | Jóvenes vulnerables rurales |
| `39` | Jóvenes vulnerables urbanos |

#### Discapacidades específicas (códigos 50-60)
| Código | Descripción |
|---|---|
| `50` | Discapacidad del sistema nervioso |
| `51` | Discapacidad de los ojos |
| `52` | Discapacidad de los oídos |
| `53` | Discapacidad de los demás órganos de los sentidos (olfato, tacto, gusto) |
| `54` | Discapacidad de la voz y el habla |
| `55` | Discapacidad del sistema cardiorrespiratorio y las defensas |
| `56` | Discapacidad de la digestión, el metabolismo, las hormonas |
| `57` | Discapacidad del sistema genital y reproductivo |
| `58` | Discapacidad del movimiento del cuerpo, manos, brazos, piernas |
| `59` | Discapacidad de la piel |
| `60` | Discapacidad de otro tipo |

#### Otros (códigos 61-63)
| Código | Descripción |
|---|---|
| `61` | No definido |
| `62` | Comunidad indígena |
| `63` | Población migrante de la República Bolivariana de Venezuela |

**Dependencias y coherencias:**
- Si V13 = `7` (discapacidad general) → puede coexistir con códigos 50-60 (discapacidades específicas)
- Si V13 = `62` (comunidad indígena) → V12 debería ser `1` (indígena)
- Si V13 = `10` (población ROM) → V12 debería ser `2` (ROM)
- Si V13 = `11` (población raizal) → V12 debería ser `3` (raizal)
- Si V13 = `16` (afrocolombiano) → V12 debería ser `5`
- Si V13 = `33` o `34` (embarazada/lactante) → V8 debe ser `F`
- Si V13 = `31` (adulto mayor) → calcular edad desde V7 (típicamente ≥60 años)
- Si V13 = `6` (recién nacido) → calcular edad desde V7 (≤28 días al momento del reporte)

**Severidad:**
- **Error** si: código no está en ninguno de los rangos del catálogo
- **Advertencia** si: incoherencia con V12, V8 o V7

---

### V14 — Municipio de residencia

**Módulo:** Identificación
**Tipo de dato:** Código numérico
**Formato:** 5 dígitos exactos
**Catálogo de referencia:** DIVIPOLA – DANE (División Político Administrativa)

**Estructura del código:**

```
DDMMM
│└┴┴── Código del municipio (3 dígitos)
└──── Código del departamento (2 dígitos)
```

Ejemplo: `11001` = Bogotá D.C. (Departamento 11, Municipio 001)
Ejemplo: `05001` = Medellín (Departamento 05, Municipio 001)
Ejemplo: `76001` = Cali (Departamento 76, Municipio 001)

**Dependencias:**
- Los primeros 2 dígitos deben corresponder a un código de departamento DANE válido
- Los últimos 3 dígitos deben corresponder a un municipio existente dentro de ese departamento
- Relacionada con V11: si V11 es entidad territorial, los 2 primeros dígitos deben coincidir

**Reglas de validación:**
1. **Debe ser exactamente 5 dígitos** (no menos, no más)
2. NO reportar el municipio donde recibe atenciones en salud
3. Debe reportar el municipio donde **reside** el afiliado
4. Validar que la combinación departamento+municipio exista en DIVIPOLA vigente

**Soporte documental:** Sí — certificado de residencia o documento de identidad con dirección

**Severidad:**
- **Error** si: longitud distinta a 5 dígitos, código de departamento inválido, combinación inexistente
- **Advertencia** si: el municipio no coincide con la sede de atención (frecuente error de captura)

---

### V15 — Número telefónico del paciente

**Módulo:** Identificación
**Tipo de dato:** Numérico / Alfanumérico
**Formato:** Hasta dos números separados por guion medio (`-`)
**Longitud:** Variable

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `0` | No se tiene número telefónico del paciente, familiares ni cuidadores |

**Reglas de validación:**
1. Registrar máximo **dos** números de teléfono (fijos y/o móviles)
2. Los números deben estar completos
3. Separar los dos números con guion medio (`-`)
4. Si no hay ningún número disponible → registrar `0`

**Soporte documental:** No requerido explícitamente

**Severidad:**
- **Error** si: más de dos números, campo vacío sin comodín `0`
- **Advertencia** si: número incompleto o con formato inusual

---

---

### V16 — Fecha de afiliación a la EAPB que reporta

**Módulo:** Identificación
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD` (separador guion `-`)
**Longitud:** 10 caracteres
**Fuente:** BDUA (para EPS contributivo y subsidiado) / Certificado de afiliación (régimen especial, excepción, entes territoriales)

**Dependencias:**
- V16 > V7 (fecha de nacimiento)
- V16 < fecha de corte del reporte (`2025-05-05`)
- Para EPS contributivo o subsidiado: V16 > `1995-01-01`

**Reglas de validación:**
1. Para **EPS** (contributivo y subsidiado): verificar con BDUA; debe ser posterior a `1995-01-01`
2. Para **régimen especial, excepción y entes territoriales**: soportar con certificado de afiliación
3. Para **ente territorial** que reporta persona pobre no asegurada: fecha en la que la entidad identificó dicha condición, o fecha en que se le prestaron servicios no incluidos en el plan de beneficios
4. Si la entidad cambió de razón social: registrar la fecha de creación de la **nueva** razón social

**Soporte documental:** Sí — certificado de afiliación BDUA o documento equivalente

**Severidad:**
- **Error** si: formato incorrecto, fecha anterior a `1995-01-01` en EPS, fecha posterior a la fecha de corte
- **Advertencia** si: fecha muy antigua o inconsistente con el régimen reportado en V10

---

# MÓDULO 2 — DIAGNÓSTICO DEL CÁNCER (V17–V44)

---

### V17 — Código CIE-10 de la neoplasia maligna reportada (primario)

**Módulo:** Diagnóstico del cáncer
**Tipo de dato:** Código alfanumérico
**Formato:** Letra + 2-4 dígitos
**Catálogo de referencia:** Archivo operativo CIE-10 disponible en SISCAC

**Comodines permitidos:** Ninguno

**Dependencias:**
- Relacionada con V29 (estadificación): si V17 inicia con "D" → V29 debe ser 0 (in situ)
- Relacionada con V31 (HER2): solo aplica si V17 corresponde a cáncer de mama
- Relacionada con V37 (Gleason): solo aplica si V17 corresponde a cáncer de próstata
- Relacionada con V24 (fecha histopatología): si fue diagnóstico clínico confirmado, registrar CIE-10 de la confirmación
- Relacionada con V8 (sexo): coherencia con tipo de cáncer

**Reglas de validación:**

1. Solo registrar **tumor primario** o tumores secundarios con primario desconocido
2. Las metástasis NO se reportan como segundo primario (van en V29 — estadificación)
3. NO usar `C80X` (Tumor maligno de sitios no especificados) — eliminado del archivo operativo
4. Si hay varios CIE-10 del mismo tumor primario en el mismo agrupador y mismo tipo histológico → NO aplica segundo registro
5. Si hay 2 primarios diferentes en el mismo órgano → reportar independientemente (una fila por cada uno)

**Reglas de excepción por tipo de cáncer:**

#### Cáncer de cérvix
- Confirmar con histopatología obtenida por colposcopia o conización
- NO válida la citología cérvico-uterina como confirmación
- Lesiones de alto grado: requiere descripción explícita del componente in situ
- Diagnósticos antiguos NIC III: el patólogo debe describir compromiso por carcinoma in situ

#### Enfermedad de Paget
- Reportar como **cáncer de mama** si compromete tejido mamario profundo (lóbulos, lobulillos, conductos)
- Reportar como **cáncer de piel** (no priorizado) si solo compromete piel del pezón y areola

#### Tumores Phyllodes (filodes)
- Solo se reportan los de **alto grado o malignos**
- Criterio: mención explícita del patólogo O descripción de 10 o más mitosis por campo de alto poder

#### Tumores del estroma gastrointestinal (GIST)
- Reportar en agrupador "tejidos blandos y tejidos conjuntivos"

#### Adenomas en intestino (vellosos con displasia)
- NO se notifican hasta tener reporte de patología in situ o infiltrante

#### Unión gastroesofágica
- Adenocarcinoma → agrupador de estómago
- Escamocelular → reportar como esófago
- Tercio medio o superior del esófago: SIEMPRE esófago

#### Tumores neuroendocrinos (TNE)
- Grado I, II y III son objeto de reporte
- CIE-10: `C759` independiente del órgano

#### Astrocitomas
- TODOS los astrocitomas (pediátricos y adultos) independiente del grado OMS
- Agrupador: "ojo, encéfalo y otras partes del sistema nervioso"

#### Histiocitosis
- Reportables: grupo M y grupo L
- NO reportables: histiocitosis netamente cutáneas
- CIE-10: `C960`, `C961`, `D760`, `C965`, `C966`

#### Blastomas
- CIE-10 según órgano de origen

#### Mastocitosis
- Reportable: mastocitosis sistémica
- NO reportable: mastocitosis netamente cutánea

#### Sarcomas
- Tejidos blandos → "tejidos blandos y conjuntivos"
- Hueso, cartílago o articulación → "huesos y cartílagos articulares"
- Ewing óseo → "huesos y cartílagos articulares"
- Ewing extraóseo → "tejidos blandos y conjuntivos"

#### Dermatofibrosarcoma
- Excepción: SÍ se reporta como tumor de piel

#### Tumores in situ
- CIE-10 debe iniciar con "D"
- Estadio en V29 debe coincidir (0 o in situ)

#### Cáncer de tiroides
- Diagnóstico patológico (biopsia postquirúrgica)
- Bethesda III-V NO es confirmatoria
- Bethesda VI sí es válido si especialista decide no operar e interpreta malignidad

#### Linfomas
- Requiere confirmación por inmunofenotipo mediante IHQ
- LLC pertenece a linfomas no Hodgkin maduros (clasificación OMS 2016)

#### Macroglobulinemia de Waldestrom
- CIE-10: `C880`
- NO reportar como linfoma

#### Enfermedad de Castelman
- CIE-10: `C778`
- NO reportar como linfoma

**Soporte documental:** Sí — reporte histopatológico, IHQ, imágenes/laboratorios

**Severidad:**
- **Error** si: código no existe, es `C80X`, no coincide con agrupador correcto
- **Advertencia** si: requiere validación clínica especial

---

### V18 — Fecha de diagnóstico del cáncer reportado

**Módulo:** Diagnóstico del cáncer
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `1800-01-01` | Desconocido: dato no descrito en soportes clínicos |

**Regla de fecha parcial:**
- Si solo conoce año y mes → día 15

**Dependencias:**
- V18 = V24 si fue diagnóstico histopatológico
- V18 = V26 si dx clínico + tratamiento mismo día

**Reglas de validación:**

1. **Diagnóstico histopatológico:** V18 = V24
2. **Diagnóstico clínico:** fecha de primera consulta donde especialista concluye dx con imágenes/laboratorios
3. **Cánceres confirmados solo por patología** (tiroides, piel): V18 = V24 obligatoriamente

**Soporte documental:** Sí — reporte histopatológico, notas del especialista

**Severidad:**
- **Error** si: formato incorrecto, fecha posterior a V24 en casos histopatológicos, fecha futura
- **Advertencia** si: uso de `1800-01-01` cuando podría conseguirse

---

### V19 — Fecha de la nota de remisión o interconsulta

**Módulo:** Diagnóstico del cáncer
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres

**Descripción:** Fecha de la remisión más antigua disponible previa al diagnóstico.

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `1800-01-01` | Desconocido |

**Regla de fecha parcial:**
- Si solo conoce año y mes → día 15

**Dependencias:**
- V19 ≤ V20 (fecha ingreso a institución diagnóstica)
- V19 ≤ V18 (fecha de diagnóstico)

**Reglas de validación:**

1. Remisión debe ser previa al diagnóstico
2. **V19 ≤ V20**
3. Si no hay fecha exacta de remisión: registrar fecha de orden del estudio (biopsia, imagen, laboratorio)

**Soporte documental:** Sí — nota de remisión o orden del estudio

**Severidad:**
- **Error** si: formato incorrecto, V19 > V20, V19 > V18, fecha futura
- **Advertencia** si: uso de `1800-01-01` cuando podría obtenerse

---

### V20 — Fecha de ingreso a la institución que realizó el diagnóstico

**Módulo:** Diagnóstico del cáncer
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `1800-01-01` | Desconocido: dato no descrito en soportes clínicos |

**Regla de fecha parcial:**
- Si solo conoce año y mes → día 15

**Dependencias:**
- V20 ≥ V19 (fecha de remisión o interconsulta)
- V20 ≤ V18 (fecha de diagnóstico)

**Reglas de validación:**
1. Debe corresponder a la fecha de ingreso a la institución diagnóstica **luego de** la remisión o interconsulta
2. **V19 ≤ V20** (no puede ingresar antes de ser remitido)
3. **V20 ≤ V18** (no puede ingresar después del diagnóstico)

**Soporte documental:** Sí — registro de admisión o historia clínica

**Severidad:**
- **Error** si: formato incorrecto, V20 < V19, V20 > V18, fecha futura
- **Advertencia** si: uso de `1800-01-01` cuando podría obtenerse

---

### V21 — Tipo de estudio con el que se realizó el diagnóstico de cáncer

**Módulo:** Diagnóstico del cáncer
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia (pacientes nuevos — primera vez en CAC):**

| Código | Descripción |
|---|---|
| `5` | Inmunohistoquímica |
| `6` | Citometría de flujo |
| `7` | Clínica exclusivamente (estudios imagenológicos y/o de laboratorio clínicamente justificados donde fue imposible tomar muestra histopatológica) |
| `8` | Otro |
| `9` | Genética |
| `10` | Patología básica |
| `99` | Desconocido: dato no descrito en soportes clínicos |

**Nota histórica:** Los códigos `1`, `2`, `3` y `4` solo son válidos para pacientes reportados antes de 2020 (dato histórico). Están incluidos en la opción `10` para reportes nuevos y **no son válidos** para pacientes reportados por primera vez.

**Reglas de validación:**
1. Registrar el **primer estudio** que permitió confirmar el cáncer
2. Para pacientes nuevos: solo son válidos los códigos `5` al `10` y `99`
3. La opción `99` en pacientes incidentes (nuevos) **se considera dato no gestionado**
4. Si V21 = `7` → diligenciar V22 (motivo por el cual no hubo histopatología)

**Dependencias:**
- Relacionada con V22 (motivo sin histopatología): obligatoria si V21 = `7`
- Relacionada con V23 (fecha de recolección de muestra): si V21 = `7` → V23 = `1845-01-01`
- Relacionada con V24 (fecha del informe histopatológico): si V21 = `7` → V24 = `1845-01-01`

**Soporte documental:** Sí — reporte del estudio diagnóstico

**Severidad:**
- **Error** si: código no está en el catálogo, uso de códigos `1`-`4` en pacientes nuevos
- **Advertencia** si: `99` en paciente incidente (dato no gestionado)

---

### V22 — Motivo por el cual el usuario no tuvo diagnóstico por histopatología

**Módulo:** Diagnóstico del cáncer
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico
**Aplica:** Solo cuando V21 = `7` (diagnóstico clínico exclusivamente)

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Clínica, usuario con coagulopatía |
| `2` | Clínica, debido a localización del tumor |
| `3` | Clínica, debido al estado funcional del usuario (deterioro) |
| `4` | Negativa del usuario o acudiente, con documentación de soporte |
| `5` | Administrativa |
| `6` | Clínica por reporte de imágenes o laboratorios |
| `98` | Tiene confirmación por histopatología (no aplica) |
| `99` | Desconocido: dato no descrito en soportes clínicos |

**Dependencias:**
- Solo se diligencia si V21 = `7`
- Si V21 ≠ `7` → registrar `98`

**Soporte documental:** Sí — nota clínica que justifique la imposibilidad de toma de muestra

**Severidad:**
- **Error** si: campo vacío cuando V21 = `7`, código no está en el catálogo
- **Advertencia** si: `99` cuando podría determinarse el motivo

---

### V23 — Fecha de recolección de muestra para estudio histopatológico de diagnóstico

**Módulo:** Diagnóstico del cáncer
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `1800-01-01` | Desconocido: dato no descrito en soportes clínicos |
| `1845-01-01` | No se realizó estudio histopatológico (V21 = `7`) |

**Regla de fecha parcial:**
- Si solo conoce año y mes → día 15

**Dependencias:**
- Si V21 = `7` → V23 = `1845-01-01`
- V23 ≤ V24 (fecha del informe histopatológico)
- V23 ≤ V18 (fecha de diagnóstico)

**Reglas de validación:**
1. Si la muestra fue tomada en cirugía → registrar la **fecha de la cirugía**
2. Soportes válidos: nota quirúrgica / nota de procedimiento / reporte de patología que incluya fecha de recolección
3. **NO es válida** la fecha de ingreso de la muestra al laboratorio para procesamiento
4. Si V21 = `7`: registrar `1845-01-01`

**Soporte documental:** Sí — nota quirúrgica, nota de procedimiento o reporte de patología con fecha de recolección

**Severidad:**
- **Error** si: formato incorrecto, V23 > V24, V23 > V18, fecha futura, uso de fecha de ingreso al laboratorio en lugar de recolección
- **Advertencia** si: uso de `1800-01-01` cuando podría obtenerse

---
### V24 — Fecha de primer o único informe histopatológico válido de diagnóstico

**Módulo:** Diagnóstico del cáncer
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `1800-01-01` | Desconocido: dato no descrito en soportes clínicos |
| `1845-01-01` | No se realizó estudio histopatológico (V21 = `7`) |

**Regla de fecha parcial:**
- Si solo conoce año y mes → día 15

**Dependencias:**
- V24 ≥ V23 (fecha de recolección de muestra)
- Si V18 = diagnóstico histopatológico → V18 = V24
- Si V21 = `7` → V24 = `1845-01-01`

**Reglas de validación:**
1. Registrar la fecha de la **primera prueba que confirmó diagnóstico de cáncer** y dio inicio a un manejo, aunque haya requerido pruebas adicionales posteriormente para el diagnóstico definitivo
2. Si V21 = `7` → registrar `1845-01-01`
3. V24 no puede ser anterior a V23

**Soporte documental:** Sí — reporte del resultado del análisis de patología (obligatorio en cargue de soportes)

**Severidad:**
- **Error** si: formato incorrecto, V24 < V23, fecha futura, campo vacío
- **Advertencia** si: uso de `1800-01-01` cuando podría obtenerse

---

### V25 — Código válido de habilitación de la IPS donde se realizó la confirmación diagnóstica

**Módulo:** Diagnóstico del cáncer
**Tipo de dato:** Código alfanumérico
**Formato:** 12 dígitos incluyendo cero inicial
**Catálogo de referencia:** REPS (Registro Especial de Prestadores de Servicios de Salud)

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `96` | Diagnóstico realizado fuera del país |
| `99` | Desconocido: dato no descrito en soportes clínicos |

**Reglas de validación:**
1. Para diagnóstico **histopatológico**: registrar código de la IPS que procesó la muestra de patología — debe estar habilitada en REPS para dicho servicio
2. Para diagnóstico **clínico**: registrar código de la IPS donde se hizo el diagnóstico clínico — debe estar habilitada para el servicio especializado correspondiente
3. El código se extrae del **reporte de patología original**, el cual debe contener la sede responsable
4. **NO es válido** usar el código de la IPS de seguimiento o de tratamiento
5. Para diagnósticos histopatológicos del periodo: la IPS debe estar habilitada en REPS; de lo contrario el auditor califica como DOND

**Soporte documental:** Sí — reporte de patología original con sede responsable

**Severidad:**
- **Error** si: código no existe en REPS, IPS sin habilitación para procesamiento de patología, uso del código de IPS de tratamiento o seguimiento
- **Advertencia** si: uso de `99` cuando podría obtenerse del reporte

---

### V26 — Fecha de primera consulta con médico tratante de la enfermedad maligna

**Módulo:** Diagnóstico del cáncer
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres

**Descripción:** Fecha de la primera consulta con el médico especialista que define la primera conducta terapéutica (terapia sistémica, cirugía, radioterapia, cuidados paliativos o manejo expectante).

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `1800-01-01` | Desconocido: dato no descrito en soportes clínicos |

**Regla de fecha parcial:**
- Si solo conoce año y mes → día 15

**Dependencias:**
- V26 ≥ V18 (fecha de diagnóstico)
- Relacionada con V128 (novedades): si el usuario tiene diagnóstico histopatológico desde el 1 de noviembre de 2024 y no alcanzó a tener esta consulta → V26 = `1800-01-01` y V128 = novedad 2, 10 o 13 según corresponda

**Reglas de validación:**
1. El especialista referido es quien **define la primera conducta terapéutica**, no quien diagnostica
2. Para usuarios con diagnóstico histopatológico desde 2024-11-01 sin consulta de primera conducta: registrar `1800-01-01` y diligenciar V128

**Soporte documental:** Sí — nota de la consulta especializada con definición de conducta terapéutica

**Severidad:**
- **Error** si: formato incorrecto, V26 < V18, fecha futura
- **Advertencia** si: uso de `1800-01-01` sin novedad correspondiente en V128

---

### V27 — Histología del tumor en muestra de biopsia o quirúrgica

**Módulo:** Diagnóstico del cáncer
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Adenocarcinoma, con o sin otra especificación |
| `2` | Carcinoma escamocelular (epidermoide), con o sin otra especificación |
| `3` | Carcinoma de células basales (basocelular) |
| `4` | Carcinoma, con o sin otra especificación diferentes a las anteriores |
| `5` | Oligodendroglioma, con o sin otra especificación |
| `6` | Astrocitoma, con o sin otra especificación |
| `7` | Ependimoma, con o sin otra especificación |
| `8` | Neuroblastoma, con o sin otra especificación |
| `9` | Meduloblastoma, con o sin otra especificación |
| `10` | Hepatoblastoma, con o sin otra especificación |
| `11` | Rabdomiosarcoma, con o sin otra especificación |
| `12` | Leiomiosarcoma, con o sin otra especificación |
| `13` | Osteosarcoma, con o sin otra especificación |
| `14` | Fibrosarcoma, con o sin otra especificación |
| `15` | Angiosarcoma, con o sin otra especificación |
| `16` | Condrosarcoma, con o sin otra especificación |
| `17` | Otros sarcomas, con o sin otra especificación |
| `18` | Pancreatoblastoma, con o sin otra especificación |
| `19` | Blastoma pleuropulmonar, con o sin otra especificación |
| `20` | Otros tipos histológicos no mencionados |
| `21` | Célula pequeña (únicamente válido para cáncer de pulmón) |
| `23` | Melanoma |
| `24` | Carcinoma papilar de tiroides |
| `98` | No se realizó estudio histopatológico (V21 = `7`) |
| `99` | Desconocido: dato no descrito en soportes clínicos |

**Reglas de validación:**
1. Usar el subtipo histológico de la **biopsia diagnóstica** como primera opción; si no hay información, usar la muestra quirúrgica
2. El código `2` (escamocelular) aplica para todos los tumores con esta histología, no solo piel (cérvix, pulmón, canal anal, etc.)
3. El código `21` (célula pequeña) es **exclusivo para cáncer de pulmón**
4. En pacientes incidentes, la opción `99` **se considera dato no gestionado**

**Dependencias:**
- Si V21 = `7` → V27 = `98`
- Código `21` solo válido si V17 corresponde a cáncer de pulmón

**Soporte documental:** Sí — reporte histopatológico de biopsia o muestra quirúrgica

**Severidad:**
- **Error** si: código no está en el catálogo, `21` usado fuera de cáncer de pulmón
- **Advertencia** si: `99` en paciente incidente (dato no gestionado)

---

### V28 — Grado de diferenciación del tumor sólido maligno

**Módulo:** Diagnóstico del cáncer
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Bien diferenciado (grado 1) |
| `2` | Moderadamente diferenciado (grado 2) |
| `3` | Mal diferenciado (grado 3) |
| `4` | Anaplásico o indiferenciado (grado 4) |
| `94` | Cáncer sólido cuyo reporte de patología no incluye descripción de diferenciación celular (ej: tiroides, basocelular, tumores in situ, melanoma, próstata, entre otros) |
| `95` | No es sólido (cánceres hematolinfáticos) |
| `98` | No se realizó estudio histopatológico (V21 = `7`) |
| `99` | No hay información en la historia clínica |

**Reglas de validación:**
1. Usar el grado de la **biopsia diagnóstica** como primera opción; si no hay información, usar el informe quirúrgico
2. La escala de Nottingham da resultado en grado 1, 2 o 3 — puede registrarse directamente en esta variable
3. Para cáncer de próstata sin descripción de grado de diferenciación en patología → registrar `94`; **no realizar homologaciones desde el Gleason**
4. La opción `99` está reservada para cánceres que sí deben tener grado pero no está descrito en los soportes
5. La opción `99` **solo es válida para diagnósticos anteriores a 2015-01-01**; si el diagnóstico fue previo pero el dato está disponible, debe reportarse

**Dependencias:**
- Si V21 = `7` → V28 = `98`
- Si V17 corresponde a cáncer hematolinfático → V28 = `95`

**Soporte documental:** Sí — reporte histopatológico

**Severidad:**
- **Error** si: código no está en el catálogo, `99` usado en diagnóstico posterior a 2015-01-01
- **Advertencia** si: homologación incorrecta desde Gleason hacia esta variable

---

### V29 — Primera estadificación basada en TNM, FIGO u otras compatibles

**Módulo:** Diagnóstico del cáncer
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia (por tipo de cáncer):**

#### Cáncer de mama y cáncer gástrico
| Código | Estadio |
|---|---|
| `0` | EC 0 (tumor in situ) |
| `2` | EC IA / 1A |
| `5` | EC IB / 1B |
| `11` | EC IIA / 2A |
| `14` | EC IIB |
| `17` | EC IIIA / 3A |
| `18` | EC IIIB / 3B |
| `19` | EC IIIC / 3C |
| `20` | EC IV / 4 |

#### Cáncer de próstata
| Código | Estadio |
|---|---|
| `0` | EC 0 (tumor in situ) |
| `1` | EC I / 1 |
| `11` | EC IIA / 2A |
| `14` | EC IIB |
| `15` | EC IIC / 2C |
| `17` | EC IIIA / 3A |
| `18` | EC IIIB / 3B |
| `19` | EC IIIC / 3C |
| `21` | EC IVA / 4A |
| `22` | EC IVB / 4B |

#### Cáncer de pulmón (8ª edición TNM)
| Código | Estadio |
|---|---|
| `0` | EC 0 (tumor in situ) |
| `3` | EC IA1 |
| `4` | EC IA2 |
| `36` | EC IA3 |
| `11` | EC IIA / 2A |
| `14` | EC IIB / 2B |
| `17` | EC IIIA / 3A |
| `18` | EC IIIB / 3B |
| `19` | EC IIIC / 3C |
| `21` | EC IVA / 4A |
| `22` | EC IVB / 4B |

#### Melanoma
| Código | Estadio |
|---|---|
| `0` | EC 0 (tumor in situ) |
| `2` | EC IA / 1A |
| `5` | EC IB / 1B |
| `11` | EC IIA / 2A |
| `14` | EC IIB / 2B |
| `15` | EC IIC / 2C |
| `17` | EC IIIA / 3A |
| `18` | EC IIIB / 3B |
| `19` | EC IIIC / 3C |
| `29` | EC IIID / 3D |
| `20` | EC IV / 4 |

#### Cáncer de colon y recto
| Código | Estadio |
|---|---|
| `0` | EC 0 (tumor in situ) |
| `1` | EC I / 1 |
| `11` | EC IIA / 2A |
| `14` | EC IIB / 2B |
| `15` | EC IIC / 2C |
| `17` | EC IIIA / 3A |
| `18` | EC IIIB / 3B |
| `19` | EC IIIC / 3C |
| `21` | EC IVA / 4A |
| `22` | EC IVB / 4B |
| `23` | EC IVC / 4C |

#### Cáncer anal (agrupador colon y recto — 8ª edición TNM)
| Código | Estadio |
|---|---|
| `0` | EC 0 (tumor in situ) |
| `1` | EC I / 1 |
| `11` | EC IIA / 2A |
| `14` | EC IIB / 2B |
| `17` | EC IIIA / 3A |
| `18` | EC IIIB / 3B |
| `19` | EC IIIC / 3C |
| `20` | EC IV / 4 |

#### Cáncer de cérvix (FIGO)
| Código | Estadio |
|---|---|
| `0` | EC 0 (tumor in situ) |
| `1` | EC I / 1 |
| `2` | EC IA / 1A |
| `3` | EC IA1 |
| `4` | EC IA2 |
| `5` | EC IB / 1B |
| `6` | EC IB1 |
| `7` | EC IB2 |
| `30` | EC IB3 |
| `10` | EC II / 2 |
| `11` | EC IIA / 2A |
| `12` | EC IIA1 |
| `13` | EC IIA2 |
| `14` | EC IIB / 2B |
| `16` | EC III / 3 |
| `17` | EC IIIA / 3A |
| `18` | EC IIIB / 3B |
| `19` | EC IIIC / 3C |
| `27` | EC IIIC1 |
| `28` | EC IIIC2 |
| `21` | EC IVA / 4A |
| `22` | EC IVB / 4B |

#### Otras opciones transversales
| Código | Descripción |
|---|---|
| `8` | EC IC / 1C |
| `9` | EC IS / 1S |
| `24` | EC 4S (para neuroblastoma) |
| `25` | EC V / 5 |
| `31` | EC IC1 |
| `32` | EC IC2 |
| `33` | EC IC3 |
| `34` | EC IIIA1 |
| `35` | EC IIIA2 |
| `98` | No aplica (cáncer de piel basocelular, cáncer hematológico, o cáncer en SNC excepto neuroblastoma) |
| `99` | Desconocido: dato no descrito en soportes clínicos |

**Reglas de validación:**
1. En caso de más de una estadificación (clínica, patológica, etc.) → registrar la usada para **iniciar el tratamiento** o la primera registrada al completar exámenes de extensión
2. Si V17 inicia con letra `D` (tumor in situ) → V29 debe ser `0`
3. Las opciones `34` y `35` (FIGO ovario) **no son válidas** para cérvix
4. Para cánceres no priorizados: seleccionar la opción que corresponda según soporte clínico, sin ceñirse al agrupador
5. Para usuarios con diagnóstico histopatológico desde 2024-11-01 sin estadificación → V29 = `99` y V128 = novedad 2, 10 o 13
6. La opción `99` en pacientes incidentes **se considera gestión deficiente del dato**

**Dependencias:**
- Relacionada con V17: si CIE-10 inicia en `D` → V29 = `0`
- Relacionada con V128 (novedades): si no hay estadificación por diagnóstico reciente
- `98` si V17 corresponde a cáncer de piel basocelular, hematológico o SNC (excepto neuroblastoma)

**Soporte documental:** Sí — historia clínica con estadificación registrada por especialista

**Severidad:**
- **Error** si: código no está en el catálogo, incoherencia entre V17 (in situ) y V29 ≠ `0`, opciones `34`/`35` en cérvix
- **Advertencia** si: `99` en paciente incidente (gestión deficiente)

---

### V30 — Fecha en que se realizó la estadificación

**Módulo:** Diagnóstico del cáncer
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `1800-01-01` | Desconocido: dato no descrito en soportes clínicos |
| `1845-01-01` | No aplica (cáncer de piel basocelular, hematológico o SNC excepto neuroblastoma — mismo criterio que V29 = `98`) |

**Regla de fecha parcial:**
- Si solo conoce año y mes → día 15

**Dependencias:**
- V30 ≥ V18 (fecha de diagnóstico)
- Relacionada con V128: si diagnóstico histopatológico desde 2024-11-01 sin estadificación → V30 = `1800-01-01` y V128 = novedad 2, 10 o 13

**Soporte documental:** Sí — historia clínica

**Severidad:**
- **Error** si: formato incorrecto, V30 < V18, fecha futura
- **Advertencia** si: uso de `1800-01-01` cuando podría obtenerse

---

### V31 — Prueba HER2 para cáncer de mama

**Módulo:** Diagnóstico del cáncer
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico
**Aplica:** Solo para cáncer de mama

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Sí se realizó antes del inicio del tratamiento |
| `2` | No se realizó antes del inicio del tratamiento |
| `97` | No aplica: es cáncer de mama in situ |
| `98` | No aplica: no es cáncer de mama |
| `99` | Desconocido: dato no descrito en soportes clínicos |

**Reglas de validación:**
1. Si el examen se realizó pero fue **posterior al inicio del tratamiento** → registrar `2` (No se realizó); sin embargo, en V32 y V33 sí se reportan fecha y resultado de esa prueba
2. Si se realizó en paciente con cáncer de mama in situ → capturar la información (no usar `97` automáticamente)

**Dependencias:**
- Relacionada con V8 (sexo): HER2 aplica principalmente en V8 = `F`
- Relacionada con V17: solo aplica si V17 corresponde a cáncer de mama
- Si V31 = `2` → V32 = `1845-01-01` y V33 = `98` (salvo que haya prueba posterior al tratamiento)

**Soporte documental:** Sí — reporte de IHQ o prueba HER2

**Severidad:**
- **Error** si: código no está en el catálogo, `98` usado cuando V17 sí es cáncer de mama
- **Advertencia** si: `99` cuando el dato podría obtenerse del reporte de patología

---

### V32 — Fecha de realización de la única o última prueba HER2

**Módulo:** Diagnóstico del cáncer
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Aplica:** Solo para cáncer de mama

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `1800-01-01` | Desconocido: dato no descrito en soportes clínicos |
| `1840-01-01` | No aplica: es cáncer de mama in situ |
| `1845-01-01` | No aplica: no es cáncer de mama, o V31 = `2` (no se realizó) |

**Regla de fecha parcial:**
- Si solo conoce año y mes → día 15

**Dependencias:**
- Si V31 = `2` → V32 = `1845-01-01` (salvo que haya prueba posterior al inicio del tratamiento, en cuyo caso sí se reporta la fecha)
- Si V17 no es cáncer de mama → V32 = `1845-01-01`

**Soporte documental:** Sí — reporte de la prueba HER2

**Severidad:**
- **Error** si: formato incorrecto, fecha futura, comodín incorrecto según condición

---

### V33 — Resultado de la única o última prueba HER2

**Módulo:** Diagnóstico del cáncer
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico
**Aplica:** Solo para cáncer de mama

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | +++ (positivo) |
| `2` | ++ (equívoco o indeterminado) |
| `3` | + (negativo) |
| `4` | 0 (negativo) |
| `97` | No aplica: es cáncer de mama in situ |
| `98` | No aplica: no es cáncer de mama, o V31 = `2` |
| `99` | Desconocido: dato no descrito en soportes clínicos |

**Reglas de validación:**
1. Para pacientes prevalentes que obtengan un resultado diferente de HER2 por nueva IHQ postquirúrgica (especialmente si cambia a positivo) → **ajustar el dato**, ya que el enfoque del tratamiento puede variar

**Dependencias:**
- Si V31 = `2` → V33 = `98`
- Si V17 no es cáncer de mama → V33 = `98`

**Soporte documental:** Sí — reporte de la prueba HER2

**Severidad:**
- **Error** si: código no está en el catálogo, incoherencia con V31
- **Advertencia** si: resultado positivo no actualizado en prevalentes tras nueva IHQ

---

### V34 — Estadificación de Dukes para cáncer colorrectal

**Módulo:** Diagnóstico del cáncer
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico
**Aplica:** Solo para cáncer colorrectal

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | A |
| `2` | B |
| `3` | C |
| `4` | D |
| `98` | No aplica: no es cáncer colorrectal |
| `99` | Es cáncer colorrectal pero no hay información en la historia clínica |

**Dependencias:**
- Relacionada con V17: solo aplica si V17 corresponde a cáncer colorrectal
- Si V34 = `98` o `99` → V35 = `1845-01-01`

**Soporte documental:** Sí — historia clínica con estadificación de Dukes

**Severidad:**
- **Error** si: código no está en el catálogo, `98` cuando V17 sí es cáncer colorrectal
- **Advertencia** si: `99` cuando el dato podría obtenerse

---

### V35 — Fecha en que se realizó la estadificación de Dukes

**Módulo:** Diagnóstico del cáncer
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres
**Aplica:** Solo para cáncer colorrectal

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `1845-01-01` | No aplica: no es cáncer colorrectal, o V34 = `99` |

**Regla de fecha parcial:**
- Si solo conoce año y mes → día 15

**Dependencias:**
- Si V34 = `98` o `99` → V35 = `1845-01-01`
- V35 ≥ V18 (fecha de diagnóstico)

**Soporte documental:** Sí — historia clínica

**Severidad:**
- **Error** si: formato incorrecto, V35 < V18, fecha futura, comodín incorrecto

---

### V36 — Estadificación clínica Ann Arbor/Lugano (linfomas y mieloma múltiple)

**Módulo:** Diagnóstico del cáncer
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico
**Aplica:** Linfoma no Hodgkin, linfoma Hodgkin adulto y pediátrico, mieloma múltiple

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Estadio I |
| `2` | Estadio II |
| `3` | Estadio III |
| `4` | Estadio IV |
| `5` | Estadio IA |
| `6` | Estadio IB |
| `7` | Estadio IIA |
| `8` | Estadio IIB |
| `9` | Estadio IIIA |
| `10` | Estadio IIIB |
| `11` | Estadio IVA |
| `12` | Estadio IVB |
| `13` | Extranodal cualquier estadio |
| `14` | Primario SNC |
| `15` | Primario Mediastinal |
| `16` | Primario de otros órganos |
| `98` | No aplica: tumor diferente a los enunciados |
| `99` | Desconocido: dato no descrito en soportes clínicos |

**Reglas de validación:**
1. Los sufijos A y B indican presencia o ausencia de sintomatología sistémica; si el soporte solo registra el estadio sin sufijo → usar opciones `1` a `4`
2. Si el estadiaje incluye sufijo `X` (masa Bulky > 10 cm) → elegir el estadio correspondiente ignorando el sufijo X
3. Para usuarios con diagnóstico desde 2024-11-01 sin estadificación → V36 = `99` y V128 = novedad 2, 10 o 13
4. Incluye mieloma múltiple (MM)

**Dependencias:**
- Relacionada con V17: solo aplica si V17 corresponde a linfoma o mieloma múltiple
- Si V17 no corresponde → V36 = `98`

**Soporte documental:** Sí — historia clínica con estadificación Ann Arbor/Lugano

**Severidad:**
- **Error** si: código no está en el catálogo, `98` cuando V17 sí es linfoma o mieloma
- **Advertencia** si: `99` en paciente incidente

---

### V37 — Valor de clasificación de la escala Gleason para cáncer de próstata

**Módulo:** Diagnóstico del cáncer
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico
**Aplica:** Solo para cáncer de próstata

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `11` | Gleason ≤ 6: ≤ 3+3 |
| `12` | Gleason 7: 3+4 |
| `13` | Gleason 7: 4+3 |
| `14` | Gleason 8: 4+4 o 3+5 o 5+3 |
| `15` | Gleason 9 o 10: 4+5 o 5+4 o 5+5 |
| `97` | Es cáncer de próstata pero el diagnóstico fue clínico (sin histopatología) |
| `98` | No es cáncer de próstata |
| `99` | Es cáncer de próstata con diagnóstico histopatológico pero sin información de Gleason en historia clínica |

**Reglas de validación:**
1. Las opciones `1` a `10` **no son válidas** para pacientes reportados por primera vez a la CAC, independiente del año de diagnóstico; solo se validan como histórico para pacientes reportados antes de 2021
2. En casos nuevos, la opción `99` **se considera dato no gestionado**

**Dependencias:**
- Relacionada con V8 (sexo): Gleason solo aplica en V8 = `M`
- Relacionada con V17: solo aplica si V17 corresponde a cáncer de próstata
- Si V17 no es cáncer de próstata → V37 = `98`
- Si V21 = `7` (diagnóstico clínico) → V37 = `97`

**Soporte documental:** Sí — reporte histopatológico con puntuación Gleason

**Severidad:**
- **Error** si: código no está en el catálogo, opciones `1`-`10` en paciente nuevo, `98` cuando V17 sí es próstata
- **Advertencia** si: `99` en paciente incidente (dato no gestionado)

---

# MÓDULO 3 — TRATAMIENTO (V38–V73)

---

### V38 — Clasificación del riesgo en leucemias, linfomas, mieloma múltiple y sólidos pediátricos

**Módulo:** Tratamiento
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico
**Aplica:** Leucemias, linfomas, mieloma múltiple

**Catálogo de referencia (por tipo de cáncer):**

#### Linfoma no Hodgkin
| Código | Descripción |
|---|---|
| `1` | Bajo riesgo |
| `2` | Riesgo intermedio bajo |
| `3` | Intermedio |
| `4` | Riesgo intermedio alto |
| `5` | Riesgo alto |

#### Linfoma de Hodgkin
| Código | Descripción |
|---|---|
| `1` | Bajo riesgo |
| `5` | Riesgo alto |

#### Adultos — LLA, LMA y Mieloma Múltiple
| Código | Descripción |
|---|---|
| `1` | Riesgo estándar / bajo |
| `3` | Riesgo intermedio |
| `5` | Riesgo alto |

#### Pediatría — LLA y LMA
| Código | Descripción |
|---|---|
| `1` | Riesgo estándar / favorable / bajo riesgo |
| `3` | Riesgo intermedio |
| `5` | Riesgo alto / desfavorable |

#### Códigos generales
| Código | Descripción |
|---|---|
| `98` | No aplica: no es leucemia ni linfoma |
| `99` | Desconocido: dato no descrito en soportes clínicos |

**Reglas de validación:**
1. Las opciones `6` a `13` solo son válidas para pacientes reportados **antes de 2021** (dato histórico); no son válidas para pacientes nuevos
2. Para linfoma de Hodgkin: homologar según sistemas de clasificación disponibles (ej. Hasenclever): estadio I o II (V36) → riesgo `1`; estadio III o IV → riesgo `5`
3. Para mieloma múltiple: reportar riesgo bajo (`1`), intermedio (`3`) o alto (`5`)
4. Para usuarios con diagnóstico desde 2024-11-01 sin clasificación de riesgo → V38 = `99` y V128 = novedad 2, 10 o 13

**Dependencias:**
- Relacionada con V17 y V36: el tipo de linfoma determina qué subescala del catálogo aplica
- Si V17 no es leucemia ni linfoma → V38 = `98`

**Soporte documental:** Sí — historia clínica con clasificación de riesgo por especialista

**Severidad:**
- **Error** si: código no está en el catálogo, opciones `6`-`13` en paciente nuevo, código inválido para el tipo de cáncer
- **Advertencia** si: `99` sin novedad registrada en V128, incoherencia entre V36 (estadio Hodgkin) y V38 (riesgo)

---

### V39 — Fecha de clasificación de riesgo

**Módulo:** Tratamiento
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `1800-01-01` | Desconocido: dato no descrito en soportes clínicos |
| `1845-01-01` | No aplica: no es leucemia ni linfoma |

**Regla de fecha parcial:**
- Si solo conoce año y mes → día 15

**Dependencias:**
- Si V38 = `98` → V39 = `1845-01-01`
- V39 ≥ V18 (fecha de diagnóstico)
- Relacionada con V128: si diagnóstico desde 2024-11-01 sin clasificación → V39 = `1800-01-01` y V128 = novedad 2, 10 o 13

**Soporte documental:** Sí — historia clínica

**Severidad:**
- **Error** si: formato incorrecto, V39 < V18, fecha futura, comodín incorrecto según condición
- **Advertencia** si: `1800-01-01` sin novedad en V128

---

### V40 — Objetivo (intención) del tratamiento médico inicial al diagnóstico

**Módulo:** Tratamiento
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Curación |
| `2` | Paliación exclusivamente |
| `3` | Manejo expectante una vez realizado el diagnóstico |
| `99` | Desconocido: dato no descrito en soportes clínicos |

**Reglas de validación:**
1. Corresponde a la decisión **al momento del diagnóstico**
2. Esta variable **no es modificable en el tiempo** — una vez registrada no debe cambiarse aunque la intención terapéutica evolucione

**Soporte documental:** Sí — nota del especialista con definición de intención terapéutica al diagnóstico

**Severidad:**
- **Error** si: código no está en el catálogo, campo vacío
- **Advertencia** si: `99` cuando la intención está implícita en el plan de tratamiento registrado

---

### V41 — Intervención médica durante el periodo de reporte

**Módulo:** Tratamiento
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Observación previa a tratamiento (manejo expectante o tratamiento con orden médica pero no administrado por cercanía a fecha de corte) |
| `2` | Tratamiento curativo o paliativo dirigido al cáncer inicial o por recaída (quimioterapia, hormonoterapia, radioterapia, cirugía, terapia biológica) |
| `3` | Observación o seguimiento oncológico luego de tratamiento inicial (incluye tratamientos para enfermedad general no oncológica y métodos diagnósticos de seguimiento) |
| `4` | Opciones 1 y 2 únicamente |
| `5` | Opciones 2 y 3 únicamente |
| `6` | Opciones 1, 2 y 3 |
| `99` | Sin intervención en el periodo (abandono de terapia, alta oncológica o alta voluntaria) |

**Soporte documental:** Sí — historia clínica del periodo de reporte

**Severidad:**
- **Error** si: código no está en el catálogo, campo vacío
- **Advertencia** si: `99` en paciente con registros de atención en el periodo

---

### V42 — Antecedente de otro cáncer primario

**Módulo:** Antecedentes al diagnóstico
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Sí tiene o tuvo otro cáncer primario diferente al reportado |
| `2` | No |
| `99` | Desconocido: la historia clínica no permite confirmar ni descartar |

**Reglas de validación:**
1. Si el paciente tiene 2 primarios del **mismo agrupador** → capturar la información del segundo primario en V42-V44 (ej. mama bilateral: misma información en V17 y V44)
2. El segundo primario debe estar **soportado en la historia clínica**
3. Si hay 2 primarios, en caso nuevo deben reportarse en **2 líneas independientes**, cada una con su primario en V17 y el otro en V44
4. Si hay 3 primarios → reportar en el antecedente el **más cercano a la fecha de corte**
5. La opción `99` aplica cuando la historia clínica menciona un segundo cáncer pero los datos son insuficientes, o no permite descartarlo

**Dependencias:**
- Relacionada con V43 (fecha del otro cáncer primario)
- Relacionada con V44 (CIE-10 del otro cáncer primario)
- Si V42 = `2` → V43 = `1845-01-01` y V44 = `99`

**Soporte documental:** Sí — historia clínica con antecedente oncológico

**Severidad:**
- **Error** si: código no está en el catálogo, campo vacío
- **Advertencia** si: `99` cuando el antecedente podría determinarse

---

### V43 — Fecha de diagnóstico del otro cáncer primario

**Módulo:** Antecedentes al diagnóstico
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `1800-01-01` | Desconocido: dato no descrito en soportes clínicos |
| `1845-01-01` | No aplica: no ha tenido otro cáncer primario (V42 = `2`) |

**Regla de fecha parcial:**
- Si solo conoce año y mes → día 15

**Dependencias:**
- Si V42 = `2` → V43 = `1845-01-01`
- V43 puede ser anterior, igual o posterior a V18 (puede ser antecedente o concurrente)

**Soporte documental:** Sí — historia clínica

**Severidad:**
- **Error** si: formato incorrecto, fecha futura, comodín incorrecto según condición de V42

---

### V44 — Tipo CIE-10 del cáncer antecedente o concurrente

**Módulo:** Antecedentes al diagnóstico
**Tipo de dato:** Código alfanumérico
**Formato:** Código CIE-10 (archivo operativo SISCAC)
**Catálogo de referencia:** CIE-10 archivo operativo disponible en SISCAC

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `99` | No aplica: no hay antecedente ni concurrencia de otro cáncer primario |

**Reglas de validación:**
1. Registrar el código de la enfermedad maligna **ya diagnosticada definitivamente** — si hubo diagnósticos previos intermedios (ej. "tumor de células pequeñas redondas y azules" que luego se confirmó como linfoma) → reportar el diagnóstico definitivo
2. Si V42 = `2` o `99` → V44 = `99`
3. Validar que el código exista en el archivo operativo CIE-10 de SISCAC

**Dependencias:**
- Si V42 = `1` → V44 debe contener un código CIE-10 válido distinto al de V17
- Si V42 ≠ `1` → V44 = `99`

**Soporte documental:** Sí — historia clínica con diagnóstico oncológico del antecedente

**Severidad:**
- **Error** si: código no existe en CIE-10 SISCAC, campo vacío cuando V42 = `1`, mismo código que V17 sin justificación
- **Advertencia** si: código muy genérico cuando podría especificarse

---

### V45 — ¿Recibió el usuario quimioterapia u otra terapia sistémica en el periodo de reporte?

**Módulo:** Terapia sistémica e intratecal — primer o único esquema
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Sí recibió |
| `98` | No aplica: no está indicada esta terapia |

**Nota:** Terapia sistémica incluye quimioterapia, hormonoterapia, inmunoterapia y terapia dirigida.

**Reglas de validación:**
1. Solo aplican tratamientos **suministrados** dentro del periodo de reporte; no aplican los propuestos pero no administrados
2. Si el paciente tiene más de un cáncer primario → registrar la terapia correspondiente al cáncer reportado en V17 o sus metástasis
3. Si V45 = `98` → las variables V46 a V73 deben registrar No Aplica (`98` o `97` según cada variable)

**Dependencias:**
- Es la variable de control de todo el bloque V46–V73
- Si V45 = `98` → V46 = `0` o `98`, V47 = `98`, V49 = `1845-01-01`, V58 = `1845-01-01`, etc.

**Soporte documental:** Sí — historia clínica, registros de administración de medicamentos

**Severidad:**
- **Error** si: código no está en el catálogo, campo vacío
- **Advertencia** si: `98` cuando hay registros de administración en el periodo

---

### V46 — Número de fases de quimioterapia recibidas en el periodo

**Módulo:** Terapia sistémica — primer o único esquema
**Tipo de dato:** Numérico / Catálogo
**Aplica:** Solo para hematolinfáticos con CIE-10: `C835`, `C910`, `C920`, `C924`, `C925`

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `0` | Es cáncer hematolinfático de los CIE-10 enunciados y en V45 se respondió `98` |
| `98` | No aplica: es tumor sólido o cáncer diferente a los CIE-10 enunciados |

**Reglas de validación:**
1. Escribir el número de fases de quimioterapia propuestas para el periodo
2. Solo aplica para: linfoma no Hodgkin linfoblástico (`C835`), leucemia linfoblástica aguda (`C910`), leucemia mieloide aguda (`C920`), leucemia promielocítica aguda (`C924`), leucemia mielomonocítica aguda (`C925`)
3. Para todos los demás cánceres → `98`

**Dependencias:**
- Relacionada con V46.1 a V46.8 (fases específicas)
- Si V45 = `98` → V46 = `0` (si es hematolinfático de los enunciados) o `98`

**Severidad:**
- **Error** si: valor fuera de rango, `98` en hematolinfático de los CIE-10 enunciados con V45 = `1`

---

### V46.1 a V46.8 — Fases de quimioterapia recibidas

**Módulo:** Terapia sistémica — primer o único esquema
**Tipo de dato:** Catálogo cerrado
**Aplica:** Solo para CIE-10: `C835`, `C910`, `C920`, `C924`, `C925`

**Catálogo común para todas las subfases:**

| Código | Descripción |
|---|---|
| `1` | Sí recibió esta fase |
| `2` | No recibió esta fase (aplica solo para los CIE-10 enunciados) |
| `97` | No aplica: no es leucemia linfoide/mieloide aguda ni linfoma linfoblástico |

**Subfases:**

| Variable | Fase | Restricción adicional |
|---|---|---|
| V46.1 | Prefase o Citorreducción inicial | Solo LLA y linfoma linfoblástico |
| V46.2 | Inducción | LLA, LMA y linfoma linfoblástico |
| V46.3 | Intensificación | LLA, LMA y linfoma linfoblástico |
| V46.4 | Consolidación | LLA, LMA y linfoma linfoblástico |
| V46.5 | Reinducción | Solo LLA y linfoma linfoblástico |
| V46.6 | Mantenimiento | LLA, LMA y linfoma linfoblástico |
| V46.7 | Mantenimiento largo o final | LLA, LMA y linfoma linfoblástico |
| V46.8 | Otra fase diferente a las anteriores | LLA, LMA y linfoma linfoblástico |

**Reglas de validación:**
1. El paciente puede haber recibido más de una fase en el mismo periodo
2. Para CIE-10 fuera de los enunciados → todas las subfases = `97`
3. V46.1 y V46.5 (Prefase y Reinducción) solo aplican para LLA (`C910`) y linfoma linfoblástico (`C835`); no para LMA, C924 ni C925

**Severidad:**
- **Error** si: código no está en el catálogo, V46.1 o V46.5 usadas en LMA (`C920`, `C924`, `C925`)
- **Advertencia** si: todas las fases = `2` cuando V45 = `1`

---

### V47 — Número de ciclos iniciados y administrados en el periodo de reporte

**Módulo:** Terapia sistémica — primer o único esquema
**Tipo de dato:** Numérico
**Aplica:** Todos los cánceres con V45 = `1`

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `98` | No aplica o no recibió terapia (V45 = `98`) |

**Reglas de validación:**
1. Incluir ciclos en **diferentes esquemas** de manejo administrados en el periodo
2. Para tumores sólidos: ciclo = administración del esquema con periodo de descanso entre administraciones; registrar según historia clínica
3. Para hematolinfáticos: ciclo según el protocolo que recibe el paciente; registrar según historia clínica
4. Para **hormonoterapias orales** sin periodos de descanso → registrar `1` (un ciclo)
5. Para **terapias hormonales vía IM o SC** → cada aplicación cuenta como un ciclo
6. Cada administración de medicamento **vía intratecal** cuenta como un ciclo

**Soporte documental:** Sí — registros de administración de medicamentos

**Severidad:**
- **Error** si: `98` cuando V45 = `1`, valor negativo o no numérico
- **Advertencia** si: número de ciclos inusualmente alto o bajo para el tipo de cáncer y esquema

---

### V48 — Ubicación temporal del primer o único esquema de terapia sistémica

**Módulo:** Terapia sistémica — primer o único esquema
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Neoadyuvancia (manejo inicial prequirúrgico) |
| `2` | Tratamiento inicial curativo sin cirugía sugerida (frecuente en leucemias, linfomas u otros sin cirugía) |
| `3` | Adyuvancia (manejo inicial postquirúrgico) |
| `11` | Manejo de recaída |
| `12` | Manejo de enfermedad metastásica |
| `13` | Manejo paliativo (sin recaída ni enfermedad metastásica) |
| `98` | No aplica (V45 = `98`) |

**Reglas de validación:**
1. Para hormonoterapia de cáncer de mama iniciada posterior a cirugía → registrar `3` (adyuvancia)
2. Hace referencia al **primer o único** esquema del periodo; no al esquema final

**Dependencias:**
- Si V45 = `98` → V48 = `98`

**Soporte documental:** Sí — historia clínica con plan terapéutico

**Severidad:**
- **Error** si: código no está en el catálogo, `98` cuando V45 = `1`

---

### V49 — Fecha de inicio del primer o único esquema de terapia sistémica

**Módulo:** Terapia sistémica — primer o único esquema
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `1845-01-01` | No aplica (V45 = `98`) |

**Regla de fecha parcial:**
- Si solo conoce año y mes → día 15

**Reglas de validación:**
1. Es válido que la fecha **sea anterior al periodo de reporte** si el esquema inició antes y continúa en el periodo actual
2. Si V45 = `98` → V49 = `1845-01-01`

**Soporte documental:** Sí — registros de administración o historia clínica

**Severidad:**
- **Error** si: formato incorrecto, fecha futura, `1845-01-01` cuando V45 = `1`

---

### V50 — Número de IPS que suministran el primer o único esquema de terapia sistémica

**Módulo:** Terapia sistémica — primer o único esquema
**Tipo de dato:** Numérico

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `98` | No aplica (V45 = `98`) |

**Reglas de validación:**
1. Registrar el número de IPS distintas que suministran el primer esquema en el periodo
2. Si V45 = `98` → V50 = `98`

**Severidad:**
- **Error** si: valor negativo, no numérico, o `98` cuando V45 = `1`

---

### V51 — Código de la IPS1 que suministra el primer o único esquema de terapia sistémica

**Módulo:** Terapia sistémica — primer o único esquema
**Tipo de dato:** Código alfanumérico
**Formato:** 12 dígitos incluyendo cero inicial
**Catálogo de referencia:** REPS

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `96` | Terapia sistémica suministrada fuera del país |
| `98` | No aplica (V45 = `98`) |

**Reglas de validación:**
1. Para tratamientos **orales**: registrar el código de la IPS que **prescribió** el tratamiento, no el del operador logístico que realiza la entrega
2. Verificar que la IPS tenga habilitado el servicio de quimioterapia en REPS
3. Aplica la opción `96` para pacientes con diagnóstico confirmado en Colombia o residentes en el país que reciben parte del esquema por un prestador extranjero

**Soporte documental:** Sí — REPS vigente

**Severidad:**
- **Error** si: código no existe en REPS, IPS sin habilitación para quimioterapia, código de operador logístico en lugar de IPS prescriptora
- **Advertencia** si: IPS reportada no coincide con municipio de residencia (V14)

---

### V52 — Código de la IPS2 que suministra el primer o único esquema de terapia sistémica

**Módulo:** Terapia sistémica — primer o único esquema
**Tipo de dato:** Código alfanumérico
**Formato:** 12 dígitos incluyendo cero inicial
**Catálogo de referencia:** REPS

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `98` | No aplica |

**Reglas de validación:**
1. Mismas reglas que V51 para tratamientos orales (IPS prescriptora, no operador logístico)
2. Verificar habilitación en REPS
3. Solo diligenciar si V50 ≥ `2`

**Severidad:**
- **Error** si: código no existe en REPS, diligenciada cuando V50 = `1`

---

### V53 — Número de medicamentos antineoplásicos propuestos en el primer o único esquema

**Módulo:** Terapia sistémica — primer o único esquema
**Tipo de dato:** Numérico

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `98` | No aplica (V45 = `98`) |

**Reglas de validación:**
1. Registrar el número **total de medicamentos propuestos** (no necesariamente todos administrados) por el especialista en el periodo
2. **Descontar** medicamentos adyuvantes o de premedicación que no son antineoplásicos
3. Los esteroides (dexametasona, prednisolona, prednisona, metilprednisolona) **NO se reportan** en cánceres sólidos, linfomas de Hodgkin ni LMA (su uso en estos es como reductor de efectos adversos, no antineoplásico)
4. El **pegfilgrastim** se reporta pero **no se cuantifica**; no es válido como monoterapia única
5. Los **fármacos antirresortivos** (ácido ibandrónico, alendronato, zoledrónico, denosumab) solo son válidos si la indicación es manejo de metástasis ósea o hipercalcemia maligna; se reportan pero **no se cuantifican**
6. En V53.1 a V53.9 y V54 a V56: registrar solo los fármacos **administrados** en el periodo (no los propuestos)

**Soporte documental:** Sí — orden médica y registros de administración

**Severidad:**
- **Error** si: `98` cuando V45 = `1`, valor negativo
- **Advertencia** si: número de medicamentos no coincide con los registrados en V53.1-V53.9

---

### V53.1 a V53.9 — Medicamentos antineoplásicos administrados — primer o único esquema

**Módulo:** Terapia sistémica — primer o único esquema
**Tipo de dato:** Código ATC
**Formato:** Código ATC del medicamento
**Catálogo de referencia:** Listado ATC disponible en SISCAC

**Comodines permitidos:**

| Variable | Comodín | Cuándo aplica |
|---|---|---|
| V53.1 | `98` | No aplica (V45 = `98`) |
| V53.2 a V53.9 | `97` | Sí recibió quimioterapia pero ya registrada en variables anteriores (V45 = `1`) |
| V53.2 a V53.9 | `98` | No aplica (V45 = `98`) |

**Reglas de validación:**
1. Registrar el código ATC de cada medicamento **administrado** en el periodo (no propuesto)
2. Verificar que los ATC estén descritos en los soportes clínicos y administrados entre el 2 de enero de 2024 y el 1 de enero de 2025
3. **No capturar el mismo esquema de tratamiento en primer y segundo esquema** (no duplicar entre V53.x y V66.x)
4. Si el esquema tiene menos de 9 medicamentos → las variables restantes usan `97`

**Soporte documental:** Sí — registros de administración verificados en historia clínica

**Severidad:**
- **Error** si: código ATC no existe, mismo medicamento duplicado en primer y último esquema
- **Advertencia** si: medicamento reportado no está en el periodo de reporte

---

### V54, V55, V56 — Medicamentos antineoplásicos adicionales — primer o único esquema (1, 2 y 3)

**Módulo:** Terapia sistémica — primer o único esquema
**Tipo de dato:** Código ATC
**Formato:** Código ATC del medicamento
**Catálogo de referencia:** Listado ATC en SISCAC (incluye medicamentos fuera del plan de beneficios)

**Comodines permitidos:**

| Código | Cuándo aplica |
|---|---|
| `97` | No aplica: no recibió medicamentos diferentes a los de V53.1-V53.9, y V45 = `1` |
| `98` | No aplica: no tuvo este esquema (V45 = `98`) |

**Reglas de validación:**
1. Usar solo si el esquema tiene **más de 9 medicamentos** (desborda V53.1-V53.9)
2. Verificar que el medicamento **no esté ya registrado** en V53.1-V53.9
3. No repetir en V55 ni V56 lo que se registró en V54
4. Solo reportar medicamentos **antineoplásicos**
5. No capturar el mismo esquema en primer y último esquema

**Soporte documental:** Sí — registros de administración

**Severidad:**
- **Error** si: código ATC repetido desde V53.x, medicamento no antineoplásico registrado
- **Advertencia** si: `97` cuando V53 registra menos de 9 medicamentos y quedan campos sin usar

---

### V57 — ¿Recibió quimioterapia intratecal en el primer o único esquema?

**Módulo:** Terapia sistémica — primer o único esquema
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Sí recibió |
| `2` | No recibió |
| `98` | No aplica: no tuvo ningún esquema de quimioterapia (V45 = `98`) |

**Reglas de validación:**
1. Si el tipo de cáncer no tiene indicación de quimioterapia intratecal pero el paciente recibió terapia sistémica → registrar `2` (No recibió)
2. Cada administración intratecal cuenta como un ciclo en V47

**Dependencias:**
- Si V45 = `98` → V57 = `98`

**Soporte documental:** Sí — registros de administración

**Severidad:**
- **Error** si: código no está en el catálogo, `98` cuando V45 = `1`

---

### V58 — Fecha de finalización del primer o único esquema de terapia sistémica

**Módulo:** Terapia sistémica — primer o único esquema
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `1845-01-01` | No aplica (V45 = `98`) |
| `1800-01-01` | Hormonoterapia o esquema que aún no finaliza |

**Regla de fecha parcial:**
- Si solo conoce año y mes → día 15

**Dependencias:**
- V58 ≥ V49 (fecha de inicio del esquema)
- Si V45 = `98` → V58 = `1845-01-01`
- Si V59 = `3` (esquema aún en curso) → V58 = `1800-01-01`

**Soporte documental:** Sí — historia clínica o registros de administración

**Severidad:**
- **Error** si: formato incorrecto, V58 < V49, fecha futura (salvo `1800-01-01`)
- **Advertencia** si: `1800-01-01` sin que V59 = `3`

---

### V59 — Características actuales del primer o único esquema de terapia sistémica

**Módulo:** Terapia sistémica — primer o único esquema
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Finalizado, esquema completo según medicamentos programados |
| `2` | Finalizado, esquema incompleto pero finalizado por algún motivo |
| `3` | No finalizado, esquema incompleto pero aún bajo tratamiento (ej. hormonoterapia o esquema en curso) |
| `98` | No aplica: no tuvo ningún esquema de terapia sistémica (V45 = `98`) |

**Dependencias:**
- Si V59 = `2` → V60 debe diligenciarse con el motivo de finalización prematura
- Si V59 = `3` → V58 = `1800-01-01`
- Si V45 = `98` → V59 = `98`

**Soporte documental:** Sí — historia clínica

**Severidad:**
- **Error** si: código no está en el catálogo, `98` cuando V45 = `1`
- **Advertencia** si: `2` sin motivo registrado en V60

---

### V60 — Motivo de finalización prematura del primer o único esquema

**Módulo:** Terapia sistémica — primer o único esquema
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico
**Aplica:** Solo cuando V59 = `2`

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Toxicidad de uno o más medicamentos |
| `2` | Otros motivos médicos |
| `3` | Muerte |
| `4` | Cambio de EAPB |
| `5` | Decisión del usuario: abandonó la terapia |
| `6` | No hay disponibilidad de medicamentos |
| `7` | Otros motivos administrativos |
| `8` | Otras causas no contempladas |
| `98` | No aplica |

**Reglas de validación:**
1. Seleccionar **un solo código**: el que corresponde a lo que ocurrió primero
2. Si V59 ≠ `2` → V60 = `98`

**Dependencias:**
- Solo se diligencia si V59 = `2`

**Soporte documental:** Sí — nota clínica o administrativa con justificación

**Severidad:**
- **Error** si: campo vacío cuando V59 = `2`, código no está en el catálogo
- **Advertencia** si: `98` cuando V59 = `2`

---

### V61 — Ubicación temporal del último esquema de terapia sistémica del periodo

**Módulo:** Terapia sistémica — último esquema
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Neoadyuvancia (manejo inicial prequirúrgico) |
| `2` | Tratamiento inicial curativo sin cirugía sugerida |
| `3` | Adyuvancia (manejo inicial postquirúrgico) |
| `11` | Manejo de progresión o recaída |
| `12` | Manejo de enfermedad metastásica |
| `13` | Cambio por toxicidad |
| `14` | Manejo paliativo (sin recaída ni enfermedad metastásica) |
| `97` | Solo recibió un esquema en el periodo (V45 = `1`); verificar que V62-V73 registren No Aplica |
| `98` | No aplica (V45 = `98`) |

**Reglas de validación:**
1. Si el paciente recibió **un solo esquema** en el periodo, incluido uno aún no finalizado → registrar `97`
2. Si recibió **únicamente hormonoterapia** en el periodo → no reportar nuevamente en esquema final; registrar `97`
3. **No capturar el mismo esquema** de V45-V61 en V62-V73

**Dependencias:**
- Si V61 = `97` o `98` → V62 a V73 = `1845-01-01` o `98` según cada variable
- Si V45 = `98` → V61 = `98`

**Soporte documental:** Sí — historia clínica

**Severidad:**
- **Error** si: código no está en el catálogo, mismo esquema duplicado en primer y último
- **Advertencia** si: `97` cuando hay evidencia de segundo esquema en el periodo

---

### V62 — Fecha de inicio del último esquema de terapia sistémica del periodo

**Módulo:** Terapia sistémica — último esquema
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `1845-01-01` | No aplica (V61 = `97` o `98`) |

**Regla de fecha parcial:**
- Si solo conoce año y mes → día 15

**Reglas de validación:**
1. Para hormonoterapia: registrar la fecha de inicio del tratamiento actual aunque haya sido iniciada antes del periodo de reporte
2. V62 ≥ V49 (el último esquema no puede iniciar antes que el primero)

**Dependencias:**
- Si V61 = `97` o `98` → V62 = `1845-01-01`

**Severidad:**
- **Error** si: formato incorrecto, V62 < V49, fecha futura
- **Advertencia** si: V62 muy cercana a V49 (posible duplicación de esquemas)

---

### V63 — Número de IPS que suministran el último esquema de terapia sistémica

**Módulo:** Terapia sistémica — último esquema
**Tipo de dato:** Numérico

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `98` | No aplica (V61 = `97` o `98`) |

**Reglas de validación:**
1. Mismas reglas que V50 aplicadas al último esquema
2. Si V61 = `97` o `98` → V63 = `98`

**Severidad:**
- **Error** si: valor negativo, `98` cuando V61 indica esquema diferente

---

### V64 — Código de la IPS1 que suministra el último esquema de terapia sistémica

**Módulo:** Terapia sistémica — último esquema
**Tipo de dato:** Código alfanumérico
**Formato:** 12 dígitos incluyendo cero inicial
**Catálogo de referencia:** REPS

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `98` | No aplica (V61 = `97` o `98`) |

**Reglas de validación:**
1. Para tratamientos orales: IPS que prescribió, no operador logístico de entrega
2. Verificar habilitación en REPS para quimioterapia

**Severidad:** Igual que V51.

---

### V65 — Código de la IPS2 que suministra el último esquema de terapia sistémica

**Módulo:** Terapia sistémica — último esquema
**Tipo de dato:** Código alfanumérico
**Formato:** 12 dígitos incluyendo cero inicial
**Catálogo de referencia:** REPS

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `98` | No aplica (V61 = `97` o `98`) |

**Reglas de validación:**
1. Mismas reglas que V52 aplicadas al último esquema
2. Solo diligenciar si V63 ≥ `2`

**Severidad:** Igual que V52.

---

### V66 — Número de medicamentos antineoplásicos propuestos en el último esquema

**Módulo:** Terapia sistémica — último esquema
**Tipo de dato:** Numérico

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `98` | No aplica: no recibió segundo esquema o V45 = `98` |

**Reglas de validación:**
1. Mismas reglas que V53 aplicadas al último esquema
2. En V66.1 a V66.9 y V67-V69: registrar solo fármacos **administrados** en el periodo

**Severidad:** Igual que V53.

---

### V66.1 a V66.9 — Medicamentos antineoplásicos administrados — último esquema

**Módulo:** Terapia sistémica — último esquema
**Tipo de dato:** Código ATC
**Catálogo de referencia:** Listado ATC SISCAC

**Comodines permitidos:**

| Variable | Comodín | Cuándo aplica |
|---|---|---|
| V66.1 | `98` | No aplica (V61 = `97` o `98`) |
| V66.2 a V66.9 | `97` | Sí recibió quimioterapia ya registrada en variables anteriores (V45 = `1`) |
| V66.2 a V66.9 | `98` | No aplica |

**Reglas de validación:**
1. Mismas reglas que V53.1-V53.9 aplicadas al último esquema
2. **No capturar el mismo esquema** del primer esquema (no duplicar entre V53.x y V66.x)

**Severidad:** Igual que V53.1-V53.9.

---

### V67, V68, V69 — Medicamentos antineoplásicos adicionales — último esquema (1, 2 y 3)

**Módulo:** Terapia sistémica — último esquema
**Tipo de dato:** Código ATC
**Catálogo de referencia:** Listado ATC SISCAC

**Comodines permitidos:**

| Código | Cuándo aplica |
|---|---|
| `97` | No aplica: no recibió medicamentos diferentes a V66.1-V66.9, y V61 seleccionó opción < `14` |
| `98` | No aplica: no tuvo último esquema o V61 = `97` o `98` |

**Reglas de validación:**
1. Mismas reglas que V54-V56 aplicadas al último esquema
2. Verificar que el medicamento no esté en V66.1-V66.9
3. No repetir entre V67, V68 y V69

**Severidad:** Igual que V54-V56.

---

### V70 — ¿Recibió quimioterapia intratecal en el último esquema?

**Módulo:** Terapia sistémica — último esquema
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Sí recibió |
| `2` | No recibió |
| `98` | No aplica: no tuvo ningún esquema de quimioterapia (V45 = `98`) |

**Dependencias:**
- Si V61 = `97` o `98` → V70 = `98`

**Severidad:** Igual que V57.

---

### V71 — Fecha de finalización del último esquema de terapia sistémica

**Módulo:** Terapia sistémica — último esquema
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `1845-01-01` | No aplica (V61 = `97` o `98`) |
| `1800-01-01` | Hormonoterapia o esquema que aún no finaliza |

**Regla de fecha parcial:**
- Si solo conoce año y mes → día 15

**Dependencias:**
- V71 ≥ V62 (fecha de inicio del último esquema)
- Si V72 = `3` (aún en curso) → V71 = `1800-01-01`
- Si V61 = `97` o `98` → V71 = `1845-01-01`

**Severidad:**
- **Error** si: formato incorrecto, V71 < V62, fecha futura (salvo `1800-01-01`)

---

### V72 — Características actuales del último esquema de terapia sistémica

**Módulo:** Terapia sistémica — último esquema
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Finalizado, esquema completo según medicamentos programados |
| `2` | Finalizado, esquema incompleto pero finalizado por algún motivo |
| `3` | No finalizado, esquema incompleto pero aún bajo tratamiento |
| `98` | No aplica (V61 = `97` o `98`) |

**Dependencias:**
- Si V72 = `2` → diligenciar V73 con motivo de finalización prematura
- Si V72 = `3` → V71 = `1800-01-01`
- Si V61 = `97` o `98` → V72 = `98`

**Severidad:**
- **Error** si: código no está en el catálogo, `98` cuando V61 indica esquema diferente
- **Advertencia** si: `2` sin motivo en V73

### V73 — Motivo de finalización prematura del último esquema de terapia sistémica

**Módulo:** Terapia sistémica — último esquema
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico
**Aplica:** Solo cuando V72 = `2`

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Toxicidad de uno o más medicamentos |
| `2` | Otros motivos médicos |
| `3` | Muerte |
| `4` | Cambio de EPS |
| `5` | Decisión del usuario: abandonó la terapia |
| `6` | No hay disponibilidad de medicamentos |
| `7` | Otros motivos administrativos |
| `8` | Otras causas no contempladas |
| `98` | No aplica |

**Reglas de validación:**
1. Seleccionar **un solo código**: el que corresponde a lo que ocurrió primero
2. Si V72 ≠ `2` → V73 = `98`

**Dependencias:**
- Solo se diligencia si V72 = `2`
- Misma lógica que V60 aplicada al último esquema

**Soporte documental:** Sí — nota clínica o administrativa con justificación

**Severidad:**
- **Error** si: campo vacío cuando V72 = `2`, código no está en el catálogo
- **Advertencia** si: `98` cuando V72 = `2`

---

# MÓDULO 4 — CIRUGÍA (V74–V85)

---

### V74 — ¿Fue sometido el usuario a cirugía curativa o paliativa en el periodo de reporte?

**Módulo:** Cirugía
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Sí fue sometido al menos a una cirugía durante el periodo |
| `2` | No recibió cirugía |

**Reglas de validación:**
1. Para procedimientos que son **simultáneamente diagnósticos y terapéuticos** (ej. tiroidectomía, resección de tumores de piel) → reportar en esta variable y usar la misma fecha de V23
2. Reportar procedimientos del listado CUPS del archivo operativo, verificando que el objetivo sea el tratamiento del cáncer
3. Para hematolinfáticos con procedimiento quirúrgico → verificar minuciosamente que corresponde al manejo del cáncer
4. **NO son objeto de reporte:** implante de catéter, punción lumbar, biopsias, cierre de ostomías (colostomía, ileostomía, gastrostomía, nefrostomía, traqueostomía, etc.)
5. Si en el mismo tiempo quirúrgico se realizaron varias intervenciones reportables → seleccionar la **más representativa** en relación al tipo de cáncer
6. No aplican cirugías propuestas pero no realizadas (se eliminó la opción `3`)
7. Si V74 = `2` → V75 a V85 = `98` o `1845-01-01` según cada variable

**Dependencias:**
- Es la variable de control del bloque V75–V85

**Soporte documental:** Sí — nota quirúrgica y código CUPS correspondiente

**Severidad:**
- **Error** si: código no está en el catálogo, campo vacío
- **Advertencia** si: `2` cuando hay registros quirúrgicos en el periodo

---

### V75 — Número de cirugías a las que fue sometido el usuario en el periodo

**Módulo:** Cirugía
**Tipo de dato:** Numérico

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `98` | No aplica (V74 = `2`) |

**Reglas de validación:**
1. Registrar el número de **tiempos quirúrgicos**, no el número de procedimientos CUPS dentro de una o varias cirugías
2. Incluir cirugías por complicaciones relacionadas a la cirugía inicial
3. Si V74 = `2` → V75 = `98`

**Soporte documental:** Sí — notas quirúrgicas del periodo

**Severidad:**
- **Error** si: valor negativo, `98` cuando V74 = `1`, confusión entre tiempos quirúrgicos y códigos CUPS

---

### V76 — Fecha de realización de la primera cirugía en el periodo

**Módulo:** Cirugía
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `1845-01-01` | No aplica (V74 = `2`) |

**Regla de fecha parcial:**
- Si solo conoce año y mes → día 15

**Dependencias:**
- Si el procedimiento es diagnóstico y terapéutico simultáneamente → V76 = V23
- V76 debe estar dentro del periodo de reporte (2024-01-02 a 2025-01-01)

**Soporte documental:** Sí — nota quirúrgica

**Severidad:**
- **Error** si: formato incorrecto, fecha fuera del periodo de reporte, `1845-01-01` cuando V74 = `1`

---

### V77 — Código de la IPS que realizó la primera cirugía del periodo

**Módulo:** Cirugía
**Tipo de dato:** Código alfanumérico
**Formato:** 12 dígitos incluyendo cero inicial
**Catálogo de referencia:** REPS

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `96` | Cirugía realizada fuera del país |
| `98` | No aplica (V74 = `2`) |

**Soporte documental:** Sí — REPS vigente, nota quirúrgica

**Severidad:**
- **Error** si: código no existe en REPS, IPS sin habilitación quirúrgica

---

### V78 — Código CUPS de la primera cirugía del periodo

**Módulo:** Cirugía
**Tipo de dato:** Código alfanumérico
**Formato:** Código CUPS (archivo operativo SISCAC)

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `98` | No aplica (V74 = `2`) |

**Reglas de validación:**
1. Usar el CUPS que tenga **mayor relación con el manejo del cáncer** o el de **mayor complejidad** dentro de la cirugía
2. Los procedimientos de fotoféresis, fototerapia, crioterapia y radiofrecuencia se reportan en esta variable con su código CUPS correspondiente; deben contabilizarse también en V74 y V75

**Soporte documental:** Sí — nota quirúrgica con código CUPS

**Severidad:**
- **Error** si: código no existe en el archivo operativo CUPS SISCAC, `98` cuando V74 = `1`

---

### V79 — Ubicación temporal de la primera cirugía en relación al manejo oncológico

**Módulo:** Cirugía
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Parte del manejo inicial para el cáncer (tratamiento inicial curativo) |
| `5` | Manejo de recaída |
| `6` | Manejo de enfermedad metastásica |
| `98` | No aplica (V74 = `2`) |

**Dependencias:**
- Si V74 = `2` → V79 = `98`

**Soporte documental:** Sí — historia clínica con plan terapéutico

**Severidad:**
- **Error** si: código no está en el catálogo, `98` cuando V74 = `1`

---

### V80 — Fecha de realización de la última cirugía o cirugía de reintervención del periodo

**Módulo:** Cirugía
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `1845-01-01` | No aplica: solo hubo una intervención en el periodo, o no hubo cirugías |

**Regla de fecha parcial:**
- Si solo conoce año y mes → día 15

**Reglas de validación:**
1. **No reportar** datos del evento quirúrgico ya registrado como primera cirugía (V76)
2. V80 > V76 (la última cirugía debe ser posterior a la primera)
3. Solo diligenciar si V75 ≥ `2`

**Soporte documental:** Sí — nota quirúrgica de reintervención

**Severidad:**
- **Error** si: formato incorrecto, V80 ≤ V76, diligenciada cuando V75 = `1`

---

### V81 — Motivo de la última cirugía del periodo

**Módulo:** Cirugía
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Complementar tratamiento quirúrgico del cáncer no asociado a complicaciones de la primera cirugía |
| `2` | Complicaciones debidas a la primera cirugía o siguientes |
| `3` | Complicaciones por otras condiciones médicas no relacionadas a la cirugía (comorbilidad) |
| `5` | Opciones 1 y 3 |
| `6` | Opciones 2 y 3 |
| `98` | No aplica: solo hubo una intervención o no hubo cirugías |

**Dependencias:**
- Si V75 = `1` o V74 = `2` → V81 = `98`

**Soporte documental:** Sí — nota quirúrgica con justificación

**Severidad:**
- **Error** si: código no está en el catálogo, campo vacío cuando V75 ≥ `2`

---

### V82 — Código de la IPS que realizó la última cirugía del periodo

**Módulo:** Cirugía
**Tipo de dato:** Código alfanumérico
**Formato:** 12 dígitos incluyendo cero inicial
**Catálogo de referencia:** REPS

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `98` | No aplica: solo hubo una intervención o no hubo cirugías |

**Reglas de validación:** Mismas que V77 aplicadas a la última cirugía.

**Severidad:** Igual que V77.

---

### V83 — Código CUPS de la última cirugía del periodo

**Módulo:** Cirugía
**Tipo de dato:** Código alfanumérico
**Formato:** Código CUPS (archivo operativo CUPS SISCAC)

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `98` | No aplica: solo hubo una intervención o no hubo cirugías |

**Reglas de validación:** Mismas que V78 aplicadas a la última cirugía.

**Severidad:** Igual que V78.

---

### V84 — Ubicación temporal de la última cirugía en relación al manejo oncológico

**Módulo:** Cirugía
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Parte del manejo inicial para el cáncer (manejo inicial curativo) |
| `5` | Manejo de recaída |
| `6` | Manejo de enfermedad metastásica |
| `98` | No aplica: solo hubo una intervención o V74 = `2` |

**Dependencias:**
- Si V75 = `1` o V74 = `2` → V84 = `98`

**Severidad:** Igual que V79.

---

### V85 — Estado vital al finalizar la única o última cirugía del periodo

**Módulo:** Cirugía
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Vivo |
| `2` | Fallecido |
| `98` | No aplica (V74 = `2`) |

**Dependencias:**
- Si V74 = `2` → V85 = `98`
- Coherencia con V127 (estado vital al finalizar el periodo): si V85 = `2` → V127 debe ser `2`

**Soporte documental:** Sí — nota postquirúrgica o registro de mortalidad

**Severidad:**
- **Error** si: código no está en el catálogo, incoherencia con V127

---

# MÓDULO 5 — RADIOTERAPIA (V86–V105)

---

### V86 — ¿Recibió el usuario algún tipo de radioterapia en el periodo?

**Módulo:** Radioterapia
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Sí recibió algún tipo de radioterapia |
| `98` | No aplica |

**Reglas de validación:**
1. No aplica radioterapia propuesta pero no suministrada (se eliminó la opción `2`)
2. Si V86 = `98` → V87 a V105 deben registrar No Aplica (`98` o `1845-01-01` según cada variable)

**Dependencias:**
- Es la variable de control del bloque V87–V105

**Soporte documental:** Sí — registros de administración de radioterapia

**Severidad:**
- **Error** si: código no está en el catálogo, campo vacío

---

### V87 — Número de sesiones de radioterapia recibidas en el periodo

**Módulo:** Radioterapia
**Tipo de dato:** Numérico

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `98` | No aplica (V86 = `98`) |

**Reglas de validación:**
1. Registrar el número total de sesiones de **radioterapia interna o externa** suministradas en el periodo
2. Validar que en los soportes exista la cantidad de sesiones ordenadas (será capturada en variable adicional durante auditoría)

**Soporte documental:** Sí — registros de administración de radioterapia

**Severidad:**
- **Error** si: valor negativo, `98` cuando V86 = `1`

---

### V88 — Fecha de inicio del primer o único esquema de radioterapia

**Módulo:** Radioterapia
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `1845-01-01` | No aplica (V86 = `98`) |

**Regla de fecha parcial:**
- Si solo conoce año y mes → día 15

**Reglas de validación:**
1. Es válido que la fecha sea **anterior al periodo de reporte** si el esquema inició antes y continúa en el periodo actual
2. Si V86 = `98` → V88 = `1845-01-01`

**Severidad:**
- **Error** si: formato incorrecto, fecha futura, `1845-01-01` cuando V86 = `1`

---

### V89 — Ubicación temporal del primer o único esquema de radioterapia

**Módulo:** Radioterapia
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Neoadyuvancia (manejo inicial prequirúrgico) |
| `2` | Tratamiento inicial curativo sin cirugía sugerida |
| `3` | Adyuvancia (manejo inicial postquirúrgico) |
| `11` | Manejo de recaída |
| `12` | Manejo de enfermedad metastásica |
| `13` | Manejo paliativo (sin recaída ni enfermedad metastásica) |
| `98` | No aplica (V86 = `98`) |

**Dependencias:**
- Si V86 = `98` → V89 = `98`

**Severidad:**
- **Error** si: código no está en el catálogo, `98` cuando V86 = `1`

---

### V90 — Tipo de radioterapia aplicada en el primer o único esquema

**Módulo:** Radioterapia
**Tipo de dato:** Código alfanumérico
**Formato:** Código CUPS (archivo operativo CAC)

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `98` | No aplica (V86 = `98`) |

**Soporte documental:** Sí — orden y registro de administración de radioterapia

**Severidad:**
- **Error** si: código no existe en el archivo operativo CUPS CAC, `98` cuando V86 = `1`

---

### V91 — Número de IPS que suministran el primer o único esquema de radioterapia

**Módulo:** Radioterapia
**Tipo de dato:** Numérico

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `98` | No aplica (V86 = `98`) |

**Reglas de validación:**
1. Registrar el número de IPS que intervinieron en la administración de la dosis de radioterapia

**Severidad:**
- **Error** si: valor negativo, `98` cuando V86 = `1`

---

### V92 — Código de la IPS1 que suministra el primer o único esquema de radioterapia

**Módulo:** Radioterapia
**Tipo de dato:** Código alfanumérico
**Formato:** 12 dígitos incluyendo cero inicial
**Catálogo de referencia:** REPS

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `96` | Radioterapia suministrada fuera del país |
| `98` | No aplica (V86 = `98`) |

**Soporte documental:** Sí — REPS vigente

**Severidad:**
- **Error** si: código no existe en REPS, IPS sin habilitación para radioterapia

---

### V93 — Código de la IPS2 que suministra el primer o único esquema de radioterapia

**Módulo:** Radioterapia
**Tipo de dato:** Código alfanumérico
**Formato:** 12 dígitos incluyendo cero inicial
**Catálogo de referencia:** REPS

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `98` | No aplica |

**Reglas de validación:** Mismas que V92. Solo diligenciar si V91 ≥ `2`.

**Severidad:** Igual que V92.

---

### V94 — Fecha de finalización del primer o único esquema de radioterapia

**Módulo:** Radioterapia
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `1800-01-01` | Esquema de radioterapia que aún no finaliza |
| `1845-01-01` | No aplica (V86 = `98`) |

**Regla de fecha parcial:**
- Si solo conoce año y mes → día 15

**Dependencias:**
- V94 ≥ V88 (fecha de inicio)
- Si V95 = `3` (aún en curso) → V94 = `1800-01-01`

**Severidad:**
- **Error** si: formato incorrecto, V94 < V88, fecha futura (salvo `1800-01-01`)

---

### V95 — Características actuales del primer o único esquema de radioterapia

**Módulo:** Radioterapia
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Finalizado, dosis completa de radioterapia prescrita |
| `2` | Finalizado, dosis incompleta pero finalizada por algún motivo |
| `3` | No finalizado, esquema incompleto pero aún bajo tratamiento |
| `98` | No aplica (V86 = `98`) |

**Dependencias:**
- Si V95 = `2` → diligenciar V96 con motivo de finalización prematura
- Si V95 = `3` → V94 = `1800-01-01`

**Severidad:**
- **Error** si: código no está en el catálogo, `98` cuando V86 = `1`
- **Advertencia** si: `2` sin motivo en V96

---

### V96 — Motivo de finalización prematura del primer o único esquema de radioterapia

**Módulo:** Radioterapia
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico
**Aplica:** Solo cuando V95 = `2`

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Toxicidad |
| `2` | Otros motivos médicos |
| `3` | Muerte |
| `4` | Cambio de EPS |
| `5` | Decisión del usuario: abandonó la terapia |
| `6` | Otros motivos administrativos |
| `7` | Otras causas no contempladas |
| `98` | No aplica |

**Reglas de validación:**
1. Seleccionar **un solo código**: el que corresponde a lo que ocurrió primero
2. Si V95 ≠ `2` → V96 = `98`

**Severidad:**
- **Error** si: campo vacío cuando V95 = `2`, código no está en el catálogo

---

### V97 — Fecha de inicio del último esquema de radioterapia del periodo

**Módulo:** Radioterapia
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `1845-01-01` | No aplica |

**Regla de fecha parcial:**
- Si solo conoce año y mes → día 15

**Reglas de validación:**
1. V97 > V88 (el último esquema debe iniciar después del primero)
2. Solo diligenciar si el paciente recibió más de un esquema de radioterapia en el periodo

**Severidad:**
- **Error** si: formato incorrecto, V97 ≤ V88 cuando hay dos esquemas, fecha futura

---

### V98 — Ubicación temporal del último esquema de radioterapia

**Módulo:** Radioterapia
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:** Igual que V89.

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `98` | No aplica |

**Severidad:** Igual que V89.

---

### V99 — Tipo de radioterapia aplicada en el último esquema

**Módulo:** Radioterapia
**Tipo de dato:** Código alfanumérico
**Formato:** Código CUPS (archivo operativo CAC)

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `98` | No aplica |

**Severidad:** Igual que V90.

---

### V100 — Número de IPS que suministran el último esquema de radioterapia

**Módulo:** Radioterapia
**Tipo de dato:** Numérico

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `98` | No aplica |

**Severidad:** Igual que V91.

---

### V101 — Código de la IPS1 que suministra el último esquema de radioterapia

**Módulo:** Radioterapia
**Tipo de dato:** Código alfanumérico
**Formato:** 12 dígitos incluyendo cero inicial
**Catálogo de referencia:** REPS

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `98` | No aplica |

**Severidad:** Igual que V92.

---

### V102 — Código de la IPS2 que suministra el último esquema de radioterapia

**Módulo:** Radioterapia
**Tipo de dato:** Código alfanumérico
**Formato:** 12 dígitos incluyendo cero inicial
**Catálogo de referencia:** REPS

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `98` | No aplica |

**Reglas de validación:** Solo diligenciar si V100 ≥ `2`.

**Severidad:** Igual que V93.

---

### V103 — Fecha de finalización del último esquema de radioterapia

**Módulo:** Radioterapia
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `1800-01-01` | Esquema que aún no finaliza |
| `1845-01-01` | No aplica |

**Dependencias:**
- V103 ≥ V97
- Si V104 = `3` → V103 = `1800-01-01`

**Severidad:** Igual que V94.

---

### V104 — Características actuales del último esquema de radioterapia

**Módulo:** Radioterapia
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:** Igual que V95.

**Dependencias:**
- Si V104 = `2` → diligenciar V105
- Si V104 = `3` → V103 = `1800-01-01`

**Severidad:** Igual que V95.

---

### V105 — Motivo de finalización prematura del último esquema de radioterapia

**Módulo:** Radioterapia
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico
**Aplica:** Solo cuando V104 = `2`

**Catálogo de referencia:** Igual que V96.

**Reglas de validación:** Mismas que V96 aplicadas al último esquema de radioterapia.

**Severidad:** Igual que V96.

---

# MÓDULO 6 — TRASPLANTE DE CÉLULAS PROGENITORAS HEMATOPOYÉTICAS (V106–V110)

---

### V106 — ¿Recibió el usuario trasplante de células progenitoras hematopoyéticas en el periodo?

**Módulo:** Trasplante
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Sí recibió |
| `98` | No aplica |

**Reglas de validación:**
1. No aplica trasplante propuesto pero no realizado (se eliminó la opción `2`)
2. No aplican trasplantes de órganos sólidos u otros no relacionados con progenitores hematopoyéticos
3. Si V106 = `98` → V107 a V110 = `98` o `1845-01-01` según cada variable

**Dependencias:**
- Es la variable de control del bloque V107–V110

**Soporte documental:** Sí — historia clínica con protocolo de trasplante

**Severidad:**
- **Error** si: código no está en el catálogo, campo vacío

---

### V107 — Tipo de trasplante recibido

**Módulo:** Trasplante
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Autólogo |
| `2` | Alogénico de donante idéntico relacionado |
| `3` | Alogénico de donante no idéntico relacionado |
| `4` | Alogénico de donante idéntico no relacionado |
| `5` | Alogénico de donante no idéntico no relacionado |
| `6` | Alogénico de cordón umbilical idéntico familiar |
| `7` | Alogénico de cordón umbilical idéntico no familiar |
| `8` | Alogénico de cordón no idéntico no familiar |
| `9` | Alogénico de dos unidades de cordón |
| `98` | No aplica (V106 = `98`) |

**Dependencias:**
- Si V106 = `98` → V107 = `98`

**Soporte documental:** Sí — protocolo de trasplante

**Severidad:**
- **Error** si: código no está en el catálogo, `98` cuando V106 = `1`

---

### V108 — Ubicación temporal del trasplante en relación al manejo oncológico

**Módulo:** Trasplante
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `95` | Recaída: paciente con criterios de remisión al que nuevamente se demuestra enfermedad activa |
| `96` | Refractariedad: paciente sin criterios de remisión a pesar del manejo |
| `97` | Esquema de consolidación |
| `98` | No aplica (V106 = `98`) |

**Dependencias:**
- Si V106 = `98` → V108 = `98`

**Soporte documental:** Sí — historia clínica

**Severidad:**
- **Error** si: código no está en el catálogo, `98` cuando V106 = `1`

---

### V109 — Fecha del trasplante

**Módulo:** Trasplante
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `1845-01-01` | No aplica (V106 = `98`) |

**Regla de fecha parcial:**
- Si solo conoce año y mes → día 15

**Dependencias:**
- V109 debe estar dentro del periodo de reporte (2024-01-02 a 2025-01-01)

**Soporte documental:** Sí — nota del procedimiento de trasplante

**Severidad:**
- **Error** si: formato incorrecto, fecha fuera del periodo de reporte, `1845-01-01` cuando V106 = `1`

---

### V110 — Código de la IPS que realizó el trasplante

**Módulo:** Trasplante
**Tipo de dato:** Código alfanumérico
**Formato:** 12 dígitos incluyendo cero inicial
**Catálogo de referencia:** REPS

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `96` | Trasplante realizado fuera del país |
| `98` | No aplica (V106 = `98`) |

**Soporte documental:** Sí — REPS vigente, nota del procedimiento

**Severidad:**
- **Error** si: código no existe en REPS, IPS sin habilitación para trasplante hematopoyético

---

# MÓDULO 7 — TRATAMIENTO COMPLEMENTARIO (V111–V124)

---

### V111 — ¿Recibió el usuario cirugía reconstructiva en el periodo?

**Módulo:** Tratamiento complementario
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Sí recibió cirugía reconstructiva |
| `98` | No aplica: no recibió este tipo de cirugía |

**Reglas de validación:**
1. Si la cirugía curativa y reconstructiva se realizaron en el **mismo tiempo quirúrgico** → NO reportar en V111-V113; solo registrar en V76 o V80 según corresponda
2. No aplica cirugía reconstructiva propuesta pero no realizada (se eliminó la opción `2`)
3. Si V111 = `98` → V112 = `1845-01-01` y V113 = `98`

**Dependencias:**
- Es la variable de control de V112–V113

**Soporte documental:** Sí — nota quirúrgica de cirugía reconstructiva

**Severidad:**
- **Error** si: código no está en el catálogo, cirugía reconstructiva en mismo tiempo quirúrgico que curativa reportada aquí

---

### V112 — Fecha de la cirugía reconstructiva

**Módulo:** Tratamiento complementario
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `1845-01-01` | No aplica (V111 = `98`) |

**Regla de fecha parcial:**
- Si solo conoce año y mes → día 15

**Soporte documental:** Sí — nota quirúrgica

**Severidad:**
- **Error** si: formato incorrecto, fecha fuera del periodo de reporte, `1845-01-01` cuando V111 = `1`

---

### V113 — Código de la IPS que realizó la cirugía reconstructiva

**Módulo:** Tratamiento complementario
**Tipo de dato:** Código alfanumérico
**Formato:** 12 dígitos incluyendo cero inicial
**Catálogo de referencia:** REPS

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `98` | No aplica (V111 = `98`) |

**Soporte documental:** Sí — REPS vigente

**Severidad:**
- **Error** si: código no existe en REPS

---

### V114 — ¿Fue valorado el usuario en cuidado paliativo en el periodo?

**Módulo:** Tratamiento complementario
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Sí fue valorado |
| `2` | No recibió |

**Reglas de validación:**
1. La atención paliativa aplica para **todo tipo de cáncer y en cualquier estadio**, no exclusivamente en estadios avanzados
2. No aplican consultas o procedimientos propuestos pero no realizados (se eliminó la opción `3`)

**Dependencias:**
- Es la variable de control de V114.1 a V114.6 y V115-V116

**Soporte documental:** Sí — historia clínica con registro de consulta paliativa

**Severidad:**
- **Error** si: código no está en el catálogo, campo vacío

---

### V114.1 a V114.6 — Tipo de profesional de cuidado paliativo

**Módulo:** Tratamiento complementario
**Tipo de dato:** Catálogo cerrado (1 = Sí, 2 = No)
**Aplica:** Para todos los usuarios

**Subfases:**

| Variable | Profesional |
|---|---|
| V114.1 | Médico especialista en cuidado paliativo |
| V114.2 | Profesional de la salud no médico (incluye psicólogo) especialista en cuidado paliativo |
| V114.3 | Médico especialista de otra especialidad |
| V114.4 | Médico general |
| V114.5 | Trabajo social |
| V114.6 | Otro profesional de salud no médico (incluye psicólogo) no especializado |

**Reglas de validación:**
1. Se eliminó la opción `3` (propuesto pero no realizado) — solo son válidos `1` (Sí) y `2` (No)
2. Reportar la consulta con el profesional que tenga la **especialidad de cuidados paliativos** cuando aplique

**Soporte documental:** Sí — historia clínica con nota de valoración paliativa

**Severidad:**
- **Error** si: código diferente a `1` o `2`, uso del código `3` eliminado

---

### V115 — Fecha de primera consulta o procedimiento de cuidado paliativo en el periodo

**Módulo:** Tratamiento complementario
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `1845-01-01` | No aplica (V114 = `2`) |

**Regla de fecha parcial:**
- Si solo conoce año y mes → día 15

**Dependencias:**
- Si V114 = `2` → V115 = `1845-01-01`

**Soporte documental:** Sí — historia clínica

**Severidad:**
- **Error** si: formato incorrecto, `1845-01-01` cuando V114 = `1`

---

### V116 — Código de la IPS donde recibe atención de cuidado paliativo en el periodo

**Módulo:** Tratamiento complementario
**Tipo de dato:** Código alfanumérico
**Formato:** 12 dígitos incluyendo cero inicial
**Catálogo de referencia:** REPS

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `98` | No aplica (V114 = `2`) |

**Soporte documental:** Sí — REPS vigente

**Severidad:**
- **Error** si: código no existe en REPS, `98` cuando V114 = `1`

---

### V117 — ¿Ha sido valorado el usuario por psiquiatría en el periodo?

**Módulo:** Tratamiento complementario
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Sí fue valorado |
| `2` | No, se ordenó pero está pendiente |
| `98` | No aplica: no se ha ordenado valoración por psiquiatría |

**Dependencias:**
- Si V117 = `98` → V118 = `1845-01-01` y V119 = `98`

**Soporte documental:** Sí — orden médica y/o nota de valoración psiquiátrica

**Severidad:**
- **Error** si: código no está en el catálogo, campo vacío

---

### V118 — Fecha de primera consulta con psiquiatría en el periodo

**Módulo:** Tratamiento complementario
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `1845-01-01` | No aplica (V117 = `98` o `2`) |

**Regla de fecha parcial:**
- Si solo conoce año y mes → día 15

**Dependencias:**
- Si V117 ≠ `1` → V118 = `1845-01-01`

**Severidad:**
- **Error** si: formato incorrecto, `1845-01-01` cuando V117 = `1`

---

### V119 — Código de la IPS donde recibió la primera valoración de psiquiatría

**Módulo:** Tratamiento complementario
**Tipo de dato:** Código alfanumérico
**Formato:** 12 dígitos incluyendo cero inicial
**Catálogo de referencia:** REPS

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `98` | No aplica (V117 ≠ `1`) |

**Soporte documental:** Sí — REPS vigente

**Severidad:**
- **Error** si: código no existe en REPS, `98` cuando V117 = `1`

---

### V120 — ¿Fue valorado el usuario por nutrición en el periodo?

**Módulo:** Tratamiento complementario
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Sí fue valorado |
| `2` | No, se ordenó pero está pendiente |
| `98` | No aplica: no se ha ordenado valoración por nutrición |

**Dependencias:**
- Si V120 = `98` → V121 = `1845-01-01` y V122 = `98`

**Soporte documental:** Sí — orden médica y/o nota de valoración por nutricionista

**Severidad:**
- **Error** si: código no está en el catálogo, campo vacío

---

### V121 — Fecha de consulta inicial con nutrición en el periodo

**Módulo:** Tratamiento complementario
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `1845-01-01` | No aplica (V120 ≠ `1`) |

**Regla de fecha parcial:**
- Si solo conoce año y mes → día 15

**Dependencias:**
- Si V120 ≠ `1` → V121 = `1845-01-01`

**Severidad:**
- **Error** si: formato incorrecto, `1845-01-01` cuando V120 = `1`

---

### V122 — Código de la IPS donde recibió la valoración por nutrición

**Módulo:** Tratamiento complementario
**Tipo de dato:** Código alfanumérico
**Formato:** 12 dígitos incluyendo cero inicial
**Catálogo de referencia:** REPS

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `98` | No aplica (V120 ≠ `1`) |

**Soporte documental:** Sí — REPS vigente

**Severidad:**
- **Error** si: código no existe en REPS, `98` cuando V120 = `1`

---

### V123 — ¿El usuario recibió soporte nutricional?

**Módulo:** Tratamiento complementario
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Sí recibió soporte nutricional enteral |
| `2` | Sí recibió soporte nutricional parenteral |
| `3` | Sí recibió soporte enteral y parenteral (opciones 1 y 2) |
| `4` | No recibió soporte nutricional |

**Notas técnicas:**
- Nutrición **enteral:** administrada mediante sonda directamente al sistema gastrointestinal
- Nutrición **parenteral:** administrada por vía venosa
- **NO es válido** el reporte de fórmulas nutricionales de administración oral

**Soporte documental:** Sí — orden médica y registros de administración

**Severidad:**
- **Error** si: código no está en el catálogo, reporte de fórmulas orales como soporte nutricional

---

### V124 — ¿El usuario ha recibido terapias de rehabilitación?

**Módulo:** Tratamiento complementario
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Sí, terapia física |
| `2` | Sí, terapia de lenguaje |
| `3` | Sí, terapia ocupacional |
| `5` | Opciones 1 y 2 |
| `6` | Opciones 1 y 3 |
| `7` | Opciones 2 y 3 |
| `8` | Opciones 1, 2 y 3 |
| `98` | No aplica: no se han ordenado terapias |

**Soporte documental:** Sí — órdenes médicas y registros de asistencia a terapias

**Severidad:**
- **Error** si: código no está en el catálogo, campo vacío

---

# MÓDULO 8 — SITUACIÓN ACTUAL Y RESULTADO (V125–V134)

---

### V125 — Tipo de tratamiento que está recibiendo el usuario a la fecha de corte (2025-01-01)

**Módulo:** Situación actual
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Radioterapia |
| `2` | Terapia sistémica (quimioterapia, anticuerpos monoclonales, terapia biológica, terapia hormonal) |
| `3` | Cirugía (solo reportar si el procedimiento se realizó a partir del 2024-11-01) |
| `4` | Opciones 1 y 2 |
| `5` | Opciones 1 y 3 |
| `6` | Opciones 2 y 3 |
| `7` | Manejo expectante pretratamiento |
| `8` | En seguimiento luego de tratamiento durante el periodo |
| `9` | Antecedente de cáncer (sin tratamiento activo, pero con al menos una consulta de seguimiento relacionada con el cáncer en el periodo) |
| `10` | Opciones 1, 2 y 3 |
| `11` | Manejo de cuidado paliativo o terapia complementaria |
| `98` | No aplica: paciente fallecido, abandonó el tratamiento, alta voluntaria o desafiliado |

**Reglas de validación:**
1. No aplican terapias propuestas pero no realizadas (se eliminó la opción `4` anterior)
2. El código `3` (cirugía) solo aplica si el procedimiento se realizó **a partir del 2024-11-01**

**Soporte documental:** Sí — historia clínica a la fecha de corte

**Severidad:**
- **Error** si: código no está en el catálogo, campo vacío, cirugía anterior a 2024-11-01 reportada con código `3`

---

### V126 — Resultado final del manejo oncológico en el periodo

**Módulo:** Resultado final
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Pseudoprogresión (aplica solo para inmunoterapia) |
| `2` | Progresión o recaída |
| `3` | Respuesta parcial |
| `4` | Respuesta completa |
| `5` | Enfermedad estable |
| `6` | Abandono del tratamiento o alta voluntaria |
| `7` | Paciente en seguimiento por antecedente de cáncer |
| `8` | Pendiente iniciar tratamiento luego del diagnóstico |
| `97` | No aplicable: aún bajo tratamiento inicial |
| `98` | No aplicable: aún bajo tratamiento de recaída |
| `99` | No aplica: paciente fallecido o desafiliado |

**Definiciones clínicas:**
- **Pseudoprogresión:** aumento o aparición de lesiones por infiltración de células inflamatorias con posterior disminución; traduce respuesta al tratamiento. Solo aplica para inmunoterapia
- **Progresión o recaída:** crecimiento detectado en el tumor ≥ 25%
- **Respuesta parcial:** disminución del tamaño del tumor medible ≥ 30%
- **Respuesta completa:** desaparición de toda evidencia clínica de la enfermedad (no siempre equivale a curación)
- **Enfermedad estable:** tumor aumentó < 25% y disminuyó < 30%; no cumple criterios de respuesta parcial ni progresión
- **Seguimiento por antecedente (código 7):** debe haber al menos una atención en el periodo directamente relacionada con la gestión y seguimiento del cáncer

**Reglas de validación:**
1. El código `1` (pseudoprogresión) es **exclusivo para inmunoterapia**
2. Si V127 = `2` (fallecido) → V126 debe ser `99`

**Soporte documental:** Sí — historia clínica con evaluación oncológica del periodo

**Severidad:**
- **Error** si: código no está en el catálogo, `1` usado fuera de inmunoterapia, incoherencia con V127
- **Advertencia** si: `7` sin atención de seguimiento documentada en el periodo

---

### V127 — Estado vital al finalizar el periodo de reporte

**Módulo:** Resultado final
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Vivo |
| `2` | Fallecido |
| `99` | Desconocido |

**Dependencias:**
- Si V127 = `2` → V126 = `99`, V128 = `4` o `10`, V131 debe tener fecha de muerte, V132 debe tener causa de muerte
- Si V127 = `1` → V131 = `1845-01-01`
- Coherencia con V85 (estado vital post-cirugía): si V85 = `2` → V127 = `2`

**Soporte documental:** Sí — historia clínica, registro de defunción si aplica

**Severidad:**
- **Error** si: código no está en el catálogo, incoherencia con V85, V131 o V132

---

### V128 — Novedad administrativa del usuario respecto al reporte anterior

**Módulo:** Resultado final
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `0` | Sin novedad: vivo y afiliado a la entidad |
| `1` | Usuario ingresó a la EAPB en el periodo ya con diagnóstico de cáncer |
| `2` | Nuevo diagnóstico de cáncer entre 2024-01-02 y 2025-01-01 |
| `3` | Diagnóstico antiguo no incluido en reporte anterior |
| `4` | Usuario fallecido |
| `5` | Usuario desafiliado |
| `6` | Eliminar de la base de datos (corrección post-auditoría interna o de CAC) — prima sobre todas las demás |
| `7` | Usuario firmó alta voluntaria del tratamiento |
| `8` | Cambio de tipo o número de ID |
| `9` | Usuario abandonó el tratamiento y es imposible de ubicar |
| `10` | No incluido en reporte anterior y fallecido al momento del reporte |
| `11` | Trasladado de IPS |
| `12` | Notificado con dos o más cánceres en este periodo — prima sobre demás en vivo con diagnóstico confirmado |
| `13` | No incluido en reporte anterior y desafiliado al momento del reporte |
| `15` | Comunidad migrante de la República de Venezuela |
| `16` | Cambio de CIE-10: cánceres secundarios o no especificados donde se define el primario o se especifica el tipo |
| `17` | Identificado por cruce con fuentes externas, con diagnóstico no gestionado por la EAPB |
| `18` | Identificado por cruce con fuentes externas, con diagnóstico descartado o fallecido/desafiliado sin diagnóstico confirmado |
| `19` | Paciente trasladado glosado en periodo anterior, no gestionado por la entidad en el periodo actual |

**Reglas de jerarquía de novedades:**
1. La novedad `6` (eliminados) **prima sobre todas las demás**, incluso sobre fallecidos y desafiliados
2. En pacientes con diagnóstico confirmado, si el estado vital es fallecido, esta novedad prima sobre las demás
3. La novedad `12` prima sobre las demás en pacientes vivos con diagnóstico confirmado
4. Las novedades `17` y `18` priman sobre las demás para usuarios requeridos por fuentes externas

**Reglas especiales para cambio de ID (novedad 8):**
- Reportar el registro **dos veces**: primero con la identificación actualizada y la novedad correspondiente al periodo; segundo con la identificación anterior y novedad `8`, para evitar omitidos. La CAC inactivará el registro con novedad `8`

**Reglas especiales para cambio de CIE-10 (novedad 16):**
- Reportar una línea con novedad `16` y el CIE-10 antiguo, y otra línea con el CIE-10 actualizado y la novedad correspondiente al periodo

**Novedades exclusivas para requeridos por fuentes externas (17 y 18):**
- `17`: usuario activo con diagnóstico de cáncer no gestionado; no se auditará en 2025 pero será requerido en el siguiente periodo
- `18`: diagnóstico descartado por auditoría interna o usuario fallecido/desafiliado sin diagnóstico confirmado; debe disponer soportes de descarte
- Si usuario requerido por fuente externa está fallecido y sin soportes suficientes → usar `18`
- Si usuario requerido tiene diagnóstico confirmado y gestión en el periodo → usar la novedad que corresponda según estado vital/afiliación; se auditará como caso nuevo

**Dependencias:**
- V128 = `4` si V127 = `2`
- V128 = `2` para casos incidentes (nuevos diagnósticos en el periodo)
- Relacionada con V129 (novedad clínica)

**Soporte documental:** Sí — según el tipo de novedad

**Severidad:**
- **Error** si: código no está en el catálogo, novedad inconsistente con V127 o V129, uso de novedad `17`/`18` en pacientes con diagnóstico confirmado y gestión completa

---

### V129 — Novedad clínica del usuario a la fecha de corte

**Módulo:** Resultado final
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Usuario en manejo inicial curativo |
| `3` | Usuario que finalizó tratamiento inicial y está en seguimiento |
| `8` | Abandono de tratamiento |
| `9` | Usuario firmó alta voluntaria |
| `10` | Usuario en manejo expectante antes de tratamiento |
| `11` | Usuario en manejo paliativo (incluye manejo de metástasis o recaída) |
| `12` | Usuario fallecido o desafiliado |

**Reglas de validación:**
1. El código `11` recopila todos los pacientes de cualquier tipo de cáncer que reciben terapia con **intención paliativa** a la fecha de corte, incluyendo metástasis o recaída
2. Si V127 = `2` → V129 = `12`

**Dependencias:**
- Coherencia con V127 (estado vital) y V128 (novedad administrativa)

**Soporte documental:** Sí — historia clínica a la fecha de corte

**Severidad:**
- **Error** si: código no está en el catálogo, incoherencia con V127 o V128
- **Advertencia** si: `1` en paciente con estadio avanzado sin justificación en historia clínica

---

### V130 — Fecha de desafiliación de la EAPB

**Módulo:** Resultado final
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `1845-01-01` | No aplica: el usuario no se desafilió |

**Reglas de validación:**
1. Si el paciente está **fallecido y desafiliado** → prima la novedad de fallecimiento; registrar la fecha de muerte en V131 y usar `1845-01-01` en V130
2. Si V128 = `5` o `13` → V130 debe contener la fecha de desafiliación

**Dependencias:**
- Si V128 ≠ `5` ni `13` → V130 = `1845-01-01`

**Soporte documental:** Sí — certificado de desafiliación BDUA

**Severidad:**
- **Error** si: formato incorrecto, fecha futura, V130 con fecha cuando V128 no indica desafiliación

---

### V131 — Fecha de muerte

**Módulo:** Resultado final
**Tipo de dato:** Fecha
**Formato:** `AAAA-MM-DD`
**Longitud:** 10 caracteres

**Comodines permitidos:**

| Comodín | Cuándo aplica |
|---|---|
| `1845-01-01` | No aplica: el usuario no falleció o su estado vital no se conoce |

**Reglas de validación:**
1. Si el paciente está fallecido y desafiliado → registrar solo la fecha de muerte aquí; V130 = `1845-01-01`
2. Si BDUA reporta estado vital fallecido pero la entidad verifica que está vivo → disponer soportes de atenciones y afiliación vigente para el proceso de auditoría
3. Si V127 = `2` → V131 debe tener fecha válida (distinta de `1845-01-01`)

**Dependencias:**
- Si V127 = `1` o `99` → V131 = `1845-01-01`
- Si V128 = `4` o `10` → V131 debe contener fecha de muerte

**Soporte documental:** Sí — registro de defunción o fuente oficial

**Severidad:**
- **Error** si: formato incorrecto, V131 con fecha cuando V127 = `1`, `1845-01-01` cuando V127 = `2`

---

### V132 — Causa de muerte

**Módulo:** Resultado final
**Tipo de dato:** Catálogo cerrado
**Formato:** Código numérico

**Catálogo de referencia:**

| Código | Descripción |
|---|---|
| `1` | Muerte asociada al cáncer |
| `2` | Muerte por patología clínica no relacionada al cáncer |
| `3` | Muerte por causa externa |
| `4` | Muerte por causa no conocida |
| `98` | No aplica: usuario vivo o se desconoce su estado vital |

**Dependencias:**
- Si V127 = `1` o `99` → V132 = `98`
- Si V127 = `2` → V132 debe tener un código de `1` a `4`

**Soporte documental:** Sí — registro de defunción, historia clínica

**Severidad:**
- **Error** si: código no está en el catálogo, `98` cuando V127 = `2`, código `1`-`4` cuando V127 = `1`

---

### V133 — Código único de identificación BDUA-BDEX-PVS

**Módulo:** Identificación complementaria
**Tipo de dato:** Código alfanumérico
**Formato:** Código serial asignado por el Ministerio de Salud y Protección Social
**Fuente:** BDUA / BDEX / PVS — MinSalud

**Reglas de validación:**
1. Registrar el código único serial asignado al paciente por el Ministerio de Salud
2. Debe corresponder al paciente identificado en V5-V6

**Soporte documental:** Sí — BDUA

**Severidad:**
- **Error** si: campo vacío, código no corresponde al paciente de V5-V6

---

### V134 — Fecha de corte

**Módulo:** Control del reporte
**Tipo de dato:** Fecha fija
**Formato:** `AAAA-MM-DD`
**Valor fijo:** `2025-01-01`

**Reglas de validación:**
1. Esta variable siempre debe contener el valor `2025-01-01`
2. No se acepta ningún otro valor

**Severidad:**
- **Error** si: cualquier valor diferente a `2025-01-01`


## Resumen de progreso

| Variable | Estado | Notas |
|---|---|---|
| V1 | ✅ Documentada | Primer nombre |
| V2 | ✅ Documentada | Segundo nombre, comodín NONE |
| V3 | ✅ Documentada | Primer apellido |
| V4 | ✅ Documentada | Segundo apellido, comodín NOAP |
| V5 | ✅ Documentada | Tipo ID, 14 códigos |
| V6 | ✅ Documentada | Número ID |
| V7 | ✅ Documentada | Fecha nacimiento |
| V8 | ✅ Documentada | Sexo (M/F) |
| V9 | ✅ Documentada | Ocupación CIUO |
| V10 | ✅ Documentada | Régimen (6 códigos) |
| V11 | ✅ Documentada | EAPB o entidad territorial |
| V12 | ✅ Documentada | Pertenencia étnica (6 códigos) |
| V13 | ✅ Documentada | Grupo poblacional (32 códigos en 4 rangos) |
| V14 | ✅ Documentada | Municipio DIVIPOLA |
| V15 | 🔄 Próxima | Pendiente |
| V16 | ⏳ Pendiente | |
| V17 | ✅ Documentada | CIE-10 con 14 excepciones |
| V18 | ✅ Documentada | Fecha diagnóstico |
| V19 | ✅ Documentada | Fecha remisión |
| V20 | ⏳ Pendiente | |
| V21-V134 | ⏳ Pendiente | |

---

## Catálogos externos identificados hasta ahora

| Catálogo | Variables que lo usan | Fuente |
|---|---|---|
| BDUA | V1, V2, V3, V4, V7 | ADRES |
| Tipo de identificación | V5 | Catálogo oficial CAC |
| CIUO | V9 | OIT — Organización Internacional del Trabajo |
| Régimen SGSSS | V10 | Resolución 4622/2016 |
| EAPB | V11 | MinSalud |
| Pertenencia étnica | V12 | DANE |
| Grupo poblacional | V13 | MinSalud |
| DIVIPOLA | V14 | DANE |
| CIE-10 archivo operativo | V17 | SISCAC |

---

**Próximo paso:** continuar documentando desde V15 en orden secuencial.