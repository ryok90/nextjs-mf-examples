const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    const { isServer } = options;
    const remoteDir = isServer ? 'ssr' : 'chunks';

    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        filename: 'static/chunks/remoteEntry.js',
        extraOptions: {},
        remotes: {
          remote: `remote@http://localhost:3011/_next/static/${remoteDir}/remoteEntry.js`,
        },
        shared: {},
      }),
    );

    return config;
  },
};

module.exports = nextConfig;
