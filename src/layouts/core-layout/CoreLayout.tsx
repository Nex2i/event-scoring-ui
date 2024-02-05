import { FC, useContext } from 'react';
import { Routes } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { Typography } from '@mui/material';
import { UserAgentContext } from '@/stores/contexts/userAgent.context.ts';
import * as Styles from './Styles';
import { CoreAppbar } from './CoreAppbar.tsx';
import CoreBottomNavigation from './CoreBottomNavigation.tsx';

interface coreLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const CoreLayout: FC<coreLayoutProps> = ({ children, title }) => {
  const [parent] = useAutoAnimate(/* optional config */);

  const { isMobile } = useContext(UserAgentContext);

  return (
    <Styles.CoreLayoutContainer>
      {!isMobile && <CoreAppbar />}
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
      {isMobile && <CoreBottomNavigation />}
    </Styles.CoreLayoutContainer>
  );
};
