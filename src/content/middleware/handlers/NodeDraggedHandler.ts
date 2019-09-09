import { AbstractHandler } from './AbstractHandler';
import * as utils from './utils';
import { removeLink } from '../actions';

export class NodeCollapsedHandler extends AbstractHandler {
    public handle(mutation: MutationRecord): void {
        // CHILDREN NODE WAS MOVED (DELETED) WITH TAB OR DRAGGED BY MOUSE
        // CONTENT LINK NODE WERE COLLAPSED => DELETED
        if (
            utils.anyMutations(mutation.removedNodes) &&
            utils.targetHasClassName(mutation.target, 'children')
        ) {
            const ids = this.getContentLinksIds(mutation.removedNodes);

            if (ids.length > 0) {
                this.dispatch(removeLink(ids));
            }
        }

        super.handle(mutation);
    }

    private getContentLinksIds(nodes: NodeList) {
        const links = utils.findContentLinks(nodes);
        return links.length > 0 ? links.map(utils.findClosestProjectId).filter(Boolean) : [];
    }
}
