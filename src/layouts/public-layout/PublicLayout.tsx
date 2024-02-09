import { FC, useContext } from 'react';
import { Routes } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { Typography } from '@mui/material';
import { UserAgentContext } from '@/stores/contexts/userAgent.context.ts';
import * as Styles from './Styles.tsx';
import { PublicAppBar } from './PublicAppbar.tsx';

interface coreLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const PublicLayout: FC<coreLayoutProps> = ({ children, title }) => {
  const [parent] = useAutoAnimate(/* optional config */);

  const { isMobile } = useContext(UserAgentContext);

  return (
    <Styles.CoreLayoutContainer sx={{ maxWidth: isMobile ? 'auto' : '500px' }}>
      <PublicAppBar />
      <Styles.CoreColumn>
        {title && (
          <Styles.CoreRow width="80%">
            <Typography align="left" variant="h2">
              {title}
            </Typography>
          </Styles.CoreRow>
        )}
        <Styles.CoreLayoutOutlet ref={parent}>
          <Routes>{children}</Routes>
        </Styles.CoreLayoutOutlet>
      </Styles.CoreColumn>
    </Styles.CoreLayoutContainer>
  );
};
