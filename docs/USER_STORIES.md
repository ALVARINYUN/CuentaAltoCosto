# Historias de Usuario — Validador CAC

**Proyecto:** Validador CAC para reporte de cáncer  
**Versión:** 3.1  
**Estado actual:** avance funcional validado hasta V66  
**Siguiente variable:** V66.1  
**Fecha de actualización:** Junio 2026  

---

## 1. Propósito

Este documento reúne las historias de usuario del Validador CAC. Su función es orientar el desarrollo desde las necesidades reales del proceso: cargar archivos, validar información, revisar hallazgos, exportar reportes y mantener trazabilidad.

---

## 2. Reglas del backlog

1. No se reutilizan IDs.
2. Cada historia debe tener valor funcional claro.
3. Cada sprint debe entregar algo usable.
4. Las validaciones se implementan por bloques.
5. Las reglas deben salir del instructivo o de trazabilidad clara.
6. Si una regla depende de una variable futura, se deja pendiente.
7. Antes de iniciar variable nueva, se confirman encabezados reales/cortados.

---

## 3. Perfiles

| Perfil | Descripción |
|---|---|
| Digitador | Registra, corrige o carga datos de pacientes. |
| Analista de calidad | Revisa errores, advertencias y soportes antes del reporte. |
| Auditor CAC | Verifica cumplimiento frente al instructivo y soportes. |
| Coordinador del programa | Consulta indicadores, avance y calidad del dato. |
| Administrador | Mantiene catálogos, documentación y configuración. |
| Desarrollador / mantenedor | Actualiza reglas, módulos, catálogos y exportaciones. |

---

## HU-004 — Cargar archivo Excel CAC

**Estado:** Cerrado funcional.

## HU-005 — Validar estructura del archivo cargado

**Estado:** Cerrado funcional hasta V66.

## HU-010 — Validar identificación V1-V16

**Estado:** Cerrado funcional.

## HU-011 — Validar diagnóstico V17-V44

**Estado:** Cerrado funcional.

## HU-012 — Validar tratamiento sistémico V45-V73

**Como** analista de calidad,  
**quiero** validar terapia sistémica e intratecal,  
**para** revisar esquemas, ciclos, medicamentos, IPS, fechas y finalización.

**Criterios actualizados:**

- V45 controla el bloque de terapia sistémica.
- V48-V52 validan ubicación, fecha de inicio e IPS del primer o único esquema.
- V53-V53.9 validan medicamentos base con catálogo ATC.
- V54-V56 validan medicamentos adicionales.
- V57-V60 validan cierre del primer o único esquema.
- V61-V65 validan ubicación, fecha e IPS del último esquema.
- V66 valida número de medicamentos propuestos en el último esquema.
- V66.1-V66.9 validan medicamentos administrados del último esquema.

**Estado:** Cerrado funcional hasta V66; V66.1 siguiente.

## HU-021 — Cargar catálogo ATC

**Estado:** Implementado para los bloques trabajados y disponible para V66.1.

## HU-027 — Ver cumplimiento general

**Criterios actualizados:**

- Muestra pacientes procesados.
- Muestra pacientes con errores.
- Muestra pacientes con advertencias, incluso si también tienen errores.
- Muestra pacientes sin problemas.
- Muestra total de errores y advertencias.

**Estado:** Implementado.

## HU-030 — Exportar Excel de validación

**Estado:** Cerrado funcional hasta V66, con revisión acumulativa.

## HU-035 — Mensajes de error claros

**Estado:** En mejora continua.

---

## Mapeo de avance

| Sprint | Objetivo | Estado |
|---|---|---|
| Sprint 1 | Carga, estructura y V1-V16 | Cerrado |
| Sprint 2 | Diagnóstico y catálogos mínimos | Cerrado |
| Sprint 3 | Tratamiento sistémico progresivo | Cerrado hasta V66 |

---

## Resumen

| Concepto | Estado |
|---|---|
| Avance funcional actual | V1-V66 |
| Siguiente variable | V66.1 |
| Catálogo ATC | Disponible |
| Bloque actual | Medicamentos del último esquema |
