/* ==========================================================================
   litttin · CONFIGURACIÓN
   --------------------------------------------------------------------------
   ESTE ES EL ÚNICO ARCHIVO QUE NECESITAS TOCAR.
   Cambia la IP, los textos y tus redes aquí, guarda y recarga la página.
   Todo lo que hay debajo de las comillas se puede editar sin miedo.
   ========================================================================== */

window.LITTTIN_CONFIG = {

  /* ---------- Identidad ---------- */
  brand: "litttin",
  kicker: "Soporte oficial",
  tagline: "Minecraft, YouTube y música. Todo en un solo sitio.",
  intro: "La IP del servidor, mis redes y los enlaces de siempre. Sin registros, sin ruido, sin vueltas.",

  /* ---------- Servidor de Minecraft ---------- */
  server: {
    name: "Servidor de litttin",
    ip: "play.tuservidor.net",   // ←←← CAMBIA ESTO POR TU IP (ej: 123.45.67.89:25565)
    version: "Java 1.21.x",
    bedrockPort: "",             // Si tienes Bedrock pon el puerto aquí (ej: "19132"). Si no, déjalo vacío.
    checkStatus: true            // true = consulta online/offline automáticamente
  },

  /* ---------- Cómo entrar (los pasos que se ven bajo la IP) ---------- */
  steps: [
    { title: "Abre Minecraft", text: "Entra en Multijugador y pulsa «Añadir servidor»." },
    { title: "Pega la IP", text: "Pon la dirección de arriba en el campo Dirección del servidor." },
    { title: "Dale a jugar", text: "Guarda, conéctate y nos vemos dentro." }
  ],

  /* ---------- Dashboard de redes ----------
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
  ],

  /* ---------- Pie de página ---------- */
  footer: {
    text: "Hecho a mano. Sin cookies, sin rastreadores, sin base de datos.",
    repo: ""   // Opcional: "https://github.com/tu-usuario/tu-repo" para mostrar el enlace al código
  }
};
