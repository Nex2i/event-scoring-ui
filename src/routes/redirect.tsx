import { UserAgentContext } from '@/stores/contexts/userAgent.context';
import { FC, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { desktopNoAuthHomeRoute, noAuthHomeRoute } from './RouteConstants';

interface redirectProps {}

export const Redirect: FC<redirectProps> = ({}) => {
  const { isMobile } = useContext(UserAgentContext);

  console.log('isMobile', isMobile);

  if (isMobile) {
    return <Navigate to={noAuthHomeRoute} />;
  } else {
    return <Navigate to={desktopNoAuthHomeRoute} />;
  }
};
