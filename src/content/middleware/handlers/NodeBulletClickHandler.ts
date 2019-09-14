import { AbstractHandler } from './AbstractHandler';
import * as utils from './utils';
import { removeLink } from '../actions';

export class NodeBulletClickHandler extends AbstractHandler {
    public handle(mutation: MutationRecord): void {
        // CONTENT LINK NODE WERE COLLAPSED => DELETED
        if (
            utils.anyMutations(mutation.removedNodes) &&
            utils.targetHasClassName(mutation.target, 'page')
        ) {
            const ids = this.getContentLinksIds(mutation.removedNodes);
            ids.forEach(id => id && this.dispatch(removeLink([id])));
        }

        super.handle(mutation);
    }

    // TODO: upgrade TS version
    private getContentLinksIds(nodes: NodeList) {
        const links = utils.findContentLinks(nodes);
        return links.map(utils.findClosestProjectId);
    }
}
