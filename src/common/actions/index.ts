import { RESET_STORE, CommonActions } from './types';

export const resetStore = (): CommonActions => ({
    type: RESET_STORE
});
