import { Dispatch } from 'redux';
import { Handler } from './Handler';

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
            id: this.findClosestProjectId(link) || null,
            url: (link && link.href) || null
        };
    }

    protected getMarkdownContentLink(nodes: NodeList) {
        return this.findContentLinks(nodes).filter(this.isMarkdownLink);
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

    protected anyMutations(nodes: NodeList) {
        return nodes.length > 0;
    }

    protected targetHasClassName(target: Node, className: string) {
        return target instanceof HTMLElement && target.classList.contains(className);
    }

    protected findContentLinks(nodes: NodeList | Element[] | Node[]) {
        const CONTENT_LINK_CLASS_NAME = 'contentLink';
        const res = Array.from(nodes).reduce(
            (result, node) => {
                const contentLinks =
                    node instanceof HTMLElement
                        ? node.getElementsByClassName(CONTENT_LINK_CLASS_NAME)
                        : [];
                return [...result, ...contentLinks];
            },
            [] as Element[]
        );
        return res;
    }

    protected findClosestProjectId(element: Element) {
        const project = element ? element.closest('div.project') : null;
        return project ? project.getAttribute('projectid') : null;
    }

    protected getContentLinksIds(nodes: NodeList) {
        return this.findContentLinks(nodes).map(this.findClosestProjectId);
    }
}
