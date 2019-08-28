import { AbstractHandler } from './AbstractHandler';
import * as utils from './utils';
import { addLink } from '../actions';

export class NodeAddedHandler extends AbstractHandler {
    public handle(mutation: MutationRecord): void {
        if (
            utils.anyMutations(mutation.addedNodes) &&
            utils.targetHasClassName(mutation.target, 'children')
        ) {
            // CHILDREN NODE WAS MOVED (ADDED) WITH UP/DOWN ARROWS
            const [link] = this.getMarkdownContentLink(mutation.addedNodes);
            const payload = this.preparePayload(link as HTMLAnchorElement);
            if (payload.id && payload.url) {
                this.dispatch(addLink(payload.id, payload.url));
            }
        }

        super.handle(mutation);
    }

    private preparePayload(link: HTMLAnchorElement) {
        return {
            id: utils.findClosestProjectId(link),
            url: link.href
        };
    }

    private getMarkdownContentLink(nodes: NodeList) {
        return utils.findContentLinks(nodes).filter(this.isMarkdownLink);
    }

    private isMarkdownLink(element: Element) {
        const MARKDOWN_LINK_REGEX = /\[.*?\]\((.*?)\)/;
        return MARKDOWN_LINK_REGEX.test(element.parentElement!.textContent!);
    }
}
