/* =========================================================================
   AMAZING TEA · app.js
   -------------------------------------------------------------------------
   La lógica de la app: pantallas, buscador y filtros, té del día,
   temporizador con ritual, pasaporte, reto de 30 días y registro de peso.

   PRIVACIDAD: no se envía nada a internet. Favoritos, sellos, reto y peso
   se guardan solo en este móvil (localStorage). Si desinstalas la app o
   borras sus datos, se pierden.
   ========================================================================= */

(function () {
  "use strict";

  /* ------------------------------------------------------------------ *
   * 1. DATOS GUARDADOS EN EL MÓVIL                                      *
   * ------------------------------------------------------------------ */
  const CLAVE = "amazingTea.v1";
  const VACIO = () => ({ fav: [], hechas: {}, reto: null, peso: [] });

  function cargar() {
    try {
      const raw = localStorage.getItem(CLAVE);
      if (raw) return Object.assign(VACIO(), JSON.parse(raw));
    } catch (e) { /* sin almacenamiento: funciona igual, pero no recuerda */ }
    return VACIO();
  }
  function guardar() {
    try { localStorage.setItem(CLAVE, JSON.stringify(datos)); } catch (e) { /* ignorar */ }
  }
  let datos = cargar();

  /* ------------------------------------------------------------------ *
   * 2. AYUDANTES                                                        *
   * ------------------------------------------------------------------ */
  const $app = document.getElementById("app");
  const $titulo = document.getElementById("titulo");
  const $atras = document.getElementById("btnAtras");
  const POR_ID = {};
  RECETAS.forEach(r => (POR_ID[r.id] = r));

  // Evita que un texto escrito por el usuario se interprete como código
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  // Quita tildes y mayúsculas para que el buscador encuentre "té" escribiendo "te"
  function normal(s) {
    return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }
  // Fecha de hoy en formato AAAA-MM-DD (hora local de España)
  function fechaISO(d) {
    d = d || new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function sumarDias(iso, n) {
    const [a, m, d] = iso.split("-").map(Number);
    return fechaISO(new Date(a, m - 1, d + n));
  }
  function diasEntre(isoA, isoB) {
    const [a1, m1, d1] = isoA.split("-").map(Number);
    const [a2, m2, d2] = isoB.split("-").map(Number);
    return Math.round((new Date(a2, m2 - 1, d2) - new Date(a1, m1 - 1, d1)) / 86400000);
  }
  function fechaBonita(iso) {
    const [a, m, d] = iso.split("-").map(Number);
    return new Date(a, m - 1, d).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });
  }
  function aviso(texto) {
    document.querySelectorAll(".aviso-toast").forEach(x => x.remove());
    const t = document.createElement("div");
    t.className = "aviso-toast";
    t.textContent = texto;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  }

  const ICONO_TIPO = { caliente: "☕", frio: "🧊", especial: "🍹", vitalidad: "🌿" };
  const NOMBRE_TIPO = { caliente: "Caliente", frio: "Frío", especial: "Especial", vitalidad: "Vitalidad" };
  const NOMBRE_CAF = { alta: "Cafeína alta", media: "Cafeína media", baja: "Poca cafeína", no: "Sin cafeína" };
  const EFECTOS = {
    energia: "⚡ Energía", relax: "😌 Relax", dormir: "😴 Dormir",
    digestion: "🌿 Digestión", hidratacion: "💧 Hidratación", antojo: "🍯 Antojo dulce"
  };
  const MOMENTOS = { "mañana": "🌅", "mediodía": "☀️", "tarde": "🌤️", "noche": "🌙" };

  function tiempoTexto(r) {
    if (!r.seg) return r.espera || "";
    if (r.seg < 60) return r.seg + " s";
    const m = r.seg / 60;
    return (Number.isInteger(m) ? m : m.toFixed(1).replace(".", ",")) + " min";
  }
  function bandera(p) { return BANDERAS[p] || "🌍"; }
  function esFav(id) { return datos.fav.includes(id); }

  /* ------------------------------------------------------------------ *
   * 3. TÉ DEL DÍA                                                       *
   *    Cambia cada día. Por la tarde-noche solo propone opciones sin    *
   *    cafeína o con muy poca; en verano prefiere bebidas frías.        *
   * ------------------------------------------------------------------ */
  function teDelDia() {
    const ahora = new Date();
    const hora = ahora.getHours();
    const mes = ahora.getMonth(); // 0 = enero
    const verano = mes >= 5 && mes <= 8;
    let lista = RECETAS.filter(r => r.id !== "kombucha");
    if (hora >= 17 || hora < 5) lista = lista.filter(r => r.caf === "no" || r.caf === "baja");
    const preferidas = lista.filter(r => verano ? (r.t === "frio" || r.t === "especial") : (r.t === "caliente" || r.t === "vitalidad"));
    if (preferidas.length) lista = preferidas;
    // Número "aleatorio" fijo para todo el día, a partir de la fecha
    const semilla = fechaISO().split("").reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
    return lista[semilla % lista.length];
  }
  function saludo() {
    const h = new Date().getHours();
    if (h < 6) return "Buenas noches";
    if (h < 13) return "Buenos días";
    if (h < 21) return "Buenas tardes";
    return "Buenas noches";
  }

  /* ------------------------------------------------------------------ *
   * 4. PANTALLAS                                                        *
   * ------------------------------------------------------------------ */

  // ---------- Inicio ----------
  function pantallaInicio() {
    const r = teDelDia();
    const sellos = paisesSellados().length;
    const totalPaises = Object.keys(BANDERAS).length;
    const reto = estadoReto();
    $app.innerHTML = `
      <p class="saludo">${saludo()}. ¿Qué te apetece tomar?</p>

      <div class="tarjeta destacado" data-ir="#/r/${r.id}">
        <div class="sobre">Té del día · ${bandera(r.p)} ${esc(r.p)}</div>
        <h2>${esc(r.n)}</h2>
        <div>${NOMBRE_TIPO[r.t]} · ${tiempoTexto(r)} · ${NOMBRE_CAF[r.caf]}</div>
        <button class="btn">Ver receta</button>
        <div class="emoji-grande">${ICONO_TIPO[r.t]}</div>
      </div>

      <h3 class="seccion">Busca por lo que necesitas</h3>
      <div class="accesos">
        <button class="acceso" data-filtro='{"tipo":"caliente"}'><span>☕</span><b>Calientes</b><small class="suave">Tés e infusiones</small></button>
        <button class="acceso" data-filtro='{"tipo":"frio"}'><span>🧊</span><b>Fríos</b><small class="suave">Para el calor</small></button>
        <button class="acceso" data-filtro='{"ef":"energia"}'><span>⚡</span><b>Energía</b><small class="suave">Para despertar</small></button>
        <button class="acceso" data-filtro='{"ef":"dormir"}'><span>😴</span><b>Para dormir</b><small class="suave">Sin cafeína</small></button>
        <button class="acceso" data-filtro='{"ef":"digestion"}'><span>🌿</span><b>Digestión</b><small class="suave">Después de comer</small></button>
        <button class="acceso" data-filtro='{"tipo":"especial"}'><span>🍹</span><b>Especiales</b><small class="suave">Sin alcohol</small></button>
      </div>

      <h3 class="seccion">Tu progreso</h3>
      <div class="resumen">
        <div class="tarjeta" data-ir="#/pasaporte"><b>${sellos}/${totalPaises}</b><small class="suave">sellos del pasaporte</small></div>
        <div class="tarjeta" data-ir="#/vitalidad"><b>${reto ? reto.hechos : 0}/30</b><small class="suave">días del reto</small></div>
        <div class="tarjeta" data-filtro='{"fav":true}'><b>${datos.fav.length}</b><small class="suave">favoritos</small></div>
      </div>`;
  }

  // ---------- Lista de recetas con buscador y filtros ----------
  let filtro = { q: "", tipo: "", ef: "", sinCaf: false, fav: false, pais: "" };

  function pantallaRecetas() {
    const tipos = [["", "Todas"], ["caliente", "☕ Calientes"], ["frio", "🧊 Fríos"], ["especial", "🍹 Especiales"], ["vitalidad", "🌿 Vitalidad"]];
    $app.innerHTML = `
      <input class="buscador" id="buscar" type="search" placeholder="Buscar: chai, menta, Japón…" value="${esc(filtro.q)}" autocomplete="off">
      <div class="chips">
        ${tipos.map(([v, t]) => `<button class="chip ${filtro.tipo === v ? "on" : ""}" data-tipo="${v}">${t}</button>`).join("")}
      </div>
      <div class="chips">
        <button class="chip ${filtro.fav ? "on" : ""}" data-toggle="fav">⭐ Favoritos</button>
        <button class="chip ${filtro.sinCaf ? "on" : ""}" data-toggle="sinCaf">🚫 Sin cafeína</button>
        ${Object.entries(EFECTOS).map(([k, t]) => `<button class="chip ${filtro.ef === k ? "on" : ""}" data-ef="${k}">${t}</button>`).join("")}
      </div>
      ${filtro.pais ? `<div class="chips"><button class="chip on" data-quitar-pais>${bandera(filtro.pais)} ${esc(filtro.pais)} ✕</button></div>` : ""}
      <div id="lista"></div>`;
    pintarLista();
    document.getElementById("buscar").addEventListener("input", e => { filtro.q = e.target.value; pintarLista(); });
  }

  function recetasFiltradas() {
    const q = normal(filtro.q.trim());
    return RECETAS.filter(r => {
      if (filtro.tipo && r.t !== filtro.tipo) return false;
      if (filtro.ef && !r.ef.includes(filtro.ef)) return false;
      if (filtro.sinCaf && r.caf !== "no") return false;
      if (filtro.fav && !esFav(r.id)) return false;
      if (filtro.pais && r.p !== filtro.pais) return false;
      if (q) {
        const texto = normal([r.n, r.p, r.ing.join(" "), r.para].join(" "));
        if (!texto.includes(q)) return false;
      }
      return true;
    });
  }

  function pintarLista() {
    const lista = recetasFiltradas();
    const $l = document.getElementById("lista");
    if (!lista.length) {
      $l.innerHTML = `<div class="vacio">No hay recetas con esos filtros.<br><br><button class="btn sec" data-limpiar>Quitar filtros</button></div>`;
      return;
    }
    $l.innerHTML = `<div class="contador">${lista.length} ${lista.length === 1 ? "receta" : "recetas"}</div>` +
      lista.map(filaReceta).join("");
  }

  function filaReceta(r) {
    const hecha = datos.hechas[r.id];
    return `
      <a class="fila" href="#/r/${r.id}">
        <div class="ico ${r.t}">${ICONO_TIPO[r.t]}</div>
        <div class="txt">
          <b>${esc(r.n)}</b>
          <small>${bandera(r.p)} ${esc(r.p)} · ${tiempoTexto(r)} · ${NOMBRE_CAF[r.caf]}</small>
        </div>
        <div class="marca">${esFav(r.id) ? "⭐" : ""}${hecha ? "✅" : ""}</div>
      </a>`;
  }

  // ---------- Ficha de una receta ----------
  function pantallaFicha(id) {
    const r = POR_ID[id];
    if (!r) return ir("#/recetas");
    $titulo.textContent = r.n;
    const veces = datos.hechas[r.id] || 0;
    $app.innerHTML = `
      <div class="ficha">
        <div class="ficha-cab">
          <div class="bandera">${bandera(r.p)}</div>
          <h2>${esc(r.n)}</h2>
          <div class="suave">${esc(r.p)} · ${r.c === "te" ? "Té" : "Infusión"} · ${NOMBRE_TIPO[r.t]}${r.mom ? " · " + MOMENTOS[r.mom] + " " + r.mom : ""}</div>
          <div style="margin-top:8px">${r.ef.map(e => `<span class="etiqueta">${EFECTOS[e]}</span>`).join("")}<span class="etiqueta caf-${r.caf}">${NOMBRE_CAF[r.caf]}</span></div>
        </div>

        <div class="datos">
          <div class="dato"><b>${r.temp ? r.temp + " ºC" : "—"}</b><small>Agua</small></div>
          <div class="dato"><b>${r.seg ? tiempoTexto(r) : "⏳"}</b><small>${r.seg ? "Reposo" : esc(r.espera)}</small></div>
          <div class="dato"><b>${veces}</b><small>${veces === 1 ? "vez hecha" : "veces hecha"}</small></div>
        </div>

        <div class="acciones">
          ${r.seg ? `<a class="btn" href="#/t/${r.id}">⏱ Empezar</a>` : `<button class="btn" data-hecha="${r.id}">✔ La he preparado</button>`}
          <button class="btn sec" data-fav="${r.id}">${esFav(r.id) ? "⭐ Favorita" : "☆ Favorita"}</button>
        </div>

        <div class="tarjeta"><h3>Ingredientes</h3><ul>${r.ing.map(i => `<li>${esc(i)}</li>`).join("")}</ul></div>
        <div class="tarjeta"><h3>Preparación</h3><ol>${r.pasos.map(p => `<li>${esc(p)}</li>`).join("")}</ol></div>
        <div class="tarjeta"><h3>¿Para qué se toma?</h3><p style="margin:0">${esc(r.para)}</p></div>
        <div class="tarjeta"><h3>Origen e historia</h3><p style="margin:0">${esc(r.hist)}</p></div>
        ${r.prec ? `<div class="aviso">⚠️ <b>Precauciones:</b> ${esc(r.prec)}</div>` : ""}
        <p class="suave pequeño">Los usos indicados son tradicionales, no consejos médicos.</p>
      </div>`;
  }

  // ---------- Temporizador con ritual ----------
  let temp = null; // { id, fin, total, resto, pausado, tic, bloqueo }

  function pantallaTemporizador(id) {
    const r = POR_ID[id];
    if (!r || !r.seg) return ir("#/recetas");
    $titulo.textContent = "Reposando…";
    pararTemporizador();
    temp = { id, total: r.seg * 1000, resto: r.seg * 1000, fin: Date.now() + r.seg * 1000, pausado: false, tic: null, bloqueo: null };
    $app.innerHTML = `
      <div class="ritual">
        <div class="suave">${bandera(r.p)} ${esc(r.n)}${r.temp ? " · agua a " + r.temp + " ºC" : ""}</div>
        <div class="reloj" id="reloj">--:--</div>
        <div class="barra-progreso"><i id="progreso"></i></div>
        <div class="respira" id="respira"><span id="textoRespira">Inspira</span></div>
        <p class="curioso">💡 ${esc(r.dato)}</p>
        <div class="acciones" id="botonesTemp">
          <button class="btn sec" data-pausa>⏸ Pausa</button>
          <a class="btn sec" href="#/r/${r.id}">Cancelar</a>
        </div>
      </div>`;
    mantenerPantallaEncendida();
    temp.tic = setInterval(actualizarTemporizador, 250);
    actualizarTemporizador();
  }

  function actualizarTemporizador() {
    if (!temp) return;
    const resto = temp.pausado ? temp.resto : Math.max(0, temp.fin - Date.now());
    const s = Math.ceil(resto / 1000);
    const $reloj = document.getElementById("reloj");
    if (!$reloj) return pararTemporizador();
    $reloj.textContent = Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
    document.getElementById("progreso").style.width = (100 - (resto / temp.total) * 100) + "%";
    // Respiración: 4 segundos inspirar, 4 segundos espirar (coincide con la animación)
    const transcurrido = (temp.total - resto) / 1000;
    document.getElementById("textoRespira").textContent = (Math.floor(transcurrido / 4) % 2 === 0) ? "Inspira" : "Espira";
    if (resto <= 0) terminarTemporizador();
  }

  function terminarTemporizador() {
    const id = temp.id;
    pararTemporizador();
    sonar();
    if (navigator.vibrate) navigator.vibrate([300, 150, 300, 150, 300]);
    $titulo.textContent = "¡Listo!";
    document.getElementById("respira").classList.add("parado");
    const $t = document.getElementById("textoRespira"); $t.textContent = "🍵"; $t.style.fontSize = "64px";
    document.getElementById("reloj").outerHTML = `<div class="listo">¡Tu té está listo!</div>`;
    document.getElementById("botonesTemp").innerHTML = `
      <button class="btn ancho" data-hecha="${id}" data-volver="1">✔ Sellar en el pasaporte</button>`;
  }

  function pararTemporizador() {
    if (!temp) return;
    clearInterval(temp.tic);
    if (temp.bloqueo) { try { temp.bloqueo.release(); } catch (e) {} }
    temp = null;
  }

  // Evita que la pantalla se apague mientras reposa el té (si el móvil lo permite)
  async function mantenerPantallaEncendida() {
    try { if (navigator.wakeLock && temp) temp.bloqueo = await navigator.wakeLock.request("screen"); } catch (e) {}
  }

  // Tres pitidos suaves generados por el propio móvil (no hace falta ningún archivo de sonido)
  function sonar() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      [0, 0.45, 0.9].forEach(t => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = "sine"; o.frequency.value = 880;
        g.gain.setValueAtTime(0.0001, ctx.currentTime + t);
        g.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + t + 0.03);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + t + 0.35);
        o.connect(g).connect(ctx.destination);
        o.start(ctx.currentTime + t); o.stop(ctx.currentTime + t + 0.4);
      });
    } catch (e) {}
  }

  // ---------- Pasaporte ----------
  function paisesSellados() {
    const set = new Set();
    Object.keys(datos.hechas).forEach(id => { if (POR_ID[id]) set.add(POR_ID[id].p); });
    return [...set];
  }

  function pantallaPasaporte() {
    const sellados = paisesSellados();
    const paises = Object.keys(BANDERAS);
    const hechas = Object.keys(datos.hechas).filter(id => POR_ID[id]);
    $app.innerHTML = `
      <div class="tarjeta">
        <h3>Tu pasaporte del té</h3>
        <p class="suave pequeño" style="margin:4px 0 0">Cada receta que preparas sella su país. ¿Llegarás a dar la vuelta al mundo?</p>
        <div class="barra-total"><i style="width:${(sellados.length / paises.length) * 100}%"></i></div>
        <b>${sellados.length}</b> de ${paises.length} países · <b>${hechas.length}</b> de ${RECETAS.length} recetas
      </div>
      <div class="sellos">
        ${paises.map(p => `
          <button class="sello ${sellados.includes(p) ? "ok" : ""}" data-pais="${esc(p)}">
            <span class="b">${BANDERAS[p]}</span>${esc(p)}
          </button>`).join("")}
      </div>
      <p class="suave pequeño" style="margin-top:14px">Toca un país para ver sus recetas.</p>`;
  }

  // ---------- Vitalidad y peso ----------
  function estadoReto() {
    const r = datos.reto;
    if (!r) return null;
    const hoy = fechaISO();
    const diaN = diasEntre(r.inicio, hoy) + 1; // 1 = primer día
    const hechos = r.dias.filter(d => diasEntre(r.inicio, d) >= 0 && diasEntre(r.inicio, d) < 30).length;
    return { inicio: r.inicio, diaN, hechos, terminado: diaN > 30, hoyHecho: r.dias.includes(hoy) };
  }

  function pantallaVitalidad() {
    const momentos = ["mañana", "mediodía", "tarde", "noche"];
    const vit = RECETAS.filter(r => r.t === "vitalidad");
    $app.innerHTML = `
      <div class="aviso honesto">
        <b>Con sinceridad:</b> ningún té adelgaza por sí solo. Lo que sí funciona es
        <b>cambiar bebidas azucaradas por tés sin azúcar</b>, beber más agua, dormir bien
        y no picar entre horas. Esta sección te ayuda con eso.
      </div>

      <h3 class="seccion">🏆 Reto de 30 días</h3>
      <div class="tarjeta">${htmlReto()}</div>

      <h3 class="seccion">🗓️ Tu rutina de tés</h3>
      <div class="tarjeta">
        ${momentos.map(m => {
          const opciones = vit.filter(r => r.mom === m);
          return `<div class="momento"><div class="m">${MOMENTOS[m]}</div><div>
            <b style="text-transform:capitalize">${m}</b><br>
            ${opciones.map(r => `<a href="#/r/${r.id}">${esc(r.n)}</a>`).join("<br>")}
          </div></div>`;
        }).join("")}
        <p class="suave pequeño" style="margin:10px 0 0">Consejo: evita la cafeína a partir de las 5 de la tarde para dormir mejor.</p>
      </div>

      <h3 class="seccion">⚖️ Registro de peso</h3>
      <div class="tarjeta">${htmlPeso()}</div>

      <p class="suave pequeño">Si tomas medicación, estás embarazada o tienes alguna enfermedad, consulta con tu médico antes de cambiar tus hábitos.</p>`;
  }

  function htmlReto() {
    const e = estadoReto();
    if (!e) {
      return `<p style="margin-top:0"><b>Cambia un refresco o zumo azucarado por un té sin azúcar cada día, durante 30 días.</b></p>
        <p class="suave pequeño">Cada lata de refresco que no tomas son unos 35 g de azúcar menos (unos 9 terrones). Tienes ideas en
        <a href="#/r/v-sustituto-refresco">hibisco con gas</a> y en la sección de fríos.</p>
        <button class="btn ancho" data-reto-empezar>Empezar el reto hoy</button>`;
    }
    const celdas = [];
    for (let i = 0; i < 30; i++) {
      const f = sumarDias(e.inicio, i);
      const hecho = datos.reto.dias.includes(f);
      const esHoy = i === e.diaN - 1;
      celdas.push(`<div class="dia ${hecho ? "hecho" : ""} ${esHoy ? "hoy" : ""}">${hecho ? "✓" : i + 1}</div>`);
    }
    const azucar = e.hechos * 35;
    let pie;
    if (e.terminado) {
      pie = `<p><b>¡Reto terminado!</b> Lo cumpliste ${e.hechos} de 30 días y te ahorraste unos ${azucar} g de azúcar.</p>
        <button class="btn ancho" data-reto-empezar>Empezar otro reto</button>`;
    } else {
      pie = `<button class="btn ancho ${e.hoyHecho ? "sec" : ""}" data-reto-hoy>${e.hoyHecho ? "✓ Hoy cumplido (toca para deshacer)" : "Hoy he cambiado un refresco por un té"}</button>
        <p class="suave pequeño" style="margin:10px 0 0">Día ${e.diaN} de 30 · <button class="btn peligro" style="padding:4px 12px;font-size:13px" data-reto-borrar>Reiniciar</button></p>`;
    }
    return `<div><b>${e.hechos}</b> ${e.hechos === 1 ? "día cumplido" : "días cumplidos"} · unos <b>${azucar} g</b> de azúcar ahorrados</div>
      <div class="calendario">${celdas.join("")}</div>${pie}`;
  }

  function htmlPeso() {
    const lista = [...datos.peso].sort((a, b) => a.f.localeCompare(b.f));
    let grafica = "";
    if (lista.length >= 2) {
      const ult = lista.slice(-20);
      const kg = ult.map(p => p.kg);
      const min = Math.min(...kg) - 0.5, max = Math.max(...kg) + 0.5;
      const pts = ult.map((p, i) => {
        const x = 10 + (i / (ult.length - 1)) * 280;
        const y = 10 + (1 - (p.kg - min) / (max - min)) * 100;
        return x.toFixed(1) + "," + y.toFixed(1);
      }).join(" ");
      grafica = `<svg class="grafica" viewBox="0 0 300 120" preserveAspectRatio="none" aria-label="Evolución del peso">
        <polyline points="${pts}" fill="none" stroke="var(--verde)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
      </svg>`;
    }
    let cambio = "";
    if (lista.length >= 2) {
      const d = lista[lista.length - 1].kg - lista[0].kg;
      cambio = `<p style="margin:4px 0">Desde el ${fechaBonita(lista[0].f)}: <b>${d > 0 ? "+" : ""}${d.toFixed(1).replace(".", ",")} kg</b></p>`;
    }
    return `
      <p class="suave pequeño" style="margin-top:0">Opcional. Se guarda solo en este móvil y nunca sale de él. Pésate siempre a la misma hora, mejor una vez por semana.</p>
      <div class="peso-form">
        <input id="pesoKg" type="text" inputmode="decimal" placeholder="Peso en kg (ej. 72,5)">
        <input id="pesoFecha" type="date" value="${fechaISO()}" max="${fechaISO()}">
        <button class="btn" data-peso-anadir>Añadir</button>
      </div>
      ${cambio}${grafica}
      ${lista.length ? `<ul class="lista-peso">${[...lista].reverse().slice(0, 10).map(p =>
        `<li><span>${fechaBonita(p.f)}</span><span><b>${p.kg.toFixed(1).replace(".", ",")} kg</b> <button data-peso-borrar="${p.f}" aria-label="Borrar">✕</button></span></li>`).join("")}</ul>` : ""}`;
  }

  // ---------- Ajustes ----------
  function pantallaAjustes() {
    $app.innerHTML = `
      <div class="tarjeta">
        <h3>🔒 Tus datos</h3>
        <p>Amazing Tea no tiene cuentas, no usa internet y no envía nada a ningún sitio.
        Tus favoritos, sellos, el reto y el registro de peso se guardan <b>solo en este móvil</b>.</p>
        <p class="suave pequeño">Si desinstalas la app o borras sus datos desde Ajustes de Android, se perderán.</p>
        <button class="btn peligro ancho" data-borrar-todo>Borrar todos mis datos</button>
      </div>
      <div class="tarjeta">
        <h3>⚕️ Aviso de salud</h3>
        <p style="margin-bottom:0">Los usos de cada té e infusión son los tradicionales o populares, no consejos médicos.
        Si tomas medicación, estás embarazada, das el pecho o tienes una enfermedad, consulta antes con tu médico o farmacéutico.</p>
      </div>
      <div class="tarjeta">
        <h3>🍵 Amazing Tea</h3>
        <p style="margin:0" class="suave">Versión 0.1 · ${RECETAS.length} recetas de ${Object.keys(BANDERAS).length} países y regiones.</p>
      </div>`;
  }

  /* ------------------------------------------------------------------ *
   * 5. NAVEGACIÓN                                                       *
   *    Cada pantalla tiene su dirección (#/recetas, #/r/chai-masala…). *
   *    Así el botón "atrás" de Android funciona como se espera.        *
   * ------------------------------------------------------------------ */
  const TITULOS = { inicio: "Amazing Tea", recetas: "Recetas", pasaporte: "Pasaporte", vitalidad: "Vitalidad y peso", ajustes: "Ajustes" };

  function ir(hash) { location.hash = hash; }

  function router() {
    const partes = (location.hash || "#/").slice(2).split("/");
    const ruta = partes[0] || "inicio";
    const id = partes[1];
    if (ruta !== "t") pararTemporizador();

    const pestaña = { r: "recetas", t: "recetas", ajustes: "" }[ruta] ?? ruta;
    document.querySelectorAll(".barra a").forEach(a => a.classList.toggle("activa", a.dataset.tab === pestaña));
    $atras.hidden = !["r", "t", "ajustes"].includes(ruta);
    $titulo.textContent = TITULOS[ruta] || "Amazing Tea";

    if (ruta === "inicio") pantallaInicio();
    else if (ruta === "recetas") pantallaRecetas();
    else if (ruta === "r") pantallaFicha(id);
    else if (ruta === "t") pantallaTemporizador(id);
    else if (ruta === "pasaporte") pantallaPasaporte();
    else if (ruta === "vitalidad") pantallaVitalidad();
    else if (ruta === "ajustes") pantallaAjustes();
    else return ir("#/");
    if (ruta !== "recetas") window.scrollTo(0, 0);
  }

  /* ------------------------------------------------------------------ *
   * 6. BOTONES (un único "escuchador" para toda la app)                 *
   * ------------------------------------------------------------------ */
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-ir],[data-filtro],[data-tipo],[data-toggle],[data-ef],[data-limpiar],[data-quitar-pais],[data-fav],[data-hecha],[data-pausa],[data-pais],[data-reto-empezar],[data-reto-hoy],[data-reto-borrar],[data-peso-anadir],[data-peso-borrar],[data-borrar-todo]");
    if (!b) return;
    const d = b.dataset;

    if (d.ir) return ir(d.ir);

    // Filtros
    if (d.filtro) {
      filtro = Object.assign({ q: "", tipo: "", ef: "", sinCaf: false, fav: false, pais: "" }, JSON.parse(d.filtro));
      return ir("#/recetas");
    }
    if (d.tipo !== undefined) { filtro.tipo = d.tipo; return pantallaRecetas(); }
    if (d.toggle) { filtro[d.toggle] = !filtro[d.toggle]; return pantallaRecetas(); }
    if (d.ef) { filtro.ef = filtro.ef === d.ef ? "" : d.ef; return pantallaRecetas(); }
    if (d.limpiar !== undefined) { filtro = { q: "", tipo: "", ef: "", sinCaf: false, fav: false, pais: "" }; return pantallaRecetas(); }
    if (d.quitarPais !== undefined) { filtro.pais = ""; return pantallaRecetas(); }
    if (d.pais) {
      filtro = { q: "", tipo: "", ef: "", sinCaf: false, fav: false, pais: d.pais };
      return ir("#/recetas");
    }

    // Favoritos y recetas hechas
    if (d.fav) {
      datos.fav = esFav(d.fav) ? datos.fav.filter(x => x !== d.fav) : datos.fav.concat(d.fav);
      guardar();
      aviso(esFav(d.fav) ? "Añadida a favoritos" : "Quitada de favoritos");
      return pantallaFicha(d.fav);
    }
    if (d.hecha) {
      const r = POR_ID[d.hecha];
      const nuevoPais = !paisesSellados().includes(r.p);
      datos.hechas[d.hecha] = (datos.hechas[d.hecha] || 0) + 1;
      guardar();
      aviso(nuevoPais ? `¡Nuevo sello! ${bandera(r.p)} ${r.p}` : "¡Sellado en tu pasaporte!");
      return d.volver ? ir("#/r/" + d.hecha) : pantallaFicha(d.hecha);
    }

    // Temporizador
    if (d.pausa !== undefined && temp) {
      if (temp.pausado) {
        temp.fin = Date.now() + temp.resto; temp.pausado = false;
        b.textContent = "⏸ Pausa"; document.getElementById("respira").classList.remove("parado");
      } else {
        temp.resto = Math.max(0, temp.fin - Date.now()); temp.pausado = true;
        b.textContent = "▶ Seguir"; document.getElementById("respira").classList.add("parado");
      }
      return;
    }

    // Reto
    if (d.retoEmpezar !== undefined) {
      datos.reto = { inicio: fechaISO(), dias: [] }; guardar();
      aviso("¡Reto empezado! Mucho ánimo");
      return pantallaVitalidad();
    }
    if (d.retoHoy !== undefined) {
      const hoy = fechaISO();
      datos.reto.dias = datos.reto.dias.includes(hoy) ? datos.reto.dias.filter(x => x !== hoy) : datos.reto.dias.concat(hoy);
      guardar();
      return pantallaVitalidad();
    }
    if (d.retoBorrar !== undefined) {
      if (confirm("¿Reiniciar el reto? Se borrará el progreso.")) { datos.reto = null; guardar(); pantallaVitalidad(); }
      return;
    }

    // Peso
    if (d.pesoAnadir !== undefined) {
      const kg = parseFloat(String(document.getElementById("pesoKg").value).replace(",", "."));
      const f = document.getElementById("pesoFecha").value || fechaISO();
      if (!(kg >= 20 && kg <= 300)) return aviso("Escribe un peso entre 20 y 300 kg");
      datos.peso = datos.peso.filter(p => p.f !== f).concat({ f, kg: Math.round(kg * 10) / 10 });
      guardar();
      aviso("Peso guardado");
      return pantallaVitalidad();
    }
    if (d.pesoBorrar) {
      datos.peso = datos.peso.filter(p => p.f !== d.pesoBorrar); guardar();
      return pantallaVitalidad();
    }

    // Borrar todo
    if (d.borrarTodo !== undefined) {
      if (confirm("¿Borrar favoritos, sellos, reto y registro de peso? No se puede deshacer.")) {
        datos = VACIO(); guardar(); aviso("Datos borrados"); ir("#/");
      }
    }
  });

  $atras.addEventListener("click", () => { if (history.length > 1) history.back(); else ir("#/"); });
  document.getElementById("btnAjustes").addEventListener("click", () => ir("#/ajustes"));
  window.addEventListener("hashchange", router);
  router();
})();
