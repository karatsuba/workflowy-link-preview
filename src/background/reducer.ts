import {
    LINK_PREVIEW_REQUEST,
    LINK_PREVIEW_SUCCESS,
    LINK_PREVIEW_FAILURE
} from '../content/actions';

const initState = {
    links: {}
};

const reducer = (state = initState, action: any): any => {
    switch (action.type) {
        case 'ADD_LINK': {
            const links = action.payload.reduce((links: any, link: any) => {
                return {
                    [link.id]: link,
                    ...links
                }
            }, state.links);
            return { links };
        }

        case 'REMOVE_LINK': {
            const links = action.payload.reduce((links: any, id: any) => {
                return Object.keys(links)
                    .filter(linkId => linkId !== id)
                    .reduce((result, linkId) => {
                        result[linkId] = links[linkId];
                        return result;
                    }, {} as any);
            }, state.links);
            return { links };
        }

        case LINK_PREVIEW_REQUEST: {
            const { id } = action.payload;
            const link = (state.links as any)[id];
            return {
                links: {
                    ...state.links,
                    [link.id]: {
                        ...link,
                        isFetching: true
                    }
                }
            }
        }

        case LINK_PREVIEW_SUCCESS: {
            const { id, ...data } = action.payload;
            const link = (state.links as any)[id];
            return {
                links: {
                    ...state.links,
                    [link.id]: {
                        ...link,
                        ...data,
                        isFetching: false
                    }
                }
            }
        }
        default:
            return state;
    }
};

export default reducer;
