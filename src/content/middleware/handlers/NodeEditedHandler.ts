import { AbstractHandler } from './AbstractHandler';
import * as utils from './utils';
import { removeLink } from '../actions';

export class NodeEditedHandler extends AbstractHandler {
    public handle(mutation: MutationRecord): void {
        // CONTENT DIV WAS EDITED
        if (
            this.anyContentLinkNodes(mutation.removedNodes) &&
            this.targetHasNotAnyContentLinkNodes(mutation.target)
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

    private targetHasNotAnyContentLinkNodes(node: Node) {
        return (
            utils.targetHasClassName(node, 'content') && utils.findContentLinks([node]).length === 0
        );
    }
}
