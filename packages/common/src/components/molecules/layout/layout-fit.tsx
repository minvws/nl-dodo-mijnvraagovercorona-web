/** @jsxRuntime classic /
/** @jsx jsx */
import React from 'react';
import { Flex, jsx } from 'theme-ui';

interface OwnProps {}

export const LayoutFit: React.FC<OwnProps> = ({ children }) => {
	return (
		<Flex
			sx={{
				flexWrap: 'wrap',
				alignItems: 'start',
				gap: ['1rem'],
			}}
		>
			{children}
		</Flex>
	);
};
