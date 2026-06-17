(function () {
  'use strict';

  const VERSION = 'sprint-3l-v105-motivo-finalizacion-ultimo-esquema-radioterapia-01';

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
      .replace(/-/g, '')
      .trim();
  }

  function estaVacio(valor) {
    return texto(valor) === '';
  }

  function nombreVariable(variable) {
    const nombres = {
      V86: '¿Recibió el usuario algún tipo de radioterapia en el periodo de reporte actual?',
      V87: 'Número de sesiones de radioterapia recibidas en el periodo',
      V88: 'Fecha de inicio del primer o único esquema de radioterapia',
      V89: 'Ubicación temporal del primer o único esquema de radioterapia',
      V90: 'Tipo de radioterapia aplicada en el primer o único esquema',
      V91: 'Número de IPS que suministran el primer o único esquema de radioterapia',
      V92: 'Código de la IPS1 que suministra el primer o único esquema de radioterapia',
      V93: 'Código de la IPS2 que suministra el primer o único esquema de radioterapia',
      V94: 'Fecha de finalización del primer o único esquema de radioterapia',
      V95: 'Características actuales del primer o único esquema de radioterapia',
      V96: 'Motivo de finalización del primer o único esquema de radioterapia',
      V97: 'Fecha de inicio del último esquema de radioterapia',
      V98: 'Ubicación temporal/intención del último esquema de radioterapia',
      V99: 'Tipo de radioterapia aplicada en el último esquema',
      V100: 'Número de IPS que suministran el último esquema de radioterapia',
      V101: 'Código de la IPS1 que suministra el último esquema de radioterapia',
      V102: 'Código de la IPS2 que suministra el último esquema de radioterapia',
      V103: 'Fecha de finalización del último esquema de radioterapia',
      V104: 'Características actuales del último esquema de radioterapia',
      V105: 'Motivo de finalización del último esquema de radioterapia',
      'V87-V105': 'Variables posteriores del bloque de radioterapia',
      'V90-V105': 'Variables posteriores del bloque de radioterapia'
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

  function describirValorV86(valor) {
    const codigo = normalizarCodigo(valor);
    if (codigo === '1') return 'V86=1 indica que sí recibió algún tipo de radioterapia en el periodo de reporte actual.';
    if (codigo === '2') return 'V86=2 corresponde a una opción eliminada del instructivo actual.';
    if (codigo === '98') return 'V86=98 indica No aplica porque no recibió radioterapia en el periodo.';
    if (!codigo) return 'V86 está vacía.';
    return `V86 tiene el valor ${texto(valor)}.`;
  }

  function describirValorV87(valor) {
    const valorTexto = texto(valor);
    if (!valorTexto) return 'V87 está vacía.';
    if (valorTexto === '98') return 'V87=98 indica No aplica.';
    return `V87 tiene el valor ${valorTexto}.`;
  }


  function describirValorV88(valor) {
    const valorTexto = texto(valor);
    if (!valorTexto) return 'V88 está vacía.';
    if (valorTexto === '1845-01-01') return 'V88=1845-01-01 indica No aplica.';
    return `V88 tiene el valor ${valorTexto}.`;
  }

  function describirValorV89(valor) {
    const codigo = normalizarCodigo(valor);
    const descripciones = {
      '1': 'V89=1 indica neoadyuvancia o manejo inicial prequirúrgico.',
      '2': 'V89=2 indica tratamiento inicial curativo sin cirugía sugerida.',
      '3': 'V89=3 indica adyuvancia o manejo inicial postquirúrgico.',
      '11': 'V89=11 indica manejo de recaída.',
      '12': 'V89=12 indica manejo de enfermedad metastásica.',
      '13': 'V89=13 indica manejo paliativo sin recaída ni enfermedad metastásica.',
      '98': 'V89=98 indica No aplica.'
    };

    if (!codigo) return 'V89 está vacía.';
    return descripciones[codigo] || `V89 tiene el valor ${texto(valor)}.`;
  }


  function describirValorV90(valor) {
    const codigo = normalizarCodigo(valor);
    if (!codigo) return 'V90 está vacía.';
    if (codigo === '98') return 'V90=98 indica No aplica.';
    return `V90 tiene el código CUPS ${codigo}.`;
  }

  function describirValorV91(valor) {
    const valorTexto = texto(valor);
    if (!valorTexto) return 'V91 está vacía.';
    if (valorTexto === '98') return 'V91=98 indica No aplica.';
    return `V91 tiene el valor ${valorTexto}.`;
  }

  function describirValorV92(valor) {
    const codigo = normalizarCodigo(valor);
    if (!codigo) return 'V92 está vacía.';
    if (codigo === '96') return 'V92=96 indica radioterapia fuera del país.';
    if (codigo === '98') return 'V92=98 indica No aplica.';
    return `V92 tiene el código IPS ${codigo}.`;
  }

  function describirValorV93(valor) {
    const codigo = normalizarCodigo(valor);
    if (!codigo) return 'V93 está vacía.';
    if (codigo === '98') return 'V93=98 indica No aplica.';
    return `V93 tiene el código IPS ${codigo}.`;
  }

  function describirValorV94(valor) {
    const valorTexto = texto(valor);
    if (!valorTexto) return 'V94 está vacía.';
    if (valorTexto === '1800-01-01') return 'V94=1800-01-01 indica esquema de radioterapia que aún no finaliza.';
    if (valorTexto === '1845-01-01') return 'V94=1845-01-01 indica No aplica.';
    return `V94 tiene el valor ${valorTexto}.`;
  }

  function describirValorV95(valor) {
    const codigo = normalizarCodigo(valor);
    const descripciones = {
      '1': 'V95=1 indica esquema finalizado con dosis completa de radioterapia prescrita.',
      '2': 'V95=2 indica esquema finalizado con dosis incompleta por algún motivo.',
      '3': 'V95=3 indica esquema no finalizado, incompleto, pero aún bajo tratamiento.',
      '98': 'V95=98 indica No aplica.'
    };

    if (!codigo) return 'V95 está vacía.';
    return descripciones[codigo] || `V95 tiene el valor ${texto(valor)}.`;
  }


  function describirValorV96(valor) {
    const codigo = normalizarCodigo(valor);
    const descripciones = {
      '1': 'V96=1 indica toxicidad.',
      '2': 'V96=2 indica otros motivos médicos.',
      '3': 'V96=3 indica muerte.',
      '4': 'V96=4 indica cambio de EPS.',
      '5': 'V96=5 indica decisión del usuario o abandono de la terapia.',
      '6': 'V96=6 indica otros motivos administrativos.',
      '7': 'V96=7 indica otras causas no contempladas.',
      '98': 'V96=98 indica No aplica.'
    };

    if (!codigo) return 'V96 está vacía.';
    return descripciones[codigo] || `V96 tiene el valor ${texto(valor)}.`;
  }

  function describirValorV97(valor) {
    const valorTexto = texto(valor);
    if (!valorTexto) return 'V97 está vacía.';
    if (valorTexto === '1845-01-01') return 'V97=1845-01-01 indica No aplica.';
    return `V97 tiene el valor ${valorTexto}.`;
  }

  function describirValorV98(valor) {
    const codigo = normalizarCodigo(valor);
    const descripciones = {
      '1': 'V98=1 indica neoadyuvancia o manejo inicial prequirúrgico.',
      '2': 'V98=2 indica tratamiento inicial curativo sin cirugía sugerida.',
      '3': 'V98=3 indica adyuvancia o manejo inicial postquirúrgico.',
      '11': 'V98=11 indica manejo de recaída.',
      '12': 'V98=12 indica manejo de enfermedad metastásica.',
      '13': 'V98=13 indica manejo paliativo sin recaída ni enfermedad metastásica.',
      '98': 'V98=98 indica No aplica.'
    };

    if (!codigo) return 'V98 está vacía.';
    return descripciones[codigo] || `V98 tiene el valor ${texto(valor)}.`;
  }


  function describirValorV99(valor) {
    const codigo = normalizarCodigo(valor);
    if (!codigo) return 'V99 está vacía.';
    if (codigo === '98') return 'V99=98 indica No aplica.';
    return `V99 tiene el código CUPS ${codigo}.`;
  }

  function describirValorV100(valor) {
    const valorTexto = texto(valor);
    if (!valorTexto) return 'V100 está vacía.';
    if (valorTexto === '98') return 'V100=98 indica No aplica.';
    return `V100 tiene el valor ${valorTexto}.`;
  }

  function describirValorV101(valor) {
    const codigo = texto(valor);
    if (!codigo) return 'V101 está vacía.';
    if (codigo === '98') return 'V101=98 indica No aplica.';
    return `V101 tiene el código IPS ${codigo}.`;
  }

  function describirValorV102(valor) {
    const codigo = texto(valor);
    if (!codigo) return 'V102 está vacía.';
    if (codigo === '98') return 'V102=98 indica No aplica.';
    return `V102 tiene el código IPS ${codigo}.`;
  }

  function describirValorV103(valor) {
    const valorTexto = texto(valor);
    if (!valorTexto) return 'V103 está vacía.';
    if (valorTexto === '1800-01-01') return 'V103=1800-01-01 indica esquema de radioterapia que aún no finaliza.';
    if (valorTexto === '1845-01-01') return 'V103=1845-01-01 indica No aplica.';
    return `V103 tiene el valor ${valorTexto}.`;
  }


  function describirValorV104(valor) {
    const codigo = normalizarCodigo(valor);
    const descripciones = {
      '1': 'V104=1 indica esquema finalizado con dosis completa de radioterapia prescrita.',
      '2': 'V104=2 indica esquema finalizado con dosis incompleta por algún motivo.',
      '3': 'V104=3 indica esquema no finalizado, incompleto, pero aún bajo tratamiento.',
      '98': 'V104=98 indica No aplica.'
    };

    if (!codigo) return 'V104 está vacía.';
    return descripciones[codigo] || `V104 tiene el valor ${texto(valor)}.`;
  }

  function describirValorV105(valor) {
    const codigo = normalizarCodigo(valor);
    const descripciones = {
      '1': 'V105=1 indica toxicidad.',
      '2': 'V105=2 indica otros motivos médicos.',
      '3': 'V105=3 indica muerte.',
      '4': 'V105=4 indica cambio de EPS.',
      '5': 'V105=5 indica decisión del usuario o abandono de la terapia.',
      '6': 'V105=6 indica otros motivos administrativos.',
      '7': 'V105=7 indica otras causas no contempladas.',
      '98': 'V105=98 indica No aplica.'
    };

    if (!codigo) return 'V105 está vacía.';
    return descripciones[codigo] || `V105 tiene el valor ${texto(valor)}.`;
  }

  function obtenerCodigosCupsRadioterapia() {
    const catalogo = window.CACCatalogoCUPS;
    const codigos = catalogo?.grupos?.radioterapia?.codigos;
    return Array.isArray(codigos) ? codigos.map(codigo => normalizarCodigo(codigo)) : [];
  }

  function catalogoCupsRadioterapiaDisponible() {
    return obtenerCodigosCupsRadioterapia().length > 0;
  }

  function esCupsRadioterapia(valor) {
    const codigo = normalizarCodigo(valor);
    return obtenerCodigosCupsRadioterapia().includes(codigo);
  }


  function obtenerCodigosCupsTodos() {
    const catalogo = window.CACCatalogoCUPS;
    const codigos = new Set();

    function agregarCodigo(valor) {
      const codigo = normalizarCodigo(valor);
      if (/^\d{6}$/.test(codigo)) codigos.add(codigo);
    }

    function recorrer(nodo) {
      if (!nodo) return;

      if (Array.isArray(nodo)) {
        nodo.forEach((item) => {
          if (typeof item === 'string' || typeof item === 'number') agregarCodigo(item);
          else recorrer(item);
        });
        return;
      }

      if (typeof nodo === 'object') {
        if (Array.isArray(nodo.codigos)) nodo.codigos.forEach(agregarCodigo);
        Object.keys(nodo).forEach((clave) => {
          if (clave !== 'codigos') recorrer(nodo[clave]);
        });
      }
    }

    recorrer(catalogo);
    return [...codigos];
  }

  function catalogoCupsDisponible() {
    return obtenerCodigosCupsTodos().length > 0 || catalogoCupsRadioterapiaDisponible();
  }

  function existeCupsEnCatalogo(valor) {
    const codigo = normalizarCodigo(valor);
    return obtenerCodigosCupsTodos().includes(codigo) || esCupsRadioterapia(codigo);
  }

  function tieneFormatoFechaISO(valor) {
    return /^\d{4}-\d{2}-\d{2}$/.test(texto(valor));
  }

  function fechaExisteISO(valor) {
    const valorTexto = texto(valor);
    if (!tieneFormatoFechaISO(valorTexto)) return false;

    const [anioTexto, mesTexto, diaTexto] = valorTexto.split('-');
    const anio = Number(anioTexto);
    const mes = Number(mesTexto);
    const dia = Number(diaTexto);

    if (!Number.isInteger(anio) || !Number.isInteger(mes) || !Number.isInteger(dia)) return false;
    if (anio < 1800 || mes < 1 || mes > 12 || dia < 1 || dia > 31) return false;

    const fecha = new Date(Date.UTC(anio, mes - 1, dia));
    return fecha.getUTCFullYear() === anio && fecha.getUTCMonth() === mes - 1 && fecha.getUTCDate() === dia;
  }

  function esFechaRealRadioterapia(valor) {
    const valorTexto = texto(valor);
    return tieneFormatoFechaISO(valorTexto) && fechaExisteISO(valorTexto) && valorTexto !== '1800-01-01' && valorTexto !== '1845-01-01';
  }

  function datosBaseV86(valorOriginal) {
    return [
      dato('V86', valorOriginal, describirValorV86(valorOriginal)),
      dato('V87-V105', 'Pendiente', 'Bloque posterior de radioterapia. Se validará de forma progresiva cuando se implementen esas variables.')
    ];
  }

  function datosBaseV87(v86Original, v87Original) {
    return [
      dato('V86', v86Original, describirValorV86(v86Original)),
      dato('V87', v87Original, describirValorV87(v87Original))
    ];
  }


  function datosBaseV88(v86Original, v88Original) {
    return [
      dato('V86', v86Original, describirValorV86(v86Original)),
      dato('V88', v88Original, describirValorV88(v88Original))
    ];
  }

  function datosBaseV89(v86Original, v89Original) {
    return [
      dato('V86', v86Original, describirValorV86(v86Original)),
      dato('V89', v89Original, describirValorV89(v89Original))
    ];
  }


  function datosBaseV90(v86Original, v90Original) {
    return [
      dato('V86', v86Original, describirValorV86(v86Original)),
      dato('V90', v90Original, describirValorV90(v90Original))
    ];
  }

  function datosBaseV91(v86Original, v91Original) {
    return [
      dato('V86', v86Original, describirValorV86(v86Original)),
      dato('V91', v91Original, describirValorV91(v91Original))
    ];
  }

  function datosBaseV92(v86Original, v91Original, v92Original) {
    return [
      dato('V86', v86Original, describirValorV86(v86Original)),
      dato('V91', v91Original, describirValorV91(v91Original)),
      dato('V92', v92Original, describirValorV92(v92Original))
    ];
  }

  function datosBaseV93(v86Original, v91Original, v93Original) {
    return [
      dato('V86', v86Original, describirValorV86(v86Original)),
      dato('V91', v91Original, describirValorV91(v91Original)),
      dato('V93', v93Original, describirValorV93(v93Original))
    ];
  }

  function datosBaseV94(v86Original, v88Original, v94Original) {
    return [
      dato('V86', v86Original, describirValorV86(v86Original)),
      dato('V88', v88Original, describirValorV88(v88Original)),
      dato('V94', v94Original, describirValorV94(v94Original))
    ];
  }

  function datosBaseV95(v86Original, v94Original, v95Original) {
    return [
      dato('V86', v86Original, describirValorV86(v86Original)),
      dato('V94', v94Original, describirValorV94(v94Original)),
      dato('V95', v95Original, describirValorV95(v95Original))
    ];
  }


  function datosBaseV96(v95Original, v96Original) {
    return [
      dato('V95', v95Original, describirValorV95(v95Original)),
      dato('V96', v96Original, describirValorV96(v96Original))
    ];
  }

  function datosBaseV97(v86Original, v88Original, v97Original) {
    return [
      dato('V86', v86Original, describirValorV86(v86Original)),
      dato('V88', v88Original, describirValorV88(v88Original)),
      dato('V97', v97Original, describirValorV97(v97Original))
    ];
  }

  function datosBaseV98(v86Original, v97Original, v98Original) {
    return [
      dato('V86', v86Original, describirValorV86(v86Original)),
      dato('V97', v97Original, describirValorV97(v97Original)),
      dato('V98', v98Original, describirValorV98(v98Original))
    ];
  }

  // ============================================================

  function datosBaseV99(v86Original, v97Original, v98Original, v99Original) {
    return [
      dato('V86', v86Original, describirValorV86(v86Original)),
      dato('V97', v97Original, describirValorV97(v97Original)),
      dato('V98', v98Original, describirValorV98(v98Original)),
      dato('V99', v99Original, describirValorV99(v99Original))
    ];
  }

  function datosBaseV100(v86Original, v97Original, v98Original, v99Original, v100Original) {
    return [
      dato('V86', v86Original, describirValorV86(v86Original)),
      dato('V97', v97Original, describirValorV97(v97Original)),
      dato('V98', v98Original, describirValorV98(v98Original)),
      dato('V99', v99Original, describirValorV99(v99Original)),
      dato('V100', v100Original, describirValorV100(v100Original))
    ];
  }

  function datosBaseV101(v86Original, v97Original, v98Original, v99Original, v100Original, v101Original) {
    return [
      dato('V86', v86Original, describirValorV86(v86Original)),
      dato('V97', v97Original, describirValorV97(v97Original)),
      dato('V98', v98Original, describirValorV98(v98Original)),
      dato('V99', v99Original, describirValorV99(v99Original)),
      dato('V100', v100Original, describirValorV100(v100Original)),
      dato('V101', v101Original, describirValorV101(v101Original))
    ];
  }

  function datosBaseV102(v86Original, v97Original, v98Original, v99Original, v100Original, v101Original, v102Original) {
    return [
      dato('V86', v86Original, describirValorV86(v86Original)),
      dato('V97', v97Original, describirValorV97(v97Original)),
      dato('V98', v98Original, describirValorV98(v98Original)),
      dato('V99', v99Original, describirValorV99(v99Original)),
      dato('V100', v100Original, describirValorV100(v100Original)),
      dato('V101', v101Original, describirValorV101(v101Original)),
      dato('V102', v102Original, describirValorV102(v102Original))
    ];
  }

  function datosBaseV103(v86Original, v97Original, v103Original) {
    return [
      dato('V86', v86Original, describirValorV86(v86Original)),
      dato('V97', v97Original, describirValorV97(v97Original)),
      dato('V103', v103Original, describirValorV103(v103Original))
    ];
  }


  function datosBaseV104(v86Original, v97Original, v103Original, v104Original) {
    return [
      dato('V86', v86Original, describirValorV86(v86Original)),
      dato('V97', v97Original, describirValorV97(v97Original)),
      dato('V103', v103Original, describirValorV103(v103Original)),
      dato('V104', v104Original, describirValorV104(v104Original))
    ];
  }

  function datosBaseV105(v86Original, v97Original, v103Original, v104Original, v105Original) {
    return [
      dato('V86', v86Original, describirValorV86(v86Original)),
      dato('V97', v97Original, describirValorV97(v97Original)),
      dato('V103', v103Original, describirValorV103(v103Original)),
      dato('V104', v104Original, describirValorV104(v104Original)),
      dato('V105', v105Original, describirValorV105(v105Original))
    ];
  }

  // V86. ¿Recibió el usuario algún tipo de radioterapia en el periodo de reporte actual?
  // ============================================================
  function validarV86(registro) {
    const hallazgos = [];
    const variable = 'V86';
    const valorOriginal = registro?.V86;
    const valor = normalizarCodigo(valorOriginal);
    const permitidos = ['1', '98'];
    const datosRelacionados = datosBaseV86(valorOriginal);

    if (estaVacio(valorOriginal)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V86-ERROR-001',
        variable,
        severidad: 'error',
        titulo: 'V86 está vacía',
        mensaje: 'V86 está vacía. Debe registrar 1 si el usuario recibió radioterapia en el periodo o 98 si no aplica.',
        regla: 'El instructivo exige registrar si el usuario recibió algún tipo de radioterapia en el periodo de reporte actual.',
        recomendacion: 'Corrija V86 registrando 1 o 98 según corresponda.',
        valor: valorOriginal,
        datosRelacionados,
        columnasCorregir: ['V86']
      }));
      return hallazgos;
    }

    if (valor === '2') {
      hallazgos.push(crearHallazgo({
        codigo: 'V86-ERROR-003',
        variable,
        severidad: 'error',
        titulo: 'V86 tiene una opción eliminada del instructivo',
        mensaje: 'V86 tiene valor 2, pero esa opción fue eliminada. La radioterapia propuesta pero no suministrada no cuenta como radioterapia recibida.',
        regla: 'El instructivo aclara que no aplica radioterapia propuesta más no suministrada y que se eliminó la opción 2.',
        recomendacion: 'Corrija V86 a 1 sólo si la radioterapia fue suministrada. Si no fue suministrada, registre 98.',
        valor: valorOriginal,
        datosRelacionados,
        columnasCorregir: ['V86']
      }));
      return hallazgos;
    }

    if (!permitidos.includes(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V86-ERROR-002',
        variable,
        severidad: 'error',
        titulo: 'V86 tiene un valor fuera del catálogo permitido',
        mensaje: 'V86 tiene un valor fuera del catálogo permitido. Sólo se permite 1 o 98.',
        regla: 'Según el instructivo, V86 sólo permite 1 para radioterapia recibida o 98 para No aplica.',
        recomendacion: 'Corrija V86 con 1 si recibió radioterapia o 98 si no aplica.',
        valor: valorOriginal,
        datosRelacionados,
        columnasCorregir: ['V86']
      }));
      return hallazgos;
    }

    return hallazgos;
  }

  // ============================================================
  // V87. Número de sesiones de radioterapia recibidas en el periodo
  // Encabezado real: v87nmerodeesquemasderadioterapia
  // Trazabilidad: V86 → V87
  // ============================================================
  function validarV87(registro) {
    const hallazgos = [];
    const variable = 'V87';
    const v86Original = registro?.V86;
    const v87Original = registro?.V87;
    const v86 = normalizarCodigo(v86Original);
    const v87 = texto(v87Original);
    const datosRelacionados = datosBaseV87(v86Original, v87Original);
    const v86Valida = v86 === '1' || v86 === '98';

    if (estaVacio(v87Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V87-ERROR-001',
        variable,
        severidad: 'error',
        titulo: 'V87 está vacía',
        mensaje: 'V87 está vacía. Debe registrar el número de sesiones de radioterapia recibidas en el periodo o 98 si no aplica.',
        regla: 'El instructivo exige registrar el número de sesiones de radioterapia suministradas durante el periodo o 98 si no aplica.',
        recomendacion: 'Corrija V87 registrando el número de sesiones suministradas o 98 si no aplica.',
        valor: v87Original,
        datosRelacionados,
        columnasCorregir: ['V87']
      }));
      return hallazgos;
    }

    if (!/^-?\d+(?:[.,]\d+)?$/.test(v87)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V87-ERROR-002',
        variable,
        severidad: 'error',
        titulo: 'V87 debe ser numérica',
        mensaje: 'V87 debe ser numérica. Registre el número de sesiones de radioterapia suministradas o 98 si no aplica.',
        regla: 'El instructivo define V87 como un valor numérico o 98 para No aplica.',
        recomendacion: 'Corrija V87 usando sólo números enteros positivos o 98 si no aplica.',
        valor: v87Original,
        datosRelacionados,
        columnasCorregir: ['V87']
      }));
      return hallazgos;
    }

    const numero = Number(v87.replace(',', '.'));

    if (!Number.isInteger(numero) || numero < 0) {
      hallazgos.push(crearHallazgo({
        codigo: 'V87-ERROR-006',
        variable,
        severidad: 'error',
        titulo: 'V87 tiene un número no permitido',
        mensaje: 'V87 debe registrar un número entero positivo de sesiones o 98 si no aplica. No se permiten decimales ni valores negativos.',
        regla: 'Las sesiones de radioterapia son un conteo entero. El instructivo sólo permite un valor numérico o 98 cuando no aplica.',
        recomendacion: 'Corrija V87 registrando un entero positivo o 98 si no aplica.',
        valor: v87Original,
        datosRelacionados,
        columnasCorregir: ['V87']
      }));
      return hallazgos;
    }

    // La trazabilidad con V86 sólo se evalúa cuando V86 ya tiene un valor válido.
    // Esto evita cascadas si V86 está vacía, tiene 2 o está fuera del catálogo.
    if (v86Valida && v86 === '1' && numero === 98) {
      hallazgos.push(crearHallazgo({
        codigo: 'V87-ERROR-003',
        variable,
        severidad: 'error',
        titulo: 'V87 no corresponde con V86',
        mensaje: 'V87 no corresponde con V86. Si V86 indica que el usuario recibió radioterapia, V87 debe registrar el número de sesiones suministradas.',
        regla: 'Cuando V86=1, el usuario recibió radioterapia; por tanto, V87 debe registrar el número de sesiones suministradas y no 98.',
        recomendacion: 'Corrija V87 registrando el número de sesiones suministradas durante el periodo.',
        valor: v87Original,
        datosRelacionados,
        columnasCorregir: ['V87']
      }));
      return hallazgos;
    }

    if (v86Valida && v86 === '98' && numero !== 98) {
      hallazgos.push(crearHallazgo({
        codigo: 'V87-ERROR-004',
        variable,
        severidad: 'error',
        titulo: 'V87 no corresponde con V86',
        mensaje: 'V87 no corresponde con V86. Si V86 indica que no aplica radioterapia, V87 debe registrarse como 98.',
        regla: 'Cuando V86=98, no aplica radioterapia; por tanto, V87 debe registrar 98.',
        recomendacion: 'Corrija V87 registrando 98.',
        valor: v87Original,
        datosRelacionados,
        columnasCorregir: ['V87']
      }));
      return hallazgos;
    }

    if (numero === 0) {
      hallazgos.push(crearHallazgo({
        codigo: 'V87-ERROR-005',
        variable,
        severidad: 'error',
        titulo: 'V87 registra cero sesiones',
        mensaje: 'V87 registra 0 sesiones. Si el usuario recibió radioterapia, debe registrar un número de sesiones mayor que cero; si no aplica, registre 98.',
        regla: 'El instructivo solicita el número de sesiones de radioterapia suministradas; cero no representa sesiones recibidas.',
        recomendacion: 'Corrija V87 registrando un número mayor que cero o 98 si no aplica.',
        valor: v87Original,
        datosRelacionados,
        columnasCorregir: ['V87']
      }));
      return hallazgos;
    }

    return hallazgos;
  }


  // ============================================================
  // V88. Fecha de inicio del primer o único esquema de radioterapia
  // Encabezado real: v88fechadeiniciodeprimeronicoesq
  // Trazabilidad: V86 → V88
  // ============================================================
  function validarV88(registro) {
    const hallazgos = [];
    const variable = 'V88';
    const v86Original = registro?.V86;
    const v88Original = registro?.V88;
    const v86 = normalizarCodigo(v86Original);
    const v88 = texto(v88Original);
    const datosRelacionados = datosBaseV88(v86Original, v88Original);
    const v86Valida = v86 === '1' || v86 === '98';
    const comodinNoAplica = '1845-01-01';

    if (estaVacio(v88Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V88-ERROR-001',
        variable,
        severidad: 'error',
        titulo: 'V88 está vacía',
        mensaje: 'V88 está vacía. Debe registrar la fecha de inicio del primer o único esquema de radioterapia en formato AAAA-MM-DD, o 1845-01-01 si no aplica.',
        regla: 'El instructivo exige registrar la fecha de inicio del primer o único esquema de radioterapia o 1845-01-01 cuando no aplica.',
        recomendacion: 'Corrija V88 registrando una fecha válida en formato AAAA-MM-DD o 1845-01-01 si no aplica.',
        valor: v88Original,
        datosRelacionados,
        columnasCorregir: ['V88']
      }));
      return hallazgos;
    }

    if (!tieneFormatoFechaISO(v88)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V88-ERROR-002',
        variable,
        severidad: 'error',
        titulo: 'V88 tiene formato inválido',
        mensaje: 'V88 tiene un formato inválido. Debe registrar la fecha en formato AAAA-MM-DD o 1845-01-01 si no aplica.',
        regla: 'El instructivo solicita registrar la fecha en formato AAAA-MM-DD.',
        recomendacion: 'Corrija V88 usando el formato AAAA-MM-DD. Si no aplica radioterapia, registre 1845-01-01.',
        valor: v88Original,
        datosRelacionados,
        columnasCorregir: ['V88']
      }));
      return hallazgos;
    }

    if (!fechaExisteISO(v88)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V88-ERROR-003',
        variable,
        severidad: 'error',
        titulo: 'V88 contiene una fecha inexistente',
        mensaje: 'V88 contiene una fecha inexistente. Verifique que la fecha registrada sea válida en formato AAAA-MM-DD.',
        regla: 'El dato debe ser una fecha real. No basta con cumplir el patrón AAAA-MM-DD si el día o el mes no existen.',
        recomendacion: 'Corrija V88 con una fecha real. Si sólo conoce año y mes, registre el día 15.',
        valor: v88Original,
        datosRelacionados,
        columnasCorregir: ['V88']
      }));
      return hallazgos;
    }

    // La trazabilidad con V86 sólo se evalúa cuando V86 ya tiene un valor válido.
    // Esto evita cascadas si V86 está vacía, tiene 2 o está fuera del catálogo.
    if (v86Valida && v86 === '1' && v88 === comodinNoAplica) {
      hallazgos.push(crearHallazgo({
        codigo: 'V88-ERROR-004',
        variable,
        severidad: 'error',
        titulo: 'V88 no corresponde con V86',
        mensaje: 'V88 no corresponde con V86. Si V86 indica que el usuario recibió radioterapia, V88 debe registrar una fecha real de inicio del primer o único esquema.',
        regla: 'Cuando V86=1, el usuario recibió radioterapia; por tanto, V88 debe registrar una fecha real y no 1845-01-01.',
        recomendacion: 'Corrija V88 registrando la fecha real de inicio del primer o único esquema de radioterapia.',
        valor: v88Original,
        datosRelacionados,
        columnasCorregir: ['V88']
      }));
      return hallazgos;
    }

    if (v86Valida && v86 === '98' && v88 !== comodinNoAplica) {
      hallazgos.push(crearHallazgo({
        codigo: 'V88-ERROR-005',
        variable,
        severidad: 'error',
        titulo: 'V88 no corresponde con V86',
        mensaje: 'V88 no corresponde con V86. Si V86 indica que no aplica radioterapia, V88 debe registrarse como 1845-01-01.',
        regla: 'Cuando V86=98, no aplica radioterapia; por tanto, V88 debe registrar 1845-01-01.',
        recomendacion: 'Corrija V88 registrando 1845-01-01.',
        valor: v88Original,
        datosRelacionados,
        columnasCorregir: ['V88']
      }));
      return hallazgos;
    }

    // No se genera advertencia por 1845-01-01 cuando V86=98.
    // No se genera advertencia por fecha anterior al periodo de reporte, porque el instructivo permite reportar
    // la fecha de inicio aunque el tratamiento haya iniciado previo al periodo actual.

    return hallazgos;
  }


  // ============================================================
  // V89. Ubicación temporal del primer o único esquema de radioterapia
  // Encabezado real: v89ubicacintemporaldelprimeronic
  // Trazabilidad: V86 → V89
  // ============================================================
  function validarV89(registro) {
    const hallazgos = [];
    const variable = 'V89';
    const v86Original = registro?.V86;
    const v89Original = registro?.V89;
    const v86 = normalizarCodigo(v86Original);
    const v89 = normalizarCodigo(v89Original);
    const permitidos = ['1', '2', '3', '11', '12', '13', '98'];
    const datosRelacionados = datosBaseV89(v86Original, v89Original);
    const v86Valida = v86 === '1' || v86 === '98';

    if (estaVacio(v89Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V89-ERROR-001',
        variable,
        severidad: 'error',
        titulo: 'V89 está vacía',
        mensaje: 'V89 está vacía. Debe registrar la ubicación temporal del primer o único esquema de radioterapia, o 98 si no aplica.',
        regla: 'El instructivo exige registrar para todos los usuarios la ubicación temporal del primer o único esquema de radioterapia en relación con el tratamiento oncológico, o 98 cuando no aplica.',
        recomendacion: 'Corrija V89 registrando 1, 2, 3, 11, 12, 13 o 98 según corresponda.',
        valor: v89Original,
        datosRelacionados,
        columnasCorregir: ['V89']
      }));
      return hallazgos;
    }

    if (!permitidos.includes(v89)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V89-ERROR-002',
        variable,
        severidad: 'error',
        titulo: 'V89 tiene un valor fuera del catálogo permitido',
        mensaje: 'V89 tiene un valor fuera del catálogo permitido. Sólo se permite 1, 2, 3, 11, 12, 13 o 98.',
        regla: 'Según el instructivo, V89 sólo permite 1 neoadyuvancia, 2 tratamiento inicial curativo sin cirugía sugerida, 3 adyuvancia, 11 recaída, 12 enfermedad metastásica, 13 paliativo o 98 No aplica.',
        recomendacion: 'Corrija V89 usando uno de los valores permitidos por el instructivo.',
        valor: v89Original,
        datosRelacionados,
        columnasCorregir: ['V89']
      }));
      return hallazgos;
    }

    // La trazabilidad con V86 sólo se evalúa cuando V86 ya tiene un valor válido.
    // Esto evita cascadas si V86 está vacía, tiene 2 o está fuera del catálogo.
    if (v86Valida && v86 === '1' && v89 === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V89-ERROR-003',
        variable,
        severidad: 'error',
        titulo: 'V89 no corresponde con V86',
        mensaje: 'V89 no corresponde con V86. Si V86 indica que el usuario recibió radioterapia, V89 debe registrar la ubicación temporal del primer o único esquema.',
        regla: 'Cuando V86=1, el usuario recibió radioterapia; por tanto, V89 debe registrar 1, 2, 3, 11, 12 o 13, no 98.',
        recomendacion: 'Corrija V89 registrando la ubicación temporal del esquema de radioterapia.',
        valor: v89Original,
        datosRelacionados,
        columnasCorregir: ['V89']
      }));
      return hallazgos;
    }

    if (v86Valida && v86 === '98' && v89 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V89-ERROR-004',
        variable,
        severidad: 'error',
        titulo: 'V89 no corresponde con V86',
        mensaje: 'V89 no corresponde con V86. Si V86 indica que no aplica radioterapia, V89 debe registrarse como 98.',
        regla: 'Cuando V86=98, no aplica radioterapia; por tanto, V89 debe registrar 98.',
        recomendacion: 'Corrija V89 registrando 98.',
        valor: v89Original,
        datosRelacionados,
        columnasCorregir: ['V89']
      }));
      return hallazgos;
    }

    // No se generan advertencias por V89=1, 2, 3, 11, 12 o 13 porque todos pertenecen al catálogo permitido.
    // No se cruza V89 con cirugía ni con variables futuras del bloque de radioterapia para evitar falsos positivos.

    return hallazgos;
  }


  // ============================================================
  // V90. Tipo de radioterapia aplicada en este primer o único esquema
  // Encabezado real: v90tipoderadioterapiaaplicadaene
  // Trazabilidad: V86 → V90
  // Catálogo: CACCatalogoCUPS.grupos.radioterapia.codigos
  // ============================================================
  function validarV90(registro) {
    const hallazgos = [];
    const variable = 'V90';
    const v86Original = registro?.V86;
    const v90Original = registro?.V90;
    const v86 = normalizarCodigo(v86Original);
    const v90 = normalizarCodigo(v90Original);
    const datosRelacionados = datosBaseV90(v86Original, v90Original);
    const v86Valida = v86 === '1' || v86 === '98';
    const catalogoDisponible = catalogoCupsRadioterapiaDisponible();

    if (estaVacio(v90Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V90-ERROR-001',
        variable,
        severidad: 'error',
        titulo: 'V90 está vacía',
        mensaje: 'V90 está vacía. Debe registrar el código CUPS del tipo de radioterapia aplicada en el primer o único esquema, o 98 si no aplica.',
        regla: 'El instructivo exige registrar el código de procedimiento CUPS de la radioterapia aplicada, o 98 cuando no aplica.',
        recomendacion: 'Corrija V90 registrando un código CUPS válido de radioterapia del archivo operativo CAC o 98 si no aplica.',
        valor: v90Original,
        datosRelacionados,
        columnasCorregir: ['V90']
      }));
      return hallazgos;
    }

    if (v90 !== '98' && !/^\d{6}$/.test(v90)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V90-ERROR-002',
        variable,
        severidad: 'error',
        titulo: 'V90 tiene formato inválido',
        mensaje: 'V90 tiene formato inválido. Debe registrar un código CUPS de 6 dígitos o 98 si no aplica.',
        regla: 'El instructivo solicita registrar un código de procedimiento CUPS del archivo operativo CAC o 98 cuando no aplica.',
        recomendacion: 'Corrija V90 usando un código CUPS de 6 dígitos del grupo radioterapia o 98 si no aplica.',
        valor: v90Original,
        datosRelacionados,
        columnasCorregir: ['V90']
      }));
      return hallazgos;
    }

    // La trazabilidad con V86 sólo se evalúa cuando V86 ya tiene un valor válido.
    // Esto evita cascadas si V86 está vacía, tiene 2 o está fuera del catálogo.
    if (v86Valida && v86 === '1' && v90 === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V90-ERROR-003',
        variable,
        severidad: 'error',
        titulo: 'V90 no corresponde con V86',
        mensaje: 'V90 no corresponde con V86. Si V86 indica que el usuario recibió radioterapia, V90 debe registrar el código CUPS del tipo de radioterapia aplicada.',
        regla: 'Cuando V86=1, el usuario recibió radioterapia; por tanto, V90 debe registrar un código CUPS válido de radioterapia y no 98.',
        recomendacion: 'Corrija V90 registrando el código CUPS del tipo de radioterapia aplicada.',
        valor: v90Original,
        datosRelacionados,
        columnasCorregir: ['V90']
      }));
      return hallazgos;
    }

    if (v86Valida && v86 === '98' && v90 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V90-ERROR-004',
        variable,
        severidad: 'error',
        titulo: 'V90 no corresponde con V86',
        mensaje: 'V90 no corresponde con V86. Si V86 indica que no aplica radioterapia, V90 debe registrarse como 98.',
        regla: 'Cuando V86=98, no aplica radioterapia; por tanto, V90 debe registrar 98.',
        recomendacion: 'Corrija V90 registrando 98.',
        valor: v90Original,
        datosRelacionados,
        columnasCorregir: ['V90']
      }));
      return hallazgos;
    }

    if (v90 !== '98' && catalogoDisponible && !esCupsRadioterapia(v90)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V90-ERROR-005',
        variable,
        severidad: 'error',
        titulo: 'V90 no pertenece al catálogo CUPS de radioterapia',
        mensaje: `V90=${v90} no existe en el grupo CUPS RADIOTERAPIA del archivo operativo CAC aplicable a V90.`,
        regla: 'V90 debe registrarse con un código CUPS incluido en el catálogo operativo CAC de radioterapia o 98 cuando no aplica.',
        recomendacion: 'Corrija V90 usando un código CUPS válido del grupo radioterapia del archivo operativo CAC.',
        valor: v90Original,
        datosRelacionados,
        columnasCorregir: ['V90']
      }));
      return hallazgos;
    }

    // No se generan advertencias por códigos CUPS válidos de radioterapia.
    // No se cruza V90 con V89, CIE-10, cirugía ni V99 para evitar reglas no soportadas por el instructivo actual.

    return hallazgos;
  }


  // ============================================================
  // V91. Número de IPS que suministran este primer o único esquema de radioterapia
  // Encabezado real: v91nmerodeipsquesuministranestep
  // Trazabilidad: V86 → V91
  // ============================================================
  function validarV91(registro) {
    const hallazgos = [];
    const variable = 'V91';
    const v86Original = registro?.V86;
    const v91Original = registro?.V91;
    const v86 = normalizarCodigo(v86Original);
    const v91 = texto(v91Original);
    const datosRelacionados = datosBaseV91(v86Original, v91Original);
    const v86Valida = v86 === '1' || v86 === '98';

    if (estaVacio(v91Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V91-ERROR-001',
        variable,
        severidad: 'error',
        titulo: 'V91 está vacía',
        mensaje: 'V91 está vacía. Debe registrar el número de IPS que suministraron el primer o único esquema de radioterapia, o 98 si no aplica.',
        regla: 'El instructivo exige registrar el número de IPS que intervinieron en la administración de la dosis de radioterapia, o 98 cuando no aplica.',
        recomendacion: 'Corrija V91 registrando el número de IPS que suministraron la radioterapia o 98 si no aplica.',
        valor: v91Original,
        datosRelacionados,
        columnasCorregir: ['V91']
      }));
      return hallazgos;
    }

    if (!/^-?\d+(?:[.,]\d+)?$/.test(v91)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V91-ERROR-002',
        variable,
        severidad: 'error',
        titulo: 'V91 debe ser numérica',
        mensaje: 'V91 debe ser numérica. Registre el número de IPS que suministraron el esquema de radioterapia o 98 si no aplica.',
        regla: 'El instructivo define V91 como un conteo de IPS o 98 para No aplica.',
        recomendacion: 'Corrija V91 usando sólo números enteros positivos o 98 si no aplica.',
        valor: v91Original,
        datosRelacionados,
        columnasCorregir: ['V91']
      }));
      return hallazgos;
    }

    const numero = Number(v91.replace(',', '.'));

    if (!Number.isInteger(numero) || numero < 0) {
      hallazgos.push(crearHallazgo({
        codigo: 'V91-ERROR-005',
        variable,
        severidad: 'error',
        titulo: 'V91 tiene un número no permitido',
        mensaje: 'V91 debe registrar un número entero positivo de IPS o 98 si no aplica. No se permiten decimales ni valores negativos.',
        regla: 'El número de IPS es un conteo entero. El instructivo sólo permite registrar el número de IPS o 98 cuando no aplica.',
        recomendacion: 'Corrija V91 registrando un entero positivo o 98 si no aplica.',
        valor: v91Original,
        datosRelacionados,
        columnasCorregir: ['V91']
      }));
      return hallazgos;
    }

    // La trazabilidad con V86 sólo se evalúa cuando V86 ya tiene un valor válido.
    // Esto evita cascadas si V86 está vacía, tiene 2 o está fuera del catálogo.
    if (v86Valida && v86 === '1' && numero === 98) {
      hallazgos.push(crearHallazgo({
        codigo: 'V91-ERROR-003',
        variable,
        severidad: 'error',
        titulo: 'V91 no corresponde con V86',
        mensaje: 'V91 no corresponde con V86. Si V86 indica que el usuario recibió radioterapia, V91 debe registrar cuántas IPS suministraron el primer o único esquema.',
        regla: 'Cuando V86=1, el usuario recibió radioterapia; por tanto, V91 debe registrar el número de IPS que intervinieron y no 98.',
        recomendacion: 'Corrija V91 registrando el número de IPS que suministraron la radioterapia.',
        valor: v91Original,
        datosRelacionados,
        columnasCorregir: ['V91']
      }));
      return hallazgos;
    }

    if (v86Valida && v86 === '98' && numero !== 98) {
      hallazgos.push(crearHallazgo({
        codigo: 'V91-ERROR-004',
        variable,
        severidad: 'error',
        titulo: 'V91 no corresponde con V86',
        mensaje: 'V91 no corresponde con V86. Si V86 indica que no aplica radioterapia, V91 debe registrarse como 98.',
        regla: 'Cuando V86=98, no aplica radioterapia; por tanto, V91 debe registrar 98.',
        recomendacion: 'Corrija V91 registrando 98.',
        valor: v91Original,
        datosRelacionados,
        columnasCorregir: ['V91']
      }));
      return hallazgos;
    }

    if (numero === 0) {
      hallazgos.push(crearHallazgo({
        codigo: 'V91-ERROR-005',
        variable,
        severidad: 'error',
        titulo: 'V91 registra cero IPS',
        mensaje: 'V91 registra 0 IPS. Si el usuario recibió radioterapia, debe registrar un número de IPS mayor que cero; si no aplica, registre 98.',
        regla: 'El instructivo solicita el número de IPS que intervinieron en la administración de la dosis; cero no representa IPS suministradoras.',
        recomendacion: 'Corrija V91 registrando un número mayor que cero o 98 si no aplica.',
        valor: v91Original,
        datosRelacionados,
        columnasCorregir: ['V91']
      }));
      return hallazgos;
    }

    // No se genera límite máximo para V91 porque el instructivo sólo solicita el número de IPS.
    // La trazabilidad con códigos de IPS se validará progresivamente al implementar V92 y siguientes.

    return hallazgos;
  }


  // ============================================================
  // V92. Código de la IPS1 que suministra la radioterapia de este primer o único esquema
  // Encabezado real: v92cdigodelaips1quesuministralar
  // Trazabilidad: V86 → V91 → V92
  // ============================================================
  function validarV92(registro) {
    const hallazgos = [];
    const variable = 'V92';
    const v86Original = registro?.V86;
    const v91Original = registro?.V91;
    const v92Original = registro?.V92;
    const v86 = normalizarCodigo(v86Original);
    const v91 = texto(v91Original);
    const v92 = normalizarCodigo(v92Original);
    const datosRelacionados = datosBaseV92(v86Original, v91Original, v92Original);
    const v86Valida = v86 === '1' || v86 === '98';
    const v91Entero = /^\d+$/.test(v91);
    const v91Numero = v91Entero ? Number(v91) : NaN;
    const v91NoAplica = v91 === '98';
    const v91PositivaReal = v91Entero && v91Numero > 0 && v91 !== '98';

    if (estaVacio(v92Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V92-ERROR-001',
        variable,
        severidad: 'error',
        titulo: 'V92 está vacía',
        mensaje: 'V92 está vacía. Debe registrar el código de habilitación de la IPS1 que suministró la radioterapia, 96 si fue fuera del país o 98 si no aplica.',
        regla: 'El instructivo exige registrar el código de habilitación de la IPS1, 96 para radioterapia fuera del país o 98 cuando no aplica.',
        recomendacion: 'Corrija V92 registrando un código REPS de 12 dígitos, 96 o 98 según corresponda.',
        valor: v92Original,
        datosRelacionados,
        columnasCorregir: ['V92']
      }));
      return hallazgos;
    }

    if (v92 !== '96' && v92 !== '98' && !/^\d{12}$/.test(v92)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V92-ERROR-002',
        variable,
        severidad: 'error',
        titulo: 'V92 tiene formato inválido',
        mensaje: 'V92 tiene formato inválido. Debe registrar un código REPS de 12 dígitos, 96 si la radioterapia fue fuera del país o 98 si no aplica.',
        regla: 'El código de habilitación de IPS debe tener 12 dígitos incluido el cero inicial. El instructivo permite 96 para fuera del país y 98 para No aplica.',
        recomendacion: 'Corrija V92 usando un código REPS de 12 dígitos, 96 o 98 según corresponda.',
        valor: v92Original,
        datosRelacionados,
        columnasCorregir: ['V92']
      }));
      return hallazgos;
    }

    // La trazabilidad con V86 sólo se evalúa cuando V86 ya tiene un valor válido.
    // Esto evita cascadas si V86 está vacía, tiene 2 o está fuera del catálogo.
    if (v86Valida && v86 === '98' && v92 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V92-ERROR-004',
        variable,
        severidad: 'error',
        titulo: 'V92 no corresponde con V86',
        mensaje: 'V92 no corresponde con V86. Si V86 indica que no aplica radioterapia, V92 debe registrarse como 98.',
        regla: 'Cuando V86=98, no aplica radioterapia; por tanto, V92 debe registrar 98.',
        recomendacion: 'Corrija V92 registrando 98.',
        valor: v92Original,
        datosRelacionados,
        columnasCorregir: ['V92']
      }));
      return hallazgos;
    }

    // No se genera una regla adicional por V91=98.
    // Cuando V91=98 es válido, V86 debe ser 98 y la coherencia de V92 ya queda cubierta por V92-ERROR-004.
    // Si V91=98 aparece con V86=1, el error corresponde a V91 y se evita duplicar hallazgos en V92.

    if (v86Valida && v86 === '1' && v91PositivaReal && v92 === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V92-ERROR-003',
        variable,
        severidad: 'error',
        titulo: 'V92 no corresponde con V86 y V91',
        mensaje: 'V92 no corresponde con V86 y V91. Si el usuario recibió radioterapia y V91 registra al menos una IPS suministradora, V92 debe registrar el código de la IPS1 o 96 si fue fuera del país.',
        regla: 'Cuando V86=1 y V91 registra una o más IPS, V92 debe identificar la IPS1 con código REPS de 12 dígitos o 96 para fuera del país, no 98.',
        recomendacion: 'Corrija V92 registrando el código REPS de la IPS1 o 96 si la radioterapia fue fuera del país.',
        valor: v92Original,
        datosRelacionados,
        columnasCorregir: ['V92']
      }));
      return hallazgos;
    }

    // No se consulta REPS en línea ni se valida existencia real de la IPS; sólo formato y comodines del instructivo.
    // La IPS2 se valida de forma independiente en V93. No se valida V94 ni variables futuras desde V92.

    return hallazgos;
  }


  // ============================================================
  // V93. Código de la IPS2 que suministra la radioterapia de este primer o único esquema
  // Encabezado real: v93cdigodelaips2quesuministralar
  // Trazabilidad: V86 → V91 → V92 → V93
  // ============================================================
  function validarV93(registro) {
    const hallazgos = [];
    const variable = 'V93';
    const v86Original = registro?.V86;
    const v91Original = registro?.V91;
    const v93Original = registro?.V93;
    const v86 = normalizarCodigo(v86Original);
    const v91 = texto(v91Original);
    const v93 = normalizarCodigo(v93Original);
    const datosRelacionados = datosBaseV93(v86Original, v91Original, v93Original);
    const v86Valida = v86 === '1' || v86 === '98';
    const v91Entero = /^\d+$/.test(v91);
    const v91Numero = v91Entero ? Number(v91) : NaN;

    if (estaVacio(v93Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V93-ERROR-001',
        variable,
        severidad: 'error',
        titulo: 'V93 está vacía',
        mensaje: 'V93 está vacía. Debe registrar el código de habilitación de la IPS2 que suministró la radioterapia o 98 si no aplica.',
        regla: 'El instructivo exige registrar el código de habilitación de la IPS2 cuando aplica, o 98 cuando no aplica.',
        recomendacion: 'Corrija V93 registrando un código REPS de 12 dígitos o 98 si no aplica.',
        valor: v93Original,
        datosRelacionados,
        columnasCorregir: ['V93']
      }));
      return hallazgos;
    }

    if (v93 !== '98' && !/^\d{12}$/.test(v93)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V93-ERROR-002',
        variable,
        severidad: 'error',
        titulo: 'V93 tiene formato inválido',
        mensaje: 'V93 tiene formato inválido. Debe registrar un código REPS de 12 dígitos o 98 si no aplica. El valor 96 no está permitido en V93 según el instructivo suministrado.',
        regla: 'El código de habilitación de IPS debe tener 12 dígitos incluido el cero inicial. Para V93 el instructivo sólo permite 98 como No aplica.',
        recomendacion: 'Corrija V93 usando un código REPS de 12 dígitos o 98 si no aplica.',
        valor: v93Original,
        datosRelacionados,
        columnasCorregir: ['V93']
      }));
      return hallazgos;
    }

    // La trazabilidad con V86 sólo se evalúa cuando V86 ya tiene un valor válido.
    // Esto evita cascadas si V86 está vacía, tiene 2 o está fuera del catálogo.
    if (v86Valida && v86 === '98' && v93 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V93-ERROR-005',
        variable,
        severidad: 'error',
        titulo: 'V93 no corresponde con V86',
        mensaje: 'V93 no corresponde con V86. Si V86 indica que no aplica radioterapia, V93 debe registrarse como 98.',
        regla: 'Cuando V86=98, no aplica radioterapia; por tanto, V93 debe registrar 98.',
        recomendacion: 'Corrija V93 registrando 98.',
        valor: v93Original,
        datosRelacionados,
        columnasCorregir: ['V93']
      }));
      return hallazgos;
    }

    // La trazabilidad con V91 sólo se evalúa cuando V91 ya es un entero válido.
    // Si V91 es inválida o V91=98 con V86=1, el error corresponde a V91 y se evita duplicar hallazgos en V93.
    if (v91Entero && v91Numero >= 2 && v91Numero !== 98 && v93 === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V93-ERROR-003',
        variable,
        severidad: 'error',
        titulo: 'V93 no corresponde con V91',
        mensaje: 'V93 no corresponde con V91. Si V91 indica dos o más IPS suministradoras, V93 debe registrar el código de la IPS2.',
        regla: 'Cuando V91 es 2 o mayor, existe una IPS2 que debe identificarse con código REPS de 12 dígitos.',
        recomendacion: 'Corrija V93 registrando el código REPS de la IPS2.',
        valor: v93Original,
        datosRelacionados,
        columnasCorregir: ['V93']
      }));
      return hallazgos;
    }

    if (v91Entero && v91Numero === 1 && v93 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V93-ERROR-004',
        variable,
        severidad: 'error',
        titulo: 'V93 no corresponde con V91',
        mensaje: 'V93 no corresponde con V91. Si V91 indica que sólo una IPS suministró la radioterapia, V93 no aplica y debe registrarse como 98.',
        regla: 'Cuando V91=1 sólo existe IPS1; por tanto, la IPS2 no aplica y V93 debe ser 98.',
        recomendacion: 'Corrija V93 registrando 98.',
        valor: v93Original,
        datosRelacionados,
        columnasCorregir: ['V93']
      }));
      return hallazgos;
    }

    // No se consulta REPS en línea ni se valida existencia real de la IPS; sólo formato y comodín 98 del instructivo.
    // No se permite 96 en V93 porque el instructivo suministrado para esta variable no lo incluye.
    // No se valida V94 ni variables futuras desde V93.

    return hallazgos;
  }


  // ============================================================
  // V94. Fecha de finalización de primer o único esquema de radioterapia
  // Encabezado real: v94fechadefinalizacindeprimeroni
  // Trazabilidad: V86 → V88 → V94
  // ============================================================
  function validarV94(registro) {
    const hallazgos = [];
    const variable = 'V94';
    const v86Original = registro?.V86;
    const v88Original = registro?.V88;
    const v94Original = registro?.V94;
    const v86 = normalizarCodigo(v86Original);
    const v88 = texto(v88Original);
    const v94 = texto(v94Original);
    const datosRelacionados = datosBaseV94(v86Original, v88Original, v94Original);
    const v86Valida = v86 === '1' || v86 === '98';
    const comodinEnCurso = '1800-01-01';
    const comodinNoAplica = '1845-01-01';

    if (estaVacio(v94Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V94-ERROR-001',
        variable,
        severidad: 'error',
        titulo: 'V94 está vacía',
        mensaje: 'V94 está vacía. Debe registrar la fecha de finalización del primer o único esquema de radioterapia, 1800-01-01 si aún no finaliza o 1845-01-01 si no aplica.',
        regla: 'El instructivo exige registrar la fecha de finalización del esquema de radioterapia en formato AAAA-MM-DD, 1800-01-01 si el esquema aún no finaliza o 1845-01-01 cuando no aplica.',
        recomendacion: 'Corrija V94 registrando una fecha válida en formato AAAA-MM-DD, 1800-01-01 o 1845-01-01 según corresponda.',
        valor: v94Original,
        datosRelacionados,
        columnasCorregir: ['V94']
      }));
      return hallazgos;
    }

    if (!tieneFormatoFechaISO(v94)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V94-ERROR-002',
        variable,
        severidad: 'error',
        titulo: 'V94 tiene formato inválido',
        mensaje: 'V94 tiene formato inválido. Debe registrar la fecha en formato AAAA-MM-DD, 1800-01-01 si aún no finaliza o 1845-01-01 si no aplica.',
        regla: 'El instructivo solicita registrar la fecha en formato AAAA-MM-DD.',
        recomendacion: 'Corrija V94 usando el formato AAAA-MM-DD. Si sólo conoce año y mes, registre el día 15.',
        valor: v94Original,
        datosRelacionados,
        columnasCorregir: ['V94']
      }));
      return hallazgos;
    }

    if (!fechaExisteISO(v94)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V94-ERROR-003',
        variable,
        severidad: 'error',
        titulo: 'V94 contiene una fecha inexistente',
        mensaje: 'V94 contiene una fecha inexistente. Verifique que la fecha registrada sea válida en formato AAAA-MM-DD.',
        regla: 'El dato debe ser una fecha real o uno de los comodines permitidos por el instructivo.',
        recomendacion: 'Corrija V94 con una fecha real. Si sólo conoce año y mes, registre el día 15.',
        valor: v94Original,
        datosRelacionados,
        columnasCorregir: ['V94']
      }));
      return hallazgos;
    }

    // La trazabilidad con V86 sólo se evalúa cuando V86 ya tiene un valor válido.
    // Esto evita cascadas si V86 está vacía, tiene 2 o está fuera del catálogo.
    if (v86Valida && v86 === '1' && v94 === comodinNoAplica) {
      hallazgos.push(crearHallazgo({
        codigo: 'V94-ERROR-004',
        variable,
        severidad: 'error',
        titulo: 'V94 no corresponde con V86',
        mensaje: 'V94 no corresponde con V86. Si V86 indica que el usuario recibió radioterapia, V94 debe registrar una fecha real de finalización o 1800-01-01 si el esquema aún no finaliza.',
        regla: 'Cuando V86=1, la radioterapia sí aplica; por tanto, V94 no debe ser 1845-01-01.',
        recomendacion: 'Corrija V94 registrando la fecha real de finalización o 1800-01-01 si el esquema aún no ha finalizado.',
        valor: v94Original,
        datosRelacionados,
        columnasCorregir: ['V94']
      }));
      return hallazgos;
    }

    if (v86Valida && v86 === '98' && v94 !== comodinNoAplica) {
      hallazgos.push(crearHallazgo({
        codigo: 'V94-ERROR-005',
        variable,
        severidad: 'error',
        titulo: 'V94 no corresponde con V86',
        mensaje: 'V94 no corresponde con V86. Si V86 indica que no aplica radioterapia, V94 debe registrarse como 1845-01-01.',
        regla: 'Cuando V86=98, no aplica radioterapia; por tanto, V94 debe registrar 1845-01-01.',
        recomendacion: 'Corrija V94 registrando 1845-01-01.',
        valor: v94Original,
        datosRelacionados,
        columnasCorregir: ['V94']
      }));
      return hallazgos;
    }

    // Sólo se compara contra V88 cuando ambas son fechas reales.
    // Los comodines 1800-01-01 y 1845-01-01 no se tratan como fechas clínicas reales.
    if (esFechaRealRadioterapia(v88) && esFechaRealRadioterapia(v94) && v94 < v88) {
      hallazgos.push(crearHallazgo({
        codigo: 'V94-ERROR-006',
        variable,
        severidad: 'error',
        titulo: 'V94 es anterior a V88',
        mensaje: 'V94 no corresponde con V88. La fecha de finalización del esquema de radioterapia no puede ser anterior a la fecha de inicio registrada en V88.',
        regla: 'La fecha de finalización debe ser igual o posterior a la fecha de inicio del primer o único esquema de radioterapia.',
        recomendacion: 'Corrija V94 o V88 según la trazabilidad clínica del esquema.',
        valor: v94Original,
        datosRelacionados,
        columnasCorregir: ['V94']
      }));
      return hallazgos;
    }

    // No se generan advertencias por 1800-01-01 cuando V86=1 porque el instructivo lo permite para esquemas aún no finalizados.
    // No se valida duración mínima, duración máxima, periodo de reporte, CUPS, IPS, CIE-10 ni variables futuras desde V94.

    return hallazgos;
  }


  // ============================================================
  // V95. Características actuales de este primer o único esquema de radioterapia
  // Encabezado real: v95caractersticasactualesdeestep
  // Trazabilidad: V86 → V94 → V95
  // ============================================================
  function validarV95(registro) {
    const hallazgos = [];
    const variable = 'V95';
    const v86Original = registro?.V86;
    const v94Original = registro?.V94;
    const v95Original = registro?.V95;
    const v86 = normalizarCodigo(v86Original);
    const v94 = texto(v94Original);
    const v95 = normalizarCodigo(v95Original);
    const permitidos = ['1', '2', '3', '98'];
    const datosRelacionados = datosBaseV95(v86Original, v94Original, v95Original);
    const v86Valida = v86 === '1' || v86 === '98';
    const comodinEnCurso = '1800-01-01';

    if (estaVacio(v95Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V95-ERROR-001',
        variable,
        severidad: 'error',
        titulo: 'V95 está vacía',
        mensaje: 'V95 está vacía. Debe registrar la característica actual del primer o único esquema de radioterapia, o 98 si no aplica.',
        regla: 'El instructivo exige registrar si el esquema finalizó con dosis completa, finalizó con dosis incompleta, continúa bajo tratamiento o no aplica.',
        recomendacion: 'Corrija V95 registrando 1, 2, 3 o 98 según corresponda.',
        valor: v95Original,
        datosRelacionados,
        columnasCorregir: ['V95']
      }));
      return hallazgos;
    }

    if (!permitidos.includes(v95)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V95-ERROR-002',
        variable,
        severidad: 'error',
        titulo: 'V95 tiene un valor fuera del catálogo permitido',
        mensaje: 'V95 tiene un valor fuera del catálogo permitido. Sólo se permite 1, 2, 3 o 98.',
        regla: 'Según el instructivo, V95 sólo permite 1 finalizado con dosis completa, 2 finalizado con dosis incompleta, 3 no finalizado aún bajo tratamiento o 98 No aplica.',
        recomendacion: 'Corrija V95 usando uno de los valores permitidos por el instructivo.',
        valor: v95Original,
        datosRelacionados,
        columnasCorregir: ['V95']
      }));
      return hallazgos;
    }

    // La trazabilidad con V86 sólo se evalúa cuando V86 ya tiene un valor válido.
    // Esto evita cascadas si V86 está vacía, tiene 2 o está fuera del catálogo.
    if (v86Valida && v86 === '98' && v95 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V95-ERROR-004',
        variable,
        severidad: 'error',
        titulo: 'V95 no corresponde con V86',
        mensaje: 'V95 no corresponde con V86. Si V86 indica que no aplica radioterapia, V95 debe registrarse como 98.',
        regla: 'Cuando V86=98, no aplica radioterapia; por tanto, V95 debe registrar 98.',
        recomendacion: 'Corrija V95 registrando 98.',
        valor: v95Original,
        datosRelacionados,
        columnasCorregir: ['V95']
      }));
      return hallazgos;
    }

    if (v86Valida && v86 === '1' && v95 === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V95-ERROR-003',
        variable,
        severidad: 'error',
        titulo: 'V95 no corresponde con V86',
        mensaje: 'V95 no corresponde con V86. Si V86 indica que el usuario recibió radioterapia, V95 debe registrar la característica actual del esquema.',
        regla: 'Cuando V86=1, la radioterapia sí aplica; por tanto, V95 debe registrar 1, 2 o 3, no 98.',
        recomendacion: 'Corrija V95 registrando 1, 2 o 3 según el estado actual del esquema.',
        valor: v95Original,
        datosRelacionados,
        columnasCorregir: ['V95']
      }));
      return hallazgos;
    }

    // La trazabilidad con V94 sólo se evalúa cuando V94 tiene un valor válido y clínicamente interpretable.
    if (v94 === comodinEnCurso && v95 !== '3') {
      hallazgos.push(crearHallazgo({
        codigo: 'V95-ERROR-005',
        variable,
        severidad: 'error',
        titulo: 'V95 no corresponde con V94',
        mensaje: 'V95 no corresponde con V94. Si V94=1800-01-01 indica que el esquema aún no finaliza, V95 debe ser 3: no finalizado, esquema incompleto, pero aún bajo tratamiento.',
        regla: 'El comodín 1800-01-01 de V94 significa esquema de radioterapia que aún no finaliza; por tanto, la característica actual debe ser no finalizado bajo tratamiento.',
        recomendacion: 'Corrija V95 registrando 3 o revise V94 si el esquema realmente ya finalizó.',
        valor: v95Original,
        datosRelacionados,
        columnasCorregir: ['V95']
      }));
      return hallazgos;
    }

    if (esFechaRealRadioterapia(v94) && v95 === '3') {
      hallazgos.push(crearHallazgo({
        codigo: 'V95-ERROR-006',
        variable,
        severidad: 'error',
        titulo: 'V95 no corresponde con V94',
        mensaje: 'V95 no corresponde con V94. Si V94 registra una fecha real de finalización, V95 no debe indicar que el esquema no ha finalizado.',
        regla: 'Una fecha real de finalización en V94 indica que el esquema terminó; por tanto, V95 debe ser 1 o 2 según la dosis finalizada.',
        recomendacion: 'Corrija V95 registrando 1 o 2, o revise V94 si el esquema sigue en curso.',
        valor: v95Original,
        datosRelacionados,
        columnasCorregir: ['V95']
      }));
      return hallazgos;
    }

    // V96 valida el motivo sólo cuando V95=2; V95 no genera cascadas sobre variables futuras.
    // No se cruza V95 con CUPS, IPS, CIE-10, cirugía, duración ni número de sesiones.

    return hallazgos;
  }


  // ============================================================
  // V96. Motivo de la finalización de este primer o único esquema de radioterapia
  // Encabezado real: v96motivofinalizacinprimeronicoe
  // Trazabilidad: V95 → V96
  // Aplica sólo si V95=2
  // ============================================================
  function validarV96(registro) {
    const hallazgos = [];
    const variable = 'V96';
    const v95Original = registro?.V95;
    const v96Original = registro?.V96;
    const v95 = normalizarCodigo(v95Original);
    const v96 = normalizarCodigo(v96Original);
    const permitidos = ['1', '2', '3', '4', '5', '6', '7', '98'];
    const motivosAplicables = ['1', '2', '3', '4', '5', '6', '7'];
    const datosRelacionados = datosBaseV96(v95Original, v96Original);
    const v95Valida = ['1', '2', '3', '98'].includes(v95);

    if (estaVacio(v96Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V96-ERROR-001',
        variable,
        severidad: 'error',
        titulo: 'V96 está vacía',
        mensaje: 'V96 está vacía. Debe registrar el motivo de finalización del esquema de radioterapia si V95=2, o 98 si no aplica.',
        regla: 'El instructivo exige registrar un único motivo cuando el esquema finalizó con dosis incompleta; en los demás casos debe registrar 98.',
        recomendacion: 'Corrija V96 registrando 1, 2, 3, 4, 5, 6, 7 o 98 según corresponda.',
        valor: v96Original,
        datosRelacionados,
        columnasCorregir: ['V96']
      }));
      return hallazgos;
    }

    if (!permitidos.includes(v96)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V96-ERROR-002',
        variable,
        severidad: 'error',
        titulo: 'V96 tiene un valor fuera del catálogo permitido',
        mensaje: 'V96 tiene un valor fuera del catálogo permitido. Sólo se permite 1, 2, 3, 4, 5, 6, 7 o 98.',
        regla: 'Según el instructivo, V96 sólo permite motivos 1 a 7 o 98 No aplica.',
        recomendacion: 'Corrija V96 usando uno de los valores permitidos por el instructivo.',
        valor: v96Original,
        datosRelacionados,
        columnasCorregir: ['V96']
      }));
      return hallazgos;
    }

    // La trazabilidad con V95 sólo se evalúa cuando V95 ya tiene un valor válido.
    // Esto evita cascadas si V95 está vacía o fuera del catálogo.
    if (!v95Valida) {
      return hallazgos;
    }

    if (v95 === '2' && v96 === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V96-ERROR-003',
        variable,
        severidad: 'error',
        titulo: 'V96 no corresponde con V95',
        mensaje: 'V96 no corresponde con V95. Si V95=2 indica esquema finalizado con dosis incompleta, V96 debe registrar el motivo de finalización.',
        regla: 'Cuando V95=2, V96 aplica y debe registrar uno de los motivos 1 a 7; no debe quedar como 98.',
        recomendacion: 'Corrija V96 registrando el motivo que primero ocurrió: 1 toxicidad, 2 otros motivos médicos, 3 muerte, 4 cambio de EPS, 5 abandono, 6 otros administrativos o 7 otras causas.',
        valor: v96Original,
        datosRelacionados,
        columnasCorregir: ['V96']
      }));
      return hallazgos;
    }

    if (v95 === '1' && motivosAplicables.includes(v96)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V96-ERROR-004',
        variable,
        severidad: 'error',
        titulo: 'V96 no corresponde con V95',
        mensaje: 'V96 no corresponde con V95. Si V95=1 indica esquema finalizado con dosis completa, V96 no aplica y debe ser 98.',
        regla: 'V96 aplica sólo cuando V95=2. Para esquemas finalizados con dosis completa, el motivo de finalización incompleta no aplica.',
        recomendacion: 'Corrija V96 registrando 98.',
        valor: v96Original,
        datosRelacionados,
        columnasCorregir: ['V96']
      }));
      return hallazgos;
    }

    if (v95 === '3' && motivosAplicables.includes(v96)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V96-ERROR-005',
        variable,
        severidad: 'error',
        titulo: 'V96 no corresponde con V95',
        mensaje: 'V96 no corresponde con V95. Si V95=3 indica esquema no finalizado y aún bajo tratamiento, V96 no aplica y debe ser 98.',
        regla: 'V96 aplica sólo cuando V95=2. Si el esquema continúa en tratamiento, no existe motivo de finalización.',
        recomendacion: 'Corrija V96 registrando 98.',
        valor: v96Original,
        datosRelacionados,
        columnasCorregir: ['V96']
      }));
      return hallazgos;
    }

    if (v95 === '98' && motivosAplicables.includes(v96)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V96-ERROR-006',
        variable,
        severidad: 'error',
        titulo: 'V96 no corresponde con V95',
        mensaje: 'V96 no corresponde con V95. Si V95=98 indica No aplica, V96 también debe registrarse como 98.',
        regla: 'Cuando V95=98, no aplica el esquema de radioterapia; por tanto, V96 debe ser 98.',
        recomendacion: 'Corrija V96 registrando 98.',
        valor: v96Original,
        datosRelacionados,
        columnasCorregir: ['V96']
      }));
      return hallazgos;
    }

    // No se cruza V96 con muerte/estado vital, EPS, CUPS, IPS, CIE-10, cirugía ni fechas administrativas.

    return hallazgos;
  }



  // ============================================================
  // V97. Fecha de inicio del último esquema de cualquier tipo de radioterapia
  // Encabezado real: v97fechadeiniciodelltimoesquemad
  // Trazabilidad: V86 → V88 → V97
  // ============================================================
  function validarV97(registro) {
    const hallazgos = [];
    const variable = 'V97';
    const v86Original = registro?.V86;
    const v88Original = registro?.V88;
    const v97Original = registro?.V97;
    const v86 = normalizarCodigo(v86Original);
    const v88 = texto(v88Original);
    const v97 = texto(v97Original);
    const datosRelacionados = datosBaseV97(v86Original, v88Original, v97Original);
    const v86Valida = v86 === '1' || v86 === '98';
    const comodinNoAplica = '1845-01-01';

    if (estaVacio(v97Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V97-ERROR-001',
        variable,
        severidad: 'error',
        titulo: 'V97 está vacía',
        mensaje: 'V97 está vacía. Debe registrar la fecha de inicio del último esquema de radioterapia en formato AAAA-MM-DD, o 1845-01-01 si no aplica.',
        regla: 'El instructivo exige registrar la fecha en que se inició el último esquema de cualquier tipo de radioterapia suministrado en el periodo de reporte actual, o 1845-01-01 cuando no aplica.',
        recomendacion: 'Corrija V97 registrando una fecha válida en formato AAAA-MM-DD. Si sólo conoce año y mes, registre el día 15. Si no aplica radioterapia, registre 1845-01-01.',
        valor: v97Original,
        datosRelacionados,
        columnasCorregir: ['V97']
      }));
      return hallazgos;
    }

    if (!tieneFormatoFechaISO(v97)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V97-ERROR-002',
        variable,
        severidad: 'error',
        titulo: 'V97 tiene formato inválido',
        mensaje: 'V97 tiene formato inválido. Debe registrar la fecha en formato AAAA-MM-DD o 1845-01-01 si no aplica.',
        regla: 'El instructivo solicita registrar la fecha en formato AAAA-MM-DD.',
        recomendacion: 'Corrija V97 usando el formato AAAA-MM-DD. Si sólo conoce año y mes, registre el día 15.',
        valor: v97Original,
        datosRelacionados,
        columnasCorregir: ['V97']
      }));
      return hallazgos;
    }

    if (!fechaExisteISO(v97)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V97-ERROR-003',
        variable,
        severidad: 'error',
        titulo: 'V97 contiene una fecha inexistente',
        mensaje: 'V97 contiene una fecha inexistente. Verifique que la fecha registrada sea válida en formato AAAA-MM-DD.',
        regla: 'El dato debe ser una fecha real o el comodín 1845-01-01 permitido por el instructivo.',
        recomendacion: 'Corrija V97 con una fecha real. Si sólo conoce año y mes, registre el día 15.',
        valor: v97Original,
        datosRelacionados,
        columnasCorregir: ['V97']
      }));
      return hallazgos;
    }

    // La trazabilidad con V86 sólo se evalúa cuando V86 ya tiene un valor válido.
    // Esto evita cascadas si V86 está vacía, tiene 2 o está fuera del catálogo.
    if (v86Valida && v86 === '1' && v97 === comodinNoAplica) {
      hallazgos.push(crearHallazgo({
        codigo: 'V97-ERROR-004',
        variable,
        severidad: 'error',
        titulo: 'V97 no corresponde con V86',
        mensaje: 'V97 no corresponde con V86. Si V86 indica que el usuario recibió radioterapia, V97 debe registrar la fecha de inicio del último esquema. Si sólo tuvo un esquema, el último esquema puede coincidir con el primer o único esquema registrado en V88.',
        regla: 'Cuando V86=1, el usuario recibió radioterapia; por tanto, debe existir una fecha de inicio del último esquema de radioterapia y no debe registrarse 1845-01-01.',
        recomendacion: 'Corrija V97 registrando la fecha de inicio del último esquema de radioterapia.',
        valor: v97Original,
        datosRelacionados,
        columnasCorregir: ['V97']
      }));
      return hallazgos;
    }

    if (v86Valida && v86 === '98' && v97 !== comodinNoAplica) {
      hallazgos.push(crearHallazgo({
        codigo: 'V97-ERROR-005',
        variable,
        severidad: 'error',
        titulo: 'V97 no corresponde con V86',
        mensaje: 'V97 no corresponde con V86. Si V86 indica que no aplica radioterapia, V97 debe registrarse como 1845-01-01.',
        regla: 'Cuando V86=98, no aplica radioterapia; por tanto, V97 debe registrar 1845-01-01.',
        recomendacion: 'Corrija V97 registrando 1845-01-01.',
        valor: v97Original,
        datosRelacionados,
        columnasCorregir: ['V97']
      }));
      return hallazgos;
    }

    // Sólo se compara contra V88 cuando ambas son fechas reales.
    // El comodín 1845-01-01 no se trata como fecha clínica real.
    if (esFechaRealRadioterapia(v88) && esFechaRealRadioterapia(v97) && v97 < v88) {
      hallazgos.push(crearHallazgo({
        codigo: 'V97-ERROR-006',
        variable,
        severidad: 'error',
        titulo: 'V97 es anterior a V88',
        mensaje: 'V97 no corresponde con V88. La fecha de inicio del último esquema de radioterapia no debe ser anterior a la fecha de inicio del primer o único esquema.',
        regla: 'La fecha de inicio del último esquema debe ser igual o posterior a la fecha de inicio del primer o único esquema de radioterapia.',
        recomendacion: 'Corrija V97 o V88 según la trazabilidad clínica del esquema.',
        valor: v97Original,
        datosRelacionados,
        columnasCorregir: ['V97']
      }));
      return hallazgos;
    }

    // No se cruza V97 con finalización del último esquema, duración, periodo de reporte, CUPS, IPS, CIE-10 ni cirugía.

    return hallazgos;
  }


  // ============================================================
  // V98. Ubicación temporal/intención del último esquema de radioterapia
  // Encabezado real: v98ubicacintemporaldelltimoesque
  // Trazabilidad: V86 → V97 → V98
  // ============================================================
  function validarV98(registro) {
    const hallazgos = [];
    const variable = 'V98';
    const v86Original = registro?.V86;
    const v97Original = registro?.V97;
    const v98Original = registro?.V98;
    const v86 = normalizarCodigo(v86Original);
    const v97 = texto(v97Original);
    const v98 = normalizarCodigo(v98Original);
    const datosRelacionados = datosBaseV98(v86Original, v97Original, v98Original);
    const permitidos = ['1', '2', '3', '11', '12', '13', '98'];
    const intencionesReales = ['1', '2', '3', '11', '12', '13'];
    const v86Valida = v86 === '1' || v86 === '98';
    const v97NoAplica = v97 === '1845-01-01';
    const v97FechaReal = esFechaRealRadioterapia(v97);

    if (estaVacio(v98Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V98-ERROR-001',
        variable,
        severidad: 'error',
        titulo: 'V98 está vacía',
        mensaje: 'V98 está vacía. Debe registrar la ubicación temporal o intención del último esquema de radioterapia con un valor permitido, o 98 si no aplica.',
        regla: 'El instructivo exige registrar la ubicación temporal o intención del último esquema de radioterapia con 1, 2, 3, 11, 12, 13 o 98 cuando no aplica.',
        recomendacion: 'Corrija V98 registrando 1, 2, 3, 11, 12 o 13 si hubo último esquema de radioterapia; registre 98 si no aplica.',
        valor: v98Original,
        datosRelacionados,
        columnasCorregir: ['V98']
      }));
      return hallazgos;
    }

    if (!permitidos.includes(v98)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V98-ERROR-002',
        variable,
        severidad: 'error',
        titulo: 'V98 tiene un valor fuera del catálogo permitido',
        mensaje: 'V98 tiene un valor fuera del catálogo permitido. Los valores válidos son 1, 2, 3, 11, 12, 13 y 98.',
        regla: 'El catálogo oficial de V98 sólo permite 1, 2, 3, 11, 12, 13 y 98.',
        recomendacion: 'Corrija V98 usando uno de los valores permitidos por el instructivo.',
        valor: v98Original,
        datosRelacionados,
        columnasCorregir: ['V98']
      }));
      return hallazgos;
    }

    // La trazabilidad con V86 sólo se evalúa cuando V86 ya tiene un valor válido.
    // Esto evita cascadas si V86 está vacía, tiene 2 o está fuera del catálogo.
    if (v86Valida && v86 === '1' && v98 === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V98-ERROR-003',
        variable,
        severidad: 'error',
        titulo: 'V98 no corresponde con V86',
        mensaje: 'V98 no corresponde con V86. Si V86 indica que el usuario recibió radioterapia, V98 debe registrar la intención del último esquema con 1, 2, 3, 11, 12 o 13, no 98.',
        regla: 'Cuando V86=1, el usuario recibió radioterapia; por tanto, V98 debe registrar una intención real para el último esquema.',
        recomendacion: 'Corrija V98 registrando la intención correspondiente del último esquema de radioterapia.',
        valor: v98Original,
        datosRelacionados,
        columnasCorregir: ['V98']
      }));
    }

    if (v86Valida && v86 === '98' && intencionesReales.includes(v98)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V98-ERROR-004',
        variable,
        severidad: 'error',
        titulo: 'V98 no corresponde con V86',
        mensaje: 'V98 no corresponde con V86. Si V86 indica que no aplica radioterapia, V98 debe registrarse como 98.',
        regla: 'Cuando V86=98, no aplica radioterapia; por tanto, V98 también debe registrar 98.',
        recomendacion: 'Corrija V98 registrando 98, o revise V86 si el usuario sí recibió radioterapia.',
        valor: v98Original,
        datosRelacionados,
        columnasCorregir: ['V98']
      }));
    }

    if (v97NoAplica && intencionesReales.includes(v98)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V98-ERROR-005',
        variable,
        severidad: 'error',
        titulo: 'V98 no corresponde con V97',
        mensaje: 'V98 no corresponde con V97. Si V97 está en 1845-01-01 porque no aplica fecha de inicio del último esquema de radioterapia, V98 debe ser 98.',
        regla: 'Cuando V97=1845-01-01, no aplica fecha de inicio del último esquema; por tanto, V98 no debe registrar una intención real.',
        recomendacion: 'Corrija V98 registrando 98, o revise V97 si realmente existe último esquema de radioterapia.',
        valor: v98Original,
        datosRelacionados,
        columnasCorregir: ['V98']
      }));
      return hallazgos;
    }

    if (v97FechaReal && v98 === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V98-ERROR-006',
        variable,
        severidad: 'error',
        titulo: 'V98 no corresponde con V97',
        mensaje: 'V98 no corresponde con V97. Si V97 registra una fecha real de inicio del último esquema de radioterapia, V98 debe registrar la intención con 1, 2, 3, 11, 12 o 13, no 98.',
        regla: 'Cuando V97 tiene una fecha real, existe último esquema de radioterapia; por tanto, V98 debe registrar una intención real.',
        recomendacion: 'Corrija V98 registrando la intención correspondiente del último esquema de radioterapia.',
        valor: v98Original,
        datosRelacionados,
        columnasCorregir: ['V98']
      }));
      return hallazgos;
    }

    if (hallazgos.length === 0 && v98 === '11') {
      hallazgos.push(crearHallazgo({
        codigo: 'V98-ADVERTENCIA-001',
        variable,
        severidad: 'advertencia',
        titulo: 'V98 registra manejo de recaída',
        mensaje: 'V98=11 indica manejo de recaída. Verifique que exista soporte clínico de recaída para el último esquema de radioterapia.',
        regla: 'El valor 11 es permitido por el instructivo para manejo de recaída, pero requiere revisión del soporte clínico.',
        recomendacion: 'Confirme en la historia clínica que el último esquema de radioterapia corresponde a manejo de recaída.',
        valor: v98Original,
        datosRelacionados,
        columnasCorregir: ['V98']
      }));
    }

    if (hallazgos.length === 0 && v98 === '12') {
      hallazgos.push(crearHallazgo({
        codigo: 'V98-ADVERTENCIA-002',
        variable,
        severidad: 'advertencia',
        titulo: 'V98 registra manejo de enfermedad metastásica',
        mensaje: 'V98=12 indica manejo de enfermedad metastásica. Verifique que exista soporte clínico de enfermedad metastásica para el último esquema de radioterapia.',
        regla: 'El valor 12 es permitido por el instructivo para manejo de enfermedad metastásica, pero requiere revisión del soporte clínico.',
        recomendacion: 'Confirme en la historia clínica que el último esquema de radioterapia corresponde a manejo de enfermedad metastásica.',
        valor: v98Original,
        datosRelacionados,
        columnasCorregir: ['V98']
      }));
    }

    if (hallazgos.length === 0 && v98 === '13') {
      hallazgos.push(crearHallazgo({
        codigo: 'V98-ADVERTENCIA-003',
        variable,
        severidad: 'advertencia',
        titulo: 'V98 registra manejo paliativo',
        mensaje: 'V98=13 indica manejo paliativo. Verifique que no corresponda a manejo de recaída ni a enfermedad metastásica.',
        regla: 'El valor 13 es permitido por el instructivo para manejo paliativo sin recaída ni enfermedad metastásica.',
        recomendacion: 'Confirme en la historia clínica que el último esquema corresponde a manejo paliativo y no a recaída ni enfermedad metastásica.',
        valor: v98Original,
        datosRelacionados,
        columnasCorregir: ['V98']
      }));
    }

    // V99 se valida en el bloque siguiente de forma progresiva.
    // No se cruza V98 con CUPS, número de sesiones, IPS, cirugía ni fecha de finalización del último esquema.

    return hallazgos;
  }


  // V99. Tipo de radioterapia aplicada en el último esquema
  // Encabezado real: v99tiporadioterapiaaplicadaenlti
  // Trazabilidad: V86 → V97 → V98 → V99
  // Catálogo: CACCatalogoCUPS.grupos.radioterapia.codigos
  // ============================================================
  function validarV99(registro) {
    const hallazgos = [];
    const variable = 'V99';
    const v86Original = registro?.V86;
    const v97Original = registro?.V97;
    const v98Original = registro?.V98;
    const v99Original = registro?.V99;
    const v86 = normalizarCodigo(v86Original);
    const v97 = texto(v97Original);
    const v98 = normalizarCodigo(v98Original);
    const v99 = normalizarCodigo(v99Original);
    const datosRelacionados = datosBaseV99(v86Original, v97Original, v98Original, v99Original);
    const v86Valida = v86 === '1' || v86 === '98';
    const v98Real = ['1', '2', '3', '11', '12', '13'].includes(v98);
    const v97Real = esFechaRealRadioterapia(v97);
    const v97NoAplica = v97 === '1845-01-01';
    const catalogoGeneralDisponible = catalogoCupsDisponible();
    const catalogoRadioDisponible = catalogoCupsRadioterapiaDisponible();
    const v99EsCups = v99 !== '98';

    if (estaVacio(v99Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V99-ERROR-001',
        variable,
        severidad: 'error',
        titulo: 'V99 está vacía',
        mensaje: 'V99 está vacía. Debe registrar el código CUPS del tipo de radioterapia aplicado en el último esquema, o 98 si no aplica.',
        regla: 'El instructivo exige registrar el código de procedimiento CUPS del archivo operativo CAC para el último esquema de radioterapia, o 98 cuando no aplica.',
        recomendacion: 'Corrija V99 registrando un CUPS válido de radioterapia del archivo operativo CAC o 98 si no aplica.',
        valor: v99Original,
        datosRelacionados,
        columnasCorregir: ['V99']
      }));
      return hallazgos;
    }

    if (v99EsCups && !/^\d{6}$/.test(v99)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V99-ERROR-002',
        variable,
        severidad: 'error',
        titulo: 'V99 registra un CUPS inexistente o inválido',
        mensaje: 'V99 registra un código que no existe en el catálogo operativo CUPS CAC o no cumple el formato de 6 dígitos. Debe registrar un CUPS válido de radioterapia o 98 si no aplica.',
        regla: 'V99 debe contener un código CUPS válido del archivo operativo CAC o el comodín 98 cuando no aplica.',
        recomendacion: 'Corrija V99 usando un código CUPS de 6 dígitos del grupo radioterapia o 98 si no aplica.',
        valor: v99Original,
        datosRelacionados,
        columnasCorregir: ['V99']
      }));
      return hallazgos;
    }

    if (v99EsCups && catalogoGeneralDisponible && !existeCupsEnCatalogo(v99)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V99-ERROR-002',
        variable,
        severidad: 'error',
        titulo: 'V99 registra un CUPS inexistente',
        mensaje: 'V99 registra un código que no existe en el catálogo operativo CUPS CAC. Debe registrar un CUPS válido de radioterapia o 98 si no aplica.',
        regla: 'El instructivo exige registrar un código CUPS del archivo operativo CAC para el tipo de radioterapia aplicado en el último esquema.',
        recomendacion: 'Corrija V99 usando un código CUPS existente en el archivo operativo CAC, preferiblemente del grupo radioterapia.',
        valor: v99Original,
        datosRelacionados,
        columnasCorregir: ['V99']
      }));
      return hallazgos;
    }

    if (v99EsCups && catalogoRadioDisponible && !esCupsRadioterapia(v99)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V99-ERROR-003',
        variable,
        severidad: 'error',
        titulo: 'V99 no pertenece al grupo CUPS de radioterapia',
        mensaje: 'V99 registra un CUPS válido, pero no pertenece al grupo de radioterapia del archivo operativo CAC. Debe registrar un CUPS de radioterapia o 98 si no aplica.',
        regla: 'V99 corresponde al tipo de radioterapia aplicada en el último esquema; por tanto, el CUPS debe pertenecer al grupo radioterapia.',
        recomendacion: 'Corrija V99 usando un código CUPS válido del grupo radioterapia del archivo operativo CAC.',
        valor: v99Original,
        datosRelacionados,
        columnasCorregir: ['V99']
      }));
      return hallazgos;
    }

    if (v86Valida && v86 === '1' && v99 === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V99-ERROR-004',
        variable,
        severidad: 'error',
        titulo: 'V99 no corresponde con V86',
        mensaje: 'V99 no corresponde con V86. Si V86 indica que el usuario recibió radioterapia, V99 debe registrar el CUPS del tipo de radioterapia aplicado en el último esquema, no 98.',
        regla: 'Cuando V86=1, el usuario recibió radioterapia; por tanto, V99 debe registrar un código CUPS del tipo de radioterapia aplicado.',
        recomendacion: 'Corrija V99 registrando el CUPS de radioterapia correspondiente al último esquema.',
        valor: v99Original,
        datosRelacionados,
        columnasCorregir: ['V99']
      }));
    }

    if (v86Valida && v86 === '98' && v99 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V99-ERROR-005',
        variable,
        severidad: 'error',
        titulo: 'V99 no corresponde con V86',
        mensaje: 'V99 no corresponde con V86. Si V86 indica que no aplica radioterapia, V99 debe registrarse como 98.',
        regla: 'Cuando V86=98, no aplica radioterapia; por tanto, V99 también debe registrar 98.',
        recomendacion: 'Corrija V99 registrando 98, o revise V86 si el usuario sí recibió radioterapia.',
        valor: v99Original,
        datosRelacionados,
        columnasCorregir: ['V99']
      }));
    }

    if (v97NoAplica && v99 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V99-ERROR-006',
        variable,
        severidad: 'error',
        titulo: 'V99 no corresponde con V97',
        mensaje: 'V99 no corresponde con V97. Si V97 está en 1845-01-01 porque no aplica fecha de inicio del último esquema de radioterapia, V99 debe ser 98.',
        regla: 'Cuando V97=1845-01-01, no aplica el último esquema de radioterapia; por tanto, V99 no debe registrar un CUPS real.',
        recomendacion: 'Corrija V99 registrando 98, o revise V97 si realmente existe último esquema de radioterapia.',
        valor: v99Original,
        datosRelacionados,
        columnasCorregir: ['V99']
      }));
    }

    if (v97Real && v99 === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V99-ERROR-007',
        variable,
        severidad: 'error',
        titulo: 'V99 no corresponde con V97',
        mensaje: 'V99 no corresponde con V97. Si V97 registra una fecha real de inicio del último esquema de radioterapia, V99 debe registrar un CUPS de radioterapia, no 98.',
        regla: 'Cuando V97 tiene fecha real, existe último esquema de radioterapia; por tanto, V99 debe registrar el tipo de radioterapia aplicado.',
        recomendacion: 'Corrija V99 registrando el CUPS de radioterapia correspondiente al último esquema.',
        valor: v99Original,
        datosRelacionados,
        columnasCorregir: ['V99']
      }));
    }

    if (v98 === '98' && v99 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V99-ERROR-008',
        variable,
        severidad: 'error',
        titulo: 'V99 no corresponde con V98',
        mensaje: 'V99 no corresponde con V98. Si V98 está en 98 porque no aplica el último esquema de radioterapia, V99 debe ser 98.',
        regla: 'Cuando V98=98, no aplica la intención del último esquema; por tanto, V99 tampoco debe registrar un CUPS real.',
        recomendacion: 'Corrija V99 registrando 98, o revise V98 si realmente existe último esquema de radioterapia.',
        valor: v99Original,
        datosRelacionados,
        columnasCorregir: ['V99']
      }));
    }

    if (v98Real && v99 === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V99-ERROR-009',
        variable,
        severidad: 'error',
        titulo: 'V99 no corresponde con V98',
        mensaje: 'V99 no corresponde con V98. Si V98 registra la intención del último esquema de radioterapia, V99 debe registrar un CUPS de radioterapia, no 98.',
        regla: 'Cuando V98 tiene una intención real, existe último esquema de radioterapia; por tanto, V99 debe registrar el tipo de radioterapia aplicado.',
        recomendacion: 'Corrija V99 registrando el CUPS de radioterapia correspondiente al último esquema.',
        valor: v99Original,
        datosRelacionados,
        columnasCorregir: ['V99']
      }));
    }

    if (hallazgos.length === 0 && v99EsCups && catalogoRadioDisponible && esCupsRadioterapia(v99)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V99-ADVERTENCIA-001',
        variable,
        severidad: 'advertencia',
        titulo: 'V99 registra CUPS válido de radioterapia',
        mensaje: 'V99 registra un CUPS válido de radioterapia. Verifique que corresponda al tipo de radioterapia aplicado en el último esquema, no al primer esquema si fueron diferentes.',
        regla: 'El código CUPS es válido para radioterapia; la verificación clínica debe confirmar que corresponde al último esquema reportado.',
        recomendacion: 'Confirme en la historia clínica que el CUPS corresponde al último esquema de radioterapia suministrado en el periodo.',
        valor: v99Original,
        datosRelacionados,
        columnasCorregir: ['V99']
      }));
    }

    // No se cruza V99 con V100, sesiones, IPS, cirugía ni fecha de finalización del último esquema.

    return hallazgos;
  }


  // ============================================================
  // V100. Número de IPS que suministran el último esquema de radioterapia
  // Encabezado real: v100ipsquesuministranltimoesquem
  // Trazabilidad: V86 → V97 → V98 → V99 → V100
  // ============================================================
  function validarV100(registro) {
    const hallazgos = [];
    const variable = 'V100';
    const v86Original = registro?.V86;
    const v97Original = registro?.V97;
    const v98Original = registro?.V98;
    const v99Original = registro?.V99;
    const v100Original = registro?.V100;

    const v86 = normalizarCodigo(v86Original);
    const v97 = texto(v97Original);
    const v98 = normalizarCodigo(v98Original);
    const v99 = normalizarCodigo(v99Original);
    const v100Texto = texto(v100Original);

    const datosRelacionados = datosBaseV100(v86Original, v97Original, v98Original, v99Original, v100Original);
    const v86Valida = v86 === '1' || v86 === '98';
    const v97EsNoAplica = v97 === '1845-01-01';
    const v97EsFechaReal = esFechaRealRadioterapia(v97);
    const v98EsIntencionReal = ['1', '2', '3', '11', '12', '13'].includes(v98);
    const v98EsNoAplica = v98 === '98';
    const v99EsNoAplica = v99 === '98';
    const v99EsCupsRadioterapia = /^\d{6}$/.test(v99) && esCupsRadioterapia(v99);

    if (estaVacio(v100Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V100-ERROR-001',
        variable,
        severidad: 'error',
        titulo: 'V100 está vacía',
        mensaje: 'V100 está vacía. Debe registrar el número de IPS que suministraron el último esquema de radioterapia, o 98 si no aplica.',
        regla: 'El instructivo exige registrar el número de IPS que intervinieron en la administración de la dosis de radioterapia, o 98 cuando no aplica.',
        recomendacion: 'Corrija V100 registrando el número de IPS que suministraron el último esquema o 98 si no aplica.',
        valor: v100Original,
        datosRelacionados,
        columnasCorregir: ['V100']
      }));
      return hallazgos;
    }

    if (!/^\d+$/.test(v100Texto)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V100-ERROR-002',
        variable,
        severidad: 'error',
        titulo: 'V100 tiene un valor inválido',
        mensaje: 'V100 tiene un valor inválido. Debe registrar un número entero positivo de IPS, o 98 si no aplica.',
        regla: 'V100 es un conteo de IPS; por tanto, sólo permite enteros positivos o el comodín 98 cuando no aplica.',
        recomendacion: 'Corrija V100 usando un número entero positivo sin decimales ni símbolos, o 98 si no aplica.',
        valor: v100Original,
        datosRelacionados,
        columnasCorregir: ['V100']
      }));
      return hallazgos;
    }

    const numero = Number(v100Texto);

    if (!Number.isInteger(numero) || numero <= 0) {
      hallazgos.push(crearHallazgo({
        codigo: 'V100-ERROR-002',
        variable,
        severidad: 'error',
        titulo: 'V100 tiene un número no permitido',
        mensaje: 'V100 tiene un valor inválido. Debe registrar un número entero positivo de IPS, o 98 si no aplica. No se permiten cero, negativos ni decimales.',
        regla: 'V100 es un conteo de IPS y no puede ser cero ni negativo; si no aplica debe usarse 98.',
        recomendacion: 'Corrija V100 registrando un entero positivo mayor que cero o 98 si no aplica.',
        valor: v100Original,
        datosRelacionados,
        columnasCorregir: ['V100']
      }));
      return hallazgos;
    }

    const registraNumeroIps = numero !== 98;

    if (v86Valida && v86 === '1' && numero === 98) {
      hallazgos.push(crearHallazgo({
        codigo: 'V100-ERROR-003',
        variable,
        severidad: 'error',
        titulo: 'V100 no corresponde con V86',
        mensaje: 'V100 no corresponde con V86. Si V86 indica que el usuario recibió radioterapia, V100 debe registrar el número de IPS que suministraron el último esquema, no 98.',
        regla: 'Cuando V86=1, el usuario recibió radioterapia; por tanto, V100 debe registrar cuántas IPS suministraron el último esquema.',
        recomendacion: 'Corrija V100 registrando el número de IPS que suministraron el último esquema de radioterapia.',
        valor: v100Original,
        datosRelacionados,
        columnasCorregir: ['V100']
      }));
    }

    if (v86Valida && v86 === '98' && registraNumeroIps) {
      hallazgos.push(crearHallazgo({
        codigo: 'V100-ERROR-004',
        variable,
        severidad: 'error',
        titulo: 'V100 no corresponde con V86',
        mensaje: 'V100 no corresponde con V86. Si V86 indica que no aplica radioterapia, V100 debe registrarse como 98.',
        regla: 'Cuando V86=98, no aplica radioterapia; por tanto, V100 también debe registrar 98.',
        recomendacion: 'Corrija V100 registrando 98, o revise V86 si el usuario sí recibió radioterapia.',
        valor: v100Original,
        datosRelacionados,
        columnasCorregir: ['V100']
      }));
    }

    if (v97EsNoAplica && registraNumeroIps) {
      hallazgos.push(crearHallazgo({
        codigo: 'V100-ERROR-005',
        variable,
        severidad: 'error',
        titulo: 'V100 no corresponde con V97',
        mensaje: 'V100 no corresponde con V97. Si V97 está en 1845-01-01 porque no aplica fecha de inicio del último esquema de radioterapia, V100 debe ser 98.',
        regla: 'Cuando V97=1845-01-01, no aplica el último esquema de radioterapia; por tanto, V100 no debe registrar IPS reales.',
        recomendacion: 'Corrija V100 registrando 98, o revise V97 si realmente existe último esquema de radioterapia.',
        valor: v100Original,
        datosRelacionados,
        columnasCorregir: ['V100']
      }));
    }

    if (v97EsFechaReal && numero === 98) {
      hallazgos.push(crearHallazgo({
        codigo: 'V100-ERROR-006',
        variable,
        severidad: 'error',
        titulo: 'V100 no corresponde con V97',
        mensaje: 'V100 no corresponde con V97. Si V97 registra una fecha real de inicio del último esquema de radioterapia, V100 debe registrar el número de IPS que lo suministraron, no 98.',
        regla: 'Cuando V97 tiene fecha real, existe último esquema de radioterapia; por tanto, V100 debe registrar el número de IPS.',
        recomendacion: 'Corrija V100 registrando el número de IPS que suministraron el último esquema.',
        valor: v100Original,
        datosRelacionados,
        columnasCorregir: ['V100']
      }));
    }

    if (v98EsNoAplica && registraNumeroIps) {
      hallazgos.push(crearHallazgo({
        codigo: 'V100-ERROR-007',
        variable,
        severidad: 'error',
        titulo: 'V100 no corresponde con V98',
        mensaje: 'V100 no corresponde con V98. Si V98 está en 98 porque no aplica el último esquema de radioterapia, V100 debe ser 98.',
        regla: 'Cuando V98=98, no aplica la intención del último esquema; por tanto, V100 tampoco debe registrar IPS reales.',
        recomendacion: 'Corrija V100 registrando 98, o revise V98 si realmente existe último esquema de radioterapia.',
        valor: v100Original,
        datosRelacionados,
        columnasCorregir: ['V100']
      }));
    }

    if (v98EsIntencionReal && numero === 98) {
      hallazgos.push(crearHallazgo({
        codigo: 'V100-ERROR-008',
        variable,
        severidad: 'error',
        titulo: 'V100 no corresponde con V98',
        mensaje: 'V100 no corresponde con V98. Si V98 registra la intención del último esquema de radioterapia, V100 debe registrar el número de IPS que lo suministraron, no 98.',
        regla: 'Cuando V98 tiene una intención real, existe último esquema de radioterapia; por tanto, V100 debe registrar el número de IPS.',
        recomendacion: 'Corrija V100 registrando el número de IPS que suministraron el último esquema.',
        valor: v100Original,
        datosRelacionados,
        columnasCorregir: ['V100']
      }));
    }

    if (v99EsNoAplica && registraNumeroIps) {
      hallazgos.push(crearHallazgo({
        codigo: 'V100-ERROR-009',
        variable,
        severidad: 'error',
        titulo: 'V100 no corresponde con V99',
        mensaje: 'V100 no corresponde con V99. Si V99 está en 98 porque no aplica el tipo de radioterapia del último esquema, V100 debe ser 98.',
        regla: 'Cuando V99=98, no aplica tipo de radioterapia del último esquema; por tanto, V100 tampoco debe registrar IPS reales.',
        recomendacion: 'Corrija V100 registrando 98, o revise V99 si realmente existe tipo de radioterapia del último esquema.',
        valor: v100Original,
        datosRelacionados,
        columnasCorregir: ['V100']
      }));
    }

    if (v99EsCupsRadioterapia && numero === 98) {
      hallazgos.push(crearHallazgo({
        codigo: 'V100-ERROR-010',
        variable,
        severidad: 'error',
        titulo: 'V100 no corresponde con V99',
        mensaje: 'V100 no corresponde con V99. Si V99 registra un CUPS real de radioterapia para el último esquema, V100 debe registrar el número de IPS que lo suministraron, no 98.',
        regla: 'Cuando V99 registra un CUPS real de radioterapia, existe tipo de radioterapia aplicado; por tanto, V100 debe registrar cuántas IPS intervinieron.',
        recomendacion: 'Corrija V100 registrando el número de IPS que suministraron el último esquema de radioterapia.',
        valor: v100Original,
        datosRelacionados,
        columnasCorregir: ['V100']
      }));
    }

    if (hallazgos.length === 0 && registraNumeroIps && numero > 1) {
      hallazgos.push(crearHallazgo({
        codigo: 'V100-ADVERTENCIA-001',
        variable,
        severidad: 'advertencia',
        titulo: 'V100 registra más de una IPS',
        mensaje: 'V100 registra más de una IPS. Verifique que realmente más de una institución intervino en la administración del último esquema de radioterapia.',
        regla: 'El instructivo permite registrar el número de IPS que intervinieron; cuando es mayor que uno requiere verificación operativa.',
        recomendacion: 'Confirme en los soportes que más de una IPS participó en la administración del último esquema.',
        valor: v100Original,
        datosRelacionados,
        columnasCorregir: ['V100']
      }));
    }

    // V101 y V102 se validan en sus propios bloques; V100 no cruza con variables posteriores a su alcance.

    return hallazgos;
  }


  // ============================================================
  // V101. Código de la IPS1 que suministra el último esquema de radioterapia
  // Encabezado real: v101cdigodelaips1quesuministrala
  // Trazabilidad: V86 → V97 → V98 → V99 → V100 → V101
  // ============================================================
  function validarV101(registro) {
    const hallazgos = [];
    const variable = 'V101';
    const v86Original = registro?.V86;
    const v97Original = registro?.V97;
    const v98Original = registro?.V98;
    const v99Original = registro?.V99;
    const v100Original = registro?.V100;
    const v101Original = registro?.V101;

    const v86 = normalizarCodigo(v86Original);
    const v97 = texto(v97Original);
    const v98 = normalizarCodigo(v98Original);
    const v99 = normalizarCodigo(v99Original);
    const v100Texto = texto(v100Original);
    const v101Texto = texto(v101Original);

    const datosRelacionados = datosBaseV101(v86Original, v97Original, v98Original, v99Original, v100Original, v101Original);
    const v86Valida = v86 === '1' || v86 === '98';
    const v97EsNoAplica = v97 === '1845-01-01';
    const v97EsFechaReal = esFechaRealRadioterapia(v97);
    const v98EsIntencionReal = ['1', '2', '3', '11', '12', '13'].includes(v98);
    const v98EsNoAplica = v98 === '98';
    const v99EsNoAplica = v99 === '98';
    const v99EsCupsRadioterapia = /^\d{6}$/.test(v99) && esCupsRadioterapia(v99);
    const v100EsNumero = /^\d+$/.test(v100Texto);
    const numeroIps = v100EsNumero ? Number(v100Texto) : NaN;
    const v100RegistraIps = Number.isInteger(numeroIps) && numeroIps > 0 && numeroIps !== 98;
    const v100NoAplica = v100Texto === '98';
    const v101EsCodigoIps = /^\d{12}$/.test(v101Texto);
    const v101NoAplica = v101Texto === '98';

    if (estaVacio(v101Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V101-ERROR-001',
        variable,
        severidad: 'error',
        titulo: 'V101 está vacía',
        mensaje: 'V101 está vacía. Debe registrar el código de habilitación de la IPS1 que suministró el último esquema de radioterapia, o 98 si no aplica.',
        regla: 'El instructivo exige registrar el código de habilitación de IPS de 12 dígitos para la IPS1, o 98 cuando no aplica.',
        recomendacion: 'Corrija V101 registrando el código de habilitación de la IPS1 en 12 dígitos, o 98 si no aplica.',
        valor: v101Original,
        datosRelacionados,
        columnasCorregir: ['V101']
      }));
      return hallazgos;
    }

    if (!/^\d+$/.test(v101Texto)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V101-ERROR-002',
        variable,
        severidad: 'error',
        titulo: 'V101 tiene un valor inválido',
        mensaje: 'V101 tiene un valor inválido. Debe registrar 98 o un código de habilitación IPS compuesto únicamente por 12 dígitos.',
        regla: 'V101 sólo permite el comodín 98 o un código de habilitación IPS numérico de 12 dígitos.',
        recomendacion: 'Corrija V101 eliminando letras, símbolos, decimales o espacios internos; use 98 o un código IPS de 12 dígitos.',
        valor: v101Original,
        datosRelacionados,
        columnasCorregir: ['V101']
      }));
      return hallazgos;
    }

    if (!v101NoAplica && !v101EsCodigoIps) {
      hallazgos.push(crearHallazgo({
        codigo: 'V101-ERROR-003',
        variable,
        severidad: 'error',
        titulo: 'V101 registra longitud inválida',
        mensaje: 'V101 registra un código IPS con longitud inválida. El código de habilitación debe tener exactamente 12 dígitos, incluido el cero inicial si aplica.',
        regla: 'El instructivo define que el código de habilitación de IPS debe ser de 12 dígitos, incluyendo el cero inicial.',
        recomendacion: 'Corrija V101 registrando exactamente 12 dígitos. No convierta el código a número porque puede perder ceros iniciales.',
        valor: v101Original,
        datosRelacionados,
        columnasCorregir: ['V101']
      }));
      return hallazgos;
    }

    if (v100RegistraIps && v101NoAplica) {
      hallazgos.push(crearHallazgo({
        codigo: 'V101-ERROR-004',
        variable,
        severidad: 'error',
        titulo: 'V101 no corresponde con V100',
        mensaje: 'V101 no corresponde con V100. Si V100 registra una o más IPS que suministraron el último esquema de radioterapia, V101 debe registrar el código de habilitación de la IPS1, no 98.',
        regla: 'Cuando V100 registra una o más IPS, debe existir al menos la IPS1 en V101.',
        recomendacion: 'Corrija V101 registrando el código de habilitación de la IPS1 que suministró el último esquema.',
        valor: v101Original,
        datosRelacionados,
        columnasCorregir: ['V101']
      }));
    }

    if (v100NoAplica && v101EsCodigoIps) {
      hallazgos.push(crearHallazgo({
        codigo: 'V101-ERROR-005',
        variable,
        severidad: 'error',
        titulo: 'V101 no corresponde con V100',
        mensaje: 'V101 no corresponde con V100. Si V100 está en 98 porque no aplica número de IPS para el último esquema de radioterapia, V101 también debe ser 98.',
        regla: 'Cuando V100=98, no aplica registrar IPS del último esquema; por tanto, V101 no debe contener un código de IPS real.',
        recomendacion: 'Corrija V101 registrando 98, o revise V100 si realmente existió una IPS que suministró el último esquema.',
        valor: v101Original,
        datosRelacionados,
        columnasCorregir: ['V101']
      }));
    }

    if (v86Valida && v86 === '1' && v101NoAplica) {
      hallazgos.push(crearHallazgo({
        codigo: 'V101-ERROR-006',
        variable,
        severidad: 'error',
        titulo: 'V101 no corresponde con V86',
        mensaje: 'V101 no corresponde con V86. Si V86 indica que el usuario recibió radioterapia, V101 debe registrar el código de habilitación de la IPS1 que suministró el último esquema, no 98.',
        regla: 'Cuando V86=1, existe radioterapia reportada; la IPS1 del último esquema debe registrarse cuando aplica el último esquema.',
        recomendacion: 'Corrija V101 registrando el código de habilitación de la IPS1.',
        valor: v101Original,
        datosRelacionados,
        columnasCorregir: ['V101']
      }));
    }

    if (v86Valida && v86 === '98' && v101EsCodigoIps) {
      hallazgos.push(crearHallazgo({
        codigo: 'V101-ERROR-007',
        variable,
        severidad: 'error',
        titulo: 'V101 no corresponde con V86',
        mensaje: 'V101 no corresponde con V86. Si V86 indica que no aplica radioterapia, V101 debe registrarse como 98.',
        regla: 'Cuando V86=98, no aplica radioterapia; por tanto, V101 no debe registrar una IPS real.',
        recomendacion: 'Corrija V101 registrando 98, o revise V86 si el usuario sí recibió radioterapia.',
        valor: v101Original,
        datosRelacionados,
        columnasCorregir: ['V101']
      }));
    }

    if (v97EsNoAplica && v101EsCodigoIps) {
      hallazgos.push(crearHallazgo({
        codigo: 'V101-ERROR-008',
        variable,
        severidad: 'error',
        titulo: 'V101 no corresponde con V97',
        mensaje: 'V101 no corresponde con V97. Si V97 está en 1845-01-01 porque no aplica fecha de inicio del último esquema de radioterapia, V101 debe ser 98.',
        regla: 'Cuando V97=1845-01-01, no aplica el último esquema de radioterapia; por tanto, V101 no debe registrar una IPS real.',
        recomendacion: 'Corrija V101 registrando 98, o revise V97 si realmente existe último esquema de radioterapia.',
        valor: v101Original,
        datosRelacionados,
        columnasCorregir: ['V101']
      }));
    }

    if (v97EsFechaReal && v101NoAplica) {
      hallazgos.push(crearHallazgo({
        codigo: 'V101-ERROR-009',
        variable,
        severidad: 'error',
        titulo: 'V101 no corresponde con V97',
        mensaje: 'V101 no corresponde con V97. Si V97 registra una fecha real de inicio del último esquema de radioterapia, V101 debe registrar el código de habilitación de la IPS1 que lo suministró, no 98.',
        regla: 'Cuando V97 tiene fecha real, existe último esquema de radioterapia; por tanto, debe registrarse la IPS1.',
        recomendacion: 'Corrija V101 registrando el código de habilitación de la IPS1.',
        valor: v101Original,
        datosRelacionados,
        columnasCorregir: ['V101']
      }));
    }

    if (v98EsNoAplica && v101EsCodigoIps) {
      hallazgos.push(crearHallazgo({
        codigo: 'V101-ERROR-010',
        variable,
        severidad: 'error',
        titulo: 'V101 no corresponde con V98',
        mensaje: 'V101 no corresponde con V98. Si V98 está en 98 porque no aplica el último esquema de radioterapia, V101 debe ser 98.',
        regla: 'Cuando V98=98, no aplica la intención del último esquema; por tanto, V101 no debe registrar una IPS real.',
        recomendacion: 'Corrija V101 registrando 98, o revise V98 si realmente existe último esquema de radioterapia.',
        valor: v101Original,
        datosRelacionados,
        columnasCorregir: ['V101']
      }));
    }

    if (v98EsIntencionReal && v101NoAplica) {
      hallazgos.push(crearHallazgo({
        codigo: 'V101-ERROR-011',
        variable,
        severidad: 'error',
        titulo: 'V101 no corresponde con V98',
        mensaje: 'V101 no corresponde con V98. Si V98 registra la intención del último esquema de radioterapia, V101 debe registrar el código de habilitación de la IPS1 que lo suministró, no 98.',
        regla: 'Cuando V98 tiene una intención real, existe último esquema de radioterapia; por tanto, debe registrarse la IPS1.',
        recomendacion: 'Corrija V101 registrando el código de habilitación de la IPS1.',
        valor: v101Original,
        datosRelacionados,
        columnasCorregir: ['V101']
      }));
    }

    if (v99EsNoAplica && v101EsCodigoIps) {
      hallazgos.push(crearHallazgo({
        codigo: 'V101-ERROR-012',
        variable,
        severidad: 'error',
        titulo: 'V101 no corresponde con V99',
        mensaje: 'V101 no corresponde con V99. Si V99 está en 98 porque no aplica el tipo de radioterapia del último esquema, V101 debe ser 98.',
        regla: 'Cuando V99=98, no aplica tipo de radioterapia del último esquema; por tanto, V101 no debe registrar una IPS real.',
        recomendacion: 'Corrija V101 registrando 98, o revise V99 si realmente existe tipo de radioterapia del último esquema.',
        valor: v101Original,
        datosRelacionados,
        columnasCorregir: ['V101']
      }));
    }

    if (v99EsCupsRadioterapia && v101NoAplica) {
      hallazgos.push(crearHallazgo({
        codigo: 'V101-ERROR-013',
        variable,
        severidad: 'error',
        titulo: 'V101 no corresponde con V99',
        mensaje: 'V101 no corresponde con V99. Si V99 registra un CUPS real de radioterapia para el último esquema, V101 debe registrar el código de habilitación de la IPS1 que lo suministró, no 98.',
        regla: 'Cuando V99 registra un CUPS real de radioterapia, existe tipo real de radioterapia aplicado; por tanto, debe registrarse la IPS1.',
        recomendacion: 'Corrija V101 registrando el código de habilitación de la IPS1.',
        valor: v101Original,
        datosRelacionados,
        columnasCorregir: ['V101']
      }));
    }

    if (v100RegistraIps && numeroIps > 1 && v101NoAplica) {
      hallazgos.push(crearHallazgo({
        codigo: 'V101-ERROR-014',
        variable,
        severidad: 'error',
        titulo: 'V101 no corresponde con V100',
        mensaje: 'V101 no corresponde con V100. Si V100 registra más de una IPS, V101 debe registrar como mínimo el código de habilitación de la IPS1, no 98.',
        regla: 'Cuando V100 es mayor que 1, existe más de una IPS; como mínimo debe estar registrada la IPS1 en V101.',
        recomendacion: 'Corrija V101 registrando el código de habilitación de la IPS1.',
        valor: v101Original,
        datosRelacionados,
        columnasCorregir: ['V101']
      }));
    }

    if (hallazgos.length === 0 && v101EsCodigoIps) {
      hallazgos.push(crearHallazgo({
        codigo: 'V101-ADVERTENCIA-001',
        variable,
        severidad: 'advertencia',
        titulo: 'V101 registra código IPS formalmente válido',
        mensaje: 'V101 registra un código de habilitación IPS de 12 dígitos. Verifique que corresponda realmente a la IPS1 que suministró el último esquema de radioterapia y que coincida con REPS.',
        regla: 'El código cumple la forma de 12 dígitos, pero la existencia y correspondencia real con REPS requiere verificación contra la fuente oficial o soporte institucional.',
        recomendacion: 'Confirme en REPS o en los soportes institucionales que el código corresponde a la IPS1 del último esquema de radioterapia.',
        valor: v101Original,
        datosRelacionados,
        columnasCorregir: ['V101']
      }));
    }

    // V102 se valida en su propio bloque; no se cruzan variables futuras posteriores a V102.

    return hallazgos;
  }

  // ============================================================
  // V102. Código de la IPS2 que suministra el último esquema de radioterapia
  // Encabezado real: v102cdigodelaips2quesuministrala
  // Trazabilidad: V86 → V97 → V98 → V99 → V100 → V101 → V102
  // ============================================================
  function validarV102(registro) {
    const hallazgos = [];
    const variable = 'V102';
    const v86Original = registro?.V86;
    const v97Original = registro?.V97;
    const v98Original = registro?.V98;
    const v99Original = registro?.V99;
    const v100Original = registro?.V100;
    const v101Original = registro?.V101;
    const v102Original = registro?.V102;

    const v86 = normalizarCodigo(v86Original);
    const v97 = texto(v97Original);
    const v98 = normalizarCodigo(v98Original);
    const v99 = normalizarCodigo(v99Original);
    const v100Texto = texto(v100Original);
    const v101Texto = texto(v101Original);
    const v102Texto = texto(v102Original);

    const datosRelacionados = datosBaseV102(v86Original, v97Original, v98Original, v99Original, v100Original, v101Original, v102Original);
    const v86NoAplica = v86 === '98';
    const v97EsNoAplica = v97 === '1845-01-01';
    const v98EsNoAplica = v98 === '98';
    const v99EsNoAplica = v99 === '98';
    const v100EsNumero = /^\d+$/.test(v100Texto);
    const numeroIps = v100EsNumero ? Number(v100Texto) : NaN;
    const v100UnaIps = numeroIps === 1;
    const v100DosOMasIps = Number.isInteger(numeroIps) && numeroIps >= 2 && numeroIps !== 98;
    const v100NoAplica = v100Texto === '98';
    const v101NoAplica = v101Texto === '98';
    const v101EsCodigoIps = /^\d{12}$/.test(v101Texto);
    const v102EsCodigoIps = /^\d{12}$/.test(v102Texto);
    const v102NoAplica = v102Texto === '98';

    if (estaVacio(v102Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V102-ERROR-001',
        variable,
        severidad: 'error',
        titulo: 'V102 está vacía',
        mensaje: 'V102 está vacía. Debe registrar el código de habilitación de la IPS2 que suministró el último esquema de radioterapia, o 98 si no aplica.',
        regla: 'El instructivo exige registrar el código de habilitación de IPS de 12 dígitos para la IPS2, o 98 cuando no aplica.',
        recomendacion: 'Corrija V102 registrando el código de habilitación de la IPS2 en 12 dígitos, o 98 si no aplica.',
        valor: v102Original,
        datosRelacionados,
        columnasCorregir: ['V102']
      }));
      return hallazgos;
    }

    if (!/^\d+$/.test(v102Texto)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V102-ERROR-002',
        variable,
        severidad: 'error',
        titulo: 'V102 tiene un valor inválido',
        mensaje: 'V102 tiene un valor inválido. Debe registrar 98 o un código de habilitación IPS compuesto únicamente por 12 dígitos.',
        regla: 'V102 sólo permite el comodín 98 o un código de habilitación IPS numérico de 12 dígitos.',
        recomendacion: 'Corrija V102 eliminando letras, símbolos, decimales o espacios internos; use 98 o un código IPS de 12 dígitos.',
        valor: v102Original,
        datosRelacionados,
        columnasCorregir: ['V102']
      }));
      return hallazgos;
    }

    if (!v102NoAplica && !v102EsCodigoIps) {
      hallazgos.push(crearHallazgo({
        codigo: 'V102-ERROR-003',
        variable,
        severidad: 'error',
        titulo: 'V102 registra longitud inválida',
        mensaje: 'V102 registra un código IPS con longitud inválida. El código de habilitación debe tener exactamente 12 dígitos, incluido el cero inicial si aplica.',
        regla: 'El código de habilitación de IPS del REPS debe registrarse con 12 dígitos.',
        recomendacion: 'Corrija V102 registrando exactamente 12 dígitos. No convierta el código a número porque puede perder ceros iniciales.',
        valor: v102Original,
        datosRelacionados,
        columnasCorregir: ['V102']
      }));
      return hallazgos;
    }

    if (v100DosOMasIps && v102NoAplica) {
      hallazgos.push(crearHallazgo({
        codigo: 'V102-ERROR-004',
        variable,
        severidad: 'error',
        titulo: 'V102 no corresponde con V100',
        mensaje: 'V102 no corresponde con V100. Si V100 registra dos o más IPS que suministraron el último esquema de radioterapia, V102 debe registrar el código de habilitación de la IPS2, no 98.',
        regla: 'Cuando V100 es 2 o más, debe existir el código de la IPS2 en V102.',
        recomendacion: 'Corrija V102 registrando el código de habilitación de la IPS2 que suministró el último esquema.',
        valor: v102Original,
        datosRelacionados,
        columnasCorregir: ['V102']
      }));
    }

    if (v100UnaIps && v102EsCodigoIps) {
      hallazgos.push(crearHallazgo({
        codigo: 'V102-ERROR-005',
        variable,
        severidad: 'error',
        titulo: 'V102 no corresponde con V100',
        mensaje: 'V102 no corresponde con V100. Si V100 registra una sola IPS, V102 debe registrarse como 98 porque no aplica IPS2.',
        regla: 'Cuando V100=1, sólo aplica IPS1; por tanto, V102 no debe contener un código de IPS real.',
        recomendacion: 'Corrija V102 registrando 98, o revise V100 si realmente participaron dos o más IPS.',
        valor: v102Original,
        datosRelacionados,
        columnasCorregir: ['V102']
      }));
    }

    if (v100NoAplica && v102EsCodigoIps) {
      hallazgos.push(crearHallazgo({
        codigo: 'V102-ERROR-006',
        variable,
        severidad: 'error',
        titulo: 'V102 no corresponde con V100',
        mensaje: 'V102 no corresponde con V100. Si V100 está en 98 porque no aplica número de IPS para el último esquema de radioterapia, V102 también debe ser 98.',
        regla: 'Cuando V100=98, no aplica registrar IPS del último esquema; por tanto, V102 no debe contener un código de IPS real.',
        recomendacion: 'Corrija V102 registrando 98, o revise V100 si realmente existieron IPS que suministraron el último esquema.',
        valor: v102Original,
        datosRelacionados,
        columnasCorregir: ['V102']
      }));
    }

    if (v86NoAplica && v102EsCodigoIps) {
      hallazgos.push(crearHallazgo({
        codigo: 'V102-ERROR-007',
        variable,
        severidad: 'error',
        titulo: 'V102 no corresponde con V86',
        mensaje: 'V102 no corresponde con V86. Si V86 indica que no aplica radioterapia, V102 debe registrarse como 98.',
        regla: 'Cuando V86=98, no aplica radioterapia; por tanto, V102 no debe registrar una IPS real.',
        recomendacion: 'Corrija V102 registrando 98, o revise V86 si el usuario sí recibió radioterapia.',
        valor: v102Original,
        datosRelacionados,
        columnasCorregir: ['V102']
      }));
    }

    if (v97EsNoAplica && v102EsCodigoIps) {
      hallazgos.push(crearHallazgo({
        codigo: 'V102-ERROR-008',
        variable,
        severidad: 'error',
        titulo: 'V102 no corresponde con V97',
        mensaje: 'V102 no corresponde con V97. Si V97 está en 1845-01-01 porque no aplica fecha de inicio del último esquema de radioterapia, V102 debe ser 98.',
        regla: 'Cuando V97=1845-01-01, no aplica el último esquema de radioterapia; por tanto, V102 no debe registrar una IPS real.',
        recomendacion: 'Corrija V102 registrando 98, o revise V97 si realmente existe último esquema de radioterapia.',
        valor: v102Original,
        datosRelacionados,
        columnasCorregir: ['V102']
      }));
    }

    if (v98EsNoAplica && v102EsCodigoIps) {
      hallazgos.push(crearHallazgo({
        codigo: 'V102-ERROR-009',
        variable,
        severidad: 'error',
        titulo: 'V102 no corresponde con V98',
        mensaje: 'V102 no corresponde con V98. Si V98 está en 98 porque no aplica el último esquema de radioterapia, V102 debe ser 98.',
        regla: 'Cuando V98=98, no aplica la intención del último esquema; por tanto, V102 no debe registrar una IPS real.',
        recomendacion: 'Corrija V102 registrando 98, o revise V98 si realmente existe último esquema de radioterapia.',
        valor: v102Original,
        datosRelacionados,
        columnasCorregir: ['V102']
      }));
    }

    if (v99EsNoAplica && v102EsCodigoIps) {
      hallazgos.push(crearHallazgo({
        codigo: 'V102-ERROR-010',
        variable,
        severidad: 'error',
        titulo: 'V102 no corresponde con V99',
        mensaje: 'V102 no corresponde con V99. Si V99 está en 98 porque no aplica el tipo de radioterapia del último esquema, V102 debe ser 98.',
        regla: 'Cuando V99=98, no aplica tipo de radioterapia del último esquema; por tanto, V102 no debe registrar una IPS real.',
        recomendacion: 'Corrija V102 registrando 98, o revise V99 si realmente existe tipo de radioterapia del último esquema.',
        valor: v102Original,
        datosRelacionados,
        columnasCorregir: ['V102']
      }));
    }

    if (v101NoAplica && v102EsCodigoIps) {
      hallazgos.push(crearHallazgo({
        codigo: 'V102-ERROR-011',
        variable,
        severidad: 'error',
        titulo: 'V102 no corresponde con V101',
        mensaje: 'V102 no corresponde con V101. Si V101 está en 98 porque no aplica IPS1 del último esquema de radioterapia, V102 también debe ser 98.',
        regla: 'No debe existir IPS2 si no existe IPS1 aplicable.',
        recomendacion: 'Corrija V102 registrando 98, o revise V101 si realmente existe IPS1 e IPS2.',
        valor: v102Original,
        datosRelacionados,
        columnasCorregir: ['V102']
      }));
    }

    if (v101EsCodigoIps && v102EsCodigoIps && v101Texto === v102Texto) {
      hallazgos.push(crearHallazgo({
        codigo: 'V102-ERROR-012',
        variable,
        severidad: 'error',
        titulo: 'V102 repite el código de V101',
        mensaje: 'V102 registra el mismo código de habilitación que V101. Si se reporta una IPS2, debe corresponder a una IPS diferente de la IPS1.',
        regla: 'V101 identifica la IPS1 y V102 identifica la IPS2; no deben duplicar el mismo código cuando ambas aplican.',
        recomendacion: 'Corrija V102 registrando el código de la segunda IPS real o 98 si no aplica IPS2.',
        valor: v102Original,
        datosRelacionados,
        columnasCorregir: ['V102']
      }));
    }

    if (hallazgos.length === 0 && v102EsCodigoIps) {
      hallazgos.push(crearHallazgo({
        codigo: 'V102-ADVERTENCIA-001',
        variable,
        severidad: 'advertencia',
        titulo: 'V102 registra código IPS formalmente válido',
        mensaje: 'V102 registra un código de habilitación IPS de 12 dígitos. Verifique que corresponda realmente a la IPS2 que suministró el último esquema de radioterapia y que coincida con REPS.',
        regla: 'El código cumple la forma de 12 dígitos, pero la existencia y correspondencia real con REPS requiere verificación contra la fuente oficial o soporte institucional.',
        recomendacion: 'Confirme en REPS o en los soportes institucionales que el código corresponde a la IPS2 del último esquema de radioterapia.',
        valor: v102Original,
        datosRelacionados,
        columnasCorregir: ['V102']
      }));
    }

    return hallazgos;
  }


  // ============================================================
  // V103. Fecha de finalización del último esquema de cualquier tipo de radioterapia suministrado en el periodo de reporte actual
  // Encabezado real: v103fechadefinalizacindelltimoes
  // Trazabilidad: V86 → V97 → V103
  // ============================================================
  function validarV103(registro) {
    const hallazgos = [];
    const variable = 'V103';
    const v86Original = registro?.V86;
    const v97Original = registro?.V97;
    const v103Original = registro?.V103;
    const v86 = normalizarCodigo(v86Original);
    const v97 = texto(v97Original);
    const v103 = texto(v103Original);
    const datosRelacionados = datosBaseV103(v86Original, v97Original, v103Original);
    const v86Valida = v86 === '1' || v86 === '98';
    const v97NoAplica = v97 === '1845-01-01';
    const v97FechaReal = esFechaRealRadioterapia(v97);
    const v103EnCurso = v103 === '1800-01-01';
    const v103NoAplica = v103 === '1845-01-01';
    const v103FechaReal = esFechaRealRadioterapia(v103);

    if (estaVacio(v103Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V103-ERROR-001',
        variable,
        severidad: 'error',
        titulo: 'V103 está vacía',
        mensaje: 'V103 está vacía. Debe registrar la fecha de finalización del último esquema de radioterapia en formato AAAA-MM-DD, 1800-01-01 si el esquema aún no finaliza o 1845-01-01 si no aplica.',
        regla: 'El instructivo exige registrar la fecha de finalización del último esquema de cualquier tipo de radioterapia suministrado en el periodo de reporte actual, 1800-01-01 para esquemas que aún no finalizan o 1845-01-01 cuando no aplica.',
        recomendacion: 'Corrija V103 registrando una fecha válida en formato AAAA-MM-DD. Si sólo conoce año y mes, registre el día 15. Si el esquema aún no finaliza, registre 1800-01-01. Si no aplica, registre 1845-01-01.',
        valor: v103Original,
        datosRelacionados,
        columnasCorregir: ['V103']
      }));
      return hallazgos;
    }

    if (!tieneFormatoFechaISO(v103)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V103-ERROR-002',
        variable,
        severidad: 'error',
        titulo: 'V103 tiene formato inválido',
        mensaje: 'V103 tiene formato inválido. Debe registrar la fecha en formato AAAA-MM-DD, 1800-01-01 si el esquema aún no finaliza o 1845-01-01 si no aplica.',
        regla: 'El instructivo solicita registrar la fecha de finalización en formato AAAA-MM-DD.',
        recomendacion: 'Corrija V103 usando el formato AAAA-MM-DD. Si sólo conoce año y mes, registre el día 15.',
        valor: v103Original,
        datosRelacionados,
        columnasCorregir: ['V103']
      }));
      return hallazgos;
    }

    if (!fechaExisteISO(v103)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V103-ERROR-003',
        variable,
        severidad: 'error',
        titulo: 'V103 contiene una fecha inexistente',
        mensaje: 'V103 contiene una fecha inexistente. Verifique que la fecha registrada sea válida en formato AAAA-MM-DD.',
        regla: 'El dato debe ser una fecha real o uno de los comodines permitidos por el instructivo: 1800-01-01 o 1845-01-01.',
        recomendacion: 'Corrija V103 con una fecha real. Si sólo conoce año y mes, registre el día 15.',
        valor: v103Original,
        datosRelacionados,
        columnasCorregir: ['V103']
      }));
      return hallazgos;
    }

    // La trazabilidad con V86 sólo se evalúa cuando V86 ya tiene un valor válido.
    // Esto evita cascadas si V86 está vacía, tiene 2 o está fuera del catálogo.
    if (v86Valida && v86 === '1' && v103NoAplica) {
      hallazgos.push(crearHallazgo({
        codigo: 'V103-ERROR-004',
        variable,
        severidad: 'error',
        titulo: 'V103 no corresponde con V86',
        mensaje: 'V103 no corresponde con V86. Si V86 indica que el usuario recibió radioterapia, V103 debe registrar una fecha real de finalización del último esquema o 1800-01-01 si el esquema aún no finaliza.',
        regla: 'Cuando V86=1, la radioterapia sí aplica; por tanto, V103 no debe ser 1845-01-01.',
        recomendacion: 'Corrija V103 registrando la fecha real de finalización del último esquema de radioterapia o 1800-01-01 si aún no ha finalizado.',
        valor: v103Original,
        datosRelacionados,
        columnasCorregir: ['V103']
      }));
      return hallazgos;
    }

    if (v86Valida && v86 === '98' && !v103NoAplica) {
      hallazgos.push(crearHallazgo({
        codigo: 'V103-ERROR-005',
        variable,
        severidad: 'error',
        titulo: 'V103 no corresponde con V86',
        mensaje: 'V103 no corresponde con V86. Si V86 indica que no aplica radioterapia, V103 debe registrarse como 1845-01-01.',
        regla: 'Cuando V86=98, no aplica radioterapia; por tanto, V103 debe registrar 1845-01-01.',
        recomendacion: 'Corrija V103 registrando 1845-01-01.',
        valor: v103Original,
        datosRelacionados,
        columnasCorregir: ['V103']
      }));
      return hallazgos;
    }

    // La trazabilidad con V97 se evalúa cuando V97 ya tiene un valor interpretable.
    if (v97NoAplica && !v103NoAplica) {
      hallazgos.push(crearHallazgo({
        codigo: 'V103-ERROR-006',
        variable,
        severidad: 'error',
        titulo: 'V103 no corresponde con V97',
        mensaje: 'V103 no corresponde con V97. Si V97=1845-01-01 indica que no aplica fecha de inicio del último esquema de radioterapia, V103 también debe ser 1845-01-01.',
        regla: 'Cuando V97=1845-01-01, no existe último esquema de radioterapia aplicable; por tanto, V103 no debe registrar fecha real ni 1800-01-01.',
        recomendacion: 'Corrija V103 registrando 1845-01-01, o revise V97 si realmente existe último esquema de radioterapia.',
        valor: v103Original,
        datosRelacionados,
        columnasCorregir: ['V103']
      }));
      return hallazgos;
    }

    if (v97FechaReal && v103NoAplica) {
      hallazgos.push(crearHallazgo({
        codigo: 'V103-ERROR-007',
        variable,
        severidad: 'error',
        titulo: 'V103 no corresponde con V97',
        mensaje: 'V103 no corresponde con V97. Si V97 registra una fecha real de inicio del último esquema de radioterapia, V103 debe registrar una fecha real de finalización o 1800-01-01 si el esquema aún no finaliza.',
        regla: 'Una fecha real en V97 indica que existe último esquema de radioterapia; por tanto, V103 no debe ser 1845-01-01.',
        recomendacion: 'Corrija V103 registrando la fecha real de finalización o 1800-01-01 si el esquema continúa en curso.',
        valor: v103Original,
        datosRelacionados,
        columnasCorregir: ['V103']
      }));
      return hallazgos;
    }

    // Sólo se compara contra V97 cuando ambas son fechas reales.
    // Los comodines 1800-01-01 y 1845-01-01 no se tratan como fechas clínicas reales.
    if (v97FechaReal && v103FechaReal && v103 < v97) {
      hallazgos.push(crearHallazgo({
        codigo: 'V103-ERROR-008',
        variable,
        severidad: 'error',
        titulo: 'V103 es anterior a V97',
        mensaje: 'V103 no corresponde con V97. La fecha de finalización del último esquema de radioterapia no puede ser anterior a la fecha de inicio registrada en V97.',
        regla: 'La fecha de finalización del último esquema debe ser igual o posterior a la fecha de inicio del último esquema de radioterapia.',
        recomendacion: 'Corrija V103 o V97 según la trazabilidad clínica del último esquema.',
        valor: v103Original,
        datosRelacionados,
        columnasCorregir: ['V103']
      }));
      return hallazgos;
    }

    // No se genera advertencia por 1800-01-01 cuando existe último esquema, porque el instructivo lo permite para esquemas que aún no finalizan.
    // No se cruza V103 con V104, V105, duración, CUPS, IPS, CIE-10, cirugía ni periodo de reporte para evitar reglas no soportadas por el instructivo actual.

    return hallazgos;
  }



  // ============================================================
  // V104. Características actuales de este último esquema de cualquier tipo de radioterapia suministrado en el periodo de reporte actual
  // Encabezado real: v104caractersticasactualesdeeste
  // Trazabilidad: V86 → V97 → V103 → V104
  // ============================================================
  function validarV104(registro) {
    const hallazgos = [];
    const variable = 'V104';
    const v86Original = registro?.V86;
    const v97Original = registro?.V97;
    const v103Original = registro?.V103;
    const v104Original = registro?.V104;
    const v86 = normalizarCodigo(v86Original);
    const v97 = texto(v97Original);
    const v103 = texto(v103Original);
    const v104 = normalizarCodigo(v104Original);
    const permitidos = ['1', '2', '3', '98'];
    const datosRelacionados = datosBaseV104(v86Original, v97Original, v103Original, v104Original);
    const v86Valida = v86 === '1' || v86 === '98';
    const v97NoAplica = v97 === '1845-01-01';
    const v97FechaReal = esFechaRealRadioterapia(v97);
    const v103NoAplica = v103 === '1845-01-01';
    const v103EnCurso = v103 === '1800-01-01';
    const v103FechaReal = esFechaRealRadioterapia(v103);

    if (estaVacio(v104Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V104-ERROR-001',
        variable,
        severidad: 'error',
        titulo: 'V104 está vacía',
        mensaje: 'V104 está vacía. Debe registrar 1, 2, 3 o 98 según las características actuales del último esquema de radioterapia.',
        regla: 'El instructivo exige registrar si el último esquema finalizó con dosis completa, finalizó con dosis incompleta, no ha finalizado y continúa bajo tratamiento, o no aplica.',
        recomendacion: 'Corrija V104 registrando 1, 2, 3 o 98 según corresponda.',
        valor: v104Original,
        datosRelacionados,
        columnasCorregir: ['V104']
      }));
      return hallazgos;
    }

    if (!permitidos.includes(v104)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V104-ERROR-002',
        variable,
        severidad: 'error',
        titulo: 'V104 tiene un valor fuera del catálogo permitido',
        mensaje: 'V104 tiene un valor fuera del catálogo permitido. Sólo se permite 1, 2, 3 o 98.',
        regla: 'Según el instructivo, V104 sólo permite 1 finalizado con dosis completa, 2 finalizado con dosis incompleta, 3 no finalizado aún bajo tratamiento o 98 No aplica.',
        recomendacion: 'Corrija V104 usando uno de los valores permitidos por el instructivo.',
        valor: v104Original,
        datosRelacionados,
        columnasCorregir: ['V104']
      }));
      return hallazgos;
    }

    // La trazabilidad con V86 se evalúa sólo cuando V86 ya tiene un valor válido.
    if (v86Valida && v86 === '98' && v104 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V104-ERROR-003',
        variable,
        severidad: 'error',
        titulo: 'V104 no corresponde con V86',
        mensaje: 'V104 no corresponde con V86. Si V86 indica que no aplica radioterapia, V104 debe registrarse como 98.',
        regla: 'Cuando V86=98, no aplica radioterapia; por tanto, V104 debe registrar 98 No aplica.',
        recomendacion: 'Corrija V104 registrando 98, o revise V86 si realmente recibió radioterapia.',
        valor: v104Original,
        datosRelacionados,
        columnasCorregir: ['V104']
      }));
      return hallazgos;
    }

    // La trazabilidad con V97 se evalúa cuando V97 ya tiene un valor interpretable.
    if (v97NoAplica && v104 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V104-ERROR-004',
        variable,
        severidad: 'error',
        titulo: 'V104 no corresponde con V97',
        mensaje: 'V104 no corresponde con V97. Si V97=1845-01-01 indica que no aplica fecha de inicio del último esquema de radioterapia, V104 también debe ser 98.',
        regla: 'Cuando V97=1845-01-01, no existe último esquema de radioterapia aplicable; por tanto, V104 no debe registrar 1, 2 ni 3.',
        recomendacion: 'Corrija V104 registrando 98, o revise V97 si realmente existe último esquema de radioterapia.',
        valor: v104Original,
        datosRelacionados,
        columnasCorregir: ['V104']
      }));
      return hallazgos;
    }

    if (v103NoAplica && v104 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V104-ERROR-005',
        variable,
        severidad: 'error',
        titulo: 'V104 no corresponde con V103',
        mensaje: 'V104 no corresponde con V103. Si V103=1845-01-01 indica que no aplica fecha de finalización del último esquema de radioterapia, V104 también debe ser 98.',
        regla: 'Cuando V103=1845-01-01, no aplica el último esquema de radioterapia para registrar características actuales; por tanto, V104 debe ser 98.',
        recomendacion: 'Corrija V104 registrando 98, o revise V103 si realmente existe último esquema de radioterapia.',
        valor: v104Original,
        datosRelacionados,
        columnasCorregir: ['V104']
      }));
      return hallazgos;
    }

    if (v86Valida && v86 === '1' && v104 === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V104-ERROR-006',
        variable,
        severidad: 'error',
        titulo: 'V104 no corresponde con V86',
        mensaje: 'V104 no corresponde con V86. Si V86 indica que el usuario recibió radioterapia, V104 debe registrar 1, 2 o 3 según el estado actual del último esquema.',
        regla: 'Cuando V86=1, la radioterapia sí aplica; por tanto, V104 no debe ser 98.',
        recomendacion: 'Corrija V104 registrando 1, 2 o 3 según las características actuales del último esquema.',
        valor: v104Original,
        datosRelacionados,
        columnasCorregir: ['V104']
      }));
      return hallazgos;
    }

    if (v97FechaReal && v104 === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V104-ERROR-007',
        variable,
        severidad: 'error',
        titulo: 'V104 no corresponde con V97',
        mensaje: 'V104 no corresponde con V97. Si V97 registra una fecha real de inicio del último esquema de radioterapia, V104 debe registrar 1, 2 o 3, no 98.',
        regla: 'Una fecha real en V97 indica que existe último esquema de radioterapia; por tanto, V104 debe describir sus características actuales.',
        recomendacion: 'Corrija V104 registrando 1, 2 o 3 según corresponda, o revise V97 si realmente no aplica el último esquema.',
        valor: v104Original,
        datosRelacionados,
        columnasCorregir: ['V104']
      }));
      return hallazgos;
    }

    if (v103EnCurso && v104 !== '3') {
      hallazgos.push(crearHallazgo({
        codigo: 'V104-ERROR-008',
        variable,
        severidad: 'error',
        titulo: 'V104 no corresponde con V103',
        mensaje: 'V104 no corresponde con V103. Si V103=1800-01-01 indica que el esquema aún no finaliza, V104 debe ser 3: no finalizado, esquema incompleto, pero aún bajo tratamiento.',
        regla: 'El comodín 1800-01-01 de V103 significa esquema de radioterapia que aún no finaliza; por tanto, la característica actual debe ser no finalizado bajo tratamiento.',
        recomendacion: 'Corrija V104 registrando 3, o revise V103 si el esquema realmente ya finalizó.',
        valor: v104Original,
        datosRelacionados,
        columnasCorregir: ['V104']
      }));
      return hallazgos;
    }

    if (v103FechaReal && v104 === '3') {
      hallazgos.push(crearHallazgo({
        codigo: 'V104-ERROR-009',
        variable,
        severidad: 'error',
        titulo: 'V104 no corresponde con V103',
        mensaje: 'V104 no corresponde con V103. Si V103 registra una fecha real de finalización, V104 no debe indicar que el esquema no ha finalizado.',
        regla: 'Una fecha real de finalización en V103 indica que el último esquema terminó; por tanto, V104 debe ser 1 o 2 según la dosis finalizada.',
        recomendacion: 'Corrija V104 registrando 1 o 2, o revise V103 si el esquema sigue en curso.',
        valor: v104Original,
        datosRelacionados,
        columnasCorregir: ['V104']
      }));
      return hallazgos;
    }

    // V105 validará motivo de finalización cuando se implemente. V104 no genera reglas contra variables futuras.
    // No se cruza V104 con duración, CUPS, IPS, CIE-10, cirugía ni periodo de reporte para evitar reglas no soportadas por el instructivo actual.

    return hallazgos;
  }


  // ============================================================
  // V105. Motivo de la finalización de este último esquema de cualquier tipo de radioterapia suministrado en el periodo de reporte actual
  // Encabezado real: v105motivofinalizacinltimoesquem
  // Trazabilidad: V86 → V97 → V103 → V104 → V105
  // Aplica únicamente si V104=2.
  // ============================================================
  function validarV105(registro) {
    const hallazgos = [];
    const variable = 'V105';
    const v86Original = registro?.V86;
    const v97Original = registro?.V97;
    const v103Original = registro?.V103;
    const v104Original = registro?.V104;
    const v105Original = registro?.V105;
    const v86 = normalizarCodigo(v86Original);
    const v97 = texto(v97Original);
    const v103 = texto(v103Original);
    const v104 = normalizarCodigo(v104Original);
    const v105 = normalizarCodigo(v105Original);
    const permitidos = ['1', '2', '3', '4', '5', '6', '7', '98'];
    const motivosReales = ['1', '2', '3', '4', '5', '6', '7'];
    const datosRelacionados = datosBaseV105(v86Original, v97Original, v103Original, v104Original, v105Original);
    const v86Valida = v86 === '1' || v86 === '98';
    const v97NoAplica = v97 === '1845-01-01';
    const v103NoAplica = v103 === '1845-01-01';
    const v103EnCurso = v103 === '1800-01-01';
    const v104Valida = ['1', '2', '3', '98'].includes(v104);
    const v105MotivoReal = motivosReales.includes(v105);

    if (estaVacio(v105Original)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V105-ERROR-001',
        variable,
        severidad: 'error',
        titulo: 'V105 está vacía',
        mensaje: 'V105 está vacía. Debe registrar el motivo de finalización del último esquema de radioterapia o 98 si no aplica.',
        regla: 'El instructivo exige registrar un motivo entre 1 y 7 cuando V104=2, o 98 cuando no aplica.',
        recomendacion: 'Corrija V105 registrando un valor entre 1 y 7 si V104=2, o 98 si no aplica.',
        valor: v105Original,
        datosRelacionados,
        columnasCorregir: ['V105']
      }));
      return hallazgos;
    }

    if (!permitidos.includes(v105)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V105-ERROR-002',
        variable,
        severidad: 'error',
        titulo: 'V105 tiene un valor fuera del catálogo permitido',
        mensaje: 'V105 tiene un valor fuera del catálogo permitido. Sólo se aceptan 1, 2, 3, 4, 5, 6, 7 o 98.',
        regla: 'Según el instructivo, V105 sólo permite 1 toxicidad, 2 otros motivos médicos, 3 muerte, 4 cambio de EPS, 5 decisión del usuario o abandono, 6 otros motivos administrativos, 7 otras causas no contempladas o 98 No aplica.',
        recomendacion: 'Corrija V105 usando uno de los valores permitidos por el instructivo.',
        valor: v105Original,
        datosRelacionados,
        columnasCorregir: ['V105']
      }));
      return hallazgos;
    }

    // Trazabilidad general del bloque: cuando radioterapia no aplica, V105 debe ser 98.
    if (v86Valida && v86 === '98' && v105MotivoReal) {
      hallazgos.push(crearHallazgo({
        codigo: 'V105-ERROR-003',
        variable,
        severidad: 'error',
        titulo: 'V105 no corresponde con V86',
        mensaje: 'V105 no corresponde con V86. Si V86 indica que no aplica radioterapia, V105 debe registrarse como 98.',
        regla: 'Cuando V86=98, no existe esquema de radioterapia aplicable; por tanto, V105 no debe registrar motivo real de finalización.',
        recomendacion: 'Corrija V105 registrando 98, o revise V86 si realmente recibió radioterapia.',
        valor: v105Original,
        datosRelacionados,
        columnasCorregir: ['V105']
      }));
      return hallazgos;
    }

    if (v97NoAplica && v105MotivoReal) {
      hallazgos.push(crearHallazgo({
        codigo: 'V105-ERROR-004',
        variable,
        severidad: 'error',
        titulo: 'V105 no corresponde con V97',
        mensaje: 'V105 no corresponde con V97. Si V97=1845-01-01 indica que no aplica fecha de inicio del último esquema de radioterapia, V105 debe ser 98.',
        regla: 'Cuando V97=1845-01-01, no existe último esquema de radioterapia aplicable; por tanto, V105 no debe registrar motivo real de finalización.',
        recomendacion: 'Corrija V105 registrando 98, o revise V97 si realmente existe último esquema de radioterapia.',
        valor: v105Original,
        datosRelacionados,
        columnasCorregir: ['V105']
      }));
      return hallazgos;
    }

    if (v103NoAplica && v105MotivoReal) {
      hallazgos.push(crearHallazgo({
        codigo: 'V105-ERROR-005',
        variable,
        severidad: 'error',
        titulo: 'V105 no corresponde con V103',
        mensaje: 'V105 no corresponde con V103. Si V103=1845-01-01 indica que no aplica fecha de finalización del último esquema de radioterapia, V105 debe ser 98.',
        regla: 'Cuando V103=1845-01-01, no aplica el último esquema de radioterapia para registrar motivo de finalización; por tanto, V105 debe ser 98.',
        recomendacion: 'Corrija V105 registrando 98, o revise V103 si realmente existe último esquema de radioterapia.',
        valor: v105Original,
        datosRelacionados,
        columnasCorregir: ['V105']
      }));
      return hallazgos;
    }

    if (v103EnCurso && v105MotivoReal) {
      hallazgos.push(crearHallazgo({
        codigo: 'V105-ERROR-006',
        variable,
        severidad: 'error',
        titulo: 'V105 no corresponde con V103',
        mensaje: 'V105 no corresponde con V103. Si V103=1800-01-01 indica que el esquema aún no finaliza, V105 no debe registrar motivo de finalización; debe ser 98.',
        regla: 'El comodín 1800-01-01 de V103 significa esquema de radioterapia que aún no finaliza; por tanto, no existe motivo de finalización para V105.',
        recomendacion: 'Corrija V105 registrando 98, o revise V103 si el esquema realmente finalizó.',
        valor: v105Original,
        datosRelacionados,
        columnasCorregir: ['V105']
      }));
      return hallazgos;
    }

    // Regla directa del instructivo: V105 aplica sólo si V104=2.
    if (v104Valida && v104 === '2' && v105 === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V105-ERROR-007',
        variable,
        severidad: 'error',
        titulo: 'V105 no corresponde con V104',
        mensaje: 'V105 no corresponde con V104. Si V104=2 indica que el esquema finalizó con dosis incompleta por algún motivo, V105 debe registrar el motivo con un valor entre 1 y 7.',
        regla: 'V105 aplica cuando V104=2. En ese escenario no debe registrar 98, sino el motivo que primero ocurrió.',
        recomendacion: 'Corrija V105 registrando 1, 2, 3, 4, 5, 6 o 7 según el motivo documentado.',
        valor: v105Original,
        datosRelacionados,
        columnasCorregir: ['V105']
      }));
      return hallazgos;
    }

    if (v104Valida && v104 !== '2' && v105MotivoReal) {
      hallazgos.push(crearHallazgo({
        codigo: 'V105-ERROR-008',
        variable,
        severidad: 'error',
        titulo: 'V105 no corresponde con V104',
        mensaje: 'V105 no corresponde con V104. V105 sólo aplica cuando V104=2. Si V104 indica dosis completa, esquema aún bajo tratamiento o no aplica, V105 debe ser 98.',
        regla: 'V105 registra el motivo de finalización sólo cuando V104=2: finalizado con dosis incompleta por algún motivo.',
        recomendacion: 'Corrija V105 registrando 98, o revise V104 si el esquema realmente finalizó con dosis incompleta.',
        valor: v105Original,
        datosRelacionados,
        columnasCorregir: ['V105']
      }));
      return hallazgos;
    }

    // V105 no se cruza con variables futuras ni con duración, CUPS, IPS, CIE-10, cirugía o periodo de reporte.
    return hallazgos;
  }

  function validar(registro) {
    let hallazgos = [];

    // V86. ¿Recibió el usuario algún tipo de radioterapia en el periodo de reporte actual?
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V86')) {
      hallazgos = hallazgos.concat(validarV86(registro));
    }

    // V87. Número de sesiones de radioterapia recibidas en el periodo.
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V87')) {
      hallazgos = hallazgos.concat(validarV87(registro));
    }

    // V88. Fecha de inicio del primer o único esquema de radioterapia.
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V88')) {
      hallazgos = hallazgos.concat(validarV88(registro));
    }

    // V89. Ubicación temporal del primer o único esquema de radioterapia.
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V89')) {
      hallazgos = hallazgos.concat(validarV89(registro));
    }

    // V90. Tipo de radioterapia aplicada en este primer o único esquema.
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V90')) {
      hallazgos = hallazgos.concat(validarV90(registro));
    }

    // V91. Número de IPS que suministran este primer o único esquema de radioterapia.
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V91')) {
      hallazgos = hallazgos.concat(validarV91(registro));
    }

    // V92. Código de la IPS1 que suministra la radioterapia de este primer o único esquema.
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V92')) {
      hallazgos = hallazgos.concat(validarV92(registro));
    }

    // V93. Código de la IPS2 que suministra la radioterapia de este primer o único esquema.
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V93')) {
      hallazgos = hallazgos.concat(validarV93(registro));
    }

    // V94. Fecha de finalización del primer o único esquema de radioterapia.
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V94')) {
      hallazgos = hallazgos.concat(validarV94(registro));
    }

    // V95. Características actuales del primer o único esquema de radioterapia.
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V95')) {
      hallazgos = hallazgos.concat(validarV95(registro));
    }

    // V96. Motivo de finalización del primer o único esquema de radioterapia.
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V96')) {
      hallazgos = hallazgos.concat(validarV96(registro));
    }

    // V97. Fecha de inicio del último esquema de cualquier tipo de radioterapia.
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V97')) {
      hallazgos = hallazgos.concat(validarV97(registro));
    }

    // V98. Ubicación temporal/intención del último esquema de radioterapia.
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V98')) {
      hallazgos = hallazgos.concat(validarV98(registro));
    }

    // V99. Tipo de radioterapia aplicada en el último esquema.
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V99')) {
      hallazgos = hallazgos.concat(validarV99(registro));
    }

    // V100. Número de IPS que suministran el último esquema de radioterapia.
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V100')) {
      hallazgos = hallazgos.concat(validarV100(registro));
    }

    // V101. Código de la IPS1 que suministra el último esquema de radioterapia.
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V101')) {
      hallazgos = hallazgos.concat(validarV101(registro));
    }

    // V102. Código de la IPS2 que suministra el último esquema de radioterapia.
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V102')) {
      hallazgos = hallazgos.concat(validarV102(registro));
    }

    // V103. Fecha de finalización del último esquema de cualquier tipo de radioterapia suministrado en el periodo de reporte actual.
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V103')) {
      hallazgos = hallazgos.concat(validarV103(registro));
    }

    // V104. Características actuales de este último esquema de cualquier tipo de radioterapia suministrado en el periodo de reporte actual.
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V104')) {
      hallazgos = hallazgos.concat(validarV104(registro));
    }

    // V105. Motivo de la finalización de este último esquema de radioterapia.
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V105')) {
      hallazgos = hallazgos.concat(validarV105(registro));
    }

    return hallazgos;
  }

  window.CACModulo17 = {
    version: VERSION,
    validar,
    validarV86,
    validarV87,
    validarV88,
    validarV89,
    validarV90,
    validarV91,
    validarV92,
    validarV93,
    validarV94,
    validarV95,
    validarV96,
    validarV97,
    validarV98,
    validarV99,
    validarV100,
    validarV101,
    validarV102,
    validarV103,
    validarV104,
    validarV105
  };
})();
