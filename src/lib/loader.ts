'use client';

import { useSyncExternalStore } from 'react';

// Tiny shared flag: has the preloader finished? Hero entrance waits on it.
let loaded = false;
const listeners = new Set<() => void>();

export function markLoaded() {
    if (loaded) return;
    loaded = true;
    listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
    listeners.add(cb);
    return () => listeners.delete(cb);
}

export function useLoaded() {
    return useSyncExternalStore(subscribe, () => loaded, () => false);
}
