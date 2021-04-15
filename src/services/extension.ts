const extensionSyncTimeout = 5000;

export const extensionSyncPromise = new Promise((resolve, reject) => {
  document.addEventListener('seenit-extension-sync', () => resolve(true));

  setTimeout(() => reject('timeout'), extensionSyncTimeout);
}).catch(() => false);

export const extensionCheckPromise = new Promise((resolve, reject) => {
  if (!process.env.REACT_APP_EXTENSION_ID)
    return reject('Missing extension id variable');

  try {
    chrome.runtime.sendMessage(
      process.env.REACT_APP_EXTENSION_ID,
      // process.env.REACT_APP_EXTENSION_ID.slice(0, -1) + 'a',
      'ping',
      response => {
        if (chrome.runtime.lastError) return reject(chrome.runtime.lastError);

        if (response === 'pong') return resolve(true);
      },
    );
  } catch (err) {
    reject(err);
  }
});

export const extensionAuthPromise = extensionCheckPromise
  .then(() => extensionSyncPromise)
  .catch(() => false);
