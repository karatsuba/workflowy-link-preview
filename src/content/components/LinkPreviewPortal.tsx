import React from 'react'
import ReactDOM from 'react-dom';
import LinkPreview from './LinkPreview';
import parse from '../../shared/services/DOMParser';

class LinkPreviewPortal extends React.Component<any, any> {
    // private linkElement: HTMLLinkElement;
    private container: Element;
    private parentContainer: Element | null = null;

    constructor(props: any) {
        super(props);
        this.container = document.createElement('div');
        // console.log(parse(this.props.link.element));
        // const element:HTMLAnchorElement = parse(this.props.link.element).getElementsByTagName('a')[0];
        // element.removeAttribute('xmlns');
        // this.linkElement = this.props.link.getElement();
    }

    componentDidMount() {
        // console.log('GOINT TO APPEND PREVIEW ON LINK PARENT');
        // const nameContainer = this.linkElement.closest('div.name');
        this.parentContainer = document.querySelectorAll(`[projectid='${this.props.id}'] > .name`).item(0);
        // this.parentContainer = nameContainer ? nameContainer : this.linkElement.closest('div.notes');        
        if(this.parentContainer){
            // console.log('PREVIEW LINK WAS APPENDED ON PARENT');
            this.parentContainer.appendChild(this.container);
        }
    }

    componentWillUnmount() {
        // console.log('GOINT TO REMOVE PREVIEW ON LINK PARENT');
        if(this.parentContainer){
            // console.log('PREVIEW LINK WAS REMOVED ON PARENT');
            this.parentContainer.removeChild(this.container);
        }
    }

    componentDidUpdate(prevProps: any) {}

    render(): JSX.Element {
        console.log('RENDER: LinkPreviewPortal', this.container);
        return ReactDOM.createPortal(<LinkPreview {...this.props} />, this.container);
    }

}

export default LinkPreviewPortal;