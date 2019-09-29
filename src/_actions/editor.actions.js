import { editorConstants } from '../_constants';
import { editorService } from '../_services';
import showdown from 'showdown';

export const editorActions = {
    createPost,
    updatePostBody,
    updatePostPreview
};

function createPost(postDocument) {
    return dispatch => {
        dispatch(request(postDocument));

        editorService.createPost(postDocument)
            .then(
                postDocument => {
                    dispatch(success(postDocument));
                    //dispatch(alertActions.success('Post saved!'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    //dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(postDocument) { return { type: editorConstants.POST_CREATE_REQUEST, postDocument } }
    function success(postDocument) { return { type: editorConstants.POST_CREATE_SUCCESS, postDocument } }
    function failure(error) { return { type: editorConstants.POST_CREATE_FAILURE, error } }
}

function updatePostBody(docId, postBody) {
    return dispatch => {
        dispatch(request(docId, postBody));

        editorService.updatePostBody(docId, postBody)
            .then(
                postBody => {
                    dispatch(success(docId, postBody));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            )
    };

    function request(docId, postBody) { return { type: editorConstants.POST_UPDATE_BODY_REQUEST, docId, postBody } }
    function success(docId, postBody) { return { type: editorConstants.POST_UPDATE_BODY_SUCCESS, docId, postBody } }
    function failure(error) { return { type: editorConstants.POST_UPDATE_BODY_FAILURE, error } }
}

function updatePostPreview(postBody) {
    return dispatch => {
        dispatch(request(postBody));

        let converter = new showdown.Converter();
        let renderedHtml = converter.makeHtml(postBody);

        dispatch(success(postBody, renderedHtml));
    };

    function request(postBody) { return { type: editorConstants.POST_UPDATE_MARKDOWN_PREVIEW_REQUEST, postBody } }
    function success(postBody, renderedHtml) { return { type: editorConstants.POST_UPDATE_MARKDOWN_PREVIEW_SUCCESS, document: { orig: postBody, content: renderedHtml } } }
    function failure(error) { return { type: editorConstants.POST_UPDATE_MARKDOWN_PREVIEW_FAILURE, error } }
}