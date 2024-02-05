import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

function useStateSafe<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] {
  const isMounted = useRef(false);
  const [getter, setter] = useState<S>(initialState);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const safeSetter = (newValue: SetStateAction<S>): void => {
    if (isMounted.current) {
      setter(newValue);
    }
  };

  return [getter, safeSetter];
}

export default useStateSafe;
