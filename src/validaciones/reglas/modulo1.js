//v1-v16

(function () {
  'use strict';

  function obtenerFechaActualISO() {
    const ahora = new Date();
    const yyyy = ahora.getFullYear();
    const mm = String(ahora.getMonth() + 1).padStart(2, '0');
    const dd = String(ahora.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  const FECHA_REFERENCIA_VALIDACION = obtenerFechaActualISO();

  const NOMBRES_VARIABLES = {
    V1: 'Primer nombre',
    V2: 'Segundo nombre',
    V3: 'Primer apellido',
    V4: 'Segundo apellido',
    V5: 'Tipo de identificación',
    V6: 'Número de identificación',
    V7: 'Fecha de nacimiento',
    V8: 'Sexo',
    V9: 'Ocupación',
    V10: 'Régimen de afiliación',
    V11: 'Código de la EPS',
    V12: 'Pertenencia étnica',
    V13: 'Grupo poblacional',
    V14: 'Municipio de residencia',
    V15: 'Número telefónico',
    V16: 'Fecha de afiliación'
  };

  const TIPOS_IDENTIFICACION = [
    'CC', 'CE', 'CD', 'PA', 'SC', 'PT', 'PE',
    'RC', 'TI', 'CN', 'AS', 'MS', 'DE', 'SI'
  ];

  const TIPOS_NUMERICOS = ['CC', 'CE', 'TI', 'RC'];

  const REGIMENES = ['C', 'S', 'P', 'E', 'N', 'I'];

  const SEXOS = ['M', 'F'];

  const PERTENENCIA_ETNICA = ['1', '2', '3', '4', '5', '6'];

  const GRUPOS_POBLACIONALES = [
    '1', '2', '3', '4', '5', '6', '7', '8',
    '9', '10', '11', '12', '13', '14', '15', '16',
    '31', '32', '33', '34', '35', '36', '37', '38', '39',
    '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60',
    '61', '62', '63'
  ];

  const CATALOGO_PERTENENCIA_ETNICA = {
    '1': 'Indígena',
    '2': 'ROM (gitano)',
    '3': 'Raizal del archipiélago de San Andrés y Providencia',
    '4': 'Palenquero de San Basilio',
    '5': 'Negro(a), mulato(a), afrocolombiano(a) o afrodescendiente',
    '6': 'Ninguna de las anteriores'
  };

  const CATALOGO_GRUPO_POBLACIONAL = {
    '1': 'Indigentes',
    '2': 'Población infantil a cargo del ICBF',
    '3': 'Madres comunitarias',
    '4': 'Artistas, autores, compositores',
    '5': 'Otro grupo poblacional',
    '6': 'Recién nacidos',
    '7': 'Persona en situación de discapacidad',
    '8': 'Desmovilizados',
    '9': 'Desplazados',
    '10': 'Población ROM',
    '11': 'Población raizal',
    '12': 'Población en centros psiquiátricos',
    '13': 'Migratorio',
    '14': 'Población en centros carcelarios',
    '15': 'Población rural no migratoria',
    '16': 'Afrocolombiano',
    '31': 'Adulto mayor',
    '32': 'Cabeza de familia',
    '33': 'Mujer embarazada',
    '34': 'Mujer lactante',
    '35': 'Trabajador urbano',
    '36': 'Trabajador rural',
    '37': 'Víctima de violencia armada',
    '38': 'Jóvenes vulnerables rurales',
    '39': 'Jóvenes vulnerables urbanos',
    '50': 'Persona en situación de discapacidad del sistema nervioso',
    '51': 'Persona en situación de discapacidad de los ojos',
    '52': 'Persona en situación de discapacidad de los oídos',
    '53': 'Persona en situación de discapacidad de los demás órganos de los sentidos',
    '54': 'Persona en situación de discapacidad de la voz y el habla',
    '55': 'Persona en situación de discapacidad del sistema cardiorrespiratorio y las defensas',
    '56': 'Persona en situación de discapacidad de la digestión, el metabolismo, las hormonas',
    '57': 'Persona en situación de discapacidad del sistema genital y reproductivo',
    '58': 'Persona en situación de discapacidad del movimiento del cuerpo, manos, brazos, piernas',
    '59': 'Persona en situación de discapacidad de la piel',
    '60': 'Persona en situación de discapacidad de otro tipo',
    '61': 'No definido',
    '62': 'Comunidad indígena',
    '63': 'Población migrante de la República Bolivariana de Venezuela'
  };

  function descripcionCatalogo(catalogo) {
    return Object.entries(catalogo)
      .map(([codigo, descripcion]) => `${codigo}: ${descripcion}`)
      .join('; ');
  }

  const TEXTO_CATALOGO_PERTENENCIA_ETNICA = descripcionCatalogo(CATALOGO_PERTENENCIA_ETNICA);
  const TEXTO_CATALOGO_GRUPO_POBLACIONAL = descripcionCatalogo(CATALOGO_GRUPO_POBLACIONAL);

  function nombreVariable(variable) {
    return NOMBRES_VARIABLES[variable] || variable;
  }

  function dato(registro, variable, nota = '') {
    return CACTipos.crearDatoRelacionado(
      variable,
      nombreVariable(variable),
      CACTipos.texto(registro[variable]),
      nota
    );
  }

  function datoCalculado(nombre, valor, nota = '') {
    return {
      variable: '',
      nombre,
      valor: String(valor ?? ''),
      nota
    };
  }

  function normalizarEncabezadoCAC(encabezado) {
    const clave = String(encabezado ?? '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/g, '');

    const mapa = {
      v1: 'V1',
      v1primernombre: 'V1',

      v2: 'V2',
      v2segundonombre: 'V2',

      v3: 'V3',
      v3primerapellido: 'V3',

      v4: 'V4',
      v4segundoapellido: 'V4',

      v5: 'V5',
      v5tipoidentificacion: 'V5',
      v5tipodeidentificacion: 'V5',
      v5tipodeidentificacin: 'V5',

      v6: 'V6',
      v6numeroidentificacion: 'V6',
      v6numerodeidentificacion: 'V6',
      v6nmerodeidentificacin: 'V6',

      v7: 'V7',
      v7fechanacimiento: 'V7',
      v7fechadenacimiento: 'V7',

      v8: 'V8',
      v8sexo: 'V8',

      v9: 'V9',
      v9ocupacion: 'V9',
      v9ocupacin: 'V9',

      v10: 'V10',
      v10regimenafiliacionsgsss: 'V10',
      v10regimendeafiliacionsgsss: 'V10',
      v10rgimendeafiliacinalsgsss: 'V10',

      v11: 'V11',
      v11eps: 'V11',
      v11codigoeapboentidadterritorial: 'V11',

      v12: 'V12',
      v12codigopertenenciaetnica: 'V12',
      v12pertenenciaetnica: 'V12',
      v12cdigopertenenciatnica: 'V12',

      v13: 'V13',
      v13grupopoblacional: 'V13',

      v14: 'V14',
      v14municipioresidencia: 'V14',
      v14municipioderesidencia: 'V14',

      v15: 'V15',
      v15numerotelefonicodelpaciente: 'V15',
      v15numerotelefonico: 'V15',
      v15numerotelefonicodelpacienteincl: 'V15',
      v15nmerotelefnicodelpacienteincl: 'V15',

      v16: 'V16',
      v16fechadeafiliacionlaeapbalregimen: 'V16',
      v16fechadeafiliacion: 'V16',
      v16fechadeafiliacinalaeapbquerep: 'V16'
    };

    return mapa[clave] || String(encabezado ?? '').trim().toUpperCase();
  }

  function normalizarFila(encabezados, fila) {
    const registro = {};

    encabezados.forEach((encabezado, indice) => {
      const clave = normalizarEncabezadoCAC(encabezado);
      registro[clave] = CACTipos.textoOriginal(fila[indice]);
    });

    return registro;
  }

  function agregar(hallazgos, datos) {
    hallazgos.push(CACTipos.crearHallazgo(datos));
  }

  function tieneMinusculas(valor) {
    return /[a-záéíóúñü]/.test(String(valor ?? ''));
  }

  function contieneNumeros(valor) {
    return /\d/.test(String(valor ?? ''));
  }

  function contieneTildes(valor) {
    return /[ÁÉÍÓÚáéíóú]/.test(String(valor ?? ''));
  }

  function contieneEnie(valor) {
    return /[Ññ]/.test(String(valor ?? ''));
  }

  function contieneDieresis(valor) {
    return /[Üü]/.test(String(valor ?? ''));
  }

  function contieneApostrofe(valor) {
    return /['’´`]/.test(String(valor ?? ''));
  }

  function contienePunto(valor) {
    return /\./.test(String(valor ?? ''));
  }

  function contieneGuion(valor) {
    return /-/.test(String(valor ?? ''));
  }

  function contieneNumeral(valor) {
    return /#/.test(String(valor ?? ''));
  }

  function contieneEspaciosDobles(valor) {
    return /\s{2,}/.test(String(valor ?? ''));
  }

  function tieneEspaciosExtremos(valor) {
    const original = String(valor ?? '');
    return original !== original.trim();
  }

  function contieneSimbolosGenerales(valor) {
    return /[^A-Za-z0-9ÁÉÍÓÚáéíóúÑñÜü\s.'’´`#-]/.test(String(valor ?? ''));
  }

  function crearHallazgoCampoSimple({
    registro,
    variable,
    codigo,
    titulo,
    mensaje,
    regla,
    recomendacion,
    severidad = CACTipos.SEVERIDAD.ERROR
  }) {
    return {
      codigo,
      titulo,
      variable,
      valor: CACTipos.texto(registro[variable]),
      mensaje,
      regla,
      recomendacion,
      severidad,
      datosRelacionados: [dato(registro, variable)],
      columnasCorregir: [variable]
    };
  }

  function validarCampoTextoPersona({
    registro,
    variable,
    codigoBase,
    comodin = null
  }) {
    const hallazgos = [];
    const nombreCampo = nombreVariable(variable);
    const original = CACTipos.textoOriginal(registro[variable]);
    const valor = CACTipos.texto(registro[variable]);
    const valorMayuscula = valor.toUpperCase();

    const codigos = {
      V1: {
        vacio: 'V1-ERROR-001',
        minuscula: 'V1-ERROR-002',
        numeros: 'V1-ERROR-003',
        simbolos: 'V1-ERROR-004',
        punto: 'V1-ERROR-005',
        tilde: 'V1-ERROR-006',
        enie: 'V1-ERROR-007',
        dieresis: 'V1-ERROR-008',
        apostrofe: 'V1-ERROR-009',
        espaciosDobles: 'V1-ADVERTENCIA-010',
        espaciosExtremos: 'V1-ADVERTENCIA-011'
      },
      V2: {
        vacio: 'V2-ERROR-001',
        comodinFormato: 'V2-ERROR-002',
        minuscula: 'V2-ERROR-003',
        numeros: 'V2-ERROR-004',
        simbolos: 'V2-ERROR-005',
        punto: 'V2-ERROR-006',
        tilde: 'V2-ERROR-007',
        guion: 'V2-ERROR-008',
        numeral: 'V2-ERROR-009',
        espaciosDobles: 'V2-ADVERTENCIA-010',
        espaciosExtremos: 'V2-ADVERTENCIA-011'
      },
      V3: {
        vacio: 'V3-ERROR-001',
        minuscula: 'V3-ERROR-002',
        numeros: 'V3-ERROR-003',
        simbolos: 'V3-ERROR-004',
        punto: 'V3-ERROR-005',
        tilde: 'V3-ERROR-006',
        guion: 'V3-ERROR-007',
        numeral: 'V3-ERROR-008',
        espaciosDobles: 'V3-ADVERTENCIA-009',
        espaciosExtremos: 'V3-ADVERTENCIA-010'
      },
      V4: {
        vacio: 'V4-ERROR-001',
        comodinFormato: 'V4-ERROR-002',
        minuscula: 'V4-ERROR-003',
        numeros: 'V4-ERROR-004',
        simbolos: 'V4-ERROR-005',
        punto: 'V4-ERROR-006',
        tilde: 'V4-ERROR-007',
        guion: 'V4-ERROR-008',
        numeral: 'V4-ERROR-009',
        espaciosDobles: 'V4-ADVERTENCIA-010',
        espaciosExtremos: 'V4-ADVERTENCIA-011'
      }
    };

    const c = codigos[variable];

    if (CACTipos.estaVacio(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable,
        codigo: c.vacio,
        titulo: `${nombreCampo} vacío`,
        mensaje: `${nombreCampo} está vacío.`,
        regla: `${nombreCampo} es obligatorio en el reporte.`,
        recomendacion: comodin
          ? `Diligencie ${nombreCampo} o use ${comodin} si realmente no aplica.`
          : `Diligencie ${nombreCampo} en mayúscula sostenida.`
      }));
      return hallazgos;
    }

    if (comodin && valorMayuscula === comodin) {
      if (valor !== comodin) {
        agregar(hallazgos, crearHallazgoCampoSimple({
          registro,
          variable,
          codigo: c.comodinFormato,
          titulo: `${comodin} escrito incorrectamente`,
          mensaje: `${nombreCampo} usa el comodín ${comodin}, pero no está escrito exactamente en mayúscula.`,
          regla: `El comodín debe escribirse exactamente como ${comodin}.`,
          recomendacion: `Cambie el valor a ${comodin}.`
        }));
      }

      if (tieneEspaciosExtremos(original)) {
        agregar(hallazgos, crearHallazgoCampoSimple({
          registro,
          variable,
          codigo: c.espaciosExtremos,
          titulo: `${nombreCampo} con espacios al inicio o final`,
          mensaje: `${nombreCampo} tiene espacios antes o después del dato.`,
          regla: 'El valor debe ir sin espacios sobrantes.',
          recomendacion: 'Elimine espacios al inicio o al final.',
          severidad: CACTipos.SEVERIDAD.ADVERTENCIA
        }));
      }

      return hallazgos;
    }

    if (tieneMinusculas(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable,
        codigo: c.minuscula,
        titulo: `${nombreCampo} no está en mayúscula`,
        mensaje: `${nombreCampo} tiene letras en minúscula o mezcla de mayúsculas y minúsculas.`,
        regla: `${nombreCampo} debe ir en mayúscula sostenida.`,
        recomendacion: `Corrija el dato a: ${valorMayuscula}.`
      }));
    }

    if (contieneNumeros(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable,
        codigo: c.numeros,
        titulo: `${nombreCampo} contiene números`,
        mensaje: `${nombreCampo} contiene números.`,
        regla: `${nombreCampo} solo debe contener letras permitidas.`,
        recomendacion: 'Retire los números del campo.'
      }));
    }

    if (contieneSimbolosGenerales(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable,
        codigo: c.simbolos,
        titulo: `${nombreCampo} contiene símbolos`,
        mensaje: `${nombreCampo} contiene símbolos o caracteres especiales no permitidos.`,
        regla: `${nombreCampo} no debe contener símbolos.`,
        recomendacion: 'Retire símbolos o caracteres especiales.'
      }));
    }

    if (contienePunto(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable,
        codigo: c.punto,
        titulo: `${nombreCampo} contiene puntos`,
        mensaje: `${nombreCampo} contiene puntos.`,
        regla: `${nombreCampo} no debe contener puntos.`,
        recomendacion: 'Retire los puntos del campo.'
      }));
    }

    if (contieneTildes(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable,
        codigo: c.tilde,
        titulo: `${nombreCampo} contiene tildes`,
        mensaje: `${nombreCampo} contiene tildes.`,
        regla: `${nombreCampo} debe escribirse sin tildes según la regla documentada.`,
        recomendacion: 'Retire las tildes del dato.'
      }));
    }

    if (variable === 'V1' && contieneEnie(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable,
        codigo: c.enie,
        titulo: `${nombreCampo} contiene letra Ñ`,
        mensaje: `${nombreCampo} contiene la letra Ñ. Este dato debe revisarse contra BDUA o el soporte oficial del paciente.`,
        regla: 'El nombre debe registrarse como aparece en BDUA y sin caracteres que puedan generar inconsistencias en la identificación. La Ñ puede existir en nombres reales, por eso no se bloquea como error, pero sí se deja como advertencia de revisión.',
        recomendacion: 'Verifique el primer nombre contra BDUA o el documento soporte. Si la Ñ corresponde al nombre real del paciente, conserve el dato. Si fue un error de digitación o normalización, corríjalo.',
        severidad: CACTipos.SEVERIDAD.ADVERTENCIA
      }));
    }

    if (variable === 'V1' && contieneDieresis(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable,
        codigo: c.dieresis,
        titulo: `${nombreCampo} contiene diéresis`,
        mensaje: `${nombreCampo} contiene diéresis.`,
        regla: 'Según la regla documentada, V1 no debe contener diéresis.',
        recomendacion: 'Retire la diéresis del dato.'
      }));
    }

    if (variable === 'V1' && contieneApostrofe(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable,
        codigo: c.apostrofe,
        titulo: `${nombreCampo} contiene apóstrofe`,
        mensaje: `${nombreCampo} contiene apóstrofe.`,
        regla: 'Según la regla documentada, V1 no debe contener apóstrofes.',
        recomendacion: 'Retire el apóstrofe del dato.'
      }));
    }

    if (['V2', 'V3', 'V4'].includes(variable) && contieneGuion(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable,
        codigo: c.guion,
        titulo: `${nombreCampo} contiene guion`,
        mensaje: `${nombreCampo} contiene guion.`,
        regla: `${nombreCampo} no debe contener guion.`,
        recomendacion: 'Retire el guion del campo.'
      }));
    }

    if (['V2', 'V3', 'V4'].includes(variable) && contieneNumeral(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable,
        codigo: c.numeral,
        titulo: `${nombreCampo} contiene numeral`,
        mensaje: `${nombreCampo} contiene el carácter #.`,
        regla: `${nombreCampo} no debe contener el carácter numeral.`,
        recomendacion: 'Retire el carácter #.'
      }));
    }

    if (contieneEspaciosDobles(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable,
        codigo: c.espaciosDobles,
        titulo: `${nombreCampo} contiene espacios dobles`,
        mensaje: `${nombreCampo} contiene espacios dobles entre palabras.`,
        regla: 'El dato debe tener un solo espacio entre palabras.',
        recomendacion: 'Deje un solo espacio entre palabras.',
        severidad: CACTipos.SEVERIDAD.ADVERTENCIA
      }));
    }

    if (tieneEspaciosExtremos(original)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable,
        codigo: c.espaciosExtremos,
        titulo: `${nombreCampo} tiene espacios sobrantes`,
        mensaje: `${nombreCampo} tiene espacios al inicio o al final.`,
        regla: 'El dato debe ir sin espacios sobrantes.',
        recomendacion: 'Elimine espacios al inicio o al final.',
        severidad: CACTipos.SEVERIDAD.ADVERTENCIA
      }));
    }

    return hallazgos;
  }

  function validarCatalogo({ registro, variable, catalogo, codigoBase }) {
    const hallazgos = [];
    const nombreCampo = nombreVariable(variable);
    const valor = CACTipos.texto(registro[variable]);
    const valorMayuscula = valor.toUpperCase();

    if (CACTipos.estaVacio(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable,
        codigo: `${codigoBase}-ERROR-001`,
        titulo: `${nombreCampo} vacío`,
        mensaje: `${nombreCampo} está vacío.`,
        regla: `${nombreCampo} es obligatorio y debe pertenecer al catálogo permitido.`,
        recomendacion: `Use uno de estos valores: ${catalogo.join(', ')}.`
      }));
      return hallazgos;
    }

    if (valor !== valorMayuscula) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable,
        codigo: `${codigoBase}-ERROR-003`,
        titulo: `${nombreCampo} en minúscula`,
        mensaje: `${nombreCampo} debe ir en mayúscula.`,
        regla: `${nombreCampo} debe diligenciarse con el código en mayúscula.`,
        recomendacion: `Cambie el valor a ${valorMayuscula}.`
      }));
    }

    if (!catalogo.includes(valorMayuscula)) {
      agregar(hallazgos, createCatalogoInvalidoHallazgo(registro, variable, codigoBase, catalogo));
    }

    return hallazgos;
  }

  function createCatalogoInvalidoHallazgo(registro, variable, codigoBase, catalogo) {
    const nombreCampo = nombreVariable(variable);

    return crearHallazgoCampoSimple({
      registro,
      variable,
      codigo: `${codigoBase}-ERROR-002`,
      titulo: `${nombreCampo} no permitido`,
      mensaje: `${nombreCampo} tiene un valor que no pertenece al catálogo permitido.`,
      regla: `${nombreCampo} debe coincidir con uno de los códigos permitidos.`,
      recomendacion: `Revise el dato y use uno de estos valores: ${catalogo.join(', ')}.`
    });
  }

  function validarDocumento(registro) {
    const hallazgos = [];
    const tipo = CACTipos.textoMayuscula(registro.V5);
    const documento = CACTipos.texto(registro.V6);

    if (CACTipos.estaVacio(documento)) {
      const esConsecutivoInterno = ['AS', 'MS'].includes(tipo);

      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V6',
        codigo: esConsecutivoInterno ? `V6-ERROR-${tipo}-001` : 'V6-ERROR-001',
        titulo: esConsecutivoInterno
          ? `Consecutivo interno vacío para ${tipo}`
          : 'Número de identificación vacío',
        mensaje: esConsecutivoInterno
          ? `Cuando V5 es ${tipo}, V6 debe contener el consecutivo interno del afiliado.`
          : 'El número de identificación está vacío.',
        regla: esConsecutivoInterno
          ? 'Para AS y MS, V6 no corresponde a una cédula normal; corresponde al consecutivo interno del afiliado.'
          : 'V6 es obligatorio.',
        recomendacion: esConsecutivoInterno
          ? `Diligencie en V6 el consecutivo interno del afiliado registrado como ${tipo}.`
          : 'Diligencie el número de identificación según el tipo registrado en V5.'
      }));
      return hallazgos;
    }

    if (['AS', 'MS'].includes(tipo)) {
      if (!/^\d+$/.test(documento)) {
        agregar(hallazgos, {
          codigo: `V6-ERROR-${tipo}-002`,
          titulo: `Consecutivo interno de ${tipo} con formato inválido`,
          variable: 'V6',
          valor: documento,
          mensaje: `Para ${tipo}, V6 debe contener solo números. No debe tener letras, espacios ni caracteres especiales.`,
          regla: 'Para AS y MS, V6 se forma uniendo el código DANE de departamento y municipio, el año de registro y un consecutivo interno. Su longitud máxima es de 17 caracteres numéricos.',
          recomendacion: 'Corrija V6 dejando solo números, sin letras, espacios ni símbolos.',
          datosRelacionados: [
            dato(registro, 'V5'),
            dato(registro, 'V6')
          ],
          columnasCorregir: ['V5', 'V6']
        });

        return hallazgos;
      }

      if (documento.length > 17) {
        agregar(hallazgos, {
          codigo: `V6-ERROR-${tipo}-003`,
          titulo: `Consecutivo interno de ${tipo} supera 17 caracteres`,
          variable: 'V6',
          valor: documento,
          mensaje: `Para ${tipo}, V6 no debe superar 17 caracteres numéricos.`,
          regla: 'El consecutivo interno para AS/MS debe tener máximo 17 caracteres.',
          recomendacion: 'Revise el código DANE, el año de registro y el consecutivo interno.',
          datosRelacionados: [
            dato(registro, 'V5'),
            dato(registro, 'V6')
          ],
          columnasCorregir: ['V5', 'V6']
        });
      }

      if (documento.length < 10) {
        agregar(hallazgos, {
          codigo: `V6-ADVERTENCIA-${tipo}-004`,
          titulo: `Consecutivo interno de ${tipo} posiblemente incompleto`,
          variable: 'V6',
          valor: documento,
          mensaje: `Para ${tipo}, V6 parece demasiado corto para contener código DANE, año y consecutivo interno.`,
          regla: 'La estructura esperada une código DANE de departamento y municipio, año de registro y consecutivo interno.',
          recomendacion: 'Revise si el consecutivo interno está completo.',
          severidad: CACTipos.SEVERIDAD.ADVERTENCIA,
          datosRelacionados: [
            dato(registro, 'V5'),
            dato(registro, 'V6')
          ],
          columnasCorregir: ['V5', 'V6']
        });
      }

      return hallazgos;
    }

    if (TIPOS_NUMERICOS.includes(tipo) && !/^\d+$/.test(documento)) {
      const codigoPorTipo = {
        CC: 'V6-ERROR-003',
        CE: 'V6-ERROR-006',
        TI: 'V6-ERROR-004',
        RC: 'V6-ERROR-005'
      };

      agregar(hallazgos, {
        codigo: codigoPorTipo[tipo] || 'V6-ERROR-002',
        titulo: `Número de identificación de ${tipo} con formato inválido`,
        variable: 'V6',
        valor: documento,
        mensaje: `Para ${tipo}, V6 debe contener solo números. No debe tener letras, espacios, guiones ni símbolos.`,
        regla: `Cuando V5 es ${tipo}, V6 debe registrarse únicamente con dígitos numéricos.`,
        recomendacion: 'Corrija V6 dejando únicamente números.',
        datosRelacionados: [
          dato(registro, 'V5'),
          dato(registro, 'V6')
        ],
        columnasCorregir: ['V5', 'V6']
      });
    } else if (!/^[A-Za-z0-9-]+$/.test(documento)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V6',
        codigo: 'V6-ERROR-002',
        titulo: 'Número de identificación con caracteres no permitidos',
        mensaje: 'El número de identificación contiene caracteres no permitidos.',
        regla: 'Para tipos documentales alfanuméricos, V6 debe usar solo letras, números o guion cuando aplique. Para CC, CE, TI y RC debe ser exclusivamente numérico.',
        recomendacion: 'Retire espacios, símbolos o caracteres no permitidos.'
      }));
    }

    if (tipo === 'CC' && /^\d+$/.test(documento) && (documento.length < 6 || documento.length > 10)) {
      agregar(hallazgos, {
        codigo: 'V6-ADVERTENCIA-008',
        titulo: 'Longitud atípica para cédula de ciudadanía',
        variable: 'V6',
        valor: documento,
        mensaje: 'La longitud del número de identificación parece atípica para CC.',
        regla: 'La cédula normalmente tiene una longitud esperada. Este valor debe revisarse.',
        recomendacion: 'Verifique V6 contra documento de identidad o BDUA.',
        severidad: CACTipos.SEVERIDAD.ADVERTENCIA,
        datosRelacionados: [dato(registro, 'V5'), dato(registro, 'V6')],
        columnasCorregir: ['V5', 'V6']
      });
    }

    if (tipo === 'TI' && /^\d+$/.test(documento) && (documento.length < 6 || documento.length > 11)) {
      agregar(hallazgos, {
        codigo: 'V6-ADVERTENCIA-009',
        titulo: 'Longitud atípica para tarjeta de identidad',
        variable: 'V6',
        valor: documento,
        mensaje: 'La longitud del número de identificación parece atípica para TI.',
        regla: 'La tarjeta de identidad debe tener una longitud razonable según el soporte.',
        recomendacion: 'Verifique V6 contra documento de identidad o BDUA.',
        severidad: CACTipos.SEVERIDAD.ADVERTENCIA,
        datosRelacionados: [dato(registro, 'V5'), dato(registro, 'V6')],
        columnasCorregir: ['V5', 'V6']
      });
    }

    if (tipo === 'RC' && /^\d+$/.test(documento) && documento.length < 8) {
      agregar(hallazgos, {
        codigo: 'V6-ADVERTENCIA-010',
        titulo: 'Longitud atípica para registro civil',
        variable: 'V6',
        valor: documento,
        mensaje: 'La longitud del número de identificación parece atípica para RC.',
        regla: 'El registro civil debe revisarse contra el soporte documental.',
        recomendacion: 'Verifique V6 contra registro civil o BDUA.',
        severidad: CACTipos.SEVERIDAD.ADVERTENCIA,
        datosRelacionados: [dato(registro, 'V5'), dato(registro, 'V6')],
        columnasCorregir: ['V5', 'V6']
      });
    }

    if (tipo === 'SI') {
      agregar(hallazgos, {
        codigo: 'V6-ADVERTENCIA-011',
        titulo: 'Tipo SI requiere revisión de calidad del dato',
        variable: 'V6',
        valor: documento,
        mensaje: 'El tipo SI indica que el paciente fue reportado sin identificación.',
        regla: 'SI es un tipo permitido, pero afecta la plena identificación del afiliado y debe revisarse como alerta de calidad del dato.',
        recomendacion: 'Verifique contra BDUA o soporte institucional disponible. Si realmente aplica SI, conserve la evidencia o justificación interna del caso.',
        severidad: CACTipos.SEVERIDAD.ADVERTENCIA,
        datosRelacionados: [dato(registro, 'V5'), dato(registro, 'V6')],
        columnasCorregir: ['V5', 'V6']
      });
    }

    return hallazgos;
  }

  function validarFechaBase({ registro, variable, codigoBase }) {
    const hallazgos = [];
    const nombreCampo = nombreVariable(variable);
    const valor = CACTipos.texto(registro[variable]);

    if (CACTipos.estaVacio(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable,
        codigo: `${codigoBase}-ERROR-001`,
        titulo: `${nombreCampo} vacía`,
        mensaje: `${nombreCampo} está vacía.`,
        regla: `${nombreCampo} es obligatoria.`,
        recomendacion: 'Diligencie la fecha en formato AAAA-MM-DD.'
      }));
      return hallazgos;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable,
        codigo: `${codigoBase}-ERROR-002`,
        titulo: `${nombreCampo} con formato incorrecto`,
        mensaje: `${nombreCampo} no tiene formato AAAA-MM-DD.`,
        regla: 'Las fechas deben escribirse con año, mes y día separados por guion.',
        recomendacion: 'Corrija la fecha. Ejemplo válido: 2025-01-01.'
      }));
      return hallazgos;
    }

    if (!CACTipos.esFechaISO(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable,
        codigo: `${codigoBase}-ERROR-003`,
        titulo: `${nombreCampo} imposible`,
        mensaje: `${nombreCampo} no corresponde a una fecha real.`,
        regla: 'La fecha debe existir en el calendario.',
        recomendacion: 'Verifique año, mes y día.'
      }));
    }

    return hallazgos;
  }

  function validarFechaNacimiento(registro) {
    const hallazgos = validarFechaBase({
      registro,
      variable: 'V7',
      codigoBase: 'V7'
    });

    const fechaNacimiento = CACTipos.texto(registro.V7);

    if (!CACTipos.esFechaISO(fechaNacimiento)) {
      return hallazgos;
    }

    const edad = CACTipos.calcularEdad(fechaNacimiento, FECHA_REFERENCIA_VALIDACION);

    if (edad !== null && edad > 120) {
      agregar(hallazgos, {
        codigo: 'V7-ADVERTENCIA-006',
        titulo: 'Edad calculada mayor a 120 años',
        variable: 'V7',
        valor: fechaNacimiento,
        mensaje: 'La edad calculada del paciente es mayor a 120 años.',
        regla: 'Una edad mayor a 120 años puede ser posible, pero es inusual y debe revisarse.',
        recomendacion: 'Verifique V7 contra BDUA o documento soporte.',
        severidad: CACTipos.SEVERIDAD.ADVERTENCIA,
        datosRelacionados: [
          dato(registro, 'V7'),
          datoCalculado('Edad calculada', `${edad} años`),
          datoCalculado('Fecha de validación', FECHA_REFERENCIA_VALIDACION)
        ],
        columnasCorregir: ['V7']
      });
    }

    return hallazgos;
  }

  function validarOcupacion(registro) {
    const hallazgos = [];
    const valor = CACTipos.texto(registro.V9);
    const edad = CACTipos.calcularEdad(CACTipos.texto(registro.V7), FECHA_REFERENCIA_VALIDACION);

    if (CACTipos.estaVacio(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V9',
        codigo: 'V9-ERROR-001',
        titulo: 'Ocupación vacía',
        mensaje: 'La ocupación está vacía.',
        regla: 'V9 debe tener código CIUO de 4 dígitos o comodín permitido.',
        recomendacion: 'Diligencie una ocupación válida o use 9999 / 9998 según corresponda.'
      }));
      return hallazgos;
    }

    if (!/^\d+$/.test(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V9',
        codigo: 'V9-ERROR-003',
        titulo: 'Ocupación contiene letras o símbolos',
        mensaje: 'La ocupación contiene letras o símbolos.',
        regla: 'V9 debe ser numérica.',
        recomendacion: 'Use un código numérico de 4 dígitos.'
      }));
      return hallazgos;
    }

    if (!/^\d{4}$/.test(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V9',
        codigo: 'V9-ERROR-002',
        titulo: 'Ocupación no tiene 4 dígitos',
        mensaje: 'La ocupación no tiene exactamente 4 dígitos.',
        regla: 'V9 debe tener 4 dígitos.',
        recomendacion: 'Use un código CIUO de 4 dígitos o comodines 9999 / 9998.'
      }));
    }

    if (edad !== null && edad < 18 && valor !== '9998') {
      agregar(hallazgos, {
        codigo: 'V9-ADVERTENCIA-006',
        titulo: 'Menor de edad con ocupación revisable',
        variable: 'V9',
        valor,
        mensaje: 'El paciente es menor de edad y tiene una ocupación diferente de 9998.',
        regla: 'Para menores de edad, normalmente aplica 9998 cuando la ocupación no corresponde.',
        recomendacion: 'Revise V7 y V9. Si el paciente es menor y no aplica ocupación, use 9998.',
        severidad: CACTipos.SEVERIDAD.ADVERTENCIA,
        datosRelacionados: [
          dato(registro, 'V7'),
          datoCalculado('Edad calculada', `${edad} años`),
          dato(registro, 'V9')
        ],
        columnasCorregir: ['V7', 'V9']
      });
    }

    return hallazgos;
  }

  function validarEAPB(registro) {
    const hallazgos = [];
    const valor = CACTipos.texto(registro.V11);

    if (CACTipos.estaVacio(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V11',
        codigo: 'V11-ERROR-001',
        titulo: 'Código de la EPS vacío',
        mensaje: 'El código de la EPS está vacío.',
        regla: 'V11 es obligatorio.',
        recomendacion: 'Diligencie el código de la EPS correspondiente.'
      }));
      return hallazgos;
    }

    return hallazgos;
  }

  function validarPertenenciaEtnica(registro) {
    const hallazgos = [];
    const valor = CACTipos.texto(registro.V12);

    if (CACTipos.estaVacio(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V12',
        codigo: 'V12-ERROR-001',
        titulo: 'Pertenencia étnica vacía',
        mensaje: 'La pertenencia étnica está vacía.',
        regla: 'V12 es obligatoria y solo acepta códigos del 1 al 6.',
        recomendacion: 'Diligencie V12 con un código válido: 1 Indígena, 2 ROM, 3 Raizal, 4 Palenquero, 5 Afrodescendiente o 6 Ninguna.'
      }));
      return hallazgos;
    }

    if (!/^\d+$/.test(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V12',
        codigo: 'V12-ERROR-003',
        titulo: 'Pertenencia étnica no numérica',
        mensaje: 'La pertenencia étnica contiene letras o símbolos.',
        regla: 'V12 debe ser numérica y solo acepta códigos del 1 al 6.',
        recomendacion: 'Reemplace el valor por un código válido: 1 Indígena, 2 ROM, 3 Raizal, 4 Palenquero, 5 Afrodescendiente o 6 Ninguna.'
      }));
      return hallazgos;
    }

    if (!PERTENENCIA_ETNICA.includes(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V12',
        codigo: 'V12-ERROR-002',
        titulo: 'Pertenencia étnica fuera de catálogo',
        mensaje: 'La pertenencia étnica no pertenece al catálogo permitido.',
        regla: 'V12 solo acepta códigos del 1 al 6.',
        recomendacion: 'Corrija V12 con un código válido: 1 Indígena, 2 ROM, 3 Raizal, 4 Palenquero, 5 Afrodescendiente o 6 Ninguna.'
      }));
    }

    return hallazgos;
  }

  function validarGrupoPoblacional(registro) {
    const hallazgos = [];
    const valor = CACTipos.texto(registro.V13);

    const codigosPermitidos = '1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 31, 32, 33, 34, 35, 36, 37, 38, 39, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63';

    if (CACTipos.estaVacio(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V13',
        codigo: 'V13-ERROR-001',
        titulo: 'Grupo poblacional vacío',
        mensaje: 'El grupo poblacional está vacío.',
        regla: `V13 es obligatorio y solo acepta estos códigos: ${codigosPermitidos}.`,
        recomendacion: 'Diligencie V13 con uno de los códigos permitidos.'
      }));
      return hallazgos;
    }

    if (!/^\d+$/.test(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V13',
        codigo: 'V13-ERROR-003',
        titulo: 'Grupo poblacional no numérico',
        mensaje: 'El grupo poblacional contiene letras o símbolos.',
        regla: `V13 debe ser numérico y solo acepta estos códigos: ${codigosPermitidos}.`,
        recomendacion: 'Reemplace el valor por uno de los códigos permitidos.'
      }));
      return hallazgos;
    }

    if (!GRUPOS_POBLACIONALES.includes(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V13',
        codigo: 'V13-ERROR-002',
        titulo: 'Grupo poblacional fuera de catálogo',
        mensaje: 'El grupo poblacional no pertenece al catálogo permitido.',
        regla: `V13 solo acepta estos códigos: ${codigosPermitidos}.`,
        recomendacion: 'Corrija V13 con uno de los códigos permitidos.'
      }));
    }

    return hallazgos;
  }

  function validarDivipola(registro) {
    const hallazgos = [];
    const valor = CACTipos.texto(registro.V14);

    const reglaV14 = 'V14 debe contener el código DIVIPOLA municipal de residencia del paciente, compuesto por 5 dígitos numéricos. Este dato identifica el municipio reportado por la base de datos y debe conservarse con la estructura oficial del código territorial.';

    const recomendacionV14 = 'Revise el dato entregado por la BD y corrija V14 con un código DIVIPOLA municipal válido de 5 dígitos. Ejemplo: 19001.';

    if (CACTipos.estaVacio(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V14',
        codigo: 'V14-ERROR-001',
        titulo: 'Municipio de residencia vacío',
        mensaje: 'El municipio de residencia está vacío.',
        regla: reglaV14,
        recomendacion: recomendacionV14
      }));
      return hallazgos;
    }

    if (!/^\d+$/.test(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V14',
        codigo: 'V14-ERROR-003',
        titulo: 'Municipio de residencia con formato inválido',
        mensaje: 'El municipio de residencia contiene letras, espacios o símbolos.',
        regla: reglaV14,
        recomendacion: recomendacionV14
      }));
      return hallazgos;
    }

    if (!/^\d{5}$/.test(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V14',
        codigo: 'V14-ERROR-002',
        titulo: 'Municipio de residencia no tiene 5 dígitos',
        mensaje: 'El código del municipio de residencia no tiene exactamente 5 dígitos.',
        regla: reglaV14,
        recomendacion: recomendacionV14
      }));
    }

    return hallazgos;
  }


  function validarTelefono(registro) {
    const hallazgos = [];
    const valorOriginal = CACTipos.texto(registro.V15);
    // La BD puede entregar teléfonos con espacios alrededor del guion.
    // Ejemplo: 3154247281 - 3104879168.
    // Para evitar falsos positivos, validamos V15 sin espacios internos.
    const valor = valorOriginal.replace(/\s+/g, '');

    if (CACTipos.estaVacio(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V15',
        codigo: 'V15-ERROR-001',
        titulo: 'Teléfono vacío',
        mensaje: 'El teléfono está vacío y no se usó el comodín 0.',
        regla: 'V15 debe tener máximo dos teléfonos o el comodín 0.',
        recomendacion: 'Diligencie un teléfono o use 0 si realmente no existe número disponible.'
      }));
      return hallazgos;
    }

    if (valor === '0') {
      agregar(hallazgos, {
        codigo: 'V15-ADVERTENCIA-007',
        titulo: 'Sin teléfono reportado',
        variable: 'V15',
        valor,
        mensaje: 'Se usó 0, que significa que no hay teléfono disponible.',
        regla: 'El comodín 0 puede usarse, pero indica ausencia de dato de contacto.',
        recomendacion: 'Verifique si realmente no existe número del paciente, familiar o cuidador.',
        severidad: CACTipos.SEVERIDAD.ADVERTENCIA,
        datosRelacionados: [dato(registro, 'V15')],
        columnasCorregir: ['V15']
      });
      return hallazgos;
    }

    if (/[,;/|]+/.test(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V15',
        codigo: 'V15-ERROR-004',
        titulo: 'Teléfonos separados con carácter incorrecto',
        mensaje: 'Los teléfonos están separados con un carácter diferente al guion medio.',
        regla: 'Si hay dos teléfonos, deben separarse con guion medio.',
        recomendacion: 'Use este formato: 3001234567-3101234567.'
      }));
    }

    if (/[^0-9-]/.test(valor)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V15',
        codigo: 'V15-ERROR-003',
        titulo: 'Teléfono con caracteres no permitidos',
        mensaje: 'El teléfono contiene caracteres no permitidos.',
        regla: 'V15 solo debe contener números y guion medio.',
        recomendacion: 'Retire letras, espacios, paréntesis u otros símbolos.'
      }));
    }

    const telefonos = valor.split('-').map((tel) => tel.trim()).filter(Boolean);

    if (telefonos.length > 2) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V15',
        codigo: 'V15-ERROR-002',
        titulo: 'Más de dos teléfonos registrados',
        mensaje: 'Se registraron más de dos teléfonos.',
        regla: 'V15 permite máximo dos teléfonos.',
        recomendacion: 'Deje máximo dos números separados por guion.'
      }));
    }

    const telefonosCortos = telefonos.filter((tel) => /^\d+$/.test(tel) && tel.length < 7);
    const telefonosLargos = telefonos.filter((tel) => /^\d+$/.test(tel) && tel.length > 10);

    if (telefonosCortos.length > 0) {
      agregar(hallazgos, {
        codigo: 'V15-ADVERTENCIA-005',
        titulo: 'Teléfono posiblemente incompleto',
        variable: 'V15',
        valor,
        mensaje: 'Uno o más teléfonos parecen incompletos.',
        regla: 'Un teléfono muy corto puede indicar mala captura del dato.',
        recomendacion: 'Verifique que el número esté completo.',
        severidad: CACTipos.SEVERIDAD.ADVERTENCIA,
        datosRelacionados: [dato(registro, 'V15')],
        columnasCorregir: ['V15']
      });
    }

    if (telefonosLargos.length > 0) {
      agregar(hallazgos, {
        codigo: 'V15-ADVERTENCIA-006',
        titulo: 'Teléfono con longitud inusual',
        variable: 'V15',
        valor,
        mensaje: 'Uno o más teléfonos superan la longitud usual de 10 dígitos.',
        regla: 'La longitud del teléfono debe ser razonable para fijo o celular.',
        recomendacion: 'Verifique si el número corresponde a un teléfono válido.',
        severidad: CACTipos.SEVERIDAD.ADVERTENCIA,
        datosRelacionados: [dato(registro, 'V15')],
        columnasCorregir: ['V15']
      });
    }

    return hallazgos;
  }


  function validarFechaAfiliacion(registro) {
    const hallazgos = validarFechaBase({
      registro,
      variable: 'V16',
      codigoBase: 'V16'
    });

    const fechaAfiliacion = CACTipos.texto(registro.V16);
    const fechaNacimiento = CACTipos.texto(registro.V7);
    const regimen = CACTipos.textoMayuscula(registro.V10);

    if (!CACTipos.esFechaISO(fechaAfiliacion)) {
      return hallazgos;
    }

    if (CACTipos.esFechaISO(fechaNacimiento) && CACTipos.compararFechas(fechaAfiliacion, fechaNacimiento) === -1) {
      agregar(hallazgos, {
        codigo: 'V16-ERROR-004',
        titulo: 'Fecha de afiliación anterior al nacimiento',
        variable: 'V16',
        valor: fechaAfiliacion,
        mensaje: 'La fecha de afiliación está registrada antes de la fecha de nacimiento del paciente.',
        regla: 'Una persona no puede estar afiliada antes de nacer.',
        recomendacion: 'Revise V7 y V16. Normalmente se debe corregir V16, salvo que la fecha de nacimiento también esté mal.',
        datosRelacionados: [
          dato(registro, 'V7'),
          dato(registro, 'V16')
        ],
        columnasCorregir: ['V7', 'V16']
      });
    }

    if (CACTipos.compararFechas(fechaAfiliacion, '1995-01-01') === -1) {
      agregar(hallazgos, {
        codigo: 'V16-ADVERTENCIA-007',
        titulo: 'Fecha de afiliación antigua',
        variable: 'V16',
        valor: fechaAfiliacion,
        mensaje: 'La fecha de afiliación es anterior a 1995-01-01.',
        regla: 'Como la fecha proviene de la BD, no se bloquea automáticamente; se deja como advertencia de revisión.',
        recomendacion: 'Revise V10 y V16 contra BDUA o soporte de afiliación si aplica.',
        severidad: CACTipos.SEVERIDAD.ADVERTENCIA,
        datosRelacionados: [
          dato(registro, 'V10'),
          dato(registro, 'V16'),
          datoCalculado('Régimen registrado', regimen)
        ],
        columnasCorregir: ['V10', 'V16']
      });
    }

    return hallazgos;
  }


  function validarCoherenciaV5V10(registro) {
    const hallazgos = [];
    const tipoDocumento = CACTipos.textoMayuscula(registro.V5);
    const regimen = CACTipos.textoMayuscula(registro.V10);

    if (tipoDocumento === 'AS' && regimen !== 'S') {
      agregar(hallazgos, {
        codigo: 'V5-ERROR-004',
        titulo: 'Tipo AS no coincide con régimen',
        variable: 'V5',
        valor: tipoDocumento,
        mensaje: 'El paciente está registrado como Adulto sin identificar (AS), pero su régimen no es subsidiado.',
        regla: 'AS solo es válido cuando V10 es S. En este caso V6 debe corresponder al consecutivo interno del afiliado.',
        recomendacion: 'Revise V5, V6 y V10. Corrija el régimen a S si corresponde, diligencie el consecutivo interno en V6 o cambie el tipo de identificación si AS no aplica.',
        datosRelacionados: [
          dato(registro, 'V5'),
          dato(registro, 'V10'),
          datoCalculado('Valor esperado para V10', 'S')
        ],
        columnasCorregir: ['V5', 'V6', 'V10']
      });
    }

    if (tipoDocumento === 'MS' && regimen !== 'S') {
      agregar(hallazgos, {
        codigo: 'V5-ERROR-005',
        titulo: 'Tipo MS no coincide con régimen',
        variable: 'V5',
        valor: tipoDocumento,
        mensaje: 'El paciente está registrado como Menor sin identificar (MS), pero su régimen no es subsidiado.',
        regla: 'MS solo es válido cuando V10 es S. En este caso V6 debe corresponder al consecutivo interno del afiliado.',
        recomendacion: 'Revise V5, V6 y V10. Corrija el régimen a S si corresponde, diligencie el consecutivo interno en V6 o cambie el tipo de identificación si MS no aplica.',
        datosRelacionados: [
          dato(registro, 'V5'),
          dato(registro, 'V10'),
          datoCalculado('Valor esperado para V10', 'S')
        ],
        columnasCorregir: ['V5', 'V6', 'V10']
      });
    }

    return hallazgos;
  }

  function validarAdvertenciasTipoDocumento(registro) {
    const hallazgos = [];
    const tipo = CACTipos.textoMayuscula(registro.V5);
    const edad = CACTipos.calcularEdad(CACTipos.texto(registro.V7), FECHA_REFERENCIA_VALIDACION);
    const dias = CACTipos.calcularDias(CACTipos.texto(registro.V7), FECHA_REFERENCIA_VALIDACION);

    if (tipo === 'CN' && dias !== null && dias > 28) {
      agregar(hallazgos, {
        codigo: 'V5-ADVERTENCIA-006',
        titulo: 'CN usado en paciente que no parece recién nacido',
        variable: 'V5',
        valor: tipo,
        mensaje: 'El tipo de identificación CN se usa, pero por la fecha de nacimiento el paciente no parece recién nacido.',
        regla: 'CN debería ser coherente con edad de recién nacido.',
        recomendacion: 'Revise V5 y V7. Confirme si el tipo de identificación o la fecha de nacimiento están mal registrados.',
        severidad: CACTipos.SEVERIDAD.ADVERTENCIA,
        datosRelacionados: [
          dato(registro, 'V5'),
          dato(registro, 'V7'),
          datoCalculado('Días calculados desde nacimiento hasta validación', `${dias} días`)
        ],
        columnasCorregir: ['V5', 'V7']
      });
    }

    if (tipo === 'RC' && edad !== null && edad >= 18) {
      agregar(hallazgos, {
        codigo: 'V5-ADVERTENCIA-007',
        titulo: 'RC usado en paciente adulto',
        variable: 'V5',
        valor: tipo,
        mensaje: 'El tipo de identificación RC se usa, pero el paciente parece adulto según la fecha de nacimiento.',
        regla: 'RC puede ser válido, pero en un adulto debe revisarse cuidadosamente.',
        recomendacion: 'Revise V5 y V7. Confirme si corresponde CC u otro tipo documental.',
        severidad: CACTipos.SEVERIDAD.ADVERTENCIA,
        datosRelacionados: [
          dato(registro, 'V5'),
          dato(registro, 'V7'),
          datoCalculado('Edad calculada', `${edad} años`)
        ],
        columnasCorregir: ['V5', 'V7']
      });
    }

    if (tipo === 'TI' && edad !== null && edad >= 18) {
      agregar(hallazgos, {
        codigo: 'V5-ADVERTENCIA-008',
        titulo: 'TI usada en paciente adulto',
        variable: 'V5',
        valor: tipo,
        mensaje: 'El tipo de identificación TI se usa, pero el paciente parece adulto según la fecha de nacimiento.',
        regla: 'TI normalmente no debería mantenerse en paciente adulto sin revisión.',
        recomendacion: 'Revise V5 y V7. Confirme si corresponde CC u otro tipo documental.',
        severidad: CACTipos.SEVERIDAD.ADVERTENCIA,
        datosRelacionados: [
          dato(registro, 'V5'),
          dato(registro, 'V7'),
          datoCalculado('Edad calculada', `${edad} años`)
        ],
        columnasCorregir: ['V5', 'V7']
      });
    }

    return hallazgos;
  }

  function validarRegistroModulo1(registro) {
    let hallazgos = [];

    hallazgos = hallazgos.concat(validarCampoTextoPersona({
      registro,
      variable: 'V1',
      codigoBase: 'V1'
    }));

    hallazgos = hallazgos.concat(validarCampoTextoPersona({
      registro,
      variable: 'V2',
      codigoBase: 'V2',
      comodin: 'NONE'
    }));

    hallazgos = hallazgos.concat(validarCampoTextoPersona({
      registro,
      variable: 'V3',
      codigoBase: 'V3'
    }));

    hallazgos = hallazgos.concat(validarCampoTextoPersona({
      registro,
      variable: 'V4',
      codigoBase: 'V4',
      comodin: 'NOAP'
    }));

    hallazgos = hallazgos.concat(validarCatalogo({
      registro,
      variable: 'V5',
      catalogo: TIPOS_IDENTIFICACION,
      codigoBase: 'V5'
    }));

    hallazgos = hallazgos.concat(validarDocumento(registro));
    hallazgos = hallazgos.concat(validarFechaNacimiento(registro));

    hallazgos = hallazgos.concat(validarCatalogo({
      registro,
      variable: 'V8',
      catalogo: SEXOS,
      codigoBase: 'V8'
    }));

    hallazgos = hallazgos.concat(validarOcupacion(registro));

    hallazgos = hallazgos.concat(validarCatalogo({
      registro,
      variable: 'V10',
      catalogo: REGIMENES,
      codigoBase: 'V10'
    }));

    hallazgos = hallazgos.concat(validarEAPB(registro));
    hallazgos = hallazgos.concat(validarPertenenciaEtnica(registro));
    hallazgos = hallazgos.concat(validarGrupoPoblacional(registro));
    hallazgos = hallazgos.concat(validarDivipola(registro));
    hallazgos = hallazgos.concat(validarTelefono(registro));
    hallazgos = hallazgos.concat(validarFechaAfiliacion(registro));
    hallazgos = hallazgos.concat(validarCoherenciaV5V10(registro));
    hallazgos = hallazgos.concat(validarAdvertenciasTipoDocumento(registro));

    return hallazgos;
  }

  window.CACModulo1 = {
    FECHA_REFERENCIA_VALIDACION,
    CATALOGO_PERTENENCIA_ETNICA,
    CATALOGO_GRUPO_POBLACIONAL,
    normalizarFila,
    validarRegistroModulo1
  };
})();