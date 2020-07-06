import { ESocialMedia, IFriend } from './init';

export const convertHTML2Friends = (
	raw: string
): [ESocialMedia | undefined, IFriend[]] => {
	const sm = defineSocialMedia(raw);
	return [sm, []];
};

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
	if (/facebook\.com/i.test(raw)) return ESocialMedia.fb;
	return undefined;
};

// const getFriends = (raw: string, socialMedia: ESocialMedia)
