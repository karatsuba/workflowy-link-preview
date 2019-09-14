import { Dispatch, Action } from 'redux';
import { Handler } from './Handler';
import * as utils from './utils';

export abstract class AbstractHandler implements Handler {
    private nextHandler!: Handler;
    public dispatch: Dispatch;

    constructor(dispatch: Dispatch) {
        this.dispatch = dispatch;
    }

    public setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    public handle(mutation: MutationRecord): void {
        if (this.nextHandler) {
            this.nextHandler.handle(mutation);
        }
    }

    protected prepareLinkPayload(link: HTMLAnchorElement) {
        return {
            id: utils.findClosestProjectId(link) || null,
            url: (link && link.href) || null
        };
    }

    protected getMarkdownContentLink(nodes: NodeList) {
        return utils.findContentLinks(nodes).filter(this.isMarkdownLink);
    }

    protected isContentLink(node: Node) {
        const CONTENT_LINK_CLASS_NAME = 'contentLink';
        return (
            node instanceof HTMLAnchorElement && node.classList.contains(CONTENT_LINK_CLASS_NAME)
        );
    }

    protected isMarkdownLink(element: Element) {
        const MARKDOWN_LINK_REGEX = /\[.*?\]\((.*?)\)/;
        return MARKDOWN_LINK_REGEX.test(element.parentElement!.textContent!);
    }
}
