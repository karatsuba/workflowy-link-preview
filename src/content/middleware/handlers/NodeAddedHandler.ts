import { Dispatch } from 'redux';
import { AbstractHandler } from './AbstractHandler';
import { addLink } from '../../../common/actions/link';

export class NodeAddedHandler extends AbstractHandler {
    public handle(dispatch: Dispatch, action: any): void {
        const { mutation } = action.payload;

        if (
            this.anyMutations(mutation.addedNodes) &&
            this.targetHasClassName(mutation.target, 'content')
        ) {
            // CONTENT LINK WAS ADDED
            const [link] = this.getMarkdownContentLink(mutation.addedNodes);
            if (link) {
                const payload = this.prepareLinkPayload(link as HTMLAnchorElement);
                if (payload.id && payload.url) {
                    dispatch(addLink(payload.id, payload.url));
                }
            }
        }

        super.handle(dispatch, action);
    }
}
