import beforeInit from './hooks/before-init';
import errorLoadRemote from './hooks/error-load-remote';
import beforeRequest from './hooks/before-request';
import type { FederationRuntimePlugin } from '@module-federation/runtime';
import fetchHook from './hooks/fetch';

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
    beforeRequest: beforeRequest(),

    // Invoked before before requesting the manifest file to possibly replace it
    fetch: isElectronBuild ? fetchHook() : undefined,

    // ------- Extra Hooks
    //
    // afterResolve: (args) => {
    //   console.log('--------------- afterResolve: ', args);
    //   return args;
    // },
    // beforeInitContainer: (args) => {
    //   console.log('--------------- beforeInitContainer: ', args);
    //   return args;
    // },
    // async beforeLoadRemoteSnapshot(args) {
    //   console.log('--------------- beforeLoadRemoteSnapshot: ', args);
    //   if (!('entry' in args.moduleInfo)) {
    //     return args;
    //   }

    //   const url = new URL(args.moduleInfo.entry);

    //   console.log('entry: ', args.moduleInfo.entry)
    //   console.log('search: ', url.searchParams.get('t'))
    //   if (url.searchParams.get('t') || args.moduleInfo.entry.startsWith('/')) {
    //     return args;
    //   }

    //   const t = Date.now().toString();
    //   url.searchParams.set('t', t);
    //   const manifestUrl = url.toString();
    //   const response = await fetch(manifestUrl).catch(() => null);
    //   const remoteName = args.moduleInfo.name;
    //   const cacheKey = `MF_MANIFEST_REMOTE_${remoteName}`;

    //   if (response?.status === 200) {
    //     args.moduleInfo.entry = manifestUrl;
    //     localStorage.setItem(cacheKey, t);
    //     return args;
    //   }
    //   const cacheT = localStorage.getItem(cacheKey);

    //   if (cacheT) {
    //     url.searchParams.set('t', cacheT);
    //     const cacheManifest = url.toString();
    //     const cacheRes = await fetch(cacheManifest).catch(() => null);

    //     if (cacheRes?.status === 200) {
    //       args.moduleInfo.entry = cacheManifest;
    //       return args;
    //     }
    //   }

    //   args.moduleInfo.entry = `/_next/static/chunks/${remoteName}/mf-manifest.json`;
    //   return args;
    // },
    // beforeLoadShare: (args) => {
    //   console.log('--------------- beforeLoadShare: ', args);
    //   return args;
    // },
    // beforePreloadRemote: (args) => {
    //   console.log('--------------- beforePreloadRemote: ', args);
    //   return args;
    // },
    // handlePreloadModule: (args) => {
    //   console.log('--------------- handlePreloadModule: ', args);
    //   return args;
    // },
    // init: (args) => {
    //   console.log('--------------- init: ', args);
    //   return args;
    // },
    // initContainer: (args) => {
    //   console.log('--------------- initContainer: ', args);
    //   return args;
    // },
    // initContainerShareScopeMap: (args) => {
    //   console.log('--------------- initContainerShareScopeMap: ', args);
    //   return args;
    // },
    // loadRemoteSnapshot: (args) => {
    //   console.log('--------------- loadRemoteSnapshot: ', JSON.parse(JSON.stringify(args)));
    //   return args;
    // },
    // loadSnapshot: (args) => {
    //   console.log('--------------- loadSnapshot: ', args);
    //   return args;
    // },
    // onLoad: (args) => {
    //   console.log('--------------- onLoad: ', args);
    //   return args;
    // },
    // resolveShare: (args) => {
    //   console.log('--------------- resolveShare: ', args);
    //   return args;
    // },
    // createScript: (...args) => {
    //   console.log('--------------- createScript: ', args);
    //   const script = document.createElement('script');
    //   script.type = 'text/javascript';
    //   script.src = args[0].url;
    //   return script;
    // },
  };
};

export default runtimePlugin;
