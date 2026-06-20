(function () {
  'use strict';

  const VERSION = 'sprint-3o-v134-acceso-local-02';
  const STORAGE_KEY = 'CAC_ACCESO_LOCAL_V1';
  const SESSION_KEY = 'CAC_SESION_LOCAL_V1';

  function obtener(id) { return document.getElementById(id); }
  function texto(valor) { return String(valor ?? '').trim(); }
  function normalizarUsuario(valor) { return texto(valor).toLowerCase(); }
  function mostrar(el) { if (el) el.classList.remove('oculto'); }
  function ocultar(el) { if (el) el.classList.add('oculto'); }

  function setMensaje(id, mensaje, tipo = '') {
    const el = obtener(id);
    if (!el) return;
    el.textContent = mensaje || '';
    el.classList.remove('error', 'ok');
    if (tipo) el.classList.add(tipo);
  }

  function generarSalt() {
    const bytes = new Uint8Array(16);
    if (window.crypto && typeof window.crypto.getRandomValues === 'function') {
      window.crypto.getRandomValues(bytes);
      return Array.from(bytes).map((byte) => byte.toString(16).padStart(2, '0')).join('');
    }
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  async function sha256(valor) {
    const contenido = new TextEncoder().encode(valor);
    if (window.crypto && window.crypto.subtle && typeof window.crypto.subtle.digest === 'function') {
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', contenido);
      return Array.from(new Uint8Array(hashBuffer)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
    }

    let hash = 0;
    const cadena = String(valor);
    for (let i = 0; i < cadena.length; i += 1) {
      hash = ((hash << 5) - hash) + cadena.charCodeAt(i);
      hash |= 0;
    }
    return `fallback-${Math.abs(hash)}`;
  }

  function hashClave(clave, salt) {
    return sha256(`${salt}:${clave}`);
  }

  function leerConfig() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.warn('[AccesoLocal] No se pudo leer la configuración local.', error);
      return null;
    }
  }

  function guardarConfig(config) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }

  function leerSesion() {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function guardarSesion(sesion) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(sesion));
  }

  function limpiarSesion() {
    sessionStorage.removeItem(SESSION_KEY);
  }

  function aplicarEstadoAutenticado() {
    document.body.classList.remove('app-bloqueada');
    const pantalla = obtener('pantalla-acceso-local');
    if (pantalla) pantalla.style.display = 'none';
    mostrar(obtener('acceso-local-controles'));
    actualizarEtiquetaEntidad();
  }

  function aplicarEstadoBloqueado() {
    document.body.classList.add('app-bloqueada');
    const pantalla = obtener('pantalla-acceso-local');
    if (pantalla) pantalla.style.display = '';
    ocultar(obtener('acceso-local-controles'));
  }

  function actualizarEtiquetaEntidad() {
    const config = leerConfig();
    const etiqueta = obtener('acceso-local-entidad');
    if (!etiqueta) return;
    const entidad = texto(config?.entidad) || 'Entidad local';
    const usuario = texto(config?.usuario) || 'usuario';
    etiqueta.textContent = `${entidad} · ${usuario}`;
    etiqueta.title = `Acceso local activo · ${VERSION}`;
  }

  function validarClave(clave) {
    return texto(clave).length >= 6;
  }

  function mostrarFormularioInicial() {
    aplicarEstadoBloqueado();
    mostrar(obtener('form-acceso-inicial'));
    ocultar(obtener('form-acceso-login'));
    window.setTimeout(() => obtener('setup-entidad')?.focus(), 80);
  }

  function mostrarFormularioLogin() {
    aplicarEstadoBloqueado();
    ocultar(obtener('form-acceso-inicial'));
    mostrar(obtener('form-acceso-login'));
    const config = leerConfig();
    const usuarioInput = obtener('login-usuario');
    if (usuarioInput && config?.usuario) usuarioInput.value = config.usuario;
    window.setTimeout(() => obtener('login-clave')?.focus(), 80);
  }

  async function crearAccesoInicial(evento) {
    evento.preventDefault();
    const entidad = texto(obtener('setup-entidad')?.value);
    const usuario = normalizarUsuario(obtener('setup-usuario')?.value);
    const clave = texto(obtener('setup-clave')?.value);
    const confirmar = texto(obtener('setup-clave-confirmar')?.value);

    if (!entidad) return setMensaje('mensaje-acceso-inicial', 'Ingrese el nombre de la entidad.', 'error');
    if (!usuario) return setMensaje('mensaje-acceso-inicial', 'Ingrese un usuario administrador.', 'error');
    if (!validarClave(clave)) return setMensaje('mensaje-acceso-inicial', 'La contraseña debe tener mínimo 6 caracteres.', 'error');
    if (clave !== confirmar) return setMensaje('mensaje-acceso-inicial', 'Las contraseñas no coinciden.', 'error');

    const salt = generarSalt();
    const hash = await hashClave(clave, salt);
    const ahora = new Date().toISOString();

    const config = { version: VERSION, entidad, usuario, salt, hash, creadoEn: ahora, actualizadoEn: ahora };
    guardarConfig(config);
    guardarSesion({ usuario, entidad, inicio: ahora, version: VERSION });
    setMensaje('mensaje-acceso-inicial', 'Acceso local creado correctamente.', 'ok');
    aplicarEstadoAutenticado();
  }

  async function iniciarSesion(evento) {
    evento.preventDefault();
    const config = leerConfig();
    if (!config) return mostrarFormularioInicial();

    const usuario = normalizarUsuario(obtener('login-usuario')?.value);
    const clave = texto(obtener('login-clave')?.value);

    if (usuario !== normalizarUsuario(config.usuario)) {
      return setMensaje('mensaje-acceso-login', 'Usuario o contraseña incorrectos.', 'error');
    }

    const hash = await hashClave(clave, config.salt);
    if (hash !== config.hash) {
      return setMensaje('mensaje-acceso-login', 'Usuario o contraseña incorrectos.', 'error');
    }

    guardarSesion({ usuario: config.usuario, entidad: config.entidad, inicio: new Date().toISOString(), version: VERSION });
    setMensaje('mensaje-acceso-login', 'Acceso correcto.', 'ok');
    aplicarEstadoAutenticado();
  }

  function abrirConfiguracion() {
    const config = leerConfig();
    if (!config) return mostrarFormularioInicial();

    if (obtener('config-entidad')) obtener('config-entidad').value = config.entidad || '';
    if (obtener('config-usuario')) obtener('config-usuario').value = config.usuario || '';
    if (obtener('config-clave-actual')) obtener('config-clave-actual').value = '';
    if (obtener('config-clave-nueva')) obtener('config-clave-nueva').value = '';
    if (obtener('config-clave-confirmar')) obtener('config-clave-confirmar').value = '';
    setMensaje('mensaje-configuracion-local', '');

    const modal = obtener('modal-configuracion-local');
    if (modal) modal.classList.add('activo');
    window.setTimeout(() => obtener('config-entidad')?.focus(), 80);
  }

  function cerrarConfiguracion() {
    const modal = obtener('modal-configuracion-local');
    if (modal) modal.classList.remove('activo');
  }

  async function guardarConfiguracion(evento) {
    evento.preventDefault();
    const config = leerConfig();
    if (!config) return mostrarFormularioInicial();

    const entidad = texto(obtener('config-entidad')?.value);
    const usuario = normalizarUsuario(obtener('config-usuario')?.value);
    const claveActual = texto(obtener('config-clave-actual')?.value);
    const claveNueva = texto(obtener('config-clave-nueva')?.value);
    const claveConfirmar = texto(obtener('config-clave-confirmar')?.value);

    if (!entidad) return setMensaje('mensaje-configuracion-local', 'Ingrese el nombre de la entidad.', 'error');
    if (!usuario) return setMensaje('mensaje-configuracion-local', 'Ingrese el usuario administrador.', 'error');

    const hashActual = await hashClave(claveActual, config.salt);
    if (hashActual !== config.hash) {
      return setMensaje('mensaje-configuracion-local', 'La contraseña actual no es correcta.', 'error');
    }

    const actualizado = { ...config, entidad, usuario, actualizadoEn: new Date().toISOString(), version: VERSION };

    if (claveNueva || claveConfirmar) {
      if (!validarClave(claveNueva)) return setMensaje('mensaje-configuracion-local', 'La nueva contraseña debe tener mínimo 6 caracteres.', 'error');
      if (claveNueva !== claveConfirmar) return setMensaje('mensaje-configuracion-local', 'La nueva contraseña no coincide.', 'error');
      actualizado.salt = generarSalt();
      actualizado.hash = await hashClave(claveNueva, actualizado.salt);
    }

    guardarConfig(actualizado);
    guardarSesion({ usuario: actualizado.usuario, entidad: actualizado.entidad, inicio: new Date().toISOString(), version: VERSION });
    actualizarEtiquetaEntidad();
    setMensaje('mensaje-configuracion-local', 'Configuración actualizada correctamente.', 'ok');
    window.setTimeout(cerrarConfiguracion, 650);
  }

  function cerrarSesion() {
    limpiarSesion();
    mostrarFormularioLogin();
  }


  function conectarTogglesClave() {
    document.querySelectorAll('[data-password-toggle]').forEach((boton) => {
      boton.addEventListener('click', function () {
        const targetId = boton.getAttribute('data-target');
        const input = targetId ? obtener(targetId) : null;
        if (!input) return;

        const visible = input.getAttribute('type') === 'text';
        input.setAttribute('type', visible ? 'password' : 'text');
        boton.textContent = visible ? 'Ver' : 'Ocultar';
        boton.setAttribute('aria-label', visible ? 'Mostrar contraseña' : 'Ocultar contraseña');
        input.focus();
      });
    });
  }

  function conectarEventos() {
    obtener('form-acceso-inicial')?.addEventListener('submit', crearAccesoInicial);
    obtener('form-acceso-login')?.addEventListener('submit', iniciarSesion);
    obtener('btn-configuracion-acceso')?.addEventListener('click', abrirConfiguracion);
    obtener('btn-cerrar-sesion')?.addEventListener('click', cerrarSesion);
    obtener('btn-cerrar-configuracion')?.addEventListener('click', cerrarConfiguracion);
    obtener('form-configuracion-local')?.addEventListener('submit', guardarConfiguracion);

    obtener('modal-configuracion-local')?.addEventListener('click', function (evento) {
      if (evento.target === evento.currentTarget) cerrarConfiguracion();
    });

    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape') cerrarConfiguracion();
    });
  }

  function iniciar() {
    conectarEventos();
    conectarTogglesClave();
    const config = leerConfig();
    const sesion = leerSesion();

    if (!config) return mostrarFormularioInicial();

    if (sesion && normalizarUsuario(sesion.usuario) === normalizarUsuario(config.usuario)) {
      aplicarEstadoAutenticado();
      return;
    }

    mostrarFormularioLogin();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar, { once: true });
  } else {
    iniciar();
  }

  window.CACAccesoLocal = {
    version: VERSION,
    estaConfigurado: () => Boolean(leerConfig()),
    sesionActiva: () => Boolean(leerSesion()),
    obtenerConfig: () => {
      const config = leerConfig();
      if (!config) return null;
      return {
        version: config.version,
        entidad: config.entidad,
        usuario: config.usuario,
        creadoEn: config.creadoEn,
        actualizadoEn: config.actualizadoEn
      };
    },
    abrirConfiguracion,
    cerrarSesion
  };
})();