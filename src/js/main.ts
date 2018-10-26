// import * as React from "react";
// import * as ReactDOM from "react-dom";
// import { Hello } from "./сomponents/Hello";

import {fbf} from './fbf';
// import $ from "jquery";

$(document).ready(function () {
	// ReactDOM.render(
	// 	(<Hello compiler="TypeScript" framework="React" />),
	// 	document.getElementById("divFriends")
	// );

	$('#btnFriends').click(() => fbf.getFriends());
	$('#fmGetFriends').submit(fbf.loadFriends);
	$('#relationType').change(fbf.onChangeRelationType);
	
	// for debug
	// $.ajax({
	// 	type: "get",
	// 	url: "test_data/fbf.txt",
	// 	data: 'rev=0',
	// 	dataType: "text",
	// 	success: (response: any)  => {
	// 		$('#ta').val(response);
	// 		$('#btnFriends').click();
	// 	}
	// });
});