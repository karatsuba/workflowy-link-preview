import React from 'react'

class LinkPreview extends React.Component<any, any> {

    componentDidMount() {
        const { id, href } = this.props;
        this.props.loadLinkPreview({ id, href });
    }

    render(): JSX.Element {
        return (<div>
            HELLO HERE
        </div>)
    }
}

export default LinkPreview;