import type { ContentBlockProps } from '@modules/ContentBlock';
import type {
	ButtonProps,
	ImageProps,
	MultiContentBlocksProps,
	VideoProps,
} from '.';
import { buttonsQuery, customBlockQuery, imageQuery, videoQuery } from '.';

export interface TabsProps {
	tabTitle: string;
	title: string;
	chapeau?: string;
	image?: ImageProps;
	video?: VideoProps;
	content?: ContentBlockProps['value'];
	button?: ButtonProps;
	multiContentBlocks: MultiContentBlocksProps;
}

export const tabsQuery = (): string => {
	return `tabs[]->{
			tabTitle,
			title,
			chapeau,
			${customBlockQuery({ name: 'content' })},
			${imageQuery({
				name: 'image',
			})},
			${videoQuery({ omitProperty: false })},
			${buttonsQuery({ array: false })},
	}`;
};
