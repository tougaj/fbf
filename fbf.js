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
		console.log(fbf.arFriends);

		div = $('#divFriends').empty();
		$('span', '#btnFriends').text('('+nCnt+')');
		fbf.arFriends.forEach(function callback(v, i, a) {
			sLink = fbf.arSM[fbf.nSMID].site+fbf.arSM[fbf.nSMID].idPrefix+v.fbID;
			$('<div class="col-md-4"></div>')
				.append(
					$('<a target="_blank" href="'+sLink+'"></a>')
						.append(
							$('<div class="media" data-id="'+v.fbID+'"></div')
								.append('<div class="media-left"><img class="media-object img-thumbnail imf-rounded" src="'+(fbf.nSMID === 1 ? v.face : 'man.jpg')+'"></div>')
								.append(
									$('<div class="media-body media-middle"></div>')
										.append('<h4>'+v.title+'</h4><small>(ID: '+v.fbID+')</small>')
								)
						)
				)
				.appendTo(div);
		});
		$('input[name=withfaces]', '#fmGetFriends').prop('checked', fbf.arFriends.length <= fbf.WITH_FACES_MAX_COUNT);
	},

   //  downloadFile: function(ar, nFileNo){
   //  	var TIME_DELTA = 5000;
   //  	setTimeout(function(){
			// var s = encodeURIComponent(JSON.stringify(ar));
	  //       $('input[name=data]', '#fmGetFriends').val(s);
	  //       $('input[name=fileno]', '#fmGetFriends').val(nFileNo);
	  //       $('#fmGetFriends').submit();
   //  	}, nFileNo*TIME_DELTA);
   //  },

   //  downloadFiles: function(){
   //  	var FRIENDS_MAX_COUNT = 200;
   //  	var nFilesCount = Math.ceil(fbf.arFriends.length/FRIENDS_MAX_COUNT);
   //  	for (var i = 0; i < nFilesCount; i++){
   //  		var nFirst = i*FRIENDS_MAX_COUNT;
   //  		var nLast = (i+1)*FRIENDS_MAX_COUNT;
   //  		var ar = fbf.arFriends.slice(nFirst, nLast);
   //  		if (i === 0) fbf.downloadFile(ar, i);
   //  	}
   //  }
};

$(document).ready(function(){
	$('#btnFriends').click(fbf.getFriends);
	// $('#btnDownload').click(fbf.downloadFiles);
	
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