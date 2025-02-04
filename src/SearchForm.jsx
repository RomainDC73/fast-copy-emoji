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
        style={inputStyle}
      />
    </form>
  );
}

const inputStyle = {
  padding: "10px",
  width: "80%",
  maxWidth: "300px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "1.2rem",
  textAlign: "center",
};

SearchForm.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};
