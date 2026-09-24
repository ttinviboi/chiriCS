# El Living de la chiri — web del server

**Web en vivo:** https://ttinviboi.github.io/chiriCS/
**Repositorio:** https://github.com/ttinviboi/chiriCS

Página estática (solo front-end, sin backend) con la IP del server de Minecraft, las redes,
un hilo estilo imageboard (tipo 4chan / yotsuba) donde "postea" la comunidad, una galería de
**Monumentos de la chiri** y un panel **En vivo** que muestra en tiempo real qué estoy jugando
o escuchando.

> ¿Primera vez con el proyecto? Lee **[PASO-A-PASO.md](./PASO-A-PASO.md)**: es la guía
> detallada, con todo el "cómo" explicado desde cero.

---

## Qué hay ahora en la web

### Pestañas (cada una con su apartado)
La barra de arriba ya no baja por una página larga: son **pestañas**. Al abrir una se muestra
solo esa sección y se ocultan las demás.

| Pestaña | Qué muestra |
|---|---|
| **Servidor** | IP del server de Minecraft, versión, estado online/offline y jugadores |
| **Hilo** | Los posts de la comunidad (estilo imageboard) |
| **Redes** | Todas las redes (YouTube, Spotify, etc.) en tarjetas |
| **Monumentos** | La galería *Monumentos de la chiri* |
| **YouTube** | Tarjeta de YouTube + lo que estoy viendo/transmitiendo en vivo |
| **Spotify** | Tarjeta de Spotify + la canción que estoy escuchando ahora |

Detalles técnicos:
- Cada pestaña se puede enlazar directo con el hash de la URL (`#hilo`, `#monumentos`, `#spotify`...).
- Se cambia de pestaña con clic y también con las flechas ← → del teclado.
- Los botones del hero ("Entrar al servidor" / "Ver mis redes") también cambian de pestaña.
- Si una red no existe en `config.js`, su pestaña se oculta sola.

### Monumentos de la chiri
Galería con las fotos de la chiri. Se rellena desde la clave `monuments` de `config.js`
(cada una con `img`, `title`, `text` y, opcional, `meta` y `alt`).

### El hilo (posts)
Los comentarios se pintan desde la clave `posts` de `config.js`. Cada post es `{ user, text }`.
Las líneas que empiezan con `>` se pintan en verde, como en los imageboards. El humor está
ambientado en las comunidades de Counter-Strike, Geometry Dash, Instagram Chile y LoL
(con el usuario `checopete` y sus tallas del **corxea**).

### En vivo (Discord + Lanyard)
Muestra, en tiempo real, qué juego / qué canción / qué directo tengo abierto:

- **Barra en el hero**: avatar + estado + un resumen ("Jugando: CS2", "Escuchando: …").
- **Pestaña Spotify**: carátula, canción, artista, álbum, **barra de progreso** y un
  **reproductor de Spotify incrustado** para escuchar esa canción ahí mismo. El reproductor
  solo se recarga cuando cambia la canción (no en cada refresco).
- **Pestaña YouTube**: si estoy en directo o viendo YouTube; si no, un aviso amable.

Funciona con **Discord** como fuente y **[Lanyard](https://github.com/Phineas/lanyard)** como
puente público (API sin autenticación y con CORS, así que se lee directo desde el navegador,
sin backend). Para activarlo solo hay que poner tu **ID de Discord** en `config.js` → `live.discordId`.
El paso a paso completo está en **[PASO-A-PASO.md](./PASO-A-PASO.md)**.

Si `live.discordId` está vacío, los carteles de "en vivo" **no se muestran** (así la web no
queda rota mientras no lo configures).

---

## Qué tienes que tocar

**Un solo archivo: `config.js`.** Ahí está todo lo editable:

| Clave | Para qué sirve |
|---|---|
| `kicker` | Rótulo pequeño sobre la descripción del hero |
| `intro` | Frase de presentación del hero |
| `motto` | Frase con sello propio (pegatina + cinta animada). Vacía (`""`) = desaparecen |
| `server.name` | Nombre del server (ahora: **El Living de la chiri**) |
| `server.ip` | IP del server de Minecraft |
| `server.version` | Versión de Minecraft |
| `server.bedrockPort` | Puerto de Bedrock (o `""` si no usas) |
| `server.checkStatus` | `true` = consulta online/offline automáticamente |
| `posts` | Posts del **Hilo**: `{ user, text }` (y opcional `img`, `imgMeta`, `imgAlt`) |
| `monuments` | Galería **Monumentos de la chiri**: `{ img, title, text }` |
| `csChat` | Líneas de consola del Counter-Strike (`tag`: `RADIO`, `DEAD`, `CT`, `T`, `SERVER`) |
| `networks` | Redes del dashboard (YouTube, Spotify, etc.) |
| `live.discordId` | Tu ID de Discord para el panel **En vivo** |
| `live.pollSeconds` | Cada cuántos segundos se refresca el "en vivo" |

---

## Ver en local

Con abrir `index.html` en el navegador ya funciona. Si prefieres un servidor local
(recomendado, así el panel "En vivo" y las imágenes cargan igual que en GitHub):

```bash
python -m http.server 8000
# abre http://localhost:8000
```

En Windows también sirve:

```powershell
py -m http.server 8000
```

---

## Publicar en GitHub Pages

Este repo ya está publicado: cualquier `git push` a `main` actualiza la web en 1-2 minutos.
El detalle está en [PASO-A-PASO.md](./PASO-A-PASO.md#parte-e--subir-los-cambios-a-github).

---

## Estructura

```
chiriCS/
├── index.html              página completa (pestañas + apartados)
├── config.js               ← TODO lo editable
├── README.md               este archivo
├── PASO-A-PASO.md          guía detallada
├── assets/
│   ├── css/
│   │   ├── base.css        estructura y estilos comunes
│   │   ├── scene.css       escena anime (cielo, luna, montañas, torii, pétalos)
│   │   └── theme.css       paleta y tipografía (imageboard / yotsuba)
│   ├── js/
│   │   └── app.js          pestañas, hilo, monumentos, redes, "en vivo", pétalos
│   └── img/
│       ├── favicon.svg     cara de creeper
│       ├── og.png          imagen de previsualización al compartir
│       ├── gato-1.jpg      Monumento de la chiri
│       └── gato-2.jpg      Monumento de la chiri
├── .nojekyll               evita el procesado de Jekyll en GitHub Pages
└── .gitignore
```

---

## Notas

- Todo es estático: sin backend, sin cookies, sin base de datos, sin rastreadores.
- El panel "En vivo" lee datos **públicos** de tu presencia de Discord a través de Lanyard.
  Mientras esté activado, cualquiera con tu ID puede ver qué juegas/escuchas.
- El fondo es una escena dibujada con CSS y SVG (nada de imágenes externas ni derechos de autor).
- Respeta `prefers-reduced-motion`: si el sistema pide menos movimiento, los pétalos se desactivan.
