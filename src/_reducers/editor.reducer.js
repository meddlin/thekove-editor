import { editorConstants } from '../_constants';

export function editor(state = {}, action) {
    switch(action.type) {
        case editorConstants.POST_CREATE_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case editorConstants.POST_CREATE_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                createdPost: action.postDocument
            });
        case editorConstants.POST_CREATE_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });

        case editorConstants.POST_UPDATE_BODY_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case editorConstants.POST_UPDATE_BODY_SUCCESS:
            return Object.assign({}, state, {
                loading: false
            });
        case editorConstants.POST_UPDATE_BODY_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });

        case editorConstants.POST_UPDATE_MARKDOWN_PREVIEW_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case editorConstants.POST_UPDATE_MARKDOWN_PREVIEW_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                orig: action.document.orig,
                content: action.document.content
            });
        case editorConstants.POST_UPDATE_MARKDOWN_PREVIEW_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });

        default:
            return state;
    }
}