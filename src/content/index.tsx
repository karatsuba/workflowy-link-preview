import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'webext-redux';
import store from './store';
import { cleanUpStore } from './actions/index';
import LinkPreviewer from './conteiners/LinkPreviewer';

const cleanUpBackgroundStore = ({ dispatch }: Store) => () =>
    dispatch(cleanUpStore());

const initReactApp = (store: Store) => () => {
    return ReactDOM.render(
        <Provider store={store}>
            <LinkPreviewer />
        </Provider>,
        document.createElement('div')
    );
};

store
    .ready()
    .then(cleanUpBackgroundStore(store))
    .then(initReactApp(store));
