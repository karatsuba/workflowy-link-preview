import { Action, MiddlewareAPI, Dispatch } from 'redux';
import { Parser}  from '../services/Parser';

export const HTTP_ACTION = 'HTTP ACTION';

const parser = Parser.create();

const httpMiddleware = (store: MiddlewareAPI) => (next:Dispatch) => (action: any) => {
    if (!action[HTTP_ACTION]) {
        return next(action);
    }

    const {types, payload } = action[HTTP_ACTION];

    const [ requestType, successType, failureType ] = types
    
    next({
        type: requestType,
        payload: {
            ...payload,
            description: 'LOADING...'
        }
    });

    parser.parseURL(payload.href)
        .then(data => {
            return next({
                type: successType,
                payload: {
                    ...data
                }
            });
        })
        .catch(error => {
            return next({
                type: failureType,
                payload: {
                    ...error
                }
            });
        })
}

export default httpMiddleware;