import {
    LOAD_LINK_PREVIEW_REQUEST,
    LOAD_LINK_PREVIEW_SUCCESS,
    LOAD_LINK_PREVIEW_FAILURE,
    LOAD_LINK_PREVIEW_ALIAS
} from './types';
import Link from '../models/Link';
import { ActionWithPayload } from './index';

export type LinkPreviewRequestPayload = Pick<Link, 'id'>;
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

export const loadLinkPreviewRequest = (
    id: string
): ActionWithPayload<LinkPreviewRequestPayload> => ({
    type: LOAD_LINK_PREVIEW_REQUEST,
    payload: {
        id
    }
});

export const loadLinkPreviewSuccess = (link: Link): ActionWithPayload<{ link: Link }> => ({
    type: LOAD_LINK_PREVIEW_SUCCESS,
    payload: {
        link
    }
});

export const loadLinkPreviewFailure = (link: Link): ActionWithPayload<{ link: Link }> => ({
    type: LOAD_LINK_PREVIEW_FAILURE,
    payload: {
        link
    }
});
