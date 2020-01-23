import { State } from '../index';
import Link from '../../../common/models/Link';
import { AddLinkAction } from '../../../common/actions/types';

export default (state: State, action: AddLinkAction) => {
    const { id, url } = action.payload;
    const link = state.links.byId[id];

    if (link) return state;

    const allIds = [...state.links.allIds, id];
    const byId = {
        ...state.links.byId,
        [id]: new Link(id, url)
    };

    return {
        ...state,
        links: {
            byId,
            allIds
        }
    };
};
