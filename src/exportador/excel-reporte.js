

(function () {
  'use strict';

  // Nombres legibles para mostrar en hallazgos, columnas de revisión y reportes.
  const NOMBRES_VARIABLES = {
    V1: 'Primer nombre',
    V2: 'Segundo nombre',
    V3: 'Primer apellido',
    V4: 'Segundo apellido',
    V5: 'Tipo de identificación',
    V6: 'Número de identificación',
    V7: 'Fecha de nacimiento',
    V8: 'Sexo',
    V9: 'Ocupación',
    V10: 'Régimen de afiliación',
    V11: 'Código de la EPS',
    V12: 'Pertenencia étnica',
    V13: 'Grupo poblacional',
    V14: 'Municipio de residencia',
    V15: 'Número telefónico',
    V16: 'Fecha de afiliación',
    V17: 'Código CIE-10 de la neoplasia maligna reportada',
    V18: 'Fecha de diagnóstico del cáncer reportado',
    V19: 'Fecha de remisión o interconsulta',
    V20: 'Fecha de ingreso a la institución diagnóstica',
    V21: 'Tipo de estudio con el que se realizó el diagnóstico',
    V22: 'Motivo por el cual no tuvo diagnóstico por histopatología',
    V23: 'Fecha de recolección de muestra para estudio histopatológico',
    V24: 'Fecha del primer o único informe histopatológico válido',
    V25: 'Código válido de habilitación de la IPS donde se realiza la confirmación diagnóstica',
    V26: 'Fecha de primera consulta con médico tratante de la enfermedad maligna',
    V27: 'Histología del tumor en muestra de biopsia o quirúrgica',
    V28: 'Grado de diferenciación del tumor sólido maligno',
    V29: 'Primera estadificación clínica o patológica',
    V30: 'Fecha de estadificación clínica',
    V31: 'Fecha de estadificación TNM clínica',
    V32: 'Fecha de estadificación TNM patológica',
    V33: 'Fecha de estadificación agrupada',
    V34: 'Estadificación Dukes para cáncer colorrectal',
    V35: 'Fecha de estadificación Dukes',
    V36: 'Estadificación Ann Arbor/Lugano',
    V37: 'Clasificación de Gleason',
    V38: 'Clasificación del riesgo',
    V39: 'Fecha de clasificación del riesgo',
    V40: 'Variable 40',
    V41: 'Intervención médica documentada',
    V42: 'Variable 42',
    V43: 'Variable 43',
    V44: 'Variable 44',
    V45: 'Recibió quimioterapia u otra terapia sistémica',
    V46: 'Número de fases de quimioterapia',
    V46_1: 'Fase de quimioterapia 1',
    V46_2: 'Fase de quimioterapia 2',
    V46_3: 'Fase de quimioterapia 3',
    V46_4: 'Fase de quimioterapia 4',
    V46_5: 'Fase de quimioterapia 5',
    V46_6: 'Fase de quimioterapia 6',
    V46_7: 'Fase de quimioterapia 7',
    V46_8: 'Fase de quimioterapia 8',
    V47: 'Número de ciclos recibidos',
    V48: 'Ubicación temporal del primer o único esquema',
    V49: 'Fecha de inicio del primer o único esquema',
    V50: 'Número de IPS que suministran el primer o único esquema',
    V51: 'Código de la IPS1 que suministra el primer o único esquema',
    V52: 'Código de la IPS2 que suministra el primer o único esquema',
    V53: 'Cantidad de medicamentos administrados',
    V53_1: 'Primer medicamento antineoplásico administrado',
    V53_2: 'Segundo medicamento antineoplásico administrado',
    V53_3: 'Tercer medicamento antineoplásico administrado',
    V53_4: 'Cuarto medicamento antineoplásico administrado',
    V53_5: 'Quinto medicamento antineoplásico administrado',
    V53_6: 'Sexto medicamento antineoplásico administrado',
    V53_7: 'Séptimo medicamento antineoplásico administrado',
    V53_8: 'Octavo medicamento antineoplásico administrado',
    V53_9: 'Noveno medicamento antineoplásico administrado',
    V54: 'Medicamento antineoplásico adicional 1',
    V55: 'Medicamento antineoplásico adicional 2',
    V56: 'Medicamento antineoplásico adicional 3',
    V57: 'Recibió quimioterapia intratecal en el primer o único esquema',
    V58: 'Fecha de finalización del primer o único esquema',
    V59: 'Características actuales del primer o único esquema',
    V60: 'Motivo de finalización prematura del primer o único esquema',
    V61: 'Ubicación temporal del último esquema de terapia sistémica del periodo',
    V62: 'Fecha de inicio del último esquema de quimioterapia o terapia sistémica',
    V63: 'Número de IPS que suministran el último esquema',
    V64: 'Código de la IPS1 que suministra el último esquema',
    V65: 'Código de la IPS2 que suministra el último esquema',
    V66: 'Número de medicamentos propuestos en el último esquema'
  };

  // Encabezados reales usados por la base matriz CAC.
  // Se usan al exportar MATRIZ_MARCADA para no mostrar V1, V2, V3...
  const ENCABEZADOS_REALES = {
    V1: 'v1primernombre',
    V2: 'v2segundonombre',
    V3: 'v3primerapellido',
    V4: 'v4segundoapellido',
    V5: 'v5tipodeidentificacin',
    V6: 'v6nmerodeidentificacin',
    V7: 'v7fechadenacimiento',
    V8: 'v8sexo',
    V9: 'v9ocupacin',
    V10: 'v10rgimendeafiliacinalsgsss',
    V11: 'v11eps',
    V12: 'v12cdigopertenenciatnica',
    V13: 'v13grupopoblacional',
    V14: 'v14municipioderesidencia',
    V15: 'v15nmerotelefnicodelpacienteincl',
    V16: 'v16fechadeafiliacinalaeapbquerep',
    V17: 'v17nombredelaneoplasiacncerotumo',
    V18: 'v18fechadediagnsticodelcncerrepo',
    V19: 'v19fechadelanotaderemisindelmdic',
    V20: 'v20fechadeingresoalainstitucinqu',
    V21: 'v21tipodeestudioconelqueserealiz',
    V22: 'v22motivoporelcualelusuarionotuv',
    V23: 'v23fechaderecoleccindemuestrapar',
    V24: 'v24fechadeinformehistopatolgicov',
    V25: 'v25cdigovlidodehabilitacindelaip',
    V26: 'v26fechadeprimeraconsultaconmdic',
    V27: 'v27histologadeltumorenmuestradeb',
    V28: 'v28gradodediferenciacindeltumors',
    V57: 'v57recibioquimioterapiaintratecal',
    V58: 'v58fechadefinalizacindelprimerci',
    V59: 'v59caractersticasactualesdelprim',
    V60: 'v60motivofinalizacinprematuradep',
    V61: 'v61ubicaciontemporaldelultimoesquema',
    V62: 'v62fechadeiniciodelultimoesquema',
    V63: 'v63numerodeipsquesuministranelultimoesquema'
  };

  const MAPA_ENCABEZADOS_A_VARIABLES = {
    v1: 'V1',
    v1primernombre: 'V1',

    v2: 'V2',
    v2segundonombre: 'V2',

    v3: 'V3',
    v3primerapellido: 'V3',

    v4: 'V4',
    v4segundoapellido: 'V4',

    v5: 'V5',
    v5tipoidentificacion: 'V5',
    v5tipodeidentificacion: 'V5',
    v5tipodeidentificacin: 'V5',

    v6: 'V6',
    v6numeroidentificacion: 'V6',
    v6numerodeidentificacion: 'V6',
    v6nmerodeidentificacin: 'V6',

    v7: 'V7',
    v7fechanacimiento: 'V7',
    v7fechadenacimiento: 'V7',

    v8: 'V8',
    v8sexo: 'V8',

    v9: 'V9',
    v9ocupacion: 'V9',
    v9ocupacin: 'V9',

    v10: 'V10',
    v10regimenafiliacionsgsss: 'V10',
    v10regimendeafiliacionsgsss: 'V10',
    v10rgimendeafiliacinalsgsss: 'V10',

    v11: 'V11',
    v11eps: 'V11',
    v11eapb: 'V11',

    v12: 'V12',
    v12codigopertenenciaetnica: 'V12',
    v12cdigopertenenciatnica: 'V12',

    v13: 'V13',
    v13grupopoblacional: 'V13',

    v14: 'V14',
    v14municipioresidencia: 'V14',
    v14municipioderesidencia: 'V14',

    v15: 'V15',
    v15numerotelefonicodelpaciente: 'V15',
    v15numerotelefonicodelpacienteincl: 'V15',
    v15nmerotelefnicodelpacienteincl: 'V15',

    v16: 'V16',
    v16fechadeafiliacionlaeapbalregimen: 'V16',
    v16fechadeafiliacinalaeapbquerep: 'V16',

    v17: 'V17',
    v17nombredelaneoplasiacncerotumo: 'V17',
    v17codigocie10delaneoplasiacancerotumormalignareportadaprimario: 'V17',
    v17codigocie10delaneoplasiareportadaprimario: 'V17',
    v17codigocie10delcancerreportado: 'V17',

    v18: 'V18',
    v18fechadediagnsticodelcncerrepo: 'V18',
    v18fechadediagnosticodelcancerreportado: 'V18',
    v18fechadediagnosticodelcancer: 'V18',

    v19: 'V19',
    v19fechadelanotaderemisindelmdic: 'V19',
    v19fechadelanotaderemisionointerconsulta: 'V19',
    v19fechaderemisionointerconsulta: 'V19',

    v20: 'V20',
    v20fechadeingresoalainstitucinqu: 'V20',
    v20fechadeingresoalainstitucionquerealizoeldiagnostico: 'V20',
    v20fechadeingresoalainstituciondiagnostica: 'V20',

    v21: 'V21',
    v21tipodeestudioconelqueserealiz: 'V21',
    v21tipodeestudioconelqueserealizoeldiagnosticodecancer: 'V21',
    v21tipodeestudioconelqueserealizoeldiagnostico: 'V21',

    v22: 'V22',
    v22motivoporelcualelusuarionotuv: 'V22',
    v22motivoporelcualelusuarionotuvodiagnosticoporhistopatologia: 'V22',
    v22motivosinhistopatologia: 'V22',

    v23: 'V23',
    v23fechaderecoleccindemuestrapar: 'V23',
    v23fechaderecolecciondemuestraparaestudiohistopatologicodediagnostico: 'V23',
    v23fechaderecolecciondemuestraparaestudiohistopatologico: 'V23',

    v24: 'V24',
    v24fechadeinformehistopatolgicov: 'V24',
    v24fechadeprimeroounicoinformehistopatologicovalidodediagnostico: 'V24',
    v24fechadeprimerounicoinformehistopatologicovalido: 'V24',

    v25: 'V25',
    v25cdigovlidodehabilitacindelaip: 'V25',
    v25cdigovlidodehabilitacindelaips: 'V25',
    v25codigovalidodehabilitaciondelaips: 'V25',
    v25codigohabilitacionips: 'V25',

    v26: 'V26',
    v26fechadeprimeraconsultaconmdic: 'V26',
    v26fechadeprimeraconsultaconmedico: 'V26',
    v26fechadeprimeraconsultaconmedicotratante: 'V26',

    v27: 'V27',
    v27histologadeltumorenmuestradeb: 'V27',
    v27histologiadeltumorenmuestra: 'V27',
    v27histologiadeltumorenmuestradebiopsia: 'V27',

    v28: 'V28',
    v28gradodediferenciacindeltumors: 'V28',
    v28gradodediferenciacion: 'V28',
    v28gradodediferenciaciondeltumor: 'V28',

    v29: 'V29',
    v30: 'V30',
    v31: 'V31',
    v32: 'V32',
    v33: 'V33',
    v34: 'V34',
    v35: 'V35',
    v36: 'V36',
    v37: 'V37',
    v38: 'V38',
    v39: 'V39',
    v40: 'V40',
    v41: 'V41',
    v42: 'V42',
    v43: 'V43',
    v44: 'V44',
    v45: 'V45',
    v45recibioquimioterapiauotratamientosistemico: 'V45',
    v45recibioquimioterapiauotraterapiasistemica: 'V45',
    v46: 'V46',
    v46numerodefases: 'V46',
    v46numerodefasesdequimioterapia: 'V46',
    v461: 'V46_1',
    v462: 'V46_2',
    v463: 'V46_3',
    v464: 'V46_4',
    v465: 'V46_5',
    v466: 'V46_6',
    v467: 'V46_7',
    v468: 'V46_8',
    v47: 'V47',
    v47numerodeciclos: 'V47',
    v48: 'V48',
    v48ubicaciontemporal: 'V48',
    v49: 'V49',
    v49fechainiciodeesquema: 'V49',
    v49fechadeiniciodeesquema: 'V49',
    v50: 'V50',
    v50numerodeipsquesuministran: 'V50',
    v51: 'V51',
    v51codigodelaips1: 'V51',
    v51codigodelaips1quesuministra: 'V51',
    v52: 'V52',
    v52codigodelaips2: 'V52',
    v52codigodelaips2quesuministra: 'V52',
    v53: 'V53',
    v53cantidadmedicamentos: 'V53',
    v53cantidadmedicamentosadministrados: 'V53',
    v531: 'V53_1',
    v531medicamentoadm1: 'V53_1',
    v531medicamentoadministrado1: 'V53_1',
    v532: 'V53_2',
    v532medicamentoadm2: 'V53_2',
    v532medicamentoadministrado2: 'V53_2',
    v533: 'V53_3',
    v533medicamentoadm3: 'V53_3',
    v533medicamentoadministrado3: 'V53_3',
    v534: 'V53_4',
    v534medicamentoadm4: 'V53_4',
    v534medicamentoadministrado4: 'V53_4',
    v535: 'V53_5',
    v535medicamentoadm5: 'V53_5',
    v535medicamentoadministrado5: 'V53_5',
    v536: 'V53_6',
    v536medicamentoadm6: 'V53_6',
    v536medicamentoadministrado6: 'V53_6',
    v537: 'V53_7',
    v537medicamentoadm7: 'V53_7',
    v537medicamentoadministrado7: 'V53_7',
    v538: 'V53_8',
    v538medicamentoadm8: 'V53_8',
    v538medicamentoadministrado8: 'V53_8',
    v539: 'V53_9',
    v539medicamentoadm9: 'V53_9',
    v539medicamentoadministrado9: 'V53_9',

    v54: 'V54',
    v54medicamentoadicional1: 'V54',
    v54medicamentoantineoplasicoadditional1: 'V54',
    v54medicamentoantineoplasicoadicional1: 'V54',
    v55: 'V55',
    v55medicamentoadicional2: 'V55',
    v55medicamentoantineoplasicoadicional2: 'V55',
    v56: 'V56',
    v56medicamentoadicional3: 'V56',
    v56medicamentoantineoplasicoadicional3: 'V56',

    v57: 'V57',
    v57recibioquimioterapiaintratecal: 'V57',
    v58: 'V58',
    v58fechadefinalizacindelprimerci: 'V58',
    v58fechadefinalizaciondelprimerounicoesquema: 'V58',
    v59: 'V59',
    v59caractersticasactualesdelprim: 'V59',
    v59caracteristicasactualesdelprimerounicoesquema: 'V59',
    v60: 'V60',
    v60motivofinalizacinprematuradep: 'V60',
    v60motivofinalizacionprematura: 'V60',
    v61: 'V61',
    v61ubicaciontemporal: 'V61',
    v61ubicaciontemporaldelultimoesquema: 'V61',
    v61ubicaciontemporalultimoesquema: 'V61',
    v62: 'V62',
    v62fechadeinicio: 'V62',
    v62fechadeiniciodelultimoesquema: 'V62',
    v62fechainicioultimoesquema: 'V62',
    v63: 'V63',
    v63numeroips: 'V63',
    v63numerodeips: 'V63',
    v63nmerodeips: 'V63',
    v63numerodeipsquesuministranelultimoesquema: 'V63',
    v63nmerodeipsquesuministranelultimoesquema: 'V63'
  };

  const ESTILO_ENCABEZADO_NORMAL = {
    font: { bold: true, color: { rgb: 'FFFFFF' } },
    fill: { fgColor: { rgb: '1F2937' } },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    border: bordeFino()
  };

  const ESTILO_ENCABEZADO_ERROR = {
    font: { bold: true, color: { rgb: '7F1D1D' } },
    fill: { fgColor: { rgb: 'FCA5A5' } },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    border: bordeFino()
  };

  const ESTILO_ENCABEZADO_ADVERTENCIA = {
    font: { bold: true, color: { rgb: '78350F' } },
    fill: { fgColor: { rgb: 'FDE68A' } },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    border: bordeFino()
  };

  const ESTILO_CELDA_ERROR = {
    fill: { fgColor: { rgb: 'FECACA' } },
    font: { color: { rgb: '7F1D1D' } },
    border: bordeFino(),
    alignment: { vertical: 'top', wrapText: true }
  };

  const ESTILO_CELDA_ADVERTENCIA = {
    fill: { fgColor: { rgb: 'FEF3C7' } },
    font: { color: { rgb: '78350F' } },
    border: bordeFino(),
    alignment: { vertical: 'top', wrapText: true }
  };

  const ESTILO_CELDA_NORMAL = {
    border: bordeFino(),
    alignment: { vertical: 'top', wrapText: true }
  };

  const ESTILO_TITULO_ERROR = {
    font: { bold: true, color: { rgb: '7F1D1D' } },
    fill: { fgColor: { rgb: 'FECACA' } },
    border: bordeFino(),
    alignment: { vertical: 'top', wrapText: true }
  };

  const ESTILO_TITULO_ADVERTENCIA = {
    font: { bold: true, color: { rgb: '78350F' } },
    fill: { fgColor: { rgb: 'FEF3C7' } },
    border: bordeFino(),
    alignment: { vertical: 'top', wrapText: true }
  };

  function bordeFino() {
    return {
      top: { style: 'thin', color: { rgb: 'D1D5DB' } },
      bottom: { style: 'thin', color: { rgb: 'D1D5DB' } },
      left: { style: 'thin', color: { rgb: 'D1D5DB' } },
      right: { style: 'thin', color: { rgb: 'D1D5DB' } }
    };
  }

  function texto(valor) {
    return String(valor ?? '').trim();
  }

  function limpiarClaveEncabezado(valor) {
    return String(valor ?? '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/g, '');
  }

  function normalizarVariableTecnica(valor) {
    const limpio = String(valor ?? '')
      .trim()
      .toUpperCase()
      .replace(/\./g, '_');

    return /^V\d+(?:_\d+)?$/.test(limpio) ? limpio : '';
  }

  function obtenerSeveridadHallazgo(hallazgo) {
    const severidad = String(hallazgo?.severidad || '').toLowerCase();
    const codigo = String(hallazgo?.codigo || '').toUpperCase();

    if (severidad === 'error' || codigo.includes('-ERROR-')) {
      return 'error';
    }

    if (severidad === 'advertencia' || codigo.includes('-ADVERTENCIA-') || codigo.includes('-WARNING-')) {
      return 'advertencia';
    }

    return 'advertencia';
  }

  function obtenerFilaExcelResultado(resultado) {
    const fila = Number(
      resultado?.indiceFilaExcel ??
      resultado?.filaExcel ??
      resultado?.__filaExcel ??
      resultado?.fila
    );

    return Number.isInteger(fila) && fila > 0 ? fila : '';
  }

  function obtenerVariableDesdeEncabezado(encabezado) {
    const variableTecnica = normalizarVariableTecnica(encabezado);
    if (variableTecnica) {
      return variableTecnica;
    }

    const valor = String(encabezado ?? '').trim().toUpperCase();
    const clave = limpiarClaveEncabezado(encabezado);
    const variableMapeada = MAPA_ENCABEZADOS_A_VARIABLES[clave];

    if (variableMapeada) {
      return variableMapeada;
    }

    // Subvariables reales de la plantilla CAC.
    // Ejemplos:
    // v461recibialafase... => V46_1
    // v468recibialafase... => V46_8
    // v531medicamentoadm1  => V53_1
    // v532medicamentoadm2  => V53_2
    const subvariable46 = clave.match(/^v46([1-8])(?:\D|$)/);
    if (subvariable46) {
      return `V46_${subvariable46[1]}`;
    }

    const subvariable53 = clave.match(/^v53([1-9])(?:\D|$)/);
    if (subvariable53) {
      return `V53_${subvariable53[1]}`;
    }

    // Variables simples V1, V2, V52, V53, etc.
    // Se ejecuta después de las subvariables para no convertir v532... en V532.
    const prefijoVariable = clave.match(/^v(\d{1,3})(?:\D|$)/);
    if (prefijoVariable) {
      const numero = Number(prefijoVariable[1]);
      if (numero >= 1 && numero <= 160) {
        return `V${numero}`;
      }
    }

    return valor;
  }

  function obtenerEncabezadoReal(variableOEncabezado) {
    const variable = obtenerVariableDesdeEncabezado(variableOEncabezado);
    return ENCABEZADOS_REALES[variable] || variableOEncabezado || '';
  }

  function obtenerNombreVariable(variable) {
    return NOMBRES_VARIABLES[variable] || variable || 'Dato relacionado';
  }

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
    return texto(nombre)
      .replace(/[\\/:*?"<>|]/g, '_')
      .replace(/\s+/g, '_')
      .substring(0, 60);
  }

  function datosRelacionadosComoTexto(hallazgo) {
    const datos = Array.isArray(hallazgo.datosRelacionados) && hallazgo.datosRelacionados.length > 0
      ? hallazgo.datosRelacionados
      : [
          {
            variable: hallazgo.variable,
            nombre: obtenerNombreVariable(hallazgo.variable),
            valor: hallazgo.valor
          }
        ];

    return datos.map((item) => {
      const etiqueta = item.variable
        ? `${item.variable} ${item.nombre || obtenerNombreVariable(item.variable)}`
        : item.nombre || 'Dato relacionado';

      const valor = texto(item.valor) || '(vacío)';
      const nota = item.nota ? ` (${item.nota})` : '';

      return `${etiqueta}: ${valor}${nota}`;
    }).join(' | ');
  }

  function columnasRevisarComoTexto(hallazgo) {
    const columnas = Array.isArray(hallazgo.columnasCorregir) && hallazgo.columnasCorregir.length > 0
      ? hallazgo.columnasCorregir
      : [hallazgo.variable].filter(Boolean);

    if (columnas.length === 0) {
      return 'Revisar la fila indicada.';
    }

    return columnas
      .map((columna) => `${columna} (${obtenerNombreVariable(columna)})`)
      .join(', ');
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
    return (resumen.resultados || []).map((resultado) => ({
      'Fila Excel': obtenerFilaExcelResultado(resultado),
      'Documento': resultado.documento,
      'Errores': resultado.errores,
      'Advertencias': resultado.advertencias,
      'Estado': resultado.estado
    }));
  }

  function crearMapaHallazgosPorFilaYColumna(resumen) {
    const mapa = {};
    const mapaEncabezados = {};

    (resumen.resultados || []).forEach((resultado) => {
      const filaExcel = obtenerFilaExcelResultado(resultado);

      if (!mapa[filaExcel]) {
        mapa[filaExcel] = {};
      }

      (resultado.hallazgos || []).forEach((hallazgo) => {
        const severidad = obtenerSeveridadHallazgo(hallazgo);

        const columnas = Array.isArray(hallazgo.columnasCorregir) && hallazgo.columnasCorregir.length > 0
          ? hallazgo.columnasCorregir
          : [hallazgo.variable].filter(Boolean);

        columnas.forEach((columna) => {
          if (!columna) return;

          const variable = obtenerVariableDesdeEncabezado(columna);
          const severidadActual = mapa[filaExcel][variable];

          if (severidadActual !== 'error') {
            mapa[filaExcel][variable] = severidad;
          }

          if (mapaEncabezados[variable] !== 'error') {
            mapaEncabezados[variable] = severidad;
          }
        });
      });
    });

    return {
      porFila: mapa,
      porEncabezado: mapaEncabezados
    };
  }

  function clonarMatrizOriginal(datosExcel) {
    const matrizFuente = Array.isArray(datosExcel?.matrizOriginal)
      ? datosExcel.matrizOriginal
      : null;

    if (matrizFuente && matrizFuente.length > 0) {
      return matrizFuente.map((fila) => Array.isArray(fila) ? [...fila] : [fila ?? '']);
    }

    // Fallback de compatibilidad: si el lector anterior no trae matrizOriginal,
    // reconstruye con las variables detectadas. No es el camino ideal, pero evita romper la exportación.
    const encabezadosOriginales = Array.isArray(datosExcel?.encabezados) ? datosExcel.encabezados : [];
    const encabezadosSalida = encabezadosOriginales.map(obtenerEncabezadoReal);
    const registros = Array.isArray(datosExcel?.filas) ? datosExcel.filas : [];

    const filas = registros.map((registro) => {
      if (Array.isArray(registro)) return registro;

      return encabezadosOriginales.map((encabezado) => {
        const variable = obtenerVariableDesdeEncabezado(encabezado);
        return registro?.[variable] ?? '';
      });
    });

    return [encabezadosSalida, ...filas];
  }


  // Variables que realmente son fechas dentro de la matriz CAC.
  // Todas las demás se exportan como texto para evitar que Excel convierta
  // códigos de catálogo como 98 en fechas visuales como 7/04/1900.
  const VARIABLES_FECHA_EXPORTACION = new Set([
    'V7', 'V16', 'V18', 'V19', 'V20', 'V23', 'V24', 'V26', 'V30', 'V32', 'V35', 'V39', 'V43', 'V49',
    'V58', 'V62', 'V71', 'V76', 'V80', 'V88', 'V94', 'V97', 'V103', 'V109', 'V112', 'V115', 'V118',
    'V121', 'V130', 'V131', 'V134'
  ]);

  function esVariableFechaExportacion(variable) {
    return VARIABLES_FECHA_EXPORTACION.has(String(variable || '').toUpperCase());
  }

  function serialExcelDesdeFecha(fecha) {
    if (!(fecha instanceof Date) || Number.isNaN(fecha.getTime())) {
      return '';
    }

    // SheetJS/Excel usan como base práctica 1899-12-30 para seriales.
    // Ejemplo: serial 98 se visualiza como 1900-04-07 cuando una celda queda con formato fecha.
    const base = Date.UTC(1899, 11, 30);
    const actual = Date.UTC(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
    return Math.round((actual - base) / 86400000);
  }

  function normalizarValorNoFechaParaExportacion(valor) {
    if (valor instanceof Date) {
      const serial = serialExcelDesdeFecha(valor);
      return serial === '' ? '' : String(serial);
    }

    if (valor === null || valor === undefined) {
      return '';
    }

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
        celda.t = 's';
        celda.v = valorNormalizado;
        celda.w = valorNormalizado;
        celda.z = '@';
      }
    });
  }

  function crearMapaColumnasPorVariable(datosExcel) {
    const mapa = {};

    if (Array.isArray(datosExcel?.mapeos)) {
      datosExcel.mapeos.forEach((mapeo) => {
        if (!mapeo || !mapeo.variable) return;

        const indice = Number(mapeo.indiceColumna);
        if (Number.isInteger(indice) && indice >= 0 && mapa[mapeo.variable] === undefined) {
          mapa[mapeo.variable] = indice;
        }
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

        if (Number.isInteger(columnaUnoBasada) && columnaUnoBasada > 0 && mapa[variable] === undefined) {
          mapa[variable] = columnaUnoBasada - 1;
        }
      });
    }

    if (Array.isArray(datosExcel?.encabezados)) {
      datosExcel.encabezados.forEach((encabezado, indice) => {
        const variable = obtenerVariableDesdeEncabezado(encabezado);
        if (/^V\d+(?:_\d+)?$/.test(variable) && mapa[variable] === undefined) {
          mapa[variable] = indice;
        }
      });
    }

    return mapa;
  }

  function asegurarCelda(hoja, filaIndice, columnaIndice, valor = '') {
    const celdaRef = XLSX.utils.encode_cell({ r: filaIndice, c: columnaIndice });

    if (!hoja[celdaRef]) {
      hoja[celdaRef] = { t: 's', v: valor };
    }

    return hoja[celdaRef];
  }

  function crearMatrizMarcada({ resumen, datosExcel }) {
    if (!datosExcel) {
      return null;
    }

    // Usa la matriz original leída desde Excel para conservar columnas, orden, filas superiores,
    // encabezados reales y valores tal como entraron. Solo se agregan estilos a las celdas con hallazgos.
    const matriz = clonarMatrizOriginal(datosExcel);

    if (!Array.isArray(matriz) || matriz.length === 0) {
      return null;
    }

    const hoja = XLSX.utils.aoa_to_sheet(matriz);
    const columnasPorVariable = crearMapaColumnasPorVariable(datosExcel);
    const filaEncabezadosIndice = Number.isInteger(datosExcel.filaEncabezadosIndice)
      ? datosExcel.filaEncabezadosIndice
      : Math.max(Number(datosExcel.filaEncabezados || 1) - 1, 0);

    // Corrección visual: evita que las variables de catálogo/código se exporten como fechas.
    // Ejemplo corregido: V36=98 ya no debe verse como 7/04/1900 en MATRIZ_MARCADA.
    forzarFormatoTextoEnVariablesNoFecha(hoja, columnasPorVariable, filaEncabezadosIndice);

    (resumen.resultados || []).forEach((resultado) => {
      const filaExcel = Number(obtenerFilaExcelResultado(resultado));

      if (!Number.isInteger(filaExcel) || filaExcel <= 0) return;

      const filaIndice = filaExcel - 1;

      (resultado.hallazgos || []).forEach((hallazgo) => {
        const severidad = obtenerSeveridadHallazgo(hallazgo);
        const estiloCelda = severidad === 'error' ? ESTILO_CELDA_ERROR : ESTILO_CELDA_ADVERTENCIA;
        const estiloEncabezado = severidad === 'error' ? ESTILO_ENCABEZADO_ERROR : ESTILO_ENCABEZADO_ADVERTENCIA;

        const columnas = Array.isArray(hallazgo.columnasCorregir) && hallazgo.columnasCorregir.length > 0
          ? hallazgo.columnasCorregir
          : [hallazgo.variable].filter(Boolean);

        columnas.forEach((columna) => {
          const variable = obtenerVariableDesdeEncabezado(columna);
          const columnaIndice = columnasPorVariable[variable];

          if (!Number.isInteger(columnaIndice) || columnaIndice < 0) return;

          const celdaDato = asegurarCelda(hoja, filaIndice, columnaIndice);
          const celdaEncabezado = asegurarCelda(hoja, filaEncabezadosIndice, columnaIndice);

          // Si una celda ya tenía error, no se degrada a advertencia.
          if (!celdaDato.__cacSeveridad || celdaDato.__cacSeveridad !== 'error') {
            celdaDato.s = estiloCelda;
            celdaDato.__cacSeveridad = severidad;
          }

          if (!celdaEncabezado.__cacSeveridad || celdaEncabezado.__cacSeveridad !== 'error') {
            celdaEncabezado.s = estiloEncabezado;
            celdaEncabezado.__cacSeveridad = severidad;
          }
        });
      });
    });

    Object.keys(hoja).forEach((clave) => {
      if (clave.startsWith('!')) return;
      if (hoja[clave] && hoja[clave].__cacSeveridad) {
        delete hoja[clave].__cacSeveridad;
      }
    });

    const totalColumnas = matriz.reduce((max, fila) => Math.max(max, Array.isArray(fila) ? fila.length : 0), 0);
    hoja['!cols'] = Array.from({ length: totalColumnas }, () => ({ wch: 18 }));

    if (hoja['!ref']) {
      hoja['!autofilter'] = { ref: hoja['!ref'] };
    }

    hoja['!freeze'] = { xSplit: 0, ySplit: filaEncabezadosIndice + 1 };

    return hoja;
  }

  function ajustarColumnas(hoja, anchos) {
    hoja['!cols'] = anchos.map((wch) => ({ wch }));
  }

  function aplicarEstiloBasicoTabla(hoja, tipoHoja) {
    if (!hoja['!ref']) return;

    const rango = XLSX.utils.decode_range(hoja['!ref']);

    for (let col = rango.s.c; col <= rango.e.c; col += 1) {
      const celdaRef = XLSX.utils.encode_cell({ r: 0, c: col });

      if (hoja[celdaRef]) {
        hoja[celdaRef].s = ESTILO_ENCABEZADO_NORMAL;
      }
    }

    for (let row = 1; row <= rango.e.r; row += 1) {
      for (let col = rango.s.c; col <= rango.e.c; col += 1) {
        const celdaRef = XLSX.utils.encode_cell({ r: row, c: col });

        if (!hoja[celdaRef]) continue;

        if (tipoHoja === 'error') {
          hoja[celdaRef].s = ESTILO_TITULO_ERROR;
        } else if (tipoHoja === 'advertencia') {
          hoja[celdaRef].s = ESTILO_TITULO_ADVERTENCIA;
        } else {
          hoja[celdaRef].s = ESTILO_CELDA_NORMAL;
        }
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
    if (typeof XLSX === 'undefined') {
      throw new Error('La librería XLSX no está disponible.');
    }

    if (!resumen || !Array.isArray(resumen.resultados)) {
      throw new Error('No hay resultados para exportar.');
    }

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

    if (hojaMatrizMarcada) {
      XLSX.utils.book_append_sheet(workbook, hojaMatrizMarcada, 'MATRIZ_MARCADA');
    }

    XLSX.utils.book_append_sheet(workbook, hojaPacientes, 'Pacientes');
    XLSX.utils.book_append_sheet(workbook, hojaErrores, 'Errores');
    XLSX.utils.book_append_sheet(workbook, hojaAdvertencias, 'Advertencias');
    XLSX.utils.book_append_sheet(workbook, hojaTodos, 'Todos los hallazgos');

    const nombreSeguroHoja = limpiarNombreArchivo(nombreHoja || 'hoja');
    const nombreSalida = `Reporte_CAC_${nombreSeguroHoja}_${fechaNombreArchivo()}.xlsx`;

    XLSX.writeFile(workbook, nombreSalida);
  }

  window.CACExportadorExcel = {
    VERSION_EXPORTADOR: 'sprint-3h-v66-exportador-02-encabezado-real',
    exportarReporte
  };
})();
