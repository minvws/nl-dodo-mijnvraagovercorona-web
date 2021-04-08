/**
 * A cartesian product is a final array that combines multiple arrays in ALL
 * variations possible. For example:
 *
 * You have 3 arrays: [a, b], [1, 2], [y, z]
 * The final result will be an array with all the different combinations:
 * ["a", 1, "y"], ["a", 1, "z"], ["a", 2, "y"], ["a", 2, "z"], ["b", 1, "y"], etc
 *
 * We use this to create a params object for the static pages that combine multiple
 * dynamic properties like 'stage' and 'meansOfTransport'. Resulting in an array
 * with all different path combinations possible.
 *
 * @source: https://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript
 * TS Inspiration: https://gist.github.com/ssippe/1f92625532eef28be6974f898efb23ef
 */
export const cartesianProduct = <T extends string>(...sets: T[][]) =>
	sets.reduce<T[][]>(
		(accSets, set) =>
			accSets.flatMap((accSet) => set.map((value) => [...accSet, value])),
		[[]],
	);
