import React, { useState, useEffect } from 'react';
import { tagActions } from '../../_actions';
import { store } from '../../_helpers';
import { connect } from 'react-redux';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';

const ConfirmRemoveTag = (props) => {
    const { tagValue, tagResult, show } = props;
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const { show, tagResult, modalCallback } = props;
        setShowModal(show);

        if (tagResult) {
            setShowModal(false);
            modalCallback(false);
        }
    }, [show, tagResult, showModal]);

    const handleHideModal = () => {
        const { modalCallback } = props;
        
        setShowModal(false);
        modalCallback(false);
    }

    const handleDeleteTag = () => {
        let tagId = props.tagId;

        store.dispatch(tagActions.deleteTag(tagId));
    }

    return (
        <Modal isOpen={showModal} onDismiss={handleHideModal}>
            <div style={{ height: '200px', width: '600px', margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <section>
                    <h3>Delete a tag</h3>

                    <p>{tagValue}</p>
                </section>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <DefaultButton onClick={handleHideModal}>Cancel</DefaultButton>
                    <PrimaryButton onClick={handleDeleteTag}>Yes, delete</PrimaryButton>
                </div>
            </div>
        </Modal>
    );
};

function mapStateToProps(state) {
    const { tags } = state;
    
    return {
        tagResult: (tags ? tags.tagDeleted : false)
    };
}

const connectedConfirmRemoveTag = connect(mapStateToProps)(ConfirmRemoveTag);
export { connectedConfirmRemoveTag as ConfirmRemoveTag };