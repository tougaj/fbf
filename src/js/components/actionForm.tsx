import React, { useState } from 'react';
import { SOCIAL_MEDIA, useBooleanField, ESocialMedia, IFriend } from '../init';

interface IActionFormProps extends React.HTMLAttributes<HTMLDivElement> {
	socialMediaId?: ESocialMedia;
	friends?: IFriend[];
	onFriendsLoaded: () => boolean;
}
const ActionForm = ({
	socialMediaId,
	friends,
	onFriendsLoaded,
}: IActionFormProps) => {
	const withFaces = useBooleanField(false);

	// if (text === '')
	// 	return (
	// 		<div className="text-info h5 text-center mt-3">
	// 			Відсутній текст для аналізу
	// 		</div>
	// 	);

	const onSubmit = () => onFriendsLoaded();

	return (
		<form
			// name="fmGetFriends"
			// id="fmGetFriends"
			action="getFriends.php"
			method="post"
			className="form-inline justify-content-center mt-3"
			target="_blank"
			onSubmit={onSubmit}
		>
			<input
				type="hidden"
				name="smID"
				value={socialMediaId || '0'}
			></input>
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
				value={encodeURIComponent(JSON.stringify(friends))}
			/>
			{/* <input type="hidden" name="fileno" value="0" /> */}
			<div className="form-group">
				<label className="control-label" htmlFor="fake_smID">
					Соціальна мережа
				</label>
				<select
					id="fake_smID"
					className="form-control ml-1"
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
			<div className="form-group ml-3">
				<label className="control-label" htmlFor="filename">
					Ім'я вихідного файлу
				</label>
				<input
					type="text"
					className="form-control ml-1"
					name="filename"
					id="filename"
					placeholder="Ім'я вихідного файлу"
					autoComplete="off"
				/>
			</div>
			<div
				className="form-check ml-3"
				title="Додати до вихідного файлу зображення обліковок"
			>
				<input
					id="withfaces"
					name="withfaces"
					type="checkbox"
					{...withFaces}
					autoComplete="off"
					className="form-check-input"
				/>
				<label htmlFor="withfaces" className="form-check-label ml-1">
					{/* Додати до вихідного файлу зображення обліковок */}
					Додати зображення
				</label>
			</div>
			<button
				type="submit"
				className="btn btn-primary ml-3"
				disabled={!socialMediaId || friends?.length === 0}
			>
				<i className="fa fa-download fa-lg"></i> Отримати файл
			</button>
		</form>
	);
};

export default ActionForm;
