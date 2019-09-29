import React, { useState } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

const StyledPostDetail = styled.div`
    margin: 10px 0 10px 0;
    padding: 5px;
    max-width: 40%;
    cursor: pointer;

    :hover {
        background-color: lightgray;
        border: 1px solid gray;
    }

    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const PostDetail = (props) => {
    const { post } = props;
    const [redirect, setRedirect] = useState(false);

    const handleClick = () => {
        setRedirect(true);
    }

    if (redirect) return (<Redirect push to={`/edit/${post.id}`} />);

    return (
        <StyledPostDetail onClick={handleClick}>
            <section className="left">
                <div>
                    <span>Title: </span>
                    <span>{post.title || 'no title'}</span>
                </div>
                <div>
                    <span>Slug: </span>
                    {post.slug || 'no slug'}
                </div>
                <div>
                    <span>Description: </span>
                    <span>{post.description || 'no description'}</span>
                </div>
            </section>
            <section className="right">
                <div>
                    <span>Created At: </span>
                    <span>{post.createdAt || 'no created date'}</span>
                </div>
                <div>
                    <span>Updated At: </span>
                    <span>{post.updatedAt || 'no updated date'}</span>
                </div>
                <div>
                    <span>Mode: </span>
                    <span>{post.mode || 'no mode found'}</span>
                </div>
            </section>
        </StyledPostDetail>
    );
};

export default PostDetail;