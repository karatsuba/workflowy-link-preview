export const LOAD_LINK_PREVIEW = 'LOAD_LINK_PREVIEW';
export const LOAD_LINK_PREVIEW_SUCCESS = 'LOAD_LINK_PREVIEW_SUCCESS';
export const LOAD_LINK_PREVIEW_FAILURE = 'LOAD_LINK_PREVIEW_FAILURE';

export const loadLinkPreview = (id: string) => ({
    type: LOAD_LINK_PREVIEW,
    payload: {
        id
    }
});

export const loadLinkPreviewSuccess = (id: string, data: object) => ({
    type: LOAD_LINK_PREVIEW_SUCCESS,
    payload: {
        id,
        ...data
    }
});

export const loadLinkPreviewFailure = (id: string, error: object) => ({
    type: LOAD_LINK_PREVIEW_FAILURE,
    payload: {
        id,
        error
    }
});
