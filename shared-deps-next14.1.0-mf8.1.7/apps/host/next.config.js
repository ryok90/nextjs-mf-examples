const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    const { isServer } = options;
    const remoteDir = isServer ? 'ssr' : 'chunks';

    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        filename: `static/${remoteDir}/remoteEntry.js`,
        extraOptions: {},
        remotes: {
          remote: `remote@http://localhost:3011/_next/static/${remoteDir}/remoteEntry.js`,
        },
        shared: {
          'local-package': {
            version: '1.0.0',
            // requiredVersion: '1.0.0',
            // strictVersion: true,
            singleton: true,
          },
        },
        // @ts-ignore
        runtimePlugins: [
          require.resolve(path.join(__dirname, './plugins/runtimePlugin')),
        ],
      })
    );

    return config;
  },
};

module.exports = nextConfig;
