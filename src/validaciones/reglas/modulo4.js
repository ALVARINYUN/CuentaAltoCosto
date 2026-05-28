// =======================================================
// Validador CAC - validaciones/reglas/modulo4.js
// Sprint 2C: V29
// V29: Primera estadificación basada en TNM, FIGO u otras compatibles
// Ajuste: descripciones claras, catálogos hacia abajo y sin reglas nuevas
// =======================================================

(function () {
  'use strict';

  const VERSION = 'sprint-2c-v29-descripciones-claras-01';

  // -------------------------------------------------------
  // Utilidades base
  // -------------------------------------------------------
  function normalizarCodigo(valor) {
    return String(valor ?? '')
      .trim()
      .toUpperCase()
      .replace(/\s+/g, '');
  }

  function normalizarValor(valor) {
    return String(valor ?? '').trim();
  }

  function esVacio(valor) {
    return valor === null || valor === undefined || String(valor).trim() === '';
  }

  function esEnteroNumerico(valor) {
    const texto = normalizarValor(valor);
    return /^\d+$/.test(texto);
  }

  function crearHallazgo({
    codigo,
    tipo = 'error',
    variable = 'V29',
    titulo,
    mensaje,
    valor,
    detalle,
    causa,
    importancia,
    accion,
    solucion,
    catalogoPermitido,
    datos = {}
  }) {
    const esAdvertencia = tipo === 'advertencia';

    return {
      codigo,
      tipo,
      severidad: esAdvertencia ? 'advertencia' : 'error',
      nivel: esAdvertencia ? 'advertencia' : 'error',
      variable,
      titulo,
      mensaje,
      descripcion: mensaje,
      valor,
      detalle,
      causa,
      importancia,
      accion,
      solucion,
      // Campos usados por la UI de resultados.
      // tabla-resultados.js imprime hallazgo.regla como "Por qué importa"
      // y hallazgo.recomendacion como "Qué hacer".
      regla: importancia || detalle || causa || '',
      recomendacion: solucion || accion || 'Revise el dato en la matriz y corríjalo según el instructivo CAC.',
      solucionSugerida: solucion,
      catalogoPermitido,
      datos,
      variables: ['V17', 'V29'],
      dondeRevisar: 'Revise V17 (diagnóstico CIE-10) y V29 (primera estadificación).'
    };
  }

  function listaLegible(valores) {
    return valores.join(', ');
  }

  function etiquetaCodigoV29(codigo) {
    const textoCodigo = String(codigo);
    return textoCodigo === '0' ? '0 (cero)' : textoCodigo;
  }

  function formatearCatalogoV29(nombreCatalogo, mapa) {
    const lineas = Object.entries(mapa || {}).map(([codigo, descripcion]) => {
      return `- ${etiquetaCodigoV29(codigo)} = ${descripcion}`;
    });

    return [
      `${nombreCatalogo}:`,
      ...lineas
    ].join('\n');
  }

  function textoCodigosPermitidos(mapa) {
    return Object.keys(mapa || {}).map(etiquetaCodigoV29).join(', ');
  }

  function catalogoGeneralV29Texto() {
    return [
      'Catálogo general permitido para V29:',
      '- 0 = Estadio 0 / in situ',
      '- 1 = Estadio I',
      '- 2 = IA',
      '- 3 = IA1',
      '- 4 = IA2',
      '- 5 = IB',
      '- 6 = IB1',
      '- 7 = IB2',
      '- 8 = IC o 1C',
      '- 9 = IS o 1S',
      '- 10 = II',
      '- 11 = IIA',
      '- 12 = IIA1',
      '- 13 = IIA2',
      '- 14 = IIB',
      '- 15 = IIC',
      '- 16 = III',
      '- 17 = IIIA',
      '- 18 = IIIB',
      '- 19 = IIIC',
      '- 20 = IV',
      '- 21 = IVA',
      '- 22 = IVB',
      '- 23 = IVC',
      '- 24 = 4S',
      '- 25 = V',
      '- 27 = IIIC1',
      '- 28 = IIIC2',
      '- 29 = IIID',
      '- 30 = IIIC no especificado',
      '- 31 = IC1',
      '- 32 = IC2',
      '- 33 = IC3',
      '- 34 = IIIA1',
      '- 35 = IIIA2',
      '- 36 = Oculto',
      '- 98 = No aplica',
      '- 99 = Desconocido'
    ].join('\n');
  }

  function catalogoOpcionesEspecialesTexto() {
    return [
      'Catálogo relacionado:',
      '- 8 = IC o 1C',
      '- 9 = IS o 1S',
      '- 24 = 4S, usado para neuroblastoma',
      '- 25 = V',
      '- 31 = IC1',
      '- 32 = IC2',
      '- 33 = IC3',
      '- 34 = IIIA1',
      '- 35 = IIIA2'
    ].join('\n');
  }

  // -------------------------------------------------------
  // Catálogo general V29
  // -------------------------------------------------------
  const V29_CATALOGO_GENERAL = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 27, 28, 29,
    30, 31, 32, 33, 34, 35, 36, 98, 99
  ];

  const SET_V29_GENERAL = new Set(V29_CATALOGO_GENERAL);

  // Opciones especiales generales V29.
  const V29_OTRAS_OPCIONES_ESPECIALES = [8, 9, 24, 25, 31, 32, 33, 34, 35];
  const SET_V29_OTRAS_OPCIONES_ESPECIALES = new Set(V29_OTRAS_OPCIONES_ESPECIALES);

  const MAPA_V29_OTRAS_OPCIONES = {
    8: 'IC o 1C',
    9: 'IS o 1S',
    24: '4S, usado para neuroblastoma',
    25: 'V o 5',
    31: 'IC1',
    32: 'IC2',
    33: 'IC3',
    34: 'IIIA1',
    35: 'IIIA2'
  };

  // -------------------------------------------------------
  // Agrupadores exactos por catálogo operativo CAC/SISCAC
  // -------------------------------------------------------

  // Mama
  const CIE10_MAMA_MALIGNO = new Set([
    'C500', 'C501', 'C502', 'C503', 'C504', 'C505', 'C506', 'C508', 'C509'
  ]);
  const V29_MAMA_PERMITIDOS = [0, 2, 5, 11, 14, 17, 18, 19, 20, 99];
  const SET_V29_MAMA = new Set(V29_MAMA_PERMITIDOS);

  // Gástrico / estómago
  const CIE10_GASTRICO_MALIGNO = new Set([
    'C160', 'C161', 'C162', 'C163', 'C164', 'C165', 'C166', 'C168', 'C169'
  ]);
  const V29_GASTRICO_PERMITIDOS = [0, 2, 5, 11, 14, 17, 18, 19, 20, 99];
  const SET_V29_GASTRICO = new Set(V29_GASTRICO_PERMITIDOS);

  // Próstata
  const CIE10_PROSTATA_MALIGNO = new Set(['C61X']);
  const V29_PROSTATA_PERMITIDOS = [0, 1, 11, 14, 15, 17, 18, 19, 21, 22, 99];
  const SET_V29_PROSTATA = new Set(V29_PROSTATA_PERMITIDOS);

  // Pulmón
  const CIE10_PULMON_MALIGNO = new Set([
    'C33X', 'C340', 'C341', 'C342', 'C343', 'C348', 'C349'
  ]);
  const V29_PULMON_PERMITIDOS = [0, 3, 4, 36, 11, 14, 17, 18, 19, 21, 22, 99];
  const SET_V29_PULMON = new Set(V29_PULMON_PERMITIDOS);

  // Melanoma
  const CIE10_MELANOMA_MALIGNO = new Set([
    'C430', 'C431', 'C432', 'C433', 'C434', 'C435', 'C436', 'C437', 'C438', 'C439'
  ]);
  const V29_MELANOMA_PERMITIDOS = [0, 2, 5, 11, 14, 15, 17, 18, 19, 29, 20, 99];
  const SET_V29_MELANOMA = new Set(V29_MELANOMA_PERMITIDOS);

  // CÁNCER DE COLON Y RECTO
  const CIE10_COLON_RECTO_MALIGNO = new Set([
    'C180', 'C181', 'C182', 'C183', 'C184', 'C185', 'C186', 'C187', 'C188', 'C189',
    'C19X', 'C20X'
  ]);
  const V29_COLON_RECTO_PERMITIDOS = [0, 1, 11, 14, 15, 17, 18, 19, 21, 22, 23, 99];
  const SET_V29_COLON_RECTO = new Set(V29_COLON_RECTO_PERMITIDOS);

  // CÁNCER ANAL (Agrupador Colon y recto)
  const CIE10_ANAL_MALIGNO = new Set([
    'C210', 'C211', 'C212', 'C218'
  ]);
  const V29_ANAL_PERMITIDOS = [0, 1, 11, 14, 17, 18, 19, 20, 99];
  const SET_V29_ANAL = new Set(V29_ANAL_PERMITIDOS);

  // Cérvix
  const CIE10_CERVIX_MALIGNO = new Set([
    'C530', 'C531', 'C538', 'C539'
  ]);
  const V29_CERVIX_PERMITIDOS = [0, 1, 2, 3, 4, 5, 6, 7, 30, 10, 11, 12, 13, 14, 16, 17, 18, 19, 27, 28, 21, 22, 99];
  const SET_V29_CERVIX = new Set(V29_CERVIX_PERMITIDOS);

  // -------------------------------------------------------
  // Detectores públicos internos para pruebas de consola
  // -------------------------------------------------------
  function esCancerMamaPorCIE10(v17) {
    return CIE10_MAMA_MALIGNO.has(normalizarCodigo(v17));
  }

  function esCancerGastricoPorCIE10(v17) {
    return CIE10_GASTRICO_MALIGNO.has(normalizarCodigo(v17));
  }

  function esCancerProstataPorCIE10(v17) {
    return CIE10_PROSTATA_MALIGNO.has(normalizarCodigo(v17));
  }

  function esCancerPulmonPorCIE10(v17) {
    return CIE10_PULMON_MALIGNO.has(normalizarCodigo(v17));
  }

  function esCancerMelanomaPorCIE10(v17) {
    return CIE10_MELANOMA_MALIGNO.has(normalizarCodigo(v17));
  }

  function esCancerColonRectoPorCIE10(v17) {
    return CIE10_COLON_RECTO_MALIGNO.has(normalizarCodigo(v17));
  }

  function esCancerAnalPorCIE10(v17) {
    return CIE10_ANAL_MALIGNO.has(normalizarCodigo(v17));
  }

  function esCancerColorectalPorCIE10(v17) {
    return esCancerColonRectoPorCIE10(v17) || esCancerAnalPorCIE10(v17);
  }

  function esCancerCervixPorCIE10(v17) {
    return CIE10_CERVIX_MALIGNO.has(normalizarCodigo(v17));
  }

  // -------------------------------------------------------
  // Hallazgos específicos V29
  // -------------------------------------------------------
  function hallazgoV29Vacia(valor) {
    return crearHallazgo({
      codigo: 'V29-ERROR-001',
      tipo: 'error',
      variable: 'V29',
      titulo: 'Primera estadificación vacía',
      mensaje: 'V29 está vacía. Debe registrar la primera estadificación del cáncer.',
      valor,
      detalle: 'No se registró ningún valor en V29.',
      causa: 'Falta el dato de la primera estadificación.',
      importancia: 'V29 permite conocer el estadio inicial del cáncer reportado. Si queda vacía, no se puede saber qué estadio fue usado para el reporte.',
      accion: 'Revise la historia clínica, patología, imagenología o nota de oncología y registre el código correspondiente.',
      solucion: 'Si encuentra el estadio, registre el código CAC correcto. Si el estadio no está documentado, use 99 cuando aplique.'
    });
  }

  function hallazgoV29NoNumerica(valor) {
    const valorTexto = normalizarValor(valor);

    return crearHallazgo({
      codigo: 'V29-ERROR-002',
      tipo: 'error',
      variable: 'V29',
      titulo: 'Primera estadificación no numérica',
      mensaje: `V29 tiene el valor “${valorTexto || '(vacío)'}”, pero esta variable debe registrarse con un número.`,
      valor,
      detalle: 'V29 no debe escribirse como “IIA”, “III”, “IV” o “Estadio IV”.',
      causa: 'Se escribió el estadio en texto y no con el código numérico CAC.',
      importancia: 'V29 debe registrarse con el código numérico definido por la CAC para que el dato quede correctamente reportado.',
      accion: 'Revise el estadio documentado y cambie el texto por el código numérico correspondiente.',
      solucion: 'Si el estadio está documentado, conviértalo al código CAC correcto. Si no está documentado, use 99 cuando aplique.',
      catalogoPermitido: catalogoGeneralV29Texto()
    });
  }

  function hallazgoV29FueraCatalogo(valorNumerico) {
    return crearHallazgo({
      codigo: 'V29-ERROR-003',
      tipo: 'error',
      variable: 'V29',
      titulo: 'Primera estadificación fuera del catálogo general',
      mensaje: `V29 tiene el valor ${valorNumerico}. Ese número no existe en el catálogo general permitido.`,
      valor: valorNumerico,
      detalle: 'El valor registrado no pertenece al catálogo general de V29.',
      causa: 'Se registró un número que la CAC no tiene definido para esta variable.',
      importancia: 'Aunque el estadio aparezca en la historia clínica, debe reportarse usando un código permitido por la CAC.',
      accion: 'Revise el estadio documentado y cambie V29 por un código permitido.',
      solucion: 'Use uno de los códigos del catálogo permitido. Si no hay estadificación en los soportes, use 99 cuando aplique.',
      catalogoPermitido: catalogoGeneralV29Texto()
    });
  }

  function hallazgoInSituDebeSerCero(v17, v29) {
    return crearHallazgo({
      codigo: 'V29-ERROR-004',
      tipo: 'error',
      variable: 'V29',
      titulo: 'Tumor in situ debe tener V29 igual a 0',
      mensaje: `V17 tiene el valor ${v17 || '(vacío)'}, que inicia con D, pero V29 no tiene el valor 0.`,
      valor: v29,
      detalle: 'V17 inicia con D y V29 tiene un valor diferente de 0.',
      causa: 'El diagnóstico corresponde a tumor in situ, pero la estadificación registrada no corresponde a in situ.',
      importancia: 'Cuando V17 inicia con D, el caso corresponde a tumor in situ. Para estos casos, V29 debe registrarse como 0.',
      accion: 'Revise si el diagnóstico de V17 está correcto. Si el caso es in situ, cambie V29 a 0.',
      solucion: 'Si el tumor realmente es in situ, use V29=0. Si el tumor no es in situ, corrija V17 y luego registre el estadio correcto en V29.',
      catalogoPermitido: 'Catálogo permitido:\n- 0 = Estadio 0 / in situ',
      datos: { V17: v17, V29: v29 }
    });
  }

  function hallazgoV29Desconocida(v17, v29) {
    return crearHallazgo({
      codigo: 'V29-ADV-001',
      tipo: 'advertencia',
      variable: 'V29',
      titulo: 'Primera estadificación desconocida',
      mensaje: 'V29 tiene el valor 99, que significa estadificación desconocida.',
      valor: v29,
      detalle: 'V29 fue reportada como desconocida.',
      causa: 'No se registró una estadificación inicial concreta.',
      importancia: 'El valor 99 está permitido, pero debe usarse solo cuando la estadificación no aparece en la historia clínica ni en los soportes disponibles.',
      accion: 'Revise historia clínica, patología, imagenología, nota de oncología o junta médica.',
      solucion: 'Si encuentra el estadio, cambie 99 por el código correspondiente. Mantenga 99 solo si después de revisar los soportes no existe dato de estadificación.',
      catalogoPermitido: 'Catálogo permitido:\n- 99 = Desconocido',
      datos: { V17: v17, V29: v29 }
    });
  }

  function hallazgoV29OpcionEspecial(v17, v29) {
    const descripcionOpcion = MAPA_V29_OTRAS_OPCIONES[v29] || 'opción especial';

    return crearHallazgo({
      codigo: 'V29-ADV-002',
      tipo: 'advertencia',
      variable: 'V29',
      titulo: 'Primera estadificación usa una opción especial',
      mensaje: `V29 tiene el valor ${v29}, que corresponde a una opción especial: ${descripcionOpcion}.`,
      valor: v29,
      detalle: 'V29 usa una opción especial del catálogo.',
      causa: 'La opción registrada no aplica para todos los tipos de cáncer.',
      importancia: 'Algunas opciones de V29 existen en el catálogo, pero solo se usan en ciertos tipos de cáncer o estadificaciones específicas.',
      accion: 'Revise si el código de V29 corresponde al tipo de cáncer reportado en V17.',
      solucion: 'Si la opción especial corresponde al caso, conserve el valor. Si no corresponde, cambie V29 por el código correcto.',
      catalogoPermitido: catalogoOpcionesEspecialesTexto(),
      datos: { V17: v17, V29: v29, opcion: descripcionOpcion }
    });
  }

  function hallazgoCompatibilidad({ codigo, titulo, tipoCancer, v17, v29, permitidos, mapa }) {
    const catalogoTexto = formatearCatalogoV29(`Catálogo permitido para ${tipoCancer}`, mapa || {});
    const codigosPermitidos = mapa && Object.keys(mapa).length > 0
      ? textoCodigosPermitidos(mapa)
      : listaLegible(permitidos.map(etiquetaCodigoV29));

    return crearHallazgo({
      codigo,
      tipo: 'error',
      variable: 'V29',
      titulo,
      mensaje: `V17 corresponde a ${tipoCancer}, pero V29 tiene el valor ${v29}, que no está permitido para este diagnóstico.`,
      valor: v29,
      detalle: `Para ${tipoCancer}, los códigos permitidos en V29 son: ${codigosPermitidos}.`,
      causa: 'El código de V29 no corresponde al tipo de cáncer registrado en V17.',
      importancia: `Para ${tipoCancer}, V29 solo debe usar los códigos permitidos para ese diagnóstico.`,
      accion: `Revise el estadio en la historia clínica y cambie V29 por un código permitido para ${tipoCancer}.`,
      solucion: `Use uno de los códigos del catálogo permitido. Si el estadio no está documentado, use 99.\n\n${catalogoTexto}`,
      catalogoPermitido: catalogoTexto,
      datos: { V17: v17, V29: v29, tipoCancer }
    });
  }

  // -------------------------------------------------------
  // Validación principal
  // -------------------------------------------------------
  function validar(registro) {
    const hallazgos = [];
    const fila = registro || {};

    const v17 = normalizarCodigo(fila.V17 ?? fila.v17);
    const v29Original = fila.V29 ?? fila.v29;
    const v29Texto = normalizarValor(v29Original);

    if (esVacio(v29Original)) {
      hallazgos.push(hallazgoV29Vacia(v29Original));
      return hallazgos;
    }

    if (!esEnteroNumerico(v29Texto)) {
      hallazgos.push(hallazgoV29NoNumerica(v29Original));
      return hallazgos;
    }

    const v29 = Number(v29Texto);

    if (!SET_V29_GENERAL.has(v29)) {
      hallazgos.push(hallazgoV29FueraCatalogo(v29));
      return hallazgos;
    }

    // Regla general para todos los carcinomas in situ.
    // Aplica antes de cualquier agrupador específico para evitar que D021/D022,
    // D050/D051/D057/D059, D002 o D075 entren a reglas de malignos.
    if (v17.startsWith('D') && v29 !== 0) {
      hallazgos.push(hallazgoInSituDebeSerCero(v17, v29));
      return hallazgos;
    }

    if (v29 === 99) {
      hallazgos.push(hallazgoV29Desconocida(v17, v29));
    }

    // Mama
    if (esCancerMamaPorCIE10(v17) && !SET_V29_MAMA.has(v29)) {
      hallazgos.push(hallazgoCompatibilidad({
        codigo: 'V29-ERROR-005',
        titulo: 'Estadificación no compatible con cáncer de mama',
        tipoCancer: 'cáncer de mama',
        v17,
        v29,
        permitidos: V29_MAMA_PERMITIDOS,
        mapa: {
          0: 'Estadio 0 / in situ',
          2: 'IA',
          5: 'IB',
          11: 'IIA',
          14: 'IIB',
          17: 'IIIA',
          18: 'IIIB',
          19: 'IIIC',
          20: 'IV',
          99: 'Desconocido'
        }
      }));
    }

    // Gástrico
    if (esCancerGastricoPorCIE10(v17) && !SET_V29_GASTRICO.has(v29)) {
      hallazgos.push(hallazgoCompatibilidad({
        codigo: 'V29-ERROR-006',
        titulo: 'Estadificación no compatible con cáncer gástrico',
        tipoCancer: 'cáncer gástrico',
        v17,
        v29,
        permitidos: V29_GASTRICO_PERMITIDOS,
        mapa: {
          0: 'Estadio 0 / in situ',
          2: 'IA',
          5: 'IB',
          11: 'IIA',
          14: 'IIB',
          17: 'IIIA',
          18: 'IIIB',
          19: 'IIIC',
          20: 'IV',
          99: 'Desconocido'
        }
      }));
    }

    // Próstata
    if (esCancerProstataPorCIE10(v17) && !SET_V29_PROSTATA.has(v29)) {
      hallazgos.push(hallazgoCompatibilidad({
        codigo: 'V29-ERROR-007',
        titulo: 'Estadificación no compatible con cáncer de próstata',
        tipoCancer: 'cáncer de próstata',
        v17,
        v29,
        permitidos: V29_PROSTATA_PERMITIDOS,
        mapa: {
          0: 'Estadio 0 / in situ',
          1: 'I',
          11: 'IIA',
          14: 'IIB',
          15: 'IIC',
          17: 'IIIA',
          18: 'IIIB',
          19: 'IIIC',
          21: 'IVA',
          22: 'IVB',
          99: 'Desconocido'
        }
      }));
    }

    // Pulmón
    if (esCancerPulmonPorCIE10(v17) && !SET_V29_PULMON.has(v29)) {
      hallazgos.push(hallazgoCompatibilidad({
        codigo: 'V29-ERROR-008',
        titulo: 'Estadificación no compatible con cáncer de pulmón',
        tipoCancer: 'cáncer de pulmón',
        v17,
        v29,
        permitidos: V29_PULMON_PERMITIDOS,
        mapa: {
          0: 'Estadio 0 / in situ',
          3: 'IA1',
          4: 'IA2',
          36: 'Oculto',
          11: 'IIA',
          14: 'IIB',
          17: 'IIIA',
          18: 'IIIB',
          19: 'IIIC',
          21: 'IVA',
          22: 'IVB',
          99: 'Desconocido'
        }
      }));
    }

    // Melanoma
    if (esCancerMelanomaPorCIE10(v17) && !SET_V29_MELANOMA.has(v29)) {
      hallazgos.push(hallazgoCompatibilidad({
        codigo: 'V29-ERROR-009',
        titulo: 'Estadificación no compatible con melanoma',
        tipoCancer: 'melanoma',
        v17,
        v29,
        permitidos: V29_MELANOMA_PERMITIDOS,
        mapa: {
          0: 'Estadio 0 / in situ',
          2: 'IA',
          5: 'IB',
          11: 'IIA',
          14: 'IIB',
          15: 'IIC',
          17: 'IIIA',
          18: 'IIIB',
          19: 'IIIC',
          29: 'IIID',
          20: 'IV',
          99: 'Desconocido'
        }
      }));
    }

    // CÁNCER DE COLON Y RECTO
    if (esCancerColonRectoPorCIE10(v17) && !SET_V29_COLON_RECTO.has(v29)) {
      hallazgos.push(hallazgoCompatibilidad({
        codigo: 'V29-ERROR-010',
        titulo: 'Estadificación no compatible con cáncer de colon y recto',
        tipoCancer: 'cáncer de colon y recto',
        v17,
        v29,
        permitidos: V29_COLON_RECTO_PERMITIDOS,
        mapa: {
          0: 'Estadio 0 / in situ',
          1: 'I',
          11: 'IIA',
          14: 'IIB',
          15: 'IIC',
          17: 'IIIA',
          18: 'IIIB',
          19: 'IIIC',
          21: 'IVA',
          22: 'IVB',
          23: 'IVC',
          99: 'Desconocido'
        }
      }));
    }

    // CÁNCER ANAL (Agrupador Colon y recto)
    if (esCancerAnalPorCIE10(v17) && !SET_V29_ANAL.has(v29)) {
      hallazgos.push(hallazgoCompatibilidad({
        codigo: 'V29-ERROR-010',
        titulo: 'Estadificación no compatible con cáncer anal',
        tipoCancer: 'cáncer anal',
        v17,
        v29,
        permitidos: V29_ANAL_PERMITIDOS,
        mapa: {
          0: 'Estadio 0 / in situ',
          1: 'I',
          11: 'IIA',
          14: 'IIB',
          17: 'IIIA',
          18: 'IIIB',
          19: 'IIIC',
          20: 'IV',
          99: 'Desconocido'
        }
      }));
    }

    // Cérvix / cuello del útero - FIGO
    if (esCancerCervixPorCIE10(v17) && !SET_V29_CERVIX.has(v29)) {
      hallazgos.push(hallazgoCompatibilidad({
        codigo: 'V29-ERROR-011',
        titulo: 'Estadificación no compatible con cáncer de cérvix',
        tipoCancer: 'cáncer de cérvix',
        v17,
        v29,
        permitidos: V29_CERVIX_PERMITIDOS,
        mapa: {
          0: 'Estadio 0 / in situ',
          1: 'I',
          2: 'IA',
          3: 'IA1',
          4: 'IA2',
          5: 'IB',
          6: 'IB1',
          7: 'IB2',
          30: 'IB no especificado',
          10: 'II',
          11: 'IIA',
          12: 'IIA1',
          13: 'IIA2',
          14: 'IIB',
          16: 'III',
          17: 'IIIA',
          18: 'IIIB',
          19: 'IIIC',
          27: 'IIIC1',
          28: 'IIIC2',
          21: 'IVA',
          22: 'IVB',
          99: 'Desconocido'
        }
      }));
    }

    // Advertencia general para opciones especiales del catálogo V29.
    // No se agrega si ya existe un error específico de V29, por ejemplo:
    // cérvix + 34/35 debe quedar como V29-ERROR-011, no como simple advertencia.
    if (
      SET_V29_OTRAS_OPCIONES_ESPECIALES.has(v29) &&
      !hallazgos.some(h => String(h.codigo || '').startsWith('V29-ERROR-'))
    ) {
      hallazgos.push(hallazgoV29OpcionEspecial(v17, v29));
    }

    return hallazgos;
  }

  // -------------------------------------------------------
  // API global
  // -------------------------------------------------------
  window.CACModulo4 = {
    version: VERSION,
    validar,
    _interno: {
      normalizarCodigo,
      normalizarValor,
      V29_CATALOGO_GENERAL,
      V29_OTRAS_OPCIONES_ESPECIALES,
      MAPA_V29_OTRAS_OPCIONES,
      V29_MAMA_PERMITIDOS,
      V29_GASTRICO_PERMITIDOS,
      V29_PROSTATA_PERMITIDOS,
      V29_PULMON_PERMITIDOS,
      V29_MELANOMA_PERMITIDOS,
      V29_COLON_RECTO_PERMITIDOS,
      V29_ANAL_PERMITIDOS,
      // Alias de compatibilidad para consola/pruebas anteriores.
      V29_COLORECTAL_PERMITIDOS: V29_COLON_RECTO_PERMITIDOS,
      V29_CERVIX_PERMITIDOS,
      CIE10_MAMA_MALIGNO: Array.from(CIE10_MAMA_MALIGNO),
      CIE10_GASTRICO_MALIGNO: Array.from(CIE10_GASTRICO_MALIGNO),
      CIE10_PROSTATA_MALIGNO: Array.from(CIE10_PROSTATA_MALIGNO),
      CIE10_PULMON_MALIGNO: Array.from(CIE10_PULMON_MALIGNO),
      CIE10_MELANOMA_MALIGNO: Array.from(CIE10_MELANOMA_MALIGNO),
      CIE10_COLON_RECTO_MALIGNO: Array.from(CIE10_COLON_RECTO_MALIGNO),
      CIE10_ANAL_MALIGNO: Array.from(CIE10_ANAL_MALIGNO),
      // Alias de compatibilidad para consola/pruebas anteriores.
      CIE10_COLORECTAL_MALIGNO: Array.from(CIE10_COLON_RECTO_MALIGNO).concat(Array.from(CIE10_ANAL_MALIGNO)),
      CIE10_CERVIX_MALIGNO: Array.from(CIE10_CERVIX_MALIGNO),
      esCancerMamaPorCIE10,
      esCancerGastricoPorCIE10,
      esCancerProstataPorCIE10,
      esCancerPulmonPorCIE10,
      esCancerMelanomaPorCIE10,
      esCancerColonRectoPorCIE10,
      esCancerAnalPorCIE10,
      esCancerColorectalPorCIE10,
      esCancerCervixPorCIE10
    }
  };
})();
