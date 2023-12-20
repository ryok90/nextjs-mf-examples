function runtimePlugin() {
  return {
    name: 'next-internal-plugin-aaa',
    // beforeInit(args) {
    //   if (!__webpack_runtime_id__.startsWith('webpack')) return args;
    //   const attach =
    //     //@ts-ignore
    //     typeof __webpack_require__?.federation?.attachRemote === 'function'
    //       ? //@ts-ignore
    //         __webpack_require__.federation.attachRemote
    //       : () => {
    //           //@ts-ignore
    //           console.error('embedded container', args.id, 'is not found');
    //           return false;
    //         };

    //   const { moduleCache, name } = args.origin;

    //   const attachedRemote = attach();
    //   if (attachedRemote) {
    //     moduleCache.set(name, attachedRemote);
    //   }

    //   return args;
    // },
    // init(args) {
    //   return args;
    // },
    // beforeLoadRemote(args) {
    //   return args;
    // },
    // // createScript(args) {
    // //   return args;
    // // },
    // loadRemoteMatch(args) {
    //   return args;
    // },
    // loadRemote(args) {
    //   return args;
    // },
    resolveShare(args) {
      if (
        args.pkgName !== 'react' &&
        args.pkgName !== 'react-dom' &&
        args.pkgName.startsWith('next/')
      ) {
        return args;
      }
      const { shareScopeMap, scope, pkgName, version, GlobalFederation } = args;

      const host = GlobalFederation['__INSTANCES__'][0];
      if (!host) {
        return args;
      }
      args.resolver = function () {
        if (pkgName === 'local-package') {
          console.log(`host ${pkgName}: `, host.options.shared[pkgName])
          console.log(`resolving ${pkgName}: `, shareScopeMap[scope][pkgName][version])
          shareScopeMap[scope][pkgName][version] = host.options.shared[pkgName]; // replace local share scope manually with desired module
          return shareScopeMap[scope][pkgName][version]
        }

        return shareScopeMap[scope][pkgName][version]
      };
      return args;
    },
    // async beforeLoadShare(args) {
    //   console.log('beforeLoadShareArgs: ', args)
    //   return args;
    // },
    // async loadShare(args) {
    //   console.log('loadShareArgs: ', args)
    //   return args
    // }
  };
}

module.exports = runtimePlugin