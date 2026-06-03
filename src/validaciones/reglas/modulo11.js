(function () {
  'use strict';

  const VERSION_MODULO11 = 'sprint-3e-v53-9-medicamento-atc9-01';

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
    V45: 'El usuario recibió quimioterapia u otra terapia sistémica',
    V53: 'Número de medicamentos antineoplásicos o terapia hormonal propuestos en el primer o único esquema',
    V53_1: 'Primer medicamento antineoplásico administrado en el primer o único esquema',
    V53_2: 'Segundo medicamento antineoplásico administrado en el primer o único esquema',
    V53_3: 'Tercer medicamento antineoplásico administrado en el primer o único esquema',
    V53_4: 'Cuarto medicamento antineoplásico administrado en el primer o único esquema',
    V53_5: 'Quinto medicamento antineoplásico administrado en el primer o único esquema',
    V53_6: 'Sexto medicamento antineoplásico administrado en el primer o único esquema',
    V53_7: 'Séptimo medicamento antineoplásico administrado en el primer o único esquema',
    V53_8: 'Octavo medicamento antineoplásico administrado en el primer o único esquema',
    V53_9: 'Noveno medicamento antineoplásico administrado en el primer o único esquema'
  };

  function texto(valor) {
    return String(valor ?? '').trim();
  }

  function textoMayuscula(valor) {
    return texto(valor).toUpperCase();
  }

  function obtenerValor(registro, variable) {
    return texto(registro?.[variable]);
  }

  function tieneVariable(registro, variable) {
    return Object.prototype.hasOwnProperty.call(registro || {}, variable);
  }

  function nombreVariable(variable) {
    return NOMBRES_VARIABLES[variable] || variable;
  }

  // Las subvariables se manejan internamente con guion bajo para evitar
  // problemas de lectura en JavaScript, pero en pantalla y reportes deben
  // verse como aparecen en el instructivo CAC.
  function etiquetaVariable(variable) {
    const mapa = {
      V53_1: 'V53.1',
      V53_2: 'V53.2',
      V53_3: 'V53.3',
      V53_4: 'V53.4',
      V53_5: 'V53.5',
      V53_6: 'V53.6',
      V53_7: 'V53.7',
      V53_8: 'V53.8',
      V53_9: 'V53.9'
    };

    return mapa[variable] || variable;
  }

  function esEnteroTexto(valor) {
    return /^-?\d+$/.test(texto(valor));
  }

  function numeroEntero(valor) {
    return Number.parseInt(texto(valor), 10);
  }

  function esFormatoATC(valor) {
    return /^[A-Z][0-9]{2}[A-Z]{2}[0-9]{2}$/.test(textoMayuscula(valor));
  }

  function obtenerCatalogoATC() {
    if (typeof window === 'undefined') return null;
    return window.CACCatalogoATC || null;
  }

  function existeEnCatalogoATC(codigo) {
    const atc = obtenerCatalogoATC();
    const codigoNormalizado = textoMayuscula(codigo);

    if (!atc || !codigoNormalizado) return null;

    if (atc.datos && Object.prototype.hasOwnProperty.call(atc.datos, codigoNormalizado)) {
      return true;
    }

    if (atc.homologacion_2024_a_2025) {
      const homologacion = atc.homologacion_2024_a_2025;

      if (Object.prototype.hasOwnProperty.call(homologacion, codigoNormalizado)) {
        return true;
      }

      if (Object.values(homologacion).map((valor) => textoMayuscula(valor)).includes(codigoNormalizado)) {
        return true;
      }
    }

    return false;
  }

  function crearHallazgo({
    variable,
    codigo,
    tipo,
    severidad,
    valor,
    titulo,
    mensaje,
    regla,
    recomendacion,
    columnasCorregir,
    datosRelacionados
  }) {
    const columnas = Array.isArray(columnasCorregir) && columnasCorregir.length > 0
      ? columnasCorregir.map(etiquetaVariable)
      : [variable].filter(Boolean).map(etiquetaVariable);

    const datos = Array.isArray(datosRelacionados) && datosRelacionados.length > 0
      ? datosRelacionados.map((dato) => ({
        ...dato,
        variable: etiquetaVariable(dato.variable)
      }))
      : [{
        variable: etiquetaVariable(variable),
        nombre: nombreVariable(variable),
        valor
      }];

    const hallazgoBase = {
      variable,
      codigo,
      tipo,
      severidad,
      valor,
      valorEncontrado: valor,
      titulo,
      mensaje,
      regla,
      recomendacion,
      columnasCorregir: columnas,
      datosRelacionados: datos
    };

    if (typeof window !== 'undefined' && typeof window.crearHallazgo === 'function') {
      try {
        return {
          ...window.crearHallazgo(hallazgoBase),
          ...hallazgoBase
        };
      } catch (error) {
        console.warn('[CACModulo11] No se pudo usar window.crearHallazgo. Se usará hallazgo local.', error);
      }
    }

    return hallazgoBase;
  }

  function agregarHallazgo(lista, datos) {
    lista.push(crearHallazgo(datos));
  }

  function datosV45V53(v45, v53) {
    return [
      { variable: 'V45', nombre: nombreVariable('V45'), valor: v45 || '(vacío)' },
      { variable: 'V53', nombre: nombreVariable('V53'), valor: v53 || '(vacío)' }
    ];
  }

  function datosV45V53_1(v45, v53_1) {
    return [
      { variable: 'V45', nombre: nombreVariable('V45'), valor: v45 || '(vacío)' },
      { variable: 'V53_1', nombre: nombreVariable('V53_1'), valor: v53_1 || '(vacío)' }
    ];
  }

  function datosV45Medicamento(v45, variable, valor) {
    return [
      { variable: 'V45', nombre: nombreVariable('V45'), valor: v45 || '(vacío)' },
      { variable, nombre: nombreVariable(variable), valor: valor || '(vacío)' }
    ];
  }

  function datosSecuenciaV53_3(v45, v53_2, v53_3) {
    return [
      { variable: 'V45', nombre: nombreVariable('V45'), valor: v45 || '(vacío)' },
      { variable: 'V53_2', nombre: nombreVariable('V53_2'), valor: v53_2 || '(vacío)' },
      { variable: 'V53_3', nombre: nombreVariable('V53_3'), valor: v53_3 || '(vacío)' }
    ];
  }

  function validarV53(registro, hallazgos) {
    if (!tieneVariable(registro, 'V53')) return;

    const v45 = obtenerValor(registro, 'V45');
    const v53 = obtenerValor(registro, 'V53');

    if (!v53) {
      agregarHallazgo(hallazgos, {
        variable: 'V53',
        codigo: 'V53-ERROR-001',
        tipo: TIPO.FORMATO,
        severidad: SEVERIDAD.ERROR,
        valor: '(vacío)',
        titulo: 'Número de medicamentos propuestos vacío',
        mensaje: 'V53 está vacía. Debe registrar el número de medicamentos antineoplásicos o terapia hormonal propuestos en el primer o único esquema, o 98 si no aplica.',
        regla: 'V53 es obligatoria. Si V45=1, registre un número entero mayor que cero. Si V45=98, registre 98.',
        recomendacion: 'Revise la orden médica y los soportes del primer o único esquema. Diligencie la cantidad de medicamentos propuestos; si en V45 se registró 98, use V53=98.'
      });
      return;
    }

    if (!esEnteroTexto(v53)) {
      agregarHallazgo(hallazgos, {
        variable: 'V53',
        codigo: 'V53-ERROR-002',
        tipo: TIPO.FORMATO,
        severidad: SEVERIDAD.ERROR,
        valor: v53,
        titulo: 'V53 debe ser numérica o 98',
        mensaje: 'V53 contiene texto, decimales, símbolos o un valor que no corresponde a un número entero ni al comodín 98.',
        regla: 'V53 debe registrarse como número entero. El único comodín permitido para esta variable es 98 cuando V45=98.',
        recomendacion: 'Reemplace el valor por un número entero mayor que cero si recibió terapia sistémica, o por 98 si no aplica según V45.'
      });
      return;
    }

    if (v45 === '1' && v53 === '98') {
      agregarHallazgo(hallazgos, {
        variable: 'V53',
        codigo: 'V53-ERROR-003',
        tipo: TIPO.COHERENCIA,
        severidad: SEVERIDAD.ERROR,
        valor: v53,
        titulo: 'V53 no puede ser 98 cuando V45 indica terapia sistémica',
        mensaje: 'V45 indica que el usuario sí recibió quimioterapia u otra terapia sistémica, pero V53 registra 98, que significa No aplica.',
        regla: 'Si V45=1, V53 debe registrar el número de medicamentos antineoplásicos o terapia hormonal propuestos en el primer o único esquema.',
        recomendacion: 'Revise V45 y V53. Si el usuario recibió terapia sistémica, cambie V53 por el número de medicamentos propuestos. Si no recibió terapia sistémica, revise si V45 debe ser 98.',
        columnasCorregir: ['V45', 'V53'],
        datosRelacionados: datosV45V53(v45, v53)
      });
      return;
    }

    if (v45 === '98' && v53 !== '98') {
      agregarHallazgo(hallazgos, {
        variable: 'V53',
        codigo: 'V53-ERROR-004',
        tipo: TIPO.COHERENCIA,
        severidad: SEVERIDAD.ERROR,
        valor: v53,
        titulo: 'V53 debe ser 98 cuando V45 no aplica',
        mensaje: 'V45 registra 98, es decir que no aplica quimioterapia o terapia sistémica, pero V53 registra un número diferente de 98.',
        regla: 'Si V45=98, V53 también debe ser 98.',
        recomendacion: 'Revise la coherencia del bloque. Si no aplica terapia sistémica, registre V53=98. Si sí hubo terapia sistémica, revise si V45 debe ser 1.',
        columnasCorregir: ['V45', 'V53'],
        datosRelacionados: datosV45V53(v45, v53)
      });
      return;
    }

    const numero = numeroEntero(v53);

    if (numero <= 0) {
      agregarHallazgo(hallazgos, {
        variable: 'V53',
        codigo: 'V53-ERROR-005',
        tipo: TIPO.FORMATO,
        severidad: SEVERIDAD.ERROR,
        valor: v53,
        titulo: 'Número de medicamentos propuestos inválido',
        mensaje: 'V53 registra cero o un número negativo. La cantidad de medicamentos propuestos no puede ser cero ni negativa.',
        regla: 'Si V45=1, V53 debe ser un número entero mayor que cero. Si no aplica terapia sistémica, use 98 de acuerdo con V45.',
        recomendacion: 'Revise la orden médica y registre la cantidad real de medicamentos antineoplásicos o terapia hormonal propuestos. No cuente medicamentos adyuvantes o de premedicación que no sean antineoplásicos.'
      });
    }
  }

  function validarV53_1(registro, hallazgos) {
    if (!tieneVariable(registro, 'V53_1')) return;

    const v45 = obtenerValor(registro, 'V45');
    const v53_1 = textoMayuscula(obtenerValor(registro, 'V53_1'));

    if (!v53_1) {
      agregarHallazgo(hallazgos, {
        variable: 'V53_1',
        codigo: 'V53_1-ERROR-001',
        tipo: TIPO.FORMATO,
        severidad: SEVERIDAD.ERROR,
        valor: '(vacío)',
        titulo: 'Primer medicamento administrado vacío',
        mensaje: 'V53.1 está vacía. Debe registrar el código ATC del primer medicamento antineoplásico administrado en el primer o único esquema, o 98 si no aplica.',
        regla: 'V53.1 es obligatoria cuando la columna viene en el archivo. Si V45=1, registre el código ATC del primer medicamento administrado. Si V45=98, registre 98.',
        recomendacion: 'Revise los registros de administración y la historia clínica. Diligencie el ATC del primer medicamento administrado o use 98 cuando V45 sea 98.',
        datosRelacionados: datosV45V53_1(v45, '(vacío)')
      });
      return;
    }

    if (v53_1 === '97') {
      agregarHallazgo(hallazgos, {
        variable: 'V53_1',
        codigo: 'V53_1-ERROR-005',
        tipo: TIPO.CATALOGO,
        severidad: SEVERIDAD.ERROR,
        valor: v53_1,
        titulo: 'V53.1 no permite el comodín 97',
        mensaje: 'V53.1 registra 97, pero este comodín solo está definido desde V53.2 hasta V53.9. En V53.1 debe registrarse el primer medicamento administrado o 98 si no aplica.',
        regla: 'V53.1 permite código ATC cuando V45=1 o 98 cuando V45=98. El valor 97 no está definido para V53.1.',
        recomendacion: 'Si el usuario recibió terapia sistémica, registre en V53.1 el código ATC del primer medicamento administrado. Si no aplica, revise que V45 sea 98 y registre V53.1=98.',
        datosRelacionados: datosV45V53_1(v45, v53_1)
      });
      return;
    }

    if (v45 === '1' && v53_1 === '98') {
      agregarHallazgo(hallazgos, {
        variable: 'V53_1',
        codigo: 'V53_1-ERROR-003',
        tipo: TIPO.COHERENCIA,
        severidad: SEVERIDAD.ERROR,
        valor: v53_1,
        titulo: 'V53.1 no puede ser 98 cuando V45 indica terapia sistémica',
        mensaje: 'V45 indica que el usuario sí recibió quimioterapia u otra terapia sistémica, pero V53.1 registra 98, que significa No aplica.',
        regla: 'Si V45=1, V53.1 debe registrar el código ATC del primer medicamento administrado en el primer o único esquema.',
        recomendacion: 'Revise los registros de administración. Si el usuario recibió terapia sistémica, reemplace 98 por el ATC del primer medicamento administrado. Si no recibió terapia, revise si V45 debe ser 98.',
        columnasCorregir: ['V45', 'V53_1'],
        datosRelacionados: datosV45V53_1(v45, v53_1)
      });
      return;
    }

    if (v45 === '98' && v53_1 !== '98') {
      agregarHallazgo(hallazgos, {
        variable: 'V53_1',
        codigo: 'V53_1-ERROR-004',
        tipo: TIPO.COHERENCIA,
        severidad: SEVERIDAD.ERROR,
        valor: v53_1,
        titulo: 'V53.1 debe ser 98 cuando V45 no aplica',
        mensaje: 'V45 registra 98, es decir que no aplica quimioterapia o terapia sistémica, pero V53.1 registra un valor diferente de 98.',
        regla: 'Si V45=98, V53.1 también debe ser 98.',
        recomendacion: 'Revise la coherencia del bloque. Si no aplica terapia sistémica, registre V53.1=98. Si sí hubo terapia sistémica, revise si V45 debe ser 1.',
        columnasCorregir: ['V45', 'V53_1'],
        datosRelacionados: datosV45V53_1(v45, v53_1)
      });
      return;
    }

    if (v53_1 === '98') {
      return;
    }

    if (!esFormatoATC(v53_1)) {
      agregarHallazgo(hallazgos, {
        variable: 'V53_1',
        codigo: 'V53_1-ERROR-002',
        tipo: TIPO.FORMATO,
        severidad: SEVERIDAD.ERROR,
        valor: v53_1,
        titulo: 'V53.1 no tiene formato ATC válido',
        mensaje: 'V53.1 debe registrar un código ATC válido del medicamento administrado o 98 cuando no aplica. El valor encontrado no cumple el formato esperado de ATC.',
        regla: 'El formato operativo esperado para ATC es letra + dos números + dos letras + dos números, por ejemplo L01DB01 o L02BG04. V53.1 no permite 97.',
        recomendacion: 'Corrija V53.1 con el código ATC del primer medicamento administrado según soporte clínico. Si no aplica, use 98 con V45=98.',
        datosRelacionados: datosV45V53_1(v45, v53_1)
      });
      return;
    }

    const existe = existeEnCatalogoATC(v53_1);

    if (existe === false) {
      agregarHallazgo(hallazgos, {
        variable: 'V53_1',
        codigo: 'V53_1-ERROR-006',
        tipo: TIPO.CATALOGO,
        severidad: SEVERIDAD.ERROR,
        valor: v53_1,
        titulo: 'Código ATC no existe en el catálogo cargado',
        mensaje: 'V53.1 tiene formato ATC válido, pero el código no existe en el catálogo ATC oficial cargado en la aplicación.',
        regla: 'El medicamento administrado debe registrarse con un código ATC existente en el catálogo ATC disponible para el reporte CAC.',
        recomendacion: 'Revise el código ATC contra el catálogo oficial cargado. Si el medicamento fue homologado, use el código vigente correspondiente.',
        datosRelacionados: datosV45V53_1(v45, v53_1)
      });
    }
  }

  function validarMedicamentoAdministradoSecundario(registro, hallazgos, variable, indice) {
    if (!tieneVariable(registro, variable)) return;

    const etiqueta = etiquetaVariable(variable);
    const v45 = obtenerValor(registro, 'V45');
    const valor = textoMayuscula(obtenerValor(registro, variable));
    const prefijoCodigo = `V53_${indice}`;

    if (!valor) {
      agregarHallazgo(hallazgos, {
        variable,
        codigo: `${prefijoCodigo}-ERROR-001`,
        tipo: TIPO.FORMATO,
        severidad: SEVERIDAD.ERROR,
        valor: '(vacío)',
        titulo: `${etiqueta} vacía`,
        mensaje: `${etiqueta} está vacía. Debe registrar el código ATC del medicamento administrado en esta posición, 97 si ya no hay más medicamentos por registrar, o 98 si no aplica.`,
        regla: ` Valores permitidos: código ATC para medicamento administrado, 97 cuando V45=1 y ya no hay más medicamentos por registrar, o 98 cuando V45=98.`,
        recomendacion: `Revise los soportes de administración. Registre el ATC si hubo medicamento en esta posición; use 97 si V45=1 y ya no hay más medicamentos; use 98 si V45=98.`,
        datosRelacionados: datosV45Medicamento(v45, variable, '(vacío)')
      });
      return;
    }

    if (v45 === '1' && valor === '98') {
      agregarHallazgo(hallazgos, {
        variable,
        codigo: `${prefijoCodigo}-ERROR-003`,
        tipo: TIPO.COHERENCIA,
        severidad: SEVERIDAD.ERROR,
        valor,
        titulo: `${etiqueta} no puede ser 98 cuando V45 indica terapia sistémica`,
        mensaje: `V45 tiene valor 1, que significa que el paciente sí recibió quimioterapia u otra terapia sistémica en el periodo. Sin embargo, ${etiqueta} registra 98, que significa No aplica.`,
        regla: `Cuando V45 tiene valor 1, el bloque de medicamentos administrados aplica. En ${etiqueta}, el valor 98 no corresponde; si no hay más medicamentos por registrar, debe usarse 97.`,
        recomendacion: `Revise ${etiqueta}. Si no hay otro medicamento que registrar, use 97. Si sí existe medicamento administrado en esta posición, registre su código ATC.`,
        columnasCorregir: [variable],
        datosRelacionados: datosV45Medicamento(v45, variable, valor)
      });
      return;
    }

    if (v45 === '98' && valor !== '98') {
      agregarHallazgo(hallazgos, {
        variable,
        codigo: `${prefijoCodigo}-ERROR-004`,
        tipo: TIPO.COHERENCIA,
        severidad: SEVERIDAD.ERROR,
        valor,
        titulo: `${etiqueta} debe ser 98 cuando V45 no aplica`,
        mensaje: `V45 tiene valor 98, que significa que no aplica quimioterapia o terapia sistémica. Sin embargo, ${etiqueta} registra un valor diferente de 98.`,
        regla: `Cuando V45 tiene valor 98, las variables de medicamentos administrados del primer o único esquema deben registrar 98.`,
        recomendacion: `Si no aplica terapia sistémica, registre ${etiqueta}=98. Si el paciente sí recibió terapia sistémica, revise si V45 debe ser 1.`,
        columnasCorregir: [variable],
        datosRelacionados: datosV45Medicamento(v45, variable, valor)
      });
      return;
    }

    if (valor === '97' || valor === '98') {
      return;
    }

    if (!esFormatoATC(valor)) {
      agregarHallazgo(hallazgos, {
        variable,
        codigo: `${prefijoCodigo}-ERROR-002`,
        tipo: TIPO.FORMATO,
        severidad: SEVERIDAD.ERROR,
        valor,
        titulo: `${etiqueta} no tiene formato ATC válido`,
        mensaje: `${etiqueta} tiene un valor que no corresponde a un código ATC válido ni a los comodines permitidos 97 o 98.`,
        regla: `El formato ATC esperado es: una letra, dos números, dos letras y dos números. Ejemplo: L01DB01. También se permiten 97 o 98 según V45.`,
        recomendacion: `Corrija ${etiqueta}. Use un ATC válido si hay medicamento administrado; use 97 si V45=1 y ya no hay más medicamentos; use 98 si V45=98.`,
        datosRelacionados: datosV45Medicamento(v45, variable, valor)
      });
      return;
    }

    const existe = existeEnCatalogoATC(valor);

    if (existe === false) {
      agregarHallazgo(hallazgos, {
        variable,
        codigo: `${prefijoCodigo}-ERROR-005`,
        tipo: TIPO.CATALOGO,
        severidad: SEVERIDAD.ERROR,
        valor,
        titulo: 'Código ATC no existe en el catálogo cargado',
        mensaje: `${etiqueta} tiene formato ATC válido, pero el código no existe en el catálogo ATC oficial cargado en la aplicación.`,
        regla: 'El medicamento administrado debe registrarse con un código ATC existente en el catálogo ATC disponible para el reporte CAC.',
        recomendacion: 'Revise el código ATC contra el catálogo oficial cargado. Si el medicamento fue homologado, use el código vigente correspondiente.',
        datosRelacionados: datosV45Medicamento(v45, variable, valor)
      });
    }
  }

  function validarSecuenciaV53_3(registro, hallazgos) {
    if (!tieneVariable(registro, 'V53_2') || !tieneVariable(registro, 'V53_3')) return;

    const v45 = obtenerValor(registro, 'V45');
    const v53_2 = textoMayuscula(obtenerValor(registro, 'V53_2'));
    const v53_3 = textoMayuscula(obtenerValor(registro, 'V53_3'));

    if (v45 !== '1') return;
    if (v53_2 !== '97') return;
    if (!esFormatoATC(v53_3)) return;

    agregarHallazgo(hallazgos, {
      variable: 'V53_3',
      codigo: 'V53_3-ADVERTENCIA-001',
      tipo: TIPO.COHERENCIA,
      severidad: SEVERIDAD.ADVERTENCIA,
      valor: v53_3,
      titulo: 'Secuencia inconsistente entre V53.2 y V53.3',
      mensaje: 'V53.2 tiene 97, que indica que ya no había más medicamentos por registrar. Sin embargo, V53.3 trae un código ATC.',
      regla: 'Si se usa 97 en V53.2, normalmente V53.3 también debería ser 97. Un ATC después de 97 sugiere un posible salto en la captura.',
      recomendacion: 'Revise el orden de captura. Si sí hubo segundo medicamento, cambie V53.2 por su ATC. Si no había más medicamentos, cambie V53.3 a 97.',
      columnasCorregir: ['V53_2', 'V53_3'],
      datosRelacionados: datosSecuenciaV53_3(v45, v53_2, v53_3)
    });
  }

  function validarV53_2(registro, hallazgos) {
    validarMedicamentoAdministradoSecundario(registro, hallazgos, 'V53_2', 2);
  }

  function validarV53_3(registro, hallazgos) {
    validarMedicamentoAdministradoSecundario(registro, hallazgos, 'V53_3', 3);
    validarSecuenciaV53_3(registro, hallazgos);
  }

  function validarV53_4(registro, hallazgos) {
    validarMedicamentoAdministradoSecundario(registro, hallazgos, 'V53_4', 4);
  }

  function validarV53_5(registro, hallazgos) {
    validarMedicamentoAdministradoSecundario(registro, hallazgos, 'V53_5', 5);
  }

  function validarV53_6(registro, hallazgos) {
    validarMedicamentoAdministradoSecundario(registro, hallazgos, 'V53_6', 6);
  }

  function validarV53_7(registro, hallazgos) {
    validarMedicamentoAdministradoSecundario(registro, hallazgos, 'V53_7', 7);
  }

  function validarV53_8(registro, hallazgos) {
    validarMedicamentoAdministradoSecundario(registro, hallazgos, 'V53_8', 8);
  }

  function validarV53_9(registro, hallazgos) {
    validarMedicamentoAdministradoSecundario(registro, hallazgos, 'V53_9', 9);
  }

  function validar(registro, catalogos) {
    const hallazgos = [];

    validarV53(registro, hallazgos);
    validarV53_1(registro, hallazgos);
    validarV53_2(registro, hallazgos);
    validarV53_3(registro, hallazgos);
    validarV53_4(registro, hallazgos);
    validarV53_5(registro, hallazgos);
    validarV53_6(registro, hallazgos);
    validarV53_7(registro, hallazgos);
    validarV53_8(registro, hallazgos);
    validarV53_9(registro, hallazgos);

    return hallazgos;
  }

  const modulo = {
    VERSION_MODULO11,
    version: VERSION_MODULO11,
    validar,
    _interno: {
      esEnteroTexto,
      numeroEntero,
      esFormatoATC,
      existeEnCatalogoATC,
      etiquetaVariable
    }
  };

  if (typeof window !== 'undefined') {
    window.Modulo11 = modulo;
    window.CACModulo11 = modulo;
  }
})();
