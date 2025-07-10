import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../components/Loader/Loader.jsx";
import Card from "../../components/Card/Card.jsx";
import { searchMovies, searchSeries } from "../../services/tmdb-api.js";
import usePageTitle from "../../hooks/usePageTitles";

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search).get("q") || "";
}

const SearchResults = () => {
  const query = useQuery();
  const location = useLocation();
  const isSeries = location.pathname.includes("series");

  usePageTitle(`Resultados de ${query} | FilmRank`);

  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchResults = async (currentPage) => {
    if (!query.trim()) return;
    try {
      setLoading(true);
      const data = isSeries
        ? await searchSeries(query, currentPage)
        : await searchMovies(query, currentPage);

      setResults((prev) => {
        return currentPage === 1 ? data.results : [...prev, ...data.results];
      });

      if (currentPage >= data.total_pages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error cargando resultados:", error);
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
    setResults([]);
    setPage(1);
    setHasMore(true);
  }, [query, isSeries]);

  useEffect(() => {
    if (query) fetchResults(page);
  }, [page, query]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  if (loading && results.length === 0) return <Loader />;

  return (
    <section className="search-page">
      <h2 className="search-page__title">Resultados para "{query}"</h2>
      <InfiniteScroll
        dataLength={results.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<Loader />}
      >
        <div className="search-page__cards-grid">
          {results.length === 0 ? (
            <p className="search-page__no-results">No se encontraron resultados</p>
          ) : (
            results.map((item) => (
              <Card key={item.id} item={item} type={isSeries ? "tv" : "movie"} />
            ))
          )}
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default SearchResults;