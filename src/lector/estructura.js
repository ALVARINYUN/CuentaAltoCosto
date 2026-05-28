// =======================================================
// Validador CAC - lector/estructura.js
// Estructura acumulativa V1-V42
// Sprint 3B: V41-V42
// =======================================================

(function () {
  'use strict';

  const VERSION = 'sprint-3b-v42-estructura-01';

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

  const VARIABLES_SPRINT_3B = [
    'V41', 'V42'
  ];

  const VARIABLES_HASTA_2A = [
    ...VARIABLES_SPRINT_1,
    ...VARIABLES_SPRINT_2A
  ];

  const VARIABLES_HASTA_2B = [
    ...VARIABLES_HASTA_2A,
    ...VARIABLES_SPRINT_2B
  ];

  const VARIABLES_HASTA_2C = [
    ...VARIABLES_HASTA_2B,
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

  const VARIABLES_HASTA_3B = [
    ...VARIABLES_HASTA_3A,
    ...VARIABLES_SPRINT_3B
  ];

  const VARIABLES_ESPERADAS = VARIABLES_HASTA_3B;

  const MAPA_ENCABEZADOS = {
    v1: 'V1', primernombre: 'V1', v1primernombre: 'V1',
    v2: 'V2', segundonombre: 'V2', v2segundonombre: 'V2',
    v3: 'V3', primerapellido: 'V3', v3primerapellido: 'V3',
    v4: 'V4', segundoapellido: 'V4', v4segundoapellido: 'V4',
    v5: 'V5', tipoidentificacion: 'V5', tipodeidentificacion: 'V5', v5tipoidentificacion: 'V5', v5tipodeidentificacion: 'V5',
    v6: 'V6', numeroidentificacion: 'V6', numerodeidentificacion: 'V6', v6numeroidentificacion: 'V6', v6numerodeidentificacion: 'V6',
    v7: 'V7', fechanacimiento: 'V7', fechadenacimiento: 'V7', v7fechanacimiento: 'V7', v7fechadenacimiento: 'V7',
    v8: 'V8', sexo: 'V8', v8sexo: 'V8',
    v9: 'V9', ocupacion: 'V9', v9ocupacion: 'V9', v9ocupacin: 'V9',
    v10: 'V10', regimenafiliacion: 'V10', regimendeafiliacion: 'V10', v10regimenafiliacion: 'V10', v10regimendeafiliacion: 'V10',
    v11: 'V11', eps: 'V11', eapb: 'V11', codigoeapb: 'V11', v11eps: 'V11', v11eapb: 'V11', v11codigoeapb: 'V11',
    v12: 'V12', pertenenciaetnica: 'V12', codigopertenenciaetnica: 'V12', v12pertenenciaetnica: 'V12',
    v13: 'V13', grupopoblacional: 'V13', v13grupopoblacional: 'V13',
    v14: 'V14', municipioresidencia: 'V14', municipioderesidencia: 'V14', v14municipioresidencia: 'V14',
    v15: 'V15', telefono: 'V15', numerotelefonico: 'V15', v15telefono: 'V15', v15numerotelefonico: 'V15',
    v16: 'V16', fechadeafiliacion: 'V16', v16fechadeafiliacion: 'V16',
    v17: 'V17', cie10: 'V17', codigocie10: 'V17', v17cie10: 'V17', v17codigocie10: 'V17', codigocie10delaneoplasiamalignareportada: 'V17',
    v18: 'V18', fechadiagnostico: 'V18', fechadediagnostico: 'V18', fechadediagnosticodelcancerreportado: 'V18', v18fechadediagnosticodelcancerreportado: 'V18',
    v19: 'V19', fechanotaremision: 'V19', fechanotaremisionointerconsulta: 'V19', v19fechanotaremisionointerconsulta: 'V19',
    v20: 'V20', fechaingreso: 'V20', fechaingresoinstituciondiagnostica: 'V20', v20fechaingresoinstituciondiagnostica: 'V20',
    v21: 'V21', tipoestudio: 'V21', tipodeestudio: 'V21', v21tipoestudio: 'V21',
    v22: 'V22', motivosinhistopatologia: 'V22', v22motivosinhistopatologia: 'V22',
    v23: 'V23', fecharecoleccionmuestra: 'V23', fecharecoleccionmuestrahistopatologica: 'V23', v23fecharecoleccionmuestrahistopatologica: 'V23',
    v24: 'V24', fechainformehistopatologico: 'V24', v24fechainformehistopatologico: 'V24',
    v25: 'V25', ips: 'V25', codigoips: 'V25', codigohabilitacionips: 'V25', v25codigoips: 'V25',
    v26: 'V26', fechaprimeraconsulta: 'V26', fechadeprimeraconsulta: 'V26', v26fechaprimeraconsulta: 'V26',
    v27: 'V27', histologia: 'V27', histologiatumor: 'V27', histologiadeltumor: 'V27', v27histologia: 'V27',
    v28: 'V28', grado: 'V28', gradodiferenciacion: 'V28', gradodediferenciacion: 'V28', v28grado: 'V28',
    v29: 'V29', estadificacion: 'V29', primeraestadificacion: 'V29', estadificaciontnm: 'V29', estadificacionfigo: 'V29', v29estadificacion: 'V29',
    v30: 'V30', fechaestadificacion: 'V30', fechadeestadificacion: 'V30', v30fechaestadificacion: 'V30',
    v31: 'V31', her2: 'V31', pruebaher2: 'V31', v31her2: 'V31',
    v32: 'V32', fechaher2: 'V32', fechapruebaher2: 'V32', v32fechaher2: 'V32',
    v33: 'V33', resultadoher2: 'V33', resultadopruebaher2: 'V33', v33resultadoher2: 'V33',
    v34: 'V34', dukes: 'V34', estadificaciondukes: 'V34', estadificaciondedukes: 'V34', v34dukes: 'V34',
    v35: 'V35', fechadukes: 'V35', fechaestadificaciondukes: 'V35', v35fechadukes: 'V35',
    v36: 'V36', annarbor: 'V36', lugano: 'V36', estadificacionclinica: 'V36', estadificacionclinicaannarborlugano: 'V36', v36annarbor: 'V36', v36lugano: 'V36',
    v37: 'V37', gleason: 'V37', clasificaciongleason: 'V37', v37gleason: 'V37',
    v38: 'V38', riesgo: 'V38', clasificacionriesgo: 'V38', clasificaciondelriesgo: 'V38', v38riesgo: 'V38',
    v39: 'V39', fechariesgo: 'V39', fechaclasificacionriesgo: 'V39', fechadeclasificacionderiesgo: 'V39', v39fechariesgo: 'V39',
    v40: 'V40', objetivo: 'V40', objetivotratamiento: 'V40', objetivodeltratamiento: 'V40', objetivointenciontratamiento: 'V40', objetivointenciondeltratamientomedicoinicial: 'V40', v40objetivo: 'V40',
    v41: 'V41', intervencion: 'V41', intervencionmedica: 'V41', intervencionduranteperiodo: 'V41', intervencionduranteelperiododereporte: 'V41', intervencionmedicaduranteperiododereporte: 'V41', intervencionmedicaduranteelperiododereporte: 'V41', v41intervencion: 'V41', v41intervencionmedica: 'V41', v41intervencionmedicaduranteelperiododereporte: 'V41',
    v42: 'V42', antecedente: 'V42', otrocancerprimario: 'V42', antecedenteotrocancerprimario: 'V42', antecedentedeotrocancerprimario: 'V42', tienecancerprimario: 'V42', tieneantecedenteotrocancerprimario: 'V42', tieneantecedenteopadeceotrocancerprimario: 'V42', v42antecedente: 'V42', v42otrocancerprimario: 'V42', v42antecedentedeotrocancerprimario: 'V42', v42tieneantecedenteopadeceotrocancerprimario: 'V42'
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

  function contieneTodos(limpio, palabras) {
    return palabras.every((palabra) => limpio.includes(palabra));
  }

  function esEncabezadoV29(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v29' || limpio === '29') return true;
    return contieneTodos(limpio, ['tumor', 'solido', 'primera', 'estadificacion']);
  }

  function esEncabezadoV30(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v30' || limpio === '30') return true;
    return limpio.includes('fecha') && limpio.includes('estadificacion');
  }

  function esEncabezadoV31(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v31' || limpio === '31') return true;
    return limpio.includes('her2') && limpio.includes('tratamiento');
  }

  function esEncabezadoV32(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v32' || limpio === '32') return true;
    return limpio.includes('fecha') && limpio.includes('her2');
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

  function esEncabezadoV41(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v41' || limpio === '41') return true;
    return limpio.includes('intervencion') && (limpio.includes('medica') || limpio.includes('periodo') || limpio.includes('reporte'));
  }

  function esEncabezadoV42(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v42' || limpio === '42') return true;
    return (limpio.includes('antecedente') || limpio.includes('padece') || limpio.includes('tuvo')) && limpio.includes('cancer') && limpio.includes('primario');
  }

  function extraerVariableDesdeEncabezado(valor) {
    const limpio = limpiarEncabezado(valor);
    const coincidencia = limpio.match(/^v(\d{1,3})/);

    if (!coincidencia) return null;

    const numero = Number(coincidencia[1]);

    if (!Number.isInteger(numero) || numero < 1 || numero > 42) {
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
    if (esEncabezadoV41(valor)) return 'V41';
    if (esEncabezadoV42(valor)) return 'V42';

    const claveLimpia = limpiarEncabezado(valor);

    if (MAPA_ENCABEZADOS[claveLimpia]) return MAPA_ENCABEZADOS[claveLimpia];

    const variableDetectada = extraerVariableDesdeEncabezado(valor);

    return variableDetectada || original;
  }

  function resolverVariablesEsperadasDinamicas(encabezadosNormalizados) {
    const presentes = encabezadosNormalizados.filter((variable) =>
      VARIABLES_ESPERADAS.includes(variable)
    );

    const tiene3B = VARIABLES_SPRINT_3B.some((variable) => presentes.includes(variable));
    const tiene3A = VARIABLES_SPRINT_3A.some((variable) => presentes.includes(variable));
    const tiene2E = VARIABLES_SPRINT_2E.some((variable) => presentes.includes(variable));
    const tiene2D = VARIABLES_SPRINT_2D.some((variable) => presentes.includes(variable));
    const tiene2C = VARIABLES_SPRINT_2C.some((variable) => presentes.includes(variable));
    const tiene2B = VARIABLES_SPRINT_2B.some((variable) => presentes.includes(variable));
    const tiene2A = VARIABLES_SPRINT_2A.some((variable) => presentes.includes(variable));

    if (tiene3B) {
      return {
        modo: 'ACUMULATIVO_V1_V42',
        variables: VARIABLES_HASTA_3B
      };
    }

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

  function validarEstructuraSprint1(encabezados) { return validarEstructura(encabezados); }
  function validarEstructuraSprint2A(encabezados) { return validarEstructura(encabezados); }
  function validarEstructuraSprint2B(encabezados) { return validarEstructura(encabezados); }
  function validarEstructuraSprint2C(encabezados) { return validarEstructura(encabezados); }
  function validarEstructuraSprint2D(encabezados) { return validarEstructura(encabezados); }
  function validarEstructuraSprint2E(encabezados) { return validarEstructura(encabezados); }
  function validarEstructuraSprint3A(encabezados) { return validarEstructura(encabezados); }
  function validarEstructuraSprint3B(encabezados) { return validarEstructura(encabezados); }

  window.CACEstructura = {
    version: VERSION,
    VARIABLES_SPRINT_1,
    VARIABLES_SPRINT_2A,
    VARIABLES_SPRINT_2B,
    VARIABLES_SPRINT_2C,
    VARIABLES_SPRINT_2D,
    VARIABLES_SPRINT_2E,
    VARIABLES_SPRINT_3A,
    VARIABLES_SPRINT_3B,
    VARIABLES_HASTA_2A,
    VARIABLES_HASTA_2B,
    VARIABLES_HASTA_2C,
    VARIABLES_HASTA_2D,
    VARIABLES_HASTA_2E,
    VARIABLES_HASTA_3A,
    VARIABLES_HASTA_3B,
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
    esEncabezadoV41,
    esEncabezadoV42,
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
    validarEstructuraSprint3A,
    validarEstructuraSprint3B
  };
})();
