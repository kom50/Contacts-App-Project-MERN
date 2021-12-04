import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@popperjs/core'; // popperjs is required in  bootstrap 5.1.0

import './index.css';
import ContextStore from './ContextStore/Store';

import App from './Components/App';

ReactDOM.render(
	<ContextStore>
		<App />
	</ContextStore>,
	document.getElementById('root')
);
