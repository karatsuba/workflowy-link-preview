import { Action } from 'redux';
import {
    LOAD_LINK_PREVIEW_ALIAS,
    OBSERVE_MUTATIONS,
    IGNORE_MUTATIONS,
    CLEAN_UP_STORE
} from './types';

export type ActionWithPayload<P> = Action & {
    payload: P;
};

export const observeMutations = (): Action => ({
    type: OBSERVE_MUTATIONS
});

export const ignoreMutations = (): Action => ({
    type: IGNORE_MUTATIONS
});

export const cleanUpStore = (): Action => ({
    type: CLEAN_UP_STORE
});
