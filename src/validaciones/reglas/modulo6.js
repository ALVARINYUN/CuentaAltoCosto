// =======================================================
// Validador CAC - validaciones/reglas/modulo6.js
// Sprint 2E: V34-V35
// V34: Estadificación de Dukes para cáncer colorrectal
// V35: Fecha en que se realizó la estadificación de Dukes
// Versión con reglas completas y descripciones simplificadas
// =======================================================

(function () {
  'use strict';

  const VERSION = 'sprint-2e-v34-v35-descripciones-simples-03';

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
    V34: 'Para cáncer colorrectal, estadificación de Dukes',
    V35: 'Fecha en que se realizó la estadificación de Dukes'
  };

  const COMODIN_DESCONOCIDO = '1800-01-01';
  const COMODIN_NO_APLICA = '1845-01-01';

  const CATALOGO_V34 = ['1', '2', '3', '4', '98', '99'];
  const CODIGOS_DUKES_REALES = ['1', '2', '3', '4'];
  const CODIGOS_DUKES_NO_APLICA = ['98', '99'];

  // Alcance operativo actual para Dukes:
  // C18 = colon, C19 = unión rectosigmoidea, C20 = recto.
  // No se incluye C21 anal en esta regla hasta que el instructivo lo indique de forma expresa.
  const CIE10_COLORRECTAL = new Set([
    'C180', 'C181', 'C182', 'C183', 'C184',
    'C185', 'C186', 'C187', 'C188', 'C189',
    'C19X', 'C20X'
  ]);

  function texto(valor) {
    return String(valor ?? '').trim();
  }

  function textoMayuscula(valor) {
    return texto(valor).toUpperCase().replace(/\s+/g, '');
  }

  function nombreVariable(variable) {
    return NOMBRES_VARIABLES[variable] || variable;
  }

  function dato(registro, variable, nota = '') {
    return CACTipos.crearDatoRelacionado(
      variable,
      nombreVariable(variable),
      texto(registro[variable]),
      nota
    );
  }

  function esEntero(valor) {
    return /^\d+$/.test(texto(valor));
  }

  function esFechaISO(valor) {
    return CACTipos.esFechaISO(texto(valor));
  }

  function esCancerColorrectal(v17) {
    return CIE10_COLORRECTAL.has(textoMayuscula(v17));
  }

  function esDukesReal(v34) {
    return CODIGOS_DUKES_REALES.includes(texto(v34));
  }

  function esDukesNoAplica(v34) {
    return CODIGOS_DUKES_NO_APLICA.includes(texto(v34));
  }

  function esFechaRealV35(valor) {
    const fecha = texto(valor);
    return esFechaISO(fecha) && fecha !== COMODIN_NO_APLICA && fecha !== COMODIN_DESCONOCIDO;
  }

  function esFechaRealClinica(valor) {
    const fecha = texto(valor);
    return esFechaISO(fecha) && fecha !== COMODIN_NO_APLICA && fecha !== COMODIN_DESCONOCIDO;
  }

  function catalogoV34Texto() {
    return [
      'Catálogo V34:',
      '1 = A.',
      '2 = B.',
      '3 = C.',
      '4 = D.',
      '98 = No aplica: no es cáncer colorrectal.',
      '99 = Es cáncer colorrectal, pero no hay información en la historia clínica acerca de esta estadificación.'
    ].join('\n');
  }

  function reglaV35Texto() {
    return [
      'Regla V35:',
      'Si V34 = 1, 2, 3 o 4, registre la fecha real en formato AAAA-MM-DD.',
      'Si solo conoce año y mes, registre el día 15.',
      'Si V34 = 98 o 99, registre V35 = 1845-01-01.'
    ].join('\n');
  }

  function notaDiagnosticoColorrectal(registro) {
    const v17 = textoMayuscula(registro.V17);
    if (!v17) return 'Define si aplica Dukes por diagnóstico.';
    return esCancerColorrectal(v17)
      ? `${v17} pertenece a cáncer colorrectal.`
      : `${v17} no corresponde a cáncer colorrectal para esta validación.`;
  }

  function datosSoloV34(registro) {
    return [
      dato(registro, 'V34', 'Código registrado para la estadificación de Dukes.')
    ];
  }

  function datosV34CatalogoConFecha(registro) {
    return [
      dato(registro, 'V17', notaDiagnosticoColorrectal(registro)),
      dato(registro, 'V34', 'Código registrado para la estadificación de Dukes.'),
      dato(registro, 'V35', 'Fecha asociada a la estadificación reportada en V34.')
    ];
  }

  function datosV17V34(registro) {
    return [
      dato(registro, 'V17', notaDiagnosticoColorrectal(registro)),
      dato(registro, 'V34', 'Código registrado para la estadificación de Dukes.')
    ];
  }

  function datosV17V34V35(registro) {
    return [
      dato(registro, 'V17', notaDiagnosticoColorrectal(registro)),
      dato(registro, 'V34', 'Código registrado para la estadificación de Dukes.'),
      dato(registro, 'V35', 'Fecha o comodín que depende del valor registrado en V34.')
    ];
  }

  function datosSoloV35(registro) {
    return [
      dato(registro, 'V35', 'Fecha de Dukes o comodín no aplica.')
    ];
  }

  function datosV34V35(registro) {
    return [
      dato(registro, 'V34', 'Define si V35 debe ser fecha real o 1845-01-01.'),
      dato(registro, 'V35', 'Fecha de Dukes o comodín no aplica.')
    ];
  }

  function datosV18V35(registro) {
    return [
      dato(registro, 'V18', 'Fecha de diagnóstico del cáncer reportado.'),
      dato(registro, 'V34', 'Indica que existe una estadificación Dukes real.'),
      dato(registro, 'V35', 'Fecha de realización de la estadificación de Dukes.')
    ];
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
      datosRelacionados: datosRelacionados || [dato({}, variable)],
      columnasCorregir: columnasCorregir || [variable]
    };
  }

  function crearHallazgoRegistro(registro, opciones) {
    const variable = opciones.variable;
    return crearHallazgo({
      ...opciones,
      valor: opciones.valor ?? registro[variable],
      datosRelacionados: opciones.datosRelacionados || [dato(registro, variable)],
      columnasCorregir: opciones.columnasCorregir || [variable]
    });
  }

  function validarV34(registro, hallazgos) {
    const v17 = textoMayuscula(registro.V17);
    const v34 = texto(registro.V34);
    const colorrectal = esCancerColorrectal(v17);

    if (!v34) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V34-ERROR-001',
        variable: 'V34',
        titulo: 'Estadificación de Dukes vacía',
        mensaje: 'V34 está vacía. Esta variable debe registrar la estadificación de Dukes o el código que corresponda según el caso.',
        regla: [
          'V34 no debe quedar vacía. Debe indicar si tiene Dukes, si no aplica porque no es cáncer colorrectal, o si es cáncer colorrectal pero no hay información en la historia clínica.',
          '',
          catalogoV34Texto()
        ].join('\n'),
        recomendacion: 'Revise la historia clínica y registre el código correspondiente en V34.',
        tipo: TIPO.FORMATO,
        datosRelacionados: datosSoloV34(registro),
        columnasCorregir: ['V34']
      }));
      return;
    }

    if (!esEntero(v34)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V34-ERROR-002',
        variable: 'V34',
        titulo: 'Estadificación de Dukes no numérica',
        mensaje: `V34 tiene “${v34}”. Esta variable debe registrarse con código numérico, no con texto.`,
        regla: [
          'Aunque Dukes se expresa como A, B, C o D, en la matriz CAC debe registrarse el código numérico correspondiente.',
          '',
          catalogoV34Texto()
        ].join('\n'),
        recomendacion: 'Reemplace el texto por el código numérico correspondiente. No escriba A, B, C o D; use 1, 2, 3 o 4.',
        tipo: TIPO.FORMATO,
        datosRelacionados: datosSoloV34(registro),
        columnasCorregir: ['V34']
      }));
      return;
    }

    if (!CATALOGO_V34.includes(v34)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V34-ERROR-003',
        variable: 'V34',
        titulo: 'Estadificación de Dukes fuera de catálogo',
        mensaje: `V34 tiene el valor ${v34}. Ese código no pertenece al catálogo permitido para la estadificación de Dukes.`,
        regla: [
          'V34 solo acepta los códigos definidos por el instructivo. Si se registra un número diferente, no se puede interpretar si corresponde a Dukes A, B, C, D, no aplica o sin información.',
          '',
          catalogoV34Texto(),
          '',
          'Si V35 tiene una fecha real, primero debe corregirse V34 para saber si esa fecha corresponde a una estadificación válida o si debía registrarse 1845-01-01.',
          '',
          reglaV35Texto()
        ].join('\n'),
        recomendacion: 'Corrija primero V34 usando un código válido del catálogo. Después revise si V35 debe conservar la fecha real o cambiarse a 1845-01-01.',
        tipo: TIPO.CATALOGO,
        datosRelacionados: datosV34CatalogoConFecha(registro),
        columnasCorregir: ['V34']
      }));
      return;
    }

    if (!colorrectal && esDukesReal(v34)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V34-ERROR-004',
        variable: 'V34',
        titulo: 'Dukes no aplica porque no es cáncer colorrectal',
        mensaje: `V17=${v17 || '(vacío)'} no corresponde a cáncer colorrectal, pero V34 tiene una estadificación Dukes real.`,
        regla: 'V34 solo aplica para cáncer colorrectal. Si el diagnóstico no es cáncer colorrectal, debe registrarse 98 y V35 debe ser 1845-01-01.',
        recomendacion: 'Si V17 no es cáncer colorrectal, registre V34=98 y V35=1845-01-01. Si el caso sí es cáncer colorrectal, revise y corrija V17.',
        tipo: TIPO.DEPENDENCIA,
        datosRelacionados: datosV17V34V35(registro),
        columnasCorregir: ['V17', 'V34', 'V35']
      }));
      return;
    }

    if (!colorrectal && v34 === '99') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V34-ERROR-006',
        variable: 'V34',
        titulo: 'V34=99 no corresponde si no es cáncer colorrectal',
        mensaje: `V17=${v17 || '(vacío)'} no corresponde a cáncer colorrectal, pero V34 está como 99.`,
        regla: 'El código 99 significa que sí es cáncer colorrectal, pero no hay información de Dukes en la historia clínica. Si el diagnóstico no es cáncer colorrectal, debe usarse 98.',
        recomendacion: 'Si V17 no es cáncer colorrectal, cambie V34 a 98. Si el caso sí corresponde a cáncer colorrectal, revise y corrija V17.',
        tipo: TIPO.DEPENDENCIA,
        datosRelacionados: datosV17V34(registro),
        columnasCorregir: ['V17', 'V34']
      }));
      return;
    }

    if (colorrectal && v34 === '98') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V34-ERROR-005',
        variable: 'V34',
        titulo: 'Dukes marcado como no aplica en cáncer colorrectal',
        mensaje: `V17=${v17} corresponde a cáncer colorrectal, pero V34 está como 98.`,
        regla: [
          'Si es cáncer colorrectal, V34 no debe ser 98. Debe registrar 1, 2, 3 o 4 si Dukes está documentado, o 99 si no hay información en la historia clínica.',
          '',
          catalogoV34Texto()
        ].join('\n'),
        recomendacion: 'Si Dukes está documentado, use V34=1, 2, 3 o 4. Si no hay información de Dukes en historia clínica, use V34=99. Después revise V35 según el valor corregido de V34.',
        tipo: TIPO.DEPENDENCIA,
        datosRelacionados: datosV17V34V35(registro),
        columnasCorregir: ['V17', 'V34', 'V35']
      }));
      return;
    }

    if (colorrectal && v34 === '99') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V34-ADVERTENCIA-001',
        variable: 'V34',
        titulo: 'Cáncer colorrectal sin información de Dukes',
        mensaje: 'V34=99 es permitido cuando es cáncer colorrectal, pero no hay información de Dukes en la historia clínica.',
        regla: 'El valor 99 no es un error; deja trazabilidad de ausencia de información. Debe confirmarse contra los soportes clínicos antes del reporte final.',
        recomendacion: 'Mantenga V34=99 solo si realmente no existe información de Dukes en la historia clínica. En ese caso V35 debe ser 1845-01-01.',
        severidad: SEVERIDAD.ADVERTENCIA,
        tipo: TIPO.COHERENCIA,
        datosRelacionados: datosV17V34V35(registro),
        columnasCorregir: ['V17', 'V34', 'V35']
      }));
    }
  }

  function validarV35(registro, hallazgos) {
    const v34 = texto(registro.V34);
    const v35 = texto(registro.V35);
    const dukesReal = esDukesReal(v34);
    const dukesNoAplica = esDukesNoAplica(v34);

    if (!v35) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V35-ERROR-001',
        variable: 'V35',
        titulo: 'Fecha de Dukes vacía',
        mensaje: 'V35 está vacía. Debe registrar la fecha de Dukes o el comodín 1845-01-01 cuando corresponda.',
        regla: [
          'Si V34 tiene una estadificación real, V35 debe registrar la fecha en que se realizó. Si V34 es 98 o 99, V35 debe ser 1845-01-01.',
          '',
          reglaV35Texto()
        ].join('\n'),
        recomendacion: 'Registre la fecha correspondiente en V35 según el valor de V34.',
        tipo: TIPO.FORMATO,
        datosRelacionados: datosV34V35(registro),
        columnasCorregir: ['V35']
      }));
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(v35)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V35-ERROR-002',
        variable: 'V35',
        titulo: 'Fecha de Dukes con formato incorrecto',
        mensaje: `V35 tiene el valor ${v35}. La fecha debe escribirse en formato AAAA-MM-DD.`,
        regla: [
          'El sistema solo puede validar correctamente la fecha si está escrita con año, mes y día separados por guion.',
          '',
          'Ejemplo correcto:',
          '2024-01-20'
        ].join('\n'),
        recomendacion: 'Corrija V35 usando el formato AAAA-MM-DD.',
        tipo: TIPO.FORMATO,
        datosRelacionados: datosSoloV35(registro),
        columnasCorregir: ['V35']
      }));
      return;
    }

    if (!esFechaISO(v35)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V35-ERROR-003',
        variable: 'V35',
        titulo: 'Fecha de Dukes inexistente',
        mensaje: `V35 tiene el valor ${v35}. Aunque está en formato AAAA-MM-DD, esa fecha no existe en el calendario.`,
        regla: 'V35 debe registrar una fecha real o el comodín 1845-01-01 cuando no aplica.',
        recomendacion: 'Corrija V35 con una fecha válida. Si solo conoce el año y el mes, registre el día 15. Si no aplica según V34, use 1845-01-01.',
        tipo: TIPO.FORMATO,
        datosRelacionados: datosSoloV35(registro),
        columnasCorregir: ['V35']
      }));
      return;
    }

    if (v35 === COMODIN_DESCONOCIDO) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V35-ERROR-006',
        variable: 'V35',
        titulo: 'Comodín no permitido en V35',
        mensaje: 'V35 tiene 1800-01-01, pero ese comodín no está permitido para esta variable.',
        regla: [
          'Para V35, el instructivo solo permite 1845-01-01 como comodín de no aplica. No indica 1800-01-01 como valor válido.',
          '',
          reglaV35Texto()
        ].join('\n'),
        recomendacion: 'Reemplace 1800-01-01 por la fecha real de Dukes si V34 tiene una estadificación real. Si V34 es 98 o 99, use 1845-01-01.',
        tipo: TIPO.CATALOGO,
        datosRelacionados: datosV34V35(registro),
        columnasCorregir: ['V35']
      }));
      return;
    }

    if (dukesReal && v35 === COMODIN_NO_APLICA) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V35-ERROR-004',
        variable: 'V35',
        titulo: 'V35 no puede ser No aplica cuando V34 tiene Dukes real',
        mensaje: `V34=${v34} indica una estadificación Dukes real, pero V35 está como 1845-01-01.`,
        regla: 'Si V34 es 1, 2, 3 o 4, V35 debe registrar la fecha real de la estadificación. El comodín 1845-01-01 solo aplica cuando V34 es 98 o 99.',
        recomendacion: 'Busque la fecha real de la estadificación de Dukes y regístrela en V35.',
        tipo: TIPO.COHERENCIA,
        datosRelacionados: datosV34V35(registro),
        columnasCorregir: ['V34', 'V35']
      }));
      return;
    }

    if (dukesNoAplica && v35 !== COMODIN_NO_APLICA) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V35-ERROR-005',
        variable: 'V35',
        titulo: 'V35 debe ser 1845-01-01',
        mensaje: `V34 está en ${v34}, pero V35 tiene una fecha real.`,
        regla: 'Según el instructivo, V35 debe ser 1845-01-01 cuando no es cáncer colorrectal o cuando V34=99.',
        recomendacion: 'Cambie V35 a 1845-01-01.',
        tipo: TIPO.COHERENCIA,
        datosRelacionados: datosV17V34V35(registro),
        columnasCorregir: ['V34', 'V35']
      }));
      return;
    }

    if (dukesReal && esFechaRealV35(v35) && esFechaRealClinica(registro.V18)) {
      const comparacion = CACTipos.compararFechas(v35, texto(registro.V18));

      if (comparacion === -1) {
        hallazgos.push(crearHallazgoRegistro(registro, {
          codigo: 'V35-ADVERTENCIA-001',
          variable: 'V35',
          titulo: 'Fecha de Dukes anterior al diagnóstico',
          mensaje: 'V35 está antes de V18. La fecha de estadificación de Dukes aparece anterior a la fecha de diagnóstico del cáncer reportado.',
          regla: 'La fecha de Dukes debe tener coherencia clínica con la fecha de diagnóstico reportada. Si aparece antes, puede ser un error de digitación o una fecha tomada de otro evento clínico.',
          recomendacion: 'Revise V18 y V35 en los soportes clínicos. Corrija la fecha que no corresponda.',
          severidad: SEVERIDAD.ADVERTENCIA,
          tipo: TIPO.COHERENCIA,
          datosRelacionados: datosV18V35(registro),
          columnasCorregir: ['V18', 'V35']
        }));
      }
    }
  }

  function validar(registro) {
    const hallazgos = [];
    const fila = registro || {};

    if (Object.prototype.hasOwnProperty.call(fila, 'V34')) {
      validarV34(fila, hallazgos);
    }

    if (Object.prototype.hasOwnProperty.call(fila, 'V35')) {
      validarV35(fila, hallazgos);
    }

    return hallazgos;
  }

  window.CACModulo6 = {
    version: VERSION,
    validar,
    _interno: {
      CIE10_COLORRECTAL: Array.from(CIE10_COLORRECTAL),
      esCancerColorrectal
    }
  };
})();
