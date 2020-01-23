import { LinksState } from '../index';
import { RemoveLinkAction } from '../../../../common/actions/types';

export default (state: LinksState, action: RemoveLinkAction): LinksState => {
    const { id } = action.payload;

    const { [id]: value, ...byId } = state.byId;
    const allIds = state.allIds.filter(i => i !== id);

    return {
        byId,
        allIds
    };
};
