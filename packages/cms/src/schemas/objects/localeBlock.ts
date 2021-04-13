import { supportedLocales, Locale } from '../../utilities/locales';

import { FiLink } from 'react-icons/fi';
import { VscScreenFull } from 'react-icons/vsc';

export default {
	title: 'Content met vertalingen',
	name: 'localeBlock',
	type: 'object',
	fieldsets: [
		{
			title: 'Vertalingen',
			name: 'translations',
			options: { collapsible: true },
		},
	],
	fields: supportedLocales.map((locale: Locale) => ({
		title: locale.title,
		name: locale.id,
		type: 'array',
		validation: (Rule: { required: () => void }) => Rule.required(),
		of: [
			{
				type: 'block',
				styles: [
					{
						title: 'Heading 2',
						value: 'h2',
					},
					{
						title: 'Span',
						value: 'span',
					},
				],
				marks: {
					annotations: [
						{
							name: 'link',
							type: 'object',
							title: 'Link',
							blockEditor: {
								icon: FiLink,
							},
							fields: [
								{ name: 'href', type: 'string' },
								{ name: 'button', type: 'boolean' },
								{ name: 'internal', type: 'boolean' },
							],
						},
						{
							name: 'dialog',
							type: 'object',
							title: 'Dialog',
							blockEditor: {
								icon: VscScreenFull,
							},
							fields: [
								{ name: 'modal_title', type: 'string' },
								{
									name: 'modal_content',
									type: 'array',
									of: [{ type: 'block' }],
								},
							],
						},
					],
				},
			},
		],
		fieldset: locale.isDefault ? null : 'translations',
	})),
};
