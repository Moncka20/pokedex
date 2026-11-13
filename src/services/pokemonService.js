import axios from 'axios';

const BASE_URL = import.meta.env.VITE_POKEAPI_URL || 'https://pokeapi.co/api/v2';

export async function getPokemonList(limit = 24, offset = 0) {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon`, {
      params: { limit, offset },
    });
    return response.data.results;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    throw new Error(`No se pudo obtener el catálogo: ${message}`);
  }
}

export async function getPokemonDetails(nameOrId) {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${String(nameOrId).toLowerCase()}`);
    return response.data;
  } catch {
    throw new Error(`No se pudo obtener la información de "${nameOrId}"`);
  }
}
