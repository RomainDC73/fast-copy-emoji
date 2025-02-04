import PropTypes from 'prop-types';

export default function SearchForm({ query, setQuery }) {

    return (
        <form>
            <label htmlFor="query">Search for an emoji:</label>
            <input 
                type="text" 
                id="query" 
                name="query"
                value={query} 
                onChange={(e) => setQuery(e.target.value)}
            />
        </form>
    )   
}

SearchForm.propTypes = {
    query: PropTypes.string.isRequired,
    setQuery: PropTypes.func.isRequired,
};
