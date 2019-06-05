import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import LinkObserver from './conteiners/LinkObserver';
import store from './store';

const cleanUp = ({ state, dispatch }: any) => {
    const { links } = state;
    if (links && Object.values(links).length > 0) {
        return dispatch({
            type: 'CLEAR_LINKS'
        });
    }
};

const initApp = (store: any) => {
    ReactDOM.render(
        <Provider store={store}>
            <LinkObserver />
        </Provider>,
        document.createElement('div')
    );
};

store
    .ready()
    .then(() => cleanUp(store))
    .then(() => initApp(store));
