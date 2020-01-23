import React from 'react';
import ReactDOM from 'react-dom';

type LinkPreviewPortalProps = {
    id: string;
};

export default class extends React.Component<LinkPreviewPortalProps> {
    private container: Element = document.createElement('div');
    private parentContainer: Element | null = null;

    componentDidMount(): void {
        const { id } = this.props;
        this.parentContainer = this.getParentContainer(id);
        if (this.parentContainer) {
            this.parentContainer.appendChild(this.container);
        }
    }

    shouldComponentUpdate(nextProps: LinkPreviewPortalProps): boolean {
        return this.props.id !== nextProps.id;
    }

    private getParentContainer(id: string): Element | null {
        const selector = `[projectid="${id}"] > .name`;
        return document.querySelector(selector);
    }

    componentWillUnmount(): void {
        if (this.parentContainer) {
            this.parentContainer.removeChild(this.container);
        }
    }

    render(): JSX.Element {
        const { children } = this.props;
        return ReactDOM.createPortal(children, this.container);
    }
}
