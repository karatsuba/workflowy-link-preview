import { Links } from './models/Links';
import {
    LINK_PREVIEW_REQUEST,
    LINK_PREVIEW_SUCCESS,
    LINK_PREVIEW_FAILURE
} from '../content/actions';

const initState = {
    links: {}
};

const reducer = (state = initState, action: any): any => {
    switch (action.type) {
        case 'ADD_LINK':
            const links = action.payload.reduce((links: any, link: any) => {
                return {
                    [link.id]: link,
                    ...links
                }
            }, state.links);
            return { links };
        case 'REMOVE_LINK':
            return {
                // links: state.links.remove(action.payload)
            };
        // case LINK_PREVIEW_REQUEST:            
        //     const selectedId = action.payload.id;
        //     const links = [...state.links.getLinks()].map(([id, link]) => {
        //         if (selectedId === id) {
        //             link.setDescription(action.payload.description);
        //         }
        //         return link;
        //     }).reduce((result, link) => {
        //         return result.setLink(link);
        //     }, Links.create([]));
        //     return {
        //         links
        //     }
        // case LINK_PREVIEW_SUCCESS:
        //     const _selectedId = action.payload.id;
        //     const _links = [...state.links.getLinks()].map(([id, link]) => {
        //         if (_selectedId === id) {
        //             link.setDescription(action.payload.description);
        //         }
        //         return link;
        //     }).reduce((result, link) => {
        //         return result.setLink(link);
        //     }, Links.create([]));
        //     return {
        //         links: _links
        //     }
        default:
            return state;
    }
};

export default reducer;
