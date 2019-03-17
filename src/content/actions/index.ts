import { HTTP_ACTION } from '../../background/middleware/httpMiddleware';

export const LINK_PREVIEW_REQUEST = 'LINK_PREVIEW_REQUEST';
export const LINK_PREVIEW_SUCCESS = 'LINK_PREVIEW_SUCCESS';
export const LINK_PREVIEW_FAILURE = 'LINK_PREVIEW_FAILURE';

const loadLinkPreview = (payload: any) => ({
    type: 'HTTP_REQUEST_ALIAS',
    payload: {
        [HTTP_ACTION]: {
            types: [
                LINK_PREVIEW_REQUEST,
                LINK_PREVIEW_SUCCESS,
                LINK_PREVIEW_FAILURE
            ],
            payload
        }
    }
});

const mutationsObserve = () => { 
    return {
        type: 'MUTATION_OBSERVER__OBSERVE'
    }
};

export default {
    loadLinkPreview,
    mutationsObserve
};
