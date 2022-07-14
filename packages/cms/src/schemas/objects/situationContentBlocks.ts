import { BiLinkAlt } from 'react-icons/bi';
import { BsCardText } from 'react-icons/bs';

export default {
	title: 'Content',
	name: 'contentBlocks',
	type: 'array',
	of: [
		{
			title: 'Situatiebutton',
			name: 'situation',
			type: 'object',
			icon: BiLinkAlt,
			preview: {
				select: {
					title: 'situationReference.slug.current',
				},
			},
			fields: [
				{
					title: 'Link titel',
					name: 'situationLinkTitle',
					type: 'localeString',
				},
				{
					title: 'Link naar situatiepagina',
					name: 'situationReference',
					type: 'reference',
					to: [
						{ type: 'situation-question-document' },
						{ type: 'situation-result-document' },
					],
				},
			],
		},
		{
			title: 'Content',
			name: 'content',
			type: 'localeBlock',
			icon: BsCardText,
		},
	],
};
