const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=Bebas+Neue&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --noir:    #080808;
    --dark:    #0e0e0e;
    --panel:   #141414;
    --rim:     #1e1e1e;
    --border:  #272727;
    --crimson: #e50914;
    --crimson2:#b20710;
    --gold:    #f5c518;
    --text:    #e8e8e8;
    --muted:   #707070;
    --faint:   #333;
    --white:   #ffffff;
    --display: 'Bebas Neue', cursive;
    --body:    'DM Sans', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: var(--body);
    background: var(--noir);
    color: var(--text);
    min-height: 100vh;
    /* Film grain overlay via SVG data URI */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  }

  /* ── NAV ── */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 0 2.5rem; height: 60px;
    display: flex; align-items: center; justify-content: space-between;
    background: linear-gradient(to bottom, rgba(8,8,8,0.98) 0%, rgba(8,8,8,0) 100%);
    transition: all 0.3s;
  }
  nav.scrolled {
    background: rgba(8,8,8,0.97);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border);
  }
  .nav-brand {
    font-family: var(--display);
    font-size: 2rem; letter-spacing: 4px; color: var(--white); line-height: 1;
  }
  .nav-brand span { color: var(--crimson); }
  .nav-right { display: flex; align-items: center; gap: 1rem; }
  .wl-btn {
    display: flex; align-items: center; gap: 0.5rem;
    background: none; border: 1px solid var(--border); color: var(--text);
    padding: 0.45rem 1rem; font-family: var(--body); font-size: 0.8rem;
    cursor: pointer; transition: all 0.2s; border-radius: 2px;
  }
  .wl-btn:hover { border-color: var(--crimson); color: var(--crimson); }
  .wl-count {
    background: var(--crimson); color: white;
    font-size: 0.65rem; font-weight: 700;
    padding: 0.1rem 0.4rem; border-radius: 10px; min-width: 18px; text-align: center;
  }

  /* ── HERO ── */
  .hero {
    height: 520px; position: relative;
    display: flex; align-items: flex-end; overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background-size: cover; background-position: center top;
    transition: background-image 1s ease;
  }
  .hero-overlay {
    position: absolute; inset: 0;
    background:
      linear-gradient(to right, rgba(8,8,8,0.96) 0%, rgba(8,8,8,0.5) 50%, rgba(8,8,8,0.15) 100%),
      linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.4) 40%, transparent 70%);
  }
  .hero-content {
    position: relative; z-index: 2;
    padding: 0 3rem 3rem; max-width: 580px;
    animation: fadeUp 0.8s ease both;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: var(--crimson); color: white;
    font-size: 0.65rem; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase;
    padding: 0.25rem 0.65rem; margin-bottom: 0.75rem;
  }
  .hero-title {
    font-family: var(--display);
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    line-height: 0.95; letter-spacing: 2px; color: var(--white); margin-bottom: 0.75rem;
  }
  .hero-meta {
    display: flex; align-items: center; gap: 1rem;
    margin-bottom: 0.75rem; flex-wrap: wrap;
  }
  .hero-meta span { font-size: 0.8rem; color: var(--muted); display: flex; align-items: center; gap: 0.3rem; }
  .hero-meta .gold { color: var(--gold); font-weight: 600; }
  .hero-overview {
    font-size: 0.88rem; color: var(--muted); line-height: 1.7; margin-bottom: 1.25rem;
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
  }
  .hero-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
  .btn-white {
    display: flex; align-items: center; gap: 0.5rem;
    background: var(--white); color: var(--noir); border: none;
    padding: 0.7rem 1.5rem; font-family: var(--body);
    font-size: 0.85rem; font-weight: 600; cursor: pointer;
    transition: background 0.2s; border-radius: 2px;
  }
  .btn-white:hover { background: rgba(255,255,255,0.85); }
  .btn-ghost {
    display: flex; align-items: center; gap: 0.5rem;
    background: rgba(109,109,110,0.7); color: var(--white); border: none;
    padding: 0.7rem 1.5rem; font-family: var(--body);
    font-size: 0.85rem; font-weight: 500; cursor: pointer;
    transition: background 0.2s; border-radius: 2px;
  }
  .btn-ghost:hover { background: rgba(109,109,110,0.5); }

  /* ── MAIN ── */
  .main { padding: 2rem 2.5rem 5rem; }

  /* ── SETUP NOTICE ── */
  .setup-notice {
    background: rgba(245,197,24,0.07);
    border: 1px solid rgba(245,197,24,0.25);
    border-left: 3px solid var(--gold);
    padding: 1rem 1.25rem; margin-bottom: 2rem;
    font-size: 0.82rem; line-height: 1.7; color: rgba(245,197,24,0.85);
    border-radius: 2px;
  }
  .setup-notice strong { display: block; margin-bottom: 0.25rem; color: var(--gold); }
  .setup-notice code {
    background: rgba(245,197,24,0.1); padding: 0.1rem 0.4rem;
    font-family: monospace; font-size: 0.78rem; border-radius: 2px;
  }

  /* ── SEARCH ── */
  .search-section { margin-bottom: 2rem; }
  .search-box {
    display: flex; background: var(--panel);
    border: 1px solid var(--border); border-radius: 2px;
    overflow: hidden; max-width: 680px; transition: border-color 0.2s;
  }
  .search-box:focus-within { border-color: var(--crimson); }
  .search-icon { display: flex; align-items: center; padding: 0 1rem; color: var(--muted); }
  .search-input {
    flex: 1; background: none; border: none; outline: none;
    color: var(--text); font-family: var(--body); font-size: 1rem; padding: 0.9rem 0;
  }
  .search-input::placeholder { color: var(--faint); }
  .search-clear {
    background: none; border: none; color: var(--muted);
    cursor: pointer; padding: 0 1rem; display: flex; align-items: center; transition: color 0.15s;
  }
  .search-clear:hover { color: var(--crimson); }

  /* ── FILTER BAR ── */
  .filter-bar { display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center; margin-bottom: 2rem; }
  .fselect {
    background: var(--panel); border: 1px solid var(--border); color: var(--text);
    padding: 0.5rem 2rem 0.5rem 0.85rem;
    font-family: var(--body); font-size: 0.8rem; cursor: pointer; appearance: none; outline: none;
    border-radius: 2px; transition: border-color 0.15s;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23707070' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 0.6rem center;
  }
  .fselect:focus { border-color: var(--crimson); }
  .fselect option { background: var(--panel); }
  .mode-tabs { display: flex; margin-left: auto; }
  .mode-tab {
    display: flex; align-items: center; gap: 0.4rem;
    background: none; border: 1px solid var(--border); color: var(--muted);
    padding: 0.5rem 1rem; font-family: var(--body); font-size: 0.78rem;
    cursor: pointer; transition: all 0.15s; border-radius: 0;
  }
  .mode-tab:first-child { border-right: none; }
  .mode-tab.active { background: var(--crimson); color: white; border-color: var(--crimson); }
  .mode-tab:not(.active):hover { border-color: var(--muted); color: var(--text); }

  /* ── SECTION HEAD ── */
  .section-head {
    display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;
  }
  .section-head h2 {
    font-family: var(--display); font-size: 1.6rem;
    letter-spacing: 2px; color: var(--white);
    display: flex; align-items: center; gap: 0.6rem;
  }
  .section-head h2 svg { color: var(--crimson); }
  .result-count { font-size: 0.75rem; color: var(--muted); }

  /* ── MOVIE GRID ── */
  .movie-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 0.75rem; margin-bottom: 2.5rem;
  }

  /* ── MOVIE CARD ── */
  .movie-card {
    cursor: pointer; position: relative;
    background: var(--panel); overflow: hidden; border-radius: 2px;
    animation: cardIn 0.4s ease both;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .movie-card:hover { transform: scale(1.04); z-index: 2; box-shadow: 0 20px 50px rgba(0,0,0,0.7); }
  .movie-card:hover .card-ov   { opacity: 1; }
  .movie-card:hover .card-img  { filter: brightness(0.55); }

  /* Stagger first 12 cards in */
  .movie-card:nth-child(1)  { animation-delay: 0.03s; }
  .movie-card:nth-child(2)  { animation-delay: 0.06s; }
  .movie-card:nth-child(3)  { animation-delay: 0.09s; }
  .movie-card:nth-child(4)  { animation-delay: 0.12s; }
  .movie-card:nth-child(5)  { animation-delay: 0.15s; }
  .movie-card:nth-child(6)  { animation-delay: 0.18s; }
  .movie-card:nth-child(7)  { animation-delay: 0.21s; }
  .movie-card:nth-child(8)  { animation-delay: 0.24s; }
  .movie-card:nth-child(9)  { animation-delay: 0.27s; }
  .movie-card:nth-child(10) { animation-delay: 0.30s; }
  .movie-card:nth-child(11) { animation-delay: 0.33s; }
  .movie-card:nth-child(12) { animation-delay: 0.36s; }

  @keyframes cardIn {
    from { opacity: 0; transform: translateY(20px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .card-img-wrap { aspect-ratio: 2/3; overflow: hidden; background: var(--rim); }
  .card-img { width: 100%; height: 100%; object-fit: cover; transition: filter 0.3s; }
  .card-no-img {
    width: 100%; height: 100%;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 0.5rem; color: var(--faint);
  }
  .card-no-img span { font-size: 0.7rem; text-align: center; padding: 0 0.5rem; line-height: 1.3; }

  /* Hover overlay */
  .card-ov {
    position: absolute; inset: 0; opacity: 0; transition: opacity 0.25s;
    display: flex; flex-direction: column; justify-content: space-between; padding: 0.75rem;
    background: linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 40%, transparent 55%, rgba(0,0,0,0.88) 100%);
  }
  .card-ov-top { display: flex; justify-content: flex-end; }
  .card-bmark {
    background: rgba(0,0,0,0.75); border: 1px solid rgba(255,255,255,0.2);
    color: var(--text); cursor: pointer; width: 30px; height: 30px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s; border-radius: 50%;
  }
  .card-bmark:hover, .card-bmark.on { background: var(--crimson); border-color: var(--crimson); color: white; }
  .card-ov-bottom {}
  .card-rating-pill {
    display: inline-flex; align-items: center; gap: 0.25rem;
    background: rgba(0,0,0,0.75); padding: 0.2rem 0.45rem;
    font-size: 0.72rem; font-weight: 600; color: var(--gold); border-radius: 2px; margin-bottom: 0.3rem;
  }
  .card-ov-title {
    font-size: 0.78rem; font-weight: 500; color: white; line-height: 1.3;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  }
  .card-ov-year { font-size: 0.68rem; color: rgba(255,255,255,0.5); margin-top: 0.15rem; }

  /* Card body strip */
  .card-body { padding: 0.6rem 0.75rem 0.75rem; }
  .card-name { font-size: 0.8rem; font-weight: 500; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 0.2rem; }
  .card-sub { display: flex; align-items: center; gap: 0.5rem; font-size: 0.68rem; color: var(--muted); }
  .card-sub .dot { width: 3px; height: 3px; border-radius: 50%; background: var(--faint); }

  /* ── SKELETON ── */
  .skel-card { background: var(--panel); border-radius: 2px; overflow: hidden; }
  .skel-img  { aspect-ratio: 2/3; }
  .skel-body { padding: 0.6rem 0.75rem; display: flex; flex-direction: column; gap: 0.4rem; }
  .skel-line { height: 10px; border-radius: 2px; }
  .skel-line.w60 { width: 60%; }
  .shimmer {
    background: linear-gradient(90deg, var(--panel) 25%, var(--rim) 50%, var(--panel) 75%);
    background-size: 200% 100%; animation: shimmer 1.5s infinite;
  }
  @keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }

  /* ── SENTINEL (infinite scroll target) ── */
  .sentinel {
    height: 80px; display: flex; align-items: center;
    justify-content: center; gap: 0.5rem;
    color: var(--muted); font-size: 0.8rem;
  }
  .sentinel svg { animation: spin 1s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── MODAL ── */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(0,0,0,0.88); backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    padding: 1rem; animation: fadeIn 0.2s ease; overflow-y: auto;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .modal {
    background: var(--dark); width: 100%; max-width: 900px;
    border: 1px solid var(--border); border-radius: 4px; overflow: hidden;
    animation: modalPop 0.3s cubic-bezier(0.34,1.56,0.64,1) both; position: relative;
  }
  @keyframes modalPop {
    from { opacity: 0; transform: scale(0.93) translateY(20px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  .modal-back {
    height: 340px; position: relative; overflow: hidden; background: var(--panel);
  }
  .modal-back img { width: 100%; height: 100%; object-fit: cover; object-position: center 20%; filter: brightness(0.5); }
  .modal-back-grad {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, transparent 30%, var(--dark) 100%);
  }
  .modal-poster {
    position: absolute; bottom: -50px; left: 2rem;
    width: 120px; height: 180px; object-fit: cover;
    border: 3px solid var(--border); border-radius: 2px;
    box-shadow: 0 16px 40px rgba(0,0,0,0.6);
  }
  .modal-close {
    position: absolute; top: 1rem; right: 1rem;
    background: rgba(0,0,0,0.7); border: 1px solid var(--border);
    color: var(--text); width: 36px; height: 36px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; z-index: 2; border-radius: 50%; transition: all 0.15s;
  }
  .modal-close:hover { background: var(--crimson); border-color: var(--crimson); color: white; }
  .modal-body { padding: 4rem 2rem 2rem; margin-top: 1rem; }
  .modal-top-row {
    display: flex; justify-content: space-between;
    align-items: flex-start; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap;
  }
  .modal-title {
    font-family: var(--display);
    font-size: clamp(1.6rem, 4vw, 2.8rem); letter-spacing: 2px; color: var(--white); line-height: 1;
  }
  .modal-tagline { font-size: 0.85rem; color: var(--muted); font-style: italic; margin-top: 0.4rem; }
  .modal-acts { display: flex; gap: 0.6rem; flex-shrink: 0; }
  .modal-btn {
    display: flex; align-items: center; gap: 0.4rem;
    border: 1px solid var(--border); background: none; color: var(--text);
    padding: 0.55rem 1rem; font-family: var(--body); font-size: 0.78rem;
    cursor: pointer; transition: all 0.15s; border-radius: 2px; text-decoration: none;
  }
  .modal-btn:hover { border-color: var(--crimson); color: var(--crimson); }
  .modal-btn.primary { background: var(--crimson); border-color: var(--crimson); color: white; font-weight: 600; }
  .modal-btn.primary:hover { background: var(--crimson2); }
  .modal-btn.saved { background: rgba(229,9,20,0.1); border-color: var(--crimson); color: var(--crimson); }
  .modal-pills { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.25rem; align-items: center; }
  .pill {
    display: flex; align-items: center; gap: 0.35rem;
    background: var(--rim); border: 1px solid var(--border);
    padding: 0.35rem 0.75rem; font-size: 0.75rem; color: var(--muted); border-radius: 20px;
  }
  .pill svg { color: var(--crimson); }
  .pill.gold svg { color: var(--gold); }
  .pill strong { color: var(--text); }
  /* SVG rating ring */
  .ring-wrap { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; margin-left: auto; }
  .ring-label { font-size: 0.62rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; }
  .ring-svg { width: 54px; height: 54px; }
  .ring-bg   { fill: none; stroke: var(--rim); stroke-width: 5; }
  .ring-fill { fill: none; stroke-width: 5; stroke-linecap: round; transform: rotate(-90deg); transform-origin: 50% 50%; transition: stroke-dasharray 0.8s ease; }
  .ring-num  { font-family: var(--body); font-size: 11px; font-weight: 700; fill: var(--white); dominant-baseline: middle; text-anchor: middle; }
  .modal-genres { display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
  .genre-pill { border: 1px solid var(--border); padding: 0.2rem 0.65rem; font-size: 0.7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; border-radius: 2px; }
  .modal-overview { font-size: 0.9rem; color: var(--muted); line-height: 1.8; }

  /* ── WATCHLIST DRAWER ── */
  .drawer-back { position: fixed; inset: 0; z-index: 300; background: rgba(0,0,0,0.6); }
  .drawer {
    position: fixed; top: 0; right: 0; bottom: 0;
    width: 100%; max-width: 380px; background: var(--dark);
    border-left: 1px solid var(--border); z-index: 301;
    display: flex; flex-direction: column;
    animation: drawerIn 0.3s ease both;
  }
  @keyframes drawerIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
  .drawer-head {
    padding: 1.5rem; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .drawer-head h3 {
    font-family: var(--display); font-size: 1.5rem;
    letter-spacing: 2px; color: var(--white);
    display: flex; align-items: center; gap: 0.5rem;
  }
  .drawer-head h3 svg { color: var(--crimson); }
  .drawer-x {
    background: none; border: 1px solid var(--border); color: var(--muted);
    width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.15s; border-radius: 50%;
  }
  .drawer-x:hover { border-color: var(--crimson); color: var(--crimson); }
  .drawer-list {
    flex: 1; overflow-y: auto; padding: 1rem;
    display: flex; flex-direction: column; gap: 0.75rem;
  }
  .drawer-item {
    display: grid; grid-template-columns: 50px 1fr auto;
    gap: 0.75rem; align-items: center;
    background: var(--panel); border: 1px solid var(--border);
    padding: 0.75rem; border-radius: 2px;
    cursor: pointer; transition: border-color 0.15s;
  }
  .drawer-item:hover { border-color: var(--crimson); }
  .di-poster { width: 50px; height: 75px; object-fit: cover; border-radius: 2px; }
  .di-blank  { width: 50px; height: 75px; background: var(--rim); display: flex; align-items: center; justify-content: center; color: var(--faint); border-radius: 2px; }
  .di-title  { font-size: 0.85rem; font-weight: 500; margin-bottom: 0.2rem; line-height: 1.3; }
  .di-year   { font-size: 0.72rem; color: var(--muted); }
  .di-del    { background: none; border: none; color: var(--faint); cursor: pointer; transition: color 0.15s; }
  .di-del:hover { color: var(--crimson); }
  .drawer-empty {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 0.75rem; color: var(--muted); text-align: center; padding: 2rem;
  }
  .drawer-empty svg { opacity: 0.15; }
  .drawer-empty p { font-size: 0.85rem; line-height: 1.6; }

  /* ── EMPTY STATE ── */
  .empty-state { text-align: center; padding: 5rem 2rem; color: var(--muted); }
  .empty-state svg { opacity: 0.12; margin-bottom: 1rem; }
  .empty-state h3 { font-family: var(--display); font-size: 1.8rem; letter-spacing: 2px; color: var(--text); margin-bottom: 0.5rem; }
  .empty-state p  { font-size: 0.88rem; line-height: 1.6; }

  /* ── SCROLL TOP ── */
  .scroll-top {
    position: fixed; bottom: 2rem; right: 2rem; z-index: 50;
    background: var(--crimson); color: white; border: none;
    width: 40px; height: 40px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; box-shadow: 0 4px 20px rgba(229,9,20,0.4);
    transition: background 0.15s; animation: fadeUp 0.3s ease;
  }
  .scroll-top:hover { background: var(--crimson2); }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform:translateY(0); } }

  /* ── RESPONSIVE ── */
  @media (max-width: 640px) {
    nav { padding: 0 1.25rem; }
    .hero { height: 380px; }
    .hero-content { padding: 0 1.25rem 2rem; }
    .main { padding: 1.5rem 1.25rem 4rem; }
    .movie-grid { grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 0.5rem; }
    .modal-back { height: 220px; }
    .modal-poster { width: 90px; height: 135px; bottom: -40px; }
    .modal-body { padding: 3rem 1.25rem 1.25rem; }
    .mode-tabs { margin-left: 0; width: 100%; }
    .mode-tab { flex: 1; justify-content: center; }
  }
`;

export default styles;
