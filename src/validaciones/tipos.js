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

  function textoOriginal(valor) {
    return String(valor ?? '');
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

    const fecha = new Date(`${valorTexto}T00:00:00Z`);

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

    const a = new Date(`${fechaA}T00:00:00Z`).getTime();
    const b = new Date(`${fechaB}T00:00:00Z`).getTime();

    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }

  function calcularEdad(fechaNacimiento, fechaCorte = '2025-05-05') {
    if (!esFechaISO(fechaNacimiento) || !esFechaISO(fechaCorte)) {
      return null;
    }

    const nacimiento = new Date(`${fechaNacimiento}T00:00:00Z`);
    const corte = new Date(`${fechaCorte}T00:00:00Z`);

    let edad = corte.getUTCFullYear() - nacimiento.getUTCFullYear();
    const mes = corte.getUTCMonth() - nacimiento.getUTCMonth();

    if (mes < 0 || (mes === 0 && corte.getUTCDate() < nacimiento.getUTCDate())) {
      edad -= 1;
    }

    return edad;
  }

  function calcularDias(fechaInicio, fechaFin = '2025-05-05') {
    if (!esFechaISO(fechaInicio) || !esFechaISO(fechaFin)) {
      return null;
    }

    const inicio = new Date(`${fechaInicio}T00:00:00Z`).getTime();
    const fin = new Date(`${fechaFin}T00:00:00Z`).getTime();

    return Math.floor((fin - inicio) / (1000 * 60 * 60 * 24));
  }

  function crearDatoRelacionado(variable, nombre, valor, nota = '') {
    return {
      variable,
      nombre,
      valor: texto(valor),
      nota
    };
  }

  function crearHallazgo({
    codigo,
    titulo,
    variable,
    valor,
    regla,
    mensaje,
    recomendacion,
    severidad = SEVERIDAD.ERROR,
    datosRelacionados = [],
    columnasCorregir = [],
    explicacion = ''
  }) {
    return {
      codigo,
      titulo: titulo || mensaje || codigo || 'Hallazgo de validación',
      variable,
      valor: texto(valor),
      regla,
      mensaje,
      recomendacion,
      severidad,
      datosRelacionados,
      columnasCorregir,
      explicacion
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
    textoOriginal,
    textoMayuscula,
    estaVacio,
    esFechaISO,
    compararFechas,
    calcularEdad,
    calcularDias,
    crearDatoRelacionado,
    crearHallazgo,
    contarPorSeveridad,
    resolverEstadoPaciente
  };
})();