import { AbstractHandler } from './AbstractHandler';
import * as utils from './utils';
import { addLink } from '../actions';

export class NodeEditedHandler extends AbstractHandler {
    public handle(mutation: MutationRecord): void {
        if (
            utils.anyMutations(mutation.addedNodes) &&
            utils.targetHasClassName(mutation.target, 'content')
        ) {
            // CONTENT LINK WAS ADDED
            if (
                this.nodesHaveContentLink(mutation.addedNodes) &&
                this.isMarkdownLink(mutation.target as Element)
            ) {
                const [link] = Array.from(mutation.addedNodes).filter(utils.isContentLink);
                const payload = this.preparePayload(link as HTMLAnchorElement);
                if (payload.id && payload.url) {
                    this.dispatch(addLink(payload.id, payload.url));
                }
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

    private nodesHaveContentLink(nodes: NodeList) {
        return Array.from(nodes).filter(utils.isContentLink).length > 0;
    }

    private isMarkdownLink(element: Element) {
        const MARKDOWN_LINK_REGEX = /\[.*?\]\((.*?)\)/;
        return MARKDOWN_LINK_REGEX.test(element.parentElement!.textContent!);
    }
}
