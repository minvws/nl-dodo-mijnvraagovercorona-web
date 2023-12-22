export const animations = [
	'swing',
	'bounce',
	'rotate',
	'rotate-reverse',
] as const;

export type Animations = (typeof animations)[number];
