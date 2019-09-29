import React, { Component } from 'react';
import { connect } from 'react-redux';
import renderHTML from 'react-render-html';

import styles from './Previewer.module.scss';

class Previewer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showRendered: true
        }
    }

    toggleContentView = () => {
        const { showRendered } = this.state;
        this.setState({ showRendered: !showRendered });
    }

    render() {
        const { showRendered } = this.state;
        const { original, content } = this.props;

        return (
            <div>
                <div className={styles.horizontalView}>
                    <div onClick={this.toggleContentView}>Markdown</div>
                    <div onClick={this.toggleContentView}>Rendered (HTML)</div>
                </div>
                {showRendered && (content && original) ? renderHTML(content) : original }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        original: (state.editor && state.editor.orig) || '',
        content: (state.editor && state.editor.content) || ''
    };
}

const connectedPreviewer = connect(mapStateToProps)(Previewer);
export { connectedPreviewer as Previewer };