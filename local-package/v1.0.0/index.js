const PACKAGE_VERSION = 'v1.0.0';

module.exports = function () {
  if (typeof window !== 'undefined') {
    window['PACKAGE_VERSION'] = PACKAGE_VERSION;
  }

  console.log('LOCAL-PACKAGE VERSION', PACKAGE_VERSION);

  return PACKAGE_VERSION;
};
