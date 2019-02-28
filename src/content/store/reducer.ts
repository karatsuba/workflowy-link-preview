import { Links } from '../models/Links';

const reducer = (state = { links: Links.create([]) }, action: any): any => {
    switch (action.type) {
        case 'NEW_LINK':
            return {
                links: Links.merge(state.links, action.payload)
            };
        default:
            return state;
    }
};

export default reducer;