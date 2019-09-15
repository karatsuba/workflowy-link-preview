import { ADD_LINK, REMOVE_LINK } from '../../../common/actions/types';

export const addLink = (id: string, url: string) => ({
    type: ADD_LINK,
    payload: {
        id,
        url
    }
});

export const removeLink = (id: string) => ({
    type: REMOVE_LINK,
    payload: {
        id
    }
});
