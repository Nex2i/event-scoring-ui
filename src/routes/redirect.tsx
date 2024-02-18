import { FC, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserAgentContext } from '@/stores/contexts/userAgent.context';
import { desktopNoAuthHomeRoute, noAuthHomeRoute } from './RouteConstants';

interface redirectProps {}

export const Redirect: FC<redirectProps> = ({}) => {
  const { isMobile } = useContext(UserAgentContext);

  // if (isMobile) {
  //   return <Navigate to={noAuthHomeRoute} />;
  // } else {
  //   return <Navigate to={desktopNoAuthHomeRoute} />;
  // }

  console.log('Redirecting to noAuthHomeRoute', window);

  return <></>;
};
