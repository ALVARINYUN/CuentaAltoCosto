
(function () {
  'use strict';

  const VERSION = 'sprint-3g-v60-estructura-03-progresivo';

  const VARIABLES_SPRINT_1 = [
    'V1', 'V2', 'V3', 'V4',
    'V5', 'V6', 'V7', 'V8',
    'V9', 'V10', 'V11', 'V12',
    'V13', 'V14', 'V15', 'V16'
  ];

  const VARIABLES_SPRINT_2A = [
    'V17', 'V18', 'V19', 'V20',
    'V21', 'V22', 'V23', 'V24'
  ];

  const VARIABLES_SPRINT_2B = [
    'V25', 'V26', 'V27', 'V28'
  ];

  const VARIABLES_SPRINT_2C = ['V29'];

  const VARIABLES_SPRINT_2D = [
    'V30', 'V31', 'V32', 'V33'
  ];

  const VARIABLES_SPRINT_2E = [
    'V34', 'V35'
  ];

  const VARIABLES_SPRINT_3A = [
    'V36', 'V37', 'V38', 'V39', 'V40'
  ];

  const VARIABLES_SPRINT_3B = [
    'V41', 'V42', 'V43', 'V44'
  ];

  const VARIABLES_SPRINT_3C = [
    'V45', 'V46', 'V46_1', 'V46_2', 'V46_3', 'V46_4', 'V46_5', 'V46_6', 'V46_7', 'V46_8', 'V47'
  ];

  const VARIABLES_SPRINT_3D = [
    'V48', 'V49', 'V50', 'V51', 'V52'
  ];

  // Sprint 3E · Módulo 11 inicia con V53 y avanza progresivamente por subvariables ATC.
  // V53.8-V53.9 quedan para pasos posteriores y no se exigen todavía.
  const VARIABLES_SPRINT_3E = [
    'V53', 'V53_1', 'V53_2', 'V53_3', 'V53_4', 'V53_5', 'V53_6', 'V53_7', 'V53_8', 'V53_9'
  ];

  // Sprint 3F · Módulo 12 inicia con V54 y continúa con V55 y V56.
  const VARIABLES_SPRINT_3F = [
    'V54', 'V55', 'V56'
  ];

  // Sprint 3G · Módulo 13 inicia con V57 y continúa con V58, V59 y V60.
  const VARIABLES_SPRINT_3G = [
    'V57', 'V58', 'V59', 'V60'
  ];

  const VARIABLES_HASTA_2A = [
    ...VARIABLES_SPRINT_1,
    ...VARIABLES_SPRINT_2A
  ];

  const VARIABLES_HASTA_2B = [
    ...VARIABLES_HASTA_2A,
    ...VARIABLES_SPRINT_2B
  ];

  const VARIABLES_HASTA_2C = [
    ...VARIABLES_HASTA_2B,
    ...VARIABLES_SPRINT_2C
  ];

  const VARIABLES_HASTA_2D = [
    ...VARIABLES_HASTA_2C,
    ...VARIABLES_SPRINT_2D
  ];

  const VARIABLES_HASTA_2E = [
    ...VARIABLES_HASTA_2D,
    ...VARIABLES_SPRINT_2E
  ];

  const VARIABLES_HASTA_3A = [
    ...VARIABLES_HASTA_2E,
    ...VARIABLES_SPRINT_3A
  ];

  const VARIABLES_HASTA_3B_V41 = [
    ...VARIABLES_HASTA_3A,
    'V41'
  ];

  const VARIABLES_HASTA_3B_V42 = [
    ...VARIABLES_HASTA_3B_V41,
    'V42'
  ];

  const VARIABLES_HASTA_3B_V43 = [
    ...VARIABLES_HASTA_3B_V42,
    'V43'
  ];

  const VARIABLES_HASTA_3B_V44 = [
    ...VARIABLES_HASTA_3B_V43,
    'V44'
  ];

  // Alias de compatibilidad para el bloque completo V41-V44.
  const VARIABLES_HASTA_3B = VARIABLES_HASTA_3B_V44;

  const VARIABLES_HASTA_3C_V45 = [
    ...VARIABLES_HASTA_3B_V44,
    'V45'
  ];

  const VARIABLES_HASTA_3C_V46 = [
    ...VARIABLES_HASTA_3C_V45,
    'V46'
  ];

  const VARIABLES_HASTA_3C_V46_1 = [
    ...VARIABLES_HASTA_3C_V46,
    'V46_1'
  ];

  const VARIABLES_HASTA_3C_V46_2 = [
    ...VARIABLES_HASTA_3C_V46_1,
    'V46_2'
  ];

  const VARIABLES_HASTA_3C_V46_3 = [
    ...VARIABLES_HASTA_3C_V46_2,
    'V46_3'
  ];

  const VARIABLES_HASTA_3C_V46_4 = [
    ...VARIABLES_HASTA_3C_V46_3,
    'V46_4'
  ];

  const VARIABLES_HASTA_3C_V46_5 = [
    ...VARIABLES_HASTA_3C_V46_4,
    'V46_5'
  ];

  const VARIABLES_HASTA_3C_V46_6 = [
    ...VARIABLES_HASTA_3C_V46_5,
    'V46_6'
  ];

  const VARIABLES_HASTA_3C_V46_7 = [
    ...VARIABLES_HASTA_3C_V46_6,
    'V46_7'
  ];

  const VARIABLES_HASTA_3C_V46_8 = [
    ...VARIABLES_HASTA_3C_V46_7,
    'V46_8'
  ];

  const VARIABLES_HASTA_3C_V47 = [
    ...VARIABLES_HASTA_3C_V46_8,
    'V47'
  ];

  // Alias de compatibilidad para el bloque cerrado V45-V47.
  const VARIABLES_HASTA_3C = VARIABLES_HASTA_3C_V47;

  const VARIABLES_HASTA_3D_V48 = [
    ...VARIABLES_HASTA_3C_V47,
    'V48'
  ];

  const VARIABLES_HASTA_3D_V49 = [
    ...VARIABLES_HASTA_3D_V48,
    'V49'
  ];

  const VARIABLES_HASTA_3D_V50 = [
    ...VARIABLES_HASTA_3D_V49,
    'V50'
  ];

  const VARIABLES_HASTA_3D_V51 = [
    ...VARIABLES_HASTA_3D_V50,
    'V51'
  ];

  const VARIABLES_HASTA_3D_V52 = [
    ...VARIABLES_HASTA_3D_V51,
    'V52'
  ];

  // Alias de compatibilidad para el bloque actual iniciado en V48.
  const VARIABLES_HASTA_3D = VARIABLES_HASTA_3D_V52;

  const VARIABLES_HASTA_3E_V53 = [
    ...VARIABLES_HASTA_3D_V52,
    'V53'
  ];

  const VARIABLES_HASTA_3E_V53_1 = [
    ...VARIABLES_HASTA_3E_V53,
    'V53_1'
  ];

  const VARIABLES_HASTA_3E_V53_2 = [
    ...VARIABLES_HASTA_3E_V53_1,
    'V53_2'
  ];

  const VARIABLES_HASTA_3E_V53_3 = [
    ...VARIABLES_HASTA_3E_V53_2,
    'V53_3'
  ];

  const VARIABLES_HASTA_3E_V53_4 = [
    ...VARIABLES_HASTA_3E_V53_3,
    'V53_4'
  ];

  const VARIABLES_HASTA_3E_V53_5 = [
    ...VARIABLES_HASTA_3E_V53_4,
    'V53_5'
  ];

  const VARIABLES_HASTA_3E_V53_6 = [
    ...VARIABLES_HASTA_3E_V53_5,
    'V53_6'
  ];

  const VARIABLES_HASTA_3E_V53_7 = [
    ...VARIABLES_HASTA_3E_V53_6,
    'V53_7'
  ];

  const VARIABLES_HASTA_3E_V53_8 = [
    ...VARIABLES_HASTA_3E_V53_7,
    'V53_8'
  ];

  const VARIABLES_HASTA_3E_V53_9 = [
    ...VARIABLES_HASTA_3E_V53_8,
    'V53_9'
  ];

  // Alias de compatibilidad para el bloque cerrado V53-V53.9.
  const VARIABLES_HASTA_3E = VARIABLES_HASTA_3E_V53_9;

  const VARIABLES_HASTA_3F_V54 = [
    ...VARIABLES_HASTA_3E_V53_9,
    'V54'
  ];

  const VARIABLES_HASTA_3F_V55 = [
    ...VARIABLES_HASTA_3F_V54,
    'V55'
  ];

  const VARIABLES_HASTA_3F_V56 = [
    ...VARIABLES_HASTA_3F_V55,
    'V56'
  ];

  // Alias de compatibilidad para el bloque iniciado en V54 y ampliado hasta V56.
  const VARIABLES_HASTA_3F = VARIABLES_HASTA_3F_V56;

  const VARIABLES_HASTA_3G_V57 = [
    ...VARIABLES_HASTA_3F_V56,
    'V57'
  ];

  const VARIABLES_HASTA_3G_V58 = [
    ...VARIABLES_HASTA_3G_V57,
    'V58'
  ];

  const VARIABLES_HASTA_3G_V59 = [
    ...VARIABLES_HASTA_3G_V58,
    'V59'
  ];

  const VARIABLES_HASTA_3G_V60 = [
    ...VARIABLES_HASTA_3G_V59,
    'V60'
  ];

  // Alias de compatibilidad para el bloque iniciado en V57 y ampliado hasta V60.
  const VARIABLES_HASTA_3G = VARIABLES_HASTA_3G_V60;

  const VARIABLES_ESPERADAS = VARIABLES_HASTA_3G_V60;

  const MAPA_ENCABEZADOS = {
    v1: 'V1', primernombre: 'V1', v1primernombre: 'V1',
    v2: 'V2', segundonombre: 'V2', v2segundonombre: 'V2',
    v3: 'V3', primerapellido: 'V3', v3primerapellido: 'V3',
    v4: 'V4', segundoapellido: 'V4', v4segundoapellido: 'V4',
    v5: 'V5', tipoidentificacion: 'V5', tipodeidentificacion: 'V5', v5tipoidentificacion: 'V5', v5tipodeidentificacion: 'V5',
    v6: 'V6', numeroidentificacion: 'V6', numerodeidentificacion: 'V6', v6numeroidentificacion: 'V6', v6numerodeidentificacion: 'V6',
    v7: 'V7', fechanacimiento: 'V7', fechadenacimiento: 'V7', v7fechanacimiento: 'V7', v7fechadenacimiento: 'V7',
    v8: 'V8', sexo: 'V8', v8sexo: 'V8',
    v9: 'V9', ocupacion: 'V9', v9ocupacion: 'V9', v9ocupacin: 'V9',
    v10: 'V10', regimenafiliacion: 'V10', regimendeafiliacion: 'V10', v10regimenafiliacion: 'V10', v10regimendeafiliacion: 'V10',
    v11: 'V11', eps: 'V11', eapb: 'V11', codigoeapb: 'V11', v11eps: 'V11', v11eapb: 'V11', v11codigoeapb: 'V11',
    v12: 'V12', pertenenciaetnica: 'V12', codigopertenenciaetnica: 'V12', v12pertenenciaetnica: 'V12',
    v13: 'V13', grupopoblacional: 'V13', v13grupopoblacional: 'V13',
    v14: 'V14', municipioresidencia: 'V14', municipioderesidencia: 'V14', v14municipioresidencia: 'V14',
    v15: 'V15', telefono: 'V15', numerotelefonico: 'V15', v15telefono: 'V15', v15numerotelefonico: 'V15',
    v16: 'V16', fechadeafiliacion: 'V16', v16fechadeafiliacion: 'V16',
    v17: 'V17', cie10: 'V17', codigocie10: 'V17', v17cie10: 'V17', v17codigocie10: 'V17', codigocie10delaneoplasiamalignareportada: 'V17',
    v18: 'V18', fechadiagnostico: 'V18', fechadediagnostico: 'V18', fechadediagnosticodelcancerreportado: 'V18', v18fechadediagnosticodelcancerreportado: 'V18',
    v19: 'V19', fechanotaremision: 'V19', fechanotaremisionointerconsulta: 'V19', v19fechanotaremisionointerconsulta: 'V19',
    v20: 'V20', fechaingreso: 'V20', fechaingresoinstituciondiagnostica: 'V20', v20fechaingresoinstituciondiagnostica: 'V20',
    v21: 'V21', tipoestudio: 'V21', tipodeestudio: 'V21', v21tipoestudio: 'V21',
    v22: 'V22', motivosinhistopatologia: 'V22', v22motivosinhistopatologia: 'V22',
    v23: 'V23', fecharecoleccionmuestra: 'V23', fecharecoleccionmuestrahistopatologica: 'V23', v23fecharecoleccionmuestrahistopatologica: 'V23',
    v24: 'V24', fechainformehistopatologico: 'V24', v24fechainformehistopatologico: 'V24',
    v25: 'V25', ips: 'V25', codigoips: 'V25', codigohabilitacionips: 'V25', v25codigoips: 'V25',
    v26: 'V26', fechaprimeraconsulta: 'V26', fechadeprimeraconsulta: 'V26', v26fechaprimeraconsulta: 'V26',
    v27: 'V27', histologia: 'V27', histologiatumor: 'V27', histologiadeltumor: 'V27', v27histologia: 'V27',
    v28: 'V28', grado: 'V28', gradodiferenciacion: 'V28', gradodediferenciacion: 'V28', v28grado: 'V28',
    v29: 'V29', estadificacion: 'V29', primeraestadificacion: 'V29', estadificaciontnm: 'V29', estadificacionfigo: 'V29', v29estadificacion: 'V29',
    v30: 'V30', fechaestadificacion: 'V30', fechadeestadificacion: 'V30', v30fechaestadificacion: 'V30',
    v31: 'V31', her2: 'V31', pruebaher2: 'V31', v31her2: 'V31',
    v32: 'V32', fechaher2: 'V32', fechapruebaher2: 'V32', v32fechaher2: 'V32',
    v33: 'V33', resultadoher2: 'V33', resultadopruebaher2: 'V33', v33resultadoher2: 'V33',
    v34: 'V34', dukes: 'V34', estadificaciondukes: 'V34', estadificaciondedukes: 'V34', v34dukes: 'V34',
    v35: 'V35', fechadukes: 'V35', fechaestadificaciondukes: 'V35', v35fechadukes: 'V35',
    v36: 'V36', annarbor: 'V36', lugano: 'V36', estadificacionclinica: 'V36', estadificacionclinicaannarborlugano: 'V36', v36annarbor: 'V36', v36lugano: 'V36',
    v37: 'V37', gleason: 'V37', clasificaciongleason: 'V37', v37gleason: 'V37',
    v38: 'V38', riesgo: 'V38', clasificacionriesgo: 'V38', clasificaciondelriesgo: 'V38', v38riesgo: 'V38',
    v39: 'V39', fechariesgo: 'V39', fechaclasificacionriesgo: 'V39', fechadeclasificacionderiesgo: 'V39', v39fechariesgo: 'V39',
    v40: 'V40', objetivo: 'V40', objetivotratamiento: 'V40', objetivodeltratamiento: 'V40', objetivointenciontratamiento: 'V40', objetivointenciondeltratamientomedicoinicial: 'V40', v40objetivo: 'V40',
    v41: 'V41', intervencion: 'V41', intervencionmedica: 'V41', intervencionduranteperiodo: 'V41', intervencionduranteelperiododereporte: 'V41', intervencionmedicaduranteperiododereporte: 'V41', intervencionmedicaduranteelperiododereporte: 'V41', v41intervencion: 'V41', v41intervencionmedica: 'V41', v41intervencionmedicaduranteelperiododereporte: 'V41',
    v42: 'V42', antecedente: 'V42', otrocancerprimario: 'V42', antecedenteotrocancerprimario: 'V42', antecedentedeotrocancerprimario: 'V42', tienecancerprimario: 'V42', tieneantecedenteotrocancerprimario: 'V42', tieneantecedenteopadeceotrocancerprimario: 'V42', v42antecedente: 'V42', v42otrocancerprimario: 'V42', v42antecedentedeotrocancerprimario: 'V42', v42tieneantecedenteopadeceotrocancerprimario: 'V42',
    v43: 'V43', fechaotrocancerprimario: 'V43', fechadiagnosticootrocancerprimario: 'V43', fechadediagnosticodelotrocancerprimario: 'V43', fechadedianosticodelotrocancerprimario: 'V43', fechadelotrocancerprimario: 'V43', v43fecha: 'V43', v43fechaotrocancerprimario: 'V43', v43fechadiagnosticootrocancerprimario: 'V43', v43fechadediagnosticodelotrocancerprimario: 'V43',
    v44: 'V44', cie10otrocancerprimario: 'V44', tipootrocancerprimario: 'V44', tipocie10otrocancerprimario: 'V44', cancerantecedente: 'V44', cancerconcurrente: 'V44', cie10cancerantecedente: 'V44', cie10cancerconcurrente: 'V44', tipocie10delcancerantecedenteoconcurrente: 'V44', v44tipo: 'V44', v44cie10: 'V44', v44tipocie10: 'V44', v44tipocie10delcancerantecedenteoconcurrente: 'V44',
    v45: 'V45', quimioterapia: 'V45', terapiasistemica: 'V45', terapia: 'V45', quimioterapiaterapiasistemica: 'V45', recibioquimioterapia: 'V45', recibiousuarioquimioterapia: 'V45', recibioelusuarioquimioterapia: 'V45', recibioquimioterapiauotraterapiasistemica: 'V45', recibioelusuarioquimioterapiauotraterapiasistemica: 'V45', recibiousuarioquimioterapiauotraterapiasistemica: 'V45', v45quimioterapia: 'V45', v45terapiasistemica: 'V45', v45recibioquimioterapia: 'V45', v45recibioquimioterapiauotraterapiasistemica: 'V45',
    v46: 'V46', fasesquimioterapia: 'V46', numerofasesquimioterapia: 'V46', numerodefasesquimioterapia: 'V46', fasesdequimioterapia: 'V46', cuantafasesquimioterapia: 'V46', cuantasfasesquimioterapia: 'V46', cuantafasesdequimioterapia: 'V46', cuantasfasesdequimioterapia: 'V46', recibiofasesquimioterapia: 'V46', v46fasesquimioterapia: 'V46', v46numerofasesquimioterapia: 'V46', v46numerodefasesquimioterapia: 'V46', v46cuantasfasesquimioterapia: 'V46',
    v461: 'V46_1', v461recibilafasedequimioterapiap: 'V46_1', v461prefase: 'V46_1', v461citorreduccion: 'V46_1', v461prefaseocitorreduccioninicial: 'V46_1',
    v462: 'V46_2', v462recibilafasedequimioterapiai: 'V46_2', v462induccion: 'V46_2', v462fasedeinduccion: 'V46_2',
    v463: 'V46_3', v463recibilafasedequimioterapiai: 'V46_3', v463intensificacion: 'V46_3', v463fasedeintensificacion: 'V46_3',
    v464: 'V46_4', v464recibilafasedequimioterapiac: 'V46_4', v464consolidacion: 'V46_4', v464fasedeconsolidacion: 'V46_4',
    v465: 'V46_5', v465recibilafasedequimioterapiar: 'V46_5', v465reinduccion: 'V46_5', v465fasedereinduccion: 'V46_5',
    v466: 'V46_6', v466recibilafasedequimioterapiam: 'V46_6', v466mantenimiento: 'V46_6', v466fasedemantenimiento: 'V46_6',
    v467: 'V46_7', v467recibilafasedequimioterapiam: 'V46_7', v467mantenimientolargoofinal: 'V46_7', v467fasedemantenimientolargoofinal: 'V46_7',
    v468: 'V46_8', v468recibilafasedequimioterapiao: 'V46_8', v468otrafase: 'V46_8', v468otrafasediferente: 'V46_8', v468otrafasediferentealasanteriores: 'V46_8',
    v47: 'V47', ciclos: 'V47', numerociclos: 'V47', numerodeciclos: 'V47', ciclosiniciados: 'V47', ciclosadministrados: 'V47', numerodeciclosiniciadosyadministrados: 'V47', v47numerodeciclos: 'V47', v47numerodeciclosiniciadosyadministrados: 'V47', v47numerodeciclosiniciadosyadministradosenelperiododereporte: 'V47',
    v48: 'V48', ubicaciontemporal: 'V48', ubicaciontemporalesquema: 'V48', ubicaciontemporaldelesquema: 'V48', primerounicoesquema: 'V48', esquematerapiasistemica: 'V48', ubicaciontemporaldelprimerounicoesquema: 'V48', v48ubicaciontemporal: 'V48', v48ubicaciontemporaldelprimerounicoesquema: 'V48', v48ubicaciontemporaldelprimerounicoesquemadequimioterapiaoterapiasistemicaenelperiodo: 'V48',
    v49: 'V49', fechainicioesquema: 'V49', fechadeinicioesquema: 'V49', fechadeiniciodelesquema: 'V49', fechadeiniciodelprimerounicoesquema: 'V49', fechainicioterapia: 'V49', fechainicioterapiasistemica: 'V49', fechadeiniciodelprimerounicoesquemadequimioterapia: 'V49', v49fechainicio: 'V49', v49fechainicioesquema: 'V49', v49fechadeinicioesquema: 'V49', v49fechadeiniciodelprimerounicoesquema: 'V49', v49fechadeiniciodelprimerciclode: 'V49', v49fechadeiniciodelprimerounicoesquemadequimioterapiaoterapiasistemicaquerecibioenesteperiodo: 'V49',
    v50: 'V50', v50nmerodeipsquesuministranelpri: 'V50', v50numerodeipsquesuministranelpri: 'V50', v50numerodeipsquesuministranelprimerounicoesquema: 'V50', v50numerodeipsquesuministranelprimeresquema: 'V50',
    v51: 'V51', v51cdigodelaips1quesuministraelp: 'V51', v51codigodelaips1quesuministraelp: 'V51', v51codigodelaips1quesuministraelprimerounicoesquema: 'V51',
    v52: 'V52', v52cdigodelaips2quesuministraelp: 'V52', v52codigodelaips2quesuministraelp: 'V52', v52codigodelaips2quesuministraelprimerounicoesquema: 'V52',
    v53: 'V53', v53cantidadmedictosantineoplasic: 'V53', v53cantidadmedicamentosantineoplasicos: 'V53', v53cantidadmedicamentosantineoplasicospropuestos: 'V53', v53numerodemedicamentosantineoplasicos: 'V53',
    v531: 'V53_1', v531medicamentoadm1: 'V53_1', v531medicamentoantineoplasico: 'V53_1', v531medicamentoantineoplasicoadministrado: 'V53_1', v531primermedicamentoadministrado: 'V53_1',
    v532: 'V53_2', v532medicamentoadm2: 'V53_2', v532medicamentoantineoplasico: 'V53_2', v532medicamentoantineoplasicoadministrado: 'V53_2', v532segundomedicamentoadministrado: 'V53_2',
    v533: 'V53_3', v533medicamentoadm3: 'V53_3', v533medicamentoantineoplasico: 'V53_3', v533medicamentoantineoplasicoadministrado: 'V53_3', v533tercermedicamentoadministrado: 'V53_3',
    v534: 'V53_4', v534medicamentoadm4: 'V53_4', v534medicamentoantineoplasico: 'V53_4', v534medicamentoantineoplasicoadministrado: 'V53_4', v534cuartomedicamentoadministrado: 'V53_4',
    v535: 'V53_5', v535medicamentoadm5: 'V53_5', v535medicamentoantineoplasico: 'V53_5', v535medicamentoantineoplasicoadministrado: 'V53_5', v535quintomedicamentoadministrado: 'V53_5',
    v536: 'V53_6', v536medicamentoadm6: 'V53_6', v536medicamentoantineoplasico: 'V53_6', v536medicamentoantineoplasicoadministrado: 'V53_6', v536sextomedicamentoadministrado: 'V53_6',
    v537: 'V53_7', v537medicamentoadm7: 'V53_7', v537medicamentoantineoplasico: 'V53_7', v537medicamentoantineoplasicoadministrado: 'V53_7', v537septimomedicamentoadministrado: 'V53_7',
    v538: 'V53_8', v538medicamentoadm8: 'V53_8', v538medicamentoantineoplasico: 'V53_8', v538medicamentoantineoplasicoadministrado: 'V53_8', v538octavomedicamentoadministrado: 'V53_8',
    v539: 'V53_9', v539medicamentoadm9: 'V53_9', v539medicamentoantineoplasico: 'V53_9', v539medicamentoantineoplasicoadministrado: 'V53_9', v539novenomedicamentoadministrado: 'V53_9',
    v54: 'V54', v54medicamentoantineoplasico: 'V54', v54medicamentoantineoplasicoadicional: 'V54', v54medicamentoantineoplasicoadicional1: 'V54', v54medicamentoadicional: 'V54', v54medicamentoadicional1: 'V54', v54terapiahormonal: 'V54', v54medicamentoantineoplasicooterapiahormonal: 'V54',
    v55: 'V55', v55medicamentoantineoplasico: 'V55', v55medicamentoantineoplasicoadicional: 'V55', v55medicamentoantineoplasicoadicional2: 'V55', v55medicamentoadicional: 'V55', v55medicamentoadicional2: 'V55', v55terapiahormonal: 'V55', v55medicamentoantineoplasicooterapiahormonal: 'V55',
    v56: 'V56', v56medicamentoantineoplasico: 'V56', v56medicamentoantineoplasicoadicional: 'V56', v56medicamentoantineoplasicoadicional3: 'V56', v56medicamentoadicional: 'V56', v56medicamentoadicional3: 'V56', v56terapiahormonal: 'V56', v56medicamentoantineoplasicooterapiahormonal: 'V56',
    v57: 'V57', quimioterapiaintratecal: 'V57', intratecal: 'V57', v57quimioterapiaintratecal: 'V57', v57recibioquimioterapiaintratecal: 'V57', v57recibioquimioterapiaintratecalenelprimerounicoesquema: 'V57',
    v58: 'V58', fechafinalizacionesquema: 'V58', fechadefinalizacionesquema: 'V58', fechafinalizacionprimerounicoesquema: 'V58', fechadefinalizaciondelprimerounicoesquema: 'V58', v58fechafinalizacion: 'V58', v58fechadefinalizacion: 'V58', v58fechadefinalizaciondelprimerounicoesquema: 'V58', v58fechadefinalizaciondelprimerounicoesquemadeesteperiododereporte: 'V58',
    v59: 'V59', caracteristicasactualesprimerounicoesquema: 'V59', caracteristicasactualesdelprimerounicoesquema: 'V59', caracteristicasesquema: 'V59', v59caracteristicas: 'V59', v59caracteristicasactuales: 'V59', v59caracteristicasactualesdelprimerounicoesquema: 'V59', v59caracteristicasactualesdelprimerounicoesquemadeesteperiododereporte: 'V59',
    v60: 'V60', motivofinalizacion: 'V60', motivodelafinalizacion: 'V60', motivofinalizacionprematura: 'V60', motivodelafinalizacionprematura: 'V60', v60motivo: 'V60', v60motivofinalizacion: 'V60', v60motivodelafinalizacion: 'V60', v60motivodelafinalizacionprematura: 'V60'
  };

  const MAPA_ENCABEZADOS_SPRINT_1 = MAPA_ENCABEZADOS;

  function limpiarEncabezado(valor) {
    return String(valor ?? '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/g, '');
  }

  function contieneTodos(limpio, palabras) {
    return palabras.every((palabra) => limpio.includes(palabra));
  }

  function esEncabezadoV29(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v29' || limpio === '29') return true;
    return contieneTodos(limpio, ['tumor', 'solido', 'primera', 'estadificacion']);
  }

  function esEncabezadoV30(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v30' || limpio === '30') return true;
    return limpio.includes('fecha') && limpio.includes('estadificacion');
  }

  function esEncabezadoV31(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v31' || limpio === '31') return true;
    return limpio.includes('her2') && limpio.includes('tratamiento');
  }

  function esEncabezadoV32(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v32' || limpio === '32') return true;
    return limpio.includes('fecha') && limpio.includes('her2');
  }

  function esEncabezadoV33(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v33' || limpio === '33') return true;
    return limpio.includes('resultado') && limpio.includes('her2');
  }

  function esEncabezadoV34(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v34' || limpio === '34') return true;
    return limpio.includes('colorrectal') && limpio.includes('dukes');
  }

  function esEncabezadoV35(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v35' || limpio === '35') return true;
    return limpio.includes('fecha') && limpio.includes('dukes');
  }

  function esEncabezadoV36(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v36' || limpio === '36') return true;
    return (limpio.includes('annarbor') || limpio.includes('lugano')) && (limpio.includes('linfoma') || limpio.includes('mieloma') || limpio.includes('estadificacion'));
  }

  function esEncabezadoV37(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v37' || limpio === '37') return true;
    return limpio.includes('gleason') && (limpio.includes('prostata') || limpio.includes('clasificacion') || limpio.includes('escala'));
  }

  function esEncabezadoV38(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v38' || limpio === '38') return true;
    return limpio.includes('clasificacion') && limpio.includes('riesgo');
  }

  function esEncabezadoV39(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v39' || limpio === '39') return true;
    return limpio.includes('fecha') && limpio.includes('clasificacion') && limpio.includes('riesgo');
  }

  function esEncabezadoV40(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v40' || limpio === '40') return true;
    return (limpio.includes('objetivo') || limpio.includes('intencion')) && limpio.includes('tratamiento');
  }

  function esEncabezadoV41(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v41' || limpio === '41') return true;
    return limpio.includes('intervencion') && (limpio.includes('medica') || limpio.includes('periodo') || limpio.includes('reporte'));
  }

  function esEncabezadoV42(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v42' || limpio === '42') return true;
    return (limpio.includes('antecedente') || limpio.includes('padece') || limpio.includes('tuvo')) && limpio.includes('cancer') && limpio.includes('primario');
  }

  function esEncabezadoV43(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v43' || limpio === '43') return true;
    return limpio.includes('fecha') && limpio.includes('diagnostico') && limpio.includes('otro') && limpio.includes('cancer') && limpio.includes('primario');
  }

  function esEncabezadoV44(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v44' || limpio === '44') return true;
    return (limpio.includes('cie10') || limpio.includes('tipo') || limpio.includes('codigo')) &&
      (limpio.includes('antecedente') || limpio.includes('concurrente') || (limpio.includes('otro') && limpio.includes('cancer')));
  }

  function esEncabezadoV45(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v45' || limpio === '45') return true;

    return (limpio.includes('quimioterapia') || limpio.includes('terapiasistemica')) &&
      (limpio.includes('recibio') || limpio.includes('usuario') || limpio.includes('periodo') || limpio.includes('reporte'));
  }


  function esEncabezadoV46(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v46' || limpio === '46') return true;

    return limpio.includes('fases') && limpio.includes('quimioterapia');
  }

  function esEncabezadoV46_1(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v461' || limpio === '461' || limpio === 'v46_1') return true;

    // Encabezado real del cliente para V46.1:
    // v461recibilafasedequimioterapiap
    return limpio.startsWith('v461') &&
      limpio.includes('recibi') &&
      limpio.includes('fase') &&
      limpio.includes('quimioterapia');
  }

  function esEncabezadoV46_2(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v462' || limpio === '462' || limpio === 'v46_2') return true;

    // Encabezado real del cliente para V46.2:
    // v462recibilafasedequimioterapiai
    return limpio.startsWith('v462') &&
      limpio.includes('recibi') &&
      limpio.includes('fase') &&
      limpio.includes('quimioterapia');
  }

  function esEncabezadoV46_3(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v463' || limpio === '463' || limpio === 'v46_3') return true;

    // Encabezado real del cliente para V46.3:
    // v463recibilafasedequimioterapiai
    return limpio.startsWith('v463') &&
      limpio.includes('recibi') &&
      limpio.includes('fase') &&
      limpio.includes('quimioterapia');
  }

  function esEncabezadoV46_4(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v464' || limpio === '464' || limpio === 'v46_4') return true;

    // Encabezado real del cliente para V46.4:
    // v464recibilafasedequimioterapiac
    return limpio.startsWith('v464') &&
      limpio.includes('recibi') &&
      limpio.includes('fase') &&
      limpio.includes('quimioterapia');
  }

  function esEncabezadoV46_5(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v465' || limpio === '465' || limpio === 'v46_5') return true;

    // Encabezado real del cliente para V46.5:
    // v465recibilafasedequimioterapiar
    return limpio.startsWith('v465') &&
      limpio.includes('recibi') &&
      limpio.includes('fase') &&
      limpio.includes('quimioterapia');
  }

  function esEncabezadoV46_6(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v466' || limpio === '466' || limpio === 'v46_6') return true;

    // Encabezado real del cliente para V46.6:
    // v466recibilafasedequimioterapiam
    return limpio.startsWith('v466') &&
      limpio.includes('recibi') &&
      limpio.includes('fase') &&
      limpio.includes('quimioterapia');
  }

  function esEncabezadoV46_7(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v467' || limpio === '467' || limpio === 'v46_7') return true;

    // Encabezado real del cliente para V46.7:
    // v467recibilafasedequimioterapiam
    return limpio.startsWith('v467') &&
      limpio.includes('recibi') &&
      limpio.includes('fase') &&
      limpio.includes('quimioterapia');
  }

  function esEncabezadoV46_8(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v468' || limpio === '468' || limpio === 'v46_8') return true;

    // Encabezado real del cliente para V46.8:
    // v468recibilafasedequimioterapiao
    return limpio.startsWith('v468') &&
      limpio.includes('recibi') &&
      limpio.includes('fase') &&
      limpio.includes('quimioterapia');
  }

  function esEncabezadoV47(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v47' || limpio === '47') return true;

    return limpio.startsWith('v47') &&
      limpio.includes('ciclos') &&
      (limpio.includes('iniciados') || limpio.includes('administrados') || limpio.includes('periodo'));
  }

  function esEncabezadoV48(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v48' || limpio === '48') return true;

    return limpio.startsWith('v48') &&
      limpio.includes('ubicacion') &&
      limpio.includes('temporal') &&
      (limpio.includes('esquema') || limpio.includes('quimioterapia') || limpio.includes('terapiasistemica') || limpio.includes('periodo'));
  }


  function esEncabezadoV49(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v49' || limpio === '49') return true;

    return limpio.startsWith('v49') &&
      limpio.includes('fecha') &&
      limpio.includes('inicio') &&
      (limpio.includes('ciclo') || limpio.includes('esquema') || limpio.includes('quimioterapia') || limpio.includes('terapiasistemica') || limpio.includes('periodo'));
  }

  function esEncabezadoV52(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v52' || limpio === '52') return true;

    return limpio.startsWith('v52') &&
      (limpio.includes('codigo') || limpio.includes('cdigo')) &&
      limpio.includes('ips2') &&
      (limpio.includes('suministra') || limpio.includes('primer') || limpio.includes('esquema'));
  }

  function esEncabezadoV51(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v51' || limpio === '51') return true;

    return limpio.startsWith('v51') &&
      (limpio.includes('codigo') || limpio.includes('cdigo')) &&
      limpio.includes('ips1') &&
      (limpio.includes('suministra') || limpio.includes('primer') || limpio.includes('esquema'));
  }

  function esEncabezadoV50(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v50' || limpio === '50') return true;

    return limpio.startsWith('v50') &&
      (limpio.includes('numero') || limpio.includes('nmero') || limpio.includes('ips')) &&
      limpio.includes('ips') &&
      (limpio.includes('suministran') || limpio.includes('suministra') || limpio.includes('primer') || limpio.includes('esquema'));
  }



  function esEncabezadoV53_3(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v533' || limpio === '533' || limpio === 'v53_3') return true;

    // Encabezado real observado en la matriz original:
    // v533medicamentoadm3
    return limpio.startsWith('v533') &&
      limpio.includes('medicamento') &&
      (limpio.includes('adm3') || limpio.includes('administrado') || limpio.includes('antineoplasico'));
  }

  function esEncabezadoV53_4(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v534' || limpio === '534' || limpio === 'v53_4') return true;

    // Encabezado real observado en la matriz original:
    // v534medicamentoadm4
    return limpio.startsWith('v534') &&
      limpio.includes('medicamento') &&
      (limpio.includes('adm4') || limpio.includes('administrado') || limpio.includes('antineoplasico'));
  }

  function esEncabezadoV53_5(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v535' || limpio === '535' || limpio === 'v53_5') return true;

    // Encabezado real esperado en la matriz original:
    // v535medicamentoadm5
    return limpio.startsWith('v535') &&
      limpio.includes('medicamento') &&
      (limpio.includes('adm5') || limpio.includes('administrado') || limpio.includes('antineoplasico'));
  }

  function esEncabezadoV53_6(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v536' || limpio === '536' || limpio === 'v53_6') return true;

    // Encabezado real esperado en la matriz original:
    // v536medicamentoadm6
    return limpio.startsWith('v536') &&
      limpio.includes('medicamento') &&
      (limpio.includes('adm6') || limpio.includes('administrado') || limpio.includes('antineoplasico'));
  }

  function esEncabezadoV53_7(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v537' || limpio === '537' || limpio === 'v53_7') return true;

    // Encabezado real esperado en la matriz original:
    // v537medicamentoadm7
    return limpio.startsWith('v537') &&
      limpio.includes('medicamento') &&
      (limpio.includes('adm7') || limpio.includes('administrado') || limpio.includes('antineoplasico'));
  }

  function esEncabezadoV53_8(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v538' || limpio === '538' || limpio === 'v53_8') return true;

    // Encabezado real esperado en la matriz original:
    // v538medicamentoadm8
    return limpio.startsWith('v538') &&
      limpio.includes('medicamento') &&
      (limpio.includes('adm8') || limpio.includes('administrado') || limpio.includes('antineoplasico'));
  }


  function esEncabezadoV53_9(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v539' || limpio === '539' || limpio === 'v53_9') return true;

    // Encabezado real observado/esperado en la matriz original:
    // v539medicamentoadm9
    return limpio.startsWith('v539') &&
      limpio.includes('medicamento') &&
      (limpio.includes('adm9') || limpio.includes('administrado') || limpio.includes('antineoplasico'));
  }


  function esEncabezadoV54(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v54' || limpio === '54') return true;

    // Encabezado esperado para V54:
    // medicamento antineoplásico o terapia hormonal adicional a V53.1-V53.9.
    return limpio.startsWith('v54') &&
      limpio.includes('medicamento') &&
      (limpio.includes('antineoplasico') || limpio.includes('antineoplasic') || limpio.includes('terapiahormonal') || limpio.includes('adicional'));
  }

  function esEncabezadoV55(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v55' || limpio === '55') return true;

    // Encabezado esperado para V55:
    // medicamento antineoplásico o terapia hormonal adicional 2 a V53.1-V53.9.
    return limpio.startsWith('v55') &&
      limpio.includes('medicamento') &&
      (limpio.includes('antineoplasico') || limpio.includes('antineoplasic') || limpio.includes('terapiahormonal') || limpio.includes('adicional'));
  }

  function esEncabezadoV56(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v56' || limpio === '56') return true;

    // Encabezado esperado para V56:
    // medicamento antineoplásico o terapia hormonal adicional 3 a V53.1-V53.9.
    return limpio.startsWith('v56') &&
      limpio.includes('medicamento') &&
      (limpio.includes('antineoplasico') || limpio.includes('antineoplasic') || limpio.includes('terapiahormonal') || limpio.includes('adicional'));
  }

  function esEncabezadoV57(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v57' || limpio === '57') return true;

    // Encabezado esperado para V57:
    // ¿Recibió quimioterapia intratecal en el primer o único esquema?
    return limpio.startsWith('v57') &&
      (limpio.includes('intratecal') || (limpio.includes('quimioterapia') && limpio.includes('primer')));
  }

  function esEncabezadoV58(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v58' || limpio === '58') return true;

    // Encabezado esperado para V58:
    // Fecha de finalización del primer o único esquema del periodo de reporte.
    // Encabezado real observado en bases tipo CAC:
    // v58fechadefinalizacindelprimerci
    return limpio.startsWith('v58') &&
      limpio.includes('fecha') &&
      (
        limpio.includes('finalizacion') ||
        limpio.includes('finalizacin') ||
        limpio.includes('final')
      ) &&
      (
        limpio.includes('primer') ||
        limpio.includes('prim') ||
        limpio.includes('esquema') ||
        limpio.includes('tratamiento')
      );
  }



  function esEncabezadoV60(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v60' || limpio === '60') return true;

    // Encabezado esperado para V60:
    // Motivo de la finalización prematura del primer o único esquema.
    return limpio.startsWith('v60') &&
      limpio.includes('motivo') &&
      (limpio.includes('finalizacion') || limpio.includes('prematura') || limpio.includes('esquema'));
  }

  function esEncabezadoV59(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v59' || limpio === '59') return true;

    // Encabezado esperado para V59:
    // Características actuales del primer o único esquema del periodo de reporte.
    // Encabezado real observado en bases tipo CAC:
    // v59caractersticasactualesdelprim
    return limpio.startsWith('v59') &&
      (
        limpio.includes('caracteristicas') ||
        limpio.includes('caractersticas') ||
        limpio.includes('actuales')
      ) &&
      (
        limpio.includes('primer') ||
        limpio.includes('prim') ||
        limpio.includes('esquema')
      );
  }



  function esEncabezadoV53_2(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v532' || limpio === '532' || limpio === 'v53_2') return true;

    // Encabezado real observado en la matriz original:
    // v532medicamentoadm2
    return limpio.startsWith('v532') &&
      limpio.includes('medicamento') &&
      (limpio.includes('adm2') || limpio.includes('administrado') || limpio.includes('antineoplasico'));
  }

  function esEncabezadoV53_1(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v531' || limpio === '531' || limpio === 'v53_1') return true;

    // Encabezado real observado en la matriz original:
    // v531medicamentoadm1
    return limpio.startsWith('v531') &&
      limpio.includes('medicamento') &&
      (limpio.includes('adm1') || limpio.includes('administrado') || limpio.includes('antineoplasico'));
  }

  function esEncabezadoV53(valor) {
    const limpio = limpiarEncabezado(valor);
    if (limpio === 'v53' || limpio === '53') return true;

    // Encabezado real observado en la matriz original:
    // v53cantidadmedictosantineoplasic
    return limpio.startsWith('v53') &&
      (limpio.includes('cantidad') || limpio.includes('numero') || limpio.includes('nmero')) &&
      (limpio.includes('medicto') || limpio.includes('medicamento') || limpio.includes('medicamentos')) &&
      (limpio.includes('antineoplasic') || limpio.includes('antineoplasico') || limpio.includes('terapiahormonal'));
  }

  function extraerVariableDesdeEncabezado(valor) {
    const limpio = limpiarEncabezado(valor);
    const coincidencia = limpio.match(/^v(\d{1,3})/);

    if (!coincidencia) return null;

    const numero = Number(coincidencia[1]);

    if (!Number.isInteger(numero) || numero < 1) {
      return null;
    }

    const variable = `V${numero}`;

    // La estructura es progresiva: no se limita con un número fijo en esta función.
    // Si una variable existe en VARIABLES_ESPERADAS, puede reconocerse automáticamente.
    // Para subvariables como V46.1 o V53.2 se mantienen las funciones específicas.
    return VARIABLES_ESPERADAS.includes(variable) ? variable : null;
  }

  function normalizarEncabezado(valor) {
    const original = String(valor ?? '').trim().toUpperCase();

    if (VARIABLES_ESPERADAS.includes(original)) return original;

    if (esEncabezadoV29(valor)) return 'V29';
    if (esEncabezadoV30(valor)) return 'V30';
    if (esEncabezadoV31(valor)) return 'V31';
    if (esEncabezadoV32(valor)) return 'V32';
    if (esEncabezadoV33(valor)) return 'V33';
    if (esEncabezadoV34(valor)) return 'V34';
    if (esEncabezadoV35(valor)) return 'V35';
    if (esEncabezadoV36(valor)) return 'V36';
    if (esEncabezadoV37(valor)) return 'V37';
    if (esEncabezadoV38(valor)) return 'V38';
    if (esEncabezadoV39(valor)) return 'V39';
    if (esEncabezadoV40(valor)) return 'V40';
    if (esEncabezadoV41(valor)) return 'V41';
    if (esEncabezadoV42(valor)) return 'V42';
    if (esEncabezadoV43(valor)) return 'V43';
    if (esEncabezadoV44(valor)) return 'V44';
    // V48, V49, V50, V51 y V52 deben evaluarse antes que V45 porque sus encabezados reales
    // pueden compartir términos del bloque de quimioterapia o terapia sistémica.
    // V60 se evalúa antes de V59 para reconocer motivo de finalización prematura.
    if (esEncabezadoV60(valor)) return 'V60';

    // V59 se evalúa antes de V58 para reconocer características actuales del esquema.
    if (esEncabezadoV59(valor)) return 'V59';

    // V58 se evalúa antes de V57 para reconocer fecha de finalización del esquema.
    if (esEncabezadoV58(valor)) return 'V58';

    // V57 se evalúa antes de V56 para reconocer quimioterapia intratecal.
    if (esEncabezadoV57(valor)) return 'V57';
    // V56, V55 y V54 se evalúan antes del bloque V53 para reconocer medicamentos adicionales.
    if (esEncabezadoV56(valor)) return 'V56';
    if (esEncabezadoV55(valor)) return 'V55';
    if (esEncabezadoV54(valor)) return 'V54';
    if (esEncabezadoV53_9(valor)) return 'V53_9';
    if (esEncabezadoV53_8(valor)) return 'V53_8';
    if (esEncabezadoV53_7(valor)) return 'V53_7';
    if (esEncabezadoV53_6(valor)) return 'V53_6';
    if (esEncabezadoV53_5(valor)) return 'V53_5';
    if (esEncabezadoV53_4(valor)) return 'V53_4';
    if (esEncabezadoV53_3(valor)) return 'V53_3';
    if (esEncabezadoV53_2(valor)) return 'V53_2';
    if (esEncabezadoV53_1(valor)) return 'V53_1';
    if (esEncabezadoV53(valor)) return 'V53';
    if (esEncabezadoV52(valor)) return 'V52';
    if (esEncabezadoV51(valor)) return 'V51';
    if (esEncabezadoV50(valor)) return 'V50';
    if (esEncabezadoV49(valor)) return 'V49';
    if (esEncabezadoV48(valor)) return 'V48';
    if (esEncabezadoV45(valor)) return 'V45';
    if (esEncabezadoV47(valor)) return 'V47';
    if (esEncabezadoV46_8(valor)) return 'V46_8';
    if (esEncabezadoV46_7(valor)) return 'V46_7';
    if (esEncabezadoV46_6(valor)) return 'V46_6';
    if (esEncabezadoV46_5(valor)) return 'V46_5';
    if (esEncabezadoV46_4(valor)) return 'V46_4';
    if (esEncabezadoV46_3(valor)) return 'V46_3';
    if (esEncabezadoV46_2(valor)) return 'V46_2';
    if (esEncabezadoV46_1(valor)) return 'V46_1';
    if (esEncabezadoV46(valor)) return 'V46';

    const claveLimpia = limpiarEncabezado(valor);

    if (MAPA_ENCABEZADOS[claveLimpia]) return MAPA_ENCABEZADOS[claveLimpia];

    const variableDetectada = extraerVariableDesdeEncabezado(valor);

    return variableDetectada || original;
  }


  function ajustarVariablesEsperadasPorPlantillaReal(variables, presentes) {
    // Algunas plantillas reales de la CAC saltan de V46.7 a V47 y no traen V46.8.
    // V46.8 sigue activa si la columna viene en el Excel, pero no debe bloquear
    // archivos reales que no la incluyen.
    if (!presentes.includes('V46_8')) {
      return variables.filter((variable) => variable !== 'V46_8');
    }

    return variables;
  }

  function resolverVariablesEsperadasDinamicas(encabezadosNormalizados) {
    const presentes = encabezadosNormalizados.filter((variable) =>
      VARIABLES_ESPERADAS.includes(variable)
    );

    const tiene3A = VARIABLES_SPRINT_3A.some((variable) => presentes.includes(variable));
    const tiene2E = VARIABLES_SPRINT_2E.some((variable) => presentes.includes(variable));
    const tiene2D = VARIABLES_SPRINT_2D.some((variable) => presentes.includes(variable));
    const tiene2C = VARIABLES_SPRINT_2C.some((variable) => presentes.includes(variable));
    const tiene2B = VARIABLES_SPRINT_2B.some((variable) => presentes.includes(variable));
    const tiene2A = VARIABLES_SPRINT_2A.some((variable) => presentes.includes(variable));

    // Sprint 3G · Módulo 13D se resuelve si el archivo ya trae V60.
    if (presentes.includes('V60')) {
      return {
        modo: 'ACUMULATIVO_V1_V60',
        variables: ajustarVariablesEsperadasPorPlantillaReal(VARIABLES_HASTA_3G_V60, presentes)
      };
    }

    // Sprint 3G · Módulo 13C se resuelve si el archivo ya trae V59.
    if (presentes.includes('V59')) {
      return {
        modo: 'ACUMULATIVO_V1_V59',
        variables: ajustarVariablesEsperadasPorPlantillaReal(VARIABLES_HASTA_3G_V59, presentes)
      };
    }

    // Sprint 3G · Módulo 13B se resuelve si el archivo ya trae V58.
    if (presentes.includes('V58')) {
      return {
        modo: 'ACUMULATIVO_V1_V58',
        variables: ajustarVariablesEsperadasPorPlantillaReal(VARIABLES_HASTA_3G_V58, presentes)
      };
    }

    // Sprint 3G · Módulo 13A se resuelve si el archivo ya trae V57.
    if (presentes.includes('V57')) {
      return {
        modo: 'ACUMULATIVO_V1_V57',
        variables: ajustarVariablesEsperadasPorPlantillaReal(VARIABLES_HASTA_3G_V57, presentes)
      };
    }

    // Sprint 3F · Módulo 12C se resuelve si el archivo ya trae V56.
    if (presentes.includes('V56')) {
      return {
        modo: 'ACUMULATIVO_V1_V56',
        variables: ajustarVariablesEsperadasPorPlantillaReal(VARIABLES_HASTA_3F_V56, presentes)
      };
    }

    // Sprint 3F · Módulo 12B se resuelve si el archivo ya trae V55.
    if (presentes.includes('V55')) {
      return {
        modo: 'ACUMULATIVO_V1_V55',
        variables: ajustarVariablesEsperadasPorPlantillaReal(VARIABLES_HASTA_3F_V55, presentes)
      };
    }

    // Sprint 3F · Módulo 12A se resuelve si el archivo ya trae V54.
    if (presentes.includes('V54')) {
      return {
        modo: 'ACUMULATIVO_V1_V54',
        variables: ajustarVariablesEsperadasPorPlantillaReal(VARIABLES_HASTA_3F_V54, presentes)
      };
    }

    // Sprint 3E se resuelve por última variable presente.
    // Esto permite cargar archivos de prueba hasta V53.7 sin exigir V53.8-V53.9 ni variables futuras.
    if (presentes.includes('V53_9')) {
      return {
        modo: 'ACUMULATIVO_V1_V53_9',
        variables: ajustarVariablesEsperadasPorPlantillaReal(VARIABLES_HASTA_3E_V53_9, presentes)
      };
    }

    if (presentes.includes('V53_8')) {
      return {
        modo: 'ACUMULATIVO_V1_V53_8',
        variables: ajustarVariablesEsperadasPorPlantillaReal(VARIABLES_HASTA_3E_V53_8, presentes)
      };
    }

    if (presentes.includes('V53_7')) {
      return {
        modo: 'ACUMULATIVO_V1_V53_7',
        variables: ajustarVariablesEsperadasPorPlantillaReal(VARIABLES_HASTA_3E_V53_7, presentes)
      };
    }

    // Esto permite cargar archivos de prueba hasta V53.6 sin exigir V53.7-V53.9 ni variables futuras.
    if (presentes.includes('V53_6')) {
      return {
        modo: 'ACUMULATIVO_V1_V53_6',
        variables: ajustarVariablesEsperadasPorPlantillaReal(VARIABLES_HASTA_3E_V53_6, presentes)
      };
    }

    // Esto permite cargar archivos de prueba hasta V53.5 sin exigir V53.6-V53.9 ni variables futuras.
    if (presentes.includes('V53_5')) {
      return {
        modo: 'ACUMULATIVO_V1_V53_5',
        variables: ajustarVariablesEsperadasPorPlantillaReal(VARIABLES_HASTA_3E_V53_5, presentes)
      };
    }

    if (presentes.includes('V53_4')) {
      return {
        modo: 'ACUMULATIVO_V1_V53_4',
        variables: ajustarVariablesEsperadasPorPlantillaReal(VARIABLES_HASTA_3E_V53_4, presentes)
      };
    }

    if (presentes.includes('V53_3')) {
      return {
        modo: 'ACUMULATIVO_V1_V53_3',
        variables: ajustarVariablesEsperadasPorPlantillaReal(VARIABLES_HASTA_3E_V53_3, presentes)
      };
    }

    if (presentes.includes('V53_2')) {
      return {
        modo: 'ACUMULATIVO_V1_V53_2',
        variables: ajustarVariablesEsperadasPorPlantillaReal(VARIABLES_HASTA_3E_V53_2, presentes)
      };
    }

    if (presentes.includes('V53_1')) {
      return {
        modo: 'ACUMULATIVO_V1_V53_1',
        variables: ajustarVariablesEsperadasPorPlantillaReal(VARIABLES_HASTA_3E_V53_1, presentes)
      };
    }

    // Esto permite cargar archivos de prueba hasta V53 sin exigir V53.1-V53.9 ni variables futuras.
    if (presentes.includes('V53')) {
      return {
        modo: 'ACUMULATIVO_V1_V53',
        variables: ajustarVariablesEsperadasPorPlantillaReal(VARIABLES_HASTA_3E_V53, presentes)
      };
    }

    // Sprint 3D se resuelve por última variable presente.
    // Esto permite cargar archivos de prueba hasta V52 sin exigir variables futuras.
    if (presentes.includes('V52')) {
      return {
        modo: 'ACUMULATIVO_V1_V52',
        variables: ajustarVariablesEsperadasPorPlantillaReal(VARIABLES_HASTA_3D_V52, presentes)
      };
    }

    // Esto permite cargar archivos de prueba hasta V51 sin exigir V52 ni variables futuras.
    if (presentes.includes('V51')) {
      return {
        modo: 'ACUMULATIVO_V1_V51',
        variables: ajustarVariablesEsperadasPorPlantillaReal(VARIABLES_HASTA_3D_V51, presentes)
      };
    }

    // Esto permite cargar archivos de prueba hasta V50 sin exigir V51-V52 ni variables futuras.
    if (presentes.includes('V50')) {
      return {
        modo: 'ACUMULATIVO_V1_V50',
        variables: ajustarVariablesEsperadasPorPlantillaReal(VARIABLES_HASTA_3D_V50, presentes)
      };
    }

    // Esto permite cargar archivos de prueba hasta V49 sin exigir V50-V52 ni variables futuras.
    if (presentes.includes('V49')) {
      return {
        modo: 'ACUMULATIVO_V1_V49',
        variables: ajustarVariablesEsperadasPorPlantillaReal(VARIABLES_HASTA_3D_V49, presentes)
      };
    }

    // Esto permite cargar archivos de prueba hasta V48 sin exigir V49-V52 ni variables futuras.
    if (presentes.includes('V48')) {
      return {
        modo: 'ACUMULATIVO_V1_V48',
        variables: ajustarVariablesEsperadasPorPlantillaReal(VARIABLES_HASTA_3D_V48, presentes)
      };
    }

    // Sprint 3C se resuelve por última variable presente.
    // Esto permite cargar archivos de prueba V45, V46, V46.1, V46.2, V46.3, V46.4, V46.5, V46.6, V46.7, V46.8 o V47 sin exigir V48-V73.
    if (presentes.includes('V47')) {
      return {
        modo: 'ACUMULATIVO_V1_V47',
        variables: ajustarVariablesEsperadasPorPlantillaReal(VARIABLES_HASTA_3C_V47, presentes)
      };
    }

    if (presentes.includes('V46_8')) {
      return {
        modo: 'ACUMULATIVO_V1_V46_8',
        variables: ajustarVariablesEsperadasPorPlantillaReal(VARIABLES_HASTA_3C_V46_8, presentes)
      };
    }

    if (presentes.includes('V46_7')) {
      return {
        modo: 'ACUMULATIVO_V1_V46_7',
        variables: VARIABLES_HASTA_3C_V46_7
      };
    }

    if (presentes.includes('V46_6')) {
      return {
        modo: 'ACUMULATIVO_V1_V46_6',
        variables: VARIABLES_HASTA_3C_V46_6
      };
    }

    if (presentes.includes('V46_5')) {
      return {
        modo: 'ACUMULATIVO_V1_V46_5',
        variables: VARIABLES_HASTA_3C_V46_5
      };
    }

    if (presentes.includes('V46_4')) {
      return {
        modo: 'ACUMULATIVO_V1_V46_4',
        variables: VARIABLES_HASTA_3C_V46_4
      };
    }

    if (presentes.includes('V46_3')) {
      return {
        modo: 'ACUMULATIVO_V1_V46_3',
        variables: VARIABLES_HASTA_3C_V46_3
      };
    }

    if (presentes.includes('V46_2')) {
      return {
        modo: 'ACUMULATIVO_V1_V46_2',
        variables: VARIABLES_HASTA_3C_V46_2
      };
    }

    if (presentes.includes('V46_1')) {
      return {
        modo: 'ACUMULATIVO_V1_V46_1',
        variables: VARIABLES_HASTA_3C_V46_1
      };
    }

    if (presentes.includes('V46')) {
      return {
        modo: 'ACUMULATIVO_V1_V46',
        variables: VARIABLES_HASTA_3C_V46
      };
    }

    if (presentes.includes('V45')) {
      return {
        modo: 'ACUMULATIVO_V1_V45',
        variables: VARIABLES_HASTA_3C_V45
      };
    }

    // Sprint 3B se resuelve por última variable presente.
    // Esto permite cargar archivos de prueba V41, V42, V43 o V44 sin exigir variables futuras.
    if (presentes.includes('V44')) {
      return {
        modo: 'ACUMULATIVO_V1_V44',
        variables: VARIABLES_HASTA_3B_V44
      };
    }

    if (presentes.includes('V43')) {
      return {
        modo: 'ACUMULATIVO_V1_V43',
        variables: VARIABLES_HASTA_3B_V43
      };
    }

    if (presentes.includes('V42')) {
      return {
        modo: 'ACUMULATIVO_V1_V42',
        variables: VARIABLES_HASTA_3B_V42
      };
    }

    if (presentes.includes('V41')) {
      return {
        modo: 'ACUMULATIVO_V1_V41',
        variables: VARIABLES_HASTA_3B_V41
      };
    }

    if (tiene3A) {
      return {
        modo: 'ACUMULATIVO_V1_V40',
        variables: VARIABLES_HASTA_3A
      };
    }

    if (tiene2E) {
      return {
        modo: 'ACUMULATIVO_V1_V35',
        variables: VARIABLES_HASTA_2E
      };
    }

    if (tiene2D) {
      return {
        modo: 'ACUMULATIVO_V1_V33',
        variables: VARIABLES_HASTA_2D
      };
    }

    if (tiene2C) {
      return {
        modo: 'ACUMULATIVO_V1_V29',
        variables: VARIABLES_HASTA_2C
      };
    }

    if (tiene2B) {
      return {
        modo: 'ACUMULATIVO_V1_V28',
        variables: VARIABLES_HASTA_2B
      };
    }

    if (tiene2A) {
      return {
        modo: 'ACUMULATIVO_V1_V24',
        variables: VARIABLES_HASTA_2A
      };
    }

    return {
      modo: 'ACUMULATIVO_V1_V16',
      variables: VARIABLES_SPRINT_1
    };
  }

  function validarEstructura(encabezados, variablesEsperadas = null, modo = null) {
    const encabezadosNormalizados = encabezados.map(normalizarEncabezado);
    const resolucion = resolverVariablesEsperadasDinamicas(encabezadosNormalizados);
    const variablesObjetivo = Array.isArray(variablesEsperadas) ? variablesEsperadas : resolucion.variables;
    const modoFinal = modo || resolucion.modo;

    const faltantes = variablesObjetivo.filter((variable) => !encabezadosNormalizados.includes(variable));
    const reconocidas = variablesObjetivo.filter((variable) => encabezadosNormalizados.includes(variable));

    return {
      esValida: faltantes.length === 0,
      modo: modoFinal,
      variablesEsperadas: variablesObjetivo,
      variablesReconocidas: reconocidas,
      variablesFaltantes: faltantes,
      totalReconocidas: reconocidas.length,
      totalEsperadas: variablesObjetivo.length,
      encabezadosNormalizados
    };
  }

  function validarEstructuraSprint1(encabezados) { return validarEstructura(encabezados); }
  function validarEstructuraSprint2A(encabezados) { return validarEstructura(encabezados); }
  function validarEstructuraSprint2B(encabezados) { return validarEstructura(encabezados); }
  function validarEstructuraSprint2C(encabezados) { return validarEstructura(encabezados); }
  function validarEstructuraSprint2D(encabezados) { return validarEstructura(encabezados); }
  function validarEstructuraSprint2E(encabezados) { return validarEstructura(encabezados); }
  function validarEstructuraSprint3A(encabezados) { return validarEstructura(encabezados); }
  function validarEstructuraSprint3B(encabezados) { return validarEstructura(encabezados); }
  function validarEstructuraSprint3C(encabezados) { return validarEstructura(encabezados); }
  function validarEstructuraSprint3D(encabezados) { return validarEstructura(encabezados); }

  window.CACEstructura = {
    version: VERSION,
    VARIABLES_SPRINT_1,
    VARIABLES_SPRINT_2A,
    VARIABLES_SPRINT_2B,
    VARIABLES_SPRINT_2C,
    VARIABLES_SPRINT_2D,
    VARIABLES_SPRINT_2E,
    VARIABLES_SPRINT_3A,
    VARIABLES_SPRINT_3B,
    VARIABLES_SPRINT_3C,
    VARIABLES_SPRINT_3D,
    VARIABLES_SPRINT_3E,
    VARIABLES_SPRINT_3F,
    VARIABLES_SPRINT_3G,
    VARIABLES_HASTA_2A,
    VARIABLES_HASTA_2B,
    VARIABLES_HASTA_2C,
    VARIABLES_HASTA_2D,
    VARIABLES_HASTA_2E,
    VARIABLES_HASTA_3A,
    VARIABLES_HASTA_3B_V41,
    VARIABLES_HASTA_3B_V42,
    VARIABLES_HASTA_3B_V43,
    VARIABLES_HASTA_3B_V44,
    VARIABLES_HASTA_3B,
    VARIABLES_HASTA_3C_V45,
    VARIABLES_HASTA_3C_V46,
    VARIABLES_HASTA_3C_V46_1,
    VARIABLES_HASTA_3C_V46_2,
    VARIABLES_HASTA_3C_V46_3,
    VARIABLES_HASTA_3C_V46_4,
    VARIABLES_HASTA_3C_V46_5,
    VARIABLES_HASTA_3C_V46_6,
    VARIABLES_HASTA_3C_V46_7,
    VARIABLES_HASTA_3C_V46_8,
    VARIABLES_HASTA_3C_V47,
    VARIABLES_HASTA_3C,
    VARIABLES_HASTA_3D_V48,
    VARIABLES_HASTA_3D_V49,
    VARIABLES_HASTA_3D_V50,
    VARIABLES_HASTA_3D_V51,
    VARIABLES_HASTA_3D_V52,
    VARIABLES_HASTA_3D,
    VARIABLES_HASTA_3E_V53,
    VARIABLES_HASTA_3E_V53_1,
    VARIABLES_HASTA_3E_V53_2,
    VARIABLES_HASTA_3E_V53_3,
    VARIABLES_HASTA_3E_V53_4,
    VARIABLES_HASTA_3E_V53_5,
    VARIABLES_HASTA_3E_V53_6,
    VARIABLES_HASTA_3E_V53_7,
    VARIABLES_HASTA_3E_V53_8,
    VARIABLES_HASTA_3E_V53_9,
    VARIABLES_HASTA_3E,
    VARIABLES_HASTA_3F_V54,
    VARIABLES_HASTA_3F_V55,
    VARIABLES_HASTA_3F_V56,
    VARIABLES_HASTA_3F,
    VARIABLES_HASTA_3G_V57,
    VARIABLES_HASTA_3G_V58,
    VARIABLES_HASTA_3G_V59,
    VARIABLES_HASTA_3G_V60,
    VARIABLES_HASTA_3G,
    VARIABLES_ESPERADAS,
    MAPA_ENCABEZADOS,
    MAPA_ENCABEZADOS_SPRINT_1,
    limpiarEncabezado,
    esEncabezadoV29,
    esEncabezadoV30,
    esEncabezadoV31,
    esEncabezadoV32,
    esEncabezadoV33,
    esEncabezadoV34,
    esEncabezadoV35,
    esEncabezadoV36,
    esEncabezadoV37,
    esEncabezadoV38,
    esEncabezadoV39,
    esEncabezadoV40,
    esEncabezadoV41,
    esEncabezadoV42,
    esEncabezadoV43,
    esEncabezadoV44,
    esEncabezadoV45,
    esEncabezadoV46,
    esEncabezadoV46_1,
    esEncabezadoV46_2,
    esEncabezadoV46_3,
    esEncabezadoV46_4,
    esEncabezadoV46_5,
    esEncabezadoV46_6,
    esEncabezadoV46_7,
    esEncabezadoV46_8,
    esEncabezadoV47,
    esEncabezadoV48,
    esEncabezadoV49,
    esEncabezadoV50,
    esEncabezadoV51,
    esEncabezadoV52,
    esEncabezadoV53,
    esEncabezadoV53_1,
    esEncabezadoV53_2,
    esEncabezadoV53_3,
    esEncabezadoV53_4,
    esEncabezadoV53_5,
    esEncabezadoV53_6,
    esEncabezadoV53_7,
    esEncabezadoV53_8,
    esEncabezadoV53_9,
    esEncabezadoV54,
    esEncabezadoV55,
    esEncabezadoV56,
    esEncabezadoV57,
    esEncabezadoV58,
    esEncabezadoV59,
    esEncabezadoV60,
    extraerVariableDesdeEncabezado,
    normalizarEncabezado,
    resolverVariablesEsperadasDinamicas,
    ajustarVariablesEsperadasPorPlantillaReal,
    validarEstructura,
    validarEstructuraSprint1,
    validarEstructuraSprint2A,
    validarEstructuraSprint2B,
    validarEstructuraSprint2C,
    validarEstructuraSprint2D,
    validarEstructuraSprint2E,
    validarEstructuraSprint3A,
    validarEstructuraSprint3B,
    validarEstructuraSprint3C,
    validarEstructuraSprint3D
  };
})();
