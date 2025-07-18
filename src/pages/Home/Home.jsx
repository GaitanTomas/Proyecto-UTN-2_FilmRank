import { useEffect, useState } from 'react';
import { getTrendingMovies, getTrendingSeries, getUpcomingMovies } from '../../services/tmdb-api.js';
import SwiperContainer from '../../components/SwiperContainer/SwiperContainer.jsx';
import usePageTitle from "../../hooks/usePageTitles";
import Loader from '../../components/Loader/Loader.jsx';
import './Home.css';

function Home() {
  usePageTitle("FilmRank");
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

  if (loading) return <Loader />;

  return (
    <section className="home-page">
      <SwiperContainer title="Películas en Tendencia" items={trendingMovies}/>
      <SwiperContainer title="Series en Tendencia" items={trendingSeries}/>
      <SwiperContainer title="Próximos Estrenos" items={upcomingMovies}/>
    </section>
  );
}

export default Home;
