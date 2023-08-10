import { Routes, Route } from 'react-router-dom';
import Pokedex from '../components/Pokedex/Pokedex.jsx';
import PokemonDetails from '../components/Pokemon details/PokemonDetails.jsx';

function CustomRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Pokedex />} />
      <Route path='/pokemon/:id' element={<PokemonDetails />} />
    </Routes>
  );
}

export default CustomRoutes;
