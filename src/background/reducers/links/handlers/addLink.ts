import { LinksState } from '../index';
import Link from '../../../../common/models/Link';
import { AddLinkAction } from '../../../../common/actions/types';

export default (state: LinksState, action: AddLinkAction): LinksState => {
    const { id, url } = action.payload;
    const link = state.byId[id];

    if (link) return state;

    const allIds = [...state.allIds, id];
    const byId = {
        ...state.byId,
        [id]: new Link(id, url)
    };

    return {
        byId,
        allIds
    };
};
