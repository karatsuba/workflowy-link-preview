import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'webext-redux';
import store from './store';
import { resetStore } from '../common/actions/index';
import LinkPreviewer from './conteiners/LinkPreviewer';

const resetBackgroundPageStore = ({ dispatch }: Store) => () => dispatch(resetStore());

const initReactApp = (store: Store) => () => {
    ReactDOM.render(
        <Provider store={store}>
            <LinkPreviewer />
        </Provider>,
        document.createElement('div')
    );
};

store
    .ready()
    .then(resetBackgroundPageStore(store))
    .then(initReactApp(store));
