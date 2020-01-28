import { createStore, applyMiddleware } from 'redux';
import { wrapStore, alias } from 'webext-redux';
import thunk from 'redux-thunk';

import reducer from './reducers';
import aliases from './aliases';

const middleware = [alias(aliases), thunk];

// use logger only in development mode
if (process.env.NODE_ENV === 'development') {
    const logger = require('redux-logger').createLogger();
    middleware.push(logger);
}

const store = createStore(reducer, undefined, applyMiddleware(...middleware));

wrapStore(store);
