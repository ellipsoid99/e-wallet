const setSessionStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

const getSessionStorateValByKey = (key) => {
  // if (window && window.sessionStorage) {
  //     return sessionStorage.getItem(key);
  // }
  if (typeof window !== "undefined") {
    // do your stuff with sessionStorage
    const item = sessionStorage.getItem(key);
    return JSON.parse(item);
  }
};

export { setSessionStorage, getSessionStorateValByKey };
