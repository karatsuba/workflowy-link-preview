import { State, LinksMap } from '../index';

export default (state: State, action: any) => {
    const { id }: { id: string } = action.payload;

    const entries = Object.entries(state.links).filter(([linkId]) => linkId !== id);

    return {
        ...state,
        links: Object.fromEntries(entries)
    };
};
