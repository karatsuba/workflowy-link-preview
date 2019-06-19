import { createStore, applyMiddleware } from 'redux';
import { wrapStore, alias } from 'webext-redux';
import reducer from './reducer';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const LINK_PREVIEW_REQUEST = 'LINK_PREVIEW_REQUEST';
export const LINK_PREVIEW_SUCCESS = 'LINK_PREVIEW_SUCCESS';
export const LINK_PREVIEW_FAILURE = 'LINK_PREVIEW_FAILURE';

import { Parser } from './services/Parser';

const parser = Parser.create();

// TODO: move aliase to separate file
const aliases = {
    HTTP_REQUEST_ALIAS: (action: any) => (dispatch: any) => {
        const { url, id } = action.payload;
        // link request
        dispatch({
            type: LINK_PREVIEW_REQUEST,
            payload: {
                id
            }
        });

        parser
            .parseURL(url)
            .then(data =>
                dispatch({
                    type: LINK_PREVIEW_SUCCESS,
                    payload: {
                        id,
                        ...data
                    }
                })
            )
            .catch(error =>
                dispatch({
                    type: LINK_PREVIEW_SUCCESS,
                    payload: {
                        id,
                        error
                    }
                })
            );
    }
};

const store = createStore(
    reducer,
    undefined,
    applyMiddleware(alias(aliases), thunk, logger)
);

wrapStore(store);
