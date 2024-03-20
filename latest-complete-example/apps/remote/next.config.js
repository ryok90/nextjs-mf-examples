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
          '@mui/': {
            version: '5.15.5',
            requiredVersion: '5.15.5',
            strictVersion: true,
            singleton: false,
          },
        },
      }),
    );

    return config;
  },
};

module.exports = nextConfig;
