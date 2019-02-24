import {Observer} from './services/Observer';
import {Links} from './models/Links';

const target = <HTMLElement> document.getElementById('app');

const getLinks = (node: Node) => {
    return (node as HTMLElement).getElementsByClassName("contentLink");
}

const links = new Links();

const callback = (mutations: MutationRecord[]) => {
    mutations.forEach(mutation => {
        links.setLinks(getLinks(mutation.target));
    })
};

const observer: Observer = new Observer(target, callback);

const createPreviewButtonNode = (target: any) => {
    // if (target.nextSibling && target.nextSibling.tagName !== 'SPAN') {
        console.log('GOING TO INSERT NODE', target);
        // const span = document.createElement("span");
        // target.parentNode.insertBefore(span, target.nextSibling);
    // }
}