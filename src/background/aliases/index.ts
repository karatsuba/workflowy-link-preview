import { Dispatch } from 'redux';
import parse from '../services/parse';
import {
    loadLinkPreviewRequest,
    loadLinkPreviewSuccess,
    loadLinkPreviewFailure,
    LinkPreviewPayload
} from '../../common/actions/link';
import { ActionWithPayload } from '../../common/actions';
import { LOAD_LINK_PREVIEW_ALIAS } from '../../common/actions/types';
import Link from '../../common/models/Link';

const alias = (action: ActionWithPayload<LinkPreviewPayload>) => (dispatch: Dispatch) => {
    const { url, id } = action.payload;

    dispatch(loadLinkPreviewRequest(id));

    parse(url)
        .then(({ title, description, imageUrl }) =>
            dispatch(loadLinkPreviewSuccess(new Link(id, url, title, description, imageUrl)))
        )
        .catch(({ message }: Error) =>
            dispatch(loadLinkPreviewFailure(new Link(id, url, message)))
        );
};

export default {
    [LOAD_LINK_PREVIEW_ALIAS]: alias
};
