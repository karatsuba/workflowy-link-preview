import React from 'react'
import ReactDOM from 'react-dom';
import LinkPreview from './LinkPreview';

class LinkPreviewPortal extends React.Component<any, any> {
    private container: Element;
    private parentContainer: Element | null = null;

    constructor(props: any) {
        super(props);
        this.container = document.createElement('div');
    }

    componentDidMount() {
        // console.log('GOINT TO APPEND PREVIEW ON LINK PARENT');
        this.parentContainer = document.querySelectorAll(`[projectid='${this.props.id}'] > .name`).item(0);
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

    // rerender only id is changed
    // shouldComponentUpdate(nextProps: any) {
        // return this.props.id !== nextProps.id;
    // }

    render(): JSX.Element {
        return ReactDOM.createPortal(<LinkPreview {...this.props} />, this.container);
    }

}

export default LinkPreviewPortal;