# Validador CAC — Instalador Windows con Electron

## Objetivo

Convertir el Validador CAC en una aplicación de escritorio instalable en Windows.

La app seguirá procesando la información localmente. No se agrega backend, base de datos ni servidor externo.

## Archivos incluidos

```text
electron-main.js
package.json
.gitignore_extra.txt
COMANDOS_INSTALADOR.txt
```

## Dónde copiar los archivos

Copiar `electron-main.js` y `package.json` en la raíz del proyecto:

```text
D:\cuentaALTOcosto\PROYECTO\validador-cac
```

La raíz debe quedar similar a:

```text
validador-cac
├── index.html
├── electron-main.js
├── package.json
├── css
├── src
└── ...
```

## Instalar dependencias

Abrir PowerShell o CMD en la raíz del proyecto:

```bat
cd /d D:\cuentaALTOcosto\PROYECTO\validador-cac
npm install
```

## Probar como aplicación de escritorio

```bat
npm start
```

Debe abrirse una ventana de escritorio con el Validador CAC.

## Generar instalador Windows

```bat
npm run dist
```

El instalador queda en:

```text
D:\cuentaALTOcosto\PROYECTO\validador-cac\dist
```

Nombre esperado:

```text
Validador-CAC-Setup-1.0.0.exe
```

## Generar versión portable opcional

```bat
npm run dist:portable
```

## Recomendación para Git

Agregar al `.gitignore`:

```text
node_modules/
dist/
out/
*.log
```

## Importante

No se deben tocar:

```text
src/lector/estructura.js
src/lector/excel.js
src/validaciones/engine.js
src/validaciones/reglas/modulo19.js
src/validaciones/reglas/modulo20.js
src/exportador/excel-reporte.js
```

## Prueba final después de instalar

Abrir el programa instalado y validar:

```text
- Login local.
- Alerta previa.
- Carga de Excel.
- Selección de hoja.
- Validación V1-V134.
- Filtros de resultados.
- Exportación.
```

En consola de desarrollador, si se requiere auditoría:

```javascript
({
  accesoLocal: window.CACAccesoLocal?.version,
  sesionActiva: window.CACAccesoLocal?.sesionActiva?.(),
  modulo19Version: window.CACModulo19?.version,
  modulo20Version: window.CACModulo20?.version,
  modo: window.estadoApp?.estructura?.modo,
  totalReconocidas: window.estadoApp?.estructura?.totalReconocidas,
  v134Reconocida: window.estadoApp?.estructura?.variablesReconocidas?.includes('V134'),
  tablaUIFunciones: Object.keys(window.CACTablaResultadosUI || {})
});
```
