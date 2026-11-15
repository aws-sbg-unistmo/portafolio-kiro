/*
  MISIONES.JS
  El botón 🎯 revisa tu datos.js y palomea solo lo que ya personalizaste.
  Para ocultarlo, pon  misiones: false  en datos.js.
*/

(function () {
  "use strict";

  const P = window.Portafolio;
  if (!P || P.datos.misiones === false) return;

  const d = P.datos;
  const lista = P.lista;
  const texto = (valor) => (typeof valor === "string" ? valor.trim() : "");

  // Una misión está cumplida cuando «lista()» devuelve true.
  // «ayuda» es lo que puedes pedirle a Kiro para cumplirla.
  const MISIONES = [
    {
      titulo: "Pon tu nombre",
      ayuda: "«Cambia mi nombre a …»",
      lista: () => texto(d.nombre) !== "" && d.nombre !== "Tu Nombre",
    },
    {
      titulo: "Elige tu avatar",
      ayuda: "«Pon de avatar el emoji …»",
      lista: () => texto(d.avatar) !== "" && d.avatar !== "🙂",
    },
    {
      titulo: "Escribe tu frase",
      ayuda: "«Mi frase es: …»",
      lista: () => texto(d.frase) !== "" && !d.frase.startsWith("Escribe aquí"),
    },
    {
      titulo: "Elige tus colores",
      ayuda: "«Usa morado como color principal y amarillo como secundario»",
      lista: () => d.colorPrincipal !== "#0f766e" || d.colorSecundario !== "#f59e0b",
    },
    {
      titulo: "Tres palabras que te describan",
      ayuda: "«Mis palabras de la portada son …, … y …»",
      lista: () => {
        const palabras = lista(d.palabras);
        const deEjemplo = ["algo que te describe", "otra palabra", "una más"];
        return palabras.length >= 3 && !palabras.some((p) => deEjemplo.includes(p));
      },
    },
    {
      titulo: "Cuenta quién eres",
      ayuda: "«Escribe mi sección Sobre mí con esto: …»",
      lista: () => texto(d.sobreMi) !== "" && !d.sobreMi.startsWith("Cuenta en dos"),
    },
    {
      titulo: "Llena tus datos rápidos",
      ayuda: "«Mi escuela es …, voy en … semestre y vivo en …»",
      lista: () => {
        const deEjemplo = ["Nombre de tu escuela", "Tu semestre", "Tu ciudad o pueblo"];
        const datos = lista(d.datosRapidos);
        return datos.length > 0 && !datos.some((dato) => deEjemplo.includes(dato.valor));
      },
    },
    {
      titulo: "Personaliza tus intereses",
      ayuda: "«Mis intereses son …, … y …, con emoji y una frase cada uno»",
      lista: () => {
        const intereses = lista(d.intereses);
        return intereses.length >= 3 && !intereses.some((i) => /^Interés \d/.test(texto(i.titulo)));
      },
    },
    {
      titulo: "Un dato curioso en cada interés",
      ayuda: "«Agrega un dato curioso real a cada uno de mis intereses»",
      lista: () => {
        const intereses = lista(d.intereses);
        return (
          intereses.length > 0 &&
          intereses.every((i) => texto(i.dato) !== "" && !i.dato.startsWith("Un dato curioso"))
        );
      },
    },
    {
      titulo: "Agrega un cuarto interés",
      ayuda: "«Agrega otro interés: …»",
      lista: () => lista(d.intereses).length >= 4,
    },
    {
      titulo: "Di qué estás aprendiendo",
      ayuda: "«Estoy aprendiendo … en nivel 2 y … en nivel 4»",
      lista: () => {
        const deEjemplo = ["Tema que estás aprendiendo", "Otro tema", "Algo que ya se te da bien"];
        const temas = lista(d.aprendiendo);
        return temas.length >= 2 && !temas.some((t) => deEjemplo.includes(t.tema));
      },
    },
    {
      titulo: "Escribe tus metas",
      ayuda: "«Mis metas son …; la primera ya la cumplí»",
      lista: () => {
        const deEjemplo = ["Una meta que ya cumpliste", "Una meta para este año", "Un sueño a largo plazo"];
        const metas = lista(d.metas);
        return metas.length >= 2 && !metas.some((m) => deEjemplo.includes(m.texto));
      },
    },
    {
      titulo: "Prueba el modo oscuro",
      ayuda: "Toca la 🌙 de la portada.",
      lista: () => P.almacen.leer("portafolio-probo-tema") === "1",
    },
    {
      titulo: "Gana el juego de memoria",
      ayuda: "Encuentra los 6 pares en «Juega conmigo».",
      lista: () => P.almacen.leer("portafolio-gano") === "1",
    },
  ];

  // Misiones avanzadas: para quien ya programa o tiene proyectos en GitHub.
  // Las tres últimas piden construir algo nuevo, no solo llenar datos.
  const SECCIONES_BASE = 7; // las secciones que trae el portafolio
  const ARCHIVOS_BASE = ["datos.js", "app.js", "juego.js", "misiones.js"];

  const AVANZADAS = [
    {
      titulo: "Agrega tu primer proyecto",
      ayuda: "«Agrega a mis proyectos uno llamado … que trata de …»",
      lista: () => lista(d.proyectos).some((p) => p && texto(p.nombre) !== ""),
    },
    {
      titulo: "Enlaza tu repositorio de GitHub",
      ayuda: "«El enlace de mi proyecto … es https://github.com/…»",
      lista: () =>
        lista(d.proyectos).some((p) => p && /^https:\/\/github\.com\/[^/]+\/[^/]+/i.test(texto(p.enlace))),
    },
    {
      titulo: "Di con qué lo construiste",
      ayuda: "«Mi proyecto … usa HTML, JavaScript y …»",
      lista: () => lista(d.proyectos).some((p) => p && lista(p.tecnologias).filter(Boolean).length >= 2),
    },
    {
      titulo: "Crea una sección que no existía",
      ayuda: "Pídele a Kiro una sección nueva. Hay ideas en el nivel 2 de RETOS.md.",
      lista: () => document.querySelectorAll("main > section").length > SECCIONES_BASE,
    },
    {
      titulo: "Programa una función nueva",
      ayuda: "Elige un reto de RETOS.md que agregue su propio archivo .js.",
      lista: () =>
        Array.from(document.querySelectorAll("script[src]")).some(
          (s) => !ARCHIVOS_BASE.includes(s.getAttribute("src").split("?")[0].split("/").pop())
        ),
    },
    {
      titulo: "Publícalo en internet",
      ayuda: "Súbelo a tu GitHub y actívale Pages. Los pasos están en RETOS.md.",
      lista: () => /^https?:$/.test(location.protocol) && !/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname),
    },
  ];

  const NIVELES = [
    { desde: 0, nombre: "🌱 Principiante" },
    { desde: 4, nombre: "🧭 Explorador" },
    { desde: 8, nombre: "🔧 Constructor" },
    { desde: 12, nombre: "⚡ Casi Builder" },
    { desde: MISIONES.length, nombre: "🏆 Builder" },
  ];

  const boton = document.getElementById("boton-misiones");
  const panel = document.getElementById("panel-misiones");
  const elLista = document.getElementById("lista-misiones");
  let celebrado = 0; // 0 = nada, 1 = las 14 misiones, 2 = también las avanzadas

  function revisar(misiones) {
    return misiones.map((mision) => {
      try {
        return mision.lista() === true;
      } catch (e) {
        return false;
      }
    });
  }

  // Dibuja un grupo de misiones: primero las pendientes, para que siempre veas qué sigue.
  function dibujarGrupo(titulo, misiones, estados) {
    elLista.append(P.crear("li", "titulo-grupo", titulo));
    misiones
      .map((mision, n) => ({ mision, hecha: estados[n] }))
      .sort((a, b) => Number(a.hecha) - Number(b.hecha))
      .forEach(({ mision, hecha }) => {
        const fila = P.crear("li", hecha ? "hecha" : "");
        const palomita = P.crear("span", "palomita", hecha ? "✓" : "");
        palomita.setAttribute("aria-hidden", "true");
        fila.append(palomita, P.crear("span", "titulo-mision", mision.titulo));
        if (!hecha) fila.append(P.crear("span", "ayuda", mision.ayuda));
        elLista.append(fila);
      });
  }

  function dibujar() {
    const estados = revisar(MISIONES);
    const estadosAvanzadas = revisar(AVANZADAS);
    const hechas = estados.filter(Boolean).length;
    const total = MISIONES.length;
    const extra = estadosAvanzadas.filter(Boolean).length;
    const totalExtra = AVANZADAS.length;
    const todo = hechas === total && extra === totalExtra;

    boton.textContent = "🎯 Misiones " + hechas + "/" + total + (extra > 0 ? " · ⭐ " + extra + "/" + totalExtra : "");
    document.getElementById("misiones-nivel").textContent = todo
      ? "🚀 Súper Builder"
      : NIVELES.filter((n) => hechas >= n.desde).pop().nombre;
    document.getElementById("misiones-barra").style.width = ((hechas + extra) / (total + totalExtra)) * 100 + "%";
    document
      .getElementById("misiones-progreso")
      .setAttribute("aria-label", hechas + extra + " de " + (total + totalExtra) + " misiones cumplidas");

    elLista.textContent = "";
    dibujarGrupo("Misiones · " + hechas + " de " + total, MISIONES, estados);
    dibujarGrupo("⭐ Avanzadas · " + extra + " de " + totalExtra, AVANZADAS, estadosAvanzadas);

    // Confeti al completar las 14 y otra vez al completar todo.
    const logro = todo ? 2 : hechas === total ? 1 : 0;
    if (logro > celebrado && !panel.hidden) {
      celebrado = logro;
      P.confeti(160);
    }
  }

  function abrir(mostrar) {
    panel.hidden = !mostrar;
    boton.setAttribute("aria-expanded", String(mostrar));
    if (mostrar) dibujar();
  }

  boton.hidden = false;
  boton.addEventListener("click", () => abrir(panel.hidden));
  document.getElementById("cerrar-misiones").addEventListener("click", () => abrir(false));
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && !panel.hidden) abrir(false);
  });
  // El juego y el botón de tema avisan cuando algo cambia.
  document.addEventListener("portafolio:cambio", dibujar);

  dibujar();
})();
