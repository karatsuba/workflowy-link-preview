import {createStore, applyMiddleware} from 'redux';
import {wrapStore, alias} from 'webext-redux';
import reducer from './reducer';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import httpMiddleware from './middleware/httpMiddleware';

const aliases = {
    'HTTP_REQUEST_ALIAS': (action: any) => {
        return (dispatch:any) => {
            dispatch(action.payload);
        }
    }
};

const middleware = [alias(aliases), thunk, httpMiddleware, logger];

const store = createStore(reducer, {}, applyMiddleware(...middleware));

wrapStore(store);
