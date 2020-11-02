import React, { useState } from 'react';
import { SOCIAL_MEDIA } from '../fbf';
import { ESocialMedia, IFriend, useBooleanField } from '../init';
import { BsDownload } from './icons';

interface IActionFormProps extends React.HTMLAttributes<HTMLDivElement> {
	socialMediaId?: ESocialMedia;
	friends: IFriend[];
	onFriendsLoaded: () => void;
}
const ActionForm = ({ socialMediaId, friends, onFriendsLoaded }: IActionFormProps) => {
	const WITH_FACES_MAX_COUNT = 200;
	const facesEnabled = 0 < friends.length && friends.length <= WITH_FACES_MAX_COUNT;
	const withFaces = useBooleanField(facesEnabled);
	const [fileName, setFileName] = useState('');

	const onSubmit = () => {
		setTimeout(() => {
			onFriendsLoaded();
			setFileName('');
		}, 100);
		return true;
	};

	const onFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const target = event.target;
		setFileName(target.value);
	};

	return (
		<form
			action={`getFriends.php?ts=${new Date().valueOf()}`}
			method="post"
			// className="form-inline justify-content-center mt-3"
			onSubmit={onSubmit}
		>
			<input type="hidden" name="smID" value={socialMediaId || '0'}></input>
			<input
				type="hidden"
				name="relationType"
				// Раньше определял, кого смотрим - друзей или подписчиков.
				// Подписчики, как оказалось, не актуальны, поэтому жестко прописываем только друзей
				value="1"
			></input>
			<input
				type="hidden"
				name="data"
				value={encodeURIComponent(
					JSON.stringify(
						friends.map((friend) => ({
							...friend,
							smID: parseInt(socialMediaId || '0', 10),
							relationType: 1,
						}))
					)
				)}
			/>
			<div className="form-group">
				<label htmlFor="fake_smID">Соціальна мережа</label>
				<select
					id="fake_smID"
					className="form-control"
					autoComplete="off"
					disabled
					value={socialMediaId || '0'}
				>
					<option disabled value="0">
						Не визначено
					</option>
					{SOCIAL_MEDIA.map(({ id, title }) => (
						<option key={id} value={id}>
							{title}
						</option>
					))}
				</select>
			</div>
			<div className="form-group">
				<label htmlFor="filename">Ім’я вихідного файлу</label>
				<input
					type="text"
					className="form-control"
					name="filename"
					id="filename"
					placeholder="Ім’я вихідного файлу"
					autoComplete="off"
					value={fileName}
					onChange={onFileNameChange}
				/>
			</div>
			<div className="form-check" title="Додати до вихідного файлу зображення обліковок">
				<input
					id="withfaces"
					name="withfaces"
					type="checkbox"
					{...withFaces}
					autoComplete="off"
					className="form-check-input"
					disabled={!facesEnabled}
				/>
				<label htmlFor="withfaces" className="form-check-label ml-1">
					{/* Додати до вихідного файлу зображення обліковок */}
					Додати зображення
				</label>
			</div>
			<div className="text-center mt-3">
				<button type="submit" className="btn btn-primary" disabled={!socialMediaId || friends.length === 0}>
					<BsDownload className="icon-lg" /> Отримати файл
				</button>
			</div>
		</form>
	);
};

export default ActionForm;
