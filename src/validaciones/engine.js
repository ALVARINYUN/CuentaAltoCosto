// =======================================================
// Validador CAC - validaciones/engine.js
// Motor de validación Sprint 1
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

  function validarDatosSprint1(datosExcel, onProgreso) {
    const encabezados = datosExcel.encabezados;
    const filas = datosExcel.filas;
    const total = filas.length;

    const resultados = filas.map((fila, indice) => {
      const registro = CACModulo1.normalizarFila(encabezados, fila);
      const hallazgos = CACModulo1.validarRegistroModulo1(registro);
      const conteo = CACTipos.contarPorSeveridad(hallazgos);
      const estado = CACTipos.resolverEstadoPaciente(hallazgos);

      if (typeof onProgreso === 'function') {
        onProgreso({
          actual: indice + 1,
          total,
          porcentaje: Math.round(((indice + 1) / total) * 100)
        });
      }

      return {
        indiceFilaExcel: indice + 2,
        documento: obtenerDocumento(registro),
        registro,
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
    const conErrores = resultados.filter((resultado) => resultado.errores > 0).length;
    const conAdvertencias = resultados.filter(
      (resultado) => resultado.errores === 0 && resultado.advertencias > 0
    ).length;
    const sinProblemas = resultados.filter(
      (resultado) => resultado.errores === 0 && resultado.advertencias === 0
    ).length;

    const totalErrores = resultados.reduce((suma, resultado) => suma + resultado.errores, 0);
    const totalAdvertencias = resultados.reduce((suma, resultado) => suma + resultado.advertencias, 0);

    const resultadosOrdenados = [...resultados].sort((a, b) => {
      if (b.errores !== a.errores) return b.errores - a.errores;
      if (b.advertencias !== a.advertencias) return b.advertencias - a.advertencias;
      return a.documento.localeCompare(b.documento);
    });

    return {
      totalPacientes,
      conErrores,
      conAdvertencias,
      sinProblemas,
      totalErrores,
      totalAdvertencias,
      resultados: resultadosOrdenados
    };
  }

  window.CACEngine = {
    validarDatosSprint1
  };
})();