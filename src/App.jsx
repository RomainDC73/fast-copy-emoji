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

  useEffect(() => {
    if (query === "") {
      setShowSearch(false);;
    }
  }, [query]);

  return (
    <div>
    <div>
      <h1>Fast Copy Emojis</h1>
      <p>⌨️ Start typing to filter emojis. 👉 Click on the emoji to copy. 👇 Paste it wherever you want.<br />
      😘 Easy.</p>
    </div>
    <div>
    {showSearch && (
        <div className="overlayForm">
          <SearchForm query={query} setQuery={setQuery} />
        </div>
      )}
      <EmojiList query={query} />
    </div>

    </div>
  );
}

