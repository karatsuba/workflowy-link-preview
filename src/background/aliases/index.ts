import { Dispatch } from 'redux';
import parse from '../services/parse';
import {
    loadLinkPreview,
    loadLinkPreviewSuccess,
    loadLinkPreviewFailure
} from '../../common/actions/link';
import { LOAD_LINK_PREVIEW_ALIAS } from '../../common/actions/types';

const loadLinkPreviewAlias = (action: any) => (dispatch: Dispatch) => {
    const { url, id } = action.payload;

    dispatch(loadLinkPreview(id));

    parse(url)
        .then(data => dispatch(loadLinkPreviewSuccess(id, data)))
        .catch(error => dispatch(loadLinkPreviewFailure(id, error)));
};

export default {
    [LOAD_LINK_PREVIEW_ALIAS]: loadLinkPreviewAlias
};
