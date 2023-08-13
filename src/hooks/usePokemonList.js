import axios from 'axios';
import { useEffect, useState } from 'react';

function usePokemonList(type) {
  const [pokemonListState, setPokemonListState] = useState({
    PokemonList: [],
    isLoading: true,
    pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
    nextUrl: '',
    prevUrl: '',
    // type: '',
  });

  async function downloadPokemons() {
    // if (pokemonListState.type) {
    //   //   console.log('type requested');
    //   //   setPokemonListState((state) => ({
    //   //     ...state,
    //   //     PokemonList: response.data.pokemon.slice(0, 5),
    //   // }));
    //   const response = await axios.get(
    //     `https://pokeapi.co/api/v2/type/${pokemonListState.type}`
    //   );

    //   setPokemonListState((state) => ({
    //     /**multiple use state */ ...state,
    //     PokemonList: response.data.pokemon,
    //   }));
    // } else {
    // setIsLoading(true);
    setPokemonListState({ ...pokemonListState, setIsLoading: true });
    const response = await axios.get(pokemonListState.pokedexUrl);
    const pokemonResults = response.data.results;

    console.log('response is', response.data.pokemon);
    console.log(pokemonListState);
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
    // }
  }

  useEffect(() => {
    downloadPokemons();
  }, [/*pokedexUrl*/ pokemonListState.pokedexUrl]);

  return [pokemonListState, setPokemonListState];
}

export default usePokemonList;
