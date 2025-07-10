import React from "react";
import usePageTitle from "../../hooks/usePageTitles";
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../../components/Loader/Loader.jsx';
import Card from '../../components/Card/Card.jsx';
import { getPopularMovies } from '../../services/tmdb-api.js';
import './Movies.css';

const Movies = () => {
  usePageTitle("Peliculas | FilmRank");

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (currentPage) => {
    try {
      setLoading(true);
      const data = await getPopularMovies(currentPage);
      setMovies((prev) => {
        if (currentPage === 1) {
          return data.results;
        }
        return [...prev, ...data.results];
      });
      
      if (currentPage >= data.total_pages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error cargando peliculas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const loadMoreMovies = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  if (loading) return <Loader />;

  return (
    <section className="movies-page">
      <h2 className="movies-page__title">Peliculas</h2>
      <InfiniteScroll
        dataLength={movies.length}
        next={loadMoreMovies}
        hasMore={hasMore}
        loader={<Loader />}
      >
        <div className="movies-page__cards-grid">
          {movies.map((movie) => (
            <Card key={movie.id} item={movie} />
          ))}
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default Movies;