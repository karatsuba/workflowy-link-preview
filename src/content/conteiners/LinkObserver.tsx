import * as React from 'react'
import {Observer} from '../services/Observer';

class Component extends React.Component<any, any> {
    private observer: Observer = Observer.init();

    componentDidMount() {
        console.log('GOING OT SUBCRIBE TO OBSERVER');
        this.observer.observe()
    }

    render(): JSX.Element {
        console.log('HELLO FROM RENDERED APP');
        return (<div></div>)
    }
}

export { 
    Component
};