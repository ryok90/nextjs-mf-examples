// Invoked if loading a federated module fails,
// enabling custom error handling.
/** @type {import('@module-federation/runtime').FederationRuntimePlugin['errorLoadRemote']} */
const errorLoadRemote = async({ id, error, from, origin }) => {
  // Import custom component to show remote loading error.
  const component = (await import('../../components/error')).default;

  // Workaround to deal with build modules.
  let mod;
  if (from === 'build') {
    mod = () => ({
      __esModule: true,
      default: component,
    });
  } else {
    mod = {
      default: component,
    };
  }

  return mod;
}

module.exports = errorLoadRemote;
