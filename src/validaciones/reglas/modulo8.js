// =======================================================
// Validador CAC - Módulo 8
// Sprint 3B · V41-V42
// Cohorte Cáncer
// =======================================================

(function () {
  'use strict';

  const VERSION = 'sprint-3b-v42-antecedente-cancer-01';

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
    V42: 'Antecedente de otro cáncer primario'
  };

  const CATALOGO_V41 = ['1', '2', '3', '4', '5', '6', '99'];
  const CATALOGO_V42 = ['1', '2', '99'];

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
      '2': 'no tiene otro cáncer primario reportado',
      '99': 'desconocido; el dato no se encuentra descrito en los soportes clínicos'
    };

    return mapa[texto(valor)] || 'valor no reconocido';
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

  function notaContextoV17() {
    return 'V17 identifica el cáncer reportado.';
  }

  function notaContextoV18() {
    return 'V18 ubica la fecha de diagnóstico del cáncer reportado.';
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
      dato(registro, 'V17', notaContextoV17()),
      dato(registro, 'V18', notaContextoV18()),
      dato(registro, 'V41', notaV41)
    ];
  }

  function datosContextoV42(registro, notaV42) {
    return [
      dato(registro, 'V17', notaContextoV17()),
      dato(registro, 'V42', notaV42)
    ];
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
        columnasCorregir: ['V17', 'V42']
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
        columnasCorregir: ['V17', 'V42']
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
        columnasCorregir: ['V17', 'V42']
      }));
    }
  }

  function validar(registro) {
    const hallazgos = [];
    const fila = registro || {};

    validarV41(fila, hallazgos);
    validarV42(fila, hallazgos);

    return hallazgos;
  }

  const API = {
    version: VERSION,
    validar,
    _interno: {
      CATALOGO_V41,
      CATALOGO_V42,
      significadoV41,
      significadoV42,
      catalogoV41Texto,
      catalogoV42Texto
    }
  };

  window.CACModulo8 = API;
  window.Modulo8 = API;
})();
