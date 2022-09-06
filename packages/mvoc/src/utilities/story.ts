import { getImage, getLocaleProperty } from '@quarantaine/common';

export const getStories = ({
	path,
	locale,
}: {
	path?: string;
	locale: string;
}): string => {
	return `"stories": ${path ? `${path}.` : ''}storiesCollection[]-> {
		${getLocaleProperty({ name: 'title', locale })},
		"overview": {
			${getLocaleProperty({ name: 'title', path: 'overview.title', locale })},
			${getImage({ name: 'icon', path: 'overview.icon', full: true })},
		},
		"contentBlocks": contentBlocks[]{
			${getLocaleProperty({
				name: 'content',
				path: '@',
				locale,
				block: true,
			})},
			${getImage({ name: 'image', path: '@', full: true })},
			"video": {
				"url": @.url,
				${getLocaleProperty({
					name: 'title',
					path: '@.title',
					locale,
				})},
				${getImage({ name: 'image', path: '@.image', full: true })},
			},
			"situation": {
				${getLocaleProperty({
					name: 'situationLinkTitle',
					locale,
				})},
				"path": select(
					situationReference->_type == "situation-question-document" => 'situatie/' + situationReference->slug.current,
					situationReference->_type == "situation-result-document" => 'advies/' + situationReference->slug.current,
				),
			},
		},
	}`;
};
