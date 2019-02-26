import * as React from 'react'

class Component extends React.Component<any, any> {
    render(): JSX.Element {
        console.log('HELLO FROM RENDERED APP');
        return (<div></div>)
    }
}

export { 
    Component
};