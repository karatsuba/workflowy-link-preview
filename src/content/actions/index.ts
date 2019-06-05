import { HTTP_ACTION } from '../../background/middleware/httpMiddleware';

export const LINK_PREVIEW_REQUEST = 'LINK_PREVIEW_REQUEST';
export const LINK_PREVIEW_SUCCESS = 'LINK_PREVIEW_SUCCESS';
export const LINK_PREVIEW_FAILURE = 'LINK_PREVIEW_FAILURE';

export const loadLinkPreview = (payload: any) => ({
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

export const mutationsObserve = () => {
    return {
        type: 'MUTATION_OBSERVER__OBSERVE'
    };
};

export const mutationsDisconnect = () => {
    return {
        type: 'MUTATION_OBSERVER__DISCONNECT'
    };
};
