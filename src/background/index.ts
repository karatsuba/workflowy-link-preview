// import {Parser} from './services/Parser';
// Parser.create().parseURL('https://github.com/karatsuba').then(console.dir);
import {createStore, applyMiddleware} from 'redux';
import {wrapStore, alias} from 'webext-redux';
import reducer from './reducer';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import mutationObserver from './middleware';
import httpMiddleware from './middleware/httpMiddleware';

const aliases = {
    // this key is the name of the action to proxy, the value is the action
    // creator that gets executed when the proxied action is received in the
    // background
    'TEST_ALIAS': () => {
        console.log('HELLO FROM TEST ALIAS');
      // this call can only be made in the background script
    }
  };

const middleware = [alias(aliases), logger];

const store = createStore(reducer, {}, applyMiddleware(...middleware));

wrapStore(store);
