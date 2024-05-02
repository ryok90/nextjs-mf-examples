import { remoteEntries } from '../../remotes';
import { FederationRuntimePlugin } from '@module-federation/runtime';

type FetchHook = NonNullable<FederationRuntimePlugin['fetch']>;

const getRemoteName = (url: string) => {
  const remote = Object.entries(remoteEntries).find(([_, baseUrl]) =>
    url.startsWith(baseUrl)
  );
  return remote?.[0] ?? '';
};

// The fetch hook is triggered every time a remote is request and it has a manifest file
// as the entry point. In this hook we will be manipulating the cache bust key but also
// provide the MF with the offline bundled remote (for the Electron app) made possible by
// the RemoteLoaderPlugin.
const fetchHook = (): FetchHook => {
  return async (url: string): Promise<Response> => {
    const timestamp = Date.now().toString();
    const newUrl = new URL(url);
    newUrl.searchParams.set('t', timestamp);
    const response = await fetch(newUrl.toString()).catch(() => null);
    const remoteName = getRemoteName(url);

    if (response?.ok) {
      const body = await response.json();
      body.metaData.remoteEntry.name += `?t=${timestamp}`;
      return new Response(JSON.stringify(body));
    }

    const basePath = `/_next/static/chunks/${remoteName}/`;
    const offlineRes = await fetch(basePath + 'mf-manifest.json')
      .then((res) => res.json())
      .catch(() => null);

    if (offlineRes?.ok) {
      return false as unknown as Response; // Typing is wrong on the hook.
    }

    offlineRes.metaData.publicPath = basePath;
    return new Response(JSON.stringify(offlineRes));
  };
};

export default fetchHook;
