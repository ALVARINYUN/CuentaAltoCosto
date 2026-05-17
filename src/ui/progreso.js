// =======================================================
// Validador CAC - ui/progreso.js
// Manejo visual de progreso
// =======================================================

(function () {
  'use strict';

  function mostrarSeccion(idSeccion) {
    const secciones = document.querySelectorAll('.seccion');

    secciones.forEach((seccion) => {
      if (seccion.id === idSeccion) {
        seccion.classList.remove('oculto');
        seccion.classList.add('activa');
      } else {
        seccion.classList.add('oculto');
        seccion.classList.remove('activa');
      }
    });
  }

  function iniciarProgreso(texto = 'Iniciando validación...') {
    mostrarSeccion('seccion-progreso');
    actualizarProgreso(0, texto);
  }

  function actualizarProgreso(porcentaje, texto) {
    const barra = document.getElementById('progreso-barra');
    const porcentajeElemento = document.getElementById('progreso-porcentaje');
    const textoElemento = document.getElementById('progreso-texto');

    const porcentajeSeguro = Math.max(0, Math.min(100, Number(porcentaje) || 0));

    if (barra) {
      barra.style.width = `${porcentajeSeguro}%`;
    }

    if (porcentajeElemento) {
      porcentajeElemento.textContent = `${porcentajeSeguro}%`;
    }

    if (textoElemento && texto) {
      textoElemento.textContent = texto;
    }
  }

  function mostrarResultados() {
    mostrarSeccion('seccion-resultados');
  }

  function mostrarCarga() {
    mostrarSeccion('seccion-carga');
  }

  window.CACProgresoUI = {
    mostrarSeccion,
    iniciarProgreso,
    actualizarProgreso,
    mostrarResultados,
    mostrarCarga
  };
})();