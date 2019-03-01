import { Dispatch } from 'redux';
import { Links } from '../models/Links';

const filterContentLinks = (nodes: NodeList) => {
    const CONTENT_LINK_CLASS_NAME = 'contentLink';
    return Array.from(nodes).filter(node =>
        node instanceof HTMLElement
            ? node.classList.contains(CONTENT_LINK_CLASS_NAME)
            : false
    );
};

const findContentLinks = (nodes: NodeList) => {
    const CONTENT_LINK_CLASS_NAME = 'contentLink';

    const res = Array.from(nodes).reduce((result, node) => {
        const contentLinks = node instanceof HTMLElement ? node.getElementsByClassName(CONTENT_LINK_CLASS_NAME) : [];
        return [...result, ...contentLinks];
    }, [] as Element[]);
    return res;
};

export default (dispatch: Dispatch) => {
    const observer = new MutationObserver((mutations: MutationRecord[]) => {
        mutations.forEach(mutation => {
            // console.log('ALL MUTATION', mutation.removedNodes);

            // TODO: send only connected links
            if (mutation.addedNodes.length > 0) {
                const contentLinks = filterContentLinks(mutation.addedNodes);

                if (contentLinks.length > 0) {
                    // console.log('CONTENT LINK', contentLinks);
                    dispatch({
                        type: 'ADD_LINK',
                        payload: Links.create(contentLinks as Element[])
                    });
                }
            }

            if (mutation.removedNodes.length > 0) {
                // should disting link editing and link remove
                // here I have edited links
                // let removedLinks = filterContentLinks(mutation.removedNodes);

                // if (removedLinks.length === 0) {
                    // here I have removed nodes, that contains links
                    const removedLinks = findContentLinks(mutation.removedNodes);
                // }

                // FOR NOW I"M SENDING LINKS WITH NULL
                if (removedLinks.length > 0) {
                    console.log('REMOVE CONTENT LINK', mutation);
                    dispatch({
                        type: 'REMOVE_LINK',
                        payload: Links.create(removedLinks as Element[])
                    });
                }
            }
        });
    });

    return observer;
};
