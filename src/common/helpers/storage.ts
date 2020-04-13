const storagePrefix = 'seenit-web-';

export function getStorageValue<T = object>(key: string) {
  const item = window.localStorage.getItem(storagePrefix + key);
  if (!item) return null;

  try {
    return JSON.parse(item);
  } catch {
    return item;
  }
}

export function updateStorage<T = object>(key: string, value: T) {
  return window.localStorage.setItem(
    storagePrefix + key,
    JSON.stringify(value),
  );
  // return new Promise<void>(resolve => chrome.storage.sync.set(value, resolve));
}