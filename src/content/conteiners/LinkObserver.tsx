import * as React from 'react';
import { connect } from 'react-redux';
import LinkPreviewPortal from '../components/LinkPreviewPortal';
import {
    loadLinkPreview,
    mutationsObserve,
    mutationsDisconnect
} from '../actions';

class LinkObserver extends React.Component<any, any> {
    componentDidMount() {
        this.props.mutationsObserve();
    }

    render(): JSX.Element[] | null {
        // console.log('RENDER: LinkObserver', this.props);
        const { links = {}, loadLinkPreview } = this.props;

        return Object.values(links).length > 0
            ? Object.values(links).map((link: any) => {
                  return (
                      <LinkPreviewPortal
                          key={link.id}
                          {...link}
                          loadLinkPreview={loadLinkPreview}
                      />
                  );
              })
            : null;
    }

    // TODO: handle enbling/disabling later
    // componentDidUpdate(prevProps: any) {
    //     if(!this.props.observingMutations) {
    //         // console.log('LinkObserver: mutationsDisconnect')
    //         this.props.mutationsDisconnect();
    //     }
    //     if(this.props.observingMutations && prevProps.observingMutations !== this.props.observingMutations) {
    //         // console.log('LinkObserver: mutationsObserve')
    //         this.props.mutationsObserve();
    //     }
    // }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    links: state.links,
    observingMutations: state.observingMutations
});

export default connect(
    mapStateToProps,
    {
        loadLinkPreview,
        mutationsObserve,
        mutationsDisconnect
    }
)(LinkObserver);
