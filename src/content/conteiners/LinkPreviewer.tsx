import * as React from 'react';
import { Action } from 'redux';
import { connect } from 'react-redux';
import LinkPreview from '../components/LinkPreview';
import LinkPreviewPortal from '../components/LinkPreviewPortal';
import { observeMutations, ActionWithPayload } from '../../common/actions';
import { loadLinkPreview, LinkPreviewPayload } from '../../common/actions/link';
import Link from '../../common/models/Link';
import { State } from '../../background/reducers';

class LinkPreviewer extends React.Component<LinkPreviewerProps> {
    componentDidMount() {
        this.props.observeMutations();
    }

    render(): JSX.Element[] {
        const { links } = this.props;
        return links.map((link: Link) => (
            <LinkPreviewPortal key={link.id} id={link.id}>
                <LinkPreview {...link} onLoadLinkPreview={this.onLoadLinkPreview} />
            </LinkPreviewPortal>
        ));
    }

    onLoadLinkPreview = (id: string, url: string) => this.props.loadLinkPreview(id, url);
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
    observeMutations: () => Action;
    loadLinkPreview: (id: string, url: string) => ActionWithPayload<LinkPreviewPayload>;
};

type LinkPreviewerProps = StateProps & DispatchProps;

export default connect<StateProps, DispatchProps, {}, State>(
    mapStateToProps,
    {
        loadLinkPreview,
        observeMutations
    }
)(LinkPreviewer);
