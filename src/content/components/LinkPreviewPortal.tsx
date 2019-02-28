import React from 'react'
import ReactDOM from 'react-dom';
import LinkPreview from './LinkPreview';

class LinkPreviewPortal extends React.Component<any, any> {
    private linkElement: HTMLLinkElement;
    private container: Element;
    private parentContainer: Element | null = null;

    constructor(props: any) {
        super(props);
        this.linkElement = this.props.link.getElement();
        this.container = document.createElement('div');
    }

    componentDidMount() {
        console.log('GOINT TO APPEND PREVIEW ON LINK PARENT');
        const nameContainer = this.linkElement.closest('div.name');
        this.parentContainer = nameContainer ? nameContainer : this.linkElement.closest('div.notes');        
        if(this.parentContainer){
            console.log('PREVIEW LINK WAS APPENDED ON PARENT');
            this.parentContainer.appendChild(this.container);
        }
    }

    componentWillUnmount() {
        console.log('GOINT TO REMOVE PREVIEW ON LINK PARENT');
        if(this.parentContainer){
            console.log('PREVIEW LINK WAS REMOVED ON PARENT');
            this.parentContainer.removeChild(this.container);
        }
    }

    componentDidUpdate(prevProps: any) {
        // if(this.parentContainer){
        //     console.log(this.props, prevProps);
        //     console.log('PREVIEW LINK WAS REAPPENDED ON PARENT');
        //     this.parentContainer.appendChild(this.container);
        // }
    }

    render(): JSX.Element {
        console.log('RENDER: LinkPreviewPortal', this.container);
        return ReactDOM.createPortal(<LinkPreview {...this.props} />, this.container);
    }

}

export default LinkPreviewPortal;