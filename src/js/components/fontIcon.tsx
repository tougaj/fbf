import React from 'react';

interface IFontIconProps extends React.HTMLAttributes<HTMLElement> {
	name: string;
	variant?: 'lg' | 'xl';
}
const FontIcon = ({ name, className, style, variant }: IFontIconProps) => {
	let sVariant = '';
	if (variant) sVariant = variant === 'lg' ? 'icon-lg' : 'icon-xl';
	return (
		<svg className={`icon ${className || ''} ${sVariant}`} style={style}>
			<use xlinkHref={`#${name}`}></use>
		</svg>
	);
};

export default FontIcon;
