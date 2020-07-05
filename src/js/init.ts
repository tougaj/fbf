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

enum ESocialMedia {
	fb,
	vk,
	ok,
	// esmFacebook = 'fb',
	// esmVkontakte = 'vk',
	// esmOdnoklassniki = 'ok',
}
type TSocialMedia = keyof typeof ESocialMedia;

const SOCIAL_MEDIA: { [key: string]: ISocialMedia } = {
	fb: {
		site: 'https://www.facebook.com/',
		idPrefix: '',
	},
	vk: {
		site: 'https://vk.com/',
		idPrefix: 'id',
	},
	ok: {
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
