const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

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
            strictVersion: true,
            requiredVersion: '1.5.0',
            singleton: false,
          },
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;
