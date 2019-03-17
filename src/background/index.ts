// import {Parser} from './services/Parser';
// Parser.create().parseURL('https://github.com/karatsuba').then(console.dir);
import {createStore, applyMiddleware} from 'redux';
import {wrapStore, alias} from 'webext-redux';
import reducer from './reducer';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
// import mutationObserver from '../content/middleware';
import httpMiddleware from './middleware/httpMiddleware';

// TODO: hook http alias action here
const aliases = {
    // this key is the name of the action to proxy, the value is the action
    // creator that gets executed when the proxied action is received in the
    // 'MUTATION_OBSERVER__OBSERVE' : (action: any) => {
    //     // console.log('MUTATION_OBSERVER__OBSERVE', action);
    //     return (dispatch: any) => {
    //         // console.log('I DONT WANT TO DISPATCH ANYTHING');
    //         // return
    //         // dispatch({
    //         //     type: 'ALIAS@MUTATION_OBSERVER__OBSERVE'
    //         // })
    //     };
    // }
};

const middleware = [alias(aliases), logger, thunk];

const store = createStore(reducer, undefined, applyMiddleware(...middleware));

wrapStore(store, {
    // serializer: (payload: any) => {
    //     console.log('PAYLOAD', payload);
    //     return payload;
    // }
});
