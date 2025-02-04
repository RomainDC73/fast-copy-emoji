import './App.css'
import { useState } from 'react';
import EmojiList from './EmojiList';
import SearchForm from './SearchForm';

function App() {
  const [query, setQuery] = useState('');

  return (
    <>
      <SearchForm
        query={query}
        setQuery={setQuery} 
      />
      <EmojiList 
        query={query}
      />
    </>
  )
}

export default App
