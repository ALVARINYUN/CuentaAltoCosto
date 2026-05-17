// =======================================================
// Validador CAC - validaciones/reglas/modulo1.js
// Reglas Sprint 1: Identificación V1 a V16
// =======================================================

(function () {
  'use strict';

  const TIPOS_IDENTIFICACION = [
    'CC', 'TI', 'RC', 'PA', 'CE', 'CD', 'SC',
    'PT', 'PE', 'CN', 'AS', 'MS', 'DE', 'SI'
  ];

  const REGIMENES = ['C', 'S', 'P', 'E', 'N', 'I'];

  const SEXOS = ['M', 'F'];

  const PERTENENCIA_ETNICA = ['1', '2', '3', '4', '5', '6'];

  const GRUPOS_POBLACIONALES = [
    '1', '2', '3', '4', '5', '6', '7', '8',
    '9', '10', '11', '12', '13', '14', '15',
    '16', '17', '18', '19', '20', '21', '22',
    '23', '24', '25', '26', '27', '28', '29',
    '30', '31', '32', '33', '34', '35', '36'
  ];

  function normalizarFila(encabezados, fila) {
    const registro = {};

    encabezados.forEach((encabezado, indice) => {
      const clave = String(encabezado ?? '').trim().toUpperCase();
      registro[clave] = CACTipos.texto(fila[indice]);
    });

    return registro;
  }

  function validarNombre(registro, variable, nombreCampo, comodinesPermitidos = []) {
    const hallazgos = [];
    const valor = CACTipos.texto(registro[variable]);
    const valorMayuscula = valor.toUpperCase();

    if (CACTipos.estaVacio(valor)) {
      hallazgos.push(CACTipos.crearHallazgo({
        variable,
        valor,
        regla: `${variable} obligatorio`,
        mensaje: `${nombreCampo} no puede estar vacío.`,
        recomendacion: `Diligencia ${nombreCampo} en mayúscula sostenida.`
      }));
      return hallazgos;
    }

    if (comodinesPermitidos.includes(valorMayuscula)) {
      if (valor !== valorMayuscula) {
        hallazgos.push(CACTipos.crearHallazgo({
          variable,
          valor,
          regla: `${variable} comodín en mayúscula`,
          mensaje: `${nombreCampo} usa un comodín permitido, pero debe estar en mayúscula.`,
          recomendacion: `Usa ${valorMayuscula}.`
        }));
      }

      return hallazgos;
    }

    if (valor !== valorMayuscula) {
      hallazgos.push(CACTipos.crearHallazgo({
        variable,
        valor,
        regla: `${variable} mayúscula sostenida`,
        mensaje: `${nombreCampo} debe estar en mayúscula sostenida.`,
        recomendacion: `Corrige el valor a: ${valorMayuscula}.`
      }));
    }

    if (!/^[A-ZÁÉÍÓÚÑÜ\s]+$/.test(valor)) {
      hallazgos.push(CACTipos.crearHallazgo({
        variable,
        valor,
        regla: `${variable} caracteres válidos`,
        mensaje: `${nombreCampo} contiene caracteres no permitidos.`,
        recomendacion: 'Usa solo letras, espacios y caracteres propios del español. No uses números ni símbolos.'
      }));
    }

    return hallazgos;
  }

  function validarCatalogo(registro, variable, nombreCampo, catalogo, recomendacionExtra = '') {
    const hallazgos = [];
    const valor = CACTipos.textoMayuscula(registro[variable]);

    if (CACTipos.estaVacio(valor)) {
      hallazgos.push(CACTipos.crearHallazgo({
        variable,
        valor,
        regla: `${variable} obligatorio`,
        mensaje: `${nombreCampo} no puede estar vacío.`,
        recomendacion: `Selecciona un valor permitido. ${recomendacionExtra}`.trim()
      }));
      return hallazgos;
    }

    if (!catalogo.includes(valor)) {
      hallazgos.push(CACTipos.crearHallazgo({
        variable,
        valor,
        regla: `${variable} catálogo permitido`,
        mensaje: `${nombreCampo} tiene un valor no permitido.`,
        recomendacion: `Usa uno de estos valores: ${catalogo.join(', ')}. ${recomendacionExtra}`.trim()
      }));
    }

    return hallazgos;
  }

  function validarDocumento(registro) {
    const hallazgos = [];
    const tipo = CACTipos.textoMayuscula(registro.V5);
    const documento = CACTipos.texto(registro.V6);

    if (CACTipos.estaVacio(documento)) {
      hallazgos.push(CACTipos.crearHallazgo({
        variable: 'V6',
        valor: documento,
        regla: 'V6 obligatorio',
        mensaje: 'El número de identificación no puede estar vacío.',
        recomendacion: 'Diligencia el número de identificación según el tipo de documento.'
      }));
      return hallazgos;
    }

    if (!/^[A-Za-z0-9\-]+$/.test(documento)) {
      hallazgos.push(CACTipos.crearHallazgo({
        variable: 'V6',
        valor: documento,
        regla: 'V6 formato alfanumérico',
        mensaje: 'El número de identificación contiene caracteres no permitidos.',
        recomendacion: 'Usa solo letras, números o guion cuando aplique.'
      }));
    }

    if (['CC', 'TI', 'RC', 'AS', 'MS'].includes(tipo) && !/^\d+$/.test(documento)) {
      hallazgos.push(CACTipos.crearHallazgo({
        variable: 'V6',
        valor: documento,
        regla: 'V6 numérico para tipo de documento',
        mensaje: `Para tipo de identificación ${tipo}, el documento debe ser numérico.`,
        recomendacion: 'Retira letras, espacios o símbolos no permitidos.'
      }));
    }

    return hallazgos;
  }

  function validarFecha(registro, variable, nombreCampo) {
    const hallazgos = [];
    const valor = CACTipos.texto(registro[variable]);

    if (CACTipos.estaVacio(valor)) {
      hallazgos.push(CACTipos.crearHallazgo({
        variable,
        valor,
        regla: `${variable} obligatorio`,
        mensaje: `${nombreCampo} no puede estar vacía.`,
        recomendacion: 'Usa formato AAAA-MM-DD.'
      }));
      return hallazgos;
    }

    if (!CACTipos.esFechaISO(valor)) {
      hallazgos.push(CACTipos.crearHallazgo({
        variable,
        valor,
        regla: `${variable} formato fecha`,
        mensaje: `${nombreCampo} no tiene formato válido.`,
        recomendacion: 'Corrige la fecha usando formato AAAA-MM-DD, por ejemplo 2025-01-01.'
      }));
    }

    return hallazgos;
  }

  function validarOcupacion(registro) {
    const hallazgos = [];
    const valor = CACTipos.texto(registro.V9);

    if (CACTipos.estaVacio(valor)) {
      hallazgos.push(CACTipos.crearHallazgo({
        variable: 'V9',
        valor,
        regla: 'V9 obligatorio',
        mensaje: 'La ocupación no puede estar vacía.',
        recomendacion: 'Usa código CIUO válido o comodines permitidos 9999 / 9998.'
      }));
      return hallazgos;
    }

    if (!/^\d{4}$/.test(valor)) {
      hallazgos.push(CACTipos.crearHallazgo({
        variable: 'V9',
        valor,
        regla: 'V9 formato CIUO',
        mensaje: 'La ocupación debe tener exactamente 4 dígitos.',
        recomendacion: 'Usa un código CIUO de 4 dígitos o comodines 9999 / 9998.'
      }));
    }

    return hallazgos;
  }

  function validarEAPB(registro) {
    const hallazgos = [];
    const valor = CACTipos.texto(registro.V11);

    if (CACTipos.estaVacio(valor)) {
      hallazgos.push(CACTipos.crearHallazgo({
        variable: 'V11',
        valor,
        regla: 'V11 obligatorio',
        mensaje: 'La EAPB o entidad territorial no puede estar vacía.',
        recomendacion: 'Diligencia el código de la entidad correspondiente.'
      }));
    }

    return hallazgos;
  }

  function validarDivipola(registro) {
    const hallazgos = [];
    const valor = CACTipos.texto(registro.V14);

    if (CACTipos.estaVacio(valor)) {
      hallazgos.push(CACTipos.crearHallazgo({
        variable: 'V14',
        valor,
        regla: 'V14 obligatorio',
        mensaje: 'El municipio de residencia no puede estar vacío.',
        recomendacion: 'Diligencia el código DIVIPOLA de 5 dígitos.'
      }));
      return hallazgos;
    }

    if (!/^\d{5}$/.test(valor)) {
      hallazgos.push(CACTipos.crearHallazgo({
        variable: 'V14',
        valor,
        regla: 'V14 formato DIVIPOLA',
        mensaje: 'El código DIVIPOLA debe tener exactamente 5 dígitos.',
        recomendacion: 'Verifica departamento y municipio. Ejemplo: 19001.'
      }));
    }

    return hallazgos;
  }

  function validarTelefono(registro) {
    const hallazgos = [];
    const valor = CACTipos.texto(registro.V15);

    if (CACTipos.estaVacio(valor)) {
      hallazgos.push(CACTipos.crearHallazgo({
        variable: 'V15',
        valor,
        regla: 'V15 obligatorio',
        mensaje: 'El teléfono no puede estar vacío.',
        recomendacion: 'Diligencia un teléfono, máximo dos separados por guion, o usa 0 si no aplica.'
      }));
      return hallazgos;
    }

    if (valor === '0') {
      return hallazgos;
    }

    const telefonos = valor.split('-').map((tel) => tel.trim()).filter(Boolean);

    if (telefonos.length > 2) {
      hallazgos.push(CACTipos.crearHallazgo({
        variable: 'V15',
        valor,
        regla: 'V15 máximo dos teléfonos',
        mensaje: 'Solo se permiten máximo dos teléfonos separados por guion.',
        recomendacion: 'Deja máximo dos números. Ejemplo: 3001234567-3101234567.'
      }));
    }

    const telefonosInvalidos = telefonos.filter((tel) => !/^\d{7,10}$/.test(tel));

    if (telefonosInvalidos.length > 0) {
      hallazgos.push(CACTipos.crearHallazgo({
        variable: 'V15',
        valor,
        regla: 'V15 formato teléfono',
        mensaje: 'Uno o más teléfonos tienen formato inválido.',
        recomendacion: 'Usa solo números de 7 a 10 dígitos, separados por un guion si hay dos.'
      }));
    }

    return hallazgos;
  }

  function validarCoherencias(registro) {
    const hallazgos = [];

    const tipoDocumento = CACTipos.textoMayuscula(registro.V5);
    const regimen = CACTipos.textoMayuscula(registro.V10);
    const fechaNacimiento = CACTipos.texto(registro.V7);
    const fechaAfiliacion = CACTipos.texto(registro.V16);

    if (['AS', 'MS'].includes(tipoDocumento) && regimen !== 'S') {
      hallazgos.push(CACTipos.crearHallazgo({
        variable: 'V10',
        valor: regimen,
        regla: 'Si V5 = AS o MS, V10 debe ser S',
        mensaje: 'El tipo de identificación AS/MS solo es coherente con régimen subsidiado.',
        recomendacion: 'Corrige V10 a S o revisa el tipo de identificación registrado.'
      }));
    }

    if (CACTipos.esFechaISO(fechaNacimiento) && CACTipos.esFechaISO(fechaAfiliacion)) {
      const comparacion = CACTipos.compararFechas(fechaAfiliacion, fechaNacimiento);

      if (comparacion === -1) {
        hallazgos.push(CACTipos.crearHallazgo({
          variable: 'V16',
          valor: fechaAfiliacion,
          regla: 'V16 posterior a V7',
          mensaje: 'La fecha de afiliación no puede ser anterior a la fecha de nacimiento.',
          recomendacion: 'Verifica V7 fecha de nacimiento y V16 fecha de afiliación.'
        }));
      }
    }

    return hallazgos;
  }

  function validarRegistroModulo1(registro) {
    let hallazgos = [];

    hallazgos = hallazgos.concat(validarNombre(registro, 'V1', 'Primer nombre'));
    hallazgos = hallazgos.concat(validarNombre(registro, 'V2', 'Segundo nombre', ['NONE']));
    hallazgos = hallazgos.concat(validarNombre(registro, 'V3', 'Primer apellido'));
    hallazgos = hallazgos.concat(validarNombre(registro, 'V4', 'Segundo apellido', ['NOAP']));

    hallazgos = hallazgos.concat(validarCatalogo(
      registro,
      'V5',
      'Tipo de identificación',
      TIPOS_IDENTIFICACION
    ));

    hallazgos = hallazgos.concat(validarDocumento(registro));

    hallazgos = hallazgos.concat(validarFecha(registro, 'V7', 'Fecha de nacimiento'));

    hallazgos = hallazgos.concat(validarCatalogo(
      registro,
      'V8',
      'Sexo',
      SEXOS
    ));

    hallazgos = hallazgos.concat(validarOcupacion(registro));

    hallazgos = hallazgos.concat(validarCatalogo(
      registro,
      'V10',
      'Régimen de afiliación',
      REGIMENES
    ));

    hallazgos = hallazgos.concat(validarEAPB(registro));

    hallazgos = hallazgos.concat(validarCatalogo(
      registro,
      'V12',
      'Pertenencia étnica',
      PERTENENCIA_ETNICA
    ));

    hallazgos = hallazgos.concat(validarCatalogo(
      registro,
      'V13',
      'Grupo poblacional',
      GRUPOS_POBLACIONALES
    ));

    hallazgos = hallazgos.concat(validarDivipola(registro));
    hallazgos = hallazgos.concat(validarTelefono(registro));
    hallazgos = hallazgos.concat(validarFecha(registro, 'V16', 'Fecha de afiliación'));
    hallazgos = hallazgos.concat(validarCoherencias(registro));

    return hallazgos;
  }

  window.CACModulo1 = {
    normalizarFila,
    validarRegistroModulo1
  };
})();