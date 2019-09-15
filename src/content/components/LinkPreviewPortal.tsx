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
        const { id } = this.props;
        this.parentContainer = this.getParentContainer(id);
        if (this.parentContainer) {
            this.parentContainer.appendChild(this.container);
        }
    }

    private getParentContainer(id: string) {
        const selector = `[projectid="${id}"] > .name`;
        return document.querySelector(selector);
    }

    componentWillUnmount() {
        if (this.parentContainer) {
            this.parentContainer.removeChild(this.container);
        }
    }

    render(): JSX.Element {
        const { children } = this.props;
        return ReactDOM.createPortal(children, this.container);
    }
}
