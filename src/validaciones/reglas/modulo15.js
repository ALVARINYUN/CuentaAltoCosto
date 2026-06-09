(function () {
  'use strict';

  const VERSION = 'sprint-3h-v66-modulo15-medicamentos-ultimo-esquema-02-encabezado-real';

  const VALORES_REALES_V61 = ['1', '2', '3', '11', '12', '13', '14'];

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

  function esEnteroPositivo(valor) {
    const codigo = normalizarCodigo(valor);
    return /^\d+$/.test(codigo) && Number(codigo) >= 1;
  }

  function nombreVariable(variable) {
    const nombres = {
      V45: 'Recibió quimioterapia u otra terapia sistémica',
      V61: 'Ubicación temporal del último esquema de terapia sistémica del periodo',
      V66: 'Número de medicamentos antineoplásicos o terapia hormonal propuestos en el último esquema'
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
      '2': 'V61=2 significa tratamiento inicial curativo sin cirugía sugerida.',
      '3': 'V61=3 significa adyuvancia: manejo inicial postquirúrgico.',
      '11': 'V61=11 significa manejo de progresión o recaída.',
      '12': 'V61=12 significa manejo de enfermedad metastásica.',
      '13': 'V61=13 significa cambio por toxicidad.',
      '14': 'V61=14 significa manejo paliativo.',
      '97': 'V61=97 significa que solo recibió un esquema de quimioterapia o terapia sistémica en este periodo y V45=1.',
      '98': 'V61=98 significa No aplica para último esquema.'
    };

    if (descripciones[codigo]) {
      return descripciones[codigo];
    }

    if (!codigo) {
      return 'V61 está vacía.';
    }

    return `V61 tiene el valor ${codigo}.`;
  }

  function describirValorV66(valor) {
    const codigo = normalizarCodigo(valor);

    if (!codigo) {
      return 'V66 está vacía.';
    }

    if (codigo === '98') {
      return 'V66=98 significa No aplica.';
    }

    if (/^\d+$/.test(codigo)) {
      return `V66 registra ${codigo} medicamento(s) antineoplásico(s) o terapia hormonal propuestos para el último esquema.`;
    }

    return `V66 tiene el valor ${texto(valor)}.`;
  }

  // ============================================================
  // VARIABLE 66 — Número de medicamentos propuestos en el último esquema
  // ============================================================

  function validarV66(registro) {
    const hallazgos = [];

    const v45Original = registro?.V45;
    const v45 = normalizarCodigo(v45Original);

    const v61Original = registro?.V61;
    const v61 = normalizarCodigo(v61Original);

    const v66Original = registro?.V66;
    const v66 = normalizarCodigo(v66Original);

    if (estaVacio(v66Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V66-ERROR-001',
        variable: 'V66',
        titulo: 'V66 está vacía',
        mensaje: 'V66 está vacía. Esta variable debe registrar cuántos medicamentos antineoplásicos o terapia hormonal fueron propuestos para el último esquema de quimioterapia o terapia sistémica, o 98 cuando no aplica.',
        regla: 'El instructivo de V66 solicita registrar el número total de medicamentos antineoplásicos o terapia hormonal propuestos para el último esquema. Si no aplica, debe registrarse 98.',
        recomendacion: 'Revise la historia clínica y registre un número entero positivo. Use 98 si no recibió último esquema o si V45=98.',
        valor: v66Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V66', v66Original, 'La variable no tiene dato registrado.')
        ]
      }));

      return hallazgos;
    }

    if (v66 !== '98' && !/^\d+$/.test(v66)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V66-ERROR-002',
        variable: 'V66',
        titulo: 'V66 tiene un valor no numérico',
        mensaje: `V66 tiene el valor ${texto(v66Original)}, pero debe registrar un número entero positivo de medicamentos propuestos o 98 cuando no aplica.`,
        regla: 'V66 solo permite un número entero positivo o 98 cuando no aplica.',
        recomendacion: 'Corrija V66. Registre el número de medicamentos antineoplásicos propuestos o 98 si no aplica.',
        valor: v66Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V66', v66Original, 'Valor no numérico para número de medicamentos propuestos.')
        ]
      }));

      return hallazgos;
    }

    if (v45 === '98' && v66 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V66-ERROR-003',
        variable: 'V66',
        titulo: 'V45 indica que no tuvo terapia sistémica, pero V66 no está en 98',
        mensaje: `V45 tiene el valor 98, lo que indica que no recibió quimioterapia ni otra terapia sistémica en el periodo. Por eso no aplica registrar medicamentos propuestos para el último esquema. V66 debe ser 98. Actualmente V66 tiene el valor ${texto(v66Original)}.`,
        regla: 'Si V45=98, V66 debe registrar 98 porque no aplica número de medicamentos del último esquema.',
        recomendacion: 'Cambie V66 a 98.',
        valor: v66Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V66', v66Original, describirValorV66(v66Original))
        ]
      }));

      return hallazgos;
    }

    if (v61 === '98' && v66 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V66-ERROR-004',
        variable: 'V66',
        titulo: 'V61 indica que no aplica último esquema, pero V66 trae número de medicamentos',
        mensaje: `V61 tiene el valor 98, que significa No aplica para último esquema. Por eso V66 debe registrar 98. Actualmente V66 tiene el valor ${texto(v66Original)}.`,
        regla: 'Si V61=98, V66 debe registrar 98 porque no aplica número de medicamentos propuestos del último esquema.',
        recomendacion: 'Cambie V66 a 98. Si sí hubo último esquema, corrija primero V61.',
        valor: v66Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V66', v66Original, describirValorV66(v66Original))
        ]
      }));

      return hallazgos;
    }

    if (v61 === '97' && v66 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V66-ERROR-005',
        variable: 'V66',
        titulo: 'V61 indica que solo hubo un esquema, pero V66 trae medicamentos del último esquema',
        mensaje: `V61 tiene el valor 97. Ese valor significa que el paciente solo recibió un esquema de quimioterapia o terapia sistémica en el periodo y no se debe capturar nuevamente como último esquema. En este caso, V66 debe quedar en 98. Actualmente V66 tiene el valor ${texto(v66Original)}.`,
        regla: 'Cuando V61=97, no aplica registrar medicamentos propuestos para un último esquema adicional.',
        recomendacion: 'Cambie V66 a 98. Si al revisar la historia clínica encuentra que sí hubo otro esquema diferente, primero corrija V61 y luego registre en V66 el número de medicamentos propuestos.',
        valor: v66Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V66', v66Original, `V66 trae ${texto(v66Original)}, pero con V61=97 debe quedar 98 porque no aplica último esquema adicional.`)
        ]
      }));

      return hallazgos;
    }

    if (VALORES_REALES_V61.includes(v61) && v66 === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V66-ERROR-006',
        variable: 'V66',
        titulo: 'V61 reporta último esquema real, pero V66 está en 98',
        mensaje: `V61 tiene el valor ${texto(v61Original)}, que reporta una ubicación temporal real del último esquema. Por eso V66 debe registrar el número de medicamentos antineoplásicos o terapia hormonal propuestos para ese último esquema. Actualmente V66 está en 98.`,
        regla: 'Si V61 registra 1, 2, 3, 11, 12, 13 o 14, V66 debe registrar un número entero positivo de medicamentos propuestos.',
        recomendacion: 'Registre en V66 el número de medicamentos antineoplásicos o terapia hormonal propuestos para el último esquema.',
        valor: v66Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V66', v66Original, describirValorV66(v66Original))
        ]
      }));

      return hallazgos;
    }

    if (v66 !== '98' && !esEnteroPositivo(v66Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V66-ERROR-007',
        variable: 'V66',
        titulo: 'V66 debe ser un entero positivo cuando aplica',
        mensaje: `V66 tiene el valor ${texto(v66Original)}. Cuando existe último esquema, debe registrar un número entero positivo de medicamentos propuestos.`,
        regla: 'Si V66 no es 98, debe ser un entero positivo mayor o igual a 1.',
        recomendacion: 'Corrija V66. Registre un número entero positivo o 98 si no aplica.',
        valor: v66Original,
        datosRelacionados: [
          dato('V45', v45Original, describirValorV45(v45Original)),
          dato('V61', v61Original, describirValorV61(v61Original)),
          dato('V66', v66Original, describirValorV66(v66Original))
        ]
      }));
    }

    return hallazgos;
  }

  function validar(registro) {
    let hallazgos = [];

    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V66')) {
      hallazgos = hallazgos.concat(validarV66(registro));
    }

    return hallazgos;
  }

  window.CACModulo15 = {
    version: VERSION,
    validar,
    validarV66
  };
})();
