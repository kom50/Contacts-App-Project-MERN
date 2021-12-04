import React from 'react';

import './css/App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Account from './Account';
import PageNotFound from './404';
import NewContact from './NewContact';
import SearchContact from './SearchContact';
import ViewContact from './ViewContact';

function App() {
	return (
		<BrowserRouter>
			<div className="app">
				<Switch>
					{/* Switch - use when we add page not found page in our react application. this component render only matches component */}
					<Route path="/" component={Home} exact />
					<Route path="/account" component={Account} exact />
					<Route path="/login" component={Login} exact />
					<Route path="/new_contact" component={NewContact} exact />
					<Route path="/edit_contacts" component={NewContact} exact />
					<Route
						path="/search_contact"
						component={SearchContact}
						exact
					/>
					<Route
						path="/view_contacts"
						component={ViewContact}
						exact
					/>
					<Route component={PageNotFound} exact />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
