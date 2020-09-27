import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import moment = require('moment');

moment.locale('uk');

ReactDOM.render(<App />, document.getElementById('app'));

// ReactDOM.render(
// 	<IconContext.Provider value={{ className: 'icon' }}>
// 		<App />
// 	</IconContext.Provider>,
// 	document.getElementById('app')
// );

// $(document).ready(function () {
// 	$("#btnFriends").click(() => fbf.getFriends());
// 	$("#fmGetFriends").submit(fbf.loadFriends);
// 	$("#relationType").change(fbf.onChangeRelationType);

// 	// for debug
// 	$.ajax({
// 		type: "get",
// 		url: "test_data/fbf.txt",
// 		data: "rev=0",
// 		dataType: "text",
// 		success: (response: any) => {
// 			$("#ta").val(response);
// 			$("#btnFriends").click();
// 		},
// 	});
// });
