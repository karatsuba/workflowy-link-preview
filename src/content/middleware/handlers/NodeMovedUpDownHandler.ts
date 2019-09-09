import { AbstractHandler } from './AbstractHandler';
import * as utils from './utils';
import { addLink } from '../actions';

export class NodeMovedUpDownHandler extends AbstractHandler {
    public handle(mutation: MutationRecord): void {
        if (
            utils.anyMutations(mutation.addedNodes) &&
            utils.targetHasClassName(mutation.target, 'children')
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
