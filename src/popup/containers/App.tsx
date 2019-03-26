import React from 'react';
import {connect} from 'react-redux';
import actionCreators from '../actions';

class App extends React.Component<any, any> {

    render(): JSX.Element | null {
        return (
            <div style={{width: '250px'}}>
                <h3>Welcome to Workflowy Link Preview</h3>
                <br/>
                <p>Extension is {this.props.observingMutations ? 'enabled' : 'disabled'}.</p>
                <br/>
                <button onClick={this.props.mutationsObserveToggle}>Toggle observing</button>
            </div>
        );
    }
    
}

const mapStateToProps = (state: any, ownProps: any) => ({
    links: state.links,
    observingMutations: state.observingMutations
})

export default connect(mapStateToProps, actionCreators)(App)