import { Action } from 'redux';
import Link from '../../common/models/Link';
import {
    LOAD_LINK_PREVIEW,
    LOAD_LINK_PREVIEW_SUCCESS,
    OBSERVE_MUTATIONS,
    IGNORE_MUTATIONS,
    CLEAN_UP_STORE,
    ADD_LINK,
    REMOVE_LINK
} from '../../common/actions/types';
import addLink from './handlers/addLink';

export type LinksMap = {
    [key: string]: Link;
};

export type State = {
    links: LinksMap;
    observingMutations: boolean;
};

const initState: State = {
    links: {},
    observingMutations: false
};

export default (state = initState, action: any): State => {
    switch (action.type) {
        case CLEAN_UP_STORE: {
            const { links = {} } = state;
            return Object.values(links).length > 0 ? initState : state;
        }

        case ADD_LINK: {
            return addLink(state, action);
        }

        case REMOVE_LINK: {
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
                        fetching: true
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
                        fetching: false
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
