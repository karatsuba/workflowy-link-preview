import { AbstractHandler } from './AbstractHandler';
import { removeLink } from '../actions';

export class NodeCollapsedHandler extends AbstractHandler {
    public handle(mutation: MutationRecord): void {
        // CONTENT LINK NODE WERE COLLAPSED => DELETED
        if (
            this.anyMutations(mutation.removedNodes) &&
            this.targetHasClassName(mutation.target, 'project')
        ) {
            const ids = this.getContentLinksIds(mutation.removedNodes);
            ids.forEach(id => id && this.dispatch(removeLink(id)));
        }

        super.handle(mutation);
    }
}
