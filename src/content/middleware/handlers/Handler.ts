import { Action, Dispatch } from 'redux';

export interface Handler {
    setNext(handler: Handler): Handler;
    handle(dispatch: Dispatch, action: Action): void;
}
