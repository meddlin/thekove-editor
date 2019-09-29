import React, { useEffect } from 'react';
import { store } from '../../_helpers';
import { connect } from 'react-redux';
import TagDetail from '../../components/Tags/TagDetail';

const BrowseTags = (props) => {
    const { tags, loading } = props;

    useEffect(() => {
        //store.dispatch(postActions.getList());
    }, []);

    return (
        <div style={{ margin: '20px'}}>
            <h3>Browse Tags</h3>
            <div>
                {loading ? <h3>Loading...</h3> : 
                    (tags && tags.length > 0 ? 
                        tags.map(t => {
                            return (
                                <div key={t.id}>
                                    <TagDetail tag={t} />
                                </div>
                            );
                        }) : <span>No posts to show.</span>)
                }
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    const { tags } = state;

    return {
        loading: (tags && tags.loading) || false,
        tags: (tags && tags.tags) || []
    }
}

const connectedBrowseTags = connect(mapStateToProps)(BrowseTags);
export { connectedBrowseTags as BrowseTags };