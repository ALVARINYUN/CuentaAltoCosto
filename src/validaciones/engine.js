(function () {
  'use strict';

  const VERSION = 'sprint-3n-v118-engine-modulo19-01';

  function obtenerDocumento(registro) {
    const tipo = CACTipos.textoMayuscula(registro.V5);
    const numero = CACTipos.texto(registro.V6);

    if (!tipo && !numero) {
      return 'Sin documento';
    }

    return `${tipo} ${numero}`.trim();
  }

  function normalizarEncabezado(encabezado) {
    if (window.CACEstructura && typeof window.CACEstructura.normalizarEncabezado === 'function') {
      return window.CACEstructura.normalizarEncabezado(encabezado);
    }

    if (window.CACModulo1 && typeof window.CACModulo1.normalizarEncabezadoCAC === 'function') {
      return window.CACModulo1.normalizarEncabezadoCAC(encabezado);
    }

    return String(encabezado ?? '').trim().toUpperCase();
  }

  function normalizarValor(valor) {
    if (valor === null || valor === undefined) {
      return '';
    }

    return CACTipos.textoOriginal(valor);
  }

  function copiarMetadatosFila(origen, destino) {
    if (!origen || typeof origen !== 'object') return;

    if (origen.__filaExcel) {
      destino.__filaExcel = origen.__filaExcel;
      destino.__fila = origen.__filaExcel;
    }

    if (origen.__fila) {
      destino.__fila = origen.__fila;
    }

    if (origen.__hoja) {
      destino.__hoja = origen.__hoja;
    }
  }

  function normalizarFilaObjeto(fila) {
    const registro = {};

    copiarMetadatosFila(fila, registro);

    Object.entries(fila || {}).forEach(([claveOriginal, valor]) => {
      if (String(claveOriginal).startsWith('__')) {
        return;
      }

      const claveNormalizada = normalizarEncabezado(claveOriginal);
      registro[claveNormalizada] = normalizarValor(valor);
    });

    return registro;
  }

  function normalizarFila(encabezados, fila) {
    if (!Array.isArray(fila) && typeof fila === 'object' && fila !== null) {
      return normalizarFilaObjeto(fila);
    }

    const registro = {};

    if (fila && fila.__filaExcel) {
      registro.__filaExcel = fila.__filaExcel;
      registro.__fila = fila.__filaExcel;
    }

    if (fila && fila.__hoja) {
      registro.__hoja = fila.__hoja;
    }

    encabezados.forEach((encabezado, indice) => {
      const clave = normalizarEncabezado(encabezado);
      registro[clave] = normalizarValor(fila ? fila[indice] : '');
    });

    return registro;
  }

  function tieneAlgunaColumna(registro, variables) {
    return variables.some((variable) =>
      Object.prototype.hasOwnProperty.call(registro, variable)
    );
  }

  function concatenarHallazgos(hallazgos, nuevosHallazgos, nombreModulo) {
    if (Array.isArray(nuevosHallazgos)) {
      return hallazgos.concat(nuevosHallazgos);
    }

    console.warn(`[CACEngine] ${nombreModulo} no retornó un arreglo de hallazgos.`);
    return hallazgos;
  }

  function ejecutarModulo(hallazgos, registro, variables, modulo, nombreModulo) {
    if (
      tieneAlgunaColumna(registro, variables) &&
      modulo &&
      typeof modulo.validar === 'function'
    ) {
      return concatenarHallazgos(hallazgos, modulo.validar(registro), nombreModulo);
    }

    return hallazgos;
  }

  function validarRegistroCompleto(registro) {
    let hallazgos = [];

    if (window.CACModulo1 && typeof window.CACModulo1.validarRegistroModulo1 === 'function') {
      hallazgos = concatenarHallazgos(hallazgos, window.CACModulo1.validarRegistroModulo1(registro), 'CACModulo1');
    }

    if (
      tieneAlgunaColumna(registro, ['V17', 'V18', 'V19', 'V20', 'V21', 'V22', 'V23', 'V24']) &&
      window.CACModulo2 &&
      typeof window.CACModulo2.validarRegistroModulo2 === 'function'
    ) {
      hallazgos = concatenarHallazgos(hallazgos, window.CACModulo2.validarRegistroModulo2(registro), 'CACModulo2');
    }

    hallazgos = ejecutarModulo(hallazgos, registro, ['V25', 'V26', 'V27', 'V28'], window.CACModulo3, 'CACModulo3');
    hallazgos = ejecutarModulo(hallazgos, registro, ['V29'], window.CACModulo4, 'CACModulo4');
    hallazgos = ejecutarModulo(hallazgos, registro, ['V30', 'V31', 'V32', 'V33'], window.CACModulo5, 'CACModulo5');
    hallazgos = ejecutarModulo(hallazgos, registro, ['V34', 'V35'], window.CACModulo6, 'CACModulo6');
    hallazgos = ejecutarModulo(hallazgos, registro, ['V36', 'V37', 'V38', 'V39', 'V40'], window.CACModulo7, 'CACModulo7');
    hallazgos = ejecutarModulo(hallazgos, registro, ['V41', 'V42', 'V43', 'V44'], window.CACModulo8, 'CACModulo8');
    hallazgos = ejecutarModulo(hallazgos, registro, ['V45', 'V46', 'V46_1', 'V46_2', 'V46_3', 'V46_4', 'V46_5', 'V46_6', 'V46_7', 'V46_8', 'V47'], window.CACModulo9, 'CACModulo9');
    hallazgos = ejecutarModulo(hallazgos, registro, ['V48', 'V49', 'V50', 'V51', 'V52'], window.CACModulo10, 'CACModulo10');
    hallazgos = ejecutarModulo(hallazgos, registro, ['V53', 'V53_1', 'V53_2', 'V53_3', 'V53_4', 'V53_5', 'V53_6', 'V53_7', 'V53_8', 'V53_9'], window.CACModulo11, 'CACModulo11');
    hallazgos = ejecutarModulo(hallazgos, registro, ['V54', 'V55', 'V56'], window.CACModulo12, 'CACModulo12');
    hallazgos = ejecutarModulo(hallazgos, registro, ['V57', 'V58', 'V59', 'V60'], window.CACModulo13, 'CACModulo13');
    hallazgos = ejecutarModulo(hallazgos, registro, ['V61', 'V62', 'V63', 'V64', 'V65'], window.CACModulo14, 'CACModulo14');

    // Módulo 15 · V66-V77
    hallazgos = ejecutarModulo(
      hallazgos,
      registro,
      ['V66', 'V66_1', 'V66_2', 'V66_3', 'V66_4', 'V66_5', 'V66_6', 'V66_7', 'V66_8', 'V66_9', 'V67', 'V68', 'V69', 'V70', 'V71', 'V72', 'V73', 'V74', 'V75', 'V76', 'V77'],
      window.CACModulo15,
      'CACModulo15'
    );

    // Módulo 16 · V78-V85 · Cirugía
    hallazgos = ejecutarModulo(
      hallazgos,
      registro,
      ['V78', 'V79', 'V80', 'V81', 'V82', 'V83', 'V84', 'V85'],
      window.CACModulo16,
      'CACModulo16'
    );

    // Módulo 17 · V86-V105 · Radioterapia
    hallazgos = ejecutarModulo(
      hallazgos,
      registro,
      ['V86', 'V87', 'V88', 'V89', 'V90', 'V91', 'V92', 'V93', 'V94', 'V95', 'V96', 'V97', 'V98', 'V99', 'V100', 'V101', 'V102', 'V103', 'V104', 'V105'],
      window.CACModulo17,
      'CACModulo17'
    );

    // Módulo 18 · V106-V110 · Trasplante de células progenitoras hematopoyéticas
    // V106. ¿Recibió el usuario trasplante de células progenitoras hematopoyéticas dentro del periodo de reporte actual?
    // V107. Tipo de trasplante recibido
    // V108. Ubicación temporal de este trasplante en relación al manejo oncológico
    // V109. Fecha del trasplante
    // V110. Código de la IPS que realizó este trasplante
    hallazgos = ejecutarModulo(
      hallazgos,
      registro,
      ['V106', 'V107', 'V108', 'V109', 'V110'],
      window.CACModulo18,
      'CACModulo18'
    );

    // Módulo 19 · V111-V124 · Tratamiento complementario
    // V111. El usuario, ¿recibió cirugía reconstructiva en el periodo de reporte actual?
    // V112. Fecha de la cirugía reconstructiva
    // V113. Código de la IPS que realizó cirugía reconstructiva
    // V114. ¿El usuario fue valorado en consulta o procedimiento de cuidado paliativo en el periodo de reporte actual?
    // V114.1. El usuario recibió consulta o procedimiento de cuidado paliativo por médico especialista en cuidado paliativo
    // V114.2. El usuario recibió consulta o procedimiento de cuidado paliativo por profesional de la salud no médico, incluye psicólogo, especialista en cuidado paliativo
    // V114.3. El usuario recibió consulta o procedimiento de cuidado paliativo por médico especialista, otra especialidad
    // V114.4. El usuario recibió consulta o procedimiento de cuidado paliativo por médico general
    // V114.5. El usuario recibió consulta o procedimiento de cuidado paliativo por trabajo social
    // V114.6. El usuario recibió consulta o procedimiento de cuidado paliativo por otro profesional de salud no médico no especializado
    // V115. Fecha de primera consulta o procedimiento de cuidado paliativo en el periodo de reporte actual
    // V116. Código de la IPS donde recibe la atención de cuidado paliativo en el periodo de reporte actual
    // V117. ¿Ha sido valorado el usuario por el servicio de psiquiatría en el periodo de reporte actual?
    // V118. Fecha de primera consulta con el servicio de psiquiatría en el periodo de reporte actual
    hallazgos = ejecutarModulo(
      hallazgos,
      registro,
      ['V111', 'V112', 'V113', 'V114', 'V114_1', 'V114_2', 'V114_3', 'V114_4', 'V114_5', 'V114_6', 'V115', 'V116', 'V117', 'V118'],
      window.CACModulo19,
      'CACModulo19'
    );

    return hallazgos;
  }

  function resolverFilaExcel(registro, filaOriginal, filaEncabezados, indice) {
    const candidatos = [registro?.__filaExcel, registro?.__fila, filaOriginal?.__filaExcel, filaOriginal?.__fila];

    for (const candidato of candidatos) {
      const numero = Number(candidato);
      if (Number.isFinite(numero) && numero > 0) return numero;
    }

    const encabezado = Number(filaEncabezados || 1);
    return encabezado + indice + 1;
  }

  function validarDatosSprint1(datosExcel, onProgreso) {
    const encabezados = datosExcel.encabezados || datosExcel.cabeceras || [];
    const filas = datosExcel.registros || datosExcel.filas || [];
    const total = filas.length;
    const filaEncabezados = Number(datosExcel.filaEncabezados || 1);

    const resultados = filas.map((fila, indice) => {
      const registro = normalizarFila(encabezados, fila);
      const hallazgos = validarRegistroCompleto(registro);
      const conteo = CACTipos.contarPorSeveridad(hallazgos);
      const estado = CACTipos.resolverEstadoPaciente(hallazgos);
      const indiceFilaExcel = resolverFilaExcel(registro, fila, filaEncabezados, indice);

      if (typeof onProgreso === 'function') {
        onProgreso({ actual: indice + 1, total, porcentaje: total > 0 ? Math.round(((indice + 1) / total) * 100) : 100 });
      }

      return {
        indiceFilaExcel,
        filaExcel: indiceFilaExcel,
        documento: obtenerDocumento(registro),
        registro,
        fila: registro,
        hallazgos,
        errores: conteo.errores,
        advertencias: conteo.advertencias,
        info: conteo.info,
        estado
      };
    });

    return construirResumen(resultados);
  }

  function construirResumen(resultados) {
    const totalPacientes = resultados.length;
    const conErrores = resultados.filter((resultado) => resultado.errores > 0).length;
    const conAdvertencias = resultados.filter((resultado) => resultado.advertencias > 0).length;
    const soloConAdvertencias = resultados.filter((resultado) => resultado.errores === 0 && resultado.advertencias > 0).length;
    const sinProblemas = resultados.filter((resultado) => resultado.errores === 0 && resultado.advertencias === 0).length;

    const totalErrores = resultados.reduce((suma, resultado) => suma + resultado.errores, 0);
    const totalAdvertencias = resultados.reduce((suma, resultado) => suma + resultado.advertencias, 0);

    const resultadosOrdenados = [...resultados].sort((a, b) => {
      if (a.indiceFilaExcel !== b.indiceFilaExcel) return a.indiceFilaExcel - b.indiceFilaExcel;
      return a.documento.localeCompare(b.documento);
    });

    return { totalPacientes, conErrores, conAdvertencias, soloConAdvertencias, sinProblemas, totalErrores, totalAdvertencias, resultados: resultadosOrdenados };
  }

  window.CACEngine = {
    version: VERSION,
    normalizarFila,
    normalizarFilaObjeto,
    validarRegistroCompleto,
    validarDatosSprint1
  };
})();
