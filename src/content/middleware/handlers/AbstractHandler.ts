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
        return this;
    }

    public handle(mutation: MutationRecord): void {
        if (this.nextHandler) {
            this.nextHandler.handle(mutation);
        }
    }

    protected preparePayload(link: HTMLAnchorElement) {
        return {
            id: utils.findClosestProjectId(link) || null,
            url: (link && link.href) || null
        };
    }

    protected getMarkdownContentLink(nodes: NodeList) {
        return utils.findContentLinks(nodes).filter(this.isMarkdownLink);
    }

    protected isMarkdownLink(element: Element) {
        const MARKDOWN_LINK_REGEX = /\[.*?\]\((.*?)\)/;
        return MARKDOWN_LINK_REGEX.test(element.parentElement!.textContent!);
    }
}
