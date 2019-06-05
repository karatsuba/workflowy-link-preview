import React from 'react';

class LinkPreview extends React.Component<any, any> {
    componentDidMount() {
        const { id, url } = this.props;
        this.props.loadLinkPreview({ id, url });
    }

    render(): JSX.Element {
        const { isFetching, title, image, description } = this.props;

        if (isFetching) {
            return <div>Loading...</div>;
        }

        return (
            <div className='link-preview' style={{ userSelect: 'text' }}>
                <div className='image'>
                    <img src={image} alt='' style={{ maxWidth: '200px' }} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        );
    }
}

export default LinkPreview;
