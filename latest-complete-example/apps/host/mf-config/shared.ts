import type { SharedObject, SharedConfig } from '@module-federation/utilities';

const DEFAULT_SHARE_SCOPE: SharedObject = {
  'next/dynamic': {
    requiredVersion: undefined,
  },
  'next/head': {
    requiredVersion: undefined,
  },
  'next/link': {
    requiredVersion: undefined,
  },
  'next/router': {
    requiredVersion: false,
  },
  'next/image': {
    requiredVersion: undefined,
  },
  'next/script': {
    requiredVersion: undefined,
  },
  react: {
    requiredVersion: false,
  },
  'react/': {
    requiredVersion: false,
  },
  'react-dom/': {
    requiredVersion: false,
  },
  'react-dom': {
    requiredVersion: false,
  },
  'react/jsx-dev-runtime': {
    requiredVersion: undefined,
  },
  'react/jsx-runtime': {
    requiredVersion: undefined,
  },
  'styled-jsx': {
    version: require('styled-jsx/package.json').version,
    requiredVersion: '^' + require('styled-jsx/package.json').version,
  },
  'styled-jsx/style': {
    version: require('styled-jsx/package.json').version,
    requiredVersion: '^' + require('styled-jsx/package.json').version,
  },
  'styled-jsx/css': {
    version: require('styled-jsx/package.json').version,
    requiredVersion: '^' + require('styled-jsx/package.json').version,
  },
};

export const DEFAULT_SHARE_SCOPE_BROWSER: SharedObject = Object.entries(
  DEFAULT_SHARE_SCOPE
).reduce((acc, item) => {
  const [key, value] = item as [string, SharedConfig];
  acc[key] = { ...value, import: undefined, singleton: true };

  return acc;
}, {} as SharedObject);
