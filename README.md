# litttin — página de soporte

**Web en vivo:** https://ttinviboi.github.io/chiriCS/
**Repositorio:** https://github.com/ttinviboi/chiriCS

Página estática (solo front-end) con la IP del servidor de Minecraft, el canal de YouTube,
Spotify y el resto de redes. Estética única de imageboard (tipo 4chan / yotsuba): fondo crema,
serif, bordes duros, posts con `Anonymous` y `No.`, más una escena anime de fondo con
montañas, torii, pétalos de sakura y trama de puntos tipo manga.

## Ver en local

Con abrir `index.html` en el navegador ya funciona. Si prefieres un servidor local:

```bash
cd litttin-web
python3 -m http.server 8000
# abre http://localhost:8000
```

## Qué tienes que tocar

**Un solo archivo: `config.js`.** Ahí están la IP, el nombre del servidor, la versión, los
textos, la charla del Counter-Strike y el dashboard de redes.

```js
server: {
  ip: "play.tuservidor.net",   // ← tu IP real
  version: "Java 1.21.x",
  bedrockPort: ""              // si tienes Bedrock, ej: "19132"
}
```

Para añadir una red, copia una línea del array `networks` y quita las `//`. Los iconos
disponibles son `youtube`, `spotify`, `discord`, `twitch`, `tiktok`, `x`, `instagram` y
`github`; si pones otro, se usa un globo por defecto.

Otras cosas que puedes editar en el mismo archivo:

- `kicker` — el rótulo pequeño que va sobre la descripción.
- `intro` — la frase de presentación del hero.
- `motto` — frase con sello propio: pegatina junto al rótulo y cinta animada al final.
  Si la dejas vacía (`motto: ""`), desaparecen las dos.
- `csChat` — líneas de consola del Counter-Strike que van bajo los botones. El `tag`
  (`RADIO`, `DEAD`, `CT`, `T`, `SERVER`) decide el color.
- `posts` — los posts de la sección **El hilo**: `{ user, text }`. Las líneas que empiezan
  con `>` se pintan en verde, como en los imageboards.

### Estado online/offline

La sección del servidor consulta `api.mcsrvstat.us` desde el navegador y muestra si el
servidor está online, la versión y los jugadores conectados. Mientras la IP siga siendo la
de ejemplo, esa línea no se muestra. Si no quieres la consulta, pon `checkStatus: false`.

## Estructura

```
litttin-web/
├── index.html                 página completa
├── config.js                  ← todo lo editable
├── assets/
│   ├── css/
│   │   ├── base.css           estructura y estilos comunes
│   │   ├── scene.css          escena anime (cielo, luna, montañas, torii, pétalos, screentone)
│   │   └── theme.css          paleta y tipografía del tema (imageboard / yotsuba)
│   ├── js/app.js              copiar IP, estado del server, redes, charla de CS, pétalos
│   └── img/
│       ├── favicon.svg        cara de creeper
│       └── og.png             imagen de previsualización al compartir el enlace
├── .nojekyll                  evita el procesado de Jekyll en GitHub Pages
└── .gitignore
```

## Publicar en GitHub Pages

Este repo ya está publicado: cualquier `git push` a `main` actualiza la web en 1-2 minutos.

1. Crea un repositorio **público** en GitHub.
2. Sube estos archivos a la rama `main` (raíz del repo).
3. En el repo: **Settings → Pages → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.
4. En un par de minutos la página queda en:

```
https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/
```

### Si quieres que la dirección sea de tipo `chiriCS`

Hay tres maneras, de más simple a más corta:

| Opción | Qué se necesita | Dirección resultante |
|---|---|---|
| Repo llamado `chiriCS` en tu cuenta | nada extra | `https://tu-usuario.github.io/chiriCS/` |
| Cuenta/organización llamada `chiriCS` y repo `chiriCS.github.io` | la cuenta debe llamarse así | `https://chirics.github.io/` |
| Dominio propio (ej. `chirics.cl`) | comprar el dominio y apuntar los DNS a GitHub Pages | `https://chirics.cl/` |

Para el dominio propio, en GitHub Pages se pone el dominio en **Custom domain** y se crean
estos registros DNS:

```
A     @    185.199.108.153
A     @    185.199.109.153
A     @    185.199.110.153
A     @    185.199.111.153
CNAME www  tu-usuario.github.io
```

Marca **Enforce HTTPS** y listo. GitHub emite el certificado solo.

## Notas

- Todo es estático: sin backend, sin cookies, sin base de datos, sin rastreadores.
- El fondo es una escena dibujada con CSS y SVG (nada de imágenes externas ni derechos de autor).
- Respeta `prefers-reduced-motion`: si el sistema pide menos movimiento, los pétalos se desactivan.
