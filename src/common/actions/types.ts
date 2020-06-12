import Link from '../models/Link';

export const LOAD_LINK_PREVIEW_ALIAS = 'LOAD_LINK_PREVIEW_ALIAS';

export type LoadLinkPreviewAction = {
    type: typeof LOAD_LINK_PREVIEW_ALIAS;
    payload: Pick<Link, 'id' | 'url'>;
};

export const LOAD_LINK_PREVIEW_REQUEST = 'LOAD_LINK_PREVIEW_REQUEST';

export type LoadLinkPreviewRequestAction = {
    type: typeof LOAD_LINK_PREVIEW_REQUEST;
    payload: Pick<Link, 'id'>;
};

export const LOAD_LINK_PREVIEW_SUCCESS = 'LOAD_LINK_PREVIEW_SUCCESS';

export type LoadLinkPreviewSuccessAction = {
    type: typeof LOAD_LINK_PREVIEW_SUCCESS;
    payload: Link;
};

export const LOAD_LINK_PREVIEW_FAILURE = 'LOAD_LINK_PREVIEW_FAILURE';

export type LoadLinkPreviewFailureAction = {
    type: typeof LOAD_LINK_PREVIEW_FAILURE;
    payload: Link;
};

export const ADD_LINK = 'ADD_LINK';

export type AddLinkAction = {
    type: typeof ADD_LINK;
    payload: Pick<Link, 'id' | 'url'>;
};

export const REMOVE_LINK = 'REMOVE_LINK';

export type RemoveLinkAction = {
    type: typeof REMOVE_LINK;
    payload: Pick<Link, 'id'>;
};

export const RESET_STORE = 'RESET_STORE';

export type ResetStoreAction = {
    type: typeof RESET_STORE;
};

export type CommonActions =
    | LoadLinkPreviewAction
    | LoadLinkPreviewRequestAction
    | LoadLinkPreviewSuccessAction
    | LoadLinkPreviewFailureAction
    | AddLinkAction
    | RemoveLinkAction
    | ResetStoreAction;
