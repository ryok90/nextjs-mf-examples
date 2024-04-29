const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure headers for the manifest to avoid cors error
  headers: async () => [
    {
      source: '/_next/static/:slug*.json',
      headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
    },
  ],
  webpack(config, options) {
    const { isServer } = options;
    const remoteDir = isServer ? 'ssr' : 'chunks';

    config.output.publicPath = process.env['NEXT_PUBLIC_APP_URL'] + '/_next/';
    config.plugins.push(
      new NextFederationPlugin({
        name: 'remote',
        filename: `static/${remoteDir}/remoteEntry.js`,
        extraOptions: {},
        exposes: { './table': './components/table/table' },
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
