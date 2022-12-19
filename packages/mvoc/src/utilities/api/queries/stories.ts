import { Locale } from 'src/utilities/locale/translation';
import { ImageProps, imageQuery } from './image';
import { localePropertyQuery } from './localeProperty';
import type { MultiContentBlockProps } from '@design-system/components/ContentBlock';

export interface StoryProps {
	headline: string;
	contentBlocks: MultiContentBlockProps[];
	overview: {
		title: string;
		icon: ImageProps;
	};
}

export const storiesQuery = ({
	path,
	locale,
}: {
	path?: string;
	locale: Locale;
}): string => {
	return `"stories": ${path ? `${path}.` : ''}storiesCollection[]-> {
		${localePropertyQuery({ name: 'headline', path: 'title', locale })},
		"overview": {
			${localePropertyQuery({ name: 'title', path: 'overview.title', locale })},
			${imageQuery({ name: 'icon', path: 'overview.icon' })},
		},
		"contentBlocks": contentBlocks[]{
			${localePropertyQuery({
				name: 'content',
				path: '@',
				locale,
				block: true,
			})},
			${imageQuery({ name: 'image', path: '@' })},
			"video": {
				"url": @.url,
				${localePropertyQuery({
					name: 'title',
					path: '@.title',
					locale,
				})},
				${imageQuery({ name: 'image', path: '@.image' })},
			},
			"situation": {
				${localePropertyQuery({
					name: 'situationLinkTitle',
					locale,
				})},
				variant,
				"path": select(
					situationReference->_type == "situation-question-document" => 'situatie/' + situationReference->slug.current,
					situationReference->_type == "situation-result-document" => 'advies/' + situationReference->slug.current,
				),
			},
		},
	}`;
};
