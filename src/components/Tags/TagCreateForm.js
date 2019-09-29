import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { withFormik, Form } from 'formik';
import { connect } from 'react-redux';
import { store } from '../../_helpers';
import { tagActions } from '../../_actions';
import * as Yup from 'yup';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react';

const TagCreateForm = (props) => {

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

    return (
        <Form>
            <TextField
                name="name"
                label="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
            />
            {(touched.name && errors.name) ? <div>{errors.name}</div> : ""}

            <TextField
                name="slug"
                label="Slug"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.slug}
            />
            {(touched.slug && errors.slug) ? <div>{errors.slug}</div> : ""}

            <TextField
                name="isSection"
                label="Is Section"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.isSection}
            />
            {(touched.isSection && errors.isSection) ? <div>{errors.isSection}</div> : ""}

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
            
            <PrimaryButton 
                type="submit"
                text="Save"
            />
        </Form>
    );
};

const formikEnhancer = withFormik({
    mapPropsToValues: (props) => {
        const { initialTag } = props;

        return {
            name: initialTag ? initialTag.name : '',
            slug: initialTag ? initialTag.slug : '',
            isSection: initialTag ? initialTag.isSection : '',
            createdAt: initialTag ? initialTag.createdAt : '',
            updatedAt: initialTag ? initialTag.updatedAt : ''
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required'),
        slug: Yup.string().required('Slug is required')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        let tagDocument = {
            name: values ? values.name : '',
            slug: values ? values.slug : '',
            // isSection: values ? values.isSection : '',
            isSection: false,
            createdAt: new Date(), 
            updatedAt: new Date()
        };

        store.dispatch(tagActions.createTag(tagDocument));
        setSubmitting(false);
    }
})(TagCreateForm);

function mapStateToProps(state) {
    const { tags } = state;

    return { }
}

const TagCreateFormConnection = withRouter(connect(mapStateToProps)(formikEnhancer));
export { TagCreateFormConnection as TagCreateForm };