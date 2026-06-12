(function () {
  'use strict';

  const VERSION = 'sprint-3k-v83-estructura-01';

  const VARIABLES_SPRINT_1 = Array.from({ length: 16 }, (_, i) => `V${i + 1}`);
  const VARIABLES_SPRINT_2A = ['V17', 'V18', 'V19', 'V20', 'V21', 'V22', 'V23', 'V24'];
  const VARIABLES_SPRINT_2B = ['V25', 'V26', 'V27', 'V28'];
  const VARIABLES_SPRINT_2C = ['V29'];
  const VARIABLES_SPRINT_2D = ['V30', 'V31', 'V32', 'V33'];
  const VARIABLES_SPRINT_2E = ['V34', 'V35'];
  const VARIABLES_SPRINT_3A = ['V36', 'V37', 'V38', 'V39', 'V40'];
  const VARIABLES_SPRINT_3B = ['V41', 'V42', 'V43', 'V44'];
  const VARIABLES_SPRINT_3C = ['V45', 'V46', 'V46_1', 'V46_2', 'V46_3', 'V46_4', 'V46_5', 'V46_6', 'V46_7', 'V46_8', 'V47'];
  const VARIABLES_SPRINT_3D = ['V48', 'V49', 'V50', 'V51', 'V52'];
  const VARIABLES_SPRINT_3E = ['V53', 'V53_1', 'V53_2', 'V53_3', 'V53_4', 'V53_5', 'V53_6', 'V53_7', 'V53_8', 'V53_9'];
  const VARIABLES_SPRINT_3F = ['V54', 'V55', 'V56'];
  const VARIABLES_SPRINT_3G = ['V57', 'V58', 'V59', 'V60'];
  const VARIABLES_SPRINT_3H = ['V61', 'V62', 'V63', 'V64', 'V65'];
  const VARIABLES_SPRINT_3H_MODULO15 = ['V66', 'V66_1', 'V66_2', 'V66_3', 'V66_4', 'V66_5', 'V66_6', 'V66_7', 'V66_8', 'V66_9'];
  const VARIABLES_SPRINT_3I = ['V67', 'V68', 'V69'];
  const VARIABLES_SPRINT_3J = ['V70', 'V71', 'V72', 'V73'];
  const VARIABLES_SPRINT_3K = ['V74', 'V75', 'V76', 'V77', 'V78', 'V79', 'V80', 'V81', 'V82', 'V83'];

  const VARIABLES_HASTA_2A = [...VARIABLES_SPRINT_1, ...VARIABLES_SPRINT_2A];
  const VARIABLES_HASTA_2B = [...VARIABLES_HASTA_2A, ...VARIABLES_SPRINT_2B];
  const VARIABLES_HASTA_2C = [...VARIABLES_HASTA_2B, ...VARIABLES_SPRINT_2C];
  const VARIABLES_HASTA_2D = [...VARIABLES_HASTA_2C, ...VARIABLES_SPRINT_2D];
  const VARIABLES_HASTA_2E = [...VARIABLES_HASTA_2D, ...VARIABLES_SPRINT_2E];
  const VARIABLES_HASTA_3A = [...VARIABLES_HASTA_2E, ...VARIABLES_SPRINT_3A];

  const VARIABLES_HASTA_3B_V41 = [...VARIABLES_HASTA_3A, 'V41'];
  const VARIABLES_HASTA_3B_V42 = [...VARIABLES_HASTA_3B_V41, 'V42'];
  const VARIABLES_HASTA_3B_V43 = [...VARIABLES_HASTA_3B_V42, 'V43'];
  const VARIABLES_HASTA_3B_V44 = [...VARIABLES_HASTA_3B_V43, 'V44'];
  const VARIABLES_HASTA_3B = VARIABLES_HASTA_3B_V44;

  const VARIABLES_HASTA_3C_V45 = [...VARIABLES_HASTA_3B, 'V45'];
  const VARIABLES_HASTA_3C_V46 = [...VARIABLES_HASTA_3C_V45, 'V46'];
  const VARIABLES_HASTA_3C_V46_1 = [...VARIABLES_HASTA_3C_V46, 'V46_1'];
  const VARIABLES_HASTA_3C_V46_2 = [...VARIABLES_HASTA_3C_V46_1, 'V46_2'];
  const VARIABLES_HASTA_3C_V46_3 = [...VARIABLES_HASTA_3C_V46_2, 'V46_3'];
  const VARIABLES_HASTA_3C_V46_4 = [...VARIABLES_HASTA_3C_V46_3, 'V46_4'];
  const VARIABLES_HASTA_3C_V46_5 = [...VARIABLES_HASTA_3C_V46_4, 'V46_5'];
  const VARIABLES_HASTA_3C_V46_6 = [...VARIABLES_HASTA_3C_V46_5, 'V46_6'];
  const VARIABLES_HASTA_3C_V46_7 = [...VARIABLES_HASTA_3C_V46_6, 'V46_7'];
  const VARIABLES_HASTA_3C_V46_8 = [...VARIABLES_HASTA_3C_V46_7, 'V46_8'];
  const VARIABLES_HASTA_3C_V47 = [...VARIABLES_HASTA_3C_V46_8, 'V47'];
  const VARIABLES_HASTA_3C = VARIABLES_HASTA_3C_V47;

  const VARIABLES_HASTA_3D_V48 = [...VARIABLES_HASTA_3C, 'V48'];
  const VARIABLES_HASTA_3D_V49 = [...VARIABLES_HASTA_3D_V48, 'V49'];
  const VARIABLES_HASTA_3D_V50 = [...VARIABLES_HASTA_3D_V49, 'V50'];
  const VARIABLES_HASTA_3D_V51 = [...VARIABLES_HASTA_3D_V50, 'V51'];
  const VARIABLES_HASTA_3D_V52 = [...VARIABLES_HASTA_3D_V51, 'V52'];
  const VARIABLES_HASTA_3D = VARIABLES_HASTA_3D_V52;

  const VARIABLES_HASTA_3E_V53 = [...VARIABLES_HASTA_3D, 'V53'];
  const VARIABLES_HASTA_3E_V53_1 = [...VARIABLES_HASTA_3E_V53, 'V53_1'];
  const VARIABLES_HASTA_3E_V53_2 = [...VARIABLES_HASTA_3E_V53_1, 'V53_2'];
  const VARIABLES_HASTA_3E_V53_3 = [...VARIABLES_HASTA_3E_V53_2, 'V53_3'];
  const VARIABLES_HASTA_3E_V53_4 = [...VARIABLES_HASTA_3E_V53_3, 'V53_4'];
  const VARIABLES_HASTA_3E_V53_5 = [...VARIABLES_HASTA_3E_V53_4, 'V53_5'];
  const VARIABLES_HASTA_3E_V53_6 = [...VARIABLES_HASTA_3E_V53_5, 'V53_6'];
  const VARIABLES_HASTA_3E_V53_7 = [...VARIABLES_HASTA_3E_V53_6, 'V53_7'];
  const VARIABLES_HASTA_3E_V53_8 = [...VARIABLES_HASTA_3E_V53_7, 'V53_8'];
  const VARIABLES_HASTA_3E_V53_9 = [...VARIABLES_HASTA_3E_V53_8, 'V53_9'];
  const VARIABLES_HASTA_3E = VARIABLES_HASTA_3E_V53_9;

  const VARIABLES_HASTA_3F_V54 = [...VARIABLES_HASTA_3E, 'V54'];
  const VARIABLES_HASTA_3F_V55 = [...VARIABLES_HASTA_3F_V54, 'V55'];
  const VARIABLES_HASTA_3F_V56 = [...VARIABLES_HASTA_3F_V55, 'V56'];
  const VARIABLES_HASTA_3F = VARIABLES_HASTA_3F_V56;

  const VARIABLES_HASTA_3G_V57 = [...VARIABLES_HASTA_3F, 'V57'];
  const VARIABLES_HASTA_3G_V58 = [...VARIABLES_HASTA_3G_V57, 'V58'];
  const VARIABLES_HASTA_3G_V59 = [...VARIABLES_HASTA_3G_V58, 'V59'];
  const VARIABLES_HASTA_3G_V60 = [...VARIABLES_HASTA_3G_V59, 'V60'];
  const VARIABLES_HASTA_3G = VARIABLES_HASTA_3G_V60;

  const VARIABLES_HASTA_3H_V61 = [...VARIABLES_HASTA_3G, 'V61'];
  const VARIABLES_HASTA_3H_V62 = [...VARIABLES_HASTA_3H_V61, 'V62'];
  const VARIABLES_HASTA_3H_V63 = [...VARIABLES_HASTA_3H_V62, 'V63'];
  const VARIABLES_HASTA_3H_V64 = [...VARIABLES_HASTA_3H_V63, 'V64'];
  const VARIABLES_HASTA_3H_V65 = [...VARIABLES_HASTA_3H_V64, 'V65'];
  const VARIABLES_HASTA_3H_V66 = [...VARIABLES_HASTA_3H_V65, 'V66'];
  const VARIABLES_HASTA_3H_V66_1 = [...VARIABLES_HASTA_3H_V66, 'V66_1'];
  const VARIABLES_HASTA_3H_V66_2 = [...VARIABLES_HASTA_3H_V66_1, 'V66_2'];
  const VARIABLES_HASTA_3H_V66_3 = [...VARIABLES_HASTA_3H_V66_2, 'V66_3'];
  const VARIABLES_HASTA_3H_V66_4 = [...VARIABLES_HASTA_3H_V66_3, 'V66_4'];
  const VARIABLES_HASTA_3H_V66_5 = [...VARIABLES_HASTA_3H_V66_4, 'V66_5'];
  const VARIABLES_HASTA_3H_V66_6 = [...VARIABLES_HASTA_3H_V66_5, 'V66_6'];
  const VARIABLES_HASTA_3H_V66_7 = [...VARIABLES_HASTA_3H_V66_6, 'V66_7'];
  const VARIABLES_HASTA_3H_V66_8 = [...VARIABLES_HASTA_3H_V66_7, 'V66_8'];
  const VARIABLES_HASTA_3H_V66_9 = [...VARIABLES_HASTA_3H_V66_8, 'V66_9'];
  const VARIABLES_HASTA_3H = VARIABLES_HASTA_3H_V66_9;
  const VARIABLES_HASTA_3I_V67 = [...VARIABLES_HASTA_3H, 'V67'];
  const VARIABLES_HASTA_3I_V68 = [...VARIABLES_HASTA_3I_V67, 'V68'];
  const VARIABLES_HASTA_3I_V69 = [...VARIABLES_HASTA_3I_V68, 'V69'];
  const VARIABLES_HASTA_3I = VARIABLES_HASTA_3I_V69;
  const VARIABLES_HASTA_3J_V70 = [...VARIABLES_HASTA_3I, 'V70'];
  const VARIABLES_HASTA_3J_V71 = [...VARIABLES_HASTA_3J_V70, 'V71'];
  const VARIABLES_HASTA_3J_V72 = [...VARIABLES_HASTA_3J_V71, 'V72'];
  const VARIABLES_HASTA_3J_V73 = [...VARIABLES_HASTA_3J_V72, 'V73'];
  const VARIABLES_HASTA_3J = VARIABLES_HASTA_3J_V73;
  const VARIABLES_HASTA_3K_V74 = [...VARIABLES_HASTA_3J, 'V74'];
  const VARIABLES_HASTA_3K_V75 = [...VARIABLES_HASTA_3K_V74, 'V75'];
  const VARIABLES_HASTA_3K_V76 = [...VARIABLES_HASTA_3K_V75, 'V76'];
  const VARIABLES_HASTA_3K_V77 = [...VARIABLES_HASTA_3K_V76, 'V77'];
  const VARIABLES_HASTA_3K_V78 = [...VARIABLES_HASTA_3K_V77, 'V78'];
  const VARIABLES_HASTA_3K_V79 = [...VARIABLES_HASTA_3K_V78, 'V79'];
  const VARIABLES_HASTA_3K_V80 = [...VARIABLES_HASTA_3K_V79, 'V80'];
  const VARIABLES_HASTA_3K_V81 = [...VARIABLES_HASTA_3K_V80, 'V81'];
  const VARIABLES_HASTA_3K_V82 = [...VARIABLES_HASTA_3K_V81, 'V82'];
  const VARIABLES_HASTA_3K_V83 = [...VARIABLES_HASTA_3K_V82, 'V83'];
  const VARIABLES_HASTA_3K = VARIABLES_HASTA_3K_V83;
  const VARIABLES_ESPERADAS = VARIABLES_HASTA_3K_V83;

  function limpiarEncabezado(valor) {
    return String(valor ?? '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/g, '');
  }

  const MAPA_ENCABEZADOS = {};
  VARIABLES_ESPERADAS.forEach((variable) => {
    MAPA_ENCABEZADOS[variable.toLowerCase()] = variable;
  });

  Object.assign(MAPA_ENCABEZADOS, {
    v1primernombre: 'V1', primernombre: 'V1',
    v2segundonombre: 'V2', segundonombre: 'V2',
    v3primerapellido: 'V3', primerapellido: 'V3',
    v4segundoapellido: 'V4', segundoapellido: 'V4',
    v5tipoidentificacion: 'V5', v5tipodeidentificacion: 'V5', v5tipodeidentificacin: 'V5',
    v6numeroidentificacion: 'V6', v6numerodeidentificacion: 'V6', v6nmerodeidentificacin: 'V6',
    v7fechadenacimiento: 'V7', v8sexo: 'V8',
    v9ocupacion: 'V9', v9ocupacin: 'V9',
    v10regimendeafiliacion: 'V10', v10rgimendeafiliacinalsgsss: 'V10',
    v11eps: 'V11', v11eapb: 'V11',
    v12cdigopertenenciatnica: 'V12', v12codigopertenenciaetnica: 'V12',
    v13grupopoblacional: 'V13', v14municipioderesidencia: 'V14',
    v15nmerotelefnicodelpacienteincl: 'V15',
    v16fechadeafiliacinalaeapbquerep: 'V16',
    v17nombredelaneoplasiacncerotumo: 'V17', v17codigocie10delaneoplasiamalignareportadaprimario: 'V17',
    v18fechadediagnsticodelcncerrepo: 'V18',
    v19fechadelanotaderemisindelmdic: 'V19',
    v20fechadeingresoalainstitucinqu: 'V20',
    v21tipodeestudioconelqueserealiz: 'V21',
    v22motivoporelcualelusuarionotuv: 'V22',
    v23fechaderecoleccindemuestrapar: 'V23',
    v24fechadeinformehistopatolgicov: 'V24',
    v25cdigovlidodehabilitacindelaip: 'V25',
    v26fechadeprimeraconsultaconmdic: 'V26',
    v27histologadeltumorenmuestradeb: 'V27',
    v28gradodediferenciacindeltumors: 'V28',
    v45recibioquimioterapiauotraterapiasistemica: 'V45',
    v461recibilafasedequimioterapiap: 'V46_1',
    v462recibilafasedequimioterapiai: 'V46_2',
    v463recibilafasedequimioterapiai: 'V46_3',
    v464recibilafasedequimioterapiac: 'V46_4',
    v465recibilafasedequimioterapiar: 'V46_5',
    v466recibilafasedequimioterapiam: 'V46_6',
    v467recibilafasedequimioterapiam: 'V46_7',
    v468recibilafasedequimioterapiao: 'V46_8',
    v50nmerodeipsquesuministranelpri: 'V50',
    v51cdigodelaips1quesuministraelp: 'V51',
    v52cdigodelaips2quesuministraelp: 'V52',
    v53cantidadmedictosantineoplasic: 'V53',
    v531medicamentoadm1: 'V53_1', v532medicamentoadm2: 'V53_2', v533medicamentoadm3: 'V53_3',
    v534medicamentoadm4: 'V53_4', v535medicamentoadm5: 'V53_5', v536medicamentoadm6: 'V53_6',
    v537medicamentoadm7: 'V53_7', v538medicamentoadm8: 'V53_8', v539medicamentoadm9: 'V53_9',
    v57recibioquimioterapiaintratecal: 'V57',
    v58fechadefinalizacindelprimerci: 'V58',
    v59caractersticasactualesdelprim: 'V59',
    v60motivofinalizacinprematuradep: 'V60',
    v61ubicaciontemporaldelultimoesquema: 'V61',
    v62fechadeiniciodelultimoesquema: 'V62',
    v63numerodeipsquesuministranelultimoesquema: 'V63',
    v64cdigodelaips1quesuministraell: 'V64',
    v65cdigodelaips2quesuministraell: 'V65',
    v66cuantosmedicamentosantineopls: 'V66',
    v661medicamentoadm1: 'V66_1', v662medicamentoadm2: 'V66_2', v663medicamentoadm3: 'V66_3',
    v664medicamentoadm4: 'V66_4', v665medicamentoadm5: 'V66_5', v666medicamentoadm6: 'V66_6',
    v667medicamentoadm7: 'V66_7', v668medicamentoadm8: 'V66_8', v669medicamentoadm9: 'V66_9',
    v67medicamentoadicional1: 'V67',
    v67medicamentoantineoplasicooterapiahormonaladicional1: 'V67',
    v67medicamentoantineoplasicooterapiahormonalparacanceradicionalalosreportadosenvariables661a6691administradoalusuarioultimoesquema: 'V67',
    v68medicamentoadicional2: 'V68',
    v68medicamentoantineoplasicooterapiahormonaladicional2: 'V68',
    v68medicamentonopos2administrado: 'V68',
    v68medicamentoantineoplasicooterapiahormonalparacanceradicionalalosreportadosenvariables661a6692administradoalusuarioultimoesquema: 'V68',
    v69medicamentoadicional3: 'V69',
    v69medicamentoantineoplasicooterapiahormonaladicional3: 'V69',
    v69medicamentonopos3administrado: 'V69',
    v69medicamentoantineoplasicooterapiahormonalparacanceradicionalalosreportadosenvariables661a669: 'V69',
    v70recibiquimioterapiaintratecal: 'V70',
    v70recibioquimioterapiaintratecal: 'V70',
    v70quimioterapiaintratecal: 'V70',
    v71fechadefinalizacindelciclolti: 'V71',
    v71fechafinalizacionultimoesquema: 'V71',
    v71fechadefinalizaciondelultimoesquema: 'V71',
    v71fechadefinalizaciondelcicloultimo: 'V71',
    v72caractersticasactualesdelltim: 'V72',
    v72caracteristicasactualesdelesquema: 'V72',
    v72caracteristicasactualesdelultimoesquema: 'V72',
    v72caracteristicasactualesdelultim: 'V72',
    v72caracteristicasactualesdelultimo: 'V72',
    v73motivodelafinalizacionprematura: 'V73',
    v73motivodelafinalizacinprematura: 'V73',
    v73motivofinalizacionprematura: 'V73',
    v73motivodelafinalizacion: 'V73',
    v73motivofinalizacinprematura: 'V73',
    v73motivofinalizacinprematuradel: 'V73',
    v74cirugascurativasopaliativas: 'V74',
    v74cirugiascurativasopaliativas: 'V74',
    v74cirugiascurativasypaliativas: 'V74',
    v74cirugiascurativasopaliativascomomanejodelcancer: 'V74',
    v74fuesometidoacirugiascurativasopaliativas: 'V74',
    v75nmerodecirugasalasquefuesomet: 'V75',
    v75numerodecirugias: 'V75',
    v75nmerodecirugias: 'V75',
    v75numerodecirugiasalasquefuesometido: 'V75',
    v75numerodecirugiasperiodoreporte: 'V75',
    v75numerodecirugiasalasquefuesometidoelusuario: 'V75',
    v76fechaderealizacindelaprimerac: 'V76',
    v76fechaderealizaciondelaprimeracirugia: 'V76',
    v76fechaprimeracirugia: 'V76',
    v76fecharealizacionprimeracirugia: 'V76',
    v76fechadelaprimeracirugia: 'V76',
    v77cdigodelaipsquerealizlaprimer: 'V77',
    v77codigodelaipsquerealizolaprimeracirugia: 'V77',
    v77codigoipsprimeracirugia: 'V77',
    v77ipsprimeracirugia: 'V77',
    v77codigohabilitacionipsprimeracirugia: 'V77',
    v78cdigodeprimeraciruga: 'V78',
    v78codigodeprimeracirugia: 'V78',
    v78cupsprimeracirugia: 'V78',
    v78codigocupsprimeracirugia: 'V78',
    v78codigoprocedimientoprimeracirugia: 'V78',
    v78codigodeprocedimientocupsprimeracirugia: 'V78',
    v79ubicacintemporaldeestaprimera: 'V79',
    v79ubicaciontemporaldeestaprimeracirugia: 'V79',
    v79ubicaciontemporalprimeracirugia: 'V79',
    v79ubicaciontemporal: 'V79',
    v79ubicacioncirugia: 'V79',
    v80fechaderealizacindelltimoproc: 'V80',
    v80fechaderealizaciondelultimoprocedimiento: 'V80',
    v80fechaderealizaciondelaultimacirugia: 'V80',
    v80fechaultimacirugia: 'V80',
    v80fechacirugiareintervencion: 'V80',
    v80fechaultimoprocedimiento: 'V80',
    v81motivodehaberrealizadolaltima: 'V81',
    v81motivodehaberrealizadolaultima: 'V81',
    v81motivoultimacirugia: 'V81',
    v81motivodelaultimacirugia: 'V81',
    v81motivocirugiareintervencion: 'V81',
    v83cdigodeltimaciruga: 'V83',
    v83codigodelaultimacirugia: 'V83',
    v83codigocupsultimacirugia: 'V83',
    v83cupsultimacirugia: 'V83',
    v83codigodeultimacirugia: 'V83'
  });

  function normalizarEncabezado(valor) {
    const original = String(valor ?? '').trim().toUpperCase();
    if (VARIABLES_ESPERADAS.includes(original)) return original;

    const limpio = limpiarEncabezado(valor);
    if (MAPA_ENCABEZADOS[limpio]) return MAPA_ENCABEZADOS[limpio];

    const subvariable46 = limpio.match(/^v46([1-8])(?:\D|$)/);
    if (subvariable46) return `V46_${subvariable46[1]}`;

    const subvariable53 = limpio.match(/^v53([1-9])(?:\D|$)/);
    if (subvariable53) return `V53_${subvariable53[1]}`;

    const subvariable66 = limpio.match(/^v66([1-9])(?:\D|$)/);
    if (subvariable66) return `V66_${subvariable66[1]}`;

    const variableSimple = limpio.match(/^v(\d{1,3})(?:\D|$)/);
    if (variableSimple) {
      const numero = Number(variableSimple[1]);
      const variable = `V${numero}`;
      if (VARIABLES_ESPERADAS.includes(variable)) return variable;
    }

    return original;
  }

  function ajustarVariablesEsperadasPorPlantillaReal(variables, presentes) {
    if (!presentes.includes('V46_8')) {
      return variables.filter((variable) => variable !== 'V46_8');
    }
    return variables;
  }

  const MODOS = [
    ['V83', 'ACUMULATIVO_V1_V83', VARIABLES_HASTA_3K_V83],
    ['V82', 'ACUMULATIVO_V1_V82', VARIABLES_HASTA_3K_V82],
    ['V81', 'ACUMULATIVO_V1_V81', VARIABLES_HASTA_3K_V81],
    ['V80', 'ACUMULATIVO_V1_V80', VARIABLES_HASTA_3K_V80],
    ['V79', 'ACUMULATIVO_V1_V79', VARIABLES_HASTA_3K_V79],
    ['V78', 'ACUMULATIVO_V1_V78', VARIABLES_HASTA_3K_V78],
    ['V77', 'ACUMULATIVO_V1_V77', VARIABLES_HASTA_3K_V77],
    ['V76', 'ACUMULATIVO_V1_V76', VARIABLES_HASTA_3K_V76],
    ['V75', 'ACUMULATIVO_V1_V75', VARIABLES_HASTA_3K_V75],
    ['V74', 'ACUMULATIVO_V1_V74', VARIABLES_HASTA_3K_V74],
    ['V73', 'ACUMULATIVO_V1_V73', VARIABLES_HASTA_3J_V73],
    ['V72', 'ACUMULATIVO_V1_V72', VARIABLES_HASTA_3J_V72],
    ['V71', 'ACUMULATIVO_V1_V71', VARIABLES_HASTA_3J_V71],
    ['V70', 'ACUMULATIVO_V1_V70', VARIABLES_HASTA_3J_V70],
    ['V69', 'ACUMULATIVO_V1_V69', VARIABLES_HASTA_3I_V69],
    ['V68', 'ACUMULATIVO_V1_V68', VARIABLES_HASTA_3I_V68],
    ['V67', 'ACUMULATIVO_V1_V67', VARIABLES_HASTA_3I_V67],
    ['V66_9', 'ACUMULATIVO_V1_V66_9', VARIABLES_HASTA_3H_V66_9],
    ['V66_8', 'ACUMULATIVO_V1_V66_8', VARIABLES_HASTA_3H_V66_8],
    ['V66_7', 'ACUMULATIVO_V1_V66_7', VARIABLES_HASTA_3H_V66_7],
    ['V66_6', 'ACUMULATIVO_V1_V66_6', VARIABLES_HASTA_3H_V66_6],
    ['V66_5', 'ACUMULATIVO_V1_V66_5', VARIABLES_HASTA_3H_V66_5],
    ['V66_4', 'ACUMULATIVO_V1_V66_4', VARIABLES_HASTA_3H_V66_4],
    ['V66_3', 'ACUMULATIVO_V1_V66_3', VARIABLES_HASTA_3H_V66_3],
    ['V66_2', 'ACUMULATIVO_V1_V66_2', VARIABLES_HASTA_3H_V66_2],
    ['V66_1', 'ACUMULATIVO_V1_V66_1', VARIABLES_HASTA_3H_V66_1],
    ['V66', 'ACUMULATIVO_V1_V66', VARIABLES_HASTA_3H_V66],
    ['V65', 'ACUMULATIVO_V1_V65', VARIABLES_HASTA_3H_V65],
    ['V64', 'ACUMULATIVO_V1_V64', VARIABLES_HASTA_3H_V64],
    ['V63', 'ACUMULATIVO_V1_V63', VARIABLES_HASTA_3H_V63],
    ['V62', 'ACUMULATIVO_V1_V62', VARIABLES_HASTA_3H_V62],
    ['V61', 'ACUMULATIVO_V1_V61', VARIABLES_HASTA_3H_V61],
    ['V60', 'ACUMULATIVO_V1_V60', VARIABLES_HASTA_3G_V60],
    ['V59', 'ACUMULATIVO_V1_V59', VARIABLES_HASTA_3G_V59],
    ['V58', 'ACUMULATIVO_V1_V58', VARIABLES_HASTA_3G_V58],
    ['V57', 'ACUMULATIVO_V1_V57', VARIABLES_HASTA_3G_V57],
    ['V56', 'ACUMULATIVO_V1_V56', VARIABLES_HASTA_3F_V56],
    ['V55', 'ACUMULATIVO_V1_V55', VARIABLES_HASTA_3F_V55],
    ['V54', 'ACUMULATIVO_V1_V54', VARIABLES_HASTA_3F_V54],
    ['V53_9', 'ACUMULATIVO_V1_V53_9', VARIABLES_HASTA_3E_V53_9],
    ['V53_8', 'ACUMULATIVO_V1_V53_8', VARIABLES_HASTA_3E_V53_8],
    ['V53_7', 'ACUMULATIVO_V1_V53_7', VARIABLES_HASTA_3E_V53_7],
    ['V53_6', 'ACUMULATIVO_V1_V53_6', VARIABLES_HASTA_3E_V53_6],
    ['V53_5', 'ACUMULATIVO_V1_V53_5', VARIABLES_HASTA_3E_V53_5],
    ['V53_4', 'ACUMULATIVO_V1_V53_4', VARIABLES_HASTA_3E_V53_4],
    ['V53_3', 'ACUMULATIVO_V1_V53_3', VARIABLES_HASTA_3E_V53_3],
    ['V53_2', 'ACUMULATIVO_V1_V53_2', VARIABLES_HASTA_3E_V53_2],
    ['V53_1', 'ACUMULATIVO_V1_V53_1', VARIABLES_HASTA_3E_V53_1],
    ['V53', 'ACUMULATIVO_V1_V53', VARIABLES_HASTA_3E_V53],
    ['V52', 'ACUMULATIVO_V1_V52', VARIABLES_HASTA_3D_V52],
    ['V51', 'ACUMULATIVO_V1_V51', VARIABLES_HASTA_3D_V51],
    ['V50', 'ACUMULATIVO_V1_V50', VARIABLES_HASTA_3D_V50],
    ['V49', 'ACUMULATIVO_V1_V49', VARIABLES_HASTA_3D_V49],
    ['V48', 'ACUMULATIVO_V1_V48', VARIABLES_HASTA_3D_V48],
    ['V47', 'ACUMULATIVO_V1_V47', VARIABLES_HASTA_3C_V47],
    ['V46_8', 'ACUMULATIVO_V1_V46_8', VARIABLES_HASTA_3C_V46_8],
    ['V46_7', 'ACUMULATIVO_V1_V46_7', VARIABLES_HASTA_3C_V46_7],
    ['V46_6', 'ACUMULATIVO_V1_V46_6', VARIABLES_HASTA_3C_V46_6],
    ['V46_5', 'ACUMULATIVO_V1_V46_5', VARIABLES_HASTA_3C_V46_5],
    ['V46_4', 'ACUMULATIVO_V1_V46_4', VARIABLES_HASTA_3C_V46_4],
    ['V46_3', 'ACUMULATIVO_V1_V46_3', VARIABLES_HASTA_3C_V46_3],
    ['V46_2', 'ACUMULATIVO_V1_V46_2', VARIABLES_HASTA_3C_V46_2],
    ['V46_1', 'ACUMULATIVO_V1_V46_1', VARIABLES_HASTA_3C_V46_1],
    ['V46', 'ACUMULATIVO_V1_V46', VARIABLES_HASTA_3C_V46],
    ['V45', 'ACUMULATIVO_V1_V45', VARIABLES_HASTA_3C_V45],
    ['V44', 'ACUMULATIVO_V1_V44', VARIABLES_HASTA_3B_V44],
    ['V43', 'ACUMULATIVO_V1_V43', VARIABLES_HASTA_3B_V43],
    ['V42', 'ACUMULATIVO_V1_V42', VARIABLES_HASTA_3B_V42],
    ['V41', 'ACUMULATIVO_V1_V41', VARIABLES_HASTA_3B_V41],
    ['V40', 'ACUMULATIVO_V1_V40', VARIABLES_HASTA_3A],
    ['V35', 'ACUMULATIVO_V1_V35', VARIABLES_HASTA_2E],
    ['V33', 'ACUMULATIVO_V1_V33', VARIABLES_HASTA_2D],
    ['V29', 'ACUMULATIVO_V1_V29', VARIABLES_HASTA_2C],
    ['V28', 'ACUMULATIVO_V1_V28', VARIABLES_HASTA_2B],
    ['V24', 'ACUMULATIVO_V1_V24', VARIABLES_HASTA_2A]
  ];

  function resolverVariablesEsperadasDinamicas(encabezadosNormalizados) {
    const presentes = encabezadosNormalizados.filter((variable) => VARIABLES_ESPERADAS.includes(variable));
    for (const [variable, modo, variables] of MODOS) {
      if (presentes.includes(variable)) {
        return { modo, variables: ajustarVariablesEsperadasPorPlantillaReal(variables, presentes) };
      }
    }

    return { modo: 'ACUMULATIVO_V1_V16', variables: VARIABLES_SPRINT_1 };
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
  function validarEstructuraSprint3I(encabezados) { return validarEstructura(encabezados); }

  function crearFuncionEncabezado(variable) {
    return function (valor) {
      return normalizarEncabezado(valor) === variable;
    };
  }

  window.CACEstructura = {
    version: VERSION,
    VARIABLES_SPRINT_1, VARIABLES_SPRINT_2A, VARIABLES_SPRINT_2B, VARIABLES_SPRINT_2C, VARIABLES_SPRINT_2D, VARIABLES_SPRINT_2E,
    VARIABLES_SPRINT_3A, VARIABLES_SPRINT_3B, VARIABLES_SPRINT_3C, VARIABLES_SPRINT_3D, VARIABLES_SPRINT_3E, VARIABLES_SPRINT_3F, VARIABLES_SPRINT_3G, VARIABLES_SPRINT_3H, VARIABLES_SPRINT_3H_MODULO15, VARIABLES_SPRINT_3I,
    VARIABLES_HASTA_2A, VARIABLES_HASTA_2B, VARIABLES_HASTA_2C, VARIABLES_HASTA_2D, VARIABLES_HASTA_2E,
    VARIABLES_HASTA_3A,
    VARIABLES_HASTA_3B_V41, VARIABLES_HASTA_3B_V42, VARIABLES_HASTA_3B_V43, VARIABLES_HASTA_3B_V44, VARIABLES_HASTA_3B,
    VARIABLES_HASTA_3C_V45, VARIABLES_HASTA_3C_V46, VARIABLES_HASTA_3C_V46_1, VARIABLES_HASTA_3C_V46_2, VARIABLES_HASTA_3C_V46_3, VARIABLES_HASTA_3C_V46_4, VARIABLES_HASTA_3C_V46_5, VARIABLES_HASTA_3C_V46_6, VARIABLES_HASTA_3C_V46_7, VARIABLES_HASTA_3C_V46_8, VARIABLES_HASTA_3C_V47, VARIABLES_HASTA_3C,
    VARIABLES_HASTA_3D_V48, VARIABLES_HASTA_3D_V49, VARIABLES_HASTA_3D_V50, VARIABLES_HASTA_3D_V51, VARIABLES_HASTA_3D_V52, VARIABLES_HASTA_3D,
    VARIABLES_HASTA_3E_V53, VARIABLES_HASTA_3E_V53_1, VARIABLES_HASTA_3E_V53_2, VARIABLES_HASTA_3E_V53_3, VARIABLES_HASTA_3E_V53_4, VARIABLES_HASTA_3E_V53_5, VARIABLES_HASTA_3E_V53_6, VARIABLES_HASTA_3E_V53_7, VARIABLES_HASTA_3E_V53_8, VARIABLES_HASTA_3E_V53_9, VARIABLES_HASTA_3E,
    VARIABLES_HASTA_3F_V54, VARIABLES_HASTA_3F_V55, VARIABLES_HASTA_3F_V56, VARIABLES_HASTA_3F,
    VARIABLES_HASTA_3G_V57, VARIABLES_HASTA_3G_V58, VARIABLES_HASTA_3G_V59, VARIABLES_HASTA_3G_V60, VARIABLES_HASTA_3G,
    VARIABLES_HASTA_3H_V61, VARIABLES_HASTA_3H_V62, VARIABLES_HASTA_3H_V63, VARIABLES_HASTA_3H_V64, VARIABLES_HASTA_3H_V65,
    VARIABLES_HASTA_3H_V66, VARIABLES_HASTA_3H_V66_1, VARIABLES_HASTA_3H_V66_2, VARIABLES_HASTA_3H_V66_3, VARIABLES_HASTA_3H_V66_4, VARIABLES_HASTA_3H_V66_5, VARIABLES_HASTA_3H_V66_6, VARIABLES_HASTA_3H_V66_7, VARIABLES_HASTA_3H_V66_8, VARIABLES_HASTA_3H_V66_9, VARIABLES_HASTA_3H,
    VARIABLES_HASTA_3I_V67, VARIABLES_HASTA_3I_V68, VARIABLES_HASTA_3I_V69, VARIABLES_HASTA_3I,
    VARIABLES_HASTA_3J_V70, VARIABLES_HASTA_3J_V71, VARIABLES_HASTA_3J_V72, VARIABLES_HASTA_3J_V73, VARIABLES_HASTA_3J, VARIABLES_HASTA_3K_V74, VARIABLES_HASTA_3K_V75, VARIABLES_HASTA_3K_V76, VARIABLES_HASTA_3K_V77, VARIABLES_HASTA_3K_V78, VARIABLES_HASTA_3K_V79, VARIABLES_HASTA_3K_V80, VARIABLES_HASTA_3K_V81, VARIABLES_HASTA_3K_V82, VARIABLES_HASTA_3K_V83, VARIABLES_HASTA_3K,
    VARIABLES_ESPERADAS,
    MAPA_ENCABEZADOS,
    MAPA_ENCABEZADOS_SPRINT_1: MAPA_ENCABEZADOS,
    limpiarEncabezado,
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
    validarEstructuraSprint3D,
    validarEstructuraSprint3I,
    esEncabezadoV66: crearFuncionEncabezado('V66'),
    esEncabezadoV66_1: crearFuncionEncabezado('V66_1'),
    esEncabezadoV66_2: crearFuncionEncabezado('V66_2'),
    esEncabezadoV66_3: crearFuncionEncabezado('V66_3'),
    esEncabezadoV66_4: crearFuncionEncabezado('V66_4'),
    esEncabezadoV66_5: crearFuncionEncabezado('V66_5'),
    esEncabezadoV66_6: crearFuncionEncabezado('V66_6'),
    esEncabezadoV66_7: crearFuncionEncabezado('V66_7'),
    esEncabezadoV66_8: crearFuncionEncabezado('V66_8'),
    esEncabezadoV66_9: crearFuncionEncabezado('V66_9'),
    esEncabezadoV67: crearFuncionEncabezado('V67'),
    esEncabezadoV68: crearFuncionEncabezado('V68'),
    esEncabezadoV69: crearFuncionEncabezado('V69'),
    esEncabezadoV70: crearFuncionEncabezado('V70'),
    esEncabezadoV71: crearFuncionEncabezado('V71'),
    esEncabezadoV72: crearFuncionEncabezado('V72'),
    esEncabezadoV73: crearFuncionEncabezado('V73'),
    esEncabezadoV74: crearFuncionEncabezado('V74'),
    esEncabezadoV75: crearFuncionEncabezado('V75'),
    esEncabezadoV76: crearFuncionEncabezado('V76'),
    esEncabezadoV77: crearFuncionEncabezado('V77'),
    esEncabezadoV78: crearFuncionEncabezado('V78'),
    esEncabezadoV79: crearFuncionEncabezado('V79'),
    esEncabezadoV80: crearFuncionEncabezado('V80'),
    esEncabezadoV81: crearFuncionEncabezado('V81'),
    esEncabezadoV82: crearFuncionEncabezado('V82'),
    esEncabezadoV83: crearFuncionEncabezado('V83')
  };
})();
