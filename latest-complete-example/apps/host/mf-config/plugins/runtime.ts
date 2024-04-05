import beforeInit from './hooks/before-init';
import errorLoadRemote from './hooks/error-load-remote';
import beforeRequest from './hooks/before-request';
import type { FederationRuntimePlugin } from '@module-federation/runtime';

const isElectronBuild = process.env['NEXT_PUBLIC_ELECTRON_BUILD'] === 'true';

// Plugin added to the current application.
// Reference to the following page to see each hook.
// https://github.com/module-federation/universe/tree/main/packages/runtime#hooks
const runtimePlugin: () => FederationRuntimePlugin = function () {
  return {
    name: 'custom-plugin-next-js-mf-816',

    // Updates Federation Host configurations
    // before the initialization process of remote containers.
    beforeInit: beforeInit(),

    // Invoked if loading a federated module fails,
    // enabling custom error handling.
    errorLoadRemote: errorLoadRemote(),

    // Invoked before resolving a remote container,
    // useful for injecting the container or updating something ahead of the lookup.
    beforeRequest: beforeRequest(isElectronBuild),
  };
};

export default runtimePlugin;
