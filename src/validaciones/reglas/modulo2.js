// =======================================================
// Validador CAC - validaciones/reglas/modulo2.js
// Reglas Sprint 2A: Diagnóstico del cáncer V17 a V24
// Valida V17 contra catálogo operativo CIE-10 CAC 2025 local
// Versión: Sprint 2A v1.5 - descripciones claras y ayuda de comodines
// =======================================================

(function () {
  'use strict';

  const NOMBRES_VARIABLES = {
    V17: 'Código CIE-10 de la neoplasia maligna reportada',
    V18: 'Fecha de diagnóstico del cáncer reportado',
    V19: 'Fecha de nota de remisión o interconsulta',
    V20: 'Fecha de ingreso a la institución que realizó el diagnóstico',
    V21: 'Tipo de estudio diagnóstico',
    V22: 'Motivo sin histopatología',
    V23: 'Fecha de recolección de muestra histopatológica',
    V24: 'Fecha del primer o único informe histopatológico válido'
  };

  const TIPOS_ESTUDIO_NUEVOS = ['5', '6', '7', '8', '9', '10', '99'];
  const TIPOS_ESTUDIO_HISTORICOS = ['1', '2', '3', '4'];
  const TIPOS_ESTUDIO_HISTOPATOLOGICO = ['5', '6', '8', '9', '10'];

  const MOTIVOS_SIN_HISTOPATOLOGIA = ['1', '2', '3', '4', '5', '6', '98', '99'];
  const MOTIVOS_VALIDOS_CUANDO_V21_ES_7 = ['1', '2', '3', '4', '5', '6', '99'];

  const COMODIN_DESCONOCIDO = '1800-01-01';
  const COMODIN_NO_HISTOPATOLOGIA = '1845-01-01';

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

  function agregar(hallazgos, datos) {
    hallazgos.push(CACTipos.crearHallazgo(datos));
  }

  function valor(registro, variable) {
    return CACTipos.texto(registro[variable]);
  }

  function valorMayuscula(registro, variable) {
    return CACTipos.textoMayuscula(registro[variable]);
  }

  function esFechaReal(valorFecha) {
    return CACTipos.esFechaISO(valorFecha);
  }

  function esComodinFecha(valorFecha) {
    return [COMODIN_DESCONOCIDO, COMODIN_NO_HISTOPATOLOGIA].includes(valorFecha);
  }

  function esFechaClinicaComparable(valorFecha) {
    return esFechaReal(valorFecha) && !esComodinFecha(valorFecha);
  }

  function crearHallazgoCampoSimple({
    registro,
    variable,
    codigo,
    titulo,
    mensaje,
    regla,
    recomendacion,
    severidad = CACTipos.SEVERIDAD.ERROR,
    datosRelacionados = null,
    columnasCorregir = null
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
      datosRelacionados: datosRelacionados || [dato(registro, variable)],
      columnasCorregir: columnasCorregir || [variable]
    };
  }

  function validarFechaBase({ registro, variable, codigoBase, permite1845 = false }) {
    const hallazgos = [];
    const nombreCampo = nombreVariable(variable);
    const fecha = valor(registro, variable);

    if (CACTipos.estaVacio(fecha)) {
      const descripcionVacia = variable === 'V18'
        ? {
          mensaje: 'V18 está vacía. Esta variable debe indicar la fecha en la que se considera diagnosticado el cáncer reportado.',
          regla: 'V18 es obligatoria. Si la fecha exacta no está descrita en los soportes clínicos, el instructivo permite registrar 1800-01-01 como desconocido.',
          recomendacion: 'Revise el soporte clínico. Si el diagnóstico fue histopatológico, normalmente V18 corresponde a la fecha del primer informe histopatológico válido de diagnóstico (V24). Si fue diagnóstico clínico sin histopatología, registre la fecha de la primera consulta en la que el especialista concluyó el diagnóstico. Si el dato no aparece en los soportes, registre 1800-01-01.'
        }
        : {
          mensaje: `${nombreCampo} está vacía.`,
          regla: `${nombreCampo} es obligatoria en el bloque de diagnóstico.`,
          recomendacion: 'Diligencie la fecha en formato AAAA-MM-DD o use 1800-01-01 cuando el dato sea desconocido y el instructivo lo permita.'
        };

      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable,
        codigo: `${codigoBase}-ERROR-001`,
        titulo: `${nombreCampo} vacía`,
        mensaje: descripcionVacia.mensaje,
        regla: descripcionVacia.regla,
        recomendacion: descripcionVacia.recomendacion
      }));
      return hallazgos;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable,
        codigo: `${codigoBase}-ERROR-002`,
        titulo: `${nombreCampo} con formato incorrecto`,
        mensaje: `${nombreCampo} no tiene formato AAAA-MM-DD.`,
        regla: 'Las fechas CAC deben escribirse como AAAA-MM-DD, usando guion medio.',
        recomendacion: 'Escriba la fecha con guiones y en formato AAAA-MM-DD. Ejemplo válido: 2024-03-15. Si la fecha no está descrita en los soportes clínicos y la variable lo permite, use 1800-01-01.'
      }));
      return hallazgos;
    }

    if (!CACTipos.esFechaISO(fecha)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable,
        codigo: `${codigoBase}-ERROR-003`,
        titulo: `${nombreCampo} imposible`,
        mensaje: `${nombreCampo} no corresponde a una fecha real del calendario.`,
        regla: 'La fecha debe existir en el calendario.',
        recomendacion: 'Verifique que el año, mes y día existan. Ejemplo: 2025-08-20 es válido; 2025-20-10 no es válido porque no existe el mes 20. Si la fecha no está descrita en los soportes clínicos y la variable lo permite, use 1800-01-01.'
      }));
      return hallazgos;
    }

    if (fecha === COMODIN_NO_HISTOPATOLOGIA && !permite1845) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable,
        codigo: `${codigoBase}-ERROR-004`,
        titulo: `${nombreCampo} usa comodín no permitido`,
        mensaje: `${nombreCampo} usa 1845-01-01, pero ese comodín no aplica para esta variable.`,
        regla: '1845-01-01 solo aplica en variables donde el instructivo define No Aplica o no se realizó estudio.',
        recomendacion: 'Use una fecha real si existe soporte. Use 1800-01-01 si la fecha no está descrita en los soportes clínicos. Use 1845-01-01 solo en V23 y V24 cuando V21 = 7, es decir, cuando el diagnóstico fue clínico exclusivamente y no se realizó histopatología.'
      }));
      return hallazgos;
    }

    // En V18-V24 no se valida contra una fecha de corte fija.
    // La matriz/instructivo del bloque diagnóstico no trae una variable de corte dentro de V17-V24.
    // Por ahora solo se valida formato, existencia real de la fecha, comodines y cruces entre fechas reales.

    // 1800-01-01 es un comodín permitido por instructivo.
    // En el modo normal del validador no genera hallazgo para evitar ruido masivo en datos reales.

    return hallazgos;
  }

  function obtenerCatalogoCIE10() {
    return window.CACCatalogoCIE10 || null;
  }

  function buscarCIE10(codigo) {
    const catalogo = obtenerCatalogoCIE10();

    if (!catalogo || !catalogo.datos) {
      return null;
    }

    return catalogo.datos[codigo] || null;
  }

  function catalogoCIE10Disponible() {
    const catalogo = obtenerCatalogoCIE10();
    return !!(catalogo && catalogo.datos);
  }

  function generoEsperadoComoSexoCAC(generoAplica) {
    const genero = CACTipos.textoMayuscula(generoAplica);

    if (genero === 'FEMENINO') return 'F';
    if (genero === 'MASCULINO') return 'M';

    return '';
  }

  function validarV17(registro) {
    const hallazgos = [];
    const cie10 = valorMayuscula(registro, 'V17');

    if (CACTipos.estaVacio(cie10)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V17',
        codigo: 'V17-ERROR-001',
        titulo: 'Código CIE-10 vacío',
        mensaje: 'El código CIE-10 de la neoplasia maligna reportada está vacío.',
        regla: 'V17 debe registrar un código CIE-10 válido del archivo operativo CAC.',
        recomendacion: 'Diligencie el código CIE-10 correspondiente según el soporte clínico y el catálogo operativo CAC.'
      }));
      return hallazgos;
    }

    if (!/^[A-Z][0-9]{2}[A-Z0-9]{0,2}$/.test(cie10)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V17',
        codigo: 'V17-ERROR-002',
        titulo: 'Código CIE-10 con formato inválido',
        mensaje: 'El código CIE-10 no cumple el formato esperado para la variable V17.',
        regla: 'El código debe venir limpio, sin puntos, espacios, guiones ni sufijos internos. Ejemplos válidos de estructura: C509, C61X, D050.',
        recomendacion: 'Revise el código contra el catálogo operativo CAC y retire puntos, guiones, espacios o sufijos no permitidos.'
      }));
      return hallazgos;
    }

    const entradaCatalogo = buscarCIE10(cie10);

    if (catalogoCIE10Disponible() && !entradaCatalogo) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V17',
        codigo: 'V17-ERROR-004',
        titulo: 'Código CIE-10 no existe en el catálogo CAC 2025',
        mensaje: `El código ${cie10} no aparece en el catálogo operativo CIE-10 CAC 2025 cargado en la app.`,
        regla: 'V17 debe corresponder a un código incluido en el archivo operativo CIE-10 CAC vigente.',
        recomendacion: 'Verifique el diagnóstico y reemplace el valor por un código CIE-10 existente en el catálogo operativo CAC.'
      }));
      return hallazgos;
    }

    if (!entradaCatalogo) {
      // Si por alguna razón el catálogo no está cargado, conservamos las validaciones básicas.
      if (cie10 === 'C80X') {
        agregar(hallazgos, crearHallazgoCampoSimple({
          registro,
          variable: 'V17',
          codigo: 'V17-ERROR-003',
          titulo: 'C80X no es válido',
          mensaje: 'El código C80X Tumor maligno de sitios no especificados no es válido para el reporte.',
          regla: 'El instructivo indica que C80X fue eliminado del archivo operativo y debe ajustarse al CIE-10 correcto.',
          recomendacion: 'Verifique el diagnóstico y reemplace C80X por el código CIE-10 específico.'
        }));
      }

      return hallazgos;
    }

    if (entradaCatalogo.valido_nuevo_reporte === false) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V17',
        codigo: cie10 === 'C80X' ? 'V17-ADVERTENCIA-003' : 'V17-ADVERTENCIA-005',
        titulo: cie10 === 'C80X'
          ? 'C80X tiene observación CAC'
          : 'Código CIE-10 con observación CAC',
        mensaje: `El código ${cie10} ${entradaCatalogo.descripcion || ''} existe en el catálogo CIE-10 CAC, pero tiene una observación de uso.`,
        regla: entradaCatalogo.observacion_cac || 'El catálogo CAC registra una observación para este código.',
        recomendacion: 'Revise el soporte clínico y confirme si este código aplica según el tipo de reporte.',
        severidad: CACTipos.SEVERIDAD.ADVERTENCIA,
        datosRelacionados: [
          dato(registro, 'V17'),
          datoCalculado('Descripción catálogo CIE-10 CAC', entradaCatalogo.descripcion || ''),
          datoCalculado('Observación CAC', entradaCatalogo.observacion_cac || '')
        ],
        columnasCorregir: ['V17']
      }));
    }

    if (entradaCatalogo.revisar_genero) {
      const sexo = valorMayuscula(registro, 'V8');
      const sexoEsperado = generoEsperadoComoSexoCAC(entradaCatalogo.genero_aplica);

      if (sexoEsperado && ['M', 'F'].includes(sexo) && sexo !== sexoEsperado) {
        agregar(hallazgos, {
          codigo: 'V17-ERROR-006',
          titulo: 'Código CIE-10 no corresponde al sexo del paciente',
          variable: 'V17',
          valor: cie10,
          mensaje: `El código ${cie10} aplica para ${entradaCatalogo.genero_aplica}, pero V8 registra ${sexo}.`,
          regla: 'El catálogo operativo CIE-10 CAC indica que este código requiere revisión por género.',
          recomendacion: 'Revise V8 y V17 contra el soporte clínico. Corrija el sexo o el código CIE-10 según corresponda.',
          datosRelacionados: [
            dato(registro, 'V17'),
            dato(registro, 'V8'),
            datoCalculado('Género al que aplica según catálogo', entradaCatalogo.genero_aplica || '')
          ],
          columnasCorregir: ['V17', 'V8']
        });
      }
    }

    if (entradaCatalogo.revisar_edad && CACTipos.textoMayuscula(entradaCatalogo.rango_edad) === 'MAYOR DE EDAD') {
      const fechaNacimiento = valor(registro, 'V7');
      const fechaDiagnostico = valor(registro, 'V18');

      if (esFechaClinicaComparable(fechaNacimiento) && esFechaClinicaComparable(fechaDiagnostico)) {
        const edadDiagnostico = CACTipos.calcularEdad(fechaNacimiento, fechaDiagnostico);

        if (edadDiagnostico !== null && edadDiagnostico < 18) {
          agregar(hallazgos, {
            codigo: 'V17-ADVERTENCIA-007',
            titulo: 'Código CIE-10 con restricción de edad mayor de edad',
            variable: 'V17',
            valor: cie10,
            mensaje: `El código ${cie10} está marcado para mayor de edad, pero la edad calculada al diagnóstico es ${edadDiagnostico} años.`,
            regla: 'El catálogo operativo CIE-10 CAC indica que este código requiere revisión por edad.',
            recomendacion: 'Revise V7, V18 y V17 contra el soporte clínico. Si el caso es correcto, conserve el soporte; si no, corrija el dato correspondiente.',
            severidad: CACTipos.SEVERIDAD.ADVERTENCIA,
            datosRelacionados: [
              dato(registro, 'V17'),
              dato(registro, 'V7'),
              dato(registro, 'V18'),
              datoCalculado('Edad calculada al diagnóstico', `${edadDiagnostico} años`),
              datoCalculado('Rango de edad según catálogo', entradaCatalogo.rango_edad || '')
            ],
            columnasCorregir: ['V17', 'V7', 'V18']
          });
        }
      }
    }

    if (cie10 === 'C960') {
      agregar(hallazgos, {
        codigo: 'V17-ADVERTENCIA-008',
        titulo: 'C960 requiere revisión diagnóstica específica',
        variable: 'V17',
        valor: cie10,
        mensaje: 'C960 es exclusivo para Enfermedad de Letterer-Siwe según la observación del catálogo CAC.',
        regla: 'El catálogo operativo CIE-10 CAC marca C960 como exclusivo para Enfermedad de Letterer-Siwe.',
        recomendacion: 'Verifique que el soporte clínico corresponda a Enfermedad de Letterer-Siwe.',
        severidad: CACTipos.SEVERIDAD.ADVERTENCIA,
        datosRelacionados: [
          dato(registro, 'V17'),
          datoCalculado('Descripción catálogo CIE-10 CAC', entradaCatalogo.descripcion || ''),
          datoCalculado('Observación CAC', entradaCatalogo.observacion_cac || '')
        ],
        columnasCorregir: ['V17']
      });
    }

    return hallazgos;
  }

  function validarV18(registro) {
    return validarFechaBase({
      registro,
      variable: 'V18',
      codigoBase: 'V18',
      permite1845: false
    });
  }

  function validarV19(registro) {
    return validarFechaBase({
      registro,
      variable: 'V19',
      codigoBase: 'V19',
      permite1845: false
    });
  }

  function validarV20(registro) {
    return validarFechaBase({
      registro,
      variable: 'V20',
      codigoBase: 'V20',
      permite1845: false
    });
  }

  function validarV21(registro) {
    const hallazgos = [];
    const estudio = valor(registro, 'V21');

    if (CACTipos.estaVacio(estudio)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V21',
        codigo: 'V21-ERROR-001',
        titulo: 'Tipo de estudio diagnóstico vacío',
        mensaje: 'El tipo de estudio con el que se realizó el diagnóstico está vacío.',
        regla: 'V21 es obligatorio y para pacientes nuevos acepta 5, 6, 7, 8, 9, 10 o 99.',
        recomendacion: 'Diligencie V21 con un código válido del catálogo vigente.'
      }));
      return hallazgos;
    }

    if (!/^\d+$/.test(estudio)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V21',
        codigo: 'V21-ERROR-002',
        titulo: 'Tipo de estudio diagnóstico no numérico',
        mensaje: 'V21 contiene letras, espacios o símbolos.',
        regla: 'V21 debe ser numérica.',
        recomendacion: 'Use uno de estos códigos: 5, 6, 7, 8, 9, 10, 99.'
      }));
      return hallazgos;
    }

    if (TIPOS_ESTUDIO_HISTORICOS.includes(estudio)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V21',
        codigo: 'V21-ADVERTENCIA-003',
        titulo: 'Código histórico en tipo de estudio diagnóstico',
        mensaje: `El código ${estudio} corresponde a una opción histórica del tipo de estudio diagnóstico.`,
        regla: 'Las opciones 1, 2, 3 y 4 pertenecen al histórico de pacientes antiguos reportados antes del 2020. En el instructivo actual para pacientes reportados por primera vez se usan las opciones 5, 6, 7, 8, 9, 10 y 99.',
        recomendacion: 'Revise si el paciente corresponde a un caso histórico o prevalente. Si es un paciente reportado por primera vez a la CAC, registre la opción actual que corresponda; si aplica patología básica, use 10.',
        severidad: CACTipos.SEVERIDAD.ADVERTENCIA,
        datosRelacionados: [
          dato(registro, 'V21')
        ],
        columnasCorregir: ['V21']
      }));
      return hallazgos;
    }

    if (!TIPOS_ESTUDIO_NUEVOS.includes(estudio)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V21',
        codigo: 'V21-ERROR-004',
        titulo: 'Tipo de estudio diagnóstico fuera de catálogo',
        mensaje: 'V21 registra un código que no corresponde a ninguna opción permitida para el tipo de estudio diagnóstico.',
        regla: 'V21 debe indicar el primer estudio que permitió confirmar el cáncer. Las opciones vigentes son: 5 Inmunohistoquímica, 6 Citometría de flujo, 7 Clínica exclusivamente, 8 Otro, 9 Genética, 10 Patología básica y 99 Desconocido. Las opciones 1, 2, 3 y 4 solo se consideran históricas.',
        recomendacion: 'Revise el soporte clínico que confirmó el diagnóstico y reemplace V21 por una opción válida: 5, 6, 7, 8, 9, 10 o 99. Si el valor corresponde a un histórico 1, 2, 3 o 4, debe quedar como observación de revisión, no como código fuera de catálogo.'
      }));
      return hallazgos;
    }

    if (estudio === '99') {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V21',
        codigo: 'V21-ADVERTENCIA-005',
        titulo: 'Tipo de estudio diagnóstico desconocido',
        mensaje: 'V21 está registrado como 99. Esto significa que el tipo de estudio diagnóstico no está descrito en los soportes clínicos.',
        regla: 'V21 identifica el primer estudio que permitió confirmar el diagnóstico del cáncer. Aunque 99 es un valor permitido, debe usarse solo cuando el dato realmente no aparece en los soportes clínicos.',
        recomendacion: 'Revise los soportes clínicos. Si encuentra el estudio diagnóstico, cambie V21 por el código correspondiente. Si el dato no está documentado, conserve V21=99.',
        severidad: CACTipos.SEVERIDAD.ADVERTENCIA,
        datosRelacionados: [
          dato(registro, 'V21')
        ],
        columnasCorregir: ['V21']
      }));
    }

    return hallazgos;
  }

  function validarV22(registro) {
    const hallazgos = [];
    const estudio = valor(registro, 'V21');
    const motivo = valor(registro, 'V22');

    if (CACTipos.estaVacio(motivo)) {
      if (estudio === '7') {
        agregar(hallazgos, crearHallazgoCampoSimple({
          registro,
          variable: 'V22',
          codigo: 'V22-ERROR-001',
          titulo: 'Motivo sin histopatología vacío',
          mensaje: 'V22 está vacío aunque V21 indica diagnóstico clínico exclusivamente.',
          regla: 'Si V21 = 7, V22 es obligatorio y debe explicar por qué no hubo diagnóstico por histopatología.',
          recomendacion: 'Diligencie V22 con uno de estos códigos: 1, 2, 3, 4, 5, 6 o 99.',
          datosRelacionados: [
            dato(registro, 'V21'),
            dato(registro, 'V22')
          ],
          columnasCorregir: ['V21', 'V22']
        }));
      } else {
        agregar(hallazgos, crearHallazgoCampoSimple({
          registro,
          variable: 'V22',
          codigo: 'V22-ERROR-002',
          titulo: 'Motivo sin histopatología vacío',
          mensaje: 'V22 está vacío.',
          regla: 'V22 debe diligenciarse según el catálogo. Si sí hubo histopatología, use 98.',
          recomendacion: 'Use 98 cuando el diagnóstico tuvo confirmación por histopatología, o el motivo correspondiente si V21 = 7.'
        }));
      }

      return hallazgos;
    }

    if (!/^\d+$/.test(motivo)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V22',
        codigo: 'V22-ERROR-003',
        titulo: 'Motivo sin histopatología no numérico',
        mensaje: 'V22 contiene letras, espacios o símbolos.',
        regla: 'V22 debe ser numérica.',
        recomendacion: 'Use un código válido del catálogo: 1, 2, 3, 4, 5, 6, 98 o 99.'
      }));
      return hallazgos;
    }

    if (!MOTIVOS_SIN_HISTOPATOLOGIA.includes(motivo)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V22',
        codigo: 'V22-ERROR-004',
        titulo: 'Motivo sin histopatología fuera de catálogo',
        mensaje: 'V22 no pertenece al catálogo permitido.',
        regla: 'V22 solo acepta 1, 2, 3, 4, 5, 6, 98 o 99.',
        recomendacion: 'Corrija V22 con un código válido.'
      }));
      return hallazgos;
    }

    if (estudio === '7' && !MOTIVOS_VALIDOS_CUANDO_V21_ES_7.includes(motivo)) {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V22',
        codigo: 'V22-ERROR-005',
        titulo: 'Motivo incoherente con diagnóstico clínico',
        mensaje: 'V22 indica confirmación por histopatología, pero V21 está marcado como diagnóstico clínico exclusivamente.',
        regla: 'Si V21 = 7, V22 debe ser 1, 2, 3, 4, 5, 6 o 99. No debe ser 98.',
        recomendacion: 'Revise V21 y V22. Si no hubo histopatología, registre el motivo real; si sí hubo histopatología, V21 no debería ser 7.',
        datosRelacionados: [
          dato(registro, 'V21'),
          dato(registro, 'V22')
        ],
        columnasCorregir: ['V21', 'V22']
      }));
    }

    if (estudio !== '7' && estudio !== '99' && TIPOS_ESTUDIO_NUEVOS.includes(estudio) && motivo !== '98') {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V22',
        codigo: 'V22-ADVERTENCIA-006',
        titulo: 'Revise V22: puede no corresponder al tipo de diagnóstico registrado',
        mensaje: 'V21 indica que el diagnóstico no fue clínico exclusivamente, pero V22 no está registrado como 98.',
        regla: 'V22 explica por qué no hubo diagnóstico por histopatología. Cuando V21 es diferente de 7, normalmente se entiende que sí hubo un estudio de confirmación; por eso V22 debería ser 98: Tiene confirmación por histopatología.',
        recomendacion: 'Revise primero V21. Si el cáncer se confirmó por patología básica, inmunohistoquímica, citometría, genética u otro estudio, normalmente V22 debe ser 98. Si realmente no se hizo histopatología y el diagnóstico fue clínico, revise si V21 debería ser 7 y registre en V22 el motivo correspondiente.',
        severidad: CACTipos.SEVERIDAD.ADVERTENCIA,
        datosRelacionados: [
          dato(registro, 'V21'),
          dato(registro, 'V22')
        ],
        columnasCorregir: ['V21', 'V22']
      }));
    }

    if (estudio === '7' && motivo === '99') {
      agregar(hallazgos, crearHallazgoCampoSimple({
        registro,
        variable: 'V22',
        codigo: 'V22-ADVERTENCIA-007',
        titulo: 'Motivo sin histopatología desconocido',
        mensaje: 'V21=7 indica diagnóstico clínico exclusivamente, pero V22 está registrado como 99. Esto significa que no se encontró en los soportes el motivo por el cual no hubo histopatología.',
        regla: 'Cuando el diagnóstico fue clínico exclusivamente, V22 debe explicar la razón por la que no se realizó histopatología. El valor 99 es permitido, pero debe usarse solo si el motivo realmente no está documentado.',
        recomendacion: 'Revise la historia clínica y los soportes del diagnóstico. Si encuentra el motivo, cambie V22 por el código correspondiente. Si no está documentado, conserve V22=99.',
        severidad: CACTipos.SEVERIDAD.ADVERTENCIA,
        datosRelacionados: [
          dato(registro, 'V21'),
          dato(registro, 'V22')
        ],
        columnasCorregir: ['V21', 'V22']
      }));
    }

    return hallazgos;
  }

  function validarV23(registro) {
    return validarFechaBase({
      registro,
      variable: 'V23',
      codigoBase: 'V23',
      permite1845: true
    });
  }

  function validarV24(registro) {
    return validarFechaBase({
      registro,
      variable: 'V24',
      codigoBase: 'V24',
      permite1845: true
    });
  }

  function validarCruceFechasDiagnostico(registro) {
    const hallazgos = [];
    const v18 = valor(registro, 'V18');
    const v19 = valor(registro, 'V19');
    const v20 = valor(registro, 'V20');

    if (esFechaClinicaComparable(v19) && esFechaClinicaComparable(v20) && CACTipos.compararFechas(v19, v20) === 1) {
      agregar(hallazgos, {
        codigo: 'V19-ERROR-007',
        titulo: 'La remisión o interconsulta aparece después del ingreso diagnóstico',
        variable: 'V19',
        valor: v19,
        mensaje: `La fecha de remisión o interconsulta (V19 = ${v19}) está después de la fecha de ingreso a la institución que realizó el diagnóstico (V20 = ${v20}).`,
        regla: 'Primero debe existir la remisión, interconsulta o sospecha documentada; después ocurre el ingreso a la institución o servicio que realiza el diagnóstico. Por eso V19 debe ser menor o igual a V20 cuando ambas fechas son reales.',
        recomendacion: 'Revise en la historia clínica cuál fue primero: la remisión/interconsulta o el ingreso a la institución diagnóstica. Corrija V19 si la remisión está mal digitada, o corrija V20 si el ingreso está mal digitado. Use 1800-01-01 solo si esa fecha no aparece en los soportes clínicos.',
        datosRelacionados: [
          dato(registro, 'V19'),
          dato(registro, 'V20')
        ],
        columnasCorregir: ['V19', 'V20']
      });
    }

    if (esFechaClinicaComparable(v19) && esFechaClinicaComparable(v18) && CACTipos.compararFechas(v19, v18) === 1) {
      agregar(hallazgos, {
        codigo: 'V19-ERROR-008',
        titulo: 'La remisión o interconsulta aparece después del diagnóstico',
        variable: 'V19',
        valor: v19,
        mensaje: `La fecha de remisión o interconsulta (V19 = ${v19}) está después de la fecha de diagnóstico del cáncer (V18 = ${v18}).`,
        regla: 'La remisión, interconsulta o sospecha que llevó al diagnóstico debe ocurrir antes o el mismo día del diagnóstico. Por eso V19 debe ser menor o igual a V18 cuando ambas fechas son reales.',
        recomendacion: 'Revise el soporte de remisión/interconsulta y la fecha de diagnóstico. Corrija V19 si la remisión está mal digitada, o corrija V18 si la fecha de diagnóstico correcta es otra. Use 1800-01-01 solo si la fecha no aparece en los soportes clínicos.',
        datosRelacionados: [
          dato(registro, 'V19'),
          dato(registro, 'V18')
        ],
        columnasCorregir: ['V19', 'V18']
      });
    }

    if (esFechaClinicaComparable(v20) && esFechaClinicaComparable(v18) && CACTipos.compararFechas(v20, v18) === 1) {
      agregar(hallazgos, {
        codigo: 'V20-ERROR-007',
        titulo: 'El ingreso a la institución diagnóstica aparece después del diagnóstico',
        variable: 'V20',
        valor: v20,
        mensaje: `La fecha de ingreso a la institución que realizó el diagnóstico (V20 = ${v20}) está después de la fecha de diagnóstico del cáncer (V18 = ${v18}).`,
        regla: 'El ingreso a la institución, servicio o laboratorio que realizó el diagnóstico debe ser anterior o igual a la fecha en que se confirma el diagnóstico. En diagnóstico clínico V20 y V18 pueden ser iguales; en diagnóstico histopatológico, V20 normalmente ocurre antes o el mismo día del diagnóstico.',
        recomendacion: 'Revise la fecha de ingreso, atención diagnóstica o ingreso de la muestra al laboratorio, según aplique, y compárela con la fecha de diagnóstico. Corrija V20 si el ingreso está mal digitado, o V18 si la fecha de diagnóstico correcta es otra. Use 1800-01-01 solo si la fecha no aparece en los soportes clínicos.',
        datosRelacionados: [
          dato(registro, 'V20'),
          dato(registro, 'V18')
        ],
        columnasCorregir: ['V20', 'V18']
      });
    }

    return hallazgos;
  }

  function validarCruceHistopatologia(registro) {
    const hallazgos = [];
    const estudio = valor(registro, 'V21');
    const v18 = valor(registro, 'V18');
    const v23 = valor(registro, 'V23');
    const v24 = valor(registro, 'V24');

    if (estudio === '7') {
      if (v23 !== COMODIN_NO_HISTOPATOLOGIA) {
        agregar(hallazgos, {
          codigo: 'V23-ERROR-007',
          titulo: 'V23 debe indicar que no hubo muestra histopatológica',
          variable: 'V23',
          valor: v23,
          mensaje: 'V21 está registrado como 7, es decir, diagnóstico clínico exclusivamente. En ese caso no hubo estudio histopatológico, por eso V23 debe ser 1845-01-01.',
          regla: '1845-01-01 significa: No se realizó estudio histopatológico. Este comodín aplica en V23 cuando V21 = 7.',
          recomendacion: 'Si el diagnóstico fue clínico exclusivamente y no se tomó muestra para histopatología, registre V23 como 1845-01-01. Si sí se tomó muestra, registre la fecha real de recolección; si esa fecha no aparece en los soportes, use 1800-01-01. Si sí hubo patología, revise V21 porque probablemente no debe ser 7.',
          datosRelacionados: [
            dato(registro, 'V21'),
            dato(registro, 'V23')
          ],
          columnasCorregir: ['V21', 'V23']
        });
      }

      if (v24 !== COMODIN_NO_HISTOPATOLOGIA) {
        agregar(hallazgos, {
          codigo: 'V24-ERROR-007',
          titulo: 'V24 debe indicar que no hubo informe histopatológico',
          variable: 'V24',
          valor: v24,
          mensaje: 'V21 está registrado como 7, es decir, diagnóstico clínico exclusivamente. En ese caso no hubo informe histopatológico, por eso V24 debe ser 1845-01-01.',
          regla: '1845-01-01 significa: No se realizó estudio histopatológico. Este comodín aplica en V24 cuando V21 = 7.',
          recomendacion: 'Si el diagnóstico fue clínico exclusivamente y no existe informe histopatológico, registre V24 como 1845-01-01. Si sí existe informe de patología, registre la fecha real del primer informe válido; si esa fecha no aparece en los soportes, use 1800-01-01. Si sí hubo patología, revise V21 porque probablemente no debe ser 7.',
          datosRelacionados: [
            dato(registro, 'V21'),
            dato(registro, 'V24')
          ],
          columnasCorregir: ['V21', 'V24']
        });
      }

      return hallazgos;
    }

    if (TIPOS_ESTUDIO_HISTOPATOLOGICO.includes(estudio)) {
      if (v23 === COMODIN_NO_HISTOPATOLOGIA) {
        agregar(hallazgos, {
          codigo: 'V23-ERROR-008',
          titulo: 'V23 usa 1845-01-01 sin diagnóstico clínico exclusivo',
          variable: 'V23',
          valor: v23,
          mensaje: 'V23 dice que no se realizó estudio histopatológico, pero V21 indica que el diagnóstico sí se hizo por un estudio diferente a clínica exclusiva.',
          regla: '1845-01-01 en V23 solo aplica cuando V21 = 7, porque ese valor significa que no se realizó estudio histopatológico.',
          recomendacion: 'Revise V21 y V23. Si sí se tomó muestra, registre en V23 la fecha real de recolección. Si esa fecha no aparece en los soportes clínicos, use 1800-01-01. Use 1845-01-01 solo cuando V21 = 7, es decir, cuando no se realizó histopatología y el diagnóstico fue clínico exclusivamente.',
          datosRelacionados: [
            dato(registro, 'V21'),
            dato(registro, 'V23')
          ],
          columnasCorregir: ['V21', 'V23']
        });
      }

      if (v24 === COMODIN_NO_HISTOPATOLOGIA) {
        agregar(hallazgos, {
          codigo: 'V24-ERROR-008',
          titulo: 'V24 usa 1845-01-01 sin diagnóstico clínico exclusivo',
          variable: 'V24',
          valor: v24,
          mensaje: 'V24 dice que no hubo informe histopatológico, pero V21 indica que el diagnóstico sí se hizo por un estudio diferente a clínica exclusiva.',
          regla: '1845-01-01 en V24 solo aplica cuando V21 = 7, porque ese valor significa que no se realizó estudio histopatológico.',
          recomendacion: 'Revise V21 y V24. Si sí existe informe de patología, registre en V24 la fecha real del primer informe válido. Si esa fecha no aparece en los soportes clínicos, use 1800-01-01. Use 1845-01-01 solo cuando V21 = 7, es decir, cuando no se realizó histopatología y el diagnóstico fue clínico exclusivamente.',
          datosRelacionados: [
            dato(registro, 'V21'),
            dato(registro, 'V24')
          ],
          columnasCorregir: ['V21', 'V24']
        });
      }
    }

    if (esFechaClinicaComparable(v23) && esFechaClinicaComparable(v24) && CACTipos.compararFechas(v23, v24) === 1) {
      agregar(hallazgos, {
        codigo: 'V23-ERROR-009',
        titulo: 'La muestra aparece tomada después del informe histopatológico',
        variable: 'V23',
        valor: v23,
        mensaje: `La fecha de recolección de la muestra (V23 = ${v23}) está después de la fecha del informe histopatológico (V24 = ${v24}).`,
        regla: 'Primero se toma la muestra, biopsia o pieza quirúrgica; después se emite el informe histopatológico. Por eso V23 debe ser menor o igual a V24 cuando ambas fechas son reales.',
        recomendacion: 'Revise el reporte de patología y la nota de procedimiento o cirugía. Primero debe estar la fecha en que se tomó la muestra, biopsia o pieza quirúrgica (V23), y después la fecha del informe de patología (V24). Corrija V23 o V24 según el soporte. Si alguna de esas fechas no aparece en los soportes, use 1800-01-01 en la variable correspondiente.',
        datosRelacionados: [
          dato(registro, 'V23'),
          dato(registro, 'V24')
        ],
        columnasCorregir: ['V23', 'V24']
      });
    }

    if (esFechaClinicaComparable(v23) && esFechaClinicaComparable(v18) && CACTipos.compararFechas(v23, v18) === 1) {
      agregar(hallazgos, {
        codigo: 'V23-ERROR-010',
        titulo: 'La muestra aparece después de la fecha de diagnóstico',
        variable: 'V23',
        valor: v23,
        mensaje: `La fecha de recolección de la muestra (V23 = ${v23}) está después de la fecha de diagnóstico reportada (V18 = ${v18}).`,
        regla: 'Cuando la muestra hizo parte de la confirmación diagnóstica, la recolección debe ocurrir antes o el mismo día de la fecha de diagnóstico reportada. Esta comparación solo se hace cuando ambas fechas son reales.',
        recomendacion: 'Revise V18 y V23 contra el soporte clínico. Si la muestra fue tomada antes del diagnóstico, corrija V23. Si la fecha de diagnóstico correcta es posterior, corrija V18. Use 1800-01-01 solo si la fecha no está descrita en los soportes clínicos.',
        datosRelacionados: [
          dato(registro, 'V23'),
          dato(registro, 'V18')
        ],
        columnasCorregir: ['V23', 'V18']
      });
    }

    if (TIPOS_ESTUDIO_HISTOPATOLOGICO.includes(estudio) && esFechaClinicaComparable(v18) && esFechaClinicaComparable(v24) && v18 !== v24) {
      agregar(hallazgos, {
        codigo: 'V18-ADVERTENCIA-007',
        titulo: 'La fecha del diagnóstico no coincide con la fecha del resultado de patología',
        variable: 'V18',
        valor: v18,
        severidad: CACTipos.SEVERIDAD.ADVERTENCIA,
        mensaje: 'V18 y V24 tienen fechas diferentes. En palabras simples: la fecha reportada como diagnóstico del cáncer no es la misma fecha en que salió el resultado de biopsia o patología.',
        regla: 'Cuando el diagnóstico se basa en biopsia o patología, normalmente la fecha del diagnóstico reportado debe coincidir con la fecha del resultado de patología.',
        recomendacion: 'Revise V18 y V24. Si el resultado de biopsia o patología fue el soporte del diagnóstico, ambas fechas deberían ser iguales. Si existe una razón documentada para que sean diferentes, conserve las fechas.',
        datosRelacionados: [
          {
            variable: 'V18',
            nombre: 'Fecha reportada como diagnóstico del cáncer',
            valor: v18,
            nota: 'El día que se está usando como fecha oficial del diagnóstico.'
          },
          {
            variable: 'V24',
            nombre: 'Fecha del resultado de biopsia o patología',
            valor: v24,
            nota: 'El día en que salió el resultado que pudo confirmar el cáncer.'
          }
        ],
        columnasCorregir: ['V18', 'V24']
      });
    }

    return hallazgos;
  }

  function validarRegistroModulo2(registro) {
    let hallazgos = [];

    hallazgos = hallazgos.concat(validarV17(registro));
    hallazgos = hallazgos.concat(validarV18(registro));
    hallazgos = hallazgos.concat(validarV19(registro));
    hallazgos = hallazgos.concat(validarV20(registro));
    hallazgos = hallazgos.concat(validarV21(registro));
    hallazgos = hallazgos.concat(validarV22(registro));
    hallazgos = hallazgos.concat(validarV23(registro));
    hallazgos = hallazgos.concat(validarV24(registro));

    hallazgos = hallazgos.concat(validarCruceFechasDiagnostico(registro));
    hallazgos = hallazgos.concat(validarCruceHistopatologia(registro));

    return hallazgos;
  }

  window.CACModulo2 = {
    VERSION_MODULO2: 'sprint-2a-v12-advertencias-v21-v22-99',
    TIPOS_ESTUDIO_NUEVOS,
    MOTIVOS_SIN_HISTOPATOLOGIA,
    COMODIN_DESCONOCIDO,
    COMODIN_NO_HISTOPATOLOGIA,
    validarRegistroModulo2
  };
})();
