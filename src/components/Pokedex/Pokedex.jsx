import Background from '../Background/Background.jsx';
import PokemonList from '../PokemonList/PokemonList.jsx';
import Search from '../Search/Search.jsx';

// css import
import './Pokedex.css';

function Pokedex() {
  return (
    <div className='pokedex-wrapper'>
      {/* <Background> */}

      <Search />
      <PokemonList />
      {/* </Background> */}
    </div>
  );
}

export default Pokedex;
