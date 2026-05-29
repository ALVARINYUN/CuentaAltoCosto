

(function () {
  'use strict';

  function formatearTamano(bytes) {
    if (!bytes && bytes !== 0) return '';

    const kb = bytes / 1024;
    const mb = kb / 1024;

    if (mb >= 1) {
      return `${mb.toFixed(2)} MB`;
    }

    return `${kb.toFixed(2)} KB`;
  }

  function mostrarMensaje(texto, tipo = 'info') {
    const mensaje = document.getElementById('mensaje-estructura');

    if (!mensaje) return;

    mensaje.textContent = texto;
    mensaje.classList.remove('oculto', 'mensaje-error', 'mensaje-ok', 'mensaje-info');

    if (tipo === 'error') {
      mensaje.classList.add('mensaje-error');
    } else if (tipo === 'ok') {
      mensaje.classList.add('mensaje-ok');
    } else {
      mensaje.classList.add('mensaje-info');
    }
  }

  function limpiarMensaje() {
    const mensaje = document.getElementById('mensaje-estructura');

    if (!mensaje) return;

    mensaje.textContent = '';
    mensaje.classList.add('oculto');
    mensaje.classList.remove('mensaje-error', 'mensaje-ok', 'mensaje-info');
  }

  function mostrarArchivo(nombre, tamano) {
    const contenedor = document.getElementById('archivo-info');
    const nombreElemento = document.getElementById('archivo-nombre');
    const tamanoElemento = document.getElementById('archivo-tamano');

    if (contenedor) contenedor.classList.remove('oculto');
    if (nombreElemento) nombreElemento.textContent = nombre;
    if (tamanoElemento) tamanoElemento.textContent = formatearTamano(tamano);
  }

  function ocultarArchivo() {
    const contenedor = document.getElementById('archivo-info');
    const nombreElemento = document.getElementById('archivo-nombre');
    const tamanoElemento = document.getElementById('archivo-tamano');

    if (contenedor) contenedor.classList.add('oculto');
    if (nombreElemento) nombreElemento.textContent = '';
    if (tamanoElemento) tamanoElemento.textContent = '';
  }

  function habilitarBotonValidar(habilitar) {
    const boton = document.getElementById('btn-validar');

    if (boton) {
      boton.disabled = !habilitar;
    }
  }

  function inicializarCargaArchivo(callbacks = {}) {
    const zonaCarga = document.getElementById('zona-carga');
    const inputArchivo = document.getElementById('input-archivo');
    const botonSeleccionar = document.getElementById('btn-seleccionar');
    const botonCambiar = document.getElementById('btn-cambiar-archivo');

    if (!zonaCarga || !inputArchivo || !botonSeleccionar) {
      console.error('No se encontraron los elementos necesarios para la carga de archivo.');
      return;
    }

    function abrirSelector() {
      inputArchivo.value = '';
      inputArchivo.click();
    }

    function procesarArchivo(archivo) {
      limpiarMensaje();
      habilitarBotonValidar(false);
      ocultarArchivo();

      if (!archivo) {
        mostrarMensaje('No se seleccionó ningún archivo.', 'error');
        return;
      }

      mostrarArchivo(archivo.name, archivo.size);

      if (typeof callbacks.onArchivoSeleccionado === 'function') {
        callbacks.onArchivoSeleccionado(archivo);
      }
    }

    botonSeleccionar.addEventListener('click', abrirSelector);

    if (botonCambiar) {
      botonCambiar.addEventListener('click', abrirSelector);
    }

    inputArchivo.addEventListener('change', function (evento) {
      const archivo = evento.target.files && evento.target.files[0];
      procesarArchivo(archivo);
    });

    zonaCarga.addEventListener('dragover', function (evento) {
      evento.preventDefault();
      zonaCarga.classList.add('arrastrando');
    });

    zonaCarga.addEventListener('dragleave', function () {
      zonaCarga.classList.remove('arrastrando');
    });

    zonaCarga.addEventListener('drop', function (evento) {
      evento.preventDefault();
      zonaCarga.classList.remove('arrastrando');

      const archivo = evento.dataTransfer.files && evento.dataTransfer.files[0];
      procesarArchivo(archivo);
    });
  }

  window.CACCargaUI = {
    inicializarCargaArchivo,
    mostrarMensaje,
    limpiarMensaje,
    mostrarArchivo,
    ocultarArchivo,
    habilitarBotonValidar
  };
})();