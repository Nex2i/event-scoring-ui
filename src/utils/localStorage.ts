enum LocalKeys {
  USER_TOKEN = 'USER_TOKEN',
  ACTIVE_LOCATION = 'ACTIVE_LOCATION',
  ACTIVE_LOGO = 'ACTIVE_LOGO',
}

const setLocal = (key: LocalKeys, value: string) => {
  localStorage.setItem(key, value);
};

const removeLocal = (key: LocalKeys) => {
  localStorage.removeItem(key);
};

const getLocal = (key: LocalKeys) => {
  return localStorage.getItem(key);
};

export { LocalKeys, setLocal, removeLocal, getLocal };
