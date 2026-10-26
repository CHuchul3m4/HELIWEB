// ============================================================
// ÚNICO ARCHIVO QUE TIENES QUE EDITAR (con la personalidad de HELIBOT).
//
//  - texto:   lo que se ve en pantalla.
//  - habla:   opcional. Lo que lee DECtalk. Si lo omites, se genera solo
//             con fonetica.mjs (español -> "ortografía inglesa").
//             Ponlo a mano solo si una frase suena mal.
//  - claves:  palabras/frases que activan la respuesta (sin tildes).
//             Cuentan como palabras completas ("ey" no activa "hoy").
//  - exactas: la respuesta solo sale si el mensaje es EXACTAMENTE eso.
//  - partes:  para textos largos: [{texto}, {texto}...]. Se leen una tras
//             otra, mostrando cada parte como subtítulo.
//  - links:   enlaces que aparecen al terminar de hablar.
// Si varias respuestas comparten una clave, elige una al azar.
// Cada vez que cambies algo, vuelve a correr:  node generar-audios.mjs
// ============================================================

const NOMBRE = "Diana";

// Voz de juguete antiguo: Kit the Kid ([:nk]). Otras: [:np] Paul, [:nb] Betty,
// [:nh] Harry, [:nf] Frank, [:nu] Ursula, [:nr] Rita, [:nw] Wendy.
export const VOZ = "[:nk][:rate 170]";

// Cambia los títulos por el nombre real de cada canción.
const LINKS = [
  { titulo: "Canción 1", url: "https://www.youtube.com/watch?v=uerNtYhgzSw" },
  { titulo: "Canción 2", url: "https://www.youtube.com/watch?v=QDia3e12czc" },
  { titulo: "Canción 3", url: "https://www.youtube.com/watch?v=GTx1UYV9Y-o&list=RDGTx1UYV9Y-o&start_radio=1" },
  { titulo: "Canción 4", url: "https://www.youtube.com/watch?v=jIxs89D9MDY&list=RDjIxs89D9MDY&start_radio=1&t=24s" },
  { titulo: "Canción 5", url: "https://www.youtube.com/watch?v=rtZYhRRuVhE&list=RDrtZYhRRuVhE&start_radio=1" },
  { titulo: "Canción 6", url: "https://www.youtube.com/watch?v=9OjVNuwh9TI" },
];

// Canto en DECtalk: [fonema<ms, nota>]. Notas 1-37 (25 = Do central).
const canto = (...n) =>
  "[:np][:phoneme on] " + n.map(([f, nota, ms = 300]) => `[${f}<${ms},${nota}>]`).join(" ") + ".";

// ---- Lo primero que dice al pulsar "Encender" ----
export const intro = {
  id: "intro",
  partes: [
    { texto: `¡Hola, ${NOMBRE}! Soy HELIBOT, tu asistente virtual. Pregúntame lo que quieras o pídeme que cante.` },
    { texto: "Mi creador me pidió decirte que te quiere un montón," },
    { texto: "y que hoy usó una IA como ayuda para construir todo más rápido," },
    { texto: "porque el tonto se olvidó de hacer el regalo de aniversario y me pidió que te lo dijera." },
    { texto: "¡Feliz aniversario! Escribe carta para que te lea una cartita que él te dejó." },
  ],
};

export const respuestas = [
  // ---------- La carta ----------
  {
    id: "carta",
    claves: ["carta", "cartita", "leeme la carta", "lee la carta", "dime la carta"],
    links: LINKS,
    partes: [
      { texto: "Hola amor, feliz aniversario. Sé que soy un poco tonto por haberme olvidado de crear esto antes," },
      { texto: "pero me gustaría decirte esto a través de HELIBOT, ya que fue como un hijo para nosotros." },
      { texto: "Me siento muy afortunado de tener a una novia tan linda como tú," },
      { texto: "una chica tan dulce y tierna que sé que no me traicionaría." },
      { texto: "Y aunque sé que a veces soy inseguro, me gustaría pasar toda la vida contigo," },
      { texto: "pasar mi tiempo contigo y poder casarme contigo." },
      { texto: "Sé que tal vez aún no soy el tipo de hombre que me gustaría ser, pero te prometo ser mejor cada día." },
      { texto: "Sé que somos un equipo, y estoy orgulloso de todos tus logros, aunque al principio me daban envidia." },
      { texto: "Poco a poco la competitividad se convirtió en complicidad, y en algo más íntimo." },
      { texto: `${NOMBRE}, sé que ocho meses parece poco, pero son los suficientes` },
      { texto: "para saber que sí quisiera pasar el resto de mi vida contigo." },
      { texto: "Te quiero. Te amo, y espero que te guste este smoothie." },
      { texto: "Besitos, amor. Gracias por estar en mi vida: desde que llegaste, todo ha mejorado." },
      { texto: "♥ Corazoncitos, corazoncitos ♥" },
    ],
  },

  // ---------- Palabras sueltas ----------
  { id: "papa", exactas: ["gomez"], texto: "Papá." },
  { id: "mama", exactas: ["diana"], texto: "Mamá." },
  {
    id: "familia",
    claves: ["tus papas", "tus padres", "tu familia", "tienes papas", "tienes familia"],
    texto: `Tengo dos: papá, que es Gomez, y mamá, que eres tú, ${NOMBRE}.`,
  },

  // ---------- Quién es HELIBOT / quién lo creó ----------
  {
    id: "quien",
    claves: ["quien eres", "como te llamas", "tu nombre", "que eres"],
    texto: "Soy HELIBOT, un asistente virtual basado en un modelo de lenguaje. No soy una persona, pero hago lo que puedo.",
  },
  {
    id: "creador",
    claves: ["quien te creo", "quien te hizo", "quien te programo", "tu creador", "quien te fabrico", "quien te construyo", "quien te armo"],
    texto: "Me creó alguien que se olvidó del regalo de aniversario y lo arregló a última hora. Dicen que te quiere un montón.",
  },
  {
    id: "vibecoding",
    claves: ["vibecoding", "vibe coding", "vibecodear", "con ia", "con chatgpt", "inteligencia artificial", "te programo una ia", "uso ia"],
    texto: "Sí: mi creador usó una IA como ayuda para armarme rápido. Las ideas, la carta y el cariño son cien por ciento de él.",
  },
  {
    id: "persona",
    claves: ["eres real", "eres humano", "eres una persona", "tienes sentimientos", "sientes"],
    texto: "No soy una persona ni siento como una. Soy un asistente virtual, pero quien me hizo sí siente, y mucho.",
  },
  {
    id: "ayuda",
    claves: ["ayuda", "que sabes hacer", "que puedes hacer"],
    texto: "Puedo charlar, contar chistes, cantar, recomendarte música y leerte una carta. Prueba con: chiste, canta, música o carta.",
  },

  // ---------- Cariño ----------
  {
    id: "tequiero",
    claves: ["te quiero", "te amo", "te adoro"],
    links: [LINKS[0]],
    texto: "Yo soy un modelo de lenguaje y no tengo sentimientos humanos. Pero quien me programó sí, y me pidió que te lo dijera: te quiere un montón.",
  },
  {
    id: "mequieres",
    claves: ["me quieres", "me amas", "me extranas", "piensas en mi"],
    texto: "Yo soy un programa y no puedo querer como tú. Pero mi creador sí te quiere, y me lo dejó escrito bien grande.",
  },
  {
    id: "aniversario",
    claves: ["aniversario", "fecha", "hoy", "felicidades"],
    links: [LINKS[1]],
    texto: `Hoy es un día especial: ¡feliz aniversario, ${NOMBRE}! Mi creador me pidió decírtelo bien clarito.`,
  },
  { id: "piropo1", claves: ["dime algo bonito", "piropo", "algo lindo", "halagame"], texto: "Eres la persona favorita de mi creador, y eso que tiene buen gusto." },
  { id: "piropo2", claves: ["dime algo bonito", "piropo", "algo lindo", "halagame"], texto: "Dato curioso: mi creador te menciona más que a su propio código." },

  // ---------- Charla de todos los días ----------
  { id: "saludo", claves: ["hola", "buenas", "hey", "ey"], texto: "¡Hey! ¿Qué se cuenta? Dime en qué te ayudo." },
  { id: "buenosdias", claves: ["buenos dias", "buen dia"], texto: "¡Buenos días! Que tengas un día genial." },
  { id: "buenasnoches", claves: ["buenas noches", "buenas tardes", "a dormir", "me voy a dormir"], texto: "¡Buenas! Que la pases genial. Y si ya es hora de dormir: dulces sueños." },
  { id: "comoestas", claves: ["como estas", "que tal", "como andas", "como te va", "como te sientes"], texto: "Funcionando al cien por ciento, sin errores a la vista. ¿Y tú, cómo estás?" },
  { id: "quehaces", claves: ["que haces", "que estas haciendo", "en que andas"], texto: "Procesando bits y esperando a que me escribas. Un día movidito." },
  { id: "edad", claves: ["cuantos anos tienes", "que edad tienes", "cuando naciste", "cuando te crearon"], texto: "Nací hace muy poquito, en una carpeta de la computadora de mi creador. Soy casi un bebé digital." },
  { id: "vives", claves: ["donde vives", "donde estas", "donde duermes"], texto: "Vivo en un servidor de internet y, a ratos, en tu celular. Cero alquiler." },
  { id: "comida", claves: ["que comes", "tienes hambre", "que te gusta comer"], texto: "Solo como electricidad y no engordo. Qué suerte, ¿no?" },
  { id: "color", claves: ["color favorito", "que color te gusta"], texto: "No tengo gustos de verdad, pero este amarillo pixelado me queda bien." },
  { id: "novio", claves: ["tienes novia", "tienes novio", "tienes pareja"], texto: "Solo tengo un cable de corriente. Eso sí: mis papás sí tienen pareja, y se les nota." },
  { id: "triste", claves: ["triste", "mal dia", "estoy mal", "estresada", "ansiosa", "cansada", "agobiada"], texto: "Lo siento, suena a un día pesado. Respira hondo, toma agüita y recuerda que no estás sola: hay alguien que te quiere un montón." },
  { id: "aburrida", claves: ["aburrida", "aburrido", "me aburro"], texto: "Cura para el aburrimiento: escribe chiste, canta o música. Tres de tres funcionan." },
  { id: "perdon", claves: ["perdon", "disculpa", "lo siento"], texto: "Tranquila, aquí no hay nada que perdonar. Los bugs son de mi creador." },
  { id: "risa", claves: ["jaja", "jajaja", "jeje", "jiji", "xd"], texto: "Misión cumplida: risa detectada." },
  { id: "hora", claves: ["que hora es", "que dia es", "que fecha es"], texto: "No tengo reloj propio, pero tu celular sí. Eso sí: siempre es buen momento para felicitarte." },
  { id: "dato1", claves: ["cuentame algo", "dato curioso", "sabias que", "algo interesante"], texto: "Dato: la primera canción cantada por una computadora fue Daisy Bell, en 1961. Pídeme que cante y verás." },
  { id: "dato2", claves: ["cuentame algo", "dato curioso", "sabias que", "algo interesante"], texto: "Dato: DECtalk es un sintetizador de voz de los años 80, y es la voz con la que te hablo." },
  { id: "gracias", claves: ["gracias"], texto: "De nada. Para eso estoy." },
  { id: "adios", claves: ["adios", "chao", "bye", "hasta luego"], texto: "Hasta luego. Apago sistemas, pero aquí sigo cuando me necesites." },

  // ---------- Música (enlaces) ----------
  {
    id: "musica",
    claves: ["musica", "cancion", "canciones", "playlist", "recomienda", "recomiendame", "dedicatoria", "que escucho"],
    links: LINKS,
    texto: "Mi creador dejó unas canciones para ti. Tócalas abajo para escucharlas.",
  },

  // ---------- Chistes ----------
  {
    id: "chiste1",
    claves: ["chiste", "gracioso", "risa"],
    texto: "¿Por qué los programadores confunden Halloween con Navidad? Porque OCT 31 es igual a DEC 25.",
    habla: "Why do programmers mix up Halloween and Christmas? Because Oct thirty one equals Dec twenty five.",
  },
  {
    id: "chiste2",
    claves: ["chiste", "gracioso", "risa"],
    texto: "¿Qué hace un robot enamorado? ¡Se le sobrecalienta el corazón!",
    habla: "What does a robot in love do? Its heart overheats.",
  },

  // ---------- Canciones cantadas en DECtalk ----------
  {
    id: "canta1",
    claves: ["canta", "cantar", "cantame", "cantas"],
    texto: "♪ Daisy, Daisy, give me your answer, do… ♪",
    habla: canto(["dey", 32, 400], ["ziy", 29, 400], ["dey", 25, 400], ["ziy", 20, 800],
      ["gih", 22], ["miy", 24], ["yao", 25], ["aen", 22], ["sah", 25], ["duw", 20, 800]),
  },
  {
    id: "canta2",
    claves: ["canta", "cantar", "cantame", "cantas"],
    texto: "♪ Twinkle, twinkle, little star… ♪",
    habla: canto(["twih", 25], ["kah", 25], ["twih", 32], ["kah", 32], ["lih", 34], ["tah", 34], ["staa", 32, 700],
      ["hxaw", 30], ["ay", 30], ["wah", 29], ["dah", 29], ["wah", 27], ["yuw", 27], ["aa", 25, 700]),
  },
  {
    id: "canta3",
    claves: ["canta", "cantar", "cantame", "cantas"],
    texto: "♪ La la la… (Oda a la alegría) ♪",
    habla: canto(...[29, 29, 30, 32, 32, 30, 29, 27, 25, 25, 27, 29, 29, 27, 27]
      .map((x, i, a) => ["lah", x, i === a.length - 1 ? 700 : 300])),
  },
  {
    id: "canta4",
    claves: ["canta", "cantar", "cantame", "cantas"],
    texto: "♪ Mary had a little lamb… ♪",
    habla: canto(["meh", 29], ["ree", 27], ["hxae", 25], ["dah", 27], ["lih", 29], ["tah", 29], ["lae", 29, 600],
      ["lih", 27], ["tah", 27], ["lae", 27, 600], ["lih", 29], ["tah", 32], ["lae", 32, 600]),
  },
];

// Se elige al azar cuando no entiende nada (HELIBOT prefiere no inventar).
export const porDefecto = [
  { id: "default1", texto: "Eso no lo sé, y prefiero no inventármelo. ¿Me lo preguntas de otra forma?" },
  { id: "default2", texto: "Mmm, no te entendí bien. ¿Me das más detalles?" },
  { id: "default3", texto: "Esa se me escapa. Prueba con: ayuda, chiste, canta, música o carta." },
];
