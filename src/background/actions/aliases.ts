import { Action, Dispatch } from 'redux';
import * as actions from './actionsCreators';
import { Parser } from '../services/Parser';

const parser = Parser.create();

export const HTTP_REQUEST_ALIAS = (action: any) => (dispatch: Dispatch) => {
    const { url, id } = action.payload;

    dispatch(actions.loadLinkPreview(id));
    parser
        .parseURL(url)
        .then(data => dispatch(actions.loadLinkPreviewSuccess(id, data)))
        .catch(error => dispatch(actions.loadLinkPreviewFailure(id, error)));
};
