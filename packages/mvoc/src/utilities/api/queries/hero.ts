import type { ContentBlockProps } from '@modules/ContentBlock';
import type { ImageProps } from '.';
import { customBlockQuery, imageQuery } from '.';

export interface HeroProps {
	title: string;
	chapeau?: string;
	image?: ImageProps;
	content?: ContentBlockProps['value'];
	showUpdatedAt?: boolean;
	isPhoto?: boolean;
}

export const heroQuery = (): string => {
	return `hero{
			title,
			chapeau,
			${imageQuery({
				name: 'image',
			})},
			${customBlockQuery({ name: 'content' })},
			showUpdatedAt,
			isPhoto,
			button,
	}`;
};
