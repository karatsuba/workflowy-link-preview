import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import LinkPreviewer from './conteiners/LinkPreviewer';
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
            <LinkPreviewer />
        </Provider>,
        document.createElement('div')
    );
};

store
    .ready()
    .then(() => cleanUp(store))
    .then(() => initApp(store));
