function runtimePlugin() {
  return {
    name: 'custom-plugin-next-js-mf-9999',
    async errorLoadRemote({ id, error, from, origin }) {
      const pg = (await import('../components/error')).default

      let mod;
      if (from === 'build') {
        mod = () => ({
          __esModule: true,
          default: pg,
        });
      } else {
        mod = {
          default: pg,
        };
      }

      return mod;
    },
  };
}

module.exports = runtimePlugin;

