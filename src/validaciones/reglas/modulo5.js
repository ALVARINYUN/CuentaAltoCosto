

(function () {
  'use strict';

  const VERSION = 'sprint-2d-v30-v33-advertencias-01';

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
    V29: 'Primera estadificación basada en TNM, FIGO u otras compatibles',
    V30: 'Fecha en que se realizó la estadificación',
    V31: 'HER2 realizado antes del inicio del tratamiento',
    V32: 'Fecha de realización de la única o última prueba HER2',
    V33: 'Resultado de la única o última prueba HER2'
  };

  const COMODIN_DESCONOCIDO = '1800-01-01';
  const COMODIN_HER2_IN_SITU = '1840-01-01';
  const COMODIN_NO_APLICA = '1845-01-01';

  const CATALOGO_V31 = ['1', '2', '97', '98', '99'];
  const CATALOGO_V33 = ['1', '2', '3', '4', '97', '98', '99'];

  const CIE10_MAMA_MALIGNO = new Set([
    'C500', 'C501', 'C502', 'C503', 'C504', 'C505', 'C506', 'C508', 'C509'
  ]);

  const CIE10_MAMA_IN_SITU = new Set([
    'D050', 'D051', 'D057', 'D059'
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

  function esFechaEspecialV30(valor) {
    const fecha = texto(valor);
    return fecha === COMODIN_DESCONOCIDO || fecha === COMODIN_NO_APLICA;
  }

  function esFechaEspecialV32(valor) {
    const fecha = texto(valor);
    return fecha === COMODIN_DESCONOCIDO || fecha === COMODIN_HER2_IN_SITU || fecha === COMODIN_NO_APLICA;
  }

  function esCancerMama(v17) {
    const codigo = textoMayuscula(v17);
    return CIE10_MAMA_MALIGNO.has(codigo) || CIE10_MAMA_IN_SITU.has(codigo);
  }

  function esCancerMamaMaligno(v17) {
    return CIE10_MAMA_MALIGNO.has(textoMayuscula(v17));
  }

  function esCancerMamaInSitu(v17) {
    return CIE10_MAMA_IN_SITU.has(textoMayuscula(v17));
  }


  function esFechaRealNoComodin(valor) {
    const fecha = texto(valor);
    return esFechaISO(fecha) && fecha !== COMODIN_DESCONOCIDO && fecha !== COMODIN_NO_APLICA;
  }

  function valorLegible(valor) {
    const valorTexto = texto(valor);
    return valorTexto || '(vacío)';
  }

  function contextoV30(registro) {
    return {
      V17: textoMayuscula(registro.V17),
      V18: texto(registro.V18),
      V29: texto(registro.V29),
      V30: texto(registro.V30)
    };
  }

  function datosRelacionadosV30(registro) {
    return [
      dato(registro, 'V17', 'Diagnóstico usado para decidir si la estadificación aplica.'),
      dato(registro, 'V18', 'Fecha oficial de diagnóstico del cáncer reportado.'),
      dato(registro, 'V29', 'Estadificación reportada; V30 debe indicar cuándo se realizó o documentó.'),
      dato(registro, 'V30', 'Fecha de la estadificación. Si es una fecha real, debe ser igual o posterior a V18.')
    ];
  }

  function bloqueDatosV30(registro) {
    const ctx = contextoV30(registro);
    return [
      'Datos usados para decidir:',
      `- V17 = ${valorLegible(ctx.V17)}`,
      `- V18 = ${valorLegible(ctx.V18)}`,
      `- V29 = ${valorLegible(ctx.V29)}`,
      `- V30 = ${valorLegible(ctx.V30)}`
    ].join('\n');
  }

  function bloqueComodinesV30() {
    return [
      'Comodines permitidos para V30:',
      '- 1800-01-01 = Desconocido. Úselo cuando la fecha de estadificación no está descrita en los soportes clínicos.',
      '- 1845-01-01 = No aplica. Úselo solo si la estadificación no aplica según el instructivo: cáncer de piel basocelular, cáncer hematológico o cáncer en SNC, excepto neuroblastoma.'
    ].join('\n');
  }

  function bloqueOpcionesV30(registro, escenario) {
    const ctx = contextoV30(registro);
    const v29 = ctx.V29;
    const opciones = [];

    opciones.push('Opciones posibles para corregir V30:');

    if (v29 && v29 !== '98') {
      opciones.push('1. Si la estadificación reportada en V29 está documentada, registre en V30 la fecha real en formato AAAA-MM-DD. Esa fecha debe ser igual o posterior a V18.');
    } else {
      opciones.push('1. Si el caso sí tiene estadificación documentada, registre en V30 la fecha real en formato AAAA-MM-DD. Esa fecha debe ser igual o posterior a V18.');
    }

    opciones.push('2. Si solo conoce año y mes, registre el día 15. Ejemplo: 2022-02-15.');
    opciones.push('3. La fecha real de V30 no debe quedar antes de V18. Si aparece antes, revise cuál fecha está mal digitada.');
    opciones.push('4. Si la estadificación existe o se reportó en V29, pero la fecha no aparece en los soportes, use 1800-01-01.');
    opciones.push('5. Use 1845-01-01 únicamente cuando la estadificación no aplica por el tipo de cáncer definido en el instructivo: cáncer de piel basocelular, cáncer hematológico o cáncer en SNC, excepto neuroblastoma.');

    if (escenario === 'formato') {
      opciones.push('6. No convierta la fecha a formato con barras ni texto; debe quedar AAAA-MM-DD.');
    }

    if (escenario === 'fecha_inexistente') {
      opciones.push('6. Revise día, mes y año: la fecha debe existir en calendario.');
    }

    if (escenario === 'no_aplica_dudoso') {
      opciones.push('6. Si V17 corresponde a un tumor donde la estadificación sí aplica y V29 tiene una estadificación real, no use 1845-01-01: registre la fecha real o 1800-01-01 si la fecha no está documentada.');
    }

    if (escenario === 'desconocida_con_estadio') {
      opciones.push('6. Si el diagnóstico histopatológico fue desde el 1 de noviembre de 2024 y no alcanzó consulta de estadificación, use 1800-01-01 en V30 y más adelante revise V128 con novedad 2, 10 o 13.');
    }

    return opciones.join('\n');
  }


  function recomendacionV30(registro, escenario) {
    if (escenario === 'formato') {
      return [
        bloqueDatosV30(registro),
        '',
        bloqueComodinesV30()
      ].join('\n');
    }

    if (escenario === 'no_aplica_dudoso') {
      return [
        'Revise el diagnóstico en V17.',
        'Use 1845-01-01 solo si corresponde a cáncer de piel basocelular, cáncer hematológico o cáncer en SNC, excepto neuroblastoma.',
        'Si el caso sí tiene estadificación en V29, registre la fecha real de V30 en formato AAAA-MM-DD, igual o posterior a V18.',
        'Si la fecha no aparece en soportes, use 1800-01-01.'
      ].join('\n');
    }

    const bloques = [
      bloqueDatosV30(registro),
      '',
      bloqueComodinesV30(),
      '',
      bloqueOpcionesV30(registro, escenario)
    ];

    return bloques.join('\n');
  }


  function catalogoV31Texto() {
    return [
      '1 = Sí se realizó HER2 antes del inicio del tratamiento.',
      '2 = No se realizó HER2 antes del inicio del tratamiento. También use 2 si HER2 se realizó después del inicio del tratamiento; en ese caso V32 y V33 deben reportar la fecha y el resultado.',
      '97 = No aplica porque es cáncer de mama in situ, siempre que HER2 no se haya realizado. Si HER2 sí se realizó en mama in situ, capture la información real.',
      '98 = No aplica porque no es cáncer de mama.',
      '99 = Desconocido, el dato no está descrito en los soportes clínicos.'
    ].join('\n');
  }

  function catalogoV33Texto() {
    return [
      '1 = +++ positivo.',
      '2 = ++ equívoco o indeterminado.',
      '3 = + negativo.',
      '4 = cero o negativo.',
      '97 = No aplica porque es cáncer de mama in situ.',
      '98 = No aplica porque no es cáncer de mama o porque no se realizó HER2.',
      '99 = Desconocido, el dato no está descrito en los soportes clínicos.'
    ].join('\n');
  }

  function catalogoCancerMamaTexto() {
    return [
      'Catálogo usado para cáncer de mama:',
      'C500, C501, C502, C503, C504, C505, C506, C508, C509 = cáncer de mama invasivo.',
      'D050, D051, D057, D059 = cáncer de mama in situ.'
    ].join('\n');
  }

  function comodinesV32Texto() {
    return [
      'Comodines permitidos para V32:',
      '1800-01-01 = Desconocido. Use este valor cuando la prueba HER2 existe o aplica, pero la fecha no está descrita en los soportes.',
      '1840-01-01 = No aplica porque es cáncer de mama in situ.',
      '1845-01-01 = No aplica porque no es cáncer de mama, o porque V31 está marcada como 2.'
    ].join('\n');
  }

  function datosRelacionadosV32(registro) {
    return [
      dato(registro, 'V17', 'Diagnóstico usado para saber si HER2 aplica.'),
      dato(registro, 'V31', 'Indica si HER2 se realizó antes del inicio del tratamiento.'),
      dato(registro, 'V32', 'Fecha de realización de HER2 o comodín correspondiente.'),
      dato(registro, 'V33', 'Resultado HER2 reportado; debe ser coherente con la fecha de V32.')
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

  function validarFechaV30(registro, hallazgos) {
    const v30 = texto(registro.V30);
    const v29 = texto(registro.V29);
    const v18 = texto(registro.V18);

    if (!v30) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V30-ERROR-001',
        variable: 'V30',
        titulo: 'Fecha de estadificación vacía',
        mensaje: 'V30 está vacía. Esta variable debe registrar la fecha que soporta la primera estadificación reportada en V29.',
        regla: 'V18 indica cuándo se diagnosticó el cáncer. V29 indica qué estadio se reportó. V30 debe indicar cuándo se realizó o documentó ese estadio. Si V30 es una fecha real, debe ser igual o posterior a V18.',
        recomendacion: recomendacionV30(registro, 'vacia'),
        tipo: TIPO.FORMATO,
        datosRelacionados: datosRelacionadosV30(registro),
        columnasCorregir: ['V30']
      }));
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(v30)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V30-ERROR-002',
        variable: 'V30',
        titulo: 'Fecha de estadificación con formato incorrecto',
        mensaje: `V30=${v30} no tiene formato AAAA-MM-DD. Esta variable no acepta barras, texto, día/mes/año ni fechas incompletas.`,
        regla: 'La fecha de V30 debe escribirse con año, mes y día separados por guion. Ejemplo correcto: 2022-02-15.',
        recomendacion: recomendacionV30(registro, 'formato'),
        tipo: TIPO.FORMATO,
        datosRelacionados: datosRelacionadosV30(registro),
        columnasCorregir: ['V30']
      }));
      return;
    }

    if (!esFechaISO(v30)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V30-ERROR-003',
        variable: 'V30',
        titulo: 'Fecha de estadificación inexistente',
        mensaje: `V30=${v30} tiene formato AAAA-MM-DD, pero no corresponde a una fecha real del calendario.`,
        regla: 'V30 debe ser una fecha real o uno de los comodines permitidos: 1800-01-01 o 1845-01-01.',
        recomendacion: recomendacionV30(registro, 'fecha_inexistente'),
        tipo: TIPO.FORMATO,
        datosRelacionados: datosRelacionadosV30(registro),
        columnasCorregir: ['V30']
      }));
      return;
    }

    if (v30 === COMODIN_NO_APLICA && v29 !== '98') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V30-ADVERTENCIA-003',
        variable: 'V30',
        titulo: 'V30 marcada como No aplica requiere revisión',
        mensaje: 'V30 está registrada como 1845-01-01, que significa “No aplica”. Este valor solo debe usarse cuando la estadificación no aplica por el tipo de cáncer: piel basocelular, cáncer hematológico o cáncer en SNC, excepto neuroblastoma.',
        regla: 'Si el cáncer reportado sí requiere estadificación y V29 tiene un estadio real, V30 no debería quedar como 1845-01-01. En ese caso debe registrarse una fecha real o 1800-01-01 si la fecha no está documentada.',
        recomendacion: recomendacionV30(registro, 'no_aplica_dudoso'),
        severidad: SEVERIDAD.ADVERTENCIA,
        tipo: TIPO.COHERENCIA,
        datosRelacionados: datosRelacionadosV30(registro),
        columnasCorregir: ['V17', 'V30']
      }));
      return;
    }

    if (v30 === COMODIN_DESCONOCIDO && v29 && !['98', '99'].includes(v29)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V30-ADVERTENCIA-001',
        variable: 'V30',
        titulo: 'V29 tiene estadificación real pero V30 está como desconocida',
        mensaje: `V29=${v29} contiene una estadificación real, pero V30 está registrada como 1800-01-01: fecha desconocida.`,
        regla: 'El comodín 1800-01-01 está permitido, pero debe usarse solo cuando la fecha de estadificación no está descrita en los soportes clínicos.',
        recomendacion: recomendacionV30(registro, 'desconocida_con_estadio'),
        severidad: SEVERIDAD.ADVERTENCIA,
        tipo: TIPO.COHERENCIA,
        datosRelacionados: datosRelacionadosV30(registro),
        columnasCorregir: ['V29', 'V30']
      }));
      return;
    }

    if (esFechaRealNoComodin(v30) && esFechaRealNoComodin(v18)) {
      const comparacion = CACTipos.compararFechas(v30, v18);

      if (comparacion === -1) {
        hallazgos.push(crearHallazgoRegistro(registro, {
          codigo: 'V30-ERROR-004',
          variable: 'V30',
          titulo: 'Fecha de estadificación anterior al diagnóstico',
          mensaje: `V30=${v30} aparece antes de V18=${v18}. V30 debe ser igual o posterior a V18 cuando ambas son fechas reales.`,
          regla: 'V18 es la fecha oficial de diagnóstico del cáncer reportado. V30 es la fecha en que se realizó o documentó la estadificación de ese cáncer. Por trazabilidad, V30 no debe ser anterior a V18.',
          recomendacion: [
            bloqueDatosV30(registro),
            '',
            'Opciones posibles para corregir:',
            '1. Si V30 está mal digitada, corrija la fecha de estadificación para que sea igual o posterior a V18.',
            '2. Si la fecha de diagnóstico V18 está mal digitada, corrija V18 con base en el soporte clínico.',
            '3. Si V30 corresponde a otro evento clínico y no a la estadificación, reemplace V30 por la fecha correcta.',
            '4. Si no existe fecha de estadificación documentada, use 1800-01-01 en V30.',
            '5. No use 1845-01-01 salvo que la estadificación realmente no aplique según el instructivo.'
          ].join('\n'),
          severidad: SEVERIDAD.ERROR,
          tipo: TIPO.COHERENCIA,
          datosRelacionados: datosRelacionadosV30(registro),
          columnasCorregir: ['V18', 'V30']
        }));
      }
    }
  }

  function validarV31(registro, hallazgos) {
    const v17 = textoMayuscula(registro.V17);
    const v31 = texto(registro.V31);
    const mama = esCancerMama(v17);
    const mamaMaligno = esCancerMamaMaligno(v17);
    const mamaInSitu = esCancerMamaInSitu(v17);

    if (!v31) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V31-ERROR-001',
        variable: 'V31',
        titulo: 'HER2 vacío',
        mensaje: 'V31 está vacío. Debe indicar si la prueba HER2 se realizó antes del inicio del tratamiento o registrar el valor no aplica/desconocido correspondiente.',
        regla: 'V31 no pregunta solamente si HER2 existe. Pregunta si HER2 se realizó antes del inicio del tratamiento. Por eso el momento de la prueba es importante.',
        recomendacion: 'Use el código que corresponda según el soporte clínico:\n\n' + catalogoV31Texto(),
        tipo: TIPO.FORMATO
      }));
      return;
    }

    if (!esEntero(v31)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V31-ERROR-002',
        variable: 'V31',
        titulo: 'HER2 no numérico',
        mensaje: `V31 tiene escrito “${v31}”, pero esta variable no recibe texto. Debe diligenciarse con un código numérico del catálogo HER2.`,
        regla: 'V31 no pregunta en texto libre. La Cuenta de Alto Costo espera un número que indique si HER2 se realizó antes del inicio del tratamiento, si no se realizó, si no aplica o si el dato es desconocido.',
        recomendacion: 'Reemplace el texto por el código numérico correcto:\n\n' + catalogoV31Texto(),
        tipo: TIPO.FORMATO
      }));
      return;
    }

    if (!CATALOGO_V31.includes(v31)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V31-ERROR-003',
        variable: 'V31',
        titulo: 'HER2 fuera de catálogo',
        mensaje: `V31 tiene el valor ${v31}, pero ese número no pertenece al catálogo permitido para esta variable.`,
        regla: 'V31 solo acepta códigos específicos para indicar si HER2 se realizó antes del inicio del tratamiento, si no se realizó, si no aplica o si el dato es desconocido.',
        recomendacion: 'Corrija V31 usando uno de estos códigos:\n\n' + catalogoV31Texto(),
        tipo: TIPO.CATALOGO
      }));
      return;
    }

    if (!mama && v31 !== '98') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V31-ERROR-004',
        variable: 'V31',
        titulo: 'HER2 no aplica porque no es cáncer de mama',
        mensaje: `V17=${v17 || '(vacío)'} no corresponde a cáncer de mama, por lo tanto V31 debe ser 98.`,
        regla: 'HER2 en V31 solo aplica para cáncer de mama. Para otros diagnósticos debe registrarse 98.',
        recomendacion: 'Cambie V31 a 98 si el diagnóstico V17 no es cáncer de mama. Si el caso sí es cáncer de mama, revise y corrija V17.',
        tipo: TIPO.DEPENDENCIA,
        datosRelacionados: [dato(registro, 'V17'), dato(registro, 'V31')],
        columnasCorregir: ['V17', 'V31']
      }));
      return;
    }

    if (mamaMaligno && v31 === '98') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V31-ERROR-005',
        variable: 'V31',
        titulo: 'HER2 marcado como no aplica en cáncer de mama',
        mensaje: 'V17 corresponde a cáncer de mama, pero V31 está marcado como 98. El código 98 significa “No aplica porque no es cáncer de mama”, por eso no corresponde usarlo en este caso.',
        regla: 'En cáncer de mama invasivo, V31 debe informar si la prueba HER2 se realizó antes del inicio del tratamiento, si no se realizó antes del tratamiento o si el dato es desconocido. No debe marcarse como “no aplica porque no es cáncer de mama” cuando V17 sí corresponde a cáncer de mama.',
        recomendacion: [
          'Corrija V31 usando una de estas opciones:',
          '',
          '1 = Sí se realizó HER2 antes del inicio del tratamiento.',
          '2 = No se realizó HER2 antes del inicio del tratamiento. También use 2 si HER2 se realizó después del inicio del tratamiento; en ese caso V32 y V33 deben reportar la fecha y el resultado de la prueba.',
          '99 = Desconocido, si el dato no está descrito en los soportes clínicos.',
          '',
          'No use 98 para cáncer de mama invasivo. Use 98 solo cuando V17 no corresponda a cáncer de mama.'
        ].join('\n'),
        tipo: TIPO.DEPENDENCIA,
        datosRelacionados: [dato(registro, 'V17'), dato(registro, 'V31')],
        columnasCorregir: ['V17', 'V31']
      }));
      return;
    }

    if (mamaMaligno && v31 === '97') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V31-ERROR-006',
        variable: 'V31',
        titulo: 'HER2 marcado como mama in situ en cáncer de mama invasivo',
        mensaje: 'V31 está marcado como 97, pero V17 corresponde a cáncer de mama invasivo.',
        regla: 'La opción 97 aplica cuando es cáncer de mama in situ. Para cáncer de mama invasivo no debe usarse 97.',
        recomendacion: 'Revise V17. Si el caso es invasivo, cambie V31 a 1, 2 o 99 según soporte. Si realmente es in situ, corrija V17 al código CIE-10 in situ correspondiente.',
        tipo: TIPO.DEPENDENCIA,
        datosRelacionados: [dato(registro, 'V17'), dato(registro, 'V31')],
        columnasCorregir: ['V17', 'V31']
      }));
      return;
    }

    if (mamaInSitu && v31 === '98') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V31-ERROR-007',
        variable: 'V31',
        titulo: 'HER2 marcado como no mama en cáncer de mama in situ',
        mensaje: 'V31 está marcado como 98, pero V17 corresponde a cáncer de mama in situ.',
        regla: 'Para cáncer de mama in situ, V31 puede capturar la información si HER2 se realizó; si no aplica por in situ, debe usarse 97. No corresponde 98 porque sí es cáncer de mama.',
        recomendacion: 'Use 97 si no aplica por cáncer de mama in situ. Si HER2 sí se realizó, capture la opción que corresponda según soporte.',
        tipo: TIPO.DEPENDENCIA,
        datosRelacionados: [dato(registro, 'V17'), dato(registro, 'V31')],
        columnasCorregir: ['V17', 'V31']
      }));
    }
  }

  function validarV32(registro, hallazgos) {
    const v17 = textoMayuscula(registro.V17);
    const v31 = texto(registro.V31);
    const v32 = texto(registro.V32);
    const v18 = texto(registro.V18);
    const mama = esCancerMama(v17);
    const mamaInSitu = esCancerMamaInSitu(v17);

    if (!v32) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V32-ERROR-001',
        variable: 'V32',
        titulo: 'Fecha HER2 vacía',
        mensaje: 'V32 está vacía. Esta variable debe registrar la fecha de realización de la prueba HER2, o el comodín que corresponda según el caso.',
        regla: 'V32 indica cuándo se realizó la prueba HER2. Esta fecha permite dar trazabilidad al resultado reportado en V33 y verificar si la información HER2 está documentada correctamente.',
        recomendacion: [
          'Revise el soporte de HER2, inmunohistoquímica, patología, historia clínica o reporte molecular.',
          '',
          'Use una de estas opciones:',
          '',
          '1. Si la prueba HER2 se realizó y la fecha está documentada, registre la fecha real en formato AAAA-MM-DD.',
          '2. Si solo conoce año y mes, registre el día 15.',
          '3. Si HER2 se realizó pero la fecha no aparece en soportes, use 1800-01-01.',
          '4. Si es cáncer de mama in situ y HER2 no aplica, use 1840-01-01.',
          '5. Si no es cáncer de mama, o si V31 indica que HER2 no se realizó antes del tratamiento, use 1845-01-01.',
          '',
          comodinesV32Texto()
        ].join('\n'),
        tipo: TIPO.FORMATO,
        datosRelacionados: datosRelacionadosV32(registro),
        columnasCorregir: ['V32']
      }));
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(v32)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V32-ERROR-002',
        variable: 'V32',
        titulo: 'Fecha HER2 con formato incorrecto',
        mensaje: `V32 tiene el valor ${v32}, pero la fecha no está escrita en formato AAAA-MM-DD. Esta variable debe usar guiones.`,
        regla: 'V32 debe indicar la fecha de realización de la prueba HER2 con un formato estándar. Si la fecha queda con barras, texto o formato día/mes/año, el sistema no puede interpretarla correctamente ni validar la trazabilidad del resultado HER2.',
        recomendacion: [
          'Corrija V32 usando el formato AAAA-MM-DD.',
          '',
          'Ejemplo:',
          'Si la fecha es 2 de marzo de 2022, registre:',
          '2022-03-02',
          '',
          'Si solo conoce el año y el mes, registre el día 15.',
          'Ejemplo:',
          '2022-03-15',
          '',
          'Si la fecha no aparece en los soportes clínicos, use 1800-01-01.',
          'Si no aplica según el caso, use el comodín correspondiente:',
          '1840-01-01 = cáncer de mama in situ cuando HER2 no aplica.',
          '1845-01-01 = no es cáncer de mama o V31 indica que HER2 no se realizó antes del tratamiento.'
        ].join('\n'),
        tipo: TIPO.FORMATO
      }));
      return;
    }

    if (!esFechaISO(v32)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V32-ERROR-003',
        variable: 'V32',
        titulo: 'Fecha HER2 inexistente',
        mensaje: `V32 tiene el valor ${v32}. Aunque está escrito en formato AAAA-MM-DD, esa fecha no existe en el calendario.`,
        regla: 'V32 debe registrar una fecha real de la prueba HER2 o un comodín permitido. Una fecha inexistente no puede usarse para soportar la trazabilidad del resultado HER2.',
        recomendacion: [
          'Use uno de los comodines permitidos solo si corresponde:',
          '',
          '1800-01-01 = Desconocido. Use este valor si la prueba HER2 aplica o se realizó, pero la fecha no aparece en los soportes clínicos.',
          '',
          '1840-01-01 = No aplica porque es cáncer de mama in situ.',
          '',
          '1845-01-01 = No aplica porque no es cáncer de mama, o porque V31 está marcada como 2: HER2 no se realizó antes del inicio del tratamiento.'
        ].join('\n'),
        tipo: TIPO.FORMATO
      }));
      return;
    }

    if (!mama && v32 !== COMODIN_NO_APLICA) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V32-ERROR-004',
        variable: 'V32',
        titulo: 'Fecha HER2 debe ser no aplica porque no es cáncer de mama',
        mensaje: `V17=${v17 || '(vacío)'} corresponde a un diagnóstico diferente a cáncer de mama. Por eso V32 no debe tener una fecha real de HER2. Para esta variable, cuando no es cáncer de mama, debe registrarse 1845-01-01.`,
        regla: [
          'V32 solo aplica para cáncer de mama.',
          '',
          catalogoCancerMamaTexto()
        ].join('\n'),
        recomendacion: [
          'Si V17 realmente no es cáncer de mama, cambie V32 a 1845-01-01.',
          '',
          'Según el instructivo de V32:',
          '1800-01-01 = Desconocido, cuando el dato no está descrito en soportes.',
          '1840-01-01 = No aplica porque es cáncer de mama in situ.',
          '1845-01-01 = No aplica porque no es cáncer de mama, o porque V31 está marcada con la opción 2.'
        ].join('\n'),
        tipo: TIPO.DEPENDENCIA,
        datosRelacionados: [
          dato(registro, 'V17', 'Diagnóstico usado para decidir si HER2 aplica.'),
          dato(registro, 'V31', 'Indica si HER2 no aplica porque no es cáncer de mama.'),
          dato(registro, 'V32', 'Esta fecha no corresponde si el diagnóstico no es cáncer de mama.')
        ],
        columnasCorregir: ['V17', 'V31', 'V32']
      }));
      return;
    }

    if (mamaInSitu && v31 === '97' && v32 !== COMODIN_HER2_IN_SITU) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V32-ERROR-005',
        variable: 'V32',
        titulo: 'Fecha HER2 debe ser 1840-01-01 para mama in situ sin aplicación HER2',
        mensaje: 'V31=97 indica no aplica por cáncer de mama in situ; en ese caso V32 debe ser 1840-01-01.',
        regla: '1840-01-01 significa no aplica porque es cáncer de mama in situ.',
        recomendacion: 'Cambie V32 a 1840-01-01. Si HER2 sí se realizó, revise V31 y capture la fecha real de la prueba.',
        tipo: TIPO.DEPENDENCIA,
        datosRelacionados: [dato(registro, 'V17'), dato(registro, 'V31'), dato(registro, 'V32')],
        columnasCorregir: ['V17', 'V31', 'V32']
      }));
      return;
    }

    if (mama && v31 === '1' && (v32 === COMODIN_HER2_IN_SITU || v32 === COMODIN_NO_APLICA)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V32-ERROR-006',
        variable: 'V32',
        titulo: 'Fecha HER2 no corresponde cuando la prueba fue realizada',
        mensaje: 'V31=1 indica que HER2 sí se realizó antes del tratamiento, pero V32 está registrada con un comodín de no aplica.',
        regla: 'Cuando HER2 se realizó, V32 debe contener la fecha real de la prueba o 1800-01-01 si esa fecha no está documentada.',
        recomendacion: 'Registre la fecha real de HER2. Si no aparece en soportes, use 1800-01-01. No use 1840-01-01 ni 1845-01-01 cuando V31=1.',
        tipo: TIPO.DEPENDENCIA,
        datosRelacionados: [dato(registro, 'V31'), dato(registro, 'V32')],
        columnasCorregir: ['V31', 'V32']
      }));
    }


    if (esFechaISO(v32) && !esFechaEspecialV32(v32) && esFechaRealNoComodin(v18)) {
      const comparacion = CACTipos.compararFechas(v32, v18);

      if (comparacion === -1) {
        hallazgos.push(crearHallazgoRegistro(registro, {
          codigo: 'V32-ADVERTENCIA-008',
          variable: 'V32',
          titulo: 'Fecha HER2 anterior al diagnóstico',
          mensaje: 'V32 tiene una fecha anterior a V18.',
          regla: 'La fecha de HER2 normalmente debe estar relacionada con el proceso diagnóstico o de tratamiento del cáncer reportado. Si aparece antes del diagnóstico, puede haber una fecha mal registrada o un soporte que debe revisarse.',
          recomendacion: 'Revise la fecha de diagnóstico y la fecha de HER2 en los soportes clínicos. Si V32 está mal digitada, corríjala. Si V18 está mal registrada, corrija V18. Si ambas fechas son correctas y están soportadas, conserve el dato.',
          severidad: SEVERIDAD.ADVERTENCIA,
          tipo: TIPO.COHERENCIA,
          datosRelacionados: [
            dato(registro, 'V18', 'Fecha de diagnóstico del cáncer reportado.'),
            dato(registro, 'V32', 'Fecha de realización de HER2.')
          ],
          columnasCorregir: ['V18', 'V32']
        }));
      }
    }
  }

  function validarV33(registro, hallazgos) {
    const v17 = textoMayuscula(registro.V17);
    const v31 = texto(registro.V31);
    const v33 = texto(registro.V33);
    const mama = esCancerMama(v17);
    const mamaInSitu = esCancerMamaInSitu(v17);

    if (!v33) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V33-ERROR-001',
        variable: 'V33',
        titulo: 'Resultado HER2 vacío',
        mensaje: 'V33 está vacío. Debe registrar el resultado HER2 o el no aplica correspondiente.',
        regla: 'V33 solo acepta 1, 2, 3, 4, 97, 98 o 99.',
        recomendacion: 'Use el código que corresponda según el soporte clínico:\n\n' + catalogoV33Texto(),
        tipo: TIPO.FORMATO
      }));
      return;
    }

    if (!esEntero(v33)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V33-ERROR-002',
        variable: 'V33',
        titulo: 'Resultado HER2 no numérico',
        mensaje: `V33 tiene escrito “${v33}”, pero esta variable no recibe texto. Debe diligenciarse con un código numérico del catálogo de resultado HER2.`,
        regla: 'V33 debe registrar el resultado HER2 usando el código numérico definido por el instructivo. Si se escribe texto como “POSITIVO”, “NEGATIVO” o “EQUIVOCO”, el sistema no puede validar el dato correctamente.',
        recomendacion: 'Reemplace el texto por el código que corresponda según el soporte clínico:\n\n' + catalogoV33Texto(),
        tipo: TIPO.FORMATO
      }));
      return;
    }

    if (!CATALOGO_V33.includes(v33)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V33-ERROR-003',
        variable: 'V33',
        titulo: 'Resultado HER2 fuera de catálogo',
        mensaje: `V33 tiene el valor ${v33}, pero ese código no pertenece al catálogo permitido para el resultado HER2.`,
        regla: 'V33 solo acepta códigos específicos para reportar el resultado de HER2 o el no aplica correspondiente. El valor registrado no existe en el catálogo de esta variable.',
        recomendacion: 'Corrija V33 usando el código que corresponda según el soporte clínico:\n\n' + catalogoV33Texto(),
        tipo: TIPO.CATALOGO
      }));
      return;
    }

    if (!mama && v33 !== '98') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V33-ERROR-004',
        variable: 'V33',
        titulo: 'Resultado HER2 debe ser no aplica porque no es cáncer de mama',
        mensaje: `V17=${v17 || '(vacío)'} no corresponde a cáncer de mama, por lo tanto V33 debe ser 98.`,
        regla: 'V33 solo aplica para cáncer de mama. Para otros diagnósticos se registra 98.',
        recomendacion: 'Cambie V33 a 98 si el diagnóstico no es cáncer de mama. Si el caso sí es mama, revise V17.',
        tipo: TIPO.DEPENDENCIA,
        datosRelacionados: [dato(registro, 'V17'), dato(registro, 'V33')],
        columnasCorregir: ['V17', 'V33']
      }));
      return;
    }

    if (mamaInSitu && v31 === '97' && v33 !== '97') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V33-ERROR-005',
        variable: 'V33',
        titulo: 'Resultado HER2 debe ser 97 para mama in situ sin aplicación HER2',
        mensaje: 'V31=97 indica no aplica por cáncer de mama in situ; en ese caso V33 debe ser 97.',
        regla: '97 en V33 significa no aplica porque es cáncer de mama in situ.',
        recomendacion: 'Cambie V33 a 97. Si HER2 sí se realizó, revise V31 y capture el resultado real de la prueba.',
        tipo: TIPO.DEPENDENCIA,
        datosRelacionados: [dato(registro, 'V17'), dato(registro, 'V31'), dato(registro, 'V33')],
        columnasCorregir: ['V17', 'V31', 'V33']
      }));
      return;
    }

    if (mama && v31 === '1' && ['97', '98'].includes(v33)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V33-ERROR-006',
        variable: 'V33',
        titulo: 'Resultado HER2 no corresponde cuando la prueba fue realizada',
        mensaje: 'V31=1 indica que HER2 sí se realizó antes del tratamiento, pero V33 está registrada como no aplica.',
        regla: 'Cuando HER2 se realizó, V33 debe registrar el resultado real o 99 si el resultado no está documentado.',
        recomendacion: 'Use 1, 2, 3 o 4 según el resultado HER2. Use 99 si el resultado no aparece en soportes. No use 97 ni 98 cuando V31=1.',
        tipo: TIPO.DEPENDENCIA,
        datosRelacionados: [dato(registro, 'V31'), dato(registro, 'V33')],
        columnasCorregir: ['V31', 'V33']
      }));
    }


    if (mama && v31 === '1' && v33 === '99') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V33-ADVERTENCIA-007',
        variable: 'V33',
        titulo: 'Resultado HER2 desconocido aunque la prueba fue realizada',
        mensaje: 'V31 tiene el valor 1, que indica que HER2 sí se realizó antes del tratamiento, pero V33 tiene el valor 99, que significa resultado desconocido.',
        regla: 'Si HER2 sí fue realizado, normalmente debería existir un resultado en los soportes clínicos. Usar 99 deja el resultado como desconocido y puede afectar la calidad del reporte.',
        recomendacion: 'Revise el soporte de HER2 o el reporte de patología. Si encuentra el resultado, cambie V33 por el código correspondiente. Mantenga 99 solo si el resultado no aparece en los soportes.',
        severidad: SEVERIDAD.ADVERTENCIA,
        tipo: TIPO.COHERENCIA,
        datosRelacionados: [
          dato(registro, 'V31', 'Indica si HER2 se realizó antes del inicio del tratamiento.'),
          dato(registro, 'V33', 'Resultado HER2 reportado.')
        ],
        columnasCorregir: ['V31', 'V33']
      }));
    }
  }

  function validar(registro) {
    const hallazgos = [];
    const fila = registro || {};

    if (Object.prototype.hasOwnProperty.call(fila, 'V30')) {
      validarFechaV30(fila, hallazgos);
    }

    if (Object.prototype.hasOwnProperty.call(fila, 'V31')) {
      validarV31(fila, hallazgos);
    }

    if (Object.prototype.hasOwnProperty.call(fila, 'V32')) {
      validarV32(fila, hallazgos);
    }

    if (Object.prototype.hasOwnProperty.call(fila, 'V33')) {
      validarV33(fila, hallazgos);
    }

    return hallazgos;
  }

  window.CACModulo5 = {
    version: VERSION,
    validar,
    _interno: {
      CIE10_MAMA_MALIGNO: Array.from(CIE10_MAMA_MALIGNO),
      CIE10_MAMA_IN_SITU: Array.from(CIE10_MAMA_IN_SITU),
      esCancerMama,
      esCancerMamaMaligno,
      esCancerMamaInSitu
    }
  };
})();
