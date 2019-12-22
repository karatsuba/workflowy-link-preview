import { State } from '../../reducers/index';
import { LoadLinkPreviewFailureAction } from '../../../common/actions/types';

export default (state: State, action: LoadLinkPreviewFailureAction) => {
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
