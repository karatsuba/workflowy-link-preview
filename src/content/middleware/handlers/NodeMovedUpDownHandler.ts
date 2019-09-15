import { AbstractHandler } from './AbstractHandler';
import { addLink } from '../../../common/actions/link';

export class NodeMovedUpDownHandler extends AbstractHandler {
    public handle(mutation: MutationRecord): void {
        if (
            this.anyMutations(mutation.addedNodes) &&
            this.targetHasClassName(mutation.target, 'children')
        ) {
            // CHILDREN NODE WAS MOVED (ADDED) WITH UP/DOWN ARROWS
            const [link] = this.getMarkdownContentLink(mutation.addedNodes);
            const payload = this.prepareLinkPayload(link as HTMLAnchorElement);
            if (payload.id && payload.url) {
                this.dispatch(addLink(payload.id, payload.url));
            }
        }

        super.handle(mutation);
    }
}
