const beforeInit = require('./hooks/beforeInit');
const errorLoadRemote = require('./hooks/errorLoadRemote');
const beforeRequest = require('./hooks/beforeRequest');

// Plugin added to the current application.
// Reference to the following page to see each hook.
// https://github.com/module-federation/universe/tree/main/packages/runtime#hooks
/** @type {() => import('@module-federation/runtime').FederationRuntimePlugin} */
function runtimePlugin() {
  return {
    name: 'custom-plugin-next-js-mf-816',

    // Updates Federation Host configurations
    // before the initialization process of remote containers.
    beforeInit,

    // Invoked if loading a federated module fails,
    // enabling custom error handling.
    errorLoadRemote,

    // Invoked before resolving a remote container,
    // useful for injecting the container or updating something ahead of the lookup.
    beforeRequest,
  };
}

module.exports = runtimePlugin;
