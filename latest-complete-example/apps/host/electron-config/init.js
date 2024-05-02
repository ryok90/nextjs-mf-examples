const initElectron = () => {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) {
    // console.error('Service workers are not supported.');
    return
  }

  // Register a service worker hosted at the root of the
  // site using the default scope.
  navigator.serviceWorker
    .register(`/service-worker.js`)
    .then(() => {
      if (!navigator.serviceWorker.controller) location.reload();
    })
    .catch((error) => {
      console.error(`Service worker registration failed: ${error}`);
    });
};

module.exports = initElectron;
