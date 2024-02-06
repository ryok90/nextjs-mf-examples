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
        filename: 'static/chunks/remoteEntry.js',
        extraOptions: {},
        remotes: {
          // wrong port to induce module loading error
          remote: `remote@http://localhost:3012/_next/static/${remoteDir}/remoteEntry.js`,
          // remote: `remote@http://localhost:3011/_next/static/${remoteDir}/remoteEntry.js`,
        },
        shared: {},
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
