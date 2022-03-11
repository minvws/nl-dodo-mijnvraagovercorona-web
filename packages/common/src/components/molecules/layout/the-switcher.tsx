/** @jsx jsx */
import React from 'react';
import { Flex, jsx } from 'theme-ui';

interface OwnProps {
	gap?: string | string[];
}

export const TheSwitcher: React.FC<OwnProps> = ({
	gap = '2.25rem',
	children,
}) => {
	return (
		<Flex
			sx={{
				flexWrap: 'wrap',
				gap: gap,
				'& > *': {
					flex: ['0 0 100%', 1],
				},
			}}
		>
			{children}
		</Flex>
	);
};
