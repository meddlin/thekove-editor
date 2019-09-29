import React from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from './_helpers';
import NavigationBar from './components/NavigationBar/NavigationBar';
import { BrowsePosts } from './pages/BrowsePosts/BrowsePosts';
import { BrowseTags } from './pages/BrowseTags/BrowseTags';
import { Editor } from './pages/Editor/Editor';
import { TagEditor } from './pages/TagEditor/TagEditor';

function App() {
	return (
		<div className="App">
			<Router history={history}>
				<NavigationBar />

				<div>
					<Route path="/browse/tags" exact={true} name="browseTags" component={BrowseTags} />
					<Route path="/browse" exact={true} name="browsePosts" component={BrowsePosts} />
					<Route path="/edit/tag/:id" exact={true}  component={TagEditor} />
					<Route path="/edit/:id" component={Editor} />
					
				</div>
			</Router>
		</div>
	);
}

export default App;
