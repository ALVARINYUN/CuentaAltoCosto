. Reglas generales consolidadas
Esta sección contiene reglas ya confirmadas durante el desarrollo del proyecto.

No reemplaza la consolidación completa variable por variable.

9.1 Reglas generales de fechas
Regla	Estado
Las fechas deben manejar formato AAAA-MM-DD cuando el instructivo lo exige	Confirmada
Si sólo se conoce año y mes, se usa día 15 cuando el instructivo lo permite	Confirmada
1845-01-01 se usa como No Aplica en fechas donde el instructivo lo permite	Confirmada
1800-01-01 se usa en algunas fechas para eventos iniciados pero no finalizados	Confirmada según variable
Una fecha real no debe contradecir fechas previas cuando hay trazabilidad explícita	Confirmada según variable
9.2 Reglas generales de códigos
Tipo de código	Regla general	Estado
CIE-10	Debe existir en catálogo CIE-10 cuando la variable lo exige	Confirmada
CUPS	Debe existir en catálogo CUPS cuando la variable lo exige	Confirmada
ATC	Debe existir en catálogo ATC cuando la variable lo exige	Confirmada
REPS / IPS	Debe conservar ceros iniciales y validar longitud/formato cuando aplique	Confirmada
9.3 Reglas generales de comodines
Regla	Estado
Un comodín permitido por instructivo no genera advertencia por sí solo	Confirmada
Un comodín puede generar error si contradice una dependencia explícita	Confirmada
98 no significa lo mismo en todas las variables; debe interpretarse por instructivo	Confirmada
97 no significa lo mismo en todas las variables; debe interpretarse por instructivo	Confirmada
99 no significa lo mismo en todas las variables; debe interpretarse por instructivo	Confirmada
10. Reglas conocidas por bloque
10.1 V1-V16 — Identificación
Campo	Detalle
Estado en APP	Cerrado
Estado en matriz	Pendiente de consolidación detallada
Archivo implementador	src/validaciones/reglas/modulo1.js
Observación	Consolidar contra instructivo oficial, matriz de variables y código existente
10.2 V17-V24 — Diagnóstico inicial
Campo	Detalle
Estado en APP	Cerrado
Estado en matriz	Pendiente de consolidación detallada
Archivo implementador	Pendiente de confirmar
Regla conocida	Si V21=7, entonces V22 debe estar en 1..6 o 99
Regla conocida	Si V21=7, entonces V24 debe ser 1845-01-01
Regla conocida	Si V21=7, entonces V27 debe ser 98
Regla conocida	Si V21=7, entonces V28 debe ser 98
Estado regla conocida	Confirmada por trazabilidad del proyecto
10.3 V25-V28 — Confirmación, histología y diferenciación
Campo	Detalle
Estado en APP	Cerrado
Estado en matriz	Pendiente de consolidación detallada
Archivo implementador	Pendiente de confirmar
Regla conocida V27	Histología permite 1..21, 23, 24, 98, 99
Regla conocida V27	El valor 21 aplica sólo para pulmón
Regla conocida V28	Diferenciación permite 1, 2, 3, 4, 94, 95, 98, 99
Regla conocida V28	Si V28=99 y V18 >= 2015-01-01, genera error
Estado regla conocida	Confirmada por trazabilidad del proyecto
10.4 V29-V40 — Estadificación, riesgo y objetivo
Campo	Detalle
Estado en APP	Cerrado
Estado en matriz	Pendiente de consolidación detallada
Archivo implementador	Pendiente de confirmar
Regla conocida V36	Ann Arbor/Lugano aplica para C81, C82-C86 y C900
Estado regla conocida	Confirmada por trazabilidad del proyecto
10.5 V41-V44 — Intervención médica y antecedentes
Campo	Detalle
Estado en APP	Cerrado
Estado en matriz	Pendiente de consolidación detallada
Archivo implementador	Pendiente de confirmar
Observación	Consolidar contra instructivo oficial, matriz de variables y código existente
10.6 V45-V60 — Primer o único esquema sistémico
Campo	Detalle
Estado en APP	Cerrado
Estado en matriz	Pendiente de consolidación detallada
Archivo implementador	Pendiente de confirmar
Regla conocida V45	V45 permite 1 y 98
Regla conocida V49	Si V45=98, V49 debe ser 1845-01-01
Regla conocida V53.1	V53.1 no permite 97
Regla conocida V53.2-V53.9	V53.2 a V53.9 permiten 97 y 98 según instructivo y trazabilidad
Estado regla conocida	Confirmada por trazabilidad del proyecto
10.7 V61-V77 — Último esquema sistémico
Campo	Detalle
Estado en APP	Cerrado
Estado en matriz	Pendiente de consolidación detallada
Archivo implementador	Pendiente de confirmar
Regla conocida V61	V61 permite 1, 2, 3, 11, 12, 13, 14, 97, 98
Regla conocida V66	Si V66=98, V66.1-V66.9 deben ser 98
Regla conocida V66.1	V66.1 no permite 97
Estado regla conocida	Confirmada por trazabilidad del proyecto
10.8 V78-V85 — Cirugía
Campo	Detalle
Estado en APP	Cerrado
Estado en matriz	Pendiente de consolidación detallada
Archivo implementador	Pendiente de confirmar
Regla conocida V78	V78 valida CUPS de primera cirugía en grupo cirugía
Regla conocida V74	Si V74=1, no debe usarse 98 cuando la variable dependiente exige registro
Regla conocida V74	Si V74=2, las variables dependientes deben usar 98 cuando el instructivo lo indique
Regla conocida V80	V80 debe ser fecha AAAA-MM-DD o 1845-01-01 según aplique
Regla conocida V80	Si V74=2 o V75=1, V80 debe ser 1845-01-01
Regla conocida V80	Si V74=1 y V75>1, V80 no debe ser 1845-01-01
Regla conocida V80	V80 no debe ser anterior a V76
Regla conocida V81	V81 permite 1, 2, 3, 5, 6, 98
Estado regla conocida	Confirmada por trazabilidad del proyecto
10.9 V86-V105 — Radioterapia
Campo	Detalle
Estado en APP	Cerrado
Estado en matriz	Pendiente de consolidación detallada
Archivo implementador	src/validaciones/reglas/modulo17.js
Trazabilidad conocida	V86 -> V97 -> V98 -> V99 -> V100 -> V101 -> V102 -> V103
Regla conocida V94	V94 registra fecha de finalización del primer o único esquema de radioterapia
Regla conocida V94	1800-01-01 indica esquema de radioterapia que aún no finaliza
Regla conocida V94	1845-01-01 indica No Aplica
Regla conocida V94	V94 no debe ser anterior a V88
Regla conocida V95	V95 permite 1, 2, 3, 98
Regla conocida V95	Si V94=1800-01-01, V95 debe ser 3
Regla conocida V95	Si V94 es fecha real, V95 no debe ser 3
Regla conocida V95	Si V86=98, V95 debe ser 98
Regla conocida V96	V96 permite 1..7 y 98
Regla conocida V96	Si V95=2, V96 debe estar en 1..7
Regla conocida V96	Si V95=1, 3 o 98, V96 debe ser 98
Regla conocida V103	Fecha de finalización del último esquema de radioterapia en el periodo
Regla conocida V103	Permite fecha AAAA-MM-DD, 1800-01-01 si no finaliza y 1845-01-01 si no aplica
Estado regla conocida	Confirmada por trazabilidad del proyecto
10.10 V106-V110 — Trasplante
Campo	Detalle
Estado en APP	Cerrado
Estado en matriz	Pendiente de consolidación detallada
Archivo implementador	Pendiente de confirmar
Regla conocida V106	V106 permite 1 y 98
Regla conocida V108	V108 corresponde a fecha de trasplante según instructivo
Regla conocida V110	V110 valida código IPS/REPS de 12 dígitos cuando aplica
Regla conocida V110	V110 permite 96 o 98 según aplique por instructivo
Estado regla conocida	Confirmada por trazabilidad del proyecto
10.11 V111-V125 — Tratamiento complementario y tipo tratamiento a corte
Campo	Detalle
Estado en APP	Cerrado
Estado en matriz	Pendiente de consolidación detallada
Archivo implementador	src/validaciones/reglas/modulo19.js
Versión cerrada	sprint-3n-v125-tipo-tratamiento-corte-01
Regla conocida V111	V111 permite 1 y 98
Regla conocida V111	La opción 2 fue eliminada
Regla conocida V112	V112 debe ser fecha AAAA-MM-DD o 1845-01-01 según V111
Regla conocida V113	V113 valida REPS de 12 dígitos o 98 según V111/V112
Regla conocida V114	V114 permite 1 y 2
Regla conocida V114.1-V114.6	Permiten 1 y 2; opción 3 eliminada
Regla conocida V115	Fecha primera consulta/procedimiento de cuidado paliativo
Regla conocida V116	Código IPS paliativo; REPS 12 dígitos o 98 No Aplica
Regla conocida V117	Psiquiatría valorado
Regla conocida V118	Fecha primera consulta psiquiatría; AAAA-MM-DD o 1845-01-01
Regla conocida V119	Código IPS psiquiatría; REPS 12 dígitos o 98 No Aplica
Regla conocida V120	Nutrición permite 1, 2 y 98
Regla conocida V121	Fecha consulta inicial nutrición; AAAA-MM-DD o 1845-01-01
Regla conocida V122	Código IPS nutrición; REPS 12 dígitos o 98 No Aplica
Regla conocida V123	Soporte nutricional permite 1, 2, 3 y 4
Regla conocida V124	Terapias complementarias permite 1, 2, 3, 5, 6, 7, 8 y 98
Regla conocida V125	Tipo de tratamiento a corte permite 1..11 y 98
Regla conocida V125	El valor 4 representa combinación 1 + 2
Estado regla conocida	Confirmada por trazabilidad del proyecto
10.12 V126-V134 — Resultado final, estado vital, novedades y cierre
Campo	Detalle
Estado en APP	Cerrado
Estado en matriz	Pendiente de consolidación detallada
Archivo implementador	src/validaciones/reglas/modulo20.js
Versión cerrada	sprint-3o-v134-fecha-corte-01
Regla conocida V126	Resultado final del manejo oncológico permite 1, 2, 3, 4, 5, 6, 7, 8, 97, 98 y 99
Regla conocida V127	Estado vital a la fecha de corte según instructivo
Regla conocida V128	Novedad administrativa permite 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18 y 19
Regla conocida V129	Novedad clínica permite 1, 3, 8, 9, 10, 11 y 12
Regla conocida V130	Fecha de desafiliación; AAAA-MM-DD o 1845-01-01
Regla conocida V131	Fecha de muerte; AAAA-MM-DD o 1845-01-01
Regla conocida V132	Causa de muerte
Regla conocida V133	Código único BDUA-BDEX-PVS
Regla conocida V134	Fecha de corte
Regla conocida V134	Para el periodo trabajado, la fecha esperada es 2025-01-01
Estado regla conocida	Confirmada por cierre Sprint 3O
11. Control de consolidación por bloques
Orden	Bloque	Variables	Acción requerida	Estado
1	Identificación	V1-V16	Revisar instructivo, matriz de variables y módulo correspondiente	Pendiente
2	Diagnóstico inicial	V17-V24	Consolidar reglas y trazabilidades conocidas	Pendiente
3	Confirmación / histología / diferenciación	V25-V28	Consolidar catálogos y excepciones	Pendiente
4	Estadificación	V29-V40	Consolidar reglas por diagnóstico aplicable	Pendiente
5	Intervención médica	V41-V44	Consolidar catálogo y dependencias	Pendiente
6	Terapia sistémica inicial	V45-V60	Consolidar inicio, fechas y medicamentos	Pendiente
7	Último esquema	V61-V77	Consolidar medicamentos y cierre de esquema	Pendiente
8	Cirugía	V78-V85	Consolidar CUPS, fechas y motivos	Pendiente
9	Radioterapia	V86-V105	Consolidar trazabilidad completa de radioterapia	Pendiente
10	Trasplante	V106-V110	Consolidar fecha, IPS y comodines	Pendiente
11	Tratamiento complementario	V111-V125	Consolidar cuidado paliativo, psiquiatría, nutrición y tratamiento a corte	Pendiente
12	Cierre	V126-V134	Consolidar resultado final, novedades, muerte, BDUA y fecha de corte	Pendiente
12. Criterio para marcar una variable como consolidada
Una variable sólo puede marcarse como consolidada cuando tenga:

Nombre oficial.
Encabezado real/cortado.
Tipo de dato.
Formato esperado.
Catálogo permitido.
Comodines permitidos.
Dependencias.
Trazabilidad.
Reglas de error.
Reglas de advertencia.
Excepciones.
Código de hallazgo.
Archivo implementador.
Estado funcional.
Fuente de validación: instructivo, código, auditoría o prueba.
13. Estado actual de esta matriz
Elemento	Estado
Archivo creado	Sí
Estructura documental completa	Sí
Reglas conocidas registradas	Parcial
Reglas V1-V134 completas variable por variable	No
Consolidación por bloques iniciada	Pendiente
Errores cerrados modificados	No
Advertencias modificadas	No
Próximo bloque recomendado	V1-V16 — Identificación
14. Próximo paso recomendado
El siguiente paso es consolidar el primer bloque:

V1-V16 — Identificación

Para hacerlo correctamente se deben revisar:

docs/matriz_variables_cac_actualizada_v134.md
src/validaciones/reglas/modulo1.js
src/lector/estructura.js
src/validaciones/engine.js
instructivo oficial de V1-V16, si hace falta confirmar regla
auditoría o pruebas cerradas de Sprint 1, si existen
No se deben documentar reglas inventadas.

15. Nota de control
Este documento no está vacío ni inconcluso: queda creado como matriz oficial de reglas de negocio, con estructura completa, reglas generales, reglas conocidas por bloque y control de consolidación.

Lo que queda pendiente es la consolidación variable por variable, que debe hacerse de forma segura por bloques para evitar errores, duplicidades o reglas inventadas.