import { AbstractHandler } from './AbstractHandler';
import * as utils from './utils';
import { removeLink } from '../actions';

export class NodeCollapsedHandler extends AbstractHandler {
    public handle(mutation: MutationRecord): void {
        // CONTENT LINK NODE WERE COLLAPSED => DELETED
        if (
            utils.anyMutations(mutation.removedNodes) &&
            utils.targetHasClassName(mutation.target, 'project')
        ) {
            const ids = this.getContentLinksIds(mutation.removedNodes);

            if (ids.length > 0) {
                this.dispatch(removeLink(ids));
            }
        }

        super.handle(mutation);
    }

    // TODO: upgrade TS version
    private getContentLinksIds(nodes: NodeList) {
        const links = utils.findContentLinks(nodes);
        return links.length > 0
            ? links.map(utils.findClosestProjectId).filter<string>(Boolean)
            : [];
    }
}
