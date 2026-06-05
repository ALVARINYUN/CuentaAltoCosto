(function () {
  'use strict';

  const VERSION = 'sprint-3g-v60-motivo-finalizacion-prematura-01';

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
      .trim();
  }

  function estaVacio(valor) {
    return texto(valor) === '';
  }

  function nombreVariable(variable) {
    const nombres = {
      V45: 'Recibió quimioterapia u otra terapia sistémica',
      V49: 'Fecha de inicio del primer o único esquema',
      V57: 'Recibió quimioterapia intratecal en el primer o único esquema',
      V58: 'Fecha de finalización del primer o único esquema',
      V59: 'Características actuales del primer o único esquema',
      V60: 'Motivo de la finalización prematura del primer o único esquema'
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

  function describirValorV45(valor) {
    const codigo = normalizarCodigo(valor);

    if (codigo === '1') {
      return 'V45=1 indica que sí recibió quimioterapia u otra terapia sistémica en el periodo.';
    }

    if (codigo === '98') {
      return 'V45=98 indica que no tuvo esquema de quimioterapia o terapia sistémica en el periodo.';
    }

    if (!codigo) {
      return 'V45 está vacía.';
    }

    return `V45 tiene el valor ${codigo}.`;
  }

  function describirValorV57(valor) {
    const codigo = normalizarCodigo(valor);

    if (codigo === '1') {
      return 'V57=1 significa que sí recibió quimioterapia intratecal.';
    }

    if (codigo === '2') {
      return 'V57=2 significa que no recibió quimioterapia intratecal.';
    }

    if (codigo === '98') {
      return 'V57=98 significa no aplica porque no tuvo esquema y V45=98.';
    }

    if (!codigo) {
      return 'V57 está vacía.';
    }

    return `V57 tiene el valor ${codigo}.`;
  }

  function describirValorV58(valor) {
    const fecha = texto(valor);

    if (fecha === '1845-01-01') {
      return '1845-01-01 significa no aplica porque V45=98.';
    }

    if (fecha === '1800-01-01') {
      return '1800-01-01 aplica para hormonoterapia o esquema que aún no finaliza.';
    }

    if (!fecha) {
      return 'V58 está vacía.';
    }

    return `${fecha} corresponde a la fecha reportada de finalización del primer o único esquema.`;
  }

  function describirValorV59(valor) {
    const codigo = normalizarCodigo(valor);

    if (codigo === '1') {
      return 'V59=1 significa finalizado, esquema completo según medicamentos programados.';
    }

    if (codigo === '2') {
      return 'V59=2 significa finalizado, esquema incompleto pero finalizado por algún motivo.';
    }

    if (codigo === '3') {
      return 'V59=3 significa no finalizado, esquema incompleto, pero aún bajo tratamiento.';
    }

    if (codigo === '98') {
      return 'V59=98 significa no aplica porque no tuvo esquema de terapia sistémica y V45=98.';
    }

    if (!codigo) {
      return 'V59 está vacía.';
    }

    return `V59 tiene el valor ${codigo}.`;
  }


  function describirValorV60(valor) {
    const codigo = normalizarCodigo(valor);

    const descripciones = {
      '1': 'V60=1 significa toxicidad de uno o más medicamentos.',
      '2': 'V60=2 significa otros motivos médicos.',
      '3': 'V60=3 significa muerte.',
      '4': 'V60=4 significa cambio de EAPB.',
      '5': 'V60=5 significa decisión del usuario: abandonó la terapia.',
      '6': 'V60=6 significa no hay disponibilidad de medicamentos.',
      '7': 'V60=7 significa otros motivos administrativos.',
      '8': 'V60=8 significa otras causas no contempladas.',
      '98': 'V60=98 significa no aplica.'
    };

    if (descripciones[codigo]) {
      return descripciones[codigo];
    }

    if (!codigo) {
      return 'V60 está vacía.';
    }

    return `V60 tiene el valor ${codigo}.`;
  }

  function crearHallazgo({ codigo, variable, titulo, mensaje, regla, recomendacion, valor, datosRelacionados, columnasCorregir }) {
    return {
      codigo,
      variable,
      severidad: 'error',
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

  function esFechaIsoValida(valor) {
    const fecha = texto(valor);
    const match = fecha.match(/^(\d{4})-(\d{2})-(\d{2})$/);

    if (!match) return false;

    const anio = Number(match[1]);
    const mes = Number(match[2]);
    const dia = Number(match[3]);

    if (!Number.isInteger(anio) || !Number.isInteger(mes) || !Number.isInteger(dia)) return false;
    if (anio < 1800 || anio > 2100 || mes < 1 || mes > 12 || dia < 1 || dia > 31) return false;

    const fechaUtc = new Date(Date.UTC(anio, mes - 1, dia));

    return fechaUtc.getUTCFullYear() === anio &&
      fechaUtc.getUTCMonth() === mes - 1 &&
      fechaUtc.getUTCDate() === dia;
  }

  function esFechaReal(valor) {
    const fecha = texto(valor);
    return esFechaIsoValida(fecha) && fecha !== '1800-01-01' && fecha !== '1845-01-01';
  }

  function compararFechasIso(fechaA, fechaB) {
    if (!esFechaIsoValida(fechaA) || !esFechaIsoValida(fechaB)) return null;

    const a = texto(fechaA);
    const b = texto(fechaB);

    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }

  function validarV57(registro) {
    const hallazgos = [];
    const v45 = normalizarCodigo(registro?.V45);
    const v57Original = registro?.V57;
    const v57 = normalizarCodigo(v57Original);

    if (estaVacio(v57Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V57-ERROR-001',
        variable: 'V57',
        titulo: 'V57 está vacía',
        mensaje: 'V57 está vacía. Esta variable debe indicar si recibió quimioterapia intratecal en el primer o único esquema: 1 si recibió, 2 si no recibió, o 98 si no tuvo esquema y V45=98.',
        regla: 'V57 es obligatoria dentro del bloque del primer o único esquema.',
        recomendacion: 'Revise el soporte clínico. Registre 1 si recibió quimioterapia intratecal, 2 si no la recibió, o 98 si no tuvo esquema y V45=98.',
        valor: v57Original,
        datosRelacionados: [
          dato('V45', registro?.V45, describirValorV45(registro?.V45)),
          dato('V57', v57Original, 'La variable no tiene dato registrado.')
        ]
      }));

      return hallazgos;
    }

    const valoresPermitidos = ['1', '2', '98'];

    if (!valoresPermitidos.includes(v57)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V57-ERROR-002',
        variable: 'V57',
        titulo: 'V57 tiene un valor diferente de 1, 2 o 98',
        mensaje: `V57 tiene el valor ${texto(v57Original)}, pero esta variable solo permite 1, 2 o 98.`,
        regla: 'El instructivo de V57 solo permite: 1 sí recibió quimioterapia intratecal, 2 no recibió, o 98 no aplica si no tuvo esquema y V45=98.',
        recomendacion: 'Corrija V57 usando 1, 2 o 98 según el soporte clínico y la condición de V45.',
        valor: v57Original,
        datosRelacionados: [
          dato('V45', registro?.V45, describirValorV45(registro?.V45)),
          dato('V57', v57Original, 'Valor fuera del catálogo permitido para V57.')
        ]
      }));
    }

    if (v45 === '1' && v57 === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V57-ERROR-003',
        variable: 'V57',
        titulo: 'V45 indica que tuvo terapia sistémica, pero V57 está en 98',
        mensaje: 'V45 tiene el valor 1, lo que indica que sí recibió quimioterapia u otra terapia sistémica en el periodo. Sin embargo, V57 tiene el valor 98. Para este caso, V57 debe responder si recibió quimioterapia intratecal: 1 si recibió o 2 si no recibió.',
        regla: 'Si V45=1, V57 no debe ser 98. Cuando el paciente tuvo tratamiento sistémico, V57 debe ser 1 o 2. Si el cáncer no aplica para intratecal y no la recibió, debe registrarse 2.',
        recomendacion: 'Cambie V57 a 1 si recibió quimioterapia intratecal, o a 2 si no la recibió.',
        valor: v57Original,
        datosRelacionados: [
          dato('V45', registro?.V45, describirValorV45(registro?.V45)),
          dato('V57', v57Original, describirValorV57(v57Original))
        ]
      }));
    }

    if (v45 === '98' && v57 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V57-ERROR-004',
        variable: 'V57',
        titulo: 'V57 no corresponde con V45: si no tuvo esquema, debe registrarse 98',
        mensaje: `V45 tiene el valor 98, lo que indica que no tuvo esquema de quimioterapia o terapia sistémica en el periodo. Sin embargo, V57 tiene el valor ${texto(v57Original)}. Para este caso, V57 debe ser 98.`,
        regla: 'Si V45=98, V57 debe ser 98 porque no tuvo ningún esquema de quimioterapia o terapia sistémica.',
        recomendacion: 'Cambie V57 a 98.',
        valor: v57Original,
        datosRelacionados: [
          dato('V45', registro?.V45, describirValorV45(registro?.V45)),
          dato('V57', v57Original, describirValorV57(v57Original))
        ]
      }));
    }

    return hallazgos;
  }

  function validarV58(registro) {
    const hallazgos = [];
    const v45 = normalizarCodigo(registro?.V45);
    const v49Original = registro?.V49;
    const v58Original = registro?.V58;
    const v58 = texto(v58Original);

    if (estaVacio(v58Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V58-ERROR-001',
        variable: 'V58',
        titulo: 'V58 está vacía',
        mensaje: 'V58 está vacía. Esta variable debe registrar la fecha de finalización del primer o único esquema, 1800-01-01 si es hormonoterapia o el esquema aún no finaliza, o 1845-01-01 si no aplica porque V45=98.',
        regla: 'V58 debe diligenciarse dentro del bloque del primer o único esquema. Puede registrar una fecha real de finalización, 1800-01-01 si es hormonoterapia o el esquema aún no finaliza, o 1845-01-01 cuando V45=98.',
        recomendacion: 'Revise el soporte clínico. Registre la fecha de finalización en formato AAAA-MM-DD, 1800-01-01 si es hormonoterapia o el esquema aún no ha finalizado, o 1845-01-01 si V45=98.',
        valor: v58Original,
        datosRelacionados: [
          dato('V45', registro?.V45, describirValorV45(registro?.V45)),
          dato('V58', v58Original, 'La variable no tiene dato registrado.')
        ]
      }));

      return hallazgos;
    }

    if (!esFechaIsoValida(v58)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V58-ERROR-002',
        variable: 'V58',
        titulo: 'V58 no tiene formato de fecha válido',
        mensaje: `V58 tiene el valor ${texto(v58Original)}, pero debe registrarse como fecha en formato AAAA-MM-DD.`,
        regla: 'El instructivo exige registrar la fecha de finalización en formato AAAA-MM-DD. Si solo conoce año y mes, use día 15.',
        recomendacion: 'Corrija V58 usando el formato AAAA-MM-DD. Ejemplo: 2024-04-15.',
        valor: v58Original,
        datosRelacionados: [
          dato('V58', v58Original, 'Formato inválido para fecha de finalización.')
        ]
      }));

      return hallazgos;
    }

    if (v45 === '98' && v58 !== '1845-01-01') {
      hallazgos.push(crearHallazgo({
        codigo: 'V58-ERROR-003',
        variable: 'V58',
        titulo: 'V45 indica que no tuvo esquema, pero V58 no está en 1845-01-01',
        mensaje: `V45 tiene el valor 98, lo que indica que no tuvo este primer o único esquema. Sin embargo, V58 tiene el valor ${v58}. Para este caso, V58 debe ser 1845-01-01.`,
        regla: 'El instructivo indica usar 1845-01-01 en V58 cuando V45=98.',
        recomendacion: 'Cambie V58 a 1845-01-01.',
        valor: v58Original,
        datosRelacionados: [
          dato('V45', registro?.V45, describirValorV45(registro?.V45)),
          dato('V58', v58Original, describirValorV58(v58Original))
        ]
      }));
    }

    if (v45 === '1' && v58 === '1845-01-01') {
      hallazgos.push(crearHallazgo({
        codigo: 'V58-ERROR-004',
        variable: 'V58',
        titulo: 'V45 indica que sí tuvo terapia sistémica, pero V58 está en no aplica',
        mensaje: 'V45 tiene el valor 1, lo que indica que sí recibió quimioterapia u otra terapia sistémica en el periodo. Sin embargo, V58 tiene 1845-01-01, que significa no aplica. Para este caso, V58 debe ser una fecha real de finalización o 1800-01-01 si es hormonoterapia o el esquema aún no finaliza.',
        regla: 'Si V45=1, V58 no debe ser 1845-01-01. Ese valor solo aplica cuando V45=98.',
        recomendacion: 'Registre la fecha real de finalización del esquema o 1800-01-01 si el tratamiento aún no finaliza.',
        valor: v58Original,
        datosRelacionados: [
          dato('V45', registro?.V45, describirValorV45(registro?.V45)),
          dato('V58', v58Original, describirValorV58(v58Original))
        ]
      }));
    }

    if (esFechaReal(v58) && esFechaReal(v49Original) && compararFechasIso(v58, v49Original) < 0) {
      hallazgos.push(crearHallazgo({
        codigo: 'V58-ERROR-005',
        variable: 'V58',
        titulo: 'V58 es anterior a la fecha de inicio del esquema',
        mensaje: `V58 tiene la fecha ${v58}, pero V49 tiene la fecha ${texto(v49Original)}. La fecha de finalización no puede ser anterior a la fecha de inicio del primer o único esquema.`,
        regla: 'Cuando V58 y V49 son fechas reales, V58 debe ser igual o posterior a V49.',
        recomendacion: 'Revise V49 y V58. Corrija la fecha que esté mal registrada.',
        valor: v58Original,
        datosRelacionados: [
          dato('V49', v49Original, 'Fecha de inicio del primer o único esquema.'),
          dato('V58', v58Original, 'Fecha de finalización reportada.')
        ],
        columnasCorregir: ['V49', 'V58']
      }));
    }

    return hallazgos;
  }


  function validarV59(registro) {
    const hallazgos = [];
    const v45 = normalizarCodigo(registro?.V45);
    const v59Original = registro?.V59;
    const v59 = normalizarCodigo(v59Original);

    if (estaVacio(v59Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V59-ERROR-001',
        variable: 'V59',
        titulo: 'V59 está vacía',
        mensaje: 'V59 está vacía. Esta variable debe registrar 1, 2, 3 o 98 según el estado actual del primer o único esquema.',
        regla: 'V59 es obligatoria dentro del bloque del primer o único esquema.',
        recomendacion: 'Registre 1 si el esquema finalizó completo, 2 si finalizó incompleto, 3 si no ha finalizado y continúa en tratamiento, o 98 si no tuvo esquema y V45=98.',
        valor: v59Original,
        datosRelacionados: [
          dato('V45', registro?.V45, describirValorV45(registro?.V45)),
          dato('V59', v59Original, 'La variable no tiene dato registrado.')
        ]
      }));

      return hallazgos;
    }

    const valoresPermitidos = ['1', '2', '3', '98'];

    if (!valoresPermitidos.includes(v59)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V59-ERROR-002',
        variable: 'V59',
        titulo: 'V59 tiene un valor diferente de 1, 2, 3 o 98',
        mensaje: `V59 tiene el valor ${texto(v59Original)}, pero esta variable solo permite 1, 2, 3 o 98.`,
        regla: 'El instructivo de V59 solo permite: 1 finalizado completo, 2 finalizado incompleto, 3 no finalizado aún bajo tratamiento, o 98 no aplica si V45=98.',
        recomendacion: 'Corrija V59 usando 1, 2, 3 o 98 según corresponda.',
        valor: v59Original,
        datosRelacionados: [
          dato('V45', registro?.V45, describirValorV45(registro?.V45)),
          dato('V59', v59Original, 'Valor fuera del catálogo permitido para V59.')
        ]
      }));
    }

    if (v45 === '98' && v59 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V59-ERROR-003',
        variable: 'V59',
        titulo: 'V45 indica que no tuvo esquema, pero V59 no está en 98',
        mensaje: `V45 tiene el valor 98, lo que indica que no tuvo esquema de terapia sistémica en el periodo. Sin embargo, V59 tiene el valor ${texto(v59Original)}. Para este caso, V59 debe ser 98.`,
        regla: 'Si V45=98, V59 debe ser 98 porque no tuvo ningún esquema de terapia sistémica.',
        recomendacion: 'Cambie V59 a 98.',
        valor: v59Original,
        datosRelacionados: [
          dato('V45', registro?.V45, describirValorV45(registro?.V45)),
          dato('V59', v59Original, describirValorV59(v59Original))
        ]
      }));
    }

    if (v45 === '1' && v59 === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V59-ERROR-004',
        variable: 'V59',
        titulo: 'V45 indica que tuvo terapia sistémica, pero V59 está en 98',
        mensaje: 'V45 tiene el valor 1, lo que indica que sí recibió quimioterapia u otra terapia sistémica en el periodo. Sin embargo, V59 tiene el valor 98. Para este caso, V59 debe registrar 1, 2 o 3 según las características actuales del esquema.',
        regla: 'Si V45=1, V59 no debe ser 98. Debe registrar 1 si finalizó completo, 2 si finalizó incompleto o 3 si no ha finalizado y continúa en tratamiento.',
        recomendacion: 'Cambie V59 a 1, 2 o 3 según el soporte clínico.',
        valor: v59Original,
        datosRelacionados: [
          dato('V45', registro?.V45, describirValorV45(registro?.V45)),
          dato('V59', v59Original, describirValorV59(v59Original))
        ]
      }));
    }

    return hallazgos;
  }


  function validarV60(registro) {
    const hallazgos = [];
    const v59Original = registro?.V59;
    const v59 = normalizarCodigo(v59Original);
    const v60Original = registro?.V60;
    const v60 = normalizarCodigo(v60Original);

    if (estaVacio(v60Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V60-ERROR-001',
        variable: 'V60',
        titulo: 'V60 está vacía',
        mensaje: 'V60 está vacía. Esta variable debe registrar un motivo entre 1 y 8 cuando V59=2, o 98 cuando no aplica.',
        regla: 'V60 es obligatoria dentro del bloque del primer o único esquema.',
        recomendacion: 'Registre el motivo de finalización prematura si V59=2. Si V60 no aplica, registre 98.',
        valor: v60Original,
        datosRelacionados: [
          dato('V59', v59Original, describirValorV59(v59Original)),
          dato('V60', v60Original, 'La variable no tiene dato registrado.')
        ]
      }));

      return hallazgos;
    }

    const valoresPermitidos = ['1', '2', '3', '4', '5', '6', '7', '8', '98'];
    const motivos = ['1', '2', '3', '4', '5', '6', '7', '8'];

    if (!valoresPermitidos.includes(v60)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V60-ERROR-002',
        variable: 'V60',
        titulo: 'V60 tiene un valor fuera del catálogo permitido',
        mensaje: `V60 tiene el valor ${texto(v60Original)}, pero esta variable solo permite 1, 2, 3, 4, 5, 6, 7, 8 o 98.`,
        regla: 'El instructivo de V60 solo permite motivos entre 1 y 8, o 98 cuando no aplica.',
        recomendacion: 'Corrija V60 usando un valor permitido: 1 a 8 si aplica motivo, o 98 si no aplica.',
        valor: v60Original,
        datosRelacionados: [
          dato('V59', v59Original, describirValorV59(v59Original)),
          dato('V60', v60Original, 'Valor fuera del catálogo permitido para V60.')
        ]
      }));
    }

    if (v59 === '2' && v60 === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V60-ERROR-003',
        variable: 'V60',
        titulo: 'V59=2 indica finalización incompleta, pero V60 está en 98',
        mensaje: 'V59 tiene el valor 2, que indica esquema incompleto pero finalizado por algún motivo. En ese caso V60 debe registrar el motivo de la finalización prematura con un valor entre 1 y 8.',
        regla: 'Si V59=2, V60 aplica y no debe ser 98.',
        recomendacion: 'Cambie V60 por el motivo que corresponda entre 1 y 8.',
        valor: v60Original,
        datosRelacionados: [
          dato('V59', v59Original, describirValorV59(v59Original)),
          dato('V60', v60Original, describirValorV60(v60Original))
        ]
      }));
    }

    if (v59 !== '2' && motivos.includes(v60)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V60-ERROR-004',
        variable: 'V60',
        titulo: 'V60 registra un motivo, pero V59 no está en 2',
        mensaje: `V60 tiene el valor ${v60}, que corresponde a un motivo de finalización prematura. Sin embargo, V59 tiene el valor ${texto(v59Original)}. V60 solo aplica cuando V59=2.`,
        regla: 'Si V59 es diferente de 2, V60 debe ser 98.',
        recomendacion: 'Cambie V60 a 98 si no aplica motivo de finalización prematura. Si realmente hubo finalización incompleta por un motivo, revise V59.',
        valor: v60Original,
        datosRelacionados: [
          dato('V59', v59Original, describirValorV59(v59Original)),
          dato('V60', v60Original, describirValorV60(v60Original))
        ],
        columnasCorregir: ['V59', 'V60']
      }));
    }

    return hallazgos;
  }

  function validar(registro) {
    let hallazgos = [];

    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V57')) {
      hallazgos = hallazgos.concat(validarV57(registro));
    }

    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V58')) {
      hallazgos = hallazgos.concat(validarV58(registro));
    }

    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V59')) {
      hallazgos = hallazgos.concat(validarV59(registro));
    }

    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V60')) {
      hallazgos = hallazgos.concat(validarV60(registro));
    }

    return hallazgos;
  }

  window.CACModulo13 = {
    version: VERSION,
    validar,
    validarV57,
    validarV58,
    validarV59,
    validarV60
  };
})();
