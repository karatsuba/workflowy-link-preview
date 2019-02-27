import { Dispatch } from 'redux';
import createMutationObserver from './createMutationObserver';

export default class ReduxMutationObserver {
    observer: MutationObserver | null = null;

    observe({ dispatch }: { dispatch: Dispatch }) {
        if (!this.observer) {
            this.observer = createMutationObserver(dispatch);
        }

        const target = document.getElementById('app');
        if (target) {
            this.observer.observe(target);
        }
    }

    disconnect() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}
