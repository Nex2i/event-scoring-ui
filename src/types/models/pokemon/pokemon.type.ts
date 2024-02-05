import { FormFilledSelectValueMapping } from '@/libs/forms/formFilledComponents';

export interface Pokemon {
  id: string;
  name: string;
  type: string;
  created_at: string;
  updated_at: string;
}

interface pokemonTypeMap extends FormFilledSelectValueMapping {
  color: string;
}

export const pokemonTypeValueMap: pokemonTypeMap[] = [
  { value: 'Fire', displayName: 'Fire', color: '#ff4d4f' },
  { value: 'Water', displayName: 'Water', color: '#1890ff' },
  { value: 'Grass', displayName: 'Grass', color: '#73d13d' },
  { value: 'Electric', displayName: 'Electric', color: '#fadb14' },
  { value: 'Normal', displayName: 'Normal', color: '#d9d9d9' },
  { value: 'Flying', displayName: 'Flying', color: '#40a9ff' },
  { value: 'Bug', displayName: 'Bug', color: '#52c41a' },
  { value: 'Poison', displayName: 'Poison', color: '#9254de' },
  { value: 'Ground', displayName: 'Ground', color: '#faad14' },
  { value: 'Rock', displayName: 'Rock', color: '#d48806' },
  { value: 'Fighting', displayName: 'Fighting', color: '#cf1322' },
  { value: 'Psychic', displayName: 'Psychic', color: '#eb2f96' },
  { value: 'Ghost', displayName: 'Ghost', color: '#722ed1' },
  { value: 'Ice', displayName: 'Ice', color: '#69c0ff' },
  { value: 'Dragon', displayName: 'Dragon', color: '#13c2c2' },
  { value: 'Dark', displayName: 'Dark', color: '#343a40' },
  { value: 'Steel', displayName: 'Steel', color: '#595959' },
  { value: 'Fairy', displayName: 'Fairy', color: '#ff85c0' },
];

interface PokemonBaseRequest {
  type: string;
  name: string;
}

export interface EditPokemonRequest extends PokemonBaseRequest {
  id: string;
}

export interface CreatePokemonRequest extends PokemonBaseRequest {}
