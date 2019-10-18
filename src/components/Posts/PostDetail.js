import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { store } from '../../_helpers';
import { connect } from 'react-redux';
import { postActions } from '../../_actions';
import { Redirect } from 'react-router-dom';
import { ConfirmRemovePost } from '../Modal/ConfirmRemovePost';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { DefaultButton } from 'office-ui-fabric-react';

const StyledPostDetail = styled.div`
    margin: 10px 0 10px 0;
    padding: 5px;
    max-width: 60%;
    cursor: pointer;

    .left:hover {
        background-color: lightgray;
        border: 1px solid gray;
    }

    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const PostDetail = (props) => {
    const { post } = props;
    const [showModal, setShowModal] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [toggleChecked, setToggleChecked] = useState(false);

    useEffect(() => {
        updateToggleValue(props);
    }, []);

    const handleClick = () => {
        setRedirect(true);
    }

    const handleShowModal = () => {
        setShowModal(true);
    }

    const handleHideModal = (value) => {
        setShowModal(value);
    }

    const handleModeToggle = (ev, checked) => {
        if (toggleChecked) store.dispatch(postActions.unpublishPost(post.id));
        else store.dispatch(postActions.publishPost(post.id));
    }

    const updateToggleValue = (props) => {
        const { post } = props;

        setToggleChecked(post.mode);
    }

    if (redirect) return (<Redirect push to={`/edit/${post.id}`} />);

    return (
        <StyledPostDetail>
            <section className="left" onClick={handleClick}>
                <div>
                    <b>{post.title || 'no title'}</b>
                </div>
                <div>
                    <span>Slug: </span>
                    {post.slug || 'no slug'}
                </div>
                <div>
                    <span>Created At: </span>
                    <span>{post.createdAt || 'no created date'}</span>
                </div>
                <div>
                    <span>Updated At: </span>
                    <span>{post.updatedAt || 'no updated date'}</span>
                </div>
            </section>
            <section className="right">
                <DefaultButton>Preview</DefaultButton>
                <DefaultButton onClick={handleShowModal}>Delete</DefaultButton>
                <Toggle 
                    label="Published" 
                    checked={toggleChecked} 
                    onText="Yes"
                    offText="No"
                    onChange={handleModeToggle}
                    inlineLabel />
            </section>

            <ConfirmRemovePost postId={post.id} postValue={post.title} show={showModal} modalCallback={handleHideModal} />
        </StyledPostDetail>
    );
};

function mapStateToProps(state) {
    const { posts } = state;

    return {
        
    }
};

const connectedPostDetail = connect(mapStateToProps)(PostDetail);
export { connectedPostDetail as PostDetail };