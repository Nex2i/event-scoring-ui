class envhelper {
  currentEnv = import.meta.env.VITE_ENV;

  isDev = this.currentEnv !== 'PROD';
}

export default envhelper;
