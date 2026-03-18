import React from "react";
import { Search, X } from "lucide-react";
import "./SearchBarRanking.css";

const SearchBar = ({ value, onChange, onClear, placeholder = "Buscar..." }) => {
  return (
    <div className="search-bar-container">
      <div className="search-bar-box">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          className="search-bar-input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {value && (
          <button
            className="search-clear-btn"
            onClick={onClear}
            aria-label="Limpiar búsqueda"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;