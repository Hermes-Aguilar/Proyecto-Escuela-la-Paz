# Planeación del Proyecto — Sistema Web Congregación

**Instituto de Misioneras del Señor de los Corazones y de Santa María de Guadalupe**
**Módulo principal: Pastoral Educativa — Jardines "La Paz" y "Porvenir"**
**Prácticas profesionales UTM · 6to semestre Ingeniería en Computación**
**Periodo: 1 de junio — 17 de julio de 2026**

---

## 1. Qué es este proyecto

Portal web para la congregación. La mayor parte del sitio es **estática**
(inicio, pastorales, librerías, contacto general). La parte **dinámica** vive en
Pastoral Educativa: dos subsistemas independientes, uno por cada jardín de
niños (**La Paz** y **Porvenir**). Cada jardín tiene **una encargada
(administradora)** que gestiona las publicaciones (noticias/avisos/eventos) que
ven los padres de familia en el muro público de su escuela.

**Regla de oro del sistema — aislamiento por jardín:** cada encargada solo ve y
modifica el contenido de SU jardín. El `jardinId` viaja en el token de sesión y
se valida en CADA operación del DAL. Nunca se toma del formulario.

## 2. Equipo y división del trabajo

| Persona | Rol | Responsabilidades |
|---------|-----|-------------------|
| Hermes | **Backend** | BD, migraciones, autenticación, DAL, Server Actions, Cloudinary, despliegue |
| Compañera | **Frontend** | Portal público, páginas de jardines, panel admin (UI), responsive, capacitación |

- Git: ramas `feature/backend` y `guadalupe/frontend`, merge a `main` por PR.
- Punto de integración: Semana 4 (la UI del panel consume las Server Actions).

## 3. Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js (App Router, Server Components) — SIN carpeta `src/` |
| UI | React + Tailwind CSS v4 |
| Tipografía | Fraunces (títulos) + Inter (texto) vía next/font; Nunito en páginas de jardines |
| ORM | Prisma 6 (cliente generado por defecto) |
| BD | PostgreSQL 17 local (producción: nube, Semana 6) |
| Auth | next-auth@beta (Auth.js v5) — Credentials + JWT + bcryptjs |
| Validación | zod |
| Imágenes | Cloudinary (compresión automática; solo URLs en BD) |
| Videos | NO se suben: embeds de YouTube (solo el link en BD) |

## 4. Arquitectura (patrón en capas)

```
Página (app/...)
    ↓ llama
Server Action (lib/actions/*.actions.ts, "use server")
    · traduce errores → Result<T>
    ↓ invoca
DAL (lib/dal/**, "server-only")
    · getAuthenticatedUser() SIEMPRE
    · filtra TODO por jardinId de la sesión
    · devuelve DTOs planos, nunca entidades Prisma crudas
    ↓ usa
lib/db.ts → Prisma singleton → PostgreSQL
```

**Contrato uniforme:** toda Server Action devuelve
`Result<T> = { ok: true, data } | { ok: false, error, code }`.

**Seguridad en dos capas (defensa en profundidad):**
1. `middleware.ts` — protege `/dashboard/*` por prefijo de ruta.
2. DAL — revalida sesión y ownership (`jardinId`) en cada consulta.

## 5. Modelo de datos (prisma/schema.prisma)

```
Jardin (1) ──< Usuario          · 2 jardines, 1 encargada c/u
Jardin (1) ──< Publicacion      · el muro de cada escuela
Usuario (1) ──< Publicacion     · autoría (SetNull al borrar usuario)
Publicacion (1) ──< Medio       · fotos (Cloudinary) y videos (YouTube)
Jardin (1) ──< MensajeContacto  · formulario de contacto por escuela
```

- Enums: `Rol` (ADMIN/SUPERADMIN), `TipoPublicacion` (NOTICIA/EVENTO/AVISO),
  `TipoMedio` (IMAGEN/VIDEO).
- Convención: camelCase en código, snake_case en BD (vía `@map`).
- Límites de negocio (se validan con zod en la capa de aplicación, NO en BD):
  **máximo 10 fotos y 5 videos de YouTube por publicación.**

### Datos del seed
| Jardín | slug | colorPrimario | colorSecundario | usuario |
|--------|------|--------------|-----------------|---------|
| La Paz | `la-paz` | `#137E86` (teal) | `#18B4C7` | `admin_lapaz` |
| Porvenir | `porvenir` | `#F4C430` (mostaza) | `#C25B35` | `admin_porvenir` |

Paleta del portal global — identidad **"litúrgico sobrio": azul profundo +
oro como ÚNICO acento** (ya NO hay terracota). Tokens en `globals.css`:
azul-institucional `#1f3a5a` (+ azul-oscuro `#14283f`, azul-suave `#e9eef4`),
dorado `#c19a3a` (+ dorado-oscuro `#9e7c26`, dorado-suave `#f3e8cf`), marrón
casi-negro `#1a1714`, marrón-suave `#6b6456`, crema `#f7f2e9`, arena `#cdc4b4`,
error `#a4243b`. Títulos en azul, cuerpo casi-negro sobre crema/blanco, oro
solo en detalles y mejor sobre azul. En código se usan SIEMPRE los tokens
(`bg-azul-institucional`, `text-dorado`, `text-marron`, `border-arena`…),
nunca hex sueltos. Detalle completo en `docs/paleta.md`. Los colores de cada
jardín (teal de La Paz, mostaza/terracota de Porvenir) son su identidad propia,
se leen de la BD y **no se tocan**: el subárbol de cada jardín restaura los
neutros antiguos en su `layout.tsx` para verse idéntico.

## 6. Documentación

- `docs/casos-de-uso.md` — CU-01 a CU-10 con flujos, reglas de negocio y notas
  técnicas por capa. **Consultar SIEMPRE antes de implementar una función.**
- Mapa rápido: CU-01 a CU-04 = visitante (público) · CU-05 a CU-10 = encargada
  (login, CRUD publicaciones, logout).

## 7. Estado del proyecto

### ✅ Completado (Semana 1 — cerrada)
- [x] Levantamiento de requerimientos con las encargadas
- [x] Casos de uso CU-01…CU-10 (`docs/casos-de-uso.md`)
- [x] `prisma/schema.prisma` (5 modelos, 3 enums) + migración `init` aplicada
- [x] `prisma/seed.ts` — 2 jardines y 2 encargadas (bcrypt) cargados
- [x] Estructura de carpetas (patrón Server Actions + DAL, sin `src/`)
- [x] Postgres 17 funcionando en ambas máquinas (md5 auth)
- [x] Tipografía configurada (Fraunces/Inter/Nunito + Tailwind 4)
- [x] Paleta institucional en `globals.css`
- [x] Login page con diseño glassmorphism (`app/(admin)/login/page.tsx`)
- [x] Repo en GitHub con ramas por persona

### ✅ Completado (Semana 2 — backend: autenticación)
- [x] `lib/db.ts` — singleton Prisma ("server-only")
- [x] `lib/contracts/result.ts` — tipo `Result<T>` + `ok()`/`fail()`
- [x] `lib/auth.ts` — Auth.js v5: Credentials + bcrypt + JWT con `jardinId`/`rol`
- [x] `types/next-auth.d.ts` — tipos extendidos (sesión y JWT con `jardinId`)
- [x] `app/api/auth/[...nextauth]/route.ts` — handlers GET/POST
- [x] `proxy.ts` — primera barrera: protege `/dashboard/*` y rebota `/login`
      con sesión → `/dashboard`. **Nota:** en Next.js 16 el antiguo
      `middleware.ts` se renombró a `proxy.ts` (mismo rol; ver guía oficial
      `middleware-to-proxy`).
- [x] `lib/dal/session.ts` — `getAuthenticatedUser()` (segunda barrera)
- [x] Prueba: `/dashboard` sin sesión redirige a `/login`; login con
      `admin_lapaz` entra; `/login` con sesión rebota; logout vuelve a bloquear

### 🔜 Pendiente
**Semana 3 — Lógica de negocio (backend):**
- [x] `lib/dal/jardines.ts` — lectura pública por slug + lectura admin con aislamiento
- [x] `lib/dal/errors.ts` — errores de dominio (`Validation`/`Forbidden`/`NotFound`)
- [x] `lib/dal/publicaciones.ts` — DAL CRUD filtrado por `jardinId` (+ `publicId` en medios)
- [x] `lib/validations/publicacion.ts` — zod: título/contenido, máx 10 fotos, 5 videos YouTube
- [x] `lib/services/cloudinary.ts` — subida f_auto/q_auto/w_1600 → `{url, publicId}`; borrado por `publicId`
- [x] `lib/actions/publicaciones.actions.ts` — crear/editar/borrar (`Result<T>`)
- [x] `lib/validations/contacto.ts` — zod: nombre/email/mensaje obligatorios
- [x] `lib/dal/contacto.ts` — insert público en `mensajes_contacto` (sin sesión)
- [x] `lib/actions/contacto.actions.ts` — contacto → `mensajes_contacto` (`Result<void>`)

**Semana 4 — Panel admin (integración front+back):**
- [x] Dashboard con lista de publicaciones del jardín (tema por jardín,
      badges por tipo, miniaturas Cloudinary, estado vacío, signOut;
      Borrar aún sin modal — hace console.log)
- [ ] Formularios nueva/editar publicación (conectados a las actions)
- [x] CU-07 · Pantalla Ver publicación (`dashboard/ver/[id]`): Server
      Component de solo lectura, vista previa con badge por tipo, chip
      Borrador, fechas en español (+ "Editado el …"), galería de fotos
      (clic para ampliar) y embeds de YouTube 16:9; 404 si no es del jardín
- [x] Contenido en bloques implementado: el cuerpo de la publicación
      pasó de texto plano (`contenido String`) a un array ordenado de
      bloques intercalados (`contenido Json`, ver `types/bloques.ts`):
      texto / imagen (referencia un Medio) / video (URL de YouTube).
      Migración `contenido_en_bloques`, validación zod (canónica +
      borrador), DAL que inserta los Medios y resuelve `nuevaRef`→`medioId`,
      actions con `bloques` JSON + `imagenes`/`imagenesRefs`, editor de
      bloques en `FormularioPublicacion` (↑↓/×, autoajuste de textarea) y
      render por bloques en la vista Ver. Script `probar-backend` → 21/21.
- [ ] Modal de confirmación al borrar
- [ ] Estados de carga y error en la UI

**Semana 5 — Portal público (frontend): ✅ COMPLETADA**
- [x] Micro-sitio por jardín con menú lateral fijo (desktop) + drawer móvil
      (`components/public/SidebarJardin.tsx`) y tema por colores de BD
      inyectado como CSS vars (`--jardin-primario`/`--jardin-secundario`)
      en `layout.tsx` (Server Component: `getJardinBySlug` → `notFound`).
      Corregidos los errores de tsc preexistentes (se reemplazó el viejo
      `page.tsx` que importaba `../jardines` y usaba `react-icons`).
- [x] Inicio del jardín (`page.tsx`): hero temático, bienvenida, 3
      publicaciones más recientes y "Lo que nos hace únicos".
- [x] Páginas estáticas: Quiénes somos (+ ancla `#mision`), Nuestro equipo
      (avatares con iniciales en el color del jardín) y Oferta educativa
      (`#niveles` / `#actividades`).
- [x] Muro público por tipo (`publicaciones/[tipo]`: noticias/eventos/avisos,
      slug→enum, 404 si inválido) con `getPublicacionesPublicas(jardinId,
      tipo?, limit?)` y tarjeta compartida `TarjetaPublicacion`.
- [x] CU-03 · Detalle de publicación (`publicaciones/[tipo]/[id]`):
      `getPublicacionPublicaById(id, jardinId)` (filtra `publicado=true` +
      `jardinId`), render por bloques (texto/imagen en grid/embeds YouTube),
      lazy loading de imágenes, breadcrumb y "Volver".
- [x] CU-04 · Contacto del jardín: datos y redes desde la BD + formulario
      client (`FormularioContacto`) que consume `enviarMensaje(slug, …)`
      (ok → confirmación verde; VALIDATION → campos en rojo; INTERNAL →
      error general).
- [x] Lazy loading de imágenes (`next/image loading="lazy"`), mobile-first.
- [x] Carrusel hero genérico reutilizable del portal general
      (`components/public/CarruselHero.tsx`: fade 700 ms, autoavance 8 s,
      flechas y puntos, contenido centrado, color de acento configurable)
      aplicado en Inicio y en las páginas de Pastoral
      Vocacional/Educativa/Misionera, Comunidades y Librerías
      (imágenes de Unsplash en `next.config.ts`).
- [x] "Pastoral Juvenil" renombrada a "Comunidades" en navbar, footer e
      Inicio (ruta `/pastoral-juvenil` sin cambios).
- [x] Rediseño de la página de Contacto del portal general: hero cálido
      con ilustración, tres columnas (formulario decorativo con validación
      visual, redes/horarios y mapa) con entrada escalonada.
- [x] **Corrección de identidad institucional** (el portal se había
      construido con identidad franciscana por error). Congregación real:
      Instituto de Misioneras del Señor de los Corazones y de Santa María de
      Guadalupe (fundado el 12/05/1957 en Huajuapan de León, Oax., por el
      Pbro. Lic. Luis Fiacro Guerrero Ramírez). Cambios:
      - Nueva paleta del escudo en `globals.css`: `azul-institucional`
        `#2c5f7c` (+ `azul-oscuro`) y `dorado` `#c9a227` (+ `dorado-oscuro`)
        reemplazan a `terracota`/`olivo`. Migrados a tokens TODOS los usos de
        hex/clase del viejo terracota-olivo en el portal y el panel admin
        (los colores propios de los jardines no se tocaron).
      - Navbar: nombre "Misioneras del Señor de los Corazones" + logo SVG
        (cruz dentro de un óvalo) inspirado en el escudo. Footer: nombre
        completo + lema "Alegrémonos de sufrir por Cristo en favor de su
        Iglesia" + datos reales.
      - Inicio: carisma real, lema, fundadores reales (Padre Luis Fiacro y
        Madre Elisa María) y 6 comunidades reales en "Nuestras comunidades".
      - Jardines: nueva subsección "Historia" en Nosotros
        (`nosotros/historia`, texto por slug: Tepeyac→La Paz,
        Nazareth→Porvenir) y mención del origen (1966) en "Quiénes somos".
      - Contacto: teléfono (953 53 2 07 11) y correo
        (mcgmayo12@hotmail.com) reales.
      - Pastoral Vocacional/Misionera, Comunidades y Librerías: solo
        recoloreadas a la nueva paleta (texto/estructura sin cambios, a la
        espera de información real).
- [x] **Apartado "La Congregación"** (nuevo, junto a "Inicio" en el Navbar
      con submenú desplegable al hover/focus, mismo patrón que el resto de
      la navegación). Contenido real tomado íntegro de `docs/congregacion.md`:
      - `la-congregacion/page.tsx`: portada (hero con escudo + velo),
        sección editorial (escudo + carisma + presencia: Oaxaca, Puebla,
        Edo. Méx., Guerrero, Sonora/Guanajuato, Costa Rica y Malabo/África),
        5 tarjetas a las subpáginas y "Situación Actual" (1 Aspirante ·
        2 Novicias · 4 Junioras · 63 Votos Perpetuos).
      - 5 subpáginas con hero pequeño compartido (`_components/SubHero.tsx`)
        y botón "← Volver": `fundador` (relato del Padre Fundador),
        `historia` (Historia de la Fundación + timeline de las 17
        comunidades), `superioras` (las 8 Superioras Generales y sus obras),
        `primeras-hermanas` (las 4 fundadoras con avatares de iniciales) y
        `escudo` (imagen grande + 4 cuadrantes, lema y leyenda perimetral).

- [x] **Enriquecimiento con fotos reales y datos del documento completo**
      (`docs/congregacion.md` versión completa + imágenes históricas en
      `public/images/`):
      - **Inicio:** hero del carrusel con 3 fotos reales (vida consagrada /
        dispensario San Juan Copala / paseo de las hermanas) en lugar de
        Unsplash; fotos reales del Padre Fundador y la Madre Elisa en
        "Fundadores e inspiradores"; sedes con número de fundación
        verificado contra el documento; fade-in al scroll con stagger en
        Fundadores, Áreas y Comunidades; párrafos largos justificados.
        (Librerías y datos de seed de jardines NO tocados, a la espera de
        información real.)
      - **La Congregación · Superioras:** bloque expandible "Consejo General
        del periodo" (vicaría, consejeras, secretaría y ecónoma) para los
        gobiernos 1986-1992, 2001-2007 y 2007-2013; fotos del gobierno
        1986-1992 y de la Sup. Gral. Lucero Rosario.
      - **La Congregación · Primeras Hermanas:** foto histórica real con la
        Madre Elisa, los 4 nombres como pie de foto (se quitaron los avatares
        de iniciales).
      - **La Congregación · Historia:** timeline combinada (fundaciones +
        acontecimientos: Bodas de Plata madres 1985, Bodas de Plata Instituto
        1985, Bodas de Oro Ordenación 1990, Bodas de Plata Jardines 1991,
        Aprobación Diocesana 2002, VII Capítulo General 2019) en orden
        cronológico, con leyenda y distinción visual fundación/evento.
      - **La Congregación · Fundador:** retrato real ("paseando en el jardín
        de la Casa Central") al inicio del artículo.
      - **Historia de cada jardín** (`pastoral-educativa/[jardin]/nosotros/
        historia`): ampliada con las Bodas de Plata de 1991 y la pertenencia
        inicial de las hermanas a la Casa General; Porvenir añade que fue la
        octava comunidad (1° abril 1992).
      - Transiciones (`AnimacionScroll`) y texto justificado en los párrafos
        largos de las subpáginas de La Congregación.

- [x] **Re-paleta del portal a la identidad "litúrgico sobrio"** (azul
      profundo + oro como único acento; se retira la terracota). Se
      revaluaron los hex de los tokens institucionales conservando sus
      nombres (azul-institucional `#1f3a5a`, azul-oscuro `#14283f`, dorado
      `#c19a3a`, dorado-oscuro `#9e7c26`, crema `#f7f2e9`, arena `#cdc4b4`,
      marron `#1a1714`, marron-suave `#6b6456`, error `#a4243b`) + tokens
      nuevos azul-suave `#e9eef4` y dorado-suave `#f3e8cf`. Los colores se
      movieron de `@theme inline` a `@theme` (utilidades vía `var(--color-*)`)
      y el `layout.tsx` de cada jardín restaura los neutros antiguos en su
      subárbol → **las rutas de jardín se ven idénticas**. Se migró a tokens
      el resto de hex sueltos del portal (familia marrón cálida y restos
      franciscanos). Títulos en azul, cuerpo casi-negro, oro solo en detalles
      sobre azul. Contraste WCAG AA verificado. Ver `docs/paleta.md`.

- [x] **Rediseño del header de cada jardín** (La Paz y Porvenir): se
      reemplazó el menú lateral vertical + carrusel por una cabecera más
      simple de dos partes.
      - **Menú horizontal superior** (`components/public/MenuJardin.tsx`,
        reemplaza a `SidebarJardin.tsx`): barra blanca sticky, sin franja
        de color encima; izquierda con ícono + "Jardín de Niños [nombre]";
        derecha con los enlaces (Inicio, Nosotros▾, Oferta Educativa▾,
        Publicaciones▾, Contacto) más "← Regresar a Congregación" discreto
        al final. Enlace activo resaltado con `--jardin-primario`; dropdowns
        al hover/focus y hamburguesa en móvil. El `layout.tsx` quitó el
        `lg:pl-64` del antiguo sidebar fijo.
      - **Hero estático** (`components/public/HeroJardin.tsx`, reemplaza a
        `CarruselJardin.tsx`): dos columnas en escritorio (texto con
        degradado de la paleta del jardín + una sola imagen representativa,
        `h-[500px]`) y apilado en móvil (imagen arriba, texto debajo). Sin
        rotación ni parallax. Imagen por jardín: La Paz `lapaz3.jpeg`,
        Porvenir `porvenir2.jpeg`.
      - **Paleta ampliada a 3 tonos por jardín:** se añadió `--jardin-acento`
        en el `layout.tsx` (La Paz coral `#E8907A`, Porvenir azul `#5B8FA8`),
        usado en el degradado del hero junto a `--jardin-primario`. El ícono
        del jardín (paloma/estrella) se extrajo a `IconoJardin.tsx`,
        compartido por menú y hero. Las páginas de Nosotros, Oferta,
        Publicaciones y Contacto no se tocaron.

- [x] **Contenido estático real de los jardines** centralizado en
      `lib/data/jardines-contenido.ts` (transcrito íntegro de
      `docs/jardin-la-paz.md`, sin resumir): historia, objetivo general,
      misión, visión, valores, clases adicionales y actividades extra
      (con nombre de ícono lucide), contacto institucional (clave, turno,
      incorporación, correo) y `espiritualidad`. La
      misión/visión/valores son institucionales (MSCG) y se comparten;
      La Paz trae todo, Porvenir hereda lo institucional y deja en `null`
      lo propio pendiente (historia, objetivo, contacto). Páginas
      conectadas a estos datos (sin tocar hero, bienvenida, publicaciones
      ni menú):
      - **Quiénes somos:** objetivo general en blockquote del color del
        jardín, misión (ícono Target) y visión (ícono Eye) desde datos, y
        grid 4×2 de valores. `null` → "Información próximamente".
      - **Historia:** texto íntegro (párrafos justificados + listas de
        hermanas) y ficha de datos del jardín con fondo primario/10;
        `null` → "Información próximamente".
      - **Oferta educativa:** nuevas secciones "Clases adicionales" y
        "Actividades extras" (#actividades) leídas de los datos; íconos
        resueltos por nombre.
      - **Contacto:** tarjeta "Datos del jardín" (clave, turno,
        incorporación, correo) además del formulario.
      - **Espiritualidad** (`nosotros/espiritualidad`, nueva): página en
        construcción con ícono de corazón, lista para recibir el contenido
        cuando `espiritualidad` deje de ser `null`.

**Semana 6 — Despliegue:**
- [ ] BD a la nube (Neon/Supabase) + migración
- [ ] Deploy en Vercel + variables de entorno
- [ ] Dominio + HTTPS
- [ ] Capacitación a las encargadas

**Cierre (13–17 julio):**
- [ ] Reporte técnico UTM (diagramas, código relevante, capturas, evidencias)
- [ ] Cartas de terminación y firmas

## 8. Convenciones para Claude Code

1. **Consulta `docs/casos-de-uso.md`** antes de implementar cualquier función;
   cada CU trae sus reglas de negocio y notas técnicas.
2. **TypeScript estricto** en todo. Nada de `any`.
3. `import "server-only"` en `lib/db.ts` y TODO `lib/dal/**`.
4. Las Server Actions viven en `lib/actions/*.actions.ts` con `"use server"`,
   capturan excepciones del DAL y devuelven `Result<T>`. Nunca filtran stacks.
5. El DAL **siempre** llama `getAuthenticatedUser()` y filtra por su
   `jardinId`. El `jardinId` JAMÁS se acepta desde el cliente/formulario.
6. DTOs planos: el DAL no devuelve entidades Prisma crudas.
7. UI: Tailwind 4 con la paleta de `globals.css` (`bg-crema`, `text-marron`,
   `bg-terracota`, `border-arena`…). Fuentes: `font-titulo` / `font-texto`.
8. Mobile-first en todo el frontend.
9. Commits en español con prefijo convencional: `feat:`, `fix:`, `docs:`,
   `chore:`. Ramas: `feature/backend` y `feature/frontend`.
10. NUNCA tocar ni subir `.env` / `.env.local`. Secretos solo en variables de
    entorno (`AUTH_SECRET`, `DATABASE_URL`, claves Cloudinary).

## 9. Comandos útiles

```bash
npm run dev               # desarrollo
npx prisma studio         # ver/editar la BD en el navegador
npx prisma migrate dev    # aplicar cambios del schema
npm run db:seed           # recargar datos iniciales
npx prisma generate       # regenerar cliente tras cambiar schema
npm run test:backend



```
