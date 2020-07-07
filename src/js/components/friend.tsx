import * as React from 'react';
import { IFriend, ESocialMedia } from '../init';
import FontIcon from './fontIcon';

export interface IFriendProps {
	friend: IFriend;
	socialMediaId: string;
	link: string;
}

export const Friend = ({ friend, socialMediaId, link }: IFriendProps) => {
	return (
		<a
			target="_blank"
			href={link}
			className="d-flex flex-row align-items-center border rounded"
		>
			<img
				src={
					socialMediaId === ESocialMedia.fb
						? friend.face || 'img/man.jpg'
						: 'img/man.jpg'
				}
				className="rounded-left"
			/>
			<div className="ml-2">
				<h6 className="mb-0">{friend.title}</h6>
				<small>(ID: {friend.fbID})</small>
			</div>
		</a>
		// <div className="col-md-4">
		// 	<a target="_blank" href={link}>
		// 		<div className="media" data-id="{friend.fbID}">
		// 			<div className="media-left">
		// 				<img
		// 					className="media-object img-thumbnail imf-rounded"
		// 					src={
		// 						socialMediaId === ESocialMedia.fb
		// 							? friend.face
		// 							: 'img/man.jpg'
		// 					}
		// 				/>
		// 			</div>
		// 			<div className="media-body media-middle">
		// 				<h4>{friend.title}</h4>
		// 				<small>(ID: {friend.fbID})</small>
		// 				<FontIcon name="bi-people-fill" variant="lg" />
		// 			</div>
		// 		</div>
		// 	</a>
		// </div>
	);
};

// import * as React from "react";

// export interface HelloProps { compiler: string; framework: string; }

// export const Hello = (props: HelloProps) => (<h1>Hello from {props.compiler} and {props.framework}!</h1>);

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
// export class Hello extends React.Component<HelloProps, {}> {
//     render() {
//         return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
//     }
// }
