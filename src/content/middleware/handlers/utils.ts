export const targetHasClassName = (target: Node, className: string): boolean => {
    return target instanceof HTMLElement && target.classList.contains(className);
};

export const anyMutations = (nodes: NodeList): boolean => nodes.length > 0;

export const filterMarkdownLinks = (element: Element): string[] => {
    const MARKDOWN_LINK_REGEX = /\[(.*?)\]\((.*?)\)/;

    const { textContent = '' } = element;
    const matches = textContent!.match(MARKDOWN_LINK_REGEX) || [];
    const [fullMatch, firstGroup, secondGroup] = matches;

    return secondGroup ? [secondGroup] : [];
};

export const filterContentLinks = (nodes: NodeList) => {
    const CONTENT_LINK_CLASS_NAME = 'contentLink';
    return Array.from(nodes).reduce(
        (result, node) => {
            if (
                node instanceof HTMLAnchorElement &&
                node.classList.contains(CONTENT_LINK_CLASS_NAME)
            ) {
                return [...result, node];
            }
            return result;
        },
        [] as HTMLAnchorElement[]
    );
};

export const isContentLink = (node: Node) => {
    const CONTENT_LINK_CLASS_NAME = 'contentLink';
    return (
        node instanceof HTMLAnchorElement &&
        node.isConnected &&
        node.classList.contains(CONTENT_LINK_CLASS_NAME)
    );
};

export const findContentLinks = (nodes: NodeList | Element[]) => {
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
};

export const findClosestProjectId = (element: Element) => {
    const project = element.closest('div.project');
    return project ? project.getAttribute('projectid') : null;
};

export const buildMarkdownLinkPayload = (element: Element) => (url: string) => ({
    id: findClosestProjectId(element),
    url
});
