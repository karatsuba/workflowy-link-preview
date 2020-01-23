import { State } from '../../reducers/index';
import { LoadLinkPreviewSuccessAction } from '../../../common/actions/types';

export default (state: State, action: LoadLinkPreviewSuccessAction) => {
    const link = action.payload;

    const byId = {
        ...state.links.byId,
        [link.id]: {
            ...link,
            fetching: false
        }
    };

    return {
        ...state,
        links: {
            ...state.links,
            byId
        }
    };
};
