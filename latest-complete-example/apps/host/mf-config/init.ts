import {
  init,
  preloadRemote,
  registerRemotes,
} from '@module-federation/runtime';
import { shared } from './shared';
import runtimePlugin from './plugins/runtime';
import { getRemotes } from './remotes';

init({
  name: 'next-host-runtime',
  remotes: getRemotes(),
  shared: shared(),
  plugins: [runtimePlugin()],
});
