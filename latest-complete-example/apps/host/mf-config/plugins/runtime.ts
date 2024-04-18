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

    // afterResolve: (args) => {
    //   console.log('afterResolve: ', args);
    //   return args;
    // },
    // beforeInitContainer: (args) => {
    //   console.log('beforeInitContainer: ', args);
    //   return args;
    // },
    // beforeLoadRemoteSnapshot: (args) => {
    //   console.log('beforeLoadRemoteSnapshot: ', args);
    //   return args;
    // },
    // beforeLoadShare: (args) => {
    //   console.log('beforeLoadShare: ', args);
    //   return args;
    // },
    // beforePreloadRemote: (args) => {
    //   console.log('beforePreloadRemote: ', args);
    //   return args;
    // },
    // handlePreloadModule: (args) => {
    //   console.log('handlePreloadModule: ', args);
    //   return args;
    // },
    // init: (args) => {
    //   console.log('init: ', args);
    //   return args;
    // },
    // initContainer: (args) => {
    //   console.log('initContainer: ', args);
    //   return args;
    // },
    // initContainerShareScopeMap: (args) => {
    //   console.log('initContainerShareScopeMap: ', args);
    //   return args;
    // },
    // loadRemoteSnapshot: (args) => {
    //   console.log('loadRemoteSnapshot: ', JSON.parse(JSON.stringify(args)));
    //   return args;
    // },
    // loadSnapshot: (args) => {
    //   console.log('loadSnapshot: ', args);
    //   return args;
    // },
    // onLoad: (args) => {
    //   console.log('onLoad: ', args);
    //   return args;
    // },
    // resolveShare: (args) => {
    //   console.log('resolveShare: ', args);
    //   return args;
    // },

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
