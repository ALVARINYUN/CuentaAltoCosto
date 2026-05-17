// =======================================================
// Validador CAC - lector/excel.js
// Lee archivos Excel usando SheetJS
// =======================================================

(function () {
  'use strict';

  function normalizarTexto(valor) {
    return String(valor ?? '').trim();
  }

  function leerArchivoExcel(archivo) {
    return new Promise((resolve, reject) => {
      if (!archivo) {
        reject(new Error('No se recibió ningún archivo.'));
        return;
      }

      const extensionValida = /\.(xlsx|xls)$/i.test(archivo.name);

      if (!extensionValida) {
        reject(new Error('Formato no válido. Solo se aceptan archivos Excel (.xlsx o .xls).'));
        return;
      }

      if (typeof XLSX === 'undefined') {
        reject(new Error('La librería XLSX no está cargada. Verifica libs/xlsx.full.min.js.'));
        return;
      }

      const lector = new FileReader();

      lector.onload = function (evento) {
        try {
          const datos = new Uint8Array(evento.target.result);
          const libro = XLSX.read(datos, { type: 'array', cellDates: false });

          if (!libro.SheetNames || libro.SheetNames.length === 0) {
            reject(new Error('El archivo no contiene hojas.'));
            return;
          }

          const nombreHoja = libro.SheetNames[0];
          const hoja = libro.Sheets[nombreHoja];

          const matriz = XLSX.utils.sheet_to_json(hoja, {
            header: 1,
            defval: '',
            raw: false
          });

          if (!matriz || matriz.length === 0) {
            reject(new Error('El archivo está vacío.'));
            return;
          }

          const encabezados = matriz[0].map(normalizarTexto).filter(Boolean);
          const filas = matriz
            .slice(1)
            .filter((fila) => Array.isArray(fila) && fila.some((celda) => normalizarTexto(celda) !== ''));

          resolve({
            archivo,
            nombreArchivo: archivo.name,
            tamanoArchivo: archivo.size,
            nombreHoja,
            encabezados,
            filas,
            totalFilas: filas.length
          });
        } catch (error) {
          reject(new Error('No se pudo leer el archivo Excel. Verifica que no esté dañado.'));
        }
      };

      lector.onerror = function () {
        reject(new Error('Ocurrió un error al leer el archivo.'));
      };

      lector.readAsArrayBuffer(archivo);
    });
  }

  window.CACLectorExcel = {
    leerArchivoExcel
  };
})();