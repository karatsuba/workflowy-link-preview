import { AbstractHandler } from './AbstractHandler';
import * as utils from './utils';
import { removeLink } from '../actions';

export class NodeDraggedHandler extends AbstractHandler {
    public handle(mutation: MutationRecord): void {
        // CHILDREN NODE WAS MOVED (DELETED) WITH TAB OR DRAGGED BY MOUSE
        // CONTENT LINK NODE WERE COLLAPSED => DELETED
        if (
            utils.anyMutations(mutation.removedNodes) &&
            utils.targetHasClassName(mutation.target, 'children')
        ) {
            const ids = this.getContentLinksIds(mutation.removedNodes);
            ids.forEach(id => id && this.dispatch(removeLink(id)));
        }

        super.handle(mutation);
    }

    private getContentLinksIds(nodes: NodeList) {
        const links = utils.findContentLinks(nodes);
        return links.map(utils.findClosestProjectId).filter(Boolean);
    }
}
