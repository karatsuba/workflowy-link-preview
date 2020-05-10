import { Store, applyMiddleware } from 'webext-redux';
import createMiddleware from 'redux-dom-mutation-observer';
import mutationHandlerMiddleware from '../middleware';

const reduxDOMMutationObserver = createMiddleware();

const store = new Store();

export default applyMiddleware(store, reduxDOMMutationObserver, mutationHandlerMiddleware);
