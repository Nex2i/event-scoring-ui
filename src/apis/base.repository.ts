import axios from 'axios';

export abstract class BaseRepository {
  protected get apiUrl(): string {
    return `${axios.defaults.baseURL}`;
  }
}
