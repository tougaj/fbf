import * as React from 'react';

import { Friend } from './Friend';
import { IFriend, SOCIAL_MEDIA } from '../init';

interface IFriendListProps {
	friends: IFriend[];
	SMID: number;
	relationType?: number;
}

export const FriendList = ({
	friends,
	SMID,
	relationType = 1,
}: IFriendListProps) => {
	const icon =
		'fa fa-lg fa-fw fa-' + (relationType === 1 ? 'handshake-o' : 'rss');
	const { site, idPrefix } = SOCIAL_MEDIA[SMID];
	return (
		<div>
			{friends.map((friend: IFriend) => (
				<Friend
					key={friend.fbID}
					friend={friend}
					SMID={SMID}
					icon={icon}
					link={`${site}${idPrefix}${friend.fbID}`}
				/>
			))}
		</div>
	);
};
