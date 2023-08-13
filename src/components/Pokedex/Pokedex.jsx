import { useState } from 'react';
import Background from '../Background/Background.jsx';
import PokemonList from '../PokemonList/PokemonList.jsx';
import Search from '../Search/Search.jsx';

// css import
import './Pokedex.css';
import PokemonDetails from '../Pokemon details/PokemonDetails.jsx';

function Pokedex() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className='pokedex-wrapper'>
      {/* <Background> */}

      <Search updateSearchTerm={setSearchTerm} />
      {/* {searchTerm} */}
      {!searchTerm ? (
        <PokemonList />
      ) : (
        <PokemonDetails key={searchTerm} pokemonName={searchTerm} />
      )}
      {/* </Background> */}
    </div>
  );
}

export default Pokedex;
