import {
	ButtonsProps,
	buttonsQuery,
	customBlockQuery,
	ImageProps,
	imageQuery,
} from './';
import { ContentBlockProps } from '@design-system/components/ContentBlock';

export interface CardProps {
	title: string;
	image: ImageProps;
	chapeau: string;
	content: ContentBlockProps['value'];
	buttons: ButtonsProps;
}

export const cardQuery = (): string => {
	return `cards{
		label,
		items[]->{
			title,
			${imageQuery({ name: 'image' })},
			${customBlockQuery({ name: 'content' })},
			${buttonsQuery({ array: true })},
		},
	}`;
};
