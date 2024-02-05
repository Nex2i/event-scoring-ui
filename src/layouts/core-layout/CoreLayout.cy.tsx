import { Provider as ReduxProvider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { UserAgentContext } from '@/stores/contexts/userAgent.context';
import { setupStore } from '@/stores/store';
import { CoreLayout } from './CoreLayout';

describe('CoreLayout', () => {
  const defaultRtkStore = setupStore({});
  const defaultUserAgentContext = {
    isMobile: false,
    userAgentName: 'Chrome',
    isIos: true,
  };

  function getComponent(
    store: Partial<ReturnType<typeof defaultRtkStore.getState>> = {},
    userAgentContext = defaultUserAgentContext
  ) {
    function createRouter() {
      return (
        <MemoryRouter initialEntries={[`/test`]}>
          <Routes>
            <Route path="/test" element={createComponent()} />
          </Routes>
        </MemoryRouter>
      );
    }

    function createComponent() {
      return (
        <UserAgentContext.Provider value={userAgentContext}>
          <ReduxProvider store={{ ...defaultRtkStore, ...store }}>
            <CoreLayout>
              <Route>
                <Route path="/" element={<div>Test Child Element</div>} />
              </Route>
            </CoreLayout>
          </ReduxProvider>
        </UserAgentContext.Provider>
      );
    }

    return createRouter();
  }

  describe('Web Tests', () => {
    beforeEach(() => {});
    const webUserAgentContext = {
      isMobile: false,
      userAgentName: 'Chrome',
      isIos: false,
    };

    it('should render top navigation when user agent is not mobile', () => {
      cy.mount(getComponent({}, webUserAgentContext));

      cy.getByDataCy('core-app-bar').should('exist');
      cy.getByDataCy('core-bottom-navigation').should('not.exist');
    });
  });
  describe('Mobile Tests', () => {
    beforeEach(() => {});
    const mobileUserAgentContext = {
      isMobile: true,
      userAgentName: 'iPhone',
      isIos: true,
    };

    it('should render bottom navigation when user agent is mobile', () => {
      cy.mount(getComponent({}, mobileUserAgentContext));

      cy.getByDataCy('core-bottom-navigation').should('exist');
      cy.getByDataCy('core-app-bar').should('not.exist');
    });
  });
});
