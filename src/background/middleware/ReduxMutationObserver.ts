import { Dispatch } from 'redux';
import createMutationObserver from './createMutationObserver';

export default class ReduxMutationObserver {
    observer: MutationObserver | null = null;

    private options: object = {
        childList: true,
        subtree: true
    };

    observe({ dispatch }: { dispatch: Dispatch }) {
        if (!this.observer) {
            this.observer = createMutationObserver(dispatch);
        }

        const target = document.getElementById('app');
        if (target) {
            this.observer.observe(target, this.options);
        }
    }

    disconnect() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}
