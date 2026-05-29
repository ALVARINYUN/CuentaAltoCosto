

// 1) Validar otra hoja del mismo Excel.
// 2) Cargar otro archivo Excel diferente.



(function () {
  'use strict';

  function obtener(id) {
    return document.getElementById(id);
  }

  function ocultar(el) {
    if (el) el.classList.add('oculto');
  }

  function mostrar(el) {
    if (el) el.classList.remove('oculto');
  }

  function limpiarTexto(id) {
    const el = obtener(id);
    if (el) el.textContent = '';
  }

  function limpiarHTML(id) {
    const el = obtener(id);
    if (el) el.innerHTML = '';
  }

  function activarPaso(numero) {
    ['step-1', 'step-2', 'step-3'].forEach((id, indice) => {
      const paso = obtener(id);
      if (!paso) return;
      paso.classList.toggle('activo', indice + 1 === numero);
    });
  }

  function estaVisible(elemento) {
    return Boolean(elemento && !elemento.classList.contains('oculto'));
  }

  // Mantiene el indicador superior sincronizado con la sección real visible.
  // Esto corrige el caso donde la app ya está en Resultados, pero el paso 1 queda activo.
  function sincronizarPasoVisible() {
    const seccionCarga = obtener('seccion-carga');
    const seccionProgreso = obtener('seccion-progreso');
    const seccionResultados = obtener('seccion-resultados');

    if (estaVisible(seccionResultados)) {
      activarPaso(3);
      return;
    }

    if (estaVisible(seccionProgreso)) {
      activarPaso(2);
      return;
    }

    if (estaVisible(seccionCarga)) {
      activarPaso(1);
    }
  }

  function observarCambiosDeSeccion() {
    const secciones = [obtener('seccion-carga'), obtener('seccion-progreso'), obtener('seccion-resultados')].filter(Boolean);

    if (secciones.length === 0 || typeof MutationObserver === 'undefined') {
      sincronizarPasoVisible();
      return;
    }

    const observer = new MutationObserver(function () {
      sincronizarPasoVisible();
    });

    secciones.forEach((seccion) => {
      observer.observe(seccion, { attributes: true, attributeFilter: ['class'] });
    });

    sincronizarPasoVisible();
  }

  function limpiarResultadosYProgreso() {
    const buscador = obtener('buscador-documento');
    const sinResultados = obtener('sin-resultados');
    const barra = obtener('progreso-barra');
    const porcentaje = obtener('progreso-porcentaje');

    if (buscador) buscador.value = '';
    if (barra) barra.style.width = '0%';
    if (porcentaje) porcentaje.textContent = '0%';

    ocultar(sinResultados);

    limpiarHTML('tabla-cuerpo');
    limpiarHTML('paginador-resultados');

    [
      'total-pacientes',
      'total-errores',
      'total-advertencias',
      'total-ok',
      'pacientes-error',
      'pacientes-advertencia',
      'pacientes-ok'
    ].forEach((id) => {
      const el = obtener(id);
      if (el) el.textContent = '0';
    });
  }

  function volverASeccionCarga() {
    const seccionCarga = obtener('seccion-carga');
    const seccionProgreso = obtener('seccion-progreso');
    const seccionResultados = obtener('seccion-resultados');

    mostrar(seccionCarga);
    ocultar(seccionProgreso);
    ocultar(seccionResultados);
    activarPaso(1);

    if (seccionCarga && typeof seccionCarga.scrollIntoView === 'function') {
      seccionCarga.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function mostrarMensajeCarga(tipo, mensaje) {
    const contenedor = obtener('mensaje-carga');
    if (!contenedor) return;

    contenedor.className = `mensaje mensaje-${tipo || 'info'}`;
    contenedor.textContent = mensaje || '';
    mostrar(contenedor);
  }

  // Caso 1: el usuario ya cargó un Excel y quiere escoger otra hoja.
  // Conserva el archivo actual, conserva el selector de hoja y deja listo el botón validar.
  function validarOtraHoja() {
    const inputArchivo = obtener('input-archivo');
    const archivoInfo = obtener('archivo-info');
    const selectorHoja = obtener('selector-hoja-contenedor');
    const zonaCarga = obtener('zona-carga');
    const btnValidar = obtener('btn-validar');

    limpiarResultadosYProgreso();
    volverASeccionCarga();

    // Si el archivo sigue disponible en el input, no lo borra.
    // Esto permite cambiar la hoja desde el selector y validar nuevamente.
    if (inputArchivo && inputArchivo.files && inputArchivo.files.length > 0) {
      ocultar(zonaCarga);
      mostrar(archivoInfo);
      mostrar(selectorHoja);
      if (btnValidar) btnValidar.disabled = false;
      mostrarMensajeCarga('info', 'Seleccione otra hoja del mismo Excel y presione Iniciar validación.');
      return;
    }

    // Si por alguna razón el navegador perdió la referencia del archivo,
    // se vuelve al flujo normal de carga para evitar un botón muerto.
    mostrar(zonaCarga);
    ocultar(archivoInfo);
    ocultar(selectorHoja);
    if (btnValidar) btnValidar.disabled = true;
    mostrarMensajeCarga('info', 'El archivo anterior ya no está disponible. Seleccione nuevamente el Excel para continuar.');
  }

  // Caso 2: el usuario quiere empezar desde cero con otro Excel.
  // Borra el input de archivo, oculta la hoja anterior y muestra la zona de carga.
  function cargarOtroArchivo() {
    const inputArchivo = obtener('input-archivo');
    const archivoInfo = obtener('archivo-info');
    const selectorHoja = obtener('selector-hoja-contenedor');
    const mensajeCarga = obtener('mensaje-carga');
    const zonaCarga = obtener('zona-carga');
    const btnValidar = obtener('btn-validar');

    limpiarResultadosYProgreso();
    volverASeccionCarga();

    if (inputArchivo) inputArchivo.value = '';
    if (btnValidar) btnValidar.disabled = true;

    mostrar(zonaCarga);
    ocultar(archivoInfo);
    ocultar(selectorHoja);
    ocultar(mensajeCarga);

    limpiarTexto('archivo-nombre');
    limpiarTexto('archivo-tamano');
    limpiarHTML('selector-hoja-contenedor');
    limpiarHTML('mensaje-carga');
  }

  function limpiarBusqueda() {
    const buscador = obtener('buscador-documento');
    if (buscador) {
      buscador.value = '';
      buscador.dispatchEvent(new Event('input', { bubbles: true }));
      buscador.focus();
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    observarCambiosDeSeccion();

    const btnValidarOtraHoja = obtener('btn-validar-otra-hoja');
    const btnCargarOtroArchivo = obtener('btn-cargar-otro-archivo');
    const btnLimpiarAnterior = obtener('btn-limpiar');
    const btnLimpiarBusqueda = obtener('btn-limpiar-busqueda');

    if (btnValidarOtraHoja) {
      btnValidarOtraHoja.addEventListener('click', function (evento) {
        evento.preventDefault();
        validarOtraHoja();
      });
    }

    if (btnCargarOtroArchivo) {
      btnCargarOtroArchivo.addEventListener('click', function (evento) {
        evento.preventDefault();
        cargarOtroArchivo();
      });
    }

    // Compatibilidad con versiones anteriores del HTML, por si queda algún botón viejo.
    if (btnLimpiarAnterior) {
      btnLimpiarAnterior.addEventListener('click', function (evento) {
        evento.preventDefault();
        cargarOtroArchivo();
      });
    }

    if (btnLimpiarBusqueda) {
      btnLimpiarBusqueda.addEventListener('click', function (evento) {
        evento.preventDefault();
        limpiarBusqueda();
      });
    }
  });

  window.CACReiniciarFlujoUI = {
    validarOtraHoja,
    cargarOtroArchivo,
    limpiarBusqueda,
    activarPaso,
    sincronizarPasoVisible
  };
})();
