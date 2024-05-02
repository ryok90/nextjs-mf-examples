import type { FederationRuntimePlugin } from '@module-federation/runtime/.';

type ErrorLoadRemote = NonNullable<FederationRuntimePlugin['errorLoadRemote']>;

// Invoked if loading a federated module fails,
// enabling custom error handling.
const errorLoadRemote = (): ErrorLoadRemote =>
  async function ({ from, error }) {
    // console.log('----------------- errorLoadRemote: ', error)
    // Import custom component to show remote loading error.
    const component = (await import('../../../components/error')).default;

    // Workaround to deal with build modules.
    if (from === 'build') {
      return () => ({
        __esModule: true,
        default: component,
      });
    }

    return {
      default: component,
    };
  };

export default errorLoadRemote;
