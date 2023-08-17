import { ContentBlockProps } from '@design-system/components/ContentBlock';
import {
	customBlockQuery,
	ImageProps,
	imageQuery,
	VideoProps,
	videoQuery,
} from '.';

export interface TabsProps {
	title: string;
	chapeau?: string;
	image?: ImageProps;
	video?: VideoProps;
	content?: ContentBlockProps['value'];
}

export const tabsQuery = (): string => {
	return `tabs[]->{
			title,
			chapeau,
			${imageQuery({
				name: 'image',
			})},
			video,
			${customBlockQuery({ name: 'content' })},
	}`;
};
