import { useState, useEffect, useCallback, useRef } from "react";
import {
  Search,
  X,
  Star,
  Clock,
  Calendar,
  BookmarkPlus,
  BookmarkCheck,
  Play,
  Film,
  Tv,
  TrendingUp,
  Award,
  Loader2,
  ExternalLink,
  Clapperboard,
  ArrowUp,
} from "lucide-react";
import { getTitle, getDate, getYear, ratingColor } from "../utils/helpers";
import { GENRES_MOVIE, GENRES_TV, SORT_OPTIONS, MOCK } from "../utils/data";
import { API_KEY, BASE, IMG, USE_MOCK } from "../config/api";
import SkeletonCard from "./Skeleton";
import RatingRing from "./Rating";
import styles from "../style";

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function MovieSearch() {
  // console.log("MovieSearch component mounted");
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [mode, setMode] = useState("movie");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [genreId, setGenreId] = useState("");
  const [year, setYear] = useState("");
  const [selected, setSelected] = useState(null); // card clicked → opens modal
  const [details, setDetails] = useState(null); // full detail API response
  const [watchlist, setWatchlist] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [hero, setHero] = useState(null); // featured movie in hero banner
  const [isSearching, setIsSearching] = useState(false);

  // useEffect(() => {
  //   console.log("ENV TEST", {
  //     API_KEY,
  //     BASE,
  //     IMG,
  //   });
  // }, []);
  // Refs
  const sentinelRef = useRef(null); // bottom div watched by IntersectionObserver
  const searchTimer = useRef(null); // debounce timer

  const fetchMovies = useCallback(
    async (pg = 1, append = false) => {
      // console.log("fetchMovies triggered", pg);
      // append=false → fresh results, append=true → infinite scroll adding more
      if (pg === 1) setLoading(true);
      else setLoadingMore(true);

      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 600));
        setMovies(MOCK);
        setHero(MOCK[0]);
        setTotalPages(1);
        setLoading(false);
        setLoadingMore(false);
        return;
      }

      try {
        // console.log("Fetching movies...");
        // console.log("API_KEY:", API_KEY);
        // console.log("BASE:", BASE);
        // console.log("MODE:", mode);
        // console.log("QUERY:", query);
        // console.log("PAGE:", pg);

        let url;
        if (isSearching && query.trim()) {
          // /search/movie or /search/tv — keyword search
          url = `${BASE}/search/${mode}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${pg}`;
        } else {
          // /discover/movie or /discover/tv — filtered browsing
          url = `${BASE}/discover/${mode}?api_key=${API_KEY}&sort_by=${sortBy}&page=${pg}&vote_count.gte=100`;
          if (genreId) url += `&with_genres=${genreId}`;
          if (year)
            url +=
              mode === "movie"
                ? `&primary_release_year=${year}`
                : `&first_air_date_year=${year}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        // console.log("Fetched data:", data);
        const results = data.results ?? [];

        setTotalPages(data.total_pages ?? 1);
        // append mode: merge with existing; normal mode: replace
        setMovies((prev) => (append ? [...prev, ...results] : results));

        // Pin hero to first result with a backdrop on fresh page 1 loads
        if (pg === 1 && results.length > 0) {
          setHero(results.find((m) => m.backdrop_path) ?? results[0]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [query, mode, sortBy, genreId, year, isSearching],
  );
  async function fetchDetail(id) {
    if (USE_MOCK) {
      const m = MOCK.find((x) => x.id === id);
      setDetails({
        ...m,
        runtime: 152,
        tagline: "Why so serious?",
        genres: [{ name: "Action" }, { name: "Crime" }],
        status: "Released",
      });
      return;
    }
    try {
      const res = await fetch(`${BASE}/${mode}/${id}?api_key=${API_KEY}`);
      const data = await res.json();
      setDetails(data);
    } catch (err) {
      console.error(err);
    }
  }

  // ── EFFECTS ──────────────────────────────────────────────────────────────

  // Re-fetch when filters or mode change (not query — that's debounced separately)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(
    () => {
      fetchMovies(1);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sortBy, genreId, year, mode],
  );

  // Debounced search — 500ms wait after user stops typing avoids spamming the API
  useEffect(
    () => {
      clearTimeout(searchTimer.current);
      if (query.trim().length > 1) {
        setIsSearching(true);
        searchTimer.current = setTimeout(() => {
          setPage(1);
          fetchMovies(1);
        }, 500);
      } else if (query === "") {
        setIsSearching(false);
        setPage(1);
        fetchMovies(1);
      }
      return () => clearTimeout(searchTimer.current);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query],
  );

  // IntersectionObserver — watches the sentinel div at the bottom of the grid
  // When it enters the viewport, fetch the next page and append results
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !loadingMore &&
          !loading &&
          page < totalPages
        ) {
          const next = page + 1;
          setPage(next);
          fetchMovies(next, true); // true = append
        }
      },
      { threshold: 0.1 },
    );
    const el = sentinelRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [loadingMore, loading, page, totalPages, fetchMovies]);

  // Show scroll-to-top button after 400px scroll
  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Fetch full details when a movie card is clicked
  useEffect(
    () => {
      if (selected) fetchDetail(selected.id);
      else setDetails(null);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selected],
  );

  // ── WATCHLIST ─────────────────────────────────────────────────────────────
  function toggleWL(movie, e) {
    if (e) e.stopPropagation();
    setWatchlist((prev) =>
      prev.find((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie],
    );
  }
  const inWL = (id) => watchlist.some((m) => m.id === id);

  // ── RENDER ────────────────────────────────────────────────────────────────
  const GENRES = mode === "movie" ? GENRES_MOVIE : GENRES_TV;

  return (
    <>
      <style>{styles}</style>

      {/* ── NAV ── */}
      <nav className={showTop ? "scrolled" : ""}>
        <div className="nav-brand">
          CINE<span>X</span>
        </div>
        <div className="nav-right">
          <button className="wl-btn" onClick={() => setDrawerOpen(true)}>
            <BookmarkCheck size={14} />
            Watchlist
            {watchlist.length > 0 && (
              <span className="wl-count">{watchlist.length}</span>
            )}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      {hero && (
        <div className="hero">
          <div
            className="hero-bg"
            style={{
              backgroundImage: hero.backdrop_path
                ? `url(${IMG}/original${hero.backdrop_path})`
                : "linear-gradient(135deg,#1a0808,#0e0e0e)",
            }}
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <div className="hero-badge">
              <TrendingUp size={10} /> Featured
            </div>
            <h1 className="hero-title">{getTitle(hero)}</h1>
            <div className="hero-meta">
              <span className="gold">
                <Star size={13} fill="currentColor" />{" "}
                {hero.vote_average?.toFixed(1)}
              </span>
              <span>
                <Calendar size={11} /> {getYear(getDate(hero))}
              </span>
            </div>
            {hero.overview && <p className="hero-overview">{hero.overview}</p>}
            <div className="hero-actions">
              <button className="btn-white" onClick={() => setSelected(hero)}>
                <Play size={15} fill="currentColor" /> More Info
              </button>
              <button className="btn-ghost" onClick={(e) => toggleWL(hero, e)}>
                {inWL(hero.id) ? (
                  <>
                    <BookmarkCheck size={14} /> Saved
                  </>
                ) : (
                  <>
                    <BookmarkPlus size={14} /> Watchlist
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN ── */}
      <div className="main">
        {USE_MOCK && (
          <div className="setup-notice">
            <strong>Demo Mode — Add Your TMDB Key to Load Real Movies</strong>
            Get a free key at <code>themoviedb.org</code> → Settings → API (v3
            auth). Replace <code>YOUR_TMDB_API_KEY_HERE</code> at the top of the
            file.
          </div>
        )}

        {/* Search */}
        <div className="search-section">
          <div className="search-box">
            <div className="search-icon">
              <Search size={16} />
            </div>
            <input
              className="search-input"
              type="text"
              placeholder={`Search ${mode === "movie" ? "movies" : "TV shows"}...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            {query && (
              <button className="search-clear" onClick={() => setQuery("")}>
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="filter-bar">
          <select
            className="fselect"
            value={genreId}
            onChange={(e) => {
              setGenreId(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Genres</option>
            {GENRES.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
          <select
            className="fselect"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <select
            className="fselect"
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Any Year</option>
            {Array.from({ length: 35 }, (_, i) => 2024 - i).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <div className="mode-tabs">
            <button
              className={`mode-tab ${mode === "movie" ? "active" : ""}`}
              onClick={() => {
                setMode("movie");
                setGenreId("");
                setPage(1);
              }}
            >
              <Film size={13} /> Movies
            </button>
            <button
              className={`mode-tab ${mode === "tv" ? "active" : ""}`}
              onClick={() => {
                setMode("tv");
                setGenreId("");
                setPage(1);
              }}
            >
              <Tv size={13} /> TV Shows
            </button>
          </div>
        </div>

        {/* Section heading */}
        <div className="section-head">
          <h2>
            {isSearching ? (
              <>
                <Search size={20} /> "{query}"
              </>
            ) : (
              <>
                <TrendingUp size={20} />{" "}
                {SORT_OPTIONS.find((s) => s.value === sortBy)?.label}
              </>
            )}
          </h2>
          {!loading && (
            <span className="result-count">{movies.length} titles</span>
          )}
        </div>

        {/* Movie grid */}
        <div className="movie-grid">
          {loading
            ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
            : movies.map((movie) => (
                <div
                  className="movie-card"
                  key={movie.id}
                  onClick={() => setSelected(movie)}
                >
                  <div className="card-img-wrap">
                    {movie.poster_path ? (
                      <img
                        className="card-img"
                        src={`${IMG}/w342${movie.poster_path}`}
                        alt={getTitle(movie)}
                        loading="lazy"
                      />
                    ) : (
                      <div className="card-no-img">
                        <Clapperboard size={28} />
                        <span>{getTitle(movie)}</span>
                      </div>
                    )}
                  </div>

                  {/* Hover overlay */}
                  <div className="card-ov">
                    <div className="card-ov-top">
                      <button
                        className={`card-bmark ${inWL(movie.id) ? "on" : ""}`}
                        onClick={(e) => toggleWL(movie, e)}
                      >
                        {inWL(movie.id) ? (
                          <BookmarkCheck size={13} />
                        ) : (
                          <BookmarkPlus size={13} />
                        )}
                      </button>
                    </div>
                    <div className="card-ov-bottom">
                      <div className="card-rating-pill">
                        <Star size={10} fill="currentColor" />{" "}
                        {movie.vote_average?.toFixed(1)}
                      </div>
                      <div className="card-ov-title">{getTitle(movie)}</div>
                      <div className="card-ov-year">
                        {getYear(getDate(movie))}
                      </div>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="card-name">{getTitle(movie)}</div>
                    <div className="card-sub">
                      <span>{getYear(getDate(movie))}</span>
                      <span className="dot" />
                      <span style={{ color: ratingColor(movie.vote_average) }}>
                        ★ {movie.vote_average?.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Empty state */}
        {!loading && movies.length === 0 && (
          <div className="empty-state">
            <Film size={64} />
            <h3>No Results Found</h3>
            <p>Try a different search term, genre, or year.</p>
          </div>
        )}

        {/* Infinite scroll sentinel — IntersectionObserver watches this */}
        <div ref={sentinelRef} className="sentinel">
          {loadingMore && (
            <>
              <Loader2 size={16} /> Loading more...
            </>
          )}
        </div>
      </div>

      {/* ── MODAL ── */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>
              <X size={16} />
            </button>

            {/* Full-bleed backdrop */}
            <div className="modal-back">
              {details?.backdrop_path || selected.backdrop_path ? (
                <img
                  src={`${IMG}/w1280${details?.backdrop_path || selected.backdrop_path}`}
                  alt=""
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "var(--panel)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Clapperboard size={60} color="var(--faint)" />
                </div>
              )}
              <div className="modal-back-grad" />
              {(details?.poster_path || selected.poster_path) && (
                <img
                  className="modal-poster"
                  src={`${IMG}/w342${details?.poster_path || selected.poster_path}`}
                  alt={getTitle(selected)}
                />
              )}
            </div>

            <div className="modal-body">
              <div className="modal-top-row">
                <div>
                  <h2 className="modal-title">{getTitle(selected)}</h2>
                  {details?.tagline && (
                    <p className="modal-tagline">"{details.tagline}"</p>
                  )}
                </div>
                <div className="modal-acts">
                  <button
                    className={`modal-btn ${inWL(selected.id) ? "saved" : ""}`}
                    onClick={(e) => toggleWL(selected, e)}
                  >
                    {inWL(selected.id) ? (
                      <>
                        <BookmarkCheck size={14} /> Saved
                      </>
                    ) : (
                      <>
                        <BookmarkPlus size={14} /> Watchlist
                      </>
                    )}
                  </button>
                  <a
                    className="modal-btn primary"
                    href={`https://www.themoviedb.org/${mode}/${selected.id}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <ExternalLink size={14} /> TMDB
                  </a>
                </div>
              </div>

              {/* Stat pills + rating ring */}
              <div className="modal-pills">
                <div className="pill gold">
                  <Star size={12} fill="currentColor" />
                  <strong>{selected.vote_average?.toFixed(1)}</strong>
                  <span>
                    / 10 · {selected.vote_count?.toLocaleString()} votes
                  </span>
                </div>
                {details?.runtime && (
                  <div className="pill">
                    <Clock size={12} />
                    <strong>
                      {Math.floor(details.runtime / 60)}h {details.runtime % 60}
                      m
                    </strong>
                  </div>
                )}
                <div className="pill">
                  <Calendar size={12} />
                  <strong>{getYear(getDate(selected))}</strong>
                </div>
                {details?.status && (
                  <div className="pill">
                    <Award size={12} />
                    <strong>{details.status}</strong>
                  </div>
                )}
                <RatingRing rating={selected.vote_average ?? 0} />
              </div>

              {/* Genre tags */}
              {details?.genres?.length > 0 && (
                <div className="modal-genres">
                  {details.genres.map((g) => (
                    <span className="genre-pill" key={g.id}>
                      {g.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              {selected.overview && (
                <p className="modal-overview">{selected.overview}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── WATCHLIST DRAWER ── */}
      {drawerOpen && (
        <>
          <div className="drawer-back" onClick={() => setDrawerOpen(false)} />
          <div className="drawer">
            <div className="drawer-head">
              <h3>
                <BookmarkCheck size={20} /> Watchlist
              </h3>
              <button className="drawer-x" onClick={() => setDrawerOpen(false)}>
                <X size={15} />
              </button>
            </div>
            {watchlist.length === 0 ? (
              <div className="drawer-empty">
                <Film size={52} />
                <p>
                  Your watchlist is empty.
                  <br />
                  Bookmark movies and shows above.
                </p>
              </div>
            ) : (
              <div className="drawer-list">
                {watchlist.map((movie) => (
                  <div
                    className="drawer-item"
                    key={movie.id}
                    onClick={() => {
                      setSelected(movie);
                      setDrawerOpen(false);
                    }}
                  >
                    {movie.poster_path ? (
                      <img
                        className="di-poster"
                        src={`${IMG}/w92${movie.poster_path}`}
                        alt={getTitle(movie)}
                      />
                    ) : (
                      <div className="di-blank">
                        <Clapperboard size={18} />
                      </div>
                    )}
                    <div>
                      <div className="di-title">{getTitle(movie)}</div>
                      <div className="di-year">
                        {getYear(getDate(movie))} · ★{" "}
                        {movie.vote_average?.toFixed(1)}
                      </div>
                    </div>
                    <button
                      className="di-del"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWL(movie);
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* ── SCROLL TO TOP ── */}
      {showTop && (
        <button
          className="scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp size={18} />
        </button>
      )}
    </>
  );
}
