import * as React from 'react';
import { ESocialMedia, IFriend } from '../init';

export interface IFriendProps {
	friend: IFriend;
	socialMediaId: string;
	link: string;
}

export const Friend = ({ friend, socialMediaId, link }: IFriendProps) => {
	return (
		<a target="_blank" href={link} className="d-flex flex-row align-items-center border rounded">
			<div
				className="friend-list__friend-icon rounded-left"
				style={{
					backgroundImage: socialMediaId === ESocialMedia.fb ? `url(${friend.face})` : undefined,
				}}
			></div>
			<div className="ml-2">
				<h6 className="mb-0">{friend.title}</h6>
				<small>ID: {friend.fbID}</small>
			</div>
		</a>
	);
};
