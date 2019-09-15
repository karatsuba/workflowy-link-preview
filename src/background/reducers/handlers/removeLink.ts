import { State, LinksMap } from '../index';
import Link from '../../../common/models/Link';

export default (state: State, action: any) => {
    const { id: ids }: { id: string[] } = action.payload;
    const links = ids.reduce((links: any, id: any) => {
        return Object.keys(links)
            .filter(linkId => linkId !== id)
            .reduce(
                (result, linkId) => {
                    result[linkId] = links[linkId];
                    return result;
                },
                {} as any
            );
    }, state.links);
    return {
        ...state,
        links
    };
};
