
(function () {
  'use strict';

  const VERSION = 'sprint-3a-v40-objetivo-tratamiento-01';

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
    V7: 'Fecha de nacimiento',
    V17: 'Código CIE-10 de la neoplasia maligna reportada',
    V18: 'Fecha de diagnóstico del cáncer reportado',
    V21: 'Tipo de estudio con el que se realizó el diagnóstico',
    V36: 'Estadificación clínica Ann Arbor/Lugano',
    V37: 'Clasificación Gleason para cáncer de próstata',
    V38: 'Clasificación del riesgo',
    V39: 'Fecha de clasificación de riesgo',
    V40: 'Objetivo o intención del tratamiento médico inicial'
  };

  const COMODIN_DESCONOCIDO = '1800-01-01';
  const COMODIN_NO_APLICA = '1845-01-01';

  const CATALOGO_V36 = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','98','99'];
  const CODIGOS_V36_REALES = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'];

  const CATALOGO_V37 = ['11','12','13','14','15','97','98','99'];
  const CODIGOS_V37_GLEASON = ['11','12','13','14','15'];
  const CODIGOS_V37_HISTORICOS = ['1','2','3','4','5','6','7','8','9','10'];
  const CIE10_PROSTATA = new Set(['C61X','D075']);

  const CATALOGO_V38 = ['1','2','3','4','5','98','99'];
  const CODIGOS_V38_RIESGO = ['1','2','3','4','5'];
  const CODIGOS_V38_HISTORICOS = ['6','7','8','9','10','11','12','13'];

  const CATALOGO_V40 = ['1','2','3','99'];

  const CIE10_LINFOMA_HODGKIN = new Set(['C810','C811','C812','C813','C814','C817','C819']);

  const CIE10_LINFOMA_NO_HODGKIN = new Set([
    'C820','C821','C822','C823','C824','C825','C826','C827','C829',
    'C830','C831','C832','C833','C834','C835','C836','C837','C838','C839',
    'C840','C841','C842','C843','C844','C845','C846','C847','C848','C849',
    'C850','C851','C852','C857','C859',
    'C860','C861','C862','C863','C864','C865','C866','C884',
    'C960','C961','C962','C963','C967','C969'
  ]);

  const CIE10_LLA = new Set(['C910','C918']);
  const CIE10_LMA = new Set(['C920','C924','C925','C926','C928','C930','C933','C940','C942']);

  const CIE10_GRUPO_24_NO_CLASIFICADO_V38 = new Set([
    'C901','C902','C903','C911','C912','C913','C914','C915','C916','C917','C919',
    'C921','C922','C923','C927','C929','C931','C932','C937','C939',
    'D45X','D460','D461','D462','D463','D464','D465','D466','D467','D469'
  ]);

  function texto(valor) {
    return String(valor ?? '').trim();
  }

  function textoMayuscula(valor) {
    return texto(valor).toUpperCase().replace(/\s+/g, '');
  }

  function estaVacio(valor) {
    return texto(valor) === '';
  }

  function esEntero(valor) {
    return /^\d+$/.test(texto(valor));
  }

  function nombreVariable(variable) {
    return NOMBRES_VARIABLES[variable] || variable;
  }

  function dato(registro, variable, nota = '') {
    return CACTipos.crearDatoRelacionado(
      variable,
      nombreVariable(variable),
      texto(registro ? registro[variable] : ''),
      nota
    );
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
      datosRelacionados: datosRelacionados || [],
      columnasCorregir: columnasCorregir || [variable]
    };
  }

  function crearHallazgoRegistro(registro, opciones) {
    return crearHallazgo({
      ...opciones,
      valor: opciones.valor ?? registro[opciones.variable],
      datosRelacionados: opciones.datosRelacionados || [dato(registro, opciones.variable)],
      columnasCorregir: opciones.columnasCorregir || [opciones.variable]
    });
  }

  function significadoV36(valor) {
    const mapa = {
      '1': 'Estadio I',
      '2': 'Estadio II',
      '3': 'Estadio III',
      '4': 'Estadio IV',
      '5': 'Estadio IA',
      '6': 'Estadio IB',
      '7': 'Estadio IIA',
      '8': 'Estadio IIB',
      '9': 'Estadio IIIA',
      '10': 'Estadio IIIB',
      '11': 'Estadio IVA',
      '12': 'Estadio IVB',
      '13': 'Extranodal cualquier estadio',
      '14': 'Primario SNC',
      '15': 'Primario mediastinal',
      '16': 'Primario de otros órganos',
      '98': 'no aplica',
      '99': 'desconocido'
    };

    return mapa[texto(valor)] || 'valor no reconocido';
  }

  function catalogoV36Texto() {
    return [
      'Catálogo V36:',
      '1 = Estadio I.',
      '2 = Estadio II.',
      '3 = Estadio III.',
      '4 = Estadio IV.',
      '5 = Estadio IA.',
      '6 = Estadio IB.',
      '7 = Estadio IIA.',
      '8 = Estadio IIB.',
      '9 = Estadio IIIA.',
      '10 = Estadio IIIB.',
      '11 = Estadio IVA.',
      '12 = Estadio IVB.',
      '13 = Extranodal cualquier estadio.',
      '14 = Primario SNC.',
      '15 = Primario mediastinal.',
      '16 = Primario de otros órganos.',
      '98 = No aplica.',
      '99 = Desconocido.'
    ].join('\n');
  }

  function esLinfomaHodgkin(v17) {
    return CIE10_LINFOMA_HODGKIN.has(textoMayuscula(v17));
  }

  function esLinfomaNoHodgkin(v17) {
    return CIE10_LINFOMA_NO_HODGKIN.has(textoMayuscula(v17));
  }

  function esMielomaMultiple(v17) {
    return textoMayuscula(v17) === 'C900';
  }

  function aplicaV36(v17) {
    return esLinfomaHodgkin(v17) || esLinfomaNoHodgkin(v17) || esMielomaMultiple(v17);
  }

  function descripcionDiagnostico(v17) {
    const codigo = textoMayuscula(v17);

    if (!codigo) return 'V17 está vacío.';
    if (esLinfomaHodgkin(codigo)) return `${codigo} corresponde a Linfoma Hodgkin.`;
    if (esLinfomaNoHodgkin(codigo)) return `${codigo} corresponde a Linfoma No Hodgkin.`;
    if (esMielomaMultiple(codigo)) return `${codigo} corresponde a Mieloma múltiple.`;
    if (CIE10_LLA.has(codigo)) return `${codigo} corresponde a Leucemia Linfocítica Aguda.`;
    if (CIE10_LMA.has(codigo)) return `${codigo} corresponde a Leucemia Mielocítica Aguda.`;
    if (CIE10_PROSTATA.has(codigo)) return `${codigo} corresponde a cáncer de próstata.`;
    if (codigo === 'C509') return `${codigo} corresponde a cáncer de mama.`;
    if (codigo === 'C180') return `${codigo} corresponde a cáncer de colon.`;
    if (codigo === 'C911') return `${codigo} corresponde a un diagnóstico hematopoyético no clasificado automáticamente para esta regla.`;

    return `${codigo} no está clasificado automáticamente para esta regla.`;
  }

  function notaNoAplicaV36(v17) {
    const codigo = textoMayuscula(v17);
    if (!codigo) return 'V17 está vacío; no se puede confirmar si aplica Ann Arbor/Lugano.';
    return `${codigo} no corresponde a Linfoma Hodgkin, Linfoma No Hodgkin ni Mieloma múltiple para esta validación.`;
  }

  function validarV36(registro, hallazgos) {
    if (!Object.prototype.hasOwnProperty.call(registro, 'V36')) return;

    const v17 = textoMayuscula(registro.V17);
    const v36 = texto(registro.V36);
    const aplica = aplicaV36(v17);

    if (!v36) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V36-ERROR-001',
        variable: 'V36',
        titulo: 'Estadificación Ann Arbor/Lugano vacía',
        mensaje: 'V36 está vacía. Esta variable debe tener un código de Ann Arbor/Lugano o el código que indique que no aplica.',
        regla: ['V36 no debe quedar vacía.', '', catalogoV36Texto()].join('\n'),
        recomendacion: 'Si aplica y el estadio está documentado, use un código entre 1 y 16. Si no aplica, use 98. Si aplica pero no está documentado, use 99.',
        tipo: TIPO.FORMATO,
        datosRelacionados: [dato(registro, 'V36', 'V36 está vacía.')],
        columnasCorregir: ['V36']
      }));
      return;
    }

    if (!esEntero(v36) || !CATALOGO_V36.includes(v36)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V36-ERROR-002',
        variable: 'V36',
        titulo: 'Código de Ann Arbor/Lugano no permitido',
        mensaje: `V36 tiene el valor ${v36}. Ese valor no pertenece al catálogo permitido para Ann Arbor/Lugano.`,
        regla: ['V36 solo acepta los códigos definidos por el instructivo.', '', catalogoV36Texto()].join('\n'),
        recomendacion: 'Cambie V36 por un código permitido.',
        tipo: TIPO.CATALOGO,
        datosRelacionados: [dato(registro, 'V36', `${v36} no pertenece al catálogo permitido.`)],
        columnasCorregir: ['V36']
      }));
      return;
    }

    if (aplica && v36 === '98') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V36-ERROR-003',
        variable: 'V36',
        titulo: 'Ann Arbor/Lugano marcado como no aplica en diagnóstico donde sí aplica',
        mensaje: `V36 tiene el valor 98, que significa no aplica. Sin embargo, V17 tiene el valor ${v17}, que ${descripcionDiagnostico(v17).replace(`${v17} `, '')} y para ese diagnóstico sí aplica Ann Arbor/Lugano.`,
        regla: 'V36 debe diligenciarse cuando el diagnóstico corresponde a Linfoma Hodgkin, Linfoma No Hodgkin o Mieloma múltiple.',
        recomendacion: 'Si el estadio está documentado, cambie V36 por el código correspondiente. Si no está documentado, use 99.',
        tipo: TIPO.DEPENDENCIA,
        datosRelacionados: [
          dato(registro, 'V17', descripcionDiagnostico(v17)),
          dato(registro, 'V36', '98 significa no aplica.')
        ],
        columnasCorregir: ['V17', 'V36']
      }));
      return;
    }

    if (!aplica && CODIGOS_V36_REALES.includes(v36)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V36-ERROR-004',
        variable: 'V36',
        titulo: 'Ann Arbor/Lugano reportado en diagnóstico que no aplica',
        mensaje: `V36 tiene el valor ${v36}, que significa ${significadoV36(v36)}. Sin embargo, V17 tiene el valor ${v17}, que ${descripcionDiagnostico(v17).replace(`${v17} `, '')} y para ese diagnóstico no aplica Ann Arbor/Lugano.`,
        regla: 'Ann Arbor/Lugano aplica para Linfoma Hodgkin, Linfoma No Hodgkin y Mieloma múltiple. Si el diagnóstico es diferente, V36 debe ser 98.',
        recomendacion: 'Si V17 no corresponde a linfoma ni mieloma múltiple, cambie V36 a 98. Si el diagnóstico está mal, corrija V17.',
        tipo: TIPO.DEPENDENCIA,
        datosRelacionados: [
          dato(registro, 'V17', notaNoAplicaV36(v17)),
          dato(registro, 'V36', `${v36} significa ${significadoV36(v36)}.`)
        ],
        columnasCorregir: ['V17', 'V36']
      }));
      return;
    }

    if (aplica && v36 === '99') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V36-ADVERTENCIA-001',
        variable: 'V36',
        titulo: 'Ann Arbor/Lugano desconocido',
        mensaje: `V36 tiene el valor 99, que significa estadificación desconocida. V17 tiene el valor ${v17}, que ${descripcionDiagnostico(v17).replace(`${v17} `, '')}`,
        regla: 'El valor 99 es permitido cuando la estadificación no está descrita en los soportes clínicos.',
        recomendacion: 'Si encuentra el estadio, cambie V36 por el código correspondiente. Si no está documentado, mantenga 99.',
        severidad: SEVERIDAD.ADVERTENCIA,
        tipo: TIPO.COHERENCIA,
        datosRelacionados: [
          dato(registro, 'V17', descripcionDiagnostico(v17)),
          dato(registro, 'V36', '99 significa estadificación desconocida.')
        ],
        columnasCorregir: ['V36']
      }));
    }
  }

  function significadoV37(valor) {
    const mapa = {
      '11': 'Gleason menor o igual a 6, por ejemplo 3+3',
      '12': 'Gleason 7: 3+4',
      '13': 'Gleason 7: 4+3',
      '14': 'Gleason 8: 4+4, 3+5 o 5+3',
      '15': 'Gleason 9 o 10: 4+5, 5+4 o 5+5',
      '97': 'cáncer de próstata con diagnóstico clínico',
      '98': 'no es cáncer de próstata',
      '99': 'diagnóstico histopatológico sin información de Gleason'
    };
    return mapa[texto(valor)] || 'valor no reconocido';
  }

  function catalogoV37Texto() {
    return [
      'Catálogo V37:',
      '11 = Gleason ≤ 6, por ejemplo 3+3.',
      '12 = Gleason 7: 3+4.',
      '13 = Gleason 7: 4+3.',
      '14 = Gleason 8: 4+4, 3+5 o 5+3.',
      '15 = Gleason 9 o 10: 4+5, 5+4 o 5+5.',
      '97 = Cáncer de próstata con diagnóstico clínico.',
      '98 = No es cáncer de próstata.',
      '99 = Cáncer de próstata confirmado por histopatología, pero sin información de Gleason.'
    ].join('\n');
  }

  function esCancerProstata(v17) {
    return CIE10_PROSTATA.has(textoMayuscula(v17));
  }

  function validarV37(registro, hallazgos) {
    if (!Object.prototype.hasOwnProperty.call(registro, 'V37')) return;

    const v17 = textoMayuscula(registro.V17);
    const v21 = texto(registro.V21);
    const v37 = texto(registro.V37);
    const prostata = esCancerProstata(v17);

    if (!v37) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V37-ERROR-001',
        variable: 'V37',
        titulo: 'Clasificación Gleason vacía',
        mensaje: 'V37 está vacía. Esta variable debe tener un código de Gleason o el código que indique que no aplica.',
        regla: ['V37 no debe quedar vacía.', '', catalogoV37Texto()].join('\n'),
        recomendacion: 'Si V17 corresponde a próstata, registre 11, 12, 13, 14, 15, 97 o 99 según el soporte. Si no corresponde a próstata, use 98.',
        tipo: TIPO.FORMATO,
        datosRelacionados: [dato(registro, 'V37', 'V37 está vacía.')],
        columnasCorregir: ['V37']
      }));
      return;
    }

    if (CODIGOS_V37_HISTORICOS.includes(v37)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V37-ADVERTENCIA-002',
        variable: 'V37',
        titulo: 'Código histórico de Gleason',
        mensaje: `V37 tiene el valor ${v37}. Ese valor corresponde a una codificación histórica de Gleason y no hace parte del catálogo actual usado normalmente en este validador.`,
        regla: 'Los códigos 1 a 10 son históricos. Este archivo no tiene una variable que confirme si el paciente fue reportado por primera vez o si es un registro histórico.',
        recomendacion: 'Si el caso es nuevo, cambie V37 por un código actual. Si corresponde a un registro histórico permitido, verifique el soporte antes de modificarlo.',
        severidad: SEVERIDAD.ADVERTENCIA,
        tipo: TIPO.CATALOGO,
        datosRelacionados: [dato(registro, 'V37', `${v37} corresponde a un código histórico de Gleason.`)],
        columnasCorregir: ['V37']
      }));
      return;
    }

    if (!esEntero(v37) || !CATALOGO_V37.includes(v37)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V37-ERROR-002',
        variable: 'V37',
        titulo: 'Código de Gleason no permitido',
        mensaje: `V37 tiene el valor ${v37}. Ese valor no pertenece al catálogo permitido para Gleason.`,
        regla: ['V37 solo acepta los códigos definidos por el instructivo.', '', catalogoV37Texto()].join('\n'),
        recomendacion: 'Cambie V37 por un código permitido.',
        tipo: TIPO.CATALOGO,
        datosRelacionados: [dato(registro, 'V37', `${v37} no pertenece al catálogo permitido.`)],
        columnasCorregir: ['V37']
      }));
      return;
    }

    if (prostata && v37 === '98') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V37-ERROR-004',
        variable: 'V37',
        titulo: 'Gleason marcado como no aplica en cáncer de próstata',
        mensaje: `V37 tiene el valor 98, que significa no es cáncer de próstata. Sin embargo, V17 tiene el valor ${v17}, que corresponde a cáncer de próstata.`,
        regla: 'Cuando V17 corresponde a cáncer de próstata, V37 no debe quedar como “no es cáncer de próstata”. Debe reportar la clasificación Gleason o el comodín que corresponda.',
        recomendacion: 'Si existe Gleason en el reporte histopatológico, use 11, 12, 13, 14 o 15. Si el diagnóstico fue clínico, use 97. Si fue histopatológico pero no hay información de Gleason, use 99.',
        tipo: TIPO.DEPENDENCIA,
        datosRelacionados: [
          dato(registro, 'V17', `${v17} corresponde a cáncer de próstata.`),
          dato(registro, 'V37', '98 significa no es cáncer de próstata.')
        ],
        columnasCorregir: ['V17', 'V37']
      }));
      return;
    }

    if (!prostata && CODIGOS_V37_GLEASON.includes(v37)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V37-ERROR-005',
        variable: 'V37',
        titulo: 'Gleason reportado en diagnóstico que no es próstata',
        mensaje: `V37 tiene el valor ${v37}, que significa ${significadoV37(v37)}. Sin embargo, V17 tiene el valor ${v17}, que ${descripcionDiagnostico(v17).replace(`${v17} `, '')} y para ese diagnóstico no aplica Gleason.`,
        regla: 'Gleason aplica solo para cáncer de próstata. Si el diagnóstico es diferente, V37 debe ser 98.',
        recomendacion: 'Si V17 no corresponde a cáncer de próstata, cambie V37 a 98. Si el diagnóstico está mal, corrija V17.',
        tipo: TIPO.DEPENDENCIA,
        datosRelacionados: [
          dato(registro, 'V17', descripcionDiagnostico(v17)),
          dato(registro, 'V37', `${v37} significa ${significadoV37(v37)}.`)
        ],
        columnasCorregir: ['V17', 'V37']
      }));
      return;
    }

    if (prostata && v21 === '7' && v37 !== '97') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V37-ERROR-006',
        variable: 'V37',
        titulo: 'Diagnóstico clínico de próstata con código Gleason',
        mensaje: `V37 tiene el valor ${v37}, que significa ${significadoV37(v37)}. Sin embargo, V21 tiene el valor 7, que significa diagnóstico clínico exclusivamente. Si el diagnóstico fue clínico, no se debe reportar un valor Gleason; debe usarse 97.`,
        regla: 'El Gleason se toma del estudio histopatológico. Si el diagnóstico fue clínico exclusivamente, corresponde usar el código 97.',
        recomendacion: 'Si el diagnóstico fue clínico, cambie V37 a 97. Si sí hubo histopatología, corrija V21.',
        tipo: TIPO.DEPENDENCIA,
        datosRelacionados: [
          dato(registro, 'V17', `${v17} corresponde a cáncer de próstata.`),
          dato(registro, 'V21', '7 significa diagnóstico clínico exclusivamente.'),
          dato(registro, 'V37', `${v37} significa ${significadoV37(v37)}.`)
        ],
        columnasCorregir: ['V21', 'V37']
      }));
      return;
    }

    if (prostata && v21 !== '7' && v37 === '99') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V37-ADVERTENCIA-001',
        variable: 'V37',
        titulo: 'Gleason no encontrado en cáncer de próstata',
        mensaje: 'V37 tiene el valor 99, que significa que el diagnóstico fue confirmado por histopatología, pero no se encontró información de Gleason.',
        regla: 'El valor 99 es permitido cuando no hay información de Gleason en el soporte clínico.',
        recomendacion: 'Busque el Gleason en el soporte clínico. Si aparece, use 11, 12, 13, 14 o 15. Si no aparece, mantenga 99.',
        severidad: SEVERIDAD.ADVERTENCIA,
        tipo: TIPO.COHERENCIA,
        datosRelacionados: [
          dato(registro, 'V17', `${v17} corresponde a cáncer de próstata.`),
          dato(registro, 'V21', `${v21} indica que hubo un estudio diagnóstico registrado.`),
          dato(registro, 'V37', '99 significa que no hay información de Gleason en el soporte.')
        ],
        columnasCorregir: ['V37']
      }));
    }
  }

  function significadoV38(valor) {
    const mapa = {
      '1': 'bajo riesgo / estándar / favorable',
      '2': 'riesgo intermedio bajo',
      '3': 'riesgo intermedio',
      '4': 'riesgo intermedio alto',
      '5': 'riesgo alto',
      '98': 'no aplica',
      '99': 'desconocido'
    };
    return mapa[texto(valor)] || 'valor no reconocido';
  }

  function catalogoV38GeneralTexto() {
    return [
      'Catálogo V38:',
      '1 = Bajo riesgo / estándar / favorable.',
      '2 = Riesgo intermedio bajo.',
      '3 = Riesgo intermedio.',
      '4 = Riesgo intermedio alto.',
      '5 = Riesgo alto.',
      '98 = No aplica.',
      '99 = Desconocido.'
    ].join('\n');
  }

  function catalogoV38ParaDiagnosticoTexto(categoria) {
    if (categoria === 'hodgkin') {
      return [
        'Catálogo permitido para Linfoma Hodgkin:',
        '1 = Bajo riesgo.',
        '5 = Riesgo alto.'
      ].join('\n');
    }

    if (categoria === 'lla' || categoria === 'lma' || categoria === 'mieloma') {
      return [
        'Catálogo permitido para este diagnóstico:',
        '1 = Riesgo estándar / bajo.',
        '3 = Riesgo intermedio.',
        '5 = Riesgo alto.'
      ].join('\n');
    }

    if (categoria === 'no_hodgkin') {
      return [
        'Catálogo permitido para Linfoma No Hodgkin:',
        '1 = Bajo riesgo.',
        '2 = Riesgo intermedio bajo.',
        '3 = Intermedio.',
        '4 = Riesgo intermedio alto.',
        '5 = Riesgo alto.'
      ].join('\n');
    }

    return catalogoV38GeneralTexto();
  }

  function clasificarDiagnosticoV38(v17) {
    const codigo = textoMayuscula(v17);

    if (esLinfomaHodgkin(codigo)) {
      return {
        aplica: true,
        categoria: 'hodgkin',
        descripcion: `${codigo} corresponde a Linfoma Hodgkin.`,
        permitidos: ['1','5'],
        nombreCatalogo: 'Linfoma Hodgkin'
      };
    }

    if (esLinfomaNoHodgkin(codigo)) {
      return {
        aplica: true,
        categoria: 'no_hodgkin',
        descripcion: `${codigo} corresponde a Linfoma No Hodgkin.`,
        permitidos: ['1','2','3','4','5'],
        nombreCatalogo: 'Linfoma No Hodgkin'
      };
    }

    if (CIE10_LLA.has(codigo)) {
      return {
        aplica: true,
        categoria: 'lla',
        descripcion: `${codigo} corresponde a Leucemia Linfocítica Aguda.`,
        permitidos: ['1','3','5'],
        nombreCatalogo: 'Leucemia Linfocítica Aguda'
      };
    }

    if (CIE10_LMA.has(codigo)) {
      return {
        aplica: true,
        categoria: 'lma',
        descripcion: `${codigo} corresponde a Leucemia Mielocítica Aguda.`,
        permitidos: ['1','3','5'],
        nombreCatalogo: 'Leucemia Mielocítica Aguda'
      };
    }

    if (esMielomaMultiple(codigo)) {
      return {
        aplica: true,
        categoria: 'mieloma',
        descripcion: `${codigo} corresponde a Mieloma múltiple.`,
        permitidos: ['1','3','5'],
        nombreCatalogo: 'Mieloma múltiple'
      };
    }

    return {
      aplica: false,
      categoria: 'no_aplica',
      descripcion: descripcionDiagnostico(codigo),
      permitidos: [],
      nombreCatalogo: 'No aplica'
    };
  }

  function esCodigoGrupo24NoClasificado(v17) {
    return CIE10_GRUPO_24_NO_CLASIFICADO_V38.has(textoMayuscula(v17));
  }

  function edadAlDiagnostico(registro) {
    if (!registro || typeof CACTipos.calcularEdad !== 'function') return null;
    return CACTipos.calcularEdad(texto(registro.V7), texto(registro.V18));
  }

  function esMenorEdadAlDiagnostico(registro) {
    const edad = edadAlDiagnostico(registro);
    return Number.isFinite(edad) && edad < 18;
  }

  function validarV38(registro, hallazgos) {
    if (!Object.prototype.hasOwnProperty.call(registro, 'V38')) return;

    const v17 = textoMayuscula(registro.V17);
    const v38 = texto(registro.V38);
    const clasificacion = clasificarDiagnosticoV38(v17);
    const edad = edadAlDiagnostico(registro);
    const menorEdad = esMenorEdadAlDiagnostico(registro);
    const riesgoRegistrado = CODIGOS_V38_RIESGO.includes(v38);
    const riesgoOPendienteRegistrado = riesgoRegistrado || v38 === '99';

    if (!v38) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V38-ERROR-001',
        variable: 'V38',
        titulo: 'Clasificación de riesgo vacía',
        mensaje: 'V38 está vacía. Esta variable debe tener un código de clasificación de riesgo o el código que indique que no aplica.',
        regla: ['V38 no debe quedar vacía.', '', catalogoV38GeneralTexto()].join('\n'),
        recomendacion: 'Revise el diagnóstico y registre el código que corresponda.',
        tipo: TIPO.FORMATO,
        datosRelacionados: [dato(registro, 'V38', 'V38 está vacía.')],
        columnasCorregir: ['V38']
      }));
      return;
    }

    if (CODIGOS_V38_HISTORICOS.includes(v38)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V38-ADVERTENCIA-001',
        variable: 'V38',
        titulo: 'Código histórico de riesgo',
        mensaje: `V38 tiene el valor ${v38}. Ese valor corresponde a una codificación histórica de riesgo y no hace parte del catálogo actual usado normalmente en este validador.`,
        regla: 'Los códigos 6 a 13 solo son válidos para pacientes reportados antes de 2021. Este archivo no tiene una variable que confirme si el caso es histórico o nuevo.',
        recomendacion: 'Si el caso no es histórico, cambie V38 por un código actual del catálogo. Si corresponde a un registro histórico permitido, verifique el soporte antes de modificarlo.',
        severidad: SEVERIDAD.ADVERTENCIA,
        tipo: TIPO.CATALOGO,
        datosRelacionados: [dato(registro, 'V38', `${v38} corresponde a un código histórico de riesgo.`)],
        columnasCorregir: ['V38']
      }));
      return;
    }

    if (!esEntero(v38) || !CATALOGO_V38.includes(v38)) {
      const mensajeError002 = clasificacion.aplica
        ? `V38 tiene el valor ${v38}. Ese valor no pertenece al catálogo permitido para clasificación de riesgo. Además, V17 tiene el valor ${v17}, que ${clasificacion.descripcion.replace(`${v17} `, '')} Para este diagnóstico debe usar uno de los códigos permitidos en V38.`
        : `V38 tiene el valor ${v38}. Ese valor no pertenece al catálogo permitido para clasificación de riesgo.`;

      const reglaError002 = clasificacion.aplica
        ? [
          'V38 solo acepta los códigos definidos por el instructivo. Cuando V17 permite identificar el tipo de diagnóstico, debe usarse el catálogo permitido para ese diagnóstico.',
          '',
          catalogoV38ParaDiagnosticoTexto(clasificacion.categoria)
        ].join('\n')
        : ['V38 solo acepta los códigos definidos por el instructivo.', '', catalogoV38GeneralTexto()].join('\n');

      const recomendacionError002 = clasificacion.aplica
        ? `Cambie V38 por un código permitido para ${clasificacion.nombreCatalogo}.`
        : 'Cambie V38 por un código permitido.';

      const datosError002 = clasificacion.aplica
        ? [
          dato(registro, 'V17', clasificacion.descripcion),
          dato(registro, 'V38', `${v38} no pertenece al catálogo permitido.`)
        ]
        : [dato(registro, 'V38', `${v38} no pertenece al catálogo permitido.`)];

      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V38-ERROR-002',
        variable: 'V38',
        titulo: 'Código de riesgo no permitido',
        mensaje: mensajeError002,
        regla: reglaError002,
        recomendacion: recomendacionError002,
        tipo: TIPO.CATALOGO,
        datosRelacionados: datosError002,
        columnasCorregir: clasificacion.aplica ? ['V17', 'V38'] : ['V38']
      }));
      return;
    }

    if (clasificacion.aplica && v38 === '98') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V38-ERROR-003',
        variable: 'V38',
        titulo: 'Riesgo marcado como no aplica en diagnóstico que requiere clasificación',
        mensaje: `V38 tiene el valor 98, que significa no aplica. Sin embargo, V17 tiene el valor ${v17}, que ${clasificacion.descripcion.replace(`${v17} `, '')} y para ese diagnóstico sí aplica clasificación de riesgo.`,
        regla: 'Cuando el diagnóstico corresponde a leucemia, linfoma o mieloma múltiple, V38 no debe quedar como “no aplica”.',
        recomendacion: 'Si el riesgo está documentado, use el código permitido para ese diagnóstico. Si no está documentado, use 99.',
        tipo: TIPO.DEPENDENCIA,
        datosRelacionados: [
          dato(registro, 'V17', clasificacion.descripcion),
          dato(registro, 'V38', '98 significa no aplica.')
        ],
        columnasCorregir: ['V17', 'V38']
      }));
      return;
    }

    if (clasificacion.aplica && riesgoRegistrado && !clasificacion.permitidos.includes(v38)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V38-ERROR-005',
        variable: 'V38',
        titulo: 'Código de riesgo no permitido para este diagnóstico',
        mensaje: `V38 tiene el valor ${v38}, que significa ${significadoV38(v38)}. Sin embargo, V17 tiene el valor ${v17}, que ${clasificacion.descripcion.replace(`${v17} `, '')} y para ese diagnóstico no se permite ese código de riesgo.`,
        regla: [
          `El catálogo de V38 cambia según el tipo de diagnóstico. Para ${clasificacion.nombreCatalogo}, use solo los códigos permitidos.`,
          '',
          catalogoV38ParaDiagnosticoTexto(clasificacion.categoria)
        ].join('\n'),
        recomendacion: 'Cambie V38 por un código permitido para ese diagnóstico.',
        tipo: TIPO.DEPENDENCIA,
        datosRelacionados: [
          dato(registro, 'V17', clasificacion.descripcion),
          dato(registro, 'V38', `${v38} significa ${significadoV38(v38)}.`)
        ],
        columnasCorregir: ['V17', 'V38']
      }));
      return;
    }

    if (!clasificacion.aplica && menorEdad && riesgoOPendienteRegistrado && !esCodigoGrupo24NoClasificado(v17)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V38-ADVERTENCIA-004',
        variable: 'V38',
        titulo: 'CATÁLOGO DE RIESGO PEDIÁTRICO NO OPERATIVO',
        mensaje: 'El paciente es menor de edad y V38 tiene una clasificación de riesgo registrada. Sin embargo, V17 no corresponde a leucemia, linfoma ni mieloma múltiple dentro de los diagnósticos que el validador maneja actualmente. El caso podría corresponder a un sólido pediátrico, pero el catálogo operativo de riesgo pediátrico aún no está parametrizado.',
        regla: 'Paciente menor de edad + V17 no corresponde a leucemia, linfoma ni mieloma múltiple + V38 tiene 1, 2, 3, 4, 5 o 99.',
        recomendacion: 'Revise manualmente si el diagnóstico corresponde a sólido pediátrico y si la clasificación de riesgo registrada aplica. Si no aplica, use 98.',
        severidad: SEVERIDAD.ADVERTENCIA,
        tipo: TIPO.COHERENCIA,
        datosRelacionados: [
          dato(registro, 'V7', Number.isFinite(edad) ? `Edad calculada al diagnóstico: ${edad} años.` : 'No fue posible calcular la edad al diagnóstico.'),
          dato(registro, 'V17', clasificacion.descripcion),
          dato(registro, 'V38', `${v38} significa ${significadoV38(v38)}.`)
        ],
        columnasCorregir: ['V7', 'V17', 'V38']
      }));
      return;
    }

    if (!clasificacion.aplica && riesgoRegistrado && !esCodigoGrupo24NoClasificado(v17)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V38-ERROR-004',
        variable: 'V38',
        titulo: 'Riesgo reportado en diagnóstico donde no aplica',
        mensaje: `V38 tiene el valor ${v38}, que significa ${significadoV38(v38)}. Sin embargo, V17 tiene el valor ${v17}, que ${clasificacion.descripcion.replace(`${v17} `, '')} y para ese diagnóstico no aplica esta clasificación de riesgo.`,
        regla: 'Esta clasificación de riesgo aplica para leucemias, linfomas y mieloma múltiple. Si el diagnóstico es diferente y no corresponde a un caso pediátrico pendiente de parametrización, V38 debe ser 98.',
        recomendacion: 'Si V17 no corresponde a leucemia, linfoma ni mieloma múltiple, cambie V38 a 98. Si el diagnóstico está mal, corrija V17.',
        tipo: TIPO.DEPENDENCIA,
        datosRelacionados: [
          dato(registro, 'V17', clasificacion.descripcion),
          dato(registro, 'V38', `${v38} significa ${significadoV38(v38)}.`)
        ],
        columnasCorregir: ['V17', 'V38']
      }));
      return;
    }

    if (esCodigoGrupo24NoClasificado(v17)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V38-ADVERTENCIA-003',
        variable: 'V38',
        titulo: 'Diagnóstico hematopoyético no clasificado automáticamente',
        mensaje: `V17 tiene el valor ${v17}. Este código pertenece a un grupo hematopoyético, pero no está dentro de los diagnósticos que el validador usa actualmente para aplicar V38 de forma automática.`,
        regla: 'No todos los códigos hematopoyéticos deben tratarse automáticamente igual que leucemias, linfomas o mieloma múltiple. Para evitar errores, este caso se marca como advertencia y no como bloqueo.',
        recomendacion: 'Revise el diagnóstico y el soporte clínico. Si para ese diagnóstico aplica clasificación de riesgo, registre 1, 2, 3, 4, 5 o 99 según el soporte. Si no aplica, use 98.',
        severidad: SEVERIDAD.ADVERTENCIA,
        tipo: TIPO.COHERENCIA,
        datosRelacionados: [
          dato(registro, 'V17', clasificacion.descripcion),
          dato(registro, 'V38', `${v38} significa ${significadoV38(v38)}.`)
        ],
        columnasCorregir: ['V17', 'V38']
      }));
      return;
    }

    if (v38 === '99') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V38-ADVERTENCIA-002',
        variable: 'V38',
        titulo: 'Riesgo desconocido',
        mensaje: 'V38 tiene el valor 99, que significa clasificación de riesgo desconocida.',
        regla: 'El valor 99 es permitido cuando la clasificación de riesgo no está documentada o cuando el caso aplica según el instructivo y aún no alcanzó la consulta de clasificación.',
        recomendacion: 'Busque la clasificación de riesgo en el soporte clínico. Si encuentra el riesgo, cambie V38 por el código correspondiente. Si no está documentado, mantenga 99.',
        severidad: SEVERIDAD.ADVERTENCIA,
        tipo: TIPO.COHERENCIA,
        datosRelacionados: [
          dato(registro, 'V17', clasificacion.descripcion),
          dato(registro, 'V38', '99 significa clasificación de riesgo desconocida.')
        ],
        columnasCorregir: ['V38']
      }));
    }
  }

  function esFechaISO(valor) {
    return typeof CACTipos.esFechaISO === 'function'
      ? CACTipos.esFechaISO(valor)
      : /^\d{4}-\d{2}-\d{2}$/.test(texto(valor));
  }

  function esFechaReal(valor) {
    const fecha = texto(valor);
    return esFechaISO(fecha) && fecha !== COMODIN_DESCONOCIDO && fecha !== COMODIN_NO_APLICA;
  }

  function fechaEsIgualOPosterior(fecha, corte) {
    if (!esFechaReal(fecha) || !esFechaReal(corte)) return false;
    return CACTipos.compararFechas(texto(fecha), texto(corte)) !== -1;
  }

  function validarV39(registro, hallazgos) {
    if (!Object.prototype.hasOwnProperty.call(registro, 'V39')) return;

    const v38 = texto(registro.V38);
    const v39 = texto(registro.V39);

    if (!v39) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V39-ERROR-001',
        variable: 'V39',
        titulo: 'Fecha de clasificación de riesgo vacía',
        mensaje: 'V39 está vacía. Debe tener una fecha válida o un comodín permitido.',
        regla: 'V39 debe registrar la fecha de clasificación de riesgo, 1800-01-01 si es desconocida o 1845-01-01 si no aplica.',
        recomendacion: 'Si V38 es 98, use 1845-01-01. Si V38 aplica pero la fecha no está documentada, use 1800-01-01.',
        tipo: TIPO.FORMATO,
        datosRelacionados: [
          dato(registro, 'V38', `${v38} significa ${significadoV38(v38)}.`),
          dato(registro, 'V39', 'V39 está vacía.')
        ],
        columnasCorregir: ['V39']
      }));
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(v39) || !esFechaISO(v39)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V39-ERROR-002',
        variable: 'V39',
        titulo: 'Fecha de clasificación de riesgo inválida',
        mensaje: `V39 tiene el valor ${v39}. Debe estar en formato AAAA-MM-DD y ser una fecha existente.`,
        regla: 'V39 debe escribirse en formato AAAA-MM-DD.',
        recomendacion: 'Corrija V39 con una fecha válida.',
        tipo: TIPO.FORMATO,
        datosRelacionados: [dato(registro, 'V39', `${v39} no es una fecha válida.`)],
        columnasCorregir: ['V39']
      }));
      return;
    }

    if (v38 === '98' && v39 !== COMODIN_NO_APLICA) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V39-ERROR-005',
        variable: 'V39',
        titulo: 'V39 debe ser no aplica cuando V38 no aplica',
        mensaje: `V38 tiene el valor 98, que significa no aplica. Por eso V39 debe tener 1845-01-01.`,
        regla: 'Si V38 es 98, V39 debe ser 1845-01-01.',
        recomendacion: 'Cambie V39 a 1845-01-01.',
        tipo: TIPO.COHERENCIA,
        datosRelacionados: [
          dato(registro, 'V38', '98 significa no aplica.'),
          dato(registro, 'V39', `${v39} no corresponde a no aplica.`)
        ],
        columnasCorregir: ['V38', 'V39']
      }));
      return;
    }

    if (v38 !== '98' && v39 === COMODIN_NO_APLICA && !estaVacio(v38)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V39-ERROR-006',
        variable: 'V39',
        titulo: 'V39 no puede ser no aplica cuando V38 sí aplica',
        mensaje: `V39 tiene 1845-01-01, que significa no aplica. Sin embargo, V38 tiene el valor ${v38}, que significa ${significadoV38(v38)}.`,
        regla: 'Si V38 tiene 1, 2, 3, 4, 5, 99 o un código histórico, V39 debe ser una fecha real o 1800-01-01 si es desconocida.',
        recomendacion: 'Cambie V39 por la fecha real de clasificación de riesgo o por 1800-01-01 si no está documentada.',
        tipo: TIPO.COHERENCIA,
        datosRelacionados: [
          dato(registro, 'V38', `${v38} significa ${significadoV38(v38)}.`),
          dato(registro, 'V39', '1845-01-01 significa no aplica.')
        ],
        columnasCorregir: ['V38', 'V39']
      }));
      return;
    }

    if (v39 === COMODIN_DESCONOCIDO && v38 !== '98') {
      const diagnosticoDesdeCorte = fechaEsIgualOPosterior(registro.V18, '2024-11-01');

      if (diagnosticoDesdeCorte) {
        hallazgos.push(crearHallazgoRegistro(registro, {
          codigo: 'V39-ADVERTENCIA-002',
          variable: 'V39',
          titulo: 'Fecha de clasificación de riesgo desconocida con diagnóstico reciente',
          mensaje: `V39 tiene el valor 1800-01-01, que significa fecha desconocida. V18 tiene el valor ${texto(registro.V18)}, que corresponde a un diagnóstico a partir del 1 de noviembre de 2024. El instructivo permite usar 1800-01-01 si el paciente no alcanzó a tener la consulta donde se realiza la clasificación del riesgo.`,
          regla: 'Para diagnósticos de cáncer a partir del 1 de noviembre de 2024, si el paciente no alcanzó la consulta donde se clasifica el riesgo, se reporta 1800-01-01 en V39 y debe revisarse la novedad correspondiente en V128 cuando esa variable esté disponible.',
          recomendacion: 'Revise si el paciente no alcanzó la consulta de clasificación de riesgo. Cuando V128 esté implementada, confirme que tenga una novedad compatible: 2, 10 o 13.',
          severidad: SEVERIDAD.ADVERTENCIA,
          tipo: TIPO.COHERENCIA,
          datosRelacionados: [
            dato(registro, 'V18', `${texto(registro.V18)} es la fecha de diagnóstico del cáncer reportado.`),
            dato(registro, 'V38', `${v38} significa ${significadoV38(v38)}.`),
            dato(registro, 'V39', '1800-01-01 significa fecha desconocida.'),
            CACTipos.crearDatoRelacionado('V128', 'Novedad administrativa pendiente', '', 'Pendiente de validar cuando V128 esté implementada; el instructivo menciona novedades 2, 10 o 13.')
          ],
          columnasCorregir: ['V18', 'V39']
        }));
      } else {
        hallazgos.push(crearHallazgoRegistro(registro, {
          codigo: 'V39-ADVERTENCIA-001',
          variable: 'V39',
          titulo: 'Fecha de clasificación de riesgo desconocida',
          mensaje: 'V39 tiene el valor 1800-01-01, que significa fecha desconocida.',
          regla: 'El valor 1800-01-01 es permitido cuando la fecha no está descrita en los soportes clínicos.',
          recomendacion: 'Busque la fecha en el soporte clínico. Si aparece, registre la fecha real. Si no aparece, mantenga 1800-01-01.',
          severidad: SEVERIDAD.ADVERTENCIA,
          tipo: TIPO.COHERENCIA,
          datosRelacionados: [
            dato(registro, 'V38', `${v38} significa ${significadoV38(v38)}.`),
            dato(registro, 'V39', '1800-01-01 significa fecha desconocida.')
          ],
          columnasCorregir: ['V39']
        }));
      }
    }

    if (esFechaReal(v39) && esFechaReal(registro.V18)) {
      const comparacion = CACTipos.compararFechas(v39, texto(registro.V18));
      if (comparacion === -1) {
        hallazgos.push(crearHallazgoRegistro(registro, {
          codigo: 'V39-ERROR-004',
          variable: 'V39',
          titulo: 'Fecha de clasificación de riesgo anterior al diagnóstico',
          mensaje: 'V39 está antes de V18. La fecha de clasificación de riesgo aparece anterior a la fecha de diagnóstico del cáncer reportado.',
          regla: 'La clasificación de riesgo debe registrarse después del diagnóstico o en el mismo momento clínico.',
          recomendacion: 'Revise V18 y V39. Corrija la fecha que no corresponda.',
          tipo: TIPO.COHERENCIA,
          datosRelacionados: [
            dato(registro, 'V18', 'Fecha de diagnóstico del cáncer reportado.'),
            dato(registro, 'V39', 'Fecha de clasificación de riesgo.')
          ],
          columnasCorregir: ['V18', 'V39']
        }));
      }
    }
  }

  function validarV40(registro, hallazgos) {
    if (!Object.prototype.hasOwnProperty.call(registro, 'V40')) return;

    const v40 = texto(registro.V40);

    if (!v40) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V40-ERROR-001',
        variable: 'V40',
        titulo: 'Objetivo del tratamiento inicial vacío',
        mensaje: 'V40 está vacía. Esta variable debe registrar el objetivo o intención del tratamiento médico inicial al momento del diagnóstico.',
        regla: 'V40 no debe quedar vacía. La información corresponde a la decisión registrada al momento del diagnóstico y no es modificable en el tiempo.',
        recomendacion: 'Revise el soporte clínico inicial y registre 1, 2, 3 o 99 según corresponda.',
        tipo: TIPO.FORMATO,
        datosRelacionados: [dato(registro, 'V40', 'V40 está vacía.')],
        columnasCorregir: ['V40']
      }));
      return;
    }

    if (!CATALOGO_V40.includes(v40)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V40-ERROR-002',
        variable: 'V40',
        titulo: 'Código de objetivo de tratamiento no permitido',
        mensaje: `V40 tiene el valor ${v40}. Ese valor no pertenece al catálogo permitido para el objetivo o intención del tratamiento médico inicial.`,
        regla: ['V40 solo acepta los códigos definidos por el instructivo.', '', 'Catálogo permitido V40:', '1 = Curación.', '2 = Paliación exclusivamente.', '3 = Manejo expectante una vez se ha realizado el diagnóstico.', '99 = Desconocido.'].join('\n'),
        recomendacion: 'Cambie V40 por un código permitido según la decisión médica registrada al momento del diagnóstico.',
        tipo: TIPO.CATALOGO,
        datosRelacionados: [dato(registro, 'V40', `${v40} no pertenece al catálogo permitido.`)],
        columnasCorregir: ['V40']
      }));
      return;
    }

    if (v40 === '99') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V40-ADVERTENCIA-001',
        variable: 'V40',
        titulo: 'Objetivo del tratamiento inicial desconocido',
        mensaje: 'V40 tiene el valor 99, que significa objetivo del tratamiento médico inicial desconocido.',
        regla: 'El valor 99 es permitido cuando el objetivo o intención del tratamiento médico inicial no está descrito en los soportes clínicos.',
        recomendacion: 'Revise el soporte clínico inicial. Si encuentra la intención terapéutica, use 1, 2 o 3. Si no está documentada, mantenga 99.',
        severidad: SEVERIDAD.ADVERTENCIA,
        tipo: TIPO.COHERENCIA,
        datosRelacionados: [dato(registro, 'V40', '99 significa objetivo del tratamiento médico inicial desconocido.')],
        columnasCorregir: ['V40']
      }));
    }
  }

  function validar(registro) {
    const hallazgos = [];
    const fila = registro || {};

    validarV36(fila, hallazgos);
    validarV37(fila, hallazgos);
    validarV38(fila, hallazgos);
    validarV39(fila, hallazgos);
    validarV40(fila, hallazgos);

    return hallazgos;
  }

  window.CACModulo7 = {
    version: VERSION,
    validar,
    _interno: {
      CIE10_LINFOMA_HODGKIN: Array.from(CIE10_LINFOMA_HODGKIN),
      CIE10_LINFOMA_NO_HODGKIN: Array.from(CIE10_LINFOMA_NO_HODGKIN),
      CIE10_LLA: Array.from(CIE10_LLA),
      CIE10_LMA: Array.from(CIE10_LMA),
      CIE10_PROSTATA: Array.from(CIE10_PROSTATA),
      CIE10_GRUPO_24_NO_CLASIFICADO_V38: Array.from(CIE10_GRUPO_24_NO_CLASIFICADO_V38),
      clasificarDiagnosticoV38,
      edadAlDiagnostico
    }
  };
})();
