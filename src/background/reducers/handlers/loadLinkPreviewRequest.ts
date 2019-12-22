import { State } from '../../reducers/index';
import { LoadLinkPreviewRequestAction } from '../../../common/actions/types';

export default (state: State, action: LoadLinkPreviewRequestAction) => {
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
