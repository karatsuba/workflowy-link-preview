import { Dispatch } from 'redux';
import parse from '../services/metatags-parser';
import Link from '../../common/models/Link';
import {
    loadLinkPreviewRequest,
    loadLinkPreviewSuccess,
    loadLinkPreviewFailure
} from '../../common/actions/link';
import { LoadLinkPreviewAction, LOAD_LINK_PREVIEW_ALIAS } from '../../common/actions/types';

const alias = (action: LoadLinkPreviewAction) => (dispatch: Dispatch): void => {
    const { url, id } = action.payload;

    dispatch(loadLinkPreviewRequest(id));

    parse(url)
        .then(({ title, description, imageUrl }) =>
            dispatch(loadLinkPreviewSuccess(new Link(id, url, title, description, imageUrl)))
        )
        .catch(({ message }) => dispatch(loadLinkPreviewFailure(new Link(id, url, message))));
};

export default {
    [LOAD_LINK_PREVIEW_ALIAS]: alias
};
