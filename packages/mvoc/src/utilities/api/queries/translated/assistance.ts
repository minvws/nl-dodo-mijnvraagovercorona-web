import { Locale } from 'src/utilities/locale/translation';
import { PictureProps, pictureQuery } from './picture';

export interface AssistanceProps {
	title: string;
	picture: PictureProps;
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
}

// export const assistanceQuery = () => {
// 	return `*[_type == "assistance"]{
//         title,
//         open,
//         openingHoursPhonenumber,
//         phonenumber,
//         situationButton,
//         situationQuestion,
//         tekstWithChat,
//         tekstWithoutChat,
//       }`;
// };

export const assistanceQuery = (): string => {
	return `assistance{
		name: 'title', path: 'title', locale,
		name: 'picture',
		"subTitle": {
			name: 'chatOpen', path: 'tekstWithChat', locale ,
			name: 'chatClosed', path: 'tekstWithoutChat', locale
		},
		"chat": {
			name: 'title', path: 'chat', locale,
			 name: 'openingHours', locale,
		},
		"phone":{
			"number": phonenumber,
				name: 'openingHours',
				path: 'openingHoursPhonenumber',
				locale,
			,
		},
		 name: 'open', locale,
		"situation": {
			name: 'question', path: 'situationQuestion', locale ,
			name: 'button', path: 'situationButton', locale ,
		},
	}`;
};
