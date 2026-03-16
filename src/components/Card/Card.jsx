import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Star, Trash2, Pencil } from 'lucide-react';
import { getYear } from '../../utils/formatDate.js';
import { RankingContext } from '../../context/RankingContext.jsx';
import RatingModal from '../Modal/RatingModal.jsx';
import placeholder from '../../assets/placeholder.jpg'
import { toast } from 'react-toastify';
import './Card.css';

function Card({ item }) {
  const { isRated, addRating, removeRating, getRating } = useContext(RankingContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const title = item.title || item.name;
  const imageUrl = item.poster_path ? `https://image.tmdb.org/t/p/w300${item.poster_path}` : placeholder;
  const rating = item.vote_average?.toFixed(1);
  const date = item.release_date || item.first_air_date;
  const year = getYear(date);
  
  const rated = isRated(item.id);
  const existingRating = getRating(item.id);

  const userRating = item.userRating || (existingRating?.userRating ? existingRating.userRating : null);

  const handleRateClick = () => {
    setIsModalOpen(true);
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    removeRating(item.id);
    toast.info("¡Calificación eliminada correctamente!");
  };

  const handleModalConfirm = (userRating) => {
    addRating(item, userRating);
    toast.success(`¡Calificación guardada correctamente: ⭐ ${userRating}/5!`);
  };

  return (
    <>
      <div className="card">
        <div className="card-image-container">
          <img src={imageUrl} alt={title} className="card-img" title={title}/>
        </div>
        <div className="card-content">
          <h3 className="card-title" title={title}>{title}</h3>
          <div className="card-info-container">
            <p className='card-date'>{year}</p>
            <div className="card-rating">
              <Star size={18} color="#FF9900" fill="#FF9900" />
              <span>{rating}</span>
            </div>
          </div>
          <div className='my-ranking-container'>
            <p>Mi ranking:</p>
            {userRating ? (
              <div className="card-user-rating">
                <span className="user-rating-badge">⭐ {userRating}/5</span>
              </div>
            ): (
            <div className="card-user-rating">
              <span className="user-rating-badge">⭐ -</span>
            </div>
            )}
          </div>
          {rated ? (
            <div className= "card-btn-container">
              <button 
                className="card-button delete"
                onClick={handleRemoveClick}
                title="Eliminar de mi ranking"
              >
                <Trash2 size={17} />
                Eliminar
              </button>
              <button 
                className="card-button edit"
                onClick={handleRateClick}
                title="Editar calificación"
              >
                <Pencil size={21} />
              </button>
            </div>
          ) : (
            <button 
              className="card-button"
              onClick={handleRateClick}
            >
              Calificar
            </button>
          )}
        </div>
      </div>

      <RatingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
        item={item}
        existingRating={existingRating}
      />
    </>
  );
}

Card.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Card;
