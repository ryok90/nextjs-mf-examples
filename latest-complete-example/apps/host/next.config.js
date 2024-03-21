const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack(config, options) {
  //   const { isServer } = options;
  //   const remoteDir = isServer ? 'ssr' : 'chunks';

  //   config.plugins.push(
  //     new NextFederationPlugin({
  //       name: 'host',
  //       filename: `static/${remoteDir}/remoteEntry.js`,
  //       extraOptions: {},
  //       remotes: {
  //         remote: `remote@https://[environment]/_next/static/${remoteDir}/remoteEntry.js`,
  //       },
  //       shared: {
  //         // Since Next.js 13.5, there has been an optimization in place for
  //         // big libraries with barrel files and/or subpackages.
  //         //
  //         // In order to share libraries with this optmization we use a trailing slash to tell
  //         // Webpack to match the requests made to these prefixes.
  //         //
  //         // This will also be needed in the remotes that you may want to override.
  //         //
  //         // References:
  //         // - https://nextjs.org/docs/app/api-reference/next-config-js/optimizePackageImports
  //         // - https://github.com/webpack/webpack.js.org/issues/5476
  //         '@mui/': {},
  //       },
  //       // @ts-ignore
  //       runtimePlugins: [
  //         require.resolve(path.join(__dirname, './plugins/runtimePlugin')),
  //       ],
  //     }),
  //   );

  //   return config;
  // },
};

module.exports = nextConfig;
