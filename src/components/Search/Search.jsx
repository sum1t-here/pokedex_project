import { useState } from 'react';
import './Search.css';
import useDebounce from '../../hooks/useDebounce.js';

function Search({ updateSearchTerm }) {
  // const [searchTerm, setSearchTerm] = useState('');
  const debouncedCallback = useDebounce((e) =>
    updateSearchTerm(e.target.value)
  );
  return (
    <div className='search-wrapper'>
      <input
        id='pokemon-name-search'
        type='text'
        placeholder='pokemon name ...'
        onChange={debouncedCallback}
      />
    </div>
  );
}
export default Search;
