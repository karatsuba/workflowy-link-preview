import { MiddlewareAPI, Middleware } from 'redux';
import { MUTATION_RECORD } from 'redux-dom-mutation-observer';

import { Handler } from './handlers/Handler';
import { NodeMovedUpDownHandler } from './handlers/NodeMovedUpDownHandler';
import { NodeAddedHandler } from './handlers/NodeAddedHandler';
import { NodeBulletClickHandler } from './handlers/NodeBulletClickHandler';
import { NodeCollapsedHandler } from './handlers/NodeCollapsedHandler';
import { NodeDraggedHandler } from './handlers/NodeDraggedHandler';
import { NodeEditedHandler } from './handlers/NodeEditedHandler';

const setupHandlers = (): Handler => {
    const handler = new NodeMovedUpDownHandler();
    handler
        .setNext(new NodeAddedHandler())
        .setNext(new NodeBulletClickHandler())
        .setNext(new NodeCollapsedHandler())
        .setNext(new NodeDraggedHandler())
        .setNext(new NodeEditedHandler());

    return handler;
};

const createMiddleware = (): Middleware => {
    const handlers = setupHandlers();

    return ({ dispatch }: MiddlewareAPI) => next => (action: any) => {
        if (action.type === MUTATION_RECORD) {
            handlers.handle(dispatch, action);
        }

        return next(action);
    };
};

export default createMiddleware();
