import { AbstractHandler } from './AbstractHandler';
import { addLink } from '../../../common/actions/link';

export class NodeAddedHandler extends AbstractHandler {
    public handle(mutation: MutationRecord): void {
        if (
            this.anyMutations(mutation.addedNodes) &&
            this.targetHasClassName(mutation.target, 'content')
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

    private isConnectedContentLink(node: Node) {
        return this.isContentLink(node) && node.isConnected;
    }

    private getContentLink(nodes: NodeList) {
        return Array.from(nodes).filter(this.isConnectedContentLink.bind(this));
    }
}
