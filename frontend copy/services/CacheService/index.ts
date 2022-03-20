const setSessionStorage = (key: string, value: string) => {
    sessionStorage.setItem(key, JSON.stringify(value));
};

const getSessionStorateValByKey = (key: string) => {
    // if (window && window.sessionStorage) {
    //     return sessionStorage.getItem(key);
    // }
    if (typeof window !== "undefined") {
        // do your stuff with sessionStorage
        const item: any = sessionStorage.getItem(key);
        return JSON.parse(item);
    }
};

export { setSessionStorage, getSessionStorateValByKey };
