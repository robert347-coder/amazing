/* =========================================================================
   AMAZING JESÚS · contenido.js
   -------------------------------------------------------------------------
   Todo el temario: explicaciones (lecciones) y preguntas de cada bloque.
   PENDIENTE DE REVISIÓN DOCTRINAL por el catequista y el párroco.

   Cómo está escrito cada bloque:
     lecciones: [{ t: "título", x: "texto" }]
     preguntas: [ ["pregunta", ["RESPUESTA CORRECTA", "falsa", "falsa", ...], "explicación"] ]
   La respuesta correcta va SIEMPRE la primera; la app baraja el orden al jugar.
   Para añadir una pregunta, copia una línea y cambia el texto.
   ========================================================================= */

const ORACIONES = {
  senal: {
    titulo: "Señal de la cruz",
    texto: "Por la señal de la santa cruz,\nde nuestros enemigos\nlíbranos, Señor, Dios nuestro.\nEn el nombre del Padre,\ny del Hijo,\ny del Espíritu Santo.\nAmén."
  },
  padrenuestro: {
    titulo: "Padre Nuestro",
    texto: "Padre nuestro, que estás en el cielo,\nsantificado sea tu Nombre;\nvenga a nosotros tu reino;\nhágase tu voluntad\nen la tierra como en el cielo.\nDanos hoy nuestro pan de cada día;\nperdona nuestras ofensas,\ncomo también nosotros perdonamos\na los que nos ofenden;\nno nos dejes caer en la tentación,\ny líbranos del mal.\nAmén."
  },
  avemaria: {
    titulo: "Ave María",
    texto: "Dios te salve, María,\nllena eres de gracia, el Señor es contigo.\nBendita tú eres entre todas las mujeres,\ny bendito es el fruto de tu vientre, Jesús.\nSanta María, Madre de Dios,\nruega por nosotros, pecadores,\nahora y en la hora de nuestra muerte.\nAmén."
  },
  gloria: {
    titulo: "Gloria",
    texto: "Gloria al Padre, y al Hijo, y al Espíritu Santo.\nComo era en el principio, ahora y siempre,\npor los siglos de los siglos.\nAmén."
  },
  credo: {
    titulo: "Credo (de los Apóstoles)",
    texto: "Creo en Dios, Padre todopoderoso,\nCreador del cielo y de la tierra.\nCreo en Jesucristo, su único Hijo, nuestro Señor,\nque fue concebido por obra y gracia del Espíritu Santo,\nnació de santa María Virgen,\npadeció bajo el poder de Poncio Pilato,\nfue crucificado, muerto y sepultado,\ndescendió a los infiernos,\nal tercer día resucitó de entre los muertos,\nsubió a los cielos\ny está sentado a la derecha de Dios, Padre todopoderoso.\nDesde allí ha de venir a juzgar a vivos y muertos.\nCreo en el Espíritu Santo,\nla santa Iglesia católica,\nla comunión de los santos,\nel perdón de los pecados,\nla resurrección de la carne\ny la vida eterna.\nAmén."
  },
  senormio: {
    titulo: "Señor mío Jesucristo",
    texto: "Señor mío Jesucristo, Dios y Hombre verdadero,\nCreador, Padre y Redentor mío;\npor ser Vos quien sois, Bondad infinita,\ny porque os amo sobre todas las cosas,\nme pesa de todo corazón haberos ofendido;\ntambién me pesa porque podéis castigarme\ncon las penas del infierno.\nAyudado de vuestra divina gracia,\npropongo firmemente nunca más pecar,\nconfesarme y cumplir la penitencia\nque me fuere impuesta.\nAmén."
  },
  angel: {
    titulo: "Ángel de la Guarda",
    texto: "Ángel de la Guarda,\ndulce compañía,\nno me desampares\nni de noche ni de día.\nNo me dejes solo,\nque me perdería.\nAmén."
  },
  salve: {
    titulo: "Salve",
    texto: "Dios te salve, Reina y Madre de misericordia,\nvida, dulzura y esperanza nuestra; Dios te salve.\nA ti llamamos los desterrados hijos de Eva;\na ti suspiramos, gimiendo y llorando,\nen este valle de lágrimas.\nEa, pues, Señora, abogada nuestra,\nvuelve a nosotros esos tus ojos misericordiosos;\ny, después de este destierro,\nmuéstranos a Jesús, fruto bendito de tu vientre.\n¡Oh clementísima, oh piadosa, oh dulce Virgen María!\nRuega por nosotros, santa Madre de Dios,\npara que seamos dignos de alcanzar\nlas promesas de nuestro Señor Jesucristo.\nAmén."
  },
  ohjesus: {
    titulo: "Oh Jesús mío",
    texto: "Oh Jesús mío, perdona nuestros pecados,\nlíbranos del fuego del infierno,\nlleva al cielo a todas las almas,\nespecialmente a las más necesitadas\nde tu misericordia."
  }
};

/* Misterios del Rosario y días en que se rezan (0 = domingo … 6 = sábado) */
const MISTERIOS = {
  gozosos: {
    nombre: "Misterios gozosos", dias: [1, 6], diasTexto: "lunes y sábado",
    lista: [
      "La Anunciación del ángel a María y la Encarnación del Hijo de Dios",
      "La Visitación de María a su prima Isabel",
      "El Nacimiento de Jesús en Belén",
      "La Presentación de Jesús en el Templo",
      "El Niño Jesús perdido y hallado en el Templo"
    ]
  },
  luminosos: {
    nombre: "Misterios luminosos", dias: [4], diasTexto: "jueves",
    lista: [
      "El Bautismo de Jesús en el río Jordán",
      "Jesús en las bodas de Caná",
      "Jesús anuncia el Reino de Dios e invita a la conversión",
      "La Transfiguración del Señor",
      "Jesús instituye la Eucaristía"
    ]
  },
  dolorosos: {
    nombre: "Misterios dolorosos", dias: [2, 5], diasTexto: "martes y viernes",
    lista: [
      "La oración de Jesús en el Huerto",
      "Jesús es azotado",
      "Jesús es coronado de espinas",
      "Jesús carga con la cruz camino del Calvario",
      "Jesús muere en la cruz"
    ]
  },
  gloriosos: {
    nombre: "Misterios gloriosos", dias: [0, 3], diasTexto: "miércoles y domingo",
    lista: [
      "La Resurrección de Jesús",
      "La Ascensión de Jesús al cielo",
      "La venida del Espíritu Santo en Pentecostés",
      "La Asunción de María al cielo",
      "La Coronación de María como Reina del cielo y de la tierra"
    ]
  }
};

/* Estaciones del Vía Crucis tradicional, con una idea corta para pensar */
const VIA_CRUCIS = [
  { t: "Jesús es condenado a muerte", r: "Pilato condena a Jesús, que es inocente. Jesús no se defiende con violencia. Le pedimos ser siempre justos con los demás." },
  { t: "Jesús carga con la cruz", r: "Jesús acepta la cruz por amor a nosotros. Cuando algo nos cuesta, podemos ofrecérselo a Él." },
  { t: "Jesús cae por primera vez", r: "La cruz pesa mucho y Jesús cae, pero se levanta. Cuando nos equivocamos, también podemos levantarnos." },
  { t: "Jesús encuentra a su Madre", r: "María acompaña a su Hijo. Las madres están siempre cerca. Damos gracias por nuestra familia." },
  { t: "Simón de Cirene ayuda a Jesús a llevar la cruz", r: "Simón ayuda a Jesús. Nosotros podemos ayudar a quien está cansado, triste o solo." },
  { t: "La Verónica enjuga el rostro de Jesús", r: "Con valentía, la Verónica limpia la cara de Jesús. Un pequeño gesto de cariño puede consolar mucho." },
  { t: "Jesús cae por segunda vez", r: "Jesús vuelve a caer y vuelve a levantarse. Le pedimos fuerza para no rendirnos." },
  { t: "Jesús consuela a las mujeres de Jerusalén", r: "Aunque sufre, Jesús piensa en los demás y los consuela. Le pedimos un corazón atento." },
  { t: "Jesús cae por tercera vez", r: "Jesús está agotado, pero sigue adelante por amor. Rezamos por los que sufren mucho." },
  { t: "Jesús es despojado de sus vestiduras", r: "Le quitan la ropa a Jesús. Rezamos por los que no tienen lo necesario para vivir." },
  { t: "Jesús es clavado en la cruz", r: "Jesús perdona a quienes le hacen daño. Le pedimos saber perdonar." },
  { t: "Jesús muere en la cruz", r: "Jesús da la vida por nosotros. Nos quedamos un momento en silencio y le damos gracias." },
  { t: "Jesús es bajado de la cruz y entregado a su Madre", r: "María recibe a Jesús en sus brazos. Le pedimos que nos cuide también a nosotros." },
  { t: "Jesús es sepultado", r: "Ponen a Jesús en el sepulcro. Pero la historia no termina aquí: ¡al tercer día resucitará!" }
];

const BLOQUES = [
  /* ---------------------------------------------------------------- 1 */
  {
    id: "at", num: 1, titulo: "Antiguo Testamento", color: "#3F7D6E", obligatorio: true,
    resumen: "La Creación, Noé, Abraham, Moisés, David y los profetas.",
    lecciones: [
      { t: "La Biblia", x: "La Biblia es la Palabra de Dios. La escribieron personas a las que Dios inspiró con su Espíritu Santo. Tiene dos grandes partes: el Antiguo Testamento, que cuenta la historia del pueblo de Dios antes de Jesús, y el Nuevo Testamento, que nos habla de Jesús y de los primeros cristianos." },
      { t: "La Creación", x: "Dios creó por amor el cielo, la tierra, el mar, las plantas y los animales. Después creó al hombre y a la mujer a su imagen, para que fueran sus amigos y cuidaran del mundo. Los primeros fueron Adán y Eva." },
      { t: "El primer pecado", x: "Adán y Eva desobedecieron a Dios y se apartaron de Él. A eso lo llamamos pecado original. Pero Dios no los abandonó: prometió enviar un Salvador. Ese Salvador es Jesús." },
      { t: "Noé y el arca", x: "Dios pidió a Noé, un hombre bueno, que construyera un arca para salvar a su familia y a los animales del diluvio. Al terminar, Dios puso un arcoíris en el cielo como señal de su alianza: nunca dejaría de cuidar de nosotros." },
      { t: "Abraham, padre en la fe", x: "Dios pidió a Abraham que dejara su tierra y confiara en Él. Abraham obedeció. Dios le prometió una familia tan numerosa como las estrellas del cielo. Por su gran confianza le llamamos padre en la fe." },
      { t: "Moisés", x: "El pueblo de Israel era esclavo en Egipto. Dios eligió a Moisés para liberarlo. Cruzaron el mar Rojo y, en el desierto, Dios les alimentó con el maná. En el monte Sinaí, Dios entregó a Moisés los Diez Mandamientos." },
      { t: "El rey David", x: "David era un joven pastor que venció al gigante Goliat confiando en Dios. Después fue rey de Israel y escribió muchos salmos, que son oraciones cantadas. De su familia nacería Jesús." },
      { t: "Los profetas", x: "Los profetas, como Isaías o Jeremías, hablaban en nombre de Dios. Recordaban al pueblo que debía ser fiel y anunciaban que llegaría el Mesías, el Salvador prometido." }
    ],
    preguntas: [
      ["¿Cuáles son las dos partes de la Biblia?", ["Antiguo y Nuevo Testamento", "El principio y el final", "Los Salmos y los Evangelios", "Los profetas y los reyes"], "La Biblia tiene dos partes: el Antiguo Testamento (antes de Jesús) y el Nuevo Testamento (Jesús y los primeros cristianos)."],
      ["¿Quién creó el cielo, la tierra y todo lo que existe?", ["Dios", "Adán", "Los ángeles", "Moisés"], "Dios creó todo lo que existe, y lo hizo por amor."],
      ["¿A imagen de quién creó Dios al hombre y a la mujer?", ["A su propia imagen", "A imagen de los ángeles", "A imagen de los animales", "A imagen de las estrellas"], "Dios nos creó a su imagen para que fuéramos sus amigos."],
      ["¿Cómo se llamaban el primer hombre y la primera mujer?", ["Adán y Eva", "Abraham y Sara", "José y María", "Isaac y Rebeca"], "Adán y Eva fueron los primeros seres humanos."],
      ["¿Qué prometió Dios después del pecado de Adán y Eva?", ["Enviar un Salvador", "No volver a hablarles nunca", "Crear otro mundo", "Quitarles el sol"], "Dios no nos abandona: prometió un Salvador, que es Jesús."],
      ["¿Qué construyó Noé por encargo de Dios?", ["Un arca", "Una torre muy alta", "Un templo", "Un puente"], "Noé construyó un arca para salvar a su familia y a los animales del diluvio."],
      ["¿Qué señal puso Dios en el cielo después del diluvio?", ["Un arcoíris", "Una estrella fugaz", "La luna llena", "Un rayo"], "El arcoíris es la señal de la alianza de Dios con Noé."],
      ["¿A quién llamamos «padre en la fe»?", ["A Abraham", "A Noé", "A David", "A Jonás"], "Abraham confió en Dios y dejó su tierra cuando Él se lo pidió."],
      ["¿Quién sacó al pueblo de Israel de la esclavitud en Egipto?", ["Moisés", "David", "Abraham", "Elías"], "Dios eligió a Moisés para liberar a su pueblo."],
      ["¿Dónde recibió Moisés los Diez Mandamientos?", ["En el monte Sinaí", "En Belén", "En el río Jordán", "En Nazaret"], "Dios dio los Diez Mandamientos a Moisés en el monte Sinaí."],
      ["¿Qué alimento envió Dios a su pueblo en el desierto?", ["El maná", "Manzanas", "Pescado frito", "Uvas"], "El maná era un pan que Dios enviaba cada mañana en el desierto."],
      ["¿Qué joven pastor venció al gigante Goliat?", ["David", "Moisés", "Noé", "Pedro"], "David venció a Goliat porque confiaba en Dios. Después fue rey."],
      ["¿Qué anunciaban los profetas?", ["Que llegaría el Salvador, el Mesías", "El tiempo que iba a hacer", "Las fiestas del pueblo", "Los nombres de los reyes de Egipto"], "Los profetas anunciaban la llegada del Mesías prometido."],
      ["Verdadero o falso: la Biblia es la Palabra de Dios.", ["Verdadero", "Falso"], "Verdadero. La escribieron personas inspiradas por el Espíritu Santo."]
    ]
  },

  /* ---------------------------------------------------------------- 2 */
  {
    id: "nt", num: 2, titulo: "Nuevo Testamento", color: "#B5612E", obligatorio: true,
    resumen: "La vida de Jesús: nacimiento, milagros, parábolas, muerte y Resurrección.",
    lecciones: [
      { t: "Los Evangelios", x: "La vida de Jesús la conocemos sobre todo por los cuatro Evangelios, escritos por san Mateo, san Marcos, san Lucas y san Juan. «Evangelio» significa «buena noticia»." },
      { t: "La Anunciación y la Navidad", x: "El ángel Gabriel anunció a la Virgen María que sería la madre del Hijo de Dios. María dijo «sí». Jesús nació en Belén, en un pesebre. San José, esposo de María, cuidó de Jesús como un padre." },
      { t: "El Bautismo de Jesús", x: "Cuando Jesús era mayor, Juan el Bautista lo bautizó en el río Jordán. Se oyó la voz del Padre: «Este es mi Hijo amado», y el Espíritu Santo bajó en forma de paloma." },
      { t: "Los apóstoles", x: "Jesús eligió a doce apóstoles para que estuvieran con Él y anunciaran su mensaje. Entre ellos estaban Pedro, Andrés, Santiago y Juan. A Pedro le puso al frente de todos." },
      { t: "Los milagros", x: "Jesús hizo milagros para mostrar el amor de Dios: convirtió el agua en vino en las bodas de Caná, multiplicó los panes y los peces, curó a enfermos y calmó una tempestad." },
      { t: "Las parábolas", x: "Jesús enseñaba con parábolas, historias sencillas con un mensaje. En la del hijo pródigo, el padre abraza a su hijo cuando vuelve: así nos perdona Dios. En la del buen samaritano, aprendemos a ayudar a quien lo necesita." },
      { t: "La Última Cena y la cruz", x: "El Jueves Santo, Jesús cenó con sus apóstoles y les dio el pan y el vino diciendo: «Esto es mi Cuerpo… esta es mi Sangre». Así instituyó la Eucaristía. El Viernes Santo murió en la cruz para salvarnos." },
      { t: "¡Resucitó!", x: "Al tercer día, el domingo, Jesús resucitó. Es la gran fiesta de la Pascua. Cuarenta días después subió al cielo, y en Pentecostés envió el Espíritu Santo sobre los apóstoles y la Virgen María." }
    ],
    preguntas: [
      ["¿Cuántos Evangelios hay?", ["Cuatro", "Uno", "Doce", "Siete"], "Son cuatro: los de Mateo, Marcos, Lucas y Juan."],
      ["¿Qué significa la palabra «Evangelio»?", ["Buena noticia", "Libro antiguo", "Oración larga", "Canción"], "Evangelio significa «buena noticia»: la buena noticia de Jesús."],
      ["¿Qué ángel anunció a María que sería la madre de Jesús?", ["El ángel Gabriel", "El ángel Miguel", "El ángel Rafael", "Ningún ángel"], "El ángel Gabriel visitó a María en Nazaret."],
      ["¿En qué ciudad nació Jesús?", ["En Belén", "En Nazaret", "En Jerusalén", "En Roma"], "Jesús nació en Belén, en un pesebre."],
      ["¿Quién era san José?", ["El esposo de María, que cuidó de Jesús", "Un apóstol", "Un rey de Israel", "Un profeta del Antiguo Testamento"], "San José cuidó de Jesús y de María con mucho amor."],
      ["¿Quién bautizó a Jesús en el río Jordán?", ["Juan el Bautista", "San Pedro", "San José", "San Pablo"], "Juan el Bautista bautizó a Jesús en el río Jordán."],
      ["¿Cuántos apóstoles eligió Jesús?", ["Doce", "Siete", "Diez", "Cuarenta"], "Jesús eligió a doce apóstoles."],
      ["¿A qué apóstol puso Jesús al frente de todos?", ["A Pedro", "A Judas", "A Tomás", "A Mateo"], "Jesús puso a Pedro al frente de los apóstoles. El Papa es su sucesor."],
      ["¿Qué hizo Jesús en las bodas de Caná?", ["Convirtió el agua en vino", "Multiplicó los panes", "Calmó una tempestad", "Curó a un ciego"], "En Caná, Jesús convirtió el agua en vino. Fue su primer milagro."],
      ["¿Qué es una parábola?", ["Una historia sencilla con la que Jesús enseña", "Un tipo de milagro", "Una oración a la Virgen", "Una fiesta judía"], "Las parábolas son historias con un mensaje, como la del hijo pródigo."],
      ["En la parábola del hijo pródigo, ¿qué hace el padre cuando su hijo vuelve?", ["Le abraza y hace una fiesta", "Le cierra la puerta", "Le castiga para siempre", "No le reconoce"], "Así es Dios: siempre nos espera y nos perdona."],
      ["¿Qué hizo Jesús en la Última Cena?", ["Instituyó la Eucaristía con el pan y el vino", "Bautizó a los apóstoles", "Subió al cielo", "Nació en Belén"], "En la Última Cena, Jesús nos dejó la Eucaristía."],
      ["¿Qué día murió Jesús en la cruz?", ["El Viernes Santo", "El Jueves Santo", "El Domingo de Ramos", "En Navidad"], "Jesús murió en la cruz el Viernes Santo para salvarnos."],
      ["¿Cuándo resucitó Jesús?", ["Al tercer día, el domingo", "A los cuarenta días", "Al día siguiente, el sábado", "En Navidad"], "Jesús resucitó al tercer día: es la fiesta de la Pascua."],
      ["¿Qué ocurrió en Pentecostés?", ["El Espíritu Santo vino sobre los apóstoles y la Virgen María", "Nació Jesús", "Jesús fue bautizado", "Moisés recibió los Mandamientos"], "En Pentecostés, el Espíritu Santo llenó de fuerza a los apóstoles."]
    ]
  },

  /* ---------------------------------------------------------------- 3 */
  {
    id: "sac", num: 3, titulo: "Los sacramentos", color: "#2F6FB0", obligatorio: true,
    resumen: "Los siete sacramentos, con detalle en Bautismo, Confesión y Eucaristía.",
    lecciones: [
      { t: "¿Qué es un sacramento?", x: "Un sacramento es un signo que podemos ver y tocar (agua, pan, aceite…) por el que Jesús nos da su gracia, es decir, su vida y su amor. Jesús nos dejó siete sacramentos." },
      { t: "Los siete sacramentos", x: "Bautismo, Confirmación y Eucaristía nos hacen cristianos. Penitencia (Confesión) y Unción de los enfermos nos curan. Orden sacerdotal y Matrimonio sirven a los demás." },
      { t: "El Bautismo", x: "Es el primer sacramento. Con el agua y las palabras del sacerdote, nos hacemos hijos de Dios y miembros de la Iglesia, y se nos borra el pecado original." },
      { t: "La Confesión", x: "En el sacramento de la Penitencia o Reconciliación, Dios nos perdona los pecados a través del sacerdote. Para confesarnos bien: 1) examen de conciencia, 2) dolor de los pecados, 3) propósito de enmienda, 4) decir los pecados al sacerdote y 5) cumplir la penitencia. Antes de tu Primera Comunión harás tu primera confesión." },
      { t: "La Eucaristía", x: "En la Misa, por las palabras del sacerdote en la consagración, el pan y el vino se convierten en el Cuerpo y la Sangre de Jesús. Ya no son pan y vino aunque lo parezcan: Jesús está ahí de verdad. Recibirlo es comulgar. ¡Es lo que vas a hacer en tu Primera Comunión!" },
      { t: "Confirmación y Unción", x: "En la Confirmación recibimos la fuerza del Espíritu Santo con el aceite del santo crisma, normalmente de manos del obispo. La Unción de los enfermos da fuerza y consuelo a quienes están gravemente enfermos o son muy mayores." },
      { t: "Orden y Matrimonio", x: "Por el Orden sacerdotal, algunos hombres se hacen diáconos, sacerdotes u obispos para servir a la Iglesia. Por el Matrimonio, un hombre y una mujer se unen para siempre ante Dios y forman una familia." }
    ],
    preguntas: [
      ["¿Qué es un sacramento?", ["Un signo por el que Jesús nos da su gracia", "Un premio por portarse bien", "Una fiesta del pueblo", "Un libro de la Biblia"], "Los sacramentos son signos visibles por los que Jesús nos da su vida y su amor."],
      ["¿Cuántos sacramentos hay?", ["Siete", "Tres", "Diez", "Doce"], "Hay siete sacramentos."],
      ["¿Cuál es el primer sacramento que recibimos?", ["El Bautismo", "La Eucaristía", "La Confirmación", "El Matrimonio"], "El Bautismo es la puerta de los demás sacramentos."],
      ["¿Qué signo se usa en el Bautismo?", ["El agua", "El pan", "El anillo", "La ceniza"], "En el Bautismo se derrama agua mientras el sacerdote dice las palabras del sacramento."],
      ["¿Qué sacramento recibes en tu Primera Comunión?", ["La Eucaristía", "La Confirmación", "El Bautismo", "La Unción de los enfermos"], "En la Primera Comunión recibes por primera vez a Jesús en la Eucaristía."],
      ["Después de la consagración, ¿qué hay en el altar?", ["El Cuerpo y la Sangre de Jesús", "Solo pan y vino como recuerdo", "Una comida para compartir", "Un dibujo de Jesús"], "Jesús está presente de verdad en la Eucaristía, aunque se vea como pan y vino."],
      ["¿En qué sacramento nos perdona Dios los pecados?", ["En la Penitencia o Confesión", "En el Matrimonio", "En la Confirmación", "En el Orden sacerdotal"], "En la Confesión, Dios nos perdona a través del sacerdote."],
      ["¿Qué es lo primero que hacemos para confesarnos bien?", ["El examen de conciencia", "Cumplir la penitencia", "Rezar el Credo", "Comulgar"], "Primero pensamos qué hemos hecho mal: es el examen de conciencia."],
      ["¿Cuál de estas cosas NO forma parte de una buena confesión?", ["Contar los pecados de otras personas", "Arrepentirse de los pecados", "Decir los pecados al sacerdote", "Cumplir la penitencia"], "En la confesión decimos nuestros propios pecados, nunca los de los demás."],
      ["¿Qué sacramento nos da la fuerza del Espíritu Santo con el santo crisma?", ["La Confirmación", "El Bautismo", "La Eucaristía", "El Matrimonio"], "La Confirmación la da normalmente el obispo."],
      ["¿Qué sacramento une para siempre a un hombre y una mujer?", ["El Matrimonio", "El Orden sacerdotal", "La Confirmación", "La Penitencia"], "En el Matrimonio, los esposos se prometen amor para toda la vida."],
      ["¿Por qué sacramento se ordena a un sacerdote?", ["Por el Orden sacerdotal", "Por el Bautismo", "Por la Confirmación", "Por la Unción de los enfermos"], "El Orden sacerdotal hace diáconos, sacerdotes y obispos."],
      ["¿Qué sacramento ayuda a las personas gravemente enfermas?", ["La Unción de los enfermos", "El Matrimonio", "La Confirmación", "El Orden sacerdotal"], "La Unción da fuerza y consuelo a los enfermos graves y a los muy mayores."]
    ]
  },

  /* ---------------------------------------------------------------- 4 */
  {
    id: "man", num: 4, titulo: "Los Mandamientos", color: "#8A4FA3", obligatorio: true,
    resumen: "Los dos mandamientos del amor y los diez de la Ley de Dios.",
    lecciones: [
      { t: "El mandamiento del amor", x: "Jesús resumió todos los mandamientos en dos: amarás a Dios sobre todas las cosas, y al prójimo como a ti mismo. Nuestro prójimo son todas las personas." },
      { t: "Los Diez Mandamientos", x: "1. Amarás a Dios sobre todas las cosas.\n2. No tomarás el nombre de Dios en vano.\n3. Santificarás las fiestas.\n4. Honrarás a tu padre y a tu madre.\n5. No matarás.\n6. No cometerás actos impuros.\n7. No robarás.\n8. No dirás falso testimonio ni mentirás.\n9. No consentirás pensamientos ni deseos impuros.\n10. No codiciarás los bienes ajenos." },
      { t: "Los tres primeros: amar a Dios", x: "Los tres primeros mandamientos nos enseñan a amar a Dios: ponerle en primer lugar, hablar de Él con respeto e ir a Misa los domingos y días de fiesta." },
      { t: "Los otros siete: amar a los demás", x: "Los demás mandamientos nos enseñan a amar a los demás: obedecer y querer a nuestros padres, cuidar la vida, no robar, decir siempre la verdad y no tener envidia de lo que tienen los otros." },
      { t: "Los mandamientos de la Iglesia", x: "La Iglesia nos pide además: oír Misa entera los domingos y fiestas de precepto; confesar los pecados al menos una vez al año; comulgar por Pascua; ayunar y no comer carne cuando lo manda la Iglesia; y ayudar a la Iglesia en sus necesidades." }
    ],
    preguntas: [
      ["¿Cuántos son los Mandamientos de la Ley de Dios?", ["Diez", "Siete", "Cinco", "Doce"], "Son diez, y Dios se los dio a Moisés."],
      ["¿Cuál es el primer mandamiento?", ["Amarás a Dios sobre todas las cosas", "No robarás", "Honrarás a tu padre y a tu madre", "No matarás"], "El primero es amar a Dios por encima de todo."],
      ["¿En qué dos mandamientos resumió Jesús los diez?", ["Amar a Dios sobre todas las cosas y al prójimo como a ti mismo", "No robar y no mentir", "Ir a Misa y rezar", "Obedecer y estudiar"], "Todo se resume en el amor a Dios y a los demás."],
      ["¿Quién es nuestro prójimo?", ["Todas las personas", "Solo nuestros amigos", "Solo nuestra familia", "Solo los vecinos"], "Para Jesús, el prójimo es cualquier persona, como enseña la parábola del buen samaritano."],
      ["¿Qué número es «Honrarás a tu padre y a tu madre»?", ["El cuarto", "El primero", "El séptimo", "El décimo"], "El cuarto mandamiento nos pide querer y obedecer a nuestros padres."],
      ["Si alguien coge algo de un compañero sin permiso, ¿qué mandamiento incumple?", ["No robarás", "No matarás", "Santificarás las fiestas", "No tomarás el nombre de Dios en vano"], "Coger lo que no es nuestro va contra el séptimo mandamiento."],
      ["Decir mentiras va contra el mandamiento…", ["No dirás falso testimonio ni mentirás", "No robarás", "Santificarás las fiestas", "No matarás"], "Es el octavo mandamiento: decir siempre la verdad."],
      ["¿Qué nos pide «Santificarás las fiestas»?", ["Ir a Misa los domingos y días de fiesta", "Hacer muchas fiestas de cumpleaños", "No trabajar nunca", "Comer dulces los domingos"], "El tercer mandamiento nos pide dedicar el domingo a Dios, sobre todo yendo a Misa."],
      ["¿Qué nos pide el segundo mandamiento?", ["No usar el nombre de Dios en vano", "No mentir", "No tener envidia", "Ir a Misa"], "Hablamos de Dios siempre con respeto y cariño."],
      ["Además de no hacer daño, ¿qué nos pide «No matarás»?", ["Cuidar la vida, la nuestra y la de los demás", "No comer carne", "No hacer deporte", "No salir de casa"], "El quinto mandamiento nos pide respetar y cuidar toda vida humana."],
      ["Tener envidia de los juguetes de otro niño va contra…", ["El décimo mandamiento", "El primer mandamiento", "El cuarto mandamiento", "El tercer mandamiento"], "El décimo: «No codiciarás los bienes ajenos»."],
      ["¿Cuál de estos es un mandamiento de la Iglesia?", ["Oír Misa entera los domingos y fiestas de precepto", "Rezar diez Rosarios al día", "Ir de peregrinación cada mes", "Leer la Biblia entera cada año"], "Es el primero de los cinco mandamientos de la Iglesia."]
    ]
  },

  /* ---------------------------------------------------------------- 5 */
  {
    id: "ora", num: 5, titulo: "Oraciones básicas", color: "#C0882E", obligatorio: true,
    resumen: "Señal de la cruz, Padre Nuestro, Ave María, Gloria, Credo y más.",
    lecciones: [
      { t: "¿Qué es rezar?", x: "Rezar es hablar con Dios, como hablamos con alguien que nos quiere mucho. Podemos rezar con nuestras propias palabras o con oraciones que la Iglesia nos enseña. Aquí tienes las básicas, para aprenderlas de memoria." },
      { t: ORACIONES.senal.titulo, x: ORACIONES.senal.texto, oracion: true },
      { t: ORACIONES.padrenuestro.titulo, x: ORACIONES.padrenuestro.texto, oracion: true },
      { t: ORACIONES.avemaria.titulo, x: ORACIONES.avemaria.texto, oracion: true },
      { t: ORACIONES.gloria.titulo, x: ORACIONES.gloria.texto, oracion: true },
      { t: ORACIONES.credo.titulo, x: ORACIONES.credo.texto, oracion: true },
      { t: ORACIONES.senormio.titulo, x: ORACIONES.senormio.texto, oracion: true },
      { t: ORACIONES.angel.titulo, x: ORACIONES.angel.texto, oracion: true }
    ],
    preguntas: [
      ["¿Qué es rezar?", ["Hablar con Dios", "Cantar muy alto", "Leer un cuento", "Estar callado sin pensar"], "Rezar es hablar con Dios, que nos quiere y nos escucha."],
      ["¿Qué oración nos enseñó el mismo Jesús?", ["El Padre Nuestro", "El Ave María", "La Salve", "El Ángel de la Guarda"], "Jesús enseñó el Padre Nuestro a sus discípulos."],
      ["Completa: «Dios te salve, María, llena eres de…»", ["gracia", "alegría", "luz", "flores"], "«Llena eres de gracia, el Señor es contigo»."],
      ["¿Qué oración empieza «Gloria al Padre, y al Hijo…»?", ["El Gloria", "El Credo", "El Padre Nuestro", "La Salve"], "El Gloria alaba a la Santísima Trinidad."],
      ["¿Qué oración resume todo lo que creemos los cristianos?", ["El Credo", "El Gloria", "El Ángel de la Guarda", "El Ave María"], "«Credo» significa «creo»: en él decimos todo lo que creemos."],
      ["En el Padre Nuestro decimos: «Perdona nuestras ofensas…»", ["como también nosotros perdonamos a los que nos ofenden", "y castiga a los que nos ofenden", "y danos muchos regalos", "porque somos muy buenos"], "Dios nos perdona y nos pide que también perdonemos."],
      ["¿Qué oración rezamos para pedir perdón, por ejemplo al confesarnos?", ["Señor mío Jesucristo", "El Gloria", "El Ángel de la Guarda", "El Credo"], "El «Señor mío Jesucristo» es un acto de contrición: decimos a Dios que nos pesa haberle ofendido."],
      ["¿A quién pedimos que nos cuide de día y de noche en una oración muy conocida?", ["Al Ángel de la Guarda", "Al Papa", "A los Reyes Magos", "Al obispo"], "«Ángel de la Guarda, dulce compañía…»."],
      ["¿Con qué palabras termina la señal de la cruz?", ["«En el nombre del Padre, y del Hijo, y del Espíritu Santo. Amén»", "«Hasta mañana, Señor»", "«Por los siglos de los siglos»", "«Ruega por nosotros»"], "Así nos ponemos en manos de la Santísima Trinidad."],
      ["¿Qué significa «Amén»?", ["Así sea; sí, lo creo", "Adiós", "Hasta pronto", "Gracias"], "Al decir «Amén» decimos que estamos de acuerdo y que lo creemos."],
      ["¿A quién rezamos el Ave María?", ["A la Virgen María", "A san José", "Al Papa", "A los apóstoles"], "El Ave María es el saludo del ángel Gabriel a María."],
      ["En el Credo decimos que Jesús «al tercer día…»", ["resucitó de entre los muertos", "nació en Belén", "fue bautizado", "subió a un monte"], "La Resurrección de Jesús es el centro de nuestra fe."]
    ]
  },

  /* ---------------------------------------------------------------- 6 */
  {
    id: "ges", num: 6, titulo: "Gestos en la iglesia", color: "#4F7A2A", obligatorio: true,
    resumen: "Santiguarse, genuflexión, posturas en Misa y cómo comulgar.",
    lecciones: [
      { t: "Al entrar en la iglesia", x: "Al entrar mojamos los dedos en el agua bendita y nos santiguamos: así recordamos nuestro Bautismo. Hablamos en voz baja, porque la iglesia es la casa de Dios." },
      { t: "La genuflexión", x: "La genuflexión es doblar la rodilla derecha hasta el suelo ante el Sagrario, la cajita donde se guarda la Eucaristía. Una lamparita roja encendida nos indica que Jesús está ahí." },
      { t: "Las posturas en Misa", x: "De pie: para rezar juntos y escuchar el Evangelio. Sentados: durante las lecturas y la homilía. De rodillas: en la consagración, cuando el pan y el vino se convierten en el Cuerpo y la Sangre de Cristo." },
      { t: "Antes del Evangelio", x: "Antes de escuchar el Evangelio nos hacemos tres pequeñas cruces con el pulgar: en la frente, en la boca y en el pecho. Pedimos que la Palabra de Dios esté en lo que pensamos, en lo que decimos y en nuestro corazón." },
      { t: "La paz", x: "Antes de comulgar, el sacerdote nos invita a darnos la paz. Damos la mano o saludamos a quienes están cerca y les deseamos la paz de Cristo." },
      { t: "Cómo comulgar", x: "Una hora antes no comemos nada (agua y medicinas sí): es el ayuno eucarístico. Vamos en fila con respeto. El sacerdote dice «El Cuerpo de Cristo» y respondemos «Amén». Si comulgamos en la mano, ponemos una mano sobre la otra, como haciendo un trono, y tomamos la Sagrada Forma allí mismo, delante del sacerdote. También podemos recibirla en la boca. Después volvemos al sitio y damos gracias a Jesús." }
    ],
    preguntas: [
      ["Al entrar en la iglesia, ¿qué hacemos con el agua bendita?", ["Nos santiguamos", "Nos lavamos las manos", "Nos la bebemos", "Nada, solo se mira"], "Santiguarnos con agua bendita nos recuerda nuestro Bautismo."],
      ["¿Ante qué hacemos la genuflexión?", ["Ante el Sagrario, donde está Jesús", "Ante la puerta de la iglesia", "Ante el coro", "Ante cualquier persona"], "Doblamos la rodilla ante Jesús presente en el Sagrario."],
      ["¿Qué nos indica la lamparita roja junto al Sagrario?", ["Que Jesús está presente en el Sagrario", "Que la iglesia está cerrada", "Que empieza la Misa", "Que hay que guardar silencio solo un rato"], "La lamparita encendida nos recuerda que Jesús está ahí."],
      ["¿Cómo escuchamos el Evangelio?", ["De pie", "Sentados", "De rodillas", "Tumbados"], "Nos ponemos de pie porque es Jesús quien nos habla."],
      ["Antes del Evangelio nos hacemos tres pequeñas cruces en…", ["la frente, la boca y el pecho", "las manos y los pies", "los hombros y la cabeza", "la nariz y las orejas"], "Para que la Palabra de Dios esté en nuestra mente, en nuestros labios y en nuestro corazón."],
      ["¿En qué momento de la Misa nos arrodillamos?", ["En la consagración", "En las lecturas", "En la homilía", "En los avisos"], "En la consagración el pan y el vino se convierten en el Cuerpo y la Sangre de Cristo."],
      ["Cuando el sacerdote te dice «El Cuerpo de Cristo», ¿qué respondes?", ["Amén", "Gracias", "Hola", "Igualmente"], "Al decir «Amén» decimos: «Sí, creo que eres Jesús»."],
      ["Si comulgas en la mano, ¿qué haces con la Sagrada Forma?", ["La tomo allí mismo, delante del sacerdote", "Me la guardo para luego", "Se la doy a mi familia", "La llevo a mi sitio"], "Se comulga enseguida, delante del sacerdote, con mucho respeto."],
      ["¿Cuánto tiempo antes de comulgar no debemos comer nada?", ["Una hora", "Un día entero", "Cinco minutos", "No hace falta esperar"], "Es el ayuno eucarístico. El agua y las medicinas sí se pueden tomar."],
      ["¿Qué hacemos en el rito de la paz?", ["Nos deseamos la paz de Cristo con quienes están cerca", "Nos vamos a casa", "Cantamos el Gloria", "Encendemos velas"], "Damos la paz antes de comulgar."],
      ["¿Cuándo estamos sentados en Misa?", ["Durante las lecturas y la homilía", "Durante el Evangelio", "Durante la consagración", "Toda la Misa"], "Sentados escuchamos con atención las lecturas y la homilía."],
      ["¿Qué hacemos al volver a nuestro sitio después de comulgar?", ["Dar gracias a Jesús en silencio", "Hablar con el de al lado", "Mirar el móvil", "Salir de la iglesia"], "Es un momento precioso para hablar con Jesús, que está en nuestro corazón."]
    ]
  },

  /* ---------------------------------------------------------------- 7 */
  {
    id: "mis", num: 7, titulo: "Las partes de la Misa", color: "#A83B4E", obligatorio: true,
    resumen: "Ritos iniciales, Liturgia de la Palabra, Liturgia Eucarística y despedida.",
    lecciones: [
      { t: "¿Qué es la Misa?", x: "La Misa es la gran celebración de los cristianos. En ella escuchamos a Dios y recibimos a Jesús. Tiene dos partes principales, la Liturgia de la Palabra y la Liturgia Eucarística, con un comienzo y una despedida." },
      { t: "1. Ritos iniciales", x: "Entramos cantando, nos santiguamos y el sacerdote nos saluda. En el acto penitencial pedimos perdón a Dios («Señor, ten piedad»). Los domingos cantamos el Gloria (salvo en Adviento y Cuaresma) y el sacerdote reza la oración colecta." },
      { t: "2. Liturgia de la Palabra", x: "Dios nos habla. Escuchamos la primera lectura (normalmente del Antiguo Testamento), el salmo, la segunda lectura los domingos, el Aleluya y el Evangelio, que lee el sacerdote o el diácono. Después viene la homilía, en la que el sacerdote nos explica las lecturas. Los domingos rezamos el Credo y, al final, la oración de los fieles, en la que pedimos por la Iglesia y por el mundo." },
      { t: "3. Liturgia Eucarística", x: "Se llevan al altar el pan y el vino (presentación de las ofrendas). En la plegaria eucarística, cantamos el Santo y llega la consagración: el pan y el vino se convierten en el Cuerpo y la Sangre de Cristo. Después rezamos el Padre Nuestro, nos damos la paz, decimos el Cordero de Dios y comulgamos." },
      { t: "4. Rito de conclusión", x: "El sacerdote nos da la bendición y nos despide: «Podéis ir en paz». Respondemos: «Demos gracias a Dios». ¡Salimos a vivir lo que hemos celebrado!" }
    ],
    preguntas: [
      ["¿Cuáles son las dos partes principales de la Misa?", ["Liturgia de la Palabra y Liturgia Eucarística", "El saludo y la despedida", "Los cantos y los avisos", "La entrada y la salida"], "Primero Dios nos habla y después recibimos a Jesús en la Eucaristía."],
      ["¿Qué va antes en la Misa?", ["La Liturgia de la Palabra", "La Liturgia Eucarística", "La comunión", "La bendición final"], "Primero escuchamos la Palabra de Dios y después celebramos la Eucaristía."],
      ["Al comienzo de la Misa pedimos perdón a Dios en el…", ["acto penitencial", "ofertorio", "Credo", "rito de la paz"], "Decimos «Señor, ten piedad» para pedir perdón."],
      ["La primera lectura normalmente es del…", ["Antiguo Testamento", "Evangelio", "periódico", "catecismo"], "Salvo en Pascua, la primera lectura suele ser del Antiguo Testamento."],
      ["¿Quién lee el Evangelio en la Misa?", ["El sacerdote o el diácono", "Cualquier niño", "El monaguillo", "El coro"], "El Evangelio lo proclama el sacerdote o el diácono."],
      ["¿Cómo se llama la explicación de las lecturas que hace el sacerdote?", ["Homilía", "Ofertorio", "Colecta", "Bendición"], "En la homilía, el sacerdote nos ayuda a entender la Palabra de Dios."],
      ["¿Qué hacemos en la oración de los fieles?", ["Pedimos por la Iglesia, por el mundo y por quienes lo necesitan", "Pedimos regalos", "Cantamos el Gloria", "Damos la paz"], "Es el momento de pedir a Dios por todos."],
      ["¿Qué se lleva al altar en la presentación de las ofrendas?", ["El pan y el vino", "Flores y velas", "La Biblia", "Agua bendita"], "El pan y el vino se convertirán en el Cuerpo y la Sangre de Cristo."],
      ["¿Cómo se llama el momento en que el pan y el vino se convierten en el Cuerpo y la Sangre de Cristo?", ["La consagración", "La homilía", "El acto penitencial", "La despedida"], "Es el momento más importante de la Misa."],
      ["¿Qué oración rezamos todos juntos antes de la paz y la comunión?", ["El Padre Nuestro", "El Credo", "La Salve", "El Ángel de la Guarda"], "Rezamos la oración que nos enseñó Jesús."],
      ["¿Qué decimos justo antes de comulgar, mirando a Jesús en la Hostia?", ["«Cordero de Dios, que quitas el pecado del mundo…»", "«Gloria a Dios en el cielo»", "«Podéis ir en paz»", "«Creo en Dios Padre»"], "Jesús es el Cordero de Dios que quita el pecado del mundo."],
      ["¿Cómo termina la Misa?", ["Con la bendición y «Podéis ir en paz»", "Con el Evangelio", "Con la consagración", "Con el Credo"], "Respondemos: «Demos gracias a Dios»."]
    ]
  },

  /* ---------------------------------------------------------------- 8 */
  {
    id: "igl", num: 8, titulo: "La Iglesia", color: "#2D5C8A", obligatorio: true,
    resumen: "Quiénes formamos la Iglesia, sus cargos y la Iglesia en España.",
    lecciones: [
      { t: "La familia de Dios", x: "La Iglesia es la familia de los hijos de Dios. La forman todos los bautizados. Su cabeza es Jesucristo. Decimos que es Católica, Apostólica y Romana: católica porque es para todo el mundo, apostólica porque viene de los apóstoles, y romana porque el Papa, sucesor de san Pedro, es obispo de Roma." },
      { t: "El Papa", x: `El Papa es el sucesor de san Pedro y guía a toda la Iglesia. El Papa actual es ${CONFIG.papa}. Vive en el Vaticano, en Roma.` },
      { t: "Los obispos", x: "Los obispos son los sucesores de los apóstoles. Cada uno guía una diócesis, que es la Iglesia de una zona. Los cardenales son obispos o sacerdotes que ayudan al Papa de forma especial y lo eligen." },
      { t: "Nuestra diócesis", x: `Vivimos en la diócesis de ${CONFIG.diocesis}, y nuestro obispo es ${CONFIG.obispo}. Nuestra diócesis forma parte de la provincia eclesiástica de ${CONFIG.provinciaEclesiastica}, cuyo arzobispo es ${CONFIG.arzobispo}. Todos los obispos de España forman la Conferencia Episcopal Española.` },
      { t: "La parroquia", x: `La parroquia es la comunidad de cristianos de un barrio o un pueblo, con su iglesia. La guía el párroco, un sacerdote enviado por el obispo. Nuestra parroquia es la ${CONFIG.parroquia} de ${CONFIG.ciudad}${CONFIG.parroco ? ", y nuestro párroco es " + CONFIG.parroco : ""}.` },
      { t: "Sacerdotes y diáconos", x: "Los sacerdotes celebran la Misa, perdonan los pecados en la Confesión y cuidan de la comunidad. Los diáconos ayudan al obispo y a los sacerdotes: proclaman el Evangelio, bautizan, celebran bodas y sirven a los pobres." },
      { t: "Religiosos y laicos", x: "Los religiosos y religiosas (frailes, monjas, hermanas) entregan su vida a Dios en una comunidad. Los laicos son la mayoría de los bautizados: padres, madres, niños, catequistas… Todos tenemos una misión en la Iglesia." }
    ],
    preguntas: [
      ["¿Quién es la cabeza de la Iglesia?", ["Jesucristo", "El Papa", "El obispo", "El párroco"], "La cabeza de la Iglesia es Jesucristo. El Papa es quien la guía en la tierra."],
      ["¿Quiénes forman la Iglesia?", ["Todos los bautizados", "Solo los sacerdotes", "Solo los obispos y el Papa", "Solo las monjas"], "Todos los bautizados somos Iglesia."],
      ["¿Quién es el Papa?", ["El sucesor de san Pedro, que guía a toda la Iglesia", "El obispo de nuestra ciudad", "El sacerdote más anciano", "Un rey"], "El Papa es el sucesor de Pedro y obispo de Roma."],
      ["¿Cómo se llama el Papa actual?", [CONFIG.papa, "Juan XXIII", "Pío X", "Gregorio Magno"], `El Papa actual es ${CONFIG.papa}.`],
      ["¿Por qué decimos que la Iglesia es «apostólica»?", ["Porque viene de los apóstoles", "Porque está en Roma", "Porque es muy antigua", "Porque tiene muchos edificios"], "La Iglesia está fundada sobre los apóstoles y sus sucesores, los obispos."],
      ["¿Quiénes son los obispos?", ["Los sucesores de los apóstoles, que guían cada diócesis", "Los ayudantes del párroco", "Los que cantan en el coro", "Los profetas del Antiguo Testamento"], "Cada obispo guía una diócesis."],
      ["¿Cómo se llama nuestra diócesis?", [CONFIG.diocesis, "Madrid", "Toledo", "Santiago de Compostela"], `Pertenecemos a la diócesis de ${CONFIG.diocesis}.`],
      ["¿Quién es el obispo de nuestra diócesis?", [CONFIG.obispo, CONFIG.arzobispo, "Juan Pablo II", "San Pedro"], `Nuestro obispo es ${CONFIG.obispo}.`],
      ["¿Qué es una parroquia?", ["La comunidad de cristianos de un barrio o pueblo, con su iglesia y su párroco", "Un colegio religioso", "Una fiesta de verano", "El palacio del obispo"], `La nuestra es la ${CONFIG.parroquia}.`],
      ["¿Quién es el párroco?", ["El sacerdote que cuida de una parroquia", "El Papa", "El alcalde", "El catequista"], "El párroco es enviado por el obispo para guiar la parroquia."],
      ["¿Qué son los laicos?", ["Los bautizados que no son sacerdotes ni religiosos", "Los que no van a Misa", "Los obispos de otros países", "Los ángeles"], "Padres, madres, niños y catequistas somos laicos."],
      ["¿Qué hacen los diáconos?", ["Proclaman el Evangelio, bautizan y sirven a los pobres", "Eligen al Papa", "Gobiernan una diócesis", "Escriben la Biblia"], "Los diáconos ayudan al obispo y a los sacerdotes."],
      ["¿Qué es la Conferencia Episcopal Española?", ["La reunión de todos los obispos de España", "Un congreso de catequistas", "El Gobierno de España", "Un libro de oraciones"], "Los obispos de España trabajan juntos en la Conferencia Episcopal."],
      ["¿Quiénes son los religiosos y religiosas?", ["Personas que entregan su vida a Dios en una comunidad", "Los que salen en las procesiones", "Los que trabajan en la iglesia por la tarde", "Los padrinos de la Primera Comunión"], "Frailes, monjas y hermanas viven en comunidad dedicados a Dios."]
    ]
  },

  /* ---------------------------------------------------------------- 9 */
  /* Solo la estructura y lo básico (decisión del catequista).            */
  {
    id: "ros", num: 9, titulo: "El Santo Rosario", color: "#3E5BA9", especial: true,
    resumen: "Qué es y cómo se reza, con un rosario para rezar en familia.",
    lecciones: [
      { t: "¿Qué es el Rosario?", x: "El Rosario es una oración en la que, de la mano de la Virgen María, recordamos momentos de la vida de Jesús. Se reza con un rosario: un collar de cuentas que nos ayuda a contar las oraciones." },
      { t: "Cómo se reza", x: "1. Señal de la cruz y Credo.\n2. Un Padre Nuestro, tres Avemarías y un Gloria.\n3. Cinco misterios. En cada uno: se anuncia el misterio, un Padre Nuestro, diez Avemarías, un Gloria y «Oh Jesús mío».\n4. Se termina con la Salve." },
      { t: "Los cuatro grupos de misterios", x: `Los misterios son momentos de la vida de Jesús y de María:\n• Gozosos: la infancia de Jesús (${MISTERIOS.gozosos.diasTexto}).\n• Luminosos: la vida pública de Jesús (${MISTERIOS.luminosos.diasTexto}).\n• Dolorosos: la Pasión de Jesús (${MISTERIOS.dolorosos.diasTexto}).\n• Gloriosos: la Resurrección y el cielo (${MISTERIOS.gloriosos.diasTexto}).\nNo hace falta aprenderlos de memoria: el rosario de la app te dice cuál toca.` },
      { t: ORACIONES.salve.titulo, x: ORACIONES.salve.texto, oracion: true },
      { t: ORACIONES.ohjesus.titulo, x: ORACIONES.ohjesus.texto, oracion: true }
    ],
    preguntas: [
      ["En el Rosario, ¿de la mano de quién recordamos la vida de Jesús?", ["De la Virgen María", "De san Pedro", "De Moisés", "Del Papa"], "El Rosario es la gran oración a María, que siempre nos lleva a Jesús."],
      ["¿Qué es un rosario (el objeto)?", ["Un collar de cuentas que ayuda a contar las oraciones", "Una medalla del Papa", "Un libro de cantos", "Una vela bendecida"], "Cada cuenta es una oración: así no perdemos la cuenta."],
      ["¿Cómo empezamos a rezar el Rosario?", ["Con la señal de la cruz y el Credo", "Con la Salve", "Con diez Avemarías", "Con el Gloria"], "Empezamos en la cruz del rosario, con la señal de la cruz y el Credo."],
      ["Al principio, después del primer Padre Nuestro, ¿cuántas Avemarías rezamos?", ["Tres", "Diez", "Una", "Cinco"], "Tres Avemarías y después un Gloria."],
      ["¿Cuántos misterios se rezan en un Rosario?", ["Cinco", "Diez", "Tres", "Siete"], "Se rezan cinco misterios."],
      ["¿Cuántas Avemarías se rezan en cada misterio?", ["Diez", "Cinco", "Tres", "Doce"], "Por eso a cada misterio también se le llama «decena»."],
      ["Al empezar cada misterio, después de anunciarlo, rezamos…", ["un Padre Nuestro", "la Salve", "el Credo", "el Ángel de la Guarda"], "Cada decena empieza con un Padre Nuestro."],
      ["Al terminar las diez Avemarías de cada misterio, rezamos…", ["un Gloria y «Oh Jesús mío»", "el Credo", "otra vez diez Avemarías", "la Salve"], "Gloria y «Oh Jesús mío» cierran cada misterio."],
      ["¿Qué son los misterios del Rosario?", ["Momentos de la vida de Jesús y de María", "Secretos que nadie sabe", "Adivinanzas", "Nombres de santos"], "En cada misterio pensamos en un momento de la vida de Jesús y de María."],
      ["¿Cuántos grupos de misterios hay?", ["Cuatro: gozosos, luminosos, dolorosos y gloriosos", "Uno", "Dos: alegres y tristes", "Siete, uno por día"], "Cada día de la semana se reza un grupo."],
      ["¿Con qué oración se termina el Rosario?", ["Con la Salve", "Con el Padre Nuestro", "Con el Credo", "Con el Gloria"], "La Salve es un saludo lleno de cariño a la Virgen."]
    ]
  },

  /* ---------------------------------------------------------------- 10 */
  {
    id: "via", num: 10, titulo: "El Vía Crucis", color: "#7A3E2E", especial: true,
    resumen: "El camino de Jesús con la cruz, en catorce estaciones.",
    lecciones: [
      { t: "¿Qué es el Vía Crucis?", x: "«Vía Crucis» significa «camino de la cruz». Es una oración en la que acompañamos a Jesús desde que lo condenan a muerte hasta que lo ponen en el sepulcro. Se reza sobre todo en Cuaresma, los viernes, y de forma especial el Viernes Santo." },
      { t: "Cómo se reza", x: "Tiene catorce estaciones, que son paradas del camino. En muchas iglesias están dibujadas en las paredes, con una cruz encima. En cada estación:\n1. Se anuncia la estación.\n2. Decimos: «Te adoramos, oh Cristo, y te bendecimos.» Y se responde: «Que por tu santa cruz redimiste al mundo.»\n3. Pensamos un momento en lo que le pasó a Jesús.\n4. Se suele rezar un Padre Nuestro.\nMuchas parroquias añaden al final una estación más: la Resurrección." },
      { t: "Las catorce estaciones", x: VIA_CRUCIS.map((e, i) => `${i + 1}. ${e.t}`).join("\n") },
      { t: "¿Por qué lo rezamos?", x: "Jesús sufrió por amor a nosotros. Al acompañarle en su camino le damos gracias y aprendemos a ayudar a los que sufren, como hicieron Simón de Cirene o la Verónica." }
    ],
    preguntas: [
      ["¿Qué significa «Vía Crucis»?", ["Camino de la cruz", "Fiesta de la cruz", "Casa de Dios", "Camino a Belén"], "Vía Crucis es una expresión latina: «camino de la cruz»."],
      ["¿Cuántas estaciones tiene el Vía Crucis?", ["Catorce", "Diez", "Siete", "Doce"], "Son catorce estaciones. Muchas parroquias añaden una más: la Resurrección."],
      ["¿Cuándo se reza sobre todo el Vía Crucis?", ["En Cuaresma, y de forma especial el Viernes Santo", "En Navidad", "En verano", "El día de tu cumpleaños"], "En Cuaresma nos preparamos para la Pascua acompañando a Jesús."],
      ["¿Qué decimos en cada estación?", ["«Te adoramos, oh Cristo, y te bendecimos»", "«Podéis ir en paz»", "«Feliz Navidad»", "«Dios te salve, Reina y Madre»"], "Y se responde: «Que por tu santa cruz redimiste al mundo»."],
      ["¿Con qué empieza el Vía Crucis (primera estación)?", ["Jesús es condenado a muerte", "Jesús nace en Belén", "Jesús resucita", "Jesús es bautizado"], "Pilato condena a Jesús a morir en la cruz."],
      ["¿Cuántas veces cae Jesús con la cruz en el Vía Crucis?", ["Tres", "Una", "Cinco", "Ninguna"], "Las estaciones tercera, séptima y novena recuerdan sus tres caídas."],
      ["¿Quién ayudó a Jesús a llevar la cruz?", ["Simón de Cirene", "Pedro", "Pilato", "Herodes"], "Es la quinta estación. Nosotros también podemos ayudar a quien lo necesita."],
      ["¿Qué hizo la Verónica?", ["Limpió el rostro de Jesús con un paño", "Le dio de comer", "Le quitó la cruz", "Le cantó una canción"], "Es la sexta estación: un gesto de cariño en medio del dolor."],
      ["¿A quién encuentra Jesús en la cuarta estación?", ["A su Madre, la Virgen María", "A Moisés", "A los Reyes Magos", "A Juan el Bautista"], "María acompañó a Jesús hasta la cruz."],
      ["¿Qué recuerda la duodécima estación?", ["Jesús muere en la cruz", "Jesús resucita", "Jesús cae por primera vez", "Jesús es sepultado"], "Es la estación más importante: Jesús da la vida por nosotros."],
      ["¿Cómo termina la última de las catorce estaciones?", ["Jesús es sepultado", "Jesús sube al cielo", "Jesús vuelve a Nazaret", "Jesús entra en Jerusalén"], "La decimocuarta estación: Jesús es puesto en el sepulcro. Al tercer día, ¡resucitará!"]
    ]
  }
];
