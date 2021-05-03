export const blockContentPreview = {
	select: {
		content: 'content',
	},
	prepare({
		content,
	}: {
		content: {
			nl: {
				_type: string;
				children: { _type: string; text: string }[];
			}[];
		};
	}) {
		const block = (content.nl || []).find((block) => block._type === 'block');
		return {
			title: block
				? block.children
						.filter((child) => child._type === 'span')
						.map((span) => span.text)
						.join('')
				: 'No title',
		};
	},
};
