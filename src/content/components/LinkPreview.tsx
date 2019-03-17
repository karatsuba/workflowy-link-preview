import React from 'react'

class LinkPreview extends React.Component<any, any> {

    componentDidMount() {
        // console.log('MOUNTED: LinkPreview', this.props);
        // this.props.loadLinkPreview({
        //     id: this.props.link.getId(),
        //     description: 'HELLO FROM REDUX'
        // });
    }

    render(): JSX.Element {
        // {this.props.link.description}
        // console.log('RENDER: LinkPreview', this);
        return (<div>
            HELLO HERE
        </div>)
    }
}

export default LinkPreview;