# PASO A PASO — La web de la chiri

Guía completa y en orden. Si haces esto de arriba a abajo, entiendes qué hay hecho y cómo
mantenerlo. No hace falta saber programar: solo copiar, pegar y guardar.

---

## Antes de empezar: qué se cambió y por qué

| Cambio | Por qué | Dónde vive |
|---|---|---|
| **Pestañas** (cada una con su apartado) | Antes todo estaba en una página larga; ahora al abrir una pestaña se ve solo esa sección | `index.html` + `assets/js/app.js` + CSS |
| **Monumentos de la chiri** | Nueva pestaña con las fotos, aparte del hilo | `index.html` + `config.js` (`monuments`) |
| **Humor del Hilo** | Los posts suenan más a las comunidades de CS, Geometry Dash e Instagram Chile, y se sumó **checopete** (LoL y el corxea) | `config.js` (`posts`) |
| **Título del server** | Ahora es **El Living de la chiri** | `config.js` (`server.name`) |
| **En vivo (Discord + Lanyard)** | Que se vea en la web qué juegas o escuchas en tiempo real | `config.js` (`live`) + `assets/js/app.js` |

**Regla de oro:** para el día a día solo tocas **`config.js`**. El resto ya está programado.

---

## Parte A — Ver la web en local

1. Abre la carpeta del proyecto: `C:\Users\Remii\chiriCS`.
2. Doble clic en `index.html` → se abre en el navegador. Ya funciona.
3. **Mejor aún**, para que todo cargue igual que en internet, abre una terminal en esa carpeta y escribe:

   ```powershell
   py -m http.server 8000
   ```

   Luego entra a **http://localhost:8000**.
4. Para parar el servidor: `Ctrl + C` en la terminal.

> Truco: si cambias `config.js` o el CSS, recarga con **Ctrl + F5** para saltarte la caché.

---

## Parte B — Activar el "En vivo" (Discord + Lanyard)

Qué hace: mientras tengas **Discord abierto en el PC**, la web mostrará tu canción de Spotify,
el juego que estás jugando y si estás en directo. Lo hace leyendo tu presencia desde
**Lanyard** (un servicio público que traduce tu Discord a un endpoint web). No hay servidor
propio: la web lee directo desde el navegador.

### Paso 1 — Únete al Discord de Lanyard
Lanyard solo puede leer tu presencia si estás en **su** servidor de Discord.

1. Entra al enlace: **https://discord.gg/lanyard**
2. Pulsa **Unirse / Accept Invite**. No hay que escribir nada; con estar dentro basta.

### Paso 2 — Copia tu ID de Discord
1. Abre Discord → **Ajustes** (el engranaje) → **Avanzado** → activa **Modo desarrollador**.
2. Cierra los ajustes.
3. Clic derecho sobre **tu nombre** (en la lista de miembros o abajo a la izquierda) →
   **Copiar ID de usuario**.
4. Es un número largo (ej. `94490510688792576`).

### Paso 3 — Pégalo en config.js
1. Abre `config.js` con cualquier editor de texto (Notepad, VS Code…).
2. Busca la sección `live:` (está al final) y pega tu ID entre las comillas:

   ```js
   live: {
     discordId: "94490510688792576",   // ← tu ID aquí
     pollSeconds: 20
   }
   ```
3. Guarda y recarga la web (**Ctrl + F5**).

### Paso 4 — Pruébalo
1. Deja **Discord abierto** y pon música en **Spotify** (con la opción "Mostrar lo que escucho"
   activada en Discord: **Ajustes → Actividad privada → Mostrar actividad actual como mensaje de estado**).
2. Recarga la web: debería aparecer tu canción en la pestaña **Spotify** y la barra en el hero.
3. En esa misma pestaña verás un **reproductor de Spotify incrustado** con la canción que suena,
   para poder escucharla ahí mismo. Solo se recarga cuando cambia la canción.

> **Si `discordId` está vacío, los carteles de "en vivo" no aparecen.** Es a propósito:
> así la web no se ve mal mientras no lo configures.

---

## Parte C — Que aparezca YouTube

Discord no muestra "estoy viendo YouTube" por sí solo. Tienes dos caminos:

**Opción 1 — Estás transmitiendo (recomendado si haces directos)**
- Enlaza tu cuenta de YouTube a Discord (**Ajustes → Conexiones → YouTube**) y cuando empieces
  directo, Discord lo marca como *Streaming*. La web mostrará **"En directo"** con el título y
  el enlace al directo.

**Opción 2 — Estás viendo YouTube (solo mirar)**
- Instala **PreMiD** (https://premid.app), añade la "Presence" de YouTube y deja PreMiD abierto.
  Así Discord mostrará "YouTube" como actividad y la web lo reflejará en la pestaña YouTube.

Si no haces ninguna de las dos, la pestaña YouTube mostrará un aviso del tipo
*"Ahora mismo no estoy en YouTube"* (o el juego que tengas abierto).

---

## Parte D — Editar textos, posts y monumentos

Todo en **`config.js`**:

- **Nombre / IP del server** → sección `server:`.
- **Posts del Hilo** → sección `posts:`. Cada línea es un post: `{ user: "nombre", text: "..." }`.
  Si una línea del texto empieza con `>` se pinta verde. Puedes partir líneas con `\n`.
- **Monumentos** → sección `monuments:`. Cada foto:
  ```js
  { img: "assets/img/gato-1.jpg", title: "Título", meta: "(86 KB)", text: "Pie de foto" }
  ```
  Para añadir una foto nueva: cópiala a `assets/img/` y agrega una entrada con esa ruta.
- **Redes** → sección `networks:`. Para agregar una, copia un bloque y quítale las `//`.

---

## Parte E — Subir los cambios a GitHub

Con cualquier cambio, la web de GitHub Pages se actualiza sola en 1-2 minutos. Dos formas:

### Opción 1 — Con git (línea de comandos)
En este PC **git no está instalado suelto**, pero viene incluido en **GitHub Desktop**. Si algún
día instalas git normal, sería:

```bash
git add -A
git commit -m "Describe tu cambio"
git push origin main
```

### Opción 2 — Con GitHub Desktop (lo que ya tienes instalado)
1. Abre **GitHub Desktop**.
2. `File → Add local repository…` y elige `C:\Users\Remii\chiriCS` (si no está ya).
3. Verás la lista de archivos cambiados abajo a la izquierda.
4. Escribe un resumen del cambio (ej. *"En vivo con Discord"*) y pulsa **Commit to main**.
5. Pulsa **Push origin** (arriba).

---

## Parte F — Comprobar que GitHub Pages actualizó

1. Abre **https://ttinviboi.github.io/chiriCS/**.
2. Si no ves el cambio, recarga con **Ctrl + F5** (el CSS y las imágenes se quedan en caché).
3. Si tras un par de minutos sigue igual, revisa en GitHub: **Settings → Pages** y que la rama
   sea `main / (root)`. Y en el repo, la pestaña **Actions** (o **deployments**) para ver si
   el último deploy terminó bien.

---

## Solución de problemas

| Síntoma | Causa probable | Solución |
|---|---|---|
| No aparece nada de "en vivo" | `live.discordId` vacío, o no estás en el Discord de Lanyard | Revisa los pasos de la **Parte B** |
| "En vivo no disponible" | No hay conexión, o el ID está mal | Verifica el ID y la conexión |
| No sale la canción de Spotify | En Discord: "Actividad privada" desactivada, o Spotify cerrado | Actívala en **Ajustes → Actividad privada** |
| YouTube nunca aparece | Discord no marca YouTube solo | Usa la **Parte C** (stream o PreMiD) |
| Cambié `config.js` y no se ve | Caché del navegador | **Ctrl + F5** |
| La web tarda en actualizar tras el push | GitHub Pages tarda 1-2 min | Espera y refresca |

---

## Resumen mental (para recordarlo)

1. **`config.js`** es el único archivo que tocas normalmente.
2. **Pestañas** = cada sección en su apartado (clic o flechas del teclado).
3. **En vivo** = Discord + Lanyard + tu ID en `config.js`.
4. **Publicar** = commit + push a `main` (GitHub Desktop sirve).
5. **Ver cambios** = Ctrl + F5.
