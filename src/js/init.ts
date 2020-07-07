import React, { useState, useEffect, useCallback } from 'react';

export interface IFriend {
	fbID: string; // Хоть это поле имеет тип number, но, учитывая величину числа, сделаем его string
	title: string;
	face: string;
}

export enum ESocialMedia {
	fb = '1',
	vk = '2',
	ok = '3',
}

export interface ISocialMedia {
	id: ESocialMedia;
	site: string;
	idPrefix: string;
	title: string;
	parser: (test: string) => IFriend[];
}

// export const SOCIAL_MEDIA: { [key: string]: ISocialMedia } = {
// 	'1': {
// 		site: 'https://www.facebook.com/',
// 		idPrefix: '',
// 		name: 'Facebook',
// 	},
// 	'2': {
// 		site: 'https://vk.com/',
// 		idPrefix: 'id',
// 		name: 'Вконтакте',
// 	},
// 	'3': {
// 		site: 'https://ok.ru/',
// 		idPrefix: 'profile/',
// 		name: 'Одноклассники',
// 	},
// };

export const useFormField = (initialValue: string) => {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	const onChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setValue(event.target.value);
		},
		[]
	);

	return { value, onChange };
};

export const useBooleanField = (initialChecked: boolean) => {
	const [checked, setChecked] = useState(initialChecked);

	useEffect(() => {
		setChecked(initialChecked);
	}, [initialChecked]);

	const onChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setChecked(event.target.checked);
		},
		[]
	);

	return { checked, onChange };
};
