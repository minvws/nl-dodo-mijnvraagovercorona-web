export const SITE = {
	title: 'MVOC design system',
	description: 'Design System documentatie voor MVOC',
	defaultLanguage: 'nl',
};

export const OPEN_GRAPH = {
	image: {
		src: 'https://github.com/withastro/astro/blob/main/assets/social/banner-minimal.png?raw=true',
		alt:
			'astro logo on a starry expanse of space,' +
			' with a purple saturn-like planet floating in the right foreground',
	},
	twitter: 'astrodotbuild',
};

// This is the type of the frontmatter you put in the docs markdown files.
export type Frontmatter = {
	title: string;
	description: string;
	layout: string;
	image?: { src: string; alt: string };
	dir?: 'ltr' | 'rtl';
	ogLocale?: string;
	lang?: string;
};

export const KNOWN_LANGUAGES = {
	Dutch: 'nl',
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

export const GITHUB_EDIT_URL = `https://github.com/minvws/nl-dodo-mijnvraagovercorona-web/tree/main/packages/design-system`;

export const COMMUNITY_INVITE_URL =
	'https://github.com/minvws/nl-dodo-mijnvraagovercorona-web';

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
	indexName: 'XXXXXXXXXX',
	appId: 'XXXXXXXXXX',
	apiKey: 'XXXXXXXXXX',
};

export type Sidebar = Record<
	typeof KNOWN_LANGUAGE_CODES[number],
	Record<string, { text: string; link: string }[]>
>;
export const SIDEBAR: Sidebar = {
	nl: {
		'Section Header': [
			{ text: 'Introduction', link: 'nl/introduction' },
			{ text: 'Page 2', link: 'nl/page-2' },
			{ text: 'Page 3', link: 'nl/page-3' },
		],
		'Another Section': [{ text: 'Page 4', link: 'nl/page-4' }],
	},
};
