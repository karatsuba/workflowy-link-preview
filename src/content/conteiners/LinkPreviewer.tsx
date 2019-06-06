import * as React from 'react';
import { connect } from 'react-redux';
import LinkPreview from '../components/LinkPreview';
import LinkPreviewPortal from '../components/LinkPreviewPortal';
import { loadLinkPreview, mutationsObserve } from '../actions';

class LinkObserver extends React.Component<any, any> {
    componentDidMount() {
        this.props.mutationsObserve();
    }

    render(): JSX.Element[] | null {
        const { links = {}, loadLinkPreview } = this.props;

        return Object.values(links).length > 0
            ? Object.values(links).map((link: any, index) => {
                  return (
                      <LinkPreviewPortal key={link.id} id={link.id}>
                          <LinkPreview
                              {...link}
                              loadLinkPreview={loadLinkPreview}
                          />
                      </LinkPreviewPortal>
                  );
              })
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
        mutationsObserve
    }
)(LinkObserver);
