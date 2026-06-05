const { test, expect } = require('@playwright/test');
const path = require('path');

test('Carga inicial del Validador CAC sin errores críticos', async ({ page }) => {
  const erroresConsola = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const texto = msg.text();

      // El favicon 404 no afecta el funcionamiento de la app.
      if (!texto.includes('favicon.ico')) {
        erroresConsola.push(texto);
      }
    }
  });

  await page.goto('http://localhost:8000/');

  await expect(page).toHaveTitle(/Validador/i);

  const diagnostico = await page.evaluate(() => ({
    estadoApp: typeof window.estadoApp,
    estructura: typeof window.CACEstructura,
    versionEstructura: window.CACEstructura?.version || null,
  }));

  expect(diagnostico.estadoApp).toBe('object');
  expect(diagnostico.estructura).toBe('object');
  expect(diagnostico.versionEstructura).toBe('sprint-3g-v60-estructura-03-progresivo');

  expect(erroresConsola).toEqual([]);
});

test('Carga y valida archivo amplio de prueba V1-V60', async ({ page }) => {
  const archivoExcel = path.resolve(__dirname, 'fixtures', 'prueba-v60-amplia.xlsx');

  await page.goto('http://localhost:8000/');

  await page.setInputFiles('input[type="file"]', archivoExcel);

  await page.waitForFunction(() => {
    return window.estadoApp?.datosExcel?.filas?.length === 146 &&
      window.estadoApp?.estructura?.modo === 'ACUMULATIVO_V1_V60';
  });

  const carga = await page.evaluate(() => ({
    hoja: window.estadoApp?.hojaSeleccionada,
    filas: window.estadoApp?.datosExcel?.filas?.length,
    modo: window.estadoApp?.estructura?.modo,
    estructuraValida: window.estadoApp?.estructura?.esValida,
    faltantes: window.estadoApp?.estructura?.variablesFaltantes || [],
    botonValidarDisabled: document.querySelector('#btn-validar')?.disabled,
  }));

  expect(carga.hoja).toBe('ABRIL');
  expect(carga.filas).toBe(146);
  expect(carga.modo).toBe('ACUMULATIVO_V1_V60');
  expect(carga.estructuraValida).toBe(true);
  expect(carga.faltantes).toEqual([]);
  expect(carga.botonValidarDisabled).toBe(false);

  await page.click('#btn-validar');

  await page.waitForFunction(() => {
    return window.estadoApp?.resumenValidacion?.totalPacientes === 146;
  });

  const resumen = await page.evaluate(() => ({
    procesados: window.estadoApp?.resumenValidacion?.totalPacientes,
    conErrores: window.estadoApp?.resumenValidacion?.conErrores,
    conAdvertencias: window.estadoApp?.resumenValidacion?.conAdvertencias,
    sinProblemas: window.estadoApp?.resumenValidacion?.sinProblemas,
  }));

  expect(resumen.procesados).toBe(146);
  expect(resumen.conErrores).toBe(49);
  expect(resumen.conAdvertencias).toBe(90);
  expect(resumen.sinProblemas).toBe(7);
});
