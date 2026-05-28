// =======================================================
// Validador CAC - lector/estructura.js
// Estructura acumulativa V1-V40
// Sprint 3A: V36-V40
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

  const VARIABLES_SPRINT_2C = ['V29'];

  const VARIABLES_SPRINT_2D = [
    'V30', 'V31', 'V32', 'V33'
  ];

  const VARIABLES_SPRINT_2E = [
    'V34', 'V35'
  ];

  const VARIABLES_SPRINT_3A = [
    'V36', 'V37', 'V38', 'V39', 'V40'
  ];

  const VARIABLES_HASTA_2A = [
    ...VARIABLES_SPRINT_1,
    ...VARIABLES_SPRINT_2A
  ];

  const VARIABLES_HASTA_2B = [
    ...VARIABLES_SPRINT_1,
    ...VARIABLES_SPRINT_2A,
    ...VARIABLES_SPRINT_2B
  ];

  const VARIABLES_HASTA_2C = [
    ...VARIABLES_SPRINT_1,
    ...VARIABLES_SPRINT_2A,
    ...VARIABLES_SPRINT_2B,
    ...VARIABLES_SPRINT_2C
  ];

  const VARIABLES_HASTA_2D = [
    ...VARIABLES_HASTA_2C,
    ...VARIABLES_SPRINT_2D
  ];

  const VARIABLES_HASTA_2E = [
    ...VARIABLES_HASTA_2D,
    ...VARIABLES_SPRINT_2E
  ];

  const VARIABLES_HASTA_3A = [
    ...VARIABLES_HASTA_2E,
    ...VARIABLES_SPRINT_3A
  ];

  const VARIABLES_ESPERADAS = VARIABLES_HASTA_3A;

  const MAPA_ENCABEZADOS = {
    v1: 'V1',
    v1primernombre: 'V1',
    primernombre: 'V1',

    v2: 'V2',
    v2segundonombre: 'V2',
    segundonombre: 'V2',

    v3: 'V3',
    v3primerapellido: 'V3',
    primerapellido: 'V3',

    v4: 'V4',
    v4segundoapellido: 'V4',
    segundoapellido: 'V4',

    v5: 'V5',
    v5tipoidentificacion: 'V5',
    v5tipodeidentificacion: 'V5',
    v5tipodeidentificacin: 'V5',
    tipoidentificacion: 'V5',
    tipodeidentificacion: 'V5',

    v6: 'V6',
    v6numeroidentificacion: 'V6',
    v6numerodeidentificacion: 'V6',
    v6nmerodeidentificacin: 'V6',
    numeroidentificacion: 'V6',
    numerodeidentificacion: 'V6',

    v7: 'V7',
    v7fechanacimiento: 'V7',
    v7fechadenacimiento: 'V7',
    fechanacimiento: 'V7',
    fechadenacimiento: 'V7',

    v8: 'V8',
    v8sexo: 'V8',
    sexo: 'V8',

    v9: 'V9',
    v9ocupacion: 'V9',
    v9ocupacin: 'V9',
    ocupacion: 'V9',

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
    v28gradodediferenciaciondeltumorsolidomaligno: 'V28',

    v29: 'V29',
    v29estadificacion: 'V29',
    v29primeraestadificacion: 'V29',
    v29estadificaciontnm: 'V29',
    v29estadificacionfigo: 'V29',
    v29primeradestadificacionbasadaentnmfigo: 'V29',
    v29primeraestadificacionbasadaentnmfigo: 'V29',
    v29sies: 'V29',
    v29siesuntumorsolido: 'V29',
    v29siestumorsolido: 'V29',
    v29siestumorsolidocualfuelaprimeraestadificacion: 'V29',
    v29siestumorsolidocualfuelaprimeraestadificacionbasadaentnmfigo: 'V29',
    v29siestumorsolidocualfuelaprimeraestadificacionbasadaentnmfigouotrascompatiblesconestanumeracionseguntumor: 'V29',
    siestumorsolidocualfuelaprimeraestadificacionbasadaentnmfigouotrascompatiblesconestanumeracionseguntumor: 'V29',
    siesuntumorsolidocualfuelaprimeraestadificacionbasadaentnmfigouotrascompatiblesconestanumeracionseguntumor: 'V29',

    v30: 'V30',
    v30fechaestadificacion: 'V30',
    v30fechadeestadificacion: 'V30',
    v30fechaenqueserealizoestaestadificacion: 'V30',
    v30fechaenqueserealizestaestadificacin: 'V30',
    fechaenqueserealizoestaestadificacion: 'V30',

    v31: 'V31',
    v31her2: 'V31',
    v31pruebaher2: 'V31',
    v31paracancerdemamaselelerealizoher2: 'V31',
    v31paracancerdemamaselelerealizolapruebaher2: 'V31',
    v31paracancerdemamaselelerealizoalusuarioapruebaher2antesdeliniciodeltratamiento: 'V31',
    paracancerdemamaselelerealizoalusuarioapruebaher2antesdeliniciodeltratamiento: 'V31',
    paracancerdemamaselelerealizoaesteusuariolapruebaher2llamadotambienreceptor2delfactordecrecimientoepidermicohumanotambienllamadoerbb2antesdeliniciodeltratamiento: 'V31',

    v32: 'V32',
    v32fechaher2: 'V32',
    v32fechapruebaher2: 'V32',
    v32fechaderealizacionher2: 'V32',
    v32fechaderealizaciondelaunicaultimapruebaher2: 'V32',
    v32paracancerdemamafechaderealizaciondelaunicaultimapruebaher2: 'V32',
    paracancerdemamafechaderealizaciondelaunicaultimapruebaher2: 'V32',

    v33: 'V33',
    v33resultadoher2: 'V33',
    v33resultadopruebaher2: 'V33',
    v33resultadodelaunicaultimapruebaher2: 'V33',
    v33paracancerdemamaresultadodelaunicaultimapruebaher2: 'V33',
    paracancerdemamaresultadodelaunicaultimapruebaher2: 'V33',

    v34: 'V34',
    v34dukes: 'V34',
    v34estadificaciondukes: 'V34',
    v34estadificaciondedukes: 'V34',
    v34paracancercolorrectalestadificaciondedukes: 'V34',
    paracancercolorrectalestadificaciondedukes: 'V34',
    paracancercolorrectalestadificaciondukes: 'V34',

    v35: 'V35',
    v35fechadukes: 'V35',
    v35fechaestadificaciondukes: 'V35',
    v35fechaestadificaciondedukes: 'V35',
    v35fechaenqueserealizolaestadificaciondedukes: 'V35',
    fechaenqueserealizolaestadificaciondedukes: 'V35',

    v36: 'V36',
    v36annarbor: 'V36',
    v36lugano: 'V36',
    v36estadificacionclinica: 'V36',
    v36estadificacionclinicaannarborlugano: 'V36',
    v36estadificacionclinicaenlinfomanohodgkinlinfomahodgkinadultoypediatricoannaborlugano: 'V36',
    estadificacionclinicaenlinfomanohodgkinlinfomahodgkinadultoypediatricoannarborlugano: 'V36',

    v37: 'V37',
    v37gleason: 'V37',
    v37clasificaciongleason: 'V37',
    v37valordeclasificaciongleason: 'V37',
    v37paracancerdeprostatavalordeclasificaciondelaescalagleason: 'V37',
    paracancerdeprostatavalordeclasificaciondelaescalagleason: 'V37',

    v38: 'V38',
    v38riesgo: 'V38',
    v38clasificacionriesgo: 'V38',
    v38clasificaciondelriesgo: 'V38',
    v38clasificaciondelriesgoleucemiaslinfomasmielomamultiple: 'V38',
    clasificaciondelriesgoleucemiaslinfomasmielomamultiple: 'V38',

    v39: 'V39',
    v39fechariesgo: 'V39',
    v39fechaclasificacionriesgo: 'V39',
    v39fechadeclasificacionderiesgo: 'V39',
    fechadeclasificacionderiesgo: 'V39',

    v40: 'V40',
    v40objetivo: 'V40',
    v40objetivotratamiento: 'V40',
    v40objetivodeltratamiento: 'V40',
    v40objetivointenciontratamiento: 'V40',
    v40objetivointenciondeltratamientomedicoinicial: 'V40',
    objetivointenciondeltratamientomedicoinicial: 'V40'

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

  function esEncabezadoV29(valor) {
    const limpio = limpiarEncabezado(valor);

    if (limpio === 'v29' || limpio === '29') return true;

    return (
      limpio.includes('siestumorsolido') &&
      limpio.includes('primeraestadificacion') &&
      limpio.includes('tnm') &&
      limpio.includes('figo') &&
      limpio.includes('compatibles') &&
      limpio.includes('numeracion') &&
      limpio.includes('tumor')
    );
  }

  function esEncabezadoV30(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v30' || limpio === '30') return true;
    return limpio.includes('fecha') && limpio.includes('realiz') && limpio.includes('estadificacion');
  }

  function esEncabezadoV31(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v31' || limpio === '31') return true;
    return limpio.includes('her2') && limpio.includes('tratamiento') && (limpio.includes('realizo') || limpio.includes('realiz'));
  }

  function esEncabezadoV32(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v32' || limpio === '32') return true;
    return limpio.includes('fecha') && limpio.includes('her2') && (limpio.includes('realizacion') || limpio.includes('realizacin') || limpio.includes('realiz'));
  }

  function esEncabezadoV33(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v33' || limpio === '33') return true;
    return limpio.includes('resultado') && limpio.includes('her2');
  }

  function esEncabezadoV34(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v34' || limpio === '34') return true;
    return limpio.includes('colorrectal') && limpio.includes('dukes');
  }

  function esEncabezadoV35(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v35' || limpio === '35') return true;
    return limpio.includes('fecha') && limpio.includes('dukes');
  }


  function esEncabezadoV36(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v36' || limpio === '36') return true;
    return (limpio.includes('annarbor') || limpio.includes('lugano')) && (limpio.includes('linfoma') || limpio.includes('mieloma') || limpio.includes('estadificacion'));
  }

  function esEncabezadoV37(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v37' || limpio === '37') return true;
    return limpio.includes('gleason') && (limpio.includes('prostata') || limpio.includes('clasificacion') || limpio.includes('escala'));
  }

  function esEncabezadoV38(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v38' || limpio === '38') return true;
    return limpio.includes('clasificacion') && limpio.includes('riesgo');
  }

  function esEncabezadoV39(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v39' || limpio === '39') return true;
    return limpio.includes('fecha') && limpio.includes('clasificacion') && limpio.includes('riesgo');
  }

  function esEncabezadoV40(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v40' || limpio === '40') return true;
    return (limpio.includes('objetivo') || limpio.includes('intencion')) && limpio.includes('tratamiento');
  }

  function extraerVariableDesdeEncabezado(valor) {
    const limpio = limpiarEncabezado(valor);
    const coincidencia = limpio.match(/^v(\d{1,3})/);

    if (!coincidencia) return null;

    const numero = Number(coincidencia[1]);

    if (!Number.isInteger(numero) || numero < 1 || numero > 40) {
      return null;
    }

    const variable = `V${numero}`;
    return VARIABLES_ESPERADAS.includes(variable) ? variable : null;
  }

  function normalizarEncabezado(valor) {
    const original = String(valor ?? '').trim().toUpperCase();

    if (VARIABLES_ESPERADAS.includes(original)) return original;

    if (esEncabezadoV29(valor)) return 'V29';
    if (esEncabezadoV30(valor)) return 'V30';
    if (esEncabezadoV31(valor)) return 'V31';
    if (esEncabezadoV32(valor)) return 'V32';
    if (esEncabezadoV33(valor)) return 'V33';
    if (esEncabezadoV34(valor)) return 'V34';
    if (esEncabezadoV35(valor)) return 'V35';
    if (esEncabezadoV36(valor)) return 'V36';
    if (esEncabezadoV37(valor)) return 'V37';
    if (esEncabezadoV38(valor)) return 'V38';
    if (esEncabezadoV39(valor)) return 'V39';
    if (esEncabezadoV40(valor)) return 'V40';

    const claveLimpia = limpiarEncabezado(valor);

    if (MAPA_ENCABEZADOS[claveLimpia]) return MAPA_ENCABEZADOS[claveLimpia];

    const variableDetectada = extraerVariableDesdeEncabezado(valor);

    return variableDetectada || original;
  }

  function resolverVariablesEsperadasDinamicas(encabezadosNormalizados) {
    const presentes = encabezadosNormalizados.filter((variable) =>
      VARIABLES_ESPERADAS.includes(variable)
    );

    const tiene3A = VARIABLES_SPRINT_3A.some((variable) => presentes.includes(variable));
    const tiene2E = VARIABLES_SPRINT_2E.some((variable) => presentes.includes(variable));
    const tiene2D = VARIABLES_SPRINT_2D.some((variable) => presentes.includes(variable));
    const tiene2C = VARIABLES_SPRINT_2C.some((variable) => presentes.includes(variable));
    const tiene2B = VARIABLES_SPRINT_2B.some((variable) => presentes.includes(variable));
    const tiene2A = VARIABLES_SPRINT_2A.some((variable) => presentes.includes(variable));

    if (tiene3A) {
      return {
        modo: 'ACUMULATIVO_V1_V40',
        variables: VARIABLES_HASTA_3A
      };
    }

    if (tiene2E) {
      return {
        modo: 'ACUMULATIVO_V1_V35',
        variables: VARIABLES_HASTA_2E
      };
    }

    if (tiene2D) {
      return {
        modo: 'ACUMULATIVO_V1_V33',
        variables: VARIABLES_HASTA_2D
      };
    }

    if (tiene2C) {
      return {
        modo: 'ACUMULATIVO_V1_V29',
        variables: VARIABLES_HASTA_2C
      };
    }

    if (tiene2B) {
      return {
        modo: 'ACUMULATIVO_V1_V28',
        variables: VARIABLES_HASTA_2B
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
    return validarEstructura(encabezados);
  }

  function validarEstructuraSprint2A(encabezados) {
    return validarEstructura(encabezados);
  }

  function validarEstructuraSprint2B(encabezados) {
    return validarEstructura(encabezados);
  }

  function validarEstructuraSprint2C(encabezados) {
    return validarEstructura(encabezados);
  }

  function validarEstructuraSprint2D(encabezados) {
    return validarEstructura(encabezados);
  }

  function validarEstructuraSprint2E(encabezados) {
    return validarEstructura(encabezados);
  }

  function validarEstructuraSprint3A(encabezados) {
    return validarEstructura(encabezados);
  }

  window.CACEstructura = {
    VARIABLES_SPRINT_1,
    VARIABLES_SPRINT_2A,
    VARIABLES_SPRINT_2B,
    VARIABLES_SPRINT_2C,
    VARIABLES_SPRINT_2D,
    VARIABLES_SPRINT_2E,
    VARIABLES_SPRINT_3A,
    VARIABLES_HASTA_2A,
    VARIABLES_HASTA_2B,
    VARIABLES_HASTA_2C,
    VARIABLES_HASTA_2D,
    VARIABLES_HASTA_2E,
    VARIABLES_HASTA_3A,
    VARIABLES_ESPERADAS,
    MAPA_ENCABEZADOS,
    MAPA_ENCABEZADOS_SPRINT_1,
    limpiarEncabezado,
    esEncabezadoV29,
    esEncabezadoV30,
    esEncabezadoV31,
    esEncabezadoV32,
    esEncabezadoV33,
    esEncabezadoV34,
    esEncabezadoV35,
    esEncabezadoV36,
    esEncabezadoV37,
    esEncabezadoV38,
    esEncabezadoV39,
    esEncabezadoV40,
    extraerVariableDesdeEncabezado,
    normalizarEncabezado,
    resolverVariablesEsperadasDinamicas,
    validarEstructura,
    validarEstructuraSprint1,
    validarEstructuraSprint2A,
    validarEstructuraSprint2B,
    validarEstructuraSprint2C,
    validarEstructuraSprint2D,
    validarEstructuraSprint2E,
    validarEstructuraSprint3A
  };
})();
