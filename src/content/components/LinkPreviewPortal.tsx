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
        console.log('MOUNT PREVIEW ON LINK PARENT');
        const nameContainer = this.linkElement.closest('div.name');
        const parentContainer = nameContainer ? nameContainer : this.linkElement.closest('div.notes');
        if(parentContainer){
            parentContainer.appendChild(this.container);
        }
    }

    render(): JSX.Element {
        return ReactDOM.createPortal(<LinkPreview {...this.props} />, this.container);
    }

}

export default LinkPreviewPortal;