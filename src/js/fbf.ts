import $ from 'jquery';
import { ESocialMedia, IFriend, ISocialMedia } from './init';
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
	if (/\.userapi\.com/i.test(raw)) return ESocialMedia.vk;
	if (/i\.mycdn\.me/i.test(raw)) return ESocialMedia.ok;
	if (/ajax\/hovercard\/user\.php/i.test(raw)) return ESocialMedia.fb;
	return undefined;
};

// const stubParser = (text: string) => [];

const fbParser = (text: string) => {
	let friends: IFriend[] = [];
	const container = $(text);
	$('li', container).each(function (this: Element) {
		const li = this;
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

const vkParser = (text: string) => {
	let friends: IFriend[] = [];
	const container = $(text);
	$('.friends_user_row', container).each(function (this: Element) {
		let li = this;
		var sID: string = $(li).attr('id') as string;
		var m = sID.match(/friends_user_row(\d+)/);
		if (m && m[1]) {
			var fbID: string = m[1];
			var title: string = $('.friends_field_title a', li)
				.html()
				.replace(/<br>/gi, ' ');
			var face: string = $('img.friends_photo_img', li).attr(
				'src'
			) as string;
			friends.push({
				fbID,
				title,
				face,
			});
		}
	});

	return friends;
};

const okParser = (text: string) => {
	let friends: IFriend[] = [];
	const container = $(text);
	$('.ugrid_i', container).each(function (this: Element) {
		let item = this;
		var fbID: string = $('.entity-item', item).data('entity-id');
		var title: string = $('.ucard-w_t a', item)
			.html()
			.replace(/<br>/gi, ' ');
		var face: string = 'https:' + $('img.photo_img', item).attr('src');
		friends.push({
			fbID,
			title,
			face,
		});
	});

	return friends;
};

export const SOCIAL_MEDIA: ISocialMedia[] = [
	{
		id: ESocialMedia.fb,
		site: 'https://www.facebook.com/',
		idPrefix: '',
		title: 'Facebook',
		parser: fbParser,
	},
	{
		id: ESocialMedia.vk,
		site: 'https://vk.com/',
		idPrefix: 'id',
		title: 'Вконтакте',
		parser: vkParser,
	},
	{
		id: ESocialMedia.ok,
		site: 'https://ok.ru/',
		idPrefix: 'profile/',
		title: 'Одноклассники',
		parser: okParser,
	},
];
