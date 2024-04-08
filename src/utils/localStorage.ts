enum LocalKeys {
  ADMIN_USER_TOKEN = 'ADMIN_USER_TOKEN',
  GUEST_USER_TOKEN = 'GUEST_USER_TOKEN',
  GUEST_PAYLOAD = 'GUEST_PAYLOAD',
  ACTIVE_LOCATION = 'ACTIVE_LOCATION',
  ACTIVE_LOGO = 'ACTIVE_LOGO',
  ACTIVE_ROUND = 'ACTIVE_ROUND',
  ACTIVE_PUBLIC_EVENT = 'ACTIVE_PUBLIC_EVENT',
  PUBLIC_EVENT_USERNAME = 'PUBLIC_EVENT_USERNAME',
  PUBLIC_EVENT_POOL_USERNAMES = 'PUBLIC_EVENT_POOL_USERNAMES',
}

const setLocal = (key: LocalKeys | string, value: string) => {
  localStorage.setItem(key, value);
};

const removeLocal = (key: LocalKeys | string) => {
  localStorage.removeItem(key);
};

const clearAll = () => {
  localStorage.clear();
};

const clearButKeepAdminToken = () => {
  const adminToken = getLocal(LocalKeys.ADMIN_USER_TOKEN);
  localStorage.clear();
  setLocal(LocalKeys.ADMIN_USER_TOKEN, adminToken!);
};

const getLocal = (key: LocalKeys | string) => {
  return localStorage.getItem(key);
};

export { LocalKeys, setLocal, removeLocal, getLocal, clearAll, clearButKeepAdminToken };
