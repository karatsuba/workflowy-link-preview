// import {Parser} from './services/Parser';
// Parser.create().parseURL('https://github.com/karatsuba').then(console.dir);

import {createStore} from 'redux';
import reducer from './reducer';
// import rootReducer from './reducers';

import {wrapStore} from 'webext-redux';

// const reducer = (state: any, action: any) => {
//     console.log('REDUCER REACTS FROM BACKGROUND');
//     return state;
// }

const store = createStore(reducer, {});

wrapStore(store, {
    serializer: (payload: any) => {
        console.log(payload);
        return payload;
    }
});
