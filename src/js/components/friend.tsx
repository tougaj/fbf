import * as React from 'react';
import styled from 'styled-components';
import { ESocialMedia, IFriend } from '../init';

export interface IFriendProps {
	friend: IFriend;
	socialMediaId: string;
	link: string;
}

export const Friend = ({ friend, socialMediaId, link }: IFriendProps) => {
	return (
		<a target="_blank" href={link} className="d-flex flex-row align-items-center rounded friend-list__friend">
			<ImgUser
				className="friend-list__friend-icon rounded-left"
				img={socialMediaId === ESocialMedia.fb ? friend.face : undefined}
			/>
			<div className="ml-2">
				<h6 className="mb-0">{friend.title}</h6>
				<small>ID: {friend.fbID}</small>
			</div>
		</a>
	);
};

interface IImgUser {
	img?: string;
}
const ImgUser = styled.div<IImgUser>`
	background-image: ${(props) => `url(${props.img || 'img/man.jpg'})`};
`;
