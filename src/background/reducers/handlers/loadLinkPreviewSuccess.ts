import { State } from '../../reducers/index';
import { LoadLinkPreviewSuccessAction } from '../../../common/actions/types';

export default (state: State, action: LoadLinkPreviewSuccessAction) => {
    const link = action.payload;
    const links = {
        ...state.links,
        [link.id]: {
            ...link,
            fetching: false
        }
    };

    return {
        ...state,
        links
    };
};
