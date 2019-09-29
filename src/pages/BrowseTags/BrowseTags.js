import React, { useState, useEffect } from 'react';
import { store } from '../../_helpers';
import { tagActions } from '../../_actions';
import { connect } from 'react-redux';
import TagDetail from '../../components/Tags/TagDetail';
import { TagCreateForm } from '../../components/Tags/TagCreateForm';
import { PrimaryButton } from 'office-ui-fabric-react';

const BrowseTags = (props) => {
    const { tags, loading } = props;

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        store.dispatch(tagActions.getTags());
    }, []);

    const handleNewTagClick = () => {
        setRedirect(true);
    }

    if (redirect) {
        return (<TagCreateForm />);
    } else {
        return (
            <div style={{ margin: '20px'}}>
                <h3>Browse Tags</h3>
                <PrimaryButton onClick={handleNewTagClick}>New Tag</PrimaryButton>
                <div>
                    {loading ? <h3>Loading...</h3> : 
                        (tags && tags.length > 0 ? 
                            tags.map(t => {
                                return (
                                    <div key={t.id}>
                                        <TagDetail tag={t} />
                                    </div>
                                );
                            }) : <span>No posts to show.</span>
                        )
                    }
                </div>
            </div>
        );
    }        
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