import React, { useEffect, useState } from 'react';
import { convertHTML2Friends } from '../fbf';
import { IFriend, ISocialMedia } from '../init';
import ActionForm from './actionForm';
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
			<div className="container mb-3">
				<div className="row">
					<div className="col">
						<h3 className="text-center">
							<BsCodeSlash /> Додайте html-код в текстову область та отримайте файл
						</h3>
						<label htmlFor="htmlCode" className="control-label">
							Код елементу, що містить записи про друзів
						</label>
						<textarea
							className="form-control"
							rows={10}
							placeholder="html-код елементу, що містить записи про друзів"
							autoComplete="off"
							value={rawText}
							onChange={onRawChange}
							id="htmlCode"
						></textarea>
						<ActionForm
							socialMediaId={socialMedia?.id}
							friends={friends}
							onFriendsLoaded={onFriendsLoaded}
						/>
					</div>
				</div>
				{socialMedia && <FriendList socialMedia={socialMedia} friends={friends} />}
			</div>
		</>
	);
};

export default App;
