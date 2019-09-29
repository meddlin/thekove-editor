import { combineReducers } from 'redux';
import { editor } from './editor.reducer';
import { posts } from './post.reducer';

const rootReducer = combineReducers({
    editor,
    posts
});

export default rootReducer;