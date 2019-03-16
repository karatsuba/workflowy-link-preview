import { Store, applyMiddleware } from 'webext-redux';
import mutationObserver from '../middleware';

const store = new Store();

export default applyMiddleware(store, mutationObserver);

