import { postConstants } from '../_constants';
import { postService } from '../_services';

export const postActions = {
    getList,
    getPost
};

function getList() {
    return dispatch => {
        dispatch(request());

        postService.getPostsList()
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

    function request() { return { type: postConstants.GET_LIST_REQUEST } }
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