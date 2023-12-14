export const colors = [
	// Grayscale
	'white',
	'grijs-1',
	'grijs-2',
	'grijs-3',
	'grijs-4',
	'grijs-5',
	'grijs-6',
	'grijs-7',
	'grijs-8',
	'black',
	// Bluescale
	'ijsblauw',
	'poolblauw',
	'lichtblauw',
	'hemelblauw',
	'donkerblauw',
	'diepblauw',
	'nachtblauw',
	// Accent
	'accent-okergeel',
	'accent-robijnrood',
	'accent-wijnrood',
	'accent-dieprood',
	'accent-violet',
	'accent-safarigroen',
	'accent-gifgroen',
	'accent-grasgroen',
	'accent-vuurrood',
	'accent-visited',
] as const;

export type Colors = (typeof colors)[number];
