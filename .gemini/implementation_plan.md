# Doa Detail Page — Professional Enterprise Redesign

Redesign `/doa/detail/[id]` with fully separate desktop and mobile experiences, using the existing emerald/amber design system. No blue/purple, no generic AI-look.

## Proposed Changes

### Page Component

#### [MODIFY] [\[id\].tsx](file:///d:/Projects/next/cahenomngaji/src/pages/doa/detail/[id].tsx)

Rewrite the page to use `MainLayout` with `backHref`/`backTitle` (which already provides desktop sidebar + mobile bottom nav) instead of manually embedding `HeroHeader`. Build two distinct sub-components rendered conditionally:

**Desktop layout** (`hidden lg:block`):
- Clean document-style reading layout with sidebar navigation via `MainLayout`
- Breadcrumb-style back navigation (already in `MainLayout`)
- Large centered card with generous padding and max-width constraint
- Structured sections: title badge, Arabic text in a dedicated panel with subtle border, latin transliteration, Indonesian translation — each in clearly separated sections with labels
- Floating metadata bar showing doa source info
- Professional typography with proper spacing

**Mobile layout** (`lg:hidden`):
- Full-screen immersive reading experience
- Sticky top bar with back button and title
- Stacked card sections for Arabic, latin, and translation
- Compact padding, optimized for one-hand scrolling
- Bottom padding for BottomNavbar clearance

**Shared logic:**
- Display all available `DoaDetail` fields: `judul`, `arab`, `latin`, `indo`, `doa`, `artinya`
- Skeleton loading states for both layouts
- Copy-to-clipboard button for Arabic text
- Smooth enter animations using existing CSS animation classes

---

### Styles

#### [MODIFY] [globals.css](file:///d:/Projects/next/cahenomngaji/src/styles/globals.css)

Add a few utility CSS classes:
- `.doa-panel` — styled container for Arabic text sections (subtle dark card with left accent border)
- `.section-label` — small uppercase label style for section headers
- Copy button success animation keyframe

## Verification Plan

### Browser Test
1. Run `npm run dev` (or `bun run dev`) to start the dev server
2. Navigate to `/doa/detail/1` in a desktop-sized viewport (≥1024px) — verify sidebar + document layout
3. Resize to mobile viewport (<1024px) — verify stacked card layout with sticky header
4. Confirm all data fields (Arabic, latin, translation) render correctly
5. Confirm no blue/purple colors appear
6. Confirm skeleton loading shows briefly on page load
