import * as React from 'react';
import { Action } from 'redux';
import { connect } from 'react-redux';
import LinkPreview from '../components/LinkPreview';
import LinkPreviewPortal from '../components/LinkPreviewPortal';
import {
    loadLinkPreview,
    observeMutations,
    ActionWithPayload,
    HttpRequestPayload,
    LinkPreviewPayload
} from '../actions';
import Link from '../models/Link';

type LinkPreviewerProps = {
    links: Link[];
    observingMutations: boolean;
    observeMutations: () => Action;
    loadLinkPreview: (
        payload: LinkPreviewPayload
    ) => ActionWithPayload<HttpRequestPayload>;
};

class LinkPreviewer extends React.Component<LinkPreviewerProps> {
    componentDidMount() {
        this.props.observeMutations();
    }

    render(): JSX.Element[] | null {
        const { links = {}, loadLinkPreview } = this.props;
        const linksValues = Object.values(links);

        return linksValues.length > 0
            ? linksValues.map((link: any) => (
                  <LinkPreviewPortal key={link.id} id={link.id}>
                      <LinkPreview
                          {...link}
                          loadLinkPreview={loadLinkPreview}
                      />
                  </LinkPreviewPortal>
              ))
            : null;
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    links: state.links,
    observingMutations: state.observingMutations
});

export default connect(
    mapStateToProps,
    {
        loadLinkPreview,
        observeMutations
    }
)(LinkPreviewer);
