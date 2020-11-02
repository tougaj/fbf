import React from 'react';
import { FcMindMap } from './icons';

interface IFooterProps extends React.AllHTMLAttributes<HTMLDivElement> {}
const Footer = ({}: IFooterProps) => {
	return (
		<nav className="navbar navbar-dark bg-secondary navbar-bottom">
			<span className="navbar-brand">
				{/* <FaUserFriends className="navbar-bottom__brand" /> */}
				<FcMindMap className="navbar-bottom__brand" />
			</span>
			<span className="navbar-text mr-auto">
				Фундація моніторингу
				<br />
				загальних процесів
			</span>
		</nav>
	);
};

export default Footer;
