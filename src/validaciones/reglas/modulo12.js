(function () {
  'use strict';

  const VERSION = 'sprint-3f-v56-medicamento-adicional3-01';

  const VARIABLES_MEDICAMENTOS_BASE = [
    'V53_1', 'V53_2', 'V53_3', 'V53_4', 'V53_5',
    'V53_6', 'V53_7', 'V53_8', 'V53_9'
  ];

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

  function esComodin(valor) {
    const codigo = normalizarCodigo(valor);
    return codigo === '97' || codigo === '98';
  }

  function pareceCodigoATC(valor) {
    const codigo = normalizarCodigo(valor);

    if (!codigo || esComodin(codigo)) {
      return false;
    }

    return /^[A-Z][0-9]{2}[A-Z0-9]{0,5}$/.test(codigo);
  }

  function obtenerValorCampoPosible(objeto, campos) {
    if (!objeto || typeof objeto !== 'object') {
      return '';
    }

    for (const campo of campos) {
      if (objeto[campo] !== undefined && objeto[campo] !== null) {
        return objeto[campo];
      }
    }

    return '';
  }

  function resultadoTieneCodigoATCExacto(resultado, codigoBuscado) {
    const camposCodigo = [
      'codigo', 'codigoATC', 'codigo_atc', 'atc', 'id', 'value', 'valor',
      'Código', 'CODIGO', 'ATC'
    ];

    const valorDirecto = obtenerValorCampoPosible(resultado, camposCodigo);

    if (normalizarCodigo(valorDirecto) === codigoBuscado) {
      return true;
    }

    return Object.values(resultado || {}).some((valor) => normalizarCodigo(valor) === codigoBuscado);
  }

  function buscarATCEnBuscador(codigo) {
    const buscador = window.CACBuscadorCatalogos;

    if (!buscador || typeof buscador.buscar !== 'function') {
      return false;
    }

    try {
      const resultados = buscador.buscar(codigo, 'atc') || [];
      return Array.isArray(resultados) && resultados.some((resultado) => resultadoTieneCodigoATCExacto(resultado, codigo));
    } catch (error) {
      console.warn('[CACModulo12] No fue posible consultar CACBuscadorCatalogos para ATC.', error);
      return false;
    }
  }

  function buscarATCEnCatalogosGlobales(codigo) {
    const posibles = [
      window.CAC_ATC,
      window.CACATC,
      window.ATC_CAC,
      window.CATALOGO_ATC,
      window.CACCatalogoATC,
      window.CACCatalogos?.ATC,
      window.CACCatalogos?.atc,
      window.CACCatalogos?.catalogoATC,
      window.CACCargadorCatalogos?.ATC,
      window.CACCargadorCatalogos?.atc
    ];

    const revisar = (valor) => {
      if (!valor) return false;

      if (Array.isArray(valor)) {
        return valor.some((item) => {
          if (typeof item === 'string' || typeof item === 'number') {
            return normalizarCodigo(item) === codigo;
          }

          if (item && typeof item === 'object') {
            return resultadoTieneCodigoATCExacto(item, codigo);
          }

          return false;
        });
      }

      if (valor instanceof Set) {
        return valor.has(codigo);
      }

      if (typeof valor === 'object') {
        if (Object.prototype.hasOwnProperty.call(valor, codigo)) {
          return true;
        }

        return Object.values(valor).some((item) => revisar(item));
      }

      return normalizarCodigo(valor) === codigo;
    };

    return posibles.some((catalogo) => revisar(catalogo));
  }

  function existeEnCatalogoATC(valor) {
    const codigo = normalizarCodigo(valor);

    if (!codigo || esComodin(codigo)) {
      return false;
    }

    return buscarATCEnBuscador(codigo) || buscarATCEnCatalogosGlobales(codigo);
  }

  function describirValorV45(valor) {
    const codigo = normalizarCodigo(valor);

    if (codigo === '1') {
      return '1 significa que sí recibió quimioterapia u otra terapia sistémica en el periodo.';
    }

    if (codigo === '98') {
      return '98 significa no aplica: no recibió este esquema de terapia sistémica.';
    }

    if (!codigo) {
      return 'V45 está vacía.';
    }

    return `V45 tiene el valor ${codigo}.`;
  }

  function describirValorAdicional(variable, valor) {
    const codigo = normalizarCodigo(valor);

    if (codigo === '97') {
      return '97 significa no aplica: no recibió medicamentos diferentes a los reportados en V53.1 a V53.9 y V45=1.';
    }

    if (codigo === '98') {
      return '98 significa no aplica: no tuvo este esquema y V45=98.';
    }

    if (!codigo) {
      return `${variable} está vacía.`;
    }

    return `${codigo} corresponde al valor reportado como medicamento adicional.`;
  }

  function nombreVariable(variable) {
    const nombres = {
      V45: 'Recibió quimioterapia u otra terapia sistémica',
      V53_1: 'Medicamento antineoplásico administrado 1',
      V53_2: 'Medicamento antineoplásico administrado 2',
      V53_3: 'Medicamento antineoplásico administrado 3',
      V53_4: 'Medicamento antineoplásico administrado 4',
      V53_5: 'Medicamento antineoplásico administrado 5',
      V53_6: 'Medicamento antineoplásico administrado 6',
      V53_7: 'Medicamento antineoplásico administrado 7',
      V53_8: 'Medicamento antineoplásico administrado 8',
      V53_9: 'Medicamento antineoplásico administrado 9',
      V54: 'Medicamento antineoplásico adicional 1',
      V55: 'Medicamento antineoplásico adicional 2',
      V56: 'Medicamento antineoplásico adicional 3'
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
      severidad: 'error',
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

  function obtenerMedicamentosV53(registro) {
    return VARIABLES_MEDICAMENTOS_BASE
      .map((variable) => ({
        variable,
        valor: normalizarCodigo(registro?.[variable]),
        valorOriginal: registro?.[variable]
      }))
      .filter((item) => item.valor && item.valor !== '97' && item.valor !== '98');
  }

  function validarMedicamentoAdicionalBase({ registro, variable, numeroAdicional }) {
    const hallazgos = [];
    const v45 = normalizarCodigo(registro?.V45);
    const valorOriginal = registro?.[variable];
    const valor = normalizarCodigo(valorOriginal);

    if (estaVacio(valorOriginal)) {
      hallazgos.push(crearHallazgo({
        codigo: `${variable}-ERROR-001`,
        variable,
        titulo: `${variable} está vacía`,
        mensaje: `${variable} está vacía. Debe registrar un código ATC si hubo medicamento adicional. Si no hubo medicamento adicional, registre 97 cuando V45=1. Si no tuvo este esquema, registre 98 cuando V45=98.`,
        regla: `${variable} es obligatoria dentro del bloque del primer o único esquema de terapia sistémica.`,
        recomendacion: 'Revise el soporte de administración. Diligencie un código ATC si hubo medicamento adicional, 97 si no hubo medicamentos adicionales con V45=1, o 98 si no tuvo este esquema con V45=98.',
        valor: valorOriginal,
        datosRelacionados: [
          dato('V45', registro?.V45, describirValorV45(registro?.V45)),
          dato(variable, valorOriginal, 'La variable no tiene dato registrado.')
        ]
      }));

      return hallazgos;
    }

    const es97 = valor === '97';
    const es98 = valor === '98';
    const esATCFormato = pareceCodigoATC(valor);

    if (!es97 && !es98 && !esATCFormato) {
      hallazgos.push(crearHallazgo({
        codigo: `${variable}-ERROR-002`,
        variable,
        titulo: `${variable} tiene un valor diferente de código ATC, 97 o 98`,
        mensaje: `${variable} tiene el valor ${texto(valorOriginal)}, pero esta variable solo permite un código ATC, 97 o 98.`,
        regla: `El instructivo indica que ${variable} debe registrar el código ATC del medicamento adicional ${numeroAdicional}. También permite 97 y 98 según la condición de V45.`,
        recomendacion: `Corrija ${variable}. Use un código ATC del listado SISCAC, 97 si no hubo medicamentos adicionales con V45=1, o 98 si no tuvo este esquema con V45=98.`,
        valor: valorOriginal,
        datosRelacionados: [
          dato('V45', registro?.V45, describirValorV45(registro?.V45)),
          dato(variable, valorOriginal, 'Valor fuera del formato permitido.')
        ]
      }));
    }

    if (v45 === '1' && es98) {
      hallazgos.push(crearHallazgo({
        codigo: `${variable}-ERROR-003`,
        variable,
        titulo: `V45 indica terapia sistémica recibida, pero ${variable} está marcada como no tuvo esquema`,
        mensaje: `${variable} tiene el valor 98, que significa no aplica porque no tuvo este esquema. Sin embargo, V45 tiene el valor 1, que indica que sí recibió quimioterapia u otra terapia sistémica en el periodo.`,
        regla: `Si V45=1, ${variable} debe registrar un código ATC adicional o 97 si no recibió medicamentos diferentes a V53.1-V53.9.`,
        recomendacion: `Cambie ${variable} por un código ATC si hubo medicamento adicional. Si no hubo medicamentos adicionales diferentes a V53.1-V53.9, use 97.`,
        valor: valorOriginal,
        datosRelacionados: [
          dato('V45', registro?.V45, describirValorV45(registro?.V45)),
          dato(variable, valorOriginal, describirValorAdicional(variable, valorOriginal))
        ]
      }));
    }

    if (v45 === '98' && !es98) {
      hallazgos.push(crearHallazgo({
        codigo: `${variable}-ERROR-004`,
        variable,
        titulo: `${variable} no corresponde con V45: si no tuvo esquema, debe registrarse 98`,
        mensaje: `V45 tiene el valor 98, lo que indica que el usuario no tuvo este primer o único esquema de terapia sistémica en el periodo. Sin embargo, ${variable} tiene el valor ${texto(valorOriginal)}. Para este caso, ${variable} debe ser 98, porque el instructivo indica que 98 se usa cuando no tuvo este esquema y V45 también es 98.`,
        regla: `Si V45=98, ${variable} debe ser 98. El valor 97 solo aplica cuando V45=1 y no recibió medicamentos adicionales diferentes a los reportados en V53.1 a V53.9.`,
        recomendacion: `Cambie ${variable} a 98.`,
        valor: valorOriginal,
        datosRelacionados: [
          dato('V45', registro?.V45, 'V45=98 significa que no tuvo este esquema de terapia sistémica en el periodo.'),
          dato(variable, valorOriginal, `${variable}=97 solo aplica cuando V45=1 y no recibió medicamentos diferentes a los ya reportados en V53.1 a V53.9.`)
        ],
        columnasCorregir: [variable]
      }));
    }

    if (esATCFormato && !existeEnCatalogoATC(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: `${variable}-ERROR-005`,
        variable,
        titulo: `${variable} tiene formato ATC, pero no existe en el catálogo ATC cargado`,
        mensaje: `${variable} tiene el valor ${valor}, que parece un código ATC, pero no fue encontrado en el catálogo ATC cargado en el validador.`,
        regla: `El instructivo indica que ${variable} debe registrar un código ATC del listado usado en SISCAC.`,
        recomendacion: `Revise el código ATC en el soporte clínico y en el listado SISCAC. Corrija ${variable} con un código existente o use el comodín que corresponda.`,
        valor: valorOriginal,
        datosRelacionados: [
          dato(variable, valorOriginal, 'No se encontró coincidencia exacta en catálogo ATC cargado.')
        ]
      }));
    }

    if (esATCFormato) {
      const repetido = obtenerMedicamentosV53(registro).find((item) => item.valor === valor);

      if (repetido) {
        hallazgos.push(crearHallazgo({
          codigo: `${variable}-ERROR-006`,
          variable,
          titulo: `${variable} repite un medicamento ya registrado en V53.1 a V53.9`,
          mensaje: `${variable} tiene el código ${valor}, pero ese mismo medicamento ya está registrado en ${repetido.variable}. ${variable} solo debe usarse para un medicamento adicional diferente a los reportados en V53.1 a V53.9.`,
          regla: `El instructivo de ${variable} indica verificar que el medicamento no se encuentre en el listado de las variables V53.1 a V53.9.`,
          recomendacion: `Revise ${variable} y las variables V53.1 a V53.9. Si no hubo medicamento adicional diferente, registre 97 cuando V45=1.`,
          valor: valorOriginal,
          datosRelacionados: [
            dato(repetido.variable, repetido.valorOriginal, 'Medicamento ya reportado en el bloque V53.1-V53.9.'),
            dato(variable, valorOriginal, 'Medicamento adicional repetido.')
          ],
          columnasCorregir: [variable]
        }));
      }
    }

    return hallazgos;
  }

  function validarV54(registro) {
    return validarMedicamentoAdicionalBase({ registro, variable: 'V54', numeroAdicional: 1 });
  }

  function validarV55(registro) {
    const hallazgos = validarMedicamentoAdicionalBase({ registro, variable: 'V55', numeroAdicional: 2 });
    const v55Original = registro?.V55;
    const v55 = normalizarCodigo(v55Original);
    const v54Original = registro?.V54;
    const v54 = normalizarCodigo(v54Original);
    const v55EsATC = pareceCodigoATC(v55);

    if (v55EsATC && v54 && v54 !== '97' && v54 !== '98' && v54 === v55) {
      hallazgos.push(crearHallazgo({
        codigo: 'V55-ERROR-007',
        variable: 'V55',
        titulo: 'V55 repite el medicamento registrado en V54',
        mensaje: `V55 tiene el código ${v55}, pero ese mismo medicamento ya está registrado en V54. V55 debe registrar un segundo medicamento adicional diferente.`,
        regla: 'V54 y V55 representan medicamentos adicionales diferentes del primer o único esquema. No deben repetir el mismo ATC.',
        recomendacion: 'Revise V54 y V55. Si solo hubo un medicamento adicional, V55 debe ser 97 cuando V45=1.',
        valor: v55Original,
        datosRelacionados: [
          dato('V54', v54Original, 'Medicamento adicional 1 ya reportado.'),
          dato('V55', v55Original, 'Medicamento adicional 2 repetido con V54.')
        ],
        columnasCorregir: ['V55']
      }));
    }

    if (v54 === '97' && v55EsATC) {
      hallazgos.push(crearHallazgo({
        codigo: 'V55-ERROR-008',
        variable: 'V55',
        titulo: 'V55 tiene medicamento adicional, pero V54 indica que no hubo medicamentos adicionales',
        mensaje: `V54 tiene el valor 97, lo que indica que no recibió medicamentos adicionales diferentes a los reportados en V53.1 a V53.9. Sin embargo, V55 registra el código ATC ${v55} como segundo medicamento adicional. Esto no es coherente: si existe un medicamento adicional, primero debe registrarse en V54. V55 solo se usa cuando ya existe un primer medicamento adicional en V54 y se necesita registrar un segundo medicamento adicional diferente.`,
        regla: 'V54 registra el primer medicamento adicional y V55 registra el segundo. Si V54=97, no debe aparecer un código ATC en V55.',
        recomendacion: `Revise la secuencia de medicamentos adicionales. Si ${v55} fue administrado como medicamento adicional, debe registrarse primero en V54. Si no hubo segundo medicamento adicional, V55 debe quedar en 97.`,
        valor: v55Original,
        datosRelacionados: [
          dato('V54', v54Original, 'V54=97 indica que no hubo medicamentos adicionales diferentes a V53.1 a V53.9.'),
          dato('V55', v55Original, 'V55 está registrando un segundo medicamento adicional, pero no hay un primer medicamento adicional registrado en V54.')
        ],
        columnasCorregir: ['V54', 'V55']
      }));
    }

    return hallazgos;
  }

  function validarV56(registro) {
    const hallazgos = validarMedicamentoAdicionalBase({ registro, variable: 'V56', numeroAdicional: 3 });
    const v56Original = registro?.V56;
    const v56 = normalizarCodigo(v56Original);
    const v54Original = registro?.V54;
    const v54 = normalizarCodigo(v54Original);
    const v55Original = registro?.V55;
    const v55 = normalizarCodigo(v55Original);
    const v56EsATC = pareceCodigoATC(v56);

    if (v56EsATC && v54 && v54 !== '97' && v54 !== '98' && v54 === v56) {
      hallazgos.push(crearHallazgo({
        codigo: 'V56-ERROR-007',
        variable: 'V56',
        titulo: 'V56 repite el medicamento registrado en V54',
        mensaje: `V56 tiene el código ${v56}, pero ese mismo medicamento ya está registrado en V54. V56 debe registrar un tercer medicamento adicional diferente.`,
        regla: 'V54 y V56 representan medicamentos adicionales diferentes del primer o único esquema. No deben repetir el mismo ATC.',
        recomendacion: 'Revise V54 y V56. Si no hubo tercer medicamento adicional, V56 debe ser 97 cuando V45=1.',
        valor: v56Original,
        datosRelacionados: [
          dato('V54', v54Original, 'Medicamento adicional 1 ya reportado.'),
          dato('V56', v56Original, 'Medicamento adicional 3 repetido con V54.')
        ],
        columnasCorregir: ['V56']
      }));
    }

    if (v56EsATC && v55 && v55 !== '97' && v55 !== '98' && v55 === v56) {
      hallazgos.push(crearHallazgo({
        codigo: 'V56-ERROR-008',
        variable: 'V56',
        titulo: 'V56 repite el medicamento registrado en V55',
        mensaje: `V56 tiene el código ${v56}, pero ese mismo medicamento ya está registrado en V55. V56 debe registrar un tercer medicamento adicional diferente.`,
        regla: 'V55 y V56 representan medicamentos adicionales diferentes del primer o único esquema. No deben repetir el mismo ATC.',
        recomendacion: 'Revise V55 y V56. Si no hubo tercer medicamento adicional, V56 debe ser 97 cuando V45=1.',
        valor: v56Original,
        datosRelacionados: [
          dato('V55', v55Original, 'Medicamento adicional 2 ya reportado.'),
          dato('V56', v56Original, 'Medicamento adicional 3 repetido con V55.')
        ],
        columnasCorregir: ['V56']
      }));
    }

    if ((v54 === '97' || v55 === '97') && v56EsATC) {
      const variableSecuencia = v54 === '97' ? 'V54' : 'V55';
      const valorSecuenciaOriginal = v54 === '97' ? v54Original : v55Original;
      const ordenEsperado = v54 === '97' ? 'primer' : 'segundo';

      hallazgos.push(crearHallazgo({
        codigo: 'V56-ERROR-009',
        variable: 'V56',
        titulo: 'V56 tiene medicamento adicional, pero la secuencia anterior indica que no había más adicionales',
        mensaje: `${variableSecuencia} tiene el valor 97, lo que indica que no recibió medicamentos adicionales en esa posición de la secuencia. Sin embargo, V56 registra el código ATC ${v56} como tercer medicamento adicional. Esto no es coherente: para usar V56 primero deben existir medicamentos adicionales válidos en V54 y V55.`,
        regla: 'V54 registra el primer medicamento adicional, V55 el segundo y V56 el tercero. Si V54=97 o V55=97, no debe aparecer un código ATC en V56.',
        recomendacion: `Revise la secuencia de medicamentos adicionales. Si ${v56} fue administrado como medicamento adicional, debe estar registrada la secuencia previa en V54 y V55. Si no hubo tercer medicamento adicional, V56 debe quedar en 97.`,
        valor: v56Original,
        datosRelacionados: [
          dato(variableSecuencia, valorSecuenciaOriginal, `${variableSecuencia}=97 indica que no hubo medicamento adicional ${ordenEsperado} en la secuencia.`),
          dato('V56', v56Original, 'V56 está registrando un tercer medicamento adicional sin secuencia previa completa.')
        ],
        columnasCorregir: ['V54', 'V55', 'V56']
      }));
    }

    return hallazgos;
  }

  function validar(registro) {
    let hallazgos = [];

    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V54')) {
      hallazgos = hallazgos.concat(validarV54(registro));
    }

    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V55')) {
      hallazgos = hallazgos.concat(validarV55(registro));
    }

    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V56')) {
      hallazgos = hallazgos.concat(validarV56(registro));
    }

    return hallazgos;
  }

  window.CACModulo12 = {
    version: VERSION,
    validar,
    validarV54,
    validarV55,
    validarV56,
    existeEnCatalogoATC,
    pareceCodigoATC
  };
})();
