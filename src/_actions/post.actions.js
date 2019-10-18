import { postConstants } from '../_constants';
import { postService } from '../_services';

export const postActions = {
    get,
    getPage,
    getPost,
    publishPost,
    unpublishPost,
    deletePost
};

function get() {
    return dispatch => {
        dispatch(request());

        postService.get()
            .then(
                posts => {
                    dispatch(success(posts));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            )
    };

    function request() { return { type: postConstants.GET_MOST_RECENT_REQUEST } }
    function success(posts) { return { type: postConstants.GET_MOST_RECENT_SUCCESS, posts } }
    function failure(error) { return { type: postConstants.GET_MOST_RECENT_FAILURE, error } }
}

function getPage(pageNum, pageSize) {
    let pageRequest = {
        pageNumber: pageNum,
        pageSize: pageSize
    };

    return dispatch => {
        dispatch(request(pageRequest));

        postService.getPostsList(pageRequest)
            .then(
                posts => {
                    dispatch(success(posts));
                    //dispatch(alertActions.success('Posts list retrieved.'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            )
    };

    function request(pageRequest) { return { type: postConstants.GET_LIST_REQUEST, pageRequest: pageRequest } }
    function success(posts) { return { type: postConstants.GET_LIST_SUCCESS, posts } }
    function failure(error) { return { type: postConstants.GET_LIST_FAILURE, error } }
}

function getPost(postId) {
    return dispatch => {
        dispatch(request(postId));

        postService.getSinglePost(postId)
            .then(
                post => {
                    dispatch(success(post));
                    // dispatch(alertActions.success('Posts retrieved.'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            )
    };

    function request(postId) { return { type: postConstants.GET_POST_REQUEST, postId } }
    function success(post) { return { type: postConstants.GET_POST_SUCCESS, post } }
    function failure(error) { return { type: postConstants.GET_POST_FAILURE, error } }
}

function publishPost(postId) {
    return dispatch => {
        dispatch(request(postId));

        postService.publishPost(postId)
            .then(
                postId => {
                    dispatch(success(postId));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            )
    };

    function request(postId) { return { type: postConstants.POST_PUBLISH_REQUEST, postId } }
    function success(postId) { return { type: postConstants.POST_PUBLISH_SUCCESS, postId } }
    function failure(error) { return { type: postConstants.POST_PUBLISH_FAILURE, error } }
}

function unpublishPost(postId) {
    return dispatch => {
        dispatch(request(postId));

        postService.unpublishPost(postId)
            .then(
                postId => {
                    dispatch(success(postId));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            )
    };

    function request(postId) { return { type: postConstants.POST_UNPUBLISH_REQUEST, postId } }
    function success(postId) { return { type: postConstants.POST_UNPUBLISH_SUCCESS, postId } }
    function failure(error) { return { type: postConstants.POST_UNPUBLISH_FAILURE, error } }
}

function deletePost(postId) {
    return dispatch => {
        dispatch(request(postId));

        postService.deletePost(postId)
            .then(
                postResult => {
                    dispatch(success(postResult));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            )
    };

    function request(postId) { return { type: postConstants.POST_DELETE_REQUEST, postId } }
    function success(result) { return { type: postConstants.POST_DELETE_SUCCESS, result } }
    function failure(error) { return { type: postConstants.POST_DELETE_FAILURE, error } }
}