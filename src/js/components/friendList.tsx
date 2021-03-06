import * as React from 'react';
import { IFriend, ISocialMedia } from '../init';
import { Friend } from './Friend';
import HelmetTitle from './helmetTitle';
import { FaFacebookF, FaOdnoklassniki, FaQuestionCircle, FaVk } from './icons';

interface IFriendListProps {
	socialMedia: ISocialMedia;
	friends: IFriend[];
}

export const FriendList = ({ friends, socialMedia }: IFriendListProps) => {
	const { site, idPrefix, id } = socialMedia;
	const PRINT_MAX_COUNT = 100;
	const listReduced = PRINT_MAX_COUNT < friends.length;
	let iconIndex = parseInt(id);
	if (iconIndex < 0 || 3 < iconIndex) iconIndex = 0;
	const IconComponent = SM_DATA[iconIndex].icon;
	const pageTitle = `${SM_DATA[iconIndex].title}, друзів: ${friends.length}`;

	return (
		<>
			<HelmetTitle>{pageTitle}</HelmetTitle>
			<div className="row mt-2">
				<div className="col-12">
					<h4 className="text-center text-info mb-2">
						{IconComponent}
						<span className="ml-1">
							Загальна кількість друзів: {friends.length}
							{listReduced && <small className="ml-2">(показані перші {PRINT_MAX_COUNT})</small>}
						</span>
					</h4>
				</div>
				<div className="col-12 friend-list">
					{friends.slice(0, PRINT_MAX_COUNT).map((friend: IFriend) => (
						<Friend
							key={friend.fbID}
							friend={friend}
							socialMediaId={id}
							link={`${site}${idPrefix}${friend.fbID}`}
						/>
					))}
				</div>
				{listReduced && (
					<div className="col-12 mt-2">
						<h5 className="text-center text-info">
							Показані перші {PRINT_MAX_COUNT} друзів з {friends.length}
							...
						</h5>
					</div>
				)}
			</div>
		</>
	);
};

const SM_DATA = [
	{
		icon: <FaQuestionCircle />,
		title: 'Unknown',
	},
	{
		icon: <FaFacebookF />,
		title: 'Facebook',
	},
	{
		icon: <FaVk />,
		title: 'Вконтакте',
	},
	{
		icon: <FaOdnoklassniki />,
		title: 'Одноклассники',
	},
];
