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
			<img
				src={socialMediaId === ESocialMedia.fb ? friend.face || 'img/man.jpg' : 'img/man.jpg'}
				className="rounded-left"
			/>
			<div className="ml-2">
				<h6 className="mb-0">{friend.title}</h6>
				<small>ID: {friend.fbID}</small>
			</div>
		</a>
	);
};
