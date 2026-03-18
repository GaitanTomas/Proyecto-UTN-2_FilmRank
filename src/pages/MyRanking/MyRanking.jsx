import React, { useContext, useMemo, useState, useEffect } from "react";
import { Star, Search, X } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import usePageTitle from "../../hooks/usePageTitles";
import useDebounce from "../../hooks/useDebounce";
import { RankingContext } from "../../context/RankingContext";
import Card from "../../components/Card/Card.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import SearchBarRanking from "../../components/SearchBarRanking/SearchBarRanking.jsx";
import "./MyRanking.css";

const ITEMS_PER_BATCH = 10;

const MyRanking = () => {
  usePageTitle("Mi Ranking | FilmRank");
  const { ratedItems, loading } = useContext(RankingContext);
  const [sortBy, setSortBy] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedItems, setDisplayedItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
  let items = [...ratedItems];

  // Filter by search query
  if (debouncedSearchQuery.trim() !== "") {
    const query = debouncedSearchQuery.toLowerCase();
    items = items.filter((item) =>
      item.title.toLowerCase().includes(query)
    );
  }

  // Sort items
  if (sortBy === "rating") {
    return items.sort((a, b) => b.userRating - a.userRating);
  } else if (sortBy === "rating-low") {
    return items.sort((a, b) => a.userRating - b.userRating);
  }
  return items.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
}, [ratedItems, sortBy, debouncedSearchQuery]);

  // Initialize displayed items when filtered list changes
  useEffect(() => {
    setDisplayedItems(filteredAndSortedItems.slice(0, ITEMS_PER_BATCH));
    setHasMore(filteredAndSortedItems.length > ITEMS_PER_BATCH);
  }, [filteredAndSortedItems]);

  // Load more items
  const loadMoreItems = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const currentLength = displayedItems.length;
      const newItems = filteredAndSortedItems.slice(
        currentLength,
        currentLength + ITEMS_PER_BATCH
      );
      setDisplayedItems((prev) => [...prev, ...newItems]);
      
      if (currentLength + ITEMS_PER_BATCH >= filteredAndSortedItems.length) {
        setHasMore(false);
      }
      setIsLoadingMore(false);
    }, 300);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  if (loading) return <Loader />;

  if (ratedItems.length === 0) {
    return (
      <section className="my-ranking-page">
        <h2 className="my-ranking-page__title">Mi Ranking</h2>
        <div className="my-ranking-empty">
          <Star size={48} />
          <h3>No has calificado ninguna película o serie aún</h3>
          <p>
            Comienza a explorar películas y series para crear tu ranking
            personalizado.
          </p>
        </div>
      </section>
    );
  }

  const showNoResults = debouncedSearchQuery.trim() !== "" && filteredAndSortedItems.length === 0;

  return (
    <section className="my-ranking-page">
      <div className="my-ranking-header">
        <h2 className="my-ranking-page__title">Mi Ranking</h2>
        <div className="my-ranking-stats">
          <p>
            Peliculas calificadas: <strong>{ratedItems.length}</strong>
            {debouncedSearchQuery && (
              <span> • Resultados: <strong>{filteredAndSortedItems.length}</strong></span>
            )}
          </p>
        </div>
      </div>

      <SearchBarRanking
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onClear={handleClearSearch}
        placeholder="Buscar en mi ranking..."
      />

      {/* Sort Controls */}
      <div className="my-ranking-controls">
        <label htmlFor="sort-select" className="sort-label">
          Ordenar por:
        </label>
        <select
          id="sort-select"
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="recent">Más recientes</option>
          <option value="rating">Calificación más alta</option>
          <option value="rating-low">Calificación más baja</option>
        </select>
      </div>

      {/* No Results */}
      {showNoResults ? (
        <div className="my-ranking-no-results">
          <Search size={48} />
          <h3>No se encontraron resultados</h3>
          <p>Intenta con otro término de búsqueda</p>
        </div>
      ) : (
        /* Infinite Scroll Grid */
        <InfiniteScroll
          dataLength={displayedItems.length}
          next={loadMoreItems}
          hasMore={hasMore}
          loader={<Loader key="loader" />}
        >
          <div className="my-ranking-page__cards-grid">
            {displayedItems.map((ratedItem) => (
              <div key={ratedItem.id} className="ranking-card-wrapper">
                <Card item={ratedItem} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </section>
  );
};

export default MyRanking;