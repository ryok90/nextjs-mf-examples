const CACHE_KEY = 'MF_REMOTE_TIMESPAMP_';

const applyEntryCacheBust = async (res: Response, timestamp: string) => {
  const body = await res.json();
  body.metaData.remoteEntry.name += `?t=${timestamp}`;
  return new Response(JSON.stringify(body));
};

const fetchHook = (): any => {
  return async (url: string, _: any, args: any): Promise<Response | false> => {
    const remoteName = args?.moduleInfo.name;
    const newTimestamp = Date.now().toString();
    const newUrl = new URL(url);
    newUrl.searchParams.set('t', newTimestamp);
    const response = await fetch(newUrl.toString()).catch(() => null);
    const cacheKey = CACHE_KEY + remoteName;

    if (response?.status === 200) {
      localStorage.setItem(cacheKey, newTimestamp);
      return applyEntryCacheBust(response, newTimestamp);
    }

    const cacheTimestamp = localStorage.getItem(cacheKey);
    if (cacheTimestamp) {
      newUrl.searchParams.set('t', cacheTimestamp);
      const cacheRes = await fetch(newUrl.toString()).catch(() => null);
      if (cacheRes?.status === 200) {
        return applyEntryCacheBust(cacheRes, cacheTimestamp);
      }
    }

    const basePath = `/_next/static/chunks/${remoteName}`;
    const offlineRes = await fetch(basePath + newUrl.pathname)
      .then((res) => res.json())
      .catch(() => null);

    if (offlineRes?.status === 200) {
      return false;
    }

    offlineRes.metaData.publicPath = basePath + '/';
    return new Response(JSON.stringify(offlineRes));
  };
};

export default fetchHook;
