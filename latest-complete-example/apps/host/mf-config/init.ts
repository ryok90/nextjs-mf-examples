import { init } from '@module-federation/runtime';
import { shared } from './shared';
import runtimePlugin from './plugins/runtime-plugin';

init({
  name: 'next-host-runtime',
  remotes: [
    {
      name: 'remote',
      entry: `https://[environment]/_next/static/chunks/remoteEntry.js`,
    },
  ],
  shared,
  plugins: [runtimePlugin()],
});
