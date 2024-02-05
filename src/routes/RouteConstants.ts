const pokemonBase = 'pokemon';
const logBase = 'log';
const profileView = 'profile';
export const pokemonRoutes = {
  base: pokemonBase,
};

export const logRoutes = {
  base: logBase,
};

export const profileRoutes = {
  base: profileView,
};

export const authBase = 'auth';
export const authRoutes = {
  login: `/${authBase}/login`,
  register: `/${authBase}/register`,
};

export const homeRoute = '/' + logBase;
