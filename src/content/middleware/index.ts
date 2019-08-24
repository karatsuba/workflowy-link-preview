import ReduxMutationObserver from './ReduxMutationObserver';
import {
    OBSERVE_MUTATIONS,
    IGNORE_MUTATIONS
} from '../../common/actions/types';

import { Middleware, MiddlewareAPI, Action } from 'redux';

const createMiddleware = (): Middleware => {
    const reduxMutationObserver = new ReduxMutationObserver();

    return (store: MiddlewareAPI) => next => (action: Action) => {
        // const handler = getHandler(reduxWebsocket, action.type);
        if (action.type === OBSERVE_MUTATIONS) {
            // console.log('GOING TO OBSERVE MUTATITIONS');
            reduxMutationObserver.observe(store);
        }

        if (action.type === IGNORE_MUTATIONS) {
            // console.log('MUTATION_OBSERVER__DISCONNECT');
            reduxMutationObserver.disconnect();
        }

        return next(action);
    };
};

export default createMiddleware();
