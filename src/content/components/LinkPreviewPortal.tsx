import React from 'react'
import ReactDOM from 'react-dom';
import LinkPreview from './LinkPreview';

class LinkPreviewPortal extends React.Component<any, any> {
    private linkElement: HTMLLinkElement;
    private container: HTMLElement;

    constructor(props: any) {
        super(props);
        this.linkElement = this.props.link.getElement();
        this.container = document.createElement('div');
    }

    componentDidMount() {
        // also observer stop here
        console.log('MOUNT LINK HERE');
        // this.props.observer.disconnect();
        // this.props.observer.takeRecords();
        // this.linkElement.appendChild(this.container);
    }

    render(): JSX.Element {
        return ReactDOM.createPortal(<LinkPreview {...this.props} />, this.container);
    }

}

export default LinkPreviewPortal;