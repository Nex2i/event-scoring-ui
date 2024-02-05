import { Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { usePokemons } from '@/hooks/pokemon/usePokemons.hook';
import { pokemonRoutes } from '@/routes/RouteConstants';
import { Pokemon } from '@/types/models/pokemon/pokemon.type';
import { useDeletePokemon } from '@/hooks/pokemon/useDeletePokemon.hook';
import * as Styled from '../../pokemon.styles';
import { PokemonFormDialog } from '../pokemon/Pokemon.form.dialog';

interface PokemonsProps {}

const defaultNewPokemon = {} as Pokemon;

export const Pokemons: FC<PokemonsProps> = ({}) => {
  const [parent] = useAutoAnimate();
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState<string>();
  const [isNewFormOpen, setIsNewFormOpen] = useState(false);

  const pokemons = usePokemons(setIsFetching);
  useDeletePokemon(setIsDeleting, deleteId);

  useEffect(() => {
    if (!isDeleting) {
      setDeleteId(undefined);
    }
  }, [isDeleting]);

  const goToPokemon = (id: string) => {
    navigate('/' + pokemonRoutes.base + '/' + id);
  };

  const toggleEdit = () => {
    setIsNewFormOpen((prev) => !prev);
  };

  const deletePokemon = (id: string) => {
    setIsDeleting(true);
    setDeleteId(id);
  };

  return (
    <div ref={parent}>
      <Styled.Row>
        <Typography variant="h2">My Pokemons</Typography>
        <Styled.AddIcon fontSize="large" onClick={toggleEdit} />
      </Styled.Row>
      <hr />
      {!isFetching && (
        <ul>
          {!pokemons?.length ? (
            <Typography variant="h6">No pokemons found</Typography>
          ) : (
            pokemons?.length &&
            pokemons?.map((pokemon) => (
              <li key={pokemon.id}>
                <Styled.Row>
                  <Typography variant="h6" onClick={() => goToPokemon(pokemon.id)}>
                    {pokemon.name} - {pokemon.type}
                  </Typography>
                  <Styled.CancelIcon onClick={() => deletePokemon(pokemon.id)} />
                </Styled.Row>
              </li>
            ))
          )}
        </ul>
      )}
      {isNewFormOpen && (
        <PokemonFormDialog pokemon={defaultNewPokemon} isOpen={isNewFormOpen} handleClose={toggleEdit} />
      )}
    </div>
  );
};
