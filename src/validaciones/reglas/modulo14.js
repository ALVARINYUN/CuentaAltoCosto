(function () {
  'use strict';

  const VERSION = 'sprint-3g-v62-fecha-inicio-ultimo-esquema-02-texto-v61-97';

  const CATALOGO_V61_TEXTO =
    'Catálogo permitido para V61:\n' +
    '1: Neoadyuvancia (manejo inicial prequirúrgico).\n' +
    '2: Tratamiento inicial curativo sin cirugía sugerida. Por ejemplo, puede ser una opción frecuente en leucemias, linfomas u otros cánceres en los que no se realizó cirugía.\n' +
    '3: Adyuvancia (manejo inicial postquirúrgico).\n' +
    '11: Manejo de progresión o recaída.\n' +
    '12: Manejo de enfermedad metastásica.\n' +
    '13: Cambio por toxicidad.\n' +
    '14: Manejo paliativo, sin manejo de recaída ni enfermedad metastásica.\n' +
    '97: Solo recibió un esquema de quimioterapia en este periodo y en V45 seleccionó la opción 1. El instructivo indica verificar que V62 a V73 registren No Aplica; esa validación queda pendiente hasta implementar esas variables.\n' +
    '98: No aplica cuando en V45 seleccionó la opción 98.';

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
      V61: 'Ubicación temporal del último esquema de terapia sistémica del periodo',
      V62: 'Fecha de inicio del último esquema de quimioterapia o terapia sistémica'
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

  function describirValorV61(valor) {
    const codigo = normalizarCodigo(valor);

    const descripciones = {
      '1': 'V61=1 significa neoadyuvancia: manejo inicial prequirúrgico.',
      '2': 'V61=2 significa tratamiento inicial curativo sin cirugía sugerida. Puede aplicar, por ejemplo, en leucemias, linfomas u otros cánceres sin cirugía.',
      '3': 'V61=3 significa adyuvancia: manejo inicial postquirúrgico.',
      '11': 'V61=11 significa manejo de progresión o recaída.',
      '12': 'V61=12 significa manejo de enfermedad metastásica.',
      '13': 'V61=13 significa cambio por toxicidad.',
      '14': 'V61=14 significa manejo paliativo, sin manejo de recaída ni enfermedad metastásica.',
      '97': 'V61=97 significa que solo recibió un esquema de quimioterapia o terapia sistémica en este periodo y V45=1.',
      '98': 'V61=98 significa no aplica porque V45=98.'
    };

    if (descripciones[codigo]) {
      return descripciones[codigo];
    }

    if (!codigo) {
      return 'V61 está vacía.';
    }

    return `V61 tiene el valor ${codigo}.`;
  }


  function esFechaISO(valor) {
    const v = texto(valor);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;

    const [yyyy, mm, dd] = v.split('-').map(Number);
    const fecha = new Date(Date.UTC(yyyy, mm - 1, dd));

    return fecha.getUTCFullYear() === yyyy &&
      fecha.getUTCMonth() === mm - 1 &&
      fecha.getUTCDate() === dd;
  }

  function describirValorV62(valor) {
    const v = texto(valor);

    if (!v) {
      return 'V62 está vacía.';
    }

    if (v === '1845-01-01') {
      return 'V62=1845-01-01 significa No Aplica.';
    }

    if (esFechaISO(v)) {
      return `V62 registra la fecha ${v} como inicio del último esquema de quimioterapia o terapia sistémica.`;
    }

    return `V62 tiene el valor ${v}.`;
  }

  function v61IndicaUltimoEsquemaReal(valor) {
    return ['1', '2', '3', '11', '12', '13', '14'].includes(normalizarCodigo(valor));
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

  function validarV61(registro) {
    const hallazgos = [];

    const v45Original = registro?.V45;
    const v45 = normalizarCodigo(v45Original);

    const v61Original = registro?.V61;
    const v61 = normalizarCodigo(v61Original);

    if (estaVacio(v61Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V61-ERROR-001',
        variable: 'V61',
        titulo: 'V61 está vacía',
        mensaje:
          'V61 está vacía. Esta variable debe registrar la ubicación temporal del último esquema de quimioterapia o terapia sistémica de este periodo de reporte, en relación con el manejo oncológico. Si el paciente recibió únicamente hormonoterapia en el periodo, el instructivo indica no reportarla nuevamente como esquema final; en ese escenario se debe usar la opción que corresponda, usualmente 97 cuando V45=1 y solo recibió un esquema.\n\n' +
          CATALOGO_V61_TEXTO,
        regla: 'V61 es obligatoria cuando la columna existe. El instructivo solicita registrar la ubicación temporal del último esquema de quimioterapia o terapia sistémica del periodo, o registrar 97/98 cuando corresponda según V45 y el número de esquemas recibidos.',
        recomendacion: 'Revise la historia clínica y registre en V61 el código que corresponda según el catálogo mostrado.',
        valor: v61Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, 'La variable no tiene dato registrado.')
        ]
      }));

      return hallazgos;
    }

    const valoresPermitidos = ['1', '2', '3', '11', '12', '13', '14', '97', '98'];

    if (!valoresPermitidos.includes(v61)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V61-ERROR-002',
        variable: 'V61',
        titulo: 'V61 tiene un valor fuera del catálogo permitido',
        mensaje:
          `V61 tiene el valor ${texto(v61Original)}, pero no corresponde al catálogo permitido para la ubicación temporal del último esquema de terapia sistémica. V61 es un catálogo cerrado; por eso no se aceptan valores diferentes de los definidos por el instructivo.\n\n` +
          CATALOGO_V61_TEXTO,
        regla: 'El instructivo de V61 define un catálogo cerrado para registrar la ubicación temporal del último esquema de quimioterapia o terapia sistémica del periodo. Un valor fuera de catálogo no permite interpretar correctamente el manejo oncológico reportado.',
        recomendacion: 'Corrija V61 usando uno de los códigos permitidos del catálogo mostrado, según la historia clínica.',
        valor: v61Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, 'Valor fuera del catálogo permitido para V61.')
        ]
      }));
    }

    if (v45 === '98' && v61 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V61-ERROR-003',
        variable: 'V61',
        titulo: 'V45 indica que no tuvo terapia sistémica, pero V61 no está en 98',
        mensaje:
          `V45 tiene el valor 98, lo que indica que no recibió quimioterapia ni otra terapia sistémica en el periodo. V61 registra la ubicación temporal del último esquema de quimioterapia o terapia sistémica. Por eso, si V45=98, V61 debe ser 98. Actualmente V61 tiene el valor ${texto(v61Original)}.`,
        regla: 'Si V45=98, V61 debe ser 98 porque no aplica registrar ubicación temporal de último esquema cuando no hubo quimioterapia ni otra terapia sistémica en el periodo.',
        recomendacion: 'Cambie V61 a 98. El código 98 significa: No aplica cuando en V45 seleccionó la opción 98.',
        valor: v61Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original))
        ]
      }));
    }

    if (v45 === '1' && v61 === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V61-ERROR-004',
        variable: 'V61',
        titulo: 'V45 indica que tuvo terapia sistémica, pero V61 está en 98',
        mensaje:
          'V45 tiene el valor 1, lo que indica que sí recibió quimioterapia u otra terapia sistémica en el periodo. V61 tiene el valor 98, que significa no aplica cuando V45=98. Por eso, si V45=1, V61 no debe ser 98; debe registrar una ubicación temporal del último esquema o 97 cuando solo recibió un esquema en el periodo.\n\n' +
          CATALOGO_V61_TEXTO,
        regla: 'Si V45=1, V61 debe registrar la ubicación temporal del último esquema con un valor del catálogo permitido, o registrar 97 si solo recibió un esquema en el periodo. V61=98 queda reservado para los casos en los que V45=98.',
        recomendacion: 'Cambie V61 por el valor que corresponda según la historia clínica. Use 97 si solo recibió un esquema en el periodo.',
        valor: v61Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original))
        ]
      }));
    }

    if (v45 === '1' && v61 === '97') {
      hallazgos.push(crearHallazgo({
        codigo: 'V61-ADVERTENCIA-001',
        variable: 'V61',
        severidad: 'advertencia',
        titulo: 'V61=97 requiere trazabilidad posterior con V62 a V73',
        mensaje: 'V61 tiene el valor 97, que aplica cuando el paciente solo recibió un esquema de quimioterapia o terapia sistémica en el periodo y V45=1. El instructivo también indica que, en ese escenario, se debe verificar que V62 a V73 registren No Aplica. Como V62 a V73 aún no están implementadas en el validador, esta revisión queda como trazabilidad pendiente y no se convierte en error.',
        regla: 'V61=97 es válido con V45=1 cuando solo recibió un esquema en el periodo. La verificación completa contra V62-V73 queda pendiente hasta que esas variables existan en el validador.',
        recomendacion: 'Confirme en la historia clínica que el paciente recibió un solo esquema en el periodo. Cuando se implementen V62 a V73, verifique que registren No Aplica según corresponda.',
        valor: v61Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original))
        ]
      }));
    }

    return hallazgos;
  }


  function validarV62(registro) {
    const hallazgos = [];

    const v45Original = registro?.V45;
    const v45 = normalizarCodigo(v45Original);

    const v61Original = registro?.V61;
    const v61 = normalizarCodigo(v61Original);

    const v62Original = registro?.V62;
    const v62 = texto(v62Original);
    const noAplica = '1845-01-01';

    if (estaVacio(v62Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V62-ERROR-001',
        variable: 'V62',
        titulo: 'V62 está vacía',
        mensaje: 'V62 está vacía. Esta variable debe registrar la fecha de inicio del último esquema de quimioterapia o terapia sistémica de este periodo de reporte, o 1845-01-01 cuando no aplica.',
        regla: 'El instructivo de V62 solicita registrar la fecha de inicio del último esquema en formato AAAA-MM-DD. Si solo se conoce año y mes, se registra el día 15. Si no aplica, se registra 1845-01-01.',
        recomendacion: 'Revise la historia clínica y registre la fecha de inicio del último esquema en formato AAAA-MM-DD. Si V61=97, V61=98 o V45=98, use 1845-01-01.',
        valor: v62Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V62', v62Original, 'La variable no tiene dato registrado.')
        ]
      }));

      return hallazgos;
    }

    if (!esFechaISO(v62Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V62-ERROR-002',
        variable: 'V62',
        titulo: 'V62 no tiene formato de fecha válido',
        mensaje: `V62 tiene el valor ${texto(v62Original)}, pero debe registrarse como fecha válida en formato AAAA-MM-DD. Si solo se conoce el año y el mes, el instructivo indica registrar el día 15.`,
        regla: 'V62 debe registrar la fecha de inicio del último esquema de quimioterapia o terapia sistémica en formato AAAA-MM-DD, o 1845-01-01 cuando no aplica.',
        recomendacion: 'Corrija V62 usando una fecha válida en formato AAAA-MM-DD. Ejemplo: 2024-03-15. Si no aplica, registre 1845-01-01.',
        valor: v62Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V62', v62Original, 'Formato inválido para fecha de inicio del último esquema.')
        ]
      }));

      return hallazgos;
    }

    if (v45 === '98' && v62 !== noAplica) {
      hallazgos.push(crearHallazgo({
        codigo: 'V62-ERROR-003',
        variable: 'V62',
        titulo: 'V45 indica que no tuvo terapia sistémica, pero V62 no está en No Aplica',
        mensaje: `V45 tiene el valor 98, lo que indica que no recibió quimioterapia ni otra terapia sistémica en el periodo. V62 registra la fecha de inicio del último esquema. Por eso, si V45=98, V62 debe ser 1845-01-01. Actualmente V62 tiene el valor ${texto(v62Original)}.`,
        regla: 'Si V45=98, no aplica registrar fecha de inicio de último esquema en V62; el valor esperado es 1845-01-01.',
        recomendacion: 'Cambie V62 a 1845-01-01.',
        valor: v62Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V62', v62Original, describirValorV62(v62Original))
        ]
      }));

      return hallazgos;
    }

    if (v61 === '98' && v62 !== noAplica) {
      hallazgos.push(crearHallazgo({
        codigo: 'V62-ERROR-004',
        variable: 'V62',
        titulo: 'V61 indica que no aplica último esquema, pero V62 no está en No Aplica',
        mensaje: `V61 tiene el valor 98, que significa No Aplica para la ubicación temporal del último esquema. V62 registra la fecha de inicio de ese último esquema. Por eso, si V61=98, V62 debe ser 1845-01-01. Actualmente V62 tiene el valor ${texto(v62Original)}.`,
        regla: 'Si V61=98, no aplica registrar fecha de inicio de último esquema en V62; el valor esperado es 1845-01-01.',
        recomendacion: 'Cambie V62 a 1845-01-01.',
        valor: v62Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V62', v62Original, describirValorV62(v62Original))
        ]
      }));

      return hallazgos;
    }

    if (v61 === '97' && v62 !== noAplica) {
      hallazgos.push(crearHallazgo({
        codigo: 'V62-ERROR-005',
        variable: 'V62',
        titulo: 'V61 indica que solo hubo un esquema, pero V62 trae fecha de último esquema',
        mensaje: `V61 tiene el valor 97. Ese valor significa que el paciente solo recibió un esquema de quimioterapia o terapia sistémica en el periodo. Por eso no se debe volver a registrar ese mismo tratamiento como “último esquema”. En este caso, V62 debe quedar en 1845-01-01, que significa No Aplica. Actualmente V62 tiene el valor ${texto(v62Original)}.`,
        regla: 'Cuando V61=97, el instructivo indica que solo hubo un esquema en el periodo. Por tanto, no aplica registrar una fecha de inicio para un último esquema adicional en V62.',
        recomendacion: 'Cambie V62 a 1845-01-01. Si al revisar la historia clínica encuentra que sí hubo otro esquema diferente, primero corrija V61 y luego registre en V62 la fecha de inicio de ese último esquema.',
        valor: v62Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V62', v62Original, `V62 trae ${texto(v62Original)}, pero con V61=97 debe quedar 1845-01-01 porque no aplica último esquema adicional.`)
        ]
      }));

      return hallazgos;
    }

    if (v61IndicaUltimoEsquemaReal(v61Original) && v62 === noAplica) {
      hallazgos.push(crearHallazgo({
        codigo: 'V62-ERROR-006',
        variable: 'V62',
        titulo: 'V61 indica último esquema real, pero V62 está en No Aplica',
        mensaje: `V61 tiene el valor ${texto(v61Original)}, lo que indica que sí se está reportando una ubicación temporal real del último esquema. V62 debe registrar la fecha de inicio de ese esquema. Actualmente V62 tiene 1845-01-01, que significa No Aplica.`,
        regla: 'Si V61 registra 1, 2, 3, 11, 12, 13 o 14, V62 debe registrar una fecha real válida en formato AAAA-MM-DD, no 1845-01-01.',
        recomendacion: 'Revise la historia clínica y registre en V62 la fecha de inicio del último esquema. Si solo conoce año y mes, use el día 15.',
        valor: v62Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V62', v62Original, describirValorV62(v62Original))
        ]
      }));
    }

    return hallazgos;
  }

  function validar(registro) {
    let hallazgos = [];

    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V61')) {
      hallazgos = hallazgos.concat(validarV61(registro));
    }

    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V62')) {
      hallazgos = hallazgos.concat(validarV62(registro));
    }

    return hallazgos;
  }

  window.CACModulo14 = {
    version: VERSION,
    validar,
    validarV61,
    validarV62
  };
})();
