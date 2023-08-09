import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'video',
	name: 'video',
	type: 'object',
	fields: [
		defineField({
			title: 'Toon mediatheek video',
			name: 'showInternalVideo',
			description: 'Zet aan om een (interne) mediatheek video te tonen',
			type: 'boolean',
		}),
		defineField({
			title: 'Video mediatheek URL',
			name: 'internalVideoUrl',
			type: 'url',
			validation: (Rule) =>
				Rule.custom((internalVideoUrl, context) => {
					const showInternalVideo = context.parent.showInternalVideo;
					if (showInternalVideo && !internalVideoUrl) {
						return 'Video mediatheek URL is verplicht';
					}
					return true;
				}),
		}),
		defineField({
			title: 'Video embed URL',
			name: 'url',
			type: 'url',
			description: 'Video opent op een externe website, bijvoorbeeld YouTube',
			// validation: (Rule) => Rule.required(),
			validation: (Rule) =>
				Rule.custom((url, context) => {
					const internalVideoUrl = context.parent.internalVideoUrl;
					const showInternalVideo = context.parent.showInternalVideo;

					if ((!internalVideoUrl && !url) || (!showInternalVideo && !url)) {
						return 'Video embed URL is required';
					}
					return true;
				}),
		}),
		defineField({
			title: 'Cover image',
			name: 'picture',
			type: 'picture',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			title: 'Titel',
			name: 'title',
			type: 'string',
			description: 'Word getoond/voorgelezen aan screenreader gebruikers',
			validation: (Rule) => Rule.required(),
		}),
	],
	options: {
		collapsible: true,
		collapsed: false,
	},
	preview: {
		select: {
			title: 'title',
			subtitle: 'url',
			media: 'picture.image',
		},
	},
});
