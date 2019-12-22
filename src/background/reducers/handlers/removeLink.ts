import { State } from '../index';
import { RemoveLinkAction } from '../../../common/actions/types';

export default (state: State, action: RemoveLinkAction) => {
    const { id } = action.payload;

    const entries = Object.entries(state.links).filter(([linkId]) => linkId !== id);

    return {
        ...state,
        links: Object.fromEntries(entries)
    };
};
