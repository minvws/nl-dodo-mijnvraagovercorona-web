import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { ButtonProps, buttonsQuery } from './buttons';
import { customBlockQuery } from './customBlock';
import { PictureProps, pictureQuery } from './picture';
import { VideoProps, videoQuery } from './video';

type MultiContentBlockProps =
	| undefined
	| { type: 'content'; content: ContentBlockProps['value'] }
	| ButtonProps
	| PictureProps
	| VideoProps;

export type MultiContentBlocksProps = MultiContentBlockProps[];

export const multiContentBlocksQuery = (): string => {
	return `multiContentBlocks[]{
		"type": _type,
		_type == 'content' => {
			${customBlockQuery({ name: 'content' })}
		},
		_type == 'button' => ${buttonsQuery({
			array: false,
			omitProperty: true,
		})},
		_type == 'picture' => ${pictureQuery({ omitProperty: true })},
		_type == 'video' => ${videoQuery({ omitProperty: true })},
	}`;
};
