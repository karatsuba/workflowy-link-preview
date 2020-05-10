import * as React from 'react';
import { connect } from 'react-redux';
import { observe } from 'redux-dom-mutation-observer';
import LinkPreview from './LinkPreview';
import LinkPreviewPortal from '../components/LinkPreviewPortal';
import { CommonActions } from '../../common/actions/types';
import { State } from '../../background/reducers';
import { getLinksIds } from '../selectors';

class LinkPreviewer extends React.Component<LinkPreviewerProps> {
    componentDidMount(): void {
        this.props.observe('app', { childList: true, subtree: true });
    }

    shouldComponentUpdate(nextProps: LinkPreviewerProps): boolean {
        return (
            this.props.linksIds.length !== nextProps.linksIds.length ||
            this.props.linksIds.every((id, i) => id !== nextProps.linksIds[i])
        );
    }

    render(): JSX.Element[] {
        const { linksIds } = this.props;
        return linksIds.map(id => (
            <LinkPreviewPortal key={id} id={id}>
                <LinkPreview linkId={id} />
            </LinkPreviewPortal>
        ));
    }
}

const mapStateToProps = (state: State): StateProps => ({
    linksIds: getLinksIds(state)
});

type StateProps = {
    linksIds: string[];
};

type DispatchProps = {
    observe: (id: string, options: MutationObserverInit) => CommonActions;
};

type LinkPreviewerProps = StateProps & DispatchProps;

export default connect<StateProps, DispatchProps, {}, State>(mapStateToProps, {
    observe
})(LinkPreviewer);
