import { Dispatch } from 'redux';
import { Links } from '../models/Links';

const getContentLinks = (nodes: NodeList) => {
    return Array.from(nodes).filter(
        node => {
            const isContentLink = (node as Element).classList && (node as Element).classList.contains('contentLink');
            return isContentLink;
        }
    );
}

const getLinks = (node: Node) => {
    return Array.from(
        (node as HTMLElement).getElementsByClassName('contentLink')
    );
};

export default (dispatch: Dispatch) => {
    const observer = new MutationObserver((mutations: MutationRecord[]) => {

        mutations.forEach(mutation => {
            console.log('ALL MUTATION', mutation);

            // TODO: find solution for node edit remove
            // if(mutation.removedNodes.length > 0) {
            //     console.log('MUTATION', mutation);
            //     console.log('REMOVED NODES', mutation.removedNodes);
            // }

            if (mutation.addedNodes.length > 0) {
                const contentLinks = getContentLinks(mutation.addedNodes);

                if (contentLinks.length > 0) {
                    // console.log('CONTENT LINK', mutation);
                    dispatch({
                        type: 'ADD_LINK',
                        payload: Links.create(contentLinks as Element[])
                    });
                }
            }

            if (mutation.removedNodes.length > 0) {
                let removedLinks = getContentLinks(mutation.removedNodes);

                if(removedLinks.length === 0) {
                    removedLinks = getLinks(mutation.removedNodes[0])
                }

                if (removedLinks.length > 0) {
                    // console.log('CONTENT LINK', mutation);
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
