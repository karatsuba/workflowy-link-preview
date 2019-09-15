import { State, LinksMap } from '../index';
import Link from '../../../common/models/Link';
// import {add} from '../../../common/actions/link';

export default (state: State, action: any) => {
    const { id, url }: { id: string; url: string } = action.payload;
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
