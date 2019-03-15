import { Action, MiddlewareAPI, Dispatch } from 'redux';

export const HTTP_ACTION = 'HTTP ACTION';

let timeout: number | null = null;

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

    if(timeout) {
        clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
        console.log('API CALL MOCK FOR', payload);
        next({
            type: successType,
            payload: {
                ...payload,
                description: 'HELLO FROM REDUX'
            }
        })
    }, 2000);

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