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

export const OBSERVE_MUTATIONS = 'OBSERVE_MUTATIONS';

export type ObserveMutationAction = {
    type: typeof OBSERVE_MUTATIONS;
};

export const IGNORE_MUTATIONS = 'IGNORE_MUTATIONS';

export type IgnoreMutationAction = {
    type: typeof IGNORE_MUTATIONS;
};

export const CLEAN_UP_STORE = 'CLEAN_UP_STORE';

export type CleanUpStoreAction = {
    type: typeof CLEAN_UP_STORE;
};

export type CommonActions =
    | LoadLinkPreviewAction
    | LoadLinkPreviewRequestAction
    | LoadLinkPreviewSuccessAction
    | LoadLinkPreviewFailureAction
    | AddLinkAction
    | RemoveLinkAction
    | ObserveMutationAction
    | IgnoreMutationAction
    | CleanUpStoreAction;
