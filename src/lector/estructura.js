// =======================================================
// Validador CAC - lector/estructura.js
// Valida estructura mínima del Sprint 1: V1 a V16
// =======================================================

(function () {
  'use strict';

  const VARIABLES_SPRINT_1 = [
    'V1', 'V2', 'V3', 'V4',
    'V5', 'V6', 'V7', 'V8',
    'V9', 'V10', 'V11', 'V12',
    'V13', 'V14', 'V15', 'V16'
  ];

  function normalizarEncabezado(valor) {
    return String(valor ?? '').trim().toUpperCase();
  }

  function validarEstructuraSprint1(encabezados) {
    const encabezadosNormalizados = encabezados.map(normalizarEncabezado);

    const faltantes = VARIABLES_SPRINT_1.filter(
      (variable) => !encabezadosNormalizados.includes(variable)
    );

    const reconocidas = VARIABLES_SPRINT_1.filter(
      (variable) => encabezadosNormalizados.includes(variable)
    );

    return {
      esValida: faltantes.length === 0,
      modo: 'SPRINT_1_V1_V16',
      variablesEsperadas: VARIABLES_SPRINT_1,
      variablesReconocidas: reconocidas,
      variablesFaltantes: faltantes,
      totalReconocidas: reconocidas.length,
      totalEsperadas: VARIABLES_SPRINT_1.length
    };
  }

  window.CACEstructura = {
    VARIABLES_SPRINT_1,
    validarEstructuraSprint1
  };
})();