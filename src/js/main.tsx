import React from 'react';
import ReactDOM from 'react-dom';
import { IconContext } from 'react-icons/lib';
import App from './components/app';
import moment = require('moment');

moment.locale('uk');

ReactDOM.render(
	<IconContext.Provider value={{ className: 'react-icons' }}>
		<App />
	</IconContext.Provider>,
	document.getElementById('app')
);
