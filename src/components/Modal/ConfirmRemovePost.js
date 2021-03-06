import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { postActions } from '../../_actions';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { store } from '../../_helpers';

const ConfirmRemovePost = (props) => {
    const { postValue, postResult, show } = props;
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const { show, postResult, modalCallback } = props;
        setShowModal(show);

        if (postResult) {
            setShowModal(false);
            modalCallback(false);
        }
    }, [show, postResult, showModal]);

    const handleHideModal = () => {
        const { modalCallback } = props;
        
        setShowModal(false);
        modalCallback(false);
    }

    const handleDeletePost = () => {
        let postId = props.postId;

        store.dispatch(postActions.deletePost(postId));
    }

    return (
        <Modal isOpen={showModal} onDismiss={handleHideModal}>
            <div style={{ height: '200px', width: '600px', margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <section>
                    <h3>Delete a post</h3>

                    <p>{postValue}</p>
                </section>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <DefaultButton onClick={handleHideModal}>Cancel</DefaultButton>
                    <PrimaryButton onClick={handleDeletePost}>Yes, delete</PrimaryButton>
                </div>
            </div>
        </Modal>
    );
};

function mapStateToProps(state) {
    const { posts } = state;

    return {
        postResult: (posts ? posts.postDeleted : false)
    };
}

const connectedConfirmRemovePost = connect(mapStateToProps)(ConfirmRemovePost);
export { connectedConfirmRemovePost as ConfirmRemovePost };