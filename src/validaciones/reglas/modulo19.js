(function () {
  'use strict';

  const VERSION = 'sprint-3n-v111-cirugia-reconstructiva-01';

  function texto(valor) {
    if (window.CACTipos && typeof window.CACTipos.texto === 'function') {
      return window.CACTipos.texto(valor);
    }

    return String(valor ?? '').trim();
  }

  function normalizarCodigo(valor) {
    return texto(valor)
      .toUpperCase()
      .replace(/\s+/g, '')
      .replace(/\./g, '')
      .replace(/-/g, '')
      .trim();
  }

  function estaVacio(valor) {
    return texto(valor) === '';
  }

  function nombreVariable(variable) {
    const nombres = {
      V111: 'El usuario, ¿recibió cirugía reconstructiva en el periodo de reporte actual?'
    };

    return nombres[variable] || variable;
  }

  function dato(variable, valor, nota = '') {
    return {
      variable,
      nombre: nombreVariable(variable),
      valor: texto(valor) || '(vacío)',
      nota
    };
  }

  function crearHallazgo({
    codigo,
    variable,
    severidad = 'error',
    titulo,
    mensaje,
    regla,
    recomendacion,
    valor,
    datosRelacionados,
    columnasCorregir
  }) {
    return {
      codigo,
      variable,
      severidad,
      titulo,
      mensaje,
      regla,
      recomendacion,
      valor: texto(valor),
      datosRelacionados,
      columnasCorregir: Array.isArray(columnasCorregir) && columnasCorregir.length > 0
        ? columnasCorregir
        : [variable]
    };
  }

  function describirValorV111(valor) {
    const codigo = normalizarCodigo(valor);

    if (!codigo) return 'V111 está vacía.';
    if (codigo === '1') return 'V111=1 indica que el usuario sí recibió cirugía reconstructiva en el periodo de reporte actual.';
    if (codigo === '2') return 'V111=2 corresponde a una opción eliminada del instructivo actual.';
    if (codigo === '98') return 'V111=98 indica No Aplica: no recibió este tipo de cirugía reconstructiva.';

    return `V111 tiene el valor ${texto(valor)}.`;
  }

  function esValorPermitidoV111(valor) {
    return ['1', '98'].includes(normalizarCodigo(valor));
  }

  // V111. El usuario, ¿recibió cirugía reconstructiva en el periodo de reporte actual?
  function validarV111(registro) {
    const hallazgos = [];
    const valor = registro?.V111;
    const codigo = normalizarCodigo(valor);

    if (estaVacio(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V111-ERROR-001',
        variable: 'V111',
        titulo: 'V111 está vacía',
        mensaje: 'V111 está vacía. Debe registrar 1 si el usuario recibió cirugía reconstructiva en el periodo de reporte actual, o 98 si no aplica.',
        regla: 'El instructivo de V111 exige registrar si el usuario recibió cirugía reconstructiva en el periodo actual: 1 si recibió o 98 si no aplica.',
        recomendacion: 'Revise V111 y registre 1 o 98 según corresponda.',
        valor,
        datosRelacionados: [
          dato('V111', valor, describirValorV111(valor))
        ],
        columnasCorregir: ['V111']
      }));
      return hallazgos;
    }

    if (codigo === '2') {
      hallazgos.push(crearHallazgo({
        codigo: 'V111-ERROR-002',
        variable: 'V111',
        titulo: 'V111 usa una opción eliminada',
        mensaje: 'V111 tiene el valor 2, pero esa opción fue eliminada. Si la cirugía reconstructiva fue propuesta pero no realizada, debe registrarse 98.',
        regla: 'El instructivo aclara que no aplica cirugía reconstructiva propuesta pero no realizada y que la opción 2 fue eliminada.',
        recomendacion: 'Corrija V111: use 1 si la cirugía reconstructiva fue realizada en el periodo de reporte actual, o 98 si no fue realizada o no aplica.',
        valor,
        datosRelacionados: [
          dato('V111', valor, describirValorV111(valor))
        ],
        columnasCorregir: ['V111']
      }));
      return hallazgos;
    }

    if (!esValorPermitidoV111(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V111-ERROR-003',
        variable: 'V111',
        titulo: 'V111 tiene un valor fuera de catálogo',
        mensaje: 'V111 tiene un valor fuera de catálogo. Sólo se permite 1 si recibió cirugía reconstructiva o 98 si no aplica.',
        regla: 'El catálogo oficial de V111 sólo permite los valores 1 y 98. La opción 2 fue eliminada.',
        recomendacion: 'Revise V111 y reemplace el valor por 1 o 98 según el instructivo.',
        valor,
        datosRelacionados: [
          dato('V111', valor, describirValorV111(valor))
        ],
        columnasCorregir: ['V111']
      }));
    }

    return hallazgos;
  }

  function validar(registro) {
    let hallazgos = [];

    // V111. El usuario, ¿recibió cirugía reconstructiva en el periodo de reporte actual?
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V111')) {
      hallazgos = hallazgos.concat(validarV111(registro));
    }

    return hallazgos;
  }

  window.CACModulo19 = {
    version: VERSION,
    validar,
    validarV111
  };
})();
