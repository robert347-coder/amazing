/* =========================================================================
   AMAZING TEA · recetas.js
   -------------------------------------------------------------------------
   Aquí están las 100 recetas. Es el único archivo que tienes que tocar para
   añadir, quitar o corregir recetas. Cada receta es un bloque { ... } con
   estos campos:

     id     identificador único, sin espacios ni tildes (no lo cambies luego:
            los favoritos y los sellos del pasaporte se guardan con él)
     n      nombre que se ve en la app
     p      país o región de origen (debe existir en BANDERAS, al final)
     t      tipo: "caliente" | "frio" | "especial" | "vitalidad"
     c      clase: "te" (planta del té, Camellia sinensis) | "infusion"
     caf    cafeína: "alta" | "media" | "baja" | "no"
     ef     efectos para los filtros: "energia", "relax", "dormir",
            "digestion", "hidratacion", "antojo"
     temp   temperatura del agua en ºC (0 si no aplica)
     seg    segundos del temporizador (0 = no hay temporizador; usa "espera")
     espera texto para esperas largas, p. ej. "4 h en la nevera"
     mom    (solo vitalidad) momento del día: "mañana" | "mediodía" |
            "tarde" | "noche"
     ing    ingredientes (para 1 taza o la cantidad que diga la receta)
     pasos  preparación, en orden
     hist   origen e historia
     para   para qué se toma tradicionalmente (sin promesas médicas)
     prec   precauciones (opcional)
     dato   dato curioso que se muestra mientras corre el temporizador

   AVISO: los usos son los tradicionales o populares. No son consejos
   médicos. Si tomas medicación, estás embarazada o tienes una enfermedad,
   consulta antes con tu médico o farmacéutico.
   ========================================================================= */

const RECETAS = [

  /* ===================== TÉS CALIENTES DEL MUNDO (25) ==================== */
  {
    id: "chai-masala", n: "Chai masala", p: "India", t: "caliente", c: "te", caf: "media",
    ef: ["energia", "digestion"], temp: 100, seg: 300,
    ing: ["250 ml de agua", "250 ml de leche", "2 cucharaditas de té negro (assam)", "4 vainas de cardamomo machacadas", "1 rama de canela", "3 clavos", "2 rodajas de jengibre fresco", "2 granos de pimienta negra", "Azúcar o miel al gusto"],
    pasos: ["Hierve el agua con todas las especias durante 5 minutos.", "Añade el té y deja hervir 2 minutos más.", "Incorpora la leche y lleva de nuevo a hervor, vigilando que no se salga.", "Cuela y endulza al gusto."],
    hist: "En la India «chai» significa simplemente «té». Los «chai wallahs» lo venden en estaciones y esquinas, servido en vasitos de barro o de cristal.",
    para: "Para entrar en calor y después de comer; el jengibre y el cardamomo se usan tradicionalmente para la digestión.",
    prec: "Lleva cafeína.",
    dato: "La India es uno de los mayores productores de té del mundo, y la mayor parte se la bebe su propia población."
  },
  {
    id: "te-moruno", n: "Té moruno con hierbabuena", p: "Marruecos", t: "caliente", c: "te", caf: "media",
    ef: ["digestion"], temp: 90, seg: 180,
    ing: ["1 cucharada de té verde gunpowder", "1 manojo de hierbabuena fresca", "750 ml de agua", "Azúcar (opcional)"],
    pasos: ["Pon el té en la tetera, añade un chorrito de agua hirviendo, agita y tira esa agua (así se «lava» el té y amarga menos).", "Añade la hierbabuena, el azúcar si lo usas y el agua a unos 90 ºC.", "Deja reposar 3 minutos.", "Sirve un vaso desde altura y devuélvelo a la tetera dos o tres veces para mezclar. Después sirve desde lo alto para que haga espuma."],
    hist: "Es el gesto de hospitalidad por excelencia en el Magreb. Se ofrece al invitado nada más llegar y rechazarlo puede parecer descortés.",
    para: "Para recibir visitas y después de las comidas, como digestivo.",
    prec: "Lleva cafeína. La versión tradicional lleva mucho azúcar: puedes reducirlo o quitarlo.",
    dato: "La espuma que se forma al servir desde altura se considera señal de un té bien preparado."
  },
  {
    id: "matcha", n: "Matcha tradicional", p: "Japón", t: "caliente", c: "te", caf: "alta",
    ef: ["energia"], temp: 80, seg: 20,
    ing: ["½ cucharadita (unos 2 g) de matcha", "70 ml de agua a 75–80 ºC"],
    pasos: ["Tamiza el matcha en un cuenco para que no queden grumos.", "Añade el agua (nunca hirviendo).", "Bate en zigzag con un batidor de bambú (chasen) o unas varillas pequeñas durante unos 20 segundos, hasta que salga espuma.", "Bébelo enseguida."],
    hist: "Los monjes zen lo usaban para mantenerse despiertos durante la meditación. De ahí nació la ceremonia del té japonesa (chanoyu).",
    para: "Para concentrarse: aporta cafeína junto con un aminoácido (L-teanina) que suaviza el «subidón».",
    prec: "Tiene bastante cafeína, porque te bebes la hoja entera molida. Mejor no tomarlo por la tarde.",
    dato: "Las plantas se cubren con sombra varias semanas antes de cosecharlas; por eso el matcha es de un verde tan intenso."
  },
  {
    id: "genmaicha", n: "Genmaicha (té con arroz tostado)", p: "Japón", t: "caliente", c: "te", caf: "baja",
    ef: ["digestion"], temp: 85, seg: 180,
    ing: ["1 cucharada de genmaicha", "250 ml de agua a 85 ºC"],
    pasos: ["Calienta el agua a unos 85 ºC.", "Vierte sobre el genmaicha y deja reposar 3 minutos.", "Cuela y sirve."],
    hist: "Es té verde mezclado con arroz tostado. Se cuenta que nació para estirar el té, que era caro; por eso le llaman «el té del pueblo».",
    para: "Para acompañar las comidas: su sabor tostado recuerda a las palomitas.",
    dato: "Algunos granos de arroz revientan al tostarse, igual que las palomitas de maíz."
  },
  {
    id: "hojicha", n: "Hojicha (té tostado)", p: "Japón", t: "caliente", c: "te", caf: "baja",
    ef: ["relax", "digestion"], temp: 95, seg: 60,
    ing: ["1 cucharada de hojicha", "250 ml de agua a 90–95 ºC"],
    pasos: ["Calienta el agua casi hasta hervir.", "Vierte sobre el té y deja reposar 1 minuto.", "Cuela y sirve."],
    hist: "Se creó en Kioto en el siglo XX tostando hojas de té verde en una olla de barro.",
    para: "Es un té suave y poco amargo, ideal para la tarde o la noche por su poca cafeína.",
    dato: "El tostado convierte el verde de la hoja en un marrón rojizo y le da aroma a caramelo."
  },
  {
    id: "sencha", n: "Sencha", p: "Japón", t: "caliente", c: "te", caf: "media",
    ef: ["energia", "digestion"], temp: 75, seg: 90,
    ing: ["1 cucharadita (3 g) de sencha", "250 ml de agua a 70–80 ºC"],
    pasos: ["Deja que el agua hervida se enfríe un par de minutos (o pásala de taza en taza).", "Vierte sobre el té y deja reposar 1 minuto y medio.", "Cuela y sirve. Puedes volver a infusionar las mismas hojas 2 o 3 veces."],
    hist: "Es el té más bebido en Japón, el de diario.",
    para: "Para acompañar comidas y como bebida refrescante y ligera.",
    prec: "Lleva cafeína. Con agua demasiado caliente amarga mucho.",
    dato: "Las mismas hojas aguantan dos o tres infusiones, y cada una sabe distinto."
  },
  {
    id: "te-leche-hong-kong", n: "Té con leche al estilo Hong Kong", p: "Hong Kong", t: "caliente", c: "te", caf: "alta",
    ef: ["energia"], temp: 100, seg: 300,
    ing: ["2 cucharadas de té negro fuerte (mezcla de Ceilán)", "300 ml de agua", "60 ml de leche evaporada", "Azúcar al gusto"],
    pasos: ["Hierve el té en el agua a fuego bajo durante 5 minutos.", "Cuélalo varias veces con un colador de tela o uno muy fino.", "Añade la leche evaporada y el azúcar."],
    hist: "Es una herencia británica adaptada en Hong Kong. Se le llama «té de media de seda» por el colador de tela con el que se cuela, que se tiñe de marrón.",
    para: "Para el desayuno o la merienda; da energía.",
    prec: "Mucha cafeína.",
    dato: "Hong Kong lo ha incluido en su inventario de patrimonio cultural inmaterial."
  },
  {
    id: "po-cha", n: "Po cha (té de mantequilla)", p: "Tíbet", t: "caliente", c: "te", caf: "media",
    ef: ["energia"], temp: 100, seg: 600,
    ing: ["2 cucharadas de té negro o pu-erh", "500 ml de agua", "1 cucharada de mantequilla", "1 pizca de sal", "100 ml de leche"],
    pasos: ["Hierve el té en el agua durante 10 minutos.", "Cuela.", "Pon el té en la batidora con la mantequilla, la sal y la leche y bate 30 segundos.", "Sirve caliente."],
    hist: "En el Tíbet, a gran altitud y con mucho frío, este té salado aporta calor y energía. Se toma muchas veces al día.",
    para: "Para entrar en calor en días muy fríos.",
    prec: "Tiene grasa y sal: no es una bebida para dieta ni para quien tenga la tensión alta.",
    dato: "Tradicionalmente se prepara con mantequilla de yak y se bate en un cilindro de madera."
  },
  {
    id: "te-ruso", n: "Té ruso con samovar y limón", p: "Rusia", t: "caliente", c: "te", caf: "media",
    ef: ["energia"], temp: 100, seg: 300,
    ing: ["2 cucharadas de té negro", "200 ml de agua hirviendo para el concentrado", "Agua caliente para rellenar", "Rodajas de limón", "Azúcar o mermelada (opcional)"],
    pasos: ["Prepara un té muy concentrado (zavarka): 2 cucharadas de té en 200 ml de agua hirviendo, 5 minutos.", "En cada taza pon un poco de concentrado y rellena con agua caliente hasta el color que te guste.", "Añade limón y, si quieres, azúcar o una cucharada de mermelada."],
    hist: "El samovar es un hervidor que mantiene el agua caliente todo el día, para servir té durante reuniones largas.",
    para: "Para sobremesas largas: cada uno lo toma tan fuerte o tan suave como quiere.",
    prec: "Lleva cafeína.",
    dato: "En Rusia es costumbre acompañarlo con mermelada (varenye) en un platito, a cucharadas."
  },
  {
    id: "te-ingles", n: "Té inglés con leche", p: "Reino Unido", t: "caliente", c: "te", caf: "alta",
    ef: ["energia"], temp: 100, seg: 240,
    ing: ["1 bolsita de English Breakfast", "250 ml de agua hirviendo", "Un chorrito de leche"],
    pasos: ["Vierte el agua hirviendo sobre la bolsita.", "Deja reposar 4 minutos.", "Retira la bolsita y añade la leche."],
    hist: "La costumbre del té de media tarde (afternoon tea) se atribuye a la duquesa de Bedford, en el siglo XIX, para matar el hambre antes de la cena.",
    para: "Para el desayuno o la merienda.",
    prec: "Mucha cafeína.",
    dato: "Los británicos llevan siglos discutiendo si la leche se echa antes o después del té."
  },
  {
    id: "cay-turco", n: "Çay turco", p: "Turquía", t: "caliente", c: "te", caf: "media",
    ef: ["energia", "digestion"], temp: 100, seg: 600,
    ing: ["2–3 cucharadas de té negro (de Rize)", "Agua", "Una tetera doble (çaydanlık) o un cazo con una tetera encima"],
    pasos: ["Llena de agua la tetera de abajo y pon el té seco en la de arriba.", "Cuando hierva, echa un poco de esa agua sobre el té y coloca la tetera pequeña encima, para que repose con el vapor durante 10–15 minutos.", "Sirve en vasos con un poco de concentrado y rellena con agua caliente."],
    hist: "Turquía está entre los países que más té beben por persona. Se ofrece en tiendas, oficinas y casas a todas horas.",
    para: "Para la hospitalidad y la conversación.",
    prec: "Lleva cafeína.",
    dato: "El color ideal se describe como «sangre de conejo»: un rojo intenso y transparente."
  },
  {
    id: "oolong-gongfu", n: "Oolong al estilo gongfu", p: "China", t: "caliente", c: "te", caf: "media",
    ef: ["relax", "digestion"], temp: 95, seg: 30,
    ing: ["5 g de oolong", "Una tetera pequeña (100–150 ml)", "Agua a 90–95 ºC"],
    pasos: ["Calienta la tetera con agua caliente y tírala.", "Pon el té, cubre con agua y tírala a los pocos segundos (enjuague).", "Haz infusiones cortas de 20–30 segundos y sírvelas en tacitas.", "Repite 5 o 6 veces, alargando cada infusión unos segundos."],
    hist: "Gongfu cha significa «té hecho con habilidad». Nace en el sur de China y en Taiwán.",
    para: "Para un rato de calma: el sabor cambia en cada infusión.",
    prec: "Lleva cafeína.",
    dato: "«Oolong» significa «dragón negro», por la forma retorcida de sus hojas."
  },
  {
    id: "pu-erh", n: "Pu-erh", p: "China", t: "caliente", c: "te", caf: "media",
    ef: ["digestion"], temp: 100, seg: 150,
    ing: ["5 g de pu-erh", "250 ml de agua hirviendo"],
    pasos: ["Enjuaga el té con agua hirviendo 10 segundos y tira el agua.", "Vuelve a cubrir con agua hirviendo y deja reposar 2–3 minutos.", "Cuela y sirve."],
    hist: "Procede de Yunnan. Se fermenta y envejece como el vino, y se prensa en tortas.",
    para: "Tradicionalmente se toma después de comidas copiosas.",
    prec: "Lleva cafeína.",
    dato: "Algunas tortas de pu-erh ganan valor con los años, igual que un buen vino."
  },
  {
    id: "bai-mu-dan", n: "Té blanco Bai Mu Dan", p: "China", t: "caliente", c: "te", caf: "baja",
    ef: ["relax"], temp: 85, seg: 210,
    ing: ["2 cucharadas de té blanco (las hojas abultan mucho)", "250 ml de agua a 80–85 ºC"],
    pasos: ["Calienta el agua sin que llegue a hervir.", "Vierte sobre el té y deja reposar 3–4 minutos.", "Cuela y sirve."],
    hist: "Procede de Fujian. Es el té menos procesado: las hojas solo se dejan marchitar y se secan.",
    para: "Es suave y delicado, para la tarde.",
    dato: "Bai Mu Dan significa «peonía blanca»."
  },
  {
    id: "te-jazmin", n: "Té de jazmín", p: "China", t: "caliente", c: "te", caf: "media",
    ef: ["relax", "digestion"], temp: 80, seg: 150,
    ing: ["1 cucharadita de té de jazmín", "250 ml de agua a 80 ºC"],
    pasos: ["Calienta el agua a unos 80 ºC.", "Vierte sobre el té y deja reposar 2–3 minutos.", "Cuela y sirve."],
    hist: "El té verde se aromatiza dejándolo varias noches junto a flores frescas de jazmín. Es típico de Fuzhou.",
    para: "Por su aroma, para relajarse y después de las comidas.",
    prec: "Lleva cafeína.",
    dato: "Las flores se recogen de día, cerradas, y se mezclan con el té por la noche, cuando se abren."
  },
  {
    id: "longjing", n: "Longjing (Pozo del Dragón)", p: "China", t: "caliente", c: "te", caf: "media",
    ef: ["energia"], temp: 80, seg: 120,
    ing: ["1 cucharada de longjing", "250 ml de agua a 80 ºC", "Un vaso de cristal"],
    pasos: ["Pon el té en un vaso de cristal.", "Añade el agua a 80 ºC.", "Espera 2 minutos y bebe sin colar, rellenando de agua cuando quede un tercio."],
    hist: "Es uno de los tés verdes más famosos de China, de Hangzhou. Sus hojas planas se tuestan a mano en un wok.",
    para: "Refrescante y ligero; típico de primavera.",
    prec: "Lleva cafeína.",
    dato: "Se prepara en vaso de cristal para ver cómo las hojas se hunden y suben."
  },
  {
    id: "darjeeling", n: "Darjeeling", p: "India", t: "caliente", c: "te", caf: "media",
    ef: ["energia"], temp: 95, seg: 180,
    ing: ["1 cucharadita de Darjeeling", "250 ml de agua a 90–95 ºC"],
    pasos: ["Calienta el agua casi hasta hervir.", "Deja reposar 3 minutos.", "Tómalo solo, sin leche, para apreciar su aroma."],
    hist: "Se cultiva en las faldas del Himalaya y se le conoce como «el champán de los tés».",
    para: "Para la tarde, solo y sin azúcar.",
    prec: "Lleva cafeína.",
    dato: "Algunas fincas de Darjeeling están a unos 2.000 metros de altitud."
  },
  {
    id: "te-ceilan", n: "Té de Ceilán", p: "Sri Lanka", t: "caliente", c: "te", caf: "alta",
    ef: ["energia"], temp: 100, seg: 240,
    ing: ["1 cucharadita de té negro de Ceilán", "250 ml de agua hirviendo", "Leche o limón (opcional)"],
    pasos: ["Vierte el agua hirviendo sobre el té.", "Deja reposar 3–4 minutos.", "Cuela y añade leche o limón si quieres."],
    hist: "Sri Lanka cultivaba café hasta que una plaga arrasó los cafetales en el siglo XIX; entonces se pasó al té.",
    para: "Para el desayuno. Es también una buena base para té helado.",
    prec: "Mucha cafeína.",
    dato: "Aunque el país se llama Sri Lanka desde 1972, su té se sigue vendiendo como «Ceylon»."
  },
  {
    id: "earl-grey", n: "Earl Grey", p: "Reino Unido", t: "caliente", c: "te", caf: "media",
    ef: ["energia"], temp: 95, seg: 210,
    ing: ["1 bolsita o 1 cucharadita de Earl Grey", "250 ml de agua a 95 ºC"],
    pasos: ["Vierte el agua sobre el té.", "Deja reposar 3–4 minutos.", "Tómalo solo o con una rodaja de limón."],
    hist: "Es té negro aromatizado con bergamota. Lleva el nombre del conde Grey, primer ministro británico en el siglo XIX.",
    para: "Para la tarde.",
    prec: "Lleva cafeína.",
    dato: "La bergamota es un cítrico que se cultiva sobre todo en Calabria, en el sur de Italia."
  },
  {
    id: "london-fog", n: "London Fog", p: "Canadá", t: "caliente", c: "te", caf: "media",
    ef: ["relax"], temp: 95, seg: 240,
    ing: ["1 bolsita de Earl Grey", "150 ml de agua a 95 ºC", "100 ml de leche espumada", "1 cucharadita de sirope o extracto de vainilla"],
    pasos: ["Infusiona el Earl Grey 4 minutos.", "Añade la vainilla.", "Cubre con la leche caliente espumada."],
    hist: "Aunque se llame «niebla de Londres», nació en Vancouver, Canadá.",
    para: "Como alternativa al café con leche.",
    prec: "Lleva cafeína.",
    dato: "Se le llama «niebla» por el aspecto gris claro que le da la leche."
  },
  {
    id: "noon-chai", n: "Noon chai (té rosa)", p: "Cachemira", t: "caliente", c: "te", caf: "media",
    ef: ["energia"], temp: 100, seg: 900,
    ing: ["1 cucharada de té verde (de Cachemira o gunpowder)", "300 ml de agua", "1 pizca de bicarbonato", "250 ml de leche", "1 pizca de sal", "2 vainas de cardamomo", "Pistachos picados"],
    pasos: ["Hierve el té con el bicarbonato y el cardamomo unos 15 minutos, hasta que se reduzca a la mitad.", "Añade un chorro de agua fría y airéalo vertiéndolo con un cucharón desde altura varias veces: verás que se vuelve rojizo.", "Añade la leche y la sal y calienta: se volverá rosa.", "Sirve con pistachos picados."],
    hist: "Es el té del desayuno en Cachemira. Allí se toma salado, no dulce.",
    para: "Para el desayuno en días fríos.",
    prec: "Lleva sal y cafeína.",
    dato: "El color rosa se debe al bicarbonato y al aireado, sin ningún colorante."
  },
  {
    id: "teh-tarik", n: "Teh tarik (té «estirado»)", p: "Malasia", t: "caliente", c: "te", caf: "alta",
    ef: ["energia"], temp: 100, seg: 300,
    ing: ["2 cucharadas de té negro", "300 ml de agua hirviendo", "60 ml de leche condensada"],
    pasos: ["Infusiona el té 5 minutos y cuela.", "Mezcla con la leche condensada.", "Pasa el té de una jarra a otra desde la máxima altura posible, varias veces, hasta que tenga espuma."],
    hist: "Es la bebida nacional de Malasia. Hay concursos de quién lo «estira» desde más alto sin derramar.",
    para: "Para la merienda.",
    prec: "Mucho azúcar por la leche condensada, y mucha cafeína.",
    dato: "El «estirado» enfría el té a la temperatura justa y le da espuma."
  },
  {
    id: "chai-keniano", n: "Chai keniano", p: "Kenia", t: "caliente", c: "te", caf: "alta",
    ef: ["energia"], temp: 100, seg: 240,
    ing: ["250 ml de agua", "250 ml de leche", "2 cucharaditas de té negro granulado", "Jengibre (opcional)", "Azúcar al gusto"],
    pasos: ["Pon el agua y la leche juntas en un cazo.", "Cuando empiecen a hervir, añade el té (y el jengibre).", "Deja hervir 3–4 minutos, cuela y endulza."],
    hist: "Kenia es uno de los mayores exportadores de té negro del mundo, y el chai con leche es su desayuno habitual.",
    para: "Para el desayuno.",
    prec: "Mucha cafeína.",
    dato: "El té keniano suele ser granulado («CTC»: aplastado, desgarrado y enrollado) para que suelte el sabor muy rápido."
  },
  {
    id: "kahwa", n: "Kahwa con azafrán y almendras", p: "Cachemira", t: "caliente", c: "te", caf: "baja",
    ef: ["digestion"], temp: 100, seg: 120,
    ing: ["1 cucharadita de té verde", "300 ml de agua", "3–4 hebras de azafrán", "2 vainas de cardamomo", "1 trocito de canela", "Almendras laminadas", "Miel al gusto"],
    pasos: ["Hierve el agua con el azafrán, el cardamomo y la canela durante 5 minutos.", "Apaga el fuego, añade el té y deja reposar 2 minutos.", "Cuela, añade la miel y espolvorea las almendras."],
    hist: "Se sirve en Cachemira en bodas, celebraciones y en el frío invierno.",
    para: "Para entrar en calor y después de las comidas.",
    dato: "El azafrán es la especia más cara del mundo: cada flor da solo tres hebras."
  },
  {
    id: "suutei-tsai", n: "Suutei tsai (té con leche y sal)", p: "Mongolia", t: "caliente", c: "te", caf: "media",
    ef: ["energia"], temp: 100, seg: 300,
    ing: ["500 ml de agua", "1 cucharada de té verde o negro", "250 ml de leche", "1 pizca de sal"],
    pasos: ["Hierve el té en el agua durante 5 minutos.", "Añade la leche y la sal y vuelve a hervir.", "Airéalo levantando un cucharón y dejándolo caer varias veces.", "Cuela y sirve."],
    hist: "En Mongolia se ofrece a todo invitado que entra en la yurta (la tienda tradicional).",
    para: "Para entrar en calor.",
    prec: "Lleva sal y cafeína.",
    dato: "Rechazar el primer cuenco de té en una yurta se considera de mala educación."
  },

  /* ======================= INFUSIONES CALIENTES (20) ===================== */
  {
    id: "rooibos", n: "Rooibos", p: "Sudáfrica", t: "caliente", c: "infusion", caf: "no",
    ef: ["relax", "dormir"], temp: 100, seg: 360,
    ing: ["1 cucharadita de rooibos", "250 ml de agua hirviendo", "Leche o miel (opcional)"],
    pasos: ["Vierte el agua hirviendo sobre el rooibos.", "Deja reposar 5–7 minutos (no amarga aunque te pases).", "Tómalo solo o con leche."],
    hist: "Es un arbusto de las montañas de Cederberg, en Sudáfrica. Lo usaban ya los pueblos khoisan.",
    para: "Al no tener cafeína, sirve para cualquier hora, también la noche.",
    dato: "«Rooibos» significa «arbusto rojo» en afrikáans."
  },
  {
    id: "honeybush", n: "Honeybush", p: "Sudáfrica", t: "caliente", c: "infusion", caf: "no",
    ef: ["antojo", "relax"], temp: 100, seg: 420,
    ing: ["1 cucharada de honeybush", "250 ml de agua hirviendo"],
    pasos: ["Vierte el agua hirviendo.", "Deja reposar 5–7 minutos.", "Cuela y sirve."],
    hist: "Crece en el Cabo Oriental, en Sudáfrica. Sus flores huelen a miel.",
    para: "Es dulce de forma natural, sin necesidad de azúcar.",
    dato: "Puedes dejarlo hervir a fuego lento: no amarga."
  },
  {
    id: "mate", n: "Mate", p: "Argentina", t: "caliente", c: "infusion", caf: "media",
    ef: ["energia"], temp: 75, seg: 0, espera: "Se va cebando poco a poco",
    ing: ["Yerba mate (hasta 2/3 del recipiente)", "Agua a 70–80 ºC en un termo", "Un mate (recipiente) y una bombilla"],
    pasos: ["Llena 2/3 del mate con yerba, tápalo con la mano, agítalo boca abajo y déjalo inclinado.", "Echa un poco de agua tibia en el hueco y deja que la yerba la absorba.", "Mete la bombilla en ese hueco.", "Ve echando agua caliente (nunca hirviendo), bebe y vuelve a llenar."],
    hist: "Viene de los pueblos guaraníes. En Argentina, Uruguay y Paraguay compartir el mate es un ritual social.",
    para: "Para tener energía y para compartir.",
    prec: "Lleva cafeína. No lo tomes muy caliente: la OMS considera que las bebidas por encima de 65 ºC probablemente favorecen el cáncer de esófago.",
    dato: "Si te ofrecen mate y dices «gracias», en Argentina se entiende que ya no quieres más."
  },
  {
    id: "guayusa", n: "Guayusa", p: "Ecuador", t: "caliente", c: "infusion", caf: "media",
    ef: ["energia"], temp: 100, seg: 300,
    ing: ["1 cucharada de hoja de guayusa", "250 ml de agua hirviendo"],
    pasos: ["Vierte el agua hirviendo.", "Deja reposar 5 minutos.", "Cuela y sirve."],
    hist: "En la Amazonía ecuatoriana el pueblo kichwa la toma antes del amanecer, mientras se cuentan los sueños.",
    para: "Para tener energía.",
    prec: "Lleva cafeína.",
    dato: "Es pariente del mate: las dos son plantas del género Ilex."
  },
  {
    id: "manzanilla", n: "Manzanilla", p: "España", t: "caliente", c: "infusion", caf: "no",
    ef: ["digestion", "relax", "dormir"], temp: 100, seg: 300,
    ing: ["1 cucharada de flores de manzanilla o 1 bolsita", "250 ml de agua hirviendo", "Miel (opcional)"],
    pasos: ["Vierte el agua hirviendo.", "Tapa la taza y deja reposar 5 minutos.", "Cuela y sirve."],
    hist: "Es el remedio casero clásico de las casas españolas para el estómago.",
    para: "Para digestiones pesadas y para relajarse.",
    prec: "Evítala si tienes alergia a plantas de la familia de las margaritas.",
    dato: "Tapar la taza mientras reposa conserva mejor su aroma."
  },
  {
    id: "poleo-menta", n: "Poleo menta", p: "España", t: "caliente", c: "infusion", caf: "no",
    ef: ["digestion"], temp: 100, seg: 300,
    ing: ["1 bolsita de poleo menta", "250 ml de agua hirviendo"],
    pasos: ["Vierte el agua hirviendo sobre la bolsita.", "Deja reposar 5 minutos.", "Retira la bolsita y sirve."],
    hist: "Es la infusión de sobremesa típica de los bares españoles.",
    para: "Para después de comer.",
    prec: "El poleo no debe tomarse en el embarazo ni en grandes cantidades. Su aceite esencial es tóxico: nunca lo tomes.",
    dato: "Es muy popular en España y casi desconocida fuera."
  },
  {
    id: "tila", n: "Tila", p: "España", t: "caliente", c: "infusion", caf: "no",
    ef: ["relax", "dormir"], temp: 100, seg: 480,
    ing: ["1 cucharada de flores de tilo", "250 ml de agua hirviendo", "Miel (opcional)"],
    pasos: ["Vierte el agua hirviendo.", "Deja reposar 5–10 minutos.", "Cuela y sirve."],
    hist: "Se hace con las flores del tilo, un árbol muy común en paseos y plazas de Europa.",
    para: "Para antes de dormir y para los nervios.",
    prec: "Puede dar sueño: no conduzcas justo después si te afecta.",
    dato: "En España «tómate una tila» se dice para pedir a alguien que se calme."
  },
  {
    id: "hierba-luisa", n: "Hierba luisa (cedrón)", p: "Perú", t: "caliente", c: "infusion", caf: "no",
    ef: ["digestion", "relax"], temp: 100, seg: 300,
    ing: ["1 cucharada de hojas de hierba luisa", "250 ml de agua hirviendo"],
    pasos: ["Vierte el agua hirviendo.", "Deja reposar 5 minutos.", "Cuela y sirve."],
    hist: "Muy popular en Perú y el resto de Sudamérica, donde también se llama cedrón.",
    para: "Para después de comer. Tiene un agradable sabor a limón.",
    dato: "Su nombre científico (Aloysia) honra a la reina María Luisa de Parma, esposa de Carlos IV."
  },
  {
    id: "muna", n: "Muña", p: "Perú", t: "caliente", c: "infusion", caf: "no",
    ef: ["digestion"], temp: 100, seg: 300,
    ing: ["1 cucharada de muña", "250 ml de agua hirviendo"],
    pasos: ["Vierte el agua hirviendo.", "Deja reposar 5 minutos.", "Cuela y sirve."],
    hist: "Es una «menta de los Andes» que se toma en Perú y Bolivia.",
    para: "Tradicionalmente, para la digestión.",
    prec: "Evítala en el embarazo.",
    dato: "Crece por encima de los 2.500 metros de altitud."
  },
  {
    id: "jengibre-limon-miel", n: "Jengibre, limón y miel", p: "Internacional", t: "caliente", c: "infusion", caf: "no",
    ef: ["digestion"], temp: 100, seg: 600,
    ing: ["4 rodajas de jengibre fresco", "300 ml de agua", "El zumo de ½ limón", "1 cucharadita de miel"],
    pasos: ["Hierve el jengibre en el agua durante 10 minutos.", "Apaga el fuego y deja templar un poco.", "Añade el limón y la miel."],
    hist: "Es un remedio casero que existe, con variantes, en casi todo el mundo.",
    para: "Para entrar en calor y aliviar la garganta.",
    prec: "No des miel a menores de 1 año. Si tomas anticoagulantes, no abuses del jengibre.",
    dato: "Añadir la miel cuando el agua ya no hierve conserva mejor su aroma."
  },
  {
    id: "leche-dorada", n: "Leche dorada de cúrcuma", p: "India", t: "caliente", c: "infusion", caf: "no",
    ef: ["relax", "dormir"], temp: 0, seg: 300,
    ing: ["250 ml de leche o bebida vegetal", "1 cucharadita de cúrcuma", "1 pizca de pimienta negra", "1 pizca de canela", "1 pizca de jengibre en polvo", "Miel al gusto"],
    pasos: ["Pon todo menos la miel en un cazo.", "Calienta 5 minutos a fuego suave, removiendo, sin que llegue a hervir.", "Endulza con miel."],
    hist: "En la India se llama haldi doodh y se toma desde hace siglos.",
    para: "Para antes de dormir.",
    prec: "Evita tomar mucha cúrcuma si tomas anticoagulantes o tienes problemas de vesícula.",
    dato: "La pimienta negra ayuda a que el cuerpo absorba mejor la cúrcuma."
  },
  {
    id: "te-montana-griego", n: "Té de montaña griego", p: "Grecia", t: "caliente", c: "infusion", caf: "no",
    ef: ["relax"], temp: 100, seg: 300,
    ing: ["1 ramillete de sideritis (té de montaña)", "400 ml de agua", "Miel y limón (opcional)"],
    pasos: ["Pon el ramillete en el agua fría y lleva a hervor.", "Deja hervir a fuego suave 5 minutos.", "Cuela y añade miel y limón."],
    hist: "En Grecia se recoge en los montes y se le llama «té de la montaña», aunque no es té.",
    para: "Tradicionalmente se toma en invierno, cuando hay catarros.",
    dato: "Se vende en ramilletes secos enteros, con tallo y flores."
  },
  {
    id: "faskomilo", n: "Faskomilo (salvia griega)", p: "Grecia", t: "caliente", c: "infusion", caf: "no",
    ef: ["digestion"], temp: 100, seg: 300,
    ing: ["1 cucharadita de salvia seca", "250 ml de agua hirviendo", "Miel (opcional)"],
    pasos: ["Vierte el agua hirviendo.", "Deja reposar 5 minutos.", "Cuela y sirve."],
    hist: "Es la infusión de salvia típica de Grecia y de Creta.",
    para: "Tradicionalmente, para la garganta y la digestión.",
    prec: "No la tomes en el embarazo ni en la lactancia, ni en grandes cantidades a diario.",
    dato: "«Salvia» viene del latín salvare: «curar, salvar»."
  },
  {
    id: "te-canela-mexico", n: "Té de canela", p: "México", t: "caliente", c: "infusion", caf: "no",
    ef: ["antojo", "digestion"], temp: 100, seg: 600,
    ing: ["1 rama de canela", "300 ml de agua", "Piloncillo o azúcar moreno (opcional)"],
    pasos: ["Pon la canela en el agua fría y lleva a hervor.", "Deja hervir a fuego suave 10 minutos.", "Cuela y endulza si quieres."],
    hist: "Es la bebida caliente de las mañanas de invierno en muchas casas mexicanas.",
    para: "Para el antojo de algo dulce y para entrar en calor.",
    prec: "La canela de tipo cassia (la más común) tiene cumarina: tómala con moderación a diario.",
    dato: "La canela de Ceilán tiene mucha menos cumarina que la cassia."
  },
  {
    id: "hinojo-anis", n: "Hinojo y anís estrellado", p: "Internacional", t: "caliente", c: "infusion", caf: "no",
    ef: ["digestion"], temp: 100, seg: 420,
    ing: ["1 cucharadita de semillas de hinojo machacadas", "1 estrella de anís estrellado", "250 ml de agua hirviendo"],
    pasos: ["Machaca un poco las semillas de hinojo.", "Vierte el agua hirviendo sobre las semillas y la estrella.", "Deja reposar 7 minutos, cuela y sirve."],
    hist: "Es una combinación digestiva clásica en Europa y en Asia.",
    para: "Para los gases y las digestiones pesadas.",
    prec: "Usa solo anís estrellado chino (Illicium verum): el japonés es tóxico. No lo des a bebés.",
    dato: "Del anís estrellado se extrae una sustancia que se usa para fabricar un antigripal."
  },
  {
    id: "melisa", n: "Melisa (toronjil)", p: "España", t: "caliente", c: "infusion", caf: "no",
    ef: ["relax", "dormir"], temp: 95, seg: 300,
    ing: ["1 cucharada de hojas de melisa", "250 ml de agua casi hirviendo"],
    pasos: ["Vierte el agua sobre las hojas.", "Tapa y deja reposar 5 minutos.", "Cuela y sirve."],
    hist: "Los monjes la cultivaban en los huertos de los monasterios. Es la base del «agua del Carmen».",
    para: "Para los nervios y para relajarse.",
    dato: "Sus hojas huelen a limón al frotarlas."
  },
  {
    id: "lavanda-miel", n: "Lavanda con miel", p: "Internacional", t: "caliente", c: "infusion", caf: "no",
    ef: ["relax", "dormir"], temp: 95, seg: 240,
    ing: ["1 cucharadita de flores de lavanda de uso alimentario", "250 ml de agua casi hirviendo", "1 cucharadita de miel"],
    pasos: ["Vierte el agua sobre la lavanda.", "Deja reposar 4 minutos (no más, o amarga).", "Cuela y endulza con miel."],
    hist: "La lavanda se usa desde la Antigüedad por su aroma calmante.",
    para: "Para relajarse por la noche.",
    prec: "Usa poca cantidad y solo lavanda apta para consumo (no la de decoración).",
    dato: "Si te pasas de lavanda, la infusión sabe a jabón."
  },
  {
    id: "hibisco-caliente", n: "Hibisco caliente", p: "Internacional", t: "caliente", c: "infusion", caf: "no",
    ef: ["digestion"], temp: 100, seg: 300,
    ing: ["1 cucharada de flores de hibisco secas", "250 ml de agua hirviendo", "Miel (opcional)"],
    pasos: ["Vierte el agua hirviendo.", "Deja reposar 5 minutos.", "Cuela y sirve."],
    hist: "Se toma en África, el Caribe y Latinoamérica, frío o caliente.",
    para: "Es una alternativa sin cafeína, de sabor ácido parecido al de los frutos rojos.",
    prec: "Puede bajar la tensión. Evítalo en el embarazo.",
    dato: "Con unas gotas de limón su color rojo se vuelve más brillante."
  },
  {
    id: "naranja-clavo", n: "Naranja y clavo (navideña)", p: "Internacional", t: "caliente", c: "infusion", caf: "no",
    ef: ["antojo", "relax"], temp: 100, seg: 600,
    ing: ["La piel de 1 naranja (sin la parte blanca)", "4 clavos", "1 rama de canela", "400 ml de agua"],
    pasos: ["Pon todo en un cazo con el agua fría.", "Lleva a hervor y deja hervir a fuego suave 10 minutos.", "Cuela y sirve."],
    hist: "Son los aromas típicos de la Navidad europea.",
    para: "Para las tardes de invierno, sin cafeína.",
    dato: "Usa naranjas ecológicas o lávalas bien, porque infusionas la piel."
  },
  {
    id: "frutos-rojos", n: "Tisana de frutos rojos", p: "Internacional", t: "caliente", c: "infusion", caf: "no",
    ef: ["antojo"], temp: 100, seg: 480,
    ing: ["1 cucharada de frutos rojos deshidratados", "250 ml de agua hirviendo"],
    pasos: ["Vierte el agua hirviendo.", "Deja reposar 8 minutos.", "Cuela y sirve."],
    hist: "Las tisanas de frutas son muy populares en Alemania y el centro de Europa.",
    para: "Sin cafeína y dulce de forma natural: buena para niños.",
    dato: "Las tisanas de frutas necesitan más tiempo de reposo que el té."
  },

  /* ================================ FRÍOS (25) =========================== */
  {
    id: "sweet-tea", n: "Té helado dulce (sweet tea)", p: "EE. UU.", t: "frio", c: "te", caf: "media",
    ef: ["energia"], temp: 100, seg: 300,
    ing: ["4 bolsitas de té negro", "1 litro de agua", "50–100 g de azúcar", "Hielo y limón"],
    pasos: ["Infusiona las bolsitas en 500 ml de agua hirviendo durante 5 minutos.", "Retira las bolsitas y disuelve el azúcar.", "Añade 500 ml de agua fría y mete en la nevera.", "Sirve con mucho hielo y limón."],
    hist: "Es la bebida típica del sur de Estados Unidos.",
    para: "Para el calor del verano.",
    prec: "La receta tradicional lleva mucho azúcar: prueba con la mitad o sin él.",
    dato: "Una pizca de bicarbonato evita que el té helado amargue o se enturbie."
  },
  {
    id: "bubble-tea", n: "Té de burbujas (bubble tea)", p: "Taiwán", t: "frio", c: "te", caf: "media",
    ef: ["energia"], temp: 100, seg: 600,
    ing: ["50 g de perlas de tapioca", "250 ml de té negro fuerte frío", "100 ml de leche", "2 cucharadas de sirope de azúcar moreno", "Hielo", "Pajita ancha"],
    pasos: ["Cuece las perlas según el paquete (unos 10 minutos) y déjalas en el sirope.", "Pon las perlas en el vaso con el hielo.", "Añade el té frío y la leche.", "Remueve y bebe con pajita ancha."],
    hist: "Nació en Taichung (Taiwán) en los años 80 y hoy se toma en todo el mundo.",
    para: "Como capricho de verano.",
    prec: "Lleva mucho azúcar. Las perlas tienen riesgo de atragantamiento para niños pequeños.",
    dato: "En Taiwán se llama «boba»."
  },
  {
    id: "cha-yen", n: "Cha yen (té tailandés)", p: "Tailandia", t: "frio", c: "te", caf: "alta",
    ef: ["energia"], temp: 100, seg: 300,
    ing: ["2 cucharadas de té tailandés (o té negro con 1 estrella de anís y unas gotas de vainilla)", "250 ml de agua hirviendo", "2 cucharadas de leche condensada", "Leche evaporada", "Hielo"],
    pasos: ["Infusiona el té 5 minutos y cuela.", "Disuelve la leche condensada y deja enfriar.", "Sirve sobre hielo y añade un chorrito de leche evaporada por encima."],
    hist: "Es el té helado de los puestos callejeros de Tailandia.",
    para: "Para el calor.",
    prec: "Mucho azúcar y mucha cafeína.",
    dato: "El color naranja de muchas mezclas comerciales viene de colorante añadido."
  },
  {
    id: "mizudashi", n: "Mizudashi (té verde en frío)", p: "Japón", t: "frio", c: "te", caf: "baja",
    ef: ["hidratacion"], temp: 0, seg: 0, espera: "3–6 horas en la nevera",
    ing: ["10 g de té verde (sencha)", "1 litro de agua fría"],
    pasos: ["Pon el té en una jarra con el agua fría.", "Tapa y deja en la nevera entre 3 y 6 horas.", "Cuela y sirve frío."],
    hist: "Es la forma japonesa de hacer té en frío (cold brew).",
    para: "Para hidratarse en verano. Sale más dulce y menos amargo que el té caliente.",
    dato: "En frío se extraen menos cafeína y taninos, por eso amarga menos."
  },
  {
    id: "karkade", n: "Karkadé de hibisco", p: "Egipto", t: "frio", c: "infusion", caf: "no",
    ef: ["hidratacion"], temp: 100, seg: 300,
    ing: ["30 g de flores de hibisco", "1 litro de agua", "Miel o azúcar al gusto", "Hielo"],
    pasos: ["Hierve las flores en el agua 5 minutos (o déjalas en agua fría toda la noche).", "Cuela y endulza.", "Enfría y sirve con hielo."],
    hist: "En Egipto se brinda con karkadé en las bodas y se toma mucho durante el Ramadán.",
    para: "Para el calor, sin cafeína.",
    prec: "Puede bajar la tensión. Evítalo en el embarazo.",
    dato: "En invierno los egipcios lo toman caliente."
  },
  {
    id: "agua-jamaica", n: "Agua de jamaica", p: "México", t: "frio", c: "infusion", caf: "no",
    ef: ["hidratacion"], temp: 100, seg: 600,
    ing: ["30 g de flor de jamaica (hibisco)", "1,5 litros de agua", "Azúcar al gusto", "Hielo"],
    pasos: ["Hierve las flores en 500 ml de agua durante 10 minutos.", "Cuela y añade 1 litro de agua fría.", "Endulza al gusto y sirve con hielo."],
    hist: "Es una de las «aguas frescas» que se toman a diario en México.",
    para: "Para la comida y para el calor.",
    prec: "Puede bajar la tensión. Evítala en el embarazo.",
    dato: "En México a la flor de hibisco se le llama «flor de jamaica»."
  },
  {
    id: "terere", n: "Tereré", p: "Paraguay", t: "frio", c: "infusion", caf: "media",
    ef: ["energia", "hidratacion"], temp: 0, seg: 0, espera: "Se va rellenando con agua helada",
    ing: ["Yerba mate", "Agua muy fría o zumo de cítricos", "Hojas de menta o hierbabuena", "Un vaso (guampa) y una bombilla"],
    pasos: ["Llena 2/3 del vaso con yerba.", "Prepara una jarra de agua helada con menta (o zumo).", "Ve echando el agua fría en el vaso y bebiendo con la bombilla."],
    hist: "Es la versión fría del mate. La UNESCO lo reconoció como patrimonio cultural inmaterial en 2020.",
    para: "Para el calor y para compartir.",
    prec: "Lleva cafeína.",
    dato: "En Paraguay tiene su propio día nacional, el último sábado de febrero."
  },
  {
    id: "te-melocoton", n: "Té helado de melocotón", p: "Internacional", t: "frio", c: "te", caf: "media",
    ef: ["hidratacion"], temp: 100, seg: 240,
    ing: ["3 bolsitas de té negro", "1 litro de agua", "2 melocotones maduros", "1 cucharada de miel", "Hielo"],
    pasos: ["Infusiona el té en 500 ml de agua hirviendo durante 4 minutos.", "Tritura los melocotones con la miel.", "Mezcla el té, el puré y 500 ml de agua fría. Cuela si quieres.", "Enfría en la nevera y sirve con hielo."],
    hist: "Es la versión casera del famoso té de melocotón de lata.",
    para: "Para el verano.",
    prec: "Lleva cafeína.",
    dato: "Hecho en casa controlas el azúcar: los comerciales llevan mucho."
  },
  {
    id: "arnold-palmer", n: "Arnold Palmer (té y limonada)", p: "EE. UU.", t: "frio", c: "te", caf: "media",
    ef: ["hidratacion"], temp: 100, seg: 240,
    ing: ["250 ml de té negro frío", "250 ml de limonada casera", "Hielo"],
    pasos: ["Prepara el té (4 minutos) y deja que se enfríe.", "Mezcla a partes iguales con la limonada.", "Sirve con hielo."],
    hist: "Lleva el nombre del golfista Arnold Palmer, que lo pedía así.",
    para: "Para el calor.",
    prec: "Lleva cafeína.",
    dato: "Para hacerlo más sano, prepara la limonada con poco azúcar."
  },
  {
    id: "menta-pepino", n: "Té frío de menta y pepino", p: "Internacional", t: "frio", c: "te", caf: "baja",
    ef: ["hidratacion"], temp: 0, seg: 0, espera: "4 horas en la nevera",
    ing: ["1 litro de agua fría", "2 bolsitas de té verde", "½ pepino en rodajas", "Hojas de menta"],
    pasos: ["Pon todo en una jarra con el agua fría.", "Deja en la nevera 4 horas.", "Retira las bolsitas y sirve con hielo."],
    hist: "Es una bebida de spa que se ha hecho popular en todo el mundo.",
    para: "Para hidratarse en verano.",
    dato: "El pepino es agua en un 95 %."
  },
  {
    id: "iced-matcha-latte", n: "Matcha latte frío", p: "Japón", t: "frio", c: "te", caf: "alta",
    ef: ["energia"], temp: 80, seg: 20,
    ing: ["2 g de matcha", "60 ml de agua a 80 ºC", "200 ml de leche fría", "Hielo"],
    pasos: ["Bate el matcha con el agua hasta que haga espuma.", "Llena un vaso de hielo y leche.", "Vierte el matcha por encima."],
    hist: "Se ha popularizado en las cafeterías de todo el mundo en los últimos años.",
    para: "Para tener energía en verano.",
    prec: "Bastante cafeína.",
    dato: "Si viertes el matcha despacio sobre la leche, verás dos capas de colores."
  },
  {
    id: "hojicha-frio", n: "Hojicha frío", p: "Japón", t: "frio", c: "te", caf: "baja",
    ef: ["hidratacion", "relax"], temp: 0, seg: 0, espera: "4–6 horas en la nevera",
    ing: ["15 g de hojicha", "1 litro de agua fría"],
    pasos: ["Pon el hojicha en una jarra con el agua fría.", "Deja en la nevera 4–6 horas.", "Cuela y sirve."],
    hist: "Es la versión fría del té tostado japonés.",
    para: "Para las tardes de verano: tiene muy poca cafeína.",
    dato: "Frío, su sabor tostado recuerda al de la cebada."
  },
  {
    id: "limon-jengibre-frio", n: "Limón y jengibre frío", p: "Internacional", t: "frio", c: "infusion", caf: "no",
    ef: ["digestion", "hidratacion"], temp: 100, seg: 600,
    ing: ["5 rodajas de jengibre", "500 ml de agua", "El zumo de 1 limón", "Menta", "Hielo"],
    pasos: ["Hierve el jengibre en el agua 10 minutos.", "Deja enfriar.", "Añade el limón, la menta y el hielo."],
    hist: "Es la versión de verano del remedio casero de jengibre y limón.",
    para: "Refrescante y sin cafeína.",
    prec: "Si tomas anticoagulantes, no abuses del jengibre.",
    dato: "Cuanto más tiempo hierva el jengibre, más picante sale."
  },
  {
    id: "kombucha", n: "Kombucha casera", p: "Internacional", t: "frio", c: "te", caf: "baja",
    ef: ["digestion"], temp: 100, seg: 0, espera: "7–10 días fermentando",
    ing: ["1 litro de té negro", "70 g de azúcar", "1 scoby (el «hongo» de la kombucha)", "100 ml de kombucha de una tanda anterior", "Un frasco de vidrio y un paño limpio"],
    pasos: ["Prepara el té con 4 bolsitas, disuelve el azúcar y deja que se enfríe del todo.", "Viértelo en el frasco limpio y añade el scoby y la kombucha anterior.", "Tapa con un paño sujeto con una goma y deja en un sitio oscuro a temperatura ambiente durante 7–10 días.", "Cuando esté entre dulce y ácida, cuela y guarda en botellas en la nevera."],
    hist: "Se cree que nació en Asia hace siglos. Hoy es muy popular en todo el mundo.",
    para: "Como bebida fermentada, ligeramente ácida y con gas.",
    prec: "Máxima higiene: si ves moho (manchas peludas), tírala entera. Tiene trazas de alcohol. No la tomen embarazadas, niños ni personas con las defensas bajas.",
    dato: "El scoby es una colonia de bacterias y levaduras que se alimenta del azúcar."
  },
  {
    id: "rooibos-naranja-frio", n: "Rooibos frío con naranja", p: "Sudáfrica", t: "frio", c: "infusion", caf: "no",
    ef: ["hidratacion"], temp: 100, seg: 360,
    ing: ["3 cucharaditas de rooibos", "500 ml de agua hirviendo", "El zumo de 1 naranja", "Rodajas de naranja", "Hielo"],
    pasos: ["Infusiona el rooibos 6 minutos y cuela.", "Deja enfriar.", "Añade el zumo, las rodajas y el hielo."],
    hist: "En Sudáfrica el rooibos también se toma frío en verano.",
    para: "Sin cafeína: apto para toda la familia y a cualquier hora.",
    dato: "El rooibos frío se conserva bien 2–3 días en la nevera."
  },
  {
    id: "yuanyang", n: "Yuanyang frío (té y café)", p: "Hong Kong", t: "frio", c: "te", caf: "alta",
    ef: ["energia"], temp: 100, seg: 300,
    ing: ["150 ml de té con leche al estilo Hong Kong", "100 ml de café", "Hielo"],
    pasos: ["Prepara el té con leche (5 minutos) y un café.", "Mézclalos.", "Sirve sobre hielo."],
    hist: "Su nombre viene de los patos mandarines, que siempre van en pareja: como el té y el café.",
    para: "Para quien necesita mucha energía.",
    prec: "Muchísima cafeína. Nada de tomarlo por la tarde.",
    dato: "En Hong Kong se toma tanto frío como caliente."
  },
  {
    id: "verde-lima-albahaca", n: "Té verde con lima y albahaca", p: "Internacional", t: "frio", c: "te", caf: "baja",
    ef: ["hidratacion"], temp: 80, seg: 120,
    ing: ["2 bolsitas de té verde", "500 ml de agua a 80 ºC", "1 lima", "Hojas de albahaca", "Hielo", "Agua con gas (opcional)"],
    pasos: ["Infusiona el té 2 minutos y deja enfriar.", "Añade la lima en rodajas y la albahaca.", "Sirve con hielo y un chorro de agua con gas."],
    hist: "Es una combinación moderna, inspirada en la cocina del sudeste asiático.",
    para: "Refrescante para el verano.",
    dato: "Frota las hojas de albahaca entre las manos antes de echarlas: sueltan más aroma."
  },
  {
    id: "tra-chanh", n: "Trà chanh (té con lima)", p: "Vietnam", t: "frio", c: "te", caf: "media",
    ef: ["hidratacion"], temp: 85, seg: 180,
    ing: ["2 bolsitas de té verde o de jazmín", "400 ml de agua a 85 ºC", "El zumo de 1 lima", "1 cucharada de azúcar", "Hielo"],
    pasos: ["Infusiona el té 3 minutos y deja enfriar.", "Añade el zumo de lima y el azúcar.", "Sirve con mucho hielo."],
    hist: "En Hanói los jóvenes lo toman sentados en taburetes bajitos en las aceras.",
    para: "Para el calor y para charlar.",
    prec: "Lleva cafeína.",
    dato: "Es tan popular que en Hanói hay calles enteras llenas de puestos de trà chanh."
  },
  {
    id: "sandia-hierbabuena", n: "Sandía y hierbabuena", p: "Internacional", t: "frio", c: "te", caf: "baja",
    ef: ["hidratacion"], temp: 80, seg: 180,
    ing: ["2 tazas de sandía", "300 ml de té blanco frío", "Hojas de hierbabuena", "Hielo"],
    pasos: ["Infusiona el té blanco 3 minutos a 80 ºC y deja enfriar.", "Tritura la sandía y cuélala.", "Mezcla con el té y la hierbabuena y sirve con hielo."],
    hist: "Es una receta de verano que aprovecha la fruta de temporada.",
    para: "Para hidratarse en días de mucho calor.",
    dato: "No necesita azúcar: la sandía ya es dulce."
  },
  {
    id: "frutos-rojos-frio", n: "Frutos rojos fríos", p: "Internacional", t: "frio", c: "infusion", caf: "no",
    ef: ["hidratacion", "antojo"], temp: 100, seg: 480,
    ing: ["2 cucharadas de frutos rojos deshidratados", "500 ml de agua hirviendo", "Frutos rojos congelados"],
    pasos: ["Infusiona 8 minutos, cuela y deja enfriar.", "Usa los frutos rojos congelados en lugar del hielo."],
    hist: "Versión fría de la tisana de frutas.",
    para: "Para niños y para quien no quiera cafeína.",
    dato: "Los frutos congelados enfrían la bebida sin aguarla."
  },
  {
    id: "granizado-te", n: "Granizado de té", p: "Italia", t: "frio", c: "te", caf: "media",
    ef: ["antojo"], temp: 100, seg: 240,
    ing: ["500 ml de té negro o Earl Grey", "50 g de azúcar", "El zumo de ½ limón"],
    pasos: ["Prepara el té (4 minutos) y disuelve el azúcar y el limón.", "Deja enfriar y viértelo en una bandeja ancha.", "Congela y rasca con un tenedor cada 30 minutos, durante unas 3 horas."],
    hist: "Está inspirado en la granita siciliana y el granizado de limón.",
    para: "Como postre fresco en verano.",
    prec: "Lleva cafeína y azúcar.",
    dato: "Rascar a menudo es el truco para que quede en cristales finos y no en un bloque."
  },
  {
    id: "hibisco-fresa", n: "Hibisco y fresa", p: "Internacional", t: "frio", c: "infusion", caf: "no",
    ef: ["hidratacion", "antojo"], temp: 100, seg: 300,
    ing: ["1 cucharada de hibisco", "400 ml de agua hirviendo", "6 fresas", "Hielo"],
    pasos: ["Infusiona el hibisco 5 minutos, cuela y deja enfriar.", "Tritura las fresas.", "Mezcla y sirve con hielo."],
    hist: "Una combinación moderna de dos sabores ácidos y dulces.",
    para: "Refrescante y sin cafeína.",
    prec: "El hibisco puede bajar la tensión. Evítalo en el embarazo.",
    dato: "El hibisco y la fresa comparten pigmentos parecidos: por eso el color es tan intenso."
  },
  {
    id: "manzanilla-manzana", n: "Manzanilla y manzana frías", p: "España", t: "frio", c: "infusion", caf: "no",
    ef: ["digestion", "relax"], temp: 100, seg: 300,
    ing: ["2 bolsitas de manzanilla", "500 ml de agua hirviendo", "1 manzana en rodajas finas", "1 pizca de canela", "Hielo"],
    pasos: ["Infusiona la manzanilla 5 minutos.", "Añade la manzana y deja enfriar en la nevera.", "Sirve con hielo y canela."],
    hist: "Una manera de tomar manzanilla en verano.",
    para: "Para niños y para después de comer.",
    prec: "Evítala si tienes alergia a las asteráceas (familia de las margaritas).",
    dato: "La palabra «manzanilla» viene de «manzana», por su olor."
  },
  {
    id: "matcha-coco", n: "Matcha con agua de coco", p: "Internacional", t: "frio", c: "te", caf: "alta",
    ef: ["energia", "hidratacion"], temp: 80, seg: 20,
    ing: ["2 g de matcha", "50 ml de agua a 80 ºC", "250 ml de agua de coco fría", "Hielo"],
    pasos: ["Bate el matcha con el agua.", "Vierte en un vaso con hielo y el agua de coco.", "Remueve y sirve."],
    hist: "Una mezcla moderna, popular entre deportistas.",
    para: "Para después de hacer deporte, para rehidratarse.",
    prec: "Bastante cafeína.",
    dato: "El agua de coco contiene potasio, uno de los minerales que se pierden al sudar."
  },
  {
    id: "earl-grey-lavanda-frio", n: "Earl Grey frío con lavanda", p: "Reino Unido", t: "frio", c: "te", caf: "media",
    ef: ["relax"], temp: 95, seg: 240,
    ing: ["2 bolsitas de Earl Grey", "½ cucharadita de lavanda alimentaria", "500 ml de agua a 95 ºC", "Miel", "Hielo"],
    pasos: ["Infusiona el té y la lavanda 4 minutos.", "Cuela, endulza con miel y deja enfriar.", "Sirve con hielo."],
    hist: "Una versión de verano del clásico británico.",
    para: "Para las tardes de calor.",
    prec: "Lleva cafeína.",
    dato: "La bergamota y la lavanda son de las mezclas más usadas en perfumería."
  },

  /* ===================== CÓCTELES SIN ALCOHOL Y ESPECIALES (15) ========== */
  {
    id: "mojito-te-verde", n: "Mojito de té verde sin alcohol", p: "Internacional", t: "especial", c: "te", caf: "baja",
    ef: ["hidratacion"], temp: 80, seg: 120,
    ing: ["250 ml de té verde frío", "½ lima en cuartos", "8 hojas de hierbabuena", "1 cucharadita de azúcar moreno", "Agua con gas", "Hielo picado"],
    pasos: ["Prepara el té (2 minutos a 80 ºC) y enfríalo.", "En el vaso, maja suavemente la lima, la hierbabuena y el azúcar.", "Llena de hielo picado, añade el té y termina con agua con gas."],
    hist: "Una versión sin alcohol del mojito cubano.",
    para: "Para reuniones de verano.",
    dato: "Maja la hierbabuena sin romperla del todo, o amargará."
  },
  {
    id: "sangria-hibisco", n: "Sangría de hibisco sin alcohol", p: "España", t: "especial", c: "infusion", caf: "no",
    ef: ["hidratacion"], temp: 100, seg: 300,
    ing: ["500 ml de hibisco frío", "250 ml de zumo de uva roja", "1 naranja y 1 manzana troceadas", "1 rama de canela", "Gaseosa", "Hielo"],
    pasos: ["Prepara el hibisco (5 minutos) y enfríalo.", "Mezcla en una jarra con el zumo, la fruta y la canela.", "Deja en la nevera 1 hora y sirve con gaseosa y hielo."],
    hist: "Una versión sin alcohol de la sangría española.",
    para: "Para comidas familiares y fiestas.",
    prec: "El hibisco puede bajar la tensión. Evítalo en el embarazo.",
    dato: "Cuanto más rato reposa la fruta, más sabor coge."
  },
  {
    id: "spritz-te-blanco", n: "Spritz de té blanco", p: "Italia", t: "especial", c: "te", caf: "baja",
    ef: ["hidratacion"], temp: 85, seg: 210,
    ing: ["150 ml de té blanco frío", "100 ml de tónica", "1 rodaja de naranja", "1 ramita de romero", "Hielo"],
    pasos: ["Prepara el té blanco (3–4 minutos a 85 ºC) y enfríalo.", "Llena una copa grande de hielo.", "Añade el té, la tónica, la naranja y el romero."],
    hist: "Inspirado en el spritz italiano del aperitivo, pero sin alcohol.",
    para: "Como aperitivo elegante.",
    prec: "La tónica lleva azúcar (salvo la versión zero) y quinina.",
    dato: "Sírvelo en copa de vino: el aroma se concentra mejor."
  },
  {
    id: "tonica-matcha", n: "Tónica de matcha", p: "Japón", t: "especial", c: "te", caf: "alta",
    ef: ["energia"], temp: 80, seg: 20,
    ing: ["2 g de matcha", "40 ml de agua a 80 ºC", "150 ml de tónica", "Hielo", "Rodaja de limón"],
    pasos: ["Bate el matcha con el agua.", "Llena un vaso de hielo y tónica.", "Vierte el matcha despacio por encima y decora con limón."],
    hist: "Una moda reciente de las cafeterías japonesas.",
    para: "Como aperitivo sin alcohol con energía.",
    prec: "Bastante cafeína. La tónica lleva azúcar y quinina.",
    dato: "El matcha flota sobre la tónica creando un degradado verde."
  },
  {
    id: "te-soda-romero", n: "Té con soda, limón y romero", p: "Internacional", t: "especial", c: "te", caf: "media",
    ef: ["hidratacion"], temp: 100, seg: 240,
    ing: ["150 ml de té negro frío", "100 ml de soda o agua con gas", "Rodajas de limón", "1 ramita de romero", "Hielo"],
    pasos: ["Prepara el té (4 minutos) y enfríalo.", "Quema un poco la punta del romero con un mechero (opcional) para que suelte aroma.", "Mezcla todo en un vaso con hielo."],
    hist: "Una bebida de estilo coctelería, sin alcohol.",
    para: "Para sustituir a un refresco en una cena.",
    prec: "Lleva cafeína.",
    dato: "El romero es una de las plantas aromáticas más típicas del Mediterráneo."
  },
  {
    id: "horchata-chai", n: "Horchata chai", p: "España", t: "especial", c: "te", caf: "media",
    ef: ["antojo"], temp: 100, seg: 300,
    ing: ["250 ml de horchata de chufa fría", "100 ml de concentrado de chai frío (doble de té y especias, sin leche)", "1 pizca de canela", "Hielo"],
    pasos: ["Prepara un chai muy concentrado: el doble de té y especias en 150 ml de agua, 5 minutos.", "Cuela y deja enfriar.", "Mezcla con la horchata y sirve con hielo y canela."],
    hist: "Una fusión entre la horchata valenciana y el chai indio.",
    para: "Como merienda fresca de verano.",
    prec: "La horchata lleva azúcar.",
    dato: "La chufa de Valencia tiene Denominación de Origen."
  },
  {
    id: "cheese-foam", n: "Té con espuma de queso", p: "Taiwán", t: "especial", c: "te", caf: "media",
    ef: ["antojo"], temp: 90, seg: 180,
    ing: ["250 ml de té oolong o de jazmín frío", "50 g de queso crema", "100 ml de nata para montar", "1 pizca de sal", "1 cucharada de azúcar", "Hielo"],
    pasos: ["Prepara el té (3 minutos) y enfríalo.", "Bate el queso, la nata, la sal y el azúcar hasta que espese un poco.", "Sirve el té con hielo y pon la espuma encima con una cuchara."],
    hist: "Nació en Taiwán y se ha extendido por toda Asia.",
    para: "Como capricho de merienda.",
    prec: "Es muy calórico: para darse un gusto de vez en cuando.",
    dato: "Se bebe inclinando el vaso, sin pajita, para tomar espuma y té a la vez."
  },
  {
    id: "dirty-chai", n: "Dirty chai (chai con espresso)", p: "Internacional", t: "especial", c: "te", caf: "alta",
    ef: ["energia"], temp: 100, seg: 300,
    ing: ["1 taza de chai masala", "1 café espresso"],
    pasos: ["Prepara el chai masala (ver su receta).", "Añade un espresso recién hecho."],
    hist: "Nació en las cafeterías de Estados Unidos para quienes no saben elegir entre té y café.",
    para: "Para mañanas con mucho sueño.",
    prec: "Muchísima cafeína.",
    dato: "Se llama «dirty» (sucio) porque el café «ensucia» el chai."
  },
  {
    id: "te-granizado-limon", n: "Té con granizado de limón", p: "España", t: "especial", c: "te", caf: "media",
    ef: ["hidratacion"], temp: 100, seg: 240,
    ing: ["150 ml de té negro frío", "1 vaso de granizado de limón", "Hojas de menta"],
    pasos: ["Prepara el té (4 minutos) y enfríalo.", "Llena medio vaso con granizado de limón.", "Completa con el té y decora con menta."],
    hist: "Una mezcla de dos bebidas de verano muy españolas.",
    para: "Para los días de más calor.",
    prec: "Lleva azúcar y cafeína.",
    dato: "El granizado de limón es tradicional en Valencia y Murcia."
  },
  {
    id: "chai-avena", n: "Chai helado con avena", p: "India", t: "especial", c: "te", caf: "media",
    ef: ["energia"], temp: 100, seg: 300,
    ing: ["150 ml de concentrado de chai frío", "150 ml de bebida de avena", "Hielo", "Canela"],
    pasos: ["Prepara un chai concentrado (doble de té y especias, 5 minutos) y enfríalo.", "Sirve con hielo y la bebida de avena.", "Espolvorea canela."],
    hist: "La versión moderna y fría del chai tradicional.",
    para: "Para el verano, sin lácteos.",
    prec: "Lleva cafeína.",
    dato: "La bebida de avena hace espuma muy bien, como la leche."
  },
  {
    id: "ponche-navideno", n: "Ponche navideño sin alcohol", p: "Reino Unido", t: "especial", c: "infusion", caf: "no",
    ef: ["antojo"], temp: 100, seg: 600,
    ing: ["500 ml de zumo de manzana", "500 ml de rooibos", "1 rama de canela", "4 clavos", "1 naranja en rodajas"],
    pasos: ["Pon todo en una olla.", "Calienta a fuego suave 10 minutos, sin que hierva fuerte.", "Sirve caliente en tazas."],
    hist: "Está inspirado en el «wassail» inglés, que se tomaba en Navidad para desear buena cosecha.",
    para: "Para las fiestas de Navidad, apto para niños.",
    dato: "La casa entera huele a Navidad mientras se calienta."
  },
  {
    id: "afogato-matcha", n: "Afogato de matcha", p: "Japón", t: "especial", c: "te", caf: "alta",
    ef: ["antojo"], temp: 80, seg: 20,
    ing: ["1 bola de helado de vainilla", "2 g de matcha", "40 ml de agua a 80 ºC"],
    pasos: ["Pon la bola de helado en un vaso o cuenco.", "Bate el matcha con el agua.", "Viértelo sobre el helado y cómelo enseguida."],
    hist: "Una fusión del «affogato» italiano (helado con café) y el matcha japonés.",
    para: "Como postre.",
    prec: "Lleva cafeína y azúcar.",
    dato: "«Affogato» significa «ahogado» en italiano."
  },
  {
    id: "te-helado-float", n: "Té negro con helado de vainilla", p: "Internacional", t: "especial", c: "te", caf: "media",
    ef: ["antojo"], temp: 100, seg: 240,
    ing: ["200 ml de té negro fuerte y frío", "1 bola de helado de vainilla"],
    pasos: ["Prepara el té (4 minutos) y enfríalo.", "Pon el té en un vaso alto.", "Añade la bola de helado encima."],
    hist: "Es la versión con té del clásico «float» americano de refresco con helado.",
    para: "Como postre de verano.",
    prec: "Lleva cafeína y azúcar.",
    dato: "El helado se va derritiendo y convierte el té en un batido."
  },
  {
    id: "rosas-lichi", n: "Té de rosas y lichi", p: "China", t: "especial", c: "te", caf: "media",
    ef: ["relax"], temp: 90, seg: 180,
    ing: ["1 bolsita de té negro o blanco", "1 cucharadita de pétalos de rosa comestibles", "250 ml de agua a 90 ºC", "4 lichis", "Hielo"],
    pasos: ["Infusiona el té y los pétalos 3 minutos.", "Cuela y deja enfriar.", "Añade los lichis troceados y el hielo."],
    hist: "La rosa y el lichi son una pareja de sabores muy apreciada en China.",
    para: "Para una ocasión especial.",
    prec: "Lleva cafeína. Usa rosas de uso alimentario, nunca de floristería (pueden llevar pesticidas).",
    dato: "Se cuenta que el lichi era la fruta favorita de una famosa concubina imperial china."
  },
  {
    id: "matcha-fresa", n: "Matcha latte con fresa", p: "Japón", t: "especial", c: "te", caf: "alta",
    ef: ["energia", "antojo"], temp: 80, seg: 20,
    ing: ["4 fresas", "1 cucharadita de miel", "200 ml de leche fría", "2 g de matcha", "40 ml de agua a 80 ºC", "Hielo"],
    pasos: ["Machaca las fresas con la miel en el fondo del vaso.", "Añade hielo y la leche.", "Bate el matcha con el agua y viértelo despacio por encima."],
    hist: "Se ha puesto de moda en las cafeterías de Japón y Corea.",
    para: "Como merienda.",
    prec: "Bastante cafeína.",
    dato: "Quedan tres capas: rosa, blanca y verde."
  },

  /* ========================= VITALIDAD Y PESO (15) ======================= */
  {
    id: "v-despertador-matcha", n: "Despertador: matcha sin azúcar", p: "Japón", t: "vitalidad", c: "te", caf: "alta",
    ef: ["energia"], temp: 80, seg: 20, mom: "mañana",
    ing: ["2 g de matcha", "200 ml de agua a 80 ºC"],
    pasos: ["Bate el matcha con un poco de agua hasta que haga espuma.", "Añade el resto del agua.", "Tómalo sin azúcar."],
    hist: "Una forma de empezar el día sin calorías.",
    para: "Para despertarte con energía en lugar de un café con azúcar.",
    prec: "Bastante cafeína. No lo tomes por la tarde.",
    dato: "Una taza de matcha sin nada añadido apenas tiene calorías."
  },
  {
    id: "v-pre-entreno", n: "Antes de entrenar: té verde con limón", p: "Internacional", t: "vitalidad", c: "te", caf: "media",
    ef: ["energia"], temp: 80, seg: 120, mom: "mañana",
    ing: ["1 bolsita de té verde", "250 ml de agua a 80 ºC", "Rodaja de limón"],
    pasos: ["Infusiona 2 minutos.", "Añade el limón.", "Tómalo entre 30 y 45 minutos antes de hacer ejercicio."],
    hist: "Muchos deportistas usan la cafeína del té antes de entrenar.",
    para: "Para tener energía al hacer ejercicio.",
    prec: "Si te sienta mal el té en ayunas, toma algo antes.",
    dato: "El té verde tiene menos cafeína que el café, pero suficiente para notar el efecto."
  },
  {
    id: "v-digestivo-mediodia", n: "Digestivo de mediodía: menta e hinojo", p: "Internacional", t: "vitalidad", c: "infusion", caf: "no",
    ef: ["digestion"], temp: 100, seg: 420, mom: "mediodía",
    ing: ["1 cucharadita de hojas de menta", "1 cucharadita de semillas de hinojo machacadas", "250 ml de agua hirviendo"],
    pasos: ["Vierte el agua sobre la menta y el hinojo.", "Deja reposar 7 minutos.", "Cuela y tómalo después de comer."],
    hist: "Una combinación digestiva clásica.",
    para: "Para después de comer, en lugar del postre dulce.",
    dato: "Terminar la comida con una infusión ayuda a cerrar el apetito."
  },
  {
    id: "v-sustituto-refresco", n: "Sustituto del refresco: hibisco con gas", p: "Internacional", t: "vitalidad", c: "infusion", caf: "no",
    ef: ["hidratacion", "antojo"], temp: 100, seg: 300, mom: "mediodía",
    ing: ["1 cucharada de hibisco", "250 ml de agua hirviendo", "150 ml de agua con gas", "Lima", "Hielo"],
    pasos: ["Infusiona el hibisco 5 minutos y deja enfriar (puedes tenerlo preparado en la nevera).", "Sirve con hielo y agua con gas.", "Añade lima. Sin azúcar."],
    hist: "Es la estrella del reto de 30 días.",
    para: "Para sustituir un refresco: cambiar una lata de refresco por esta bebida evita unos 35 g de azúcar.",
    prec: "El hibisco puede bajar la tensión. Evítalo en el embarazo.",
    dato: "Una lata de refresco de cola normal lleva unos 35 g de azúcar, unos 9 terrones."
  },
  {
    id: "v-agua-te-blanco", n: "Agua de té blanco con cítricos", p: "Internacional", t: "vitalidad", c: "te", caf: "baja",
    ef: ["hidratacion"], temp: 0, seg: 0, espera: "4 horas en la nevera", mom: "mañana",
    ing: ["1 litro de agua fría", "1 cucharada de té blanco", "Rodajas de limón y naranja"],
    pasos: ["Pon todo en una jarra.", "Deja en la nevera 4 horas.", "Cuela el té y bebe a lo largo del día."],
    hist: "Una forma de dar sabor al agua sin azúcar.",
    para: "Para beber más agua durante el día.",
    dato: "Muchas veces confundimos sed con hambre."
  },
  {
    id: "v-rooibos-tarde", n: "Rooibos de tarde con canela", p: "Sudáfrica", t: "vitalidad", c: "infusion", caf: "no",
    ef: ["antojo", "relax"], temp: 100, seg: 360, mom: "tarde",
    ing: ["1 cucharadita de rooibos", "1 trocito de canela", "250 ml de agua hirviendo"],
    pasos: ["Infusiona 6 minutos.", "Tómalo sin azúcar: el rooibos ya es algo dulce."],
    hist: "Sin cafeína, perfecto para la tarde.",
    para: "Para la merienda, en lugar de un dulce.",
    dato: "La canela realza la sensación de dulzor sin añadir azúcar."
  },
  {
    id: "v-jengibre-curcuma", n: "Jengibre y cúrcuma", p: "Internacional", t: "vitalidad", c: "infusion", caf: "no",
    ef: ["digestion"], temp: 100, seg: 480, mom: "mañana",
    ing: ["3 rodajas de jengibre", "½ cucharadita de cúrcuma", "1 pizca de pimienta negra", "300 ml de agua", "Limón"],
    pasos: ["Hierve el jengibre, la cúrcuma y la pimienta 8 minutos.", "Cuela y añade limón."],
    hist: "Una combinación muy popular de raíces de la cocina asiática.",
    para: "Para entrar en calor por la mañana sin cafeína.",
    prec: "Si tomas anticoagulantes o tienes problemas de vesícula, consulta antes.",
    dato: "El jengibre y la cúrcuma son de la misma familia de plantas."
  },
  {
    id: "v-oolong-comida", n: "Oolong sin azúcar después de comer", p: "China", t: "vitalidad", c: "te", caf: "media",
    ef: ["digestion"], temp: 95, seg: 180, mom: "mediodía",
    ing: ["1 cucharadita de oolong", "250 ml de agua a 90–95 ºC"],
    pasos: ["Infusiona 3 minutos.", "Tómalo sin azúcar después de comer."],
    hist: "En el sur de China es habitual tomar té durante y después de las comidas.",
    para: "Para cerrar la comida.",
    prec: "Lleva cafeína.",
    dato: "En China el té acompaña al «dim sum», que se llama «yum cha»: literalmente «beber té»."
  },
  {
    id: "v-canela-antojo", n: "Té de canela para el antojo de dulce", p: "Internacional", t: "vitalidad", c: "infusion", caf: "no",
    ef: ["antojo"], temp: 100, seg: 600, mom: "tarde",
    ing: ["1 rama de canela", "2 clavos", "300 ml de agua"],
    pasos: ["Hierve la canela y los clavos 10 minutos.", "Tómalo templado, sin azúcar."],
    hist: "Un truco popular para el «gusanillo» de media tarde.",
    para: "Para cuando te apetece algo dulce.",
    prec: "Tómala con moderación a diario (cumarina).",
    dato: "Esperar 10 minutos a que se haga la infusión ya ayuda a que pase el antojo."
  },
  {
    id: "v-rooibos-vainilla", n: "Rooibos con vainilla", p: "Sudáfrica", t: "vitalidad", c: "infusion", caf: "no",
    ef: ["antojo", "relax"], temp: 100, seg: 360, mom: "noche",
    ing: ["1 cucharadita de rooibos", "½ vaina de vainilla abierta o unas gotas de extracto", "250 ml de agua hirviendo"],
    pasos: ["Infusiona el rooibos con la vainilla 6 minutos.", "Cuela y tómalo sin azúcar."],
    hist: "Sabe a postre, pero no tiene calorías.",
    para: "Para el antojo de dulce después de cenar.",
    dato: "La vainilla es la segunda especia más cara del mundo, después del azafrán."
  },
  {
    id: "v-picoteo-nocturno", n: "Contra el picoteo nocturno: tila y melisa", p: "España", t: "vitalidad", c: "infusion", caf: "no",
    ef: ["relax", "dormir"], temp: 100, seg: 420, mom: "noche",
    ing: ["1 cucharadita de tila", "1 cucharadita de melisa", "250 ml de agua hirviendo"],
    pasos: ["Infusiona 7 minutos.", "Tómala después de cenar, en lugar de picar algo."],
    hist: "Dos plantas tradicionales de la noche.",
    para: "Para relajarse y cerrar el día sin picar.",
    prec: "Puede dar sueño.",
    dato: "Lavarse los dientes después de la infusión también ayuda a no picar."
  },
  {
    id: "v-hojicha-vegetal", n: "Merienda ligera: hojicha con bebida vegetal", p: "Japón", t: "vitalidad", c: "te", caf: "baja",
    ef: ["antojo", "relax"], temp: 90, seg: 60, mom: "tarde",
    ing: ["1 cucharada de hojicha", "100 ml de agua a 90 ºC", "150 ml de bebida de avena sin azúcar, caliente"],
    pasos: ["Infusiona la hojicha 1 minuto y cuela.", "Añade la bebida de avena caliente.", "Sin azúcar."],
    hist: "Un «latte» suave y tostado.",
    para: "Para una merienda ligera.",
    dato: "Mira la etiqueta: muchas bebidas vegetales llevan azúcar añadido."
  },
  {
    id: "v-pepino-limon", n: "Hidratación: pepino y limón", p: "Internacional", t: "vitalidad", c: "infusion", caf: "no",
    ef: ["hidratacion"], temp: 0, seg: 0, espera: "1–2 horas en la nevera", mom: "tarde",
    ing: ["1 litro de agua fría", "½ pepino en rodajas", "1 limón en rodajas", "Menta"],
    pasos: ["Pon todo en una jarra.", "Deja en la nevera 1–2 horas.", "Bebe a lo largo de la tarde."],
    hist: "Es agua con sabor, no un té, pero ayuda a beber más.",
    para: "Para hidratarse.",
    dato: "Las necesidades de agua aumentan con el calor y el ejercicio."
  },
  {
    id: "v-verde-menta", n: "Té verde con menta después de comer", p: "Internacional", t: "vitalidad", c: "te", caf: "media",
    ef: ["digestion"], temp: 80, seg: 120, mom: "mediodía",
    ing: ["1 cucharadita de té verde", "Unas hojas de menta", "250 ml de agua a 80 ºC"],
    pasos: ["Infusiona 2 minutos.", "Cuela y tómalo sin azúcar."],
    hist: "Inspirado en el té moruno, pero sin azúcar.",
    para: "Para después de comer.",
    prec: "Lleva cafeína. El té tomado junto a la comida reduce la absorción del hierro: si tienes anemia, sepáralo una hora.",
    dato: "La menta fresca da más aroma que la seca."
  },
  {
    id: "v-dormir", n: "Para dormir: manzanilla y lavanda", p: "Internacional", t: "vitalidad", c: "infusion", caf: "no",
    ef: ["dormir", "relax"], temp: 95, seg: 300, mom: "noche",
    ing: ["1 bolsita de manzanilla", "½ cucharadita de lavanda alimentaria", "250 ml de agua casi hirviendo"],
    pasos: ["Infusiona 5 minutos.", "Tómala media hora antes de acostarte."],
    hist: "Dos de las plantas más usadas para la noche.",
    para: "Dormir bien también ayuda a controlar el apetito.",
    prec: "Evita la manzanilla si tienes alergia a las asteráceas.",
    dato: "Dormir poco aumenta las ganas de comer cosas dulces al día siguiente."
  }
];

/* Bandera o símbolo de cada país/región (para el pasaporte). */
const BANDERAS = {
  "India": "🇮🇳", "Marruecos": "🇲🇦", "Japón": "🇯🇵", "Hong Kong": "🇭🇰", "Tíbet": "🏔️",
  "Rusia": "🇷🇺", "Reino Unido": "🇬🇧", "Turquía": "🇹🇷", "China": "🇨🇳", "Sri Lanka": "🇱🇰",
  "Canadá": "🇨🇦", "Cachemira": "🏔️", "Malasia": "🇲🇾", "Kenia": "🇰🇪", "Mongolia": "🇲🇳",
  "Sudáfrica": "🇿🇦", "Argentina": "🇦🇷", "Ecuador": "🇪🇨", "España": "🇪🇸", "Perú": "🇵🇪",
  "Grecia": "🇬🇷", "México": "🇲🇽", "EE. UU.": "🇺🇸", "Taiwán": "🇹🇼", "Tailandia": "🇹🇭",
  "Egipto": "🇪🇬", "Paraguay": "🇵🇾", "Vietnam": "🇻🇳", "Italia": "🇮🇹", "Internacional": "🌍"
};
