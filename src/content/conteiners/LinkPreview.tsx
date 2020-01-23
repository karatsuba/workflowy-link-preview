import React from 'react';
import { connect } from 'react-redux';
import Link from '../../common/models/Link';
import { CommonActions } from '../../common/actions/types';
import { loadLinkPreview } from '../../common/actions/link';
import { State } from '../../background/reducers';
import { getLinkById } from '../selectors';
import * as LinkPreviewStyled from './LinkPreview.styles';

type LinkPreviewProps = OwnProps & StateProps & DispatchProps;

class LinkPreview extends React.Component<LinkPreviewProps> {
    componentDidMount(): void {
        const { link, loadLinkPreview } = this.props;
        loadLinkPreview(link.id, link.url);
    }

    shouldComponentUpdate(nextProps: LinkPreviewProps): boolean {
        return !Link.isEqual(this.props.link, nextProps.link);
    }

    render(): JSX.Element {
        const { fetching, title, imageUrl, description } = this.props.link;

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

type OwnProps = {
    linkId: string;
};

type StateProps = {
    link: Link;
};

type DispatchProps = {
    loadLinkPreview: (id: string, url: string) => CommonActions;
};

const mapStateToProps = (state: State, { linkId }: OwnProps): StateProps => ({
    link: getLinkById(state, linkId)
});

export default connect<StateProps, DispatchProps, OwnProps, State>(
    mapStateToProps,
    {
        loadLinkPreview
    }
)(LinkPreview);
