export function getShowOnDays(collection: { showOn?: Array<number> }[]) {
	return collection && collection.filter(({ showOn }) => !!showOn).length
		? [...new Set([].concat(...collection.map((answer) => answer.showOn)))]
		: [0];
}

export function getDaySlug({ slug, day }: { slug: string; day: number }) {
	return `${slug}${day === 0 ? '' : `-dag-${day}`}`;
}
