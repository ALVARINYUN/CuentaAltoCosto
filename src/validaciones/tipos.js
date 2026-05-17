// =======================================================
// Validador CAC - validaciones/tipos.js
// Tipos, severidades y utilidades comunes de validación
// =======================================================

(function () {
  'use strict';

  const SEVERIDAD = {
    ERROR: 'error',
    ADVERTENCIA: 'advertencia',
    INFO: 'info'
  };

  const ESTADO_PACIENTE = {
    OK: 'Sin problemas',
    CON_ADVERTENCIAS: 'Con advertencias',
    CON_ERRORES: 'Con errores'
  };

  function texto(valor) {
    return String(valor ?? '').trim();
  }

  function textoMayuscula(valor) {
    return texto(valor).toUpperCase();
  }

  function estaVacio(valor) {
    return texto(valor) === '';
  }

  function esFechaISO(valor) {
    const valorTexto = texto(valor);

    if (!/^\d{4}-\d{2}-\d{2}$/.test(valorTexto)) {
      return false;
    }

    const fecha = new Date(`${valorTexto}T00:00:00`);

    if (Number.isNaN(fecha.getTime())) {
      return false;
    }

    const [anio, mes, dia] = valorTexto.split('-').map(Number);

    return (
      fecha.getUTCFullYear() === anio &&
      fecha.getUTCMonth() + 1 === mes &&
      fecha.getUTCDate() === dia
    );
  }

  function compararFechas(fechaA, fechaB) {
    if (!esFechaISO(fechaA) || !esFechaISO(fechaB)) {
      return null;
    }

    const a = new Date(`${fechaA}T00:00:00`).getTime();
    const b = new Date(`${fechaB}T00:00:00`).getTime();

    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }

  function crearHallazgo({ variable, valor, regla, mensaje, recomendacion, severidad = SEVERIDAD.ERROR }) {
    return {
      variable,
      valor: texto(valor),
      regla,
      mensaje,
      recomendacion,
      severidad
    };
  }

  function contarPorSeveridad(hallazgos) {
    return hallazgos.reduce(
      (acumulado, hallazgo) => {
        if (hallazgo.severidad === SEVERIDAD.ERROR) {
          acumulado.errores += 1;
        } else if (hallazgo.severidad === SEVERIDAD.ADVERTENCIA) {
          acumulado.advertencias += 1;
        } else {
          acumulado.info += 1;
        }

        return acumulado;
      },
      { errores: 0, advertencias: 0, info: 0 }
    );
  }

  function resolverEstadoPaciente(hallazgos) {
    const conteo = contarPorSeveridad(hallazgos);

    if (conteo.errores > 0) {
      return ESTADO_PACIENTE.CON_ERRORES;
    }

    if (conteo.advertencias > 0) {
      return ESTADO_PACIENTE.CON_ADVERTENCIAS;
    }

    return ESTADO_PACIENTE.OK;
  }

  window.CACTipos = {
    SEVERIDAD,
    ESTADO_PACIENTE,
    texto,
    textoMayuscula,
    estaVacio,
    esFechaISO,
    compararFechas,
    crearHallazgo,
    contarPorSeveridad,
    resolverEstadoPaciente
  };
})();