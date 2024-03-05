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
        extraOptions: {
          automaticAsyncBoundary: true,
        },
        exposes: {
          './table': './components/table/table',
        },
        shared: {
          'local-package': {
            singleton: true,
            strictVersion: false,
            version: '1.5.0',
            requiredVersion: '^1.0.0',
          },
        },
      }),
    );

    return config;
  },
};

module.exports = nextConfig;
