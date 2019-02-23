import {Observer} from './services/Observer';

const target = <HTMLElement> document.getElementById('app');

const getLink = (node: Node) => {
    return (node as HTMLElement).getElementsByClassName("contentLink");
}

const callback = (mutations: MutationRecord[]) => {
    mutations.forEach(mutation => {
        console.log(getLink(mutation.target));
    })
};

const observer: Observer = new Observer(target, callback);