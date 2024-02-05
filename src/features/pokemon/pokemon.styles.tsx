export * from '@/common/style';
import { Card, Chip, styled } from '@mui/material';
import { pokemonTypeValueMap } from '@/types/models/pokemon/pokemon.type';

export const PokemonCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  minWidth: '300px',
}));

interface chipProps {
  type: string;
}

const getTypeChipColor = (type: string) => {
  const color = pokemonTypeValueMap.find((mapType) => mapType.value === type)?.color;
  return color || 'grey';
};

export const TypeChip = styled(Chip)<chipProps>(({ theme, type }) => ({
  backgroundColor: getTypeChipColor(type),
  color: theme.typography.button.color,
  textAlign: 'center',
  textDecoration: 'none',
}));
