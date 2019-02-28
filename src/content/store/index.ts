import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducer';
import mutationObserver from '../middleware';

const store = createStore(
    reducer,
    applyMiddleware(thunk, mutationObserver, logger)
);

export default store;
