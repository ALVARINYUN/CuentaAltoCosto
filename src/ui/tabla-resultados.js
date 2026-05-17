// =======================================================
// Validador CAC - ui/tabla-resultados.js
// Renderiza resumen y tabla de resultados Sprint 1
// =======================================================

(function () {
  'use strict';

  let resultadosActuales = [];

  function limpiarElemento(elemento) {
    while (elemento && elemento.firstChild) {
      elemento.removeChild(elemento.firstChild);
    }
  }

  function asignarTexto(id, texto) {
    const elemento = document.getElementById(id);

    if (elemento) {
      elemento.textContent = texto;
    }
  }

  function renderizarResumen(resumen) {
    asignarTexto('total-pacientes', resumen.totalPacientes);
    asignarTexto('total-errores', resumen.conErrores);
    asignarTexto('total-advertencias', resumen.totalAdvertencias);
    asignarTexto('total-ok', resumen.sinProblemas);

    const textoResumen = `Validación completa. ${resumen.totalPacientes} pacientes procesados. ${resumen.totalErrores} errores y ${resumen.totalAdvertencias} advertencias encontradas.`;
    asignarTexto('resultados-resumen', textoResumen);

    const botonExportar = document.getElementById('btn-exportar');

    if (botonExportar) {
      botonExportar.disabled = true;
      botonExportar.title = 'La exportación se conectará después de cerrar la validación Sprint 1.';
    }
  }

  function crearCelda(texto) {
    const celda = document.createElement('td');
    celda.textContent = texto;
    return celda;
  }

  function crearBadgeEstado(resultado) {
    const span = document.createElement('span');
    span.textContent = resultado.estado;
    span.className = 'estado-badge';

    if (resultado.errores > 0) {
      span.classList.add('estado-error');
    } else if (resultado.advertencias > 0) {
      span.classList.add('estado-advertencia');
    } else {
      span.classList.add('estado-ok');
    }

    return span;
  }

  function crearDetalleHallazgos(resultado) {
    const filaDetalle = document.createElement('tr');
    filaDetalle.className = 'fila-detalle oculto';

    const celda = document.createElement('td');
    celda.colSpan = 5;

    const contenedor = document.createElement('div');
    contenedor.className = 'detalle-hallazgos';

    const titulo = document.createElement('h4');
    titulo.textContent = `Detalle fila Excel ${resultado.indiceFilaExcel} · ${resultado.documento}`;
    contenedor.appendChild(titulo);

    if (resultado.hallazgos.length === 0) {
      const parrafo = document.createElement('p');
      parrafo.textContent = 'Este registro no tiene errores ni advertencias.';
      contenedor.appendChild(parrafo);
    } else {
      resultado.hallazgos.forEach((hallazgo) => {
        const item = document.createElement('div');
        item.className = `hallazgo hallazgo-${hallazgo.severidad}`;

        const encabezado = document.createElement('strong');
        encabezado.textContent = `${hallazgo.variable} · ${hallazgo.mensaje}`;

        const valor = document.createElement('p');
        valor.textContent = `Valor registrado: ${hallazgo.valor || '(vacío)'}`;

        const regla = document.createElement('p');
        regla.textContent = `Regla: ${hallazgo.regla}`;

        const recomendacion = document.createElement('p');
        recomendacion.textContent = `Recomendación: ${hallazgo.recomendacion}`;

        item.appendChild(encabezado);
        item.appendChild(valor);
        item.appendChild(regla);
        item.appendChild(recomendacion);

        contenedor.appendChild(item);
      });
    }

    celda.appendChild(contenedor);
    filaDetalle.appendChild(celda);

    return filaDetalle;
  }

  function renderizarTabla(resultados) {
    const cuerpo = document.getElementById('tabla-cuerpo');
    const sinResultados = document.getElementById('sin-resultados');

    if (!cuerpo) return;

    limpiarElemento(cuerpo);

    if (!resultados || resultados.length === 0) {
      if (sinResultados) sinResultados.classList.remove('oculto');
      return;
    }

    if (sinResultados) sinResultados.classList.add('oculto');

    resultados.forEach((resultado) => {
      const fila = document.createElement('tr');
      fila.className = 'fila-resultado';

      const celdaDocumento = crearCelda(resultado.documento);
      const celdaErrores = crearCelda(resultado.errores);
      const celdaAdvertencias = crearCelda(resultado.advertencias);

      const celdaEstado = document.createElement('td');
      celdaEstado.appendChild(crearBadgeEstado(resultado));

      const celdaAccion = document.createElement('td');
      const boton = document.createElement('button');
      boton.type = 'button';
      boton.className = 'btn btn-secundario btn-pequeño';
      boton.textContent = 'Ver detalle';
      celdaAccion.appendChild(boton);

      fila.appendChild(celdaDocumento);
      fila.appendChild(celdaErrores);
      fila.appendChild(celdaAdvertencias);
      fila.appendChild(celdaEstado);
      fila.appendChild(celdaAccion);

      const filaDetalle = crearDetalleHallazgos(resultado);

      boton.addEventListener('click', function () {
        filaDetalle.classList.toggle('oculto');
        boton.textContent = filaDetalle.classList.contains('oculto') ? 'Ver detalle' : 'Ocultar';
      });

      cuerpo.appendChild(fila);
      cuerpo.appendChild(filaDetalle);
    });
  }

  function renderizarResultados(resumen) {
    resultadosActuales = resumen.resultados || [];
    renderizarResumen(resumen);
    renderizarTabla(resultadosActuales);
  }

  function filtrarPorDocumento(textoBusqueda) {
    const busqueda = String(textoBusqueda ?? '').trim().toLowerCase();

    if (!busqueda) {
      renderizarTabla(resultadosActuales);
      return;
    }

    const filtrados = resultadosActuales.filter((resultado) =>
      resultado.documento.toLowerCase().includes(busqueda)
    );

    renderizarTabla(filtrados);
  }

  window.CACTablaResultadosUI = {
    renderizarResultados,
    filtrarPorDocumento
  };
})();