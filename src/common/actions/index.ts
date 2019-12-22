import { OBSERVE_MUTATIONS, IGNORE_MUTATIONS, CLEAN_UP_STORE, CommonActions } from './types';

export const observeMutations = (): CommonActions => ({
    type: OBSERVE_MUTATIONS
});

export const ignoreMutations = (): CommonActions => ({
    type: IGNORE_MUTATIONS
});

export const cleanUpStore = (): CommonActions => ({
    type: CLEAN_UP_STORE
});
