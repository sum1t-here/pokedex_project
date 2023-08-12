import { useEffect, useState } from 'react';
import axios from 'axios';
import './PokemonList.css';
import Pokemon from '../Pokemon/Pokemon.jsx';

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function PokemonList() {
  // const [PokemonList, setPokemonList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // const [pokedexUrl, setpokedexUrl] = useState(
  //   'https://pokeapi.co/api/v2/pokemon'
  // );

  // const [nextUrl, setNextUrl] = useState('');
  // const [prevUrl, setPrevUrl] = useState('');

  const [pokemonListState, setPokemonListState] = useState({
    PokemonList: [],
    isLoading: true,
    pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
    nextUrl: '',
    prevUrl: '',
  });

  async function downloadPokemons() {
    // setIsLoading(true);
    setPokemonListState({ ...pokemonListState, setIsLoading: true });
    const response = await axios.get(pokemonListState.pokedexUrl);
    const pokemonResults = response.data.results;

    console.log(response.data);
    // setNextUrl(response.data.next);
    // setPrevUrl(response.data.previous);

    setPokemonListState((state) => ({
      /**multiple use state */ ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
    }));

    const pokemonResultPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );

    const pokemonData = await axios.all(pokemonResultPromise);
    console.log(pokemonData);

    const pokeListResult = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other
          ? pokemon.sprites.other.dream_world.front_default
          : pokemon.sprites.front_shiny,
        types: pokemon.types,
      };
    });

    console.log(pokeListResult);
    // setPokemonList(pokeListResult);
    // setIsLoading(false);

    setPokemonListState((state) => ({
      /**multiple use state */ ...state,
      PokemonList: pokeListResult,
      isLoading: false,
    }));
  }

  useEffect(() => {
    downloadPokemons();
  }, [/*pokedexUrl*/ pokemonListState.pokedexUrl]);
  return (
    <div className='pokemon-list-wrapper'>
      <div className='pokemon-wrapper'>
        {
          /*isLoading*/ pokemonListState.isLoading
            ? 'Loading...'
            : pokemonListState.PokemonList.map((p) => (
                <Pokemon
                  name={capitalizeFirstLetter(p.name)}
                  image={p.image}
                  key={p.id}
                  id={p.id}
                />
              ))
        }
      </div>
      <div className='controls'>
        <button
          className='prev'
          disabled={/*prevUrl*/ pokemonListState.prevUrl == null}
          onClick={() => {
            /*setpokedexUrl(nextUrl)*/
            const urlToSet = pokemonListState.prevUrl;
            setPokemonListState({
              ...pokemonListState,
              pokedexUrl: urlToSet,
            });
          }}
        >
          Prev
        </button>
        <button
          className='next'
          disabled={/*nextUrl*/ pokemonListState.nextUrl == null}
          onClick={() => {
            console.log(pokemonListState);
            const urlToSet = pokemonListState.nextUrl;
            /*setpokedexUrl(nextUrl)*/
            setPokemonListState({
              ...pokemonListState,
              pokedexUrl: urlToSet,
            });
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PokemonList;
