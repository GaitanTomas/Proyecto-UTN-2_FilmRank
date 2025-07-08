import React from 'react';
import PropTypes from 'prop-types';
import { Star } from 'lucide-react';
import { getYear } from '../../utils/formatDate.js';
import './Card.css';

function Card({ item }) {
  const title = item.title || item.name;
  const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`
  const rating = item.vote_average?.toFixed(1);
  const date = item.release_date || item.first_air_date;
  const year = getYear(date);

  return (
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
        <button className="card-button">Calificar</button>
      </div>
    </div>
  );
}

Card.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Card;
