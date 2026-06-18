(function () {
  'use strict';

  const VERSION = 'sprint-3n-v118-fecha-primera-consulta-psiquiatria-01';
  const NO_APLICA_FECHA = '1845-01-01';

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
      .replace(/-/g, '')
      .trim();
  }

  function normalizarFecha(valor) {
    return texto(valor).trim();
  }

  function estaVacio(valor) {
    return texto(valor) === '';
  }

  function nombreVariable(variable) {
    const nombres = {
      V111: 'El usuario, ¿recibió cirugía reconstructiva en el periodo de reporte actual?',
      V112: 'Fecha de la cirugía reconstructiva',
      V113: 'Código de la IPS que realizó cirugía reconstructiva',
      V114: 'El usuario fue valorado en consulta o procedimiento de cuidado paliativo en el periodo de reporte actual',
      V114_1: 'El usuario recibió consulta o procedimiento de cuidado paliativo por médico especialista en cuidado paliativo',
      V114_2: 'El usuario recibió consulta o procedimiento de cuidado paliativo por profesional de la salud no médico, incluye psicólogo, especialista en cuidado paliativo',
      V114_3: 'El usuario recibió consulta o procedimiento de cuidado paliativo por médico especialista, otra especialidad',
      V114_4: 'El usuario recibió consulta o procedimiento de cuidado paliativo por médico general',
      V114_5: 'El usuario recibió consulta o procedimiento de cuidado paliativo por trabajo social',
      V114_6: 'El usuario recibió consulta o procedimiento de cuidado paliativo por otro profesional de salud no médico, incluye psicólogo, no especializado',
      V115: 'Fecha de primera consulta o procedimiento de cuidado paliativo en el periodo de reporte actual',
      V116: 'Código de la IPS donde recibe la atención de cuidado paliativo en el periodo de reporte actual',
      V117: 'Ha sido valorado el usuario por el servicio de psiquiatría en el periodo de reporte actual',
      V118: 'Fecha de primera consulta con el servicio de psiquiatría en el periodo de reporte actual'
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

  function describirValorV111(valor) {
    const codigo = normalizarCodigo(valor);

    if (!codigo) return 'V111 está vacía.';
    if (codigo === '1') return 'V111=1 indica que el usuario sí recibió cirugía reconstructiva en el periodo de reporte actual.';
    if (codigo === '2') return 'V111=2 corresponde a una opción eliminada del instructivo actual.';
    if (codigo === '98') return 'V111=98 indica No Aplica: no recibió este tipo de cirugía reconstructiva.';

    return `V111 tiene el valor ${texto(valor)}.`;
  }

  function describirValorV112(valor) {
    const fecha = normalizarFecha(valor);

    if (!fecha) return 'V112 está vacía.';
    if (fecha === NO_APLICA_FECHA) return 'V112=1845-01-01 indica No Aplica.';

    return `V112 tiene registrada la fecha ${fecha}.`;
  }


  function codigoV113(valor) {
    return texto(valor).trim();
  }

  function describirValorV113(valor) {
    const codigo = codigoV113(valor);

    if (!codigo) return 'V113 está vacía.';
    if (codigo === '98') return 'V113=98 indica No Aplica.';
    if (codigo === '96') return 'V113=96, valor no permitido por el instructivo de esta variable.';
    if (/^\d{12}$/.test(codigo)) return `V113 registra el código REPS ${codigo}.`;

    return `V113 tiene el valor ${texto(valor)}.`;
  }

  function describirValorV114(valor) {
    const codigo = normalizarCodigo(valor);

    if (!codigo) return 'V114 está vacía.';
    if (codigo === '1') return 'V114=1 indica que el usuario sí fue valorado en consulta o procedimiento de cuidado paliativo.';
    if (codigo === '2') return 'V114=2 indica que el usuario no recibió consulta o procedimiento de cuidado paliativo.';
    if (codigo === '3') return 'V114=3 corresponde a una opción eliminada del instructivo actual.';

    return `V114 tiene el valor ${texto(valor)}.`;
  }

  function describirValorV114_1(valor) {
    const codigo = normalizarCodigo(valor);

    if (!codigo) return 'V114.1 está vacía.';
    if (codigo === '1') return 'V114.1=1 indica que el usuario sí recibió consulta o procedimiento de cuidado paliativo por médico especialista en cuidado paliativo.';
    if (codigo === '2') return 'V114.1=2 indica que el usuario no recibió esta atención por médico especialista en cuidado paliativo.';
    if (codigo === '3') return 'V114.1=3 corresponde a una opción eliminada del instructivo actual.';

    return `V114.1 tiene el valor ${texto(valor)}.`;
  }

  function describirValorV114_2(valor) {
    const codigo = normalizarCodigo(valor);

    if (!codigo) return 'V114.2 está vacía.';
    if (codigo === '1') return 'V114.2=1 indica que el usuario sí recibió consulta o procedimiento de cuidado paliativo por profesional de la salud no médico, incluye psicólogo, especialista en cuidado paliativo.';
    if (codigo === '2') return 'V114.2=2 indica que el usuario no recibió esta atención por profesional de la salud no médico especialista en cuidado paliativo.';
    if (codigo === '3') return 'V114.2=3 corresponde a una opción eliminada del instructivo actual.';

    return `V114.2 tiene el valor ${texto(valor)}.`;
  }

  function describirValorV114_3(valor) {
    const codigo = normalizarCodigo(valor);

    if (!codigo) return 'V114.3 está vacía.';
    if (codigo === '1') return 'V114.3=1 indica que el usuario sí recibió consulta o procedimiento de cuidado paliativo por médico especialista de otra especialidad.';
    if (codigo === '2') return 'V114.3=2 indica que el usuario no recibió esta atención por médico especialista de otra especialidad.';
    if (codigo === '3') return 'V114.3=3 corresponde a una opción eliminada del instructivo actual.';

    return `V114.3 tiene el valor ${texto(valor)}.`;
  }

  function describirValorV114_4(valor) {
    const codigo = normalizarCodigo(valor);

    if (!codigo) return 'V114.4 está vacía.';
    if (codigo === '1') return 'V114.4=1 indica que el usuario sí recibió consulta o procedimiento de cuidado paliativo por médico general.';
    if (codigo === '2') return 'V114.4=2 indica que el usuario no recibió esta atención por médico general.';
    if (codigo === '3') return 'V114.4=3 corresponde a una opción eliminada del instructivo actual.';

    return `V114.4 tiene el valor ${texto(valor)}.`;
  }

  function describirValorV114_5(valor) {
    const codigo = normalizarCodigo(valor);

    if (!codigo) return 'V114.5 está vacía.';
    if (codigo === '1') return 'V114.5=1 indica que el usuario sí recibió consulta o procedimiento de cuidado paliativo por trabajo social.';
    if (codigo === '2') return 'V114.5=2 indica que el usuario no recibió esta atención por trabajo social.';
    if (codigo === '3') return 'V114.5=3 corresponde a una opción eliminada del instructivo actual.';

    return `V114.5 tiene el valor ${texto(valor)}.`;
  }

  function describirValorV114_6(valor) {
    const codigo = normalizarCodigo(valor);

    if (!codigo) return 'V114.6 está vacía.';
    if (codigo === '1') return 'V114.6=1 indica que el usuario sí recibió consulta o procedimiento de cuidado paliativo por otro profesional de salud no médico, incluye psicólogo, no especializado.';
    if (codigo === '2') return 'V114.6=2 indica que el usuario no recibió esta atención por otro profesional de salud no médico no especializado.';
    if (codigo === '3') return 'V114.6=3 corresponde a una opción eliminada del instructivo actual.';

    return `V114.6 tiene el valor ${texto(valor)}.`;
  }


  function describirValorV115(valor) {
    const fecha = normalizarFecha(valor);

    if (!fecha) return 'V115 está vacía.';
    if (fecha === NO_APLICA_FECHA) return 'V115=1845-01-01 indica No Aplica.';

    return `V115 registra la fecha ${fecha}.`;
  }


  function codigoV116(valor) {
    return texto(valor).trim();
  }

  function describirValorV116(valor) {
    const codigo = codigoV116(valor);

    if (!codigo) return 'V116 está vacía.';
    if (codigo === '98') return 'V116=98 indica No Aplica.';
    if (/^\d{12}$/.test(codigo)) return `V116 registra el código REPS ${codigo}.`;
    if (/^\d+$/.test(codigo) && codigo.length < 12) return `V116 registra ${codigo.length} dígitos. El código REPS debe tener 12 dígitos, incluido el cero inicial.`;
    if (/^\d+$/.test(codigo) && codigo.length > 12) return `V116 registra ${codigo.length} dígitos. El código REPS debe tener exactamente 12 dígitos.`;

    return `V116 tiene el valor ${texto(valor)}.`;
  }

  function describirValorV117(valor) {
    const codigo = normalizarCodigo(valor);

    if (!codigo) return 'V117 está vacía.';
    if (codigo === '1') return 'V117=1 indica que el usuario sí fue valorado por el servicio de psiquiatría en el periodo de reporte actual.';
    if (codigo === '2') return 'V117=2 indica que no fue valorado, pero la valoración por psiquiatría fue ordenada y está pendiente.';
    if (codigo === '98') return 'V117=98 indica No Aplica: no se ha ordenado valoración por psiquiatría.';

    return `V117 tiene el valor ${texto(valor)}.`;
  }


  function describirValorV118(valor) {
    const fecha = normalizarFecha(valor);

    if (!fecha) return 'V118 está vacía.';
    if (fecha === NO_APLICA_FECHA) return 'V118=1845-01-01 indica No Aplica: no hubo primera consulta con psiquiatría.';

    return `V118 registra la fecha ${fecha}.`;
  }

  function esValorPermitidoV111(valor) {
    return ['1', '98'].includes(normalizarCodigo(valor));
  }

  function tieneFormatoFecha(valor) {
    return /^\d{4}-\d{2}-\d{2}$/.test(normalizarFecha(valor));
  }

  function esFechaCalendarioValida(valor) {
    const fecha = normalizarFecha(valor);
    if (!tieneFormatoFecha(fecha)) return false;

    const [anio, mes, dia] = fecha.split('-').map(Number);
    const fechaUtc = new Date(Date.UTC(anio, mes - 1, dia));

    return fechaUtc.getUTCFullYear() === anio &&
      fechaUtc.getUTCMonth() === mes - 1 &&
      fechaUtc.getUTCDate() === dia;
  }


  function esFechaNoAplicaV112(valor) {
    return normalizarFecha(valor) === NO_APLICA_FECHA;
  }

  function esFechaRealValidaV112(valor) {
    return tieneFormatoFecha(valor) && esFechaCalendarioValida(valor) && !esFechaNoAplicaV112(valor);
  }


  function esFechaNoAplicaV115(valor) {
    return normalizarFecha(valor) === NO_APLICA_FECHA;
  }

  function esFechaRealValidaV115(valor) {
    return tieneFormatoFecha(valor) && esFechaCalendarioValida(valor) && !esFechaNoAplicaV115(valor);
  }


  function esFechaNoAplicaV118(valor) {
    return normalizarFecha(valor) === NO_APLICA_FECHA;
  }

  function esFechaRealValidaV118(valor) {
    return tieneFormatoFecha(valor) && esFechaCalendarioValida(valor) && !esFechaNoAplicaV118(valor);
  }

  const VARIABLES_CUIDADO_PALIATIVO = ['V114', 'V114_1', 'V114_2', 'V114_3', 'V114_4', 'V114_5', 'V114_6'];

  function valoresCuidadoPaliativoValidos(registro) {
    return VARIABLES_CUIDADO_PALIATIVO.every((variable) => {
      if (!Object.prototype.hasOwnProperty.call(registro || {}, variable)) return false;
      return ['1', '2'].includes(normalizarCodigo(registro?.[variable]));
    });
  }

  function recibioCuidadoPaliativo(registro) {
    return valoresCuidadoPaliativoValidos(registro) &&
      VARIABLES_CUIDADO_PALIATIVO.some((variable) => normalizarCodigo(registro?.[variable]) === '1');
  }

  function noRecibioCuidadoPaliativo(registro) {
    return valoresCuidadoPaliativoValidos(registro) &&
      VARIABLES_CUIDADO_PALIATIVO.every((variable) => normalizarCodigo(registro?.[variable]) === '2');
  }

  function datosBloqueCuidadoPaliativo(registro) {
    return VARIABLES_CUIDADO_PALIATIVO.map((variable) => dato(variable, registro?.[variable], `${variable}=${texto(registro?.[variable]) || '(vacío)'}`));
  }

  function esCodigoREPS12V113(valor) {
    return /^\d{12}$/.test(codigoV113(valor));
  }

  function esNoAplicaV113(valor) {
    return codigoV113(valor) === '98';
  }

  function esValor96V113(valor) {
    return codigoV113(valor) === '96';
  }

  function esValorPermitidoV113(valor) {
    return esCodigoREPS12V113(valor) || esNoAplicaV113(valor);
  }

  function esCodigoREPS12V116(valor) {
    return /^\d{12}$/.test(codigoV116(valor));
  }

  function esNoAplicaV116(valor) {
    return codigoV116(valor) === '98';
  }

  function esValorPermitidoV116(valor) {
    return esCodigoREPS12V116(valor) || esNoAplicaV116(valor);
  }

  function esValorPermitidoV117(valor) {
    return ['1', '2', '98'].includes(normalizarCodigo(valor));
  }


  function v117ValidaParaTrazabilidad(registro) {
    return Object.prototype.hasOwnProperty.call(registro || {}, 'V117') &&
      !estaVacio(registro?.V117) &&
      esValorPermitidoV117(registro?.V117);
  }

  function v115ValidaParaTrazabilidad(registro) {
    const valorV115 = registro?.V115;
    return Object.prototype.hasOwnProperty.call(registro || {}, 'V115') &&
      !estaVacio(valorV115) &&
      tieneFormatoFecha(valorV115) &&
      esFechaCalendarioValida(valorV115);
  }


  function esValorPermitidoV114(valor) {
    return ['1', '2'].includes(normalizarCodigo(valor));
  }

  function esValorPermitidoV114_1(valor) {
    return ['1', '2'].includes(normalizarCodigo(valor));
  }

  function esValorPermitidoV114_2(valor) {
    return ['1', '2'].includes(normalizarCodigo(valor));
  }

  function esValorPermitidoV114_3(valor) {
    return ['1', '2'].includes(normalizarCodigo(valor));
  }

  function esValorPermitidoV114_4(valor) {
    return ['1', '2'].includes(normalizarCodigo(valor));
  }

  function esValorPermitidoV114_5(valor) {
    return ['1', '2'].includes(normalizarCodigo(valor));
  }

  function esValorPermitidoV114_6(valor) {
    return ['1', '2'].includes(normalizarCodigo(valor));
  }

  // V111. El usuario, ¿recibió cirugía reconstructiva en el periodo de reporte actual?
  function validarV111(registro) {
    const hallazgos = [];
    const valor = registro?.V111;
    const codigo = normalizarCodigo(valor);

    if (estaVacio(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V111-ERROR-001',
        variable: 'V111',
        titulo: 'V111 está vacía',
        mensaje: 'V111 está vacía. Debe registrar 1 si el usuario recibió cirugía reconstructiva en el periodo de reporte actual, o 98 si no aplica.',
        regla: 'El instructivo de V111 exige registrar si el usuario recibió cirugía reconstructiva en el periodo actual: 1 si recibió o 98 si no aplica.',
        recomendacion: 'Revise V111 y registre 1 o 98 según corresponda.',
        valor,
        datosRelacionados: [
          dato('V111', valor, describirValorV111(valor))
        ],
        columnasCorregir: ['V111']
      }));
      return hallazgos;
    }

    if (codigo === '2') {
      hallazgos.push(crearHallazgo({
        codigo: 'V111-ERROR-002',
        variable: 'V111',
        titulo: 'V111 usa una opción eliminada',
        mensaje: 'V111 tiene el valor 2, pero esa opción fue eliminada. Si la cirugía reconstructiva fue propuesta pero no realizada, debe registrarse 98.',
        regla: 'El instructivo aclara que no aplica cirugía reconstructiva propuesta pero no realizada y que la opción 2 fue eliminada.',
        recomendacion: 'Corrija V111: use 1 si la cirugía reconstructiva fue realizada en el periodo de reporte actual, o 98 si no fue realizada o no aplica.',
        valor,
        datosRelacionados: [
          dato('V111', valor, describirValorV111(valor))
        ],
        columnasCorregir: ['V111']
      }));
      return hallazgos;
    }

    if (!esValorPermitidoV111(valor)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V111-ERROR-003',
        variable: 'V111',
        titulo: 'V111 tiene un valor fuera de catálogo',
        mensaje: 'V111 tiene un valor fuera de catálogo. Sólo se permite 1 si recibió cirugía reconstructiva o 98 si no aplica.',
        regla: 'El catálogo oficial de V111 sólo permite los valores 1 y 98. La opción 2 fue eliminada.',
        recomendacion: 'Revise V111 y reemplace el valor por 1 o 98 según el instructivo.',
        valor,
        datosRelacionados: [
          dato('V111', valor, describirValorV111(valor))
        ],
        columnasCorregir: ['V111']
      }));
    }

    return hallazgos;
  }

  // V112. Fecha de la cirugía reconstructiva
  function validarV112(registro) {
    const hallazgos = [];
    const valorV111 = registro?.V111;
    const valorV112 = registro?.V112;
    const codigoV111 = normalizarCodigo(valorV111);
    const fechaV112 = normalizarFecha(valorV112);

    if (estaVacio(valorV112)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V112-ERROR-001',
        variable: 'V112',
        titulo: 'V112 está vacía',
        mensaje: 'V112 está vacía. Debe registrar la fecha de la cirugía reconstructiva en formato AAAA-MM-DD, o 1845-01-01 si no aplica.',
        regla: 'El instructivo de V112 exige registrar la fecha de la cirugía reconstructiva o 1845-01-01 cuando no aplica.',
        recomendacion: 'Revise V112 y registre una fecha válida en formato AAAA-MM-DD, o 1845-01-01 si V111 indica No Aplica.',
        valor: valorV112,
        datosRelacionados: [
          dato('V111', valorV111, describirValorV111(valorV111)),
          dato('V112', valorV112, describirValorV112(valorV112))
        ],
        columnasCorregir: ['V112']
      }));
      return hallazgos;
    }

    if (!tieneFormatoFecha(valorV112)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V112-ERROR-002',
        variable: 'V112',
        titulo: 'V112 no tiene formato AAAA-MM-DD',
        mensaje: 'V112 no tiene el formato permitido. Debe registrar la fecha en formato AAAA-MM-DD, o 1845-01-01 si no aplica.',
        regla: 'El instructivo de V112 exige registrar la fecha en formato AAAA-MM-DD.',
        recomendacion: 'Corrija V112 usando el formato AAAA-MM-DD. Ejemplo válido: 2025-03-15.',
        valor: valorV112,
        datosRelacionados: [
          dato('V112', valorV112, describirValorV112(valorV112))
        ],
        columnasCorregir: ['V112']
      }));
      return hallazgos;
    }

    if (!esFechaCalendarioValida(valorV112)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V112-ERROR-003',
        variable: 'V112',
        titulo: 'V112 registra una fecha inexistente',
        mensaje: 'V112 tiene formato AAAA-MM-DD, pero la fecha registrada no existe en el calendario.',
        regla: 'V112 debe contener una fecha calendario válida o 1845-01-01 cuando no aplica.',
        recomendacion: 'Revise V112 y corrija la fecha de la cirugía reconstructiva.',
        valor: valorV112,
        datosRelacionados: [
          dato('V112', valorV112, describirValorV112(valorV112))
        ],
        columnasCorregir: ['V112']
      }));
      return hallazgos;
    }

    if (codigoV111 === '98' && fechaV112 !== NO_APLICA_FECHA) {
      hallazgos.push(crearHallazgo({
        codigo: 'V112-ERROR-004',
        variable: 'V112',
        titulo: 'V112 no corresponde con V111',
        mensaje: 'V112 no corresponde con V111. Si V111=98 indica que no recibió cirugía reconstructiva o no aplica, V112 debe registrarse como 1845-01-01.',
        regla: 'V111 define si recibió cirugía reconstructiva. Cuando V111=98, la fecha de cirugía reconstructiva en V112 debe quedar como No Aplica.',
        recomendacion: 'Corrija V112 y registre 1845-01-01, o revise V111 si el usuario realmente recibió cirugía reconstructiva.',
        valor: valorV112,
        datosRelacionados: [
          dato('V111', valorV111, describirValorV111(valorV111)),
          dato('V112', valorV112, describirValorV112(valorV112))
        ],
        columnasCorregir: ['V112']
      }));
    }

    if (codigoV111 === '1' && fechaV112 === NO_APLICA_FECHA) {
      hallazgos.push(crearHallazgo({
        codigo: 'V112-ERROR-005',
        variable: 'V112',
        titulo: 'V112 está en No Aplica aunque V111 indica cirugía reconstructiva',
        mensaje: 'V112 está en No Aplica aunque V111 indica que sí recibió cirugía reconstructiva. Si V111=1, V112 debe registrar la fecha real de la cirugía reconstructiva.',
        regla: 'V111=1 habilita el registro de la fecha de la cirugía reconstructiva en V112. En ese caso V112 no debe ser 1845-01-01.',
        recomendacion: 'Corrija V112 y registre la fecha real de la cirugía reconstructiva en formato AAAA-MM-DD.',
        valor: valorV112,
        datosRelacionados: [
          dato('V111', valorV111, describirValorV111(valorV111)),
          dato('V112', valorV112, describirValorV112(valorV112))
        ],
        columnasCorregir: ['V112']
      }));
    }

    return hallazgos;
  }


  // V113. Código de la IPS que realizó cirugía reconstructiva
  function validarV113(registro) {
    const hallazgos = [];
    const valorV111 = registro?.V111;
    const valorV112 = registro?.V112;
    const valorV113 = registro?.V113;
    const codigoV111 = normalizarCodigo(valorV111);
    const codigo = codigoV113(valorV113);

    if (estaVacio(valorV113)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V113-ERROR-001',
        variable: 'V113',
        titulo: 'V113 está vacía',
        mensaje: 'V113 está vacía. Debe registrar el código REPS de 12 dígitos de la IPS que realizó la cirugía reconstructiva, o 98 si no aplica.',
        regla: 'El instructivo de V113 exige registrar el código de habilitación de la IPS que realizó la cirugía reconstructiva, o 98 cuando no aplica.',
        recomendacion: 'Revise V113 y registre un código REPS de 12 dígitos, incluido el cero inicial si aplica, o 98 si no aplica.',
        valor: valorV113,
        datosRelacionados: [
          dato('V111', valorV111, describirValorV111(valorV111)),
          dato('V112', valorV112, describirValorV112(valorV112)),
          dato('V113', valorV113, describirValorV113(valorV113))
        ],
        columnasCorregir: ['V113']
      }));
      return hallazgos;
    }

    if (esValor96V113(valorV113)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V113-ERROR-003',
        variable: 'V113',
        titulo: 'V113 registra 96, valor no permitido',
        mensaje: 'V113 registra 96, pero ese valor no está permitido en el instructivo de esta variable. Para V113 sólo se permite código REPS de 12 dígitos o 98 como No Aplica.',
        regla: 'El instructivo de V113 sólo define 98 como No Aplica. No define 96 como valor permitido.',
        recomendacion: 'Corrija V113. Registre el código REPS de 12 dígitos de la IPS que realizó la cirugía reconstructiva, o 98 si no aplica.',
        valor: valorV113,
        datosRelacionados: [
          dato('V113', valorV113, describirValorV113(valorV113))
        ],
        columnasCorregir: ['V113']
      }));
      return hallazgos;
    }

    if (!esValorPermitidoV113(valorV113)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V113-ERROR-002',
        variable: 'V113',
        titulo: 'V113 no es 98 ni código REPS de 12 dígitos',
        mensaje: 'V113 no tiene un valor permitido. Debe registrar un código REPS de 12 dígitos, incluido el cero inicial si aplica, o 98 si no aplica.',
        regla: 'El instructivo de V113 exige código de habilitación de IPS de 12 dígitos o 98 como No Aplica.',
        recomendacion: 'Corrija V113. Use un código REPS de exactamente 12 dígitos o registre 98 cuando no aplique.',
        valor: valorV113,
        datosRelacionados: [
          dato('V113', valorV113, describirValorV113(valorV113))
        ],
        columnasCorregir: ['V113']
      }));
      return hallazgos;
    }

    if (codigoV111 === '98' && codigo !== '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V113-ERROR-004',
        variable: 'V113',
        titulo: 'V113 no corresponde con V111',
        mensaje: 'V113 no corresponde con V111. Si V111=98 indica que no recibió cirugía reconstructiva o no aplica, V113 debe registrarse como 98.',
        regla: 'V111 define si recibió cirugía reconstructiva. Cuando V111=98, no debe registrarse una IPS de cirugía reconstructiva en V113.',
        recomendacion: 'Corrija V113 y registre 98, o revise V111 si el usuario realmente recibió cirugía reconstructiva.',
        valor: valorV113,
        datosRelacionados: [
          dato('V111', valorV111, describirValorV111(valorV111)),
          dato('V113', valorV113, describirValorV113(valorV113))
        ],
        columnasCorregir: ['V113']
      }));
    }

    if (codigoV111 === '1' && esFechaRealValidaV112(valorV112) && codigo === '98') {
      hallazgos.push(crearHallazgo({
        codigo: 'V113-ERROR-005',
        variable: 'V113',
        titulo: 'V113 está en No Aplica aunque existe cirugía reconstructiva',
        mensaje: 'V113 está en No Aplica aunque V111 indica que sí recibió cirugía reconstructiva y V112 registra una fecha real. En este caso V113 debe registrar el código REPS de la IPS que realizó la cirugía reconstructiva.',
        regla: 'Si el usuario recibió cirugía reconstructiva y existe fecha real de esa cirugía, debe registrarse la IPS que la realizó.',
        recomendacion: 'Corrija V113 y registre el código REPS de 12 dígitos de la IPS que realizó la cirugía reconstructiva.',
        valor: valorV113,
        datosRelacionados: [
          dato('V111', valorV111, describirValorV111(valorV111)),
          dato('V112', valorV112, describirValorV112(valorV112)),
          dato('V113', valorV113, describirValorV113(valorV113))
        ],
        columnasCorregir: ['V113']
      }));
    }

    return hallazgos;
  }



  // V114. ¿El usuario fue valorado en consulta o procedimiento de cuidado paliativo en el periodo de reporte actual?
  function validarV114(registro) {
    const hallazgos = [];
    const valorV114 = registro?.V114;
    const codigo = normalizarCodigo(valorV114);

    if (estaVacio(valorV114)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V114-ERROR-001',
        variable: 'V114',
        titulo: 'V114 está vacía',
        mensaje: 'V114 está vacía. Debe registrar 1 si el usuario fue valorado en consulta o procedimiento de cuidado paliativo, o 2 si no recibió esta atención.',
        regla: 'El instructivo de V114 exige registrar si el usuario fue valorado en consulta o procedimiento de cuidado paliativo en el periodo de reporte actual: 1 si fue valorado o 2 si no recibió.',
        recomendacion: 'Revise V114 y registre 1 o 2 según corresponda.',
        valor: valorV114,
        datosRelacionados: [
          dato('V114', valorV114, describirValorV114(valorV114))
        ],
        columnasCorregir: ['V114']
      }));
      return hallazgos;
    }

    if (codigo === '3') {
      hallazgos.push(crearHallazgo({
        codigo: 'V114-ERROR-003',
        variable: 'V114',
        titulo: 'V114 usa una opción eliminada',
        mensaje: 'V114 registra 3, pero esa opción fue eliminada. No aplican consultas o procedimientos de cuidado paliativo propuestos pero no realizados.',
        regla: 'El instructivo de V114 aclara que no aplican consultas o procedimientos propuestos pero no realizados y que la opción 3 fue eliminada.',
        recomendacion: 'Corrija V114: registre 1 si el usuario fue valorado en consulta o procedimiento de cuidado paliativo, o 2 si no recibió esta atención.',
        valor: valorV114,
        datosRelacionados: [
          dato('V114', valorV114, describirValorV114(valorV114))
        ],
        columnasCorregir: ['V114']
      }));
      return hallazgos;
    }

    if (!esValorPermitidoV114(valorV114)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V114-ERROR-002',
        variable: 'V114',
        titulo: 'V114 tiene un valor fuera de catálogo',
        mensaje: 'V114 tiene un valor fuera de catálogo. Sólo se permite 1 si fue valorado en cuidado paliativo o 2 si no recibió esta atención.',
        regla: 'El catálogo oficial de V114 sólo permite los valores 1 y 2. La opción 3 fue eliminada.',
        recomendacion: 'Revise V114 y reemplace el valor por 1 o 2 según el instructivo.',
        valor: valorV114,
        datosRelacionados: [
          dato('V114', valorV114, describirValorV114(valorV114))
        ],
        columnasCorregir: ['V114']
      }));
    }

    return hallazgos;
  }


  // V114.1. El usuario recibió consulta o procedimiento de cuidado paliativo por médico especialista en cuidado paliativo
  function validarV114_1(registro) {
    const hallazgos = [];
    const valorV114_1 = registro?.V114_1;
    const codigoV114_1 = normalizarCodigo(valorV114_1);

    if (estaVacio(valorV114_1)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V114_1-ERROR-001',
        variable: 'V114_1',
        titulo: 'V114.1 está vacía',
        mensaje: 'V114.1 está vacía. Debe registrar 1 si el usuario recibió consulta o procedimiento de cuidado paliativo por médico especialista en cuidado paliativo, o 2 si no recibió.',
        regla: 'El instructivo de V114.1 exige registrar 1 si fue valorado por médico especialista en cuidado paliativo o 2 si no recibió.',
        recomendacion: 'Revise V114.1 y registre únicamente 1 o 2 según corresponda.',
        valor: valorV114_1,
        datosRelacionados: [
          dato('V114_1', valorV114_1, describirValorV114_1(valorV114_1))
        ],
        columnasCorregir: ['V114_1']
      }));
      return hallazgos;
    }

    if (codigoV114_1 === '3') {
      hallazgos.push(crearHallazgo({
        codigo: 'V114_1-ERROR-003',
        variable: 'V114_1',
        titulo: 'V114.1 usa una opción eliminada',
        mensaje: 'V114.1 registra 3, pero esa opción fue eliminada. No se deben reportar consultas o procedimientos de cuidado paliativo propuestos pero no realizados.',
        regla: 'La aclaración oficial elimina la opción 3 (no recibió, aunque fue propuesta) para las variables 114.1 a 114.6.',
        recomendacion: 'Corrija V114.1: use 1 si fue valorado por médico especialista en cuidado paliativo, o 2 si no recibió.',
        valor: valorV114_1,
        datosRelacionados: [
          dato('V114_1', valorV114_1, describirValorV114_1(valorV114_1))
        ],
        columnasCorregir: ['V114_1']
      }));
      return hallazgos;
    }

    if (!esValorPermitidoV114_1(valorV114_1)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V114_1-ERROR-002',
        variable: 'V114_1',
        titulo: 'V114.1 tiene un valor fuera de catálogo',
        mensaje: 'V114.1 tiene un valor fuera de catálogo. Sólo se permite 1 si fue valorado por médico especialista en cuidado paliativo, o 2 si no recibió. El valor 3 tiene una regla específica porque fue eliminado.',
        regla: 'El instructivo de V114.1 sólo permite los valores 1 y 2. La opción 3 fue eliminada y se reporta con ERROR-003.',
        recomendacion: 'Corrija V114.1 y registre 1 o 2. No use otros valores.',
        valor: valorV114_1,
        datosRelacionados: [
          dato('V114_1', valorV114_1, describirValorV114_1(valorV114_1))
        ],
        columnasCorregir: ['V114_1']
      }));
    }

    return hallazgos;
  }


  // V114.2. El usuario recibió consulta o procedimiento de cuidado paliativo por profesional de la salud no médico, incluye psicólogo, especialista en cuidado paliativo
  function validarV114_2(registro) {
    const hallazgos = [];
    const valorV114_2 = registro?.V114_2;
    const codigoV114_2 = normalizarCodigo(valorV114_2);

    if (estaVacio(valorV114_2)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V114_2-ERROR-001',
        variable: 'V114_2',
        titulo: 'V114.2 está vacía',
        mensaje: 'V114.2 está vacía. Debe registrar 1 si el usuario recibió consulta o procedimiento de cuidado paliativo por profesional de la salud no médico, incluye psicólogo, especialista en cuidado paliativo, o 2 si no recibió.',
        regla: 'El instructivo de V114.2 exige registrar 1 si fue valorado por profesional de la salud no médico especialista en cuidado paliativo o 2 si no recibió.',
        recomendacion: 'Revise V114.2 y registre únicamente 1 o 2 según corresponda.',
        valor: valorV114_2,
        datosRelacionados: [
          dato('V114_2', valorV114_2, describirValorV114_2(valorV114_2))
        ],
        columnasCorregir: ['V114_2']
      }));
      return hallazgos;
    }

    if (codigoV114_2 === '3') {
      hallazgos.push(crearHallazgo({
        codigo: 'V114_2-ERROR-003',
        variable: 'V114_2',
        titulo: 'V114.2 usa una opción eliminada',
        mensaje: 'V114.2 registra 3, pero esa opción fue eliminada. No se deben reportar consultas o procedimientos de cuidado paliativo propuestos pero no realizados.',
        regla: 'La aclaración oficial elimina la opción 3 (no recibió, aunque fue propuesta) para las variables 114.1 a 114.6.',
        recomendacion: 'Corrija V114.2: use 1 si fue valorado por profesional de la salud no médico especialista en cuidado paliativo, o 2 si no recibió.',
        valor: valorV114_2,
        datosRelacionados: [
          dato('V114_2', valorV114_2, describirValorV114_2(valorV114_2))
        ],
        columnasCorregir: ['V114_2']
      }));
      return hallazgos;
    }

    if (!esValorPermitidoV114_2(valorV114_2)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V114_2-ERROR-002',
        variable: 'V114_2',
        titulo: 'V114.2 tiene un valor fuera de catálogo',
        mensaje: 'V114.2 tiene un valor fuera de catálogo. Sólo se permite 1 si fue valorado por profesional de la salud no médico, incluye psicólogo, especialista en cuidado paliativo, o 2 si no recibió. El valor 3 tiene una regla específica porque fue eliminado.',
        regla: 'El instructivo de V114.2 sólo permite los valores 1 y 2. La opción 3 fue eliminada y se reporta con ERROR-003.',
        recomendacion: 'Corrija V114.2 y registre 1 o 2. No use otros valores.',
        valor: valorV114_2,
        datosRelacionados: [
          dato('V114_2', valorV114_2, describirValorV114_2(valorV114_2))
        ],
        columnasCorregir: ['V114_2']
      }));
    }

    return hallazgos;
  }


  // V114.3. El usuario recibió consulta o procedimiento de cuidado paliativo por médico especialista de otra especialidad
  function validarV114_3(registro) {
    const hallazgos = [];
    const valorV114_3 = registro?.V114_3;
    const codigoV114_3 = normalizarCodigo(valorV114_3);

    if (estaVacio(valorV114_3)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V114_3-ERROR-001',
        variable: 'V114_3',
        titulo: 'V114.3 está vacía',
        mensaje: 'V114.3 está vacía. Debe registrar 1 si el usuario recibió consulta o procedimiento de cuidado paliativo por médico especialista de otra especialidad, o 2 si no recibió.',
        regla: 'El instructivo de V114.3 exige registrar 1 si fue valorado por médico especialista de otra especialidad o 2 si no recibió.',
        recomendacion: 'Revise V114.3 y registre únicamente 1 o 2 según corresponda.',
        valor: valorV114_3,
        datosRelacionados: [
          dato('V114_3', valorV114_3, describirValorV114_3(valorV114_3))
        ],
        columnasCorregir: ['V114_3']
      }));
      return hallazgos;
    }

    if (codigoV114_3 === '3') {
      hallazgos.push(crearHallazgo({
        codigo: 'V114_3-ERROR-003',
        variable: 'V114_3',
        titulo: 'V114.3 usa una opción eliminada',
        mensaje: 'V114.3 registra 3, pero esa opción fue eliminada. No se deben reportar consultas o procedimientos de cuidado paliativo propuestos pero no realizados.',
        regla: 'La aclaración oficial elimina la opción 3 (no recibió, aunque fue propuesta) para las variables 114.1 a 114.6.',
        recomendacion: 'Corrija V114.3: use 1 si fue valorado por médico especialista de otra especialidad, o 2 si no recibió.',
        valor: valorV114_3,
        datosRelacionados: [
          dato('V114_3', valorV114_3, describirValorV114_3(valorV114_3))
        ],
        columnasCorregir: ['V114_3']
      }));
      return hallazgos;
    }

    if (!esValorPermitidoV114_3(valorV114_3)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V114_3-ERROR-002',
        variable: 'V114_3',
        titulo: 'V114.3 tiene un valor fuera de catálogo',
        mensaje: 'V114.3 tiene un valor fuera de catálogo. Sólo se permite 1 si fue valorado por médico especialista de otra especialidad, o 2 si no recibió. El valor 3 tiene una regla específica porque fue eliminado.',
        regla: 'El instructivo de V114.3 sólo permite los valores 1 y 2. La opción 3 fue eliminada y se reporta con ERROR-003.',
        recomendacion: 'Corrija V114.3 y registre 1 o 2. No use otros valores.',
        valor: valorV114_3,
        datosRelacionados: [
          dato('V114_3', valorV114_3, describirValorV114_3(valorV114_3))
        ],
        columnasCorregir: ['V114_3']
      }));
    }

    return hallazgos;
  }


  // V114.4. El usuario recibió consulta o procedimiento de cuidado paliativo por médico general
  function validarV114_4(registro) {
    const hallazgos = [];
    const valorV114_4 = registro?.V114_4;
    const codigoV114_4 = normalizarCodigo(valorV114_4);

    if (estaVacio(valorV114_4)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V114_4-ERROR-001',
        variable: 'V114_4',
        titulo: 'V114.4 está vacía',
        mensaje: 'V114.4 está vacía. Debe registrar 1 si el usuario recibió consulta o procedimiento de cuidado paliativo por médico general, o 2 si no recibió.',
        regla: 'El instructivo de V114.4 exige registrar 1 si fue valorado por médico general o 2 si no recibió.',
        recomendacion: 'Revise V114.4 y registre únicamente 1 o 2 según corresponda.',
        valor: valorV114_4,
        datosRelacionados: [
          dato('V114_4', valorV114_4, describirValorV114_4(valorV114_4))
        ],
        columnasCorregir: ['V114_4']
      }));
      return hallazgos;
    }

    if (codigoV114_4 === '3') {
      hallazgos.push(crearHallazgo({
        codigo: 'V114_4-ERROR-003',
        variable: 'V114_4',
        titulo: 'V114.4 usa una opción eliminada',
        mensaje: 'V114.4 registra 3, pero esa opción fue eliminada. No se deben reportar consultas o procedimientos de cuidado paliativo propuestos pero no realizados.',
        regla: 'La aclaración oficial elimina la opción 3 (no recibió, aunque fue propuesta) para las variables 114.1 a 114.6.',
        recomendacion: 'Corrija V114.4: use 1 si fue valorado por médico general, o 2 si no recibió.',
        valor: valorV114_4,
        datosRelacionados: [
          dato('V114_4', valorV114_4, describirValorV114_4(valorV114_4))
        ],
        columnasCorregir: ['V114_4']
      }));
      return hallazgos;
    }

    if (!esValorPermitidoV114_4(valorV114_4)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V114_4-ERROR-002',
        variable: 'V114_4',
        titulo: 'V114.4 tiene un valor fuera de catálogo',
        mensaje: 'V114.4 tiene un valor fuera de catálogo. Sólo se permite 1 si fue valorado por médico general, o 2 si no recibió. El valor 3 tiene una regla específica porque fue eliminado.',
        regla: 'El instructivo de V114.4 sólo permite los valores 1 y 2. La opción 3 fue eliminada y se reporta con ERROR-003.',
        recomendacion: 'Corrija V114.4 y registre 1 o 2. No use otros valores.',
        valor: valorV114_4,
        datosRelacionados: [
          dato('V114_4', valorV114_4, describirValorV114_4(valorV114_4))
        ],
        columnasCorregir: ['V114_4']
      }));
    }

    return hallazgos;
  }


  // V114.5. El usuario recibió consulta o procedimiento de cuidado paliativo por trabajo social
  function validarV114_5(registro) {
    const hallazgos = [];
    const valorV114_5 = registro?.V114_5;
    const codigoV114_5 = normalizarCodigo(valorV114_5);

    if (estaVacio(valorV114_5)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V114_5-ERROR-001',
        variable: 'V114_5',
        titulo: 'V114.5 está vacía',
        mensaje: 'V114.5 está vacía. Debe registrar 1 si el usuario recibió consulta o procedimiento de cuidado paliativo por trabajo social, o 2 si no recibió.',
        regla: 'El instructivo de V114.5 exige registrar 1 si fue valorado por trabajo social o 2 si no recibió.',
        recomendacion: 'Revise V114.5 y registre únicamente 1 o 2 según corresponda.',
        valor: valorV114_5,
        datosRelacionados: [
          dato('V114_5', valorV114_5, describirValorV114_5(valorV114_5))
        ],
        columnasCorregir: ['V114_5']
      }));
      return hallazgos;
    }

    if (codigoV114_5 === '3') {
      hallazgos.push(crearHallazgo({
        codigo: 'V114_5-ERROR-003',
        variable: 'V114_5',
        titulo: 'V114.5 usa una opción eliminada',
        mensaje: 'V114.5 registra 3, pero esa opción fue eliminada. No se deben reportar consultas o procedimientos de cuidado paliativo propuestos pero no realizados.',
        regla: 'La aclaración oficial elimina la opción 3 (no recibió, aunque fue propuesta) para las variables 114.1 a 114.6.',
        recomendacion: 'Corrija V114.5: use 1 si fue valorado por trabajo social, o 2 si no recibió.',
        valor: valorV114_5,
        datosRelacionados: [
          dato('V114_5', valorV114_5, describirValorV114_5(valorV114_5))
        ],
        columnasCorregir: ['V114_5']
      }));
      return hallazgos;
    }

    if (!esValorPermitidoV114_5(valorV114_5)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V114_5-ERROR-002',
        variable: 'V114_5',
        titulo: 'V114.5 tiene un valor fuera de catálogo',
        mensaje: 'V114.5 tiene un valor fuera de catálogo. Sólo se permite 1 si fue valorado por trabajo social, o 2 si no recibió. El valor 3 tiene una regla específica porque fue eliminado.',
        regla: 'El instructivo de V114.5 sólo permite los valores 1 y 2. La opción 3 fue eliminada y se reporta con ERROR-003.',
        recomendacion: 'Corrija V114.5 y registre 1 o 2. No use otros valores.',
        valor: valorV114_5,
        datosRelacionados: [
          dato('V114_5', valorV114_5, describirValorV114_5(valorV114_5))
        ],
        columnasCorregir: ['V114_5']
      }));
    }

    return hallazgos;
  }


  // V114.6. El usuario recibió consulta o procedimiento de cuidado paliativo por otro profesional de salud no médico, incluye psicólogo, no especializado
  function validarV114_6(registro) {
    const hallazgos = [];
    const valorV114_6 = registro?.V114_6;
    const codigoV114_6 = normalizarCodigo(valorV114_6);

    if (estaVacio(valorV114_6)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V114_6-ERROR-001',
        variable: 'V114_6',
        titulo: 'V114.6 está vacía',
        mensaje: 'V114.6 está vacía. Debe registrar 1 si el usuario recibió consulta o procedimiento de cuidado paliativo por otro profesional de salud no médico, incluye psicólogo, no especializado, o 2 si no recibió.',
        regla: 'El instructivo de V114.6 exige registrar 1 si fue valorado por otro profesional de salud no médico no especializado o 2 si no recibió.',
        recomendacion: 'Revise V114.6 y registre únicamente 1 o 2 según corresponda.',
        valor: valorV114_6,
        datosRelacionados: [
          dato('V114_6', valorV114_6, describirValorV114_6(valorV114_6))
        ],
        columnasCorregir: ['V114_6']
      }));
      return hallazgos;
    }

    if (codigoV114_6 === '3') {
      hallazgos.push(crearHallazgo({
        codigo: 'V114_6-ERROR-003',
        variable: 'V114_6',
        titulo: 'V114.6 usa una opción eliminada',
        mensaje: 'V114.6 registra 3, pero esa opción fue eliminada. No se deben reportar consultas o procedimientos de cuidado paliativo propuestos pero no realizados.',
        regla: 'La aclaración oficial elimina la opción 3 (no recibió, aunque fue propuesta) para las variables 114.1 a 114.6.',
        recomendacion: 'Corrija V114.6: use 1 si fue valorado por otro profesional de salud no médico no especializado, o 2 si no recibió.',
        valor: valorV114_6,
        datosRelacionados: [
          dato('V114_6', valorV114_6, describirValorV114_6(valorV114_6))
        ],
        columnasCorregir: ['V114_6']
      }));
      return hallazgos;
    }

    if (!esValorPermitidoV114_6(valorV114_6)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V114_6-ERROR-002',
        variable: 'V114_6',
        titulo: 'V114.6 tiene un valor fuera de catálogo',
        mensaje: 'V114.6 tiene un valor fuera de catálogo. Sólo se permite 1 si fue valorado por otro profesional de salud no médico, incluye psicólogo, no especializado, o 2 si no recibió. El valor 3 tiene una regla específica porque fue eliminado.',
        regla: 'El instructivo de V114.6 sólo permite los valores 1 y 2. La opción 3 fue eliminada y se reporta con ERROR-003.',
        recomendacion: 'Corrija V114.6 y registre 1 o 2. No use otros valores.',
        valor: valorV114_6,
        datosRelacionados: [
          dato('V114_6', valorV114_6, describirValorV114_6(valorV114_6))
        ],
        columnasCorregir: ['V114_6']
      }));
    }

    return hallazgos;
  }


  // V115. Fecha de primera consulta o procedimiento de cuidado paliativo en el periodo de reporte actual
  function validarV115(registro) {
    const hallazgos = [];
    const valorV115 = registro?.V115;
    const fechaV115 = normalizarFecha(valorV115);

    if (estaVacio(valorV115)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V115-ERROR-001',
        variable: 'V115',
        titulo: 'V115 está vacía',
        mensaje: 'V115 está vacía. Debe registrar la fecha de primera consulta o procedimiento de cuidado paliativo en formato AAAA-MM-DD, o 1845-01-01 si no aplica.',
        regla: 'El instructivo de V115 exige registrar la fecha de primera interconsulta o procedimiento de cuidado paliativo, o 1845-01-01 cuando no aplica.',
        recomendacion: 'Revise V115 y registre una fecha válida en formato AAAA-MM-DD, o 1845-01-01 si no aplica.',
        valor: valorV115,
        datosRelacionados: [
          dato('V115', valorV115, describirValorV115(valorV115))
        ],
        columnasCorregir: ['V115']
      }));
      return hallazgos;
    }

    if (!tieneFormatoFecha(valorV115)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V115-ERROR-002',
        variable: 'V115',
        titulo: 'V115 tiene formato inválido',
        mensaje: 'V115 tiene un formato inválido. Debe registrar la fecha en formato AAAA-MM-DD.',
        regla: 'El instructivo de V115 exige registrar la fecha en formato AAAA-MM-DD. Si sólo conoce año y mes, registre el día 15.',
        recomendacion: 'Corrija V115 usando el formato AAAA-MM-DD; por ejemplo, 2025-03-15.',
        valor: valorV115,
        datosRelacionados: [
          dato('V115', valorV115, describirValorV115(valorV115))
        ],
        columnasCorregir: ['V115']
      }));
      return hallazgos;
    }

    if (!esFechaCalendarioValida(valorV115)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V115-ERROR-003',
        variable: 'V115',
        titulo: 'V115 registra una fecha inexistente',
        mensaje: 'V115 registra una fecha inexistente. Verifique año, mes y día.',
        regla: 'Además de cumplir el formato AAAA-MM-DD, la fecha de V115 debe existir en el calendario.',
        recomendacion: 'Revise V115 y corrija la fecha. Si sólo conoce año y mes, use el día 15.',
        valor: valorV115,
        datosRelacionados: [
          dato('V115', valorV115, describirValorV115(valorV115))
        ],
        columnasCorregir: ['V115']
      }));
      return hallazgos;
    }

    if (!valoresCuidadoPaliativoValidos(registro)) {
      return hallazgos;
    }

    if (noRecibioCuidadoPaliativo(registro) && esFechaRealValidaV115(valorV115)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V115-ERROR-004',
        variable: 'V115',
        titulo: 'V115 registra fecha real aunque no recibió cuidado paliativo',
        mensaje: 'V115 registra una fecha real, pero el bloque de cuidado paliativo indica que el usuario no recibió consulta ni procedimiento en el periodo. Si no recibió cuidado paliativo, V115 debe ser 1845-01-01.',
        regla: 'Cuando V114 y V114.1 a V114.6 indican que no recibió cuidado paliativo, la fecha de primera consulta o procedimiento no aplica y debe registrarse 1845-01-01.',
        recomendacion: 'Revise V114, V114.1 a V114.6 y V115. Si no recibió cuidado paliativo, registre 1845-01-01 en V115.',
        valor: valorV115,
        datosRelacionados: [
          ...datosBloqueCuidadoPaliativo(registro),
          dato('V115', valorV115, describirValorV115(valorV115))
        ],
        columnasCorregir: ['V114', 'V114_1', 'V114_2', 'V114_3', 'V114_4', 'V114_5', 'V114_6', 'V115']
      }));
    }

    if (recibioCuidadoPaliativo(registro) && esFechaNoAplicaV115(valorV115)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V115-ERROR-005',
        variable: 'V115',
        titulo: 'V115 registra No Aplica aunque sí recibió cuidado paliativo',
        mensaje: 'V115 registra 1845-01-01 como No Aplica, pero el bloque de cuidado paliativo indica que el usuario sí recibió consulta o procedimiento en el periodo. Debe registrar la fecha de primera consulta o procedimiento de cuidado paliativo.',
        regla: 'Cuando V114 o alguna subvariable V114.1 a V114.6 indica que sí recibió cuidado paliativo, V115 debe contener una fecha real válida.',
        recomendacion: 'Revise V115 y registre la fecha real de primera consulta o procedimiento de cuidado paliativo en formato AAAA-MM-DD.',
        valor: valorV115,
        datosRelacionados: [
          ...datosBloqueCuidadoPaliativo(registro),
          dato('V115', valorV115, describirValorV115(valorV115))
        ],
        columnasCorregir: ['V114', 'V114_1', 'V114_2', 'V114_3', 'V114_4', 'V114_5', 'V114_6', 'V115']
      }));
    }

    return hallazgos;
  }


  // V116. Código de la IPS donde recibe la atención de cuidado paliativo en el periodo de reporte actual
  function validarV116(registro) {
    const hallazgos = [];
    const valorV116 = registro?.V116;
    const codigo = codigoV116(valorV116);
    const valorV115 = registro?.V115;

    if (estaVacio(valorV116)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V116-ERROR-001',
        variable: 'V116',
        titulo: 'V116 está vacía',
        mensaje: 'V116 está vacía. Debe registrar el código de habilitación IPS de 12 dígitos donde recibió la atención de cuidado paliativo, o 98 si no aplica.',
        regla: 'El instructivo de V116 exige registrar el código de habilitación de IPS disponible en REPS, de 12 dígitos incluido el cero inicial, o 98 cuando no aplica.',
        recomendacion: 'Revise V116 y registre 98 si no aplica, o un código IPS REPS de exactamente 12 dígitos.',
        valor: valorV116,
        datosRelacionados: [
          dato('V116', valorV116, describirValorV116(valorV116))
        ],
        columnasCorregir: ['V116']
      }));
      return hallazgos;
    }

    if (!esValorPermitidoV116(valorV116)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V116-ERROR-002',
        variable: 'V116',
        titulo: 'V116 tiene un código IPS inválido',
        mensaje: 'V116 tiene un código IPS inválido. Debe registrar 98 si no aplica, o un código de habilitación REPS de exactamente 12 dígitos, incluido el cero inicial. Verifique si Excel o la base de datos eliminó ceros iniciales.',
        regla: 'El instructivo de V116 permite únicamente 98 o código REPS de 12 dígitos. Los códigos con menos de 12 dígitos, más de 12 dígitos, letras, símbolos, decimales o espacios internos no son válidos.',
        recomendacion: 'Corrija V116. No autocomplete ceros sin verificar el código real en REPS; si el código inicia con cero, debe conservar los 12 dígitos.',
        valor: valorV116,
        datosRelacionados: [
          dato('V116', valorV116, describirValorV116(valorV116))
        ],
        columnasCorregir: ['V116']
      }));
      return hallazgos;
    }

    if (!v115ValidaParaTrazabilidad(registro)) {
      return hallazgos;
    }

    if (esFechaNoAplicaV115(valorV115) && esCodigoREPS12V116(valorV116)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V116-ERROR-003',
        variable: 'V116',
        titulo: 'V116 registra IPS aunque V115 no aplica',
        mensaje: 'V116 registra un código IPS, pero V115 está en 1845-01-01 como No Aplica. Si no hubo consulta o procedimiento de cuidado paliativo, V116 debe ser 98.',
        regla: 'Cuando V115 es 1845-01-01, la atención de cuidado paliativo no aplica y V116 debe registrarse como 98.',
        recomendacion: 'Revise V115 y V116. Si no hubo atención de cuidado paliativo, registre 98 en V116; si sí hubo atención, registre la fecha real en V115.',
        valor: valorV116,
        datosRelacionados: [
          dato('V115', valorV115, describirValorV115(valorV115)),
          dato('V116', valorV116, describirValorV116(valorV116))
        ],
        columnasCorregir: ['V115', 'V116']
      }));
    }

    if (esFechaRealValidaV115(valorV115) && esNoAplicaV116(valorV116)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V116-ERROR-004',
        variable: 'V116',
        titulo: 'V116 registra No Aplica aunque V115 tiene fecha real',
        mensaje: 'V116 registra 98 como No Aplica, pero V115 tiene una fecha real de consulta o procedimiento de cuidado paliativo. Debe registrar el código de habilitación IPS de 12 dígitos donde recibió la atención.',
        regla: 'Cuando V115 tiene una fecha real válida, V116 debe registrar el código de habilitación IPS de 12 dígitos donde recibió la atención de cuidado paliativo.',
        recomendacion: 'Revise V116 y registre el código IPS REPS de 12 dígitos, incluido el cero inicial.',
        valor: valorV116,
        datosRelacionados: [
          dato('V115', valorV115, describirValorV115(valorV115)),
          dato('V116', valorV116, describirValorV116(valorV116))
        ],
        columnasCorregir: ['V115', 'V116']
      }));
    }

    return hallazgos;
  }


  // V117. ¿Ha sido valorado el usuario por el servicio de psiquiatría en el periodo de reporte actual?
  function validarV117(registro) {
    const hallazgos = [];
    const valorV117 = registro?.V117;
    if (estaVacio(valorV117)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V117-ERROR-001',
        variable: 'V117',
        titulo: 'V117 está vacía',
        mensaje: 'V117 está vacía. Debe registrar 1 si el usuario fue valorado por psiquiatría, 2 si se ordenó pero está pendiente, o 98 si no aplica porque no se ha ordenado valoración por psiquiatría.',
        regla: 'El instructivo de V117 exige registrar si el usuario ha sido valorado por el servicio de psiquiatría en el periodo de reporte actual: 1 si fue valorado, 2 si se ordenó pero está pendiente, o 98 si no se ha ordenado.',
        recomendacion: 'Revise V117 y registre únicamente 1, 2 o 98 según el instructivo.',
        valor: valorV117,
        datosRelacionados: [
          dato('V117', valorV117, describirValorV117(valorV117))
        ],
        columnasCorregir: ['V117']
      }));
      return hallazgos;
    }

    if (!esValorPermitidoV117(valorV117)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V117-ERROR-002',
        variable: 'V117',
        titulo: 'V117 tiene un valor fuera de catálogo',
        mensaje: 'V117 tiene un valor fuera de catálogo. Sólo se permite 1 si fue valorado, 2 si se ordenó pero está pendiente, o 98 si no aplica porque no se ha ordenado valoración por psiquiatría.',
        regla: 'El instructivo de V117 sólo permite los valores 1, 2 y 98. No define otros códigos válidos ni trazabilidad con variables anteriores.',
        recomendacion: 'Corrija V117 y registre 1, 2 o 98. No use otros valores.',
        valor: valorV117,
        datosRelacionados: [
          dato('V117', valorV117, describirValorV117(valorV117))
        ],
        columnasCorregir: ['V117']
      }));
    }

    return hallazgos;
  }


  // V118. Fecha de primera consulta con el servicio de psiquiatría en el periodo de reporte actual
  function validarV118(registro) {
    const hallazgos = [];
    const valorV118 = registro?.V118;
    const valorV117 = registro?.V117;
    const codigoV117 = normalizarCodigo(valorV117);

    if (estaVacio(valorV118)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V118-ERROR-001',
        variable: 'V118',
        titulo: 'V118 está vacía',
        mensaje: 'V118 está vacía. Debe registrar la fecha de primera consulta con el servicio de psiquiatría en formato AAAA-MM-DD, o 1845-01-01 si no aplica.',
        regla: 'El instructivo de V118 exige registrar la fecha de primera interconsulta con psiquiatría en formato AAAA-MM-DD. Si sólo conoce año y mes, debe registrar el día 15. El valor 1845-01-01 significa No Aplica.',
        recomendacion: 'Revise V118 y registre una fecha válida en formato AAAA-MM-DD, o 1845-01-01 si no aplica.',
        valor: valorV118,
        datosRelacionados: [
          dato('V118', valorV118, describirValorV118(valorV118))
        ],
        columnasCorregir: ['V118']
      }));
      return hallazgos;
    }

    if (!tieneFormatoFecha(valorV118)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V118-ERROR-002',
        variable: 'V118',
        titulo: 'V118 tiene formato inválido',
        mensaje: 'V118 tiene un formato inválido. Debe registrar la fecha en formato AAAA-MM-DD.',
        regla: 'El instructivo de V118 exige registrar la fecha de primera interconsulta con psiquiatría en formato AAAA-MM-DD. Si sólo conoce año y mes, registre el día 15.',
        recomendacion: 'Corrija V118 usando el formato AAAA-MM-DD; por ejemplo, 2025-03-15, o registre 1845-01-01 si no aplica.',
        valor: valorV118,
        datosRelacionados: [
          dato('V118', valorV118, describirValorV118(valorV118))
        ],
        columnasCorregir: ['V118']
      }));
      return hallazgos;
    }

    if (!esFechaCalendarioValida(valorV118)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V118-ERROR-003',
        variable: 'V118',
        titulo: 'V118 registra una fecha inexistente',
        mensaje: 'V118 registra una fecha inexistente. Verifique año, mes y día.',
        regla: 'Además de cumplir el formato AAAA-MM-DD, la fecha de V118 debe existir en el calendario.',
        recomendacion: 'Revise V118 y corrija la fecha. Si sólo conoce año y mes, use el día 15.',
        valor: valorV118,
        datosRelacionados: [
          dato('V118', valorV118, describirValorV118(valorV118))
        ],
        columnasCorregir: ['V118']
      }));
      return hallazgos;
    }

    if (!v117ValidaParaTrazabilidad(registro)) {
      return hallazgos;
    }

    if ((codigoV117 === '2' || codigoV117 === '98') && esFechaRealValidaV118(valorV118)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V118-ERROR-004',
        variable: 'V118',
        titulo: 'V118 registra fecha real aunque no hubo valoración efectiva por psiquiatría',
        mensaje: 'V118 registra una fecha real, pero V117 indica que la valoración por psiquiatría está pendiente o no aplica. En ese caso, V118 debe ser 1845-01-01.',
        regla: 'La trazabilidad V117→V118 indica que si V117=2 (se ordenó, pero está pendiente) o V117=98 (no se ha ordenado valoración), no existe primera consulta efectiva con psiquiatría y V118 debe registrarse como 1845-01-01.',
        recomendacion: 'Revise V117 y V118. Si la consulta aún está pendiente o no se ha ordenado, registre 1845-01-01 en V118; si ya hubo consulta, corrija V117 a 1 y conserve la fecha real.',
        valor: valorV118,
        datosRelacionados: [
          dato('V117', valorV117, describirValorV117(valorV117)),
          dato('V118', valorV118, describirValorV118(valorV118))
        ],
        columnasCorregir: ['V117', 'V118']
      }));
    }

    if (codigoV117 === '1' && esFechaNoAplicaV118(valorV118)) {
      hallazgos.push(crearHallazgo({
        codigo: 'V118-ERROR-005',
        variable: 'V118',
        titulo: 'V118 registra No Aplica aunque sí hubo valoración por psiquiatría',
        mensaje: 'V118 registra 1845-01-01 como No Aplica, pero V117 indica que el usuario sí fue valorado por psiquiatría. Debe registrar la fecha real de la primera consulta.',
        regla: 'La trazabilidad V117→V118 indica que si V117=1, el usuario sí fue valorado por psiquiatría y V118 debe contener la fecha real de primera consulta en formato AAAA-MM-DD.',
        recomendacion: 'Revise V118 y registre la fecha real de primera consulta con psiquiatría. Si realmente no hubo consulta, corrija V117 según corresponda.',
        valor: valorV118,
        datosRelacionados: [
          dato('V117', valorV117, describirValorV117(valorV117)),
          dato('V118', valorV118, describirValorV118(valorV118))
        ],
        columnasCorregir: ['V117', 'V118']
      }));
    }

    return hallazgos;
  }

  function validar(registro) {
    let hallazgos = [];

    // V111. El usuario, ¿recibió cirugía reconstructiva en el periodo de reporte actual?
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V111')) {
      hallazgos = hallazgos.concat(validarV111(registro));
    }

    // V112. Fecha de la cirugía reconstructiva
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V112')) {
      hallazgos = hallazgos.concat(validarV112(registro));
    }


    // V113. Código de la IPS que realizó cirugía reconstructiva
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V113')) {
      hallazgos = hallazgos.concat(validarV113(registro));
    }

    // V114. ¿El usuario fue valorado en consulta o procedimiento de cuidado paliativo en el periodo de reporte actual?
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V114')) {
      hallazgos = hallazgos.concat(validarV114(registro));
    }

    // V114.1. El usuario recibió consulta o procedimiento de cuidado paliativo por médico especialista en cuidado paliativo
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V114_1')) {
      hallazgos = hallazgos.concat(validarV114_1(registro));
    }

    // V114.2. El usuario recibió consulta o procedimiento de cuidado paliativo por profesional de la salud no médico, incluye psicólogo, especialista en cuidado paliativo
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V114_2')) {
      hallazgos = hallazgos.concat(validarV114_2(registro));
    }

    // V114.3. El usuario recibió consulta o procedimiento de cuidado paliativo por médico especialista, otra especialidad
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V114_3')) {
      hallazgos = hallazgos.concat(validarV114_3(registro));
    }

    // V114.4. El usuario recibió consulta o procedimiento de cuidado paliativo por médico general
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V114_4')) {
      hallazgos = hallazgos.concat(validarV114_4(registro));
    }


    // V114.5. El usuario recibió consulta o procedimiento de cuidado paliativo por trabajo social
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V114_5')) {
      hallazgos = hallazgos.concat(validarV114_5(registro));
    }

    // V114.6. El usuario recibió consulta o procedimiento de cuidado paliativo por otro profesional de salud no médico, incluye psicólogo, no especializado
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V114_6')) {
      hallazgos = hallazgos.concat(validarV114_6(registro));
    }

    // V115. Fecha de primera consulta o procedimiento de cuidado paliativo en el periodo de reporte actual
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V115')) {
      hallazgos = hallazgos.concat(validarV115(registro));
    }

    // V116. Código de la IPS donde recibe la atención de cuidado paliativo en el periodo de reporte actual
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V116')) {
      hallazgos = hallazgos.concat(validarV116(registro));
    }

    // V117. ¿Ha sido valorado el usuario por el servicio de psiquiatría en el periodo de reporte actual?
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V117')) {
      hallazgos = hallazgos.concat(validarV117(registro));
    }

    // V118. Fecha de primera consulta con el servicio de psiquiatría en el periodo de reporte actual
    if (Object.prototype.hasOwnProperty.call(registro || {}, 'V118')) {
      hallazgos = hallazgos.concat(validarV118(registro));
    }

    return hallazgos;
  }

  window.CACModulo19 = {
    version: VERSION,
    validar,
    validarV111,
    validarV112,
    validarV113,
    validarV114,
    validarV114_1,
    validarV114_2,
    validarV114_3,
    validarV114_4,
    validarV114_5,
    validarV114_6,
    validarV115,
    validarV116,
    validarV117,
    validarV118
  };
})();
