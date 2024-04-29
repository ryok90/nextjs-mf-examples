// Since this is runtime, you can add any environment variables here
// and it will be able to parse according with the setup.
const remoteEntries = {
  remote: process.env['NEXT_PUBLIC_REMOTE_URL'],
  react_remote: process.env['NEXT_PUBLIC_REACT_REMOTE_URL'],
};

const placeholder = 'https://[environment]';

const getRemotes = () => [
  {
    name: 'remote',
    entry: `${placeholder}/_next/static/chunks/mf-manifest.json`,
  },
  {
    name: 'react_remote',
    entry: `${placeholder}/mf-manifest.json`,
  },
];

/**
 * @param {string} url
 * @param {string} remote
 * @param {boolean} isElectronBuild
 */
const getRemoteUrl = (url, remote) => {
  return url.replace(placeholder, remoteEntries[remote]);
};

module.exports = { getRemotes, getRemoteUrl };
