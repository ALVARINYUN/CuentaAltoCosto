(function () {
  'use strict';

  const CAMPOS_FECHA = [
    'V7', 'V16',
    'V18', 'V19', 'V20', 'V23', 'V24',
    'V26',
    'V30', 'V32', 'V35', 'V39', 'V43'
  ];

  // Variables válidas acumuladas hasta Sprint 3C.
  // V1-V45: incluye V45 para que el lector no la descarte.
  const VARIABLES_VALIDABLES = Array.from({ length: 45 }, (_, i) => `V${i + 1}`);

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

    // Fallback seguro si estructura.js no cargara:
    // captura el número completo después de "v".
    // Permite V1-V45.
    const match = limpio.match(/^v(\d{1,3})/);

    if (match) {
      const numero = Number(match[1]);

      if (Number.isInteger(numero) && numero >= 1 && numero <= 45) {
        return `V${numero}`;
      }
    }

    return texto(valor).toUpperCase();
  }

  function esVariableValida(variable) {
    return VARIABLES_VALIDABLES.includes(variable);
  }

  function numeroVariable(variable) {
    const match = texto(variable).match(/^V(\d+)$/);
    return match ? Number(match[1]) : null;
  }

  function analizarFilaEncabezados(fila) {
    const mapeos = [];
    const variablesYaMapeadas = new Set();

    if (filaVacia(fila)) {
      return {
        esCandidata: false,
        puntaje: 0,
        consecutivasDesdeV1: 0,
        variables: [],
        mapeos: []
      };
    }

    fila.forEach((celda, indiceColumna) => {
      const variable = normalizarEncabezado(celda);

      // No se permite que una columna posterior sobrescriba una variable
      // que ya fue detectada antes. Esto protege el mapeo real V1-V33.
      if (esVariableValida(variable) && !variablesYaMapeadas.has(variable)) {
        variablesYaMapeadas.add(variable);

        mapeos.push({
          indiceColumna,
          variable,
          encabezadoOriginal: texto(celda)
        });
      }
    });

    const variables = [...new Set(mapeos.map((m) => m.variable))];
    const numeros = variables.map(numeroVariable).filter(Number.isFinite).sort((a, b) => a - b);

    let consecutivasDesdeV1 = 0;

    for (let n = 1; n <= 45; n += 1) {
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

    const puntaje =
      consecutivasDesdeV1 * 100 +
      variables.length * 5 +
      (variables.includes('V16') ? 20 : 0) +
      (variables.includes('V24') ? 20 : 0) +
      (variables.includes('V28') ? 20 : 0) +
      (variables.includes('V29') ? 30 : 0) +
      (variables.includes('V30') ? 30 : 0) +
      (variables.includes('V33') ? 30 : 0) +
      (variables.includes('V34') ? 30 : 0) +
      (variables.includes('V35') ? 30 : 0) +
      (variables.includes('V36') ? 30 : 0) +
      (variables.includes('V37') ? 30 : 0) +
      (variables.includes('V38') ? 30 : 0) +
      (variables.includes('V39') ? 30 : 0) +
      (variables.includes('V40') ? 30 : 0) +
      (variables.includes('V41') ? 30 : 0) +
      (variables.includes('V42') ? 30 : 0) +
      (variables.includes('V43') ? 30 : 0) +
      (variables.includes('V44') ? 30 : 0) +
      (variables.includes('V45') ? 30 : 0);

    return {
      esCandidata,
      puntaje,
      consecutivasDesdeV1,
      variables,
      mapeos
    };
  }

  function detectarFilaEncabezados(matriz) {
    let mejor = null;
    const limite = Math.min(matriz.length, 80);

    for (let indice = 0; indice < limite; indice += 1) {
      const analisis = analizarFilaEncabezados(matriz[indice]);

      if (!analisis.esCandidata) continue;

      if (!mejor || analisis.puntaje > mejor.puntaje) {
        mejor = {
          ...analisis,
          indice,
          filaExcel: indice + 1
        };
      }
    }

    if (!mejor) {
      return {
        indice: -1,
        filaExcel: null,
        variables: [],
        mapeos: [],
        consecutivasDesdeV1: 0
      };
    }

    return mejor;
  }

  function obtenerMatrizHoja(libro, nombreHoja) {
    const hoja = libro.Sheets[nombreHoja];

    if (!hoja) return [];

    return XLSX.utils.sheet_to_json(hoja, {
      header: 1,
      defval: '',
      blankrows: false,
      raw: true
    });
  }

  async function leerLibroExcel(archivo) {
    const buffer = await archivo.arrayBuffer();
    const libro = XLSX.read(buffer, {
      type: 'array',
      cellDates: true,
      raw: true
    });

    return {
      libro,
      hojas: Array.isArray(libro.SheetNames) ? libro.SheetNames : []
    };
  }

  function valorNormalizado(variable, valor) {
    if (CAMPOS_FECHA.includes(variable)) return serialToDate(valor);

    if (celdaVacia(valor)) return '';

    return texto(valor);
  }

  function filaParecePaciente(registro) {
    const valoresBase = [
      registro.V1, registro.V2, registro.V3, registro.V4,
      registro.V5, registro.V6, registro.V7, registro.V8
    ].filter((valor) => !celdaVacia(valor)).length;

    const tieneIdentificacion = !celdaVacia(registro.V5) || !celdaVacia(registro.V6);
    const tieneNombre = !celdaVacia(registro.V1) || !celdaVacia(registro.V3);

    return valoresBase >= 3 && (tieneIdentificacion || tieneNombre);
  }

  function construirRegistroDesdeFila(filaOriginal, mapeos, nombreHoja, filaExcel) {
    const registro = {
      __filaExcel: filaExcel,
      __fila: filaExcel,
      __hoja: nombreHoja
    };

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
      return {
        nombreHoja,
        encabezados: [],
        encabezadosOriginales: [],
        filas: [],
        registros: [],
        totalFilas: 0,
        filaEncabezados: null,
        filaInicioDatos: null,
        matrizOriginal: matriz,
        mapeos: [],
        errorEstructura: 'La hoja está vacía.'
      };
    }

    const deteccion = detectarFilaEncabezados(matriz);

    if (deteccion.indice < 0) {
      return {
        nombreHoja,
        encabezados: [],
        encabezadosOriginales: [],
        filas: [],
        registros: [],
        totalFilas: 0,
        filaEncabezados: null,
        filaInicioDatos: null,
        matrizOriginal: matriz,
        mapeos: [],
        deteccionEncabezados: deteccion,
        errorEstructura: 'No se detectó una fila válida de encabezados CAC.'
      };
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

    console.log(
      `Hoja "${nombreHoja}": encabezados en fila ${filaEncabezados}, datos desde fila ${filaInicioDatos}, ${registros.length} pacientes leídos.`
    );

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
      deteccionEncabezados: {
        filaExcel: deteccion.filaExcel,
        variables: deteccion.variables,
        consecutivasDesdeV1: deteccion.consecutivasDesdeV1
      }
    };
  }

  const api = {
    CAMPOS_FECHA,
    VARIABLES_VALIDABLES,
    leerLibroExcel,
    extraerDatosHoja,
    detectarFilaEncabezados,
    normalizarEncabezado,
    serialToDate
  };

  window.CACLectorExcel = api;
})();
