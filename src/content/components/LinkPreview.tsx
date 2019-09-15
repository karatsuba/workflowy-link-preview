import React from 'react';
import Link from '../../common/models/Link';
import { ActionWithPayload } from '../../common/actions/index';
import { LinkPreviewPayload } from '../../common/actions/link';

type LinkPreviewProps = Link & {
    onLoadLinkPreview: (id: string, url: string) => ActionWithPayload<LinkPreviewPayload>;
};

class LinkPreview extends React.Component<LinkPreviewProps> {
    componentDidMount() {
        const { id, url, onLoadLinkPreview } = this.props;
        onLoadLinkPreview(id, url);
    }

    render(): JSX.Element {
        const { fetching, title, imageUrl, description } = this.props;

        if (fetching) {
            return <div>Loading...</div>;
        }

        return (
            <div className='link-preview' style={{ userSelect: 'text' }}>
                <div className='image'>
                    <img src={imageUrl} alt='' style={{ maxWidth: '200px' }} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        );
    }
}

export default LinkPreview;
