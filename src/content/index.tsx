import { Observer } from './services/Observer';
import { Links } from './models/Links';
import {Component as LinkObserver} from './conteiners/LinkObserver';
import * as ReactDOM from 'react-dom';
import * as React from 'react'
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

const initLinkObserver = () => {
    const root = document.getElementById('app') as HTMLElement;
    const container = document.createElement('div');
    root.appendChild(container);
    ReactDOM.render(<LinkObserver />, container);
}

initLinkObserver();

const createPreviewButtonNode = (target: any) => {
    // if (target.nextSibling && target.nextSibling.tagName !== 'SPAN') {
    console.log('GOING TO INSERT NODE', target);
    // const span = document.createElement("span");
    // target.parentNode.insertBefore(span, target.nextSibling);
    // }
};
