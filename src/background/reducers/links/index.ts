import Link from '../../../common/models/Link';
import {
    LOAD_LINK_PREVIEW_REQUEST,
    LOAD_LINK_PREVIEW_SUCCESS,
    RESET_STORE,
    ADD_LINK,
    REMOVE_LINK,
    LOAD_LINK_PREVIEW_FAILURE,
    CommonActions
} from '../../../common/actions/types';
import addLink from './handlers/addLink';
import removeLink from './handlers/removeLink';
import loadLinkPreviewRequest from './handlers/loadLinkPreviewRequest';
import loadLinkPreviewSuccess from './handlers/loadLinkPreviewSuccess';
import loadLinkPreviewFailure from './handlers/loadLinkPreviewFailure';

type LinksMap = Readonly<{
    [key: string]: Link;
}>;

export type LinksState = Readonly<{
    byId: LinksMap;
    allIds: string[];
}>;

const initState: LinksState = {
    byId: {},
    allIds: []
};

export default (state = initState, action: CommonActions): LinksState => {
    switch (action.type) {
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

        case RESET_STORE: {
            return initState;
        }

        default:
            return state;
    }
};
