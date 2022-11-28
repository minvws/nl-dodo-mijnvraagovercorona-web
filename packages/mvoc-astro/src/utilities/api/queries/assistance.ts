import { Locale } from 'src/utilities/locale/translation';
import { ImageProps, imageQuery } from './image';
import { localePropertyQuery } from './localeProperty';

export interface AssistanceProps {
	headline: string;
	image: ImageProps;
	open: string;
	subTitle: {
		chatOpen: string;
		chatClosed: string;
	};
	chat: {
		title: string;
		openingHours: string;
	};
	phone: {
		number: string;
		openingHours: string;
	};
	situation?: {
		question: string;
		button: {
			label: string;
		};
	};
}

export const assistanceQuery = ({ locale }: { locale: Locale }): string => {
	return `"assistance": assistanceReference->{
		${localePropertyQuery({ name: 'headline', path: 'title', locale })},
		${imageQuery({ name: 'image' })},
		"subTitle": {
			${localePropertyQuery({ name: 'chatOpen', path: 'tekstWithChat', locale })},
			${localePropertyQuery({ name: 'chatClosed', path: 'tekstWithoutChat', locale })}
		},
		"chat": {
			${localePropertyQuery({ name: 'title', path: 'chat', locale })},
			${localePropertyQuery({ name: 'openingHours', locale })},
		},
		"phone":{
			"number": phonenumber,
			${localePropertyQuery({
				name: 'openingHours',
				path: 'openingHoursPhonenumber',
				locale,
			})},
		},
		${localePropertyQuery({ name: 'open', locale })},
	}`;
};
