import React, { useEffect, useState } from 'react';
import { convertHTML2Friends } from '../fbf';
import { IFriend, ISocialMedia } from '../init';
import ActionForm from './actionForm';
import Footer from './footer';
import { FriendList } from './friendList';
import HelmetTitle from './helmetTitle';
import { BsCodeSlash } from './icons';

interface IAppProps extends React.HTMLAttributes<HTMLDivElement> {}
const App = ({}: IAppProps) => {
	const [rawText, setRawText] = useState('');
	const [socialMedia, setSocialMedia] = useState<ISocialMedia | undefined>();
	const [friends, setFriends] = useState<IFriend[]>([]);

	// for debug
	// useEffect(() => {
	// 	fetch('test_data/fbf.txt')
	// 		.then((response) => response.text())
	// 		.then(setRawText);
	// }, []);

	useEffect(() => {
		const parseFriends = async (rawText: string) => {
			try {
				const [socialMedia, f] = await convertHTML2Friends(rawText);
				setSocialMedia(socialMedia);
				setFriends(f);
			} catch (error) {
				alert(error);
				setSocialMedia(undefined);
				setFriends([]);
			}
		};

		parseFriends(rawText);
	}, [rawText]);

	const onRawChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setRawText(event.target.value.trim());

	const onFriendsLoaded = () => setRawText('');

	return (
		<>
			<HelmetTitle />
			<div className="container-fluid mb-3 main-container">
				<div className="row">
					<div className="col">
						<h3 className="text-center mt-3">
							<BsCodeSlash /> Додайте html-код в текстову область та отримайте файл
						</h3>
					</div>
				</div>
				<div className="row">
					<div className="col-9 form-group d-flex flex-column mb-0">
						<label htmlFor="htmlCode">Код елементу, що містить записи про друзів</label>
						<textarea
							className="form-control form__raw-data flex-grow-1"
							// rows={10}
							placeholder="вставте html-код елементу, що містить записи про друзів, до цього текстового блоку"
							autoComplete="off"
							value={rawText}
							onChange={onRawChange}
							id="htmlCode"
						></textarea>
					</div>
					<div className="col-3">
						<ActionForm
							socialMediaId={socialMedia?.id}
							friends={friends}
							onFriendsLoaded={onFriendsLoaded}
						/>
					</div>
				</div>
				{socialMedia && <FriendList socialMedia={socialMedia} friends={friends} />}
				{/* {socialMedia ? (
					<FriendList socialMedia={socialMedia} friends={friends} />
				) : (
					<LottieAnimation
						width="25vh"
						height="25vh"
						lottieFileName="img/lottie/30762-social-media-network.json"
						className="my-auto"
					/>
				)} */}
			</div>
			<Footer />
		</>
	);
};

export default App;
