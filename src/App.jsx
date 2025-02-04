import { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import EmojiList from "./EmojiList";

export default function App() {
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
        // Si l'utilisateur tape une lettre ou un chiffre, afficher le champ de recherche
        setShowSearch(true);
        setQuery((prev) => prev);
      } else if (event.key === "Escape") {
        // Si l'utilisateur appuie sur Échap, cacher le champ de recherche
        setShowSearch(false);
        setQuery("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div style={{ position: "relative", textAlign: "center", padding: "20px" }}>
      <h1>Fire Emojis</h1>

      {showSearch && (
        <div style={overlayStyle}>
          <SearchForm query={query} setQuery={setQuery} />
        </div>
      )}

      <EmojiList query={query} />
    </div>
  );
}

const overlayStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "rgba(255, 255, 255, 0.9)",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  zIndex: 10,
};
