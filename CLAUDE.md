# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio single-page site for Satyam Kushwaha. Create React App (react-scripts 5.0.1), React 18, Tailwind CSS 3 alongside per-component plain CSS, axios for requests, react-icons for iconography.

## Commands

- `npm start` — dev server on http://localhost:3000
- `npm run build` — production bundle into `build/`
- `npm test` — Jest + React Testing Library in watch mode (CRA default). Run a single file with `npm test -- src/path/to/File.test.js`; run once in CI with `CI=true npm test`.

There is no separate lint script; CRA's `react-app` / `react-app/jest` ESLint config runs during `start`/`build`.

## Architecture

### Entry and layout
- [src/index.js](src/index.js) mounts `<App />` into `#root`.
- [src/App.js](src/App.js) renders a fixed `Header`, a single `Homepage`, and a `Footer`. There is no routing in use — `src/routers/PublicRouter.js` and `PrivateRouter.js` are empty stubs, and `src/pages/blog/` and `src/pages/myGallery/` are empty placeholder directories. Treat these as future scaffolding, not live features.
- The single page is assembled in [src/pages/homepage/Homepage.jsx](src/pages/homepage/Homepage.jsx), which composes `Section1` … `Section4`, `MyTech`, and `ContactMe` from [src/components/homepage-sections/](src/components/homepage-sections/). Each section is a self-contained folder with a `.jsx` and a `.css` file.

### Theming
Theming is driven by a `data-theme` attribute on `<body>` plus CSS custom properties declared in [src/index.css](src/index.css) (`--app-background`, `--app-text-color`, `--orange`, `--main-background-image-url`, `--reverse-color`, `--footer-background`). The toggle lives in [src/components/header/Header.jsx](src/components/header/Header.jsx) — it reads/writes `localStorage['theme']` via [src/config/sessions.js](src/config/sessions.js) and sets `document.body.setAttribute('data-theme', ...)`. New theme-aware styles should consume these CSS variables rather than hard-coding colors, and should not depend on a React context for theme (none exists).

### Styling conventions
Tailwind utilities and per-component CSS files are used together. Global helpers like `.container` (max-width 1240px), `.color-orange`, `.bg-orange`, `.flex-center`, `.fs-14/15/16`, and animation classes (`slide-in`, `slide-in-top`, `slide-in-left`, `slide-in-right`) are defined in [src/index.css](src/index.css) — prefer these before introducing new utilities. Tailwind content is scoped to `./src/**/*.{js,jsx,ts,tsx}` in [tailwind.config.js](tailwind.config.js).

### Config layer
- [src/config/requests.js](src/config/requests.js) wraps axios with `Get/Post/Put/Patch/Delete` and `*WithToken` variants, plus global request/response interceptors (401 triggers an `alert("authentication Fail")`). It imports `API_HOST` from `./config` — that file is currently empty, so any network call will break until `src/config/config.js` is created and exports `API_HOST`. [src/config/app.config.js](src/config/app.config.js) exists but is also effectively empty.
- [src/config/sessions.js](src/config/sessions.js) is the only approved localStorage wrapper (`setLocalStorage`, `getLocalStorage`, `clearLocalStorage`, `removeLocalStorageKey`, plus `*Obj` JSON variants). Use it instead of calling `localStorage` directly so the theme and any future auth token stay in one place.
- [src/config/constants.js](src/config/constants.js) holds static contact details used by the UI.

### Content data
Portfolio content such as the tech-stack list is hardcoded as arrays inside the section components (see `MyTechStackList` in [src/components/homepage-sections/My-tech/MyTech.jsx](src/components/homepage-sections/My-tech/MyTech.jsx)). Tech icons are looked up by filename from `public/icons/tech/` via `/icons/tech/${tech.image}` — when adding a stack entry, drop the image into that public folder with a matching filename.

### Assets
Static images (backgrounds, profile photos) live in [public/images/](public/images/) and are referenced either via absolute paths (`/images/...`) from JSX or via CSS `url('../public/images/...')` from `src/index.css`.

## Notes for edits

- Header contains a large commented-out legacy implementation below the active component — leave it unless the user asks to clean it up.
- `UpdownIcon.jsx` currently shows as modified in git; check its state before unrelated work in [src/components/logo/](src/components/logo/).
