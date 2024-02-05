import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '@/apis/api.context';
import { useAppDispatch } from '@/stores/store.hooks';
import { setSnackbarProps } from '@/stores/slices/SnackBar.slice';
import { EditPokemonRequest, CreatePokemonRequest, Pokemon } from '@/types/models/pokemon/pokemon.type';
import { addNewPokemon, setActivePokemon } from '@/stores/slices/Pokemon.slice';

export function usePokemonRequest(
  setIsFetching: (isFetching: boolean) => void,
  id?: string,
  request?: EditPokemonRequest | CreatePokemonRequest
): Pokemon | undefined {
  const apis = useContext(ApiContext);
  const dispatch = useAppDispatch();

  const [response, setResponse] = useState<Pokemon>();

  useEffect(() => {
    if (id) return;
    if (!request) return;

    let isMounted = true;

    setIsFetching(true);

    apis.pokemon
      .createPokemon(request as CreatePokemonRequest)
      .then((res) => {
        if (!isMounted) return;

        dispatch(addNewPokemon(res));

        dispatch(
          setSnackbarProps({
            open: true,
            message: 'Pokemon created!',
            severity: 'success',
          })
        );

        setResponse(res);
      })
      .catch(() => {
        if (!isMounted) return;

        dispatch(
          setSnackbarProps({
            open: true,
            message: 'There was an error creating your pokemon',
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
  }, [request, id, apis.pokemon, dispatch]);

  useEffect(() => {
    if (!id) return;
    if (!request) return;

    let isMounted = true;

    setIsFetching(true);

    apis.pokemon
      .editPokemon(id, request as EditPokemonRequest)
      .then((res) => {
        if (!isMounted) return;

        dispatch(setActivePokemon(res));

        dispatch(
          setSnackbarProps({
            open: true,
            message: 'Pokemon updated!',
            severity: 'success',
          })
        );

        setResponse(res);
      })
      .catch(() => {
        if (!isMounted) return;

        dispatch(
          setSnackbarProps({
            open: true,
            message: 'There was an error updating your pokemon',
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
  }, [id, request, apis.pokemon, dispatch]);

  return response;
}
