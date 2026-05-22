// =======================================================
// Validador CAC - ui/tabla-resultados.js
// Tabla con selector de pacientes por página.
// Detalle paginado de a 1 hallazgo por vez: Hallazgo 1, 2, 3...
// Ordena por fila Excel ascendente.
// =======================================================

(function () {
  'use strict';

  const ESTADO_TABLA = {
    resumen: null,
    resultadosOriginales: [],
    resultadosFiltrados: [],
    paginaActual: 1,
    resultadosPorPagina: 5,
    opcionesPorPagina: [5, 10, 15, 20],
    detalleAbiertoKey: null,
    paginaDetallePorKey: {},
    hallazgosPorPagina: 1,
    opcionesHallazgosPorPagina: [1, 2, 5, 10, 15, 20]
  };

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
    V11: 'Código EAPB o entidad territorial',
    V12: 'Pertenencia étnica',
    V13: 'Grupo poblacional',
    V14: 'Municipio de residencia',
    V15: 'Número telefónico',
    V16: 'Fecha de afiliación',

    // Sprint 2A - Bloque diagnóstico V17 a V24.
    V17: 'Código CIE-10 de la neoplasia maligna reportada',
    V18: 'Fecha de diagnóstico del cáncer reportado',
    V19: 'Fecha de nota de remisión o interconsulta',
    V20: 'Fecha de ingreso a la institución que realizó el diagnóstico',
    V21: 'Tipo de estudio diagnóstico',
    V22: 'Motivo por el cual no tuvo diagnóstico por histopatología',
    V23: 'Fecha de recolección de muestra para estudio histopatológico',
    V24: 'Fecha del primer o único informe histopatológico válido'
  };

  function texto(valor) {
    return String(valor ?? '').trim();
  }

  function escaparHTML(valor) {
    return texto(valor)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function obtenerNombreVariable(variable) {
    return NOMBRES_VARIABLES[variable] || variable || 'Dato relacionado';
  }

  function obtenerDocumento(resultado) {
    if (resultado.documento) {
      return resultado.documento;
    }

    const fila = resultado.fila || {};
    const tipo = texto(fila.V5);
    const numero = texto(fila.V6);

    if (tipo || numero) {
      return `${tipo} ${numero}`.trim();
    }

    return 'Sin documento';
  }

  function obtenerFilaExcel(resultado) {
    const fila = resultado.indiceFilaExcel ?? resultado.filaExcel ?? resultado.numeroFila ?? resultado.indiceFila ?? '';
    const numero = Number(fila);

    return Number.isFinite(numero) && numero > 0 ? numero : fila;
  }

  function obtenerFilaOrden(resultado) {
    const fila = Number(obtenerFilaExcel(resultado));

    return Number.isFinite(fila) ? fila : 999999999;
  }

  function ordenarPorFilaExcel(resultados) {
    return [...resultados].sort((a, b) => {
      const filaA = obtenerFilaOrden(a);
      const filaB = obtenerFilaOrden(b);

      if (filaA !== filaB) return filaA - filaB;

      return obtenerDocumento(a).localeCompare(obtenerDocumento(b), 'es');
    });
  }

  function obtenerErrores(resultado) {
    if (typeof resultado.errores === 'number') return resultado.errores;

    return (resultado.hallazgos || []).filter((hallazgo) => hallazgo.severidad === 'error').length;
  }

  function obtenerAdvertencias(resultado) {
    if (typeof resultado.advertencias === 'number') return resultado.advertencias;

    return (resultado.hallazgos || []).filter((hallazgo) => hallazgo.severidad === 'advertencia').length;
  }

  function obtenerEstado(resultado) {
    const errores = obtenerErrores(resultado);
    const advertencias = obtenerAdvertencias(resultado);

    if (errores > 0) return 'Con errores';
    if (advertencias > 0) return 'Con advertencias';
    return 'Sin problemas';
  }

  function crearKeyResultado(resultado, indiceGlobal) {
    const fila = obtenerFilaExcel(resultado);
    const documento = obtenerDocumento(resultado);

    return `${fila}-${documento}-${indiceGlobal}`;
  }

  function actualizarResumenVisual(resumen) {
    const totalFilas = resumen.totalPacientes ?? resumen.resultados?.length ?? 0;

    // Estas tarjetas cuentan filas/pacientes, no hallazgos individuales.
    const filasConErrores = resumen.conErrores
      ?? resumen.resultados?.filter((r) => obtenerErrores(r) > 0).length
      ?? 0;

    const filasSoloConAdvertencias = resumen.conAdvertencias
      ?? resumen.resultados?.filter((r) => obtenerErrores(r) === 0 && obtenerAdvertencias(r) > 0).length
      ?? 0;

    const filasSinHallazgos = resumen.sinProblemas
      ?? resumen.resultados?.filter((r) => obtenerErrores(r) === 0 && obtenerAdvertencias(r) === 0).length
      ?? 0;

    // Estos sí cuentan hallazgos individuales.
    const totalErroresDetectados = resumen.totalErrores
      ?? resumen.resultados?.reduce((total, r) => total + obtenerErrores(r), 0)
      ?? 0;

    const totalAdvertenciasDetectadas = resumen.totalAdvertencias
      ?? resumen.resultados?.reduce((total, r) => total + obtenerAdvertencias(r), 0)
      ?? 0;

    const totalHallazgosDetectados = totalErroresDetectados + totalAdvertenciasDetectadas;

    const totalPacientesEl = document.getElementById('total-pacientes');

    // Compatibilidad con nombres de IDs usados en distintas versiones del index.html.
    // El HTML actual usa pacientes-error / pacientes-advertencia / pacientes-ok.
    // Versiones anteriores usaban total-errores / total-advertencias / total-ok.
    const totalErroresEl = document.getElementById('pacientes-error') || document.getElementById('total-errores');
    const totalAdvertenciasEl = document.getElementById('pacientes-advertencia') || document.getElementById('total-advertencias');
    const totalOkEl = document.getElementById('pacientes-ok') || document.getElementById('total-ok');
    const resumenEl = document.getElementById('resultados-resumen');

    if (totalPacientesEl) totalPacientesEl.textContent = totalFilas;
    if (totalErroresEl) totalErroresEl.textContent = filasConErrores;
    if (totalAdvertenciasEl) totalAdvertenciasEl.textContent = filasSoloConAdvertencias;
    if (totalOkEl) totalOkEl.textContent = filasSinHallazgos;

    if (resumenEl) {
      resumenEl.innerHTML = `
        Validación completa. Se procesaron <strong>${totalFilas}</strong> filas del Excel.
        <strong>${filasConErrores}</strong> filas tienen al menos un error,
        <strong>${filasSoloConAdvertencias}</strong> filas tienen solo advertencias y
        <strong>${filasSinHallazgos}</strong> filas no tienen hallazgos.
        <br>
        <span class="resumen-hallazgos">
          Errores detectados: <strong>${totalErroresDetectados}</strong> ·
          Advertencias detectadas: <strong>${totalAdvertenciasDetectadas}</strong> ·
          Hallazgos totales: <strong>${totalHallazgosDetectados}</strong>
        </span>
        <br>
        <span class="resumen-nota">
          Nota: las tarjetas superiores cuentan filas/pacientes. Una misma fila puede tener varios errores o advertencias.
        </span>
      `;
    }
  }

  function obtenerRangoPagina() {
    const inicio = (ESTADO_TABLA.paginaActual - 1) * ESTADO_TABLA.resultadosPorPagina;
    const fin = inicio + ESTADO_TABLA.resultadosPorPagina;

    return { inicio, fin };
  }

  function obtenerTotalPaginas() {
    return Math.max(1, Math.ceil(ESTADO_TABLA.resultadosFiltrados.length / ESTADO_TABLA.resultadosPorPagina));
  }

  function obtenerResultadosPagina() {
    const { inicio, fin } = obtenerRangoPagina();

    return ESTADO_TABLA.resultadosFiltrados.slice(inicio, fin);
  }

  function crearClaseEstado(resultado) {
    const errores = obtenerErrores(resultado);
    const advertencias = obtenerAdvertencias(resultado);

    if (errores > 0) return 'estado-error';
    if (advertencias > 0) return 'estado-advertencia';
    return 'estado-ok';
  }

  function renderizarResultados(resumen) {
    ESTADO_TABLA.resumen = resumen;
    ESTADO_TABLA.resultadosOriginales = ordenarPorFilaExcel(Array.isArray(resumen.resultados) ? resumen.resultados : []);
    ESTADO_TABLA.resultadosFiltrados = [...ESTADO_TABLA.resultadosOriginales];
    ESTADO_TABLA.paginaActual = 1;
    ESTADO_TABLA.detalleAbiertoKey = null;
    ESTADO_TABLA.paginaDetallePorKey = {};

    actualizarResumenVisual(resumen);
    inyectarEstilosPaginacion();
    renderizarPaginaActual();
  }

  function renderizarPaginaActual() {
    const cuerpo = document.getElementById('tabla-cuerpo');
    const sinResultados = document.getElementById('sin-resultados');

    if (!cuerpo) return;

    cuerpo.innerHTML = '';

    const totalPaginas = obtenerTotalPaginas();

    if (ESTADO_TABLA.paginaActual > totalPaginas) {
      ESTADO_TABLA.paginaActual = totalPaginas;
    }

    if (ESTADO_TABLA.resultadosFiltrados.length === 0) {
      if (sinResultados) sinResultados.classList.remove('oculto');
      renderizarPaginadorTabla();
      return;
    }

    if (sinResultados) sinResultados.classList.add('oculto');

    const { inicio } = obtenerRangoPagina();
    const resultadosPagina = obtenerResultadosPagina();

    resultadosPagina.forEach((resultado, indicePagina) => {
      const indiceGlobal = inicio + indicePagina;
      const key = crearKeyResultado(resultado, indiceGlobal);
      const documento = obtenerDocumento(resultado);
      const filaExcel = obtenerFilaExcel(resultado);
      const errores = obtenerErrores(resultado);
      const advertencias = obtenerAdvertencias(resultado);
      const estado = obtenerEstado(resultado);
      const claseEstado = crearClaseEstado(resultado);
      const detalleAbierto = ESTADO_TABLA.detalleAbiertoKey === key;

      const fila = document.createElement('tr');
      fila.className = claseEstado;
      fila.innerHTML = `
        <td>
          <strong>Fila Excel ${escaparHTML(filaExcel)}</strong>
          <div class="texto-secundario-tabla">${escaparHTML(documento)}</div>
        </td>
        <td>${errores}</td>
        <td>${advertencias}</td>
        <td><span class="badge-estado ${claseEstado}">${escaparHTML(estado)}</span></td>
        <td>
          <button class="btn btn-secundario btn-pequeño btn-detalle-paciente" data-key="${escaparHTML(key)}" data-indice="${indiceGlobal}">
            ${detalleAbierto ? 'Ocultar detalle' : 'Ver qué corregir'}
          </button>
        </td>
      `;

      cuerpo.appendChild(fila);

      if (detalleAbierto) {
        const filaDetalle = document.createElement('tr');
        filaDetalle.className = 'fila-detalle-hallazgos';
        filaDetalle.innerHTML = `
          <td colspan="5">
            ${construirDetallePaginado(resultado, key)}
          </td>
        `;
        cuerpo.appendChild(filaDetalle);
      }
    });

    conectarEventosDetalle();
    renderizarPaginadorTabla();
  }

  function ordenarHallazgos(hallazgos) {
    return [...hallazgos].sort((a, b) => {
      const sevA = a.severidad === 'error' ? 0 : 1;
      const sevB = b.severidad === 'error' ? 0 : 1;

      if (sevA !== sevB) return sevA - sevB;

      const varA = texto(a.variable);
      const varB = texto(b.variable);

      return varA.localeCompare(varB, 'es', { numeric: true });
    });
  }

  function construirDetallePaginado(resultado, key) {
    const hallazgos = ordenarHallazgos(Array.isArray(resultado.hallazgos) ? resultado.hallazgos : []);
    const filaExcel = obtenerFilaExcel(resultado);
    const documento = obtenerDocumento(resultado);
    const totalHallazgos = hallazgos.length;
    const totalPaginasDetalle = Math.max(1, Math.ceil(totalHallazgos / ESTADO_TABLA.hallazgosPorPagina));
    const paginaDetalleActual = Math.min(
      ESTADO_TABLA.paginaDetallePorKey[key] || 1,
      totalPaginasDetalle
    );

    ESTADO_TABLA.paginaDetallePorKey[key] = paginaDetalleActual;

    const inicio = (paginaDetalleActual - 1) * ESTADO_TABLA.hallazgosPorPagina;
    const fin = inicio + ESTADO_TABLA.hallazgosPorPagina;
    const hallazgosPagina = hallazgos.slice(inicio, fin);

    if (totalHallazgos === 0) {
      return `
        <div class="detalle-paciente-paginado detalle-ok">
          <h3>Fila Excel ${escaparHTML(filaExcel)} · ${escaparHTML(documento)}</h3>
          <p>No se encontraron errores ni advertencias para este registro.</p>
        </div>
      `;
    }

    return `
      <div class="detalle-paciente-paginado">
        <div class="detalle-paciente-header">
          <div>
            <h3>Fila Excel ${escaparHTML(filaExcel)} · ${escaparHTML(documento)}</h3>
            <p>Mostrando ${inicio + 1} a ${Math.min(fin, totalHallazgos)} de ${totalHallazgos} hallazgos.</p>
          </div>

          <div class="detalle-contador">
            Página ${paginaDetalleActual} de ${totalPaginasDetalle}
          </div>
        </div>

        ${hallazgosPagina.map((hallazgo) => construirHallazgoUnico(hallazgo)).join('')}

        ${construirPaginadorDetalle(key, paginaDetalleActual, totalPaginasDetalle)}
      </div>
    `;
  }

  function construirHallazgoUnico(hallazgo) {
    const tipo = hallazgo.severidad === 'error' ? 'error' : 'advertencia';
    const tituloGrupo = tipo === 'error' ? 'Errores que deben corregirse' : 'Advertencias para revisar';
    const icono = tipo === 'error' ? '🔴' : '🟡';
    const claseGrupo = tipo === 'error' ? 'grupo-error' : 'grupo-advertencia';
    const descripcion = tipo === 'error'
      ? 'Este dato está mal o es incoherente. Debe corregirse antes de usar el reporte.'
      : 'Este dato puede ser válido, pero conviene confirmarlo porque puede afectar la calidad del reporte.';

    return `
      <section class="grupo-hallazgos ${claseGrupo}">
        <h4>${icono} ${escaparHTML(tituloGrupo)}</h4>
        <p>${escaparHTML(descripcion)}</p>
        <div class="lista-hallazgos-paginados">
          ${construirTarjetaHallazgo(hallazgo)}
        </div>
      </section>
    `;
  }

  function construirTarjetaHallazgo(hallazgo) {
    const severidad = hallazgo.severidad === 'error' ? 'error' : 'advertencia';
    const clase = severidad === 'error' ? 'tarjeta-hallazgo-error' : 'tarjeta-hallazgo-advertencia';
    const codigo = hallazgo.codigo || '';
    const variable = hallazgo.variable || '';
    const titulo = hallazgo.titulo || hallazgo.mensaje || '';
    const mensaje = hallazgo.mensaje || titulo || 'Hallazgo detectado.';
    const regla = hallazgo.regla || '';
    const recomendacion = hallazgo.recomendacion || 'Revise el dato en la matriz.';
    const columnas = obtenerColumnasCorregir(hallazgo);
    const datosRelacionados = obtenerDatosRelacionados(hallazgo);

    return `
      <article class="tarjeta-hallazgo ${clase}">
        <h5>${escaparHTML(codigo)}${codigo ? ' · ' : ''}${escaparHTML(titulo || obtenerNombreVariable(variable))}</h5>

        <p><strong>Qué pasa:</strong> ${escaparHTML(mensaje)}</p>

        <div class="datos-involucrados">
          <strong>Datos involucrados:</strong>
          <ul>
            ${datosRelacionados.map((item) => `
              <li>
                ${escaparHTML(item.variable || '')}${item.variable ? ' · ' : ''}
                ${escaparHTML(item.nombre || obtenerNombreVariable(item.variable))} =
                ${escaparHTML(texto(item.valor) || '(vacío)')}
                ${item.nota ? `<span class="nota-dato">(${escaparHTML(item.nota)})</span>` : ''}
              </li>
            `).join('')}
          </ul>
        </div>

        <p><strong>Dónde revisar:</strong> ${escaparHTML(columnas)}</p>

        ${regla ? `<p><strong>Por qué importa:</strong> ${escaparHTML(regla)}</p>` : ''}

        <p><strong>Qué hacer:</strong> ${escaparHTML(recomendacion)}</p>
      </article>
    `;
  }

  function obtenerColumnasCorregir(hallazgo) {
    const columnas = Array.isArray(hallazgo.columnasCorregir) && hallazgo.columnasCorregir.length > 0
      ? hallazgo.columnasCorregir
      : [hallazgo.variable].filter(Boolean);

    if (columnas.length === 0) {
      return 'Revise la fila completa.';
    }

    return columnas
      .map((columna) => {
        const codigoVariable = texto(columna);
        const nombreVariable = obtenerNombreVariable(codigoVariable);

        // Evita salidas duplicadas tipo "V21 (V21)" cuando todavía no exista
        // nombre descriptivo para una variable. Con el catálogo actualizado V17-V24
        // debe verse como: "V21 · Tipo de estudio diagnóstico".
        if (!codigoVariable) {
          return 'Revise la fila completa.';
        }

        if (!nombreVariable || nombreVariable === codigoVariable) {
          return codigoVariable;
        }

        return `${codigoVariable} · ${nombreVariable}`;
      })
      .join(', ');
  }

  function obtenerDatosRelacionados(hallazgo) {
    if (Array.isArray(hallazgo.datosRelacionados) && hallazgo.datosRelacionados.length > 0) {
      return hallazgo.datosRelacionados;
    }

    return [
      {
        variable: hallazgo.variable,
        nombre: obtenerNombreVariable(hallazgo.variable),
        valor: hallazgo.valor
      }
    ];
  }

  function construirPaginadorDetalle(key, paginaActual, totalPaginas) {
    if (totalPaginas <= 1 && ESTADO_TABLA.hallazgosPorPagina === 1) {
      return '';
    }

    const opcionesHallazgos = ESTADO_TABLA.opcionesHallazgosPorPagina.map((opcion) => `
      <option value="${opcion}" ${opcion === ESTADO_TABLA.hallazgosPorPagina ? 'selected' : ''}>
        ${opcion}
      </option>
    `).join('');

    return `
      <div class="paginador-detalle paginador-detalle-normal">
        <label class="selector-pagina-label" for="selector-hallazgos-por-pagina-${escaparHTML(key)}">
          Ver
          <select id="selector-hallazgos-por-pagina-${escaparHTML(key)}" class="selector-hallazgos-por-pagina" data-key="${escaparHTML(key)}">
            ${opcionesHallazgos}
          </select>
          hallazgo(s) por página
        </label>

        <div class="paginador-detalle-controles">
          <button class="btn btn-secundario btn-pequeño btn-detalle-prev" data-key="${escaparHTML(key)}" ${paginaActual <= 1 ? 'disabled' : ''}>
            Anterior
          </button>

          <span>Página ${paginaActual} de ${totalPaginas}</span>

          <button class="btn btn-secundario btn-pequeño btn-detalle-next" data-key="${escaparHTML(key)}" ${paginaActual >= totalPaginas ? 'disabled' : ''}>
            Siguiente
          </button>
        </div>
      </div>
    `;
  }

  function obtenerTotalHallazgosDetalleActual(key) {
    const resultado = encontrarResultadoPorKey(key);

    if (!resultado || !Array.isArray(resultado.hallazgos)) {
      return 0;
    }

    return resultado.hallazgos.length;
  }

  function encontrarResultadoPorKey(key) {
    const total = ESTADO_TABLA.resultadosFiltrados.length;

    for (let indice = 0; indice < total; indice += 1) {
      const resultado = ESTADO_TABLA.resultadosFiltrados[indice];
      const keyResultado = crearKeyResultado(resultado, indice);

      if (keyResultado === key) {
        return resultado;
      }
    }

    return null;
  }

  function conectarEventosDetalle() {
    document.querySelectorAll('.btn-detalle-paciente').forEach((boton) => {
      boton.addEventListener('click', function () {
        const key = boton.dataset.key;

        if (ESTADO_TABLA.detalleAbiertoKey === key) {
          ESTADO_TABLA.detalleAbiertoKey = null;
        } else {
          ESTADO_TABLA.detalleAbiertoKey = key;
          ESTADO_TABLA.paginaDetallePorKey[key] = ESTADO_TABLA.paginaDetallePorKey[key] || 1;
        }

        renderizarPaginaActual();
      });
    });

    document.querySelectorAll('.btn-detalle-prev').forEach((boton) => {
      boton.addEventListener('click', function () {
        const key = boton.dataset.key;
        ESTADO_TABLA.paginaDetallePorKey[key] = Math.max(1, (ESTADO_TABLA.paginaDetallePorKey[key] || 1) - 1);
        renderizarPaginaActual();
      });
    });

    document.querySelectorAll('.btn-detalle-next').forEach((boton) => {
      boton.addEventListener('click', function () {
        const key = boton.dataset.key;
        ESTADO_TABLA.paginaDetallePorKey[key] = (ESTADO_TABLA.paginaDetallePorKey[key] || 1) + 1;
        renderizarPaginaActual();
      });
    });

    document.querySelectorAll('.selector-hallazgos-por-pagina').forEach((selector) => {
      selector.addEventListener('change', function () {
        const key = selector.dataset.key;
        const cantidad = Number(selector.value);

        if (!key || !Number.isFinite(cantidad)) return;

        ESTADO_TABLA.hallazgosPorPagina = cantidad;
        ESTADO_TABLA.paginaDetallePorKey[key] = 1;
        renderizarPaginaActual();
      });
    });
  }

  function renderizarPaginadorTabla() {
    const tablaContenedor = document.querySelector('.tabla-contenedor');
    if (!tablaContenedor) return;

    let contenedor = document.getElementById('paginador-resultados');

    if (!contenedor) {
      contenedor = document.createElement('div');
      contenedor.id = 'paginador-resultados';
      contenedor.className = 'paginador-resultados';
      tablaContenedor.appendChild(contenedor);
    }

    const totalResultados = ESTADO_TABLA.resultadosFiltrados.length;
    const totalPaginas = obtenerTotalPaginas();
    const { inicio, fin } = obtenerRangoPagina();

    if (totalResultados === 0) {
      contenedor.innerHTML = '';
      return;
    }

    const opciones = ESTADO_TABLA.opcionesPorPagina.map((opcion) => `
      <option value="${opcion}" ${opcion === ESTADO_TABLA.resultadosPorPagina ? 'selected' : ''}>
        ${opcion}
      </option>
    `).join('');

    contenedor.innerHTML = `
      <div class="paginador-info">
        Mostrando ${inicio + 1} a ${Math.min(fin, totalResultados)} de ${totalResultados} registros, ordenados por fila Excel.
      </div>

      <div class="paginador-controles">
        <label class="selector-pagina-label" for="selector-resultados-por-pagina">
          Ver
          <select id="selector-resultados-por-pagina" class="selector-resultados-por-pagina">
            ${opciones}
          </select>
          por página
        </label>

        <button id="btn-pagina-anterior" class="btn btn-secundario btn-pequeño" ${ESTADO_TABLA.paginaActual <= 1 ? 'disabled' : ''}>
          Anterior
        </button>

        <span>Página ${ESTADO_TABLA.paginaActual} de ${totalPaginas}</span>

        <button id="btn-pagina-siguiente" class="btn btn-secundario btn-pequeño" ${ESTADO_TABLA.paginaActual >= totalPaginas ? 'disabled' : ''}>
          Siguiente
        </button>
      </div>
    `;

    const selector = document.getElementById('selector-resultados-por-pagina');
    const botonAnterior = document.getElementById('btn-pagina-anterior');
    const botonSiguiente = document.getElementById('btn-pagina-siguiente');

    if (selector) {
      selector.addEventListener('change', function () {
        ESTADO_TABLA.resultadosPorPagina = Number(selector.value) || 5;
        ESTADO_TABLA.paginaActual = 1;
        ESTADO_TABLA.detalleAbiertoKey = null;
        renderizarPaginaActual();
      });
    }

    if (botonAnterior) {
      botonAnterior.addEventListener('click', function () {
        ESTADO_TABLA.paginaActual = Math.max(1, ESTADO_TABLA.paginaActual - 1);
        ESTADO_TABLA.detalleAbiertoKey = null;
        renderizarPaginaActual();
      });
    }

    if (botonSiguiente) {
      botonSiguiente.addEventListener('click', function () {
        ESTADO_TABLA.paginaActual = Math.min(totalPaginas, ESTADO_TABLA.paginaActual + 1);
        ESTADO_TABLA.detalleAbiertoKey = null;
        renderizarPaginaActual();
      });
    }
  }

  function filtrarPorDocumento(valor) {
    const filtro = texto(valor).toLowerCase();

    ESTADO_TABLA.paginaActual = 1;
    ESTADO_TABLA.detalleAbiertoKey = null;

    if (!filtro) {
      ESTADO_TABLA.resultadosFiltrados = [...ESTADO_TABLA.resultadosOriginales];
    } else {
      ESTADO_TABLA.resultadosFiltrados = ESTADO_TABLA.resultadosOriginales.filter((resultado) => {
        const documento = obtenerDocumento(resultado).toLowerCase();

        return documento.includes(filtro);
      });
    }

    ESTADO_TABLA.resultadosFiltrados = ordenarPorFilaExcel(ESTADO_TABLA.resultadosFiltrados);

    renderizarPaginaActual();
  }

  function inyectarEstilosPaginacion() {
    if (document.getElementById('estilos-paginacion-resultados')) return;

    const style = document.createElement('style');
    style.id = 'estilos-paginacion-resultados';
    style.textContent = `
      .resumen-hallazgos {
        display: inline-block;
        margin-top: 0.35rem;
        color: #bfdbfe;
      }

      .resumen-nota {
        display: inline-block;
        margin-top: 0.25rem;
        color: #cbd5e1;
        opacity: 0.86;
        font-size: 0.95rem;
      }

      .texto-secundario-tabla {
        margin-top: 0.25rem;
        font-size: 0.9rem;
        opacity: 0.78;
      }

      .badge-estado {
        display: inline-block;
        padding: 0.35rem 0.7rem;
        border-radius: 999px;
        font-size: 0.85rem;
        font-weight: 700;
      }

      .badge-estado.estado-error {
        background: #fff1f2;
        color: #9f3a42;
        border: 1px solid #f3c7cc;
      }

      .badge-estado.estado-advertencia {
        background: #fff8e8;
        color: #8a620e;
        border: 1px solid #f1d99c;
      }

      .badge-estado.estado-ok {
        background: #effbf7;
        color: #24796c;
        border: 1px solid #b9e7dd;
      }

      .fila-detalle-hallazgos td {
        padding: 0;
        background: #ffffff;
      }

      .detalle-paciente-paginado {
        margin: 1rem 0;
        padding: 1.25rem;
        border: 1px solid #d8e9f3;
        border-radius: 1rem;
        background: #ffffff !important;
        box-shadow: 0 16px 36px rgba(46, 77, 98, 0.10);
        color: #17364a !important;
      }

      .detalle-paciente-header {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        align-items: flex-start;
        margin-bottom: 1rem;
      }

      .detalle-paciente-header h3 {
        margin: 0 0 0.4rem 0;
        color: #17364a !important;
      }

      .detalle-paciente-header p {
        margin: 0;
        color: #557086;
      }

      .detalle-contador {
        min-width: max-content;
        padding: 0.45rem 0.75rem;
        border-radius: 999px;
        background: #eef7ff;
        border: 1px solid #cfe2f6;
        color: #245b7a;
        font-weight: 800;
      }

      .grupo-hallazgos {
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 1rem;
      }

      .grupo-hallazgos h4 {
        margin: 0 0 0.5rem 0;
        color: #17364a;
      }

      .grupo-hallazgos > p {
        margin: 0 0 1rem 0;
        color: #557086;
      }

      .grupo-error {
        background: #fff5f5 !important;
        border: 1px solid #f3c7cc;
      }

      .grupo-advertencia {
        background: #fffaf0 !important;
        border: 1px solid #efd89c;
      }

      .lista-hallazgos-paginados {
        display: grid;
        gap: 1rem;
      }

      .tarjeta-hallazgo {
        padding: 1rem;
        border-radius: 0.9rem;
        background: #ffffff !important;
        border: 1px solid #e7eef3;
        color: #17364a;
      }

      .tarjeta-hallazgo h5 {
        margin: 0 0 0.85rem 0;
        font-size: 1rem;
        color: #17364a;
      }

      .tarjeta-hallazgo p {
        margin: 0.55rem 0;
        color: #557086;
      }

      .tarjeta-hallazgo p strong,
      .datos-involucrados strong {
        color: #17364a;
      }

      .datos-involucrados li {
        color: #557086;
      }

      .tarjeta-hallazgo-error {
        border-left: 6px solid #e76f73;
        border-top: 1px solid #f3c7cc;
        border-right: 1px solid #f3c7cc;
        border-bottom: 1px solid #f3c7cc;
      }

      .tarjeta-hallazgo-error h5 {
        color: #9f3a42;
      }

      .tarjeta-hallazgo-advertencia {
        border-left: 6px solid #e7b85f;
        border-top: 1px solid #efd89c;
        border-right: 1px solid #efd89c;
        border-bottom: 1px solid #efd89c;
      }

      .tarjeta-hallazgo-advertencia h5 {
        color: #8a620e;
      }

      .datos-involucrados ul {
        margin: 0.5rem 0 0.7rem 1.2rem;
      }

      .datos-involucrados li {
        margin: 0.35rem 0;
      }

      .nota-dato {
        opacity: 0.72;
      }

      .paginador-resultados,
      .paginador-detalle {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        margin-top: 1rem;
        padding: 0.9rem 1rem;
        border: 1px solid #d8e9f3;
        border-radius: 0.9rem;
        background: #f7fcff !important;
        color: #557086;
      }

      .paginador-controles {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        flex-wrap: wrap;
      }

      .paginador-info {
        color: #557086;
      }

      .selector-pagina-label {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        font-weight: 800;
        color: #315e75;
      }

      .selector-resultados-por-pagina,
      .selector-hallazgos-por-pagina {
        border: 1px solid #d8e9f3;
        border-radius: 0.6rem;
        background: #ffffff;
        color: #17364a;
        padding: 0.35rem 0.55rem;
      }

      .paginador-detalle span {
        font-weight: 800;
        color: #315e75;
      }

      .paginador-detalle-numerico {
        justify-content: center;
        flex-wrap: wrap;
      }

      .paginador-detalle-numeros {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.45rem;
        flex-wrap: wrap;
      }

      .paginador-detalle-normal {
        justify-content: space-between;
        flex-wrap: wrap;
      }

      .paginador-detalle-controles {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        flex-wrap: wrap;
      }

      .paginador-detalle-controles span {
        font-weight: 700;
        opacity: 0.9;
      }

      /* Refuerzo visual: evita que estilos oscuros en caché o del CSS global manchen el panel interno. */
      .fila-detalle-hallazgos,
      .fila-detalle-hallazgos td,
      .detalle-paciente-paginado,
      .detalle-paciente-paginado * {
        text-shadow: none !important;
      }

      .detalle-paciente-paginado {
        background: #ffffff !important;
      }

      .detalle-paciente-paginado .grupo-error {
        background: #fff5f5 !important;
      }

      .detalle-paciente-paginado .grupo-advertencia {
        background: #fffaf0 !important;
      }

      .detalle-paciente-paginado .tarjeta-hallazgo {
        background: #ffffff !important;
      }

      .detalle-paciente-paginado .paginador-detalle {
        background: #f7fcff !important;
      }

      @media (max-width: 768px) {
        .detalle-paciente-header,
        .paginador-resultados,
        .paginador-detalle {
          flex-direction: column;
          align-items: stretch;
        }

        .paginador-controles {
          justify-content: space-between;
        }
      }
    `;

    document.head.appendChild(style);
  }

  window.CACTablaResultadosUI = {
    renderizarResultados,
    filtrarPorDocumento
  };
})();
