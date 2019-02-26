export class Observer {
    private observer: MutationObserver;
    // todo: place for speed improvement here
    private options: object = {
        childList: true,
        subtree: true
    };

    constructor() {
        this.observer = new MutationObserver(this.mutationCallback);
    }

    static init() {
        return new Observer();
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
            console.log(mutation);
            console.log(links);

            // store.dispatch({
            //     type: 'NEW_LINK',
            //     payload: Links.create(links)
            // });
        });
    }

    observe(): void {
        const target = this.getTarget();
        if (target) {
            this.observer.observe(target, this.options);
        }
    }
}

