import React from 'react';
import { FcMindMap } from './icons';

interface IFooterProps extends React.AllHTMLAttributes<HTMLDivElement> {}
const Footer = ({}: IFooterProps) => {
	return (
		<nav className="navbar navbar-dark bg-secondary navbar-bottom mt-auto">
			<span className="navbar-brand">
				{/* <FaUserFriends className="navbar-bottom__brand" /> */}
				{/* <LottieAnimation
					width="100px"
					height="100px"
					lottieFileName="img/lottie/30762-social-media-network.json"
				/> */}
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
