import { AbstractHandler } from './AbstractHandler';
import * as utils from './utils';
import { removeLink } from '../actions';

export class NodeEditedHandler extends AbstractHandler {
    public handle(mutation: MutationRecord): void {
        // CONTENT DIV WAS EDITED
        if (
            this.anyContentLinkNodes(mutation.removedNodes) &&
            utils.targetHasClassName(mutation.target, 'content')
        ) {
            // GET LINK ID AND DISPATCH REMOVE ACTION
            const id = utils.findClosestProjectId(mutation.target as Element);
            if (id) {
                this.dispatch(removeLink([id]));
            }
        }

        super.handle(mutation);
    }

    private anyContentLinkNodes(nodes: NodeList) {
        return utils.anyMutations(nodes) && Array.from(nodes).some(this.isContentLink);
    }
}
