import React from 'react';
import ReactDOM from 'react-dom';

type LinkPreviewPortalProps = {
    id: string;
};

export default class extends React.Component<LinkPreviewPortalProps> {
    private container: Element;
    private parentContainer: Element | null = null;

    constructor(props: any) {
        super(props);
        this.container = document.createElement('div');
    }

    componentDidMount() {
        // TODO: fix reload bug
        const { id } = this.props;
        this.parentContainer = this.getParentContainer(id);
        // console.log('GOINT TO APPEND PREVIEW ON LINK PARENT', document.querySelectorAll(`[projectid='${this.props.id}'] > .name`));
        if (this.parentContainer) {
            // console.log('PREVIEW LINK WAS APPENDED ON PARENT');
            this.parentContainer.appendChild(this.container);
        }
    }

    getParentContainer(id: string) {
        const selector = `[projectid="${id}"] > .name`;
        return document.querySelectorAll(selector).item(0);
    }

    componentWillUnmount() {
        // console.log('GOINT TO REMOVE PREVIEW ON LINK PARENT');
        if (this.parentContainer) {
            // console.log('PREVIEW LINK WAS REMOVED ON PARENT');
            this.parentContainer.removeChild(this.container);
        }
    }

    render(): JSX.Element {
        const { children } = this.props;
        return ReactDOM.createPortal(children, this.container);
    }
}
