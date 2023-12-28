function runtimePlugin() {
  return {
    name: 'next-internal-plugin',
    beforeInit(args) {
      // @ts-ignore
      __FEDERATION__.__GLOBAL_PLUGIN__.push({
        name: 'next-override-deps-plugin',
        resolveShare(args) {
          const { shareScopeMap, scope, pkgName, version, GlobalFederation } =
            args;

          if (pkgName !== 'local-package') return args;

          const host = GlobalFederation['__INSTANCES__'][0];

          if (!host) {
            return args;
          }

          args.resolver = function () {
            shareScopeMap[scope][pkgName][version] = host.options.shared[pkgName]; // replace local share scope manually with desired module
            return shareScopeMap[scope][pkgName][version];
          };
          return args;
        },
      });
      return args;
    },
  };
}

module.exports = runtimePlugin;

