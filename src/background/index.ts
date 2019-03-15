// import {Parser} from './services/Parser';
// Parser.create().parseURL('https://github.com/karatsuba').then(console.dir);
import {createStore, applyMiddleware} from 'redux';
import {wrapStore} from 'webext-redux';
import reducer from './reducer';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import mutationObserver from './middleware';
import httpMiddleware from './middleware/httpMiddleware';

const middleware = [logger];

const store = createStore(reducer, {}, applyMiddleware(...middleware));

wrapStore(store);
