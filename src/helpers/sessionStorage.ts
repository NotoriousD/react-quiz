export const getDataFromStorage = (key: string) => {
  const storage = sessionStorage.getItem(key);
  return storage ? JSON.parse(storage) : null;
};

export const setDataToStorage = (key: string, data: unknown) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};
