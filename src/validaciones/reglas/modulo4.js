

(function () {
  'use strict';

  const VERSION = 'sprint-2c-v29-catalogos-legibles-01';

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
      return `${etiquetaCodigoV29(codigo)}: ${descripcion}`;
    });

    return [
      `${nombreCatalogo}:`,
      ...lineas
    ].join('\n');
  }

  function textoCodigosPermitidos(mapa) {
    return Object.keys(mapa || {}).map(etiquetaCodigoV29).join(', ');
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
  // Son códigos válidos del catálogo general, pero no aplican automáticamente a todos los cánceres.
  // Mientras se implementan los agrupadores específicos que las usan, generan advertencia orientativa
  // cuando no exista un error específico de compatibilidad por agrupador.
  const V29_OTRAS_OPCIONES_ESPECIALES = [8, 9, 24, 25, 31, 32, 33, 34, 35];
  const SET_V29_OTRAS_OPCIONES_ESPECIALES = new Set(V29_OTRAS_OPCIONES_ESPECIALES);

  const MAPA_V29_OTRAS_OPCIONES = {
    8: 'ec IC o 1C',
    9: 'ec IS o 1S',
    24: 'ec 4S, usado para neuroblastoma',
    25: 'ec V o 5',
    31: 'ec IC1',
    32: 'ec IC2',
    33: 'ec IC3',
    34: 'ec IIIA1',
    35: 'ec IIIA2'
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

  // Pulmón - códigos exactos confirmados en catálogo operativo por el usuario.
  // D021 y D022 son in situ y NO entran aquí; los cubre V29-ERROR-004.
  const CIE10_PULMON_MALIGNO = new Set([
    'C33X', 'C340', 'C341', 'C342', 'C343', 'C348', 'C349'
  ]);
  const V29_PULMON_PERMITIDOS = [0, 3, 4, 36, 11, 14, 17, 18, 19, 21, 22, 99];
  const SET_V29_PULMON = new Set(V29_PULMON_PERMITIDOS);

  // Melanoma - códigos exactos confirmados en catálogo operativo por el usuario.
  // D030-D039 son melanoma in situ y NO entran aquí; los cubre V29-ERROR-004.
  const CIE10_MELANOMA_MALIGNO = new Set([
    'C430', 'C431', 'C432', 'C433', 'C434', 'C435', 'C436', 'C437', 'C438', 'C439'
  ]);
  const V29_MELANOMA_PERMITIDOS = [0, 2, 5, 11, 14, 15, 17, 18, 19, 29, 20, 99];
  const SET_V29_MELANOMA = new Set(V29_MELANOMA_PERMITIDOS);


  // CÁNCER DE COLON Y RECTO - códigos exactos confirmados en catálogo operativo.
  // D010-D012 son carcinoma in situ y NO entran aquí; los cubre V29-ERROR-004.
  const CIE10_COLON_RECTO_MALIGNO = new Set([
    'C180', 'C181', 'C182', 'C183', 'C184', 'C185', 'C186', 'C187', 'C188', 'C189',
    'C19X', 'C20X'
  ]);
  const V29_COLON_RECTO_PERMITIDOS = [0, 1, 11, 14, 15, 17, 18, 19, 21, 22, 23, 99];
  const SET_V29_COLON_RECTO = new Set(V29_COLON_RECTO_PERMITIDOS);

  // CÁNCER ANAL (Agrupador Colon y recto) - códigos exactos confirmados en catálogo operativo.
  // D013 es carcinoma in situ y NO entra aquí; lo cubre V29-ERROR-004.
  const CIE10_ANAL_MALIGNO = new Set([
    'C210', 'C211', 'C212', 'C218'
  ]);
  const V29_ANAL_PERMITIDOS = [0, 1, 11, 14, 17, 18, 19, 20, 99];
  const SET_V29_ANAL = new Set(V29_ANAL_PERMITIDOS);


  // Cérvix - códigos exactos confirmados en catálogo operativo por el usuario.
  // D060, D061, D067 y D069 son carcinoma in situ y NO entran aquí; los cubre V29-ERROR-004.
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
    // Compatibilidad interna: mantiene el detector general del agrupador,
    // pero la validación V29 separa CÁNCER DE COLON Y RECTO de CÁNCER ANAL.
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
      titulo: 'V29 vacía',
      mensaje: 'La variable V29 está vacía. Debe registrar la primera estadificación del tumor sólido según el catálogo CAC.',
      valor,
      detalle: 'V29 indica qué tan avanzado estaba el cáncer en la primera estadificación usada para iniciar manejo.',
      causa: 'No se registró ningún valor en V29.',
      importancia: 'La Cuenta de Alto Costo requiere esta variable para interpretar el estadio inicial del cáncer reportado.',
      accion: 'Revise la historia clínica, el informe de estadificación o el soporte diagnóstico inicial.',
      solucion: 'Registre el código numérico que corresponda al estadio. Si el soporte indica que el estadio es desconocido, use 99 cuando aplique.'
    });
  }

  function hallazgoV29NoNumerica(valor) {
    const valorTexto = normalizarValor(valor);

    return crearHallazgo({
      codigo: 'V29-ERROR-002',
      tipo: 'error',
      variable: 'V29',
      titulo: 'V29 no numérica',
      mensaje: `V29 fue diligenciada como texto (“${valorTexto || '(vacío)'}”). Esta variable no recibe la descripción escrita del estadio; debe reportarse con el código numérico CAC correspondiente.`,
      valor,
      detalle: 'No registre valores como “IIA”, “III”, “IV”, “Estadio IV”, “IA1” o textos similares. V29 debe contener únicamente un número del catálogo CAC.',
      causa: 'Se digitó el estadio clínico en formato textual en lugar de traducirlo al código numérico definido para la variable V29.',
      importancia: 'Si V29 queda en texto, el sistema no puede validar el estadio contra el catálogo CAC ni comprobar si es compatible con el diagnóstico CIE-10 reportado en V17.',
      accion: 'Revise el soporte clínico donde aparece la primera estadificación usada para iniciar manejo y convierta ese estadio al código numérico CAC.',
      solucion: 'Reemplace el texto por el número CAC correcto. Ejemplos: para cáncer de mama, “IIA” se reporta como 11; “IV” se reporta como 20. Para pulmón, “IA1” se reporta como 3, “IVA” como 21 y “IVB” como 22. Si el estadio no está documentado en los soportes, use 99. Si V17 corresponde a carcinoma in situ, V29 debe ser 0 (cero).',
      catalogoPermitido: listaLegible(V29_CATALOGO_GENERAL)
    });
  }

  function hallazgoV29FueraCatalogo(valorNumerico) {
    return crearHallazgo({
      codigo: 'V29-ERROR-003',
      tipo: 'error',
      variable: 'V29',
      titulo: 'V29 fuera del catálogo general',
      mensaje: 'El valor de V29 no existe dentro del catálogo general permitido para la variable.',
      valor: valorNumerico,
      detalle: 'El catálogo general de V29 permite códigos específicos. Por ejemplo, 26 no está permitido.',
      causa: 'Se registró un número que no pertenece al catálogo general de estadificación CAC.',
      importancia: 'Aunque el estadio clínico exista en la historia, debe traducirse al código numérico autorizado por CAC.',
      accion: 'Revise el estadio clínico y seleccione el código CAC correcto.',
      solucion: `Use uno de estos códigos generales permitidos: ${listaLegible(V29_CATALOGO_GENERAL)}.`,
      catalogoPermitido: listaLegible(V29_CATALOGO_GENERAL)
    });
  }

  function hallazgoInSituDebeSerCero(v17, v29) {
    return crearHallazgo({
      codigo: 'V29-ERROR-004',
      tipo: 'error',
      variable: 'V29',
      titulo: 'Carcinoma in situ debe tener V29 igual a 0',
      mensaje: `V17=${v17 || '(vacío)'} inicia con D, por lo tanto corresponde a carcinoma in situ. Para estos casos V29 debe reportarse como 0 (cero), no como estadio invasor.`,
      valor: v29,
      detalle: 'Los diagnósticos CIE-10 que inician con D en este bloque representan lesiones in situ. No deben combinarse con estadios invasores como II, III, IV, IVA, IVB u otros códigos de enfermedad avanzada.',
      causa: 'Se registró en V29 un valor diferente de 0 para un diagnóstico clasificado como in situ en V17.',
      importancia: 'La fila queda incoherente porque V17 describe carcinoma in situ, mientras V29 sugiere un estadio invasor o avanzado. Esta inconsistencia puede alterar la interpretación clínica y la calidad del reporte CAC.',
      accion: 'Confirme primero si el diagnóstico CIE-10 de V17 es correcto. Luego corrija V29 o V17 según el soporte clínico.',
      solucion: 'Si V17 es correcto y el caso realmente es carcinoma in situ, cambie V29 a 0 (cero). Si el tumor realmente es invasor, corrija V17 al código CIE-10 maligno correspondiente y después registre en V29 el código numérico CAC que aplique para ese tipo de cáncer.',
      datos: { V17: v17, V29: v29 }
    });
  }

  function hallazgoV29Desconocida(v17, v29) {
    return crearHallazgo({
      codigo: 'V29-ADV-001',
      tipo: 'advertencia',
      variable: 'V29',
      titulo: 'V29 reportada como desconocida',
      mensaje: 'V29 está registrada como 99, que significa “estadificación desconocida”. El valor es aceptado por el catálogo, pero debe revisarse porque puede indicar falta de soporte o trazabilidad clínica.',
      valor: v29,
      detalle: 'El código 99 solo debe mantenerse cuando la primera estadificación no se encuentra descrita en la historia clínica ni en los soportes disponibles.',
      causa: 'No se reportó una estadificación inicial concreta; se declaró que el dato es desconocido.',
      importancia: 'En registros incidentes, usar 99 puede afectar la calidad del reporte si sí existía una estadificación documentada en patología, imagenología, oncología, junta médica o nota de inicio de tratamiento.',
      accion: 'Busque la primera estadificación usada para iniciar manejo o la primera registrada después de completar los exámenes de extensión.',
      solucion: 'Revise historia clínica, informe histopatológico, imagenología, nota de oncología, junta médica y soportes de inicio de tratamiento. Si encuentra el estadio, cambie 99 por el código CAC correspondiente. Mantenga 99 únicamente si después de revisar los soportes no existe dato documentado.',
      datos: { V17: v17, V29: v29 }
    });
  }


  function hallazgoV29OpcionEspecial(v17, v29) {
    const descripcionOpcion = MAPA_V29_OTRAS_OPCIONES[v29] || 'opción especial de estadificación';

    return crearHallazgo({
      codigo: 'V29-ADV-002',
      tipo: 'advertencia',
      variable: 'V29',
      titulo: 'V29 usa una opción especial de estadificación',
      mensaje: `V29=${v29} corresponde a una opción especial de estadificación (${descripcionOpcion}).`,
      valor: v29,
      detalle: 'Estas opciones existen en el catálogo general de V29, pero solo aplican en determinados tipos de cáncer o clasificaciones específicas.',
      causa: 'El valor registrado pertenece al bloque de “otras opciones” del instructivo CAC.',
      importancia: 'No debe asumirse que esta opción es válida para todos los diagnósticos. Debe confirmarse contra el tipo de cáncer reportado en V17 y el soporte clínico.',
      accion: 'Revise V17, el agrupador del cáncer y la estadificación descrita en la historia clínica. Confirme que la opción especial realmente corresponde al caso.',
      solucion: 'Si el soporte clínico confirma esa estadificación, conserve el valor. Si no corresponde al cáncer reportado, cambie V29 por el código numérico correcto. Si el dato no está documentado, use 99 cuando aplique.',
      catalogoPermitido: '8=IC/1C; 9=IS/1S; 24=4S para neuroblastoma; 25=V/5; 31=IC1; 32=IC2; 33=IC3; 34=IIIA1; 35=IIIA2',
      datos: { V17: v17, V29: v29, opcion: descripcionOpcion }
    });
  }

  function hallazgoCompatibilidad({ codigo, titulo, tipoCancer, v17, v29, permitidos, mapa }) {
    const catalogoTexto = formatearCatalogoV29(tipoCancer, mapa || {});
    const codigosPermitidos = mapa && Object.keys(mapa).length > 0
      ? textoCodigosPermitidos(mapa)
      : listaLegible(permitidos.map(etiquetaCodigoV29));

    return crearHallazgo({
      codigo,
      tipo: 'error',
      variable: 'V29',
      titulo,
      mensaje: `V17=${v17} corresponde a ${tipoCancer}, pero V29=${v29} no está permitido para este catálogo.`,
      valor: v29,
      detalle: `Para ${tipoCancer}, los códigos permitidos en V29 son: ${codigosPermitidos}.`,
      causa: 'El número registrado puede existir en el catálogo general de V29, pero no corresponde al esquema de estadificación del cáncer reportado en V17.',
      importancia: 'V29 debe coincidir con el tipo de cáncer de V17. No basta con que el número exista: debe pertenecer al catálogo específico del diagnóstico.',
      accion: 'Revise el estadio documentado en historia clínica, patología, imagenología o nota de oncología y seleccione el código CAC correspondiente.',
      solucion: `Cambie V29 por uno de los códigos permitidos para este diagnóstico.\n\n${catalogoTexto}\n\nNotas:\n- Escriba solo el número en la matriz; no escriba el estadio en texto.\n- Si el estadio no está documentado en los soportes, use 99.\n- No use 98 como opción general: 98 solo aplica en condiciones específicas definidas por el instructivo.`,
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
          0: 'estadio 0 / in situ',
          2: 'IA',
          5: 'IB',
          11: 'IIA',
          14: 'IIB',
          17: 'IIIA',
          18: 'IIIB',
          19: 'IIIC',
          20: 'IV',
          99: 'desconocido'
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
          0: 'estadio 0 / in situ',
          2: 'IA',
          5: 'IB',
          11: 'IIA',
          14: 'IIB',
          17: 'IIIA',
          18: 'IIIB',
          19: 'IIIC',
          20: 'IV',
          99: 'desconocido'
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
          0: 'estadio 0 / in situ',
          1: 'estadio I',
          11: 'IIA',
          14: 'IIB',
          15: 'IIC',
          17: 'IIIA',
          18: 'IIIB',
          19: 'IIIC',
          21: 'IVA',
          22: 'IVB',
          99: 'desconocido'
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
          0: 'estadio clínico 0 / tumor in situ',
          3: 'IA1',
          4: 'IA2',
          36: 'IA3',
          11: 'IIA',
          14: 'IIB',
          17: 'IIIA',
          18: 'IIIB',
          19: 'IIIC',
          21: 'IVA',
          22: 'IVB',
          99: 'desconocido'
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
          0: 'estadio clínico 0 / tumor in situ',
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
          99: 'desconocido'
        }
      }));
    }


    // CÁNCER DE COLON Y RECTO
    if (esCancerColonRectoPorCIE10(v17) && !SET_V29_COLON_RECTO.has(v29)) {
      hallazgos.push(hallazgoCompatibilidad({
        codigo: 'V29-ERROR-010',
        titulo: 'Estadificación no compatible con CÁNCER DE COLON Y RECTO',
        tipoCancer: 'CÁNCER DE COLON Y RECTO',
        v17,
        v29,
        permitidos: V29_COLON_RECTO_PERMITIDOS,
        mapa: {
          0: 'estadio clínico (ec) o (tumor in situ)',
          1: 'ec I o 1',
          11: 'ec IIA o 2a',
          14: 'ec IIB o 2b',
          15: 'ec IIC o 2c',
          17: 'ec IIIA o 3a',
          18: 'ec IIIB o 3b',
          19: 'ec IIIC o 3c',
          21: 'ec IVA o 4a',
          22: 'ec IVB o 4b',
          23: 'ec IVC o 4c',
          99: 'desconocido'
        }
      }));
    }

    // CÁNCER ANAL (Agrupador Colon y recto)
    if (esCancerAnalPorCIE10(v17) && !SET_V29_ANAL.has(v29)) {
      hallazgos.push(hallazgoCompatibilidad({
        codigo: 'V29-ERROR-010',
        titulo: 'Estadificación no compatible con CÁNCER ANAL (Agrupador Colon y recto)',
        tipoCancer: 'CÁNCER ANAL (Agrupador Colon y recto)',
        v17,
        v29,
        permitidos: V29_ANAL_PERMITIDOS,
        mapa: {
          0: 'estadio clínico (ec) o (tumor in situ)',
          1: 'ec I o 1',
          11: 'ec IIA o 2a',
          14: 'ec IIB o 2b',
          17: 'ec IIIA o 3a',
          18: 'ec IIIB o 3b',
          19: 'ec IIIC o 3c',
          20: 'ec IV o 4',
          99: 'desconocido'
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
          0: 'estadio clínico 0 / tumor in situ',
          1: 'estadio I',
          2: 'IA',
          3: 'IA1',
          4: 'IA2',
          5: 'IB',
          6: 'IB1',
          7: 'IB2',
          30: 'IB3',
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
          99: 'desconocido'
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
