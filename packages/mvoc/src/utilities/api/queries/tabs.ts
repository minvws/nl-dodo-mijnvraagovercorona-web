import { ContentBlockProps } from '@design-system/components/ContentBlock';
import {
	buttonsQuery,
	customBlockQuery,
	ImageProps,
	imageQuery,
	MultiContentBlocksProps,
	multiContentBlocksQuery,
	VideoProps,
	videoQuery,
} from '.';

export interface TabsProps {
	tabTitle: string;
	title: string;
	chapeau?: string;
	image?: ImageProps;
	video?: VideoProps;
	content?: ContentBlockProps['value'];
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
