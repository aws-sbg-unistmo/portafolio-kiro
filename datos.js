/*
  ============================================================
   TUS DATOS
  ============================================================
  Este es el ÚNICO archivo que necesitas cambiar para que el
  portafolio sea tuyo. Puedes editarlo a mano o pedírselo a Kiro.

  Reglas para no romper nada:
   1. El texto va entre comillas:  "así"
   2. Cada renglón termina con coma:  nombre: "Ana",
   3. No borres las llaves { } ni los corchetes [ ]

  Cuida tu privacidad: usa tu nombre de pila o un apodo.
  No pongas teléfono, dirección ni datos de tu familia.
*/

window.PORTAFOLIO = {
  // ---------- Portada ----------
  nombre: "Tu Nombre",
  rol: "Estudiante de bachillerato",
  frase: "Escribe aquí una frase corta que te describa.",
  avatar: "🙂", // un emoji que te represente

  // Palabras que se escriben solas en la portada después de «Soy».
  palabras: ["algo que te describe", "otra palabra", "una más"],

  // ---------- Colores ----------
  // Usa nombres en inglés (teal, tomato, royalblue) o códigos (#0f766e).
  colorPrincipal: "#0f766e",
  colorSecundario: "#f59e0b",

  // ---------- Sobre mí ----------
  sobreMi:
    "Cuenta en dos o tres renglones quién eres: qué estudias, qué te gusta hacer en tu tiempo libre y qué te da curiosidad.",

  datosRapidos: [
    { etiqueta: "Escuela", valor: "Nombre de tu escuela" },
    { etiqueta: "Semestre", valor: "Tu semestre" },
    { etiqueta: "Lugar", valor: "Tu ciudad o pueblo" },
  ],

  // ---------- Mis intereses ----------
  // Puedes agregar o quitar tarjetas. Al tocar una tarjeta se voltea
  // y muestra el «dato» curioso. Sus emojis también flotan en la portada.
  intereses: [
    {
      emoji: "🎵",
      titulo: "Interés 1",
      texto: "Describe por qué te gusta y qué haces con él.",
      dato: "Un dato curioso sobre este interés.",
    },
    {
      emoji: "⚽",
      titulo: "Interés 2",
      texto: "Describe por qué te gusta y qué haces con él.",
      dato: "Un dato curioso sobre este interés.",
    },
    {
      emoji: "🎮",
      titulo: "Interés 3",
      texto: "Describe por qué te gusta y qué haces con él.",
      dato: "Un dato curioso sobre este interés.",
    },
  ],

  // ---------- Lo que estoy aprendiendo ----------
  // nivel va del 1 (apenas empiezo) al 5 (ya lo domino).
  aprendiendo: [
    { tema: "Tema que estás aprendiendo", nivel: 1 },
    { tema: "Otro tema", nivel: 2 },
    { tema: "Algo que ya se te da bien", nivel: 4 },
  ],

  // ---------- Mis proyectos (opcional, para quien ya programa) ----------
  // Si la lista está vacía, la sección no aparece. Para agregar uno,
  // copia el ejemplo dentro de los corchetes y quítale las dos diagonales.
  // El enlace debe empezar con https://
  proyectos: [
    // {
    //   nombre: "Nombre del proyecto",
    //   descripcion: "Qué hace y por qué lo hiciste.",
    //   tecnologias: ["HTML", "JavaScript"],
    //   enlace: "https://github.com/tu-usuario/tu-repositorio",
    // },
  ],

  // ---------- Mis metas ----------
  // lista: true = ya la cumplí, false = todavía no.
  metas: [
    { texto: "Una meta que ya cumpliste", lista: true },
    { texto: "Una meta para este año", lista: false },
    { texto: "Un sueño a largo plazo", lista: false },
  ],

  // ---------- Contacto (opcional) ----------
  // Si no quieres mostrar nada, deja la lista vacía:  contacto: [],
  contacto: [
    { red: "Red social", usuario: "@tu_usuario", enlace: "" },
  ],

  // ---------- Misiones ----------
  // El botón 🎯 te guía paso a paso. Cuando termines y quieras
  // publicar tu portafolio, cámbialo a false para ocultarlo.
  misiones: true,

  // ---------- Pie de página ----------
  pie: "Hecho con Kiro en el re:Invent Watch & Build Party · Playa Vicente 2026",
};
