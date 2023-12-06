const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const lo = require('../../../local-package/v1.0.0');


/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    const { isServer } = options;
    const remoteDir = isServer ? 'ssr' : 'chunks';

    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        filename: `static/${remoteDir}/remoteEntry.js`,
        extraOptions: {
          automaticAsyncBoundary: true,
        },
        remotes: {
          remote: `remote@http://localhost:3011/_next/static/${remoteDir}/remoteEntry.js`,
        },
        shared: {
          'local-package': {
            singleton: true,
            strictVersion: true,
            version: '1.0.0',
            requiredVersion: '1.0.0',
          },
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;
