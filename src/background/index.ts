import { createStore, applyMiddleware } from 'redux';
import { wrapStore, alias } from 'webext-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducer from './reducers';
import aliases from './aliases';

// TODO: remove logger in prod mode
const store = createStore(
    reducer,
    undefined,
    applyMiddleware(alias(aliases), thunk, logger)
);

wrapStore(store);
