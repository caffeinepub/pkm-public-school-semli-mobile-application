# Specification

## Summary
**Goal:** Replace the app’s PWA/browser icons and the two in-app logo locations (Header + Home hero) with cleanly cropped versions of the newly provided school emblem.

**Planned changes:**
- Generate new square PNG branding assets from the provided logo photos, cropping to the circular emblem with safe padding and no phone/background borders, and add them under `frontend/public/assets/generated`.
- Update `frontend/index.html` and `frontend/public/manifest.webmanifest` to reference the new 192x192 and 512x512 app icon assets instead of the current `pkm-app-icon-2026-v4` files.
- Update `frontend/src/constants/branding.ts` (`BRANDING.logoPath`) so the Header logo image and Home hero logo image render the new logo asset.

**User-visible outcome:** The browser favicon/installed PWA icon and the app’s Header + Home hero logo display the updated school emblem from the user-provided images.
