import { postConstants } from '../_constants';

export function posts(state = {}, action) {
    switch (action.type) {
        case postConstants.GET_MOST_RECENT_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case postConstants.GET_MOST_RECENT_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                posts: action.posts
            });
        case postConstants.GET_MOST_RECENT_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });

        case postConstants.GET_LIST_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case postConstants.GET_LIST_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                posts: action.posts
            });
        case postConstants.GET_LIST_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });

        case postConstants.GET_POST_REQUEST:
                return Object.assign({}, state, {
                    loading: true
                });
        case postConstants.GET_POST_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                post: action.post
            });
        case postConstants.GET_POST_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });
        
        case postConstants.POST_PUBLISH_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case postConstants.POST_PUBLISH_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                posts: state.posts.map(p => {
                    if (p.id === action.postId)
                        return Object.assign({}, p, { mode: true });

                    return p;
                })
            });
        case postConstants.POST_PUBLISH_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });
        
        case postConstants.POST_UNPUBLISH_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case postConstants.POST_UNPUBLISH_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                posts: state.posts.map(p => {
                    if (p.id === action.postId)
                        return Object.assign({}, p, { mode: false });

                    return p;
                })
            });
        case postConstants.POST_UNPUBLISH_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });
        
        case postConstants.POST_DELETE_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case postConstants.POST_DELETE_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                postResult: true
            });
        case postConstants.POST_PUBLISH_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });
        
        default:
            return state;
    }
}