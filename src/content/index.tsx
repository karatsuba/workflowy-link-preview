import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import LinkObserver from './conteiners/LinkObserver';
import store from './store';


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