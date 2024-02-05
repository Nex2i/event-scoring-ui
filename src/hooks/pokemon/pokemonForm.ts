import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BaseFormSchema, getSchemaFromClass } from '@/libs/forms/BaseFormSchema';
import { FormFieldMapping } from '@/libs/forms/formMapping';
import { pokemonTypeValueMap } from '@/types/models/pokemon/pokemon.type';
import { allowedCharactersRegex } from '@/utils/form-regex';

const pokemonTypeValueEnum: [string, ...string[]] = pokemonTypeValueMap.map((type) => type.value as string) as [
  string,
  ...string[]
];
class pokemonFormMapping extends BaseFormSchema {
  pokemonType: FormFieldMapping = {
    name: 'pokemonType',
    label: 'Pokemon Type',
    tooltip: 'Pokemon Type',
    validationSchema: z.enum(pokemonTypeValueEnum),
  };

  pokemonName: FormFieldMapping = {
    name: 'pokemonName',
    label: 'Pokemon Name',
    tooltip: 'Pokemon Name',
    validationSchema: z
      .string()
      .nonempty()
      .regex(allowedCharactersRegex, 'Name cannot contain these special characters'),
  };

  public createEditSaveRequest(formData: PokemonFormSchema) {
    return {
      type: formData.pokemonType,
      name: formData.pokemonName,
    };
  }
}

export const pokemonFormFields = new pokemonFormMapping();

const schema = getSchemaFromClass(pokemonFormFields);

export type PokemonFormSchema = z.infer<typeof schema>;

export function usePokemonForm(defaultValues: PokemonFormSchema) {
  const pokemonForm = useForm<PokemonFormSchema>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onBlur',
  });

  return pokemonForm;
}
