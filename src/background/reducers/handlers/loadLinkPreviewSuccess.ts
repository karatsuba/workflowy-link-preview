import { State } from '../../reducers/index';
import { ActionWithPayload } from '../../../common/actions/';
import Link from '../../../common/models/Link';

export default (state: State, action: ActionWithPayload<{ link: Link }>) => {
    const { link } = action.payload;
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
