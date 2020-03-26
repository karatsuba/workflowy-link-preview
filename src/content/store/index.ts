import { Store, applyMiddleware } from 'webext-redux';
import mutationHandlerMiddleware from '../middleware';
import createMiddleware from 'redux-dom-mutation-observer';

const ReduxDOMMutationObserver = createMiddleware();

const store = new Store();

export default applyMiddleware(store, ReduxDOMMutationObserver, mutationHandlerMiddleware);
