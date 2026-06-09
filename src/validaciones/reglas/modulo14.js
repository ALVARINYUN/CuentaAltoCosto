(function () {
  'use strict';

  const VERSION = 'sprint-3h-v65-ips2-ultimo-esquema-01';

  const NO_APLICA_FECHA = '1845-01-01';

  const VALORES_REALES_V61 = ['1', '2', '3', '11', '12', '13', '14'];

  const CATALOGO_V61_TEXTO =
    'Catálogo permitido para V61:\n' +
    '1: Neoadyuvancia (manejo inicial prequirúrgico).\n' +
    '2: Tratamiento inicial curativo sin cirugía sugerida. Por ejemplo, puede ser una opción frecuente en leucemias, linfomas u otros cánceres en los que no se realizó cirugía.\n' +
    '3: Adyuvancia (manejo inicial postquirúrgico).\n' +
    '11: Manejo de progresión o recaída.\n' +
    '12: Manejo de enfermedad metastásica.\n' +
    '13: Cambio por toxicidad.\n' +
    '14: Manejo paliativo, sin manejo de recaída ni enfermedad metastásica.\n' +
    '97: Solo recibió un esquema de quimioterapia en este periodo y en V45 seleccionó la opción 1. El instructivo indica verificar que V62 a V73 registren No Aplica; esa validación se aplica progresivamente a medida que esas variables se implementan.\n' +
    '98: No aplica cuando en V45 seleccionó la opción 98.';

  const CATALOGO_V63_TEXTO =
    'Catálogo permitido para V63:\n' +
    '1: Una IPS suministra el último esquema.\n' +
    '2: Dos IPS suministran el último esquema.\n' +
    '98: No aplica.';


  const ORIENTACION_IPS_ORAL =
    'Para tratamientos orales, registre el código de habilitación de la IPS que prescribió el tratamiento, no el código del operador logístico que realiza la entrega.';

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
      V62: 'Fecha de inicio del último esquema de quimioterapia o terapia sistémica',
      V63: 'Número de IPS que suministran el último esquema',
      V64: 'Código de la IPS1 que suministra el último esquema',
      V65: 'Código de la IPS2 que suministra el último esquema'
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

  function describirValorV62(valor) {
    const codigo = normalizarCodigo(valor);

    if (!codigo) {
      return 'V62 está vacía.';
    }

    if (codigo === NO_APLICA_FECHA) {
      return 'V62=1845-01-01 significa No Aplica.';
    }

    return `V62 registra la fecha ${texto(valor)} como inicio del último esquema de quimioterapia o terapia sistémica.`;
  }

  function describirValorV63(valor) {
    const codigo = normalizarCodigo(valor);

    const descripciones = {
      '1': 'V63=1 significa que una IPS suministra el último esquema.',
      '2': 'V63=2 significa que dos IPS suministran el último esquema.',
      '98': 'V63=98 significa No aplica.'
    };

    if (descripciones[codigo]) {
      return descripciones[codigo];
    }

    if (!codigo) {
      return 'V63 está vacía.';
    }

    return `V63 tiene el valor ${codigo}.`;
  }


  function describirValorV64(valor) {
    const codigo = normalizarCodigo(valor);

    if (!codigo) {
      return 'V64 está vacía.';
    }

    if (codigo === '98') {
      return 'V64=98 significa No aplica.';
    }

    if (/^\d+$/.test(codigo)) {
      if (codigo.length === 12) {
        return `V64 tiene un código IPS de 12 dígitos: ${codigo}.`;
      }

      return `V64 tiene un código numérico de ${codigo.length} dígitos. El instructivo indica que el código de habilitación de IPS debe tener 12 dígitos, incluido el cero inicial.`;
    }

    return `V64 tiene el valor ${texto(valor)}.`;
  }

  function esCodigoIpsValido(valor) {
    return /^\d{12}$/.test(normalizarCodigo(valor));
  }

  function esNumerico(valor) {
    return /^\d+$/.test(normalizarCodigo(valor));
  }


  function describirValorV65(valor) {
    const codigo = normalizarCodigo(valor);

    if (!codigo) {
      return 'V65 está vacía.';
    }

    if (codigo === '98') {
      return 'V65=98 significa No aplica.';
    }

    if (/^\d+$/.test(codigo)) {
      if (codigo.length === 12) {
        return `V65 tiene un código IPS de 12 dígitos: ${codigo}.`;
      }

      return `V65 tiene un código numérico de ${codigo.length} dígitos. El instructivo indica que el código de habilitación de IPS debe tener 12 dígitos, incluido el cero inicial.`;
    }

    return `V65 tiene el valor ${texto(valor)}.`;
  }

  function esFechaIsoValida(valor) {
    const valorTexto = texto(valor);

    if (!/^\d{4}-\d{2}-\d{2}$/.test(valorTexto)) {
      return false;
    }

    const [yyyy, mm, dd] = valorTexto.split('-').map(Number);
    const fecha = new Date(Date.UTC(yyyy, mm - 1, dd));

    return fecha.getUTCFullYear() === yyyy &&
      fecha.getUTCMonth() === mm - 1 &&
      fecha.getUTCDate() === dd;
  }

  // ============================================================
  // VARIABLE 61 — Ubicación temporal del último esquema
  // ============================================================

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
        mensaje: 'V61 tiene el valor 97, que aplica cuando el paciente solo recibió un esquema de quimioterapia o terapia sistémica en el periodo y V45=1. El instructivo también indica que, en ese escenario, se debe verificar que V62 a V73 registren No Aplica. Como esas variables se implementan progresivamente, esta revisión queda como trazabilidad pendiente o se valida variable por variable cuando corresponda.',
        regla: 'V61=97 es válido con V45=1 cuando solo recibió un esquema en el periodo. La verificación completa contra V62-V73 se hace progresivamente a medida que esas variables existan en el validador.',
        recomendacion: 'Confirme en la historia clínica que el paciente recibió un solo esquema en el periodo. A medida que se implementen V62 a V73, verifique que registren No Aplica según corresponda.',
        valor: v61Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original))
        ]
      }));
    }

    return hallazgos;
  }

  // ============================================================
  // VARIABLE 62 — Fecha de inicio del último esquema
  // ============================================================

  function validarV62(registro) {
    const hallazgos = [];

    const v45Original = registro?.V45;
    const v45 = normalizarCodigo(v45Original);

    const v61Original = registro?.V61;
    const v61 = normalizarCodigo(v61Original);

    const v62Original = registro?.V62;
    const v62 = normalizarCodigo(v62Original);

    if (estaVacio(v62Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V62-ERROR-001',
        variable: 'V62',
        titulo: 'V62 está vacía',
        mensaje: 'V62 está vacía. Esta variable debe registrar la fecha de inicio del último esquema de quimioterapia o terapia sistémica, o 1845-01-01 cuando no aplica.',
        regla: 'El instructivo de V62 solicita registrar la fecha en formato AAAA-MM-DD. Si no aplica, debe registrarse 1845-01-01.',
        recomendacion: 'Revise la historia clínica y registre la fecha de inicio del último esquema. Si no aplica, registre 1845-01-01.',
        valor: v62Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V62', v62Original, 'La variable no tiene dato registrado.')
        ]
      }));

      return hallazgos;
    }

    if (!esFechaIsoValida(v62Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V62-ERROR-002',
        variable: 'V62',
        titulo: 'V62 no tiene formato de fecha válido',
        mensaje: `V62 tiene el valor ${texto(v62Original)}, pero debe registrarse como fecha válida en formato AAAA-MM-DD. Si solo conoce año y mes, registre el día 15. Si no aplica, registre 1845-01-01.`,
        regla: 'V62 debe tener formato AAAA-MM-DD. El instructivo permite usar día 15 cuando solo se conoce año y mes.',
        recomendacion: 'Corrija V62 usando formato AAAA-MM-DD. Ejemplo: 2024-03-15. Si no aplica, registre 1845-01-01.',
        valor: v62Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V62', v62Original, 'Formato de fecha inválido para V62.')
        ]
      }));

      return hallazgos;
    }

    if (v45 === '98' && v62 !== NO_APLICA_FECHA) {
      hallazgos.push(crearHallazgo({
        codigo: 'V62-ERROR-003',
        variable: 'V62',
        titulo: 'V45 indica que no tuvo terapia sistémica, pero V62 no está en No Aplica',
        mensaje: `V45 tiene el valor 98, lo que indica que no recibió quimioterapia ni otra terapia sistémica en el periodo. Por eso no aplica registrar fecha de inicio del último esquema. V62 debe ser 1845-01-01. Actualmente V62 tiene el valor ${texto(v62Original)}.`,
        regla: 'Si V45=98, V62 debe registrar 1845-01-01 porque no aplica fecha de inicio de último esquema.',
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

    if (v61 === '98' && v62 !== NO_APLICA_FECHA) {
      hallazgos.push(crearHallazgo({
        codigo: 'V62-ERROR-004',
        variable: 'V62',
        titulo: 'V61 indica que no aplica último esquema, pero V62 trae fecha',
        mensaje: `V61 tiene el valor 98, que significa No aplica para último esquema. Por eso V62 debe registrar 1845-01-01. Actualmente V62 tiene el valor ${texto(v62Original)}.`,
        regla: 'Si V61=98, V62 debe registrar 1845-01-01 porque no aplica fecha de inicio del último esquema.',
        recomendacion: 'Cambie V62 a 1845-01-01. Si sí hubo último esquema, corrija primero V61.',
        valor: v62Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V62', v62Original, describirValorV62(v62Original))
        ]
      }));

      return hallazgos;
    }

    if (v61 === '97' && v62 !== NO_APLICA_FECHA) {
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

    if (VALORES_REALES_V61.includes(v61) && v62 === NO_APLICA_FECHA) {
      hallazgos.push(crearHallazgo({
        codigo: 'V62-ERROR-006',
        variable: 'V62',
        titulo: 'V61 reporta último esquema real, pero V62 está en No Aplica',
        mensaje: `V61 tiene el valor ${texto(v61Original)}, que reporta una ubicación temporal real del último esquema. Por eso V62 debe registrar una fecha real de inicio del último esquema, no 1845-01-01.`,
        regla: 'Si V61 registra 1, 2, 3, 11, 12, 13 o 14, V62 debe registrar una fecha válida de inicio del último esquema.',
        recomendacion: 'Registre en V62 la fecha de inicio del último esquema en formato AAAA-MM-DD. Si solo conoce año y mes, use día 15.',
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

  // ============================================================
  // VARIABLE 63 — Número de IPS que suministran el último esquema
  // ============================================================

  function validarV63(registro) {
    const hallazgos = [];

    const v45Original = registro?.V45;
    const v45 = normalizarCodigo(v45Original);

    const v61Original = registro?.V61;
    const v61 = normalizarCodigo(v61Original);

    const v63Original = registro?.V63;
    const v63 = normalizarCodigo(v63Original);

    if (estaVacio(v63Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V63-ERROR-001',
        variable: 'V63',
        titulo: 'V63 está vacía',
        mensaje:
          'V63 está vacía. Esta variable debe registrar cuántas IPS suministran el último esquema de quimioterapia o terapia sistémica, o 98 cuando no aplica.\n\n' +
          CATALOGO_V63_TEXTO,
        regla: 'El instructivo de V63 solicita registrar el número de Instituciones Prestadoras de Servicios de Salud que suministran el último esquema. Si no aplica, debe registrarse 98.',
        recomendacion: 'Revise la historia clínica y registre 1, 2 o 98 según corresponda.',
        valor: v63Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V63', v63Original, 'La variable no tiene dato registrado.')
        ]
      }));

      return hallazgos;
    }

    const valoresPermitidos = ['1', '2', '98'];

    if (!valoresPermitidos.includes(v63)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V63-ERROR-002',
        variable: 'V63',
        titulo: 'V63 tiene un valor fuera del catálogo permitido',
        mensaje:
          `V63 tiene el valor ${texto(v63Original)}, pero esta variable solo permite 1, 2 o 98. Como el instructivo solo trae IPS1 e IPS2 para el último esquema, no se aceptan valores mayores a 2.\n\n` +
          CATALOGO_V63_TEXTO,
        regla: 'V63 registra el número de IPS que suministran el último esquema. El instructivo solo permite documentar IPS1 e IPS2 en V64 y V65; por eso V63 se maneja como catálogo cerrado: 1, 2 o 98.',
        recomendacion: 'Corrija V63 usando 1 si una IPS suministró el último esquema, 2 si fueron dos IPS, o 98 si no aplica.',
        valor: v63Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V63', v63Original, 'Valor fuera del catálogo permitido para V63.')
        ]
      }));

      return hallazgos;
    }

    if (v45 === '98' && v63 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V63-ERROR-003',
        variable: 'V63',
        titulo: 'V45 indica que no tuvo terapia sistémica, pero V63 no está en 98',
        mensaje: `V45 tiene el valor 98, lo que indica que no recibió quimioterapia ni otra terapia sistémica en el periodo. Por eso no aplica registrar número de IPS del último esquema. V63 debe ser 98. Actualmente V63 tiene el valor ${texto(v63Original)}.`,
        regla: 'Si V45=98, V63 debe registrar 98 porque no aplica número de IPS para un último esquema.',
        recomendacion: 'Cambie V63 a 98.',
        valor: v63Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V63', v63Original, describirValorV63(v63Original))
        ]
      }));

      return hallazgos;
    }

    if (v61 === '98' && v63 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V63-ERROR-004',
        variable: 'V63',
        titulo: 'V61 indica que no aplica último esquema, pero V63 trae número de IPS',
        mensaje: `V61 tiene el valor 98, que significa No aplica para último esquema. Por eso V63 debe registrar 98. Actualmente V63 tiene el valor ${texto(v63Original)}.`,
        regla: 'Si V61=98, V63 debe registrar 98 porque no aplica número de IPS del último esquema.',
        recomendacion: 'Cambie V63 a 98. Si sí hubo último esquema, corrija primero V61.',
        valor: v63Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V63', v63Original, describirValorV63(v63Original))
        ]
      }));

      return hallazgos;
    }

    if (v61 === '97' && v63 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V63-ERROR-005',
        variable: 'V63',
        titulo: 'V61 indica que solo hubo un esquema, pero V63 trae número de IPS',
        mensaje: `V61 tiene el valor 97. Ese valor significa que el paciente solo recibió un esquema de quimioterapia o terapia sistémica en el periodo. Por eso no se debe volver a registrar ese mismo tratamiento como “último esquema”. En este caso, V63 debe quedar en 98, que significa No aplica. Actualmente V63 tiene el valor ${texto(v63Original)}.`,
        regla: 'Cuando V61=97, no aplica reportar IPS para un último esquema adicional, porque el instructivo indica que solo hubo un esquema en el periodo.',
        recomendacion: 'Cambie V63 a 98. Si al revisar la historia clínica encuentra que sí hubo otro esquema diferente, primero corrija V61 y luego registre en V63 cuántas IPS suministraron ese último esquema.',
        valor: v63Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V63', v63Original, `V63 trae ${texto(v63Original)}, pero con V61=97 debe quedar 98 porque no aplica número de IPS para un último esquema adicional.`)
        ]
      }));

      return hallazgos;
    }

    if (VALORES_REALES_V61.includes(v61) && v63 === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V63-ERROR-006',
        variable: 'V63',
        titulo: 'V61 reporta último esquema real, pero V63 está en 98',
        mensaje: `V61 tiene el valor ${texto(v61Original)}, que reporta una ubicación temporal real del último esquema. Por eso V63 debe indicar cuántas IPS suministran ese último esquema. Actualmente V63 está en 98, que significa No aplica.`,
        regla: 'Si V61 registra 1, 2, 3, 11, 12, 13 o 14, V63 debe registrar 1 o 2 según el número de IPS que suministran el último esquema.',
        recomendacion: 'Cambie V63 a 1 si una IPS suministró el último esquema, o a 2 si fueron dos IPS. Cuando se implementen V64 y V65, se verificará que los códigos IPS correspondan con este número.',
        valor: v63Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V63', v63Original, describirValorV63(v63Original))
        ]
      }));
    }

    return hallazgos;
  }


  // ============================================================
  // VARIABLE 64 — Código IPS1 que suministra el último esquema
  // ============================================================

  function validarV64(registro) {
    const hallazgos = [];

    const v45Original = registro?.V45;
    const v45 = normalizarCodigo(v45Original);

    const v61Original = registro?.V61;
    const v61 = normalizarCodigo(v61Original);

    const v63Original = registro?.V63;
    const v63 = normalizarCodigo(v63Original);

    const v64Original = registro?.V64;
    const v64 = normalizarCodigo(v64Original);

    if (estaVacio(v64Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V64-ERROR-001',
        variable: 'V64',
        titulo: 'V64 está vacía',
        mensaje: 'V64 está vacía. Esta variable debe registrar el código de habilitación de la IPS1 que suministra el último esquema, o 98 cuando no aplica.',
        regla: 'El instructivo de V64 solicita registrar el código de habilitación de la IPS1 que suministra el último esquema. El código debe tener 12 dígitos, incluido el cero inicial. Si no aplica, debe registrarse 98.',
        recomendacion: `Revise la historia clínica y registre el código de habilitación de la IPS1. ${ORIENTACION_IPS_ORAL}`,
        valor: v64Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V63', v63Original, describirValorV63(v63Original)),
          dato('V64', v64Original, 'La variable no tiene dato registrado.')
        ]
      }));

      return hallazgos;
    }

    if (v64 !== '98' && !esNumerico(v64Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V64-ERROR-002',
        variable: 'V64',
        titulo: 'V64 tiene un valor no numérico',
        mensaje: `V64 tiene el valor ${texto(v64Original)}, pero debe registrar un código de habilitación de IPS de 12 dígitos o 98 cuando no aplica.`,
        regla: 'V64 solo permite un código numérico de habilitación de IPS o 98 cuando no aplica.',
        recomendacion: `Corrija V64. Registre un código IPS de 12 dígitos o 98 si no aplica. ${ORIENTACION_IPS_ORAL}`,
        valor: v64Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V63', v63Original, describirValorV63(v63Original)),
          dato('V64', v64Original, 'Valor no numérico para código de habilitación IPS.')
        ]
      }));

      return hallazgos;
    }

    if (v64 !== '98' && esNumerico(v64Original) && !esCodigoIpsValido(v64Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V64-ADVERTENCIA-001',
        variable: 'V64',
        severidad: 'advertencia',
        titulo: 'V64 tiene longitud diferente a 12 dígitos',
        mensaje: `V64 tiene el valor ${texto(v64Original)}. El código de habilitación de IPS debe tener 12 dígitos, incluido el cero inicial. Actualmente tiene ${normalizarCodigo(v64Original).length} dígitos.`,
        regla: 'El instructivo de V64 indica que el código de habilitación de IPS debe tener 12 dígitos. Se deja como advertencia fuerte, siguiendo el criterio usado previamente para códigos IPS.',
        recomendacion: `Verifique el código de habilitación en REPS y registre los 12 dígitos completos, incluido el cero inicial si aplica. ${ORIENTACION_IPS_ORAL}`,
        valor: v64Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V63', v63Original, describirValorV63(v63Original)),
          dato('V64', v64Original, describirValorV64(v64Original))
        ]
      }));
    }

    if (v45 === '98' && v64 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V64-ERROR-003',
        variable: 'V64',
        titulo: 'V45 indica que no tuvo terapia sistémica, pero V64 no está en 98',
        mensaje: `V45 tiene el valor 98, lo que indica que no recibió quimioterapia ni otra terapia sistémica en el periodo. Por eso no aplica registrar IPS1 del último esquema. V64 debe ser 98. Actualmente V64 tiene el valor ${texto(v64Original)}.`,
        regla: 'Si V45=98, V64 debe registrar 98 porque no aplica IPS1 del último esquema.',
        recomendacion: 'Cambie V64 a 98.',
        valor: v64Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V63', v63Original, describirValorV63(v63Original)),
          dato('V64', v64Original, describirValorV64(v64Original))
        ]
      }));

      return hallazgos;
    }

    if (v61 === '98' && v64 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V64-ERROR-004',
        variable: 'V64',
        titulo: 'V61 indica que no aplica último esquema, pero V64 trae IPS1',
        mensaje: `V61 tiene el valor 98, que significa No aplica para último esquema. Por eso V64 debe registrar 98. Actualmente V64 tiene el valor ${texto(v64Original)}.`,
        regla: 'Si V61=98, V64 debe registrar 98 porque no aplica IPS1 del último esquema.',
        recomendacion: 'Cambie V64 a 98. Si sí hubo último esquema, corrija primero V61.',
        valor: v64Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V63', v63Original, describirValorV63(v63Original)),
          dato('V64', v64Original, describirValorV64(v64Original))
        ]
      }));

      return hallazgos;
    }

    if (v61 === '97' && v64 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V64-ERROR-005',
        variable: 'V64',
        titulo: 'V61 indica que solo hubo un esquema, pero V64 trae IPS1',
        mensaje: `V61 tiene el valor 97. Ese valor significa que el paciente solo recibió un esquema de quimioterapia o terapia sistémica en el periodo. Por eso no se debe volver a registrar ese mismo tratamiento como “último esquema”. En este caso, V64 debe quedar en 98, que significa No aplica. Actualmente V64 tiene el valor ${texto(v64Original)}.`,
        regla: 'Cuando V61=97, no aplica reportar IPS1 para un último esquema adicional, porque el instructivo indica que solo hubo un esquema en el periodo.',
        recomendacion: 'Cambie V64 a 98. Si al revisar la historia clínica encuentra que sí hubo otro esquema diferente, primero corrija V61 y luego registre en V64 el código de la IPS1.',
        valor: v64Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V63', v63Original, describirValorV63(v63Original)),
          dato('V64', v64Original, `V64 trae ${texto(v64Original)}, pero con V61=97 debe quedar 98 porque no aplica IPS1 para un último esquema adicional.`)
        ]
      }));

      return hallazgos;
    }

    if ((v63 === '1' || v63 === '2') && v64 === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V64-ERROR-006',
        variable: 'V64',
        titulo: 'V63 indica que hay IPS del último esquema, pero V64 está en 98',
        mensaje: `V63 tiene el valor ${texto(v63Original)}, lo que indica que ${v63 === '1' ? 'una IPS suministra' : 'dos IPS suministran'} el último esquema. Por eso V64 debe registrar el código de habilitación de la IPS1. Actualmente V64 tiene el valor 98, que significa No aplica.`,
        regla: 'Si V63=1 o V63=2, V64 debe registrar el código de habilitación de la IPS1 que suministra o prescribe el último esquema.',
        recomendacion: `Registre en V64 el código de habilitación de 12 dígitos de la IPS1. ${ORIENTACION_IPS_ORAL}`,
        valor: v64Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V63', v63Original, describirValorV63(v63Original)),
          dato('V64', v64Original, describirValorV64(v64Original))
        ]
      }));

      return hallazgos;
    }

    if (v63 === '98' && v64 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V64-ERROR-007',
        variable: 'V64',
        titulo: 'V63 indica que no aplica número de IPS, pero V64 trae IPS1',
        mensaje: `V63 tiene el valor 98, que significa No aplica para el número de IPS del último esquema. Por eso V64 también debe registrar 98. Actualmente V64 tiene el valor ${texto(v64Original)}.`,
        regla: 'Si V63=98, V64 debe registrar 98 porque no aplica IPS1 del último esquema.',
        recomendacion: 'Cambie V64 a 98. Si sí existe una IPS del último esquema, corrija primero V63 y luego registre V64.',
        valor: v64Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V63', v63Original, describirValorV63(v63Original)),
          dato('V64', v64Original, describirValorV64(v64Original))
        ]
      }));
    }

    return hallazgos;
  }


  // ============================================================
  // VARIABLE 65 — Código IPS2 que suministra el último esquema
  // ============================================================

  function validarV65(registro) {
    const hallazgos = [];

    const v45Original = registro?.V45;
    const v45 = normalizarCodigo(v45Original);

    const v61Original = registro?.V61;
    const v61 = normalizarCodigo(v61Original);

    const v63Original = registro?.V63;
    const v63 = normalizarCodigo(v63Original);

    const v65Original = registro?.V65;
    const v65 = normalizarCodigo(v65Original);

    if (estaVacio(v65Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V65-ERROR-001',
        variable: 'V65',
        titulo: 'V65 está vacía',
        mensaje: 'V65 está vacía. Esta variable debe registrar el código de habilitación de la IPS2 que suministra el último esquema, o 98 cuando no aplica.',
        regla: 'El instructivo de V65 solicita registrar el código de habilitación de la IPS2 que suministra el último esquema. El código debe tener 12 dígitos, incluido el cero inicial. Si no aplica, debe registrarse 98.',
        recomendacion: `Revise la historia clínica y registre el código de habilitación de la IPS2. ${ORIENTACION_IPS_ORAL}`,
        valor: v65Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V63', v63Original, describirValorV63(v63Original)),
          dato('V65', v65Original, 'La variable no tiene dato registrado.')
        ]
      }));

      return hallazgos;
    }

    if (v65 !== '98' && !esNumerico(v65Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V65-ERROR-002',
        variable: 'V65',
        titulo: 'V65 tiene un valor no numérico',
        mensaje: `V65 tiene el valor ${texto(v65Original)}, pero debe registrar un código de habilitación de IPS de 12 dígitos o 98 cuando no aplica.`,
        regla: 'V65 solo permite un código numérico de habilitación de IPS o 98 cuando no aplica.',
        recomendacion: `Corrija V65. Registre un código IPS de 12 dígitos o 98 si no aplica. ${ORIENTACION_IPS_ORAL}`,
        valor: v65Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V63', v63Original, describirValorV63(v63Original)),
          dato('V65', v65Original, 'Valor no numérico para código de habilitación IPS.')
        ]
      }));

      return hallazgos;
    }

    if (v65 !== '98' && esNumerico(v65Original) && !esCodigoIpsValido(v65Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V65-ADVERTENCIA-001',
        variable: 'V65',
        severidad: 'advertencia',
        titulo: 'V65 tiene longitud diferente a 12 dígitos',
        mensaje: `V65 tiene el valor ${texto(v65Original)}. El código de habilitación de IPS debe tener 12 dígitos, incluido el cero inicial. Actualmente tiene ${normalizarCodigo(v65Original).length} dígitos.`,
        regla: 'El instructivo de V65 indica que el código de habilitación de IPS debe tener 12 dígitos. Se deja como advertencia fuerte, siguiendo el criterio usado previamente para códigos IPS.',
        recomendacion: `Verifique el código de habilitación en REPS y registre los 12 dígitos completos, incluido el cero inicial si aplica. ${ORIENTACION_IPS_ORAL}`,
        valor: v65Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V63', v63Original, describirValorV63(v63Original)),
          dato('V65', v65Original, describirValorV65(v65Original))
        ]
      }));
    }

    if (v45 === '98' && v65 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V65-ERROR-003',
        variable: 'V65',
        titulo: 'V45 indica que no tuvo terapia sistémica, pero V65 no está en 98',
        mensaje: `V45 tiene el valor 98, lo que indica que no recibió quimioterapia ni otra terapia sistémica en el periodo. Por eso no aplica registrar IPS2 del último esquema. V65 debe ser 98. Actualmente V65 tiene el valor ${texto(v65Original)}.`,
        regla: 'Si V45=98, V65 debe registrar 98 porque no aplica IPS2 del último esquema.',
        recomendacion: 'Cambie V65 a 98.',
        valor: v65Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V63', v63Original, describirValorV63(v63Original)),
          dato('V65', v65Original, describirValorV65(v65Original))
        ]
      }));

      return hallazgos;
    }

    if (v61 === '98' && v65 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V65-ERROR-004',
        variable: 'V65',
        titulo: 'V61 indica que no aplica último esquema, pero V65 trae IPS2',
        mensaje: `V61 tiene el valor 98, que significa No aplica para último esquema. Por eso V65 debe registrar 98. Actualmente V65 tiene el valor ${texto(v65Original)}.`,
        regla: 'Si V61=98, V65 debe registrar 98 porque no aplica IPS2 del último esquema.',
        recomendacion: 'Cambie V65 a 98. Si sí hubo último esquema, corrija primero V61.',
        valor: v65Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V63', v63Original, describirValorV63(v63Original)),
          dato('V65', v65Original, describirValorV65(v65Original))
        ]
      }));

      return hallazgos;
    }

    if (v61 === '97' && v65 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V65-ERROR-005',
        variable: 'V65',
        titulo: 'V61 indica que solo hubo un esquema, pero V65 trae IPS2',
        mensaje: `V61 tiene el valor 97. Ese valor significa que el paciente solo recibió un esquema de quimioterapia o terapia sistémica en el periodo. Por eso no se debe volver a registrar ese mismo tratamiento como “último esquema”. En este caso, V65 debe quedar en 98, que significa No aplica. Actualmente V65 tiene el valor ${texto(v65Original)}.`,
        regla: 'Cuando V61=97, no aplica reportar IPS2 para un último esquema adicional, porque el instructivo indica que solo hubo un esquema en el periodo.',
        recomendacion: 'Cambie V65 a 98. Si al revisar la historia clínica encuentra que sí hubo otro esquema diferente, primero corrija V61 y luego registre en V65 el código de la IPS2 si realmente hubo dos IPS.',
        valor: v65Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V63', v63Original, describirValorV63(v63Original)),
          dato('V65', v65Original, `V65 trae ${texto(v65Original)}, pero con V61=97 debe quedar 98 porque no aplica IPS2 para un último esquema adicional.`)
        ]
      }));

      return hallazgos;
    }

    if (v63 === '1' && v65 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V65-ERROR-006',
        variable: 'V65',
        titulo: 'V63 indica una sola IPS, pero V65 trae IPS2',
        mensaje: `V63 tiene el valor 1, lo que indica que solo una IPS suministra el último esquema. Por eso V65 debe registrar 98. Actualmente V65 tiene el valor ${texto(v65Original)}.`,
        regla: 'Si V63=1, solo se debe registrar IPS1 en V64. V65 debe ser 98 porque no aplica una segunda IPS.',
        recomendacion: 'Cambie V65 a 98. Si al revisar la historia clínica encuentra que realmente fueron dos IPS, primero corrija V63 a 2 y luego registre en V65 el código de la IPS2.',
        valor: v65Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V63', v63Original, describirValorV63(v63Original)),
          dato('V65', v65Original, describirValorV65(v65Original))
        ]
      }));

      return hallazgos;
    }

    if (v63 === '2' && v65 === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V65-ERROR-007',
        variable: 'V65',
        titulo: 'V63 indica dos IPS, pero V65 está en 98',
        mensaje: 'V63 tiene el valor 2, lo que indica que dos IPS suministran el último esquema. Por eso V65 debe registrar el código de habilitación de la IPS2. Actualmente V65 tiene el valor 98, que significa No aplica.',
        regla: 'Si V63=2, V65 debe registrar el código de habilitación de la IPS2 que suministra o prescribe el último esquema.',
        recomendacion: `Registre en V65 el código de habilitación de 12 dígitos de la IPS2. ${ORIENTACION_IPS_ORAL}`,
        valor: v65Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V63', v63Original, describirValorV63(v63Original)),
          dato('V65', v65Original, describirValorV65(v65Original))
        ]
      }));

      return hallazgos;
    }

    if (v63 === '98' && v65 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V65-ERROR-008',
        variable: 'V65',
        titulo: 'V63 indica que no aplica número de IPS, pero V65 trae IPS2',
        mensaje: `V63 tiene el valor 98, que significa No aplica para el número de IPS del último esquema. Por eso V65 también debe registrar 98. Actualmente V65 tiene el valor ${texto(v65Original)}.`,
        regla: 'Si V63=98, V65 debe registrar 98 porque no aplica IPS2 del último esquema.',
        recomendacion: 'Cambie V65 a 98. Si sí existe una segunda IPS del último esquema, corrija primero V63 y luego registre V65.',
        valor: v65Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V63', v63Original, describirValorV63(v63Original)),
          dato('V65', v65Original, describirValorV65(v65Original))
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

    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V63')) {
      hallazgos = hallazgos.concat(validarV63(registro));
    }

    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V64')) {
      hallazgos = hallazgos.concat(validarV64(registro));
    }

    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V65')) {
      hallazgos = hallazgos.concat(validarV65(registro));
    }

    return hallazgos;
  }

  window.CACModulo14 = {
    version: VERSION,
    validar,
    validarV61,
    validarV62,
    validarV63,
    validarV64,
    validarV65
  };
})();
