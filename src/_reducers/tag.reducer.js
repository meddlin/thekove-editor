import { tagConstants } from '../_constants';

export function tags(state = {}, action) {
    switch (action.type) {
        case tagConstants.TAG_GET_LIST_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case tagConstants.TAG_GET_LIST_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                tags: action.tagList
            });
        case tagConstants.TAG_GET_LIST_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });

        case tagConstants.TAG_GET_SINGLE_REQUEST:
                return Object.assign({}, state, {
                    loading: true
                });
        case tagConstants.TAG_GET_SINGLE_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                tag: action.tag
            });
        case tagConstants.TAG_GET_SINGLE_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });

        case tagConstants.TAG_CREATE_REQUEST:
                return Object.assign({}, state, {
                    loading: true
                });
        case tagConstants.TAG_CREATE_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                tagId: action.tagId
            });
        case tagConstants.TAG_CREATE_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });

        case tagConstants.TAG_UPDATE_REQUEST:
                return Object.assign({}, state, {
                    loading: true
                });
        case tagConstants.TAG_UPDATE_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                tagId: action.tagId
            });
        case tagConstants.TAG_UPDATE_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });
        
        case tagConstants.TAG_CREATE_SECTION_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case tagConstants.TAG_CREATE_SECTION_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                tags: state.tags.map(t => {
                    if (t.id === action.tagId) {
                        t.isSection = true;
                        return t;
                    }
                    return t;
                })
            });
        case tagConstants.TAG_CREATE_SECTION_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });
    
        case tagConstants.TAG_REMOVE_SECTION_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case tagConstants.TAG_REMOVE_SECTION_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                tags: state.tags.map(t => {
                    if (t.id === action.tagId) {
                        t.isSection = false;
                        return t;
                    }
                    return t;
                })
            });
        case tagConstants.TAG_REMOVE_SECTION_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });

        case tagConstants.TAG_DELETE_REQUEST:
                return Object.assign({}, state, {
                    loading: true
                });
        case tagConstants.TAG_DELETE_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                tagResult: true
            });
        case tagConstants.TAG_DELETE_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });

        default:
            return state;
    }
}