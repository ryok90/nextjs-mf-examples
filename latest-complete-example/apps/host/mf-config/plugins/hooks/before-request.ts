import type { FederationRuntimePlugin } from '@module-federation/runtime';
import { getRemoteUrl } from '../../remotes';

type BeforeRequest = NonNullable<FederationRuntimePlugin['beforeRequest']>;

// Invoked before resolving a remote container,
// useful for injecting the container or updating something ahead of the lookup.
const beforeRequest = (): BeforeRequest =>
  function (args) {
    // Here you can optimize to replace only the one you want by the args.id
    // It has the exact import you want.

    // For this example it runs through all of the remotes in search of a match to replace
    args.options.remotes.forEach((remote) => {
      // Matches and replaces with whatever you want
      if ('entry' in remote) {
        remote.entry = getRemoteUrl(remote.entry, remote.name);
      }
    });

    return args;
  };

export default beforeRequest;
