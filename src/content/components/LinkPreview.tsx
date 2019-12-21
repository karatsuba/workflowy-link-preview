import React from 'react';
import Link from '../../common/models/Link';
import { ActionWithPayload } from '../../common/actions/index';
import { LinkPreviewPayload } from '../../common/actions/link';
import * as LinkPreviewStyled from './LinkPreview.styles';

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
            <LinkPreviewStyled.Container>
                <LinkPreviewStyled.Row>
                    <LinkPreviewStyled.Column>
                        <LinkPreviewStyled.Image src={imageUrl} alt='' />
                    </LinkPreviewStyled.Column>
                    <LinkPreviewStyled.Column>
                        <LinkPreviewStyled.Title>{title}</LinkPreviewStyled.Title>
                        <span>{description}</span>
                    </LinkPreviewStyled.Column>
                </LinkPreviewStyled.Row>
            </LinkPreviewStyled.Container>
        );
    }
}

export default LinkPreview;
