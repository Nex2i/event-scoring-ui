const pokemonBase = 'pokemon';
const trackingBase = 'tracking';
const eventBase = 'event';
const authBase = 'auth';
const publicMenuBase = 'public';

export const pokemonRoutes = {
  base: pokemonBase,
};
export const trackingRoutes = {
  base: trackingBase,
};
export const eventRoutes = {
  base: eventBase,
};
export const publicMenuRoutes = {
  base: publicMenuBase,
};
export const authRoutes = {
  base: authBase,
  login: `/${authBase}/login`,
  register: `/${authBase}/register`,
};

export const homeRoute = '/' + eventBase;
export const noAuthHomeRoute = '/' + publicMenuRoutes.base;
export const desktopNoAuthHomeRoute = '/' + authRoutes.base;
