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

    disconnect(): void {
        this.observer.disconnect();
    }

    takeRecords(): void {
        const events = this.observer.takeRecords();
        console.log(events);
    }

    private getTarget() {
        return document.getElementById('app');
    }

    private mutationCallback(mutations: MutationRecord[]) {
        mutations.forEach(mutation => {

            if(mutation.addedNodes.length > 0){
                
                const contentLinks = Array.from(mutation.addedNodes).filter(node => {
                    const isContentLink = (node as Element).classList && (node as Element).classList.contains('contentLink');
                    return isContentLink;
                });

                if (contentLinks.length > 0) {
                    console.log(mutation);

                    this.dispatch({
                        type: 'NEW_LINK',
                        payload: Links.create(contentLinks as Element[])
                    });
                }

            }
        });
    }
}

