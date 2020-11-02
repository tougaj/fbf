import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';

interface ILottieAnimationProps extends React.AllHTMLAttributes<HTMLDivElement> {
	lottieFileName: string;
	width: number | string;
	height: number | string;
}
const LottieAnimation = ({ lottieFileName, width, height, className }: ILottieAnimationProps) => {
	const [img, setImg] = useState<any | null>(null);

	useEffect(() => {
		fetch(lottieFileName)
			.then((response) => response.json())
			.then((r) => {
				setImg(r);
			});
	}, [lottieFileName]);

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: img,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	return <div className={className}>{img && <Lottie options={defaultOptions} height={height} width={width} />}</div>;
};

export default LottieAnimation;
