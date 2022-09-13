/** @jsxRuntime classic /
/** @jsx jsx */
import React from 'react';
import { Flex, jsx, SxStyleProp } from 'theme-ui';

interface OwnProps {
	gap?: string | string[];
	alignItems?: string | string[];
	minBlockSize?: string | string[];
}

export const TheSwitcher: React.FC<OwnProps> = ({
	gap = '2.25rem',
	alignItems = 'stretch',
	minBlockSize = '0',
	children,
}) => {
	return (
		<Flex
			sx={{
				flexWrap: 'wrap',
				gap: gap,
				alignItems: alignItems,
				justifyContent: 'start',
				minBlockSize: minBlockSize,
				'& > *': {
					flex: ['0 0 100%', 1],
				},
			}}
		>
			{children}
		</Flex>
	);
};

interface TheSwitcherItemProps {
	blockAlign?: 'start' | 'center' | 'end';
	gap?: string | string[];
	styles?: SxStyleProp;
}

export const TheSwitcherItem: React.FC<TheSwitcherItemProps> = ({
	children,
	blockAlign = 'start',
	gap = '2.25rem',
	styles,
}) => {
	return (
		<Flex
			sx={{
				...styles,
				flexDirection: 'column',
				gap: gap,
				justifyContent:
					blockAlign === 'start' || blockAlign === 'end'
						? `flex-${blockAlign}`
						: blockAlign,
			}}
		>
			{children}
		</Flex>
	);
};
