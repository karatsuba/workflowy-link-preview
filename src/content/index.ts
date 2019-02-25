import { Observer } from './services/Observer';
import { Links } from './models/Links';

import { createStore } from 'redux';

const reducer = (state = { links: Links.create([]) }, action: any): any => {
    console.log('ACTION', action);
    switch (action.type) {
        case 'NEW_LINK':
            return {
                links: Links.merge(state.links, action.payload)
            }
        default:
            return state
    }
};

const store = createStore(reducer);

const getLinks = (node: Node) => {
    return Array.from(
        (node as HTMLElement).getElementsByClassName('contentLink')
    );
};

const callback = (mutations: MutationRecord[]) => {
    mutations.forEach(mutation => {
        const links = getLinks(mutation.target);

        store.dispatch({
            type: 'NEW_LINK',
            payload: Links.create(links)
        });

        // links.setLinks(targetLinks);
    });
};

const observer: Observer = new Observer(
    <HTMLElement>document.getElementById('app'),
    callback
);

const createPreviewButtonNode = (target: any) => {
    // if (target.nextSibling && target.nextSibling.tagName !== 'SPAN') {
    console.log('GOING TO INSERT NODE', target);
    // const span = document.createElement("span");
    // target.parentNode.insertBefore(span, target.nextSibling);
    // }
};
