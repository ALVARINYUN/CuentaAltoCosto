(function () {
  'use strict';

  const VERSION = 'mejora-ui-buscador-catalogos-03';
  const MAX_RESULTADOS = 80;

  const CATALOGOS = [
    {
      id: 'atc',
      etiqueta: 'ATC',
      titulo: 'Catálogo ATC',
      ayuda: 'Medicamentos y homologaciones ATC usados como apoyo en V53.1 a V53.9.',
      obtener: () => window.CACCatalogoATC || window.CACCatalogos?.ATC || window.CatalogoATC || null
    },
    {
      id: 'cie10',
      etiqueta: 'CIE-10',
      titulo: 'Catálogo CIE-10',
      ayuda: 'Diagnósticos CIE-10 usados como apoyo en variables clínicas como V17 y relacionadas.',
      obtener: () => window.CACCatalogoCIE10 || window.CACCatalogos?.CIE10 || window.CatalogoCIE10 || window.CIE10 || null
    },
    {
      id: 'cups',
      etiqueta: 'CUPS',
      titulo: 'Catálogo CUPS',
      ayuda: 'Procedimientos CUPS usados como apoyo en variables que dependan de procedimientos.',
      obtener: () => window.CACCatalogoCUPS || window.CACCatalogos?.CUPS || window.CatalogoCUPS || window.CUPS || null
    }
  ];

  const SELECTORES_ANCLAJE = [
    '#panel-resultados',
    '#seccion-resultados',
    '.panel-resultados',
    '.contenedor-principal',
    'main',
    'body'
  ];

  function texto(valor) {
    return String(valor ?? '').trim();
  }

  function normalizarTexto(valor) {
    return texto(valor)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function normalizarCodigo(valor) {
    return texto(valor).toUpperCase().replace(/\s+/g, '');
  }

  function obtenerDefinicionCatalogo(id) {
    return CATALOGOS.find((catalogo) => catalogo.id === id) || CATALOGOS[0];
  }

  function extraerDescripcionDesdeValor(valor) {
    if (valor === null || valor === undefined) return '';

    if (typeof valor === 'string' || typeof valor === 'number') {
      return texto(valor);
    }

    if (typeof valor === 'object') {
      return texto(
        valor.nombre ||
        valor.descripcion ||
        valor.descripcion_atc ||
        valor.descripcion_cie10 ||
        valor.descripcion_cups ||
        valor.medicamento ||
        valor.procedimiento ||
        valor.diagnostico ||
        valor.diagnóstico ||
        valor.principio_activo ||
        valor.principioActivo ||
        valor.label ||
        valor.texto ||
        valor.descripcionMedicamento ||
        ''
      );
    }

    return '';
  }

  function extraerDetalleDesdeValor(valor) {
    if (!valor || typeof valor !== 'object') return '';

    const partes = [];

    const campos = [
      ['Grupo', valor.grupo || valor.grupo_atc],
      ['Capítulo', valor.capitulo || valor.capítulo],
      ['Categoría', valor.categoria || valor.categoría],
      ['Nivel', valor.nivel],
      ['Principio activo', valor.principio_activo || valor.principioActivo],
      ['Procedimiento', valor.procedimiento],
      ['Diagnóstico', valor.diagnostico || valor.diagnóstico],
      ['Descripción', valor.descripcion || valor.descripcion_atc || valor.descripcion_cie10 || valor.descripcion_cups],
      ['Estado', valor.estado],
      ['Observación', valor.observacion || valor.observación]
    ];

    campos.forEach(([etiqueta, contenido]) => {
      const limpio = texto(contenido);
      if (limpio) partes.push(`${etiqueta}: ${limpio}`);
    });

    return partes.join(' · ');
  }

  function obtenerCodigoDesdeItem(item) {
    return normalizarCodigo(
      item?.codigo ||
      item?.codigo_atc ||
      item?.codigo_cie10 ||
      item?.codigo_cups ||
      item?.cie10 ||
      item?.cups ||
      item?.atc ||
      item?.CIE10 ||
      item?.CUPS ||
      item?.ATC ||
      item?.id ||
      ''
    );
  }

  function construirEntradasCatalogo(definicion) {
    const catalogo = definicion.obtener();
    const entradas = [];
    const vistos = new Set();

    if (!catalogo) return entradas;

    const datos = catalogo.datos || catalogo.items || catalogo.catalogo || catalogo.codigos || catalogo;

    if (Array.isArray(datos)) {
      datos.forEach((item) => {
        const codigo = obtenerCodigoDesdeItem(item);
        if (!codigo || vistos.has(codigo)) return;

        vistos.add(codigo);
        entradas.push({
          catalogo: definicion.id,
          etiquetaCatalogo: definicion.etiqueta,
          codigo,
          nombre: extraerDescripcionDesdeValor(item),
          detalle: extraerDetalleDesdeValor(item),
          fuente: definicion.titulo
        });
      });
    } else if (datos && typeof datos === 'object') {
      Object.entries(datos).forEach(([codigoOriginal, valor]) => {
        const codigo = normalizarCodigo(codigoOriginal);
        if (!codigo || vistos.has(codigo)) return;

        vistos.add(codigo);
        entradas.push({
          catalogo: definicion.id,
          etiquetaCatalogo: definicion.etiqueta,
          codigo,
          nombre: extraerDescripcionDesdeValor(valor),
          detalle: extraerDetalleDesdeValor(valor),
          fuente: definicion.titulo
        });
      });
    }

    const homologacion = catalogo.homologacion_2024_a_2025 ||
      catalogo.homologacion ||
      catalogo.homologaciones ||
      null;

    if (homologacion && typeof homologacion === 'object') {
      Object.entries(homologacion).forEach(([codigoAnterior, codigoVigente]) => {
        const anterior = normalizarCodigo(codigoAnterior);
        const vigente = normalizarCodigo(codigoVigente);

        if (!anterior || vistos.has(anterior)) return;

        vistos.add(anterior);
        entradas.push({
          catalogo: definicion.id,
          etiquetaCatalogo: definicion.etiqueta,
          codigo: anterior,
          nombre: vigente ? `Homologado a ${vigente}` : 'Código homologado',
          detalle: vigente ? `Código anterior: ${anterior} · Código vigente: ${vigente}` : `Código anterior: ${anterior}`,
          fuente: `${definicion.titulo} · Homologación`
        });
      });
    }

    return entradas.sort((a, b) => a.codigo.localeCompare(b.codigo));
  }

  function buscarEntradas(termino, entradas) {
    const consulta = normalizarTexto(termino);
    const codigoConsulta = normalizarCodigo(termino);

    if (!consulta) return [];

    return entradas
      .map((entrada) => {
        const codigo = normalizarCodigo(entrada.codigo);
        const nombre = normalizarTexto(entrada.nombre);
        const detalle = normalizarTexto(entrada.detalle);
        let puntaje = 0;

        if (codigo === codigoConsulta) puntaje += 1000;
        if (codigo.startsWith(codigoConsulta)) puntaje += 600;
        if (codigo.includes(codigoConsulta)) puntaje += 300;
        if (nombre.includes(consulta)) puntaje += 220;
        if (detalle.includes(consulta)) puntaje += 120;

        return { ...entrada, puntaje };
      })
      .filter((entrada) => entrada.puntaje > 0)
      .sort((a, b) => b.puntaje - a.puntaje || a.codigo.localeCompare(b.codigo))
      .slice(0, MAX_RESULTADOS);
  }

  function copiarTexto(valor, boton) {
    const contenido = texto(valor);
    if (!contenido) return;

    const restaurar = () => {
      if (boton) boton.textContent = 'Copiar';
    };

    const exito = () => {
      if (boton) {
        boton.textContent = 'Copiado';
        window.setTimeout(restaurar, 1400);
      }
    };

    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(contenido).then(exito).catch(() => {
        fallbackCopiar(contenido);
        exito();
      });
      return;
    }

    fallbackCopiar(contenido);
    exito();
  }

  function fallbackCopiar(valor) {
    const input = document.createElement('textarea');
    input.value = valor;
    input.setAttribute('readonly', 'readonly');
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();

    try {
      document.execCommand('copy');
    } catch (error) {
      console.warn('[BuscadorCatalogos] No se pudo copiar el código.', error);
    }

    document.body.removeChild(input);
  }

  function crearEstilos() {
    if (document.getElementById('buscador-catalogos-estilos')) return;

    const estilos = document.createElement('style');
    estilos.id = 'buscador-catalogos-estilos';
    estilos.textContent = `
      .buscador-catalogos-panel {
        margin: 20px 0;
        border: 1px solid rgba(22, 163, 132, 0.28);
        border-radius: 24px;
        background: linear-gradient(180deg, rgba(240, 253, 250, 0.96), rgba(255, 255, 255, 0.98));
        box-shadow: 0 18px 45px rgba(15, 118, 110, 0.08);
        color: #12312d;
        font-family: inherit;
        overflow: hidden;
      }

      .buscador-catalogos-toggle {
        width: 100%;
        border: 0;
        background: transparent;
        padding: 18px 22px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        text-align: left;
        cursor: pointer;
      }

      .buscador-catalogos-toggle:hover {
        background: rgba(16, 185, 129, 0.06);
      }

      .buscador-catalogos-toggle-texto {
        display: grid;
        gap: 4px;
      }

      .buscador-catalogos-titulo {
        margin: 0;
        font-size: 1.06rem;
        font-weight: 850;
        color: #092f2b;
      }

      .buscador-catalogos-subtitulo {
        margin: 0;
        color: #4c7770;
        line-height: 1.35;
        font-size: 0.9rem;
      }

      .buscador-catalogos-toggle-derecha {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 0 0 auto;
      }

      .buscador-catalogos-estado {
        padding: 8px 12px;
        border-radius: 999px;
        font-size: 0.78rem;
        font-weight: 750;
        background: #d9f7ef;
        color: #0f766e;
        border: 1px solid rgba(15, 118, 110, 0.16);
        white-space: nowrap;
      }

      .buscador-catalogos-icono {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: #22b894;
        color: #ffffff;
        font-weight: 900;
        line-height: 1;
      }

      .buscador-catalogos-panel[data-abierto="true"] .buscador-catalogos-icono {
        transform: rotate(180deg);
      }

      .buscador-catalogos-cuerpo {
        display: none;
        padding: 0 22px 22px;
      }

      .buscador-catalogos-panel[data-abierto="true"] .buscador-catalogos-cuerpo {
        display: block;
      }

      .buscador-catalogos-controles {
        display: grid;
        grid-template-columns: minmax(160px, 220px) minmax(220px, 1fr) auto;
        gap: 12px;
        margin: 2px 0 12px;
      }

      .buscador-catalogos-select,
      .buscador-catalogos-input {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid rgba(15, 118, 110, 0.25);
        border-radius: 16px;
        padding: 13px 15px;
        outline: none;
        color: #12312d;
        background: #ffffff;
        font-size: 0.96rem;
      }

      .buscador-catalogos-select:focus,
      .buscador-catalogos-input:focus {
        border-color: rgba(16, 185, 129, 0.75);
        box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.13);
      }

      .buscador-catalogos-boton {
        border: 0;
        border-radius: 16px;
        padding: 12px 18px;
        background: #22b894;
        color: white;
        font-weight: 800;
        cursor: pointer;
        transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
      }

      .buscador-catalogos-boton:hover {
        background: #15967d;
        box-shadow: 0 10px 24px rgba(21, 150, 125, 0.22);
        transform: translateY(-1px);
      }

      .buscador-catalogos-ayuda {
        margin: 0 0 14px;
        color: #587d77;
        font-size: 0.88rem;
      }

      .buscador-catalogos-resultados {
        display: grid;
        gap: 10px;
        max-height: 360px;
        overflow: auto;
        padding-right: 4px;
      }

      .buscador-catalogos-vacio {
        padding: 14px;
        border: 1px dashed rgba(15, 118, 110, 0.28);
        border-radius: 16px;
        color: #5d7d78;
        background: rgba(255, 255, 255, 0.72);
      }

      .buscador-catalogos-item {
        display: grid;
        grid-template-columns: minmax(105px, auto) minmax(180px, 1fr) auto;
        gap: 12px;
        align-items: center;
        padding: 12px;
        border: 1px solid rgba(20, 184, 166, 0.14);
        border-radius: 16px;
        background: #ffffff;
      }

      .buscador-catalogos-codigo {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
        font-size: 0.95rem;
        font-weight: 900;
        color: #0f766e;
        letter-spacing: 0.02em;
      }

      .buscador-catalogos-nombre {
        font-weight: 700;
        color: #143b36;
      }

      .buscador-catalogos-detalle {
        margin-top: 3px;
        font-size: 0.82rem;
        color: #65837e;
        line-height: 1.35;
      }

      .buscador-catalogos-copiar {
        border: 1px solid rgba(15, 118, 110, 0.25);
        background: #effcf8;
        color: #0f766e;
        border-radius: 12px;
        padding: 9px 11px;
        cursor: pointer;
        font-weight: 800;
      }

      .buscador-catalogos-copiar:hover {
        background: #d9f7ef;
      }

      @media (max-width: 820px) {
        .buscador-catalogos-toggle,
        .buscador-catalogos-controles,
        .buscador-catalogos-item {
          grid-template-columns: 1fr;
          display: grid;
        }

        .buscador-catalogos-toggle-derecha {
          justify-content: space-between;
        }
      }
    `;
    document.head.appendChild(estilos);
  }

  function resolverAnclaje() {
    for (const selector of SELECTORES_ANCLAJE) {
      const elemento = document.querySelector(selector);
      if (elemento) return elemento;
    }

    return document.body;
  }

  function renderResultados(contenedor, resultados, termino, definicion) {
    contenedor.innerHTML = '';

    if (!definicion.obtener()) {
      const vacio = document.createElement('div');
      vacio.className = 'buscador-catalogos-vacio';
      vacio.textContent = `El ${definicion.titulo} no está cargado. Verifique los archivos de catálogo correspondientes.`;
      contenedor.appendChild(vacio);
      return;
    }

    if (!termino) {
      return;
    }

    if (!resultados.length) {
      const vacio = document.createElement('div');
      vacio.className = 'buscador-catalogos-vacio';
      vacio.textContent = `No se encontraron coincidencias para "${termino}".`;
      contenedor.appendChild(vacio);
      return;
    }

    resultados.forEach((resultado) => {
      const item = document.createElement('div');
      item.className = 'buscador-catalogos-item';

      const codigo = document.createElement('div');
      codigo.className = 'buscador-catalogos-codigo';
      codigo.textContent = resultado.codigo;

      const contenido = document.createElement('div');

      const nombre = document.createElement('div');
      nombre.className = 'buscador-catalogos-nombre';
      nombre.textContent = resultado.nombre || 'Sin descripción en el catálogo cargado';

      const detalle = document.createElement('div');
      detalle.className = 'buscador-catalogos-detalle';
      detalle.textContent = resultado.detalle || resultado.fuente || 'Catálogo cargado';

      const copiar = document.createElement('button');
      copiar.type = 'button';
      copiar.className = 'buscador-catalogos-copiar';
      copiar.textContent = 'Copiar';
      copiar.addEventListener('click', () => copiarTexto(resultado.codigo, copiar));

      contenido.appendChild(nombre);
      contenido.appendChild(detalle);
      item.appendChild(codigo);
      item.appendChild(contenido);
      item.appendChild(copiar);

      contenedor.appendChild(item);
    });
  }

  function crearPanel() {
    if (document.getElementById('buscador-catalogos-panel')) return;

    crearEstilos();

    const cache = {};

    function entradasActuales(id) {
      if (!cache[id]) {
        cache[id] = construirEntradasCatalogo(obtenerDefinicionCatalogo(id));
      }

      return cache[id];
    }

    const totalGeneral = CATALOGOS.reduce((total, catalogo) => total + entradasActuales(catalogo.id).length, 0);

    const panel = document.createElement('section');
    panel.id = 'buscador-catalogos-panel';
    panel.className = 'buscador-catalogos-panel';
    panel.dataset.abierto = 'false';
    panel.setAttribute('aria-label', 'Buscador de catálogos');

    panel.innerHTML = `
      <button id="buscador-catalogos-toggle" class="buscador-catalogos-toggle" type="button" aria-expanded="false">
        <span class="buscador-catalogos-toggle-texto">
          <span class="buscador-catalogos-titulo">Consultar catálogos</span>
          <span class="buscador-catalogos-subtitulo">
            Apoyo para consultar ATC, CIE-10 y CUPS. No modifica validaciones ni reportes.
          </span>
        </span>
        <span class="buscador-catalogos-toggle-derecha">
          <span class="buscador-catalogos-estado">${totalGeneral} registros</span>
          <span class="buscador-catalogos-icono">⌄</span>
        </span>
      </button>

      <div id="buscador-catalogos-cuerpo" class="buscador-catalogos-cuerpo">
        <div class="buscador-catalogos-controles">
          <select id="buscador-catalogos-select" class="buscador-catalogos-select" aria-label="Seleccionar catálogo">
            ${CATALOGOS.map((catalogo) => `<option value="${catalogo.id}">${catalogo.etiqueta}</option>`).join('')}
          </select>

          <input
            id="buscador-catalogos-input"
            class="buscador-catalogos-input"
            type="search"
            placeholder="Buscar por código o descripción"
            autocomplete="off"
          />

          <button id="buscador-catalogos-limpiar" class="buscador-catalogos-boton" type="button">Limpiar</button>
        </div>

        <p id="buscador-catalogos-ayuda" class="buscador-catalogos-ayuda"></p>

        <div id="buscador-catalogos-resultados" class="buscador-catalogos-resultados"></div>
      </div>
    `;

    const anclaje = resolverAnclaje();

    if (anclaje === document.body) {
      document.body.appendChild(panel);
    } else {
      anclaje.insertAdjacentElement('afterbegin', panel);
    }

    const toggle = panel.querySelector('#buscador-catalogos-toggle');
    const select = panel.querySelector('#buscador-catalogos-select');
    const input = panel.querySelector('#buscador-catalogos-input');
    const botonLimpiar = panel.querySelector('#buscador-catalogos-limpiar');
    const ayuda = panel.querySelector('#buscador-catalogos-ayuda');
    const resultados = panel.querySelector('#buscador-catalogos-resultados');

    const actualizar = () => {
      const definicion = obtenerDefinicionCatalogo(select.value);
      const entradas = entradasActuales(definicion.id);
      const termino = texto(input.value);

      ayuda.textContent = `${definicion.ayuda} Registros cargados: ${entradas.length}.`;
      renderResultados(resultados, buscarEntradas(termino, entradas), termino, definicion);
    };

    const abrir = () => {
      panel.dataset.abierto = 'true';
      toggle.setAttribute('aria-expanded', 'true');
      actualizar();
      window.setTimeout(() => input.focus(), 80);
    };

    const cerrar = () => {
      panel.dataset.abierto = 'false';
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      if (panel.dataset.abierto === 'true') cerrar();
      else abrir();
    });

    select.addEventListener('change', () => {
      input.value = '';
      actualizar();
      input.focus();
    });

    input.addEventListener('input', actualizar);

    botonLimpiar.addEventListener('click', () => {
      input.value = '';
      input.focus();
      actualizar();
    });

    window.CACBuscadorCatalogos = {
      version: VERSION,
      abrir,
      cerrar,
      reconstruir: () => {
        panel.remove();
        crearPanel();
      },
      buscar: (termino, catalogo = 'atc') => buscarEntradas(termino, entradasActuales(obtenerDefinicionCatalogo(catalogo).id)),
      totalRegistros: (catalogo = null) => {
        if (catalogo) return entradasActuales(obtenerDefinicionCatalogo(catalogo).id).length;
        return totalGeneral;
      },
      estaAbierto: () => panel.dataset.abierto === 'true'
    };

    // Alias de compatibilidad con la primera versión del buscador ATC.
    window.CACBuscadorATC = {
      version: VERSION,
      abrir,
      cerrar,
      reconstruir: window.CACBuscadorCatalogos.reconstruir,
      buscar: (termino) => window.CACBuscadorCatalogos.buscar(termino, 'atc'),
      totalRegistros: () => window.CACBuscadorCatalogos.totalRegistros('atc'),
      estaAbierto: () => panel.dataset.abierto === 'true'
    };
  }

  function iniciar() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', crearPanel, { once: true });
    } else {
      crearPanel();
    }
  }

  iniciar();
})();
