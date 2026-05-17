# Validador CAC — Cohorte de Alto Costo Cáncer

**Normativa:** Resolución 0247/2014 · Instructivo CAC-IEP1-I01 · Medición enero 2025  
**Versión:** 1.0.0 — Sprint 1  

---

## ¿Qué es esto?

Herramienta para validar archivos Excel con datos CAC antes de enviarlos a la Cuenta de Alto Costo. Detecta errores, advertencias e incoherencias en las 134 variables del instructivo oficial.

## ¿Cómo usar?

1. Abrir `index.html` en el navegador (doble clic)
2. Cargar el archivo Excel con los datos CAC
3. Hacer clic en "Iniciar validación"
4. Revisar errores por paciente
5. Exportar reporte Excel

## Privacidad

- Los datos **nunca salen de este equipo**
- Todo se procesa localmente en el navegador
- Al cerrar la pestaña, todos los datos desaparecen
- No se usa localStorage ni cookies para datos de pacientes

## Estructura

```
validador-cac/
├── index.html              ← Punto de entrada
├── css/estilos.css         ← Estilos
├── src/
│   ├── main.js             ← Arranque
│   ├── ui/                 ← Interfaz
│   ├── validaciones/       ← Reglas CAC
│   ├── lector/             ← Lee el Excel
│   ├── catalogos/          ← Maneja catálogos
│   └── exportador/         ← Genera reportes
├── catalogos/              ← Archivos JSON de catálogos
├── libs/                   ← Librerías locales
└── docs/                   ← Documentación
```

## Sprint actual

**Sprint 1 — MVP local**
- Carga de archivo Excel
- Validación V1-V16 (identificación)
- Visualización de errores
- Búsqueda por documento
