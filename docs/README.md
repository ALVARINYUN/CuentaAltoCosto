# Validador CAC — Cáncer

**Normativa base:** Resolución 0247/2014 · Instructivo CAC-IEP1-I01 · Medición enero 2025  
**Estado del proyecto:** desarrollo local en avance progresivo  
**Avance funcional validado:** V1 a V66  
**Siguiente variable:** V66.1  

---

## ¿Qué es?

Herramienta local para revisar archivos Excel de la Cuenta de Alto Costo antes del reporte final de cáncer.

Permite cargar una matriz de pacientes, reconocer encabezados del instructivo, aplicar reglas de validación por variable y mostrar hallazgos en cada registro.

---

## ¿Qué hace actualmente?

1. Carga archivos Excel.
2. Permite seleccionar hoja.
3. Reconoce encabezados reales, variables y subvariables.
4. Procesa registros por paciente.
5. Ejecuta reglas de negocio por módulos.
6. Muestra errores y advertencias.
7. Exporta reporte Excel con celdas marcadas.

---

## Avance funcional

| Bloque | Estado |
|---|---|
| V1-V16 | Cerrado |
| V17-V28 | Cerrado |
| V29-V35 | Cerrado |
| V36-V44 | Cerrado |
| V45-V53.9 | Cerrado |
| V54-V56 | Cerrado |
| V57-V60 | Cerrado |
| V61-V65 | Cerrado |
| V66 | Cerrado |
| V66.1 | Siguiente |
| V66.2-V134 | Pendiente |

---

## Ejecución local

```bash
python -m http.server 8000
```

Abrir:

```text
http://localhost:8000
```

---

## Módulos principales

| Módulo | Variables | Estado |
|---|---|---|
| `modulo1.js` | V1-V16 | Cerrado |
| `modulo2.js` | V17-V24 | Cerrado |
| `modulo3.js` | V25-V28 | Cerrado |
| `modulo4.js` | V29 | Cerrado |
| `modulo5.js` | V30-V33 | Cerrado |
| `modulo6.js` | V34-V35 | Cerrado |
| `modulo7.js` | V36-V40 | Cerrado |
| `modulo8.js` | V41-V44 | Cerrado |
| `modulo9.js` | V45-V47 | Cerrado |
| `modulo10.js` | V48-V52 | Cerrado |
| `modulo11.js` | V53-V53.9 | Cerrado |
| `modulo12.js` | V54-V56 | Cerrado |
| `modulo13.js` | V57-V60 | Cerrado |
| `modulo14.js` | V61-V65 | Cerrado |
| `modulo15.js` | V66-V66.9 | En progreso |

---

## Reglas de trabajo

- No modificar variables cerradas salvo bug real.
- Confirmar encabezados reales antes de iniciar una variable.
- No inventar reglas no soportadas por el instructivo.
- No adelantar validaciones de variables futuras.
- Mantener trazabilidad clara.
- Probar cada variable con Excel limpio.
- Revisar pantalla, consola y exportador antes del cierre.
