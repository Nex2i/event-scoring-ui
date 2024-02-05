import { FC } from 'react';
import { Routes } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import * as Styles from './Styles';
import { CoreAppbar } from './CoreAppbar.tsx';
// import { CoreSidebar } from './CoreSidebar.tsx';

interface coreLayoutProps {
  children: React.ReactNode;
}

export const CoreLayout: FC<coreLayoutProps> = ({ children }) => {
  const [parent] = useAutoAnimate(/* optional config */);
  return (
    <Styles.CoreLayoutContainer>
      <Styles.CoreLayoutAppbar>
        <CoreAppbar />
      </Styles.CoreLayoutAppbar>
      <Styles.CoreRow>
        {/* <Styles.CoreLayoutSidebar>
          <CoreSidebar />
        </Styles.CoreLayoutSidebar> */}
        <Styles.CoreLayoutOutlet>
          <Styles.CoreCardContent ref={parent}>
            <Routes>{children}</Routes>
          </Styles.CoreCardContent>
        </Styles.CoreLayoutOutlet>
      </Styles.CoreRow>
    </Styles.CoreLayoutContainer>
  );
};
