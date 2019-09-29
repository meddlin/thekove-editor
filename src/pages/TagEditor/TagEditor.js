import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { store } from '../../_helpers';
// import { postActions } from '../../_actions';
import { TagEditorForm } from '../../components/Tags/TagEditorForm';
import { TagPreviewer } from '../../components/Tags/TagPreviewer';

import styles from './TagEditor.module.scss';

class TagEditor extends Component {
    componentDidMount() {
        const { match } = this.props;

        // if ((match && match.params) && Object.keys(match.params).length !== 0) 
        //     store.dispatch(postActions.getPost(match.params.id));
    }
    
    render() {
        const { match, initialTag } = this.props;

        return (
            <div>
                <h2>Editor</h2>
                
                <div className={styles.horizontalView}>
                    <div className={styles.separators}>
                        {
                            <TagEditorForm initialTag={initialTag} />
                        }
                    </div>

                    <div className={styles.separators}>
                        <TagPreviewer />
                    </div>
                </div>
            </div>
        );
    }
};

function mapStateToProps(state) {
    const { tags } = state;
    return {
        loading: (tags && tags.loading) ? tags.loading : false,
        initialTag: (tags && tags.tag) ? tags.tag : {}
    };
};

const connectedTagEditor = withRouter(connect(mapStateToProps)(TagEditor));
export { connectedTagEditor as TagEditor };