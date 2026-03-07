const GENRES_MOVIE = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 14, name: "Fantasy" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" },
  { id: 10749, name: "Romance" },
];
const GENRES_TV = [
  { id: 10759, name: "Action" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 10765, name: "Sci-Fi" },
  { id: 9648, name: "Mystery" },
];
const SORT_OPTIONS = [
  { value: "popularity.desc", label: "Most Popular" },
  { value: "vote_average.desc", label: "Highest Rated" },
  { value: "release_date.desc", label: "Newest First" },
  { value: "revenue.desc", label: "Box Office" },
];

// Mock data for demo mode
const MOCK = [
  {
    id: 1,
    title: "The Dark Knight",
    release_date: "2008-07-18",
    vote_average: 9.0,
    vote_count: 32000,
    poster_path: null,
    backdrop_path: null,
    overview:
      "When the Joker wreaks havoc on Gotham, Batman faces his greatest psychological test of fighting injustice.",
    genre_ids: [28, 80, 18],
  },
  {
    id: 2,
    title: "Inception",
    release_date: "2010-07-16",
    vote_average: 8.8,
    vote_count: 35000,
    poster_path: null,
    backdrop_path: null,
    overview:
      "A thief who steals corporate secrets through dream-sharing is given the task of planting an idea instead.",
    genre_ids: [28, 878, 53],
  },
  {
    id: 3,
    title: "Interstellar",
    release_date: "2014-11-07",
    vote_average: 8.7,
    vote_count: 33000,
    poster_path: null,
    backdrop_path: null,
    overview:
      "A team of explorers travel through a wormhole in space to ensure humanity's survival.",
    genre_ids: [12, 18, 878],
  },
  {
    id: 4,
    title: "Parasite",
    release_date: "2019-05-30",
    vote_average: 8.5,
    vote_count: 17000,
    poster_path: null,
    backdrop_path: null,
    overview:
      "Greed and class discrimination threaten the symbiotic relationship between the wealthy Park family and the destitute Kims.",
    genre_ids: [35, 80, 18],
  },
  {
    id: 5,
    title: "Dune",
    release_date: "2021-10-22",
    vote_average: 8.0,
    vote_count: 22000,
    poster_path: null,
    backdrop_path: null,
    overview:
      "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset.",
    genre_ids: [28, 12, 878],
  },
  {
    id: 6,
    title: "Whiplash",
    release_date: "2014-10-10",
    vote_average: 8.5,
    vote_count: 15000,
    poster_path: null,
    backdrop_path: null,
    overview:
      "A promising drummer enrolls at a cutthroat conservatory where his instructor will stop at nothing to push him.",
    genre_ids: [18],
  },
  {
    id: 7,
    title: "Mad Max: Fury Road",
    release_date: "2015-05-14",
    vote_average: 8.1,
    vote_count: 21000,
    poster_path: null,
    backdrop_path: null,
    overview:
      "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland.",
    genre_ids: [28, 12],
  },
  {
    id: 8,
    title: "The Godfather",
    release_date: "1972-03-14",
    vote_average: 8.7,
    vote_count: 19000,
    poster_path: null,
    backdrop_path: null,
    overview:
      "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
    genre_ids: [18, 80],
  },
];

export { GENRES_MOVIE, GENRES_TV, SORT_OPTIONS, MOCK };
