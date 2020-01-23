import { LinksState } from '../index';
import { LoadLinkPreviewSuccessAction } from '../../../../common/actions/types';

export default (state: LinksState, action: LoadLinkPreviewSuccessAction): LinksState => {
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
