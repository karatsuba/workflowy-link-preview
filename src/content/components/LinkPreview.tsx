import React from 'react';
import Link from '../../common/models/Link';
import { ActionWithPayload } from '../../common/actions/index';
import { LinkPreviewPayload } from '../../common/actions/link';
import * as Styled from './LinkPreview.styles';

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
            <Styled.Container>
                <Styled.Row>
                    <Styled.Column>
                        <Styled.Image src={imageUrl} alt='' />
                    </Styled.Column>
                    <Styled.Column>
                        <Styled.Title>{title}</Styled.Title>
                        <span>{description}</span>
                    </Styled.Column>
                </Styled.Row>
            </Styled.Container>
        );
    }
}

export default LinkPreview;
