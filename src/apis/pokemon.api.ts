import { BaseRepository } from '@/apis/base.repository';
import HttpClient from '@/libs/http/http.client';
import { CreatePokemonRequest, EditPokemonRequest, Pokemon } from '@/types/models/pokemon/pokemon.type';

interface IPokemonApi {
  getAllPokemon: () => Promise<Pokemon[]>;
  getPokemonById: (id: string) => Promise<Pokemon>;
  editPokemon: (id: string, data: EditPokemonRequest) => Promise<Pokemon>;
}

export class PokemonApi extends BaseRepository implements IPokemonApi {
  getAllPokemon = async (): Promise<Pokemon[]> => {
    return HttpClient.get(`${this.apiUrl}/api/pokemon/v1`);
  };
  getPokemonById = async (id: string): Promise<Pokemon> => {
    console.log('id', id, `${this.apiUrl}/api/pokemon/v1/${id}`);
    return HttpClient.get(`${this.apiUrl}/api/pokemon/v1/${id}`);
  };
  editPokemon = async (id: string, data: EditPokemonRequest): Promise<Pokemon> => {
    return HttpClient.put(`${this.apiUrl}/api/pokemon/v1/${id}`, data);
  };
  createPokemon = async (data: CreatePokemonRequest): Promise<Pokemon> => {
    return HttpClient.post(`${this.apiUrl}/api/pokemon/v1`, data);
  };
  deletePokemon = async (id: string): Promise<void> => {
    return HttpClient.delete(`${this.apiUrl}/api/pokemon/v1/${id}`);
  };
}
