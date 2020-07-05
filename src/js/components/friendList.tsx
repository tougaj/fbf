import * as React from 'react';

import { Friend } from './Friend';
import { IFriend, ISocialMedia } from '../init';

interface IFriendListProps {
	friends: IFriend[];
	SMID: number;
	relationType: number;
}

export const FriendList = ({
	friends,
	SMID,
	relationType,
}: IFriendListProps) => {
	const arSM: { [i: number]: ISocialMedia } = {
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

	const icon =
		'fa fa-lg fa-fw fa-' + (relationType === 1 ? 'handshake-o' : 'rss');
	return (
		<div>
			{friends.map((friend: IFriend) => (
				<Friend
					key={friend.fbID}
					friend={friend}
					SMID={SMID}
					icon={icon}
					link={arSM[SMID].site + arSM[SMID].idPrefix + friend.fbID}
				/>
			))}
		</div>
	);
};
