import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { store } from '../../_helpers';
import { connect } from 'react-redux';
import { tagActions } from '../../_actions';
import { Redirect } from 'react-router-dom';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { ConfirmRemoveTag } from '../Modal/ConfirmRemoveTag';
import { DefaultButton } from 'office-ui-fabric-react';

const StyledTagDetail = styled.div`
    margin: 10px 0 10px 0;
    padding: 5px;
    max-width: 40%;
    
    .left { 
        cursor: pointer;
    }

    .left:hover {
        background-color: lightgray;
        border: 1px solid gray;
    }

    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const TagDetail = (props) => {
    const { tag, sectionCreated } = props;
    const [redirect, setRedirect] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [toggleChecked, setToggleChecked] = useState(false);

    useEffect(() => {
        updateToggleValue(props);
    }, [sectionCreated])

    const handleClick = () => {
        setRedirect(true);
    }

    const handleSectionToggle = (ev, checked) => {
        if (toggleChecked) store.dispatch(tagActions.removeSection(tag.id));
        else store.dispatch(tagActions.createSection(tag.id));
    }

    const handleShowModal = () => {
        setShowModal(true);
    }

    const handleHideModal = (value) => {
        setShowModal(value);
    }

    const updateToggleValue = (props) => {
        const { tag } = props;
        
        setToggleChecked(tag.isSection);
    }

    if (redirect) return (<Redirect push to={`/edit/tag/${tag.id}`} />);

    return (
        <StyledTagDetail>
            <section className="left" onClick={handleClick}>
                <div>
                    <span>Name: </span>
                    <span>{tag.name || 'no name'}</span>
                </div>
                <div>
                    <span>Slug: </span>
                    {tag.slug || 'no slug'}
                </div>
                <div>
                    <span>Created At: </span>
                    <span>{tag.createdAt || 'no created date'}</span>
                </div>
                <div>
                    <span>Updated At: </span>
                    <span>{tag.updatedAt || 'no updated date'}</span>
                </div>
            </section>
            <section className="right">
                <DefaultButton onClick={handleShowModal}>Delete</DefaultButton>
                <Toggle 
                    label="Is a Section" 
                    checked={toggleChecked} 
                    onText="Yes"
                    offText="No"
                    onChange={handleSectionToggle}
                    inlineLabel />
            </section>

            <ConfirmRemoveTag tagId={tag.id} tagValue={tag.name} show={showModal} modalCallback={handleHideModal} />
        </StyledTagDetail>
    );
};

function mapStateToProps(state) {
    const { tags } = state;

    return {
        sectionCreated: tags.sectionCreated
    }
};

const connectedTagDetail = connect(mapStateToProps)(TagDetail);
export { connectedTagDetail as TagDetail };