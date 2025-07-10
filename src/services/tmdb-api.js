const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Petición genérica a la API de TMDB
async function fetchFromTMDB(endpoint, page = 1) {
    const res = await fetch(`${BASE_URL}${endpoint}&api_key=${API_KEY}&page=${page}`);

    if (!res.ok) {
      throw new Error("Error al obtener datos de TMDB");
    }

    const data = await res.json();
    return data;
}

// Películas en tendencia semanal
export function getTrendingMovies() {
  return fetchFromTMDB("/trending/movie/week?").then(data => data.results.slice(0, 10));
}

// Series en tendencia semanal
export function getTrendingSeries() {
  return fetchFromTMDB("/trending/tv/week?").then(data => data.results.slice(0, 10));
}

// Películas próximas a estrenarse
export function getUpcomingMovies() {
  return fetchFromTMDB("/movie/upcoming?").then(data => data.results.slice(0, 10));
}

// Películas populares
export function getPopularMovies(page) {
  return fetchFromTMDB("/movie/popular?", page);
}

// Series mejor valoradas
export function getTopSeries(page) {
  return fetchFromTMDB("/tv/top_rated?", page);
}

// Buscar películas por nombre
export function searchMovies(query, page = 1) {
  return fetchFromTMDB(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`);
}

// Buscar series por nombre
export function searchSeries(query, page = 1) {
  return fetchFromTMDB(`/search/tv?query=${encodeURIComponent(query)}&page=${page}`);
}




