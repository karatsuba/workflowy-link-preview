import { AbstractHandler } from './AbstractHandler';
import * as utils from './utils';
import { addLink } from '../actions';

export class NodeAddedHandler extends AbstractHandler {
    public handle(mutation: MutationRecord): void {
        if (
            utils.anyMutations(mutation.addedNodes) &&
            utils.targetHasClassName(mutation.target, 'content')
        ) {
            // CONTENT LINK WAS ADDED
            const [link] = this.getContentLink(mutation.addedNodes);
            if (link && this.isMarkdownLink(mutation.target as Element)) {
                const payload = this.prepareLinkPayload(link as HTMLAnchorElement);
                if (payload.id && payload.url) {
                    this.dispatch(addLink(payload.id, payload.url));
                }
            }
        }

        super.handle(mutation);
    }

    private getContentLink(nodes: NodeList) {
        return Array.from(nodes).filter(utils.isContentLink);
    }
}
