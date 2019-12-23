import React from 'react';
import ReactDOM from 'react-dom';

type LinkPreviewPortalProps = {
    id: string;
};

export default class extends React.PureComponent<LinkPreviewPortalProps> {
    private container: Element = document.createElement('div');
    private parentContainer: Element | null = null;

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

    render() {
        const { children } = this.props;
        return ReactDOM.createPortal(children, this.container);
    }
}
