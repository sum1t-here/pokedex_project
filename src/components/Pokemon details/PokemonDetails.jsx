import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PokemonDetails.css';
import usePokemonList from '../../hooks/usePokemonList.js';
import usePokemonDetails from '../../hooks/usePokemonDetails.js';

function PokemonDetails() {
  const { id } = useParams();
  console.log(`${id}`);

  const [pokemon] = usePokemonDetails(id);
  // const [pokemon, setPokemon] = useState({});
  // const [isLoading, setIsLoading] = useState(true);
  // let pokemonListHookResponse = [];
  // async function downloadPokemon() {
  //   try {
  //     const response = await axios.get(
  //       `https://pokeapi.co/api/v2/pokemon/${id}`
  //     );
  //     setPokemon({
  //       name: response.data.name,
  //       image: response.data.sprites.other.dream_world.front_default,
  //       weight: response.data.weight,
  //       height: response.data.height,
  //       types: response.data.types.map((t) => t.type.name),
  //     });
  //      return response;
  //   } catch (error) {
  //     console.log('Error fetching pokemon', error);
  //   }

  //   pokemonListHookResponse = usePokemonList(
  //     `https://pokeapi.co/api/v2/type/${
  //       pokemon.types ? pokemon.types[0] : 'normal'
  //     }`,
  //     true
  //   );
  // }

  // useEffect(() => {
  //   downloadPokemon();
  //   console.log('list', pokemonListHookResponse.pokemonListState);
  // }, []);

  return (
    <div className='pokemon-details-wrapper'>
      <img className='pokemon-details-image' src={pokemon.image} />
      <div className='pokemon-details-name'>
        <span className='name'>{pokemon.name}</span>
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

      {/* {pokemon.types && (
        <div>
          More {pokemon.types[0]} Type Pokemons
          <ul>
            {pokemonListHookResponse.pokemonListState.PokemonList &&
              pokemonListHookResponse.pokemonListState.PokemonList.map((p) => (
                <li key={p.pokemon.url}>{p.pokemon.name}</li>
              ))}
          </ul>
        </div>
              )} */}
      {pokemon.types && pokemon.similarPokemons && (
        <div>
          more {pokemon.types[0]} type pokemons
          <ul>
            {pokemon.similarPokemons.map((p) => (
              <li key={p.pokemon.url}>{p.pokemon.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PokemonDetails;
