import { createStore, applyMiddleware } from 'redux';
import { wrapStore, alias } from 'webext-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducer from './reducers';
import * as aliases from './actions/aliases';

const store = createStore(
    reducer,
    undefined,
    applyMiddleware(alias(aliases), thunk, logger)
);

wrapStore(store);
