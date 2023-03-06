import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { ButtonVariants } from '@design-system/elements/Button';
import { IconProps } from '@design-system/elements/Icon';
import { ImageProps, imageQuery } from '../';
import { customBlockQuery } from './customBlock';

export interface HeroProps {
	title: string;
	chapeau?: string;
	image?: ImageProps;
	content?: ContentBlockProps['value'];
	button?: {
		label: string;
		href?: string;
		variant: ButtonVariants;
		icon: IconProps['name'];
	};
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
			button,
	}`;
};
