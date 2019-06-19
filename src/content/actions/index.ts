import { Action } from 'redux';
import { HTTP_ACTION } from '../../background/middleware/httpMiddleware';
import Link from '../models/Link';

export type ActionWithPayload<P> = Action & {
    payload: P;
};

// export type HttpRequestPayload = {
//     [HTTP_ACTION]: {
//         types: string[];
//         payload: LinkPreviewPayload;
//     };
// };

export type LinkPreviewPayload = Pick<Link, 'id' | 'url'>;

// export const loadLinkPreview = (
//     payload: LinkPreviewPayload
// ): ActionWithPayload<HttpRequestPayload> => ({
//     type: 'HTTP_REQUEST_ALIAS',
//     payload: {
//         [HTTP_ACTION]: {
//             types: [
//                 LINK_PREVIEW_REQUEST,
//                 LINK_PREVIEW_SUCCESS,
//                 LINK_PREVIEW_FAILURE
//             ],
//             payload
//         }
//     }
// });

export const loadLinkPreview = (
    id: string,
    url: string
): ActionWithPayload<LinkPreviewPayload> => ({
    type: 'HTTP_REQUEST_ALIAS',
    payload: {
        id,
        url
    }
});

export const observeMutations = (): Action => ({
    type: 'MUTATION_OBSERVER__OBSERVE'
});

export const cleanUpStore = (): Action => ({
    type: 'CLEAN_UP_STORE'
});
