import { useContext, useEffect } from 'react';
import { setSnackbarProps } from '@/stores/slices/SnackBar.slice';
import { useAppDispatch } from '@/stores/store.hooks';
import { ApiContext } from '@/apis/api.context';
import { pokemonSelector, setPokemons } from '@/stores/slices/Pokemon.slice';

export function usePokemons(setIsFetching?: (fetching: boolean) => void) {
  const apis = useContext(ApiContext);
  const dispatch = useAppDispatch();
  const pokemonSlice = pokemonSelector();

  useEffect(() => {
    let isMounted = true;
    setIsFetching && setIsFetching(true);

    apis.pokemon
      .getAllPokemon()
      .then((res) => {
        if (!isMounted) return;

        dispatch(setPokemons(res));

        dispatch(
          setSnackbarProps({
            open: true,
            message: 'Fetched Pokemons',
            severity: 'success',
          })
        );
      })
      .catch(() => {
        dispatch(
          setSnackbarProps({
            open: true,
            message: 'There was an issue loading your Pokemons.',
            severity: 'error',
          })
        );
      })
      .finally(() => {
        if (isMounted) {
          setIsFetching && setIsFetching(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [apis.pokemon]);

  return pokemonSlice.pokemons;
}
