import { HTTP_ACTION } from '../middleware/httpMiddleware';

export const LINK_PREVIEW_REQUEST = 'LINK_PREVIEW_REQUEST';
export const LINK_PREVIEW_SUCCESS = 'LINK_PREVIEW_SUCCESS';
export const LINK_PREVIEW_FAILURE = 'LINK_PREVIEW_FAILURE';

const fetchLinkPreview = (payload: any) => ({
    [HTTP_ACTION]: {
        types: [
            LINK_PREVIEW_REQUEST,
            LINK_PREVIEW_SUCCESS,
            LINK_PREVIEW_FAILURE
        ],
        payload
    }
});

export const loadLinkPreview = (payload: any) => (dispatch: any) => {
    console.log('loadLinkPreview ACTION');
    return dispatch(fetchLinkPreview(payload));
};


export const mutationsObserve = () => (dispatch: any) => {
    return dispatch({
        type: 'MUTATION_OBSERVER__OBSERVE'
    });
};
