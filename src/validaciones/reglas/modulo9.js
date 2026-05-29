(function () {
  'use strict';

  const VERSION = 'sprint-3c-v45-terapia-sistemica-descripciones-03';

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
    V45: 'Recibió quimioterapia u otra terapia sistémica en el periodo de reporte'
  };

  const CATALOGO_V45 = ['1', '98'];

  function texto(valor) {
    return String(valor ?? '').trim();
  }

  function estaVacio(valor) {
    return texto(valor) === '';
  }

  function nombreVariable(variable) {
    return NOMBRES_VARIABLES[variable] || variable;
  }

  function obtenerDiagnosticoCIE10(valor) {
    const codigo = texto(valor).toUpperCase();

    if (!codigo) return null;

    if (
      window.CACCargadorCatalogos &&
      typeof window.CACCargadorCatalogos.buscarCIE10 === 'function'
    ) {
      return window.CACCargadorCatalogos.buscarCIE10(codigo);
    }

    return null;
  }

  function descripcionDiagnosticoV17(registro) {
    const v17 = texto(registro ? registro.V17 : '').toUpperCase();
    const cie10 = obtenerDiagnosticoCIE10(v17);

    if (v17 && cie10 && cie10.descripcion) {
      return `${v17} corresponde a ${cie10.descripcion}.`;
    }

    if (v17) {
      return `${v17} es el código CIE-10 del cáncer reportado en esta línea.`;
    }

    return 'V17 identifica el cáncer reportado en esta línea.';
  }

  function descripcionV18() {
    return 'V18 registra la fecha de diagnóstico del cáncer reportado.';
  }

  function descripcionV41(registro) {
    const v41 = texto(registro ? registro.V41 : '');

    if (v41) {
      return `V41 tiene el valor ${v41}; registra la intervención médica durante el periodo de reporte.`;
    }

    return 'V41 registra la intervención médica durante el periodo de reporte.';
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

  function datosContextoV45(registro, notaV45) {
    return [
      dato(registro, 'V17', descripcionDiagnosticoV17(registro)),
      dato(registro, 'V18', descripcionV18()),
      dato(registro, 'V41', descripcionV41(registro)),
      dato(registro, 'V45', notaV45)
    ];
  }

  function catalogoPermitidoV45() {
    return [
      'Catálogo permitido V45:',
      '1 = Sí recibió quimioterapia u otra terapia sistémica dentro del periodo de reporte.',
      '98 = No aplica; no está indicada esta terapia.'
    ].join('\n');
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

  function validarV45(registro, hallazgos) {
    if (!Object.prototype.hasOwnProperty.call(registro, 'V45')) return;

    const v45 = texto(registro.V45);

    if (estaVacio(v45)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V45-ERROR-001',
        variable: 'V45',
        titulo: 'Terapia sistémica sin registrar',
        mensaje: 'V45 está vacía. Debe indicar si el usuario recibió quimioterapia u otra terapia sistémica dentro del periodo de reporte o si esta no aplica.',
        regla: [
          'V45 define si aplica el bloque de terapia sistémica para el cáncer reportado en V17 o sus metástasis.',
          'Si V45 queda vacía, no se puede establecer si corresponde registrar tratamiento sistémico o marcarlo como no aplica.',
          '',
          catalogoPermitidoV45()
        ].join('\n'),
        recomendacion: 'Revise el soporte clínico y registre 1 si recibió terapia sistémica o 98 si esta terapia no aplica.',
        tipo: TIPO.FORMATO,
        datosRelacionados: datosContextoV45(registro, 'V45 está vacía.'),
        columnasCorregir: ['V45']
      }));
      return;
    }

    if (!CATALOGO_V45.includes(v45)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V45-ERROR-002',
        variable: 'V45',
        titulo: 'Código de terapia sistémica no permitido',
        mensaje: `V45 tiene el valor ${v45}. Ese valor no es válido para esta variable. En V45 solo se permite registrar 1 o 98.`,
        regla: [
          'V45 define si aplica el bloque de terapia sistémica para el cáncer reportado en V17 o sus metástasis.',
          
          '',
          catalogoPermitidoV45()
        ].join('\n'),
        recomendacion: 'Cambie V45 por 1 o 98 según el soporte clínico.',
        tipo: TIPO.CATALOGO,
        datosRelacionados: datosContextoV45(
          registro,
          `${v45} no pertenece al catálogo permitido para V45.`
        ),
        columnasCorregir: ['V45']
      }));
    }
  }

  function validar(registro) {
    const hallazgos = [];
    const fila = registro || {};

    validarV45(fila, hallazgos);

    return hallazgos;
  }

  const API = {
    version: VERSION,
    validar,
    _interno: {
      CATALOGO_V45,
      catalogoPermitidoV45,
      obtenerDiagnosticoCIE10
    }
  };

  window.CACModulo9 = API;
  window.Modulo9 = API;
})();
