
(function () {
  'use strict';

  const VERSION_MODULO3 = 'sprint-2b-v1-v25-v28-fix-v27-error-005-01';

  const TIPO = {
    FORMATO: 'formato',
    CATALOGO: 'catalogo',
    COHERENCIA: 'coherencia',
    DEPENDENCIA: 'dependencia',
    RANGO_FECHA: 'rango_fecha'
  };

  const SEVERIDAD = {
    ERROR: 'error',
    ADVERTENCIA: 'advertencia'
  };

  const NOMBRES_VARIABLES = {
    V17: 'Código CIE-10 de la neoplasia maligna reportada',
    V18: 'Fecha de diagnóstico del cáncer reportado',
    V21: 'Tipo de estudio con el que se realizó el diagnóstico de cáncer',
    V25: 'Código válido de habilitación de la IPS donde se realiza la confirmación diagnóstica',
    V26: 'Fecha de primera consulta con médico tratante de la enfermedad maligna',
    V27: 'Histología del tumor en muestra de biopsia o quirúrgica',
    V28: 'Grado de diferenciación del tumor sólido maligno'
  };

  const CATALOGO_V27 = new Set([
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '23', '24', '98', '99'
  ]);

  const CATALOGO_V28 = new Set(['1', '2', '3', '4', '94', '95', '98', '99']);

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
    return /^\d+$/.test(texto(valor));
  }

  function esFechaFormato(valor) {
    return /^\d{4}-\d{2}-\d{2}$/.test(texto(valor));
  }

  function esFechaReal(valor) {
    const fecha = texto(valor);

    if (!esFechaFormato(fecha)) {
      return false;
    }

    const [anio, mes, dia] = fecha.split('-').map(Number);
    const fechaUTC = new Date(Date.UTC(anio, mes - 1, dia));

    return (
      fechaUTC.getUTCFullYear() === anio &&
      fechaUTC.getUTCMonth() === mes - 1 &&
      fechaUTC.getUTCDate() === dia
    );
  }

  function compararFechas(a, b) {
    // Retorna -1 si a < b, 0 si a = b, 1 si a > b.
    // Solo usar cuando ambas fechas ya fueron validadas como reales.
    if (a === b) return 0;
    return a < b ? -1 : 1;
  }

  function esFechaComparable(valor) {
    const fecha = texto(valor);

    return esFechaReal(fecha) && fecha !== '1800-01-01' && fecha !== '1845-01-01';
  }

  function esCancerPulmonPorCIE10(codigo) {
    const cie10 = texto(codigo).toUpperCase();

    // C34 corresponde a bronquios y pulmón. Se usa para validar la opción V27=21
    // "Célula pequeña (cáncer de pulmón)" sin inventar otros agrupadores.
    return /^C34\d*$/.test(cie10);
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

    // Si el proyecto tiene creador global, lo usamos como base, pero conservamos campos ricos
    // para tabla-resultados.js y exportador Excel.
    if (typeof window !== 'undefined' && typeof window.crearError === 'function') {
      try {
        const creado = window.crearError(variable, tipo, severidad, valor, mensaje, recomendacion);
        return Object.assign({}, creado, hallazgoBase);
      } catch (error) {
        console.warn('No se pudo usar window.crearError en Modulo3. Se usará hallazgo local.', error);
      }
    }

    return hallazgoBase;
  }

  function agregarHallazgo(lista, datos) {
    lista.push(crearHallazgo(datos));
  }

  function validarV25(registro, hallazgos) {
    const v25 = obtenerValor(registro, 'V25');

    if (!v25) {
      agregarHallazgo(hallazgos, {
        variable: 'V25',
        codigo: 'V25-ERROR-001',
        tipo: TIPO.FORMATO,
        severidad: SEVERIDAD.ERROR,
        valor: '(vacío)',
        titulo: 'Código de IPS de confirmación diagnóstica obligatorio',
        mensaje: 'V25 está vacío. Debe registrar el código de habilitación de la IPS donde se confirmó el diagnóstico, 96 si el diagnóstico fue fuera del país o 99 si el dato es desconocido en los soportes.',
        regla: 'V25 debe contener un código REPS de 12 dígitos, 96 o 99.',
        recomendacion: 'Revise el soporte de patología o diagnóstico clínico. Registre el código REPS de 12 dígitos, 96 o 99 según corresponda.'
      });
      return;
    }

    if (v25 === '96' || v25 === '99') {
      return;
    }

    if (!/^\d+$/.test(v25)) {
      agregarHallazgo(hallazgos, {
        variable: 'V25',
        codigo: 'V25-ERROR-002',
        tipo: TIPO.FORMATO,
        severidad: SEVERIDAD.ERROR,
        valor: v25,
        titulo: 'Código de IPS con caracteres no permitidos',
        mensaje: 'V25 solo permite un código REPS numérico de 12 dígitos, 96 o 99.',
        regla: 'El código de habilitación REPS debe ser numérico y conservar 12 dígitos, incluido el cero inicial cuando aplique.',
        recomendacion: 'Elimine letras, espacios, guiones, puntos u otros símbolos. Si Excel quitó el cero inicial, formatee la columna como texto y vuelva a cargar el dato.'
      });
      return;
    }

    if (v25.length === 12) {
      return;
    }

    if (v25.length < 12) {
      agregarHallazgo(hallazgos, {
        variable: 'V25',
        codigo: 'V25-ADVERTENCIA-003',
        tipo: TIPO.FORMATO,
        severidad: SEVERIDAD.ADVERTENCIA,
        valor: v25,
        titulo: 'ALTA PRIORIDAD: CÓDIGO DE IPS MENOR A 12 DÍGITOS',
        mensaje: 'V25 tiene menos de 12 dígitos. No se bloquea como error, pero requiere revisión porque puede faltar un cero inicial, código de sede o actualización REPS.',
        regla: 'V25 debería tener 12 dígitos cuando corresponde a código REPS, pero por operación los códigos de menor longitud quedan como advertencia.',
        recomendacion: 'Revise si falta cero inicial, código de sede o actualización REPS. Si no tiene el dato completo, conserve el valor y deje el caso marcado para revisión.'
      });
      return;
    }

    if (v25.length > 12) {
      agregarHallazgo(hallazgos, {
        variable: 'V25',
        codigo: 'V25-ADVERTENCIA-004',
        tipo: TIPO.FORMATO,
        severidad: SEVERIDAD.ADVERTENCIA,
        valor: v25,
        titulo: 'ALTA PRIORIDAD: CÓDIGO DE IPS MAYOR A 12 DÍGITOS',
        mensaje: 'V25 tiene más de 12 dígitos. No se bloquea como error, pero requiere revisión porque puede ser un código concatenado, un error de pegado o un dato mal digitado.',
        regla: 'V25 debería tener 12 dígitos cuando corresponde a código REPS, pero por operación los códigos de mayor longitud quedan como advertencia.',
        recomendacion: 'Revise si el código contiene números adicionales, si se pegaron dos códigos juntos o si hubo error de digitación.'
      });
      return;
    }
  }

  function validarV26(registro, hallazgos) {
    const v26 = obtenerValor(registro, 'V26');
    const v18 = obtenerValor(registro, 'V18');

    if (!v26) {
      agregarHallazgo(hallazgos, {
        variable: 'V26',
        codigo: 'V26-ERROR-001',
        tipo: TIPO.FORMATO,
        severidad: SEVERIDAD.ERROR,
        valor: '(vacío)',
        titulo: 'Fecha de primera consulta con médico tratante obligatoria',
        mensaje: 'V26 está vacío. Debe registrar la fecha de la primera consulta con el médico especialista que define la primera conducta terapéutica, o 1800-01-01 si el dato no está descrito en los soportes.',
        regla: 'V26 debe estar en formato AAAA-MM-DD o usar 1800-01-01 como desconocido.',
        recomendacion: 'Revise la historia clínica. Si solo conoce año y mes, registre el día 15 como indica el instructivo.'
      });
      return;
    }

    if (!esFechaFormato(v26)) {
      agregarHallazgo(hallazgos, {
        variable: 'V26',
        codigo: 'V26-ERROR-002',
        tipo: TIPO.FORMATO,
        severidad: SEVERIDAD.ERROR,
        valor: v26,
        titulo: 'Formato de fecha incorrecto en V26',
        mensaje: 'V26 debe tener formato AAAA-MM-DD. No se aceptan fechas con barras, texto, día/mes/año ni valores incompletos.',
        regla: 'El instructivo exige formato AAAA-MM-DD. Si solo conoce año y mes, debe registrar el día 15.',
        recomendacion: 'Corrija la fecha. Ejemplo válido: 2025-02-15. Si no está en soportes, use 1800-01-01.'
      });
      return;
    }

    if (!esFechaReal(v26)) {
      agregarHallazgo(hallazgos, {
        variable: 'V26',
        codigo: 'V26-ERROR-003',
        tipo: TIPO.RANGO_FECHA,
        severidad: SEVERIDAD.ERROR,
        valor: v26,
        titulo: 'Fecha inexistente en V26',
        mensaje: 'V26 tiene formato AAAA-MM-DD, pero no corresponde a una fecha real del calendario.',
        regla: 'La fecha debe ser válida. Ejemplo: no existe 2025-02-30 ni 2025-20-10.',
        recomendacion: 'Revise día y mes en el soporte clínico y corrija la fecha.'
      });
      return;
    }

    if (v26 === '1800-01-01') {
      return;
    }

    if (esFechaComparable(v18) && esFechaComparable(v26) && compararFechas(v26, v18) < 0) {
      agregarHallazgo(hallazgos, {
        variable: 'V26',
        codigo: 'V26-ADV-001',
        tipo: TIPO.COHERENCIA,
        severidad: SEVERIDAD.ADVERTENCIA,
        valor: v26,
        titulo: 'Primera consulta anterior al diagnóstico',
        mensaje: 'V26 tiene una fecha anterior a V18. Esto significa que la primera consulta con el médico tratante aparece registrada antes de la fecha oficial del diagnóstico del cáncer.',
        regla: 'Normalmente, la consulta donde se define el manejo o tratamiento del cáncer ocurre el mismo día o después de la fecha de diagnóstico. Si aparece antes, se debe revisar si alguna fecha está mal digitada o si existe una explicación en la historia clínica.',
        recomendacion: 'Revise V18 y V26 en la historia clínica. Si la fecha de consulta es correcta y está soportada, puede conservarla. Si corresponde a otra consulta o está mal digitada, corrija V26. Si no hay fecha documentada para la consulta, use 1800-01-01 en V26.',
        columnasCorregir: ['V18', 'V26'],
        datosRelacionados: [
          { variable: 'V18', nombre: nombreVariable('V18'), valor: v18 },
          { variable: 'V26', nombre: nombreVariable('V26'), valor: v26 }
        ]
      });
    }
  }

  function validarV27(registro, hallazgos) {
    const v17 = obtenerValor(registro, 'V17').toUpperCase();
    const v21 = obtenerValor(registro, 'V21');
    const v27 = obtenerValor(registro, 'V27');

    if (!v27) {
      agregarHallazgo(hallazgos, {
        variable: 'V27',
        codigo: 'V27-ERROR-001',
        tipo: TIPO.FORMATO,
        severidad: SEVERIDAD.ERROR,
        valor: '(vacío)',
        titulo: 'Histología del tumor obligatoria',
        mensaje: 'V27 está vacío. Debe registrar el subtipo histológico de la biopsia diagnóstica o quirúrgica, 98 si no se realizó estudio histopatológico por diagnóstico clínico exclusivamente, o 99 si el dato es desconocido en soportes.',
        regla: 'V27 debe usar un código válido del catálogo de histología.',
        recomendacion: 'Revise el reporte de patología. Si V21=7, use 98. Si el dato no está en soportes, use 99.'
      });
      return;
    }

    if (!esEnteroTexto(v27)) {
      agregarHallazgo(hallazgos, {
        variable: 'V27',
        codigo: 'V27-ERROR-002',
        tipo: TIPO.FORMATO,
        severidad: SEVERIDAD.ERROR,
        valor: v27,
        titulo: 'Histología debe ser un número válido',
        mensaje: 'V27 tiene texto o un valor no numérico. Esta variable debe diligenciarse solo con el número que corresponde al tipo de histología del tumor.',
        regla: 'La CAC no recibe la descripción escrita en esta variable. Debe registrarse el código numérico del subtipo histológico encontrado en la biopsia diagnóstica. Si no hay información en la biopsia, se usa el reporte quirúrgico.',
        recomendacion: 'Reemplace el texto por uno de los códigos permitidos para V27: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24, 98 o 99.'
      });
      return;
    }

    if (!CATALOGO_V27.has(v27)) {
      agregarHallazgo(hallazgos, {
        variable: 'V27',
        codigo: 'V27-ERROR-003',
        tipo: TIPO.CATALOGO,
        severidad: SEVERIDAD.ERROR,
        valor: v27,
        titulo: 'Código de histología no permitido',
        mensaje: 'V27 tiene un número que no está permitido para la histología del tumor.',
        regla: 'V27 solo permite los códigos: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24, 98 y 99. La opción 22 no está definida en el instructivo recibido.',
        recomendacion: 'Reemplace el valor por uno de los códigos permitidos para V27: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24, 98 o 99. Tenga en cuenta: V27=21 solo aplica para cáncer de pulmón; en ese caso V17 debe ser C34, C340, C341, C342, C343, C348 o C349. V27=98 solo aplica cuando no se realizó estudio histopatológico; en ese caso V21 debe ser 7.',
        columnasCorregir: ['V27'],
        datosRelacionados: [
          {
            variable: 'V27',
            nombre: nombreVariable('V27'),
            valor: v27
          }
        ]
      });
      return;
    }

    if (v21 === '7' && v27 !== '98') {
      agregarHallazgo(hallazgos, {
        variable: 'V27',
        codigo: 'V27-ERROR-004',
        tipo: TIPO.DEPENDENCIA,
        severidad: SEVERIDAD.ERROR,
        valor: v27,
        titulo: 'V27 debe ser 98 cuando el diagnóstico fue clínico exclusivamente',
        mensaje: 'V21=7 indica diagnóstico clínico exclusivamente. En ese caso V27 debe reportar 98 porque no se realizó estudio histopatológico.',
        regla: 'La opción 98 de V27 aplica cuando no se realizó estudio histopatológico y en V21 se registró 7.',
        recomendacion: 'Corrija la combinación: si no se realizó estudio histopatológico, V21 debe ser 7 y V27 debe ser 98. Si sí hubo biopsia, patología o cirugía con resultado, entonces V21 no debe ser 7 y V27 debe tener el código histológico correspondiente.',
        columnasCorregir: ['V21', 'V27'],
        datosRelacionados: [
          { variable: 'V21', nombre: nombreVariable('V21'), valor: v21 },
          { variable: 'V27', nombre: nombreVariable('V27'), valor: v27 }
        ]
      });
      return;
    }

    if (v21 !== '7' && v27 === '98') {
      agregarHallazgo(hallazgos, {
        variable: 'V27',
        codigo: 'V27-ERROR-005',
        tipo: TIPO.DEPENDENCIA,
        severidad: SEVERIDAD.ERROR,
        valor: v27,
        titulo: 'V27 usa 98 pero V21 no indica diagnóstico clínico exclusivamente',
        mensaje: 'V27=98 significa que no se realizó estudio histopatológico. Ese valor solo corresponde cuando V21=7.',
        regla: 'Si hubo biopsia, patología, cirugía u otro estudio diagnóstico diferente a clínica exclusivamente, V27 no debe ser 98.',
        recomendacion: 'Revise V21 y V27. Si no se realizó estudio histopatológico, V21 debe ser 7 y V27 debe ser 98. Si sí hubo estudio histopatológico, registre en V27 el código histológico correspondiente.',
        columnasCorregir: ['V21', 'V27'],
        datosRelacionados: [
          { variable: 'V21', nombre: nombreVariable('V21'), valor: v21 || '(vacío)' },
          { variable: 'V27', nombre: nombreVariable('V27'), valor: v27 }
        ]
      });
      return;
    }

    if (v27 === '99') {
      agregarHallazgo(hallazgos, {
        variable: 'V27',
        codigo: 'V27-ADV-001',
        tipo: TIPO.CATALOGO,
        severidad: SEVERIDAD.ADVERTENCIA,
        valor: v27,
        titulo: 'Histología desconocida',
        mensaje: 'V27=99 indica que no se encontró en los soportes clínicos el tipo exacto de histología del tumor.',
        regla: 'Use 99 solo cuando la historia clínica, biopsia, patología o informe quirúrgico no describen el subtipo histológico. No confunda 99 con 98: 98 significa que no se realizó estudio histopatológico.',
        recomendacion: 'Busque el subtipo histológico en el reporte de patología o cirugía. Si aparece, registre el código correspondiente. Si no aparece en ningún soporte clínico, deje V27=99.'
      });
    }
  }

    function validarV28(registro, hallazgos) {
      const v18 = obtenerValor(registro, 'V18');
      const v21 = obtenerValor(registro, 'V21');
      const v28 = obtenerValor(registro, 'V28');

      if (!v28) {
        agregarHallazgo(hallazgos, {
          variable: 'V28',
          codigo: 'V28-ERROR-001',
          tipo: TIPO.FORMATO,
          severidad: SEVERIDAD.ERROR,
          valor: '(vacío)',
          titulo: 'Falta registrar el grado de diferenciación del tumor',
          mensaje: 'V28 está vacío. Debe registrar el código que corresponde al grado de diferenciación del tumor según la biopsia diagnóstica. Si ese dato no está en la biopsia, revise el informe de primera cirugía.',
          regla: 'V28 debe usar un código válido del catálogo de grado de diferenciación: 1, 2, 3, 4, 94, 95, 98 o 99.',
          recomendacion: 'Revise la biopsia diagnóstica o el informe de primera cirugía y registre uno de estos códigos: 1 si es bien diferenciado, 2 si es moderadamente diferenciado, 3 si es mal diferenciado, 4 si es anaplásico o indiferenciado, 94 si es tumor sólido pero el reporte no describe diferenciación, 95 si no es tumor sólido, 98 si no se realizó histopatología y V21=7, o 99 si no hay información en la historia clínica.',
          columnasCorregir: ['V28'],
          datosRelacionados: [
            {
              variable: 'V28',
              nombre: nombreVariable('V28'),
              valor: '(vacío)'
            }
          ]
        });
        return;
      }

      if (!esEnteroTexto(v28)) {
        agregarHallazgo(hallazgos, {
          variable: 'V28',
          codigo: 'V28-ERROR-002',
          tipo: TIPO.FORMATO,
          severidad: SEVERIDAD.ERROR,
          valor: v28,
          titulo: 'Grado de diferenciación con formato inválido',
          mensaje: 'V28 debe ser numérica. No se aceptan textos, letras, puntos, guiones ni descripciones escritas.',
          regla: 'El instructivo define un catálogo cerrado numérico para V28.',
          recomendacion: 'Reemplace el texto por el código correspondiente: 1, 2, 3, 4, 94, 95, 98 o 99.'
        });
        return;
      }

      if (!CATALOGO_V28.has(v28)) {
        agregarHallazgo(hallazgos, {
          variable: 'V28',
          codigo: 'V28-ERROR-003',
          tipo: TIPO.CATALOGO,
          severidad: SEVERIDAD.ERROR,
          valor: v28,
          titulo: 'Código de grado de diferenciación fuera de catálogo',
          mensaje: 'V28 tiene un código que no existe en el catálogo definido por el instructivo.',
          regla: 'V28 solo permite: 1, 2, 3, 4, 94, 95, 98 y 99.',
          recomendacion: 'Revise el grado de diferenciación reportado y seleccione una opción válida.'
        });
        return;
      }

      if (v21 === '7' && v28 !== '98') {
        agregarHallazgo(hallazgos, {
          variable: 'V28',
          codigo: 'V28-ERROR-004',
          tipo: TIPO.DEPENDENCIA,
          severidad: SEVERIDAD.ERROR,
          valor: v28,
          titulo: 'V28 debe ser 98 cuando el diagnóstico fue clínico exclusivamente',
          mensaje: 'V21=7 indica diagnóstico clínico exclusivamente. En ese caso V28 debe reportar 98 porque no se realizó estudio histopatológico.',
          regla: 'La opción 98 de V28 aplica cuando no se realizó estudio histopatológico y en V21 se registró 7.',
          recomendacion: 'Cambie V28 a 98 o revise si V21 fue digitado correctamente.',
          columnasCorregir: ['V21', 'V28'],
          datosRelacionados: [
            { variable: 'V21', nombre: nombreVariable('V21'), valor: v21 },
            { variable: 'V28', nombre: nombreVariable('V28'), valor: v28 }
          ]
        });
        return;
      }

      if (v21 !== '7' && v28 === '98') {
        agregarHallazgo(hallazgos, {
          variable: 'V28',
          codigo: 'V28-ERROR-005',
          tipo: TIPO.DEPENDENCIA,
          severidad: SEVERIDAD.ERROR,
          valor: v28,
          titulo: 'V28 usa 98 pero V21 no indica diagnóstico clínico exclusivamente',
          mensaje: 'V28=98 significa que no se realizó estudio histopatológico. Ese valor solo corresponde cuando V21=7.',
          regla: 'Si hubo histopatología o un estudio diagnóstico diferente a clínica exclusivamente, V28 no debe ser 98.',
          recomendacion: 'Revise V21 y V28. Si sí hubo patología pero no describe diferenciación, evalúe si corresponde 94 o 99 según el caso.',
          columnasCorregir: ['V21', 'V28'],
          datosRelacionados: [
            { variable: 'V21', nombre: nombreVariable('V21'), valor: v21 || '(vacío)' },
            { variable: 'V28', nombre: nombreVariable('V28'), valor: v28 }
          ]
        });
        return;
      }


    }

    function validar(registro, catalogos) {
      const hallazgos = [];

      validarV25(registro, hallazgos);
      validarV26(registro, hallazgos);
      validarV27(registro, hallazgos);
      validarV28(registro, hallazgos);

      return hallazgos;
    }

    const modulo = {
      VERSION_MODULO3,
      validar,
      _interno: {
        esFechaReal,
        esFechaComparable,
        esCancerPulmonPorCIE10
      }
    };

    if (typeof window !== 'undefined') {
      window.Modulo3 = modulo;
      window.CACModulo3 = modulo;
    }
})();
