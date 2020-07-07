import { ESocialMedia, IFriend, ISocialMedia } from './init';
import $ from 'jquery';
var lodashUnescape = require('lodash.unescape');

export const convertHTML2Friends = (
	raw: string
): Promise<[ISocialMedia | undefined, IFriend[]]> => {
	const socialMediaId = defineSocialMedia(raw);
	const socialMedia = findSocialMediaById(socialMediaId);
	return Promise.resolve([socialMedia, socialMedia?.parser(raw) || []]);
};

const findSocialMediaById = (socialMediaId?: ESocialMedia) =>
	SOCIAL_MEDIA.find(({ id }) => id === socialMediaId);

const defineSocialMedia = (raw: string): ESocialMedia | undefined => {
	// // Вконтакте
	// // if (/\.userapi\.com/i.test(sHTML)) return Fbf.setDataTypeValues(2, 0);
	// if (/id="friends_user_row\d+"/i.test(sHTML)) return Fbf.setDataTypeValues(2, 0);
	// // Одноклассники
	// if (/i\.mycdn\.me/i.test(sHTML)){
	// 	if (/friendSubscribers/i.test(sHTML))
	// 		return Fbf.setDataTypeValues(3, 2);
	// 	else
	// 		return Fbf.setDataTypeValues(3, 1);
	// }
	// // Фейсбук дрвзья
	// if (/friend_list_item/i.test(sHTML)) return Fbf.setDataTypeValues(1, 1);

	// // Фейсбук подписчики
	// if (/fbProfileBrowserListItem/i.test(sHTML)) return Fbf.setDataTypeValues(1, 2);
	// // if (/fans_fan_row/i.test(sHTML)) return Fbf.setDataTypeValues(2, 2);
	// return Fbf.setDataTypeValues(0, 0);

	// if (/fbProfileBrowserListItem/i.test(raw)) return ESocialMedia.fb;
	if (/ajax\/hovercard\/user\.php/i.test(raw)) return ESocialMedia.fb;
	return undefined;
};

// const getFriends = (raw: string, socialMedia: ESocialMedia)

const stubParser = (text: string) => [];

const facebookParser = (text: string) => {
	let friends: IFriend[] = [];
	const container = $(text);
	$('li', container).each(function (this: Element) {
		const li = this;
		// fbID: string; // Хоть это поле имеет тип number, но, учитывая величину числа, сделаем его string
		// title: string;
		// face: string;
		var a = $('a[data-hovercard]', li).eq(0);
		var hovercard: string = a.data('hovercard');
		if (hovercard) {
			var m = hovercard.match(/hovercard\/user.php\?id=(\d+)/);
			if (m && m[1]) {
				var fbID: string = m[1];
				const title: string = $('img[role="img"]', li).attr(
					'aria-label'
				) as string;
				var face: string = lodashUnescape(
					$('img[role="img"]', li).attr('src') as string
				);
				friends.push({
					fbID,
					title,
					face,
				});
			}
		}
	});

	return friends;
};

export const SOCIAL_MEDIA: ISocialMedia[] = [
	{
		id: ESocialMedia.fb,
		site: 'https://www.facebook.com/',
		idPrefix: '',
		title: 'Facebook',
		parser: facebookParser,
	},
	{
		id: ESocialMedia.vk,
		site: 'https://vk.com/',
		idPrefix: 'id',
		title: 'Вконтакте',
		parser: stubParser,
	},
	{
		id: ESocialMedia.ok,
		site: 'https://ok.ru/',
		idPrefix: 'profile/',
		title: 'Одноклассники',
		parser: stubParser,
	},
];
