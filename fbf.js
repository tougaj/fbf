'use strict';

var fbf = new function () {
	'use strict';

	var WITH_FACES_MAX_COUNT = 200;
	var arFriends = [];

	var arSM = {
		1: {
			site: 'https://www.facebook.com/',
			idPrefix: ''
		},
		2: {
			site: 'https://vk.com/',
			idPrefix: 'id'
		},
		3: {
			site: 'https://ok.ru/',
			idPrefix: 'profile/'
		}
	};
	var nSMID = 0;

	var nRelationType = 0;

	function setDataTypeValues(ASMID, ARelationType) {
		nSMID = ASMID;
		nRelationType = ARelationType;
		$('#smID,#fake_smID').val(nSMID);
		$('#relationType,#fake_relationType').val(nRelationType);
	}

	function defineDataType(sHTML) {
		if (/\.userapi\.com/i.test(sHTML)) return setDataTypeValues(2, 1);
		if (/i\.mycdn\.me/i.test(sHTML)) return setDataTypeValues(3, 1);
		if (/friend_list_item/i.test(sHTML)) return setDataTypeValues(1, 1);

		if (/fbProfileBrowserListItem/i.test(sHTML)) return setDataTypeValues(1, 2);
		return setDataTypeValues(0, 0);
	}

	function getFriends() {
		var s = $('#ta').val();
		defineDataType(s);

		var arTemp = [];
		var f = $(s);
		if (nRelationType === 1) {
			switch (nSMID) {
				case 1:
					$('li>[data-testid="friend_list_item"]', f).each(function () {
						var a = $('a[data-hovercard]', this).eq(0);
						var sID = a.data('hovercard');
						var m = sID.match(/hovercard\/user.php\?id=(\d+)/);
						if (m && m[1]) {
							var nID = m[1];
							var sName = $('img[role="img"]', this).attr('aria-label');
							var sFace = $('img[role="img"]', this).attr('src');
							arTemp.push({
								fbID: nID,
								title: sName,
								face: _.unescape(sFace)
							});
						}
					});
					break;

				case 2:
					$('.friends_user_row', f).each(function () {
						var sID = $(this).attr('id');
						var m = sID.match(/friends_user_row(\d+)/);
						if (m && m[1]) {
							var nID = m[1];
							var sName = $('.friends_field_title a', this).html().replace(/<br>/ig, ' ');
							var sFace = $('img.friends_photo_img', this).attr('src');
							arTemp.push({
								fbID: nID,
								title: sName,
								face: _.unescape(sFace)
							});
						}
					});
					break;
				case 3:
					$('.ugrid_i', f).each(function () {
						var nID = $('.entity-item', this).data('entity-id');
						var sName = $('.ucard-w_t a', this).html().replace(/<br>/ig, ' ');
						var sFace = 'https:' + $('img.photo_img', this).attr('src');
						arTemp.push({
							fbID: nID,
							title: sName,
							face: _.unescape(sFace)
						});
					});
					break;
			}
		} else {
			switch (nSMID) {
				case 1:
					$('li.fbProfileBrowserListItem', f).each(function () {
						var a = $('a[data-hovercard]', this).eq(0);
						var sID = a.data('hovercard');
						var m = sID.match(/hovercard\/user.php\?id=(\d+)/);
						if (m && m[1]) {
							var nID = m[1];
							var sName = $('img[role="img"]', this).attr('aria-label');
							var sFace = $('img[role="img"]', this).attr('src');
							arTemp.push({
								fbID: nID,
								title: sName,
								face: _.unescape(sFace)
							});
						}
					});
					break;
				case 2:
					break;
				case 3:
					break;
			}
		}
		arFriends = _.map(arTemp, function (item) {
			item.smID = nSMID;
			item.relationType = nRelationType;
			return item;
		});


		drawUsers();
		$('input[name=withfaces]', '#fmGetFriends').prop('checked', arFriends.length <= WITH_FACES_MAX_COUNT);
	}

	function drawUsers() {
		var div = $('#divFriends').empty();
		$('span', '#btnFriends').text('(' + arFriends.length + ')');
		var userTemplate = _.template($('#tmplUserAccount').html());
		arFriends.forEach(function (v) {
			var sUser = userTemplate({
				id: v.fbID,
				title: v.title,
				link: arSM[nSMID].site + arSM[nSMID].idPrefix + v.fbID,
				img: nSMID === 1 ? v.face : 'man.jpg',
				icon: nRelationType === 1 ? 'handshake-o' : 'rss'
			});
			$(sUser).appendTo(div);
		});
	}

	function loadFriends() {
		if (arFriends.length === 0) {
			alert('Список друзів пустий. Можливо, Ви забули натиснути на кнопку показу друзів.');
			return false;
		}

		if ($.trim($('#filename').val()) === '') {
			alert('Введіть, будь ласка, назву вихідного файлу');
			$('#filename').focus();
			return false;
		}
		var s = encodeURIComponent(JSON.stringify(arFriends));

		if (WITH_FACES_MAX_COUNT < arFriends.length) {
			$('input[name=withfaces]', '#fmGetFriends').prop('checked', false);
		}
		$('input[name=data]', '#fmGetFriends').val(s);

		setTimeout(function () {
			$('#ta,#filename').val('');
			$('#divFriends').empty();
			$('span', '#btnFriends').text('');
			setDataTypeValues(0, 0);
			arFriends = [];
		}, 1000);
		return true;
	}

	this.getFriends = getFriends;
	this.loadFriends = loadFriends;
}();

$(document).ready(function () {
	'use strict';

	$('#btnFriends').click(fbf.getFriends);
	$('#fmGetFriends').submit(fbf.loadFriends);
});