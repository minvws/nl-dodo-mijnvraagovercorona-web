import { supportedLocales, Locale } from '../../utilities/locales';

import { FiLink } from 'react-icons/fi';
import { RiCalendarCheckLine } from 'react-icons/ri';
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
								{
									title: 'Situatiepagina',
									name: 'situation_page',
									type: 'reference',
									to: [{ type: 'situation-document' }],
								},
								{ name: 'chevron', type: 'boolean' },
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
						{
							name: 'addToCalendar',
							type: 'object',
							title: 'Toevoegen aan kalender',
							blockEditor: {
								icon: RiCalendarCheckLine,
							},
							fields: [
								{
									name: 'modal_title',
									title: '"Andere agenda" modal titel',
									type: 'string',
								},
								{
									name: 'modal_body',
									title: '"Andere agenda" modal uitleg',
									type: 'text',
								},
								{
									name: 'invite_title',
									type: 'string',
								},
								{
									name: 'invite_text',
									type: 'text',
								},
								{
									title: 'Agenda data',
									name: 'period',
									type: 'string',
									options: {
										layout: 'radio',
										list: [
											{
												title: 'Quarantaine periode',
												value: 'quarantaine-period',
											},
											{
												title: 'Testafspraak maken (dag 5)',
												value: 'testappointment-reminder',
											},
										],
									},
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
