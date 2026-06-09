(function () {
  'use strict';

  const CAMPOS_FECHA = [
    'V7', 'V16',
    'V18', 'V19', 'V20', 'V23', 'V24',
    'V26',
    'V30', 'V32', 'V35', 'V39', 'V43', 'V49', 'V58', 'V62'
  ];

  // Variables válidas acumuladas hasta Sprint 3E.
  // V1-V53.4 + V46_1-V46_8: incluye subfases reales V46.1 a V46.8.
  // V53 inicia el Módulo 11; V53.1, V53.2, V53.3 y V53.4 validan medicamentos administrados mediante ATC.
  const VARIABLES_VALIDABLES = [
    ...Array.from({ length: 46 }, (_, i) => `V${i + 1}`),
    'V46_1',
    'V46_2',
    'V46_3',
    'V46_4',
    'V46_5',
    'V46_6',
    'V46_7',
    'V46_8',
    'V47',
    'V48',
    'V49',
    'V50',
    'V51',
    'V52',
    'V53',
    'V53_1',
    'V53_2',
    'V53_3',
    'V53_4',
    'V53_5',
    'V53_6',
    'V53_7',
    'V53_8',
    'V53_9',
    'V54',
    'V55',
    'V56',
    'V57',
    'V58',
    'V59',
    'V60',
    'V61',
    'V62',
    'V63',
    'V64',
    'V65',
    'V66'
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

    // Fallback seguro si estructura.js no cargara:
    // Permite reconocer V53.1-V53.9, V54-V66 y encabezados reales de la matriz.
    if (limpio === 'v66' || limpio === 'v66cuantosmedicamentosantineopls' || limpio.startsWith('v66cuantosmedicamentos') || limpio.startsWith('v66cuntosmedicamentos') || (limpio.startsWith('v66') && (limpio.includes('medicamentos') || limpio.includes('numero') || limpio.includes('nmero')))) {
      return 'V66';
    }

    if (limpio === 'v65' || limpio === 'v65cdigodelaips2quesuministraell' || limpio.startsWith('v65codigodelaips2') || limpio.startsWith('v65cdigodelaips2') || (limpio.startsWith('v65') && (limpio.includes('ips2') || limpio.includes('codigo') || limpio.includes('cdigo')))) {
      return 'V65';
    }

    if (limpio === 'v64' || limpio === 'v64cdigodelaips1quesuministraell' || limpio.startsWith('v64codigodelaips1') || limpio.startsWith('v64cdigodelaips1') || (limpio.startsWith('v64') && (limpio.includes('ips1') || limpio.includes('codigo') || limpio.includes('cdigo')))) {
      return 'V64';
    }

    if (limpio === 'v62' || limpio.startsWith('v62fechadeinicio') || (limpio.startsWith('v62') && limpio.includes('fecha') && limpio.includes('inicio'))) {
      return 'V62';
    }

    if (limpio === 'v61' || limpio.startsWith('v61ubicaciontemporal') || (limpio.startsWith('v61') && limpio.includes('esquema'))) {
      return 'V61';
    }

    if (limpio === 'v60' || limpio.startsWith('v60motivofinalizacion') || limpio.startsWith('v60motivodelafinalizacion') || (limpio.startsWith('v60') && limpio.includes('motivo'))) {
      return 'V60';
    }

    if (limpio === 'v59' || limpio.startsWith('v59caracteristicas') || (limpio.startsWith('v59') && limpio.includes('esquema'))) {
      return 'V59';
    }

    if (limpio === 'v58' || limpio.startsWith('v58fecha') || (limpio.startsWith('v58') && (limpio.includes('finalizacion') || limpio.includes('finalizacin') || limpio.includes('final') || limpio.includes('termino') || limpio.includes('termino')))) {
      return 'V58';
    }

    if (limpio === 'v56' || limpio.startsWith('v56medicamento') || (limpio.startsWith('v56') && (limpio.includes('antineoplasic') || limpio.includes('terapiahormonal') || limpio.includes('adicional')))) {
      return 'V56';
    }

    if (limpio === 'v55' || limpio.startsWith('v55medicamento') || (limpio.startsWith('v55') && (limpio.includes('antineoplasic') || limpio.includes('terapiahormonal') || limpio.includes('adicional')))) {
      return 'V55';
    }

    if (limpio === 'v54' || limpio.startsWith('v54medicamento') || (limpio.startsWith('v54') && (limpio.includes('antineoplasic') || limpio.includes('terapiahormonal') || limpio.includes('adicional')))) {
      return 'V54';
    }

    if (limpio === 'v539' || limpio.startsWith('v539medicamentoadm9') || (limpio.startsWith('v539') && limpio.includes('medicamento'))) {
      return 'V53_9';
    }

    if (limpio === 'v538' || limpio.startsWith('v538medicamentoadm8') || (limpio.startsWith('v538') && limpio.includes('medicamento'))) {
      return 'V53_8';
    }

    if (limpio === 'v537' || limpio.startsWith('v537medicamentoadm7') || (limpio.startsWith('v537') && limpio.includes('medicamento'))) {
      return 'V53_7';
    }

    if (limpio === 'v536' || limpio.startsWith('v536medicamentoadm6') || (limpio.startsWith('v536') && limpio.includes('medicamento'))) {
      return 'V53_6';
    }

    if (limpio === 'v535' || limpio.startsWith('v535medicamentoadm5') || (limpio.startsWith('v535') && limpio.includes('medicamento'))) {
      return 'V53_5';
    }

    if (limpio === 'v534' || limpio.startsWith('v534medicamentoadm4') || (limpio.startsWith('v534') && limpio.includes('medicamento'))) {
      return 'V53_4';
    }

    if (limpio === 'v533' || limpio.startsWith('v533medicamentoadm3') || (limpio.startsWith('v533') && limpio.includes('medicamento'))) {
      return 'V53_3';
    }

    if (limpio === 'v532' || limpio.startsWith('v532medicamentoadm2') || (limpio.startsWith('v532') && limpio.includes('medicamento'))) {
      return 'V53_2';
    }

    if (limpio === 'v531' || limpio.startsWith('v531medicamentoadm1') || (limpio.startsWith('v531') && limpio.includes('medicamento'))) {
      return 'V53_1';
    }

    if (limpio === 'v53' || limpio.startsWith('v53cantidadmedictosantineoplasic') || limpio.startsWith('v53cantidadmedicamentosantineoplasicos') || (limpio.startsWith('v53') && limpio.includes('cantidad') && (limpio.includes('medicto') || limpio.includes('medicamento') || limpio.includes('antineoplasic')))) {
      return 'V53';
    }

    if (limpio === 'v52' || limpio.startsWith('v52cdigodelaips2') || limpio.startsWith('v52codigodelaips2') || (limpio.startsWith('v52') && limpio.includes('ips2'))) {
      return 'V52';
    }

    if (limpio === 'v51' || limpio.startsWith('v51cdigodelaips1') || limpio.startsWith('v51codigodelaips1') || (limpio.startsWith('v51') && limpio.includes('ips1'))) {
      return 'V51';
    }

    if (limpio === 'v50' || limpio.startsWith('v50nmerodeips') || limpio.startsWith('v50numerodeips') || (limpio.startsWith('v50') && limpio.includes('ips'))) {
      return 'V50';
    }

    if (limpio === 'v49' || limpio.startsWith('v49fechadeinicio') || (limpio.startsWith('v49') && limpio.includes('fecha') && limpio.includes('inicio'))) {
      return 'V49';
    }

    if (limpio === 'v48' || limpio.startsWith('v48ubicaciontemporal') || (limpio.startsWith('v48') && limpio.includes('esquema'))) {
      return 'V48';
    }

    if (limpio === 'v47' || limpio.startsWith('v47numerodeciclosiniciadosyadministrados')) {
      return 'V47';
    }

    if (limpio === 'v468' || limpio.startsWith('v468recibilafasedequimioterapiao')) {
      return 'V46_8';
    }

    if (limpio === 'v467' || limpio.startsWith('v467recibilafasedequimioterapiam')) {
      return 'V46_7';
    }

    if (limpio === 'v466' || limpio.startsWith('v466recibilafasedequimioterapiam')) {
      return 'V46_6';
    }

    if (limpio === 'v465' || limpio.startsWith('v465recibilafasedequimioterapiar')) {
      return 'V46_5';
    }

    if (limpio === 'v464' || limpio.startsWith('v464recibilafasedequimioterapiac')) {
      return 'V46_4';
    }

    if (limpio === 'v463' || limpio.startsWith('v463recibilafasedequimioterapiai')) {
      return 'V46_3';
    }

    if (limpio === 'v462' || limpio.startsWith('v462recibilafasedequimioterapiai')) {
      return 'V46_2';
    }

    if (limpio === 'v461' || limpio.startsWith('v461recibilafasedequimioterapiap')) {
      return 'V46_1';
    }

    // Permite V1-V53. Las subvariables como V53.1 se reconocen arriba de forma explícita.
    const match = limpio.match(/^v(\d{1,3})/);

    if (match) {
      const numero = Number(match[1]);

      if (Number.isInteger(numero) && numero >= 1 && numero <= 66) {
        return `V${numero}`;
      }
    }

    return texto(valor).toUpperCase();
  }

  function esVariableValida(variable) {
    return VARIABLES_VALIDABLES.includes(variable);
  }

  function numeroVariable(variable) {
    if (texto(variable) === 'V46_1') return 46.1;
    if (texto(variable) === 'V46_2') return 46.2;
    if (texto(variable) === 'V46_3') return 46.3;
    if (texto(variable) === 'V46_4') return 46.4;
    if (texto(variable) === 'V46_5') return 46.5;
    if (texto(variable) === 'V46_6') return 46.6;
    if (texto(variable) === 'V46_7') return 46.7;
    if (texto(variable) === 'V46_8') return 46.8;
    if (texto(variable) === 'V53_1') return 53.1;
    if (texto(variable) === 'V53_2') return 53.2;
    if (texto(variable) === 'V53_3') return 53.3;
    if (texto(variable) === 'V53_4') return 53.4;
    if (texto(variable) === 'V53_5') return 53.5;
    if (texto(variable) === 'V53_6') return 53.6;
    if (texto(variable) === 'V53_7') return 53.7;
    if (texto(variable) === 'V53_8') return 53.8;
    if (texto(variable) === 'V53_9') return 53.9;
    if (texto(variable) === 'V54') return 54;
    if (texto(variable) === 'V55') return 55;
    if (texto(variable) === 'V56') return 56;
    if (texto(variable) === 'V57') return 57;
    if (texto(variable) === 'V58') return 58;
    if (texto(variable) === 'V59') return 59;
    if (texto(variable) === 'V60') return 60;
    if (texto(variable) === 'V61') return 61;
    if (texto(variable) === 'V62') return 62;
    if (texto(variable) === 'V63') return 63;
    if (texto(variable) === 'V64') return 64;
    if (texto(variable) === 'V65') return 65;
    if (texto(variable) === 'V66') return 66;

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
      // que ya fue detectada antes. Esto protege el mapeo real V1-V53.1.
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

    for (let n = 1; n <= 66; n += 1) {
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
      (variables.includes('V45') ? 30 : 0) +
      (variables.includes('V46') ? 30 : 0) +
      (variables.includes('V46_1') ? 30 : 0) +
      (variables.includes('V46_2') ? 30 : 0) +
      (variables.includes('V46_3') ? 30 : 0) +
      (variables.includes('V46_4') ? 30 : 0) +
      (variables.includes('V46_5') ? 30 : 0) +
      (variables.includes('V46_6') ? 30 : 0) +
      (variables.includes('V46_7') ? 30 : 0) +
      (variables.includes('V46_8') ? 30 : 0) +
      (variables.includes('V47') ? 30 : 0) +
      (variables.includes('V48') ? 30 : 0) +
      (variables.includes('V49') ? 30 : 0) +
      (variables.includes('V50') ? 30 : 0) +
      (variables.includes('V51') ? 30 : 0) +
      (variables.includes('V52') ? 30 : 0) +
      (variables.includes('V53') ? 30 : 0) +
      (variables.includes('V53_1') ? 30 : 0) +
      (variables.includes('V53_2') ? 30 : 0) +
      (variables.includes('V53_3') ? 30 : 0) +
      (variables.includes('V53_4') ? 30 : 0) +
      (variables.includes('V53_5') ? 30 : 0) +
      (variables.includes('V53_6') ? 30 : 0) +
      (variables.includes('V53_7') ? 30 : 0) +
      (variables.includes('V53_8') ? 30 : 0) +
      (variables.includes('V53_9') ? 30 : 0) +
      (variables.includes('V54') ? 30 : 0) +
      (variables.includes('V55') ? 30 : 0) +
      (variables.includes('V56') ? 30 : 0) +
      (variables.includes('V57') ? 30 : 0) +
      (variables.includes('V58') ? 30 : 0) +
      (variables.includes('V59') ? 30 : 0) +
      (variables.includes('V60') ? 30 : 0) +
      (variables.includes('V61') ? 30 : 0) +
      (variables.includes('V62') ? 30 : 0) +
      (variables.includes('V63') ? 30 : 0) +
      (variables.includes('V64') ? 30 : 0) +
      (variables.includes('V65') ? 30 : 0) +
      (variables.includes('V66') ? 30 : 0);

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
