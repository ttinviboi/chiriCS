/* ==========================================================================
   litttin · CONFIGURACIÓN
   --------------------------------------------------------------------------
   ESTE ES EL ÚNICO ARCHIVO QUE NECESITAS TOCAR.
   Cambia la IP, los textos y tus redes aquí, guarda y recarga la página.
   Todo lo que hay debajo de las comillas se puede editar sin miedo.
   ========================================================================== */

window.LITTTIN_CONFIG = {

  /* ---------- Identidad ---------- */
  kicker: "Seguidor del Culto Del Toby",
  intro: "La IP del servidor, mis redes y los enlaces de siempre. Sin registros, sin ruido, sin vueltas.",

  /* Frase con sello propio: sale como pegatina en el hero y en la cinta de abajo.
     Si la dejas vacía ("") desaparecen las dos. */
  motto: "cocino la chiri",

  /* ---------- Servidor de Minecraft ---------- */
  server: {
    name: "Servidor de litttin",
    ip: "play.tuservidor.net",   // ←←← CAMBIA ESTO POR TU IP (ej: 123.45.67.89:25565)
    version: "Java 1.21.x",
    bedrockPort: "",             // Si tienes Bedrock pon el puerto aquí (ej: "19132"). Si no, déjalo vacío.
    checkStatus: true            // true = consulta online/offline automáticamente
  },

  /* ---------- El hilo: posts de los del culto ----------
     Cada post es { user, text }. Si una línea del texto empieza con ">"
     se pinta en verde, como en los imageboards. */
  posts: [
    { user: "lacto", text: "banco el server, banco el dust2, banco todo" },
    { user: "cr0hno", text: ">cambiar el nick a cr0hno\n>entrar a dust2\n>morir en 4 segundos\n>gg" },
    { user: "remiinis", text: "el que dice rush B y se queda en el spawn no cuenta" },
    { user: "lacto", text: "el awp del que campea no se toca, banco" },
    { user: "remiinis", text: ">comprar awp\n>fallar los 3 tiros\n>morir con cuchillo" }
  ],

  /* ---------- Referencias del Counter-Strike ----------
     Sustituyen a los chips de IP y versión del hero. El "tag" le da el color
     de la consola: RADIO, DEAD, CT, T o SERVER. */
  csChat: [
    { tag: "SERVER", text: "de_dust2 · 24/7" },
    { tag: "RADIO", text: "Go go go!" },
    { tag: "RADIO", text: "Rush B, no stop" },
    { tag: "T", text: "Eco round, no compres" },
    { tag: "RADIO", text: "Enemy spotted" },
    { tag: "DEAD", text: "gg, ya fue" },
    { tag: "RADIO", text: "Fire in the hole!" },
    { tag: "SERVER", text: "Bomb has been planted" }
  ],

  /* ---------- El Culto Del Toby (dashboard de redes) ----------
     Para añadir una red: copia una línea de abajo, cambia los datos y quita las //.
     Iconos disponibles: youtube, spotify, discord, tiktok, twitch, x, instagram, github.
     Si pones uno que no existe, se usa un globo por defecto. */
  networks: [
    {
      id: "youtube",
      name: "YouTube",
      handle: "@litttin",
      description: "Vídeos, directos y clips del server.",
      url: "https://www.youtube.com/@litttin",
      cta: "Ver canal"
    },
    {
      id: "spotify",
      name: "Spotify",
      handle: "litttin",
      description: "Mis playlists y lo que se escucha en directo.",
      url: "https://open.spotify.com/user/21qtzdifs5uvqoiujqji4246q",
      cta: "Abrir perfil"
    }

    /* Ejemplos listos para rellenar:
    ,{ id:"discord",   name:"Discord",   handle:"litttin", description:"La comunidad del servidor.", url:"https://discord.gg/XXXXXXXX", cta:"Unirse" }
    ,{ id:"twitch",    name:"Twitch",    handle:"litttin", description:"Directos en vivo.",           url:"https://www.twitch.tv/litttin", cta:"Ver directo" }
    ,{ id:"tiktok",    name:"TikTok",    handle:"@litttin", description:"Clips cortos.",                url:"https://www.tiktok.com/@litttin", cta:"Ver clips" }
    ,{ id:"x",         name:"X",         handle:"@litttin", description:"Avisos y novedades.",          url:"https://x.com/litttin", cta:"Seguir" }
    ,{ id:"instagram", name:"Instagram", handle:"@litttin", description:"Fotos y día a día.",           url:"https://instagram.com/litttin", cta:"Ver perfil" }
    ,{ id:"github",    name:"GitHub",    handle:"litttin", description:"Código y proyectos.",          url:"https://github.com/litttin", cta:"Ver repos" }
    */
  ]
};
