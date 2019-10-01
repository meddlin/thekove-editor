import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { withFormik, Form } from 'formik';
import { connect } from 'react-redux';
import { store } from '../../_helpers';
import * as Yup from 'yup';
import { useDebouncedCallback } from 'use-debounce';
import { editorActions, postActions } from '../../_actions';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react';

import styles from './EditorForm.module.scss';

const EditorForm = (props) => {
    const [isHidden, setIsHidden] = useState(false);

    const hideMetadata = () => {
        setIsHidden(!isHidden);
    }

    const {
        values,
        touched,
        errors,
        dirty,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        isSubmitting,

        dispatch
    } = props;

    const [debouncedUpdatePostBody] = useDebouncedCallback(
        (id, value) => {
            dispatch(editorActions.updatePostBody(id, value))
        }, 1000
    );

    const [debouncedUpdateMarkdownPreview] = useDebouncedCallback(
        (value) => {
            dispatch(editorActions.updatePostPreview(value))
        }, 300
    );

    return (

        <Form>
            <DefaultButton onClick={hideMetadata}>Toggle Post Metadata</DefaultButton>

            <div className={isHidden ? styles.hide : ''}>
                <div className={styles.horizontal}>
                    <TextField
                        name="title"
                        label="Title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                    />
                    {(touched.title && errors.title) ? <div>{errors.title}</div> : ""}
                </div>

                <div className={styles.horizontal}>
                    <TextField
                        name="tags"
                        label="Tags"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.tags}
                    />
                    {(touched.tags && errors.tags) ? <div>{errors.tags}</div> : ""}
                    <span>
                        {/* x tag1, x tag2, x tag3 */}
                    </span>
                </div>
                <div className={styles.horizontal}>
                    <TextField
                        name="slug"
                        label="Slug"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.slug}
                    />
                    {(touched.slug && errors.slug) ? <div>{errors.slug}</div> : ""}
                    <span>
                        {/* x tag1, x tag2, x tag3 */}
                    </span>
                </div>
                

                <div className={`${styles.horizontal}`}>
                    <TextField
                        name="description"
                        label="Description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        multiline
                        row={2} />
                    {(touched.description && errors.description) ? <div>{errors.description}</div> : ""}

                    <TextField
                        name="excerpt"
                        label="Excerpt"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.excerpt}
                        multiline
                        row={2} />
                    {(touched.excerpt && errors.excerpt) ? <div>{errors.excerpt}</div> : ""}
                </div>

                <TextField
                    name="headerImageLink"
                    label="Header Image Link"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.headerImageLink}
                />
                {(touched.headerImageLink && errors.headerImageLink) ? <div>{errors.headerImageLink}</div> : ""}

                <div className={styles.horizontal}>
                    <TextField
                        name="createdAt"
                        label="Created At"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.createdAt}
                    />
                    {(touched.createdAt && errors.createdAt) ? <div>{errors.createdAt}</div> : ""}

                    <TextField
                        name="updatedAt"
                        label="Updated At"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.updatedAt}
                    />
                    {(touched.updatedAt && errors.updatedAt) ? <div>{errors.updatedAt}</div> : ""}
                </div>
            </div>

            <TextField
                name="body"
                label="Body"
                onChange={e => {
                    handleChange(e);
                    debouncedUpdateMarkdownPreview(e.target.value);

                    if (!values.title) debouncedUpdatePostBody(e.target.value);
                }}
                onBlur={e => {
                    handleBlur(e);
                }}
                value={values.body}
                multiline
                autoAdjustHeight 
            />
            {(touched.body && errors.body) ? <div>{errors.body}</div> : ""}

            <div className={styles.formButtons}>
                <PrimaryButton 
                    type="submit"
                    text="Save"
                />
            </div>
        </Form>
    );
};

const formikEnhancer = withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ initialPost }) => {
        return {
            title: initialPost ? initialPost.title : '',
            tags: initialPost ? ( Object.keys(initialPost).length !== 0 ? initialPost.tags : [''] ) : [''],
            slug: initialPost ? initialPost.slug : '',
            description: initialPost ? initialPost.description : '',
            body: initialPost ? initialPost.body : '',
            excerpt: initialPost ? initialPost.excerpt : '',
            headerImageLink: initialPost ? initialPost.headerImageLink : '',
            createdAt: initialPost ? initialPost.createdAt : '',
            updatedAt: initialPost ? initialPost.updatedAt : ''
        }
    },
    validationSchema: Yup.object().shape({
        title: Yup.string().required('Title is required.'),
        slug: Yup.string().required('Slug is required'), 
        body: Yup.string().required("Body is required...that's like, the post.")
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        let tempTags = '';
        if (values && values.tags) {
            if (!Array.isArray(values.tags)) {
                tempTags = [values.tags];
            } else {
                tempTags = values.tags;
            }
        } else {
            tempTags = [''];
        }

        let postDocument = {
            title: values.title || "",
            tags: tempTags, 
            slug: values.slug || "", 
            description: values.description || "", 
            body: values.body || "", 
            excerpt: values.excerpt || "", 
            mode: values.mode || false, 
            headerImageLink: values.headerImageLink || "", 
            createdAt: new Date(), 
            updatedAt: new Date()
        };

        store.dispatch(editorActions.updatePostBody(props.initialPost.id, postDocument));        
        setSubmitting(false);
    }
})(EditorForm);

function mapStateToProps(state) {
    const { editor, posts } = state;

    return { }
}

const EditorFormConnection = withRouter(connect(mapStateToProps)(formikEnhancer));
export { EditorFormConnection as EditorForm };