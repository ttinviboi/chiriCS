/* ==========================================================================
   litttin · CONFIGURACIÓN
   --------------------------------------------------------------------------
   ESTE ES EL ÚNICO ARCHIVO QUE NECESITAS TOCAR.
   Cambia la IP, los textos y tus redes aquí, guarda y recarga la página.
   Todo lo que hay debajo de las comillas se puede editar sin miedo.
   ========================================================================== */

window.LITTTIN_CONFIG = {

  /* ---------- Identidad ---------- */
  kicker: "Seguidor de El Culto De Chiri",
  intro: "La IP del servidor, mis redes y los enlaces de siempre. Sin registros, sin ruido, sin vueltas.",

  /* Frase con sello propio: sale como pegatina en el hero y en la cinta de abajo.
     Si la dejas vacía ("") desaparecen las dos. */
  motto: "cocino la chiri",

  /* ---------- Servidor de Minecraft ---------- */
  server: {
    name: "El Living de la chiri",
    ip: "play.tuservidor.net",   // ←←← CAMBIA ESTO POR TU IP (ej: 123.45.67.89:25565)
    version: "Java 1.21.x",
    bedrockPort: "",             // Si tienes Bedrock pon el puerto aquí (ej: "19132"). Si no, déjalo vacío.
    checkStatus: true            // true = consulta online/offline automáticamente
  },

  /* ---------- El hilo: posts de los del culto ----------
     Cada post es { user, text }. Si una línea del texto empieza con ">"
     se pinta en verde, como en los imageboards.

     Para publicar una imagen (estilo 4chan) añade la clave "img" con la ruta
     del archivo dentro de la web. Opcional: "imgMeta" con el tamaño que sale
     en la cabecera del archivo y "imgAlt" con el texto alternativo.
     Ejemplo: { user: "anonymous", img: "assets/img/mi-foto.jpg", text: "..." } */
  posts: [
    { user: "lacto", text: ">entrar al living de la chiri\n>no hay nadie\n>la chiri está afk\n>igual me quedo a webear un rato\n>buena comunidad la del culto, wn" },
    { user: "cr0hno", text: ">de_mirage 24/7\n>compro AWP como FalleN\n>me cruzan por mid\n>muero sin apretar el gatillo\n>200 de ping al server de Sao Paulo\n>culpa del ping, nunca mía" },
    { user: "Dem", text: "el que grita 'rush B' y se queda campeando en spawn con la AWP merece ban de la comunidad, po" },
    { user: "remiinis", text: ">mirar el clip de coldzera en Mirage\n>intentar el jumping AWP\n>caer al vacío con el cuchillo afuera\n>el team me reporta por trolo\n>gg, ya fue po" },
    { user: "KaspitalSin", text: ">intentando Bloodbath en modo práctica\n>llego al 97%\n>me mato en el último spike\n>cierro el juego\n>lo abro a los 5 minutos otra vez\n>es un vicio, no tengo remedio" },
    { user: "Anonymous", text: ">creo un nivel en Geometry Dash\n>lo verifico con harta paciencia\n>me lo pasan en el primer intento\n>lo nerfean porque 'está muy fácil'\n>ahora nadie lo aprueba\n>el GD y sus dramas, wn" },
    { user: "remiinis", text: ">esperar el update 2.2 de Geometry Dash\n>años esperando\n>por fin sale\n>ahora toca esperar el 2.3\n>el GD y el Half-Life 3 compitiendo a ver quién se demora más" },
    { user: "Anonymous", text: ">comentar 'el que lee es weón' en Instagram Chile\n>me responden como 300 personas\n>una tía me manda la cadenita de los buenos días\n>me llega el aviso de cuenta restringida\n>el algoritmo me tiene de punto, cachai" },
    { user: "Dem", text: "resumen de Instagram Chile: mitad memes robados sin crédito, mitad reels de señoras bailando mal. y el comentario fijo de siempre: 'sígueme y te sigo'" },
    { user: "lacto", text: ">subo el clip del ace en Mirage\n>4 likes\n>subo una foto de la once\n>300 likes\n>IG Chile tiene las prioridades claras, po" },
    { user: "checopete", text: ">entrar a la soloq\n>me toca autofill jungla\n>me acuerdo del corxea\n>me convenzo de que soy el mejor jungla de Chile\n>no gankeo ni una línea\n>0/9 al minuto 20\n>ff 15, ya fue" },
    { user: "checopete", text: ">el corxea dice que es winnable\n>vamos 5 kills a 28\n>el nexo ya está en llamas\n>'confía en el late game'\n>confío\n>perdemos en 3 minutos\n>gracias, corxea" },
    { user: "checopete", text: "el LoL es el único juego donde el jungla te dice 'estoy farmeando' por 30 minutos y tú lo dejas pasar, po. puro corxea mental, wn" },
    { user: "checopete", text: ">buscar duo rankeds en LAS\n>'soy main jungla, nivel challenger'\n>es un smurf que feedea y culpa al ping\n>el corxea tiene como 5 cuentas y todas baneadas" }
  ],

  /* ---------- Monumentos de la chiri ----------
     Las reliquias del culto. Cada entrada es { img, title, text }.
     Opcional: "meta" con el peso/tamaño que sale junto al título y "alt"
     con el texto alternativo de la imagen. */
  monuments: [
    {
      img: "assets/img/gato-1.jpg",
      title: "La chiri mira fijo",
      meta: "(86 KB, 608x1080)",
      alt: "Gato mirando fijo a la cámara",
      text: "No pestañea hasta que ganes el eco round."
    },
    {
      img: "assets/img/gato-2.jpg",
      title: "La chiri reacciona",
      meta: "(74 KB, 608x1080)",
      alt: "Gato sorprendido con los ojos muy abiertos",
      text: "Cara de la chiri cuando ganamos con pistolas."
    },
    {
      img: "assets/img/monumento-1.jpg",
      title: "Siesta de la chiri",
      alt: "Gato durmiendo acurrucado en una manta gris",
      text: "Modo ahorro de energía activado."
    },
    {
      img: "assets/img/monumento-2.jpg",
      title: "La chiri te mira",
      alt: "Gato carey mirando fijo a la cámara",
      text: "Ojos abiertos: te está evaluando."
    },
    {
      img: "assets/img/monumento-3.jpg",
      title: "Jefa de obra",
      alt: "Gato carey sentado en el suelo de madera entre escombros",
      text: "Supervisando la construcción desde el suelo."
    },
    {
      img: "assets/img/monumento-4.jpg",
      title: "Ojos en la penumbra",
      alt: "Gato con ojos brillantes en una habitación oscura",
      text: "De noche solo se ven dos linternas amarillas."
    },
    {
      img: "assets/img/monumento-5.jpg",
      title: "Mirando el cielo",
      alt: "Gato carey mirando hacia arriba tras una puerta de vidrio",
      text: "Esperando a que le abran la puerta."
    },
    {
      img: "assets/img/monumento-6.jpg",
      title: "Cabeza arriba",
      alt: "Primer plano de un gato mirando hacia arriba",
      text: "Le hacen cariño y mira al techo."
    },
    {
      img: "assets/img/monumento-7.jpg",
      title: "Retrato oficial",
      alt: "Primer plano de un gato atigrado de ojos amarillos",
      text: "La foto de perfil del culto."
    }
  ],

  /* ---------- Referencias del Counter-Strike ----------
     Sustituyen a los chips de IP y versión del hero. El "tag" le da el color
     de la consola: RADIO, DEAD, CT, T o SERVER. */
  csChat: [
    { tag: "SERVER", text: "de_mirage · 24/7 · AR/BR" },
    { tag: "RADIO", text: "Rush B, no stop, boludo" },
    { tag: "RADIO", text: "Go go go!" },
    { tag: "T", text: "Eco round, no compren nada" },
    { tag: "RADIO", text: "Enemy spotted" },
    { tag: "DEAD", text: "gg, me la hizo un jumping AWP de coldzera" },
    { tag: "CT", text: "200 de ping, culpa del server de Brasil" },
    { tag: "SERVER", text: "Bomb has been planted" }
  ],

  /* ---------- El Culto De Chiri (dashboard de redes) ----------
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
    ,{
      id: "instagram",
      name: "Instagram",
      handle: "@lilttin",
      description: "Fotos y el día a día del culto.",
      url: "https://instagram.com/lilttin",
      cta: "Ver perfil"
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

  /* ---------- En vivo (Discord + Lanyard) ----------
     Muestra en la web lo que estoy jugando o escuchando, en tiempo real.
     Solo necesita tu ID de Discord; los datos se leen de https://api.lanyard.rest
     (público, sin backend). Pasos:
       1) Entra al Discord de Lanyard: https://discord.gg/lanyard
       2) Activa el "Modo desarrollador" en Discord (Ajustes > Avanzado).
       3) Clic derecho sobre tu nombre > "Copiar ID de usuario".
       4) Pega ese número en discordId.
     Si lo dejas vacío (""), los carteles de "en vivo" no aparecen en la web. */
  live: {
    discordId: "1491080690173870241",
    pollSeconds: 20    // cada cuántos segundos se refresca el estado
  },

  /* ---------- Imágenes decorativas ----------
     gifs        -> banner de arriba. Si pones varios, van alternándose solos
                    (y puedes hacer clic para pasar al siguiente).
     chibi       -> muñeco al frente del texto principal.
     chibiProfile-> muñeco de la ventana PROFILE.
     Si un archivo no existe, se oculta y no rompe nada. */
  deco: {
    gifs: ["assets/img/mayuri.gif", "assets/img/anime-girl.gif"],
    rotateSeconds: 7,
    chibi: "assets/img/mayuri-chibi.webp",
    chibiProfile: "assets/img/mayuri-profile.png"
  },

  /* ---------- Frase junto al chibi ----------
     Cita corta de Steins;Gate o Code Geass. Cámbiala por la que prefieras. */
  quote: {
    text: "Solo quienes están preparados para morir tienen derecho a matar.",
    source: "Code Geass — Lelouch"
  },

  /* ---------- Profile (ventana de abajo) ---------- */
  profile: {
    title: "PROFILE",
    name: "chiri",
    tagline: "El Culto De Chiri",
    instagram: "@lilttin",
    instagramUrl: "https://instagram.com/lilttin",
    bio: "Streamer, jugador de CS, LoL y Geometry Dash. Este es mi rincón digital."
  }
};
