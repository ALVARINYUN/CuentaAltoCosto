(function () {
  'use strict';

  const VERSION = 'sprint-3m-v108-ubicacion-temporal-trasplante-01';

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
      V106: '¿Recibió el usuario trasplante de células progenitoras hematopoyéticas dentro del periodo de reporte actual?',
      V107: 'Tipo de trasplante recibido',
      V108: 'Ubicación temporal de este trasplante en relación al manejo oncológico',
      'V109-V110': 'Variables posteriores del bloque de trasplante de células progenitoras hematopoyéticas'
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

  function describirValorV106(valor) {
    const codigo = normalizarCodigo(valor);

    if (!codigo) return 'V106 está vacía.';
    if (codigo === '1') return 'V106=1 indica que sí recibió trasplante de células progenitoras hematopoyéticas en el periodo de reporte actual.';
    if (codigo === '2') return 'V106=2 corresponde a una opción eliminada del instructivo actual.';
    if (codigo === '98') return 'V106=98 indica No Aplica.';

    return `V106 tiene el valor ${texto(valor)}.`;
  }

  function describirValorV107(valor) {
    const codigo = normalizarCodigo(valor);
    const descripciones = {
      '1': 'V107=1 indica trasplante autólogo.',
      '2': 'V107=2 indica trasplante alogénico de donante idéntico relacionado.',
      '3': 'V107=3 indica trasplante alogénico de donante no idéntico relacionado.',
      '4': 'V107=4 indica trasplante alogénico de donante idéntico no relacionado.',
      '5': 'V107=5 indica trasplante alogénico de donante no idéntico no relacionado.',
      '6': 'V107=6 indica trasplante alogénico de cordón umbilical idéntico familiar.',
      '7': 'V107=7 indica trasplante alogénico de cordón umbilical idéntico no familiar.',
      '8': 'V107=8 indica trasplante alogénico de cordón no idéntico no familiar.',
      '9': 'V107=9 indica trasplante alogénico de dos unidades de cordón.',
      '98': 'V107=98 indica No Aplica.'
    };

    if (!codigo) return 'V107 está vacía.';
    return descripciones[codigo] || `V107 tiene el valor ${texto(valor)}.`;
  }

  function describirValorV108(valor) {
    const codigo = normalizarCodigo(valor);
    const descripciones = {
      '95': 'V108=95 indica recaída: paciente con criterios de remisión al que nuevamente se le demuestra enfermedad activa.',
      '96': 'V108=96 indica refractariedad: paciente sin criterios de remisión a pesar del manejo.',
      '97': 'V108=97 indica esquema de consolidación.',
      '98': 'V108=98 indica No Aplica.'
    };

    if (!codigo) return 'V108 está vacía.';
    return descripciones[codigo] || `V108 tiene el valor ${texto(valor)}.`;
  }

  function esValorPermitidoV106(valor) {
    return ['1', '98'].includes(normalizarCodigo(valor));
  }

  function esValorPermitidoV107(valor) {
    return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '98'].includes(normalizarCodigo(valor));
  }

  function esTipoRealV107(valor) {
    return ['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(normalizarCodigo(valor));
  }


  function esValorPermitidoV108(valor) {
    return ['95', '96', '97', '98'].includes(normalizarCodigo(valor));
  }

  function esUbicacionRealV108(valor) {
    return ['95', '96', '97'].includes(normalizarCodigo(valor));
  }

  // V106. ¿Recibió el usuario trasplante de células progenitoras hematopoyéticas dentro del periodo de reporte actual?
  function validarV106(registro) {
    const hallazgos = [];
    const valor = registro?.V106;
    const codigo = normalizarCodigo(valor);

    if (estaVacio(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V106-ERROR-001',
        variable: 'V106',
        titulo: 'V106 está vacía',
        mensaje: 'V106 está vacía. Debe registrar si el usuario recibió trasplante de células progenitoras hematopoyéticas en el periodo de reporte actual: 1 si recibió o 98 si no aplica.',
        regla: 'El instructivo de V106 exige registrar 1 si recibió trasplante de células progenitoras hematopoyéticas o 98 si no aplica.',
        recomendacion: 'Revise V106 y registre 1 o 98 según corresponda.',
        valor,
        datosRelacionados: [
          dato('V106', valor, describirValorV106(valor))
        ],
        columnasCorregir: ['V106']
      }));
      return hallazgos;
    }

    if (codigo === '2') {
      hallazgos.push(crearHallazgo({
        codigo: 'V106-ERROR-002',
        variable: 'V106',
        titulo: 'V106 usa una opción eliminada',
        mensaje: 'V106 tiene el valor 2, pero esa opción fue eliminada. El instructivo actual sólo permite 1 si recibió trasplante o 98 si no aplica.',
        regla: 'El instructivo aclara que no aplica trasplante propuesto pero no realizado y que la opción 2 fue eliminada.',
        recomendacion: 'Corrija V106: use 1 si el trasplante de células progenitoras hematopoyéticas fue realizado dentro del periodo o 98 si no aplica.',
        valor,
        datosRelacionados: [
          dato('V106', valor, describirValorV106(valor))
        ],
        columnasCorregir: ['V106']
      }));
      return hallazgos;
    }

    if (!esValorPermitidoV106(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V106-ERROR-003',
        variable: 'V106',
        titulo: 'V106 tiene un valor fuera de catálogo',
        mensaje: 'V106 tiene un valor no permitido. Sólo se acepta 1 si recibió trasplante de células progenitoras hematopoyéticas o 98 si no aplica.',
        regla: 'El catálogo oficial de V106 sólo permite los valores 1 y 98.',
        recomendacion: 'Revise V106 y reemplace el valor por 1 o 98 según el instructivo.',
        valor,
        datosRelacionados: [
          dato('V106', valor, describirValorV106(valor))
        ],
        columnasCorregir: ['V106']
      }));
    }

    return hallazgos;
  }

  // V107. Tipo de trasplante recibido
  function validarV107(registro) {
    const hallazgos = [];
    const v106 = registro?.V106;
    const valor = registro?.V107;
    const codigoV106 = normalizarCodigo(v106);
    const codigoV107 = normalizarCodigo(valor);

    if (estaVacio(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V107-ERROR-001',
        variable: 'V107',
        titulo: 'V107 está vacía',
        mensaje: 'V107 está vacía. Debe registrar el tipo de trasplante recibido con un valor entre 1 y 9, o 98 si no aplica.',
        regla: 'El instructivo de V107 exige registrar un único valor del catálogo de tipo de trasplante o 98 cuando no aplica.',
        recomendacion: 'Revise V107 y registre el tipo de trasplante recibido o 98 si V106 indica No Aplica.',
        valor,
        datosRelacionados: [
          dato('V106', v106, describirValorV106(v106)),
          dato('V107', valor, describirValorV107(valor))
        ],
        columnasCorregir: ['V107']
      }));
      return hallazgos;
    }

    if (!esValorPermitidoV107(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V107-ERROR-002',
        variable: 'V107',
        titulo: 'V107 tiene un valor fuera de catálogo',
        mensaje: 'V107 tiene un valor no permitido. Sólo se aceptan los valores 1, 2, 3, 4, 5, 6, 7, 8, 9 o 98.',
        regla: 'El catálogo oficial de V107 sólo permite los valores 1 a 9 para tipos de trasplante y 98 para No Aplica.',
        recomendacion: 'Revise V107 y reemplace el valor por uno de los códigos permitidos por el instructivo.',
        valor,
        datosRelacionados: [
          dato('V106', v106, describirValorV106(v106)),
          dato('V107', valor, describirValorV107(valor))
        ],
        columnasCorregir: ['V107']
      }));
      return hallazgos;
    }

    if (codigoV106 === '98' && esTipoRealV107(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V107-ERROR-003',
        variable: 'V107',
        titulo: 'V107 registra tipo de trasplante cuando V106 indica No Aplica',
        mensaje: 'V107 no corresponde con V106. Si V106=98 indica que no aplica trasplante de células progenitoras hematopoyéticas, V107 debe registrarse como 98.',
        regla: 'V106 define si recibió trasplante. Cuando V106=98, V107 debe quedar como No Aplica.',
        recomendacion: 'Corrija V107 y registre 98, o revise V106 si el usuario realmente recibió trasplante.',
        valor,
        datosRelacionados: [
          dato('V106', v106, describirValorV106(v106)),
          dato('V107', valor, describirValorV107(valor))
        ],
        columnasCorregir: ['V107']
      }));
    }

    if (codigoV106 === '1' && codigoV107 === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V107-ERROR-004',
        variable: 'V107',
        titulo: 'V107 está en No Aplica aunque V106 indica trasplante recibido',
        mensaje: 'V107 no corresponde con V106. Si V106=1 indica que recibió trasplante, V107 debe registrar el tipo recibido con un valor entre 1 y 9.',
        regla: 'V106=1 habilita el registro del tipo de trasplante en V107. En ese caso V107 no debe ser 98.',
        recomendacion: 'Corrija V107 y registre el tipo de trasplante recibido entre 1 y 9.',
        valor,
        datosRelacionados: [
          dato('V106', v106, describirValorV106(v106)),
          dato('V107', valor, describirValorV107(valor))
        ],
        columnasCorregir: ['V107']
      }));
    }

    return hallazgos;
  }


  // V108. Ubicación temporal de este trasplante en relación al manejo oncológico
  function validarV108(registro) {
    const hallazgos = [];
    const v106 = registro?.V106;
    const v107 = registro?.V107;
    const valor = registro?.V108;
    const codigoV106 = normalizarCodigo(v106);
    const codigoV108 = normalizarCodigo(valor);

    if (estaVacio(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V108-ERROR-001',
        variable: 'V108',
        titulo: 'V108 está vacía',
        mensaje: 'V108 está vacía. Debe registrar la ubicación temporal del trasplante con 95, 96 o 97, o 98 si no aplica.',
        regla: 'El instructivo de V108 exige registrar si el trasplante corresponde a recaída, refractariedad, esquema de consolidación o No Aplica.',
        recomendacion: 'Revise V108 y registre 95, 96, 97 o 98 según corresponda.',
        valor,
        datosRelacionados: [
          dato('V106', v106, describirValorV106(v106)),
          dato('V107', v107, describirValorV107(v107)),
          dato('V108', valor, describirValorV108(valor))
        ],
        columnasCorregir: ['V108']
      }));
      return hallazgos;
    }

    if (!esValorPermitidoV108(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V108-ERROR-002',
        variable: 'V108',
        titulo: 'V108 tiene un valor fuera de catálogo',
        mensaje: 'V108 tiene un valor no permitido. Sólo se aceptan 95, 96, 97 o 98.',
        regla: 'El catálogo oficial de V108 sólo permite 95 para recaída, 96 para refractariedad, 97 para esquema de consolidación y 98 para No Aplica.',
        recomendacion: 'Revise V108 y reemplace el valor por uno de los códigos permitidos por el instructivo.',
        valor,
        datosRelacionados: [
          dato('V106', v106, describirValorV106(v106)),
          dato('V107', v107, describirValorV107(v107)),
          dato('V108', valor, describirValorV108(valor))
        ],
        columnasCorregir: ['V108']
      }));
      return hallazgos;
    }

    if (codigoV106 === '98' && esUbicacionRealV108(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V108-ERROR-003',
        variable: 'V108',
        titulo: 'V108 registra ubicación temporal cuando V106 indica No Aplica',
        mensaje: 'V108 no corresponde con V106. Si V106=98 indica que no aplica trasplante de células progenitoras hematopoyéticas, V108 debe registrarse como 98.',
        regla: 'V106 define si recibió trasplante. Cuando V106=98, las variables del bloque de trasplante deben quedar como No Aplica.',
        recomendacion: 'Corrija V108 y registre 98, o revise V106 si el usuario realmente recibió trasplante.',
        valor,
        datosRelacionados: [
          dato('V106', v106, describirValorV106(v106)),
          dato('V108', valor, describirValorV108(valor))
        ],
        columnasCorregir: ['V108']
      }));
    }

    if (codigoV106 === '1' && codigoV108 === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V108-ERROR-004',
        variable: 'V108',
        titulo: 'V108 está en No Aplica aunque V106 indica trasplante recibido',
        mensaje: 'V108 no corresponde con V106. Si V106=1 indica que recibió trasplante, V108 debe registrar 95, 96 o 97 según la ubicación temporal del trasplante en el manejo oncológico.',
        regla: 'V106=1 habilita el registro de V108. En ese caso V108 no debe ser 98.',
        recomendacion: 'Corrija V108 y registre 95, 96 o 97 según corresponda.',
        valor,
        datosRelacionados: [
          dato('V106', v106, describirValorV106(v106)),
          dato('V107', v107, describirValorV107(v107)),
          dato('V108', valor, describirValorV108(valor))
        ],
        columnasCorregir: ['V108']
      }));
    }

    return hallazgos;
  }

  function validar(registro) {
    let hallazgos = [];

    // V106. ¿Recibió el usuario trasplante de células progenitoras hematopoyéticas dentro del periodo de reporte actual?
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V106')) {
      hallazgos = hallazgos.concat(validarV106(registro));
    }

    // V107. Tipo de trasplante recibido
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V107')) {
      hallazgos = hallazgos.concat(validarV107(registro));
    }

    // V108. Ubicación temporal de este trasplante en relación al manejo oncológico
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V108')) {
      hallazgos = hallazgos.concat(validarV108(registro));
    }

    return hallazgos;
  }

  window.CACModulo18 = {
    version: VERSION,
    validar,
    validarV106,
    validarV107,
    validarV108
  };
})();
