import React, { useContext, useMemo, useState } from "react";
import { Star } from "lucide-react";
import usePageTitle from "../../hooks/usePageTitles";
import { RankingContext } from "../../context/RankingContext";
import Card from "../../components/Card/Card.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import "./MyRanking.css";

const MyRanking = () => {
  usePageTitle("Mi Ranking | FilmRank");
  const { ratedItems, loading } = useContext(RankingContext);
  const [sortBy, setSortBy] = useState("recent");

  const sortedItems = useMemo(() => {
    const items = [...ratedItems];
  if (sortBy === "rating") {
    return items.sort((a, b) => b.userRating - a.userRating);
  } else if (sortBy === "rating-low") {
    return items.sort((a, b) => a.userRating - b.userRating);
  }
  return items.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
}, [ratedItems, sortBy]);

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

  return (
    <section className="my-ranking-page">
      <div className="my-ranking-header">
        <h2 className="my-ranking-page__title">Mi Ranking</h2>
        <div className="my-ranking-stats">
          <p>
            Peliculas calificadas: <strong>{ratedItems.length}</strong> 
          </p>
        </div>
      </div>

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

      <div className="my-ranking-page__cards-grid">
        {sortedItems.map((ratedItem) => (
          <div key={ratedItem.id} className="ranking-card-wrapper">
            <Card item={ratedItem} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyRanking;