(function () {
  'use strict';

  const CAMPOS_FECHA = [
    'V7', 'V16',
    'V18', 'V19', 'V20', 'V23', 'V24',
    'V26',
    'V30', 'V32', 'V35', 'V39', 'V43',
    'V49', 'V58', 'V62', 'V71', 'V76', 'V80', 'V88', 'V94', 'V97', 'V103', 'V109', 'V112', 'V115', 'V118', 'V121', 'V130', 'V131', 'V134'
  ];

  const VARIABLES_VALIDABLES = [
    ...Array.from({ length: 46 }, (_, i) => `V${i + 1}`),
    'V46_1', 'V46_2', 'V46_3', 'V46_4', 'V46_5', 'V46_6', 'V46_7', 'V46_8',
    'V47', 'V48', 'V49', 'V50', 'V51', 'V52',
    'V53', 'V53_1', 'V53_2', 'V53_3', 'V53_4', 'V53_5', 'V53_6', 'V53_7', 'V53_8', 'V53_9',
    'V54', 'V55', 'V56', 'V57', 'V58', 'V59', 'V60',
    'V61', 'V62', 'V63', 'V64', 'V65',
    'V66', 'V66_1', 'V66_2', 'V66_3', 'V66_4', 'V66_5', 'V66_6', 'V66_7', 'V66_8', 'V66_9',
    'V67', 'V68', 'V69', 'V70', 'V71', 'V72', 'V73', 'V74', 'V75', 'V76', 'V77', 'V78', 'V79', 'V80', 'V81', 'V82', 'V83', 'V84', 'V85', 'V86', 'V87', 'V88', 'V89', 'V90', 'V91', 'V92', 'V93', 'V94', 'V95', 'V96', 'V97', 'V98', 'V99', 'V100', 'V101', 'V102', 'V103', 'V104', 'V105', 'V106', 'V107', 'V108', 'V109', 'V110', 'V111', 'V112', 'V113', 'V114', 'V114_1', 'V114_2', 'V114_3', 'V114_4', 'V114_5', 'V114_6', 'V115', 'V116', 'V117', 'V118', 'V119', 'V120', 'V121', 'V122', 'V123', 'V124', 'V125', 'V126', 'V127', 'V128', 'V129', 'V130', 'V131', 'V134', 'V132', 'V133'
  ];

  function texto(valor) {
    return String(valor ?? '').trim();
  }

  function celdaVacia(valor) {
    return valor === null || valor === undefined || texto(valor) === '';
  }

  function filaVacia(fila) {
    return !Array.isArray(fila) || fila.every(celdaVacia);
  }

  function serialToDate(valor) {
    if (valor === null || valor === undefined || valor === '') return '';

    if (valor instanceof Date && !Number.isNaN(valor.getTime())) {
      const yyyy = valor.getFullYear();
      const mm = String(valor.getMonth() + 1).padStart(2, '0');
      const dd = String(valor.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    }

    if (typeof valor === 'number' && Number.isFinite(valor)) {
      const fecha = new Date(Math.round((valor - 25569) * 86400 * 1000));
      const yyyy = fecha.getUTCFullYear();
      const mm = String(fecha.getUTCMonth() + 1).padStart(2, '0');
      const dd = String(fecha.getUTCDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    }

    return texto(valor);
  }

  function normalizarBasicoEncabezado(valor) {
    return texto(valor)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/g, '');
  }

  function normalizarEncabezado(valor) {
    if (window.CACEstructura && typeof window.CACEstructura.normalizarEncabezado === 'function') {
      return window.CACEstructura.normalizarEncabezado(valor);
    }

    const limpio = normalizarBasicoEncabezado(valor);

    const subvariable46 = limpio.match(/^v46([1-8])(?:\D|$)/);
    if (subvariable46) return `V46_${subvariable46[1]}`;

    const subvariable53 = limpio.match(/^v53([1-9])(?:\D|$)/);
    if (subvariable53) return `V53_${subvariable53[1]}`;

    const subvariable66 = limpio.match(/^v66([1-9])(?:\D|$)/);
    if (subvariable66) return `V66_${subvariable66[1]}`;

    const subvariable114 = limpio.match(/^v114([1-9])(?:\D|$)/);
    if (subvariable114) return `V114_${subvariable114[1]}`;

    const match = limpio.match(/^v(\d{1,3})(?:\D|$)/);
    if (match) {
      const numero = Number(match[1]);
      if (Number.isInteger(numero) && numero >= 1 && numero <= 161) return `V${numero}`;
    }

    return texto(valor).toUpperCase();
  }

  function esVariableValida(variable) {
    return VARIABLES_VALIDABLES.includes(variable);
  }

  function numeroVariable(variable) {
    const sub = {
      V46_1: 46.1, V46_2: 46.2, V46_3: 46.3, V46_4: 46.4, V46_5: 46.5, V46_6: 46.6, V46_7: 46.7, V46_8: 46.8,
      V53_1: 53.1, V53_2: 53.2, V53_3: 53.3, V53_4: 53.4, V53_5: 53.5, V53_6: 53.6, V53_7: 53.7, V53_8: 53.8, V53_9: 53.9,
      V66_1: 66.1, V66_2: 66.2, V66_3: 66.3, V66_4: 66.4, V66_5: 66.5, V66_6: 66.6, V66_7: 66.7, V66_8: 66.8, V66_9: 66.9,
      V114_1: 114.1, V114_2: 114.2, V114_3: 114.3, V114_4: 114.4, V114_5: 114.5, V114_6: 114.6
    };

    if (sub[texto(variable)]) return sub[texto(variable)];

    const match = texto(variable).match(/^V(\d+)$/);
    return match ? Number(match[1]) : null;
  }

  function analizarFilaEncabezados(fila) {
    const mapeos = [];
    const variablesYaMapeadas = new Set();

    if (filaVacia(fila)) {
      return { esCandidata: false, puntaje: 0, consecutivasDesdeV1: 0, variables: [], mapeos: [] };
    }

    fila.forEach((celda, indiceColumna) => {
      const variable = normalizarEncabezado(celda);

      if (esVariableValida(variable) && !variablesYaMapeadas.has(variable)) {
        variablesYaMapeadas.add(variable);
        mapeos.push({ indiceColumna, variable, encabezadoOriginal: texto(celda) });
      }
    });

    const variables = [...new Set(mapeos.map((m) => m.variable))];
    const numeros = variables.map(numeroVariable).filter(Number.isFinite).sort((a, b) => a - b);

    let consecutivasDesdeV1 = 0;
    for (let n = 1; n <= 100; n += 1) {
      if (numeros.includes(n)) consecutivasDesdeV1 = n;
      else break;
    }

    const tieneBaseFuerte =
      variables.includes('V1') &&
      variables.includes('V2') &&
      variables.includes('V3') &&
      variables.includes('V4') &&
      variables.includes('V5') &&
      variables.includes('V6');

    const esCandidata = tieneBaseFuerte && consecutivasDesdeV1 >= 6;

    const bonusVariables = [
      'V16', 'V24', 'V28', 'V29', 'V30', 'V33', 'V34', 'V35', 'V36', 'V37', 'V38', 'V39', 'V40',
      'V41', 'V42', 'V43', 'V44', 'V45', 'V46', 'V46_1', 'V46_2', 'V46_3', 'V46_4', 'V46_5', 'V46_6', 'V46_7', 'V46_8',
      'V47', 'V48', 'V49', 'V50', 'V51', 'V52',
      'V53', 'V53_1', 'V53_2', 'V53_3', 'V53_4', 'V53_5', 'V53_6', 'V53_7', 'V53_8', 'V53_9',
      'V54', 'V55', 'V56', 'V57', 'V58', 'V59', 'V60',
      'V61', 'V62', 'V63', 'V64', 'V65',
      'V66', 'V66_1', 'V66_2', 'V66_3', 'V66_4', 'V66_5', 'V66_6', 'V66_7', 'V66_8', 'V66_9', 'V67', 'V68', 'V69', 'V70', 'V71', 'V72', 'V73', 'V74', 'V75', 'V76', 'V77', 'V78', 'V79', 'V80', 'V81', 'V82', 'V83', 'V84', 'V85', 'V86', 'V87', 'V88', 'V89', 'V90', 'V91', 'V92', 'V93', 'V94', 'V95', 'V96', 'V97', 'V98', 'V99', 'V100', 'V101', 'V102', 'V103', 'V104', 'V105', 'V106', 'V107', 'V108', 'V109', 'V110', 'V111', 'V112', 'V113', 'V114', 'V114_1', 'V114_2', 'V114_3', 'V114_4', 'V114_5', 'V114_6', 'V115', 'V116', 'V117', 'V118', 'V119', 'V120', 'V121', 'V122', 'V123', 'V124', 'V125', 'V126', 'V127', 'V128', 'V129', 'V130', 'V131', 'V134', 'V132', 'V133'
    ];

    const bonus = bonusVariables.reduce((suma, variable) => suma + (variables.includes(variable) ? 30 : 0), 0);
    const puntaje = consecutivasDesdeV1 * 100 + variables.length * 5 + bonus;

    return { esCandidata, puntaje, consecutivasDesdeV1, variables, mapeos };
  }

  function detectarFilaEncabezados(matriz) {
    let mejor = null;
    const limite = Math.min(matriz.length, 80);

    for (let indice = 0; indice < limite; indice += 1) {
      const analisis = analizarFilaEncabezados(matriz[indice]);
      if (!analisis.esCandidata) continue;

      if (!mejor || analisis.puntaje > mejor.puntaje) {
        mejor = { ...analisis, indice, filaExcel: indice + 1 };
      }
    }

    if (!mejor) {
      return { indice: -1, filaExcel: null, variables: [], mapeos: [], consecutivasDesdeV1: 0 };
    }

    return mejor;
  }

  function obtenerMatrizHoja(libro, nombreHoja) {
    const hoja = libro.Sheets[nombreHoja];
    if (!hoja) return [];

    return XLSX.utils.sheet_to_json(hoja, { header: 1, defval: '', blankrows: false, raw: true });
  }

  async function leerLibroExcel(archivo) {
    const buffer = await archivo.arrayBuffer();
    const libro = XLSX.read(buffer, { type: 'array', cellDates: true, raw: true });

    return { libro, hojas: Array.isArray(libro.SheetNames) ? libro.SheetNames : [] };
  }

  function valorNormalizado(variable, valor) {
    if (CAMPOS_FECHA.includes(variable)) return serialToDate(valor);
    if (celdaVacia(valor)) return '';
    return texto(valor);
  }

  function filaParecePaciente(registro) {
    const valoresBase = [registro.V1, registro.V2, registro.V3, registro.V4, registro.V5, registro.V6, registro.V7, registro.V8]
      .filter((valor) => !celdaVacia(valor)).length;

    const tieneIdentificacion = !celdaVacia(registro.V5) || !celdaVacia(registro.V6);
    const tieneNombre = !celdaVacia(registro.V1) || !celdaVacia(registro.V3);

    return valoresBase >= 3 && (tieneIdentificacion || tieneNombre);
  }

  function construirRegistroDesdeFila(filaOriginal, mapeos, nombreHoja, filaExcel) {
    const registro = { __filaExcel: filaExcel, __fila: filaExcel, __hoja: nombreHoja };

    mapeos.forEach(({ indiceColumna, variable, encabezadoOriginal }) => {
      registro[variable] = valorNormalizado(variable, filaOriginal[indiceColumna]);
      registro[`__encabezado_${variable}`] = encabezadoOriginal;
      registro[`__columna_${variable}`] = indiceColumna + 1;
    });

    return registro;
  }

  function extraerDatosHoja({ libro, nombreHoja }) {
    if (!libro || !nombreHoja) {
      throw new Error('No se recibió libro u hoja para procesar.');
    }

    const matriz = obtenerMatrizHoja(libro, nombreHoja);

    if (!matriz.length) {
      return { nombreHoja, encabezados: [], encabezadosOriginales: [], filas: [], registros: [], totalFilas: 0, filaEncabezados: null, filaInicioDatos: null, matrizOriginal: matriz, mapeos: [], errorEstructura: 'La hoja está vacía.' };
    }

    const deteccion = detectarFilaEncabezados(matriz);

    if (deteccion.indice < 0) {
      return { nombreHoja, encabezados: [], encabezadosOriginales: [], filas: [], registros: [], totalFilas: 0, filaEncabezados: null, filaInicioDatos: null, matrizOriginal: matriz, mapeos: [], deteccionEncabezados: deteccion, errorEstructura: 'No se detectó una fila válida de encabezados CAC.' };
    }

    const filaEncabezadosIndice = deteccion.indice;
    const filaEncabezados = filaEncabezadosIndice + 1;
    const filaInicioDatos = filaEncabezados + 1;
    const mapeos = deteccion.mapeos;
    const encabezados = mapeos.map((m) => m.variable);
    const encabezadosOriginales = mapeos.map((m) => m.encabezadoOriginal);
    const registros = [];

    for (let indiceMatriz = filaEncabezadosIndice + 1; indiceMatriz < matriz.length; indiceMatriz += 1) {
      const filaOriginal = matriz[indiceMatriz];
      if (filaVacia(filaOriginal)) continue;

      const filaExcel = indiceMatriz + 1;
      const registro = construirRegistroDesdeFila(filaOriginal, mapeos, nombreHoja, filaExcel);
      if (!filaParecePaciente(registro)) continue;

      registros.push(registro);
    }

    console.log(`Hoja "${nombreHoja}": encabezados en fila ${filaEncabezados}, datos desde fila ${filaInicioDatos}, ${registros.length} pacientes leídos.`);

    return {
      nombreHoja,
      encabezados,
      encabezadosOriginales,
      cabeceras: encabezados,
      filas: registros,
      registros,
      totalFilas: registros.length,
      filaEncabezados,
      filaEncabezadosIndice,
      filaInicioDatos,
      matrizOriginal: matriz,
      mapeos,
      deteccionEncabezados: { filaExcel: deteccion.filaExcel, variables: deteccion.variables, consecutivasDesdeV1: deteccion.consecutivasDesdeV1 }
    };
  }

  window.CACLectorExcel = {
    CAMPOS_FECHA,
    VARIABLES_VALIDABLES,
    leerLibroExcel,
    extraerDatosHoja,
    detectarFilaEncabezados,
    normalizarEncabezado,
    serialToDate
  };
})();
