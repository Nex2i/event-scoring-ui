const pokemonBase = 'pokemon';
const trackingBase = 'tracking';
const eventBase = 'event';
const authBase = 'auth';
const openMenuBase = 'open';
const openEventBase = 'open/event';

export const pokemonRoutes = {
  base: pokemonBase,
};
export const trackingRoutes = {
  base: trackingBase,
};
export const publicEventRoutes = {
  base: openEventBase,
};
export const eventRoutes = {
  base: eventBase,
};
export const publicMenuRoutes = {
  base: openMenuBase,
};
export const authRoutes = {
  base: authBase,
  login: `/${authBase}/login`,
  register: `/${authBase}/register`,
};

export const homeRoute = '/' + eventBase;
export const noAuthHomeRoute = '/' + publicMenuRoutes.base;
export const desktopNoAuthHomeRoute = '/' + authRoutes.base;
