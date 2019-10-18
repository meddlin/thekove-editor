import React, { useState, useEffect } from 'react';
import { store } from '../../_helpers';
import { connect } from 'react-redux';
import { postActions } from '../../_actions';
import { PostDetail } from '../../components/Posts/PostDetail';
import { DefaultButton } from 'office-ui-fabric-react';

const BrowsePosts = (props) => {
    const { posts, loading, postResult } = props;
    const [currPage, setCurrPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        store.dispatch(postActions.get());
    }, [postResult]);

    const handleNextPage = () => {
        store.dispatch(postActions.getPage( (currPage + 1), pageSize ));
        setCurrPage( (currPage + 1) );
    }

    const handlePrevPage = () => {
        const { currPage, pageSize } = this.state;

        if (currPage > 1) {
            store.dispatch(postActions.getPage( (currPage - 1), pageSize ));
            this.setState({ currPage: (currPage - 1) });
        } else {
            store.dispatch(postActions.getPage( 1, pageSize ));
        } 
    }

    return (
        <div style={{ margin: '20px'}}>
            <h2>Browse Posts</h2>
            <span>page: {currPage}, size: {pageSize}</span>
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

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <DefaultButton onClick={handlePrevPage}>Prev</DefaultButton>
                <DefaultButton onClick={handleNextPage}>Next</DefaultButton>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    const { posts } = state;

    return {
        loading: (posts && posts.loading) || false,
        posts: (posts && posts.posts) || [],
        postResult: (posts && posts.postResult)
    }
}

const connectedBrowser = connect(mapStateToProps)(BrowsePosts);
export { connectedBrowser as BrowsePosts };