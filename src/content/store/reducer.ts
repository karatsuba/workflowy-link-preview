import { Links } from '../models/Links';

const reducer = (state = { links: Links.create([]) }, action: any): any => {
    switch (action.type) {
        case 'ADD_LINK':
            return {
                links: Links.merge(state.links, action.payload)
            };
        case 'REMOVE_LINK':
            return {
                links: state.links.remove(action.payload)
            }
        default:
            return state;
    }
};

export default reducer;