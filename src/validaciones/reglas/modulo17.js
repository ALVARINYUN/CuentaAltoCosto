(function () {
  'use strict';

  const VERSION = 'sprint-3l-v86-radioterapia-recibida-02';

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
      V86: '¿Recibió el usuario algún tipo de radioterapia en el periodo de reporte actual?',
      'V87-V105': 'Variables posteriores del bloque de radioterapia'
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

  function describirValorV86(valor) {
    const codigo = normalizarCodigo(valor);
    if (codigo === '1') return 'V86=1 indica que sí recibió algún tipo de radioterapia en el periodo de reporte actual.';
    if (codigo === '2') return 'V86=2 corresponde a una opción eliminada del instructivo actual.';
    if (codigo === '98') return 'V86=98 indica No aplica porque no recibió radioterapia en el periodo.';
    if (!codigo) return 'V86 está vacía.';
    return `V86 tiene el valor ${texto(valor)}.`;
  }

  function datosBaseV86(valorOriginal) {
    return [
      dato('V86', valorOriginal, describirValorV86(valorOriginal)),
      dato('V87-V105', 'Pendiente', 'Bloque posterior de radioterapia. Se validará de forma progresiva cuando se implementen esas variables.')
    ];
  }

  // ============================================================
  // V86. ¿Recibió el usuario algún tipo de radioterapia en el periodo de reporte actual?
  // ============================================================
  function validarV86(registro) {
    const hallazgos = [];
    const variable = 'V86';
    const valorOriginal = registro?.V86;
    const valor = normalizarCodigo(valorOriginal);
    const permitidos = ['1', '98'];
    const datosRelacionados = datosBaseV86(valorOriginal);

    if (estaVacio(valorOriginal)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V86-ERROR-001',
        variable,
        severidad: 'error',
        titulo: 'V86 está vacía',
        mensaje: 'V86 está vacía. Debe registrar 1 si el usuario recibió radioterapia en el periodo o 98 si no aplica.',
        regla: 'El instructivo exige registrar si el usuario recibió algún tipo de radioterapia en el periodo de reporte actual.',
        recomendacion: 'Corrija V86 registrando 1 o 98 según corresponda.',
        valor: valorOriginal,
        datosRelacionados,
        columnasCorregir: ['V86']
      }));
      return hallazgos;
    }

    if (valor === '2') {
      hallazgos.push(crearHallazgo({
        codigo: 'V86-ERROR-003',
        variable,
        severidad: 'error',
        titulo: 'V86 tiene una opción eliminada del instructivo',
        mensaje: 'V86 tiene valor 2, pero esa opción fue eliminada. La radioterapia propuesta pero no suministrada no cuenta como radioterapia recibida.',
        regla: 'El instructivo aclara que no aplica radioterapia propuesta más no suministrada y que se eliminó la opción 2.',
        recomendacion: 'Corrija V86 a 1 sólo si la radioterapia fue suministrada. Si no fue suministrada, registre 98.',
        valor: valorOriginal,
        datosRelacionados,
        columnasCorregir: ['V86']
      }));
      return hallazgos;
    }

    if (!permitidos.includes(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V86-ERROR-002',
        variable,
        severidad: 'error',
        titulo: 'V86 tiene un valor fuera del catálogo permitido',
        mensaje: 'V86 tiene un valor fuera del catálogo permitido. Sólo se permite 1 o 98.',
        regla: 'Según el instructivo, V86 sólo permite 1 para radioterapia recibida o 98 para No aplica.',
        recomendacion: 'Corrija V86 con 1 si recibió radioterapia o 98 si no aplica.',
        valor: valorOriginal,
        datosRelacionados,
        columnasCorregir: ['V86']
      }));
      return hallazgos;
    }

    // V86=1 y V86=98 son valores válidos del instructivo.
    // La coherencia con V87 a V105 se validará progresivamente en cada variable posterior,
    // sin generar advertencias masivas desde V86 por un valor válido.

    return hallazgos;
  }

  function validar(registro) {
    let hallazgos = [];

    // V86. ¿Recibió el usuario algún tipo de radioterapia en el periodo de reporte actual?
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V86')) {
      hallazgos = hallazgos.concat(validarV86(registro));
    }

    return hallazgos;
  }

  window.CACModulo17 = {
    version: VERSION,
    validar,
    validarV86
  };
})();
