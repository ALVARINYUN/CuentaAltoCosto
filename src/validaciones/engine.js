// =======================================================
// Validador CAC - validaciones/engine.js
// Motor acumulativo V1-V35.
// Corrige normalización de filas tipo objeto para encabezados reales.
// =======================================================

(function () {
  'use strict';

  function obtenerDocumento(registro) {
    const tipo = CACTipos.textoMayuscula(registro.V5);
    const numero = CACTipos.texto(registro.V6);

    if (!tipo && !numero) {
      return 'Sin documento';
    }

    return `${tipo} ${numero}`.trim();
  }

  function normalizarEncabezado(encabezado) {
    if (window.CACEstructura && typeof window.CACEstructura.normalizarEncabezado === 'function') {
      return window.CACEstructura.normalizarEncabezado(encabezado);
    }

    if (window.CACModulo1 && typeof window.CACModulo1.normalizarEncabezadoCAC === 'function') {
      return window.CACModulo1.normalizarEncabezadoCAC(encabezado);
    }

    return String(encabezado ?? '').trim().toUpperCase();
  }

  function normalizarValor(valor) {
    if (valor === null || valor === undefined) {
      return '';
    }

    return CACTipos.textoOriginal(valor);
  }

  function copiarMetadatosFila(origen, destino) {
    if (!origen || typeof origen !== 'object') return;

    if (origen.__filaExcel) {
      destino.__filaExcel = origen.__filaExcel;
      destino.__fila = origen.__filaExcel;
    }

    if (origen.__fila) {
      destino.__fila = origen.__fila;
    }

    if (origen.__hoja) {
      destino.__hoja = origen.__hoja;
    }
  }

  function normalizarFilaObjeto(fila) {
    const registro = {};

    copiarMetadatosFila(fila, registro);

    Object.entries(fila || {}).forEach(([claveOriginal, valor]) => {
      if (String(claveOriginal).startsWith('__')) {
        return;
      }

      const claveNormalizada = normalizarEncabezado(claveOriginal);
      registro[claveNormalizada] = normalizarValor(valor);
    });

    return registro;
  }

  function normalizarFila(encabezados, fila) {
    // Cuando excel.js entrega cada fila como objeto, también se deben normalizar
    // las claves. Antes se devolvía {...fila}, lo que impedía reconocer encabezados
    // largos como el de V29.
    if (!Array.isArray(fila) && typeof fila === 'object' && fila !== null) {
      return normalizarFilaObjeto(fila);
    }

    const registro = {};

    if (fila && fila.__filaExcel) {
      registro.__filaExcel = fila.__filaExcel;
      registro.__fila = fila.__filaExcel;
    }

    if (fila && fila.__hoja) {
      registro.__hoja = fila.__hoja;
    }

    encabezados.forEach((encabezado, indice) => {
      const clave = normalizarEncabezado(encabezado);
      registro[clave] = normalizarValor(fila ? fila[indice] : '');
    });

    return registro;
  }

  function tieneAlgunaColumna(registro, variables) {
    return variables.some((variable) =>
      Object.prototype.hasOwnProperty.call(registro, variable)
    );
  }

  function validarRegistroCompleto(registro) {
    let hallazgos = [];

    if (window.CACModulo1 && typeof window.CACModulo1.validarRegistroModulo1 === 'function') {
      hallazgos = hallazgos.concat(CACModulo1.validarRegistroModulo1(registro));
    }

    const archivoTraeBloque2A = tieneAlgunaColumna(registro, [
      'V17', 'V18', 'V19', 'V20', 'V21', 'V22', 'V23', 'V24'
    ]);

    if (
      archivoTraeBloque2A &&
      window.CACModulo2 &&
      typeof window.CACModulo2.validarRegistroModulo2 === 'function'
    ) {
      hallazgos = hallazgos.concat(CACModulo2.validarRegistroModulo2(registro));
    }

    const archivoTraeBloque2B = tieneAlgunaColumna(registro, [
      'V25', 'V26', 'V27', 'V28'
    ]);

    if (
      archivoTraeBloque2B &&
      window.CACModulo3 &&
      typeof window.CACModulo3.validar === 'function'
    ) {
      hallazgos = hallazgos.concat(CACModulo3.validar(registro));
    }

    const archivoTraeBloque2C = tieneAlgunaColumna(registro, [
      'V29'
    ]);

    if (
      archivoTraeBloque2C &&
      window.CACModulo4 &&
      typeof window.CACModulo4.validar === 'function'
    ) {
      hallazgos = hallazgos.concat(CACModulo4.validar(registro));
    }


    const archivoTraeBloque2D = tieneAlgunaColumna(registro, [
      'V30', 'V31', 'V32', 'V33'
    ]);

    if (
      archivoTraeBloque2D &&
      window.CACModulo5 &&
      typeof window.CACModulo5.validar === 'function'
    ) {
      hallazgos = hallazgos.concat(CACModulo5.validar(registro));
    }

    const archivoTraeBloque2E = tieneAlgunaColumna(registro, [
      'V34', 'V35'
    ]);

    if (
      archivoTraeBloque2E &&
      window.CACModulo6 &&
      typeof window.CACModulo6.validar === 'function'
    ) {
      hallazgos = hallazgos.concat(CACModulo6.validar(registro));
    }

    return hallazgos;
  }

  function resolverFilaExcel(registro, filaOriginal, filaEncabezados, indice) {
    const candidatos = [
      registro?.__filaExcel,
      registro?.__fila,
      filaOriginal?.__filaExcel,
      filaOriginal?.__fila
    ];

    for (const candidato of candidatos) {
      const numero = Number(candidato);

      if (Number.isFinite(numero) && numero > 0) {
        return numero;
      }
    }

    const encabezado = Number(filaEncabezados || 1);
    return encabezado + indice + 1;
  }

  function validarDatosSprint1(datosExcel, onProgreso) {
    const encabezados = datosExcel.encabezados || datosExcel.cabeceras || [];
    const filas = datosExcel.registros || datosExcel.filas || [];
    const total = filas.length;
    const filaEncabezados = Number(datosExcel.filaEncabezados || 1);

    const resultados = filas.map((fila, indice) => {
      const registro = normalizarFila(encabezados, fila);
      const hallazgos = validarRegistroCompleto(registro);
      const conteo = CACTipos.contarPorSeveridad(hallazgos);
      const estado = CACTipos.resolverEstadoPaciente(hallazgos);
      const indiceFilaExcel = resolverFilaExcel(registro, fila, filaEncabezados, indice);

      if (typeof onProgreso === 'function') {
        onProgreso({
          actual: indice + 1,
          total,
          porcentaje: total > 0 ? Math.round(((indice + 1) / total) * 100) : 100
        });
      }

      return {
        indiceFilaExcel,
        filaExcel: indiceFilaExcel,
        documento: obtenerDocumento(registro),
        registro,
        fila: registro,
        hallazgos,
        errores: conteo.errores,
        advertencias: conteo.advertencias,
        info: conteo.info,
        estado
      };
    });

    return construirResumen(resultados);
  }

  function construirResumen(resultados) {
    const totalPacientes = resultados.length;

    // Las tarjetas del resumen deben contar pacientes por condición.
    // Un mismo paciente puede tener errores y advertencias al mismo tiempo.
    const conErrores = resultados.filter((resultado) => resultado.errores > 0).length;
    const conAdvertencias = resultados.filter((resultado) => resultado.advertencias > 0).length;
    const soloConAdvertencias = resultados.filter(
      (resultado) => resultado.errores === 0 && resultado.advertencias > 0
    ).length;
    const sinProblemas = resultados.filter(
      (resultado) => resultado.errores === 0 && resultado.advertencias === 0
    ).length;

    const totalErrores = resultados.reduce((suma, resultado) => suma + resultado.errores, 0);
    const totalAdvertencias = resultados.reduce((suma, resultado) => suma + resultado.advertencias, 0);

    const resultadosOrdenados = [...resultados].sort((a, b) => {
      if (a.indiceFilaExcel !== b.indiceFilaExcel) return a.indiceFilaExcel - b.indiceFilaExcel;
      return a.documento.localeCompare(b.documento);
    });

    return {
      totalPacientes,
      conErrores,
      conAdvertencias,
      soloConAdvertencias,
      sinProblemas,
      totalErrores,
      totalAdvertencias,
      resultados: resultadosOrdenados
    };
  }

  window.CACEngine = {
    normalizarFila,
    normalizarFilaObjeto,
    validarRegistroCompleto,
    validarDatosSprint1
  };
})();
