# Casos de Uso — Sistema Web Congregación

**Religiosas Franciscanas de Nuestra Señora del Refugio**
**Módulo: Pastoral Educativa — Jardines de Niños "La Paz" y "Porvenir"**

---

## 1. Alcance del sistema

El sistema es un portal web mayormente estático para la congregación, con una
sección dinámica especial dentro de **Pastoral Educativa**: dos subsistemas
independientes, uno por cada jardín de niños (**La Paz** y **Porvenir**). Cada
jardín tiene su propia administradora (encargada), que gestiona las
publicaciones (noticias, avisos, eventos) que ven los padres de familia.

La regla central del sistema es el **aislamiento por jardín**: cada encargada
solo puede ver y modificar el contenido de su propio jardín. Esta separación se
implementa con el campo `jardinId`, que viaja dentro del token de sesión y se
valida en cada operación.

## 2. Actores

| Actor | Autenticación | Descripción |
|-------|---------------|-------------|
| **Visitante** | No autenticado | Cualquier persona (padre de familia, comunidad) que navega el portal público. |
| **Administrador de Jardín** | Autenticado (1 por jardín) | Encargada que gestiona las publicaciones de **su** jardín. Su `jardinId` la limita a su escuela. |

## 3. Arquitectura (cómo se implementa cada caso de uso)

El sistema sigue un flujo en capas. Cada caso de uso recorre esta ruta:

```
Página (Server/Client Component)
        ↓
Server Action  ("use server")  → traduce errores a Result<T>
        ↓
DAL ("server-only")  → autoriza con jardinId y consulta con Prisma
        ↓
Prisma → PostgreSQL
```

- **Seguridad en dos capas:** `middleware.ts` protege las rutas por prefijo
  (primera barrera) y el **DAL** revalida la propiedad por `jardinId` en cada
  consulta (segunda barrera, defensa en profundidad).
- **Contrato uniforme:** toda Server Action devuelve `Result<T>`:
  `{ ok: true, data }` o `{ ok: false, error, code }`.

## 4. Índice de casos de uso

| ID | Caso de uso | Actor |
|----|-------------|-------|
| CU-01 | Ver Portal | Visitante |
| CU-02 | Ver Jardín | Visitante |
| CU-03 | Ver Noticia | Visitante |
| CU-04 | Enviar Contacto | Visitante |
| CU-05 | Iniciar Sesión | Administrador de Jardín |
| CU-06 | Crear Publicación | Administrador de Jardín |
| CU-07 | Ver Publicación (panel) | Administrador de Jardín |
| CU-08 | Editar Publicación | Administrador de Jardín |
| CU-09 | Borrar Publicación | Administrador de Jardín |
| CU-10 | Cerrar Sesión | Administrador de Jardín |

---

## CU-01 · Ver Portal

- **Actor:** Visitante (no autenticado)
- **Descripción:** El visitante accede al portal y navega la información general
  de la congregación y sus áreas pastorales.
- **Precondiciones:** El sitio está publicado y accesible en internet.
- **Postcondiciones:** El visitante visualiza la página de inicio y puede
  navegar a cualquier sección.

**Flujo normal**
1. El visitante ingresa la URL del portal.
2. El sistema renderiza la página de inicio (Server Component estático): barra
   de navegación, presentación de la congregación y las áreas pastorales.
3. El sistema muestra el acceso a las dos escuelas dentro de Pastoral Educativa.
4. El visitante navega libremente.

**Excepciones**
- *E1 — Falla de red/servidor:* el sistema muestra una página de error y permite
  reintentar.

- **Prioridad:** Alta · **Frecuencia:** Muy alta
- **Reglas de negocio:** El portal es totalmente público, sin registro.
- **Requerimientos especiales:** Diseño responsive (mobile-first).
- **Notas técnicas:** Páginas estáticas con Server Components; sin consultas a la
  BD salvo el listado de jardines.

---

## CU-02 · Ver Jardín

- **Actor:** Visitante (no autenticado)
- **Descripción:** El visitante selecciona un jardín (La Paz o Porvenir) y ve su
  espacio exclusivo: información de contacto y muro de publicaciones.
- **Precondiciones:** El visitante navega en el portal; el jardín existe en la BD.
- **Postcondiciones:** El visitante visualiza el espacio del jardín con su
  identidad visual y sus avisos.

**Flujo normal**
1. El visitante entra a Pastoral Educativa y elige una escuela.
2. El sistema carga la ruta dinámica `/pastoral-educativa/[jardin]` usando el
   `slug` (`la-paz` o `porvenir`).
3. El sistema aplica el **tema de colores** del jardín leído de la BD
   (`colorPrimario`, `colorSecundario`).
4. El sistema muestra la información de contacto y el muro de publicaciones
   (solo las `publicado = true`, ordenadas de la más reciente a la más antigua).

**Flujo alternativo**
- *S1 — Sin publicaciones:* el muro muestra "No hay avisos disponibles por el
  momento".

**Excepciones**
- *E1 — Jardín inexistente o dado de baja:* el sistema muestra "Página no
  encontrada".

- **Prioridad:** Alta · **Frecuencia:** Alta
- **Reglas de negocio:** El espacio de cada escuela y sus publicaciones son
  públicos.
- **Requerimientos especiales:** El cambio de colores según la escuela debe ser
  inmediato.
- **Notas técnicas:** Consulta `publicaciones WHERE jardinId = <jardin> AND
  publicado = true ORDER BY creadoEn DESC`. El tema se inyecta desde los campos
  de color del registro del jardín.

---

## CU-03 · Ver Noticia

- **Actor:** Visitante (no autenticado)
- **Descripción:** El visitante abre una publicación del muro para leer el
  contenido completo y ver sus fotos y videos.
- **Precondiciones:** El visitante está en el muro de un jardín.
- **Postcondiciones:** El visitante visualiza la noticia completa y puede regresar.

**Flujo normal**
1. El visitante hace clic en una publicación.
2. El sistema abre `/pastoral-educativa/[jardin]/noticias/[id]`.
3. El sistema muestra título, fecha, contenido, las fotografías (hasta 10) y los
   videos de YouTube embebidos (hasta 5).
4. El visitante regresa al muro.

**Flujo alternativo**
- *S1 — Sin multimedia:* el texto ocupa todo el ancho de forma ordenada.

**Excepciones**
- *E1 — Publicación eliminada:* el sistema avisa "Este aviso ya no está
  disponible" y redirige al muro.

- **Prioridad:** Alta · **Frecuencia:** Muy alta
- **Reglas de negocio:** Cualquiera puede leer el detalle sin restricción.
- **Requerimientos especiales:** Las imágenes deben mantenerse nítidas y cargar
  con *lazy loading*.
- **Notas técnicas:** Los medios se obtienen de la tabla `medios`
  (`tipo = imagen` → Cloudinary, `tipo = video` → embed de YouTube).

---

## CU-04 · Enviar Contacto

- **Actor:** Visitante (no autenticado)
- **Descripción:** El visitante envía un mensaje a la escuela mediante un
  formulario, o accede a sus redes sociales oficiales.
- **Precondiciones:** El visitante está en la sección de contacto del jardín.
- **Postcondiciones:** El mensaje queda registrado (o enviado) y se confirma al
  visitante.

**Flujo normal**
1. El sistema muestra el formulario: nombre (*), correo (*), teléfono (opcional),
   asunto y mensaje (*).
2. El sistema muestra los botones de redes sociales del jardín.
3. El visitante completa los datos y presiona "Enviar Mensaje".
4. El sistema valida los campos (incluido el formato del correo).
5. El sistema registra el mensaje asociado al `jardinId` y confirma:
   "¡Mensaje enviado correctamente!".

**Flujos alternativos**
- *S2 — Campo obligatorio vacío:* se resaltan los campos faltantes.
- *S3 — Redes sociales:* el visitante abre Facebook, Instagram o WhatsApp del
  jardín en una pestaña nueva.

**Excepciones**
- *E1 — Falla de envío:* se conserva el texto escrito y se avisa el error.
- *E2 — Correo inválido:* el sistema pide corregir el correo.

- **Prioridad:** Media · **Frecuencia:** Media
- **Reglas de negocio:** No se aceptan mensajes vacíos ni correos mal formados.
  Las redes deben ser las cuentas oficiales de ESE jardín.
- **Notas técnicas:** Server Action con validación `zod`; inserta en la tabla
  `mensajes_contacto` con el `jardinId` correspondiente. Las URLs de redes
  provienen de los campos `facebookUrl`, `instagramUrl`, `whatsapp` del jardín.

---

## CU-05 · Iniciar Sesión

- **Actor:** Administrador de Jardín
- **Descripción:** La encargada ingresa sus credenciales para acceder al panel
  de su jardín.
- **Precondiciones:** La encargada tiene una cuenta creada en el sistema.
- **Postcondiciones:** La encargada accede a su panel privado; su `jardinId`
  queda guardado en la sesión.

**Flujo normal**
1. La encargada abre la pantalla de acceso e ingresa usuario (*) y contraseña (*).
2. El sistema busca el usuario en la BD por `username`.
3. El sistema compara la contraseña con `bcrypt.compare`.
4. Si es válida, genera un **token JWT** que contiene `jardinId` y `rol`, lo
   guarda en una **cookie httpOnly** con expiración de 24 horas.
5. El sistema redirige al panel (`/dashboard`).

**Flujos alternativos**
- *S2 — Campo vacío:* se resaltan los campos obligatorios.

**Excepciones**
- *E1 — Credenciales incorrectas:* el sistema muestra "Usuario o contraseña
  incorrectos" y limpia los campos.

- **Prioridad:** Alta · **Frecuencia:** Baja (una vez por turno)
- **Reglas de negocio:** El acceso está restringido a encargadas autorizadas.
- **Requerimientos especiales:** La contraseña se oculta al escribirse.
- **Notas técnicas:** Auth.js (NextAuth v5) con Credentials provider; el token se
  firma con `AUTH_SECRET`. La cookie httpOnly impide que JavaScript la lea (anti
  robo de sesión por XSS).

---

## CU-06 · Crear Publicación

- **Actor:** Administrador de Jardín
- **Descripción:** La encargada redacta un aviso con texto, fotos y/o videos para
  publicarlo en el muro de su escuela.
- **Precondiciones:** La encargada tiene sesión activa.
- **Postcondiciones:** La publicación queda guardada y visible de inmediato en el
  muro público de su jardín.

**Flujo normal**
1. La encargada presiona "Nueva Publicación".
2. El sistema muestra el formulario: título (*), contenido (*), fotos
   (hasta 10, opcional), enlaces de YouTube (hasta 5, opcional).
3. La encargada completa los datos y presiona "Guardar".
4. El sistema valida los datos (título y contenido obligatorios; máximo 10 fotos
   y 5 videos).
5. El sistema sube las fotos a Cloudinary (comprimidas y redimensionadas) y
   guarda las URLs en la tabla `medios`.
6. El sistema **asocia automáticamente** la publicación al `jardinId` de la
   encargada autenticada (tomado del token, nunca del formulario).
7. El sistema confirma "Publicación guardada correctamente".

**Flujos alternativos**
- *S1 — Cancelar:* se cierra el formulario sin guardar.
- *S2 — Sin multimedia:* se guarda solo el texto.

**Excepciones**
- *E1 — Campos obligatorios vacíos:* se resaltan y se pide completarlos.

- **Prioridad:** Alta · **Frecuencia:** Alta
- **Reglas de negocio:** Toda publicación se asigna exclusivamente al jardín de
  quien la crea. No se permiten textos vacíos. Máximo 10 fotos y 5 videos.
- **Requerimientos especiales:** Límite de peso por imagen; compresión automática.
- **Notas técnicas:** Server Action `crearPublicacion` → DAL (valida sesión y
  `jardinId`) → Prisma. Devuelve `Result<T>`. **Importante de seguridad:** el
  `jardinId` se toma de la sesión, no de un campo del formulario.

---

## CU-07 · Ver Publicación (panel)

- **Actor:** Administrador de Jardín
- **Descripción:** La encargada abre una publicación de su panel para revisar su
  contenido antes de editarla o borrarla.
- **Precondiciones:** La encargada tiene sesión activa y publicaciones registradas.
- **Postcondiciones:** La encargada ve el detalle y puede pasar a editar o borrar.

**Flujo normal**
1. La encargada selecciona una publicación de su lista.
2. El sistema verifica que la publicación pertenezca a su jardín.
3. El sistema muestra título, fecha, contenido y multimedia.
4. La encargada puede ir a editar o borrar.

**Excepciones**
- *E1 — Publicación ya no existe:* el sistema avisa y actualiza la lista.

- **Prioridad:** Alta · **Frecuencia:** Media
- **Reglas de negocio:** La encargada solo puede abrir avisos de **su** jardín.
- **Notas técnicas:** El DAL filtra `WHERE id = <id> AND jardinId =
  <sesion.jardinId>`. Si no coincide, no devuelve la fila (no fuga de datos).

---

## CU-08 · Editar Publicación

- **Actor:** Administrador de Jardín
- **Descripción:** La encargada modifica el título, contenido o multimedia de una
  publicación existente.
- **Precondiciones:** Sesión activa; la publicación existe y es de su jardín.
- **Postcondiciones:** Los cambios se guardan y se reflejan de inmediato en el
  muro público.

**Flujo normal**
1. La encargada elige editar una publicación.
2. El sistema muestra el formulario con los datos actuales.
3. La encargada modifica lo necesario (texto, fotos o videos).
4. La encargada presiona "Guardar Cambios".
5. El sistema revalida la propiedad por `jardinId`, guarda los cambios y
   actualiza `actualizadoEn`.
6. El sistema confirma "Cambios guardados correctamente".

**Flujos alternativos**
- *S1 — Cancelar:* se descartan los cambios.
- *S2 — Quitar foto:* se elimina la imagen del formulario y se guarda sin ella.

**Excepciones**
- *E1 — Título o contenido vacíos:* se bloquea el guardado.

- **Prioridad:** Alta · **Frecuencia:** Media
- **Reglas de negocio:** La encargada solo edita avisos de su jardín. La fecha de
  modificación puede actualizarse para avisar a los padres.
- **Notas técnicas:** Server Action `editarPublicacion`; el DAL revalida
  `jardinId` antes de actualizar.

---

## CU-09 · Borrar Publicación

- **Actor:** Administrador de Jardín
- **Descripción:** La encargada elimina un aviso obsoleto o incorrecto.
- **Precondiciones:** Sesión activa; la publicación existe en su lista.
- **Postcondiciones:** El aviso se elimina por completo y desaparece del muro
  público.

**Flujo normal**
1. La encargada presiona "Eliminar" en una publicación.
2. El sistema muestra una ventana de confirmación.
3. La encargada confirma.
4. El sistema **verifica que el aviso pertenezca a su jardín** (`jardinId`).
5. El sistema borra la publicación (y sus medios en cascada).
6. El sistema confirma la eliminación y actualiza la lista.

**Flujo alternativo**
- *S1 — Cancelar:* se cierra la ventana sin borrar.

**Excepciones**
- *E1 — El aviso no es de su jardín:* el sistema **bloquea el borrado por
  seguridad** y muestra un error.

- **Prioridad:** Alta · **Frecuencia:** Media
- **Reglas de negocio:** El borrado es permanente. La confirmación es obligatoria.
- **Notas técnicas:** Server Action `borrarPublicacion`; el DAL valida `jardinId`
  y lanza `ForbiddenError` (→ `Result.error`) si no corresponde. El borrado en
  cascada de `medios` lo maneja el `onDelete: Cascade` del esquema.

---

## CU-10 · Cerrar Sesión

- **Actor:** Administrador de Jardín
- **Descripción:** La encargada cierra su sesión para proteger su panel.
- **Precondiciones:** Sesión activa.
- **Postcondiciones:** El acceso se revoca; las pantallas privadas quedan
  bloqueadas hasta un nuevo inicio de sesión.

**Flujo normal**
1. La encargada presiona "Cerrar Sesión".
2. El sistema invalida la sesión y borra la cookie.
3. El sistema redirige a la pantalla de inicio de sesión.

**Flujo alternativo**
- *S1 — Cierra la pestaña directamente:* la sesión expira de forma segura.

- **Prioridad:** Alta · **Frecuencia:** Al finalizar cada jornada
- **Reglas de negocio:** Tras cerrar sesión, el botón "Atrás" no debe dar acceso;
  el sistema exige iniciar sesión de nuevo.
- **Notas técnicas:** `signOut` de Auth.js elimina la cookie httpOnly; el
  `middleware.ts` vuelve a bloquear `/dashboard`.

---

*Documento de casos de uso — versión alineada a la arquitectura del proyecto
(Next.js App Router · Prisma · Auth.js · PostgreSQL).*
