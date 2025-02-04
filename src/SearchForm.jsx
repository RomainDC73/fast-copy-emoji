import { useState } from 'react';

export default function SearchForm() {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        setQuery(e.target.value);
    };

    return (
        <form>
            <label htmlFor="query">Search for an emoji:</label>
            <input 
                type="text" 
                id="query" 
                name="query"
                value={query} 
                onChange={handleSearch}
            />
        </form>
    )   
}

