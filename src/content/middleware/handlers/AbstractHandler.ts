import { Dispatch } from 'redux';
import { Handler } from './Handler';

export abstract class AbstractHandler implements Handler {
    private static readonly CONTENT_LINK = 'contentLink';

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

    protected isContentLink(node: Node) {
        return (
            node instanceof HTMLAnchorElement &&
            node.classList.contains(AbstractHandler.CONTENT_LINK)
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

    protected findContentLinks(nodes: NodeList) {
        return Array.from(nodes).reduce(
            (result, node) => {
                const contentLinks =
                    node instanceof HTMLElement
                        ? node.getElementsByClassName(AbstractHandler.CONTENT_LINK)
                        : [];
                return [...result, ...contentLinks];
            },
            [] as Element[]
        );
    }

    protected findClosestProjectId(element: Element) {
        const project = element ? element.closest('div.project') : null;
        return project ? project.getAttribute('projectid') : null;
    }

    protected getMarkdownContentLink(nodes: NodeList) {
        return this.findContentLinks(nodes).filter(this.isMarkdownLink);
    }

    protected getContentLinksIds(nodes: NodeList) {
        return this.findContentLinks(nodes).map(this.findClosestProjectId);
    }
}
