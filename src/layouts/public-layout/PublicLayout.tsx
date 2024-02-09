import { FC, useContext } from 'react';
import { Routes } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { UserAgentContext } from '@/stores/contexts/userAgent.context.ts';
import * as Styles from './Styles.tsx';
import { PublicAppBar } from './PublicAppbar.tsx';

interface coreLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: FC<coreLayoutProps> = ({ children }) => {
  const [parent] = useAutoAnimate(/* optional config */);

  const { isMobile } = useContext(UserAgentContext);

  return (
    <Styles.CoreLayoutContainer sx={{ maxWidth: isMobile ? 'auto' : '500px' }}>
      <PublicAppBar />
      <Styles.CoreLayoutOutlet ref={parent}>
        <Routes>{children}</Routes>
      </Styles.CoreLayoutOutlet>
    </Styles.CoreLayoutContainer>
  );
};
