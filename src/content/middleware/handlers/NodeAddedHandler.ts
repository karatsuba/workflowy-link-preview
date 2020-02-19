import { AbstractHandler } from './AbstractHandler';
import { addLink } from '../../../common/actions/link';

export class NodeAddedHandler extends AbstractHandler {
    public handle(mutation: MutationRecord): void {
        if (
            this.anyMutations(mutation.addedNodes) &&
            this.targetHasClassName(mutation.target, 'content')
        ) {
            // CONTENT LINK WAS ADDED
            const [link] = this.getMarkdownContentLink(mutation.addedNodes);
            if (link) {
                const payload = this.prepareLinkPayload(link as HTMLAnchorElement);
                if (payload.id && payload.url) {
                    this.dispatch(addLink(payload.id, payload.url));
                }
            }
        }

        super.handle(mutation);
    }
}
