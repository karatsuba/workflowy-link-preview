import { Dispatch } from 'redux';
import { NodeMovedUpDownHandler } from './handlers/NodeMovedUpDownHandler';
import { NodeAddedHandler } from './handlers/NodeAddedHandler';
import { NodeBulletClickHandler } from './handlers/NodeBulletClickHandler';
import { NodeCollapsedHandler } from './handlers/NodeCollapsedHandler';
import { NodeDraggedHandler } from './handlers/NodeDraggedHandler';
import { NodeEditedHandler } from './handlers/NodeEditedHandler';

const configureHandler = (dispatch: Dispatch) => {
    const handler = new NodeMovedUpDownHandler(dispatch);
    handler
        .setNext(new NodeAddedHandler(dispatch))
        .setNext(new NodeBulletClickHandler(dispatch))
        .setNext(new NodeCollapsedHandler(dispatch))
        .setNext(new NodeDraggedHandler(dispatch))
        .setNext(new NodeEditedHandler(dispatch));
    return handler;
};

export default (dispatch: Dispatch) => {
    const handler = configureHandler(dispatch);
    // MUTATION CASES:
    // case with moving up/down
    // tree travesting with click and "<" ">" buttons
    // case edit
    // case with open/close
    // case with tab
    // case with drag
    const observer = new MutationObserver((mutations: MutationRecord[]) => {
        mutations.forEach(mutation => handler.handle(mutation));
    });

    return observer;
};
