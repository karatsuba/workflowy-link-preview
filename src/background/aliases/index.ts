import { Action, Dispatch } from 'redux';
import { Parser } from '../services/Parser';
import {
    loadLinkPreview,
    loadLinkPreviewSuccess,
    loadLinkPreviewFailure
} from '../../common/actions/link';
import { LOAD_LINK_PREVIEW_ALIAS } from '../../common/actions/types';

const parser = Parser.create();

const loadLinkPreviewAlias = (action: any) => (dispatch: Dispatch) => {
    const { url, id } = action.payload;

    dispatch(loadLinkPreview(id));
    parser
        .parseURL(url)
        .then(data => dispatch(loadLinkPreviewSuccess(id, data)))
        .catch(error => dispatch(loadLinkPreviewFailure(id, error)));
};

export default {
    [LOAD_LINK_PREVIEW_ALIAS]: loadLinkPreviewAlias
};
