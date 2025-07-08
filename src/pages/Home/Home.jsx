import { useEffect, useState } from 'react';
import { getTrendingMovies, getTrendingSeries, getUpcomingMovies } from '../../services/tmdb-api.js';
import SwiperContainer from '../../components/SwiperContainer/SwiperContainer.jsx';
import usePageTitle from "../../hooks/usePageTitles";
import './Home.css';

function Home() {
  usePageTitle("Inicio | FilmRank");
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [movies, series, upcoming] = await Promise.all([
          getTrendingMovies(),
          getTrendingSeries(),
          getUpcomingMovies()
        ]);
        setTrendingMovies(movies);
        setTrendingSeries(series);
        setUpcomingMovies(upcoming);
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return "cargando...";

  return (
    <section className="home-page">
      <SwiperContainer title="Películas en Tendencia" items={trendingMovies} type="movie" />
      <SwiperContainer title="Series en Tendencia" items={trendingSeries} type="tv" />
      <SwiperContainer title="Próximos Estrenos" items={upcomingMovies} type="movie" />
    </section>
  );
}

export default Home;
