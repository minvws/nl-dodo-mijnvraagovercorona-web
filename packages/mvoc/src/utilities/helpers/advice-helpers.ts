export function getShowOnDays(collection: { showOn?: Array<number> }[]) {
	return collection && collection.filter(({ showOn }) => !!showOn).length
		? [...new Set([].concat(...collection.map((answer) => answer.showOn)))]
		: [0];
}

export function getDaySlug({ slug, day }: { slug: string; day: number }) {
	return `${slug}${day === 0 ? '' : `-dag-${day}`}`;
}

export function getDaysToGenerate(planAndAnswer: {
	answer?: { showOn?: Array<number> }[];
	plan?: { showOn?: Array<number> }[];
}) {
	const answerShowOnDays = getShowOnDays(planAndAnswer?.answer);
	const planShowOnDays = getShowOnDays(planAndAnswer?.plan);
	return [...new Set(answerShowOnDays.concat(planShowOnDays))];
}

export function calculateDay(diff: number, max: number) {
	return diff < 0 ? (Math.abs(diff) < max ? diff : -(max - 1)) : 0;
}
