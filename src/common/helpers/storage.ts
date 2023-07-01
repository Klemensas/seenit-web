const storagePrefix = 'seenit-web-';

export function getStorageValue(key: string) {
  const item = window.localStorage.getItem(storagePrefix + key);
  if (!item) return null;

  try {
    return JSON.parse(item);
  } catch {
    return item;
  }
}

export function updateStorage<T = object | string>(key: string, value: T) {
  if (!value) return window.localStorage.removeItem(storagePrefix + key);

  return window.localStorage.setItem(
    storagePrefix + key,
    typeof value === 'string' ? value : JSON.stringify(value),
  );
}
