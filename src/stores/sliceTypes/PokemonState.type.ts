import { Pokemon } from '@/types/models/pokemon/pokemon.type';

export class PokemonState {
  pokemons: Pokemon[] = [];
  activePokemon?: Pokemon;
}
