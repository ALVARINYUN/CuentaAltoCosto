// =======================================================
// Validador CAC - lector/estructura.js
// Estructura acumulativa V1-V28 con encabezados reales.
// Reconoce encabezados como v1primernombre, v2segundonombre...
// Ignora correctamente V29+ para no confundir v29 con V2,
// v39 con V3, v109 con V10, etc.
// Si el archivo trae menos variables, valida solo hasta las presentes.
// =======================================================

(function () {
  'use strict';

  const VARIABLES_SPRINT_1 = [
    'V1', 'V2', 'V3', 'V4',
    'V5', 'V6', 'V7', 'V8',
    'V9', 'V10', 'V11', 'V12',
    'V13', 'V14', 'V15', 'V16'
  ];

  const VARIABLES_SPRINT_2A = [
    'V17', 'V18', 'V19', 'V20',
    'V21', 'V22', 'V23', 'V24'
  ];

  const VARIABLES_SPRINT_2B = [
    'V25', 'V26', 'V27', 'V28'
  ];

  const VARIABLES_HASTA_2A = [
    ...VARIABLES_SPRINT_1,
    ...VARIABLES_SPRINT_2A
  ];

  const VARIABLES_ESPERADAS = [
    ...VARIABLES_SPRINT_1,
    ...VARIABLES_SPRINT_2A,
    ...VARIABLES_SPRINT_2B
  ];

  const MAPA_ENCABEZADOS = {
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
    v10regimenafiliacion: 'V10',
    v10regimendeafiliacion: 'V10',
    v10regimenafiliacionsgsss: 'V10',
    v10regimendeafiliacionsgsss: 'V10',
    v10rgimendeafiliacinalsgsss: 'V10',

    v11: 'V11',
    v11eps: 'V11',
    v11eapb: 'V11',
    v11codigoeapb: 'V11',
    v11codigoeapboentidadterritorial: 'V11',

    v12: 'V12',
    v12pertenenciaetnica: 'V12',
    v12codigopertenenciaetnica: 'V12',
    v12cdigopertenenciatnica: 'V12',

    v13: 'V13',
    v13grupopoblacional: 'V13',

    v14: 'V14',
    v14municipioresidencia: 'V14',
    v14municipioderesidencia: 'V14',

    v15: 'V15',
    v15telefono: 'V15',
    v15numerotelefonico: 'V15',
    v15numerotelefonicodelpaciente: 'V15',
    v15numerotelefonicodelpacienteincl: 'V15',
    v15nmerotelefnicodelpacienteincl: 'V15',

    v16: 'V16',
    v16fechadeafiliacion: 'V16',
    v16fechadeafiliacionlaeapbalregimen: 'V16',
    v16fechadeafiliacinalaeapbquerep: 'V16',

    v17: 'V17',
    v17cie10: 'V17',
    v17codigocie10: 'V17',
    v17codigocie10delaneoplasia: 'V17',
    v17codigocie10delaneoplasiamalignareportada: 'V17',
    v17codigocie10delaneoplasiamalignareportadaprimario: 'V17',
    v17codigocie10delaneoplasiacancerotumormalignareportadaprimario: 'V17',
    v17cdigocie10delaneoplasiacancerotumormalignareportadaprimario: 'V17',

    v18: 'V18',
    v18fechadiagnostico: 'V18',
    v18fechadediagnostico: 'V18',
    v18fechadediagnosticodelcancer: 'V18',
    v18fechadediagnosticodelcancerreportado: 'V18',
    v18fechadediagnsticodelcncerrepo: 'V18',
    v18fechadediagnsticodelcncerreportado: 'V18',

    v19: 'V19',
    v19fechanotaremision: 'V19',
    v19fechanotaremisionointerconsulta: 'V19',
    v19fechadelanotaderemision: 'V19',
    v19fechadelanotaderemisionointerconsulta: 'V19',
    v19fechadelanotaderemisindelmdic: 'V19',
    v19fechadelanotaderemisinointerconsultadelmdicooinstitucingeneralhacialainstitucinomdicoquehizoeldiagnstico: 'V19',

    v20: 'V20',
    v20fechaingreso: 'V20',
    v20fechaingresoinstituciondiagnostica: 'V20',
    v20fechadeingresoalainstitucion: 'V20',
    v20fechadeingresoalainstitucionquerealizoeldiagnostico: 'V20',
    v20fechadeingresoalainstitucinqu: 'V20',
    v20fechadeingresoalainstitucinquerealizeldiagnsticoluegodelaremisinointerconsulta: 'V20',

    v21: 'V21',
    v21tipoestudio: 'V21',
    v21tipodeestudio: 'V21',
    v21tipodeestudioconelqueserealizoeldiagnostico: 'V21',
    v21tipodeestudioconelqueserealiz: 'V21',
    v21tipodeestudioconelqueserealizeldiagnsticodecncer: 'V21',

    v22: 'V22',
    v22motivosinhistopatologia: 'V22',
    v22motivoporelcualnotuvodiagnosticoporhistopatologia: 'V22',
    v22motivoporelcualelusuarionotuv: 'V22',
    v22motivoporelcualelusuarionotuvodiagnsticoporhistopatologa: 'V22',

    v23: 'V23',
    v23fecharecoleccionmuestra: 'V23',
    v23fecharecoleccionmuestrahistopatologica: 'V23',
    v23fechaderecolecciondemuestra: 'V23',
    v23fechaderecoleccindemuestrapar: 'V23',
    v23fechaderecolecciondemuestraparaestudiohistopatologicodediagnostico: 'V23',
    v23fechaderecoleccindemuestraparaestudiohistopatolgicodediagnstico: 'V23',

    v24: 'V24',
    v24fechainformehistopatologico: 'V24',
    v24fechadeinformehistopatolgicov: 'V24',
    v24fechadeprimerounicoinformehistopatologico: 'V24',
    v24fechadeprimerounicoinformehistopatologicovalidodediagnostico: 'V24',
    v24fechadeprimeronicoinformehistopatolgicovlidodediagnstico: 'V24',

    v25: 'V25',
    v25ips: 'V25',
    v25codigoips: 'V25',
    v25codigoipshabilitacion: 'V25',
    v25codigohabilitacionips: 'V25',
    v25codigovalidohabilitacionips: 'V25',
    v25codigovalidodehabilitacionips: 'V25',
    v25codigovalidodehabilitaciondelaips: 'V25',
    v25codigovalidodehabilitaciondelaip: 'V25',
    v25cdigovlidodehabilitacindelaip: 'V25',
    v25cdigovlidodehabilitacindelaips: 'V25',
    v25cdigovlidodehabilitacindelaipsdondeserealizalaconfirmacindiagnstica: 'V25',

    v26: 'V26',
    v26fechaprimeraconsulta: 'V26',
    v26fechadeprimeraconsulta: 'V26',
    v26fechadeprimeraconsultaconmedico: 'V26',
    v26fechadeprimeraconsultaconmdic: 'V26',
    v26fechadeprimeraconsultaconmedicotratante: 'V26',
    v26fechadeprimeraconsultaconmdicotratantedelaenfermedadmaligna: 'V26',

    v27: 'V27',
    v27histologia: 'V27',
    v27histologiatumor: 'V27',
    v27histologiadeltumor: 'V27',
    v27histologiadeltumorenmuestra: 'V27',
    v27histologadeltumorenmuestradeb: 'V27',
    v27histologiadeltumorenmuestradebiopsia: 'V27',
    v27histologadeltumorenmuestradebiopsiaoquirrgica: 'V27',

    v28: 'V28',
    v28grado: 'V28',
    v28gradodiferenciacion: 'V28',
    v28gradodediferenciacion: 'V28',
    v28gradodediferenciacindeltumors: 'V28',
    v28gradodediferenciaciondeltumor: 'V28',
    v28gradodediferenciacindeltumorslidomaligno: 'V28',
    v28gradodediferenciaciondeltumorsolidomaligno: 'V28'
  };

  const MAPA_ENCABEZADOS_SPRINT_1 = MAPA_ENCABEZADOS;

  function limpiarEncabezado(valor) {
    return String(valor ?? '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/g, '');
  }

  function extraerVariableDesdeEncabezado(valor) {
    const limpio = limpiarEncabezado(valor);

    // Importante:
    // Primero se captura TODO el número que viene después de "v".
    // Así "v29..." se lee como 29 y se ignora, no como V2.
    // También evita que "v109..." se lea como V10.
    const coincidencia = limpio.match(/^v(\d{1,3})/);

    if (!coincidencia) return null;

    const numero = Number(coincidencia[1]);

    if (!Number.isInteger(numero) || numero < 1 || numero > 28) {
      return null;
    }

    const variable = `V${numero}`;
    return VARIABLES_ESPERADAS.includes(variable) ? variable : null;
  }

  function normalizarEncabezado(valor) {
    const original = String(valor ?? '').trim().toUpperCase();

    if (VARIABLES_ESPERADAS.includes(original)) return original;

    const claveLimpia = limpiarEncabezado(valor);

    if (MAPA_ENCABEZADOS[claveLimpia]) return MAPA_ENCABEZADOS[claveLimpia];

    const variableDetectada = extraerVariableDesdeEncabezado(valor);

    return variableDetectada || original;
  }

  function resolverVariablesEsperadasDinamicas(encabezadosNormalizados) {
    const presentes = encabezadosNormalizados.filter((variable) =>
      VARIABLES_ESPERADAS.includes(variable)
    );

    const tiene2B = VARIABLES_SPRINT_2B.some((variable) => presentes.includes(variable));
    const tiene2A = VARIABLES_SPRINT_2A.some((variable) => presentes.includes(variable));

    if (tiene2B) {
      return {
        modo: 'ACUMULATIVO_V1_V28',
        variables: VARIABLES_ESPERADAS
      };
    }

    if (tiene2A) {
      return {
        modo: 'ACUMULATIVO_V1_V24',
        variables: VARIABLES_HASTA_2A
      };
    }

    return {
      modo: 'ACUMULATIVO_V1_V16',
      variables: VARIABLES_SPRINT_1
    };
  }

  function validarEstructura(encabezados, variablesEsperadas = null, modo = null) {
    const encabezadosNormalizados = encabezados.map(normalizarEncabezado);
    const resolucion = resolverVariablesEsperadasDinamicas(encabezadosNormalizados);
    const variablesObjetivo = Array.isArray(variablesEsperadas) ? variablesEsperadas : resolucion.variables;
    const modoFinal = modo || resolucion.modo;

    const faltantes = variablesObjetivo.filter((variable) => !encabezadosNormalizados.includes(variable));
    const reconocidas = variablesObjetivo.filter((variable) => encabezadosNormalizados.includes(variable));

    return {
      esValida: faltantes.length === 0,
      modo: modoFinal,
      variablesEsperadas: variablesObjetivo,
      variablesReconocidas: reconocidas,
      variablesFaltantes: faltantes,
      totalReconocidas: reconocidas.length,
      totalEsperadas: variablesObjetivo.length,
      encabezadosNormalizados
    };
  }

  function validarEstructuraSprint1(encabezados) {
    // Compatibilidad con main.js anterior:
    // Aunque el nombre diga Sprint1, la estructura se resuelve dinámicamente.
    return validarEstructura(encabezados);
  }

  function validarEstructuraSprint2A(encabezados) {
    return validarEstructura(encabezados);
  }

  function validarEstructuraSprint2B(encabezados) {
    return validarEstructura(encabezados);
  }

  window.CACEstructura = {
    VARIABLES_SPRINT_1,
    VARIABLES_SPRINT_2A,
    VARIABLES_SPRINT_2B,
    VARIABLES_HASTA_2A,
    VARIABLES_ESPERADAS,
    MAPA_ENCABEZADOS,
    MAPA_ENCABEZADOS_SPRINT_1,
    limpiarEncabezado,
    extraerVariableDesdeEncabezado,
    normalizarEncabezado,
    resolverVariablesEsperadasDinamicas,
    validarEstructura,
    validarEstructuraSprint1,
    validarEstructuraSprint2A,
    validarEstructuraSprint2B
  };
})();
