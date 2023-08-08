import PokemonList from '../PokemonList/PokemonList.jsx';
import Search from '../Search/Search.jsx';

// css import
import './Pokedex.css';

function Pokedex() {
  return (
    <div className='pokedex-wrapper'>
      <h1 id='pokedex-heading'>Pokedex</h1>
      <Search />
      <PokemonList />
    </div>
  );
}

export default Pokedex;
