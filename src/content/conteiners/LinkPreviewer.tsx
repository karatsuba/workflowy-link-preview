import * as React from 'react';
import { Action } from 'redux';
import { connect } from 'react-redux';
import LinkPreview from '../components/LinkPreview';
import LinkPreviewPortal from '../components/LinkPreviewPortal';
import {
    loadLinkPreview,
    observeMutations,
    ActionWithPayload,
    LinkPreviewPayload
} from '../actions';
import Link from '../../common/models/Link';

type LinkPreviewerProps = {
    links: Link[];
    observingMutations: boolean;
    observeMutations: () => Action;
    loadLinkPreview: (id: string, url: string) => ActionWithPayload<LinkPreviewPayload>;
};

class LinkPreviewer extends React.Component<LinkPreviewerProps> {
    componentDidMount() {
        this.props.observeMutations();
    }

    render(): JSX.Element[] {
        const { links, loadLinkPreview } = this.props;

        return links.map((link: any) => (
            <LinkPreviewPortal key={link.id} id={link.id}>
                <LinkPreview {...link} loadLinkPreview={loadLinkPreview} />
            </LinkPreviewPortal>
        ));
    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    // console.log(state);
    return {
        links: Object.values<Link>(state.links),
        observingMutations: state.observingMutations
    };
};

export default connect(
    mapStateToProps,
    {
        loadLinkPreview,
        observeMutations
    }
)(LinkPreviewer);
