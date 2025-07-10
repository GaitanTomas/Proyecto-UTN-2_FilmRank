import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import "./SearchBar.css";
import useTheme from "../../hooks/useTheme.js";
import useDebounce from "../../hooks/useDebounce.js";

function SearchBar() {
  const { theme } = useTheme();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const debouncedQuery = useDebounce(query, 500); 

  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      if (location.pathname.includes("buscar")) {
        navigate("/");
      } else {
        navigate(location.pathname);
      }
      return;
    }

    const path = location.pathname.includes("series")
      ? `/buscar/series?q=${encodeURIComponent(debouncedQuery)}`
      : `/buscar/peliculas?q=${encodeURIComponent(debouncedQuery)}`;

    navigate(path);
  }, [debouncedQuery, location.pathname, navigate]);

  const handleIconClick = () => {
    inputRef.current?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        className="search-input"
        placeholder="Buscar películas o series..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="button"
        className="search-icon"
        aria-label="Buscar"
        onClick={handleIconClick}
        style={{
          color: theme === "dark" ? "#FAFAFA" : "#121212",
        }}
      >
        <Search />
      </button>
    </form>
  );
}

export default SearchBar;