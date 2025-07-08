const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Petición genérica a la API de TMDB
async function fetchFromTMDB(endpoint) {
    const res = await fetch(`${BASE_URL}${endpoint}&api_key=${API_KEY}`);

    if (!res.ok) {
      throw new Error("Error al obtener datos de TMDB");
    }

    const data = await res.json();
    return data.results;
}

// Películas en tendencia semanal
export function getTrendingMovies() {
  return fetchFromTMDB("/trending/movie/week?").then(data => data.slice(0, 10));
}

// Series en tendencia semanal
export function getTrendingSeries() {
  return fetchFromTMDB("/trending/tv/week?").then(data => data.slice(0, 10));
}

// Películas próximas a estrenarse
export function getUpcomingMovies() {
  return fetchFromTMDB("/movie/upcoming?").then(data => data.slice(0, 10));
}



