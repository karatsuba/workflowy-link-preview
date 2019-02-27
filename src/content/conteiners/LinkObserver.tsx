import * as React from 'react'
import {connect} from 'react-redux';

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

    render(): JSX.Element {
        console.log('HELLO FROM RENDERED APP');
        return (<div></div>)
    }

}

const mapStateToProps = (state: any, ownProps: any) => ({
    links: state.links,
    observer: ownProps.observer
})

export default connect(mapStateToProps)(LinkObserver)