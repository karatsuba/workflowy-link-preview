import { OBSERVE, DISCONNECT } from 'redux-dom-mutation-observer';
import { RESET_STORE, CommonActions } from '../../../common/actions/types';

type MutationsState = Readonly<{
    observing: boolean;
}>;

const initState: MutationsState = {
    observing: false
};

export default (state = initState, action: CommonActions): MutationsState => {
    switch (action.type) {
        case OBSERVE: {
            return {
                ...state,
                observing: true
            };
        }

        case DISCONNECT: {
            return {
                ...state,
                observing: false
            };
        }

        case RESET_STORE: {
            return {
                ...state,
                observing: false
            };
        }

        default:
            return state;
    }
};
