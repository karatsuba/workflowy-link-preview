import ReduxMutationObserver from './ReduxMutationObserver';

import { Middleware, MiddlewareAPI, Action } from 'redux';

const createMiddleware = (): Middleware => {
    const reduxMutationObserver = new ReduxMutationObserver();

    return (store: MiddlewareAPI) => next => (action: Action) => {
        // const handler = getHandler(reduxWebsocket, action.type);
        // handler(store, action);
        if(action.type == 'MUTATION_OBSERVER__OBSERVE') {
            // console.log('GOING TO OBSERVE MUTATITIONS');
            reduxMutationObserver.observe(store)
        }

        return next(action);
    };
};

export default createMiddleware();
