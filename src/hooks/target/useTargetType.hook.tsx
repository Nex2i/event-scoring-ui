import { ApiContext } from '@/apis/api.context';
import { Bullseye } from '@/types/models/tracker/tracker.type';
import { useContext, useEffect, useState } from 'react';

interface hookResponse {
  isFetching: boolean;
  bullseye: Bullseye | undefined;
}

export const useTargetTypeHook = ({
  targetTypeId,
  targetId,
}: {
  targetTypeId?: string;
  targetId?: string;
}): hookResponse => {
  const [isFetching, setIsFetching] = useState(false);
  const [bullseye, setBullseye] = useState<Bullseye>();
  const apis = useContext(ApiContext);

  useEffect(() => {
    let isMounted = true;

    if (!targetTypeId) return;

    setIsFetching(true);

    apis.target
      .getTargetRingsByTypeId(targetTypeId)
      .then((res) => {
        if (res.rings) {
          setBullseye(res.rings);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsFetching(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [targetTypeId]);

  useEffect(() => {
    let isMounted = true;

    if (!targetId) return;

    setIsFetching(true);

    apis.target
      .getTargetRingsByTargetId(targetId)
      .then((res) => {
        if (res.rings) {
          setBullseye(res.rings);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsFetching(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [targetId]);

  return {
    isFetching,
    bullseye,
  };
};
