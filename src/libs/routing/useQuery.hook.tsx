import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export function useQuery(params: string[]): string[] {
  const { search } = useLocation();

  const query = useMemo(() => new URLSearchParams(search), [search]);

  return params.map((param) => query.get(param) ?? '');
}
