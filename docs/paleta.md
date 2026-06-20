# Paleta del portal — "Litúrgico sobrio"

Identidad visual del **portal de la congregación**: **azul profundo + oro
como ÚNICO acento**. Ya **no hay terracota** en el portal. Los tonos propios
de cada jardín (La Paz, Porvenir) son su identidad y **no se tocan**.

## Tokens institucionales (`app/globals.css`, bloque `@theme`)

| Token                | Hex       | Rol                                                        |
|----------------------|-----------|------------------------------------------------------------|
| `azul-institucional` | `#1f3a5a` | Títulos/encabezados y acento principal                     |
| `azul-oscuro`        | `#14283f` | Hover de azul · paneles oscuros (`bg-azul-oscuro`)         |
| `azul-suave`         | `#e9eef4` | Fondos de sección con tinte litúrgico (`bg-azul-suave`)    |
| `dorado`             | `#c19a3a` | ORO · único acento (íconos, filetes, bordes), **sobre azul** |
| `dorado-oscuro`      | `#9e7c26` | Hover del oro · lema (`font-script`) sobre fondo claro      |
| `dorado-suave`       | `#f3e8cf` | Realces/fondos suaves de oro                               |
| `marron`             | `#1a1714` | Texto principal casi-negro                                 |
| `marron-suave`       | `#6b6456` | Texto secundario, metadatos                                |
| `crema`              | `#f7f2e9` | Fondo general de páginas/secciones                         |
| `arena`              | `#cdc4b4` | Bordes de tarjetas/inputs, divisores, chips                |
| `error`              | `#a4243b` | Mensajes de error y validación                             |
| `background`         | `#ffffff` | Fondo base (sin cambio)                                    |
| `foreground`         | `#1a1714` | Color de texto por defecto del `body`                      |

`terracota` `#b5544a` / `terracota-oscuro` `#9a4439`: **fuera de la paleta del
portal**. El token persiste SOLO para el badge de EVENTO de las publicaciones,
compartido con el muro de los jardines (debe verse idéntico).

## Reglas de uso

- **Títulos/encabezados** → `text-azul-institucional`.
- **Cuerpo** → `text-marron` (casi-negro) sobre `crema` o blanco; secundario
  en `text-marron-suave`.
- **Oro** → SOLO en detalles (filetes, íconos, subrayados, botones de acento),
  **preferentemente sobre azul**. El oro **no** se usa como texto de cuerpo ni
  como texto pequeño sobre fondo claro (no cumple contraste): los
  eyebrows/labels sobre fondo claro van en azul; el oro sobre claro se reserva
  a íconos y al lema grande (`font-script`, en `dorado-oscuro`).
- **Hovers** → `azul → azul-oscuro`, `dorado → dorado-oscuro`.
- **Secciones** → fondo `crema`/blanco, alternando con `azul-suave` para el
  ritmo litúrgico; paneles destacados en `azul-oscuro` con texto blanco.

## Contraste (WCAG 2.1 AA) — verificado

| Par                                   | Ratio   | Resultado |
|---------------------------------------|---------|-----------|
| azul-institucional sobre crema        | 10.4:1  | ✅ AA      |
| azul-institucional sobre blanco       | 11.6:1  | ✅ AA      |
| azul-institucional sobre azul-suave   | 9.9:1   | ✅ AA      |
| marron sobre crema                    | 16.0:1  | ✅ AA      |
| marron sobre azul-suave               | 15.3:1  | ✅ AA      |
| marron-suave sobre crema              | 5.3:1   | ✅ AA      |
| blanco sobre azul-oscuro              | 15.0:1  | ✅ AA      |
| blanco sobre azul-institucional       | 11.6:1  | ✅ AA      |
| dorado sobre azul-institucional       | 4.4:1   | ✅ (acento/gráfico ≥3) |
| dorado sobre azul-oscuro              | 5.7:1   | ✅ (acento/gráfico ≥3) |
| dorado-oscuro (lema grande) sobre crema | 3.5:1 | ✅ (texto grande ≥3) |
| error sobre blanco                    | 7.3:1   | ✅ AA      |

⚠️ **Anti-patrón**: `dorado` como texto sobre claro (≈2.4:1) NO cumple. Por eso
los eyebrows de oro sobre fondo claro se pasaron a `azul-institucional`.

## Por qué `@theme` (no `@theme inline`) + tema por jardín

Los colores se definen en un `@theme` normal para que las utilidades emitan
`var(--color-*)` y sean sobreescribibles por cascada. El `layout.tsx` de cada
jardín redeclara los **valores antiguos** de los neutros institucionales
(`--color-crema`, `--color-marron`, `--color-arena`,
`--color-azul-institucional`, …) en su contenedor, de modo que **las rutas de
jardín se ven idénticas** a antes pese al cambio de paleta global. El tema por
escuela (`--jardin-primario` / `--jardin-secundario`, leído de la BD) y
`prisma/seed.ts` no se tocan.
