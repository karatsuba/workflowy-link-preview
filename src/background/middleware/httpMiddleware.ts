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

    // parser.parseURL(payload.href).then(console.dir);

    // fetch(actionInfo.endpoint, fetchOptions)
    //     .then(response => response.json())
    //     .then(data => next({
    //         type: actionInfo.type + "_RECEIVED",
    //         payload: data
    //     }))
    //     .catch(error => next({
    //         type: actionInfo.type + "_FAILED",
    //         payload: error
    //     }));
}

export default httpMiddleware;