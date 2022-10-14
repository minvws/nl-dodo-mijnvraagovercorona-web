import { portableTextToHtml } from 'astro-sanity';

const customComponents = {
	types: {
		// code: ({ value }) => {
		//   return `<code-block code='${value.code}' language='${value.language}'></code-block>`;
		// },
	},
};

export function sanityPortableText(portabletext) {
	return portableTextToHtml(portabletext, customComponents);
}
