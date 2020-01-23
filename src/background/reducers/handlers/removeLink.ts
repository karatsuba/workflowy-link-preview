import { State } from '../index';
import { RemoveLinkAction } from '../../../common/actions/types';

export default (state: State, action: RemoveLinkAction) => {
    const { id } = action.payload;

    const { [id]: value, ...byId } = state.links.byId;
    const allIds = state.links.allIds.filter(i => i !== id);

    return {
        ...state,
        links: {
            byId,
            allIds
        }
    };
};
