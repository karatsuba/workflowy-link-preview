import Link from '../../common/models/Link';
import {
    LOAD_LINK_PREVIEW_REQUEST,
    LOAD_LINK_PREVIEW_SUCCESS,
    OBSERVE_MUTATIONS,
    IGNORE_MUTATIONS,
    CLEAN_UP_STORE,
    ADD_LINK,
    REMOVE_LINK,
    LOAD_LINK_PREVIEW_FAILURE,
    CommonActions
} from '../../common/actions/types';
import addLink from './handlers/addLink';
import removeLink from './handlers/removeLink';
import loadLinkPreviewRequest from './handlers/loadLinkPreviewRequest';
import loadLinkPreviewSuccess from './handlers/loadLinkPreviewSuccess';
import loadLinkPreviewFailure from './handlers/loadLinkPreviewFailure';

export type LinksMap = Readonly<{
    [key: string]: Link;
}>;

export type State = Readonly<{
    links: LinksMap;
    observingMutations: boolean;
}>;

const initState: State = {
    links: {},
    observingMutations: false
};

export default (state = initState, action: CommonActions): State => {
    switch (action.type) {
        case CLEAN_UP_STORE: {
            const { links = {} } = state;
            return Object.values(links).length > 0 ? initState : state;
        }

        case ADD_LINK: {
            return addLink(state, action);
        }

        case REMOVE_LINK: {
            return removeLink(state, action);
        }

        case LOAD_LINK_PREVIEW_REQUEST: {
            return loadLinkPreviewRequest(state, action);
        }

        case LOAD_LINK_PREVIEW_SUCCESS: {
            return loadLinkPreviewSuccess(state, action);
        }

        case LOAD_LINK_PREVIEW_FAILURE: {
            return loadLinkPreviewFailure(state, action);
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
