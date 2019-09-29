import React, { useState, useEffect } from 'react';
import { editorActions } from '../../_actions';
import { store } from '../../_helpers';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';

const CreateDocument = (props) => {
    const [title, setTitle] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [successfulCreate, setSuccessfulCreate] = useState(false);

    useEffect(() => {
        const { show, postResult } = props;
        setShowModal(show);

        if (postResult) 
            setSuccessfulCreate(true);
    }, [props.show, showModal, props.postResult]);

    const updateTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleCreatePost = () => {
        let postDocument = {
            title: title,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    
        store.dispatch(editorActions.createPost(postDocument));
    }
    
    const handleHideModal = () => {
        const { modalCallback } = props;
        
        setShowModal(false);
        modalCallback(false);
    }

    if (successfulCreate) {
        const { postResult } = props;

        return (<Redirect push to={`/edit/${postResult}`} />);
    }

    return (
        <Modal isOpen={showModal} onDismiss={handleHideModal}>
            <div style={{ height: '200px', width: '600px', margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <section>
                    <h3>Create a new post</h3>
                    <input 
                        type="text" 
                        placeholder="Title here..." 
                        onChange={(event) => updateTitle(event)}
                        style={{ lineHeight: '24px', fontSize: '20px' }}
                    />
                </section>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <DefaultButton onClick={handleHideModal}>Cancel</DefaultButton>
                    <PrimaryButton onClick={handleCreatePost}>Create Post</PrimaryButton>
                </div>
            </div>
        </Modal>
    );
};

function mapStateToProps(state) {
    const { editor } = state;
    
    return {
        postResult: (editor ? editor.createdPost : '')
    };
}

const connectedCreateDocument = connect(mapStateToProps)(CreateDocument);
export { connectedCreateDocument as CreateDocument };