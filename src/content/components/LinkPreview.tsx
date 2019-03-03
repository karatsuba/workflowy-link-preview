import React from 'react'
import {HTTP_ACTION} from '../middleware/httpMiddleware';
import {
    LINK_PREVIEW_REQUEST,
    LINK_PREVIEW_SUCCESS,
    LINK_PREVIEW_FAILURE
} from '../actions';

class LinkPreview extends React.Component<any, any> {

    componentDidMount() {
        console.log('MOUNTED: LinkPreview', this.props);
        this.props.loadLinkPreview({
            id: this.props.link.getId(),
            description: 'HELLO FROM REDUX'
        });
    }

    render(): JSX.Element {
        console.log('RENDER: LinkPreview', this);
        return (<div>
            {this.props.link.description}
        </div>)
    }
}

export default LinkPreview;