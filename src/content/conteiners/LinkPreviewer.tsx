import * as React from 'react';
import { connect } from 'react-redux';
import LinkPreview from '../components/LinkPreview';
import LinkPreviewPortal from '../components/LinkPreviewPortal';
import { CommonActions } from '../../common/actions/types';
import { loadLinkPreview } from '../../common/actions/link';
import { observeMutations } from '../../common/actions';
import Link from '../../common/models/Link';
import { State } from '../../background/reducers';

class LinkPreviewer extends React.PureComponent<LinkPreviewerProps> {
    componentDidMount() {
        this.props.observeMutations();
    }

    onLoadLinkPreview = (id: string, url: string) => this.props.loadLinkPreview(id, url);

    render() {
        const { links } = this.props;
        return links.map((link: Link) => (
            <LinkPreviewPortal key={link.id} id={link.id}>
                <LinkPreview {...link} onLoadLinkPreview={this.onLoadLinkPreview} />
            </LinkPreviewPortal>
        ));
    }
}

const mapStateToProps = (state: State): StateProps => {
    return {
        links: Object.values<Link>(state.links),
        observingMutations: state.observingMutations
    };
};

type StateProps = {
    links: Link[];
    observingMutations: boolean;
};

type DispatchProps = {
    observeMutations: () => CommonActions;
    loadLinkPreview: (id: string, url: string) => CommonActions;
};

type LinkPreviewerProps = StateProps & DispatchProps;

export default connect<StateProps, DispatchProps, {}, State>(
    mapStateToProps,
    {
        loadLinkPreview,
        observeMutations
    }
)(LinkPreviewer);
