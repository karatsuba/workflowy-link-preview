import {
    OBSERVE_MUTATIONS,
    IGNORE_MUTATIONS,
    RESET_STORE,
    CommonActions
} from '../../../common/actions/types';

type MutationsState = Readonly<{
    observing: boolean;
}>;

const initState: MutationsState = {
    observing: false
};

export default (state = initState, action: CommonActions): MutationsState => {
    switch (action.type) {
        case OBSERVE_MUTATIONS: {
            return {
                ...state,
                observing: true
            };
        }

        case IGNORE_MUTATIONS: {
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
