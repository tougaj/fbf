import React, { useState, useEffect, useCallback } from 'react';

export interface IFriend {
	fbID: string; // Хоть это поле имеет тип number, но, учитывая величину числа, сделаем его string
	title: string;
	face: string;
	smID?: number;
	relationType?: number;
}

export interface ISocialMedia {
	site: string;
	idPrefix: string;
}

export enum ESocialMedia {
	fb = 1,
	vk = 2,
	ok = 3,
}
// type TSocialMedia = keyof typeof ESocialMedia;

export const SOCIAL_MEDIA: { [key: number]: ISocialMedia } = {
	1: {
		site: 'https://www.facebook.com/',
		idPrefix: '',
	},
	2: {
		site: 'https://vk.com/',
		idPrefix: 'id',
	},
	3: {
		site: 'https://ok.ru/',
		idPrefix: 'profile/',
	},
};

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
