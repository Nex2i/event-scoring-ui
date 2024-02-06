const pokemonBase = 'pokemon';
const trackingBase = 'tracking';
const authBase = 'auth';
const publicMenuBase = 'public';

export const pokemonRoutes = {
  base: pokemonBase,
};
export const trackingRoutes = {
  base: trackingBase,
};
export const publicMenuRoutes = {
  base: publicMenuBase,
};
export const authRoutes = {
  base: authBase,
  login: `/${authBase}/login`,
  register: `/${authBase}/register`,
};

export const homeRoute = '/' + pokemonBase;
export const noAuthHomeRoute = '/' + publicMenuRoutes.base;
