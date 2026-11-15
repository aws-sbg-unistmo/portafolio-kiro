/*
  JUEGO.JS
  Juego de memoria: 6 pares de cartas con los emojis de tus intereses.
*/

(function () {
  "use strict";

  const P = window.Portafolio;
  const tablero = document.getElementById("tablero-juego");
  if (!P || !tablero) return;

  const PARES = 6;
  // Si tus intereses no alcanzan para 6 pares, se completan con estos.
  const RESERVA = ["🚀", "☁️", "💡", "🎨", "📚", "🌮", "🐆", "🎧"];

  const elIntentos = document.getElementById("juego-intentos");
  const elPares = document.getElementById("juego-pares");
  const elMejor = document.getElementById("juego-mejor");
  const elMensaje = document.getElementById("juego-mensaje");

  let primera = null; // la primera carta volteada del turno
  let bloqueado = false; // mientras se comparan dos cartas
  let intentos = 0;
  let encontrados = 0;

  function emojisDelJuego() {
    const propios = P.lista(P.datos.intereses).map((interes) => interes && interes.emoji);
    const unicos = [];
    propios.concat([P.datos.avatar], RESERVA).forEach((emoji) => {
      const valido = typeof emoji === "string" && emoji.trim() !== "";
      if (valido && !unicos.includes(emoji) && unicos.length < PARES) unicos.push(emoji);
    });
    return unicos;
  }

  function barajar(cartas) {
    for (let i = cartas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
    }
    return cartas;
  }

  function mostrarMejor() {
    const mejor = Number(P.almacen.leer("portafolio-mejor"));
    elMejor.textContent = mejor > 0 ? "Récord: " + mejor + " intentos" : "";
  }

  function actualizarMarcador() {
    elIntentos.textContent = intentos;
    elPares.textContent = encontrados + "/" + PARES;
  }

  function ganar() {
    const anterior = Number(P.almacen.leer("portafolio-mejor"));
    const esRecord = !anterior || intentos < anterior;
    if (esRecord) P.almacen.guardar("portafolio-mejor", String(intentos));
    P.almacen.guardar("portafolio-gano", "1");
    elMensaje.textContent =
      "¡Ganaste en " + intentos + " intentos!" + (esRecord ? " Nuevo récord 🏆" : "");
    mostrarMejor();
    P.confeti(120);
    document.dispatchEvent(new Event("portafolio:cambio"));
  }

  function voltear(carta) {
    if (bloqueado || carta === primera || carta.classList.contains("arriba")) return;
    carta.classList.add("arriba");
    carta.setAttribute("aria-label", "Carta: " + carta.dataset.emoji);

    if (!primera) {
      primera = carta;
      return;
    }

    intentos++;
    const segunda = carta;

    if (primera.dataset.emoji === segunda.dataset.emoji) {
      primera.classList.add("encontrada");
      segunda.classList.add("encontrada");
      primera.disabled = segunda.disabled = true;
      primera = null;
      encontrados++;
      actualizarMarcador();
      if (encontrados === PARES) ganar();
    } else {
      bloqueado = true;
      actualizarMarcador();
      const anterior = primera;
      setTimeout(() => {
        [anterior, segunda].forEach((c) => {
          c.classList.remove("arriba");
          c.setAttribute("aria-label", "Carta boca abajo");
        });
        primera = null;
        bloqueado = false;
      }, 850);
    }
  }

  function nuevoJuego() {
    primera = null;
    bloqueado = false;
    intentos = 0;
    encontrados = 0;
    elMensaje.textContent = "";
    tablero.textContent = "";

    const emojis = emojisDelJuego();
    barajar(emojis.concat(emojis)).forEach((emoji) => {
      const carta = P.crear("button", "carta");
      carta.type = "button";
      carta.dataset.emoji = emoji;
      carta.setAttribute("aria-label", "Carta boca abajo");

      const giro = P.crear("span", "carta-giro");
      giro.append(
        P.crear("span", "carta-cara carta-dorso", "?"),
        P.crear("span", "carta-cara carta-emoji", emoji)
      );
      carta.append(giro);
      carta.addEventListener("click", () => voltear(carta));
      tablero.append(carta);
    });

    actualizarMarcador();
    mostrarMejor();
  }

  document.getElementById("juego-reiniciar").addEventListener("click", nuevoJuego);
  nuevoJuego();
})();
