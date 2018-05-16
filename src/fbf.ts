///<reference path="./d.ts/jquery.d.ts" />
/// <reference path="./d.ts/lodash.d.ts" />
// <reference path="./globals.d.ts" />

interface IFriend {
	fbID: string; // Хоть это поле имеет тип number, но, учитывая величину числа, сделаем его string
	title: string;
	face: string;
	smID?: number;
	relationType?: number;
}
interface ISocialMedia {
	site: string;
	idPrefix: string;
}

class Fbf{
	static WITH_FACES_MAX_COUNT: number = 200;
	static arFriends: IFriend[] = [];

	static arSM: { [i: number]: ISocialMedia; } = {
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
	};
	static nSMID: number = 0;

	// Определяет тип связи:
	// 1 - друзья;
	// 2 - подписчики.
	static nRelationType: number = 0;

	/**
	 * Сохраняет в локальных переменных: социальную сеть, тип связей
	 * @param {int} ASMID - социальная сеть
	 * @param {int} ARelationType - тип связи
	 */
	static setDataTypeValues(ASMID: number, ARelationType: number) {
		Fbf.nSMID = ASMID;
		Fbf.nRelationType = ARelationType;
		$('#smID,#fake_smID').val(Fbf.nSMID.toString());
		$('#relationType,#fake_relationType').val(Fbf.nRelationType.toString());
		return 0;
	}

	/**
	 * По контенту определяет: социальную сеть, тип связей
	 * @param {string} sHTML - код страницы
	 */
	static defineDataType(sHTML: string) {
		if (/\.userapi\.com/i.test(sHTML)) return Fbf.setDataTypeValues(2, 1);
		if (/i\.mycdn\.me/i.test(sHTML)) return Fbf.setDataTypeValues(3, 1);
		if (/friend_list_item/i.test(sHTML)) return Fbf.setDataTypeValues(1, 1);

		if (/fbProfileBrowserListItem/i.test(sHTML)) return Fbf.setDataTypeValues(1, 2);
		return Fbf.setDataTypeValues(0, 0);
	}

	getFriends() {
		let sElementHTML: string = $('#ta').val();
		Fbf.defineDataType(sElementHTML);

		let arTemp: IFriend[] = [];
		let f = $(sElementHTML);
		if (Fbf.nRelationType === 1) {
			switch (Fbf.nSMID) {
			case 1:
				$('li>[data-testid="friend_list_item"]', f).each(function (this: Element) {
					let item = this;
					var a = $('a[data-hovercard]', item).eq(0);
					var sID: string = a.data('hovercard');
					var m = sID.match(/hovercard\/user.php\?id=(\d+)/);
					if (m && m[1]) {
						var nID: string = m[1];
						var sName: string = $('img[role="img"]', item).attr('aria-label');
						var sFace: string = $('img[role="img"]', item).attr('src');
						arTemp.push({
							fbID: nID,
							title: sName,
							face: _.unescape(sFace),
						});
					}
				});
				break;

				// var re = /<a\b[^>]+data-hovercard="\/ajax\/hovercard\/user.php\?id=(\d+)[^>]+><img\b[^>]+src="([^>"]+)"[^>]+aria-label="([^>"]+)"[^>]+>/ig;
				// while ((r = re.exec(s)) !== null){
				// 	arTemp.push({
				// 		fbID: r[1],
				// 		title: r[3],
				// 		face: r[2].replace(/&amp;/ig, '&'),
				// 	});
				// }
				// break;
			case 2:
				$('.friends_user_row', f).each(function (this: Element) {
					let item = this;
					var sID: string = $(item).attr('id');
					var m = sID.match(/friends_user_row(\d+)/);
					if (m && m[1]) {
						var nID: string = m[1];
						var sName: string = $('.friends_field_title a', item).html().replace(/<br>/ig, ' ');
						var sFace: string = $('img.friends_photo_img', item).attr('src');
						arTemp.push({
							fbID: nID,
							title: sName,
							face: _.unescape(sFace),
						});
					}
				});
				break;
			case 3:
				$('.ugrid_i', f).each(function (this: Element) {
					let item = this;
					var nID: string = $('.entity-item', item).data('entity-id');
					var sName: string = $('.ucard-w_t a', item).html().replace(/<br>/ig, ' ');
					var sFace: string = 'https:' + $('img.photo_img', item).attr('src');
					arTemp.push({
						fbID: nID,
						title: sName,
						face: _.unescape(sFace),
				});
				});
				break;
			}
		} else {
			switch (Fbf.nSMID) {
			case 1:
				$('li.fbProfileBrowserListItem', f).each(function (this: Element) {
					let item = this;
					let a = $('a[data-hovercard]', item).eq(0);
					var sID: string = a.data('hovercard');
					var m = sID.match(/hovercard\/user.php\?id=(\d+)/);
					if (m && m[1]) {
						var nID: string = m[1];
						var sName: string = $('img[role="img"]', item).attr('aria-label');
						var sFace: string = $('img[role="img"]', item).attr('src');
						arTemp.push({
							fbID: nID,
							title: sName,
							face: _.unescape(sFace),
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
		Fbf.arFriends = arTemp.map(function(friend: IFriend){
			friend.smID = Fbf.nSMID;
			friend.relationType = Fbf.nRelationType;
			return friend;
		})
		// console.log(arFriends);

		Fbf.drawUsers();
		$('input[name=withfaces]', '#fmGetFriends').prop('checked', Fbf.arFriends.length <= Fbf.WITH_FACES_MAX_COUNT);
	}

	// Отрисовка найденных пользователей
	static drawUsers() {
		let div = $('#divFriends').empty();
		$('span', '#btnFriends').text('(' + Fbf.arFriends.length + ')');
		var userTemplate = _.template($('#tmplUserAccount').html());
		let nIndex: number = Fbf.nSMID;
		Fbf.arFriends.forEach((v: IFriend) => {
			let sUser = userTemplate({
				id: v.fbID,
				title: v.title,
				link: Fbf.arSM[nIndex].site + Fbf.arSM[nIndex].idPrefix + v.fbID,
				img: Fbf.nSMID === 1 ? v.face : 'man.jpg',
				icon: Fbf.nRelationType === 1 ? 'handshake-o' : 'rss'
			});
			$(sUser).appendTo(div);
		});
	}

	loadFriends() {
		if (Fbf.arFriends.length === 0) {
			alert('Список друзів пустий. Можливо, Ви забули натиснути на кнопку показу друзів.');
			return false;
		}

		if ($.trim($('#filename').val()) === '') {
			alert('Введіть, будь ласка, назву вихідного файлу');
			$('#filename').focus();
			return false;
		}
		var s = encodeURIComponent(JSON.stringify(Fbf.arFriends));
		// if (Fbf.WITH_FACES_MAX_COUNT < Fbf.arFriends.length || nSMID === 2){
		if (Fbf.WITH_FACES_MAX_COUNT < Fbf.arFriends.length) {
			$('input[name=withfaces]', '#fmGetFriends').prop('checked', false);
		}
		$('input[name=data]', '#fmGetFriends').val(s);

		setTimeout(() => {
			$('#ta,#filename').val('');
			$('#divFriends').empty();
			$('span', '#btnFriends').text('');
			Fbf.setDataTypeValues(0, 0);
			Fbf.arFriends = [];
		}, 1000);
		return true;
	}
};

let fbf: Fbf = new Fbf();

$(document).ready(function () {
	$('#btnFriends').click(fbf.getFriends);
	$('#fmGetFriends').submit(fbf.loadFriends);

	// for debug
	// $.ajax({
	// 	type: "get",
	// 	url: "fbf.txt",
	// 	data: 'rev=0',
	// 	dataType: "text",
	// 	success: (response: any)  => $('#ta').val(response)
	// });
});