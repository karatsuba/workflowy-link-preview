import React from 'react';
import Link from '../../common/models/Link';
import { CommonActions } from '../../common/actions/types';
import * as LinkPreviewStyled from './LinkPreview.styles';

type LinkPreviewProps = Link & {
    onLoadLinkPreview: (id: string, url: string) => CommonActions;
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
                    {imageUrl && (
                        <LinkPreviewStyled.Column>
                            <LinkPreviewStyled.Image src={imageUrl} alt='' />
                        </LinkPreviewStyled.Column>
                    )}
                    {(title || description) && (
                        <LinkPreviewStyled.Column>
                            <LinkPreviewStyled.Title>{title}</LinkPreviewStyled.Title>
                            <span>{description}</span>
                        </LinkPreviewStyled.Column>
                    )}
                </LinkPreviewStyled.Row>
            </LinkPreviewStyled.Container>
        );
    }
}

export default LinkPreview;
