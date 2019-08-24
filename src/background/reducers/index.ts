import {
    LOAD_LINK_PREVIEW,
    LOAD_LINK_PREVIEW_SUCCESS,
    OBSERVE_MUTATIONS,
    IGNORE_MUTATIONS,
    CLEAN_UP_STORE
} from '../../common/actions/types';

const initState = {
    links: {},
    observingMutations: false
};

const reducer = (state = initState, action: any): any => {
    switch (action.type) {
        case CLEAN_UP_STORE: {
            const { links = {} } = state;
            return Object.values(links).length > 0 ? initState : state;
        }

        case 'ADD_LINK': {
            const links = action.payload.reduce((links: any, link: any) => {
                return {
                    [link.id]: link,
                    ...links
                };
            }, state.links);
            return {
                ...state,
                links
            };
        }

        case 'REMOVE_LINK': {
            const links = action.payload.reduce((links: any, id: any) => {
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
        }

        case LOAD_LINK_PREVIEW: {
            const { id } = action.payload;
            const link = (state.links as any)[id];
            return {
                ...state,
                links: {
                    ...state.links,
                    [link.id]: {
                        ...link,
                        isFetching: true
                    }
                }
            };
        }

        case LOAD_LINK_PREVIEW_SUCCESS: {
            const { id, ...data } = action.payload;
            const link = (state.links as any)[id];
            return {
                ...state,
                links: {
                    ...state.links,
                    [link.id]: {
                        ...link,
                        ...data,
                        isFetching: false
                    }
                }
            };
        }

        case OBSERVE_MUTATIONS: {
            return {
                ...state,
                observingMutations: true
            };
        }

        case IGNORE_MUTATIONS: {
            return {
                ...state,
                observingMutations: false
            };
        }

        default:
            return state;
    }
};

export default reducer;
