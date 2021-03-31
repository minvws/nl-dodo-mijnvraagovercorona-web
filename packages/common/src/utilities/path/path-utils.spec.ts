import { cartesianProduct } from '../path';

describe('Path Utils:', () => {
	it('cartesianProduct: Should combine all variants of array properties', () => {
		expect(
			cartesianProduct(
				['train', 'plane'],
				['today', 'tomorrow'],
				['france', 'spain'],
			),
		).toMatchInlineSnapshot(`
		Array [
		  Array [
		    "train",
		    "today",
		    "france",
		  ],
		  Array [
		    "train",
		    "today",
		    "spain",
		  ],
		  Array [
		    "train",
		    "tomorrow",
		    "france",
		  ],
		  Array [
		    "train",
		    "tomorrow",
		    "spain",
		  ],
		  Array [
		    "plane",
		    "today",
		    "france",
		  ],
		  Array [
		    "plane",
		    "today",
		    "spain",
		  ],
		  Array [
		    "plane",
		    "tomorrow",
		    "france",
		  ],
		  Array [
		    "plane",
		    "tomorrow",
		    "spain",
		  ],
		]
	`);
	});
});
