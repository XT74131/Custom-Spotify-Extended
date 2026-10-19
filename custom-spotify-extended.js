// NAME: Custom-Spotify-Extended
// AUTHOR: Natan
// DESCRIPTION: Customize Spotify: wallpapers, transparency, accent colors, compact panels, vinyl mode, custom bars, buttons, themes and presets.
// VERSION: 1.0.1

(function XTSpotify() {
  // Attend que Spicetify et l'interface soient prêts
  if (!window.Spicetify || !Spicetify.Platform || !document.body) {
    setTimeout(XTSpotify, 300);
    return;
  }

  const BTN_ID = "xt-spotify-gear";
  const MENU_ID = "xt-spotify-menu";
  const STYLE_ID = "xt-spotify-style";

  const GEAR_SVG = `
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
      <path d="M19.14 12.94c.04-.31.06-.62.06-.94s-.02-.63-.06-.94l2.03-1.58a.49.49 0 0 0 .12-.62l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7.03 7.03 0 0 0-1.63-.94l-.36-2.54A.48.48 0 0 0 13.92 2h-3.84a.48.48 0 0 0-.48.41l-.36 2.54c-.59.24-1.13.56-1.63.94l-2.39-.96a.49.49 0 0 0-.59.22L2.71 8.47a.48.48 0 0 0 .12.62l2.03 1.58c-.04.31-.07.63-.07.94s.02.63.06.94L2.82 14.13a.49.49 0 0 0-.12.62l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.04.7 1.63.94l.36 2.54c.05.24.25.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.63-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.62l-2.01-1.58zM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2z"/>
    </svg>`;

  // ---------- Styles ----------
  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${BTN_ID} {
        display: inline-flex; align-items: center; justify-content: center;
        width: 32px; height: 32px; margin: 0 8px;
        border: none; border-radius: 50%; cursor: pointer;
        background: rgba(0,0,0,.6); color: #b3b3b3;
        transition: color .15s, transform .3s, background .15s;
        -webkit-app-region: no-drag; flex-shrink: 0;
        position: fixed; z-index: 9999; margin: 0;
        box-shadow: 0 2px 8px rgba(0,0,0,.4);
      }
      #${BTN_ID}.xt-dragging { cursor: grabbing; transform: scale(1.15); color: #1ed760; }
      #${BTN_ID}:hover { color: #fff; background: rgba(0,0,0,.8); transform: rotate(45deg); }
      #${BTN_ID}.xt-active { color: #1ed760; }

      #${MENU_ID} {
        position: fixed; z-index: 10000; min-width: 260px;
        background: #282828; color: #fff; border-radius: 8px;
        box-shadow: 0 16px 24px rgba(0,0,0,.5);
        padding: 14px 16px; font-size: 14px;
        animation: xtFadeIn .15s ease-out;
        -webkit-app-region: no-drag;
      }
      #${MENU_ID} .xt-title {
        display: flex; align-items: center; gap: 8px;
        font-weight: 700; font-size: 16px; margin-bottom: 10px;
      }
      #${MENU_ID} .xt-title svg { color: #1ed760; }
      #${MENU_ID} .xt-lang { margin-left: auto; display: flex; background: #3e3e3e; border-radius: 999px; padding: 2px; }
      #${MENU_ID} .xt-lang button {
        background: none; border: none; color: #b3b3b3; font-size: 11px; font-weight: 700;
        padding: 3px 9px; border-radius: 999px; cursor: pointer;
      }
      #${MENU_ID} .xt-lang button:hover { color: #fff; }
      #${MENU_ID} .xt-lang button.on { background: #1ed760; color: #000; }
      #${MENU_ID} .xt-sep { height: 1px; background: rgba(255,255,255,.1); margin: 8px 0 12px; }
      #${MENU_ID} .xt-wait { color: #b3b3b3; display: flex; align-items: center; gap: 8px; }
      #${MENU_ID} .xt-dot {
        width: 8px; height: 8px; border-radius: 50%; background: #f59b23;
        animation: xtPulse 1.4s infinite;
      }
      #${MENU_ID} .xt-version { margin-top: 12px; font-size: 11px; color: #6a6a6a; }
      #${MENU_ID} .xt-hint { margin-top: 10px; font-size: 12px; color: #b3b3b3; }
      #${MENU_ID} .xt-reset {
        margin-top: 8px; background: none; border: 1px solid #535353; color: #fff;
        border-radius: 999px; padding: 4px 12px; font-size: 12px; cursor: pointer;
      }
      #${MENU_ID} .xt-reset:hover { border-color: #fff; }

      #${MENU_ID} { width: 300px; box-sizing: border-box; max-height: calc(100vh - 24px); overflow-y: auto; }
      #${MENU_ID} button, #${MENU_ID} input { font-family: inherit; }
      #${MENU_ID} .xt-section { font-weight: 700; font-size: 13px; margin: 4px 0 8px; color: #fff; }
      #${MENU_ID} .xt-row { display: flex; gap: 6px; margin-bottom: 8px; }
      #${MENU_ID} .xt-btn {
        flex: 1; background: #3e3e3e; border: none; color: #fff; border-radius: 6px;
        padding: 7px 10px; font-size: 12px; cursor: pointer; text-align: center;
      }
      #${MENU_ID} .xt-btn:hover { background: #4e4e4e; }
      #${MENU_ID} .xt-btn.xt-green { background: #1ed760; color: #000; font-weight: 700; flex: 0 0 auto; }
      #${MENU_ID} .xt-btn.xt-green:hover { background: #3be477; }
      #${MENU_ID} .xt-btn.xt-danger { background: none; border: 1px solid #535353; }
      #${MENU_ID} .xt-btn.xt-danger:hover { border-color: #f15e6c; color: #f15e6c; }
      #${MENU_ID} input[type=text] {
        flex: 1; min-width: 0; background: #121212; border: 1px solid #535353; color: #fff;
        border-radius: 6px; padding: 6px 8px; font-size: 12px; outline: none;
      }
      #${MENU_ID} input[type=text]:focus { border-color: #1ed760; }
      #${MENU_ID} .xt-slider { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #b3b3b3; margin-bottom: 6px; }
      #${MENU_ID} .xt-slider label { width: 70px; }
      #${MENU_ID} .xt-slider input { flex: 1; accent-color: #1ed760; }
      #${MENU_ID} .xt-slider span { width: 36px; text-align: right; }
      #${MENU_ID} .xt-preview {
        height: 70px; border-radius: 6px; margin-bottom: 8px; background: #121212 center/cover no-repeat;
        display: flex; align-items: center; justify-content: center; color: #6a6a6a; font-size: 12px;
      }
      #${MENU_ID} .xt-toggle { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #b3b3b3; cursor: pointer; }
      #${MENU_ID} .xt-toggle input { accent-color: #1ed760; width: 16px; height: 16px; }
      #${MENU_ID} .xt-accent-row { display: flex; gap: 12px; align-items: center; margin-bottom: 8px; }
      #${MENU_ID} .xt-accent-preview {
        width: 48px; height: 48px; border-radius: 50%; flex: none; display: flex; align-items: center; justify-content: center;
        background: #1ed760; color: #000; box-shadow: 0 4px 12px rgba(0,0,0,.4);
      }
      #${MENU_ID} .xt-colors { display: flex; align-items: center; gap: 8px; }
      #${MENU_ID} input[type=color] {
        width: 32px; height: 24px; padding: 0; border: 1px solid #535353; border-radius: 6px; background: none; cursor: pointer;
      }
      #${MENU_ID} input[type=color]:disabled { opacity: .35; cursor: default; }
      #${MENU_ID} .xt-preset { display: flex; gap: 4px; align-items: center; margin-bottom: 6px; }
      #${MENU_ID} .xt-preset input { flex: 1; min-width: 0; padding: 5px 8px !important; }
      #${MENU_ID} .xt-p-dot { width: 14px; height: 14px; border-radius: 50%; flex: none; box-shadow: 0 0 0 2px #333; }
      #${MENU_ID} .xt-p-del.confirm { background: #e81123; color: #fff; }
      #${MENU_ID} #xt-p-list { margin: 8px 0; }
      #${MENU_ID} .xt-preset.empty input { color: #6a6a6a; }
      #${MENU_ID} .xt-pbtn {
        background: #3e3e3e; border: none; color: #fff; border-radius: 6px; padding: 5px 8px;
        font-size: 11px; cursor: pointer; flex: none;
      }
      #${MENU_ID} .xt-pbtn:hover { background: #4e4e4e; }
      #${MENU_ID} .xt-pbtn:disabled { opacity: .35; cursor: default; }
      #${MENU_ID} .xt-p-save { background: #1ed760; color: #000; font-weight: 700; }
      #${MENU_ID} .xt-p-save:hover { background: #3be477; }
      #${MENU_ID} .xt-p-del:hover { color: #f15e6c; }
      #${MENU_ID} .xt-seg { display: flex; align-items: center; gap: 4px; margin-bottom: 8px; font-size: 12px; color: #b3b3b3; }
      #${MENU_ID} .xt-seg span { width: 70px; flex: none; }
      #${MENU_ID} .xt-seg button {
        flex: 1; background: #3e3e3e; border: none; color: #fff; border-radius: 6px; padding: 5px 4px; font-size: 11px; cursor: pointer;
      }
      #${MENU_ID} .xt-seg button:hover { background: #4e4e4e; }
      #${MENU_ID} .xt-seg button.on { background: #1ed760; color: #000; font-weight: 700; }
      #${MENU_ID} .xt-status { font-size: 12px; min-height: 16px; margin-bottom: 6px; }
      #${MENU_ID} .xt-status.ok { color: #1ed760; }
      #${MENU_ID} .xt-status.err { color: #f15e6c; }

      /* ----- Fond personnalisé ----- */
      #xt-top-tint { position: fixed; top: 0; left: 0; right: 0; z-index: -1; pointer-events: none; transition: background-color .15s; }
      #xt-bg-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
      #xt-bg {
        position: fixed; inset: -60px; z-index: -1; pointer-events: none;
        background: center / cover no-repeat;
        filter: blur(var(--xt-blur, 8px));
      }
      html.xt-bg-on, html.xt-bg-on body { background: transparent !important; }
      /* Les panneaux sont colorisés par le JS (style direct), sans toucher aux
         variables de couleur de Spotify (qui servent aussi aux textes et icônes). */
      .xt-sidebar { --xt-sbcol: var(--xt-sb-normal); }
      .xt-sidebar.xt-compact.xt-open { --xt-sbcol: var(--xt-sb-openc, #121212); }
      .xt-sidebar.xt-sb-tint { backdrop-filter: blur(var(--xt-sb-blur,0px)); }
      /* Calques cachés (::before / ::after) qui peignent aussi le fond de certains blocs */
      .xt-clr::before, .xt-clr::after, [data-xt-painted]::before, [data-xt-painted]::after { background-color: transparent !important; }

      /* ----- Panneau de droite compact : même principe que la bibliothèque, mais côté droit.
         Le panneau garde sa largeur réelle ; on ne laisse voir que sa bande droite. ----- */
      .xt-rpanel { --xt-rpcol: var(--xt-rp-normal); }
      .xt-rpanel.xt-rp-compact.xt-open { --xt-rpcol: var(--xt-rp-openc, #121212); }
      .xt-rpanel.xt-rp-tint { backdrop-filter: blur(var(--xt-rp-blur,0px)); }
      .xt-rpanel.xt-rp-compact {
        margin-left: calc((var(--xt-rp-mini) - var(--xt-rp-w)) * 1px) !important;
        clip-path: inset(0 0 0 calc((var(--xt-rp-w) - var(--xt-rp-mini)) * 1px) round 8px);
        transition: clip-path .25s ease, box-shadow .25s ease;
      }
      .xt-rpanel.xt-rp-compact.xt-open {
        clip-path: inset(0 0 0 -40px round 8px);
        z-index: 50 !important;
        box-shadow: -8px 0 24px rgba(0,0,0,.6);
      }

      /* ----- Bibliothèque compacte -----
         Le panneau garde toujours sa taille réelle (Spotify ne voit aucun changement),
         on masque juste la partie droite avec clip-path, qui s'ouvre au survol. */
      .xt-sidebar.xt-compact {
        --left-sidebar-width: var(--xt-sb-full) !important;
        margin-right: calc((var(--xt-sb-mini) - var(--xt-sb-full)) * 1px) !important;
        clip-path: inset(0 calc((var(--xt-sb-full) - var(--xt-sb-mini)) * 1px) 0 0 round 8px);
        transition: clip-path .25s ease, box-shadow .25s ease;
      }
      .xt-sidebar.xt-compact:not(.xt-open) > * {
        -webkit-mask-image: linear-gradient(90deg, #000 62px, transparent 70px);
      }
      .xt-sidebar.xt-compact.xt-open {
        clip-path: inset(0 -40px 0 0 round 8px);
        z-index: 50 !important;
        box-shadow: 8px 0 24px rgba(0,0,0,.6);
      }
      /* Barres collantes qui apparaissent au défilement : effet verre dépoli */
      html .xt-sticky { background-color: rgba(0,0,0,var(--xt-sticky-op,0)) !important; backdrop-filter: var(--xt-sticky-blur, none); background-image: none !important; }
      html .xt-sticky::before, html .xt-sticky::after { background-color: transparent !important; }
      /* ----- Mode vinyle ----- */
      .xt-vinyl { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; pointer-events: none; z-index: 1; }
      .xt-vinyl-disc, .xt-vinyl-shine { width: var(--d, 280px); height: var(--d, 280px); border-radius: 50%; position: absolute; flex: none; }
      .xt-vinyl { overflow: hidden; }
      .xt-vinyl.xt-vinyl-float { inset: auto; z-index: 3; overflow: visible; }
      .xt-vinyl-disc {
        background: none;
        box-shadow: 0 0 0 1.5px rgba(255,255,255,.35), 0 10px 28px rgba(0,0,0,.5);
        animation: xtSpin var(--xt-spin, 6s) linear infinite; animation-play-state: paused;
      }
      html.xt-playing .xt-vinyl-disc { animation-play-state: running; }
      .xt-vinyl-label { position: absolute; inset: 0; border-radius: 50%; background: #222 center / cover no-repeat; }
      .xt-vinyl-hole, .xt-vinyl-shine { display: none; }
      .xt-vinyl-hidden { visibility: hidden !important; }
      @keyframes xtSpin { to { transform: rotate(360deg); } }
      /* Barre de recherche et bouton Accueil transparents (fine bordure pour rester visibles) */
      html .xt-pill { background-color: rgba(0,0,0,var(--xt-pill-op,0)) !important; box-shadow: inset 0 0 0 1px rgba(255,255,255,.22) !important; }
      html .xt-pill:hover { background-color: rgba(255,255,255,.08) !important; }
      html .xt-pill:focus-within { box-shadow: inset 0 0 0 2px rgba(255,255,255,.85) !important; }
      /* ----- Barre d'avancement personnalisée ----- */
      .xt-pbar-hidden { opacity: 0 !important; }
      .xt-bar-ov { position: fixed; z-index: 60; pointer-events: none; display: none; }
      .xt-bar-ov.on { display: block; }
      .xt-pbar-track { position: absolute; left: 0; right: 0; top: 50%; transform: translateY(-50%); height: var(--h, 4px); border-radius: 99px; background: rgba(255,255,255,.22); overflow: hidden; transition: height .15s; }
      .xt-pbar-fill { height: 100%; width: 0; border-radius: 99px; background: var(--fill, #1ed760); }
      .xt-bar-ov.glow .xt-pbar-fill, .xt-pb-demo.glow .xt-pbar-fill { box-shadow: 0 0 10px var(--glow, #1ed760), 0 0 4px var(--glow, #1ed760); }
      .xt-bar-ov.glow .xt-pbar-track, .xt-pb-demo.glow .xt-pbar-track { overflow: visible; }
      .xt-bar-ov.hover .xt-pbar-track { height: calc(var(--h, 4px) + 3px); }
      .xt-pbar-lvl { display: none; }
      /* Style Minecraft (barre d'XP) */
      .xt-mc .xt-pbar-track {
        height: max(3px, var(--h, 5px)); border-radius: 0; background: #1d1d1d; box-shadow: 0 0 0 1.5px #000; overflow: hidden;
      }
      .xt-mc .xt-pbar-fill {
        border-radius: 0; background: linear-gradient(#b9ff6d 0 25%, #80ff20 25% 60%, #4ea80f 60% 100%);
      }
      .xt-mc .xt-pbar-track::after {
        content: ""; position: absolute; inset: 0; pointer-events: none;
        background: repeating-linear-gradient(to right, transparent 0 calc(var(--seg, 20px) - 1.5px), #000 calc(var(--seg, 20px) - 1.5px) var(--seg, 20px));
      }
      .xt-mc .xt-pbar-lvl {
        display: block; position: absolute; left: 50%; bottom: calc(50% + var(--h, 5px) / 2 + 2px); transform: translateX(-50%);
        font: 700 10px/1 Consolas, "Courier New", monospace; color: #80ff20; letter-spacing: 1px;
        text-shadow: 1.5px 0 #000, -1.5px 0 #000, 0 1.5px #000, 0 -1.5px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000;
      }
      .xt-pb-demo { position: relative; height: 40px; margin: 6px 4px 0; }
      .xt-pb-demo .xt-pbar-track { top: 70%; }
      /* En-têtes colorés des pages (playlists, albums…) : suivent l'opacité du fond d'écran */
      html .xt-entity { background-color: var(--xt-ent-bg, transparent) !important; background-image: none !important; }
      html .xt-entity::before, html .xt-entity::after { background: none !important; }
      /* ----- Fond de page transparent ----- */
      html .xt-mainview .xt-hide-bg { display: none !important; }
      /* ----- Mini-fenêtre ----- */
      #${MENU_ID} {
        width: min(600px, calc(100vw - 16px)); height: min(500px, calc(100vh - 16px)); max-height: none !important;
        padding: 0; display: flex; flex-direction: column; overflow: hidden; border-radius: 12px;
        background: #1c1c1c; border: 1px solid rgba(255,255,255,.08); box-shadow: 0 24px 60px rgba(0,0,0,.6);
      }
      #${MENU_ID}.xt-dragging-win { opacity: .92; }
      #${MENU_ID} #xt-win-bar {
        margin: 0; padding: 10px 12px 10px 16px; background: #252525; cursor: move; user-select: none;
        border-bottom: 1px solid rgba(255,255,255,.06); flex: none;
      }
      #${MENU_ID} #xt-win-bar em { font-style: normal; font-weight: 400; color: #8a8a8a; font-size: 13px; }
      #${MENU_ID} .xt-close {
        margin-left: 8px; width: 28px; height: 28px; border-radius: 50%; border: none; background: none;
        color: #b3b3b3; font-size: 14px; cursor: pointer;
      }
      #${MENU_ID} .xt-close:hover { background: #e81123; color: #fff; }
      #${MENU_ID} .xt-win-body { flex: 1; display: flex; min-height: 0; }
      #${MENU_ID} .xt-tabs { width: 150px; flex: none; padding: 10px 8px; background: #181818; display: flex; flex-direction: column; gap: 2px; overflow-y: auto; }
      #${MENU_ID} .xt-tabs button {
        display: flex; align-items: center; gap: 8px; text-align: left; background: none; border: none; color: #b3b3b3;
        padding: 8px 10px; border-radius: 6px; font-size: 13px; cursor: pointer;
      }
      #${MENU_ID} .xt-tabs button i { font-style: normal; width: 18px; text-align: center; }
      #${MENU_ID} .xt-tabs button:hover { background: #2a2a2a; color: #fff; }
      #${MENU_ID} .xt-tabs button.on { background: #2f2f2f; color: #fff; box-shadow: inset 3px 0 0 #1ed760; }
      #${MENU_ID} .xt-pane-wrap { flex: 1; overflow-y: auto; padding: 16px 18px; }
      #${MENU_ID} .xt-pane { display: none; }
      #${MENU_ID} .xt-pane.on { display: block; animation: xtFadeIn .15s ease-out; }
      #${MENU_ID} .xt-pane .xt-section { font-size: 15px; margin: 0 0 12px; }
      /* ----- Compatibilité Marketplace (Spotify 1.3+ n'a plus ces anciennes classes) ----- */
      .main-gridContainer-gridContainer {
        display: grid !important; gap: var(--grid-gap, 24px);
        grid-template-columns: repeat(var(--column-count, auto-fill), var(--column-width, minmax(180px, 1fr)));
        padding-bottom: 24px;
      }
      .marketplace-grid .main-card-card {
        position: relative; background: rgba(255,255,255,.04); border-radius: 8px; padding: 12px;
        cursor: pointer; transition: background-color .25s ease; isolation: isolate; min-width: 0;
      }
      .marketplace-grid .main-card-card:hover { background: rgba(255,255,255,.1); }
      .marketplace-grid .main-card-draggable { height: 100%; }
      .marketplace-grid .main-card-imageContainer { position: relative; margin-bottom: 12px; }
      .marketplace-grid .main-cardImage-imageWrapper {
        position: relative; width: 100%; padding-bottom: 100%; border-radius: 6px; overflow: hidden;
        background: #2a2a2a; box-shadow: 0 8px 24px rgba(0,0,0,.5);
      }
      .marketplace-grid .main-cardImage-imageWrapper > * { position: absolute; inset: 0; }
      .marketplace-grid .main-cardImage-imageWrapper--error { display: flex; align-items: center; justify-content: center; color: #7a7a7a; }
      .marketplace-grid .main-cardImage-imageWrapper--error svg { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 48px; height: 48px; inset: auto; }
      .marketplace-grid .main-cardImage-image, .marketplace-grid .main-image-image { width: 100%; height: 100%; object-fit: cover; object-position: center; }
      .marketplace-grid .main-card-cardMetadata { min-width: 0; }
      .marketplace-grid .main-cardHeader-link { color: var(--spice-text, #fff); text-decoration: none; display: block; overflow: hidden; }
      .marketplace-grid .main-cardHeader-text { font-size: 16px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--spice-text, #fff); }
      .marketplace-grid .main-cardSubHeader-root { color: var(--spice-subtext, #b3b3b3); font-size: 13px; margin-top: 4px; }
      .marketplace-grid .main-card-PlayButtonContainer { position: absolute; right: 8px; bottom: 8px; z-index: 2; }
      .main-type-mestoBold { font-size: 14px; font-weight: 700; }
      .main-type-balladBold { font-size: 16px; font-weight: 700; }
      .main-trackCreditsModal-closeBtn { background: none; border: none; color: var(--spice-text, #fff); cursor: pointer; padding: 4px; }
      /* En-tête collant du Marketplace : collé tout en haut (il gardait 64 px pour une ancienne barre)
         et même style que les autres barres de défilement */
      .marketplace-header { top: 0 !important; background-color: rgba(0,0,0,var(--xt-sticky-op,0)) !important; backdrop-filter: var(--xt-sticky-blur, none); }
      .xt-mkt-hide { visibility: hidden !important; }
      /* Emplacement des onglets du Marketplace (Extensions / Thèmes / Snippets…) */
      /* Onglets du Marketplace : une vraie barre de catégories collée en haut de la page */
      #xt-mkt-tabs {
        position: sticky; top: 0; z-index: 20; display: block; width: 100%; box-sizing: border-box;
        margin: 0 0 16px; padding: 12px 0; -webkit-app-region: no-drag;
        background: linear-gradient(rgba(18,18,18,.92), rgba(18,18,18,.78)); backdrop-filter: blur(12px);
        border-bottom: 1px solid rgba(255,255,255,.08);
      }
      #xt-mkt-tabs:not(:has(.marketplace-tabBar)) { display: none; }
      #xt-mkt-tabs .marketplace-tabBar-nav { width: 100%; pointer-events: auto; -webkit-app-region: no-drag; }
      #xt-mkt-tabs .marketplace-tabBar-header { display: flex; flex-wrap: nowrap; gap: 8px; margin: 0; padding: 0; list-style: none; width: 100%; }
      #xt-mkt-tabs .marketplace-tabBar-headerItem { pointer-events: auto; -webkit-app-region: no-drag; flex: none; }
      #xt-mkt-tabs .marketplace-tabBar-headerItemLink {
        margin: 0; padding: 8px 18px; border-radius: 999px; background: rgba(255,255,255,.08);
        color: #fff; transition: background-color .15s ease, color .15s ease; white-space: nowrap;
      }
      #xt-mkt-tabs .marketplace-tabBar-headerItemLink:hover { background: rgba(255,255,255,.16); }
      #xt-mkt-tabs .marketplace-tabBar-active, #xt-mkt-tabs .marketplace-tabBar-active:hover { background: var(--xt-ac-bg, var(--xt-ac1, #1ed760)) !important; color: #000 !important; }
      #xt-mkt-tabs .Dropdown-root { min-width: 110px; }
      #xt-mkt-tabs .Dropdown-control { border-radius: 999px; background: rgba(255,255,255,.08); color: #fff; padding: 8px 36px 8px 18px; cursor: pointer; }
      #xt-mkt-tabs .Dropdown-arrow { top: 15px; }
      #xt-mkt-tabs .Dropdown-menu { background: #282828; border-radius: 8px; margin-top: 4px; box-shadow: 0 8px 24px rgba(0,0,0,.5); }
      #xt-mkt-tabs .Dropdown-option { color: #ddd; }
      #xt-mkt-tabs .Dropdown-option:hover { background: rgba(255,255,255,.12); color: #fff; }
      /* ----- Thèmes (menu) ----- */
      #${MENU_ID} .xt-theme-card { display: flex; gap: 12px; align-items: center; background: #252525; border-radius: 8px; padding: 10px; margin-bottom: 8px; }
      #${MENU_ID} .xt-theme-sw { width: 54px; height: 54px; border-radius: 6px; flex: none; box-shadow: inset 0 0 0 1px rgba(255,255,255,.1); }
      #${MENU_ID} .xt-theme-txt { flex: 1; display: flex; flex-direction: column; gap: 3px; font-size: 12px; color: #b3b3b3; }
      #${MENU_ID} .xt-theme-txt b { color: #fff; font-size: 14px; }
      #${MENU_ID} .xt-theme-apply { flex: none !important; }
      #${MENU_ID} .xt-select { flex: 1; background: #3e3e3e; color: #fff; border: none; border-radius: 6px; padding: 5px 8px; font-size: 12px; }
      #${MENU_ID} .xt-theme-apply.confirm { background: #f59b23 !important; }
      /* ----- Boutons du lecteur ----- */
      .xt-ctrl { transition: scale .15s ease, translate .15s ease, rotate .2s ease, color .15s; scale: var(--xt-bscale, 1); }
      html.xt-bcolor .xt-ctrl:not(.xt-btn-play) { color: var(--xt-bcolor) !important; }
      html.xt-bcolor .xt-ctrl:not(.xt-btn-play) svg { fill: currentColor !important; color: currentColor !important; }
      html.xt-anim-bounce .xt-ctrl:hover { translate: 0 -3px; }
      html.xt-anim-pulse .xt-ctrl:hover { scale: calc(var(--xt-bscale, 1) * 1.15); }
      html.xt-anim-spin .xt-ctrl:hover { rotate: 15deg; }
      .xt-ctrl:active { scale: calc(var(--xt-bscale, 1) * .9) !important; }
      html.xt-hide-shuffle .xt-btn-shuffle, html.xt-hide-repeat .xt-btn-repeat, html.xt-hide-like .xt-btn-like { display: none !important; }
      html.xt-bshape-round .xt-btn-play, html.xt-bshape-round .xt-btn-play * { border-radius: 50% !important; }
      html.xt-bshape-square .xt-btn-play, html.xt-bshape-square .xt-btn-play * { border-radius: 3px !important; }
      html.xt-bshape-soft .xt-btn-play, html.xt-bshape-soft .xt-btn-play * { border-radius: 30% !important; }
      /* packs d'icônes : on cache l'icône de Spotify et on dessine la nôtre (couleur = couleur du bouton) */
      html.xt-icons .xt-ico { position: relative; }
      html.xt-icons .xt-ico svg { opacity: 0 !important; }
      html.xt-icons .xt-ico::after {
        content: ""; position: absolute; left: 50%; top: 50%; width: 16px; height: 16px; translate: -50% -50%;
        background-color: currentColor; pointer-events: none;
        -webkit-mask: var(--ico) center / contain no-repeat; mask: var(--ico) center / contain no-repeat;
      }
      html.xt-icons .xt-btn-play::after { background-color: var(--xt-play-ico, #000); width: 16px; height: 16px; }
      html.xt-icons .xt-btn-play { --ico: var(--xt-i-play); }
      html.xt-icons.xt-playing .xt-btn-play { --ico: var(--xt-i-pause); }
      html.xt-icons .xt-btn-prev { --ico: var(--xt-i-prev); }
      html.xt-icons .xt-btn-next { --ico: var(--xt-i-next); }
      html.xt-icons .xt-btn-shuffle { --ico: var(--xt-i-shuffle); }
      html.xt-icons .xt-btn-repeat { --ico: var(--xt-i-repeat); }
      html.xt-icons .xt-btn-like { --ico: var(--xt-i-like); }
      html.xt-icons .xt-btn-like[aria-checked="true"], html.xt-icons.xt-st-liked .xt-btn-like { --ico: var(--xt-i-likeon); color: var(--spice-button-active, #1ed760) !important; }
      /* états actifs (lus dans le lecteur Spotify) : couleur d'accent + petit point */
      html.xt-icons.xt-st-shuffle .xt-btn-shuffle, html.xt-icons.xt-st-repeat .xt-btn-repeat { color: var(--spice-button-active, #1ed760) !important; }
      html.xt-icons.xt-st-repeat1 .xt-btn-repeat { --ico: var(--xt-i-repeat1); }
      html.xt-icons.xt-st-shuffle .xt-btn-shuffle::before, html.xt-icons.xt-st-repeat .xt-btn-repeat::before {
        content: ""; position: absolute; left: 50%; bottom: 1px; width: 4px; height: 4px; translate: -50% 0;
        border-radius: 50%; background: currentColor; pointer-events: none;
      }
      html.xt-icons.xt-square .xt-btn-shuffle::before, html.xt-icons.xt-square .xt-btn-repeat::before { border-radius: 0; }
      /* ----- Style général des thèmes ----- */
      html.xt-font-pixel body, html.xt-font-pixel body *:not(#${MENU_ID}):not(#${MENU_ID} *) { font-family: "Courier New", Consolas, monospace !important; letter-spacing: .01em; }
      html.xt-font-soft body, html.xt-font-soft body *:not(#${MENU_ID}):not(#${MENU_ID} *) { font-family: "Trebuchet MS", "Segoe UI", sans-serif !important; }
      html.xt-font-impact body, html.xt-font-impact body *:not(#${MENU_ID}):not(#${MENU_ID} *) { font-family: Impact, Haettenschweiler, "Arial Black", sans-serif !important; }
      html.xt-font-tech body, html.xt-font-tech body *:not(#${MENU_ID}):not(#${MENU_ID} *) { font-family: Bahnschrift, "Segoe UI", Consolas, sans-serif !important; }
      html.xt-font-comic body, html.xt-font-comic body *:not(#${MENU_ID}):not(#${MENU_ID} *) { font-family: "Comic Sans MS", "Comic Neue", "Trebuchet MS", cursive !important; }
      html.xt-font-serif body, html.xt-font-serif body *:not(#${MENU_ID}):not(#${MENU_ID} *) { font-family: "Old English Text MT", Georgia, "Times New Roman", serif !important; }
      html.xt-square .xt-mainview *, html.xt-square .xt-sidebar *, html.xt-square .xt-rpanel *, html.xt-square .xt-mainview, html.xt-square .xt-sidebar, html.xt-square .xt-rpanel { border-radius: 0 !important; }
      html.xt-pixelbg #xt-bg { image-rendering: pixelated; }
      @keyframes xtFadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
      @keyframes xtPulse { 0%,100% { opacity: 1; } 50% { opacity: .3; } }
    `;
    document.head.appendChild(style);
  }

  // ---------- Langues ----------
  const LANG_KEY = "xt-spotify:lang";
  const I18N = {
    fr: {
      wallpaper: "Fond d'écran", noImage: "Aucune image", pickPc: "Image depuis mon PC",
      urlPh: "Lien d'une image (PNG, JPG...)", blur: "Flou", opacity: "Opacité",
      pageClear: "Fond de page transparent", bgOff: "Retirer le fond", topBar: "Barre haut", playerBar: "Lecteur", scrollBar: "Défilement", searchBar: "Recherche",
      library: "Bibliothèque", compact: "Bibliothèque compacte (s'ouvre au survol)", display: "Affichage", mNormal: "Normal", mCompact: "Compact", mHidden: "Masqué", mHint: "Compact : bande d'images, s'ouvre au survol · Masqué : invisible, s'ouvre quand la souris touche le bord de l'écran",
      rightPanel: "Panneau de droite", rpCompact: "Panneau compact (s'ouvre au survol)", vinyl: "Mode vinyle (la pochette tourne)", speed: "Vitesse",
      coverRadius: "Arrondi", titleSize: "Titre",
      accent: "Couleur des boutons", accentOn: "Couleur personnalisée", gradient: "Dégradé", angle: "Angle", accentReset: "Remettre le vert Spotify", hoverTint: "Colorer les fonds au survol", intensity: "Intensité",
      hint: "Astuce : maintiens et glisse l'engrenage pour le déplacer.",
      reset: "Remettre l'engrenage à sa place", version: "Version",
      tooLarge: "Image trop lourde, essaie une plus petite.", loading: "Chargement de l'image...",
      cantRead: "Impossible de lire cette image.", badUrl: "Colle un lien qui commence par http(s)://",
      checking: "Vérification du lien...", notImage: "Ce lien ne mène pas à une image accessible.",
      applied: "Image appliquée ✓", removed: "Fond retiré.", language: "Langue",
      presets: "Presets", presetPh: "Preset", pNew: "Nom du nouveau preset", pCreate: "＋ Créer", pUpdate: "Mettre à jour", pNone: "Aucun preset pour l'instant. Règle Custom-Spotify-Extended comme tu aimes, donne un nom et clique sur « ＋ Créer ».", pCreated: "Preset créé ✓", pUpdated: "Preset mis à jour ✓", pConfirm: "Re-cliquer pour confirmer", settings: "Paramètres", close: "Fermer", tabBtns: "Boutons", tabThemes: "Thèmes", btIcons: "Icônes", btPixel: "Pixel", btLofi: "Lofi", btShape: "Bouton lecture", shNormal: "Normal", shRound: "Rond", shSquare: "Carré", shSoft: "Doux", btSize: "Taille", btColor: "Couleur perso des icônes", btAnim: "Animation", anNone: "Aucune", anBounce: "Rebond", anPulse: "Pulse", anSpin: "Rotation", btHide: "Masquer", btShuffle: "Aléatoire", btRepeat: "Répéter", btLike: "J'aime", thTitle: "Thèmes prédéfinis", thApply: "Appliquer", thConfirm: "Confirmer ?", thApplied: "Thème appliqué ✓ (tes anciens réglages sont dans le preset « Avant thème »)", thBackup: "Avant thème", thDefault: "Spotify d'origine", thDefaultD: "Remet l'apparence de base (garde tes presets et la position des panneaux).", thMc: "Pixel", thMcD: "Paysage en blocs pixelisés, vert herbe, barres d'XP, icônes pixel, police rétro, coins carrés.", fImpact: "Impact", fTech: "Tech", fComic: "Comic", fSerif: "Gothique", thLofi: "Lofi", thLofiD: "Coucher de soleil pastel, dégradés rose et lavande, verre dépoli, icônes douces, vinyle.", thExtras: "Style général", thFont: "Police", fDefault: "Spotify", fPixel: "Pixel", fSoft: "Douce", thSquare: "Coins carrés partout", diag: "Copier le diagnostic du lecteur", diagOk: "Diagnostic copié ✓ — colle-le dans la discussion avec Claude.", thHint: "Après un thème, ajuste ce que tu veux dans les autres onglets puis sauvegarde-le en preset.", tabBar: "Barre de lecture", pbTitle: "Barre d'avancement", pbStyle: "Style", pbSpotify: "Spotify", pbCustom: "Perso", pbMc: "Pixel", pbHeight: "Épaisseur", pbGlow: "Effet lumineux", pbHint: "Clique toujours sur la barre pour avancer dans la musique. Style Pixel : le niveau affiché = les minutes écoutées.", pbColors: "Couleurs", vbTitle: "Barre de volume", vbHint: "Style Pixel : le niveau affiché = le volume en %.", tabBg: "Fond d'écran", bgSource: "Source", srcImage: "Mon image", srcCover: "Pochette", srcVideo: "Vidéo", srcHint: "Pochette : le fond devient la pochette de la musique en cours. Vidéo : la vidéo Canvas de la musique si elle en a une, sinon la pochette.", tabLib: "Bibliothèque", tabRight: "Panneau droit", tabColors: "Couleurs", tabGeneral: "Général", pSave: "Sauver", pLoad: "Charger", pDel: "Effacer", pEmpty: "vide", pSaved: "Preset sauvegardé ✓", pLoaded: "Preset chargé ✓", pNoImg: "Sauvegardé sans l'image (trop lourde pour 3 presets).", pDeleted: "Preset effacé.", pNothing: "Ce preset est vide.",
      gearTitle: "Custom-Spotify-Extended (clic : menu — maintenir et glisser : déplacer)",
    },
    en: {
      wallpaper: "Wallpaper", noImage: "No image", pickPc: "Image from my PC",
      urlPh: "Image link (PNG, JPG...)", blur: "Blur", opacity: "Opacity",
      pageClear: "Transparent page background", bgOff: "Remove background", topBar: "Top bar", playerBar: "Player", scrollBar: "Scroll bar", searchBar: "Search",
      library: "Library", compact: "Compact library (opens on hover)", display: "Display", mNormal: "Normal", mCompact: "Compact", mHidden: "Hidden", mHint: "Compact: image strip, opens on hover · Hidden: invisible, opens when the mouse touches the screen edge",
      rightPanel: "Right panel", rpCompact: "Compact panel (opens on hover)", vinyl: "Vinyl mode (spinning cover)", speed: "Speed",
      coverRadius: "Corners", titleSize: "Title",
      accent: "Button color", accentOn: "Custom color", gradient: "Gradient", angle: "Angle", accentReset: "Back to Spotify green", hoverTint: "Tint hover backgrounds", intensity: "Intensity",
      hint: "Tip: hold and drag the gear to move it.",
      reset: "Put the gear back in place", version: "Version",
      tooLarge: "Image too large, try a smaller one.", loading: "Loading image...",
      cantRead: "Unable to read this image.", badUrl: "Paste a link starting with http(s)://",
      checking: "Checking link...", notImage: "This link doesn't lead to an accessible image.",
      applied: "Image applied ✓", removed: "Background removed.", language: "Language",
      presets: "Presets", presetPh: "Preset", pNew: "New preset name", pCreate: "＋ Create", pUpdate: "Update", pNone: "No presets yet. Set up Custom-Spotify-Extended the way you like, type a name and click « ＋ Create ».", pCreated: "Preset created ✓", pUpdated: "Preset updated ✓", pConfirm: "Click again to confirm", settings: "Settings", close: "Close", tabBtns: "Buttons", tabThemes: "Themes", btIcons: "Icons", btPixel: "Pixel", btLofi: "Lofi", btShape: "Play button", shNormal: "Normal", shRound: "Round", shSquare: "Square", shSoft: "Soft", btSize: "Size", btColor: "Custom icon color", btAnim: "Animation", anNone: "None", anBounce: "Bounce", anPulse: "Pulse", anSpin: "Spin", btHide: "Hide", btShuffle: "Shuffle", btRepeat: "Repeat", btLike: "Like", thTitle: "Built-in themes", thApply: "Apply", thConfirm: "Confirm?", thApplied: "Theme applied ✓ (your previous settings are in the « Before theme » preset)", thBackup: "Before theme", thDefault: "Original Spotify", thDefaultD: "Restores the base look (keeps your presets and panel layout).", thMc: "Pixel", thMcD: "Blocky pixel landscape, grass green, XP bars, pixel icons, retro font, square corners.", fImpact: "Impact", fTech: "Tech", fComic: "Comic", fSerif: "Gothic", thLofi: "Lofi", thLofiD: "Pastel sunset, pink and lavender gradients, frosted glass, soft icons, vinyl.", thExtras: "General style", thFont: "Font", fDefault: "Spotify", fPixel: "Pixel", fSoft: "Soft", thSquare: "Square corners everywhere", diag: "Copy player diagnostic", diagOk: "Diagnostic copied ✓ — paste it in your chat with Claude.", thHint: "After a theme, tweak anything in the other tabs then save it as a preset.", tabBar: "Progress bar", pbTitle: "Progress bar", pbStyle: "Style", pbSpotify: "Spotify", pbCustom: "Custom", pbMc: "Pixel", pbHeight: "Thickness", pbGlow: "Glow effect", pbHint: "You can still click the bar to seek. Pixel style: the level shown = minutes played.", pbColors: "Colors", vbTitle: "Volume bar", vbHint: "Pixel style: the level shown = the volume in %.", tabBg: "Wallpaper", bgSource: "Source", srcImage: "My image", srcCover: "Cover art", srcVideo: "Video", srcHint: "Cover art: the background becomes the current track's cover. Video: the track's Canvas video if it has one, otherwise the cover.", tabLib: "Library", tabRight: "Right panel", tabColors: "Colors", tabGeneral: "General", pSave: "Save", pLoad: "Load", pDel: "Delete", pEmpty: "empty", pSaved: "Preset saved ✓", pLoaded: "Preset loaded ✓", pNoImg: "Saved without the image (too heavy for 3 presets).", pDeleted: "Preset deleted.", pNothing: "This preset is empty.",
      gearTitle: "Custom-Spotify-Extended (click: menu — hold and drag: move)",
    },
  };
  function getLang() {
    try { const l = Spicetify.LocalStorage.get(LANG_KEY); if (I18N[l]) return l; } catch (e) {}
    return "en";
  }
  const t = (k) => (I18N[getLang()] || I18N.en)[k] || I18N.en[k] || I18N.fr[k] || k;
  function setLang(l) {
    try { Spicetify.LocalStorage.set(LANG_KEY, l); } catch (e) {}
    const btn = document.getElementById(BTN_ID);
    if (btn) btn.title = t("gearTitle");
    // On rouvre le menu au même endroit, dans la nouvelle langue
    if (document.getElementById(MENU_ID) && btn) { closeMenu(); openMenu(btn); }
  }

  // ---------- Menu ----------
  function closeMenu() {
    const menu = document.getElementById(MENU_ID);
    if (menu) { if (menu._xtCleanup) menu._xtCleanup(); menu.remove(); }
    const btn = document.getElementById(BTN_ID);
    if (btn) btn.classList.remove("xt-active");
  }

  // ---------- Mini-fenêtre des paramètres ----------
  const WIN_KEY = "xt-spotify:window";
  function loadWin() { try { return JSON.parse(Spicetify.LocalStorage.get(WIN_KEY) || "{}"); } catch (e) { return {}; } }
  function saveWin(patch) { try { Spicetify.LocalStorage.set(WIN_KEY, JSON.stringify({ ...loadWin(), ...patch })); } catch (e) {} }
  function placeWindow(win) {
    const w = win.offsetWidth, h = win.offsetHeight, st = loadWin();
    let left = st.left, top = st.top;
    if (left == null || top == null) { left = (window.innerWidth - w) / 2; top = (window.innerHeight - h) / 2; } // centrée par défaut
    left = Math.min(Math.max(8, left), window.innerWidth - w - 8);
    top = Math.min(Math.max(8, top), window.innerHeight - h - 8);
    win.style.left = left + "px"; win.style.top = top + "px";
  }
  function bindWindow(win) {
    // Onglets
    const show = (id) => {
      win.querySelectorAll(".xt-tabs button").forEach((b) => b.classList.toggle("on", b.dataset.tab === id));
      win.querySelectorAll(".xt-pane").forEach((p) => p.classList.toggle("on", p.dataset.pane === id));
      saveWin({ tab: id });
    };
    win.querySelectorAll(".xt-tabs button").forEach((b) => b.addEventListener("click", (e) => { e.stopPropagation(); show(b.dataset.tab); }));
    show(loadWin().tab || "presets");
    // Fermer
    win.querySelector(".xt-close").addEventListener("click", (e) => { e.stopPropagation(); closeMenu(); });
    // Déplacer en tenant la barre de titre
    const bar = win.querySelector("#xt-win-bar");
    let drag = null;
    bar.addEventListener("mousedown", (e) => {
      if (e.button !== 0 || e.target.closest("button")) return;
      drag = { dx: e.clientX - win.offsetLeft, dy: e.clientY - win.offsetTop };
      win.classList.add("xt-dragging-win"); e.preventDefault();
    });
    const move = (e) => {
      if (!drag) return;
      const left = Math.min(Math.max(0, e.clientX - drag.dx), window.innerWidth - win.offsetWidth);
      const top = Math.min(Math.max(0, e.clientY - drag.dy), window.innerHeight - 40);
      win.style.left = left + "px"; win.style.top = top + "px";
    };
    const up = () => {
      if (!drag) return;
      drag = null; win.classList.remove("xt-dragging-win");
      saveWin({ left: win.offsetLeft, top: win.offsetTop });
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
    win._xtCleanup = () => { document.removeEventListener("mousemove", move); document.removeEventListener("mouseup", up); };
  }

  function openMenu(btn) {
    const menu = document.createElement("div");
    menu.id = MENU_ID;
    const TABS = [["presets", "★", t("presets")], ["themes", "✦", t("tabThemes")], ["bg", "🖼", t("tabBg")], ["lib", "☰", t("tabLib")], ["right", "◧", t("tabRight")], ["colors", "🎨", t("tabColors")], ["bar", "▬", t("tabBar")], ["btns", "⏯", t("tabBtns")], ["general", "⚙", t("tabGeneral")]];
    menu.innerHTML = `
      <div class="xt-title" id="xt-win-bar">${GEAR_SVG}<span>Custom-Spotify-Extended</span><em>${t("settings")}</em>
        <div class="xt-lang" title="${t("language")}">
          <button data-lang="fr" class="${getLang() === "fr" ? "on" : ""}">FR</button><button data-lang="en" class="${getLang() === "en" ? "on" : ""}">EN</button>
        </div>
        <button class="xt-close" title="${t("close")}">✕</button>
      </div>
      <div class="xt-win-body">
      <nav class="xt-tabs">${TABS.map(([id, ic, label]) => `<button data-tab="${id}"><i>${ic}</i>${label}</button>`).join("")}</nav>
      <div class="xt-pane-wrap">
      <div class="xt-pane" data-pane="presets">
      <div class="xt-section">${t("presets")}</div>
      <div class="xt-row">
        <input type="text" id="xt-p-newname" maxlength="32" placeholder="${t("pNew")}" />
        <button class="xt-btn xt-green" id="xt-p-create">${t("pCreate")}</button>
      </div>
      <div id="xt-p-list"></div>
      <div class="xt-status" id="xt-p-status"></div>
      </div>
      <div class="xt-pane" data-pane="bg">
      <div class="xt-section">${t("tabBg")}</div>
      <div class="xt-seg" id="xt-bg-src"><span>${t("bgSource")}</span><button data-m="image">${t("srcImage")}</button><button data-m="cover">${t("srcCover")}</button><button data-m="video">${t("srcVideo")}</button></div>
      <div class="xt-hint" style="margin:-2px 0 8px;font-size:11px">${t("srcHint")}</div>
      <div class="xt-preview" id="xt-preview">${t("noImage")}</div>
      <div id="xt-img-ctrls">
      <div class="xt-row">
        <button class="xt-btn" id="xt-pick">${t("pickPc")}</button>
      </div>
      <div class="xt-row">
        <input type="text" id="xt-url" placeholder="${t("urlPh")}" />
        <button class="xt-btn xt-green" id="xt-url-ok">OK</button>
      </div>
      </div>
      <div class="xt-status" id="xt-status"></div>
      <div class="xt-slider"><label>${t("blur")}</label><input type="range" id="xt-blur" min="0" max="40" step="1"><span id="xt-blur-v"></span></div>
      <div class="xt-slider"><label>${t("opacity")}</label><input type="range" id="xt-op" min="0" max="100" step="1"><span id="xt-op-v"></span></div>
      <div class="xt-slider"><label>${t("topBar")}</label><input type="range" id="xt-top-op" min="0" max="100" step="1"><span id="xt-top-op-v"></span></div>
      <div class="xt-slider"><label>${t("playerBar")}</label><input type="range" id="xt-pl-op" min="0" max="100" step="1"><span id="xt-pl-op-v"></span></div>
      <div class="xt-slider"><label>${t("scrollBar")}</label><input type="range" id="xt-sc-op" min="0" max="100" step="1"><span id="xt-sc-op-v"></span></div>
      <div class="xt-slider"><label>${t("searchBar")}</label><input type="range" id="xt-se-op" min="0" max="100" step="1"><span id="xt-se-op-v"></span></div>
      <label class="xt-toggle" style="margin:6px 0 4px"><input type="checkbox" id="xt-page-clear"> ${t("pageClear")}</label>
      <div class="xt-row" style="margin-top:6px"><button class="xt-btn xt-danger" id="xt-bg-off">${t("bgOff")}</button></div>
      </div>
      <div class="xt-pane" data-pane="lib">
      <div class="xt-section">${t("library")}</div>
      <div class="xt-seg" id="xt-sb-mode"><span>${t("display")}</span><button data-m="normal">${t("mNormal")}</button><button data-m="compact">${t("mCompact")}</button><button data-m="hidden">${t("mHidden")}</button></div>
      <div class="xt-slider"><label>${t("opacity")}</label><input type="range" id="xt-sb-op" min="0" max="100" step="1"><span id="xt-sb-op-v"></span></div>
      <div class="xt-slider"><label>${t("blur")}</label><input type="range" id="xt-sb-blur" min="0" max="40" step="1"><span id="xt-sb-blur-v"></span></div>
      <div class="xt-hint" style="margin-top:8px;font-size:11px">${t("mHint")}</div>
      </div>
      <div class="xt-pane" data-pane="right">
      <div class="xt-section">${t("rightPanel")}</div>
      <div class="xt-seg" id="xt-rp-mode"><span>${t("display")}</span><button data-m="normal">${t("mNormal")}</button><button data-m="compact">${t("mCompact")}</button><button data-m="hidden">${t("mHidden")}</button></div>
      <div class="xt-hint" style="margin:-2px 0 8px;font-size:11px">${t("mHint")}</div>
      <label class="xt-toggle" style="margin-bottom:8px"><input type="checkbox" id="xt-rp-vinyl"> ${t("vinyl")}</label>
      <div class="xt-slider" id="xt-rp-speed-row"><label>${t("speed")}</label><input type="range" id="xt-rp-speed" min="1" max="10" step="1"><span id="xt-rp-speed-v"></span></div>
      <div class="xt-slider"><label>${t("opacity")}</label><input type="range" id="xt-rp-op" min="0" max="100" step="1"><span id="xt-rp-op-v"></span></div>
      <div class="xt-slider"><label>${t("blur")}</label><input type="range" id="xt-rp-blur" min="0" max="40" step="1"><span id="xt-rp-blur-v"></span></div>
      <div class="xt-slider"><label>${t("coverRadius")}</label><input type="range" id="xt-rp-radius" min="0" max="50" step="1"><span id="xt-rp-radius-v"></span></div>
      <div class="xt-slider"><label>${t("titleSize")}</label><input type="range" id="xt-rp-title" min="70" max="160" step="5"><span id="xt-rp-title-v"></span></div>
      </div>
      <div class="xt-pane" data-pane="colors">
      <div class="xt-section">${t("accent")}</div>
      <div class="xt-accent-row">
        <div class="xt-accent-preview" id="xt-ac-preview"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg></div>
        <div style="flex:1">
          <label class="xt-toggle" style="margin-bottom:6px"><input type="checkbox" id="xt-ac-on"> ${t("accentOn")}</label>
          <div class="xt-colors">
            <input type="color" id="xt-ac-c1">
            <label class="xt-toggle"><input type="checkbox" id="xt-ac-grad"> ${t("gradient")}</label>
            <input type="color" id="xt-ac-c2">
          </div>
        </div>
      </div>
      <div class="xt-slider" id="xt-ac-angle-row"><label>${t("angle")}</label><input type="range" id="xt-ac-angle" min="0" max="360" step="5"><span id="xt-ac-angle-v"></span></div>
      <label class="xt-toggle" style="margin:4px 0 8px"><input type="checkbox" id="xt-ac-hover"> ${t("hoverTint")}</label>
      <div class="xt-slider" id="xt-ac-int-row"><label>${t("intensity")}</label><input type="range" id="xt-ac-int" min="10" max="80" step="5"><span id="xt-ac-int-v"></span></div>
      <div class="xt-row"><button class="xt-btn xt-danger" id="xt-ac-reset">${t("accentReset")}</button></div>
      </div>
      <div class="xt-pane" data-pane="bar">
      ${[["pb", t("pbTitle"), "3"], ["vb", t("vbTitle"), "73"]].map(([k, title, lvl]) => `
      <div class="xt-section" ${k === "vb" ? 'style="margin-top:22px"' : ""}>${title}</div>
      <div class="xt-seg" id="xt-${k}-style"><span>${t("pbStyle")}</span><button data-m="spotify">${t("pbSpotify")}</button><button data-m="custom">${t("pbCustom")}</button><button data-m="minecraft">${t("pbMc")}</button></div>
      <div id="xt-${k}-custom">
        <div class="xt-colors" style="margin-bottom:8px"><span style="width:70px;font-size:12px;color:#b3b3b3">${t("pbColors")}</span>
          <input type="color" id="xt-${k}-c1"><label class="xt-toggle"><input type="checkbox" id="xt-${k}-grad"> ${t("gradient")}</label><input type="color" id="xt-${k}-c2">
        </div>
        <label class="xt-toggle" style="margin:4px 0 8px"><input type="checkbox" id="xt-${k}-glow"> ${t("pbGlow")}</label>
      </div>
      <div class="xt-slider" id="xt-${k}-hrow"><label>${t("pbHeight")}</label><input type="range" id="xt-${k}-h" min="2" max="16" step="1"><span id="xt-${k}-h-v"></span></div>
      <div class="xt-pb-demo" id="xt-${k}-demo" ${k === "vb" ? 'style="width:160px"' : ""}><div class="xt-pbar-track"><div class="xt-pbar-fill" style="width:${k === "vb" ? 73 : 62}%"></div></div><div class="xt-pbar-lvl">${lvl}</div></div>`).join("")}
      <div class="xt-hint" style="font-size:11px;margin-top:10px">${t("pbHint")}<br>${t("vbHint")}</div>
      </div>
      <div class="xt-pane" data-pane="themes">
      <div class="xt-section">${t("thTitle")}</div>
      ${[["default", t("thDefault"), t("thDefaultD"), "linear-gradient(135deg,#121212,#1ed760)"], ["minecraft", t("thMc"), t("thMcD"), "linear-gradient(#78a7ff 0 45%,#5ca33a 45% 55%,#8a5a34 55% 80%,#7d7d7d 80%)"], ["lofi", t("thLofi"), t("thLofiD"), "linear-gradient(#1d1538,#4b2a6b 40%,#c46b9b 70%,#f7b09a)"]].map(([id, name, desc, sw]) => `
      <div class="xt-theme-card"><div class="xt-theme-sw" style="background:${sw}"></div>
        <div class="xt-theme-txt"><b>${name}</b><span>${desc}</span></div>
        <button class="xt-btn xt-green xt-theme-apply" data-theme="${id}">${t("thApply")}</button></div>`).join("")}
      <div class="xt-status" id="xt-th-status"></div>
      <div class="xt-section" style="margin-top:16px">${t("thExtras")}</div>
      <div class="xt-seg"><span>${t("thFont")}</span><select id="xt-th-font" class="xt-select">
        ${[["default", t("fDefault")], ["pixel", t("fPixel")], ["soft", t("fSoft")], ["impact", t("fImpact")], ["tech", t("fTech")], ["comic", t("fComic")], ["serif", t("fSerif")]].map(([v, l]) => `<option value="${v}">${l}</option>`).join("")}
      </select></div>
      <label class="xt-toggle" style="margin-bottom:8px"><input type="checkbox" id="xt-th-square"> ${t("thSquare")}</label>
      <div class="xt-hint" style="font-size:11px">${t("thHint")}</div>
      </div>
      <div class="xt-pane" data-pane="btns">
      <div class="xt-section">${t("tabBtns")}</div>
      <div class="xt-seg" id="xt-bt-pack"><span>${t("btIcons")}</span><button data-m="spotify">Spotify</button><button data-m="pixel">${t("btPixel")}</button><button data-m="lofi">${t("btLofi")}</button></div>
      <div class="xt-seg" id="xt-bt-shape"><span>${t("btShape")}</span><button data-m="default">${t("shNormal")}</button><button data-m="round">${t("shRound")}</button><button data-m="square">${t("shSquare")}</button><button data-m="soft">${t("shSoft")}</button></div>
      <div class="xt-slider"><label>${t("btSize")}</label><input type="range" id="xt-bt-size" min="80" max="140" step="5"><span id="xt-bt-size-v"></span></div>
      <div class="xt-colors" style="margin:4px 0 10px"><label class="xt-toggle"><input type="checkbox" id="xt-bt-colon"> ${t("btColor")}</label><input type="color" id="xt-bt-color"></div>
      <div class="xt-seg" id="xt-bt-anim"><span>${t("btAnim")}</span><button data-m="none">${t("anNone")}</button><button data-m="bounce">${t("anBounce")}</button><button data-m="pulse">${t("anPulse")}</button><button data-m="spin">${t("anSpin")}</button></div>
      <div class="xt-colors" style="margin-top:6px"><span style="width:70px;font-size:12px;color:#b3b3b3">${t("btHide")}</span>
        <label class="xt-toggle"><input type="checkbox" id="xt-bt-hshuffle"> ${t("btShuffle")}</label>
        <label class="xt-toggle"><input type="checkbox" id="xt-bt-hrepeat"> ${t("btRepeat")}</label>
        <label class="xt-toggle"><input type="checkbox" id="xt-bt-hlike"> ${t("btLike")}</label></div>
      </div>
      <div class="xt-pane" data-pane="general">
      <div class="xt-section">${t("tabGeneral")}</div>
      <div class="xt-hint">${t("hint")}</div>
      <button class="xt-reset">${t("reset")}</button>
      <div class="xt-row" style="margin-top:14px"><button class="xt-btn" id="xt-diag">${t("diag")}</button></div>
      <div class="xt-status" id="xt-diag-st"></div>
      <div class="xt-version">Custom-Spotify-Extended · ${t("version")} 1.0.1</div>
      </div>
      </div>
      </div>
      <input type="file" id="xt-file" accept="image/png,image/jpeg,image/webp,image/gif" style="display:none" />
    `;
    bindWindow(menu);
    bindPresetsMenu(menu);
    menu.querySelectorAll(".xt-lang button").forEach((b) => b.addEventListener("click", (ev) => { ev.stopPropagation(); if (b.dataset.lang !== getLang()) setLang(b.dataset.lang); }));
    menu.querySelector(".xt-reset").addEventListener("click", (ev) => { ev.stopPropagation(); resetPosition(); });
    bindBackgroundMenu(menu);
    bindSidebarMenu(menu);
    bindPageMenu(menu);
    bindSbStyleMenu(menu);
    bindRightPanelMenu(menu);
    bindAccentMenu(menu);
    BARS.forEach((bar) => bar.bindMenu(menu));
    bindButtonsMenu(menu);
    bindThemesMenu(menu);
    const dg = menu.querySelector("#xt-diag");
    if (dg) dg.addEventListener("click", async (e) => {
      e.stopPropagation();
      const txt = playerReport(), st = menu.querySelector("#xt-diag-st");
      let ok = false;
      try { await Spicetify.Platform.ClipboardAPI.copy(txt); ok = true; } catch (er) {}
      if (!ok) { try { await navigator.clipboard.writeText(txt); ok = true; } catch (er) {} }
      st.textContent = ok ? t("diagOk") : txt; st.className = "xt-status " + (ok ? "ok" : "");
      st.style.whiteSpace = ok ? "" : "pre-wrap";
    });
    document.body.appendChild(menu);

    placeWindow(menu);
    btn.classList.add("xt-active");
  }

  function toggleMenu(e) {
    e.stopPropagation();
    if (document.getElementById(MENU_ID)) closeMenu();
    else openMenu(e.currentTarget);
  }

  // Fermer en cliquant ailleurs ou avec Échap
  // (la fenêtre reste ouverte quand on clique ailleurs : on voit le résultat en direct)
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

  // ---------- Fond d'écran personnalisé ----------
  const BG_KEY = "xt-spotify:bg";          // réglages
  const BG_IMG_KEY = "xt-spotify:bg-img";  // image (lien ou image du PC)
  const BG_DEFAULT = { source: "image", enabled: false, blur: 8, opacity: 55, topOpacity: 30, playerOpacity: 55, scrollOpacity: 0, searchOpacity: 0 };

  function loadBg() {
    try { return { ...BG_DEFAULT, ...JSON.parse(Spicetify.LocalStorage.get(BG_KEY) || "{}") }; }
    catch (e) { return { ...BG_DEFAULT }; }
  }
  function saveBg(cfg) {
    try { Spicetify.LocalStorage.set(BG_KEY, JSON.stringify(cfg)); } catch (e) {}
  }
  function getBgImage() {
    try { return Spicetify.LocalStorage.get(BG_IMG_KEY) || ""; } catch (e) { return ""; }
  }
  function setBgImage(src) {
    Spicetify.LocalStorage.set(BG_IMG_KEY, src); // peut lever une erreur si trop gros
  }

  // Canvas (vidéo) de la musique en cours, repérée dans le panneau de droite de Spotify
  function canvasVideo() {
    const rp = areaCache.get("right-sidebar") || document;
    for (const v of rp.querySelectorAll("video")) {
      if (v.id === "xt-bg-video") continue;
      if (v.currentSrc || v.src || v.srcObject) return v;
    }
    return null;
  }
  // L'image (ou vidéo) à afficher en fond selon la source choisie
  function bgSourceInfo(cfg = loadBg()) {
    const src = cfg.source || "image";
    if (src === "image") return { img: getBgImage(), video: null };
    const cover = currentCoverUrl();
    if (src === "video") { const v = canvasVideo(); if (v) return { img: cover, video: v }; }
    return { img: cover, video: null };
  }
  function isBgOn(cfg = loadBg()) {
    if (!cfg.enabled) return false;
    return (cfg.source || "image") === "image" ? !!getBgImage() : true;
  }
  function applyBackground() {
    const cfg = loadBg();
    const root = document.documentElement;
    let layer = document.getElementById("xt-bg");
    if (!isBgOn(cfg)) {
      root.classList.remove("xt-bg-on");
      if (layer) layer.remove();
      applyPanels();
      return;
    }
    const { img, video } = bgSourceInfo(cfg);
    if (!layer) {
      layer = document.createElement("div");
      layer.id = "xt-bg";
      document.body.prepend(layer);
    }
    const css = img ? `url("${img.replace(/"/g, "%22")}")` : "none";
    if (layer.dataset.img !== css) { layer.dataset.img = css; layer.style.backgroundImage = css; }
    // Vidéo Canvas : notre propre lecteur, muet, en boucle (indépendant de celui de Spotify)
    let bv = document.getElementById("xt-bg-video");
    if (video) {
      if (!bv) {
        bv = document.createElement("video");
        bv.id = "xt-bg-video"; bv.muted = true; bv.loop = true; bv.autoplay = true; bv.playsInline = true;
        layer.appendChild(bv);
      }
      const url = video.currentSrc || video.src;
      if (url && !url.startsWith("blob:")) {
        if (bv.dataset.src !== url) { bv.dataset.src = url; bv.srcObject = null; bv.src = url; bv.play().catch(() => {}); }
      } else if (video.captureStream) {
        // vidéo en flux (blob) : on recopie son image en direct
        if (bv.dataset.src !== "stream:" + url) {
          try { bv.dataset.src = "stream:" + url; bv.removeAttribute("src"); bv.srcObject = video.captureStream(); bv.play().catch(() => {}); } catch (e) { bv.remove(); bv = null; }
        }
      }
    } else if (bv) bv.remove();
    root.style.setProperty("--xt-blur", cfg.blur + "px");
    root.style.setProperty("--xt-op", (cfg.opacity / 100).toFixed(2));
    root.classList.add("xt-bg-on");
    applyPanels();
  }

  // Vérifie qu'une image se charge bien
  function testImage(src) {
    return new Promise((resolve, reject) => {
      const im = new Image();
      im.onload = () => resolve(im);
      im.onerror = () => reject(new Error("load"));
      im.src = src;
    });
  }

  // Réduit une image du PC (max 2560 px) pour qu'elle tienne dans la mémoire de Spotify
  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("read"));
      reader.onload = async () => {
        try {
          const im = await testImage(reader.result);
          const MAX = 2560;
          const scale = Math.min(1, MAX / Math.max(im.width, im.height));
          const c = document.createElement("canvas");
          c.width = Math.round(im.width * scale);
          c.height = Math.round(im.height * scale);
          c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
          let q = 0.88, out = c.toDataURL("image/jpeg", q);
          while (out.length > 3_000_000 && q > 0.4) { q -= 0.12; out = c.toDataURL("image/jpeg", q); }
          resolve(out);
        } catch (e) { reject(e); }
      };
      reader.readAsDataURL(file);
    });
  }

  function bindBackgroundMenu(menu) {
    const $ = (id) => menu.querySelector("#" + id);
    const status = $("xt-status");
    const preview = $("xt-preview");
    const setStatus = (msg, type) => { status.textContent = msg; status.className = "xt-status " + (type || ""); };
    const refreshPreview = () => {
      const c = loadBg();
      const img = isBgOn(c) ? bgSourceInfo(c).img : "";
      preview.style.backgroundImage = img ? `url("${img.replace(/"/g, "%22")}")` : "";
      preview.textContent = img ? "" : t("noImage");
      $("xt-img-ctrls").style.display = (c.source || "image") === "image" ? "" : "none";
    };
    bindSeg($("xt-bg-src"), loadBg().source || "image", (m) => {
      const c = loadBg(); c.source = m; if (m !== "image") c.enabled = true; saveBg(c);
      applyBackground(); refreshPreview();
    });

    const useImage = (src, okMsg) => {
      try { setBgImage(src); }
      catch (e) { setStatus(t("tooLarge"), "err"); return; }
      const cfg = loadBg(); cfg.enabled = true; cfg.source = "image"; saveBg(cfg);
      applyBackground(); refreshPreview(); setStatus(okMsg, "ok");
    };

    // Image depuis le PC
    $("xt-pick").addEventListener("click", (e) => { e.stopPropagation(); $("xt-file").click(); });
    $("xt-file").addEventListener("change", async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      setStatus(t("loading"));
      try { useImage(await fileToDataUrl(file), t("applied")); }
      catch (err) { setStatus(t("cantRead"), "err"); }
      e.target.value = "";
    });

    // Image depuis un lien
    const applyUrl = async () => {
      const url = $("xt-url").value.trim();
      if (!/^https?:\/\/\S+$/i.test(url)) { setStatus(t("badUrl"), "err"); return; }
      setStatus(t("checking"));
      try { await testImage(url); useImage(url, t("applied")); }
      catch (err) { setStatus(t("notImage"), "err"); }
    };
    $("xt-url-ok").addEventListener("click", (e) => { e.stopPropagation(); applyUrl(); });
    $("xt-url").addEventListener("keydown", (e) => { e.stopPropagation(); if (e.key === "Enter") applyUrl(); });

    // Curseurs
    const cfg = loadBg();
    const blur = $("xt-blur"), op = $("xt-op");
    blur.value = cfg.blur; op.value = cfg.opacity;
    $("xt-blur-v").textContent = cfg.blur + "px";
    $("xt-op-v").textContent = cfg.opacity + "%";
    blur.addEventListener("input", () => {
      const c = loadBg(); c.blur = +blur.value; saveBg(c);
      $("xt-blur-v").textContent = c.blur + "px"; applyBackground();
    });
    op.addEventListener("input", () => {
      const c = loadBg(); c.opacity = +op.value; saveBg(c);
      $("xt-op-v").textContent = c.opacity + "%"; applyBackground();
    });
    for (const [id, key] of [["xt-top-op", "topOpacity"], ["xt-pl-op", "playerOpacity"], ["xt-sc-op", "scrollOpacity"], ["xt-se-op", "searchOpacity"]]) {
      const el = $(id), v = $(id + "-v");
      el.value = cfg[key]; v.textContent = cfg[key] + "%";
      el.addEventListener("input", () => {
        const c = loadBg(); c[key] = +el.value; saveBg(c);
        v.textContent = c[key] + "%"; applyPanels();
      });
    }

    // Retirer
    $("xt-bg-off").addEventListener("click", (e) => {
      e.stopPropagation();
      const c = loadBg(); c.enabled = false; saveBg(c);
      applyBackground(); refreshPreview(); setStatus(t("removed"), "ok");
    });

    refreshPreview();
  }

  // ---------- Bibliothèque compacte ----------
  const SB_KEY = "xt-spotify:compact-sidebar";
  const SB_MINI = 72;   // largeur fermée : juste les images
  const SB_FULL = 340;  // largeur ouverte au survol
  const SB_MODE_KEY = "xt-spotify:sidebar-mode"; // normal | compact | hidden
  function sbMode() {
    try {
      const m = Spicetify.LocalStorage.get(SB_MODE_KEY);
      if (m === "normal" || m === "compact" || m === "hidden") return m;
      return Spicetify.LocalStorage.get(SB_KEY) === "0" ? "normal" : "compact"; // anciens réglages
    } catch (e) { return "compact"; }
  }
  const isCompact = () => sbMode() !== "normal";

  // Trouve le panneau de gauche grâce à sa zone de grille "left-sidebar" (plus fiable que les noms de classes)
  function findSidebar() {
    const marked = document.querySelector(".xt-sidebar");
    if (marked && marked.isConnected) return marked;
    return findGridArea("left-sidebar");
  }

  // Trouve l'élément qui occupe EXACTEMENT la zone de grille demandée.
  // (Spotify a aussi des calques géants qui commencent dans une zone et en couvrent
  // plusieurs : on les ignore, sinon on peindrait par-dessus toute l'interface.)
  const MAX_H = { "global-nav": 160, "now-playing-bar": 220 };
  function findGridArea(name) {
    let level = [document.body];
    for (let depth = 0; depth < 8 && level.length; depth++) {
      const next = [];
      for (const el of level) {
        for (const child of el.children) {
          if (child.id === "xt-bg" || child.id === BTN_ID || child.id === MENU_ID) continue;
          const cs = getComputedStyle(child);
          const exact = cs.gridRowStart === name && (cs.gridRowEnd === name || cs.gridRowEnd === "auto") &&
                        cs.gridColumnStart === name;
          if (exact && (!MAX_H[name] || child.offsetHeight <= MAX_H[name])) return child;
          next.push(child);
        }
      }
      level = next;
    }
    return null;
  }

  // Si un panneau trouvé n'est plus le bon (ou a disparu), on rend l'ancien à Spotify
  function forgetArea(name) {
    const old = areaCache.get(name);
    if (old) { paintPanel(old, null); areaCache.delete(name); }
  }

  // Spotify garde en mémoire son mode "bibliothèque réduite" (images seules, pas de texte).
  // En mode compact XT, on le remet en mode normal pour avoir les textes à l'ouverture.
  let sbFixTries = 0;
  function ensureNativeLibraryExpanded() {
    const api = Spicetify.Platform && Spicetify.Platform.LocalStorageAPI;
    if (!api || !isCompact() || sbFixTries >= 3) return;
    const keys = ["left-sidebar-state", `left-sidebar-state:${screen.availWidth}x${screen.availHeight}`];
    for (const k of keys) {
      try {
        if (Number(api.getItem(k)) === 1) { // 1 = réduit
          api.setItem(k, 0);                // 0 = normal
          sbFixTries++;
        }
      } catch (e) {}
    }
  }

  let sbTimer = null;
  function setupSidebar() {
    ensureNativeLibraryExpanded();
    const sb = findSidebar();
    if (!sb) return;
    const root = document.documentElement;
    root.style.setProperty("--xt-sb-mini", SB_MINI);
    root.style.setProperty("--xt-sb-full", SB_FULL);
    sb.classList.add("xt-sidebar");
    sb.classList.toggle("xt-compact", isCompact());
    sb.classList.toggle("xt-hide", sbMode() === "hidden");
    sb.style.setProperty("--xt-sb-mini", sbMode() === "hidden" ? 0 : SB_MINI);
    applySbStyle();
    if (!isCompact()) sb.classList.remove("xt-open");
    if (sb.dataset.xtBound) return;
    sb.dataset.xtBound = "1";
    sb.addEventListener("mouseenter", () => {
      if (!sb.classList.contains("xt-compact") || sb.classList.contains("xt-hide")) return;
      clearTimeout(sbTimer);
      sbTimer = setTimeout(() => sb.classList.add("xt-open"), 120);
    });
    sb.addEventListener("mouseleave", () => {
      clearTimeout(sbTimer);
      sbTimer = setTimeout(() => {
        // Reste ouvert si un menu clic-droit est affiché
        if (document.querySelector("#context-menu, [data-tippy-root] [role=menu]")) {
          sb.dispatchEvent(new Event("mouseleave"));
          return;
        }
        sb.classList.remove("xt-open");
      }, 300);
    });
  }

  // Petits boutons Normal / Compact / Masqué
  function bindSeg(seg, current, onPick) {
    const paint = (m) => seg.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b.dataset.m === m));
    paint(current);
    seg.querySelectorAll("button").forEach((b) => b.addEventListener("click", (e) => { e.stopPropagation(); paint(b.dataset.m); onPick(b.dataset.m); }));
  }
  function bindSidebarMenu(menu) {
    bindSeg(menu.querySelector("#xt-sb-mode"), sbMode(), (m) => {
      try { Spicetify.LocalStorage.set(SB_MODE_KEY, m); } catch (e) {}
      setupSidebar();
    });
  }

  // ---------- Opacité / flou du panneau Bibliothèque ----------
  const SB_STYLE_KEY = "xt-spotify:sidebar-style";
  const SB_STYLE_DEFAULT = { opacity: 100, blur: 0 };
  function loadSbStyle() {
    try { return { ...SB_STYLE_DEFAULT, ...JSON.parse(Spicetify.LocalStorage.get(SB_STYLE_KEY) || "{}") }; }
    catch (e) { return { ...SB_STYLE_DEFAULT }; }
  }
  // Modifie un style en mémorisant la valeur d'origine, pour la rendre EXACTEMENT ensuite
  const styleKey = (prop) => "xtO" + prop.replace(/-(\w)/g, (m, c) => c.toUpperCase());
  function setStyle(el, prop, val) {
    const k = styleKey(prop);
    if (!(k in el.dataset)) el.dataset[k] = el.style.getPropertyValue(prop) + "|" + el.style.getPropertyPriority(prop);
    el.style.setProperty(prop, val, "important");
  }
  function resetStyle(el, prop) {
    const k = styleKey(prop);
    if (!(k in el.dataset)) return;
    const [v, pr] = el.dataset[k].split("|");
    if (v) el.style.setProperty(prop, v, pr); else el.style.removeProperty(prop);
    delete el.dataset[k];
  }

  // ---------- Moteur des panneaux ----------
  // On colore directement le fond des grands panneaux (bibliothèque, page, panneau de droite,
  // lecteur) et on rend transparents leurs gros blocs sombres intérieurs. On ne touche JAMAIS
  // aux variables de couleur de Spotify : elles servent aussi aux textes/icônes
  // (ex. texte du filtre « Tout », icône pause, titres qui s'estompent).
  const areaCache = new Map();
  function getArea(name) {
    const c = areaCache.get(name);
    if (c && c.isConnected) return c;
    if (c) forgetArea(name);
    const el = name === "left-sidebar" ? findSidebar() : findGridArea(name);
    if (el) areaCache.set(name, el);
    return el;
  }

  const cleared = new Map(); // panneau -> Set(blocs rendus transparents)
  function isDarkPanelColor(c, max) {
    const m = c.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?/);
    if (!m) return false;
    const a = m[4] === undefined ? 1 : +m[4];
    return a > 0.05 && +m[1] < max && +m[2] < max && +m[3] < max;
  }
  function clearBlocks(panel, max) {
    const W = panel.offsetWidth, H = panel.offsetHeight;
    if (!W) return;
    let set = cleared.get(panel);
    if (!set) cleared.set(panel, (set = new Set()));
    const minH = Math.min(120, H * 0.7);
    for (const el of panel.querySelectorAll("div, nav, section, header, aside, ul, main, footer")) {
      if (set.has(el)) continue;
      if (el.offsetWidth < W * 0.7 || el.offsetHeight < minH) continue; // seulement les grands blocs
      if (el.matches(":hover")) continue;
      const own = isDarkPanelColor(getComputedStyle(el).backgroundColor, max);
      const pseudo = isDarkPanelColor(getComputedStyle(el, "::before").backgroundColor, max) ||
                     isDarkPanelColor(getComputedStyle(el, "::after").backgroundColor, max);
      if (!own && !pseudo) continue;
      if (own) setStyle(el, "background-color", "transparent");
      if (pseudo) el.classList.add("xt-clr");
      set.add(el);
    }
  }
  function restoreBlocks(panel) {
    const set = cleared.get(panel);
    if (!set) return;
    for (const el of set) { resetStyle(el, "background-color"); el.classList.remove("xt-clr"); }
    cleared.delete(panel);
  }
  // color = null -> on rend le panneau à Spotify
  function paintPanel(panel, color, darkMax) {
    if (!panel) return;
    if (color === null) {
      if (panel.dataset.xtPainted) {
        resetStyle(panel, "background-color");
        delete panel.dataset.xtPainted;
      }
      restoreBlocks(panel);
      return;
    }
    setStyle(panel, "background-color", color);
    panel.dataset.xtPainted = "1";
    clearBlocks(panel, darkMax);
  }

  // Barres du haut et du bas : on sonde l'écran point par point pour trouver
  // TOUS les grands blocs sombres empilés sous ces barres (quel que soit leur nom)
  // et on les rend transparents, pour que le fond d'écran continue sans coupure.
  const bandCleared = new Set();
  function clearBands(keep) {
    const panels = ["main-view", "left-sidebar", "right-sidebar"].map((n) => areaCache.get(n));
    const W = window.innerWidth, H = window.innerHeight;
    const ys = [6, 24, 44, H - 50, H - 25, H - 6];
    const xs = [0.03, 0.25, 0.5, 0.75, 0.97].map((f) => Math.round(W * f));
    for (const y of ys) for (const x of xs) {
      for (const el of document.elementsFromPoint(x, y)) {
        if (el.id === "xt-bg" || el.closest("#" + MENU_ID) || el.id === BTN_ID || bandCleared.has(el) || keep.includes(el)) continue;
        if (panels.some((pn) => pn && pn !== el && pn.contains(el))) continue; // contenu des panneaux : géré ailleurs
        if (el.offsetWidth < W * 0.5) continue; // seulement les grands blocs (pas les boutons)
        const cs = getComputedStyle(el);
        const own = isDarkPanelColor(cs.backgroundColor, 45);
        const grad = cs.backgroundImage.includes("gradient");
        const pseudo = isDarkPanelColor(getComputedStyle(el, "::before").backgroundColor, 45) ||
                       isDarkPanelColor(getComputedStyle(el, "::after").backgroundColor, 45);
        if (!own && !grad && !pseudo) continue;
        if (own) setStyle(el, "background-color", "transparent");
        if (grad) setStyle(el, "background-image", "none");
        if (pseudo) el.classList.add("xt-clr");
        bandCleared.add(el);
      }
    }
  }
  function restoreBands() {
    for (const el of bandCleared) {
      resetStyle(el, "background-color");
      resetStyle(el, "background-image");
      el.classList.remove("xt-clr");
    }
    bandCleared.clear();
  }

  // Intègre au fond d'écran : (1) les barres collantes qui apparaissent quand on fait
  // défiler la page (« Tout / Musique… », barre d'actions des playlists…),
  // (2) les dégradés sombres sur les bords des carrousels.
  function isDarkish(c) { return isDarkPanelColor(c, 60); }
  const darkStop = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/g;
  // Dégradé « fondu » : va du transparent à une couleur sombre quasi opaque
  function hasDarkGradient(img) {
    if (!img.includes("gradient")) return false;
    let opaqueDark = false, clear = false;
    for (const m of img.matchAll(darkStop)) {
      const a = m[4] === undefined ? 1 : +m[4];
      if (a >= 0.9 && +m[1] < 45 && +m[2] < 45 && +m[3] < 45) opaqueDark = true;
      if (a <= 0.05) clear = true;
    }
    return opaqueDark && (clear || img.includes("transparent"));
  }
  let barChecked = new WeakSet(); // éléments déjà examinés (on ne revérifie que les nouveaux)
  function blendPageBars(mv) {
    const mr = mv.getBoundingClientRect();
    for (const el of mv.querySelectorAll("div, header, section")) {
      if (barChecked.has(el)) continue;
      const cs = getComputedStyle(el);
      if (cs.position !== "absolute" && cs.position !== "sticky" && cs.position !== "fixed") { barChecked.add(el); continue; }
      if (cs.position !== "absolute" && cs.position !== "sticky" && cs.position !== "fixed") continue;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue; // pas encore affiché : on réessaiera
      // (1) barre collante : large, peu haute, en haut de la page.
      // Spotify ne la colore qu'au moment du défilement : on la revérifie à chaque fois.
      const barShape = r.width >= mr.width * 0.7 && r.height >= 30 && r.height <= 140 && r.top - mr.top < 140;
      if (barShape) {
        const visible = (c) => {
          const m = c.match(/rgba?\(([^)]+)\)/);
          if (!m) return false;
          const parts = m[1].split(",");
          return (parts.length === 4 ? +parts[3] : 1) > 0.05;
        };
        if (visible(cs.backgroundColor) || visible(getComputedStyle(el, "::after").backgroundColor) ||
            visible(getComputedStyle(el, "::before").backgroundColor)) el.classList.add("xt-sticky");
        continue;
      }
      barChecked.add(el);
      // (2) dégradé sombre au bord d'un carrousel : étroit, haut, sans image dedans
      const par = el.parentElement && el.parentElement.getBoundingClientRect();
      const atEdge = par && (Math.abs(r.right - par.right) < 4 || Math.abs(r.left - par.left) < 4) && par.width >= r.width * 2;
      if (atEdge && r.width < 320 && r.height >= 120 && hasDarkGradient(cs.backgroundImage) && !el.querySelector("img")) {
        setStyle(el, "background-image", "none");
        el.classList.add("xt-nofade");
      }
    }
  }
  function restorePageBars(mv) {
    barChecked = new WeakSet();
    mv.querySelectorAll(".xt-sticky").forEach((el) => el.classList.remove("xt-sticky"));
    mv.querySelectorAll(".xt-nofade").forEach((el) => { resetStyle(el, "background-image"); el.classList.remove("xt-nofade"); });
  }

  // Barre de recherche + bouton Accueil : on repère les « pilules » grises de la barre du haut
  function blendTopPills(on) {
    if (!on) { document.querySelectorAll(".xt-pill").forEach((el) => el.classList.remove("xt-pill")); return; }
    const input = [...document.querySelectorAll("input")].find((i) => { const r = i.getBoundingClientRect(); return r.width > 100 && r.top >= 0 && r.bottom < 100; });
    let base = getArea("global-nav");
    if (!base && input) { base = input; for (let i = 0; i < 5 && base.parentElement; i++) base = base.parentElement; }
    if (!base) return;
    for (const el of [base, ...base.querySelectorAll("*")]) {
      if (el.classList.contains("xt-pill") || el.closest("#" + MENU_ID) || el.id === BTN_ID) continue;
      const r = el.getBoundingClientRect();
      if (r.height < 28 || r.height > 64 || r.width > 800 || r.bottom > 100 || r.top < 0) continue;
      const cs = getComputedStyle(el);
      const m = cs.backgroundColor.match(/rgba?\(([^)]+)\)/);
      if (!m) continue;
      const parts = m[1].split(",").map(Number);
      const alpha = parts.length === 4 ? parts[3] : 1;
      if (alpha < 0.05 || el.querySelector("img")) continue;          // pas de fond, ou avatar
      if (parts[0] > 200 && parts[1] > 200 && parts[2] > 200) continue; // boutons blancs : on garde
      if (parseFloat(cs.borderTopLeftRadius) < 12) continue;            // seulement les formes arrondies
      el.classList.add("xt-pill");
    }
  }

  // En-tête coloré d'une page (couleur de la playlist/de l'album, posée par Spotify sur l'élément) :
  // on garde la couleur de Spotify mais avec l'opacité du fond d'écran (0 % = transparent).
  // Convertit n'importe quelle couleur CSS (#hex, rgb…) en [r, g, b]
  const colorProbe = document.createElement("i");
  const colorCache = new Map();
  function toRgb(str) {
    if (!str) return null;
    str = str.trim();
    if (colorCache.has(str)) return colorCache.get(str);
    colorProbe.style.color = ""; colorProbe.style.color = str;
    if (!colorProbe.style.color) { colorCache.set(str, null); return null; }
    if (!colorProbe.isConnected) { colorProbe.style.display = "none"; document.body.appendChild(colorProbe); }
    const m = getComputedStyle(colorProbe).color.match(/rgba?\(([^)]+)\)/);
    const v = m ? m[1].split(",").slice(0, 3).map((x) => Math.round(parseFloat(x))) : null;
    colorCache.set(str, v);
    return v;
  }
  const sameRgb = (a, b) => a && b && Math.abs(a[0] - b[0]) < 3 && Math.abs(a[1] - b[1]) < 3 && Math.abs(a[2] - b[2]) < 3;
  // En-tête coloré d'une page (couleur de la playlist/de l'album) : Spotify la transmet par la
  // variable --background-base posée sur la section, ou directement en couleur de fond.
  // On garde la couleur mais avec l'opacité du fond d'écran (0 % = transparent).
  function tintEntityHeaders(mv, alpha) {
    const W = mv.getBoundingClientRect().width;
    const mark = (el, rgb) => {
      const val = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha.toFixed(2)})`;
      if (el.style.getPropertyValue("--xt-ent-bg") !== val) el.style.setProperty("--xt-ent-bg", val);
      el.classList.add("xt-entity");
    };
    // (a) couleur posée directement sur un grand élément
    for (const el of mv.querySelectorAll('[style*="background"]')) {
      const rgb = toRgb(el.style.backgroundColor);
      if (!rgb) continue;
      const r = el.getBoundingClientRect();
      if (r.width >= W * 0.6 && r.height >= 80) mark(el, rgb);
    }
    // (b) couleur transmise par --background-base : on cherche les grands blocs qui la peignent
    for (const host of mv.querySelectorAll('[style*="--background-base"]')) {
      const rgb = toRgb(host.style.getPropertyValue("--background-base"));
      if (!rgb) continue;
      const key = rgb.join(",");
      // nouvelle couleur (autre playlist) : on oublie les blocs marqués avec l'ancienne
      for (const el of [host, ...host.querySelectorAll(".xt-entity")]) {
        if (el.dataset.xtEnt && el.dataset.xtEnt !== key) { el.classList.remove("xt-entity"); delete el.dataset.xtEnt; }
      }
      for (const el of [host, ...host.querySelectorAll("div, section, header")]) {
        const r = el.getBoundingClientRect();
        if (r.width < W * 0.6 || r.height < 60) continue;
        if (el.classList.contains("xt-entity") && el.dataset.xtEnt === key) { mark(el, rgb); continue; }
        const cs = getComputedStyle(el);
        const own = sameRgb(toRgb(cs.backgroundColor), rgb) && !/,\s*0\)$/.test(cs.backgroundColor);
        const img = cs.backgroundImage.includes("gradient") && [...cs.backgroundImage.matchAll(/rgba?\(([^)]+)\)/g)].some((m) => sameRgb(m[1].split(",").map((x) => Math.round(parseFloat(x))), rgb));
        const pseudo = ["::before", "::after"].some((ps) => { const c = getComputedStyle(el, ps); return sameRgb(toRgb(c.backgroundColor), rgb) || c.backgroundImage.includes(`${rgb[0]}, ${rgb[1]}, ${rgb[2]}`); });
        if (own || img || pseudo) { el.dataset.xtEnt = key; mark(el, rgb); }
      }
    }
  }

  function applyPanels() {
    const bgCfg = loadBg();
    const bgOn = isBgOn(bgCfg);
    document.documentElement.style.setProperty("--xt-sticky-op", (bgCfg.scrollOpacity / 100).toFixed(2));
    document.documentElement.style.setProperty("--xt-sticky-blur", bgCfg.scrollOpacity > 0 ? "blur(16px)" : "none");
    document.documentElement.style.setProperty("--xt-pill-op", ((bgCfg.searchOpacity || 0) / 100).toFixed(2));
    blendTopPills(bgOn);
    const op = (bgCfg.opacity / 100).toFixed(2);
    const sbCfg = loadSbStyle();
    const sbTint = sbCfg.opacity < 100 || sbCfg.blur > 0;
    const root = document.documentElement;
    root.style.setProperty("--xt-sb-op", (sbCfg.opacity / 100).toFixed(2));
    root.style.setProperty("--xt-sb-blur", sbCfg.blur + "px");

    // Bibliothèque (gauche)
    const sb = getArea("left-sidebar");
    if (sb) {
      sb.classList.toggle("xt-sb-tint", sbTint);
      const normal = sbTint ? `rgba(18,18,18,${(sbCfg.opacity / 100).toFixed(2)})` : bgOn ? `rgba(18,18,18,${op})` : null;
      if (normal) {
        root.style.setProperty("--xt-sb-normal", normal);
        root.style.setProperty("--xt-sb-openc", sbTint ? normal : "#121212");
        paintPanel(sb, "var(--xt-sbcol)", 45);
      } else paintPanel(sb, null);
    }

    // Conteneur général (fond noir derrière les panneaux)
    const grid = sb && sb.parentElement;
    if (grid) {
      if (bgOn) { setStyle(grid, "background-color", "transparent"); grid.dataset.xtPainted = "1"; }
      else if (grid.dataset.xtPainted) { resetStyle(grid, "background-color"); delete grid.dataset.xtPainted; }
    }

    // Page principale
    const mv = getArea("main-view");
    if (mv) {
      mv.classList.add("xt-mainview");
      const clear = isPageClear();
      paintPanel(mv, (clear || bgOn) ? (bgOn ? `rgba(18,18,18,${op})` : "transparent") : null, 30);
      if (clear) {
        // Cache le dégradé coloré en haut des pages (ex. le rouge de l'accueil)
        for (const el of mv.querySelectorAll("div[style*='background']:not(.xt-hide-bg)")) {
          const cs = getComputedStyle(el);
          if (cs.position === "absolute" && cs.zIndex === "-1" && cs.backgroundImage.includes("gradient")) el.classList.add("xt-hide-bg");
        }
      } else {
        mv.querySelectorAll(".xt-hide-bg").forEach((el) => el.classList.remove("xt-hide-bg"));
      }
      if (clear || bgOn) { blendPageBars(mv); tintEntityHeaders(mv, bgCfg.opacity / 100); }
      else mv.querySelectorAll(".xt-entity").forEach((el) => { el.classList.remove("xt-entity"); el.style.removeProperty("--xt-ent-bg"); });
      if (!(clear || bgOn)) restorePageBars(mv);
    }

    // Panneau de droite, lecteur, barre du haut
    const rp = getArea("right-sidebar");
    if (rp) {
      const rc = loadRp();
      const rpTint = rc.opacity < 100 || rc.blur > 0;
      rp.classList.toggle("xt-rp-tint", rpTint);
      root.style.setProperty("--xt-rp-blur", rc.blur + "px");
      const normal = rpTint ? `rgba(18,18,18,${(rc.opacity / 100).toFixed(2)})` : bgOn ? `rgba(18,18,18,${op})` : null;
      if (normal) {
        root.style.setProperty("--xt-rp-normal", normal);
        root.style.setProperty("--xt-rp-openc", rpTint ? normal : "#121212");
        paintPanel(rp, "var(--xt-rpcol)", rpTint ? 45 : 30);
      } else paintPanel(rp, null);
    }
    const top = getArea("global-nav"), np = getArea("now-playing-bar");
    if (bgOn) clearBands([top, np]); else restoreBands();
    paintPanel(np, bgOn ? `rgba(0,0,0,${(bgCfg.playerOpacity / 100).toFixed(2)})` : null, 30);
    paintPanel(top, bgOn ? "transparent" : null, 30);
    // Teinte de la barre du haut : notre propre bande, posée entre le fond d'écran et
    // l'interface (ne dépend pas de la structure interne de Spotify).
    let band = document.getElementById("xt-top-tint");
    if (bgOn) {
      if (!band) {
        band = document.createElement("div");
        band.id = "xt-top-tint";
        const layer = document.getElementById("xt-bg");
        if (layer) layer.after(band); else document.body.prepend(band);
      }
      const ref = getArea("main-view") || getArea("left-sidebar");
      const h = ref ? Math.max(0, Math.round(ref.getBoundingClientRect().top)) : 64;
      band.style.height = (h > 20 && h < 200 ? h : 64) + "px";
      band.style.backgroundColor = `rgba(0,0,0,${(bgCfg.topOpacity / 100).toFixed(2)})`;
    } else if (band) band.remove();
  }
  const applySbStyle = applyPanels;

  function bindSbStyleMenu(menu) {
    const cfg = loadSbStyle();
    const op = menu.querySelector("#xt-sb-op"), bl = menu.querySelector("#xt-sb-blur");
    const opV = menu.querySelector("#xt-sb-op-v"), blV = menu.querySelector("#xt-sb-blur-v");
    op.value = cfg.opacity; bl.value = cfg.blur;
    opV.textContent = cfg.opacity + "%"; blV.textContent = cfg.blur + "px";
    const save = () => {
      const c = { opacity: +op.value, blur: +bl.value };
      try { Spicetify.LocalStorage.set(SB_STYLE_KEY, JSON.stringify(c)); } catch (e) {}
      opV.textContent = c.opacity + "%"; blV.textContent = c.blur + "px";
      applySbStyle();
    };
    op.addEventListener("input", save);
    bl.addEventListener("input", save);
  }

  // ---------- Panneau de droite ----------
  const RP_KEY = "xt-spotify:right-panel";
  const RP_DEFAULT = { mode: null, compact: true, opacity: 100, blur: 0, radius: null, title: 100, vinyl: false, speed: 5 };
  const RP_MINI = 72;
  function loadRp() {
    try { return { ...RP_DEFAULT, ...JSON.parse(Spicetify.LocalStorage.get(RP_KEY) || "{}") }; }
    catch (e) { return { ...RP_DEFAULT }; }
  }
  const rpMode = (cfg) => cfg.mode || (cfg.compact ? "compact" : "normal");
  function saveRp(cfg) { try { Spicetify.LocalStorage.set(RP_KEY, JSON.stringify(cfg)); } catch (e) {} }

  let rpTimer = null;
  function setupRightPanel() {
    const rp = getArea("right-sidebar");
    if (!rp) return;
    const cfg = loadRp();
    rp.classList.add("xt-rpanel");
    // largeur réelle du panneau (non modifiée par nous)
    const w = Math.round(rp.getBoundingClientRect().width);
    if (w > RP_MINI) rp.style.setProperty("--xt-rp-w", w);
    const mode = rpMode(cfg);
    rp.style.setProperty("--xt-rp-mini", mode === "hidden" ? 0 : RP_MINI);
    rp.classList.toggle("xt-rp-compact", mode !== "normal" && w > RP_MINI * 2);
    rp.classList.toggle("xt-hide", mode === "hidden");
    if (mode === "normal") rp.classList.remove("xt-open");
    if (!rp.dataset.xtBound) {
      rp.dataset.xtBound = "1";
      rp.addEventListener("mouseenter", () => {
        if (!rp.classList.contains("xt-rp-compact") || rp.classList.contains("xt-hide")) return;
        clearTimeout(rpTimer);
        rpTimer = setTimeout(() => rp.classList.add("xt-open"), 120);
      });
      rp.addEventListener("mouseleave", () => {
        clearTimeout(rpTimer);
        rpTimer = setTimeout(() => {
          if (document.querySelector("#context-menu, [data-tippy-root] [role=menu]")) { rp.dispatchEvent(new Event("mouseleave")); return; }
          rp.classList.remove("xt-open");
        }, 300);
      });
    }
    applyRpLook(rp, cfg);
  }

  // Apparence : arrondi de la pochette et taille du titre
  function applyRpLook(rp, cfg) {
    // Pochette = la plus grande image du panneau
    let best = null, bestArea = 0;
    for (const img of rp.querySelectorAll("img")) {
      const r = img.getBoundingClientRect();
      if (r.width * r.height > bestArea && r.width >= 100) { best = img; bestArea = r.width * r.height; }
    }
    updateVinyl(rp, best, cfg);
    rp.querySelectorAll(".xt-np-cover").forEach((el) => { if (cfg.radius === null) { el.style.removeProperty("border-radius"); el.classList.remove("xt-np-cover"); } });
    if (best && cfg.radius !== null && !cfg.vinyl) {
      const ref = best.getBoundingClientRect();
      let el = best;
      for (let i = 0; i < 5 && el && el !== rp; i++) {
        const r = el.getBoundingClientRect();
        if (Math.abs(r.width - ref.width) > 6 || Math.abs(r.height - ref.height) > 6) break;
        el.style.setProperty("border-radius", cfg.radius + "px", "important");
        el.style.setProperty("overflow", "hidden");
        el.classList.add("xt-np-cover");
        el = el.parentElement;
      }
    }
    // Titre = le texte le plus grand du panneau
    let title = rp.querySelector(".xt-np-title");
    if (!title) {
      let size = 0;
      for (const el of rp.querySelectorAll("a, span, h1, h2, h3, div")) {
        if (!el.childNodes.length || ![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
        if (!el.offsetWidth) continue;
        const fs = parseFloat(getComputedStyle(el).fontSize);
        if (fs > size) { size = fs; title = el; }
      }
      if (title && size >= 18) { title.classList.add("xt-np-title"); title.dataset.xtFs = size; }
      else title = null;
    }
    if (title) {
      const base = parseFloat(title.dataset.xtFs);
      if (cfg.title === 100) title.style.removeProperty("font-size");
      else title.style.setProperty("font-size", (base * cfg.title / 100).toFixed(1) + "px", "important");
    }
  }

  function bindRightPanelMenu(menu) {
    const cfg = loadRp();
    const $ = (id) => menu.querySelector("#" + id);
    const op = $("xt-rp-op"), bl = $("xt-rp-blur"), rad = $("xt-rp-radius"), ti = $("xt-rp-title");
    const vy = $("xt-rp-vinyl"), sp = $("xt-rp-speed");
    op.value = cfg.opacity; bl.value = cfg.blur; rad.value = cfg.radius === null ? 8 : cfg.radius; ti.value = cfg.title;
    const show = (c) => {
      $("xt-rp-op-v").textContent = c.opacity + "%";
      $("xt-rp-blur-v").textContent = c.blur + "px";
      $("xt-rp-radius-v").textContent = (c.radius === null ? 8 : c.radius) + "px";
      $("xt-rp-title-v").textContent = c.title + "%";
      vy.checked = c.vinyl; sp.value = c.speed; sp.disabled = !c.vinyl;
      $("xt-rp-speed-v").textContent = c.speed; $("xt-rp-speed-row").style.opacity = c.vinyl ? "1" : ".35";
    };
    show(cfg);
    const save = (patch) => {
      const c = { ...loadRp(), ...patch };
      saveRp(c); show(c); setupRightPanel(); applyPanels();
    };
    bindSeg($("xt-rp-mode"), rpMode(cfg), (m) => save({ mode: m }));
    op.addEventListener("input", () => save({ opacity: +op.value }));
    bl.addEventListener("input", () => save({ blur: +bl.value }));
    rad.addEventListener("input", () => save({ radius: +rad.value }));
    ti.addEventListener("input", () => save({ title: +ti.value }));
    vy.addEventListener("change", () => save({ vinyl: vy.checked }));
    sp.addEventListener("input", () => save({ speed: +sp.value }));
  }

  // ---------- Couleur des boutons (accent) ----------
  const AC_KEY = "xt-spotify:accent";
  const AC_DEFAULT = { enabled: false, c1: "#1ed760", c2: "#8a2be2", gradient: false, angle: 135, hover: true, intensity: 35 };
  function loadAc() {
    try { return { ...AC_DEFAULT, ...JSON.parse(Spicetify.LocalStorage.get(AC_KEY) || "{}") }; }
    catch (e) { return { ...AC_DEFAULT }; }
  }
  function saveAc(c) { try { Spicetify.LocalStorage.set(AC_KEY, JSON.stringify(c)); } catch (e) {} }
  const hexRgb = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  const lighten = (h, k) => { const [r, g, b] = hexRgb(h); const f = (v) => Math.round(v + (255 - v) * k); return `rgb(${f(r)},${f(g)},${f(b)})`; };
  const darken = (h, k) => { const [r, g, b] = hexRgb(h); const f = (v) => Math.round(v * (1 - k)); return `rgb(${f(r)},${f(g)},${f(b)})`; };
  const luminance = (h) => { const [r, g, b] = hexRgb(h).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
  // Icône noire sur couleur claire, blanche sur couleur foncée
  const iconColor = (c) => { const l = c.gradient ? (luminance(c.c1) + luminance(c.c2)) / 2 : luminance(c.c1); return l > 0.35 ? "#000" : "#fff"; };
  const acBackground = (c) => c.gradient ? `linear-gradient(${c.angle}deg, ${c.c1}, ${c.c2})` : c.c1;

  // Feuille de style écrite UNE seule fois ; ensuite on ne change que des variables
  // (bien plus léger pour Spotify que de réécrire toute la feuille à chaque mouvement).
  const AC_CSS = `
    :root, .encore-dark-theme, .encore-light-theme, .encore-dark-theme .encore-base-set {
      --spice-button: var(--xt-ac1) !important;
      --spice-button-active: var(--xt-ac1) !important;
      --spice-rgb-button: var(--xt-ac1-rgb) !important;
    }
    .encore-dark-theme .encore-bright-accent-set, .encore-light-theme .encore-bright-accent-set {
      --background-base: var(--xt-ac1) !important;
      --background-highlight: var(--xt-ac1-light) !important;
      --background-press: var(--xt-ac1-dark) !important;
      --background-elevated-base: var(--xt-ac1-light) !important;
      --text-base: var(--xt-ac-icon) !important;
    }
    /* Gros boutons ronds (lecture, etc.) : couleur ou dégradé */
    [class*="button-primary__inner"].encore-bright-accent-set,
    .encore-bright-accent-set [class*="button-primary__inner"] {
      background: var(--xt-ac-bg) !important;
      color: var(--xt-ac-icon) !important;
    }
    [class*="button-primary"]:hover [class*="button-primary__inner"].encore-bright-accent-set { filter: brightness(1.12); }
    /* Fonds sombres qui apparaissent au survol (cartes, albums, lignes...) */
    html.xt-ac-hover, html.xt-ac-hover .encore-dark-theme, html.xt-ac-hover .encore-dark-theme .encore-base-set {
      --background-highlight: var(--xt-hover-bg) !important;
      --background-tinted-highlight: var(--xt-hover-bg) !important;
      --background-elevated-highlight: var(--xt-hover-bg) !important;
    }
  `;
  const AC_VARS = ["--xt-ac1", "--xt-ac1-rgb", "--xt-ac1-light", "--xt-ac1-dark", "--xt-ac-icon", "--xt-ac-bg", "--xt-hover-bg"];

  function applyAccent(c = loadAc()) {
    const root = document.documentElement;
    let style = document.getElementById("xt-accent-style");
    if (!c.enabled) {
      if (style) style.remove();
      AC_VARS.forEach((v) => root.style.removeProperty(v));
      root.classList.remove("xt-ac-hover");
      return;
    }
    const [r, g, b] = hexRgb(c.c1);
    root.style.setProperty("--xt-ac1", c.c1);
    root.style.setProperty("--xt-ac1-rgb", `${r},${g},${b}`);
    root.style.setProperty("--xt-ac1-light", lighten(c.c1, 0.15));
    root.style.setProperty("--xt-ac1-dark", darken(c.c1, 0.12));
    root.style.setProperty("--xt-ac-icon", iconColor(c));
    root.style.setProperty("--xt-ac-bg", acBackground(c));
    // fond de survol = la couleur mélangée à un gris sombre (le texte reste lisible)
    const mix = c.gradient ? `color-mix(in srgb, ${c.c1} 50%, ${c.c2})` : c.c1;
    root.style.setProperty("--xt-hover-bg", `color-mix(in srgb, ${mix} ${c.intensity}%, #1a1a1a)`);
    root.classList.toggle("xt-ac-hover", !!c.hover);
    if (!style) {
      style = document.createElement("style");
      style.id = "xt-accent-style";
      style.textContent = AC_CSS;
      document.head.appendChild(style);
    }
  }

  // Au plus une mise à jour de Spotify toutes les 100 ms pendant qu'on fait glisser
  let acPending = null, acTimer = null, acLast = 0, acSaveTimer = null;
  function scheduleAccent(c) {
    acPending = c;
    const wait = 100 - (performance.now() - acLast);
    if (wait <= 0) {
      acLast = performance.now(); applyAccent(acPending); acPending = null;
    } else if (!acTimer) {
      acTimer = setTimeout(() => {
        acTimer = null; acLast = performance.now();
        if (acPending) { applyAccent(acPending); acPending = null; }
      }, wait);
    }
  }

  function bindAccentMenu(menu) {
    const $ = (id) => menu.querySelector("#" + id);
    const on = $("xt-ac-on"), c1 = $("xt-ac-c1"), c2 = $("xt-ac-c2"), grad = $("xt-ac-grad"), ang = $("xt-ac-angle");
    const hv = $("xt-ac-hover"), it = $("xt-ac-int");
    let cur = loadAc();
    const sync = (c) => {
      on.checked = c.enabled; c1.value = c.c1; c2.value = c.c2; grad.checked = c.gradient; ang.value = c.angle;
      $("xt-ac-angle-v").textContent = c.angle + "°";
      c1.disabled = grad.disabled = !c.enabled;
      c2.disabled = !c.enabled || !c.gradient;
      $("xt-ac-angle-row").style.opacity = c.enabled && c.gradient ? "1" : ".35";
      ang.disabled = !c.enabled || !c.gradient;
      hv.checked = c.hover; hv.disabled = !c.enabled;
      it.value = c.intensity; $("xt-ac-int-v").textContent = c.intensity + "%";
      it.disabled = !c.enabled || !c.hover;
      $("xt-ac-int-row").style.opacity = c.enabled && c.hover ? "1" : ".35";
      const pv = $("xt-ac-preview");
      pv.style.background = c.enabled ? acBackground(c) : "#1ed760";
      pv.style.color = c.enabled ? iconColor(c) : "#000";
    };
    sync(cur);
    // live = pendant le glissement : aperçu instantané, Spotify limité, sauvegarde différée
    const update = (patch, live) => {
      cur = { ...cur, ...patch };
      sync(cur);
      if (live) scheduleAccent(cur); else applyAccent(cur);
      clearTimeout(acSaveTimer);
      acSaveTimer = setTimeout(() => saveAc(cur), live ? 300 : 0);
    };
    on.addEventListener("change", () => update({ enabled: on.checked }));
    c1.addEventListener("input", () => update({ c1: c1.value }, true));
    c1.addEventListener("change", () => update({ c1: c1.value }));
    c2.addEventListener("input", () => update({ c2: c2.value }, true));
    c2.addEventListener("change", () => update({ c2: c2.value }));
    grad.addEventListener("change", () => update({ gradient: grad.checked }));
    ang.addEventListener("input", () => update({ angle: +ang.value }, true));
    ang.addEventListener("change", () => update({ angle: +ang.value }));
    hv.addEventListener("change", () => update({ hover: hv.checked }));
    it.addEventListener("input", () => update({ intensity: +it.value }, true));
    it.addEventListener("change", () => update({ intensity: +it.value }));
    $("xt-ac-reset").addEventListener("click", (e) => { e.stopPropagation(); update({ enabled: false }); });
    [c1, c2].forEach((el) => el.addEventListener("click", (e) => e.stopPropagation()));
  }

  // ---------- Presets (nombre illimité) ----------
  // Liste : "xt-spotify:presets" = [id, ...] ; chaque preset : "xt-spotify:preset:<id>"
  // Les images sont stockées à part ("xt-spotify:img:<empreinte>") et partagées entre presets.
  const LIST_KEY = "xt-spotify:presets";
  const P_KEY = (id) => `xt-spotify:preset:${id}`;
  const IMG_STORE = (h) => `xt-spotify:img:${h}`;
  const PRESET_KEYS = [
    "xt-spotify:bg", "xt-spotify:page-transparent", "xt-spotify:compact-sidebar", "xt-spotify:sidebar-mode",
    "xt-spotify:sidebar-style", "xt-spotify:right-panel", "xt-spotify:accent", "xt-spotify:progress", "xt-spotify:volume", "xt-spotify:buttons", "xt-spotify:theme",
  ];
  const IMG_KEY = "xt-spotify:bg-img";
  const LS = {
    get: (k) => { try { return Spicetify.LocalStorage.get(k); } catch (e) { return null; } },
    set: (k, v) => Spicetify.LocalStorage.set(k, v), // peut lever une erreur (mémoire pleine)
    del: (k) => { try { Spicetify.LocalStorage.remove ? Spicetify.LocalStorage.remove(k) : localStorage.removeItem(k); } catch (e) {} },
  };
  const hashStr = (str) => { let h = 5381; for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0; return (h >>> 0).toString(36) + str.length.toString(36); };
  function listPresets() { try { return JSON.parse(LS.get(LIST_KEY) || "[]"); } catch (e) { return []; } }
  function saveList(ids) { try { LS.set(LIST_KEY, JSON.stringify(ids)); } catch (e) {} }
  function readPreset(id) { try { return JSON.parse(LS.get(P_KEY(id)) || "null"); } catch (e) { return null; } }

  // Reprise des 3 anciens emplacements (version précédente)
  (function migrateOldPresets() {
    const ids = listPresets();
    let changed = false;
    for (let i = 0; i < 3; i++) {
      const raw = LS.get(`xt-spotify:preset-${i}`);
      if (!raw) continue;
      try {
        const old = JSON.parse(raw);
        const id = Date.now().toString(36) + i;
        const data = { name: old.name || `Preset ${i + 1}`, date: old.date || Date.now(), values: old.values || {}, img: null };
        if (old.image) { const h = hashStr(old.image); try { if (!LS.get(IMG_STORE(h))) LS.set(IMG_STORE(h), old.image); data.img = h; } catch (e) {} }
        LS.set(P_KEY(id), JSON.stringify(data));
        ids.push(id); changed = true;
        LS.del(`xt-spotify:preset-${i}`);
      } catch (e) {}
    }
    if (changed) saveList(ids);
  })();

  // Enregistre les réglages actuels dans le preset id (nouveau ou existant)
  function writePreset(id, name) {
    const prev = readPreset(id);
    const data = { name: name || (prev && prev.name) || "", date: Date.now(), values: {}, img: null };
    for (const k of PRESET_KEYS) { const v = LS.get(k); if (v != null) data.values[k] = v; }
    let result = "ok";
    const img = LS.get(IMG_KEY);
    if (img) {
      const h = hashStr(img);
      try { if (!LS.get(IMG_STORE(h))) LS.set(IMG_STORE(h), img); data.img = h; }
      catch (e) { result = "noimg"; } // mémoire pleine : preset gardé sans l'image
    }
    try { LS.set(P_KEY(id), JSON.stringify(data)); } catch (e) { return "fail"; }
    if (prev && prev.img && prev.img !== data.img) cleanupImage(prev.img);
    return result;
  }
  // Supprime une image stockée si plus aucun preset ne l'utilise
  function cleanupImage(h) {
    if (!h) return;
    if (listPresets().some((id) => { const p = readPreset(id); return p && p.img === h; })) return;
    LS.del(IMG_STORE(h));
  }
  function createPreset(name) {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const r = writePreset(id, name);
    if (r !== "fail") { const ids = listPresets(); ids.push(id); saveList(ids); }
    return r;
  }
  function loadPreset(id) {
    const data = readPreset(id);
    if (!data) return false;
    for (const k of PRESET_KEYS) {
      try { if (k in data.values) LS.set(k, data.values[k]); else LS.del(k); } catch (e) {}
    }
    if (data.img) { const img = LS.get(IMG_STORE(data.img)); if (img) { try { LS.set(IMG_KEY, img); } catch (e) {} } }
    applyBackground(); setupSidebar(); setupRightPanel(); applyPanels(); applyAccent(); applyProgress(); applyButtons(); applyThemeExtras();
    return true;
  }
  function deletePreset(id) {
    const p = readPreset(id);
    saveList(listPresets().filter((x) => x !== id));
    LS.del(P_KEY(id));
    if (p && p.img) cleanupImage(p.img);
  }

  function bindPresetsMenu(menu) {
    const list = menu.querySelector("#xt-p-list");
    const status = menu.querySelector("#xt-p-status");
    const say = (msg, type) => { status.textContent = msg; status.className = "xt-status " + (type || ""); };
    const sayResult = (r, okMsg) => r === "ok" ? say(okMsg, "ok") : r === "noimg" ? say(t("pNoImg"), "err") : say("✕", "err");
    const render = () => {
      const ids = listPresets();
      list.innerHTML = ids.length ? "" : `<div class="xt-hint" style="margin:4px 0 10px">${t("pNone")}</div>`;
      ids.forEach((id) => {
        const p = readPreset(id);
        if (!p) return;
        const row = document.createElement("div");
        row.className = "xt-preset";
        row.innerHTML = `
          <span class="xt-p-dot" style="background:${(() => { try { const a = JSON.parse(p.values["xt-spotify:accent"] || "{}"); return a.enabled ? (a.gradient ? `linear-gradient(135deg,${a.c1},${a.c2})` : a.c1) : "#1ed760"; } catch (e) { return "#1ed760"; } })()}"></span>
          <input type="text" class="xt-p-name" maxlength="32" />
          <button class="xt-pbtn xt-p-load">${t("pLoad")}</button>
          <button class="xt-pbtn xt-p-upd" title="${t("pUpdate")}">↻</button>
          <button class="xt-pbtn xt-p-del" title="${t("pDel")}">✕</button>`;
        const name = row.querySelector(".xt-p-name");
        name.value = p.name || "";
        name.addEventListener("keydown", (e) => e.stopPropagation());
        name.addEventListener("change", () => { const q = readPreset(id); if (q) { q.name = name.value.trim(); try { LS.set(P_KEY(id), JSON.stringify(q)); } catch (e) {} } });
        row.querySelector(".xt-p-load").addEventListener("click", (e) => {
          e.stopPropagation();
          if (!loadPreset(id)) { say(t("pNothing"), "err"); return; }
          const btn = document.getElementById(BTN_ID);
          closeMenu(); openMenu(btn); // la fenêtre se met à jour avec les réglages du preset
          const st = document.querySelector("#" + MENU_ID + " #xt-p-status");
          if (st) { st.textContent = t("pLoaded"); st.className = "xt-status ok"; }
        });
        row.querySelector(".xt-p-upd").addEventListener("click", (e) => { e.stopPropagation(); sayResult(writePreset(id, name.value.trim()), t("pUpdated")); render(); });
        // suppression en deux clics pour éviter les erreurs
        const del = row.querySelector(".xt-p-del");
        del.addEventListener("click", (e) => {
          e.stopPropagation();
          if (!del.classList.contains("confirm")) {
            del.classList.add("confirm"); del.textContent = "?"; say(t("pConfirm"));
            setTimeout(() => { if (del.isConnected) { del.classList.remove("confirm"); del.textContent = "✕"; } }, 2500);
            return;
          }
          deletePreset(id); render(); say(t("pDeleted"), "ok");
        });
        list.appendChild(row);
      });
    };
    render();
    const newName = menu.querySelector("#xt-p-newname");
    newName.addEventListener("keydown", (e) => { e.stopPropagation(); if (e.key === "Enter") create(); });
    const create = () => {
      const n = newName.value.trim() || `${t("presetPh")} ${listPresets().length + 1}`;
      sayResult(createPreset(n), t("pCreated"));
      newName.value = ""; render();
      const pw = menu.querySelector(".xt-pane-wrap"); if (pw) pw.scrollTop = pw.scrollHeight;
    };
    menu.querySelector("#xt-p-create").addEventListener("click", (e) => { e.stopPropagation(); create(); });
  }

  // ---------- Mode vinyle ----------
  // Remplace la pochette du panneau de droite par un disque qui tourne pendant la lecture.
  function coverHost(img) {
    // le plus grand conteneur qui a exactement la taille de la pochette
    const ref = img.getBoundingClientRect();
    let host = img.parentElement;
    for (let i = 0; i < 5 && host && host.parentElement; i++) {
      const r = host.parentElement.getBoundingClientRect();
      if (Math.abs(r.width - ref.width) > 6 || Math.abs(r.height - ref.height) > 6) break;
      host = host.parentElement;
    }
    return host;
  }
  function removeVinyl(rp) {
    rp.querySelectorAll(".xt-vinyl").forEach((v) => v.remove());
    rp.querySelectorAll(".xt-vinyl-hidden").forEach((el) => el.classList.remove("xt-vinyl-hidden"));
    rp.querySelectorAll("[data-xt-vinyl-host]").forEach((h) => { resetStyle(h, "position"); delete h.dataset.xtVinylHost; });
  }
  // Pochette du morceau en cours, lue directement dans le lecteur Spotify
  function currentCoverUrl() {
    try {
      const it = Spicetify.Player.data && (Spicetify.Player.data.item || Spicetify.Player.data.track);
      if (!it) return "";
      const md = it.metadata || {};
      let u = md.image_xlarge_url || md.image_large_url || md.image_url ||
              (it.images && it.images.length && (it.images[it.images.length - 1].url || it.images[0].url)) ||
              (it.album && it.album.images && it.album.images.length && it.album.images[0].url) || "";
      if (u.startsWith("spotify:image:")) u = "https://i.scdn.co/image/" + u.slice(14);
      return u;
    } catch (e) { return ""; }
  }
  // Emplacement de la pochette : le repère officiel de Spotify, sinon la plus grande image/vidéo
  function findCoverHost(rp, img) {
    const slot = rp.querySelector('[data-testid="cover-art-slot"]');
    if (slot && slot.offsetWidth >= 80) return slot;
    let best = img, area = img ? img.offsetWidth * img.offsetHeight : 0;
    for (const v of rp.querySelectorAll("video, canvas")) {
      const a = v.offsetWidth * v.offsetHeight;
      if (a > area && v.offsetWidth >= 100) { best = v; area = a; }
    }
    return best ? coverHost(best) : null;
  }
  // Conteneur qui défile dans le panneau (pour que le disque défile avec le contenu)
  function scrollParent(el, stop) {
    for (let e = el.parentElement; e && e !== stop.parentElement; e = e.parentElement) {
      const oy = getComputedStyle(e).overflowY;
      if ((oy === "auto" || oy === "scroll") && e.scrollHeight > e.clientHeight + 2) return e;
    }
    return null;
  }
  function makeVinylEl() {
    const v = document.createElement("div");
    v.className = "xt-vinyl";
    v.innerHTML = '<div class="xt-vinyl-disc"><div class="xt-vinyl-label"></div><div class="xt-vinyl-hole"></div></div><div class="xt-vinyl-shine"></div>';
    return v;
  }
  // Zone libre pour le disque (sous l'en-tête, au-dessus du titre) en coordonnées écran
  function vinylRegion(rp, host) {
    const hr = host.getBoundingClientRect(), pr = rp.getBoundingClientRect();
    let top = hr.top, bottom = hr.bottom;
    if (hr.top - pr.top < 24) top = Math.max(top, pr.top + 56);           // en-tête par-dessus
    const title = rp.querySelector(".xt-np-title");
    if (title && title.offsetWidth) {
      const tt = title.getBoundingClientRect().top;
      if (tt > top + 80 && tt < bottom) bottom = tt - 12;                  // titre par-dessus
    }
    const d = Math.max(60, Math.floor(Math.min(hr.width, bottom - top, pr.width - 40) - 8));
    return { left: hr.left, top, width: hr.width, height: bottom - top, d };
  }
  function updateVinyl(rp, img, cfg) {
    if (!cfg.vinyl) { removeVinyl(rp); return; }
    const host = findCoverHost(rp, img);
    if (!host) return; // panneau en cours de reconstruction : on réessaie dans 1 s
    document.documentElement.style.setProperty("--xt-spin", (12 / cfg.speed).toFixed(2) + "s");
    const sc = scrollParent(host, rp);
    let v;
    if (sc) {
      // Le disque est posé DANS le contenu qui défile, à la place de la pochette :
      // en haut il est visible, quand on fait défiler il remonte avec le reste,
      // et il ne suit pas la petite pochette animée de Spotify.
      v = sc.querySelector(":scope > .xt-vinyl");
      if (!v) {
        removeVinyl(rp);
        if (getComputedStyle(sc).position === "static") setStyle(sc, "position", "relative");
        sc.dataset.xtVinylHost = "1";
        v = makeVinylEl();
        v.classList.add("xt-vinyl-float");
        sc.appendChild(v);
        delete v.dataset.placed;
      }
      host.classList.add("xt-vinyl-hidden"); // la pochette de Spotify (grande ou réduite) est cachée
      if (sc.scrollTop < 4 || !v.dataset.placed) {
        // on mesure seulement quand le panneau est tout en haut (pochette à sa taille normale)
        if (sc.scrollTop < 4) {
          const R = vinylRegion(rp, host), sr = sc.getBoundingClientRect();
          v.style.left = Math.round(R.left - sr.left + sc.scrollLeft) + "px";
          v.style.top = Math.round(R.top - sr.top + sc.scrollTop) + "px";
          v.style.width = Math.round(R.width) + "px";
          v.style.height = Math.round(R.height) + "px";
          v.style.setProperty("--d", R.d + "px");
          v.dataset.placed = "1";
        }
      }
    } else {
      // Pas de défilement (ex. vidéo Canvas plein panneau) : disque dans l'emplacement
      v = host.querySelector(":scope > .xt-vinyl");
      if (!v) {
        removeVinyl(rp);
        if (getComputedStyle(host).position === "static") setStyle(host, "position", "relative");
        host.dataset.xtVinylHost = "1";
        v = makeVinylEl();
        host.appendChild(v);
      }
      for (const el of host.querySelectorAll("img")) if (!v.contains(el)) el.classList.add("xt-vinyl-hidden");
      const R = vinylRegion(rp, host), hr = host.getBoundingClientRect();
      v.style.setProperty("--d", R.d + "px");
      v.style.top = Math.round(R.top - hr.top) + "px";
      v.style.height = Math.round(R.height) + "px";
      v.style.bottom = "auto";
    }
    // TOUTES les vidéos (Canvas) du panneau sont cachées : image seulement
    const keepPlaying = (loadBg().source === "video");
    for (const el of rp.querySelectorAll("video, canvas")) { el.classList.add("xt-vinyl-hidden"); try { if (el.tagName === "VIDEO" && !el.paused && !keepPlaying) el.pause(); } catch (e) {} }
    const src = currentCoverUrl() || (img && (img.currentSrc || img.src)) || "";
    const label = v.querySelector(".xt-vinyl-label");
    if (src && label.dataset.src !== src) { label.dataset.src = src; label.style.backgroundImage = `url("${src}")`; }
  }
  // Changement de morceau : on remet le vinyle tout de suite (puis encore une fois après le rendu)
  try {
    Spicetify.Player.addEventListener("songchange", () => {
      [80, 400, 1200].forEach((d) => setTimeout(() => { try { setupRightPanel(); if ((loadBg().source || "image") !== "image") applyBackground(); } catch (e) {} }, d));
    });
  } catch (e) {}

  // Lecture / pause : le disque tourne seulement pendant la lecture
  function syncPlaying() {
    let playing = false;
    try { playing = !!(Spicetify.Player && (Spicetify.Player.isPlaying ? Spicetify.Player.isPlaying() : Spicetify.Player.data && !Spicetify.Player.data.isPaused)); } catch (e) {}
    document.documentElement.classList.toggle("xt-playing", playing);
  }
  try { Spicetify.Player.addEventListener("onplaypause", () => setTimeout(syncPlaying, 50)); } catch (e) {}

  // ---------- Mode « Masqué » : ouverture au bord de l'écran ----------
  const EDGE = 10; // px depuis le bord de la fenêtre
  const edgeTimers = { left: null, right: null };
  const ctxMenuOpen = () => !!document.querySelector("#context-menu, [data-tippy-root] [role=menu]");
  function handleEdge(side, e) {
    const el = document.querySelector(side === "left" ? ".xt-sidebar.xt-hide" : ".xt-rpanel.xt-hide");
    if (!el) return;
    const r = el.getBoundingClientRect();
    const inV = e.clientY >= r.top && e.clientY <= r.bottom;
    const atEdge = side === "left" ? e.clientX <= EDGE : e.clientX >= window.innerWidth - EDGE;
    const open = el.classList.contains("xt-open");
    if (atEdge && inV) {
      clearTimeout(edgeTimers[side]); edgeTimers[side] = null;
      if (!open) el.classList.add("xt-open");
      return;
    }
    if (!open) return;
    const inside = inV && e.clientX >= r.left - 6 && e.clientX <= r.right + 6;
    if (inside) { clearTimeout(edgeTimers[side]); edgeTimers[side] = null; return; }
    if (edgeTimers[side]) return;
    const tryClose = () => {
      if (ctxMenuOpen()) { edgeTimers[side] = setTimeout(tryClose, 300); return; } // menu clic-droit ouvert : on attend
      edgeTimers[side] = null;
      el.classList.remove("xt-open");
    };
    edgeTimers[side] = setTimeout(tryClose, 300);
  }
  let edgeRaf = 0;
  document.addEventListener("mousemove", (e) => {
    if (edgeRaf) return;
    edgeRaf = requestAnimationFrame(() => { edgeRaf = 0; handleEdge("left", e); handleEdge("right", e); });
  }, { passive: true });

  // ---------- Barres personnalisées (avancement + volume) ----------
  // On dessine NOTRE barre par-dessus celle de Spotify (rendue invisible mais toujours
  // cliquable en dessous : on peut toujours avancer dans la musique / régler le volume).
  const pbFill = (c) => c.gradient ? `linear-gradient(90deg, ${c.c1}, ${c.c2})` : c.c1;
  function stylePbElement(el, c) {
    el.classList.toggle("xt-mc", c.style === "minecraft");
    el.classList.toggle("glow", c.style === "custom" && c.glow);
    el.style.setProperty("--h", c.height + "px");
    el.style.setProperty("--fill", pbFill(c));
    el.style.setProperty("--glow", c.gradient ? c.c2 : c.c1);
  }
  // Lignes fines sans texte dans le lecteur
  function thinLines(np) {
    const out = [];
    for (const el of np.querySelectorAll("div")) {
      const r = el.getBoundingClientRect();
      if (r.height < 2 || r.height > 14 || r.width < 40) continue;
      if (el.textContent.trim()) continue; // pas les rangées avec du texte (temps, etc.)
      out.push([el, r]);
    }
    return out;
  }
  // la plus large ; à largeur égale, la plus fine (la vraie ligne, pas sa zone cliquable)
  function widest(list) {
    let best = null, bw = 0, bh = 99;
    for (const [el, r] of list) if (r.width > bw + 1 || (Math.abs(r.width - bw) <= 1 && r.height < bh)) { best = el; bw = r.width; bh = r.height; }
    return best;
  }
  function makeBar({ key, defaults, find, value, level, segments }) {
    let track = null, found = 0, raf = 0, cfg = null, ov = null;
    const load = () => { try { return { ...defaults, ...JSON.parse(Spicetify.LocalStorage.get(key) || "{}") }; } catch (e) { return { ...defaults }; } };
    const save = (c) => { try { Spicetify.LocalStorage.set(key, JSON.stringify(c)); } catch (e) {} };
    function frame() {
      raf = 0;
      if (!cfg || cfg.style === "spotify" || !ov) return;
      if (!track || !track.isConnected || performance.now() - found > 2000) {
        const np = getArea("now-playing-bar");
        const tr = np ? find(np) : null;
        if (tr !== track) { if (track) track.classList.remove("xt-pbar-hidden"); track = tr; }
        found = performance.now();
      }
      if (track) {
        track.classList.add("xt-pbar-hidden");
        const r = track.getBoundingClientRect();
        ov.classList.add("on");
        ov.style.left = r.left + "px"; ov.style.width = r.width + "px";
        ov.style.top = (r.top + r.height / 2 - 20) + "px"; ov.style.height = "40px";
        ov.querySelector(".xt-pbar-fill").style.width = (value() * 100).toFixed(2) + "%";
        if (cfg.style === "minecraft") {
          ov.style.setProperty("--seg", (r.width / segments).toFixed(2) + "px");
          const L = ov.querySelector(".xt-pbar-lvl"), lv = String(level());
          if (L.textContent !== lv) L.textContent = lv;
        }
        ov.classList.toggle("hover", !!(track.parentElement && track.parentElement.matches(":hover")));
      } else ov.classList.remove("on");
      raf = requestAnimationFrame(frame);
    }
    function apply(c = load()) {
      cfg = c;
      if (c.style === "spotify") {
        if (ov) { ov.remove(); ov = null; }
        if (track) track.classList.remove("xt-pbar-hidden");
        track = null;
        return;
      }
      if (!ov) {
        ov = document.createElement("div");
        ov.className = "xt-bar-ov";
        ov.innerHTML = '<div class="xt-pbar-track"><div class="xt-pbar-fill"></div></div><div class="xt-pbar-lvl">0</div>';
        document.body.appendChild(ov);
      }
      stylePbElement(ov, c);
      if (!raf) raf = requestAnimationFrame(frame);
    }
    function bindMenu(menu, k = key.endsWith("volume") ? "vb" : "pb") {
      const $ = (id) => menu.querySelector(`#xt-${k}-${id}`);
      const c1 = $("c1"), c2 = $("c2"), grad = $("grad"), h = $("h"), glow = $("glow"), demo = $("demo");
      if (!c1) return;
      let cur = load();
      const sync = (c) => {
        c1.value = c.c1; c2.value = c.c2; grad.checked = c.gradient; h.value = c.height; glow.checked = c.glow;
        c2.disabled = !c.gradient; $("h-v").textContent = c.height + "px";
        $("custom").style.display = c.style === "custom" ? "" : "none";
        $("hrow").style.display = c.style === "spotify" ? "none" : "";
        demo.style.display = c.style === "spotify" ? "none" : "";
        stylePbElement(demo, c);
        demo.style.setProperty("--seg", ((demo.offsetWidth || 400) / segments).toFixed(2) + "px");
      };
      sync(cur);
      const update = (patch) => { cur = { ...cur, ...patch }; sync(cur); apply(cur); save(cur); };
      bindSeg($("style"), cur.style, (m) => update({ style: m }));
      c1.addEventListener("input", () => update({ c1: c1.value }));
      c2.addEventListener("input", () => update({ c2: c2.value }));
      grad.addEventListener("change", () => update({ gradient: grad.checked }));
      h.addEventListener("input", () => update({ height: +h.value }));
      glow.addEventListener("change", () => update({ glow: glow.checked }));
      [c1, c2].forEach((el) => el.addEventListener("click", (e) => e.stopPropagation()));
    }
    return { apply, bindMenu, key };
  }

  // Barre d'avancement : la plus large ligne fine du lecteur
  const progressBar = makeBar({
    key: "xt-spotify:progress",
    defaults: { style: "spotify", c1: "#1ed760", c2: "#8a2be2", gradient: true, height: 5, glow: true },
    find: (np) => { const W = np.getBoundingClientRect().width; return widest(thinLines(np).filter(([, r]) => r.width >= W * 0.2)); },
    value: () => {
      try {
        if (Spicetify.Player.getProgressPercent) return Math.min(1, Math.max(0, Spicetify.Player.getProgressPercent()));
        const d = Spicetify.Player.getDuration(); return d ? Spicetify.Player.getProgress() / d : 0;
      } catch (e) { return 0; }
    },
    level: () => { try { return Math.floor(Spicetify.Player.getProgress() / 60000); } catch (e) { return 0; } },
    segments: 18,
  });
  // Barre de volume : ligne fine dans le tiers droit du lecteur, plus courte
  const volumeBar = makeBar({
    key: "xt-spotify:volume",
    defaults: { style: "spotify", c1: "#1ed760", c2: "#8a2be2", gradient: true, height: 5, glow: true },
    find: (np) => {
      const R = np.getBoundingClientRect();
      return widest(thinLines(np).filter(([, r]) => r.left > R.left + R.width * 0.66 && r.width < R.width * 0.2 && r.width <= 220));
    },
    value: () => { try { return Math.min(1, Math.max(0, Spicetify.Player.getVolume())); } catch (e) { return 0; } },
    level: () => { try { return Math.round(Spicetify.Player.getVolume() * 100); } catch (e) { return 0; } },
    segments: 10,
  });
  const BARS = [progressBar, volumeBar];
  const applyProgress = () => BARS.forEach((b) => b.apply());

  // ---------- Compatibilité Marketplace ----------
  // Le Marketplace attend d'anciennes zones de Spotify qui n'existent plus en 1.3 :
  // la zone d'onglets de la barre du haut et la zone de défilement de la page.
  function onMarketplace() {
    try { if ((Spicetify.Platform.History.location.pathname || "").startsWith("/marketplace")) return true; } catch (e) {}
    return !!document.querySelector(".marketplace-grid, .marketplace-header, #marketplace-update");
  }
  let mktHost = null;
  function marketplaceCompat() {
    // zone de défilement de la page principale (pour le chargement au fil du défilement)
    const mv = getArea("main-view");
    if (mv && !mv.querySelector(".main-view-container__scroll-node")) {
      let best = null, bh = 0;
      for (const el of mv.querySelectorAll("div")) {
        const oy = getComputedStyle(el).overflowY;
        if ((oy === "auto" || oy === "scroll") && el.clientHeight > bh && el.scrollHeight > el.clientHeight) { best = el; bh = el.clientHeight; }
      }
      if (best) best.classList.add("main-view-container__scroll-node");
    }
    const sn = mv && mv.querySelector(".main-view-container__scroll-node");
    if (sn && !document.querySelector(".os-viewport")) sn.classList.add("os-viewport");
    // barre des catégories (Extensions, Thèmes, Snippets…)
    if (!onMarketplace()) {
      if (mktHost && mktHost.isConnected && !mktHost.querySelector(".marketplace-tabBar")) mktHost.remove();
      document.querySelectorAll(".xt-mkt-hide").forEach((el) => el.classList.remove("xt-mkt-hide"));
      return;
    }
    // Calque vide en haut de la page (ancienne barre de 64 px) : caché sur le Marketplace
    if (mv) {
      const mr = mv.getBoundingClientRect();
      for (const el of mv.querySelectorAll("div, header")) {
        if (el.classList.contains("xt-mkt-hide") || el.id === "xt-mkt-tabs" || el.closest("#xt-mkt-tabs, .marketplace-header") || el.querySelector(".marketplace-header, .marketplace-grid, #xt-mkt-tabs")) continue;
        const r = el.getBoundingClientRect();
        if (r.top - mr.top > 10 || r.height < 40 || r.height > 90 || r.width < mr.width * 0.7) continue;
        const pos = getComputedStyle(el).position;
        if (pos !== "absolute" && pos !== "sticky" && pos !== "fixed") continue;
        if (el.textContent.trim()) continue; // seulement les calques vides
        el.classList.add("xt-mkt-hide");
      }
    }
    if (document.querySelector(".main-topBar-topbarContentWrapper:not(#xt-mkt-tabs)")) return; // Spotify l'a encore : rien à faire
    // Le Marketplace range ses onglets dans « .main-topBar-topbarContentWrapper » (disparu de Spotify).
    // On lui fournit cette zone, placée en haut de sa propre page, pleine largeur et collée en haut au défilement.
    if (!mktHost) {
      mktHost = document.createElement("div");
      mktHost.id = "xt-mkt-tabs";
      mktHost.className = "main-topBar-topbarContentWrapper";
    }
    const page = document.querySelector(".marketplace-header")?.parentElement;
    if (page) {
      if (mktHost.parentElement !== page || page.firstElementChild !== mktHost) page.prepend(mktHost);
    } else if (!mktHost.isConnected && mv) {
      // page pas encore affichée : on garde la zone prête (cachée tant qu'elle est vide)
      (mv.querySelector(".main-view-container__scroll-node") || mv).prepend(mktHost);
    }
  }

  // ---------- Boutons du lecteur ----------
  const BT_KEY = "xt-spotify:buttons";
  const BT_DEFAULT = { pack: "spotify", shape: "default", size: 100, colorOn: false, color: "#ffffff", anim: "none", hideShuffle: false, hideRepeat: false, hideLike: false };
  function loadBt() { try { return { ...BT_DEFAULT, ...JSON.parse(Spicetify.LocalStorage.get(BT_KEY) || "{}") }; } catch (e) { return { ...BT_DEFAULT }; } }
  function saveBt(c) { try { Spicetify.LocalStorage.set(BT_KEY, JSON.stringify(c)); } catch (e) {} }
  // Icônes dessinées pour XT-Spotify (servent de « masque » : elles prennent la couleur du bouton)
  const svgUrl = (inner, vb = 16, extra = "") => `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vb} ${vb}" ${extra}>${inner}</svg>`)}")`;
  const R = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`;
  const PIX = 'shape-rendering="crispEdges"';
  const ICONS = {
    pixel: {
      play: svgUrl(R(4,2,2,12) + R(6,3,2,10) + R(8,4,2,8) + R(10,5,2,6) + R(12,6,2,4) + R(14,7,1,2), 16, PIX),
      pause: svgUrl(R(3,2,4,12) + R(9,2,4,12), 16, PIX),
      next: svgUrl(R(2,3,2,10) + R(4,4,2,8) + R(6,5,2,6) + R(8,6,2,4) + R(11,3,3,10), 16, PIX),
      prev: svgUrl(R(12,3,2,10) + R(10,4,2,8) + R(8,5,2,6) + R(6,6,2,4) + R(2,3,3,10), 16, PIX),
      shuffle: svgUrl(R(1,3,3,2) + R(4,5,2,2) + R(6,7,4,2) + R(10,9,2,2) + R(12,11,2,2) + R(13,9,1,6) + R(14,10,1,4) + R(1,11,3,2) + R(4,9,2,2) + R(10,5,2,2) + R(12,3,2,2) + R(13,1,1,6) + R(14,2,1,4), 16, PIX),
      repeat: svgUrl(R(2,4,10,2) + R(12,2,1,6) + R(13,3,1,4) + R(14,4,1,2) + R(4,10,10,2) + R(3,8,1,6) + R(2,9,1,4) + R(1,10,1,2) + R(2,6,2,2) + R(12,8,2,2), 16, PIX),
      repeat1: svgUrl(R(2,4,10,2) + R(12,2,1,6) + R(13,3,1,4) + R(14,4,1,2) + R(4,10,10,2) + R(3,8,1,6) + R(2,9,1,4) + R(1,10,1,2) + R(2,6,2,2) + R(12,8,2,2) + R(7,6,2,4) + R(6,6,1,1), 16, PIX),
      like: svgUrl(R(2,3,4,1) + R(10,3,4,1) + R(1,4,2,4) + R(13,4,2,4) + R(6,4,1,1) + R(9,4,1,1) + R(7,5,2,1) + R(2,8,2,1) + R(12,8,2,1) + R(3,9,2,1) + R(11,9,2,1) + R(4,10,2,1) + R(10,10,2,1) + R(5,11,2,1) + R(9,11,2,1) + R(6,12,4,1) + R(7,13,2,1), 16, PIX),
      likeon: svgUrl(R(2,3,4,1) + R(10,3,4,1) + R(1,4,14,4) + R(2,8,12,1) + R(3,9,10,1) + R(4,10,8,1) + R(5,11,6,1) + R(6,12,4,1) + R(7,13,2,1), 16, PIX),
    },
    lofi: {
      play: svgUrl('<path d="M8 5.8v12.4a1 1 0 0 0 1.5.86l9.6-6.2a1 1 0 0 0 0-1.72L9.5 4.94A1 1 0 0 0 8 5.8z"/>', 24),
      pause: svgUrl('<rect x="6" y="5" width="4" height="14" rx="2"/><rect x="14" y="5" width="4" height="14" rx="2"/>', 24),
      next: svgUrl('<path d="M5 7.2v9.6a1 1 0 0 0 1.55.83l7-4.8a1 1 0 0 0 0-1.66l-7-4.8A1 1 0 0 0 5 7.2z"/><rect x="16.5" y="6" width="2.6" height="12" rx="1.3"/>', 24),
      prev: svgUrl('<path d="M19 7.2v9.6a1 1 0 0 1-1.55.83l-7-4.8a1 1 0 0 1 0-1.66l7-4.8A1 1 0 0 1 19 7.2z"/><rect x="4.9" y="6" width="2.6" height="12" rx="1.3"/>', 24),
      shuffle: svgUrl('<g fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h2.5c4.5 0 6.5 10 11 10H20M3 17h2.5c4.5 0 6.5-10 11-10H20M17.5 4.5 20 7l-2.5 2.5M17.5 14.5 20 17l-2.5 2.5"/></g>', 24),
      repeat: svgUrl('<g fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12V9.5A3.5 3.5 0 0 1 7.5 6H19M16 3l3 3-3 3M20 12v2.5a3.5 3.5 0 0 1-3.5 3.5H5M8 21l-3-3 3-3"/></g>', 24),
      repeat1: svgUrl('<g fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12V9.5A3.5 3.5 0 0 1 7.5 6H19M16 3l3 3-3 3M20 12v2.5a3.5 3.5 0 0 1-3.5 3.5H5M8 21l-3-3 3-3M11 10.5l1.5-1v5"/></g>', 24),
      like: svgUrl('<path fill="none" stroke="#000" stroke-width="2" stroke-linejoin="round" d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"/>', 24),
      likeon: svgUrl('<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"/>', 24),
    },
  };
  // Repère les boutons : la zone « player-controls » de Spotify, puis l'ordre autour du bouton lecture
  function tagButtons() {
    const pc = document.querySelector('[data-testid="player-controls"]');
    const all = ["xt-btn-play", "xt-btn-prev", "xt-btn-next", "xt-btn-shuffle", "xt-btn-repeat"];
    if (pc) {
      // On garde aussi les boutons que NOUS avons masqués (sinon : masqué → plus reconnu → réaffiché → clignotement)
      const btns = [...pc.querySelectorAll("button")].filter((b) => (b.offsetWidth || b.classList.contains("xt-ctrl")) && !b.closest('[data-testid="playback-progressbar"]'));
      // libellé exact (« Lecture », « Pause », « Play »…), sinon le plus gros bouton (le rond blanc)
      let play = btns.find((b) => /^\s*(pause|play|lecture|lire|reproducir|pausa|wiedergabe|abspielen)\s*$/i.test(b.getAttribute("aria-label") || ""));
      if (!play && btns.length) play = btns.reduce((a, b) => (b.offsetWidth * b.offsetHeight > a.offsetWidth * a.offsetHeight ? b : a));
      const i = btns.indexOf(play);
      const vis = (b) => b.offsetWidth > 0;
      const byLabel = (re) => btns.find((b) => vis(b) && re.test(b.getAttribute("aria-label") || "")) || btns.find((b) => re.test(b.getAttribute("aria-label") || ""));
      const map = {
        "xt-btn-play": play,
        "xt-btn-prev": byLabel(/précédent|previous|back|zurück|anterior/i) || btns[i - 1],
        "xt-btn-next": byLabel(/suivant|next|weiter|siguiente/i) || btns[i + 1],
        "xt-btn-shuffle": byLabel(/aléatoire|shuffle|zufall|aleatori/i) || (i >= 2 ? btns[0] : null),
        "xt-btn-repeat": byLabel(/répét|repeat|wiederhol|repetir/i) || btns[i + 2],
      };
      for (const cls of all) {
        const prev = pc.querySelector("." + cls);
        const hiddenOnPurpose = (cls === "xt-btn-shuffle" && document.documentElement.classList.contains("xt-hide-shuffle")) ||
                                (cls === "xt-btn-repeat" && document.documentElement.classList.contains("xt-hide-repeat"));
        // déjà reconnu, toujours là et visible (ou masqué exprès) : on ne change rien
        if (prev && btns.includes(prev) && (prev.offsetWidth > 0 || hiddenOnPurpose) && (!map[cls] || map[cls] === prev || !vis(map[cls]))) map[cls] = prev;
      }
      for (const cls of all) {
        document.querySelectorAll("." + cls).forEach((el) => { if (el !== map[cls]) el.classList.remove(cls); });
        if (map[cls] && i >= 0) map[cls].classList.add(cls, "xt-ctrl", "xt-ico");
      }
      document.querySelectorAll(".xt-ctrl").forEach((el) => {
        if (![...all, "xt-btn-like"].some((c) => el.classList.contains(c))) el.classList.remove("xt-ctrl", "xt-ico");
      });
    }
    const w = document.querySelector('[data-testid="now-playing-widget"], [data-testid="now-playing-widget-v2"]');
    const like = (w && w.querySelector(".xt-btn-like")) || (w && w.querySelector("button[aria-checked]"));
    document.querySelectorAll(".xt-btn-like").forEach((el) => { if (el !== like) el.classList.remove("xt-btn-like", "xt-ctrl", "xt-ico"); });
    if (like) like.classList.add("xt-btn-like", "xt-ctrl", "xt-ico");
  }
  function applyButtons(c = loadBt()) {
    const root = document.documentElement;
    root.classList.toggle("xt-icons", c.pack !== "spotify");
    const pack = ICONS[c.pack];
    if (pack) for (const k in pack) root.style.setProperty(`--xt-i-${k}`, pack[k]);
    ["round", "square", "soft"].forEach((sh) => root.classList.toggle(`xt-bshape-${sh}`, c.shape === sh));
    ["bounce", "pulse", "spin"].forEach((a) => root.classList.toggle(`xt-anim-${a}`, c.anim === a));
    root.classList.toggle("xt-hide-shuffle", !!c.hideShuffle);
    root.classList.toggle("xt-hide-repeat", !!c.hideRepeat);
    root.classList.toggle("xt-hide-like", !!c.hideLike);
    root.classList.toggle("xt-bcolor", !!c.colorOn);
    root.style.setProperty("--xt-bcolor", c.color);
    root.style.setProperty("--xt-bscale", (c.size / 100).toFixed(2));
    tagButtons();
  }
  function bindButtonsMenu(menu) {
    const $ = (id) => menu.querySelector("#" + id);
    if (!$("xt-bt-pack")) return;
    let cur = loadBt();
    const sync = (c) => {
      $("xt-bt-size").value = c.size; $("xt-bt-size-v").textContent = c.size + "%";
      $("xt-bt-colon").checked = c.colorOn; $("xt-bt-color").value = c.color; $("xt-bt-color").disabled = !c.colorOn;
      $("xt-bt-hshuffle").checked = c.hideShuffle; $("xt-bt-hrepeat").checked = c.hideRepeat; $("xt-bt-hlike").checked = c.hideLike;
    };
    sync(cur);
    const update = (patch) => { cur = { ...cur, ...patch }; saveBt(cur); sync(cur); applyButtons(cur); };
    bindSeg($("xt-bt-pack"), cur.pack, (m) => update({ pack: m }));
    bindSeg($("xt-bt-shape"), cur.shape, (m) => update({ shape: m }));
    bindSeg($("xt-bt-anim"), cur.anim, (m) => update({ anim: m }));
    $("xt-bt-size").addEventListener("input", (e) => update({ size: +e.target.value }));
    $("xt-bt-colon").addEventListener("change", (e) => update({ colorOn: e.target.checked }));
    $("xt-bt-color").addEventListener("input", (e) => update({ color: e.target.value }));
    $("xt-bt-color").addEventListener("click", (e) => e.stopPropagation());
    $("xt-bt-hshuffle").addEventListener("change", (e) => update({ hideShuffle: e.target.checked }));
    $("xt-bt-hrepeat").addEventListener("change", (e) => update({ hideRepeat: e.target.checked }));
    $("xt-bt-hlike").addEventListener("change", (e) => update({ hideLike: e.target.checked }));
  }

  // État réel des boutons, lu dans le lecteur Spotify (aléatoire, répétition, j'aime)
  function syncCtrlStates() {
    const root = document.documentElement;
    let sh = false, rp = 0, liked = false;
    try { sh = !!(Spicetify.Player.getShuffle ? Spicetify.Player.getShuffle() : Spicetify.Player.data?.shuffle); } catch (e) {}
    try { rp = Spicetify.Player.getRepeat ? Spicetify.Player.getRepeat() : (Spicetify.Player.data?.repeat || 0); } catch (e) {}
    try { liked = !!(Spicetify.Player.getHeart ? Spicetify.Player.getHeart() : false); } catch (e) {}
    // secours : attributs des boutons eux-mêmes
    const b = (c) => document.querySelector("." + c);
    const on = (el) => el && (["true", "mixed"].includes(el.getAttribute("aria-checked")) || el.getAttribute("aria-pressed") === "true");
    if (!sh && on(b("xt-btn-shuffle"))) sh = true;
    if (!rp && on(b("xt-btn-repeat"))) rp = b("xt-btn-repeat").getAttribute("aria-checked") === "mixed" ? 2 : 1;
    if (!liked && on(b("xt-btn-like"))) liked = true;
    root.classList.toggle("xt-st-shuffle", sh);
    root.classList.toggle("xt-st-repeat", rp > 0);
    root.classList.toggle("xt-st-repeat1", rp === 2);
    root.classList.toggle("xt-st-liked", liked);
  }
  // juste après un clic sur un de ces boutons, on relit l'état (Spotify met un instant à le changer)
  document.addEventListener("click", (e) => {
    if (e.target.closest && e.target.closest(".xt-ctrl, [data-testid='player-controls']")) [60, 250, 700].forEach((d) => setTimeout(() => { tagButtons(); syncCtrlStates(); }, d));
  }, true);
  // Spotify remplace parfois un bouton (ex. lecture aléatoire intelligente) : on le reconnaît aussitôt
  let ctrlObs = null;
  function watchControls() {
    const pc = document.querySelector('[data-testid="player-controls"]');
    if (!pc || (ctrlObs && ctrlObs.target === pc)) return;
    if (ctrlObs) ctrlObs.disconnect();
    ctrlObs = new MutationObserver(() => { clearTimeout(ctrlObs.t); ctrlObs.t = setTimeout(() => { tagButtons(); syncCtrlStates(); }, 30); });
    ctrlObs.target = pc;
    ctrlObs.observe(pc, { childList: true, subtree: true, attributes: true, attributeFilter: ["aria-label", "aria-checked"] });
  }
  // Diagnostic : rapport des boutons du lecteur, à copier-coller pour comprendre un bug
  function playerReport() {
    const pc = document.querySelector('[data-testid="player-controls"]');
    const rows = pc ? [...pc.querySelectorAll("button, [role=button]")].map((b, i) => {
      const r = b.getBoundingClientRect();
      return `${i}. "${b.getAttribute("aria-label") || ""}" checked=${b.getAttribute("aria-checked")} ${Math.round(r.width)}x${Math.round(r.height)} display=${getComputedStyle(b).display} xt=[${[...b.classList].filter((c) => c.startsWith("xt-")).join(" ")}] testid=${b.getAttribute("data-testid") || ""}`;
    }) : ["player-controls introuvable"];
    let st = "";
    try { st = `shuffle=${Spicetify.Player.getShuffle && Spicetify.Player.getShuffle()} repeat=${Spicetify.Player.getRepeat && Spicetify.Player.getRepeat()} smart=${JSON.stringify(Spicetify.Player.data && (Spicetify.Player.data.smartShuffle ?? Spicetify.Player.data.shuffle_mode ?? null))}`; } catch (e) {}
    return `Custom-Spotify-Extended diagnostic lecteur\n${st}\nhtml: ${[...document.documentElement.classList].filter((c) => c.startsWith("xt-")).join(" ")}\nbtn cfg: ${Spicetify.LocalStorage.get(BT_KEY)}\n${rows.join("\n")}`;
  }
  try { Spicetify.Player.addEventListener("songchange", () => setTimeout(syncCtrlStates, 300)); } catch (e) {}

  // ---------- Thèmes ----------
  const TH_KEY = "xt-spotify:theme";
  const TH_DEFAULT = { name: "custom", font: "default", square: false, pixelBg: false };
  function loadTh() { try { return { ...TH_DEFAULT, ...JSON.parse(Spicetify.LocalStorage.get(TH_KEY) || "{}") }; } catch (e) { return { ...TH_DEFAULT }; } }
  function saveTh(c) { try { Spicetify.LocalStorage.set(TH_KEY, JSON.stringify(c)); } catch (e) {} }
  function applyThemeExtras(c = loadTh()) {
    const root = document.documentElement;
    root.classList.toggle("xt-font-pixel", c.font === "pixel");
    root.classList.toggle("xt-font-soft", c.font === "soft");
    ["impact", "tech", "comic", "serif"].forEach((f) => root.classList.toggle(`xt-font-${f}`, c.font === f));
    root.classList.toggle("xt-square", !!c.square);
    root.classList.toggle("xt-pixelbg", !!c.pixelBg);
  }
  // Fonds d'écran dessinés par XT-Spotify (pas d'images externes)
  function rng(seed) { return () => ((seed = (seed * 16807) % 2147483647) / 2147483647); }
  function drawMinecraftBg() {
    const W = 128, H = 72, c = document.createElement("canvas"); c.width = W; c.height = H;
    const g = c.getContext("2d"), r = rng(42), px = (x, y, col) => { g.fillStyle = col; g.fillRect(x, y, 1, 1); };
    const sky = g.createLinearGradient(0, 0, 0, 44); sky.addColorStop(0, "#6f9ff5"); sky.addColorStop(1, "#b3d1ff");
    g.fillStyle = sky; g.fillRect(0, 0, W, H);
    g.fillStyle = "#ffe866"; g.fillRect(100, 7, 9, 9); g.fillStyle = "#fff6a8"; g.fillRect(102, 9, 5, 5);
    g.fillStyle = "#ffffff"; [[8, 9, 18, 4], [12, 7, 9, 2], [46, 14, 22, 4], [52, 12, 11, 2], [78, 6, 14, 3]].forEach(([x, y, w, h]) => g.fillRect(x, y, w, h));
    const heights = []; let h = 44;
    for (let x = 0; x < W; x += 4) { h = Math.max(38, Math.min(50, h + Math.round((r() - 0.5) * 4))); for (let k = 0; k < 4; k++) heights.push(h); }
    for (let x = 0; x < W; x++) {
      const top = heights[x];
      for (let y = top; y < H; y++) {
        const d = y - top, n = r();
        let col;
        if (d < 2) col = n < 0.3 ? "#6cbf3c" : n < 0.6 ? "#5ca33a" : "#4f8f30";
        else if (d < 8) col = n < 0.33 ? "#8a5a34" : n < 0.66 ? "#7a4e2c" : "#9b6a40";
        else col = n < 0.04 ? "#262626" : n < 0.05 ? "#4fe3e3" : n < 0.4 ? "#7d7d7d" : n < 0.7 ? "#6e6e6e" : "#8a8a8a";
        px(x, y, col);
      }
    }
    [20, 74, 109].forEach((tx) => {
      const base = heights[tx];
      g.fillStyle = "#6b4a2b"; g.fillRect(tx, base - 8, 2, 8);
      for (let y = base - 14; y < base - 6; y++) for (let x = tx - 4; x < tx + 6; x++) {
        if ((y === base - 14 || y === base - 7) && (x < tx - 2 || x > tx + 3)) continue;
        px(x, y, r() < 0.3 ? "#2f7a1f" : r() < 0.5 ? "#3d8f27" : "#4aa52f");
      }
    });
    return c.toDataURL("image/png");
  }
  function drawLofiBg() {
    const W = 960, H = 540, c = document.createElement("canvas"); c.width = W; c.height = H;
    const g = c.getContext("2d"), r = rng(7);
    const sky = g.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, "#1d1538"); sky.addColorStop(0.4, "#4b2a6b"); sky.addColorStop(0.72, "#c46b9b"); sky.addColorStop(1, "#f7b09a");
    g.fillStyle = sky; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 160; i++) { g.fillStyle = `rgba(255,255,255,${0.3 + r() * 0.7})`; const s = r() < 0.9 ? 1 : 2; g.fillRect(r() * W, r() * H * 0.55, s, s); }
    const sun = g.createRadialGradient(690, 330, 10, 690, 330, 170);
    sun.addColorStop(0, "rgba(255,226,200,1)"); sun.addColorStop(0.45, "rgba(255,200,170,.85)"); sun.addColorStop(0.5, "rgba(255,170,160,.25)"); sun.addColorStop(1, "rgba(255,160,160,0)");
    g.fillStyle = sun; g.beginPath(); g.arc(690, 330, 170, 0, Math.PI * 2); g.fill();
    const hill = (yb, amp, f, ph, col) => {
      g.fillStyle = col; g.beginPath(); g.moveTo(0, H);
      for (let x = 0; x <= W; x += 8) g.lineTo(x, yb + Math.sin(x * f + ph) * amp + Math.sin(x * f * 2.7 + ph) * amp * 0.35);
      g.lineTo(W, H); g.closePath(); g.fill();
    };
    hill(400, 26, 0.006, 1, "#5a3478"); hill(440, 22, 0.008, 3, "#3d2259"); hill(480, 18, 0.01, 5, "#24143a");
    // petite ville aux fenêtres allumées
    let x = 40;
    while (x < W - 40) {
      const bw = 26 + Math.floor(r() * 40), bh = 40 + Math.floor(r() * 90);
      if (r() < 0.55) {
        g.fillStyle = "#1a0f2c"; g.fillRect(x, H - bh, bw, bh);
        for (let wy = H - bh + 8; wy < H - 8; wy += 12) for (let wx = x + 5; wx < x + bw - 6; wx += 9)
          if (r() < 0.35) { g.fillStyle = r() < 0.7 ? "#ffcf7a" : "#ff9ecb"; g.fillRect(wx, wy, 4, 5); }
      }
      x += bw + 6;
    }
    return c.toDataURL("image/jpeg", 0.88);
  }
  const THEMES = {
    default: () => ({
      "xt-spotify:bg": { enabled: false, source: "image", blur: 8, opacity: 55, topOpacity: 30, playerOpacity: 55, scrollOpacity: 0, searchOpacity: 0 },
      "xt-spotify:page-transparent": "0",
      "xt-spotify:sidebar-style": { opacity: 100, blur: 0 },
      "xt-spotify:accent": { enabled: false },
      "xt-spotify:progress": { style: "spotify" }, "xt-spotify:volume": { style: "spotify" },
      "xt-spotify:buttons": { ...BT_DEFAULT },
      "xt-spotify:theme": { name: "default", font: "default", square: false, pixelBg: false },
      rp: { vinyl: false, opacity: 100, blur: 0, radius: null, title: 100 },
    }),
    minecraft: () => ({
      img: drawMinecraftBg(),
      "xt-spotify:bg": { enabled: true, source: "image", blur: 0, opacity: 35, topOpacity: 45, playerOpacity: 65, scrollOpacity: 35, searchOpacity: 35 },
      "xt-spotify:page-transparent": "1",
      "xt-spotify:sidebar-style": { opacity: 75, blur: 0 },
      "xt-spotify:accent": { enabled: true, c1: "#5dbb37", c2: "#3f8c25", gradient: false, angle: 135, hover: true, intensity: 30 },
      "xt-spotify:progress": { style: "minecraft", height: 5 }, "xt-spotify:volume": { style: "minecraft", height: 5 },
      "xt-spotify:buttons": { ...BT_DEFAULT, pack: "pixel", shape: "square", anim: "bounce" },
      "xt-spotify:theme": { name: "minecraft", font: "pixel", square: true, pixelBg: true },
      rp: { vinyl: false, opacity: 75, blur: 0, radius: 0, title: 100 },
    }),
    lofi: () => ({
      img: drawLofiBg(),
      "xt-spotify:bg": { enabled: true, source: "image", blur: 0, opacity: 25, topOpacity: 20, playerOpacity: 35, scrollOpacity: 20, searchOpacity: 15 },
      "xt-spotify:page-transparent": "1",
      "xt-spotify:sidebar-style": { opacity: 50, blur: 14 },
      "xt-spotify:accent": { enabled: true, c1: "#ff9ecb", c2: "#9b8cff", gradient: true, angle: 135, hover: true, intensity: 28 },
      "xt-spotify:progress": { style: "custom", c1: "#ff9ecb", c2: "#9b8cff", gradient: true, height: 4, glow: true },
      "xt-spotify:volume": { style: "custom", c1: "#ff9ecb", c2: "#9b8cff", gradient: true, height: 4, glow: true },
      "xt-spotify:buttons": { ...BT_DEFAULT, pack: "lofi", shape: "round", anim: "pulse" },
      "xt-spotify:theme": { name: "lofi", font: "soft", square: false, pixelBg: false },
      rp: { vinyl: true, speed: 3, opacity: 50, blur: 14, radius: null, title: 100 },
    }),
  };
  function applyTheme(name) {
    const def = THEMES[name] && THEMES[name]();
    if (!def) return false;
    // sauvegarde de sécurité : on ne garde que la dernière (pas une par thème essayé)
    try {
      listPresets().forEach((id) => { const pr = readPreset(id); if (pr && /^(Avant thème|Before theme) – /.test(pr.name || "")) deletePreset(id); });
      createPreset(`${t("thBackup")} – ${new Date().toLocaleString()}`);
    } catch (e) {}
    if (def.img) { try { setBgImage(def.img); } catch (e) {} }
    for (const [k, v] of Object.entries(def)) {
      if (k === "img" || k === "rp") continue;
      try { Spicetify.LocalStorage.set(k, typeof v === "string" ? v : JSON.stringify(v)); } catch (e) {}
    }
    // panneau de droite : on change l'apparence mais pas le mode (normal / compact / masqué)
    try { const cur = loadRp(); saveRp({ ...cur, ...def.rp }); } catch (e) {}
    applyBackground(); setupSidebar(); setupRightPanel(); applyPanels(); applyAccent(); applyProgress(); applyButtons(); applyThemeExtras();
    return true;
  }
  function bindThemesMenu(menu) {
    const $ = (id) => menu.querySelector("#" + id);
    if (!$("xt-th-font")) return;
    menu.querySelectorAll(".xt-theme-apply").forEach((b) => b.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!b.classList.contains("confirm")) {
        b.classList.add("confirm"); b.textContent = t("thConfirm");
        setTimeout(() => { if (b.isConnected) { b.classList.remove("confirm"); b.textContent = t("thApply"); } }, 3000);
        return;
      }
      applyTheme(b.dataset.theme);
      const btn = document.getElementById(BTN_ID);
      closeMenu(); openMenu(btn);
      const st = document.querySelector(`#${MENU_ID} #xt-th-status`);
      if (st) { st.textContent = t("thApplied"); st.className = "xt-status ok"; }
    }));
    const th = loadTh();
    const fs = $("xt-th-font"); fs.value = th.font;
    fs.addEventListener("click", (e) => e.stopPropagation());
    fs.addEventListener("change", () => { const c = { ...loadTh(), font: fs.value }; saveTh(c); applyThemeExtras(c); });
    $("xt-th-square").checked = !!th.square;
    $("xt-th-square").addEventListener("change", (e) => { const c = { ...loadTh(), square: e.target.checked }; saveTh(c); applyThemeExtras(c); });
  }

  // ---------- Fond de page transparent ----------
  const PAGE_KEY = "xt-spotify:page-transparent";
  const isPageClear = () => { try { return Spicetify.LocalStorage.get(PAGE_KEY) !== "0"; } catch (e) { return true; } };

  const setupPage = applyPanels;

  function bindPageMenu(menu) {
    const box = menu.querySelector("#xt-page-clear");
    box.checked = isPageClear();
    box.addEventListener("change", () => {
      try { Spicetify.LocalStorage.set(PAGE_KEY, box.checked ? "1" : "0"); } catch (e) {}
      setupPage();
    });
  }

  // ---------- Bouton (déplaçable) ----------
  const POS_KEY = "xt-spotify:gear-pos";
  // Position par défaut : dans la barre du haut, à droite du panier (comme sur la capture de Natan).
  // Mesurée en pixels écran (centre x=226, y=22) puis convertie selon le zoom/l'échelle Windows.
  const defaultPos = () => {
    const dpr = window.devicePixelRatio || 1;
    return { top: Math.round(22 / dpr - 16), left: Math.round(226 / dpr - 16) };
  };

  function loadPos() {
    try {
      const raw = Spicetify.LocalStorage.get(POS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return defaultPos();
  }
  function savePos(pos) {
    try { Spicetify.LocalStorage.set(POS_KEY, JSON.stringify(pos)); } catch (e) {}
  }
  function clamp(pos) {
    const max = (v, size) => Math.max(0, Math.min(v, size - 32));
    return { top: max(pos.top, window.innerHeight), left: max(pos.left, window.innerWidth) };
  }
  function applyPos(btn, pos) {
    pos = clamp(pos);
    btn.style.top = pos.top + "px";
    btn.style.left = pos.left + "px";
  }

  function createButton() {
    const btn = document.createElement("button");
    btn.id = BTN_ID;
    btn.title = t("gearTitle");
    btn.setAttribute("aria-label", "Custom-Spotify-Extended");
    btn.innerHTML = GEAR_SVG;
    applyPos(btn, loadPos());

    // Glisser-déposer : si on bouge de plus de 4 px, c'est un déplacement, pas un clic
    let drag = null;
    btn.addEventListener("mousedown", (e) => {
      if (e.button !== 0) return;
      const r = btn.getBoundingClientRect();
      drag = { x: e.clientX, y: e.clientY, dx: e.clientX - r.left, dy: e.clientY - r.top, moved: false };
      e.preventDefault();
    });
    document.addEventListener("mousemove", (e) => {
      if (!drag) return;
      if (!drag.moved && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < 4) return;
      if (!drag.moved) { drag.moved = true; closeMenu(); btn.classList.add("xt-dragging"); }
      applyPos(btn, { top: e.clientY - drag.dy, left: e.clientX - drag.dx });
    });
    document.addEventListener("mouseup", (e) => {
      if (!drag) return;
      const wasMoved = drag.moved;
      drag = null;
      btn.classList.remove("xt-dragging");
      if (wasMoved) {
        savePos({ top: parseInt(btn.style.top), left: parseInt(btn.style.left) });
        btn.dataset.justDragged = "1";
        setTimeout(() => delete btn.dataset.justDragged, 50);
      }
    });
    btn.addEventListener("click", (e) => {
      if (btn.dataset.justDragged) { e.stopPropagation(); return; }
      toggleMenu(e);
    });
    window.addEventListener("resize", () => applyPos(btn, loadPos()));
    return btn;
  }

  function resetPosition() {
    savePos(defaultPos());
    const btn = document.getElementById(BTN_ID);
    if (btn) applyPos(btn, defaultPos());
    closeMenu();
  }

  function ensureButton() {
    if (document.getElementById(BTN_ID)) return;
    document.body.appendChild(createButton());
  }

  injectStyle();
  ensureButton();
  applyBackground();
  setupSidebar();
  setupPage();
  new MutationObserver(() => ensureButton()).observe(document.body, { childList: true });
  // Spotify peut reconstruire son interface : on revérifie le panneau régulièrement
  applySbStyle();
  setupRightPanel();
  applyAccent();
  applyProgress();
  syncPlaying();
  applyButtons();
  applyThemeExtras();
  marketplaceCompat();
  try { Spicetify.Platform.History.listen(() => [50, 300, 900].forEach((d) => setTimeout(marketplaceCompat, d))); } catch (e) {}
  setInterval(() => { watchControls(); tagButtons(); syncCtrlStates(); marketplaceCompat(); setupSidebar(); setupRightPanel(); if ((loadBg().source || "image") !== "image") applyBackground(); else applyPanels(); syncPlaying(); }, 1000);
})();
