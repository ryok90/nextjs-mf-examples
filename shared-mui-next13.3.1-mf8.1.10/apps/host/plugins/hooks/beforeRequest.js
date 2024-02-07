// Since this is runtime, you can add any environment variables here
// and it will be able to parse according with the setup.
const remoteEntries = {
  remote: 'http://localhost:3011',
};

// Invoked before resolving a remote container,
// useful for injecting the container or updating something ahead of the lookup.
/** @type {import('@module-federation/runtime').FederationRuntimePlugin['beforeRequest']} */
const beforeRequest = (args) => {
  // Here you can optimize to replace only the one you want by the args.id
  // It has the exact import you want.

  // For this example it runs through all of the remotes in search of a match to replace
  args.options.remotes.forEach((remote) => {
    const name = remote.name;

    // Matches and replaces with whatever you want
    // Note to the replacer that is the same one defined on next.config.js
    if (remoteEntries[name] && 'entry' in remote) {
      remote.entry = remote.entry.replace(
        'https://[environment]',
        remoteEntries[name]
      );
    }
  });

  return args;
};

module.exports = beforeRequest;
