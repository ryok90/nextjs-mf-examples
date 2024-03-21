import type { ShareArgs } from '@module-federation/runtime/dist/src/type';
import * as nextDynamic from 'next/dynamic';
import * as nextHead from 'next/head';
import * as nextLink from 'next/link';
import * as nextRouter from 'next/router';
import * as nextImage from 'next/image';
import * as nextScript from 'next/script';
import * as react from 'react';
import * as reactDom from 'react-dom';
import * as reactJsxRuntime from 'react/jsx-runtime';
import * as reactJsxDevRuntime from 'react/jsx-dev-runtime';
import * as styledJsx from 'styled-jsx';
import * as styledJsxStyle from 'styled-jsx/style';
import * as styledJsxCss from 'styled-jsx/css';
import * as mui from '@mui/material';

export const shared: Record<string, ShareArgs> = {
  'next/dynamic': {
    version: require('next/package.json').version,
    lib: () => nextDynamic,
    shareConfig: {
      requiredVersion: false,
    },
  },
  'next/head': {
    version: require('next/package.json').version,
    lib: () => nextHead,
    shareConfig: {
      requiredVersion: false,
    },
  },
  'next/link': {
    version: require('next/package.json').version,
    lib: () => nextLink,
    shareConfig: {
      requiredVersion: false,
    },
  },
  'next/router': {
    version: require('next/package.json').version,
    lib: () => nextRouter,
    shareConfig: {
      requiredVersion: false,
    },
  },
  'next/image': {
    version: require('next/package.json').version,
    lib: () => nextImage,
    shareConfig: {
      requiredVersion: false,
    },
  },
  'next/script': {
    version: require('next/package.json').version,
    lib: () => nextScript,
    shareConfig: {
      requiredVersion: false,
    },
  },
  react: {
    version: require('react/package.json').version,
    lib: () => react,
    shareConfig: {
      requiredVersion: false,
    },
  },
  'react/': {
    version: require('react/package.json').version,
    lib: () => react,
    shareConfig: {
      requiredVersion: false,
    },
  },
  'react-dom/': {
    version: require('react-dom/package.json').version,
    lib: () => reactDom,
    shareConfig: {
      requiredVersion: false,
    },
  },
  'react-dom': {
    version: require('react-dom/package.json').version,
    lib: () => reactDom,
    shareConfig: {
      requiredVersion: false,
    },
  },
  'react/jsx-dev-runtime': {
    version: require('react/package.json').version,
    lib: () => reactJsxDevRuntime,
    shareConfig: {
      requiredVersion: false,
    },
  },
  'react/jsx-runtime': {
    version: require('react/package.json').version,
    lib: () => reactJsxRuntime,
    shareConfig: {
      requiredVersion: false,
    },
  },
  'styled-jsx': {
    version: require('styled-jsx/package.json').version,
    lib: () => styledJsx,
    shareConfig: {
      requiredVersion: '^' + require('styled-jsx/package.json').version,
    },
  },
  'styled-jsx/style': {
    version: require('styled-jsx/package.json').version,
    lib: () => styledJsxStyle,
    shareConfig: {
      requiredVersion: '^' + require('styled-jsx/package.json').version,
    },
  },
  'styled-jsx/css': {
    version: require('styled-jsx/package.json').version,
    lib: () => styledJsxCss,
    shareConfig: {
      requiredVersion: '^' + require('styled-jsx/package.json').version,
    },
  },
  '@mui/material': {
    version: require('@mui/material/package.json').version,
    lib: () => mui,
  },
  '@mui/material/package.json': {
    version: require('@mui/material/package.json').version,
    lib: () => require('@mui/material/package.json'),
  },
  '@mui/material/Button': {
    version: require('@mui/material/package.json').version,
    lib: () => mui.Button,
  },
};
