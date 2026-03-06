# Cinex

> Movie and TV discovery. Built on the TMDB API.

## Getting started

    # 1. Clone and install
    npm install

    # 2. Add your TMDB key
    echo "REACT_APP_TMDB_KEY=your_key_here" > .env

    # 3. Start
    npm start

Free TMDB key → themoviedb.org/settings/api

---

## A few implementation notes

**Infinite scroll** — no library. A div sits at the bottom of the grid. 
The IntersectionObserver fires when it enters the viewport and fetches 
the next page.

**Search** — debounced at 500ms. Without that, every keystroke 
hits the API. With it, only the final input does.

**Three endpoints** — /search for keyword queries, /discover for 
filtered browsing, /movie/:id for the detail modal. Each one is 
triggered by a different user action.

---

Stack: React · TMDB API · CSS  
Live: [#](#)
