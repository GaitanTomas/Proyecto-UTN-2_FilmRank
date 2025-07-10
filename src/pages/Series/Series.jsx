import React from "react";
import usePageTitle from "../../hooks/usePageTitles";
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../../components/Loader/Loader.jsx';
import Card from '../../components/Card/Card.jsx';
import { getTopSeries } from '../../services/tmdb-api.js';
import '../Movies/Movies.css';

const Series = () => {
  usePageTitle("Series | FilmRank");

  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchSeries = async (currentPage) => {
    try {
      setLoading(true);
      const data = await getTopSeries(currentPage);
      setSeries((prev) => {
        if (currentPage === 1) {
          return data.results;
        }
        return [...prev, ...data.results];
      });
      
      if (currentPage >= data.total_pages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error cargando series:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeries(page);
  }, [page]);

  const loadMoreSeries = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  if (loading) return <Loader />;

  return (
    <section className="series-page">
      <h2 className="series-page__title">Series y shows de TV</h2>
      <InfiniteScroll
        dataLength={series.length}
        next={loadMoreSeries}
        hasMore={hasMore}
        loader={<Loader />}
      >
        <div className="series-page__cards-grid">
          {series.map((serie) => (
            <Card key={serie.id} item={serie} />
          ))}
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default Series;