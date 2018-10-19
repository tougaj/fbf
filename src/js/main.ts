import {fbf} from './fbf';

$(document).ready(function () {
	$('#btnFriends').click(fbf.getFriends);
	$('#fmGetFriends').submit(fbf.loadFriends);
	$('#relationType').change(fbf.onChangeRelationType);

	// for debug
	// $.ajax({
	// 	type: "get",
	// 	url: "test_data/fbf.txt",
	// 	data: 'rev=0',
	// 	dataType: "text",
	// 	success: (response: any)  => $('#ta').val(response)
	// });
});