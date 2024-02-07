// This hook will be used to override the dependency (Mui) coming from the remote with 
// one from the host.
/** @type {import('@module-federation/runtime').FederationRuntimePlugin['beforeInit']} */
const beforeInit = (args) => {
  // Push custom plugin to the MF GLOBAL registry to run on every remote.
  __FEDERATION__.__GLOBAL_PLUGIN__.push({
    name: 'next-override-deps-plugin',
    // Allows manual resolution of shared module requests.
    resolveShare(args) {
      const { shareScopeMap, scope, pkgName, version, GlobalFederation } = args;

      // The first entry on the global MF instances will always be the host.
      const host = GlobalFederation['__INSTANCES__'][0];

      // Here you could add the libraries that would be overriden by the host's.
      if (!host || !pkgName.includes('@mui/')) return args;

      // Resolver function gets called to get the requested dependencies.
      // We replace the resolver function
      // Replace the dependency with the host's to override whichever one they are using.
      args.resolver = function () {
        console.log('replacing: ', pkgName);
        shareScopeMap[scope][pkgName][version] = host.options.shared[pkgName];
        return shareScopeMap[scope][pkgName][version];
      };
      return args;
    },
  });
  return args;
}

module.exports = beforeInit
