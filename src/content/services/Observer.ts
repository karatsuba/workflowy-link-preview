export class Observer {
    private observer: MutationObserver;
    // todo: place for speed improvement here
    private options: object = {
        childList: true,
        subtree: true
    };

    constructor(target: HTMLElement, callback: MutationCallback) {
        this.observer = new MutationObserver(callback);
        this.observe(target);
    }

    private observe(target: HTMLElement): void {
        this.observer.observe(target, this.options);
    }
}

