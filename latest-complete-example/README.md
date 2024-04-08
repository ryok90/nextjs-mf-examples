# Next.js + Electron + Module Federation

This example will showcase the compilation of all examples from this repository trying to stay always up to date on all mentioned libraries.

## Sample Structure

```
- template
  ├ host            (A Next.js host app)
  ├ remote          (A Next.js remote app)
  ├ package.json    (Package file with scripts to run all apps at once)
  └ README.md       (This readme file to explain how to run the sample and deploy it using Zephyr)
```

## Sample Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Electron](https://www.electronjs.org/)
- [Module Federation](https://module-federation.io/)

## How to run the sample

Install the dependencies using `npm`:

```bash
npm i
```

To run the sample in development mode, run the following command:

```bash
npm run dev
```

To run the sample in production mode, first build the sample using the following command:

```bash
npm run build
```

Then, run the following command to serve the sample:

```bash
npm run start
```

To run the Electron app just use:

```bash
npm run dev-electron
```

To build the Electron app you're going to need the builded version of the remote app and that to be up as well so on one terminal:

```bash
cd apps/remote && npm run build && npm run start
```

After that is up, just run:

```bash
npm run build-electron
```


## Feature Showcase

Besides running all of these tools together in a federated application, this example wants to also showcase some specific solutions for some corner cases:
- Ability to capture remote loading errors and render personalized components with different messages. ([here](#handling-remote-errors)));
- Control over the dependency loading (and overriding) from what the remote requires. ([here](#overriding-remote-dependencies));
- Dynamic remotes addresses using runtime environment variables. ([here](#dynamic-remotes));
- Have an offline version of the whole Host application containing all of the remotes in the bundle. ([here](#electron-offline-app));
- Have the host application running without the NextFederationPlugin for webpack (full runtime). ([here](#all-runtime-on-the-host));

Module Federation's [Runtime API](https://github.com/module-federation/universe/tree/main/packages/runtime) gives us the ability to run the federated application from the runtime as well as tap into some lifecycle hooks to manipulate or change loading processes to your liking. This API enables most of the solutions showcased in this project.

### Handling Remote Errors

Anytime a remote errors out from loading, it gets captured by this hook and you may decide what it will resolve to or where to log the error information. You can check how its done [here](https://github.com/ryok90/nextjs-mf-examples/blob/main/latest-complete-example/apps/host/mf-config/plugins/hooks/error-load-remote.ts).

### Overriding Remote Dependencies

Sometimes we need to control whether we want the remote to load a dependency or not because it could imply changes to the host's dependencies or even version conflicts. To solve this we could use the `beforeInit` hook to add a global plugin to have that control over what the remotes would be loading and instead provide the remote with local dependencies. Take a look [here](https://github.com/ryok90/nextjs-mf-examples/blob/main/latest-complete-example/apps/host/mf-config/plugins/hooks/before-init.ts).
1
### Dynamic Remotes

The `beforeRequest` hook allows us to tap into the process right before it makes a request for a remote container. This way we can alter the remote URL that is going to be requested and replace it with what we want, in this case, environment variables.

The hook can be seen [here](https://github.com/ryok90/nextjs-mf-examples/blob/main/latest-complete-example/apps/host/mf-config/plugins/hooks/before-request.ts) and the implementation of the remote URL replacement can be seen [on this file](https://github.com/ryok90/nextjs-mf-examples/blob/main/latest-complete-example/apps/host/mf-config/remotes.js).

Note that this solution also includes implementation regarding the Electron solution.

### Electron Offline App

For a Federated application to be available offline we would need to bundle all of the remotes together with the host to be able to build the Electron app. For this we chose to provide a custom [Webpack Plugin](https://github.com/ryok90/nextjs-mf-examples/blob/main/latest-complete-example/apps/host/mf-config/plugins/remote-loader.js) that is responsible for loading the Module Federation [Manifest](https://github.com/module-federation/universe/tree/main/packages/manifest) of all remotes, loading all of its containers and providing them for Webpack to bundle the remotes.

While that solves the resource problem of the implementation we still have the reference URL issue and for that we rely again on the `beforeRequest` hook to replace the remote's URLs to allow them to be requested from the host (since it's now all bundled up together). This is showcased [in the getRemoteUrl function](https://github.com/ryok90/nextjs-mf-examples/blob/main/latest-complete-example/apps/host/mf-config/remotes.js).

### All Runtime on the Host

Since the host of this application doesn't need to export/expose any components, only consume, then the need for the NextFederationPlugin is dropped. This way we can see in the example the declaration of the [init configuration](https://github.com/ryok90/nextjs-mf-examples/blob/main/latest-complete-example/apps/host/mf-config/init.ts) and the [loading of these remotes](https://github.com/ryok90/nextjs-mf-examples/blob/main/latest-complete-example/apps/host/pages/index.tsx) asynchronously.

