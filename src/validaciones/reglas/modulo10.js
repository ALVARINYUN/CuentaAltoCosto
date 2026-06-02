(function () {
  'use strict';

  const VERSION = 'sprint-3d-v52-codigo-ips2-01';

  const TIPO = {
    FORMATO: 'formato',
    CATALOGO: 'catalogo',
    COHERENCIA: 'coherencia',
    DEPENDENCIA: 'dependencia'
  };

  const SEVERIDAD = {
    ERROR: 'error',
    ADVERTENCIA: 'advertencia'
  };

  const NOMBRES_VARIABLES = {
    V45: 'Recibió quimioterapia u otra terapia sistémica en el periodo de reporte',
    V48: 'Ubicación temporal del primer o único esquema de quimioterapia o terapia sistémica',
    V49: 'Fecha de inicio del primer o único esquema de quimioterapia o terapia sistémica',
    V50: 'Número de IPS que suministran el primer o único esquema de quimioterapia o terapia sistémica',
    V51: 'Código de la IPS1 que suministra el primer o único esquema de quimioterapia o terapia sistémica',
    V52: 'Código de la IPS2 que suministra el primer o único esquema de quimioterapia o terapia sistémica'
  };

  const CATALOGO_V48 = ['1', '2', '3', '11', '12', '13', '98'];

  function texto(valor) {
    return String(valor ?? '').trim();
  }

  function estaVacio(valor) {
    return texto(valor) === '';
  }

  function nombreVariable(variable) {
    return NOMBRES_VARIABLES[variable] || variable;
  }

  function descripcionV45(registro) {
    const v45 = texto(registro ? registro.V45 : '');

    if (v45 === '1') {
      return 'V45 tiene el valor 1; indica que recibió quimioterapia u otra terapia sistémica dentro del periodo de reporte.';
    }

    if (v45 === '98') {
      return 'V45 tiene el valor 98; indica que la terapia sistémica no aplica para el cáncer reportado en esta línea.';
    }

    if (v45) {
      return `${v45} es el valor registrado en V45.`;
    }

    return 'V45 registra si recibió quimioterapia u otra terapia sistémica dentro del periodo de reporte.';
  }

  function descripcionV48(registro) {
    const v48 = texto(registro ? registro.V48 : '');

    if (v48 === '1') {
      return 'V48 tiene el valor 1; indica neoadyuvancia, manejo inicial prequirúrgico.';
    }

    if (v48 === '2') {
      return 'V48 tiene el valor 2; indica tratamiento inicial curativo sin cirugía sugerida.';
    }

    if (v48 === '3') {
      return 'V48 tiene el valor 3; indica adyuvancia, manejo inicial postquirúrgico.';
    }

    if (v48 === '11') {
      return 'V48 tiene el valor 11; indica manejo de recaída.';
    }

    if (v48 === '12') {
      return 'V48 tiene el valor 12; indica manejo de enfermedad metastásica.';
    }

    if (v48 === '13') {
      return 'V48 tiene el valor 13; indica manejo paliativo sin manejo de recaída ni enfermedad metastásica.';
    }

    if (v48 === '98') {
      return 'V48 tiene el valor 98; indica no aplica, según el valor registrado en V45.';
    }

    if (v48) {
      return `${v48} es el valor registrado en V48.`;
    }

    return 'V48 está vacía.';
  }


  function esFechaFormatoValido(valor) {
    return /^\d{4}-\d{2}-\d{2}$/.test(texto(valor));
  }

  function esFechaReal(valor) {
    const limpio = texto(valor);

    if (!esFechaFormatoValido(limpio)) return false;

    const [anio, mes, dia] = limpio.split('-').map(Number);
    const fecha = new Date(Date.UTC(anio, mes - 1, dia));

    return fecha.getUTCFullYear() === anio &&
      fecha.getUTCMonth() === mes - 1 &&
      fecha.getUTCDate() === dia;
  }

  function esFechaFutura(valor) {
    if (!esFechaReal(valor)) return false;

    const [anio, mes, dia] = texto(valor).split('-').map(Number);
    const fecha = new Date(Date.UTC(anio, mes - 1, dia));
    const hoy = new Date();
    const hoyUtc = new Date(Date.UTC(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()));

    return fecha.getTime() > hoyUtc.getTime();
  }

  function descripcionV49(registro) {
    const v49 = texto(registro ? registro.V49 : '');

    if (v49 === '1845-01-01') {
      return 'V49 tiene el valor 1845-01-01; indica no aplica, según el valor registrado en V45.';
    }

    if (esFechaReal(v49)) {
      return `V49 tiene el valor ${v49}; registra la fecha de inicio del primer o único esquema de quimioterapia o terapia sistémica.`;
    }

    if (v49) {
      return `${v49} es el valor registrado en V49.`;
    }

    return 'V49 está vacía.';
  }

  function descripcionV50(registro) {
    const v50 = texto(registro ? registro.V50 : '');

    if (v50 === '98') {
      return 'V50 tiene el valor 98; indica no aplica, según el valor registrado en V45.';
    }

    if (/^-?\d+$/.test(v50)) {
      return `V50 tiene el valor ${v50}; registra el número de IPS que suministraron el primer o único esquema.`;
    }

    if (v50) {
      return `${v50} es el valor registrado en V50.`;
    }

    return 'V50 está vacía.';
  }


  function descripcionV51(registro) {
    const v51 = texto(registro ? registro.V51 : '');

    if (v51 === '96') {
      return 'V51 tiene el valor 96; indica terapia sistémica suministrada fuera del país.';
    }

    if (v51 === '98') {
      return 'V51 tiene el valor 98; indica no aplica, según el valor registrado en V45.';
    }

    if (/^\d{12}$/.test(v51)) {
      return `V51 tiene el valor ${v51}; registra el código REPS de 12 dígitos de la IPS1 que suministra el primer o único esquema.`;
    }

    if (v51) {
      return `${v51} es el valor registrado en V51.`;
    }

    return 'V51 está vacía.';
  }

  function descripcionV52(registro) {
    const v52 = texto(registro ? registro.V52 : '');

    if (v52 === '98') {
      return 'V52 tiene el valor 98; indica no aplica para IPS2.';
    }

    if (/^\d{12}$/.test(v52)) {
      return `V52 tiene el valor ${v52}; registra el código REPS de 12 dígitos de la IPS2 que suministra el primer o único esquema.`;
    }

    if (v52) {
      return `${v52} es el valor registrado en V52.`;
    }

    return 'V52 está vacía.';
  }

  function dato(registro, variable, nota = '') {
    const valor = texto(registro ? registro[variable] : '');

    if (window.CACTipos && typeof window.CACTipos.crearDatoRelacionado === 'function') {
      return CACTipos.crearDatoRelacionado(
        variable,
        nombreVariable(variable),
        valor,
        nota
      );
    }

    return {
      variable,
      nombre: nombreVariable(variable),
      valor,
      nota
    };
  }

  function datosContextoV48(registro, notaV48) {
    return [
      dato(registro, 'V45', descripcionV45(registro)),
      dato(registro, 'V48', notaV48 || descripcionV48(registro))
    ];
  }


  function datosContextoV49(registro, notaV49) {
    return [
      dato(registro, 'V45', descripcionV45(registro)),
      dato(registro, 'V49', notaV49 || descripcionV49(registro))
    ];
  }

  function datosContextoV50(registro, notaV50) {
    return [
      dato(registro, 'V45', descripcionV45(registro)),
      dato(registro, 'V50', notaV50 || descripcionV50(registro))
    ];
  }

  function datosContextoV51(registro, notaV51) {
    return [
      dato(registro, 'V45', descripcionV45(registro)),
      dato(registro, 'V51', notaV51 || descripcionV51(registro))
    ];
  }

  function datosContextoV52(registro, notaV52) {
    return [
      dato(registro, 'V45', descripcionV45(registro)),
      dato(registro, 'V50', descripcionV50(registro)),
      dato(registro, 'V52', notaV52 || descripcionV52(registro))
    ];
  }

  function catalogoPermitidoV48() {
    return [
      'Valores permitidos para V48:',
      '1 = Neoadyuvancia, manejo inicial prequirúrgico.',
      '2 = Tratamiento inicial curativo sin cirugía sugerida.',
      '3 = Adyuvancia, manejo inicial postquirúrgico.',
      '11 = Manejo de recaída.',
      '12 = Manejo de enfermedad metastásica.',
      '13 = Manejo paliativo, sin manejo de recaída ni enfermedad metastásica.',
      '98 = No aplica, cuando en V45 se seleccionó 98.',
      '',
      'Aclaración funcional:',
      'Para hormonoterapia de cáncer de mama que comenzó posterior a cirugía, el instructivo indica que la opción de respuesta es adyuvancia. Según el catálogo de V48, adyuvancia corresponde al código 3. Esta aclaración queda como trazabilidad clínica y no genera error ni advertencia automática por ahora.'
    ].join('\n');
  }


  function catalogoPermitidoV49() {
    return [
      'Valores permitidos para V49:',
      'Fecha real en formato AAAA-MM-DD = fecha de inicio del primer o único esquema de quimioterapia o terapia sistémica.',
      '1845-01-01 = No aplica, cuando en V45 se seleccionó 98.',
      '',
      'Aclaración funcional:',
      'Si solo se conoce el año y el mes, se debe registrar el día 15. No se debe generar error si la fecha es anterior al periodo de reporte, porque el instructivo permite esquemas prolongados que iniciaron antes y continúan durante el periodo actual.'
    ].join('\n');
  }

  function catalogoPermitidoV51() {
    return [
      'Valores permitidos para V51:',
      'Código REPS de 12 dígitos = IPS1 que suministra o prescribe el primer o único esquema.',
      '96 = Terapia sistémica suministrada fuera del país.',
      '98 = No aplica, cuando en V45 se seleccionó 98.',
      '',
      'Aclaración funcional:',
      'Para tratamientos orales, se debe registrar la IPS que prescribió el tratamiento, no el operador logístico que realiza la entrega. Esta validación queda como trazabilidad y no se comprueba automáticamente.'
    ].join('\n');
  }

  function catalogoPermitidoV52() {
    return [
      'Valores permitidos para V52:',
      'Código REPS de 12 dígitos = IPS2 que suministra el primer o único esquema.',
      '98 = No aplica.',
      '',
      'Aclaración funcional:',
      'El valor 96 no está permitido en V52. El instructivo solo lo define para V51.'
    ].join('\n');
  }

  function esCodigoReps12Digitos(valor) {
    return /^\d{12}$/.test(texto(valor));
  }

  function crearHallazgo({
    codigo,
    variable,
    valor,
    titulo,
    mensaje,
    regla,
    recomendacion,
    severidad = SEVERIDAD.ERROR,
    tipo = TIPO.FORMATO,
    datosRelacionados = null,
    columnasCorregir = null
  }) {
    return {
      codigo,
      variable,
      valor: texto(valor),
      titulo,
      mensaje,
      regla,
      recomendacion,
      severidad,
      tipo,
      datosRelacionados: datosRelacionados || [],
      columnasCorregir: columnasCorregir || [variable]
    };
  }

  function crearHallazgoRegistro(registro, opciones) {
    return crearHallazgo({
      ...opciones,
      valor: opciones.valor ?? registro[opciones.variable],
      datosRelacionados: opciones.datosRelacionados || [dato(registro, opciones.variable)],
      columnasCorregir: opciones.columnasCorregir || [opciones.variable]
    });
  }


  function esEntero(valor) {
    return /^-?\d+$/.test(texto(valor));
  }

  function numeroEntero(valor) {
    return Number(texto(valor));
  }

  function validarV48(registro, hallazgos) {
    if (!Object.prototype.hasOwnProperty.call(registro, 'V48')) return;

    const v45 = texto(registro.V45);
    const v48 = texto(registro.V48);

    if (estaVacio(v48)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V48-ERROR-001',
        variable: 'V48',
        titulo: 'Ubicación temporal del esquema vacía',
        mensaje: 'V48 está vacía. Debe registrar la ubicación temporal del primer o único esquema de quimioterapia o terapia sistémica, o 98 cuando no aplica según V45.',
        regla: [
          'V48 registra la ubicación temporal del primer o único esquema de quimioterapia o terapia sistémica en el periodo, en relación con el manejo oncológico.',
          'Si V45=1, V48 debe registrar una ubicación temporal real del esquema.',
          'Si V45=98, V48 debe registrarse como 98.',
          '',
          catalogoPermitidoV48()
        ].join('\n'),
        recomendacion: 'Revise la historia clínica y el plan terapéutico del especialista tratante. Registre el código que corresponda según el momento del manejo oncológico, o registre 98 si no aplica y V45 está en 98.',
        tipo: TIPO.FORMATO,
        datosRelacionados: datosContextoV48(registro, 'V48 está vacía.'),
        columnasCorregir: ['V48']
      }));
      return;
    }

    if (!CATALOGO_V48.includes(v48)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V48-ERROR-002',
        variable: 'V48',
        titulo: 'Ubicación temporal fuera del catálogo permitido',
        mensaje: `V48 tiene el valor ${v48}. Ese valor no pertenece al catálogo permitido para la ubicación temporal del esquema.`,
        regla: [
          'V48 solo acepta los códigos definidos por el instructivo para ubicar temporalmente el primer o único esquema de terapia sistémica.',
          '',
          catalogoPermitidoV48()
        ].join('\n'),
        recomendacion: 'Corrija V48 usando uno de los códigos permitidos: 1 para neoadyuvancia, 2 para tratamiento inicial curativo sin cirugía sugerida, 3 para adyuvancia, 11 para recaída, 12 para enfermedad metastásica, 13 para manejo paliativo o 98 cuando no aplica según V45.',
        tipo: TIPO.CATALOGO,
        datosRelacionados: datosContextoV48(registro, `${v48} no pertenece al catálogo permitido para V48.`),
        columnasCorregir: ['V48']
      }));
      return;
    }

    if (v45 === '1' && v48 === '98') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V48-ERROR-003',
        variable: 'V48',
        titulo: 'V48 reportada como no aplica aunque recibió terapia sistémica',
        mensaje: 'V45 indica que el paciente sí recibió quimioterapia u otra terapia sistémica en el periodo, pero V48 está en 98.',
        regla: [
          'Cuando V45 tiene valor 1, V48 debe registrar la ubicación temporal real del primer o único esquema dentro del manejo oncológico.',
          'El valor 98 solo corresponde cuando no aplica según V45.',
          '',
          catalogoPermitidoV48()
        ].join('\n'),
        recomendacion: 'Revise la historia clínica y el plan terapéutico. Registre en V48 la ubicación temporal real del primer o único esquema administrado en el periodo: 1, 2, 3, 11, 12 o 13.',
        tipo: TIPO.COHERENCIA,
        datosRelacionados: datosContextoV48(registro, 'V48=98 no corresponde cuando V45=1.'),
        columnasCorregir: ['V48']
      }));
      return;
    }

    if (v45 === '98' && v48 !== '98') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V48-ERROR-004',
        variable: 'V48',
        titulo: 'V48 registra ubicación temporal aunque V45 indica que no aplica',
        mensaje: 'V45 está en 98, pero V48 registra una ubicación temporal del esquema diferente de 98.',
        regla: [
          'Cuando V45 indica que no aplica o que no recibió quimioterapia u otra terapia sistémica, V48 debe registrarse como 98.',
          'Si V48 trae una ubicación temporal real, queda una inconsistencia entre la terapia sistémica reportada y la ubicación del esquema.',
          '',
          catalogoPermitidoV48()
        ].join('\n'),
        recomendacion: 'Revise la coherencia entre V45 y V48. Si el paciente no recibió terapia sistémica, deje V45 y V48 en 98. Si sí recibió terapia sistémica, corrija V45 y registre en V48 la ubicación temporal correspondiente.',
        tipo: TIPO.COHERENCIA,
        datosRelacionados: datosContextoV48(registro, `${v48} no corresponde cuando V45=98.`),
        columnasCorregir: ['V45', 'V48']
      }));
    }
  }


  function validarV49(registro, hallazgos) {
    if (!Object.prototype.hasOwnProperty.call(registro, 'V49')) return;

    const v45 = texto(registro.V45);
    const v49 = texto(registro.V49);
    const comodinNoAplica = '1845-01-01';

    if (estaVacio(v49)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V49-ERROR-001',
        variable: 'V49',
        titulo: 'Fecha de inicio del esquema vacía',
        mensaje: 'V49 está vacía. Debe registrar la fecha de inicio del primer o único esquema de quimioterapia o terapia sistémica, o 1845-01-01 cuando no aplica según V45.',
        regla: [
          'V49 registra la fecha de inicio del primer o único esquema de quimioterapia o terapia sistémica recibido en el periodo.',
          'Si V45=1, V49 debe registrar una fecha real válida de inicio del esquema.',
          'Si V45=98, V49 debe registrarse como 1845-01-01.',
          '',
          catalogoPermitidoV49()
        ].join('\n'),
        recomendacion: 'Revise la historia clínica y los registros de administración del esquema. Registre la fecha de inicio en formato AAAA-MM-DD. Si solo conoce el año y el mes, use el día 15. Si no aplica porque V45 está en 98, registre 1845-01-01.',
        tipo: TIPO.FORMATO,
        datosRelacionados: datosContextoV49(registro, 'V49 está vacía.'),
        columnasCorregir: ['V49']
      }));
      return;
    }

    if (!esFechaReal(v49)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V49-ERROR-002',
        variable: 'V49',
        titulo: 'Fecha de inicio del esquema con formato inválido',
        mensaje: `V49 tiene el valor ${v49}. Debe tener una fecha válida en formato AAAA-MM-DD, o el comodín 1845-01-01 cuando no aplica según V45.`,
        regla: [
          'V49 debe registrarse como una fecha real en formato AAAA-MM-DD.',
          'El único comodín definido por el instructivo disponible para V49 es 1845-01-01 cuando V45=98.',
          '',
          catalogoPermitidoV49()
        ].join('\n'),
        recomendacion: 'Corrija V49 usando el formato AAAA-MM-DD. Si solo conoce año y mes, registre el día 15. Si no aplica porque V45 está en 98, registre 1845-01-01.',
        tipo: TIPO.FORMATO,
        datosRelacionados: datosContextoV49(registro, `${v49} no corresponde a una fecha real en formato AAAA-MM-DD.`),
        columnasCorregir: ['V49']
      }));
      return;
    }

    if (v45 === '1' && v49 === comodinNoAplica) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V49-ERROR-003',
        variable: 'V49',
        titulo: 'Fecha de inicio marcada como no aplica aunque recibió terapia sistémica',
        mensaje: 'V45 tiene el valor 1, que significa que el paciente sí recibió quimioterapia u otra terapia sistémica en el periodo. Sin embargo, V49 tiene 1845-01-01, que significa No Aplica.',
        regla: 'Cuando V45 tiene valor 1, V49 debe registrar la fecha real de inicio del primer o único esquema de quimioterapia o terapia sistémica. El valor 1845-01-01 solo debe usarse cuando V45 está en 98.',
        recomendacion: 'Revise la historia clínica y los registros de administración. Registre en V49 la fecha real de inicio del esquema en formato AAAA-MM-DD. Si solo conoce el año y el mes, use el día 15.',
        tipo: TIPO.COHERENCIA,
        datosRelacionados: [
          dato(registro, 'V45', 'V45=1 indica que recibió quimioterapia u otra terapia sistémica dentro del periodo de reporte.'),
          dato(registro, 'V49', 'V49=1845-01-01 significa No Aplica y solo corresponde cuando V45=98.')
        ],
        columnasCorregir: ['V49']
      }));
      return;
    }

    if (v45 === '98' && v49 !== comodinNoAplica) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V49-ERROR-004',
        variable: 'V49',
        titulo: 'Fecha de inicio registrada aunque la terapia sistémica no aplica',
        mensaje: `V45 tiene el valor 98, que significa que la terapia sistémica no aplica. Sin embargo, V49 tiene ${v49}, como si existiera una fecha de inicio del esquema.`,
        regla: 'Cuando V45 tiene valor 98, V49 debe registrarse como 1845-01-01. No debe reportarse una fecha real de inicio si la terapia sistémica no aplica.',
        recomendacion: 'Revise la coherencia entre V45 y V49. Si el paciente no recibió terapia sistémica, deje V45 en 98 y registre V49 como 1845-01-01. Si el paciente sí recibió terapia sistémica, corrija V45 y registre en V49 la fecha real de inicio del esquema.',
        tipo: TIPO.COHERENCIA,
        datosRelacionados: [
          dato(registro, 'V45', 'V45=98 indica que la terapia sistémica no aplica.'),
          dato(registro, 'V49', `${v49} no corresponde cuando V45=98; en este caso V49 debe ser 1845-01-01.`)
        ],
        columnasCorregir: ['V45', 'V49']
      }));
      return;
    }

    if (esFechaFutura(v49)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V49-ERROR-005',
        variable: 'V49',
        titulo: 'Fecha de inicio del esquema en el futuro',
        mensaje: 'V49 tiene una fecha posterior a la fecha actual. Esa fecha no puede corresponder al inicio real del primer o único esquema de quimioterapia o terapia sistémica.',
        regla: 'V49 debe registrar una fecha ya ocurrida y documentada en la historia clínica o en los registros de administración. No debe reportarse una fecha futura como inicio del esquema.',
        recomendacion: 'Revise la historia clínica y corrija V49 con la fecha real de inicio del esquema en formato AAAA-MM-DD. Si solo conoce el año y el mes, use el día 15. Si la terapia sistémica no aplica, V45 debe estar en 98 y V49 debe ser 1845-01-01.',
        tipo: TIPO.COHERENCIA,
        datosRelacionados: [
          dato(registro, 'V45', descripcionV45(registro)),
          dato(registro, 'V49', `${v49} es posterior a la fecha actual.`)
        ],
        columnasCorregir: ['V49']
      }));
    }
  }


  function validarV50(registro, hallazgos) {
    if (!Object.prototype.hasOwnProperty.call(registro, 'V50')) return;

    const v45 = texto(registro.V45);
    const v50 = texto(registro.V50);
    const comodinNoAplica = '98';

    if (estaVacio(v50)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V50-ERROR-001',
        variable: 'V50',
        titulo: 'Número de IPS vacío',
        mensaje: 'V50 está vacía. Debe registrar el número de IPS que suministraron el primer o único esquema de quimioterapia o terapia sistémica, o 98 cuando no aplica según V45.',
        regla: 'V50 debe registrar la cantidad de IPS que suministraron el primer o único esquema durante el periodo de reporte. Si V45 está en 98, V50 debe registrarse como 98.',
        recomendacion: 'Revise la historia clínica, los registros de administración y los soportes de prestación del servicio. Registre el número de IPS que suministraron el esquema. Si no aplica porque V45 está en 98, registre 98.',
        tipo: TIPO.FORMATO,
        datosRelacionados: datosContextoV50(registro, 'V50 está vacía.'),
        columnasCorregir: ['V50']
      }));
      return;
    }

    if (!esEntero(v50)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V50-ERROR-002',
        variable: 'V50',
        titulo: 'Número de IPS con formato inválido',
        mensaje: 'V50 tiene un valor que no corresponde a un número entero de IPS ni al comodín 98.',
        regla: 'V50 debe registrarse como número entero mayor o igual a 1 cuando V45=1, o como 98 cuando V45=98.',
        recomendacion: 'Corrija V50. Registre el número de IPS que suministraron el esquema, usando un número entero mayor o igual a 1. Si no aplica porque V45 está en 98, registre 98.',
        tipo: TIPO.FORMATO,
        datosRelacionados: datosContextoV50(registro, `${v50} no corresponde a un número entero válido para V50.`),
        columnasCorregir: ['V50']
      }));
      return;
    }

    if (v45 === '1' && v50 === comodinNoAplica) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V50-ERROR-003',
        variable: 'V50',
        titulo: 'Número de IPS marcado como no aplica aunque recibió terapia sistémica',
        mensaje: 'V45 tiene el valor 1, que significa que el paciente sí recibió quimioterapia u otra terapia sistémica en el periodo. Sin embargo, V50 tiene 98, que significa No aplica.',
        regla: 'Cuando V45 tiene valor 1, V50 debe registrar el número de IPS que suministraron el primer o único esquema. El valor 98 solo debe usarse cuando V45 está en 98.',
        recomendacion: 'Revise los soportes de administración o suministro del esquema. Registre en V50 el número de IPS que suministraron el primer o único esquema.',
        tipo: TIPO.COHERENCIA,
        datosRelacionados: [
          dato(registro, 'V45', 'V45=1 indica que recibió quimioterapia u otra terapia sistémica dentro del periodo de reporte.'),
          dato(registro, 'V50', 'V50=98 significa No aplica y solo corresponde cuando V45=98.')
        ],
        columnasCorregir: ['V50']
      }));
      return;
    }

    if (numeroEntero(v50) <= 0) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V50-ERROR-004',
        variable: 'V50',
        titulo: 'Número de IPS menor que uno',
        mensaje: 'V50 registra cero o un número negativo como número de IPS. Ese valor no representa una cantidad válida de IPS que hayan suministrado el esquema.',
        regla: 'Cuando V45 tiene valor 1, V50 debe registrar un número entero mayor o igual a 1.',
        recomendacion: 'Revise los soportes de administración o suministro del esquema y registre el número real de IPS. Si la terapia sistémica no aplica, V45 debe estar en 98 y V50 debe ser 98.',
        tipo: TIPO.COHERENCIA,
        datosRelacionados: datosContextoV50(registro, `${v50} no representa una cantidad válida de IPS.`),
        columnasCorregir: ['V50']
      }));
      return;
    }

    if (v45 === '98' && v50 !== comodinNoAplica) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V50-ERROR-005',
        variable: 'V50',
        titulo: 'Número de IPS registrado aunque la terapia sistémica no aplica',
        mensaje: 'V45 tiene el valor 98, que significa que la terapia sistémica no aplica. Sin embargo, V50 registra un número de IPS, como si el esquema hubiera sido suministrado.',
        regla: 'Cuando V45 tiene valor 98, V50 debe registrarse como 98. No debe reportarse un número de IPS si la terapia sistémica no aplica.',
        recomendacion: 'Revise la coherencia entre V45 y V50. Si el paciente no recibió terapia sistémica, deje V45 en 98 y registre V50 como 98. Si el paciente sí recibió terapia sistémica, corrija V45 y registre en V50 el número de IPS que suministraron el esquema.',
        tipo: TIPO.COHERENCIA,
        datosRelacionados: [
          dato(registro, 'V45', 'V45=98 indica que la terapia sistémica no aplica.'),
          dato(registro, 'V50', `${v50} no corresponde cuando V45=98; en este caso V50 debe ser 98.`)
        ],
        columnasCorregir: ['V45', 'V50']
      }));
    }
  }


  function validarV51(registro, hallazgos) {
    if (!Object.prototype.hasOwnProperty.call(registro, 'V51')) return;

    const v45 = texto(registro.V45);
    const v51 = texto(registro.V51);

    if (estaVacio(v51)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V51-ERROR-001',
        variable: 'V51',
        titulo: 'Código IPS1 vacío',
        mensaje: 'V51 está vacía. Debe registrar el código de habilitación de la IPS1 que suministra el primer o único esquema de quimioterapia o terapia sistémica, 96 si fue suministrada fuera del país, o 98 cuando no aplica según V45.',
        regla: 'V51 debe registrar un código REPS de 12 dígitos, 96 cuando la terapia fue suministrada fuera del país, o 98 cuando V45 está en 98.',
        recomendacion: 'Revise los soportes de administración, la historia clínica o la información de la IPS. Registre el código REPS de 12 dígitos de la IPS1. Si la terapia fue suministrada fuera del país, registre 96. Si no aplica porque V45 está en 98, registre 98.',
        tipo: TIPO.FORMATO,
        datosRelacionados: datosContextoV51(registro, 'V51 está vacía.'),
        columnasCorregir: ['V51']
      }));
      return;
    }

    if (!(esCodigoReps12Digitos(v51) || v51 === '96' || v51 === '98')) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V51-ERROR-002',
        variable: 'V51',
        titulo: 'Código IPS1 con formato inválido',
        mensaje: 'V51 tiene un valor que no corresponde a un código REPS de 12 dígitos, ni al comodín 96, ni al comodín 98.',
        regla: 'V51 debe registrarse como código REPS de 12 dígitos. También se permite 96 cuando la terapia fue suministrada fuera del país y 98 cuando V45 está en 98.',
        recomendacion: 'Corrija V51. Registre el código REPS de 12 dígitos de la IPS1. Si el código perdió un cero inicial, corríjalo conservando los 12 dígitos. Si la terapia fue suministrada fuera del país, registre 96. Si no aplica porque V45 está en 98, registre 98.',
        tipo: TIPO.FORMATO,
        datosRelacionados: datosContextoV51(registro, `${v51} no corresponde a un código REPS válido de 12 dígitos ni a los valores 96 o 98.`),
        columnasCorregir: ['V51']
      }));
      return;
    }

    if (v45 === '1' && v51 === '98') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V51-ERROR-003',
        variable: 'V51',
        titulo: 'Código IPS1 marcado como no aplica aunque recibió terapia sistémica',
        mensaje: 'V45 tiene el valor 1, que significa que el paciente sí recibió quimioterapia u otra terapia sistémica en el periodo. Sin embargo, V51 tiene 98, que significa No aplica.',
        regla: 'Cuando V45 tiene valor 1, V51 debe registrar el código REPS de 12 dígitos de la IPS1 que suministra o prescribe el esquema, o 96 si la terapia fue suministrada fuera del país. El valor 98 solo debe usarse cuando V45 está en 98.',
        recomendacion: 'Revise los soportes de administración, prescripción o suministro del esquema. Registre en V51 el código REPS de 12 dígitos de la IPS1. Si la terapia fue suministrada fuera del país, registre 96.',
        tipo: TIPO.COHERENCIA,
        datosRelacionados: [
          dato(registro, 'V45', 'V45=1 indica que recibió quimioterapia u otra terapia sistémica dentro del periodo de reporte.'),
          dato(registro, 'V51', 'V51=98 significa No aplica y solo corresponde cuando V45=98.')
        ],
        columnasCorregir: ['V51']
      }));
      return;
    }

    if (v45 === '98' && v51 !== '98') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V51-ERROR-004',
        variable: 'V51',
        titulo: 'Código IPS1 registrado aunque la terapia sistémica no aplica',
        mensaje: 'V45 tiene el valor 98, que significa que la terapia sistémica no aplica. Sin embargo, V51 registra un código de IPS o 96, como si el esquema hubiera sido suministrado.',
        regla: 'Cuando V45 tiene valor 98, V51 debe registrarse como 98. No debe reportarse código de IPS ni 96 si la terapia sistémica no aplica.',
        recomendacion: 'Revise la coherencia entre V45 y V51. Si el paciente no recibió terapia sistémica, deje V45 en 98 y registre V51 como 98. Si el paciente sí recibió terapia sistémica, corrija V45 y registre en V51 el código REPS de la IPS1 o 96 si fue suministrada fuera del país.',
        tipo: TIPO.COHERENCIA,
        datosRelacionados: [
          dato(registro, 'V45', 'V45=98 indica que la terapia sistémica no aplica.'),
          dato(registro, 'V51', `${v51} no corresponde cuando V45=98; en este caso V51 debe ser 98.`)
        ],
        columnasCorregir: ['V45', 'V51']
      }));
    }
  }


  function validarV52(registro, hallazgos) {
    if (!Object.prototype.hasOwnProperty.call(registro, 'V52')) return;

    const v45 = texto(registro.V45);
    const v50 = texto(registro.V50);
    const v52 = texto(registro.V52);

    if (estaVacio(v52)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V52-ERROR-001',
        variable: 'V52',
        titulo: 'Código IPS2 vacío',
        mensaje: 'V52 está vacía. Debe registrar el código de habilitación de la IPS2 que suministra el primer o único esquema de quimioterapia o terapia sistémica, o 98 cuando no aplica.',
        regla: 'V52 debe registrar un código REPS de 12 dígitos cuando existe una segunda IPS que suministra el esquema. Si no aplica, debe registrarse como 98.',
        recomendacion: 'Revise los soportes de administración, la historia clínica o la información de las IPS. Si una segunda IPS suministró el esquema, registre el código REPS de 12 dígitos. Si no aplica, registre 98.',
        tipo: TIPO.FORMATO,
        datosRelacionados: datosContextoV52(registro, 'V52 está vacía.'),
        columnasCorregir: ['V52']
      }));
      return;
    }

    if (!(esCodigoReps12Digitos(v52) || v52 === '98')) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V52-ERROR-002',
        variable: 'V52',
        titulo: 'Código IPS2 con formato inválido',
        mensaje: 'V52 tiene un valor que no corresponde a un código REPS de 12 dígitos ni al comodín 98.',
        regla: 'V52 debe registrarse como código REPS de 12 dígitos o como 98 cuando no aplica. El valor 96 no está permitido en V52.',
        recomendacion: 'Corrija V52. Registre el código REPS de 12 dígitos de la IPS2 si existe una segunda IPS. Si no aplica, registre 98.',
        tipo: TIPO.FORMATO,
        datosRelacionados: datosContextoV52(registro, `${v52} no corresponde a un código REPS de 12 dígitos ni al valor 98.`),
        columnasCorregir: ['V52']
      }));
      return;
    }

    if (v45 === '98' && v52 !== '98') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V52-ERROR-005',
        variable: 'V52',
        titulo: 'IPS2 registrada aunque la terapia sistémica no aplica',
        mensaje: 'V45 tiene el valor 98, que significa que la terapia sistémica no aplica. Sin embargo, V52 registra un código de IPS2, como si el esquema hubiera sido suministrado.',
        regla: 'Cuando V45 tiene valor 98, V52 debe registrarse como 98. No debe reportarse código de IPS2 si la terapia sistémica no aplica.',
        recomendacion: 'Revise la coherencia entre V45 y V52. Si el paciente no recibió terapia sistémica, deje V45 en 98 y registre V52 como 98. Si el paciente sí recibió terapia sistémica, corrija V45 y revise V50, V51 y V52 según el número real de IPS que suministraron el esquema.',
        tipo: TIPO.COHERENCIA,
        datosRelacionados: [
          dato(registro, 'V45', 'V45=98 indica que la terapia sistémica no aplica.'),
          dato(registro, 'V52', `${v52} no corresponde cuando V45=98; en este caso V52 debe ser 98.`)
        ],
        columnasCorregir: ['V45', 'V52']
      }));
      return;
    }

    if (v45 === '1' && v50 === '1' && v52 !== '98') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V52-ERROR-003',
        variable: 'V52',
        titulo: 'IPS2 registrada aunque solo se reportó una IPS',
        mensaje: 'V50 tiene el valor 1, que significa que solo una IPS suministró el primer o único esquema. Sin embargo, V52 registra un código de IPS2, como si existiera una segunda IPS.',
        regla: 'Cuando V50 tiene valor 1, V52 debe registrarse como 98. No debe reportarse código de IPS2 si solo una IPS suministró el esquema.',
        recomendacion: 'Revise la coherencia entre V50 y V52. Si solo una IPS suministró el esquema, deje V50 en 1 y registre V52 como 98. Si realmente participaron dos o más IPS, corrija V50 y registre en V52 el código REPS de la segunda IPS.',
        tipo: TIPO.COHERENCIA,
        datosRelacionados: datosContextoV52(registro, `${v52} no corresponde cuando V50=1; en este caso V52 debe ser 98.`),
        columnasCorregir: ['V50', 'V52']
      }));
      return;
    }

    if (v45 === '1' && esEntero(v50) && numeroEntero(v50) >= 2 && v52 === '98') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V52-ERROR-004',
        variable: 'V52',
        titulo: 'Falta IPS2 aunque V50 reporta dos o más IPS',
        mensaje: 'V50 indica que dos o más IPS suministraron el primer o único esquema. Sin embargo, V52 está en 98, que significa No aplica.',
        regla: 'Cuando V45 tiene valor 1 y V50 es mayor o igual a 2, V52 debe registrar el código REPS de 12 dígitos de la segunda IPS.',
        recomendacion: 'Revise los soportes de administración o suministro del esquema. Si participaron dos o más IPS, registre en V52 el código REPS de 12 dígitos de la IPS2. Si realmente solo participó una IPS, corrija V50 a 1 y deje V52 en 98.',
        tipo: TIPO.COHERENCIA,
        datosRelacionados: datosContextoV52(registro, 'V52=98 no corresponde cuando V50 reporta dos o más IPS.'),
        columnasCorregir: ['V50', 'V52']
      }));
    }
  }

  function validar(registro) {
    const hallazgos = [];
    const fila = registro || {};

    validarV48(fila, hallazgos);
    validarV49(fila, hallazgos);
    validarV50(fila, hallazgos);
    validarV51(fila, hallazgos);
    validarV52(fila, hallazgos);

    return hallazgos;
  }

  const API = {
    version: VERSION,
    validar,
    _interno: {
      CATALOGO_V48,
      catalogoPermitidoV48,
      catalogoPermitidoV49,
      esFechaReal,
      esFechaFutura,
      esEntero,
      numeroEntero,
      catalogoPermitidoV51,
      catalogoPermitidoV52,
      esCodigoReps12Digitos
    }
  };

  window.CACModulo10 = API;
  window.Modulo10 = API;
})();
