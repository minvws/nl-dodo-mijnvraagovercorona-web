import { h, ComponentChildren } from 'preact';

interface Props {
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	children: ComponentChildren;
}

export const Heading = ({ level = 2, children }: Props) => {
	return h(`h${level}`, {}, children);
};
