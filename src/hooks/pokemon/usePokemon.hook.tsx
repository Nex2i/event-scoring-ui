import { useContext, useEffect } from 'react';
import { ApiContext } from '@/apis/api.context';
import { setSnackbarProps } from '@/stores/slices/SnackBar.slice';
import { useAppDispatch } from '@/stores/store.hooks';
import { Pokemon } from '@/types/models/pokemon/pokemon.type';
import { pokemonSelector, setActivePokemon } from '@/stores/slices/Pokemon.slice';

export function usePokemonHook(pokemonId: string, setIsFetching: (fetching: boolean) => void): Pokemon | undefined {
  const apis = useContext(ApiContext);
  const pokemonSlice = pokemonSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    setIsFetching(true);

    apis.pokemon
      .getPokemonById(pokemonId)
      .then((res) => {
        if (!isMounted) return;

        dispatch(setActivePokemon(res));
        dispatch(
          setSnackbarProps({
            open: true,
            message: 'Pokemon found!',
            severity: 'success',
          })
        );
      })
      .catch(() => {
        if (!isMounted) return;

        dispatch(
          setSnackbarProps({
            open: true,
            message: 'There was an error fetching your pokemon',
            severity: 'error',
          })
        );
      })
      .finally(() => {
        if (!isMounted) return;

        setIsFetching(false);
      });

    return () => {
      isMounted = false;
    };
  }, [pokemonId]);

  return pokemonSlice.activePokemon;
}
