/*
  APP.JS
  Lee lo que escribiste en datos.js y lo dibuja en la página.
  Normalmente no necesitas tocar este archivo: cambia datos.js.
*/

(function () {
  "use strict";

  const datos = window.PORTAFOLIO;

  // Si datos.js tiene un error de sintaxis, PORTAFOLIO no existe.
  if (!datos || typeof datos !== "object") {
    document.getElementById("aviso-error").hidden = false;
    return;
  }

  // ============================================================
  // AYUDANTES
  // ============================================================

  const $ = (id) => document.getElementById(id);

  // Crea una etiqueta HTML con clase y texto (el texto nunca se interpreta como HTML).
  function crear(etiqueta, clase, texto) {
    const el = document.createElement(etiqueta);
    if (clase) el.className = clase;
    if (texto !== undefined && texto !== null) el.textContent = String(texto);
    return el;
  }

  const lista = (valor) => (Array.isArray(valor) ? valor : []);

  const sinAnimaciones = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Memoria del navegador (para recordar el tema que elegiste).
  const almacen = {
    leer(clave) {
      try {
        return localStorage.getItem(clave);
      } catch (e) {
        return null;
      }
    },
    guardar(clave, valor) {
      try {
        localStorage.setItem(clave, valor);
      } catch (e) {
        /* si el navegador no deja guardar, no pasa nada */
      }
    },
  };

  // Oculta una sección completa (y su enlace del menú) cuando no hay nada que mostrar.
  function ocultarSeccion(id) {
    const seccion = $(id);
    if (seccion) seccion.hidden = true;
    const enlace = document.querySelector('.menu a[href="#' + id + '"]');
    if (enlace) enlace.hidden = true;
  }

  // Decide si encima de un color se lee mejor texto blanco o texto oscuro.
  function textoLegibleSobre(color) {
    const lienzo = document.createElement("canvas").getContext("2d");
    lienzo.fillStyle = "#000000";
    lienzo.fillStyle = color;
    const hex = lienzo.fillStyle;
    if (!/^#[0-9a-f]{6}$/i.test(hex)) return "#ffffff";
    const canal = (i) => {
      const v = parseInt(hex.slice(i, i + 2), 16) / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    const luz = 0.2126 * canal(1) + 0.7152 * canal(3) + 0.0722 * canal(5);
    // Se queda con el que tenga más contraste contra el color de fondo.
    const contrasteBlanco = 1.05 / (luz + 0.05);
    const contrasteOscuro = (luz + 0.05) / 0.06;
    return contrasteOscuro > contrasteBlanco ? "#1a1a1a" : "#ffffff";
  }

  // Solo aplica un color si el navegador lo reconoce.
  function aplicarColor(variable, variableTexto, color) {
    if (typeof color !== "string" || !CSS.supports("color", color)) return;
    const raiz = document.documentElement.style;
    raiz.setProperty(variable, color);
    raiz.setProperty(variableTexto, textoLegibleSobre(color));
  }

  // Lluvia de confeti con los colores del portafolio.
  function confeti(cantidad) {
    if (sinAnimaciones) return;
    const estilo = getComputedStyle(document.documentElement);
    const colores = [
      estilo.getPropertyValue("--color-principal").trim(),
      estilo.getPropertyValue("--color-secundario").trim(),
      "#ffffff",
      "#ff5d73",
      "#4cc9f0",
    ];
    const capa = crear("div", "confeti");
    capa.setAttribute("aria-hidden", "true");
    for (let n = 0; n < (cantidad || 80); n++) {
      const papel = crear("i");
      papel.style.left = Math.random() * 100 + "%";
      papel.style.background = colores[n % colores.length];
      papel.style.setProperty("--dx", Math.random() * 240 - 120 + "px");
      papel.style.setProperty("--giro", Math.random() * 900 - 450 + "deg");
      papel.style.animationDuration = 1.6 + Math.random() * 1.6 + "s";
      papel.style.animationDelay = Math.random() * 0.4 + "s";
      capa.append(papel);
    }
    document.body.append(capa);
    setTimeout(() => capa.remove(), 4000);
  }

  // Lo que comparten app.js, misiones.js y los archivos que agregues
  window.Portafolio = { datos, crear, lista, almacen, confeti };

  // ============================================================
  // COLORES Y TEMA
  // ============================================================

  aplicarColor("--color-principal", "--texto-sobre-principal", datos.colorPrincipal);
  aplicarColor("--color-secundario", "--texto-sobre-secundario", datos.colorSecundario);

  const botonTema = $("boton-tema");

  function ponerTema(tema) {
    const oscuro = tema === "oscuro";
    document.documentElement.dataset.tema = oscuro ? "oscuro" : "claro";
    botonTema.textContent = oscuro ? "☀️" : "🌙";
    botonTema.setAttribute("aria-label", oscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
  }

  ponerTema(almacen.leer("portafolio-tema"));

  botonTema.addEventListener("click", () => {
    const nuevo = document.documentElement.dataset.tema === "oscuro" ? "claro" : "oscuro";
    ponerTema(nuevo);
    almacen.guardar("portafolio-tema", nuevo);
    almacen.guardar("portafolio-probo-tema", "1");
    document.dispatchEvent(new Event("portafolio:cambio"));
  });

  // ============================================================
  // PORTADA
  // ============================================================

  const nombre = datos.nombre || "Tu Nombre";
  $("nombre").textContent = nombre;
  $("rol").textContent = datos.rol || "";
  $("rol").hidden = !datos.rol;
  $("frase").textContent = datos.frase || "";
  $("avatar").textContent = datos.avatar || nombre.trim().charAt(0).toUpperCase();
  document.title = nombre + " · Portafolio";

  // Saludo según la hora
  const hora = new Date().getHours();
  const saludo = hora < 12 ? "Buenos días" : hora < 19 ? "Buenas tardes" : "Buenas noches";
  $("saludo").textContent = saludo + ", soy";

  // Palabras que se escriben solas
  const palabras = lista(datos.palabras).filter((p) => typeof p === "string" && p.trim());
  if (palabras.length === 0) {
    $("maquina").hidden = true;
  } else if (sinAnimaciones) {
    $("palabra").textContent = palabras[0];
  } else {
    const destino = $("palabra");
    let cual = 0;
    let letras = 0;
    let borrando = false;

    (function escribir() {
      const palabra = palabras[cual];
      letras += borrando ? -1 : 1;
      destino.textContent = palabra.slice(0, letras);

      let espera = borrando ? 45 : 95;
      if (!borrando && letras === palabra.length) {
        espera = 1600; // pausa con la palabra completa
        borrando = true;
      } else if (borrando && letras === 0) {
        borrando = false;
        cual = (cual + 1) % palabras.length;
        espera = 350;
      }
      setTimeout(escribir, espera);
    })();
  }

  // Emojis de tus intereses flotando en la portada
  const LUGARES = [
    { left: "62%", top: "24%" },
    { left: "84%", top: "52%" },
    { left: "70%", top: "70%" },
    { left: "50%", top: "58%" },
    { left: "90%", top: "22%" },
    { left: "56%", top: "86%" },
  ];
  lista(datos.intereses)
    .map((interes) => interes && interes.emoji)
    .filter(Boolean)
    .slice(0, LUGARES.length)
    .forEach((emoji, n) => {
      const flotante = crear("span", "", emoji);
      flotante.style.left = LUGARES[n].left;
      flotante.style.top = LUGARES[n].top;
      flotante.style.animationDelay = n * -1.3 + "s";
      flotante.style.animationDuration = 6 + n + "s";
      $("flotantes").append(flotante);
    });

  // ============================================================
  // SOBRE MÍ
  // ============================================================

  $("sobre-mi-texto").textContent = datos.sobreMi || "";

  lista(datos.datosRapidos).forEach((dato) => {
    const fila = crear("div");
    fila.append(crear("dt", "", dato.etiqueta), crear("dd", "", dato.valor));
    $("datos-rapidos").append(fila);
  });

  if (!datos.sobreMi && lista(datos.datosRapidos).length === 0) {
    ocultarSeccion("sobre-mi");
  }

  // ============================================================
  // INTERESES (tarjetas que se voltean)
  // ============================================================

  const intereses = lista(datos.intereses);
  let algunaSeVoltea = false;

  intereses.forEach((interes) => {
    const tieneDato = typeof interes.dato === "string" && interes.dato.trim() !== "";
    const tarjeta = crear(tieneDato ? "button" : "div", "tarjeta aparece");
    const giro = crear("div", "tarjeta-giro");

    const frente = crear("div", "cara frente");
    const emoji = crear("span", "emoji", interes.emoji || "⭐");
    emoji.setAttribute("aria-hidden", "true");
    frente.append(emoji, crear("h3", "", interes.titulo), crear("p", "", interes.texto));
    giro.append(frente);

    if (tieneDato) {
      algunaSeVoltea = true;
      const atras = crear("div", "cara atras");
      atras.append(crear("p", "mini", "¿Sabías que…?"), crear("p", "", interes.dato));
      giro.append(atras);
      tarjeta.type = "button";
      tarjeta.setAttribute("aria-pressed", "false");
      tarjeta.addEventListener("click", () => {
        const volteada = tarjeta.classList.toggle("volteada");
        tarjeta.setAttribute("aria-pressed", String(volteada));
      });
    }

    tarjeta.append(giro);
    $("lista-intereses").append(tarjeta);
  });

  $("pista-intereses").hidden = !algunaSeVoltea;
  if (intereses.length === 0) ocultarSeccion("intereses");

  // ============================================================
  // APRENDIENDO
  // ============================================================

  const NOMBRES_NIVEL = ["", "Apenas empiezo", "Voy agarrando la onda", "Ya me defiendo", "Se me da bien", "Lo domino"];

  const aprendiendo = lista(datos.aprendiendo);
  aprendiendo.forEach((item) => {
    const nivel = Math.min(5, Math.max(1, Math.round(Number(item.nivel)) || 1));
    const fila = crear("li", "aparece");
    const bloques = crear("div", "bloques");
    bloques.setAttribute("role", "img");
    bloques.setAttribute("aria-label", "Nivel " + nivel + " de 5");
    for (let n = 1; n <= 5; n++) {
      const bloque = crear("span", n <= nivel ? "lleno" : "");
      bloque.style.setProperty("--i", n);
      bloques.append(bloque);
    }
    fila.append(
      crear("span", "tema", item.tema),
      crear("span", "etiqueta-nivel", NOMBRES_NIVEL[nivel]),
      bloques
    );
    $("lista-aprendiendo").append(fila);
  });
  if (aprendiendo.length === 0) ocultarSeccion("aprendiendo");

  // ============================================================
  // PROYECTOS (opcional)
  // ============================================================

  const proyectos = lista(datos.proyectos).filter((p) => p && typeof p.nombre === "string" && p.nombre.trim());
  proyectos.forEach((proyecto) => {
    const tarjeta = crear("article", "proyecto aparece");
    tarjeta.append(crear("h3", "", proyecto.nombre), crear("p", "descripcion", proyecto.descripcion));

    const tecnologias = lista(proyecto.tecnologias).filter(Boolean);
    if (tecnologias.length > 0) {
      const chips = crear("div", "chips");
      tecnologias.forEach((tecnologia) => chips.append(crear("span", "chip", tecnologia)));
      tarjeta.append(chips);
    }

    // Solo se muestra el enlace si empieza con https://
    if (typeof proyecto.enlace === "string" && /^https:\/\//i.test(proyecto.enlace)) {
      const enlace = crear("a", "enlace-proyecto", "Ver el código →");
      enlace.href = proyecto.enlace;
      enlace.target = "_blank";
      enlace.rel = "noopener noreferrer";
      tarjeta.append(enlace);
    }
    $("lista-proyectos").append(tarjeta);
  });
  if (proyectos.length === 0) ocultarSeccion("proyectos");

  // ============================================================
  // METAS
  // ============================================================

  const metas = lista(datos.metas);
  metas.forEach((meta) => {
    const cumplida = meta.lista === true;
    const fila = crear("li", "aparece");
    const boton = crear("button", cumplida ? "meta cumplida" : "meta");
    boton.type = "button";
    const marca = crear("span", "marca", cumplida ? "✓" : "");
    marca.setAttribute("aria-hidden", "true");
    boton.append(
      marca,
      crear("span", "texto-meta", meta.texto),
      crear("span", "estado", cumplida ? "¡Cumplida!" : "En camino")
    );
    // Una meta cumplida se celebra; una pendiente te recuerda que vas en camino.
    boton.addEventListener("click", () => {
      if (cumplida) {
        confeti(50);
      } else {
        boton.classList.remove("tiembla");
        void boton.offsetWidth; // reinicia la animación
        boton.classList.add("tiembla");
      }
    });
    fila.append(boton);
    $("lista-metas").append(fila);
  });
  if (metas.length === 0) ocultarSeccion("metas");

  // ============================================================
  // CONTACTO
  // ============================================================

  const contacto = lista(datos.contacto).filter((c) => c && (c.red || c.usuario));
  contacto.forEach((c) => {
    const fila = crear("li");
    // Solo se vuelve enlace si la dirección empieza con https://
    const esEnlace = typeof c.enlace === "string" && /^https:\/\//i.test(c.enlace);
    const caja = crear(esEnlace ? "a" : "span");
    if (esEnlace) {
      caja.href = c.enlace;
      caja.target = "_blank";
      caja.rel = "noopener noreferrer";
    }
    caja.append(crear("small", "", c.red), crear("span", "", c.usuario));
    fila.append(caja);
    $("lista-contacto").append(fila);
  });
  if (contacto.length === 0) ocultarSeccion("contacto");

  // ============================================================
  // PIE
  // ============================================================

  $("pie").textContent = datos.pie || "";

  // ============================================================
  // APARICIÓN SUAVE AL BAJAR
  // ============================================================

  const piezas = document.querySelectorAll(".aparece");
  if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
            observador.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    piezas.forEach((pieza) => observador.observe(pieza));
  } else {
    piezas.forEach((pieza) => pieza.classList.add("visible"));
  }
})();
