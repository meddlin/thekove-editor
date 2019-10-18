import React, { useState, useEffect } from 'react';
import { store } from '../../_helpers';
import { tagActions } from '../../_actions';
import { connect } from 'react-redux';
import { TagDetail } from '../../components/Tags/TagDetail';
import { TagCreateForm } from '../../components/Tags/TagCreateForm';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react';

const BrowseTags = (props) => {
    const { tags, loading, tagResult } = props;

    const [redirect, setRedirect] = useState(false);
    const [currPage, setCurrPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        store.dispatch(tagActions.getTags());
    }, [tagResult]);

    const handleNewTagClick = () => {
        setRedirect(true);
    }

    const handleNextPage = () => {
        store.dispatch(tagActions.getPage((currPage + 1), pageSize));
        setCurrPage(currPage + 1);
    }

    const handlePrevPage = () => {
        if (currPage > 1) {
            store.dispatch(tagActions.getPage( (currPage - 1), pageSize ));
            setCurrPage(currPage - 1);
        } else {
            store.dispatch(tagActions.getPage(1, pageSize));
        }
    }

    if (redirect) {
        return (<TagCreateForm />);
    } else {
        return (
            <div style={{ margin: '20px'}}>
                <h3>Browse Tags</h3>

                <div>page: {currPage}, size: {pageSize}</div>
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

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <DefaultButton onClick={handlePrevPage}>Prev</DefaultButton>
                    <DefaultButton onClick={handleNextPage}>Next</DefaultButton>
                </div>
            </div>
        );
    }        
};

function mapStateToProps(state) {
    const { tags } = state;

    return {
        loading: (tags && tags.loading) || false,
        tags: (tags && tags.tags) || [],
        tagResult: (tags && tags.tagResult)
    }
}

const connectedBrowseTags = connect(mapStateToProps)(BrowseTags);
export { connectedBrowseTags as BrowseTags };