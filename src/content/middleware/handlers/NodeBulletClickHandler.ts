import { Dispatch } from 'redux';
import { AbstractHandler } from './AbstractHandler';
import { removeLink } from '../../../common/actions/link';

export class NodeBulletClickHandler extends AbstractHandler {
    public handle(dispatch: Dispatch, action: any): void {
        const { mutation } = action.payload;

        // CONTENT LINK NODE WERE COLLAPSED => DELETED
        if (
            this.anyMutations(mutation.removedNodes) &&
            this.targetHasClassName(mutation.target, 'page')
        ) {
            const ids = this.getContentLinksIds(mutation.removedNodes);
            ids.forEach(id => id && dispatch(removeLink(id)));
        }

        super.handle(dispatch, action);
    }
}
