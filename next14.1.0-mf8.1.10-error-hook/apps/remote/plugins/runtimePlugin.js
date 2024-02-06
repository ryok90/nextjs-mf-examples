function runtimePlugin() {
  return {
    name: 'custom-plugin-next-js-mf-9999',
    errorLoadRemote({ id, error, from, origin }) {
      const pg = function () {
        console.error(id, '###########################', error);
        return null;
      };

      pg.getInitialProps = function (ctx) {
        return {};
      };
      let mod;
      if (from === 'build') {
        mod = () => ({
          __esModule: true,
          default: pg,
          getServerSideProps: () => ({ props: {} }),
        });
      } else {
        mod = {
          default: pg,
          getServerSideProps: () => ({ props: {} }),
        };
      }

      return mod;
    },
  };
}

module.exports = runtimePlugin;

