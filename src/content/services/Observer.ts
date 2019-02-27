import {Links} from '../models/Links';

export class Observer {
    private observer: MutationObserver;
    private dispatch: (action: object) => void;
    
    // todo: place for speed improvement here
    private options: object = {
        childList: true,
        subtree: true
    };

    constructor() {
        this.observer = new MutationObserver(this.mutationCallback.bind(this));
        this.dispatch = () => void 0;
    }

    static init() {
        return new Observer();
    }

    withDispatch(dispatch: (action: object) => void): Observer {
        this.dispatch = dispatch;
        return this;
    }

    observe(): void {
        const target = this.getTarget();
        if (target) {
            this.observer.observe(target, this.options);
        }
    }

    private getTarget() {
        return document.getElementById('app');
    }

    private mutationCallback(mutations: MutationRecord[]) {
        
        const getLinks = (node: Node) => {
            return Array.from(
                (node as HTMLElement).getElementsByClassName('contentLink')
            );
        };
        
        mutations.forEach(mutation => {
            const links = getLinks(mutation.target);

            this.dispatch({
                type: 'NEW_LINK',
                payload: Links.create(links)
            });
        });
    }
}

