import React, { useState } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

const StyledTagDetail = styled.div`
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

const TagDetail = (props) => {
    const { tag } = props;
    const [redirect, setRedirect] = useState(false);

    const handleClick = () => {
        setRedirect(true);
    }

    if (redirect) return (<Redirect push to={`/edit/tag/${tag.id}`} />);

    return (
        <StyledTagDetail onClick={handleClick}>
            <section className="left">
                <div>
                    <span>Name: </span>
                    <span>{tag.name || 'no name'}</span>
                </div>
                <div>
                    <span>Slug: </span>
                    {tag.slug || 'no slug'}
                </div>
                <div>
                    <span>Is Section: </span>
                    <span>{tag.isSection || 'blank isSection'}</span>
                </div>
            </section>
            <section className="right">
                <div>
                    <span>Created At: </span>
                    <span>{tag.createdAt || 'no created date'}</span>
                </div>
                <div>
                    <span>Updated At: </span>
                    <span>{tag.updatedAt || 'no updated date'}</span>
                </div>
            </section>
        </StyledTagDetail>
    );
};

export default TagDetail;