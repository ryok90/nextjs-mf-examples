import { init } from '@module-federation/runtime';
import { shared } from './shared';
import runtimePlugin from './plugins/runtime';
import { getRemotes } from './remotes';

export default function initMF() {
  init({
    name: 'next-host-runtime',
    remotes: getRemotes(),
    shared: shared(),
    plugins: [runtimePlugin()],
  });
}
