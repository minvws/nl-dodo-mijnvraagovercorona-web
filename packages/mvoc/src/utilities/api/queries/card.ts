import type { ButtonsProps, MultiContentBlocksProps, PictureProps } from './';
import {
	buttonsQuery,
	customBlockQuery,
	imageQuery,
	multiContentBlocksQuery,
} from './';
import type { ContentBlockProps } from '@modules/ContentBlock';

interface CardProps {
	title: string;
	image: PictureProps['image'];
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
