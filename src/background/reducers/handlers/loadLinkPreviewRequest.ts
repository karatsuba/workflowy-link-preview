import { State } from '../../reducers/index';
import { ActionWithPayload } from '../../../common/actions/';
import { LinkPreviewRequestPayload } from '../../../common/actions/link';

export default (state: State, action: ActionWithPayload<LinkPreviewRequestPayload>) => {
    const { id } = action.payload;
    const link = state.links[id];
    const links = {
        ...state.links,
        [link.id]: {
            ...link,
            fetching: true
        }
    };
    return {
        ...state,
        links
    };
};
