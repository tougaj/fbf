import * as React from 'react';
import { IFriend } from '../init';

export interface IFriendProps {
	friend: IFriend;
	SMID: number;
	icon: string;
	link: string;
}

export const Friend = (props: IFriendProps) => {
	const { friend, SMID, icon, link } = props;
	return (
		<div className="col-md-4">
			<a target="_blank" href={link}>
				<div className="media" data-id="{friend.fbID}">
					<div className="media-left">
						<img
							className="media-object img-thumbnail imf-rounded"
							src={SMID === 1 ? friend.face : 'img/man.jpg'}
						/>
					</div>
					<div className="media-body media-middle">
						<h4>{friend.title}</h4>
						<small>(ID: {friend.fbID})</small>
						<i className={icon}></i>
					</div>
				</div>
			</a>
		</div>
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
