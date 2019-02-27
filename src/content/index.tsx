import { Links } from './models/Links';
import LinkObserver from './conteiners/LinkObserver';
import ReactDOM from 'react-dom';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import mutationObserver from './middleware';

const reducer = (state = { links: Links.create([]) }, action: any): any => {
    switch (action.type) {
        case 'NEW_LINK':
            return {
                links: Links.merge(state.links, action.payload)
            };
        default:
            return state;
    }
};

const store = createStore(reducer, applyMiddleware(thunk, mutationObserver, logger));


const initApp = () => {
    // put creatin logic inside main component
    const root = document.getElementById('app') as HTMLElement;
    const container = document.createElement('div');
    root.appendChild(container);
    ReactDOM.render(
        <Provider store={store}>
            <LinkObserver />
        </Provider>,
        container
    );
};

initApp();