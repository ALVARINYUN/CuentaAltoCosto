# Matriz Maestra de Variables CAC

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

### V15 — [PENDIENTE]

**Próxima variable a documentar.**

---

### V16 — [PENDIENTE]

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

### V20 — [PENDIENTE]

---

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