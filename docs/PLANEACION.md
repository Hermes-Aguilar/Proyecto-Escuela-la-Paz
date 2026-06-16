# Planeación del Proyecto — Sistema Web Congregación

**Religiosas Franciscanas de Nuestra Señora del Refugio**
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

Paleta del portal global (franciscana): terracota `#C25B35`, olivo `#8E9A3C`,
beige `#E4D7BC`. En código admin: crema/marron/terracota (ver globals.css).

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

**Semana 5 — Portal público (frontend): 🚧 EN PROGRESO**
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
