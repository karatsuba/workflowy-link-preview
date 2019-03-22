import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import LinkObserver from './conteiners/LinkObserver';
import store from './store';

store.ready().then(() => {
    initApp(store);
});

const initApp = (store: any) => {
    ReactDOM.render(
        <Provider store={store}>
            <LinkObserver />
        </Provider>,
        document.createElement('div')
    );
};