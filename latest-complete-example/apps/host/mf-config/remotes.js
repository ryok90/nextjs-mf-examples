// Since this is runtime, you can add any environment variables here
// and it will be able to parse according with the setup.
const remoteEntries = {
  remote: process.env['NEXT_PUBLIC_REMOTE_URL'],
};

const placeholder = 'https://[environment]';

const getRemotes = () => [
  {
    name: 'remote',
    entry: `${placeholder}/_next/static/chunks/mf-manifest.json`,
  },
];

/**
 * @param {string} url
 * @param {string} remote
 * @param {boolean} isElectronBuild
 */
const getRemoteUrl = (url, remote, isElectronBuild = false) => {
  // Electron build will have the all the remote files provided
  // at build time on the host bundle
  if (isElectronBuild && !url.includes(`/chunks/${remote}/`)) {
    return url
      .replace(placeholder, '')
      .replace('/chunks/', `/chunks/${remote}/`);
  }
  return url.replace(placeholder, remoteEntries[remote]);
};

module.exports = { getRemotes, getRemoteUrl };
