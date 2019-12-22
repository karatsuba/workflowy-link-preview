import { State, LinksMap } from '../index';
import Link from '../../../common/models/Link';
import { AddLinkAction } from '../../../common/actions/types';

export default (state: State, action: AddLinkAction) => {
    const { id, url } = action.payload;
    const links: LinksMap = Object.keys(state.links).includes(id)
        ? state.links
        : {
              ...state.links,
              [id]: new Link(id, url)
          };

    return {
        ...state,
        links
    };
};
