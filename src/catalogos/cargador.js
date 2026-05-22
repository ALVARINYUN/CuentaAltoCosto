// =======================================================
// Validador CAC - src/catalogos/cargador.js
// Utilidades de consulta para catálogos cargados localmente
// Sprint 2A.2 - CIE-10 CAC
// =======================================================

(function () {
  'use strict';

  function obtenerCatalogoCIE10() {
    return window.CACCatalogoCIE10 || null;
  }

  function buscarCIE10(codigo) {
    const catalogo = obtenerCatalogoCIE10();
    const clave = String(codigo ?? '').trim().toUpperCase();

    if (!catalogo || !catalogo.datos || !clave) {
      return null;
    }

    return catalogo.datos[clave] || null;
  }

  function existeCIE10(codigo) {
    return buscarCIE10(codigo) !== null;
  }

  window.CACCargadorCatalogos = {
    obtenerCatalogoCIE10,
    buscarCIE10,
    existeCIE10
  };
})();
