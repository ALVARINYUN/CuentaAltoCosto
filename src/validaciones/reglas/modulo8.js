

(function () {
  'use strict';

  const VERSION = 'sprint-3b-v44-cie10-antecedente-05';

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
    V17: 'Código CIE-10 de la neoplasia maligna reportada',
    V18: 'Fecha de diagnóstico del cáncer reportado',
    V41: 'Intervención médica durante el periodo de reporte',
    V42: 'Antecedente de otro cáncer primario',
    V43: 'Fecha de diagnóstico del otro cáncer primario',
    V44: 'Tipo CIE-10 del cáncer antecedente o concurrente'
  };

  const CATALOGO_V41 = ['1', '2', '3', '4', '5', '6', '99'];
  const CATALOGO_V42 = ['1', '2', '99'];

  const COMODIN_DESCONOCIDO = '1800-01-01';
  const COMODIN_NO_APLICA = '1845-01-01';

  function texto(valor) {
    return String(valor ?? '').trim();
  }

  function estaVacio(valor) {
    return texto(valor) === '';
  }

  function nombreVariable(variable) {
    return NOMBRES_VARIABLES[variable] || variable;
  }

  function significadoV41(valor) {
    const mapa = {
      '1': 'observación previa a tratamiento',
      '2': 'tratamiento curativo o paliativo dirigido al cáncer inicial o por recaída',
      '3': 'observación o seguimiento oncológico luego del tratamiento inicial',
      '4': 'opciones 1 y 2 únicamente',
      '5': 'opciones 2 y 3 únicamente',
      '6': 'opciones 1, 2 y 3',
      '99': 'no hay intervención en el periodo'
    };

    return mapa[texto(valor)] || 'valor no reconocido';
  }

  function significadoV42(valor) {
    const mapa = {
      '1': 'sí tiene o tuvo otro cáncer primario diferente al reportado',
      '2': 'no tiene otro cáncer primario',
      '99': 'desconocido'
    };

    return mapa[texto(valor)] || 'valor no reconocido';
  }

  function significadoV43(valor) {
    const fecha = texto(valor);

    if (fecha === COMODIN_DESCONOCIDO) return 'desconocido; el dato no está descrito en los soportes clínicos';
    if (fecha === COMODIN_NO_APLICA) return 'no aplica; no ha tenido otro cáncer primario';
    if (esFechaReal(fecha)) return 'fecha real de diagnóstico del otro cáncer primario';

    return 'valor no reconocido como fecha válida o comodín permitido';
  }


  function tieneFormatoCie10Basico(valor) {
    const codigo = texto(valor).toUpperCase();

    if (!codigo || codigo === '99') return false;

    // Formato básico CIE-10 usado en el validador:
    // Letra C o D + 2 o 3 dígitos, con X opcional al final para códigos como C509/C20X.
    // Ejemplos válidos: C509, C833, C20X, D050.
    return /^[CD][0-9]{2}[0-9X]?$/.test(codigo);
  }

  function significadoV44(valor) {
    const codigo = texto(valor).toUpperCase();

    if (codigo === '99') return 'no aplica; no hay antecedente ni concurrencia de otro cáncer primario';

    const diagnostico = diagnosticoV17(codigo);
    if (diagnostico) return `${codigo} corresponde a ${diagnostico}`;

    if (tieneFormatoCie10Basico(codigo)) return 'código CIE-10 con formato válido';

    return 'valor no reconocido como código CIE-10 válido o comodín permitido';
  }

  function catalogoV41Texto() {
    return [
      'Catálogo permitido V41:',
      '1 = Observación previa a tratamiento.',
      '2 = Tratamiento curativo o paliativo dirigido al cáncer inicial o por recaída.',
      '3 = Observación o seguimiento oncológico luego del tratamiento inicial.',
      '4 = Opciones 1 y 2 únicamente.',
      '5 = Opciones 2 y 3 únicamente.',
      '6 = Opciones 1, 2 y 3.',
      '99 = No hay intervención en el periodo.'
    ].join('\n');
  }

  function catalogoV42Texto() {
    return [
      'Catálogo permitido V42:',
      '1 = Sí tiene o tuvo otro cáncer primario diferente al reportado.',
      '2 = No.',
      '99 = Desconocido.'
    ].join('\n');
  }

  function catalogoV43Texto() {
    return [
      'Comodines permitidos V43:',
      '1800-01-01 = Desconocido; el dato no está descrito en los soportes clínicos.',
      '1845-01-01 = No aplica; no ha tenido otro cáncer primario.',
      '',
      'Si solo conoce año y mes, registre el día 15.'
    ].join('\n');
  }


  function catalogoV44Texto() {
    return [
      'Comodín permitido V44:',
      '99 = No aplica; no hay antecedente ni concurrencia de otro cáncer primario.'
    ].join('\n');
  }

  function diagnosticoV17(valor) {
    const codigo = texto(valor).toUpperCase();

    if (!codigo) return '';

    const mapaExacto = {
      C509: 'cáncer de mama',
      C833: 'Linfoma No Hodgkin',
      C810: 'Linfoma Hodgkin',
      C900: 'Mieloma múltiple',
      C910: 'Leucemia Linfoblástica Aguda',
      C920: 'Leucemia Mielocítica Aguda'
    };

    if (mapaExacto[codigo]) return mapaExacto[codigo];

    if (/^C50/.test(codigo)) return 'cáncer de mama';
    if (/^C81/.test(codigo)) return 'Linfoma Hodgkin';
    if (/^C8[2-6]/.test(codigo)) return 'Linfoma No Hodgkin';
    if (/^C91/.test(codigo)) return 'leucemia linfoblástica';
    if (/^C92/.test(codigo)) return 'leucemia mieloide';
    if (/^C9[0]/.test(codigo)) return 'mieloma múltiple';
    if (/^C61/.test(codigo)) return 'cáncer de próstata';
    if (/^C18|^C19|^C20/.test(codigo)) return 'cáncer colorrectal';

    return '';
  }

  function notaContextoV17(registro) {
    const v17 = texto(registro ? registro.V17 : '');
    const diagnostico = diagnosticoV17(v17);

    if (v17 && diagnostico) {
      return `${v17} corresponde a ${diagnostico}.`;
    }

    if (v17) {
      return `${v17} es el código CIE-10 del cáncer reportado.`;
    }

    return 'V17 identifica el cáncer reportado.';
  }

  function notaContextoV18() {
    return 'Fecha de diagnóstico del cáncer reportado.';
  }

  function notaContextoV42() {
    return 'V42 indica si el paciente tiene o tuvo otro cáncer primario diferente al reportado en V17.';
  }

  function dato(registro, variable, nota = '') {
    const valor = texto(registro ? registro[variable] : '');

    if (window.CACTipos && typeof CACTipos.crearDatoRelacionado === 'function') {
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

  function datosContextoV41(registro, notaV41) {
    return [
      dato(registro, 'V17', notaContextoV17(registro)),
      dato(registro, 'V18', notaContextoV18()),
      dato(registro, 'V41', notaV41)
    ];
  }

  function datosContextoV42(registro, notaV42) {
    return [
      dato(registro, 'V17', notaContextoV17(registro)),
      dato(registro, 'V42', notaV42)
    ];
  }

  function datosContextoV43(registro, notaV43) {
    const v42 = texto(registro ? registro.V42 : '');
    const notaV42 = v42
      ? `V42 tiene el valor ${v42}, que significa ${significadoV42(v42)}.`
      : 'V42 indica si existe otro cáncer primario.';

    return [
      dato(registro, 'V17', notaContextoV17(registro)),
      dato(registro, 'V18', 'Fecha de diagnóstico del cáncer reportado.'),
      dato(registro, 'V42', notaV42),
      dato(registro, 'V43', notaV43)
    ];
  }


  function datosContextoV44(registro, notaV44) {
    const v42 = texto(registro ? registro.V42 : '');
    const v43 = texto(registro ? registro.V43 : '');

    const notaV42 = v42
      ? `V42 tiene el valor ${v42}, que significa ${significadoV42(v42)}.`
      : 'V42 indica si existe otro cáncer primario.';

    const notaV43 = v43
      ? `V43 tiene el valor ${v43}, que significa ${significadoV43(v43)}.`
      : 'V43 registra la fecha de diagnóstico del otro cáncer primario.';

    return [
      dato(registro, 'V17', notaContextoV17(registro)),
      dato(registro, 'V18', 'Fecha de diagnóstico del cáncer reportado.'),
      dato(registro, 'V42', notaV42),
      dato(registro, 'V43', notaV43),
      dato(registro, 'V44', notaV44)
    ];
  }

  function esFechaISO(valor) {
    const fecha = texto(valor);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return false;

    const [anioTexto, mesTexto, diaTexto] = fecha.split('-');
    const anio = Number(anioTexto);
    const mes = Number(mesTexto);
    const dia = Number(diaTexto);

    if (!Number.isInteger(anio) || !Number.isInteger(mes) || !Number.isInteger(dia)) return false;
    if (mes < 1 || mes > 12 || dia < 1 || dia > 31) return false;

    const fechaObjeto = new Date(Date.UTC(anio, mes - 1, dia));

    return fechaObjeto.getUTCFullYear() === anio &&
      fechaObjeto.getUTCMonth() === mes - 1 &&
      fechaObjeto.getUTCDate() === dia;
  }

  function esFechaReal(valor) {
    const fecha = texto(valor);
    return esFechaISO(fecha) && fecha !== COMODIN_DESCONOCIDO && fecha !== COMODIN_NO_APLICA;
  }

  function fechaEsFutura(valor) {
    const fecha = texto(valor);
    if (!esFechaReal(fecha)) return false;

    const [anio, mes, dia] = fecha.split('-').map(Number);
    const fechaUTC = Date.UTC(anio, mes - 1, dia);
    const hoy = new Date();
    const hoyUTC = Date.UTC(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

    return fechaUTC > hoyUTC;
  }

  function reglaContextoV43(textoRegla) {
    return [
      textoRegla,
      '',
      catalogoV43Texto()
    ].join('\n');
  }

  function reglaContextoV44(textoRegla) {
    return [
      textoRegla,
      '',
      catalogoV44Texto()
    ].join('\n');
  }

  function validarV41(registro, hallazgos) {
    if (!Object.prototype.hasOwnProperty.call(registro, 'V41')) return;

    const v41 = texto(registro.V41);

    if (estaVacio(v41)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V41-ERROR-001',
        variable: 'V41',
        titulo: 'Intervención médica vacía',
        mensaje: 'V41 está vacía. Esta variable debe registrar la intervención médica realizada durante el periodo de reporte.',
        regla: [
          'V41 no debe quedar vacía.',
          '',
          'V17 identifica el cáncer reportado y V18 ubica la fecha de diagnóstico. Con esa información, V41 debe registrar qué intervención médica se documentó durante el periodo de reporte: observación, tratamiento, seguimiento o ausencia de intervención.',
          '',
          catalogoV41Texto()
        ].join('\n'),
        recomendacion: 'Revise la historia clínica del periodo de reporte y registre un código permitido en V41.',
        tipo: TIPO.FORMATO,
        datosRelacionados: datosContextoV41(registro, 'V41 está vacía.'),
        columnasCorregir: ['V17', 'V18', 'V41']
      }));
      return;
    }

    if (!CATALOGO_V41.includes(v41)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V41-ERROR-002',
        variable: 'V41',
        titulo: 'Código de intervención médica no permitido',
        mensaje: `V41 tiene el valor ${v41}. Ese valor no pertenece al catálogo permitido para intervención médica durante el periodo de reporte.`,
        regla: [
          'V41 solo acepta los códigos definidos por el instructivo.',
          '',
          'V17 identifica el cáncer reportado y V18 ubica la fecha de diagnóstico. Con esa información, V41 debe registrar qué intervención médica se documentó durante el periodo de reporte: observación, tratamiento, seguimiento o ausencia de intervención.',
          '',
          catalogoV41Texto()
        ].join('\n'),
        recomendacion: 'Cambie V41 por un código permitido según la historia clínica del periodo de reporte.',
        tipo: TIPO.CATALOGO,
        datosRelacionados: datosContextoV41(registro, `${v41} no pertenece al catálogo permitido.`),
        columnasCorregir: ['V17', 'V18', 'V41']
      }));
    }
  }

  function validarV42(registro, hallazgos) {
    if (!Object.prototype.hasOwnProperty.call(registro, 'V42')) return;

    const v42 = texto(registro.V42);

    if (estaVacio(v42)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V42-ERROR-001',
        variable: 'V42',
        titulo: 'Antecedente de otro cáncer primario vacío',
        mensaje: 'V42 está vacía. Esta variable debe indicar si el paciente tiene o tuvo otro cáncer primario diferente al cáncer reportado.',
        regla: [
          'V42 no debe quedar vacía.',
          '',
          'V17 identifica el cáncer que se está notificando. V42 indica si el paciente tiene o tuvo otro cáncer primario diferente, información que define cómo deben revisarse V43 y V44.',
          '',
          catalogoV42Texto()
        ].join('\n'),
        recomendacion: 'Revise la historia clínica y registre si existe o no otro cáncer primario.',
        tipo: TIPO.FORMATO,
        datosRelacionados: datosContextoV42(registro, 'V42 está vacía.'),
        columnasCorregir: ['V42']
      }));
      return;
    }

    if (!CATALOGO_V42.includes(v42)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V42-ERROR-002',
        variable: 'V42',
        titulo: 'Código de antecedente de otro cáncer primario no permitido',
        mensaje: `V42 tiene el valor ${v42}. Ese valor no pertenece al catálogo permitido para antecedente de otro cáncer primario.`,
        regla: [
          'V42 solo acepta los códigos definidos por el instructivo.',
          '',
          'V17 identifica el cáncer que se está notificando. V42 indica si el paciente tiene o tuvo otro cáncer primario diferente, información que define cómo deben revisarse V43 y V44.',
          '',
          catalogoV42Texto()
        ].join('\n'),
        recomendacion: 'Cambie V42 por 1, 2 o 99, según el soporte clínico.',
        tipo: TIPO.CATALOGO,
        datosRelacionados: datosContextoV42(registro, `${v42} no pertenece al catálogo permitido.`),
        columnasCorregir: ['V42']
      }));
      return;
    }

    if (v42 === '99') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V42-ADVERTENCIA-001',
        variable: 'V42',
        titulo: 'Antecedente de otro cáncer primario desconocido',
        mensaje: 'V42 tiene el valor 99, que significa antecedente de otro cáncer primario desconocido.',
        regla: [
          'El valor 99 es permitido cuando la historia clínica no permite confirmar ni descartar otro cáncer primario, o cuando menciona otro cáncer pero los datos son insuficientes.',
          '',
          'V17 identifica el cáncer que se está notificando. V42 indica si el paciente tiene o tuvo otro cáncer primario diferente, información que define cómo deben revisarse V43 y V44.',
          '',
          catalogoV42Texto()
        ].join('\n'),
        recomendacion: 'Revise la historia clínica. Si se confirma otro cáncer primario, use 1. Si se descarta, use 2. Si no hay soporte suficiente, mantenga 99.',
        severidad: SEVERIDAD.ADVERTENCIA,
        tipo: TIPO.COHERENCIA,
        datosRelacionados: datosContextoV42(registro, '99 significa desconocido; el dato no se encuentra descrito en los soportes clínicos.'),
        columnasCorregir: ['V42']
      }));
    }
  }

  function validarV43(registro, hallazgos) {
    if (!Object.prototype.hasOwnProperty.call(registro, 'V43')) return;

    const v42 = texto(registro.V42);
    const v43 = texto(registro.V43);

    if (estaVacio(v43)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V43-ERROR-001',
        variable: 'V43',
        titulo: 'Fecha del otro cáncer primario vacía',
        mensaje: 'V43 está vacía. Esta variable debe registrar la fecha de diagnóstico del otro cáncer primario o el comodín que corresponda.',
        regla: reglaContextoV43(
          'V42 indica si existe otro cáncer primario. Cuando V42 tiene el valor 1, V43 debe registrar la fecha de diagnóstico de ese otro cáncer o 1800-01-01 si la fecha es desconocida.'
        ),
        recomendacion: 'Registre la fecha en formato AAAA-MM-DD. Si no ha tenido otro cáncer primario, use 1845-01-01. Si la fecha es desconocida, use 1800-01-01 cuando aplique.',
        tipo: TIPO.FORMATO,
        datosRelacionados: datosContextoV43(registro, 'V43 está vacía.'),
        columnasCorregir: ['V43']
      }));
      return;
    }

    if (!esFechaISO(v43)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V43-ERROR-002',
        variable: 'V43',
        titulo: 'Fecha del otro cáncer primario inválida',
        mensaje: `V43 tiene el valor ${v43}. Ese valor no corresponde a una fecha válida en formato AAAA-MM-DD.`,
        regla: reglaContextoV43(
          'V43 debe registrarse como una fecha válida en formato AAAA-MM-DD. Si solo conoce año y mes, registre el día 15.'
        ),
        recomendacion: 'Corrija V43 con una fecha válida o use un comodín permitido según corresponda.',
        tipo: TIPO.FORMATO,
        datosRelacionados: datosContextoV43(registro, `${v43} no es una fecha válida en formato AAAA-MM-DD.`),
        columnasCorregir: ['V43']
      }));
      return;
    }

    if (fechaEsFutura(v43)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V43-ERROR-003',
        variable: 'V43',
        titulo: 'Fecha del otro cáncer primario futura',
        mensaje: `V43 tiene el valor ${v43}. Esa fecha es futura.`,
        regla: reglaContextoV43(
          'V43 debe corresponder a una fecha ya documentada en la historia clínica. No debe registrarse una fecha futura.'
        ),
        recomendacion: 'Revise la fecha documentada en la historia clínica y corrija V43.',
        tipo: TIPO.COHERENCIA,
        datosRelacionados: datosContextoV43(registro, `${v43} es una fecha futura.`),
        columnasCorregir: ['V43']
      }));
      return;
    }

    if (v42 === '2' && v43 !== COMODIN_NO_APLICA) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V43-ERROR-004',
        variable: 'V43',
        titulo: 'Fecha del otro cáncer primario no aplica mal registrada',
        mensaje: 'V42 tiene el valor 2, que significa no tiene otro cáncer primario. Por eso V43 debe ser 1845-01-01.',
        regla: reglaContextoV43(
          'Si V42 tiene el valor 2, significa que no hay otro cáncer primario. En ese caso, V43 debe ser 1845-01-01.'
        ),
        recomendacion: 'Cambie V43 a 1845-01-01.',
        tipo: TIPO.DEPENDENCIA,
        datosRelacionados: datosContextoV43(registro, `${v43} significa ${significadoV43(v43)}.`),
        columnasCorregir: ['V42', 'V43']
      }));
      return;
    }

    if (v42 === '1' && v43 === COMODIN_NO_APLICA) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V43-ERROR-005',
        variable: 'V43',
        titulo: 'Fecha no aplica con antecedente positivo',
        mensaje: 'V42 tiene el valor 1, que significa que sí hay otro cáncer primario. Por eso V43 no debe tener 1845-01-01.',
        regla: reglaContextoV43(
          'Si V42 tiene el valor 1, significa que sí hay otro cáncer primario. En ese caso, V43 debe registrar una fecha real o 1800-01-01 si la fecha es desconocida.'
        ),
        recomendacion: 'Registre la fecha real de diagnóstico del otro cáncer primario. Si no está documentada, use 1800-01-01.',
        tipo: TIPO.DEPENDENCIA,
        datosRelacionados: datosContextoV43(registro, '1845-01-01 significa no aplica.'),
        columnasCorregir: ['V42', 'V43']
      }));
      return;
    }

    if (v42 === '1' && v43 === COMODIN_DESCONOCIDO) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V43-ADVERTENCIA-001',
        variable: 'V43',
        titulo: 'Fecha del otro cáncer primario desconocida',
        mensaje: 'V43 tiene el valor 1800-01-01, que significa fecha desconocida del otro cáncer primario.',
        regla: reglaContextoV43(
          'El valor 1800-01-01 está permitido cuando la fecha del otro cáncer primario no está documentada. Si la fecha existe en la historia clínica, debe registrarse.'
        ),
        recomendacion: 'Revise la historia clínica. Si encuentra la fecha de diagnóstico del otro cáncer primario, registre la fecha real. Si no está documentada, mantenga 1800-01-01.',
        severidad: SEVERIDAD.ADVERTENCIA,
        tipo: TIPO.COHERENCIA,
        datosRelacionados: datosContextoV43(registro, '1800-01-01 significa fecha desconocida.'),
        columnasCorregir: ['V42', 'V43']
      }));
    }
  }


  function validarV44(registro, hallazgos) {
    if (!Object.prototype.hasOwnProperty.call(registro, 'V44')) return;

    const v17 = texto(registro.V17).toUpperCase();
    const v42 = texto(registro.V42);
    const v44 = texto(registro.V44).toUpperCase();

    if (estaVacio(v44)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V44-ERROR-001',
        variable: 'V44',
        titulo: 'CIE-10 del otro cáncer primario vacío',
        mensaje: 'V44 está vacía. Esta variable debe registrar el CIE-10 del otro cáncer primario o 99 si no aplica.',
        regla: reglaContextoV44(
          'V42 indica si existe otro cáncer primario. V44 debe identificar cuál es ese cáncer o registrar 99 cuando no aplica.'
        ),
        recomendacion: 'Registre un CIE-10 válido si existe otro cáncer primario, o use 99 si no aplica.',
        tipo: TIPO.FORMATO,
        datosRelacionados: datosContextoV44(registro, 'V44 está vacía.'),
        columnasCorregir: ['V44']
      }));
      return;
    }

    if (v42 === '1' && v44 === '99') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V44-ERROR-002',
        variable: 'V44',
        titulo: 'CIE-10 no aplica con antecedente positivo',
        mensaje: 'V42 tiene el valor 1, que significa que sí existe otro cáncer primario. Por eso V44 no debe ser 99.',
        regla: reglaContextoV44(
          'Si V42 tiene el valor 1, V44 debe registrar el CIE-10 del otro cáncer primario.'
        ),
        recomendacion: 'Cambie V44 por el CIE-10 del otro cáncer primario, o corrija V42 si realmente no existe otro cáncer.',
        tipo: TIPO.DEPENDENCIA,
        datosRelacionados: datosContextoV44(registro, '99 significa no aplica; no hay antecedente ni concurrencia de otro cáncer primario.'),
        columnasCorregir: ['V42', 'V44']
      }));
      return;
    }

    if (v42 === '2' && v44 !== '99') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V44-ERROR-003',
        variable: 'V44',
        titulo: 'CIE-10 registrado sin antecedente de otro cáncer',
        mensaje: 'V42 tiene el valor 2, que significa que no hay otro cáncer primario. Por eso V44 debe ser 99.',
        regla: reglaContextoV44(
          'Si V42 tiene el valor 2, V44 debe registrarse como 99 porque no hay antecedente ni concurrencia de otro cáncer primario.'
        ),
        recomendacion: 'Use V44 = 99, o corrija V42 si realmente existe otro cáncer primario.',
        tipo: TIPO.DEPENDENCIA,
        datosRelacionados: datosContextoV44(registro, `${v44} no corresponde cuando V42 tiene el valor 2.`),
        columnasCorregir: ['V42', 'V44']
      }));
      return;
    }

    if (v42 === '99' && v44 !== '99') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V44-ADVERTENCIA-001',
        variable: 'V44',
        titulo: 'CIE-10 registrado con antecedente desconocido',
        mensaje: `V42 tiene el valor 99, que significa antecedente desconocido. Sin embargo, V44 tiene el valor ${v44}.`,
        regla: reglaContextoV44(
          'Cuando V42 es desconocido, V44 debería ser 99 salvo que exista soporte suficiente para confirmar otro cáncer primario.'
        ),
        recomendacion: 'Revise la historia clínica. Si el otro cáncer primario está confirmado, cambie V42 a 1. Si no hay soporte suficiente, use V44 = 99.',
        severidad: SEVERIDAD.ADVERTENCIA,
        tipo: TIPO.COHERENCIA,
        datosRelacionados: datosContextoV44(registro, `${v44} es un CIE-10 registrado mientras V42 está como desconocido.`),
        columnasCorregir: ['V42', 'V44']
      }));
      return;
    }

    if (v44 !== '99' && !tieneFormatoCie10Basico(v44)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V44-ERROR-004',
        variable: 'V44',
        titulo: 'Código CIE-10 del otro cáncer primario no válido',
        mensaje: `V44 tiene el valor ${v44}. Ese valor no cumple el formato básico de un código CIE-10 válido.`,
        regla: reglaContextoV44(
          'V44 debe registrar el código CIE-10 definitivo del cáncer antecedente o concurrente. Si no aplica, debe registrarse 99.'
        ),
        recomendacion: 'Corrija V44 con el CIE-10 definitivo del otro cáncer primario.',
        tipo: TIPO.FORMATO,
        datosRelacionados: datosContextoV44(registro, `${v44} no cumple formato básico CIE-10.`),
        columnasCorregir: ['V44']
      }));
      return;
    }

    if (v44 !== '99' && v17 && v44 === v17) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V44-ADVERTENCIA-002',
        variable: 'V44',
        titulo: 'CIE-10 del otro cáncer igual al cáncer reportado',
        mensaje: 'V44 tiene el mismo valor que V17. Esto puede ser válido en casos como segundo primario del mismo agrupador, pero requiere revisión del soporte clínico.',
        regla: reglaContextoV44(
          'El instructivo permite casos como dos primarios del mismo agrupador. Si V44 coincide con V17, revise que realmente corresponda a otro cáncer primario soportado en historia clínica.',
          false
        ),
        recomendacion: 'Revise si realmente corresponde a otro cáncer primario. Si es correcto, conserve el código; si no, corrija V44.',
        severidad: SEVERIDAD.ADVERTENCIA,
        tipo: TIPO.COHERENCIA,
        datosRelacionados: datosContextoV44(registro, `${v44} coincide con V17; revise soporte de segundo primario.`),
        columnasCorregir: ['V17', 'V44']
      }));
    }
  }


  function validar(registro) {
    const hallazgos = [];
    const fila = registro || {};

    validarV41(fila, hallazgos);
    validarV42(fila, hallazgos);
    validarV43(fila, hallazgos);
    validarV44(fila, hallazgos);

    return hallazgos;
  }

  const API = {
    version: VERSION,
    validar,
    _interno: {
      CATALOGO_V41,
      CATALOGO_V42,
      COMODIN_DESCONOCIDO,
      COMODIN_NO_APLICA,
      significadoV41,
      significadoV42,
      significadoV43,
      significadoV44,
      catalogoV41Texto,
      catalogoV42Texto,
      catalogoV43Texto,
      catalogoV44Texto,
      diagnosticoV17,
      esFechaISO,
      fechaEsFutura,
      tieneFormatoCie10Basico
    }
  };

  window.CACModulo8 = API;
  window.Modulo8 = API;
})();
