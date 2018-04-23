var fbf = {
	WITH_FACES_MAX_COUNT: 200,
	arFriends: [],
	arSM: {
		1: {
			site: 'https://www.facebook.com/',
			idPrefix: '',
		},
		2: {
			site: 'https://vk.com/',
			idPrefix: 'id',
		},
		3: {
			site: 'https://ok.ru/',
			idPrefix: 'profile/',
		},
	},
	nSMID: 0,
	
	getFriends: function(){
		var s = $('#ta').val();
		if (s.search(/\.userapi\.com/i) === -1){
			if (s.search(/i\.mycdn\.me/i) === -1){
				fbf.nSMID = 1;
			} else {
				fbf.nSMID = 3;
			}
		} else {
			fbf.nSMID = 2;
		}
		$('#smID').val(fbf.nSMID);

		var nCnt = 0;
		switch (fbf.nSMID){
			case 1:
				var s = $('#ta').val();
				var re = /<a\b[^>]+data-hovercard="\/ajax\/hovercard\/user.php\?id=(\d+)[^>]+><img\b[^>]+src="([^>"]+)"[^>]+aria-label="([^>"]+)"[^>]+>/ig;
				fbf.arFriends = [];
				while ((r = re.exec(s)) !== null){
					fbf.arFriends.push({
						fbID: r[1],
						title: r[3],
						face: r[2].replace(/&amp;/ig, '&'),
						smID: fbf.nSMID,
					});
					nCnt++;
				}
				break;
			case 2:
				var f = $(s);
				$('.friends_user_row', f).each(function(){
					var sID = $(this).attr('id');
					var m = sID.match(/friends_user_row(\d+)/);
					if (m && m[1]){
						var nID = m[1];
						var sName = $('.friends_field_title a', this).html().replace(/<br>/ig, ' ');
						var sFace = $('img.friends_photo_img', this).attr('src');
						fbf.arFriends.push({
							fbID: nID,
							title: sName,
							face: sFace.replace(/&amp;/ig, '&'),
							smID: fbf.nSMID,
						});
						nCnt++;
					}
				});
				break;
			case 3:
				var f = $(s);
				$('.ugrid_i', f).each(function(){
					var nID = $('.entity-item', this).data('entity-id');
					var sName = $('.ucard-w_t a', this).html().replace(/<br>/ig, ' ');
					var sFace ='https:'+$('img.photo_img', this).attr('src');
					fbf.arFriends.push({
						fbID: nID,
						title: sName,
						face: sFace.replace(/&amp;/ig, '&'),
						smID: fbf.nSMID,
					});
					nCnt++;
				});
				break;
		}
		// console.log(fbf.arFriends);

		// Отрисовка найденных пользователей
		div = $('#divFriends').empty();
		$('span', '#btnFriends').text('('+nCnt+')');
		var userTemplate = _.template($('#tmplUserAccount').html());
		fbf.arFriends.forEach(function callback(v, i, a) {
			let sUser = userTemplate({
				id: v.fbID,
				title: v.title,
				link: fbf.arSM[fbf.nSMID].site+fbf.arSM[fbf.nSMID].idPrefix+v.fbID,
				img: fbf.nSMID === 1 ? v.face : 'man.jpg',
			});
			$(sUser).appendTo(div);
		});
		$('input[name=withfaces]', '#fmGetFriends').prop('checked', fbf.arFriends.length <= fbf.WITH_FACES_MAX_COUNT);
	},
};

$(document).ready(function(){
	$('#btnFriends').click(fbf.getFriends);
	
	$('#fmGetFriends').submit(function(){
		if (fbf.arFriends.length === 0){
			alert('Список друзів пустий. Можливо, Ви забули натиснути на кнопку показу друзів.');
			return false;
		}

		if ($.trim($('#filename').val()) === ''){
			alert('Введіть, будь ласка, назву вихідного файлу');
			$('#filename').focus();
			return false;
		}
		var s = encodeURIComponent(JSON.stringify(fbf.arFriends));
		// if (fbf.WITH_FACES_MAX_COUNT < fbf.arFriends.length || fbf.nSMID === 2){
		if (fbf.WITH_FACES_MAX_COUNT < fbf.arFriends.length){
			$('input[name=withfaces]', '#fmGetFriends').prop('checked', false);
		}
		$('input[name=data]', '#fmGetFriends').val(s);

		setTimeout(function(){
			$('#ta,#filename').val('');
			$('#divFriends').empty();
			$('span', '#btnFriends').text('');
			fbf.nSMID = 0;
			$('#smID').val(fbf.nSMID);
			fbf.arFriends = [];
		}, 1000);
		return true;
	})
});