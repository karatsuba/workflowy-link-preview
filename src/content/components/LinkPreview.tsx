import React from 'react';
import Link from '../../common/models/Link';
import { ActionWithPayload } from '../../common/actions/index';
import { LinkPreviewPayload } from '../../common/actions/link';
import * as StyledLinkPreview from './LinkPreview.styles';

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
            <StyledLinkPreview.Container>
                <StyledLinkPreview.Row>
                    <StyledLinkPreview.Column>
                        <StyledLinkPreview.Image src={imageUrl} alt='' />
                    </StyledLinkPreview.Column>
                    <StyledLinkPreview.Column>
                        <h2>{title}</h2>
                        <span>{description}</span>
                    </StyledLinkPreview.Column>
                </StyledLinkPreview.Row>
            </StyledLinkPreview.Container>
        );
    }
}

export default LinkPreview;
