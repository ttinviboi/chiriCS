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

      var file = "";
      if (post.img) {
        var name = String(post.img).split("/").pop();
        file = '<p class="post-file">File: <span class="post-file-name">' + esc(name) + '</span>' +
          (post.imgMeta ? ' <span class="post-file-meta">' + esc(post.imgMeta) + '</span>' : '') +
          '</p>' +
          '<a class="post-img" href="' + esc(post.img) + '" target="_blank" rel="noopener noreferrer">' +
          '<img src="' + esc(post.img) + '" alt="' + esc(post.imgAlt || name) + '" loading="lazy" decoding="async">' +
          '</a>';
      }

      return '<article class="post' + (post.img ? ' post--with-file' : '') + '">' +
        file +
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

  /* ---------------- Monumentos de la chiri ---------------- */
  function renderMonuments() {
    var host = $("#monumentList");
    if (!host) return;

    var items = Array.isArray(CFG.monuments) ? CFG.monuments : [];

    host.innerHTML = items.map(function (m) {
      var name = String(m.img || "").split("/").pop();
      var text = m.text ? '<p class="monument-text">' + esc(m.text).replace(/\n/g, "<br>") + "</p>" : "";
      return '<figure class="monument">' +
        '<a class="monument-img" href="' + esc(m.img) + '" target="_blank" rel="noopener noreferrer">' +
        '<img src="' + esc(m.img) + '" alt="' + esc(m.alt || name) + '" loading="lazy" decoding="async">' +
        '</a>' +
        '<figcaption class="monument-cap">' +
        '<span class="monument-name">' + esc(m.title || name) + '</span>' +
        (m.meta ? ' <span class="monument-meta">' + esc(m.meta) + '</span>' : '') +
        text +
        '</figcaption>' +
        '</figure>';
    }).join("");

    if (!items.length) {
      host.innerHTML = '<p class="empty">Todavía no hay monumentos. Añádelos en el archivo <code>config.js</code>.</p>';
    }
  }

  /* ---------------- El Culto De Chiri (redes) ---------------- */
  function getNets() {
    return (Array.isArray(CFG.networks) ? CFG.networks : []).filter(function (n) {
      return n && n.url;
    });
  }

  function netCardHTML(n, i) {
    var icon = ICONS[n.id] || ICONS.globe;
    return '<a class="net-card" data-net="' + esc(n.id) + '"' +
      ' href="' + esc(n.url) + '" target="_blank" rel="noopener noreferrer">' +
      '<span class="post-header" aria-hidden="true"><span class="ph-name">Anonymous</span>' +
      '<span class="ph-date">' + chanStamp() + '</span>' +
      '<span class="ph-no">No.' + (1000001 + (i || 0) * 137) + '</span></span>' +
      '<span class="net-icon">' + icon + '</span>' +
      '<span class="net-body">' +
      '<span class="net-name">' + esc(n.name) + '</span>' +
      '<span class="net-handle">' + esc(n.handle || "") + '</span>' +
      '<span class="net-desc">' + esc(n.description || "") + '</span>' +
      '</span>' +
      '<span class="net-cta">' + esc(n.cta || "Abrir") + ARROW + '</span>' +
      '</a>';
  }

  function renderNetworks() {
    var grid = $("#networkGrid");
    if (!grid) return;

    var nets = getNets();
    grid.innerHTML = nets.map(netCardHTML).join("");

    if (!nets.length) {
      grid.innerHTML = '<p class="empty">Todavía no hay redes. Añádelas en el archivo <code>config.js</code>.</p>';
    }
  }

  /* Cada pestaña con data-featured-net muestra su propia tarjeta.
     Si la red no existe en config.js, se oculta la pestaña. */
  function renderFeatured() {
    var nets = getNets();

    $$("[data-featured-net]").forEach(function (host) {
      var id = host.getAttribute("data-featured-net");
      var idx = -1;
      var net = null;

      nets.forEach(function (n, i) {
        if (String(n.id) === id) { net = n; idx = i; }
      });

      if (!net) {
        var tab = $('[data-tab="' + id + '"]');
        if (tab) tab.hidden = true;
        var panel = $('[data-panel="' + id + '"]');
        if (panel) panel.hidden = true;
        host.innerHTML = "";
        return;
      }

      host.innerHTML = netCardHTML(net, idx);
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

    var count = window.innerWidth < 720 ? 16 : (window.innerWidth < 1200 ? 26 : 38);
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

  /* ---------------- En vivo: Discord + Lanyard ----------------
     Lee la presencia pública (juegos, Spotify, directos) desde
     https://api.lanyard.rest y la pinta en el hero y en las pestañas. */
  var LANYARD_API = "https://api.lanyard.rest/v1/users/";
  var LANYARD_SOCKET = "wss://api.lanyard.rest/socket";
  var spotifyTimes = null;

  function fmtClock(ms) {
    var total = Math.max(0, Math.floor(ms / 1000));
    var m = Math.floor(total / 60);
    var s = total % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  function avatarUrl(user) {
    if (user && user.avatar) {
      return "https://cdn.discordapp.com/avatars/" + user.id + "/" + user.avatar + ".png?size=80";
    }
    return "https://cdn.discordapp.com/embed/avatars/0.png";
  }

  function activityImage(act) {
    var img = (act.assets && act.assets.large_image) || "";
    if (!img) return "";
    if (img.indexOf("mp:") === 0) return "https://media.discordapp.net/" + img.slice(3);
    if (img.indexOf("spotify:") === 0) return "https://i.scdn.co/image/" + img.slice(8);
    if (act.application_id) {
      return "https://cdn.discordapp.com/app-assets/" + act.application_id + "/" + img + ".png";
    }
    return "";
  }

  function isYouTube(act) {
    return /youtube/i.test(act.name || "") || /youtube/i.test(act.details || "");
  }

  function updateProgress() {
    var bar = $("[data-live-progress]");
    if (!bar || !spotifyTimes || !spotifyTimes.start || !spotifyTimes.end) return;
    var total = spotifyTimes.end - spotifyTimes.start;
    var done = Date.now() - spotifyTimes.start;
    var pct = Math.max(0, Math.min(100, (done / total) * 100));
    bar.style.width = pct.toFixed(2) + "%";
    var el = $("[data-live-elapsed]");
    if (el) el.textContent = fmtClock(done);
    var tt = $("[data-live-total]");
    if (tt) tt.textContent = fmtClock(total);
  }

  function renderLiveBar(data) {
    var bar = $("#liveBar");
    if (!bar) return;

    if (!data) {
      bar.hidden = false;
      bar.innerHTML = '<span class="live-dot" data-state="offline"></span>' +
        '<span class="live-text">En vivo no disponible</span>';
      return;
    }

    var user = data.discord_user || {};
    var status = data.discord_status || "offline";
    var acts = Array.isArray(data.activities) ? data.activities : [];
    var streaming = acts.filter(function (a) { return a.type === 1; })[0];
    var playing = acts.filter(function (a) { return a.type === 0 && !isYouTube(a) && a.name !== "Spotify"; })[0];
    var watching = acts.filter(function (a) { return a.type === 3; })[0];
    var spotify = data.listening_to_spotify && data.spotify ? data.spotify : null;

    var state = status;
    var label = "Conectado a Discord";

    if (streaming) { state = "streaming"; label = "En directo: " + (streaming.details || streaming.name); }
    else if (spotify) { state = "music"; label = "Escuchando: " + spotify.song + " — " + spotify.artist; }
    else if (playing) { state = "playing"; label = "Jugando: " + playing.name; }
    else if (watching) { state = "watching"; label = "Viendo: " + watching.name; }
    else if (status === "offline") { state = "offline"; label = "Desconectado"; }
    else if (status === "idle") { label = "Ausente"; }
    else if (status === "dnd") { label = "No molestar"; }

    bar.hidden = false;
    bar.innerHTML =
      '<span class="live-avatar"><img src="' + esc(avatarUrl(user)) + '" alt="" loading="lazy" decoding="async"></span>' +
      '<span class="live-dot" data-state="' + esc(state) + '"></span>' +
      '<span class="live-text">' + esc(label) + '</span>' +
      '<a class="live-link" href="https://discord.com/users/' + esc(user.id || "") + '" target="_blank" rel="noopener noreferrer">@' + esc(user.username || "yo") + '</a>';
  }

  var liveMusicKey = null;

  function renderLiveMusic(data) {
    var box = $("#liveMusic");
    if (!box) return;

    var spotify = data && data.listening_to_spotify && data.spotify ? data.spotify : null;
    var key = spotify ? String(spotify.track_id) : "";
    box.hidden = false;

    /* Si suena la misma canción, no se reconstruye nada: así el reproductor
       embebido no se reinicia cuando llega el siguiente refresco. */
    if (key === liveMusicKey) {
      if (spotify) { spotifyTimes = spotify.timestamps || spotifyTimes; updateProgress(); }
      return;
    }
    liveMusicKey = key;

    if (!spotify) {
      spotifyTimes = null;
      box.innerHTML = '<p class="np-empty">Ahora mismo no estoy escuchando música en Spotify.</p>';
      return;
    }

    spotifyTimes = spotify.timestamps || null;
    box.innerHTML =
      '<div class="np np--stack">' +
      '<div class="np-top">' +
      '<a class="np-art" href="https://open.spotify.com/track/' + esc(spotify.track_id) + '" target="_blank" rel="noopener noreferrer">' +
      '<img src="' + esc(spotify.album_art_url) + '" alt="' + esc(spotify.album || "") + '" loading="lazy" decoding="async">' +
      '</a>' +
      '<div class="np-info">' +
      '<p class="np-kicker">Escuchando ahora en Spotify</p>' +
      '<p class="np-title">' + esc(spotify.song) + '</p>' +
      '<p class="np-artist">' + esc(spotify.artist) + '</p>' +
      (spotify.album ? '<p class="np-album">' + esc(spotify.album) + '</p>' : '') +
      '<div class="np-progress"><span data-live-progress></span></div>' +
      '<p class="np-times"><span data-live-elapsed>0:00</span><span data-live-total>0:00</span></p>' +
      '</div>' +
      '</div>' +
      '<iframe class="np-embed" src="https://open.spotify.com/embed/track/' + esc(spotify.track_id) + '?utm_source=generator&theme=0" width="100%" height="80" frameborder="0" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" title="Reproductor de Spotify"></iframe>' +
      '</div>';
    updateProgress();
  }

  function renderLiveYoutube(data) {
    var box = $("#liveYoutube");
    if (!box) return;

    var acts = data && Array.isArray(data.activities) ? data.activities : [];
    var streaming = acts.filter(function (a) { return a.type === 1; })[0];
    var yt = acts.filter(isYouTube)[0];
    var act = streaming || yt;
    box.hidden = false;

    if (!act) {
      var playing = acts.filter(function (a) { return a.type === 0 && a.name !== "Spotify"; })[0];
      box.innerHTML = '<p class="np-empty">' +
        (playing ? "Ahora mismo estoy jugando a " + esc(playing.name) + ", no estoy en YouTube."
                 : "Ahora mismo no estoy en YouTube.") + '</p>';
      return;
    }

    var img = activityImage(act);
    box.innerHTML =
      '<div class="np">' +
      (img ? '<span class="np-art"><img src="' + esc(img) + '" alt="" loading="lazy" decoding="async"></span>' : '') +
      '<div class="np-info">' +
      '<p class="np-kicker">' + (act.type === 1 ? "En directo" : "Viendo YouTube") + '</p>' +
      '<p class="np-title">' + esc(act.details || act.name) + '</p>' +
      (act.state ? '<p class="np-artist">' + esc(act.state) + '</p>' : '') +
      (act.url ? '<p class="np-album"><a href="' + esc(act.url) + '" target="_blank" rel="noopener noreferrer">Abrir en YouTube →</a></p>' : '') +
      '</div>' +
      '</div>';
  }

  function renderLive(data) {
    renderLiveBar(data);
    renderLiveMusic(data);
    renderLiveYoutube(data);

    /* El ecualizador se anima más fuerte cuando hay algo sonando */
    var acts = data && Array.isArray(data.activities) ? data.activities : [];
    document.documentElement.classList.toggle(
      "is-playing",
      !!(data && (data.listening_to_spotify || acts.length))
    );
  }

  function setupLive() {
    var live = CFG.live || {};
    var id = String(live.discordId || "").trim();
    if (!id || live.enabled === false) return;

    var pollMs = Math.max(10, Number(live.pollSeconds) || 20) * 1000;
    var timer = null;
    var socket = null;
    var heartbeat = null;
    var socketOk = false;

    /* Respaldo: se consulta la API si no hay WebSocket (o mientras conecta). */
    function tick() {
      fetch(LANYARD_API + encodeURIComponent(id))
        .then(function (res) { return res.json(); })
        .then(function (json) {
          renderLive(json && json.success === true ? json.data : null);
        })
        .catch(function () { if (!socketOk) renderLive(null); });
    }

    function startPolling() {
      if (timer) return;
      tick();
      timer = setInterval(tick, pollMs);
    }
    function stopPolling() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    /* WebSocket de Lanyard: los cambios llegan al instante (canción nueva,
       pausa, cambio de juego…) sin esperar al siguiente refresco. */
    function connectSocket() {
      if (typeof WebSocket === "undefined") { startPolling(); return; }

      try { socket = new WebSocket(LANYARD_SOCKET); }
      catch (err) { startPolling(); return; }

      socket.onmessage = function (event) {
        var msg;
        try { msg = JSON.parse(event.data); } catch (err) { return; }

        if (msg.op === 1) {
          socketOk = true;
          stopPolling();
          if (heartbeat) clearInterval(heartbeat);
          heartbeat = setInterval(function () {
            if (socket && socket.readyState === 1) socket.send(JSON.stringify({ op: 3 }));
          }, msg.d.heartbeat_interval);
          socket.send(JSON.stringify({ op: 2, d: { subscribe_to_id: id } }));
          return;
        }

        if (msg.op === 0) {
          var d = msg.d;
          if (msg.t === "INIT_STATE" && d) {
            var presence = null;
            if (d.discord_user) presence = d;
            else {
              for (var k in d) {
                if (Object.prototype.hasOwnProperty.call(d, k)) { presence = d[k]; break; }
              }
            }
            if (presence) renderLive(presence);
          } else if (msg.t === "PRESENCE_UPDATE" && d) {
            renderLive(d);
          }
        }
      };

      socket.onerror = function () { socketOk = false; startPolling(); };

      socket.onclose = function () {
        socketOk = false;
        if (heartbeat) { clearInterval(heartbeat); heartbeat = null; }
        startPolling();
        setTimeout(connectSocket, 10000);   // reintenta el socket
      };
    }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stopPolling();
      else if (socketOk) tick();
      else startPolling();
    });

    connectSocket();
    startPolling();                 // primer pintado inmediato + respaldo
    setInterval(updateProgress, 1000);
  }

  /* ---------------- Ventanas, ecualizador, movimiento e imágenes ---------------- */
  function setupEq() {
    $$(".eq").forEach(function (host) {
      if (host.childElementCount) return;
      var n = host.classList.contains("eq--mini") ? 16 : 36;
      var html = "";
      for (var i = 0; i < n; i++) {
        var dur = (0.55 + Math.random() * 0.9).toFixed(2);
        var delay = (-Math.random() * 1.2).toFixed(2);
        html += '<span style="animation-duration:' + dur + 's;animation-delay:' + delay + 's"></span>';
      }
      host.innerHTML = html;
    });
  }

  function setupWindows() {
    $$("[data-collapse]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var win = btn.closest(".win");
        if (win) win.classList.toggle("is-collapsed");
      });
    });
  }

  /* Las imágenes decorativas son opcionales: si no están, se ocultan solas. */
  function setupDeco() {
    var deco = CFG.deco || {};

    /* Banner de arriba: alterna entre los gifs (clic para pasar al siguiente). */
    var gif = $("#gifImg");
    var banner = $("#gifBanner");
    var list = Array.isArray(deco.gifs) ? deco.gifs.slice() : (deco.gif ? [deco.gif] : []);

    if (gif && list.length) {
      var idx = 0;
      gif.addEventListener("load", function () { if (banner) banner.hidden = false; });
      gif.addEventListener("error", function () { if (banner) banner.hidden = true; });
      gif.src = list[0];

      var next = function () {
        idx = (idx + 1) % list.length;
        gif.src = list[idx];
      };

      if (list.length > 1) {
        setInterval(next, Math.max(2, Number(deco.rotateSeconds) || 7) * 1000);
        if (banner) banner.addEventListener("click", next);
      }
    }

    function optional(selector, src) {
      var img = $(selector);
      if (!img || !src) return;
      img.hidden = true;
      img.addEventListener("load", function () { img.hidden = false; });
      img.addEventListener("error", function () { img.remove(); });
      img.src = src;
    }

    optional("#chibiImg", deco.chibi);
    optional("#profileChibi", deco.chibiProfile);
  }

  function renderProfile() {
    var p = CFG.profile || {};
    var ig = $("#profileIg");
    if (!ig) return;
    ig.setAttribute("href", p.instagramUrl || "#");
    var handle = $(".ig-handle", ig);
    if (handle) handle.textContent = p.instagram || "@tu_instagram";
  }

  /* ---------------- Pestañas: cada una con su apartado ---------------- */
  function setupTabs() {
    var tabs = $$("[data-tab]");
    if (!tabs.length) return;

    function activate(id, scroll) {
      var exists = tabs.some(function (t) { return t.getAttribute("data-tab") === id; });
      if (!exists) id = tabs[0].getAttribute("data-tab");

      tabs.forEach(function (t) {
        var on = t.getAttribute("data-tab") === id;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        if (on) {
          var wt = $("#winTitle");
          if (wt) wt.textContent = t.textContent.trim();
        }
      });

      var active = null;
      $$("[data-panel]").forEach(function (p) {
        var on = p.getAttribute("data-panel") === id;
        p.hidden = !on;
        if (on) active = p;
      });

      if (location.hash.slice(1) !== id) {
        history.replaceState(null, "", "#" + id);
      }

      if (scroll && active) {
        var top = active.getBoundingClientRect().top + window.scrollY - 56;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      }
    }

    tabs.forEach(function (t) {
      t.addEventListener("click", function (e) {
        e.preventDefault();
        activate(t.getAttribute("data-tab"), true);
      });
      t.addEventListener("keydown", function (e) {
        var dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!dir) return;
        e.preventDefault();
        var i = tabs.indexOf(t);
        var next = tabs[(i + dir + tabs.length) % tabs.length];
        next.focus();
        activate(next.getAttribute("data-tab"), false);
      });
    });

    /* Los botones del hero (Entrar al servidor / Ver mis redes) también cambian de pestaña. */
    $$('a[href^="#"]').forEach(function (a) {
      if (a.hasAttribute("data-tab")) return;
      var id = a.getAttribute("href").slice(1);
      if (!tabs.some(function (t) { return t.getAttribute("data-tab") === id; })) return;
      a.addEventListener("click", function (e) {
        e.preventDefault();
        activate(id, true);
      });
    });

    activate(location.hash.slice(1) || tabs[0].getAttribute("data-tab"), false);
    window.addEventListener("hashchange", function () {
      activate(location.hash.slice(1) || tabs[0].getAttribute("data-tab"), false);
    });
  }

  /* ---------------- Arranque ---------------- */
  function init() {
    applyConfig();
    renderCsChat();
    renderPosts();
    renderMonuments();
    renderNetworks();
    renderFeatured();
    setupTabs();
    setupLive();
    setupWindows();
    setupEq();
    setupDeco();
    renderProfile();
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
