import { Dispatch } from 'redux';
import { AbstractHandler } from './AbstractHandler';
import { removeLink } from '../../../common/actions/link';

export class NodeEditedHandler extends AbstractHandler {
    public handle(dispatch: Dispatch, action: any): void {
        const { mutation } = action.payload;

        // CONTENT DIV WAS EDITED
        if (
            this.anyContentLinkNodes(mutation.removedNodes) &&
            this.targetHasClassName(mutation.target, 'content')
        ) {
            // GET LINK ID AND DISPATCH REMOVE ACTION
            const id = this.findClosestProjectId(mutation.target as Element);
            if (id) {
                dispatch(removeLink(id));
            }
        }

        super.handle(dispatch, action);
    }

    private anyContentLinkNodes(nodes: NodeList) {
        return this.anyMutations(nodes) && Array.from(nodes).some(this.isContentLink);
    }
}
