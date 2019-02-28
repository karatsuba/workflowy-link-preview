import { Dispatch } from 'redux';
import { Links } from '../models/Links';

export default (dispatch: Dispatch) => {
    const observer = new MutationObserver((mutations: MutationRecord[]) => {

        mutations.forEach(mutation => {
            console.log('ALL MUTATION', mutation);

            if (mutation.addedNodes.length > 0) {
                const contentLinks = Array.from(mutation.addedNodes).filter(
                    node => {
                        const isContentLink =
                            (node as Element).classList &&
                            (node as Element).classList.contains('contentLink');
                        return isContentLink;
                    }
                );

                if (contentLinks.length > 0) {

                    console.log('CONTENT LINK', mutation);
                    dispatch({
                        type: 'NEW_LINK',
                        payload: Links.create(contentLinks as Element[])
                    });
                }
            }
        });
    });

    return observer;
};
