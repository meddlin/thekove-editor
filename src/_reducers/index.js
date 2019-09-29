import { combineReducers } from 'redux';
import { editor } from './editor.reducer';
import { posts } from './post.reducer';
import { tags } from './tag.reducer';

const rootReducer = combineReducers({
    editor,
    posts,
    tags
});

export default rootReducer;