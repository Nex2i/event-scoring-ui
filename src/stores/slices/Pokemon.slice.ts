import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Pokemon } from '@/types/models/pokemon/pokemon.type';
import { useAppSelector } from '../store.hooks';
import { PokemonState } from '../sliceTypes/PokemonState.type';

export const initialPokemonState: PokemonState = {
  // DO NOT USE AN INSTANTIATED CLASS AS INITIAL STATE - WILL BREAK REDUCERS AND BE ANNOYING
  pokemons: [],
  activePokemon: undefined,
};

export const pokemonSlice = createSlice({
  name: 'pokemonSlice',
  initialState: initialPokemonState,
  reducers: {
    setPokemons: (state, action: PayloadAction<Pokemon[]>) => {
      state.pokemons = action.payload;
    },
    setActivePokemon: (state, action: PayloadAction<Pokemon>) => {
      state.activePokemon = action.payload;
    },
    addNewPokemon: (state, action: PayloadAction<Pokemon>) => {
      state.pokemons.push(action.payload);
    },
    deletePokemon: (state, action: PayloadAction<string>) => {
      state.pokemons = state.pokemons.filter((pokemon) => pokemon.id !== action.payload);
    },
    resetPokemon: (state) => {
      state.pokemons = initialState.pokemons;
      state.activePokemon = initialState.activePokemon;
    },
  },
});

export const pokemonSelector = () => useAppSelector((store) => store.pokemon);

export const { setActivePokemon, setPokemons, resetPokemon, addNewPokemon, deletePokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;
