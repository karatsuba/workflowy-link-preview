import { createSelector } from 'reselect';
import { State } from '../../background/reducers';

const linksIdsSelector = (state: State) => state.links.allIds;

const linkByIdSelector = (state: State, id: string) => state.links.byId[id];

export const getLinksIds = createSelector(
    [linksIdsSelector],
    ids => ids
);

export const getLinkById = createSelector(
    [linkByIdSelector],
    link => link
);
