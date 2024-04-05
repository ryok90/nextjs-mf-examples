const RemoteLoaderPlugin = require('./mf-config/plugins/remote-loader');

const isElectronBuild = process.env['NEXT_PUBLIC_ELECTRON_BUILD'] === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {};

/** @type {import('next').NextConfig} */
const electronBuildConfig = {
  output: 'export',
  images: { unoptimized: true },
  webpack(config) {
    config.plugins.push(new RemoteLoaderPlugin());
    return config;
  },
};

module.exports = isElectronBuild ? electronBuildConfig : nextConfig;
