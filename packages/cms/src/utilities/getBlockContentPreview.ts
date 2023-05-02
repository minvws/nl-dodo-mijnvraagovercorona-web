export const getBlockContentPreview = (content): string | undefined =>
	content && content[0]?.children
		? content[0].children
				.filter((child) => child._type === 'span')
				.map((span) => span.text)
				.join('')
		: undefined;
