import { cardQuery } from '.';

export const supportBlockQuery = (): string => {
	return `support->{
		${cardQuery()},
	}`;
};
