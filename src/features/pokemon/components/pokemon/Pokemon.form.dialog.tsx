import { FC, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { FieldValues } from 'react-hook-form';
import {
  CreatePokemonRequest,
  EditPokemonRequest,
  Pokemon,
  pokemonTypeValueMap,
} from '@/types/models/pokemon/pokemon.type';
import { usePokemonRequest } from '@/hooks/pokemon/usePokemonForm.hook';
import { FormFilledInput, FormFilledSelect } from '@/libs/forms/formFilledComponents';
import { pokemonFormFields, usePokemonForm } from '@/hooks/pokemon/pokemonForm';
import { LoadingComponent } from '@/components/loading/Loading.Component';
import * as Styled from '../../pokemon.styles';

interface PokemonFormDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  pokemon: Pokemon;
}

export const PokemonFormDialog: FC<PokemonFormDialogProps> = ({ isOpen, handleClose, pokemon }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [submitRequest, setSubmitRequest] = useState<EditPokemonRequest | CreatePokemonRequest>();
  const { handleSubmit, control } = usePokemonForm({
    pokemonType: pokemon.type,
    pokemonName: pokemon.name,
  });

  useEffect(() => {
    if (!isOpen) {
      setSubmitRequest(undefined);
    }
  }, [isOpen]);

  const reqResponse = usePokemonRequest(setIsFetching, pokemon.id, submitRequest);

  useEffect(() => {
    if (!reqResponse) return;

    handleClose();
  }, [reqResponse]);

  const handleValidForm = (formData: FieldValues) => {
    const saveRequest = pokemonFormFields.createEditSaveRequest(formData);
    setSubmitRequest(saveRequest);
  };

  const handleInvalidForm = (formData: FieldValues) => {
    console.log('invalid form', formData);
  };

  const onSubmitForm = handleSubmit(handleValidForm, handleInvalidForm);

  return (
    <Dialog open={isOpen} onClose={handleClose} data-cy="edit-pokemon-dialog">
      <DialogTitle>Edit Pokemon</DialogTitle>
      <Styled.BaseForm onSubmit={onSubmitForm}>
        <FormFilledInput fieldMapping={pokemonFormFields.pokemonName} control={control} />
        <FormFilledSelect
          fieldMapping={pokemonFormFields.pokemonType}
          control={control}
          options={pokemonTypeValueMap}
        />
        {isFetching && <LoadingComponent animateOnly={true} />}
        <DialogActions>
          <Button color="secondary" onClick={handleClose} data-cy="cancel-edit-btn">
            Cancel
          </Button>
          <Button onClick={onSubmitForm} data-cy="save-pokemon-btn">
            Save
          </Button>
        </DialogActions>
      </Styled.BaseForm>
    </Dialog>
  );
};
