import { followModals } from './';

export const customBlockQuery = ({ name }: { name: string }): string =>
	`${name}[]${followModals()}`;
