(function () {
  'use strict';

  const VERSION = 'sprint-3c-v47-ciclos-01';

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
    V17: 'Código CIE-10 de la neoplasia maligna reportada',
    V18: 'Fecha de diagnóstico del cáncer reportado',
    V41: 'Intervención médica durante el periodo de reporte',
    V45: 'Recibió quimioterapia u otra terapia sistémica en el periodo de reporte',
    V46: 'Número de fases de quimioterapia recibidas en el periodo de reporte',
    V46_1: 'V46.1 · Prefase o Citorreducción inicial',
    V46_2: 'V46.2 · Inducción',
    V46_3: 'V46.3 · Intensificación',
    V46_4: 'V46.4 · Consolidación',
    V46_5: 'V46.5 · Reinducción',
    V46_6: 'V46.6 · Mantenimiento',
    V46_7: 'V46.7 · Mantenimiento largo o final',
    V46_8: 'V46.8 · Otra fase diferente a las anteriores',
    V47: 'Número de ciclos iniciados y administrados en el periodo de reporte'
  };

  const CATALOGO_V45 = ['1', '98'];
  const CATALOGO_V46_1 = ['1', '2', '97'];
  const CATALOGO_V46_2 = ['1', '2', '97'];
  const CATALOGO_V46_3 = ['1', '2', '97'];
  const CATALOGO_V46_4 = ['1', '2', '97'];
  const CATALOGO_V46_5 = ['1', '2', '97'];
  const CATALOGO_V46_6 = ['1', '2', '97'];
  const CATALOGO_V46_7 = ['1', '2', '97'];
  const CATALOGO_V46_8 = ['1', '2', '97'];
  const CIE10_V46_HEMATOLINFATICOS = ['C835', 'C910', 'C920', 'C924', 'C925'];

  function texto(valor) {
    return String(valor ?? '').trim();
  }

  function textoMayuscula(valor) {
    return texto(valor).toUpperCase();
  }

  function estaVacio(valor) {
    return texto(valor) === '';
  }

  function nombreVariable(variable) {
    return NOMBRES_VARIABLES[variable] || variable;
  }

  function normalizarCIE10(valor) {
    return textoMayuscula(valor).replace(/[^A-Z0-9]/g, '');
  }

  function esCIE10V46Hematolinfatico(valor) {
    return CIE10_V46_HEMATOLINFATICOS.includes(normalizarCIE10(valor));
  }

  function esEnteroNoNegativo(valor) {
    const limpio = texto(valor);
    return /^\d+$/.test(limpio);
  }

  function esEnteroConSigno(valor) {
    const limpio = texto(valor);
    return /^-?\d+$/.test(limpio);
  }

  function esEnteroPositivo(valor) {
    const limpio = texto(valor);
    return /^\d+$/.test(limpio) && Number(limpio) >= 1;
  }

  function obtenerDiagnosticoCIE10(valor) {
    const codigo = normalizarCIE10(valor);

    if (!codigo) return null;

    if (
      window.CACCargadorCatalogos &&
      typeof window.CACCargadorCatalogos.buscarCIE10 === 'function'
    ) {
      return window.CACCargadorCatalogos.buscarCIE10(codigo);
    }

    return null;
  }

  function descripcionDiagnosticoV17(registro) {
    const v17 = normalizarCIE10(registro ? registro.V17 : '');
    const cie10 = obtenerDiagnosticoCIE10(v17);

    if (v17 && cie10 && cie10.descripcion) {
      return `${v17} corresponde a ${cie10.descripcion}.`;
    }

    if (v17) {
      return `${v17} es el código CIE-10 del cáncer reportado en esta línea.`;
    }

    return 'V17 identifica el cáncer reportado en esta línea.';
  }

  function descripcionV18() {
    return 'V18 registra la fecha de diagnóstico del cáncer reportado.';
  }

  function descripcionV41(registro) {
    const v41 = texto(registro ? registro.V41 : '');

    if (v41) {
      return `V41 tiene el valor ${v41}; registra la intervención médica durante el periodo de reporte.`;
    }

    return 'V41 registra la intervención médica durante el periodo de reporte.';
  }

  function descripcionV45(registro) {
    const v45 = texto(registro ? registro.V45 : '');

    if (v45 === '1') {
      return 'V45 tiene el valor 1; indica que recibió quimioterapia u otra terapia sistémica dentro del periodo de reporte.';
    }

    if (v45 === '98') {
      return 'V45 tiene el valor 98; indica que la terapia sistémica no aplica para el cáncer reportado en esta línea.';
    }

    if (v45) {
      return `${v45} es el valor registrado en V45.`;
    }

    return 'V45 registra si recibió quimioterapia u otra terapia sistémica dentro del periodo de reporte.';
  }

  function descripcionV46(registro) {
    const v46 = texto(registro ? registro.V46 : '');

    if (v46 === '0') {
      return 'V46 tiene el valor 0; este valor aplica para C835, C910, C920, C924 o C925 cuando V45=98.';
    }

    if (v46 === '98') {
      return 'V46 tiene el valor 98; este valor aplica cuando el cáncer reportado en V17 es sólido o diferente a los CIE-10 definidos para fases.';
    }

    if (v46) {
      return `${v46} es el valor registrado en V46.`;
    }

    return 'V46 está vacía.';
  }

  function descripcionV46_1(registro) {
    const v46_1 = texto(registro ? registro.V46_1 : '');

    if (v46_1 === '1') {
      return 'V46.1 tiene el valor 1; indica que recibió la fase de Prefase o Citorreducción inicial.';
    }

    if (v46_1 === '2') {
      return 'V46.1 tiene el valor 2; indica que no recibió la fase de Prefase o Citorreducción inicial.';
    }

    if (v46_1 === '97') {
      return 'V46.1 tiene el valor 97; indica que esta fase no aplica para el diagnóstico reportado.';
    }

    if (v46_1) {
      return `${v46_1} es el valor registrado en V46.1.`;
    }

    return 'V46.1 está vacía.';
  }

  function descripcionV46_2(registro) {
    const v46_2 = texto(registro ? registro.V46_2 : '');

    if (v46_2 === '1') {
      return 'V46.2 tiene el valor 1; indica que recibió la fase de quimioterapia denominada Inducción.';
    }

    if (v46_2 === '2') {
      return 'V46.2 tiene el valor 2; indica que no recibió la fase de quimioterapia denominada Inducción.';
    }

    if (v46_2 === '97') {
      return 'V46.2 tiene el valor 97; indica que esta fase no aplica para el diagnóstico reportado.';
    }

    if (v46_2) {
      return `${v46_2} es el valor registrado en V46.2.`;
    }

    return 'V46.2 está vacía.';
  }

  function descripcionV46_3(registro) {
    const v46_3 = texto(registro ? registro.V46_3 : '');

    if (v46_3 === '1') {
      return 'V46.3 tiene el valor 1; indica que recibió la fase de quimioterapia denominada Intensificación.';
    }

    if (v46_3 === '2') {
      return 'V46.3 tiene el valor 2; indica que no recibió la fase de quimioterapia denominada Intensificación.';
    }

    if (v46_3 === '97') {
      return 'V46.3 tiene el valor 97; indica que esta fase no aplica para el diagnóstico reportado.';
    }

    if (v46_3) {
      return `${v46_3} es el valor registrado en V46.3.`;
    }

    return 'V46.3 está vacía.';
  }

  function descripcionV46_4(registro) {
    const v46_4 = texto(registro ? registro.V46_4 : '');

    if (v46_4 === '1') {
      return 'V46.4 tiene el valor 1; indica que recibió la fase de quimioterapia denominada Consolidación.';
    }

    if (v46_4 === '2') {
      return 'V46.4 tiene el valor 2; indica que no recibió la fase de quimioterapia denominada Consolidación.';
    }

    if (v46_4 === '97') {
      return 'V46.4 tiene el valor 97; indica que esta fase no aplica para el diagnóstico reportado.';
    }

    if (v46_4) {
      return `${v46_4} es el valor registrado en V46.4.`;
    }

    return 'V46.4 está vacía.';
  }



  function descripcionV46_5(registro) {
    const v46_5 = texto(registro ? registro.V46_5 : '');

    if (v46_5 === '1') {
      return 'V46.5 tiene el valor 1; indica que recibió la fase de quimioterapia denominada Reinducción.';
    }

    if (v46_5 === '2') {
      return 'V46.5 tiene el valor 2; indica que no recibió la fase de quimioterapia denominada Reinducción.';
    }

    if (v46_5 === '97') {
      return 'V46.5 tiene el valor 97; indica que esta fase no aplica para el diagnóstico reportado.';
    }

    if (v46_5) {
      return `${v46_5} es el valor registrado en V46.5.`;
    }

    return 'V46.5 está vacía.';
  }

  function descripcionV46_6(registro) {
    const v46_6 = texto(registro ? registro.V46_6 : '');

    if (v46_6 === '1') {
      return 'V46.6 tiene el valor 1; indica que recibió la fase de quimioterapia denominada Mantenimiento.';
    }

    if (v46_6 === '2') {
      return 'V46.6 tiene el valor 2; indica que no recibió la fase de quimioterapia denominada Mantenimiento.';
    }

    if (v46_6 === '97') {
      return 'V46.6 tiene el valor 97; indica que esta fase no aplica para el diagnóstico reportado.';
    }

    if (v46_6) {
      return `${v46_6} es el valor registrado en V46.6.`;
    }

    return 'V46.6 está vacía.';
  }

  function descripcionV46_7(registro) {
    const v46_7 = texto(registro ? registro.V46_7 : '');

    if (v46_7 === '1') {
      return 'V46.7 tiene el valor 1; indica que recibió la fase de quimioterapia denominada Mantenimiento largo o final.';
    }

    if (v46_7 === '2') {
      return 'V46.7 tiene el valor 2; indica que no recibió la fase de quimioterapia denominada Mantenimiento largo o final.';
    }

    if (v46_7 === '97') {
      return 'V46.7 tiene el valor 97; indica que esta fase no aplica para el diagnóstico reportado.';
    }

    if (v46_7) {
      return `${v46_7} es el valor registrado en V46.7.`;
    }

    return 'V46.7 está vacía.';
  }

  function descripcionV46_8(registro) {
    const v46_8 = texto(registro ? registro.V46_8 : '');

    if (v46_8 === '1') {
      return 'V46.8 tiene el valor 1; indica que recibió otra fase de quimioterapia diferente a las anteriores.';
    }

    if (v46_8 === '2') {
      return 'V46.8 tiene el valor 2; indica que no recibió otra fase de quimioterapia diferente a las anteriores.';
    }

    if (v46_8 === '97') {
      return 'V46.8 tiene el valor 97; indica que esta fase no aplica para el diagnóstico reportado.';
    }

    if (v46_8) {
      return `${v46_8} es el valor registrado en V46.8.`;
    }

    return 'V46.8 está vacía.';
  }

  function descripcionV47(registro) {
    const v47 = texto(registro ? registro.V47 : '');

    if (v47 === '98') {
      return 'V47 tiene el valor 98; indica que no aplica o que no recibió terapia sistémica, de acuerdo con V45.';
    }

    if (esEnteroPositivo(v47)) {
      return `V47 tiene el valor ${v47}; registra el número de ciclos iniciados y administrados en el periodo de reporte.`;
    }

    if (v47) {
      return `${v47} es el valor registrado en V47.`;
    }

    return 'V47 está vacía.';
  }

  function dato(registro, variable, nota = '') {
    const valor = texto(registro ? registro[variable] : '');

    if (window.CACTipos && typeof window.CACTipos.crearDatoRelacionado === 'function') {
      return CACTipos.crearDatoRelacionado(
        variable,
        nombreVariable(variable),
        valor,
        nota
      );
    }

    return {
      variable,
      nombre: nombreVariable(variable),
      valor,
      nota
    };
  }

  function datosContextoV45(registro, notaV45) {
    return [
      dato(registro, 'V17', descripcionDiagnosticoV17(registro)),
      dato(registro, 'V18', descripcionV18()),
      dato(registro, 'V41', descripcionV41(registro)),
      dato(registro, 'V45', notaV45)
    ];
  }

  function datosContextoV46(registro, notaV46) {
    return [
      dato(registro, 'V17', descripcionDiagnosticoV17(registro)),
      dato(registro, 'V45', descripcionV45(registro)),
      dato(registro, 'V46', notaV46 || descripcionV46(registro))
    ];
  }

  function datosContextoV46_1(registro, notaV46_1) {
    return [
      dato(registro, 'V17', descripcionDiagnosticoV17(registro)),
      dato(registro, 'V46_1', notaV46_1 || descripcionV46_1(registro))
    ];
  }

  function datosContextoV46_2(registro, notaV46_2) {
    return [
      dato(registro, 'V17', descripcionDiagnosticoV17(registro)),
      dato(registro, 'V46_2', notaV46_2 || descripcionV46_2(registro))
    ];
  }

  function datosContextoV46_3(registro, notaV46_3) {
    return [
      dato(registro, 'V17', descripcionDiagnosticoV17(registro)),
      dato(registro, 'V46_3', notaV46_3 || descripcionV46_3(registro))
    ];
  }

  function datosContextoV46_4(registro, notaV46_4) {
    return [
      dato(registro, 'V17', descripcionDiagnosticoV17(registro)),
      dato(registro, 'V46_4', notaV46_4 || descripcionV46_4(registro))
    ];
  }



  function datosContextoV46_5(registro, notaV46_5) {
    return [
      dato(registro, 'V17', descripcionDiagnosticoV17(registro)),
      dato(registro, 'V46_5', notaV46_5 || descripcionV46_5(registro))
    ];
  }

  function datosContextoV46_6(registro, notaV46_6) {
    return [
      dato(registro, 'V17', descripcionDiagnosticoV17(registro)),
      dato(registro, 'V46_6', notaV46_6 || descripcionV46_6(registro))
    ];
  }

  function datosContextoV46_7(registro, notaV46_7) {
    return [
      dato(registro, 'V17', descripcionDiagnosticoV17(registro)),
      dato(registro, 'V46_7', notaV46_7 || descripcionV46_7(registro))
    ];
  }

  function datosContextoV46_8(registro, notaV46_8) {
    return [
      dato(registro, 'V17', descripcionDiagnosticoV17(registro)),
      dato(registro, 'V46_8', notaV46_8 || descripcionV46_8(registro))
    ];
  }

  function datosContextoV47(registro, notaV47) {
    return [
      dato(registro, 'V45', descripcionV45(registro)),
      dato(registro, 'V47', notaV47 || descripcionV47(registro))
    ];
  }

  function catalogoPermitidoV45() {
    return [
      'Catálogo permitido V45:',
      '1 = Sí recibió quimioterapia u otra terapia sistémica dentro del periodo de reporte.',
      '98 = No aplica; no está indicada esta terapia.'
    ].join('\n');
  }

  function catalogoPermitidoV46() {
    return [
      'Valores permitidos V46:',
      '0 = Aplica cuando V17 es C835, C910, C920, C924 o C925 y V45=98.',
      '98 = Aplica cuando V17 es un tumor sólido o un cáncer diferente a C835, C910, C920, C924 o C925.'
    ].join('\n');
  }

  function catalogoPermitidoV46_1() {
    return [
      'Valores permitidos para V46.1:',
      '1 = Sí recibió la fase de Prefase o Citorreducción inicial.',
      '2 = No recibió la fase de Prefase o Citorreducción inicial.',
      '97 = No aplica; no es leucemia linfoide o mieloide aguda ni linfoma linfoblástico.'
    ].join('\n');
  }

  function catalogoPermitidoV46_2() {
    return [
      'Valores permitidos para V46.2:',
      '1 = Sí recibió la fase de quimioterapia denominada Inducción.',
      '2 = No recibió la fase de quimioterapia denominada Inducción.',
      '97 = No aplica; no es leucemia linfoide o mieloide aguda ni linfoma linfoblástico.'
    ].join('\n');
  }



  function catalogoPermitidoV46_3() {
    return [
      'Valores permitidos para V46.3:',
      '1 = Sí recibió la fase de quimioterapia denominada Intensificación.',
      '2 = No recibió la fase de quimioterapia denominada Intensificación.',
      '97 = No aplica; no es leucemia linfoide o mieloide aguda ni linfoma linfoblástico.'
    ].join('\n');
  }


  function catalogoPermitidoV46_4() {
    return [
      'Valores permitidos para V46.4:',
      '1 = Sí recibió la fase de quimioterapia denominada Consolidación.',
      '2 = No recibió la fase de quimioterapia denominada Consolidación.',
      '97 = No aplica; no es leucemia linfoide o mieloide aguda ni linfoma linfoblástico.'
    ].join('\n');
  }



  function catalogoPermitidoV46_5() {
    return [
      'Valores permitidos para V46.5:',
      '1 = Sí recibió la fase de quimioterapia denominada Reinducción.',
      '2 = No recibió la fase de quimioterapia denominada Reinducción.',
      '97 = No aplica; no es leucemia linfoide o mieloide aguda ni linfoma linfoblástico.'
    ].join('\n');
  }

  function catalogoPermitidoV46_6() {
    return [
      'Valores permitidos para V46.6:',
      '1 = Sí recibió la fase de quimioterapia denominada Mantenimiento.',
      '2 = No recibió la fase de quimioterapia denominada Mantenimiento.',
      '97 = No aplica; no es leucemia linfoide o mieloide aguda ni linfoma linfoblástico.'
    ].join('\n');
  }

  function catalogoPermitidoV46_7() {
    return [
      'Valores permitidos para V46.7:',
      '1 = Sí recibió la fase de quimioterapia denominada Mantenimiento largo o final.',
      '2 = No recibió la fase de quimioterapia denominada Mantenimiento largo o final.',
      '97 = No aplica; no es leucemia linfoide o mieloide aguda ni linfoma linfoblástico.'
    ].join('\n');
  }

  function catalogoPermitidoV46_8() {
    return [
      'Valores permitidos para V46.8:',
      '1 = Sí recibió otra fase de quimioterapia diferente a las anteriores.',
      '2 = No recibió otra fase de quimioterapia diferente a las anteriores.',
      '97 = No aplica; no es leucemia linfoide o mieloide aguda ni linfoma linfoblástico.'
    ].join('\n');
  }

  function catalogoPermitidoV47() {
    return [
      'Valores permitidos para V47:',
      'Número entero mayor o igual a 1 = número de ciclos iniciados y administrados durante el periodo de reporte.',
      '98 = No aplica o no recibió terapia sistémica, aunque fue formulada; corresponde cuando V45=98.'
    ].join('\n');
  }

  function crearHallazgo({
    codigo,
    variable,
    valor,
    titulo,
    mensaje,
    regla,
    recomendacion,
    severidad = SEVERIDAD.ERROR,
    tipo = TIPO.FORMATO,
    datosRelacionados = null,
    columnasCorregir = null
  }) {
    return {
      codigo,
      variable,
      valor: texto(valor),
      titulo,
      mensaje,
      regla,
      recomendacion,
      severidad,
      tipo,
      datosRelacionados: datosRelacionados || [],
      columnasCorregir: columnasCorregir || [variable]
    };
  }

  function crearHallazgoRegistro(registro, opciones) {
    return crearHallazgo({
      ...opciones,
      valor: opciones.valor ?? registro[opciones.variable],
      datosRelacionados: opciones.datosRelacionados || [dato(registro, opciones.variable)],
      columnasCorregir: opciones.columnasCorregir || [opciones.variable]
    });
  }

  function validarV45(registro, hallazgos) {
    if (!Object.prototype.hasOwnProperty.call(registro, 'V45')) return;

    const v45 = texto(registro.V45);

    if (estaVacio(v45)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V45-ERROR-001',
        variable: 'V45',
        titulo: 'Terapia sistémica sin registrar',
        mensaje: 'V45 está vacía. Debe indicar si el usuario recibió quimioterapia u otra terapia sistémica dentro del periodo de reporte o si esta no aplica.',
        regla: [
          'V45 define si aplica el bloque de terapia sistémica para el cáncer reportado en V17 o sus metástasis.',
          'Si V45 queda vacía, no se puede establecer si corresponde registrar tratamiento sistémico o marcarlo como no aplica.',
          '',
          catalogoPermitidoV45()
        ].join('\n'),
        recomendacion: 'Revise el soporte clínico y registre 1 si recibió terapia sistémica o 98 si esta terapia no aplica.',
        tipo: TIPO.FORMATO,
        datosRelacionados: datosContextoV45(registro, 'V45 está vacía.'),
        columnasCorregir: ['V45']
      }));
      return;
    }

    if (!CATALOGO_V45.includes(v45)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V45-ERROR-002',
        variable: 'V45',
        titulo: 'Código de terapia sistémica no permitido',
        mensaje: `V45 tiene el valor ${v45}. Ese valor no es válido para esta variable. En V45 solo se permite registrar 1 o 98.`,
        regla: [
          'V45 define si aplica el bloque de terapia sistémica para el cáncer reportado en V17 o sus metástasis.',
          '',
          catalogoPermitidoV45()
        ].join('\n'),
        recomendacion: 'Cambie V45 por 1 o 98 según el soporte clínico.',
        tipo: TIPO.CATALOGO,
        datosRelacionados: datosContextoV45(registro, `${v45} no pertenece al catálogo permitido para V45.`),
        columnasCorregir: ['V45']
      }));
    }
  }

  function validarV46(registro, hallazgos) {
    if (!Object.prototype.hasOwnProperty.call(registro, 'V46')) return;

    const v17 = normalizarCIE10(registro.V17);
    const v45 = texto(registro.V45);
    const v46 = texto(registro.V46);
    const esGrupoV46 = esCIE10V46Hematolinfatico(v17);

    if (estaVacio(v46)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V46-ERROR-001',
        variable: 'V46',
        titulo: 'Número de fases de quimioterapia sin registrar',
        mensaje: 'V46 está vacía. Debe registrar el valor que corresponda según V17 y V45.',
        regla: [
          'V46 aplica únicamente para los CIE-10 C835, C910, C920, C924 y C925.',
          'Si V17 pertenece a ese grupo y V45=98, V46 debe ser 0.',
          'Si V17 no pertenece a ese grupo, V46 debe ser 98.',
          '',
          catalogoPermitidoV46()
        ].join('\n'),
        recomendacion: 'Revise V17 y V45. Registre 0 cuando corresponda por hematolinfático con V45=98, o 98 cuando el diagnóstico no pertenezca al grupo definido.',
        tipo: TIPO.FORMATO,
        datosRelacionados: datosContextoV46(registro, 'V46 está vacía.'),
        columnasCorregir: ['V46']
      }));
      return;
    }

    if (!esEnteroNoNegativo(v46)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V46-ERROR-002',
        variable: 'V46',
        titulo: 'Valor de V46 no numérico',
        mensaje: `V46 tiene el valor ${v46}. Ese valor no es numérico y no corresponde a un valor permitido.`,
        regla: [
          'V46 debe registrarse con un valor numérico.',
          'Para las reglas explícitas actuales se validan los valores 0 y 98 según V17 y V45.',
          '',
          catalogoPermitidoV46()
        ].join('\n'),
        recomendacion: 'Cambie V46 por un valor numérico válido según el diagnóstico registrado en V17 y el valor de V45.',
        tipo: TIPO.FORMATO,
        datosRelacionados: datosContextoV46(registro, `${v46} no es un valor numérico válido para V46.`),
        columnasCorregir: ['V46']
      }));
      return;
    }

    if (esGrupoV46 && v45 === '98' && v46 !== '0') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V46-ERROR-003',
        variable: 'V46',
        titulo: 'Valor incorrecto para hematolinfático sin terapia sistémica',
        mensaje: `V17 corresponde a ${v17}, que pertenece al grupo de CIE-10 donde V46 aplica. Como V45=98, V46 debe registrarse con 0.`,
        regla: [
          '0 = Es cáncer hematolinfático con CIE-10 C835, C910, C920, C924 o C925 y en V45 respondió 98.',
          '',
          catalogoPermitidoV46()
        ].join('\n'),
        recomendacion: 'Cambie V46 a 0 cuando V17 sea C835, C910, C920, C924 o C925 y V45 sea 98.',
        tipo: TIPO.COHERENCIA,
        datosRelacionados: datosContextoV46(registro, `${v46} no corresponde; para este caso V46 debe ser 0.`),
        columnasCorregir: ['V46']
      }));
      return;
    }

    if (v17 && !esGrupoV46 && v46 !== '98') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V46-ERROR-004',
        variable: 'V46',
        titulo: 'V46 diferente de 98 en diagnóstico donde no aplica',
        mensaje: `V17 tiene el valor ${v17}. Ese diagnóstico no pertenece a C835, C910, C920, C924 o C925; por tanto, V46 debe registrarse con 98.`,
        regla: [
          '98 = No aplica; es tumor sólido o cáncer diferente a los enunciados en las fases.',
          '',
          catalogoPermitidoV46()
        ].join('\n'),
        recomendacion: 'Cambie V46 a 98 si V17 no es C835, C910, C920, C924 ni C925.',
        tipo: TIPO.COHERENCIA,
        datosRelacionados: datosContextoV46(registro, `${v46} no corresponde; para este diagnóstico V46 debe ser 98.`),
        columnasCorregir: ['V46']
      }));
    }
  }

  function validarSubfaseCatalogo({ registro, hallazgos, variable, codigoBase, tituloFase, descripcionFase, catalogoPermitido, datosContexto }) {
    const v17 = normalizarCIE10(registro.V17);
    const valor = texto(registro[variable]);
    const esGrupoV46 = esCIE10V46Hematolinfatico(v17);

    if (estaVacio(valor)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: `${codigoBase}-ERROR-001`,
        variable,
        titulo: `${tituloFase} sin registrar`,
        mensaje: `${codigoBase} está vacía. Debe registrar si recibió la fase, si no la recibió o si no aplica.`,
        regla: [
          `${codigoBase} corresponde a ${descripcionFase}.`,
          '',
          catalogoPermitido()
        ].join('\n'),
        recomendacion: `Registre 1, 2 o 97 según corresponda para ${codigoBase}.`,
        tipo: TIPO.FORMATO,
        datosRelacionados: datosContexto(registro, `${codigoBase} está vacía.`),
        columnasCorregir: [variable]
      }));
      return;
    }

    if (!['1', '2', '97'].includes(valor)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: `${codigoBase}-ERROR-002`,
        variable,
        titulo: `Código de ${tituloFase} no permitido`,
        mensaje: `${codigoBase} tiene el valor ${valor}. Ese valor no pertenece al catálogo permitido para esta variable.`,
        regla: [
          `${codigoBase} solo permite los valores 1, 2 o 97.`,
          '',
          catalogoPermitido()
        ].join('\n'),
        recomendacion: `Cambie ${codigoBase} por 1, 2 o 97 según corresponda.`,
        tipo: TIPO.CATALOGO,
        datosRelacionados: datosContexto(registro, `${valor} no pertenece al catálogo permitido para ${codigoBase}.`),
        columnasCorregir: [variable]
      }));
      return;
    }

    if (esGrupoV46 && valor === '97') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: `${codigoBase}-ERROR-003`,
        variable,
        titulo: `${codigoBase} marcada como no aplica en CIE-10 enunciado`,
        mensaje: `V17 tiene el valor ${v17}. Ese diagnóstico pertenece a los CIE-10 enunciados para las fases; por tanto, ${codigoBase} debe registrarse con 1 o 2, no con 97.`,
        regla: [
          `Para CIE-10 C835, C910, C920, C924 o C925, ${codigoBase} debe registrar 1 si recibió la fase o 2 si no la recibió.`,
          '',
          catalogoPermitido()
        ].join('\n'),
        recomendacion: `Cambie ${codigoBase} a 1 si recibió la fase o a 2 si no la recibió.`,
        tipo: TIPO.COHERENCIA,
        datosRelacionados: datosContexto(registro, '97 no corresponde cuando V17 pertenece a C835, C910, C920, C924 o C925.'),
        columnasCorregir: [variable]
      }));
      return;
    }

    if (v17 && !esGrupoV46 && (valor === '1' || valor === '2')) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: `${codigoBase}-ERROR-004`,
        variable,
        titulo: `${codigoBase} registrada en diagnóstico donde no aplica`,
        mensaje: `V17 tiene el valor ${v17}. Ese diagnóstico no pertenece a C835, C910, C920, C924 o C925; por tanto, ${codigoBase} debe registrarse con 97.`,
        regla: [
          '97 = No aplica; no es leucemia linfoide o mieloide aguda ni linfoma linfoblástico.',
          '',
          catalogoPermitido()
        ].join('\n'),
        recomendacion: `Cambie ${codigoBase} a 97 cuando V17 no sea C835, C910, C920, C924 ni C925.`,
        tipo: TIPO.COHERENCIA,
        datosRelacionados: datosContexto(registro, `${valor} no corresponde; para este diagnóstico ${codigoBase} debe ser 97.`),
        columnasCorregir: [variable]
      }));
    }
  }

  function validarV46_1(registro, hallazgos) {
    if (!Object.prototype.hasOwnProperty.call(registro, 'V46_1')) return;

    validarSubfaseCatalogo({
      registro,
      hallazgos,
      variable: 'V46_1',
      codigoBase: 'V46.1',
      tituloFase: 'Prefase o Citorreducción inicial',
      descripcionFase: 'la fase de quimioterapia denominada Prefase o Citorreducción inicial',
      catalogoPermitido: catalogoPermitidoV46_1,
      datosContexto: datosContextoV46_1
    });
  }

  function validarV46_2(registro, hallazgos) {
    if (!Object.prototype.hasOwnProperty.call(registro, 'V46_2')) return;

    validarSubfaseCatalogo({
      registro,
      hallazgos,
      variable: 'V46_2',
      codigoBase: 'V46.2',
      tituloFase: 'Inducción',
      descripcionFase: 'la fase de quimioterapia denominada Inducción',
      catalogoPermitido: catalogoPermitidoV46_2,
      datosContexto: datosContextoV46_2
    });
  }

  function validarV46_3(registro, hallazgos) {
    if (!Object.prototype.hasOwnProperty.call(registro, 'V46_3')) return;

    validarSubfaseCatalogo({
      registro,
      hallazgos,
      variable: 'V46_3',
      codigoBase: 'V46.3',
      tituloFase: 'Intensificación',
      descripcionFase: 'la fase de quimioterapia denominada Intensificación',
      catalogoPermitido: catalogoPermitidoV46_3,
      datosContexto: datosContextoV46_3
    });
  }

  function validarV46_4(registro, hallazgos) {
    if (!Object.prototype.hasOwnProperty.call(registro, 'V46_4')) return;

    validarSubfaseCatalogo({
      registro,
      hallazgos,
      variable: 'V46_4',
      codigoBase: 'V46.4',
      tituloFase: 'Consolidación',
      descripcionFase: 'la fase de quimioterapia denominada Consolidación',
      catalogoPermitido: catalogoPermitidoV46_4,
      datosContexto: datosContextoV46_4
    });
  }



  function validarV46_5(registro, hallazgos) {
    if (!Object.prototype.hasOwnProperty.call(registro, 'V46_5')) return;

    validarSubfaseCatalogo({
      registro,
      hallazgos,
      variable: 'V46_5',
      codigoBase: 'V46.5',
      tituloFase: 'Reinducción',
      descripcionFase: 'la fase de quimioterapia denominada Reinducción',
      catalogoPermitido: catalogoPermitidoV46_5,
      datosContexto: datosContextoV46_5
    });
  }

  function validarV46_6(registro, hallazgos) {
    if (!Object.prototype.hasOwnProperty.call(registro, 'V46_6')) return;

    validarSubfaseCatalogo({
      registro,
      hallazgos,
      variable: 'V46_6',
      codigoBase: 'V46.6',
      tituloFase: 'Mantenimiento',
      descripcionFase: 'la fase de quimioterapia denominada Mantenimiento',
      catalogoPermitido: catalogoPermitidoV46_6,
      datosContexto: datosContextoV46_6
    });
  }

  function validarV46_7(registro, hallazgos) {
    if (!Object.prototype.hasOwnProperty.call(registro, 'V46_7')) return;

    validarSubfaseCatalogo({
      registro,
      hallazgos,
      variable: 'V46_7',
      codigoBase: 'V46.7',
      tituloFase: 'Mantenimiento largo o final',
      descripcionFase: 'la fase de quimioterapia denominada Mantenimiento largo o final',
      catalogoPermitido: catalogoPermitidoV46_7,
      datosContexto: datosContextoV46_7
    });
  }

  function validarV46_8(registro, hallazgos) {
    if (!Object.prototype.hasOwnProperty.call(registro, 'V46_8')) return;

    validarSubfaseCatalogo({
      registro,
      hallazgos,
      variable: 'V46_8',
      codigoBase: 'V46.8',
      tituloFase: 'Otra fase diferente a las anteriores',
      descripcionFase: 'otra fase de quimioterapia diferente a las anteriores',
      catalogoPermitido: catalogoPermitidoV46_8,
      datosContexto: datosContextoV46_8
    });
  }

  function validarV47(registro, hallazgos) {
    if (!Object.prototype.hasOwnProperty.call(registro, 'V47')) return;

    const v45 = texto(registro.V45);
    const v47 = texto(registro.V47);

    if (estaVacio(v47)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V47-ERROR-001',
        variable: 'V47',
        titulo: 'Número de ciclos vacío',
        mensaje: 'V47 está vacía. Debe registrar el número de ciclos iniciados y administrados durante el periodo de reporte, o 98 cuando no aplica según V45.',
        regla: [
          'V47 aplica para todos los cánceres. Si el paciente recibió terapia sistémica en el periodo, debe registrarse el número de ciclos iniciados y administrados, incluyendo el ciclo que aún recibe al cierre del periodo.',
          '',
          catalogoPermitidoV47()
        ].join('\n'),
        recomendacion: 'Revise la historia clínica y los registros de administración de medicamentos. Registre el número de ciclos correspondiente, o registre 98 si no aplica y V45 está en 98.',
        tipo: TIPO.FORMATO,
        datosRelacionados: datosContextoV47(registro, 'V47 está vacía.'),
        columnasCorregir: ['V47']
      }));
      return;
    }

    if (v47 !== '98' && !esEnteroConSigno(v47)) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V47-ERROR-002',
        variable: 'V47',
        titulo: 'Número de ciclos con formato inválido',
        mensaje: `V47 tiene el valor ${v47}. Debe ser un número entero de ciclos o el comodín 98 cuando no aplica.`,
        regla: [
          'La variable V47 registra el número de ciclos iniciados y administrados en el periodo de reporte. Solo se acepta un número entero válido o 98 cuando V45 indica que no aplica.',
          '',
          catalogoPermitidoV47()
        ].join('\n'),
        recomendacion: 'Corrija V47. Registre un número entero mayor o igual a 1 si recibió terapia sistémica, o 98 si no aplica según V45.',
        tipo: TIPO.FORMATO,
        datosRelacionados: datosContextoV47(registro, `${v47} no es un valor permitido para V47.`),
        columnasCorregir: ['V47']
      }));
      return;
    }

    if (v45 === '1' && v47 === '98') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V47-ERROR-003',
        variable: 'V47',
        titulo: 'V47 reportada como no aplica aunque recibió terapia sistémica',
        mensaje: 'V45 indica que el paciente sí recibió terapia sistémica en el periodo, pero V47 está en 98.',
        regla: [
          'Cuando V45 tiene valor 1, V47 debe registrar el número de ciclos iniciados y administrados durante el periodo de reporte. El valor 98 solo corresponde cuando no aplica o no recibió terapia sistémica según V45.',
          '',
          catalogoPermitidoV47()
        ].join('\n'),
        recomendacion: 'Revise la historia clínica y los registros de administración. Registre en V47 el número de ciclos administrados, incluyendo el ciclo que el paciente aún recibe al cierre del periodo si corresponde.',
        tipo: TIPO.COHERENCIA,
        datosRelacionados: datosContextoV47(registro, 'V47=98 no corresponde cuando V45=1.'),
        columnasCorregir: ['V47']
      }));
      return;
    }

    if (esEnteroConSigno(v47) && Number(v47) < 1) {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V47-ERROR-004',
        variable: 'V47',
        titulo: 'Número de ciclos menor que uno',
        mensaje: 'V47 registra cero o un número negativo como número de ciclos.',
        regla: [
          'Si el paciente recibió terapia sistémica, V47 debe registrar el número de ciclos iniciados y administrados en el periodo. El valor debe ser un entero mayor o igual a 1.',
          '',
          catalogoPermitidoV47()
        ].join('\n'),
        recomendacion: 'Corrija V47. Registre el número real de ciclos iniciados y administrados según la historia clínica o los registros de administración de medicamentos. Si no recibió terapia y V45 está en 98, registre 98.',
        tipo: TIPO.FORMATO,
        datosRelacionados: datosContextoV47(registro, `${v47} no representa un número válido de ciclos administrados.`),
        columnasCorregir: ['V47']
      }));
      return;
    }

    if (v45 === '98' && v47 !== '98') {
      hallazgos.push(crearHallazgoRegistro(registro, {
        codigo: 'V47-ERROR-005',
        variable: 'V47',
        titulo: 'V47 registra ciclos aunque V45 indica que no aplica',
        mensaje: 'V45 está en 98, pero V47 registra un número de ciclos.',
        regla: [
          'Cuando V45 indica que no aplica o que no recibió terapia sistémica, V47 debe registrarse como 98.',
          '',
          catalogoPermitidoV47()
        ].join('\n'),
        recomendacion: 'Revise la coherencia entre V45 y V47. Si el paciente no recibió terapia sistémica, deje V45 y V47 en 98. Si sí recibió terapia, corrija V45 y registre en V47 el número de ciclos correspondiente.',
        tipo: TIPO.COHERENCIA,
        datosRelacionados: datosContextoV47(registro, `${v47} no corresponde cuando V45=98.`),
        columnasCorregir: ['V45', 'V47']
      }));
    }
  }

  function validar(registro) {
    const hallazgos = [];
    const fila = registro || {};

    validarV45(fila, hallazgos);
    validarV46(fila, hallazgos);
    validarV46_1(fila, hallazgos);
    validarV46_2(fila, hallazgos);
    validarV46_3(fila, hallazgos);
    validarV46_4(fila, hallazgos);
    validarV46_5(fila, hallazgos);
    validarV46_6(fila, hallazgos);
    validarV46_7(fila, hallazgos);
    validarV46_8(fila, hallazgos);
    validarV47(fila, hallazgos);

    return hallazgos;
  }

  const API = {
    version: VERSION,
    validar,
    _interno: {
      CATALOGO_V45,
      CATALOGO_V46_1,
      CATALOGO_V46_2,
      CATALOGO_V46_3,
      CATALOGO_V46_4,
      CATALOGO_V46_5,
      CATALOGO_V46_6,
      CATALOGO_V46_7,
      CATALOGO_V46_8,
      CIE10_V46_HEMATOLINFATICOS,
      catalogoPermitidoV45,
      catalogoPermitidoV46,
      catalogoPermitidoV46_1,
      catalogoPermitidoV46_2,
      catalogoPermitidoV46_3,
      catalogoPermitidoV46_4,
      catalogoPermitidoV46_5,
      catalogoPermitidoV46_6,
      catalogoPermitidoV46_7,
      catalogoPermitidoV46_8,
      catalogoPermitidoV47,
      obtenerDiagnosticoCIE10,
      esCIE10V46Hematolinfatico
    }
  };

  window.CACModulo9 = API;
  window.Modulo9 = API;
})();
