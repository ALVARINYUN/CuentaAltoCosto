(function () {
  'use strict';

  const VERSION = 'sprint-3k-v80-fecha-ultima-cirugia-reintervencion-01';

  function texto(valor) {
    if (window.CACTipos && typeof window.CACTipos.texto === 'function') {
      return window.CACTipos.texto(valor);
    }

    return String(valor ?? '').trim();
  }

  function quitarTildes(valor) {
    return texto(valor).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function normalizarCodigo(valor) {
    const codigo = texto(valor)
      .toUpperCase()
      .replace(/\s+/g, '')
      .replace(/\./g, '')
      .replace(/-/g, '')
      .trim();

    if (/^\d+$/.test(codigo) && codigo.length > 1 && codigo.length < 6 && !['96', '98', '99'].includes(codigo)) {
      return codigo.padStart(6, '0');
    }

    return codigo;
  }

  function estaVacio(valor) {
    return texto(valor) === '';
  }

  function nombreVariable(variable) {
    const nombres = {
      V17: 'Código CIE-10 de la neoplasia maligna reportada',
      V23: 'Fecha de recolección de muestra para estudio histopatológico',
      V74: 'Cirugías curativas o paliativas durante el periodo',
      V75: 'Número de cirugías durante el periodo de reporte actual',
      V76: 'Fecha de realización de la primera cirugía en el periodo',
      V77: 'Código de la IPS que realizó la primera cirugía',
      V78: 'Código CUPS de primera cirugía',
      V79: 'Ubicación temporal de esta primera cirugía en relación al manejo oncológico',
      V80: 'Fecha de realización de la última cirugía o cirugía de reintervención',
      CUPS: 'Catálogo CUPS cirugía'
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

  function describirValorV74(valor) {
    const codigo = normalizarCodigo(valor);
    if (codigo === '1') return 'V74=1 indica que sí recibió al menos una cirugía durante el periodo.';
    if (codigo === '2') return 'V74=2 indica que no recibió cirugía.';
    if (!codigo) return 'V74 está vacía.';
    return `V74 tiene el valor ${codigo}.`;
  }

  function describirValorV75(valor) {
    const codigo = normalizarCodigo(valor);
    if (codigo === '98') return 'V75=98 indica No aplica porque no recibió cirugía.';
    if (/^\d+$/.test(codigo)) return `V75=${codigo} registra el número de cirugías o tiempos quirúrgicos.`;
    if (!codigo) return 'V75 está vacía.';
    return `V75 tiene el valor ${texto(valor)}.`;
  }

  function describirValorV76(valor) {
    const codigo = texto(valor);
    if (codigo === '1845-01-01') return 'V76=1845-01-01 indica No aplica.';
    if (/^\d{4}-\d{2}-\d{2}$/.test(codigo)) return `V76=${codigo} registra una fecha real de primera cirugía.`;
    if (!codigo) return 'V76 está vacía.';
    return `V76 tiene el valor ${codigo}.`;
  }

  function describirValorV77(valor) {
    const codigo = normalizarCodigo(valor);
    if (codigo === '96') return 'V77=96 indica cirugía fuera del país.';
    if (codigo === '98') return 'V77=98 indica No aplica.';
    if (/^\d{12}$/.test(codigo)) return `V77=${codigo} registra un código REPS de 12 dígitos.`;
    if (!codigo) return 'V77 está vacía.';
    return `V77 tiene el valor ${texto(valor)}.`;
  }

  function descripcionCatalogo(encontrado) {
    if (!encontrado) return '';
    if (encontrado.descripcion) return encontrado.descripcion;
    const datoCatalogo = encontrado.dato || encontrado.original;
    if (!datoCatalogo || typeof datoCatalogo !== 'object') return '';

    if (Array.isArray(datoCatalogo.descripciones) && datoCatalogo.descripciones.length > 0) {
      return datoCatalogo.descripciones.filter(Boolean).join(' | ');
    }

    return texto(datoCatalogo.descripcion || datoCatalogo.DESCRIPCION || datoCatalogo.nombre || datoCatalogo.NOMBRE);
  }

  function describirValorV78(valor, cupsEncontrado = null) {
    const codigo = normalizarCodigo(valor);
    const descripcion = descripcionCatalogo(cupsEncontrado);
    if (codigo === '98') return 'V78=98 indica No aplica.';
    if (!codigo) return 'V78 está vacía.';
    if (descripcion) return `V78=${codigo} fue encontrado en CUPS cirugía: ${descripcion}.`;
    return `V78 tiene el código ${codigo}.`;
  }

  function describirValorV79(valor) {
    const codigo = normalizarCodigo(valor);
    if (codigo === '1') return 'V79=1 indica que la cirugía fue parte del manejo inicial para el cáncer.';
    if (codigo === '5') return 'V79=5 indica manejo de recaída.';
    if (codigo === '6') return 'V79=6 indica manejo de enfermedad metastásica.';
    if (codigo === '98') return 'V79=98 indica No aplica.';
    if (!codigo) return 'V79 está vacía.';
    return `V79 tiene el valor ${texto(valor)}.`;
  }

  function describirValorV80(valor) {
    const fecha = texto(valor);
    if (fecha === '1845-01-01') return 'V80=1845-01-01 indica No aplica porque sólo hubo una intervención o no hubo cirugías en el periodo.';
    if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return `V80=${fecha} registra fecha de última cirugía o reintervención.`;
    if (!fecha) return 'V80 está vacía.';
    return `V80 tiene el valor ${fecha}.`;
  }

  function esFechaISO(valor) {
    return /^\d{4}-\d{2}-\d{2}$/.test(texto(valor));
  }

  function parseFechaISO(valor) {
    const fechaTexto = texto(valor);
    if (!esFechaISO(fechaTexto)) return null;

    const [anio, mes, dia] = fechaTexto.split('-').map(Number);
    const fecha = new Date(Date.UTC(anio, mes - 1, dia));

    if (
      fecha.getUTCFullYear() !== anio ||
      fecha.getUTCMonth() !== mes - 1 ||
      fecha.getUTCDate() !== dia
    ) {
      return null;
    }

    return fecha;
  }

  function numeroEnteroPositivo(valor) {
    const codigo = normalizarCodigo(valor);
    if (!/^\d+$/.test(codigo)) return null;
    const numero = Number(codigo);
    return Number.isFinite(numero) ? numero : null;
  }

  function tieneAparienciaCups(valor) {
    const codigo = normalizarCodigo(valor);
    if (codigo === '98') return false;
    if (['0', '00', '96', '99'].includes(codigo)) return false;
    return /^\d{6}$/.test(codigo);
  }

  function esObjeto(valor) {
    return valor && typeof valor === 'object';
  }

  function esCatalogoCupsOperativo(valor) {
    return esObjeto(valor) && (
      Array.isArray(valor?.grupos?.cirugia?.codigos) ||
      esObjeto(valor?.datos)
    );
  }

  function agregarCatalogoSiAplica(lista, valor, visitados) {
    if (!esObjeto(valor) || visitados.has(valor)) return;
    visitados.add(valor);

    if (esCatalogoCupsOperativo(valor)) {
      lista.push(valor);
      return;
    }

    const hijos = [
      valor.CATALOGO,
      valor.catalogo,
      valor.Catalogo,
      valor.data,
      valor.datos,
      valor.cups,
      valor.CUPS
    ];

    hijos.forEach((hijo) => {
      if (esObjeto(hijo) && esCatalogoCupsOperativo(hijo)) {
        agregarCatalogoSiAplica(lista, hijo, visitados);
      }
    });
  }

  function obtenerCatalogosCupsOperativos() {
    const catalogos = [];
    const visitados = new Set();

    const candidatos = [
      window.CACCatalogoCUPS,
      window.CACCatalogoCups,
      window.CACCatalogosCUPS,
      window.CAC_CUPS,
      window.CAC_Catalogo_CUPS,
      window.CAC_CUPS_CATALOGO,
      window.CACCups,
      window.CACCUPS,
      window.CUPS,
      window.CATALOGO_CUPS,
      window.CatalogoCUPS,
      window.CatalogosCUPS,
      window.cupsCatalogo,
      window.CACCatalogos?.cups,
      window.CACCatalogos?.CUPS,
      window.CatalogosCAC?.cups,
      window.CatalogosCAC?.CUPS,
      window.catalogosCAC?.cups,
      window.catalogosCAC?.CUPS
    ];

    candidatos.forEach((candidato) => agregarCatalogoSiAplica(catalogos, candidato, visitados));

    Object.keys(window)
      .filter((clave) => clave.toLowerCase().includes('cups'))
      .forEach((clave) => {
        try {
          agregarCatalogoSiAplica(catalogos, window[clave], visitados);
        } catch (error) {
          // Algunas propiedades globales pueden no ser accesibles. Se ignoran.
        }
      });

    return catalogos;
  }

  function obtenerDatoCatalogo(catalogo, codigo) {
    if (!esObjeto(catalogo?.datos)) return null;

    if (catalogo.datos[codigo]) return catalogo.datos[codigo];

    const claveNormalizada = Object.keys(catalogo.datos).find((clave) => normalizarCodigo(clave) === codigo);
    return claveNormalizada ? catalogo.datos[claveNormalizada] : null;
  }

  function datoAplicaCirugiaV78(datoCatalogo) {
    if (!esObjeto(datoCatalogo)) return false;

    const grupos = Array.isArray(datoCatalogo.grupos) ? datoCatalogo.grupos : [];
    const variablesAplica = Array.isArray(datoCatalogo.variables_aplica) ? datoCatalogo.variables_aplica : [];

    return grupos.includes('cirugia') && variablesAplica.includes('V78');
  }

  function buscarCupsCirugia(codigo) {
    const catalogos = obtenerCatalogosCupsOperativos();
    let catalogoDisponible = false;
    let existeEnCatalogoGeneral = false;

    for (const catalogo of catalogos) {
      const codigosCirugia = Array.isArray(catalogo?.grupos?.cirugia?.codigos)
        ? catalogo.grupos.cirugia.codigos.map((item) => normalizarCodigo(item))
        : [];

      if (codigosCirugia.length > 0) catalogoDisponible = true;

      const estaEnGrupoCirugia = codigosCirugia.includes(codigo);
      const datoCatalogo = obtenerDatoCatalogo(catalogo, codigo);
      if (datoCatalogo) existeEnCatalogoGeneral = true;

      const aplicaDato = datoCatalogo ? datoAplicaCirugiaV78(datoCatalogo) : true;

      if (estaEnGrupoCirugia && aplicaDato) {
        return {
          disponible: true,
          encontrado: {
            codigo,
            descripcion: descripcionCatalogo({ dato: datoCatalogo }),
            dato: datoCatalogo,
            catalogo
          },
          existeEnCatalogoGeneral
        };
      }
    }

    return {
      disponible: catalogoDisponible,
      encontrado: null,
      existeEnCatalogoGeneral
    };
  }

  function descripcionContieneProcedimientoEspecial(encontrado) {
    const datoCatalogo = encontrado?.dato || encontrado?.original || null;
    const descripciones = [];

    if (encontrado?.descripcion) descripciones.push(encontrado.descripcion);
    if (datoCatalogo?.descripcion) descripciones.push(datoCatalogo.descripcion);
    if (Array.isArray(datoCatalogo?.descripciones)) descripciones.push(...datoCatalogo.descripciones);

    const textoDescripcion = quitarTildes(descripciones.join(' ')).toLowerCase();
    return ['fotoféresis', 'fototerapia', 'crioterapia', 'radiofrecuencia']
      .map((palabra) => quitarTildes(palabra).toLowerCase())
      .some((palabra) => textoDescripcion.includes(palabra));
  }

  // ============================================================
  // V78. Código de primera cirugía en este periodo de reporte
  // ============================================================
  function validarV78(registro) {
    const hallazgos = [];
    const variable = 'V78';
    const valorOriginal = registro?.V78;
    const valor = normalizarCodigo(valorOriginal);
    const v74 = normalizarCodigo(registro?.V74);

    const resultadoCatalogo = valor && valor !== '98' && tieneAparienciaCups(valorOriginal)
      ? buscarCupsCirugia(valor)
      : { disponible: true, encontrado: null, existeEnCatalogoGeneral: false };

    const datosBase = [
      dato('V74', registro?.V74, describirValorV74(registro?.V74)),
      dato('V75', registro?.V75, describirValorV75(registro?.V75)),
      dato('V76', registro?.V76, describirValorV76(registro?.V76)),
      dato('V77', registro?.V77, describirValorV77(registro?.V77)),
      dato('V78', valorOriginal, describirValorV78(valorOriginal, resultadoCatalogo.encontrado))
    ];

    if (estaVacio(valorOriginal)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V78-ERROR-001',
        variable,
        severidad: 'error',
        titulo: 'V78 está vacía',
        mensaje: 'V78 está vacía. Debe registrar el código CUPS de la primera cirugía o 98 si no aplica.',
        regla: 'El instructivo de V78 exige registrar el código de procedimiento CUPS de la primera cirugía o 98 cuando no aplica.',
        recomendacion: 'Registre el CUPS de la primera cirugía o 98 si V74=2.',
        valor: valorOriginal,
        datosRelacionados: datosBase,
        columnasCorregir: ['V78']
      }));
      return hallazgos;
    }

    if (valor !== '98' && !tieneAparienciaCups(valorOriginal)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V78-ERROR-002',
        variable,
        severidad: 'error',
        titulo: 'V78 tiene formato inválido',
        mensaje: `V78 tiene el valor ${texto(valorOriginal)}, pero debe ser un código CUPS de 6 dígitos del grupo cirugía o 98.`,
        regla: 'V78 permite 98 o código CUPS válido de cirugía. No acepta texto libre, 0, 96, 99 ni otros valores no compatibles.',
        recomendacion: 'Corrija V78. Use el CUPS disponible en SISCAC para cirugía o 98 si V74=2.',
        valor: valorOriginal,
        datosRelacionados: datosBase,
        columnasCorregir: ['V78']
      }));
      return hallazgos;
    }

    if (v74 === '1' && valor === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V78-ERROR-003',
        variable,
        severidad: 'error',
        titulo: 'V74=1, pero V78 está en No aplica',
        mensaje: 'V74=1 indica que el usuario sí recibió cirugía. En ese caso V78 debe registrar el CUPS de la primera cirugía.',
        regla: '98 está permitido en V78 solo cuando el código de primera cirugía no aplica porque no hubo cirugía.',
        recomendacion: 'Registre el CUPS de la primera cirugía o revise V74 si realmente no recibió cirugía.',
        valor: valorOriginal,
        datosRelacionados: datosBase,
        columnasCorregir: ['V74', 'V78']
      }));
    }

    if (v74 === '2' && valor !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V78-ERROR-004',
        variable,
        severidad: 'error',
        titulo: 'V74=2, pero V78 registra CUPS',
        mensaje: 'V74=2 indica que no recibió cirugía. En ese caso V78 debe ser 98.',
        regla: 'Si no recibió cirugía en V74, el código CUPS de primera cirugía no aplica.',
        recomendacion: 'Corrija V78 a 98 o revise V74 si el usuario sí recibió cirugía.',
        valor: valorOriginal,
        datosRelacionados: datosBase,
        columnasCorregir: ['V74', 'V78']
      }));
    }

    if (valor !== '98' && tieneAparienciaCups(valorOriginal) && !resultadoCatalogo.encontrado) {
      const mensajeCatalogo = resultadoCatalogo.existeEnCatalogoGeneral
        ? `V78=${valor} existe en el catálogo general, pero no pertenece al grupo CUPS CIRUGÍA aplicable a V78.`
        : `V78=${valor} no existe en el grupo CUPS CIRUGÍA aplicable a V78.`;

      hallazgos.push(crearHallazgo({
        codigo: 'V78-ERROR-005',
        variable,
        severidad: 'error',
        titulo: 'V78 no existe en CUPS cirugía',
        mensaje: mensajeCatalogo,
        regla: 'V78 debe validarse contra CATALOGO.grupos.cirugia.codigos y aplicar para V78. Los CUPS de radioterapia no son válidos para esta variable.',
        recomendacion: 'Verifique el CUPS en SISCAC y asegúrese de usar un código del grupo cirugía.',
        valor: valorOriginal,
        datosRelacionados: datosBase.concat([
          dato('CUPS', valor, resultadoCatalogo.existeEnCatalogoGeneral
            ? 'Código encontrado fuera del grupo cirugía o sin aplicación V78.'
            : 'Código no encontrado en CUPS cirugía.')
        ]),
        columnasCorregir: ['V78']
      }));
    }

    if (v74 === '1' && valor !== '98' && resultadoCatalogo.encontrado) {
      hallazgos.push(crearHallazgo({
        codigo: 'V78-ADVERTENCIA-001',
        variable,
        severidad: 'advertencia',
        titulo: 'V78 tiene CUPS válido; verificar pertinencia quirúrgica',
        mensaje: 'V78 tiene CUPS válido de cirugía. Verifique que corresponda al procedimiento con mayor relación con el manejo del cáncer o mayor complejidad dentro de la cirugía.',
        regla: 'El instructivo recomienda usar el CUPS más representativo frente al manejo del cáncer o el de mayor complejidad.',
        recomendacion: 'Revise contra la historia clínica y el procedimiento quirúrgico principal.',
        valor: valorOriginal,
        datosRelacionados: datosBase.concat([dato('CUPS', valor, descripcionCatalogo(resultadoCatalogo.encontrado) || 'Código encontrado en CUPS cirugía')]),
        columnasCorregir: ['V78']
      }));
    }

    if (v74 === '1' && valor !== '98' && resultadoCatalogo.encontrado && descripcionContieneProcedimientoEspecial(resultadoCatalogo.encontrado)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V78-ADVERTENCIA-002',
        variable,
        severidad: 'advertencia',
        titulo: 'V78 corresponde a procedimiento especial reportable',
        mensaje: 'V78 corresponde o puede corresponder a fotoféresis, fototerapia, crioterapia o radiofrecuencia. Verifique que esté reportado en V74 y cuantificado en V75.',
        regla: 'El instructivo aclara que estos procedimientos se reportan con CUPS en V78, se tienen en cuenta en V74 y se cuantifican en V75.',
        recomendacion: 'Revise V74, V75 y el soporte clínico del procedimiento.',
        valor: valorOriginal,
        datosRelacionados: datosBase.concat([dato('CUPS', valor, descripcionCatalogo(resultadoCatalogo.encontrado) || 'Código encontrado en CUPS cirugía')]),
        columnasCorregir: ['V74', 'V75', 'V78']
      }));
    }

    return hallazgos;
  }


  // ============================================================
  // V79. Ubicación temporal de esta primera cirugía en relación al manejo oncológico
  // ============================================================
  function validarV79(registro) {
    const hallazgos = [];
    const variable = 'V79';
    const valorOriginal = registro?.V79;
    const valor = normalizarCodigo(valorOriginal);
    const v74 = normalizarCodigo(registro?.V74);
    const permitidos = ['1', '5', '6', '98'];

    const datosBase = [
      dato('V74', registro?.V74, describirValorV74(registro?.V74)),
      dato('V75', registro?.V75, describirValorV75(registro?.V75)),
      dato('V76', registro?.V76, describirValorV76(registro?.V76)),
      dato('V77', registro?.V77, describirValorV77(registro?.V77)),
      dato('V78', registro?.V78, describirValorV78(registro?.V78)),
      dato('V79', valorOriginal, describirValorV79(valorOriginal))
    ];

    if (estaVacio(valorOriginal)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V79-ERROR-001',
        variable,
        severidad: 'error',
        titulo: 'V79 está vacía',
        mensaje: 'V79 está vacía. Debe registrar 1, 5, 6 o 98 según la ubicación temporal de la primera cirugía.',
        regla: 'El instructivo de V79 exige clasificar la primera cirugía como manejo inicial, recaída, enfermedad metastásica o 98 cuando no aplica.',
        recomendacion: 'Registre 1, 5 o 6 si V74=1. Registre 98 si V74=2.',
        valor: valorOriginal,
        datosRelacionados: datosBase,
        columnasCorregir: ['V79']
      }));
      return hallazgos;
    }

    if (!permitidos.includes(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V79-ERROR-002',
        variable,
        severidad: 'error',
        titulo: 'V79 tiene un valor fuera del catálogo permitido',
        mensaje: `V79 tiene el valor ${texto(valorOriginal)}, pero los valores válidos son 1, 5, 6 y 98.`,
        regla: 'V79 solo permite 1, 5, 6 o 98 según el instructivo.',
        recomendacion: 'Corrija V79 con un valor permitido: 1 manejo inicial, 5 recaída, 6 enfermedad metastásica o 98 no aplica.',
        valor: valorOriginal,
        datosRelacionados: datosBase,
        columnasCorregir: ['V79']
      }));
      return hallazgos;
    }

    if (v74 === '1' && valor === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V79-ERROR-003',
        variable,
        severidad: 'error',
        titulo: 'V74=1, pero V79 está en No aplica',
        mensaje: 'V74=1 indica que el usuario sí recibió cirugía. En ese caso V79 debe ser 1, 5 o 6, no 98.',
        regla: '98 en V79 aplica únicamente cuando no hubo cirugía y V74=2.',
        recomendacion: 'Registre 1 si fue manejo inicial, 5 si fue manejo de recaída o 6 si fue manejo de enfermedad metastásica. Revise V74 si realmente no hubo cirugía.',
        valor: valorOriginal,
        datosRelacionados: datosBase,
        columnasCorregir: ['V74', 'V79']
      }));
    }

    if (v74 === '2' && valor !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V79-ERROR-004',
        variable,
        severidad: 'error',
        titulo: 'V74=2, pero V79 clasifica una cirugía',
        mensaje: 'V74=2 indica que el usuario no recibió cirugía. En ese caso V79 debe ser 98.',
        regla: 'Si no recibió cirugía en V74, la ubicación temporal oncológica de la primera cirugía no aplica.',
        recomendacion: 'Corrija V79 a 98 o revise V74 si el usuario sí recibió cirugía.',
        valor: valorOriginal,
        datosRelacionados: datosBase,
        columnasCorregir: ['V74', 'V79']
      }));
    }

    if (v74 === '1' && ['5', '6'].includes(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V79-ADVERTENCIA-001',
        variable,
        severidad: 'advertencia',
        titulo: 'V79 indica recaída o enfermedad metastásica',
        mensaje: 'V79 indica manejo de recaída o enfermedad metastásica. Verifique que exista soporte clínico para esta ubicación temporal de la cirugía.',
        regla: 'El instructivo permite registrar 5 o 6, pero la clasificación debe estar sustentada en la historia clínica.',
        recomendacion: 'Revise el soporte clínico de recaída o enfermedad metastásica y la coherencia documental de la primera cirugía.',
        valor: valorOriginal,
        datosRelacionados: datosBase,
        columnasCorregir: ['V79']
      }));
    }

    return hallazgos;
  }


  // ============================================================
  // V80. Fecha de realización de la última cirugía o cirugía de reintervención en este periodo de reporte
  // ============================================================
  function validarV80(registro) {
    const hallazgos = [];
    const variable = 'V80';
    const valorOriginal = registro?.V80;
    const valor = texto(valorOriginal);
    const v74 = normalizarCodigo(registro?.V74);
    const v75 = normalizarCodigo(registro?.V75);
    const numeroV75 = numeroEnteroPositivo(registro?.V75);
    const fechaNoAplica = '1845-01-01';

    const datosBase = [
      dato('V74', registro?.V74, describirValorV74(registro?.V74)),
      dato('V75', registro?.V75, describirValorV75(registro?.V75)),
      dato('V76', registro?.V76, describirValorV76(registro?.V76)),
      dato('V77', registro?.V77, describirValorV77(registro?.V77)),
      dato('V78', registro?.V78, describirValorV78(registro?.V78)),
      dato('V79', registro?.V79, describirValorV79(registro?.V79)),
      dato('V80', valorOriginal, describirValorV80(valorOriginal))
    ];

    if (estaVacio(valorOriginal)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V80-ERROR-001',
        variable,
        severidad: 'error',
        titulo: 'V80 está vacía',
        mensaje: 'V80 está vacía. Debe registrar la fecha de la última cirugía en formato AAAA-MM-DD o 1845-01-01 si no aplica.',
        regla: 'El instructivo de V80 exige registrar la fecha de la última cirugía o cirugía de reintervención, o 1845-01-01 cuando no aplica.',
        recomendacion: 'Registre una fecha válida en formato AAAA-MM-DD. Use 1845-01-01 si sólo hubo una intervención o si no hubo cirugías en el periodo.',
        valor: valorOriginal,
        datosRelacionados: datosBase,
        columnasCorregir: ['V80']
      }));
      return hallazgos;
    }

    if (!esFechaISO(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V80-ERROR-002',
        variable,
        severidad: 'error',
        titulo: 'V80 tiene formato inválido',
        mensaje: 'V80 tiene formato inválido. Debe registrarse en formato AAAA-MM-DD o usar 1845-01-01 si no aplica.',
        regla: 'V80 debe registrarse como fecha en formato AAAA-MM-DD. Si se conoce sólo año y mes, el instructivo indica registrar el día 15.',
        recomendacion: 'Corrija la fecha al formato AAAA-MM-DD. Ejemplo: 2025-06-15.',
        valor: valorOriginal,
        datosRelacionados: datosBase,
        columnasCorregir: ['V80']
      }));
      return hallazgos;
    }

    const fechaV80 = parseFechaISO(valor);
    const fechaV76 = parseFechaISO(registro?.V76);

    if (!fechaV80) {
      hallazgos.push(crearHallazgo({
        codigo: 'V80-ERROR-003',
        variable,
        severidad: 'error',
        titulo: 'V80 contiene una fecha inexistente',
        mensaje: 'V80 contiene una fecha inexistente. Verifique que la fecha sea válida en formato AAAA-MM-DD.',
        regla: 'V80 debe ser una fecha real del calendario o el comodín 1845-01-01.',
        recomendacion: 'Corrija la fecha. Si sólo conoce año y mes, registre el día 15.',
        valor: valorOriginal,
        datosRelacionados: datosBase,
        columnasCorregir: ['V80']
      }));
      return hallazgos;
    }

    if (v74 === '2' && valor !== fechaNoAplica) {
      hallazgos.push(crearHallazgo({
        codigo: 'V80-ERROR-004',
        variable,
        severidad: 'error',
        titulo: 'V74=2, pero V80 registra una fecha real',
        mensaje: 'V74=2 indica que no hubo cirugía en este periodo. En ese caso V80 debe ser 1845-01-01.',
        regla: 'Si no hubo cirugía en V74, la fecha de última cirugía o reintervención no aplica.',
        recomendacion: 'Corrija V80 a 1845-01-01 o revise V74 si el usuario sí recibió cirugía.',
        valor: valorOriginal,
        datosRelacionados: datosBase,
        columnasCorregir: ['V74', 'V80']
      }));
      return hallazgos;
    }

    if (v75 === '1' && valor !== fechaNoAplica) {
      hallazgos.push(crearHallazgo({
        codigo: 'V80-ERROR-005',
        variable,
        severidad: 'error',
        titulo: 'V75=1, pero V80 registra última cirugía',
        mensaje: 'V75=1 indica que sólo hubo una intervención. En ese caso V80 no aplica y debe ser 1845-01-01.',
        regla: 'El instructivo de V80 indica que 1845-01-01 aplica cuando sólo hubo una intervención en este periodo.',
        recomendacion: 'Corrija V80 a 1845-01-01 o revise V75 si hubo más de una intervención.',
        valor: valorOriginal,
        datosRelacionados: datosBase,
        columnasCorregir: ['V75', 'V80']
      }));
      return hallazgos;
    }

    if (v74 === '1' && Number.isFinite(numeroV75) && numeroV75 > 1 && valor === fechaNoAplica) {
      hallazgos.push(crearHallazgo({
        codigo: 'V80-ERROR-006',
        variable,
        severidad: 'error',
        titulo: 'Hubo más de una intervención, pero V80 está en No aplica',
        mensaje: 'V74=1 y V75 es mayor que 1 indican más de una intervención. En ese caso V80 debe registrar la fecha de la última cirugía o reintervención.',
        regla: 'Si hubo más de una cirugía o tiempo quirúrgico, V80 debe contener una fecha real de última cirugía o reintervención.',
        recomendacion: 'Registre la fecha de la última cirugía o reintervención en formato AAAA-MM-DD.',
        valor: valorOriginal,
        datosRelacionados: datosBase,
        columnasCorregir: ['V75', 'V80']
      }));
      return hallazgos;
    }

    if (valor !== fechaNoAplica && fechaV76 && fechaV80.getTime() < fechaV76.getTime()) {
      hallazgos.push(crearHallazgo({
        codigo: 'V80-ERROR-007',
        variable,
        severidad: 'error',
        titulo: 'V80 es anterior a V76',
        mensaje: 'V80 no puede ser anterior a V76. La fecha de última cirugía o reintervención debe ser igual o posterior a la primera cirugía.',
        regla: 'La última cirugía o reintervención no puede ocurrir antes de la primera cirugía del periodo.',
        recomendacion: 'Revise V76 y V80 contra el soporte quirúrgico.',
        valor: valorOriginal,
        datosRelacionados: datosBase,
        columnasCorregir: ['V76', 'V80']
      }));
      return hallazgos;
    }

    if (
      v74 === '1' &&
      Number.isFinite(numeroV75) &&
      numeroV75 > 1 &&
      valor !== fechaNoAplica &&
      fechaV76 &&
      fechaV80.getTime() === fechaV76.getTime()
    ) {
      hallazgos.push(crearHallazgo({
        codigo: 'V80-ADVERTENCIA-001',
        variable,
        severidad: 'advertencia',
        titulo: 'V80 coincide con V76',
        mensaje: 'V80 coincide con V76. Verifique que no se esté reportando nuevamente el evento quirúrgico denominado primera cirugía de este periodo.',
        regla: 'El instructivo aclara que se debe validar que no se reporten datos del evento quirúrgico denominado como primera cirugía de este periodo.',
        recomendacion: 'Revise si V80 corresponde realmente a una reintervención o última cirugía, y no a la primera cirugía ya registrada en V76.',
        valor: valorOriginal,
        datosRelacionados: datosBase,
        columnasCorregir: ['V76', 'V80']
      }));
    }

    return hallazgos;
  }

  function validar(registro) {
    let hallazgos = [];

    // V78. Código de primera cirugía en este periodo de reporte
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V78')) {
      hallazgos = hallazgos.concat(validarV78(registro));
    }

    // V79. Ubicación temporal de esta primera cirugía en relación al manejo oncológico
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V79')) {
      hallazgos = hallazgos.concat(validarV79(registro));
    }

    // V80. Fecha de realización de la última cirugía o cirugía de reintervención en este periodo de reporte
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V80')) {
      hallazgos = hallazgos.concat(validarV80(registro));
    }

    return hallazgos;
  }

  window.CACModulo16 = {
    version: VERSION,
    validar,
    validarV78,
    validarV79,
    validarV80
  };
})();
