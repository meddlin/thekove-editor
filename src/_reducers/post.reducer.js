import { postConstants } from '../_constants';

export function posts(state = {}, action) {
    switch (action.type) {
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
        
        default:
            return state;
    }
}