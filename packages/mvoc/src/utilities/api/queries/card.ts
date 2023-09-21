import type { ButtonsProps, ImageProps, MultiContentBlocksProps } from './';
import {
	buttonsQuery,
	customBlockQuery,
	imageQuery,
	multiContentBlocksQuery,
} from './';
import type { ContentBlockProps } from '@design-system/components/ContentBlock';

interface CardProps {
	title: string;
	image: ImageProps;
	chapeau: string;
	content: ContentBlockProps['value'];
	buttons: ButtonsProps;
	multiContentBlocks: MultiContentBlocksProps;
}

export interface CardsProps {
	label: string;
	items: CardProps[];
}

export const cardQuery = (): string => {
	return `cards{
		label,
		items[]->{
			title,
			${imageQuery({ name: 'image' })},
			${customBlockQuery({ name: 'content' })},
			${buttonsQuery({ array: true })},
			${multiContentBlocksQuery()},
		},
	}`;
};
