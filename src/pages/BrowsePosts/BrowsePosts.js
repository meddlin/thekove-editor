import React, { Component } from 'react';
import { store } from '../../_helpers';
import { connect } from 'react-redux';
import { postActions } from '../../_actions';
import PostDetail from '../../components/Posts/PostDetail';

class BrowsePosts extends Component {
    componentDidMount() {
        store.dispatch(postActions.getList());
    }
    
    render() {
        const { posts, loading } = this.props;

        return (
            <div style={{ margin: '20px'}}>
                <h2>Browse Posts</h2>
                <div>
                    {loading ? <h3>Loading...</h3> : 
                        (posts && posts.length > 0 ? 
                            posts.map(p => {
                                return (
                                    <div key={p.id}>
                                        <PostDetail post={p} />
                                    </div>
                                );
                            }) : <span>No posts to show.</span>)
                    }
                </div>
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        loading: (state && state.posts && state.posts.loading) || false,
        posts: (state && state.posts && state.posts.posts) || []
    }
}

const connectedBrowser = connect(mapStateToProps)(BrowsePosts);
export { connectedBrowser as BrowsePosts };