import React from 'react'

class LinkPreview extends React.Component<any, any> {

    componentDidMount() {
        const { id } = this.props;
        this.props.loadLinkPreview({ id });
    }

    render(): JSX.Element {
        return (<div>
            HELLO HERE
        </div>)
    }
}

export default LinkPreview;