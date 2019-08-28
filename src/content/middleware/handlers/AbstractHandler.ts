import { Dispatch, Action } from 'redux';
import { Handler } from './Handler';

export abstract class AbstractHandler implements Handler {
    private nextHandler!: Handler;
    public dispatch: Dispatch;

    constructor(dispatch: Dispatch) {
        this.dispatch = dispatch;
    }

    public setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return this;
    }

    public handle(mutation: MutationRecord): void {
        if (this.nextHandler) {
            this.nextHandler.handle(mutation);
        }
    }
}
