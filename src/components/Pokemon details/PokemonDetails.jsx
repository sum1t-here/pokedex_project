import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PokemonDetails.css';

function PokemonDetails() {
  const { id } = useParams();
  console.log(`${id}`);
  const [pokemon, setPokemon] = useState({});
  async function downloadPokemon() {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      setPokemon({
        name: response.data.name,
        image: response.data.sprites.other.dream_world.front_default,
        weight: response.data.weight,
        height: response.data.height,
        types: response.data.types.map((t) => t.type.name),
      });
    } catch (error) {
      console.log('Error fetching pokemon', error);
    }
  }

  useEffect(() => {
    downloadPokemon();
  }, []);

  return (
    <div className='pokemon-details-wrapper'>
      <img className='pokemon-details-image' src={pokemon.image} />
      <div className='pokemon-details-name'>
        <span class='name'>{pokemon.name}</span>
      </div>
      <div className='pokemon-details-height'>
        Height: <span>{pokemon.height}</span>
      </div>
      <div className='pokemon-details-weight'>
        Weight: <span>{pokemon.weight}</span>
      </div>
      <div className='pokemon-details-types'>
        {pokemon.types &&
          pokemon.types.map((t) => (
            <div className='flex-items' key={t}>
              {t}
            </div>
          ))}
      </div>
    </div>
  );
}

export default PokemonDetails;
