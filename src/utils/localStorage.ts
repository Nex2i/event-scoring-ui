enum LocalKeys {
  USER_TOKEN = 'USER_TOKEN',
  ACTIVE_LOCATION = 'ACTIVE_LOCATION',
  ACTIVE_LOGO = 'ACTIVE_LOGO',
  ACTIVE_ROUND = 'ACTIVE_ROUND',
  ACTIVE_PUBLIC_EVENT = 'ACTIVE_PUBLIC_EVENT',
}

const setLocal = (key: LocalKeys | string, value: string) => {
  localStorage.setItem(key, value);
};

const removeLocal = (key: LocalKeys) => {
  localStorage.removeItem(key);
};

const clearAll = () => {
  localStorage.clear();
};

const getLocal = (key: LocalKeys | string) => {
  return localStorage.getItem(key);
};

export { LocalKeys, setLocal, removeLocal, getLocal };
