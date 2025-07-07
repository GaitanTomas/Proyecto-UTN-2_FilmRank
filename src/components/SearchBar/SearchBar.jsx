import { useState, useRef } from "react";
import { Search } from "lucide-react";
import "./SearchBar.css";
import useTheme from "../../hooks/useTheme.js";

function SearchBar() {
  const { theme } = useTheme();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Buscar:", query); // más adelante lógica real
  };

  const handleIconClick = () => {
    inputRef.current?.focus(); 
  };

  return (
    <form onSubmit={handleSubmit} className="searchbar">
      <input
        ref={inputRef}
        type="text"
        className="search-input"
        placeholder="Buscar películas o series..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search-icon" aria-label="Buscar" onClick={handleIconClick}
        style={{
        color: theme === "dark" ? "#FAFAFA" : "#121212",
      }}>
      <Search />
      </button>
    </form>
  );
}

export default SearchBar;
