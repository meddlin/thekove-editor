import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { store } from '../../_helpers';
import { postActions } from '../../_actions';
import { EditorForm } from './EditorForm';
import { Previewer } from '../../components/Previewer/Previewer';

import styles from './Editor.module.scss';

class Editor extends Component {
    componentDidMount() {
        const { match } = this.props;

        if ((match && match.params) && Object.keys(match.params).length !== 0) 
            store.dispatch(postActions.getPost(match.params.id));
    }
    
    render() {
        const { match, initialPost } = this.props;

        return (
            <div>
                <h2>Editor</h2>
                
                <div className={styles.horizontalView}>
                    <div className={styles.separators}>
                        {
                            (match && match.params) && Object.keys(match.params).length === 0 ? 
                            <EditorForm /> : 
                            <EditorForm initialPost={initialPost} />
                        }
                    </div>

                    <div className={styles.separators}>
                        <Previewer />
                    </div>
                </div>
            </div>
        );
    }
};

function mapStateToProps(state) {
    const { posts } = state;
    return {
        loading: (posts && posts.loading) ? posts.loading : false,
        initialPost: (posts && posts.post) ? posts.post : {}
    };
};

const connectedEditor = withRouter(connect(mapStateToProps)(Editor));
export { connectedEditor as Editor };