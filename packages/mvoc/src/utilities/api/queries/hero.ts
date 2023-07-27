import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { customBlockQuery, ImageProps, imageQuery } from '.';

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
