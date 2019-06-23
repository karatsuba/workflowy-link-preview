import { Action } from 'redux';
import { LOAD_LINK_PREVIEW_ALIAS } from '../../common/actions/types';
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
    type: 'MUTATION_OBSERVER__OBSERVE'
});

export const cleanUpStore = (): Action => ({
    type: 'CLEAN_UP_STORE'
});
