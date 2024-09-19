export const setLocalStorage = (key: string, value: string): void => {
    return localStorage.setItem(key, value);
};

export const getLocalStorage = (key: string): string | null => {
    return localStorage.getItem(key);
};

export const removeLocalStorage = (key: string): void => {
    return localStorage.removeItem(key);
};