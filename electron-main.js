const { app, BrowserWindow, shell } = require('electron');
const http = require('http');
const fs = require('fs');
const path = require('path');

const APP_DIR = __dirname;
let servidorLocal = null;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.xls': 'application/vnd.ms-excel'
};

function rutaSegura(urlPath) {
  const limpio = decodeURIComponent(urlPath.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const ruta = path.normalize(path.join(APP_DIR, limpio));

  if (!ruta.startsWith(APP_DIR)) {
    return null;
  }

  return ruta;
}

function iniciarServidorLocal() {
  return new Promise((resolve, reject) => {
    servidorLocal = http.createServer((req, res) => {
      const rutaArchivo = rutaSegura(req.url);

      if (!rutaArchivo) {
        res.writeHead(403);
        res.end('Acceso no permitido');
        return;
      }

      fs.readFile(rutaArchivo, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end('Archivo no encontrado');
          return;
        }

        const ext = path.extname(rutaArchivo).toLowerCase();
        res.writeHead(200, {
          'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
          'Cache-Control': 'no-store'
        });
        res.end(data);
      });
    });

    servidorLocal.listen(0, '127.0.0.1', () => {
      const puerto = servidorLocal.address().port;
      resolve(`http://127.0.0.1:${puerto}/index.html`);
    });

    servidorLocal.on('error', reject);
  });
}

async function crearVentanaPrincipal() {
  const urlLocal = await iniciarServidorLocal();

  const ventana = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 1100,
    minHeight: 720,
    title: 'Validador CAC - Cuenta de Alto Costo',
    backgroundColor: '#eefbf7',
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  ventana.loadURL(urlLocal);

  ventana.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(crearVentanaPrincipal);

app.on('window-all-closed', () => {
  if (servidorLocal) {
    servidorLocal.close();
  }

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    crearVentanaPrincipal();
  }
});
