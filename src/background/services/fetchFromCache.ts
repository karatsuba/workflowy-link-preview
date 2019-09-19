const WLP_CACHE_STORAGE_KEY = 'WLP_CACHE_STORAGE_NAME';

// fetch url from cache or fetch and then save to cache for the future usega
export default async (url: string) => {
    try {
        const cache = await caches.open(WLP_CACHE_STORAGE_KEY);
        const cachedResponse = await cache.match(url);
        if (cachedResponse) {
            return cachedResponse;
        }
        const networkResponse = await fetch(url);
        cache.put(url, networkResponse.clone());
        return networkResponse;
    } catch (error) {
        throw error;
    }
};
