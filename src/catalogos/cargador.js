(function () {
  'use strict';

  function texto(valor) {
    return String(valor ?? '').trim();
  }

  function normalizarMayuscula(valor) {
    return texto(valor).toUpperCase();
  }

  function normalizarCUPS(valor) {
    const codigo = texto(valor);
    if (/^\d+$/.test(codigo) && codigo.length < 6) {
      return codigo.padStart(6, '0');
    }
    return codigo.toUpperCase();
  }

  function obtenerCatalogoCIE10() {
    return window.CACCatalogoCIE10 || null;
  }

  function buscarCIE10(codigo) {
    const catalogo = obtenerCatalogoCIE10();
    const clave = normalizarMayuscula(codigo);

    if (!catalogo || !catalogo.datos || !clave) {
      return null;
    }

    return catalogo.datos[clave] || null;
  }

  function existeCIE10(codigo) {
    return buscarCIE10(codigo) !== null;
  }

  function obtenerCatalogoCUPS() {
    return window.CACCatalogoCUPS || null;
  }

  function buscarCUPS(codigo) {
    const catalogo = obtenerCatalogoCUPS();
    const clave = normalizarCUPS(codigo);

    if (!catalogo || !catalogo.datos || !clave) {
      return null;
    }

    return catalogo.datos[clave] || null;
  }

  function existeCUPS(codigo) {
    return buscarCUPS(codigo) !== null;
  }

  function obtenerCatalogoATC() {
    return window.CACCatalogoATC || null;
  }

  function buscarATC(codigo) {
    const catalogo = obtenerCatalogoATC();
    const clave = normalizarMayuscula(codigo);

    if (!catalogo || !clave) {
      return null;
    }

    if (catalogo.datos && catalogo.datos[clave]) {
      return catalogo.datos[clave];
    }

    if (catalogo.homologacion_2024_a_2025 && catalogo.homologacion_2024_a_2025[clave]) {
      const codigo2025 = catalogo.homologacion_2024_a_2025[clave];
      return catalogo.datos ? catalogo.datos[codigo2025] || null : null;
    }

    return null;
  }

  function homologarATC2025(codigo) {
    const catalogo = obtenerCatalogoATC();
    const clave = normalizarMayuscula(codigo);

    if (!catalogo || !clave) {
      return '';
    }

    if (catalogo.datos && catalogo.datos[clave]) {
      return clave;
    }

    if (catalogo.homologacion_2024_a_2025 && catalogo.homologacion_2024_a_2025[clave]) {
      return catalogo.homologacion_2024_a_2025[clave];
    }

    return '';
  }

  function existeATC(codigo) {
    return buscarATC(codigo) !== null;
  }

  window.CACCargadorCatalogos = {
    obtenerCatalogoCIE10,
    buscarCIE10,
    existeCIE10,

    obtenerCatalogoCUPS,
    buscarCUPS,
    existeCUPS,

    obtenerCatalogoATC,
    buscarATC,
    homologarATC2025,
    existeATC
  };
})();
