import React, { useState, useEffect } from 'react';
import { useFormField, ESocialMedia, IFriend } from '../init';
import ActionForm from './actionForm';
import { convertHTML2Friends } from '../fbf';

interface IAppProps extends React.HTMLAttributes<HTMLDivElement> {}
const App = ({}: IAppProps) => {
	const [rawText, setRawText] = useState('');
	const [socialMediaId, setSocialMediaId] = useState<
		ESocialMedia | undefined
	>();
	const [friends, setFriends] = useState<IFriend[] | undefined>();

	// const []

	// for debug
	useEffect(() => {
		fetch('test_data/fbf.txt')
			.then((response) => response.text())
			.then(setRawText);
	}, []);

	useEffect(() => {
		const [smId, f] = convertHTML2Friends(rawText);
		setSocialMediaId(smId);
		setFriends(f);
	}, [rawText]);

	const onRawChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
		setRawText(event.target.value.trim());

	const onFriendsLoaded = () => {
		setRawText('');
		return true;
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col">
					<h3 className="text-center">
						Додайте html-код в текстову область та оберіть дію
					</h3>
					<textarea
						className="form-control"
						rows={10}
						placeholder="html-код елементу, що містить записи про друзів"
						autoComplete="off"
						value={rawText}
						onChange={onRawChange}
					></textarea>
					<ActionForm
						socialMediaId={socialMediaId}
						friends={friends}
						onFriendsLoaded={onFriendsLoaded}
					/>
				</div>
			</div>
		</div>
	);
};

export default App;
