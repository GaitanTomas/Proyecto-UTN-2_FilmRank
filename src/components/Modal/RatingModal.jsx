import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import RatingStars from "../RatingStars/RatingStars";
import "./RatingModal.css";

function RatingModal({ isOpen, onClose, onConfirm, item, existingRating }) {
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Load existing rating if available
  useEffect(() => {
    if (existingRating) {
      setUserRating(existingRating.userRating || 0);
    } else {
      setUserRating(0);
    }
  }, [existingRating, isOpen]);

  const handleConfirm = async () => {
    if (userRating === 0) {
      return;
    }

    setIsLoading(true);
    try {
      await onConfirm(userRating);
      setUserRating(0);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setUserRating(0);
    onClose();
  };

  if (!item) return null;

  const title = item.title || item.name;

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title={`Calificar: ${title}`}>
      <div className="rating-modal-body">
        {/* Item info */}
        <div className="rating-modal-item">
          {item.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w154${item.poster_path}`}
              alt={title}
              className="rating-modal-poster"
            />
          )}
          <div className="rating-modal-info">
            <h3 className="rating-modal-title">{title}</h3>
            <p className="rating-modal-meta">
              {item.release_date || item.first_air_date
                ? new Date(
                    item.release_date || item.first_air_date
                  ).getFullYear()
                : "N/A"}
            </p>
          </div>
        </div>

        {/* Rating stars */}
        <div className="rating-modal-section">
          <label htmlFor="rating-stars" className="rating-modal-label">
            Tu calificación
          </label>
          <RatingStars
            rating={userRating}
            onRatingChange={setUserRating}
            interactive={true}
          />
          {userRating > 0 && (
            <p className="rating-modal-value">{userRating} de 5 estrellas</p>
          )}
        </div>

        {/* Actions */}
        <div className="rating-modal-actions">
          <button
            className="rating-modal-btn cancel"
            onClick={handleCancel}
            type="button"
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            className="rating-modal-btn confirm"
            onClick={handleConfirm}
            disabled={userRating === 0 || isLoading}
            type="button"
          >
            {isLoading ? "Guardando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

RatingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  item: PropTypes.object,
  existingRating: PropTypes.object,
};

export default RatingModal;
