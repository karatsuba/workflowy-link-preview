import ReduxMutationObserver from './ReduxMutationObserver';
import { OBSERVE_MUTATIONS, IGNORE_MUTATIONS } from '../../common/actions/types';

import { Middleware, MiddlewareAPI, Action } from 'redux';

const createMiddleware = (): Middleware => {
    const reduxMutationObserver = new ReduxMutationObserver();

    return (store: MiddlewareAPI) => next => (action: Action) => {
        if (action.type === OBSERVE_MUTATIONS) {
            reduxMutationObserver.observe(store);
        }

        if (action.type === IGNORE_MUTATIONS) {
            reduxMutationObserver.disconnect();
        }

        return next(action);
    };
};

export default createMiddleware();
