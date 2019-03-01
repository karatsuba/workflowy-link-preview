import * as React from 'react'
import {connect} from 'react-redux';
import LinkPreviewPortal from '../components/LinkPreviewPortal';

class LinkObserver extends React.Component<any, any> {

    componentDidMount() {
        this.props.dispatch({
            type: 'MUTATION_OBSERVER__OBSERVE'
        });
    }

    shouldComponentUpdate(nextProps:any) {
        // compare ids
        // console.log(JSON.stringify(this.props.links));
        // console.log(JSON.stringify(nextProps.links));
        return true;
    }

    render(): JSX.Element[] | null {
        console.log('RENDER: LinkObserver', this.props);
        return this.props.links.getSize() ? [... this.props.links.getLinks()].map( ([key, link]) => {
            return <LinkPreviewPortal key={key} link={link} />
        }) : null;
    }

}

const mapStateToProps = (state: any, ownProps: any) => ({
    links: state.links
})

export default connect(mapStateToProps)(LinkObserver)