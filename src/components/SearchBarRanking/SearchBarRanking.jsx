import React from "react";
import { Search, X } from "lucide-react";
import "./SearchBarRanking.css";

function SearchBarRanking({
  value = "",
  onChange,
  onClear,
  placeholder = "Buscar...",
  className = "",
}) {
  return (
    <div className={`search-bar-ranking-container ${className}`}>
      <div className="search-bar-ranking-box">
        <Search size={20} className="search-bar-ranking-icon" />
        <input
          type="text"
          className="search-bar-ranking-input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-label={placeholder}
        />
        {value && (
          <button
            className="search-bar-ranking-clear-btn"
            onClick={onClear}
            aria-label="Limpiar búsqueda"
            type="button"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBarRanking;