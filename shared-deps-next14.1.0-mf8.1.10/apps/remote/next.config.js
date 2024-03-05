const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    const { isServer } = options;
    const remoteDir = isServer ? 'ssr' : 'chunks';

    config.plugins.push(
      new NextFederationPlugin({
        name: 'remote',
        filename: `static/${remoteDir}/remoteEntry.js`,
        extraOptions: {},
        exposes: {
          './table': './components/table/table',
        },
        shared: {
          'local-package': {
            version: '1.5.0',
            requiredVersion: '1.5.0',
            strictVersion: true,
            // singleton: true,
          },
        },
      }),
    );

    return config;
  },
};

module.exports = nextConfig;
