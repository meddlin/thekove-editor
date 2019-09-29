import { tagConstants } from '../_constants';
import { tagService } from '../_services';

export const tagActions = {
    getTags,
    getSingleTag,
    createTag,
    updateTag,
    deleteTag
};

function getTags(amount) {
    return dispatch => {
        dispatch(request(amount));

        tagService.getTags(amount)
            .then(
                tagList => {
                    dispatch(success(tagList));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            )
    };

    function request(amount) { return { type: tagConstants.TAG_GET_LIST_REQUEST, amount } }
    function success(tagList) { return { type: tagConstants.TAG_GET_LIST_SUCCESS, tagList } }
    function failure(error) { return { type: tagConstants.TAG_GET_LIST_FAILURE, error } }
};

function getSingleTag(tagId) {
    return dispatch => {
        dispatch(request(tagId));

        tagService.getSingleTag(tagId)
            .then(
                tag => {
                    dispatch(success(tag));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            )
    };

    function request(tagId) { return { type: tagConstants.TAG_GET_SINGLE_REQUEST, tagId } }
    function success(tag) { return { type: tagConstants.TAG_GET_SINGLE_SUCCESS, tag } }
    function failure(error) { return { type: tagConstants.TAG_GET_SINGLE_FAILURE, error } }
};

function createTag(tagDoc) {
    return dispatch => {
        dispatch(request(tagDoc));

        tagService.createTag(tagDoc)
            .then(
                tagId => {
                    dispatch(success(tagId));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            )
    };

    function request(tagDoc) { return { type: tagConstants.TAG_CREATE_REQUEST, tagDoc } }
    function success(tagId) { return { type: tagConstants.TAG_CREATE_SUCCESS, tagId } }
    function failure(error) { return { type: tagConstants.TAG_CREATE_FAILURE, error } }
};

function updateTag(tagId, tagDoc) {
    return dispatch => {
        dispatch(request(tagId, tagDoc));

        tagService.updateTag(tagId, tagDoc)
            .then(
                tagId => {
                    dispatch(success(tagId));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            )
    };

    function request(tagId, tagDoc) { return { type: tagConstants.TAG_UPDATE_REQUEST, tagId, tagDoc } }
    function success(tagId) { return { type: tagConstants.TAG_UPDATE_SUCCESS, tagId } }
    function failure(error) { return { type: tagConstants.TAG_UPDATE_FAILURE, error } }
};

function deleteTag(tagId) {
    return dispatch => {
        dispatch(request(tagId));

        tagService.deleteTag(tagId)
            .then(
                tagId => {
                    dispatch(success(tagId));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            )
    };

    function request(tagId) { return { type: tagConstants.TAG_DELETE_REQUEST, tagId } }
    function success(tagId) { return { type: tagConstants.TAG_DELETE_SUCCESS, tagId } }
    function failure(error) { return { type: tagConstants.TAG_DELETE_FAILURE, error } }
};