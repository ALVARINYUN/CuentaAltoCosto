(function () {
  'use strict';

  const VERSION = 'sprint-3n-v124-estructura-01';

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
  const VARIABLES_SPRINT_3K = ['V74', 'V75', 'V76', 'V77', 'V78', 'V79', 'V80', 'V81', 'V82', 'V83', 'V84', 'V85'];
  const VARIABLES_SPRINT_3L = ['V86', 'V87', 'V88', 'V89', 'V90', 'V91', 'V92', 'V93', 'V94', 'V95', 'V96', 'V97', 'V98', 'V99', 'V100', 'V101', 'V102', 'V103', 'V104', 'V105'];
  const VARIABLES_SPRINT_3M = ['V106', 'V107', 'V108', 'V109', 'V110'];
  const VARIABLES_SPRINT_3N = ['V111', 'V112', 'V113', 'V114', 'V114_1', 'V114_2', 'V114_3', 'V114_4', 'V114_5', 'V114_6', 'V115', 'V116', 'V117', 'V118', 'V119', 'V120', 'V121', 'V122', 'V123', 'V124'];

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
  const VARIABLES_HASTA_3K_V84 = [...VARIABLES_HASTA_3K_V83, 'V84'];
  const VARIABLES_HASTA_3K_V85 = [...VARIABLES_HASTA_3K_V84, 'V85'];
  const VARIABLES_HASTA_3K = VARIABLES_HASTA_3K_V85;
  const VARIABLES_HASTA_3L_V86 = [...VARIABLES_HASTA_3K_V85, 'V86'];
  const VARIABLES_HASTA_3L_V87 = [...VARIABLES_HASTA_3L_V86, 'V87'];
  const VARIABLES_HASTA_3L_V88 = [...VARIABLES_HASTA_3L_V87, 'V88'];
  const VARIABLES_HASTA_3L_V89 = [...VARIABLES_HASTA_3L_V88, 'V89'];
  const VARIABLES_HASTA_3L_V90 = [...VARIABLES_HASTA_3L_V89, 'V90'];
  const VARIABLES_HASTA_3L_V91 = [...VARIABLES_HASTA_3L_V90, 'V91'];
  const VARIABLES_HASTA_3L_V92 = [...VARIABLES_HASTA_3L_V91, 'V92'];
  const VARIABLES_HASTA_3L_V93 = [...VARIABLES_HASTA_3L_V92, 'V93'];
  const VARIABLES_HASTA_3L_V94 = [...VARIABLES_HASTA_3L_V93, 'V94'];
  const VARIABLES_HASTA_3L_V95 = [...VARIABLES_HASTA_3L_V94, 'V95'];
  const VARIABLES_HASTA_3L_V96 = [...VARIABLES_HASTA_3L_V95, 'V96'];
  const VARIABLES_HASTA_3L_V97 = [...VARIABLES_HASTA_3L_V96, 'V97'];
  const VARIABLES_HASTA_3L_V98 = [...VARIABLES_HASTA_3L_V97, 'V98'];
  const VARIABLES_HASTA_3L_V99 = [...VARIABLES_HASTA_3L_V98, 'V99'];
  const VARIABLES_HASTA_3L_V100 = [...VARIABLES_HASTA_3L_V99, 'V100'];
  const VARIABLES_HASTA_3L_V101 = [...VARIABLES_HASTA_3L_V100, 'V101'];
  const VARIABLES_HASTA_3L_V102 = [...VARIABLES_HASTA_3L_V101, 'V102'];
  const VARIABLES_HASTA_3L_V103 = [...VARIABLES_HASTA_3L_V102, 'V103'];
  const VARIABLES_HASTA_3L_V104 = [...VARIABLES_HASTA_3L_V103, 'V104'];
  const VARIABLES_HASTA_3L_V105 = [...VARIABLES_HASTA_3L_V104, 'V105'];
  const VARIABLES_HASTA_3L = VARIABLES_HASTA_3L_V105;
  const VARIABLES_HASTA_3M_V106 = [...VARIABLES_HASTA_3L_V105, 'V106'];
  const VARIABLES_HASTA_3M_V107 = [...VARIABLES_HASTA_3M_V106, 'V107'];
  const VARIABLES_HASTA_3M_V108 = [...VARIABLES_HASTA_3M_V107, 'V108'];
  const VARIABLES_HASTA_3M_V109 = [...VARIABLES_HASTA_3M_V108, 'V109'];
  const VARIABLES_HASTA_3M_V110 = [...VARIABLES_HASTA_3M_V109, 'V110'];
  const VARIABLES_HASTA_3M = VARIABLES_HASTA_3M_V110;
  const VARIABLES_HASTA_3N_V111 = [...VARIABLES_HASTA_3M_V110, 'V111'];
  const VARIABLES_HASTA_3N_V112 = [...VARIABLES_HASTA_3N_V111, 'V112'];
  const VARIABLES_HASTA_3N_V113 = [...VARIABLES_HASTA_3N_V112, 'V113'];
  const VARIABLES_HASTA_3N_V114 = [...VARIABLES_HASTA_3N_V113, 'V114'];
  const VARIABLES_HASTA_3N_V114_1 = [...VARIABLES_HASTA_3N_V114, 'V114_1'];
  const VARIABLES_HASTA_3N_V114_2 = [...VARIABLES_HASTA_3N_V114_1, 'V114_2'];
  const VARIABLES_HASTA_3N_V114_3 = [...VARIABLES_HASTA_3N_V114_2, 'V114_3'];
  const VARIABLES_HASTA_3N_V114_4 = [...VARIABLES_HASTA_3N_V114_3, 'V114_4'];
  const VARIABLES_HASTA_3N_V114_5 = [...VARIABLES_HASTA_3N_V114_4, 'V114_5'];
  const VARIABLES_HASTA_3N_V114_6 = [...VARIABLES_HASTA_3N_V114_5, 'V114_6'];
  const VARIABLES_HASTA_3N_V115 = [...VARIABLES_HASTA_3N_V114_6, 'V115'];
  const VARIABLES_HASTA_3N_V116 = [...VARIABLES_HASTA_3N_V115, 'V116'];
  const VARIABLES_HASTA_3N_V117 = [...VARIABLES_HASTA_3N_V116, 'V117'];
  const VARIABLES_HASTA_3N_V118 = [...VARIABLES_HASTA_3N_V117, 'V118'];
  const VARIABLES_HASTA_3N_V119 = [...VARIABLES_HASTA_3N_V118, 'V119'];
  const VARIABLES_HASTA_3N_V120 = [...VARIABLES_HASTA_3N_V119, 'V120'];
  const VARIABLES_HASTA_3N_V121 = [...VARIABLES_HASTA_3N_V120, 'V121'];
  const VARIABLES_HASTA_3N_V122 = [...VARIABLES_HASTA_3N_V121, 'V122'];
  const VARIABLES_HASTA_3N_V123 = [...VARIABLES_HASTA_3N_V122, 'V123'];
  const VARIABLES_HASTA_3N_V124 = [...VARIABLES_HASTA_3N_V123, 'V124'];
  const VARIABLES_HASTA_3N = VARIABLES_HASTA_3N_V124;
  const VARIABLES_ESPERADAS = VARIABLES_HASTA_3N_V124;

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
    v83codigodeultimacirugia: 'V83',
    v84ubicacintemporaldeestaltimaci: 'V84',
    v84ubicaciontemporaldeestaultimacirugia: 'V84',
    v84ubicaciontemporaldelaultimacirugia: 'V84',
    v84ubicaciontemporalultimacirugia: 'V84',
    v84ubicacionultima: 'V84',
    v85estadovitalalfinalizarlanicao: 'V85',
    v85estadovitalalfinalizarlaunicao: 'V85',
    v85estadovitalalfinalizarlaunicaoultima: 'V85',
    v85estadovitalalfinalizarunicaoultimacirugia: 'V85',
    v85estadovitalcirugia: 'V85',
    v86recibielusuarioalgntipoderadi: 'V86',
    v86recibioelusuarioalguntipoderadioterapia: 'V86',
    v86recibielusuarioalguntipoderadioterapia: 'V86',
    v86radioterapia: 'V86',
    v86recibioradioterapia: 'V86',
    v87nmerodeesquemasderadioterapia: 'V87',
    v87numerodeesquemasderadioterapia: 'V87',
    v87numerosesionesradioterapia: 'V87',
    v87numerodesesionesderadioterapia: 'V87',
    v87numerodesesionesradioterapia: 'V87',
    v88fechadeiniciodeprimeronicoesq: 'V88',
    v88fechadeiniciodeprimerounicoesq: 'V88',
    v88fechadeinicioprimeronicoesquema: 'V88',
    v88fechadeinicioprimerounicoesquema: 'V88',
    v88fechainicioprimerounicoesquemaradioterapia: 'V88',
    v88fechainicioprimeronicoesquemaradioterapia: 'V88',
    v89ubicacintemporaldelprimeronic: 'V89',
    v89ubicaciontemporaldelprimerunico: 'V89',
    v89ubicaciontemporaldelprimerounico: 'V89',
    v89ubicaciontemporalprimerounicoesquema: 'V89',
    v89ubicaciontemporalprimeroounicoesquema: 'V89',
    v89ubicaciontemporalradioterapia: 'V89',
    v90tipoderadioterapiaaplicadaene: 'V90',
    v90tipoderadioterapiaaplicadaenesteprimerounicoesquema: 'V90',
    v90tiporadioterapiaaplicada: 'V90',
    v90codigocupsradioterapia: 'V90',
    v90cupsradioterapia: 'V90',
    v91nmerodeipsquesuministranestep: 'V91',
    v91numerodeipsquesuministranestep: 'V91',
    v91numerodeipsquesuministranesteprimerounicoesquema: 'V91',
    v92cdigodelaips1quesuministralar: 'V92',
    v92codigodelaips1quesuministralar: 'V92',
    v92codigodelaips1quesuministraradioterapia: 'V92',
    v92codigoips1radioterapia: 'V92',
    v93cdigodelaips2quesuministralar: 'V93',
    v93codigodelaips2quesuministralar: 'V93',
    v93codigodelaips2quesuministraradioterapia: 'V93',
    v93codigoips2radioterapia: 'V93',
    v94fechadefinalizacindeprimeroni: 'V94',
    v94fechadefinalizaciondeprimeroni: 'V94',
    v94fechafinalizacionprimerunicoesquema: 'V94',
    v94fechafinalizacionradioterapia: 'V94',
    v95caractersticasactualesdeestep: 'V95',
    v95caracteristicasactualesdeestep: 'V95',
    v95caracteristicasactualesradioterapia: 'V95',
    v95caracteristicasesquemaradioterapia: 'V95',
    v96motivofinalizacinprimeronicoe: 'V96',
    v96motivofinalizacionprimeronicoe: 'V96',
    v96motivodefinalizacionprimeronicoesquema: 'V96',
    v96motivofinalizacionradioterapia: 'V96',
    v97fechadeiniciodelltimoesquemad: 'V97',
    v97fechadeiniciodelultimoesquemad: 'V97',
    v97fechadeinicioultimoesquema: 'V97',
    v97fechainicioultimoesquemaradioterapia: 'V97',
    v97fechainicioradioterapiaultimoesquema: 'V97',
    v98ubicacintemporaldelltimoesque: 'V98',
    v98ubicaciontemporaldelultimoesque: 'V98',
    v98ubicacintemporalintencindelltimoesque: 'V98',
    v98ubicaciontemporalintenciondelultimoesque: 'V98',
    v99tiporadioterapiaaplicadaenlti: 'V99',
    v99tipoderadioterapiaaplicadaenelultimoesquema: 'V99',
    v99tiporadioterapiaultimoesquema: 'V99',
    v99cupsradioterapiaultimoesquema: 'V99',
    v99codigocupsradioterapiaultimoesquema: 'V99',
    v100ipsquesuministranltimoesquem: 'V100',
    v100numeroipsquesuministranultimoesquema: 'V100',
    v100nmerodeipsquesuministranultimoesquema: 'V100',
    v100ipsultimoesquemaradioterapia: 'V100',
    v100numeroipsultimoesquema: 'V100',
    v101cdigodelaips1quesuministrala: 'V101',
    v101codigoips1quesuministraultimoesquema: 'V101',
    v101codigoips1ultimoesquemaradioterapia: 'V101',
    v101codigoips1radioterapiaultimoesquema: 'V101',
    v101ips1quesuministraultimoesquema: 'V101',
    v102cdigodelaips2quesuministrala: 'V102',
    v102codigoips2quesuministraultimoesquema: 'V102',
    v102codigoips2ultimoesquemaradioterapia: 'V102',
    v102codigoips2radioterapiaultimoesquema: 'V102',
    v102ips2quesuministraultimoesquema: 'V102',
    v103fechadefinalizacindelltimoes: 'V103',
    v103fechadefinalizaciondelultimoes: 'V103',
    v103fechafinalizacionultimoesquemaradioterapia: 'V103',
    v103fechadefinalizacionultimoesquemaradioterapia: 'V103',
    v103fechafinalizacionradioterapiaultimoesquema: 'V103',
    v104caractersticasactualesdeeste: 'V104',
    v104caracteristicasactualesdeeste: 'V104',
    v104caracteristicasactualesultimoesquema: 'V104',
    v104caracteristicasactualesultimoesquemaradioterapia: 'V104',
    v104caracteristicasactualesradioterapiaultimoesquema: 'V104',
    v105motivofinalizacinltimoesquem: 'V105',
    v105motivofinalizacionultimoesquem: 'V105',
    v105motivofinalizacionultimoesquema: 'V105',
    v105motivofinalizacionradioterapiaultimoesquema: 'V105',
    v105motivofinalizaciondeltimoesquema: 'V105',
    v106recibitrasplantedeclulasprog: 'V106',
    v106recibiotrasplantedeclulasprog: 'V106',
    v106recibitrasplantedecelulasprog: 'V106',
    v106recibiotrasplantedecelulasprog: 'V106',
    v106recibiotrasplantedecelulasprogenitorashematopoyeticas: 'V106',
    v106recibitrasplantedecelulasprogenitorashematopoyeticas: 'V106',
    v106trasplantecelulasprogenitorashematopoyeticas: 'V106',
    v107tipodetrasplanterecibido: 'V107',
    v107tipotrasplanterecibido: 'V107',
    v107tipodetrasplante: 'V107',
    v107trasplanterecibido: 'V107',
    v108ubicacintemporaldeestetraspl: 'V108',
    v108ubicaciontemporaldeestetraspl: 'V108',
    v108ubicacintemporaldeestetrasplante: 'V108',
    v108ubicaciontemporaldeestetrasplante: 'V108',
    v108ubicaciontemporaltrasplante: 'V108',
    v108ubicaciontemporaldetrasplante: 'V108',
    v109fechadetrasplante: 'V109',
    v109fechatrasplante: 'V109',
    v109fechadeltrasplante: 'V109',
    v109fechaderealizaciondeltrasplante: 'V109',
    v110cdigodelaipsquerealizestetra: 'V110',
    v110codigodelaipsquerealizestetra: 'V110',
    v110cdigodelaipsquerealizestetrasplante: 'V110',
    v110codigodelaipsquerealizestetrasplante: 'V110',
    v110codigoipsrealizotrasplante: 'V110',
    v110codigoipsquerealizotrasplante: 'V110',
    v110ipsrealizotrasplante: 'V110',
    v111elusuariorecibicirugareconst: 'V111',
    v111recibiocirugiareconstructiva: 'V111',
    v111cirugiareconstructiva: 'V111',
    v111elusuariorecibiocirugiareconstructiva: 'V111',
    v112fechadelaciruga: 'V112',
    v112fechacirugiareconstructiva: 'V112',
    v113cdigodelaipsquerealizcirugar: 'V113',
    v113codigoipsrealizocirugiareconstructiva: 'V113',
    v113ipsrealizocirugiareconstructiva: 'V113',
    v114valoradoenconsoproccuidadopa: 'V114',
    v114valoradoenconsultaprocedimientocuidadopaliativo: 'V114',
    v114cuidadopaliativo: 'V114',
    v1141recibiconsoprocpaliativopor: 'V114_1',
    v1141recibioconsultaprocedimientopaliativopormedico: 'V114_1',
    v1141cuidadopaliativomedico: 'V114_1',
    v1142recibiconsoprocpaliativopor: 'V114_2',
    v1142recibioconsultaprocedimientopaliativopornomedico: 'V114_2',
    v1142cuidadopaliativonomedico: 'V114_2',
    v1143recibiconsoprocpaliativopor: 'V114_3',
    v1143recibioconsultaprocedimientopaliativopormedicootraespecialidad: 'V114_3',
    v1143cuidadopaliativomedicootraespecialidad: 'V114_3',
    v1144recibiconsoprocpaliativopor: 'V114_4',
    v1144recibioconsultaprocedimientopaliativopormedicogeneral: 'V114_4',
    v1144cuidadopaliativomedicogeneral: 'V114_4',
    v1145recibiconsoprocpaliativopor: 'V114_5',
    v1145recibioconsultaprocedimientopaliativoportrabajosocial: 'V114_5',
    v1145cuidadopaliativotrabajosocial: 'V114_5',
    v1146recibiconsoprocpaliativopor: 'V114_6',
    v1146recibioconsultaprocedimientopaliativoporotroprofesional: 'V114_6',
    v1146cuidadopaliativootroprofesionalnoespecializado: 'V114_6',
    v115fechadeprimeraconsultaoproce: 'V115',
    v115fechadeprimeraconsultaprocedimientocuidadopaliativo: 'V115',
    v115fechaprimeraconsultacuidadopaliativo: 'V115',
    v116cdigodelaipsdonderecibilapri: 'V116',
    v116codigodelaipsdonderecibelaatencioncuidadopaliativo: 'V116',
    v116codigoipscuidadopaliativo: 'V116',
    v117hasidovaloradoelusuarioporel: 'V117',
    v117psiquiatria: 'V117',
    v117valoracionpsiquiatria: 'V117',
    v118fechadeprimeraconsultaconels: 'V118',
    v118fechaprimeraconsultapsiquiatria: 'V118',
    v118primeraconsultapsiquiatria: 'V118',
    v119cdigodelaipsdonderecibilapri: 'V119',
    v119codigoipspsiquiatria: 'V119',
    v119ipspsiquiatria: 'V119',
    v120fuevaloradoelusuarioporprofe: 'V120',
    v120nutricion: 'V120',
    v120valoracionnutricion: 'V120',
    v121fechadeconsultainicialconnut: 'V121',
    v121fechaconsultainicialnutricion: 'V121',
    v121consultainicialnutricion: 'V121',
    v122cdigodelaipsdonderecibilaval: 'V122',
    v122codigodelaipsdonderecibiolavaloracionnutricion: 'V122',
    v122codigoipsnutricion: 'V122',
    v122ipsnutricion: 'V122',
    v123elusuariorecibisoportenutric: 'V123',
    v123elusuariorecibiosoportenutricional: 'V123',
    v123soportenutricional: 'V123',
    v123soporteenteralparenteral: 'V123',
    v124elusuarioharecibidoterapiasc: 'V124',
    v124terapiascomplementariasrehabilitacion: 'V124',
    v124terapiafisicalenguajeocupacional: 'V124',
    v91numeroipsradioterapia: 'V91',
    v91ipsradioterapia: 'V91'
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
    ['V124', 'ACUMULATIVO_V1_V124', VARIABLES_HASTA_3N_V124],
    ['V123', 'ACUMULATIVO_V1_V123', VARIABLES_HASTA_3N_V123],
    ['V122', 'ACUMULATIVO_V1_V122', VARIABLES_HASTA_3N_V122],
    ['V121', 'ACUMULATIVO_V1_V121', VARIABLES_HASTA_3N_V121],
    ['V120', 'ACUMULATIVO_V1_V120', VARIABLES_HASTA_3N_V120],
    ['V119', 'ACUMULATIVO_V1_V119', VARIABLES_HASTA_3N_V119],
    ['V118', 'ACUMULATIVO_V1_V118', VARIABLES_HASTA_3N_V118],
    ['V117', 'ACUMULATIVO_V1_V117', VARIABLES_HASTA_3N_V117],
    ['V116', 'ACUMULATIVO_V1_V116', VARIABLES_HASTA_3N_V116],
    ['V115', 'ACUMULATIVO_V1_V115', VARIABLES_HASTA_3N_V115],
    ['V114_6', 'ACUMULATIVO_V1_V114_6', VARIABLES_HASTA_3N_V114_6],
    ['V114_5', 'ACUMULATIVO_V1_V114_5', VARIABLES_HASTA_3N_V114_5],
    ['V114_4', 'ACUMULATIVO_V1_V114_4', VARIABLES_HASTA_3N_V114_4],
    ['V114_3', 'ACUMULATIVO_V1_V114_3', VARIABLES_HASTA_3N_V114_3],
    ['V114_2', 'ACUMULATIVO_V1_V114_2', VARIABLES_HASTA_3N_V114_2],
    ['V114_1', 'ACUMULATIVO_V1_V114_1', VARIABLES_HASTA_3N_V114_1],
    ['V114', 'ACUMULATIVO_V1_V114', VARIABLES_HASTA_3N_V114],
    ['V113', 'ACUMULATIVO_V1_V113', VARIABLES_HASTA_3N_V113],
    ['V112', 'ACUMULATIVO_V1_V112', VARIABLES_HASTA_3N_V112],
    ['V111', 'ACUMULATIVO_V1_V111', VARIABLES_HASTA_3N_V111],
    ['V110', 'ACUMULATIVO_V1_V110', VARIABLES_HASTA_3M_V110],
    ['V109', 'ACUMULATIVO_V1_V109', VARIABLES_HASTA_3M_V109],
    ['V108', 'ACUMULATIVO_V1_V108', VARIABLES_HASTA_3M_V108],
    ['V107', 'ACUMULATIVO_V1_V107', VARIABLES_HASTA_3M_V107],
    ['V106', 'ACUMULATIVO_V1_V106', VARIABLES_HASTA_3M_V106],
    ['V105', 'ACUMULATIVO_V1_V105', VARIABLES_HASTA_3L_V105],
    ['V104', 'ACUMULATIVO_V1_V104', VARIABLES_HASTA_3L_V104],
    ['V103', 'ACUMULATIVO_V1_V103', VARIABLES_HASTA_3L_V103],
    ['V102', 'ACUMULATIVO_V1_V102', VARIABLES_HASTA_3L_V102],
    ['V101', 'ACUMULATIVO_V1_V101', VARIABLES_HASTA_3L_V101],
    ['V100', 'ACUMULATIVO_V1_V100', VARIABLES_HASTA_3L_V100],
    ['V99', 'ACUMULATIVO_V1_V99', VARIABLES_HASTA_3L_V99],
    ['V98', 'ACUMULATIVO_V1_V98', VARIABLES_HASTA_3L_V98],
    ['V97', 'ACUMULATIVO_V1_V97', VARIABLES_HASTA_3L_V97],
    ['V96', 'ACUMULATIVO_V1_V96', VARIABLES_HASTA_3L_V96],
    ['V95', 'ACUMULATIVO_V1_V95', VARIABLES_HASTA_3L_V95],
    ['V94', 'ACUMULATIVO_V1_V94', VARIABLES_HASTA_3L_V94],
    ['V93', 'ACUMULATIVO_V1_V93', VARIABLES_HASTA_3L_V93],
    ['V92', 'ACUMULATIVO_V1_V92', VARIABLES_HASTA_3L_V92],
    ['V91', 'ACUMULATIVO_V1_V91', VARIABLES_HASTA_3L_V91],
    ['V90', 'ACUMULATIVO_V1_V90', VARIABLES_HASTA_3L_V90],
    ['V89', 'ACUMULATIVO_V1_V89', VARIABLES_HASTA_3L_V89],
    ['V88', 'ACUMULATIVO_V1_V88', VARIABLES_HASTA_3L_V88],
    ['V87', 'ACUMULATIVO_V1_V87', VARIABLES_HASTA_3L_V87],
    ['V86', 'ACUMULATIVO_V1_V86', VARIABLES_HASTA_3L_V86],
    ['V85', 'ACUMULATIVO_V1_V85', VARIABLES_HASTA_3K_V85],
    ['V84', 'ACUMULATIVO_V1_V84', VARIABLES_HASTA_3K_V84],
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
    VARIABLES_SPRINT_3A, VARIABLES_SPRINT_3B, VARIABLES_SPRINT_3C, VARIABLES_SPRINT_3D, VARIABLES_SPRINT_3E, VARIABLES_SPRINT_3F, VARIABLES_SPRINT_3G, VARIABLES_SPRINT_3H, VARIABLES_SPRINT_3H_MODULO15, VARIABLES_SPRINT_3I, VARIABLES_SPRINT_3J, VARIABLES_SPRINT_3K, VARIABLES_SPRINT_3L, VARIABLES_SPRINT_3M, VARIABLES_SPRINT_3N,
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
    VARIABLES_HASTA_3J_V70, VARIABLES_HASTA_3J_V71, VARIABLES_HASTA_3J_V72, VARIABLES_HASTA_3J_V73, VARIABLES_HASTA_3J, VARIABLES_HASTA_3K_V74, VARIABLES_HASTA_3K_V75, VARIABLES_HASTA_3K_V76, VARIABLES_HASTA_3K_V77, VARIABLES_HASTA_3K_V78, VARIABLES_HASTA_3K_V79, VARIABLES_HASTA_3K_V80, VARIABLES_HASTA_3K_V81, VARIABLES_HASTA_3K_V82, VARIABLES_HASTA_3K_V83, VARIABLES_HASTA_3K_V84, VARIABLES_HASTA_3K_V85, VARIABLES_HASTA_3K, VARIABLES_HASTA_3L_V86, VARIABLES_HASTA_3L_V87, VARIABLES_HASTA_3L_V88, VARIABLES_HASTA_3L_V89, VARIABLES_HASTA_3L_V90, VARIABLES_HASTA_3L_V91, VARIABLES_HASTA_3L_V92, VARIABLES_HASTA_3L_V93, VARIABLES_HASTA_3L_V94, VARIABLES_HASTA_3L_V95, VARIABLES_HASTA_3L_V96, VARIABLES_HASTA_3L_V97, VARIABLES_HASTA_3L_V98, VARIABLES_HASTA_3L_V99, VARIABLES_HASTA_3L_V100, VARIABLES_HASTA_3L_V101, VARIABLES_HASTA_3L_V102, VARIABLES_HASTA_3L_V103, VARIABLES_HASTA_3L_V104, VARIABLES_HASTA_3L_V105, VARIABLES_HASTA_3L, VARIABLES_HASTA_3M_V106, VARIABLES_HASTA_3M_V107, VARIABLES_HASTA_3M_V108, VARIABLES_HASTA_3M_V109, VARIABLES_HASTA_3M_V110, VARIABLES_HASTA_3M, VARIABLES_HASTA_3N_V111, VARIABLES_HASTA_3N_V112, VARIABLES_HASTA_3N_V113, VARIABLES_HASTA_3N_V114, VARIABLES_HASTA_3N_V114_1, VARIABLES_HASTA_3N_V114_2, VARIABLES_HASTA_3N_V114_3, VARIABLES_HASTA_3N_V114_4, VARIABLES_HASTA_3N_V114_5, VARIABLES_HASTA_3N_V114_6, VARIABLES_HASTA_3N_V115, VARIABLES_HASTA_3N_V116, VARIABLES_HASTA_3N_V117, VARIABLES_HASTA_3N_V118, VARIABLES_HASTA_3N_V119, VARIABLES_HASTA_3N_V120, VARIABLES_HASTA_3N_V121, VARIABLES_HASTA_3N_V122, VARIABLES_HASTA_3N_V123, VARIABLES_HASTA_3N_V124, VARIABLES_HASTA_3N,
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
    esEncabezadoV83: crearFuncionEncabezado('V83'),
    esEncabezadoV84: crearFuncionEncabezado('V84'),
    esEncabezadoV85: crearFuncionEncabezado('V85'),
    esEncabezadoV86: crearFuncionEncabezado('V86'),
    esEncabezadoV87: crearFuncionEncabezado('V87'),
    esEncabezadoV88: crearFuncionEncabezado('V88'),
    esEncabezadoV89: crearFuncionEncabezado('V89'),
    esEncabezadoV90: crearFuncionEncabezado('V90'),
    esEncabezadoV91: crearFuncionEncabezado('V91'),
    esEncabezadoV92: crearFuncionEncabezado('V92'),
    esEncabezadoV93: crearFuncionEncabezado('V93'),
    esEncabezadoV94: crearFuncionEncabezado('V94'),
    esEncabezadoV95: crearFuncionEncabezado('V95'),
    esEncabezadoV96: crearFuncionEncabezado('V96'),
    esEncabezadoV97: crearFuncionEncabezado('V97'),
    esEncabezadoV98: crearFuncionEncabezado('V98'),
    esEncabezadoV99: crearFuncionEncabezado('V99'),
    esEncabezadoV100: crearFuncionEncabezado('V100'),
    esEncabezadoV101: crearFuncionEncabezado('V101'),
    esEncabezadoV102: crearFuncionEncabezado('V102'),
    esEncabezadoV103: crearFuncionEncabezado('V103'),
    esEncabezadoV104: crearFuncionEncabezado('V104'),
    esEncabezadoV105: crearFuncionEncabezado('V105'),
    esEncabezadoV106: crearFuncionEncabezado('V106'),
    esEncabezadoV107: crearFuncionEncabezado('V107'),
    esEncabezadoV108: crearFuncionEncabezado('V108'),
    esEncabezadoV109: crearFuncionEncabezado('V109'),
    esEncabezadoV110: crearFuncionEncabezado('V110'),
    esEncabezadoV111: crearFuncionEncabezado('V111'),
    esEncabezadoV112: crearFuncionEncabezado('V112'),
    esEncabezadoV113: crearFuncionEncabezado('V113'),
    esEncabezadoV114: crearFuncionEncabezado('V114'),
    esEncabezadoV114_1: crearFuncionEncabezado('V114_1'),
    esEncabezadoV114_2: crearFuncionEncabezado('V114_2'),
    esEncabezadoV114_3: crearFuncionEncabezado('V114_3'),
    esEncabezadoV114_4: crearFuncionEncabezado('V114_4'),
    esEncabezadoV114_5: crearFuncionEncabezado('V114_5'),
    esEncabezadoV114_6: crearFuncionEncabezado('V114_6'),
    esEncabezadoV115: crearFuncionEncabezado('V115'),
    esEncabezadoV116: crearFuncionEncabezado('V116'),
    esEncabezadoV117: crearFuncionEncabezado('V117'),
    esEncabezadoV118: crearFuncionEncabezado('V118'),
    esEncabezadoV119: crearFuncionEncabezado('V119'),
    esEncabezadoV120: crearFuncionEncabezado('V120'),
    esEncabezadoV121: crearFuncionEncabezado('V121'),
    esEncabezadoV122: crearFuncionEncabezado('V122'),
    esEncabezadoV123: crearFuncionEncabezado('V123'),
    esEncabezadoV124: crearFuncionEncabezado('V124')
  };
})();
