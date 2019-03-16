import { Dispatch } from 'redux';

const serializer = new XMLSerializer();

const serialize = (node: Node) => serializer.serializeToString(node);

const filterContentLinks = (nodes: NodeList) => {
    const CONTENT_LINK_CLASS_NAME = 'contentLink';
    return Array.from(nodes).reduce((result, node) => {
        if (node instanceof HTMLElement && node.classList.contains(CONTENT_LINK_CLASS_NAME)) {
            return [...result, node];
        }
        return result;
    }, [] as Element[]);
};

const isConnectedLink = (element: Element) => element.isConnected;

const findContentLinks = (nodes: NodeList | Element[]) => {
    const CONTENT_LINK_CLASS_NAME = 'contentLink';
    const res = Array.from(nodes).reduce((result, node) => {
        const contentLinks = node instanceof HTMLElement ? node.getElementsByClassName(CONTENT_LINK_CLASS_NAME) : [];
        return [...result, ...contentLinks];
    }, [] as Element[]);
    return res;
};

const findClosestProjectId = (element: Element) => {
    const project = element.closest('div.project');
    return project ? project.getAttribute('projectid') : null;
}

export default (dispatch: Dispatch) => {
    const observer = new MutationObserver((mutations: MutationRecord[]) => {
        mutations.forEach(mutation => {
            // MUTATION CASES:
                // case with moving up/down
                // tree travesting with click and "<" ">" buttons
                // case edit
                // case with open/close
                // case with tab
                // case with drag

            if (mutation.addedNodes.length > 0) {
                // CHILDREN NODE WAS MOVED (ADDED) WITH UP/DOWN ARROWS
                if(mutation.target instanceof HTMLElement && mutation.target.classList.contains('children')) {
                    // CONTENT LINK WAS ADDED
                    if(findContentLinks(mutation.addedNodes).length > 0) {
                        // GET LINKS AND DISPATCH ADD ACTION
                        const addedContentLinks = findContentLinks(mutation.addedNodes)
                        dispatch({
                            type: 'ADD_LINK',
                            payload: addedContentLinks.map(serialize)
                        });
                    }
                }

                // CONTENT DIV WAS EDITED
                if(mutation.target instanceof HTMLElement && mutation.target.classList.contains('content')) {
                    // CONTENT LINK WAS ADDED
                    if(filterContentLinks(mutation.addedNodes).filter(isConnectedLink).length > 0) {
                        // GET LINKS AND DISPATCH ADD ACTION
                        const addedContentLinks = filterContentLinks(mutation.addedNodes).filter(isConnectedLink)
                        dispatch({
                            type: 'ADD_LINK',
                            payload: addedContentLinks.map(serialize)
                        });
                    }
                    
                }
            }

            if (mutation.removedNodes.length > 0) {
                // CONTENT DIV WAS EDITED
                if(mutation.target instanceof HTMLElement && mutation.target.classList.contains('content')) {
                    // CONTENT LINK NODE WAS EDITED OR DELETED
                    if(filterContentLinks(mutation.removedNodes).length > 0){
                        // CONTENT LINK NODE WAS DELETED
                        if(findContentLinks([mutation.target]).length === 0){
                            // GET LINK ID AND DISPATCH REMOVE ACTION
                            const removedContentLinkId = findClosestProjectId(mutation.target);
                            dispatch({
                                type: 'REMOVE_LINK',
                                payload: [removedContentLinkId]
                            });
                        }
                        // TODO: handle edit case and try reload url, if failed => show load failed
                    }
                }

                // PROJECT DIV WAS COLLAPSED
                if(mutation.target instanceof HTMLElement && mutation.target.classList.contains('project')) {
                    // CONTENT LINK NODE WERE COLLAPSED => DELETED
                    if(findContentLinks(mutation.removedNodes).length > 0){
                        // GET LINKS ID AND DISPATCH REMOVE ACTION
                        const removedContentLinks = findContentLinks(mutation.removedNodes).map(findClosestProjectId);
                        dispatch({
                            type: 'REMOVE_LINK',
                            payload: removedContentLinks
                        });
                    }
                }

                // CHILDREN NODE WAS MOVED (DELETED) WITH TAB OR DRAGGED BY MOUSE
                if(mutation.target instanceof HTMLElement && mutation.target.classList.contains('children')) {
                    // CONTENT LINK NODE WERE MOVED => DELETED
                    if(findContentLinks(mutation.removedNodes).length > 0){
                        // GET LINKS ID AND DISPATCH REMOVE ACTION
                        const removedContentLinks = findContentLinks(mutation.removedNodes).map(findClosestProjectId);
                        dispatch({
                            type: 'REMOVE_LINK',
                            payload: removedContentLinks
                        });
                    }
                }

                // PAGE NODES WERE DELETED WITH "<", ">" OR BULLET CLICK
                if(mutation.target instanceof HTMLElement && mutation.target.classList.contains('page')) {
                    // CONTENT LINK NODE WERE REMOVED
                    if(findContentLinks(mutation.removedNodes).length > 0){
                        // GET LINKS ID AND DISPATCH REMOVE ACTION
                        const removedContentLinks = findContentLinks(mutation.removedNodes).map(findClosestProjectId);
                        dispatch({
                            type: 'REMOVE_LINK',
                            payload: removedContentLinks
                        });
                    }
                }
            }
        });
    });

    return observer;
};
