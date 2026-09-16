/* ==========================================================================
   litttin · app.js
   Pinta los textos desde config.js, genera el dashboard de redes, copia la
   IP, comprueba el estado del servidor y cambia entre los dos temas.
   No hace falta tocar este archivo.
   ========================================================================== */

(function () {
  "use strict";

  var CFG = window.LITTTIN_CONFIG || {};
  var PLACEHOLDER = /tuservidor|ejemplo|example|tu-ip|xxxxxxxx/i;

  /* ---------------- Iconos ---------------- */
  var ICONS = {
    youtube:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M23.5 6.6a3 3 0 0 0-2.1-2.1C19.5 4 12 4 12 4s-7.5 0-9.4.5A3 3 0 0 0 .5 6.6C0 8.5 0 12 0 12s0 3.5.5 5.4a3 3 0 0 0 2.1 2.1C4.5 20 12 20 12 20s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.4.5-5.4s0-3.5-.5-5.4ZM9.6 15.6V8.4L15.9 12l-6.3 3.6Z"/></svg>',
    spotify:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9.6" stroke-width="2"/><path d="M6.9 9.3c3.4-.9 6.9-.5 9.8 1" stroke-width="1.8"/><path d="M7.5 12.6c2.7-.7 5.6-.4 8 .9" stroke-width="1.7"/><path d="M8.2 15.6c2-.5 4.2-.2 6 .9" stroke-width="1.6"/></svg>',
    discord:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M20 5.4A16 16 0 0 0 16 4.2l-.4.9a12 12 0 0 1 3.2 1.5 13 13 0 0 0-11.6 0 12 12 0 0 1 3.2-1.5L10 4.2a16 16 0 0 0-4 1.2C3.3 9.5 2.6 13.6 3 17.7a16 16 0 0 0 4.8 2.4l.7-1.1a10 10 0 0 1-1.7-.8l.4-.3a11.4 11.4 0 0 0 9.6 0l.4.3c-.5.3-1.1.6-1.7.8l.7 1.1a16 16 0 0 0 4.8-2.4c.5-4.8-.6-8.9-3-12.3ZM9 14.3a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6Zm6 0a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6Z"/></svg>',
    twitch:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3.5 2 2 5.7v14.6h5V23l3.2-2.7h4.3L22 13.8V2H3.5Zm16.4 11-3 3h-4.6l-3 2.5V16H5.9V4h14v9Z"/><path fill="currentColor" d="M13.3 6.6h2v5.4h-2zM17.6 6.6h2v5.4h-2z"/></svg>',
    tiktok:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.6 2h-3.1v13.4a2.7 2.7 0 1 1-2.2-2.7V9.5a5.9 5.9 0 1 0 5.3 5.9V9a6.4 6.4 0 0 0 3.8 1.3V7a3.7 3.7 0 0 1-3.8-3.6V2Z"/></svg>',
    x:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.5 3h3.2l-7 8 7.3 10h-5.6l-4.4-6.1L5.8 21H2.6l7.4-8.4L3 3h5.7l4 5.6L17.5 3Zm-1.1 16h1.7L7.7 4.9H5.9L16.4 19Z"/></svg>',
    instagram:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" stroke="none"/></svg>',
    github:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5.5 3.5 12 9 18.5M15 5.5 20.5 12 15 18.5"/></svg>',
    globe:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9.2"/><path d="M2.8 12h18.4M12 2.8c2.6 2.7 4 5.9 4 9.2s-1.4 6.5-4 9.2c-2.6-2.7-4-5.9-4-9.2s1.4-6.5 4-9.2Z"/></svg>'
  };

  var ARROW =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>';

  /* ---------------- Utilidades ---------------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function get(obj, path) {
    return path.split(".").reduce(function (acc, key) {
      return acc == null ? undefined : acc[key];
    }, obj);
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function chanStamp() {
    var d = new Date();
    var days = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
    return pad(d.getDate()) + "/" + pad(d.getMonth() + 1) + "/" + String(d.getFullYear()).slice(2) +
      "(" + days[d.getDay()] + ")" + pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
  }

  var toastTimer;
  function toast(message) {
    var el = $("#toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("is-visible"); }, 2200);
  }

  /* ---------------- Textos desde config.js ---------------- */
  function applyConfig() {
    $$("[data-cfg]").forEach(function (el) {
      var value = get(CFG, el.getAttribute("data-cfg"));
      if (value !== undefined && value !== null) el.textContent = value;
    });
    document.title = (CFG.brand || "litttin") + " — servidor de Minecraft, YouTube y Spotify";
  }

  /* ---------------- Charla del Counter-Strike ---------------- */
  var CS_TAGS = { RADIO: "radio", DEAD: "dead", CT: "ct", T: "t", SERVER: "server" };

  function renderCsChat() {
    var list = $("#csChat");
    if (!list) return;

    var lines = Array.isArray(CFG.csChat) ? CFG.csChat : [];

    list.innerHTML = lines.map(function (line) {
      var tag = String(line.tag || "SERVER").toUpperCase();
      var cls = CS_TAGS[tag] || "server";
      return '<li class="cs-line cs-line--' + cls + '">' +
        '<span class="cs-tag">' + esc(tag) + '</span>' +
        '<span class="cs-text">' + esc(line.text) + '</span>' +
        '</li>';
    }).join("");

    list.hidden = lines.length === 0;
  }

  /* ---------------- El hilo (posts de los usuarios) ---------------- */
  function renderPosts() {
    var host = $("#postList");
    if (!host) return;

    var posts = Array.isArray(CFG.posts) ? CFG.posts : [];

    host.innerHTML = posts.map(function (post, i) {
      var body = String(post.text || "").split("\n").map(function (line) {
        var green = line.trim().charAt(0) === ">";
        return "<p" + (green ? ' class="greentext"' : "") + ">" + esc(line) + "</p>";
      }).join("");

      return '<article class="post">' +
        '<p class="post-header">' +
        '<span class="ph-name">' + esc(post.user) + '</span>' +
        '<span class="ph-date">' + chanStamp() + '</span>' +
        '<span class="ph-no">No.' + (1000100 + i * 13) + '</span>' +
        '</p>' +
        '<div class="post-body">' + body + '</div>' +
        '</article>';
    }).join("");

    host.hidden = posts.length === 0;
  }

  /* ---------------- El Culto Del Toby (redes) ---------------- */
  function renderNetworks() {
    var grid = $("#networkGrid");
    if (!grid) return;

    var nets = (Array.isArray(CFG.networks) ? CFG.networks : []).filter(function (n) {
      return n && n.url;
    });

    grid.innerHTML = nets.map(function (n, i) {
      var icon = ICONS[n.id] || ICONS.globe;
      return '<a class="net-card" id="' + esc(n.id) + '" data-net="' + esc(n.id) + '"' +
        ' href="' + esc(n.url) + '" target="_blank" rel="noopener noreferrer">' +
        '<span class="post-header" aria-hidden="true"><span class="ph-name">Anonymous</span>' +
        '<span class="ph-date">' + chanStamp() + '</span>' +
        '<span class="ph-no">No.' + (1000001 + i * 137) + '</span></span>' +
        '<span class="net-icon">' + icon + '</span>' +
        '<span class="net-body">' +
        '<span class="net-name">' + esc(n.name) + '</span>' +
        '<span class="net-handle">' + esc(n.handle || "") + '</span>' +
        '<span class="net-desc">' + esc(n.description || "") + '</span>' +
        '</span>' +
        '<span class="net-cta">' + esc(n.cta || "Abrir") + ARROW + '</span>' +
        '</a>';
    }).join("");

    if (!nets.length) {
      grid.innerHTML = '<p class="empty">Todavía no hay redes. Añádelas en el archivo <code>config.js</code>.</p>';
    }

    /* Los enlaces del menú (YouTube / Spotify...) apuntan a su tarjeta.
       Si una red no existe en config.js, el enlace se oculta. */
    $$("[data-nav-net]").forEach(function (link) {
      var id = link.getAttribute("data-nav-net");
      var exists = nets.some(function (n) { return String(n.id) === id; });
      if (exists) link.setAttribute("href", "#" + id);
      else link.hidden = true;
    });
  }

  /* ---------------- Copiar la IP ---------------- */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy") ? resolve() : reject(new Error("copy failed"));
      } catch (err) {
        reject(err);
      } finally {
        document.body.removeChild(ta);
      }
    });
  }

  function setupCopy() {
    var ipEl = $("#serverIp");
    var btn = $("#copyIp");
    if (!ipEl) return;

    function doCopy() {
      var ip = (CFG.server && CFG.server.ip) || ipEl.textContent;
      copyText(String(ip).trim())
        .then(function () { toast("IP copiada: " + ip); })
        .catch(function () { toast("Copia manual: " + ip); });
    }

    if (btn) btn.addEventListener("click", doCopy);
    ipEl.addEventListener("click", doCopy);
    ipEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); doCopy(); }
    });
  }

  /* ---------------- Estado del servidor ---------------- */
  function setState(state, text, players) {
    var box = $("#serverStatus");
    if (!box) return;

    box.hidden = false;
    box.setAttribute("data-state", state);

    var label = $("[data-status-text]", box);
    if (label) label.textContent = text;

    var playersEl = $(".server-players");
    if (playersEl) {
      if (players) {
        playersEl.textContent = players.online + "/" + players.max + " jugando";
        playersEl.hidden = false;
      } else {
        playersEl.hidden = true;
      }
    }
  }

  /* Si la IP todavía es la de ejemplo, la línea de estado no se muestra. */
  function hideStatus() {
    var box = $("#serverStatus");
    if (box) box.hidden = true;
  }

  function checkStatus() {
    var server = CFG.server || {};
    var ip = String(server.ip || "").trim();
    var btn = $("#refreshStatus");

    if (!ip || PLACEHOLDER.test(ip)) {
      hideStatus();
      return Promise.resolve();
    }
    if (server.checkStatus === false) {
      setState("", "Servidor: " + ip, null);
      return Promise.resolve();
    }

    setState("checking", "Comprobando estado…", null);
    if (btn) btn.classList.add("is-spinning");

    var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = setTimeout(function () { if (controller) controller.abort(); }, 9000);

    return fetch("https://api.mcsrvstat.us/3/" + ip.replace(/\s+/g, ""), controller ? { signal: controller.signal } : undefined)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (!data || data.online !== true) {
          setState("offline", "Servidor caído o en mantenimiento", null);
          return;
        }
        var version = data.version || (server.version || "");
        setState("online", "Online · " + version, data.players);
        var motd = data.motd && data.motd.clean ? data.motd.clean.join(" ").trim() : "";
        var motdEl = $("#serverMotd");
        if (motdEl) {
          motdEl.textContent = motd.slice(0, 90);
          motdEl.hidden = !motd;
        }
      })
      .catch(function () {
        setState("", "No se pudo comprobar el estado (revisa la IP o inténtalo de nuevo)", null);
      })
      .then(function () {
        clearTimeout(timer);
        if (btn) btn.classList.remove("is-spinning");
      });
  }

  function setupBedrock() {
    var server = CFG.server || {};
    var box = $("[data-bedrock]");
    if (!box || !server.bedrockPort) return;
    var code = $("[data-bedrock-ip]", box);
    if (code) code.textContent = server.ip + ":" + server.bedrockPort;
    box.hidden = false;
  }

  /* ---------------- Fechas de los encabezados de post ---------------- */
  function stampPosts() {
    $$("[data-post-date]").forEach(function (el) { el.textContent = chanStamp(); });
  }

  /* ---------------- Pétalos de sakura ---------------- */
  function setupPetals() {
    var host = $("#petals");
    if (!host) return;

    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { host.hidden = true; return; }

    var count = window.innerWidth < 720 ? 8 : (window.innerWidth < 1200 ? 12 : 18);
    var html = "";

    for (var i = 0; i < count; i++) {
      var size = 7 + Math.random() * 11;
      var left = (i * 100 / count) + (Math.random() * 8 - 4);
      var dur = 13 + Math.random() * 15;
      var delay = -Math.random() * dur;
      var drift = 40 + Math.random() * 140;
      var spin = 260 + Math.random() * 420;
      var sway = 18 + Math.random() * 46;

      html += '<span class="petal" style="' +
        "left:" + left.toFixed(2) + "%;" +
        "width:" + size.toFixed(1) + "px;" +
        "height:" + (size * 0.82).toFixed(1) + "px;" +
        "animation-duration:" + dur.toFixed(1) + "s;" +
        "animation-delay:" + delay.toFixed(1) + "s;" +
        "--drift:" + drift.toFixed(0) + "px;" +
        "--spin:" + spin.toFixed(0) + "deg;" +
        "--sway:" + sway.toFixed(0) + "px;" +
        "--sway-dur:" + (2.8 + Math.random() * 2.6).toFixed(1) + "s" +
        '"><i></i></span>';
    }

    host.innerHTML = html;
  }

  /* ---------------- Frase con sello propio ---------------- */
  function setupMotto() {
    var motto = String(CFG.motto || "").trim();
    var sticker = $(".motto");
    var strip = $("#mottoStrip");
    var track = $("#mottoTrack");

    if (!motto) return;

    if (sticker) sticker.hidden = false;

    if (strip && track) {
      var block = "";
      for (var i = 0; i < 12; i++) block += "<span>" + esc(motto) + "</span>";
      /* El contenido va duplicado: la animación mueve el track al 50% y el bucle no corta. */
      track.innerHTML = block + block;
      strip.hidden = false;
    }
  }

  /* ---------------- Sombra de la barra al hacer scroll ---------------- */
  function setupTopbar() {
    var bar = $("#topbar");
    if (!bar) return;
    var onScroll = function () {
      bar.style.boxShadow = window.scrollY > 8 ? "0 1px 24px rgba(0,0,0,.28)" : "none";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------------- Arranque ---------------- */
  function init() {
    applyConfig();
    renderCsChat();
    renderPosts();
    renderNetworks();
    setupCopy();
    setupBedrock();
    setupTopbar();
    stampPosts();
    setupPetals();
    setupMotto();

    var refresh = $("#refreshStatus");
    if (refresh) refresh.addEventListener("click", function () { checkStatus(); });
    checkStatus();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
