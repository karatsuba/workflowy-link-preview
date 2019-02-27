import * as React from 'react'
import {connect} from 'react-redux';
import LinkPreviewPortal from '../components/LinkPreviewPortal';

class LinkObserver extends React.Component<any, any> {

    componentDidMount() {
        console.log('GOING OT SUBCRIBE TO OBSERVER');
        this.props.observer.observe();
    }

    shouldComponentUpdate(nextProps:any) {
        // compare ids
        // console.log(JSON.stringify(this.props.links));
        // console.log(JSON.stringify(nextProps.links));
        // console.log(this);
        return true;
    }

    render(): JSX.Element[] | null {
        console.log('HELLO FROM RENDERED APP');
        return this.props.links.getSize() ? [... this.props.links.getLinks()].map( ([key, link]) => {
            return <LinkPreviewPortal key={key} link={link} observer={this.props.observer} />
        }): null;
    }

}

const mapStateToProps = (state: any, ownProps: any) => ({
    links: state.links,
    observer: ownProps.observer
})

export default connect(mapStateToProps)(LinkObserver)