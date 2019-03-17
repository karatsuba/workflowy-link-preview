import * as React from 'react'
import {connect} from 'react-redux';
import LinkPreviewPortal from '../components/LinkPreviewPortal';

// import {loadLinkPreview, mutationsObserve} from '../actions';

class LinkObserver extends React.Component<any, any> {

    componentDidMount() {
        this.props.mutationsObserve();
    }

    // shouldComponentUpdate(nextProps:any) {
    //     // compare ids
    //     console.log(JSON.stringify(this.props.links));
    //     console.log(JSON.stringify(nextProps.links));
    //     return true;
    // }

    render(): JSX.Element[] | null {
        // console.log('RENDER: LinkObserver', this.props);
        if(!this.props.links) {
            return null;
        }
        
        return Object.values(this.props.links).length > 0 ? Object.values(this.props.links).map((link:any) => {
            return <LinkPreviewPortal key={link.id} {...link} loadLinkPreview={this.props.loadLinkPreview} />
        }) : null
    }

}

const mapStateToProps = (state: any, ownProps: any) => ({
    links: state.links
})

const mutationsObserve = () => { 
    return {
        type: 'MUTATION_OBSERVER__OBSERVE'
    }
};

export default connect(mapStateToProps, {
    mutationsObserve
})(LinkObserver)