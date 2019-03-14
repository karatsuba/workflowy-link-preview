import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Store, applyMiddleware } from 'webext-redux';
import mutationObserver from '../middleware';
import httpMiddleware from '../middleware/httpMiddleware';

const store = new Store();
const middleware = [thunk, mutationObserver, httpMiddleware, logger];
const storeWithMiddleware = applyMiddleware(store, ...middleware);

export default storeWithMiddleware;
