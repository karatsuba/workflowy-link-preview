import { LinksState } from '../index';
import { LoadLinkPreviewFailureAction } from '../../../../common/actions/types';

export default (state: LinksState, action: LoadLinkPreviewFailureAction): LinksState => {
    const link = action.payload;

    const byId = {
        ...state.byId,
        [link.id]: {
            ...link,
            fetching: false
        }
    };

    return {
        ...state,
        byId
    };
};
