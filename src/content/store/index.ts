import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducer';
import mutationObserver from '../middleware';
import httpMiddleware from '../middleware/httpMiddleware';

const store = createStore(
    reducer,
    applyMiddleware(thunk, mutationObserver, httpMiddleware, logger)
);

export default store;
