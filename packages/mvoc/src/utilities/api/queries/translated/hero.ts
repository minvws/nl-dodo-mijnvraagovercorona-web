import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { ImageProps, imageQuery } from '../';
import { customBlockQuery } from './customBlock';

export interface HeroProps {
	title: string;
	chapeau?: string;
	image?: ImageProps;
	content?: ContentBlockProps['value'];
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
	}`;
};
