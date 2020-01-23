import { OBSERVE_MUTATIONS, IGNORE_MUTATIONS, RESET_STORE, CommonActions } from './types';

export const observeMutations = (): CommonActions => ({
    type: OBSERVE_MUTATIONS
});

export const ignoreMutations = (): CommonActions => ({
    type: IGNORE_MUTATIONS
});

export const resetStore = (): CommonActions => ({
    type: RESET_STORE
});
