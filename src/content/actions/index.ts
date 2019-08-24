import { Action } from 'redux';
import {
    LOAD_LINK_PREVIEW_ALIAS,
    OBSERVE_MUTATIONS,
    IGNORE_MUTATIONS,
    CLEAN_UP_STORE
} from '../../common/actions/types';
import Link from '../../common/models/Link';

export type ActionWithPayload<P> = Action & {
    payload: P;
};

export type LinkPreviewPayload = Pick<Link, 'id' | 'url'>;

export const loadLinkPreview = (
    id: string,
    url: string
): ActionWithPayload<LinkPreviewPayload> => ({
    type: LOAD_LINK_PREVIEW_ALIAS,
    payload: {
        id,
        url
    }
});

export const observeMutations = (): Action => ({
    type: OBSERVE_MUTATIONS
});

export const ignoreMutations = (): Action => ({
    type: IGNORE_MUTATIONS
});

export const cleanUpStore = (): Action => ({
    type: CLEAN_UP_STORE
});
