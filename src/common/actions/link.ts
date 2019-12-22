import {
    LOAD_LINK_PREVIEW_REQUEST,
    LOAD_LINK_PREVIEW_SUCCESS,
    LOAD_LINK_PREVIEW_FAILURE,
    LOAD_LINK_PREVIEW_ALIAS,
    ADD_LINK,
    REMOVE_LINK,
    CommonActions
} from './types';
import Link from '../models/Link';

export const loadLinkPreview = (id: string, url: string): CommonActions => ({
    type: LOAD_LINK_PREVIEW_ALIAS,
    payload: {
        id,
        url
    }
});

export const loadLinkPreviewRequest = (id: string): CommonActions => ({
    type: LOAD_LINK_PREVIEW_REQUEST,
    payload: {
        id
    }
});

export const loadLinkPreviewSuccess = (link: Link): CommonActions => ({
    type: LOAD_LINK_PREVIEW_SUCCESS,
    payload: link
});

export const loadLinkPreviewFailure = (link: Link): CommonActions => ({
    type: LOAD_LINK_PREVIEW_FAILURE,
    payload: link
});

export const addLink = (id: string, url: string): CommonActions => ({
    type: ADD_LINK,
    payload: {
        id,
        url
    }
});

export const removeLink = (id: string): CommonActions => ({
    type: REMOVE_LINK,
    payload: {
        id
    }
});
