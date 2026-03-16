import React from "react";
import { Star } from "lucide-react";
import PropTypes from "prop-types";
import "./RatingStars.css";

function RatingStars({ rating, onRatingChange, interactive = true }) {
  const handleStarClick = (value) => {
    if (interactive && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className={`rating-stars ${interactive ? "interactive" : "static"}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`star-btn ${star <= rating ? "active" : ""}`}
          onClick={() => handleStarClick(star)}
          aria-label={`Rate ${star} stars`}
          disabled={!interactive}
          type="button"
        >
          <Star
            size={32}
            fill={star <= rating ? "#FF9900" : "none"}
            color={star <= rating ? "#FF9900" : "currentColor"}
          />
        </button>
      ))}
    </div>
  );
}

RatingStars.propTypes = {
  rating: PropTypes.number.isRequired,
  onRatingChange: PropTypes.func,
  interactive: PropTypes.bool,
};

export default RatingStars;
