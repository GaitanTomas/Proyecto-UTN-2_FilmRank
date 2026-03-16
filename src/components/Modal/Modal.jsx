import React from "react";
import { X } from "lucide-react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import "./Modal.css";

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
            type="button"
          >
            <X size={24} />
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
