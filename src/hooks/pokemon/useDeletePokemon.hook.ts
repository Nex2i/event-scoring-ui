import { useContext, useEffect } from 'react';
import { ApiContext } from '@/apis/api.context';
import { deletePokemon } from '@/stores/slices/Pokemon.slice';
import { setSnackbarProps } from '@/stores/slices/SnackBar.slice';
import { useAppDispatch } from '@/stores/store.hooks';

export function useDeletePokemon(setIsFetching: (value: boolean) => void, id?: string) {
  const apis = useContext(ApiContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!id) return;
    let isMounted = true;

    setIsFetching(true);
    apis.pokemon
      .deletePokemon(id)
      .then(() => {
        dispatch(deletePokemon(id));
      })
      .catch(() => {
        if (!isMounted) return;

        dispatch(
          setSnackbarProps({
            open: true,
            message: 'There was an error deleting your pokemon',
            severity: 'error',
          })
        );
      })
      .finally(() => {
        setIsFetching(false);
      });

    return () => {
      isMounted = false;
    };
  }, [apis, dispatch, id]);
}
