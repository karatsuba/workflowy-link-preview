import { ADD_LINK } from '../../../common/actions/types';

export const addLink = (id: string, url: string) => ({
    type: ADD_LINK,
    payload: {
        id,
        url
    }
});
