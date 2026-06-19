(function () {
  'use strict';

  const NOMBRES_VARIABLES = {
    V1: 'Primer nombre', V2: 'Segundo nombre', V3: 'Primer apellido', V4: 'Segundo apellido', V5: 'Tipo de identificación', V6: 'Número de identificación', V7: 'Fecha de nacimiento', V8: 'Sexo', V9: 'Ocupación', V10: 'Régimen de afiliación', V11: 'Código de la EPS', V12: 'Pertenencia étnica', V13: 'Grupo poblacional', V14: 'Municipio de residencia', V15: 'Número telefónico', V16: 'Fecha de afiliación',
    V17: 'Código CIE-10 de la neoplasia maligna reportada', V18: 'Fecha de diagnóstico del cáncer reportado', V19: 'Fecha de remisión o interconsulta', V20: 'Fecha de ingreso a la institución diagnóstica', V21: 'Tipo de estudio con el que se realizó el diagnóstico', V22: 'Motivo por el cual no tuvo diagnóstico por histopatología', V23: 'Fecha de recolección de muestra para estudio histopatológico', V24: 'Fecha del primer o único informe histopatológico válido', V25: 'Código válido de habilitación de la IPS donde se realiza la confirmación diagnóstica', V26: 'Fecha de primera consulta con médico tratante de la enfermedad maligna', V27: 'Histología del tumor en muestra de biopsia o quirúrgica', V28: 'Grado de diferenciación del tumor sólido maligno',
    V29: 'Primera estadificación clínica o patológica', V30: 'Fecha de estadificación clínica', V31: 'Fecha de estadificación TNM clínica', V32: 'Fecha de estadificación TNM patológica', V33: 'Fecha de estadificación agrupada', V34: 'Estadificación Dukes para cáncer colorrectal', V35: 'Fecha de estadificación Dukes', V36: 'Estadificación Ann Arbor/Lugano', V37: 'Clasificación de Gleason', V38: 'Clasificación del riesgo', V39: 'Fecha de clasificación del riesgo', V40: 'Variable 40', V41: 'Intervención médica documentada', V42: 'Variable 42', V43: 'Variable 43', V44: 'Variable 44',
    V45: 'Recibió quimioterapia u otra terapia sistémica', V46: 'Número de fases de quimioterapia', V46_1: 'Fase de quimioterapia 1', V46_2: 'Fase de quimioterapia 2', V46_3: 'Fase de quimioterapia 3', V46_4: 'Fase de quimioterapia 4', V46_5: 'Fase de quimioterapia 5', V46_6: 'Fase de quimioterapia 6', V46_7: 'Fase de quimioterapia 7', V46_8: 'Fase de quimioterapia 8', V47: 'Número de ciclos recibidos',
    V48: 'Ubicación temporal del primer o único esquema', V49: 'Fecha de inicio del primer o único esquema', V50: 'Número de IPS que suministran el primer o único esquema', V51: 'Código de la IPS1 que suministra el primer o único esquema', V52: 'Código de la IPS2 que suministra el primer o único esquema',
    V53: 'Cantidad de medicamentos administrados', V53_1: 'Primer medicamento antineoplásico administrado', V53_2: 'Segundo medicamento antineoplásico administrado', V53_3: 'Tercer medicamento antineoplásico administrado', V53_4: 'Cuarto medicamento antineoplásico administrado', V53_5: 'Quinto medicamento antineoplásico administrado', V53_6: 'Sexto medicamento antineoplásico administrado', V53_7: 'Séptimo medicamento antineoplásico administrado', V53_8: 'Octavo medicamento antineoplásico administrado', V53_9: 'Noveno medicamento antineoplásico administrado',
    V54: 'Medicamento antineoplásico adicional 1', V55: 'Medicamento antineoplásico adicional 2', V56: 'Medicamento antineoplásico adicional 3', V57: 'Recibió quimioterapia intratecal en el primer o único esquema', V58: 'Fecha de finalización del primer o único esquema', V59: 'Características actuales del primer o único esquema', V60: 'Motivo de finalización prematura del primer o único esquema',
    V61: 'Ubicación temporal del último esquema de terapia sistémica del periodo', V62: 'Fecha de inicio del último esquema de quimioterapia o terapia sistémica', V63: 'Número de IPS que suministran el último esquema', V64: 'Código de la IPS1 que suministra el último esquema', V65: 'Código de la IPS2 que suministra el último esquema',
    V66: 'Número de medicamentos propuestos en el último esquema', V66_1: 'Medicamento antineoplásico administrado 1 en el último esquema', V66_2: 'Medicamento antineoplásico administrado 2 en el último esquema', V66_3: 'Medicamento antineoplásico administrado 3 en el último esquema', V66_4: 'Medicamento antineoplásico administrado 4 en el último esquema', V66_5: 'Medicamento antineoplásico administrado 5 en el último esquema', V66_6: 'Medicamento antineoplásico administrado 6 en el último esquema', V66_7: 'Medicamento antineoplásico administrado 7 en el último esquema', V66_8: 'Medicamento antineoplásico administrado 8 en el último esquema', V66_9: 'Medicamento antineoplásico administrado 9 en el último esquema',
    V67: 'Medicamento antineoplásico o terapia hormonal adicional 1 en el último esquema',
    V68: 'Medicamento antineoplásico o terapia hormonal adicional 2 en el último esquema',
    V69: 'Medicamento antineoplásico o terapia hormonal adicional 3 en el último esquema',
    V70: 'Quimioterapia intratecal en el último esquema',
    V71: 'Fecha de finalización del último esquema de quimioterapia o terapia sistémica',
    V72: 'Características actuales del último esquema de este periodo',
    V73: 'Motivo de la finalización prematura del último esquema',
    V74: 'Cirugías curativas o paliativas durante el periodo',
    V75: 'Número de cirugías durante el periodo de reporte actual',
    V76: 'Fecha de realización de la primera cirugía en el periodo',
    V77: 'Código de la IPS que realizó la primera cirugía',
    V78: 'Código CUPS de primera cirugía',
    V79: 'Ubicación temporal de primera cirugía',
    V80: 'Fecha de última cirugía o reintervención',
    V81: 'Motivo de haber realizado la última cirugía de este periodo de reporte',
    V82: 'Código de la IPS que realiza la última cirugía en este periodo de reporte',
    V83: 'Código de última cirugía en este periodo de reporte',
    V84: 'Ubicación temporal de esta última cirugía en relación al manejo oncológico',
    V85: 'Estado vital al finalizar la única o última cirugía',
    V86: 'Recibió algún tipo de radioterapia en el periodo actual',
    V87: 'Número de sesiones de radioterapia recibidas en el periodo',
    V88: 'Fecha de inicio del primer o único esquema de radioterapia',
    V89: 'Ubicación temporal del primer o único esquema de radioterapia',
    V90: 'Tipo de radioterapia aplicada en el primer o único esquema',
    V91: 'Número de IPS que suministran el primer o único esquema de radioterapia',
    V92: 'Código de la IPS1 que suministra el primer o único esquema de radioterapia',
    V93: 'Código de la IPS2 que suministra el primer o único esquema de radioterapia',
    V94: 'Fecha de finalización del primer o único esquema de radioterapia',
    V95: 'Características actuales del primer o único esquema de radioterapia',
    V96: 'Motivo de finalización del primer o único esquema de radioterapia',
    V97: 'Fecha de inicio del último esquema de radioterapia',
    V98: 'Ubicación temporal/intención del último esquema de radioterapia',
    V99: 'Tipo de radioterapia aplicada en el último esquema',
    V100: 'Número de IPS que suministran el último esquema de radioterapia',
    V101: 'Código de la IPS1 que suministra el último esquema de radioterapia',
    V102: 'Código de la IPS2 que suministra el último esquema de radioterapia',
    V103: 'Fecha de finalización del último esquema de radioterapia',
    V104: 'Características actuales del último esquema de radioterapia',
    V105: 'Motivo de finalización del último esquema de radioterapia',
    V106: 'Recibió trasplante de células progenitoras hematopoyéticas',
    V107: 'Tipo de trasplante recibido',
    V108: 'Ubicación temporal de este trasplante en relación al manejo oncológico',
    V109: 'Fecha del trasplante',
    V110: 'Código de la IPS que realizó este trasplante',
    V111: 'Recibió cirugía reconstructiva en el periodo de reporte actual',
    V112: 'Fecha de la cirugía reconstructiva',
    V113: 'Código de la IPS que realizó cirugía reconstructiva',
    V114: 'Valoración en consulta o procedimiento de cuidado paliativo',
    V114_1: 'V114.1. Consulta o procedimiento de cuidado paliativo por médico especialista',
    V114_2: 'V114.2. Consulta o procedimiento de cuidado paliativo por profesional de la salud no médico',
    V114_3: 'V114.3. Consulta o procedimiento de cuidado paliativo por médico especialista, otra especialidad',
    V114_4: 'V114.4. Consulta o procedimiento de cuidado paliativo por médico general',
    V114_5: 'V114.5. Consulta o procedimiento de cuidado paliativo por trabajo social',
    V114_6: 'V114.6. Consulta o procedimiento de cuidado paliativo por otro profesional de salud no médico no especializado',
    V115: 'V115. Fecha de primera consulta o procedimiento de cuidado paliativo',
    V116: 'V116. Código de la IPS donde recibe la atención de cuidado paliativo',
    V117: 'V117. Valoración por el servicio de psiquiatría',
    V118: 'V118. Fecha de primera consulta con el servicio de psiquiatría',
    V119: 'V119. Código de la IPS donde recibió la primera valoración de psiquiatría',
    V120: 'V120. Valoración por profesional en nutrición',
    V121: 'V121. Fecha de consulta inicial con nutrición',
    V122: 'V122. Código de la IPS donde recibió la valoración por nutrición',
    V123: 'V123. ¿El usuario recibió soporte nutricional?',
    V124: 'V124. ¿El usuario ha recibido terapias complementarias para su rehabilitación?'
  };

  const ENCABEZADOS_REALES = {
    V1: 'v1primernombre', V2: 'v2segundonombre', V3: 'v3primerapellido', V4: 'v4segundoapellido', V5: 'v5tipodeidentificacin', V6: 'v6nmerodeidentificacin', V7: 'v7fechadenacimiento', V8: 'v8sexo', V9: 'v9ocupacin', V10: 'v10rgimendeafiliacinalsgsss', V11: 'v11eps', V12: 'v12cdigopertenenciatnica', V13: 'v13grupopoblacional', V14: 'v14municipioderesidencia', V15: 'v15nmerotelefnicodelpacienteincl', V16: 'v16fechadeafiliacinalaeapbquerep',
    V17: 'v17nombredelaneoplasiacncerotumo', V18: 'v18fechadediagnsticodelcncerrepo', V19: 'v19fechadelanotaderemisindelmdic', V20: 'v20fechadeingresoalainstitucinqu', V21: 'v21tipodeestudioconelqueserealiz', V22: 'v22motivoporelcualelusuarionotuv', V23: 'v23fechaderecoleccindemuestrapar', V24: 'v24fechadeinformehistopatolgicov', V25: 'v25cdigovlidodehabilitacindelaip', V26: 'v26fechadeprimeraconsultaconmdic', V27: 'v27histologadeltumorenmuestradeb', V28: 'v28gradodediferenciacindeltumors',
    V57: 'v57recibioquimioterapiaintratecal', V58: 'v58fechadefinalizacindelprimerci', V59: 'v59caractersticasactualesdelprim', V60: 'v60motivofinalizacinprematuradep',
    V61: 'v61ubicaciontemporaldelultimoesquema', V62: 'v62fechadeiniciodelultimoesquema', V63: 'v63numerodeipsquesuministranelultimoesquema', V64: 'v64cdigodelaips1quesuministraell', V65: 'v65cdigodelaips2quesuministraell',
    V66: 'v66cuantosmedicamentosantineopls', V66_1: 'v661medicamentoadm1', V66_2: 'v662medicamentoadm2', V66_3: 'v663medicamentoadm3', V66_4: 'v664medicamentoadm4', V66_5: 'v665medicamentoadm5', V66_6: 'v666medicamentoadm6', V66_7: 'v667medicamentoadm7', V66_8: 'v668medicamentoadm8', V66_9: 'v669medicamentoadm9',
    V67: 'v67medicamentoantineoplasicooterapiahormonaladicional1',
    V68: 'v68medicamentoantineoplasicooterapiahormonaladicional2',
    V69: 'v69medicamentonopos3administrado',
    V70: 'v70recibiquimioterapiaintratecal',
    V71: 'v71fechadefinalizacindelciclolti',
    V72: 'v72caractersticasactualesdelltim',
    V73: 'v73motivofinalizacinprematuradel',
    V74: 'v74cirugascurativasopaliativas',
    V75: 'v75nmerodecirugasalasquefuesomet',
    V76: 'v76fechaderealizacindelaprimerac',
    V77: 'v77cdigodelaipsquerealizlaprimer',
    V78: 'v78cdigodeprimeraciruga',
    V79: 'v79ubicacintemporaldeestaprimera',
    V80: 'v80fechaderealizacindelltimoproc',
    V81: 'v81motivodehaberrealizadolaltima',
    V82: 'v82cdigoipsultimarealiza',
    V83: 'v83cdigodeltimaciruga',
    V84: 'v84ubicacintemporaldeestaltimaci',
    V85: 'v85estadovitalalfinalizarlanicao',
    V86: 'v86recibielusuarioalgntipoderadi',
    V87: 'v87nmerodeesquemasderadioterapia',
    V88: 'v88fechadeiniciodeprimeronicoesq',
    V89: 'v89ubicacintemporaldelprimeronic',
    V90: 'v90tipoderadioterapiaaplicadaene',
    V91: 'v91nmerodeipsquesuministranestep',
    V92: 'v92cdigodelaips1quesuministralar',
    V93: 'v93cdigodelaips2quesuministralar',
    V94: 'v94fechadefinalizacindeprimeroni',
    V95: 'v95caractersticasactualesdeestep',
    V96: 'v96motivofinalizacinprimeronicoe',
    V97: 'v97fechadeiniciodelltimoesquemad',
    V98: 'v98ubicacintemporaldelltimoesque',
    V99: 'v99tiporadioterapiaaplicadaenlti',
    V100: 'v100ipsquesuministranltimoesquem',
    V101: 'v101cdigodelaips1quesuministrala',
    V102: 'v102cdigodelaips2quesuministrala',
    V103: 'v103fechadefinalizacindelltimoes',
    V104: 'v104caractersticasactualesdeeste',
    V105: 'v105motivofinalizacinltimoesquem',
    V106: 'v106recibitrasplantedeclulasprog',
    V107: 'v107tipodetrasplanterecibido',
    V108: 'v108ubicacintemporaldeestetraspl',
    V109: 'v109fechadetrasplante',
    V110: 'v110cdigodelaipsquerealizestetra',
    V111: 'v111elusuariorecibicirugareconst',
    V112: 'v112fechadelaciruga',
    V113: 'v113cdigodelaipsquerealizcirugar',
    V114: 'v114valoradoenconsoproccuidadopa',
    V114_1: 'v1141recibiconsoprocpaliativopor',
    V114_2: 'v1142recibiconsoprocpaliativopor',
    V114_3: 'v1143recibiconsoprocpaliativopor',
    V114_4: 'v1144recibiconsoprocpaliativopor',
    V114_5: 'v1145recibiconsoprocpaliativopor',
    V114_6: 'v1146recibiconsoprocpaliativopor',
    V115: 'v115fechadeprimeraconsultaoproce',
    V116: 'v116cdigodelaipsdonderecibilapri',
    V117: 'v117hasidovaloradoelusuarioporel',
    V118: 'v118fechadeprimeraconsultaconels',
    V119: 'v119cdigodelaipsdonderecibilapri',
    V120: 'v120fuevaloradoelusuarioporprofe',
    V121: 'v121fechadeconsultainicialconnut',
    V122: 'v122cdigodelaipsdonderecibilaval',
    V123: 'v123elusuariorecibisoportenutric',
    V124: 'v124elusuarioharecibidoterapiasc'
  };

  const MAPA_ENCABEZADOS_A_VARIABLES = {};
  Object.entries(ENCABEZADOS_REALES).forEach(([variable, encabezado]) => {
    MAPA_ENCABEZADOS_A_VARIABLES[limpiarClaveEncabezado(encabezado)] = variable;
  });

  const ESTILO_ENCABEZADO_NORMAL = { font: { bold: true, color: { rgb: 'FFFFFF' } }, fill: { patternType: 'solid', fgColor: { rgb: '1F2937' } }, alignment: { horizontal: 'center', vertical: 'center', wrapText: true }, border: bordeFino() };
  const ESTILO_ENCABEZADO_ERROR = { font: { bold: true, color: { rgb: '7F1D1D' } }, fill: { patternType: 'solid', fgColor: { rgb: 'FCA5A5' } }, alignment: { horizontal: 'center', vertical: 'center', wrapText: true }, border: bordeFino() };
  const ESTILO_ENCABEZADO_ADVERTENCIA = { font: { bold: true, color: { rgb: '78350F' } }, fill: { patternType: 'solid', fgColor: { rgb: 'FDE68A' } }, alignment: { horizontal: 'center', vertical: 'center', wrapText: true }, border: bordeFino() };
  const ESTILO_CELDA_ERROR = { fill: { patternType: 'solid', fgColor: { rgb: 'FECACA' } }, font: { color: { rgb: '7F1D1D' } }, border: bordeFino(), alignment: { vertical: 'top', wrapText: true } };
  const ESTILO_CELDA_ADVERTENCIA = { fill: { patternType: 'solid', fgColor: { rgb: 'FEF3C7' } }, font: { color: { rgb: '78350F' } }, border: bordeFino(), alignment: { vertical: 'top', wrapText: true } };
  const ESTILO_CELDA_NORMAL = { border: bordeFino(), alignment: { vertical: 'top', wrapText: true } };
  const ESTILO_TITULO_ERROR = { font: { bold: true, color: { rgb: '7F1D1D' } }, fill: { patternType: 'solid', fgColor: { rgb: 'FECACA' } }, border: bordeFino(), alignment: { vertical: 'top', wrapText: true } };
  const ESTILO_TITULO_ADVERTENCIA = { font: { bold: true, color: { rgb: '78350F' } }, fill: { patternType: 'solid', fgColor: { rgb: 'FEF3C7' } }, border: bordeFino(), alignment: { vertical: 'top', wrapText: true } };

  function bordeFino() {
    return { top: { style: 'thin', color: { rgb: 'D1D5DB' } }, bottom: { style: 'thin', color: { rgb: 'D1D5DB' } }, left: { style: 'thin', color: { rgb: 'D1D5DB' } }, right: { style: 'thin', color: { rgb: 'D1D5DB' } } };
  }

  function texto(valor) { return String(valor ?? '').trim(); }

  function limpiarClaveEncabezado(valor) {
    return String(valor ?? '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
  }

  function normalizarVariableTecnica(valor) {
    const limpio = String(valor ?? '').trim().toUpperCase().replace(/\./g, '_');
    return /^V\d+(?:_\d+)?$/.test(limpio) ? limpio : '';
  }

  function obtenerSeveridadHallazgo(hallazgo) {
    const severidad = String(hallazgo?.severidad || '').toLowerCase();
    const codigo = String(hallazgo?.codigo || '').toUpperCase();
    if (severidad === 'error' || codigo.includes('-ERROR-')) return 'error';
    if (severidad === 'advertencia' || codigo.includes('-ADVERTENCIA-') || codigo.includes('-WARNING-')) return 'advertencia';
    return 'advertencia';
  }

  function obtenerFilaExcelResultado(resultado) {
    const fila = Number(resultado?.indiceFilaExcel ?? resultado?.filaExcel ?? resultado?.__filaExcel ?? resultado?.fila);
    return Number.isInteger(fila) && fila > 0 ? fila : '';
  }

  function obtenerVariableDesdeEncabezado(encabezado) {
    const variableTecnica = normalizarVariableTecnica(encabezado);
    if (variableTecnica) return variableTecnica;

    const valor = String(encabezado ?? '').trim().toUpperCase();
    const clave = limpiarClaveEncabezado(encabezado);
    const variableMapeada = MAPA_ENCABEZADOS_A_VARIABLES[clave];
    if (variableMapeada) return variableMapeada;

    const subvariable46 = clave.match(/^v46([1-8])(?:\D|$)/);
    if (subvariable46) return `V46_${subvariable46[1]}`;

    const subvariable53 = clave.match(/^v53([1-9])(?:\D|$)/);
    if (subvariable53) return `V53_${subvariable53[1]}`;

    const subvariable66 = clave.match(/^v66([1-9])(?:\D|$)/);
    if (subvariable66) return `V66_${subvariable66[1]}`;

    const subvariable114 = clave.match(/^v114([1-9])(?:\D|$)/);
    if (subvariable114) return `V114_${subvariable114[1]}`;

    const prefijoVariable = clave.match(/^v(\d{1,3})(?:\D|$)/);
    if (prefijoVariable) {
      const numero = Number(prefijoVariable[1]);
      if (numero >= 1 && numero <= 160) return `V${numero}`;
    }

    return valor;
  }

  function obtenerEncabezadoReal(variableOEncabezado) {
    const variable = obtenerVariableDesdeEncabezado(variableOEncabezado);
    return ENCABEZADOS_REALES[variable] || variableOEncabezado || '';
  }

  function obtenerNombreVariable(variable) { return NOMBRES_VARIABLES[variable] || variable || 'Dato relacionado'; }

  function fechaNombreArchivo() {
    const ahora = new Date();
    const yyyy = ahora.getFullYear();
    const mm = String(ahora.getMonth() + 1).padStart(2, '0');
    const dd = String(ahora.getDate()).padStart(2, '0');
    const hh = String(ahora.getHours()).padStart(2, '0');
    const mi = String(ahora.getMinutes()).padStart(2, '0');
    return `${yyyy}${mm}${dd}_${hh}${mi}`;
  }

  function limpiarNombreArchivo(nombre) {
    return texto(nombre).replace(/[\\/:*?"<>|]/g, '_').replace(/\s+/g, '_').substring(0, 60);
  }

  function datosRelacionadosComoTexto(hallazgo) {
    const datos = Array.isArray(hallazgo.datosRelacionados) && hallazgo.datosRelacionados.length > 0
      ? hallazgo.datosRelacionados
      : [{ variable: hallazgo.variable, nombre: obtenerNombreVariable(hallazgo.variable), valor: hallazgo.valor }];

    return datos.map((item) => {
      const etiqueta = item.variable ? `${item.variable} ${item.nombre || obtenerNombreVariable(item.variable)}` : item.nombre || 'Dato relacionado';
      const valor = texto(item.valor) || '(vacío)';
      const nota = item.nota ? ` (${item.nota})` : '';
      return `${etiqueta}: ${valor}${nota}`;
    }).join(' | ');
  }

  function columnasRevisarComoTexto(hallazgo) {
    const columnas = Array.isArray(hallazgo.columnasCorregir) && hallazgo.columnasCorregir.length > 0 ? hallazgo.columnasCorregir : [hallazgo.variable].filter(Boolean);
    if (columnas.length === 0) return 'Revisar la fila indicada.';
    return columnas.map((columna) => `${columna} (${obtenerNombreVariable(columna)})`).join(', ');
  }

  function construirFilasHallazgos(resumen) {
    const filas = [];
    (resumen.resultados || []).forEach((resultado) => {
      (resultado.hallazgos || []).forEach((hallazgo) => {
        const severidadHallazgo = obtenerSeveridadHallazgo(hallazgo);
        const severidadTexto = severidadHallazgo === 'error' ? 'ERROR' : 'ADVERTENCIA';
        filas.push({
          'Fila Excel': obtenerFilaExcelResultado(resultado),
          'Documento': resultado.documento,
          'Tipo': severidadTexto,
          'Código': hallazgo.codigo || '',
          'Variable principal': hallazgo.variable || '',
          'Campo': obtenerNombreVariable(hallazgo.variable),
          'Título del hallazgo': hallazgo.titulo || hallazgo.mensaje || '',
          'Qué pasa': hallazgo.mensaje || '',
          'Datos involucrados': datosRelacionadosComoTexto(hallazgo),
          'Dónde revisar': columnasRevisarComoTexto(hallazgo),
          'Por qué importa': hallazgo.regla || '',
          'Qué hacer': hallazgo.recomendacion || ''
        });
      });
    });
    return filas;
  }

  function construirResumenGeneral({ resumen, nombreArchivo, nombreHoja }) {
    return [
      { Campo: 'Proyecto', Valor: 'Validador CAC — Cáncer' },
      { Campo: 'Archivo validado', Valor: nombreArchivo || '' },
      { Campo: 'Hoja validada', Valor: nombreHoja || '' },
      { Campo: 'Fecha de exportación', Valor: new Date().toLocaleString('es-CO') },
      { Campo: 'Pacientes procesados', Valor: resumen.totalPacientes },
      { Campo: 'Pacientes con errores', Valor: resumen.conErrores },
      { Campo: 'Pacientes con advertencias solamente', Valor: resumen.conAdvertencias },
      { Campo: 'Pacientes sin problemas', Valor: resumen.sinProblemas },
      { Campo: 'Total de errores', Valor: resumen.totalErrores },
      { Campo: 'Total de advertencias', Valor: resumen.totalAdvertencias },
      { Campo: 'Alcance actual', Valor: 'Exporta la hoja validada y marca en rojo claro las celdas exactas con error. Las advertencias se marcan en amarillo claro.' }
    ];
  }

  function construirFilasPacientes(resumen) {
    return (resumen.resultados || []).map((resultado) => ({ 'Fila Excel': obtenerFilaExcelResultado(resultado), 'Documento': resultado.documento, 'Errores': resultado.errores, 'Advertencias': resultado.advertencias, 'Estado': resultado.estado }));
  }

  function clonarMatrizOriginal(datosExcel) {
    const matrizFuente = Array.isArray(datosExcel?.matrizOriginal) ? datosExcel.matrizOriginal : null;
    if (matrizFuente && matrizFuente.length > 0) return matrizFuente.map((fila) => Array.isArray(fila) ? [...fila] : [fila ?? '']);

    const encabezadosOriginales = Array.isArray(datosExcel?.encabezados) ? datosExcel.encabezados : [];
    const encabezadosSalida = encabezadosOriginales.map(obtenerEncabezadoReal);
    const registros = Array.isArray(datosExcel?.filas) ? datosExcel.filas : [];
    const filas = registros.map((registro) => Array.isArray(registro) ? registro : encabezadosOriginales.map((encabezado) => registro?.[obtenerVariableDesdeEncabezado(encabezado)] ?? ''));
    return [encabezadosSalida, ...filas];
  }

  const VARIABLES_FECHA_EXPORTACION = new Set(['V7', 'V16', 'V18', 'V19', 'V20', 'V23', 'V24', 'V26', 'V30', 'V32', 'V35', 'V39', 'V43', 'V49', 'V58', 'V62', 'V71', 'V76', 'V80', 'V88', 'V94', 'V97', 'V103', 'V109', 'V112', 'V115', 'V118', 'V121', 'V130', 'V131', 'V134']);

  function esVariableFechaExportacion(variable) { return VARIABLES_FECHA_EXPORTACION.has(String(variable || '').toUpperCase()); }

  function serialExcelDesdeFecha(fecha) {
    if (!(fecha instanceof Date) || Number.isNaN(fecha.getTime())) return '';
    const base = Date.UTC(1899, 11, 30);
    const actual = Date.UTC(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
    return Math.round((actual - base) / 86400000);
  }

  function normalizarValorNoFechaParaExportacion(valor) {
    if (valor instanceof Date) {
      const serial = serialExcelDesdeFecha(valor);
      return serial === '' ? '' : String(serial);
    }
    if (valor === null || valor === undefined) return '';
    return String(valor);
  }

  function forzarFormatoTextoEnVariablesNoFecha(hoja, columnasPorVariable, filaEncabezadosIndice) {
    if (!hoja || !columnasPorVariable) return;
    Object.entries(columnasPorVariable).forEach(([variable, columnaIndice]) => {
      if (!/^V\d+(?:_\d+)?$/.test(variable)) return;
      if (esVariableFechaExportacion(variable)) return;
      if (!Number.isInteger(columnaIndice) || columnaIndice < 0) return;
      if (!hoja['!ref']) return;
      const rango = XLSX.utils.decode_range(hoja['!ref']);
      for (let filaIndice = 0; filaIndice <= rango.e.r; filaIndice += 1) {
        if (filaIndice === filaEncabezadosIndice) continue;
        const celdaRef = XLSX.utils.encode_cell({ r: filaIndice, c: columnaIndice });
        const celda = hoja[celdaRef];
        if (!celda) continue;
        const valorNormalizado = normalizarValorNoFechaParaExportacion(celda.v);
        celda.t = 's'; celda.v = valorNormalizado; celda.w = valorNormalizado; celda.z = '@';
      }
    });
  }

  function crearMapaColumnasPorVariable(datosExcel) {
    const mapa = {};
    if (Array.isArray(datosExcel?.mapeos)) {
      datosExcel.mapeos.forEach((mapeo) => {
        if (!mapeo || !mapeo.variable) return;
        const indice = Number(mapeo.indiceColumna);
        if (Number.isInteger(indice) && indice >= 0 && mapa[mapeo.variable] === undefined) mapa[mapeo.variable] = indice;
      });
    }
    const registros = Array.isArray(datosExcel?.registros) ? datosExcel.registros : datosExcel?.filas;
    const primerRegistro = Array.isArray(registros) ? registros.find((registro) => registro && typeof registro === 'object' && !Array.isArray(registro)) : null;
    if (primerRegistro) {
      Object.keys(primerRegistro).forEach((clave) => {
        const match = clave.match(/^__columna_(V\d+(?:_\d+)?)$/);
        if (!match) return;
        const variable = match[1];
        const columnaUnoBasada = Number(primerRegistro[clave]);
        if (Number.isInteger(columnaUnoBasada) && columnaUnoBasada > 0 && mapa[variable] === undefined) mapa[variable] = columnaUnoBasada - 1;
      });
    }
    if (Array.isArray(datosExcel?.encabezados)) {
      datosExcel.encabezados.forEach((encabezado, indice) => {
        const variable = obtenerVariableDesdeEncabezado(encabezado);
        if (/^V\d+(?:_\d+)?$/.test(variable) && mapa[variable] === undefined) mapa[variable] = indice;
      });
    }
    return mapa;
  }

  function asegurarCelda(hoja, filaIndice, columnaIndice, valor = '') {
    const celdaRef = XLSX.utils.encode_cell({ r: filaIndice, c: columnaIndice });
    if (!hoja[celdaRef]) hoja[celdaRef] = { t: 's', v: valor };
    return hoja[celdaRef];
  }

  function crearMatrizMarcada({ resumen, datosExcel }) {
    if (!datosExcel) return null;
    const matriz = clonarMatrizOriginal(datosExcel);
    if (!Array.isArray(matriz) || matriz.length === 0) return null;
    const hoja = XLSX.utils.aoa_to_sheet(matriz);
    const columnasPorVariable = crearMapaColumnasPorVariable(datosExcel);
    const filaEncabezadosIndice = Number.isInteger(datosExcel.filaEncabezadosIndice) ? datosExcel.filaEncabezadosIndice : Math.max(Number(datosExcel.filaEncabezados || 1) - 1, 0);

    forzarFormatoTextoEnVariablesNoFecha(hoja, columnasPorVariable, filaEncabezadosIndice);

    (resumen.resultados || []).forEach((resultado) => {
      const filaExcel = Number(obtenerFilaExcelResultado(resultado));
      if (!Number.isInteger(filaExcel) || filaExcel <= 0) return;
      const filaIndice = filaExcel - 1;
      (resultado.hallazgos || []).forEach((hallazgo) => {
        const severidad = obtenerSeveridadHallazgo(hallazgo);
        const estiloCelda = severidad === 'error' ? ESTILO_CELDA_ERROR : ESTILO_CELDA_ADVERTENCIA;
        const estiloEncabezado = severidad === 'error' ? ESTILO_ENCABEZADO_ERROR : ESTILO_ENCABEZADO_ADVERTENCIA;
        const columnas = Array.isArray(hallazgo.columnasCorregir) && hallazgo.columnasCorregir.length > 0 ? hallazgo.columnasCorregir : [hallazgo.variable].filter(Boolean);
        columnas.forEach((columna) => {
          const variable = obtenerVariableDesdeEncabezado(columna);
          const columnaIndice = columnasPorVariable[variable];
          if (!Number.isInteger(columnaIndice) || columnaIndice < 0) return;
          const celdaDato = asegurarCelda(hoja, filaIndice, columnaIndice);
          const celdaEncabezado = asegurarCelda(hoja, filaEncabezadosIndice, columnaIndice);
          if (!celdaDato.__cacSeveridad || celdaDato.__cacSeveridad !== 'error') { celdaDato.s = estiloCelda; celdaDato.__cacSeveridad = severidad; }
          if (!celdaEncabezado.__cacSeveridad || celdaEncabezado.__cacSeveridad !== 'error') { celdaEncabezado.s = estiloEncabezado; celdaEncabezado.__cacSeveridad = severidad; }
        });
      });
    });

    Object.keys(hoja).forEach((clave) => { if (!clave.startsWith('!') && hoja[clave]?.__cacSeveridad) delete hoja[clave].__cacSeveridad; });
    const totalColumnas = matriz.reduce((max, fila) => Math.max(max, Array.isArray(fila) ? fila.length : 0), 0);
    hoja['!cols'] = Array.from({ length: totalColumnas }, () => ({ wch: 18 }));
    if (hoja['!ref']) hoja['!autofilter'] = { ref: hoja['!ref'] };
    hoja['!freeze'] = { xSplit: 0, ySplit: filaEncabezadosIndice + 1 };
    return hoja;
  }

  function ajustarColumnas(hoja, anchos) { hoja['!cols'] = anchos.map((wch) => ({ wch })); }

  function aplicarEstiloBasicoTabla(hoja, tipoHoja) {
    if (!hoja['!ref']) return;
    const rango = XLSX.utils.decode_range(hoja['!ref']);
    for (let col = rango.s.c; col <= rango.e.c; col += 1) {
      const celdaRef = XLSX.utils.encode_cell({ r: 0, c: col });
      if (hoja[celdaRef]) hoja[celdaRef].s = ESTILO_ENCABEZADO_NORMAL;
    }
    for (let row = 1; row <= rango.e.r; row += 1) {
      for (let col = rango.s.c; col <= rango.e.c; col += 1) {
        const celdaRef = XLSX.utils.encode_cell({ r: row, c: col });
        if (!hoja[celdaRef]) continue;
        hoja[celdaRef].s = tipoHoja === 'error' ? ESTILO_TITULO_ERROR : tipoHoja === 'advertencia' ? ESTILO_TITULO_ADVERTENCIA : ESTILO_CELDA_NORMAL;
      }
    }
    hoja['!autofilter'] = { ref: hoja['!ref'] };
  }

  function crearHojaDesdeJSON(datos, anchos, tipoHoja = 'normal') {
    const datosSeguros = Array.isArray(datos) ? datos : [];
    const hoja = XLSX.utils.json_to_sheet(datosSeguros);
    ajustarColumnas(hoja, anchos);
    aplicarEstiloBasicoTabla(hoja, tipoHoja);
    return hoja;
  }

  function exportarReporte({ resumen, datosExcel, nombreArchivo, nombreHoja }) {
    if (typeof XLSX === 'undefined') throw new Error('La librería XLSX no está disponible.');
    if (!resumen || !Array.isArray(resumen.resultados)) throw new Error('No hay resultados para exportar.');

    const workbook = XLSX.utils.book_new();
    const filasResumen = construirResumenGeneral({ resumen, nombreArchivo, nombreHoja });
    const filasPacientes = construirFilasPacientes(resumen);
    const todosHallazgos = construirFilasHallazgos(resumen);
    const errores = todosHallazgos.filter((fila) => fila.Tipo === 'ERROR');
    const advertencias = todosHallazgos.filter((fila) => fila.Tipo === 'ADVERTENCIA');
    const hojaResumen = crearHojaDesdeJSON(filasResumen, [32, 90]);
    const hojaPacientes = crearHojaDesdeJSON(filasPacientes, [12, 24, 12, 15, 22]);
    const hojaErrores = crearHojaDesdeJSON(errores, [12, 24, 16, 18, 18, 28, 36, 55, 80, 45, 60, 70], 'error');
    const hojaAdvertencias = crearHojaDesdeJSON(advertencias, [12, 24, 18, 22, 18, 28, 36, 55, 80, 45, 60, 70], 'advertencia');
    const hojaTodos = crearHojaDesdeJSON(todosHallazgos, [12, 24, 18, 22, 18, 28, 36, 55, 80, 45, 60, 70]);
    const hojaMatrizMarcada = crearMatrizMarcada({ resumen, datosExcel });
    XLSX.utils.book_append_sheet(workbook, hojaResumen, 'Resumen');
    if (hojaMatrizMarcada) XLSX.utils.book_append_sheet(workbook, hojaMatrizMarcada, 'MATRIZ_MARCADA');
    XLSX.utils.book_append_sheet(workbook, hojaPacientes, 'Pacientes');
    XLSX.utils.book_append_sheet(workbook, hojaErrores, 'Errores');
    XLSX.utils.book_append_sheet(workbook, hojaAdvertencias, 'Advertencias');
    XLSX.utils.book_append_sheet(workbook, hojaTodos, 'Todos los hallazgos');
    const nombreSeguroHoja = limpiarNombreArchivo(nombreHoja || 'hoja');
    const nombreSalida = `Reporte_CAC_${nombreSeguroHoja}_${fechaNombreArchivo()}.xlsx`;
    XLSX.writeFile(workbook, nombreSalida);
  }

  window.CACExportadorExcel = { VERSION_EXPORTADOR: 'sprint-3n-v119-exportador-01', exportarReporte };
})();
