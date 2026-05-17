// =======================================================
// Validador CAC - main.js
// Orquestador inicial del MVP Sprint 1
// =======================================================

(function () {
  'use strict';

  const estadoApp = {
    archivo: null,
    datosExcel: null,
    estructura: null,
    resumenValidacion: null
  };

  function inicializarAvisoPrivacidad() {
    const aviso = document.getElementById('aviso-privacidad');
    const botonAceptar = document.getElementById('btn-aceptar-aviso');

    if (!aviso || !botonAceptar) return;

    botonAceptar.addEventListener('click', function () {
      aviso.classList.add('oculto');
    });
  }

  async function manejarArchivoSeleccionado(archivo) {
    try {
      estadoApp.archivo = archivo;
      estadoApp.datosExcel = null;
      estadoApp.estructura = null;
      estadoApp.resumenValidacion = null;

      CACCargaUI.mostrarMensaje('Leyendo archivo Excel...', 'info');
      CACCargaUI.habilitarBotonValidar(false);

      const datosExcel = await CACLectorExcel.leerArchivoExcel(archivo);
      const estructura = CACEstructura.validarEstructuraSprint1(datosExcel.encabezados);

      estadoApp.datosExcel = datosExcel;
      estadoApp.estructura = estructura;

      if (!estructura.esValida) {
        CACCargaUI.mostrarMensaje(
          `Estructura inválida para Sprint 1. Faltan columnas: ${estructura.variablesFaltantes.join(', ')}`,
          'error'
        );
        CACCargaUI.habilitarBotonValidar(false);
        return;
      }

      if (datosExcel.totalFilas === 0) {
        CACCargaUI.mostrarMensaje(
          'El archivo tiene encabezados válidos, pero no contiene registros para validar.',
          'error'
        );
        CACCargaUI.habilitarBotonValidar(false);
        return;
      }

      CACCargaUI.mostrarMensaje(
        `Archivo válido para Sprint 1. ${datosExcel.totalFilas} registros detectados. ${estructura.totalReconocidas}/${estructura.totalEsperadas} variables reconocidas.`,
        'ok'
      );

      CACCargaUI.habilitarBotonValidar(true);
    } catch (error) {
      console.error(error);
      CACCargaUI.mostrarMensaje(error.message || 'No se pudo procesar el archivo.', 'error');
      CACCargaUI.habilitarBotonValidar(false);
    }
  }

  function ejecutarValidacionSprint1() {
    if (!estadoApp.datosExcel || !estadoApp.estructura || !estadoApp.estructura.esValida) {
      CACCargaUI.mostrarMensaje('Primero carga un archivo válido.', 'error');
      return;
    }

    CACProgresoUI.iniciarProgreso('Preparando validación V1-V16...');

    setTimeout(function () {
      const resumen = CACEngine.validarDatosSprint1(estadoApp.datosExcel, function (progreso) {
        CACProgresoUI.actualizarProgreso(
          progreso.porcentaje,
          `Procesando paciente ${progreso.actual} de ${progreso.total}`
        );
      });

      estadoApp.resumenValidacion = resumen;

      CACProgresoUI.actualizarProgreso(100, 'Validación finalizada.');
      CACTablaResultadosUI.renderizarResultados(resumen);

      setTimeout(function () {
        CACProgresoUI.mostrarResultados();
      }, 300);
    }, 200);
  }

  function inicializarBotonValidar() {
    const botonValidar = document.getElementById('btn-validar');

    if (!botonValidar) return;

    botonValidar.addEventListener('click', ejecutarValidacionSprint1);
  }

  function inicializarNuevaValidacion() {
    const botonNuevaValidacion = document.getElementById('btn-nueva-validacion');

    if (!botonNuevaValidacion) return;

    botonNuevaValidacion.addEventListener('click', function () {
      estadoApp.archivo = null;
      estadoApp.datosExcel = null;
      estadoApp.estructura = null;
      estadoApp.resumenValidacion = null;

      CACCargaUI.ocultarArchivo();
      CACCargaUI.limpiarMensaje();
      CACCargaUI.habilitarBotonValidar(false);
      CACProgresoUI.mostrarCarga();
    });
  }

  function inicializarBuscador() {
    const inputBusqueda = document.getElementById('input-busqueda');
    const botonLimpiar = document.getElementById('btn-limpiar-busqueda');

    if (!inputBusqueda) return;

    inputBusqueda.addEventListener('input', function () {
      const valor = inputBusqueda.value;

      CACTablaResultadosUI.filtrarPorDocumento(valor);

      if (botonLimpiar) {
        if (valor.trim()) {
          botonLimpiar.classList.remove('oculto');
        } else {
          botonLimpiar.classList.add('oculto');
        }
      }
    });

    if (botonLimpiar) {
      botonLimpiar.addEventListener('click', function () {
        inputBusqueda.value = '';
        botonLimpiar.classList.add('oculto');
        CACTablaResultadosUI.filtrarPorDocumento('');
      });
    }
  }

  function inicializarAplicacion() {
    inicializarAvisoPrivacidad();

    CACCargaUI.inicializarCargaArchivo({
      onArchivoSeleccionado: manejarArchivoSeleccionado
    });

    inicializarBotonValidar();
    inicializarNuevaValidacion();
    inicializarBuscador();

    console.log('Validador CAC iniciado correctamente.');
  }

  document.addEventListener('DOMContentLoaded', inicializarAplicacion);
})();