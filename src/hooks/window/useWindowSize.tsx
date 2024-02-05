import debounce from 'lodash.debounce';
import { useLayoutEffect, useState } from 'react';

type Size = [number, number];

export function useWindowSize(): Size {
  const [size, setSize] = useState<Size>([0, 0]);

  useLayoutEffect(() => {
    const debouncedUpdateSize = debounce(() => {
      setSize([window.innerWidth, window.innerHeight]);
    }, 250);

    window.addEventListener('resize', debouncedUpdateSize);
    debouncedUpdateSize();

    return () => window.removeEventListener('resize', debouncedUpdateSize);
  }, []);

  return size;
}
