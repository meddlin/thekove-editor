import React, { Component } from 'react';
import styles from './NavigationBar.module.scss';
import { Link } from 'react-router-dom';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { CreateDocument } from '../Modal/CreateDocument';

class NavigationBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            postTitle: ''
        }
    }

    handleShowModal = () => {
        this.setState({ showModal: true });
    }

    handleHideModal = (value) => {
        this.setState({ showModal: value });
    }

    render() {
        const { showModal } = this.state;

        return (
            <div className={styles.horizontal}>
                <div>
                    <Link to="/browse"><DefaultButton>Browse Posts</DefaultButton></Link>
                    <Link to="/browse/tags"><DefaultButton>Browse Tags</DefaultButton></Link>
                </div>
                <PrimaryButton onClick={this.handleShowModal}>Create Post</PrimaryButton>

                <CreateDocument show={showModal} modalCallback={this.handleHideModal} />
            </div>
        );
    }
};

export default NavigationBar;