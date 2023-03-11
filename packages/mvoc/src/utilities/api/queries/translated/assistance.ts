import { ImageProps, imageQuery } from '../image';
import { ButtonProps, buttonsQuery } from './buttons';

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
		button: string;
	};
	getHelp?: {
		title: string;
		button: ButtonProps;
	};
}

export const assistanceQuery = (): string => {
	return `assistance->{
		"headline": title,
		${imageQuery({ name: 'image' })},
		"subTitle": {
			"chatOpen": tekstWithChat,
			"chatClosed": tekstWithoutChat,
		},
		"chat": {
			"title": chat,
			openingHours,
		},
		"phone": {
			"number": phonenumber,
			"openingHours": openingHoursPhonenumber,
		},
		open,
		"situation": {
 			"question": situationQuestion,
			"button": situationButton,
		},
		getHelp{
			title,
			${buttonsQuery({ array: false })},
		},
	}`;
};
