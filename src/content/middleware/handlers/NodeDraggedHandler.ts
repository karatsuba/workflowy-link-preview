import { Dispatch } from 'redux';
import { AbstractHandler } from './AbstractHandler';
import { removeLink } from '../../../common/actions/link';

export class NodeDraggedHandler extends AbstractHandler {
    public handle(dispatch: Dispatch, action: any): void {
        const { mutation } = action.payload;

        // CHILDREN NODE WAS MOVED (DELETED) WITH TAB OR DRAGGED BY MOUSE
        // CONTENT LINK NODE WERE COLLAPSED => DELETED
        if (
            this.anyMutations(mutation.removedNodes) &&
            this.targetHasClassName(mutation.target, 'children')
        ) {
            const ids = this.getContentLinksIds(mutation.removedNodes);
            ids.forEach(id => id && dispatch(removeLink(id)));
        }

        super.handle(dispatch, action);
    }
}
