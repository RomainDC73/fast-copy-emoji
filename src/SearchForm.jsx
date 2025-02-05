import PropTypes from "prop-types";

export default function SearchForm({ query, setQuery }) {
  return (
    <form>
      <input
        type="text"
        autoFocus
        placeholder="Tapez un mot clé..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="inputForm"
      />
    </form>
  );
}

SearchForm.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};
