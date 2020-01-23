import { LinksState } from '../index';
import { LoadLinkPreviewRequestAction } from '../../../../common/actions/types';

export default (state: LinksState, action: LoadLinkPreviewRequestAction): LinksState => {
    const { id } = action.payload;
    const link = state.byId[id];

    const byId = {
        ...state.byId,
        [link.id]: {
            ...link,
            fetching: true
        }
    };

    return {
        ...state,
        byId
    };
};
