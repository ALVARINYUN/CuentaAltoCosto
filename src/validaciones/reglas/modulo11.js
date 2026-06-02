// =======================================================
// Validador CAC - validaciones/reglas/modulo11.js
// Sprint 3E - V53
// Variable V53: número de medicamentos antineoplásicos o terapia hormonal propuestos
// =======================================================

(function () {
  'use strict';

  const VERSION_MODULO11 = 'sprint-3e-v53-numero-medicamentos-01';

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
    V45: 'El usuario recibió quimioterapia u otra terapia sistémica',
    V53: 'Número de medicamentos antineoplásicos o terapia hormonal propuestos en el primer o único esquema'
  };

  function texto(valor) {
    return String(valor ?? '').trim();
  }

  function obtenerValor(registro, variable) {
    return texto(registro?.[variable]);
  }

  function nombreVariable(variable) {
    return NOMBRES_VARIABLES[variable] || variable;
  }

  function esEnteroTexto(valor) {
    return /^-?\d+$/.test(texto(valor));
  }

  function numeroEntero(valor) {
    return Number.parseInt(texto(valor), 10);
  }

  function crearHallazgo({
    variable,
    codigo,
    tipo,
    severidad,
    valor,
    titulo,
    mensaje,
    regla,
    recomendacion,
    columnasCorregir,
    datosRelacionados
  }) {
    const columnas = Array.isArray(columnasCorregir) && columnasCorregir.length > 0
      ? columnasCorregir
      : [variable].filter(Boolean);

    const datos = Array.isArray(datosRelacionados) && datosRelacionados.length > 0
      ? datosRelacionados
      : [{
        variable,
        nombre: nombreVariable(variable),
        valor
      }];

    const hallazgoBase = {
      variable,
      codigo,
      tipo,
      severidad,
      valor,
      valorEncontrado: valor,
      titulo,
      mensaje,
      regla,
      recomendacion,
      columnasCorregir: columnas,
      datosRelacionados: datos
    };

    // Si existe el creador global del proyecto, se usa como base y se conservan campos ricos.
    if (typeof window !== 'undefined' && typeof window.crearHallazgo === 'function') {
      try {
        return {
          ...window.crearHallazgo(hallazgoBase),
          ...hallazgoBase
        };
      } catch (error) {
        console.warn('[CACModulo11] No se pudo usar window.crearHallazgo. Se usará hallazgo local.', error);
      }
    }

    return hallazgoBase;
  }

  function agregarHallazgo(lista, datos) {
    lista.push(crearHallazgo(datos));
  }

  function datosV45V53(v45, v53) {
    return [
      { variable: 'V45', nombre: nombreVariable('V45'), valor: v45 || '(vacío)' },
      { variable: 'V53', nombre: nombreVariable('V53'), valor: v53 || '(vacío)' }
    ];
  }

  function validarV53(registro, hallazgos) {
    const v45 = obtenerValor(registro, 'V45');
    const v53 = obtenerValor(registro, 'V53');

    if (!v53) {
      agregarHallazgo(hallazgos, {
        variable: 'V53',
        codigo: 'V53-ERROR-001',
        tipo: TIPO.FORMATO,
        severidad: SEVERIDAD.ERROR,
        valor: '(vacío)',
        titulo: 'Número de medicamentos propuestos vacío',
        mensaje: 'V53 está vacía. Debe registrar el número de medicamentos antineoplásicos o terapia hormonal propuestos en el primer o único esquema, o 98 si no aplica.',
        regla: 'V53 es obligatoria. Si V45=1, registre un número entero mayor que cero. Si V45=98, registre 98.',
        recomendacion: 'Revise la orden médica y los soportes del primer o único esquema. Diligencie la cantidad de medicamentos propuestos; si en V45 se registró 98, use V53=98.'
      });
      return;
    }

    if (!esEnteroTexto(v53)) {
      agregarHallazgo(hallazgos, {
        variable: 'V53',
        codigo: 'V53-ERROR-002',
        tipo: TIPO.FORMATO,
        severidad: SEVERIDAD.ERROR,
        valor: v53,
        titulo: 'V53 debe ser numérica o 98',
        mensaje: 'V53 contiene texto, decimales, símbolos o un valor que no corresponde a un número entero ni al comodín 98.',
        regla: 'V53 debe registrarse como número entero. El único comodín permitido para esta variable es 98 cuando V45=98.',
        recomendacion: 'Reemplace el valor por un número entero mayor que cero si recibió terapia sistémica, o por 98 si no aplica según V45.'
      });
      return;
    }

    if (v45 === '1' && v53 === '98') {
      agregarHallazgo(hallazgos, {
        variable: 'V53',
        codigo: 'V53-ERROR-003',
        tipo: TIPO.COHERENCIA,
        severidad: SEVERIDAD.ERROR,
        valor: v53,
        titulo: 'V53 no puede ser 98 cuando V45 indica terapia sistémica',
        mensaje: 'V45 indica que el usuario sí recibió quimioterapia u otra terapia sistémica, pero V53 registra 98, que significa No aplica.',
        regla: 'Si V45=1, V53 debe registrar el número de medicamentos antineoplásicos o terapia hormonal propuestos en el primer o único esquema.',
        recomendacion: 'Revise V45 y V53. Si el usuario recibió terapia sistémica, cambie V53 por el número de medicamentos propuestos. Si no recibió terapia sistémica, revise si V45 debe ser 98.',
        columnasCorregir: ['V45', 'V53'],
        datosRelacionados: datosV45V53(v45, v53)
      });
      return;
    }

    if (v45 === '98' && v53 !== '98') {
      agregarHallazgo(hallazgos, {
        variable: 'V53',
        codigo: 'V53-ERROR-004',
        tipo: TIPO.COHERENCIA,
        severidad: SEVERIDAD.ERROR,
        valor: v53,
        titulo: 'V53 debe ser 98 cuando V45 no aplica',
        mensaje: 'V45 registra 98, es decir que no aplica quimioterapia o terapia sistémica, pero V53 registra un número diferente de 98.',
        regla: 'Si V45=98, V53 también debe ser 98.',
        recomendacion: 'Revise la coherencia del bloque. Si no aplica terapia sistémica, registre V53=98. Si sí hubo terapia sistémica, revise si V45 debe ser 1.',
        columnasCorregir: ['V45', 'V53'],
        datosRelacionados: datosV45V53(v45, v53)
      });
      return;
    }

    const numero = numeroEntero(v53);

    if (numero <= 0) {
      agregarHallazgo(hallazgos, {
        variable: 'V53',
        codigo: 'V53-ERROR-005',
        tipo: TIPO.FORMATO,
        severidad: SEVERIDAD.ERROR,
        valor: v53,
        titulo: 'Número de medicamentos propuestos inválido',
        mensaje: 'V53 registra cero o un número negativo. La cantidad de medicamentos propuestos no puede ser cero ni negativa.',
        regla: 'Si V45=1, V53 debe ser un número entero mayor que cero. Si no aplica terapia sistémica, use 98 de acuerdo con V45.',
        recomendacion: 'Revise la orden médica y registre la cantidad real de medicamentos antineoplásicos o terapia hormonal propuestos. No cuente medicamentos adyuvantes o de premedicación que no sean antineoplásicos.'
      });
    }
  }

  function validar(registro, catalogos) {
    const hallazgos = [];

    validarV53(registro, hallazgos);

    return hallazgos;
  }

  const modulo = {
    VERSION_MODULO11,
    version: VERSION_MODULO11,
    validar,
    _interno: {
      esEnteroTexto,
      numeroEntero
    }
  };

  if (typeof window !== 'undefined') {
    window.Modulo11 = modulo;
    window.CACModulo11 = modulo;
  }
})();
