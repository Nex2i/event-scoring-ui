enum LocalKeys {
  ADMIN_USER_TOKEN = 'ADMIN_USER_TOKEN',
  GUEST_USER_TOKEN = 'GUEST_USER_TOKEN',
  GUEST_PAYLOAD = 'GUEST_PAYLOAD',
  ACTIVE_LOCATION = 'ACTIVE_LOCATION',
  ACTIVE_LOGO = 'ACTIVE_LOGO',
  ACTIVE_ROUND = 'ACTIVE_ROUND',
  ACTIVE_PUBLIC_EVENT = 'ACTIVE_PUBLIC_EVENT',
  PUBLIC_EVENT_USERNAME = 'PUBLIC_EVENT_USERNAME',
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

export { LocalKeys, setLocal, removeLocal, getLocal, clearAll };
