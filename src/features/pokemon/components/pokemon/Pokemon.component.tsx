import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { LoadingComponent } from '@/components/loading/Loading.Component';

import { usePokemonHook } from '@/hooks/pokemon/usePokemon.hook';
import * as Styled from '../../pokemon.styles';
import { PokemonFormDialog } from './Pokemon.form.dialog';

interface PokemonProps {}

export const Pokemon: FC<PokemonProps> = ({}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { id } = useParams() as { id: string };

  const pokemon = usePokemonHook(id, setIsFetching);

  if (isFetching || !pokemon) return <LoadingComponent />;

  const { name, type } = pokemon;

  const toggleEdit = () => {
    setIsEditOpen((prev) => !prev);
  };

  return (
    <div data-cy="pokemon-container">
      <Styled.Row>
        <Styled.DynamicTypography text={name} variant="h1">
          {name}
        </Styled.DynamicTypography>
        <Typography variant="h3">
          <Styled.EditIcon onClick={toggleEdit} data-cy="edit-btn" />
        </Typography>
      </Styled.Row>

      <Styled.TypeChip label={type} type={type} />
      {isEditOpen && <PokemonFormDialog pokemon={pokemon} isOpen={isEditOpen} handleClose={toggleEdit} />}
    </div>
  );
};
