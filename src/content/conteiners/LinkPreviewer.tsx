import * as React from 'react';
import { connect } from 'react-redux';
import LinkPreview from './LinkPreview';
import LinkPreviewPortal from '../components/LinkPreviewPortal';
import { CommonActions } from '../../common/actions/types';
import { observeMutations } from '../../common/actions';
import { State } from '../../background/reducers';
import { getLinksIds } from '../selectors';

class LinkPreviewer extends React.Component<LinkPreviewerProps> {
    componentDidMount(): void {
        this.props.observeMutations();
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
    observeMutations: () => CommonActions;
};

type LinkPreviewerProps = StateProps & DispatchProps;

export default connect<StateProps, DispatchProps, {}, State>(mapStateToProps, {
    observeMutations
})(LinkPreviewer);
