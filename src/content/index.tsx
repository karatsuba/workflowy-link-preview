import { Links } from './models/Links';
import LinkObserver from './conteiners/LinkObserver';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';

import { Observer } from './services/Observer';

const reducer = (state = { links: Links.create([]) }, action: any): any => {
    console.log('ACTION', action);
    switch (action.type) {
        case 'NEW_LINK':
            return {
                links: Links.merge(state.links, action.payload)
            };
        default:
            return state;
    }
};

const store = createStore(reducer, applyMiddleware(thunk, logger));

// consider putting observer into LinkObserver
const observer: Observer = Observer.init();

const initApp = () => {
    // put creatin logic inside main component
    const root = document.getElementById('app') as HTMLElement;
    const container = document.createElement('div');
    root.appendChild(container);
    ReactDOM.render(
        <Provider store={store}>
            <LinkObserver observer={observer.withDispatch(store.dispatch)} />
        </Provider>,
        container
    );
};

initApp();

const createPreviewButtonNode = (target: any) => {
    // if (target.nextSibling && target.nextSibling.tagName !== 'SPAN') {
    console.log('GOING TO INSERT NODE', target);
    // const span = document.createElement("span");
    // target.parentNode.insertBefore(span, target.nextSibling);
    // }
};
