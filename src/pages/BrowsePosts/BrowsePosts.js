import React, { Component } from 'react';
import { store } from '../../_helpers';
import { connect } from 'react-redux';
import { postActions } from '../../_actions';
import PostDetail from '../../components/Posts/PostDetail';
import { DefaultButton } from 'office-ui-fabric-react';

class BrowsePosts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currPage: 1,
            pageSize: 10
        }

        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePrevPage = this.handlePrevPage.bind(this);
    }

    componentDidMount() {
        store.dispatch(postActions.getMostRecent());
    }

    handleNextPage() {
        const { currPage, pageSize } = this.state;

        store.dispatch(postActions.getPage( (currPage + 1), pageSize ));
        this.setState({ currPage: (currPage + 1) });
    }

    handlePrevPage() {
        const { currPage, pageSize } = this.state;

        if (currPage > 1) {
            store.dispatch(postActions.getPage( (currPage - 1), pageSize ));
            this.setState({ currPage: (currPage - 1) });
        }
        else {
            store.dispatch(postActions.getPage( 1, pageSize ));
        } 
    }
    
    render() {
        const { posts, loading } = this.props;
        const { currPage, pageSize } = this.state;

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
                    <DefaultButton onClick={this.handlePrevPage}>Prev</DefaultButton>
                    <DefaultButton onClick={this.handleNextPage}>Next</DefaultButton>
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