// =======================================================
// Validador CAC - main.js
// Orquestador principal acumulativo V1-V28.
// Selector de hoja, cambio de hoja y exportación Excel.
// =======================================================

(function () {
  'use strict';

  const estadoApp = {
    archivo: null,
    libro: null,
    hojas: [],
    hojaSeleccionada: null,
    datosExcel: null,
    estructura: null,
    resumenValidacion: null
  };

  window.estadoApp = estadoApp;

  function inicializarAvisoPrivacidad() {
    const aviso = document.getElementById('aviso-privacidad');
    const botonAceptar = document.getElementById('btn-aceptar-aviso');

    if (!aviso || !botonAceptar) return;

    botonAceptar.addEventListener('click', function () {
      aviso.classList.add('oculto');
    });
  }

  function obtenerContenedorSelectorHoja() {
    let contenedor = document.getElementById('selector-hoja-contenedor');

    if (contenedor) return contenedor;

    contenedor = document.createElement('div');
    contenedor.id = 'selector-hoja-contenedor';
    contenedor.className = 'archivo-info oculto';

    const archivoInfo = document.getElementById('archivo-info');

    if (archivoInfo) {
      archivoInfo.insertAdjacentElement('afterend', contenedor);
    }

    return contenedor;
  }

  function ocultarSelectorHoja() {
    const contenedor = obtenerContenedorSelectorHoja();

    if (!contenedor) return;

    contenedor.classList.add('oculto');
    contenedor.innerHTML = '';
  }

  function mostrarSelectorHoja(hojas, hojaActual) {
    const contenedor = obtenerContenedorSelectorHoja();

    if (!contenedor) return;

    contenedor.classList.remove('oculto');
    contenedor.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'archivo-info-contenido';

    const icono = document.createElement('span');
    icono.className = 'archivo-icono';
    icono.textContent = '📄';

    const detalles = document.createElement('div');
    detalles.className = 'archivo-detalles';

    const label = document.createElement('label');
    label.className = 'archivo-nombre';
    label.setAttribute('for', 'selector-hoja');
    label.textContent = 'Seleccione la hoja que desea validar';

    const ayuda = document.createElement('p');
    ayuda.className = 'archivo-tamano';
    ayuda.textContent = 'Elija la hoja correcta antes de iniciar la validación.';

    const select = document.createElement('select');
    select.id = 'selector-hoja';
    select.className = 'buscador-input';

    hojas.forEach((nombreHoja) => {
      const option = document.createElement('option');
      option.value = nombreHoja;
      option.textContent = nombreHoja;

      if (nombreHoja === hojaActual) {
        option.selected = true;
      }

      select.appendChild(option);
    });

    select.addEventListener('change', function () {
      procesarHojaSeleccionada(select.value);
    });

    detalles.appendChild(label);
    detalles.appendChild(ayuda);
    detalles.appendChild(select);

    wrapper.appendChild(icono);
    wrapper.appendChild(detalles);

    contenedor.appendChild(wrapper);
  }

  function resetearEstadoArchivo() {
    estadoApp.archivo = null;
    estadoApp.libro = null;
    estadoApp.hojas = [];
    estadoApp.hojaSeleccionada = null;
    estadoApp.datosExcel = null;
    estadoApp.estructura = null;
    estadoApp.resumenValidacion = null;
  }

  function limpiarResultadosVisuales() {
    const cuerpo = document.getElementById('tabla-cuerpo');
    const inputBusqueda = document.getElementById('input-busqueda');
    const botonLimpiar = document.getElementById('btn-limpiar-busqueda');
    const botonExportar = document.getElementById('btn-exportar');

    if (cuerpo) cuerpo.innerHTML = '';
    if (inputBusqueda) inputBusqueda.value = '';
    if (botonLimpiar) botonLimpiar.classList.add('oculto');

    if (botonExportar) {
      botonExportar.disabled = true;
      botonExportar.title = 'Primero ejecuta una validación.';
    }

    const idsResumen = [
      'total-pacientes',
      'total-errores',
      'total-advertencias',
      'total-ok',
      'resultados-resumen'
    ];

    idsResumen.forEach((id) => {
      const elemento = document.getElementById(id);

      if (elemento) {
        elemento.textContent = id === 'resultados-resumen' ? '' : '0';
      }
    });
  }

  function habilitarExportacion() {
    const botonExportar = document.getElementById('btn-exportar');

    if (!botonExportar) return;

    botonExportar.disabled = !estadoApp.resumenValidacion;
    botonExportar.title = estadoApp.resumenValidacion
      ? 'Exportar reporte de la hoja validada.'
      : 'Primero ejecuta una validación.';
  }

  function describirModo(modo) {
    const mapa = {
      ACUMULATIVO_V1_V16: 'V1-V16',
      ACUMULATIVO_V1_V24: 'V1-V24',
      ACUMULATIVO_V1_V28: 'V1-V28'
    };

    return mapa[modo] || modo || 'estructura detectada';
  }

  function validarEstructuraYMostrarEstado(datosExcel) {
    const estructura = CACEstructura.validarEstructura(datosExcel.encabezados);

    estadoApp.datosExcel = datosExcel;
    estadoApp.estructura = estructura;
    estadoApp.resumenValidacion = null;

    habilitarExportacion();

    if (datosExcel.errorEstructura) {
      CACCargaUI.mostrarMensaje(
        `La hoja "${datosExcel.nombreHoja}" no se puede validar: ${datosExcel.errorEstructura}`,
        'error'
      );
      CACCargaUI.habilitarBotonValidar(false);
      return;
    }

    if (!estructura.esValida) {
      CACCargaUI.mostrarMensaje(
        `La hoja "${datosExcel.nombreHoja}" no tiene estructura válida. Faltan columnas: ${estructura.variablesFaltantes.join(', ')}`,
        'error'
      );
      CACCargaUI.habilitarBotonValidar(false);
      return;
    }

    if (datosExcel.totalFilas === 0) {
      CACCargaUI.mostrarMensaje(
        `La hoja "${datosExcel.nombreHoja}" tiene encabezados válidos, pero no contiene registros para validar.`,
        'error'
      );
      CACCargaUI.habilitarBotonValidar(false);
      return;
    }

    const filaEncabezados = datosExcel.filaEncabezados ? ` Encabezados en fila ${datosExcel.filaEncabezados}.` : '';

    CACCargaUI.mostrarMensaje(
      `Hoja lista para validar: "${datosExcel.nombreHoja}". ${datosExcel.totalFilas} registros detectados. Alcance ${describirModo(estructura.modo)}. ${estructura.totalReconocidas}/${estructura.totalEsperadas} variables reconocidas.${filaEncabezados}`,
      'ok'
    );

    CACCargaUI.habilitarBotonValidar(true);
  }

  function procesarHojaSeleccionada(nombreHoja) {
    try {
      if (!estadoApp.archivo || !estadoApp.libro) {
        CACCargaUI.mostrarMensaje('Primero carga un archivo Excel.', 'error');
        CACCargaUI.habilitarBotonValidar(false);
        return;
      }

      estadoApp.hojaSeleccionada = nombreHoja;
      estadoApp.resumenValidacion = null;

      habilitarExportacion();

      const datosExcel = CACLectorExcel.extraerDatosHoja({
        archivo: estadoApp.archivo,
        libro: estadoApp.libro,
        nombreHoja
      });

      validarEstructuraYMostrarEstado(datosExcel);
    } catch (error) {
      console.error(error);
      CACCargaUI.mostrarMensaje(error.message || 'No se pudo procesar la hoja seleccionada.', 'error');
      CACCargaUI.habilitarBotonValidar(false);
    }
  }

  async function manejarArchivoSeleccionado(archivo) {
    try {
      resetearEstadoArchivo();
      limpiarResultadosVisuales();

      estadoApp.archivo = archivo;

      CACCargaUI.mostrarMensaje('Leyendo archivo Excel...', 'info');
      CACCargaUI.habilitarBotonValidar(false);
      ocultarSelectorHoja();

      const resultadoLibro = await CACLectorExcel.leerLibroExcel(archivo);

      estadoApp.archivo = archivo;
      estadoApp.libro = resultadoLibro.libro;
      estadoApp.hojas = resultadoLibro.hojas;
      estadoApp.hojaSeleccionada = resultadoLibro.hojas[0];

      if (resultadoLibro.hojas.length > 1) {
        mostrarSelectorHoja(resultadoLibro.hojas, estadoApp.hojaSeleccionada);
      } else {
        ocultarSelectorHoja();
      }

      procesarHojaSeleccionada(estadoApp.hojaSeleccionada);
    } catch (error) {
      console.error(error);
      CACCargaUI.mostrarMensaje(error.message || 'No se pudo procesar el archivo.', 'error');
      CACCargaUI.habilitarBotonValidar(false);
    }
  }

  function ejecutarValidacionSprint1() {
    if (!estadoApp.datosExcel || !estadoApp.estructura || !estadoApp.estructura.esValida) {
      CACCargaUI.mostrarMensaje('Primero carga una hoja válida del archivo.', 'error');
      return;
    }

    CACProgresoUI.iniciarProgreso(`Preparando validación ${describirModo(estadoApp.estructura.modo)} en hoja "${estadoApp.hojaSeleccionada}"...`);

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
      habilitarExportacion();

      setTimeout(function () {
        CACProgresoUI.mostrarResultados();
      }, 300);
    }, 200);
  }

  function volverACambiarHoja() {
    if (!estadoApp.archivo || !estadoApp.libro || estadoApp.hojas.length === 0) {
      CACProgresoUI.mostrarCarga();
      CACCargaUI.mostrarMensaje('No hay archivo cargado. Selecciona un archivo Excel.', 'error');
      CACCargaUI.habilitarBotonValidar(false);
      return;
    }

    estadoApp.resumenValidacion = null;
    limpiarResultadosVisuales();

    CACProgresoUI.mostrarCarga();

    CACCargaUI.mostrarArchivo(estadoApp.archivo.name, estadoApp.archivo.size);

    if (estadoApp.hojas.length > 1) {
      mostrarSelectorHoja(estadoApp.hojas, estadoApp.hojaSeleccionada);
    }

    procesarHojaSeleccionada(estadoApp.hojaSeleccionada);
  }

  function exportarReporteActual() {
    try {
      if (!estadoApp.resumenValidacion) {
        alert('Primero debes ejecutar una validación antes de exportar.');
        return;
      }

      if (typeof CACExportadorExcel === 'undefined') {
        alert('El módulo exportador no está cargado.');
        return;
      }

      CACExportadorExcel.exportarReporte({
        resumen: estadoApp.resumenValidacion,
        datosExcel: estadoApp.datosExcel,
        nombreArchivo: estadoApp.archivo ? estadoApp.archivo.name : '',
        nombreHoja: estadoApp.hojaSeleccionada || ''
      });
    } catch (error) {
      console.error(error);
      alert(error.message || 'No se pudo exportar el reporte.');
    }
  }

  function inicializarBotonValidar() {
    const botonValidar = document.getElementById('btn-validar');

    if (!botonValidar) return;

    botonValidar.addEventListener('click', ejecutarValidacionSprint1);
  }

  function inicializarCambiarHoja() {
    const botonCambiarHoja = document.getElementById('btn-cambiar-hoja');

    if (!botonCambiarHoja) return;

    botonCambiarHoja.addEventListener('click', volverACambiarHoja);
  }

  function inicializarNuevaValidacion() {
    const botonNuevaValidacion = document.getElementById('btn-nueva-validacion');

    if (!botonNuevaValidacion) return;

    botonNuevaValidacion.addEventListener('click', function () {
      resetearEstadoArchivo();
      limpiarResultadosVisuales();

      CACCargaUI.ocultarArchivo();
      CACCargaUI.limpiarMensaje();
      CACCargaUI.habilitarBotonValidar(false);
      ocultarSelectorHoja();
      CACProgresoUI.mostrarCarga();
    });
  }

  function inicializarExportacion() {
    const botonExportar = document.getElementById('btn-exportar');

    if (!botonExportar) return;

    botonExportar.addEventListener('click', exportarReporteActual);
    habilitarExportacion();
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
    inicializarCambiarHoja();
    inicializarNuevaValidacion();
    inicializarExportacion();
    inicializarBuscador();

    console.log('Validador CAC iniciado correctamente.');
  }

  document.addEventListener('DOMContentLoaded', inicializarAplicacion);
})();
