import {
    LOAD_LINK_PREVIEW,
    LOAD_LINK_PREVIEW_SUCCESS,
    LOAD_LINK_PREVIEW_FAILURE
} from '../actions/actionsCreators';

const initState = {
    links: {},
    observingMutations: false
};

const reducer = (state = initState, action: any): any => {
    switch (action.type) {
        case 'CLEAN_UP_STORE': {
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

        case 'MUTATION_OBSERVER__OBSERVE': {
            const { observingMutations } = state;
            return {
                ...state,
                observingMutations: observingMutations
                    ? observingMutations
                    : !observingMutations
            };
        }

        case 'MUTATION_OBSERVER__TOGGLE': {
            const { observingMutations } = state;
            return {
                ...state,
                observingMutations: !observingMutations
            };
        }

        default:
            return state;
    }
};

export default reducer;
