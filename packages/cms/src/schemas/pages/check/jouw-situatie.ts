import { BiLinkAlt } from 'react-icons/bi';
import { BsCardText } from 'react-icons/bs';

const situationContentBlocks = {
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
					title: 'situationReference.url',
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
					to: [{ type: 'situation-document' }],
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

export default {
	title: 'Check Jouw Situatie Pagina',
	name: 'jouw-situatie-page',
	type: 'document',
	fields: [
		{
			title: 'Meta data',
			name: 'metaData',
			type: 'pageMetaData',
		},
		{
			title: 'Header',
			name: 'header',
			type: 'header',
		},
		{
			title: 'Jouw situaties titel',
			name: 'situationsYouTitle',
			type: 'localeString',
		},
		{
			title: 'Jouw situaties',
			name: 'situationsYou',
			type: 'array',
			of: [
				{
					title: 'Onderdeel',
					name: 'item',
					type: 'object',
					preview: {
						select: {
							title: 'title.nl',
							subtitle: 'pretitle.nl',
							media: 'image',
						},
					},
					fields: [
						{
							title: 'Titel',
							name: 'title',
							type: 'localeString',
						},
						{
							title: 'Titel suffix',
							name: 'titleSuffix',
							type: 'localeString',
						},
						{
							title: 'Content',
							name: 'content',
							type: 'localeBlock',
						},
						{ ...situationContentBlocks },
					],
				},
			],
		},
		{
			title: 'Andere situaties titel',
			name: 'situationsOtherTitle',
			type: 'localeString',
		},
		{
			title: 'Andere situaties',
			name: 'situationsOther',
			type: 'array',
			of: [
				{
					title: 'Onderdeel',
					name: 'item',
					type: 'object',
					preview: {
						select: {
							title: 'title.nl',
							subtitle: 'pretitle.nl',
							media: 'image',
						},
					},
					fields: [
						{
							title: 'Titel',
							name: 'title',
							type: 'localeString',
						},
						{
							title: 'Titel suffix',
							name: 'titleSuffix',
							type: 'localeString',
						},
						{
							title: 'Content',
							name: 'content',
							type: 'localeBlock',
						},
						{ ...situationContentBlocks },
					],
				},
			],
		},
		{
			title: 'Uitzonderingen titel',
			name: 'situationsExceptionsTitle',
			type: 'localeString',
		},
		{
			title: 'Uitzonderingen',
			name: 'situationsExceptions',
			type: 'array',
			of: [
				{
					title: 'Onderdeel',
					name: 'item',
					type: 'object',
					preview: {
						select: {
							title: 'title.nl',
							subtitle: 'pretitle.nl',
							media: 'image',
						},
					},
					fields: [
						{
							title: 'Titel',
							name: 'title',
							type: 'localeString',
						},
						{
							title: 'Titel suffix',
							name: 'titleSuffix',
							type: 'localeString',
						},
						{
							title: 'Content',
							name: 'content',
							type: 'localeBlock',
						},
						{ ...situationContentBlocks },
					],
				},
			],
		},
		{
			title: 'Geen match',
			name: 'noMatch',
			type: 'object',
			fields: [
				{ title: 'Titel', name: 'title', type: 'localeString' },
				{
					title: 'Content',
					name: 'content',
					type: 'localeBlock',
				},
			],
		},
		{
			title: 'URL',
			name: 'url',
			type: 'string',
		},
		{
			title: 'Huidige stap label',
			name: 'currentStepLabel',
			type: 'localeString',
		},
	],
};
