(function () {
  'use strict';

  const VERSION = 'sprint-3k-v77-ips-primera-cirugia-01';

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
      V66: 'Número de medicamentos antineoplásicos o terapia hormonal propuestos en el último esquema',
      V66_1: 'Medicamento antineoplásico administrado 1 en el último esquema',
      V66_2: 'Medicamento antineoplásico administrado 2 en el último esquema',
      V66_3: 'Medicamento antineoplásico administrado 3 en el último esquema',
      V66_4: 'Medicamento antineoplásico administrado 4 en el último esquema',
      V66_5: 'Medicamento antineoplásico administrado 5 en el último esquema',
      V66_6: 'Medicamento antineoplásico administrado 6 en el último esquema',
      V66_7: 'Medicamento antineoplásico administrado 7 en el último esquema',
      V66_8: 'Medicamento antineoplásico administrado 8 en el último esquema',
      V66_9: 'Medicamento antineoplásico administrado 9 en el último esquema',
      V67: 'Medicamento antineoplásico o terapia hormonal adicional 1 en el último esquema',
      V68: 'Medicamento antineoplásico o terapia hormonal adicional 2 en el último esquema',
      V69: 'Medicamento antineoplásico o terapia hormonal adicional 3 en el último esquema',
      V70: 'Quimioterapia intratecal en el último esquema',
      V71: 'Fecha de finalización del último esquema de quimioterapia o terapia sistémica',
      V72: 'Características actuales del último esquema de este periodo',
      V73: 'Motivo de la finalización prematura del último esquema',
      V74: 'Cirugías curativas o paliativas durante el periodo',
      V75: 'Número de cirugías durante el periodo de reporte actual',
      V76: 'Fecha de realización de la primera cirugía en el periodo',
      V77: 'Código de la IPS que realizó la primera cirugía'
    };

    return nombres[variable] || variable;
  }

  function etiquetaVariable(variable) {
    return String(variable || '').replace('_', '.');
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
      '97': 'V61=97 significa que solo recibió un esquema de quimioterapia o terapia sistémica en este periodo y no debe capturarse nuevamente como último esquema.',
      '98': 'V61=98 significa “No aplica” para el último esquema.'
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

  function describirMedicamento(variable, posicion, valor) {
    const codigo = normalizarCodigo(valor);
    const etiqueta = etiquetaVariable(variable);
    const ordinales = {
      1: 'primer',
      2: 'segundo',
      3: 'tercer',
      4: 'cuarto',
      5: 'quinto',
      6: 'sexto',
      7: 'séptimo',
      8: 'octavo',
      9: 'noveno'
    };

    if (!codigo) {
      return `${etiqueta} está vacía.`;
    }

    if (codigo === '98') {
      return `${etiqueta}=98 significa No aplica.`;
    }

    if (codigo === '97') {
      if (posicion === 1) {
        return `${etiqueta}=97 no está permitido para esta variable. El 97 empieza a aplicar desde V66.2 hasta V66.9.`;
      }

      return `${etiqueta}=97 significa que sí recibió quimioterapia o terapia sistémica y que el medicamento ya fue registrado en variables anteriores, con V45=1.`;
    }

    return `${etiqueta} registra el valor ${texto(valor)} como ${ordinales[posicion] || `${posicion}.`} medicamento administrado del último esquema.`;
  }

  function describirValorV67(valor) {
    const codigo = normalizarCodigo(valor);

    if (!codigo) {
      return 'V67 está vacía.';
    }

    if (codigo === '97') {
      return 'V67=97 significa No aplica porque no recibió medicamento adicional diferente a V66.1 a V66.9 y V61 tiene una ubicación real del último esquema.';
    }

    if (codigo === '98') {
      return 'V67=98 significa No aplica porque no tuvo último esquema o V61 está en 97 o 98.';
    }

    return `V67 registra ${texto(valor)} como medicamento adicional diferente a los reportados en V66.1 a V66.9.`;
  }

  function describirValorV68(valor) {
    const codigo = normalizarCodigo(valor);

    if (!codigo) {
      return 'V68 está vacía.';
    }

    if (codigo === '97') {
      return 'V68=97 significa No aplica porque no recibió un segundo medicamento adicional diferente a V66.1 a V66.9 y V67, con V61 en ubicación real del último esquema.';
    }

    if (codigo === '98') {
      return 'V68=98 significa No aplica porque no tuvo último esquema o V61 está en 97 o 98.';
    }

    return `V68 registra ${texto(valor)} como segundo medicamento adicional diferente a los reportados en V66.1 a V66.9 y V67.`;
  }

  function normalizarATC(valor) {
    return texto(valor)
      .toUpperCase()
      .replace(/\s+/g, '')
      .replace(/\./g, '')
      .replace(/-/g, '')
      .trim();
  }

  function obtenerCodigoDesdeItemATC(item) {
    if (!item || typeof item !== 'object') return '';

    const posibles = [
      item.codigo,
      item.CODIGO,
      item.code,
      item.CODE,
      item.atc,
      item.ATC,
      item.id,
      item.ID,
      item.clave,
      item.CLAVE
    ];

    for (const posible of posibles) {
      const normalizado = normalizarATC(posible);
      if (normalizado) return normalizado;
    }

    return '';
  }

  function obtenerNombreDesdeItemATC(item) {
    if (!item || typeof item !== 'object') return '';

    return texto(
      item.nombre ||
      item.NOMBRE ||
      item.descripcion ||
      item.DESCRIPCION ||
      item.description ||
      item.DESCRIPTION ||
      item.medicamento ||
      item.MEDICAMENTO ||
      ''
    );
  }

  function existeEnCatalogoPlano(catalogo, codigoBuscado) {
    if (!catalogo) return { revisado: false, existe: false, nombre: '' };

    if (Array.isArray(catalogo)) {
      let revisado = false;

      for (const item of catalogo) {
        revisado = true;

        if (typeof item === 'string' || typeof item === 'number') {
          if (normalizarATC(item) === codigoBuscado) {
            return { revisado: true, existe: true, nombre: '' };
          }
          continue;
        }

        const codigoItem = obtenerCodigoDesdeItemATC(item);
        if (codigoItem === codigoBuscado) {
          return { revisado: true, existe: true, nombre: obtenerNombreDesdeItemATC(item) };
        }
      }

      return { revisado, existe: false, nombre: '' };
    }

    if (catalogo instanceof Set) {
      return {
        revisado: true,
        existe: Array.from(catalogo).some((item) => normalizarATC(item) === codigoBuscado),
        nombre: ''
      };
    }

    if (typeof catalogo === 'object') {
      const claves = Object.keys(catalogo);
      if (claves.length === 0) return { revisado: false, existe: false, nombre: '' };

      for (const clave of claves) {
        if (normalizarATC(clave) === codigoBuscado) {
          const item = catalogo[clave];
          return { revisado: true, existe: true, nombre: obtenerNombreDesdeItemATC(item) };
        }

        const item = catalogo[clave];
        if (item && typeof item === 'object') {
          const codigoItem = obtenerCodigoDesdeItemATC(item);
          if (codigoItem === codigoBuscado) {
            return { revisado: true, existe: true, nombre: obtenerNombreDesdeItemATC(item) };
          }
        }
      }

      return { revisado: true, existe: false, nombre: '' };
    }

    return { revisado: false, existe: false, nombre: '' };
  }

  function validarCodigoATC(valor) {
    const codigo = normalizarATC(valor);
    if (!codigo) return { revisado: false, existe: false, nombre: '' };

    const funcionesBusqueda = [
      window.CACCatalogos?.buscarATC,
      window.CACCatalogos?.buscarMedicamentoATC,
      window.CACCargador?.buscarATC,
      window.CACCargador?.buscarMedicamentoATC,
      window.CatalogoATC?.buscar,
      window.CACCatalogoATC?.buscar
    ].filter((fn) => typeof fn === 'function');

    for (const buscar of funcionesBusqueda) {
      try {
        const resultado = buscar(codigo);
        if (resultado) {
          return {
            revisado: true,
            existe: true,
            nombre: obtenerNombreDesdeItemATC(resultado)
          };
        }
      } catch (error) {
        // Si una firma de búsqueda no coincide, se prueba con las demás fuentes.
      }
    }

    const fuentes = [
      window.CACCatalogos?.ATC,
      window.CACCatalogos?.atc,
      window.CACCatalogos?.catalogos?.ATC,
      window.CACCatalogos?.catalogos?.atc,
      window.CACCargador?.catalogos?.ATC,
      window.CACCargador?.catalogos?.atc,
      window.CACCargador?.ATC,
      window.CACCargador?.atc,
      window.CATC,
      window.ATC,
      window.CAC_ATC,
      window.CATALOGO_ATC,
      window.CatalogoATC?.datos,
      window.CACCatalogoATC?.datos,
      window.CACCatalogoATC
    ];

    let algunCatalogoRevisado = false;

    for (const fuente of fuentes) {
      const resultado = existeEnCatalogoPlano(fuente, codigo);
      if (resultado.revisado) algunCatalogoRevisado = true;
      if (resultado.existe) return resultado;
    }

    return {
      revisado: algunCatalogoRevisado,
      existe: false,
      nombre: ''
    };
  }

  function datosBase(registro, variableActual) {
    const datos = [
      dato('V45', registro?.V45, describirValorV45(registro?.V45)),
      dato('V61', registro?.V61, describirValorV61(registro?.V61)),
      dato('V66', registro?.V66, describirValorV66(registro?.V66))
    ];

    const matchMedicamento = String(variableActual || '').match(/^V66_(\d+)$/);
    if (matchMedicamento) {
      const posicionActual = Number(matchMedicamento[1]);

      for (let i = 1; i <= posicionActual; i += 1) {
        const variable = `V66_${i}`;
        datos.push(
          dato(
            variable,
            registro?.[variable],
            describirMedicamento(variable, i, registro?.[variable])
          )
        );
      }
    }

    if (String(variableActual || '') === 'V67' || String(variableActual || '') === 'V68') {
      for (let i = 1; i <= 9; i += 1) {
        const variable = `V66_${i}`;
        datos.push(
          dato(
            variable,
            registro?.[variable],
            describirMedicamento(variable, i, registro?.[variable])
          )
        );
      }

      datos.push(dato('V67', registro?.V67, describirValorV67(registro?.V67)));
    }

    if (String(variableActual || '') === 'V68') {
      datos.push(dato('V68', registro?.V68, describirValorV68(registro?.V68)));
    }

    return datos;
  }

  function validarV66(registro) {
    const hallazgos = [];

    const v45 = normalizarCodigo(registro?.V45);
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
        datosRelacionados: datosBase(registro, 'V66')
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
        datosRelacionados: datosBase(registro, 'V66')
      }));

      return hallazgos;
    }

    if (v45 === '98' && v66 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V66-ERROR-003',
        variable: 'V66',
        titulo: 'V45 indica que no tuvo terapia sistémica, pero V66 no está en 98',
        mensaje: `V45 tiene el valor 98, lo que indica que no recibió quimioterapia ni otra terapia sistémica en el periodo. Por eso V66 debe ser 98. Actualmente V66 tiene el valor ${texto(v66Original)}.`,
        regla: 'Si V45=98, V66 debe registrar 98 porque no aplica número de medicamentos del último esquema.',
        recomendacion: 'Cambie V66 a 98.',
        valor: v66Original,
        datosRelacionados: datosBase(registro, 'V66')
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
        datosRelacionados: datosBase(registro, 'V66')
      }));

      return hallazgos;
    }

    if (v61 === '97' && v66 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V66-ERROR-005',
        variable: 'V66',
        titulo: 'V61=97, pero V66 no está en 98',
        mensaje: `V61 tiene el valor 97, que según el instructivo aplica cuando el paciente solo recibió un esquema de quimioterapia en el periodo y en V45 seleccionó la opción 1. En este caso, V66 debe quedar en 98 = No aplica. Actualmente V66 tiene el valor ${texto(v66Original)}.`,
        regla: 'Cuando V61=97, las variables del último esquema no aplican. V66 debe quedar en 98.',
        recomendacion: 'Cambie V66 a 98. Si el paciente sí tuvo un último esquema diferente al ya reportado, corrija primero V61 y luego diligencie V66 según el número de medicamentos propuestos.',
        valor: v66Original,
        datosRelacionados: datosBase(registro, 'V66')
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
        datosRelacionados: datosBase(registro, 'V66')
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
        datosRelacionados: datosBase(registro, 'V66')
      }));
    }

    return hallazgos;
  }

  function cantidadMenorTexto(posicion) {
    const textos = { 2: 'dos', 3: 'tres', 4: 'cuatro', 5: 'cinco' };
    return textos[posicion] || String(posicion);
  }

  function cantidadOMasTexto(posicion) {
    const textos = {
      1: 'medicamentos',
      2: 'dos o más medicamentos',
      3: 'tres o más medicamentos',
      4: 'cuatro o más medicamentos',
      5: 'cinco o más medicamentos'
    };

    return textos[posicion] || `${posicion} o más medicamentos`;
  }

  function validarMedicamento(registro, posicion) {
    const hallazgos = [];
    const variable = `V66_${posicion}`;
    const etiqueta = etiquetaVariable(variable);
    const valorOriginal = registro?.[variable];
    const valor = normalizarCodigo(valorOriginal);
    const v45 = normalizarCodigo(registro?.V45);
    const v61 = normalizarCodigo(registro?.V61);
    const v66 = normalizarCodigo(registro?.V66);
    const esComodin = valor === '97' || valor === '98';
    const pareceATC = !estaVacio(valorOriginal) && !esComodin;
    const ordinales = {
      1: 'primer',
      2: 'segundo',
      3: 'tercer',
      4: 'cuarto',
      5: 'quinto',
      6: 'sexto',
      7: 'séptimo',
      8: 'octavo',
      9: 'noveno'
    };
    const datos = () => datosBase(registro, variable);

    if (estaVacio(valorOriginal)) {
      hallazgos.push(crearHallazgo({
        codigo: `${variable}-ERROR-001`,
        variable,
        titulo: `${etiqueta} está vacía`,
        mensaje: `${etiqueta} está vacía. Según el instructivo, debe registrar el código ATC del ${ordinales[posicion]} medicamento antineoplásico administrado en el último esquema${posicion === 1 ? ', o 98 cuando no aplica.' : ', 97 si ya fue registrado en variables anteriores con V45=1, o 98 cuando no aplica.'}`,
        regla: posicion === 1
          ? `${etiqueta} debe registrar código ATC o 98 cuando no aplica.`
          : `${etiqueta} debe registrar código ATC, 97 si ya fue registrado en variables anteriores con V45=1, o 98 cuando no aplica.`,
        recomendacion: posicion === 1
          ? `Registre el código ATC del ${ordinales[posicion]} medicamento administrado, o 98 si no aplica.`
          : `Registre el código ATC del ${ordinales[posicion]} medicamento administrado, 97 si ya fue registrado en variables anteriores con V45=1, o 98 si no aplica.`,
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (posicion === 1 && valor === '97') {
      hallazgos.push(crearHallazgo({
        codigo: 'V66_1-ERROR-002',
        variable,
        titulo: 'V66.1 tiene 97, pero esta variable no permite 97',
        mensaje: 'V66.1 tiene el valor 97, pero esta variable no permite 97. Según el instructivo, V66.1 solo permite registrar un código ATC del medicamento administrado o 98 cuando no aplica. El valor 97 empieza a aplicar desde V66.2 hasta V66.9.',
        regla: 'V66.1 permite código ATC o 98. No permite 97.',
        recomendacion: 'Cambie V66.1 por un código ATC válido si el primer medicamento fue administrado, o por 98 si no aplica.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (v45 === '98' && valor !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: `${variable}-ERROR-${posicion === 1 ? '003' : '002'}`,
        variable,
        titulo: `V45 indica que no tuvo terapia sistémica, pero ${etiqueta} no está en 98`,
        mensaje: `V45 tiene el valor 98, lo que indica que el paciente no tuvo esquema de quimioterapia o terapia sistémica en el periodo. Por eso no aplica registrar medicamentos administrados del último esquema. ${etiqueta} debe ser 98. Actualmente ${etiqueta} tiene el valor ${texto(valorOriginal)}.`,
        regla: `Si V45=98, ${etiqueta} debe registrar 98 porque no aplica medicamento administrado del último esquema.`,
        recomendacion: `Cambie ${etiqueta} a 98. Si el paciente sí recibió terapia sistémica, revise primero V45.`,
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (v61 === '98' && valor !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: `${variable}-ERROR-${posicion === 1 ? '004' : '003'}`,
        variable,
        titulo: `V61 indica que no aplica último esquema, pero ${etiqueta} no está en 98`,
        mensaje: `V61 tiene el valor 98, que significa “No aplica” para el último esquema. Por eso no aplica registrar medicamentos administrados en ${etiqueta}. ${etiqueta} debe ser 98. Actualmente ${etiqueta} tiene el valor ${texto(valorOriginal)}.`,
        regla: `Si V61=98, ${etiqueta} debe registrar 98 porque no aplica medicamento administrado del último esquema.`,
        recomendacion: `Cambie ${etiqueta} a 98. Si sí hubo último esquema, corrija primero V61.`,
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (v61 === '97' && valor !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: `${variable}-ERROR-${posicion === 1 ? '005' : '004'}`,
        variable,
        titulo: `V61 indica que solo hubo un esquema, pero ${etiqueta} trae medicamento del último esquema`,
        mensaje: `V61 tiene el valor 97, lo que indica que el paciente solo recibió un esquema de quimioterapia o terapia sistémica en el periodo y no debe capturarse nuevamente como último esquema. Por eso ${etiqueta} debe registrar 98. Actualmente ${etiqueta} tiene el valor ${texto(valorOriginal)}.`,
        regla: `Si V61=97, ${etiqueta} debe registrar 98 porque no aplica medicamento del último esquema adicional.`,
        recomendacion: `Cambie ${etiqueta} a 98. Si realmente hubo otro esquema diferente en el periodo, corrija primero V61.`,
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (v66 === '98' && valor !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: `${variable}-ERROR-${posicion === 1 ? '006' : '005'}`,
        variable,
        titulo: `V66 indica que no aplica medicamentos del último esquema, pero ${etiqueta} no está en 98`,
        mensaje: `V66 tiene el valor 98, lo que significa que no aplica registrar número de medicamentos propuestos para el último esquema. Por eso ${etiqueta} también debe ser 98. Actualmente ${etiqueta} tiene el valor ${texto(valorOriginal)}.`,
        regla: `Si V66=98, ${etiqueta} debe registrar 98 porque no aplica medicamento administrado del último esquema.`,
        recomendacion: `Cambie ${etiqueta} a 98. Si sí hubo medicamentos del último esquema, revise primero V66.`,
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (posicion > 1 && /^\d+$/.test(v66) && Number(v66) < posicion && pareceATC) {
      hallazgos.push(crearHallazgo({
        codigo: `${variable}-ERROR-006`,
        variable,
        titulo: `V66 registra menos de ${cantidadMenorTexto(posicion)} medicamentos, pero ${etiqueta} trae ${ordinales[posicion]} medicamento`,
        mensaje: `V66 registra ${texto(registro?.V66)} medicamento(s) propuesto(s) para el último esquema, pero ${etiqueta} trae el valor ${texto(valorOriginal)} como ${ordinales[posicion]} medicamento administrado. Si se propusieron menos de ${cantidadMenorTexto(posicion)} medicamentos, no debería registrarse un ${ordinales[posicion]} medicamento administrado en ${etiqueta}.`,
        regla: `Si V66 es menor que ${posicion}, ${etiqueta} no debería registrar un ${ordinales[posicion]} medicamento con código ATC.`,
        recomendacion: `Cambie ${etiqueta} a 97 o 98 según corresponda, o revise si V66 debe corregirse porque realmente hubo ${posicion} o más medicamentos propuestos.`,
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (VALORES_REALES_V61.includes(v61) && v66 !== '98' && /^\d+$/.test(v66) && Number(v66) >= posicion && valor === '98') {
      hallazgos.push(crearHallazgo({
        codigo: `${variable}-ERROR-007`,
        variable,
        titulo: `V66 registra ${cantidadOMasTexto(posicion)}, pero ${etiqueta} está en 98`,
        mensaje: `V61 registra una ubicación temporal real del último esquema y V66 registra ${texto(registro?.V66)} medicamento(s) propuesto(s). Según el instructivo, ${etiqueta} debe registrar el código ATC del ${ordinales[posicion]} medicamento antineoplásico administrado en el último esquema${posicion === 1 ? ', o 98 solo si realmente no aplica.' : ', 97 si ya fue registrado en variables anteriores con V45=1, o 98 solo si realmente no aplica.'}`,
        regla: posicion === 1
          ? 'Si V61 registra un último esquema real y V66 registra medicamentos propuestos, V66.1 debe registrar código ATC del primer medicamento administrado o 98 solo si realmente no aplica.'
          : `Si V61 registra un último esquema real y V66 registra ${posicion} o más medicamentos propuestos, ${etiqueta} debe registrar código ATC, 97 si ya fue registrado en variables anteriores con V45=1, o 98 solo si realmente no aplica.`,
        recomendacion: posicion === 1
          ? 'Revise V66.1. Registre el código ATC del primer medicamento administrado. Si no hubo medicamento administrado en esa posición, revise si V66 debe corregirse.'
          : `Revise ${etiqueta}. Registre el código ATC del ${ordinales[posicion]} medicamento administrado, 97 si ya fue registrado en variables anteriores con V45=1, o corrija V66 si esa posición no aplica.`,
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (posicion > 1 && valor === '97' && v45 !== '1') {
      hallazgos.push(crearHallazgo({
        codigo: `${variable}-ERROR-009`,
        variable,
        titulo: `${etiqueta}=97, pero V45 no está en 1`,
        mensaje: `${etiqueta} tiene el valor 97. Según el instructivo, 97 aplica cuando el medicamento ya fue registrado en variables anteriores y V45=1. Actualmente V45 tiene el valor ${texto(registro?.V45) || '(vacío)'}, pero V45 solo permite 1 o 98.`,
        regla: `${etiqueta}=97 requiere que V45=1, porque V45=1 indica que sí recibió quimioterapia u otra terapia sistémica en el periodo.`,
        recomendacion: `Revise primero V45. Si el paciente sí recibió terapia sistémica, corrija V45 a 1 y luego verifique si ${etiqueta}=97 aplica. Si V45 debe ser 98, entonces ${etiqueta} debe corregirse a 98.`,
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (posicion > 1 && valor === '97') {
      const previas = Array.from({ length: posicion - 1 }, (_, i) => `V66_${i + 1}`);
      const algunaPreviaVaciaO98 = previas.some((previa) => estaVacio(registro?.[previa]) || normalizarCodigo(registro?.[previa]) === '98');

      if (algunaPreviaVaciaO98) {
        hallazgos.push(crearHallazgo({
          codigo: `${variable}-ADVERTENCIA-001`,
          variable,
          severidad: 'advertencia',
          titulo: `${etiqueta} está en 97, pero medicamentos previos están vacíos o no aplican`,
          mensaje: `${etiqueta} tiene el valor 97, lo que indica que el medicamento ya fue registrado en variables anteriores. Sin embargo, una o más variables previas del bloque V66 están vacías o en 98. Revise la secuencia del registro.`,
          regla: `Las variables V66.1 a ${etiqueta} representan una secuencia de medicamentos del último esquema. Si ${etiqueta}=97 pero alguna variable previa está vacía o no aplica, la secuencia debe revisarse.`,
          recomendacion: `Revise si las variables previas deben traer códigos ATC válidos o 97 según corresponda. Si realmente no aplica la secuencia previa, verifique si ${etiqueta} también debe ser 98.`,
          valor: valorOriginal,
          datosRelacionados: datos()
        }));

        return hallazgos;
      }
    }

    if (pareceATC) {
      const atc = validarCodigoATC(valorOriginal);

      if (atc.revisado && !atc.existe) {
        hallazgos.push(crearHallazgo({
          codigo: `${variable}-ERROR-008`,
          variable,
          titulo: `${etiqueta} tiene un código ATC no encontrado en catálogo`,
          mensaje: `${etiqueta} tiene el valor ${texto(valorOriginal)}, pero ese código no fue encontrado en el catálogo ATC cargado. Esta variable debe registrar un código ATC válido del ${ordinales[posicion]} medicamento antineoplásico o terapia hormonal administrado en el último esquema${posicion === 1 ? ', o 98 cuando no aplica.' : ', 97 si ya fue registrado en variables anteriores y V45=1, o 98 cuando no aplica.'}`,
          regla: posicion === 1
            ? `${etiqueta} debe corresponder a un código ATC válido del catálogo cargado o 98.`
            : `Si ${etiqueta} no es 97 ni 98, debe corresponder a un código ATC válido del catálogo cargado.`,
          recomendacion: posicion === 1
            ? `Verifique el código ATC en la fuente correspondiente y corríjalo. Si no aplica registrar medicamento en ${etiqueta}, use 98.`
            : `Verifique el código ATC en la fuente correspondiente y corríjalo. Si no aplica registrar medicamento en ${etiqueta}, use 98. Si ya fue registrado en variables anteriores y V45=1, use 97.`,
          valor: valorOriginal,
          datosRelacionados: datos()
        }));
      }
    }

    return hallazgos;
  }

  function obtenerMedicamentosV66(registro) {
    return Array.from({ length: 9 }, (_, indice) => {
      const posicion = indice + 1;
      const variable = `V66_${posicion}`;
      const valor = normalizarATC(registro?.[variable]);
      return { variable, posicion, valor };
    }).filter((item) => item.valor && item.valor !== '97' && item.valor !== '98');
  }

  function validarV67(registro) {
    const hallazgos = [];
    const variable = 'V67';
    const valorOriginal = registro?.V67;
    const valor = normalizarCodigo(valorOriginal);
    const valorATC = normalizarATC(valorOriginal);
    const v45 = normalizarCodigo(registro?.V45);
    const v61 = normalizarCodigo(registro?.V61);
    const esComodin = valor === '97' || valor === '98';
    const pareceATC = !estaVacio(valorOriginal) && !esComodin;
    const datos = () => datosBase(registro, variable);

    if (estaVacio(valorOriginal)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V67-ERROR-001',
        variable,
        titulo: 'V67 está vacía',
        mensaje: 'V67 está vacía. Debe registrar un código ATC, 97 o 98 según aplique.',
        regla: 'V67 debe registrar código ATC del medicamento adicional administrado, 97 si no recibió medicamento adicional con V61 real, o 98 si no tuvo último esquema o V61=97/98.',
        recomendacion: 'Revise el último esquema. Registre un ATC válido, 97 si no hubo medicamento adicional diferente a V66.1 a V66.9, o 98 si no aplica.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (v45 === '98' && valor !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V67-ERROR-008',
        variable,
        titulo: 'V45=98, pero V67 no está en 98',
        mensaje: 'V45=98 indica que no aplica terapia sistémica en el periodo. En ese caso, V67 debe quedar en 98.',
        regla: 'Si V45=98, las variables del bloque de quimioterapia o terapia sistémica deben registrar No aplica cuando corresponda.',
        recomendacion: 'Revise primero V45. Si V45=98 es correcto, corrija V67 a 98.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (pareceATC && v45 !== '1') {
      hallazgos.push(crearHallazgo({
        codigo: 'V67-ERROR-007',
        variable,
        titulo: 'V67 registra ATC, pero V45 no indica terapia sistémica',
        mensaje: 'V67 registra un medicamento adicional, pero V45 no indica que el paciente recibió terapia sistémica.',
        regla: 'V67 depende de V45. Para registrar un medicamento adicional del último esquema, V45 debe indicar que recibió quimioterapia u otra terapia sistémica.',
        recomendacion: 'Revise primero V45. Si el paciente sí recibió terapia sistémica, corrija V45 a 1. Si V45 debe ser 98, entonces V67 debe ser 98.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if ((v61 === '97' || v61 === '98') && valor !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V67-ERROR-003',
        variable,
        titulo: 'V61=97 o V61=98, pero V67 no está en 98',
        mensaje: 'V61=97 o V61=98 indica que no debe reportarse medicamento adicional del último esquema. En este caso, V67 debe quedar en 98.',
        regla: 'El instructivo de V67 define 98 cuando no tuvo este último esquema o cuando V61 seleccionó 97 o 98.',
        recomendacion: 'Revise primero V61. Si V61 está correcto en 97 o 98, corrija V67 a 98.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (VALORES_REALES_V61.includes(v61) && valor === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V67-ERROR-004',
        variable,
        titulo: 'V61 reporta último esquema real, pero V67 está en 98',
        mensaje: 'V61 registra una ubicación real del último esquema. Para V67 debe reportarse un ATC adicional o 97 si no recibió medicamento diferente a V66.1 a V66.9.',
        regla: 'Si V61 registra 1, 2, 3, 11, 12, 13 o 14, V67 no debe usar 98; debe registrar ATC adicional o 97 cuando no hubo medicamento adicional.',
        recomendacion: 'Revise primero V61. Si sí hubo último esquema, cambie V67 a un ATC válido o a 97 según corresponda.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (valor === '97' && !VALORES_REALES_V61.includes(v61)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V67-ERROR-005',
        variable,
        titulo: 'V67=97, pero V61 no tiene ubicación real del último esquema',
        mensaje: 'V67=97 aplica cuando V61 registra una ubicación real del último esquema. Si V61 no tiene una opción real, primero debe corregirse V61.',
        regla: 'V67=97 aplica cuando no recibió medicamento adicional diferente a V66.1 a V66.9 y V61 está en 1, 2, 3, 11, 12, 13 o 14.',
        recomendacion: 'Revise primero V61. Si no hubo último esquema, V67 debe ser 98. Si sí hubo último esquema, corrija V61 y luego verifique si V67=97 aplica.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (pareceATC) {
      const repetido = obtenerMedicamentosV66(registro).find((item) => item.valor === valorATC);

      if (repetido) {
        hallazgos.push(crearHallazgo({
          codigo: 'V67-ERROR-006',
          variable,
          titulo: 'V67 repite un medicamento reportado en V66.1 a V66.9',
          mensaje: `V67 registra un medicamento que ya aparece en ${etiquetaVariable(repetido.variable)}. V67 solo debe usarse para medicamentos adicionales diferentes.`,
          regla: 'El instructivo de V67 indica verificar que el medicamento no se encuentre en el listado de V66.1 a V66.9.',
          recomendacion: 'Revise V66.1 a V66.9 y V67. Si el medicamento ya fue reportado antes, V67 debe corregirse a otro ATC adicional o a 97 si no hubo medicamento adicional.',
          valor: valorOriginal,
          datosRelacionados: datos()
        }));

        return hallazgos;
      }

      const atc = validarCodigoATC(valorOriginal);

      if (atc.revisado && !atc.existe) {
        hallazgos.push(crearHallazgo({
          codigo: 'V67-ERROR-002',
          variable,
          titulo: 'V67 tiene un código ATC no encontrado en catálogo',
          mensaje: `V67 tiene el valor ${texto(valorOriginal)}, pero ese código no fue encontrado en el catálogo ATC cargado. V67 debe registrar un código ATC válido, 97 o 98.`,
          regla: 'Si V67 no es 97 ni 98, debe corresponder a un código ATC válido del catálogo cargado.',
          recomendacion: 'Verifique el código ATC en la fuente correspondiente y corríjalo. Use 97 si no recibió medicamento adicional diferente a V66.1 a V66.9, o 98 si no aplica.',
          valor: valorOriginal,
          datosRelacionados: datos()
        }));

        return hallazgos;
      }

      hallazgos.push(crearHallazgo({
        codigo: 'V67-ADVERTENCIA-001',
        variable,
        severidad: 'advertencia',
        titulo: 'V67 registra ATC y debe revisarse contra V68 y V69',
        mensaje: 'V67 registra un medicamento adicional. Cuando se validen V68 y V69, debe verificarse que este ATC no se repita allí.',
        regla: 'El instructivo indica revisar que los antineoplásicos reportados en V67 no se repitan en V68 y V69.',
        recomendacion: 'Revise que el medicamento reportado en V67 no se repita en V68 ni V69. Esta revisión queda como advertencia hasta implementar esas variables.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));
    }

    return hallazgos;
  }


  function validarV68(registro) {
    const hallazgos = [];
    const variable = 'V68';
    const valorOriginal = registro?.V68;
    const valor = normalizarCodigo(valorOriginal);
    const valorATC = normalizarATC(valorOriginal);
    const v45 = normalizarCodigo(registro?.V45);
    const v61 = normalizarCodigo(registro?.V61);
    const v67 = normalizarATC(registro?.V67);
    const esComodin = valor === '97' || valor === '98';
    const pareceATC = !estaVacio(valorOriginal) && !esComodin;
    const datos = () => datosBase(registro, variable);

    if (estaVacio(valorOriginal)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V68-ERROR-001',
        variable,
        titulo: 'V68 está vacía',
        mensaje: 'V68 está vacía. Debe registrar un código ATC, 97 o 98 según aplique.',
        regla: 'V68 debe registrar código ATC del segundo medicamento adicional administrado, 97 si no recibió un segundo medicamento adicional con V61 real, o 98 si no tuvo último esquema o V61=97/98.',
        recomendacion: 'Revise el último esquema. Registre un ATC válido, 97 si no hubo segundo medicamento adicional diferente a V66.1 a V66.9 y V67, o 98 si no aplica.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (v45 === '98' && valor !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V68-ERROR-008',
        variable,
        titulo: 'V45=98, pero V68 no está en 98',
        mensaje: 'V45=98 indica que no aplica terapia sistémica en el periodo. En ese caso, V68 debe quedar en 98.',
        regla: 'Si V45=98, las variables del bloque de quimioterapia o terapia sistémica deben registrar No aplica cuando corresponda.',
        recomendacion: 'Revise primero V45. Si V45=98 es correcto, corrija V68 a 98.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (pareceATC && v45 !== '1') {
      hallazgos.push(crearHallazgo({
        codigo: 'V68-ERROR-007',
        variable,
        titulo: 'V68 registra ATC, pero V45 no indica terapia sistémica',
        mensaje: 'V68 registra un segundo medicamento adicional, pero V45 no indica que el paciente recibió terapia sistémica.',
        regla: 'V68 depende de V45. Para registrar un medicamento adicional del último esquema, V45 debe indicar que recibió quimioterapia u otra terapia sistémica.',
        recomendacion: 'Revise primero V45. Si el paciente sí recibió terapia sistémica, corrija V45 a 1. Si V45 debe ser 98, entonces V68 debe ser 98.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if ((v61 === '97' || v61 === '98') && valor !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V68-ERROR-003',
        variable,
        titulo: 'V61=97 o V61=98, pero V68 no está en 98',
        mensaje: 'V61=97 o V61=98 indica que no debe reportarse segundo medicamento adicional del último esquema. En este caso, V68 debe quedar en 98.',
        regla: 'El instructivo de V68 define 98 cuando no tuvo este último esquema o cuando V61 seleccionó 97 o 98.',
        recomendacion: 'Revise primero V61. Si V61 está correcto en 97 o 98, corrija V68 a 98.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (VALORES_REALES_V61.includes(v61) && valor === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V68-ERROR-004',
        variable,
        titulo: 'V61 reporta último esquema real, pero V68 está en 98',
        mensaje: 'V61 registra una ubicación real del último esquema. Para V68 debe reportarse un segundo ATC adicional o 97 si no recibió un segundo medicamento diferente a V66.1 a V66.9 y V67.',
        regla: 'Si V61 registra 1, 2, 3, 11, 12, 13 o 14, V68 no debe usar 98; debe registrar ATC adicional o 97 cuando no hubo segundo medicamento adicional.',
        recomendacion: 'Revise primero V61. Si sí hubo último esquema, cambie V68 a un ATC válido o a 97 según corresponda.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (valor === '97' && !VALORES_REALES_V61.includes(v61)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V68-ERROR-005',
        variable,
        titulo: 'V68=97, pero V61 no tiene ubicación real del último esquema',
        mensaje: 'V68=97 aplica cuando V61 registra una ubicación real del último esquema. Si V61 no tiene una opción real, primero debe corregirse V61.',
        regla: 'V68=97 aplica cuando no recibió un segundo medicamento adicional diferente a V66.1 a V66.9 y V67, y V61 está en 1, 2, 3, 11, 12, 13 o 14.',
        recomendacion: 'Revise primero V61. Si no hubo último esquema, V68 debe ser 98. Si sí hubo último esquema, corrija V61 y luego verifique si V68=97 aplica.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (pareceATC) {
      const repetidoV66 = obtenerMedicamentosV66(registro).find((item) => item.valor === valorATC);

      if (repetidoV66) {
        hallazgos.push(crearHallazgo({
          codigo: 'V68-ERROR-006',
          variable,
          titulo: 'V68 repite un medicamento reportado en V66.1 a V66.9',
          mensaje: `V68 registra un medicamento que ya aparece en ${etiquetaVariable(repetidoV66.variable)}. V68 solo debe usarse para un segundo medicamento adicional diferente.`,
          regla: 'El instructivo de V68 indica verificar que el medicamento no se encuentre en el listado de V66.1 a V66.9.',
          recomendacion: 'Revise V66.1 a V66.9 y V68. Si el medicamento ya fue reportado antes, V68 debe corregirse a otro ATC adicional o a 97 si no hubo segundo medicamento adicional.',
          valor: valorOriginal,
          datosRelacionados: datos()
        }));

        return hallazgos;
      }

      if (v67 && v67 !== '97' && v67 !== '98' && v67 === valorATC) {
        hallazgos.push(crearHallazgo({
          codigo: 'V68-ERROR-009',
          variable,
          titulo: 'V68 repite el medicamento reportado en V67',
          mensaje: 'V68 registra el mismo ATC reportado en V67. V68 debe usarse para un segundo medicamento adicional diferente.',
          regla: 'V68 no debe repetir el medicamento adicional reportado en V67.',
          recomendacion: 'Revise V67 y V68. Si solo hubo un medicamento adicional, V68 debe quedar en 97 cuando V61 tiene ubicación real del último esquema.',
          valor: valorOriginal,
          datosRelacionados: datos()
        }));

        return hallazgos;
      }

      const atc = validarCodigoATC(valorOriginal);

      if (atc.revisado && !atc.existe) {
        hallazgos.push(crearHallazgo({
          codigo: 'V68-ERROR-002',
          variable,
          titulo: 'V68 tiene un código ATC no encontrado en catálogo',
          mensaje: `V68 tiene el valor ${texto(valorOriginal)}, pero ese código no fue encontrado en el catálogo ATC cargado. V68 debe registrar un código ATC válido, 97 o 98.`,
          regla: 'Si V68 no es 97 ni 98, debe corresponder a un código ATC válido del catálogo cargado.',
          recomendacion: 'Verifique el código ATC en la fuente correspondiente y corríjalo. Use 97 si no recibió segundo medicamento adicional diferente a V66.1 a V66.9 y V67, o 98 si no aplica.',
          valor: valorOriginal,
          datosRelacionados: datos()
        }));

        return hallazgos;
      }

      hallazgos.push(crearHallazgo({
        codigo: 'V68-ADVERTENCIA-001',
        variable,
        severidad: 'advertencia',
        titulo: 'V68 registra ATC y debe revisarse contra V69',
        mensaje: 'V68 registra un segundo medicamento adicional. Cuando se valide V69, debe verificarse que este ATC no se repita allí.',
        regla: 'El instructivo indica verificar que los antineoplásicos reportados como adicionales no se repitan en variables posteriores.',
        recomendacion: 'Revise que el medicamento reportado en V68 no se repita en V69. Esta revisión queda como advertencia hasta implementar V69.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));
    }

    return hallazgos;
  }

  function validarV69(registro) {
    const hallazgos = [];
    const variable = 'V69';
    const valorOriginal = registro?.V69;
    const valor = normalizarCodigo(valorOriginal);
    const valorATC = normalizarATC(valorOriginal);
    const v45 = normalizarCodigo(registro?.V45);
    const v61 = normalizarCodigo(registro?.V61);
    const v67 = normalizarATC(registro?.V67);
    const v68 = normalizarATC(registro?.V68);
    const esComodin = valor === '97' || valor === '98';
    const pareceATC = !estaVacio(valorOriginal) && !esComodin;
    const datos = () => datosBase(registro, variable);

    if (estaVacio(valorOriginal)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V69-ERROR-001',
        variable,
        titulo: 'V69 está vacía',
        mensaje: 'V69 está vacía. Debe registrar un código ATC, 97 o 98 según aplique.',
        regla: 'V69 debe registrar código ATC del tercer medicamento adicional administrado, 97 si no recibió un tercer medicamento adicional con V61 real, o 98 si no tuvo último esquema o V61=97/98.',
        recomendacion: 'Revise el último esquema. Registre un ATC válido, 97 si no hubo tercer medicamento adicional diferente a V66.1 a V66.9, V67 y V68, o 98 si no aplica.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (v45 === '98' && valor !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V69-ERROR-008',
        variable,
        titulo: 'V45=98, pero V69 no está en 98',
        mensaje: 'V45=98 indica que no aplica terapia sistémica en el periodo. En ese caso, V69 debe quedar en 98.',
        regla: 'Si V45=98, las variables del bloque de quimioterapia o terapia sistémica deben registrar No aplica cuando corresponda.',
        recomendacion: 'Revise primero V45. Si V45=98 es correcto, corrija V69 a 98.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (pareceATC && v45 !== '1') {
      hallazgos.push(crearHallazgo({
        codigo: 'V69-ERROR-007',
        variable,
        titulo: 'V69 registra ATC, pero V45 no indica terapia sistémica',
        mensaje: 'V69 registra un tercer medicamento adicional, pero V45 no indica que el paciente recibió terapia sistémica.',
        regla: 'V69 depende de V45. Para registrar un medicamento adicional del último esquema, V45 debe indicar que recibió quimioterapia u otra terapia sistémica.',
        recomendacion: 'Revise primero V45. Si el paciente sí recibió terapia sistémica, corrija V45 a 1. Si V45 debe ser 98, entonces V69 debe ser 98.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if ((v61 === '97' || v61 === '98') && valor !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V69-ERROR-003',
        variable,
        titulo: 'V61=97 o V61=98, pero V69 no está en 98',
        mensaje: 'V61=97 o V61=98 indica que no debe reportarse tercer medicamento adicional del último esquema. En este caso, V69 debe quedar en 98.',
        regla: 'El instructivo de V69 define 98 cuando no tuvo este último esquema o cuando V61 seleccionó 97 o 98.',
        recomendacion: 'Revise primero V61. Si V61 está correcto en 97 o 98, corrija V69 a 98.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (VALORES_REALES_V61.includes(v61) && valor === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V69-ERROR-004',
        variable,
        titulo: 'V61 reporta último esquema real, pero V69 está en 98',
        mensaje: 'V61 registra una ubicación real del último esquema. Para V69 debe reportarse un tercer ATC adicional o 97 si no recibió un tercer medicamento diferente a V66.1 a V66.9, V67 y V68.',
        regla: 'Si V61 registra 1, 2, 3, 11, 12, 13 o 14, V69 no debe usar 98; debe registrar ATC adicional o 97 cuando no hubo tercer medicamento adicional.',
        recomendacion: 'Revise primero V61. Si sí hubo último esquema, cambie V69 a un ATC válido o a 97 según corresponda.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (valor === '97' && !VALORES_REALES_V61.includes(v61)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V69-ERROR-005',
        variable,
        titulo: 'V69=97, pero V61 no tiene ubicación real del último esquema',
        mensaje: 'V69=97 aplica cuando V61 registra una ubicación real del último esquema. Si V61 no tiene una opción real, primero debe corregirse V61.',
        regla: 'V69=97 aplica cuando no recibió un tercer medicamento adicional diferente a V66.1 a V66.9, V67 y V68, y V61 está en 1, 2, 3, 11, 12, 13 o 14.',
        recomendacion: 'Revise primero V61. Si no hubo último esquema, V69 debe ser 98. Si sí hubo último esquema, corrija V61 y luego verifique si V69=97 aplica.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (pareceATC) {
      const repetidoV66 = obtenerMedicamentosV66(registro).find((item) => item.valor === valorATC);

      if (repetidoV66) {
        hallazgos.push(crearHallazgo({
          codigo: 'V69-ERROR-006',
          variable,
          titulo: 'V69 repite un medicamento reportado en V66.1 a V66.9',
          mensaje: `V69 registra un medicamento que ya aparece en ${etiquetaVariable(repetidoV66.variable)}. V69 solo debe usarse para un tercer medicamento adicional diferente.`,
          regla: 'El instructivo de V69 indica verificar que el medicamento no se encuentre en el listado de V66.1 a V66.9.',
          recomendacion: 'Revise V66.1 a V66.9 y V69. Si el medicamento ya fue reportado antes, V69 debe corregirse a otro ATC adicional o a 97 si no hubo tercer medicamento adicional.',
          valor: valorOriginal,
          datosRelacionados: datos()
        }));

        return hallazgos;
      }

      if (v67 && v67 !== '97' && v67 !== '98' && v67 === valorATC) {
        hallazgos.push(crearHallazgo({
          codigo: 'V69-ERROR-009',
          variable,
          titulo: 'V69 repite el medicamento reportado en V67',
          mensaje: 'V69 registra el mismo ATC reportado en V67. V69 debe usarse para un tercer medicamento adicional diferente.',
          regla: 'V69 no debe repetir el medicamento adicional reportado en V67.',
          recomendacion: 'Revise V67 y V69. Si solo hubo hasta dos medicamentos adicionales, V69 debe quedar en 97 cuando V61 tiene ubicación real del último esquema.',
          valor: valorOriginal,
          datosRelacionados: datos()
        }));

        return hallazgos;
      }

      if (v68 && v68 !== '97' && v68 !== '98' && v68 === valorATC) {
        hallazgos.push(crearHallazgo({
          codigo: 'V69-ERROR-010',
          variable,
          titulo: 'V69 repite el medicamento reportado en V68',
          mensaje: 'V69 registra el mismo ATC reportado en V68. V69 debe usarse para un tercer medicamento adicional diferente.',
          regla: 'V69 no debe repetir el medicamento adicional reportado en V68.',
          recomendacion: 'Revise V68 y V69. Si solo hubo hasta dos medicamentos adicionales, V69 debe quedar en 97 cuando V61 tiene ubicación real del último esquema.',
          valor: valorOriginal,
          datosRelacionados: datos()
        }));

        return hallazgos;
      }

      const atc = validarCodigoATC(valorOriginal);

      if (atc.revisado && !atc.existe) {
        hallazgos.push(crearHallazgo({
          codigo: 'V69-ERROR-002',
          variable,
          titulo: 'V69 tiene un código ATC no encontrado en catálogo',
          mensaje: `V69 tiene el valor ${texto(valorOriginal)}, pero ese código no fue encontrado en el catálogo ATC cargado. V69 debe registrar un código ATC válido, 97 o 98.`,
          regla: 'Si V69 no es 97 ni 98, debe corresponder a un código ATC válido del catálogo cargado.',
          recomendacion: 'Verifique el código ATC en la fuente correspondiente y corríjalo. Use 97 si no recibió tercer medicamento adicional diferente a V66.1 a V66.9, V67 y V68, o 98 si no aplica.',
          valor: valorOriginal,
          datosRelacionados: datos()
        }));

        return hallazgos;
      }
    }

    return hallazgos;
  }

  function validarV66_1(registro) { return validarMedicamento(registro, 1); }
  function validarV66_2(registro) { return validarMedicamento(registro, 2); }
  function validarV66_3(registro) { return validarMedicamento(registro, 3); }
  function validarV66_4(registro) { return validarMedicamento(registro, 4); }
  function validarV66_5(registro) { return validarMedicamento(registro, 5); }
  function validarV66_6(registro) { return validarMedicamento(registro, 6); }
  function validarV66_7(registro) { return validarMedicamento(registro, 7); }
  function validarV66_8(registro) { return validarMedicamento(registro, 8); }
  function validarV66_9(registro) { return validarMedicamento(registro, 9); }


  function esFormatoFechaISO(valor) {
    return /^\d{4}-\d{2}-\d{2}$/.test(texto(valor));
  }

  function esFechaISOValida(valor) {
    const fechaTexto = texto(valor);
    if (!esFormatoFechaISO(fechaTexto)) return false;

    const partes = fechaTexto.split('-').map(Number);
    const anio = partes[0];
    const mes = partes[1];
    const dia = partes[2];

    if (anio < 1 || mes < 1 || mes > 12 || dia < 1 || dia > 31) return false;

    const fecha = new Date(Date.UTC(anio, mes - 1, dia));
    return fecha.getUTCFullYear() === anio &&
      fecha.getUTCMonth() === mes - 1 &&
      fecha.getUTCDate() === dia;
  }

  function esFechaRealV71(valor) {
    const fecha = texto(valor);
    return esFechaISOValida(fecha) && fecha !== '1800-01-01' && fecha !== '1845-01-01';
  }


  function validarV70(registro) {
    const hallazgos = [];
    const variable = 'V70';
    const valorOriginal = registro?.V70;
    const v70 = normalizarCodigo(valorOriginal);
    const v45 = normalizarCodigo(registro?.V45);

    const datos = () => [
      dato('V45', registro?.V45, describirValorV45(registro?.V45)),
      dato('V61', registro?.V61, describirValorV61(registro?.V61)),
      dato('V70', valorOriginal, 'V70 registra si recibió quimioterapia intratecal en el último esquema del periodo.')
    ];

    if (estaVacio(valorOriginal)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V70-ERROR-001',
        variable,
        titulo: 'V70 está vacía',
        mensaje: 'V70 está vacía. Debe registrar 1 si recibió quimioterapia intratecal, 2 si no recibió, o 98 si no tuvo ningún esquema de quimioterapia con V45=98.',
        regla: 'V70 debe registrar 1, 2 o 98 según el instructivo.',
        recomendacion: 'Revise V45 y el último esquema del periodo. Registre 1, 2 o 98 según corresponda.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (!['1', '2', '98'].includes(v70)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V70-ERROR-002',
        variable,
        titulo: 'V70 tiene valor fuera de catálogo',
        mensaje: `V70 tiene el valor ${texto(valorOriginal)}, pero solo permite 1, 2 o 98.`,
        regla: 'El instructivo de V70 solo permite 1: Sí recibió, 2: No recibió y 98: No aplica.',
        recomendacion: 'Corrija V70 usando 1, 2 o 98 según la historia clínica y la trazabilidad con V45.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (v45 === '98' && v70 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V70-ERROR-003',
        variable,
        titulo: 'V45=98, pero V70 no está en 98',
        mensaje: 'V45=98 indica que no tuvo ningún esquema de quimioterapia o terapia sistémica. En ese caso, V70 debe quedar en 98.',
        regla: 'El instructivo de V70 define 98 cuando no tuvo ningún esquema de quimioterapia y en V45 seleccionó 98.',
        recomendacion: 'Revise primero V45. Si V45=98 es correcto, corrija V70 a 98. Si el paciente sí tuvo esquema, corrija V45 y luego registre V70 como 1 o 2.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));
    }

    if (v45 === '1' && v70 === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V70-ERROR-004',
        variable,
        titulo: 'V45 indica quimioterapia, pero V70 está en 98',
        mensaje: 'V45=1 indica que sí recibió quimioterapia u otra terapia sistémica en el periodo. En ese caso, V70 debe registrar 1 o 2, no 98.',
        regla: 'V70=98 solo aplica cuando no tuvo ningún esquema de quimioterapia y V45=98.',
        recomendacion: 'Revise el último esquema. Si recibió quimioterapia intratecal, registre 1. Si no recibió intratecal, registre 2.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));
    }

    return hallazgos;
  }


  function validarV71(registro) {
    const hallazgos = [];
    const variable = 'V71';
    const valorOriginal = registro?.V71;
    const valor = texto(valorOriginal);
    const v45 = normalizarCodigo(registro?.V45);

    const datos = () => [
      dato('V45', registro?.V45, describirValorV45(registro?.V45)),
      dato('V61', registro?.V61, describirValorV61(registro?.V61)),
      dato('V70', registro?.V70, 'V70 registra si recibió quimioterapia intratecal en el último esquema.'),
      dato('V71', valorOriginal, 'V71 registra la fecha de finalización del último esquema de quimioterapia o terapia sistémica.')
    ];

    if (estaVacio(valorOriginal)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V71-ERROR-001',
        variable,
        titulo: 'V71 está vacía',
        mensaje: 'V71 está vacía. Debe registrar una fecha en formato AAAA-MM-DD, 1845-01-01 si no aplica, o 1800-01-01 para hormonoterapia o esquema que aún no finaliza.',
        regla: 'V71 debe registrar la fecha de finalización del último esquema o uno de los comodines permitidos por el instructivo.',
        recomendacion: 'Revise la historia clínica y registre la fecha correspondiente. Use 1845-01-01 solo si no aplica y 1800-01-01 cuando el esquema u hormonoterapia aún no finaliza.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (!esFormatoFechaISO(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V71-ERROR-002',
        variable,
        titulo: 'V71 no tiene formato válido AAAA-MM-DD',
        mensaje: `V71 tiene el valor ${texto(valorOriginal)}, pero debe registrarse en formato AAAA-MM-DD.`,
        regla: 'El instructivo exige registrar la fecha en formato AAAA-MM-DD.',
        recomendacion: 'Corrija V71 usando el formato AAAA-MM-DD. Si solo conoce año y mes, registre el día 15.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (!esFechaISOValida(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V71-ERROR-003',
        variable,
        titulo: 'V71 tiene una fecha inexistente o inválida',
        mensaje: `V71 tiene el valor ${texto(valorOriginal)}, pero esa fecha no existe o no es válida.`,
        regla: 'V71 debe contener una fecha calendario válida en formato AAAA-MM-DD.',
        recomendacion: 'Corrija la fecha de finalización del último esquema. Si solo conoce año y mes, use el día 15.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (valor === '1800-01-01') {
      hallazgos.push(crearHallazgo({
        codigo: 'V71-ADVERTENCIA-001',
        variable,
        severidad: 'advertencia',
        titulo: 'V71=1800-01-01; verificar esquema no finalizado u hormonoterapia',
        mensaje: 'V71=1800-01-01 está permitido por el instructivo para hormonoterapia o esquema que aún no finaliza. Debe verificarse la trazabilidad clínica del último esquema.',
        regla: 'El instructivo permite 1800-01-01 para hormonoterapia o esquemas que aún no finalizan.',
        recomendacion: 'Confirme que el tratamiento actual no haya finalizado o que corresponda a hormonoterapia en curso.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));
    }

    if (valor === '1845-01-01') {
      hallazgos.push(crearHallazgo({
        codigo: 'V71-ADVERTENCIA-002',
        variable,
        severidad: 'advertencia',
        titulo: 'V71=1845-01-01; verificar No aplica',
        mensaje: 'V71=1845-01-01 está permitido por el instructivo como No aplica. Debe verificarse que realmente no aplique al último esquema.',
        regla: 'El instructivo permite 1845-01-01 como No aplica.',
        recomendacion: 'Revise V45, V61 y el último esquema antes de confirmar que V71 no aplica.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));
    }

    if (v45 === '1' && valor === '1845-01-01') {
      hallazgos.push(crearHallazgo({
        codigo: 'V71-ADVERTENCIA-003',
        variable,
        severidad: 'advertencia',
        titulo: 'V45 indica tratamiento, pero V71 está en No aplica',
        mensaje: 'V45 indica quimioterapia o terapia sistémica, pero V71 está en 1845-01-01. El valor es permitido, pero requiere revisión de trazabilidad.',
        regla: 'V71 permite 1845-01-01, pero debe ser coherente con la existencia del último esquema reportado.',
        recomendacion: 'Confirme si realmente no aplica o si debe registrar la fecha de finalización del último esquema.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));
    }

    if (v45 === '98' && (esFechaRealV71(valor) || valor === '1800-01-01')) {
      hallazgos.push(crearHallazgo({
        codigo: 'V71-ADVERTENCIA-004',
        variable,
        severidad: 'advertencia',
        titulo: 'V45=98, pero V71 trae fecha o esquema no finalizado',
        mensaje: 'V45=98 indica No aplica para quimioterapia o terapia sistémica, pero V71 registra una fecha real o 1800-01-01. Es una incoherencia de trazabilidad que debe revisarse.',
        regla: 'El instructivo permite fechas y comodines en V71; la coherencia con V45 se revisa como advertencia.',
        recomendacion: 'Revise primero V45. Si sí hubo esquema, corrija V45. Si no hubo esquema, evalúe si V71 debe quedar en 1845-01-01.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));
    }

    return hallazgos;
  }


  function describirValorV71(valor) {
    const fecha = texto(valor);

    if (!fecha) {
      return 'V71 está vacía.';
    }

    if (fecha === '1800-01-01') {
      return 'V71=1800-01-01 está permitido para hormonoterapia o esquema que aún no finaliza.';
    }

    if (fecha === '1845-01-01') {
      return 'V71=1845-01-01 significa No aplica.';
    }

    if (esFormatoFechaISO(fecha) && esFechaISOValida(fecha)) {
      return `V71=${fecha} registra una fecha real de finalización del último esquema.`;
    }

    return `V71 tiene el valor ${texto(valor)}.`;
  }

  function describirValorV72(valor) {
    const codigo = normalizarCodigo(valor);
    const descripciones = {
      '1': 'V72=1 significa finalizado, esquema completo según medicamentos programados.',
      '2': 'V72=2 significa finalizado, esquema incompleto pero finalizado por algún motivo.',
      '3': 'V72=3 significa no finalizado, esquema incompleto, pero aún bajo tratamiento.',
      '98': 'V72=98 significa No aplica.'
    };

    if (descripciones[codigo]) {
      return descripciones[codigo];
    }

    if (!codigo) {
      return 'V72 está vacía.';
    }

    return `V72 tiene el valor ${codigo}.`;
  }

  function esFechaRealFinalizacion(valor) {
    const fecha = texto(valor);
    return esFormatoFechaISO(fecha) && esFechaISOValida(fecha) && fecha !== '1800-01-01' && fecha !== '1845-01-01';
  }

  function validarV72(registro) {
    const hallazgos = [];
    const variable = 'V72';
    const valorOriginal = registro?.V72;
    const v72 = normalizarCodigo(valorOriginal);
    const v45 = normalizarCodigo(registro?.V45);
    const v61 = normalizarCodigo(registro?.V61);
    const v71 = texto(registro?.V71);

    const datos = () => [
      dato('V45', registro?.V45, describirValorV45(registro?.V45)),
      dato('V61', registro?.V61, describirValorV61(registro?.V61)),
      dato('V71', registro?.V71, describirValorV71(registro?.V71)),
      dato('V72', valorOriginal, 'V72 registra las características actuales del último esquema del periodo.')
    ];

    if (estaVacio(valorOriginal)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V72-ERROR-001',
        variable,
        titulo: 'V72 está vacía',
        mensaje: 'V72 está vacía. Debe registrar 1, 2, 3 o 98 según las características actuales del último esquema.',
        regla: 'El instructivo de V72 exige registrar el estado actual del último esquema del periodo.',
        recomendacion: 'Revise el último esquema y registre 1 si finalizó completo, 2 si finalizó incompleto por algún motivo, 3 si no ha finalizado o 98 si no aplica.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (!['1', '2', '3', '98'].includes(v72)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V72-ERROR-002',
        variable,
        titulo: 'V72 tiene valor fuera de catálogo',
        mensaje: `V72 tiene el valor ${texto(valorOriginal)}, pero solo permite 1, 2, 3 o 98.`,
        regla: 'El instructivo de V72 solo permite 1: finalizado completo, 2: finalizado incompleto, 3: no finalizado bajo tratamiento y 98: No aplica.',
        recomendacion: 'Corrija V72 usando el valor del catálogo que corresponda al último esquema.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if ((v72 === '1' || v72 === '2') && !esFechaRealFinalizacion(v71)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V72-ADVERTENCIA-001',
        variable,
        severidad: 'advertencia',
        titulo: 'V72 indica esquema finalizado, pero V71 no tiene fecha real',
        mensaje: 'V72 indica que el último esquema finalizó, pero V71 no registra una fecha real de finalización. La coherencia debe revisarse contra el último esquema.',
        regla: 'El instructivo de V72 define el estado del esquema; la coherencia con V71 se revisa como advertencia de trazabilidad.',
        recomendacion: 'Revise V71. Si el esquema finalizó, registre la fecha real de finalización. Si no finalizó o no aplica, revise V72.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));
    }

    if (v72 === '3' && v71 !== '1800-01-01') {
      hallazgos.push(crearHallazgo({
        codigo: 'V72-ADVERTENCIA-002',
        variable,
        severidad: 'advertencia',
        titulo: 'V72 indica esquema no finalizado, pero V71 no está en 1800-01-01',
        mensaje: 'V72=3 indica esquema no finalizado o aún bajo tratamiento. V71 permite 1800-01-01 para hormonoterapia o esquema que aún no finaliza; revise la coherencia.',
        regla: 'La coherencia entre V72=3 y V71=1800-01-01 se revisa como advertencia de trazabilidad.',
        recomendacion: 'Confirme si el esquema aún continúa. Si continúa, revise si V71 debe ser 1800-01-01. Si ya finalizó, revise V72.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));
    }

    if (v72 === '98' && (v45 === '1' || VALORES_REALES_V61.includes(v61))) {
      hallazgos.push(crearHallazgo({
        codigo: 'V72-ADVERTENCIA-003',
        variable,
        severidad: 'advertencia',
        titulo: 'V72=98; verificar No aplica frente a V45/V61',
        mensaje: 'V72=98 indica No aplica, pero V45 o V61 sugieren que sí hubo último esquema. Revise la trazabilidad antes de confirmar No aplica.',
        regla: 'El instructivo permite V72=98; la coherencia con V45 y V61 se revisa como advertencia.',
        recomendacion: 'Revise V45 y V61. Si sí hubo último esquema, registre 1, 2 o 3 según corresponda. Si no aplica, confirme que V45/V61 estén correctamente reportadas.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));
    }

    if ((v45 === '98' || v61 === '97' || v61 === '98') && v72 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V72-ADVERTENCIA-004',
        variable,
        severidad: 'advertencia',
        titulo: 'V45/V61 sugieren No aplica, pero V72 reporta característica del esquema',
        mensaje: 'V45=98 o V61=97/98 sugieren que no aplica último esquema, pero V72 registra 1, 2 o 3. Revise la coherencia de la información reportada.',
        regla: 'La coherencia entre V45, V61 y V72 se revisa como advertencia porque el instructivo de V72 solo define el catálogo.',
        recomendacion: 'Revise primero V45 y V61. Si hubo último esquema, corrija esas variables; si no lo hubo, evalúe si V72 debe quedar en 98.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));
    }

    return hallazgos;
  }


  function describirValorV73(valor) {
    const codigo = normalizarCodigo(valor);
    const descripciones = {
      '1': 'V73=1 significa toxicidad de uno o más medicamentos.',
      '2': 'V73=2 significa otros motivos médicos.',
      '3': 'V73=3 significa muerte.',
      '4': 'V73=4 significa cambio de EPS.',
      '5': 'V73=5 significa decisión del usuario o abandono de terapia.',
      '6': 'V73=6 significa no disponibilidad de medicamentos.',
      '7': 'V73=7 significa otros motivos administrativos.',
      '8': 'V73=8 significa otras causas no contempladas.',
      '98': 'V73=98 significa No aplica.'
    };

    if (descripciones[codigo]) {
      return descripciones[codigo];
    }

    if (!codigo) {
      return 'V73 está vacía.';
    }

    return `V73 tiene el valor ${codigo}.`;
  }

  function validarV73(registro) {
    const hallazgos = [];
    const variable = 'V73';
    const valorOriginal = registro?.V73;
    const v72 = normalizarCodigo(registro?.V72);
    const v73 = normalizarCodigo(valorOriginal);
    const motivosReales = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const catalogo = [...motivosReales, '98'];

    const datos = () => [
      dato('V45', registro?.V45, describirValorV45(registro?.V45)),
      dato('V61', registro?.V61, describirValorV61(registro?.V61)),
      dato('V71', registro?.V71, describirValorV71(registro?.V71)),
      dato('V72', registro?.V72, describirValorV72(registro?.V72)),
      dato('V73', valorOriginal, describirValorV73(valorOriginal))
    ];

    if (estaVacio(valorOriginal)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V73-ERROR-001',
        variable,
        titulo: 'V73 está vacía',
        mensaje: 'V73 está vacía. Debe registrar un motivo entre 1 y 8 cuando V72=2, o 98 cuando no aplica.',
        regla: 'El instructivo de V73 exige seleccionar un solo número para el motivo de finalización prematura o registrar 98 si no aplica.',
        recomendacion: 'Revise V72. Si V72=2, registre el motivo real entre 1 y 8. Si V72 es diferente de 2, registre 98.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (!catalogo.includes(v73)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V73-ERROR-002',
        variable,
        titulo: 'V73 tiene valor fuera de catálogo',
        mensaje: `V73 tiene el valor ${texto(valorOriginal)}, pero solo permite 1, 2, 3, 4, 5, 6, 7, 8 o 98.`,
        regla: 'El instructivo de V73 solo permite motivos 1 a 8 o 98: No aplica.',
        recomendacion: 'Corrija V73 usando un valor permitido del catálogo.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (v72 === '2' && v73 === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V73-ERROR-003',
        variable,
        titulo: 'V72=2, pero V73 está en No aplica',
        mensaje: 'V72=2 indica que el último esquema finalizó incompleto por algún motivo. En ese caso V73 debe registrar el motivo real entre 1 y 8, no 98.',
        regla: 'El instructivo de V73 aplica si en la pregunta anterior se registró la opción 2.',
        recomendacion: 'Registre en V73 el motivo que primero ocurrió: toxicidad, motivo médico, muerte, cambio de EPS, abandono, no disponibilidad, motivo administrativo u otra causa.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));
    }

    if (v72 !== '2' && motivosReales.includes(v73)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V73-ERROR-004',
        variable,
        titulo: 'V73 solo aplica cuando V72=2',
        mensaje: 'V73 registra un motivo real de finalización prematura, pero V72 no está en 2. Si V72 es 1, 3 o 98, V73 debe ser 98.',
        regla: 'El instructivo de V73 indica que aplica únicamente si en V72 se registró la opción 2.',
        recomendacion: 'Revise V72 y V73. Si el esquema no fue finalizado incompleto por algún motivo, registre V73=98.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));
    }

    return hallazgos;
  }



  // ============================================================
  // V74. Cirugías curativas o paliativas durante el periodo
  // ============================================================
  function esCancerHematolinfatico(v17) {
    const codigo = texto(v17).toUpperCase().replace(/[^A-Z0-9]/g, '');
    return /^(C81|C82|C83|C84|C85|C86|C88|C90|C91|C92|C93|C94|C95|C96)/.test(codigo);
  }

  function describirValorV74(valor) {
    const codigo = normalizarCodigo(valor);
    const descripciones = {
      '1': 'V74=1 significa que sí fue sometido al menos a una cirugía durante el periodo.',
      '2': 'V74=2 significa que no recibió cirugía durante el periodo.'
    };

    if (descripciones[codigo]) {
      return descripciones[codigo];
    }

    if (!codigo) {
      return 'V74 está vacía.';
    }

    return `V74 tiene el valor ${codigo}.`;
  }

  function validarV74(registro) {
    const hallazgos = [];
    const variable = 'V74';
    const valorOriginal = registro?.V74;
    const v74 = normalizarCodigo(valorOriginal);
    const v17 = texto(registro?.V17).toUpperCase().replace(/[^A-Z0-9]/g, '');

    const datos = () => [
      dato('V17', registro?.V17, 'V17 identifica el cáncer reportado y ayuda a revisar pertinencia quirúrgica.'),
      dato('V23', registro?.V23, 'V23 sirve como referencia cuando el procedimiento fue diagnóstico y terapéutico.'),
      dato('V74', valorOriginal, describirValorV74(valorOriginal))
    ];

    if (estaVacio(valorOriginal)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V74-ERROR-001',
        variable,
        titulo: 'V74 está vacía',
        mensaje: 'V74 está vacía. Debe registrar 1 si fue sometido a cirugía curativa o paliativa durante el periodo, o 2 si no recibió cirugía.',
        regla: 'El instructivo de V74 exige registrar si el usuario fue sometido o no a una o más cirugías curativas o paliativas como parte del manejo del cáncer durante el periodo de reporte.',
        recomendacion: 'Revise la historia clínica y registre 1 o 2 según corresponda. No use 3 ni 98 en V74.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (!['1', '2'].includes(v74)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V74-ERROR-002',
        variable,
        titulo: 'V74 tiene valor fuera de catálogo',
        mensaje: `V74 tiene el valor ${texto(valorOriginal)}, pero solo permite 1 o 2. La opción 3 fue eliminada y 98 no aplica para esta variable.`,
        regla: 'El instructivo de V74 solo permite 1: sí fue sometido al menos a una cirugía durante este periodo, o 2: no recibió cirugía.',
        recomendacion: 'Corrija V74 usando 1 o 2. No reporte cirugías propuestas pero no realizadas.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (v74 === '1') {
      hallazgos.push(crearHallazgo({
        codigo: 'V74-ADVERTENCIA-001',
        variable,
        severidad: 'advertencia',
        titulo: 'V74=1; verificar CUPS y objetivo quirúrgico',
        mensaje: 'V74=1 indica cirugía curativa o paliativa. Verifique que el procedimiento corresponda al manejo del cáncer y esté en el listado CUPS operativo. No reporte implante de catéter, punción lumbar, biopsias, cierre de ostomías ni cirugías propuestas no realizadas.',
        regla: 'El instructivo exige reportar procedimientos quirúrgicos del manejo del cáncer a partir del listado CUPS. Como V74 solo indica sí/no, el cruce CUPS queda como advertencia hasta la variable del procedimiento.',
        recomendacion: 'Confirme que la cirugía reportada sea curativa o paliativa del cáncer y seleccione la más representativa si hubo varias intervenciones en el mismo tiempo quirúrgico.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      if (esCancerHematolinfatico(v17)) {
        hallazgos.push(crearHallazgo({
          codigo: 'V74-ADVERTENCIA-002',
          variable,
          severidad: 'advertencia',
          titulo: 'V74=1 en cáncer hematolinfático; revisar pertinencia',
          mensaje: 'V74=1 fue reportado en un cáncer hematolinfático. El instructivo pide verificar minuciosamente que el procedimiento quirúrgico corresponda al manejo del cáncer.',
          regla: 'En cánceres hematolinfáticos, los procedimientos quirúrgicos deben revisarse con mayor detalle para confirmar que correspondan al manejo del cáncer.',
          recomendacion: 'Revise V17 y el procedimiento quirúrgico documentado. No reporte procedimientos diagnósticos aislados ni procedimientos para complicaciones.',
          valor: valorOriginal,
          datosRelacionados: datos()
        }));
      }

      hallazgos.push(crearHallazgo({
        codigo: 'V74-ADVERTENCIA-003',
        variable,
        severidad: 'advertencia',
        titulo: 'V74=1; verificar fecha si fue diagnóstico y terapéutico',
        mensaje: 'Si el procedimiento quirúrgico fue diagnóstico y terapéutico, el instructivo indica reportarlo y registrar la misma fecha de V23 en la variable de fecha quirúrgica correspondiente.',
        regla: 'La coincidencia de fecha con V23 depende de la variable posterior de fecha quirúrgica; por ahora se deja como advertencia contextual.',
        recomendacion: 'Cuando se valide la fecha quirúrgica, crúcela contra V23 si el procedimiento fue diagnóstico y terapéutico.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));
    }

    return hallazgos;
  }


  // ============================================================
  // V75. Número de cirugías a las que fue sometido el usuario
  // durante el periodo de reporte actual
  // ============================================================
  function describirValorV75(valor) {
    const textoValor = texto(valor);

    if (!textoValor) {
      return 'V75 está vacía.';
    }

    if (textoValor === '98') {
      return 'V75=98 significa No aplica cuando V74=2.';
    }

    return `V75 tiene el valor ${textoValor}.`;
  }

  function analizarEnteroV75(valor) {
    const original = texto(valor);
    const sinEspacios = original.replace(/\s+/g, '');

    if (!sinEspacios) {
      return { esValido: false, texto: sinEspacios, numero: null };
    }

    if (!/^\d+$/.test(sinEspacios)) {
      return { esValido: false, texto: sinEspacios, numero: null };
    }

    return { esValido: true, texto: sinEspacios, numero: Number(sinEspacios) };
  }

  function validarV75(registro) {
    const hallazgos = [];
    const variable = 'V75';
    const valorOriginal = registro?.V75;
    const v74 = normalizarCodigo(registro?.V74);
    const analisis = analizarEnteroV75(valorOriginal);

    const datos = () => [
      dato('V74', registro?.V74, describirValorV74(registro?.V74)),
      dato('V75', valorOriginal, describirValorV75(valorOriginal))
    ];

    if (estaVacio(valorOriginal)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V75-ERROR-001',
        variable,
        titulo: 'V75 está vacía',
        mensaje: 'V75 está vacía. Debe registrar el número de cirugías realizadas durante el periodo o 98 si V74=2.',
        regla: 'El instructivo de V75 exige registrar el número de cirugías a las que fue sometido el usuario durante el periodo de reporte actual. 98 solo aplica si en V74 respondió 2.',
        recomendacion: 'Revise V74. Si recibió cirugía, registre una cantidad entera mayor o igual a 1. Si no recibió cirugía, registre 98.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (!analisis.esValido) {
      hallazgos.push(crearHallazgo({
        codigo: 'V75-ERROR-002',
        variable,
        titulo: 'V75 tiene valor no numérico o inválido',
        mensaje: `V75 tiene el valor ${texto(valorOriginal)}, pero debe ser un número entero de cirugías o 98 cuando V74=2.`,
        regla: 'V75 debe registrar la cantidad de cirugías o tiempos quirúrgicos, no texto, decimales ni valores negativos.',
        recomendacion: 'Corrija V75 con un entero válido. No use decimales ni texto. Si V74=2, registre 98.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    const numero = analisis.numero;
    const v75 = analisis.texto;

    if (v74 === '1' && v75 === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V75-ERROR-003',
        variable,
        titulo: 'V74=1, pero V75 está en No aplica',
        mensaje: 'V74=1 indica que el usuario sí fue sometido a cirugía. En ese caso V75 debe registrar el número real de cirugías, no 98.',
        regla: 'El valor 98 en V75 solo aplica si en V74 respondió 2.',
        recomendacion: 'Registre en V75 el número de cirugías o tiempos quirúrgicos realizados durante el periodo.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (v74 === '1' && numero === 0) {
      hallazgos.push(crearHallazgo({
        codigo: 'V75-ERROR-004',
        variable,
        titulo: 'V74=1, pero V75=0',
        mensaje: 'V74=1 indica que recibió al menos una cirugía. Por tanto, V75 no puede ser 0.',
        regla: 'Si el usuario recibió cirugía, el número mínimo de cirugías durante el periodo debe ser 1.',
        recomendacion: 'Corrija V75 registrando la cantidad real de cirugías o revise V74 si no recibió cirugía.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (v74 === '2' && v75 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V75-ERROR-005',
        variable,
        titulo: 'V74=2, pero V75 registra número de cirugías',
        mensaje: 'V74=2 indica que no recibió cirugía. En ese caso V75 debe ser 98.',
        regla: 'El instructivo de V75 indica 98: No aplica, si respondió 2 en la pregunta anterior.',
        recomendacion: 'Si no recibió cirugía, registre V75=98. Si sí recibió cirugía, corrija V74=1 y registre la cantidad real en V75.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (v74 === '1' && numero > 1 && v75 !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V75-ADVERTENCIA-001',
        variable,
        severidad: 'advertencia',
        titulo: 'V75>1; verificar tiempos quirúrgicos y no CUPS',
        mensaje: 'V75 registra más de una cirugía. Verifique que el número corresponda a cirugías o tiempos quirúrgicos, no a la cantidad de procedimientos CUPS realizados dentro de una o varias cirugías.',
        regla: 'El instructivo aclara que V75 debe reportar la cantidad de cirugías, incluyendo complicaciones relacionadas con la cirugía inicial, y no la cantidad de procedimientos CUPS.',
        recomendacion: 'Confirme en la historia clínica cuántos tiempos quirúrgicos reales hubo durante el periodo.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));
    }

    return hallazgos;
  }



  // ============================================================
  // V76. Fecha de realización de la primera cirugía en este periodo
  // de reporte
  // ============================================================
  function describirValorV76(valor) {
    const fecha = texto(valor);

    if (!fecha) {
      return 'V76 está vacía.';
    }

    if (fecha === '1845-01-01') {
      return 'V76=1845-01-01 significa No aplica.';
    }

    if (esFormatoFechaISO(fecha) && esFechaISOValida(fecha)) {
      return `V76=${fecha} registra la fecha de realización de la primera cirugía del periodo.`;
    }

    return `V76 tiene el valor ${texto(valor)}.`;
  }

  function esFechaRealV76(valor) {
    const fecha = texto(valor);
    return esFormatoFechaISO(fecha) && esFechaISOValida(fecha) && fecha !== '1845-01-01';
  }

  function validarV76(registro) {
    const hallazgos = [];
    const variable = 'V76';
    const valorOriginal = registro?.V76;
    const valor = texto(valorOriginal);
    const v74 = normalizarCodigo(registro?.V74);
    const v75 = analizarEnteroV75(registro?.V75);

    const datos = () => [
      dato('V23', registro?.V23, 'V23 registra la fecha de recolección de muestra para estudio histopatológico válido.'),
      dato('V74', registro?.V74, describirValorV74(registro?.V74)),
      dato('V75', registro?.V75, describirValorV75(registro?.V75)),
      dato('V76', valorOriginal, describirValorV76(valorOriginal))
    ];

    if (estaVacio(valorOriginal)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V76-ERROR-001',
        variable,
        titulo: 'V76 está vacía',
        mensaje: 'V76 está vacía. Debe registrar la fecha de realización de la primera cirugía en formato AAAA-MM-DD o 1845-01-01 si no aplica.',
        regla: 'El instructivo de V76 exige registrar la fecha de realización de la primera cirugía del periodo o 1845-01-01 cuando no aplica.',
        recomendacion: 'Revise V74 y V75. Si recibió cirugía, registre la fecha real de la primera cirugía. Si no recibió cirugía, registre 1845-01-01.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (!esFormatoFechaISO(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V76-ERROR-002',
        variable,
        titulo: 'V76 no tiene formato válido AAAA-MM-DD',
        mensaje: `V76 tiene el valor ${texto(valorOriginal)}, pero debe estar en formato AAAA-MM-DD.`,
        regla: 'El instructivo exige registrar la fecha en formato AAAA-MM-DD. Si solo conoce año y mes, use el día 15.',
        recomendacion: 'Corrija la fecha usando el formato AAAA-MM-DD. Ejemplo: 2026-04-15.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (!esFechaISOValida(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V76-ERROR-003',
        variable,
        titulo: 'V76 tiene una fecha inexistente o inválida',
        mensaje: `V76 tiene el valor ${texto(valorOriginal)}, pero esa fecha no existe o no es válida.`,
        regla: 'V76 debe contener una fecha calendario válida en formato AAAA-MM-DD o 1845-01-01 si no aplica.',
        recomendacion: 'Corrija la fecha de realización de la primera cirugía. Si solo conoce año y mes, use el día 15.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (v74 === '1' && valor === '1845-01-01') {
      hallazgos.push(crearHallazgo({
        codigo: 'V76-ERROR-004',
        variable,
        titulo: 'V74=1, pero V76 está en No aplica',
        mensaje: 'V74=1 indica que el usuario sí recibió cirugía. En ese caso V76 debe registrar una fecha real de la primera cirugía, no 1845-01-01.',
        regla: '1845-01-01 está permitido en V76 solo cuando la fecha de primera cirugía no aplica.',
        recomendacion: 'Registre la fecha real de la primera cirugía o revise V74 si realmente no recibió cirugía.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (v74 === '2' && valor !== '1845-01-01') {
      hallazgos.push(crearHallazgo({
        codigo: 'V76-ERROR-005',
        variable,
        titulo: 'V74=2, pero V76 trae fecha de cirugía',
        mensaje: 'V74=2 indica que no recibió cirugía. En ese caso V76 debe ser 1845-01-01.',
        regla: 'Si no recibió cirugía, la fecha de primera cirugía no aplica y debe registrarse 1845-01-01.',
        recomendacion: 'Corrija V76 a 1845-01-01 o revise V74 si el usuario sí recibió cirugía.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (v74 === '1' && v75.esValido && v75.numero >= 1 && esFechaRealV76(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V76-ADVERTENCIA-001',
        variable,
        severidad: 'advertencia',
        titulo: 'V76 tiene fecha real; verificar primera cirugía',
        mensaje: 'V76 registra una fecha real. Verifique que corresponda a la primera cirugía del periodo, no a una cirugía posterior ni a un procedimiento CUPS dentro del mismo tiempo quirúrgico.',
        regla: 'El instructivo de V76 solicita la fecha de realización de la primera cirugía del periodo.',
        recomendacion: 'Revise la cronología quirúrgica del periodo y confirme que V76 sea la primera cirugía reportable.',
        valor: valorOriginal,
        datosRelacionados: datos(),
        columnasCorregir: ['V76']
      }));
    }

    if (v74 === '1' && esFechaRealV76(valorOriginal) && esFechaISOValida(registro?.V23) && texto(registro?.V23) === valor) {
      hallazgos.push(crearHallazgo({
        codigo: 'V76-ADVERTENCIA-002',
        variable,
        severidad: 'advertencia',
        titulo: 'V76 coincide con V23; verificar procedimiento diagnóstico y terapéutico',
        mensaje: 'V76 coincide con V23. Esto puede ser correcto si el procedimiento quirúrgico fue diagnóstico y terapéutico, pero debe verificarse contra la historia clínica.',
        regla: 'El instructivo permite que, cuando el procedimiento quirúrgico es diagnóstico y terapéutico, se registre la misma fecha de V23.',
        recomendacion: 'Confirme si la cirugía también fue diagnóstico y terapéutica. Si no lo fue, revise la fecha de V76.',
        valor: valorOriginal,
        datosRelacionados: datos(),
        columnasCorregir: ['V23', 'V76']
      }));
    }

    return hallazgos;
  }


  // ============================================================
  // V77. Código de la IPS que realizó la primera cirugía
  // de este periodo de reporte
  // ============================================================
  function describirValorV77(valor) {
    const codigo = normalizarCodigo(valor);

    if (!codigo) {
      return 'V77 está vacía.';
    }

    if (codigo === '96') {
      return 'V77=96 indica cirugía fuera del país.';
    }

    if (codigo === '98') {
      return 'V77=98 indica No aplica.';
    }

    if (/^\d{12}$/.test(codigo)) {
      return `V77=${codigo} registra un código REPS de 12 dígitos para la IPS de la primera cirugía.`;
    }

    return `V77 tiene el valor ${texto(valor)}.`;
  }

  function esReps12V77(valor) {
    return /^\d{12}$/.test(normalizarCodigo(valor));
  }

  function validarV77(registro) {
    const hallazgos = [];
    const variable = 'V77';
    const valorOriginal = registro?.V77;
    const valor = normalizarCodigo(valorOriginal);
    const v74 = normalizarCodigo(registro?.V74);

    const datos = () => [
      dato('V74', registro?.V74, describirValorV74(registro?.V74)),
      dato('V76', registro?.V76, describirValorV76(registro?.V76)),
      dato('V77', valorOriginal, describirValorV77(valorOriginal))
    ];

    if (estaVacio(valorOriginal)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V77-ERROR-001',
        variable,
        titulo: 'V77 está vacía',
        mensaje: 'V77 está vacía. Debe registrar código REPS de 12 dígitos, 96 si la cirugía fue fuera del país o 98 si no aplica.',
        regla: 'El instructivo de V77 exige registrar el código de habilitación de la IPS, 96 para cirugía fuera del país o 98 para No aplica.',
        recomendacion: 'Revise V74 y V76. Si recibió cirugía, registre REPS de 12 dígitos o 96 si fue fuera del país. Si no recibió cirugía, registre 98.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (!(esReps12V77(valorOriginal) || valor === '96' || valor === '98')) {
      hallazgos.push(crearHallazgo({
        codigo: 'V77-ERROR-002',
        variable,
        titulo: 'V77 tiene valor inválido',
        mensaje: `V77 tiene el valor ${texto(valorOriginal)}, pero debe ser un código REPS de 12 dígitos, 96 o 98.`,
        regla: 'V77 permite código REPS de 12 dígitos, 96 para cirugía fuera del país o 98 para No aplica.',
        recomendacion: 'Corrija V77. Verifique que el REPS tenga 12 dígitos incluyendo cero inicial, o registre 96/98 según corresponda.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (v74 === '1' && valor === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V77-ERROR-003',
        variable,
        titulo: 'V74=1, pero V77 está en No aplica',
        mensaje: 'V74=1 indica que el usuario sí recibió cirugía. En ese caso V77 debe registrar la IPS de la primera cirugía o 96 si fue fuera del país.',
        regla: '98 está permitido en V77 solo cuando el código de IPS no aplica porque no hubo cirugía.',
        recomendacion: 'Registre el código REPS de la IPS que realizó la primera cirugía, use 96 si fue fuera del país o revise V74.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (v74 === '2' && valor !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V77-ERROR-004',
        variable,
        titulo: 'V74=2, pero V77 registra IPS',
        mensaje: 'V74=2 indica que no recibió cirugía. En ese caso V77 debe ser 98.',
        regla: 'Si no recibió cirugía, el código de IPS de primera cirugía no aplica y debe registrarse 98.',
        recomendacion: 'Corrija V77 a 98 o revise V74 si el usuario sí recibió cirugía.',
        valor: valorOriginal,
        datosRelacionados: datos()
      }));

      return hallazgos;
    }

    if (v74 === '1' && esReps12V77(valorOriginal)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V77-ADVERTENCIA-001',
        variable,
        severidad: 'advertencia',
        titulo: 'V77 tiene REPS; verificar contra REPS',
        mensaje: 'V77 registra un código REPS de 12 dígitos. Verifique que exista en REPS y corresponda a la IPS que realizó la primera cirugía.',
        regla: 'El instructivo solicita el código de habilitación de la IPS disponible en REPS.',
        recomendacion: 'Confirme el código de habilitación de la IPS en la fuente REPS oficial u operativa disponible.',
        valor: valorOriginal,
        datosRelacionados: datos(),
        columnasCorregir: ['V77']
      }));
    }

    if (v74 === '1' && valor === '96') {
      hallazgos.push(crearHallazgo({
        codigo: 'V77-ADVERTENCIA-002',
        variable,
        severidad: 'advertencia',
        titulo: 'V77=96; verificar cirugía fuera del país',
        mensaje: 'V77=96 indica cirugía fuera del país. Verifique soporte documental.',
        regla: 'El instructivo permite 96 cuando la cirugía fue realizada fuera del país.',
        recomendacion: 'Confirme en la historia clínica o soporte administrativo que la primera cirugía ocurrió fuera del país.',
        valor: valorOriginal,
        datosRelacionados: datos(),
        columnasCorregir: ['V77']
      }));
    }

    return hallazgos;
  }


  function validar(registro) {
    let hallazgos = [];

    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V66')) {
      hallazgos = hallazgos.concat(validarV66(registro));
    }

    for (let i = 1; i <= 9; i += 1) {
      const variable = `V66_${i}`;
      if (Object.prototype.hasOwnProperty.call(registro || {}, variable)) {
        hallazgos = hallazgos.concat(validarMedicamento(registro, i));
      }
    }

    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V67')) {
      hallazgos = hallazgos.concat(validarV67(registro));
    }

    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V68')) {
      hallazgos = hallazgos.concat(validarV68(registro));
    }

    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V69')) {
      hallazgos = hallazgos.concat(validarV69(registro));
    }

    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V70')) {
      hallazgos = hallazgos.concat(validarV70(registro));
    }

    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V71')) {
      hallazgos = hallazgos.concat(validarV71(registro));
    }

    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V72')) {
      hallazgos = hallazgos.concat(validarV72(registro));
    }

    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V73')) {
      hallazgos = hallazgos.concat(validarV73(registro));
    }

    // V74. Cirugías curativas o paliativas durante el periodo
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V74')) {
      hallazgos = hallazgos.concat(validarV74(registro));
    }

    // V75. Número de cirugías durante el periodo de reporte
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V75')) {
      hallazgos = hallazgos.concat(validarV75(registro));
    }

    // V76. Fecha de realización de la primera cirugía
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V76')) {
      hallazgos = hallazgos.concat(validarV76(registro));
    }

    // V77. Código de la IPS que realizó la primera cirugía
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V77')) {
      hallazgos = hallazgos.concat(validarV77(registro));
    }

    return hallazgos;
  }

  window.CACModulo15 = {
    version: VERSION,
    validar,
    validarV66,
    validarV66_1,
    validarV66_2,
    validarV66_3,
    validarV66_4,
    validarV66_5,
    validarV66_6,
    validarV66_7,
    validarV66_8,
    validarV66_9,
    validarV67,
    validarV68,
    validarV69,
    validarV70,
    validarV71,
    validarV72,
    validarV73,
    validarV74,
    validarV75,
    validarV76,
    validarV77
  };
})();
