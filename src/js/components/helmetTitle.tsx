import React from 'react';
import { Helmet } from 'react-helmet';
import { APP_MAIN_TITLE } from '../init';

interface IHelmetTitleProps {
	children?: string;
}
const HelmetTitle = ({ children }: IHelmetTitleProps) => {
	return (
		<Helmet>
			<title>
				{children ? `${children} :: ` : ''}
				{APP_MAIN_TITLE}
			</title>
		</Helmet>
	);
};

export default HelmetTitle;
