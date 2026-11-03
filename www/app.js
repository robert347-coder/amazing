/* =========================================================================
   AMAZING JESÚS · app.js
   -------------------------------------------------------------------------
   La "lógica" de la app: perfiles, partidas, puntos, regla del 80%,
   examen final, pantalla de padres y rosario interactivo.

   PRIVACIDAD: no se envía nada a internet. Todo se guarda en el propio
   dispositivo (localStorage). Si se borra la app o los datos del navegador,
   el progreso se pierde.
   ========================================================================= */

(function () {
  "use strict";

  /* ------------------------------------------------------------------ *
   * 1. GUARDADO EN EL DISPOSITIVO                                       *
   * ------------------------------------------------------------------ */
  const CLAVE = "amazingJesus.v1";
  const COLORES = ["#2B4C9B", "#B5612E", "#3F7D6E", "#8A4FA3", "#A83B4E", "#C0882E", "#2F6FB0", "#4F7A2A"];

  function cargar() {
    try {
      const raw = localStorage.getItem(CLAVE);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* sin almacenamiento: la app funciona igual, pero no recuerda */ }
    return { perfiles: [], actual: null };
  }
  function guardar() {
    try { localStorage.setItem(CLAVE, JSON.stringify(datos)); } catch (e) { /* ignorar */ }
  }

  let datos = cargar();

  /* ------------------------------------------------------------------ *
   * 2. UTILIDADES                                                       *
   * ------------------------------------------------------------------ */
  const $app = document.getElementById("app");

  // Evita que un apodo con símbolos raros "rompa" la página
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function barajar(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function perfilActual() { return datos.perfiles.find(p => p.id === datos.actual) || null; }
  function bloque(id) { return BLOQUES.find(b => b.id === id); }
  function bloquesObligatorios() {
    return BLOQUES.filter(b => !esExtra(b));
  }
  // Rosario y Vía Crucis son obligatorios u opcionales según config.js
  function esExtra(b) {
    if (b.id === "ros") return !CONFIG.rosarioObligatorio;
    if (b.id === "via") return !CONFIG.viaCrucisObligatorio;
    return false;
  }
  function arriba() { window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" }); }

  /* ------------------------------------------------------------------ *
   * 3. REGLAS: cuándo un bloque está dominado y cuándo se llega al final *
   * ------------------------------------------------------------------ */
  // Un bloque está DOMINADO si los últimos N intentos (3) superan el 80%.
  function dominado(p, bid) {
    const ints = (p.intentos[bid] || []).slice(-CONFIG.intentosParaDominar);
    return ints.length >= CONFIG.intentosParaDominar && ints.every(x => x >= CONFIG.aciertoMinimo);
  }
  function examenDesbloqueado(p) { return bloquesObligatorios().every(b => dominado(p, b.id)); }
  function progresoGlobal(p) {
    const obl = bloquesObligatorios();
    let total = 0;
    obl.forEach(b => {
      const ints = (p.intentos[b.id] || []).slice(-CONFIG.intentosParaDominar);
      const buenos = ints.filter(x => x >= CONFIG.aciertoMinimo).length;
      total += dominado(p, b.id) ? 1 : buenos / (CONFIG.intentosParaDominar + 1);
    });
    const examen = p.nivelFinal ? 1 : 0;
    return Math.round(((total + examen) / (obl.length + 1)) * 100);
  }

  /* ------------------------------------------------------------------ *
   * 4. ELEGIR PREGUNTAS (repaso inteligente)                             *
   *    Las preguntas falladas tienen más probabilidad de volver a salir. *
   * ------------------------------------------------------------------ */
  function prepararPregunta(b, i) {
    const [q, opciones, exp] = b.preguntas[i];
    const correcta = opciones[0];
    return { qid: `${b.id}-${i}`, bid: b.id, q, opts: opciones.length === 2 ? opciones.slice() : barajar(opciones), correcta, exp };
  }
  function elegir(p, b, n) {
    const pool = b.preguntas.map((_, i) => i).map(i => {
      const fallos = p.fallos[`${b.id}-${i}`] || 0;
      return { i, peso: 1 + fallos * 2, r: Math.random() };
    });
    // sorteo ponderado sin repetición
    pool.forEach(x => { x.clave = Math.pow(x.r, 1 / x.peso); });
    pool.sort((a, c) => c.clave - a.clave);
    return pool.slice(0, Math.min(n, pool.length)).map(x => prepararPregunta(b, x.i));
  }

  /* ------------------------------------------------------------------ *
   * 5. ICONOS (dibujados en SVG, sin imágenes externas)                 *
   * ------------------------------------------------------------------ */
  const LOGO = `<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="22" fill="var(--marian)"/><g stroke="var(--gold-bright)" stroke-width="2.4" stroke-linecap="round"><path d="M24 6v6M24 36v6M6 24h6M36 24h6M11.3 11.3l4.2 4.2M32.5 32.5l4.2 4.2M36.7 11.3l-4.2 4.2M15.5 32.5l-4.2 4.2"/></g><path d="M21.5 13h5v8h7v5h-7v11h-5V26h-7v-5h7z" fill="#fff"/></svg>`;
  const RAYOS = `<svg class="rays" viewBox="0 0 200 200" aria-hidden="true"><g stroke="currentColor" stroke-width="6" stroke-linecap="round">${Array.from({ length: 16 }, (_, k) => { const a = k * Math.PI / 8; return `<line x1="${100 + 40 * Math.cos(a)}" y1="${100 + 40 * Math.sin(a)}" x2="${100 + 95 * Math.cos(a)}" y2="${100 + 95 * Math.sin(a)}"/>`; }).join("")}</g><circle cx="100" cy="100" r="28" fill="currentColor"/></svg>`;
  const CALIZ = `<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="38" r="20" fill="#fff"/><g stroke="var(--gold-bright)" stroke-width="3" stroke-linecap="round">${Array.from({ length: 12 }, (_, k) => { const a = k * Math.PI / 6; return `<line x1="${60 + 26 * Math.cos(a)}" y1="${38 + 26 * Math.sin(a)}" x2="${60 + 36 * Math.cos(a)}" y2="${38 + 36 * Math.sin(a)}"/>`; }).join("")}</g><path d="M56 30h8v6h6v6h-6v10h-8V42h-6v-6h6z" fill="var(--gold-bright)"/><path d="M34 62h52c0 16-10 26-22 28v12h12v6H44v-6h12V90c-12-2-22-12-22-28z" fill="var(--gold-bright)"/></svg>`;

  /* ------------------------------------------------------------------ *
   * 6. NAVEGACIÓN                                                       *
   * ------------------------------------------------------------------ */
  let vista = "inicio";
  let params = {};
  let juego = null;     // partida en curso
  let rosario = null;   // rosario en curso
  let via = null;       // vía crucis en curso

  function ir(v, pr) { vista = v; params = pr || {}; render(); arriba(); }

  function topbar(conPuntos) {
    const p = perfilActual();
    return `<header class="topbar">
      <div class="brand">${LOGO}<span>${esc(CONFIG.nombreApp)}</span></div>
      <div class="spacer"></div>
      ${conPuntos && p ? `<span class="chip-pts" title="Puntos">${p.puntos}</span>` : ""}
      ${vista !== "inicio" ? `<button class="iconbtn" data-act="inicio" aria-label="Cambiar de niño o niña">Perfiles</button>` : ""}
    </header>`;
  }
  const PIE = `<p class="foot">Esta app no recoge datos: el progreso se guarda solo en este dispositivo.</p>`;
  const AVISO = `<div class="banner-test"><b>Versión de prueba.</b> Contenido pendiente de revisión por la parroquia.</div>`;

  function render() {
    const vistas = { inicio: vInicio, nuevo: vNuevo, mapa: vMapa, bloque: vBloque, juego: vJuego, resultado: vResultado, final: vFinal, padres: vPadres, rosario: vRosario, via: vVia };
    $app.innerHTML = `<div class="shell">${(vistas[vista] || vInicio)()}</div>`;
    if (vista === "rosario") pintarRosario();
  }

  /* ------------------------------------------------------------------ *
   * 7. PANTALLAS                                                        *
   * ------------------------------------------------------------------ */

  // --- Inicio: elegir perfil ---
  function vInicio() {
    const perfiles = datos.perfiles;
    return `${topbar(false)}
      <section class="hero">${RAYOS}
        <p class="eyebrow" style="color:inherit;opacity:.8">${esc(CONFIG.subtitulo)}</p>
        <h1>¡Hola! Vamos a conocer a Jesús</h1>
        <p>Aprende la catequesis jugando: lee cada tema, responde preguntas, gana puntos y consigue las medallas.</p>
      </section>
      ${AVISO}
      <section class="stack">
        <h2>${perfiles.length ? "¿Quién va a jugar?" : "Empieza creando tu perfil"}</h2>
        <div class="profiles">
          ${perfiles.map(p => `<button class="profile" data-act="elegir" data-id="${p.id}">
              <span class="avatar" style="background:${p.color}">${esc(p.nombre.charAt(0).toUpperCase())}</span>
              <span class="pname">${esc(p.nombre)}</span>
              <span class="muted small">${p.puntos} puntos · ${progresoGlobal(p)}%</span>
            </button>`).join("")}
          <button class="profile" data-act="nuevo" style="border:2px dashed var(--line);box-shadow:none;background:transparent">
            <span class="avatar" style="background:var(--marian-soft);color:var(--marian)">+</span>
            <span class="pname">Nuevo perfil</span>
            <span class="muted small">Solo un apodo</span>
          </button>
        </div>
      </section>
      ${perfiles.length ? `<button class="btn ghost" data-act="padres">Zona de padres</button>` : ""}
      <section class="card stack">
        <h3>Qué vas a aprender</h3>
        <div class="blocks">${BLOQUES.map(b => `<div class="row" style="gap:12px;flex-wrap:nowrap"><span class="blk-mini" style="flex:none;width:28px;height:28px;border-radius:8px;background:${b.color};color:#fff;display:grid;place-items:center;font-weight:800;font-size:.85rem">${b.num}</span><span><b>${esc(b.titulo)}</b> <span class="muted small">· ${esc(b.resumen)}</span></span></div>`).join("")}</div>
      </section>
      ${PIE}`;
  }

  // --- Crear perfil ---
  function vNuevo() {
    const color = params.color || COLORES[datos.perfiles.length % COLORES.length];
    return `${topbar(false)}
      <section class="card form">
        <h2>Nuevo perfil</h2>
        <p class="muted">Escribe solo un apodo o tu nombre de pila. No hace falta nada más.</p>
        <label for="apodo">Apodo</label>
        <input id="apodo" type="text" maxlength="16" autocomplete="off" placeholder="Por ejemplo: Lucía" value="${esc(params.nombre || "")}">
        <label>Color</label>
        <div class="colors">${COLORES.map(c => `<button type="button" data-act="color" data-c="${c}" style="background:${c}" aria-label="Color" aria-pressed="${c === color}"></button>`).join("")}</div>
        <p id="err" class="small" style="color:var(--bad)" hidden>Escribe un apodo para continuar.</p>
        <div class="row"><button class="btn" data-act="crear" data-c="${color}">Crear perfil</button><button class="btn ghost" data-act="inicio">Cancelar</button></div>
      </section>`;
  }

  // --- Mapa de bloques del niño ---
  function vMapa() {
    const p = perfilActual();
    if (!p) return vInicio();
    const obl = bloquesObligatorios();
    const medallas = BLOQUES.map(b => `<span class="medal ${dominado(p, b.id) ? "on" : ""}" title="${esc(b.titulo)}">${b.num}</span>`).join("");
    const desbloq = examenDesbloqueado(p);
    const faltan = obl.filter(b => !dominado(p, b.id)).length;
    return `${topbar(true)}
      <section class="card kid-head">
        <span class="avatar" style="background:${p.color}">${esc(p.nombre.charAt(0).toUpperCase())}</span>
        <div class="info">
          <h2>¡Hola, ${esc(p.nombre)}!</h2>
          <div class="row small muted" style="justify-content:space-between"><span>Tu camino a la Primera Comunión</span><b style="color:var(--marian)">${progresoGlobal(p)}%</b></div>
          <div class="progress" aria-hidden="true"><span style="width:${progresoGlobal(p)}%"></span></div>
          <div class="medals" aria-label="Medallas">${medallas}</div>
        </div>
      </section>
      ${p.nivelFinal ? `<button class="btn gold block" data-act="final">Ver mi nivel «Preparado»</button>` : ""}
      <section class="stack">
        <h2>Temas</h2>
        <div class="blocks">${BLOQUES.map(b => tarjetaBloque(p, b)).join("")}</div>
      </section>
      <section class="card exam-card ${desbloq ? "" : "locked"} stack">
        <p class="eyebrow">Examen final</p>
        <h3>${desbloq ? "¡Ya puedes hacer el examen final!" : "El examen final está bloqueado"}</h3>
        <p class="muted small">${desbloq
          ? `${obl.length * CONFIG.preguntasExamenPorBloque} preguntas de todos los temas. Necesitas un ${CONFIG.aciertoMinimo}% para conseguir el nivel final.`
          : `Te ${faltan === 1 ? "falta 1 tema" : `faltan ${faltan} temas`} por dominar. Un tema está dominado cuando sacas un ${CONFIG.aciertoMinimo}% o más en tus últimos ${CONFIG.intentosParaDominar} intentos.`}</p>
        ${desbloq ? `<button class="btn gold" data-act="examen">Empezar examen</button>` : ""}
      </section>
      <button class="btn ghost" data-act="padres">Zona de padres</button>
      ${PIE}`;
  }
  function tarjetaBloque(p, b) {
    const ints = (p.intentos[b.id] || []).slice(-CONFIG.intentosParaDominar);
    let estado;
    if (dominado(p, b.id)) estado = `<span class="state done">Dominado</span>`;
    else if (ints.length) estado = `<span class="state going">Último: ${ints[ints.length - 1]}%</span>`;
    else if (esExtra(b)) estado = `<span class="state extra">Extra</span>`;
    else estado = `<span class="state new">Sin empezar</span>`;
    const dots = Array.from({ length: CONFIG.intentosParaDominar }, (_, k) => {
      const v = ints[k];
      return `<i class="${v === undefined ? "" : v >= CONFIG.aciertoMinimo ? "ok" : "ko"}"></i>`;
    }).join("");
    return `<button class="blk" data-act="bloque" data-id="${b.id}">
      <span class="num" style="background:${b.color}">${b.num}</span>
      <span class="txt"><span class="ttl">${esc(b.titulo)}</span><br><span class="sub">${esc(b.resumen)}</span><span class="dots" aria-hidden="true">${dots}</span></span>
      ${estado}
    </button>`;
  }

  // --- Bloque: lecciones + botón jugar ---
  function vBloque() {
    const p = perfilActual(); const b = bloque(params.id);
    if (!p || !b) return vMapa();
    const ints = p.intentos[b.id] || [];
    return `${topbar(true)}
      <button class="iconbtn" data-act="mapa" style="align-self:flex-start">← Volver a los temas</button>
      <section class="stack">
        <p class="eyebrow" style="color:${b.color}">Tema ${b.num}${esExtra(b) ? " · extra" : ""}</p>
        <h1>${esc(b.titulo)}</h1>
        <p class="muted">${esc(b.resumen)}</p>
      </section>
      <section class="card stack" style="border:2px solid ${b.color}">
        <div class="row" style="justify-content:space-between">
          <div><h3>¿Preparado para jugar?</h3><p class="muted small">${CONFIG.preguntasPorPartida} preguntas · ${dominado(p, b.id) ? "¡Tema dominado!" : `Intentos: ${ints.length}`}</p></div>
          <button class="btn" data-act="jugar" data-id="${b.id}">Jugar</button>
        </div>
      </section>
      ${b.id === "ros" ? `<button class="btn gold block" data-act="rosario">Rezar el Rosario paso a paso</button>` : ""}
      ${b.id === "via" ? `<button class="btn gold block" data-act="via">Rezar el Vía Crucis paso a paso</button>` : ""}
      <h2>Aprende</h2>
      <div class="lesson-list">${b.lecciones.map(l => `<article class="card lesson ${l.oracion ? "prayer" : ""}">
          ${l.oracion ? `<p class="eyebrow">Oración</p>` : ""}
          <h3>${esc(l.t)}</h3><p class="x">${esc(l.x)}</p></article>`).join("")}</div>
      <button class="btn block" data-act="jugar" data-id="${b.id}">Jugar a las preguntas</button>`;
  }

  // --- Partida ---
  function empezar(tipo, bid) {
    const p = perfilActual();
    let preguntas;
    if (tipo === "examen") {
      preguntas = barajar(bloquesObligatorios().flatMap(b => elegir(p, b, CONFIG.preguntasExamenPorBloque)));
    } else {
      preguntas = elegir(p, bloque(bid), CONFIG.preguntasPorPartida);
    }
    juego = { tipo, bid, preguntas, i: 0, aciertos: 0, racha: 0, puntos: 0, respuesta: null };
    ir("juego");
  }
  function vJuego() {
    const p = perfilActual();
    if (!juego || !p) return vMapa();
    const q = juego.preguntas[juego.i];
    const titulo = juego.tipo === "examen" ? "Examen final" : bloque(juego.bid).titulo;
    const r = juego.respuesta;
    const opts = q.opts.map((o, k) => {
      let cls = "opt";
      if (r !== null) {
        if (o === q.correcta) cls += " right";
        else if (k === r) cls += " wrong";
      }
      return `<button class="${cls}" data-act="responder" data-k="${k}" ${r !== null ? "disabled" : ""}>${esc(o)}</button>`;
    }).join("");
    const acerto = r !== null && q.opts[r] === q.correcta;
    return `${topbar(true)}
      <div class="qhead">
        <button class="iconbtn" data-act="salir">← Salir</button>
        <span class="qcount">${juego.i + 1} / ${juego.preguntas.length}</span>
      </div>
      <div class="progress" aria-hidden="true"><span style="width:${(juego.i / juego.preguntas.length) * 100}%"></span></div>
      <p class="eyebrow">${esc(titulo)}${juego.racha >= 2 ? ` · <span class="streak">¡Racha de ${juego.racha}!</span>` : ""}</p>
      <h2 class="question">${esc(q.q)}</h2>
      <div class="options">${opts}</div>
      ${r !== null ? `<div class="feedback ${acerto ? "ok" : "ko"} pop">
          <b>${acerto ? "¡Muy bien!" : "Casi. La respuesta correcta es:"}</b>
          ${acerto ? "" : `<span><b style="color:var(--ink)">${esc(q.correcta)}</b></span>`}
          <span>${esc(q.exp)}</span>
        </div>
        <button class="btn block" data-act="siguiente">${juego.i + 1 < juego.preguntas.length ? "Siguiente" : "Ver resultado"}</button>` : ""}`;
  }
  function responder(k) {
    if (!juego || juego.respuesta !== null) return;
    const p = perfilActual();
    const q = juego.preguntas[juego.i];
    juego.respuesta = k;
    if (q.opts[k] === q.correcta) {
      juego.aciertos++; juego.racha++;
      juego.puntos += CONFIG.puntosPorAcierto;
      if (juego.racha % 3 === 0) juego.puntos += CONFIG.puntosPorRacha;
      if (p.fallos[q.qid]) p.fallos[q.qid] = Math.max(0, p.fallos[q.qid] - 1);
    } else {
      juego.racha = 0;
      p.fallos[q.qid] = (p.fallos[q.qid] || 0) + 1;
      p.fallosTotales[q.qid] = (p.fallosTotales[q.qid] || 0) + 1;
    }
    guardar(); render();
  }
  function siguiente() {
    if (juego.i + 1 < juego.preguntas.length) { juego.i++; juego.respuesta = null; render(); arriba(); return; }
    // fin de la partida
    const p = perfilActual();
    const pct = Math.round((juego.aciertos / juego.preguntas.length) * 100);
    p.puntos += juego.puntos;
    let nuevoFinal = false;
    if (juego.tipo === "examen") {
      p.examenes.push(pct);
      if (pct >= CONFIG.aciertoMinimo && !p.nivelFinal) { p.nivelFinal = true; nuevoFinal = true; }
    } else {
      const antes = dominado(p, juego.bid);
      (p.intentos[juego.bid] = p.intentos[juego.bid] || []).push(pct);
      p.intentos[juego.bid] = p.intentos[juego.bid].slice(-10);
      juego.recienDominado = !antes && dominado(p, juego.bid);
    }
    guardar();
    juego.pct = pct;
    if (nuevoFinal) ir("final"); else ir("resultado");
  }

  // --- Resultado de una partida ---
  function vResultado() {
    const p = perfilActual();
    if (!juego || !p) return vMapa();
    const ok = juego.pct >= CONFIG.aciertoMinimo;
    let mensaje, extra = "";
    if (juego.tipo === "examen") {
      mensaje = ok ? "¡Examen superado!" : "¡Buen intento!";
      extra = ok ? "" : `Necesitas un ${CONFIG.aciertoMinimo}%. Repasa los temas en los que has fallado y vuelve a intentarlo.`;
    } else {
      const b = bloque(juego.bid);
      const ints = p.intentos[b.id].slice(-CONFIG.intentosParaDominar);
      if (juego.recienDominado) { mensaje = "¡Medalla conseguida!"; extra = `Has dominado «${b.titulo}».`; }
      else if (dominado(p, b.id)) { mensaje = "¡Sigues dominando este tema!"; }
      else if (ok) {
        const seguidos = (() => { let c = 0; for (let k = ints.length - 1; k >= 0 && ints[k] >= CONFIG.aciertoMinimo; k--) c++; return c; })();
        mensaje = "¡Muy bien!";
        extra = `Llevas ${seguidos} de ${CONFIG.intentosParaDominar} partidas seguidas con ${CONFIG.aciertoMinimo}% o más. Cuando las tengas, conseguirás la medalla.`;
      } else { mensaje = "¡Sigue practicando!"; extra = `Lee otra vez el tema y vuelve a jugar. Para la medalla necesitas ${CONFIG.intentosParaDominar} partidas seguidas con ${CONFIG.aciertoMinimo}% o más.`; }
    }
    return `${topbar(true)}
      <section class="card stack result">
        <p class="eyebrow">${juego.tipo === "examen" ? "Examen final" : esc(bloque(juego.bid).titulo)}</p>
        <div class="score ${ok ? "ok" : "ko"}">${juego.pct}%</div>
        <p class="muted">${juego.aciertos} de ${juego.preguntas.length} aciertos · +${juego.puntos} puntos</p>
        <h2>${mensaje}</h2>
        ${extra ? `<p class="muted">${esc(extra)}</p>` : ""}
      </section>
      <div class="stack">
        ${juego.tipo === "examen" ? `<button class="btn" data-act="examen">Repetir examen</button>` : `<button class="btn" data-act="jugar" data-id="${juego.bid}">Jugar otra vez</button><button class="btn ghost" data-act="bloque" data-id="${juego.bid}">Repasar el tema</button>`}
        <button class="btn ghost" data-act="mapa">Volver a los temas</button>
      </div>`;
  }

  // --- Nivel final ---
  function vFinal() {
    const p = perfilActual();
    if (!p) return vInicio();
    return `${topbar(true)}
      <section class="celebrate stack">
        ${CALIZ}
        <p class="eyebrow" style="color:inherit;opacity:.85">Nivel «Preparado»</p>
        <h1>¡Has superado todo el repaso, ${esc(p.nombre)}!</h1>
        <p>Has aprendido la historia de Dios con su pueblo, la vida de Jesús, los sacramentos, los mandamientos, las oraciones, la Misa, el Rosario y el Vía Crucis.</p>
      </section>
      <section class="card stack">
        <h3>¿Y ahora?</h3>
        <p>Enseña este resultado a tu catequista. Tu catequista y tu párroco te acompañarán en el último paso hacia tu Primera Comunión.</p>
        <p class="muted small">Puedes seguir jugando para no olvidar nada y para ganar más puntos.</p>
      </section>
      <button class="btn block" data-act="mapa">Volver a los temas</button>`;
  }

  // --- Zona de padres ---
  function vPadres() {
    const perfiles = datos.perfiles;
    if (!perfiles.length) return vInicio();
    const sel = perfiles.find(p => p.id === params.id) || perfilActual() || perfiles[0];
    const filas = BLOQUES.map(b => {
      const ints = sel.intentos[b.id] || [];
      const ult = ints.slice(-CONFIG.intentosParaDominar);
      return `<tr><td>${b.num}. ${esc(b.titulo)}${esExtra(b) ? ' <span class="muted small">(extra)</span>' : ""}</td>
        <td class="num">${ints.length}</td>
        <td class="num">${ult.length ? ult.map(x => x + "%").join(" · ") : "—"}</td>
        <td>${dominado(sel, b.id) ? '<span class="state done">Dominado</span>' : ints.length ? '<span class="state going">En curso</span>' : '<span class="state new">Sin empezar</span>'}</td></tr>`;
    }).join("");
    const falladas = Object.entries(sel.fallosTotales || {}).sort((a, c) => c[1] - a[1]).slice(0, 6).map(([qid, n]) => {
      const [bid, idx] = qid.split("-"); const b = bloque(bid); if (!b || !b.preguntas[idx]) return "";
      const pr = b.preguntas[idx];
      return `<li><b>${esc(pr[0])}</b><br><span class="small muted">${esc(b.titulo)} · fallada ${n} ${n === 1 ? "vez" : "veces"} · Respuesta: ${esc(pr[1][0])}</span></li>`;
    }).join("");
    return `${topbar(false)}
      <button class="iconbtn" data-act="${perfilActual() ? "mapa" : "inicio"}" style="align-self:flex-start">← Volver</button>
      <section class="stack">
        <p class="eyebrow">Zona de padres</p>
        <h1>Progreso en la catequesis</h1>
        <p class="muted">Aquí veis cómo va cada niño y qué preguntas le cuestan más, para repasarlas juntos en casa.</p>
      </section>
      <div class="tabs" role="tablist">${perfiles.map(p => `<button role="tab" aria-selected="${p.id === sel.id}" data-act="padres" data-id="${p.id}">${esc(p.nombre)}</button>`).join("")}</div>
      <section class="card stack">
        <div class="row" style="justify-content:space-between"><h3>${esc(sel.nombre)}</h3><span class="chip-pts">${sel.puntos}</span></div>
        <p class="muted small">Progreso total: <b>${progresoGlobal(sel)}%</b> · Examen final: <b>${sel.nivelFinal ? "superado" : sel.examenes.length ? `último ${sel.examenes[sel.examenes.length - 1]}%` : "aún no"}</b></p>
        <div class="table-wrap"><table>
          <thead><tr><th>Tema</th><th>Partidas</th><th>Últimas ${CONFIG.intentosParaDominar}</th><th>Estado</th></tr></thead>
          <tbody>${filas}</tbody></table></div>
      </section>
      <section class="card stack">
        <h3>Preguntas que más le cuestan</h3>
        ${falladas ? `<ul class="fail-list">${falladas}</ul>` : `<p class="muted">Todavía no hay fallos registrados. Cuando juegue, aparecerán aquí.</p>`}
      </section>
      <section class="card stack">
        <h3>Sobre la app</h3>
        <p class="small">Contenido basado en la doctrina de la Iglesia Católica, Apostólica y Romana, preparado para la catequesis de la ${esc(CONFIG.parroquia)} (${esc(CONFIG.ciudad)}), diócesis de ${esc(CONFIG.diocesis)}. Versión de prueba pendiente de revisión.</p>
        <p class="small muted">Privacidad: la app no pide datos personales, no tiene publicidad ni envía nada a internet. Todo se guarda en este dispositivo.</p>
        ${params.borrar === sel.id
          ? `<div class="confirm"><b>¿Borrar el perfil de ${esc(sel.nombre)} y todo su progreso?</b><span class="small">No se puede deshacer.</span><div class="row"><button class="btn small" style="background:var(--bad);color:#fff" data-act="borrarSi" data-id="${sel.id}">Sí, borrar</button><button class="btn small ghost" data-act="padres" data-id="${sel.id}">Cancelar</button></div></div>`
          : `<button class="btn small ghost" data-act="borrar" data-id="${sel.id}" style="align-self:flex-start">Borrar este perfil</button>`}
      </section>`;
  }

  /* ------------------------------------------------------------------ *
   * 8. ROSARIO INTERACTIVO                                              *
   * ------------------------------------------------------------------ */
  // Grupo de misterios según el día de la semana
  function misteriosDeHoy() {
    const d = new Date().getDay();
    return Object.keys(MISTERIOS).find(k => MISTERIOS[k].dias.includes(d)) || "gozosos";
  }
  // Construye la lista de pasos: cada paso dice qué cuenta se toca y qué oración se reza
  function pasosRosario(grupo) {
    const M = MISTERIOS[grupo];
    const pasos = [];
    pasos.push({ cuenta: "cruz", o: "senal" });
    pasos.push({ cuenta: "cruz", o: "credo" });
    pasos.push({ cuenta: "p1", o: "padrenuestro" });
    ["fe", "esperanza", "caridad"].forEach((v, k) => pasos.push({ cuenta: "p" + (k + 2), o: "avemaria", nota: `Avemaría ${k + 1} de 3 · por la virtud de la ${v}` }));
    for (let d = 0; d < 5; d++) {
      const grande = d === 0 ? "p5" : "g" + d;
      pasos.push({ cuenta: grande, o: "gloria" });
      if (d > 0) pasos.push({ cuenta: grande, o: "ohjesus" });
      pasos.push({ cuenta: grande, o: "padrenuestro", misterio: d, anuncio: true });
      for (let a = 0; a < 10; a++) pasos.push({ cuenta: `d${d}-${a}`, o: "avemaria", misterio: d, nota: `Avemaría ${a + 1} de 10` });
    }
    pasos.push({ cuenta: "medalla", o: "gloria", misterio: 4 });
    pasos.push({ cuenta: "medalla", o: "ohjesus", misterio: 4 });
    pasos.push({ cuenta: "medalla", o: "salve" });
    return pasos.map(s => Object.assign(s, { grupo, nombreGrupo: M.nombre }));
  }
  function abrirRosario() {
    const g = misteriosDeHoy();
    rosario = { grupo: g, pasos: pasosRosario(g), i: 0 };
    ir("rosario");
  }
  function vRosario() {
    if (!rosario) return vMapa();
    const s = rosario.pasos[rosario.i];
    const or = ORACIONES[s.o];
    const M = MISTERIOS[rosario.grupo];
    const misterioTxt = s.misterio !== undefined ? `<div class="mystery"><b>${["Primer", "Segundo", "Tercer", "Cuarto", "Quinto"][s.misterio]} misterio ${M.nombre.replace("Misterios ", "").replace(/s$/, "")}:</b> ${esc(M.lista[s.misterio])}</div>` : "";
    return `${topbar(false)}
      <button class="iconbtn" data-act="bloque" data-id="ros" style="align-self:flex-start">← Volver al tema</button>
      <section class="stack">
        <p class="eyebrow">El Santo Rosario</p>
        <h1>Rezamos juntos</h1>
        <label class="small muted" for="grupo">Hoy toca: <b>${esc(MISTERIOS[misteriosDeHoy()].nombre.toLowerCase())}</b>. Puedes elegir otros:</label>
        <select id="grupo" class="select" data-act="grupo">${Object.keys(MISTERIOS).map(k => `<option value="${k}" ${k === rosario.grupo ? "selected" : ""}>${MISTERIOS[k].nombre} (${MISTERIOS[k].diasTexto})</option>`).join("")}</select>
      </section>
      <div class="rosary-wrap">
        <div class="card"><svg class="rosary-svg" id="rosary" viewBox="0 0 400 540" role="img" aria-label="Rosario: toca una cuenta para ir a esa oración"></svg></div>
        <section class="card prayer-box">
          <div class="row" style="justify-content:space-between"><p class="eyebrow">Paso ${rosario.i + 1} de ${rosario.pasos.length}</p>${s.nota ? `<span class="small" style="font-weight:800;color:var(--gold)">${esc(s.nota)}</span>` : ""}</div>
          ${misterioTxt}
          ${s.anuncio ? `<p class="small muted">Anunciamos el misterio, pensamos un momento en él y rezamos:</p>` : ""}
          <h2>${esc(or.titulo)}</h2>
          <p class="x">${esc(or.texto)}</p>
          <div class="row" style="justify-content:space-between;margin-top:6px">
            <button class="btn ghost" data-act="rosAnt" ${rosario.i === 0 ? "disabled" : ""}>Anterior</button>
            ${rosario.i + 1 < rosario.pasos.length ? `<button class="btn" data-act="rosSig">Siguiente</button>` : `<button class="btn gold" data-act="bloque" data-id="ros">¡Terminado! Amén</button>`}
          </div>
        </section>
      </div>`;
  }
  // Dibuja el rosario (55 cuentas + medalla + cruz) y marca la cuenta actual
  function pintarRosario() {
    const svg = document.getElementById("rosary");
    if (!svg || !rosario) return;
    const cx = 200, cy = 190, R = 150;
    const cuentas = []; // {id, x, y, big}
    // El aro: medalla abajo; desde ella, 5 decenas separadas por 4 cuentas grandes
    const aro = [];
    for (let d = 0; d < 5; d++) {
      for (let a = 0; a < 10; a++) aro.push({ id: `d${d}-${a}`, big: false });
      if (d < 4) aro.push({ id: "g" + (d + 1), big: true });
    }
    const huecos = aro.length + 1; // +1 por la medalla
    aro.forEach((c, k) => {
      const ang = Math.PI / 2 + ((k + 1) / huecos) * Math.PI * 2; // empieza junto a la medalla y da la vuelta completa al aro
      cuentas.push({ ...c, x: cx + R * Math.cos(ang), y: cy + R * Math.sin(ang) });
    });
    const my = cy + R;
    // El colgante: de la medalla hacia la cruz
    const colg = [{ id: "p5", big: true, y: my + 34 }, { id: "p4", y: my + 62 }, { id: "p3", y: my + 84 }, { id: "p2", y: my + 106 }, { id: "p1", big: true, y: my + 136 }];
    colg.forEach(c => cuentas.push({ ...c, big: !!c.big, x: cx }));

    const actual = rosario.pasos[rosario.i].cuenta;
    const ordenCuentas = []; // orden en que se recorren, para pintar las ya rezadas
    rosario.pasos.forEach(s => { if (!ordenCuentas.includes(s.cuenta)) ordenCuentas.push(s.cuenta); });
    const idxActual = ordenCuentas.indexOf(actual);
    const hecha = id => ordenCuentas.indexOf(id) < idxActual;

    let html = `<circle class="chain" cx="${cx}" cy="${cy}" r="${R}"/><line class="chain" x1="${cx}" y1="${my}" x2="${cx}" y2="${my + 160}"/>`;
    cuentas.forEach(c => {
      const r = c.big ? 11 : 7.5;
      const cls = `bead ${c.big ? "big" : ""} ${c.id === actual ? "now" : hecha(c.id) ? "done" : ""}`;
      html += `<circle class="${cls}" cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="${r}" data-cuenta="${c.id}"><title>${c.id}</title></circle>`;
    });
    html += `<path class="medalmark ${actual === "medalla" ? "now" : ""}" data-cuenta="medalla" d="M${cx} ${my - 14} l12 14 l-12 14 l-12 -14z"/>`;
    const cyC = my + 172;
    html += `<path class="crossmark ${actual === "cruz" ? "now" : ""}" data-cuenta="cruz" d="M${cx - 5} ${cyC - 14}h10v14h12v10h-12v26h-10v-26h-12v-10h12z"/>`;
    svg.innerHTML = html;
  }


  /* ------------------------------------------------------------------ *
   * 8b. VÍA CRUCIS PASO A PASO                                          *
   *    Paso 0: inicio · pasos 1-14: estaciones · último: final          *
   * ------------------------------------------------------------------ */
  function vVia() {
    if (!via) return vMapa();
    const n = VIA_CRUCIS.length, i = via.i;
    const ROMANOS = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV"];
    let cuerpo;
    if (i === 0) {
      cuerpo = `<p class="eyebrow">Comenzamos</p><h2>Acompañamos a Jesús</h2>
        <p class="x">Nos ponemos en presencia de Dios y hacemos la señal de la cruz.\n\n${esc(ORACIONES.senal.texto)}</p>`;
    } else if (i <= n) {
      const e = VIA_CRUCIS[i - 1];
      cuerpo = `<p class="eyebrow">Estación ${ROMANOS[i - 1]} · ${i} de ${n}</p><h2>${esc(e.t)}</h2>
        <div class="mystery"><b>Guía:</b> Te adoramos, oh Cristo, y te bendecimos.<br><b>Todos:</b> Que por tu santa cruz redimiste al mundo.</div>
        <p class="x">${esc(e.r)}</p>
        <p class="small muted">Rezamos un Padre Nuestro.</p>`;
    } else {
      cuerpo = `<p class="eyebrow">Final</p><h2>¡Jesús resucitó!</h2>
        <p class="x">Jesús no se quedó en el sepulcro: al tercer día resucitó. Le damos gracias por su amor.\n\n${esc(ORACIONES.gloria.texto)}</p>`;
    }
    const pct = Math.round((i / (n + 1)) * 100);
    return `${topbar(false)}
      <button class="iconbtn" data-act="bloque" data-id="via" style="align-self:flex-start">← Volver al tema</button>
      <section class="stack"><p class="eyebrow">El Vía Crucis</p><h1>Camino de la cruz</h1></section>
      <div class="progress" aria-hidden="true"><span style="width:${pct}%"></span></div>
      <section class="card prayer-box">
        ${cuerpo}
        <div class="row" style="justify-content:space-between;margin-top:6px">
          <button class="btn ghost" data-act="viaAnt" ${i === 0 ? "disabled" : ""}>Anterior</button>
          ${i <= n ? `<button class="btn" data-act="viaSig">${i === 0 ? "Empezar" : "Siguiente"}</button>` : `<button class="btn gold" data-act="bloque" data-id="via">Terminar. Amén</button>`}
        </div>
      </section>`;
  }

  /* ------------------------------------------------------------------ *
   * 9. EVENTOS (toques y clics)                                         *
   * ------------------------------------------------------------------ */
  $app.addEventListener("click", ev => {
    const cuentaEl = ev.target.closest("[data-cuenta]");
    if (cuentaEl && rosario) {
      const k = rosario.pasos.findIndex(s => s.cuenta === cuentaEl.dataset.cuenta);
      if (k >= 0) { rosario.i = k; render(); }
      return;
    }
    const el = ev.target.closest("[data-act]");
    if (!el || el.tagName === "SELECT") return;
    const act = el.dataset.act, id = el.dataset.id;
    switch (act) {
      case "inicio": datos.actual = null; guardar(); ir("inicio"); break;
      case "nuevo": ir("nuevo"); break;
      case "color": ir("nuevo", { color: el.dataset.c, nombre: document.getElementById("apodo").value }); break;
      case "crear": {
        const nombre = document.getElementById("apodo").value.trim();
        if (!nombre) { document.getElementById("err").hidden = false; return; }
        const p = { id: "p" + Date.now().toString(36), nombre: nombre.slice(0, 16), color: el.dataset.c, puntos: 0, intentos: {}, fallos: {}, fallosTotales: {}, examenes: [], nivelFinal: false };
        datos.perfiles.push(p); datos.actual = p.id; guardar(); ir("mapa");
        break;
      }
      case "elegir": datos.actual = id; guardar(); ir("mapa"); break;
      case "mapa": ir("mapa"); break;
      case "bloque": ir("bloque", { id }); break;
      case "jugar": empezar("bloque", id); break;
      case "examen": empezar("examen"); break;
      case "responder": responder(Number(el.dataset.k)); break;
      case "siguiente": siguiente(); break;
      case "salir": {
        const volverA = juego && juego.tipo === "bloque" ? juego.bid : null;
        juego = null;
        if (volverA) ir("bloque", { id: volverA }); else ir("mapa");
        break;
      }
      case "final": ir("final"); break;
      case "padres": ir("padres", { id }); break;
      case "borrar": ir("padres", { id, borrar: id }); break;
      case "borrarSi":
        datos.perfiles = datos.perfiles.filter(p => p.id !== id);
        if (datos.actual === id) datos.actual = null;
        guardar(); ir(datos.perfiles.length ? "padres" : "inicio");
        break;
      case "rosario": abrirRosario(); break;
      case "rosSig": if (rosario.i + 1 < rosario.pasos.length) { rosario.i++; render(); } break;
      case "rosAnt": if (rosario.i > 0) { rosario.i--; render(); } break;
      case "via": via = { i: 0 }; ir("via"); break;
      case "viaSig": if (via.i < VIA_CRUCIS.length + 1) { via.i++; render(); arriba(); } break;
      case "viaAnt": if (via.i > 0) { via.i--; render(); arriba(); } break;
    }
  });
  $app.addEventListener("change", ev => {
    if (ev.target.id === "grupo" && rosario) {
      rosario = { grupo: ev.target.value, pasos: pasosRosario(ev.target.value), i: 0 };
      render();
    }
  });
  $app.addEventListener("keydown", ev => {
    if (ev.target.id === "apodo" && ev.key === "Enter") {
      ev.preventDefault();
      const b = $app.querySelector('[data-act="crear"]'); if (b) b.click();
    }
  });

  /* ------------------------------------------------------------------ *
   * 10. ARRANQUE                                                         *
   * ------------------------------------------------------------------ */
  vista = perfilActual() ? "mapa" : "inicio";
  render();
})();
