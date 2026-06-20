(function () {
  'use strict';

  const VERSION = 'sprint-3o-v134-fecha-corte-01';
  const CATALOGO_V128 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "15", "16", "17", "18", "19"];
  const CATALOGO_V129 = ["1", "3", "8", "9", "10", "11", "12"];
  const CATALOGO_V132 = ["1", "2", "3", "4", "98"];
  const NO_APLICA_FECHA = '1845-01-01';
  const FECHA_CORTE_V134 = '2025-01-01';
  const CENTINELAS_FECHA_NO_PERMITIDAS_V130 = ['1800-01-01'];
  const CENTINELAS_FECHA_NO_PERMITIDAS_V131 = ['1800-01-01'];

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

  function normalizarFecha(valor) {
    return texto(valor).trim();
  }

  function tieneFormatoFecha(valor) {
    return /^\d{4}-\d{2}-\d{2}$/.test(normalizarFecha(valor));
  }

  function esFechaCalendarioValida(valor) {
    const fecha = normalizarFecha(valor);
    if (!tieneFormatoFecha(fecha)) return false;

    const [anio, mes, dia] = fecha.split('-').map(Number);
    const fechaUtc = new Date(Date.UTC(anio, mes - 1, dia));

    return fechaUtc.getUTCFullYear() === anio &&
      fechaUtc.getUTCMonth() === mes - 1 &&
      fechaUtc.getUTCDate() === dia;
  }

  function esCentinelaFechaNoPermitidaV130(valor) {
    return CENTINELAS_FECHA_NO_PERMITIDAS_V130.includes(normalizarFecha(valor));
  }

  function esCentinelaFechaNoPermitidaV131(valor) {
    return CENTINELAS_FECHA_NO_PERMITIDAS_V131.includes(normalizarFecha(valor));
  }

  function nombreVariable(variable) {
    const nombres = {
      V126: 'Resultado final del manejo oncológico en este periodo de reporte',
      V127: 'Estado vital al finalizar este periodo de reporte',
      V128: 'Novedad administrativa del usuario respecto al reporte anterior',
      V129: 'Novedad clínica del usuario a la fecha de corte',
      V130: 'Fecha de desafiliación de la EAPB',
      V131: 'Fecha de muerte',
      V132: 'Causa de muerte',
      V133: 'Código único de identificación BDUA-BDEX-PVS',
      V134: 'Fecha de Corte'
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

  function describirValorV126(valor) {
    const codigo = normalizarCodigo(valor);

    if (!codigo) return 'V126 está vacía.';
    if (codigo === '1') return 'V126=1 indica pseudoprogresión. El instructivo aclara que aplica sólo para inmunoterapia; esta trazabilidad no se automatiza todavía para evitar falsos positivos.';
    if (codigo === '2') return 'V126=2 indica progresión o recaída.';
    if (codigo === '3') return 'V126=3 indica respuesta parcial.';
    if (codigo === '4') return 'V126=4 indica respuesta completa.';
    if (codigo === '5') return 'V126=5 indica enfermedad estable.';
    if (codigo === '6') return 'V126=6 indica abandono del tratamiento o alta voluntaria.';
    if (codigo === '7') return 'V126=7 indica paciente en seguimiento por antecedente de cáncer. El instructivo exige mínimo una atención relacionada en el periodo; esta trazabilidad no se automatiza todavía sin variable confirmada.';
    if (codigo === '8') return 'V126=8 indica pendiente iniciar el tratamiento luego del diagnóstico.';
    if (codigo === '97') return 'V126=97 indica no aplicable en este periodo porque continúa bajo tratamiento inicial.';
    if (codigo === '98') return 'V126=98 indica no aplicable en este periodo porque continúa bajo tratamiento de recaída.';
    if (codigo === '99') return 'V126=99 indica No Aplica por fallecimiento o desafiliación. La trazabilidad administrativa o vital no se automatiza todavía sin variables confirmadas.';

    return `V126 tiene el valor ${texto(valor)}.`;
  }

  function describirValorV127(valor) {
    const codigo = normalizarCodigo(valor);

    if (!codigo) return 'V127 está vacía.';
    if (codigo === '1') return 'V127=1 indica que el usuario está vivo al finalizar este periodo de reporte.';
    if (codigo === '2') return 'V127=2 indica que el usuario está fallecido al finalizar este periodo de reporte.';
    if (codigo === '99') return 'V127=99 indica estado vital desconocido al finalizar este periodo de reporte.';

    return `V127 tiene el valor ${texto(valor)}.`;
  }

  function describirValorV128(valor) {
    const codigo = normalizarCodigo(valor);

    if (!codigo) return 'V128 está vacía.';
    if (codigo === '0') return 'V128=0 indica no presenta novedad con respecto al reporte anterior; vivo y afiliado a la entidad.';
    if (codigo === '1') return 'V128=1 indica usuario ingresó a la EAPB en el periodo de reporte y ya tenía diagnóstico de cáncer.';
    if (codigo === '2') return 'V128=2 indica usuario con nuevo diagnóstico de cáncer en el periodo definido por el instructivo.';
    if (codigo === '3') return 'V128=3 indica usuario con diagnóstico antiguo de cáncer que no había sido incluido en el reporte anterior.';
    if (codigo === '4') return 'V128=4 indica usuario que falleció.';
    if (codigo === '5') return 'V128=5 indica usuario que se desafilió.';
    if (codigo === '6') return 'V128=6 indica usuario para eliminar de la base de datos por corrección luego de auditoría interna o de CAC.';
    if (codigo === '7') return 'V128=7 indica usuario que firmó alta voluntaria del tratamiento.';
    if (codigo === '8') return 'V128=8 indica usuario con cambio de tipo o número de ID.';
    if (codigo === '9') return 'V128=9 indica usuario abandonó el tratamiento y es imposible de ubicar.';
    if (codigo === '10') return 'V128=10 indica usuario no incluido en reporte anterior y está fallecido en el momento del reporte actual.';
    if (codigo === '11') return 'V128=11 indica trasladado de IPS.';
    if (codigo === '12') return 'V128=12 indica usuario notificado con dos o más cánceres en este periodo.';
    if (codigo === '13') return 'V128=13 indica usuario no incluido en reporte anterior y está desafiliado en el momento del reporte actual.';
    if (codigo === '15') return 'V128=15 indica comunidad migrante de la República de Venezuela.';
    if (codigo === '16') return 'V128=16 indica usuario con cambio de CIE-10.';
    if (codigo === '17') return 'V128=17 indica usuario identificado por cruce con fuentes externas, con diagnóstico de cáncer no gestionado por la EAPB.';
    if (codigo === '18') return 'V128=18 indica usuario identificado por cruce con fuentes externas, con diagnóstico descartado por la EAPB o fallecido/desafiliado no gestionado sin diagnóstico confirmado.';
    if (codigo === '19') return 'V128=19 indica paciente trasladado que fue glosado en periodo anterior y no fue gestionado por la entidad en el periodo actual.';

    if (codigo === '14') return 'V128=14 no existe en el catálogo oficial entregado para esta variable.';

    return `V128 tiene el valor ${texto(valor)}.`;
  }


  function describirValorV129(valor) {
    const codigo = normalizarCodigo(valor);

    if (!codigo) return 'V129 está vacía.';
    if (codigo === '1') return 'V129=1 indica usuario que está en manejo inicial curativo.';
    if (codigo === '3') return 'V129=3 indica usuario que finalizó tratamiento inicial y está en seguimiento.';
    if (codigo === '8') return 'V129=8 indica abandono de tratamiento.';
    if (codigo === '9') return 'V129=9 indica usuario que firmó alta voluntaria.';
    if (codigo === '10') return 'V129=10 indica usuario en manejo expectante antes de tratamiento.';
    if (codigo === '11') return 'V129=11 indica usuario que está en manejo paliativo, incluyendo manejo de metástasis o recaída. La aclaración oficial indica que recopila pacientes con todos los tipos de cáncer que reciben terapia con intención paliativa a la fecha de corte.';
    if (codigo === '12') return 'V129=12 indica usuario fallecido o desafiliado.';

    return `V129 tiene el valor ${texto(valor)}.`;
  }

  function describirValorV130(valor) {
    const fecha = normalizarFecha(valor);

    if (!fecha) return 'V130 está vacía.';
    if (fecha === NO_APLICA_FECHA) return 'V130=1845-01-01 indica No Aplica: el usuario no se desafilió de la EAPB.';
    if (esCentinelaFechaNoPermitidaV130(fecha)) return `V130=${fecha} corresponde a una fecha centinela usada en otras variables, pero no está permitida por el instructivo de V130.`;
    if (tieneFormatoFecha(fecha) && esFechaCalendarioValida(fecha)) return `V130=${fecha} registra una fecha real de desafiliación de la EAPB.`;
    if (tieneFormatoFecha(fecha)) return `V130=${fecha} tiene formato AAAA-MM-DD, pero no existe en el calendario.`;

    return `V130 tiene el valor ${texto(valor)}.`;
  }


  function describirValorV131(valor) {
    const fecha = normalizarFecha(valor);

    if (!fecha) return 'V131 está vacía.';
    if (fecha === NO_APLICA_FECHA) return 'V131=1845-01-01 indica No Aplica: el usuario no falleció o su estado vital no se conoce.';
    if (esCentinelaFechaNoPermitidaV131(fecha)) return `V131=${fecha} corresponde a una fecha centinela usada en otras variables, pero no está permitida por el instructivo de V131.`;
    if (tieneFormatoFecha(fecha) && esFechaCalendarioValida(fecha)) return `V131=${fecha} registra una fecha real de muerte.`;
    if (tieneFormatoFecha(fecha)) return `V131=${fecha} tiene formato AAAA-MM-DD, pero no existe en el calendario.`;

    return `V131 tiene el valor ${texto(valor)}.`;
  }


  function describirValorV132(valor) {
    const codigo = normalizarCodigo(valor);

    if (!codigo) return 'V132 está vacía.';
    if (codigo === '1') return 'V132=1 indica muerte asociada al cáncer.';
    if (codigo === '2') return 'V132=2 indica muerte por patología clínica no relacionada al cáncer.';
    if (codigo === '3') return 'V132=3 indica muerte por causa externa.';
    if (codigo === '4') return 'V132=4 indica muerte por causa no conocida.';
    if (codigo === '98') return 'V132=98 indica No Aplica: usuario vivo o se desconoce su estado vital.';

    return `V132 tiene el valor ${texto(valor)}.`;
  }


  function describirValorV133(valor) {
    const codigo = texto(valor);

    if (!codigo) return 'V133 está vacía.';
    return `V133 registra el código único serial BDUA-BDEX-PVS: ${codigo}.`;
  }


  function describirValorV134(valor) {
    const fecha = normalizarFecha(valor);

    if (!fecha) return 'V134 está vacía.';
    if (fecha === FECHA_CORTE_V134) return 'V134=2025-01-01 corresponde a la fecha de corte oficial del periodo 2025.';
    if (tieneFormatoFecha(fecha) && esFechaCalendarioValida(fecha)) return `V134=${fecha} es una fecha real, pero no corresponde a la fecha de corte exigida: 2025-01-01.`;
    if (tieneFormatoFecha(fecha)) return `V134=${fecha} tiene formato AAAA-MM-DD, pero no existe en el calendario.`;

    return `V134 tiene el valor ${texto(valor)}.`;
  }

  function esValorPermitidoV126(valor) {
    return ['1', '2', '3', '4', '5', '6', '7', '8', '97', '98', '99'].includes(normalizarCodigo(valor));
  }

  function esValorPermitidoV127(valor) {
    return ['1', '2', '99'].includes(normalizarCodigo(valor));
  }

  function esValorPermitidoV128(valor) {
    return CATALOGO_V128.includes(normalizarCodigo(valor));
  }

  function esValorPermitidoV129(valor) {
    return CATALOGO_V129.includes(normalizarCodigo(valor));
  }

  function esValorPermitidoV132(valor) {
    return CATALOGO_V132.includes(normalizarCodigo(valor));
  }

  // V126. Resultado final del manejo oncológico en este periodo de reporte
  function validarV126(registro) {
    const hallazgos = [];
    const valor = registro?.V126;

    if (estaVacio(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V126-ERROR-001',
        variable: 'V126',
        titulo: 'V126 está vacía',
        mensaje: 'V126 está vacía. Debe registrar el resultado final del manejo oncológico en este periodo de reporte según el catálogo oficial.',
        regla: 'El instructivo de V126 exige registrar una de las opciones válidas para el resultado final del manejo oncológico en el periodo: 1, 2, 3, 4, 5, 6, 7, 8, 97, 98 o 99.',
        recomendacion: 'Revise V126 y registre el código que corresponda al resultado final del manejo oncológico en este periodo de reporte.',
        valor,
        datosRelacionados: [dato('V126', valor, describirValorV126(valor))],
        columnasCorregir: ['V126']
      }));
      return hallazgos;
    }

    if (!esValorPermitidoV126(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V126-ERROR-002',
        variable: 'V126',
        titulo: 'V126 tiene un valor fuera de catálogo',
        mensaje: 'V126 tiene un valor fuera de catálogo. Sólo se permiten los valores 1, 2, 3, 4, 5, 6, 7, 8, 97, 98 y 99.',
        regla: 'El catálogo oficial de V126 sólo permite: 1 pseudoprogresión; 2 progresión o recaída; 3 respuesta parcial; 4 respuesta completa; 5 enfermedad estable; 6 abandono o alta voluntaria; 7 seguimiento por antecedente; 8 pendiente iniciar tratamiento; 97 bajo tratamiento inicial; 98 bajo tratamiento de recaída; 99 fallecido o desafiliado.',
        recomendacion: 'Corrija V126 usando únicamente uno de los códigos permitidos por el instructivo oficial.',
        valor,
        datosRelacionados: [dato('V126', valor, describirValorV126(valor))],
        columnasCorregir: ['V126']
      }));
    }

    return hallazgos;
  }

  // V127. Estado vital al finalizar este periodo de reporte
  function validarV127(registro) {
    const hallazgos = [];
    const valor = registro?.V127;

    if (estaVacio(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V127-ERROR-001',
        variable: 'V127',
        titulo: 'V127 está vacía',
        mensaje: 'V127 está vacía. Debe registrar el estado vital al finalizar este periodo de reporte: 1 vivo, 2 fallecido o 99 desconocido.',
        regla: 'El instructivo de V127 exige registrar el estado vital al finalizar el periodo de reporte con una de las opciones válidas: 1 vivo, 2 fallecido o 99 desconocido.',
        recomendacion: 'Revise V127 y registre 1, 2 o 99 según el estado vital al finalizar el periodo de reporte.',
        valor,
        datosRelacionados: [dato('V127', valor, describirValorV127(valor))],
        columnasCorregir: ['V127']
      }));
      return hallazgos;
    }

    if (!esValorPermitidoV127(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V127-ERROR-002',
        variable: 'V127',
        titulo: 'V127 tiene un valor fuera de catálogo',
        mensaje: 'V127 tiene un valor fuera de catálogo. Sólo se permiten los valores 1, 2 y 99.',
        regla: 'El catálogo oficial de V127 sólo permite: 1 vivo, 2 fallecido y 99 desconocido.',
        recomendacion: 'Corrija V127 usando únicamente uno de los códigos permitidos por el instructivo oficial.',
        valor,
        datosRelacionados: [dato('V127', valor, describirValorV127(valor))],
        columnasCorregir: ['V127']
      }));
    }

    return hallazgos;
  }

  // V128. Novedad administrativa del usuario respecto al reporte anterior
  function validarV128(registro) {
    const hallazgos = [];
    const valor = registro?.V128;

    if (estaVacio(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V128-ERROR-001',
        variable: 'V128',
        titulo: 'V128 está vacía',
        mensaje: 'V128 está vacía. Debe registrar la novedad administrativa del usuario respecto al reporte anterior según el catálogo oficial.',
        regla: 'El instructivo de V128 exige registrar una novedad administrativa del usuario respecto al reporte anterior. El catálogo permitido es: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19.',
        recomendacion: 'Revise V128 y registre el código de novedad administrativa que corresponda. No use códigos que no están en el catálogo, por ejemplo 14 o 98.',
        valor,
        datosRelacionados: [dato('V128', valor, describirValorV128(valor))],
        columnasCorregir: ['V128']
      }));
      return hallazgos;
    }

    if (!esValorPermitidoV128(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V128-ERROR-002',
        variable: 'V128',
        titulo: 'V128 tiene un valor fuera de catálogo',
        mensaje: 'V128 tiene un valor fuera de catálogo. Sólo se permiten los valores 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18 y 19.',
        regla: 'El catálogo oficial de V128 no incluye 14, 98 ni otros valores fuera de la lista permitida. Las aclaraciones de prioridad administrativa no se automatizan todavía porque dependen de contexto externo o variables soporte no confirmadas.',
        recomendacion: 'Corrija V128 usando únicamente uno de los códigos permitidos por el instructivo oficial. Si considera que el caso requiere una regla cruzada, documente el soporte y confirme la trazabilidad antes de automatizarla.',
        valor,
        datosRelacionados: [dato('V128', valor, describirValorV128(valor))],
        columnasCorregir: ['V128']
      }));
    }

    return hallazgos;
  }


  // V129. Novedad clínica del usuario a la fecha de corte
  function validarV129(registro) {
    const hallazgos = [];
    const valor = registro?.V129;

    if (estaVacio(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V129-ERROR-001',
        variable: 'V129',
        titulo: 'V129 está vacía',
        mensaje: 'V129 está vacía. Debe registrar la novedad clínica del usuario a la fecha de corte según el catálogo oficial.',
        regla: 'El instructivo de V129 exige registrar la novedad clínica del usuario a la fecha de corte. El catálogo permitido es: 1, 3, 8, 9, 10, 11 y 12.',
        recomendacion: 'Revise V129 y registre el código de novedad clínica que corresponda. No use códigos administrativos de V128 ni valores fuera del catálogo, por ejemplo 0, 2, 4, 5, 6, 7, 13, 15, 16, 17, 18, 19, 98 o 99.',
        valor,
        datosRelacionados: [dato('V129', valor, describirValorV129(valor))],
        columnasCorregir: ['V129']
      }));
      return hallazgos;
    }

    if (!esValorPermitidoV129(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V129-ERROR-002',
        variable: 'V129',
        titulo: 'V129 tiene un valor fuera de catálogo',
        mensaje: 'V129 tiene un valor fuera de catálogo. Sólo se permiten los valores 1, 3, 8, 9, 10, 11 y 12.',
        regla: 'El catálogo oficial de V129 sólo permite: 1 manejo inicial curativo; 3 finalizó tratamiento inicial y seguimiento; 8 abandono; 9 alta voluntaria; 10 manejo expectante antes de tratamiento; 11 manejo paliativo; 12 fallecido o desafiliado. Las trazabilidades con V127, V128 o V125 no se automatizan en esta versión para evitar falsos positivos.',
        recomendacion: 'Corrija V129 usando únicamente uno de los códigos permitidos por el instructivo oficial. Si el caso requiere cruce clínico-administrativo, confirme primero la trazabilidad y las variables soporte.',
        valor,
        datosRelacionados: [dato('V129', valor, describirValorV129(valor))],
        columnasCorregir: ['V129']
      }));
    }

    return hallazgos;
  }

  // V130. Fecha de desafiliación de la EAPB
  function validarV130(registro) {
    const hallazgos = [];
    const valor = registro?.V130;
    const fecha = normalizarFecha(valor);

    if (estaVacio(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V130-ERROR-001',
        variable: 'V130',
        titulo: 'V130 está vacía',
        mensaje: 'V130 está vacía. Debe registrar la fecha de desafiliación de la EAPB en formato AAAA-MM-DD, o 1845-01-01 si el usuario no se desafilió.',
        regla: 'El instructivo de V130 exige registrar la fecha en la que el usuario se desafilió de la EAPB en formato AAAA-MM-DD. El valor 1845-01-01 significa No Aplica, el usuario no se desafilió.',
        recomendacion: 'Revise V130 y registre una fecha válida en formato AAAA-MM-DD, o 1845-01-01 si el usuario no se desafilió.',
        valor,
        datosRelacionados: [dato('V130', valor, describirValorV130(valor))],
        columnasCorregir: ['V130']
      }));
      return hallazgos;
    }

    if (!tieneFormatoFecha(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V130-ERROR-002',
        variable: 'V130',
        titulo: 'V130 no tiene formato AAAA-MM-DD',
        mensaje: 'V130 no tiene el formato permitido. Debe registrar la fecha de desafiliación en formato AAAA-MM-DD, o 1845-01-01 si no aplica.',
        regla: 'El instructivo de V130 exige formato AAAA-MM-DD para la fecha de desafiliación de la EAPB.',
        recomendacion: 'Corrija V130 usando el formato AAAA-MM-DD. Ejemplo válido: 2024-06-15. Si el usuario no se desafilió, use 1845-01-01.',
        valor,
        datosRelacionados: [dato('V130', valor, describirValorV130(valor))],
        columnasCorregir: ['V130']
      }));
      return hallazgos;
    }

    if (!esFechaCalendarioValida(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V130-ERROR-003',
        variable: 'V130',
        titulo: 'V130 registra una fecha inexistente',
        mensaje: 'V130 tiene formato AAAA-MM-DD, pero la fecha registrada no existe en el calendario.',
        regla: 'Además de cumplir el formato AAAA-MM-DD, V130 debe contener una fecha calendario válida o 1845-01-01 cuando no aplica.',
        recomendacion: 'Revise V130 y corrija año, mes y día de la fecha de desafiliación.',
        valor,
        datosRelacionados: [dato('V130', valor, describirValorV130(valor))],
        columnasCorregir: ['V130']
      }));
      return hallazgos;
    }

    if (esCentinelaFechaNoPermitidaV130(fecha)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V130-ERROR-004',
        variable: 'V130',
        titulo: 'V130 usa una fecha centinela no permitida',
        mensaje: 'V130 usa una fecha centinela no permitida para esta variable. En V130 sólo se permite 1845-01-01 como No Aplica.',
        regla: 'El instructivo de V130 define 1845-01-01 como único valor de No Aplica. Otros centinelas usados en variables clínicas, como 1800-01-01, no aplican para fecha de desafiliación.',
        recomendacion: 'Corrija V130 registrando la fecha real de desafiliación en formato AAAA-MM-DD, o 1845-01-01 si el usuario no se desafilió.',
        valor,
        datosRelacionados: [dato('V130', valor, describirValorV130(valor))],
        columnasCorregir: ['V130']
      }));
    }

    return hallazgos;
  }


  // V131. Fecha de muerte
  function validarV131(registro) {
    const hallazgos = [];
    const valor = registro?.V131;
    const fecha = normalizarFecha(valor);

    if (estaVacio(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V131-ERROR-001',
        variable: 'V131',
        titulo: 'V131 está vacía',
        mensaje: 'V131 está vacía. Debe registrar la fecha de muerte en formato AAAA-MM-DD, o 1845-01-01 si el usuario no falleció o su estado vital no se conoce.',
        regla: 'El instructivo de V131 exige registrar la fecha en la que el usuario falleció en formato AAAA-MM-DD. El valor 1845-01-01 significa No Aplica: el usuario no falleció o su estado vital no se conoce.',
        recomendacion: 'Revise V131 y registre una fecha válida en formato AAAA-MM-DD, o 1845-01-01 si el usuario no falleció o su estado vital no se conoce.',
        valor,
        datosRelacionados: [dato('V131', valor, describirValorV131(valor))],
        columnasCorregir: ['V131']
      }));
      return hallazgos;
    }

    if (!tieneFormatoFecha(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V131-ERROR-002',
        variable: 'V131',
        titulo: 'V131 no tiene formato AAAA-MM-DD',
        mensaje: 'V131 no tiene el formato permitido. Debe registrar la fecha de muerte en formato AAAA-MM-DD, o 1845-01-01 si no aplica.',
        regla: 'El instructivo de V131 exige formato AAAA-MM-DD para la fecha de muerte.',
        recomendacion: 'Corrija V131 usando el formato AAAA-MM-DD. Ejemplo válido: 2024-06-15. Si el usuario no falleció o su estado vital no se conoce, use 1845-01-01.',
        valor,
        datosRelacionados: [dato('V131', valor, describirValorV131(valor))],
        columnasCorregir: ['V131']
      }));
      return hallazgos;
    }

    if (!esFechaCalendarioValida(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V131-ERROR-003',
        variable: 'V131',
        titulo: 'V131 registra una fecha inexistente',
        mensaje: 'V131 tiene formato AAAA-MM-DD, pero la fecha registrada no existe en el calendario.',
        regla: 'Además de cumplir el formato AAAA-MM-DD, V131 debe contener una fecha calendario válida o 1845-01-01 cuando no aplica.',
        recomendacion: 'Revise V131 y corrija año, mes y día de la fecha de muerte.',
        valor,
        datosRelacionados: [dato('V131', valor, describirValorV131(valor))],
        columnasCorregir: ['V131']
      }));
      return hallazgos;
    }

    if (esCentinelaFechaNoPermitidaV131(fecha)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V131-ERROR-004',
        variable: 'V131',
        titulo: 'V131 usa una fecha centinela no permitida',
        mensaje: 'V131 usa una fecha centinela no permitida para esta variable. En V131 sólo se permite 1845-01-01 como No Aplica.',
        regla: 'El instructivo de V131 define 1845-01-01 como único valor de No Aplica. Otros centinelas usados en variables clínicas, como 1800-01-01, no aplican para fecha de muerte.',
        recomendacion: 'Corrija V131 registrando la fecha real de muerte en formato AAAA-MM-DD, o 1845-01-01 si el usuario no falleció o su estado vital no se conoce.',
        valor,
        datosRelacionados: [dato('V131', valor, describirValorV131(valor))],
        columnasCorregir: ['V131']
      }));
    }

    return hallazgos;
  }


  // V132. Causa de muerte
  function validarV132(registro) {
    const hallazgos = [];
    const valor = registro?.V132;

    if (estaVacio(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V132-ERROR-001',
        variable: 'V132',
        titulo: 'V132 está vacía',
        mensaje: 'V132 está vacía. Debe registrar la causa de muerte según el catálogo oficial, o 98 si no aplica porque el usuario está vivo o se desconoce su estado vital.',
        regla: 'El instructivo de V132 exige registrar la causa de muerte. El catálogo permitido es: 1, 2, 3, 4 y 98.',
        recomendacion: 'Revise V132 y registre 1, 2, 3, 4 o 98 según corresponda.',
        valor,
        datosRelacionados: [dato('V132', valor, describirValorV132(valor))],
        columnasCorregir: ['V132']
      }));
      return hallazgos;
    }

    if (!esValorPermitidoV132(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V132-ERROR-002',
        variable: 'V132',
        titulo: 'V132 tiene un valor fuera de catálogo',
        mensaje: 'V132 tiene un valor fuera de catálogo. Sólo se permiten los valores 1, 2, 3, 4 y 98.',
        regla: 'El catálogo oficial de V132 sólo permite: 1 muerte asociada al cáncer; 2 muerte por patología clínica no relacionada al cáncer; 3 muerte por causa externa; 4 muerte por causa no conocida; 98 No Aplica, usuario vivo o se desconoce su estado vital. Los cruces con V127, V128, V129 o V131 no se automatizan todavía para evitar falsos positivos.',
        recomendacion: 'Corrija V132 usando únicamente uno de los códigos permitidos por el instructivo oficial. Si el caso requiere cruce con fecha de muerte o estado vital, confirme primero la trazabilidad y las variables soporte.',
        valor,
        datosRelacionados: [dato('V132', valor, describirValorV132(valor))],
        columnasCorregir: ['V132']
      }));
    }

    return hallazgos;
  }


  // V133. Código único de identificación BDUA-BDEX-PVS
  function validarV133(registro) {
    const hallazgos = [];
    const valor = registro?.V133;

    if (estaVacio(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V133-ERROR-001',
        variable: 'V133',
        titulo: 'V133 está vacía',
        mensaje: 'V133 está vacía. Debe registrar el código único serial de identificación BDUA-BDEX-PVS asignado al paciente por el Ministerio de Salud y Protección Social.',
        regla: 'El instructivo de V133 exige registrar el código único serial de identificación BDUA-BDEX-PVS asignado al paciente por el Ministerio de Salud y Protección Social. El instructivo entregado no define longitud, patrón numérico ni catálogo adicional; por eso esta versión sólo valida obligatoriedad del dato.',
        recomendacion: 'Revise V133 y registre el código único serial BDUA-BDEX-PVS asignado al paciente. No deje el campo vacío.',
        valor,
        datosRelacionados: [dato('V133', valor, describirValorV133(valor))],
        columnasCorregir: ['V133']
      }));
    }

    return hallazgos;
  }


  // V134. Fecha de Corte
  function validarV134(registro) {
    const hallazgos = [];
    const valor = registro?.V134;
    const fecha = normalizarFecha(valor);

    if (estaVacio(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V134-ERROR-001',
        variable: 'V134',
        titulo: 'V134 está vacía',
        mensaje: 'V134 está vacía. Debe diligenciarse con la fecha de corte 2025-01-01.',
        regla: 'El instructivo de V134 exige diligenciar esta variable con la fecha 2025-01-01.',
        recomendacion: 'Registre 2025-01-01 en V134.',
        valor,
        datosRelacionados: [dato('V134', valor, describirValorV134(valor))],
        columnasCorregir: ['V134']
      }));
      return hallazgos;
    }

    if (!tieneFormatoFecha(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V134-ERROR-002',
        variable: 'V134',
        titulo: 'V134 no tiene formato AAAA-MM-DD',
        mensaje: 'V134 no tiene el formato permitido. Debe registrarse exactamente como 2025-01-01.',
        regla: 'El instructivo exige registrar la fecha de corte en formato AAAA-MM-DD y con valor 2025-01-01.',
        recomendacion: 'Corrija V134 y registre 2025-01-01.',
        valor,
        datosRelacionados: [dato('V134', valor, describirValorV134(valor))],
        columnasCorregir: ['V134']
      }));
      return hallazgos;
    }

    if (!esFechaCalendarioValida(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V134-ERROR-003',
        variable: 'V134',
        titulo: 'V134 registra una fecha inexistente',
        mensaje: 'V134 tiene formato AAAA-MM-DD, pero la fecha registrada no existe en el calendario.',
        regla: 'Además de cumplir el formato AAAA-MM-DD, V134 debe contener una fecha real. Para esta variable, el único valor correcto es 2025-01-01.',
        recomendacion: 'Corrija V134 y registre 2025-01-01.',
        valor,
        datosRelacionados: [dato('V134', valor, describirValorV134(valor))],
        columnasCorregir: ['V134']
      }));
      return hallazgos;
    }

    if (fecha !== FECHA_CORTE_V134) {
      hallazgos.push(crearHallazgo({
        codigo: 'V134-ERROR-004',
        variable: 'V134',
        titulo: 'V134 tiene una fecha diferente a la fecha de corte',
        mensaje: 'V134 debe ser exactamente 2025-01-01. El valor registrado no corresponde a la fecha de corte exigida.',
        regla: 'El instructivo de V134 indica expresamente: diligencie esta variable con la fecha 2025-01-01.',
        recomendacion: 'Cambie V134 a 2025-01-01.',
        valor,
        datosRelacionados: [dato('V134', valor, describirValorV134(valor))],
        columnasCorregir: ['V134']
      }));
    }

    return hallazgos;
  }

  function validar(registro) {
    let hallazgos = [];

    // V126. Resultado final del manejo oncológico en este periodo de reporte
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V126')) {
      hallazgos = hallazgos.concat(validarV126(registro));
    }

    // V127. Estado vital al finalizar este periodo de reporte
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V127')) {
      hallazgos = hallazgos.concat(validarV127(registro));
    }

    // V128. Novedad administrativa del usuario respecto al reporte anterior
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V128')) {
      hallazgos = hallazgos.concat(validarV128(registro));
    }

    // V129. Novedad clínica del usuario a la fecha de corte
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V129')) {
      hallazgos = hallazgos.concat(validarV129(registro));
    }

    // V130. Fecha de desafiliación de la EAPB
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V130')) {
      hallazgos = hallazgos.concat(validarV130(registro));
    }

    // V131. Fecha de muerte
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V131')) {
      hallazgos = hallazgos.concat(validarV131(registro));
    }

    // V132. Causa de muerte
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V132')) {
      hallazgos = hallazgos.concat(validarV132(registro));
    }

    // V133. Código único de identificación BDUA-BDEX-PVS
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V133')) {
      hallazgos = hallazgos.concat(validarV133(registro));
    }

    // V134. Fecha de Corte
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V134')) {
      hallazgos = hallazgos.concat(validarV134(registro));
    }

    return hallazgos;
  }

  window.CACModulo20 = {
    version: VERSION,
    validar,
    validarV126,
    validarV127,
    validarV128,
    validarV129,
    validarV130,
    validarV131,
    validarV132,
    validarV133,
    validarV134
  };
})();
