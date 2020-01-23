import { combineReducers } from 'redux';
import linksReducer from './links';
import mutationsReducer from './mutations';

const rootReducer = combineReducers({
    links: linksReducer,
    mutations: mutationsReducer
});

export type State = Readonly<ReturnType<typeof rootReducer>>;

export default rootReducer;
